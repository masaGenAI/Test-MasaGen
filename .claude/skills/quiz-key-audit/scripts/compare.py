#!/usr/bin/env python3
"""解答役の答えと正解の番号を突き合わせ、食い違った問題だけを一覧にする。

使い方（リポジトリのルートで）:
  python3 -I .claude/skills/quiz-key-audit/scripts/compare.py <作業フォルダ> [--partial] [--record]

  --partial  まだ答えが返っていないファイルがあっても、返った分だけで集計する
  --record   一致した問題と、decisions.json に書いた判定を台帳（data/quiz-key-audit/ledger.json）に残す

入力: <作業フォルダ>/key.json、out/chunk-XXXX.json（解答役の答え。形は references/solver-brief.md）
出力: <作業フォルダ>/mismatch.json（食い違い）・report.md（集計と一覧）

食い違い＝正解の番号の誤り、とは限らない（解答役の誤りのほうが多い）。1問ずつ読んで、
<作業フォルダ>/decisions.json に [{"id": "0001-07", "verdict": "key-wrong|key-ok|ambiguous", "note": "…"}] を書く。
key-wrong と ambiguous は quiz-authoring の決まりで直してから、もう一度 prep → 解答 → compare で確かめる。
"""
from __future__ import annotations

import collections
import datetime as dt
import glob
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
# 台帳の場所（道具の動作確認では NOVA_KEYAUDIT_LEDGER で別の場所に向ける）
LEDGER = os.environ.get("NOVA_KEYAUDIT_LEDGER") or os.path.join(ROOT, "data", "quiz-key-audit", "ledger.json")
AB = "ABCDEFGH"
VERDICTS = ("key-wrong", "key-ok", "ambiguous")


def locate(line) -> str:
    """写しの行番号を、部品のファイルと行に直す（できなければ空）。"""
    try:
        r = subprocess.run(["node", os.path.join(ROOT, "nova-app", "scripts", "nova-src.mjs"), "locate", str(int(line))], capture_output=True, text=True)
        return r.stdout.strip() if r.returncode == 0 else ""
    except (ValueError, OSError):
        return ""


def main() -> int:
    if len(sys.argv) < 2 or sys.argv[1].startswith("--"):
        print(__doc__)
        return 2
    work = os.path.abspath(sys.argv[1])
    with open(os.path.join(work, "key.json"), encoding="utf-8") as f:
        key = json.load(f)
    picks, bad = {}, []
    for p in sorted(glob.glob(os.path.join(work, "out", "chunk-*.json"))):
        try:
            with open(p, encoding="utf-8") as f:
                d = json.load(f)
            answers = d["answers"] if isinstance(d, dict) else d
        except (json.JSONDecodeError, KeyError, TypeError) as e:
            bad.append(f"{os.path.basename(p)}: 読めない（{e}）")
            continue
        for a in answers:
            iid = a.get("id") if isinstance(a, dict) else None
            if iid not in key:
                bad.append(f"{os.path.basename(p)}: 知らない id {iid!r}")
                continue
            pk = a.get("pick")
            if not isinstance(pk, int) or isinstance(pk, bool) or not 0 <= pk < key[iid]["n"]:
                bad.append(f"{iid}: pick が 0〜{key[iid]['n'] - 1} の整数ではない（{pk!r}）")
                continue
            if iid in picks:
                bad.append(f"{iid}: 答えが2回ある")
                continue
            picks[iid] = {"pick": pk, "conf": str(a.get("conf") or ""), "issue": str(a.get("issue") or "")}
    missing = [i for i in key if i not in picks]
    for b in bad[:20]:
        print("NG  " + b)
    if bad or (missing and "--partial" not in sys.argv):
        print(f"答えがそろっていない：不備 {len(bad)} 件・未回答 {len(missing)} 問" + ("（返った分だけで集計するなら --partial）" if missing and not bad else ""))
        return 1

    texts = {}
    for p in glob.glob(os.path.join(work, "in", "chunk-*.json")):
        with open(p, encoding="utf-8") as f:
            for it in json.load(f)["items"]:
                texts[it["id"]] = it
    mism, issues = [], []
    stat = collections.defaultdict(lambda: [0, 0])  # (mod, bank) → [解いた数, 食い違い]
    for iid, pk in picks.items():
        k = key[iid]
        place = (k["at"][0]["mod"], k["at"][0]["bank"])
        stat[place][0] += 1
        row = {"id": iid, "q": texts[iid]["q"], "opts": texts[iid]["opts"], "key": k["a"], "pick": pk["pick"], "conf": pk["conf"], "issue": pk["issue"], "e": k["e"], "at": k["at"]}
        if pk["pick"] != k["a"]:
            stat[place][1] += 1
            mism.append(row)
        elif pk["issue"]:
            issues.append(row)
    with open(os.path.join(work, "mismatch.json"), "w", encoding="utf-8") as f:
        json.dump(mism, f, ensure_ascii=False, indent=1)
    n = len(picks)
    out = [f"# 正解の番号のブラインド検品（{dt.date.today().isoformat()}）", "",
           f"- 解いた問題: {n} 問（未回答 {len(missing)} 問）",
           f"- 正解の番号と一致: {n - len(mism)} 問（{(n - len(mism)) / n * 100:.1f}%）" if n else "- 解いた問題なし",
           f"- 食い違い: {len(mism)} 問 ← 1問ずつ読んで判定する（解答役の誤りも含む）",
           f"- 一致したが、解答役が気になる点を書いた問題: {len(issues)} 問", "",
           "## バンクごと", "", "| ハブ | バンク | 解いた数 | 食い違い |", "|---|---|---:|---:|"]
    for (m, b), (a, x) in sorted(stat.items(), key=lambda kv: (-kv[1][1], kv[0])):
        out.append(f"| {m} | {b} | {a} | {x} |")
    out += ["", "## 食い違った問題", ""]
    for r in mism:
        at = r["at"][0]
        where = locate(at.get("line")) or f"ProjectNova.jsx:{at.get('line')}"
        out += [f"### {r['id']}　{at['mod']} / {at['bank']}（{len(r['at'])} か所。バンクの宣言は {where}、その {at.get('i')} 番目）", "",
                r["q"], ""]
        out += [f"- {AB[j]}. {o}" + ("　← 正解とされている" if j == r["key"] else "") + ("　← 解答役の答え" if j == r["pick"] else "") for j, o in enumerate(r["opts"])]
        out += ["", f"- 解答役の確信度: {r['conf'] or '（なし）'}" + (f"　気になる点: {r['issue']}" if r["issue"] else ""),
                f"- 解説: {r['e'][:300] or '（なし）'}", ""]
    if issues:
        out += ["## 一致したが、気になる点が書かれた問題", ""]
        out += [f"- {r['id']}　{r['at'][0]['bank']}：{r['q'][:60]} … {r['issue']}" for r in issues]
    with open(os.path.join(work, "report.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(out) + "\n")
    print(f"解いた {n} 問・一致 {n - len(mism)}・食い違い {len(mism)}・気になる点 {len(issues)} → {os.path.join(work, 'report.md')}")

    if "--record" in sys.argv:
        dec = {}
        dp = os.path.join(work, "decisions.json")
        if os.path.exists(dp):
            with open(dp, encoding="utf-8") as f:
                for d in json.load(f):
                    if d.get("verdict") not in VERDICTS or d.get("id") not in key:
                        print(f"NG  decisions.json: {d!r}（verdict は {' / '.join(VERDICTS)}）")
                        return 1
                    dec[d["id"]] = d
        led = {"v": 1, "checked": {}}
        if os.path.exists(LEDGER):
            with open(LEDGER, encoding="utf-8") as f:
                led = json.load(f)
        today, add = dt.date.today().isoformat(), 0
        bad_ids = {r["id"] for r in mism}
        for iid in picks:
            if iid in bad_ids:
                # 食い違いは、判定が key-ok（正解の番号は合っていた）のときだけ確認済みにする。直す問題は文面が変わるので残さない
                if dec.get(iid, {}).get("verdict") == "key-ok":
                    led["checked"][key[iid]["h"]] = {"d": today, "r": "key-ok"}
                    add += 1
            else:
                led["checked"][key[iid]["h"]] = {"d": today, "r": "agree"}
                add += 1
        os.makedirs(os.path.dirname(LEDGER), exist_ok=True)
        with open(LEDGER, "w", encoding="utf-8") as f:
            json.dump(led, f, ensure_ascii=False, indent=0, sort_keys=True)
            f.write("\n")
        todo = sum(1 for i in bad_ids if i not in dec)
        print(f"台帳に {add} 問を記録（計 {len(led['checked'])} 問）。判定がまだの食い違い {todo} 問")
    return 0


if __name__ == "__main__":
    sys.exit(main())
