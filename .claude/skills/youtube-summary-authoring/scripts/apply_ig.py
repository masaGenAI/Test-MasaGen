"""検査に合格した Instagram リールの要約を Book-Summary（booksummaryhub.html）の Instagram 枠に差し込む。何度流しても同じ結果になる。
発言を紹介する型のリール（1件に発言者・元の番組がある。2026-11 の @insider.jp が最初）向け。

usage: python3 -I apply_ig.py <work_dir> <hub.html>
  work_dir:
    skel.json    … id ごとのメタ（id,title,author,publisher,year,url,srcNote,srcPaths,themes,shelf と、
                   注記用の _views,_likes,_src,_ref,_speaker,_basis,_tag,_rule,_cover）
    account.json … {id,title,sub,collected_at,digest:{summary,scope,points},caveats:[…]}
    inputs/<id>.json・out/<id>.json … check_yt.py と同じ形（段は short）
  - 出典ツリー（SOURCES の ig の children）にアカウントを足す
  - IG_BOOKS に記録を足す（同じ id は置き換え）。検査に不合格の id は入れない
  - SOURCE_DIGEST / SOURCE_EXTRA にアカウント総括・留意点を足す（マーカーで囲み、毎回置き換える）
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_yt import run

W, HUB = sys.argv[1], sys.argv[2]
skel = json.load(open(os.path.join(W, "skel.json"), encoding="utf-8"))
meta = json.load(open(os.path.join(W, "account.json"), encoding="utf-8"))
ok, errs = run(W)
ok = sorted([i for i in ok if i in skel], key=lambda s: int(s.rsplit("_", 1)[1]))
h = open(HUB, encoding="utf-8").read()
ORDER = ["id", "title", "author", "publisher", "year", "oneLiner", "overview", "points", "takeaway", "url",
         "srcNote", "srcPaths", "themes", "shelf", "notes"]

def notes_for(s):
    """注記：元の番組・動画（キャプションに書かれた出典）と、形式・反応・読み取り範囲。"""
    basis = s["_basis"]
    src_part, _, read_part = basis.partition("／読取：")
    src_part = re.sub(r"^キャプションに(明記|発言者の記載なし)。", "", src_part).strip()
    urls = "、".join(u for u in (s["_src"], s["_ref"]) if u)
    n = []
    who = s["_speaker"]
    n.append({"h": "発言者", "b": who})
    n.append({"h": "元の番組・動画", "b": (src_part + ("（" + urls + "）" if urls else "")).strip()})
    n.append({"h": "形式と反応", "b": f"{s['srcNote'].split(' ・ ')[0]}。再生 {s['_views']:,}回・いいね {s['_likes']:,}（{meta['collected_at']}取得時点）。カバーの見出し「{s['_cover']}」、タグ「RULE {s['_rule']}・{s['_tag']}」。"})
    n.append({"h": "読み取り範囲と留保", "b": "読取：" + read_part.strip() + "。出典の番組・記事と発言内容は原典と照合していない。示唆はダイジェスト作成者による解釈で、アカウントや発言者の主張ではない。"})
    return n

# 1) 記録（既存の IG_BOOKS と同じ書式：1行1件、json.dumps の既定の区切り）
start = h.index("const IG_BOOKS = [")
body_s = h.index("\n", start) + 1
end = h.index("\n];", start)
lines = h[body_s:end].split("\n")
pos = {}
for n, line in enumerate(lines):
    m = re.match(r'\{"id": ?"([^"]+)"', line)
    if m: pos[m.group(1)] = n
new_lines, replaced = [], 0
for rid in ok:
    o = json.load(open(os.path.join(W, "out", rid + ".json"), encoding="utf-8"))
    s = skel[rid]
    r = {k: v for k, v in s.items() if not k.startswith("_")}
    r.update({"oneLiner": o["oneLiner"], "overview": o["overview"],
              "points": [{"h": p["h"], "b": p["b"]} for p in o["points"]], "takeaway": o["takeaway"], "notes": notes_for(s)})
    rec = json.dumps({k: r[k] for k in ORDER if k in r}, ensure_ascii=False) + ","
    if rid in pos: lines[pos[rid]] = rec; replaced += 1
    else: new_lines.append(rec)
# 既存の最後の行に区切りのカンマが無いことがある。足してから新しい行を続ける
lines = [(l + ",") if (l.startswith("{") and l.rstrip().endswith("}")) else l for l in lines]
h = h[:body_s] + "\n".join(lines + new_lines) + h[end:]

# 2) 出典ツリー
ys = h.index("{ id:'ig', title:'Instagram'")
ye = h.index("\n  ] },", ys)
block = h[ys:ye]
node = f'      {{ id:"{meta["id"]}", title:"{meta["title"]}", sub:"{meta["sub"]}" }},'
m = re.search(r'\n      \{ id:"%s",[^\n]*' % re.escape(meta["id"]), block)
block = (block[:m.start() + 1] + node + block[m.end():]) if m else (block + "\n" + node)
h = h[:ys] + block + h[ye:]

# 3) アカウント総括・留意点（マーカーで囲み、毎回置き換える）
MK1, MK2 = "/* >>> IG_DIGEST_EXTRA (apply_ig.py) */", "/* <<< IG_DIGEST_EXTRA */"
key = "ig/" + meta["id"]
D, X = {}, {}
if MK1 in h:
    a, b = h.index(MK1), h.index(MK2) + len(MK2)
    seg = h[a:b]
    for name, tgt in (("SOURCE_DIGEST", D), ("SOURCE_EXTRA", X)):
        mm = re.search(r"Object\.assign\(%s, (\{.*\})\);" % name, seg)
        if mm: tgt.update(json.loads(mm.group(1)))
    h = h[:a] + h[b:].lstrip("\n")
D[key] = meta["digest"]
X[key] = {"caveats": meta["caveats"]}
seg = (MK1 + "\n" + "Object.assign(SOURCE_DIGEST, " + json.dumps(D, ensure_ascii=False) + ");\n"
       + "Object.assign(SOURCE_EXTRA, " + json.dumps(X, ensure_ascii=False) + ");\n" + MK2 + "\n")
anchor = "const IG_BOOKS = ["
i = h.index(anchor)
h = h[:i] + seg + h[i:]

open(HUB, "w", encoding="utf-8").write(h)
print(f"記録 {len(ok)}件（うち置き換え {replaced}）／不合格で入れなかった {len(errs)}件")
for rid, msg in errs: print("  NG", rid, msg)
