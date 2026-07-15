# 引き継ぎ書：📋 Daily Task Tracker 専用スレッド

このスレッドは **デイリータスク トラッカー**だけを担当します。

## キックオフ・プロンプト（新チャットにそのまま貼る）

```
あなたはこのリポジトリの「📋 Daily Task Tracker（デイリータスク トラッカー）」専用アシスタントです。
このトラッカーだけを担当します（他のトラッカーには触れないでください）。

最初に以下を読んで状況を把握してください:
- artifacts/_handoff/daily-task-tracker.md（この引き継ぎ書）
- artifacts/daily-task-tracker/README.md
- artifacts/daily-task-tracker/data.json（現データ・source of truth）

作業ブランチ: claude/daily-task-tracker
  （無ければ現行ブランチ claude/cowork-artifacts-to-code-t2qrw6 から作成:
   git fetch origin && git checkout -b claude/daily-task-tracker origin/claude/cowork-artifacts-to-code-t2qrw6）

私が指示したら、次を行ってください:
- タスクの追加/編集/削除 → artifacts/daily-task-tracker/data.json を編集
- python3 artifacts/_build/build.py で index.html と artifact.html を再生成
- コミット＆プッシュ（ブランチ: claude/daily-task-tracker）
- Artifact を更新: artifacts/daily-task-tracker/artifact.html を公開し、
  url に既存URL https://claude.ai/code/artifact/078507ba-a147-4ce6-84b5-ca7a82d9fed4 を渡す
  （title「デイリータスク トラッカー」, favicon 📋）

まず現状（グループとタスク数）を確認して教えてください。
```

## 概要・現状

- **データ**: `artifacts/daily-task-tracker/data.json`
  - グループ: `Cowork task`(自動生成)12件 / `Others`(手動記録)9件
  - ヒートマップは 2026-07-01〜07-15 の15日分。
- **Artifact**: https://claude.ai/code/artifact/078507ba-a147-4ce6-84b5-ca7a82d9fed4

## データモデル（抜粋）

```json
{
  "day": 45,
  "heatmap": { "dates": ["2026-07-01", ...], "cells": { "<taskId>": ["late","late",...,"pending"] } },
  "groups": [
    { "name": "Cowork task", "type": "auto",
      "tasks": [ { "id": "genai", "name": "GenAI quiz", "total": 45, "done": 21, "late": 23 } ] }
  ]
}
```
- 各タスクの `id` が `heatmap.cells` のキーと対応。セルの値は `done` / `late` / `pending`。
- ※ このトラッカーは「キーワード調査」向きではなく、**日次タスクの管理**が中心。
  調査で語を足す用途は Anything Memo / Learning を使う。

## よく使うコマンド

```bash
# data.json を編集後、再生成
python3 artifacts/_build/build.py
```

## 注意

- タスクを追加したら `heatmap.cells` にも同じ `id` の15日分配列を足すこと（未着手なら全て "pending"）。
- Artifact 更新時は **必ず `url` を渡す**。
