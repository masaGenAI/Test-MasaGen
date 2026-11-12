"""点検の作業フォルダを用意し、担当者・検算者に渡す依頼文を出す。

usage: python3 -I prep.py <作業フォルダ> --areas a,b,...  [--today YYYY-MM-DD] [--no-reach]   … 点検の前
       python3 -I prep.py <作業フォルダ> --verify [--areas a,b,...] [--chunk 8]                … 担当者が終わったあと
  点検の前:  out/ を作り、定数の索引（consts.txt）、範囲ごとの候補（cand-<範囲>.md）、前回の未確認（carry-<範囲>.json）、
            画面の写し（dist-snap/。nova-app/dist があれば）を置き（候補には、古いと確かめた語の残りも入る）、出典のホストに届くかを確かめて、担当者への依頼文を出す。
  --verify:  out/check-<範囲>.json の修正案を --chunk 件ずつに分け、検算者への依頼文を出す。
  依頼文はそのままサブエージェントの prompt に使う（文面をそろえるため、手で書き直さない）。
"""
from __future__ import annotations

import datetime as dt
import os
import shutil
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402
import reach  # noqa: E402

BRIEFS = os.path.join(common.SKILL, "references")


def run(script: str, *args: str) -> str:
    """同じフォルダの道具を動かし、標準出力を返す。"""
    r = subprocess.run([sys.executable, "-I", os.path.join(common.HERE, script), *args], capture_output=True, text=True)
    if r.returncode not in (0, 1):
        raise SystemExit(f"{script} が失敗: {r.stderr[-400:]}")
    return r.stdout


def main() -> None:
    """作業フォルダを整え、依頼文を標準出力に書く。"""
    a = sys.argv[1:]
    if not a or a[0].startswith("--"):
        raise SystemExit(__doc__)
    work = os.path.abspath(a[0])
    spec = common.areas()
    by_key = {x["key"]: x for x in spec["areas"]}
    today = a[a.index("--today") + 1] if "--today" in a else dt.date.today().isoformat()
    os.makedirs(os.path.join(work, "out"), exist_ok=True)
    scripts = os.path.relpath(common.HERE, common.ROOT)

    if "--verify" in a:
        chunk = int(a[a.index("--chunk") + 1]) if "--chunk" in a else 8
        keys = a[a.index("--areas") + 1].split(",") if "--areas" in a else sorted(
            f[6:-5] for f in os.listdir(os.path.join(work, "out")) if f.startswith("check-") and f.endswith(".json"))
        for key in keys:
            d = common.load_json(os.path.join(work, "out", f"check-{key}.json"))
            if d is None:
                print(f"## {key}: check-{key}.json がまだ無い\n")
                continue
            n = len(d.get("findings", []))
            if not n:
                print(f"## {key}: 修正案 0 件（検算は不要）\n")
                continue
            for c, i0 in enumerate(range(0, n, chunk)):
                i1 = min(n, i0 + chunk) - 1
                print(f"## {key} 検算 {c}（番号 {i0}〜{i1}）")
                print(f"あなたは TechHub の鮮度点検の検算者です（修正案を作った担当者とは別）。まず {BRIEFS}/verifier-brief.md と、同じフォルダの checker-brief.md を読んでください。\n"
                      f"今日: {today}　リポジトリ R: {common.ROOT}　作業フォルダ W: {work}　道具: R/{scripts}/\n"
                      f"範囲 {key} の修正案のうち、番号 {i0}〜{i1} を受け持ちます（W/out/check-{key}.json の findings の添字）。"
                      f"結果は W/out/verify-{key}-{c}.json に書き（chunk は {c}）、repl_check.py を全件合格にしてから、件数と退けた理由の要点だけ短く返してください。リポジトリは書き換えません。\n")
        return

    if "--areas" not in a:
        raise SystemExit("--areas a,b,... が要る（何を回すかは due.py で決める）")
    keys = a[a.index("--areas") + 1].split(",")
    unknown = [k for k in keys if k not in by_key]
    if unknown:
        raise SystemExit("知らない範囲: " + ", ".join(unknown))
    with open(os.path.join(work, "consts.txt"), "w", encoding="utf-8") as f:
        f.write(run("consts_index.py"))
    dist = os.path.join(common.ROOT, "nova-app", "dist")
    snap = os.path.join(work, "dist-snap")
    if os.path.exists(os.path.join(dist, "index.html")):
        shutil.rmtree(snap, ignore_errors=True)
        shutil.copytree(dist, snap)
    else:
        print("※ nova-app/dist が無い。先に cd nova-app && npm run build（画面の文を読む道具が使えない）\n")
    carried = common.load_json(common.UNVERIFIED, [])
    probed: dict[str, tuple[str, str]] = {}
    for key in keys:
        ar = by_key[key]
        cand = os.path.join(work, f"cand-{key}.md")
        print(run("time_scan.py", "--today", today, "--area", key, "--out", cand).strip())
        left = run("residue.py", "--area", key)
        with open(cand, "a", encoding="utf-8") as f:
            f.write(left)
        print(f"{key}: 古いと確かめた語の残り " + (left.split("（")[1].split("件")[0] if "（" in left else "0") + " 件")
        mine = [u for u in carried if u.get("area") == key]
        if mine:
            common.save_json(os.path.join(work, f"carry-{key}.json"), mine)
        blocked = []
        if "--no-reach" not in a:
            for h in ar["hosts"]:
                if h not in probed:
                    probed[h] = reach.probe(h)
                if probed[h][0] == "proxy":
                    blocked.append(h)
        skip = bool(ar["hosts"]) and len(blocked) * 2 >= len(ar["hosts"])
        print(f"\n## {key} 担当者" + ("　※主な出典の半分以上に届かない。許可が足されるまで見送るのが無難" if skip else ""))
        print(f"あなたは TechHub の鮮度点検の担当者です。まず {BRIEFS}/checker-brief.md を最後まで読んでください（対象・確かめ方・返す形が書いてあります）。\n"
              f"今日: {today}　リポジトリ R: {common.ROOT}　作業フォルダ W: {work}　道具: R/{scripts}/\n"
              f"担当範囲（{key}）: {ar['hint']}\n"
              + (f"この環境から開けないホスト（繰り返し試さず、別の一次情報が無ければ unverified へ）: {', '.join(blocked)}\n" if blocked else "")
              + f"W/cand-{key}.md（機械的に洗い出した候補と、古いと確かめた語の残り）"
              + (f"と W/carry-{key}.json（前回の点検で未確認だった {len(mine)} 件。最初に確かめ直す）" if mine else "")
              + f"から始め、古い疑いが強いものから順に、出典のページを開いて確かめてください。確かめた事実に基づく修正案だけを findings に入れ、"
              f"結果を W/out/check-{key}.json に書いて（既にあれば読んで、その続きに追記する）repl_check.py を全件合格にしてから、件数・開けなかったホスト・見ていない範囲だけ短く返してください。リポジトリは書き換えません。\n")


if __name__ == "__main__":
    main()
