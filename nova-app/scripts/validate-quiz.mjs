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
  { name: 'Station_DP900', arrays: [['BANK','obj']] },
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
const pct = (x) => (x * 100).toFixed(1) + '%';
// 長さの手がかりの統計。rows = [[選択肢の文字列配列, 正解index], ...]
function skewStat(rows) {
  let n = 0, hit = 0, share = 0, want = 0;
  for (const [t, a] of rows) {
    if (!t[a]) continue;
    const Ls = t.map(len), mx = Math.max(...Ls);
    n++; want += 1 / t.length;
    if (Ls[a] === mx) { share++; if (Ls.indexOf(mx) === a) hit++; }
  }
  return { n, hit: n ? hit / n : 0, share: n ? share / n : 0, want: n ? want / n : 0 };
}
const skewExtra = []; // 定数でない形（buildQuestions など）のバンクの統計をここに足す
const log = (s) => process.stdout.write(s + '\n');

for (const st of STATIONS) {
  const anchor = text.indexOf('const ' + st.name);
  if (anchor < 0) { log(`✗ ${st.name}: station not found`); hardFail++; continue; }
  for (const [arrName, fmt] of st.arrays) {
    let value;
    try { value = extract(arrName, anchor); } catch (e) { log(`✗ ${st.name}.${arrName}: ${e.message}`); hardFail++; continue; }
    const seenQ = new Set();
    let n = 0, taggedRows = 0, dupQ = 0, fails = 0;
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
      }
    }
    if (taggedRows > 0) { log(`  ✗ ${st.name}.${arrName}: ${taggedRows} row(s) contain self-incriminating tags`); fails += taggedRows; }
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
  let m, n = 0, fails = 0, taggedRows = 0;
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
  }
  if (taggedRows > 0) { log(`  ✗ choices/ans: ${taggedRows} row(s) contain self-incriminating tags`); fails += taggedRows; }
  hardFail += fails;
  log(`${fails ? '✗' : '✓'} choices/ans (non-cert hubs): ${n} items` + (fails ? ` — ${fails} error(s)` : ''));
}

// ── MegaTech ハブ: opts:[<string>...], a:N（英語は optsEn）形式を横断検査 ──
//   文字列選択肢配列を波括弧対応で切り出し、非空・相異・正解index・タグ・長さバイアスを検査する。
{
  const re = /\bopts:\s*\[/g;
  let m, n = 0, fails = 0, taggedRows = 0;
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
  }
  if (taggedRows > 0) { log(`  ✗ opts/a: ${taggedRows} row(s) contain self-incriminating tags`); fails += taggedRows; }
  hardFail += fails;
  log(`${fails ? '✗' : '✓'} opts/a (MegaTech hub): ${n} items` + (fails ? ` — ${fails} error(s)` : ''));
}

// ── Linguistics ハブ: buildQuestions([[d,q,A,B,C,D,ansIdx,exp], ...]) 形式を検査 ──
//   タプル配列を波括弧対応で切り出し、choices(2..5)/ansIdx(6) を取り出して長さバイアス等を検査する。
{
  const re = /buildQuestions\(\s*\[/g;
  let m, n = 0, fails = 0;
  const bqRows = [];
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
      bqRows.push([ch, a]);
      const where = `buildQuestions#${n - 1}`;
      if (ch.some((o) => String(o).trim() === '')) { log(`  ✗ ${where}: empty option`); fails++; }
      if (new Set(ch.map(norm)).size !== ch.length) { log(`  ✗ ${where}: duplicate option`); fails++; }
      if (ch.some((o) => TAG_RE.test(o))) { log(`  ✗ ${where}: self-incriminating tag`); fails++; }
    }
  }
  hardFail += fails;
  { const s = skewStat(bqRows); if (s.n >= 20) skewExtra.push({ id: 'buildQuestions', ...s }); }
  log(`${fails ? '✗' : '✓'} buildQuestions (Linguistics hub): ${n} items` + (fails ? ` — ${fails} error(s)` : ''));
}

// ---- 長さの手がかり検査（全バンク横断・キーの書き方を問わない） ----------
// 定数を評価して中身から判定するので、キーの書き方（opts / "o" / choices）に関係なく全問が対象。
//
// 長さの手がかりは両方向とも潰す（.claude/skills/quiz-authoring）:
//   hit   : 「最長を選ぶ（同点は上から）」で正解を引く率。偶然(1/選択肢数)の1.5倍を超えたら、
//           長い選択肢を選ぶだけで得をする（元々の欠陥）。
//   share : 正解が最長（同点を含む）である率。偶然の1/2を下回ったら、最長を消すだけで
//           1択減らせる（逆向きの欠陥。以前は「正解が厳密に最長なら失敗」としていたため、
//           全バンクで正解が厳密に最長になる問題が0件になっていた）。
// 目標は share が 1/選択肢数 の近く。帯の外にあるバンクは SKEW_SNAPSHOT に現状を記録し、
// そこから悪化したら失敗（ラチェット）。帯に入ったら行ごと消す。新しく帯の外に出るのは即失敗。
// 現状の一覧は `node scripts/validate-quiz.mjs --skew`、貼り付け用は `--snapshot`。
{
  const SKEW_SNAPSHOT = {
    // 2026-09-27 時点で帯の外にあるバンク（すべて share が低すぎる側）。直したら行を消す。
    'AB100_HARD#0': { hit: 0.0187, share: 0.0440 },
    'AB410_HARD#0': { hit: 0.0359, share: 0.0717 },
    'AB620_HARD#0': { hit: 0.0092, share: 0.0338 },
    'ACAD_QUIZ#0': { hit: 0.0485, share: 0.1117 },
    'AI103_HARD#0': { hit: 0.0277, share: 0.0523 },
    'AI200_HARD#0': { hit: 0.0462, share: 0.0738 },
    'AI300_HARD#0': { hit: 0.0340, share: 0.0520 },
    'AIGP_HARD#0': { hit: 0.0000, share: 0.0779 },
    'BANK_EXTRA#0': { hit: 0.0345, share: 0.0828 },
    'BANK#10': { hit: 0.0280, share: 0.0400 },
    'BANK#11': { hit: 0.0340, share: 0.0920 },
    'BANK#12': { hit: 0.0540, share: 0.0940 },
    'BANK#13': { hit: 0.0460, share: 0.1020 },
    'BANK#14': { hit: 0.0440, share: 0.0860 },
    'BANK#15': { hit: 0.0395, share: 0.0889 },
    'BANK#16': { hit: 0.0458, share: 0.0837 },
    'BANK#3': { hit: 0.0120, share: 0.0120 },
    'BANK#5': { hit: 0.0000, share: 0.0196 },
    'BANK#6': { hit: 0.0000, share: 0.0157 },
    'BANK#7': { hit: 0.0100, share: 0.0320 },
    'BANK#8': { hit: 0.0213, share: 0.0440 },
    'BANK#9': { hit: 0.0359, share: 0.0697 },
    'buildQuestions': { hit: 0.0940, share: 0.1011 },
    'CCAF_EXAM_HARD#0': { hit: 0.0000, share: 0.0000 },
    'CHECK_AX_GEN4#0': { hit: 0.0300, share: 0.0600 },
    'DP900_HARD#0': { hit: 0.0256, share: 0.0769 },
    'EXAM_SET3#0': { hit: 0.0308, share: 0.1077 },
    'GH300_HARD#0': { hit: 0.0462, share: 0.1077 },
    'GH600_HARD#0': { hit: 0.0340, share: 0.0580 },
    'GH900_HARD#0': { hit: 0.0308, share: 0.0677 },
    'ISO42001F_HARD#0': { hit: 0.0250, share: 0.0375 },
    'MOCK2#0': { hit: 0.0154, share: 0.0308 },
    'MOCK4#0': { hit: 0.0769, share: 0.1077 },
    'MOCK5#0': { hit: 0.0769, share: 0.1231 },
    'SAA_EXAM_HARD#0': { hit: 0.0000, share: 0.0000 },
    'SET1#10': { hit: 0.0500, share: 0.0750 },
    'SET1#2': { hit: 0.0200, share: 0.0800 },
    'SET1#5': { hit: 0.0000, share: 0.0857 },
    'SET1#6': { hit: 0.0714, share: 0.1143 },
    'SET1#8': { hit: 0.0250, share: 0.0500 },
    'SET3#1': { hit: 0.0400, share: 0.1200 },
    'SET5#1': { hit: 0.0600, share: 0.1000 },
  };
  const TOL = 0.005;
  const OPT_KEYS = ['opts', 'choices', 'o', 'options'];
  const ANS_KEYS = ['a', 'ans', 'answer', 'correct'];
  const optText = (o) => (typeof o === 'string' ? o : (o && (o.ja || o.text || o.t || o.label)) || '');
  // 同じ名前の定数が各ハブモジュールに1つずつあるため、最初の宣言だけでなく全宣言を見る
  const decls = [...text.matchAll(/(?:const|var|let)\s+([A-Z][A-Z0-9_]{2,})\s*=\s*\[/g)].map((m) => [m[1], m.index]);
  const seenDecl = {};
  const banks = [...skewExtra];
  for (const [name, at] of decls) {
    let v;
    try { v = extract(name, at); } catch (e) { continue; }
    if (!Array.isArray(v) || v.length < 20) continue;
    const r0 = v[0];
    if (!r0 || typeof r0 !== 'object') continue;
    const ok = OPT_KEYS.find((k) => Array.isArray(r0[k]));
    const ak = ANS_KEYS.find((k) => typeof r0[k] === 'number');
    if (!ok || ak === undefined) continue;
    const d = (seenDecl[name] = (seenDecl[name] || 0)); seenDecl[name]++;
    const s = skewStat(v.filter((row) => Array.isArray(row[ok]) && typeof row[ak] === 'number').map((row) => [row[ok].map(optText), row[ak]]));
    if (s.n >= 20) banks.push({ id: `${name}#${d}`, ...s });
  }
  let fails = 0, inBand = 0, clearable = 0;
  const rows = [];
  for (const b of banks) {
    const okHit = b.hit <= b.want * 1.5 + 1e-9, okShare = b.share >= b.want / 2 - 1e-9;
    const snap = SKEW_SNAPSHOT[b.id];
    let mark = ' ';
    if (okHit && okShare) { inBand++; if (snap) { clearable++; mark = '−'; } }
    else if (!snap) { fails++; mark = '✗'; log(`  ✗ length-skew: ${b.id} is newly out of band (hit ${pct(b.hit)}, share ${pct(b.share)}, chance ${pct(b.want)}) — fix the items; add a SKEW_SNAPSHOT row only for a new bank whose fix is planned`); }
    else if (b.hit > snap.hit + TOL || b.share < snap.share - TOL) { fails++; mark = '✗'; log(`  ✗ length-skew: ${b.id} got worse — hit ${pct(snap.hit)}→${pct(b.hit)}, share ${pct(snap.share)}→${pct(b.share)} (chance ${pct(b.want)})`); }
    else mark = '!';
    rows.push({ mark, ...b, snap });
  }
  if (process.argv.includes('--skew')) {
    for (const r of [...rows].sort((p, q) => p.share / p.want - q.share / q.want)) log(`  ${r.mark} ${r.id.padEnd(22)} n=${String(r.n).padStart(5)} hit=${pct(r.hit).padStart(6)} share=${pct(r.share).padStart(6)} chance=${pct(r.want)}`);
  }
  if (process.argv.includes('--snapshot')) {
    for (const r of rows.filter((x) => x.mark === '!' || x.mark === '✗').sort((p, q) => p.id.localeCompare(q.id))) log(`    '${r.id}': { hit: ${r.hit.toFixed(4)}, share: ${r.share.toFixed(4)} },`);
  }
  hardFail += fails;
  const items = banks.reduce((a, b) => a + b.n, 0);
  log(`${fails ? '✗' : '✓'} length-skew across ${banks.length} banks / ${items} items — ${inBand} in band (share ≥ chance/2, hit ≤ chance×1.5), ${banks.length - inBand} still lopsided` + (clearable ? `, ${clearable} snapshot row(s) can now be removed` : '') + (fails ? ` — ${fails} failure(s)` : ''));
}

// ---- 実測データの出所検査 -------------------------------------------------
// FT_STAT は FT_ARCH（実在109件の生データ）から前計算した定数。生データを編集すると
// 静かにずれるため、毎ビルドで再計算して突き合わせる。あわせて、問題文に直接書いた
// 数字（補間でなくリテラル）も生データと一致しているか確認する。
{
  let fails = 0;
  try {
    const ARCH = extract('FT_ARCH');
    const STAT = extract('FT_STAT');
    const META = extract('FT_META');
    const eq = (what, declared, recomputed) => {
      if (JSON.stringify(declared) !== JSON.stringify(recomputed)) {
        log(`  ✗ provenance: ${what} — the constant says ${JSON.stringify(declared)}, recomputing from FT_ARCH gives ${JSON.stringify(recomputed)}`);
        fails++;
      }
    };
    eq('FT_META.nArch', META.nArch, ARCH.length);

    const cloud = {};
    ARCH.forEach((c) => (c.cl || []).forEach((k) => { cloud[k] = (cloud[k] || 0) + 1; }));
    ['AWS', 'Google Cloud', 'Azure'].forEach((k) => eq(`cloud presence ${k}`, STAT.cloud[k] || 0, cloud[k] || 0));

    const combo = {};
    ARCH.forEach((c) => { const k = (c.cl && c.cl.length) ? c.cl.slice().sort().join(' + ') : '特定不可'; combo[k] = (combo[k] || 0) + 1; });
    (STAT.combo || []).forEach(([k, n]) => eq(`combination "${k}"`, n, combo[k] || 0));

    Object.keys(STAT.byCat || {}).forEach((cat) => {
      const rows = ARCH.filter((c) => c.c === cat);
      eq(`category ${cat} count`, STAT.byCat[cat].n, rows.length);
      Object.keys(STAT.byCat[cat].c || {}).forEach((k) => {
        eq(`category ${cat} / ${k}`, STAT.byCat[cat].c[k], rows.filter((c) => (c.cl || []).indexOf(k) >= 0).length);
      });
    });

    (STAT.layers || []).forEach((l) => {
      eq(`layer ${l.k} case count`, l.n, ARCH.filter((c) => c.L.some(([k]) => k === l.k)).length);
    });

    eq('flow-described count', STAT.flowN, ARCH.filter((c) => c.fi === 1).length);
    eq('distinct orgs', STAT.orgN, new Set(ARCH.map((c) => c.o)).size);

    // 問題文・本文に直接書いた数字。補間でないので、生データが動くとここだけ取り残される。
    const claims = [
      ['AWSの登場が75件', () => cloud['AWS']],
      ['Google Cloudが60件', () => cloud['Google Cloud']],
      ['Azureが8件', () => cloud['Azure']],
    ];
    claims.forEach(([phrase, calc]) => {
      if (text.indexOf(phrase) < 0) return;                       // 文言を変えたなら検査対象外
      const want = Number(String(phrase).match(/(\d+)件/)[1]);
      if (want !== calc()) {
        log(`  ✗ provenance: 本文に「${phrase}」とあるが、FT_ARCH から数え直すと ${calc()}`);
        fails++;
      }
    });
  } catch (e) {
    log(`  ✗ provenance: could not verify (${String(e.message).slice(0, 90)})`);
    fails++;
  }
  hardFail += fails;
  log(`${fails ? '✗' : '✓'} provenance (measured architecture data)` + (fails ? ` — ${fails} mismatch(es)` : ''));
}

log(`\nTotal items checked: ${totalItems}`);
log(`Hard errors: ${hardFail}`);
log(`Warnings: ${warn}`);
if (hardFail > 0) { log('\nFAILED: quiz data has integrity errors.'); process.exit(1); }
log('\nOK: all quiz banks pass integrity checks.');
