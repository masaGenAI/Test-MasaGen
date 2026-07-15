#!/usr/bin/env python3
"""キーワード追加分を additions.json に追記するヘルパー.

Web で調べて決定した「区分・提供・名称・分類・ステータス」を1件追加する。
Notion 本体には触れない（アーティファクト用の追記ファイルのみ）。

使い方（例）:
    python artifacts/_build/add_entries.py \
        --cat 資格 --name "PL-300" --prov MS --genre PL \
        --status 未取得 --url "https://learn.microsoft.com/..."

複数まとめて追加したい場合は --json でリストを渡す:
    python artifacts/_build/add_entries.py --json '[{"cat":"書籍","name":"..."}]'

追加後は build.py を実行して artifact.html を再生成すること。
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

BUILD_DIR = Path(__file__).resolve().parent
ADDITIONS = BUILD_DIR / "additions.json"

VALID_CATS = {"資格", "Tools", "講座", "書籍", "Udemy"}


def load() -> list[dict]:
    if ADDITIONS.exists():
        return json.loads(ADDITIONS.read_text(encoding="utf-8"))
    return []


def save(rows: list[dict]) -> None:
    ADDITIONS.write_text(
        json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def normalize(row: dict) -> dict:
    cat = row.get("cat", "").strip()
    if cat not in VALID_CATS:
        raise SystemExit(f"cat は {sorted(VALID_CATS)} のいずれか（受領: {cat!r}）")
    if not row.get("name", "").strip():
        raise SystemExit("name は必須です")
    return {
        "cat": cat,
        "prov": row.get("prov", "").strip(),
        "name": row["name"].strip(),
        "genre": row.get("genre", "").strip(),
        "status": row.get("status", "未着手").strip() or "未着手",
        "date": row.get("date", "").strip(),
        "url": row.get("url", "").strip(),
    }


def main() -> None:
    ap = argparse.ArgumentParser(description="学習トラッカーにエントリを追加")
    ap.add_argument("--cat", help="区分: 資格 / Tools / 講座 / 書籍 / Udemy")
    ap.add_argument("--name", help="名称（資格名・書籍名・講座名など）")
    ap.add_argument("--prov", default="", help="提供 (MS/Google/AWS/... 書籍・講座は省略)")
    ap.add_argument("--genre", default="", help="分類（Cloud/AI/ファイナンス・財務 等）")
    ap.add_argument("--status", default="未着手", help="ステータス")
    ap.add_argument("--date", default="", help="日付 YYYY-MM-DD（任意）")
    ap.add_argument("--url", default="", help="参考URL（任意）")
    ap.add_argument("--json", dest="json_blob", help="複数追加用のJSONリスト")
    args = ap.parse_args()

    rows = load()
    if args.json_blob:
        incoming = json.loads(args.json_blob)
        added = [normalize(r) for r in incoming]
    elif args.cat and args.name:
        added = [
            normalize(
                {
                    "cat": args.cat,
                    "name": args.name,
                    "prov": args.prov,
                    "genre": args.genre,
                    "status": args.status,
                    "date": args.date,
                    "url": args.url,
                }
            )
        ]
    else:
        raise SystemExit("--cat と --name、または --json を指定してください")

    rows.extend(added)
    save(rows)
    for a in added:
        print(f"追加: [{a['cat']}] {a['name']}  ({a['genre'] or '分類なし'} / {a['status']})")
    print(f"additions.json 合計 {len(rows)} 件。次に: python artifacts/_build/build.py")


if __name__ == "__main__":
    main()
