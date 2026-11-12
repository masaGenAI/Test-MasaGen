"""置換案を、原稿を書き換えずに検査する。

usage: python3 -I repl_check.py <file.json> [...]
  受け付ける形（どれか）:
    置換の配列          [{"file", "old", "new", "count"?}]
    担当者の結果        {"area", "findings": [{..., "replacements": [...]}], "unverified": [...], ...}   （check-<範囲>.json）
    検算者の結果        {"area", "chunk", "results": [{"index", "verdict", "reason", "replacements"?}]}   （verify-<範囲>-<n>.json）
  確かめること:
    - file が直してよい原稿か（生成物や dist は不可）
    - old が空でない、new と違う、原稿にちょうど count 回（既定1回）ある
    - new に簡体字（cp932 に無い字）やキリル文字が新しく入っていない
    - 担当者・検算者の結果は、必要な項目がそろっているか、verdict が決まった3語か
  合格しない案が1つでもあれば終了コード1。
"""
from __future__ import annotations

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402

NEED = ["tab", "where", "kind", "current_text", "problem", "verified_fact", "source_url", "source_quote", "confidence", "severity", "replacements"]
VERDICTS = ("confirmed", "revised", "rejected")
CYRILLIC = re.compile(r"[Ѐ-ԯ]")
_cache: dict[str, str] = {}


def source(rel: str) -> str:
    """原稿を読む（同じファイルは1回だけ）。"""
    if rel not in _cache:
        with open(os.path.join(common.ROOT, rel), encoding="utf-8") as f:
            _cache[rel] = f.read()
    return _cache[rel]


def odd_chars(old: str, new: str) -> str:
    """new に新しく入った簡体字・キリル文字を返す（無ければ空文字）。"""
    bad = []
    for ch in set(new) - set(old):
        if CYRILLIC.match(ch):
            bad.append(ch)
            continue
        if ord(ch) >= 0x3400:
            try:
                ch.encode("cp932")
            except UnicodeEncodeError:
                if "一" <= ch <= "鿿":
                    bad.append(ch)
    return "".join(sorted(bad))


def check_reps(reps: list, label: str) -> int:
    """置換の配列を検査し、不合格の件数を返す。"""
    bad = 0
    for i, r in enumerate(reps):
        f, old, new = r.get("file", ""), r.get("old", ""), r.get("new", "")
        cnt = int(r.get("count", 1) or 1)
        tag = f"{label}[{i}]"
        if not f.startswith(common.ALLOWED) or ".." in f:
            print(f"NG {tag} 直してよい原稿ではない: {f}")
            bad += 1
            continue
        if not old or old == new:
            print(f"NG {tag} old が空か new と同じ")
            bad += 1
            continue
        n, has_new = common.free_count(source(f), old, new)
        if n == 0 and has_new:
            print(f"OK {tag} {f}: 適用済み（new が既に原稿にある）")
            continue
        if n != cnt:
            print(f"NG {tag} {f}: old が {n} 回（期待 {cnt} 回）: {old[:70]!r}")
            bad += 1
            continue
        odd = odd_chars(old, new)
        if odd:
            print(f"NG {tag} new に簡体字かキリル文字: {odd}")
            bad += 1
            continue
        print(f"OK {tag} {f} x{n}: {old[:50]!r}")
    return bad


def check_file(path: str) -> int:
    """1ファイルを検査し、不合格の件数を返す。"""
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    name = os.path.basename(path)
    if isinstance(d, list):
        return check_reps(d, name)
    bad = 0
    if "findings" in d:
        for k in ("area", "findings", "unverified", "checked_ok", "coverage"):
            if k not in d:
                print(f"NG {name} 項目が無い: {k}")
                bad += 1
        for i, fd in enumerate(d.get("findings", [])):
            miss = [k for k in NEED if k not in fd]
            if miss:
                print(f"NG {name} findings[{i}] 項目が無い: {', '.join(miss)}")
                bad += 1
            if not fd.get("replacements"):
                print(f"NG {name} findings[{i}] 置換案が無い（直せないなら unverified に回す）")
                bad += 1
            bad += check_reps(fd.get("replacements", []), f"{name} findings[{i}]")
        return bad
    if "results" in d:
        chk = os.path.join(os.path.dirname(path), f"check-{d.get('area')}.json")
        base = common.load_json(chk, {}).get("findings", [])
        for r in d["results"]:
            i = r.get("index")
            if r.get("verdict") not in VERDICTS:
                print(f"NG {name} index {i}: verdict は {' / '.join(VERDICTS)} のどれか")
                bad += 1
                continue
            if not r.get("reason"):
                print(f"NG {name} index {i}: reason が無い")
                bad += 1
            if r["verdict"] == "rejected":
                continue
            reps = r.get("replacements")
            if reps is None and r["verdict"] == "confirmed" and isinstance(i, int) and i < len(base):
                reps = base[i].get("replacements", [])
            if not reps:
                print(f"NG {name} index {i}: {r['verdict']} なのに置換が無い")
                bad += 1
                continue
            bad += check_reps(reps, f"{name} index {i}")
        return bad
    print(f"NG {name} 形が分からない（配列・findings・results のどれでもない）")
    return 1


def main() -> None:
    """引数のファイルを順に検査する。"""
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    bad = sum(check_file(p) for p in sys.argv[1:])
    print("全件合格" if not bad else f"不合格 {bad} 件")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
