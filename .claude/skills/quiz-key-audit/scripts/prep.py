#!/usr/bin/env python3
"""正解を伏せた問題を書き出す（ブラインド検品の準備）。

全バンクの選択式問題を取り出し（quiz-authoring の key-scan.mjs を使う）、正解・解説を除いた
「問題文と選択肢だけ」のファイルに小分けする。解答役はこれだけを見て解く。

使い方（リポジトリのルートで）:
  python3 -I .claude/skills/quiz-key-audit/scripts/prep.py <作業フォルダ> [--mod CertHubModule] [--bank BANK]
          [--sample 200] [--chunk 50] [--seed 1] [--recheck]

  --mod / --bank  対象を絞る（--mod は FinanceHubModule・MegaTechHubModule・ConsultingHubModule・CertHubModule・LinguisticsHubModule）
  --sample N      まだ確かめていない問題から N 問を無作為に取る（省くと全部）
  --chunk N       1ファイルあたりの問題数（既定 50）
  --recheck       台帳で確認済みの問題も対象に入れる

出力（作業フォルダ）:
  in/chunk-0001.json …  解答役に渡す（id・問題文・選択肢だけ）
  key.json              正解と場所（解答役には渡さない）
  scan/                 key-scan.mjs の出力（all_rows.json・flags.json）

同じ問題文・同じ選択肢の問題（模試がバンクから引いた写しなど）は1問にまとめる。写しどうしで正解の番号が
食い違っていれば、その場で一覧に出す（解くまでもなく、どちらかが誤り）。
"""
from __future__ import annotations

import collections
import hashlib
import json
import os
import random
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
# 台帳の場所（道具の動作確認では NOVA_KEYAUDIT_LEDGER で別の場所に向ける）
LEDGER = os.environ.get("NOVA_KEYAUDIT_LEDGER") or os.path.join(ROOT, "data", "quiz-key-audit", "ledger.json")
KEY_SCAN = os.path.join(ROOT, ".claude", "skills", "quiz-authoring", "key-scan.mjs")


def opt(name: str, default=None):
    a = sys.argv
    return a[a.index(name) + 1] if name in a and a.index(name) + 1 < len(a) else default


def qhash(q: str, opts: list[str]) -> str:
    """問題文と選択肢（並び順も含む）の指紋。文面が1字でも変われば別の問題として扱う。"""
    return hashlib.sha1(("\x1f".join([q] + list(opts))).encode("utf-8")).hexdigest()[:16]


def load_ledger() -> dict:
    if not os.path.exists(LEDGER):
        return {"v": 1, "checked": {}}
    with open(LEDGER, encoding="utf-8") as f:
        return json.load(f)


def main() -> int:
    if len(sys.argv) < 2 or sys.argv[1].startswith("--"):
        print(__doc__)
        return 2
    work = os.path.abspath(sys.argv[1])
    chunk = int(opt("--chunk", "50"))
    sample = opt("--sample")
    seed = int(opt("--seed", "1"))
    os.makedirs(os.path.join(work, "scan"), exist_ok=True)
    os.makedirs(os.path.join(work, "in"), exist_ok=True)
    os.makedirs(os.path.join(work, "out"), exist_ok=True)
    r = subprocess.run(["node", KEY_SCAN, "nova-app/src/ProjectNova.jsx", os.path.join(work, "scan", "flags.json")], cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout + r.stderr)
        return 1
    with open(os.path.join(work, "scan", "all_rows.json"), encoding="utf-8") as f:
        rows = json.load(f)
    mod, bank = opt("--mod"), opt("--bank")
    rows = [x for x in rows if (not mod or x.get("mod") == mod) and (not bank or x.get("bank") == bank)]
    # 同じ文面の問題をまとめる
    groups: dict[str, dict] = collections.OrderedDict()
    skipped = 0
    for x in rows:
        q, opts, a = x.get("q") or "", [str(o) for o in (x.get("opts") or [])], x.get("a")
        if not q or len(opts) < 2 or not isinstance(a, int) or not 0 <= a < len(opts):
            skipped += 1
            continue
        h = qhash(q, opts)
        g = groups.setdefault(h, {"q": q, "opts": opts, "e": x.get("e") or "", "at": []})
        g["at"].append({"mod": x.get("mod"), "bank": x.get("bank"), "line": x.get("line"), "i": x.get("i"), "a": a})
    clash = {h: g for h, g in groups.items() if len({p["a"] for p in g["at"]}) > 1}
    checked = load_ledger()["checked"]
    pending = [h for h in groups if h not in clash and ("--recheck" in sys.argv or h not in checked)]
    if sample:
        random.Random(seed).shuffle(pending)
        pending = sorted(pending[: int(sample)], key=list(groups).index)
    key, n_chunks, chars = {}, 0, 0
    for old in os.listdir(os.path.join(work, "in")):
        os.remove(os.path.join(work, "in", old))
    for c in range(0, len(pending), chunk):
        n_chunks += 1
        cid = f"{n_chunks:04d}"
        items = []
        for k, h in enumerate(pending[c:c + chunk], 1):
            g = groups[h]
            iid = f"{cid}-{k:02d}"
            items.append({"id": iid, "q": g["q"], "opts": g["opts"]})
            key[iid] = {"h": h, "a": g["at"][0]["a"], "n": len(g["opts"]), "e": g["e"], "at": g["at"]}
            chars += len(g["q"]) + sum(len(o) for o in g["opts"])
        with open(os.path.join(work, "in", f"chunk-{cid}.json"), "w", encoding="utf-8") as f:
            json.dump({"chunk": cid, "items": items}, f, ensure_ascii=False, indent=1)
            f.write("\n")
    with open(os.path.join(work, "key.json"), "w", encoding="utf-8") as f:
        json.dump(key, f, ensure_ascii=False)
    with open(os.path.join(work, "clash.json"), "w", encoding="utf-8") as f:
        json.dump([{"q": g["q"], "opts": g["opts"], "at": g["at"]} for g in clash.values()], f, ensure_ascii=False, indent=1)
    print(f"対象 {len(rows)} 問（形が合わず除外 {skipped}）→ 文面が同じものをまとめて {len(groups)} 問")
    print(f"確認済み（台帳）{sum(1 for h in groups if h in checked)} 問・今回書き出し {len(pending)} 問 → {n_chunks} ファイル（1ファイル {chunk} 問まで、問題文と選択肢で約 {chars:,} 字）")
    print(f"写しどうしで正解の番号が食い違う問題: {len(clash)} 問（{os.path.join(work, 'clash.json')}）")
    for g in list(clash.values())[:5]:
        print("  - " + g["q"][:50] + " … " + " / ".join(f"{p['bank']}:{'ABCDEFGH'[p['a']]}" for p in g["at"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
