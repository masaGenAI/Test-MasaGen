"""どの担当範囲が点検の時期に来ているかを出す（台帳 data/techhub-freshness/ledger.json と areas.json の周期から）。

usage: python3 -I due.py [--today YYYY-MM-DD] [--all] [--plan N]
  既定は「期限が来ている範囲」だけ。--all で全範囲。
  --plan N は、今回回す範囲を最大 N 個選んで4つずつの組にして出す（定期実行用。月次の範囲を先に、
  残りの枠に四半期の範囲を期限の古い順に入れる。入り切らなかった範囲は次回に回る）。
  前回、出典のホストに届かず確かめられなかった範囲は「未了」として先頭に出す。
"""
from __future__ import annotations

import datetime as dt
import os
import re
import subprocess
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
    # 古いと確かめた語の残り（residue.py）も並べる。期限前でも、残りが多い範囲は回す価値が高い
    left: dict[str, int] = {}
    r = subprocess.run([sys.executable, "-I", os.path.join(common.HERE, "residue.py")], capture_output=True, text=True)
    for m in re.finditer(r"^([\w-]+): 計 (\d+)", r.stdout, re.M):
        left[m.group(1)] = int(m.group(2))
    rows.sort(key=lambda r: -r[0])
    due = [r for r in rows if r[0] >= 0]
    print(f"今日 {today}。期限が来ている範囲 {len(due)} / 全 {len(rows)}")
    for over, ar, rec, state, n_carry in (rows if "--all" in a else due):
        note = []
        if n_carry:
            note.append(f"持ち越しの未確認 {n_carry}件")
        if left.get(ar["key"]):
            note.append(f"古い語の残り {left[ar['key']]}か所")
        if rec.get("blocked_hosts"):
            note.append("届かなかったホスト: " + ", ".join(rec["blocked_hosts"][:6]))
        last = rec.get("last_checked") or rec.get("last_attempt") or "-"
        print(f"  {ar['key']:<22} {ar['cadence']:<9} 前回 {last:<10} {state:<8} {ar['title']}" + ("  ／ " + "；".join(note) if note else ""))
    many = [f"{k}（{n}）" for k, n in sorted(left.items(), key=lambda kv: -kv[1]) if n >= 20 and k not in {r[1]["key"] for r in due}]
    if many:
        print("期限前だが、古い語の残りが多い範囲（回す候補）: " + "、".join(many))
    if "--plan" in a:
        cap = int(a[a.index("--plan") + 1])
        # 前回、出典に届かず未了だった範囲は枠に数えない（届かないままなら見送るだけなので）
        held = [r[1]["key"] for r in due if r[2].get("status") == "blocked"]
        first = [r[1]["key"] for r in due if r[1]["cadence"] == "monthly" and r[1]["key"] not in held]
        rest = [r[1]["key"] for r in due if r[1]["cadence"] != "monthly" and r[1]["key"] not in held]
        plan = (first + rest)[:cap]
        print(f"今回回す範囲（最大 {cap}。月次を先に、四半期は期限の古い順）: {len(plan)} 範囲")
        for i in range(0, len(plan), 4):
            print(f"  組{i // 4 + 1}: " + ",".join(plan[i:i + 4]))
        if held:
            print("  前回未了（prep.py で出典に届くと出たら組に足す。届かなければ見送る）: " + ", ".join(held))
        # 前回は届かなかったホストに、今は届くか。届くなら、その範囲の持ち越しの未確認を確かめ直せる
        import reach  # noqa: E402  （ネットワークを使うので --plan のときだけ読み込む）
        seen: dict[str, bool] = {}
        for _, ar, rec, _, n_carry in rows:
            if not n_carry or ar["key"] in plan or ar["key"] in held:
                continue
            hosts = rec.get("proxy_blocked", [])
            opened = []
            for h in hosts[:8]:
                if h not in seen:
                    seen[h] = reach.probe(h)[0] == "ok"
                if seen[h]:
                    opened.append(h)
            if opened:
                print(f"  届くようになった出典がある（持ち越しの未確認 {n_carry}件を確かめ直す。組に足す）: {ar['key']} ← " + ", ".join(opened))
        left_out = (first + rest)[cap:]
        if left_out:
            print("  次回に回る: " + ", ".join(left_out))
        return
    if due:
        keys = {r[1]["key"] for r in due}
        print("回す順（1回に1組。使用量の上限に当たらないよう組ごとに区切る）:")
        for b in spec.get("batches", []):
            hit = [k for k in b if k in keys]
            if hit:
                print("  - " + ", ".join(hit))


if __name__ == "__main__":
    main()
