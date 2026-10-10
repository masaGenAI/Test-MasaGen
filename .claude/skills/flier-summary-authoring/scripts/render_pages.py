"""flier 要約 PDF をページ画像と抽出テキストに変換する。

使い方: python3 -E -P render_pages.py WORK [--dpi 130]
  WORK/pdf/*.pdf → WORK/img/<stem>_pN.png（最終ページが著作権表示だけなら省く）
                 → WORK/txt/<stem>.txt（抽出テキスト。縦書きは列順が崩れるので数字の照合用）
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    import pymupdf
except ImportError:  # pragma: no cover
    sys.exit("PyMuPDF が必要です: pip install pymupdf")


def page1_title(page) -> str:
    """1ページ目でいちばん大きい文字の行を書名として返す。"""
    spans = [(round(sp["size"], 1), sp["text"].strip())
             for b in page.get_text("dict")["blocks"] for ln in b.get("lines", []) for sp in ln["spans"]
             if sp["text"].strip()]
    if not spans:
        return ""
    top = max(sz for sz, _ in spans)
    return "".join(t for sz, t in spans if sz == top)


def main() -> None:
    """WORK/pdf の各 PDF を画像とテキストに変換する。"""
    ap = argparse.ArgumentParser()
    ap.add_argument("work", type=Path)
    ap.add_argument("--dpi", type=int, default=130)
    a = ap.parse_args()
    pdfs = sorted((a.work / "pdf").glob("*.pdf"))
    if not pdfs:
        sys.exit(f"{a.work / 'pdf'} に PDF がありません")
    (a.work / "img").mkdir(exist_ok=True)
    (a.work / "txt").mkdir(exist_ok=True)
    for f in pdfs:
        doc = pymupdf.open(f)
        texts = []
        for n, page in enumerate(doc, 1):
            t = page.get_text()
            texts.append(t)
            if n == len(doc) and len(t.strip()) < 600 and "Copyright" in t:
                continue
            page.get_pixmap(dpi=a.dpi).save(a.work / "img" / f"{f.stem}_p{n}.png")
        (a.work / "txt" / f"{f.stem}.txt").write_text("\n".join(texts), encoding="utf-8")
        title = page1_title(doc[0])
        (a.work / "txt" / f"{f.stem}.title").write_text(title, encoding="utf-8")
        print(f"{f.stem}: {len(doc)} ページ | 書名 {title}")


if __name__ == "__main__":
    main()
