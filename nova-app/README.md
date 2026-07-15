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
`dist/index.html` が **すべて入りの単一HTMLファイル**（約20MB）です。Book-Summary（971冊）も
含め、全ハブがこの1ファイルに統合されています。リネームしてダブルクリックで開けます。

### Book-Summary の埋め込み方式（Blob URL）
Book-Summary は 7MB 超の巨大な単一HTML（独自スクリプト多数）。`srcDoc` で埋め込むと
「親のロード後に注入」される形になり、ブラウザが大容量インラインスクリプトを実行しない制約に
当たる。そこで実行時に `Blob` 化して `iframe.src = URL.createObjectURL(blob)` で読み込む。
これにより単一ファイルのままスクリプト実行・履歴ナビ(#/route)・検索・ダークモードが動作する。
（`public/booksummaryhub.html` を `?raw` で取り込み、build 時に本体へインライン化している。）

### 進捗の保存について
- 本体（Finance 等）の進捗＝右下「進捗を保存 / 復元」＋ localStorage で保存。
- Book-Summary の進捗（既読・クイズ・メモ）：**http(s) 配信なら自動保存**。
  file:// でダブルクリック起動の場合、Blob が不透明オリジンのためセッション内のみ。
  恒久保存したいときは下記ホスティングを推奨。

### 一番おすすめ: ホスティング
`dist/index.html` を Netlify / Vercel / GitHub Pages に置くと URL ひとつで全機能が動き、
Book-Summary の進捗も含めて自動保存が全ブラウザで確実に効く。

## 静的ホスティング（任意）
`npm run build` で生成される `dist/` は、Netlify / Vercel / GitHub Pages などに
そのまま配置できます（SPA なので特別なサーバー設定は不要）。
