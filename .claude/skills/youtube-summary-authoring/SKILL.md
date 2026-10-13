---
name: youtube-summary-authoring
description: Book-Summary（nova-app/public/booksummaryhub.html）の「YouTube」枠に、新しいチャンネルの動画要約を追加・書き直すときの手順と品質基準。「このチャンネルを Book Summary の YouTube に追加して」「ダイジェスト（xlsx/md）を送った」「字幕を取ってきた」「YouTube の要約を既存とそろえて」など、YouTube 由来の要約（oneLiner・overview・points・takeaway・注記・出典ツリー・チャンネル総括）を作る・直す作業では必ずこのスキルを使う。既存2,763件の実測値に合わせた長さ・体裁・帰属の基準と、ダイジェストの取り込みから検査・差し込みまでの決まった道具を持つ。
---

# YouTube 動画要約の追加（Book-Summary）

既存の YouTube 要約（サムの本解説・本要約チャンネル・Motocrab・考えすぎる葦・Paranoia・サラタメさん、計2,763件）と
**同じ品質・ボリューム・体裁**で新しいチャンネルを足すための手順。2026-10 に7チャンネル1,112本を追加したときの手順を固めたもの。

## 既存の基準（実測。`scripts/measure_existing.py` で測り直せる）

| 出典 | 件数 | 一言 | 概要 | 要点数 | 要点本文 | 示唆 |
|---|---|---|---|---|---|---|
| 本要約チャンネル | 1,940 | 80 | 349 | 5 | 220 | 181 |
| サムの本解説 | 360 | 79 | 319 | 5 | 222 | 174 |
| サラタメさん | 192 | 83 | 361 | 5 | 233 | 200 |
| Motocrab | 127 | 78 | 337 | 6 | 212 | 170 |
| 考えすぎる葦 | 113 | 94 | 348 | 6 | 232 | 195 |

（字数はいずれも中央値。これらは**字幕全文**から書いたもの。）

### 体裁（1件 = 動画1本）
- 項目順: `id, title, author, publisher, year, oneLiner, overview, points[{h,b}], takeaway, url, srcNote, srcPaths, themes, shelf, notes[{h,b}], kind, refBooks`
- `id`: `yt_<チャンネルid>_<下位ノードid または main>_<ダイジェストのNo>`
- `title`: 動画タイトル。`srcNote`: `"<尺>分 ・ <公開日>"`（ショートは秒）。`year`: 公開年
- `points` は**動画の中身の要点**。エビデンス等は `notes` に入れ、画面では折りたたみの「注記」になる
- `notes` の見出しは既存と同じ語を使う: 「エビデンス（数値・出典）」「解説対象の書籍」「依拠する研究・思想・情報源」「動画が提示する実践手順」「エビデンス強度と留保」（最後に置き、`強度 X／…` で始める）。名言系は「取り上げた名言」「元の番組・動画」
- 書籍解説の回は `refBooks`（書名）と `author`（本の著者）を入れる（画面では「紹介書籍の著者」）。本の回でないテーマ解説は `kind: "theme"`
- `shelf` は10ジャンルの書架 id（ai / strategy_core / finance / marketing_core / people / startup / linguistics / politics / science / health / productivity）。チャンネルのテーマごとに決め、既存チャンネルの割り当て（`measure_existing.py` の注記参照）とそろえる
- 出典ツリー（`SOURCES` の yt の children）にチャンネルを足す。再生リスト・シリーズ・形式が明確なら下位ノードにする
- チャンネル総括 `SOURCE_DIGEST`（summary・scope・横断論点）、留意点 `SOURCE_EXTRA`（caveats）、テーマの読み筋 `THEME_NOTE`（c・e・a）もダイジェストから入れる

## 段（tier）— 根拠の量に応じて長さを変える。水増ししない
| 段 | いつ | 一言 | 概要 | 要点 | 示唆 |
|---|---|---|---|---|---|
| subs | 字幕全文がある（既存と同じ量） | 60〜110 | 280〜480 | 3〜6個×100〜260 | 120〜240 |
| full | 長尺・ダイジェストに厚い概要/章立て | 60〜110 | 260〜480 | 3〜5個×90〜260 | 110〜240 |
| desc | 長尺・中心主張と数値が中心 | 50〜110 | 120〜340 | 2〜4個×60〜220 | 90〜220 |
| short | ショート（約1分） | 35〜95 | 70〜210 | 1〜3個×45〜180 | 70〜170 |

**既存と同じボリュームにするには字幕全文が要る。** ダイジェストだけで書くと full/desc にとどまる。
長さを合わせるために材料にないことを書くのは禁止（過去に最も多かった誤り）。

## 手順
1. **入力の展開**: 添付 zip は信頼しない入力。専用の空フォルダに展開し、Python は `-I` で動かす（ファイル名は cp437→cp932 で直す）。
2. **重複の確認**: 既に収録済みのチャンネル・動画がないか確かめる（例: 2026-10 の zip の Motocrab 127本はすべて収録済みだった）。`build_from_digest.py --hub` は収録済みの動画IDを自動で飛ばす。
3. **チャンネル設定**: `references/channels.example.json` を写して、チャンネルごとに id・表示名・副題・下位ノード列と対応・テーマ→書架を書く。概要欄だけが根拠のチャンネルは `"basis": "概要欄のみ"`。
4. **骨組みの生成**: `python3 -I scripts/build_from_digest.py <展開先> <作業フォルダ> <channels.json> --hub nova-app/public/booksummaryhub.html`
   → `skel.json`（メタ・注記）, `inputs/<id>.json`（執筆用・段つき）, `tree.json`, `digest.json`, `theme_note.json`
5. **字幕（任意だが、既存と同じ量にするなら必須）**: コンテナからの大量取得は YouTube のボット判定・429 で止まる（回避策を探さない）。
   `python3 -I scripts/make_fetch_list.py <作業フォルダ> <ユーザーに渡すフォルダ>` で一覧と手順を作って利用者に渡し、
   届いた VTT を `python3 -I scripts/vtt_to_subs.py <vttフォルダ> <作業フォルダ>` で `subs/<id>.txt` にする。字幕がある動画は自動で subs 段の検査になる。
6. **手本の用意**: 既存から1件を `<作業フォルダ>/EXAMPLE_full.json` に書き出す（id, title, oneLiner, overview, points, takeaway。例: `yt_motocrab_main_20`）。
7. **執筆**: `references/agent_brief.md` を作業フォルダに置き（パスを書き換える）、**まず6本ほど試し書き**させて読み、指示を直してから全件をバッチ（長尺50〜60本、ショート120本程度）で Sonnet のサブエージェントに並列で割り当てる。各自が `check_yt.py --ids` で自分の分を合格させる。
8. **検査と抜き取り**: `python3 -I scripts/check_yt.py <作業フォルダ>` で全件。不合格は担当に戻すか書き直す。合格分も各チャンネル数本を入力と突き合わせて読み、帰属（動画の主張か、ダイジェスト作成者の応用か）と言い足しを確かめる。
9. **差し込み**: `python3 -I scripts/apply_yt.py <作業フォルダ> nova-app/public/booksummaryhub.html`（何度流しても同じ結果。不合格は入らない）。
   YT_BOOKS 先頭のコメント（チャンネル数・件数）を実数に直す。
10. **点検**: `cd nova-app && npm run build`、`node .claude/skills/nova-consistency-audit/scripts/smoke.mjs`（Book-Summary の出典一覧と実行時エラー0）、
    `python3 .claude/skills/nova-consistency-audit/scripts/stale_scan.py`（MISMATCH 0）、ブラウザで新チャンネルを開いて表示を確認する。

## 書き方の約束（agent_brief.md に詳細）
- 誰の主張かを書く:「〜と動画は論じる」「本書は〜と説く」「解説者は〜と補足する」「〜と（発言者）は語る」
- ダイジェストの「実務示唆」は**ダイジェスト作成者が導いた応用**。示唆欄では「職場に当てはめるなら〜」と書き、動画の勧めとして書かない
- 本文に「概要欄によれば」「ダイジェストでは」など根拠の出どころを書かない（注記の「エビデンス強度と留保」に入る）
- 名言・台詞は入力の字のまま引用する。宣伝・案件・チャンネル登録のお願いは入れない
- 常体。簡体字（cp932外の漢字）・キリル文字・水増し表現（「と考えられる」「とも言える」「なお、」）を使わない

## やってはいけないこと
- 長さを合わせるために、入力・字幕にない研究・数値・評価・注意書きを足す
- 既存の要約・ツリーを手で書き換える（必ず `apply_yt.py` 経由。同じ id は置き換えになる）
- コンテナから YouTube へ大量アクセスして字幕を取ろうとする（ボット判定を回避しようとしない）
