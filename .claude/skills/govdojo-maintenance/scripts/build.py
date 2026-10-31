"""data/govdojo の検証済みデータから、ProjectNova.jsx のガバナンス道場の定数を書き換える。

使い方（リポジトリのルートで）:
  python3 .claude/skills/govdojo-maintenance/scripts/build.py          # 書き換える
  python3 .claude/skills/govdojo-maintenance/scripts/build.py --check  # 書き換えずに差分の有無だけ見る（差分があれば終了コード 1）

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


def constants():
    return {
        "GOVREG_ASOF": json.dumps(J("meta.json")["asof"]),
        "GOVREG_ITEMS": dump(strip(J("regs.json"))),
        "GOVIND": dump(strip(J("industries.json"))),
        "GOVLC": dump(title_as_name(strip(J("lowcode.json")))),
        "GOVKIT": dump(strip(J("kit.json"))),
        "GOVREG_CMP": dump(J("compare.json")),
    }


def main():
    s = open(JSX, encoding="utf-8").read()
    t = s
    for name, val in constants().items():
        head = f"const {name} = "
        assert t.count(head) == 1, f"{name}: {t.count(head)} 箇所"
        a = t.index(head); b = t.index("\n", a)
        t = t[:a] + head + val + ";" + t[b:]
    if "--check" in sys.argv:
        if t == s:
            print("OK: ProjectNova.jsx はデータと一致")
            return 0
        for name in constants():
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
