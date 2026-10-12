"""AIフォーサイトの情報源ライブラリを点検する（月次メンテナンス）。

全リンクを開き、確認状態（ok / reachable / pending / unverified）と点検日を更新する。
移転（別ホストへのリダイレクトを含む）は移転先の URL に書き換え、変化を一覧で表示する。
  python3 nova-app/scripts/foresight_linkcheck.py           # 点検して結果だけ表示
  python3 nova-app/scripts/foresight_linkcheck.py --apply   # データを更新し、点検の履歴に1行追加
"""
from __future__ import annotations

import concurrent.futures as cf
import datetime as dt
import html
import json
import re
import subprocess
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parents[1] / "src/data"
SRC = DATA / "foresight-sources.json"
BRIEFS = DATA / "foresight-briefs.json"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"


def check(url: str, http1: bool = False) -> dict:
    """1件のリンクを開き、HTTP 状態・最終 URL・タイトル・判定を返す。"""
    cmd = ["curl", "-sS", "-L", "--max-redirs", "8", "--max-time", "30", "-A", UA,
           "-H", "Accept-Language: ja,en;q=0.8", "-o", "-", "-w", "\n@@%{http_code} %{url_effective}", url]
    if http1:
        cmd.insert(1, "--http1.1")
    p = subprocess.run(cmd, capture_output=True, timeout=45)
    out = p.stdout.decode("utf-8", "replace")
    err = p.stderr.decode("utf-8", "replace")
    m = re.search(r"\n@@(\d{3}) (\S*)$", out)
    code, final = (int(m.group(1)), m.group(2)) if m else (0, url)
    t = re.search(r"<title[^>]*>(.*?)</title>", out[: m.start()] if m else "", re.S | re.I)
    title = html.unescape(re.sub(r"\s+", " ", t.group(1))).strip()[:120] if t else ""
    if "CONNECT tunnel failed" in err:
        kind = "pending"  # ネットワーク設定で未許可のドメイン
    elif 200 <= code < 300:
        kind = "ok"
    elif code in (400, 401, 403, 429, 503):
        kind = "reachable"  # サイトは応答するが自動アクセスを制限
    elif code == 0 and not http1:
        return check(url, True)
    else:
        kind = "unverified"
    return {"code": code, "final": final, "title": title, "kind": kind}


def main() -> int:
    """点検を実行し、--apply ならデータと履歴を更新する。"""
    sources = json.loads(SRC.read_text(encoding="utf-8"))
    with cf.ThreadPoolExecutor(12) as ex:
        results = list(ex.map(lambda s: check(s["url"]), sources))
    today = dt.date.today().isoformat()
    changes = []
    for s, r in zip(sources, results):
        new_url = r["final"] if r["kind"] in ("ok", "pending") and r["final"].rstrip("/") != s["url"].rstrip("/") else s["url"]
        if r["kind"] != s["status"] or new_url != s["url"]:
            changes.append(f"{s['id']} {s['name'][0]}: {s['status']} -> {r['kind']}" + (f"（移転 {new_url}）" if new_url != s["url"] else "") + f" [HTTP {r['code']}]")
        s["status"], s["url"], s["checked"] = r["kind"], new_url, today
    counts = {k: sum(s["status"] == k for s in sources) for k in ("ok", "reachable", "pending", "unverified")}
    print(f"点検 {len(sources)}件: {counts}")
    print("変化 %d件" % len(changes))
    for c in changes:
        print("  " + c)
    if "--apply" in sys.argv:
        SRC.write_text(json.dumps(sources, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        briefs = json.loads(BRIEFS.read_text(encoding="utf-8"))
        meta = briefs["meta"]
        meta["checked"] = today
        nxt = (dt.date.today().replace(day=1) + dt.timedelta(days=32)).replace(day=1)
        meta["next"] = nxt.isoformat()
        meta["log"].insert(0, {"d": today,
                               "ja": f"全{len(sources)}件を自動点検。変化 {len(changes)}件（確認済み {counts['ok']}・応答あり {counts['reachable']}・未確認 {counts['pending'] + counts['unverified']}）。",
                               "en": f"Checked all {len(sources)} links; {len(changes)} changed (verified {counts['ok']}, reachable {counts['reachable']}, pending {counts['pending'] + counts['unverified']})."})
        del meta["log"][12:]
        BRIEFS.write_text(json.dumps(briefs, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
