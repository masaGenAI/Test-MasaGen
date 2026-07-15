# 🧭 トラッカー・ハブ — 引き継ぎ / 仕様

3つのトラッカー Artifact への入口ページ（リンク集）を1枚にまとめたもの。

## 成果物
- `artifacts/hub/index.html` — スタンドアロン版（ブラウザ直接表示・リポジトリ保管用）
- `artifacts/hub/artifact.html` — Artifact 公開用（`<head>`/`<body>` は公開時に付与されるためコンテンツのみ）

## 公開 Artifact（この入口ページ）
- **タイトル**: トラッカー・ハブ
- **favicon**: 🧭
- **発行URL**: https://claude.ai/code/artifact/ff3c71e1-f7c1-4bf6-bd6a-c48d0182147e

## リンク先の3トラッカー（各カードの「開く」→ `target="_blank"`）
| 絵文字 | トラッカー | 件数 | Artifact URL |
|---|---|---|---|
| 📝 | Anything Memo トラッカー | 18件 | https://claude.ai/code/artifact/f15068bb-832d-4b96-beee-0256a9c4b9f1 |
| 🗺️ | 学習ロードマップ トラッカー | 進行中（要確認） | https://claude.ai/code/artifact/5ea42e83-20dc-48b0-8eb7-f656df28ff99 |
| 📅 | デイリータスク トラッカー | 464件 | https://claude.ai/code/artifact/078507ba-a147-4ce6-84b5-ca7a82d9fed4 |

## 件数の出典（ソース）
- **Anything Memo = 18**: Notion「Anything memo」ページの「全件（日付順）」テーブル実数。
- **デイリータスク = 464**: Notion データベース「Scheduled task tracker」の行数（`COUNT(*)` 実測）。
- **学習ロードマップ = 未確定**: 対応する Notion 確定ソースが見つからず、Artifact 本体が非公開（HTML 取得 403）のため実数を確認できず。カードは数値の代わりに「進行中」ステータスを表示。正確な件数が判明したら差し替える。

## デザイン
- クールなオフホワイト地（ライト）／ネイビー地（ダーク）の productivity UI。`prefers-color-scheme` とビューアのテーマトグル（`data-theme`）の両対応。
- カードごとのアクセント色: Memo=ブルー `#2f6fed` / ロードマップ=ティール `#0e9b83` / デイリー=アンバー `#e5820b`。
- レスポンシブ・カードグリッド（`auto-fit`）。各カード = 絵文字タイル＋名称＋件数/ステータスチップ＋一言説明＋全幅「開く ↗」ボタン。
- CSP 準拠（外部リソース無し・システムフォントスタック）。

## 更新方法
- ファイル（主に `artifacts/hub/artifact.html`）を編集し、同じパスで再公開すると**同じ URL**に反映される。
- 件数だけの差し替えなら該当カードの `.chip` と、ヘッダー `.summary` の数値を更新。
