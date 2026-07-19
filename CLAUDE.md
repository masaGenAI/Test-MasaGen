# todoapp — プロジェクトガイド

小さな TODO 管理 CLI。Claude Code の学習用題材。

## アーキテクチャ
- `src/todoapp/models.py` — データモデル（`Task`, `Priority`）
- `src/todoapp/store.py` — `TaskStore`（メモリ上のCRUD）
- `tests/` — pytest によるテスト

## 開発コマンド
- テスト: `python -m pytest -q`
- Lint: `ruff check .`
- 自動修正: `ruff check --fix .`

## コーディング規約
- Python 3.10+ の型ヒントを必ず付ける（`from __future__ import annotations` 済み）
- 行長は最大 100 文字（ruff 設定に準拠）
- public な関数・クラスには docstring を書く
- 例外を握りつぶさない。失敗は戻り値（bool/None）で表現する既存スタイルに合わせる

## やってはいけないこと
- `_tasks` など内部状態に外部から直接触れない。必ず `TaskStore` のメソッド経由
- 新しい依存ライブラリの追加は事前に相談する

@docs/conventions.md
