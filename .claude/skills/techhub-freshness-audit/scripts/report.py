"""点検の結果（担当者・検算者の結果と適用の記録）を、報告書と台帳にまとめる。

usage: python3 -I report.py <作業フォルダ> [--date YYYY-MM-DD] [--no-ledger]
  読むもの:  <作業フォルダ>/out/check-<範囲>.json、verify-<範囲>-<n>.json、applied.json
  書くもの:  <作業フォルダ>/report.md（直した点／適用できなかった置換／退けた修正案／未確認／見た範囲）
            data/techhub-freshness/ledger.json   （範囲ごとの前回の点検日と結果。due.py が読む）
            data/techhub-freshness/unverified.json（未確認の持ち越し。次の点検で最初に確かめ直す）
  出典に届かず何も確かめられなかった範囲は「未了」と記録し、点検日は進めない（次回も期限切れのまま出る）。
  --no-ledger は報告書だけ作る（適用前の下見に使う）。
"""
from __future__ import annotations

import datetime as dt
import glob
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402


def one_line(s: object, n: int = 220) -> str:
    """改行をつぶして n 字に切る。"""
    t = " ".join(str(s or "").split())
    return t if len(t) <= n else t[:n] + "…"


def main() -> None:
    """報告書と台帳を書く。"""
    a = sys.argv[1:]
    if not a or a[0].startswith("--"):
        raise SystemExit(__doc__)
    work = a[0]
    date = a[a.index("--date") + 1] if "--date" in a else dt.date.today().isoformat()
    out = os.path.join(work, "out")
    spec = common.areas()
    title = {x["key"]: x["title"] for x in spec["areas"]}
    order = [x["key"] for x in spec["areas"]]
    checks = {}
    for p in glob.glob(os.path.join(out, "check-*.json")):
        d = common.load_json(p)
        checks[d.get("area") or os.path.basename(p)[6:-5]] = d
    verdicts: dict[tuple[str, int], dict] = {}
    for p in glob.glob(os.path.join(out, "verify-*.json")):
        v = common.load_json(p)
        for r in v.get("results", []):
            verdicts[(v.get("area"), r.get("index"))] = r
    applied: dict[tuple[str, int], list[str]] = {}
    for x in common.load_json(os.path.join(out, "applied.json"), []):
        applied.setdefault((x["area"], x["index"]), []).append(x["status"])

    md, total = [], {"fixed": 0, "recheck": 0, "partial": 0, "rejected": 0, "unverified": 0, "pending": 0}
    ledger = common.load_json(common.LEDGER, {"areas": {}, "runs": []})
    carried = common.load_json(common.UNVERIFIED, [])
    first_seen = {(u.get("area"), (u.get("current_text") or "")[:80]): u.get("first_seen") for u in carried}
    run_areas = []
    for key in sorted(checks, key=lambda k: order.index(k) if k in order else 999):
        d = checks[key]
        fixed, partial, rejected, pending = [], [], [], []
        for i, f in enumerate(d.get("findings", [])):
            v = verdicts.get((key, i))
            st = applied.get((key, i), [])
            if not v:
                pending.append((f, "検算がまだ"))
            elif v["verdict"] == "rejected":
                rejected.append((f, v))
            elif not st:
                pending.append((f, "検算は通ったが、まだ当てていない"))
            elif "conflict" in st:
                partial.append((f, v, st))
            else:
                fixed.append((f, v))
        unv = d.get("unverified", [])
        blocked = bool(d.get("blocked")) or (not d.get("findings") and not d.get("checked_ok") and bool(d.get("blocked_hosts")))
        md.append(f"\n## {title.get(key, key)}（{key}）" + ("　※出典に届かず未了" if blocked else ""))
        md.append(f"直した {len(fixed)}件／適用できず {len(partial)}件／退けた {len(rejected)}件／未確認 {len(unv)}件"
                  + (f"／未処理 {len(pending)}件" if pending else ""))
        if fixed:
            md.append("\n### 直した点")
            for f, v in fixed:
                fact = v.get("verified_fact") or f.get("verified_fact")
                url = v.get("source_url") or f.get("source_url")
                flag = "　**要再確認**（一次情報で確かめ切れていない）" if "要再確認" in str(f.get("confidence")) else ""
                if flag:
                    total["recheck"] += 1
                md.append(f"- 【{f.get('tab')} › {one_line(f.get('where'), 60)}】{one_line(f.get('problem'))}{flag}")
                md.append(f"  - 確かめた事実：{one_line(fact, 300)}")
                md.append(f"  - 出典：{url}（{f.get('source_date') or '日付不明'}）" + ("　／検算で文面を直した" if v["verdict"] == "revised" else ""))
        if partial:
            md.append("\n### 適用できなかった置換（手で確かめて直す）")
            for f, v, st in partial:
                md.append(f"- 【{f.get('tab')}】{one_line(f.get('problem'))}（{st.count('conflict')}/{len(st)} か所が不一致）")
        if pending:
            md.append("\n### 未処理")
            for f, why in pending:
                md.append(f"- 【{f.get('tab')}】{one_line(f.get('problem'))}（{why}）")
        if rejected:
            md.append("\n### 検算で退けた修正案（アプリは書き換えていない）")
            for f, v in rejected:
                md.append(f"- 【{f.get('tab')}】「{one_line(f.get('current_text'), 90)}」")
                md.append(f"  - 退けた理由：{one_line(v.get('reason'), 300)}")
        if unv:
            md.append("\n### 未確認（アプリは書き換えていない）")
            for u in unv:
                md.append(f"- 【{u.get('tab')}】「{one_line(u.get('current_text'), 90)}」")
                md.append(f"  - 懸念：{one_line(u.get('concern'), 260)}")
                md.append(f"  - 確かめられなかった理由：{one_line(u.get('why'), 260)}")
        ok = d.get("checked_ok", [])
        if ok:
            md.append(f"\n### 確かめて今も正しかった記述（{len(ok)}件）")
            for c in ok[:15]:
                md.append(f"- 【{c.get('tab')}】{one_line(c.get('claim'), 150)}" + (f"（{c.get('source_url')}）" if c.get("source_url") else ""))
        md.append("\n### 見た範囲・見ていない範囲")
        md.append(one_line(d.get("coverage"), 1500))
        if d.get("blocked_hosts"):
            md.append("届かなかったホスト：" + ", ".join(d["blocked_hosts"]))
        for k, n in (("fixed", len(fixed)), ("partial", len(partial)), ("rejected", len(rejected)), ("unverified", len(unv)), ("pending", len(pending))):
            total[k] += n
        rec = dict(ledger["areas"].get(key, {}))
        rec.update({"status": "blocked" if blocked else "checked", "last_attempt": date, "fixed": len(fixed), "partial": len(partial),
                    "rejected": len(rejected), "unverified": len(unv), "checked_ok": len(ok),
                    "blocked_hosts": d.get("blocked_hosts", []), "coverage": one_line(d.get("coverage"), 600)})
        if not blocked:
            rec["last_checked"] = date
        ledger["areas"][key] = rec
        carried = [u for u in carried if u.get("area") != key]
        for u in unv:
            carried.append({"area": key, "tab": u.get("tab"), "current_text": u.get("current_text"), "concern": u.get("concern"),
                            "why": u.get("why"), "first_seen": first_seen.get((key, (u.get("current_text") or "")[:80])) or date, "last_tried": date})
        run_areas.append(key)
    head = [f"# TechHub 鮮度点検の報告（{date}）", "",
            "範囲：" + "、".join(run_areas), "",
            f"- 直した：{total['fixed']}件（うち要再確認 {total['recheck']}件）",
            f"- 適用できず手当てが要る：{total['partial']}件",
            f"- 検算で退けた：{total['rejected']}件",
            f"- 未確認（次回へ持ち越し）：{total['unverified']}件"]
    if total["pending"]:
        head.append(f"- 未処理（検算または適用がまだ）：{total['pending']}件")
    head.append("")
    head.append("「直した」は、出典のページを開いて確かめ、別の担当が検算した修正だけ。未確認と退けた修正案はアプリを書き換えていない。")
    with open(os.path.join(work, "report.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(head + md) + "\n")
    print("\n".join(head[2:-2]))
    print("→ " + os.path.join(work, "report.md"))
    if "--no-ledger" not in a:
        ledger.setdefault("runs", []).append({"date": date, "areas": run_areas, **{k: total[k] for k in ("fixed", "partial", "rejected", "unverified")}})
        common.save_json(common.LEDGER, ledger)
        common.save_json(common.UNVERIFIED, carried)
        print(f"台帳を更新: {os.path.relpath(common.LEDGER, common.ROOT)}（{len(run_areas)} 範囲）、持ち越しの未確認 {len(carried)}件")


if __name__ == "__main__":
    main()
