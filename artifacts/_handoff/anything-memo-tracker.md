# 引き継ぎ書：🗂️ Anything Memo Tracker 専用スレッド（＝このスレッド）

このスレッドは **Anything Memo トラッカー**の専用スレッドです。以下はこのスレッドを引き継ぐ場合（別チャットに移す場合）のための資料です。

## キックオフ・プロンプト（別チャットに移すとき、そのまま貼る）

```
あなたはこのリポジトリの「🗂️ Anything Memo Tracker」専用アシスタントです。
このトラッカーだけを担当します（他のトラッカーには触れないでください）。

最初に以下を読んで状況を把握してください:
- artifacts/_handoff/anything-memo-tracker.md（この引き継ぎ書）
- artifacts/ADDING-BY-KEYWORD.md（キーワード調査の仕様）
- artifacts/anything-memo-tracker/README.md
- artifacts/anything-memo-tracker/data.json（現データ・source of truth）

作業ブランチ: claude/cowork-artifacts-to-code-t2qrw6（現行のまま）

私がキーワード（用語・概念）を送ったら、次を行ってください:
1. Web検索で調べ、要約メモ(1〜2文)とジャンルを決める
   ジャンル: ai(AI/生成AI) / cloud(クラウド/インフラ) / dev(開発/DevOps) / biz(ビジネス/マーケ) / data(データ/分析)
2. python3 artifacts/_build/add_entries.py memo '[{"topic":..,"genre":"ai","note":..,"date":"YYYY-MM-DD"}]'
3. python3 artifacts/_build/build.py で再生成
4. コミット＆プッシュ
5. Artifact を更新: artifacts/anything-memo-tracker/artifact.html を公開し、
   url に既存URL https://claude.ai/code/artifact/f15068bb-832d-4b96-beee-0256a9c4b9f1 を渡す
   （title「Anything Memo トラッカー」, favicon 🗂️）
6. 何を追加したか（トピック・ジャンル・出典）を報告

まず現状（全何件か、ジャンル内訳）を確認して教えてください。
```

## 概要・現状

- **データ**: `artifacts/anything-memo-tracker/data.json`（現在19件）
  - ジャンル: 🤖AI/生成AI(ai) / ☁️クラウド/インフラ(cloud) / 🔧開発/DevOps(dev) / 📈ビジネス/マーケ(biz) / 📊データ/分析(data)
- **Artifact**: https://claude.ai/code/artifact/f15068bb-832d-4b96-beee-0256a9c4b9f1

## データモデル（1件）

```json
{ "topic": "MCP（Model Context Protocol）", "genre": "ai",
  "date": "2026-07-15", "note": "1〜2文の要約。Web検索で裏取りする。" }
```
- `genre` は `ai / cloud / dev / biz / data` のいずれか（`data.json` の `genres[].key`）。
- 追加時、ジャンル別件数・統計は add_entries.py が自動再計算する。

## よく使うコマンド

```bash
# 追加（複数可・重複は topic で自動スキップ）
python3 artifacts/_build/add_entries.py memo \
  '[{"topic":"RAG（検索拡張生成）","genre":"ai","note":"...","date":"2026-07-15"}]'
# 再生成（index.html と artifact.html を更新）
python3 artifacts/_build/build.py
```

## 注意

- 事実は Web 検索で裏取りし、出典URLを報告に添える。
- Artifact 更新時は **必ず `url` を渡す**（渡さないと新URLになる）。
