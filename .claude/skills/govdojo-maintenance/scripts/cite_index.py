"""ひな形などで根拠に指せる「検証済みの1行」の索引を作る（data/govdojo から）。

使い方（リポジトリのルートで）:
  python3 .claude/skills/govdojo-maintenance/scripts/cite_index.py > 作業/cite_index.tsv
  python3 .claude/skills/govdojo-maintenance/scripts/cite_index.py --resolve 'reg:jp-ppc-genai-alert:duty:0'

指し方（ポインタ）:
  reg:<規制id>:<欄>:<番号>          欄は what・who・duty・jp・penalty（jp・penalty など1組の欄は番号 0）
  kit:<欄>:<番号>                   欄は cust.pre・cust.run・cust.inc・inv.fields・inv.flow・inv.shadow・eval.kinds・eval.accept・riskai.uses・riskai.kri
  lc:<欄>:<番号>[:<番号>]           欄は risks・steps（steps は手順の番号と要点の番号）・controls・inventory
  ind:<業界key>:<規定名の先頭>:<AIで見る点の番号>
"""
import json, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
DATA = os.path.join(ROOT, "data", "govdojo")
J = lambda n: json.load(open(os.path.join(DATA, n), encoding="utf-8"))


def pair(v):
    return isinstance(v, list) and len(v) == 2 and all(isinstance(z, str) for z in v)


def join(*ps):
    ps = [p for p in ps if p]
    return [" — ".join(p[0] for p in ps), " — ".join(p[1] for p in ps)]


def entries():
    """(ポインタ, [ja, en], 出典の名前) を順に返す"""
    for x in J("regs.json"):
        src = x.get("short") or x.get("name")
        for f in ("what", "who", "duty", "jp", "penalty"):
            v = x.get(f)
            if not v:
                continue
            if pair(v):
                yield f"reg:{x['id']}:{f}:0", v, src
            else:
                for i, line in enumerate(v):
                    if pair(line):
                        yield f"reg:{x['id']}:{f}:{i}", line, src
    k = J("kit.json")
    kit_src = ["実務キット", "Practice kit"]
    for ph in ("pre", "run", "inc"):
        for i, o in enumerate(k["cust"][ph]):
            yield f"kit:cust.{ph}:{i}", join(o.get("c"), o.get("why")), kit_src
    for i, o in enumerate(k["inv"]["fields"]):
        yield f"kit:inv.fields:{i}", join(o.get("f"), o.get("why")), kit_src
    for i, o in enumerate(k["inv"]["flow"]):
        yield f"kit:inv.flow:{i}", join(o.get("s"), o.get("d")), kit_src
    for i, o in enumerate(k["inv"]["shadow"]):
        yield f"kit:inv.shadow:{i}", join(o.get("c"), o.get("d")), kit_src
    for i, o in enumerate(k["eval"]["kinds"]):
        yield f"kit:eval.kinds:{i}", join(o.get("k"), o.get("what"), o.get("trap")), kit_src
    for i, o in enumerate(k["eval"]["accept"]):
        yield f"kit:eval.accept:{i}", join(o.get("c"), o.get("d")), kit_src
    for i, o in enumerate(k["riskai"]["uses"]):
        yield f"kit:riskai.uses:{i}", join(o.get("a"), o.get("risk"), o.get("ctl")), kit_src
    for i, o in enumerate(k["riskai"]["kri"]):
        yield f"kit:riskai.kri:{i}", join(o.get("c"), o.get("d")), kit_src
    l = J("lowcode.json")
    lc_src = ["ローコード統制", "Low-code governance"]
    for i, o in enumerate(l["risks"]):
        yield f"lc:risks:{i}", o["t"] if pair(o.get("t")) else join(o.get("t")), lc_src
    for i, o in enumerate(l["steps"]):
        for j, p in enumerate(o.get("points", [])):
            yield f"lc:steps:{i}:{j}", join(o.get("name"), p), lc_src
    for i, o in enumerate(l["controls"]):
        yield f"lc:controls:{i}", join(o.get("name"), o.get("what")), lc_src
    for i, o in enumerate(l["inventory"]):
        t = o.get("t") or o.get("name") or o.get("c")
        d = o.get("d") or o.get("what")
        if pair(t):
            yield f"lc:inventory:{i}", join(t, d if pair(d) else None), lc_src
    for d in J("industries.json"):
        names = [r["name"][0] for r in d["regs"]]
        for r in d["regs"]:
            n = r["name"][0]
            # 業界の中で一意になる最短の先頭（20字以上）。コロンはポインタの区切りなので含めない
            pre = n
            for L in range(20, len(n) + 1):
                c = n[:L]
                if ":" not in c and sum(1 for m in names if m.startswith(c)) == 1:
                    pre = c
                    break
            for j, a in enumerate(r.get("ai", [])):
                if pair(a):
                    yield f"ind:{d['key']}:{pre}:{j}", a, r["name"]


def resolve(ptr, table=None):
    """ポインタを解決する。業界は規定名の先頭が一致する規定がちょうど1つであること"""
    if ptr.startswith("ind:"):
        _, key, pre, j = ptr.split(":", 3)
        d = next((x for x in J("industries.json") if x["key"] == key), None)
        hit = [r for r in d["regs"] if r["name"][0].startswith(pre)] if d else []
        if len(hit) != 1 or not j.isdigit() or int(j) >= len(hit[0].get("ai", [])):
            return None
        return hit[0]["ai"][int(j)], hit[0]["name"]
    table = table or {p: (t, s) for p, t, s in entries()}
    return table.get(ptr)


if __name__ == "__main__":
    if len(sys.argv) > 2 and sys.argv[1] == "--resolve":
        for p in sys.argv[2:]:
            print(p, "→", resolve(p))
    else:
        for p, t, s in entries():
            print(p + "\t" + t[0].replace("\t", " ").replace("\n", " ")[:260])
