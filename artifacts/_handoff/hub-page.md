# 引き継ぎ書：🧭 トラッカー・ハブ（入口ページ）を作る

3つのトラッカーの Artifact へのリンクを1枚にまとめた**入口ページ**を、新チャットで作成するための資料です。

## キックオフ・プロンプト（新チャットにそのまま貼る）

```
あなたはこのリポジトリで「🧭 トラッカー・ハブ（入口ページ）」を作る担当です。
3つのトラッカーArtifactへのリンク集を1枚のページにまとめます。

最初に以下を読んで状況を把握してください:
- artifacts/_handoff/hub-page.md（この引き継ぎ書。仕様と各種URLはここに全部あります）
- artifacts/_handoff/README.md（全体像）
- 各 data.json（件数表示に使う）:
  artifacts/anything-memo-tracker/data.json
  artifacts/daily-task-tracker/data.json
  artifacts/learning-tracker/data.json

作業ブランチ: claude/hub-page
  （無ければ現行ブランチから作成:
   git fetch origin && git checkout -b claude/hub-page origin/claude/cowork-artifacts-to-code-t2qrw6）

やること:
1. artifacts/hub/index.html（スタンドアロン）と artifacts/hub/artifact.html（公開用・doctype等なし）を作る
   - 3トラッカーをカードで並べ、各カードに「開く」ボタン → 各Artifact URL（下記）へ target="_blank" で遷移
   - 各カードに現在の件数（data.jsonから読み取った値をハードコードでよい）と一言説明・絵文字
   - デザインは各トラッカーと同系統（ライトテーマ・カード・角丸・#f8fafc背景）。CSSは自己完結・外部リソース禁止
   - artifact.html は <title> とコンテンツのみ（<!DOCTYPE>/<html>/<head>/<body> は入れない）。全CSS/JSインライン
2. ブラウザ描画で崩れ・リンク切れがないか確認（可能ならheadlessでスクショ）
3. コミット＆プッシュ（ブランチ: claude/hub-page）
4. Artifact として公開（新規URL） title「トラッカー・ハブ」 favicon 🧭
   → 発行されたURLをこの引き継ぎ書の「## ハブのArtifact URL」に追記してコミット
5. 3トラッカーの各引き継ぎ書からハブへ相互リンクを張ってもよい（任意）

まず3つの data.json を読んで現在の件数を確認し、設計案（カード構成）を一言で提案してから作ってください。
```

## リンクする先（各トラッカーの Artifact URL）

| トラッカー | 絵文字 | Artifact URL | 一言説明 |
|---|---|---|---|
| Anything Memo トラッカー | 🗂️ | https://claude.ai/code/artifact/f15068bb-832d-4b96-beee-0256a9c4b9f1 | キーワードから作る調べ済みノート |
| デイリータスク トラッカー | 📋 | https://claude.ai/code/artifact/078507ba-a147-4ce6-84b5-ca7a82d9fed4 | 日次タスクの押印・カレンダー・ヒートマップ |
| 学習ロードマップ トラッカー | 📘 | https://claude.ai/code/artifact/5ea42e83-20dc-48b0-8eb7-f656df28ff99 | 資格・講座・書籍など全564件の学習管理 |

## 件数（作成時点の目安。最新は各 data.json を参照）

| トラッカー | 件数の出し方 |
|---|---|
| Anything Memo | `memos` の件数（現在19件）＋ジャンル5種 |
| Daily Task | `groups[].tasks` の合計（現在21タスク：Cowork12 / Others9） |
| Learning | `rows` の件数（現在564件） |

## デザイン指針（各トラッカーと揃える）

- 背景 `#f8fafc`、カード白 `#fff`＋薄いボーダー `#e2e8f0`、角丸、影は控えめ
- アクセント青系（`#2563eb`）。各カードにトラッカー固有色を差し色にしてもよい
  （Memo=紫〜青グラデ、Daily=濃紺、Learning=ラベンダー）
- フォントはシステムフォント（`-apple-system, "Noto Sans JP", Meiryo, sans-serif`）
- 幅は `max-width` で中央寄せ、レスポンシブ（カードは grid `auto-fill, minmax`）

## ハブのArtifact URL

（作成後に発行されたURLをここに記入）
