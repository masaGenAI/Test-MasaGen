"""PDF と既存の flier 書籍を書名で照合し、WORK/plan.json を作る。

使い方: python3 -E -P match_records.py WORK
  既存の本に当たれば mode=replace、当たらなければ mode=new（id と category は手で埋める）。
"""
from __future__ import annotations

import argparse
import difflib
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hub import body_len, flier_records, load_html, norm  # noqa: E402


def score(pdf_title: str, title: str) -> float:
    """PDF の書名（1ページ目の最大の文字）と記録の書名の一致度（0〜1）。"""
    a, b = norm(pdf_title), norm(title)
    if not a or not b:
        return 0.0
    if a in b or b in a:
        return 1.0
    return difflib.SequenceMatcher(None, a, b).ratio()


def main() -> None:
    """照合して plan.json を書く。"""
    ap = argparse.ArgumentParser()
    ap.add_argument("work", type=Path)
    a = ap.parse_args()
    recs = flier_records(load_html())
    plan = []
    for f in sorted((a.work / "txt").glob("*.title")):
        pdf_title = f.read_text(encoding="utf-8")
        best, sc = None, 0.0
        for r, _, _ in recs.values():
            v = score(pdf_title, r["title"])
            if v > sc:
                best, sc = r, v
        if best and sc >= 0.85:
            plan.append({"pdf": f.stem, "id": best["id"], "mode": "replace", "pdf_title": pdf_title,
                         "title": best["title"], "score": round(sc, 2), "current_len": body_len(best)})
        else:
            plan.append({"pdf": f.stem, "id": None, "mode": "new", "category": None, "pdf_title": pdf_title,
                         "nearest": best["title"] if best else None, "score": round(sc, 2)})
    (a.work / "plan.json").write_text(json.dumps(plan, ensure_ascii=False, indent=1), encoding="utf-8")
    for p in plan:
        if p["mode"] == "replace":
            print(f"replace {p['pdf']} 「{p['pdf_title']}」→ {p['id']}「{p['title'][:30]}」（一致度{p['score']}・今{p['current_len']}字）")
        else:
            print(f"new     {p['pdf']} 「{p['pdf_title']}」→ 未登録（最も近い既存: {p['nearest'][:24] if p['nearest'] else '-'} {p['score']}）。id と category を plan.json に入れる")


if __name__ == "__main__":
    main()
