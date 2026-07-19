---
description: TaskStore に新しいメソッドを、CLAUDE.md の規約に従って追加する
argument-hint: <追加したいメソッドの説明>
---

`src/todoapp/store.py` の `TaskStore` に、次の要望どおりのメソッドを追加してください。

要望: $ARGUMENTS

必ず守ること:
- 型ヒントと docstring を付ける（CLAUDE.md 準拠）
- `tests/test_store.py` に対応するテストを追加する（`test_<対象>_<条件>` 形式）
- 追加後に `python -m pytest -q` を実行して通ることを確認する
