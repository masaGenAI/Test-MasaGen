"""担当範囲の主な出典ホストに、この環境から届くかを点検の前に確かめる。

usage: python3 -I reach.py --areas a,b,...   |   python3 -I reach.py --hosts h1,h2,...
  届かないホストが多い範囲に担当者を出しても、何も確かめられずに終わる（実際に2範囲がそうなった）。
  「プロキシが拒否」はこの環境の許可リストの外という意味で、回避しない。未確認として持ち越すか、
  利用者に許可の追加を頼む。「サイトが拒否」（403 など）はボット確認の可能性があり、これも回避しない。
"""
from __future__ import annotations

import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402


def probe(host: str) -> tuple[str, str]:
    """1ホストを確かめ、(区分, 詳細) を返す。区分は ok / proxy / site / unknown。"""
    try:
        r = subprocess.run(["curl", "-sS", "-o", "/dev/null", "-m", "15", "-w", "%{http_code}", f"https://{host}/"],
                           capture_output=True, text=True, timeout=25)
    except subprocess.TimeoutExpired:
        return "unknown", "応答なし"
    code, err = r.stdout.strip()[-3:], r.stderr.strip()
    if "CONNECT tunnel failed" in err or "response 403" in err or "response 407" in err:
        return "proxy", "プロキシが拒否（許可リストの外）"
    if code.isdigit() and code != "000":
        if code in ("401", "403", "429"):
            return "site", f"サイトが拒否（{code}。ページによっては開ける）"
        return "ok", code
    return "unknown", (err.splitlines()[-1][:80] if err else "応答なし")


def main() -> None:
    """結果を範囲ごとに書く。届かないホストが半分を超える範囲には印を付ける。"""
    a = sys.argv[1:]
    spec = common.areas()
    if "--hosts" in a:
        groups = {"(指定)": a[a.index("--hosts") + 1].split(",")}
    else:
        keys = a[a.index("--areas") + 1].split(",") if "--areas" in a else [x["key"] for x in spec["areas"]]
        groups = {x["key"]: x["hosts"] for x in spec["areas"] if x["key"] in keys}
    seen: dict[str, tuple[str, str]] = {}
    for key, hosts in groups.items():
        bad = []
        for h in hosts:
            if h not in seen:
                seen[h] = probe(h)
            if seen[h][0] != "ok":
                bad.append(f"{h}＝{seen[h][1]}")
        blocked = sum(1 for h in hosts if seen[h][0] == "proxy")
        mark = "  ← 出典の半分以上に届かない。許可を足すまで見送る" if hosts and blocked * 2 >= len(hosts) else ""
        print(f"{key}: 届く {len(hosts) - len(bad)} / {len(hosts)}{mark}")
        for b in bad:
            print("   " + b)
    proxy = sorted(h for h, v in seen.items() if v[0] == "proxy")
    if proxy:
        print("許可リストの外のホスト: " + ", ".join(proxy))


if __name__ == "__main__":
    main()
