# Project Nova — プロジェクトガイド

学習ダッシュボード（ハブ）を1つのポータルにまとめた個人用の Web アプリ。
GitHub Pages に公開している（`.github/workflows/deploy-pages.yml`。公開するのは Book-Summary の中身を除いた「公開版」）。

## 構成
- `nova-app/` — アプリ本体（Vite + React）。詳しくは `nova-app/README.md`
  - `src/parts/` — アプリの原稿（git に入るのはこちら。約80ファイル）
  - `src/ProjectNova.jsx` — 上をつないだ作業用の写し（git には入らない）。道具・検査・ビルドはこの1本を読む
  - `public/*.html` — そのまま埋め込むハブ（Book-Summary・Liberal Arts・Learning Tracker・Anything Memo）
  - `scripts/` — 原稿をそろえる道具（`nova-src.mjs`）、ビルド用プラグイン、検査スクリプト
- `data/` — 検証済みの根拠データ（`govdojo/`）と点検の台帳（`techhub-freshness/`）
- `.claude/skills/` — 作業ごとの手順と道具（下の各節）
- `docs/` — 点検記録・計画・公開範囲の決めごと

## 原稿の直し方（重要）
- 直すのは `nova-app/src/ProjectNova.jsx`（写し）でも、`nova-app/src/parts/` の部品でもよい。どちらか一方だけを直す。
- **コミットの前に必ず `cd nova-app && npm run nova:sync`**。写しは git に入らないので、写しだけ直してコミットすると変更が残らない
  （`npm run dev`・`build`・`validate` の前と、スキルの道具の最初にも自動で走る）。
- 写しと部品の両方を直すと sync が止まる。そのときは `--prefer parts` か `--prefer view` でどちらを採るか指定する。
- 各部品の1行目 `// @@nova-part …` は消さない・書き換えない。
- クローンした直後など写しが無いときは、`npm run nova:sync` で作る。
- 写しの行番号から部品を探す：`node nova-app/scripts/nova-src.mjs locate <行番号>`。文字列から探す：`… where "<文字列>"`。
- 写しは約100MB ある。丸ごと読まず、grep・sed で必要な行だけ読む。

## よく使うコマンド（`nova-app/` で）
- `npm run nova:sync` — 写しと部品をそろえる
- `npm run validate` — 問題バンクと体系図の検査
- `npm run build` — 全部入りの版（ローカル用）。検査してからビルドする
- `npm run build:public` — 公開版（Book-Summary の中身を入れない。`docs/publication-scope.md`）
- 画面の確認：ビルドのあと、リポジトリのルートで `node .claude/skills/nova-consistency-audit/scripts/smoke.mjs`

## 確認の基準
- 変更したら `npm run build` が通ること（ビルドの前に検査が走る）。
- 画面に関わる変更は、smoke.mjs で全ハブが開き、実行時エラーが 0 件であること。
- 数字・件数・名称に関わる変更は、下の「全体を点検するとき」まで行う。

## クイズ問題を作る・直すとき
`.claude/skills/quiz-authoring/` の規約に従う（最低100問、長さの偏り、簡体字混入、重複判定など）。
差し込む前に `node .claude/skills/quiz-authoring/check-batch.mjs <new.json>` を通す。

## Book-Summary の flier 書籍要約を作る・直すとき
`.claude/skills/flier-summary-authoring/` の手順と品質基準に従う（PDF だけを根拠に、合計1,500〜1,900字・要点6〜9個、要約者レビューと著者の主張を書き分ける）。
差し込む前に `check_summary.py` のエラーを 0 にし、本を追加したら下の整合性点検も行う。
※ flier の利用規約（2026-06-05 改定）は、要約本文を生成AIに読み込ませることを禁じている。この作業を続けるかどうかは未決（`docs/publication-scope.md`）。

## Book-Summary の YouTube 要約を追加・直すとき
`.claude/skills/youtube-summary-authoring/` の手順と基準に従う（既存の実測値に合わせた長さ・体裁・帰属、根拠の量に応じた段、水増し禁止）。
差し込みは `apply_yt.py` 経由で行い、`check_yt.py` の不合格を 0 にしてから入れる。

Book-Summary の原稿は `nova-app/public/booksummaryhub.html` の1ファイルだけ。`npm run build` が dist 用に
小さい `booksummaryhub.html` と `booksummary-*.js` に分ける（`nova-app/scripts/booksummary-split.mjs`）ので、dist 側は直さない。

## Project Nova を更新したあと・全体を点検するとき
`.claude/skills/nova-consistency-audit/` の手順に従う（ポータルのタグ・Mastery Track・説明文・コメントに残る古い件数や名称を洗い出す）。
`python3 .claude/skills/nova-consistency-audit/scripts/stale_scan.py` で MISMATCH が 0 になるまで直す。

## TechHub の情報が古くなっていないか点検するとき（定期）
`.claude/skills/techhub-freshness-audit/` の手順に従う（期限は `due.py`、候補は `time_scan.py` と見張り番、担当者と検算者が出典を開いて確かめた事実だけ直す）。
置換は `repl_check.py` を通して `apply_verified.py` で当て、`report.py` で台帳（`data/techhub-freshness/`）を更新する。確かめられない点は直さず、未確認として持ち越す。

## ガバナンス道場の規制・業界・問題を更新するとき
`.claude/skills/govdojo-maintenance/` の手順に従う（出典の本文で確かめた事実だけ、未確認は未確認と書く）。
規制マップ・業界別チェック・ローコード・実務キットは `data/govdojo/` を直して `build.py` で生成する（jsx の定数を手で直さない）。
`npm run build` の前に事実の台帳（`data/govdojo/facts.json`）の照合が走るので、食い違いを 0 にしてから入れる。

## 更新内容を一覧にするとき
`.claude/skills/update-digest/` の手順に従う（`scripts/changes.py` でコミットを画面の場所＝ハブ › タブ／資格ごとに整理し、Pages の公開状況まで確かめる）。

## 正解の番号を、正解を伏せて解き直して確かめるとき
`.claude/skills/quiz-key-audit/` の手順に従う（`export.py` で正解を伏せた問題を書き出し、解答役が解いた結果を `compare.py` で突き合わせ、食い違った問題だけを読んで確かめる）。

## やってはいけないこと
- 生成物（`nova-app/dist/`、`nova-app/src/ProjectNova.jsx`）をコミットしない。
- 100MiB を超えるファイルを作らない（GitHub が受け付けない）。原稿の部品は 45MiB でビルドが止まるので、大きくなったら文の間に印の行を足して分ける。
- Book-Summary の中身を公開版に入れない（`docs/publication-scope.md`）。
- 出典で確かめていない事実を「確認済み」と書かない。
- 新しい依存ライブラリの追加は事前に相談する。

@docs/conventions.md
