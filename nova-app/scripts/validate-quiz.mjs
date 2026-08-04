#!/usr/bin/env node
// クイズデータ整合性チェッカー
// 全認定ハブ（CLF/SAA/CCA-F/AICX/PL-900/AB-620/ADP）の選択式問題データが
// 品質不変条件を満たすか検査する。問題追加・編集時のリグレッション防止用。
//   実行: node scripts/validate-quiz.mjs   （npm run validate）
//   失敗（hard error）があれば終了コード 1 を返す。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'src', 'ProjectNova.jsx');
const text = fs.readFileSync(SRC, 'utf8');

const len = (s) => [...String(s)].length;
const norm = (s) => String(s).trim().replace(/\s+/g, '');

// `const/var/let NAME = [ ... ]` または `{ ... }` を波括弧対応で切り出して eval する
function extract(name, afterIdx = 0) {
  const re = new RegExp('(?:const|var|let)\\s+' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*=\\s*', 'g');
  re.lastIndex = afterIdx;
  const m = re.exec(text);
  if (!m) throw new Error('not found: ' + name);
  let i = m.index + m[0].length;
  const open = text[i], close = open === '{' ? '}' : ']';
  if (open !== '{' && open !== '[') throw new Error(name + ' is not an array/object literal');
  let depth = 0, inStr = false, q = null, esc = false;
  for (; i < text.length; i++) {
    const c = text[i];
    if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) { const lit = text.slice(m.index + m[0].length, i + 1); return (0, eval)('(' + lit + ')'); } }
  }
  throw new Error('unbalanced literal: ' + name);
}

// 誤りを自己申告してしまう括弧書きタグ（CCA-F で除去した種類）
const TAG_RE = /（[^）]*(?:推奨されない|非推奨|アンチパターン|信頼性を下げる|信頼性が下がる|顕在化しやすい|望ましくない)[^）]*）/;

// ハブ → 検査対象配列とフォーマット
//   obj      : [{d,q,o:[...],a:<idx|number[]>,e}]
//   domRowQ1 : {D1:[[q, correct, w1, w2, w3, e], ...], ...}（正解は index0）
//   rowDQOAE : [[d, q, o:[...], a:<idx>, e, ...], ...]
const STATIONS = [
  { name: 'Station_CLF', arrays: [['SET1','obj'],['SET2','obj'],['SET3','obj'],['SET4','obj'],['SET5','obj'],['MOCK1','obj'],['MOCK2','obj'],['MOCK3','obj'],['MOCK4','obj'],['MOCK5','obj']] },
  { name: 'Station_SAA', arrays: [['BANK_D1','obj'],['BANK_D2','obj'],['BANK_D3','obj'],['BANK_D4','obj'],['EXAM_SET1','obj'],['EXAM_SET2','obj'],['EXAM_SET3','obj'],['EXAM_SET4','obj'],['EXAM_SET5','obj']] },
  { name: 'Station_CCAF', arrays: [['BANK','obj'],['EXTRA','obj'],['SET1','obj'],['SET2','obj'],['SET3','obj'],['SET4','obj'],['SCEN_BANK','obj']] },
  { name: 'Station_AICX', arrays: [['EXAM_POOL','domRowQ1'],['QUIZ_EXTRA','domRowQ1']] },
  { name: 'Station_PL900', arrays: [['BANK','obj'],['BANK_EXTRA','obj'],['BANK_EXTRA2','obj'],['BANK_EXTRA3','obj'],['PL900_HARD','obj']] },
  { name: 'Station_AB620', arrays: [['BANK','obj']] },
  { name: 'Station_SC500', arrays: [['BANK','obj']] },
  { name: 'Station_SC900', arrays: [['BANK','obj']] },
  { name: 'Station_ADP', arrays: [['CORE','rowDQOAE']] },
];

// 各行を {q, opts:[...], correct:<idx|number[]|null>} に正規化
function* rows(value, fmt) {
  if (fmt === 'obj') {
    for (const r of value) yield { q: r.q, opts: r.o, correct: r.a };
  } else if (fmt === 'rowDQOAE') {
    for (const r of value) yield { q: r[1], opts: r[2], correct: r[3] };
  } else if (fmt === 'domRowQ1') {
    for (const dom of Object.keys(value)) for (const r of value[dom]) yield { q: r[0], opts: [r[1], r[2], r[3], r[4]], correct: 0 };
  }
}

let hardFail = 0, warn = 0, totalItems = 0;
const log = (s) => process.stdout.write(s + '\n');

for (const st of STATIONS) {
  const anchor = text.indexOf('const ' + st.name);
  if (anchor < 0) { log(`✗ ${st.name}: station not found`); hardFail++; continue; }
  for (const [arrName, fmt] of st.arrays) {
    let value;
    try { value = extract(arrName, anchor); } catch (e) { log(`✗ ${st.name}.${arrName}: ${e.message}`); hardFail++; continue; }
    const seenQ = new Set();
    let n = 0, allShort = 0, taggedRows = 0, dupQ = 0, fails = 0;
    for (const { q, opts, correct } of rows(value, fmt)) {
      n++; totalItems++;
      const where = `${st.name}.${arrName}#${n - 1}`;
      // 問題文の完全重複
      const key = norm(q);
      if (seenQ.has(key)) { dupQ++; } else seenQ.add(key);
      // 選択肢: 非空・相異
      if (!Array.isArray(opts) || opts.length < 2) { log(`  ✗ ${where}: options malformed`); fails++; continue; }
      if (opts.some((o) => o == null || String(o).trim() === '')) { log(`  ✗ ${where}: empty option`); fails++; }
      if (new Set(opts.map(norm)).size !== opts.length) { log(`  ✗ ${where}: duplicate option`); fails++; }
      // 自己申告タグ
      if (opts.some((o) => TAG_RE.test(String(o)))) { taggedRows++; }
      // 正解 index
      const multi = Array.isArray(correct);
      const idxs = multi ? correct : [correct];
      if (idxs.some((a) => typeof a !== 'number' || a < 0 || a >= opts.length)) { log(`  ✗ ${where}: invalid correct index ${JSON.stringify(correct)}`); fails++; continue; }
      // 単一正解のみ: 長さ帯＋誤答一致
      if (!multi) {
        const a = correct;
        const cl = len(opts[a]);
        const wrongs = opts.filter((_, i) => i !== a);
        if (wrongs.some((w) => norm(w) === norm(opts[a]))) { log(`  ✗ ${where}: distractor equals correct`); fails++; }
        if (wrongs.map(len).every((x) => x < cl)) allShort++;
      }
    }
    if (taggedRows > 0) { log(`  ✗ ${st.name}.${arrName}: ${taggedRows} row(s) contain self-incriminating tags`); fails += taggedRows; }
    if (allShort > 0) { log(`  ✗ ${st.name}.${arrName}: ${allShort} item(s) where every distractor is shorter than the correct answer`); fails += allShort; }
    if (dupQ > 0) { log(`  ⚠ ${st.name}.${arrName}: ${dupQ} duplicate question text(s)`); warn += dupQ; }
    hardFail += fails;
    const status = fails ? '✗' : '✓';
    log(`${status} ${st.name}.${arrName}: ${n} items` + (fails ? ` — ${fails} error(s)` : '') + (dupQ ? ` (${dupQ} dup-q)` : ''));
  }
}

// ── 非認定ハブ（Finance/MegaTech 等）: "choices":[{ja,en},...], "ans":N 形式を横断検査 ──
//   ハブに依存せずファイル全体を走査する。選択肢の非空・相異・正解index・自己申告タグに加え、
//   「全誤答が正解より短い」長さバイアスを hard error として検出する（認定ハブと同基準）。
{
  const re = /"choices":\s*(\[[\s\S]*?\])\s*,\s*"ans":\s*(\d+)/g;
  let m, n = 0, fails = 0, allShort = 0, taggedRows = 0;
  while ((m = re.exec(text))) {
    let opts;
    try { opts = JSON.parse(m[1]); } catch { continue; }
    if (!Array.isArray(opts) || opts.length < 2) continue;
    const ans = Number(m[2]);
    const ja = opts.map((o) => (o && o.ja != null ? o.ja : o));
    n++; totalItems++;
    const where = `choices/ans#${n - 1}`;
    if (ja.some((o) => o == null || String(o).trim() === '')) { log(`  ✗ ${where}: empty option`); fails++; }
    if (new Set(ja.map(norm)).size !== ja.length) { log(`  ✗ ${where}: duplicate option`); fails++; }
    if (ja.some((o) => TAG_RE.test(String(o)))) { taggedRows++; }
    if (typeof ans !== 'number' || ans < 0 || ans >= ja.length) { log(`  ✗ ${where}: invalid correct index ${m[2]}`); fails++; continue; }
    const cl = len(ja[ans]);
    const wrongs = ja.filter((_, i) => i !== ans);
    if (wrongs.some((w) => norm(w) === norm(ja[ans]))) { log(`  ✗ ${where}: distractor equals correct`); fails++; }
    if (wrongs.map(len).every((x) => x < cl)) allShort++;
  }
  if (taggedRows > 0) { log(`  ✗ choices/ans: ${taggedRows} row(s) contain self-incriminating tags`); fails += taggedRows; }
  if (allShort > 0) { log(`  ✗ choices/ans: ${allShort} item(s) where every distractor is shorter than the correct answer`); fails += allShort; }
  hardFail += fails;
  log(`${fails ? '✗' : '✓'} choices/ans (non-cert hubs): ${n} items` + (fails ? ` — ${fails} error(s)` : ''));
}

// ── MegaTech ハブ: opts:[<string>...], a:N（英語は optsEn）形式を横断検査 ──
//   文字列選択肢配列を波括弧対応で切り出し、非空・相異・正解index・タグ・長さバイアスを検査する。
{
  const re = /\bopts:\s*\[/g;
  let m, n = 0, fails = 0, allShort = 0, taggedRows = 0;
  while ((m = re.exec(text))) {
    const bs = text.indexOf('[', m.index);
    // 波括弧対応で配列末尾を探す（文字列内の括弧は無視）
    let depth = 0, inStr = false, q = null, esc = false, be = -1;
    for (let i = bs; i < text.length; i++) {
      const c = text[i];
      if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === q) inStr = false; continue; }
      if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
      if (c === '[') depth++; else if (c === ']') { depth--; if (depth === 0) { be = i; break; } }
    }
    if (be < 0) continue;
    let opts;
    try { opts = (0, eval)('(' + text.slice(bs, be + 1) + ')'); } catch { continue; }
    if (!Array.isArray(opts) || opts.length < 2 || !opts.every((o) => typeof o === 'string')) continue;
    const am = text.slice(be + 1, be + 2000).match(/^\s*,\s*a:\s*(\d+)/);
    if (!am) continue;
    const a = Number(am[1]);
    if (a < 0 || a >= opts.length) continue;
    n++; totalItems++;
    const where = `opts/a#${n - 1}`;
    if (opts.some((o) => o == null || String(o).trim() === '')) { log(`  ✗ ${where}: empty option`); fails++; }
    if (new Set(opts.map(norm)).size !== opts.length) { log(`  ✗ ${where}: duplicate option`); fails++; }
    if (opts.some((o) => TAG_RE.test(o))) { taggedRows++; }
    const cl = len(opts[a]);
    const wrongs = opts.filter((_, i) => i !== a);
    if (wrongs.map(len).every((x) => x < cl)) allShort++;
  }
  if (taggedRows > 0) { log(`  ✗ opts/a: ${taggedRows} row(s) contain self-incriminating tags`); fails += taggedRows; }
  if (allShort > 0) { log(`  ✗ opts/a: ${allShort} item(s) where every distractor is shorter than the correct answer`); fails += allShort; }
  hardFail += fails;
  log(`${fails ? '✗' : '✓'} opts/a (MegaTech hub): ${n} items` + (fails ? ` — ${fails} error(s)` : ''));
}

// ── Linguistics ハブ: buildQuestions([[d,q,A,B,C,D,ansIdx,exp], ...]) 形式を検査 ──
//   タプル配列を波括弧対応で切り出し、choices(2..5)/ansIdx(6) を取り出して長さバイアス等を検査する。
{
  const re = /buildQuestions\(\s*\[/g;
  let m, n = 0, fails = 0, allShort = 0;
  const matchBracket = (start) => {
    let depth = 0, inStr = false, q = null, esc = false;
    for (let i = start; i < text.length; i++) {
      const c = text[i];
      if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === q) inStr = false; continue; }
      if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
      if (c === '[') depth++; else if (c === ']') { depth--; if (depth === 0) return i; }
    }
    return -1;
  };
  while ((m = re.exec(text))) {
    const bs = text.indexOf('[', m.index), be = matchBracket(bs);
    if (be < 0) continue;
    let arr;
    try { arr = (0, eval)('(' + text.slice(bs, be + 1) + ')'); } catch { continue; }
    if (!Array.isArray(arr)) continue;
    for (const row of arr) {
      if (!Array.isArray(row) || row.length < 7) continue;
      const ch = [row[2], row[3], row[4], row[5]];
      const a = row[6];
      if (!ch.every((o) => typeof o === 'string') || typeof a !== 'number' || a < 0 || a >= ch.length) continue;
      n++; totalItems++;
      const where = `buildQuestions#${n - 1}`;
      if (ch.some((o) => String(o).trim() === '')) { log(`  ✗ ${where}: empty option`); fails++; }
      if (new Set(ch.map(norm)).size !== ch.length) { log(`  ✗ ${where}: duplicate option`); fails++; }
      if (ch.some((o) => TAG_RE.test(o))) { log(`  ✗ ${where}: self-incriminating tag`); fails++; }
      const cl = len(ch[a]);
      if (ch.filter((_, i) => i !== a).map(len).every((x) => x < cl)) allShort++;
    }
  }
  if (allShort > 0) { log(`  ✗ buildQuestions: ${allShort} item(s) where every distractor is shorter than the correct answer`); fails += allShort; }
  hardFail += fails;
  log(`${fails ? '✗' : '✓'} buildQuestions (Linguistics hub): ${n} items` + (fails ? ` — ${fails} error(s)` : ''));
}

log(`\nTotal items checked: ${totalItems}`);
log(`Hard errors: ${hardFail}`);
log(`Warnings: ${warn}`);
if (hardFail > 0) { log('\nFAILED: quiz data has integrity errors.'); process.exit(1); }
log('\nOK: all quiz banks pass integrity checks.');
