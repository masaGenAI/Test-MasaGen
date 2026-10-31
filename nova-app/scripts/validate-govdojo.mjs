#!/usr/bin/env node
// ガバナンス道場の主要な事実の照合（data/govdojo/facts.json の規則）。
// 規制マップ・業界別チェック・ローコード・実務キット・比較表・判定演習・シナリオの文字列を文ごとに見て、
// 古い日付や取り違えが残っていたら終了コード 1 を返す。  実行: node scripts/validate-govdojo.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'src', 'ProjectNova.jsx');
const FACTS = path.resolve(__dirname, '..', '..', 'data', 'govdojo', 'facts.json');
const text = fs.readFileSync(SRC, 'utf8');
const { rules } = JSON.parse(fs.readFileSync(FACTS, 'utf8'));

function extract(name) {
  const m = new RegExp('const\\s+' + name + '\\s*=\\s*').exec(text);
  if (!m) throw new Error('not found: ' + name);
  let i = m.index + m[0].length;
  const open = text[i], close = open === '{' ? '}' : ']';
  let depth = 0, inStr = false, q = null, esc = false;
  for (; i < text.length; i++) {
    const c = text[i];
    if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
    if (c === open) depth++;
    else if (c === close && --depth === 0) return (0, eval)('(' + text.slice(m.index + m[0].length, i + 1) + ')');
  }
  throw new Error('unbalanced: ' + name);
}

const strings = [];
const walk = (o, where) => {
  if (typeof o === 'string') strings.push([where, o]);
  else if (Array.isArray(o)) o.forEach((v, i) => walk(v, where + '[' + i + ']'));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) if (k !== 'url') walk(v, where + '.' + k);
};
for (const n of ['GOVREG_ITEMS', 'GOVIND', 'GOVLC', 'GOVKIT', 'GOVREG_CMP']) walk(extract(n), n);
// 判定演習とシナリオの錯乱肢はわざと誤りなので見ない。正解・設問・解説・フィードバック・原則だけを見る
extract('GOVDOJO_BANK').forEach((q, i) => {
  const w = 'GOVDOJO_BANK[' + i + ']';
  for (const k of ['q', 'qEn', 'e', 'eEn']) if (q[k]) strings.push([w + '.' + k, q[k]]);
  if (q.o) strings.push([w + '.o[a]', q.o[q.a]]);
  if (q.oEn) strings.push([w + '.oEn[a]', q.oEn[q.a]]);
});
extract('GOVDOJO_SCENARIOS').forEach((sc, i) => {
  const w = 'GOVDOJO_SCENARIOS[' + i + ']';
  for (const k of ['title', 'setup', 'titleEn', 'setupEn']) if (sc[k]) strings.push([w + '.' + k, sc[k]]);
  (sc.steps || []).forEach((st, j) => {
    for (const k of ['q', 'qEn', 'principle', 'principleEn']) if (st[k]) strings.push([w + '.steps[' + j + '].' + k, st[k]]);
    (st.choices || []).forEach((c, m) => {
      for (const k of ['fb', 'fbEn']) if (c[k]) strings.push([w + '.steps[' + j + '].choices[' + m + '].' + k, c[k]]);
      if (c.ok) for (const k of ['t', 'tEn']) if (c[k]) strings.push([w + '.steps[' + j + '].choices[' + m + '].' + k, c[k]]);
    });
  });
});

let bad = 0;
for (const r of rules) {
  const forbid = r.forbid.map((p) => new RegExp(p));
  const unless = (r.unless || []).filter(Boolean).map((p) => new RegExp(p));
  for (const [where, s] of strings) {
    for (const sent of s.split(/(?<=。)|(?<=\.)\s+(?=[A-Z"(])/)) {
      if (!forbid.some((re) => re.test(sent)) || unless.some((re) => re.test(sent))) continue;
      bad++;
      if (bad <= 40) console.log(`[${r.id}] ${where}: ${sent.trim().slice(0, 140)}`);
    }
  }
}
console.log(`ガバナンス道場の事実照合: 規則 ${rules.length} 件・文字列 ${strings.length} 件・食い違い ${bad} 件`);
process.exit(bad ? 1 : 0);
