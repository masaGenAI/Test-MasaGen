# 公開範囲の決めごと（公開版とローカル版）

2026-11-27 作成。Book-Summary を公開サイトに出さないことにした理由と、切り替え方、本人にしかできない残りの作業をまとめる。

## 何を決めたか（What）

| | 公開版 | ローカル版（全部入り） |
|---|---|---|
| 作り方 | `npm run build:public` | `npm run build` |
| 使う場面 | GitHub Pages に出す（`.github/workflows/deploy-pages.yml`） | 自分の PC で開く |
| Book-Summary | **入れない**（開くと「公開版には入れていません」と出る） | 入る |
| 外すもの | `booksummaryhub.html`・`booksummary-*.js`・`kindle-figs/`・横断検索の書名索引 | なし |
| それ以外のハブ | 同じ | 同じ |

切り替えは `nova-app/vite.config.js` の `mode === "public"` の1か所。アプリ側は `NOVA_PUBLIC_BUILD`（`src/parts/60-embedded/010-html-loader.jsx`）を見る。

## なぜ（Why）

Book-Summary には、有料・会員制のサービスや市販の本をもとにした要約が入っている。誰でも見られる場所に置くと、出典元の利用条件に触れるおそれがある。

- flier の利用規約（2026-06-05 改定）は、要約本文を生成AIに読み込ませること（第9条5号）、自動化した手段でのデータ取得（同18号）、同意のない転載（第11条2項）を禁じている。出典：[flier 利用規約](https://www.flierinc.com/doc/terms)
- Kindle の本の要約（59冊）は、元の本のかなりの分量を要約したもの。
- TechHub の Gartner 図（`gartner-figs/`、692枚）は、公開されている Instagram 投稿を日本語で組み直したもので、今回は外していない。Gartner は社外での利用に独自の基準を置いているので、気になる場合は同じ方法で外せる。出典：[Gartner Content Compliance Policy](https://www.gartner.com/en/about/policies/content-compliance)

規約の解釈を確定させるものではない。判断に迷う点は、規約の原文か専門家に当たること。

## 残っている作業（本人にしかできないこと）

公開版から外しても、**リポジトリ自体が公開のまま**だと、原稿（`nova-app/public/booksummaryhub.html`）と過去の履歴は誰でも読める。ここは GitHub の設定なので、Claude からは変えられない。

1. **リポジトリを非公開にする**：GitHub のリポジトリ画面 → Settings → General → いちばん下の Danger Zone → Change repository visibility → Make private。履歴ごと非公開になる。
2. **公開サイトをどうするか選ぶ**（下の表）。

| 選び方 | できること | 必要なもの |
|---|---|---|
| A. GitHub Pages を続ける | 公開版（Book-Summary 抜き）を今の URL で使い続ける。Book-Summary は PC のローカル版で読む | 非公開リポジトリで Pages を使うには有料プラン（Pro など）が要る。サイト自体は誰でも見られるままなので、公開版のビルドを使う |
| B. ログインが要るホスティングへ移す | 全部入りの版を、スマホからも自分だけが開ける | 例：Cloudflare Pages ＋ Cloudflare Access。1ファイル 25MiB までの上限があり、今は Certification Hub の読み込みファイル（約28MiB）が超えるので、先に分割が要る |
| C. 何もしない | 今のまま | 上の「なぜ」の心配が残る |

出典：
- 非公開リポジトリでの Pages は GitHub Pro・Team・Enterprise で使える（Free は公開リポジトリだけ）：[GitHub Docs: What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- 閲覧者を絞った Pages の公開は Enterprise Cloud の組織向け：[GitHub Docs: Changing the visibility of your GitHub Pages site](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)
- Cloudflare Pages の上限（1ファイル 25MiB、無料プランは 20,000 ファイル）：[Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits)
- Cloudflare Access の無料プラン（50ユーザーまで）：[Cloudflare Zero Trust plans](https://www.cloudflare.com/plans/sase-zero-trust/)

料金や上限は変わるので、決める前に上のページで確かめること。

## ローカル版の使い方（How）

```bash
cd nova-app
npm install        # 初回だけ
npm run build      # dist/ に全部入りの版ができる
npm run preview    # 表示された http://localhost:4173 を開く
```

- 進捗はブラウザごとに保存される。公開版とローカル版は別の場所（別のアドレス）なので、進捗も別になる。
  移すときは、画面左下の「進捗バックアップ」で書き出して、もう一方で読み込む。
- `dist/index.html` をダブルクリックで開くこともできる。その場合、Book-Summary は同じフォルダの `booksummaryhub.html` を直接開く。

## 元に戻すとき

公開版にも Book-Summary を入れる形に戻すには、`.github/workflows/deploy-pages.yml` の `npm run build:public` を `npm run build` に戻す（1行）。
