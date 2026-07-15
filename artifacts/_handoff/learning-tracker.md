# 引き継ぎ書：📘 Learning Tracker 専用スレッド

このスレッドは **学習ロードマップ トラッカー**だけを担当します。

## キックオフ・プロンプト（新チャットにそのまま貼る）

```
あなたはこのリポジトリの「📘 Learning Tracker（学習ロードマップ トラッカー）」専用アシスタントです。
このトラッカーだけを担当します（他のトラッカーには触れないでください）。

最初に以下を読んで状況を把握してください:
- artifacts/_handoff/learning-tracker.md（この引き継ぎ書）
- artifacts/ADDING-BY-KEYWORD.md（キーワード調査の仕様）
- artifacts/learning-tracker/README.md
- artifacts/learning-tracker/data.json（現データ・source of truth）

作業ブランチ: claude/learning-tracker
  （無ければ現行ブランチ claude/cowork-artifacts-to-code-t2qrw6 から作成:
   git fetch origin && git checkout -b claude/learning-tracker origin/claude/cowork-artifacts-to-code-t2qrw6）

私がキーワード（資格名・書籍名・講座名など）を送ったら、次を行ってください:
1. Web検索で調べ、区分(資格/Tools/講座/書籍/Udemy)・提供・名称・分類を決める
2. python3 artifacts/_build/add_entries.py learning '[{"cat":..,"provider":..,"name":..,"bunrui":..}]'
3. python3 artifacts/_build/build.py で再生成
4. コミット＆プッシュ（ブランチ: claude/learning-tracker）
5. Artifact を更新: artifacts/learning-tracker/artifact.html を公開し、
   url に既存URL https://claude.ai/code/artifact/5ea42e83-20dc-48b0-8eb7-f656df28ff99 を渡す
   （title「学習ロードマップ トラッカー」, favicon 📘）
6. 何を追加したか（区分・分類）を報告

まず現状（全何件か、カテゴリ内訳）を確認して教えてください。
```

## 概要・現状

- **データ**: `artifacts/learning-tracker/data.json`（全564件。区分: 資格66 / Tools64 / 講座53 / 書籍261 / Udemy120）
- **進捗ドーナツ**は取り込み時点の集計値（71/564・13%）。個別の完了状況はPDF由来で持っていない。
- **Artifact**: https://claude.ai/code/artifact/5ea42e83-20dc-48b0-8eb7-f656df28ff99

## データモデル（1行）

```json
{ "no": 67, "cat": "資格", "provider": "MS", "name": "AZ-104", "bunrui": "Cloud" }
```
- `cat` は `資格 / Tools / 講座 / 書籍 / Udemy` のいずれか。`no` は区分ごとに自動採番（add_entries.py が付与）。
- `provider`・`bunrui` は任意（空可）。

## よく使うコマンド

```bash
# 追加（複数可・重複は自動スキップ）
python3 artifacts/_build/add_entries.py learning \
  '[{"cat":"資格","provider":"MS","name":"AZ-104","bunrui":"Cloud"}]'
# 再生成（index.html と artifact.html を更新）
python3 artifacts/_build/build.py
```

## 注意

- 手で `data.json` を編集したら必ず `build.py` を実行して再生成する。
- Artifact 更新時は **必ず `url` を渡す**（渡さないと新URLになる）。
