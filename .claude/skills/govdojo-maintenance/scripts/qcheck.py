"""調査の下書き（作業ディレクトリ）で、出典の引用が保存した本文に本当にあるかを確かめる。
使い方（作業ディレクトリで）: python3 -I <このファイル> <下書き.json>
JSON のどこかにある {"url":..., "file":..., "quote":...} をすべて調べる。file は作業ディレクトリからの相対パス。"""
import json, os, re, sys
BASE = os.getcwd()
def norm(s): return re.sub(r"\s+", "", s or "").replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
P = []; n = 0; files = {}
def walk(o, path):
    global n
    if isinstance(o, dict):
        if "quote" in o and "file" in o:
            n += 1
            f = os.path.join(BASE, o["file"] or "")
            if not o.get("url"): P.append(f"{path}: no url")
            if not o["file"] or not os.path.exists(f): P.append(f"{path}: file missing {o['file']}"); return
            body = files.setdefault(f, norm(open(f, encoding="utf-8").read()))
            qs = o["quote"] if isinstance(o["quote"], list) else [o["quote"]]
            for q in qs:
                if not q or len(q) > 400: P.append(f"{path}: quote empty or > 400")
                elif norm(q) not in body: P.append(f"{path}: quote not in {o['file']}: {q[:50]}")
        for k, v in o.items(): walk(v, f"{path}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o): walk(v, f"{path}[{i}]")
walk(json.load(open(sys.argv[1], encoding="utf-8")), "$")
print("sources", n); print("PROBLEMS:", len(P)); [print("  -", p) for p in P]
