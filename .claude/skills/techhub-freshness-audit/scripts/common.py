"""鮮度点検の道具が共通で使う場所・範囲・読み書き。

どの道具も `python3 -I` で動かす想定（-I ではスクリプトの場所が import 経路に入らないので、
各スクリプトの先頭で sys.path にこのフォルダを足している）。
"""
from __future__ import annotations

import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL = os.path.dirname(HERE)
ROOT = os.path.abspath(os.path.join(SKILL, "..", "..", ".."))
JSX = "nova-app/src/ProjectNova.jsx"
START_MARK = "// ================= MegaTechHubModule"
NEXT_MODULE = re.compile(r"^// ================= \w+Module")
# 置換してよい原稿。生成物（dist、govdojo から作る jsx の定数）はここに入れない。
ALLOWED = (JSX, "nova-app/src/data/", "data/govdojo/")
DATA_DIR = os.path.join(ROOT, "data", "techhub-freshness")
LEDGER = os.path.join(DATA_DIR, "ledger.json")
UNVERIFIED = os.path.join(DATA_DIR, "unverified.json")
AREAS = os.path.join(SKILL, "references", "areas.json")
DECL = re.compile(r"^(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)")


def load_json(path: str, default=None):
    """JSON を読む。ファイルが無ければ default を返す。"""
    if not os.path.exists(path):
        return default
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_json(path: str, obj) -> None:
    """JSON を書く（日本語はそのまま、末尾に改行）。"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
        f.write("\n")


def areas() -> dict:
    """範囲の定義（references/areas.json）を返す。"""
    return load_json(AREAS)


def techhub_lines() -> tuple[int, list[str]]:
    """TechHub の原稿の行を返す。戻り値は (先頭行の行番号, 行の配列)。

    行番号は固定で持たない（原稿は日々伸びる）。前後のモジュールの目印コメントから毎回求める。
    """
    with open(os.path.join(ROOT, JSX), encoding="utf-8") as f:
        lines = f.read().split("\n")
    start = next((i for i, s in enumerate(lines) if s.startswith(START_MARK)), None)
    if start is None:
        raise SystemExit("TechHub の先頭の目印が見つからない: " + START_MARK)
    end = next((i for i in range(start + 1, len(lines)) if NEXT_MODULE.match(lines[i])), len(lines))
    return start + 1, lines[start:end]


def decls(first: int, lines: list[str]) -> list[tuple[int, str, int]]:
    """行頭の宣言（const / function など）を (行番号, 名前, 次の宣言までの文字数) で返す。"""
    found = [(i, m.group(1)) for i, s in enumerate(lines) if (m := DECL.match(s))]
    out = []
    for n, (i, name) in enumerate(found):
        j = found[n + 1][0] if n + 1 < len(found) else len(lines)
        out.append((first + i, name, sum(len(s) + 1 for s in lines[i:j])))
    return out


_MASK = "\x00\x01FRESH\x01\x00"


def free_count(text: str, old: str, new: str) -> tuple[int, bool]:
    """old が原稿に何回あるかと、new が既にあるかを返す。

    言い足し型の置換（new の中に old がそのまま入っている）は、当てたあとも old が見つかる。
    それを「まだ当たっていない」と数えると二重に当ててしまうので、new の部分を除いて数える。
    """
    if old in new and new in text:
        return text.replace(new, _MASK).count(old), True
    return text.count(old), new in text


def apply_one(text: str, old: str, new: str) -> str:
    """old を new に置き換える（既に new になっている箇所は触らない）。"""
    if old in new and new in text:
        return text.replace(new, _MASK).replace(old, new).replace(_MASK, new)
    return text.replace(old, new)


def areas_of(name: str, spec: dict) -> list[str]:
    """定数名から担当範囲を引く（複数の範囲が分担している定数は全部返す）。

    areas.json の consts（完全一致、または末尾 * の前方一致）のうち、いちばん長く一致した指定を採る。
    翻訳・共通文言（shared_consts）は ["(共通)"] を返す。
    """
    if name in spec.get("shared_consts", []):
        return ["(共通)"]
    hits: dict[str, int] = {}
    for a in spec["areas"]:
        for pat in a.get("consts", []):
            if name.startswith(pat[:-1]) if pat.endswith("*") else name == pat:
                hits[a["key"]] = max(hits.get(a["key"], -1), len(pat))
    if not hits:
        return []
    top = max(hits.values())
    return [k for k, v in hits.items() if v == top]
