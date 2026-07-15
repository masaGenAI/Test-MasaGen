# 📋 Daily Task Tracker — 引き継ぎ

**担当**: このトラッカー専用アシスタント（他トラッカーには触れない）
**作業ブランチ**: `claude/daily-task-tracker-h2n7y5`
**Artifact URL**: https://claude.ai/code/artifact/078507ba-a147-4ce6-84b5-ca7a82d9fed4

## 構成

| ファイル | 役割 |
|---|---|
| `artifacts/daily-task-tracker/data.json` | タスクデータ（**唯一の編集元**） |
| `build.py`（リポジトリ直下） | data.json → artifact.html を再生成 |
| `artifacts/daily-task-tracker/artifact.html` | 生成物（publish対象・body-onlyで doctype 無し） |

## 運用フロー

1. `artifacts/daily-task-tracker/data.json` を編集（タスク追加/編集/日次ステータス）
2. `python build.py` で再生成（`ruff check build.py` も通す）
3. コミット & プッシュ（`git push -u origin claude/daily-task-tracker-h2n7y5`）
4. `artifact.html` を Artifact ツールで `url=https://claude.ai/code/artifact/078507ba-a147-4ce6-84b5-ca7a82d9fed4` へ公開/更新

## data.json スキーマ要点

- `month`（表示月, `YYYY-MM`）/ `today` / `dayNumber`（通算Day）
- `groups[]`: `name`, `kind`(`auto`=Cowork task=自動生成 / `manual`=Others=手動記録),
  `kindLabel`, `dailyDefault`(過去日の既定ステータス), `tasks[]`
- `tasks[]`: `key`(略号), `name`, `done` / `total` / `delayed`（ダッシュボードの集計値）,
  `overrides`（`{"YYYY-MM-DD":"done|delayed|todo"}` 個別上書き）
- 日次ステータス解決順: `overrides` > 未来日(`future`) > 当日(`todo`) > `dailyDefault`

## 現状（2026-07-15 / Day 45 時点）

- **グループ 2 / タスク 21**
- **Cowork task（自動生成, 12件）**: Thinking Frame quiz 21/45・GenAI quiz 21/45・
  StrategicFDE 1/32・C-GAB 1/32・BK Grade3 1/32・Biz-Ent YT 1/32・Megatech-Prep 0/32・
  Side job 1/32・Biz skills 0/32・note×YT 3/32・AI dev quiz 1/32・Ling/Onto quiz 2/28
- **Others（手動記録, 9件）**: English (ELZA)・Languages・Reading・E-learning・
  Certification・Hand-skills・GFS・Selfcare・Journaling（すべて 0/31）
- 7月ヒートマップ: Cowork は 7/1–7/14=遅延・7/15=未着手（note×YT のみ 7/8, 7/12=完了）、
  Others は全日 未着手。

## データ源メモ

- Notion「Scheduled task tracker」DB（親ページ「デイリータスク」)と双方向同期する設計。
  DBは大きく全件SQLはタイムアウトするため、初期データは配布PDFを土台に再構成した。
  - デイリータスク親ページ: https://app.notion.com/p/37300274f9f181458feafc20622b3e98
  - Scheduled task tracker DS: `collection://d9544d66-9585-4c9e-952b-c0d68db09a21`
- 「Anything memo」は別系統（調べ済みノートのメモ帳）。当トラッカーとはデータが重ならない。
