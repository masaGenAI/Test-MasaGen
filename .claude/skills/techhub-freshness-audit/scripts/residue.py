"""点検で「古い」と確かめた語が、原稿のほかの場所に残っていないかを数える（Web は見ない）。

usage: python3 -I residue.py                         … 範囲ごと・語ごとの残りの件数
       python3 -I residue.py --area KEY [--limit 12] … その範囲の残りの本文（語ごとに先頭 --limit 件）
       （--quoted を付けると、記事・公開事例の要約の定数（areas.json の quoted_consts）も数える）
  references/superseded.json の各語について、原稿に残る箇所を数える。ok_near の語が前後 120 字にある箇所は
  手当て済み（「旧◯◯」と添えてある、新しい値と並べてある、など）として除く。
  残りが全部「直すべき箇所」とは限らない（当時の事例・歴史、別の統計の同じ数字）。文脈を読んで決める。
"""
from __future__ import annotations

import os
import re
import sys
from bisect import bisect_right

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402

WINDOW = 120


def hits(text: str, term: dict) -> list[tuple[int, str]]:
    """手当て済みでない出現を (位置, 抜粋) で返す。"""
    out = []
    old = term["old"]
    at = text.find(old)
    while at != -1:
        near = text[max(0, at - WINDOW):at + len(old) + WINDOW]
        if not any(k in near for k in term.get("ok_near", [])):
            out.append((at, re.sub(r"\s+", " ", text[max(0, at - 70):at + len(old) + 90])))
        at = text.find(old, at + len(old))
    return out


def main() -> None:
    """範囲ごとの件数、または1範囲の残りの本文を書く。"""
    a = sys.argv[1:]
    only = a[a.index("--area") + 1] if "--area" in a else None
    limit = int(a[a.index("--limit") + 1]) if "--limit" in a else 12
    spec = common.areas()
    terms = common.load_json(os.path.join(common.SKILL, "references", "superseded.json"))["terms"]
    first, lines = common.techhub_lines()
    rows = common.decls(first, lines)
    off, pos = [], 0
    for s in lines:
        off.append(pos)
        pos += len(s) + 1
    decl_off = [off[line - first] for line, _, _ in rows]
    text = "\n".join(lines)
    found: dict[str, dict[str, list]] = {}
    quoted = set(spec.get("quoted_consts", []))

    def add(owner: str, term: dict, where: str, snip: str) -> None:
        found.setdefault(owner, {}).setdefault(term["old"], []).append((where, snip))

    for term in terms:
        for at, snip in hits(text, term):
            i = bisect_right(decl_off, at) - 1
            line, name, _ = rows[i] if i >= 0 else (first, "?", 0)
            if name in quoted and "--quoted" not in a:
                continue
            for owner in (common.areas_of(name, spec) or ["(未割り当て)"]):
                add(owner, term, f"{name}:{line}", snip)
    for ar in spec["areas"]:
        for rel in ar.get("files", []):
            base = os.path.join(common.ROOT, rel)
            paths = [os.path.join(base, f) for f in sorted(os.listdir(base)) if f.endswith(".json")] if os.path.isdir(base) else [base]
            for p in paths:
                with open(p, encoding="utf-8") as f:
                    body = f.read()
                for term in terms:
                    for _, snip in hits(body, term):
                        add(ar["key"], term, os.path.relpath(p, common.ROOT), snip)
    if not only:
        print("古いと確かめた語の残り（手当て済みを除く。直すべきかは文脈を読んで決める）")
        for key in [x["key"] for x in spec["areas"]] + ["(共通)", "(未割り当て)"]:
            got = found.get(key, {})
            if got:
                print(f"{key}: 計 {sum(len(v) for v in got.values())}  " + "、".join(f"{k}×{len(v)}" for k, v in sorted(got.items(), key=lambda kv: -len(kv[1]))))
        return
    got = found.get(only, {})
    print(f"\n## 既に古いと確かめた語の残り（{sum(len(v) for v in got.values())}件。事実と出典は確認済み。文脈を読み、現役の事実として書いている箇所を直す）")
    for term in terms:
        items = got.get(term["old"], [])
        if not items:
            continue
        print(f"\n### 「{term['old']}」×{len(items)} — 今の事実：{term['now']}（{term['as_of']} 確認、出典 {term['source']}）")
        if term.get("how"):
            print(f"直し方：{term['how']}")
        seen = set()
        shown = 0
        for where, snip in items:
            if snip[:50] in seen:
                continue
            seen.add(snip[:50])
            if shown < limit:
                print(f"- {where} … {snip}")
            shown += 1
        if shown > limit:
            print(f"- （ほか {shown - limit} か所。grep で確かめる）")


if __name__ == "__main__":
    main()
