"""WORK/out の要約を booksummaryhub.html に差し込む。

使い方: python3 -E -P apply_summary.py WORK [--dry-run]
  replace: oneLiner・overview・points・takeaway を置き換える（書誌情報・diagram は残す）
  new    : plan.json の category（DATA のカテゴリ id）の books 末尾に追加する
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hub import HUB, body_len, flier_records, load_html  # noqa: E402

FIELDS = ("oneLiner", "overview", "points", "takeaway")
META = ("title", "author", "publisher", "year", "pages", "price")


def natural(i: str) -> tuple:
    """ai9 < ai10 となる並べ替えキー。"""
    m = re.match(r"(\D*)(\d*)", i)
    return (m.group(1), int(m.group(2) or 0))


def dump(r: dict) -> str:
    """ハブと同じ書式（区切りの空白なし）で JSON にする。"""
    return json.dumps(r, ensure_ascii=False, separators=(",", ":"))


def category_tail(html: str, cat: str) -> int:
    """カテゴリ cat の books 配列の最後の記録の終わりの位置を返す。"""
    m = re.search(r'\{\s*id:"%s",[^\n]*books:\[\n' % re.escape(cat), html)
    if not m:
        sys.exit(f"カテゴリ {cat} が DATA に見つからない")
    pos, last = m.end(), None
    dec = json.JSONDecoder()
    while html.startswith('{"id":', pos) or html.startswith('    {"id":', pos):
        start = html.index("{", pos)
        _, end = dec.raw_decode(html, start)
        last = end
        nl = html.find("\n", end)
        pos = nl + 1
    if last is None:
        sys.exit(f"カテゴリ {cat} に既存の本がない（手で追加すること）")
    return last


def main() -> None:
    """差し込みを行う（--dry-run なら表示だけ）。"""
    ap = argparse.ArgumentParser()
    ap.add_argument("work", type=Path)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    plan = [p for p in json.loads((a.work / "plan.json").read_text(encoding="utf-8")) if p.get("id")]
    html = load_html()
    recs = flier_records(html)
    edits = []  # (start, end, text)
    for p in sorted(plan, key=lambda x: (x["mode"], x.get("category") or "", natural(x["id"]))):
        o = json.loads((a.work / "out" / f"{p['id']}.json").read_text(encoding="utf-8"))
        pts = [{"h": x["h"], "b": x["b"]} for x in o["points"]]
        if p["mode"] == "replace":
            r, s, e = recs[p["id"]]
            before = body_len(r)
            r = dict(r)
            for k in FIELDS:
                r[k] = pts if k == "points" else o[k]
            edits.append((s, e, dump(r)))
            print(f"replace {p['id']}: {before}字 → {body_len(r)}字")
        else:
            if p["id"] in recs:
                sys.exit(f"{p['id']} は既に使われている id")
            r = {"id": p["id"], **{k: str(o[k]) for k in META if o.get(k)}}
            for k in FIELDS:
                r[k] = pts if k == "points" else o[k]
            tail = category_tail(html, p["category"])
            edits.append((tail, tail, ",\n" + dump(r)))
            print(f"new     {p['id']} → {p['category']}: {r['title']}（{body_len(r)}字）")
    if a.dry_run:
        return
    # 同じ位置への追加は id 順に並ぶよう、後ろの位置から・同じ位置は後に積んだものから差し込む
    for _, (s, e, t) in sorted(enumerate(edits), key=lambda x: (-x[1][0], -x[0])):
        html = html[:s] + t + html[e:]
    HUB.write_text(html, encoding="utf-8")
    print(f"差し込み {len(edits)}件 → {HUB}")


if __name__ == "__main__":
    main()
