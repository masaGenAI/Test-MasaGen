// dist/ が、ファイルの大きさと数に上限のある置き場所に置けるかを点検する。
//   - 1ファイル 25MiB まで・20,000 ファイルまで（Cloudflare Pages の無料プランの上限。2026-11 時点）
//     https://developers.cloudflare.com/pages/platform/limits/
// 使い方: node scripts/check-dist.mjs [dist のパス]   上限を超えていたら終了コード 1
// 大きいハブは scripts/lazy-hubs.mjs が 20MiB 以下に小分けする。ここで止まるのは、それ以外のファイルが育ったとき。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(process.argv[2] || path.join(HERE, "..", "dist"));
const MAX_FILE = 25 * 1024 * 1024, MAX_COUNT = 20000;
if (!fs.existsSync(DIST)) { console.error("check-dist: " + DIST + " がありません（先に npm run build）"); process.exit(1); }
const files = [];
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else files.push([path.relative(DIST, p), fs.statSync(p).size]); } };
walk(DIST);
files.sort((a, b) => b[1] - a[1]);
const mib = (n) => (n / 1048576).toFixed(1) + "MiB";
const big = files.filter((f) => f[1] > MAX_FILE);
const total = files.reduce((s, f) => s + f[1], 0);
big.forEach(([f, n]) => console.error(`ERROR ${f}: ${mib(n)}（上限 ${mib(MAX_FILE)}）`));
if (files.length > MAX_COUNT) console.error(`ERROR ファイル数 ${files.length}（上限 ${MAX_COUNT}）`);
const ok = !big.length && files.length <= MAX_COUNT;
console.log(`${ok ? "OK" : "NG"}: dist ${files.length} ファイル・計 ${mib(total)}・最大 ${files.length ? files[0][0] + " " + mib(files[0][1]) : "-"}`);
process.exit(ok ? 0 : 1);
