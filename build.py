"""Daily Task Tracker artifact generator.

Reads ``artifacts/daily-task-tracker/data.json`` and renders a self-contained
``artifact.html`` (dashboard / calendar / heatmap / check-item views). The
generated file is publish-ready for the Claude artifact host: it contains only
body-level markup plus an inline ``<style>``/``<script>`` (no doctype wrapper).

Usage:
    python build.py
"""

from __future__ import annotations

import calendar
import html
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "artifacts" / "daily-task-tracker" / "data.json"
OUT_PATH = ROOT / "artifacts" / "daily-task-tracker" / "artifact.html"

# Status -> visual metadata (mark glyph + css class).
STATUS_META: dict[str, dict[str, str]] = {
    "done": {"mark": "済", "cls": "done"},
    "delayed": {"mark": "遅", "cls": "delayed"},
    "todo": {"mark": "未", "cls": "todo"},
    "future": {"mark": "", "cls": "future"},
}


def load_data(path: Path = DATA_PATH) -> dict:
    """Load the tracker data JSON. Returns the parsed mapping."""
    return json.loads(path.read_text(encoding="utf-8"))


def month_days(month: str) -> list[date]:
    """Return every ``date`` in ``YYYY-MM``."""
    year, mon = (int(part) for part in month.split("-"))
    last = calendar.monthrange(year, mon)[1]
    return [date(year, mon, day) for day in range(1, last + 1)]


def day_status(task: dict, day: date, today: date, default: str) -> str:
    """Resolve a task's status for ``day``.

    Precedence: explicit override > future (after today) > today (未着手) >
    the group's ``dailyDefault`` for elapsed days.
    """
    override = task.get("overrides", {}).get(day.isoformat())
    if override:
        return override
    if day > today:
        return "future"
    if day == today:
        return "todo"
    return default


def _pct(done: int, total: int) -> int:
    """Completion percentage (0-100), guarding against divide-by-zero."""
    return round(done / total * 100) if total else 0


def esc(value: object) -> str:
    """HTML-escape ``value`` for safe interpolation into markup."""
    return html.escape(str(value), quote=True)


def render_dashboard(data: dict) -> str:
    """Render the dashboard tab: grouped task cards with progress bars."""
    sections: list[str] = []
    for group in data["groups"]:
        cards: list[str] = []
        for task in group["tasks"]:
            pct = _pct(task["done"], task["total"])
            cards.append(
                f'<article class="card" tabindex="0">'
                f'<div class="card-head"><span class="card-name">{esc(task["name"])}</span>'
                f'<span class="card-frac">{task["done"]}/{task["total"]}</span></div>'
                f'<div class="bar"><span style="width:{pct}%"></span></div>'
                f'<div class="card-foot"><span>完了 {task["done"]}</span>'
                f'<span class="muted">遅延 {task["delayed"]}</span></div>'
                f"</article>"
            )
        gclass = "auto" if group.get("kind") == "auto" else "manual"
        sections.append(
            f'<h2 class="group-title {gclass}">{esc(group["name"])}</h2>'
            f'<div class="card-grid">{"".join(cards)}</div>'
        )
    return f'<section class="tab-panel active" data-tab="dashboard">{"".join(sections)}</section>'


def render_heatmap(data: dict, days: list[date], today: date) -> str:
    """Render the heatmap tab: task rows × day columns."""
    head_cells = "".join(
        f'<th class="{"is-today" if d == today else ""}">{d.month}/{d.day}</th>' for d in days
    )
    rows: list[str] = []
    for group in data["groups"]:
        rows.append(
            f'<tr class="group-row"><td colspan="{len(days) + 1}">{esc(group["name"])}</td></tr>'
        )
        default = group.get("dailyDefault", "todo")
        for task in group["tasks"]:
            cells: list[str] = []
            for d in days:
                status = day_status(task, d, today, default)
                meta = STATUS_META[status]
                cells.append(
                    f'<td class="cell {meta["cls"]}" '
                    f'title="{esc(task["name"])} {d.month}/{d.day}">'
                    f'<span>{meta["mark"]}</span></td>'
                )
            rows.append(
                f'<tr><th class="row-label">{esc(task["name"])}</th>{"".join(cells)}</tr>'
            )
    table = (
        f'<div class="heatmap-scroll"><table class="heatmap">'
        f'<thead><tr><th class="row-label">タスク \\ 日付</th>{head_cells}</tr></thead>'
        f'<tbody>{"".join(rows)}</tbody></table></div>'
    )
    return f'<section class="tab-panel" data-tab="heatmap">{table}</section>'


def render_calendar(data: dict, days: list[date], today: date) -> str:
    """Render the calendar tab: a month grid with per-day completion counts."""
    done_per_day: dict[str, int] = {}
    for group in data["groups"]:
        default = group.get("dailyDefault", "todo")
        for task in group["tasks"]:
            for d in days:
                if day_status(task, d, today, default) == "done":
                    done_per_day[d.isoformat()] = done_per_day.get(d.isoformat(), 0) + 1

    week_head = "".join(f"<th>{w}</th>" for w in ("月", "火", "水", "木", "金", "土", "日"))
    first = days[0]
    # Monday=0 offset for leading blanks.
    lead = first.weekday()
    cells: list[str] = ['<td class="empty"></td>' for _ in range(lead)]
    for d in days:
        cnt = done_per_day.get(d.isoformat(), 0)
        klass = "day"
        if d == today:
            klass += " is-today"
        if d > today:
            klass += " future"
        badge = f'<span class="badge">完了 {cnt}</span>' if cnt else ""
        cells.append(f'<td class="{klass}"><span class="dnum">{d.day}</span>{badge}</td>')
    while len(cells) % 7:
        cells.append('<td class="empty"></td>')
    rows = "".join(
        f"<tr>{''.join(cells[i:i + 7])}</tr>" for i in range(0, len(cells), 7)
    )
    table = (
        f'<div class="cal-wrap"><table class="calendar">'
        f"<thead><tr>{week_head}</tr></thead><tbody>{rows}</tbody></table></div>"
    )
    return f'<section class="tab-panel" data-tab="calendar">{table}</section>'


def render_checkitems(data: dict) -> str:
    """Render the check-item tab: today's Day-N items for auto tasks."""
    day_no = data.get("dayNumber", "")
    notion = esc(data.get("notionUrl", "#"))
    items: list[str] = []
    for group in data["groups"]:
        if group.get("kind") != "auto":
            continue
        for task in group["tasks"]:
            items.append(
                f'<li class="check-row">'
                f'<div class="check-name">{esc(task["name"])} Day {esc(day_no)} '
                f'<span class="pill">未着手</span></div>'
                f'<div class="check-actions">'
                f'<a class="btn btn-primary" href="{notion}" target="_blank" '
                f'rel="noopener">📝 問題へ</a>'
                f'<button class="btn btn-done" type="button">✓ 完了</button>'
                f'<button class="btn btn-next" type="button">✓ 完了＆翌日へ →</button>'
                f'<button class="btn btn-x" type="button">×</button>'
                f"</div></li>"
            )
    return (
        f'<section class="tab-panel" data-tab="check">'
        f'<div class="check-head">✅ 解いた問題をタップで完了にする</div>'
        f'<ul class="check-list">{"".join(items)}</ul></section>'
    )


def render_legend(data: dict) -> str:
    """Render the status legend + source-type note."""
    chips = "".join(
        f'<span class="lg lg-{item["key"]}">'
        f'<i></i>{esc(item["label"])}</span>'
        for item in data["legend"]
    )
    return (
        f'<div class="legend">{chips}'
        f'<span class="lg-src"><b class="src-auto">Cowork task</b> 自動生成'
        f'　<b class="src-manual">Others</b> 手動記録</span></div>'
    )


def render_abbr(data: dict) -> str:
    """Render the abbreviation footnote from task keys."""
    parts: list[str] = []
    for group in data["groups"]:
        keys = " ".join(f'{esc(t["key"])}={esc(t["name"])}' for t in group["tasks"])
        parts.append(f'<div class="abbr-line"><b>{esc(group["name"])}:</b> {keys}</div>')
    return f'<div class="abbr">{"".join(parts)}</div>'


def build_html(data: dict) -> str:
    """Assemble the full artifact body markup from ``data``."""
    today = date.fromisoformat(data["today"])
    days = month_days(data["month"])
    year, mon = data["month"].split("-")
    notion = esc(data.get("notionUrl", "#"))

    tabs = (
        '<div class="tabs" role="tablist">'
        '<button class="tab active" data-target="dashboard">ダッシュボード</button>'
        '<button class="tab" data-target="calendar">カレンダー</button>'
        '<button class="tab" data-target="heatmap">ヒートマップ</button>'
        '<button class="tab" data-target="check">チェック項目</button>'
        '<span class="sync">◌ Notionから自動取得中…</span>'
        "</div>"
    )
    panels = (
        render_dashboard(data)
        + render_calendar(data, days, today)
        + render_heatmap(data, days, today)
        + render_checkitems(data)
    )
    return f"""<style>{CSS}</style>
<main class="tracker">
  <header class="head">
    <h1>{esc(data["title"])}</h1>
    <p class="lead">{esc(data["description"])}</p>
  </header>
  {tabs}
  <div class="month-nav">‹ <b>{int(year)}年 {int(mon)}月</b> ›</div>
  {panels}
  {render_legend(data)}
  {render_abbr(data)}
  <p class="note">📌 マスをタップすると押印（完了/取消）・ステータス確認・問題をCoworkの
  チャットで開けます。</p>
  <p class="notion-link"><a href="{notion}" target="_blank" rel="noopener">🔗 Notionの
  トラッカーを開く</a></p>
</main>
<script>{JS}</script>
"""


CSS = """
*{box-sizing:border-box}
.tracker{--bg:#ffffff;--fg:#0f172a;--muted:#64748b;--line:#e2e8f0;--card:#ffffff;
  --accent:#2563eb;--accent-weak:#dbeafe;--delayed:#1e3a8a;--todo:#94a3b8;
  --auto:#2563eb;--manual:#7c3aed;--panel:#f8fafc;
  max-width:1040px;margin:0 auto;padding:20px;font-family:system-ui,-apple-system,
  "Segoe UI",Roboto,"Helvetica Neue",Arial,"Hiragino Sans","Noto Sans JP",sans-serif;
  color:var(--fg);line-height:1.5}
@media (prefers-color-scheme:dark){.tracker{--bg:#0b1220;--fg:#e5edf7;--muted:#94a3b8;
  --line:#26324a;--card:#111a2e;--accent:#60a5fa;--accent-weak:#1e293b;--delayed:#3b82f6;
  --todo:#475569;--auto:#60a5fa;--manual:#a78bfa;--panel:#0f1a30}}
:root[data-theme="dark"] .tracker{--bg:#0b1220;--fg:#e5edf7;--muted:#94a3b8;
  --line:#26324a;--card:#111a2e;--accent:#60a5fa;--accent-weak:#1e293b;--delayed:#3b82f6;
  --todo:#475569;--auto:#60a5fa;--manual:#a78bfa;--panel:#0f1a30}
:root[data-theme="light"] .tracker{--bg:#fff;--fg:#0f172a;--muted:#64748b;--line:#e2e8f0;
  --card:#fff;--accent:#2563eb;--accent-weak:#dbeafe;--delayed:#1e3a8a;--todo:#94a3b8;
  --auto:#2563eb;--manual:#7c3aed;--panel:#f8fafc}
.head h1{margin:0 0 4px;font-size:1.6rem;letter-spacing:.01em}
.lead{margin:0 0 16px;color:var(--muted);font-size:.9rem;max-width:70ch}
.tabs{display:flex;flex-wrap:wrap;align-items:center;gap:6px;background:var(--panel);
  border:1px solid var(--line);border-radius:12px;padding:6px}
.tab{border:0;background:transparent;color:var(--muted);font-weight:600;font-size:.9rem;
  padding:8px 14px;border-radius:8px;cursor:pointer;font-family:inherit}
.tab.active{background:var(--card);color:var(--accent);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.sync{margin-left:auto;color:var(--muted);font-size:.8rem;padding-right:6px}
.month-nav{margin:16px 0;font-size:1.05rem;color:var(--muted)}
.month-nav b{color:var(--fg)}
.tab-panel{display:none}
.tab-panel.active{display:block}
.group-title{font-size:.95rem;margin:18px 0 10px;font-weight:700}
.group-title.auto{color:var(--auto)}
.group-title.manual{color:var(--manual)}
.card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;
  cursor:pointer;transition:transform .08s,box-shadow .08s}
.card:hover,.card:focus{transform:translateY(-1px);box-shadow:0 4px 14px rgba(0,0,0,.08);
  outline:none;border-color:var(--accent)}
.card-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.card-name{font-weight:700;font-size:.92rem}
.card-frac{color:var(--muted);font-size:.82rem;white-space:nowrap}
.bar{height:8px;border-radius:99px;background:var(--accent-weak);margin:10px 0 8px;
  overflow:hidden}
.bar>span{display:block;height:100%;background:var(--accent);border-radius:99px}
.card-foot{display:flex;justify-content:space-between;font-size:.8rem}
.muted{color:var(--muted)}
.heatmap-scroll,.cal-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px}
.heatmap{border-collapse:collapse;font-size:.72rem;min-width:640px}
.heatmap th,.heatmap td{padding:0;text-align:center}
.heatmap thead th{position:sticky;top:0;background:var(--panel);color:var(--muted);
  font-weight:600;padding:8px 4px;border-bottom:1px solid var(--line)}
.heatmap thead th.is-today{color:var(--accent)}
.row-label{position:sticky;left:0;background:var(--panel);text-align:right !important;
  padding:0 10px !important;font-weight:600;white-space:nowrap;min-width:130px;
  border-right:1px solid var(--line)}
.group-row td{background:var(--panel);color:var(--auto);font-weight:700;text-align:left;
  padding:6px 10px;font-size:.75rem}
.cell{padding:3px}
.cell>span{display:flex;align-items:center;justify-content:center;width:26px;height:26px;
  margin:auto;border-radius:8px;font-size:.7rem;font-weight:700}
.cell.delayed>span{background:var(--delayed);color:#fff}
.cell.todo>span{background:var(--todo);color:#fff}
.cell.done>span{background:transparent;color:var(--accent);border:2px solid var(--accent)}
.cell.future>span{background:transparent;color:transparent}
.cell{cursor:pointer}
.calendar{border-collapse:collapse;width:100%;min-width:560px}
.calendar th{padding:8px;color:var(--muted);font-size:.8rem;border-bottom:1px solid var(--line)}
.calendar td{height:70px;vertical-align:top;border:1px solid var(--line);padding:6px;
  width:14.28%}
.calendar td.empty{background:var(--panel);border:0}
.calendar .dnum{font-size:.8rem;font-weight:600;color:var(--muted)}
.calendar td.is-today{outline:2px solid var(--accent);outline-offset:-2px}
.calendar td.is-today .dnum{color:var(--accent)}
.calendar td.future{background:var(--panel)}
.badge{display:inline-block;margin-top:8px;font-size:.68rem;background:var(--accent-weak);
  color:var(--accent);padding:2px 6px;border-radius:6px;font-weight:700}
.check-head{margin:4px 0 12px;font-weight:700}
.check-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.check-row{border:1px solid var(--line);border-radius:12px;padding:12px 14px;
  background:var(--card)}
.check-name{font-weight:700;font-size:.9rem;margin-bottom:8px}
.pill{font-size:.72rem;font-weight:600;color:var(--muted);background:var(--panel);
  border:1px solid var(--line);border-radius:99px;padding:1px 8px;margin-left:6px}
.check-actions{display:flex;flex-wrap:wrap;gap:8px}
.btn{border:0;border-radius:9px;padding:8px 14px;font-size:.82rem;font-weight:700;
  cursor:pointer;font-family:inherit;text-decoration:none;display:inline-block}
.btn-primary{background:var(--accent);color:#fff}
.btn-done{background:#16a34a;color:#fff}
.btn-next{background:#15803d;color:#fff}
.btn-x{background:var(--panel);color:var(--muted);border:1px solid var(--line)}
.legend{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin:20px 0 8px;
  font-size:.8rem;color:var(--muted)}
.lg{display:inline-flex;align-items:center;gap:6px}
.lg i{width:14px;height:14px;border-radius:5px;display:inline-block}
.lg-done i{border:2px solid var(--accent)}
.lg-delayed i{background:var(--delayed)}
.lg-todo i{background:var(--todo)}
.lg-future i{background:var(--panel);border:1px solid var(--line)}
.lg-src{margin-left:auto}
.src-auto{color:var(--auto)}
.src-manual{color:var(--manual)}
.abbr{margin:8px 0;color:var(--muted);font-size:.74rem;line-height:1.7}
.note{color:var(--muted);font-size:.8rem}
.notion-link a{color:var(--accent);font-size:.85rem;text-decoration:none}
.notion-link a:hover{text-decoration:underline}
"""

JS = """
(function(){
  var scope=document.querySelector('.tracker')||document;
  var tabs=scope.querySelectorAll('.tab');
  var panels=scope.querySelectorAll('.tab-panel');
  tabs.forEach(function(t){
    t.addEventListener('click',function(){
      var target=t.getAttribute('data-target');
      tabs.forEach(function(x){x.classList.toggle('active',x===t);});
      panels.forEach(function(p){
        p.classList.toggle('active',p.getAttribute('data-tab')===target);
      });
    });
  });
  scope.querySelectorAll('.cell').forEach(function(c){
    c.addEventListener('click',function(){
      if(c.classList.contains('future'))return;
      c.classList.toggle('done');
      c.classList.toggle('delayed');
    });
  });
})();
"""


def main() -> None:
    """Build the artifact HTML from data.json and write it to disk."""
    data = load_data()
    OUT_PATH.write_text(build_html(data), encoding="utf-8")
    tasks = sum(len(g["tasks"]) for g in data["groups"])
    print(f"built {OUT_PATH.relative_to(ROOT)} — {len(data['groups'])} groups, {tasks} tasks")


if __name__ == "__main__":
    main()
