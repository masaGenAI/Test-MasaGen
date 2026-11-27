// @@nova-part 40-certification/010-head.jsx
// ================= CertHubModule (source: Certification-Dashboard-Hub.jsx) =================
const CertHubModule = (function () {
// 資格ページを開いたときの表示言語：ハブで選んだ言語 → ポータルの言語 → 日本語 の順に引き継ぐ
const certInitLang = () => { try { return window.__novaCertLang || window.__novaLang || "ja"; } catch (e) { return "ja"; } };
// 模擬試験の本番モードの制限時間。公式ページに書かれた試験時間と問題数（2026年11月3日に確認）を、
// 模擬試験の問題数に比例させる。問題数が幅で書かれているもの（例 40〜60問）は中央値で換算する。
// ここに無い資格は公式の時間を確認できていないので、従来どおり1問60秒（最低10分）。
const CERT_EXAM_TIME = {
  clf: { min: 90, q: 65, qText: "65" }, saa: { min: 130, q: 65, qText: "65" }, ccaf: { min: 120, q: 60, qText: "60" },
  adp: { min: 120, q: 55, qText: "50〜60" }, agwa: { min: 120, q: 55, qText: "50〜60" }, aigp: { min: 165, q: 100, qText: "100" }, ccsk: { min: 120, q: 60, qText: "60" },
  cism: { min: 240, q: 150, qText: "150" }, cisa: { min: 240, q: 150, qText: "150" },
  aaism: { min: 150, q: 90, qText: "90" }, aair: { min: 150, q: 90, qText: "90" }, aaia: { min: 150, q: 90, qText: "90" },
  pl900: { min: 45, q: 50, qText: "40〜60" }, sc900: { min: 45, q: 50, qText: "40〜60" }, dp900: { min: 45, q: 50, qText: "40〜60" },
};
const certExamSeconds = (id, n) => { const t = CERT_EXAM_TIME[id]; if (!t || !n) return Math.max(600, (n || 0) * 60); return Math.max(300, Math.round((t.min * 60 * n) / t.q)); };

// buildHardSets_AB — AB-620水準の模試セット生成（module共通）。ドメイン別プールを
// プランに従い各セットへローテーション配分する。自己完結（外部依存なし）。
// 一部ステーションIIFE内に同名のローカル定義があるが、それらはローカルで shadow する。
function buildHardSets_AB(bank, plan, nSets){
  const by = {}; bank.forEach(q => { (by[q.d] = by[q.d] || []).push(q); });
  const sets = {};
  for (let s = 0; s < nSets; s++) { const arr = []; Object.entries(plan).forEach(([dom, n]) => { const pool = by[dom] || []; if (!pool.length) return; for (let i = 0; i < n; i++) arr.push(pool[(i + s * n) % pool.length]); }); sets[s + 1] = arr; }
  return sets;
}

// 模擬試験のセットの中で、単一正解の問題の正解位置を A〜D に均等に散らす（並びに規則が出ないよう種付き乱数で割り振る）。
// arr は表示用に並べ替え済みの問題。正解の選択肢と割り振った位置の選択肢を入れ替える。fields は一緒に入れ替える配列（o・oEn など）。
// 「上記のすべて」や「選択肢A」のように並びに頼る選択肢がある問題は動かさない。
function novaBalanceAnswers(arr, key, fields) {
  const F = fields || ["o"];
  let seed = 2166136261; const k = String(key || ""); for (let i = 0; i < k.length; i++) { seed ^= k.charCodeAt(i); seed = Math.imul(seed, 16777619); }
  const rnd = () => { seed = (seed + 0x6D2B79F5) | 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const FIXED = /上記|以上の?すべて|いずれも|すべて正しい|All of the above|None of the above|Both [A-D]|選択肢\s*[A-DＡ-Ｄ]|（[A-D]）|\([A-D]\)/;
  const byN = {};
  arr.forEach((Q, i) => {
    if (!Q || !Array.isArray(Q.o) || typeof Q.a !== "number" || Q.a < 0 || Q.a >= Q.o.length) return;
    if (Q.o.some((x) => FIXED.test(String(x))) || (Array.isArray(Q.oEn) && Q.oEn.some((x) => FIXED.test(String(x))))) return;
    (byN[Q.o.length] = byN[Q.o.length] || []).push(i);
  });
  const out = arr.slice();
  Object.keys(byN).forEach((n) => {
    const ids = byN[n]; const t = ids.map((_, j) => j % Number(n));
    for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const x = t[i]; t[i] = t[j]; t[j] = x; }
    ids.forEach((qi, j) => {
      const Q = out[qi]; const to = t[j]; if (to === Q.a) return;
      const nq = { ...Q, a: to };
      F.forEach((f) => { const v = Q[f]; if (Array.isArray(v) && v.length === Q.o.length) { const c = v.slice(); const x = c[Q.a]; c[Q.a] = c[to]; c[to] = x; nq[f] = c; } });
      out[qi] = nq;
    });
  });
  return out;
}

// MSExamShell — MS公式試験ライクな全画面本番シェル（単一/複数選択・バイリンガル・自己完結）
// 既存ハブのネイティブ問題形状 {d, q, o[], a, e, (qEn, oEn[], eEn)} をそのまま受け取る。
//   a: number（単一選択）または number[]（複数選択）。
// props:
//   sets: { [key]: Question[] }  通常セット（キーは setKeys の順で表示）
//   setKeys: (string|number)[]
//   domainSets?: { [domId]: Question[] } | null  分野別（無ければ非表示）
//   domains: [{ id, name, nameEn?, hue? }]
//   lang, C(palette), PASS(number)
//   dName?: (d)=>string   domains に無いときの表示名フォールバック
//   labels?: 部分上書き
//   onAnswer?: (d, correct)=>void
//   onWrong?: (Q)=>void   誤答時（復習リスト用）
//   onExit?, backRef?
function MSExamShell({ sets, setKeys, domainSets, domains, lang, C, PASS, dName, labels, onAnswer, onWrong, backRef, saveKey, examId, resumeKey }) {
  const mockDone = useDoneSet((saveKey || "ms") + ":mockdc");
  const en = lang === "en";
  const L2 = (o, k) => (en ? (o[k + "En"] || o[k]) : o[k]);
  // resumeKey：セットの中身を組み替えた試験だけ渡す。途中保存の置き場を変え、古い並びの途中保存を新しいセットに当てはめないようにする
  const slot = useQuizSlot(resumeKey || saveKey || "msexam_resume_default");
  const DOMS = domains || [];
  const domLabel = (id) => { const d = DOMS.find(x => x.id === id); if (d) return en ? (d.nameEn || d.name) : d.name; return dName ? dName(id) : id; };
  const T = Object.assign({
    mockTitle: en ? "Mock exam" : "模擬試験",
    modeHint: en ? "Practice = instant explanations. Real = timed, official exam UI, scored at the end." : "演習モード＝即時解説。本番モード＝時間制・公式試験UI・終了後に採点。",
    practice: en ? "Practice" : "演習モード", real: en ? "Real (exam UI)" : "本番モード",
    fullSet: en ? "Full set" : "通常セット", byDomain: en ? "By domain" : "分野別",
    start: en ? "Start" : "開始", setW: en ? "Set" : "セット",
  }, labels || {});

  const [setNo, setSetNo] = useState(null);
  const [kind, setKind] = useState("normal");
  const [mode, setMode] = useState("practice");
  const [phase, setPhase] = useState("select");
  const [pos, setPos] = useState(0);
  const [picks, setPicks] = useState({});
  const [sel, setSel] = useState(null);
  const [mSel, setMSel] = useState([]);
  const [flags, setFlags] = useState({});
  const [showTimer, setShowTimer] = useState(true);
  const [showProg, setShowProg] = useState(true);
  const [remain, setRemain] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tool, setTool] = useState(null);
  const [contrast, setContrast] = useState(false);
  const [calcExpr, setCalcExpr] = useState("");
  const finishRef = useRef(() => {});

  useEffect(() => { if (!backRef) return; backRef.current = () => { if (phase === "run" || phase === "result") { setPhase("select"); return true; } return false; }; return () => { if (backRef) backRef.current = null; }; }, [phase, backRef]);

  const rawQs = setNo != null ? (kind === "domain" ? (domainSets && domainSets[setNo]) || [] : (sets[setNo] || [])) : [];
  // 選択肢の並び。shufV=2：セットの中で正解の位置が A〜D に均等に散り、並びに規則が出ないよう、
  // 正解の位置を先に均等に割り振ってから種付き乱数で混ぜる（GovMix と同じ考え方）。
  // shufV=1 は以前の並べ方（途中保存から再開したときだけ使い、保存時と同じ並びを保つ）
  const [shufV, setShufV] = useState(2);
  const qs = useMemo(() => {
    const salt = "ms_" + kind + "_" + setNo + "_" + lang;
    if (shufV === 1) {
      let h0 = 0; for (let i = 0; i < salt.length; i++) h0 = (h0 * 33 + salt.charCodeAt(i)) | 0;
      return rawQs.map((Q, qi) => {
        const src = en ? (Q.oEn || Q.o) : Q.o;
        const n = src.length;
        let h = (h0 ^ (qi * 2654435761)) >>> 0;
        const idx = src.map((_, i) => i);
        for (let i = n - 1; i > 0; i--) { h = (h * 1664525 + 1013904223) >>> 0; const j = h % (i + 1); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
        const o = idx.map(i => src[i]);
        const isMulti = Array.isArray(Q.a);
        const a = isMulti ? Q.a.map(x => idx.indexOf(x)).sort((p, q) => p - q) : idx.indexOf(Q.a);
        return { ...Q, o, a, multi: isMulti };
      });
    }
    const salt2 = (saveKey || examId || "") + "|" + salt;
    let seed = 2166136261; for (let i = 0; i < salt2.length; i++) { seed ^= salt2.charCodeAt(i); seed = Math.imul(seed, 16777619); }
    const rnd = () => { seed = (seed + 0x6D2B79F5) | 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const shuf = (arr) => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; };
    // 「上記のすべて」や「選択肢A」のように並びに頼る選択肢がある問題は並べ替えない
    const FIXED = /上記|以上の?すべて|いずれも|すべて正しい|All of the above|None of the above|Both [A-D]|選択肢\s*[A-DＡ-Ｄ]|（[A-D]）|\([A-D]\)/;
    const srcOf = (Q) => (en ? (Q.oEn || Q.o) : Q.o) || [];
    const fixed = (Q) => srcOf(Q).some((x) => FIXED.test(String(x)));
    const byN = {};
    rawQs.forEach((Q, qi) => { if (Array.isArray(Q.a) || fixed(Q)) return; const n = srcOf(Q).length; if (!(Q.a >= 0 && Q.a < n)) return; (byN[n] = byN[n] || []).push(qi); });
    const target = {};
    Object.keys(byN).forEach((n) => { const ids = byN[n]; const t = shuf(ids.map((_, k) => k % Number(n))); ids.forEach((qi, k) => { target[qi] = t[k]; }); });
    return rawQs.map((Q, qi) => {
      const src = srcOf(Q);
      const n = src.length;
      const isMulti = Array.isArray(Q.a);
      let idx;
      if (fixed(Q)) idx = src.map((_, i) => i);
      else if (target[qi] === undefined) idx = shuf(src.map((_, i) => i));
      else { const rest = shuf(src.map((_, i) => i).filter((i) => i !== Q.a)); idx = []; let r = 0; for (let p = 0; p < n; p++) idx.push(p === target[qi] ? Q.a : rest[r++]); }
      const o = idx.map(i => src[i]);
      const a = isMulti ? Q.a.map(x => idx.indexOf(x)).sort((p, q) => p - q) : idx.indexOf(Q.a);
      return { ...Q, o, a, multi: isMulti };
    });
  }, [setNo, kind, lang, shufV]);

  useEffect(() => {
    if (phase === "run") slot.save({ setNo, kind, mode, phase, pos, picks, sel, mSel, flags, remain, sv: shufV }, (en ? "Set " : "セット") + setNo);
    else if (phase === "result") slot.remove();
  }, [phase, pos, picks, sel, mSel, flags]);
  const start = (n) => { const base = (kind === "domain" ? (domainSets && domainSets[n]) : sets[n]) || []; setShufV(2); setSetNo(n); setPos(0); setPicks({}); setSel(null); setMSel([]); setFlags({}); setRemain(mode === "real" ? certExamSeconds(examId, base.length) : 0); setPhase("run"); };
  const eq = (x, y) => { const a = [...(x || [])].sort((p, q) => p - q), b = [...(y || [])].sort((p, q) => p - q); return a.length === b.length && a.every((v, i) => v === b[i]); };
  const gradeReal = (Q, pk) => { if (pk === undefined) return false; if (Q.multi) return Array.isArray(pk) && eq(pk, Q.a); return pk === Q.a; };

  const choosePractice = (i) => { if (sel !== null) return; setSel(i); const Q = qs[pos]; const ok = i === Q.a; if (onAnswer) onAnswer(Q.d, ok); if (!ok && onWrong) onWrong(Q); setPicks(p => ({ ...p, [pos]: i })); };
  const toggleMultiPractice = (i, need) => { if (sel !== null) return; setMSel(cur => { const at = cur.indexOf(i); if (at >= 0) return cur.filter(x => x !== i); if (cur.length >= need) return cur; return [...cur, i].sort((a, b) => a - b); }); };
  const submitMultiPractice = () => { const Q = qs[pos]; const need = Q.a.length; if (mSel.length !== need) return; const ok = eq(mSel, Q.a); if (onAnswer) onAnswer(Q.d, ok); if (!ok && onWrong) onWrong(Q); const arr = [...mSel].sort((a, b) => a - b); setSel(arr); setPicks(p => ({ ...p, [pos]: arr })); };
  const chooseReal = (i) => { setPicks(p => { const n = { ...p }; if (i === null || i === undefined) delete n[pos]; else n[pos] = i; return n; }); };
  const chooseRealMulti = (i) => { setPicks(p => { const cur = Array.isArray(p[pos]) ? p[pos].slice() : []; const at = cur.indexOf(i); let nx; if (at >= 0) nx = cur.filter(x => x !== i); else { const Q = qs[pos]; if (cur.length >= Q.a.length) return p; nx = [...cur, i].sort((a, b) => a - b); } const n = { ...p }; if (nx.length === 0) delete n[pos]; else n[pos] = nx; return n; }); };
  const resetPick = () => setPicks(p => { const n = { ...p }; delete n[pos]; return n; });
  const next = () => { if (mode === "practice") { setSel(null); setMSel([]); } if (pos + 1 >= qs.length) finishExam(); else setPos(pos + 1); };
  const prev = () => { if (pos > 0) { setPos(pos - 1); if (mode === "practice") { setSel(picks[pos - 1] ?? null); setMSel([]); } } };
  const finishExam = () => {
    if (mode === "real") { qs.forEach((Q, i) => { if (picks[i] === undefined) return; const ok = gradeReal(Q, picks[i]); if (onAnswer) onAnswer(Q.d, ok); if (!ok && onWrong) onWrong(Q); }); }
    // 完了記録（進捗タブの模試完了率の元データ）：セットごとのベストスコアを全ステーション共通マップに保存
    try {
      let ok = 0; qs.forEach((Q, i) => { if (picks[i] !== undefined && gradeReal(Q, picks[i])) ok++; });
      const pct = qs.length ? Math.round((ok / qs.length) * 100) : 0;
      const id = (saveKey || "ms") + "#" + kind + String(setNo);
      window.storage.get("msexam_done_v1").then((r) => {
        const m = r && r.value ? (JSON.parse(r.value) || {}) : {};
        if (!(typeof m[id] === "number" && m[id] >= pct)) m[id] = pct;
        window.storage.set("msexam_done_v1", JSON.stringify(m));
      }).catch(() => {});
    } catch (e) {}
    setPhase("result");
  };
  finishRef.current = finishExam;
  useEffect(() => { if (phase !== "run" || mode !== "real") return; const id = setInterval(() => setRemain(r => { if (r <= 1) { clearInterval(id); finishRef.current(); return 0; } return r - 1; }), 1000); return () => clearInterval(id); }, [phase, mode, setNo]);

  // ===== select =====
  if (phase === "select") {
    return (
      <div>
        {slot.meta && (
          <div style={{ marginBottom: 14, padding: "12px 14px", background: C.light, border: `1.5px solid ${C.primary}`, borderRadius: 10, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 20 }}>💾</span>
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: C.deep }}>{en ? "Exam in progress" : "中断した模試"}</div>
              <div style={{ fontSize: 11, color: "#7d93a8" }}>{slot.meta.label}{slot.meta.label ? "／" : ""}{saveStamp(slot.meta.t)}</div>
            </div>
            <button onClick={async () => { const d = await slot.read(); if (!d) return; setShufV(d.sv === 2 ? 2 : 1); setSetNo(d.setNo); setKind(d.kind || "normal"); setMode(d.mode || "practice"); setPos(d.pos || 0); setPicks(d.picks || {}); setSel(d.sel == null ? null : d.sel); setMSel(d.mSel || []); setFlags(d.flags || {}); setRemain(d.remain || 0); setPhase("run"); }}
              style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: C.primary, color: nvInk("#ffffff", C.primary), fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>{en ? "▶ Resume" : "▶ 続きから"}</button>
            <button onClick={() => slot.remove()} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.mid}`, background: "#fff", color: "#7d93a8", fontSize: 11, cursor: "pointer" }}>{en ? "Delete" : "削除"}</button>
          </div>
        )}
        <div style={{ background: "#fff", border: `1px solid ${C.mid}`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.deep, marginBottom: 8 }}>{T.mockTitle}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#476770", marginBottom: 12 }}>{T.modeHint}</div>
          <div style={{ display: "flex", background: C.light, borderRadius: 24, padding: 4 }}>
            {[["practice", T.practice], ["real", T.real]].map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, border: "none", cursor: "pointer", borderRadius: 20, padding: "10px 8px", fontSize: 13.5, fontWeight: 700, background: mode === m ? "#fff" : "transparent", color: mode === m ? nvInk(C.deep, "#ffffff") : nvInk("#53757f", C.mid), boxShadow: mode === m ? "0 1px 4px rgba(11,110,143,.18)" : "none" }}>{label}</button>
            ))}
          </div>
        </div>
        {domainSets && (
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {[["normal", T.fullSet], ["domain", T.byDomain]].map(([kk, label]) => (
              <button key={kk} onClick={() => setKind(kk)} style={{ flex: 1, padding: "11px 8px", borderRadius: 10, fontSize: 13.5, fontWeight: 700, cursor: "pointer", border: `1.5px solid ${kind === kk ? C.primary : C.mid}`, background: kind === kk ? C.primary : "#fff", color: kind === kk ? nvInk("#ffffff", C.primary) : nvInk(C.ink, "#ffffff") }}>{label}</button>
            ))}
          </div>
        )}
        {kind === "domain" && domainSets && DOMS.map(d => (
          <button key={d.id} onClick={() => start(d.id)} style={{ width: "100%", textAlign: "left", padding: "15px 16px", marginBottom: 10, borderRadius: 11, border: `1.5px solid ${C.primary}`, background: "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}><DoneCheck on={mockDone.has(d.id)} onToggle={(e) => mockDone.toggle(d.id, e)} />
              <span style={{ background: d.hue || C.primary, color: nvInk("#ffffff", d.hue || C.primary), borderRadius: 5, padding: "3px 8px", fontSize: 12, fontWeight: 800 }}>{d.id}</span>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: C.deep }}>{en ? (d.nameEn || d.name) : d.name}</span>
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: nvInk(C.primary, "#ffffff") }}>{T.start}</span>
          </button>
        ))}
        {kind === "normal" && setKeys.map(n => (
          <button key={n} onClick={() => start(n)} style={{ width: "100%", textAlign: "left", padding: "15px 16px", marginBottom: 10, borderRadius: 11, border: `1.5px solid ${C.primary}`, background: "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: C.deep }}><DoneCheck on={mockDone.has("s"+n)} onToggle={(e) => mockDone.toggle("s"+n, e)} />{T.setW} {n}</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: nvInk(C.primary, "#ffffff") }}>{mode === "practice" ? T.practice : T.real}</span>
          </button>
        ))}
      </div>
    );
  }

  const Q = qs[pos];
  const opts = Q.o;
  const curPick = picks[pos] ?? null;
  const isLast = pos + 1 >= qs.length;

  // ===== result =====
  if (phase === "result") {
    const c = qs.filter((Q2, i) => gradeReal(Q2, picks[i])).length;
    const rate = qs.length ? Math.round((c / qs.length) * 100) : 0;
    const passed = rate >= PASS;
    return (
      <div>
        <div style={{ background: passed ? "#E4F6EC" : "#FBE9E7", border: `2px solid ${passed ? C.ok : C.ng}`, borderRadius: 12, padding: 18, textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: nvInk("#5a7780", passed ? "#E4F6EC" : "#FBE9E7") }}>{en ? `${T.setW} ${setNo} · Result` : `${T.setW}${setNo}・結果`}</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: nvInk(passed ? C.ok : C.ng, passed ? "#E4F6EC" : "#FBE9E7", 3) }}>{rate}%</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: nvInk(passed ? C.ok : C.ng, passed ? "#E4F6EC" : "#FBE9E7", 3) }}>{passed ? (en ? "Passed" : "合格ライン到達") : (en ? `Need +${PASS - rate}%` : `あと${PASS - rate}%`)}</div>
          <div style={{ fontSize: 12, color: nvInk("#5a7780", passed ? "#E4F6EC" : "#FBE9E7"), marginTop: 4 }}>{en ? `${c} / ${qs.length} correct` : `正解 ${c} / ${qs.length} 問`}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => start(setNo)} style={{ flex: 1, padding: 13, borderRadius: 9, border: "none", background: C.primary, color: nvInk("#ffffff", C.primary, 3), fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{en ? "Retry" : "もう一度"}</button>
          <button onClick={() => setPhase("select")} style={{ flex: 1, padding: 13, borderRadius: 9, border: `1.5px solid ${C.primary}`, background: "#fff", color: nvInk(C.primary, "#ffffff"), fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{en ? "Set select" : "セット選択"}</button>
        </div>
      </div>
    );
  }

  // ===== 本番モード：全画面公式試験シェル =====
  if (mode === "real") {
    const total = qs.length;
    const hh = String(Math.floor(remain / 3600)).padStart(2, "0");
    const mm = String(Math.floor((remain % 3600) / 60)).padStart(2, "0");
    const ss = String(remain % 60).padStart(2, "0");
    const NAVY = "#12324a", STEEL = nvInk(C.primary, "#ffffff"), INK = "#1b2a33";
    const LINE = contrast ? "#3a4650" : "#d5dde2", SUB = contrast ? "#dfe7ec" : nvInk("#5a7780", "#eceff2"), PAGE = contrast ? "#0b0f12" : "#eceff2";
    const isMulti = !!Q.multi;
    const selArr = Array.isArray(curPick) ? curPick : [];
    const need = isMulti ? Q.a.length : 1;
    const Toggle = ({ on, onToggle }) => (<span onClick={onToggle} role="switch" aria-checked={on} style={{ display: "inline-block", width: 34, height: 19, borderRadius: 20, background: on ? STEEL : "#b7c3cb", position: "relative", cursor: "pointer", verticalAlign: "middle", flexShrink: 0 }}><span style={{ position: "absolute", top: 2, left: on ? 17 : 2, width: 15, height: 15, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.35)" }} /></span>);
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 2147483000, background: PAGE, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#fff", borderBottom: `1px solid ${LINE}`, padding: "11px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span onClick={() => setMenuOpen(o => !o)} style={{ fontSize: 21, color: INK, cursor: "pointer", userSelect: "none" }}>☰</span>
            <span style={{ fontWeight: 800, fontSize: 16, color: INK }}>{en ? `Question ${pos + 1}` : `問題 ${pos + 1}`}</span>
            {qs[pos] ? <StarButton id={"q#" + novaQHash((qs[pos].q || qs[pos].qEn || "") + "")} text={qs[pos].q || qs[pos].qEn} scope={en ? "Mock exam" : "模試"} /> : null}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end", fontSize: 12, color: SUB }}>{en ? "Time left:" : "残り時間:"} <Toggle on={showTimer} onToggle={() => setShowTimer(v => !v)} /></div>
            <div style={{ fontVariantNumeric: "tabular-nums", fontWeight: 800, fontSize: 19, color: remain <= 60 ? "#c0392b" : INK, letterSpacing: 1 }}>{showTimer ? `${hh} : ${mm} : ${ss}` : "-- : -- : --"}</div>
          </div>
          {menuOpen && (
            <div style={{ position: "absolute", top: 50, left: 12, background: "#fff", border: "1px solid #d5dde2", borderRadius: 8, boxShadow: "0 6px 22px rgba(0,0,0,.18)", zIndex: 5, overflow: "hidden", minWidth: 232 }}>
              {[["detail", en ? "Question details" : "試験問題の詳細"], ["progress", en ? "Progress" : "試験の進行状況"], ["break", en ? "Take a break" : "休憩する"], ["calc", en ? "Calculator" : "電卓"], ["color", en ? "Color scheme" : "配色"], ["help", en ? "Help" : "ヘルプ"]].map(([k, label]) => (
                <button key={k} onClick={() => { setMenuOpen(false); if (k === "color") setContrast(x => !x); else setTool(k); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", borderBottom: "1px solid #eef2f5", background: "#fff", color: "#1b2a33", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>{label}{k === "color" && contrast ? " ✓" : ""}</button>
              ))}
              <button onClick={() => { setMenuOpen(false); if (typeof window === "undefined" || window.confirm(en ? "Close the test window and score now?" : "テスト ウィンドウを終了します。ここまでの解答で採点しますか？")) finishExam(); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", background: "#f5f7f8", color: "#c0392b", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>{en ? "Close test window" : "テスト ウィンドウの終了"}</button>
            </div>
          )}
          {tool && (
            <div onClick={() => setTool(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
              <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 10, maxWidth: 460, width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", borderBottom: "1px solid #e3e9ed" }}>
                  <b style={{ fontSize: 14.5, color: "#1b2a33" }}>{{ detail: en ? "Question details" : "試験問題の詳細", progress: en ? "Progress" : "試験の進行状況", break: en ? "Take a break" : "休憩する", calc: en ? "Calculator" : "電卓", help: en ? "Help" : "ヘルプ" }[tool]}</b>
                  <button onClick={() => setTool(null)} style={{ border: "none", background: "none", fontSize: 20, color: "#5a7780", cursor: "pointer" }}>×</button>
                </div>
                <div style={{ padding: 16, fontSize: 13.5, color: "#1b2a33", lineHeight: 1.7 }}>
                  {tool === "detail" && (<div>{en ? "Domain" : "領域"}：<b>{Q.d} {domLabel(Q.d)}</b><br />{en ? "Question" : "問題番号"}：{pos + 1} / {qs.length}</div>)}
                  {tool === "progress" && (<div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 6 }}>{qs.map((_, i) => (<button key={i} onClick={() => { setPos(i); setTool(null); }} style={{ padding: "7px 0", borderRadius: 5, border: `1px solid ${i === pos ? "#12324a" : "#cbd5db"}`, fontSize: 12, fontWeight: 700, cursor: "pointer", background: picks[i] !== undefined ? C.primary : "#fff", color: picks[i] !== undefined ? nvInk("#ffffff", C.primary) : nvInk("#1b2a33", "#ffffff") }}>{i + 1}</button>))}</div>)}
                  {tool === "break" && (<div>{en ? "The exam timer keeps running during a break." : "休憩中も試験タイマーは継続します。"}</div>)}
                  {tool === "help" && (<div>{en ? "Choose your answer(s), use Reset to clear, flag for later review, and navigate with Back/Next." : "選択肢で解答し、解答のリセットで取り消し、あとで見直すでフラグ、戻る／次へで移動します。"}</div>)}
                  {tool === "calc" && (<div><input readOnly value={calcExpr} style={{ width: "100%", boxSizing: "border-box", textAlign: "right", fontSize: 20, padding: "10px 12px", border: "1px solid #cbd5db", borderRadius: 6, marginBottom: 8 }} /><div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>{["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map(bn => (<button key={bn} onClick={() => { if (bn === "=") { try { const r = Function('"use strict";return (' + calcExpr.replace(/[^0-9+\-*/.() ]/g, "") + ")")(); setCalcExpr(String(r)); } catch { setCalcExpr("ERR"); } } else setCalcExpr(e => (e === "ERR" ? "" : e) + bn); }} style={{ padding: "12px 0", borderRadius: 6, border: "1px solid #cbd5db", background: bn === "=" ? "#12324a" : /[/*\-+]/.test(bn) ? "#eef2f5" : "#fff", color: bn === "=" ? nvInk("#ffffff", "#12324a") : "#1b2a33", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>{bn}</button>))}<button onClick={() => setCalcExpr("")} style={{ gridColumn: "span 4", padding: "10px 0", borderRadius: 6, border: "1px solid #cbd5db", background: "#f5f7f8", color: "#c0392b", fontWeight: 700, cursor: "pointer" }}>{en ? "Clear" : "クリア"}</button></div></div>)}
                </div>
                <div style={{ padding: "10px 16px", borderTop: "1px solid #e3e9ed", textAlign: "right" }}><button onClick={() => setTool(null)} style={{ padding: "8px 18px", borderRadius: 6, border: "none", background: "#12324a", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{en ? "Close" : "閉じる"}</button></div>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, fontSize: 12, color: SUB, maxWidth: 720, width: "100%", margin: "0 auto", padding: "14px 16px 0", boxSizing: "border-box" }}>{en ? "Progress" : "進行状況"} <Toggle on={showProg} onToggle={() => setShowProg(v => !v)} /></div>
        <div style={{ maxWidth: 720, width: "100%", margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>
          {showProg && (
            <div style={{ display: "flex", gap: 18, marginTop: 6 }}>
              <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: SUB, marginBottom: 4 }}>{en ? `Questions (${pos + 1}/${total})` : `問題 (${pos + 1}/${total})`}</div><div style={{ display: "flex", gap: 2 }}>{qs.map((_, i) => (<div key={i} style={{ flex: 1, height: 7, borderRadius: 2, background: i === pos ? NAVY : picks[i] !== undefined ? STEEL : "#cbd5db" }} />))}</div></div>
              <div style={{ width: 96 }}><div style={{ fontSize: 12, color: SUB, marginBottom: 4 }}>{en ? "Review" : "見直し"}</div><div style={{ display: "flex", gap: 2 }}>{qs.map((_, i) => (<div key={i} style={{ flex: 1, height: 7, borderRadius: 2, background: flags[i] ? "#E8A33D" : "#cbd5db" }} />))}</div></div>
            </div>
          )}
          <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 6, padding: 20, marginTop: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: STEEL, marginBottom: 8 }}>{isMulti ? (en ? `Select ${need} answers. (${selArr.length}/${need})` : `正しい回答を${need}つ選択してください。（${selArr.length}/${need} 選択中）`) : (en ? "Select one answer." : "正しい回答を1つ選択してください。")}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, lineHeight: 1.75, color: INK }}>{L2(Q, "q")}</div>
            {opts.map((opt, i) => { const on = isMulti ? selArr.includes(i) : curPick === i; return (
              <button key={i} onClick={() => isMulti ? chooseRealMulti(i) : chooseReal(on ? null : i)} style={{ display: "flex", alignItems: "flex-start", gap: 12, width: "100%", textAlign: "left", marginBottom: 10, padding: "13px 15px", borderRadius: 6, border: `1px solid ${on ? STEEL : "#cbd5db"}`, background: on ? "#eaf3f7" : "#fff", color: INK, cursor: "pointer", fontSize: 14, lineHeight: 1.55 }}>
                <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: isMulti ? 4 : "50%", border: `2px solid ${on ? STEEL : "#9fb2ba"}`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>{on && (isMulti ? <span style={{ color: STEEL, fontSize: 13, fontWeight: 900 }}>✓</span> : <span style={{ width: 9, height: 9, borderRadius: "50%", background: STEEL }} />)}</span>
                <span><b style={{ marginRight: 6 }}>{"ABCDE"[i]}.</b>{opt}</span>
              </button>); })}
            <button onClick={resetPick} style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 22, border: "none", background: "#4a5b64", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>↺ {en ? "Reset answer" : "解答のリセット"}</button>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 13.5, color: INK, cursor: "pointer" }}><input type="checkbox" checked={!!flags[pos]} onChange={e => setFlags(f => ({ ...f, [pos]: e.target.checked }))} style={{ width: 16, height: 16 }} /><span>{en ? "Mark this question for review" : "この問題をあとで見直す"}</span></label>
          </div>
          <div style={{ display: "flex", gap: 16, margin: "16px 0 30px" }}>
            <button onClick={prev} disabled={pos === 0} style={{ flex: 1, padding: 15, borderRadius: 4, border: "none", background: pos === 0 ? "#9fb4bc" : NAVY, color: nvInk("#ffffff", pos === 0 ? "#9fb4bc" : NAVY, 3), fontWeight: 700, fontSize: 15, cursor: pos === 0 ? "default" : "pointer" }}>‹ {en ? "Back" : "戻る"}</button>
            <button onClick={next} style={{ flex: 1, padding: 15, borderRadius: 4, border: "none", background: NAVY, color: nvInk("#ffffff", NAVY, 3), fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{isLast ? (en ? "Finish" : "終了") : (en ? "Next ›" : "次へ ›")}</button>
          </div>
        </div>
      </div>
    );
  }

  // ===== 演習モード =====
  const submitted = sel !== null;
  const pMulti = !!Q.multi;
  const pNeed = pMulti ? Q.a.length : 1;
  const selSet = Array.isArray(sel) ? sel : [];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12.5, color: "#5a7780" }}>
        <span><span style={{ background: C.primary, color: nvInk("#ffffff", C.primary), borderRadius: 4, padding: "1px 8px", fontSize: 11, fontWeight: 700, marginRight: 8 }}>{T.practice}</span>{en ? `${T.setW} ${setNo} · Q ${pos + 1}/${qs.length}` : `${T.setW}${setNo}・問${pos + 1}/${qs.length}`}</span>
        <span>{Q.d} {domLabel(Q.d)}</span>
      </div>
      <div style={{ background: "#fff", border: `1px solid ${C.mid}`, borderRadius: 12, padding: 16, marginTop: 12 }}>
        {pMulti && <div style={{ fontSize: 12.5, fontWeight: 700, color: nvInk(C.primary, "#ffffff"), marginBottom: 8 }}>{en ? `Select ${pNeed} answers. (${submitted ? selSet.length : mSel.length}/${pNeed})` : `正しい回答を${pNeed}つ選択してください。（${submitted ? selSet.length : mSel.length}/${pNeed} 選択中）`}</div>}
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, lineHeight: 1.5 }}>{L2(Q, "q")}</div>
        {opts.map((opt, i) => {
          if (pMulti) { const chosen = submitted ? selSet.includes(i) : mSel.includes(i); const isC = Q.a.includes(i); let bg = "#fff", bd = C.mid, col = C.ink; if (submitted) { if (isC) { bg = "#E4F6EC"; bd = C.ok; col = C.ok; } else if (chosen) { bg = "#FBE9E7"; bd = C.ng; col = C.ng; } } else if (chosen) { bg = C.light; bd = C.primary; col = C.deep; }
            return (<button key={i} onClick={() => toggleMultiPractice(i, pNeed)} disabled={submitted} style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%", textAlign: "left", marginBottom: 8, padding: "11px 13px", borderRadius: 9, border: `1.5px solid ${bd}`, background: bg, color: col, cursor: submitted ? "default" : "pointer", fontSize: 13.5, lineHeight: 1.45 }}><span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, border: `2px solid ${(!submitted && chosen) ? C.primary : "#b7ccd3"}`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: 1, fontWeight: 900, fontSize: 12, color: col }}>{submitted ? (isC ? "✓" : (chosen ? "✗" : "")) : (chosen ? "✓" : "")}</span><span><b style={{ marginRight: 5 }}>{"ABCDE"[i]}.</b>{opt}</span></button>); }
          let bg = "#fff", bd = C.mid, col = C.ink; if (submitted) { if (i === Q.a) { bg = "#E4F6EC"; bd = C.ok; col = C.ok; } else if (i === sel) { bg = "#FBE9E7"; bd = C.ng; col = C.ng; } }
          return (<button key={i} onClick={() => choosePractice(i)} disabled={submitted} style={{ display: "block", width: "100%", textAlign: "left", marginBottom: 8, padding: "11px 13px", borderRadius: 9, border: `1.5px solid ${bd}`, background: bg, color: col, cursor: submitted ? "default" : "pointer", fontSize: 13.5, lineHeight: 1.4 }}><span style={{ fontWeight: 700, marginRight: 8 }}>{submitted && i === Q.a ? "✓" : submitted && i === sel ? "✗" : "ABCDE"[i]}</span>{opt}</button>);
        })}
        {pMulti && !submitted && (<button onClick={submitMultiPractice} disabled={mSel.length !== pNeed} style={{ marginTop: 6, width: "100%", padding: 12, borderRadius: 9, border: "none", background: mSel.length === pNeed ? C.primary : C.mid, color: nvInk("#ffffff", mSel.length === pNeed ? C.primary : C.mid, 3), fontSize: 14, fontWeight: 700, cursor: mSel.length === pNeed ? "pointer" : "default" }}>{en ? "Submit" : "解答する"}</button>)}
        {submitted && (<div style={{ marginTop: 12 }}><div style={{ background: C.light, borderRadius: 9, padding: 12, fontSize: 13, lineHeight: 1.55 }}><strong style={{ color: nvInk((pMulti ? eq(selSet, Q.a) : sel === Q.a) ? C.ok : C.ng, C.light) }}>{(pMulti ? eq(selSet, Q.a) : sel === Q.a) ? (en ? "Correct" : "正解") : (en ? "Incorrect" : "不正解")}</strong>・{en ? "Answer" : "正解"}：{(pMulti ? Q.a : [Q.a]).map(i => "ABCDE"[i]).join("・")}　{L2(Q, "e")}</div><button onClick={next} style={{ marginTop: 12, width: "100%", padding: 12, borderRadius: 9, border: "none", background: C.primary, color: nvInk("#ffffff", C.primary, 3), fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{isLast ? (en ? "See result" : "結果を見る") : (en ? "Next" : "次の問題")}</button></div>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
        <button onClick={prev} disabled={pos === 0} style={{ padding: "10px 30px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, border: `1.5px solid ${pos === 0 ? C.mid : C.primary}`, background: "#fff", color: pos === 0 ? "#a8c2cc" : nvInk(C.primary, "#ffffff"), cursor: pos === 0 ? "default" : "pointer" }}>{en ? "← Prev" : "← 前の問題"}</button>
        <span style={{ fontSize: 13, color: "#5a7780", fontWeight: 600 }}>{pos + 1} / {qs.length}</span>
        <button onClick={next} style={{ padding: "10px 30px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, border: `1.5px solid ${C.primary}`, background: "#fff", color: nvInk(C.primary, "#ffffff"), cursor: "pointer" }}>{en ? "Next →" : "次の問題へ →"}</button>
      </div>
    </div>
  );
}
