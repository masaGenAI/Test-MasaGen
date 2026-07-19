---
description: テストと lint をまとめて実行し、結果を要約する
allowed-tools: Bash(python -m pytest*), Bash(ruff check*)
---

以下を順に実行して、結果を日本語で簡潔に報告してください。

1. `python -m pytest -q` でテストを実行
2. `ruff check .` で lint を実行

失敗があれば、どのテスト/どのファイルが原因かを箇条書きで示してください。
すべて通っていれば「✅ 全チェック通過」とだけ報告してください。
