"""商談ドリル（ProjectNova.jsx の SALES_DRILLS）を点検する。ビルドの問題バンク検査は SALES_DRILLS を見ないので、直したあとに流す。

usage: python3 .claude/skills/quiz-authoring/sales-drill-check.py
見るもの:
  - 形（4択・正解番号・講評4件・日英）
  - 「最長を選ぶ（同点は先頭）」で当たる割合（目安は 1/4 前後。シナリオ4問のうち3問以上は不合格）
  - 長さの釣り合い（正解 ÷ 最長の誤答 が 0.70〜1.25、最短 ÷ 最長 が 0.55 以上、正解が単独で最短でない）
  - 中身を読まずに当てられる書き方の偏り：正解だけに数字・『』・「・」があるステップ、
    誤答にしか出ない決まり文句（ご安心ください 等）
2026-11 に、40問すべてで正解が最長、正解の位置が A→B→C→D と決まった順に動く、という欠陥を直した
（位置は画面側で毎回並べ替えている）。
"""
import json, re, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
src = None
with open(os.path.join(ROOT, "nova-app/src/ProjectNova.jsx"), encoding="utf-8") as f:
    for line in f:
        if line.startswith("const SALES_DRILLS = "): src = line; break
if not src: sys.exit("SALES_DRILLS が見つからない")
data = json.loads(src[len("const SALES_DRILLS = "):].rstrip().rstrip(";"))
bad = 0; hits = {"o": 0, "oEn": 0}; total = 0
feats = {"数字": lambda o: bool(re.search(r"\d", o)), "『』": lambda o: "『" in o, "・": lambda o: "・" in o}
only = {k: [] for k in feats}; stock = {"ご安心": [0, 0], "まさに": [0, 0], "ので、": [0, 0]}
for k, sc in enumerate(data):
    for lang in ("o", "oEn"):
        h = 0
        for si, s in enumerate(sc["steps"]):
            opts, a = s[lang], s["a"]
            if len(opts) != 4 or len(s["fb"]) != 4 or len(s["fbEn"]) != 4 or not (0 <= a < 4): print(f"NG scn{k} step{si+1}: 形が崩れている"); bad += 1; continue
            L = [len(x) for x in opts]
            if L.index(max(L)) == a: h += 1
            wrong_max = max(l for j, l in enumerate(L) if j != a)
            if not (0.70 <= L[a] / wrong_max <= 1.25): print(f"NG scn{k} step{si+1} {lang}: 正解÷最長の誤答 = {L[a]/wrong_max:.2f} {L}"); bad += 1
            if min(L) / max(L) < 0.55: print(f"NG scn{k} step{si+1} {lang}: 最短÷最長 = {min(L)/max(L):.2f} {L}"); bad += 1
            if L.index(min(L)) == a and L.count(min(L)) == 1: print(f"NG scn{k} step{si+1} {lang}: 正解が最短 {L}"); bad += 1
            if lang == "o":
                total += 1
                for name, f in feats.items():
                    m = [f(x) for x in opts]
                    if m[a] and sum(m) == 1: only[name].append(f"{k}.{si+1}")
                for name in stock:
                    for j, x in enumerate(opts):
                        if name in x: stock[name][0 if j == a else 1] += 1
        hits[lang] += h
        if h > 2: print(f"NG scn{k} {lang}: 最長を選ぶと当たる問題が {h}/4"); bad += 1
print(f"{len(data)}シナリオ・{total}問")
for lang in ("o", "oEn"): print(f"  最長を選ぶと当たる（{lang}）: {hits[lang]}/{total}（目安 {total // 4} 前後）")
for name, v in only.items(): print(f"  正解だけに「{name}」があるステップ: {len(v)} {' '.join(v[:12])}")
for name, (c, w) in stock.items(): print(f"  「{name}」: 正解 {c}/{total}・誤答 {w}/{total * 3}")
print("合格" if not bad else f"不合格 {bad}件")
sys.exit(1 if bad else 0)
