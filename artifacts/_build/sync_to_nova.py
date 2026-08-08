# -*- coding: utf-8 -*-
"""Anything Memo の data.json を、Nova 側 public/anything-memo.html の
埋め込みデータ（const BASE=...）に差し替える。UI・window.amtAgent 等の
Nova 側作り込みは保持し、データ行のみ置換する。
使い方: python sync_to_nova.py <入力html> <出力html>
"""
import json, os, sys

ART = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def build_base():
    d = json.load(open(f"{ART}/anything-memo-tracker/data.json", encoding="utf-8"))
    memos = [dict(m) for m in d["memos"]]
    for i, m in enumerate(memos):
        m["id"] = "m" + str(i + 1)
    return json.dumps({"genres": d["genres"], "memos": memos}, ensure_ascii=False)

def main(src, dst):
    base = build_base()
    lines = open(src, encoding="utf-8").read().split("\n")
    n = 0
    for i, ln in enumerate(lines):
        if ln.startswith("const BASE="):
            lines[i] = "const BASE=" + base + ";"
            n += 1
    if n != 1:
        raise SystemExit(f"ERROR: expected exactly 1 'const BASE=' line, found {n}")
    out = "\n".join(lines)
    open(dst, "w", encoding="utf-8").write(out)
    memos = json.loads(base)["memos"]
    print(f"synced BASE: {len(memos)} memos -> {dst}")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
