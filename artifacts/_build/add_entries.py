# -*- coding: utf-8 -*-
"""キーワード調査の結果をトラッカーの data.json に追記するヘルパー。
使い方:
  python add_entries.py memo     '[{"topic":..,"genre":"ai","note":..,"date":"2026-07-15"}]'
  python add_entries.py learning '[{"cat":"資格","provider":"MS","name":"AZ-104","bunrui":"Cloud"}]'
追記後は build.py を実行して index.html / artifact を再生成すること。
memo は topic、learning は (cat,name) で重複をスキップする。
"""
import json, sys, os
ART=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def add_memo(entries):
    p=f"{ART}/anything-memo-tracker/data.json"
    d=json.load(open(p,encoding="utf-8"))
    existing={m["topic"] for m in d["memos"]}
    added=0
    for e in entries:
        if e["topic"] in existing:
            print("skip(dup):",e["topic"]); continue
        d["memos"].insert(0,{"topic":e["topic"],"genre":e["genre"],
                             "date":e.get("date","2026-07-15"),"note":e["note"]})
        existing.add(e["topic"]); added+=1
    # recompute genre counts + stats
    gc={g["key"]:0 for g in d["genres"]}
    for m in d["memos"]:
        if m["genre"] in gc: gc[m["genre"]]+=1
    for g in d["genres"]: g["count"]=gc[g["key"]]
    d["stats"]={"memoTotal":len(d["memos"]),"genreCount":len(d["genres"]),
                "withDetail":sum(1 for m in d["memos"] if m.get("note","").strip())}
    json.dump(d,open(p,"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    print(f"memo: +{added} (total {len(d['memos'])})")

def add_learning(entries):
    p=f"{ART}/learning-tracker/data.json"
    d=json.load(open(p,encoding="utf-8"))
    existing={(r["cat"],r["name"]) for r in d["rows"]}
    def next_no(cat):
        return max([r["no"] for r in d["rows"] if r["cat"]==cat]+[0])+1
    added=0
    for e in entries:
        key=(e["cat"],e["name"])
        if key in existing: print("skip(dup):",e["name"]); continue
        d["rows"].append({"no":next_no(e["cat"]),"cat":e["cat"],
                          "provider":e.get("provider",""),"name":e["name"],
                          "bunrui":e.get("bunrui","")})
        existing.add(key); added+=1
    d["totalItems"]=len(d["rows"])
    json.dump(d,open(p,"w",encoding="utf-8"),ensure_ascii=False,indent=0)
    print(f"learning: +{added} (total {len(d['rows'])})")

if __name__=="__main__":
    kind=sys.argv[1]; entries=json.loads(sys.argv[2])
    (add_memo if kind=="memo" else add_learning)(entries)
