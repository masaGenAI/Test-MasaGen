#!/usr/bin/env python3
"""期間内のコミットを「画面のどこに出たか（ハブ › タブ）」で整理して Markdown／JSON で出す。

使い方:
  python3 .claude/skills/update-digest/scripts/changes.py --since 2026-10-29 [--until 2026-11-05]
  python3 .claude/skills/update-digest/scripts/changes.py --days 7 --json out.json
  python3 .claude/skills/update-digest/scripts/changes.py --days 7 --pages   # Pages の公開状況も見る

しくみ:
  - nova-app/src/ProjectNova.jsx は 1 ファイルに全ハブが入っている。コミットごとに差分の行番号を取り、
    そのコミット時点のファイルの「目印」（`const XxxModule = (function`・`const Station_Xxx =`・
    `// Project-Nova : Portal Shell`）のうち直前のものでハブ（資格ハブは資格ごと）を決める。
  - TechHub の中は、差分の見出し（git が付ける直前の関数・定数名）を、今の版のタブ割り当て
    （`tab === "id" && <Comp` から参照をたどったもの）でタブ名に直す。
  - そのほかのファイルは references/places.json の対応表で決める。
  - ProjectNova.jsx は 100MB 近くあり 1 コミットの差分に数秒かかるので、結果を .git/update-digest-cache.json に残す。
"""
from __future__ import annotations

import argparse
import collections
import datetime as dt
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PLACES = json.load(open(os.path.join(HERE, "..", "references", "places.json"), encoding="utf-8"))
JSX = "nova-app/src/ProjectNova.jsx"
LANDMARK = r"^(const [A-Za-z0-9_]+Module = \(function|const Station_[A-Za-z0-9]+ *=|// Project-Nova : Portal Shell)"
CACHE_VERSION = 2


def git(*args: str, check: bool = True) -> str:
    r = subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, errors="replace")
    if check and r.returncode != 0:
        raise SystemExit(f"git {' '.join(args)} failed: {r.stderr.strip()}")
    return r.stdout


ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True).stdout.strip() or "."


# ---------- 1 コミットぶんの差分を場所の手がかりに直す（キャッシュする） ----------
def landmark_name(text: str) -> str:
    if text.startswith("// Project-Nova : Portal Shell"):
        return "PORTAL"
    m = re.match(r"const ([A-Za-z0-9_]+)", text)
    return m.group(1) if m else "COMMON"


def ctx_name(ctx: str) -> str | None:
    m = re.search(r"\bfunction\s+([A-Za-z0-9_$]+)", ctx) or re.search(r"^\s*(?:export\s+)?(?:const|let|var|class)\s+([A-Za-z0-9_$]+)", ctx)
    return m.group(1) if m else None


def analyse_commit(h: str) -> dict:
    parents = git("rev-list", "--parents", "-n", "1", h).split()[1:]
    numstat = []
    for line in git("diff-tree", "-r", "--root", "--no-commit-id", "--numstat", h).splitlines():
        a, d, path = line.split("\t", 2)
        numstat.append([path, None if a == "-" else int(a), None if d == "-" else int(d)])
    jsx = []
    if parents and any(p == JSX for p, _, _ in numstat):
        marks = []
        for line in git("grep", "-n", "-E", LANDMARK, h, "--", JSX, check=False).splitlines():
            # 形式: <commit>:<path>:<line>:<text>
            rest = line.split(":", 2)[2]
            n, text = rest.split(":", 1)
            marks.append((int(n), landmark_name(text)))
        marks.sort()
        agg = collections.defaultdict(lambda: [0, 0])
        for line in git("diff", "-U0", parents[0], h, "--", JSX).splitlines():
            m = re.match(r"^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@ ?(.*)$", line)
            if not m:
                continue
            dels = int(m.group(2)) if m.group(2) is not None else 1
            start = int(m.group(3))
            adds = int(m.group(4)) if m.group(4) is not None else 1
            lm = "COMMON"
            for n, name in marks:
                if n <= max(start, 1):
                    lm = name
                else:
                    break
            k = (lm, ctx_name(m.group(5) or ""))
            agg[k][0] += adds
            agg[k][1] += dels
        jsx = [[lm, c, a, d] for (lm, c), (a, d) in agg.items()]
    return {"v": CACHE_VERSION, "files": numstat, "jsx": jsx}


# ---------- 今の版から、名前・タブの対応を作る ----------
def head_maps() -> dict:
    src = open(os.path.join(ROOT, JSX), encoding="utf-8", errors="replace").read().split("\n")
    marks = [(i, landmark_name(t)) for i, t in enumerate(src) if re.match(LANDMARK, t)]
    # ハブ名（ポータルの一覧）
    hubs = {}
    portal = next((i for i, n in marks if n == "PORTAL"), 0)
    for i in range(portal, len(src)):
        m = re.match(r'\s*id: "([a-z]+)",\s*$', src[i])
        if m:
            for j in range(i + 1, min(i + 8, len(src))):
                mj = re.match(r'\s*ja: "([^"]+)"', src[j])
                if mj:
                    hubs.setdefault(m.group(1), mj.group(1))
                    break
    # TechHub のタブ
    mt = next((k for k, (i, n) in enumerate(marks) if n == "MegaTechHubModule"), None)
    tabs, order, name2tabs, shell = {}, [], {}, None
    if mt is not None:
        a, b = marks[mt][0], marks[mt + 1][0] if mt + 1 < len(marks) else len(src)
        body = src[a:b]
        text = "\n".join(body)
        for m in re.finditer(r'tab_([a-z0-9_]+): \["([^"]+)"', text):
            tabs.setdefault(m.group(1), m.group(2))
        for m in re.finditer(r'\{ id: "([a-z0-9_]+)", k: "tab_', text):
            if m.group(1) not in order:
                order.append(m.group(1))
        decl = []
        for i, t in enumerate(body):
            m = re.match(r"^(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_$]+)", t) or re.match(r"^(?:const|let|var|class)\s+([A-Za-z0-9_$]+)", t)
            if m:
                decl.append((i, m.group(1)))
        names = {n for _, n in decl}
        tokens = {}
        for k, (i, n) in enumerate(decl):
            j = decl[k + 1][0] if k + 1 < len(decl) else len(body)
            tokens.setdefault(n, set()).update(set(re.findall(r"[A-Za-z_$][A-Za-z0-9_$]*", "\n".join(body[i:j]))) & names)
            if shell is None and 'tab === "' in "\n".join(body[i:j]) and re.search(r'tab === "[a-z0-9_]+" && <', "\n".join(body[i:j])):
                shell = n
        roots = collections.defaultdict(set)
        for m in re.finditer(r'tab === "([a-z0-9_]+)" && <([A-Za-z0-9_]+)', text):
            roots[m.group(2)].add(m.group(1))
        for comp, tset in roots.items():
            seen, stack = set(), [comp]
            while stack:
                x = stack.pop()
                if x in seen or x == shell:
                    continue
                seen.add(x)
                name2tabs.setdefault(x, set()).update(tset)
                stack.extend(tokens.get(x, ()))
    return {"hubs": hubs, "tabs": tabs, "tab_order": order, "name2tabs": name2tabs, "shell": shell}


def station_label(code: str) -> str:
    if code in PLACES["stations"]:
        return PLACES["stations"][code]
    return re.sub(r"^([A-Z]+)(\d+)$", r"\1-\2", code)


def place_of_jsx(lm: str, ctx: str | None, M: dict) -> tuple:
    """(並べ順, 表示名) を返す。"""
    hubs = M["hubs"]
    hub_order = ["PORTAL", "COMMON"] + list(hubs)
    if lm == "PORTAL":
        return (0, 0, "ポータル（トップページ）")
    if lm == "COMMON":
        return (1, 0, "全ハブ共通の部品")
    if lm.startswith("Station_"):
        hid = "certification"
        return (hub_order.index(hid) if hid in hub_order else 99, 1, f"{hubs.get(hid, hid)} › {station_label(lm[8:])}")
    hid = PLACES["modules"].get(lm)
    if not hid:
        return (98, 0, f"その他（{lm}）")
    hname = hubs.get(hid, hid)
    hi = hub_order.index(hid) if hid in hub_order else 99
    if hid != "megatech":
        return (hi, 0, hname)
    if ctx and ctx == M["shell"]:
        return (hi, 0, f"{hname}（タブの枠：ナビ・検索・言語切替など）")
    ts = sorted(M["name2tabs"].get(ctx, ()), key=lambda t: M["tab_order"].index(t) if t in M["tab_order"] else 999)
    if len(ts) == 1:
        t = ts[0]
        return (hi, 1 + (M["tab_order"].index(t) if t in M["tab_order"] else 500), f"{hname} › {M['tabs'].get(t, t)}")
    if 2 <= len(ts) <= 3:
        return (hi, 900, f"{hname} › " + "／".join(M["tabs"].get(t, t) for t in ts))
    if len(ts) > 3:
        return (hi, 950, f"{hname}（複数タブで使う共通部品）")
    return (hi, 990, f"{hname}（タブ未特定）")


def place_of_path(path: str, M: dict) -> tuple | None:
    best = None
    for r in PLACES["paths"]:
        if path.startswith(r["prefix"]) and (best is None or len(r["prefix"]) > len(best["prefix"])):
            best = r
    if best is None:
        return None
    if "offapp" in best:
        return (1000, 0, "【アプリに出ない】" + best["offapp"].replace("（アプリには出ない）", ""))
    hubs = M["hubs"]
    hub_order = ["PORTAL", "COMMON"] + list(hubs)
    hid = best["hub"]
    name = hubs.get(hid, hid)
    sub = 0
    if best.get("tab"):
        t = best["tab"]
        name += f" › {M['tabs'].get(t, t)}"
        sub = 1 + (M["tab_order"].index(t) if t in M["tab_order"] else 500)
    return (hub_order.index(hid) if hid in hub_order else 99, sub, name)


def owner_repo() -> str | None:
    url = git("remote", "get-url", "origin", check=False).strip()
    m = re.search(r"github\.com[/:]([^/]+)/([^/.]+)", url) or re.search(r"/git/([^/]+)/([^/.]+)", url)
    return f"{m.group(1)}/{m.group(2)}" if m else None


def pages_status() -> str:
    repo = owner_repo()
    if not repo:
        return "Pages: リモートが分からないので未確認"
    try:
        r = subprocess.run(["gh", "api", f"repos/{repo}/deployments?environment=github-pages&per_page=1"], capture_output=True, text=True, timeout=60)
        dep = json.loads(r.stdout)[0]
        r2 = subprocess.run(["gh", "api", f"repos/{repo}/deployments/{dep['id']}/statuses"], capture_output=True, text=True, timeout=60)
        st = json.loads(r2.stdout)[0]
        return f"Pages: 公開中のコミット {dep['sha'][:7]}（状態 {st['state']}、{st['created_at']}）"
    except Exception as e:  # noqa: BLE001 — 取れなければ未確認と書く
        return f"Pages: 未確認（{type(e).__name__}）"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--since", help="開始日 YYYY-MM-DD（その日を含む）")
    ap.add_argument("--until", help="終了日 YYYY-MM-DD（その日を含む）")
    ap.add_argument("--days", type=int, help="今日から遡る日数（--since の代わり）")
    ap.add_argument("--rev", default="HEAD", help="どのブランチ・コミットまでを見るか（既定 HEAD）")
    ap.add_argument("--json", help="JSON の出力先")
    ap.add_argument("--pages", action="store_true", help="GitHub Pages の公開中コミットも調べる（gh api）")
    ap.add_argument("--min-lines", type=int, default=0, help="ProjectNova.jsx でこの行数未満しか触っていない場所は省く")
    a = ap.parse_args()
    since = a.since or (dt.date.today() - dt.timedelta(days=a.days or 7)).isoformat()
    args = ["log", "--reverse", "--no-merges", f"--since={since} 00:00", "--format=%H%x1f%ad%x1f%s", "--date=format:%Y-%m-%d %H:%M"]
    if a.until:
        args.append(f"--until={a.until} 23:59:59")
    args.append(a.rev)
    commits = [l.split("\x1f") for l in git(*args).splitlines() if l]

    cache_path = os.path.join(git("rev-parse", "--absolute-git-dir").strip(), "update-digest-cache.json")
    try:
        cache = json.load(open(cache_path))
    except Exception:  # noqa: BLE001
        cache = {}
    for k, (h, _, _) in enumerate(commits):
        if cache.get(h, {}).get("v") != CACHE_VERSION:
            print(f"  解析中 {k + 1}/{len(commits)} {h[:7]}", file=sys.stderr)
            cache[h] = analyse_commit(h)
            json.dump(cache, open(cache_path, "w"))

    M = head_maps()
    by_place = collections.defaultdict(list)  # (order,sub,name) -> [(date,hash,subject,detail)]
    per_commit = []
    for h, date, subj in commits:
        c = cache[h]
        places = collections.OrderedDict()
        for lm, ctx, ad, de in c["jsx"]:
            p = place_of_jsx(lm, ctx, M)
            x = places.setdefault(p, {"adds": 0, "dels": 0, "files": 0, "bins": 0, "what": set(), "names": set()})
            x["adds"] += ad
            x["dels"] += de
            if ctx:
                x["names"].add(ctx)
        unknown = []
        for path, ad, de in c["files"]:
            if path == JSX:
                continue
            p = place_of_path(path, M)
            if p is None:
                unknown.append(path)
                continue
            x = places.setdefault(p, {"adds": 0, "dels": 0, "files": 0, "bins": 0, "what": set(), "names": set()})
            x["files"] += 1
            if ad is None:
                x["bins"] += 1
            x["adds"] += ad or 0
            x["dels"] += de or 0
            rule = max((r for r in PLACES["paths"] if path.startswith(r["prefix"])), key=lambda r: len(r["prefix"]))
            if rule.get("what"):
                x["what"].add(rule["what"])
        if unknown:
            p = (1001, 0, "【未分類のファイル】references/places.json に足す")
            places.setdefault(p, {"adds": 0, "dels": 0, "files": len(unknown), "bins": 0, "what": set(unknown[:5]), "names": set()})
        rec = {"hash": h[:7], "date": date, "subject": subj, "places": []}
        for p, x in places.items():
            if a.min_lines and x["files"] == 0 and x["adds"] + x["dels"] < a.min_lines:
                continue
            parts = []
            if x["adds"] or x["dels"]:
                parts.append(f"+{x['adds']}/−{x['dels']}行")
            if x["bins"]:
                parts.append(f"画像など{x['bins']}ファイル")
            if x["files"] - x["bins"] > 0:
                parts.append(f"{x['files'] - x['bins']}ファイル")
            detail = "・".join(parts) or "変更なし"
            if x["what"]:
                detail += "・" + "、".join(sorted(x["what"]))
            if x["names"] and p[2].endswith(("（タブ未特定）", "（複数タブで使う共通部品）")):
                detail += "・触った名前: " + ", ".join(sorted(x["names"])[:6])
            by_place[p].append((date, h[:7], subj, detail))
            rec["places"].append({"place": p[2], "detail": detail})
        per_commit.append(rec)

    head = commits[-1] if commits else None
    lines = [f"# 更新一覧 {since}〜{a.until or dt.date.today().isoformat()}（コミット {len(commits)} 件）", ""]
    if head:
        lines.append(f"最新コミット: {head[0][:7]} {head[1]} {head[2]}")
    if a.pages:
        lines.append(pages_status())
    lines += ["", "## 場所ごと", ""]
    for p in sorted(by_place):
        lines.append(f"### {p[2]}（{len(by_place[p])} 件）")
        for date, h, subj, detail in by_place[p]:
            lines.append(f"- {date[5:]} {h} {subj}（{detail}）")
        lines.append("")
    lines += ["## コミットごと", ""]
    for r in per_commit:
        lines.append(f"- {r['date'][5:]} {r['hash']} {r['subject']} → " + "／".join(x["place"] for x in r["places"]))
    print("\n".join(lines))
    if a.json:
        json.dump({"since": since, "until": a.until, "commits": per_commit,
                   "places": {p[2]: [dict(zip(("date", "hash", "subject", "detail"), e)) for e in v] for p, v in sorted(by_place.items())}},
                  open(a.json, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
