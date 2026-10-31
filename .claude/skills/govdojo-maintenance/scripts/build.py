"""data/govdojo の検証済みデータから、ProjectNova.jsx のガバナンス道場の定数を書き換える。

使い方（リポジトリのルートで）:
  python3 .claude/skills/govdojo-maintenance/scripts/build.py          # 書き換える
  python3 .claude/skills/govdojo-maintenance/scripts/build.py --check  # 書き換えずに差分の有無だけ見る（差分があれば終了コード 1）

usecases.json（ユースケースの入口）は参照を解決して GOVUC にする。参照先が無い・あいまいなら止まる。
templates.json（ひな形）は根拠のポインタ（cite_index.py の形）を根拠の行と出典に解決して GOVTPL にする。

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


REG_F = {"what": ["概要", "What it is"], "who": ["対象", "Who"], "duty": ["求めること", "What it asks"], "jp": ["日本企業にとって", "For Japanese firms"], "penalty": ["罰則", "Penalties"]}
KIT_L = {"cust.pre": ["実務キット：顧客向けAI（公開前）", "Practice kit: customer-facing AI (before launch)"],
         "cust.run": ["実務キット：顧客向けAI（運用中）", "Practice kit: customer-facing AI (in operation)"],
         "cust.inc": ["実務キット：顧客向けAI（事故時）", "Practice kit: customer-facing AI (when it goes wrong)"],
         "inv.fields": ["実務キット：ユースケース台帳（項目）", "Practice kit: use-case register (fields)"],
         "inv.flow": ["実務キット：ユースケース台帳（流れ）", "Practice kit: use-case register (flow)"],
         "inv.shadow": ["実務キット：ユースケース台帳（シャドーAI）", "Practice kit: use-case register (shadow AI)"],
         "eval.kinds": ["実務キット：検証の手法", "Practice kit: evaluation methods"],
         "eval.accept": ["実務キット：検証の受入基準", "Practice kit: acceptance criteria"],
         "riskai.uses": ["実務キット：リスク管理×AI", "Practice kit: AI in risk management"],
         "riskai.kri": ["実務キット：リスク指標", "Practice kit: risk indicators"]}


def cite(ptr):
    """ひな形の根拠のポインタを、画面に出す {s: 出典の見出し, l: 根拠の行, u: 出典（最大2件）} にする。解決できなければ None"""
    import cite_index
    r = cite_index.resolve(ptr)
    if not r:
        return None
    line = r[0]
    parts = ptr.split(":")
    src = []
    if parts[0] == "reg":
        x = next(y for y in J("regs.json") if y["id"] == parts[1])
        label = [x["short"][0] + "・" + REG_F[parts[2]][0], x["short"][1] + " · " + REG_F[parts[2]][1]]
        src = x.get("src", [])
    elif parts[0] == "kit":
        k = J("kit.json"); a, b = parts[1].split(".")
        it = k[a][b][int(parts[2])]
        label = KIT_L[parts[1]]
        src = it.get("src") or k[a].get("src") or []
    elif parts[0] == "lc":
        l = J("lowcode.json")
        it = l[parts[1]][int(parts[2])]
        label = ["ローコード統制", "Low-code governance"]
        src = it.get("src", []) if isinstance(it, dict) else []
    else:
        d = next(y for y in J("industries.json") if y["key"] == parts[1])
        rule = next(rr for rr in d["regs"] if rr["name"][0].startswith(parts[2]))
        cut = lambda n: __import__("re").sub(r"（[^）]{12,}）", "", n)
        label = [d["ind"] + "：" + cut(rule["name"][0]), d["ind_en"] + ": " + cut(rule["name"][1])]
        src = rule.get("src", [])
    seen, u = set(), []
    for o in src:
        if isinstance(o, dict) and o.get("url") and o["url"] not in seen:
            seen.add(o["url"]); u.append({"name": o.get("name") or o.get("title"), "url": o["url"]})
    return {"s": label, "l": line, "u": u[:2]}


def templates():
    """templates.json（ひな形）の根拠を解決して GOVTPL にする。解決できない・判断の扱いが崩れていれば止める"""
    if not os.path.exists(os.path.join(DATA, "templates.json")):
        return None
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    T = J("templates.json"); errs = []
    out = {"note": T["note"], "list": []}
    for tp in T["list"]:
        o = {k: tp[k] for k in ("id", "name", "purpose")}
        o["sections"] = []
        for si, sec in enumerate(tp["sections"]):
            ls = []
            for li, ln in enumerate(sec["lines"]):
                w = f"{tp['id']} {si + 1}-{li + 1}"
                cs = [cite(p) for p in ln.get("cite", [])]
                if any(c is None for c in cs):
                    errs.append(f"{w}: 根拠のポインタが解決できない")
                if ln.get("judge") and cs:
                    errs.append(f"{w}: 判断の行に根拠がある")
                if not ln.get("judge") and not cs:
                    errs.append(f"{w}: 判断でない行に根拠が無い")
                ls.append({"t": ln["t"], "j": bool(ln.get("judge")), "c": [c for c in cs if c]})
            o["sections"].append({"h": sec["h"], "lines": ls})
        out["list"].append(o)
    if errs:
        raise SystemExit("templates.json の参照エラー:\n  " + "\n  ".join(errs))
    return out


def constants(jsx=""):
    return {
        "GOVREG_ASOF": json.dumps(J("meta.json")["asof"]),
        "GOVREG_ITEMS": dump(strip(J("regs.json"))),
        "GOVIND": dump(strip(J("industries.json"))),
        "GOVLC": dump(title_as_name(strip(J("lowcode.json")))),
        "GOVKIT": dump(strip(J("kit.json"))),
        "GOVREG_CMP": dump(J("compare.json")),
        "GOVUC": dump(usecases(jsx)),
        "GOVTPL": dump(templates()),
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
