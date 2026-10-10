"""booksummaryhub.html の flier 書籍レコードを読み書きする共通処理。"""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

HUB = Path(__file__).resolve().parents[4] / "nova-app/public/booksummaryhub.html"
_DEC = json.JSONDecoder()


def load_html() -> str:
    """ハブの HTML を読む。"""
    return HUB.read_text(encoding="utf-8")


def flier_records(html: str) -> dict[str, tuple[dict, int, int]]:
    """flier 書籍（YouTube・note 以外）を id → (記録, 開始位置, 終了位置) で返す。"""
    out: dict[str, tuple[dict, int, int]] = {}
    for m in re.finditer(r'\{"id":"(?!yt_|note_)', html):
        try:
            r, end = _DEC.raw_decode(html, m.start())
        except json.JSONDecodeError:
            continue
        if isinstance(r, dict) and "oneLiner" in r and "points" in r:
            out[r["id"]] = (r, m.start(), end)
    return out


def norm(s: str) -> str:
    """書名照合用に記号・空白を落として正規化する。"""
    s = unicodedata.normalize("NFKC", s or "").lower()
    return re.sub(r"[\s「」『』［］\[\]（）()・、。,!?―〔〕:～〜\-—–]", "", s)


def body_len(r: dict) -> int:
    """overview＋points本文＋takeaway の字数。"""
    return len(r.get("overview", "")) + sum(len(p.get("b", "")) for p in r.get("points", [])) + len(r.get("takeaway", ""))
