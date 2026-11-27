#!/usr/bin/env node
// 体系図（Consulting Hub「体系図」タブ）のデータ整合性チェッカー
// ATLAS_JA / ATLAS_EN を src/ProjectNova.jsx から取り出し、分類・参照・日英の構造一致を検査する。
//   実行: node scripts/validate-atlas.mjs   （npm run validate / prebuild）
//   失敗（hard error）があれば終了コード 1 を返す。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { syncNova } from './nova-src.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
syncNova({ quiet: true }); // 原稿の部品（src/parts）と写し（src/ProjectNova.jsx）をそろえてから読む
const text = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'ProjectNova.jsx'), 'utf8');

// `const NAME = { ... }` を波括弧対応で切り出して JSON として読む
function extract(name) {
  const m = new RegExp('const\\s+' + name + '\\s*=\\s*').exec(text);
  if (!m) throw new Error('not found: ' + name);
  let i = m.index + m[0].length, depth = 0, inStr = false, esc = false;
  const start = i;
  for (; i < text.length; i++) {
    const c = text[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') { inStr = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return JSON.parse(text.slice(start, i + 1)); }
  }
  throw new Error('unbalanced: ' + name);
}

const JA = extract('ATLAS_JA');
const EN = extract('ATLAS_EN');
const errs = [];
const JP = /[぀-ヿ㐀-鿿！-｠]/;

function checkLang(A, tag, qmark) {
  const ids = new Set();
  const byCat = {};
  for (const it of A.items) {
    if (!/^[LSF][1-6]-\d{2}$/.test(it.id)) errs.push(`${tag} ID形式不正: ${it.id}`);
    if (ids.has(it.id)) errs.push(`${tag} ID重複: ${it.id}`);
    ids.add(it.id);
    const cat = it.id.slice(0, 2);
    if (!A.cats[cat] || A.cats[cat].layer !== it.id[0]) errs.push(`${tag} カテゴリ不正: ${it.id}`);
    (byCat[cat] = byCat[cat] || []).push(+it.id.slice(3));
    for (const k of ['n', 'en', 'by', 'y', 'd', 's', 'c', 'ai', 'ask']) if (typeof it[k] !== 'string' || !it[k]) errs.push(`${tag} 欠損 ${k}: ${it.id}`);
    if (it.ask && !it.ask.trim().endsWith(qmark)) errs.push(`${tag} 問いの末尾: ${it.id}`);
    if (!it.m || !it.m.length || it.m.some((m) => !A.meta[m])) errs.push(`${tag} メタ原理不正: ${it.id}`);
    if (it.id[0] === 'L' ? !A.grades[it.g] : it.g) errs.push(`${tag} 根拠グレード不正: ${it.id}`);
  }
  for (const [c, nums] of Object.entries(byCat)) nums.forEach((n, i) => { if (n !== i + 1) errs.push(`${tag} 連番の欠落: ${c}`); });
  const need = (arr, where, layer) => (arr || []).forEach((id) => {
    if (!ids.has(id)) errs.push(`${tag} 参照切れ ${id}: ${where}`);
    else if (layer && id[0] !== layer) errs.push(`${tag} 層違い ${id}: ${where}`);
  });
  A.items.forEach((it) => { need(it.r, it.id); if (it.r.includes(it.id)) errs.push(`${tag} 自己参照: ${it.id}`); });
  const disc = new Map([...ids].map((i) => [i, 0]));
  Object.entries(A.disc).forEach(([d, v]) => v.ids.forEach((id) => { if (!disc.has(id)) errs.push(`${tag} 学問の参照切れ ${id}`); else disc.set(id, disc.get(id) + 1); }));
  for (const [id, n] of disc) if (n !== 1) errs.push(`${tag} 学問の割当が${n}件: ${id}`);
  A.chains.forEach((c) => { need(c.L, 'chain', 'L'); need(c.S, 'chain', 'S'); need(c.F, 'chain', 'F'); });
  A.tensions.forEach((t) => { need(t.a.ids, 'tension'); need(t.b.ids, 'tension'); need(t.rel, 'tension'); if (!A.axes[t.axis]) errs.push(`${tag} 判断軸不正`); });
  A.misuse.forEach((p) => need(p.ids, 'misuse'));
  A.guide.forEach((g) => { need(g.L, 'guide', 'L'); need(g.S, 'guide', 'S'); need(g.F, 'guide', 'F'); });
  A.aiLens.forEach((a) => need(a.ids, 'aiLens'));
  A.industries.forEach((x) => { need(x.L, x.id, 'L'); need(x.S, x.id, 'S'); need(x.F, x.id, 'F'); });
  const lensIds = new Set(A.lenses.map((x) => x.id));
  A.lenses.forEach((x) => need(x.core, x.id));
  A.council.lenses.forEach((x) => { if (!lensIds.has(x.k)) errs.push(`${tag} カウンシルのレンズ不正 ${x.k}`); need(x.ids, 'council'); });
  A.council.conflicts.forEach((x) => { if (!lensIds.has(x.a) || !lensIds.has(x.b) || x.a === x.b) errs.push(`${tag} 対立の当事者不正`); });
  // 本文に書かれた項目IDの参照
  const textOf = (o) => (typeof o === 'string' ? o : Array.isArray(o) ? o.map(textOf).join(' ') : o && typeof o === 'object' ? Object.values(o).map(textOf).join(' ') : '');
  const body = textOf(A.items.map(({ d, s, c, ai, ask }) => [d, s, c, ai, ask])) + textOf([A.rules, A.misuse, A.tensions, A.aiLens, A.industries, A.council]);
  for (const m of body.matchAll(/\b([LSF][1-6]-\d{2})\b/g)) if (!ids.has(m[1])) errs.push(`${tag} 本文中の参照切れ ${m[1]}`);
  const known = ['total', 'nL', 'nS', 'nF', 'nChain', 'nT', 'nT3', 'gS', 'gCD', 'nP', 'nCat', 'nL6', 'nInd'];
  A.summary.forEach((s) => { for (const m of (s.h + s.b).matchAll(/\{\{(\w+)\}\}/g)) if (!known.includes(m[1])) errs.push(`${tag} 未定義トークン ${m[1]}`); });
  return ids.size;
}

const nJA = checkLang(JA, 'JA', '？');
const nEN = checkLang(EN, 'EN', '?');

// 日英の構造一致：配列長・キー集合が同じ。日本語を含まない値（ID・コード等）は同一。日本語の値は英語に訳されている。
(function parity(a, b, p) {
  if (typeof a === 'string') {
    if (typeof b !== 'string') return errs.push(`構造不一致 ${p}`);
    if (/\/wq$/.test(p)) { if (a !== b) errs.push(`検索語の不一致 ${p}`); return; }
    if (/^\/items\/\d+\/n$/.test(p)) return;
    if (!JP.test(a)) { if (a !== b) errs.push(`非翻訳値の不一致 ${p}`); return; }
    if (JP.test(b)) errs.push(`英語版に日本語が残存 ${p}`);
    if (!b.trim()) errs.push(`英語版が空 ${p}`);
    return;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return errs.push(`配列長の不一致 ${p}`);
    return a.forEach((v, i) => parity(v, b[i], `${p}/${i}`));
  }
  if (a && typeof a === 'object') {
    const ka = Object.keys(a).sort().join(), kb = b && typeof b === 'object' ? Object.keys(b).sort().join() : '';
    if (ka !== kb) return errs.push(`キーの不一致 ${p}`);
    return Object.keys(a).forEach((k) => parity(a[k], b[k], `${p}/${k}`));
  }
  if (a !== b) errs.push(`値の不一致 ${p}`);
})(JA, EN, '');
EN.items.forEach((it, i) => { if (it.n !== JA.items[i].en) errs.push(`英語版の名称が英名と不一致 ${it.id}`); });

// 体系図クイズ：生成関数を取り出して全問を検査する
const qa = text.indexOf('// @atlas-quiz-begin'), qb = text.indexOf('// @atlas-quiz-end');
let nQ = 0;
if (qa < 0 || qb < 0) errs.push('クイズ生成区間（@atlas-quiz-begin/end）が見つからない');
else {
  const build = new Function(text.slice(qa, qb) + '\nreturn atlasBuildQuiz;')();
  const Q = build(JA, EN);
  nQ = Q.length;
  const seen = new Set();
  const byJA = Object.fromEntries(JA.items.map((i) => [i.id, i]));
  const byEN = Object.fromEntries(EN.items.map((i) => [i.id, i]));
  const leak = (stem, name) => name.split(/[（）()／/]/).map((x) => x.trim()).filter((x) => x.length >= 2).some((p) => stem.toLowerCase().includes(p.toLowerCase()));
  for (const q of Q) {
    const w = `クイズ ${q.id}`;
    if (seen.has(q.id)) errs.push(`${w}: ID重複`);
    seen.add(q.id);
    if (!byJA[q.item]) { errs.push(`${w}: 項目が存在しない`); continue; }
    if (!['def', 'cat', 'ask', 'ai', 'by'].includes(q.t)) errs.push(`${w}: 形式不正`);
    if (!Array.isArray(q.o) || q.o.length !== 4) { errs.push(`${w}: 選択肢が4つでない`); continue; }
    if (q.a !== 0 || q.o[0].ref !== (q.t === 'cat' ? q.item.slice(0, 2) : q.item)) errs.push(`${w}: 正解の参照が項目と一致しない`);
    for (const lg of ['ja', 'en']) {
      const texts = q.o.map((o) => o[lg]);
      if (texts.some((x) => !x || !x.trim())) errs.push(`${w}: 空の選択肢（${lg}）`);
      if (new Set(texts).size !== 4) errs.push(`${w}: 選択肢の重複（${lg}）`);
      if (!q.p[lg] || !q.x[lg]) errs.push(`${w}: 設問または解説が空（${lg}）`);
      if (q.stem && !q.stem[lg]) errs.push(`${w}: 本文が空（${lg}）`);
    }
    if (JP.test([q.p.en, q.x.en, q.stem ? q.stem.en : '', ...q.o.map((o) => o.en)].join(' '))) errs.push(`${w}: 英語版に日本語が残存`);
    if (new Set(q.o.map((o) => o.ref)).size !== 4) errs.push(`${w}: 同じ項目が複数の選択肢に出ている`);
    if (q.stem) {
      if (leak(q.stem.ja, byJA[q.item].n) || leak(q.stem.en, byEN[q.item].n)) errs.push(`${w}: 本文に正解の名称が含まれる`);
      q.o.slice(1).forEach((o) => { if (leak(q.stem.ja, byJA[o.ref].n)) errs.push(`${w}: 本文に誤答の名称が含まれる`); });
    }
    if (q.t === 'cat' && q.o.some((o) => !JA.cats[o.ref] || JA.cats[o.ref].layer !== q.item[0])) errs.push(`${w}: 別の層のカテゴリが混入`);
    if (!Array.isArray(q.perm) || [...q.perm].sort().join() !== '0,1,2,3') errs.push(`${w}: 並べ替えが不正`);
  }
  if (nQ < 800) errs.push(`クイズの問題数が少なすぎる: ${nQ}`);
  // 正解の表示位置（A〜D）が偏っていないか：各位置が全体の18〜32%に収まること
  const pos = [0, 0, 0, 0];
  Q.forEach((q) => { pos[q.perm.indexOf(q.a)]++; });
  pos.forEach((n, i) => { const r = n / nQ; if (r < 0.18 || r > 0.32) errs.push(`クイズの正解位置が偏っている: ${'ABCD'[i]}=${(r * 100).toFixed(1)}%`); });
  console.log(`[validate-atlas] クイズの正解位置 A/B/C/D = ${pos.join('/')}`);
  // 長さの手掛かり（quiz-authoring 規約）：表示順で「最長を選ぶ（同点は先頭）」が正解を引く問題は0件、
  // 正解が最長（同点を含む）の割合は偶然（25%）の 1/3〜1.6倍に収める（日英とも）
  for (const lg of ['ja', 'en']) {
    let longest = 0;
    for (const q of Q) {
      const L = q.perm.map((i) => [...q.o[i][lg]].length), at = q.perm.indexOf(q.a), mx = Math.max(...L);
      if (L.indexOf(mx) === at) errs.push(`クイズ ${q.id}: 最長の選択肢を選ぶと正解になる（${lg}: ${L.join('/')}）`);
      if (L[at] === mx) longest++;
    }
    const r = longest / nQ;
    if (r < 0.25 / 3 || r > 0.25 * 1.6) errs.push(`クイズの「正解が最長」の割合が偶然から外れている（${lg}: ${(r * 100).toFixed(1)}%）`);
    console.log(`[validate-atlas] 正解が最長（同点を含む）の割合 ${lg} = ${(r * 100).toFixed(1)}%`);
  }
}

if (errs.length) {
  console.error(`[validate-atlas] NG: ${errs.length}件`);
  errs.slice(0, 50).forEach((e) => console.error('  ' + e));
  process.exit(1);
}
console.log(`[validate-atlas] OK: 体系図 ${nJA}項目（JA）/ ${nEN}項目（EN）、クイズ ${nQ}問、エラー0件`);
