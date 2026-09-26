#!/usr/bin/env python3
"""Project Nova の「今の実数」をソースから数える。

画面やコメントに手で書かれた数字（問題数・社数・タブ数・件数）と突き合わせるための正解表を作る。
ProjectNova.jsx は 60MB 超の単一ファイルで、配列の中に " ' ` の文字列やコメントが混ざるため、
正規表現で雑に数えると外れる（過去に DEV_QUIZ・CHECK_* で実際に外れた）。ここでは文字列と
コメントを読み飛ばす走査器で配列の範囲を切り出してから数える。

使い方（リポジトリのルートで）:
  python3 .claude/skills/nova-consistency-audit/scripts/facts.py            # 表で出す
  python3 .claude/skills/nova-consistency-audit/scripts/facts.py --json     # JSON で出す
"""
import json
import re
import sys
from collections import Counter, OrderedDict
from pathlib import Path

ROOT = Path.cwd()
JSX = ROOT / "nova-app/src/ProjectNova.jsx"
BOOK = ROOT / "nova-app/public/booksummaryhub.html"


def scan_close(s, start):
    """s[start] が '[' か '{' のとき、対応する閉じ括弧の位置を返す。文字列とコメントは読み飛ばす。"""
    depth = 0
    k = start
    n = len(s)
    while k < n:
        c = s[k]
        if c in "\"'`":
            q = c
            k += 1
            while k < n:
                if s[k] == "\\":
                    k += 2
                    continue
                if s[k] == q:
                    break
                k += 1
        elif c == "/" and k + 1 < n and s[k + 1] == "/":
            k = s.find("\n", k)
            if k < 0:
                return -1
            continue
        elif c == "/" and k + 1 < n and s[k + 1] == "*":
            k = s.find("*/", k + 2)
            if k < 0:
                return -1
            k += 2
            continue
        elif c in "[{(":
            depth += 1
        elif c in "]})":
            depth -= 1
            if depth == 0:
                return k
        k += 1
    return -1


def top_elements(s, start):
    """配列リテラル s[start]=='[' の直下の要素（オブジェクト）のテキストを並べて返す。"""
    end = scan_close(s, start)
    out = []
    k = start + 1
    while k < end:
        c = s[k]
        if c == "{":
            e = scan_close(s, k)
            out.append(s[k:e + 1])
            k = e + 1
        elif c in "\"'`":  # 要素が文字列の配列はここでは数えない
            q = c
            k += 1
            while k < end and s[k] != q:
                k += 2 if s[k] == "\\" else 1
            k += 1
        elif c == "/" and s[k + 1] == "/":
            k = s.find("\n", k)
        elif c == "/" and s[k + 1] == "*":
            k = s.find("*/", k) + 2
        else:
            k += 1
    return out


def array_after(s, decl, nth=0, within=None):
    """`const NAME = [` の配列要素を返す。within=(lo,hi) で探す範囲を絞れる。"""
    lo, hi = within or (0, len(s))
    i = lo - 1
    for _ in range(nth + 1):
        i = s.find(decl, i + 1, hi)
        if i < 0:
            return None
    return top_elements(s, s.index("[", i))


def field(el, key):
    m = re.search(r'(?:^|[{,\s])"?%s"?\s*:\s*"([^"]*)"' % re.escape(key), el)
    return m.group(1) if m else None


def module_range(s, name):
    """`const XxxModule = (function` から次のモジュール見出し（// ================= ）まで。
    JSX の地の文にはクォートで囲まれないアポストロフィがあり、括弧の対応では範囲を取れないため。"""
    i = s.find("const %s = (function" % name)
    if i < 0:
        return None
    j = s.find("\n// ================= ", i)
    return (i, j if j >= 0 else len(s))


def main():
    s = JSX.read_text(encoding="utf-8")
    f = OrderedDict()

    # --- TechHub 技術道場（MCQS）
    mc = array_after(s, "const MCQS = [")
    cats = Counter(field(e, "cat") for e in mc)
    f["MCQS.total"] = len(mc)
    f["MCQS.glossary(用語：*)"] = sum(v for k, v in cats.items() if k and k.startswith("用語："))
    f["MCQS.themes"] = sum(1 for k in cats if k and not k.startswith("用語："))
    for k, v in cats.items():
        if k and not k.startswith("用語："):
            f["MCQS.cat." + k] = v

    # --- 道場系バンク（要素 = 1問、d = 領域）
    for name in ["NOTEISSUE_BANK", "SLALOM_BANK", "GOVDOJO_BANK", "ACAD_QUIZ"]:
        els = array_after(s, "const %s = [" % name)
        if els is None:
            continue
        f[name] = len(els)
        by = Counter(field(e, "d") for e in els)
        if name in ("NOTEISSUE_BANK", "SLALOM_BANK"):
            for k, v in sorted(by.items(), key=lambda x: str(x[0])):
                f["%s.%s" % (name, k)] = v

    # DEV_QUIZ はカテゴリの配列で、各カテゴリが questions を持つ
    dev = array_after(s, "const DEV_QUIZ = [")
    if dev:
        tot = 0
        for c in dev:
            j = c.find('"questions"')
            if j >= 0:
                tot += len(top_elements(c, c.index("[", j)))
        f["DEV_QUIZ(questions)"] = tot

    # 理解度チェックは seed＋gen を concat している
    for bank in ["CHECK_CORE_BANK", "CHECK_AX_BANK"]:
        m = re.search(r"const %s = __mkCheck\((\w+),[^)]*\)((?:\.concat\(\w+\))*);" % bank, s)
        if m:
            parts = [m.group(1)] + re.findall(r"\.concat\((\w+)\)", m.group(2))
            f[bank] = sum(len(array_after(s, "const %s = [" % p) or []) for p in parts)

    # --- 構造の数
    mt = module_range(s, "MegaTechHubModule")
    tabs = array_after(s, "const TABS = [", within=mt)
    f["TechHub.tabs"] = len(tabs)
    comp = array_after(s, "const COMPANIES = [")
    f["TechHub.companies"] = len(comp) if comp else None
    lg = module_range(s, "LinguisticsHubModule")
    cats_l = array_after(s, "const CATEGORIES = [", within=lg)
    f["Linguistics.categories"] = len(cats_l)
    f["Linguistics.fields"] = sum(len(top_elements(c, c.index("[", c.index("fields")))) for c in cats_l)
    ch = module_range(s, "CertHubModule")
    st = array_after(s, "const HUB_STATIONS = [", within=ch)
    codes = [field(e, "code") for e in st]
    f["Certification.stations"] = len(codes)
    f["Certification.certs(横断模試を除く)"] = sum(1 for c in codes if c and "MIX" not in c)

    # --- Book-Summary ハブ
    if BOOK.exists():
        b = BOOK.read_text(encoding="utf-8")
        yt = b.count('{"id":"yt_')
        note = b.count('{"id":"note_')
        allb = b.count('"oneLiner":')
        f["Book.youtube"] = yt
        f["Book.note"] = note
        f["Book.flier"] = allb - yt - note
        f["Book.total"] = allb
        src = array_after(b, "const SOURCES = [")
        f["Book.sources"] = [re.match(r"\{\s*id:\s*['\"]([^'\"]+)", e).group(1) for e in src]

    if "--json" in sys.argv:
        print(json.dumps(f, ensure_ascii=False, indent=1))
    else:
        w = max(len(k) for k in f)
        for k, v in f.items():
            print(f"{k.ljust(w)}  {v}")


if __name__ == "__main__":
    main()
