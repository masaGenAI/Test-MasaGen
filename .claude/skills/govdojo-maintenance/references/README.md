# 指示書の読み替え

ここの指示書は、2026年10月の作業で一時領域（作業ディレクトリ）に置いて使ったもの。ファイル名・パスは次のように読み替える。

| 指示書の中の名前 | いまの場所 |
|---|---|
| `regs_final.json` | `data/govdojo/regs.json`（`file` は外してある） |
| `ind_final.json`・`final/ind4_tagged.json`・`final/ind2.json`・`final/ind3.json` | `data/govdojo/industries.json`（16業界をまとめたもの） |
| `lc/lc_final.json` | `data/govdojo/lowcode.json` |
| `k_kit/kit_final.json` | `data/govdojo/kit.json` |
| `compare.json` | `data/govdojo/compare.json` |
| `tools/qcheck.py`・`tools/qlen.py`・`tools/fetch.sh` | `../scripts/` の同名のファイル（作業ディレクトリで実行する） |
| `final/bank_new.json` などの既存の問題 | `nova-app/src/ProjectNova.jsx` の `GOVDOJO_BANK` |

| 指示書 | 用途 |
|---|---|
| REG_BRIEF.md | 調査の決まり（(A) 規制マップ、(B) 業界） |
| IND2_BRIEF.md・IND3_BRIEF.md | 業界の追加（テーマ・海外フラグ・注記の英訳・既存との重なり） |
| KIT_BRIEF.md | 実務キットの調査 |
| AUDIT_REG_BRIEF.md・AUDIT_IND_BRIEF.md・AUDIT_IND2_BRIEF.md | 調査結果の検算 |
| UPD_BRIEF.md | 既存の項目を、取り直した資料で補強する |
| QUIZ_BRIEF.md・QUIZ2/3/4_BRIEF.md | 判定演習の作問 |
| SCEN_BRIEF.md | シナリオの作成 |
| QAUDIT_BRIEF.md | 問題・シナリオの検算 |
| TPL_BRIEF.md・AUDIT_TPL_BRIEF.md | ひな形の下書きと、根拠の行との突き合わせ |
