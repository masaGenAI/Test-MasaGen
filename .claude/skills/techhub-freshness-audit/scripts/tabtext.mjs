// TechHub のタブの表示テキストを読む（ビルド済みの dist を開く。原稿は 100MB あるので、画面の文は画面から読むほうが速い）
//   node tabtext.mjs <tabid> [--click "ボタン名" ...] [--from N] [--len N] [--dist <dist フォルダ>] [--no-expand]
// 折りたたみ（「すべて開く」と ▼ の見出し）を全部開いてから読む。--click は順にボタン（またはタブ内のテキスト）を押して下位画面を開く。
// 既定の dist は nova-app/dist。点検中に作り直すと読んでいる途中で中身が変わるので、
// 担当者を出す前に `cp -r nova-app/dist <作業フォルダ>/dist-snap` で写しを取り、--dist で渡す。
import { createRequire } from 'module'; import { fileURLToPath, pathToFileURL } from 'url'; import path from 'path'; import fs from 'fs';
const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const a = process.argv.slice(2); const id = a[0]; const clicks = []; let from = 0, len = 12000;
let dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../nova-app/dist');
let noExpand = false;
for (let i = 1; i < a.length; i++) { if (a[i] === '--click') clicks.push(a[++i]); else if (a[i] === '--no-expand') noExpand = true; else if (a[i] === '--from') from = +a[++i]; else if (a[i] === '--len') len = +a[++i]; else if (a[i] === '--dist') dist = path.resolve(a[++i]); }
if (!id) { console.error('usage: node tabtext.mjs <tabid> [--click "ボタン名" ...] [--from N] [--len N] [--dist DIR]'); process.exit(2); }
if (!fs.existsSync(path.join(dist, 'index.html'))) { console.error('dist がありません: ' + dist + '（先に cd nova-app && npm run build）'); process.exit(2); }
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
await p.goto(pathToFileURL(path.join(dist, 'index.html')).href + '#megatech/' + id); await p.waitForTimeout(1800);
// 「すべて開く」を押し、さらに ▼ の付いた閉じた見出し（ブリーフやレーダーの項目）を1回ずつ開く。
// 開いたあとも印が変わらない見出しを閉じ直さないよう、押した見出しには目印を付けて二度押さない。
const openAll = async () => {
  await p.evaluate(() => { const x = [...document.querySelectorAll('button')].find((e) => e.textContent.trim() === 'すべて開く'); if (x) x.click(); });
  await p.waitForTimeout(300);
  if (noExpand) return;
  for (let pass = 0; pass < 4; pass++) {
    const n = await p.evaluate(() => {
      let k = 0;
      for (const e of document.querySelectorAll('span, div, button, summary')) {
        if (e.children.length || !/^▼$/.test(e.textContent.trim())) continue;
        let t = e; while (t && t !== document.body && !(t.tagName === 'BUTTON' || t.tagName === 'SUMMARY' || t.getAttribute('role') === 'button' || getComputedStyle(t).cursor === 'pointer')) t = t.parentElement;
        if (!t || t === document.body || t.dataset.ttOpened) continue;
        t.dataset.ttOpened = '1'; t.click(); k++;
      }
      return k;
    });
    if (!n) break; await p.waitForTimeout(400);
  }
};
await openAll();
for (const c of clicks) { const btn = p.getByRole('button', { name: c }).first(); if (await btn.count()) await btn.click(); else await p.getByText(c, { exact: false }).first().click().catch(() => console.error('not found: ' + c)); await p.waitForTimeout(700); await openAll(); }
const t = await p.evaluate(() => { const e = [...document.querySelectorAll('.gh-display')].find((x) => x.getBoundingClientRect().top > 300 && parseFloat(getComputedStyle(x).fontSize) >= 20); return (e ? e.parentElement.parentElement : document.body).innerText; });
console.log(`[${id}] chars=${t.length} showing ${from}-${Math.min(t.length, from + len)}`);
console.log(t.slice(from, from + len));
await b.close();
