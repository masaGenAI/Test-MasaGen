// @@nova-part 40-certification/240-makeSecGovStation.jsx

// ===== セキュリティ・ガバナンス資格の共通ステーション生成ファクトリ =====
// データ（C/DOMAINS/T/BANK/CONFUSE/COMPARE/GLOSSARY/DIAGRAMS）を渡すと、AIGP/ISO42001と同一体裁の
// 自己完結ステーション（進捗・クイズ〈前後/カウンタ/チェック〉・模試・復習・図解・比較・混同・用語集）を返す。
function makeSecGovStation(cfg){
  const { C, DOMAINS, PASS, STORE_KEY, T, BANK, CONFUSE, COMPARE, GLOSSARY, DIAGRAMS, FIGS, HARD } = cfg;
  try { SECGOV_REG.push({ code: T.ja.appTitle, hue: C.primary, bank: BANK }); } catch (e) {}
  const DOM_HUE = Object.fromEntries(DOMAINS.map(d=>[d.id,d.hue]));
  const G = "#5c6975";
  function buildSets(bank, nSets){
    const by={}; bank.forEach(q=>{(by[q.d]=by[q.d]||[]).push(q);});
    const sets={};
    for(let s=0;s<nSets;s++){ const arr=[]; DOMAINS.forEach(d=>{ const pool=by[d.id]||[]; if(!pool.length) return; const n=Math.min(pool.length,12); for(let i=0;i<n;i++) arr.push(pool[(i+s*n)%pool.length]); }); sets[s+1]=arr; }
    return sets;
  }
  const EXAM_SETS = (HARD && HARD.length) ? buildHardSets_AB(HARD, cfg.EXAM_PLAN || (function(){ const by={}; HARD.forEach(q=>{by[q.d]=(by[q.d]||0)+1;}); const p={}; Object.keys(by).forEach(d=>{ p[d]=Math.max(1, Math.round(by[d]*0.6)); }); return p; })(), 5) : buildSets(BANK, 5);
  const DOMAIN_SETS = Object.fromEntries(DOMAINS.map(d=>[d.id, BANK.filter(q=>q.d===d.id)]));
  const todayStr = () => new Date().toISOString().slice(0,10);
  const loadState = async () => { try { const r = await window.storage.get(STORE_KEY); return r && r.value ? JSON.parse(r.value) : null; } catch(e){ return null; } };
  const saveState = (s) => { try { window.storage.set(STORE_KEY, JSON.stringify(s)); } catch(e){} };
  const shuf = (a) => { const r=a.slice(); for(let i=r.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=r[i]; r[i]=r[j]; r[j]=t; } return r; };

  function Home({ state, lang }) {
    const en = lang === "en"; const prog = state.progress || {};
    let tc=0, ta=0; DOMAINS.forEach(d=>{ const p=prog[d.id]; if(p){ tc+=p.correct; ta+=p.attempts; } });
    const rate = ta ? Math.round((tc/ta)*100) : 0;
    // 学習完了度：クイズ消化・模試セット完了・図解確認をまとめた完了メーター（MegaTech型の「完了」計測）
    const [act, setAct] = useState({ mock: 0, figs: 0 });
    useEffect(() => { (async () => {
      let mock = 0, figs = 0;
      try { const r = await window.storage.get("msexam_done_v1"); const m = r && r.value ? JSON.parse(r.value) || {} : {}; const pre = STORE_KEY + ":msexam#exam"; mock = Object.keys(m).filter(k => k.startsWith(pre)).length; } catch (e) {}
      try { const r = await window.storage.get("figs_done_v1"); const m = r && r.value ? JSON.parse(r.value) || {} : {}; const pre = STORE_KEY + "#"; figs = Object.keys(m).filter(k => k.startsWith(pre)).length; } catch (e) {}
      setAct({ mock, figs });
    })(); }, [state]);
    const quizPct = BANK.length ? Math.min(100, Math.round((ta / BANK.length) * 100)) : 0;
    const mockPct = Math.min(100, Math.round((act.mock / 5) * 100));
    const figsN = (FIGS && FIGS.length) || 0;
    const figsPct = figsN ? Math.min(100, Math.round((act.figs / figsN) * 100)) : null;
    const parts = figsPct === null ? [quizPct, mockPct] : [quizPct, mockPct, figsPct];
    const compPct = Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
    const compBar = (label, pct, extra) => (
      <div style={{ marginBottom: 7 }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:2 }}><span style={{ fontWeight:700, color:C.deep }}>{label}</span><span style={{ color:G }}>{extra ? extra + "・" : ""}{pct}%</span></div>
        <div style={{ height:7, background:"#eef2f5", borderRadius:999, overflow:"hidden" }}><div style={{ width:pct+"%", height:"100%", background: pct>=100 ? "#158F6B" : C.primary }} /></div>
      </div>
    );
    return (
      <div>
        <div style={{ background:C.light, border:`1px solid ${C.mid}`, borderRadius:12, padding:"13px 16px", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:8 }}>
            <span style={{ fontSize:12.5, fontWeight:800, color:C.deep }}>{en?"Completion":"学習完了度"}</span>
            <span style={{ fontSize:22, fontWeight:800, color: compPct>=100 ? "#158F6B" : nvInk(C.primary, C.light) }}>{compPct}<span style={{ fontSize:12 }}>%</span></span>
            <span style={{ fontSize:10.5, color:G }}>{en?"quiz · mock exams · diagrams":"クイズ・模試・図解の完了を計測"}</span>
          </div>
          {compBar(en?"Quiz coverage":"クイズ消化", quizPct, `${Math.min(ta, BANK.length)}/${BANK.length}${en?"":"問"}`)}
          {compBar(en?"Mock exam sets":"模試セット完了", mockPct, `${act.mock}/5`)}
          {figsPct === null ? null : compBar(en?"Diagrams reviewed":"図解確認", figsPct, `${act.figs}/${figsN}`)}
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:16 }}>
          <div style={{ flex:"1 1 160px", background:C.light, border:`1px solid ${C.mid}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:12, color:C.deep }}>{en?"Overall accuracy":"総合正答率"}</div>
            <div style={{ fontSize:30, fontWeight:800, color:nvInk(C.primary, C.light) }}>{rate}<span style={{ fontSize:15 }}>%</span></div>
            <div style={{ fontSize:11, color:G }}>{tc}/{ta} {en?"correct":"正解"}</div>
          </div>
          <div style={{ flex:"1 1 120px", background:C.light, border:`1px solid ${C.mid}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:12, color:C.deep }}>{en?"Streak":"連続学習"}</div>
            <div style={{ fontSize:30, fontWeight:800, color:nvInk(C.accent, "#E6F2EF", 3.2) }}>🔥{state.meta?.streak || 0}</div>
            <div style={{ fontSize:11, color:G }}>{en?"days":"日"}</div>
          </div>
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:C.deep, marginBottom:10 }}>{en?"Mastery by domain":"ドメイン別 習熟度"}</div>
        {DOMAINS.map(d=>{ const p=prog[d.id]||{correct:0,attempts:0}; const r=p.attempts?Math.round((p.correct/p.attempts)*100):0; return (
          <div key={d.id} style={{ marginBottom:11 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ background: d.hue, color: nvInk("#ffffff", d.hue), borderRadius:5, padding:"2px 7px", fontSize:11, fontWeight:800 }}>{d.id}</span>
              <span style={{ fontSize:12.5, color:C.ink }}>{en?d.nameEn:d.name}</span>
              <span style={{ fontSize:11, color:G, marginLeft:"auto" }}>{d.range} ・ {p.attempts?`${r}%`:(en?"not started":"未着手")}</span>
            </div>
            <div style={{ height:7, background:C.light, borderRadius:4, overflow:"hidden", marginTop:5 }}><div style={{ width:`${r}%`, height:"100%", background:d.hue, borderRadius:4 }} /></div>
          </div>
        ); })}
        <div style={{ marginTop:14, fontSize:11.5, color:G, lineHeight:1.7 }}>{en?(cfg.noteEn||"Unofficial study aid. Verify the current exam outline officially."):(cfg.noteJa||"非公式の学習補助です。最新の試験要項は公式で確認してください。")}</div>
      </div>
    );
  }

  function Quiz({ onAnswer, onWrong, lang }) {
    const en = lang === "en";
    const [filter, setFilter] = useState("ALL");
    const [orderMode, setOrderMode] = useState("seq");
    const [order, setOrder] = useState([]);
    const [pos, setPos] = useState(0);
    const [sel, setSel] = useState(null);
    const [answeredMap, setAnsweredMap] = useState({});
    const [doneSet, setDoneSet] = useState({});
    const pool = useMemo(()=>{ let idxs = filter==="ALL"?BANK.map((_,i)=>i):BANK.map((_,i)=>i).filter(i=>BANK[i].d===filter); if(orderMode==="random") idxs=shuf(idxs); return idxs; }, [filter, orderMode]);
    useEffect(()=>{ setOrder(pool); setPos(0); setSel(null); setAnsweredMap({}); }, [pool]);
    const poolCount = order.length;
    const qi = order.length?order[pos]:-1;
    const Q = qi>=0?BANK[qi]:null;
    if(!Q) return null;
    const opts = en?Q.oEn:Q.o; const ans = Q.a;
    const choose = (i)=>{ if(sel!==null) return; setSel(i); const ok=i===ans; setAnsweredMap(m=>({...m,[pos]:i})); onAnswer(Q.d, ok); if(!ok&&onWrong) onWrong(Q); };
    const goPrev = ()=>{ if(pos===0) return; const np=pos-1; setPos(np); setSel(answeredMap[np]!==undefined?answeredMap[np]:null); };
    const goNext = ()=>{ const np=pos+1>=poolCount?0:pos+1; setPos(np); setSel(answeredMap[np]!==undefined?answeredMap[np]:null); };
    const toggleDone = (k,e)=>{ if(e) e.stopPropagation(); setDoneSet(s=>({...s,[k]:!s[k]})); };
    const filterLabel = (k)=> k==="ALL"?(en?"All":"すべて"):k;
    return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <span style={{ fontSize:12.5, color:G }}>{en?"All":"全問"} {poolCount}{en?"":"問"}</span>
          <div style={{ display:"inline-flex", background:C.light, borderRadius:20, padding:4 }}>
            {[["seq", en?"In order":"順番"],["random", en?"Random":"ランダム"]].map(([k,label])=>(
              <button key={k} onClick={()=>setOrderMode(k)} style={{ border:"none", cursor:"pointer", borderRadius:16, padding:"6px 18px", fontSize:13, fontWeight:700, background:orderMode===k?"#fff":"transparent", color:orderMode===k ? nvInk(C.deep, "#ffffff") : nvInk(G, C.light), boxShadow:orderMode===k?"0 1px 3px rgba(0,0,0,.12)":"none" }}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
          {["ALL", ...DOMAINS.map(d=>d.id)].map(k=>(
            <button key={k} onClick={()=>setFilter(k)} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:20, fontSize:13, cursor:"pointer", border:`1.5px solid ${filter===k?C.primary:C.mid}`, background:filter===k?C.primary:"#fff", color:filter===k ? nvInk("#ffffff", C.primary) : nvInk(C.ink, "#ffffff"), fontWeight:600 }}>
              <span role="checkbox" aria-checked={!!doneSet[k]} onClick={(e)=>toggleDone(k,e)} style={{ cursor:"pointer", fontSize:14, lineHeight:1, userSelect:"none", color: doneSet[k]?(filter===k?nvInk("#ffffff", C.primary, 3):"#16A34A"):(filter===k?nvInk("#ffffff", C.primary, 3):nvInk("#b8c2cf", "#ffffff", 3)) }}>{doneSet[k]?"☑":"☐"}</span>
              <span>{filterLabel(k)}</span>
            </button>
          ))}
        </div>
        <div style={{ background:"#fff", border:`1px solid ${C.mid}`, borderRadius:12, padding:16 }}>
          <div style={{ fontSize:11, color: nvInk("#ffffff", DOM_HUE[Q.d]), background: DOM_HUE[Q.d], display:"inline-block", borderRadius:4, padding:"2px 8px", marginBottom:10 }}>{Q.d} · {en?(DOMAINS.find(d=>d.id===Q.d)||{}).nameEn:(DOMAINS.find(d=>d.id===Q.d)||{}).name}</div>
          <div style={{ fontSize:16, fontWeight:600, marginBottom:16, lineHeight:1.5, color:C.ink, display:"flex", alignItems:"flex-start", gap:6 }}><span style={{ flex:1 }}>{en?Q.qEn:Q.q}</span><StarButton id={"q#" + novaQHash(Q.q || Q.qEn || "")} text={Q.q || Q.qEn} scope={en ? "Quiz" : "クイズ"} /></div>
          {opts.map((opt,i)=>{ let bg="#fff", bd=C.mid, col=C.ink; if(sel!==null){ if(i===ans){bg="#E6F4EF";bd=C.ok;col=C.ok;} else if(i===sel){bg="#FBEAE8";bd=C.ng;col=C.ng;} } return (
            <button key={i} onClick={()=>choose(i)} disabled={sel!==null} style={{ display:"block", width:"100%", textAlign:"left", marginBottom:10, padding:"14px 16px", borderRadius:10, border:`1.5px solid ${bd}`, background:bg, color:col, cursor:sel===null?"pointer":"default", fontSize:14, lineHeight:1.4, fontWeight:sel!==null&&i===ans?700:500, fontFamily:"inherit" }}>
              <span style={{ fontWeight:700, marginRight:10 }}>{sel!==null&&(i===ans)?"✓":sel!==null&&(i===sel)?"✗":"ABCD"[i]}</span>{opt}
            </button>
          ); })}
          {sel!==null && (
            <div style={{ marginTop:12 }}>
              <div style={{ background:C.light, borderRadius:9, padding:12, fontSize:13, lineHeight:1.55, color:C.ink }}>
                <strong style={{ color: nvInk(sel===ans ? C.ok : C.ng, C.light) }}>{sel===ans?(en?"Correct":"正解"):(en?"Incorrect":"不正解")}</strong>
                ・{en?`The answer is ${"ABCD"[ans]}. `:`正解は ${"ABCD"[ans]}。`}{en?Q.eEn:Q.e}
              </div>
            </div>
          )}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:14 }}>
            <button onClick={goPrev} disabled={pos===0} style={{ padding:"10px 30px", borderRadius:9, fontSize:13.5, fontWeight:600, border:`1.5px solid ${C.mid}`, background:pos===0?C.light:"#fff", color:pos===0 ? "#9fb0be" : nvInk(C.ink, "#ffffff"), cursor:pos===0?"not-allowed":"pointer" }}>{en?"← Previous":"← 前の問題"}</button>
            <span style={{ fontSize:13, color:G }}>{pos+1} / {poolCount}</span>
            <button onClick={goNext} style={{ padding:"10px 30px", borderRadius:9, fontSize:13.5, fontWeight:600, border:`1.5px solid ${C.primary}`, background:"#fff", color:nvInk(C.primary, "#ffffff"), cursor:"pointer" }}>{en?"Next →":"次の問題 →"}</button>
          </div>
        </div>
      </div>
    );
  }

  function Review({ state, onAnswer, onResolve, onClear, lang }) {
    const en = lang === "en"; const rev = state.review || []; const [sel, setSel] = useState({});
    if(!rev.length) return <div style={{ padding:30, textAlign:"center", color:G, fontSize:13 }}>{en?"No review items. Missed questions will appear here.":"復習項目はありません。間違えた問題がここに溜まります。"}</div>;
    return (
      <div>
        <div style={{ display:"flex", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.deep }}>{en?`Missed questions (${rev.length})`:`間違えた問題（${rev.length}）`}</div>
          <button onClick={onClear} style={{ marginLeft:"auto", fontSize:11.5, padding:"5px 11px", borderRadius:7, border:`1px solid ${C.mid}`, background:"#fff", color:G, cursor:"pointer" }}>{en?"Clear all":"すべて消去"}</button>
        </div>
        {rev.map((Q,ri)=>{ const s=sel[ri]; const opts=en?(Q.oEn||Q.o):Q.o; return (
          <div key={ri} style={{ background:"#fff", border:`1px solid ${C.mid}`, borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.ink, marginBottom:8, lineHeight:1.55 }}>{en?(Q.qEn||Q.q):Q.q}</div>
            {opts.map((o,i)=>{ let bd=C.mid,bg="#fff"; if(s!=null){ if(i===Q.a){bd=C.ok;bg="#E6F4EF";} else if(i===s){bd=C.ng;bg="#FBEAE8";} } return (
              <button key={i} onClick={()=>{ if(s!=null) return; setSel(m=>({...m,[ri]:i})); const ok=i===Q.a; onAnswer(Q.d, ok); if(ok) setTimeout(()=>onResolve(Q.q),600); }} disabled={s!=null} style={{ display:"block", width:"100%", textAlign:"left", marginBottom:6, padding:"9px 11px", borderRadius:7, border:`1.5px solid ${bd}`, background:bg, color:C.ink, cursor:s!=null?"default":"pointer", fontSize:12, fontFamily:"inherit" }}>
                <span style={{ fontWeight:700, marginRight:7, color:s!=null?(i===Q.a?C.ok:(i===s?C.ng:"#9ab")):C.primary }}>{s!=null?(i===Q.a?"✓":(i===s?"✗":"・")):"ABCD"[i]}</span>{o}</button>
            ); })}
            {s!=null && s===Q.a && <div style={{ fontSize:11.5, color:C.ok, marginTop:4 }}>{en?"◎ Correct — removed from review":"◎ 正解 — 復習から削除"}</div>}
          </div>
        ); })}
      </div>
    );
  }

  function Compare({ lang }) {
    const en = lang === "en";
    return (
      <div>{(COMPARE||[]).map((c,ci)=>(
        <div key={ci} style={{ marginBottom:18 }}>
          <div style={{ fontSize:13.5, fontWeight:700, color:C.deep, marginBottom:8 }}>{en?c.titleEn:c.title}</div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ borderCollapse:"collapse", width:"100%", fontSize:12 }}>
              <thead><tr>{(en?c.colsEn:c.cols).map((h,i)=><th key={i} style={{ textAlign:"left", padding:"8px 10px", background:C.deep, color:nvInk("#ffffff", C.deep), fontWeight:700, whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
              <tbody>{(en?c.rowsEn:c.rows).map((r,ri)=><tr key={ri} style={{ background: ri%2?C.light:"#fff" }}>{r.map((cell,i)=><td key={i} style={{ padding:"8px 10px", border:`1px solid ${C.mid}`, color:C.ink, fontWeight:i===0?700:400, lineHeight:1.5 }}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      ))}</div>
    );
  }

  function Confuse({ lang }) {
    const en = lang === "en";
    return (
      <div>{(CONFUSE||[]).map((p,i)=>(
        <div key={i} style={{ background:"#fff", border:`1px solid ${C.mid}`, borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.deep, marginBottom:5 }}>{en?p[3]:p[0]}</div>
          <div style={{ fontSize:12, color:C.ink, lineHeight:1.65 }}>{en?p[4]:p[1]}</div>
          <div style={{ fontSize:11.5, color:nvInk(C.primary, "#ffffff"), marginTop:6, fontWeight:700 }}>💡 {en?p[5]:p[2]}</div>
        </div>
      ))}</div>
    );
  }

  function Glossary({ lang }) {
    const en = lang === "en";
    return (
      <div>{DOMAINS.map(d=>{ const terms=(GLOSSARY||[]).filter(g=>g.d===d.id); if(!terms.length) return null; return (
        <div key={d.id} style={{ marginBottom:16 }}>
          <div style={{ fontSize:11.5, fontWeight:800, color: nvInk("#ffffff", d.hue), background: d.hue, borderRadius:5, padding:"3px 9px", display:"inline-block", marginBottom:8 }}>{d.id} ・ {en?d.nameEn:d.name}</div>
          {terms.map((g,i)=>(
            <div key={i} style={{ padding:"8px 0", borderBottom:`1px solid ${C.mid}` }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.deep }}>{en?g.termEn:g.term} <span style={{ fontSize:10.5, color:G, fontWeight:400 }}>{en?g.term:g.termEn}</span></div>
              <div style={{ fontSize:12, color:C.ink, lineHeight:1.6, marginTop:2 }}>{en?g.defEn:g.def}</div>
            </div>
          ))}
        </div>
      ); })}</div>
    );
  }

  function Diagrams({ lang }) {
    const en = lang === "en";
    const Card = ({ title, children }) => (
      <div style={{ background:"#fff", border:`1px solid ${C.mid}`, borderRadius:12, padding:16, marginBottom:16 }}>
        <div style={{ fontSize:13.5, fontWeight:800, color:C.deep, marginBottom:12 }}>{title}</div>{children}
      </div>
    );
    if (FIGS && FIGS.length) return (
      <div>
        <div style={{ fontSize:11.5, color:G, marginBottom:10, lineHeight:1.6 }}>{en ? "Interactive diagrams — tap a node for details, drag / zoom the canvas, toggle layout, and press ▶ to step through. Terms in a node's explanation are listed with it — tap one for its meaning." : "インタラクティブ図解 — ノードをタップで詳細、キャンバスはドラッグ／ズーム可、レイアウト切替や ▶ の順再生にも対応。ノードの解説に出てくる用語は、押すと意味が出ます。"}</div>
        <FlowSection flows={FIGS} lang={lang} doneKey={STORE_KEY} terms={typeof GLOSSARY !== "undefined" ? GLOSSARY : null} />
      </div>
    );
    return (
      <div>{(DIAGRAMS||[]).map((dg,di)=>(
        <Card key={di} title={en?dg.titleEn:dg.titleJa}>
          {dg.kind==="flow" ? (
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:6 }}>
              {dg.items.map((it,i)=>(
                <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
                  <span style={{ background:C.light, border:`1px solid ${C.mid}`, borderRadius:8, padding:"8px 12px", fontSize:12.5, fontWeight:700, color:C.deep }}>{en?it.en:it.ja}</span>
                  {i<dg.items.length-1 && <span style={{ color:nvInk(C.primary, "#ffffff", 3), fontWeight:800 }}>→</span>}
                </span>
              ))}
            </div>
          ) : (
            dg.items.map((it,i)=>(<div key={i} style={{ background:it.c||C.primary, color:nvInk("#ffffff", it.c||C.primary), borderRadius:8, padding:"9px 12px", fontSize:12.5, fontWeight:700, marginBottom:6 }}>{en?it.en:it.ja}</div>))
          )}
          {dg.noteJa && <div style={{ fontSize:11, color:G, marginTop:6 }}>{en?(dg.noteEn||dg.noteJa):dg.noteJa}</div>}
        </Card>
      ))}</div>
    );
  }

  function App() {
    const [tab, _setTab] = useState("home");
    const [tabHist, setTabHist] = useState([]);
    const backRef = useRef(null);
    const setTab = (k)=>{ if(k!==tab) setTabHist(h=>[...h,tab]); _setTab(k); };
    const goBackTab = ()=>{ if(backRef.current && backRef.current()){ return; } if(!tabHist.length) return; const prev=tabHist[tabHist.length-1]; setTabHist(tabHist.slice(0,-1)); _setTab(prev); };
    const [state, setState] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [lang, setLang] = useState(certInitLang);
    const t = T[lang];
    useEffect(()=>{ loadState().then(s=>{ const init=s||{progress:{},meta:{streak:0,lastDay:""},review:[]}; if(!init.review) init.review=[]; if(!init.meta) init.meta={streak:0,lastDay:""}; setState(init); setLoaded(true); }); }, []);
    const addReview = (q)=>setState(prev=>{ const next=JSON.parse(JSON.stringify(prev)); if(!next.review) next.review=[]; if(!next.review.some(r=>r.q===q.q)) next.review.push({d:q.d,q:q.q,qEn:q.qEn,o:q.o,oEn:q.oEn,a:q.a}); saveState(next); return next; });
    const removeReview = (qt)=>setState(prev=>{ const next=JSON.parse(JSON.stringify(prev)); next.review=(next.review||[]).filter(r=>r.q!==qt); saveState(next); return next; });
    const clearReview = ()=>setState(prev=>{ const next=JSON.parse(JSON.stringify(prev)); next.review=[]; saveState(next); return next; });
    const record = (domId, correct)=>setState(prev=>{ const next=JSON.parse(JSON.stringify(prev)); if(!next.progress[domId]) next.progress[domId]={correct:0,attempts:0}; next.progress[domId].attempts++; if(correct) next.progress[domId].correct++; const today=todayStr(); if(next.meta.lastDay!==today){ const y=new Date(Date.now()-86400000).toISOString().slice(0,10); next.meta.streak=next.meta.lastDay===y?(next.meta.streak||0)+1:1; next.meta.lastDay=today; } saveState(next); return next; });
    if(!loaded) return <div style={{ padding:40, textAlign:"center", color:C.deep }}>{t.loading}</div>;
    const reviewCount = (state.review||[]).length;
    const TABS = [["home",t.tabHome],["quiz",t.tabQuiz],["exam",t.tabExam],["review",reviewCount>0?`${t.tabReview} (${reviewCount})`:t.tabReview],["diagram",t.tabDiagram],["compare",t.tabCompare],["confuse",t.tabConfuse],["glossary",t.tabGlossary]];
    return (
      <div style={{ fontFamily:"system-ui, sans-serif", color:C.ink, background:"#FBFCFE", minHeight:"100vh" }}>
        <div style={{ background:C.deep, color:nvInk("#ffffff", C.deep), padding:"16px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div><div style={{ fontSize:19, fontWeight:700 }}>{t.appTitle}</div><div style={{ fontSize:12, opacity:0.85, marginTop:2 }}>{t.appSub}</div></div>
          <div style={{ display:"flex", background:"rgba(0,0,0,.12)", borderRadius:20, padding:3 }}>
            {["ja","en"].map(l=><button key={l} onClick={()=>setLang(l)} style={{ border:"none", cursor:"pointer", borderRadius:16, padding:"5px 12px", fontSize:12, fontWeight:700, background:lang===l?"#fff":"transparent", color:lang===l?nvInk(C.deep, "#ffffff"):"#fff" }}>{l==="ja"?"日本語":"English"}</button>)}
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", borderBottom:`2px solid ${C.mid}`, background:C.light }}>
          {TABS.map(([k,label])=><button key={k} onClick={()=>setTab(k)} style={{ flex:"1 1 auto", padding:"11px 8px", border:"none", cursor:"pointer", background:tab===k?"#fff":"transparent", color:tab===k ? nvInk(C.deep, "#ffffff") : C.ink, fontWeight:tab===k?700:500, fontSize:13, borderBottom:tab===k?`3px solid ${C.primary}`:"3px solid transparent" }}>{label}</button>)}
        </div>
        {tabHist.length>0 && <button onClick={goBackTab} aria-label="Back" style={{ position:"fixed", right:16, bottom:104, zIndex:45, border:`1.5px solid ${C.deep}`, cursor:"pointer", borderRadius:22, padding:"9px 15px", background:"#fff", color:C.deep, fontSize:12.5, fontWeight:700, boxShadow:"0 4px 14px rgba(0,0,0,.20)" }}>← {lang==="en"?"Back":"戻る"}</button>}
        {tab!=="home" && <button onClick={()=>{ setTab("home"); if(typeof window!=="undefined") window.scrollTo({top:0,behavior:"smooth"}); }} aria-label="Top" style={{ position:"fixed", right:16, bottom:60, zIndex:45, border:"none", cursor:"pointer", borderRadius:22, padding:"10px 15px", background:C.deep, color:nvInk("#ffffff", C.deep), fontSize:12.5, fontWeight:700, boxShadow:"0 4px 14px rgba(0,0,0,.28)" }}>↑ {lang==="en"?"Top":"トップへ"}</button>}
        <div style={{ padding:16, maxWidth:820, margin:"0 auto" }}>
          {tab==="home" && <Home state={state} lang={lang} />}
          {tab==="quiz" && <Quiz onAnswer={record} onWrong={addReview} lang={lang} />}
          {tab==="exam" && <MSExamShell sets={EXAM_SETS} setKeys={[1,2,3,4,5]} domainSets={DOMAIN_SETS} domains={DOMAINS} lang={lang} C={C} PASS={PASS} onAnswer={record} onWrong={addReview} backRef={backRef} saveKey={STORE_KEY+":msexam"} examId={STORE_KEY.split("_")[0]} />}
          {tab==="review" && <Review state={state} onAnswer={record} onResolve={removeReview} onClear={clearReview} lang={lang} />}
          {tab==="diagram" && <Diagrams lang={lang} />}
          {tab==="compare" && <Compare lang={lang} />}
          {tab==="confuse" && <Confuse lang={lang} />}
          {tab==="glossary" && <Glossary lang={lang} />}
        </div>
      </div>
    );
  }
  return App;
}
