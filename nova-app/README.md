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
`dist/index.html` が本体（ポータルと小さいハブ）の HTML ファイルです（約3MB）。大きいハブは本体に埋め込まず、
同じフォルダの別ファイルを、そのハブを開いたときに読み込みます。

| ファイル | 中身 | 読み込むとき |
|---|---|---|
| `index.html` | ポータル・Language・Training・Learning Tracker・Anything Memo | 最初に開いたとき |
| `nova-hub-finance-<hash>.js` | Finance Hub（約8MB） | Finance Hub を開いたとき |
| `nova-hub-megatech-<hash>.js` | TechHub（約25MB） | TechHub を開いたとき |
| `nova-hub-consulting-<hash>.js` | Consulting Hub（約4MB） | Consulting Hub を開いたとき |
| `nova-hub-certification-<hash>.js` | Certification Hub（約38MB） | Certification Hub を開いたとき（弱点レーダーで CLF の記録を数えるときも） |
| `nova-hub-linguisticshub-<hash>.js` | Linguistics Hub（約4MB） | Linguistics Hub を開いたとき（弱点レーダーで Linguistics の記録を数えるときも） |
| `nova-hub-sidework-<hash>.js` | Side Work Hub（約5MB） | Side Work Hub を開いたとき |
| `booksummaryhub.html` / `liberal-arts.html` | Book-Summary / リベラルアーツ | そのハブを開いたとき |

`dist/` は**フォルダごと**配置・コピーしてください。`index.html` だけを持ち出すと、上の別ファイルのハブは
「読み込めませんでした」という案内を出して開きません（ポータルとほかのハブは動きます）。
`nova-hub-*.js` は通常の `<script>` で読み込むので、`index.html` をダブルクリック（file://）で開いても、
同じフォルダに `nova-hub-*.js` があれば開けます（Book-Summary とリベラルアーツは file:// では開けず、案内が出ます）。

これらのハブの原稿は `src/ProjectNova.jsx` の中のまま（検査スクリプトやスキルが直接読むため）で、
ビルドのときにだけ `scripts/lazy-hubs.mjs`（Vite プラグイン）が切り出します。ポータルが最初の描画で使う値
（TechHub のタブ数・Linguistics の分野数・Mastery Track の問題数・横断検索の項目・弱点レーダーが読む Finance の保存キー）は
ビルド時に計算して本体に埋め込みます。切り出すハブの一覧と、ハブの外からその中身を読む箇所を増やすときの決まりは、
`vite.config.js` の `novaLazyHubs` を参照してください。

### Book-Summary の埋め込み方式（Blob URL）
Book-Summary は 7MB 超の巨大な単一HTML（独自スクリプト多数）。`srcDoc` で埋め込むと
「親のロード後に注入」される形になり、ブラウザが大容量インラインスクリプトを実行しない制約に
当たる。そこで実行時に `Blob` 化して `iframe.src = URL.createObjectURL(blob)` で読み込む。
これにより単一ファイルのままスクリプト実行・履歴ナビ(#/route)・検索・ダークモードが動作する。
（`public/booksummaryhub.html` を `?raw` で取り込み、build 時に本体へインライン化している。）

### 進捗の保存について
- 本体（Finance 等）の進捗＝右下「進捗を保存 / 復元」＋ localStorage で保存。
- Book-Summary の進捗（既読・クイズ・メモ・テーマ）＝**親ページへのブリッジで永続化**。
  Blob(不透明オリジン)の iframe は localStorage 自体が使用不可のため、iframe 内の
  `window.localStorage` をメモリ実装に差し替え、書き込みを `postMessage` で親へ転送し、
  親が自身の localStorage（`bsh:store:v1`）に保存する。開くときは親のスナップショットを
  HTML 先頭に seed 注入して復元。これにより **ダブルクリック起動(file://)でも進捗が残る**。
  さらに親の localStorage は右下「進捗を保存/復元」のバックアップ対象にも含まれる。
- Safari 等 file:// で localStorage をそもそも許可しないブラウザでは、右下の
  「進捗を保存」でファイルにバックアップするか、下記ホスティングを利用する。

### 一番おすすめ: ホスティング
`dist/` を（フォルダごと）Netlify / Vercel / GitHub Pages に置くと URL ひとつで全機能が動き、
Book-Summary の進捗も含めて自動保存が全ブラウザで確実に効く。

## 静的ホスティング（任意）
`npm run build` で生成される `dist/` は、Netlify / Vercel / GitHub Pages などに
そのまま配置できます（SPA なので特別なサーバー設定は不要）。
