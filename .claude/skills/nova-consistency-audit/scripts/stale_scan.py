#!/usr/bin/env python3
"""手で書かれた件数・社数・タブ数などを、facts.py の実数と突き合わせる。

出力は3種類:
  MISMATCH  既知の種類の主張で、実数と食い違うもの（直す対象）
  OK        既知の種類の主張で、実数と一致したもの（参考）
  REVIEW    数字＋単位の主張だが、自動では実数と対応づけられないもの（目で判断する）

問題バンクの本文（1問1行の巨大な行）は、書かれている数字が「問題の中身」なので対象外にする。
AIの業界ニュースに出てくる「16社」のような数字まで拾うと、本当に直すべき箇所が埋もれるため。

使い方（リポジトリのルートで）:
  python3 .claude/skills/nova-consistency-audit/scripts/stale_scan.py
  python3 .claude/skills/nova-consistency-audit/scripts/stale_scan.py --review   # REVIEW も全部出す
  # 過去の版に対して試す（この検査が古い記載を拾えるかの確認に使う）
  git show <rev>:nova-app/src/ProjectNova.jsx > /tmp/old.jsx
  python3 .../stale_scan.py --jsx /tmp/old.jsx
"""
import json
import re
import signal
import subprocess
import sys

signal.signal(signal.SIGPIPE, signal.SIG_DFL)  # head などに渡しても BrokenPipe で落ちないように
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = Path.cwd()


def arg(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


JSX = Path(arg("--jsx", ROOT / "nova-app/src/ProjectNova.jsx"))
HTML = [ROOT / "nova-app/public/booksummaryhub.html",
        ROOT / "nova-app/public/learning-tracker.html",
        ROOT / "nova-app/public/anything-memo.html"]

facts = json.loads(subprocess.run([sys.executable, str(HERE / "facts.py"), "--json"],
                                  capture_output=True, text=True, check=True, cwd=ROOT).stdout)

num = lambda x: int(x.replace(",", ""))

# (名前, 正規表現, facts のキー, 文脈の条件) — 数字は1番目のグループ
RULES = [
    ("企業研究の社数", r"(?:企業研究|主要)\s*(\d+)\s*社", "TechHub.companies", None),
    ("企業研究の社数", r"(\d+)\s*社の組織", "TechHub.companies", None),
    ("TechHubのタブ数", r"(\d+)\s*タブ", "TechHub.tabs", r"TechHub|NOVA_STATIONS|tagJa"),
    ("flierの冊数", r"flier\s*(\d[\d,]*)\s*冊", "Book.flier", None),
    ("flierの冊数", r"(\d[\d,]*)\s*冊(?:（1冊=1タスク）)", "Book.flier", None),
    ("YouTubeの件数", r"YouTube\s*(\d[\d,]*)\s*件", "Book.youtube", None),
    ("noteの件数", r"note\s*(\d[\d,]*)\s*件", "Book.note", None),
    ("用語辞典の問題数", r"用語(?:辞典)?\s*(\d[\d,]*)", "MCQS.glossary(用語：*)", r"用語辞典|用語\d"),
    ("技術道場の問題数", r"クイズ\s*[—-]?\s*全?\s*(\d[\d,]*)\s*問", "MCQS.total", r"技術道場|MCQS|qz_title"),
    ("技術道場のテーマ数", r"(\d+)\s*テーマ", "MCQS.themes", r"qz_intro|Key numbers"),
    # 分野・資格は「カテゴリ別の3分野」「9資格の重なりマップ」のような部分集合の数も多いので、
    # ハブ全体の総数として書かれる形だけを見る。
    ("言語学の分野数", r"\d+\s*カテゴリ\s*[・·]\s*(\d+)\s*分野", "Linguistics.fields", None),
    ("言語学の分野数", r"Linguistics[^\n]{0,60}?[\"'`](\d+)\s*分野", "Linguistics.fields", None),
    ("資格の数", r"(\d+)\s*資格\s*[＋+]\s*横断模試", "Certification.certs(横断模試を除く)", None),
    ("ガバナンス道場の問題数", r"道場\s*[（(]\s*(\d[\d,]*)\s*問", "GOVDOJO_BANK", r"ガバナンス|道場"),
    ("Slalom道場の問題数", r"(\d[\d,]*)\s*問", "SLALOM_BANK", r"Slalom|スキルクイズ"),
    ("実務論点マップの問題数", r"(\d[\d,]*)\s*問", "NOTEISSUE_BANK", r"論点クイズ|実務論点マップ"),
    ("AIアーキテクト道場の問題数", r"ACAD[^\n]{0,40}?(\d[\d,]*)\s*問", "ACAD_QUIZ", None),
]
UNIT = re.compile(r"(\d[\d,]*)\s*(問|冊|件|社|タブ|分野|セクション|資格|項目)")


def is_data_line(line):
    """問題や記事の本文の行か。長い行でも、計画表などの設定データは対象に残す。"""
    t = line.lstrip()
    if t.startswith(('{"d"', '{"id"', '{ cat:', '{"cat"', '{d:', '{"q', '{"qJa"', '{"j"', '{ d:')):
        return True
    if len(line) > 3000:
        # 問題文・記事本文を持つ行か（計画表の "q": 1 のような数値は数えない）
        qs = len(re.findall(r'(?:"q"|\bq)\s*:\s*"', line)) + len(re.findall(r'"(?:oneLiner|claim|t|w)"\s*:\s*"', line))
        return qs >= 5
    return False


# Book-Summary の出典を並べて書いている箇所（ポータルのタグなど）が、実在する出典を全部挙げているか。
SOURCE_WORDS = {"flier": "flier", "kindle": "Kindle", "yt": "YouTube", "note": "note"}


def source_list_gaps(line):
    if not ("flier" in line and "YouTube" in line):
        return []
    need = [SOURCE_WORDS[x] for x in facts.get("Book.sources", []) if x in SOURCE_WORDS and x != "kindle"]
    return [w for w in need if w not in line]


def scan(path, label):
    out = []
    lines = path.read_text(encoding="utf-8").split("\n")
    for n, line in enumerate(lines, 1):
        if is_data_line(line):
            continue
        hit_spans = []
        for name, rx, key, ctx in RULES:
            if ctx and not re.search(ctx, line):
                continue
            for m in re.finditer(rx, line):
                v = num(m.group(1))
                truth = facts.get(key)
                # 単独の「N問」系は、その数が他の実数（領域別など）と一致するなら主張ではないとみなす
                if key in ("SLALOM_BANK", "NOTEISSUE_BANK") and v < 50:
                    continue
                status = "OK" if v == truth else "MISMATCH"
                out.append((status, label, n, name, m.group(0), truth, line.strip()[:160]))
                hit_spans.append(m.span())
        for w in source_list_gaps(line):
            out.append(("MISMATCH", label, n, "出典の列挙の漏れ", f"{w} が挙がっていない", None, line.strip()[:160]))
        for m in UNIT.finditer(line):
            if any(a <= m.start() < b for a, b in hit_spans):
                continue
            out.append(("REVIEW", label, n, "数字＋単位", m.group(0), None, line.strip()[:160]))
    return out


rows = scan(JSX, "ProjectNova.jsx")
for h in HTML:
    if h.exists():
        rows += scan(h, h.name)

show_review = "--review" in sys.argv
order = {"MISMATCH": 0, "OK": 1, "REVIEW": 2}
counts = {k: sum(1 for r in rows if r[0] == k) for k in order}
print(f"MISMATCH {counts['MISMATCH']} / OK {counts['OK']} / REVIEW {counts['REVIEW']}\n")
for r in sorted(rows, key=lambda r: (order[r[0]], r[1], r[2])):
    if r[0] == "REVIEW" and not show_review:
        continue
    status, label, n, name, hit, truth, ctx = r
    extra = f"  → 実数 {truth}" if truth is not None else ""
    print(f"[{status}] {label}:{n}  {name}: 「{hit}」{extra}\n      {ctx}")
if not show_review and counts["REVIEW"]:
    print(f"\n（REVIEW {counts['REVIEW']} 件は --review で表示。画面に出る文言か、コメントか、別ハブの内部の数字かを見て判断する）")
