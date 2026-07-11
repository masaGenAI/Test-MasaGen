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

## 単一 HTML ファイルとして書き出す（ターミナル不要で配布したいとき）
`vite-plugin-singlefile` により、すべてを 1 つの HTML に埋め込んだファイルを生成できます。
生成された HTML は、ダブルクリックするだけでブラウザで開けます（Node.js もサーバーも不要）。

```bash
npm run build          # dist/index.html が単一ファイルとして出力される
```

`dist/index.html` をリネームして配布すれば、受け取った人はダブルクリックで開くだけで使えます。

## 静的ホスティング（任意）
`npm run build` で生成される `dist/` は、Netlify / Vercel / GitHub Pages などに
そのまま配置できます（SPA なので特別なサーバー設定は不要）。
