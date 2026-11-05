#!/usr/bin/env python3
"""まとめ直した更新一覧（JSON）から、アーティファクト用の HTML ページを作る。

使い方:
  python3 .claude/skills/update-digest/scripts/make_page.py summary.json out.html [--changes changes.json]

- summary.json の形は references/summary-example.json を見る（SKILL.md の「5. アーティファクトにする」に説明）。
- --changes に changes.py --json の出力を渡すと、summary の "days": "auto" を日別のコミット数で埋める。
- 見た目は references/page-style.css（ポータルのハブ色に合わせた台帳型）。ダークテーマとスマホ幅に対応済み。
- 項目の "html" はこちらで書いた文をそのまま入れる（<strong>・<ul><li>・<span class="n"> を使ってよい）。
  外から取ってきた文を入れるときは "text" を使う（エスケープされる）。
"""
from __future__ import annotations

import collections
import html
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CSS = open(os.path.join(HERE, "..", "references", "page-style.css"), encoding="utf-8").read()
COLORS = {"portal", "megatech", "cert", "finance", "consulting", "ling", "lang", "book", "liberal", "side", "training", "tracker", "off"}
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700'
         '&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap">\n')
E = html.escape


def color(c: str) -> str:
    if c not in COLORS:
        raise SystemExit(f"color '{c}' は使えない。使えるのは: {', '.join(sorted(COLORS))}")
    return f"var(--hub-{c})"


def item_html(it: dict) -> str:
    body = it["html"] if "html" in it else E(it.get("text", ""))
    cls = ' class="recent"' if it.get("recent") else ""
    return f'<li{cls}><div class="when">{E(it.get("when", ""))}</div><div class="what">{body}</div></li>'


def days_from_changes(path: str) -> list:
    d = json.load(open(path, encoding="utf-8"))
    cnt = collections.Counter(c["date"][5:10].replace("-", "/") for c in d["commits"])
    return sorted(cnt.items())


def main() -> None:
    args = sys.argv[1:]
    changes = None
    if "--changes" in args:
        k = args.index("--changes")
        changes = args[k + 1]
        del args[k:k + 2]
    if len(args) != 2:
        raise SystemExit(__doc__)
    S = json.load(open(args[0], encoding="utf-8"))
    out = []
    out.append(f"<title>{E(S['title'])}</title>")
    out.append('<meta name="claude:viewport-fit-sides" content="cover">')
    out.append(FONTS + "<style>\n" + CSS + "</style>\n")
    out.append('<div class="wrap">\n  <header class="top">')
    if S.get("eyebrow"):
        out.append(f'    <div class="eyebrow">{E(S["eyebrow"])}</div>')
    out.append(f'    <h1>{E(S["heading"])}</h1>')
    if S.get("lede"):
        out.append(f'    <p class="lede">{E(S["lede"])}</p>')
    facts = [f'<span class="fact">{E(f["label"])} <b>{E(str(f["value"]))}</b>{E(f.get("suffix", ""))}</span>' for f in S.get("facts", [])]
    P = S.get("pages")
    if P:
        cls = "fact ok" if P.get("state") == "published" else "fact"
        label = {"published": "GitHub Pages：公開済み", "partial": "GitHub Pages：一部のみ公開", "unknown": "GitHub Pages：未確認"}.get(P.get("state"), "GitHub Pages")
        facts.append(f'<span class="{cls}">{label} <b>{E(P.get("sha", ""))}</b></span>')
    out.append('    <div class="facts">' + "".join(facts) + "</div>")
    days = S.get("days")
    if days == "auto":
        if not changes:
            raise SystemExit('"days": "auto" には --changes が要る')
        days = days_from_changes(changes)
    if days:
        mx = max(n for _, n in days) or 1
        aria = "日別のコミット数：" + "、".join(f"{d} {n}件" for d, n in days)
        bars = "".join(f'<div class="day"><span class="cnt">{n}</span><span class="bar" style="height:{round(90 * n / mx)}px"></span><span class="dt">{E(d)}</span></div>' for d, n in days)
        cols = f' style="grid-template-columns: repeat({len(days)}, minmax(0, 1fr)); max-width: {min(1000, 74 * len(days))}px"'
        out.append(f'    <div class="days" role="img" aria-label="{E(aria)}"{cols}>{bars}</div>')
        if S.get("days_note"):
            out.append(f'    <p class="days-cap">{E(S["days_note"])}</p>')
    if P and P.get("note"):
        out.append(f'    <p class="note-small">{E(P["note"])}</p>')
    out.append("  </header>")

    sections = S["sections"]
    has_recent = any(it.get("recent") for s in sections for g in s["groups"] for it in g["items"])
    nav = [f'<a href="#{E(s["id"])}" style="--c: {color(s["color"])}">{E(s.get("short", s["name"]))}</a>' for s in sections]
    if has_recent and S.get("recent_label"):
        nav.append(f'<label class="toggle" for="only-recent"><input type="checkbox" id="only-recent"> {E(S["recent_label"])}</label>')
    out.append('  <nav class="jump" aria-label="ハブへ移動">\n    ' + "\n    ".join(nav) + "\n  </nav>")

    for s in sections:
        recent_here = any(it.get("recent") for g in s["groups"] for it in g["items"])
        cls = "hub" if recent_here or not has_recent else "hub no-recent"
        badge = f' <span class="tag" style="font-size:13px;color:var(--sub);font-weight:500">{E(s["badge"])}</span>' if s.get("badge") else ""
        out.append(f'\n  <section class="{cls}" id="{E(s["id"])}" style="--c: {color(s["color"])}">')
        out.append(f'    <h2>{E(s["name"])}{badge}</h2>')
        for g in s["groups"]:
            if g.get("heading"):
                out.append(f'    <h3>{E(g["heading"])}</h3>')
            out.append('    <ol class="ledger">\n      ' + "\n      ".join(item_html(it) for it in g["items"]) + "\n    </ol>")
        out.append("  </section>")

    if S.get("footer"):
        out.append('\n  <footer class="foot">\n    <h2>この一覧の作り方</h2>\n    <ul>')
        out += [f"      <li>{line}</li>" for line in S["footer"]]
        out.append("    </ul>\n  </footer>")
    out.append("</div>")
    if has_recent and S.get("recent_label"):
        key = "nova-updates-only-recent-" + "".join(ch for ch in S["title"] if ch.isalnum())[:40]
        out.append("""
<script>
(function () {
  var box = document.getElementById("only-recent"), KEY = %s;
  function apply(on) { document.body.classList.toggle("only-recent", on); }
  try { if (localStorage.getItem(KEY) === "1") { box.checked = true; apply(true); } } catch (e) {}
  box.addEventListener("change", function () { apply(box.checked); try { localStorage.setItem(KEY, box.checked ? "1" : "0"); } catch (e) {} });
})();
</script>""" % json.dumps(key))
    open(args[1], "w", encoding="utf-8").write("\n".join(out) + "\n")
    n = sum(len(g["items"]) for s in sections for g in s["groups"])
    print(f"wrote {args[1]}: {len(sections)} sections, {n} items")


if __name__ == "__main__":
    main()
