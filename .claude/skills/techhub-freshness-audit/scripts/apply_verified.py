"""検算を通った置換（verify-<範囲>-<n>.json の confirmed / revised）を原稿に当てる。

usage: python3 -I apply_verified.py <作業フォルダ> [--areas a,b,...] [--dry-run]
  - old が期待回数ちょうどあれば置換する。old が無く new が既にあれば「適用済み」。それ以外は「不一致」で飛ばす
    （別の修正と重なって old が変わったときに起きる。飛ばした分は手で確かめて直す）
  - 1つの修正案の置換が一部だけ当たった場合は「一部だけ」と出す（日本語だけ直って英語が古い、を見逃さない）
  - .json の原稿は、当てたあと JSON として読めることを確かめてから書く。読めなければ何も書かずに止まる
  - 結果は <作業フォルダ>/out/applied.json に残す（report.py が読む）
  --dry-run は書き込まずに結果だけ出す。
"""
from __future__ import annotations

import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common  # noqa: E402


def main() -> None:
    """置換を当て、件数と不一致を出す。"""
    a = sys.argv[1:]
    if not a or a[0].startswith("--"):
        raise SystemExit(__doc__)
    work = a[0]
    only = a[a.index("--areas") + 1].split(",") if "--areas" in a else None
    dry = "--dry-run" in a
    out = os.path.join(work, "out")
    text: dict[str, str] = {}

    def get(rel: str) -> str:
        if rel not in text:
            with open(os.path.join(common.ROOT, rel), encoding="utf-8") as f:
                text[rel] = f.read()
        return text[rel]

    log, stats = [], {"applied": 0, "already": 0, "conflict": 0}
    files = sorted(glob.glob(os.path.join(out, "verify-*.json")),
                   key=lambda p: [int(x) if x.isdigit() else x for x in re.split(r"(\d+)", os.path.basename(p))])
    for path in files:
        v = common.load_json(path)
        area = v.get("area")
        if only and area not in only:
            continue
        base = common.load_json(os.path.join(out, f"check-{area}.json"), {}).get("findings", [])
        for r in v.get("results", []):
            if r.get("verdict") not in ("confirmed", "revised"):
                continue
            i = r.get("index")
            reps = r.get("replacements")
            if reps is None and isinstance(i, int) and i < len(base):
                reps = base[i].get("replacements", [])
            got = []
            for rep in reps or []:
                f, old, new, cnt = rep["file"], rep["old"], rep["new"], int(rep.get("count", 1) or 1)
                if not f.startswith(common.ALLOWED) or ".." in f:
                    raise SystemExit(f"直してよい原稿ではない: {f}")
                t = get(f)
                n, has_new = common.free_count(t, old, new)
                if n == cnt and n > 0:
                    text[f] = common.apply_one(t, old, new)
                    status = "applied"
                elif n == 0 and has_new:
                    status = "already"
                else:
                    status = "conflict"
                stats[status] += 1
                got.append(status)
                log.append({"area": area, "index": i, "verdict": r["verdict"], "status": status, "file": f,
                            "found": n, "count": cnt, "old": old[:160], "new": new[:160]})
            if "conflict" in got and len(set(got)) > 1:
                print(f"  一部だけ: {area} index {i}（{got.count('conflict')}/{len(got)} が不一致）")
    for f, t in text.items():
        if f.endswith(".json"):
            try:
                json.loads(t)
            except json.JSONDecodeError as e:
                raise SystemExit(f"{f} が JSON として読めなくなる（{e}）。何も書かずに止めた")
    if not dry:
        for f, t in text.items():
            with open(os.path.join(common.ROOT, f), "w", encoding="utf-8") as fh:
                fh.write(t)
        prev = common.load_json(os.path.join(out, "applied.json"), [])
        keep = [x for x in prev if not any(x["area"] == y["area"] and x["index"] == y["index"] and x["file"] == y["file"] and x["old"] == y["old"] for y in log)]
        common.save_json(os.path.join(out, "applied.json"), keep + log)
    print(("（書き込みなし）" if dry else "") + f"置換 {stats['applied']}、適用済み {stats['already']}、不一致 {stats['conflict']}")
    for x in log:
        if x["status"] == "conflict":
            print(f"  不一致 {x['area']} index {x['index']} {x['file']}: old が {x['found']} 回（期待 {x['count']}）: {x['old'][:70]!r}")


if __name__ == "__main__":
    main()
