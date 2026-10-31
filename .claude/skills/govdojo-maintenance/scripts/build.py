"""data/govdojo の検証済みデータから、ProjectNova.jsx のガバナンス道場の定数を書き換える。

使い方（リポジトリのルートで）:
  python3 .claude/skills/govdojo-maintenance/scripts/build.py          # 書き換える
  python3 .claude/skills/govdojo-maintenance/scripts/build.py --check  # 書き換えずに差分の有無だけ見る（差分があれば終了コード 1）

usecases.json（ユースケースの入口）は参照を解決して GOVUC にする。参照先が無い・あいまいなら止まる。

公開する画面には、出典の quote（引用）を載せない。出典は name・kind・url（ローコードは title を name に読み替え）だけにする。
"""
import json, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
DATA = os.path.join(ROOT, "data", "govdojo")
JSX = os.path.join(ROOT, "nova-app", "src", "ProjectNova.jsx")
J = lambda n: json.load(open(os.path.join(DATA, n), encoding="utf-8"))
dump = lambda x: json.dumps(x, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


def strip(o, keep=("name", "kind", "url", "title")):
    if isinstance(o, dict):
        if "url" in o and "quote" in o:
            return {k: o[k] for k in keep if k in o}
        return {k: strip(v, keep) for k, v in o.items() if k not in ("quote", "file", "ref")}
    if isinstance(o, list):
        return [strip(v, keep) for v in o]
    return o


def title_as_name(o):
    # ローコードの出典は title を name として表示する
    if isinstance(o, dict):
        if "url" in o and "name" not in o and "title" in o:
            o["name"] = o.pop("title")
        for v in o.values():
            title_as_name(v)
    elif isinstance(o, list):
        for v in o:
            title_as_name(v)
    return o


def usecases(jsx):
    """usecases.json の参照を解決し、行き先が無い・あいまいなら止める。
    regs: [規制の id, 欄, 番号] → 規制マップの項目の、出典で確かめた1行を指す
    rules: [業界 key, 規定名の先頭] → [業界 key, 規定の番号]（先頭が一致する規定がちょうど1つであること）
    scen / inc: jsx の GOVDOJO_SCENARIOS・GOVDOJO_INCIDENTS の id"""
    import re
    U = J("usecases.json"); R = {x["id"]: x for x in J("regs.json")}; I = {d["key"]: d for d in J("industries.json")}
    errs = []
    out = []
    for u in U["list"]:
        o = {k: u[k] for k in ("key", "name", "ex", "scen", "inc", "kit", "lc", "q")}
        o["regs"] = []
        for rid, f, i in u["regs"]:
            x = R.get(rid)
            v = x.get(f) if x else None
            # 欄が [ja, en] の1組（jp など）なら番号は 0 だけ。箇条（[[ja, en], ...]）なら番号の行
            pair = isinstance(v, list) and len(v) == 2 and all(isinstance(z, str) for z in v)
            if not x or not isinstance(v, list) or (pair and i != 0) or (not pair and (i >= len(v) or not isinstance(v[i], list))):
                errs.append(f"{u['key']}: 規制 {rid}.{f}[{i}] が無い"); continue
            o["regs"].append([rid, f, i])
        o["rules"] = []
        for k, pre in u["rules"]:
            d = I.get(k)
            hit = [i for i, r in enumerate(d["regs"]) if r["name"][0].startswith(pre)] if d else []
            if len(hit) != 1:
                errs.append(f"{u['key']}: 業界 {k} の「{pre}」が {len(hit)} 件"); continue
            o["rules"].append([k, hit[0]])
        for sid in u["scen"]:
            if not re.search(r'"?id"?:\s*"' + re.escape(sid) + '"', jsx):
                errs.append(f"{u['key']}: シナリオ {sid} が無い")
        for iid in u["inc"]:
            if not re.search(r'"?id"?:\s*"' + re.escape(iid) + '"', jsx):
                errs.append(f"{u['key']}: 事例 {iid} が無い")
        for kt in u["kit"]:
            if kt not in ("cust", "inv", "eval", "riskai"):
                errs.append(f"{u['key']}: 実務キットの欄 {kt} が無い")
        try:
            re.compile(u["q"])
        except re.error as e:
            errs.append(f"{u['key']}: 問題の語 {e}")
        out.append(o)
    if errs:
        raise SystemExit("usecases.json の参照エラー:\n  " + "\n  ".join(errs))
    return {"note": U["note"], "list": out}


def constants(jsx=""):
    return {
        "GOVREG_ASOF": json.dumps(J("meta.json")["asof"]),
        "GOVREG_ITEMS": dump(strip(J("regs.json"))),
        "GOVIND": dump(strip(J("industries.json"))),
        "GOVLC": dump(title_as_name(strip(J("lowcode.json")))),
        "GOVKIT": dump(strip(J("kit.json"))),
        "GOVREG_CMP": dump(J("compare.json")),
        "GOVUC": dump(usecases(jsx)),
    }


def main():
    s = open(JSX, encoding="utf-8").read()
    t = s
    C = constants(s)
    for name, val in C.items():
        head = f"const {name} = "
        assert t.count(head) == 1, f"{name}: {t.count(head)} 箇所"
        a = t.index(head); b = t.index("\n", a)
        t = t[:a] + head + val + ";" + t[b:]
    if "--check" in sys.argv:
        if t == s:
            print("OK: ProjectNova.jsx はデータと一致")
            return 0
        for name in C:
            head = f"const {name} = "
            a, b = s.index(head), s.index("\n", s.index(head))
            c, d = t.index(head), t.index("\n", t.index(head))
            if s[a:b] != t[c:d]:
                print("差分:", name)
        return 1
    if t != s:
        open(JSX, "w", encoding="utf-8").write(t)
        print("書き換えた")
    else:
        print("変更なし")
    return 0


if __name__ == "__main__":
    sys.exit(main())
