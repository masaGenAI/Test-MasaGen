"""既存の YouTube・note 要約の長さを出典ごとに実測する（新規追加の基準を決め直すとき用）。

usage: python3 -I measure_existing.py <booksummaryhub.html>
"""
import re, json, sys, statistics as st
from collections import defaultdict, Counter
s = open(sys.argv[1], encoding="utf-8").read()
recs = [json.loads(m.group(0).rstrip(",")) for m in re.finditer(r'^\{"id":"(?:yt_|note_)[^\n]*$', s, re.M)]
g = defaultdict(list)
for r in recs: g["_".join(r["id"].split("_")[:2])].append(r)
L = lambda x: len(x or "")
print("出典\t件数\t一言\t概要\t要点数\t要点本文\t示唆（いずれも中央値・字）")
for k, v in sorted(g.items()):
    pl = [L(p.get("b")) for r in v for p in (r.get("points") or [])]
    print(k, len(v), int(st.median([L(r.get("oneLiner")) for r in v])), int(st.median([L(r.get("overview")) for r in v])),
          st.median([len(r.get("points") or []) for r in v]), int(st.median(pl)) if pl else 0,
          int(st.median([L(r.get("takeaway")) for r in v])), sep="\t")
print("注記の見出し:", Counter(n["h"] for r in recs for n in (r.get("notes") or [])).most_common(10))
