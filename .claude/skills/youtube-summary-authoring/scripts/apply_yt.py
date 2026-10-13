"""検査に合格した YouTube 要約を Book-Summary（booksummaryhub.html）に差し込む。何度流しても同じ結果になる。

usage: python3 -I apply_yt.py <work_dir> <hub.html> [--date YYYY-MM-DD]
  work_dir: skel.json / out/ / inputs/ / tree.json / digest.json / theme_note.json（build_from_digest.py の出力）
  - 出典ツリー（SOURCES の yt の children）にチャンネルを足す（同じ id があれば置き換え）
  - YT_BOOKS に記録を足す（同じ id があれば置き換え）。検査に不合格の id は入れない
  - SOURCE_DIGEST / SOURCE_EXTRA / THEME_NOTE にチャンネル総括・留意点・テーマの読み筋を足す
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_yt import run

W, HUB = sys.argv[1], sys.argv[2]
DATE = sys.argv[sys.argv.index("--date") + 1] if "--date" in sys.argv else ""
skel = json.load(open(os.path.join(W, "skel.json"), encoding="utf-8"))
tree = json.load(open(os.path.join(W, "tree.json"), encoding="utf-8"))
dig = json.load(open(os.path.join(W, "digest.json"), encoding="utf-8"))
tnote = json.load(open(os.path.join(W, "theme_note.json"), encoding="utf-8"))
ok, errs = run(W)
ok = [i for i in ok if i in skel]
h = open(HUB, encoding="utf-8").read()
J = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))

# 1) 記録（既存と同じ項目順）
ORDER = ["id", "title", "author", "publisher", "year", "oneLiner", "overview", "points", "takeaway", "url",
         "srcNote", "srcPaths", "themes", "shelf", "notes", "kind", "refBooks"]
start = h.index("const YT_BOOKS = [")
body_s = h.index("\n", start) + 1
end = h.index("\n];", start)
# YT_BOOKS は1行1件。行単位で組み直す（20MB の文字列を件数分コピーしないため）
lines = h[body_s:end].split("\n")
pos = {}
for n, line in enumerate(lines):
    m = re.match(r'\{"id":"([^"]+)"', line)
    if m: pos[m.group(1)] = n
new_lines, replaced = [], 0
for rid in ok:
    o = json.load(open(os.path.join(W, "out", rid + ".json"), encoding="utf-8"))
    r = dict(skel[rid])
    r.update({"oneLiner": o["oneLiner"], "overview": o["overview"],
              "points": [{"h": p["h"], "b": p["b"]} for p in o["points"]], "takeaway": o["takeaway"]})
    rec = {k: r[k] for k in ORDER if k in r and r[k] is not None}
    if rid in pos:
        lines[pos[rid]] = J(rec) + ","; replaced += 1
    else:
        new_lines.append(J(rec) + ",")
h = h[:body_s] + "\n".join(lines + new_lines) + h[end:]

# 2) 出典ツリー
def node_js(n, ind):
    kids = n.get("children")
    head = f'{ind}{{ id:"{n["id"]}", title:"{n["title"]}", sub:"{n["sub"]}"' + (', icon:"folder"' if kids else "")
    if not kids: return head + " },"
    inner = "\n".join(f'{ind}  {{ id:"{k["id"]}", title:"{k["title"]}", sub:"{k["sub"]}" }},' for k in kids)
    return head + ", children:[\n" + inner + f"\n{ind}] }},"
ys = h.index("{ id:'yt', title:'YouTube'")
ye = h.index("\n  ] },\n  { id:'note'", ys)
block = h[ys:ye]
for n in tree:
    m = re.search(r'\n      \{ id:"%s",' % re.escape(n["id"]), block)
    js = node_js(n, "      ")
    if m:
        s = m.start() + 1
        # 既存ノードの終わり: children 付きなら "] }," 、なければ行末
        e = block.index("] },", s) + 4 if "children:[" in block[s:block.index("\n", s)] else block.index("\n", s)
        block = block[:s] + js + block[e:]
    else:
        block = block + "\n" + js
h = h[:ys] + block + h[ye:]

# 3) チャンネル総括・留意点・テーマの読み筋（マーカーで囲み、毎回置き換える）
MK1, MK2 = "/* >>> YT_DIGEST_EXTRA (apply_yt.py) */", "/* <<< YT_DIGEST_EXTRA */"
D = {k: {kk: v[kk] for kk in ("summary", "scope", "points") if v.get(kk)} for k, v in dig.items()}
X = {k: {"caveats": v["caveats"]} for k, v in dig.items() if v.get("caveats")}
old = {}
if MK1 in h:
    a, b = h.index(MK1), h.index(MK2) + len(MK2)
    seg = h[a:b]
    for name in ("SOURCE_DIGEST", "SOURCE_EXTRA", "THEME_NOTE"):
        m = re.search(r"Object\.assign\(%s, (\{.*\})\);" % name, seg)
        if m: old[name] = json.loads(m.group(1))
    h = h[:a] + h[b:].lstrip("\n")
for name, cur in (("SOURCE_DIGEST", D), ("SOURCE_EXTRA", X), ("THEME_NOTE", tnote)):
    old.setdefault(name, {}).update(cur)
seg = MK1 + "\n" + "\n".join(f"Object.assign({n}, {J(old[n])});" for n in ("SOURCE_DIGEST", "SOURCE_EXTRA", "THEME_NOTE")) + "\n" + MK2 + "\n"
anchor = h.index("/* 取り込んだ要約を、判定済みの書架にぶら下げる。")
h = h[:anchor] + seg + h[anchor:]

open(HUB, "w", encoding="utf-8").write(h)
print(f"差し込み: 新規 {len(new_lines)}件 / 置き換え {replaced}件 / 不合格で見送り {len(errs)}件 / チャンネル {len(tree)}")
for rid, m in errs[:30]: print("  見送り", rid, m)
