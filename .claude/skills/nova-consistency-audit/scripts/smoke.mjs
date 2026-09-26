// Project Nova の画面を実際に開いて、表示される数字と実行時エラーを確かめる。
//
// 使い方（リポジトリのルートで。先に `cd nova-app && npm run build` で dist を作っておく）:
//   node .claude/skills/nova-consistency-audit/scripts/smoke.mjs [スクリーンショットの保存先ディレクトリ]
//
// playwright-core は nova-app/node_modules にあるので、そこから読み込む
// （スクリプトの置き場所から解決しようとすると見つからない）。
// Chromium は環境に用意済みのものを使う（playwright install はしない）。
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const ROOT = process.cwd();
const req = createRequire(path.join(ROOT, 'nova-app/package.json'));
const { chromium } = req('playwright-core');
const SHOTS = process.argv[2] || null;
const DIST = 'file://' + path.join(ROOT, 'nova-app/dist/index.html');
const BOOK = 'file://' + path.join(ROOT, 'nova-app/public/booksummaryhub.html');
if (!fs.existsSync(path.join(ROOT, 'nova-app/dist/index.html'))) {
  console.error('dist がありません。先に cd nova-app && npm run build を実行してください。');
  process.exit(1);
}

const exe = ['/opt/pw-browsers/chromium', process.env.CHROMIUM_PATH].find((p) => p && fs.existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const errors = [];
const page = await browser.newPage({ viewport: { width: 1280, height: 1100 } });
page.on('pageerror', (e) => errors.push('[page] ' + e.message.slice(0, 200)));
const text = () => page.evaluate(() => document.body.innerText);
const shot = async (name) => { if (SHOTS) await page.screenshot({ path: path.join(SHOTS, name + '.png') }); };
const pick = (t, re) => (t.match(re) || ['(見つからない)'])[0];

// 1. ポータル：目次タグと Mastery Track の見出し
await page.goto(DIST); await page.waitForTimeout(3500);
let t = await text();
const idx = t.indexOf('INDEX');
console.log('■ ポータル目次');
console.log('  ' + t.slice(idx, idx + 600).split('\n').filter(Boolean).slice(1).join(' | '));
await shot('portal');
await page.getByText('Mastery Track', { exact: true }).first().click(); await page.waitForTimeout(600);
await page.getByText('学習量の試算', { exact: true }).first().click().catch(() => {}); await page.waitForTimeout(400);
t = await text();
console.log('■ Mastery Track');
console.log('  ' + pick(t, /TechHub — クイズ[\d,]+問＋実務\d+項目/));
console.log('  ' + pick(t, /Consulting Hub — 全バンク（[\d,]+問）/));
console.log('  ' + pick(t, /問題は合計[^。]+。/));
console.log('  ' + pick(t, /前倒し圧縮版：[^\n]{0,120}/));

// 2. 各ハブを開く（開けること・実行時エラーがないこと）
const hubs = ['Consulting Hub', 'TechHub', 'Finance Hub', 'Certification Hub', 'Language Hub', 'Linguistics Hub', 'Book-Summary', 'Learning Tracker', 'Anything Memo'];
console.log('■ ハブ');
for (const h of hubs) {
  await page.goto(DIST); await page.waitForTimeout(2200);
  const before = errors.length;
  await page.getByText(h, { exact: true }).first().click(); await page.waitForTimeout(2200);
  console.log(`  ${h}: ${errors.length === before ? 'OK' : 'エラーあり'}`);
}

// 3. TechHub の全タブを順に開く。タブ名は ProjectNova.jsx の TABS（{ id, k }）とラベル辞書（tab_xxx: ["日本語", ...]）から読む。
const src = fs.readFileSync(path.join(ROOT, 'nova-app/src/ProjectNova.jsx'), 'utf8');
const mt = src.slice(src.indexOf('const MegaTechHubModule'), src.indexOf('\n// ================= ', src.indexOf('const MegaTechHubModule')));
const tabKeys = [...mt.matchAll(/\{ id: "([a-z0-9_]+)", k: "(tab_[a-z0-9_]+)" \}/g)].map((m) => m[2]);
const label = (k) => { const m = mt.match(new RegExp(k + ': \\["([^"]+)"')); return m ? m[1] : null; };
const names = [...new Set(tabKeys.map(label).filter(Boolean))];
await page.goto(DIST); await page.waitForTimeout(2500);
await page.getByText('TechHub', { exact: true }).first().click(); await page.waitForTimeout(1500);
const before = errors.length;
const missing = [];
for (const n of names) {
  const btns = page.getByRole('button', { name: n, exact: true });
  const c = await btns.count();
  if (!c) { missing.push(n); continue; }
  for (let k = 0; k < c; k++) { await btns.nth(k).click().catch(() => {}); await page.waitForTimeout(300); }
}
console.log(`■ TechHub タブ巡回: ${names.length - missing.length}/${names.length} 件, 新しいエラー ${errors.length - before} 件` + (missing.length ? `, ナビに見つからないタブ: ${missing.join('・')}` : ''));
await shot('techhub');

// 4. Book-Summary ハブ：出典ごとの件数と単位
const bp = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
bp.on('pageerror', (e) => errors.push('[book] ' + e.message.slice(0, 200)));
await bp.goto(BOOK); await bp.waitForTimeout(2000);
const bt = await bp.evaluate(() => document.body.innerText);
const bi = bt.indexOf('SOURCES');
console.log('■ Book-Summary 出典');
console.log('  ' + bt.slice(bi, bi + 400).split('\n').filter(Boolean).join(' | '));

console.log('■ 実行時エラー: ' + errors.length + ' 件');
errors.slice(0, 10).forEach((e) => console.log('  ' + e));
await browser.close();
process.exit(errors.length ? 2 : 0);
