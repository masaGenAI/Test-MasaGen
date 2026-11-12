"""時点に依存する記述を、原稿から機械的に洗い出す（Web は見ない。古い「疑い」の候補を出すだけ）。

usage: python3 -I time_scan.py [--today YYYY-MM-DD] [--months 6] [--soon 45]            … 範囲ごとの件数
       python3 -I time_scan.py --area KEY [--limit 80] [--out FILE]                     … その範囲の候補の本文

出す候補:
  過ぎた予定   日付のあとに「予定・見込み・見通し・までに・目指す・計画」が続き、その日付が今日より前
  近い期限     同じ形で、日付が今日から --soon 日以内（次の点検までに古くなる）
  古い時点     「2025年3月時点／現在」「as of March 2025」が --months か月より前
  最新と書く   「最新・現行・直近・今年・昨年・来年・現時点」（件数だけ。本文は --area で先頭を出す）
候補は「古いかもしれない場所」で、古いと決まったわけではない。直すかどうかは出典を開いて決める。
"""
from __future__ import annotations

import datetime as dt
import os
import re
import sys
from bisect import bisect_right

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402

PLAN = r"(?:予定|見込|見通し|までに|目指す|目指し|計画)"
JA_PLAN = re.compile(r"(20[2-3]\d)年(?:(\d{1,2})月)?(?:(\d{1,2})日)?[^。、\"\\]{0,22}?" + PLAN)
JA_ASOF = re.compile(r"(20[2-3]\d)年(\d{1,2})月(?:\d{1,2}日)?末?(?:時点|現在)")
MONTHS = "January February March April May June July August September October November December".split()
EN_ASOF = re.compile(r"[Aa]s of (?:(?:early|mid|late|end of) )?(" + "|".join(MONTHS) + r")(?: \d{1,2},)? (20[2-3]\d)")
EN_PLAN = re.compile(r"(?:scheduled|expected|planned|slated|set to|due to|will (?:be|take|apply|begin|launch|end))[^.\"\\]{0,60}?(?:(" + "|".join(MONTHS) + r") )?(?:\d{1,2}, )?(20[2-3]\d)")
LATEST = re.compile(r"最新|現行|直近|今年|昨年|来年|現時点")


def snippet(text: str, a: int, b: int, pad: int = 70) -> str:
    """一致箇所の前後を1行にして返す。"""
    return re.sub(r"\s+", " ", text[max(0, a - pad):b + pad])


def scan(text: str, today: dt.date, months: int, soon: int) -> list[tuple[str, int, str, str]]:
    """本文から候補を拾い、(種類, 位置, 並べ替えキー, 抜粋) の配列で返す。"""
    out = []
    horizon = today + dt.timedelta(days=soon)
    for m in JA_PLAN.finditer(text):
        y, mo, d = int(m.group(1)), int(m.group(2) or 12), int(m.group(3) or 28)
        try:
            when = dt.date(y, min(mo, 12), min(d, 28))
        except ValueError:
            continue
        if when < today:
            out.append(("過ぎた予定", m.start(), when.isoformat(), snippet(text, m.start(), m.end())))
        elif when <= horizon:
            out.append(("近い期限", m.start(), when.isoformat(), snippet(text, m.start(), m.end())))
    for m in EN_PLAN.finditer(text):
        y, mo = int(m.group(2)), (MONTHS.index(m.group(1)) + 1 if m.group(1) else 12)
        when = dt.date(y, mo, 28)
        if when < today:
            out.append(("過ぎた予定", m.start(), when.isoformat(), snippet(text, m.start(), m.end())))
        elif when <= horizon:
            out.append(("近い期限", m.start(), when.isoformat(), snippet(text, m.start(), m.end())))
    limit = today.year * 12 + today.month - months
    for m in JA_ASOF.finditer(text):
        if int(m.group(1)) * 12 + int(m.group(2)) <= limit:
            out.append(("古い時点", m.start(), f"{m.group(1)}-{int(m.group(2)):02d}", snippet(text, m.start(), m.end())))
    for m in EN_ASOF.finditer(text):
        mo = MONTHS.index(m.group(1)) + 1
        if int(m.group(2)) * 12 + mo <= limit:
            out.append(("古い時点", m.start(), f"{m.group(2)}-{mo:02d}", snippet(text, m.start(), m.end())))
    for m in LATEST.finditer(text):
        out.append(("最新と書く", m.start(), "", snippet(text, m.start(), m.end(), 50)))
    return out


def main() -> None:
    """範囲ごとの件数、または1範囲の候補の本文を書く。"""
    a = sys.argv[1:]
    opt = lambda k, d: a[a.index(k) + 1] if k in a else d  # noqa: E731
    today = dt.date.fromisoformat(opt("--today", dt.date.today().isoformat()))
    months, soon, limit = int(opt("--months", 6)), int(opt("--soon", 45)), int(opt("--limit", 80))
    only = opt("--area", None)
    spec = common.areas()
    first, lines = common.techhub_lines()
    rows = common.decls(first, lines)
    pos = 0
    line_off = []
    for s in lines:
        line_off.append(pos)
        pos += len(s) + 1
    decl_off = [line_off[line - first] for line, _, _ in rows]
    text = "\n".join(lines)
    found: dict[str, list] = {}
    for kind, at, key, snip in scan(text, today, months, soon):
        i = bisect_right(decl_off, at) - 1
        line, name, _ = rows[i] if i >= 0 else (first, "?", 0)
        for owner in (common.areas_of(name, spec) or ["(未割り当て)"]):
            found.setdefault(owner, []).append((kind, key, f"{name}:{line}", snip))
    for ar in spec["areas"]:
        for rel in ar.get("files", []):
            base = os.path.join(common.ROOT, rel)
            paths = [os.path.join(base, f) for f in sorted(os.listdir(base)) if f.endswith(".json")] if os.path.isdir(base) else [base]
            for p in paths:
                with open(p, encoding="utf-8") as f:
                    body = f.read()
                for kind, at, key, snip in scan(body, today, months, soon):
                    found.setdefault(ar["key"], []).append((kind, key, os.path.relpath(p, common.ROOT), snip))
    kinds = ["過ぎた予定", "近い期限", "古い時点", "最新と書く"]
    if not only:
        print(f"今日 {today}（古い時点＝{months}か月より前、近い期限＝{soon}日以内）。数字は候補の件数で、古いと決まった件数ではない")
        print(f"{'範囲':<22}" + "".join(f"{k:>8}" for k in kinds))
        for key in [x["key"] for x in spec["areas"]] + ["(共通)", "(未割り当て)"]:
            got = found.get(key, [])
            print(f"{key:<22}" + "".join(f"{sum(1 for g in got if g[0] == k):>10}" for k in kinds))
        return
    out = [f"# {only} の時点依存の候補（{today} 時点。機械的な洗い出し。古いと決まったわけではない）"]
    got = found.get(only, [])
    for k in kinds:
        items, seen = [], set()
        for kind, key, where, snip in sorted((g for g in got if g[0] == k), key=lambda g: g[1]):
            if snip[:60] in seen:
                continue
            seen.add(snip[:60])
            items.append(f"- [{key}] {where} … {snip}")
        out.append(f"\n## {k}（{len(items)}件" + (f"、先頭 {limit}件" if len(items) > limit else "") + "）")
        out.extend(items[:limit])
    body = "\n".join(out) + "\n"
    if "--out" in a:
        with open(opt("--out", ""), "w", encoding="utf-8") as f:
            f.write(body)
        print(f"{only}: " + "、".join(f"{k} {sum(1 for g in got if g[0] == k)}" for k in kinds) + " → " + opt("--out", ""))
    else:
        sys.stdout.write(body)


if __name__ == "__main__":
    main()
