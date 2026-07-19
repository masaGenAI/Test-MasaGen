/* ============================================================
   ビルドスクリプト
   app.template.html（<script src="data.js"> を参照）＋ data.js から
   ・index.html   … 自己完結型・単一HTML（ダウンロードして開ける）
   ・artifact.html … claude.ai Artifact 用のコンテンツのみ版
   を生成する。問題を data.js に追記したら `node build.mjs` を実行するだけ。
   ============================================================ */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const template = readFileSync(join(dir, 'app.template.html'), 'utf8');
const data = readFileSync(join(dir, 'data.js'), 'utf8');

// 1) 自己完結版: <script src="data.js"></script> をインライン化
const selfContained = template.replace(
  /<script src="data\.js"><\/script>/,
  `<script>\n/* --- data.js インライン（build.mjs が生成。編集は data.js 側で） --- */\n${data}\n</script>`
);
writeFileSync(join(dir, 'index.html'), selfContained, 'utf8');

// 2) Artifact 版: doctype/html/head/body 等の外枠を除き、<style> と body 内容のみ
const style = selfContained.match(/<style>[\s\S]*?<\/style>/)[0];
const bodyInner = selfContained.match(/<body>([\s\S]*)<\/body>/)[1].trim();
const artifact = `${style}\n${bodyInner}\n`;
writeFileSync(join(dir, 'artifact.html'), artifact, 'utf8');

console.log('built index.html and artifact.html');
