#!/usr/bin/env node
// 新規クイズ問題バッチの検査。ソースに差し込む「前」に回す。
//
//   node .claude/skills/quiz-authoring/check-batch.mjs new.json [--bank BANK_NAME]
//
// new.json は問題オブジェクトの JSON 配列。選択肢・正解のキーは自動判別する
// （o/oEn, opts, choices, options × a/ans/answer/correct）。
// --bank を渡すと ProjectNova.jsx の同名バンク全宣言と問題文を突き合わせ、
// 既存問題との重複も見る。
import fs from 'node:fs';
import path from 'node:path';

const [, , file, ...rest] = process.argv;
if (!file) { console.error('usage: check-batch.mjs <new.json> [--bank NAME]'); process.exit(2); }
const bankArg = rest.includes('--bank') ? rest[rest.indexOf('--bank') + 1] : null;

const len = (s) => [...String(s)].length;
const norm = (s) => String(s).replace(/\s+/g, '').replace(/[。、，．,.？?！!「」『』（）()]/g, '').toLowerCase();
const OPT_KEYS = ['opts', 'choices', 'o', 'options'];
const ANS_KEYS = ['a', 'ans', 'answer', 'correct'];
const Q_KEYS = ['q', 'qJa', 'question', 'stem', 'text'];
const optText = (o) => (typeof o === 'string' ? o : (o && (o.ja || o.text || o.t || o.label)) || '');

// 簡体字は cp932 で表せない字だけを見る（国・数・体などの新字体は日本語なので除外）。
// キリル文字は JIS X 0208 に収録されていて cp932 を通るため、別に見る必要がある。
const SIMPLIFIED = new Set([...'办类联备络赛长业误统这为对说样么个开无爱经济纪东车马鸟龙风飞书图华际']);
const CYRILLIC = /[Ѐ-ԯ]/;
const PADDING = ['と考えられる。', 'なお、', 'とも言える。', 'と思われる。', 'と言い換えることもできる'];
const SELF_TAG = /（[^）]*(?:推奨されない|非推奨|アンチパターン|信頼性を下げる|望ましくない)[^）]*）/;

const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
if (!Array.isArray(rows)) { console.error('top level must be an array'); process.exit(2); }

const r0 = rows[0] || {};
const ok = OPT_KEYS.find((k) => Array.isArray(r0[k]));
const ak = ANS_KEYS.find((k) => typeof r0[k] === 'number');
const qk = Q_KEYS.find((k) => typeof r0[k] === 'string');
if (!ok || ak === undefined) { console.error('could not find option/answer keys on the first item'); process.exit(2); }

const errors = [], warnings = [];
const seenQ = new Map();
let answerIsLongest = 0, counted = 0, expected = 0;
const posCount = {};

rows.forEach((r, i) => {
  const at = (msg) => errors.push(`[${i}] ${msg}`);
  const opts = r[ok], a = r[ak];
  if (!Array.isArray(opts) || opts.length < 2) return at('options missing or fewer than 2');
  if (typeof a !== 'number' || a < 0 || a >= opts.length) return at(`correct index out of range: ${a}`);
  const t = opts.map(optText);
  if (t.some((x) => !x.trim())) at('empty option');
  if (new Set(t.map(norm)).size !== t.length) at('duplicate option');
  if (t.some((x) => SELF_TAG.test(x))) at('option tags itself as wrong');

  const L = t.map(len);
  const mx = Math.max(...L);
  counted++; expected += 1 / t.length;
  posCount[a] = (posCount[a] || 0) + 1;
  // 悪用の再現: 最長を選ぶ（同点は先頭優先）で正解が選ばれてはいけない
  if (L[a] === mx && L.indexOf(mx) === a) at(`"pick the longest option" selects the answer (${L.join('/')}, answer at ${a})`);
  if (L[a] === mx) answerIsLongest++;

  const blob = [r[qk] || '', ...t, r.exp || r.e || '', r.expJa || ''].join(' ');
  for (const ch of blob) if (SIMPLIFIED.has(ch)) { at(`simplified-Chinese character ${ch}`); break; }
  if (CYRILLIC.test(blob)) at('Cyrillic character');
  for (const p of PADDING) if (t.some((x) => x.includes(p))) { at(`padding phrase ${JSON.stringify(p)}`); break; }

  if (qk) {
    const key = norm(r[qk]);
    // 設問文が同じでも、正解と選択肢一式が違えば別問題として扱う
    const sig = key + '|' + norm(t[a]) + '|' + t.map(norm).sort().join('~');
    if (seenQ.has(sig)) at(`duplicates item ${seenQ.get(sig)} (same stem, answer and options)`);
    else seenQ.set(sig, i);
    if (!seenQ.has('stem:' + key)) seenQ.set('stem:' + key, i);
    else if (seenQ.get('stem:' + key) !== i) warnings.push(`[${i}] shares its stem with item ${seenQ.get('stem:' + key)} — make sure it is genuinely a different question`);
  }
});

// 既存バンクとの重複
if (bankArg && qk) {
  const src = path.resolve('nova-app/src/ProjectNova.jsx');
  if (fs.existsSync(src)) {
    const text = fs.readFileSync(src, 'utf8');
    const existing = new Set();
    const re = new RegExp(`(?:const|var|let)\\s+${bankArg}\\s*=\\s*\\[`, 'g');
    let m;
    while ((m = re.exec(text))) {
      let d = 0, s = null, esc = false, k = text.indexOf('[', m.index);
      const open = k;
      for (; k < text.length; k++) {
        const c = text[k];
        if (s) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === s) s = null; continue; }
        if (c === '"' || c === "'" || c === '`') { s = c; continue; }
        if (c === '[' || c === '{') d++; else if (c === ']' || c === '}') { d--; if (d === 0) break; }
      }
      let v; try { v = eval('(' + text.slice(open, k + 1) + ')'); } catch { continue; }
      for (const row of v) { const q = row && row[qk]; if (typeof q === 'string') existing.add(norm(q)); }
    }
    rows.forEach((r, i) => { if (existing.has(norm(r[qk] || ''))) errors.push(`[${i}] question already exists in ${bankArg}`); });
    console.log(`checked against ${existing.size} existing ${bankArg} questions`);
  }
}

// --- 集計 ---
const n = rows.length;
const wantRate = counted ? expected / counted : 0.25;
const rate = counted ? answerIsLongest / counted : 0;
console.log(`items: ${n}`);
if (n < 100) errors.push(`batch has ${n} questions; the project minimum is 100`);

console.log(`answer-is-longest: ${(rate * 100).toFixed(0)}% (want roughly ${(wantRate * 100).toFixed(0)}%)`);
if (rate > wantRate * 1.6) warnings.push(`the answer is the longest option too often — "pick the longest" pays off`);
if (rate < wantRate / 3) warnings.push(`the answer is almost never the longest — "discard the longest" becomes a free elimination; vary which option is longest`);

const pos = Object.keys(posCount).sort();
const posLine = pos.map((k) => `${k}:${(posCount[k] / counted * 100).toFixed(0)}%`).join(' ');
console.log(`answer position: ${posLine}`);
const maxPos = Math.max(...pos.map((k) => posCount[k] / counted));
if (maxPos > wantRate * 1.5) warnings.push(`the correct answer sits in one position ${(maxPos * 100).toFixed(0)}% of the time — spread it out`);

for (const w of warnings) console.log(`  ⚠ ${w}`);
for (const e of errors) console.log(`  ✗ ${e}`);
console.log(errors.length ? `\nFAILED: ${errors.length} error(s), ${warnings.length} warning(s)`
                          : `\nOK: 0 errors, ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
