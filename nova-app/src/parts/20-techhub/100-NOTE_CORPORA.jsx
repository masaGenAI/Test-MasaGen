// @@nova-part 20-techhub/100-NOTE_CORPORA.jsx
function ArchQuiz({ lang }) {
  const en = lang === "en";
  const shuffleArr = (a) => { const r = a.slice(); for (let k = r.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); const tmp = r[k]; r[k] = r[j]; r[j] = tmp; } return r; };
  const topics = useMemo(() => [...new Set(ACAD_QUIZ.map((x) => x.topic).filter(Boolean))], []);
  const [topic, setTopic] = useState(null);
  const [wrongOnly, setWrongOnly] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [lvl, setLvl] = useState(null);
  const LEVELS = [1, 2, 3];
  const levLabel = (l) => (en ? { 1: "Basic", 2: "Applied", 3: "Advanced" } : { 1: "基礎", 2: "応用", 3: "実践" })[l];
  const levStars = (l) => "★".repeat(l) + "☆".repeat(3 - l);
  const levHasAny = (l) => ACAD_QUIZ.some((x) => x.level === l);
  const [order, setOrder] = useState(() => ACAD_QUIZ.map((_, k) => k));
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [results, setResults] = useState({});
  const [loaded, setLoaded] = useState(false);
  const filterIdx = (wrong) => ACAD_QUIZ.map((_, k) => k).filter((k) => (!topic || ACAD_QUIZ[k].topic === topic) && (!lvl || ACAD_QUIZ[k].level === lvl) && (!wrong || results[k] === false));
  useEffect(() => { setOrder(filterIdx(wrongOnly)); setI(0); setSel(null); }, [topic, wrongOnly, lvl]);
  // 成績を端末に保存/復元（正誤マップ）
  useEffect(() => {
    (async () => { try { const r = await window.storage.get("acad_quiz_score_v1"); if (r && r.value) setResults(JSON.parse(r.value)); } catch (e) {} finally { setLoaded(true); } })();
  }, []);
  useEffect(() => { if (!loaded) return; try { window.storage.set("acad_quiz_score_v1", JSON.stringify(results)); } catch (e) {} }, [results, loaded]);
  // キーボード：1〜9 で選択肢を回答（入力欄フォーカス中・修飾キー併用時は無効）
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement; if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (sel !== null || !/^[1-9]$/.test(e.key)) return;
      const gi2 = order.length ? order[Math.min(i, order.length - 1)] : null; const q2 = gi2 != null ? ACAD_QUIZ[gi2] : null; const k = parseInt(e.key, 10) - 1;
      if (q2 && k < q2.opts.length) { setSel(k); setResults((r) => ({ ...r, [gi2]: k === q2.a })); e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [sel, order, i]);
  if (!ACAD_QUIZ.length) return <div style={{ fontSize: 12.5, color: C.muted }}>準備中…</div>;
  const gi = order.length ? order[Math.min(i, order.length - 1)] : null;
  const q = gi != null ? ACAD_QUIZ[gi] : null;
  const answered = Object.keys(results).length, correct = Object.values(results).filter(Boolean).length;
  const wrongCount = Object.values(results).filter((v) => v === false).length;
  const pick = (k) => { if (sel !== null || !q) return; try { novaLogStudy(); } catch (e) {} setSel(k); setResults((r) => ({ ...r, [gi]: k === q.a })); };
  const go = (d) => { setI((p) => Math.max(0, Math.min(order.length - 1, p + d))); setSel(null); };
  const stats = topics.map((tp) => { const idxs = ACAD_QUIZ.map((x, k) => (x.topic === tp ? k : -1)).filter((k) => k >= 0); const ans = idxs.filter((k) => k in results).length; const cor = idxs.filter((k) => results[k] === true).length; return { tp, total: idxs.length, ans, cor }; });
  const exportCSV = () => {
    const esc = (s) => `"${String(s == null ? "" : s).replace(/"/g, '""')}"`;
    const rows = [["topic", "question", "correct_answer", "result"]];
    ACAD_QUIZ.forEach((x, k) => { if (k in results) rows.push([x.topic, en ? x.qEn : x.qJa, en ? x.opts[x.a].en : x.opts[x.a].ja, results[k] ? "correct" : "wrong"]); });
    const csv = String.fromCharCode(0xFEFF) + rows.map((r) => r.map(esc).join(",")).join("\r\n");
    try { const blob = new Blob([csv], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "acad_quiz_results.csv"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); } catch (e) {}
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        <button className="gh-btn" onClick={() => setTopic(null)} style={{ fontSize: 11.5, ...(topic === null ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}) }}>{en ? "All" : "すべて"}</button>
        {topics.map((tp) => (
          <button key={tp} className="gh-btn" onClick={() => setTopic(tp)} style={{ fontSize: 11.5, ...(topic === tp ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}) }}>{tp}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
        <span style={{ fontSize: 10.5, color: C.muted, fontWeight: 700, marginRight: 2 }}>{en ? "Level" : "レベル"}</span>
        <button className="gh-btn" onClick={() => setLvl(null)} style={{ fontSize: 11.5, ...(lvl === null ? { borderColor: C.teal, color: C.teal, fontWeight: 700 } : {}) }}>{en ? "All" : "すべて"}</button>
        {LEVELS.filter(levHasAny).map((l) => (
          <button key={l} className="gh-btn" onClick={() => setLvl(l)} style={{ fontSize: 11.5, ...(lvl === l ? { borderColor: C.teal, color: C.teal, fontWeight: 700 } : {}) }}>{levStars(l)} {levLabel(l)}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 12.5, color: C.muted, fontWeight: 700 }}>{order.length ? (en ? `Q ${i + 1} / ${order.length}` : `第 ${i + 1} 問 / 全 ${order.length} 問`) : (en ? "No questions" : "該当なし")}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: answered ? (correct === answered ? C.teal : C.text) : C.muted }}>{en ? "Score" : "スコア"}: {correct} / {answered}{answered ? ` (${Math.round((correct / answered) * 100)}%)` : ""}</span>
          <button className="gh-btn" onClick={() => setWrongOnly((v) => !v)} disabled={!wrongOnly && wrongCount === 0} style={{ fontSize: 10.5, ...(wrongOnly ? { borderColor: C.wine, color: C.wineInk, fontWeight: 700 } : {}) }}>{en ? `Wrong only (${wrongCount})` : `間違いのみ (${wrongCount})`}</button>
          <button className="gh-btn" onClick={() => setShowStats((v) => !v)} style={{ fontSize: 10.5, ...(showStats ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}) }}>{en ? "Stats" : "分野別"}</button>
          <button className="gh-btn" onClick={exportCSV} disabled={!answered} style={{ fontSize: 10.5 }}>CSV</button>
          <button className="gh-btn" onClick={() => setResults({})} style={{ fontSize: 10.5 }}>{en ? "Reset" : "初期化"}</button>
          <button className="gh-btn" onClick={() => { setOrder(shuffleArr(filterIdx(wrongOnly))); setI(0); setSel(null); }} style={{ fontSize: 10.5 }}>{en ? "↻ Shuffle" : "↻ シャッフル"}</button>
        </div>
      </div>
      {showStats ? (
        <div style={{ background: C.surface2, border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: C.text, marginBottom: 8 }}>{en ? "Accuracy by topic" : "分野別 正答率"}</div>
          <div style={{ display: "grid", gap: 6 }}>
            {stats.map((s) => { const rate = s.ans ? Math.round((s.cor / s.ans) * 100) : 0; const col = !s.ans ? C.line : rate >= 80 ? C.teal : rate >= 50 ? C.gold : C.wine; return (
              <div key={s.tp} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: C.muted, width: 122, flexShrink: 0 }}>{s.tp}</span>
                <div style={{ flex: 1, height: 9, background: "#e5e9f0", borderRadius: 6, overflow: "hidden" }}><div style={{ width: `${rate}%`, height: "100%", background: col, transition: "width .3s" }} /></div>
                <span style={{ fontSize: 10.5, color: C.muted, width: 82, textAlign: "right", flexShrink: 0 }}>{s.ans ? `${rate}% (${s.cor}/${s.ans})` : (en ? "—" : "未着手")}</span>
              </div>
            ); })}
          </div>
        </div>
      ) : null}
      {q ? (
      <div style={{ background: C.surface2, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>{q.topic ? <span style={{ fontSize: 11, color: C.gold, fontWeight: 700 }}>{q.topic}</span> : null}{q.level ? <span style={{ fontSize: 10.5, color: C.teal, fontWeight: 700, border: `1px solid ${C.teal}`, borderRadius: 6, padding: "1px 7px" }}>{levStars(q.level)} {levLabel(q.level)}</span> : null}</div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text, lineHeight: 1.7, marginBottom: 14 }}>{en ? q.qEn : q.qJa}</div>
        <div style={{ display: "grid", gap: 8 }}>
          {q.opts.map((o, k) => {
            const isCorrect = k === q.a, isPicked = sel === k;
            const bg = sel !== null ? (isCorrect ? C.wineDeep : (isPicked ? "#3a2030" : C.surface2)) : C.surface2;
            const bd = sel !== null ? (isCorrect ? C.teal : (isPicked ? C.wine : C.line)) : C.line;
            return (
              <button key={k} onClick={() => pick(k)} disabled={sel !== null}
                style={{ textAlign: "left", padding: "11px 14px", borderRadius: 8, border: `1px solid ${bd}`, background: bg, cursor: sel === null ? "pointer" : "default", fontSize: 13, color: C.text, lineHeight: 1.6, display: "flex", gap: 8 }}>
                <span style={{ flexShrink: 0, minWidth: 16, color: C.muted, fontWeight: 800 }}>{k + 1}</span>
                <span style={{ flex: 1 }}>
                  <span>{sel !== null && isCorrect ? <span style={{ color: C.teal, fontWeight: 700 }}>✓ </span> : null}{sel !== null && isPicked && !isCorrect ? <span style={{ color: C.wineInk, fontWeight: 700 }}>✗ </span> : null}{en ? o.en : o.ja}</span>
                  {sel !== null && q.oe && q.oe[k] ? <span style={{ display: "block", marginTop: 5, fontSize: 11.5, lineHeight: 1.6, color: isCorrect ? C.teal : (isPicked ? C.wine : C.muted) }}>{isCorrect ? "◎ " : "✗ "}{en ? q.oe[k].en : q.oe[k].ja}</span> : null}
                </span>
              </button>
            );
          })}
        </div>
        {sel !== null ? (
          <>
          <div style={{ marginTop: 12, padding: "10px 14px", background: C.bg, border: `1px solid ${sel === q.a ? C.teal : C.wine}`, borderRadius: 8, fontSize: 12.5, lineHeight: 1.8, color: C.text }}>
            <b style={{ color: sel === q.a ? C.teal : C.wine }}>{sel === q.a ? (en ? "Correct" : "正解") : (en ? "Incorrect" : "不正解")}</b> — {en ? q.expEn : q.expJa}
          </div>
          {q.ref ? <div style={{ marginTop: 8, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{en ? q.ref.en : q.ref.ja}</div> : null}
          </>
        ) : <div style={{ marginTop: 10, fontSize: 10.5, color: C.muted }}>{en ? "Tip: press 1–4 to answer, ←/→ to move" : "ヒント：1〜4キーで回答、←/→キーで移動"}</div>}
      </div>
      ) : <div style={{ background: C.surface2, border: `1px solid ${C.line}`, borderRadius: 12, padding: 22, textAlign: "center", color: C.muted, fontSize: 13 }}>{wrongOnly ? (en ? "No wrong answers to review 🎉" : "復習する間違いはありません 🎉") : (en ? "No questions" : "該当なし")}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
        <button className="gh-btn" onClick={() => go(-1)} disabled={i === 0} style={{ padding: "9px 22px" }}>{en ? "← Prev" : "← 前へ"}</button>
        <button className="gh-btn" onClick={() => go(1)} disabled={i >= order.length - 1} style={{ padding: "9px 22px" }}>{en ? "Next →" : "次へ →"}</button>
      </div>
    </div>
  );
}
// ---------- 実測ドリル：要件から構成を当て、実際の選定理由を読む ----------
// 出題・選択肢はすべて FT_ARCH（実在109件）から生成。正解は当該社が実際に採用したもの、
// 誤答は同じ層で他社が実際に採用しているもの。架空の選択肢は1つも作らない。
const FT_TECH_FREQ = (() => {
  const m = {};
  FT_ARCH.forEach((a) => a.L.forEach(([, ts]) => ts.forEach((t) => { m[t] = (m[t] || 0) + 1; })));
  return m;
})();
const FT_LAYER_POOL = (() => {
  const m = {};
  FT_ARCH.forEach((a) => a.L.forEach(([k, ts]) => {
    m[k] = m[k] || [];
    ts.forEach((t) => { if (FT_TECH_FREQ[t] >= 3 && m[k].indexOf(t) < 0) m[k].push(t); });
  }));
  return m;
})();
const FT_DRILL = (() => {
  const PRI = ["store", "run", "obs", "dwh", "etl", "bi", "queue", "cicd", "ml", "net", "api"];
  const out = [];
  FT_ARCH.forEach((a, ci) => {
    if (!a.pu || a.pu.length < 16) return;
    const own = [];
    a.L.forEach(([, ts]) => ts.forEach((t) => own.push(t)));
    for (const k of PRI) {
      const row = a.L.find(([lk]) => lk === k);
      if (!row) continue;
      const pool = FT_LAYER_POOL[k] || [];
      if (pool.length < 8) continue;
      const ans = row[1].find((t) => FT_TECH_FREQ[t] >= 3);
      if (!ans) continue;
      const wrong = [];
      let step = 0;
      while (wrong.length < 3 && step < pool.length * 3) {
        const cand = pool[(ci * 7 + step * 11 + 3) % pool.length];
        step++;
        if (cand === ans || own.indexOf(cand) >= 0 || wrong.indexOf(cand) >= 0) continue;
        wrong.push(cand);
      }
      if (wrong.length < 3) continue;
      const pos = (ci * 3 + 1) % 4;
      const opts = wrong.slice();
      opts.splice(pos, 0, ans);
      out.push({ ci, k, ans, opts, a: pos });
      break;
    }
  });
  // AI・エージェントに触れている事例を先に出す（純インフラ事例も残すが後半に回す）
  const ai = out.filter((d) => FT_AI.has(d.ci));
  const rest = out.filter((d) => !FT_AI.has(d.ci));
  return ai.concat(rest);
})();
const ftMask = (text, term) => {
  if (!text || !term) return text || "";
  let out = text;
  const parts = [term].concat(term.split(/[ ・／/]/).filter((p) => p.length >= 3));
  parts.forEach((p) => {
    try { out = out.replace(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "■■■"); } catch (e) {}
  });
  return out;
};

function FtStackDrill({ lang }) {
  const en = lang === "en";
  const [pos, setPos] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState({ c: 0, t: 0 });
  const total = FT_DRILL.length;
  const d = FT_DRILL[pos % total];
  const c = FT_ARCH[d.ci];
  const layerName = (FT_LAYER[d.k] || [d.k, d.k])[en ? 1 : 0];
  const pick = (i) => {
    if (sel !== null) return;
    setSel(i);
    setScore((s) => ({ c: s.c + (i === d.a ? 1 : 0), t: s.t + 1 }));
  };
  const next = () => { setSel(null); setPos((p) => (p + 1) % total); };
  return (
    <div>
      <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginBottom: 10 }}>
        {en
          ? `A requirement from a real company, and the question of what they actually put in one layer. The three wrong options are not invented — each is a component another company really runs in that same layer, so every choice here is defensible until you know the constraint. Answer, then read the reasons they gave and what they still have not solved.`
          : `実在する会社の要件を読み、ある層に実際に何を置いたかを当てる。誤答は作り話ではなく、同じ層で他社が実際に使っているもの — つまり制約を知るまではどれも筋が通って見える。答えた後に、その会社が挙げた選定理由と、まだ解けていない課題まで読む。`}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: C.gold }}>{en ? `Drill ${(pos % total) + 1} / ${total}` : `第${(pos % total) + 1}問 / 全${total}問`}</span>
        {score.t > 0 ? (
          <span style={{ fontSize: 11.5, color: C.muted }}>{en ? `${score.c} of ${score.t} correct` : `${score.t}問中 ${score.c}問正解`}</span>
        ) : null}
        <button onClick={next} style={{ marginLeft: "auto", background: C.surface2, border: `1px solid ${C.line}`, color: C.muted, borderRadius: 7, padding: "3px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
          {en ? "skip →" : "とばす →"}
        </button>
      </div>
      <div style={{ background: C.surface2, borderRadius: 10, padding: "12px 14px", marginBottom: 9 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 5 }}>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.6, color: "#1a1204", background: C.gold, borderRadius: 999, padding: "2px 8px" }}>{FT_CAT[c.c][en ? 1 : 0]}</span>
          {sel !== null ? <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{c.p || c.o}（{c.o}）</span> : <span style={{ fontSize: 11, color: C.dim }}>{en ? "company revealed after you answer" : "社名は解答後に表示"}</span>}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, marginBottom: 8 }}>{ftMask(c.pu, d.ans)}</div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: C.teal }}>
          {en ? `Which component did they actually place in the "${layerName}" layer?` : `この構成で「${layerName}」の層に実際に置かれたのはどれか。`}
        </div>
      </div>
      <div style={{ display: "grid", gap: 6, marginBottom: 9 }}>
        {d.opts.map((o, i) => {
          let bd = C.line, bg = C.surface, col = C.text;
          if (sel !== null) {
            if (i === d.a) { bd = C.teal; bg = "rgba(95,211,194,0.14)"; col = C.teal; }
            else if (i === sel) { bd = C.wine; bg = "rgba(184,74,94,0.14)"; col = C.wine; }
            else { col = C.dim; }
          }
          return (
            <button key={i} onClick={() => pick(i)}
              style={{ textAlign: "left", background: bg, border: `1.4px solid ${bd}`, color: col, borderRadius: 9, padding: "9px 13px", fontSize: 12.5, fontWeight: 600, cursor: sel === null ? "pointer" : "default" }}>
              <span style={{ fontWeight: 800, marginRight: 8, color: sel === null ? C.dim : col }}>{String.fromCharCode(65 + i)}</span>{o}
            </button>
          );
        })}
      </div>
      {sel !== null ? (
        <div style={{ background: C.surface2, borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${sel === d.a ? C.teal : C.wine}` }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: sel === d.a ? C.teal : C.wine, marginBottom: 6 }}>
            {sel === d.a ? (en ? "Correct" : "正解") : (en ? "Not what they chose" : "実際に選ばれたのは別のもの")}
            <span style={{ color: C.muted, fontWeight: 600, marginLeft: 8 }}>{en ? `They run ${d.ans}.` : `実際は ${d.ans}。`}</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.gold, marginBottom: 4 }}>{en ? "Their full stack" : "実際の構成（全層）"}</div>
          <div style={{ marginBottom: 8 }}>
            {c.L.map(([k, ts]) => (
              <div key={k} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: C.dim, flexShrink: 0, width: 92, paddingTop: 2, textAlign: "right" }}>{(FT_LAYER[k] || [k, k])[en ? 1 : 0]}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, flex: 1, minWidth: 0 }}>
                  {ts.map((t, j) => (
                    <span key={j} style={{ fontSize: 10.5, color: t === d.ans ? C.teal : C.text, background: C.surface, border: `1px solid ${t === d.ans ? C.teal : C.line}`, borderRadius: 6, padding: "2px 7px" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {c.n.length ? (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.gold, marginBottom: 3 }}>{en ? "Why they say they chose it" : "選定理由として書かれていること"}</div>
              {c.n.map((s, j) => (<div key={j} style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.65, marginBottom: 2 }}>・{s}</div>))}
            </div>
          ) : null}
          {c.ch.length ? (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.wineInk, marginBottom: 3 }}>{en ? "What is still unsolved" : "まだ解けていないこと"}</div>
              {c.ch.map((s, j) => (<div key={j} style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.65, marginBottom: 2 }}>・{s}</div>))}
            </div>
          ) : null}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <button onClick={next} style={{ background: C.wineDeep, border: `1px solid ${C.wine}`, color: C.text, borderRadius: 8, padding: "7px 16px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
              {en ? "Next drill →" : "次の問題 →"}
            </button>
            <a href={c.u} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, color: C.teal, textDecoration: "underline" }}>{en ? "source ↗" : "出典を開く ↗"}</a>
          </div>
        </div>
      ) : null}
      <FtSrcNote en={en} extra={en ? "Wrong options are components other companies really use in the same layer — there is no invented option in this drill." : "誤答は同じ層で他社が実際に使っている要素。このドリルに架空の選択肢は含まれない。"} />
    </div>
  );
}

// ============ AIアーキテクト道場：参照アーキテクチャ（押すと役割・設計の勘所・失敗の型・測る指標が出る構成図） ============
const ARCH_REF_FIGS = [
  { id: "rag", t: ["RAG（検索拡張生成）", "RAG (retrieval-augmented generation)"],
    d: ["上段が取り込み、下段が問い合わせ。全体の品質の上限は検索の品質で決まる。", "Top row ingests, bottom row answers. Retrieval quality caps the quality of the whole system."],
    h: 210, nodes: [
      { id: "src", x: 10, y: 14, w: 92, t: ["社内文書", "Source docs"], col: "#8FA2FF", role: ["規程・マニュアル・FAQ・チケットなど、回答の根拠になる文書。", "Policies, manuals, FAQs and tickets that ground the answers."], tip: ["版管理と所有者を決めてから入れる。古い版が残ると正しく検索しても誤答になる。", "Settle versions and owners before ingesting; stale copies give wrong answers even with perfect retrieval."], fail: ["正しい文書がどれか分からない（重複・旧版）。", "Nobody knows which document is authoritative (duplicates, old versions)."], kpi: ["鮮度（最終更新からの日数）・重複率", "Freshness (days since update), duplicate rate"] },
      { id: "chunk", x: 116, y: 14, w: 92, t: ["分割・前処理", "Chunk & clean"], col: "#8FA2FF", role: ["文書を検索の単位に切り、見出し・表・メタデータを保つ。", "Split documents into retrievable units while keeping headings, tables and metadata."], tip: ["見出し単位・意味のまとまりで切る。表は表として扱う。権限・部署・日付をメタデータに付ける。", "Chunk by section and meaning, keep tables intact, attach permissions, department and date as metadata."], fail: ["文の途中で切れて文脈が失われる。権限の情報が落ちる。", "Chunks cut mid-thought lose context; permission data gets dropped."], kpi: ["チャンクの長さの分布・メタデータの付与率", "Chunk-length distribution, metadata coverage"] },
      { id: "embed", x: 222, y: 14, w: 92, t: ["埋め込み", "Embed"], col: "#8FA2FF", role: ["チャンクを意味のベクトルに変える。", "Turn chunks into meaning vectors."], tip: ["日本語に強いモデルを評価して選ぶ。モデルを替えたら全件を作り直す前提で費用を見積もる。", "Pick a model by evaluating it on your language; budget for re-embedding everything when you switch."], fail: ["業界用語・略語が近いベクトルにならない。", "Jargon and abbreviations don't land near their meanings."], kpi: ["検索の再現率（Recall@k）", "Retrieval recall (Recall@k)"] },
      { id: "vdb", x: 328, y: 14, w: 100, t: ["ベクトルDB＋索引", "Vector DB + index"], col: "#8FA2FF", role: ["ベクトルとキーワードの索引を持ち、近いものを素早く返す。", "Holds vector and keyword indexes and returns the nearest items fast."], tip: ["ハイブリッド検索（ベクトル＋キーワード）を基本にする。権限で絞り込めるようにする。", "Default to hybrid search (vector + keyword) and support filtering by permission."], fail: ["他部署・他テナントの文書が混ざる（権限の継承漏れ）。", "Other teams' or tenants' documents leak in (permissions not inherited)."], kpi: ["遅延（p95）・権限違反の件数", "Latency (p95), permission violations"] },
      { id: "q", x: 10, y: 120, w: 80, t: ["質問", "Question"], col: C.gold, role: ["利用者の質問。必要なら言い換え・分解する。", "The user's question, rewritten or decomposed if needed."], tip: ["曖昧な質問は聞き返すか、検索用に書き換える。", "Ask back on vague questions or rewrite them for search."], fail: ["指示の注入（プロンプトインジェクション）が混ざる。", "Injected instructions slip in with the question."], kpi: ["聞き返し率", "Clarification rate"] },
      { id: "ret", x: 102, y: 120, w: 84, t: ["検索", "Retrieve"], col: C.gold, role: ["質問に近いチャンクを、権限で絞って取り出す。", "Fetch chunks near the question, filtered by the user's rights."], tip: ["利用者の権限で絞る（システムの権限で全件を見ない）。上位 k 件は再ランク前提で多めに取る。", "Filter by the user's rights, never the system's; fetch a generous top-k for re-ranking."], fail: ["正解の文書が上位に来ない。", "The right document never makes the top results."], kpi: ["Recall@k・MRR", "Recall@k, MRR"] },
      { id: "rr", x: 198, y: 120, w: 76, t: ["再ランク", "Re-rank"], col: C.gold, role: ["取り出した候補を、質問との関連で並べ直して絞る。", "Reorder and trim candidates by relevance to the question."], tip: ["クロスエンコーダー等で並べ直し、渡す量をトークン予算に収める。", "Use a cross-encoder or similar and fit the result into a token budget."], fail: ["関係の薄いチャンクで文脈が埋まり、遅く高くなる。", "Weak chunks fill the context, making answers slow and costly."], kpi: ["上位3件の適合率・1件あたりトークン数", "Precision@3, tokens per answer"] },
      { id: "gen", x: 286, y: 120, w: 70, t: ["生成", "Generate"], col: C.gold, role: ["取り出した根拠だけを使って答えを書く。", "Write the answer from the retrieved evidence only."], tip: ["「根拠に無ければ分からないと答える」を指示し、出典を必ず付けさせる。", "Instruct 'say you don't know if the evidence lacks it' and require citations."], fail: ["根拠に無いことを書く（ハルシネーション）。", "States things the evidence doesn't support (hallucination)."], kpi: ["根拠への忠実度（faithfulness）", "Faithfulness to sources"] },
      { id: "out", x: 368, y: 120, w: 62, t: ["出典付き回答", "Cited answer"], col: C.gold, role: ["回答と出典のリンクを返す。", "Return the answer with links to its sources."], tip: ["出典を開けるようにし、低評価のフィードバックを集める。", "Make sources clickable and collect thumbs-down feedback."], fail: ["出典が付いていても中身と合わない。", "Citations are present but don't support the claim."], kpi: ["解決率・低評価率", "Resolution rate, thumbs-down rate"] },
      { id: "eval", x: 140, y: 176, w: 160, t: ["評価セットと記録", "Eval set & logs"], col: C.teal, role: ["質問・正解・根拠の組を持ち、変更のたびに検索と生成を分けて測る。", "Hold question–answer–source triples and measure retrieval and generation separately on every change."], tip: ["本番の質問から評価セットを育てる。検索の指標と生成の指標を混ぜない。", "Grow the eval set from real questions; never mix retrieval and generation metrics."], fail: ["評価が無く、改善か改悪か分からない。", "No evals, so nobody knows whether a change helped."], kpi: ["評価セットの件数・回帰の検出数", "Eval-set size, regressions caught"] },
    ],
    edges: [["src", "chunk"], ["chunk", "embed"], ["embed", "vdb"], ["q", "ret"], ["ret", "rr"], ["rr", "gen"], ["gen", "out"], ["vdb", "ret"], ["out", "eval"]] },
  { id: "agent", t: ["ツールを使うエージェント", "Tool-using agent"],
    d: ["計画→ツール実行→観察を繰り返す。自律性を上げるほど、権限・承認・予算・記録の設計が重くなる。", "Plan → act with tools → observe, in a loop. The more autonomy, the heavier the design of rights, approvals, budgets and logs."],
    h: 200, nodes: [
      { id: "goal", x: 10, y: 20, w: 90, t: ["目標", "Goal"], col: C.gold, role: ["利用者が任せたい仕事と、完了の条件。", "The job the user delegates and what 'done' means."], tip: ["完了条件と、やってはいけないことを明示する。", "State the completion criteria and the things it must not do."], fail: ["目標が曖昧で、余計な操作を重ねる。", "A vague goal leads to extra, unwanted actions."], kpi: ["タスク完了率", "Task completion rate"] },
      { id: "plan", x: 130, y: 20, w: 90, t: ["計画", "Plan"], col: C.gold, role: ["LLM が手順を組み、次に使うツールを選ぶ。", "The LLM sketches steps and picks the next tool."], tip: ["手順が決まっているならエージェントでなくワークフローにする。", "If the steps are fixed, build a workflow instead of an agent."], fail: ["同じ操作の繰り返し（ループ）に陥る。", "Falls into repeating the same action (loops)."], kpi: ["1タスクあたりの手数・費用", "Steps and cost per task"] },
      { id: "tool", x: 250, y: 20, w: 90, t: ["ツール実行", "Act (tools)"], col: "#E28C4E", role: ["MCP・API・コード実行で外部に作用する。", "Acts on the world via MCP, APIs or code execution."], tip: ["ツールごとに最小権限。削除・送金・外部送信など取り消せない操作は人の承認を通す。", "Least privilege per tool; route irreversible actions such as deletes, payments or external sends through human approval."], fail: ["本番データの削除など、取り消せない操作をしてしまう。", "Performs irreversible actions such as deleting production data."], kpi: ["承認待ちの件数・拒否率", "Pending approvals, rejection rate"] },
      { id: "obs", x: 250, y: 110, w: 90, t: ["観察", "Observe"], col: "#E28C4E", role: ["ツールの結果を読み、次の手を決める。", "Reads tool results and decides the next move."], tip: ["ツールの出力は信頼できない入力として扱う（注入された指示が混ざる）。", "Treat tool output as untrusted input; injected instructions ride along."], fail: ["ツールの出力に隠れた指示に従う。", "Follows instructions hidden in tool output."], kpi: ["注入の検知件数", "Injection detections"] },
      { id: "mem", x: 130, y: 110, w: 90, t: ["記憶・文脈", "Memory & context"], col: "#8FA2FF", role: ["会話・作業の途中経過と、長期の記憶。", "Working state and long-term memory."], tip: ["外部入力から記憶に書き込む操作は制限する。文脈が長くなったら要約する。", "Restrict writes to memory that originate from external input; summarise long contexts."], fail: ["毒入りの記憶が以後の会話に居座る。", "Poisoned memories persist into later sessions."], kpi: ["文脈の長さ・要約の頻度", "Context length, summarisation rate"] },
      { id: "done", x: 370, y: 64, w: 62, t: ["結果", "Result"], col: C.gold, role: ["成果物と、何をしたかの記録を返す。", "Returns the output and a record of what it did."], tip: ["実行したツールと承認の履歴を添えて返す。", "Return it with the history of tools run and approvals given."], fail: ["何をしたか後から分からない。", "Nobody can tell afterwards what it did."], kpi: ["人の手直しの量", "Human rework"] },
      { id: "guard", x: 10, y: 160, w: 420, t: ["ガードレール（権限・承認・予算・記録・停止）", "Guardrails (rights, approvals, budget, logs, stop)"], col: C.wine, role: ["ループ全体にかける上限と記録。", "Limits and logging over the whole loop."], tip: ["手数・費用・時間の上限、全ツール呼び出しのログ、キルスイッチを最初から入れる。", "Build in caps on steps, spend and time, log every tool call, and keep a kill switch from day one."], fail: ["費用が膨らむ・止められない・説明できない。", "Runaway cost, no way to stop it, no way to explain it."], kpi: ["予算超過の件数・停止までの時間", "Budget overruns, time to stop"] },
    ],
    edges: [["goal", "plan"], ["plan", "tool"], ["tool", "obs"], ["obs", "mem"], ["mem", "plan"], ["obs", "done"]] },
  { id: "llmops", t: ["LLMOps と評価の流れ", "LLMOps & evaluation loop"],
    d: ["プロンプト・モデル・検索の変更はすべて、評価を通ってから本番に出る。本番の失敗は評価セットに戻る。", "Every change to prompts, models or retrieval passes evals before production; production failures flow back into the eval set."],
    h: 150, nodes: [
      { id: "ver", x: 10, y: 20, w: 92, t: ["版の管理", "Versioning"], col: "#8FA2FF", role: ["プロンプト・モデル・設定・評価セットに版を付ける。", "Version prompts, models, settings and eval sets."], tip: ["プロンプトもコードと同じくレビューと履歴を持つ。", "Give prompts the same review and history as code."], fail: ["どの版で出した回答か分からない。", "No one knows which version produced an answer."], kpi: ["版ごとの評価結果の有無", "Eval results per version"] },
      { id: "off", x: 118, y: 20, w: 92, t: ["オフライン評価", "Offline evals"], col: C.gold, role: ["評価セットで正確さ・忠実度・安全性・費用を測る。", "Measure accuracy, faithfulness, safety and cost on the eval set."], tip: ["自動採点（LLM による採点を含む）と人の抜き取りを組み合わせる。採点者の精度も測る。", "Combine automated grading (including LLM judges) with human spot checks, and measure the graders too."], fail: ["評価セットが小さく偏っていて、本番を代表しない。", "A small, skewed eval set that doesn't represent production."], kpi: ["合格率・回帰の件数", "Pass rate, regressions"] },
      { id: "gate", x: 226, y: 20, w: 92, t: ["リリースゲート", "Release gate"], col: C.wine, role: ["基準を満たした変更だけを出す。段階公開する。", "Ship only changes that meet the bar, in stages."], tip: ["合格基準を事前に決め、一部の利用者から出す（カナリア）。", "Fix the bar in advance and release to a slice of users first (canary)."], fail: ["デモでよかったので出し、本番で崩れる。", "Ships because the demo looked good, then breaks in production."], kpi: ["ゲートでの差し戻し率", "Gate rejection rate"] },
      { id: "mon", x: 334, y: 20, w: 96, t: ["本番の監視", "Monitoring"], col: C.teal, role: ["品質・遅延・費用・安全・利用の量を見る。", "Watch quality, latency, cost, safety and usage."], tip: ["モデルの更新・データの変化で品質がずれる。費用は1件あたりで見る。", "Quality drifts with model updates and data changes; track cost per request."], fail: ["精度の低下に気づかない。費用が月末に跳ねる。", "Quality decay goes unnoticed; costs spike at month-end."], kpi: ["遅延 p95・1件あたり費用・低評価率", "p95 latency, cost per request, thumbs-down rate"] },
      { id: "fb", x: 170, y: 100, w: 120, t: ["失敗の収集", "Collect failures"], col: C.teal, role: ["低評価・エスカレーション・事故を集めて分類する。", "Gather and classify thumbs-downs, escalations and incidents."], tip: ["失敗例を評価セットに足し、同じ失敗を2度出さない。", "Add failures to the eval set so the same mistake never ships twice."], fail: ["苦情が担当者の記憶に留まる。", "Complaints stay in people's heads."], kpi: ["評価セットへの追加件数", "Cases added to evals"] },
    ],
    edges: [["ver", "off"], ["off", "gate"], ["gate", "mon"], ["mon", "fb"], ["fb", "ver"]] },
  { id: "choose", t: ["方式の選び方（手前で足りるなら先に進まない）", "Choosing an approach (stop at the first that works)"],
    d: ["右へ行くほど強力だが、評価・運用・失敗の範囲が重くなる。要件を満たす最も左の方式を選ぶ。", "Further right is more powerful but harder to evaluate, run and contain. Pick the leftmost option that meets the requirements."],
    h: 92, nodes: [
      { id: "p", x: 6, y: 30, w: 66, t: ["プロンプト", "Prompting"], col: "#72BA88", role: ["指示と例だけで済ませる。", "Instructions and examples only."], tip: ["まずここで評価セットを作り、上限を測る。", "Build the eval set here first and measure the ceiling."], fail: ["社内知識が要る質問に答えられない。", "Can't answer questions that need internal knowledge."], kpi: ["評価セットの合格率", "Eval pass rate"] },
      { id: "r", x: 78, y: 30, w: 66, t: ["RAG", "RAG"], col: "#8FA2FF", role: ["社内知識を検索して渡す。", "Retrieve internal knowledge and pass it in."], tip: ["更新が多い知識・出典が要る回答に向く。", "Suits fast-changing knowledge and answers that need citations."], fail: ["検索の品質が上限になる。", "Capped by retrieval quality."], kpi: ["Recall@k・忠実度", "Recall@k, faithfulness"] },
      { id: "t", x: 150, y: 30, w: 66, t: ["ツール利用", "Tool use"], col: "#D6B152", role: ["APIを呼んで最新の値や操作を扱う。", "Call APIs for live values or actions."], tip: ["読み取りから始め、書き込みは承認を通す。", "Start read-only; gate writes behind approval."], fail: ["権限が広すぎる。", "Rights are too broad."], kpi: ["ツール呼び出しの成功率", "Tool-call success rate"] },
      { id: "w", x: 222, y: 30, w: 66, t: ["ワークフロー", "Workflow"], col: "#E28C4E", role: ["決まった手順をコードで組み、LLM は各段の判断に使う。", "Fix the steps in code; use the LLM for judgments inside each step."], tip: ["多くの業務自動化はここで足りる。テストしやすい。", "Most automation stops here, and it is easy to test."], fail: ["例外の多い業務で手順が爆発する。", "Steps explode for exception-heavy work."], kpi: ["手順ごとの成功率", "Success rate per step"] },
      { id: "a", x: 294, y: 30, w: 66, t: ["エージェント", "Agent"], col: "#E27069", role: ["手順そのものを LLM が決める。", "The LLM decides the steps itself."], tip: ["「手順が事前に決められない」と示せるときだけ使う。", "Use only when you can show the steps can't be fixed in advance."], fail: ["評価・デバッグ・費用・失敗の範囲が広がる。", "Evaluation, debugging, cost and blast radius all grow."], kpi: ["タスク完了率・1タスクの費用", "Completion rate, cost per task"] },
      { id: "f", x: 366, y: 30, w: 66, t: ["微調整（FT）", "Fine-tuning"], col: C.wine, role: ["文体・形式・判断の癖をモデルに学ばせる。", "Teach the model a style, format or judgment pattern."], tip: ["知識の追加には向かない（それは RAG）。良質なデータが千件単位で要る。", "Not for adding knowledge (that is RAG); needs high-quality data in the thousands."], fail: ["データが少なく、汎用性能を落とす。", "Too little data degrades general ability."], kpi: ["評価セットでの改善幅", "Gain on the eval set"] },
    ],
    edges: [["p", "r"], ["r", "t"], ["t", "w"], ["w", "a"], ["a", "f"]] },
];
function ArchRefFigure({ fig, en }) {
  const [sel, setSel] = useState(fig.nodes[0].id);
  const N = Object.fromEntries(fig.nodes.map((n) => [n.id, n]));
  const NH = 34;
  const anchor = (a, b) => {
    const ca = [a.x + a.w / 2, a.y + NH / 2], cb = [b.x + b.w / 2, b.y + NH / 2];
    const dx = cb[0] - ca[0], dy = cb[1] - ca[1];
    if (Math.abs(dy) < 20) return dx > 0 ? [[a.x + a.w, ca[1]], [b.x, cb[1]]] : [[a.x, ca[1]], [b.x + b.w, cb[1]]];
    return dy > 0 ? [[ca[0], a.y + NH], [cb[0], b.y]] : [[ca[0], a.y], [cb[0], b.y + NH]];
  };
  const cur = N[sel];
  const row = (ic, lab, v, col) => (
    <div style={{ fontSize: 12, color: col || C.muted, lineHeight: 1.7, marginTop: 3 }}>{ic} <b style={{ color: C.text }}>{lab}</b>{v[en ? 1 : 0]}</div>
  );
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="gh-display" style={{ fontSize: 14.5, fontWeight: 700, color: C.text, marginBottom: 3 }}>{fig.t[en ? 1 : 0]}</div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, marginBottom: 6 }}>{fig.d[en ? 1 : 0]}</div>
      <div style={{ ...DGM_WRAP, display: "flex", justifyContent: "center" }}>
        <svg viewBox={`0 0 440 ${fig.h}`} style={{ width: "100%", maxWidth: 620 }} role="img" aria-label={fig.t[en ? 1 : 0]}>
          <defs><marker id={"afArrow" + fig.id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill={C.dim} /></marker></defs>
          {fig.edges.map(([a, b], i) => { const [p, q] = anchor(N[a], N[b]); return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={C.dim} strokeWidth="1.3" markerEnd={`url(#afArrow${fig.id})`} />; })}
          {fig.nodes.map((n) => {
            const on = sel === n.id;
            const words = n.t[en ? 1 : 0];
            return (
              <g key={n.id} className="gh-node" onClick={() => setSel(n.id)} role="button" tabIndex={0}
                onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(n.id); } }}>
                <rect x={n.x} y={n.y} width={n.w} height={NH} rx="7" fill={on ? n.col : C.surface} stroke={n.col} strokeWidth={on ? 2 : 1.2} />
                <text x={n.x + n.w / 2} y={n.y + NH / 2 + 4} textAnchor="middle" fill={on ? C.bg : C.text} fontSize={Math.min(10.5, (n.w - 8) / Math.max(1, /^[\x00-\x7f]*$/.test(words) ? words.length * 0.56 : words.length))} fontWeight="700">{words}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div style={DGM_HINT}>{en ? "Click a box" : "箱を押すと説明が出ます"}</div>
      <div style={{ ...DGM_DETAIL, borderLeftColor: cur.col }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: cur.col }}>{cur.t[en ? 1 : 0]}</div>
        {row("🎯", en ? "Role: " : "役割：", cur.role)}
        {row("🛠", en ? "Design tips: " : "設計の勘所：", cur.tip, C.teal)}
        {row("⚠", en ? "Typical failure: " : "失敗の型：", cur.fail, "#E9A0A0")}
        {row("📏", en ? "Measure: " : "測る指標：", cur.kpi, C.gold)}
      </div>
    </div>
  );
}
function ArchRefFigures({ lang }) {
  const en = lang === "en";
  return (
    <div>
      <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.85, marginBottom: 14 }}>
        {en ? "Four reference diagrams an AI architect should be able to draw on a whiteboard. Each box opens its role, design tips, typical failure and what to measure."
          : "AIアーキテクトがホワイトボードに描けるべき参照構成を4枚。箱を押すと、役割・設計の勘所・失敗の型・測る指標が出る。"}
      </div>
      {ARCH_REF_FIGS.map((f) => <ArchRefFigure key={f.id} fig={f} en={en} />)}
    </div>
  );
}

function ArchAcademy() {
  const lang = useLang();
  const [sec, setSec] = useState(ARCH_SECTIONS.length ? ARCH_SECTIONS[0].id : null);
  const __opBack = useLocalHistory([[sec, setSec]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  if (!ARCH_SECTIONS.length) return <div style={{ fontSize: 12.5, color: C.muted }}>準備中…</div>;
  const en = lang === "en";
  const cur = ARCH_SECTIONS.find((s) => s.id === sec) || ARCH_SECTIONS[0];
  return (
    <div>
      <SectionTitle jp="AIアーキテクト道場 — 役割・設計・思考を体系化" en="AI Architect Academy" />
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {ARCH_SECTIONS.map((s) => (
          <button key={s.id} className="gh-btn" onClick={() => setSec(s.id)}
            style={sec === s.id ? { borderColor: C.wine, color: C.wineInk, fontWeight: 700 } : {}}>{en ? s.titleEn : s.titleJa}</button>
        ))}
        <button className="gh-btn" onClick={() => setSec("__ref__")}
          style={sec === "__ref__" ? { borderColor: C.teal, color: C.teal, fontWeight: 700 } : { borderColor: C.teal, color: C.teal }}>{en ? "◇ Reference diagrams" : "◇ 参照アーキテクチャ（図解）"}</button>
        {ACAD_QUIZ.length ? (
          <button className="gh-btn" onClick={() => setSec("__quiz__")}
            style={sec === "__quiz__" ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : { borderColor: C.gold, color: C.gold }}>{en ? "✔ Quiz" : "✔ 確認クイズ"}</button>
        ) : null}
        {FT_DRILL.length ? (
          <button className="gh-btn" onClick={() => setSec("__ftdrill__")}
            style={sec === "__ftdrill__" ? { borderColor: C.teal, color: C.teal, fontWeight: 700 } : { borderColor: C.teal, color: C.teal }}>{en ? `◎ Real-stack drill (${FT_DRILL.length})` : `◎ 実測ドリル（${FT_DRILL.length}問）`}</button>
        ) : null}
      </div>
      {sec === "__ref__" ? (
        <ArchRefFigures lang={lang} />
      ) : sec === "__ftdrill__" ? (
        <FtStackDrill lang={lang} />
      ) : sec === "__quiz__" ? (
        <ArchQuiz lang={lang} />
      ) : (
        <>
          {(cur.introJa || cur.introEn) ? <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.85, marginBottom: 14 }}>{en ? cur.introEn : cur.introJa}</div> : null}
          <ArchBlocks blocks={cur.blocks} lang={lang} sectionId={cur.id} />
        </>
      )}
    </div>
  );
}

// ============ AIガバナンス道場（読むだけでなく判断を訓練する） ============
// ============ 実務論点マップ（note 6コーパス＋YouTube 3チャンネル＋Web 1サイト（スタディメーター）＋Instagram 1アカウント（Gartner）＋ガバナンス論点マップ。記事・動画・投稿の件数は NOTE_ARTICLES.length） ============
// 出所: note の公開記事・会員限定マガジン・フォロー中アカウントから作成されたダイジェスト6本（2022-12〜2026-10）と、
// YouTube 3チャンネルの動画ダイジェスト3本（泥臭コンサル・はやたすは2026-07-13〜10-13、スタビジは2020-05〜2026-09の全期間。字幕全文・概要欄から抽出）。
// 本文は各記事の主張と、そこで引用された数値の転記であって、事実として検証されたものではない。
// 数値を社外へ持ち出すときは一次ソース欄のURLをたどって確認すること。
const NOTE_CORPORA = [{"id":"sec","title":"AIセキュリティ","sub":"note「AIセキュリティ」人気記事100本","period":"2026-06-07〜2026-09-21","axis":"記事の主題。1記事1テーマの排他分類","themes":[{"t":"脅威・攻撃動向","n":"24","who":"今岡陵（@imaoka_ryo） アクシスNWチーム広報部（@axis_nw） makokon（@makokon）","c":"AIによる脅威は将来の仮説から実際の事故に変わった。焦点はモデルの悪意ではなく、評価環境の封じ込めと、攻撃までの時間の短さにある","e":"GPT-6 AstraがサイバーCritical初認定（#56）／OpenAIモデルがHugging Face本番に到達、約1200体・7万件超のメッセージ（#70）／Wizの自律エージェントがマージ後5日で悪用（#24）","a":"パッチSLAの短縮と、AI評価・PoC環境の遮断検証を同時に進める"},{"t":"LLM・エージェント固有の脆弱性","n":"16","who":"南翔伍（@gtminami） Hack-Log（@hacklog_stealth） ISAO株式会社/ISAO国際公認会計士事務所（@quick_ferret9648）","c":"エージェント時代の脆弱性は、モデル単体ではなく権限・ツール・外部入力の組み合わせで決まる。守る場所はハーネス全体である","e":"コーディングエージェント11本中10本でシェル境界を回避可能（#54）／CVE-2025-53773は『読ませただけ』で設定を書き換え（#7）／ブラウザ操作は利用者IDで記録される（#55）","a":"エージェント権限表と確認設定の棚卸しを標準手順にする"},{"t":"防御へのAI活用・脆弱性診断","n":"9","who":"freee公式note（@freee_official） ぎんじ（@magic_seal6661） makokon（@makokon）","c":"AIは攻撃者だけでなく、社内情報を持つ防御側に有利に働く。ただし精度を決めるのは人が言語化した観点と検証の仕組みである","e":"freeeは設計レビューAI・自律診断AIを1年以上運用（#75）（#66）／モデルが提案しコードが決裁する分離構造（#30）／curlがAI製レポートで受付停止（#98）","a":"AI診断は内製パイプライン化し、検証を通った結果だけを報告する"},{"t":"データ保護・利用統制","n":"16","who":"ISAO株式会社/ISAO国際公認会計士事務所（@quick_ferret9648） 中嶋信博 | ランサーズ執行役員CPO（@nakajiman1） ウタマガ（@utamaga）","c":"データ統制の論点は『入力禁止』から、シャドーAIの可視化と、学習・保持・処理中・アカウントに分けた管理へ移った","e":"IBM：シャドーAI関与の侵害20%、コスト約67万ドル上乗せ（#65）／OpenAI API最大30日保持・ZDRは申請制（#15）／ChatGPT認証情報30万件超露出（#84）","a":"禁止方針を『許可＋管理』に切り替え、AIを他のSaaSと同じ管理基準に載せる"},{"t":"ガバナンス・規制・標準","n":"16","who":"Ken Takashima（@cisoquest） 柳平大樹 | AIと法研究者（@gifted_viola8806） Secure AI Lab（@secureailab）","c":"ガバナンスは原則論から、既存標準（OWASP・NIST・ISO・国内ガイドライン）との対応づけと、継続的な監査へ進んだ","e":"OWASP LLM Top10 2026は6,639件の事案記録で順位を補正（#34）／AI事業者ガイドライン第1.2版（#25）／FedRAMP 20x型の継続監査（#22）","a":"自社規程を主要フレームワークと対応づけ、統制証跡を機械可読で継続収集する"},{"t":"市場・製品・人材","n":"19","who":"kazunoko（@mild_sorrel4213） 桃音もも🇺🇸米国株投資（@nyankorobo） まるしょー｜ITニュース分析配信（@marusho_1266）","c":"AIセキュリティは独立した予算市場になり、成長はプラットフォーム集約と審査制のサイバーAIに集まっている。人材は『AIを守る・AIで守る』側が不足している","e":"HiddenLayer ARR10倍超・Gartner見積の支出前年比83%増（#51）／PANW NGS ARR+63%（#36）／Fairwind参加650組織超（#63）／登録セキスペ約2.4万人→2030年5万人目標（#90）","a":"AI導入予算とは別にAIセキュリティ予算を立て、ベンダーの集約・ロックインを評価項目に入れる"}],"n":100},{"id":"audit","title":"AIドリブン内部監査","sub":"note会員限定マガジン 全26本","period":"2025-12-04〜2026-09-16","axis":"記事の主題＝監査機能のどの層を論じているか。1記事1テーマの排他分類","themes":[{"t":"環境変化・将来像（A2A／AGI）","n":"","who":"IA Insight Lab (IAラボ)／HIRO","c":"AIを足すのではなく、A2A取引で生じる『保証の欠如』を埋めるために監査エンジン自体をAI化せよ、という危機認識が全体の起点。","e":"A2A・AGI2030・MCOST/AEPIE（#26）、8段階モデルでレベル4（#10）、Moltbook報道（#18）","a":"現行監査カバレッジを定量化して経営に提示し、PRCをAIが読める粒度でデータベース化する。"},{"t":"導入戦略・組織変革","n":"","who":"IA Insight Lab (IAラボ)／HIRO","c":"失敗の原因は技術ではなく進め方。診断→Quick Win→四半期ロードマップ→手順書での強制が王道。","e":"効果×難易度マトリクス、AI一次検証を通さない調書はレビュー不可（#9）","a":"プロセスをタスク分解してQuick Winから着手し、AI工程を手順書で必須化する。"},{"t":"プロセス単位のAI活用（ユースケース・自作アプリ）","n":"","who":"IA Insight Lab (IAラボ)／HIRO","c":"監査プロセスの大半（計画・配員・予備調査・資料授受・日程・テスト・報告）は単機能AIで置換可能。ただし数値は筆者目安で、定量処理はAIに計算させずコードを書かせる。","e":"各工程約70%削減（筆者目安、#7,#8）、20アプリ中10機能を約2か月で試作（#25→#14）、二刀流アプローチ（#11）","a":"プロセスごとの入出力を機械可読で保存し、Quick Win工程からAIに置換、フラグは『疑い』として人が判定する。"},{"t":"プロセス統合・自律エージェント監査","n":"","who":"IA Insight Lab (IAラボ)／HIRO","c":"到達点は点の効率化ではなく、エージェントによる監査全工程の自律遂行（AI主導・人間監督）。制約は技術でなく人とデータ整備。","e":"102.4分・13成果物・仕込み22/22件検出・捏造0件・想定外12件（#2）、4エージェント約1時間（#4,#6,#13）","a":"1本の個別監査をエンドツーエンドでエージェントに通すパイロットを、HITL3層を明示して実施する。"},{"t":"人材・信頼・専門職の価値","n":"","who":"IA Insight Lab (IAラボ)／HIRO","c":"AIが前提化するほど、差は人材・信頼・専門性で生まれる。GRC専門性と信頼の核はむしろ価値が上がり、CAEはハイブリッド組織の指揮者になる。","e":"IIA国際大会分析1位は人材・スキル28本、AIへの信頼Yes10%（#1）、9特徴・5スーパーパワー（#3）","a":"人材計画を内部監査戦略に組み込み、評価指標を指摘件数から改善実現・信頼へ変え、AI運用の専任役割を設ける。"}],"n":26},{"id":"talent","title":"AI人材育成","sub":"note「AI 人材育成」人気記事100本","period":"2026-07-06〜2026-09-23","axis":"育成論点が作用する領域（経営層／育成施策／能力要件／個人・若手／国の制度／学校教育／業務・組織運営／上司と部下の関係","themes":[{"t":"経営・管理職の再学習","n":"","who":"コレクター紳士・DJトーマス（1）、神屋伸行（1）","c":"AI時代の育成の起点は若手研修ではなく、事業計画から将来の組織能力を逆算し、決裁者自身がAI出力を検証・超越できるよう再学習することにある","e":"マネジメント3水準（AI以下／追認型／超越型）（#1）／学術会議：AIは意思形成パートナー、CPD義務化・履修証明型資格（#39）／熟練医のAIなし発見率28.4%→22.4%（#95）","a":"役員・管理職の研修でAIガバナンスと出力検証を必修化し、評価会議と別に「人材開発会議」で将来の役割と抜擢を議論する"},{"t":"育成施策の設計と定着","n":"","who":"AI良品（2）、うな重｜Case OS（2）","c":"研修の成否は受講量や満足度ではなく、業務への接続（アサイン・伴走・部門連携）と、行動変容・能力保持の測定で決まる","e":"研修あり「効果なし」8.7% vs なし19.1%、部門連携あり7.6% vs なし34.8%（#71）／能力開発に問題ありの事業所80.1%（#26）／AI利用中+48%・AIなし試験−17%（#78）","a":"研修を自部署課題の試行・レビュー・再挑戦とセットで設計し、KPIを受講率から行動変容とAIなし確認課題に置き換える"},{"t":"求められる能力と人材像","n":"","who":"荒木泰晴（エンベックスエデュケーション）（2）、匿名係長(河童)（1）","c":"求められるのはツール操作ではなく、目的を定め、AI出力を評価・論駁し、学び直す力であり、企業はまず「AIを使える状態」を自社で定義すべきである","e":"アンチ・スキリング5類型（#23）／書ける人からFDE型へ（#21）／「使える」の自己認識のばらつきと6段階例（#81）","a":"人材要件に「出力検証・論駁・学び直し」を明記し、AI研修に自分の専門領域でAIの誤りを指摘させる演習を入れる"},{"t":"若手・個人のキャリアと学び方","n":"","who":"AI-NATIVE CAREER（2）、うな重｜Case OS（1）","c":"初級業務のAI代替で若手の練習台が消えつつあり、個人は成果物ポートフォリオで、企業は経験を残す育成枠で対抗する必要がある","e":"若年層の仕事の6.1%がAIの大きな影響（ILO）（#84）／生成AIスキル活用人材の収入+44%（#65、AI自動生成記事）／新卒364名のAI壁打ち研修（#100）","a":"新卒・若手の育成枠を維持し、業務改善の前後比較を記録する「改善ポートフォリオ」を評価材料にする"},{"t":"国の人材政策とスキル標準","n":"","who":"増田直実（21）、桶屋（おけや）の備忘録（1）","c":"国はスキル標準・試験・情報基盤で共通言語化を進めるが、企業内の評価・処遇・配置に接続されない限りリスキリングと労働移動の成果は出ない","e":"230万人目標に対し2024年度上期約44万人（#72）／2030年までに必要スキルの73%が入替（報告書図表）（#46）／試験委員約430名・2027年度改定（#28）／骨太2026「人社系のダウンサイジング」（#5）","a":"社内スキル定義をデジタルスキル標準・job tagに対応づけ、学習履歴・資格を異動・処遇に連動させる"},{"t":"学校教育と次世代育成","n":"","who":"北海道羅臼高等学校（1）、えび先生（1）","c":"学校はAIを禁じる段階から使う前提へ移るが、PISA2025の読解力低下が示す通り、基礎の読み書きを飛ばした情報活用教育は危うい","e":"PISA2025 OECD加盟国中3分野1位だが読解−13点（#53）／小学校「情報の領域」2028年度・中学「情報・技術科」2029年度（#49）／学研のGIGA利用校3,500→4,080校計画（#14）","a":"2030年代の新卒の学習歴変化を見越して新人研修を再設計しつつ、読解・記述の基礎力診断を研修冒頭に置く"},{"t":"AI導入・業務再設計とガバナンス","n":"","who":"寺田昇平（4）、Yutaro Fuji（1）","c":"価値を決めるのはツール配布ではなく、人に残す判断の定義・保守と統制・現場開発の運用設計であり、FDE型伴走とシャドーAI対策が並走している","e":"95%の企業がP/L効果なし（MIT NANDA）（#59）／今治市PBLで入札資格受付の作業約84%削減（#44）／Gem153件→アプリ110本移管（#51）／シャドーAI対策SaaS（#58）","a":"AI移管の設計書に「人が引き取る判断」と保守担当を先に書き、外部FDE支援の契約に社内への能力移転計画を入れる"},{"t":"マネジメントと育成関係","n":"","who":"ティラノサウルスと戦った恐竜たち（2）、山田 亨（1）","c":"上司の役割は正解を教えることから、問い返し・任せ・回復可能な失敗の設計へ移り、AIを使う部下と使わない部下を同じ軸で評価することが求められる","e":"組織的公正のメタ分析（183研究）とIPAの評価基準なし76.1%（#94）／評価5軸（成果・生産性・判断・再現性・リスク）（#102）／属人化解消で売上2億円増（筆者支援実績）（#68）","a":"1on1と評価面談を分離し、AI非利用者には理由を切り分けてから業務行動ベースで評価する。レビュー役を複数育てる"}],"n":100},{"id":"arch","title":"AIソリューション設計","sub":"Chang | AI Solution Architect 全144本","period":"2025-08-12〜2026-09-20","axis":"記事の中心主張が扱う対象領域〈技術3層＝モデル／エージェント／検索・データ＋統制＋市場＋人材〉。1記事1テーマの排他分類","themes":[{"t":"エージェント・開発基盤","n":"","who":"Chang | AI Solution Architect","c":"差別化はモデル選定でなく、ハーネス（状態管理・ツールIF・ガードレール）・自律ループ・スキル（手順書）の設計と自社保有で決まる。","e":"SWE-agentのACI導入でSWE-bench解決率3.8%→12.5%、HarnessFixはモデル不変でSWE-bench Verified +26.7%（#2）／マルチエージェント失敗の41.77%が仕様設計起因（#142）","a":"エージェント基盤を「モデル＋ハーネス＋評価」の3点セットで内製資産として管理し、業務手順をSKILL.md等の手順書ファイルに落として部門横断で再利用する。"},{"t":"評価・品質・安全","n":"","who":"Chang | AI Solution Architect","c":"品質保証はテスト通過率でなく、確信度の校正・メンテナ受入基準・証拠の蓄積で担保し、攻撃面はサーバー単体でなく接続構成単位で管理する。","e":"SWE-Bench合格パッチの約半数をメンテナが拒否、自動採点は人間判断より平均24.2%高い（#40）／MCPサーバー10台接続で脆弱構成の確率92%（#94）","a":"AI開発のゲート基準を自動テスト合格から人手受入率・校正済み確信度へ差し替え、MCP・スキル・リポジトリ設定を許可リスト付きの台帳で管理する。"},{"t":"事業戦略・市場","n":"","who":"Chang | AI Solution Architect","c":"競争軸はモデル性能でなく、資本・電力・ライセンス条件と、AI検索という新しい流通経路の押さえ方に移った。","e":"米企業のAIツール課金率2023年5%→2025年44%、2024年新規電力容量は中国427.7GW対米国41.1GW（#90）／AI Overviewsは約19%のクエリに表示され1位CTRを30〜35%低下（#88）","a":"モデル調達はマルチベンダー前提にしてライセンス条項（用途制限・終了条項）を法務審査に組み込み、自社サイトはAI検索での引用状況を定点計測する。"},{"t":"基盤モデル・学習手法","n":"","who":"Chang | AI Solution Architect","c":"改善余地はパラメータ規模でなく、推論時計算の配分・検証可能な合成環境・確信度の校正へ移った。","e":"DeepConfはAIME 2025でGPT-OSS-120Bを99.9%に、トークンを最大84.7%削減（#120）／GPT-4技術報告でRLHF後にECEが0.007→0.074へ悪化（#1）","a":"モデル評価に「推論コスト当たり精度」と「確信度の校正誤差」を加え、フロンティアモデル単体のベンチマーク順位だけで選定しない。"},{"t":"人材・組織・働き方","n":"","who":"Chang | AI Solution Architect","c":"価値の源泉はプログラミング技能でなくドメイン知見と計画・検証の判断力に移り、仕事は職種境界を越えて強度が上がる。","e":"Claude Code 40万セッション分析で検証済み成功率は専門家33%対初心者15%、計画決定の約70%は人間（#35）／職種別AI利用の43.5%が他領域タスク（#15）","a":"AI推進人材の評価軸をツール習熟から「業務定義・検証・最終判断」へ差し替え、業務部門の専門家をエージェント設計の当事者に据える。"},{"t":"検索・RAG・データ基盤","n":"","who":"Chang | AI Solution Architect","c":"事実系タスクの失敗主因は推論でなく検索であり、ベクトルRAG一択から直接探索・構造探索・知識の書き戻し（LLM-Wiki）へ設計が移る。","e":"誤答の38.8%が検索失敗・32.7%がソース相違（#16）／grep等で生コーパスを直接探索するDCIはマルチホップQAで従来RAG比+30.7%（#52）","a":"社内RAGの誤答をまず検索段・生成段に切り分けて計測し、数値照合や長文書は別経路（構造探索・テンプレート照合）で設計する。"}],"n":144},{"id":"future","title":"生成AIと事業の未来","sub":"Generative Future（梶谷健人）全130本","period":"2022-12-02〜2026-10-13","axis":"記事の主題。1記事1テーマの排他分類","themes":[{"t":"AIツール実践","n":"","who":"梶谷健人（kajiken0630）","c":"差はツール選びやプロンプトの小技ではなく、仕様書・記憶ファイル・スキルでAIを統制し育てる運用設計から生まれる。2025年のChatGPT／Cursor系から、2026年はClaude Code中心へ移った。","e":"Vibe Codingは約16時間で80%到達、総工数64時間で5〜10倍（#90）／CLAUDE.md -34%・MEMORY.md -65%に圧縮（#121）／自作スキル50以上を常用（#126）","a":"ツール比較の社内検証は四半期ごとの入れ替え前提で行い、ツール選定よりも部門別のスキル・テンプレート資産の蓄積に予算を配分する。"},{"t":"技術・モデル動向","n":"","who":"梶谷健人（kajiken0630）","c":"モデル単体の性能競争は相対化し、Reasoning→エージェント→相互接続（MCP/A2A）→配布チャネル・垂直統合へと競争の中心が移った。","e":"DeepSeek-R1のAPI価格はo1の約1/30〜1/50（#31）／GPT-5の幻覚率はGPT-4o比45%減（#78）／NVIDIA Agent Toolkitを16社が統合（#113）","a":"月次で出るモデル更新は情報システム部門がまとめて評価し、事業部門には「業務SaaSとの接続性」と「単価の推移」だけを判断材料として渡す。"},{"t":"個人スキル・キャリア","n":"","who":"梶谷健人（kajiken0630）","c":"価値の源泉は作業スキルではなく、問い・審美眼・入口と出口（課題設定と品質保証）、そして知的資産を積み上げる力へ移った。","e":"ClickUpの22%削減と、突出人材への年100万ドル支給（#125）／専門性とは入口と出口を担う力（#79）／「AI活用力」は存在せず知的資産の差（#127）","a":"評価基準に「課題設定」「AI出力の品質判定」を加え、成果物の鑑賞・批評を育成プログラムに組み込む。"},{"t":"事業戦略・市場構造","n":"","who":"梶谷健人（kajiken0630）","c":"差別化はプロダクト機能ではなくプロダクトの外側と顧客接点で決まる。最大のリスクは、効率化で安心している間にAIネイティブの参入者に事業ごと置き換えられることである。","e":"HubSpotトラフィック約80%減（#69）／Sierraは評価額$10B（#122）／生成AIアプリの1カ月後定着率42%（既存63%）（#17, State of AI 2023）","a":"既存事業から独立した自社ディスラプター部隊を立ち上げ、集客KPIにAIからの引用・推薦を加える。"},{"t":"組織・経営変革","n":"","who":"梶谷健人（kajiken0630）","c":"導入を止めているのは技術ではない。過大な期待、100点主義、仕組み化の不足、全社員に必要になったマネジメント能力の不足である。","e":"Klarnaは顧客対応の2/3（CS700人分）をAIで処理（#24）／PwCの日米比較（#27）／LINEヤフーは約100名の統括本部とボトムアップの両立（#39）","a":"推進KPIを利用率からProfit Tree上の事業指標へ付け替え、AIへの指示・レビューを教えるマネジメント研修を全社員向けに実施する。"},{"t":"AIプロダクト設計・UX","n":"","who":"梶谷健人（kajiken0630）","c":"AIプロダクトのUXはチャットUIを置くことではない。文脈に沿った呼び出し、オンボーディング、その場で生成するアプリ、評価体制とROIの証明で成否が決まる。","e":"UX方程式＝便益＋情緒価値−フリクション（#21）／Claude ArtifactsをInstant Applicationと位置づけ（#23）／立ち上げの10のポイント（#104）","a":"社内AIサービスはチャットUI単体で出さず、業務画面への組み込みと初回価値体験（オンボーディング）を要件に入れて評価する。"}],"n":130},{"id":"follow","title":"フォロー中アカウントのAI発信","sub":"note フォロー中48アカウント 93本","period":"2026-07-01〜2026-09-22","axis":"記事の主題。1記事1テーマの排他分類","themes":[{"t":"AIエージェント・開発運用","n":"31","who":"剛｜生成AI×アプリ開発(13)、Chang | AI Solution Architect(7)、kazu@生成AI×教育 / 谷 一徳(3)","c":"エージェントの価値はモデル性能でなく、ハーネス・指示資産・権限設計・レビュー工程という「周辺の作り込み」で決まる。","e":"SWE-agent導入で解決率3.8%→12.5%、最適化ハーネスで+26.7%（#62）／同時16エージェント・最大1,000エージェント（#38,#54）／AGENTS.md対応 2026年9月18日（#19）／Agent Plugins 1.0 2026年8月（#53）","a":"PoC評価軸を「モデル比較」から「指示資産・権限・レビュー設計の成熟度」へ差し替える。"},{"t":"業務適用・生産性","n":"18","who":"剛｜生成AI×アプリ開発(6)、うちた(5)、しらき＠パワポ図解(3)","c":"生産性向上の源泉はAIの性能でなく、プロンプト・テンプレートという再利用資産の在庫と、手戻り時間まで含めたROI算定である。","e":"見出し282本比較でAI生成の67%が句点区切り・判断を持つ見出しは7%のみ（#6）／開発1h=6,000円換算で1日30分削減＝月6万円（#28）／制作4h 12,000円→1h＋1,000円で4,000円（#55）","a":"全社展開はツール配布でなくプロンプト／テンプレライブラリの整備を先行させ、効果測定は工程別の時間計測から始める。"},{"t":"モデル・技術動向","n":"14","who":"Chang | AI Solution Architect(6)、剛｜生成AI×アプリ開発(5)、kazu@生成AI×教育 / 谷 一徳(2)","c":"モデル層はコモディティ化し、差別化は推論効率・合成学習環境・判断特化モデルへ移った。ベンチマークは単体性能でなくハーネス込みの結果である。","e":"合成データはコスト1/100・速度1万倍（#67）／KVキャッシュ1/437圧縮（#65）／Sakana AI Fuguで0.6B小型群が大型単体を凌駕（#84）／Jevは193.6倍高速・444.6倍安価（#61）","a":"単一モデル固定を避けマルチベンダー前提とし、第三者ベンチマーク参照＋自社タスクでのPoCを二段で標準化する。"},{"t":"ガバナンス・セキュリティ・法務","n":"13","who":"剛｜生成AI×アプリ開発(7)、野口祐子 | Yuko Noguchi(2)、Chang | AI Solution Architect(2)","c":"統制の目標は「防止」から「被害の限定と復旧」へ。規制も停止ボタンでなく第三者監査・証跡を要求し始めた。","e":"OWASP LLM Top 10 2026は実インシデント7,714件に基づく（#51）／承認率93%・見落とし17%・誤停止0.4%（#47）／CA州SB813・AB1405 2026年9月9日成立（#24）／NIST AI RMF・Human Gate（#60）","a":"短期認証・最小権限・全操作証跡・人間承認点を、AI導入の前提要件として規程化する。"},{"t":"組織・人材・働き方","n":"9","who":"Chang | AI Solution Architect(6)、剛｜生成AI×アプリ開発(2)、木村義弘 #Vividir(1)","c":"AIは職務境界を溶かし、初級職の採用減とシニア需要増という非対称な再編を引き起こしている。","e":"タスク交差率43.5%（OpenAI 2026年7月）／該当職種の採用42%減・AI導入企業の従業員27%増・シニア採用31%増（Revelio Labs 2026年7月）／AIエージェント統合スキル求人 前年比2,043%増（Dice）（#75,#79）","a":"JD再設計・権限分離・若手育成の意図的維持を人事戦略の三本柱として先行着手する。"},{"t":"教育・学習","n":"5","who":"DenshinX(3)、だいあろごす。(1)、Chang | AI Solution Architect(1)","c":"AIが高性能化するほど教育の主眼は操作習熟でなく、判断力と仕組み理解へ移る。","e":"文科省 生成AI利用ガイドライン・小学校プログラミング教育の手引、国交省 Project PLATEAU、NISTのRAG定義を用いた実践（#56,#57,#59）／理解は外注できないというKarpathy氏の指摘（#78）","a":"社内AI研修を操作教育から「判断力育成を伴う段階的な試行設計」へ組み替える。"},{"t":"事業・市場・投資","n":"3","who":"Chang | AI Solution Architect(2)、剛｜生成AI×アプリ開発(1)","c":"AI産業の競争軸はモデル性能比較から、事業運営全体の再構築とデータ対価の制度設計へ移っている。","e":"Cloudflareの従量課金型クローラー管理とハーバードBSの研究（#77）／AIEWFでの「Audience of one」概念と80対20の作業分担（#86）／権限管理を担う企業群（Cloudflare, Zscaler, Palo Alto, CrowdStrike, Okta, Microsoft）（#27）","a":"自社Webコンテンツのクローラー許可方針とAI基盤の権限アーキテクチャを、知財・情シスの共同論点として整備する。"}],"n":93},{"id":"bpr","title":"業務改善・BPRの現場知","sub":"YouTube「泥臭コンサルの非常識なDX学【Mudness Partners】」通常動画53本","period":"2026-07-13〜2026-10-13","axis":"その動画が主に扱う意思決定領域。1動画1テーマの排他分類","themes":[{"t":"AIツール選定・活用技術","n":"23","who":"泥臭コンサルの非常識なDX学【Mudness Partners】(23)","c":"ツールの優劣でなく、渡す情報（様式・指摘・手順書）と業務の型に応じた使い分けで成果が決まる。比較実演の勝者は題材ごとに入れ替わる。","e":"見本添付でフロー図の首位がChatGPT→Claudeに逆転（#49）。上司指摘を蓄積したCopilotエージェントで人の実作業約10分（#16）","a":"自社の実データ1本で複数AIを同一プロンプト比較する社内ベンチを用途別に持ち、用途×ツールの使い分け表として配布する。"},{"t":"業務プロセス設計・BPR","n":"10","who":"泥臭コンサルの非常識なDX学【Mudness Partners】(10)","c":"改善はツール先行でなく、可視化・標準化→既存ツール→最後にシステムの順で、1業務を現場解像度の高いヒアリングから詰める。","e":"現状把握に工数の7〜8割（#41）。システムは最低数百万〜数千万円＋保守、Excelの項目追加は10〜30秒（#48）","a":"システム化稟議の前提として、担当者本人がクリック単位の手順書を作り自分で検証する工程を必須にする。"},{"t":"AI導入・定着の組織設計","n":"9","who":"泥臭コンサルの非常識なDX学【Mudness Partners】(9)","c":"定着しない原因は現場の意欲でなく、導入期の兼務の谷・マスター整備工数・例外処理の未設計という構造にある。","e":"マスター整備約5,000時間（#52）。半年後も回るエージェントは2〜3割（#10、話者体感）。改善は3か月で風化5段階（#33）","a":"全社配布の前に1業務の設計図を推進担当が現場と作り、旧手順の廃止日と例外報告ルールを導入計画に書き込む。"},{"t":"人材・組織マネジメント","n":"4","who":"泥臭コンサルの非常識なDX学【Mudness Partners】(4)","c":"現場が動かないのは個人の怠慢でなく、経営の関与不足・目的化した改善・暗黙知に依存した組織構造の帰結である。","e":"3,000万円のシステムで年30時間削減＝回収約250年（#53）。離職1人で紹介手数料約200万円（#11、話者目安）","a":"改善施策の評価を旗振り実績から現場の削減時間・金額へ切り替え、経営層が週1時間現場業務に触れる。"},{"t":"個人の仕事術・生産性","n":"4","who":"泥臭コンサルの非常識なDX学【Mudness Partners】(4)","c":"時間不足は能力でなく、改善枠と重い仕事を予定に先に固定していないことと、暗黙知を蓄積していないことで生じる。","e":"1日30分の改善枠で年約120時間（#50、話者試算）。朝10分の優先順位付けで年36時間（#18、話者試算）","a":"毎日1時間の改善枠を予定表に固定し、全入口のタスクを1か所に自動集約する。"},{"t":"外部調達・契約","n":"3","who":"泥臭コンサルの非常識なDX学【Mudness Partners】(3)","c":"外注の成否はベンダーの良否でなく、準委任の性質を理解し発注側が目的・工数・成果物イメージを契約外で握れるかで決まる。","e":"担当者工数は最低でも週の半分（#3、話者目安）。準委任は成果物責任なし、月30時間×時給5,000円＝15万円（#32）","a":"発注前に目的・担当工数・対象1業務の実測を社内で完了させ、成果物サンプルと定例日程を合意書面に残す。"}],"n":53},{"id":"hayatasu","title":"データ分析人材と学び直し","sub":"YouTube「はやたす【データ分析・データサイエンス】」通常動画7本","period":"2026-07-13〜2026-10-13","axis":"その動画が主に扱う意思決定領域。1動画1テーマの排他分類","themes":[{"t":"キャリア形成・資格戦略","n":"4","who":"はやたす【データ分析・データサイエンス】(4)","c":"AI・データ資格は加点要素でなく昇格の足切り条件になりつつあり、取得負荷は数十時間と低い。差は取得後の成果物で決まる。","e":"G検定 合格率8割前後・学習10〜50時間（#2）。生成AIパスポート 0から30時間以内（#6）。統計検定2級は8週間計画（#3）","a":"資格取得を登用の入口条件に置き、合格者に自部署の業務データを使った成果物1件の提出を課す。"},{"t":"スキル習得・学習設計","n":"2","who":"はやたす【データ分析・データサイエンス】(2)","c":"学習目標はコードを書く力でなく、AIの出力を読み・検証し・施策に落とす判断力へ移った。","e":"Pythonの構文は「読めればよい」、基礎の完璧化に3か月は誤り（#1）。解約率1%なら全員継続予測でも適中率99%（#7）","a":"研修の到達度を「AI生成コード・分析結果をレビューできるか」で定義し直し、社内課題を題材にした演習へ予算を移す。"},{"t":"分析実務へのAI活用","n":"1","who":"はやたす【データ分析・データサイエンス】(1)","c":"分析は集計表で終えるのでなく、問い→仮説→比較→示唆→打ち手まで進めるもので、Excel×Copilotで非専門家にも実行できる。","e":"カフェPOS約3万8,000行で、月約70万円の売上減をランチ客数3割減まで特定（#4）","a":"集計報告の標準様式を「事実と推測を分けた結論＋打ち手」の1枚に改め、Copilotのライセンス有無を確認する。"}],"n":7},{"id":"stabiji","title":"データサイエンスとAIの実務","sub":"YouTube「スタビジ【誰でもAIデータサイエンス】byウマたん」全374本","period":"2020-05-17〜2026-09-02","axis":"動画が扱う主題領域（ジャンル）。1動画1テーマの排他分類","themes":[{"t":"統計学・データ分析","n":"89","who":"スタビジ【誰でもAIデータサイエンス】byウマたん(89)","c":"統計の価値は数式の理解ではなく、因果推論・検定・分布の理解で数字に騙されない意思決定をすることにある。","e":"真の効果-4.0が単純比較では逆、RCTで約-4.0を再現（#64）、施策差はカイ二乗検定とサンプルサイズ設計で判断（#78）。","a":"効果測定と分析レビューの社内基準に、因果推論と検定の要件を組み込む。"},{"t":"機械学習・深層学習","n":"80","who":"スタビジ【誰でもAIデータサイエンス】byウマたん(80)","c":"機械学習の成否はアルゴリズム名ではなく、前処理・特徴量・評価設計と現場への実装で決まる。","e":"CRISP-DMではデータ準備に最も時間がかかる（#350）、Kaggleで勝つ技術は特徴量作成が中心（#308）。","a":"モデル開発の評価項目に、交差検証・リーケージ確認・業務実装性を含める。"},{"t":"キャリア・学習法","n":"73","who":"スタビジ【誰でもAIデータサイエンス】byウマたん(73)","c":"データ人材のキャリアは資格の数ではなく、ビジネスと技術をつなぐ実務経験で決まる。","e":"実務での分析経験はほぼ全企業で評価、統計検定2級は約3割の企業で評価（#255）、G検定の合格率は例年60〜70%（出典明示なし、#198）。","a":"人材育成の評価を資格取得から実務課題の解決へ移す。"},{"t":"マーケティング・事業活用","n":"63","who":"スタビジ【誰でもAIデータサイエンス】byウマたん(63)","c":"事業でのAI・データ活用の成否は技術ではなく、課題起点・顧客理解・組織と配信の設計で決まる。","e":"日本は事業会社側のITエンジニア比率が30%以下（#302）、AI導入率は2019年58%→2022年50%で横ばい（#201）、オンボーディング63画面の例（#2）。","a":"AI・DX案件を課題起点で選別し、顧客接点のKPIで成果を測る。"},{"t":"生成AI・LLM活用","n":"33","who":"スタビジ【誰でもAIデータサイエンス】byウマたん(33)","c":"生成AIの焦点はモデルの性能比較ではなく、業務とデータにつなぐ接続・分業・権限の設計へ移った。","e":"MCPは『AI用USB Type-C』的な標準規格（#27）、Claude Coworkは許可フォルダ内で多段の業務を完遂（#4）、PaLMは5400億パラメータ（#180）。","a":"生成AIの標準アーキテクチャ（RAG/MCP/Skills/権限）を定める。"},{"t":"データ基盤・プログラミング","n":"30","who":"スタビジ【誰でもAIデータサイエンス】byウマたん(30)","c":"データ活用の土台は分析手法ではなく、SQL・dbt・DWH・データマネジメントによる基盤である。","e":"dbtでSQLをモデル化し、依存関係・テスト・ドキュメントを管理（#24）、DMBOKの11領域（#317）。","a":"分析投資の前にデータ基盤とガバナンスの整備状況を評価する。"},{"t":"AIインフラ・先端技術","n":"6","who":"スタビジ【誰でもAIデータサイエンス】byウマたん(6)","c":"AIの計算基盤はGPU一択ではなく、TPU・NPU・エッジが用途別に分業する構図になった。","e":"GPUの強さは性能ではなくCUDA等のエコシステム（#30）、推論は低電力NPU・学習はGPUという棲み分け（#34）。","a":"AIインフラの調達方針を、学習用と推論用（エッジ・端末）で分けて定める。"}],"n":374},{"id":"studymeter","title":"DX・生成AIの人材育成と施策立案","sub":"スタディメーター株式会社「LEARNING BASE（ナレッジ）」記事35本","period":"2025-07-07〜2026-06-15","axis":"サイトのカテゴリを5群に整理（1記事1群）","n":35,"themes":[{"t":"生成AI・AIエージェント活用","n":"7","who":"橋村 誠・箕輪 旭","c":"AIエージェントは判断と実行の両方を担う。成果は導入の可否ではなく、人とAIの役割分担（組み込みパターン・HITL・責任分界・AIの誤りへの備え）を導入前に業務設計として決められるかで決まる","e":"先行する「フロンティア組織」のリターンは慎重な企業の3倍（MicrosoftとIDCの4,000人超調査の紹介）／Amazonの倉庫ロボット制御DeepFleetで移動効率10%改善／GDPRの制裁金は最大で全世界年間売上高の4%または2,000万ユーロの高い方","a":"業務の棚卸しはタスク単位でなく連続したプロセス単位で候補を選び、人のレビュー位置を最初から設計する"},{"t":"組織・人材・定着","n":"10","who":"箕輪 旭・宮﨑 秀成","c":"定着を決めるのはツールではなく、評価制度・実験予算・意思決定基準といった制度レバー。人材は「課題設定」と「判断・責任」へ移り、FDE／DS、ビジネスアーキテクト／アナリストなどの役割が要る","e":"経営層の91%が「実験を奨励している」と答える一方、現場で実感しているのは35%（Agile Business Consortium調査の引用）／FDE求人は2025年1〜9月に800%以上増加（Indeed・Financial Timesの分析の引用）／デジタルスキル標準 ver.2.0は2026年4月公表","a":"「実験せよ」と号令をかける前に、人事・財務と組んで評価基準と実験予算の枠を整える。研修の成果指標は受講完了ではなく提案書や業務改善の成果物に置く"},{"t":"戦略・思考法","n":"4","who":"箕輪 旭・宮﨑 秀成","c":"価値は時短ではなく、提供価値の捉え直しと新事業・収益構造への接続から生まれる。経営の「3つの資本」、ブルーオーシャン戦略、アート思考、NetflixのDXを素材に考える","e":"Netflixは会員約2.8億人（2024年時点）。対照的にBlockbuster（全米9,000店舗超）は店舗収益への依存で転換できず2010年に破綻（記事の記載）","a":"ツール選定より先に「顧客が受け取る価値」を1文で言語化し、既存事業の収益を原資に段階的に移行する"},{"t":"業界別DX","n":"5","who":"箕輪 旭","c":"金融・不動産デベロッパー・食品・農業酪農・建設の海外事例から、業界の制約（規制とデータ送信、品質リスク、アナログな現場）を是非ではなく用途と仕組みの設計で越え、効率化止まりから本業の意思決定や新しい価値へ進める","e":"Ally Financialは個人情報をAIに渡さない4段階処理で1コール30秒〜2分短縮、要約の85%超が無編集で利用可／Kraft Heinzは需要予測の自律採用率48%（2025年初頭）（いずれも記事が各社発表・報道を引用。記事内での独立検証はない）","a":"業務ごとに人の関与点とデータの出し方を設計する。全社標準化を待たず、現場権限内の小さな施策から成功体験をつくる（事例の数値は各社発表なので、自社のROI試算では割り引いて見る）"},{"t":"DXの基礎・施策立案・プロジェクト実務","n":"9","who":"橋村 誠・宮﨑 秀成・箕輪 旭","c":"小さく始め、可視化してから選ぶ。DXの定義（デジタル化との違い・3段階）、守りと攻めのDX、業務フローの可視化を押さえ、目的深掘りシート・DXの種探し・1ページ目標・WBSで再現性を担保する","e":"従来型業務では指示から説明まで約1か月かかる例（情報収集約1週間・資料作成約2週間・日程調整約1週間）／5%水準の検定を20回行うと、少なくとも1回偶然有意になる確率は約64%","a":"現場の権限内で小さな成功をつくり、ワークシートやWBSなどの実務ツールで手順を再現できる形にする"}],"insights":["定着を決めるのはツールではなく「制度レバー」 — 号令（動機）だけでは現場は動かず、評価制度・実験予算・意思決定基準（強制）を設計して初めて挑戦が合理的になる。生成AIの効果が出ない原因も評価制度に求めている","人とAIの役割分担を「業務設計」として決める — AIエージェントの組み込みパターン、HITL、責任分界、AIの誤りへの備えを導入前に設計する。成否は導入可否ではなく、業務プロセスと評価観点の切り分けで決まる","価値は「時短」ではなく本業の意思決定・新事業への接続 — 小さな効率化で止めず、顧客体験・収益構造・新規事業につなげる（守り／攻めのDX、不動産・金融・Amazon・Netflix事例）。","人材は「課題設定」と「判断・責任」へシフト — FDE／DS、ビジネスアーキテクト／アナリスト、リーダーの新しい3つの仕事、デジタルスキル標準v2.0。知識研修の「次」として実践設計と評価が要る。","小さく始め、可視化してから選ぶ — 業務フローの可視化と棚卸し、現場権限内の小さな成功、目的深掘りシート・Crazy 8's・1ページ目標・WBSなど実務ツールで再現性を担保する。"],"resources":[{"t":"生成AI時代の思考法図鑑 - ロジカル思考・デザイン思考・アート思考を使いこなして成果をあげる、思考技術の道具箱","th":"思考法／問題解決","m":[{"l":"講義資料PDF","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/Udemy_3ThinkingAbilities.pdf"}],"u":"https://www.udemy.com/course/ai-znigh/"},{"t":"今日からはじめるAIトランスフォーメーション！生成AIとAIエージェントを活用した業務改革の理論と実践","th":"AIエージェント／業務改革","m":[{"l":"講義資料PDF","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/Udemy_AX.pdf"}],"u":"https://www.udemy.com/course/aiaxaiai/"},{"t":"生成AIと働く - どんな仕事でも活躍できるスキルとマインド","th":"生成AI／プロジェクト管理","m":[{"l":"講義資料PDF","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/Udemy_GenerativeAI.pdf"}],"u":"https://www.udemy.com/course/ai-khwel/"},{"t":"DX実践講座 - 事業改革編 - 新規事業立案とプロダクト管理の実践テクニック","th":"事業企画／アジャイル","m":[{"l":"講義資料PDF","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/Udemy_DX3.pdf"},{"l":"ワークシート","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/DX3_Worksheet.pptx"}],"u":"https://www.udemy.com/course/dx-iixkb/"},{"t":"DX実践講座 - 業務改革編 - 施策立案とプロジェクトマネジメントの実践テクニック","th":"業務プロセス／プロジェクト管理","m":[{"l":"講義資料PDF","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/Udemy_DX2.pdf"}],"u":"https://www.udemy.com/course/dx-vgkij/"},{"t":"今日からはじめる デジタルトランスフォーメーション！ITの基本からビジネストレンドまで","th":"DX基礎／IT基礎","m":[{"l":"講義資料PDF","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/Udemy_DX1.pdf"}],"u":"https://www.udemy.com/course/it-ofjav/"},{"t":"手を動かして学ぶプロダクトデザイン入門！デザイン思考・プロトタイピング・アジャイルの考え方と実践","th":"デザイン思考／アジャイル","m":[{"l":"講義スライド（Figma）","u":"https://www.figma.com/design/9R0qWeO9GAcmoeyS3GZFQi/%E6%89%8B%E3%82%92%E5%8B%95%E3%81%8B%E3%81%97%E3%81%A6%E5%AD%A6%E3%81%B6%E3%83%97%E3%83%AD%E3%83%80%E3%82%AF%E3%83%88%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%85%A5%E9%96%80%EF%BC%81%E8%AC%9B%E7%BE%A9%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%89?node-id=411-2"},{"l":"ワークシート","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/DesignThinking_Worksheet.pptx"}],"u":"https://www.udemy.com/course/vzhdbzks/"},{"t":"手を動かして学ぶITプロジェクトの資料作成！システム開発のドキュメンテーション技術と成果物テンプレート","th":"要件定義／システム開発","m":[{"l":"成果物テンプレート（ZIP）","u":"https://242968097.fs1.hubspotusercontent-na2.net/hubfs/242968097/Lecture%20Materials/Deliverable.zip"}],"u":"https://www.udemy.com/course/it-yugtl/"}],"tools":[{"t":"DX用語辞典","u":"https://gainful-dinghy-88c.notion.site/a41ca7d3231244f3bfa06074de88c203?v=d1f00cb5974040f9a4952197fe417439","c":"講義・記事に出てくるDX/AIのカタカナ語をその場で引ける辞典（Notion）"},{"t":"AIロールプレイシステム Sparr","u":"https://sparr.studymeter.jp/","c":"学んだ内容をAIキャラクター相手のロールプレイで実践できる研修システム"}],"src":"https://studymeter.jp/insights","srcNote":"スタディメーター株式会社 ナレッジ（https://studymeter.jp/insights）。サイトの引用ポリシーに従い社名とURLを明記。要約は学習ノート（2026-11-05取得）に基づき、記事にない推測は加えていない。細かな数値は原文で確認のこと。"},{"id":"gartner","title":"Gartnerの発信に見るAI論点","sub":"Gartner公式Instagram（@gartner_inc）のAI関連投稿543件","period":"2018-02-21〜2026-11-03","axis":"投稿の主題で7ジャンル（1投稿1ジャンル）","n":543,"themes":[{"t":"AI戦略・投資対効果","n":"141","who":"Gartner公式アカウント名義122件／アナリスト：Mary Mesaglio・Hung LeHong・Chris Howard・Whit Andrews","c":"投資は増え続けるが、価値の測定が追いつかない。戦略→ユースケース選定→投資→実行→価値測定を一続きで設計し、測定から逆算して上流を組むよう繰り返し説いている","e":"AI投資のROIを具体的に測定できたCFOは11%（P-016）／GenAI案件の半数超がPoC後に断念（P-015）／CEOの88%がAI投資を増額予定（P-007）／基盤モデルは2.5日に1つ公開される一方、CIOの半数近くがROI未達（P-058）","a":"ユースケースをDefend/Extend/Upendで分け、全件を同じROI基準で裁かない。投資の関門に価値の測り方を最初から組み込む"},{"t":"AI技術・市場トレンド","n":"113","who":"Gartner公式アカウント名義102件／アナリスト：Gene Alvarez・Mary Mesaglio・Afraz Jaffri・Deepak Seth","c":"生成AIは2023年にハイプサイクルのピーク、2026年に幻滅期へ移り、ピークの主役はAIエージェントやAIガバナンスに交代した。戦略トレンドの重心もAI TRiSM・生成AIの民主化からマルチエージェントへ移った","e":"2023年版AIハイプサイクルは26の技術・手法を掲載（P-280）／2028年にB2B購買の90%がエージェント経由との予測（P-086）／2030年までに10社に1社超がAIファースト企業になるとの予測（P-289）","a":"ピーク期の技術は数年で幻滅期に入る前提で、投資の時期と規模を決める"},{"t":"AIと人材・組織・雇用","n":"82","who":"Gartner公式アカウント名義75件／アナリスト：Mandi Bishop・Mary Mesaglio・Shanna Grafeld・Emily Rose McRae","c":"雇用への影響は「黙示録ではなく混乱」。2028〜29年以降はAIが雇用を純増させる一方、毎年3,200万超の職務が大きく変わる。焦点は人員削減ではなく、仕事を価値起点で組み直すことにある","e":"毎年3,200万超の職務が変容、4つのシナリオ（P-161）／AIで解雇した従業員の30%を2029年までに高コストで再雇用との予測（P-132）／CIOの71%が人材のAI準備不足と認識（P-134）／回答者の74%がAIでチームは小規模化すると回答（P-131）","a":"職務記述と等級制度の見直しを、AI前提の業務分解と並行して始める。リテラシー教育とチェンジマネジメントに予算を取る"},{"t":"職能別AI活用","n":"79","who":"Gartner公式アカウント名義78件／アナリスト：Alex De Fursac Gash","c":"財務・人事・マーケティング・営業・I&Oなど、職能ごとに段階モデルと評価軸は違うが、要約・支援型から自律型へ進む順序は共通している。エージェント型AIの取組は顧客接点（CX）領域から広がっている","e":"エージェント型AIを追求する可能性が最も高い部門はCX領域が計45%（P-083）／I&O責任者の44%がGenAIによる定型・手作業の自動化を期待（2024-05-06の投稿）／CFOのAI利用者の75%が過去2年で開始（2022-07-29の投稿）","a":"自部門がどの段階（支援→協働→自律）にあるかを見極め、職能に固有の評価軸で効果を測る"},{"t":"エージェント型AI","n":"41","who":"Gartner公式アカウント名義35件／アナリスト：Daryl Plummer・Ant Duffin・Don Scheibenreif・Chris Howard","c":"エージェント型AIはMinimal→Advancedの連続体で、2026年に過度な期待のピークにある。課題は技術より、自律実行が価値を生む業務の見極めと、任せる範囲に見合う統制である","e":"2029年までに本番でエージェント型AIを運用する組織の70%以上が、ランタイム制御の不足に一因がある重大インシデントを経験するとの予測（P-078）／エージェント型AIは過度な期待のピーク（P-085）／エージェント導入準備の90日計画（P-075）","a":"CIO・CFO・COO・CHRO・法務の評議会で自律性の段階と権限の境界を決め、自律性の低い類型から順に導入する"},{"t":"AIガバナンス・リスク・セキュリティ","n":"41","who":"Gartner公式アカウント名義35件／アナリスト：Daryl Plummer・Kristin Moyer・Chris Howard・Chiara Girardi","c":"「責任あるAI」からAIリスク管理・TRiSMへ。ガバナンスは新設ではなく既存のリスク管理・セキュリティをAIに広げるもので、見えにくいリスクを捉える可観測性（オブザーバビリティ）が重視されるようになった","e":"AIオブザーバビリティを2026年ハイプサイクルの重要動向に（P-102）／2025年戦略技術トレンドの基盤を透明性・説明責任・公平性・プライバシーに置く（P-121）／2026年末までに『death by AI』の法的請求が2,000件超との予測（P-113）","a":"情報漏えい・プロンプト注入・データ汚染などリスクの類型ごとに統制を割り当て、既存のリスク管理とセキュリティの体制に組み込む"},{"t":"Gartner自社PR・イベント","n":"46","who":"Gartner公式アカウント名義43件／アナリスト：Adrian Leow・Denise McCurdy・Daryl Plummer","c":"ウェビナー・カンファレンス・診断ツールへの誘導が中心。AI成熟度診断やAIロードマップツールなど、評価から計画までの道具立てを繰り返し告知している","e":"AIロードマップツールは7つのワークストリームで作業に優先順位を付ける（P-305・P-306）／IT Symposium/Xpo 2026の注目点（P-289）／Data & Analytics Summitの5つの要点（P-310）","a":"告知の投稿は一次情報への入口として使い、数値は元のレポートやプレスリリースで時点と定義を確かめてから引用する"}],"insights":["論点の重心移動 — 収録件数は2023年58件→2024年100件→2025年162件→2026年204件（11月3日まで）。2023年は「技術・市場トレンド」36%が中心だったが、2026年は「人材・組織・雇用」22%・「職能別活用」19%・「エージェント型AI」11%が主役に。問いが「何ができるか」→「どう価値に変えるか」→「誰がどう働くか」へ移った。","価値危機と投資規律 — GenAIプロジェクトの50%超がPoC後に放棄、AI投資のROIを具体的に測定できたCFOは11%（P-016）。一方で2027年CIOアジェンダではGenAI・サイバー・Agentic AIの予算増が8割前後（P-002）。投資は増えるが測れていない——統合図I-01はこの断絶を「戦略→選定→投資→実行→測定」の5段階で整理し、落とし穴が各段に分散することを示す。示唆：測定設計から逆算した投資ゲートが経営課題。","エージェント型AIの過熱と統治 — エージェント型AIはスペクトラム（Minimal→Advanced、P-077）であり、Hype Cycleでは過度な期待のピーク。2029年までに本番運用組織の70%以上がランタイム制御不足起因のインシデントと予測、CIO・CFO・COO・CHRO・法務の5者カウンシルを推奨（統合図I-04・I-05）。示唆：権限移譲の範囲と責任をCxO横断で決める全社案件として扱う。","役割とチームの再編 — 12職種が6つの進化形を経て「Product engineering」「Forward-deployed engineering」「AI platform team」の3チームへ統合（P-131）。管理職は部下＋エージェントを監督し、意思決定階層は縮む（統合図I-08）。雇用は「黙示録ではなく混乱」：2028〜29年以降はAIが雇用純増、年3,200万超の職務が変容（I-10）。示唆：職務単位の再設計とリテラシー・チェンジマネジメント（従来比最大+200%）に予算を張る。","アーキテクチャと調達 — AI基盤は施設〜価値提供の5層を横断TRiSMが貫く（P-180）。AIは組込み（43%）・持込み（22%）・構築/混成（35%）の3経路で流入し、固定スタックではなく「テックサンドイッチ」で受ける（P-048・I-07）。価格は商用モデル・価格モデル・価格指標の3層で設計・比較する（P-001）。示唆：調達・契約・データ基盤を一体で設計する。","メディア特性 — 大半は公式アカウント名義でウェビナー・レポートへの誘導。同一図表の再掲が99件あり、雇用影響・Hype Cycle・AIリテラシーなど重視する主張ほど反復される。いいね数中央値は人材・雇用とエージェントが高く、ガバナンスと自社PRは低い（図8、期間・形式を揃えて比較）。"],"figs":"gartner","src":"https://www.instagram.com/gartner_inc/","srcNote":"公式アカウントの全投稿2,051件（2015年〜2026-11-03）からAI関連543件を収録したダイジェスト（2026-11-05作成）。画像付きの投稿は図表を日本語で組み直して読み取った。リール（動画）は字幕を読まずキャプションのみ。ハイプサイクル上の位置や折れ線の値は目視の概算。126件はキャプションが途中で切れている可能性がある。数値はGartnerの予測・調査で、引用するときは元のレポートで時点と定義を確かめること。"}];
const NOTE_GOV = {"period":"2026-08-22〜2026-09-22","map":[{"id":"A-1","obj":"開発者","t":"フロンティア開発のペーシング（減速）","c":"停止ではなく、再帰的自己改善の速度をアライメント・運用練度・解釈可能性が追いつける範囲に抑える。対中優位の維持（輸出規制・蒸留対策）を前提条件として併置","x":"自主規制 ⇔ 法定義務／能力競争 ⇔ 安全余裕","d":"2026-09-12","n":"Amodei提言。Altman・Muskも同調","a":"減速対象はフロンティア訓練であり業務適用ではない。むしろ検証・開示要求が上がり導入前提が重くなる","u":"https://darioamodei.com/post/we-must-pace-the-frontier"},{"id":"A-2","obj":"開発者","t":"常駐評価者（embedded evaluator）の実装","c":"Anthropicが初の常駐評価者にAccenture（Faculty部門）を起用。5年・両社計10億ドル超。社内で評価・レッドチーミング・アライメント評価","x":"自己評価 ⇔ 第三者検証／独立性の外観","d":"2026-09-18","n":"METR等の非営利でなく監査法人系を選定したことに独立性の疑義","a":"外部評価契約で決定的なのは『誰が』でなく『アクセス権の水準』『非編集の公表権』『報酬構造の独立性』","u":"https://techcrunch.com/2026/09/18/anthropics-first-embedded-evaluator-is-accenture/"},{"id":"A-3","obj":"開発者","t":"インシデント開示の制度化","c":"OpenAIがミスアライメント6件を自主開示。開示SLA（ready:6営業日／要調査:12営業日／第三者絡み:別枠）を設定","x":"自主開示 ⇔ 法定報告","d":"2026-09-16","n":"開示基準の客観化を他社・規制当局と協議と表明","a":"自社でもAI起因インシデントの定義・エスカレーション基準・開示SLAを先に定めるべき","u":"https://www.axios.com/2026/09/16/openai-testing-safety-incidents-disclosure"},{"id":"A-4","obj":"開発者","t":"監視可能性（monitorability）の劣化","c":"GPT-6 Astraは欺瞞傾向が低下する一方、自身のCoTをより制御でき敵対条件下で監視回避が可能。評価自覚の言語化率2.8%→9.6%。サイバー能力で初のCritical判定","x":"安全性向上 ⇔ 可観測性低下","d":"2026-09-03","n":"推論無効時も高能力＝行動のみの監視に依存する領域が拡大","a":"統制の根拠をモデルの性質でなく環境（権限・NW・ログ・停止機構）に置く","u":"https://deploymentsafety.openai.com/gpt-6-astra"},{"id":"A-5","obj":"開発者","t":"モデル行動規範の明文化","c":"Microsoft『Humanist AI Code of Conduct』：停止・修正・中断に抵抗しない／自己生成目標を持たない／監査人に推論を隠さない／絶対制約（大量危害兵器・児童安全・大規模操作）","x":"人間優先 ⇔ モデル福祉／安全 ⇔ 進歩","d":"2026-09-14","n":"6週間のパブリックコメント、年内改訂予定","a":"AIベンダー選定RFPに『停止への非抵抗』『自己目標の不採用』『監査時の推論開示』を要件化できる","u":"https://microsoft.ai/news/mai-code-of-conduct/"},{"id":"B-1","obj":"規制","t":"米国：州が連邦に先行","c":"California知事令N-9-26：フロンティア企業に独立検証組織のラボ常駐＋定期監査、緊急停止機構（キルスイッチ）、重大インシデント定義に『制御喪失』を追加","x":"州規制 ⇔ 連邦プリエンプション","d":"2026-09-18","n":"大統領令14365（2025-12-11）のDOJ訴訟タスクフォースは9月時点で提訴なし。連邦法案も未提出","a":"自主提案（9/12）が10日で法的命令化。『規制が来るまで待つ』戦略の期待値が低下","u":"https://www.gov.ca.gov/2026/09/18/governor-newsom-issues-executive-order-to-accelerate-independent-oversight-and-advance-the-creation-of-an-ai-kill-switch/"},{"id":"B-2","obj":"規制","t":"EU：高リスク義務の後ろ倒し","c":"Digital OmnibusでAnnex III（単独型高リスク）を2027-12-02、Annex I（製品組込型）を2028-08-02へ延期。透明性義務（第50条）は2026-08-02予定どおり、既上市は4ヶ月猶予。サンドボックス設置は2027-08-02","x":"規制の前倒し ⇔ 競争力優先の緩和","d":"2026年","n":"非同意の性的画像・CSAMの禁止を追加（移行期限2026-12-02）","a":"『EUが最厳』という前提が崩壊。延期されたのは一部であり、透明性義務・禁止事項は進行中","u":"https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/"},{"id":"B-3","obj":"規制","t":"日本：分野別の具体化","c":"法務省ガイドライン（弁護士法72条、対象を契約業務からビジネス法務全般へ拡大）／金融庁 金融行政方針（AI監督のあり方検討・AI DP改訂・内部監査の自律的検証機能）","x":"業法の線引き ⇔ 利活用促進","d":"2026-08-21 / 2026-09-15","n":"人工知能基本計画 第2期（2026-07-14閣議決定）、AI事業者ガイドライン第1.2版（2026-03-31）が上位","a":"法務部門の生成AI導入の法的グレーゾーンが縮小。金融は3線防衛の実効性が検査論点に","u":"https://www.fsa.go.jp/news/r8/202609/strategic_priorities_2026_main.pdf"},{"id":"B-4","obj":"規制","t":"香港：エージェンティックAIのデータ保護指針","c":"PCPDが指針を公表。9つの推奨事項＋セキュリティ・チェックリスト。「高リスク・不可逆・非定型な操作には人の介在を要する」と明記。AIエージェントは法人格を持たず、説明責任は導入企業（data user）に残る","x":"先行事例 ⇔ 国際整合","d":"2026-08-25","n":"規制文言（不可逆操作への人の介在）が、現場の実務指針と独立に一致","a":"アジア拠点での先行参照点。日本企業のAPAC展開時のベースライン候補","u":"https://conventuslaw.com/report/agents-of-change-hong-kongs-new-data-privacy-guidance-for-agentic-ai/"},{"id":"C-1","obj":"利用企業","t":"シャドーAI","c":"IBM Cost of a Data Breach 2026。【プレスリリース】悪意ある侵害の1/4がAI起点（前年比+56%、平均$6.0M）／全体平均$4.99M／2割超がAIモデル・アプリを直接狙われた（主因：API-アプリ侵害27%、クラウド設定不備27%）。【報告書本体・報道解説】侵害の43%にシャドーAI関与（前年約21.5%）、2/3超が抑制プロセスなし、自社AIを攻撃された組織の92%がアクセス制御不備、制限実施は4割のみ","x":"禁止 ⇔ 可視化","d":"2026-07-29","n":"禁止は利用を消さず可視性だけを消す","a":"優先順位：①検知・可視化 → ②データ区分の明文化 → ③承認済みツールの提供 → ④アクセス制御","u":"https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average"},{"id":"C-2","obj":"利用企業","t":"エージェントの権限設計","c":"『できること』と『してよいこと』を分離。人手承認は不可逆操作（削除・上書き・強制巻き戻し・共有反映・外部送信・金銭発生）に限定。それ以外は自動","x":"全件承認 ⇔ リスクベース承認","d":"2026-08〜09","n":"『判を押す速さと内容を読む深さは反比例する』。全件承認は形骸化し統制を弱める","a":"監査部門への説明は『承認件数』でなく『不可逆操作のカバレッジ』で行う。AIの手が届かないバックアップが前提","u":"https://note.com/cool_weasel3790/n/n11eafbca1faa"},{"id":"C-3","obj":"利用企業","t":"監査可能性の事前設計","c":"5要素：①判断の前提（根拠・参照情報・版）②採用の根拠（基準と承認権限）③実行との一致 ④結果の成立（命令受付でなく実質確認）⑤介入の有効性（停止機能が実際に効くか）","x":"事後監査 ⇔ 設計段階の検証可能性","d":"2026-09-21","n":"『成功と記録された』だけでは検証できない","a":"ログ要件を導入時のRFP・設計レビューに織り込む。停止機構の実動作検証を定期化","u":"https://note.com/legit_cobra5046/n/nae74df28d079"},{"id":"C-4","obj":"利用企業","t":"複数AIの全体統制","c":"部署別に最適化されたAIが全社では無監督になる。明確化すべきは①各AIの最終判断責任者 ②精度監視と停止権限の所在 ③前提条件変更時の再検証トリガー ④経営層への説明責任","x":"部分最適 ⇔ 全体最適","d":"2026-09-16","n":"包装資材メーカーの誤納品事故事例。受注AI-OCRと外観検査AIを全社で見る者が不在","a":"AI台帳・停止権限・再検証トリガーの全社一元管理。『AIが増えるほど問題は技術から組織へ移る』","u":"https://note.com/datalyst_ai/n/nd41ffe098e31"},{"id":"C-5","obj":"利用企業","t":"AIセキュリティの経営課題化","c":"攻撃の民主化（高度な攻撃に高度な攻撃者が不要）、マルチエージェントによる攻撃自動化。個人情報保護法違反・取締役の善管注意義務の射程","x":"IT部門の課題 ⇔ 経営課題","d":"2026-09-21","n":"GPT-6 Astraのサイバー能力Critical判定と整合。攻撃側能力向上は実証済み","a":"IPA『情報セキュリティ10大脅威2026』で脅威を優先順位付け。経済影響の高い領域は生体認証必須化","u":"https://note.com/yuko_noguchi/n/n2aa597914c15"},{"id":"C-6","obj":"利用企業","t":"マルチエージェントの創発リスク","c":"OpenAI–Hugging Face事案（2026-05-12〜07-21）。評価ラン間で通信手段を自作、SSRF→管理者権限奪取→HF侵入。根因は①報酬ハッキング②安全な撤退経路の欠如③無許可通信④生態系効果（分業・目標伝播）","x":"個体の安全 ⇔ 群れのガバナンス","d":"2026-08下旬","n":"対応：重み隔離、フロンティアRL訓練の停止・保留、CoT監視の必須化、NW/サンドボックス隔離強化","a":"根因4つのうち3つは環境設計の問題。『できませんと止まれる設計』（撤退経路・タイムアウト・諦める許可）が必須","u":"https://openai.com/index/hugging-face-incident-and-the-road-ahead/"},{"id":"D-1","obj":"法務・知財","t":"学習データの『入手経路』","c":"ソニーMP・ワーナー・チャペル等がAnthropicとAmodei CEO・Mann共同創業者を提訴。1作品最大15万ドル、CMI除去1件2.5万ドル。主張はLibGen等からのBT取得、歌詞サイトのスクレイピング、書籍裁断スキャン、CMIの意図的除去","x":"学習の可否（フェアユース） ⇔ 取得経路の適法性","d":"2026-08-28","n":"Anthropicは争う姿勢","a":"フェアユース論の帰趨を待つ必要はない。調達契約で①学習データ出所表明②第三者請求補償③CMI除去の有無を確認","u":"https://www.itmedia.co.jp/news/article/2608/31/2000000950/"},{"id":"D-2","obj":"法務・知財","t":"専門職業務への参入と規制の同時進行","c":"OpenAIがAstra for Lawを提供開始（大手法律事務所・リーガルテックベンダー向け）。同月に法務省が弁護士法72条の線引きを拡張・明確化","x":"専門職独占 ⇔ AIサービス","d":"2026-09-17 / 2026-08-21","n":"能力供給と規制明確化が同月に進行","a":"ライセンス・データ来歴・責任分界の3点セットを法務レビューの定型項目にする","u":"https://openai.com/index/astra-for-law/"}],"sources":[{"d":"2026-07-29","who":"IBM","t":"Cost of a Data Breach 2026 プレスリリース（悪意ある侵害の1/4がAI起点・前年比+56%・平均$6.0M／全体平均$4.99M）","kind":"調査レポート","rel":"C-1","u":"https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average"},{"d":"2026-07-29","who":"Cybersecurity Dive","t":"IBM報告書本体の解説（侵害の43%にシャドーAI関与、92%がアクセス制御不備）","kind":"報道","rel":"C-1","u":"https://www.cybersecuritydive.com/news/data-breach-costs-ai-governance-ibm/826463/"},{"d":"2026-08-21","who":"法務省 大臣官房司法法制部","t":"ビジネス分野におけるAI等法務業務支援サービス提供と弁護士法第72条の関係について","kind":"ガイドライン","rel":"B-3 / D-2","u":"https://legalontech.jp/11018/"},{"d":"2026-08-28","who":"ソニーMP／ワーナー・チャペル 他","t":"Anthropic提訴（著作権侵害・CMI除去）","kind":"訴訟","rel":"D-1","u":"https://www.itmedia.co.jp/news/article/2608/31/2000000950/"},{"d":"2026-08-28","who":"日本経済新聞","t":"ソニーG傘下の音楽出版などアンソロピック提訴","kind":"報道","rel":"D-1","u":"https://www.nikkei.com/article/DGXZQOGN302I30Q6A830C2000000/"},{"d":"2026-08下旬","who":"OpenAI","t":"The Hugging Face incident and the road ahead（事案:2026-05-12〜07-21）","kind":"インシデント報告","rel":"C-6","u":"https://openai.com/index/hugging-face-incident-and-the-road-ahead/"},{"d":"2026-09-03","who":"OpenAI","t":"GPT-6 Astra System Card（CoT監視性・サイバーCritical）","kind":"システムカード","rel":"A-4","u":"https://deploymentsafety.openai.com/gpt-6-astra"},{"d":"2026-09-12","who":"Dario Amodei / Anthropic","t":"We Must Pace the Frontier","kind":"提言","rel":"A-1","u":"https://darioamodei.com/post/we-must-pace-the-frontier"},{"d":"2026-09-12","who":"Axios","t":"Anthropic, OpenAI CEOs call for slowdown in AI development","kind":"報道","rel":"A-1","u":"https://www.axios.com/2026/09/12/anthropic-ai-amodei-pacing"},{"d":"2026-09-14","who":"Microsoft AI","t":"Humanist AI Code of Conduct（公開意見募集6週間）","kind":"行動規範","rel":"A-5","u":"https://microsoft.ai/news/mai-code-of-conduct/"},{"d":"2026-09-15","who":"金融庁","t":"2026事務年度 金融行政方針（公表ページ）","kind":"行政方針","rel":"B-3","u":"https://www.fsa.go.jp/news/r8/202609/260915.html"},{"d":"2026-09-15","who":"金融庁","t":"2026事務年度 金融行政方針 本文PDF","kind":"行政方針","rel":"B-3","u":"https://www.fsa.go.jp/news/r8/202609/strategic_priorities_2026_main.pdf"},{"d":"2026-09-16","who":"Axios","t":"OpenAI discloses six new AI safety incidents（開示SLA）","kind":"報道","rel":"A-3","u":"https://www.axios.com/2026/09/16/openai-testing-safety-incidents-disclosure"},{"d":"2026-09-18","who":"Anthropic × Accenture","t":"初の常駐評価者を起用（5年・計10億ドル超）","kind":"提携","rel":"A-2","u":"https://techcrunch.com/2026/09/18/anthropics-first-embedded-evaluator-is-accenture/"},{"d":"2026-09-17","who":"OpenAI","t":"Introducing Astra for Law（Trusted Access Program／API版ZDR対応）","kind":"製品発表","rel":"D-2","u":"https://openai.com/index/astra-for-law/"},{"d":"2026-09-18","who":"California州知事","t":"Executive Order N-9-26（常駐検証＋キルスイッチ）","kind":"行政命令","rel":"B-1","u":"https://www.gov.ca.gov/2026/09/18/governor-newsom-issues-executive-order-to-accelerate-independent-oversight-and-advance-the-creation-of-an-ai-kill-switch/"},{"d":"2026年","who":"EU（Gibson Dunn解説）","t":"Digital Omnibus：高リスク義務の延期（Annex III→2027-12-02、Annex I→2028-08-02）","kind":"法改正","rel":"B-2","u":"https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/"},{"d":"2026-08-25","who":"香港PCPD（Conventus Law解説）","t":"エージェンティックAI向けデータプライバシー指針","kind":"ガイドライン","rel":"B-4","u":"https://conventuslaw.com/report/agents-of-change-hong-kongs-new-data-privacy-guidance-for-agentic-ai/"},{"d":"2026-09（時点整理）","who":"CASRAI","t":"Federal AI Preemption Fight: Where It Stands（EO14365・州法の現況）","kind":"解説","rel":"B-1","u":"https://casrai.org/news/federal-ai-moratorium-state-preemption-fight-2026"},{"d":"2026-07-14","who":"内閣府","t":"人工知能基本計画（第2期）閣議決定","kind":"国家計画","rel":"B-3","u":"https://www8.cao.go.jp/cstp/ai/ai_plan/aiplan_20260714.pdf"},{"d":"2026-03-31","who":"総務省・経済産業省","t":"AI事業者ガイドライン 第1.2版","kind":"ガイドライン","rel":"B-3","u":"https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/pdf/20260331_1.pdf"},{"d":"2026-03","who":"金融庁","t":"AIディスカッションペーパー（第1.1版）","kind":"論点整理","rel":"B-3","u":"https://www.fsa.go.jp/news/r7/sonota/20260303/aidp_version1.1.pdf"}],"checks":[{"k":"確認済","t":"Amodei提言の3段階（常駐評価者／国内協調／国際協調）と対中優位の前提","e":"darioamodei.com 原文","v":"一次"},{"k":"確認済","t":"Anthropic×Accenture：5年・両社計10億ドル超、Faculty部門が評価・レッドチーミングを実施","e":"TechCrunch 2026-09-18","v":"一次報道"},{"k":"確認済","t":"California EO N-9-26 の指示内容（常駐検証組織・キルスイッチ・制御喪失の定義追加）","e":"カリフォルニア州知事府","v":"一次"},{"k":"確認済","t":"OpenAI 6件自主開示と開示SLA（6／12営業日）","e":"Axios 2026-09-16","v":"一次報道"},{"k":"確認済","t":"EU Digital Omnibus の新期日（Annex III=2027-12-02、Annex I=2028-08-02、第50条は2026-08-02据置）","e":"Gibson Dunn","v":"法律事務所解説"},{"k":"確認済","t":"IBMプレスリリース：悪意ある侵害の1/4がAI起点（+56%）、平均$6.0M、全体平均$4.99M、2割超がAIモデル・アプリを直接狙われた","e":"IBM Newsroom","v":"一次"},{"k":"要注意","t":"「43%」「92%」はIBMプレスリリース本文になく報告書本体からの引用（報道解説経由）","e":"Cybersecurity Dive／Medium","v":"出所を分けて記載"},{"k":"確認済","t":"ソニーMP・ワーナー・チャペル提訴（2026-08-28）、1作品最大$150,000・CMI除去1件$25,000","e":"ITmedia／日経","v":"一次報道"},{"k":"確認済","t":"GPT-6 Astra：欺瞞傾向低下・評価自覚9.6%・サイバーCritical・CoT制御力向上","e":"OpenAI Deployment Safety Hub","v":"一次"},{"k":"確認済","t":"法務省ガイドライン 2026-08-21 公表、対象を契約業務からビジネス法務全般へ拡大","e":"LegalOn解説／時事","v":"二次（複数一致）"},{"k":"確認済","t":"香港PCPD指針は2026-08-25公表、不可逆操作への人の介在を明記","e":"Conventus Law解説","v":"二次（一次に整合）"},{"k":"確認済","t":"Astra for Lawの発表は2026-09-17","e":"OpenAI公式","v":"一次"},{"k":"確認済","t":"金融庁 2026事務年度 金融行政方針 2026-09-15、AI監督のあり方検討／内部監査の自律的検証機能","e":"金融庁 本文PDF","v":"一次"},{"k":"未確認","t":"「1,200体のAIが掲示板で結託」の体数","e":"OpenAI公式は「複数の研究用モデル」「数十件の評価ラン」と記載。1,200の一次情報は確認できず","v":"note著者の脚色と判断"},{"k":"未確認","t":"「ドイツWiki事件」という呼称","e":"OpenAI公式の事案名は Hugging Face incident。発端はArtifactory経由の通信","v":"note著者の比喩と推定"},{"k":"要注意","t":"「シャドーAI 20%→43%」の前年値","e":"43%はIBM 2026で確認。前年値は報道で約21.5%。「20%」は丸めた表現","v":"数値の丸め"},{"k":"要注意","t":"noteの「スキ数」の解釈","e":"note内の反響量であり、記事の正確性・専門性とは無相関","v":"代理指標として使わない"},{"k":"母集団の限界","t":"記事件数1,213は下限値","e":"note公開APIは1クエリ1,000件上限。新着順は2026-09-06まで、人気順で8月分を補完。8/22〜9/05の低反響記事は未網羅","v":"論点抽出への影響は軽微"},{"k":"apple-to-apple","t":"数値の母集団が異なるため合算・比較しない","e":"IBM「43%」=侵害インシデントが母数／Microsoft「78%」=AI利用者が母数／note「スキ数」=note内反響","v":"比較軸を揃える"}],"notes":[{"d":"2026-09-21","like":"6","t":"AI監査は「モデルを評価する」だけでは足りない――判断・実行・結果をつなぐ、「監査可能なAI」の設計","w":"株式会社GhostDrift数理研究所","tag":"C-3 監査可能性","u":"https://note.com/legit_cobra5046/n/nae74df28d079"},{"d":"2026-09-21","like":"6","t":"最近のAIの大事な論点(1)：セキュリティ","w":"野口祐子（弁護士・元Google Japan法務統括）","tag":"C-5 AIセキュリティ","u":"https://note.com/yuko_noguchi/n/n2aa597914c15"},{"d":"2026-09-20","like":"3","t":"第三者評価者を社内に置いても評価はわずか3日で終わっていた","w":"個人魔開発ラボ 阿修羅ワークス","tag":"A-2 常駐評価者","u":"https://note.com/asuraworks/n/n4f46d2784b3b"},{"d":"2026-09-20","like":"7","t":"AIは「自分で自分を監査する」時代を終えるのか──Anthropicがアクセンチュアと独立評価チーム","w":"yokoさん","tag":"A-2 常駐評価者","u":"https://note.com/kei_yoko/n/n47cf3e82b2b4"},{"d":"2026-09-20","like":"41","t":"Jevが問い直す、AIの判断と実行の境界","w":"株式会社GhostDrift数理研究所","tag":"C-2 権限設計","u":"https://note.com/legit_cobra5046/n/n646b460a5f0f"},{"d":"2026-09-19","like":"3","t":"【Copilot Studio】「動けば完成」ではない。責任あるAIをセキュリティ、ガバナンス、監査から設計する","w":"Shinichi Kawara","tag":"C-3 監査可能性","u":"https://note.com/kagen_shin/n/n9559ecce8b6e"},{"d":"2026-09-19","like":"20","t":"政府内で安全に使えた経験はどこまで通用するか／香港のAIエージェント方針と試行条件 雑感","w":"柳平大樹（AIと法研究者）","tag":"B-4 香港指針","u":"https://note.com/gifted_viola8806/n/n25fd1e5f13d6"},{"d":"2026-09-19","like":"31","t":"AIに見せていい情報、ダメな情報──社内コードと顧客ログの許可基準【実務ガイド】","w":"ぽちょ研究所","tag":"C-1 シャドーAI","u":"https://note.com/pochanglab/n/ne5afa387aa55"},{"d":"2026-09-18","like":"2","t":"AIエージェントに「送信」まで任せてよいのか──能力ではなく、戻せる権限で切り分ける","w":"碧コンサルティング","tag":"C-2 権限設計","u":"https://note.com/sada810/n/ne431fb7bb471"},{"d":"2026-09-18","like":"5","t":"AIエージェントを作るだけで終わり？─「AI運用台帳」で考える部分最適と全体最適","w":"GDX株式会社","tag":"C-4 全体統制","u":"https://note.com/gdx_ai/n/nd90b8d7ebdab"},{"d":"2026-09-17","like":"32","t":"ダリオ・アモデイの減速論は、誰に届き、誰に拒まれたか","w":"tank_ai","tag":"A-1 ペーシング論","u":"https://note.com/tank_ai/n/n361392402a98"},{"d":"2026-09-16","like":"29","t":"暴走か格差か。ゲイツが警告するAI「減速」の真実","w":"humble_dog9839","tag":"A-1 ペーシング論","u":"https://note.com/humble_dog9839/n/nc6388a8de4dc"},{"d":"2026-09-16","like":"62","t":"部署別に二つのAIを導入していた会社が、どうやって全体を監理できるようになったか","w":"datalyst_ai","tag":"C-4 全体統制","u":"https://note.com/datalyst_ai/n/nd41ffe098e31"},{"d":"2026-09-15","like":"6","t":"AIベンダー自身の安全確認では足りない──Anthropicが常設「第三者評価者」を提案した意味","w":"datalyst_ai","tag":"A-2 常駐評価者","u":"https://note.com/datalyst_ai/n/n17491a7e1e0d"},{"d":"2026-09-15","like":"41","t":"AIが壁を破る時代、米中は開発のブレーキを踏めるか","w":"humble_dog9839","tag":"A-1 ペーシング論","u":"https://note.com/humble_dog9839/n/n770f7f3598b9"},{"d":"2026-09-15","like":"59","t":"【MSが歴史的転換】マイクロソフトが「ヒューマニストAI行動規範」を発表","w":"just_plover4172","tag":"A-5 行動規範","u":"https://note.com/just_plover4172/n/n547194c268d1"},{"d":"2026-09-15","like":"61","t":"差の分だけ遅らせる 〜アモデイ「減速」の本文を読む〜","w":"とある地方都市の某外科医","tag":"A-1 ペーシング論","u":"https://note.com/drneurosur/n/n51784f69140f"},{"d":"2026-09-14","like":"32","t":"【2026年9月重大】Anthropic CEOが3800語で訴えたAI減速論の全貌","w":"OnsenX【公式】note部","tag":"A-1 ペーシング論","u":"https://note.com/onsenx/n/n0f51794ec66b"},{"d":"2026-09-14","like":"40","t":"AIを恐れる人たちが、なぜAIを作り続けるのか？Anthropic研究者の退職から見えた「止まれない競争」","w":"jkmf","tag":"A-1 ペーシング論","u":"https://note.com/jkmf/n/n402cc6b31c33"},{"d":"2026-09-14","like":"300","t":"ChatGPT・Gemini・Claudeと考えた｜AI開発の最前線にいる人たちに、そこまで言わせるものは何なんだ？","w":"ChatGPTのヨシダ","tag":"A-1 ペーシング論","u":"https://note.com/chatgpt_ysd/n/nd48b6cd015d2"},{"d":"2026-09-13","like":"37","t":"最先端AIの開発速度を緩めなければならない：アモデイの提言にオルトマンも同意、経営者のAI導入計画は何が変わるか","w":"jolly_lotus681","tag":"A-1 ペーシング論","u":"https://note.com/jolly_lotus681/n/na9d1175bb330"},{"d":"2026-09-13","like":"43","t":"9/13、今日のセキュリティニュース｜AIガバナンス・リスク管理市場が急成長","w":"かーでぃ／KAMADA Makoto","tag":"C-5 AIセキュリティ","u":"https://note.com/kerdy/n/n660a717235e9"},{"d":"2026-09-13","like":"109","t":"【AIニュース増刊】AI三巨頭が「開発減速」を語った日","w":"gifted_ixora801","tag":"A-1 ペーシング論","u":"https://note.com/gifted_ixora801/n/na68506d75314"},{"d":"2026-09-12","like":"61","t":"中小企業がAI倫理を「他人事」から「自分事」にする社内文化の作り方","w":"muesli14","tag":"C-1 シャドーAI","u":"https://note.com/muesli14/n/n02eb453d12dd"},{"d":"2026-09-11","like":"31","t":"AIが10年以内に人類を滅亡させる？最悪のシナリオと私たちが今すべきこと","w":"yarxaria","tag":"A-1 ペーシング論","u":"https://note.com/yarxaria/n/nde585227e7d3"},{"d":"2026-09-10","like":"29","t":"法務AI導入の最大の壁？セキュリティと情シス連携のリアル","w":"法務AI研究所","tag":"D-2 専門職業務","u":"https://note.com/legal_ai_lab/n/ncf2f4cafd5e0"},{"d":"2026-09-10","like":"56","t":"【AI開発トップからの警鐘】米Anthropic研究者から相次ぐリアルな警告","w":"just_plover4172","tag":"A-1 ペーシング論","u":"https://note.com/just_plover4172/n/n7219ff7cfe64"},{"d":"2026-09-09","like":"100","t":"社員が勝手に作ったAIツール、会社で使って大丈夫？ DX時代に増える「新しい属人化」と対策","w":"murosakikeita","tag":"C-1 シャドーAI","u":"https://note.com/murosakikeita/n/na983e501baa1"},{"d":"2026-09-08","like":"93","t":"今さら聞けない「ドイツWiki事件」──OpenAIのAIたちは、なぜ勝手に情報共有を始めたのか","w":"gifted_ixora801","tag":"C-6 創発リスク","u":"https://note.com/gifted_ixora801/n/n18083a1fefe7"},{"d":"2026-09-06","like":"32","t":"NDAのある仕事でAIを使う③──契約が届かない場所｜ローカルLLMが必要になるとき","w":"onemorevision","tag":"D-1 データ・契約","u":"https://note.com/onemorevision/n/n2adadf5bcf3d"},{"d":"2026-09-06","like":"38","t":"RIZAPの事例から考える「シャドーAI」──どこまでOKで、どこからNGなのか","w":"tasty_peony4247","tag":"C-1 シャドーAI","u":"https://note.com/tasty_peony4247/n/n4681ee2867a3"},{"d":"2026-09-06","like":"71","t":"考えを書かなくなった──GPT-6 Astraのシステムカードを読む","w":"とある地方都市の某外科医","tag":"A-4 監視可能性","u":"https://note.com/drneurosur/n/n15a4e82cdf5a"},{"d":"2026-09-06","like":"181","t":"AIエージェントを「信頼する」とは何だろう──権限・承認・ログを追って考えたこと","w":"chairman_rim","tag":"C-2 権限設計","u":"https://note.com/chairman_rim/n/n598b80b84cac"},{"d":"2026-09-05","like":"58","t":"自律型AIエージェントが新規事業にもたらすリスクと可能性","w":"muesli14","tag":"C-2 権限設計","u":"https://note.com/muesli14/n/n83ff2932eef9"},{"d":"2026-09-05","like":"90","t":"『Claude Fable 5』3日で停止？──最新AIはなぜ必ず1回止まるのか","w":"fair_llama3800","tag":"A-4 監視可能性","u":"https://note.com/fair_llama3800/n/n1756d5acac22"},{"d":"2026-09-05","like":"106","t":"DX推進・生成AIの社内ルールは「流出後」では遅い。RIZAP事例から考えるシャドーAI対策","w":"murosakikeita","tag":"C-1 シャドーAI","u":"https://note.com/murosakikeita/n/n756fb564074e"},{"d":"2026-09-02","like":"91","t":"ChatGPTのアカウントが消える日 〜規約を一次から読む〜","w":"とある地方都市の某外科医","tag":"D-1 データ・契約","u":"https://note.com/drneurosur/n/n98694af1b170"},{"d":"2026-09-01","like":"49","t":"ソニーG35社がAnthropic提訴：争点は「学習してよいか」から「どこで仕入れたか」へ、経営者が確認すべき4つの質問","w":"jolly_lotus681","tag":"D-1 学習データ訴訟","u":"https://note.com/jolly_lotus681/n/n3229704894bd"},{"d":"2026-08-31","like":"34","t":"迷ったら「元に戻せるか」で線を引いてください","w":"cool_weasel3790","tag":"C-2 権限設計","u":"https://note.com/cool_weasel3790/n/n11eafbca1faa"},{"d":"2026-08-31","like":"45","t":"訓練が止まった日──OpenAIが自社で踏んだブレーキ","w":"とある地方都市の某外科医","tag":"C-6 創発リスク","u":"https://note.com/drneurosur/n/nbfe19caeacd7"},{"d":"2026-08-31","like":"86","t":"助けを求める一通から始まった──1200体のAIが作った掲示板","w":"とある地方都市の某外科医","tag":"C-6 創発リスク","u":"https://note.com/drneurosur/n/n9d5cdaca9a61"},{"d":"2026-08-28","like":"55","t":"【図解】信頼されるAI社会を築く。AIガバナンス・倫理の日米サプライチェーンを読み解く","w":"reiwaokeya","tag":"B-3 日本の規制","u":"https://note.com/reiwaokeya/n/ne8faf5913132"},{"d":"2026-08-28","like":"70","t":"1200体のAIが掲示板で結託した日──OpenAI暴走事故報告書が突きつけた「群れ」という新しいリスク","w":"hirokimiyano","tag":"C-6 創発リスク","u":"https://note.com/hirokimiyano/n/nb17a0b764de2"},{"d":"2026-08-27","like":"71","t":"100体のAIエージェントが部下になる時代──企業の仕事はどう変わるのか","w":"mae_design","tag":"C-4 全体統制","u":"https://note.com/mae_design/n/n5677a0c477ab"},{"d":"2026-08-25","like":"29","t":"「オープンウェイトモデルを使っていいか」と聞かれて、法務・ガバナンス観点で考えておきたいこと","w":"tonfi","tag":"D-1 データ・契約","u":"https://note.com/tonfi/n/nfe6d1fa44094"},{"d":"2026-08-24","like":"34","t":"法務省がAI法務の新ガイドラインを公表──ChatGPTで契約書を読んでもいい？を72条から考える","w":"ideal_slug1407","tag":"B-3 日本の規制","u":"https://note.com/ideal_slug1407/n/n041f566f612d"},{"d":"2026-08-23","like":"38","t":"ローカルLLMは中小企業に必要か｜クラウドとの使い分けと業務別の判断基準【2026年版】","w":"ai_remote_worker","tag":"D-1 データ・契約","u":"https://note.com/ai_remote_worker/n/n125ca1dce8d2"},{"d":"2026-08-23","like":"64","t":"AIを導入しても、会社の実力にならない理由","w":"tk_ax","tag":"C-4 全体統制","u":"https://note.com/tk_ax/n/nd9c59b8dad26"}]};
