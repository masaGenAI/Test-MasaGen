#!/usr/bin/env python3
"""学習ロードマップ トラッカー — アーティファクト生成スクリプト.

入力（優先順）:
  1) artifacts/_build/entries_override.json があればそれを正本として使う
     （公開ページの「JSONで書き出し」で得たファイルを置くと恒久反映される）
  2) なければ artifacts/_build/raw/*.json（Notion 各DBのスナップショット）
     ＋ artifacts/_build/additions.json（キーワード追加分）

出力:
  artifacts/learning-tracker/artifact.html  … 単体で開ける完全なHTML
  artifacts/_build/publish.html             … Artifact 公開用（本文のみ版）

テンプレートは artifacts/_build/template.html（__TOKEN__ を置換）。
区分の判定は raw ファイル名の接頭辞で行う（例: hon.json / hon_2.json → 書籍）。
"""
from __future__ import annotations

import hashlib
import html
import json
from collections import Counter, defaultdict
from pathlib import Path

BUILD_DIR = Path(__file__).resolve().parent
RAW_DIR = BUILD_DIR / "raw"
ADDITIONS = BUILD_DIR / "additions.json"
OVERRIDE = BUILD_DIR / "entries_override.json"
TEMPLATE = BUILD_DIR / "template.html"
OUT = BUILD_DIR.parent / "learning-tracker" / "artifact.html"

CATEGORIES = {
    "shikaku": {"cat": "資格", "name": "資格名", "prov": "プロバイダー", "genre": "大項目"},
    "tools": {"cat": "Tools", "name": "タイトル", "prov": "プロバイダー", "genre": "大項目"},
    "koza": {"cat": "講座", "name": "講座", "prov": None, "genre": "ジャンル"},
    "hon": {"cat": "書籍", "name": "書籍名", "prov": None, "genre": "ジャンル"},
    "udemy": {"cat": "Udemy", "name": "コース名", "prov": None, "genre": "ジャンル"},
}
CAT_ORDER = ["資格", "Tools", "講座", "書籍", "Udemy"]
CAT_COLOR = {
    "資格": "#6366f1", "Tools": "#22c55e", "講座": "#a855f7",
    "書籍": "#38bdf8", "Udemy": "#e879f9",
}
STATUS_OPTS = {
    "資格": ["未取得", "準備中", "取得済み"],
    "Tools": ["未着手", "着手中", "完了", "保留", "その他"],
    "講座": ["未着手", "着手中", "再チェック", "完了", "保留", "その他"],
    "書籍": ["未着手", "着手中", "完了", "保留", "その他"],
    "Udemy": ["未着手", "完了"],
}
DONE = {"完了", "取得済み"}


def prefix_of(stem: str) -> str:
    parts = stem.rsplit("_", 1)
    if len(parts) == 2 and parts[1].isdigit():
        return parts[0]
    return stem


def normalize(row: dict, spec: dict | None) -> dict:
    """spec=None のときは既に正規化済み（override）とみなす。"""
    if spec is None:
        return {
            "cat": row["cat"],
            "prov": row.get("prov", ""),
            "name": row.get("name", ""),
            "genre": row.get("genre", ""),
            "status": row.get("status", "未着手") or "未着手",
            "date": row.get("date", ""),
            "url": row.get("url", ""),
        }
    return {
        "cat": spec["cat"],
        "prov": (row.get(spec["prov"]) or "") if spec["prov"] else "",
        "name": row.get(spec["name"], "") or "",
        "genre": row.get(spec["genre"], "") or "",
        "status": row.get("ステータス", "") or "未着手",
        "date": row.get("date") or row.get("date:取得予定日:start") or "",
        "url": row.get("url", "") or "",
    }


def load_entries() -> list[dict]:
    entries: list[dict] = []
    if OVERRIDE.exists():
        print(f"入力: {OVERRIDE.name}（正本）")
        for row in json.loads(OVERRIDE.read_text(encoding="utf-8")):
            entries.append(normalize(row, None))
    else:
        for f in sorted(RAW_DIR.glob("*.json")):
            spec = CATEGORIES.get(prefix_of(f.stem))
            if spec is None:
                print(f"  警告: 未知の接頭辞をスキップ: {f.name}")
                continue
            for row in json.loads(f.read_text(encoding="utf-8")):
                entries.append(normalize(row, spec))
        if ADDITIONS.exists():
            for row in json.loads(ADDITIONS.read_text(encoding="utf-8")):
                entries.append(normalize(row, None))
    order = {c: i for i, c in enumerate(CAT_ORDER)}
    entries.sort(key=lambda e: order.get(e["cat"], len(CAT_ORDER)))
    return entries


def esc(s: object) -> str:
    return html.escape(str(s), quote=True)


def render(entries: list[dict]) -> str:
    total = len(entries)
    by_cat: dict[str, list[dict]] = defaultdict(list)
    for e in entries:
        by_cat[e["cat"]].append(e)
    cat_counts = {c: len(by_cat.get(c, [])) for c in CAT_ORDER}
    done_by_cat = {c: sum(1 for e in by_cat.get(c, []) if e["status"] in DONE) for c in CAT_ORDER}
    done_total = sum(done_by_cat.values())
    pct = round(done_total / total * 100) if total else 0

    acc, stops = 0.0, []
    for c in CAT_ORDER:
        frac = (cat_counts[c] / total) if total else 0
        stops.append(f"{CAT_COLOR[c]} {acc*100:.2f}% {(acc+frac)*100:.2f}%")
        acc += frac
    donut_cat = ", ".join(stops)

    legend = "".join(
        f'<li><span class="dot" style="background:{CAT_COLOR[c]}"></span>{c} {done_by_cat[c]}/{cat_counts[c]}</li>'
        for c in CAT_ORDER
    )
    ratio = "".join(
        f'<li><span class="dot" style="background:{CAT_COLOR[c]}"></span>{c} {cat_counts[c]}</li>'
        for c in CAT_ORDER
    )
    tabs = '<button class="tab active" data-cat="全一覧">📋 全一覧</button>' + "".join(
        f'<button class="tab" data-cat="{c}">{c}</button>' for c in CAT_ORDER
    )

    data_json = json.dumps(entries, ensure_ascii=False)
    version = hashlib.sha1(data_json.encode("utf-8")).hexdigest()[:10]

    tmpl = TEMPLATE.read_text(encoding="utf-8")
    repl = {
        "__TOTAL__": str(total),
        "__DONE__": str(done_total),
        "__PCT__": str(pct),
        "__LEGEND__": legend,
        "__RATIO__": ratio,
        "__DONUT_CAT__": donut_cat,
        "__TABS__": tabs,
        "__DATA_JSON__": data_json,
        "__VER__": version,
        "__CAT_COLOR_JSON__": json.dumps(CAT_COLOR, ensure_ascii=False),
        "__STATUS_OPTS_JSON__": json.dumps(STATUS_OPTS, ensure_ascii=False),
    }
    for k, v in repl.items():
        tmpl = tmpl.replace(k, v)
    return tmpl


def main() -> None:
    entries = load_entries()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    full = render(entries)
    OUT.write_text(full, encoding="utf-8")
    body = full[full.index("<style>") : full.rindex("</script>") + len("</script>")]
    (BUILD_DIR / "publish.html").write_text(body + "\n", encoding="utf-8")

    by_cat = Counter(e["cat"] for e in entries)
    done = Counter(e["cat"] for e in entries if e["status"] in DONE)
    print(f"生成: {OUT}  (全 {len(entries)} 件)")
    for c in CAT_ORDER:
        print(f"  {c:6} {by_cat.get(c,0):4} 件  (完了 {done.get(c,0)})")


if __name__ == "__main__":
    main()
