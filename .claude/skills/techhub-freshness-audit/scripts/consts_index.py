"""TechHub の定数・関数の索引（行番号・名前・大きさ・担当範囲）を出す。

usage: python3 -I consts_index.py [--min-chars N] [--unassigned] [--area KEY]
  行番号は原稿が伸びるたびに変わるので、点検のたびに作り直して担当者に渡す。
  --unassigned  どの担当範囲にも入っていない定数だけを出す（新しく増えた教材の見落としを防ぐ）
"""
from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402


def main() -> None:
    """索引を標準出力に書く。"""
    a = sys.argv[1:]
    min_chars = int(a[a.index("--min-chars") + 1]) if "--min-chars" in a else 0
    only_area = a[a.index("--area") + 1] if "--area" in a else None
    spec = common.areas()
    first, lines = common.techhub_lines()
    rows = common.decls(first, lines)
    print(f"# TechHub: {first}〜{first + len(lines) - 1} 行、宣言 {len(rows)} 個（行番号: 名前 (文字数) [担当範囲]）")
    for line, name, size in rows:
        if size < min_chars:
            continue
        owners = common.areas_of(name, spec)
        if "--unassigned" in a and owners:
            continue
        if only_area and only_area not in owners:
            continue
        print(f"{line}: {name} ({size:,}) [{'+'.join(owners) or '-'}]")


if __name__ == "__main__":
    main()
