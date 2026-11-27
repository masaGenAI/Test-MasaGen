// @@nova-part 20-techhub/180-SlSkillsView.jsx

// ============ Slalom 変革道場 画面 ============
function SlProfileView({ en }) {
  const L = (p) => p[en ? 1 : 0];
  const card = { background: C.surface2, borderRadius: 10, padding: "11px 13px" };
  const G = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 10 };
  return (
    <div>
      <div style={{ fontSize: 11.5, color: C.dim, lineHeight: 1.7, marginBottom: 12, background: C.surface2, borderLeft: `3px solid ${C.gold}`, borderRadius: 8, padding: "8px 11px" }}>
        {en ? "Source note: slalom.com and press sites could not be opened from the build environment, so this page is assembled from web-search summaries. Every fact carries a confidence label; vendor-published figures are marked as such. Verify on primary pages and internally before quoting."
            : "出所について：制作環境からは slalom.com や報道各社のページを直接開けなかったため、Web検索の要約から組み立てています。各事実に確度を付け、自社発表の数値はその旨を明記しました。引用の前に一次ページと社内で確認してください。"}
      </div>
      <FoldSection title={en ? "I. THE FIRM — what is known, and how sure we are" : "I. 会社像 — 分かっていることと、その確度"} color={C.teal}>
        <div style={{ display: "grid", gap: 8 }}>
          {SL_FACTS.map((f, i) => (
            <div key={i} style={{ ...card, display: "grid", gridTemplateColumns: "minmax(90px,130px) 1fr", gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{L(f.k)}
                <div style={{ marginTop: 5 }}><NoteBadge color={SL_CONF[f.c][2]}>{SL_CONF[f.c][en ? 1 : 0]}</NoteBadge></div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7 }}>{L(f.v)}</div>
                <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{en ? "Source: " : "出所: "}{L(f.s)}</div>
              </div>
            </div>
          ))}
        </div>
      </FoldSection>
      <FoldSection title={en ? "II. WHAT TRANSFORMATION SELLS — the global offer" : "II. Transformationが提供するもの — グローバルのサービス像"} color={C.gold}>
        <div style={G}>
          {SL_OFFER.map((o, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: o.col, marginBottom: 4 }}>{L(o.t)}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{L(o.d)}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 8 }}>{en ? "Source: summaries of Slalom service pages and job postings (secondary)." : "出所: Slalomのサービス紹介と求人の要約（二次）。"}</div>
      </FoldSection>
      <FoldSection title={en ? "III. THE JAPAN ROLE — what the posting asks for" : "III. 日本の求人が求めるもの"} color={C.wine}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SL_JPROLE.map((r, i) => (
            <span key={i} style={{ fontSize: 12, color: C.text, background: C.surface2, border: `1px solid ${C.line}`, borderRadius: 999, padding: "4px 10px" }}>{L(r)}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 8 }}>{en ? "Source: search summary of a Tokyo Senior Consultant posting." : "出所: 東京のシニアコンサルタント求人の検索要約。"}</div>
      </FoldSection>
      <FoldSection title={en ? "IV. WHAT SLALOM'S OWN RESEARCH SAYS" : "IV. Slalom自身の調査が示すこと"} color={C.teal}>
        <div style={G}>
          {SL_SURVEY.map((s, i) => (
            <div key={i} style={card}>
              <div className="gh-display" style={{ fontSize: 24, color: C.gold }}>{s.n}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "2px 0 5px" }}>{L(s.t)}</div>
              <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.65 }}>{L(s.d)}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 8 }}>{en ? "Vendor-published survey figures, via press summaries." : "いずれも自社発表の調査の数値（報道要約経由）。"}</div>
      </FoldSection>
    </div>
  );
}

function SlSkillsView({ en }) {
  const L = (p) => p[en ? 1 : 0];
  const [open, setOpen] = useState(null);
  const card = { background: C.surface2, borderRadius: 10, padding: "11px 13px" };
  return (
    <div>
      <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginBottom: 10 }}>
        {en ? "Nine skill clusters for a Transformation consultant at Slalom Japan: five core (build one as your deep spike) and four differentiators (your breadth). Each card gives the evidence for why it matters here, what good looks like, a drill, and the trap."
            : "Slalom日本のTransformation職に求められるスキルを9つにまとめました。中核の5つ（うち一つを深い専門に）と、差がつく4つ（幅として持つ）です。各カードに、ここで効く根拠・できている状態・演習・落とし穴を載せています。"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 10 }}>
        {SL_SKILLS.map((s) => {
          const dom = SLALOM_DOMAINS.find((d) => d.id === s.id);
          const isOpen = open === s.id;
          return (
            <div key={s.id} style={{ ...card, borderLeft: `3px solid ${s.core ? C.teal : C.gold}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setOpen(isOpen ? null : s.id)}>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{en ? dom.en : dom.ja}</div>
                <NoteBadge color={s.core ? C.teal : C.gold}>{s.core ? (en ? "Core" : "中核") : (en ? "Differentiator" : "差がつく")}</NoteBadge>
              </div>
              <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.65, margin: "6px 0" }}><span style={{ color: C.gold, fontWeight: 700 }}>{en ? "Why here: " : "ここで効く根拠: "}</span>{L(s.why)}</div>
              {isOpen ? (
                <div style={{ display: "grid", gap: 7, marginTop: 6 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 3 }}>{en ? "What good looks like" : "できている状態"}</div>
                    {s.good.map((g, i) => <div key={i} style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>・{L(g)}</div>)}
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.65 }}><span style={{ color: C.teal, fontWeight: 700 }}>{en ? "Drill: " : "演習: "}</span>{L(s.drill)}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.65, background: C.bg, borderRadius: 8, padding: "7px 9px", borderLeft: `3px solid ${C.wine}` }}><span style={{ color: C.wineInk, fontWeight: 700 }}>{en ? "Trap: " : "落とし穴: "}</span>{L(s.trap)}</div>
                </div>
              ) : (
                <div style={{ fontSize: 11, color: C.dim, textAlign: "right", cursor: "pointer" }} onClick={() => setOpen(s.id)}>{en ? "Open details" : "詳しく見る"}</div>
              )}
            </div>
          );
        })}
      </div>
      <FoldSection title={en ? "HOW THIS LIST WAS BUILT — five lenses and where they collide" : "このスキル一覧の導き方 — 5つのレンズと、その対立"} color={C.wine}>
        <div style={{ display: "grid", gap: 8 }}>
          {SL_COUNCIL.lenses.map((l, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: C.teal, marginBottom: 3 }}>{L(l.n)}</div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>{L(l.c)}</div>
              <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.6, marginTop: 3 }}>{en ? "Biggest worry: " : "最大の懸念: "}{L(l.w)}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: C.gold, margin: "12px 0 6px" }}>{en ? "Conflicts and how they resolve" : "対立点と、その折り合い"}</div>
        <div style={{ display: "grid", gap: 8 }}>
          {SL_COUNCIL.conflicts.map((c, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.wineInk }}>{L(c[0])}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.65, margin: "3px 0" }}>{L(c[1])}</div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>→ {L(c[2])}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.surface2, borderLeft: `3px solid ${C.gold}`, borderRadius: 8, padding: "9px 12px", fontSize: 12, color: C.text, fontWeight: 700, lineHeight: 1.65, marginTop: 10 }}>{L(SL_COUNCIL.rec)}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 10, marginTop: 10 }}>
          <div style={card}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: C.gold, marginBottom: 4 }}>{en ? "Assumptions" : "置いた仮定"}</div>
            {SL_COUNCIL.assume.map((a, i) => <div key={i} style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>・{L(a)}</div>)}
          </div>
          <div style={card}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: C.wineInk, marginBottom: 4 }}>{en ? "What would change this" : "この結論が変わる条件"}</div>
            {SL_COUNCIL.falsify.map((a, i) => <div key={i} style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>・{L(a)}</div>)}
          </div>
        </div>
      </FoldSection>
    </div>
  );
}

function SlCasesView({ en }) {
  const L = (p) => p[en ? 1 : 0];
  return (
    <div>
      <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 10 }}>{en ? "Slalom-published cases and figures (via search summaries, unverified). Read each for the transformation lesson, then the note on translating it to Japan." : "Slalomが公表した事例と数値です（検索要約経由・未検証）。変革の担当として読むべき学びと、日本への翻訳を添えています。"}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 12 }}>
        {SL_CASES.map((c, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <span className="gh-display" style={{ fontSize: 16, color: C.gold }}>{c.co}</span>
              <NoteBadge color={C.teal}>{L(c.num)}</NoteBadge>
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, margin: "8px 0" }}>{L(c.what)}</div>
            <div style={{ fontSize: 12, lineHeight: 1.7, background: C.surface2, borderRadius: 8, padding: "8px 10px", borderLeft: `3px solid ${C.wine}`, marginBottom: 8 }}>
              <span style={{ color: C.wineInk, fontWeight: 700 }}>{en ? "Transformation lesson: " : "変革の学び: "}</span>{L(c.lesson)}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.muted }}><span style={{ color: C.teal, fontWeight: 700 }}>{en ? "In Japan: " : "日本への翻訳: "}</span>{L(c.jp)}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SlDrillsView({ en }) {
  const L = (p) => p[en ? 1 : 0];
  const [shown, setShown] = useState({});
  return (
    <div>
      <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginBottom: 10 }}>{en ? "Eight scenarios you are likely to meet in your first year. Write your own answer first, using the angles, then open the model outline to compare." : "最初の一年で出会いそうな8つの場面です。観点を手がかりにまず自分の答えを書き、そのあとで模範の骨子と比べてください。"}</div>
      <div style={{ display: "grid", gap: 10 }}>
        {SL_DRILLS.map((d, i) => (
          <Card key={i}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.gold, marginBottom: 4 }}>{i + 1}. {L(d.t)}</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.7, marginBottom: 8 }}>{L(d.s)}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {d.hint.map((h, k) => <NoteBadge key={k} color={C.teal}>{L(h)}</NoteBadge>)}
            </div>
            {shown[i] ? (
              <div style={{ fontSize: 12, lineHeight: 1.75, background: C.surface2, borderRadius: 8, padding: "9px 11px", borderLeft: `3px solid ${C.gold}` }}>{L(d.ans)}</div>
            ) : (
              <button className="gh-btn" onClick={() => setShown({ ...shown, [i]: true })}>{en ? "Show model outline" : "模範の骨子を見る"}</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function SlPlanView({ en }) {
  const L = (p) => p[en ? 1 : 0];
  const [lv, setLv] = useState({});
  const [target, setTarget] = useState(3);
  useEffect(() => {
    try { window.storage && window.storage.get && window.storage.get("slalom_self_v1").then((r) => {
      if (r && r.value) { const s = JSON.parse(r.value); setLv(s.lv || {}); if (s.target) setTarget(s.target); }
    }).catch(() => {}); } catch (e) {}
  }, []);
  const save = (nlv, nt) => { try { window.storage && window.storage.set && window.storage.set("slalom_self_v1", JSON.stringify({ lv: nlv, target: nt })); } catch (e) {} };
  const setOne = (id, v) => { const n = { ...lv, [id]: v }; setLv(n); save(n, target); };
  const rated = SLALOM_DOMAINS.filter((d) => lv[d.id]);
  const gaps = rated.map((d) => ({ d, g: target - lv[d.id] })).filter((x) => x.g > 0).sort((a, b) => b.g - a.g);
  const unrated = SLALOM_DOMAINS.length - rated.length;
  const card = { background: C.surface2, borderRadius: 10, padding: "11px 13px" };
  return (
    <div>
      <FoldSection title={en ? "I. THE FIRST 90 DAYS" : "I. 最初の90日"} color={C.teal}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 10 }}>
          {SL_PLAN.map((p, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: C.gold, marginBottom: 5 }}>{L(p.d)}</div>
              {p.items.map((it, k) => <div key={k} style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>・{L(it)}</div>)}
            </div>
          ))}
        </div>
      </FoldSection>
      <FoldSection title={en ? "II. SELF-ASSESSMENT — where to spend the next quarter" : "II. 自己評価 — 次の四半期にどこを伸ばすか"} color={C.gold}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: C.muted }}>{en ? "Target level:" : "目標の水準:"}</span>
          {SL_LEVELS.map((l, i) => (
            <button key={i} className="gh-btn" onClick={() => { setTarget(i + 1); save(lv, i + 1); }} style={target === i + 1 ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}}>{i + 1}. {L(l)}</button>
          ))}
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {SLALOM_DOMAINS.map((d) => (
            <div key={d.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12.5, color: C.text, fontWeight: 700 }}>{en ? d.en : d.ja}</span>
              <span style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4].map((v) => (
                  <button key={v} className="gh-btn" onClick={() => setOne(d.id, v)} title={L(SL_LEVELS[v - 1])}
                          style={(lv[d.id] || 0) === v ? { borderColor: C.teal, color: C.teal, fontWeight: 700, minWidth: 34 } : { minWidth: 34 }}>{v}</button>
                ))}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, background: C.surface2, borderLeft: `3px solid ${C.wine}`, borderRadius: 8, padding: "9px 12px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.wineInk, marginBottom: 4 }}>{en ? "Largest gaps to your target" : "目標との差が大きい順"}</div>
          {unrated > 0 && <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 4 }}>{en ? `${unrated} area(s) not yet rated. Levels are stored on this device only.` : `未評価 ${unrated} 領域（評価はこの端末にのみ保存）`}</div>}
          {gaps.length === 0 ? <div style={{ fontSize: 12, color: C.muted }}>{rated.length ? (en ? "Every rated area meets your target." : "評価した領域はすべて目標に届いています。") : (en ? "Rate each area to see your gaps." : "各領域を評価すると差が表示されます。")}</div>
            : gaps.slice(0, 3).map((x) => <div key={x.d.id} style={{ fontSize: 12, color: C.text, lineHeight: 1.7 }}>・{en ? x.d.en : x.d.ja}（{en ? `gap ${x.g}` : `差 ${x.g}`}）— {en ? "open the skill card's drill, then the quiz for this area" : "スキルの演習を行い、同じ領域のクイズで確かめる"}</div>)}
        </div>
      </FoldSection>
    </div>
  );
}

function SlQuizView({ en }) {
  return <CheckEngine bank={SLALOM_BANK} domains={SLALOM_DOMAINS} storeKey="slalom_stats_v1" noTitle partSize={100} removedIdx={[79, 571]}
    intro="Slalom日本のTransformation職に求められる9つのスキル領域の判断問題です。Slalomに関する数値には、自社発表や二次情報である旨を解説に添えています。"
    introEn="Judgement questions across the nine skill areas for Slalom Japan's Transformation role; Slalom figures are marked as vendor-published or secondary. " />;
}

function TabSlalom() {
  const clang = useLang();
  const en = clang === "en";
  const [view, setView] = useState("skills");
  const __opBack = useLocalHistory([[view, setView]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const views = [["skills", ["求められるスキル", "Skills"]], ["profile", ["会社とTransformation", "Firm & practice"]], ["cases", ["Slalomの事例", "Slalom cases"]], ["drills", ["場面演習", "Scenario drills"]], ["plan", ["90日計画・自己評価", "90 days & self-check"]], ["quiz", ["スキルクイズ", "Skill quiz"]]];
  return (
    <div>
      <SectionTitle jp="Slalom変革道場 — Transformation職のスキルを、グローバル事例と演習で磨く" en="Slalom Transformation Dojo — skills, global cases and drills for the Transformation role" />
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, marginBottom: 10 }}>
        {en ? "Built for joining Slalom Japan's Transformation team. The generic craft lives in the 'Transformation' and 'Global Firm' tabs; this tab calibrates it to Slalom's model, evidence and first-year situations."
            : "Slalom日本のTransformation部門に入る前提で作りました。変革の一般的な型は「変革の実務」「ファーム実務」タブにあり、このタブはそれをSlalomの運営モデル・根拠・最初の一年の場面に合わせて絞り込んでいます。"}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {views.map(([v, l]) => (
          <button key={v} className="gh-btn" onClick={() => setView(v)} style={view === v ? { borderColor: C.wine, color: C.wineInk, fontWeight: 700 } : {}}>{en ? l[1] : l[0]}</button>
        ))}
      </div>
      {view === "skills" && <SlSkillsView en={en} />}
      {view === "profile" && <SlProfileView en={en} />}
      {view === "cases" && <SlCasesView en={en} />}
      {view === "drills" && <SlDrillsView en={en} />}
      {view === "plan" && <SlPlanView en={en} />}
      {view === "quiz" && <SlQuizView en={en} />}
    </div>
  );
}


const GOVDOJO_DOMAINS = [
  { id: "D1", ja: "利用規程・データ取扱", en: "Use policy & data" },
  { id: "D2", ja: "リスク階層化", en: "Risk tiering" },
  { id: "D3", ja: "SoA・第三者審査", en: "SoA & vendor review" },
  { id: "D4", ja: "LLM脅威と統制", en: "LLM threats & controls" },
  { id: "D5", ja: "インシデント対応", en: "Incident response" },
  { id: "D6", ja: "業種横断の応用", en: "Cross-industry" },
  { id: "D7", ja: "規制動向（国内外）", en: "Regulatory landscape" },
  { id: "D8", ja: "業界別の規定", en: "Industry rules" },
  { id: "D9", ja: "ローコード・ノーコード統制", en: "Low-code governance" },
  { id: "D10", ja: "実務キット（台帳・検証・顧客向け・リスク管理）", en: "Practice kits" },
];
const GOVDOJO_TIER = { prohibited: "#E27069", high: "#E28C4E", limited: "#D6B152", minimal: "#72BA88" };
const GOVDOJO_TIER_LABEL = { prohibited: ["禁止", "Prohibited"], high: ["高リスク", "High"], limited: ["限定", "Limited"], minimal: ["最小", "Minimal"] };
