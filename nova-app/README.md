# Project Nova — ローカルアプリ化

Claude.ai のアーティファクト（`src/ProjectNova.jsx`）を、ローカルの Web アプリとして
動かすための最小構成（Vite + React）です。

## 前提
- Node.js 18 以上（推奨: 20 / 22）

## セットアップと起動

```bash
cd nova-app
npm install          # 依存関係をインストール（初回のみ）
npm run dev          # 開発サーバー起動 → 表示された http://localhost:5173 を開く
```

本番用にビルドする場合:

```bash
npm run build        # dist/ に静的ファイルを出力
npm run preview      # ビルド結果をローカル確認
```

> ビルド時にメモリ不足になる場合は `NODE_OPTIONS=--max-old-space-size=4096 npm run build` を使ってください
> （`ProjectNova.jsx` は 15 万行超の巨大ファイルのため）。

## 構成
- `src/ProjectNova.jsx` — アップロードされたコンポーネント本体（無改変）
- `src/main.jsx` — エントリポイント。`ProjectNova` を描画する
- `index.html` — マウント先の `#root` を持つ HTML
- `vite.config.js` — Vite 設定

## 重要: `window.storage` について
`ProjectNova.jsx` は進捗・SRS・翻訳キャッシュの永続化に、Claude.ai 実行環境が提供する
`window.storage` API を使っています。通常のブラウザには存在しないため、`src/main.jsx` で
`localStorage` を使った互換ポリフィルを注入しています。これにより、リロードしても学習進捗が
保持されます。ポリフィルが無いと（try/catch されているのでアプリは落ちませんが）状態が
毎回消えてしまいます。

## ビルド成果物（配布用）
```bash
npm run build
```
`dist/` に次の2ファイルが出力されます。**この2つは必ず同じフォルダに一緒に置いてください。**

- `index.html` — 本体（Finance / MegaTech / Consulting などのハブを内蔵した単一ファイル）
- `booksummaryhub.html` — Book-Summary ハブ（971冊・検索・クイズ・メモ付きの完成版）

### なぜ Book-Summary だけ別ファイルなのか
Book-Summary は 7MB 超の巨大な単一HTML（独自スクリプト多数）で、これを本体に「埋め込み(srcDoc)」
すると、ブラウザがロード後に注入された大容量インラインスクリプトを実行しない制約に当たる。
そこで実URLの `<iframe src="booksummaryhub.html">` で読み込む方式にしている。これにより
スクリプト実行・履歴ナビ・localStorage 永続化がすべて正しく機能する。

### ダブルクリックで使う場合
`index.html`（`ProjectNova.html` にリネーム可）と `booksummaryhub.html` を**同じフォルダ**に置き、
本体をダブルクリックする。Book-Summary 以外のハブは本体だけでも動くが、Book-Summary を開くには
隣に `booksummaryhub.html` が必要。

### 一番おすすめ: ホスティング
`dist/` の中身をそのまま Netlify / Vercel / GitHub Pages に置くと、URL ひとつで全機能が動く
（file:// の制約がなく、進捗の自動保存も全ブラウザで確実に効く）。

## 静的ホスティング（任意）
`npm run build` で生成される `dist/` は、Netlify / Vercel / GitHub Pages などに
そのまま配置できます（SPA なので特別なサーバー設定は不要）。
