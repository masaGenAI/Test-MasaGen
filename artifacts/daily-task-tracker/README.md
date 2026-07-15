# Daily Task Tracker（移設版）

Cowork で作成したアーティファクト **「Daily Task Tracker」** を、このリポジトリに移設した単体版です。

## 構成

| ファイル | 役割 |
|---|---|
| `index.html` | 単体で動く静的アプリ（ダッシュボード／カレンダー／ヒートマップ／チェック項目の4タブ）。ブラウザで開くだけで動作します。 |
| `data.json` | PDFから抽出したタスク・進捗・ヒートマップのデータ（資産として保存）。 |

## 使い方

`index.html` をブラウザで開くだけです（サーバー不要・`file://` で動作）。

- ダッシュボードのカード、またはヒートマップのマスをクリックすると押印（完了/取消）できます。
- 押印状態はブラウザの `localStorage` に保存されます（フッターの「押印をリセット」で初期化）。

## 元アプリからの変更点（重要）

移設元は PDF の**見た目のスナップショット**であり、動作するソースコードではありません。そのため本単体版は見た目とデータを再現したものです。以下は**意図的に無効化**しています。

- ❌ **Notion 双方向同期** — 元アプリはNotionからタスクを自動取得・保存していましたが、単体版では無効です。
- ❌ **Cowork チャット連携**（「問題を開く」等） — 単体版では動作しません。
- ⚠️ 収録範囲は **2026年7月（7/1–7/15）** のスナップショットのみです。

## 元データの内訳

- **Cowork task**（自動生成）: 12タスク（Thinking Frame quiz, GenAI quiz, StrategicFDE, C-GAB, BK Grade3, Biz-Ent YT, Megatech-Prep, Side job, Biz skills, note×YT, AI dev quiz, Ling/Onto quiz）
- **Others**（手動記録）: 9タスク（English (ELZA), Languages, Reading, E-learning, Certification, Hand-skills, GFS, Selfcare, Journaling）

抽出元: Cowork アーティファクト「Daily Task Tracker」PDF書き出し。
