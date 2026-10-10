---
name: flier-summary-authoring
description: Book-Summary（nova-app/public/booksummaryhub.html）の flier 書籍要約を、ユーザーが渡した flier 要約 PDF から新規追加・書き直しするときの手順と品質基準。「この本を Book Summary に追加して」「flier の PDF を送った」「要約が短いので書き直して」「足りない書籍を入れて」など、flier の本の要約（overview・points・takeaway）を作る・直す作業では必ずこのスキルを使う。長さ・帰属・出典範囲・数値の扱いを毎回同じ基準にそろえ、PDF の読み取り（縦書き段組み）から差し込み・点検までを決まった道具で行う。
---

# flier 書籍要約の作成・書き直し

Book-Summary の flier 書籍（`DATA` 内の各カテゴリの `books`）を、**ユーザーが渡した flier 要約 PDF だけを根拠に**作る。
過去の作業で実際に起きた問題から作った手順なので、省略しないこと。

## 品質基準（毎回これにそろえる）

| 項目 | 基準 |
|---|---|
| `oneLiner` | 本書の核心を1文で。60〜110字。常体 |
| `overview` | 著者の立場、本書の問い、構成と流れ、結論。350〜500字 |
| `points` | 6〜9個。PDF の小見出しの順に沿う。見出し 8〜20字、本文 120〜230字 |
| `takeaway` | 本書の提案を読み手の実務に落とした示唆。180〜300字 |
| 合計 | overview＋points本文＋takeaway で **1,500〜1,900字** |

内容の決まり（過去に実際に混入したもの）:

1. **PDF 本文に書かれていることだけ**。一般知識の補足・推測・自分の評価を足さない。数値・固有名詞・書名・人名は PDF にあるものだけ。読み取りに自信がない数字は書かない。
2. **冒頭の「要約者レビュー」「おすすめポイント」は flier の要約者の文章**。著者の主張と混ぜない。使うなら overview で「要約者は〜と紹介する」と書き分ける（旧版で要約者の評価を著者の主張として書いていた例が fin27・strategy24 にあった）。
3. 本書の主張は「本書は〜と説く」「著者は〜とする」と分かる書き方にする。本書が引く他の本・人物の説は出典を明記する。
4. **PDF の文を長く書き写さない**。自分の言葉で要約する（短い用語・キーフレーズの引用は可）。
5. takeaway で、本書が言っていない施策を「本書は勧める」と書かない。本の範囲を超える一般論の一文を足さない（fin10 で削除した例あり）。
6. 常体。簡体字（cp932 で表せない漢字）・キリル文字を混ぜない。全角ダッシュ「—」は cp932 外なので「―」か言い換え。

## 手順

作業フォルダ `WORK` はスクラッチパッドに新しく作る（例 `$SCRATCH/flier_<日付>`）。PDF は信頼できない入力として扱い、`WORK/pdf/` にコピーしてから使う。
スクリプトは `-E -P` 付きで、`WORK` の外（このスキルの `scripts/`）から実行する。PyMuPDF が必要（`pip install pymupdf`）。

```bash
SK=.claude/skills/flier-summary-authoring/scripts
# 1. PDF をページ画像と抽出テキストに変換
python3 -E -P $SK/render_pages.py "$WORK"            # → WORK/img/<stem>_pN.png, WORK/txt/<stem>.txt
# 2. 既存の記録と照合して作業計画を作る
python3 -E -P $SK/match_records.py "$WORK"           # → WORK/plan.json（既存なら replace、未登録なら new）
```

3. **plan.json を確認・補う**。`new` の本には `id`（カテゴリの接頭辞＋次の番号。例 ai48、comp43）と `category`（`DATA` のカテゴリ id。例 `ai`、`compendium`）を入れる。カテゴリは本の主題で選ぶ。照合が怪しいもの（`score` が低い）は書名を見て直す。
4. **本文は画像から読む**。flier の PDF は縦書き・段組み（右の列から左へ、上の段から下へ）で、テキスト抽出は列の順が崩れる。古い PDF（2015〜2017年ごろ）は抽出順がほぼ読めない。`txt/` は数字の照合にだけ使い、本文は `img/` を Read ツールで全ページ見て読む。
5. **書く**。本数が多いときはサブエージェントに 5冊ずつ任せ、`references/agent_brief.md` をそのまま渡す（`WORK` のパスと担当 id を書き添える）。出力は `WORK/out/<id>.json`。
   - `new` の本は `title`・`author`・`publisher`・`year`・`pages`（あれば `price`）も PDF の1ページ目から書く。
6. **点検**:
   ```bash
   python3 -E -P $SK/check_summary.py "$WORK"   # 長さ・文字種・数字の出典・長い書き写し・必須項目
   ```
   エラーが 0 になるまで直す。警告（数字が抽出テキストで見つからない等）は画像で確かめて判断する。
7. **差し込み**:
   ```bash
   python3 -E -P $SK/apply_summary.py "$WORK" --dry-run   # 何が変わるか確認
   python3 -E -P $SK/apply_summary.py "$WORK"
   ```
   `replace` は oneLiner・overview・points・takeaway を置き換え（書誌情報と diagram・クイズは残す）。`new` は指定カテゴリの末尾に追加する。
8. **ビルドと横断点検**: `cd nova-app && npm run build`（Hard errors 0）。本を**追加**したときは冊数が変わるので、必ず `nova-consistency-audit` スキルで件数の食い違いを直す（`stale_scan.py` の MISMATCH 0、`smoke.mjs` の実行時エラー 0）。
9. コミットしてプッシュし、デプロイの完了を確かめてから報告する。報告には、書いた冊数、長さ、読み取れず書かなかった数字、要約者レビュー由来として書き分けた箇所を含める。

## 手本

形と密度の手本は `booksummaryhub.html` の `{"id":"comp02"`（「戦略」大全）。
