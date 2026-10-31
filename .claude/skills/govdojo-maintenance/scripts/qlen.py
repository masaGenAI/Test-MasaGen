"""問題バッチの長さの手がかりを、書きながら確かめる。使い方: python3 -I tools/qlen.py <batch.json>
各問の選択肢の文字数と、「最長を選ぶ（同点は先頭）」で正解を引くか（NG）を表示する。"""
import json, sys
rows = json.load(open(sys.argv[1], encoding="utf-8"))
ng = longest = 0; pos = {}
for i, r in enumerate(rows):
    L = [len(x) for x in r["o"]]; a = r["a"]; mx = max(L)
    pos[a] = pos.get(a, 0) + 1
    if L[a] == mx: longest += 1
    bad = L[a] == mx and L.index(mx) == a
    ng += bad
    if bad or "-v" in sys.argv: print(f"[{i}] {'NG ' if bad else '   '}{L} a={a} {r['q'][:40]}")
n = len(rows)
print(f"items {n}  NG {ng}  answer-is-longest(incl. ties) {longest/n*100:.0f}% (目標 10〜30%)  positions " + " ".join(f"{k}:{v/n*100:.0f}%" for k, v in sorted(pos.items())))
