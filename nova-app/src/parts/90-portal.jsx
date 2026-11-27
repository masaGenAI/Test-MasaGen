// @@nova-part 90-portal.jsx
// ================= ポータルの横断検索 =================
// 各ハブが出す PORTAL_INDEX と、ビルド時に作った Book-Summary の書名索引（__NOVA_BOOK_INDEX__）をまとめて引く。
// 結果は URL（#ハブ/位置）で開くので、各ハブの「URL に位置を残す」仕組みでそのまま目的の画面に着く。
function novaNorm(str) {
  return String(str || "").replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).toLowerCase().replace(/[ー・\s　]/g, "");
}
const NOVA_SEARCH_GROUP = { hub: ["ハブ", "Hubs"], megatech: ["TechHub", "TechHub"], certification: ["資格", "Certification"], finance: ["Finance", "Finance"], consulting: ["Consulting", "Consulting"], linguisticshub: ["Linguistics", "Linguistics"], languagehub: ["Language", "Language"], booksummary: ["Book-Summary", "Book-Summary"] };
function novaSearchIndex(en) {
  const out = [];
  const add = (g, label, sub, hash, extra) => { if (!label) return; out.push({ g, label, sub: sub || "", hash, nl: novaNorm(label), hay: novaNorm([label, sub, extra].filter(Boolean).join(" ")) }); };
  NOVA_STATIONS.forEach((st) => add("hub", en ? st.en : st.ja, en ? st.tagEn : st.tagJa, st.id, [st.ja, st.en].join(" ")));
  const take = (mod, g) => { try { if (mod && mod.PORTAL_INDEX) mod.PORTAL_INDEX(en).forEach((x) => add(g, x.label, x.sub, x.hash, x.extra)); } catch (e) {} };
  take(MegaTechHubModule, "megatech"); take(CertHubModule, "certification"); take(FinanceHubModule, "finance");
  take(ConsultingHubModule, "consulting"); take(LinguisticsHubModule, "linguisticshub"); take(LanguageHubModule, "languagehub");
  (typeof __NOVA_BOOK_INDEX__ !== "undefined" ? __NOVA_BOOK_INDEX__ : []).forEach(([id, title, author, kind]) => add("booksummary", title, [author, kind].filter(Boolean).join(" ・ "), "booksummary/book/" + encodeURIComponent(id), author));
  return out;
}
function NovaSearch({ lang }) {
  const en = lang === "en";
  const [q, setQ] = useState("");
  const [hi, setHi] = useState(0);
  const inp = useRef(null);
  const index = useMemo(() => (q.trim() ? novaSearchIndex(en) : null), [en, !!q.trim()]);
  const parts = q.trim().split(/[\s　]+/).map(novaNorm).filter(Boolean);
  const all = useMemo(() => (index && parts.length ? index.filter((x) => parts.every((p) => x.hay.includes(p))) : []), [index, q]);
  const res = useMemo(() => {
    const order = Object.keys(NOVA_SEARCH_GROUP);
    const hits = all.map((x) => ({ ...x, s: x.nl.startsWith(parts[0]) ? 0 : x.nl.includes(parts[0]) ? 1 : 2 })).sort((a, b) => order.indexOf(a.g) - order.indexOf(b.g) || a.s - b.s);
    const per = {}; const out = [];
    hits.forEach((x) => { per[x.g] = (per[x.g] || 0) + 1; if (per[x.g] <= 8 && out.length < 48) out.push(x); });
    return out;
  }, [all]);
  useEffect(() => { setHi(0); }, [q]);
  useEffect(() => {
    const f = (e) => { const tg = (e.target && e.target.tagName) || ""; if (e.key === "/" && tg !== "INPUT" && tg !== "TEXTAREA" && tg !== "SELECT") { e.preventDefault(); inp.current && inp.current.focus(); } };
    window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f);
  }, []);
  const go = (x) => { if (!x) return; try { window.location.hash = "#" + x.hash; } catch (e) {} };
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, res.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(res[hi]); }
    else if (e.key === "Escape") setQ("");
  };
  let lastG = null;
  return (
    <div style={{ margin: "18px 0 6px" }}>
      <input ref={inp} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} type="search"
        aria-label={en ? "Search all of Project Nova" : "Project Nova 全体を検索"}
        placeholder={en ? "Search everything — exams, sections, terms, books…  ( / )" : "全体を検索 — 資格・セクション・用語・本の書名など（ / で移動）"}
        style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", fontSize: 15, border: `1px solid ${NOVA.line}`, borderRadius: 8, background: "#fff", color: NOVA.ink, outline: "none" }} />
      {q.trim() ? (
        <div role="listbox" aria-label={en ? "Search results" : "検索結果"} style={{ marginTop: 6, border: `1px solid ${NOVA.line}`, borderRadius: 8, background: "#fff", maxHeight: 420, overflowY: "auto" }}>
          <div style={{ fontSize: 11.5, color: NOVA.sub, padding: "7px 12px", borderBottom: `1px solid ${NOVA.line}` }}>
            {en ? `${all.length} matches${all.length > res.length ? ` · showing ${res.length}` : ""}` : `${all.length}件${all.length > res.length ? `（${res.length}件を表示。語を足すと絞れる）` : ""}`}
          </div>
          {res.length === 0 ? <div style={{ padding: "12px", fontSize: 13, color: NOVA.sub }}>{en ? "No matches." : "見つからない。"}</div> : null}
          {res.map((x, i) => {
            const head = x.g !== lastG ? (lastG = x.g, <div key={"h" + i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: NOVA.sub, padding: "8px 12px 2px" }}>{NOVA_SEARCH_GROUP[x.g][en ? 1 : 0]}</div>) : null;
            return (
              <React.Fragment key={i}>
                {head}
                <button role="option" aria-selected={i === hi} onMouseEnter={() => setHi(i)} onClick={() => go(x)}
                  style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: i === hi ? "#EEF3FA" : "transparent", padding: "7px 12px", cursor: "pointer" }}>
                  <div style={{ fontSize: 13.5, color: NOVA.ink, fontWeight: 600, lineHeight: 1.45 }}>{x.label}</div>
                  {x.sub ? <div style={{ fontSize: 11.5, color: NOVA.sub, lineHeight: 1.4 }}>{x.sub}</div> : null}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

const NOVA_STATIONS = [
  {
    id: "consulting",
    accent: NOVA.consulting,
    Icon: IconConsulting,
    ja: "Consulting Hub",
    en: "Consulting Hub",
    get tagJa() { return `9 ドメイン・${nf(novaStats().cons)}問`; },
    get tagEn() { return `9 domains · ${nf(novaStats().cons)} Q`; },
  },
  {
    id: "megatech",
    accent: NOVA.megatech,
    Icon: IconMegatech,
    ja: "TechHub",
    en: "TechHub",
    get tagJa() { const x = novaStats(); return `${x.tabs} タブ・${nf(x.mega)}問`; },
    get tagEn() { const x = novaStats(); return `${x.tabs} tabs · ${nf(x.mega)} Q`; },
  },
  {
    id: "finance",
    accent: NOVA.finance,
    Icon: IconFinance,
    ja: "Finance Hub",
    en: "Finance Hub",
    tagJa: "20 セクション",
    tagEn: "20 sections",
  },
  {
    id: "certification",
    accent: NOVA.certification,
    Icon: IconCert,
    ja: "Certification Hub",
    en: "Certification Hub",
    tagJa: "28資格＋横断模試",
    tagEn: "28 certs + cross mock",
  },
  {
    id: "languagehub",
    accent: NOVA.languagehub,
    Icon: IconLanguage,
    ja: "Language Hub",
    en: "Language Hub",
    tagJa: "西・独・仏",
    tagEn: "3 languages",
  },
  {
    id: "linguisticshub",
    accent: NOVA.linguisticshub,
    Icon: IconLinguistics,
    ja: "Linguistics Hub",
    en: "Linguistics Hub",
    get tagJa() { const l = novaStats().ling; return `${l.cats}カテゴリ・${l.fields}分野`; },
    get tagEn() { const l = novaStats().ling; return `${l.cats} categories · ${l.fields} fields`; },
  },
  {
    id: "booksummary",
    accent: NOVA.booksummary,
    Icon: IconBook,
    ja: "Book-Summary",
    en: "Book-Summary",
    // 公開版には中身を入れていない（docs/publication-scope.md）
    get tagJa() { return NOVA_PUBLIC_BUILD ? "ローカル版のみ" : `flier・Kindle・YouTube・note・Instagram 要約${nf(novaStats().books)}件`; },
    get tagEn() { return NOVA_PUBLIC_BUILD ? "Local build only" : `flier · Kindle · YouTube · note · Instagram · ${nf(novaStats().books)} summaries`; },
  },
  {
    id: "tracker",
    accent: NOVA.tracker,
    Icon: IconTracker,
    ja: "Learning Tracker",
    en: "Learning Tracker",
    tagJa: "進捗トラッカー",
    tagEn: "Progress tracker",
  },
  {
    id: "liberalarts",
    accent: NOVA.liberalarts,
    Icon: IconLiberal,
    ja: "Liberal Arts",
    en: "Liberal Arts",
    get tagJa() { const l = novaStats().la; return l.people ? `${l.domains}領域・雑学${l.trivia}問` : "準備中"; },
    get tagEn() { const l = novaStats().la; return l.people ? `${l.domains} fields · ${l.trivia} trivia` : "Coming soon"; },
  },
  {
    id: "anythingmemo",
    accent: NOVA.amt,
    Icon: IconMemo,
    ja: "Anything Memo",
    en: "Anything Memo",
    tagJa: "調べ済みノート",
    tagEn: "Knowledge notes",
  },
  {
    id: "training",
    accent: NOVA.training,
    Icon: IconTraining,
    ja: "Training Hub",
    en: "Training Hub",
    tagJa: "Set1〜5の実施カレンダー",
    tagEn: "Set 1–5 workout calendar",
  },
  {
    id: "sidework",
    accent: NOVA.sidework,
    Icon: IconSideWork,
    ja: "Side Work Hub",
    en: "Side Work Hub",
    tagJa: "SNS副業・市場調査・AI動画",
    tagEn: "Side work · research · AI video",
  },
];

function NovaRule({ margin }) {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, ${NOVA.accent} 0%, ${NOVA.line} 35%, ${NOVA.line} 100%)`,
        margin: margin || "0",
      }}
    />
  );
}

function NovaComingSoon({ station, lang }) {
  const Icon = station.Icon;
  const label =
    lang === "ja"
      ? { title: lang === "ja" ? station.ja : station.en, msg: "コンテンツは準備中です。近日中に追加予定です。" }
      : { title: station.en, msg: "Content is coming soon." };
  return (
    <div
      style={{
        minHeight: "calc(100vh - 46px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        fontFamily: NOVA_SANS,
        color: NOVA.ink,
        textAlign: "center",
        padding: 40,
      }}
    >
      <Icon color={station.accent} size={56} />
      <div style={{ fontFamily: NOVA_SERIF, fontSize: 26 }}>{label.title}</div>
      <div style={{ fontSize: 14, color: NOVA.sub }}>{label.msg}</div>
    </div>
  );
}

function NovaStationRow({ st, lang, onEnter }) {
  const [hover, setHover] = useState(false);
  const Icon = st.Icon;
  return (
    <div
      className="nova-row"
      onClick={onEnter}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 26,
        flex: 1,
        padding: "16px 6px",
        borderBottom: `1px solid ${NOVA.line}`,
        borderLeft: `2px solid ${hover ? st.accent : "transparent"}`,
        background: hover ? NOVA.panelSoft : "transparent",
        transition: "background 0.25s ease, border-color 0.25s ease, padding-left 0.25s ease",
        paddingLeft: hover ? 22 : 16,
      }}
    >
      <div
        className="nova-icon"
        style={{
          width: 52,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon color={hover ? st.accent : NOVA.faint} size={30} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="nova-title"
          style={{
            fontFamily: NOVA_SERIF,
            fontSize: 22,
            color: NOVA.ink,
            letterSpacing: 0.2,
          }}
        >
          {lang === "ja" ? st.ja : st.en}
        </div>
      </div>

      <div
        className="nova-tag"
        style={{
          fontFamily: NOVA_SANS,
          fontSize: 11,
          letterSpacing: 1,
          color: NOVA.sub,
          border: `1px solid ${NOVA.line}`,
          borderRadius: 999,
          padding: "4px 12px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {lang === "ja" ? st.tagJa : st.tagEn}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "transform 0.25s ease",
          transform: hover ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke={hover ? st.accent : NOVA.faint}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 0.25s ease" }}
          />
        </svg>
      </div>
    </div>
  );
}

const NOVA_RESPONSIVE_CSS = `
@media (max-width: 480px) {
  /* 長い URL・パス・スラッシュでつないだ語（azureml://… など）が画面幅を押し広げないよう、スマホ幅では語の途中でも折り返す */
  body { overflow-wrap: break-word; }
  button { overflow-wrap: anywhere; }
  .nova-container { padding-left: 16px !important; padding-right: 16px !important; }
  .nova-row { gap: 14px !important; padding-top: 14px !important; padding-bottom: 14px !important; }
  .nova-icon { width: 38px !important; }
  .nova-title { font-size: 17px !important; }
  .nova-tag { font-size: 9.5px !important; padding: 3px 8px !important; letter-spacing: 0.5px !important; white-space: normal !important; max-width: 128px; text-align: center; line-height: 1.35; }
  .nova-masthead-title { font-size: 17px !important; letter-spacing: 0.8px !important; }
}
`;

// ポータルの「マイ進捗」サマリ。端末に保存された学習アクティビティ（チェック済み項目・
// AIアーキ確認クイズの成績・前回のハブ）を集計して一目で表示する。
// ハブ表記は INDEX と同じ英語「〇〇 Hub」に統一（ja/en 共通）。
const NOVA_HUB_LABEL = {
  finance: ["Finance Hub", "Finance Hub"], megatech: ["TechHub", "TechHub"], consulting: ["Consulting Hub", "Consulting Hub"],
  certification: ["Certification Hub", "Certification Hub"], languagehub: ["Language Hub", "Language Hub"], booksummary: ["Book-Summary", "Book-Summary"],
  tracker: ["Learning Tracker", "Learning Tracker"], anythingmemo: ["Anything Memo", "Anything Memo"], linguisticshub: ["Linguistics Hub", "Linguistics Hub"], liberalarts: ["Liberal Arts", "Liberal Arts"], sidework: ["Side Work Hub", "Side Work Hub"],
};
// 完了チェックの保存キーを「ハブ・対象・種別」に解釈する。
const NOVA_CERT_NAME = (p) => {
  const map = { saa_c03: "SAA-C03", clf_c02: "CLF-C02", cca_f: "CCA-F", aics: "AICS", adp: "ADP", agwa: "AGWA", exammock12: "総合模試" };
  if (map[p]) return map[p];
  const m = p.match(/^([a-z]+)(\d+)$/);
  return m ? m[1].toUpperCase() + "-" + m[2] : p.toUpperCase();
};
function parseDoneKey(key) {
  if (key === "cloud_dojo_cat_done_v1") return { hub: "megatech", title: "クラウド道場", titleEn: "Cloud Dojo", kJa: "分野", kEn: "areas" };
  if (key.startsWith("gafa_") && key.includes("_done")) {
    if (key.includes("devlang")) return { hub: "megatech", title: "開発・言語道場", titleEn: "Dev/Lang Dojo", kJa: "分野", kEn: "areas" };
    if (key.includes("theme")) return { hub: "megatech", title: "クイズテーマ", titleEn: "Quiz themes", kJa: "テーマ", kEn: "themes" };
    return { hub: "megatech", title: "技術道場", titleEn: "Tech Dojo", kJa: "完了", kEn: "done" };
  }
  if (key.startsWith("hub_cert_done")) return { hub: "certification", title: "取得資格", titleEn: "Earned certs", kJa: "取得", kEn: "earned" };
  if (key.startsWith("finance_") && key.includes("done")) return { hub: "finance", title: key.includes("theme") ? "クイズテーマ" : "セクション", titleEn: key.includes("theme") ? "Quiz themes" : "Sections", kJa: "完了", kEn: "done" };
  if (key.startsWith("consulting_") && key.includes("_done")) {
    const s = key.slice("consulting_".length).replace(/_done.*$/, "");
    const t = { domain: ["ドメイン", "Domains"], diagram: ["図解", "Diagrams"], case: ["ケース", "Cases"] }[s] || [s, s];
    return { hub: "consulting", title: t[0], titleEn: t[1], kJa: "完了", kEn: "done" };
  }
  let m = key.match(/^([a-z0-9_]+)_study_v\d+:(quiz_resume:dc|exam_resume:mockdc)$/);
  if (!m && key === "exammock12:mockdc") m = [null, "exammock12", "exam_resume:mockdc"];
  if (m) { const isExam = m[2].includes("mockdc"); const c = NOVA_CERT_NAME(m[1]); return { hub: "certification", title: c, titleEn: c, kJa: isExam ? "模試" : "クイズ", kEn: isExam ? "mock" : "quiz" }; }
  if (key.startsWith("case:")) return { hub: "other", title: "ケース", titleEn: "Case", kJa: "完了", kEn: "done" };
  if (/_done(_v\d+)?(:|$)|:dc$|:mockdc$/.test(key)) return { hub: "other", title: key.replace(/[_:]+/g, " ").replace(/ v\d+.*$/, "").replace(/ done.*$/, "").trim(), kJa: "完了", kEn: "done" };
  return null;
}
// 端末の暦日（YYYY-MM-DD）。toISOString は UTC なので、日本時間の0〜9時が前日になってしまう
function novaLocalDay(dt) {
  var d = dt || new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
// 学習アクティビティ日次台帳。クイズ回答のたびに当日カウントを+1し、STUDY LOG のヒートマップに使う。
function novaLogStudy() {
  try {
    var K = "nova_activity_v1";
    var day = novaLocalDay();
    var ls = window.localStorage;
    var m = {}; try { m = JSON.parse(ls.getItem(K)) || {}; } catch (e) {}
    m[day] = (m[day] || 0) + 1;
    ls.setItem(K, JSON.stringify(m));
  } catch (e) {}
}
// ---------- デイリー記録（Others） ----------
// Cowork の「デイリータスク トラッカー」で手動記録になっている Others 9項目を、Nova で日々つけるための台帳。
// Nova にすでにある記録（資格の回答・Language Hub・Book Summary・学習トラッカー）は、保存のたびに日付つきで自動計上し、
// もう一度入力させない。Nova の外でやること（English (ELZA) など）はワンタップで記録する。
const NOVA_DAILY_KEY = "nova_daily_v1";
// name と並びは Cowork のトラッカーの Others と同じ
const NOVA_DAILY_CATS = [
  { id: "E", name: "English (ELZA)" },
  { id: "L", name: "Languages（ES/DE）", hub: "languagehub", src: ["Language Hub のスペイン語・ドイツ語（クイズ・聞き流し・単語）", "Language Hub Spanish/German (quiz, listening, vocab)"] },
  { id: "R", name: "Reading", hub: "booksummary", src: ["Book Summary の既読チェック・書籍クイズ、学習トラッカーの書籍", "Book Summary read checks and quizzes; Learning Tracker books"] },
  { id: "EL", name: "E-learning", hub: "tracker", src: ["学習トラッカーの講座・Udemy・Tools の更新", "Learning Tracker course, Udemy and tools updates"] },
  { id: "CT", name: "Certification", hub: "certification", src: ["Certification Hub の問題・模試の回答", "Certification Hub question and mock-exam answers"] },
  { id: "H", name: "Hand-skills" },
  { id: "GF", name: "GFS" },
  { id: "S", name: "Selfcare" },
  { id: "J", name: "Journaling" },
];
// 自動計上の単位（表示用）[日本語, 英語]
const NOVA_DAILY_UNIT = { q: ["問", " Q"], min: ["分", " min"], mat: ["教材", " items"], v: ["語", " words"], sum: ["件既読", " read"], item: ["件更新", " updated"] };
// Notion の Others 行の「Day N」は 2026-06-01 を Day 1 として数えている（Day 119＝9/27、Day 156＝11/3 で確認）
const NOVA_DAILY_DAY1 = Date.UTC(2026, 5, 1);
function novaDailyDayNo(day) {
  const p = String(day).split("-").map(Number);
  return Math.round((Date.UTC(p[0], p[1] - 1, p[2]) - NOVA_DAILY_DAY1) / 86400000) + 1;
}
function novaDailyRead() {
  try {
    const o = JSON.parse(window.localStorage.getItem(NOVA_DAILY_KEY) || "null");
    if (o && typeof o === "object" && o.days && typeof o.days === "object") return o;
  } catch (e) {}
  return { v: 1, days: {} };
}
function novaDailySave(o) {
  try { window.localStorage.setItem(NOVA_DAILY_KEY, JSON.stringify(o)); } catch (e) {}
  try { window.dispatchEvent(new Event("nova-daily")); } catch (e) {}
}
// 自動計上：今日のカテゴリに単位ごとの数を足す
function novaDailyAdd(cat, units) {
  const us = Object.keys(units || {}).filter((u) => units[u] > 0);
  if (!us.length) return;
  const o = novaDailyRead();
  const day = novaLocalDay();
  const d = o.days[day] || (o.days[day] = {});
  const a = d.a || (d.a = {});
  const c = a[cat] || (a[cat] = {});
  us.forEach((u) => { c[u] = Math.round(((c[u] || 0) + units[u]) * 10) / 10; });
  novaDailySave(o);
}
function novaDailyHasAuto(d, c) { const a = d && d.a && d.a[c]; return !!a && Object.keys(a).some((u) => a[u] > 0); }
// 手動の記録（m: 1＝完了 / 0＝自動計上を取り消し）が自動計上より優先
function novaDailyStatus(d, c) {
  const m = (d && d.m) || {};
  const auto = novaDailyHasAuto(d, c);
  if (m[c] === 1) return "done";
  if (m[c] === 0) return auto ? "off" : "none";
  return auto ? "auto" : "none";
}
function novaDailyIsDone(d, c) { const s = novaDailyStatus(d, c); return s === "done" || s === "auto"; }
function novaDailyAutoText(d, c, en) {
  const a = d && d.a && d.a[c];
  if (!a) return "";
  return Object.keys(a).filter((u) => a[u] > 0).map((u) => {
    const un = NOVA_DAILY_UNIT[u] || [u, " " + u];
    const n = u === "min" ? Math.max(1, Math.round(a[u])) : a[u];
    return n + un[en ? 1 : 0];
  }).join(en ? ", " : "・");
}
function novaDailyDoneIds(d) { return NOVA_DAILY_CATS.filter((c) => novaDailyIsDone(d, c.id)).map((c) => c.id); }
// ---- 自動計上：Nova の既存の保存を横から見て、増えた分だけを今日に足す ----
// 資格ごとの保存キー（CERT_STORE と同じもの：clf_c02_dashboard_v1 と *_study_vN / *_hub_study_vN）
const NOVA_DAILY_CERT_RE = /^(clf_c02_dashboard_v1|[a-z0-9_]+_study_v\d+)$/;
const NOVA_DAILY_LH_KEYS = { "quiz-stats": 1, "listen-minutes": 1, "listen-done": 1, "vocab-known": 1 };
function novaDailyCountTrue(v, re) { if (!v || typeof v !== "object") return 0; return Object.keys(v).filter((k) => v[k] && (!re || re.test(k))).length; }
// 保存値から「累計の数」を測る。{ cat, m: { 単位: 数 } }
function novaDailyMeasure(k, raw) {
  let v = null;
  try { v = raw == null ? null : (typeof raw === "string" ? JSON.parse(raw) : raw); } catch (e) { return null; }
  if (NOVA_DAILY_CERT_RE.test(k)) {
    let n = 0, hasProg = false;
    if (v && v.progress && typeof v.progress === "object") Object.values(v.progress).forEach((p) => { if (p && typeof p === "object") { hasProg = true; n += Number(p.attempts != null ? p.attempts : p.a) || 0; } });
    if (!hasProg && v && v.results && typeof v.results === "object") n = Object.keys(v.results).length;
    return { cat: "CT", m: { q: n } };
  }
  const ES_DE = ["es", "de"];
  if (k === "quiz-stats") return { cat: "L", m: { q: ES_DE.reduce((t, l) => t + (Number(v && v[l] && v[l].totalAttempts) || 0), 0) } };
  if (k === "listen-minutes") return { cat: "L", m: { min: ES_DE.reduce((t, l) => t + (Number(v && v[l]) || 0), 0) } };
  if (k === "listen-done") return { cat: "L", m: { mat: novaDailyCountTrue(v, /^(es|de)\|/) } };
  if (k === "vocab-known") return { cat: "L", m: { v: novaDailyCountTrue(v, /^(es|de)_/) } };
  if (k === "bsh:booksummaryhub:checked:v1") return { cat: "R", m: { sum: novaDailyCountTrue(v) } };
  if (k === "bsh:booksummaryhub:quiz:v1") {
    let n = 0; Object.values((v && v.q) || {}).forEach((r) => { n += Number(r && r.seen) || 0; });
    return { cat: "R", m: { q: n } };
  }
  return null;
}
const NOVA_DAILY_LAST = {};
// oldRaw：書き込み前の値（文字列）／null＝まだ無い／undefined＝読めない（このときは前回測った値と比べる）
function novaDailyOnWrite(k, oldRaw, newRaw) {
  const nw = novaDailyMeasure(k, newRaw);
  if (!nw) return;
  let old;
  if (oldRaw === undefined) old = NOVA_DAILY_LAST[k];
  else if (oldRaw === null) old = {};
  else { const o = novaDailyMeasure(k, oldRaw); old = o ? o.m : {}; }
  NOVA_DAILY_LAST[k] = nw.m;
  if (!old) return;
  const inc = {};
  Object.keys(nw.m).forEach((u) => { const dlt = (nw.m[u] || 0) - (old[u] || 0); if (dlt > 0) inc[u] = dlt; });
  novaDailyAdd(nw.cat, inc);
}
// 学習トラッカー（iframe）の保存：講座・Udemy・Tools の状態や項目が変わったら E-learning、書籍なら Reading
function novaDailyOnTracker(k, oldRaw, newRaw) {
  if (!/^learning_tracker_cache_v\d+$/.test(k) || oldRaw == null) return;
  let a = null, b = null;
  try { a = JSON.parse(oldRaw); b = JSON.parse(newRaw); } catch (e) { return; }
  if (!a || !b || !Array.isArray(a.items) || !Array.isArray(b.items)) return;
  const prev = {};
  a.items.forEach((it) => { if (it) prev[it.key + "||" + it.name] = JSON.stringify([it.status, it.p || {}]); });
  let el = 0, rd = 0;
  b.items.forEach((it) => {
    if (!it) return;
    const was = prev[it.key + "||" + it.name];
    if (was === undefined || was === JSON.stringify([it.status, it.p || {}])) return;
    if (it.key === "book") rd++;
    else if (it.key === "course" || it.key === "udemy" || it.key === "tools") el++;
  });
  if (el) novaDailyAdd("EL", { item: el });
  if (rd) novaDailyAdd("R", { item: rd });
}
// window.storage.set（資格の各ページ・Language Hub が使う保存口）を一度だけ包み、書き込み前後の差を数える
function novaDailyHook() {
  try {
    const st = typeof window !== "undefined" ? window.storage : null;
    if (!st || st.__novaDaily || typeof st.set !== "function") return;
    const orig = st.set;
    st.set = function (k, v) {
      try {
        const key = String(k);
        if (NOVA_DAILY_CERT_RE.test(key) || NOVA_DAILY_LH_KEYS[key]) {
          let oldRaw; try { oldRaw = window.localStorage.getItem(key); } catch (e) { oldRaw = undefined; }
          novaDailyOnWrite(key, oldRaw, v);
        }
      } catch (e) {}
      return orig.apply(this, arguments);
    };
    st.__novaDaily = true;
  } catch (e) {}
}
// 全クイズ横断の弱点集計レジストリ（各資格モジュールの state.progress をドメイン名に解決するための対応表。
// DOMAINS は各モジュール定義から機械抽出。値は [日本語名, 英語名]）。
const NOVA_DOM_REG = {"saa_c03_study_v1":{"cert":"SAA-C03","doms":{"D1":["セキュアなアーキテクチャの設計","Design Secure Architectures"],"D2":["弾力性に優れたアーキテクチャの設計","Design Resilient Architectures"],"D3":["高パフォーマンスなアーキテクチャの設計","Design High-Performing Architectures"],"D4":["コストを最適化したアーキテクチャの設計","Design Cost-Optimized Architectures"]}},"cca_f_study_v1":{"cert":"CCA-F","doms":{"D1":["エージェント アーキテクチャとオーケストレーション","Agentic Architecture & Orchestration"],"D2":["ツール設計とMCP統合","Tool Design & MCP Integration"],"D3":["Claude Code 設定とワークフロー","Claude Code Config & Workflows"],"D4":["プロンプト エンジニアリングと構造化出力","Prompt Engineering & Structured Output"],"D5":["コンテキスト管理と信頼性","Context Management & Reliability"]}},"aics_study_v2":{"cert":"AICS","doms":{"D1":["生成AIとAIエージェントの基礎","生成AIとAIエージェントの基礎"],"D2":["業務の基礎","業務の基礎"],"D3":["AIデータリテラシーとマネジメント","AIデータリテラシーとマネジメント"],"D4":["自動化レベルとワークフロー設計","自動化レベルとワークフロー設計"],"D5":["人と組織から考えるAI時代の組織設計","人と組織から考えるAI時代の組織設計"],"D6":["AIエージェントを実装する5Dモデル","AIエージェントを実装する5Dモデル"]}},"pl900_study_v2":{"cert":"PL-900","doms":{"D1":["Power Platform のビジネス価値","Power Platform のビジネス価値"],"D2":["Power Platform 環境の管理 / Dataverse","Power Platform 環境の管理 / Dataverse"],"D3":["Power Apps の機能","Power Apps の機能"],"D4":["Power Automate の機能","Power Automate の機能"],"D5":["Copilot Studio のエージェント","Agents in Copilot Studio"],"PP":["旧範囲（Power Pages など）","Former scope (Power Pages etc.)"]}},"ab620_study_v2":{"cert":"AB-620","doms":{"D1":["エージェント ソリューションの計画と構成","Plan & Configure Agent Solutions"],"D2":["エージェントの統合と拡張","Integrate & Extend Agents"],"D3":["エージェントのテストと管理","Test & Manage Agents"]}},"dp900_study_v1":{"cert":"DP-900","doms":{"D1":["データの中核概念","Core Data Concepts"],"D2":["Azure のリレーショナルデータ","Relational Data on Azure"],"D3":["Azure の非リレーショナルデータ","Non-relational Data on Azure"],"D4":["Azure の分析ワークロード","Analytics Workload on Azure"]}},"sc500_study_v1":{"cert":"SC-500","doms":{"D1":["ID・アクセス・ガバナンスの管理","Manage Identity, Access, and Governance"],"D2":["ストレージ・データベース・ネットワークの保護","Secure Storage, Databases, and Networking"],"D3":["コンピュートの保護（AIセキュリティ含む）","Secure Compute (including AI)"],"D4":["セキュリティ態勢の管理と監視","Manage and Monitor Security Posture"]}},"sc900_study_v1":{"cert":"SC-900","doms":{"D1":["セキュリティ・コンプライアンス・ID の概念","Concepts of Security, Compliance, and Identity"],"D2":["Microsoft Entra の機能","Capabilities of Microsoft Entra"],"D3":["Microsoft セキュリティ ソリューションの機能","Capabilities of Microsoft Security Solutions"],"D4":["Microsoft コンプライアンス ソリューションの機能","Capabilities of Microsoft Compliance Solutions"]}},"gh600_study_v2":{"cert":"GH-600","doms":{"D1":["エージェントアーキテクチャとSDLCの準備","Prepare Agent Architecture & SDLC"],"D2":["ツール使用と環境操作の実装","Implement Tool Use & Environment Interaction"],"D3":["メモリ・状態・実行の管理","Manage Memory, State & Execution"],"D4":["評価・エラー分析・チューニング","Evaluation, Error Analysis & Tuning"],"D5":["マルチエージェント連携のオーケストレーション","Orchestrate Multi-agent Coordination"],"D6":["ガードレールと説明責任の実装","Implement Guardrails & Accountability"]}},"ab100_study_v2":{"cert":"AB-100","doms":{"D1":["AIビジネスソリューションの計画","Plan AI-powered Business Solutions"],"D2":["AIビジネスソリューションの設計","Design AI-powered Business Solutions"],"D3":["AIビジネスソリューションの展開","Deploy AI-powered Business Solutions"]}},"ab410_study_v2":{"cert":"AB-410","doms":{"D1":["インテリジェントアプリの基盤構築","Create a Foundation for Intelligent Applications"],"D2":["インテリジェントアプリの作成","Create Intelligent Applications"],"D3":["ビジネスロジックと自動化の構築","Build Business Logic & Automation"]}},"ai300_study_v2":{"cert":"AI-300","doms":{"D1":["MLOps基盤の設計と実装","Design & Implement an MLOps Infrastructure"],"D2":["機械学習モデルのライフサイクルと運用","ML Model Lifecycle & Operations"],"D3":["GenAIOps基盤の設計と実装","Design & Implement a GenAIOps Infrastructure"],"D4":["生成AIの品質保証と可観測性","GenAI Quality Assurance & Observability"],"D5":["生成AIシステムとモデル性能の最適化","Optimize GenAI Systems & Model Performance"]}},"ai103_study_v1":{"cert":"AI-103","doms":{"D1":["Azure AI ソリューションの計画と管理","Plan & manage an Azure AI solution"],"D2":["生成AI・エージェントソリューションの実装","Implement generative AI & agentic solutions"],"D3":["コンピュータービジョンソリューションの実装","Implement computer vision solutions"],"D4":["テキスト分析ソリューションの実装","Implement text analysis solutions"],"D5":["情報抽出ソリューションの実装","Implement information extraction solutions"]}},"ai200_study_v1":{"cert":"AI-200","doms":{"D1":["コンテナー化ソリューションの開発","Develop containerized solutions on Azure"],"D2":["Azureデータ管理サービスでのAI開発","AI solutions with Azure data management services"],"D3":["Azureサービスへの接続と利用","Connect to & consume Azure services"],"D4":["セキュリティ・監視・トラブルシュート","Secure, monitor, troubleshoot"]}},"gh900_study_v1":{"cert":"GH-900","doms":{"D1":["Git と GitHub の基礎","Understand Git & GitHub basics"],"D2":["GitHubリポジトリの操作","Work with GitHub repositories"],"D3":["GitHubでのコラボレーション","Collaborate using GitHub"],"D4":["モダン開発プラクティス","Apply modern development practices"],"D5":["GitHubでのプロジェクト管理","Manage projects with GitHub"],"D6":["プライバシー・セキュリティ・管理","Privacy, security & administration"],"D7":["GitHubコミュニティ","Explore the GitHub community"]}},"gh300_study_v1":{"cert":"GH-300","doms":{"D1":["Copilot を責任を持って使う","Use GitHub Copilot responsibly"],"D2":["GitHub Copilot の機能を使う","Use GitHub Copilot features"],"D3":["Copilot のデータとアーキテクチャ","Copilot data & architecture"],"D4":["プロンプトエンジニアリング","Prompt engineering & context"],"D5":["開発生産性の向上","Improve developer productivity"],"D6":["プライバシー・除外・セーフガード","Privacy, exclusions & safeguards"]}},"adp_study_v3":{"cert":"ADP","doms":{"D1":["データの準備と取り込み","Data Preparation & Ingestion"],"D2":["データ分析とプレゼンテーション","Data Analysis & Presentation"],"D3":["データ パイプラインのオーケストレーション","Data Pipeline Orchestration"],"D4":["データ マネジメント","Data Management"]}},"agwa_study_v1":{"cert":"AGWA","doms":{"D1":["ユーザー アカウント、ドメイン、ディレクトリの管理","Users, domains & directory"],"D2":["Workspace コアサービスの管理","Core services"],"D3":["データ ガバナンスとコンプライアンスの管理","Data governance & compliance"],"D4":["セキュリティ ポリシーとアクセス制御の管理","Security policies & access control"],"D5":["エンドポイントの管理","Endpoints"],"D6":["一般的な問題のトラブルシューティング","Troubleshooting"]}}};
// 全クイズ横断「弱点フォーカス」。各資格モジュールが端末に保存した正答実績(state.progress: ドメイン別 correct/attempts)と
// AIアーキ確認クイズ(acad_quiz_score_v1: トピック別)を集約し、正答率が低い分野トップ3を提示する。
function WeaknessFocus({ lang, onResume }) {
  const en = lang === "en";
  const [rows, setRows] = useState(null);
  useEffect(() => {
    const MIN = 4; // ノイズ回避: 4問以上回答した分野のみ対象
    const out = [];
    try {
      const ls = window.localStorage;
      Object.keys(NOVA_DOM_REG).forEach((store) => {
        let raw = null; try { raw = ls.getItem(store); } catch (e) {}
        if (!raw) return;
        let st = null; try { st = JSON.parse(raw); } catch (e) { return; }
        const prog = st && st.progress; if (!prog || typeof prog !== "object") return;
        const meta = NOVA_DOM_REG[store];
        Object.keys(prog).forEach((did) => {
          const p = prog[did]; if (!p) return;
          const att = p.attempts || 0, cor = p.correct || 0;
          if (att < MIN) return;
          const dm = meta.doms[did];
          const dom = dm ? (en ? dm[1] : dm[0]) : did;
          out.push({ hub: "certification", cert: meta.cert, dom, att, cor, rate: Math.round((cor / att) * 100) });
        });
      });
      try {
        const raw = ls.getItem("acad_quiz_score_v1");
        if (raw && typeof ACAD_QUIZ !== "undefined" && ACAD_QUIZ.length) {
          const m = JSON.parse(raw); const agg = {};
          Object.keys(m).forEach((k) => {
            const q = ACAD_QUIZ[+k]; if (!q || !q.topic) return;
            const a = (agg[q.topic] = agg[q.topic] || { att: 0, cor: 0 });
            a.att++; if (m[k]) a.cor++;
          });
          Object.keys(agg).forEach((tp) => {
            const a = agg[tp]; if (a.att < MIN) return;
            out.push({ hub: "megatech", cert: en ? "AI Architect" : "AIアーキ道場", dom: tp, att: a.att, cor: a.cor, rate: Math.round((a.cor / a.att) * 100) });
          });
        }
      } catch (e) {}
    } catch (e) {}
    out.sort((a, b) => (a.rate - b.rate) || (b.att - a.att));
    setRows(out);
  }, []);
  if (!rows || rows.length === 0) return null;
  const weak = rows.filter((r) => r.rate < 80).slice(0, 3);
  if (weak.length === 0) {
    return (
      <div style={{ margin: "22px 0 4px" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: NOVA.faint }}>WEAKNESS FOCUS</div>
        <NovaRule margin="0 0 10px" />
        <div style={{ fontSize: 12.5, color: NOVA.sub }}>{en ? "All measured areas are at 80%+ 🎉" : "計測した全分野が正答率80%以上です 🎉"}</div>
      </div>
    );
  }
  return (
    <div style={{ margin: "22px 0 4px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: NOVA.faint }}>WEAKNESS FOCUS</div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10.5, color: NOVA.faint }}>{en ? "lowest accuracy first" : "正答率が低い順"}</span>
      </div>
      <NovaRule margin="0 0 10px" />
      <div style={{ fontSize: 12, color: NOVA.sub, marginBottom: 8, lineHeight: 1.7 }}>
        {en ? ("Your " + weak.length + " weakest area" + (weak.length !== 1 ? "s" : "") + " to review next") : ("次に復習すべき弱点分野 " + weak.length + " 件")}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {weak.map((r, i) => {
          const col = r.rate < 50 ? "#C0392B" : r.rate < 65 ? "#D68910" : "#B7950B";
          return (
            <div key={i} style={{ border: "1px solid " + NOVA.line, borderRadius: 10, padding: "10px 13px", background: NOVA.panelSoft }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: NOVA.accent, flexShrink: 0 }}>{r.cert}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: NOVA.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.dom}</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: col, flexShrink: 0 }}>{r.rate}%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 7, background: "#e5e9f0", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ width: r.rate + "%", height: "100%", background: col }} />
                </div>
                <span style={{ fontSize: 10.5, color: NOVA.faint, flexShrink: 0 }}>{r.cor}/{r.att}{en ? "" : "問"}</span>
                <button onClick={() => onResume && onResume(r.hub)} style={{ background: "transparent", border: "none", color: NOVA.accent, fontWeight: 700, fontSize: 11, cursor: "pointer", padding: 0, flexShrink: 0 }}>{en ? "Review →" : "復習 →"}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// STUDY LOG のグラフ化。全クイズ横断の総合正答率(ドーナツ)、KPIタイル、資格別 習得度バー、
// 直近8週の学習アクティビティ・ヒートマップを表示する。データはWeaknessFocus/ProgressSummaryと同じ端末保存値。
function StudyStats({ lang, embedded }) {
  const en = lang === "en";
  const [d, setD] = useState(null);
  const [open, setOpen] = useState(false); // 既定は閉じた状態（embedded 時は親トグルが制御）
  useEffect(() => {
    const today = novaLocalDay();
    let totalAtt = 0, totalCor = 0, maxStreak = 0, doneTotal = 0, mastered = 0, measured = 0;
    const perCert = {}, activity = {};
    try {
      const ls = window.localStorage;
      try { const a = JSON.parse(ls.getItem("nova_activity_v1")) || {}; Object.keys(a).forEach((k) => { activity[k] = (activity[k] || 0) + (a[k] || 0); }); } catch (e) {}
      Object.keys(NOVA_DOM_REG).forEach((store) => {
        let st = null; try { st = JSON.parse(ls.getItem(store)); } catch (e) { return; }
        if (!st) return;
        const prog = st.progress || {};
        let ca = 0, cc = 0;
        Object.keys(prog).forEach((did) => {
          const p = prog[did] || {}; const att = p.attempts || 0, cor = p.correct || 0;
          ca += att; cc += cor;
          if (att >= 4) { measured++; if (cor / att >= 0.8) mastered++; }
        });
        if (ca > 0) { totalAtt += ca; totalCor += cc; perCert[store] = { cert: NOVA_DOM_REG[store].cert, att: ca, cor: cc }; }
        const meta = st.meta || {};
        if ((meta.streak || 0) > maxStreak) maxStreak = meta.streak || 0;
        if (meta.lastDay) activity[meta.lastDay] = Math.max(activity[meta.lastDay] || 0, 1);
      });
      try {
        const m = JSON.parse(ls.getItem("acad_quiz_score_v1")) || {};
        const vals = Object.values(m);
        if (vals.length) { const cor = vals.filter(Boolean).length; totalAtt += vals.length; totalCor += cor; perCert.__acad = { cert: en ? "AI Architect" : "AIアーキ", att: vals.length, cor }; }
      } catch (e) {}
      for (let i = 0; i < ls.length; i++) {
        const k = ls.key(i); if (!k) continue;
        if (k === "acad_quiz_score_v1" || k === "nova_activity_v1" || k === "nova_last_hub_v1") continue;
        const meta = parseDoneKey(k); if (!meta) continue;
        try { const v = JSON.parse(ls.getItem(k)); const labels = Array.isArray(v) ? v : (v && typeof v === "object" ? Object.keys(v).filter((x) => v[x]) : []); doneTotal += labels.length; } catch (e) {}
      }
    } catch (e) {}
    setD({ totalAtt, totalCor, maxStreak, doneTotal, mastered, measured, perCert, activity });
  }, []);
  if (!d) return null;
  if (d.totalAtt === 0 && d.doneTotal === 0) return null;
  const rate = d.totalAtt ? Math.round((d.totalCor / d.totalAtt) * 100) : 0;
  const ring = rate < 50 ? "#C0392B" : rate < 70 ? "#B7950B" : rate < 85 ? "#1F6FB0" : "#158F6B";
  const R = 34, CIRC = 2 * Math.PI * R;
  const certs = Object.values(d.perCert).filter((c) => c.att >= 4).map((c) => ({ ...c, rate: Math.round((c.cor / c.att) * 100) })).sort((a, b) => b.rate - a.rate).slice(0, 8);
  // 直近8週(56日)のヒートマップ。列=週、行=曜日。
  const DAYS = 56;
  const now = new Date();
  const cells = [];
  let maxc = 1;
  for (let i = DAYS - 1; i >= 0; i--) { const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i); const key = novaLocalDay(dt); const c = d.activity[key] || 0; if (c > maxc) maxc = c; cells.push({ key, c, dow: dt.getDay() }); }
  const heatCol = (c) => { if (!c) return "#EAEFF6"; const q = c / maxc; return q > 0.66 ? "#0A2E52" : q > 0.33 ? "#1F6FB0" : "#8FC0E6"; };
  // 週列に分割（先頭を日曜起点に揃える）
  const weeks = []; let cur = [];
  const pad = cells.length ? cells[0].dow : 0;
  for (let k = 0; k < pad; k++) cur.push(null);
  cells.forEach((cell) => { cur.push(cell); if (cur.length === 7) { weeks.push(cur); cur = []; } });
  if (cur.length) { while (cur.length < 7) cur.push(null); weeks.push(cur); }
  const Tile = ({ v, label, accent }) => (
    <div style={{ flex: 1, minWidth: 66, background: NOVA.panelSoft, border: `1px solid ${NOVA.line}`, borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
      <div style={{ fontSize: 19, fontWeight: 800, color: accent || NOVA.ink, lineHeight: 1.1 }}>{v}</div>
      <div style={{ fontSize: 9.5, color: NOVA.sub, marginTop: 3, letterSpacing: 0.3 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ margin: embedded ? "6px 0 4px" : "22px 0 4px" }}>
      {!embedded ? (<>
      <div onClick={() => setOpen((v) => !v)} style={{ display: "flex", alignItems: "baseline", gap: 8, cursor: "pointer" }}>
        <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        <span style={{ fontSize: 11, letterSpacing: 2, color: NOVA.faint }}>STUDY LOG</span>
        <span style={{ flex: 1 }} />
        {!open ? <span style={{ fontSize: 11, color: NOVA.sub }}>{en ? "accuracy" : "総合正答率"} <b style={{ color: ring }}>{rate}%</b> <span style={{ color: NOVA.faint }}>・ {d.totalAtt}{en ? " answered" : "問"}</span></span> : null}
      </div>
      <NovaRule margin="0 0 12px" />
      </>) : null}
      {(embedded || open) ? (<>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: 92, height: 92, flexShrink: 0 }}>
          <svg width="92" height="92" viewBox="0 0 92 92">
            <circle cx="46" cy="46" r={R} fill="none" stroke="#EAEFF6" strokeWidth="9" />
            <circle cx="46" cy="46" r={R} fill="none" stroke={ring} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={`${(rate / 100) * CIRC} ${CIRC}`} transform="rotate(-90 46 46)" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 21, fontWeight: 800, color: ring, lineHeight: 1 }}>{rate}%</div>
            <div style={{ fontSize: 8.5, color: NOVA.sub, marginTop: 2 }}>{en ? "accuracy" : "総合正答率"}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flex: 1, minWidth: 200, flexWrap: "wrap" }}>
          <Tile v={d.totalAtt} label={en ? "answered" : "回答数"} />
          <Tile v={d.mastered} label={en ? "mastered" : "習得分野"} accent={d.mastered ? "#158F6B" : NOVA.ink} />
          <Tile v={(d.maxStreak || 0) + (en ? "d" : "日")} label={en ? "streak" : "連続学習"} accent={d.maxStreak ? "#D35400" : NOVA.ink} />
          <Tile v={d.doneTotal} label={en ? "completed" : "完了項目"} />
        </div>
      </div>
      {certs.length ? (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: NOVA.sub, marginBottom: 6 }}>{en ? "Mastery by certification" : "資格別 習得度"}</div>
          <div style={{ display: "grid", gap: 5 }}>
            {certs.map((c, i) => { const col = c.rate >= 80 ? "#158F6B" : c.rate >= 60 ? "#B7950B" : "#C0392B"; return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10.5, color: NOVA.ink, fontWeight: 700, width: 66, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.cert}</span>
                <div style={{ flex: 1, height: 8, background: "#EAEFF6", borderRadius: 5, overflow: "hidden" }}><div style={{ width: `${c.rate}%`, height: "100%", background: col }} /></div>
                <span style={{ fontSize: 10, color: NOVA.faint, width: 62, textAlign: "right", flexShrink: 0 }}>{c.rate}% <span style={{ color: "#C7CFDC" }}>({c.att})</span></span>
              </div>
            ); })}
          </div>
        </div>
      ) : null}
      <div style={{ marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: NOVA.sub }}>{en ? "Activity — last 8 weeks" : "学習アクティビティ（直近8週）"}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9, color: NOVA.faint }}>
            {en ? "less" : "少"}
            {["#EAEFF6", "#8FC0E6", "#1F6FB0", "#0A2E52"].map((c, i) => <span key={i} style={{ width: 9, height: 9, borderRadius: 2, background: c, display: "inline-block" }} />)}
            {en ? "more" : "多"}
          </span>
        </div>
        <div style={{ display: "flex", gap: 3, overflowX: "auto" }}>
          {weeks.map((wk, wi) => (
            <div key={wi} style={{ display: "grid", gap: 3 }}>
              {wk.map((cell, di) => (
                <div key={di} title={cell ? `${cell.key}: ${cell.c}` : ""} style={{ width: 11, height: 11, borderRadius: 2, background: cell ? heatCol(cell.c) : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      </>) : null}
    </div>
  );
}

// ブートキャンプ・ガントトラッカー（週数は BOOTCAMP_MONTHS から。Financeハブ除外版）。STUDY LOG の下に表示。
// 2ハブ(MegaTech/Consulting)を実在セクションの週割りで完走、11資格は所有教材を明示して取得。
// 各資格に「関連する所有講座・書籍の実タイトル」を表示。保存: window.storage nova_bootcamp_v2 / 旧v1移行。
const BOOTCAMP_CERTS = ["CLF-C02", "DP-900", "SC-900", "GH-900", "GH-300", "SAA-C03", "AB-620", "GH-600", "SC-500", "ADP", "CCA-F", "ISO42001F", "AIGP", "CCSK"];
const BOOTCAMP_MONTHS = [
  { m: 1, s: 1, e: 4, title: ["M1 基礎固め", "M1 Foundations"],
    goal: ["クラウド/データ/セキュリティ/開発の共通言語を固める。所有教材の消化が中心で軽い立ち上がり。", "Lock in shared vocabulary; mostly finishing owned materials."],
    certs: "CLF-C02 · DP-900 · SC-900 · GH-900 · GH-300",
    hubFocus: ["TechHub は別の暦でタブの順に。Consulting 用語辞典とロジカル〜DXの6ドメイン。", "TechHub on its own calendar in tab order; Consulting glossary + 6 domains (Logical to DX)."],
    exit: ["Fundamentals系5資格を取得。", "5 fundamentals."],
    load: ["週22h（平日2.5h＋休日5h）", "22h/wk"] },
  { m: 2, s: 5, e: 8, title: ["M2 応用・エージェント", "M2 Associate & agents"],
    goal: ["SAAで設計力、AB-620/GH-600でエージェント力。Consultingを本格化。", "Design via SAA; agents via AB-620/GH-600; ramp Consulting."],
    certs: "SAA-C03（2週）· AB-620 · GH-600",
    hubFocus: ["TechHub は別の暦でタブの順に。Consulting AI・論点思考・仮説思考と紛らわしい・ケース。", "TechHub on its own calendar in tab order; Consulting AI, issue & hypothesis thinking, confusables & cases."],
    exit: ["SAA＋エージェント2資格。Consulting 9ドメインを1巡。", "SAA + 2 agent certs; Consulting all 9 domains once."],
    load: ["週24h（SAAが重い）", "24h/wk"] },
  { m: 3, s: 9, e: 12, title: ["M3 運用・データ・Claude", "M3 Ops, data & Claude"],
    goal: ["運用(SC-500)・データ(ADP)・Claude(CCA-F)を締める。ライブラリの講座が豊富で軽快に。", "Close ops/data/Claude — well covered by owned courses."],
    certs: "SC-500 · ADP · CCA-F · ISO42001F · AIGP · CCSK",
    hubFocus: ["TechHub は別の暦でタブの順に。Consulting 誤答の復習。", "TechHub on its own calendar in tab order; Consulting review of misses."],
    exit: ["14資格すべて取得。Consulting 復習1巡。", "All 14 certs; Consulting review done once."],
    load: ["週22h（予備週で調整）", "22h/wk"] },
  { m: 4, s: 13, e: 16, title: ["M4 完走・総仕上げ", "M4 Finish & capstone"],
    goal: ["Consultingを完走し、学びを提案・ロジックに統合。弱点総ざらいで仕上げる。", "Finish Consulting; integrate the learning into proposals and logic; sweep weak spots."],
    certs: "（取りこぼし再受験のみ）",
    hubFocus: ["TechHub は別の暦でタブの順に。Consulting 総復習と提案への統合。", "TechHub on its own calendar in tab order; Consulting full review and integration."],
    exit: ["Consulting 完走＋総仕上げ（弱点総ざらい・提案統合）。", "Consulting done + capstone."],
    load: ["週20h（仕上げ）", "20h/wk"] },
  { m: 5, s: 17, e: 19, title: ["M5 バッファ", "M5 Buffer"],
    goal: ["資格と Consulting の残りを片付ける予備の期間。TechHub は別の暦で続ける。", "Buffer to clear what is left of the certs and Consulting; TechHub continues on its own calendar."],
    certs: "残タスクのバッファ",
    hubFocus: ["TechHub は別の暦でタブの順に。", "TechHub on its own calendar in tab order."],
    exit: ["資格と Consulting の残タスクを完了。", "Certs and Consulting leftovers done."],
    load: ["週10h目安（余力は復習へ）", "~10h/wk"] },
];
// 計画の週数。目盛りと「現在 W○」の範囲はここから取る（週数は画面に書かない）。
const BOOTCAMP_WEEKS = Math.max(...BOOTCAMP_MONTHS.map((m) => m.e));
const BOOTCAMP_DAILY = {
  summary: [`平日2.5h × 5日 ＋ 休日5h × 2日 ＝ 週22.5h ／ 計画全体で約${Math.round(22.5 * BOOTCAMP_WEEKS / 10) * 10}h（Finance除外）`, `2.5h×5 + 5h×2 = 22.5h/wk · whole plan ≈ ${Math.round(22.5 * BOOTCAMP_WEEKS / 10) * 10}h`],
  weekday: { h: ["平日 2.5時間", "Weekday · 2.5h"], rows: [["資格学習", "75分", "当該週の資格：講座・問題演習・ハンズオン"], ["TechHub 道場", "45分", "弱点ドメイン優先で ~25問"], ["Consulting", "30分", "~20問"]] },
  weekend: { h: ["休日 5時間", "Weekend · 5h"], rows: [["資格（模試・ハンズオン）", "2.5時間", "模試を高速回転・弱点補強"], ["Consulting", "90分", "60問前後をまとめて"], ["TechHub 復習・弱点直し", "60分", "間違い回収＋要点整理"]] },
};
const BOOTCAMP_MILE = [
  { k: "udemy", label: ["Udemy 講座 完了", "Udemy course done"] },
  { k: "book", label: ["Kindle 書籍 読了", "Kindle book read"] },
  { k: "mock", label: ["模試 80%＋", "Mock 80%+"] },
  { k: "booked", label: ["受験予約", "Exam booked"] },
  { k: "passed", label: ["合格", "Passed"] },
];
const BOOTCAMP_MILE_CAP = [
  { k: "sweep", label: ["全資格の弱点総ざらい", "Weak-domain sweep"] },
  { k: "integrate", label: ["Consultingで統合（提案の型）", "Integrate via Consulting"] },
  { k: "mock", label: ["総合模試", "Full mock exam"] },
  { k: "review", label: ["2ハブ総復習", "Both-hub review"] },
];
// 2ハブ 並行トラック（Finance除外）。
const BOOTCAMP_HUBS = [
  { id: "HUB-MEGATECH", isHub: true, hub: "megatech", s: 1, e: 19, label: ["TechHub", "TechHub"], sub: ["クイズ＋実務コンテンツ＋用語辞典（辞書）。問題数は Mastery Track の行が各バンクから数える", "quiz banks + practice + glossary; counts come from the banks via the Mastery Track rows"],
    note: ["TechHub のタブの並び（基礎 → AX実務 → 道場・リサーチ → AIフォーサイト → PLAYBOOK）で進める。クイズは理解度チェック・各道場のバンク・技術道場の14テーマなど、実務はタブごとの読み物。", "Work in TechHub\u2019s tab order (Core \u2192 AX practice \u2192 Dojo & research \u2192 AI foresight \u2192 Playbook): quizzes are the comprehension checks, dojo banks and the 14 technical themes; practice is each tab\u2019s reading."],
    pace: ["クイズ＋実務コンテンツ（用語辞典は辞書として別枠）。問題数・項目数は Mastery Track の各行が各バンクから数え、日付は資格・Consulting の計画とは別の暦で1日のペースから割り当てる。", "Quizzes + practice content (the glossary stays a reference). Counts come from the banks via the Mastery Track rows; dates come from a daily pace on a calendar separate from the certs and Consulting plan."],
    mile: [{ k: "c1", label: ["基礎", "Core"] }, { k: "c2", label: ["AX実務", "AX practice"] }, { k: "c3", label: ["道場・リサーチ", "Dojo & research"] }, { k: "c4", label: ["AIフォーサイト・PLAYBOOK", "AI foresight & Playbook"] }],
    plan: [["基礎", "戦略・論点・全体像・暗黙知の形式知化・定量データ＋理解度チェック 基礎", "Strategy, issues, service map, tacit knowledge, factbook + core comprehension checks"], ["AX実務", "価値ドライバー〜エージェント棚・AGI・ASI（Slalom変革道場のスキルクイズを含む）＋理解度チェック AX実務", "Value drivers through the agent shelf and AGI/ASI (incl. the Slalom skill quiz) + AX comprehension checks"], ["道場・リサーチ", "技術道場（14テーマ・Key Numbers・開発・クラウド・アーキテクチャ演習・SA面接ほか）・AIアーキテクト道場・先端メニュー・セキュリティ・ガバナンス道場・ITセキュリティ基盤・失敗学・AI出力品質・企業研究・実務論点マップ", "Technical dojo (14 themes, Key Numbers, dev, cloud, architecture drills, SA interview, others), architect academy, frontier menu, security & governance dojo, IT security, postmortems, AI output quality, companies, issue map"], ["AIフォーサイト・PLAYBOOK", "AIフォーサイトの7タブ＋PLAYBOOK 8本", "AI foresight (7 tabs) + 8 playbooks"]],
    udemy: ["○未: Amazon Bedrock 生成AIウェブアプリ構築（RAG編/エージェント編）", "○未: Google Cloud Vertex AI ML/MLOps入門"], books: ["○未: LangChain/LangGraphによるRAG・AIエージェント実践入門", "○未: 世界一やさしいRAG構築入門（Azure OpenAI）", "○未: AIエージェントの教科書"] },
  { id: "HUB-CONSULTING", isHub: true, hub: "consulting", s: 1, e: 7, label: ["Consulting Hub", "Consulting Hub"], sub: ["9ドメイン＋用語・ケース", "9 domains + glossary & cases"],
    note: ["9つの思考ドメイン（論点思考・仮説思考を含む）。資格と別ドメイン＝実質の追加負荷。毎日20問ずつ積む。", "9 thinking domains incl. issue and hypothesis thinking — the real added load; ~20 Q/day."],
    pace: ["約2,440問（応用2,233＋基礎暗記の辞典167・紛らわしい/ケース40）。資格と別ドメインの追加負荷。", "~2,440 Q (2,233 applied + 167 glossary + 40 confusables/cases); ~20 Q/day."],
    mile: [{ k: "c1", label: ["M1: 基礎暗記＋ロジカル/批判/水平（W1–2）", "M1: Glossary + Logical/Critical/Lateral"] }, { k: "c2", label: ["M2: 創造/構造化/DX（W3–4）", "M2: Creative/Structuring/DX"] }, { k: "c3", label: ["M3: AI＋紛らわしい・ケース（W4–5）", "M3: AI + confusables/cases"] }, { k: "c4", label: ["M4: 論点思考/仮説思考（W5–7）", "M4: Issue/Hypothesis thinking"] }],
    plan: [["W1–2", "基礎暗記の辞典（167語）＋ロジカル / クリティカル / ラテラル（711問）", "Glossary (167) + Logical / Critical / Lateral (711 Q)"], ["W3–4", "クリエイティブ / 構造化 / DX（711問）", "Creative / Structuring / DX (711 Q)"], ["W4–5", "AI（337問）＋紛らわしい・ケース（40）", "AI (337 Q) + confusables/cases (40)"], ["W5–7", "論点思考 / 仮説思考（474問）。以降は誤答の復習", "Issue / Hypothesis thinking (474 Q), then review mistakes"]],
    udemy: ["ハブ内の2,233問で完結（外部講座は任意）"], books: ["○未: ロジカルシンキング / シン・ロジカルシンキング", "○未: 考える技術・書く技術（＋スライド編）", "○未: 仮説思考（内田和成）"] },
];
// 資格の学習タスク（MegaTech/コンサルの分野チェックリストと粒度を揃える）。
// クイズ・模試5セット・図解・用語集・合格を1つずつチェックして進捗を記録する。
const CERT_CATS = [
  { n: ["クイズ セット1", "Quiz set 1"] }, { n: ["クイズ セット2", "Quiz set 2"] },
  { n: ["クイズ セット3", "Quiz set 3"] }, { n: ["クイズ セット4", "Quiz set 4"] },
  { n: ["クイズ セット5", "Quiz set 5"] },
  { n: ["模試 セット1", "Mock set 1"] }, { n: ["模試 セット2", "Mock set 2"] },
  { n: ["模試 セット3", "Mock set 3"] }, { n: ["模試 セット4", "Mock set 4"] },
  { n: ["模試 セット5", "Mock set 5"] },
  { n: ["図解", "Diagrams"] }, { n: ["用語集", "Glossary"] },
  { n: ["合格", "Passed"] },
];
// クイズが5セット構成なのはCLFのみ。他資格はクイズが単一バンクなので、
// 「クイズ」1項目版のチェックリストを使い、実態と粒度を合わせる。
const CERT_MULTIQUIZ = { "CLF-C02": true };
// 模試のセット数も資格ごとに違う。Certification Hub の各資格の「模擬試験」に並ぶセットの数（2026-11 に画面で数えた）。
// 書いていない資格は5セット。Hub 側でセットを足したらここも直し、記録の移し替え（MQ_LAYOUT_MOVES）を足す。
const CERT_MOCK_SETS = { "SC-900": 2, "GH-600": 2, "SC-500": 2, "CCA-F": 4 };
const __certCats = {};
const certCatsFor = (cert) => __certCats[cert] || (__certCats[cert] =
  (CERT_MULTIQUIZ[cert] ? CERT_CATS.slice(0, 5) : [{ n: ["クイズ", "Quiz"] }]).concat(CERT_CATS.slice(5, 5 + (CERT_MOCK_SETS[cert] || 5)), CERT_CATS.slice(10)));
// 資格タスク。udemy/books = 関連する所有教材の実タイトル（✓完了・所有・△隣接・★ギャップ）。
const BOOTCAMP_TASKS = [
  { id: "CLF-C02", cert: "CLF-C02", hub: "megatech", s: 1, e: 1, theme: ["AWSクラウドの全体像", "AWS cloud big picture"],
    focus: ["ライブラリの用語講座（未着手）で仕上げ、受験。", "Finish with the library's course, then exam."],
    udemy: ["○未: サクッと覚える！AWS Certified Cloud Practitioner用語「聞き流し講座」"], books: ["関連書籍なし（AWS Bedrock系は隣接）"] },
  { id: "DP-900", cert: "DP-900", hub: "megatech", s: 2, e: 2, theme: ["Azureデータの基礎", "Azure data fundamentals"],
    focus: ["所有のDP-900対策×2で仕上げ。", "Finish with the two owned DP-900 courses."],
    udemy: ["○未: DP-900 Azure Data Fundamentals オリジナル試験問題"], books: ["関連書籍なし"] },
  { id: "SC-900", cert: "SC-900", hub: "megatech", s: 3, e: 3, theme: ["セキュリティ・コンプラ・ID基礎", "Security, compliance & identity"],
    focus: ["専用講座はライブラリになし＝要追加。SC-500と道場の土台。", "No dedicated course in the library — add one."],
    udemy: ["★該当講座なし → 追加が必要（一般セキュリティ講座は所有）"], books: ["○未: 先読み！サイバーセキュリティ（隣接）"] },
  { id: "GH-900", cert: "GH-900", hub: "megatech", s: 4, e: 4, theme: ["GitHub基礎", "GitHub foundations"],
    focus: ["所有講座なし＝ギャップ。追加した対策＋公式Learnで。", "Gap — use the added course + official Learn."],
    udemy: ["★該当講座なし → 追加が必要"], books: ["—"] },
  { id: "GH-300", cert: "GH-300", hub: "megatech", s: 4, e: 4, theme: ["GitHub Copilot", "GitHub Copilot"],
    focus: ["隣接所有あり。試験特化を補完。", "Adjacent owned; add exam-specific."],
    udemy: ["○未: はじめてのGitHub Copilot使い方入門", "○未: Visual Studio Code活用ガイドパック + GitHub Copilot", "○未: Agent Skillsを徹底解説！ AIエージェントに知識と手順を与えて、思い通りに動かそう！"], books: ["—"] },
  { id: "SAA-C03", cert: "SAA-C03", hub: "megatech", s: 5, e: 6, theme: ["AWSソリューションアーキテクト", "AWS Solutions Architect"],
    focus: ["最重量。ライブラリの問題集＋追加の体系講座で設計を固め、模試を高速回転。", "Heaviest. Owned problem set + added video course; cycle mocks."],
    udemy: ["○未: AWS SAA-C03完全攻略問題集｜詳細図解付きデータ分析範囲対応版"], books: ["Ben Piper『SAA-C03 Study Guide』Sybex（任意・未所有）"] },
  { id: "AB-620", cert: "AB-620", hub: "megatech", s: 7, e: 7, theme: ["Microsoftエージェント設計", "Microsoft agent solutions"],
    focus: ["ライブラリの講座が豊富（Copilot Studio速習は完了）。計画・統合・拡張・テストを実装。", "Well covered by owned courses."],
    udemy: ["○未: AIをただのチャットで終わらせない。実践的AIエージェント作成と業務自動化の極意", "○未: Copilot Studio 実践 - 問い合わせ対応〜メール作成までを自動化！", "○未: Microsoft Copilot Studio 超入門！", "○未: 作って学ぶ Copilot Studio！実践的なAIエージェントを作成し業務を任せよう", "○未: Microsoft Foundry Agent Service完全マスター講座", "○未: Microsoft Power Apps 基礎マスターコース", "○未: Power Platform 超入門講座 (Automate, BI, Apps, Pages すべてま", "○未: 作って学ぶPower Automate for desktop！実践的なフローを30個以上作成して業務改", "✓完了: Copilot Studio速習講座 -Copilot Studio Fullでつくるワークフロー型AI"], books: ["○未: はじめてのMicrosoft Copilot Studio入門 ～ローコードではじめる業務AIエージェン"] },
  { id: "GH-600", cert: "GH-600", hub: "consulting", s: 8, e: 8, theme: ["GitHubエージェント＋コンサルの型", "GitHub agents ＋ consulting frames"],
    focus: ["GitHub特化はギャップ→追加。実装はライブラリのClaude agent系で補完。Consultingの型を並行。", "GitHub-specific gap; reinforce with owned Claude-agent courses."],
    udemy: ["★該当講座なし → 追加が必要（Claude agent系が隣接）"], books: ["—"] },
  { id: "SC-500", cert: "SC-500", hub: "megatech", s: 9, e: 9, theme: ["セキュリティ運用・態勢管理", "Security operations & posture"],
    focus: ["明確なギャップ→追加。SC-900を運用へ。ID/データ/NW/AIセキュリティ/監視。", "Clear gap; turn SC-900 into operations."],
    udemy: ["★該当講座なし → 追加が必要（公式パス＋Sentinel/Defender）"], books: ["—"] },
  { id: "ADP", cert: "ADP", hub: "megatech", s: 10, e: 10, theme: ["データ準備・分析・パイプライン", "Data prep, analysis & pipelines"],
    focus: ["専用講座はライブラリになし＝要追加。BigQuery/Looker/Dataflow。", "No dedicated course in the library — add one."],
    udemy: ["★該当講座なし → 追加が必要（GCP ADP 模擬試験の追加を推奨）"], books: ["—"] },
  { id: "CCA-F", cert: "CCA-F", hub: "megatech", s: 11, e: 11, theme: ["Claude Code / エージェント実装", "Claude Code / agent build"],
    focus: ["ライブラリの講座が非常に豊富。ツール/MCP・プロンプト・コンテキスト管理を実装で。", "Very well covered by owned courses."],
    udemy: ["○未: Claude Skills × AIエージェント開発実戦コース", "✓完了: Claude Code ハンズオン入門", "○未: AIマルチエージェント入門 -Claude Codeで学ぶ「AI専門家チーム」の作り方-", "○未: Claude CodeによるAI駆動開発入門", "○未: Claude CodeでAIエージェントを用いたデータ加工集計分析とダッシュボード開発を体験！", "○未: 実用的なWebアプリケーション開発を通して学ぶClaude Code入門徹底講座", "○未: Claude Codeで始めるAIプログラミング入門：HTMLやPythonアプリをVibe Codin", "○未: Claude Cowork速習マスター｜ファイル編集・ブラウザ操作・定期実行まで、AIにあなたの仕事を自", "○未: 非エンジニアのための Claude Cowork 実践入門", "○未: 12の実演で学ぶAI業務自動化"], books: ["○未: Claude Codeハーネス設計入門 自律開発を実現する3つのサブエージェント", "○未: やさしいMCP入門"] },
  { id: "ISO42001F", cert: "ISO 42001 F", hub: "megatech", s: 9, e: 10, theme: ["ISO/IEC 42001 Foundation", "ISO/IEC 42001 Foundation"],
    focus: ["AIマネジメントシステム(AIMS)の基礎。セキュリティ・ガバナンス道場(1187問)＋SC-900の知識が土台。個人・前提資格なし。", "AIMS foundation; study via the Sec/Gov dojo + SC-900."],
    udemy: ["★該当講座なし → 公式(PECB)＋道場で対策"], books: ["○未: ＡＩガバナンス入門 / 責任あるAIとルール（ライブラリ）"] },
  { id: "CCSK", cert: "CCSK v5", hub: "megatech", s: 10, e: 11, theme: ["Cloud Security Knowledge (CSA)", "Cloud Security Knowledge (CSA)"],
    focus: ["クラウドセキュリティの体系(CSA・Associate級)。SC-900/SC-500＋道場が土台。個人・前提資格なし。", "Cloud security body of knowledge (CSA, Associate); builds on SC-900/SC-500 + dojo."],
    udemy: ["★該当講座なし → CSA公式ガイダンス＋道場で対策"], books: ["○未: 先読み！サイバーセキュリティ（ライブラリ）"] },
  { id: "AIGP", cert: "AIGP", hub: "consulting", s: 11, e: 12, theme: ["AI Governance Professional (IAPP)", "AI Governance Professional (IAPP)"],
    focus: ["AIガバナンス実務(Professional・最難関なので最後)。EU AI Act・NIST AI RMF・ISO42001。道場(1187問)＋ガバナンス書籍で対策。個人・前提資格なし。", "AI governance (Professional — hardest, placed last); EU AI Act, NIST RMF, ISO 42001."],
    udemy: ["★該当講座なし → IAPP公式＋道場で対策"], books: ["○未: AIリスク教本 / ＡＩガバナンス入門 / AI・データ分析プロジェクトのすべて"] },
  { id: "CAPSTONE", cert: null, hub: "consulting", s: 14, e: 16, theme: ["総仕上げ：弱点総ざらい＋Consulting統合", "Capstone: weak-domain sweep + integration"],
    focus: ["全資格の弱点ドメインを道場・各Stationの模試で総ざらい。Consultingで学びを提案・ロジックに統合。", "Sweep every cert's weak domains; integrate learnings via Consulting."],
    udemy: [], books: ["○未: 考える技術・書く技術 / 仮説思考 / イシューからはじめよ（Consulting統合で使用）"] },
];

// MegaTech(AIアーキテクト)14テーマ×関連教材（あなたのライブラリから抽出。[完了フラグ,タイトル]）
const MEGATECH_THEME_MATERIALS = [{"t":"アルゴリズム基礎","u":[[0,"【1時間で把握】AI「超」入門講座 -プログラミング、数学無しで速習するAI-"],[0,"【プログラミング初心者向け】Python入門完全攻略"],[0,"【超初心者向け！】数学講師が教えるゼロからの統計学入門／データサイエンス・AIの基礎"]],"b":[[0,"深層学習の原理に迫る　数学の挑戦 (岩波科学ライブラリー)"],[0,"AIファースト・カンパニー――アルゴリズムとネットワークが経済を支配する新時代の経営戦略"],[0,"［図解］大学4年間の統計学が10時間でざっと学べる"]]},{"t":"アルゴリズム","u":[[1,"【2026年最新】AIエージェントの教科書｜基礎知識からカテゴリ別分類、ツール紹介、事例まで徹底網羅"],[0,"Pythonによる異常検知【点データ・時系列データ編】"],[0,"ビジネスのための施策効果の検証 ~Pythonとエクセルによる因果推論の実践~"],[0,"Pythonによる時系列分析~機械学習・ディープラーニング編"]],"b":[[0,"AIファースト・カンパニー――アルゴリズムとネットワークが経済を支配する新時代の経営戦略"]]},{"t":"学習","u":[[0,"Google Cloud Vertex AIによるML/AIモデル開発とMLOps入門"],[0,"ゼロから始めるGoogle Cloud Vertex AI AutoML入門：ノーコードによる機械学習モデルの構築"],[1,"【DX人材育成】非エンジニア／超初心者向けの人工知能 (AI / 機械学習 ) を活用したビジネスモデル立案講座"],[0,"【キカガク流】人工知能・機械学習 脱ブラックボックス講座 - 初級編 -"],[0,"みんなのAI講座 ゼロからPythonで学ぶ人工知能と機械学習 【2026年最新版】"],[1,"【AI-900短期合格＆機械学習入門講座】"],[0,"【認定資格練習問題集】AI-300 MLOps Engineer Associate"],[0,"【基礎から学ぶ】自然言語処理から大規模言語モデルLLMへ~Pythonで実践してみよう"],[0,"Pythonによる時系列分析~機械学習・ディープラーニング編"]],"b":[[0,"深層学習の原理に迫る　数学の挑戦 (岩波科学ライブラリー)"],[0,"LLMの原理、RAG・エージェント開発から読み解く　コンテキストエンジニアリング エンジニア選書"]]},{"t":"推論","u":[[0,"【生成AIセキュリティ】生成AIを悪用する攻撃と防御の全技術：プロンプト攻撃・情報漏洩・RAGリスク対策を実践的に習得"],[0,"【基礎から学ぶ】自然言語処理から大規模言語モデルLLMへ~Pythonで実践してみよう"],[0,"ビジネスのための施策効果の検証 ~Pythonとエクセルによる因果推論の実践~"]],"b":[[0,"問題解決力を高める「推論」の技術"],[0,"大規模言語モデルは新たな知能か　ＣｈａｔＧＰＴが変えた世界 (岩波科学ライブラリー)"],[0,"LLMの原理、RAG・エージェント開発から読み解く　コンテキストエンジニアリング エンジニア選書"]]},{"t":"RAG","u":[[0,"Difyで作るRAG実装とAIエージェント入門 | AIワークフロー大全vol.1"],[0,"【AWS】Amazon Bedrockによる生成AIウェブアプリ構築（RAG編）"],[0,"【初心者向け】AIエージェントを作ってみよう！LangChain・LangGraph・LangSmithの使い方を学ぼう"],[0,"【生成AIセキュリティ】生成AIを悪用する攻撃と防御の全技術：プロンプト攻撃・情報漏洩・RAGリスク対策を実践的に習得"],[0,"Generative AI Bootcamp: LLM Engineering, RAG & AI Agents"]],"b":[[0,"LangChainとLangGraphによるRAG・AIエージェント［実践］入門 エンジニア選書"],[0,"世界一やさしいRAG構築入門 ── Azure OpenAI Serviceで実現する賢いAIチャットボット"],[0,"AI LLMの実務で使えるRAG精度改善"],[0,"LLMの原理、RAG・エージェント開発から読み解く　コンテキストエンジニアリング エンジニア選書"]]},{"t":"エージェント","u":[[0,"Claude Skills × AIエージェント開発実戦コース"],[0,"AIマルチエージェント入門 -Claude Codeで学ぶ「AI専門家チーム」の作り方-"],[0,"【初心者向け】Claude CodeでAIエージェントを用いたデータ加工集計分析とダッシュボード開発を体験！"],[0,"【GPT-5対応】Microsoft 365 Copilot Chat & エージェント実践講座"],[0,"【2026年最新】Microsoft 365 Copilot オールインワン講座｜実務効率化からAIエージェント構築まで"],[0,"【Copilot Studio入門】AIをただのチャットで終わらせない。実践的AIエージェント作成と業務自動化の極意"],[0,"Copilot Studio 実践 - 問い合わせ対応〜メール作成までを自動化！"],[0,"【ゼロから学べる】Microsoft Copilot Studio 超入門！"],[0,"作って学ぶ Copilot Studio！実践的なAIエージェントを作成し業務を任せよう"],[0,"Difyで作るRAG実装とAIエージェント入門 | AIワークフロー大全vol.1"],[0,"Difyで作るAIエージェント開発 入門講座【Dify中級者向け】"],[0,"【AI初心者向け】Difyマスター講座 - 今日から高度なAIアプリ開発ができるようになる！【ITが苦手でも大丈夫】"],[0,"【生成AI】【Dify講座】社内文書を学習した実用的なチャットボットを作ってみよう【非エンジニア向け】【ノーコード】"],[0,"Dify実践入門 ハンズオン講座"],[0,"【3時間で学べる】Dify速習講座 - 「知らなかった」から「使いこなせる」へ！【すぐ実践できる】"],[0,"【Dify入門講座】16ブロックの徹底学習と3つの演習課題を通して実用的なAIアプリを作ろう【生成AI】【非エンジニア】"],[0,"Gemini Enterprise 業務自動化マスターコース：AIエージェントとGoogle"],[0,"【2025年12月版】はじめてのGensparkマスターコース｜たった１時間で学べる｜8役こなす次世代型AIエージェント"],[0,"CursorでAI駆動開発、バイブコーディング、エージェント開発入門"],[0,"【AWS】Amazon Bedrockによる生成AIウェブアプリ構築（AIエージェント編）"],[0,"Claude完全マスターコース・Coworkで始めるAIエージェント入門"],[0,"Claude Cowork速習マスター｜ファイル編集・ブラウザ操作・定期実行まで、AIにあなたの仕事を自動化させる方法"],[0,"非エンジニアのための Claude Cowork 実践入門"],[0,"【はじめてのClaude Cowork】12の実演で学ぶAI業務自動化"],[0,"はじめてのMCP：専門知識ナシで実践できるAI×業務自動化【Claude Desktop】"],[0,"はじめてのAIエージェント「Devin」の教科書 ～面倒な作業はAIで自動化！5時間で学ぶ業務効率化DX推進の決定版"],[0,"【初心者向け】AIエージェントを作ってみよう！LangChain・LangGraph・LangSmithの使い方を学ぼう"],[0,"【2026年最新版】最強AIエージェント「Manus」の使い方完全マスター講座！AIで資料・画像・アプリ作成、自動化！"],[0,"導入前に知っておきたい『AIエージェントリテラシー』講座《入門編》"],[0,"Agent Skillsを徹底解説！ AIエージェントに知識と手順を与えて、思い通りに動かそう！"],[0,"世界20万人が学んだ講師が教えるAIエージェント開発(日本語字幕)"],[0,"生成AIで実践するロジカルプレゼンテーション超入門【対話型AI・AIエージェント対応】"],[0,"【4時間で学ぶ】生成AIで実践するデザイン思考超入門：AIエージェント（HITL）活用編"],[0,"【最新トレンド】AIエージェントの教科書｜実践編 (ChatGPT,Gemini,Zapier etc..)"],[1,"【認定資格練習問題集】AB-900 Microsoft 365 認定: Copilot およびエージェント管理の基礎"],[1,"Copilot Studio速習講座 -Copilot Studio Fullでつくるワークフロー型AI-"],[1,"今日からはじめるAIトランスフォーメーション(AX)！生成AIとAIエージェントを活用した業務改革の理論と実践"],[1,"【2026年最新】AIエージェントの教科書｜基礎知識からカテゴリ別分類、ツール紹介、事例まで徹底網羅"],[1,"AIエージェント入門 基礎からわかる完全ガイド - 社会とビジネスが変わる未来を学ぶ -"],[1,"AIエージェント入門【初心者向け】 -自律的に調査/判断/実行するAIを学ぼう！-"]],"b":[[0,"LangChainとLangGraphによるRAG・AIエージェント［実践］入門 エンジニア選書"],[0,"図解と事例で一番わかるAIエージェントの教科書"],[0,"AIエージェントの教科書"],[0,"AIイネーブルメント　AIエージェントと人間で協創するWith AI時代 (幻冬舎単行本)"],[1,"現場で活用するためのＡＩエージェント実践入門 (ＫＳ情報科学専門書)"],[0,"LLMの原理、RAG・エージェント開発から読み解く　コンテキストエンジニアリング エンジニア選書"],[0,"【この１冊からはじめる】生成AIアプリ開発入門 Dify 徹底活用ガイド"],[0,"Claude Codeハーネス設計入門 自律開発を実現する3つのサブエージェント"],[0,"はじめてのMicrosoft Copilot Studio入門 ～ローコードではじめる業務AIエージェント"],[0,"やさしいMCP入門"],[0,"実践AIエージェントの教科書 構築技術と豊富な活用事例で学ぶ"],[1,"その仕事、AIエージェントがやっておきました。 ――ChatGPTの次に来る自律型AI革命"],[0,"AIエージェント革命 「知能」を雇う時代へ"],[0,"AIエージェント開発／運用入門 ［生成AI深掘りガイド］"]]},{"t":"アーキテクチャ","u":[],"b":[[0,"システムを作らせる技術　エンジニアではないあなたへ (日本経済新聞出版)"],[0,"エンジニアが学ぶ会計システムの「知識」と「技術」"],[0,"ビジネスリーダーのためのアーキテクチャ大全 DXの羅針盤となる「全体設計」の思考と技術"],[0,"Claude Codeハーネス設計入門 自律開発を実現する3つのサブエージェント"]]},{"t":"基盤","u":[[0,"Microsoft Foundry Agent Service完全マスター講座【入門から実践まで】"],[0,"Azure における AI ソリューションの開発 (AI-102T00)"],[0,"【AWS】Amazon Bedrockによる生成AIウェブアプリ構築（AIエージェント編）"],[0,"【AWS】Amazon Bedrockによる生成AIウェブアプリ構築（RAG編）"],[0,"Google Cloud Vertex AIによるML/AIモデル開発とMLOps入門"],[0,"ゼロから始めるGoogle Cloud Vertex AI AutoML入門：ノーコードによる機械学習モデルの構築"],[1,"AI-900 + AI-901 / Azure AI Fundamentals 用語問題＋対策テスト：2026年版"],[1,"Microsof認定Azure AI Fundamentals（AI-900）対策講座"],[1,"【AZ-900合格講座】Azureを基礎からしっかりと学びたい方へ"],[1,"【2026年版】AZ-900 Microsoft Azure Fundamentals模擬試験問題集（6回分420問）"],[0,"【最新】AWS認定 Machine Learning Engineer - Associate 試験対策講座"],[0,"【2026年最新】Google Cloud認定Generative AI Leader模擬試験＆基礎知識（日英対応）"],[0,"【2026年最新】AWS SAA-C03完全攻略問題集｜詳細図解付きデータ分析範囲対応版"],[0,"Google Cloud Generative AI Leader 用語問題＋対策テスト：2026年版"],[0,"サクッと覚える！AWS Certified Cloud Practitioner用語「聞き流し講座」"],[0,"サクッと覚える！AWS認定 AI プラクティショナー用語「聞き流し講座」"],[0,"【日本語版】DP-900 Azure Data Fundamentals オリジナル試験問題"]],"b":[[0,"外資系コンサルの仕事の進め方: 実践の場で使える問題解決の基盤スキル"],[0,"世界一やさしいRAG構築入門 ── Azure OpenAI Serviceで実現する賢いAIチャットボット"],[0,"Amazon Bedrock 生成AIアプリ開発入門 ［AWS深掘りガイド］"]]},{"t":"AI駆動開発","u":[[1,"Claude Code ハンズオン入門"],[0,"AIマルチエージェント入門 -Claude Codeで学ぶ「AI専門家チーム」の作り方-"],[0,"Claude CodeによるAI駆動開発入門"],[0,"【初心者向け】Claude CodeでAIエージェントを用いたデータ加工集計分析とダッシュボード開発を体験！"],[0,"【Claude Code入門】実用的なWebアプリケーション開発を通して学ぶClaude Code入門徹底講座"],[0,"Claude Codeで始めるAIプログラミング入門：HTMLやPythonアプリをVibe Codingで自動生成"],[0,"【AI初心者向け】Difyマスター講座 - 今日から高度なAIアプリ開発ができるようになる！【ITが苦手でも大丈夫】"],[0,"初心者向けCodex CLI バイブコーディング 基礎マスターコース"],[0,"【初心者向け】AIコーディングツール「Cursor」の使い方を学び、AI駆動開発でAirbnbのクローンサイトを作ろう！"],[0,"【非エンジニア向けCursor仕事術】Cursorを使いこなして、知的生産システムを構築 | 爆発的に生産性を向上させる"],[0,"【実践】イチから始めるバイブコーディング・プログラミング。AI開発環境Cursorの機能を徹底解説。アプリ量産体制構築。"],[0,"CursorでAI駆動開発、バイブコーディング、エージェント開発入門"],[0,"はじめてのGitHub Copilot使い方入門【2026年最新版】"],[0,"Visual Studio Code活用ガイドパック + GitHub Copilot"],[0,"【Cursor×Obsidian】分身AIをつくり独自コンテンツを超高速で生み出す！基礎から応用までの完全マスター講座"],[0,"AI駆動開発Vol.1【要件定義から動作検証まで】コードを書かずに爆速フル体験！無料Gemini CLIとVSCodeで"],[0,"【初心者向け】生成AI開発の教科書：本当に使える8つのプログラミング・アプリ作成の生成AIツールを比較して学ぶ！"],[0,"【1時間で把握】AI「超」入門講座 -プログラミング、数学無しで速習するAI-"],[0,"先生・学生・新社会人の方へ！スクラッチで学ぶAIに負けない人材になるためのプログラミング超入門"],[0,"【プログラミング初心者向け】Python入門完全攻略"],[0,"AI駆動開発Vol.1【要件定義から動作検証まで】コードを書かずに爆速フル体験！数日間の作業を30分で。"]],"b":[[0,"AI駆動開発の教科書 生成AIがシステム開発のすべてを変える"],[0,"Amazon Bedrock 生成AIアプリ開発入門 ［AWS深掘りガイド］"],[0,"【この１冊からはじめる】生成AIアプリ開発入門 Dify 徹底活用ガイド"],[0,"Claude Codeハーネス設計入門 自律開発を実現する3つのサブエージェント"],[0,"AI駆動開発入門"]]},{"t":"セキュリティ","u":[[0,"【生成AIセキュリティ】生成AIを悪用する攻撃と防御の全技術：プロンプト攻撃・情報漏洩・RAGリスク対策を実践的に習得"],[1,"AIと情報セキュリティの基礎：リスク管理とセキュリティ対策を学ぶ完全ガイド"]],"b":[[0,"デジタルアイデンティティー　経営者が知らないサイバービジネスの核心"],[0,"先読み！サイバーセキュリティ 生成AI時代の新たなビジネスリスク"]]},{"t":"ガバナンス","u":[[1,"【AI倫理入門】社会とAI技術の未来を考える -AIと共生する世界の新たなモラル-"]],"b":[[0,"AIリスク教本　攻めのディフェンスで危機回避＆ビジネス加速"],[0,"責任あるAIとルール"],[0,"ＡＩガバナンス入門　リスクマネジメントから社会設計まで (ハヤカワ新書)"],[0,"AIの作品は誰のもの？　弁理士と考えるAI×著作権"]]},{"t":"AI導入戦略","u":[[0,"はじめてのAIエージェント「Devin」の教科書 ～面倒な作業はAIで自動化！5時間で学ぶ業務効率化DX推進の決定版"],[0,"【Obsidian使い方大全】情報を一元化するプロフェッショナルノート術｜AI・DX時代の次世代メモツール"],[1,"【DX人材育成】非エンジニア／超初心者向けの人工知能 (AI / 機械学習 ) を活用したビジネスモデル立案講座"],[0,"管理職・リーダーのための生成AIリテラシー 〜組織のAI活用を正しく推進するための、判断軸と導入ガイド〜"],[0,"【1時間で学ぶ】生成AI活用の「誤解」を解くビジネスリテラシー：適切な「判断基準」と「期待値コントロール」"],[0,"世界20万人が学んだ講師が教える生成AI時代のDX(日本語字幕)"],[0,"DX(デジタルトランスフォーメーション)のためのビッグデータ活用とデータ活用企画のつくりかたまで"],[0,"【初学者向け】データマネジメント入門！DX推進やAI 導入を支える重要な要素をDMBOKに沿ってみていこう！"],[0,"DX実践講座 - 事業改革編 - 新規事業立案とプロダクト管理の実践テクニック"],[0,"DX実践講座 - 業務改革編 - 施策立案とプロジェクトマネジメントの実践テクニック"],[0,"【約40社12万人に教えた】生成AIをビジネスでフル活用するための技とフレームワーク"],[0,"生成AIの教科書 -ChatGPTの活用法、導入方法、トレンド、事例、DXとの関係まで完全網羅【2026年最新】"],[0,"生成AIでビジネススキルをアップデート！~ChatGPT×ビジネス調査・分析　新規事業・DX・戦略立案に必須な基本スキル"],[1,"１時間でサクッと学ぶ！非エンジニアのための社内DX推進はじめの一歩"],[1,"生成AI活用時のリスクと予防策を学ぶ：安全なAI利用のための基礎知識"]],"b":[[0,"DXビジネスモデル　80事例に学ぶ利益を生み出す攻めの戦略 できるビジネスシリーズ"],[0,"ビジネスに魔法をかける　生成AI導入大全"],[0,"目的別！ 仕事で使える　AI活用事典 (きずな出版)"],[0,"生成＜ジェネレーティブ＞DX 生成AIが生んだ新たなビジネスモデル"],[0,"AIイネーブルメント　AIエージェントと人間で協創するWith AI時代 (幻冬舎単行本)"],[0,"ビジネスリーダーのためのアーキテクチャ大全 DXの羅針盤となる「全体設計」の思考と技術"],[0,"2ヶ月で月30万円を実現する　超初心者でも稼げるAI活用法"],[0,"実践AIエージェントの教科書 構築技術と豊富な活用事例で学ぶ"]]},{"t":"Expertise","u":[[0,"AIマルチエージェント入門 -Claude Codeで学ぶ「AI専門家チーム」の作り方-"],[0,"【Obsidian使い方大全】情報を一元化するプロフェッショナルノート術｜AI・DX時代の次世代メモツール"],[0,"先生・学生・新社会人の方へ！スクラッチで学ぶAIに負けない人材になるためのプログラミング超入門"]],"b":[[0,"論点を研ぐ　戦略コンサルタントが明かす「問題解決」の実際"],[0,"外資系コンサルの仕事の進め方: 実践の場で使える問題解決の基盤スキル"],[0,"コンサルを超える 問題解決と価値創造の全技法"],[0,"コンサルタントが毎日見ている経済データ30 (日経文庫)"],[0,"コンサルタント3年目までの必修ビジネススキル　キャリアを踏破するためのサバイバルマップ"],[0,"コンサルタントの「質問力」 「できる人」の隠れたマインド＆スキル (PHPビジネス新書)"],[0,"コンサル時代に教わった 仕事ができる人の当たり前"],[0,"戦略コンサルのトップ５％だけに見えている世界"],[0,"トップコンサルタントの「戦略的」勉強法"],[0,"外資系コンサルが実践する　図解作成の基本"],[0,"戦略プロフェッショナル[増補改訂版］"],[0,"戦略コンサルティング・ファームの面接試験――難関突破のための傾向と対策"],[0,"外資系コンサルのスライド作成術　作例集―実例から学ぶリアルテクニック"],[0,"高いワイン――知っておくと一目置かれる 教養としての一流ワイン"],[0,"PowerPoint資料作成 プロフェッショナルの大原則 【生成AI対応版】"],[0,"外資系コンサルのデータ分析技法―生成ＡＩを使いこなすデータスキル"],[0,"文系ＡＩ人材になる―統計・プログラム知識は不要"],[0,"ＣｈａｔＧＰＴ時代の文系ＡＩ人材になる―ＡＩを操る７つのチカラ"],[1,"経営者の右腕になる AI時代のITコンサルタント"],[0,"10分で読み解く！一流の営業マンになるための財務分析"],[0,"コンサルタントのための生成AI実践バイブル 思考を武器にAIを使いこなす技術"],[0,"アフターAI　世界の一流には見えている生成AIの未来地図"],[0,"ファイナンスのプロになる Excel財務モデリングの教科書I: ミスを減らせるルール編"],[0,"たった一言で頭がいい人だと思われる コンサルタントの言語化力"]]},{"t":"最新動向","u":[[0,"【2025年12月版】はじめてのGensparkマスターコース｜たった１時間で学べる｜8役こなす次世代型AIエージェント"],[0,"【Obsidian使い方大全】情報を一元化するプロフェッショナルノート術｜AI・DX時代の次世代メモツール"],[1,"【AI倫理入門】社会とAI技術の未来を考える -AIと共生する世界の新たなモラル-"],[0,"<初心者向け> AIロボット・フィジカルAIの教科書｜基礎知識から従来型との違い、最新事例、未来予測まで徹底網羅"],[0,"【2026年のAI新常識】AIトレンドを完全攻略 -これだけは知っておきたい10の必須"],[0,"【最新トレンド】AIエージェントの教科書｜実践編 (ChatGPT,Gemini,Zapier etc..)"],[0,"生成AIの教科書 -ChatGPTの活用法、導入方法、トレンド、事例、DXとの関係まで完全網羅【2026年最新】"],[1,"今日からはじめる デジタルトランスフォーメーション！ITの基本からビジネストレンドまで"],[1,"AIエージェント入門 基礎からわかる完全ガイド - 社会とビジネスが変わる未来を学ぶ -"]],"b":[[0,"論点思考 内田和成の思考"],[0,"論点を研ぐ　戦略コンサルタントが明かす「問題解決」の実際"],[0,"最強のシナリオプランニング―変化に対する感度と柔軟性を高める「未来の可視化」"],[0,"ＢＣＧが読む経営の論点2022"],[0,"この数字がわかるだけで日本の未来が読める"],[0,"これからのAI、正しい付き合い方と使い方　「共同知能」と共生するためのヒント"],[0,"BCGが読む経営の論点2025"],[0,"生成AIの論点　学問・ビジネスからカルチャーまで"],[0,"生成AI時代の教養　技術と未来への21の問い"],[0,"ＡＩ白書　２０２５　生成ＡＩエディション (単行本)"],[0,"未来に先回りする思考法"],[1,"生成AI・30の論点　2025-2026 (日本経済新聞出版)"],[0,"先読み！サイバーセキュリティ 生成AI時代の新たなビジネスリスク"],[0,"メタトレンド投資　１０倍株・１００倍株の見つけ方"],[0,"AI 2041　人工知能が変える20年後の未来 (文春e-book)"],[0,"シンギュラリティはより近く　人類がAIと融合するとき"],[0,"アフターAI　世界の一流には見えている生成AIの未来地図"],[0,"2030 次世代AI 日本の勝ち筋"],[0,"AIのド素人ですが、10年後も仕事とお金に困らない方法を教えて下さい！　最悪の未来でも自分だけが助かる本"],[1,"その仕事、AIエージェントがやっておきました。 ――ChatGPTの次に来る自律型AI革命"]]}];
// Consulting 9ドメイン(+総合)×関連教材（ライブラリ抽出。[完了,タイトル]）
const CONSULTING_DOMAIN_MATERIALS = [{"t":"ロジカルシンキング","u":[[0,"生成AIで実践するロジカルプレゼンテーション超入門【対話型AI・AIエージェント対応】"],[1,"【 速く、シンプルに伝える 】パワーポイントで学ぶロジカル・プレゼンテーション"],[0,"相手の心を動かす「プレゼンの基本」 シンプルかつロジカルに伝える技術"],[0,"ロジカルシンキングマスター講座！ すぐに論理的思考を実践出来る３ステップ"]],"b":[[0,"ロジカルシンキング"],[0,"シン・ロジカルシンキング"],[0,"考える技術、書く技術（物理本）"],[0,"考える技術、書く技術 スライド編（物理本）"],[0,"頭のいい人だけが解ける論理的思考問題」"],[0,"変える技術、考える技術"],[0,"アマゾンで学んだ！ 伝え方はストーリーが9割"],[0,"たった一言で頭がいい人だと思われる コンサルタントの言語化力"]]},{"t":"クリティカルシンキング","u":[[0,"ビジネスのための施策効果の検証 ~Pythonとエクセルによる因果推論の実践~"],[0,"EXCELで学ぶ数字思考力とマーケティング分析【入門編】"],[0,"【明日から実践！】短時間と高品質を両立させる問題解決入門 〜仮説思考編"]],"b":[[0,"仮説思考―ＢＣＧ流　問題発見・解決の発想法 内田和成の思考"],[0,"ビジネス大学30分 仮説思考"],[0,"「60分」図解トレーニング 仮説思考 (PHPビジネス新書ビジュアル)"],[0,"超仮説思考入門（物理本）"],[0,"実践仮説思考2.0"],[0,"イシューからはじめよ――知的生産の「シンプルな本質」"],[0,"論点思考 内田和成の思考"],[0,"論点を研ぐ　戦略コンサルタントが明かす「問題解決」の実際"],[0,"問題解決力を高める「推論」の技術"],[0,"思考力の地図　論理とひらめきを使いこなせる頭のつくり方"],[0,"ＢＣＧが読む経営の論点2022"],[0,"BCGが読む経営の論点2025"],[0,"生成AIの論点　学問・ビジネスからカルチャーまで"],[1,"生成AI・30の論点　2025-2026 (日本経済新聞出版)"]]},{"t":"ラテラルシンキング","u":[[0,"【世界20万人が学ぶAIデプロイ完全攻略】アイデアを「稼ぐSaaS」へ、スキルを「本番レベル」へ（日本語字幕）"]],"b":[[0,"仮説思考―ＢＣＧ流　問題発見・解決の発想法 内田和成の思考"],[0,"ビジネスフレームワーク図鑑 すぐ使える問題解決・アイデア発想ツール70"],[0,"思考法図鑑 ひらめきを生む問題解決・アイデア発想のアプローチ60"],[0,"ビジュアル思考大全 問題解決のアイデアが湧き出る37の技法"],[0,"AIを使って考えるための全技術――「最高の発想」を一瞬で生み出す５６の技法"]]},{"t":"クリエイティブシンキング","u":[[0,"DX(デジタルトランスフォーメーション)のためのビッグデータ活用とデータ活用企画のつくりかたまで"],[0,"手を動かして学ぶプロダクトデザイン入門！デザイン思考・プロトタイピング・アジャイルの考え方と実践"],[0,"【4時間で学ぶ】生成AIで実践するデザイン思考超入門：AIエージェント（HITL）活用編"],[0,"【入門編】企画とパワーポイント！「バリ島xハワイx東京」 ３拠点生活を企画書にしました！"],[0,"活用企画と仮説が肝！データを問題解決につなげるビジネス基礎スキル"],[0,"デザイン思考マスター講座！ ”狙って”奇跡を起こす為に重要な３つの事"]],"b":[[0,"コンサルを超える 問題解決と価値創造の全技法"],[0,"思考力の地図　論理とひらめきを使いこなせる頭のつくり方"],[0,"ビジネスフレームワーク図鑑 すぐ使える問題解決・アイデア発想ツール70"],[0,"思考法図鑑 ひらめきを生む問題解決・アイデア発想のアプローチ60"]]},{"t":"構造化","u":[[0,"【約40社12万人に教えた】生成AIをビジネスでフル活用するための技とフレームワーク"],[0,"生成AIを体系的に理解！ChatGPT、Gemini、Claude、NotebookLM等7個のサービスを学ぶ"],[0,"【2026年最新】AWS SAA-C03完全攻略問題集｜詳細図解付きデータ分析範囲対応版"]],"b":[[0,"「60分」図解トレーニング 仮説思考 (PHPビジネス新書ビジュアル)"],[0,"新版［図解］問題解決入門―――問題の見つけ方と手の打ち方"],[0,"構造化思考のレッスン"],[0,"BCG 20の思考ツール"],[0,"思考力の地図　論理とひらめきを使いこなせる頭のつくり方"],[0,"外資系コンサルが実践する　図解作成の基本"],[0,"決算分析の地図　財務3表だけではつかめないビジネスモデルを視る技術"],[0,"ビジネスフレームワーク図鑑 すぐ使える問題解決・アイデア発想ツール70"],[0,"思考法図鑑 ひらめきを生む問題解決・アイデア発想のアプローチ60"],[0,"新版　財務3表図解分析法 (朝日新書)"],[0,"図解！業界地図2022年版"],[0,"起業大全――スタートアップを科学する９つのフレームワーク"],[0,"［図解］大学4年間の統計学が10時間でざっと学べる"],[0,"図解と事例で一番わかるAIエージェントの教科書"],[0,"図解入門ビジネス 最新ビジネスデューデリがよーくわかる本[第2版]"],[0,"業務改善の問題地図　～「で、どこから変える？」～進まない、続かない、だれトク改善ごっこ"],[0,"アフターAI　世界の一流には見えている生成AIの未来地図"],[0,"事業構想を「書く」 ビジネスモデルを可視化し新規事業開発を加速させるフレームワーク"],[0,"BCG　経営課題解決「20の思考ツール」　成果を最大化する「７つの要素」 (日本経済新聞出版)"]]},{"t":"DX","u":[[0,"はじめてのAIエージェント「Devin」の教科書 ～面倒な作業はAIで自動化！5時間で学ぶ業務効率化DX推進の決定版"],[0,"【Obsidian使い方大全】情報を一元化するプロフェッショナルノート術｜AI・DX時代の次世代メモツール"],[0,"作って学ぶPower Automate for desktop！実践的なフローを30個以上作成して業務改善を実現"],[1,"【DX人材育成】非エンジニア／超初心者向けの人工知能 (AI / 機械学習 ) を活用したビジネスモデル立案講座"],[0,"世界20万人が学んだ講師が教える生成AI時代のDX(日本語字幕)"],[0,"DX(デジタルトランスフォーメーション)のためのビッグデータ活用とデータ活用企画のつくりかたまで"],[0,"【初学者向け】データマネジメント入門！DX推進やAI 導入を支える重要な要素をDMBOKに沿ってみていこう！"],[0,"DX実践講座 - 事業改革編 - 新規事業立案とプロダクト管理の実践テクニック"],[0,"DX実践講座 - 業務改革編 - 施策立案とプロジェクトマネジメントの実践テクニック"],[0,"生成AIの教科書 -ChatGPTの活用法、導入方法、トレンド、事例、DXとの関係まで完全網羅【2026年最新】"],[0,"生成AIでビジネススキルをアップデート！~ChatGPT×ビジネス調査・分析　新規事業・DX・戦略立案に必須な基本スキル"],[1,"今日からはじめる デジタルトランスフォーメーション！ITの基本からビジネストレンドまで"],[1,"１時間でサクッと学ぶ！非エンジニアのための社内DX推進はじめの一歩"]],"b":[[0,"DXビジネスモデル　80事例に学ぶ利益を生み出す攻めの戦略 できるビジネスシリーズ"],[0,"もうけの仕組み: ビジネスモデル大図鑑　４０４社を徹底検証！"],[0,"勝ち組企業の「ビジネスモデル」大全」"],[0,"GAFAの決算書 超エリート企業の利益構造とビジネスモデルがつかめる"],[0,"ビジネスモデル2.0図鑑 (中経出版)"],[0,"決算分析の地図　財務3表だけではつかめないビジネスモデルを視る技術"],[0,"生成＜ジェネレーティブ＞DX 生成AIが生んだ新たなビジネスモデル"],[0,"業務改善の問題地図　～「で、どこから変える？」～進まない、続かない、だれトク改善ごっこ"],[0,"７つのステップでビジネスモデルを可視化する決算分析の技術"],[0,"決算書×ビジネスモデル大全―会社の数字から儲かる仕組みまでいっきにわかる"],[0,"ビジネスリーダーのためのアーキテクチャ大全 DXの羅針盤となる「全体設計」の思考と技術"],[0,"事業構想を「書く」 ビジネスモデルを可視化し新規事業開発を加速させるフレームワーク"],[0,"ビジネスモデルの教科書―経営戦略を見る目と考える力を養う"],[0,"決算書の比較図鑑　見るだけで「儲かるビジネスモデル」までわかる"],[0,"業務設計の教科書"]]},{"t":"AI（コンサル応用）","u":[[0,"管理職・リーダーのための生成AIリテラシー 〜組織のAI活用を正しく推進するための、判断軸と導入ガイド〜"],[0,"【1時間で学ぶ】生成AI活用の「誤解」を解くビジネスリテラシー：適切な「判断基準」と「期待値コントロール」"],[0,"【約40社12万人に教えた】生成AIをビジネスでフル活用するための技とフレームワーク"],[0,"AI時代に非エンジニアのビジネスパーソンが知っておくべき生成AI基礎とビジネスへの影響を学ぼう"],[0,"生成AIでビジネススキルをアップデート！~ChatGPT×ビジネス調査・分析　新規事業・DX・戦略立案に必須な基本スキル"],[1,"生成AI活用時のリスクと予防策を学ぶ：安全なAI利用のための基礎知識"]],"b":[[0,"生成AIの論点　学問・ビジネスからカルチャーまで"],[0,"ビジネスに魔法をかける　生成AI導入大全"],[0,"先読み！サイバーセキュリティ 生成AI時代の新たなビジネスリスク"],[0,"目的別！ 仕事で使える　AI活用事典 (きずな出版)"],[0,"生成＜ジェネレーティブ＞DX 生成AIが生んだ新たなビジネスモデル"],[0,"コンサルタントのための生成AI実践バイブル 思考を武器にAIを使いこなす技術"],[0,"2ヶ月で月30万円を実現する　超初心者でも稼げるAI活用法"]]},{"t":"コンサル総合","u":[[0,"【Obsidian使い方大全】情報を一元化するプロフェッショナルノート術｜AI・DX時代の次世代メモツール"],[0,"【初心者から上級者まで】データを正しく使って事業・組織を変える！実践者のためのデータ活用戦略入門"],[0,"【2027年AI生存戦略】価値が急騰する「人間ならではのスキル」を武器に、AI指揮"],[0,"生成AIでビジネススキルをアップデート！~ChatGPT×ビジネス調査・分析　新規事業・DX・戦略立案に必須な基本スキル"],[0,"はじめての全社戦略論 ～成長性と収益性の両立への挑戦！5時間で学ぶ事業ポートフォリオ"],[0,"活用企画と仮説が肝！データを問題解決につなげるビジネス基礎スキル"],[0,"【明日から実践！】短時間と高品質を両立させる問題解決入門 〜仮説思考編"]],"b":[[0,"論点を研ぐ　戦略コンサルタントが明かす「問題解決」の実際"],[0,"問題解決力を高める「推論」の技術"],[0,"外資系コンサルの仕事の進め方: 実践の場で使える問題解決の基盤スキル"],[0,"完全無欠の問題解決: 不確実性を乗り越える7ステップアプローチ"],[0,"コンサルを超える 問題解決と価値創造の全技法"],[0,"新版［図解］問題解決入門―――問題の見つけ方と手の打ち方"],[0,"ビジネス地頭力の鍛え方"],[0,"入門『地頭力を鍛える』　３２のキーワードで学ぶ思考法"],[0,"BCG 20の思考ツール"],[0,"コンサルタントが毎日見ている経済データ30 (日経文庫)"],[0,"コンサルタント3年目までの必修ビジネススキル　キャリアを踏破するためのサバイバルマップ"],[0,"コンサルタントの「質問力」 「できる人」の隠れたマインド＆スキル (PHPビジネス新書)"],[0,"コンサル時代に教わった 仕事ができる人の当たり前"],[0,"戦略コンサルのトップ５％だけに見えている世界"],[0,"DXビジネスモデル　80事例に学ぶ利益を生み出す攻めの戦略 できるビジネスシリーズ"],[0,"トップコンサルタントの「戦略的」勉強法"],[0,"外資系コンサルが実践する　図解作成の基本"],[0,"戦略プロフェッショナル[増補改訂版］"],[0,"コーポレートファイナンス 戦略と実践"],[0,"SDGs時代を勝ち抜く ESG財務戦略"],[0,"戦略コンサルティング・ファームの面接試験――難関突破のための傾向と対策"],[1,"ファイナンス思考――日本企業を蝕む病と、再生の戦略論"],[0,"ビジネスフレームワーク図鑑 すぐ使える問題解決・アイデア発想ツール70"],[0,"外資系コンサルのスライド作成術　作例集―実例から学ぶリアルテクニック"],[0,"思考法図鑑 ひらめきを生む問題解決・アイデア発想のアプローチ60"],[0,"ビジュアル思考大全 問題解決のアイデアが湧き出る37の技法"],[0,"BCGが読む経営の論点2025"],[0,"PowerPoint資料作成 プロフェッショナルの大原則 【生成AI対応版】"],[0,"外資系コンサルのデータ分析技法―生成ＡＩを使いこなすデータスキル"],[0,"AIビジネスチャンス　技術動向と事例に学ぶ新たな価値を生成する攻めの戦略（できるビジネス）"],[0,"AIファースト・カンパニー――アルゴリズムとネットワークが経済を支配する新時代の経営戦略"],[0,"マッキンゼー　ＲＥＷＩＲＥＤ―デジタルとＡＩ時代を勝ち抜く企業変革の実践書"],[1,"経営者の右腕になる AI時代のITコンサルタント"],[0,"収益多様化の戦略―既存事業を変えるマネタイズの新しいロジック"],[0,"マッキンゼー　価値を創るＭ＆Ａ (日本経済新聞出版)"],[0,"コンサルタントのための生成AI実践バイブル 思考を武器にAIを使いこなす技術"],[0,"ゼロから創らない戦略　イノベーションを駆動する「価値移転」の法則 (日本経済新聞出版)"],[0,"ビジネスモデルの教科書―経営戦略を見る目と考える力を養う"],[0,"たった一言で頭がいい人だと思われる コンサルタントの言語化力"],[0,"BCG　経営課題解決「20の思考ツール」　成果を最大化する「７つの要素」 (日本経済新聞出版)"]]}];
// パターンB「ハブ全問制覇」：TechHub14テーマ＋Consulting9ドメインの全問を4ヶ月で完了。各行4分割(¼/½/¾/全問)で進捗。
const BOOTCAMP_QMILE = [{ k: "q1", label: ["¼", "¼"] }, { k: "q2", label: ["½", "½"] }, { k: "q3", label: ["¾", "¾"] }, { k: "q4", label: ["全問完了", "100%"] }];
// Mastery Track の問題数と内訳は、各バンクの実データから数える。
// 手で書いた数値は、問題の追加・重複削除のたびに実数とずれていたため。
const MQ_LV = [["Lv1 基礎", "Lv1 basics"], ["Lv2 標準", "Lv2 core"], ["Lv3 応用", "Lv3 applied"], ["Lv4 発展", "Lv4 advanced"]];
// TechHub は集計（MASTERY_COUNTS）だけを渡す。ビルドでは TechHub の本体を開いたときに読み込むので、ここでバンク本体には触れない。
const MQC = MegaTechHubModule.MASTERY_COUNTS;
const mqRow = (cat) => { const r = Object.prototype.hasOwnProperty.call(MQC.mcqs, cat) ? MQC.mcqs[cat] : [0, 0, 0, 0, 0]; return { qn: r[0], cats: MQ_LV.map((n, i) => ({ n, q: r[i + 1] })) }; };
const mqDoms = (b) => b.doms.map((d) => ({ n: [d.id + " " + d.ja, d.id + " " + d.en], q: d.q }));
const MQ_GLOSSARY = MQC.glossary;
const BOOTCAMP_QUEST = {
  mega: [
    { id: "Q-M1", name: ["アルゴリズム基礎", "Algorithm Basics"], ...mqRow("アルゴリズム基礎"), s: 1, e: 1, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 0 },
    { id: "Q-M2", name: ["アルゴリズム", "Algorithms"], ...mqRow("アルゴリズム"), s: 1, e: 1, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 1 },
    { id: "Q-M3", name: ["学習", "Training"], ...mqRow("学習"), s: 1, e: 1, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 2 },
    { id: "Q-M4", name: ["推論", "Inference"], ...mqRow("推論"), s: 2, e: 2, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 3 },
    { id: "Q-M5", name: ["RAG", "RAG"], ...mqRow("RAG"), s: 2, e: 2, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 4 },
    { id: "Q-M6", name: ["エージェント", "Agents"], ...mqRow("エージェント"), s: 2, e: 2, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 5 },
    { id: "Q-M7", name: ["アーキテクチャ", "Architecture"], ...mqRow("アーキテクチャ"), s: 2, e: 2, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 6 },
    { id: "Q-MCHKC", name: ["理解度チェック 基礎", "Comprehension check — Core"], qn: MQC.checkCore.n, s: 2, e: 3, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, cats: mqDoms(MQC.checkCore) },
    { id: "Q-M8", name: ["基盤", "Infrastructure"], ...mqRow("基盤"), s: 3, e: 3, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 7 },
    { id: "Q-M9", name: ["AI駆動開発", "AI-Driven Dev"], ...mqRow("AI駆動開発"), s: 3, e: 3, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 8 },
    { id: "Q-M10", name: ["セキュリティ", "Security"], ...mqRow("セキュリティ"), s: 3, e: 4, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 9 },
    { id: "Q-MCHKA", name: ["理解度チェック AX実務", "Comprehension check — AX"], qn: MQC.checkAx.n, s: 3, e: 4, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, cats: mqDoms(MQC.checkAx) },
    { id: "Q-M11", name: ["ガバナンス", "Governance"], ...mqRow("ガバナンス"), s: 4, e: 4, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 10 },
    { id: "Q-M12", name: ["AI導入戦略", "Adoption Strategy"], ...mqRow("AI導入戦略"), s: 4, e: 4, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 11 },
    { id: "Q-M13", name: ["Expertise", "Expertise"], ...mqRow("Expertise"), s: 5, e: 5, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 12 },
    { id: "Q-M14", name: ["最新動向", "Latest Trends"], ...mqRow("最新動向"), s: 5, e: 5, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 13 },
    { id: "Q-MK", name: ["Key Numbers", "Key Numbers"], ...mqRow("Key numbers"), s: 5, e: 5, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE },
    { id: "Q-MDEV", name: ["AI駆動開発ドリル​（DEV_QUIZ）", "Dev drills"], qn: MQC.dev, s: 5, e: 6, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 8 },
    { id: "Q-MBANK", name: ["クラウド開発クイズ​（BANK）", "Cloud/dev quiz"], qn: MQC.bank, s: 6, e: 7, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 7 },
    { id: "Q-MARCH", name: ["アーキテクチャ演習​（ARCH）", "Architecture exercises"], qn: MQC.arch, s: 7, e: 7, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 6 },
    { id: "Q-MACAD", name: ["AIアーキテクト道場​（ACAD）", "Architect academy"], qn: MQC.acad, s: 7, e: 7, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 6 },
    { id: "Q-MGOV", name: ["セキュリティ・​ガバナンス道場", "Sec & Gov dojo"], qn: MQC.govdojo, s: 7, e: 8, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 9 },
    { id: "Q-MITSEC", name: ["ITセキュリティ基盤​（クイズ）", "IT security foundations quiz"], qn: MQC.itsec, s: 8, e: 8, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 9 },
    { id: "Q-MGOVS", name: ["道場シナリオ", "Dojo scenarios"], qn: MQC.govScen, s: 8, e: 8, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 10 },
    { id: "Q-MSAINT", name: ["SA面接Q&A", "SA interview Q&A"], qn: MQC.saint, s: 8, e: 8, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, mk: "mega", mi: 6 },
    { id: "Q-MOTHER", name: ["その他ドリル・演習​・資格クイズ", "Other drills & cert quizzes"], qn: 236, s: 8, e: 8, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE },
    { id: "Q-MNOTE", name: ["実務論点マップ​（論点クイズ）", "Practice issue map quiz"], qn: MQC.noteIssue.n, s: 9, e: 9, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, cats: mqDoms(MQC.noteIssue) },
    { id: "Q-MSLQ", name: ["Slalom変革道場​（スキルクイズ）", "Slalom dojo skill quiz"], qn: MQC.slalom.n, s: 11, e: 12, hub: "megatech", qmile: true, mile: BOOTCAMP_QMILE, cats: mqDoms(MQC.slalom) },
  ],
  practice: [{"id": "Q-P1", "name": ["基礎", "Core Reading"], "qn": 4, "unit": 1, "s": 9, "e": 9, "hub": "megatech", "cats": [{"n": ["戦略", "Strategy"], "q": 1}, {"n": ["論点", "Issues"], "q": 1}, {"n": ["全体像（サービスマップ）", "Service Map"], "q": 1}, {"n": ["定量データ（ファクトブック）", "Factbook"], "q": 1}]}, {"id": "Q-P10", "name": ["暗黙知の形式知化", "Tacit → Explicit"], "qn": 9, "unit": 1, "s": 9, "e": 10, "hub": "megatech", "cats": [{"n": ["I 学問的土台 SECI×CTA", "I SECI x CTA"], "q": 1}, {"n": ["II 表出化の4特徴", "II Externalization"], "q": 1}, {"n": ["III 3+1 Step", "III 3+1 Steps"], "q": 1}, {"n": ["IV 8視点フレーム", "IV 8 Viewpoints"], "q": 1}, {"n": ["V CTA 5技法マッピング", "V CTA Techniques"], "q": 1}, {"n": ["VI OK&NG問答集", "VI OK & NG"], "q": 1}, {"n": ["VII 世界の関連手法13", "VII World Catalog"], "q": 1}, {"n": ["VIII 手法の選び方", "VIII Method Picker"], "q": 1}, {"n": ["IX 実装難易度スコアラー", "IX Difficulty Scorer"], "q": 1}]}, {"id": "Q-P11", "name": ["AX手法箱", "Method Toolbox"], "qn": 6, "unit": 1, "s": 10, "e": 11, "hub": "megatech", "cats": [{"n": ["I 業務可視化の記法5", "I Process Notations"], "q": 1}, {"n": ["II 発掘・優先順位付け", "II Discovery & Scoring"], "q": 1}, {"n": ["III PoC設計・効果測定", "III PoC & Benefits"], "q": 1}, {"n": ["IV Evals設計", "IV Evals Design"], "q": 1}, {"n": ["V データレディネス評価", "V Data Readiness"], "q": 1}, {"n": ["VI 進行ゲートと設計キャンバス", "VI Project gates & design canvas"], "q": 1}]}, {"id": "Q-P2", "name": ["価値と診断", "Value & Assessment"], "qn": 4, "unit": 1, "s": 9, "e": 10, "hub": "megatech", "cats": [{"n": ["価値ドライバー", "Value Drivers"], "q": 1}, {"n": ["AX成熟度診断", "Maturity Assessment"], "q": 1}, {"n": ["ADOPT DESIGN（定着の設計図）", "Adoption Design"], "q": 1}, {"n": ["効果不振の診断ツリー", "Underperformance Triage"], "q": 1}]}, {"id": "Q-P3", "name": ["提案の型 I〜XII", "Proposal Kit I-XII"], "qn": 12, "unit": 1, "s": 10, "e": 11, "hub": "megatech", "cats": [{"n": ["I 骨子7ステップ", "I Skeleton"], "q": 1}, {"n": ["II 案件検査10項目", "II Deal Check"], "q": 1}, {"n": ["III CFOに耐える計算", "III CFO Math"], "q": 1}, {"n": ["IV バトルカード", "IV Battlecards"], "q": 1}, {"n": ["V 想定問答12", "V Objections"], "q": 1}, {"n": ["VI 契約形態の型", "VI Contract Forms"], "q": 1}, {"n": ["VII フル提案書12P", "VII Sample Deck"], "q": 1}, {"n": ["VIII GOV GATE", "VIII GOV GATE"], "q": 1}, {"n": ["IX FIN GATE", "IX FIN GATE"], "q": 1}, {"n": ["X LAYER MAP", "X Layer Map"], "q": 1}, {"n": ["XI 契約・ステークホルダー", "XI Contracts & Stakeholders"], "q": 1}, {"n": ["XII 財務3表への着地", "XII Landing on the three statements"], "q": 1}]}, {"id": "Q-P4", "name": ["商談実戦", "Deal Practice"], "qn": 4, "unit": 1, "s": 12, "e": 12, "hub": "megatech", "cats": [{"n": ["商談ドリル10", "Sales Drills"], "q": 1}, {"n": ["ディスカバリー質問8業種", "Discovery Questions"], "q": 1}, {"n": ["ケース演習10（AI採点）", "Case Work"], "q": 1}, {"n": ["模擬商談LIVE 5ペルソナ", "Live Deal Dojo"], "q": 1}]}, {"id": "Q-P5", "name": ["業界別（深掘り＋ツール）", "Industry Maps"], "qn": 8, "unit": 1, "s": 13, "e": 14, "hub": "megatech", "cats": [{"n": ["製造", "Manufacturing"], "q": 1}, {"n": ["金融", "Finance"], "q": 1}, {"n": ["小売・消費財", "Retail"], "q": 1}, {"n": ["物流・運輸", "Logistics"], "q": 1}, {"n": ["ヘルスケア・製薬", "Pharma"], "q": 1}, {"n": ["公共・自治体", "Public"], "q": 1}, {"n": ["エネルギー・公益", "Energy"], "q": 1}, {"n": ["建設・不動産", "Construction"], "q": 1}]}, {"id": "Q-P6", "name": ["エージェント棚", "Agent Shelf"], "qn": 4, "unit": 1, "s": 14, "e": 14, "hub": "megatech", "cats": [{"n": ["金融・保険", "Finance & Insurance"], "q": 1}, {"n": ["製造・建設・インフラ", "Mfg & Infra"], "q": 1}, {"n": ["小売・流通", "Retail & Dist."], "q": 1}, {"n": ["サービス・IT", "Service & IT"], "q": 1}]}, {"id": "Q-P24", "name": ["アーキテクチャ事例", "Architecture cases"], "qn": 14, "unit": 1, "s": 17, "e": 17, "hub": "megatech", "cats": [{"n": ["I 構成パターン", "I Architecture patterns"], "q": 1}, {"n": ["II 構成ツール早見表", "II Component map"], "q": 1}, {"n": ["III AIエージェントの実装事例", "III Agent systems"], "q": 1}, {"n": ["IV クラウド公式事例", "IV Cloud vendors' cases"], "q": 1}, {"n": ["V その他の公開事例", "V Other public cases"], "q": 1}, {"n": ["VI 事例を横断して現れるもの", "VI What repeats across cases"], "q": 1}, {"n": ["VII 実測", "VII Measured"], "q": 1}, {"n": ["VIII 事例エクスプローラ", "VIII Case explorer"], "q": 1}, {"n": ["IX 2社を並べて読む", "IX Side by side"], "q": 1}, {"n": ["X 選定の分岐点", "X Decision forks"], "q": 1}, {"n": ["XI 導入後", "XI After adoption"], "q": 1}, {"n": ["XII 本番系の宿題", "XII Still unsolved"], "q": 1}, {"n": ["XIII 横断記事の要点", "XIII Cross-company digests"], "q": 1}, {"n": ["XIV 商談での使い方", "XIV Using it in a meeting"], "q": 1}]}, {"id": "Q-P7", "name": ["先端メニュー 15ドメイン", "Frontier Menu"], "qn": 15, "unit": 1, "s": 15, "e": 16, "hub": "megatech", "cats": [{"n": ["エージェントハーネス", "Agent Harness"], "q": 1}, {"n": ["エッジ・軽量化", "Edge & Quantization"], "q": 1}, {"n": ["トークン最適化", "Token Optimization"], "q": 1}, {"n": ["暗黙知の顕在化", "Tacit Knowledge"], "q": 1}, {"n": ["AI駆動開発", "AI-driven Dev"], "q": 1}, {"n": ["AgentOps・運用", "AgentOps"], "q": 1}, {"n": ["Physical AI", "Physical AI"], "q": 1}, {"n": ["Spatial AI", "Spatial AI"], "q": 1}, {"n": ["ロボット活用", "Robotics"], "q": 1}, {"n": ["データセンター・GPU", "DC & GPU"], "q": 1}, {"n": ["音声AI・対話", "Voice AI"], "q": 1}, {"n": ["ドキュメントAI・IDP", "Document AI"], "q": 1}, {"n": ["ドメイン特化モデル", "Custom Models"], "q": 1}, {"n": ["クリエイティブ・マーケAI", "Creative AI"], "q": 1}, {"n": ["AIサービス事業化", "AI Service Biz"], "q": 1}]}, {"id": "Q-P12", "name": ["統制の実務", "Governance Practice"], "qn": 11, "unit": 1, "s": 16, "e": 16, "hub": "megatech", "cats": [{"n": ["概要", "Overview"], "q": 1}, {"n": ["ユースケースから引く", "By use case"], "q": 1}, {"n": ["図解", "Diagrams"], "q": 1}, {"n": ["インシデント事例", "Incidents"], "q": 1}, {"n": ["リスク評価実務（8行シート）", "Risk Sheet Practice"], "q": 1}, {"n": ["規制マップ", "Regulation map"], "q": 1}, {"n": ["業界別チェック", "Industry checks"], "q": 1}, {"n": ["ひな形", "Templates"], "q": 1}, {"n": ["ローコード統制", "Low-code governance"], "q": 1}, {"n": ["実務キット", "Practice kits"], "q": 1}, {"n": ["論点体系 S11×G16", "Issue Taxonomy S/G"], "q": 1}]}, {"id": "Q-P13", "name": ["変革の実務", "Transformation Practice"], "qn": 6, "unit": 1, "s": 11, "e": 11, "hub": "megatech", "cats": [{"n": ["I 役割の正体（3つの帽子）", "I Three Hats"], "q": 1}, {"n": ["II オペレーティングモデル6要素", "II Operating Model"], "q": 1}, {"n": ["III ADKAR 定着診断", "III ADKAR"], "q": 1}, {"n": ["IV デリバリーリードの5習慣", "IV Delivery Habits"], "q": 1}, {"n": ["V ベネフィット実現", "V Benefit Realization"], "q": 1}, {"n": ["VI データ人材の再設計", "VI Data Talent"], "q": 1}]}, {"id": "Q-P19", "name": ["ITセキュリティ基盤", "IT Security Foundations"], "qn": 8, "unit": 1, "s": 12, "e": 12, "hub": "megatech", "cats": [{"n": ["エンドポイント", "Endpoint"], "q": 1}, {"n": ["ID・アクセス", "Identity"], "q": 1}, {"n": ["ネットワーク境界", "Network"], "q": 1}, {"n": ["クラウドアクセス・SASE", "SASE"], "q": 1}, {"n": ["クラウド基盤", "Cloud"], "q": 1}, {"n": ["データ保護", "Data"], "q": 1}, {"n": ["監視・運用", "Operations"], "q": 1}, {"n": ["ガバナンス・フレームワーク", "Frameworks"], "q": 1}]}, {"id": "Q-P18", "name": ["業務再設計（BPR）", "Process Redesign (BPR)"], "qn": 7, "unit": 1, "s": 11, "e": 11, "hub": "megatech", "cats": [{"n": ["I 改善ロードマップ", "I Roadmap"], "q": 1}, {"n": ["II 消せる仕事10類型", "II Removable Work"], "q": 1}, {"n": ["III システム化の判定", "III System or Excel"], "q": 1}, {"n": ["IV 定着の構造", "IV Adoption"], "q": 1}, {"n": ["V KPIの付け替え", "V KPI Swap"], "q": 1}, {"n": ["VI 着手前の関門", "VI Gates"], "q": 1}, {"n": ["VII 横断8論点", "VII Eight Shifts"], "q": 1}]}, {"id": "Q-P14", "name": ["ファーム実務", "Global Firm Practice"], "qn": 4, "unit": 1, "s": 11, "e": 12, "hub": "megatech", "cats": [{"n": ["I 案件の入口2型", "I Deal Origination"], "q": 1}, {"n": ["II ラダーと昇進", "II Ladder & Promotion"], "q": 1}, {"n": ["III 面接想定問答5", "III Interview Q&A"], "q": 1}, {"n": ["IV 最初の90日", "IV First 90 Days"], "q": 1}]}, {"id": "Q-P15", "name": ["グローバル事例", "Global Cases"], "qn": 8, "unit": 1, "s": 12, "e": 12, "hub": "megatech", "cats": [{"n": ["I 事例11件（課題・打ち手・指標）", "I Eleven Cases"], "q": 1}, {"n": ["II 4つの型", "II Four Patterns"], "q": 1}, {"n": ["III 日本法人", "III The Japan Entity"], "q": 1}, {"n": ["IV 直近12か月の動き", "IV The last twelve months"], "q": 1}, {"n": ["V 会社そのもの（事実と出所）", "V The firm itself"], "q": 1}, {"n": ["VI 調査数値の扱い", "VI Handling Survey Figures"], "q": 1}, {"n": ["VII どの事例をどの問いに当てるか", "VII Which case answers which question"], "q": 1}, {"n": ["VIII 日本への翻訳の落とし穴", "VIII Translating to Japan"], "q": 1}]}, {"id": "Q-P16", "name": ["Slalom変革道場", "Slalom Dojo"], "qn": 5, "unit": 1, "s": 11, "e": 12, "hub": "megatech", "cats": [{"n": ["求められるスキル", "Skills"], "q": 1}, {"n": ["会社とTransformation", "Firm & practice"], "q": 1}, {"n": ["Slalomの事例", "Slalom cases"], "q": 1}, {"n": ["場面演習", "Scenario drills"], "q": 1}, {"n": ["90日計画・自己評価", "90 days & self-check"], "q": 1}]}, {"id": "Q-P17", "name": ["実務論点マップ", "Practice Issue Map"], "qn": 4, "unit": 1, "s": 9, "e": 9, "hub": "megatech", "cats": [{"n": ["論点マップ", "Issue map"], "q": 1}, {"n": ["統治の論点", "Governance"], "q": 1}, {"n": ["一次ソースと検証", "Sources & checks"], "q": 1}, {"n": ["記事エクスプローラ", "Articles"], "q": 1}]}, {"id": "Q-P8", "name": ["失敗学・事象", "Postmortems & Phenomena"], "qn": 13, "unit": 1, "s": 17, "e": 17, "hub": "megatech", "cats": [{"n": ["事象ファイル24", "Phenomena File"], "q": 1}, {"n": ["Zillow", "Zillow"], "q": 1}, {"n": ["Watson Health", "Watson Health"], "q": 1}, {"n": ["Air Canada", "Air Canada"], "q": 1}, {"n": ["McDonald's", "McDonald's"], "q": 1}, {"n": ["NYC MyCity", "NYC MyCity"], "q": 1}, {"n": ["Samsung", "Samsung"], "q": 1}, {"n": ["Amazon採用AI", "Amazon HR"], "q": 1}, {"n": ["英A-level", "UK A-levels"], "q": 1}, {"n": ["Avianca判例", "Avianca"], "q": 1}, {"n": ["Klarna", "Klarna"], "q": 1}, {"n": ["Bardデモ", "Bard demo"], "q": 1}, {"n": ["Deloitte豪", "Deloitte AU"], "q": 1}]}, {"id": "Q-P23", "name": ["AI出力品質", "AI Output Quality"], "qn": 14, "unit": 1, "s": 17, "e": 17, "hub": "megatech", "cats": [{"n": ["エグゼクティブサマリー", "Executive summary"], "q": 1}, {"n": ["分類フレーム", "Classification frame"], "q": 1}, {"n": ["領域別の特徴と事例", "Domains & cases"], "q": 1}, {"n": ["学習のどこで生まれるか", "Where it arises in training"], "q": 1}, {"n": ["人は見抜けるか", "Can people tell"], "q": 1}, {"n": ["時間変化（消える・残る・うつる）", "Change over time"], "q": 1}, {"n": ["参考動画と論文の検証", "Video vs. papers"], "q": 1}, {"n": ["社会・ビジネスの受け止め", "Public & business reaction"], "q": 1}, {"n": ["規制と検出技術", "Regulation & detection"], "q": 1}, {"n": ["他業界の事例", "Other industries"], "q": 1}, {"n": ["コンサルティングワーク", "Consulting work"], "q": 1}, {"n": ["成果物に残るAIの指紋", "AI fingerprints in deliverables"], "q": 1}, {"n": ["多レンズ評議", "Multi-lens council"], "q": 1}, {"n": ["企業への示唆", "Implications for firms"], "q": 1}]}, {"id": "Q-P9", "name": ["企業研究", "Company research"], "qn": 8, "unit": 1, "s": 18, "e": 19, "hub": "megatech", "cats": [{"n": [`企業研究${MQC.companies}社`, `${MQC.companies} Companies`], "q": 1}, {"n": ["比較表", "Compare"], "q": 1}, {"n": ["職種別攻略", "Roles"], "q": 1}, {"n": ["実装事例", "Cases"], "q": 1}, {"n": ["面接準備", "Interview"], "q": 1}, {"n": ["逆質問", "Ask them"], "q": 1}, {"n": ["日本市場ビュー", "JP Market"], "q": 1}, {"n": ["提供モデルの型", "Delivery Models"], "q": 1}]}, {"id": "Q-P20", "name": ["AGI・ASI", "AGI/ASI"], "qn": 5, "unit": 1, "s": 18, "e": 19, "hub": "megatech", "cats": [{"n": ["近未来レーダー", "Near-future Radar"], "q": 1}, {"n": ["I 変化の仮説8軸", "I Eight axes of change"], "q": 1}, {"n": ["II 仮説思考ドリル15問", "II Fifteen hypothesis drills"], "q": 1}, {"n": ["III シナリオマトリクス", "III Scenario matrix"], "q": 1}, {"n": ["IV 後悔しない6手", "IV Six no-regret moves"], "q": 1}]}, {"id": "Q-P22", "name": ["AIフォーサイト", "AI foresight"], "qn": 7, "unit": 1, "s": 18, "e": 19, "hub": "megatech", "cats": [{"n": ["マクロ・技術", "Macro & Technology"], "q": 1}, {"n": ["市場・エコシステム", "Market & Ecosystem"], "q": 1}, {"n": ["経営アジェンダ", "Client Agenda"], "q": 1}, {"n": ["フォーサイト技法", "Foresight Craft"], "q": 1}, {"n": ["情報源ライブラリ", "Source Library"], "q": 1}, {"n": ["月次メンテナンス", "Monthly Refresh"], "q": 1}, {"n": ["コレクション", "Collection"], "q": 1}]}, {"id": "Q-P21", "name": ["PLAYBOOK", "Playbook"], "qn": 8, "unit": 1, "s": 18, "e": 19, "hub": "megatech", "cats": [{"n": ["FIRST CALL", "FIRST CALL"], "q": 1}, {"n": ["PROPOSAL", "PROPOSAL"], "q": 1}, {"n": ["EXEC PITCH", "EXEC PITCH"], "q": 1}, {"n": ["ONBOARD 90", "ONBOARD 90"], "q": 1}, {"n": ["DAILY LOOP", "DAILY LOOP"], "q": 1}, {"n": ["POC DESIGN", "POC DESIGN"], "q": 1}, {"n": ["ADOPT 90", "ADOPT 90"], "q": 1}, {"n": ["POV", "POV"], "q": 1}]}],
  cons: [
    { id: "Q-CG", name: ["基礎暗記・用語辞典", "Basics/Glossary 167"], qn: 167, s: 1, e: 1, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 7, cats: [{n:["ロジカル","Logical"],q:22},{n:["クリティカル","Critical"],q:25},{n:["ラテラル","Lateral"],q:16},{n:["クリエイティブ","Creative"],q:17},{n:["構造化","Structuring"],q:21},{n:["DX","DX"],q:15},{n:["AI","AI"],q:15},{n:["論点思考","Issue"],q:18},{n:["仮説思考","Hypothesis"],q:18}] },
    { id: "Q-C0", name: ["ロジカル​シンキング", "Logical Thinking"], qn: 237, s: 1, e: 1, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 0, cats: [{n:["Lv1 基礎","Lv1 basics"],q:10},{n:["Lv2 標準","Lv2 core"],q:122},{n:["Lv3 応用","Lv3 applied"],q:70},{n:["Lv4 発展","Lv4 advanced"],q:35}] },
    { id: "Q-C1", name: ["クリティカル​シンキング", "Critical Thinking"], qn: 237, s: 2, e: 2, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 1, cats: [{n:["Lv1 基礎","Lv1 basics"],q:2},{n:["Lv2 標準","Lv2 core"],q:99},{n:["Lv3 応用","Lv3 applied"],q:101},{n:["Lv4 発展","Lv4 advanced"],q:35}] },
    { id: "Q-C2", name: ["ラテラル​シンキング", "Lateral Thinking"], qn: 237, s: 2, e: 2, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 2, cats: [{n:["Lv1 基礎","Lv1 basics"],q:2},{n:["Lv2 標準","Lv2 core"],q:136},{n:["Lv3 応用","Lv3 applied"],q:66},{n:["Lv4 発展","Lv4 advanced"],q:33}] },
    { id: "Q-C3", name: ["クリエイティブ​シンキング", "Creative Thinking"], qn: 237, s: 3, e: 3, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 3, cats: [{n:["Lv1 基礎","Lv1 basics"],q:8},{n:["Lv2 標準","Lv2 core"],q:151},{n:["Lv3 応用","Lv3 applied"],q:46},{n:["Lv4 発展","Lv4 advanced"],q:32}] },
    { id: "Q-C4", name: ["構造化", "Structuring"], qn: 237, s: 3, e: 3, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 4, cats: [{n:["Lv1 基礎","Lv1 basics"],q:4},{n:["Lv2 標準","Lv2 core"],q:121},{n:["Lv3 応用","Lv3 applied"],q:74},{n:["Lv4 発展","Lv4 advanced"],q:38}] },
    { id: "Q-C5", name: ["DX", "Digital Transformation"], qn: 237, s: 4, e: 4, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 5, cats: [{n:["Lv1 基礎","Lv1 basics"],q:11},{n:["Lv2 標準","Lv2 core"],q:105},{n:["Lv3 応用","Lv3 applied"],q:88},{n:["Lv4 発展","Lv4 advanced"],q:33}] },
    { id: "Q-C6", name: ["AI", "AI"], qn: 337, s: 4, e: 5, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 6, cats: [{n:["Lv1 基礎","Lv1 basics"],q:4},{n:["Lv2 標準","Lv2 core"],q:162},{n:["Lv3 応用","Lv3 applied"],q:131},{n:["Lv4 発展","Lv4 advanced"],q:40}] },
    { id: "Q-C7", name: ["論点思考", "Issue Thinking"], qn: 237, s: 5, e: 6, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, cats: [{"n": ["論点とは・問いの立て方", "What is an issue"], "q": 29}, {"n": ["問いを疑う", "Challenge the question"], "q": 29}, {"n": ["絞り込み", "Narrowing"], "q": 29}, {"n": ["構造化", "Structuring"], "q": 29}, {"n": ["区別と悪癖", "Distinctions & habits"], "q": 29}, {"n": ["AX商談の論点", "AX deal issues"], "q": 28}, {"n": ["業界シナリオ", "Industry scenarios"], "q": 28}, {"n": ["ケース総合", "Integrated cases"], "q": 29}, {"n": ["追加問題（2026-10）", "Added (2026-10)"], "q": 7}] },
    { id: "Q-C8", name: ["仮説思考", "Hypothesis Thinking"], qn: 237, s: 6, e: 7, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, cats: [{"n": ["仮説とは・言い切り", "What is a hypothesis"], "q": 29}, {"n": ["So What/Why So", "So what / why so"], "q": 29}, {"n": ["初期仮説", "Initial hypotheses"], "q": 29}, {"n": ["検証設計", "Test design"], "q": 29}, {"n": ["進化と棄却", "Evolve & discard"], "q": 29}, {"n": ["バイアス・悪癖", "Biases & habits"], "q": 28}, {"n": ["AX商談の仮説", "AX deal hypotheses"], "q": 28}, {"n": ["データ断片→仮説", "Fragments to hypothesis"], "q": 29}, {"n": ["追加問題（2026-10）", "Added (2026-10)"], "q": 7}] },
    { id: "Q-CX", name: ["紛らわしい・ケース", "Confusables/Cases 40"], qn: 40, s: 5, e: 5, hub: "consulting", qmile: true, mile: BOOTCAMP_QMILE, mk: "cons", mi: 7 },
  ],
};
// 任意学習（時間がある日だけ・スケジュール外の記録用）。週割りは持たず「随時」バンド。
// 各ハブの実セクション/分野をタスク化し、1つずつチェックして記録できる（進捗=チェック済/総数）。
// Book-Summary（OPT-BOOK）の課題一覧を本のデータから作り直した（2026-10）。旧一覧は重複・抜け・旧題名があった。
// チェックは通し番号（t0, t1, …）で保存されるので、旧番号→新番号の対応で一度だけ移し替える（-1 は対応なし）。
const OPT_BOOK_V1_TO_V2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,63,64,65,66,67,68,69,70,71,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,141,142,143,144,145,146,447,147,148,149,644,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,240,241,242,243,244,245,246,247,248,249,250,146,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,55,274,275,276,277,278,279,159,280,281,282,283,284,285,286,287,288,289,290,291,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,1023,549,550,551,552,553,554,52,555,72,1024,921,556,557,558,559,560,561,562,1025,174,563,1026,564,565,566,567,568,569,377,570,571,572,573,574,575,576,577,530,531,578,579,580,581,582,583,584,585,1027,175,153,586,53,587,588,431,589,831,590,591,1028,378,592,1029,593,594,532,595,73,596,597,598,1030,599,600,601,602,902,379,603,604,605,606,607,608,609,54,610,1031,611,612,380,623,624,141,176,625,626,903,381,627,628,629,630,631,904,632,633,905,634,1032,635,326,906,636,637,638,639,886,1033,640,641,642,752,751,930,614,832,177,342,643,892,644,178,645,179,533,180,646,647,907,648,649,650,651,181,652,653,654,922,833,1034,55,1035,1036,655,1037,353,182,656,923,156,382,657,658,56,659,660,661,414,662,534,224,663,664,665,834,666,667,668,669,670,671,672,673,674,835,183,535,836,675,184,846,676,677,74,160,536,678,679,908,837,680,383,32,909,681,765,807,910,911,838,912,843,185,615,537,961,682,683,684,759,913,685,186,686,687,688,689,690,691,692,839,914,1038,693,694,695,696,697,698,924,699,700,701,702,925,703,704,1039,727,728,295,729,187,730,731,732,57,718,1040,733,734,735,736,719,1041,720,737,75,738,739,740,741,742,721,188,616,743,1042,744,745,746,189,747,296,76,384,748,749,1043,750,145,722,751,752,1044,753,754,755,756,757,758,759,760,761,762,297,763,764,765,766,767,298,299,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,300,788,789,301,790,302,791,239,792,1045,303,793,304,794,305,795,796,723,797,798,799,800,801,306,802,803,804,805,307,190,806,915,807,808,809,810,811,812,813,814,815,140,816,817,818,819,820,821,538,822,823,824,825,826,827,828,829,830,852,853,854,100,926,855,856,1046,857,927,858,928,859,860,724,861,862,863,1047,929,864,865,866,867,868,840,869,870,871,872,58,930,873,874,875,59,60,876,877,878,879,880,881,882,883,931,884,885,932,886,887,933,725,934,61,935,888,889,890,891,892,936,893,894,895,896,897,62,841,539,842,308,938,843,939,937,844,726,617,385,940,941,942,943,309,540,77,845,846,541,191,618,386,847,944,916,848,945,542,192,619,849,850,620,946,543,947,544,193,194,948,949,851,950,951,952,545,953,954,955,956,957,958,621,546,959,547,960,961,962,963,195,964,965,966,967,968,969,970,971,972,973,548,974,387,975,976,388,977,978,979,980,981,622];
const migrateOptBook = (tasks) => {
  const cur = tasks && tasks["OPT-BOOK"];
  if (!cur || cur.v2) return tasks;
  const next = { v2: true };
  Object.keys(cur).forEach((k) => {
    const m = /^t(\d+)$/.exec(k);
    if (!m) { next[k] = cur[k]; return; }
    const j = OPT_BOOK_V1_TO_V2[+m[1]];
    if (cur[k] && j !== undefined && j >= 0) next["t" + j] = true;
  });
  return { ...tasks, "OPT-BOOK": next };
};
const BOOTCAMP_OPTIONAL = [
  { id:"OPT-FIN", opt:true, hub:"finance", to:"finance", name:["Finance Hub","Finance Hub"], meta:["金融×AI・20セクション/160レッスン","Finance × AI · 160 lessons"], tasks:[{"g":["財務会計","Financial Accounting"],"items":[["会計基礎","Basics"],["財務諸表","Statements"],["会計基準","Standards"],["高度論点","Advanced"],["連結会計","Consolidation"],["M&A会計","M&A Accounting"],["開示","Disclosure"]]},{"g":["管理会計・FP&A","Managerial Accounting & FP&A"],"items":[["CVP分析・損益分岐","CVP & Break-even"],["原価計算","Cost Accounting"],["予算・予実管理","Budgeting & Variance"],["ABC/ABM・配賦","ABC/ABM & Allocation"],["意思決定会計","Decision Accounting"],["KPI・業績管理","KPI & Performance"],["FP&A・予測","FP&A & Forecasting"],["AI効果の管理会計","AI Benefit Accounting"]]},{"g":["財務分析","Financial Analysis"],"items":[["収益性分析","Profitability"],["効率性分析","Efficiency"],["安全性分析","Safety/Liquidity"],["成長性分析","Growth"],["CF分析","Cash Flow"],["企業価値評価","Valuation"],["総合・比較分析","Integrated Analysis"],["AI提案への接続","AI Proposal Link"]]},{"g":["コーポレートファイナンス","Corporate Finance"],"items":[["貨幣の時間価値","Time Value of Money"],["資本コスト・CAPM","Cost of Capital / CAPM"],["投資判断","Capital Budgeting"],["資本構成","Capital Structure"],["配当・株主還元","Payout Policy"],["企業価値評価","Valuation"],["リスク管理","Risk Management"],["AI投資の評価","AI Investment Appraisal"]]},{"g":["CFO実務・戦略","CFO Practice & Strategy"],"items":[["財務戦略","Financial Strategy"],["資金調達","Funding"],["資本政策・還元","Capital Policy & Payout"],["M&A・FAS","M&A / FAS"],["予算・計画統括","Planning (FP&A)"],["ガバナンス・IR","Governance & IR"],["リスク・トレジャリー","Risk & Treasury"]]},{"g":["ベンチャーキャピタル","Venture Capital"],"items":[["VCエコシステム","VC Ecosystem"],["ファンド・LP/GP","Fund / LP-GP"],["投資ステージ","Investment Stages"],["スタートアップ評価","Startup Valuation"],["ディール・投資実行","Deal / Terms"],["投資後支援・ポートフォリオ","Portfolio Support"],["EXIT・回収","Exit / Returns"]]},{"g":["プライシング","Pricing"],"items":[["基礎・経済学","Fundamentals & Economics"],["価格戦略","Pricing Strategy"],["コストベース設定","Cost-based Pricing"],["価値ベース設定","Value-based Pricing"],["価格モデル・体系","Pricing Models"],["行動・心理的価格設定","Behavioral Pricing"],["価格管理・実行","Price Management"]]},{"g":["M&A（企業の合併・買収）","M&A (Mergers & Acquisitions)"],"items":[["M&A戦略・目的","M&A Strategy & Rationale"],["プロセス・ディール実務","Process & Deal Execution"],["デューデリジェンス","Due Diligence"],["バリュエーション","Valuation"],["ストラクチャー・スキーム","Structure & Scheme"],["会計・PPA","Accounting & PPA"],["PMI・統合","PMI & Integration"]]},{"g":["デューデリジェンス（DD）","Due Diligence (DD)"],"items":[["DD総論・目的・体制","DD Overview, Purpose & Setup"],["財務DD","Financial DD"],["税務DD","Tax DD"],["法務DD","Legal DD"],["商業・事業DD","Commercial DD"],["人事・IT・環境DD","HR / IT / EHS DD"],["発見事項の反映・報告","Findings, Reflection & Reporting"]]},{"g":["財務モデリング","Financial Modeling"],"items":[["モデリング総論・設計原則","Foundations & Design Principles"],["3表連動モデル","Three-Statement Model"],["予測ドライバー・前提","Forecast Drivers & Assumptions"],["DCF・バリュエーション","DCF & Valuation"],["LBO・レバレッジモデル","LBO & Leverage Modeling"],["感応度・シナリオ分析","Sensitivity & Scenario Analysis"],["ベストプラクティス・検証","Best Practices & Auditing"]]},{"g":["バリュエーション（企業価値評価）","Valuation"],"items":[["評価総論・アプローチ","Overview & Approaches"],["DCF法・FCF","DCF & Free Cash Flow"],["割引率・資本コスト","Discount Rate & Cost of Capital"],["類似会社・取引比較","Comparable Multiples"],["ターミナルバリュー・成長","Terminal Value & Growth"],["特殊・応用評価","Special & Advanced Valuation"],["実務調整・プレミアム/割引","Adjustments, Premia & Discounts"]]},{"g":["AIツール・AIエージェントのプライシング","AI Tool & Agent Pricing"],"items":[["課金モデル総論","Pricing Models Overview"],["原価・トークン経済","Cost & Token Economics"],["価値ベース価格・WTP","Value-Based Pricing & WTP"],["エージェント課金（従量/成果）","Agent Pricing (Usage/Outcome)"],["ユニットエコノミクス","Unit Economics"],["パッケージング・階層設計","Packaging & Tiering"],["GTM・収益運用","GTM & Revenue Operations"],["実例研究","Case Studies"],["買い手・調達交渉","Buyer & Procurement"],["収益・会計インパクト","Revenue & Accounting"]]},{"g":["事業再生（企業再生・ターンアラウンド）","Business Turnaround & Restructuring"],"items":[["危機の兆候・診断","Distress Signals & Diagnosis"],["原因分析・再生戦略","Root Cause & Turnaround Strategy"],["財務リストラクチャリング","Financial Restructuring"],["事業・組織リストラ","Operational & Org Restructuring"],["私的整理・法的整理","Out-of-Court & Legal Proceedings"],["再生計画・実行管理","Turnaround Plan & Execution"],["ステークホルダー調整","Stakeholder Management"]]},{"g":["PE投資先経営","PE Portfolio Company Management"],"items":[["ガバナンス・取締役会","Governance & Board"],["バリュークリエイション計画","Value Creation Plan"],["100日プラン・PMI初動","100-Day Plan / PMI"],["オペレーション改善","Operational Improvement"],["経営人材・インセンティブ","Talent & Incentives"],["資本管理・アドオン","Capital & Add-ons"],["モニタリング・Exit準備","Monitoring & Exit"]]},{"g":["事業戦略","Business Strategy"],"items":[["業界構造・5Forces","Industry Structure / 5 Forces"],["競争戦略・ポジショニング","Competitive Strategy / Positioning"],["資源・ケイパビリティ","Resources & Capabilities"],["成長戦略","Growth Strategy"],["全社戦略・PPM","Corporate Strategy / PPM"],["戦略実行・組織","Strategy Execution & Org"],["競争ダイナミクス","Competitive Dynamics"]]},{"g":["税務・法務・ガバナンス","Tax, Legal & Governance"],"items":[["法人税・税務実務","Corporate Tax"],["国際税務・移転価格","International Tax / TP"],["契約法務","Contract Law"],["会社法・M&A法務","Company Law / M&A"],["コンプライアンス・内部統制","Compliance & Controls"],["コーポレートガバナンス","Corporate Governance"],["開示・IR・規制","Disclosure & Regulation"]]},{"g":["統合・横断","Integrated / Cross-Domain"],"items":[["ディール横断","Cross-Deal"],["資本配分・全社財務","Capital Allocation"],["成長・投資判断","Growth & Investment"],["リスク・危機管理","Risk & Crisis"],["業績管理・FP&A横断","Performance / FP&A"],["ステークホルダー・開示","Stakeholder & Disclosure"],["CFOアジェンダ総合","CFO Agenda"]]},{"g":["ケース演習","Case Studies"],"items":[["M&A・買収ケース","M&A Cases"],["PE投資・VCケース","PE / Value Creation"],["事業再生ケース","Turnaround Cases"],["成長戦略ケース","Growth Strategy"],["資本政策・資金調達ケース","Capital & Financing"],["危機管理・リスクケース","Crisis & Risk"],["CFO総合判断ケース","CFO Judgment"]]},{"g":["簿記3級対策","Bookkeeping Level 3"],"items":[["簿記の基礎","Fundamentals"],["現金・預金","Cash & Deposits"],["商品売買","Merchandising"],["債権・債務","Receivables & Payables"],["固定資産","Fixed Assets"],["資本・税金","Capital & Taxes"],["決算手続","Closing Procedures"],["伝票・帳簿","Vouchers & Books"]]},{"g":["簿記2級対策","Bookkeeping Level 2"],"items":[["有価証券","Securities"],["固定資産","Fixed Assets"],["引当金","Provisions"],["税効果","Tax Effect"],["外貨建取引","Foreign Currency"],["株式会社会計","Corporate Equity"],["収益認識","Revenue Recognition"],["連結会計","Consolidation"],["銀行勘定調整","Bank Reconciliation"],["手形・債権","Notes & Receivables"],["決算・財務諸表","Closing & Statements"],["工業簿記・原価計算","Industrial / Cost Accounting"],["費目別計算","Cost Elements"],["個別原価計算","Job-Order Costing"],["総合原価計算","Process Costing"],["標準原価計算","Standard Costing"],["直接原価・CVP","Direct Costing / CVP"],["部門別計算","Departmental Costing"],["本社工場会計","HQ-Factory"],["製造原価報告書","Manufacturing Statement"]]}] },
  { id:"OPT-LANG", opt:true, hub:"languagehub", to:"languagehub", name:["Language Hub","Language Hub"],
    // 単語数と比較トピックは Language Hub のデータから数える（手書きだとスペイン語の基礎が500のまま残った）
    ...(() => {
      const P = LanguageHubModule.MQ_PLAN, v = P.vocab;
      const lang = (k, ja, en) => ({ g: [ja, en], items: [[`基礎${v[k + "_basic"]}（単語）`, `Basic ${v[k + "_basic"]}`], [`応用${v[k + "_adv"]}（単語）`, `Advanced ${v[k + "_adv"]}`],
        ["リスニング①音に浸る","Listen 1"],["リスニング②口に出す","Listen 2"],["リスニング③型を言語化","Listen 3"],["リスニング④書いて出す","Listen 4"],["クイズ","Quiz"],["文法 A1（表とドリル）","Grammar A1"],["文法 A2〜B1（表とドリル）","Grammar A2–B1"]] });
      const tasks = [lang("es", "スペイン語", "Spanish"), lang("de", "ドイツ語", "German"), lang("fr", "フランス語", "French"), { g: ["共通・比較対比", "Compare table"], items: P.compare }];
      const n = tasks.reduce((a, g) => a + g.items.length, 0);
      return { meta: [`西・独・仏／単語・聴解・文法・比較（${n}）`, `ES·DE·FR · ${n} units`], tasks };
    })() },
  { id:"OPT-LING", opt:true, hub:"linguisticshub", to:"linguisticshub", name:["Linguistics Hub","Linguistics Hub"], meta:["7カテゴリ・38分野","7 categories · 38 fields"], tasks:[{"g":["理論言語学","Theoretical"],"items":[["音声学","Phonetics"],["音韻論","Phonology"],["形態論","Morphology"],["統語論","Syntax"],["意味論","Semantics"],["語用論","Pragmatics"]]},{"g":["歴史・比較","Historical & Comparative"],"items":[["歴史言語学","Historical"],["比較言語学","Comparative"],["言語類型論","Typology"]]},{"g":["社会・文化","Social & Cultural"],"items":[["社会言語学","Sociolinguistics"],["人類言語学","Anthropological"],["方言学","Dialectology"]]},{"g":["心理・脳","Psycho & Neuro"],"items":[["心理言語学","Psycholinguistics"],["神経言語学","Neurolinguistics"],["第一言語習得","L1 Acquisition"],["第二言語習得","L2 Acquisition"]]},{"g":["計算言語学","Computational"],"items":[["コーパス言語学","Corpus"],["自然言語処理","NLP"],["音声言語処理","Speech"],["機械翻訳","Machine Translation"],["情報検索","Information Retrieval"],["LLM","LLM"],["知識表現","Knowledge Representation"]]},{"g":["応用言語学","Applied"],"items":[["言語教育","Language Education"],["翻訳","Translation"],["通訳","Interpretation"],["辞書学","Lexicography"],["言語テスト","Language Testing"],["法言語学","Forensic"],["医療・ビジネス言語","Medical & Business"]]},{"g":["学際・理論","Interdisciplinary"],"items":[["言語哲学","Philosophy of Language"],["認知言語学","Cognitive"],["生成文法","Generative Grammar"],["機能言語学","Functional"],["談話分析","Discourse Analysis"],["会話分析","Conversation Analysis"],["文体論","Stylistics"],["記号論","Semiotics"]]}] },
  { id:"OPT-BOOK", opt:true, hub:"booksummary", to:"booksummary", name:["Book-Summary","Book-Summary"], meta:(() => { const x = novaStats(), f = x.flier; return [`flier ${nf(f)}冊（1冊=1タスク）。YouTube ${nf(x.yt)}件・note ${nf(x.note)}件はハブ内のチェックで記録`, `flier ${nf(f)} books · 1 = 1 task; YouTube ${nf(x.yt)} & note ${nf(x.note)} are checked in the hub`]; })(), tasks:[{"g":["AI・DX｜AI","AI・DX / AI"],"items":["17万人をAI分析してわかった最強チームの条件を1冊にまとめてみた","2034 未来予測―AI（きみ）のいる明日","AI vs. 教科書が読めない子どもたち","AIが答えを出せない 問いの設定力","AIにはない「思考力」の身につけ方 ことばの学びはなぜ大切なのか？","AIのド素人ですが、10年後も仕事とお金に困らない方法を教えて下さい！最悪の未来でも自分だけが助かる本","AIエージェント革命「知能」を雇う時代へ","AIガバナンス入門 リスクマネジメントから社会設計まで","AI分析でわかった 仕事ができる人がやっている小さな習慣","AI分析でわかったトップ5%社員の時間術","AI分析でわかったトップ5%社員の習慣","AI分析でわかったトップ5%社員の読書術","AI分析でわかったトップ5％リーダーの習慣","AI時代を生き抜くための 仮説脳","ChatGPTの衝撃 AIが教えるAIの使い方","ChatGPT英語学習術 新AI時代の超独学スキルブック","「そろそろ生成AIを戦力化したい」社長のためのChatGPT経営入門","「わか者、ばか者、よそ者」はいちばん役に立つAI時代の創造的思考","「超」独学法 AI時代の新しい働き方へ","いまこそ知りたいＡＩビジネス","やりきる意思決定 生成AIという「人間を超える知性」を従える究極のビジネススキル","アナロジア AIの次に来るもの","アフターAI 世界の一流には見えている生成AIの未来地図","アフターChatGPT 生成AIが変えた世界の生き残り方","オードリー・タン デジタルとAIの未来を語る","ディープメディスン AIで思いやりのある医療を!","リーダーシップ進化論 人類誕生以前から、ＡＩ時代まで","一流のマネジャー945人をAI分析してわかった できるリーダーの基本","予測マシンの世紀 ＡＩが駆動する新たな経済","先読み！IT×ビジネス講座 画像生成AI","先読み！サイバーセキュリティ 生成AI時代の新たなビジネスリスク","強いLLMO AI検索で選ばれるためのマーケティングガイド","生成AI「戦力化」の教科書","生成AIが変える世界を紐解くINFRA MECHANISM -時代を生き残るための7つの戦略-","生成AIで世界はこう変わる","生成AI時代を勝ち抜く事業・組織のつくり方","生成AI最速仕事術","責任あるAI「AI倫理」戦略ハンドブック","運の技術 AI時代を生きる僕たちに必要なたった1つの武器","面倒な仕事が一瞬で片付く生成AIタスク爆速大全","５０００日後の世界 すべてがＡＩと接続された「ミラーワールド」が訪れる","ＡＩに負けない子どもを育てる","ＡＩに負けない自分で考える子どもを育てる２１世紀型教育","ＡＩに駆逐されない営業力 実践！インサイトセールス","ＡＩ時代の人生戦略 「ＳＴＥＡＭ」が最強の武器である","ＡＩ時代の子育て戦略","ＡＩ経営で会社は甦る","現代社会を生きるためのAI×哲学","シンキング・マシン 人工知能の脅威―コンピュータに「心」が宿るとき","AIライフハック","Gemini AI活用 最強の教科書","AIの時代に 頭がよくなる人 悪くなる人","AI DRIVEN AIで進化する人類の働き方","先読み！IT×ビジネス講座 ChatGPT 対話型AIが生み出す未来","２ヶ月で月30万円を実現する 超初心者でも稼げるAI活用法","人工知能はなぜ椅子に座れないのか 情報化社会における「知」と「生命」","友だち以上恋人未満の人工知能 言語学者のAI倫理ノート","大前研一 AI&フィンテック大全 「BBT×プレジデント」エグゼクティブセミナー選書Vol.10","ニュートン超図解新書 最強に面白い 人工知能 ディープラーニング編","はじめての機械学習 中学数学でわかるAIのエッセンス","教養としてのAI講義","ChatGPT快速仕事術（できるビジネス）","頭がいい人のChatGPT＆Copilotの使い方"]},{"g":["AI・DX｜DX","AI・DX / DX"],"items":["1冊目に読みたい DXの教科書","DXビジネスモデル 80事例に学ぶ利益を生み出す攻めの戦略","DX進化論 つながりがリブートされた世界の先","ゆるFIRE 億万長者になりたいわけじゃない私たちの投資生活","スケールフリーネットワーク ものづくり日本だからできるDX","デジタル人材がいない中小企業のためのDX入門","営業DX 売上増の無限ループを実現する","折れない心のつくり方 人生が変わる21日間プログラム","経済がわかれば最強! 実は大人も知らないことだらけ","IGPI流 DXのリアル・ノウハウ","未来IT図解 これからのDX（デジタルトランスフォーメーション）","未来化する社会 世界72億人のパラダイムシフトが始まった","コンテキストの時代 ウェアラブルがもたらす次の10年","アフターデジタル2 UXと自由","お金をドブに捨てないシステム開発の教科書 なぜ、要件定義がうまくいっても使えないシステムができてしまうのか？"]},{"g":["AI・DX｜Data","AI・DX / Data"],"items":["なぜデータ主義は失敗するのか？","クックパッドのデータ分析力","サーベイ・フィードバック入門","シグナル&ノイズ","チームワーキング","データで読み解く中国の未来","データの見えざる手","データサイエンスの基本","データサイエンス超入門","データサイエンティストが創る未来","データ・ドリブン・エコノミー","データ分析の力","データ思考入門","データ立国論","データ資本主義","ビッグデータ探偵団","マインドフルネスが最高の人材とチームをつくる","会社を強くするビッグデータ活用入門","売れない時代にすぐ売る技術","新しい階級社会","超監視社会","YOUR TIME（ユア・タイム）","教養としてのデータサイエンス"]},{"g":["経営・戦略｜戦略","経営・戦略 / 戦略"],"items":["40代がうまくいく人の戦略書","GAFA next stage ガーファ ネクストステージ 四騎士＋Xの次なる支配戦略","SOLO TIME（ソロタイム）「ひとりぼっち」こそが最強の生存戦略である","Yahoo! JapanのビッグデータとAIが教える21世紀の投資戦略","〔エッセンシャル版〕マイケル・ポーターの競争戦略","これからの都市ソフト戦略","つぶれない会社のリアルな経営経理戦略","なぜ、あの「音」を聞くと買いたくなるのか サウンド・マーケティング戦略","なぜ「戦略」で差がつくのか。戦略思考でマーケティングは強くなる","ひとり広報の戦略書","オウンドコミュニティ ファンと協働する新・マーケティング戦略のすべて","グロービス流 キャリアをつくる技術と戦略","ササる戦略","シャオミ 爆買いを生む戦略","ジャパネットたかた すごい戦略","スタートアップ的人生戦略","ストラテジック・イノベーション 戦略的イノベーターに捧げる10の提言","ハーバード戦略教室","フェイクニュース 新しい戦略的戦争兵器","ポジショニング戦略［新版］","ムダ0採用戦略 21世紀のつながり採用","ワイドレンズ イノベーションを成功に導くエコシステム戦略","一生役立つ独学戦略","人を動かすマーケティングの新戦略「行動デザイン」の教科書","会社を辞めないという選択 会社員として戦略的に生きていく","体力がない人の仕事の戦略","全社戦略がわかる","戦略「脳」を鍛える BCG流 戦略発想の技術","戦略的ストーリー思考入門","手書きの戦略論「人を動かす」7つのコミュニケーション戦略","無敗営業 チーム戦略","物語戦略","現代ロシアの軍事戦略","経営戦略の経済学","経営戦略全史〔完全版〕","経営戦略原論","考える。動く。自由になる。15歳からの人生戦略","課長から部長、そして役員へ 戦略的に出世する技術","間違いだらけのビジネス戦略","the four GAFA 四騎士が創り変えた世界"]},{"g":["経営・戦略｜経営戦略","経営・戦略 / 経営戦略"],"items":["1フレーズ経営学","CX(カスタマー・エクスペリエンス)戦略","KAIKAする経営","「好き嫌い」と経営","ロレックスの経営史 「ものづくり」から「ゆめづくり」へ","すべての働く人のための新しい経営学","世界トップ3の経営思想家による はじめる戦略","カゴメの人事改革 戦略人事とサステナブル人事による人的資本経営","ゼロからの経営戦略","プロ経営者・CxOになる人の絶対法則","マッキンゼー ボーダレス時代の経営戦略 2015年新装版","世界の経営学者はいま何を考えているのか 知られざるビジネスの知のフロンティア","両利きの経営(増補改訂版) 「二兎を追う」戦略が未来を切り拓く","両利きの経営 「二兎を追う」戦略が未来を切り拓く","再起を目指す経営者に贈る 会社の正しい終わらせ方","使える経営学","全員経営者マインドセット","市場を変えろ 既存産業で奇跡を起こす経営戦略","採用ファースト経営 中小企業の加速度的成長を可能にする超攻撃的「人財ファースト戦略」の全貌","楠木建の頭の中 戦略と経営についての論考","理念経営2.0 会社の「理想と戦略」をつなぐ7つのステップ","経営12カ条 経営者として貫くべきこと","経営とデザインの幸せな関係","経営センスの論理","経営参謀としての士業戦略 AI時代に求められる仕事","経営戦略4.0図鑑","経営戦略としての人的資本開示","経営戦略としての異文化適応力","経営理念の考え方・つくり方","経営者とは 稲盛和夫とその門下生たち","経営者のためのリベラルアーツ入門","職業としてのプロ経営者","キーエンス流 性弱説経営","なぜあなたはマネジメントを間違えるのか？：会社の常識を打ち破るチェンジリーダーの教科書","世界最高峰の経営教室","BCG経営コンセプト 構造改革編","ドラッカーから学ぶ多角化戦略 御社の閉塞感を打ち破る多角化手引書","パーパス 「意義化」する経済とその先","ビジネス思考実験 「何が起きるか？」を見通すための経営学１００命題","フラグメント化する世界 －GAFAの先へ－","ユニクロの仕組み化","企業変革のジレンマ 「構造的無能化」はなぜ起きるのか","持たざる経営の虚実 日本企業の存亡を分ける正しい外部化・内部化とは？","日本の中小企業 少子高齢化時代の起業・経営・承継","経営者のための正しい多角化論 世界が評価するコングロマリットプレミアム","見える化 強い企業をつくる「見える」仕組み","知識製造業の新時代","コカ・コーラ 叩き上げの復活経営","ドラッカー教授『現代の経営』入門","世界のエリートはなぜ「美意識」を鍛えるのか？ 経営における「アート」と「サイエンス」","トヨタ チーフエンジニアの仕事","トヨタの強さの秘密 日本人の知らない日本最大のグローバル企業","社長が3ヶ月不在でも成長する会社の作り方","自己破壊経営 ミクシィはこうして進化する","ベゾス・レター アマゾンに学ぶ14カ条の成長原則"]},{"g":["経営・戦略｜大全","経営・戦略 / 大全"],"items":["50冊のノウハウがこの1冊で！ あらゆるノート本、メモ本を試してみた！ 仕事と勉強にすぐに役立つ「ノート術」大全","「戦略」大全","ていねいな文章大全 日本語の「伝わらない」を解決する108のヒント","みんなのフィードバック大全","もっと自分を知って好きになる！ ポジティブ大全","アイデア大全 創造力とブレイクスルーを生み出す42のツール","アフターコロナのニュービジネス大全","アンガーマネジメント大全","セールスコピー大全 見て、読んで、買ってもらえるコトバの作り方","タイムマネジメント大全 24時間すべてを自分のために使う","ビジネス心理学大全","ブレインメンタル強化大全","プレイングマネジャーの「仕事の任せ方」大全","プレゼンの語彙力 おもしろいほど聞いてもらえる「言い回し」大全","マンガでよくわかる1on1大全","ライフハック大全 人生と仕事を変える小さな習慣250","リーダー1年目のマネジメント大全","一番大切なのに誰も教えてくれない メンタルマネジメント大全","人生が整うマウンティング大全","今やらないヤツはバカ！ 堀江貴文のChatGPT大全","住まい大全 ずっと快適な家の選び方、つくり方、暮らし方","入社1年目のビジネススキル大全","勉強大全 ひとりひとりにフィットする1からの勉強法","動画大全 「SNSの熱狂がビジネスの成果を生む」ショート動画時代のマーケティング100の鉄則","勝ち組企業の「ビジネスモデル」大全","図解ストレス解消大全 科学的に不安・イライラを消すテクニック100個集めました","地方創生大全","学びを結果に変える アウトプット大全","学び効率が最大化する インプット大全","成果・イノベーションを創出する ダイバーシティ・マネジメント大全","時間術大全 人生が本当に変わる「87の時間ワザ」","最少の努力で「トップ内定」し「仕事力」も高める 就活テクニック大全","東大式 記憶力超大全","株の爆益につなげる「暴落大全」","科学的に自分を思い通りに動かす セルフコントロール大全","科学的に実証された 超ダイエット習慣大全","経営改革大全","結果を出し続ける人が必ずやっている 「数学的」な仕事術大全","習慣超大全 スタンフォード行動デザイン研究所の自分を変える方法","起業大全 スタートアップを科学する9つのフレームワーク","超タイトル大全 文章のポイントを短く、わかりやすく伝える「要約力」が身につく","超ライティング大全 「バズる記事」にはこの1冊さえあればいい","知性大全","必読ベストセラーを超要約！ビジネス書大全 一生モノの仕事力が身につく名著100冊を1冊にまとめてみた"]},{"g":["ファイナンス","ファイナンス"],"items":["増補改訂版 道具としてのファイナンス","ゼロからわかるファイナンス思考 働く人と会社の成長戦略","ファイナンス思考 日本企業を蝕む病と、再生の戦略論","あれか、これか 「本当の値打ち」を見抜くファイナンス理論入門","コーポレートファイナンス 戦略と実践","決定版 銀行デジタル革命 現金消滅で金融はどう変わるか","ユーザーファースト 穐田誉輝とくふうカンパニー","物語でわかる ベンチャーファイナンス入門","新解釈 コーポレートファイナンス理論 「企業価値を拡大すべき」って本当ですか？","教養としての社会保障","一流の投資家はなぜ、メンタルを大切にするのか？","起業のファイナンス 増補改訂版 ベンチャーにとって一番大切なこと","マッキンゼー成熟期の成長戦略 2014年新装版","決定版FinTech 金融革命の全貌","コーポレート・ファイナンス CFOを志す人のために","会計の世界史 イタリア、イギリス、アメリカ――500年の物語","ビジネススクールで身につける 会計×戦略思考","餃子屋と高級フレンチでは、どちらが儲かるか？ 読むだけで「会計センス」が身につく本！","100円のコーラを1000円で売る方法","うまい棒は、なぜうまいのか？ 国民的ロングセラーの秘密","イノベーションのジレンマからの脱出 日本初のデジタルバンク「みんなの銀行」誕生の軌跡に学ぶ","ソフトウェア・ファースト あらゆるビジネスを一変させる最強戦略","リスクマネジメント 変化をとらえよ","不平等と再分配の経済学 格差縮小に向けた財政政策","世界基準の働き方 海外勤務を拒み続けた私が超巨大グローバル企業の幹部になれた理由","10年後の働き方 「こんな仕事、聞いたことない!」からイノベーションの予兆をつかむ","ADHDの僕が苦手とされる事務にとことん向き合ってみた。","FinTech入門 テクノロジーが推進する「ユーザー第一主義」の金融革命","NFTの教科書 ビジネス・ブロックチェーン・法律・会計まで デジタルデータが資産になる未来","VR for BUSINESS 売り方、人の育て方、伝え方の常識が変わる","「3か月」の使い方で人生は変わる Googleで学び、シェアNo.1クラウド会計ソフトfreeeを生み出した「3か月ルール」","お金の不安がなくなる小さな習慣 心と財布に余裕が生まれる88のヒント","これだけは知っておきたい「プレゼンテーション」の基本と常識 改訂新版","テレワークも業務改善もさっぱりわからない私に新しい働き方を教えてください！","企業変革の実務 いつ、何を、どの順番で行えば現場は動くか","会社は「本」で強くなる マネーフォワード 全社で取り組む「読書経営」","会社役員のための法務ハンドブック","僕たちがスタートアップした理由","図解 労務入門","対立を歓迎するリーダーシップ 組織のあらゆる困難・葛藤を力に変える","教養としてのお金とアート 誰でもわかる「新たな価値のつくり方」","新版 経営分析の基本","朝型勤務がダメな理由 あなたの睡眠を改善する最新知識","東大から刑務所へ","社員100人までの会社の「社長の仕事」","私の仕事 国連難民高等弁務官の10年と平和の構築","私の財産告白","賃金とは何か 職務給の蹉跌と所属給の呪縛","28歳からのリアル","88.68%勝てる営業 ペンタゴンで培われた世界最強の提案営業フレームワーク","AIビジネスチャンス 技術動向と事例に学ぶ新たな価値を生成する攻めの戦略","FP1級取得！サバンナ八木流 お金のガチを教えます","DIE WITH ZERO 人生が豊かになりすぎる究極のルール","【新NISA完全攻略】月5万円から始める「リアルすぎる」1億円の作り方","となりの億万長者が17時になったらやっていること","海外投資家に日本の不動産を売る方法","ビジネスエリートになるための 教養としての投資","金利を見れば投資はうまくいく 運用キャリア25年超のファンドマネージャーが教える","知的幸福の技術 自由な人生のための40の物語","日経マネーと正直FPが教える 一生迷わないお金の選択","年1時間で億になる投資の正解","保険ビジネス 契約者から専門家まで楽しく読める保険の教養","年間100万円の配当金が入ってくる 最高の株式投資","一歩踏み出せない人のための株式原論","大暴落前夜 狂宴バブル後の生き抜き方、資産の守り方","会社の値段【新版】","すみません、金利ってなんですか？","世界のお金持ちが実践するお金の増やし方","金融e時代 中国における金融デジタル化の現在と未来","世界最強の米国株で始める株の教科書"]},{"g":["マーケティング・営業｜マーケティング","マーケティング・営業 / マーケティング"],"items":["14のフレームワークで考える データ分析の教科書","3ヶ月で1万フォロワー・月10万円を叶える 革命的に稼げるインスタ運用法","AIに選ばれ、ファンに愛される。：変わる生活者とこれからのマーケティング","LTV(ライフタイムバリュー)の罠","MUJI式 世界で愛されるマーケティング","VTuberの教科書 - 準備、数字の作り方、マネタイズなど再現性の高い方法で成功を目指すビジネス","WE ARE LONELY, BUT NOT ALONE. 現代の孤独と持続可能な経済圏としてのコミュニティ","“未”顧客戦略：消費者の無関心から逃げない「記憶×習慣」の科学","「嵐」に学ぶマーケティングの本質","「新」富裕層ビジネスの教科書：1000人の富裕層から学んだ秘密の営業術とマーケティング術","【新】100円のコーラを1000円で売る方法","あのサービスはなぜ継続率が高いのか？","このオムライスに、付加価値をつけてください","この1冊ですべてわかる 新版 ブランディングの基本","すごいメモ。：仕事のスピード・質が劇的に上がる","すごい採用 考え方を変えれば採用はうまくいく","なぜ、カフェのコーヒーは「高い」と思わないのか？ 価格の心理学","なぜ、コメダ珈琲店はいつも行列なのか？","なぜあの商品、サービスは売れたのか？ トップマーケッターたちの思考","なぜ気づいたらドトールを選んでしまうのか？","アンパンマンと日本人","エスキモーに氷を売る 新版","カルビーお客様相談室 クレーム客をファンに変える仕組み","グロービス流ビジネス基礎力10 27歳からのMBA","サクッとわかるビジネス教養 行動経済学","シュガーマンのマーケティング30の法則 お客がモノを買ってしまう心理的トリガー[引き金]とは","ジョブ理論 イノベーションを予測可能にする消費のメカニズム","ストーリーとしての競争戦略 優れた戦略の条件","センスのよい考えには、「型」がある","タピオカ屋はどこへいったのか？ 商売の始め方と儲け方がわかるビジネスのカラクリ","デジタルマーケティング成功実例100","ナラティブカンパニー 企業を変革する「物語」の力","ニセコ化するニッポン","ファンダムマーケティング 「今日の売上」と「明日の売上」を両立させる","ファンベース 支持され、愛され、長く売れ続けるために","ブランディングの誤解","プロセスエコノミー あなたの物語が価値になる","マイノリティデザイン 「弱さ」を生かせる社会をつくろう","マッキンゼーで叩き込まれた超速フレームワーク","マーケティングを学んだけれど、どう使えばいいかわからない人へ","レシピ公開「伊右衛門」と絶対秘密「コカ・コーラ」、どっちが賢い？ 特許・知財の最新常識","世界は行動経済学でできている","世界最先端の研究が教える新事実 行動経済学BEST100","仕事の成果が上がる「自分ごと化」の法則","仕掛学 人を動かすアイデアのつくり方","博報堂スピーチライターが教える 5日間で言葉が「思いつかない」「まとまらない」「伝わらない」がなくなる本","営業してない相手から“契約したい”と言わせるマーケティングの全施策60","売る力 心をつかむ仕事術","売れる販売員が絶対言わない接客の言葉","平均4.2カ月で1万フォロワーを実現する プロ目線のインスタ運用法","影響力の武器［第三版］ なぜ、人は動かされるのか","恋愛結婚の終焉","戦わずして売る技術 クリック1つで市場を生み出す最強のWEBマーケティング術","競争としてのマーケティング","行動経済学が勝敗を支配する","行動経済学が最強の学問である","論点思考 BCG流問題設定の技術","買いたがる脳 なぜ、「それ」を選んでしまうのか？","超入門 コトラーの「マーケティング・マネジメント」","電通現役戦略プランナーのヒットをつくる「調べ方」の教科書 あなたの商品がもっと売れるマーケティングリサーチ術","革命のファンファーレ 現代のお金と広告","21世紀のビジネスにデザイン思考が必要な理由","27歳からのMBA：グロービス流リーダー基礎力10","BtoBマーケティングの定石 なぜ営業とマーケは衝突するのか？","USJを劇的に変えた、たった1つの考え方 成功を引き寄せるマーケティング入門","Z世代マーケティング 世界を激変させるニューノーマル","Z家族 データが示す「若者と親」の近すぎる関係","スターバックスはなぜ値下げもテレビCMもしないのに強いブランドでいられるのか？","急成長企業だけが実践するカテゴリー戦略 頭に浮かべば、モノは売れる","読まない人に、本を売れ。","たった1日で儲かる社長に生まれ変わる 非常識なマーケティング大全","「値づけ」の思考法 買いたくなる価格には必ず理由がある","価値創造の思考法","炎上とクチコミの経済学","FREE フリー ＜無料＞からお金を生み出す新戦略","全史×成功事例で読む 「マーケティング」大全","ヒットの崩壊","ファンをはぐくみ事業を成長させる 「コミュニティ」づくりの教科書","グロースハック 予算ゼロでビジネスを急成長させるエンジン"]},{"g":["マーケティング・営業｜営業","マーケティング・営業 / 営業"],"items":["AI分析でわかったトップ5%セールスの習慣","JALの心づかい グランドスタッフが実践する究極のサービス","SALES GROWTH セールス グロース","「忘れられないあの人」になる小さな習慣 TOP OF TOPの営業マンはこれをしていた","「男の色気」のつくり方","「聞き方」を変えればあなたの仕事はうまくいく","あなたの職場を憂鬱にする人たち","この1冊ですべてわかる コンサルティングの基本","なぜ、あの人は仕事ができるのか？","ふしぎな総合商社","アマゾン、ニトリ、ZARA・・・・・・ すごい物流戦略","エバンジェリストの仕事術 自分の価値を高め、市場で勝ち抜く","キーエンス 最強の働き方 新人からベテランまで、最短で成果を最大化するシンプルなルール","コンサルタントの「質問力」 「できる人」の隠れたマインド＆スキル","事例で学ぶ BtoBマーケティングの戦略と実践","トップ営業の気くばり 「あなたから買いたい」と言われる47の秘訣","ビジネススクール 意思決定入門","ファンに愛され、売れ続ける秘訣","世界一シンプルなモノの売り方","丸亀製麺はなぜNo.1になれたのか？ 非効率の極め方と正しいムダのなくし方","企画は、ひと言。 “今までにないもの”を生み出すシンプルな技術","会社に頼らないで一生働き続ける技術 「生涯現役」40歳定年のススメ","論破力","値上げのためのマーケティング戦略 まだ価格競争で勝負するのか？","営業の科学 セールスにはびこるムダな努力・根拠なき指導を一掃する","売上最小化、利益最大化の法則 利益率29%経営の秘密","強い会社はどんな営業をやっているのか？","成毛流「接待」の教科書 乾杯までに9割決まる","戦略的、めんどうな人の動かし方","新時代の営業「変わること」「変わらないこと」を1冊にまとめてみた","普通の人でも確実に成果が上がる営業の方法","楽天IR戦記 「株を買ってもらえる会社」のつくり方","江副浩正","決定版「稼げる営業」と「ダメ営業」の習慣","注文をまちがえる料理店","無駄ゼロ、生産性を3倍にする 最速で仕事が終わる人の時短のワザ","目標を「達成する人」と「達成しない人」の習慣","目標を「達成できる人」と「できない人」の習慣","神モチベーション「やる気」しだいで人生は思い通り","職場の人間関係 防災ガイド","運転者 未来を変える過去からの使者","電子部品 営業利益率20%のビジネスモデル","営業はいらない"]},{"g":["組織・人材","組織・人材"],"items":["1on1 ミーティング 「対話の質」が組織の強さを決める","CHANGE 組織はなぜ変われないのか","OPEN 「開く」ことができる人・組織・国家だけが生き残る","STARTUP スタートアップ アイデアから利益を生みだす組織マネジメント","THE HOPE 50歳はどこへ消えた？ 半径3メートルの幸福論","freee 成長しまくる組織のつくりかた","「人事のプロ」はこう動く","いい人材が集まる、性格のいい会社 「こんな会社で働きたい！」と思ってもらえる、マネジメントのしかけ","いちばんやさしい「組織開発」のはじめ方","いつだってこんなリーダーが組織を蘇らせる","すべての組織は変えられる 好調な企業はなぜ「ヒト」に投資するのか","だから僕たちは、組織を変えていける","だけどチームがワークしない","なぜ日本企業は勝てなくなったのか 個を活かす「分化」の組織論","なぜ部下とうまくいかないのか","はじめての経営組織論","まちがえない採用 予算ゼロでも最高の人材が採れる","ヤフーとその仲間たちのすごい研修 リーダーをつくれ！ 前代未聞の３１人の冒険","インサイド・アップル","ウィニングカルチャー 勝ちぐせのある人と組織のつくり方","エンジニアリング組織論への招待 不確実性に向き合う思考と組織のリファクタリング","カイシャがなくなる日","カゴメの人事改革","カルチャーモデル 最高の組織文化のつくり方","コンサルタントの教科書 決定版 年間報酬３０００万円越えが１０年続く","シン・人事の大研究","ジョブ型人事の道しるべ","ジョブ型人事制度の教科書 日本企業のための制度構築とその運用法","スマホ時代の哲学 失われた孤独をめぐる冒険","スーパーチームをつくる！最短・最速で目標を達成する組織マネジメント","タレントマネジメント入門 個を活かす人事戦略と仕組みづくり","ダイアローグ 価値を生み出す組織に変わる対話の技術","チームワークの大原則 「あなたが主役」で組織が変わる","ティール組織 マネジメントの常識を覆す次世代型組織の出現","トップも知らない星野リゾート 「フラットな組織文化」で社員が勝手に動き出す","パナソニック人事抗争史","ピープルアナリティクスの教科書 組織・人事データの実践的活用法","ブレない自分をつくる「古典」読書術","プロデューサーシップ 創造する組織人の条件","ベンチャー人事のすごい仕組み","アクション・バイアス 自分を変え、組織を動かすためになすべきこと","THE HOPE 50歳はどこへ消えた？","リクルート・イズム イノベーションを起こした25人の軌跡","世界の一流は「部下」に何を教えているのか","世界標準の経営理論","異なる人と「対話」する 本気のダイバーシティ経営","人を導く最強の教え『易経』 「人生の問題」が解決する64の法則","人事こそ最強の経営戦略","人事で一番大切なこと","人事の組み立て 脱日本型雇用のトリセツ","人事の超プロが明かす評価基準 「できる人」と「認められる人」はどこが違うのか","人事よ、ススメ！ 先進的な企業の「学び」を描く「ラーニングイノベーション論」の12講","人口蒸発「5000万人国家」日本の衝撃","人的資本の活かしかた 組織を変えるリーダーの教科書","人的資本経営時代の持続可能な働き方","他者と働く 「わかりあえなさ」から始める組織論","会社を絶対潰さない 組織の強化書","偉大な組織の最小抵抗経路 リーダーのための組織デザイン法則","全員の才能を極大化する 最高の組織","図解 人材マネジメント入門 人事の基礎をゼロからおさえておきたい人のための「理論と実践」１００のツボ","図解でわかる！戦略的人事制度のつくりかた","売れる組織 売れる営業","多様性って何ですか？ D&I、ジェンダー平等入門","女性活躍から始める人的資本経営","強い組織は違いを楽しむ","強みを活かす","戦略を形にする思考術 レゴ（Ｒ）シリアスプレイ（Ｒ）で組織はよみがえる","文字と組織の世界史 新しい「比較文明史」のスケッチ","日本の人事を科学する 因果推論に基づくデータ活用","日本企業の社員は、なぜこんなにもモチベーションが低いのか？","日本型組織 存続の条件","日本型組織の病を考える","明治製菓カカオ事業部 逆境からの下剋上","物語思考","組織にいながら、自由に働く。","組織の体質を現場から変える100の方法","組織の未来はエンゲージメントで決まる","組織は変われるか 経営トップから始まる「組織開発」","組織不正はいつも正しい ソーシャル・アバランチを防ぐには","組織開発の探究 理論に学び、実践に活かす","職場で傷つく リーダーのための「傷つき」から始める組織開発","職場学習論 新装版 仕事の学びを科学する","若者が去っていく職場","藁を手に旅に出よう 『伝説の人事部長』による「働き方」の教室","要領よく出世する人 元・外資系人事部長が見た","課長の心得","起業するならもっと数字で考えなきゃ！ 黒字起業家の言葉 赤字起業家の発想","超チーム力 会社が変わる シリコンバレー式組織の科学","鈴木敏文 孤高","それ、パワハラですよ？","チームが「まとまるリーダー」と「バラバラのリーダー」の習慣","人が壊れるマネジメント","部下をもったらいちばん最初に読む本","静かな退職という働き方","なぜ部下は不安で不満で無関心なのか","デンマーク人はなぜ会議より３分の雑談を大切にするのか","プレイングマネジャーの基本","増補改訂版 ヤフーの1on1","ミネルバ式 最先端リーダーシップ 不確実な時代に成果を出し続けるリーダーの18の思考習慣","ミンツバーグの組織論 7つの類型と力学、そしてその先へ","新版 マネジメントの基本","ファシリテーションの教科書 組織を活性化させるコミュニケーションとリーダーシップ","学びを最大化するTTPSマネジメント","採用学","業績を最大化させる 現場が動くマネジメント","罰ゲーム化する管理職 バグだらけの職場の修正法","LGBTとハラスメント","最高のリーダーは、チームの仕事をシンプルにする","リモートマネジメントの教科書","これ１冊でまるわかり！ 必ず成功する外国人雇用","うまくいくリーダーだけが知っていること","TALENT 「人材」を見極める科学的なアプローチ","爆速成長マネジメント","急成長を導くマネージャーの型 地位・権力が通用しない時代の「イーブン」なマネジメント","増補版 駆け出しマネジャーの成長論 7つの挑戦課題を「科学」する","世界最高のコーチ 「個人の成長」を「チームの成果」に変えるたった2つのマネジメントスキル","ダイバーシティ・女性活躍はなぜ進まない？ 組織の成長を阻む性別ガチャ克服法"]},{"g":["起業・イノベーション","起業・イノベーション"],"items":["2020年6月30日にまたここで会おう 瀧本哲史伝説の東大講義","2025年を制覇する破壊的企業","2035 10年後のニッポン ホリエモンの未来予測大全","2060 未来創造の白地図 人類史上最高にエキサイティングな冒険が始まる","5年後メディアは稼げるか MONETIZE OR DIE？","9プリンシプルズ 加速する未来で勝ち残るために","HARD THINGS 答えがない難問と困難にきみはどう立ち向かうか","NETFLIX コンテンツ帝国の野望 GAFAを超える最強IT企業","SHOE DOG（シュードッグ） 靴にすべてを。","Simple「簡潔さ」は最強の戦略である","THINK BIGGER 「最高の発想」を生む方法 コロンビア大学ビジネススクール特別講義","UXの時代 IoTとシェアリングは産業をどう変えるのか","「感動体験」で外食を変える 丸亀製麺を成功させたトリドールの挑戦","お金が教えてくれること マイクロ起業で自由に生きる","はじめる力","アイデアをお金に変える「マネタイズ」ノート","イーロン・マスク 未来を創る男","エヌビディア　半導体の覇者が作り出す2040年の世界","クリティカル・ビジネス・パラダイム　社会運動とビジネスの交わるところ","シン・サウナ　人生は自分の“好き”でデザインできる","シン・ニホン　AI×データ時代における日本の再生と人材育成","センスは知識からはじまる","ソニー再生 変革を成し遂げた「異端のリーダーシップ」","パラダイムシフト 新しい世界をつくる本質的な問いを議論しよう","ビジネスの未来 エコノミーにヒューマニティを取り戻す","ビジネスを変える100のブルーオーシャン","ビジネスモデル3.0図鑑","ビジネスモデル全史〔完全版〕","フローとストック 世界の先が読める「思考」と「知識」の法則","ユダヤの商法 世界経済を動かす","ユダヤ人大富豪の教え 幸せな金持ちになる17の秘訣","リブセンス＜生きる意味＞ 25歳の最年少上場社長 村上太一の人を幸せにする仕事","リーン・スタートアップ ムダのない起業プロセスでイノベーションを生みだす","ローソン","世界「倒産」図鑑 波乱万丈25社でわかる失敗の理由","世界「失敗」製品図鑑 「攻めた失敗」20例でわかる成功への近道","世界は法律でできている 弁護士ドットコムの奮闘とこれから","事業計画の極意　仮説と検証で描く成長ストーリー","創造的破壊の力　資本主義を改革する22世紀の国富論","半歩先を読む思考法","図解 イノベーション入門：新しい価値が生まれる仕組みを学びたい人のための「理論と実践」100のツボ","天才読書：世界一の富を築いたマスク、ベゾス、ゲイツが選ぶ100冊","将来の夢なんか、いま叶えろ。堀江式・実践型教育革命","感性思考 デザインスクールで学ぶMBAより論理思考より大切なスキル","教養としてのコンピューターサイエンス講義 今こそ知っておくべき「デジタル世界」の基礎知識","新時代を生き抜く越境思考 組織、肩書、場所、時間から自由になって成長する","新規事業ワークブック","未来がヤバい日本でお金を稼ぐとっておきの方法 お金と働き方の常識をアップデートせよ","森岡毅 必勝の法則 逆境を突破する異能集団「刀」の実像","模倣と創造 13歳からのクリエイティブの教科書","直感と論理をつなぐ思考法 VISION DRIVEN","知識創造企業エーザイ「生き方」の経営：hhc企業への自己革新と社会的価値創造の「物語り」","社長がつまずくすべての疑問に答える本","経営中毒 社長はつらい、だから楽しい","論語と算盤 モラルと起業家精神","豊田章男","走りながら考える 新規事業の教科書","起業の科学 スタートアップサイエンス","起業家のように企業で働く","起業家のモノサシ：藤田田「ユダヤの商法」著者が残した新規ビジネスの超発想","起業家の思考法 「別解力」で圧倒的成果を生む問題発見・解決・実践の技法","超影響力 歴史を変えたインフルエンサーに学ぶ人の動かし方","逆・タイムマシン経営論 近過去の歴史に学ぶ経営知","非常識な「ハイブリッド仕事論」","ユニクロ","ゼロからはじめる力 空想を現実化する僕らの方法","繁栄のパラドクス 絶望を希望に変えるイノベーションの経済学","アート思考 ビジネスと芸術で人々の幸福を高める方法","世界一の馬をつくる チームノースヒルズの飽くなき挑戦","シュンペーター 経済発展の理論（初版）","365日 #Tシャツ起業家 「食べチョク」で食を豊かにする農家の娘","QRコードの奇跡 モノづくり集団の発想転換が革新を生んだ","ボールド 突き抜ける力 超ド級の成長と富を手に入れ、世界を変える方法","アフリカで超人気の日本企業 アフリカビジネスで急成長！ビィ・フォアードの成功哲学"]},{"g":["言語・思考","言語・思考"],"items":["頭のいい人は「考え方の型」がある！ 13歳からの論理的思考","14歳からの社会学 これからの社会を生きる君に","Chatter（チャッター） 「頭の中のひとりごと」をコントロールし、最良の行動を導くための26の方法","Life Kinetik 脳が活性化する世界最先端の方法","「好き」を言語化する技術 推しの素晴らしさを語りたいのに「やばい！」しかでてこない","「答えのないゲーム」を楽しむ 思考技術","「説明」がうまい人がいつも頭においていること","「超」メタ思考 頭がよくなる最強トレーニング57連発","あなたの「言語化」で部下が自ら動き出す 「紙1枚！」マネジメント","こうやって頭のなかを言語化する。","すべては「好き嫌い」から始まる 仕事を自由にする思考法","なぜ4人以上の場になると途端に会話が苦手になるのか","なぜ、あの人の言葉は心に響くのか 感情を自在に言語化する技術","はじめての言語ゲーム","まっすぐ考える 考えた瞬間、最良の答えだけに向かう頭づくり","まどわされない思考 非論理的な社会を批判的思考で生き抜くために","アオアシに学ぶ「考える葦」の育ち方 カオスな環境に強い「頭のよさ」とは","エマニュエル・トッドの思考地図","オードリー・タン 私はこう思考する","クオンタム思考 テクノロジーとビジネスの未来に先回りする新しい思考法","ネガティブ思考こそ最高のスキル","パンチラインの言語学","ヒトの言葉 機械の言葉 「人工知能と話す」以前の言語学","プレゼン思考","プロ投資家の先の先を読む思考法","メタ思考 「頭のいい人」の思考法を身につける","メンバーの頭を動かし顧客を創造する 会議の強化書","モヤモヤを言葉に変える「言語化」講座","ユダヤ式Ｗｈｙ思考法","ルールを変える思考法","一生頭がよくなり続ける もっとすごい脳の使い方","一生頭がよくなり続ける すごい脳の使い方","今すぐ結果が出る 1ページ思考","伝わる言語化 自分だけの言葉で人の心を動かすトレーニング","分類脳で地アタマが良くなる 頭の中にタンスの引き出しを作りましょう","勝間式超コントロール思考","哲学の世界へようこそ。 答えのない時代を生きるための思考法","問うとはどういうことか 人間的に生きるための思考のレッスン","壁打ちは最強の思考術である","妄想する頭 思考する手 想像を超えるアイデアのつくり方","宇宙思考","実験思考 世の中、すべては実験","対比思考 最もシンプルで万能な頭の使い方","幸せになるマイナス思考","忘却の整理学","忘我思考 一生ものの「問う技術」","思考のストレッチ","思考の技法","思考の整理学","思考の質を高める 構造を読み解く力","思考力の地図 論理とひらめきを使いこなせる頭のつくり方","悩まず、いい選択ができる人の頭の使い方","新版 思考の整理学","書く瞑想 １日15分、紙に書き出すと頭と心が整理される","最強の思考法 「抽象化する力」の講義","構造化思考のレッスン","武器としての漫画思考","水平思考の世界 固定観念がはずれる創造的思考法","瞬時に「言語化できる人」が、うまくいく。","職場で、人前で自分を出せない人のための ブレイクセルフ 自分を変える思考法","脳を最適化すれば能力は2倍になる","英語が日本語みたいに出てくる 頭のつくり方","裸眼思考","言葉にする習慣 思いがまとまる・伝わる「言語化力」の身につけ方","言語化するための小説思考","言語化の魔力　言葉にすれば「悩み」は消える","言語化力","言語学バーリ・トゥード　Round 1 AIは「絶対に押すなよ」を理解できるか","論理的思考とは何か","論理的思考力を鍛える33の思考実験","頭と心がすっきりする書く習慣","頭のいい人が話す前に考えていること","頭のいい人だけが解ける論理的思考問題","頭のいい人の対人関係 誰とでも対等な関係を築く交渉術","頭のいい人は「短く」伝える","頭のいい人は「答え方」で得をする","頭のよさとは何か","頭のよさは国語力で決まる","頭の中がどんどん言葉になる 瞬間言語化トレーニング","頭は「本の読み方」で磨かれる","１分で頭の中を片づける技術","１日３時間だけ働いて おだやかに暮らすための思考法","「説明が上手い人」がやっていることを1冊にまとめてみた","さりげなく・嫌われずに「言い返す」力がつく本","なぜか好かれる人の小さな習慣","なぜか好かれる「人前での話し方」","イシューからはじめよ［改訂版］","バナナの魅力を100文字で伝えてください","上手に「説明できる人」と「できない人」の習慣","人は話し方が9割 2","人は話し方が9割","仕事は心理戦が９割","頭のいい説明「すぐできる」コツ","うまく「聞ける人」と「聞けていない人」の習慣","世界のトップリーダーが話す1分前までに行っていること","全解説 英語革命2020","世界で活躍する子の〈英語力〉の育て方","英語は10000時間でモノになる ハードワークで挫折しない「日本語断ち」の実践法","新しい英語力の教室 同時通訳者が教える本当に使える英語術","理想のリスニング 「人間的モヤモヤ」を聞きとる英語の世界","不器用だった僕がたどり着いた「伝え方」の本質","論理的思考のコアスキル","会話の0.2秒を言語学する","本質をつかむ"]},{"g":["政治・経済・グローバル","政治・経済・グローバル"],"items":["民主主義とは何か","超新版ティッピング・ポイント 世の中を動かす「裏の三原則」","食の歴史","感染症の世界史","THE LAST GIRL イスラム国に囚われ、闘い続ける女性の物語","要点解説 ９０分でわかる！ビジネスマンのための「世界の宗教」超入門","歴史","世界インフレ時代の経済指標","世界のビジネスエリートが大注目! 教養として知りたい日本酒","人生を面白くする 本物の教養","グレート・リセット ダボス会議で語られるアフターコロナの世界","絶望しかけた女子のための世界史","差別と資本主義 レイシズム・キャンセルカルチャー・ジェンダー不平等","ウクライナ戦争と世界のゆくえ","ヤバすぎる経済学","世界の今がわかる「地理」の本","テクノロジーの地政学 シリコンバレー vs 中国、新時代の覇者たち","一気読み世界史","ビジネスエリートが知っている 教養としての日本酒","2050年の世界 英『エコノミスト』誌は予測する","「探究」する学びをつくる 社会とつながるプロジェクト型学習","「選択的シングル」の時代 30カ国以上のデータが示す「結婚神話」の真実と「新しい生き方」","TRUST 世界最先端の企業はいかに〈信頼〉を攻略したか","ウェルビーイング","サピエンス全史（下） 文明の構造と人類の幸福","サピエンス全史（上） 文明の構造と人類の幸福","やっぱりすごいよ、日本人","教養としてのワインの世界史","ぼくはイエローでホワイトで、ちょっとブルー 2","こどもと民主主義をつくる 教育にできること","AIの仮面を剥いでやる AIに潜む差別・偏見との闘い","中東 エネルギー 地政学 全体知への体験的接近","菊とポケモン グローバル化する日本の文化力","2030年 ジャック・アタリの未来予測 不確実な世の中をサバイブせよ！","身銭を切れ 「リスクを生きる」人だけが知っている人生の本質","緊急提言 パンデミック 寄稿とインタビュー","日本経済の死角 収奪的システムを解き明かす","未来の年表2 人口減少日本であなたに起きること","知ってはいけない 隠された日本支配の構造","これからの「正義」の話をしよう いまを生き延びるための哲学","親子で学ぶ どうしたらお金持ちになれるの？ 人生という「リアルなゲーム」の攻略法","未来の年表 業界大変化 瀬戸際の日本で起きること","生き抜くためのドストエフスキー入門「五大長編」集中講義","海の地政学 海軍提督が語る歴史と戦略","孟子","大きなシステムと小さなファンタジー","日本社会のしくみ 雇用・教育・福祉の歴史社会学","同調圧力の正体","僕らはそれに抵抗できない 「依存症ビジネス」のつくられかた","大学4年間の経済学が10時間でざっと学べる","実力も運のうち 能力主義は正義か？","科学的根拠（エビデンス）で子育て 教育経済学の最前線","未来の年表 人口減少日本でこれから起きること","現代戦争論 ロシア・ウクライナから考える世界の行方","日本再興戦略","教養としての「地政学」","サクッとわかるビジネス教養 いちばんわかる半導体","客観性の落とし穴","ぼくはイエローでホワイトで、ちょっとブルー","ニュースで学べない日本経済","池上彰の未来予測 After 2040","予想どおりに不合理 行動経済学が明かす「あなたがそれを選ぶわけ」","嫉妬論 民主社会に渦巻く情念を解剖する","世界のニュースがわかる！【図解】地政学入門","レジリエンスとは何か 何があっても折れないこころ、暮らし、地域、社会をつくる","危機の時代 伝説の投資家が語る経済とマネーの未来","ニッポン華僑１００万人時代 新中国勢力の台頭で激変する社会","渋沢百訓 論語・人生・経営","ブルシット・ジョブの謎 クソどうでもいい仕事はなぜ増えるか","ウクライナ戦争","「家族の幸せ」の経済学 データ分析でわかった結婚、出産、子育ての真実","それをお金で買いますか 市場主義の限界","結婚と家族のこれから 共働き社会の限界","世界は贈与でできている 資本主義の「すきま」を埋める倫理学","なぜ、残業はなくならないのか","「感情」の地政学 恐怖・屈辱・希望はいかにして世界を創り変えるか","ほんとうの日本経済 データが示す「これから起こること」","「学力」の経済学","一九八四年 ［新訳版］","９９％の日本人がわかっていない 国債の真実","社会の価値の測り方 「見える化」で地域を豊かにする","フェミニズム","ＧＰＩＦ 世界最大の機関投資家","22世紀の民主主義 選挙はアルゴリズムになり、政治家はネコになる","お金のむこうに人がいる 元ゴールドマン・サックス金利トレーダーが書いた予備知識のいらない経済新入門","21世紀の資本","お金の流れで読む日本と世界の未来 世界的投資家は予見する","サクッとわかる ビジネス教養 地政学","あの国の「なぜ？」が見えてくる世界経済地図","NUDGE 実践 行動経済学 完全版","FACTFULNESS 10の思い込みを乗り越え、データを基に世界を正しく見る習慣","イランとアメリカ、そしてイスラエル 「ガザ以後」の中東","2040年の日本","きみのお金は誰のため ボスが教えてくれた「お金の謎」と「社会のしくみ」","NEXUS 情報の人類史 下 AI革命","2050年の世界 見えない未来の考え方","21 Lessons 21世紀の人類のための21の思考","NEXUS 情報の人類史 上 人間のネットワーク","2040年の未来予測","2030年 すべてが「加速」する世界に備えよ","2時間de資源史","13歳からの地政学 カイゾクとの地球儀航海","AIとBIはいかに人間を変えるのか","お金2.0 新しい経済のルールと生き方","大前研一 日本の論点2025-26","タイパの経済学","世界史の構造的理解 現代の「見えない皇帝」と日本の武器","幸せとお金の経済学","戦後とは何か 上下 政治学と歴史学の対話","政治学（上）","民主主義の死に方 二極化する政治が招く独裁への道","移民の政治経済学","資本主義と、生きていく。 歴史と思想で解き明かす「構造的しんどさ」の正体","幼児教育の経済学","資本論（1）","入門経済学 第4版","純粋機械化経済（上）（下） 頭脳資本主義と日本の没落","脱プラスチックへの挑戦 持続可能な地球と世界ビジネスの潮流","新・生産性立国論","日本人の勝算 人口減少×高齢化×資本主義","デジタル・デモクラシー ビッグ・テックを包囲するグローバル市民社会","コーヒーで読み解くＳＤＧｓ","2050 近未来シミュレーション日本復活","［データブック］近未来予測2025","経済成長という呪い 欲望と進歩の人類史"]},{"g":["サイエンス・リベラルアーツ","サイエンス・リベラルアーツ"],"items":["考えすぎる脳、楽をしたい遺伝子","日本神話の源流","科学が教える、子育て成功への道 強いココロと柔らかいアタマを持つ「超」一流の子を育てる","知ってるつもり 無知の科学","数学×思考＝ざっくりと いかにして問題をとくか","精神科医が見つけた3つの幸福 最新科学から最高の人生をつくる方法","空気を読む脳","脳の闇","自分をコントロールする力 非認知スキルの心理学","科学的に元気になる方法集めました","読むだけで数字センスがみるみるよくなる本","夜空を見上げてしまうほどワクワクする 東大研究員がゼロから考えてみた「宇宙の常識」","脳科学でわかった 仕事のストレスをなくす本","立て直す力 感情を自覚し、整理し、人生を変える3ステップ","暮らしのなかのニセ科学","津田梅子 科学への道、大学の夢","夢を叶えるために脳はある 「私という現象」、高校生と脳を語り尽くす","リサーチ・クエスチョンとは何か？","意思決定の心理学 脳とこころの傾向と対策","コーヒーの科学 「おいしさ」はどこで生まれるのか","「大発見」の思考法 ｉＰＳ細胞ｖｓ．素粒子","ドーパミン中毒","「偶然」と「運」の科学","人間の未来 AIの未来","夫婦という病 夫を愛せない妻たち","先読み！IT×ビジネス講座 量子コンピューター","とてつもない数学","宇宙に命はあるのか 人類が旅した一千億分の八","なぜヒトだけが幸せになれないのか","サッカーマティクス 数学が解明する強豪チーム「勝利の方程式」","アタマがみるみるシャープになる！脳の強化書","新版 科学がつきとめた「運のいい人」","1日1ページ、読むだけで身につく世界の教養365","利己的な遺伝子 40周年記念版","アドラー心理学×幸福学でつかむ！幸せに生きる方法","MiND 心の哲学","THIRD MILLENNIUM THINKING アメリカ最高峰大学の人気講義 1000年古びない思考が身につく","教育脳 遺伝的才能と〈あなた〉に必要な学習を語ろう","変な心理学 バズっているアレの正体","メンタル脳","ハーバードの心理学講義","スマホ脳","すぐに実践したくなる すごく使える心理学テクニック","デジタルで読む脳×紙の本で読む脳 「深い読み」ができるバイリテラシー脳を育てる","不老脳","iPS細胞物語","人生の壁","君たちはどう生きるか","老害脳","やばい心理学","脳の地図を書き換える 神経科学の冒険","「いき」の構造 他二編","うしろめたさの人類学","ときめき昆虫学","なぜゲームをすると頭が良くなるのか","ポジティブ心理学が1冊でわかる本","歴史学はこう考える","直感を裏切る数学 「思い込み」にだまされない数学的思考法","社会学史","科学革命の構造","精神現象学 上","行動経済学の使い方","野生の思考","ファスト＆スロー あなたの意思はどのように決まるか？","お茶の科学 「色・香り・味」を生み出す茶葉のひみつ"]},{"g":["健康・医学","健康・医学"],"items":["それ、すべて過緊張です。","休養ベスト100","医者が教える疲れない人の脳","スタンフォード大学西野教授が教える 間違いだらけの睡眠常識","LIFESPAN（ライフスパン） 老いなき世界","不安をしずめる心理学","体力おばけへの道 頭も体も疲れにくくなるスゴイ運動","頭のよい子に育てるために3歳から15歳のあいだに今すぐ絶対やるべきこと","頭を「からっぽ」にするレッスン 10分間瞑想でマインドフルに生きる","最新の睡眠科学が証明する 必ず眠れるとっておきの秘訣！","究極の歩き方","腸科学 健康な人生を支える細菌の育て方","新版「空腹」こそ最強のクスリ","ジムに通う人の栄養学 スポーツ栄養学入門","一流の研究者たちが教える 快眠の科学","ADHDの正体 その診断は正しいのか","医者が教える食事術 最強の教科書 20万人を診てわかった医学的に正しい食べ方68","健康になる技術 大全","スタンフォード式 最高の睡眠","ニュートン超図解新書 最強に面白い 睡眠","自律神経の科学 「身体が整う」とはどういうことか"]},{"g":["生産性・自己成長","生産性・自己成長"],"items":["一生学べる仕事力大全","残業学 明日からどう働くか、どう働いてもらうのか？","最強の生産性革命 時代遅れのルールにしばられない 38の教訓","仕事人生のリセットボタン ――転機のレッスン","大前研一ビジネスジャーナル No.14 企業の「稼ぐ力」をいかに高めるか","知的生産術","すぐやる！ 「行動力」を高める“科学的な”方法","アサーティブ・コミュニケーション","MBA生産性をあげる100の基本","自信","自己肯定感のコツ「自分の価値」に気づく92のヒント","才能の科学 人と組織の可能性を解放し、飛躍的に成長させる方法","自己満足ではない「徹底的に聞く」技術","自分を成長させる 最強の学び方","実力派たちの成長戦略 ３０代、４０代は「ビジョナリー・プロフェッショナル」となれ！","脳の名医が教える すごい自己肯定感","勉強脳","一生折れない自信のつくり方","弱くても最速で成長できる ズボラPDCA","子どもの「やってみたい」をぐいぐい引き出す！「自己肯定感」育成入門","自己啓発をやめて哲学をはじめよう その絶望をどう扱うのか","自己肯定感が高まる習慣力","新しい就活 自己分析はやめる！ 15万人にキャリア指導してきたプロが伝授する内定獲得メソッド","習慣化は自己肯定感が10割","敏感すぎるあなたが7日間で自己肯定感をあげる方法","夫婦幻想 子あり、子なし、子の成長後","熟達論 人はいつまでも学び、成長できる","自己信頼［新訳］","自己啓発の名著から学ぶ 世界一カンタンな人生の変え方","年収UP・起業・自己実現できる！副業の教科書","成長の書","成長の技法 成長を止める七つの壁、壁を越える七つの技法","ゆとり世代はなぜ転職をくり返すのか？ キャリア思考と自己責任の罠","成長以外、全て死","志を育てる リーダーとして自己を成長させ、道を切りひらくために","TEAM WORKER Googleで学んだ最速で成長できる5つの行動原則","何があっても「大丈夫。」と思えるようになる 自己肯定感の教科書","JTの変人採用 「成長を続ける人」の共通点はどこにあるのか","全米トップ校が教える自己肯定感の育て方","あたりまえを疑え。 自己実現できる働き方のヒント","たった1分で仕事も人生も変える 自己紹介2.0","「自傷的自己愛」の精神分析","「自己肯定感」が低いあなたが、すぐ変わる方法","「自己肯定感低めの人」のための本","「なまけもの」のやる気スイッチ 99%が知らない「行動」を科学する","「仕事が速い人」と「仕事が遅い人」の習慣","「悩まない人」の考え方 1日1つインストールする一生悩まない最強スキル30","「時間術のベストセラー100冊」のポイントを1冊にまとめてみた。","いつも幸せな人は、2時間の使い方の天才 本当に大事なことだけをして、毎日を充実させるシンプルな考え方","がんばらない早起き","なぜ働いていると本が読めなくなるのか","科学的に証明された すごい習慣大百科","ライフハック100","世界の一流は「休日」に何をしているのか","仕事ができる人が見えないところで必ずしていること","仕事の「整理ができる人」と「できない人」の習慣","仕事のできる人がやっている減らす習慣","会社はあなたを育ててくれない","僕が若い人たちに伝えたい2035年最強の働き方","努力の地図","夢をかなえるゾウ１","完訳 7つの習慣 人格主義の回復","感謝脳 なぜ「感謝する人」だけが夢を現実にするのか","戦略的いい人 残念ないい人の考え方 お金も仲間も増えていく","時間デトックス 無駄をスッキリさせて、人生の質を高める","朝の自分時間で人生はうまくいく 最高の朝とおだやかな夜をつくる45の習慣","朝1分、人生を変える小さな習慣","本を読む人はうまくいく","スタンフォード大学・オンラインハイスクール校長が教える 脳が一生忘れないインプット術","自分の価値のつくりかた","誰にも何にも期待しない","賢い人の質と速さを両立させる時短100式","週末アウトプット","限りある時間の使い方","あっという間に人は死ぬから 「時間を食べつくすモンスター」の正体と倒し方","うまくいく人は自分にやさしい","とにかく早起き","ドイツ人のすごい働き方","不完全主義","戦略的暇","決定版　仕事は「段取りとスケジュール」で9割決まる！","無くせる会社のムダ作業100個まとめてみた","無駄ゼロ！自分時間が増える超・時短ハック","1つの習慣 うまくいく人は、なぜ「これ」を大切にするのか","［新版］人生を変えるモーニングメソッド 自由に機嫌よく生きている人が、毎朝していること。","1日1話、読めば心が熱くなる365人の仕事の教科書","LIFE SHIFT2 100年時代の行動戦略","ぜんぶ、すてれば","成功をひそかに妨げる「人生の落とし穴」 やってはいけない7つの「悪い」習慣","世界一やさしい「やりたいこと」の見つけ方 人生のモヤモヤから解放される自己理解メソッド","得意なことの見つけ方 自分探しにとらわれず、すぐに行動できる技術","才能のトリセツ 「あなただけの強み」が一生ものの武器になる","知的戦闘力を高める 独学の技法","転職と副業のかけ算 生涯年収を最大化する生き方","なぜ、あなたは時間に追われているのか 「時間がない」から解放される15の仕組みと思考法","エフォートレス思考 努力を最小化して成果を最大化する","人は出会いが100％ 縁をチャンスに変える究極のポジティブ思考法","人生ドラクエ化マニュアルⅡ","時短・効率化の前に 今さら聞けない 時間の超基本","仕事のミスが絶対なくなる頭の使い方","頭が冴える！毎日が充実する！スゴい早起き","［増補新版］活眼 活学","世界観をつくる 「感性×知性」の仕事術","ライフ・シフト １００年時代の人生戦略","ワーク・シフト 孤独と貧困から自由になる働き方の未来図","デンマーク人はなぜ4時に帰っても成果を出せるのか","グーグル社員はなぜ日曜日に山で過ごすのか","ニュータイプの時代 新時代を生き抜く24の思考・行動様式","記憶力日本チャンピオンの超効率 すごい記憶術","脳のパフォーマンスを最大まで引き出す 神・時間術"]}] },
  // Liberal Arts：1領域＝1タスク。領域の一覧はビルド時に public/liberal-arts.html から読む（__NOVA_HUB_STATS__.la）。
  // チェックは通し番号（t0, t1, …）で保存されるので、領域をグループの途中に足すと後ろの記録がずれる。足すときは末尾に。
  { id:"OPT-LA", opt:true, hub:"liberalarts", to:"liberalarts", name:["Liberal Arts","Liberal Arts"],
    ...(() => {
      const la = __NOVA_HUB_STATS__.la, EN = { art: "Arts & expression", lang: "Language & thought", human: "People & society", nature: "Nature & cosmos" };
      const tasks = (la.groups || []).map(([g, ja]) => ({ g: [ja, EN[g] || ja], items: (la.doms || []).filter((d) => d[3] === g).map((d) => [d[1], d[2]]) }));
      return { meta: [`${la.domains}領域（1領域=1タスク）・雑学${nf(la.trivia)}問`, `${la.domains} domains · ${nf(la.trivia)} trivia`], tasks };
    })() },
];
const optLeaves = (row) => row.tasks.reduce((a, g) => a.concat(g.items), []);
// TechHub の行は週を割り当てず、TechHub のタブの並び（基礎 → AX実務 → 道場・リサーチ → AIフォーサイト → PLAYBOOK）で上から進める。
// 各行の s/e は、¼刻みの記録（日数＝週数×7）を保つためだけに残している（バーの位置には使わない）。
const MQ_TECH_ORDER = [
  { g: ["基礎", "CORE"], ids: ["Q-P1", "Q-P10", "Q-MCHKC"] },
  { g: ["AX実務", "AX PRACTICE"], ids: ["Q-P2", "Q-P11", "Q-P13", "Q-P18", "Q-P14", "Q-P16", "Q-MSLQ", "Q-P15", "Q-P3", "Q-P4", "Q-P5", "Q-P6", "Q-P20", "Q-MCHKA"] },
  { g: ["道場・リサーチ", "DOJO & RESEARCH"], ids: ["Q-M1", "Q-M2", "Q-M3", "Q-M4", "Q-M5", "Q-M6", "Q-M7", "Q-M8", "Q-M9", "Q-M10", "Q-M11", "Q-M12", "Q-M13", "Q-M14", "Q-MK", "Q-MDEV", "Q-MBANK", "Q-MARCH", "Q-MSAINT", "Q-MOTHER", "Q-MACAD", "Q-P24", "Q-P7", "Q-MGOV", "Q-MGOVS", "Q-P12", "Q-P19", "Q-MITSEC", "Q-P8", "Q-P23", "Q-P9", "Q-P17", "Q-MNOTE"] },
  { g: ["AIフォーサイト", "AI FORESIGHT"], ids: ["Q-P22"] },
  { g: ["PLAYBOOK", "PLAYBOOK"], ids: ["Q-P21"] },
];
const MQ_TECH_GROUPS = (() => {
  const all = BOOTCAMP_QUEST.mega.concat(BOOTCAMP_QUEST.practice), byId = {}, used = {};
  all.forEach((r) => { byId[r.id] = r; });
  const gs = MQ_TECH_ORDER.map((g) => ({ g: g.g, rows: g.ids.filter((id) => byId[id] && !used[id] && (used[id] = true)).map((id) => byId[id]) }));
  const rest = all.filter((r) => !used[r.id]);   // 並びに書き忘れた行も消さずに最後へ
  if (rest.length) gs[gs.length - 1].rows = gs[gs.length - 1].rows.concat(rest);
  return gs;
})();
// 2ハブの目印（BOOTCAMP_HUBS の c1〜c4）は、Mastery Track の対応する行の進み具合から自動で付ける（目印ごとに行を同じ重みで平均）。
// 目印にはチェックの場所がないため、手で付ける値は使わない。TechHub はタブのグループ（AIフォーサイトと PLAYBOOK は1つの目印）、Consulting は各目印の見出しにある分野。
const MQ_ROW_BY_ID = (() => { const m = {}; BOOTCAMP_QUEST.mega.concat(BOOTCAMP_QUEST.practice, BOOTCAMP_QUEST.cons).forEach((r) => { m[r.id] = r; }); return m; })();
const HUB_MILE_ROWS = {
  "HUB-MEGATECH": [MQ_TECH_GROUPS[0], MQ_TECH_GROUPS[1], MQ_TECH_GROUPS[2]].map((g) => g.rows.map((r) => r.id)).concat([MQ_TECH_GROUPS.slice(3).reduce((a, g) => a.concat(g.rows.map((r) => r.id)), [])]),
  "HUB-CONSULTING": [["Q-CG", "Q-C0", "Q-C1", "Q-C2"], ["Q-C3", "Q-C4", "Q-C5"], ["Q-C6", "Q-CX"], ["Q-C7", "Q-C8"]],
};
// 2026-11：Mastery Track を各ハブの今の中身に合わせた（区分の追加・並べ替え・行の間の移動、資格ごとの模試セット数）。
// チェックは「行ID＋何番目の項目か（c0, c1, …）」で保存されているので、旧い並びの記録を一度だけ新しい位置へ移す。
// 移し終えた記録には _mqLayout を付け、二度目以降は何もしない。新しく使い始めた端末は最初から _mqLayout 付き（初期値）なので移さない。
// 値は「旧い位置 → 新しい位置」。書いていない位置はそのまま、-1 は該当する項目が無くなったので外す。
const MQ_LAYOUT = 2;
const MQ_LAYOUT_MOVES = {
  "Q-P15": { 3: 5, 4: 7 },                                  // グローバル事例：IV・V・VII を足した
  "Q-P9": { 1: 7, 2: 6 },                                   // 企業研究：小タブの並び（比較表〜逆質問を足した）
  "Q-P12": { 0: 4, 1: 10 },                                 // 統制の実務：ガバナンス道場の読む区分を足した
  "Q-P20": { 0: [1, 2, 3, 4] },                             // AGI・ASI：旧「仮説トレ」1項目 → I〜IV（c0 は近未来レーダー）
  "SC-900": { 3: -1, 4: -1, 5: -1, 6: 3, 7: 4, 8: 5 },      // 模試が2セットの資格：無いセット3〜5を外す
  "GH-600": { 3: -1, 4: -1, 5: -1, 6: 3, 7: 4, 8: 5 },
  "SC-500": { 3: -1, 4: -1, 5: -1, 6: 3, 7: 4, 8: 5 },
  "CCA-F": { 5: -1, 6: 5, 7: 6, 8: 7 },                     // 模試が4セット
};
const migrateMqLayout = (tasks) => {
  if (!tasks || tasks._mqLayout >= MQ_LAYOUT) return tasks;
  const next = { ...tasks, _mqLayout: MQ_LAYOUT };
  Object.keys(MQ_LAYOUT_MOVES).forEach((id) => {
    const cur = tasks[id];
    if (!cur) return;
    const mv = MQ_LAYOUT_MOVES[id], out = {};
    Object.keys(cur).forEach((k) => {
      const m = /^c(\d+)$/.exec(k);
      if (!m) { out[k] = cur[k]; return; }
      if (!cur[k]) return;
      const i = +m[1], to = Object.prototype.hasOwnProperty.call(mv, i) ? mv[i] : i;
      [].concat(to).forEach((j) => { if (j >= 0) out["c" + j] = true; });
    });
    next[id] = out;
  });
  // 近未来レーダーは「価値と診断」（Q-P2 の c4）から、いま載っている AGI・ASI（Q-P20 の c0）へ移った
  const p2 = tasks["Q-P2"];
  if (p2 && "c4" in p2) {
    const np2 = { ...p2 };
    if (p2.c4) next["Q-P20"] = { ...(next["Q-P20"] || {}), c0: true };
    delete np2.c4; next["Q-P2"] = np2;
  }
  return next;
};
// 旧「リサーチ」行（Q-P9）の区分 c3「AGI・ASI仮説トレ」と c4「PLAYBOOK 5ガイド」を、新しい AGI・ASI（Q-P20）と PLAYBOOK（Q-P21）の行へ一度だけ移す。
// PLAYBOOK の5ガイドは当時の FIRST CALL〜DAILY LOOP（新しい行の c0〜c4）。c3・c4 を消すので、二度目以降は何もしない。
const migrateQuestRows = (tasks) => {
  if (tasks && tasks._mqLayout >= MQ_LAYOUT) return tasks;   // 新しい並びの Q-P9 の c3・c4（実装事例・面接準備）を動かさない
  const p9 = tasks && tasks["Q-P9"];
  if (!p9 || (!("c3" in p9) && !("c4" in p9))) return tasks;
  const next = { ...tasks }, np9 = { ...p9 };
  if (p9.c3) next["Q-P20"] = { ...(tasks["Q-P20"] || {}), c0: true };
  if (p9.c4) { const pb = { ...(tasks["Q-P21"] || {}) }; for (let i = 0; i < 5; i++) pb["c" + i] = true; next["Q-P21"] = pb; }
  delete np9.c3; delete np9.c4; next["Q-P9"] = np9;
  return next;
};
const BOOTCAMP_QDAILY = {
  summary: (() => {
    // TechHub は週の計画に入れず、別の暦（タブの並びの順・1日のペースで日付）で進める。週の計画は資格と Consulting。
    const sum = (rows) => rows.reduce((a, r) => a + r.qn, 0), f = (n) => n.toLocaleString();
    const cq = sum(BOOTCAMP_QUEST.cons), ce = Math.max(...BOOTCAMP_QUEST.cons.map((r) => r.e));
    const mq = sum(BOOTCAMP_QUEST.mega), pu = sum(BOOTCAMP_QUEST.practice);
    return [`週の計画は資格と Consulting（クイズ${f(cq)}問）。TechHub のクイズ${f(mq)}問と実務コンテンツ${pu}項目は別の暦で、タブの並び（基礎 → AX実務 → 道場・リサーチ → AIフォーサイト → PLAYBOOK）の順に1行ずつ、1日のペース（既定はクイズ95問・実務3項目）から日付を割り当てる。用語辞典${f(MQ_GLOSSARY)}問は辞書として随時参照・別枠。`,
      `The week plan covers certs and Consulting (${f(cq)} quiz items). TechHub's ${f(mq)} quiz items and ${pu} practice items run on their own calendar: one row at a time in TechHub's tab order (Core → AX practice → Dojo & research → AI foresight → Playbook), dated from a daily pace (default 95 Q and 3 practice items). The ${f(MQ_GLOSSARY)}-item glossary stays off-timeline.`];
  })(),
  weekday: { h: ["平日 3時間（~95問）", "Weekday · 3h"], rows: [["当該バンクを消化", "120分", "~95問（大バンクは分割して数日）"], ["誤答の復習", "30分", "間違いだけ即日で回収"], ["資格", "30分", "当該週の資格を進める"]] },
  weekend: { h: ["休日 4時間（~145問）", "Weekend · 4h"], rows: [["まとめ消化", "180分", "~145問（平日の積み残し＋大バンク）"], ["弱点反復", "40分", "正答率の低い範囲を再挑戦"], ["資格の模試", "20分", "受験週の模試を回す"]] },
};

// ポータルに「4 MONTH · BOOTCAMP」ガントトラッカー（Finance除外）を描画。
const WEAK_SOURCES = [
  { hub: ["Consulting Hub", "Consulting Hub"], key: "consulting_dom_stats_v1", kind: "ca", labels: { 0: ["ロジカルシンキング", "Logical Thinking"], 1: ["クリティカルシンキング", "Critical Thinking"], 2: ["ラテラルシンキング", "Lateral Thinking"], 3: ["クリエイティブシンキング", "Creative Thinking"], 4: ["構造化", "Structuring"], 5: ["DX", "Digital Transformation"], 6: ["AI", "AI"], 7: ["論点思考", "Issue Thinking"], 8: ["仮説思考", "Hypothesis Thinking"] } },
  { hub: ["TechHub 基礎", "TechHub Core"], key: "axcheck_core_stats_v1", kind: "ca", labels: { K1: ["論点マップ", "Issue Map"], K2: ["全体像", "Service Map"], K3: ["定量データ", "Data"], K4: ["統制・エージェント", "Governance"], K5: ["事例", "Cases"] } },
  { hub: ["TechHub AX実務", "TechHub AX"], key: "axcheck_ax_stats_v1", kind: "ca", labels: { X1: ["価値ドライバー", "Value"], X2: ["提案・計算", "Proposal"], X3: ["競合・問答", "Objections"], X4: ["業界別", "Industries"], X5: ["AGI・診断", "AGI & Assess"], X6: ["実務・事例", "Practice"] } },
  { hub: ["AICX", "AICX"], key: "aics_study_v2", kind: "prog", labels: { D1: ["生成AI基礎", "GenAI basics"], D2: ["業務プロセス", "Process"], D3: ["データ", "Data"], D4: ["ワークフロー", "Workflow"], D5: ["組織変革", "Change"], D6: ["5D・推進", "5D"] } },
  { hub: ["AIGP", "AIGP"], key: "aigp_hub_study_v1", kind: "prog" },
  { hub: ["ISO 42001 F", "ISO 42001 F"], key: "iso42001f_hub_study_v1", kind: "prog" },
  { hub: ["ISO 42001 LI", "ISO 42001 LI"], key: "iso42001li_hub_study_v1", kind: "prog" },
  { hub: ["CCSK", "CCSK"], key: "ccsk_hub_study_v1", kind: "prog" },
  { hub: ["CISM", "CISM"], key: "cism_hub_study_v1", kind: "prog" },
  { hub: ["CISA", "CISA"], key: "cisa_hub_study_v1", kind: "prog" },
  { hub: ["AAISM", "AAISM"], key: "aaism_hub_study_v1", kind: "prog" },
  { hub: ["AAIR", "AAIR"], key: "aair_hub_study_v1", kind: "prog" },
  { hub: ["AAIA", "AAIA"], key: "aaia_hub_study_v1", kind: "prog" },
  { hub: ["PL-900", "PL-900"], key: "pl900_study_v2", kind: "prog", labels: { D1: ["ビジネス価値", "Business value"], D2: ["環境の管理", "Environment"], D3: ["Power Apps", "Power Apps"], D4: ["Power Automate", "Power Automate"], D5: ["Copilot Studio のエージェント", "Copilot Studio agents"], PP: ["旧範囲（Power Pages など）", "Former scope (Power Pages etc.)"] } },
  { hub: ["ガバナンス道場", "Governance Dojo"], key: "govdojo_stats_v1", kind: "ca", labels: { D1: ["利用規程・データ取扱", "Use policy & data"], D2: ["リスク階層化", "Risk tiering"], D3: ["SoA・第三者審査", "SoA & vendor review"], D4: ["LLM脅威と統制", "LLM threats & controls"], D5: ["インシデント対応", "Incident response"], D6: ["業種横断の応用", "Cross-industry"] } },
  { hub: ["実務論点マップ", "Practice Issue Map"], key: "noteissue_stats_v1", kind: "ca", labels: { N1: ["統治の論点", "Governance issues"], N2: ["AIセキュリティ", "AI security"], N3: ["内部監査のAI化", "AI in internal audit"], N4: ["人材育成と評価", "Talent & evaluation"], N5: ["ソリューション設計", "Solution design"], N6: ["出典と検証の作法", "Sourcing & verification"], N7: ["生成AIと事業の未来", "GenAI & business futures"], N8: ["フォロー中アカウント", "Accounts you follow"] } },
  { hub: ["Slalom変革道場", "Slalom Dojo"], key: "slalom_stats_v1", kind: "ca", labels: { SL1: ["オペレーティングモデル設計", "Operating model design"], SL2: ["チェンジマネジメント", "Change management"], SL3: ["デリバリーとアジャイル", "Delivery & agility"], SL4: ["価値実現とビジネスケース", "Value & business case"], SL5: ["AI変革（人＋エージェント）", "AI transformation (human + agent)"], SL6: ["パートナー横断の翻訳", "Cross-platform translation"], SL7: ["顧客関係とアカウント成長", "Client relationship & growth"], SL8: ["日本とグローバルの橋渡し", "Japan\u2013global bridging"], SL9: ["Slalomの働き方と価値観", "Slalom ways of working"] } },
];

// 誤答キュー。各資格モジュールは間違えた問題を {qKey: {q, miss, added}} で端末に残すが、
// どの横断ビューもそれを読んでいなかった。正答率と違って分母(解答数)を持たないため、
// レーダー本体の順位には混ぜず、未消化の件数として別枠で出す。
const NOVA_REVIEW_KEYS = [
  "ab100_review_v1", "ab410_review_v1", "ab620_review_v1", "adp_review_v3", "agwa_review_v1",
  "ai103_review_v1", "ai200_review_v1", "ai300_review_v1", "dp900_review_v1",
  "gh300_review_v1", "gh600_review_v1", "gh900_review_v1",
  "sc500_review_v1", "sc900_review_v1", "cca_f_wrong_v1",
];
// 形式が WEAK_SOURCES と違うハブ（Finance・Linguistics・Language・Liberal Arts・Book-Summary）。
// keys() の値を読み、read() で [{ dom: [日本語, English], a: 解答数, c: 正解数 }] に直す。
const NOVA_WEAK_EXTRA = [
  // CLF の分野表は Certification Hub の中にある（ビルドでは開いたときに読み込む別ファイル）。記録があるときだけ読み込んで数える
  { hub: ["AWS CLF-C02", "AWS CLF-C02"], keys: () => ["clf_c02_dashboard_v1"],
    read: async (vals) => {
      const st = vals["clf_c02_dashboard_v1"];
      if (!st || !st.results || typeof st.results !== "object" || !Object.keys(st.results).length) return [];
      const m = await novaHubReady(CertHubModule);
      return m && m.CLF_WEAK ? m.CLF_WEAK(st) : [];
    } },
  // Finance の保存キーと見出しは素のデータ（ビルドでは埋め込み済み）なので、Finance Hub の読み込みを待たない
  { hub: ["Finance Hub", "Finance Hub"], keys: () => (FinanceHubModule.WEAK_KEYS || []).map((x) => x.key),
    read: (vals) => (FinanceHubModule.WEAK_KEYS || []).map((x) => {
      const v = vals[x.key]; if (!v || typeof v !== "object") return null;
      let a = 0, c = 0; Object.values(v).forEach((r) => { if (r && typeof r === "object" && "picked" in r) { a++; if (r.correct) c++; } });
      return a ? { dom: x.label, a, c } : null;
    }).filter(Boolean) },
  // Linguistics の分類表は Linguistics Hub の中にある（ビルドでは開いたときに読み込む別ファイル）。解答の記録があるときだけ読み込んで数える
  { hub: ["Linguistics Hub", "Linguistics Hub"], keys: () => ["linguistics-hub-progress-v2"],
    read: async (vals) => {
      const prog = vals["linguistics-hub-progress-v2"];
      if (!prog || typeof prog !== "object" || !Object.values(prog).some((v) => v === true)) return [];
      const m = await novaHubReady(LinguisticsHubModule);
      return m && m.WEAK_TABLE ? m.WEAK_TABLE(prog) : [];
    } },
  { hub: ["Language Hub", "Language Hub"], keys: () => ["quiz-stats"],
    read: (vals) => { const v = vals["quiz-stats"] || {}; const N = { es: ["スペイン語", "Spanish"], de: ["ドイツ語", "German"], fr: ["フランス語", "French"] };
      return Object.keys(N).map((k) => (v[k] && Number(v[k].totalAttempts) > 0 ? { dom: N[k], a: Number(v[k].totalAttempts), c: Number(v[k].totalCorrect) || 0 } : null)).filter(Boolean); } },
  { hub: ["Liberal Arts", "Liberal Arts"], keys: () => ["lah:store:v1"],
    read: (vals) => { let st = null; try { st = JSON.parse((vals["lah:store:v1"] || {})["lah:v1"] || "null"); } catch (e) {}
      const q = st && st.quiz; return q && Number(q.asked) > 0 ? [{ dom: ["雑学クイズ", "Trivia quiz"], a: Number(q.asked), c: Number(q.right) || 0 }] : []; } },
  { hub: ["Book-Summary", "Book-Summary"], keys: () => ["bsh:store:v1"],
    read: (vals) => { let qz = null; try { qz = JSON.parse((vals["bsh:store:v1"] || {})["booksummaryhub:quiz:v1"] || "null"); } catch (e) {}
      const g = {};
      Object.entries((qz && qz.q) || {}).forEach(([k, r]) => { const id = k.slice(0, k.lastIndexOf("#")); const kind = id.startsWith("yt_") ? "yt" : id.startsWith("note_") ? "note" : "book";
        g[kind] = g[kind] || { a: 0, c: 0 }; g[kind].a += Number(r && r.seen) || 0; g[kind].c += Number(r && r.correct) || 0; });
      const LB = { book: ["書籍のクイズ", "Book quizzes"], yt: ["YouTube のクイズ", "YouTube quizzes"], note: ["note のクイズ", "note quizzes"] };
      return Object.entries(g).filter(([, v]) => v.a > 0).map(([k, v]) => ({ dom: LB[k], a: v.a, c: v.c })); } },
];
const novaReviewLabel = (k) => NOVA_CERT_NAME(k.replace(/_(review|wrong)_v\d+$/, ""));

function NovaWeakRadar({ lang }) {
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(null);
  const [queue, setQueue] = useState(null);
  const load = async () => {
    const out = [];
    for (const src of WEAK_SOURCES) {
      let parsed = null;
      try { const r = await window.storage.get(src.key); if (r && r.value) parsed = JSON.parse(r.value); } catch (e) {}
      if (!parsed) { out.push({ hub: src.hub, empty: true }); continue; }
      const table = src.kind === "prog" ? (parsed.progress || {}) : parsed;
      let found = 0;
      Object.entries(table).forEach(([dom, v]) => {
        if (!v || typeof v !== "object") return;
        const a = Number(v.attempts != null ? v.attempts : v.a) || 0;
        const c = Number(v.correct != null ? v.correct : v.c) || 0;
        if (a <= 0) return;
        found++;
        const lb = src.labels && src.labels[dom] ? src.labels[dom][en ? 1 : 0] : dom;
        out.push({ hub: src.hub, dom: lb, a, c, acc: c / a });
      });
      if (!found) out.push({ hub: src.hub, empty: true });
    }
    for (const ex of NOVA_WEAK_EXTRA) {
      const vals = {};
      for (const k of ex.keys()) { try { const r = await window.storage.get(k); if (r && r.value) vals[k] = JSON.parse(r.value); } catch (e) {} }
      let got = [], failed = false;
      try { got = (await ex.read(vals)) || []; } catch (e) { got = []; failed = true; }
      // 読み込めなかったハブ（別ファイルのハブをネットなしで開いたときなど）は「記録なし」と区別する
      if (!got.length) { out.push({ hub: failed ? [ex.hub[0] + "（読み込めず）", ex.hub[1] + " (could not load)"] : ex.hub, empty: true }); continue; }
      got.forEach((r) => out.push({ hub: ex.hub, dom: r.dom[en ? 1 : 0], a: r.a, c: r.c, acc: r.a ? r.c / r.a : 0 }));
    }
    const q = [];
    for (const k of NOVA_REVIEW_KEYS) {
      let store = null;
      try { const r = await window.storage.get(k); if (r && r.value) store = JSON.parse(r.value); } catch (e) {}
      if (!store || typeof store !== "object") continue;
      const items = Object.values(store).filter((v) => v && typeof v === "object");
      if (!items.length) continue;
      let miss = 0, oldest = 0;
      items.forEach((v) => {
        miss += Number(v.miss) || 1;
        const t = Number(v.added) || 0;
        if (t && (!oldest || t < oldest)) oldest = t;
      });
      q.push({ cert: novaReviewLabel(k), n: items.length, miss, oldest });
    }
    q.sort((a, b) => b.n - a.n);
    setQueue(q);
    setRows(out);
  };
  const toggle = () => { const v = !open; setOpen(v); if (v && rows === null) load(); };
  const scored = (rows || []).filter((r) => !r.empty && r.a >= 3);
  const weakest = scored.slice().sort((x, y) => x.acc - y.acc || y.a - x.a).slice(0, 5);
  const emptyHubs = (rows || []).filter((r) => r.empty).map((r) => r.hub[en ? 1 : 0]);
  return (
    <div style={{ margin: "18px 0 4px" }}>
      <div onClick={toggle} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "2px 0" }}>
        <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", background: "#B84A5E" }}>◎</span>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: NOVA_SERIF, fontSize: 15.5, fontWeight: 700, color: NOVA.ink, letterSpacing: 0.2 }}>{en ? "Weakness Radar" : "弱点レーダー"}</span>
            <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1.2, color: "#fff", background: "#B84A5E", borderRadius: 999, padding: "2px 8px" }}>{en ? "CROSS-HUB" : "横断"}</span>
          </div>
        </div>
      </div>
      <NovaRule margin="6px 0 10px" />
      {open && (
        <div style={{ padding: "0 0 8px" }}>
          {rows === null ? (
            <div style={{ fontSize: 12, color: NOVA.faint }}>{en ? "Loading..." : "読み込み中..."}</div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: NOVA.ink }}>{en ? "Weakest five (3+ attempts)" : "弱点トップ5（解答3問以上の論点）"}</span>
                <button onClick={load} style={{ fontSize: 10.5, color: NOVA.sub, background: "transparent", border: `1px solid ${NOVA.faint}`, borderRadius: 999, padding: "2px 10px", cursor: "pointer" }}>{en ? "refresh" : "再集計"}</button>
              </div>
              {weakest.length === 0 ? (
                <div style={{ fontSize: 12, color: NOVA.faint, lineHeight: 1.7 }}>
                  {en ? "Not enough recorded answers yet. Play any quiz or comprehension check and come back — the radar builds itself from what you get wrong." : "まだ集計できる解答記録がありません。クイズや理解度チェックを解いてから戻ってくると、間違いからレーダーが育ちます。"}
                </div>
              ) : weakest.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: NOVA.faint, width: 14, flexShrink: 0, textAlign: "right" }}>{i + 1}</span>
                  <span style={{ fontSize: 11.5, color: NOVA.sub, flexShrink: 0, minWidth: 108 }}>{r.hub[en ? 1 : 0]}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: NOVA.ink, flexShrink: 0, minWidth: 96 }}>{r.dom}</span>
                  <div style={{ flex: 1, height: 7, background: "#EEE9E2", borderRadius: 4, overflow: "hidden", minWidth: 60 }}>
                    <div style={{ width: `${Math.round(r.acc * 100)}%`, height: "100%", background: r.acc < 0.6 ? "#B84A5E" : r.acc < 0.8 ? "#D6A152" : "#158F6B" }} />
                  </div>
                  <span style={{ fontSize: 11.5, color: NOVA.sub, flexShrink: 0, width: 86, textAlign: "right" }}>{r.c}/{r.a}（{Math.round(r.acc * 100)}%）</span>
                </div>
              ))}
              {scored.length > 0 && (
                <div style={{ fontSize: 10.5, color: NOVA.faint, marginTop: 8, lineHeight: 1.6 }}>
                  {en ? `Tracked topics: ${scored.length}.` : `集計対象の論点: ${scored.length}件。`}
                  {emptyHubs.length > 0 && (en ? ` No record yet: ${emptyHubs.join(" / ")}` : ` 記録なし: ${emptyHubs.join(" / ")}`)}
                </div>
              )}
              {queue && queue.length > 0 && (() => {
                const qn = queue.reduce((t, r) => t + r.n, 0);
                const top = queue.slice(0, 6);
                const days = (t) => (t ? Math.floor((Date.now() - t) / 86400000) : null);
                return (
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${NOVA.line}` }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: NOVA.ink, marginBottom: 2 }}>
                      {en ? `Review queue — ${qn} unresolved across ${queue.length} bank${queue.length !== 1 ? "s" : ""}` : `未消化の誤答キュー — ${queue.length}バンクに${qn}問`}
                    </div>
                    <div style={{ fontSize: 10.5, color: NOVA.faint, marginBottom: 7, lineHeight: 1.6 }}>
                      {en ? "Questions you got wrong and have not cleared. They carry no attempt count, so they are not ranked with the accuracy list above." : "間違えたまま消していない問題です。解答数（分母）を持たないため、上の正答率ランキングには混ぜていません。"}
                    </div>
                    {top.map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: NOVA.ink, flexShrink: 0, minWidth: 74 }}>{r.cert}</span>
                        <div style={{ flex: 1, height: 6, background: "#EEE9E2", borderRadius: 4, overflow: "hidden", minWidth: 50 }}>
                          <div style={{ width: `${Math.min(100, Math.round((r.n / Math.max(1, top[0].n)) * 100))}%`, height: "100%", background: "#C97B4A" }} />
                        </div>
                        <span style={{ fontSize: 11, color: NOVA.sub, flexShrink: 0, width: 96, textAlign: "right" }}>
                          {en ? `${r.n} left` : `${r.n}問`}{r.miss > r.n ? (en ? ` / ${r.miss} misses` : ` / 誤答${r.miss}`) : ""}
                        </span>
                        <span style={{ fontSize: 10, color: NOVA.faint, flexShrink: 0, width: 56, textAlign: "right" }}>
                          {days(r.oldest) != null ? (en ? `${days(r.oldest)}d old` : `${days(r.oldest)}日前〜`) : ""}
                        </span>
                      </div>
                    ))}
                    {queue.length > top.length && (
                      <div style={{ fontSize: 10.5, color: NOVA.faint, marginTop: 4 }}>
                        {en ? `+${queue.length - top.length} more bank${queue.length - top.length !== 1 ? "s" : ""}` : `ほか${queue.length - top.length}バンク`}
                      </div>
                    )}
                  </div>
                );
              })()}
              <div style={{ fontSize: 10.5, color: NOVA.faint, marginTop: 10, lineHeight: 1.6 }}>
                {en ? "Records live in this device's storage only; the radar covers the hubs whose formats it can read (Consulting Hub applied quizzes and mocks, TechHub checks, AICX, the nine governance stations, the governance dojo, PL-900, Finance section quizzes, Linguistics fields, Language Hub quizzes, Liberal Arts trivia and Book-Summary quizzes) plus the review queues of 14 certification banks." : "記録はこの端末内のみ。対応形式のハブ（Consulting Hub の応用クイズ・模試、TechHub理解度チェック・AICX・ガバナンス9資格・ガバナンス道場・PL-900、Finance の各セクションのクイズ、Linguistics の各分野、Language Hub のクイズ、Liberal Arts の雑学、Book-Summary のクイズ）と、資格14バンクの誤答キューを対象にしています。"}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function PortalBootcamp({ lang, onResume }) {
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("");
  const [state, setState] = useState({ _mqLayout: MQ_LAYOUT });   // 新しい端末は最初から今の並び（移し替え不要）
  const [expanded, setExpanded] = useState(null);
  const [showLoad, setShowLoad] = useState(false);
  const [showPhases, setShowPhases] = useState(false);
  const [grpOpen, setGrpOpen] = useState({ mega: false, cons: false, cert: false, opt: false }); // グループ（ハブ）単位の開閉（デフォルトは閉じる）
  const [tl, setTl] = useState("week");            // ガント目盛りの単位: week=週表示 / day=日表示
  // TechHub の暦：Mastery Track の TechHub 行をタブの並びの順に1行ずつ並べ、1日のペース（クイズ何問・実務何項目）から日付を割り当てる。
  // 週の計画（資格・Consulting）とは別の暦。既定のクイズ95問／日は「1日の時間割」の「当該バンクを消化 120分・~95問」から、実務3項目／日は目安。
  const [mqPace, setMqPace] = useState({ q: 95, p: 3 });
  useEffect(() => { (async () => { try { const r = await window.storage.get("nova_mq_pace_v1"); if (r && r.value) { const o = JSON.parse(r.value) || {}; setMqPace((p) => ({ q: +o.q > 0 ? +o.q : p.q, p: +o.p > 0 ? +o.p : p.p })); } } catch (e) {} })(); }, []);
  const onPace = (k, v) => setMqPace((p) => { const n = { ...p, [k]: Math.max(k === "q" ? 1 : 0.5, +v || 0) }; try { window.storage.set("nova_mq_pace_v1", JSON.stringify(n)); } catch (e) {} return n; });
  const [optOpen, setOptOpen] = useState({});      // 任意学習のサブカテゴリ開閉（row.id#groupIdx）
  const [res, setRes] = useState({});          // 関連教材のチェック状態（title→bool）
  const [themeOpen, setThemeOpen] = useState({}); // MegaTechテーマ展開
  const [pattern, setPattern] = useState(1);   // 0=標準（資格＋ハブ） / 1=ハブ全問制覇
  useEffect(() => {
    (async () => {
      try { const pp = await window.storage.get("nova_bootcamp_pattern_v1"); if (pp && (pp.value === "0" || pp.value === "1")) setPattern(+pp.value); } catch (e) {}
      try { const rr = await window.storage.get("nova_bootcamp_res_v1"); if (rr && rr.value) setRes(JSON.parse(rr.value) || {}); } catch (e) {}
      try {
        const r = await window.storage.get("nova_bootcamp_v2");
        if (r && r.value) { const o = JSON.parse(r.value) || {}; const tk = migrateMqLayout(migrateQuestRows(migrateOptBook(o.tasks || {}))); setState(tk); setStart(o.start || ""); if (tk !== o.tasks) persist(tk, o.start || ""); return; }
      } catch (e) {}
      try {
        const r1 = await window.storage.get("nova_bootcamp_v1");
        if (r1 && r1.value) { const c = JSON.parse(r1.value) || {}; const t = {}; Object.keys(c).forEach((k) => { if (c[k]) t[k] = { udemy: true, book: true, mock: true, booked: true, passed: true }; }); setState({ ...t, _mqLayout: MQ_LAYOUT }); }
      } catch (e) {}
    })();
  }, []);
  const persist = (tasks, st) => { try { window.storage.set("nova_bootcamp_v2", JSON.stringify({ tasks, start: st })); } catch (e) {} };
  const resIsDone = (title, def) => (Object.prototype.hasOwnProperty.call(res, title) ? res[title] : !!def);
  const toggleRes = (title, def) => setRes((prev) => { const cur = Object.prototype.hasOwnProperty.call(prev, title) ? prev[title] : !!def; const next = { ...prev, [title]: !cur }; try { window.storage.set("nova_bootcamp_res_v1", JSON.stringify(next)); } catch (e) {} return next; });
  // 関連教材文字列を {done|gap|plain, title} に解釈（"✓完了: "/"○未: "/"★..." プレフィックス）
  const parseRes = (s) => { if (/^✓完了/.test(s)) return { done: true, title: s.slice(s.indexOf(": ") + 2) }; if (/^○未/.test(s)) return { done: false, title: s.slice(s.indexOf(": ") + 2) }; if (/^★/.test(s)) return { gap: true, text: s }; return { plain: true, text: s }; };
  const milesOf = (t) => (t.mile ? t.mile : (t.id === "CAPSTONE" ? BOOTCAMP_MILE_CAP : BOOTCAMP_MILE));
  // クイズ行の進捗：cats（実カテゴリ/難易度）があれば問数加重、なければ¼刻み（内部は日キーで保持）。
  const qDays = (t) => (t.e - t.s + 1) * 7;
  // 資格行も分野チェックリスト（CERT_CATS）で進捗管理し、ハブ行と粒度を揃える。
  const catsOf = (t) => t.cats || (t.cert ? certCatsFor(t.cert) : null);
  const pctOf = (t) => {
    const hf = hubMileFrac(t);
    if (hf) return Math.round((hf.reduce((a, x) => a + x, 0) / hf.length) * 100);
    const cats = catsOf(t);
    if (cats) { const s = state[t.id] || {}; let dn = 0, tot = 0; cats.forEach((c, i) => { const w = c.q || 1; tot += w; if (s["c" + i]) dn += w; }); return tot ? Math.round((dn / tot) * 100) : 0; }
    if (t.qmile) { const D = qDays(t); if (!D) return 0; const s = state[t.id] || {}; let n = 0; for (let i = 0; i < D; i++) if (s["d" + i]) n++; return Math.round((n / D) * 100); }
    if (t.opt) { const L = optLeaves(t).length; if (!L) return 0; const s = state[t.id] || {}; let n = 0; for (let i = 0; i < L; i++) if (s["t" + i]) n++; return Math.round((n / L) * 100); }
    const ms = milesOf(t); const s = state[t.id] || {}; const n = ms.filter((m) => s[m.k]).length; return Math.round((n / ms.length) * 100);
  };
  // ハブの目印ごとの進み具合（0〜1）。対応する Mastery Track の行の進み具合の平均
  const hubMileFrac = (t) => { const g = HUB_MILE_ROWS[t.id]; if (!g) return null; return g.map((ids) => { const rs = ids.map((id) => MQ_ROW_BY_ID[id]).filter(Boolean); return rs.length ? rs.reduce((a, r) => a + pctOf(r), 0) / rs.length / 100 : 0; }); };
  const isDone = (t) => { const s = state[t.id] || {}; if (t.qmile || t.isHub || t.opt || catsOf(t)) return pctOf(t) === 100; return t.id === "CAPSTONE" ? pctOf(t) === 100 : !!s.passed; };
  const pickPattern = (v) => { setPattern(v); try { window.storage.set("nova_bootcamp_pattern_v1", String(v)); } catch (e) {} };
  const toggleMile = (t, k) => setState((prev) => { const cur = { ...(prev[t.id] || {}) }; cur[k] = !cur[k]; const next = { ...prev, [t.id]: cur }; persist(next, start); return next; });
  // 週表示の¼ボタン→先頭からその割合の日数までをまとめてON/OFF
  const setQuarter = (t, frac) => setState((prev) => { const D = qDays(t); const cur = { ...(prev[t.id] || {}) }; const target = Math.round(D * frac); for (let i = 0; i < D; i++) cur["d" + i] = i < target; const next = { ...prev, [t.id]: cur }; persist(next, start); return next; });
  // カテゴリ（分野/難易度）チェックをトグル
  const toggleCat = (t, i) => setState((prev) => { const cur = { ...(prev[t.id] || {}) }; cur["c" + i] = !cur["c" + i]; const next = { ...prev, [t.id]: cur }; persist(next, start); return next; });
  // 任意学習のタスク（1セクション/分野）をトグル／一括
  const toggleTask = (t, i) => setState((prev) => { const cur = { ...(prev[t.id] || {}) }; cur["t" + i] = !cur["t" + i]; const next = { ...prev, [t.id]: cur }; persist(next, start); return next; });
  const setAllTasks = (t, val) => setState((prev) => { const L = optLeaves(t).length; const cur = { ...(prev[t.id] || {}) }; for (let i = 0; i < L; i++) cur["t" + i] = val; const next = { ...prev, [t.id]: cur }; persist(next, start); return next; });
  const optDone = (t) => { const s = state[t.id] || {}; let n = 0; const L = optLeaves(t).length; for (let i = 0; i < L; i++) if (s["t" + i]) n++; return n; };
  const onStart = (v) => { setStart(v); persist(state, v); };
  const hubName = (h) => (NOVA_HUB_LABEL[h] ? NOVA_HUB_LABEL[h][en ? 1 : 0] : h);
  const statusColor = (t) => { const p = pctOf(t); if (isDone(t)) return "#158F6B"; if (p === 0) return NOVA.faint; return t.isHub ? (NOVA[t.hub] || NOVA.megatech) : NOVA.megatech; };

  const certsDone = BOOTCAMP_TASKS.filter((t) => t.cert && isDone(t)).length;
  const certTotal = BOOTCAMP_TASKS.filter((t) => t.cert).length;
  const hubPct = Math.round(BOOTCAMP_HUBS.reduce((a, h) => a + pctOf(h), 0) / BOOTCAMP_HUBS.length);
  let doneU = 0, totU = 0; [...BOOTCAMP_HUBS, ...BOOTCAMP_TASKS].forEach((t) => { const hf = hubMileFrac(t); if (hf) { totU += hf.length; doneU += hf.reduce((a, x) => a + x, 0); return; } const s = state[t.id] || {}; const cats = catsOf(t); if (cats) { totU += cats.length; doneU += cats.filter((c, i) => s["c" + i]).length; } else { const ms = milesOf(t); totU += ms.length; doneU += ms.filter((m) => s[m.k]).length; } });
  const overall = totU ? Math.round((doneU / totU) * 100) : 0;

  const GRID = BOOTCAMP_WEEKS, WEEKS_DAYS = GRID * 7, LABELW = 164;
  const isDay = tl === "day";                        // 目盛りの単位（週/日）。バー位置は常に週基準。
  const canvasMin = isDay ? 1560 : 800;              // 日表示は横に広げて日付を読めるようにする
  // 罫線は背景グラデーションで描画（週表示=週ごと＋月太線／日表示=日ごと＋週太線）
  const gridBG = isDay
    ? `repeating-linear-gradient(90deg, ${NOVA.panelSoft}, ${NOVA.panelSoft} 1px, transparent 1px, transparent calc(100% / ${WEEKS_DAYS})), repeating-linear-gradient(90deg, ${NOVA.line}, ${NOVA.line} 1px, transparent 1px, transparent calc(100% / ${GRID}))`
    : `repeating-linear-gradient(90deg, ${NOVA.panelSoft}, ${NOVA.panelSoft} 1px, transparent 1px, transparent calc(100% / ${GRID})), repeating-linear-gradient(90deg, ${NOVA.line}, ${NOVA.line} 1px, transparent 1px, transparent calc(100% / 4))`;
  let todayPct = null, curWeek = null, curDay = null;
  if (start) {
    const sd = new Date(start + "T00:00:00");
    if (!isNaN(sd.getTime())) { const days = (new Date().getTime() - sd.getTime()) / 86400000; todayPct = (Math.max(0, Math.min(WEEKS_DAYS, days)) / WEEKS_DAYS) * 100; curWeek = Math.max(1, Math.min(GRID, Math.floor(days / 7) + 1)); curDay = Math.max(1, Math.min(WEEKS_DAYS, Math.floor(days) + 1)); }
  }
  // TechHub の暦（行ごとの開始日・終了日。日数は開始日からの通し日）
  const techCal = (() => {
    let d = 0;
    const groups = MQ_TECH_GROUPS.map((gr) => ({ g: gr.g, rows: gr.rows.map((row) => {
      const per = row.unit ? mqPace.p : mqPace.q, len = Math.max(1, Math.ceil(row.qn / Math.max(0.5, per)));
      const o = { row, d0: d, d1: d + len }; d += len; return o;
    }) }));
    const weeks = Math.max(1, Math.ceil(d / 7));
    const sd = start ? new Date(start + "T00:00:00") : null, ok = sd && !isNaN(sd.getTime());
    const at = (k) => { const x = new Date(sd.getTime()); x.setDate(x.getDate() + k); return x; };
    const md = (k) => { if (!ok) return null; const x = at(k); return `${x.getMonth() + 1}/${x.getDate()}`; };
    let today = null;
    if (ok) { const n = (new Date().getTime() - sd.getTime()) / 86400000; if (n >= 0 && n <= weeks * 7) today = (n / (weeks * 7)) * 100; }
    const months = [];
    if (ok) for (let k = 0; k < weeks * 7; k++) { const x = at(k), key = x.getFullYear() * 12 + x.getMonth(); if (!months.length || months[months.length - 1].key !== key) months.push({ key, y: x.getFullYear(), m: x.getMonth() + 1, n: 0 }); months[months.length - 1].n++; }
    return { groups, days: d, weeks, D: weeks * 7, ok, md, today, months, end: ok ? at(Math.max(0, d - 1)) : null };
  })();
  const techBG = `repeating-linear-gradient(90deg, ${NOVA.panelSoft}, ${NOVA.panelSoft} 1px, transparent 1px, transparent calc(100% / ${techCal.weeks}))`;
  const calRange = (c) => { const a = techCal.md(c.d0), b = techCal.md(c.d1 - 1), n = c.d1 - c.d0; return a ? `${a}${n > 1 ? "–" + b : ""}（${n}${en ? "d" : "日"}）` : (en ? `day ${c.d0 + 1}${n > 1 ? "–" + c.d1 : ""}` : `${c.d0 + 1}${n > 1 ? "〜" + c.d1 : ""}日目`); };
  // 週nの開始日を M/D で（開始日未設定なら null）
  const wkDate = (n) => { if (!start) return null; const d = new Date(start + "T00:00:00"); if (isNaN(d.getTime())) return null; d.setDate(d.getDate() + (n - 1) * 7); return (d.getMonth() + 1) + "/" + d.getDate(); };
  // バー位置は常に週基準（データの s/e は週番号）。表示単位が変わっても比率は同じ。
  const barLeft = (t) => ((t.s - 1) / GRID) * 100;
  const barWidth = (t) => ((t.e - t.s + 1) / GRID) * 100;
  const udemyTag = (<span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 0.5, color: "#A435F0", border: "1px solid #A435F0", borderRadius: 4, padding: "1px 4px", flexShrink: 0 }}>UDEMY</span>);
  const kindleTag = (<span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 0.5, color: "#F79B34", border: "1px solid #F79B34", borderRadius: 4, padding: "1px 4px", flexShrink: 0 }}>KINDLE</span>);
  const toggleBtn = (active) => ({ background: active ? NOVA.accent : "transparent", border: `1px solid ${active ? NOVA.accent : NOVA.line}`, borderRadius: 999, padding: "3px 13px", fontSize: 11, fontWeight: 700, color: active ? "#fff" : NOVA.sub, cursor: "pointer", letterSpacing: 0.3 });
  const tagFor = (kind) => { const c = kind === "book" ? "#F79B34" : "#A435F0"; return (<span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 0.5, color: c, border: `1px solid ${c}`, borderRadius: 4, padding: "1px 4px", flexShrink: 0 }}>{kind === "book" ? "KINDLE" : "UDEMY"}</span>); };
  // チェックボックス付き関連教材の1行（○未表示なし・完了はチェック済初期値）
  const resNode = (kind, done, title, key) => {
    const on = resIsDone(title, done);
    return (
      <div key={key} onClick={(ev) => { ev.stopPropagation(); toggleRes(title, done); }} style={{ display: "flex", gap: 7, alignItems: "flex-start", fontSize: 11.5, cursor: "pointer", padding: "1px 0" }}>
        <span style={{ width: 13, height: 13, borderRadius: 3, flexShrink: 0, marginTop: 2, border: `1.5px solid ${on ? "#158F6B" : NOVA.line}`, background: on ? "#158F6B" : "transparent", color: "#fff", fontSize: 9, lineHeight: "11px", textAlign: "center", fontWeight: 800 }}>{on ? "✓" : ""}</span>
        {tagFor(kind)}
        <span style={{ color: on ? NOVA.faint : NOVA.sub, textDecoration: on ? "line-through" : "none" }}>{title}</span>
      </div>
    );
  };
  // 関連教材文字列配列（"✓完了/○未/★"プレフィックス付き）をチェックボックス行に
  const resList = (kind, arr) => arr.map((s, j) => { const p = parseRes(s); if (p.gap) return (<div key={kind + "g" + j} style={{ display: "flex", gap: 7, alignItems: "baseline", fontSize: 11.5, color: "#B7791F" }}><span style={{ flexShrink: 0 }}>▲</span><span>{p.text.replace(/^★\s*/, "")}</span></div>); if (p.plain) return (<div key={kind + "p" + j} style={{ fontSize: 11, color: NOVA.faint, paddingLeft: 2 }}>{p.text}</div>); return resNode(kind, p.done, p.title, kind + j); });
  // TechHubのテーマ別関連教材（14テーマ・折りたたみ）
  const matGroups = (heading, arr, kp) => (
    <div style={{ marginBottom: 4 }}>
      <div style={{ fontSize: 9.5, letterSpacing: 1, fontWeight: 800, color: NOVA.faint, marginBottom: 5 }}>{heading}</div>
      {arr.map((th, ti) => {
        const key = kp + ti; const opn = !!themeOpen[key]; const total = th.u.length + th.b.length;
        const doneN = th.u.filter((x) => resIsDone(x[1], x[0])).length + th.b.filter((x) => resIsDone(x[1], x[0])).length;
        return (
          <div key={key} style={{ borderTop: `1px solid ${NOVA.line}` }}>
            <div onClick={(ev) => { ev.stopPropagation(); setThemeOpen((s) => ({ ...s, [key]: !opn })); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 2px", cursor: "pointer" }}>
              <span style={{ color: NOVA.faint, fontSize: 9, width: 8, flexShrink: 0 }}>{opn ? "▾" : "▸"}</span>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: NOVA.ink }}>{ti + 1}. {th.t}</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 10, color: doneN ? "#158F6B" : NOVA.faint, fontWeight: 700 }}>{doneN}/{total}</span>
              <span style={{ fontSize: 9.5, color: NOVA.faint }}>{en ? "U" : "講"}{th.u.length}·{en ? "K" : "書"}{th.b.length}</span>
            </div>
            {opn ? (
              <div style={{ paddingLeft: 16, paddingBottom: 7, display: "flex", flexDirection: "column", gap: 2 }}>
                {th.u.map((x, j) => resNode("udemy", !!x[0], x[1], kp + "u" + ti + "_" + j))}
                {th.b.map((x, j) => resNode("book", !!x[0], x[1], kp + "b" + ti + "_" + j))}
                {total === 0 ? <div style={{ fontSize: 11, color: NOVA.faint }}>{en ? "no direct match — see Learning Tracker" : "直接該当なし — Learning Tracker参照"}</div> : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
  const megaThemes = () => matGroups(en ? "AI-ARCHITECT MATERIALS — BY THEME (checkable)" : "AIアーキテクト関連教材 — テーマ別（チェック可）", MEGATECH_THEME_MATERIALS, "m");
  const consDomains = () => matGroups(en ? "CONSULTING MATERIALS — BY DOMAIN (checkable)" : "コンサル関連教材 — ドメイン別（チェック可）", CONSULTING_DOMAIN_MATERIALS, "c");

  const renderRow = (t) => {
    const p = pctOf(t); const col = statusColor(t); const exp = expanded === t.id; const done = isDone(t);
    return (
      <div key={t.id} style={{ borderBottom: `1px solid ${NOVA.line}` }}>
        <div onClick={() => setExpanded(exp ? null : t.id)} style={{ display: "flex", alignItems: "center", cursor: "pointer", minHeight: 30 }}>
          <div style={{ width: LABELW, flexShrink: 0, display: "flex", alignItems: "center", gap: 5, paddingRight: 6, boxSizing: "border-box" }}>
            <span style={{ color: NOVA.faint, fontSize: 9, width: 8, flexShrink: 0 }}>{exp ? "▾" : "▸"}</span>
            <span style={{ width: 7, height: 7, borderRadius: t.isHub ? 2 : 999, background: NOVA[t.hub] || NOVA.accent, flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0, fontSize: t.isHub ? 10 : 10.5, fontWeight: 800, color: done ? "#158F6B" : NOVA.ink, lineHeight: 1.25, wordBreak: "keep-all", overflowWrap: "break-word" }}>{t.isHub ? hubName(t.hub) : (t.cert || (en ? "Capstone" : "総仕上げ"))}</span>
          </div>
          <div style={{ flex: 1, position: "relative", height: 22, background: gridBG }}>
            <div style={{ position: "absolute", left: barLeft(t) + "%", width: barWidth(t) + "%", top: 3, height: 16, background: NOVA.panelSoft, border: `1px solid ${done ? "#158F6B" : p === 0 ? NOVA.line : (NOVA[t.hub] || NOVA.megatech)}`, borderRadius: 5, overflow: "hidden", boxSizing: "border-box" }}>
              <div style={{ width: (done ? 100 : p) + "%", height: "100%", background: col, opacity: done ? 1 : 0.85 }} />
              <span style={{ position: "absolute", left: 5, top: 0, bottom: 0, display: "flex", alignItems: "center", fontSize: 9, fontWeight: 800, color: p > 40 || done ? "#fff" : NOVA.sub }}>{done ? "✓" : p + "%"}</span>
            </div>
            {todayPct !== null ? <div style={{ position: "absolute", left: todayPct + "%", top: -2, bottom: -2, width: 2, background: "#C0392B", opacity: 0.8 }} /> : null}
          </div>
        </div>
        {exp ? (
          <div style={{ padding: "4px 0 12px", paddingLeft: LABELW }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: NOVA.ink, marginBottom: 2 }}>
              {t.isHub ? (hubName(t.hub) + "（" + t.sub[en ? 1 : 0] + "）") : t.theme[en ? 1 : 0]}
              <button onClick={(ev) => { ev.stopPropagation(); onResume && onResume(t.hub); }} style={{ marginLeft: 8, background: "transparent", border: "none", cursor: "pointer", padding: 0, fontSize: 10.5, fontWeight: 700, color: NOVA[t.hub] || NOVA.sub }}>{hubName(t.hub)} →</button>
            </div>
            <div style={{ fontSize: 12, color: NOVA.sub, lineHeight: 1.6, marginBottom: 8 }}>{t.isHub ? t.note[en ? 1 : 0] : t.focus[en ? 1 : 0]}</div>
            {t.isHub ? (
              <div style={{ background: NOVA.panelSoft, border: `1px solid ${NOVA.line}`, borderRadius: 8, padding: "8px 10px", marginBottom: 9 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: NOVA[t.hub] || NOVA.ink, marginBottom: 5 }}>{en ? "Pace" : "ペース"}：<span style={{ color: NOVA.sub, fontWeight: 600 }}>{t.pace[en ? 1 : 0]}</span></div>
                {t.plan.map((row, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, alignItems: "baseline", fontSize: 11.5, color: NOVA.sub, padding: "1px 0" }}>
                    <span style={{ fontWeight: 800, color: NOVA.ink, minWidth: 78, flexShrink: 0 }}>{row[0]}</span>
                    <span>{en && row[2] ? row[2] : row[1]}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {catsOf(t) ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 9 }}>
                {catsOf(t).map((c, i) => {
                  const on = !!(state[t.id] || {})["c" + i];
                  const activeBg = c.n[0] === "合格" ? "#158F6B" : NOVA.accent;
                  return (
                    <button key={i} onClick={(ev) => { ev.stopPropagation(); toggleCat(t, i); }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, background: on ? activeBg : "transparent", border: `1.5px solid ${on ? activeBg : NOVA.line}`, borderRadius: 999, padding: "2px 9px", fontSize: 11, fontWeight: 700, color: on ? "#fff" : NOVA.sub, cursor: "pointer" }}>
                      <span style={{ fontSize: 9 }}>{on ? "✓" : "○"}</span>{c.n[en ? 1 : 0]}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 9 }}>
                {milesOf(t).map((m) => {
                  const on = !!(state[t.id] || {})[m.k];
                  const activeBg = (m.k === "passed" || m.k === "c4") ? "#158F6B" : NOVA.accent;
                  return (
                    <button key={m.k} onClick={(ev) => { ev.stopPropagation(); toggleMile(t, m.k); }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, background: on ? activeBg : "transparent", border: `1.5px solid ${on ? activeBg : NOVA.line}`, borderRadius: 999, padding: "2px 9px", fontSize: 11, fontWeight: 700, color: on ? "#fff" : NOVA.sub, cursor: "pointer" }}>
                      <span style={{ fontSize: 9 }}>{on ? "✓" : "○"}</span>{m.label[en ? 1 : 0]}
                    </button>
                  );
                })}
              </div>
            )}
            {t.id === "HUB-MEGATECH" ? megaThemes() : t.id === "HUB-CONSULTING" ? consDomains() : (
              <>
                {(t.udemy.length || t.books.length) ? (
                  <div style={{ fontSize: 9.5, letterSpacing: 1, fontWeight: 800, color: NOVA.faint, marginBottom: 4 }}>{en ? "RELATED COURSES & BOOKS (check to mark done)" : "関連する講座・書籍（チェックで完了）"}</div>
                ) : null}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {resList("udemy", t.udemy)}
                  {resList("book", t.books)}
                </div>
              </>
            )}
            <div style={{ fontSize: 10.5, color: NOVA.faint, marginTop: 7 }}>{en ? "Full list with status in the Learning Tracker." : "全リストとステータスはLearning Trackerで。"} <button onClick={(ev) => { ev.stopPropagation(); onResume && onResume("tracker"); }} style={{ background: "transparent", border: "none", padding: 0, color: NOVA.accent, fontWeight: 700, fontSize: 10.5, cursor: "pointer" }}>{en ? "Open →" : "開く →"}</button></div>
          </div>
        ) : null}
      </div>
    );
  };

  // グループ見出し（クリックで開閉・右端に進捗サマリー）
  const grpHeader = (key, txt, summary) => {
    const opn = !!grpOpen[key];
    return (
      <div onClick={() => setGrpOpen((s) => ({ ...s, [key]: !opn }))} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 0 4px", cursor: "pointer" }}>
        <span style={{ color: NOVA.faint, fontSize: 9, width: 9, flexShrink: 0 }}>{opn ? "▾" : "▸"}</span>
        <span style={{ fontSize: 10, letterSpacing: 1.5, fontWeight: 800, color: NOVA.faint }}>{txt}</span>
        <span style={{ flex: 1 }} />
        {summary ? <span style={{ fontSize: 10, fontWeight: 700, color: NOVA.sub }}>{summary}</span> : null}
      </div>
    );
  };
  const dayCol = (d) => (
    <div style={{ flex: "1 1 240px", minWidth: 240, background: NOVA.panelSoft, border: `1px solid ${NOVA.line}`, borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: NOVA.ink, marginBottom: 6 }}>{d.h[en ? 1 : 0]}</div>
      {d.rows.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "baseline", padding: "2px 0", fontSize: 11.5, borderTop: i ? `1px solid ${NOVA.line}` : "none" }}>
          <span style={{ fontWeight: 700, color: NOVA.accent, minWidth: 48, flexShrink: 0 }}>{r[1]}</span>
          <span style={{ fontWeight: 700, color: NOVA.ink, minWidth: 88, flexShrink: 0 }}>{r[0]}</span>
          <span style={{ color: NOVA.sub }}>{r[2]}</span>
        </div>
      ))}
    </div>
  );
  // 月＋週ヘッダー（両パターン共用）
  const gridHeader = () => (<>
    <div style={{ display: "flex", marginLeft: LABELW, borderBottom: `1px solid ${NOVA.line}` }}>
      {BOOTCAMP_MONTHS.map((mo) => (<div key={mo.m} style={{ width: ((mo.e - mo.s + 1) / GRID) * 100 + "%", padding: "0 0 3px", borderLeft: `1px solid ${NOVA.line}`, boxSizing: "border-box" }}><div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5, color: NOVA.ink, paddingLeft: 6 }}>{mo.title[en ? 1 : 0]}</div></div>))}
    </div>
    <div style={{ display: "flex", marginLeft: LABELW, borderBottom: `1px solid ${NOVA.line}`, background: isDay ? gridBG : "none" }}>
      {Array.from({ length: GRID }, (_, i) => (<div key={i} style={{ width: 100 / GRID + "%", textAlign: "center", fontSize: 8.5, color: curWeek === i + 1 ? "#C0392B" : NOVA.faint, fontWeight: curWeek === i + 1 ? 800 : 600, padding: "2px 0", borderLeft: `1px solid ${i % 4 === 0 ? NOVA.line : (isDay ? NOVA.line : "transparent")}`, boxSizing: "border-box", lineHeight: 1.2 }}>W{i + 1}{wkDate(i + 1) ? <div style={{ fontSize: 7.5, color: curWeek === i + 1 ? "#C0392B" : NOVA.faint, fontWeight: 600 }}>{wkDate(i + 1)}</div> : null}</div>))}
    </div>
    {isDay ? (
      <div style={{ display: "flex", marginLeft: LABELW, borderBottom: `1px solid ${NOVA.line}` }}>
        {Array.from({ length: WEEKS_DAYS }, (_, i) => { const isToday = curDay === i + 1; return (<div key={i} style={{ width: 100 / WEEKS_DAYS + "%", textAlign: "center", fontSize: 6.5, color: isToday ? "#C0392B" : NOVA.faint, fontWeight: isToday ? 800 : 500, padding: "1px 0", borderLeft: `1px solid ${i % 7 === 0 ? NOVA.line : "transparent"}`, boxSizing: "border-box", lineHeight: 1 }}>{(i % 7 === 0 || isToday) ? (i + 1) : ""}</div>); })}
      </div>
    ) : null}
  </>);
  // 全問制覇：テーマ/ドメイン1行（問数ラベル＋バー＋¼刻みチェック）
  // cal は TechHub の行の暦（{ d0, d1 }＝開始日からの通し日）。.map から呼ぶ Consulting は第2引数が添字なので、オブジェクトのときだけ暦として使う
  const renderQRow = (row, calArg) => {
    const cal = calArg && typeof calArg === "object" ? calArg : null;
    const p = pctOf(row); const done = p === 100; const col = done ? "#158F6B" : (p === 0 ? NOVA.faint : (NOVA[row.hub] || NOVA.megatech)); const exp = expanded === row.id;
    return (
      <div key={row.id} style={{ borderBottom: `1px solid ${NOVA.line}` }}>
        <div onClick={() => setExpanded(exp ? null : row.id)} style={{ display: "flex", alignItems: "center", cursor: "pointer", minHeight: 28 }}>
          <div style={{ width: LABELW, flexShrink: 0, display: "flex", alignItems: "center", gap: 5, paddingRight: 6, boxSizing: "border-box" }}>
            <span style={{ color: NOVA.faint, fontSize: 9, width: 8, flexShrink: 0 }}>{exp ? "▾" : "▸"}</span>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: NOVA[row.hub] || NOVA.accent, flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0, fontSize: 10, fontWeight: 800, color: done ? "#158F6B" : NOVA.ink, lineHeight: 1.25, wordBreak: "keep-all", overflowWrap: "break-word" }}>{row.name[en ? 1 : 0]}</span>
            <span style={{ fontSize: 9, color: NOVA.faint, flexShrink: 0 }}>{row.qn}</span>
          </div>
          <div style={{ flex: 1, position: "relative", height: 20, background: cal ? techBG : gridBG }}>
            <div style={{ position: "absolute", left: (cal ? (cal.d0 / techCal.D) * 100 : barLeft(row)) + "%", width: (cal ? ((cal.d1 - cal.d0) / techCal.D) * 100 : barWidth(row)) + "%", minWidth: cal ? 30 : 0, top: 3, height: 14, background: NOVA.panelSoft, border: `1px solid ${done ? "#158F6B" : p === 0 ? NOVA.line : (NOVA[row.hub] || NOVA.megatech)}`, borderRadius: 5, overflow: "hidden", boxSizing: "border-box" }}>
              <div style={{ width: p + "%", height: "100%", background: col, opacity: done ? 1 : 0.85 }} />
              <span style={{ position: "absolute", left: 4, top: 0, bottom: 0, display: "flex", alignItems: "center", fontSize: 8.5, fontWeight: 800, color: p > 45 ? "#fff" : NOVA.sub }}>{done ? "✓" : p + "%"}</span>
            </div>
            {(cal ? techCal.today : todayPct) !== null ? <div style={{ position: "absolute", left: (cal ? techCal.today : todayPct) + "%", top: -2, bottom: -2, width: 2, background: "#C0392B", opacity: 0.8 }} /> : null}
          </div>
        </div>
        {exp ? (
          <div style={{ padding: "3px 0 9px", paddingLeft: LABELW }}>
            <div style={{ fontSize: 11, color: NOVA.sub, marginBottom: 6 }}>
              {row.name[en ? 1 : 0]}・{row.qn}{row.unit ? (en ? " items" : "項目") : (en ? " Q" : "問")}{cal ? `　${calRange(cal)}` : ""}
              {row.cats ? (en ? " — tick each section as you finish it" : " — 区分ごとに終えたらチェック") : (en ? " — check each quarter" : " — ¼ごとにチェック")}
            </div>
            {row.cats ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {row.cats.map((c, i) => {
                  const on = !!(state[row.id] || {})["c" + i];
                  return (<button key={i} onClick={(ev) => { ev.stopPropagation(); toggleCat(row, i); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: on ? (NOVA[row.hub] || NOVA.accent) : "transparent", border: `1.5px solid ${on ? (NOVA[row.hub] || NOVA.accent) : NOVA.line}`, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700, color: on ? "#fff" : NOVA.sub, cursor: "pointer" }}><span style={{ fontSize: 9 }}>{on ? "✓" : "○"}</span>{c.n[en ? 1 : 0]}{row.unit ? null : <>（{c.q}{en ? "" : "問"}）</>}</button>);
                })}
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[["q1", 0.25, ["¼", "¼"]], ["q2", 0.5, ["½", "½"]], ["q3", 0.75, ["¾", "¾"]], ["q4", 1, ["全問完了", "100%"]]].map(([k, frac, lab]) => {
                  const on = pctOf(row) / 100 >= frac - 0.001; const bg = frac === 1 ? "#158F6B" : NOVA.accent;
                  return (<button key={k} onClick={(ev) => { ev.stopPropagation(); setQuarter(row, on ? frac - 0.25 : frac); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: on ? bg : "transparent", border: `1.5px solid ${on ? bg : NOVA.line}`, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700, color: on ? "#fff" : NOVA.sub, cursor: "pointer" }}><span style={{ fontSize: 9 }}>{on ? "✓" : "○"}</span>{lab[en ? 1 : 0]}（〜{Math.round(row.qn * frac)}{en ? "" : "問"}）</button>);
                })}
              </div>
            )}
            {(() => { const mat = row.mk === "mega" ? MEGATECH_THEME_MATERIALS[row.mi] : row.mk === "cons" ? CONSULTING_DOMAIN_MATERIALS[row.mi] : null; if (!mat || (!mat.u.length && !mat.b.length)) return null; return (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 9.5, letterSpacing: 1, fontWeight: 800, color: NOVA.faint, marginBottom: 4 }}>{en ? "RELATED COURSES & BOOKS (check to mark done)" : "関連する講座・書籍（チェックで完了）"}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {mat.u.map((x, j) => resNode("udemy", !!x[0], x[1], "q" + row.id + "u" + j))}
                  {mat.b.map((x, j) => resNode("book", !!x[0], x[1], "q" + row.id + "b" + j))}
                </div>
              </div>
            ); })()}
          </div>
        ) : null}
      </div>
    );
  };
  // 任意学習の1行：週割りを持たず全幅の「随時」バンド。進捗は¼刻みで記録のみ。
  const renderOptRow = (row) => {
    const p = pctOf(row); const done = p === 100; const exp = expanded === row.id; const col = NOVA[row.hub] || NOVA.accent;
    return (
      <div key={row.id} style={{ borderBottom: `1px solid ${NOVA.line}` }}>
        <div onClick={() => setExpanded(exp ? null : row.id)} style={{ display: "flex", alignItems: "center", cursor: "pointer", minHeight: 28 }}>
          <div style={{ width: LABELW, flexShrink: 0, display: "flex", alignItems: "center", gap: 5, paddingRight: 6, boxSizing: "border-box" }}>
            <span style={{ color: NOVA.faint, fontSize: 9, width: 8, flexShrink: 0 }}>{exp ? "▾" : "▸"}</span>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: col, flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0, fontSize: 10, fontWeight: 800, color: done ? "#158F6B" : NOVA.ink, lineHeight: 1.25, wordBreak: "keep-all", overflowWrap: "break-word" }}>{row.name[en ? 1 : 0]}</span>
          </div>
          <div style={{ flex: 1, position: "relative", height: 20, background: gridBG }}>
            <div style={{ position: "absolute", left: 0, width: "100%", top: 3, height: 14, background: NOVA.panelSoft, border: `1.5px dashed ${done ? "#158F6B" : col}`, borderRadius: 5, overflow: "hidden", boxSizing: "border-box", opacity: 0.95 }}>
              <div style={{ width: p + "%", height: "100%", background: col, opacity: done ? 0.9 : 0.4 }} />
              <span style={{ position: "absolute", left: 6, top: 0, bottom: 0, display: "flex", alignItems: "center", fontSize: 8.5, fontWeight: 800, color: done ? "#158F6B" : NOVA.sub }}>{done ? "✓ 完了" : (en ? `anytime · ${p}%` : `随時 · ${p}%`)}</span>
            </div>
            {todayPct !== null ? <div style={{ position: "absolute", left: todayPct + "%", top: -2, bottom: -2, width: 2, background: "#C0392B", opacity: 0.8 }} /> : null}
          </div>
        </div>
        {exp ? (
          <div style={{ padding: "3px 0 10px", paddingLeft: LABELW }}>
            <div style={{ fontSize: 11, color: NOVA.sub, marginBottom: 6 }}>{en ? "study anytime — tick each section, log only (off-schedule)" : "時間がある日に。各セクションをチェックして記録（スケジュール外）"}
              <button onClick={(ev) => { ev.stopPropagation(); onResume && onResume(row.to); }} style={{ marginLeft: 8, background: "transparent", border: "none", cursor: "pointer", padding: 0, fontSize: 10.5, fontWeight: 700, color: col }}>{row.name[en ? 1 : 0]} →</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: optDone(row) ? "#158F6B" : NOVA.sub }}>{optDone(row)} / {optLeaves(row).length}{en ? " done" : " 件"}</span>
              <button onClick={(ev) => { ev.stopPropagation(); setAllTasks(row, true); }} style={{ background: "transparent", border: `1px solid ${NOVA.line}`, borderRadius: 999, padding: "1px 9px", fontSize: 10, fontWeight: 700, color: NOVA.sub, cursor: "pointer" }}>{en ? "all" : "全チェック"}</button>
              <button onClick={(ev) => { ev.stopPropagation(); setAllTasks(row, false); }} style={{ background: "transparent", border: `1px solid ${NOVA.line}`, borderRadius: 999, padding: "1px 9px", fontSize: 10, fontWeight: 700, color: NOVA.sub, cursor: "pointer" }}>{en ? "clear" : "解除"}</button>
            </div>
            {(() => { let gi = 0; return row.tasks.map((grp, gIdx) => {
              const start = gi; const n = grp.items.length; gi += n;
              const key = row.id + "#" + gIdx; const opn = !!optOpen[key];
              let dn = 0; for (let j = start; j < start + n; j++) if ((state[row.id] || {})["t" + j]) dn++;
              return (
                <div key={gIdx} style={{ borderTop: `1px solid ${NOVA.line}` }}>
                  <div onClick={(ev) => { ev.stopPropagation(); setOptOpen((s) => ({ ...s, [key]: !opn })); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 2px", cursor: "pointer" }}>
                    <span style={{ color: NOVA.faint, fontSize: 9, width: 8, flexShrink: 0 }}>{opn ? "▾" : "▸"}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: n > 0 && dn === n ? "#158F6B" : NOVA.ink }}>{grp.g ? grp.g[en ? 1 : 0] : (en ? "Section" : "項目")}</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: dn ? "#158F6B" : NOVA.faint }}>{dn}/{n}</span>
                  </div>
                  {opn ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, padding: "1px 0 7px 16px" }}>
                      {grp.items.map((it, k) => { const i = start + k; const on = !!(state[row.id] || {})["t" + i]; const label = Array.isArray(it) ? it[en ? 1 : 0] : it;
                        return (<button key={i} onClick={(ev) => { ev.stopPropagation(); toggleTask(row, i); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, maxWidth: "100%", textAlign: "left", background: on ? col : "transparent", border: `1.5px solid ${on ? col : NOVA.line}`, borderRadius: 999, padding: "2px 9px", fontSize: 10.5, fontWeight: 700, color: on ? "#fff" : NOVA.sub, cursor: "pointer" }}><span style={{ fontSize: 9, flexShrink: 0 }}>{on ? "✓" : "○"}</span>{label}</button>);
                      })}
                    </div>
                  ) : null}
                </div>
              );
            }); })()}
          </div>
        ) : null}
      </div>
    );
  };
  const qHubDone = (rows) => { let dq = 0, tq = 0; rows.forEach((r) => { tq += r.qn; dq += r.qn * pctOf(r) / 100; }); return { dq: Math.round(dq), tq }; };
  const renderPatternB = () => {
    const mega = qHubDone(BOOTCAMP_QUEST.mega), cons = qHubDone(BOOTCAMP_QUEST.cons);
    const totalDone = mega.dq + cons.dq, totalQ = mega.tq + cons.tq;
    const practiceUnits = BOOTCAMP_QUEST.practice.reduce((a, r) => a + r.qn, 0);
    const qHours = [Math.round(totalQ / 60), Math.round(totalQ * 1.5 / 60)];
    const bar = (label, o, color) => (
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 3 }}><span style={{ fontWeight: 700, color: NOVA.ink }}>{label}</span><span style={{ color: NOVA.sub }}>{o.dq.toLocaleString()} / {o.tq.toLocaleString()}{en ? " Q" : "問"}（{Math.round(o.dq / o.tq * 100)}%）</span></div>
        <div style={{ height: 8, background: NOVA.panelSoft, borderRadius: 999, overflow: "hidden" }}><div style={{ width: (o.dq / o.tq * 100) + "%", height: "100%", background: color }} /></div>
      </div>
    );
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <label style={{ fontSize: 11.5, color: NOVA.sub, display: "inline-flex", alignItems: "center", gap: 6 }}>{en ? "Start" : "開始日"}
            <input type="date" value={start} onChange={(e) => onStart(e.target.value)} style={{ border: `1px solid ${NOVA.line}`, borderRadius: 6, padding: "3px 7px", fontSize: 11.5, color: NOVA.ink }} />
          </label>
          {curWeek ? <span style={{ fontSize: 11, fontWeight: 700, color: "#C0392B" }}>{en ? `Now W${curWeek}${isDay ? ` · D${curDay}` : ""}` : `現在 W${curWeek}${isDay ? `・${curDay}日目` : ""}`}</span> : <span style={{ fontSize: 11, color: NOVA.faint }}>{en ? "set start for today-line" : "開始日で今日線が出ます"}</span>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setShowPhases((v) => !v)} style={toggleBtn(showPhases)}>{en ? "Overview" : "計画サマリー"}</button>
          <button onClick={() => setShowLoad((v) => !v)} style={toggleBtn(showLoad)}>{en ? "Workload" : "学習量の試算"}</button>
        </div>
        {showLoad ? (
          <div style={{ background: NOVA.panelSoft, border: `1px solid ${NOVA.line}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontSize: 12, color: NOVA.sub, lineHeight: 1.75 }}>
            <div style={{ fontWeight: 800, color: NOVA.ink, marginBottom: 4 }}>{en ? "Full-completion workload" : "全問制覇の学習量・試算"}</div>
            {en
              ? (<span>Questions total <b>{totalQ.toLocaleString()}</b> (TechHub {mega.tq.toLocaleString()} + Consulting {cons.tq.toLocaleString()}); the TechHub glossary ({MQ_GLOSSARY.toLocaleString()}) is a reference dictionary, off-timeline. At 1–1.5 min/Q that is <b>~{qHours[0]}–{qHours[1]} h</b> for questions alone, plus the {certTotal} certs. At ~25 h/week the questions finish in ~{Math.round(qHours[1] / 25)} weeks; with certs in parallel, plan on the full 16 weeks.</span>)
              : (<span>問題は合計 <b>{totalQ.toLocaleString()}問</b>（TechHub {mega.tq.toLocaleString()}＋Consulting {cons.tq.toLocaleString()}）。TechHubの用語辞典{MQ_GLOSSARY.toLocaleString()}は“辞書”として随時参照する前提で別枠。1問あたり1〜1.5分なら問題消化だけで <b>約{qHours[0]}〜{qHours[1]}時間</b>、これに{certTotal}資格が加わる。週約25hなら問題は約{Math.round(qHours[1] / 25)}週で完了、資格と並行で16週が目安。</span>)}
          </div>
        ) : null}
        {showPhases ? (<>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
            {BOOTCAMP_MONTHS.map((mo) => (
              <div key={mo.m} style={{ flex: "1 1 170px", minWidth: 170, background: NOVA.panelSoft, border: `1px solid ${NOVA.line}`, borderRadius: 10, padding: "11px 13px" }}>
                <div style={{ fontFamily: NOVA_SERIF, fontSize: 13.5, fontWeight: 700, color: NOVA.ink, marginBottom: 5 }}>{mo.title[en ? 1 : 0]}</div>
                <div style={{ fontSize: 11, color: NOVA.sub, lineHeight: 1.55, marginBottom: 7 }}>{mo.goal[en ? 1 : 0]}</div>
                <div style={{ fontSize: 10.5, color: NOVA.ink, lineHeight: 1.65 }}>
                  <div><span style={{ color: NOVA.faint, fontWeight: 700 }}>{en ? "Certs" : "資格"}</span>　{mo.certs}</div>
                  <div><span style={{ color: NOVA.faint, fontWeight: 700 }}>{en ? "Hubs" : "ハブ"}</span>　{mo.hubFocus[en ? 1 : 0]}</div>
                  <div><span style={{ color: NOVA.faint, fontWeight: 700 }}>{en ? "Load" : "目安"}</span>　{mo.load[en ? 1 : 0]}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, letterSpacing: 1.5, fontWeight: 800, color: NOVA.faint, padding: "2px 0 6px" }}>{en ? "DAILY SCHEDULE (full-completion mode)" : "1日の時間割（全問モード）"}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>{dayCol(BOOTCAMP_QDAILY.weekday)}{dayCol(BOOTCAMP_QDAILY.weekend)}</div>
        </>) : null}
        {showLoad ? (
          <div style={{ background: NOVA.panelSoft, border: `1px solid ${NOVA.line}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontWeight: 800, color: NOVA.ink, marginBottom: 8, fontSize: 12.5 }}>{en ? "Full-completion of both hubs + certs" : "2ハブ全問制覇 ＋ 資格"}</div>
            {bar("TechHub", mega, NOVA.megatech)}
            {bar("Consulting Hub", cons, NOVA.consulting)}
            {bar(en ? "TOTAL questions" : "問題 合計", { dq: totalDone, tq: totalQ }, NOVA.accent)}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 8 }}><span style={{ fontWeight: 700, color: NOVA.ink }}>{en ? "Certificate" : "Certificate"}</span><span style={{ color: certsDone >= certTotal ? "#158F6B" : NOVA.sub, fontWeight: 700 }}>{certsDone} / {certTotal}</span></div>
            <div style={{ fontSize: 11.5, color: NOVA.sub, lineHeight: 1.7, marginTop: 6 }}>{BOOTCAMP_QDAILY.summary[en ? 1 : 0]}</div>
          </div>
        ) : null}
        <div style={{ height: 7, background: NOVA.panelSoft, borderRadius: 999, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ width: overall + "%", height: "100%", background: overall >= 100 ? "#158F6B" : NOVA.accent, transition: "width .3s" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          {["certification", "megatech", "consulting", "tracker"].map((h) => (
            <button key={h} onClick={() => onResume && onResume(h)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${NOVA.line}`, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: NOVA.sub, cursor: "pointer" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: NOVA[h] || NOVA.accent }} />{hubName(h)} →
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ display: "inline-flex", border: `1px solid ${NOVA.line}`, borderRadius: 999, overflow: "hidden" }}>
            {[["week", en ? "Weekly" : "週表示"], ["day", en ? "Daily" : "日表示"]].map(([k, l], i) => (
              <button key={k} onClick={() => setTl(k)} style={{ background: tl === k ? NOVA.accent : "transparent", color: tl === k ? "#fff" : NOVA.sub, border: "none", borderLeft: i ? `1px solid ${NOVA.line}` : "none", padding: "4px 16px", fontSize: 11.5, fontWeight: 700, letterSpacing: 0.3, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          <span style={{ fontSize: 10.5, color: NOVA.faint }}>{isDay ? (en ? "day-resolution axis (scroll →)" : "1日単位の目盛り（横スクロール →）") : (en ? "week-resolution axis" : "1週間単位の目盛り")}</span>
        </div>
        <div style={{ display: "flex", gap: 10, fontSize: 10, color: NOVA.sub, alignItems: "center", marginBottom: 6 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: NOVA.faint }} />{en ? "todo" : "未着手"}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: NOVA.megatech }} />{en ? "in progress" : "進行中"}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "#158F6B" }} />{en ? "all done" : "全問完了"}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 2, height: 11, background: "#C0392B" }} />{en ? "today" : "今日"}</span>
        </div>
        <div>
          {/* 各ハブ（TechHub / Consulting / Certificate）ごとに独立した横スクロール＋目盛りヘッダーを持たせる */}
          {grpHeader("mega", en ? `TECHHUB — QUIZ ${mega.tq.toLocaleString()} + PRACTICE ${practiceUnits}` : `TechHub — クイズ${mega.tq.toLocaleString()}問＋実務コンテンツ${practiceUnits}項目`, `${mega.dq.toLocaleString()} / ${mega.tq.toLocaleString()}${en ? " Q" : "問"}`)}
          {grpOpen.mega ? (<div>
            <div style={{ fontSize: 10.5, color: NOVA.sub, lineHeight: 1.6, padding: "2px 0 6px" }}>{en ? "TechHub has its own calendar, separate from the certs and Consulting plan: rows run one after another in TechHub\u2019s tab order (Core \u2192 AX practice \u2192 Dojo & research \u2192 AI foresight \u2192 Playbook), each sized by the daily pace below." : "TechHub は資格・Consulting の計画とは別の暦。タブの並び（基礎 → AX実務 → 道場・リサーチ → AIフォーサイト → PLAYBOOK）の順に1行ずつ進め、各行の日数は下の1日のペースで決まる。"}</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, fontSize: 11, color: NOVA.sub, marginBottom: 8 }}>
              <label htmlFor="mq-pace-q" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{en ? "Quiz questions per day" : "1日に解くクイズ"}<input id="mq-pace-q" type="number" min="1" step="5" value={mqPace.q} onChange={(e) => onPace("q", e.target.value)} style={{ width: 58, border: `1px solid ${NOVA.line}`, borderRadius: 6, padding: "2px 6px", fontSize: 11, color: NOVA.ink }} />{en ? "Q" : "問"}</label>
              <label htmlFor="mq-pace-p" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{en ? "Practice items per day" : "1日に進める実務コンテンツ"}<input id="mq-pace-p" type="number" min="0.5" step="0.5" value={mqPace.p} onChange={(e) => onPace("p", e.target.value)} style={{ width: 52, border: `1px solid ${NOVA.line}`, borderRadius: 6, padding: "2px 6px", fontSize: 11, color: NOVA.ink }} />{en ? "items" : "項目"}</label>
              <span style={{ fontWeight: 700, color: NOVA.ink }}>{en ? `${techCal.days} days` : `全${techCal.days}日`}{techCal.end ? (en ? ` · ends ${techCal.end.getFullYear()}/${techCal.end.getMonth() + 1}/${techCal.end.getDate()}` : `・終了予定 ${techCal.end.getFullYear()}/${techCal.end.getMonth() + 1}/${techCal.end.getDate()}`) : (en ? " · set the start date to see dates" : "・開始日を入れると日付が出る")}</span>
            </div>
            {(() => { const pr = BOOTCAMP_QUEST.practice, ex = pr.find((r) => r.id === "Q-P3"); return (
              <div style={{ fontSize: 10.5, color: NOVA.faint, lineHeight: 1.6, margin: "-4px 0 8px" }}>{en
                ? `Practice content = the non-quiz rows you work through by reading TechHub\u2019s tabs (${pr.length} rows, ${practiceUnits} items). An item is one section of a row; open a row to tick each one${ex ? ` (e.g. \u201c${ex.name[1]}\u201d has ${ex.qn})` : ""}.`
                : `実務コンテンツ＝クイズ以外の、TechHub のタブを読んで進める行（全${pr.length}行・${practiceUnits}項目）。1項目は行の中の区分1つで、行を開くと項目ごとのチェックが並ぶ${ex ? `（例：「${ex.name[0]}」は${ex.qn}項目）` : ""}。`}</div>
            ); })()}
            <div style={{ overflowX: "auto" }}><div style={{ minWidth: Math.max(800, LABELW + techCal.weeks * 30), position: "relative" }}>
              {techCal.ok ? (
                <div style={{ display: "flex", marginLeft: LABELW, borderBottom: `1px solid ${NOVA.line}` }}>
                  {techCal.months.map((mo) => (<div key={mo.key} style={{ width: (mo.n / techCal.D) * 100 + "%", padding: "0 0 3px 3px", borderLeft: `1px solid ${NOVA.line}`, boxSizing: "border-box", fontSize: 10.5, fontWeight: 800, color: NOVA.ink, whiteSpace: "nowrap", overflow: "hidden" }}>{en ? `${mo.y}/${mo.m}` : (mo.m === 1 || mo === techCal.months[0] ? `${mo.y}年${mo.m}月` : `${mo.m}月`)}</div>))}
                </div>
              ) : null}
              <div style={{ display: "flex", marginLeft: LABELW, borderBottom: `1px solid ${NOVA.line}` }}>
                {Array.from({ length: techCal.weeks }, (_, k) => (<div key={k} style={{ width: 100 / techCal.weeks + "%", textAlign: "center", fontSize: 8.5, color: NOVA.faint, fontWeight: 600, padding: "2px 0", borderLeft: `1px solid ${NOVA.line}`, boxSizing: "border-box", whiteSpace: "nowrap", overflow: "hidden" }}>{techCal.ok ? techCal.md(k * 7) : `W${k + 1}`}</div>))}
              </div>
              {techCal.groups.map((gr) => (<div key={gr.g[1]}>
                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.2, color: NOVA.megatech, padding: "10px 0 4px", borderBottom: `1px solid ${NOVA.line}` }}>{gr.g[en ? 1 : 0]}<span style={{ color: NOVA.faint, fontWeight: 600, letterSpacing: 0, marginLeft: 8 }}>{gr.rows.length}{en ? " rows" : "行"}{gr.rows.length ? `・${calRange({ d0: gr.rows[0].d0, d1: gr.rows[gr.rows.length - 1].d1 })}` : ""}</span></div>
                {gr.rows.map((o) => renderQRow(o.row, { d0: o.d0, d1: o.d1 }))}
              </div>))}
            </div></div>
          </div>) : null}
          {grpHeader("cons", en ? `CONSULTING HUB — ALL BANKS (${cons.tq.toLocaleString()} Q)` : `Consulting Hub — 全バンク（${cons.tq.toLocaleString()}問）`, `${cons.dq.toLocaleString()} / ${cons.tq.toLocaleString()}${en ? " Q" : "問"}`)}
          {grpOpen.cons ? <div style={{ overflowX: "auto" }}><div style={{ minWidth: canvasMin, position: "relative" }}>{gridHeader()}{BOOTCAMP_QUEST.cons.map(renderQRow)}</div></div> : null}
          {grpHeader("cert", en ? "CERTIFICATE" : "Certificate", `${certsDone} / ${certTotal}`)}
          {grpOpen.cert ? <div style={{ overflowX: "auto" }}><div style={{ minWidth: canvasMin, position: "relative" }}>{gridHeader()}{BOOTCAMP_TASKS.filter((t) => t.cert).map(renderRow)}</div></div> : null}
          <div>
            <div onClick={() => setGrpOpen((s) => ({ ...s, opt: !s.opt }))} style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 2px 9px", marginTop: 8, borderTop: `1px solid ${NOVA.line}`, cursor: "pointer" }}>
              <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{grpOpen.opt ? "▾" : "▸"}</span>
              <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", background: `linear-gradient(135deg, ${NOVA.finance}, ${NOVA.linguisticshub} 55%, ${NOVA.languagehub})`, boxShadow: "0 2px 6px rgba(18,58,107,.28)" }}>✦</span>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: NOVA_SERIF, fontSize: 15.5, fontWeight: 700, color: NOVA.ink, letterSpacing: 0.2 }}>{en ? "Explore at Your Own Pace" : "自由選択トラック"}</span>
                  <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1.2, color: "#fff", background: NOVA.finance, borderRadius: 999, padding: "2px 8px" }}>{en ? "ANYTIME" : "随時"}</span>
                </div>
              </div>
            </div>
            {grpOpen.opt ? BOOTCAMP_OPTIONAL.map(renderOptRow) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ margin: "22px 0 4px" }}>
      <div onClick={() => setOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "2px 0" }}>
        <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", background: "linear-gradient(135deg, #0A2E52, #1F6FB0 55%, #3E8FD6)", boxShadow: "0 2px 6px rgba(31,111,176,.30)" }}>◈</span>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: NOVA_SERIF, fontSize: 15.5, fontWeight: 700, color: NOVA.ink, letterSpacing: 0.2 }}>Mastery Track</span>
          </div>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: NOVA.sub, flexShrink: 0 }}>
          <b style={{ color: certsDone >= certTotal ? "#158F6B" : NOVA.accent }}>{certsDone}/{certTotal}</b>{en ? " certs · hubs " : "資格 · ハブ"}
          <b style={{ color: hubPct >= 100 ? "#158F6B" : NOVA.accent }}>{hubPct}%</b>{en ? " · " : " · 全体"}<b style={{ color: overall >= 100 ? "#158F6B" : NOVA.accent }}>{overall}%</b>
        </span>
      </div>
      <NovaRule margin="6px 0 10px" />
      {open ? (
        <div>
          {renderPatternB()}
        </div>
      ) : null}
    </div>
  );
}

// ===== 学習ライブラリ：Learning Tracker(EXCELDATA) をハブ上部に集約（Udemy/書籍/講座/ツール/資格） =====
// Udemy講座の公式コースページURL（tracker上の講座no → udemy.com/course/…）。
// Web検索で実在確認済みのURLのみ登録。未登録の講座はマイコース検索リンクにフォールバックする。
const UDEMY_COURSE_URLS = {
  10: "https://www.udemy.com/course/claude-cowork-starter/",
  18: "https://www.udemy.com/course/claude-code-company/",
  24: "https://www.udemy.com/course/claude-code-arai/",
  26: "https://www.udemy.com/course/aidevloop/",
  32: "https://www.udemy.com/course/agent-skills-fundamentals/",
  33: "https://www.udemy.com/course/multiagent/",
  34: "https://www.udemy.com/course/claudecoworkai/",
  35: "https://www.udemy.com/course/cowork-claude/",
  36: "https://www.udemy.com/course/claude-cowork-japan/",
  37: "https://www.udemy.com/course/agent-skills/",
  48: "https://www.udemy.com/course/aws-saa-practice/",
  49: "https://www.udemy.com/course/aws-solution-architect-professional-aws-sap-test/",
  51: "https://www.udemy.com/course/google-cloud-associate-data-practitioner-a/",
  61: "https://www.udemy.com/course/localllm/",
  62: "https://www.udemy.com/course/local-llm/",
  63: "https://www.udemy.com/course/fine-tuning/",
  64: "https://www.udemy.com/course/ai-agent-langchain/",
  65: "https://www.udemy.com/course/running-open-llms-locally-practical-guide/",
  66: "https://www.udemy.com/course/rag-deploy/",
  67: "https://www.udemy.com/course/llm_mechanism/",
  71: "https://www.udemy.com/course/azure_fundamentals25/",
  72: "https://www.udemy.com/course/aws-serverless-10days/",
  73: "https://www.udemy.com/course/google-cloud-vertexai-ml-ai/",
  74: "https://www.udemy.com/course/amazon-bedrockai-aws/",
  75: "https://www.udemy.com/course/aws-for-beginners-jp/",
  77: "https://www.udemy.com/course/itstrategy/",
  81: "https://www.udemy.com/course/ab-731-microsoft-365-ai/",
  82: "https://www.udemy.com/course/ab-730-microsoft-365-ai-business-professional/",
  83: "https://www.udemy.com/course/ab-900-microsoft-365-copilot/",
  84: "https://www.udemy.com/course/google-cloudgenerative-ai-leader/",
  85: "https://www.udemy.com/course/google-cloud-certification-generative-ai-leader/",
  86: "https://www.udemy.com/course/aws-certified-cloud-practitioner-kikinagashi/",
  88: "https://www.udemy.com/course/2024-ai-900-azure-ai-fundamentals-4-240/",
  89: "https://www.udemy.com/course/it-ofjav/",
  90: "https://www.udemy.com/course/effective-digital-work-shift/",
  95: "https://www.udemy.com/course/copilot-studio-entree/",
  96: "https://www.udemy.com/course/aiaxaiai/",
  97: "https://www.udemy.com/course/aiai-ezn/",
  98: "https://www.udemy.com/course/aiai-wwy/",
  99: "https://www.udemy.com/course/powerpoint7/",
  100: "https://www.udemy.com/course/maeda-pptx/",
  101: "https://www.udemy.com/course/storytelling_powerpoint/",
  102: "https://www.udemy.com/course/ntiytkyr/",
  103: "https://www.udemy.com/course/powerpoint-logical-presentation/",
  104: "https://www.udemy.com/course/shortcut/",
  105: "https://www.udemy.com/course/excel_function/",
  106: "https://www.udemy.com/course/excel-start/",
  107: "https://www.udemy.com/course/excel-jimu/",
  108: "https://www.udemy.com/course/excel-kansu/",
  110: "https://www.udemy.com/course/visualboki/",
  111: "https://www.udemy.com/course/toeic-quotes/",
  112: "https://www.udemy.com/course/presenbmn/",
  113: "https://www.udemy.com/course/1on1-in-english/",
  114: "https://www.udemy.com/course/business-english-newgrad-101/",
  115: "https://www.udemy.com/course/global-standard-english-master/",
  116: "https://www.udemy.com/course/global-pharma-industry-guide/",
  117: "https://www.udemy.com/course/job-interview-skills_jp/",
  118: "https://www.udemy.com/course/wlfjlqdd/",
  119: "https://www.udemy.com/course/shiroganetaichi-planning/",
  120: "https://www.udemy.com/course/sk_brain/",
  121: "https://www.udemy.com/course/presentation_design/",
  122: "https://www.udemy.com/course/presentation_story/",
  123: "https://www.udemy.com/course/logicalspeechskills/",
  124: "https://www.udemy.com/course/powerpoint-z/",
  125: "https://www.udemy.com/course/presenmaster/",
  127: "https://www.udemy.com/course/waveland_academy/",
  128: "https://www.udemy.com/course/kabutraining1/",
  129: "https://www.udemy.com/course/chatgpt-financial-analysis/",
  130: "https://www.udemy.com/course/corporate_strategy/",
  131: "https://www.udemy.com/course/corporate-valuation/",
  132: "https://www.udemy.com/course/20233-go/",
  134: "https://www.udemy.com/course/hoshi-python-basics/",
  135: "https://www.udemy.com/course/llm_python/",
  136: "https://www.udemy.com/course/sql-marketing-analysis/",
  137: "https://www.udemy.com/course/python-anomaly-detection1/",
  138: "https://www.udemy.com/course/statistics-course1/",
  139: "https://www.udemy.com/course/causal-inference-python-excel/",
  140: "https://www.udemy.com/course/python-time-series2/",
  141: "https://www.udemy.com/course/businessskillfordatadriven/",
  142: "https://www.udemy.com/course/marketing-data-analytics-excel/",
  144: "https://www.udemy.com/course/excelfunction/",
  146: "https://www.udemy.com/course/hillabit_knowledge/",
  150: "https://www.udemy.com/course/hypothesis-thinking/",
  152: "https://www.udemy.com/course/tasktimemanagement/",
  153: "https://www.udemy.com/course/ejyfpoih/",
  154: "https://www.udemy.com/course/microsoft-teams-master/",
  155: "https://www.udemy.com/course/microsoft-onenote-pc/",
  156: "https://www.udemy.com/course/teams-24skills/",
  157: "https://www.udemy.com/course/word2020/",
  158: "https://www.udemy.com/course/pc-shortcutkey/",
  159: "https://www.udemy.com/course/windows-shortcut/",
  160: "https://www.udemy.com/course/typing23/",
  167: "https://www.udemy.com/course/dx-iixkb/",
};
const LIBRARY_CATS = (function () {
  try {
    const s = LEARNING_TRACKER_HTML;
    const i = s.indexOf("EXCELDATA");
    const open = s.indexOf("{", i);
    let depth = 0, q = null, txt = null;
    for (let k = open; k < s.length; k++) {
      const c = s[k];
      if (q) { if (c === "\\") { k++; continue; } if (c === q) q = null; continue; }
      if (c === '"') { q = c; continue; }
      if (c === "{") depth++; else if (c === "}") { depth--; if (depth === 0) { txt = s.slice(open, k + 1); break; } }
    }
    const D = JSON.parse(txt);
    const meta = [
      { key: "cert", label: ["資格", "Certifications"], color: "#0A2E52", tag: "CERT", doneStatus: "取得済み", genreKey: "プロバイダー" },
      { key: "udemy", label: ["Udemy 講座", "Udemy courses"], color: "#A435F0", tag: "UDEMY", doneStatus: "完了", genreKey: "ジャンル" },
      { key: "course", label: ["オンライン講座", "Online courses"], color: "#7C4DD6", tag: "COURSE", doneStatus: "完了", genreKey: "ジャンル" },
      { key: "book", label: ["書籍（Kindle）", "Books (Kindle)"], color: "#F79B34", tag: "KINDLE", doneStatus: "完了", genreKey: "ジャンル" },
      { key: "tools", label: ["AIツール教材", "AI tool guides"], color: "#1F6FB0", tag: "TOOL", doneStatus: "完了", genreKey: "大項目" },
    ];
    return meta.map((m) => {
      const arr = D[m.key] || [];
      const items = arr.map((it) => ({
        id: m.key + "|" + it.no,
        name: it.name,
        genre: (it.p && (it.p[m.genreKey] || it.p["ジャンル"] || it.p["大項目"])) || "その他",
        // Udemy講座はURL未登録でも、ログイン中のUdemyアカウントの
        // マイコース検索（その講座がヒットする）へ飛べるリンクを自動生成する
        url: (it.p && it.p["URL"]) || (m.key === "udemy" ? (UDEMY_COURSE_URLS[it.no] || ("https://www.udemy.com/home/my-courses/search/?q=" + encodeURIComponent(it.name))) : null),
        done0: it.status === m.doneStatus,
        s0: (it.p && (it.p["date:開始日:start"] || it.p["date:取得予定日:start"])) || "",
        e0: (it.p && (it.p["date:完了日:start"] || it.p["date:完了時期:start"])) || "",
        prio: (function () { const v = it.p && it.p["優先順位"]; if (v == null || v === "") return 99; const n = parseInt(v, 10); if (!isNaN(n)) return n; return ({ "最高": 0, "高": 1, "中": 2, "低": 3 })[v] != null ? ({ "最高": 0, "高": 1, "中": 2, "低": 3 })[v] : 50; })(),
      }));
      const gmap = {};
      items.forEach((x) => { (gmap[x.genre] = gmap[x.genre] || []).push(x); });
      const groups = Object.keys(gmap).map((g) => ({ g, items: gmap[g] }));
      return { ...m, total: items.length, groups };
    });
  } catch (e) { return []; }
})();

// ポータル：Learning Tracker を「資格 / Udemy / 講座 / 書籍 / ツール」の枠に集約（既定は閉じる）。
function PortalLibrary({ lang, onResume }) {
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});
  const [catOpen, setCatOpen] = useState({});
  const [genreOpen, setGenreOpen] = useState({});
  const [dates, setDates] = useState({});         // id -> {s,e,auto?} 開始/完了日
  const [starred, setStarred] = useState({});     // id -> true（完了後に「再度見直したい」印）
  const [view, setView] = useState("list");        // list | gantt
  const [schedStart, setSchedStart] = useState(""); // 自動スケジュールの起点日
  const [hiddenCats, setHiddenCats] = useState({}); // 絞り込み：非表示カテゴリ
  const [statusFilter, setStatusFilter] = useState("all"); // all | todo | done
  const [query, setQuery] = useState("");          // テキスト検索
  const [itemSort, setItemSort] = useState("prio"); // prio | date | name
  const [groupSort, setGroupSort] = useState("count"); // count | name
  useEffect(() => { (async () => {
    try { const r = await window.storage.get("nova_library_v1"); if (r && r.value) setState(JSON.parse(r.value) || {}); } catch (e) {}
    try { const d = await window.storage.get("nova_library_dates_v1"); if (d && d.value) setDates(JSON.parse(d.value) || {}); } catch (e) {}
    try { const s = await window.storage.get("nova_library_star_v1"); if (s && s.value) setStarred(JSON.parse(s.value) || {}); } catch (e) {}
    try { const u = await window.storage.get("nova_library_ui_v1"); if (u && u.value) { const o = JSON.parse(u.value) || {}; if (o.statusFilter) setStatusFilter(o.statusFilter); if (o.view) setView(o.view); } } catch (e) {}
  })(); }, []);
  // フィルタ／表示モードを記憶（次回開いたとき前回の状態から再開できる）。
  const setStatusFilterP = (v) => { setStatusFilter(v); try { window.storage.set("nova_library_ui_v1", JSON.stringify({ statusFilter: v, view })); } catch (e) {} };
  const setViewP = (v) => { setView(v); try { window.storage.set("nova_library_ui_v1", JSON.stringify({ statusFilter, view: v })); } catch (e) {} };
  const persist = (next) => { try { window.storage.set("nova_library_v1", JSON.stringify(next)); } catch (e) {} };
  const persistD = (next) => { try { window.storage.set("nova_library_dates_v1", JSON.stringify(next)); } catch (e) {} };
  const persistS = (next) => { try { window.storage.set("nova_library_star_v1", JSON.stringify(next)); } catch (e) {} };
  const isStarred = (it) => !!starred[it.id];
  const toggleStar = (it, e) => { if (e) e.stopPropagation(); setStarred((prev) => { const next = { ...prev }; if (next[it.id]) delete next[it.id]; else next[it.id] = true; persistS(next); return next; }); };
  const isDone = (it) => (state[it.id] !== undefined ? state[it.id] : it.done0);
  const toggle = (it) => setState((prev) => { const cur = prev[it.id] !== undefined ? prev[it.id] : it.done0; const next = { ...prev, [it.id]: !cur }; persist(next); return next; });
  const itS = (it) => (dates[it.id] && dates[it.id].s !== undefined ? dates[it.id].s : it.s0) || "";
  const itE = (it) => (dates[it.id] && dates[it.id].e !== undefined ? dates[it.id].e : it.e0) || "";
  const setDate = (it, field, val) => setDates((prev) => {
    const cur = { s: itS(it), e: itE(it), ...(prev[it.id] || {}) }; cur[field] = val; cur.auto = false;
    // 逆転（開始>完了）を防ぐ：開始を動かしたら古い完了は追従、完了を早めたら開始も合わせる
    if (field === "s" && cur.e && dnumU(cur.e) != null && dnumU(val) != null && dnumU(cur.e) < dnumU(val)) cur.e = val;
    if (field === "e" && cur.s && dnumU(cur.s) != null && dnumU(val) != null && dnumU(val) < dnumU(cur.s)) cur.s = val;
    const next = { ...prev, [it.id]: cur }; persistD(next); return next;
  });
  const matchQ = (it) => { const q = query.trim().toLowerCase(); return !q || it.name.toLowerCase().includes(q); };
  const passAll = (it) => passStatus(it) && matchQ(it);
  const sortItemsArr = (arr) => { const a = [...arr]; if (itemSort === "name") a.sort((x, y) => x.name.localeCompare(y.name, "ja")); else if (itemSort === "date") a.sort((x, y) => ((dnumU(itS(x)) != null ? dnumU(itS(x)) : 9e9) - (dnumU(itS(y)) != null ? dnumU(itS(y)) : 9e9)) || x.name.localeCompare(y.name, "ja")); else a.sort((x, y) => (x.prio - y.prio) || x.name.localeCompare(y.name, "ja")); return a; };
  const sortedGroups = (cat, needDate) => { const gs = cat.groups.map((gr) => { let its = gr.items.filter(passAll); if (needDate) its = its.filter((it) => dnumU(itS(it)) != null); return { g: gr.g, its }; }).filter((gr) => gr.its.length); if (groupSort === "name") gs.sort((a, b) => String(a.g).localeCompare(String(b.g), "ja")); else gs.sort((a, b) => b.its.length - a.its.length || String(a.g).localeCompare(String(b.g), "ja")); return gs; };
  const DUR = { cert: 10, udemy: 3, course: 3, book: 1, tools: 1 }; // 1項目あたりの想定日数
  const autoSchedule = () => {
    const anchor = dnumU(schedStart) != null ? dnumU(schedStart) : Math.floor(Date.now() / 86400000);
    setDates((prev) => {
      const next = { ...prev };
      LIBRARY_CATS.forEach((cat) => {
        let cum = 0; const d0 = DUR[cat.key] || 2;
        cat.groups.forEach((gr) => gr.items.forEach((it) => {
          const cur = next[it.id];
          const manualS = (cur && cur.s && cur.auto === false) ? cur.s : (it.s0 && !(cur && cur.auto) ? it.s0 : null);
          if (manualS) { const ms = dnumU(manualS); if (ms != null) cum = Math.max(cum, ms - anchor + d0); return; }
          const s = anchor + cum; const e = s + d0 - 1;
          next[it.id] = { s: isoU(s), e: isoU(e), auto: true };
          cum += d0;
        }));
      });
      persistD(next); return next;
    });
    setView("gantt");
  };
  const clearAuto = () => setDates((prev) => { const next = {}; Object.keys(prev).forEach((k) => { if (!prev[k] || !prev[k].auto) next[k] = prev[k]; }); persistD(next); return next; });
  const passStatus = (it) => (statusFilter === "all" ? true : statusFilter === "star" ? isStarred(it) : statusFilter === "done" ? isDone(it) : !isDone(it));
  const catDoneN = (cat) => cat.groups.reduce((a, gr) => a + gr.items.filter(isDone).length, 0);
  const totalAll = LIBRARY_CATS.reduce((a, c) => a + c.total, 0);
  const doneAll = LIBRARY_CATS.reduce((a, c) => a + catDoneN(c), 0);
  const pct = (d, t) => (t ? Math.round((d / t) * 100) : 0);
  const dnumU = (str) => { if (!str) return null; const d = new Date(str + "T00:00:00Z"); return isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 86400000); };
  const dnum = dnumU;
  const isoU = (dayN) => new Date(dayN * 86400000).toISOString().slice(0, 10);
  const mdShort = (dayN) => { const d = new Date(dayN * 86400000); return (d.getUTCMonth() + 1) + "/" + d.getUTCDate(); };
  if (!LIBRARY_CATS.length) return null;
  // ガント用：開始日が入っている項目だけを集約
  const scheduled = [];
  LIBRARY_CATS.forEach((cat) => cat.groups.forEach((gr) => gr.items.forEach((it) => {
    const sN = dnum(itS(it)); if (sN === null) return;
    const eN = dnum(itE(it)); scheduled.push({ it, cat, s: sN, e: eN !== null && eN >= sN ? eN : sN });
  })));
  const hasSched = scheduled.length > 0;
  let minD = 0, maxD = 0, span = 1, cols = 1, colDays = 7, todayPct = null;
  if (hasSched) {
    minD = Math.min(...scheduled.map((x) => x.s));
    maxD = Math.max(...scheduled.map((x) => x.e));
    minD = minD - (minD % 7 === 0 ? 0 : 0); // 週頭スナップは省略、そのまま
    span = Math.max(7, maxD - minD + 1);
    colDays = 7;
    cols = Math.ceil(span / colDays);
    span = cols * colDays; // 目盛りに合わせて丸め
    const t = Math.floor(Date.now() / 86400000);
    if (t >= minD && t <= minD + span) todayPct = ((t - minD) / span) * 100;
  }
  const LABW = 190, GANTT_MIN = Math.max(680, LABW + cols * 40);
  const gridBG = `repeating-linear-gradient(90deg, ${NOVA.panelSoft}, ${NOVA.panelSoft} 1px, transparent 1px, transparent calc(100% / ${cols}))`;
  const DONE_GRAY = "#AEB7C4"; // 取得済み/完了はグレーアウト
  // 資格は「取得済み」だけバー表示（未取得はバーなし・行だけ）。他カテゴリは常にバー。
  const hasBar = (cat, it) => !(cat.key === "cert" && !isDone(it));
  // カテゴリ内の項目群から時間軸レンジを算出（起点があれば左端固定）。
  const rangeFor = (cat, gs) => {
    let lo = Infinity, hi = -Infinity, loAll = Infinity, hiAll = -Infinity;
    gs.forEach((gr) => gr.its.forEach((it) => {
      const s = dnumU(itS(it)); const e = Math.max(s, dnumU(itE(it)) != null ? dnumU(itE(it)) : s);
      if (s < loAll) loAll = s; if (e > hiAll) hiAll = e;
      if (hasBar(cat, it)) { if (s < lo) lo = s; if (e > hi) hi = e; }
    }));
    const colDays = 7;
    const anchor = dnumU(schedStart);
    const rangeLo = anchor != null ? anchor : (isFinite(lo) ? lo : loAll);
    const rangeHi = Math.max(isFinite(hi) ? hi : hiAll, rangeLo + colDays);
    const span = Math.max(1, rangeHi - rangeLo);
    const weekPct = (colDays / span) * 100;
    const nTicks = Math.floor(span / colDays) + 1;
    const pctFor = (d) => ((d - rangeLo) / span) * 100;
    const todayN = Math.floor(Date.now() / 86400000);
    const todayPct = todayN >= rangeLo && todayN <= rangeHi ? pctFor(todayN) : null;
    const gridBG = `repeating-linear-gradient(90deg, ${NOVA.panelSoft}, ${NOVA.panelSoft} 1px, transparent 1px, transparent ${weekPct}%)`;
    const GMIN = Math.max(680, LABW + nTicks * 46);
    return { rangeLo, colDays, span, nTicks, pctFor, todayPct, gridBG, GMIN };
  };
  const renderLibGantt = () => {
    if (!hasSched) return (
      <div style={{ border: `1px dashed ${NOVA.line}`, borderRadius: 10, padding: "20px 14px", textAlign: "center", fontSize: 11.5, color: NOVA.faint, lineHeight: 1.7 }}>
        {en ? "No dated items yet. Switch to List and set a start date on any item to place it on the calendar." : "開始日を入れた項目がまだありません。「リスト」表示で各項目に開始日（→ 完了日）を設定すると、ここにガントで並びます。"}
      </div>
    );
    const q = query.trim();
    const filtering = !!q || statusFilter !== "all";
    const shownCats = LIBRARY_CATS.filter((cat) => !hiddenCats[cat.key]).map((cat) => ({ cat, gs: sortedGroups(cat, true) })).filter((cd) => cd.gs.length);
    if (!shownCats.length) return (
      <div style={{ border: `1px dashed ${NOVA.line}`, borderRadius: 10, padding: "20px 14px", textAlign: "center", fontSize: 11.5, color: NOVA.faint }}>{en ? "No items match the current filters." : "現在の絞り込みに一致する項目がありません。"}</div>
    );
    return (
      <div>
        {shownCats.map(({ cat, gs }) => {
          const catCount = gs.reduce((a, g) => a + g.its.length, 0);
          const cdn = gs.reduce((a, g) => a + g.its.filter(isDone).length, 0); const cOpen = filtering ? true : !!catOpen["g_" + cat.key];
          return (
            <div key={cat.key} style={{ borderTop: `2px solid ${NOVA.line}` }}>
              <div onClick={() => setCatOpen((s) => ({ ...s, ["g_" + cat.key]: !cOpen }))} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 2px", cursor: "pointer" }}>
                <span style={{ color: NOVA.faint, fontSize: 10, width: 9, flexShrink: 0 }}>{cOpen ? "▾" : "▸"}</span>
                <span style={{ background: cat.color, color: "#fff", borderRadius: 4, padding: "1px 6px", fontSize: 8.5, fontWeight: 800 }}>{cat.tag}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: NOVA.ink }}>{cat.label[en ? 1 : 0]}</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: cdn ? "#158F6B" : NOVA.faint }}>{cdn}/{catCount}</span>
              </div>
              {cOpen ? (() => {
                const { rangeLo, colDays, nTicks, pctFor, todayPct, gridBG, GMIN } = rangeFor(cat, gs);
                return (
                  <div style={{ overflowX: "auto", paddingBottom: 4 }}>
                    <div style={{ minWidth: GMIN, position: "relative" }}>
                      <div style={{ position: "relative", height: 24, marginLeft: LABW, borderBottom: `1px solid ${NOVA.line}` }}>
                        {Array.from({ length: nTicks }, (_, i) => { const dN = rangeLo + i * colDays; const heavy = i % (4) === 0; const showLabel = true; return (
                          <div key={i} style={{ position: "absolute", left: pctFor(dN) + "%", top: 0, bottom: 0, borderLeft: `1px solid ${heavy ? NOVA.line : NOVA.panelSoft}` }}>
                            {showLabel ? <div style={{ position: "absolute", left: 2, top: 1, fontSize: 8, color: NOVA.faint, fontWeight: 600, whiteSpace: "nowrap", lineHeight: 1.1 }}>{("W" + (i + 1))}{true ? <span style={{ display: "block", fontSize: 7 }}>{mdShort(dN)}</span> : null}</div> : null}
                          </div>
                        ); })}
                      </div>
                      {gs.map((grp) => {
                        const items = sortItemsArr(grp.its); const gdn = grp.its.filter(isDone).length;
                        const gk = "g_" + cat.key + "#" + grp.g; const gOpen = filtering ? true : !!genreOpen[gk];
                        return (
                          <div key={gk}>
                            <div onClick={() => setGenreOpen((s) => ({ ...s, [gk]: !gOpen }))} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 2px 4px 18px", cursor: "pointer", background: NOVA.panelSoft, borderTop: `1px solid ${NOVA.line}` }}>
                              <span style={{ color: NOVA.faint, fontSize: 9, width: 8, flexShrink: 0 }}>{gOpen ? "▾" : "▸"}</span>
                              <span style={{ fontSize: 10.5, fontWeight: 800, color: NOVA.ink }}>{grp.g}</span>
                              <span style={{ flex: 1 }} />
                              <span style={{ fontSize: 9.5, fontWeight: 700, color: gdn ? "#158F6B" : NOVA.faint }}>{gdn}/{grp.its.length}</span>
                            </div>
                            {gOpen ? items.map((it) => { const on = isDone(it); const s = dnumU(itS(it)); const e = Math.max(s, dnumU(itE(it)) != null ? dnumU(itE(it)) : s); const sp = pctFor(s), ep = pctFor(e); const showBar = hasBar(cat, it) && ep >= 0; const left = Math.max(0, sp); const width = Math.max(0, Math.min(100, ep) - left); return (
                              <div key={it.id} style={{ display: "flex", alignItems: "center", minHeight: 30, borderBottom: `1px solid ${NOVA.line}`, opacity: on ? 0.6 : 1 }}>
                                <div style={{ width: LABW, flexShrink: 0, paddingLeft: 20, paddingRight: 4, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 1 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <span onClick={() => toggle(it)} style={{ width: 11, height: 11, borderRadius: 3, flexShrink: 0, cursor: "pointer", border: `1.5px solid ${on ? DONE_GRAY : NOVA.line}`, background: on ? DONE_GRAY : "transparent", color: "#fff", fontSize: 8, lineHeight: "9px", textAlign: "center", fontWeight: 800 }}>{on ? "✓" : ""}</span>
                                    <span onClick={(e) => toggleStar(it, e)} style={{ flexShrink: 0, cursor: "pointer", fontSize: 12, lineHeight: 1, color: isStarred(it) ? "#F5A623" : "#c9cfd6", userSelect: "none" }}>{isStarred(it) ? "★" : "☆"}</span>
                                    <span title={it.name} style={{ fontSize: 9, fontWeight: 700, color: on ? NOVA.faint : NOVA.ink, textDecoration: on ? "line-through" : "none", lineHeight: 1.15, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{it.name}</span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: 16 }}>
                                    <input type="date" value={itS(it)} onChange={(ev) => setDate(it, "s", ev.target.value)} style={{ fontSize: 7.5, color: NOVA.sub, border: `1px solid ${NOVA.line}`, borderRadius: 3, padding: "0 2px", width: 72 }} />
                                    <span style={{ fontSize: 8, color: NOVA.faint }}>→</span>
                                    <input type="date" value={itE(it)} onChange={(ev) => setDate(it, "e", ev.target.value)} style={{ fontSize: 7.5, color: NOVA.sub, border: `1px solid ${NOVA.line}`, borderRadius: 3, padding: "0 2px", width: 72 }} />
                                  </div>
                                </div>
                                <div style={{ flex: 1, position: "relative", height: 26, background: gridBG }}>
                                  {showBar ? <div title={itS(it) + " → " + (itE(it) || itS(it))} style={{ position: "absolute", left: left + "%", width: width + "%", minWidth: 5, top: 7, height: 12, background: on ? DONE_GRAY : cat.color, opacity: on ? 1 : 0.92, borderRadius: 4 }} /> : null}
                                  {todayPct !== null ? <div style={{ position: "absolute", left: todayPct + "%", top: -2, bottom: -2, width: 2, background: "#C0392B", opacity: 0.8 }} /> : null}
                                </div>
                              </div>
                            ); }) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })() : null}
            </div>
          );
        })}
        <div style={{ fontSize: 10, color: NOVA.faint, marginTop: 8 }}>{en ? "Open a category to see its calendar. Left edge = start/earliest date. Un-obtained certs = rows only. Done = gray. Red line = today." : "カテゴリを開くとその下にカレンダーが出ます。左端＝起点/最も早い日付。未取得の資格は行のみ、取得済みはグレー、赤線＝今日。"}</div>
      </div>
    );
  };
  return (
    <div style={{ margin: "22px 0 4px" }}>
      <div onClick={() => setOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "2px 0" }}>
        <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", background: "linear-gradient(135deg, #0A2E52, #A435F0 55%, #F79B34)", boxShadow: "0 2px 6px rgba(124,77,214,.30)" }}>❖</span>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: NOVA_SERIF, fontSize: 15.5, fontWeight: 700, color: NOVA.ink, letterSpacing: 0.2 }}>Learning Library</span>
            <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1.2, color: "#fff", background: "#7C4DD6", borderRadius: 999, padding: "2px 8px" }}>{en ? "LIBRARY" : "集約"}</span>
          </div>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: NOVA.sub, flexShrink: 0 }}><b style={{ color: NOVA.accent }}>{doneAll}</b> / {totalAll} · <b style={{ color: NOVA.accent }}>{pct(doneAll, totalAll)}%</b></span>
      </div>
      <NovaRule margin="6px 0 10px" />
      {open ? (
        <div>
          <div style={{ fontSize: 11.5, color: NOVA.sub, marginBottom: 12, lineHeight: 1.6 }}>
            {en ? "Your Learning Tracker (Udemy, books, courses, tools, certs) aggregated here — tick items as you finish them." : "Learning Tracker（Udemy・書籍・講座・ツール・資格）をハブ上部に集約。終えたものにチェックして記録できます。"}
            <button onClick={() => onResume && onResume("tracker")} style={{ marginLeft: 8, background: "transparent", border: "none", cursor: "pointer", padding: 0, fontSize: 11, fontWeight: 700, color: NOVA.tracker }}>{en ? "Open Learning Tracker" : "Learning Tracker を開く"} →</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ display: "inline-flex", border: `1px solid ${NOVA.line}`, borderRadius: 999, overflow: "hidden" }}>
              {[["list", en ? "List" : "リスト"], ["gantt", en ? "Calendar" : "ガント／カレンダー"]].map(([k, l], idx) => (
                <button key={k} onClick={() => setViewP(k)} style={{ background: view === k ? NOVA.accent : "transparent", color: view === k ? "#fff" : NOVA.sub, border: "none", borderLeft: idx ? `1px solid ${NOVA.line}` : "none", padding: "4px 15px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{l}</button>
              ))}
            </div>
            
            {view === "gantt" ? (<>
              <label style={{ fontSize: 10.5, color: NOVA.sub, display: "inline-flex", alignItems: "center", gap: 4 }}>{en ? "from" : "起点"}
                <input type="date" value={schedStart} onChange={(e) => setSchedStart(e.target.value)} style={{ fontSize: 10, border: `1px solid ${NOVA.line}`, borderRadius: 5, padding: "1px 4px", color: NOVA.ink }} />
              </label>
              <button onClick={autoSchedule} style={{ background: NOVA.accent, color: "#fff", border: "none", borderRadius: 999, padding: "4px 12px", fontSize: 10.5, fontWeight: 800, cursor: "pointer" }}>{en ? "Auto-schedule all" : "全項目を自動で日程割り当て"}</button>
              <button onClick={clearAuto} style={{ background: "transparent", color: NOVA.sub, border: `1px solid ${NOVA.line}`, borderRadius: 999, padding: "4px 10px", fontSize: 10.5, fontWeight: 700, cursor: "pointer" }}>{en ? "Clear auto" : "自動分をクリア"}</button>
            </>) : null}
            <span style={{ fontSize: 10.5, color: NOVA.faint }}>{en ? "set dates in List, or auto-schedule the whole library" : "リストで日付を入れるか、ライブラリ全体を自動で日程割り当て"}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: NOVA.faint, fontWeight: 800, letterSpacing: 1 }}>{en ? "FILTER" : "絞り込み"}</span>
            {LIBRARY_CATS.map((c) => { const shown = !hiddenCats[c.key]; return (
              <button key={c.key} onClick={() => setHiddenCats((s) => ({ ...s, [c.key]: !s[c.key] }))} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: shown ? c.color : "transparent", color: shown ? "#fff" : NOVA.faint, border: `1px solid ${shown ? c.color : NOVA.line}`, borderRadius: 999, padding: "2px 9px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}><span style={{ fontSize: 8 }}>{shown ? "●" : "○"}</span>{c.tag}</button>
            ); })}
            <span style={{ width: 6 }} />
            {[["all", en ? "All" : "すべて"], ["todo", en ? "Todo" : "未完了"], ["done", en ? "Done" : "完了"], ["star", "★" + (Object.keys(starred).length ? " " + Object.keys(starred).length : "")]].map(([k, l]) => (
              <button key={k} onClick={() => setStatusFilterP(k)} style={{ background: statusFilter === k ? NOVA.accent : "transparent", color: statusFilter === k ? "#fff" : NOVA.sub, border: `1px solid ${statusFilter === k ? NOVA.accent : NOVA.line}`, borderRadius: 999, padding: "2px 11px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} aria-label={en ? "search title…" : "タイトルで検索…"} placeholder={en ? "search title…" : "タイトルで検索…"} style={{ flex: "1 1 200px", minWidth: 160, fontSize: 11.5, color: NOVA.ink, border: `1px solid ${NOVA.line}`, borderRadius: 8, padding: "5px 10px" }} />
            {query ? <button onClick={() => setQuery("")} style={{ background: "transparent", border: `1px solid ${NOVA.line}`, borderRadius: 999, padding: "3px 9px", fontSize: 10, color: NOVA.sub, cursor: "pointer" }}>×</button> : null}
            <label style={{ fontSize: 10, color: NOVA.faint, fontWeight: 700 }}>{en ? "sort" : "並び"}</label>
            <select value={itemSort} onChange={(e) => setItemSort(e.target.value)} style={{ fontSize: 10.5, color: NOVA.sub, border: `1px solid ${NOVA.line}`, borderRadius: 7, padding: "3px 6px" }}>
              <option value="prio">{en ? "priority" : "優先度順"}</option>
              <option value="date">{en ? "date" : "日付順"}</option>
              <option value="name">{en ? "name" : "名前順"}</option>
            </select>
            <label style={{ fontSize: 10, color: NOVA.faint, fontWeight: 700 }}>{en ? "groups" : "グループ"}</label>
            <select value={groupSort} onChange={(e) => setGroupSort(e.target.value)} style={{ fontSize: 10.5, color: NOVA.sub, border: `1px solid ${NOVA.line}`, borderRadius: 7, padding: "3px 6px" }}>
              <option value="count">{en ? "by count" : "件数順"}</option>
              <option value="name">{en ? "by name" : "名前順"}</option>
            </select>
          </div>
          {view === "gantt" ? renderLibGantt() : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LIBRARY_CATS.filter((cat) => !hiddenCats[cat.key]).map((cat) => {
              const q = query.trim();
              const filtering = !!q || statusFilter !== "all";
              const gs = sortedGroups(cat, false);
              if (filtering && !gs.length) return null; // 検索・絞り込み時は該当項目がないカテゴリを隠す
              const dn = catDoneN(cat); const cOpen = filtering ? true : !!catOpen[cat.key]; const p = pct(dn, cat.total);
              return (
                <div key={cat.key} style={{ border: `1px solid ${NOVA.line}`, borderRadius: 12, overflow: "hidden" }}>
                  <div onClick={() => setCatOpen((s) => ({ ...s, [cat.key]: !cOpen }))} style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 13px", cursor: "pointer", background: NOVA.panelSoft }}>
                    <span style={{ color: NOVA.faint, fontSize: 10, width: 9, flexShrink: 0 }}>{cOpen ? "▾" : "▸"}</span>
                    <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 0.5, color: "#fff", background: cat.color, borderRadius: 4, padding: "2px 7px", flexShrink: 0 }}>{cat.tag}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: NOVA.ink }}>{cat.label[en ? 1 : 0]}</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: dn ? "#158F6B" : NOVA.faint, flexShrink: 0 }}>{dn} / {cat.total}</span>
                    <div style={{ width: 80, height: 7, background: "#fff", borderRadius: 999, overflow: "hidden", border: `1px solid ${NOVA.line}`, flexShrink: 0 }}><div style={{ width: p + "%", height: "100%", background: p >= 100 ? "#158F6B" : cat.color }} /></div>
                    <span style={{ fontSize: 10.5, color: NOVA.sub, width: 30, textAlign: "right", flexShrink: 0 }}>{p}%</span>
                  </div>
                  {cOpen ? (
                    <div style={{ padding: "4px 13px 10px" }}>
                      {gs.map((grp) => {
                        const items = sortItemsArr(grp.its); const gdn = grp.its.filter(isDone).length;
                        const gk = cat.key + "#" + grp.g; const gOpen = filtering ? true : !!genreOpen[gk];
                        return (
                          <div key={gk} style={{ borderTop: `1px solid ${NOVA.line}` }}>
                            <div onClick={() => setGenreOpen((s) => ({ ...s, [gk]: !gOpen }))} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 2px", cursor: "pointer" }}>
                              <span style={{ color: NOVA.faint, fontSize: 9, width: 8, flexShrink: 0 }}>{gOpen ? "▾" : "▸"}</span>
                              <span style={{ fontSize: 11, fontWeight: 800, color: grp.its.length && gdn === grp.its.length ? "#158F6B" : NOVA.ink }}>{grp.g}</span>
                              <span style={{ flex: 1 }} />
                              <span style={{ fontSize: 9.5, fontWeight: 700, color: gdn ? "#158F6B" : NOVA.faint }}>{gdn}/{grp.its.length}</span>
                            </div>
                            {gOpen ? (
                              <div style={{ paddingLeft: 15, paddingBottom: 6, display: "flex", flexDirection: "column", gap: 2 }}>
                                {items.map((it) => { const on = isDone(it);
                                  return (
                                    <div key={it.id} style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap", fontSize: 11.5, padding: "2px 0" }}>
                                      <span onClick={() => toggle(it)} style={{ width: 13, height: 13, borderRadius: 3, flexShrink: 0, cursor: "pointer", border: `1.5px solid ${on ? "#158F6B" : NOVA.line}`, background: on ? "#158F6B" : "transparent", color: "#fff", fontSize: 9, lineHeight: "11px", textAlign: "center", fontWeight: 800 }}>{on ? "✓" : ""}</span>
                                      <span onClick={(e) => toggleStar(it, e)} style={{ flexShrink: 0, cursor: "pointer", fontSize: 14, lineHeight: 1, color: isStarred(it) ? "#F5A623" : "#c9cfd6", userSelect: "none" }}>{isStarred(it) ? "★" : "☆"}</span>
                                      <span onClick={() => toggle(it)} style={{ color: on ? NOVA.faint : NOVA.sub, textDecoration: on ? "line-through" : "none", flex: 1, minWidth: 120, cursor: "pointer" }}>{it.name}</span>
                                      <input type="date" value={itS(it)} onChange={(e) => setDate(it, "s", e.target.value)} title={en ? "start" : "開始日"} style={{ flexShrink: 0, fontSize: 9.5, color: NOVA.sub, border: `1px solid ${NOVA.line}`, borderRadius: 5, padding: "1px 4px", background: "transparent" }} />
                                      <span style={{ color: NOVA.faint, fontSize: 9, flexShrink: 0 }}>→</span>
                                      <input type="date" value={itE(it)} onChange={(e) => setDate(it, "e", e.target.value)} title={en ? "done" : "完了日"} style={{ flexShrink: 0, fontSize: 9.5, color: NOVA.sub, border: `1px solid ${NOVA.line}`, borderRadius: 5, padding: "1px 4px", background: "transparent" }} />
                                      {it.url ? <a href={it.url} target="_blank" rel="noreferrer" style={{ flexShrink: 0, fontSize: 11, color: cat.color, textDecoration: "none", fontWeight: 800 }}>↗</a> : null}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

// ポータルの「デイリー記録（Others）」。今日の9項目はいつも見えていて、タップで記録する。
// 開くと日付の切り替え・メモ・月の一覧が出る。台帳は novaDailyRead/novaDailySave（nova_daily_v1）。
function PortalDaily({ lang, onResume }) {
  const en = lang === "en";
  const [o, setO] = useState(() => novaDailyRead());
  const [today, setToday] = useState(() => novaLocalDay());
  const [sel, setSel] = useState(() => novaLocalDay());
  const [open, setOpen] = useState(false);
  const [noteFor, setNoteFor] = useState(null);
  useEffect(() => {
    const re = () => {
      setO(novaDailyRead());
      const t = novaLocalDay();
      setToday((p) => { if (p !== t) setSel((s) => (s === p ? t : s)); return t; });
    };
    const onVis = () => { if (document.visibilityState === "visible") re(); };
    window.addEventListener("nova-daily", re);
    window.addEventListener("storage", re);
    window.addEventListener("focus", re);
    document.addEventListener("visibilitychange", onVis);
    const iv = setInterval(re, 60000);
    return () => {
      window.removeEventListener("nova-daily", re);
      window.removeEventListener("storage", re);
      window.removeEventListener("focus", re);
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(iv);
    };
  }, []);
  const update = (fn) => { const x = novaDailyRead(); fn(x); novaDailySave(x); setO(x); };
  const rec = (day) => (o.days && o.days[day]) || {};
  const tap = (day, c) => update((x) => {
    const d = x.days[day] || (x.days[day] = {});
    const m = d.m || (d.m = {});
    const s = novaDailyStatus(d, c);
    if (s === "none") m[c] = 1;
    else if (s === "done") { if (novaDailyHasAuto(d, c)) m[c] = 0; else delete m[c]; }
    else if (s === "auto") m[c] = 0;
    else delete m[c];
  });
  const setNote = (day, c, t) => update((x) => {
    const d = x.days[day] || (x.days[day] = {});
    const n = d.n || (d.n = {});
    if (String(t).trim()) n[c] = String(t).slice(0, 300); else delete n[c];
  });
  const shift = (k) => {
    const dt = new Date(sel + "T00:00:00"); dt.setDate(dt.getDate() + k);
    const nd = novaLocalDay(dt);
    if (nd <= today) { setSel(nd); setNoteFor(null); }
  };
  const wd = (day) => { const w = new Date(day + "T00:00:00").getDay(); return en ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][w] : "日月火水木金土"[w]; };
  const md = (day) => { const p = day.split("-"); return Number(p[1]) + "/" + Number(p[2]); };
  const dToday = rec(today);
  const doneToday = novaDailyDoneIds(dToday).length;
  const dSel = rec(sel);
  const CHIP = {
    done: { bg: NOVA.accent, fg: "#FFFFFF", bd: NOVA.accent },
    auto: { bg: "#E3ECF8", fg: nvInk(NOVA.accent, "#E3ECF8"), bd: "#7FA3D3" },
    off: { bg: "#FFFFFF", fg: NOVA.sub, bd: NOVA.line },
    none: { bg: "#FFFFFF", fg: NOVA.ink, bd: NOVA.line },
  };
  const stLabel = (s) => ({ done: en ? "Done" : "完了", auto: en ? "Done (Nova)" : "完了（Nova）", off: en ? "Cancelled" : "取消", none: en ? "Not yet" : "未" })[s];
  const chip = (day, c, big) => {
    const d = rec(day);
    const s = novaDailyStatus(d, c.id);
    const k = CHIP[s];
    const at = novaDailyAutoText(d, c.id, en);
    return (
      <button key={c.id} type="button" onClick={() => tap(day, c.id)} aria-pressed={s === "done" || s === "auto"}
        title={(c.name + " — " + stLabel(s)) + (at ? " · Nova: " + at : "")}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: big ? 38 : 34, padding: big ? "6px 12px" : "5px 10px", borderRadius: 999, border: "1px solid " + k.bd, background: k.bg, color: k.fg, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: NOVA_SANS, textDecoration: s === "off" ? "line-through" : "none" }}>
        <span aria-hidden="true" style={{ fontSize: 12 }}>{s === "done" || s === "auto" ? "✓" : s === "off" ? "×" : "○"}</span>
        <span>{c.name}</span>
        {at && s !== "none" ? <span style={{ fontSize: 10.5, fontWeight: 500, opacity: s === "done" ? 0.92 : 1 }}>{(s === "done" ? "· " : "") + "Nova " + at}</span> : null}
      </button>
    );
  };
  // 月の一覧（選んだ日の月）
  const ym = sel.slice(0, 7);
  const pY = Number(ym.slice(0, 4)), pM = Number(ym.slice(5, 7));
  const nDays = new Date(pY, pM, 0).getDate();
  const daysOfMonth = Array.from({ length: nDays }, (_, i) => ym + "-" + String(i + 1).padStart(2, "0"));
  const cellBg = (s) => (s === "done" ? NOVA.accent : s === "auto" ? "#5A88C6" : s === "off" ? "#FFFFFF" : NOVA.panelSoft);
  const small = { fontSize: 11, color: NOVA.sub };
  const btn = { background: "#FFFFFF", border: "1px solid " + NOVA.line, color: NOVA.ink, borderRadius: 6, padding: "6px 11px", fontSize: 12, cursor: "pointer", fontFamily: NOVA_SANS, minHeight: 32 };
  return (
    <div style={{ margin: "22px 0 4px" }} data-nova-daily="">
      <div role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen((v) => !v)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((v) => !v); } }}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "2px 0" }}>
        <span aria-hidden="true" style={{ color: NOVA.sub, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", background: "linear-gradient(135deg,#1B4B8C,#3E8FD6)" }}>✓</span>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: NOVA_SERIF, fontSize: 15.5, fontWeight: 700, color: NOVA.ink, letterSpacing: 0.2 }}>Daily Others</span>
            <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1.2, color: "#fff", background: NOVA.accent, borderRadius: 999, padding: "2px 8px" }}>{en ? "DAILY" : "日々の記録"}</span>
          </div>
          <span style={{ fontSize: 10.5, color: NOVA.sub, letterSpacing: 0.3 }}>{en ? "Others of the Cowork task tracker · Nova activity counts automatically" : "Cowork トラッカーの Others を記録・Nova での学習は自動で付く"}</span>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11.5, color: NOVA.sub, flexShrink: 0 }}>{en ? "Today" : "今日"} <b style={{ color: NOVA.accent }}>{doneToday}</b>/{NOVA_DAILY_CATS.length}</span>
      </div>
      <NovaRule margin="6px 0 10px" />
      {!open ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{NOVA_DAILY_CATS.map((c) => chip(today, c, false))}</div>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <button type="button" style={btn} onClick={() => shift(-1)} aria-label={en ? "Previous day" : "前の日"}>‹</button>
            <span style={{ fontSize: 14, fontWeight: 700, color: NOVA.ink, minWidth: 120, textAlign: "center" }}>{md(sel)}（{wd(sel)}）<span style={{ ...small, fontWeight: 400, marginLeft: 6 }}>Day {novaDailyDayNo(sel)}</span></span>
            <button type="button" style={{ ...btn, opacity: sel >= today ? 0.45 : 1, cursor: sel >= today ? "default" : "pointer" }} disabled={sel >= today} onClick={() => shift(1)} aria-label={en ? "Next day" : "次の日"}>›</button>
            {sel !== today ? <button type="button" style={btn} onClick={() => { setSel(today); setNoteFor(null); }}>{en ? "Today" : "今日へ"}</button> : null}
            <span style={{ flex: 1 }} />
            <span style={small}>{novaDailyDoneIds(dSel).length}/{NOVA_DAILY_CATS.length} {en ? "done" : "完了"}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {NOVA_DAILY_CATS.map((c) => {
              const s = novaDailyStatus(dSel, c.id);
              const note = (dSel.n && dSel.n[c.id]) || "";
              return (
                <div key={c.id} style={{ border: "1px solid " + NOVA.line, borderRadius: 10, padding: "8px 10px", background: NOVA.bg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    {chip(sel, c, true)}
                    <span style={{ flex: 1 }} />
                    {c.hub ? <button type="button" style={{ ...btn, padding: "4px 9px", fontSize: 11.5 }} onClick={() => onResume && onResume(c.hub)}>{en ? "Open" : "開く"} →</button> : null}
                    <button type="button" style={{ ...btn, padding: "4px 9px", fontSize: 11.5 }} aria-expanded={noteFor === c.id} onClick={() => setNoteFor((v) => (v === c.id ? null : c.id))}>✎ {note ? (en ? "Note" : "メモあり") : (en ? "Note" : "メモ")}</button>
                  </div>
                  <div style={{ ...small, marginTop: 5, lineHeight: 1.5 }}>
                    {c.src ? ((en ? "Counted automatically from " : "自動：") + c.src[en ? 1 : 0] + (s === "off" ? (en ? " (cancelled for this day)" : "（この日は取消）") : "")) : (en ? "Outside Nova — tap to record." : "Nova の外でやること。タップで記録。")}
                  </div>
                  {noteFor === c.id ? (
                    <textarea defaultValue={note} maxLength={300} rows={2} placeholder={en ? "Optional note" : "任意のメモ"}
                      onBlur={(e) => setNote(sel, c.id, e.target.value)}
                      style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: 6, border: "1px solid " + NOVA.line, borderRadius: 6, padding: "6px 8px", fontSize: 13, fontFamily: NOVA_SANS, color: NOVA.ink, background: "#FFFFFF" }} />
                  ) : note ? <div style={{ fontSize: 12, color: NOVA.ink, marginTop: 4, whiteSpace: "pre-wrap" }}>✎ {note}</div> : null}
                </div>
              );
            })}
          </div>
          {/* 月の一覧 */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: NOVA.sub, marginBottom: 6 }}>{en ? pY + "-" + String(pM).padStart(2, "0") : pY + "年" + pM + "月"}</div>
            <div role="group" aria-label={en ? "Month overview" : "月の一覧"} style={{ display: "grid", gridTemplateColumns: "clamp(64px, 24%, 92px) repeat(" + nDays + ", minmax(0, 1fr))", gap: 2, alignItems: "center" }}>
              <span />
              {daysOfMonth.map((day, i) => <span key={day} style={{ fontSize: 8.5, color: NOVA.sub, textAlign: "center" }}>{(i + 1) % 5 === 0 || i === 0 ? i + 1 : ""}</span>)}
              {NOVA_DAILY_CATS.map((c) => {
                const cnt = daysOfMonth.filter((day) => novaDailyIsDone(rec(day), c.id)).length;
                return (
                  <React.Fragment key={c.id}>
                    <span style={{ fontSize: 10.5, color: NOVA.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={c.name}>{c.name.replace(/（.*）| \(.*\)/, "")} <span style={{ color: NOVA.sub }}>{cnt}</span></span>
                    {daysOfMonth.map((day) => {
                      const fut = day > today;
                      const s = fut ? "none" : novaDailyStatus(rec(day), c.id);
                      return (
                        <span key={day} role="button" tabIndex={-1} onClick={() => { if (!fut) { setSel(day); setNoteFor(null); } }} title={c.name + " " + md(day) + " — " + stLabel(s)}
                          style={{ height: 11, borderRadius: 2, background: fut ? "transparent" : cellBg(s), border: "1px solid " + (day === sel ? NOVA.ink : s === "off" ? NOVA.faint : "transparent"), boxSizing: "border-box", cursor: fut ? "default" : "pointer" }} />
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6, ...small }}>
              {[["done", en ? "Done" : "完了"], ["auto", en ? "Done (Nova)" : "Nova で自動"], ["off", en ? "Cancelled" : "取消"], ["none", en ? "Not yet" : "未"]].map(([s, l]) => (
                <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 2, background: cellBg(s), border: "1px solid " + (s === "off" ? NOVA.faint : "transparent") }} />{l}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ポータルの学習進捗3ブロック(STUDY LOG / COMPLETED / WEAKNESS FOCUS)を1つのトグルにまとめ、既定は閉じる。
function PortalProgress({ lang, onResume }) {
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [s, setS] = useState(null);
  useEffect(() => {
    let att = 0, cor = 0, done = 0;
    try {
      const ls = window.localStorage;
      Object.keys(NOVA_DOM_REG).forEach((store) => {
        let st = null; try { st = JSON.parse(ls.getItem(store)); } catch (e) { return; }
        if (!st) return; const pr = st.progress || {};
        Object.keys(pr).forEach((did) => { const p = pr[did] || {}; att += p.attempts || 0; cor += p.correct || 0; });
      });
      try { const m = JSON.parse(ls.getItem("acad_quiz_score_v1")) || {}; const v = Object.values(m); att += v.length; cor += v.filter(Boolean).length; } catch (e) {}
      for (let i = 0; i < ls.length; i++) {
        const k = ls.key(i); if (!k) continue;
        if (k === "acad_quiz_score_v1" || k === "nova_activity_v1" || k === "nova_last_hub_v1") continue;
        const meta = parseDoneKey(k); if (!meta) continue;
        try { const val = JSON.parse(ls.getItem(k)); const labels = Array.isArray(val) ? val : (val && typeof val === "object" ? Object.keys(val).filter((x) => val[x]) : []); done += labels.length; } catch (e) {}
      }
    } catch (e) {}
    setS({ att, cor, done });
  }, []);
  if (!s) return null;
  if (s.att === 0 && s.done === 0) return null;
  const rate = s.att ? Math.round((s.cor / s.att) * 100) : 0;
  const ring = rate < 50 ? "#C0392B" : rate < 70 ? "#B7950B" : rate < 85 ? "#1F6FB0" : "#158F6B";
  return (
    <div style={{ margin: "22px 0 4px" }}>
      <div onClick={() => setOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "2px 0" }}>
        <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", background: "linear-gradient(135deg, #1B4B8C, #4f46e5)", boxShadow: "0 2px 6px rgba(79,70,229,.28)" }}>✎</span>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: NOVA_SERIF, fontSize: 15.5, fontWeight: 700, color: NOVA.ink, letterSpacing: 0.2 }}>Study Log</span>
            <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1.2, color: "#fff", background: "#4f46e5", borderRadius: 999, padding: "2px 8px" }}>{en ? "LOG" : "記録"}</span>
          </div>
          <span style={{ fontSize: 10, color: NOVA.faint, letterSpacing: 0.3 }}>{en ? "accuracy · completed · weakness focus" : "正答率・完了・弱点フォーカス"}</span>
        </div>
        <span style={{ flex: 1 }} />
        {!open ? <span style={{ fontSize: 11, color: NOVA.sub, flexShrink: 0 }}>{en ? "accuracy" : "総合正答率"} <b style={{ color: ring }}>{rate}%</b> <span style={{ color: NOVA.faint }}>・ {s.att}{en ? " answered" : "問"} ・ {en ? "done " : "完了"}{s.done}</span></span> : null}
      </div>
      <NovaRule margin="6px 0 10px" />
      {open ? (<>
        <StarredPanel lang={lang} />
        <StudyStats lang={lang} embedded />
        <ProgressSummary lang={lang} onResume={onResume} />
        <WeaknessFocus lang={lang} onResume={onResume} />
      </>) : null}
    </div>
  );
}
function ProgressSummary({ lang, onResume }) {
  const en = lang === "en";
  const [d, setD] = useState(null);
  const [openAll, setOpenAll] = useState({});
  useEffect(() => {
    const compute = () => {
      const entries = []; let total = 0, quiz = null, last = null;
      try {
        const ls = window.localStorage;
        for (let i = 0; i < ls.length; i++) {
          const k = ls.key(i); if (!k) continue;
          if (k === "acad_quiz_score_v1") { try { const m = JSON.parse(ls.getItem(k)); const vals = Object.values(m); quiz = { ans: vals.length, cor: vals.filter(Boolean).length }; } catch (e) {} continue; }
          if (k === "nova_last_hub_v1") { last = ls.getItem(k); continue; }
          const meta = parseDoneKey(k); if (!meta) continue;
          try {
            const v = JSON.parse(ls.getItem(k));
            const labels = Array.isArray(v) ? v.map(String) : (v && typeof v === "object" ? Object.keys(v).filter((x) => v[x]) : []);
            if (labels.length) { entries.push({ ...meta, labels }); total += labels.length; }
          } catch (e) {}
        }
      } catch (e) {}
      const ord = { certification: 0, megatech: 1, consulting: 2, finance: 3, other: 9 };
      entries.sort((a, b) => ((ord[a.hub] || 8) - (ord[b.hub] || 8)) || String(a.title).localeCompare(String(b.title)));
      return { entries, total, quiz, last };
    };
    setD(compute());
  }, []);
  if (!d || (d.total === 0 && !(d.quiz && d.quiz.ans))) return null;
  const rate = d.quiz && d.quiz.ans ? Math.round((d.quiz.cor / d.quiz.ans) * 100) : 0;
  const lastLabel = d.last && NOVA_HUB_LABEL[d.last] ? (en ? NOVA_HUB_LABEL[d.last][1] : NOVA_HUB_LABEL[d.last][0]) : null;
  const hubName = (h) => NOVA_HUB_LABEL[h] ? (en ? NOVA_HUB_LABEL[h][1] : NOVA_HUB_LABEL[h][0]) : (en ? "Other" : "その他");
  // ハブ単位に集約：既定は各ハブ1行に畳み、クリックで内訳を展開（完了が増えても縦に伸びない）
  const byHub = {};
  d.entries.forEach((e) => { (byHub[e.hub] = byHub[e.hub] || { hub: e.hub, items: 0, list: [] }); byHub[e.hub].items += e.labels.length; byHub[e.hub].list.push(e); });
  const ord = { certification: 0, megatech: 1, consulting: 2, finance: 3, other: 9 };
  const groups = Object.values(byHub).sort((a, b) => ((ord[a.hub] || 8) - (ord[b.hub] || 8)));
  const linkBtn = { background: "transparent", border: "none", color: NOVA.accent, fontWeight: 700, fontSize: 11.5, cursor: "pointer", padding: 0, flexShrink: 0 };
  return (
    <div style={{ margin: "22px 0 4px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: NOVA.faint }}>COMPLETED</div>
        <span style={{ flex: 1 }} />
      </div>
      <NovaRule margin="0 0 10px" />
      <div style={{ fontSize: 12.5, color: NOVA.sub, marginBottom: groups.length ? 4 : 0, lineHeight: 1.7 }}>
        {en ? `Completed ${d.total} item${d.total !== 1 ? "s" : ""} across ${d.entries.length} section${d.entries.length !== 1 ? "s" : ""}` : `${d.entries.length} セクションで ${d.total} 項目を完了`}
        {d.quiz && d.quiz.ans ? <span> ・ {en ? "Architect quiz" : "AIアーキ確認クイズ"} {d.quiz.ans}{en ? " answered" : "問"}（{en ? "acc." : "正答率"} <b style={{ color: rate >= 80 ? NOVA.accent : NOVA.ink }}>{rate}%</b>）</span> : null}
      </div>
      {groups.map((g) => {
        const open = !!openAll[g.hub];
        const titles = [...new Set(g.list.map((x) => (en && x.titleEn ? x.titleEn : x.title)))];
        return (
          <div key={g.hub} style={{ borderTop: `1px solid ${NOVA.line}` }}>
            <div onClick={() => setOpenAll((s) => ({ ...s, [g.hub]: !open }))}
              style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "7px 2px", cursor: "pointer", boxSizing: "border-box" }}>
              <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
              <span style={{ fontWeight: 700, color: NOVA.ink, minWidth: 92, flexShrink: 0 }}>{hubName(g.hub)}</span>
              <span style={{ color: NOVA.sub, fontSize: 11, flexShrink: 0 }}>{g.items}{en ? " items" : "項目"}<span style={{ color: NOVA.faint }}> / {g.list.length}{en ? " sec" : "件"}</span></span>
              <span style={{ flex: 1 }} />
              {open
                ? <button onClick={(ev) => { ev.stopPropagation(); onResume && onResume(g.hub); }} style={linkBtn}>{en ? "Open →" : "開く →"}</button>
                : <span style={{ color: NOVA.faint, fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 300 }}>{titles.join(" ・ ")}</span>}
            </div>
            {open ? (
              <div style={{ paddingLeft: 22, paddingBottom: 6, maxHeight: 220, overflowY: "auto" }}>
                {g.list.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "3px 0", fontSize: 12 }}>
                    <span style={{ fontWeight: 700, color: NOVA.ink, minWidth: 78, flexShrink: 0 }}>{en && e.titleEn ? e.titleEn : e.title}</span>
                    <span style={{ color: NOVA.faint, fontSize: 10, flexShrink: 0 }}>{en ? e.kEn : e.kJa}</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ color: NOVA.sub, fontSize: 11, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 260 }}>{e.labels.slice(0, 6).join(" ・ ")}{e.labels.length > 6 ? ` +${e.labels.length - 6}` : ""}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
// ハブ単位のエラー境界。1つのハブがクラッシュしてもアプリ全体を白画面にせず、
// 原因を表示して「ポータルへ戻る／再表示」で復帰できるようにする。
class HubErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { try { console.error("[Nova] hub crashed:", error, info); } catch (e) {} }
  render() {
    if (this.state.error) {
      const en = this.props.lang === "en";
      const msg = String((this.state.error && this.state.error.message) || this.state.error || "");
      return (
        <div style={{ maxWidth: 640, margin: "60px auto", padding: "28px 26px", background: "#fff", border: "1px solid #fecaca", borderLeft: "5px solid #dc2626", borderRadius: 14, fontFamily: "system-ui, sans-serif" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#b91c1c", marginBottom: 8 }}>⚠ {en ? "This section hit an error" : "このセクションでエラーが発生しました"}</div>
          <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 14 }}>{en ? "The rest of the app is unaffected. You can go back to the portal or try showing this section again." : "アプリの他の部分には影響していません。ポータルに戻るか、このセクションの再表示をお試しください。"}</div>
          {msg ? <pre style={{ fontSize: 11.5, color: "#7f1d1d", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 10px", whiteSpace: "pre-wrap", wordBreak: "break-word", marginBottom: 14 }}>{msg}</pre> : null}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => { this.setState({ error: null }); this.props.onHome && this.props.onHome(); }} style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: "#dc2626", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{en ? "← Back to portal" : "← ポータルへ戻る"}</button>
            <button onClick={() => this.setState({ error: null })} style={{ padding: "9px 18px", borderRadius: 9, border: "1.5px solid #cbd5e1", background: "#fff", color: "#475569", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{en ? "Retry" : "再表示"}</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
// ハッシュの先頭（ハブ名）。#megatech/govdojo/... のように深い位置が続いてもハブとして読む
const NOVA_HUBS = ["finance", "megatech", "consulting", "certification", "languagehub", "booksummary", "tracker", "anythingmemo", "linguisticshub", "liberalarts", "sidework", "training"];
function novaHashHub() {
  try { const h = (window.location.hash || "").replace(/^#\/?/, "").split(/[/?]/)[0]; return NOVA_HUBS.includes(h) ? h : null; } catch (e) { return null; }
}
function ProjectNova() {
  novaDailyHook(); // デイリー記録（Others）の自動計上：資格・Language Hub の保存口を一度だけ包む（2回目以降は何もしない）
  const [lang, setLang] = useState("ja");
  // 最初の描画からハッシュのハブを使う（null で始めると、下の書き戻しが深い位置を消してしまう）
  const [active, setActive] = useState(() => novaHashHub());

  // ディープリンク：URLハッシュ ↔ アクティブなハブ（リロード/ブックマークで同じ位置へ）
  useEffect(() => {
    const apply = () => setActive(novaHashHub());
    apply();
    window.addEventListener("hashchange", apply);
    window.addEventListener("popstate", apply);
    return () => { window.removeEventListener("hashchange", apply); window.removeEventListener("popstate", apply); };
  }, []);
  useEffect(() => {
    const want = active || "";
    const cur = (window.location.hash || "").replace(/^#\/?/, "").split(/[/?]/)[0];
    // ハブを開く・ポータルへ戻るは履歴に積む（ブラウザの「戻る」でポータルに戻れるように）
    if (cur !== want) { try { window.history.pushState(null, "", want ? ("#" + want) : (window.location.pathname + window.location.search)); } catch (e) {} }
  }, [active]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("nova_lang_v1");
        if (res && (res.value === "ja" || res.value === "en")) { setLang(res.value); window.__novaLang = res.value; try { window.dispatchEvent(new Event("nova-lang")); } catch (e) {} }
      } catch (e) {}
    })();
  }, []);

  const toggleLang = () => {
    const next = lang === "ja" ? "en" : "ja";
    setLang(next);
    window.__novaLang = next; try { window.dispatchEvent(new Event("nova-lang")); } catch (e) {} // 画面外のバックアップ欄にも知らせる // 英語がそろっているハブ（Finance・Consulting・Linguistics）はこれを初期値にして開く
    window.storage.set("nova_lang_v1", next).catch(() => {});
  };

  // ダーク/ライトモード（全ハブ共通）。反転フィルタ方式（Language ハブと同じ作法）。
  const [dark, setDark] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("nova_dark_v1");
        if (res && res.value === "1") setDark(true);
      } catch (e) {}
    })();
  }, []);
  const toggleDark = () => {
    setDark((v) => {
      const next = !v;
      window.storage.set("nova_dark_v1", next ? "1" : "0").catch(() => {});
      return next;
    });
  };

  // グローバル・キーボード操作：← 前の問題 / → 次の問題（または採点・結果）へ。
  // 入力欄にフォーカス中や修飾キー併用時は無効。表示中のボタンをラベルで探して押す（全ハブ共通）。
  useEffect(() => {
    const isTyping = (el) =>
      !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
    const clickByLabel = (labels) => {
      const btns = Array.from(document.querySelectorAll("button"));
      for (const b of btns) {
        if (b.disabled) continue;
        const r = b.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue; // 非表示は除外
        const txt = (b.textContent || "").replace(/\s+/g, "");
        if (labels.some((l) => txt.includes(l))) {
          b.click();
          return true;
        }
      }
      return false;
    };
    const NEXT = ["次の問題", "次へ", "次→", "採点する", "採点", "結果を見る", "提出", "Submit", "Next", "SeeResult", "Seeresult"];
    const PREV = ["前の問題", "前へ", "←前", "Previous", "Prev", "←Previous"];
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (isTyping(e.target)) return;
      if (e.key === "ArrowRight") {
        if (clickByLabel(NEXT)) e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (clickByLabel(PREV)) e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ランチャー（トップ画面）にいるかを外部コンポーネント（進捗バックアップ等）へ通知
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.__novaLauncher = active === null;
    window.dispatchEvent(new CustomEvent("nova:launcher", { detail: active === null }));
  }, [active]);

  const L = NOVA_L[lang];
  const activeStation = NOVA_STATIONS.find((s) => s.id === active);

  let rawHub = null;
  if (active === "finance") rawHub = <FinanceHubModule />;
  else if (active === "megatech") rawHub = <MegaTechHubModule />;
  else if (active === "consulting") rawHub = <ConsultingHubModule />;
  else if (active === "certification") rawHub = <CertHubModule />;
  else if (active === "languagehub") rawHub = <LanguageHubModule />;
  else if (active === "booksummary") rawHub = <BookSummaryModule />;
  else if (active === "tracker") rawHub = <LearningTrackerModule />;
  else if (active === "anythingmemo") rawHub = <AnythingMemoModule />;
  else if (active === "liberalarts") rawHub = <LiberalArtsModule />;
  else if (active === "sidework") rawHub = <SideWorkHubModule />;
  else if (active === "training") rawHub = <TrainingHubModule />;
  else if (active === "linguisticshub") rawHub = <LinguisticsHubModule />;
  // 英語モードで開いても中身が日本語のままのハブ（翻訳していないことを先に知らせる）
  const NOVA_JA_ONLY = {
    languagehub: "Lessons, word meanings and grammar explanations are in Japanese (this hub teaches Spanish, German and French to Japanese speakers); the interface is in English.",
    training: "Workout menus and your logged entries are shown as written, in Japanese; the rest of the interface is in English.",
    booksummary: "Book Summary is available in Japanese only: the summaries, quizzes and interface have not been translated.",
    liberalarts: "Liberal Arts is available in Japanese only (English names are shown for people where available).",
    tracker: "The Learning Tracker is available in Japanese only.",
    anythingmemo: "Anything Memo is available in Japanese only.",
    sidework: "Research data, episode plans, scripts and sources are in Japanese (this hub produces Japanese-language posts); the interface is in English.",
  };
  const hubEl = rawHub ? (
    <HubErrorBoundary key={active} lang={lang} onHome={() => setActive(null)}>{rawHub}</HubErrorBoundary>
  ) : null;

  let content;

  if (hubEl) {
    content = (
      <div style={{ minHeight: "100vh", background: NOVA.bg }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 9999,
            height: 46,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 18px",
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${NOVA.line}`,
            fontFamily: NOVA_SANS,
          }}
        >
          <button
            onClick={() => setActive(null)}
            style={{
              background: "transparent",
              border: "none",
              color: NOVA.sub,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 0",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = NOVA.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = NOVA.sub)}
          >
            <span style={{ fontSize: 15 }}>←</span> {L.back}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={toggleDark}
              title="ダーク/ライト切替"
              aria-label="Toggle dark mode"
              style={{
                background: "transparent",
                border: "none",
                color: NOVA.sub,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: 4,
              }}
            >
              {dark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
            </button>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 1.5,
                color: activeStation ? nvInk(activeStation.accent, "#FFFFFF") : NOVA.sub,
              }}
            >
              {activeStation ? (lang === "ja" ? activeStation.ja : activeStation.en) : ""}
            </div>
          </div>
        </div>
        {lang === "en" && NOVA_JA_ONLY[active] && !(NOVA_PUBLIC_BUILD && active === "booksummary") && (
          <div role="note" style={{ background: "#FFF7E6", borderBottom: `1px solid ${NOVA.line}`, color: "#7A4B00", fontSize: 12.5, padding: "7px 18px", fontFamily: NOVA_SANS }}>
            {NOVA_JA_ONLY[active]}
          </div>
        )}
        <div>{hubEl}</div>
      </div>
    );
  } else {
    content = (
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: NOVA.bg,
          color: NOVA.ink,
          fontFamily: NOVA_SANS,
        }}
      >
        <div
          className="nova-container"
          style={{
            maxWidth: 760,
            width: "100%",
            margin: "0 auto",
            padding: "48px 28px 24px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* masthead */}
          <NovaRule />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 0",
            }}
          >
            <div
              className="nova-masthead-title"
              style={{ fontSize: 22, letterSpacing: 1.5, color: NOVA.accent, fontWeight: 600 }}
            >
              {L.masthead}
            </div>
            <button
              onClick={toggleDark}
              title="ダーク/ライト切替"
              aria-label="Toggle dark mode"
              style={{
                position: "absolute",
                left: 0,
                background: "transparent",
                border: `1px solid ${NOVA.line}`,
                color: NOVA.sub,
                borderRadius: 3,
                padding: "5px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {dark ? <Sun size={14} strokeWidth={1.8} /> : <Moon size={14} strokeWidth={1.8} />}
            </button>
            <button
              onClick={toggleLang}
              style={{
                position: "absolute",
                right: 0,
                background: "transparent",
                border: `1px solid ${NOVA.line}`,
                color: NOVA.sub,
                borderRadius: 3,
                padding: "5px 13px",
                fontSize: 11,
                letterSpacing: 1,
                cursor: "pointer",
              }}
            >
              {L.langBtn}
            </button>
          </div>
          <NovaRule />

          <NovaSearch lang={lang} />

          <NovaToday lang={lang} />

          <PortalDaily lang={lang} onResume={(id) => setActive(id)} />

          <PortalBootcamp lang={lang} onResume={(id) => setActive(id)} />

          <PortalLibrary lang={lang} onResume={(id) => setActive(id)} />

          <PortalProgress lang={lang} onResume={(id) => setActive(id)} />

          <NovaWeakRadar lang={lang} />

          <div style={{ fontSize: 11, letterSpacing: 2, color: NOVA.faint, margin: "28px 0 4px" }}>
            {L.index}
          </div>
          <NovaRule margin="0 0 4px" />

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {NOVA_STATIONS.map((st) => (
              <NovaStationRow key={st.id} st={st} lang={lang} onEnter={() => setActive(st.id)} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={dark ? "nova-dark-root" : undefined}
      style={{
        background: NOVA.bg,
        minHeight: "100vh",
        filter: dark ? "invert(0.92) hue-rotate(180deg)" : "none",
        transition: "filter .25s ease",
      }}
    >
      <style>{NOVA_FONTS}</style>
      <style>{NOVA_RESPONSIVE_CSS}</style>
      {/* ダークモード時は画像・SVG（アイコン/図解）・埋め込みアプリを再反転して本来の色に戻す */}
      <style>{".nova-dark-root img,.nova-dark-root svg,.nova-dark-root video,.nova-dark-root canvas,.nova-dark-root iframe{filter:invert(1) hue-rotate(180deg)}"}</style>
      {content}
    </div>
  );
}

export default ProjectNova;
