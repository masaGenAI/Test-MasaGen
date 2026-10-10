"""WORK/out/<id>.json を品質基準で検査する。

使い方: python3 -E -P check_summary.py WORK [--ids id1 id2 ...]
  エラー: 必須項目・長さ・文字種（cp932 外の漢字、キリル文字、全角ダッシュ）
  警告  : 数字（10以上・小数・%）が抽出テキストに見つからない／PDF と40字以上一致する書き写し
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hub import body_len  # noqa: E402

RANGES = {"oneLiner": (60, 110), "overview": (350, 500), "takeaway": (180, 300)}
NEW_META = ("title", "author", "publisher", "year", "pages")


def nums(s: str) -> set[str]:
    """10以上の数・小数・%付きの数を取り出す。"""
    s = unicodedata.normalize("NFKC", s)
    out = set()
    for m in re.finditer(r"\d[\d,]*(?:\.\d+)?", s):
        t = m.group(0).replace(",", "")
        if "." in t or s[m.end():m.end() + 1] == "%" or float(t) >= 10:
            out.add(t)
    return out


def bad_chars(s: str) -> list[str]:
    """cp932 外の漢字・キリル文字・全角ダッシュを返す。"""
    bad = []
    for ch in s:
        if "Ѐ" <= ch <= "ԯ" or ch == "—":
            bad.append(ch)
        elif "一" <= ch <= "鿿":
            try:
                ch.encode("cp932")
            except UnicodeEncodeError:
                bad.append(ch)
    return bad


def longest_copy(text: str, src: str, floor: int = 40) -> int:
    """text の中で src と一致する最長の連続部分の長さ（floor 未満は 0）。"""
    best = 0
    for i in range(0, max(0, len(text) - floor + 1), 4):
        n = floor
        while i + n <= len(text) and text[i:i + n] in src:
            n += 1
        best = max(best, n - 1 if n > floor else 0)
    return best


def main() -> None:
    """検査して結果を表示する。エラーがあれば終了コード 1。"""
    ap = argparse.ArgumentParser()
    ap.add_argument("work", type=Path)
    ap.add_argument("--ids", nargs="*")
    a = ap.parse_args()
    plan = {p["id"]: p for p in json.loads((a.work / "plan.json").read_text(encoding="utf-8")) if p.get("id")}
    ids = a.ids or sorted(plan)
    n_err = 0
    for i in ids:
        f = a.work / "out" / f"{i}.json"
        err, warn = [], []
        if not f.exists():
            print(f"✗ {i}: out/{i}.json がない")
            n_err += 1
            continue
        try:
            o = json.loads(f.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            print(f"✗ {i}: JSON が壊れている {e}")
            n_err += 1
            continue
        for k, (lo, hi) in RANGES.items():
            if not lo <= len(o.get(k, "")) <= hi:
                err.append(f"{k} {len(o.get(k, ''))}字（{lo}〜{hi}）")
        pts = o.get("points") or []
        if not 6 <= len(pts) <= 9:
            err.append(f"points {len(pts)}個（6〜9）")
        for p in pts:
            if not 8 <= len(p.get("h", "")) <= 20 or not 120 <= len(p.get("b", "")) <= 230:
                err.append(f"point「{p.get('h', '')[:12]}」見出し{len(p.get('h', ''))}字・本文{len(p.get('b', ''))}字")
        total = body_len(o)
        if not 1500 <= total <= 1900:
            err.append(f"合計 {total}字（1,500〜1,900）")
        if plan.get(i, {}).get("mode") == "new":
            miss = [k for k in NEW_META if not str(o.get(k, "")).strip()]
            if miss:
                err.append(f"新規の書誌情報がない: {miss}")
        text = o.get("oneLiner", "") + o.get("overview", "") + "".join(p.get("h", "") + " " + p.get("b", "") for p in pts) + o.get("takeaway", "")
        bc = bad_chars(text + "".join(str(o.get(k, "")) for k in NEW_META))
        if bc:
            err.append(f"使えない文字 {''.join(sorted(set(bc)))}")
        src_file = a.work / "txt" / f"{plan.get(i, {}).get('pdf', '')}.txt"
        if src_file.exists():
            src = unicodedata.normalize("NFKC", re.sub(r"\s", "", src_file.read_text(encoding="utf-8")))
            src = re.sub(r"(\d)・(\d)", r"\1.\2", src)  # 縦書きの小数点は中黒で組まれる（13・9％）
            missing = sorted(n for n in nums(text) if n not in src.replace(",", ""))
            if missing:
                warn.append(f"抽出テキストに見つからない数字 {missing}（画像で確認）")
            cp = longest_copy(unicodedata.normalize("NFKC", re.sub(r"\s", "", text)), src)
            if cp:
                warn.append(f"PDF と {cp}字一致する書き写し")
        mark = "✗" if err else ("△" if warn else "✓")
        print(f"{mark} {i}: 合計{total}字・points{len(pts)}個" + "".join(f"\n    エラー: {e}" for e in err) + "".join(f"\n    警告: {w}" for w in warn))
        n_err += bool(err)
    print(f"\nエラーのある本 {n_err}冊 / {len(ids)}冊")
    sys.exit(1 if n_err else 0)


if __name__ == "__main__":
    main()
