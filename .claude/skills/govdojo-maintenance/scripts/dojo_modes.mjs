// ガバナンス道場のすべての画面（GOV_MODES）を共有リンクで開き、エラー画面・実行時エラーが無いかを見る。
// TechHub のタブを開くだけのスモークテストでは、道場の中の画面の壊れに気付けないため。
// 使い方（リポジトリのルートで、npm run build のあと）: node .claude/skills/govdojo-maintenance/scripts/dojo_modes.mjs
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
const ROOT = process.cwd();
const req = createRequire(path.join(ROOT, 'nova-app/package.json'));
const { chromium } = req('playwright-core');
const src = fs.readFileSync(path.join(ROOT, 'nova-app/src/ProjectNova.jsx'), 'utf8');
const m = src.match(/const GOV_MODES = (\[[^\]]*\]);/);
if (!m) { console.error('GOV_MODES が見つからない'); process.exit(2); }
const modes = JSON.parse(m[1]);
const exe = ['/opt/pw-browsers/chromium'].find((p) => fs.existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const base = 'file://' + path.join(ROOT, 'nova-app/dist/index.html');
let bad = 0;
for (const lang of ['ja', 'en']) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; page.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await page.goto(base + '#megatech'); await page.waitForTimeout(2000);
  if (lang === 'en') { await page.getByRole('button', { name: 'EN', exact: true }).first().click(); await page.waitForTimeout(300); }
  for (const mode of modes) {
    errs.length = 0;
    await page.goto(base + '#megatech/govdojo/' + mode); await page.waitForTimeout(1200);
    const body = await page.locator('body').innerText();
    const broken = /このセクションでエラーが発生しました|Something went wrong in this section/.test(body);
    if (broken || errs.length) { bad++; console.log(`NG ${lang} ${mode}: ${broken ? (body.match(/\n([^\n]*(?:not defined|undefined|null)[^\n]*)/) || ['', 'エラー画面'])[1] : ''} ${errs.join(' / ')}`); }
  }
  await page.close();
}
await browser.close();
console.log(`道場の画面 ${modes.length} 件 × 2言語: NG ${bad} 件`);
process.exit(bad ? 1 : 0);
