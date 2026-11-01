// 全バンクの {q, opts, a, e, oe} を取り出し、正解の添字と解説の食い違いを機械的に洗い出す
// 使い方: node .claude/skills/quiz-authoring/key-scan.mjs nova-app/src/ProjectNova.jsx /tmp/.../flags.json
//   強い信号（解説の「正解はX」や選択肢ごとの解説 oe と a が矛盾）は、ほぼ確実に誤り。
//   弱い信号（解説の冒頭の文が別の選択肢の語句ばかり含む）は候補。1問ずつ読んで確かめる（2026-11 の実績：
//   弱い信号291件から誤り12件、信号なしの無作為185問からは0件）。同じ OUT の隣に all_rows.json も書く。
import fs from 'fs';
const SRC = process.argv[2], OUT = process.argv[3];
const text = fs.readFileSync(SRC, 'utf8');
const lineOf = (() => { const nl = []; for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) nl.push(i); return (pos) => { let lo = 0, hi = nl.length; while (lo < hi) { const m = (lo + hi) >> 1; if (nl[m] < pos) lo = m + 1; else hi = m; } return lo + 1; }; })();
const mods = [...text.matchAll(/^const ([A-Za-z]+Module) = \(/gm)].map((m) => [m.index, m[1]]);
const modOf = (pos) => { let n = 'TOP'; for (const [a, name] of mods) if (a <= pos) n = name; return n; };
const matchClose = (start) => { const open = text[start], close = open === '[' ? ']' : '}'; let d = 0, s = false, q = null, esc = false; for (let i = start; i < text.length; i++) { const c = text[i]; if (s) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === q) s = false; continue; } if (c === '"' || c === "'" || c === '`') { s = true; q = c; continue; } if (c === open) d++; else if (c === close) { d--; if (d === 0) return i; } } return -1; };
const OPT_KEYS = ['opts', 'choices', 'o', 'options', 'oJa'], ANS_KEYS = ['a', 'ans', 'answer', 'correct'], EXP_KEYS = ['e', 'exp', 'explanation', 'eJa', 'ex', 'why'];
const str = (o) => (typeof o === 'string' ? o : (o && (o.ja || o.text || o.t || o.label)) || '');
const banks = []; const seenStart = new Set();
function take(name, start, v) {
  if (!Array.isArray(v) || v.length < 5) return;
  const rows = [];
  v.forEach((r, i) => {
    if (!r || typeof r !== 'object' || Array.isArray(r)) return;
    const ok = OPT_KEYS.find((k) => Array.isArray(r[k])) || (r.ch && Array.isArray(r.ch.ja) ? 'ch' : null);
    const opts = ok === 'ch' ? r.ch.ja : ok ? r[ok] : null;
    const ak = ANS_KEYS.find((k) => typeof r[k] === 'number');
    if (!opts || ak === undefined) return;
    const ek = EXP_KEYS.find((k) => r[k] != null);
    const e = ek ? str(r[ek]) : '';
    const oe = Array.isArray(r.oe) ? r.oe.map(str) : null;
    rows.push({ i, id: r.id, q: str(r.q || r.qJa || r.question), opts: opts.map(str), a: r[ak], e, oe });
  });
  if (rows.length >= 5) banks.push({ name, mod: modOf(start), line: lineOf(start), rows });
}
// 1) const NAME = [ ... ]
for (const m of text.matchAll(/(?:const|var|let)\s+([A-Za-z_][\w]*)\s*=\s*\[/g)) {
  const s = text.indexOf('[', m.index + m[0].length - 1); if (seenStart.has(s)) continue;
  const head = text.slice(s, s + 3000); if (!/\{/.test(head)) continue;
  const e = matchClose(s); if (e < 0) continue; seenStart.add(s);
  let v; try { v = (0, eval)('(' + text.slice(s, e + 1) + ')'); } catch (err) { continue; }
  take(m[1], s, v);
}
// 2) nested key: [ { ...
for (const m of text.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*\[\s*(?:\/\/[^\n]*\n\s*)*\{/g)) {
  const s = text.indexOf('[', m.index); if ([...seenStart].some((x) => x === s)) continue;
  const head = text.slice(s, s + 3000); if (!/(?:choices|opts|options|"o"|\bo)\s*"?\s*:\s*\[/.test(head)) continue;
  const e = matchClose(s); if (e < 0) continue; seenStart.add(s);
  let v; try { v = (0, eval)('(' + text.slice(s, e + 1) + ')'); } catch (err) { continue; }
  take(m[1], s, v);
}
// 3) buildQuestions([[d,q,A,B,C,D,ans,exp],...])
for (const m of text.matchAll(/buildQuestions\(\s*\[/g)) {
  const s = text.indexOf('[', m.index); const e = matchClose(s); if (e < 0) continue;
  let v; try { v = (0, eval)('(' + text.slice(s, e + 1) + ')'); } catch (err) { continue; }
  const rows = []; v.forEach((r, i) => { if (Array.isArray(r) && r.length >= 7 && typeof r[6] === 'number') rows.push({ i, q: r[1], opts: [r[2], r[3], r[4], r[5]].map(String), a: r[6], e: String(r[7] || '') }); });
  if (rows.length) banks.push({ name: 'buildQuestions', mod: modOf(s), line: lineOf(s), rows });
}
// ---- heuristics ----
const LET = 'ABCDEF';
const tri = (s) => { const t = String(s).replace(/[\s、。，．・「」『』（）()【】:：,.\-–—]/g, ''); const out = new Set(); for (let i = 0; i + 3 <= t.length; i++) out.add(t.slice(i, i + 3)); return out; };
const flags = []; let total = 0, withE = 0;
for (const b of banks) for (const r of b.rows) {
  total++; const n = r.opts.length; if (!(r.a >= 0 && r.a < n)) { flags.push({ ...r, bank: b.name, mod: b.mod, line: b.line, why: 'answer index out of range', strong: 1 }); continue; }
  // strong: explicit "正解は X" letter
  const mm = r.e.match(/(?:正解|答え)(?:は|：|:)\s*[（(]?\s*([A-F])\b/);
  if (mm && LET.indexOf(mm[1]) !== r.a && LET.indexOf(mm[1]) < n) { flags.push({ ...r, bank: b.name, mod: b.mod, line: b.line, why: `e says 正解は${mm[1]} but a=${LET[r.a]}`, strong: 1 }); continue; }
  // strong: per-option explanations contradict
  if (r.oe && r.oe.length === n) {
    const bad = r.oe[r.a] && /^(?:✗|×|誤り|不正解|誤)/.test(r.oe[r.a].trim());
    const other = r.oe.findIndex((x, k) => k !== r.a && x && /^(?:✓|○|◯|正解|正しい)/.test(x.trim()));
    if (bad || other >= 0) { flags.push({ ...r, bank: b.name, mod: b.mod, line: b.line, why: `oe contradicts a (oe[a]=${(r.oe[r.a] || '').slice(0, 12)} other=${other})`, strong: 1 }); continue; }
  }
  if (!r.e) continue; withE++;
  // weak: first sentence of e matches a different option much better
  const first = r.e.split(/。|\.\s/)[0].slice(0, 160);
  const ft = tri(first); const tris = r.opts.map(tri);
  const uniq = tris.map((T, k) => [...T].filter((x) => !tris.some((U, j) => j !== k && U.has(x))));
  const sc = uniq.map((U) => U.filter((x) => ft.has(x)).length);
  const best = sc.indexOf(Math.max(...sc));
  if (best !== r.a && sc[best] >= 4 && sc[best] >= 3 * (sc[r.a] + 1)) flags.push({ ...r, bank: b.name, mod: b.mod, line: b.line, why: `first sentence matches option ${LET[best]} (${sc[best]}) over answer ${LET[r.a]} (${sc[r.a]})`, strong: 0 });
}
fs.writeFileSync(OUT, JSON.stringify(flags, null, 1));
fs.writeFileSync(OUT.replace('flags.json','all_rows.json'), JSON.stringify(banks.flatMap((b) => b.rows.map((r) => ({ ...r, bank: b.name, mod: b.mod, line: b.line })))));
const byMod = {}; for (const b of banks) { byMod[b.mod] = byMod[b.mod] || { banks: 0, q: 0 }; byMod[b.mod].banks++; byMod[b.mod].q += b.rows.length; }
console.log('banks', banks.length, 'questions', total, 'with explanation', withE);
console.log(JSON.stringify(byMod));
const fm = {}; for (const f of flags) { const k = f.mod + (f.strong ? ' strong' : ' weak'); fm[k] = (fm[k] || 0) + 1; } console.log('flags', flags.length, JSON.stringify(fm));
