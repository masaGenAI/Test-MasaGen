#!/usr/bin/env python3
"""学習ロードマップ トラッカー — アーティファクト生成スクリプト.

artifacts/_build/raw/*.json（Notion からエクスポートした各データベース）と
artifacts/_build/additions.json（キーワード追加分）を読み込み、正規化して
artifacts/learning-tracker/artifact.html を再生成する。

使い方:
    python artifacts/_build/build.py

区分の判定はファイル名の接頭辞で行う（例: hon.json / hon_2.json → 書籍）。
"""
from __future__ import annotations

import html
import json
from collections import Counter, defaultdict
from pathlib import Path

BUILD_DIR = Path(__file__).resolve().parent
RAW_DIR = BUILD_DIR / "raw"
ADDITIONS = BUILD_DIR / "additions.json"
OUT = BUILD_DIR.parent / "learning-tracker" / "artifact.html"

# 区分ごとのカラム対応（Notion のプロパティ名 → 正規化スキーマ）
# prefix: raw/<prefix>.json および raw/<prefix>_N.json がこの区分に属する
CATEGORIES = {
    "shikaku": {"cat": "資格", "name": "資格名", "prov": "プロバイダー", "genre": "大項目"},
    "tools": {"cat": "Tools", "name": "タイトル", "prov": "プロバイダー", "genre": "大項目"},
    "koza": {"cat": "講座", "name": "講座", "prov": None, "genre": "ジャンル"},
    "hon": {"cat": "書籍", "name": "書籍名", "prov": None, "genre": "ジャンル"},
    "udemy": {"cat": "Udemy", "name": "コース名", "prov": None, "genre": "ジャンル"},
}

# 表示順（PDF のタブ順）
CAT_ORDER = ["資格", "Tools", "講座", "書籍", "Udemy"]

# 完了とみなすステータス値
DONE = {"完了", "取得済み"}
IN_PROGRESS = {"準備中", "着手中", "再チェック"}


def prefix_of(stem: str) -> str:
    """'hon_2' -> 'hon' のように末尾の _N を除いた接頭辞を返す。"""
    parts = stem.rsplit("_", 1)
    if len(parts) == 2 and parts[1].isdigit():
        return parts[0]
    return stem


def status_class(status: str) -> str:
    if status in DONE:
        return "done"
    if status in IN_PROGRESS:
        return "wip"
    return "todo"


def load_entries() -> list[dict]:
    entries: list[dict] = []
    files = sorted(RAW_DIR.glob("*.json"))
    for f in files:
        prefix = prefix_of(f.stem)
        spec = CATEGORIES.get(prefix)
        if spec is None:
            print(f"  警告: 未知の接頭辞をスキップ: {f.name}")
            continue
        rows = json.loads(f.read_text(encoding="utf-8"))
        for row in rows:
            entries.append(
                {
                    "cat": spec["cat"],
                    "prov": (row.get(spec["prov"]) or "") if spec["prov"] else "",
                    "name": row.get(spec["name"], "") or "",
                    "genre": row.get(spec["genre"], "") or "",
                    "status": row.get("ステータス", "") or "未着手",
                    "date": row.get("date") or row.get("date:取得予定日:start") or "",
                    "url": row.get("url", "") or "",
                }
            )
    # キーワード追加分（正規化済みスキーマでそのまま append）
    if ADDITIONS.exists():
        for row in json.loads(ADDITIONS.read_text(encoding="utf-8")):
            entries.append(
                {
                    "cat": row["cat"],
                    "prov": row.get("prov", ""),
                    "name": row["name"],
                    "genre": row.get("genre", ""),
                    "status": row.get("status", "未着手"),
                    "date": row.get("date", ""),
                    "url": row.get("url", ""),
                }
            )
    # 全一覧の並びを PDF と同じ区分順（資格→Tools→講座→書籍→Udemy）にする
    order = {c: i for i, c in enumerate(CAT_ORDER)}
    entries.sort(key=lambda e: order.get(e["cat"], len(CAT_ORDER)))
    return entries


def build_html(entries: list[dict]) -> str:
    total = len(entries)
    by_cat: dict[str, list[dict]] = defaultdict(list)
    for e in entries:
        by_cat[e["cat"]].append(e)

    cat_counts = {c: len(by_cat.get(c, [])) for c in CAT_ORDER}
    done_total = sum(1 for e in entries if e["status"] in DONE)
    done_by_cat = {
        c: sum(1 for e in by_cat.get(c, []) if e["status"] in DONE) for c in CAT_ORDER
    }
    pct = round(done_total / total * 100) if total else 0

    # ドーナツ（区分別比率）用の色
    cat_color = {
        "資格": "#6366f1",
        "Tools": "#22c55e",
        "講座": "#a855f7",
        "書籍": "#38bdf8",
        "Udemy": "#e879f9",
    }
    # 区分別ドーナツの conic-gradient
    stops = []
    acc = 0.0
    for c in CAT_ORDER:
        frac = (cat_counts[c] / total) if total else 0
        stops.append(f"{cat_color[c]} {acc*100:.2f}% {(acc+frac)*100:.2f}%")
        acc += frac
    donut_cat = ", ".join(stops)

    data_json = json.dumps(entries, ensure_ascii=False)

    def esc(s: str) -> str:
        return html.escape(str(s), quote=True)

    legend_items = "".join(
        f'<li><span class="dot" style="background:{cat_color[c]}"></span>'
        f'{c} {done_by_cat[c]}/{cat_counts[c]}</li>'
        for c in CAT_ORDER
    )
    ratio_items = "".join(
        f'<li><span class="dot" style="background:{cat_color[c]}"></span>'
        f'{c} {cat_counts[c]}</li>'
        for c in CAT_ORDER
    )
    tabs = '<button class="tab active" data-cat="全一覧">📋 全一覧</button>' + "".join(
        f'<button class="tab" data-cat="{c}">{c}</button>' for c in CAT_ORDER
    )

    return f"""<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>📘 学習ロードマップ トラッカー</title>
<style>
:root {{
  --bg:#f4f6fb; --card:#ffffff; --ink:#1f2937; --sub:#6b7280; --line:#e5e7eb;
  --accent:#4f46e5; --accent-soft:#eef2ff; --chip:#eef2ff; --chip-ink:#4f46e5;
  --done:#16a34a; --wip:#ea580c; --todo:#9ca3af;
}}
@media (prefers-color-scheme: dark) {{
  :root {{ --bg:#0f1420; --card:#171d2b; --ink:#e5e9f0; --sub:#9aa4b2; --line:#2a3244;
    --accent:#818cf8; --accent-soft:#1e2438; --chip:#1e2438; --chip-ink:#a5b4fc; }}
}}
:root[data-theme="dark"] {{ --bg:#0f1420; --card:#171d2b; --ink:#e5e9f0; --sub:#9aa4b2;
  --line:#2a3244; --accent:#818cf8; --accent-soft:#1e2438; --chip:#1e2438; --chip-ink:#a5b4fc; }}
:root[data-theme="light"] {{ --bg:#f4f6fb; --card:#ffffff; --ink:#1f2937; --sub:#6b7280;
  --line:#e5e7eb; --accent:#4f46e5; --accent-soft:#eef2ff; --chip:#eef2ff; --chip-ink:#4f46e5; }}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:var(--bg); color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;
  line-height:1.6; }}
.wrap {{ max-width:1000px; margin:0 auto; padding:28px 18px 60px; }}
h1 {{ font-size:1.6rem; margin:0 0 4px; display:flex; align-items:center; gap:8px; }}
.lede {{ color:var(--sub); font-size:.86rem; margin:0 0 18px; }}
.tabs {{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }}
.tab {{ border:1px solid var(--line); background:var(--card); color:var(--ink);
  padding:8px 14px; border-radius:10px; font-size:.85rem; cursor:pointer; font-weight:600; }}
.tab.active {{ background:var(--accent); color:#fff; border-color:var(--accent); }}
.cards {{ display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:22px; }}
@media (max-width:680px) {{ .cards {{ grid-template-columns:1fr; }} }}
.card {{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:18px 20px; }}
.card h2 {{ font-size:.95rem; margin:0 0 14px; }}
.donutrow {{ display:flex; align-items:center; gap:18px; }}
.donut {{ width:120px; height:120px; border-radius:50%; flex:none; display:grid; place-items:center; position:relative; }}
.donut::after {{ content:""; position:absolute; inset:14px; background:var(--card); border-radius:50%; }}
.donut .inner {{ position:relative; z-index:1; text-align:center; }}
.donut .big {{ font-size:1.5rem; font-weight:800; line-height:1.1; }}
.donut .small {{ font-size:.7rem; color:var(--sub); }}
ul.legend {{ list-style:none; margin:0; padding:0; font-size:.8rem; color:var(--sub); }}
ul.legend li {{ display:flex; align-items:center; gap:7px; margin:3px 0; white-space:nowrap; }}
.dot {{ width:10px; height:10px; border-radius:3px; flex:none; }}
.toolbar {{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-bottom:12px; }}
.toolbar input, .toolbar select {{ border:1px solid var(--line); background:var(--card); color:var(--ink);
  padding:7px 10px; border-radius:9px; font-size:.82rem; }}
.toolbar input {{ flex:1; min-width:180px; }}
.count {{ font-size:.8rem; color:var(--sub); margin-left:auto; }}
.tablewrap {{ overflow-x:auto; border:1px solid var(--line); border-radius:14px; background:var(--card); }}
table {{ width:100%; border-collapse:collapse; font-size:.83rem; }}
th, td {{ text-align:left; padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top; }}
th {{ position:sticky; top:0; background:var(--card); color:var(--sub); font-weight:700;
  font-size:.76rem; white-space:nowrap; z-index:1; }}
tr:last-child td {{ border-bottom:none; }}
td.no {{ color:var(--sub); width:44px; }}
.badge {{ display:inline-block; padding:2px 10px; border-radius:999px; font-size:.72rem; font-weight:700;
  background:var(--chip); color:var(--chip-ink); white-space:nowrap; }}
.prov {{ color:var(--sub); font-size:.8rem; white-space:nowrap; }}
.genre {{ display:inline-block; padding:2px 9px; border-radius:7px; font-size:.72rem;
  background:var(--accent-soft); color:var(--chip-ink); }}
a.name {{ color:var(--accent); text-decoration:none; }}
a.name:hover {{ text-decoration:underline; }}
.name.plain {{ color:var(--ink); }}
.st {{ display:inline-flex; align-items:center; gap:6px; white-space:nowrap; font-size:.78rem; }}
.st::before {{ content:""; width:8px; height:8px; border-radius:50%; }}
.st.done::before {{ background:var(--done); }}
.st.wip::before {{ background:var(--wip); }}
.st.todo::before {{ background:var(--todo); }}
.foot {{ text-align:center; color:var(--sub); font-size:.75rem; margin-top:22px; }}
</style>
</head>
<body>
<div class="wrap">
  <h1>📘 学習ロードマップ トラッカー</h1>
  <p class="lede">Excel「Jobopp」＋Notion（資格・Tools・講座・書籍・Udemy）を取り込み。全 {total} 件 ・ 完了 {done_total} 件（{pct}%）。キーワードを送ると Web で調べて追加します。</p>

  <div class="tabs" id="tabs">{tabs}</div>

  <div class="cards">
    <div class="card">
      <h2>📋 <span id="progTitle">全一覧</span> の全体の進捗</h2>
      <div class="donutrow">
        <div class="donut" id="progDonut" style="background:conic-gradient(var(--accent) {pct}%, var(--line) 0);">
          <div class="inner"><div class="big" id="progPct">{pct}%</div><div class="small">完了率</div></div>
        </div>
        <div>
          <div style="font-weight:800; margin-bottom:6px;" id="progText">{done_total} / {total} 完了</div>
          <ul class="legend">{legend_items}</ul>
        </div>
      </div>
    </div>
    <div class="card">
      <h2>ジャンル別の比率</h2>
      <div class="donutrow">
        <div class="donut" style="background:conic-gradient({donut_cat});">
          <div class="inner"><div class="big">{total}</div><div class="small">件</div></div>
        </div>
        <ul class="legend">{ratio_items}</ul>
      </div>
    </div>
  </div>

  <div class="toolbar">
    <input id="q" type="search" placeholder="🔍 名称・提供・分類で検索">
    <select id="fStatus"><option value="">ステータス（全て）</option>
      <option value="done">完了</option><option value="wip">着手中</option><option value="todo">未着手</option></select>
    <select id="fGenre"><option value="">分類（全て）</option></select>
    <span class="count" id="count"></span>
  </div>

  <div class="tablewrap">
    <table>
      <thead><tr><th>No</th><th>区分</th><th>提供</th><th>名称</th><th>分類</th><th>ステータス</th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
  </div>

  <p class="foot">Notion のデータを基に生成。編集・新規追加は build.py で再生成 → 最新化。</p>
</div>

<script>
const DATA = {data_json};
const DONE = new Set(["完了","取得済み"]);
const WIP = new Set(["準備中","着手中","再チェック"]);
function stClass(s){{ if(DONE.has(s)) return "done"; if(WIP.has(s)) return "todo"===s?"todo":"wip"; return "todo"; }}
function stLabel(s){{ if(DONE.has(s)) return "完了"; if(WIP.has(s)) return "着手中"; return "未着手"; }}
let curCat = "全一覧";

const rowsEl = document.getElementById("rows");
const countEl = document.getElementById("count");
const qEl = document.getElementById("q");
const fStatus = document.getElementById("fStatus");
const fGenre = document.getElementById("fGenre");

function esc(s){{ const d=document.createElement("div"); d.textContent=s??""; return d.innerHTML; }}

function currentList(){{
  return curCat==="全一覧" ? DATA : DATA.filter(e=>e.cat===curCat);
}}

function refreshGenreOptions(){{
  const genres=[...new Set(currentList().map(e=>e.genre).filter(Boolean))].sort();
  fGenre.innerHTML='<option value="">分類（全て）</option>'+genres.map(g=>`<option value="${{esc(g)}}">${{esc(g)}}</option>`).join("");
}}

function render(){{
  const q=qEl.value.trim().toLowerCase();
  const st=fStatus.value, gn=fGenre.value;
  let list=currentList();
  let n=0, html="";
  list.forEach(e=>{{
    if(st && stClass(e.status)!==st) return;
    if(gn && e.genre!==gn) return;
    if(q && !((e.name+e.prov+e.genre+e.cat).toLowerCase().includes(q))) return;
    n++;
    const nameCell = e.url
      ? `<a class="name" href="${{esc(e.url)}}" target="_blank" rel="noopener">${{esc(e.name)}}</a>`
      : `<span class="name plain">${{esc(e.name)}}</span>`;
    html+=`<tr><td class="no">${{n}}</td>`+
      `<td><span class="badge">${{esc(e.cat)}}</span></td>`+
      `<td class="prov">${{esc(e.prov||"—")}}</td>`+
      `<td>${{nameCell}}</td>`+
      `<td>${{e.genre?`<span class="genre">${{esc(e.genre)}}</span>`:""}}</td>`+
      `<td><span class="st ${{stClass(e.status)}}">${{esc(stLabel(e.status))}}</span></td></tr>`;
  }});
  rowsEl.innerHTML=html||`<tr><td colspan="6" style="text-align:center;color:var(--sub);padding:30px">該当なし</td></tr>`;
  countEl.textContent=`${{n}} 件表示`;
}}

document.getElementById("tabs").addEventListener("click", ev=>{{
  const b=ev.target.closest(".tab"); if(!b) return;
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  b.classList.add("active"); curCat=b.dataset.cat;
  document.getElementById("progTitle").textContent=curCat;
  const list=currentList();
  const done=list.filter(e=>DONE.has(e.status)).length;
  const pct=list.length?Math.round(done/list.length*100):0;
  document.getElementById("progPct").textContent=pct+"%";
  document.getElementById("progText").textContent=`${{done}} / ${{list.length}} 完了`;
  document.getElementById("progDonut").style.background=`conic-gradient(var(--accent) ${{pct}}%, var(--line) 0)`;
  refreshGenreOptions(); render();
}});
[qEl,fStatus,fGenre].forEach(el=>el.addEventListener("input",render));
refreshGenreOptions(); render();
</script>
</body>
</html>
"""


def main() -> None:
    entries = load_entries()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(build_html(entries), encoding="utf-8")

    by_cat = Counter(e["cat"] for e in entries)
    done = Counter(e["cat"] for e in entries if e["status"] in DONE)
    print(f"生成: {OUT}  (全 {len(entries)} 件)")
    for c in CAT_ORDER:
        print(f"  {c:6} {by_cat.get(c,0):4} 件  (完了 {done.get(c,0)})")


if __name__ == "__main__":
    main()
