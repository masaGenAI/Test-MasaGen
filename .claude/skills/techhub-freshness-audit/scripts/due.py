"""どの担当範囲が点検の時期に来ているかを出す（台帳 data/techhub-freshness/ledger.json と areas.json の周期から）。

usage: python3 -I due.py [--today YYYY-MM-DD] [--all]
  既定は「期限が来ている範囲」だけ。--all で全範囲。
  前回、出典のホストに届かず確かめられなかった範囲は「未了」として先頭に出す。
"""
from __future__ import annotations

import datetime as dt
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402


def main() -> None:
    """期限の一覧を標準出力に書く。"""
    a = sys.argv[1:]
    today = dt.date.fromisoformat(a[a.index("--today") + 1]) if "--today" in a else dt.date.today()
    spec = common.areas()
    ledger = common.load_json(common.LEDGER, {"areas": {}})
    carried = common.load_json(common.UNVERIFIED, [])
    rows = []
    for ar in spec["areas"]:
        rec = ledger["areas"].get(ar["key"], {})
        days = spec["cadence_days"][ar["cadence"]]
        last = rec.get("last_checked")
        if rec.get("status") == "blocked" or not last:
            over, state = 10**6, "未了" if rec.get("status") == "blocked" else "未点検"
        else:
            over = (today - dt.date.fromisoformat(last)).days - days
            state = f"{over}日超過" if over >= 0 else f"あと{-over}日"
        n_carry = sum(1 for u in carried if u.get("area") == ar["key"])
        rows.append((over, ar, rec, state, n_carry))
    rows.sort(key=lambda r: -r[0])
    due = [r for r in rows if r[0] >= 0]
    print(f"今日 {today}。期限が来ている範囲 {len(due)} / 全 {len(rows)}")
    for over, ar, rec, state, n_carry in (rows if "--all" in a else due):
        note = []
        if n_carry:
            note.append(f"持ち越しの未確認 {n_carry}件")
        if rec.get("blocked_hosts"):
            note.append("届かなかったホスト: " + ", ".join(rec["blocked_hosts"][:6]))
        last = rec.get("last_checked") or rec.get("last_attempt") or "-"
        print(f"  {ar['key']:<22} {ar['cadence']:<9} 前回 {last:<10} {state:<8} {ar['title']}" + ("  ／ " + "；".join(note) if note else ""))
    if due:
        keys = {r[1]["key"] for r in due}
        print("回す順（1回に1組。使用量の上限に当たらないよう組ごとに区切る）:")
        for b in spec.get("batches", []):
            hit = [k for k in b if k in keys]
            if hit:
                print("  - " + ", ".join(hit))


if __name__ == "__main__":
    main()
