"""見張り番の一覧（よく動く事実と、アプリが今書いている値）を出す。

usage: python3 -I sentinels.py [--area KEY]
  references/sentinels.json の各項目について、terms（アプリが今書いている値）が原稿に何回あるかを数える。
  0回の項目は、値が書き換わったのに見張り番が古いままという印（terms を直す）。
  この道具は Web を見ない。urls を開いて terms より新しい値が出ていないかを確かめるのは人（担当者）。
"""
from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402


def main() -> None:
    """見張り番を1件ずつ書く。"""
    a = sys.argv[1:]
    only = a[a.index("--area") + 1] if "--area" in a else None
    spec = common.load_json(os.path.join(common.SKILL, "references", "sentinels.json"))
    _, lines = common.techhub_lines()
    text = "\n".join(lines)
    data_dir = os.path.join(common.ROOT, "nova-app", "src", "data")
    for name in sorted(os.listdir(data_dir)):
        if name.endswith(".json"):
            with open(os.path.join(data_dir, name), encoding="utf-8") as f:
                text += "\n" + f.read()
    stale = 0
    for s in spec["sentinels"]:
        if only and only not in s["areas"]:
            continue
        counts = [(t, text.count(t)) for t in s["terms"]]
        gone = [t for t, n in counts if n == 0]
        stale += bool(gone)
        print(f"- {s['id']}（{s['rhythm']}、{s['as_of']} 確認）: {s['what']}")
        print("    今の値: " + "、".join(f"「{t}」×{n}" for t, n in counts) + ("   ← 原稿に無い。terms を直す" if gone else ""))
        print("    開く先: " + " ／ ".join(s["urls"]) + (f"   （{s['note']}）" if s.get("note") else ""))
        print("    範囲: " + ", ".join(s["areas"]))
    if stale:
        print(f"terms が原稿に無い見張り番 {stale} 件")
        sys.exit(1)


if __name__ == "__main__":
    main()
