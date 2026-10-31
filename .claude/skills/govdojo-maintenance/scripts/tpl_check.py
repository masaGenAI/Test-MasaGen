"""ひな形（templates.json の形）を根拠の行と突き合わせる照合表を作り、機械で分かる問題を挙げる。

使い方（リポジトリのルートで）:
  python3 .claude/skills/govdojo-maintenance/scripts/tpl_check.py <ひな形.json> [照合表.md]
  問題が1件でもあれば終了コード 1。照合表を渡すと、各行の下に根拠の本文を並べた Markdown を書く。

機械で見るもの：ポインタが解決できるか／判断でない行に根拠があるか／判断の行に根拠を付けていないか／
行の数字・年月日が根拠の本文に無いか／日本語の長さ／簡体字・キリル文字／判断の行の割合（3割超で警告）
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cite_index  # noqa: E402

NUM = re.compile(r"\d[\d,.]*\s*(?:年|月|日|時間|日以内|か月|%|％|万|億|円|条|項|号)?")


def simp(s):
    bad = []
    for ch in s:
        o = ord(ch)
        if 0x0400 <= o <= 0x052F:
            bad.append(ch)
        elif 0x4E00 <= o <= 0x9FFF:
            try:
                ch.encode("cp932")
            except UnicodeEncodeError:
                bad.append(ch)
    return bad


def main():
    src = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else None
    T = json.load(open(src, encoding="utf-8"))
    table = {p: (t, s) for p, t, s in cite_index.entries()}
    probs, warns, md = [], [], []
    for tp in T["list"]:
        n = j = 0
        md.append(f"\n## {tp['id']}：{tp['name'][0]} / {tp['name'][1]}\n")
        for si, sec in enumerate(tp["sections"]):
            md.append(f"\n### {si + 1}. {sec['h'][0]} / {sec['h'][1]}\n")
            for li, ln in enumerate(sec["lines"]):
                n += 1
                where = f"{tp['id']} {si + 1}-{li + 1}"
                t = ln["t"]
                cites = ln.get("cite", [])
                judge = bool(ln.get("judge"))
                j += judge
                md.append(f"- **{where}** {'【判断】' if judge else ''}{t[0]}\n  - EN: {t[1]}")
                texts = []
                for p in cites:
                    r = cite_index.resolve(p, table)
                    if not r:
                        probs.append(f"{where}: ポインタが解決できない {p}")
                        md.append(f"  - ✗ {p}（解決できない）")
                        continue
                    line, name = r
                    texts.append(line[0] + " " + line[1])
                    nm = name[0] if isinstance(name, list) else name
                    md.append(f"  - 根拠 `{p}`（{nm}）\n    - {line[0]}\n    - {line[1]}")
                if judge and cites:
                    probs.append(f"{where}: 判断の行に根拠が付いている")
                if not judge and not cites:
                    probs.append(f"{where}: 判断でない行に根拠が無い")
                if not judge:
                    alltext = " ".join(texts)
                    for m in NUM.finditer(t[0]):
                        d = re.match(r"\d[\d,.]*", m.group(0)).group(0)
                        if d not in alltext:
                            probs.append(f"{where}: 数字「{m.group(0).strip()}」が根拠に無い")
                if len(t[0]) > 80:
                    warns.append(f"{where}: 日本語が長い（{len(t[0])}字）")
                bad = simp(t[0] + t[1])
                if bad:
                    probs.append(f"{where}: 簡体字・キリル文字 {''.join(bad)}")
        if not (14 <= n <= 22):
            warns.append(f"{tp['id']}: 行数 {n}（目安 14〜22）")
        if n and j / n > 0.3:
            warns.append(f"{tp['id']}: 判断の行 {j}/{n}（3割超）")
        md.insert(0, f"- {tp['id']}: {n}行・判断{j}行")
    head = ["# ひな形の照合表", "", "## 自動検査", ""] + [f"- 問題: {x}" for x in probs] + [f"- 警告: {x}" for x in warns] + ([""] if probs or warns else ["- 問題・警告なし", ""])
    if out:
        open(out, "w", encoding="utf-8").write("\n".join(head + md) + "\n")
    for x in probs:
        print("問題:", x)
    for x in warns:
        print("警告:", x)
    print(f"問題 {len(probs)} 件・警告 {len(warns)} 件")
    return 1 if probs else 0


if __name__ == "__main__":
    sys.exit(main())
