// @@nova-part 85-today.jsx
// ================================================================
// Project-Nova : Portal Shell — 今日のメニュー（ハブ横断）
// 各ハブがばらばらに持っている「期限が来た間隔反復」「間違えた問題の控え」「正答率の低い分野」を読み、
// 決めた時間（15・30・60分）に収まる分だけ、優先順に1本に並べて出す。「開く」で該当の画面へ移る。
//   優先順：1) 期限が来た間隔反復（期限が古い順）  2) 間違えた問題の控え（古い順）  3) 正答率が低い分野（低い順）
// 各ハブの記録は読むだけで書き換えない。保存するのは時間の設定と開閉だけ（nova_today_v1）。
// 項目は、復習を済ませる・解き直すと各ハブの記録が変わり、次に数え直したときに自然に消える。
// ================================================================
const NOVA_TODAY_KEY = "nova_today_v1";
const NOVA_TODAY_SEC_PER_Q = 45; // 1問あたりの目安（秒）
const NOVA_TODAY_BUDGETS = [15, 30, 60];
const NOVA_TODAY_WEAK_MIN = 4; // 弱点に数える最小の解答数
const NOVA_TODAY_WEAK_ACC = 0.7; // 正答率がこれ未満の分野を弱点とする
const NOVA_TODAY_WEAK_SET = 10; // 弱点1つにつき解き直す問題数の目安
const NOVA_TODAY_WEAK_MAX = 3; // 1日に出す弱点の数の上限
// 間隔反復の保存。どれも { id: { due: 期限（ミリ秒）, … } } の形
const NOVA_TODAY_SRS = [
  { key: "gafa_srs_v1", name: ["TechHub 技術道場", "TechHub Tech Dojo"], to: "megatech", how: ["学習ホームの「今日の復習を始める」から", "Use “Start today's review” on the learning home"] },
  { key: "csr:cards:v1", name: ["Consulting Hub", "Consulting Hub"], to: "consulting/srs", how: ["復習のタブが開きます", "Opens the review tab"] },
  { key: "consulting_atlas_sr_v1", name: ["Consulting 体系図", "Consulting Atlas"], to: "consulting", how: ["体系図タブのクイズ「復習」から", "From “Review” in the Atlas tab quiz"] },
];
// 弱点の記録（WEAK_SOURCES の key）→ 開く先。<資格>_hub_study_v1 は資格ハブの同じ id へ
const NOVA_TODAY_WEAK_TO = {
  consulting_dom_stats_v1: "consulting/quiz", axcheck_core_stats_v1: "megatech", axcheck_ax_stats_v1: "megatech",
  aics_study_v2: "certification/aicx", pl900_study_v2: "certification/pl900",
  govdojo_stats_v1: "megatech", noteissue_stats_v1: "megatech", slalom_stats_v1: "megatech",
};
const novaTodayWeakTo = (key) => {
  if (NOVA_TODAY_WEAK_TO[key]) return NOVA_TODAY_WEAK_TO[key];
  const m = /^([a-z0-9]+)_hub_study_v\d+$/.exec(key);
  return m ? "certification/" + m[1] : null;
};

// 各ハブの記録から、今日やる候補を集める → [{ pri, kind, n, name: [日, 英], to, … }]
async function novaTodayCollect() {
  const now = Date.now();
  const get = async (k) => { try { const r = await window.storage.get(k); return r && r.value ? JSON.parse(r.value) : null; } catch (e) { return null; } };
  const items = [];
  for (const s of NOVA_TODAY_SRS) {
    const cards = await get(s.key);
    if (!cards || typeof cards !== "object") continue;
    let n = 0, oldest = 0;
    Object.values(cards).forEach((c) => {
      const due = c && typeof c === "object" ? Number(c.due) : 0;
      if (!due || due > now) return;
      n++;
      if (!oldest || due < oldest) oldest = due;
    });
    if (n) items.push({ pri: 1, kind: "srs", n, age: now - oldest, name: s.name, to: s.to, how: s.how });
  }
  for (const k of NOVA_REVIEW_KEYS) {
    const store = await get(k);
    if (!store || typeof store !== "object") continue;
    const vs = Object.values(store).filter((v) => v && typeof v === "object");
    if (!vs.length) continue;
    let oldest = 0;
    vs.forEach((v) => { const t = Number(v.added) || 0; if (t && (!oldest || t < oldest)) oldest = t; });
    const cert = novaReviewLabel(k);
    items.push({ pri: 2, kind: "queue", n: vs.length, age: oldest ? now - oldest : 0, name: [cert, cert], to: "certification/" + k.replace(/_(review|wrong)_v\d+$/, "").replace(/_/g, "") });
  }
  for (const src of WEAK_SOURCES) {
    const parsed = await get(src.key);
    if (!parsed || typeof parsed !== "object") continue;
    const table = src.kind === "prog" ? (parsed.progress || {}) : parsed;
    Object.entries(table).forEach(([dom, v]) => {
      if (!v || typeof v !== "object") return;
      const a = Number(v.attempts != null ? v.attempts : v.a) || 0;
      const c = Number(v.correct != null ? v.correct : v.c) || 0;
      if (a < NOVA_TODAY_WEAK_MIN || c / a >= NOVA_TODAY_WEAK_ACC) return;
      items.push({ pri: 3, kind: "weak", n: NOVA_TODAY_WEAK_SET, a, c, acc: c / a, name: src.hub, dom: src.labels && src.labels[dom] ? src.labels[dom] : [dom, dom], to: novaTodayWeakTo(src.key) });
    });
  }
  return items;
}

// 候補を優先順に並べ、決めた時間に収まる分だけ取る → { plan: [{ …候補, take, sec }], used: 秒, rest: { srs, queue, weak } }
function novaTodayPlan(items, budgetMin) {
  const order = items.slice().sort((x, y) => x.pri - y.pri || (x.pri === 3 ? x.acc - y.acc || y.a - x.a : y.age - x.age || y.n - x.n));
  const cap = budgetMin * 60;
  const plan = [], rest = { srs: 0, queue: 0, weak: 0 };
  let used = 0, weak = 0;
  for (const it of order) {
    const room = Math.floor((cap - used) / NOVA_TODAY_SEC_PER_Q);
    const fits = room >= Math.min(it.n, 3) && (it.kind !== "weak" || weak < NOVA_TODAY_WEAK_MAX); // 3問も入らない枠には入れない
    if (!fits) { rest[it.kind] += it.kind === "weak" ? 1 : it.n; continue; }
    const take = Math.min(it.n, room);
    plan.push({ ...it, take, sec: take * NOVA_TODAY_SEC_PER_Q });
    used += take * NOVA_TODAY_SEC_PER_Q;
    if (it.kind === "weak") weak++;
    else if (take < it.n) rest[it.kind] += it.n - take;
  }
  return { plan, used, rest };
}

function NovaToday({ lang }) {
  const en = lang === "en";
  const [open, setOpen] = useState(true);
  const [budget, setBudget] = useState(30);
  const [items, setItems] = useState(null);
  const load = () => { novaTodayCollect().then(setItems, () => setItems([])); };
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(NOVA_TODAY_KEY);
        const v = r && r.value ? JSON.parse(r.value) : null;
        if (v && NOVA_TODAY_BUDGETS.includes(v.budget)) setBudget(v.budget);
        if (v && v.open === false) setOpen(false);
      } catch (e) {}
    })();
    load();
    // 別のタブやアプリから戻ってきたときに数え直す
    const onShow = () => { if (!document.hidden) load(); };
    document.addEventListener("visibilitychange", onShow);
    return () => document.removeEventListener("visibilitychange", onShow);
  }, []);
  const save = (b, o) => { try { window.storage.set(NOVA_TODAY_KEY, JSON.stringify({ budget: b, open: o })).catch(() => {}); } catch (e) {} };
  const toggle = () => { const v = !open; setOpen(v); save(budget, v); };
  const pick = (b) => { setBudget(b); save(b, open); };
  const go = (to) => { if (!to) return; try { window.location.hash = "#" + to; } catch (e) {} };

  const { plan, used, rest } = novaTodayPlan(items || [], budget);
  const mins = (sec) => Math.max(1, Math.round(sec / 60));
  const days = (ms) => Math.floor(ms / 86400000);
  const KIND = { srs: [["復習", "Review"], NOVA.accent], queue: [["解き直し", "Redo"], NOVA.megatech], weak: [["弱点", "Weak"], NOVA.consulting] };
  const detail = (it) => {
    if (it.kind === "srs") {
      const d = days(it.age);
      return en
        ? `${it.take} due review${it.take === 1 ? "" : "s"}${it.take < it.n ? ` (of ${it.n} due)` : ""}${d > 0 ? ` · oldest ${d} day${d === 1 ? "" : "s"} overdue` : ""}`
        : `期限が来た復習 ${it.take}問${it.take < it.n ? `（全${it.n}問のうち）` : ""}${d > 0 ? `・いちばん古い期限は${d}日前` : ""}`;
    }
    if (it.kind === "queue") {
      const d = days(it.age);
      return en
        ? `${it.take} missed question${it.take === 1 ? "" : "s"} to redo${it.take < it.n ? ` (of ${it.n})` : ""}${d > 0 ? ` · oldest from ${d} day${d === 1 ? "" : "s"} ago` : ""}`
        : `間違えた問題の控え ${it.take}問${it.take < it.n ? `（全${it.n}問のうち）` : ""}${d > 0 ? `・いちばん古いのは${d}日前` : ""}`;
    }
    const pct = Math.round(it.acc * 100);
    return en
      ? `${it.dom[1]}: ${pct}% correct (${it.c}/${it.a}) → redo ${it.take}`
      : `${it.dom[0]}：正答率${pct}%（${it.c}/${it.a}）→ ${it.take}問解き直す`;
  };
  const restText = [
    rest.srs ? (en ? `${rest.srs} due reviews` : `復習 ${rest.srs}問`) : "",
    rest.queue ? (en ? `${rest.queue} missed questions` : `控え ${rest.queue}問`) : "",
    rest.weak ? (en ? `${rest.weak} weak area${rest.weak === 1 ? "" : "s"}` : `弱点 ${rest.weak}分野`) : "",
  ].filter(Boolean).join(en ? ", " : "・");
  const chip = (on) => ({ fontSize: 11, fontWeight: 700, color: on ? "#fff" : NOVA.sub, background: on ? NOVA.accent : "transparent", border: `1px solid ${on ? NOVA.accent : NOVA.line}`, borderRadius: 999, padding: "2px 11px", cursor: "pointer" });

  return (
    <div style={{ margin: "18px 0 4px" }}>
      <div onClick={toggle} role="button" aria-expanded={open} aria-label={en ? "Today's menu" : "今日のメニュー"} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "2px 0" }}>
        <span style={{ color: NOVA.faint, fontSize: 10, width: 10, flexShrink: 0 }}>{open ? "▾" : "▸"}</span>
        <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", background: NOVA.accent }}>◷</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", lineHeight: 1.2 }}>
          <span style={{ fontFamily: NOVA_SERIF, fontSize: 15.5, fontWeight: 700, color: NOVA.ink, letterSpacing: 0.2 }}>{en ? "Today's Menu" : "今日のメニュー"}</span>
          <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 1.2, color: "#fff", background: NOVA.accent, borderRadius: 999, padding: "2px 8px" }}>{en ? "CROSS-HUB" : "横断"}</span>
          {!open && items !== null ? (
            <span style={{ fontSize: 11.5, color: NOVA.sub }}>
              {plan.length ? (en ? `${plan.length} item${plan.length === 1 ? "" : "s"} · about ${mins(used)} min` : `${plan.length}件・約${mins(used)}分`) : (en ? "nothing due" : "今日の分はありません")}
            </span>
          ) : null}
        </div>
      </div>
      <NovaRule margin="6px 0 10px" />
      {open && (
        <div style={{ padding: "0 0 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11.5, color: NOVA.sub, marginRight: 2 }}>{en ? "Time today" : "今日の時間"}</span>
            {NOVA_TODAY_BUDGETS.map((b) => (
              <button key={b} type="button" onClick={() => pick(b)} aria-pressed={budget === b} style={chip(budget === b)}>{en ? `${b} min` : `${b}分`}</button>
            ))}
            <span style={{ flex: 1 }} />
            <button type="button" onClick={load} style={{ fontSize: 10.5, color: NOVA.sub, background: "transparent", border: `1px solid ${NOVA.faint}`, borderRadius: 999, padding: "2px 10px", cursor: "pointer" }}>{en ? "refresh" : "数え直す"}</button>
          </div>
          {items === null ? (
            <div style={{ fontSize: 12, color: NOVA.faint }}>{en ? "Loading..." : "読み込み中..."}</div>
          ) : plan.length === 0 ? (
            <div style={{ fontSize: 12, color: NOVA.sub, lineHeight: 1.7 }}>
              {restText
                ? (en ? `Nothing fits in ${budget} minutes. Waiting: ${restText}. Choose a longer time to see them.` : `${budget}分に収まる項目がありません。待っているもの：${restText}。時間を長くすると出ます。`)
                : (en ? "No reviews are due, no missed questions are waiting, and no area with 4+ answers is under 70%. Carry on with the Mastery Track below." : "期限が来た復習・間違えた問題の控え・正答率70%未満の分野（解答4問以上）は、いまありません。下の Mastery Track の続きへどうぞ。")}
            </div>
          ) : (
            <>
              {plan.map((it, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i ? `1px solid ${NOVA.line}` : "none", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: NOVA.faint, width: 14, flexShrink: 0, textAlign: "right" }}>{i + 1}</span>
                  <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 0.6, color: KIND[it.kind][1], border: `1px solid ${KIND[it.kind][1]}`, borderRadius: 999, padding: "1px 8px", flexShrink: 0 }}>{KIND[it.kind][0][en ? 1 : 0]}</span>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: NOVA.ink }}>{it.name[en ? 1 : 0]}</div>
                    <div style={{ fontSize: 11.5, color: NOVA.sub, lineHeight: 1.6 }}>{detail(it)}</div>
                    {it.how ? <div style={{ fontSize: 10.5, color: NOVA.faint, lineHeight: 1.5 }}>{it.how[en ? 1 : 0]}</div> : null}
                  </div>
                  <span style={{ fontSize: 11.5, color: NOVA.sub, flexShrink: 0 }}>{en ? `~${mins(it.sec)} min` : `約${mins(it.sec)}分`}</span>
                  {it.to ? (
                    <button type="button" onClick={() => go(it.to)} aria-label={(en ? "Open " : "開く：") + it.name[en ? 1 : 0] + (en ? " (" + KIND[it.kind][0][1] + ")" : "（" + KIND[it.kind][0][0] + "）")} style={{ flexShrink: 0, marginLeft: "auto", background: "transparent", border: `1px solid ${NOVA.accent}`, color: NOVA.accent, fontWeight: 700, fontSize: 11.5, borderRadius: 999, padding: "3px 12px", cursor: "pointer" }}>{en ? "Open →" : "開く →"}</button>
                  ) : null}
                </div>
              ))}
              <NovaRule margin="2px 0 8px" />
              <div style={{ fontSize: 11.5, color: NOVA.sub, lineHeight: 1.7 }}>
                {en ? `Total about ${mins(used)} min of ${budget}.` : `合計 約${mins(used)}分（目安 ${budget}分）。`}
                {restText ? (en ? ` Left for another day: ${restText}.` : ` 今日の枠に入らなかった分：${restText}。`) : ""}
              </div>
            </>
          )}
          <div style={{ fontSize: 10.5, color: NOVA.faint, marginTop: 6, lineHeight: 1.6 }}>
            {en
              ? `Order: due reviews, then missed questions, then weak areas. Estimated at ${NOVA_TODAY_SEC_PER_Q} seconds per question. Reads each hub's records on this device; it does not change them.`
              : `並び順は、期限が来た復習 → 間違えた問題の控え → 正答率の低い分野。1問${NOVA_TODAY_SEC_PER_Q}秒で見積もっています。この端末にある各ハブの記録を読むだけで、書き換えません。`}
          </div>
        </div>
      )}
    </div>
  );
}
