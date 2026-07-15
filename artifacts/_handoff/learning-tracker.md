# 📘 Learning Tracker 引き継ぎ

このトラッカー専用アシスタントのための状況引き継ぎ。**このトラッカーだけ**を担当する（他トラッカーには触れない）。

## これは何か
個人の学習ロードマップ（資格・AIツール教材・オンライン講座・書籍・Udemy）を1枚の
HTML アーティファクトに集約して可視化するもの。データの正本は **Notion**、
アーティファクトはその**静的スナップショット**。

- 作業ブランチ: `claude/learning-tracker`
- アーティファクト URL: https://claude.ai/code/artifact/5ea42e83-20dc-48b0-8eb7-f656df28ff99

## 現状（Notion ライブデータ基準）
| 区分 | 件数 | 完了 |
|---|---|---|
| 資格 | 68 | 8 |
| Tools | 64 | 2 |
| 講座 | 53 | 2 |
| 書籍 | 261 | 14 |
| Udemy | 105 | 30 |
| **合計** | **551** | **56** |

> 参考: 元PDF スナップショットは「全564件」だったが、これは古い。上表は Notion 現況。

## データの出どころ（Notion）
親ページ「💼 List」配下のデータベース。各 collection URL:
- 資格: `collection://b5abff92-fd2c-4552-9844-8f7b9f940b49`（名称=資格名 / 提供=プロバイダー / 分類=大項目）
- Tools: `collection://dc1ec26c-a40b-4ba0-a94e-abe23affd7a4`（名称=タイトル / 提供=プロバイダー / 分類=大項目）
- 講座: `collection://be669321-1970-4144-af9f-aace82dd3a90`（名称=講座 / 分類=ジャンル / 提供なし）
- 書籍: `collection://1ee8ddbb-ea83-4d72-8bd2-ef830fe0e2da`（名称=書籍名 / 分類=ジャンル / 提供なし）
- Udemy: `collection://36e480e7-bec5-4d55-b804-ccad401155ad`（名称=コース名 / 分類=ジャンル / 提供なし）

ステータス値: 資格=取得済み/準備中/未取得、その他=完了/着手中/(再チェック)/未着手/保留。
`完了`・`取得済み` を「完了」として集計する。

## ファイル構成
```
artifacts/
  ADDING-BY-KEYWORD.md        ← キーワード追加の手順（必読）
  _handoff/learning-tracker.md ← このファイル
  _build/
    raw/*.json                 ← Notion 各DBのスナップショット（shikaku/tools/koza/hon*/udemy*）
    additions.json             ← キーワードで追加した分（build がここも読む）
    add_entries.py             ← additions.json への追記ヘルパー
    build.py                   ← raw + additions → learning-tracker/artifact.html を再生成
  learning-tracker/artifact.html ← 生成物（= 公開アーティファクト）
```
> raw のファイル名は区分の接頭辞で判定（`hon.json` も `hon_2.json` も書籍）。

## 定例フロー（資格名・書籍名などを受け取ったら）
1. **Web検索で調べる**（一次情報で裏取り）→ 区分・提供・名称・分類・ステータスを決定
2. `python artifacts/_build/add_entries.py --cat ... --name ... --genre ...` で追記
3. `python artifacts/_build/build.py` で再生成
4. `git add -A && git commit && git push -u origin claude/learning-tracker`
5. `artifacts/learning-tracker/artifact.html` を上記 URL で更新（Artifact ツール, `url=` 指定）

詳細は `artifacts/ADDING-BY-KEYWORD.md` を参照。

## 事実確認ルール（ハルシネーション防止・Anything memo と同じ方針）
数値・提供元・「最新」「難易度」等は二次記事だけで確定せず、**一次情報（公式・発行元）**で裏取り。
不確かなものは特記に「要確認」と明記し、断定しない。分類は既存の選択肢に合わせる
（新分類が必要なときだけ新設し、その旨を明記）。
