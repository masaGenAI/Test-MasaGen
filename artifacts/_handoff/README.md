# トラッカー引き継ぎガイド

3つのトラッカーを、それぞれ**専用チャット（スレッド）**で運用するための引き継ぎ資料です。
各チャットは1つのトラッカーだけを担当し、キーワード調査による追加・編集・再公開を行います。

## スレッドの割り当て

| トラッカー | 担当スレッド | 作業ブランチ（推奨） | 引き継ぎ書 |
|---|---|---|---|
| 🗂️ Anything Memo | このスレッド（現行） | `claude/cowork-artifacts-to-code-t2qrw6` | [anything-memo-tracker.md](anything-memo-tracker.md) |
| 📋 Daily Task | 別チャットへ | `claude/daily-task-tracker` | [daily-task-tracker.md](daily-task-tracker.md) |
| 📘 Learning | 別チャットへ | `claude/learning-tracker` | [learning-tracker.md](learning-tracker.md) |
| 🧭 トラッカー・ハブ（入口ページ） | 別チャットへ（新規作成） | `claude/hub-page` | [hub-page.md](hub-page.md) |

> トラッカーごとにフォルダが独立しているため、別ブランチで並行運用しても衝突しません。

## 引き継ぎ方法（3ステップ）

1. 新しいチャット（同じリポジトリ）を開く。
2. 対応する引き継ぎ書（上表）の中の **「キックオフ・プロンプト」を丸ごとコピペ**して最初のメッセージにする。
3. 以降、そのチャットにキーワードを送れば、担当トラッカーに調査して追加してくれます。

## 共通の仕組み（どのスレッドでも同じ）

- **データ**: `artifacts/<tracker>/data.json` が正（source of truth）。
- **ビルド**: `python3 artifacts/_build/build.py` で全トラッカーの `index.html`（スタンドアロン）と `artifact.html`（公開用）を再生成。
- **追加**: `python3 artifacts/_build/add_entries.py <memo|learning> '<JSON配列>'` で `data.json` に追記（重複は自動スキップ）。
- **公開**: Artifact ツールで `artifacts/<tracker>/artifact.html` を公開。**既存URLを維持するには `url` に既存のArtifact URLを渡す**（別チャットからの更新に必須）。
- **調査方針**: `artifacts/ADDING-BY-KEYWORD.md` を参照。

## Artifact URL（更新先）

| トラッカー | Artifact URL |
|---|---|
| 🗂️ Anything Memo | https://claude.ai/code/artifact/f15068bb-832d-4b96-beee-0256a9c4b9f1 |
| 📋 Daily Task | https://claude.ai/code/artifact/078507ba-a147-4ce6-84b5-ca7a82d9fed4 |
| 📘 Learning | https://claude.ai/code/artifact/5ea42e83-20dc-48b0-8eb7-f656df28ff99 |

> 別チャットでこのURLを更新するには、Artifact 公開時に `url` パラメータへ上記URLを渡す。渡さないと新しいURLが発行される。
