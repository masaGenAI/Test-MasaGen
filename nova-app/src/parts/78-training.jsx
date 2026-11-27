// @@nova-part 78-training.jsx
// ================= TrainingHubModule（トレーニング記録カレンダー） =================
// Set1〜Set5 を決まった順番で回し、その日に実施できたかをカレンダーに記録する。
// 「次にやる Set」は保存した記録を日付順にたどって毎回計算し直すので、
// 会食で休んだ日や未実施の日、予定と違う Set をやった日があっても、次回は続きの Set から再開できる。
const TrainingHubModule = (function () {
  const TR_KEY = "training_log_v1";
  // ---- 画面の言語（ポータルの言語で開き、見出しの EN／日本語 で切り替える） ----
  // 訳すのは画面の部品（見出し・ボタン・案内）と短い決まった名前（種目・食事の区分）だけ。記録した内容とメニューの重量・手順は訳さない。
  // ハブの根（TrainingHub）が描画のたびに UI_EN を入れ直すので、部品と補助関数は tx(日本語, 英語) で今の言語の文言を選ぶ。
  let UI_EN = false;
  const tx = (ja, en) => (UI_EN ? en : ja);
  const pl = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`; // 英語の複数形（1 day / 2 days）
  const useUiLang = () => {
    const [ui, setUi] = useState(() => (typeof window !== "undefined" && window.__novaLang) || "ja"); // ポータルの言語で開く
    useEffect(() => {
      // ポータルが保存済みの言語を読み込んだとき・切り替えたとき（nova-lang）にも合わせる
      const f = () => { const l = window.__novaLang; if (l === "ja" || l === "en") setUi(l); };
      window.addEventListener("nova-lang", f);
      return () => window.removeEventListener("nova-lang", f);
    }, []);
    return [ui, setUi];
  };
  // 配色。ポータルの NOVA はこのモジュールより後で宣言されるため、ここでは参照しない。
  const TC = {
    ink: "#0E1E38", sub: "#5B6B85", faint: "#A9B4C6", line: "#DEE5EF", panel: "#F4F7FB", bg: "#FFFFFF",
    accent: "#1E7A6E", accentSoft: "#E3F2EF", dot: "#7CC4B8",
    squat: "#1F6FB0", run: "#1E7A6E", walk: "#5B4FC4", aero: "#B83280", rest: "#64748B", dinner: "#975A16", skip: "#C2410C", skipset: "#7C6F64", other: "#0E7490",
    warnBg: "#FFF4E5",
  };
  const KIND_COLOR = { squat: TC.squat, run: TC.run, walk: TC.walk, aero: TC.aero };

  // ---- メニューの元データ（ユーザーのプランそのまま。Set調整で上書きした値はこれに重ねる） ----
  const EX_NAME = { squat: "スクワット", chest: "チェストプレス", lat: "ラットプルダウン", torso: "ロータリートルソー" };
  const EX_NAME_EN = { squat: "Squat", chest: "Chest press", lat: "Lat pulldown", torso: "Rotary torso" };
  const exName = (id) => tx(EX_NAME[id], EX_NAME_EN[id]);
  const AERO_WALK = [
    "最初5分：低い傾斜・楽な速度でウォーキング",
    "次の50分：傾斜8％・速度5.5km/h",
    "最後5分：傾斜・速度を下げてウォーキング",
  ];
  const AERO_RUN = [
    "最初5分：低い傾斜・楽な速度でウォーキング",
    "次の10分：傾斜10％・速度6km/hでウォーキング",
    "次の5〜10分：ランニング",
    "次の30〜35分：傾斜8％・速度5.5km/hでウォーキング",
    "最後5分：傾斜・速度を下げてウォーキング",
    "ランニング5分なら、その後のウォーキング35分",
    "ランニング10分なら、その後のウォーキング30分",
  ];
  // 各種目は重量ごとの段（plan）で持つ。2026-10 にユーザー指定のメニューへ変更（全Set共通）
  const sq = { id: "squat", plan: "20kg×10回、50kg×10回、60kg×20回、65kg×10回（5回×2セット）" };
  const ch = () => ({ id: "chest", plan: "79kg×5回、72kg×35回、66kg×10回" });
  const la = () => ({ id: "lat", plan: "41kg×40回、36kg×10回" });
  const to = { id: "torso", plan: "50kg×20回×左右2セット、45kg×10回×左右1セット" };
  const BASE = {
    S1: { id: "S1", n: 1, kind: "squat", title: "スクワット＋上半身＋ウォーキング", items: [sq, ch(5), la(5), to], aero: { total: 60, steps: AERO_WALK } },
    S2: { id: "S2", n: 2, kind: "run", title: "上半身＋ランニング", items: [ch(3), la(3), to], aero: { total: 60, steps: AERO_RUN } },
    S3: { id: "S3", n: 3, kind: "squat", title: "スクワット＋上半身＋ウォーキング", items: [sq, ch(5), la(5), to], aero: { total: 60, steps: AERO_WALK } },
    S4: { id: "S4", n: 4, kind: "run", title: "上半身＋ランニング", items: [ch(3), la(3), to],
          aero: { total: 60, steps: [...AERO_RUN, "脚の疲労が残る場合は、ランニング部分を楽なウォーキングに変更"] } },
    S5: { id: "S5", n: 5, kind: "walk", title: "上半身＋ウォーキング", items: [ch(3), la(3), to], aero: { total: 60, steps: [
      "最初5分：低い傾斜・楽な速度でウォーキング",
      "次の10分：傾斜10％・速度6km/h",
      "次の40分：傾斜8％・速度5.5km/h",
      "最後5分：傾斜・速度を下げてウォーキング",
    ] } },
  };
  // 有酸素だけの日（Set1〜5 の巡回には入れない。記録しても次の Set は進まない）
  BASE.A = { id: "A", n: 0, label: "有酸素", kind: "aero", title: "有酸素のみ", items: [], aero: { total: 60, steps: AERO_WALK } };
  const SET_IDS = ["S1", "S2", "S3", "S4", "S5"];
  const PICK_IDS = [...SET_IDS, "A"];
  const setName = (s) => (s ? (s.label ? tx(s.label, "Cardio") : `Set${s.n}`) : "?");
  // Set の題名（4種類だけの決まった名前）の英語
  const TITLE_EN = { "スクワット＋上半身＋ウォーキング": "Squats + upper body + walking", "上半身＋ランニング": "Upper body + running", "上半身＋ウォーキング": "Upper body + walking", "有酸素のみ": "Cardio only" };
  const setTitle = (s) => tx(s.title, TITLE_EN[s.title] || s.title);
  // 1巡：Set1 → Set2 → 休養日 → Set3 → Set4 → Set5 → 休養日
  const CYCLE = ["S1", "S2", "R", "S3", "S4", "S5", "R"];

  const FLOW_RULES = [
    "基本：Set1 → Set2 → 休養日 → Set3 → Set4 → Set5 → 休養日",
    "月間目安：各Setを4回・合計20回",
    "会食が入った日は休養日にし、次回は続きのSetから再開",
    "月が変わっても、途中のSetから続けてOK",
    "月末に未実施分を詰め込まない",
    "スクワットの間隔は、基本的に2〜3日以上確保する",
  ];
  const LOAD_RULES = [
    "記載順に筋トレを行い、その後に有酸素",
    "スクワットは軽い重量（20kg）でウォームアップしてから本番の段へ",
    "重量はあと2〜3回できる余力を残せるよう調整",
    "チェスト・ラットプルは、予定変更で連日になった場合は最も重い段を省くなど量を減らす",
    "休養翌日は予定どおりの量を基本とし、疲労が残れば減らす",
    "セット間休憩：スクワット・チェスト・ラットプルは2〜3分、トルソーは1〜2分",
    "ランニングはまずSet2だけで開始し、回復できればSet4にも追加",
    "ランニングは傾斜0〜1％・無理なく走れる速度から。希望の傾斜3％・速度9〜10km/hは慣れてから",
    "傾斜ウォーキングも負荷が高いため、呼吸や脚の疲労に合わせて傾斜・速度・時間を下げる",
  ];
  const FOOD_RULES = [
    "摂取カロリー：2,300〜2,400kcal／日から試す",
    "タンパク質：160〜180g／日",
    "脂質：60〜70g／日を目安",
    "炭水化物：残りのカロリーで調整",
    "朝のプロテインは1日のタンパク質量に含める",
    "毎朝同条件で体重を測り、7日平均で確認",
    "まず2週間続け、体重・疲労・筋力を見て調整",
    "第一目標：88kg・26％ → 81kg前後・20％前後。筋肉を維持できた場合の概算",
  ];
  const FLOW_RULES_EN = [
    "Base cycle: Set1 → Set2 → rest day → Set3 → Set4 → Set5 → rest day",
    "Monthly target: each Set 4 times, 20 sessions in total",
    "Make a dining-out day a rest day and resume with the next Set",
    "When the month changes, carry on from wherever you are in the cycle",
    "Don't cram missed sessions into the end of the month",
    "Leave at least 2–3 days between squat sessions",
  ];
  const LOAD_RULES_EN = [
    "Do the strength work in the listed order, then cardio",
    "Warm up squats with a light weight (20 kg) before the working sets",
    "Pick weights that leave 2–3 reps in reserve",
    "If plan changes put chest press or lat pulldown on back-to-back days, cut the volume (e.g. drop the heaviest set)",
    "After a rest day, do the planned volume; reduce it if you're still tired",
    "Rest between sets: 2–3 min for squat, chest press and lat pulldown; 1–2 min for rotary torso",
    "Start running in Set2 only; add it to Set4 once you recover well",
    "Run at a 0–1% incline and a comfortable pace at first; build up to the target 3% incline at 9–10 km/h",
    "Incline walking is demanding too: lower the incline, speed or time to match your breathing and leg fatigue",
  ];
  const FOOD_RULES_EN = [
    "Calories: start at 2,300–2,400 kcal/day",
    "Protein: 160–180 g/day",
    "Fat: about 60–70 g/day",
    "Carbs: fill the remaining calories",
    "Count the morning protein shake toward daily protein",
    "Weigh yourself every morning under the same conditions and track the 7-day average",
    "Keep this up for 2 weeks first, then adjust based on weight, fatigue and strength",
    "First goal: 88 kg / 26% → about 81 kg / 20%. A rough estimate assuming you keep your muscle",
  ];
  const GOAL = { fromKg: 88, fromBf: 26, kg: 81, bf: 20 };
  const MONTH_TARGET = 4; // 各Setの月間目安

  // ---- Set調整（元のプランとの差分だけを保存する） ----
  const effSet = (adj, id) => {
    const b = BASE[id];
    const a = (adj && adj[id]) || {};
    return { ...b, items: b.items.map((it) => ({ ...it, ...((a.items || {})[it.id] || {}) })), aero: { ...b.aero, ...(a.aero || {}) } };
  };
  // 記録した日のメニュー（あとで Set調整を変えても、その日にやった内容は変わらない）
  const snap = (set) => ({ items: set.items.map((it) => ({ ...it })), aero: set.aero });
  const recSet = (rec, adj) => (rec && rec.set && BASE[rec.set]
    ? (rec.menu ? { ...BASE[rec.set], ...rec.menu } : effSet(adj, rec.set))
    : null);
  const fmtItem = (it) => (it.plan ? it.plan : tx(`${it.w != null ? `${it.w}kg目安・` : ""}${it.reps} × ${it.sets}セット`, `${it.w != null ? `~${it.w} kg · ` : ""}${it.reps} × ${it.sets} sets`));
  const baseItem = (setId, exId) => BASE[setId].items.find((x) => x.id === exId);

  // ---- 日付（端末の暦日で扱う。toISOString は UTC になり日本時間の朝に前日へずれる） ----
  const pad = (n) => String(n).padStart(2, "0");
  const keyOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const partsOf = (k) => k.split("-").map(Number);
  const addDays = (k, n) => { const [y, m, d] = partsOf(k); return keyOf(new Date(y, m - 1, d + n)); };
  const dayNo = (k) => { const [y, m, d] = partsOf(k); return Date.UTC(y, m - 1, d) / 86400000; };
  const diffDays = (a, b) => dayNo(a) - dayNo(b);
  const DOW = ["日", "月", "火", "水", "木", "金", "土"];
  const DOW_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTH_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // 日本語は「11/3（火）」、英語は「Tue 11/3」
  const label = (k) => { const [y, m, d] = partsOf(k); const w = new Date(y, m - 1, d).getDay(); return UI_EN ? `${DOW_EN[w]} ${m}/${d}` : `${m}/${d}（${DOW[w]}）`; };
  const short = (k) => { const [, m, d] = partsOf(k); return `${m}/${d}`; };

  // ---- 順番の計算 ----
  // 完了：その Set の次へ進む（予定と違う Set をやった場合もそこに合わせ直す）
  // 休養・会食：計画上の休養日が来ていればそれを消化する。そうでなければ進めない（続きの Set から再開）
  // 未実施・その他：進めない　Skip：予定を飛ばして次へ進む
  const stepCycle = (pos, rec) => {
    if (!rec || !rec.s) return pos;
    if (rec.s === "done" && rec.set) { const i = CYCLE.indexOf(rec.set); return i < 0 ? pos : (i + 1) % CYCLE.length; }
    if ((rec.s === "rest" || rec.s === "dinner") && CYCLE[pos] === "R") return (pos + 1) % CYCLE.length;
    // Skip：予定の Set（または休養日）を飛ばして次へ進む。未実施は進めない
    if (rec.s === "skipset") return (pos + 1) % CYCLE.length;
    return pos;
  };
  // 休養日の位置なら、その次の Set（予定を変えて筋トレした日の既定値に使う）
  const setAt = (pos) => (CYCLE[pos] === "R" ? CYCLE[(pos + 1) % CYCLE.length] : CYCLE[pos]);
  const posBefore = (days, k) => {
    let pos = 0;
    for (const d of Object.keys(days).sort()) { if (d >= k) break; pos = stepCycle(pos, days[d]); }
    return pos;
  };
  // 今日以降の予定を順番どおりに割り当てる（先に入れた会食の日は休養として飛ばす）
  const project = (days, todayK, untilK) => {
    const out = {};
    let pos = posBefore(days, todayK);
    let k = todayK;
    if (days[todayK] && days[todayK].s) { pos = stepCycle(pos, days[todayK]); k = addDays(todayK, 1); }
    for (let guard = 0; k <= untilK && guard < 1200; guard++) {
      const r = days[k];
      if (r && r.s === "dinner") { out[k] = "dinner"; pos = stepCycle(pos, r); }
      else { out[k] = CYCLE[pos]; pos = (pos + 1) % CYCLE.length; }
      k = addDays(k, 1);
    }
    return out;
  };
  // その日の調整メモ（それより前の記録と、その Set の今の内容から判断する）
  const hintsFor = (days, k, set) => {
    if (!set) return [];
    const out = [];
    const prev = days[addDays(k, -1)];
    if (set.items.some((it) => it.id === "squat")) {
      const last = Object.keys(days).sort().reverse()
        .find((d) => d < k && days[d].s === "done" && BASE[days[d].set] && BASE[days[d].set].items.some((it) => it.id === "squat"));
      if (last) {
        const n = diffDays(k, last);
        out.push(n < 2
          ? { warn: true, t: tx(`スクワットは前回（${short(last)}）から${n}日しか空いていません。間隔は2〜3日以上が目安です。`, `Only ${pl(n, "day")} since your last squats (${short(last)}). Aim for a gap of 2–3 days or more.`) }
          : { t: tx(`スクワットは前回（${short(last)}）から${n}日空いています。`, `${pl(n, "day")} since your last squats (${short(last)}).`) });
      }
    }
    // 2026-10 のメニュー変更で種目は重量の段（plan）だけになり、セット数で判定できなくなった。上半身の種目があるかで判定する
    const isUpper = (s0) => !!s0 && s0.items.some((it) => it.id === "chest" || it.id === "lat");
    const prevUpper = prev && prev.s === "done" && isUpper(BASE[prev.set]);
    if (isUpper(set) && prevUpper) {
      out.push({ warn: true, t: tx("前日も上半身をしています（連日）。チェストプレスとラットプルダウンは最も重い段を省くなど、量を減らします。", "You did upper body yesterday too (back-to-back days). Cut chest press and lat pulldown volume, e.g. drop the heaviest set.") });
    } else if (isUpper(set) && prev && (prev.s === "rest" || prev.s === "dinner")) {
      out.push({ t: tx("休養明けです。予定どおりの量を基本に、疲れが残っていれば減らします。", "First session after a rest day: do the planned volume, and cut back if you're still tired.") });
    }
    return out;
  };

  // ---- 見た目の部品 ----
  const chip = (bg, fg, border) => ({
    display: "inline-block", fontSize: 10.5, fontWeight: 700, lineHeight: 1.3, padding: "2px 6px", borderRadius: 6,
    background: bg, color: fg, border: border || "none", whiteSpace: "nowrap",
  });
  const btn = (on, color) => ({
    fontSize: 13, fontWeight: on ? 800 : 600, padding: "9px 14px", borderRadius: 10, cursor: "pointer",
    border: `1.5px solid ${on ? (color || TC.accent) : TC.line}`, background: on ? (color || TC.accent) : TC.bg,
    color: on ? "#fff" : TC.ink, fontFamily: "inherit",
  });
  const small = { padding: "5px 10px", fontSize: 12 };
  const card = { background: TC.bg, border: `1px solid ${TC.line}`, borderRadius: 14, padding: "16px 18px", marginBottom: 14 };
  const h2 = { fontSize: 15, fontWeight: 800, color: TC.ink, margin: "0 0 10px" };
  const cap = { fontSize: 12, color: TC.sub, marginBottom: 6 };
  const field = { fontSize: 14, padding: "7px 9px", borderRadius: 8, border: `1px solid ${TC.line}`, fontFamily: "inherit", color: TC.ink, background: TC.bg, boxSizing: "border-box" };
  const num1 = (v) => { const x = parseFloat(String(v).replace(",", ".")); return Number.isFinite(x) ? Math.round(x * 10) / 10 : undefined; };

  function SetMenu({ set, base, run }) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={chip(KIND_COLOR[set.kind], "#fff")}>{setName(set)}</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: TC.ink }}>{setTitle(set)}</span>
        </div>
        <ol style={{ margin: 0, paddingLeft: 20, color: TC.ink, fontSize: 13, lineHeight: 1.8 }}>
          {set.items.map((it) => {
            const b = base ? base.items.find((x) => x.id === it.id) : null;
            const changed = b && fmtItem(b) !== fmtItem(it);
            return (
              <li key={it.id}>
                <b>{exName(it.id)}</b>{tx("：", ": ")}{fmtItem(it)}
                {changed ? <span style={{ ...chip(TC.accentSoft, TC.accent), marginLeft: 6 }} title={tx(`元のプラン：${fmtItem(b)}`, `Original plan: ${fmtItem(b)}`)}>{tx("調整済み", "Adjusted")}</span> : null}
                {changed ? <span style={{ fontSize: 11.5, color: TC.faint, marginLeft: 6 }}>{tx("元：", "Was: ")}{fmtItem(b)}</span> : null}
              </li>
            );
          })}
          <li>
            <b>{tx("有酸素", "Cardio")}</b>{tx(`：合計${set.aero.total}分`, `: ${set.aero.total} min total`)}
            {base && (base.aero.total !== set.aero.total || base.aero.steps.join("|") !== set.aero.steps.join("|"))
              ? <span style={{ ...chip(TC.accentSoft, TC.accent), marginLeft: 6 }}>{tx("調整済み", "Adjusted")}</span> : null}
            <ul style={{ margin: "2px 0 4px", paddingLeft: 18, color: TC.sub, fontSize: 12.5, lineHeight: 1.75 }}>
              {set.aero.steps.map((x, j) => <li key={j}>{x}</li>)}
            </ul>
          </li>
        </ol>
        {run ? (
          <div style={{ marginTop: 6, fontSize: 12.5, color: TC.ink, background: TC.accentSoft, borderRadius: 8, padding: "6px 10px" }}>
            {tx(`ランニング${run}分 → その後のウォーキングは${run === 5 ? 35 : 30}分`, `Run ${run} min → then walk ${run === 5 ? 35 : 30} min`)}
          </div>
        ) : null}
      </div>
    );
  }

  function Hints({ list }) {
    if (!list.length) return null;
    return (
      <div style={{ display: "grid", gap: 6, margin: "10px 0 0" }}>
        {list.map((h, i) => (
          <div key={i} style={{ fontSize: 12.5, lineHeight: 1.6, color: TC.ink, padding: "6px 10px", borderRadius: 8,
                                background: h.warn ? TC.warnBg : TC.panel, borderLeft: `3px solid ${h.warn ? TC.dinner : TC.faint}` }}>
            {h.warn ? "⚠ " : ""}{h.t}
          </div>
        ))}
      </div>
    );
  }

  // メニューの選択肢（予定の Set には「予定」の印）。予定と違う Set や「その他」も選べる
  function MenuPicker({ value, expected, onPick }) {
    return (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {PICK_IDS.map((id) => {
          const s = BASE[id];
          return (
            <button key={id} onClick={() => onPick(id)} aria-pressed={value === id} style={{ ...btn(value === id, KIND_COLOR[s.kind]), position: "relative" }}>
              {setName(s)}
              {expected === id ? <span style={{ fontSize: 10, fontWeight: 700, marginLeft: 5, opacity: value === id ? 0.9 : 0.75 }}>{tx("予定", "Planned")}</span> : null}
            </button>
          );
        })}
      </div>
    );
  }

  function RunPicker({ value, onPick }) {
    return (
      <div style={{ marginTop: 10 }}>
        <div style={cap}>{tx("ランニング", "Running")}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[0, 5, 10].map((m) => (
            <button key={m} onClick={() => onPick(m)} aria-pressed={(value || 0) === m} style={{ ...btn((value || 0) === m), ...small }}>
              {m ? tx(`${m}分`, `${m} min`) : tx("走らない（ウォーキングのみ）", "No run (walk only)")}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 記録の表示名
  const statusText = (r) => {
    if (!r || !r.s) return "";
    if (r.s === "done") return tx(`${setName(BASE[r.set])} 完了`, `${setName(BASE[r.set])} done`);
    if (r.s === "other") return tx(`その他${r.other ? `：${r.other}` : ""}`, `Other${r.other ? `: ${r.other}` : ""}`);
    return (UI_EN ? { skip: "Not done", skipset: "Skip", rest: "Rest", dinner: "Dining out" } : { skip: "未実施", skipset: "Skip", rest: "休養", dinner: "会食" })[r.s] || "";
  };
  const planText = (p) => (p === "R" ? tx("休養日", "Rest day") : p === "dinner" ? tx("会食", "Dining out") : setName(BASE[p]));

  // ---- 今日のトレーニング（その場で記録する） ----
  function TodayCard({ days, adj, todayK, proj, onPut, openEditor }) {
    const rec = days[todayK];
    const pos = posBefore(days, todayK);
    const expected = CYCLE[pos];
    const [pick, setPick] = useState(expected === "R" ? null : expected);
    const [run, setRun] = useState(0);
    const [other, setOther] = useState("");
    const head = (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
        <div style={{ ...h2, margin: 0 }}>{tx("今日のトレーニング", "Today's training")} <span style={{ fontWeight: 600, color: TC.sub, fontSize: 13 }}>{label(todayK)}</span></div>
        <span style={{ fontSize: 12.5, color: TC.sub }}>{tx("予定：", "Planned: ")}<b style={{ color: TC.ink }}>{planText(expected)}</b></span>
      </div>
    );
    if (rec && rec.s) {
      const set = recSet(rec, adj);
      return (
        <div style={{ ...card, borderColor: TC.ink }}>
          {head}
          <div style={{ fontSize: 15, fontWeight: 800, color: TC.accent, margin: "8px 0 10px" }}>
            {tx("✓ 記録済み：", "✓ Logged: ")}{statusText(rec)}{rec.run ? tx(`（ランニング${rec.run}分）`, ` (ran ${rec.run} min)`) : ""}
          </div>
          {set ? <SetMenu set={set} run={rec.run} /> : null}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <button onClick={() => openEditor(todayK)} style={btn(false)}>{tx("記録を修正する", "Edit this entry")}</button>
          </div>
        </div>
      );
    }
    const set = pick && pick !== "other" ? effSet(adj, pick) : null;
    const commit = () => {
      if (set) onPut(todayK, { s: "done", set: pick, menu: snap(set), run: set.kind === "run" && run ? run : undefined });
      else if (pick === "other") { if (other.trim()) onPut(todayK, { s: "other", other: other.trim() }); }
      else onPut(todayK, { s: "rest" });
    };
    const primary = set ? tx(`✓ ${setName(set)} 完了`, `✓ ${setName(set)} done`) : pick === "other" ? tx("✓ その他を記録", "✓ Log other") : tx("✓ 休養", "✓ Rest");
    return (
      <div style={{ ...card, borderColor: TC.ink }}>
        {head}
        <div style={{ height: 10 }} />
        <MenuPicker value={pick} expected={expected} onPick={(v) => setPick(pick === v && expected === "R" ? null : v)} />
        <div style={{ marginTop: 12 }}>
          {set ? (
            <>
              <SetMenu set={set} base={BASE[pick]} run={set.kind === "run" ? run : 0} />
              {set.kind === "run" ? <RunPicker value={run} onPick={setRun} /> : null}
              <Hints list={hintsFor(days, todayK, set)} />
            </>
          ) : pick === "other" ? (
            <label style={{ display: "block", ...cap }}>{tx("やった内容（自由記述）", "What you did (free text)")}
              <textarea value={other} onChange={(e) => setOther(e.target.value)} rows={3} autoFocus
                        aria-label={tx("例：ゴルフ18ホール／ストレッチ30分／上半身だけ実施", "e.g. 18 holes of golf / 30 min of stretching / upper body only")} placeholder={tx("例：ゴルフ18ホール／ストレッチ30分／上半身だけ実施", "e.g. 18 holes of golf / 30 min of stretching / upper body only")}
                        style={{ ...field, width: "100%", marginTop: 4, resize: "vertical", lineHeight: 1.6 }} />
            </label>
          ) : (
            <div style={{ fontSize: 13.5, color: TC.ink, background: TC.panel, borderRadius: 10, padding: "10px 12px" }}>
              {tx(`しっかり休んで、次回のSet${BASE[setAt(pos)].n}に備えましょう。`, `Rest well and get ready for Set${BASE[setAt(pos)].n} next time.`)}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <button onClick={commit} disabled={pick === "other" && !other.trim()}
                  style={{ ...btn(true, pick === "other" ? TC.other : undefined), opacity: pick === "other" && !other.trim() ? 0.5 : 1 }}>{primary}</button>
          {expected !== "R" ? <button onClick={() => onPut(todayK, { s: "skip" })} style={btn(false)}>{tx("未実施", "Not done")}</button> : null}
          <button onClick={() => onPut(todayK, { s: "skipset" })} style={btn(false)} title={tx("予定を飛ばして、次回は次のSetから", "Skip the planned session; next time moves on to the next Set")}>Skip</button>
          {expected !== "R" ? <button onClick={() => onPut(todayK, { s: "rest" })} style={btn(false)}>{tx("休養", "Rest")}</button> : null}
          <button onClick={() => onPut(todayK, { s: "dinner" })} style={btn(false)}>{tx("会食", "Dining out")}</button>
          <button onClick={() => setPick(pick === "other" ? (expected === "R" ? null : expected) : "other")} aria-pressed={pick === "other"}
                  style={btn(pick === "other", TC.other)}>{tx("その他", "Other")}</button>
        </div>
      </div>
    );
  }

  // ---- 1日の記録を編集する（カレンダーで日付を押したとき） ----
  function DayEditor({ k, rec, adj, expected, nextSet, isFuture, days, onPut, onClose, onOpenMeals }) {
    const r = rec || {};
    const [kg, setKg] = useState(r.kg != null ? String(r.kg) : "");
    const [bf, setBf] = useState(r.bf != null ? String(r.bf) : "");
    const [memo, setMemo] = useState(r.memo || "");
    const [other, setOther] = useState(r.other || "");
    const pickSet = (id) => { const s = effSet(adj, id); onPut({ s: "done", set: id, menu: snap(s), run: s.kind === "run" ? r.run : undefined }); };
    const shown = r.s === "done" ? recSet(r, adj) : null;
    const hintSet = shown || (expected && expected !== "R" ? effSet(adj, expected) : null);
    const worked = r.s === "done";
    return (
      <div style={{ ...card, borderColor: TC.accent }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
          <div style={{ ...h2, margin: 0 }}>{tx(`${label(k)}の記録`, `Log for ${label(k)}`)}</div>
          <button onClick={onClose} style={{ ...btn(false), ...small }}>{tx("閉じる", "Close")}</button>
        </div>
        {isFuture ? (
          <div>
            <div style={{ fontSize: 12.5, color: TC.sub, marginBottom: 8, lineHeight: 1.7 }}>
              {tx("先の日付には会食の予定だけ入れられます。入れた日は休養日になり、予定の Set は翌日以降に繰り下がります。", "For future dates you can only add a dining-out plan. That day becomes a rest day, and the planned Set moves to the following days.")}
            </div>
            <button onClick={() => onPut({ s: r.s === "dinner" ? undefined : "dinner" })} style={btn(r.s === "dinner", TC.dinner)}>
              {r.s === "dinner" ? tx("会食の予定を取り消す", "Cancel dining-out plan") : tx("会食の予定を入れる", "Add dining-out plan")}
            </button>
          </div>
        ) : (
          <div>
            {expected ? <div style={cap}>{tx("この日の予定：", "Planned for this day: ")}<b style={{ color: TC.ink }}>{planText(expected)}</b></div> : null}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button onClick={() => { if (!worked) pickSet(nextSet || "S1"); }} style={btn(worked)}>{tx("完了", "Done")}</button>
              <button onClick={() => onPut({ s: "skip" })} style={btn(r.s === "skip", TC.skip)}>{tx("未実施", "Not done")}</button>
              <button onClick={() => onPut({ s: "skipset" })} style={btn(r.s === "skipset", TC.skipset)} title={tx("予定を飛ばして、次回は次のSetから", "Skip the planned session; next time moves on to the next Set")}>Skip</button>
              <button onClick={() => onPut({ s: "rest" })} style={btn(r.s === "rest", TC.rest)}>{tx("休養", "Rest")}</button>
              <button onClick={() => onPut({ s: "dinner" })} style={btn(r.s === "dinner", TC.dinner)}>{tx("会食", "Dining out")}</button>
              <button onClick={() => onPut({ s: "other" })} style={btn(r.s === "other", TC.other)}>{tx("その他", "Other")}</button>
            </div>
            {worked ? (
              <div style={{ marginTop: 12 }}>
                <div style={cap}>{tx("やった内容（予定と違えば選び直してください。次回はここから続きます）", "What you did (pick again if it differs from the plan; the next session continues from here)")}</div>
                <MenuPicker value={r.set} expected={expected !== "R" ? expected : null} onPick={pickSet} />
                {shown && shown.kind === "run" ? <RunPicker value={r.run} onPick={(m) => onPut({ run: m || undefined })} /> : null}
                {shown ? (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ ...cap, marginBottom: 8 }}>{r.menu ? tx("記録した時点のメニュー", "Menu as logged") : tx("メニュー", "Menu")}</div>
                    <SetMenu set={shown} run={r.run} />
                  </div>
                ) : null}
              </div>
            ) : null}
            {r.s === "other" ? (
              <label style={{ display: "block", ...cap, marginTop: 12 }}>{tx("やった内容（自由記述）", "What you did (free text)")}
                <textarea value={other} onChange={(e) => setOther(e.target.value)} onBlur={() => onPut({ other: other.trim() || undefined })} rows={3} autoFocus
                          aria-label={tx("例：ゴルフ18ホール／ストレッチ30分／上半身だけ実施", "e.g. 18 holes of golf / 30 min of stretching / upper body only")} placeholder={tx("例：ゴルフ18ホール／ストレッチ30分／上半身だけ実施", "e.g. 18 holes of golf / 30 min of stretching / upper body only")}
                          style={{ ...field, width: "100%", marginTop: 4, resize: "vertical", lineHeight: 1.6 }} />
              </label>
            ) : null}
            {!r.s || r.s === "done" ? <Hints list={hintsFor(days, k, hintSet)} /> : null}
          </div>
        )}
        {!isFuture ? (() => {
          const ms = r.meals || [];
          const t = dayTotals(ms);
          return (
            <div style={{ marginTop: 14, padding: "10px 12px", background: TC.panel, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12.5, color: TC.ink }}>
                {tx("食事：", "Meals: ")}{ms.length ? tx(`${ms.length}件${t.kcal ? `・${t.kcal.toLocaleString()}kcal` : ""}${t.p ? `・タンパク質${Math.round(t.p)}g` : ""}`, `${ms.length} logged${t.kcal ? ` · ${t.kcal.toLocaleString()} kcal` : ""}${t.p ? ` · protein ${Math.round(t.p)} g` : ""}`) : tx("まだ記録がありません", "none logged yet")}
              </span>
              <button onClick={() => onOpenMeals(k)} style={{ ...btn(false), ...small }}>{ms.length ? tx("食事を見る", "View meals") : tx("食事を記録する", "Log a meal")}</button>
            </div>
          );
        })() : null}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 14, alignItems: "flex-end" }}>
          {!isFuture ? (
            <>
              <label style={cap}>{tx("体重（kg）", "Weight (kg)")}<br />
                <input inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} onBlur={() => onPut({ kg: num1(kg) })} style={{ ...field, width: 90 }} aria-label="87.6" placeholder="87.6" />
              </label>
              <label style={cap}>{tx("体脂肪率（％）", "Body fat (%)")}<br />
                <input inputMode="decimal" value={bf} onChange={(e) => setBf(e.target.value)} onBlur={() => onPut({ bf: num1(bf) })} style={{ ...field, width: 90 }} aria-label="25.8" placeholder="25.8" />
              </label>
            </>
          ) : null}
          <label style={{ ...cap, flex: 1, minWidth: 180 }}>{tx("メモ（体調・使った重量など）", "Notes (how you felt, weights used, etc.)")}<br />
            <input value={memo} onChange={(e) => setMemo(e.target.value)} onBlur={() => onPut({ memo: memo.trim() || undefined })}
                   style={{ ...field, width: "100%" }} aria-label={tx("例：脚に疲れが残りランは見送り", "e.g. Legs still tired, skipped the run")} placeholder={tx("例：脚に疲れが残りランは見送り", "e.g. Legs still tired, skipped the run")} />
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: TC.faint }}>{tx("入力内容は自動で保存されます（文字・数値は入力欄から離れたとき）", "Changes save automatically (text and numbers when you leave the field)")}</span>
          {rec ? <button onClick={() => {
                           const ms = r.meals || [];
                           if (!window.confirm(tx(`${label(k)}の記録を削除しますか？${ms.length ? "食事の記録と写真も削除されます。" : ""}`, `Delete the log for ${label(k)}?${ms.length ? " Its meals and photos will be deleted too." : ""}`))) return;
                           photoDel(ms.flatMap((m) => m.photos || []));
                           onPut(null);
                         }}
                         style={{ ...btn(false), ...small, color: TC.skip }}>{tx("この日の記録を削除", "Delete this day's log")}</button> : null}
        </div>
      </div>
    );
  }

  // ---- 体重グラフ（毎朝の値と7日平均） ----
  const avg7 = (days, k, f) => {
    const xs = [];
    for (let i = 0; i < 7; i++) { const r = days[addDays(k, -i)]; if (r && r[f || "kg"] != null) xs.push(r[f || "kg"]); }
    return xs.length >= 3 ? { v: xs.reduce((a, b) => a + b, 0) / xs.length, n: xs.length } : null;
  };

  function WeightChart({ days, todayK, span }) {
    const [hover, setHover] = useState(null);
    const W = 640, H = 230, L = 40, R = 64, T = 14, B = 26;
    const keys = [];
    for (let i = span - 1; i >= 0; i--) keys.push(addDays(todayK, -i));
    const pts = keys.map((k, i) => ({ k, i, kg: days[k] && days[k].kg != null ? days[k].kg : null, a: avg7(days, k) }));
    const vals = pts.flatMap((p) => [p.kg, p.a ? p.a.v : null]).filter((v) => v != null);
    if (!vals.length) {
      return <div style={{ fontSize: 13, color: TC.sub, padding: "28px 0", textAlign: "center" }}>{tx("体重を記録すると、ここに推移と7日平均が表示されます。", "Log your weight to see the trend and 7-day average here.")}</div>;
    }
    let lo = Math.floor(Math.min(...vals) - 0.5), hi = Math.ceil(Math.max(...vals) + 0.5);
    if (hi - lo < 3) lo = hi - 3;
    const goalIn = GOAL.kg >= lo && GOAL.kg <= hi;
    const step = hi - lo > 10 ? 2 : 1;
    const x = (i) => L + (i * (W - L - R)) / Math.max(1, span - 1);
    const y = (v) => T + ((hi - v) * (H - T - B)) / (hi - lo);
    // 7日平均が途切れる区間は線をつながない
    const segs = [];
    let cur = [];
    pts.forEach((p) => { if (p.a) cur.push(`${x(p.i).toFixed(1)},${y(p.a.v).toFixed(1)}`); else if (cur.length) { segs.push(cur); cur = []; } });
    if (cur.length) segs.push(cur);
    const ticks = [];
    for (let v = lo; v <= hi; v += step) ticks.push(v);
    const xt = [0, Math.round((span - 1) / 3), Math.round((2 * (span - 1)) / 3), span - 1];
    const lastA = [...pts].reverse().find((p) => p.a);
    const onMove = (e) => {
      const box = e.currentTarget.getBoundingClientRect();
      const px = ((e.clientX - box.left) / box.width) * W;
      setHover(Math.max(0, Math.min(span - 1, Math.round(((px - L) * (span - 1)) / (W - L - R)))));
    };
    const hp = hover != null ? pts[hover] : null;
    return (
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", gap: 14, fontSize: 12, color: TC.sub, marginBottom: 6, flexWrap: "wrap" }}>
          <span><svg width="12" height="12" style={{ verticalAlign: "-1px" }}><circle cx="6" cy="6" r="4" fill={TC.dot} /></svg> {tx("毎朝の体重", "Morning weight")}</span>
          <span><svg width="18" height="12" style={{ verticalAlign: "-1px" }}><line x1="1" y1="6" x2="17" y2="6" stroke={TC.accent} strokeWidth="2" strokeLinecap="round" /></svg> {tx("7日平均", "7-day average")}</span>
          {goalIn
            ? <span><svg width="18" height="12" style={{ verticalAlign: "-1px" }}><line x1="1" y1="6" x2="17" y2="6" stroke={TC.sub} strokeWidth="1" /></svg> {tx(`目標 ${GOAL.kg}kg`, `Goal ${GOAL.kg} kg`)}</span>
            : <span>{tx(`目標の${GOAL.kg}kgは表示範囲の下（変化が見やすいよう、記録の範囲に合わせています）`, `The ${GOAL.kg} kg goal is below the chart (the scale fits your entries so changes are easier to see)`)}</span>}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", touchAction: "pan-y" }}
             onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img" aria-label={tx(`直近${span}日の体重と7日平均`, `Weight and 7-day average over the last ${span} days`)}>
          {ticks.map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={TC.line} strokeWidth="1" />
              <text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize="11" fill={TC.sub}>{v}</text>
            </g>
          ))}
          {xt.map((i) => <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill={TC.sub}>{short(keys[i])}</text>)}
          {goalIn ? <line x1={L} x2={W - R} y1={y(GOAL.kg)} y2={y(GOAL.kg)} stroke={TC.sub} strokeWidth="1" /> : null}
          {goalIn ? <text x={W - R + 6} y={y(GOAL.kg) + 4} fontSize="11" fill={TC.sub}>{tx("目標", "Goal ")}{GOAL.kg}</text> : null}
          {segs.map((s, i) => <polyline key={i} points={s.join(" ")} fill="none" stroke={TC.accent} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />)}
          {pts.filter((p) => p.kg != null).map((p) => <circle key={p.k} cx={x(p.i)} cy={y(p.kg)} r="4" fill={TC.dot} stroke={TC.bg} strokeWidth="2" />)}
          {lastA ? <text x={x(lastA.i) + 8} y={y(lastA.a.v) + 4} fontSize="11.5" fontWeight="700" fill={TC.ink}>{lastA.a.v.toFixed(1)}</text> : null}
          {hp ? <line x1={x(hp.i)} x2={x(hp.i)} y1={T} y2={H - B} stroke={TC.faint} strokeWidth="1" /> : null}
          {hp && hp.a ? <circle cx={x(hp.i)} cy={y(hp.a.v)} r="4" fill={TC.accent} stroke={TC.bg} strokeWidth="2" /> : null}
        </svg>
        {hp ? (
          <div style={{ position: "absolute", top: 26, left: `${Math.min(70, Math.max(2, (x(hp.i) / W) * 100 - 12))}%`, pointerEvents: "none",
                        background: TC.bg, border: `1px solid ${TC.line}`, borderRadius: 8, padding: "6px 9px", fontSize: 12, color: TC.ink,
                        boxShadow: "0 4px 14px rgba(14,30,56,.12)", whiteSpace: "nowrap" }}>
            <div style={{ fontWeight: 700 }}>{label(hp.k)}</div>
            <div>{tx("体重：", "Weight: ")}{hp.kg != null ? tx(`${hp.kg.toFixed(1)}kg`, `${hp.kg.toFixed(1)} kg`) : tx("記録なし", "no entry")}</div>
            <div>{tx("7日平均：", "7-day avg: ")}{hp.a ? tx(`${hp.a.v.toFixed(1)}kg（${hp.a.n}日分）`, `${hp.a.v.toFixed(1)} kg (${pl(hp.a.n, "day")})`) : "—"}</div>
          </div>
        ) : null}
      </div>
    );
  }

  function WeightTab({ days, todayK, onPut }) {
    const [span, setSpan] = useState(30);
    const today = days[todayK] || {};
    const [kg, setKg] = useState(today.kg != null ? String(today.kg) : "");
    const [bf, setBf] = useState(today.bf != null ? String(today.bf) : "");
    const a = avg7(days, todayK);
    const aPrev = avg7(days, addDays(todayK, -7));
    const b = avg7(days, todayK, "bf");
    const entries = Object.keys(days).filter((k) => days[k].kg != null || days[k].bf != null).sort();
    const first = entries[0];
    const elapsed = first ? diffDays(todayK, first) + 1 : 0;
    const tile = { flex: "1 1 150px", background: TC.panel, borderRadius: 12, padding: "12px 14px" };
    return (
      <div>
        <div style={card}>
          <div style={h2}>{tx("今朝の計測", "This morning's weigh-in")} <span style={{ fontWeight: 600, color: TC.sub, fontSize: 13 }}>{label(todayK)}</span></div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
            <label style={cap}>{tx("体重（kg）", "Weight (kg)")}<br />
              <input inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} style={{ ...field, width: 100, fontSize: 15 }} aria-label="87.6" placeholder="87.6" /></label>
            <label style={cap}>{tx("体脂肪率（％）", "Body fat (%)")}<br />
              <input inputMode="decimal" value={bf} onChange={(e) => setBf(e.target.value)} style={{ ...field, width: 100, fontSize: 15 }} aria-label="25.8" placeholder="25.8" /></label>
            <button onClick={() => onPut(todayK, { kg: num1(kg), bf: num1(bf) })} style={{ ...btn(true), marginBottom: 6 }}>{tx("記録する", "Log")}</button>
          </div>
          <div style={{ fontSize: 11.5, color: TC.faint, marginTop: 4 }}>{tx("毎朝、同じ条件で測ります。過去の日の値は、記録タブのカレンダーから直せます。", "Weigh in every morning under the same conditions. Fix past days from the calendar on the Log tab.")}</div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={tile}>
            <div style={{ fontSize: 12, color: TC.sub }}>{tx("7日平均", "7-day average")}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: TC.ink }}>{a ? `${a.v.toFixed(1)}kg` : "—"}</div>
            <div style={{ fontSize: 11.5, color: TC.sub }}>{a ? tx(`直近7日のうち${a.n}日分の平均`, `Average of ${a.n} of the last 7 days`) : tx("直近7日に3回以上測ると表示されます", "Shown after 3+ weigh-ins in the last 7 days")}</div>
          </div>
          <div style={tile}>
            <div style={{ fontSize: 12, color: TC.sub }}>{tx("先週比（7日平均）", "vs last week (7-day avg)")}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: TC.ink }}>{a && aPrev ? `${a.v - aPrev.v > 0 ? "+" : ""}${(a.v - aPrev.v).toFixed(1)}kg` : "—"}</div>
            <div style={{ fontSize: 11.5, color: TC.sub }}>{a && aPrev ? `${aPrev.v.toFixed(1)}kg → ${a.v.toFixed(1)}kg` : tx("2週間分そろうと表示されます", "Shown once you have 2 weeks of data")}</div>
          </div>
          <div style={tile}>
            <div style={{ fontSize: 12, color: TC.sub }}>{tx(`目標（${GOAL.kg}kg・${GOAL.bf}％）まで`, `To goal (${GOAL.kg} kg · ${GOAL.bf}%)`)}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: TC.ink }}>{a ? tx(`あと${Math.max(0, a.v - GOAL.kg).toFixed(1)}kg`, `${Math.max(0, a.v - GOAL.kg).toFixed(1)} kg to go`) : "—"}</div>
            <div style={{ fontSize: 11.5, color: TC.sub }}>{b ? tx(`体脂肪率（7日平均）${b.v.toFixed(1)}％`, `Body fat (7-day avg) ${b.v.toFixed(1)}%`) : tx(`スタート：${GOAL.fromKg}kg・${GOAL.fromBf}％`, `Start: ${GOAL.fromKg} kg · ${GOAL.fromBf}%`)}</div>
          </div>
        </div>

        {first ? (
          <div style={{ ...card, background: elapsed >= 14 ? TC.warnBg : TC.panel, borderColor: elapsed >= 14 ? TC.dinner : TC.line }}>
            <div style={{ fontSize: 13, color: TC.ink, lineHeight: 1.7 }}>
              {elapsed >= 14
                ? tx(`計測を始めて${elapsed}日目です。プランの「まず2週間続け、体重・疲労・筋力を見て調整」にあたる時期です。摂取カロリー（2,300〜2,400kcal／日）と負荷を見直しましょう。重量・回数は「Set調整」で変えられます。`, `Day ${elapsed} of weigh-ins. Your plan says to keep going for 2 weeks and then adjust based on weight, fatigue and strength, so it's time to review your calories (2,300–2,400 kcal/day) and training load. Change weights and reps in "Adjust Sets".`)
                : tx(`計測を始めて${elapsed}日目です。2週間（あと${14 - elapsed}日）続けたら、体重・疲労・筋力を見て調整します。`, `Day ${elapsed} of weigh-ins. After 2 weeks (${pl(14 - elapsed, "more day")}), adjust based on weight, fatigue and strength.`)}
            </div>
          </div>
        ) : null}

        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ ...h2, margin: 0 }}>{tx("体重の推移", "Weight trend")}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[30, 60, 90].map((n) => <button key={n} onClick={() => setSpan(n)} style={{ ...btn(span === n), ...small }}>{tx(`${n}日`, `${n} days`)}</button>)}
            </div>
          </div>
          <WeightChart days={days} todayK={todayK} span={span} />
          <div style={{ fontSize: 11.5, color: TC.faint, marginTop: 6 }}>{tx("7日平均は、直近7日に3回以上の記録がある日だけ表示します。", "The 7-day average is shown only on days with 3+ entries in the last 7 days.")}</div>
        </div>

        {entries.length ? (
          <div style={card}>
            <div style={h2}>{tx("計測の記録（新しい順・最大30件）", "Weigh-in log (newest first, up to 30)")}</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", fontSize: 12.5, color: TC.ink, minWidth: 360, width: "100%" }}>
                <thead>
                  <tr style={{ color: TC.sub, textAlign: "right" }}>
                    <th style={{ textAlign: "left", padding: "4px 6px", fontWeight: 600 }}>{tx("日付", "Date")}</th>
                    <th style={{ padding: "4px 6px", fontWeight: 600 }}>{tx("体重", "Weight")}</th>
                    <th style={{ padding: "4px 6px", fontWeight: 600 }}>{tx("7日平均", "7-day avg")}</th>
                    <th style={{ padding: "4px 6px", fontWeight: 600 }}>{tx("体脂肪率", "Body fat")}</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.slice(-30).reverse().map((k) => {
                    const r = days[k], av = avg7(days, k);
                    return (
                      <tr key={k} style={{ borderTop: `1px solid ${TC.line}`, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                        <td style={{ textAlign: "left", padding: "5px 6px" }}>{label(k)}</td>
                        <td style={{ padding: "5px 6px" }}>{r.kg != null ? r.kg.toFixed(1) : "—"}</td>
                        <td style={{ padding: "5px 6px" }}>{av ? av.v.toFixed(1) : "—"}</td>
                        <td style={{ padding: "5px 6px" }}>{r.bf != null ? tx(`${r.bf.toFixed(1)}％`, `${r.bf.toFixed(1)}%`) : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // ---- 食事の写真（IndexedDB） ----
  // localStorage は数MBしかなく写真を入れるとすぐ溢れるので、写真だけはブラウザ内のデータベースに入れる。
  // 食事の内容・数値は他の記録と同じ training_log_v1 に入り、進捗バックアップにも含まれる（写真は含まれない）。
  const PHOTO_DB = "nova_training_photos";
  let photoDbP = null;
  const photoDb = () => photoDbP || (photoDbP = new Promise((res, rej) => {
    try {
      const r = window.indexedDB.open(PHOTO_DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore("photos");
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    } catch (e) { rej(e); }
  }));
  const photoTx = (mode, fn) => photoDb().then((d) => new Promise((res, rej) => {
    const t = d.transaction("photos", mode);
    const req = fn(t.objectStore("photos"));
    t.oncomplete = () => res(req ? req.result : undefined);
    t.onerror = () => rej(t.error);
    t.onabort = () => rej(t.error);
  }));
  const memPhotos = {}; // データベースが使えない環境では、この画面を開いている間だけ保持する
  let photoPersist = true;
  const photoPut = async (id, blob) => {
    try { await photoTx("readwrite", (s) => s.put(blob, id)); } catch (e) { memPhotos[id] = blob; photoPersist = false; }
  };
  const photoGet = async (id) => {
    if (memPhotos[id]) return memPhotos[id];
    try { return (await photoTx("readonly", (s) => s.get(id))) || null; } catch (e) { return null; }
  };
  const photoDel = async (ids) => {
    const list = (ids || []).filter(Boolean);
    if (!list.length) return;
    list.forEach((id) => { delete memPhotos[id]; });
    try { await photoTx("readwrite", (s) => { list.forEach((id) => s.delete(id)); return null; }); } catch (e) { /* 消せなくても記録側の参照は外れる */ }
  };
  const newId = (p) => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  // 長辺1280pxのJPEGに縮めて保存する（スマホの原寸写真は1枚で数MBある）
  const shrinkPhoto = (file) => new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const M = 1280;
      const sc = Math.min(1, M / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
      const w = Math.max(1, Math.round(img.naturalWidth * sc)), h = Math.max(1, Math.round(img.naturalHeight * sc));
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      c.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      c.toBlob((b) => (b ? res(b) : rej(new Error("encode"))), "image/jpeg", 0.8);
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("decode")); };
    img.src = url;
  });

  function PhotoThumb({ id, size, onOpen, onRemove }) {
    const [url, setUrl] = useState(null);
    const [missing, setMissing] = useState(false);
    useEffect(() => {
      let u = null, live = true;
      photoGet(id).then((b) => { if (!live) return; if (b) { u = URL.createObjectURL(b); setUrl(u); } else setMissing(true); });
      return () => { live = false; if (u) URL.revokeObjectURL(u); };
    }, [id]);
    const S = size || 72;
    return (
      <span style={{ position: "relative", display: "inline-block", width: S, height: S }}>
        <button onClick={() => url && onOpen && onOpen(url)} aria-label={tx("写真を大きく表示", "View photo larger")}
                style={{ width: S, height: S, padding: 0, border: `1px solid ${TC.line}`, borderRadius: 8, overflow: "hidden", cursor: url ? "zoom-in" : "default", background: TC.panel }}>
          {url ? <img src={url} alt={tx("食事の写真", "Meal photo")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
               : <span style={{ fontSize: 10, color: TC.faint }}>{missing ? tx("写真なし", "No photo") : "…"}</span>}
        </button>
        {onRemove ? (
          <button onClick={onRemove} aria-label={tx("この写真を外す", "Remove this photo")}
                  style={{ position: "absolute", top: -6, right: -6, width: 22, height: 22, borderRadius: 11, border: `1px solid ${TC.line}`,
                           background: TC.bg, color: TC.skip, fontSize: 13, lineHeight: "18px", cursor: "pointer", padding: 0 }}>×</button>
        ) : null}
      </span>
    );
  }

  function PhotoViewer({ url, onClose }) {
    if (!url) return null;
    return (
      <div onClick={onClose} role="dialog" aria-label={tx("写真", "Photo")}
           style={{ position: "fixed", inset: 0, zIndex: 10050, background: "rgba(8,14,26,.86)", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", padding: 16, gap: 12 }}>
        <img src={url} alt={tx("食事の写真", "Meal photo")} onClick={(e) => e.stopPropagation()}
             style={{ maxWidth: "100%", maxHeight: "calc(100vh - 110px)", borderRadius: 10, objectFit: "contain" }} />
        <div style={{ display: "flex", gap: 8 }} onClick={(e) => e.stopPropagation()}>
          <a href={url} download="meal.jpg" style={{ ...btn(false), textDecoration: "none" }}>{tx("端末に保存", "Save to device")}</a>
          <button onClick={onClose} style={btn(true)}>{tx("閉じる", "Close")}</button>
        </div>
      </div>
    );
  }

  // ---- 食事 ----
  const MEAL_KINDS = ["朝食", "昼食", "夕食", "間食", "プロテイン"];
  // 区分の値（記録に入る値）は日本語のまま。表示だけ英語にする
  const MEAL_EN = { "朝食": "Breakfast", "昼食": "Lunch", "夕食": "Dinner", "間食": "Snack", "プロテイン": "Protein" };
  const mealName = (k) => tx(k, MEAL_EN[k] || k);
  const NUT = { kcal: [2300, 2400], p: [160, 180], f: [60, 70] };
  // 炭水化物は「残りのカロリーで調整」。カロリーとP・Fの目安から幅を出す
  NUT.c = [Math.round((NUT.kcal[0] - NUT.p[1] * 4 - NUT.f[1] * 9) / 4), Math.round((NUT.kcal[1] - NUT.p[0] * 4 - NUT.f[0] * 9) / 4)];
  const hasNum = (v) => typeof v === "number" && Number.isFinite(v);
  // カロリーが空でもP・F・Cが入っていれば、そこから計算する（P・C 4kcal/g、F 9kcal/g）
  const mealKcal = (m) => (hasNum(m.kcal) ? m.kcal
    : (hasNum(m.p) || hasNum(m.f) || hasNum(m.c)) ? Math.round((m.p || 0) * 4 + (m.f || 0) * 9 + (m.c || 0) * 4) : null);
  const kindByClock = () => { const h = new Date().getHours(); return h < 10 ? "朝食" : h < 15 ? "昼食" : h < 17 ? "間食" : "夕食"; };
  const nowHM = () => { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const dayTotals = (meals) => {
    // n は各項目を入力した食事の数（0件なら「0g」ではなく「未入力」と出す）
    const t = { kcal: 0, p: 0, f: 0, c: 0, blank: 0, n: { kcal: 0, p: 0, f: 0, c: 0 } };
    (meals || []).forEach((m) => {
      const k = mealKcal(m);
      if (k == null) t.blank++; else { t.kcal += k; t.n.kcal++; }
      ["p", "f", "c"].forEach((f) => { if (hasNum(m[f])) { t[f] += m[f]; t.n[f]++; } });
    });
    return t;
  };

  function MealForm({ meal, isToday, onSave, onCancel }) {
    const m = meal || {};
    const [kind, setKind] = useState(m.kind || (isToday ? kindByClock() : "夕食"));
    const [time, setTime] = useState(m.time || (isToday ? nowHM() : ""));
    const [text, setText] = useState(m.text || "");
    const [nums, setNums] = useState({ kcal: m.kcal, p: m.p, f: m.f, c: m.c });
    const [raw, setRaw] = useState({ kcal: m.kcal ?? "", p: m.p ?? "", f: m.f ?? "", c: m.c ?? "" });
    const [photos, setPhotos] = useState(m.photos || []);
    const [added, setAdded] = useState([]);
    const [removed, setRemoved] = useState([]);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");
    const [view, setView] = useState(null);
    const fileRef = useRef(null);
    const addFiles = async (files) => {
      setErr(""); setBusy(true);
      const ok = [], bad = [];
      for (const f of Array.from(files || [])) {
        try { const b = await shrinkPhoto(f); const id = newId("p"); await photoPut(id, b); ok.push(id); } catch (e) { bad.push(f.name || tx("写真", "photo")); }
      }
      setPhotos((xs) => [...xs, ...ok]); setAdded((xs) => [...xs, ...ok]); setBusy(false);
      if (bad.length) setErr(tx(`読み込めない写真がありました（${bad.join("、")}）。HEIC形式などはJPEGに変換してから追加してください。`, `Some photos couldn't be read (${bad.join(", ")}). Convert HEIC and similar formats to JPEG first.`));
      if (!photoPersist) setErr((e) => `${e ? e + " " : ""}${tx("この環境では写真を保存できないため、画面を閉じると写真は消えます。", "Photos can't be stored here, so they'll be lost when you close this screen.")}`);
      if (fileRef.current) fileRef.current.value = "";
    };
    const removePhoto = (id) => {
      setPhotos((xs) => xs.filter((x) => x !== id));
      if (added.includes(id)) { setAdded((xs) => xs.filter((x) => x !== id)); photoDel([id]); }
      else setRemoved((xs) => [...xs, id]);
    };
    const setNum = (f, v) => { setRaw((r) => ({ ...r, [f]: v })); setNums((n) => ({ ...n, [f]: num1(v) })); };
    const pfcKcal = (hasNum(nums.p) || hasNum(nums.f) || hasNum(nums.c)) ? Math.round((nums.p || 0) * 4 + (nums.f || 0) * 9 + (nums.c || 0) * 4) : null;
    const empty = !text.trim() && !photos.length && ![nums.kcal, nums.p, nums.f, nums.c].some(hasNum);
    const save = () => {
      if (empty) return;
      photoDel(removed);
      onSave({ id: m.id || newId("m"), kind, time: time || undefined, text: text.trim() || undefined,
               kcal: nums.kcal, p: nums.p, f: nums.f, c: nums.c, photos: photos.length ? photos : undefined });
    };
    const cancel = () => { photoDel(added); onCancel(); };
    const numBox = (f, labelText, unit) => (
      <label style={{ ...cap, marginBottom: 0 }}>{labelText}<br />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <input inputMode="decimal" value={raw[f]} onChange={(e) => setNum(f, e.target.value)} style={{ ...field, width: 74 }} />
          <span style={{ fontSize: 12, color: TC.sub }}>{unit}</span>
        </span>
      </label>
    );
    return (
      <div style={{ ...card, borderColor: TC.accent }}>
        <div style={h2}>{meal ? tx("食事を編集", "Edit meal") : tx("食事を追加", "Add meal")}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {MEAL_KINDS.map((k) => <button key={k} onClick={() => setKind(k)} aria-pressed={kind === k} style={{ ...btn(kind === k), ...small }}>{mealName(k)}</button>)}
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} aria-label={tx("時刻", "Time")} style={{ ...field, width: 112, padding: "4px 8px", fontSize: 13 }} />
        </div>
        <label style={{ display: "block", ...cap }}>{tx("食べたもの", "What you ate")}
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2}
                    aria-label={tx("例：鶏むね肉200g、玄米150g、サラダ、味噌汁", "e.g. 200 g chicken breast, 150 g brown rice, salad, miso soup")} placeholder={tx("例：鶏むね肉200g、玄米150g、サラダ、味噌汁", "e.g. 200 g chicken breast, 150 g brown rice, salad, miso soup")}
                    style={{ ...field, width: "100%", marginTop: 4, resize: "vertical", lineHeight: 1.6 }} />
        </label>
        <div style={{ ...cap, marginTop: 8 }}>{tx("栄養（分かる分だけで構いません）", "Nutrition (fill in what you know)")}</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          {numBox("kcal", tx("エネルギー", "Energy"), "kcal")}
          {numBox("p", tx("タンパク質", "Protein"), "g")}
          {numBox("f", tx("脂質", "Fat"), "g")}
          {numBox("c", tx("炭水化物", "Carbs"), "g")}
        </div>
        {!hasNum(nums.kcal) && pfcKcal != null ? (
          <div style={{ fontSize: 11.5, color: TC.sub, marginTop: 6 }}>{tx(`エネルギーが空欄のため、P・F・Cから約${pfcKcal.toLocaleString()}kcalとして合計します。`, `Energy is blank, so about ${pfcKcal.toLocaleString()} kcal from protein, fat and carbs is used in the total.`)}</div>
        ) : null}
        <div style={{ ...cap, marginTop: 12 }}>{tx("写真", "Photos")}</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {photos.map((id) => <PhotoThumb key={id} id={id} onOpen={setView} onRemove={() => removePhoto(id)} />)}
          <label style={{ ...btn(false), position: "relative", display: "inline-flex", alignItems: "center", gap: 6, opacity: busy ? 0.6 : 1 }}>
            {busy ? tx("写真を処理中…", "Processing photos…") : tx("＋ 写真を追加", "+ Add photos")}
            <input ref={fileRef} type="file" accept="image/*" multiple disabled={busy} onChange={(e) => addFiles(e.target.files)}
                   style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden" }} />
          </label>
        </div>
        {err ? <div style={{ fontSize: 12, color: TC.skip, marginTop: 6, lineHeight: 1.6 }}>{err}</div> : null}
        <div style={{ fontSize: 11, color: TC.faint, marginTop: 6 }}>{tx("写真は縮小してこの端末のブラウザ内に保存します（進捗バックアップには含まれません）。", "Photos are resized and stored in this device's browser (not included in the progress backup).")}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <button onClick={save} disabled={empty || busy} style={{ ...btn(true), opacity: empty || busy ? 0.5 : 1 }}>{tx("保存する", "Save")}</button>
          <button onClick={cancel} style={btn(false)}>{tx("キャンセル", "Cancel")}</button>
        </div>
        <PhotoViewer url={view} onClose={() => setView(null)} />
      </div>
    );
  }

  function NutBar({ name, unit, value, range, note, none }) {
    const [lo, hi] = range;
    if (none) {
      return (
        <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", fontSize: 12.5 }}>
          <span style={{ color: TC.ink }}><b>{name}</b> <span style={{ color: TC.faint }}>{tx("未入力", "not entered")}</span></span>
          <span style={{ color: TC.sub }}>{tx("目安 ", "Target ")}{lo.toLocaleString()}{tx("〜", "–")}{hi.toLocaleString()}{tx("", " ")}{unit}</span>
        </div>
      );
    }
    const max = hi * 1.25;
    const state = UI_EN
      ? (value < lo ? `${(lo - value).toLocaleString()}–${(hi - value).toLocaleString()} ${unit} to go` : value > hi ? `${(value - hi).toLocaleString()} ${unit} over target` : "Within target")
      : (value < lo ? `あと${(lo - value).toLocaleString()}〜${(hi - value).toLocaleString()}${unit}` : value > hi ? `目安を${(value - hi).toLocaleString()}${unit}上回る` : "目安の範囲内");
    return (
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap", fontSize: 12.5 }}>
          <span style={{ color: TC.ink }}><b>{name}</b> {Math.round(value).toLocaleString()}{unit}</span>
          <span style={{ color: TC.sub }}>{tx("目安 ", "Target ")}{lo.toLocaleString()}{tx("〜", "–")}{hi.toLocaleString()}{tx("", " ")}{unit}{tx("・", " · ")}{state}</span>
        </div>
        <div style={{ position: "relative", height: 8, background: TC.line, borderRadius: 4, marginTop: 4, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: `${(lo / max) * 100}%`, width: `${((hi - lo) / max) * 100}%`, top: 0, bottom: 0, background: "#C9E7E1" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${Math.min(100, (value / max) * 100)}%`, background: TC.accent, borderRadius: 4 }} />
        </div>
        {note ? <div style={{ fontSize: 11, color: TC.faint, marginTop: 2 }}>{note}</div> : null}
      </div>
    );
  }

  function MealTab({ days, todayK, putDay, initialDate }) {
    const [dk, setDk] = useState(initialDate && initialDate <= todayK ? initialDate : todayK);
    const [editing, setEditing] = useState(null); // null | "new" | 食事のid
    const [view, setView] = useState(null);
    const rec = days[dk] || {};
    const meals = rec.meals || [];
    const t = dayTotals(meals);
    const anyNum = meals.some((m) => mealKcal(m) != null || hasNum(m.p) || hasNum(m.f) || hasNum(m.c));
    const go = (n) => { const k = addDays(dk, n); if (k <= todayK) { setDk(k); setEditing(null); } };
    const sorted = [...meals].sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
    const saveMeal = (m) => {
      const list = meals.some((x) => x.id === m.id) ? meals.map((x) => (x.id === m.id ? m : x)) : [...meals, m];
      putDay(dk, { meals: list });
      setEditing(null);
    };
    const delMeal = (m) => {
      if (!window.confirm(tx(`${m.kind}${m.time ? `（${m.time}）` : ""}の記録を削除しますか？写真も削除されます。`, `Delete ${mealName(m.kind)}${m.time ? ` (${m.time})` : ""}? Its photos will be deleted too.`))) return;
      photoDel(m.photos);
      const list = meals.filter((x) => x.id !== m.id);
      putDay(dk, { meals: list.length ? list : undefined });
    };
    return (
      <div>
        <div style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "10px 14px" }}>
          <button onClick={() => go(-1)} style={{ ...btn(false), padding: "5px 12px" }} aria-label={tx("前の日", "Previous day")}>‹</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: TC.ink }}>{dk === todayK ? tx("今日", "Today") : dk === addDays(todayK, -1) ? tx("昨日", "Yesterday") : ""} {label(dk)}</div>
            {rec.s ? <div style={{ fontSize: 11.5, color: TC.sub }}>{tx("この日のトレーニング：", "Training this day: ")}{statusText(rec)}</div> : null}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {dk !== todayK ? <button onClick={() => { setDk(todayK); setEditing(null); }} style={{ ...btn(false), ...small }}>{tx("今日", "Today")}</button> : null}
            <button onClick={() => go(1)} disabled={dk >= todayK} style={{ ...btn(false), padding: "5px 12px", opacity: dk >= todayK ? 0.35 : 1 }} aria-label={tx("次の日", "Next day")}>›</button>
          </div>
        </div>

        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <div style={{ ...h2, margin: 0 }}>{tx("この日の合計", "Day total")}</div>
            <span style={{ fontSize: 12, color: TC.sub }}>{tx(`${meals.length}件の食事`, pl(meals.length, "meal"))}</span>
          </div>
          {anyNum ? (
            <>
              <NutBar name={tx("エネルギー", "Energy")} unit="kcal" value={t.kcal} range={NUT.kcal} none={!t.n.kcal} />
              <NutBar name={tx("タンパク質", "Protein")} unit="g" value={t.p} range={NUT.p} none={!t.n.p} note={tx("朝のプロテインも含めて数えます", "Includes the morning protein shake")} />
              <NutBar name={tx("脂質", "Fat")} unit="g" value={t.f} range={NUT.f} none={!t.n.f} />
              <NutBar name={tx("炭水化物", "Carbs")} unit="g" value={t.c} range={NUT.c} none={!t.n.c} note={tx("炭水化物は残りのカロリーで調整（目安はカロリー・P・Fの目安から計算）", "Carbs fill the remaining calories (target derived from the calorie, protein and fat targets)")} />
              {t.blank ? <div style={{ fontSize: 11.5, color: TC.sub }}>{tx(`数値が入っていない食事が${t.blank}件あります（エネルギーの合計には含まれていません）。`, `${t.blank === 1 ? "1 meal has" : `${t.blank} meals have`} no numbers (not included in the energy total).`)}</div> : null}
            </>
          ) : (
            <div style={{ fontSize: 12.5, color: TC.sub, lineHeight: 1.7 }}>
              {tx(`食事にカロリーやP・F・Cを入れると、プランの目安（${NUT.kcal[0].toLocaleString()}〜${NUT.kcal[1].toLocaleString()}kcal、タンパク質${NUT.p[0]}〜${NUT.p[1]}g、脂質${NUT.f[0]}〜${NUT.f[1]}g）と比べた合計が出ます。写真や内容だけの記録でも構いません。`, `Add calories or protein, fat and carbs to your meals to compare the total with your plan's targets (${NUT.kcal[0].toLocaleString()}–${NUT.kcal[1].toLocaleString()} kcal, protein ${NUT.p[0]}–${NUT.p[1]} g, fat ${NUT.f[0]}–${NUT.f[1]} g). Logging just photos or a description is fine too.`)}
            </div>
          )}
          {rec.s === "dinner" ? <div style={{ fontSize: 12, color: TC.dinner, marginTop: 8 }}>{tx("会食の日です。分かる範囲で、写真だけでも残しておくと後で振り返れます。", "Dining-out day. Log what you can; even just photos help when you look back.")}</div> : null}
        </div>

        {sorted.map((m) => (editing === m.id ? (
          <MealForm key={m.id} meal={m} isToday={dk === todayK} onSave={saveMeal} onCancel={() => setEditing(null)} />
        ) : (
          <div key={m.id} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: TC.ink }}>{mealName(m.kind)}{m.time ? <span style={{ fontWeight: 600, color: TC.sub, fontSize: 12.5, marginLeft: 6 }}>{m.time}</span> : null}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setEditing(m.id)} style={{ ...btn(false), ...small }}>{tx("編集", "Edit")}</button>
                <button onClick={() => delMeal(m)} style={{ ...btn(false), ...small, color: TC.skip }}>{tx("削除", "Delete")}</button>
              </div>
            </div>
            {m.text ? <div style={{ fontSize: 13, color: TC.ink, lineHeight: 1.7, marginTop: 6, whiteSpace: "pre-wrap" }}>{m.text}</div> : null}
            {mealKcal(m) != null || hasNum(m.p) || hasNum(m.f) || hasNum(m.c) ? (
              <div style={{ fontSize: 12, color: TC.sub, marginTop: 6, fontVariantNumeric: "tabular-nums" }}>
                {[mealKcal(m) != null ? `${mealKcal(m).toLocaleString()}kcal${hasNum(m.kcal) ? "" : tx("（P・F・Cから計算）", " (from P/F/C)")}` : null,
                  hasNum(m.p) ? `P ${m.p}g` : null, hasNum(m.f) ? `F ${m.f}g` : null, hasNum(m.c) ? `C ${m.c}g` : null].filter(Boolean).join(tx("・", " · "))}
              </div>
            ) : null}
            {m.photos && m.photos.length ? (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {m.photos.map((id) => <PhotoThumb key={id} id={id} size={96} onOpen={setView} />)}
              </div>
            ) : null}
          </div>
        )))}

        {editing === "new" ? (
          <MealForm isToday={dk === todayK} onSave={saveMeal} onCancel={() => setEditing(null)} />
        ) : (
          <button onClick={() => setEditing("new")} style={{ ...btn(true), width: "100%", padding: "12px 14px", marginBottom: 14 }}>{tx("＋ 食事を記録する", "+ Log a meal")}</button>
        )}
        <PhotoViewer url={view} onClose={() => setView(null)} />
      </div>
    );
  }

  // ---- プラン（Set調整を反映した内容） ----
  function PlanTab({ adj, goAdjust }) {
    const list = (xs) => (
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.85, color: TC.ink }}>
        {xs.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    );
    const anyAdj = PICK_IDS.some((id) => adj && adj[id]);
    return (
      <div>
        <div style={{ ...card, background: TC.panel }}>
          <div style={{ fontSize: 13, color: TC.ink, lineHeight: 1.7 }}>
            {anyAdj ? tx("Set調整で変えた内容を反映しています（「調整済み」の印がある種目）。", "Includes your changes from Adjust Sets (exercises marked \"Adjusted\").") : tx("いまのプランの全体像です。", "Your current plan at a glance.")}
            {tx("重量や回数を変えるときは", "To change weights or reps:")} <button onClick={goAdjust} style={{ ...btn(false), ...small, marginLeft: 4 }}>{tx("Set調整へ", "Adjust Sets")}</button>
          </div>
        </div>
        <div style={card}>
          <div style={h2}>{tx("月単位での進め方", "How each month runs")}</div>
          {list(tx(FLOW_RULES, FLOW_RULES_EN))}
        </div>
        {SET_IDS.map((id) => (
          <React.Fragment key={id}>
            <div style={card}><SetMenu set={effSet(adj, id)} base={BASE[id]} /></div>
            {CYCLE[CYCLE.indexOf(id) + 1] === "R" ? (
              <div style={{ ...card, background: TC.panel, padding: "10px 16px", fontSize: 13.5, fontWeight: 700, color: TC.rest }}>{tx("休養日", "Rest day")}</div>
            ) : null}
          </React.Fragment>
        ))}
        <div style={card}>
          <SetMenu set={effSet(adj, "A")} base={BASE.A} />
          <div style={{ ...cap, marginTop: 8, marginBottom: 0 }}>{tx("有酸素だけの日に選ぶメニューです。Set1〜5 の巡回には入らず、記録しても次の Set は進みません。", "Pick this on cardio-only days. It's outside the Set1–5 cycle, so logging it doesn't move the next Set forward.")}</div>
        </div>
        <div style={card}>
          <div style={h2}>{tx("負荷・回復の調整", "Load and recovery")}</div>
          {list(tx(LOAD_RULES, LOAD_RULES_EN))}
        </div>
        <div style={card}>
          <div style={h2}>{tx("食事・体重管理", "Food and weight")}</div>
          {list(tx(FOOD_RULES, FOOD_RULES_EN))}
        </div>
      </div>
    );
  }

  // ---- Set調整（各種目の重量・回数・セット数、有酸素の内容を変える） ----
  // 入力中は手元の値だけを変え、入力欄から離れたときに保存する
  function Field({ value, onCommit, width, inputMode, placeholder, suffix, multiline }) {
    const [v, setV] = useState(value == null ? "" : String(value));
    useEffect(() => { setV(value == null ? "" : String(value)); }, [value]);
    return (
      <span style={{ display: multiline ? "flex" : "inline-flex", alignItems: "center", gap: 4 }}>
        {multiline ? (
          // 有酸素の手順は長いので、狭い画面でも全文が見えるよう折り返す
          <textarea value={v} rows={2} onChange={(e) => setV(e.target.value)} onBlur={() => onCommit(v)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.blur(); } }}
                    style={{ ...field, width, resize: "vertical", lineHeight: 1.5, fontSize: 13 }} />
        ) : (
          <input value={v} inputMode={inputMode} aria-label={placeholder} placeholder={placeholder} onChange={(e) => setV(e.target.value)}
                 onBlur={() => onCommit(v)} onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                 style={{ ...field, width }} />
        )}
        {suffix ? <span style={{ fontSize: 12, color: TC.sub }}>{suffix}</span> : null}
      </span>
    );
  }

  function AdjustTab({ adj, putAdj }) {
    const [sid, setSid] = useState("S1");
    const set = effSet(adj, sid);
    const base = BASE[sid];
    const others = (exId) => PICK_IDS.filter((id) => id !== sid && BASE[id].items.some((x) => x.id === exId));
    // 1種目の1項目を変える。元のプランと同じ値に戻したら差分を消す
    const setItem = (setId, exId, patch) => putAdj((a) => {
      const b = baseItem(setId, exId);
      const cur = { ...(((a[setId] || {}).items || {})[exId] || {}), ...patch };
      Object.keys(cur).forEach((f) => { if (cur[f] === b[f]) delete cur[f]; });
      const s = { ...(a[setId] || {}) };
      const items = { ...(s.items || {}) };
      if (Object.keys(cur).length) items[exId] = cur; else delete items[exId];
      if (Object.keys(items).length) s.items = items; else delete s.items;
      if (Object.keys(s).length) a[setId] = s; else delete a[setId];
      return a;
    });
    const setAero = (patch) => putAdj((a) => {
      const cur = { ...((a[sid] || {}).aero || {}), ...patch };
      if (cur.total === base.aero.total) delete cur.total;
      if (cur.steps && cur.steps.join("\n") === base.aero.steps.join("\n")) delete cur.steps;
      const s = { ...(a[sid] || {}) };
      if (Object.keys(cur).length) s.aero = cur; else delete s.aero;
      if (Object.keys(s).length) a[sid] = s; else delete a[sid];
      return a;
    });
    const weight = (v) => { const t = String(v).trim(); if (!t) return null; const x = num1(t); return x === undefined ? undefined : x; };
    const steps = set.aero.steps;
    return (
      <div>
        <div style={{ ...card, background: TC.panel }}>
          <div style={{ fontSize: 13, color: TC.ink, lineHeight: 1.75 }}>
            {tx("各Setの重量・回数・セット数と、有酸素の内容を変更できます。変更は自動で保存され、記録画面とプランにすぐ反映されます。 記録済みの日には、記録した時点のメニューがそのまま残ります。", "Change each Set's weights, reps and sets, and its cardio. Changes save automatically and show up right away on the Log and Plan tabs. Days you've already logged keep the menu as it was when logged.")}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {PICK_IDS.map((id) => (
            <button key={id} onClick={() => setSid(id)} aria-pressed={sid === id} style={btn(sid === id, KIND_COLOR[BASE[id].kind])}>
              {setName(BASE[id])}{adj && adj[id] ? " ●" : ""}
            </button>
          ))}
        </div>
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={chip(KIND_COLOR[set.kind], "#fff")}>{setName(set)}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: TC.ink }}>{setTitle(set)}</span>
          </div>
          {set.items.map((it) => {
            const b = baseItem(sid, it.id);
            const changed = fmtItem(b) !== fmtItem(it);
            const os = others(it.id);
            return (
              <div key={it.id} style={{ borderTop: `1px solid ${TC.line}`, padding: "12px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <b style={{ fontSize: 13.5, color: TC.ink }}>{exName(it.id)}</b>
                  {changed ? <span style={{ fontSize: 11.5, color: TC.sub }}>{tx("元のプラン：", "Original plan: ")}{fmtItem(b)}</span> : null}
                </div>
                {b.plan ? (
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                  <label style={{ fontSize: 12, color: TC.sub }}>{tx("重量×回数", "Weight × reps")}&nbsp;
                    <Field value={it.plan} width="min(100%, 480px)" placeholder={b.plan} onCommit={(v) => setItem(sid, it.id, { plan: String(v).trim() || b.plan })} />
                  </label>
                </div>
                ) : (
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                  <label style={{ fontSize: 12, color: TC.sub }}>{tx("重量", "Weight")}&nbsp;
                    <Field value={it.w} width={72} inputMode="decimal" placeholder={tx("指定なし", "Any")} suffix="kg"
                           onCommit={(v) => { const w = weight(v); if (w !== undefined) setItem(sid, it.id, { w }); }} />
                  </label>
                  <label style={{ fontSize: 12, color: TC.sub }}>{tx("回数", "Reps")}&nbsp;
                    <Field value={it.reps} width={110} placeholder={b.reps} onCommit={(v) => setItem(sid, it.id, { reps: String(v).trim() || b.reps })} />
                  </label>
                  <label style={{ fontSize: 12, color: TC.sub }}>{tx("セット数", "Sets")}&nbsp;
                    <Field value={it.sets} width={52} inputMode="numeric" suffix={tx("セット", "sets")}
                           onCommit={(v) => { const n = parseInt(v, 10); if (n >= 1 && n <= 10) setItem(sid, it.id, { sets: n }); }} />
                  </label>
                </div>
                )}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  {os.length ? (
                    <button onClick={() => os.forEach((id) => setItem(id, it.id, b.plan ? { plan: it.plan } : { w: it.w, reps: it.reps }))} style={{ ...btn(false), ...small }}>
                      {tx(`重量・回数を${os.map((id) => setName(BASE[id])).join("・")}にもそろえる`, `Apply these weights and reps to ${os.map((id) => setName(BASE[id])).join(", ")} too`)}
                    </button>
                  ) : null}
                  {changed ? <button onClick={() => setItem(sid, it.id, b.plan ? { plan: b.plan } : { w: b.w, reps: b.reps, sets: b.sets })} style={{ ...btn(false), ...small }}>{tx("元に戻す", "Reset")}</button> : null}
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: `1px solid ${TC.line}`, padding: "12px 0 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              <b style={{ fontSize: 13.5, color: TC.ink }}>{tx("有酸素", "Cardio")}</b>
              <label style={{ fontSize: 12, color: TC.sub }}>{tx("合計", "Total")}&nbsp;
                <Field value={set.aero.total} width={60} inputMode="numeric" suffix={tx("分", "min")}
                       onCommit={(v) => { const n = parseInt(v, 10); if (n >= 1 && n <= 240) setAero({ total: n }); }} />
              </label>
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {steps.map((st, i) => (
                <div key={`${sid}-${i}-${steps.length}`} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: TC.faint, width: 16, textAlign: "right" }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <Field value={st} width="100%" multiline onCommit={(v) => {
                      const t = String(v).trim();
                      const nx = [...steps];
                      if (t) nx[i] = t; else nx.splice(i, 1);
                      setAero({ steps: nx });
                    }} />
                  </div>
                  <button onClick={() => { const nx = [...steps]; nx.splice(i, 1); setAero({ steps: nx }); }} aria-label={tx(`${i + 1}行目を削除`, `Delete line ${i + 1}`)}
                          style={{ ...btn(false), ...small, color: TC.skip }}>{tx("削除", "Delete")}</button>
                </div>
              ))}
            </div>
            <button onClick={() => setAero({ steps: [...steps, tx("新しい項目", "New step")] })} style={{ ...btn(false), ...small, marginTop: 8 }}>{tx("＋ 行を追加", "+ Add line")}</button>
          </div>
        </div>
        {adj && adj[sid] ? (
          <div style={{ textAlign: "right", marginBottom: 14 }}>
            <button onClick={() => { if (window.confirm(tx(`${setName(set)}の調整をすべて元のプランに戻しますか？`, `Reset all changes to ${setName(set)} back to the original plan?`))) putAdj((a) => { delete a[sid]; return a; }); }}
                    style={{ ...btn(false), ...small, color: TC.skip }}>{tx(`${setName(set)}をすべて元のプランに戻す`, `Reset ${setName(set)} to the original plan`)}</button>
          </div>
        ) : null}
        <div style={card}>
          <div style={{ ...cap, marginBottom: 8 }}>{tx(`いまの${setName(set)}（記録画面に表示される内容）`, `Current ${setName(set)} (as shown on the Log tab)`)}</div>
          <SetMenu set={set} base={base} />
        </div>
      </div>
    );
  }

  // ---- カレンダー ----
  function Calendar({ days, todayK, ym, setYm, sel, setSel, proj }) {
    const [y, m] = ym;
    const lead = new Date(y, m - 1, 1).getDay();
    const n = new Date(y, m, 0).getDate();
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= n; d++) cells.push(`${y}-${pad(m)}-${pad(d)}`);
    while (cells.length % 7) cells.push(null);
    const move = (dm) => { const t = new Date(y, m - 1 + dm, 1); setYm([t.getFullYear(), t.getMonth() + 1]); };
    const badge = (k) => {
      const r = days[k];
      if (r && r.s) {
        if (r.s === "done") { const s = BASE[r.set]; return <span style={chip(s ? KIND_COLOR[s.kind] : TC.ink, "#fff")}>✓{setName(s)}</span>; }
        if (r.s === "skipset") return <span style={chip(TC.skipset, "#fff")}>Skip</span>;
        if (r.s === "other") return <span style={chip(TC.other, "#fff")}>{tx("その他", "Other")}</span>;
        if (r.s === "skip") return <span style={chip(TC.bg, TC.skip, `1.5px solid ${TC.skip}`)}>{tx("未実施", "Not done")}</span>;
        if (r.s === "rest") return <span style={chip(TC.rest, "#fff")}>{tx("休養", "Rest")}</span>;
        if (r.s === "dinner") return k > todayK
          ? <span style={chip(TC.bg, TC.dinner, `1.5px dashed ${TC.dinner}`)}>{tx("会食", "Dining")}</span>
          : <span style={chip(TC.dinner, "#fff")}>{tx("会食", "Dining")}</span>;
      }
      const p = proj[k];
      if (p && p !== "dinner") {
        const s = BASE[p];
        return <span style={chip("transparent", TC.sub, `1px dashed ${s ? KIND_COLOR[s.kind] : TC.faint}`)}>{s ? `Set${s.n}` : tx("休", "Rest")}</span>;
      }
      return null;
    };
    return (
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, gap: 8 }}>
          <button onClick={() => move(-1)} style={{ ...btn(false), padding: "5px 12px" }} aria-label={tx("前の月", "Previous month")}>‹</button>
          <div style={{ fontSize: 16, fontWeight: 800, color: TC.ink }}>{tx(`${y}年${m}月`, `${MONTH_EN[m - 1]} ${y}`)}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => { const [ty, tm] = partsOf(todayK); setYm([ty, tm]); setSel(todayK); }} style={{ ...btn(false), ...small }}>{tx("今日", "Today")}</button>
            <button onClick={() => move(1)} style={{ ...btn(false), padding: "5px 12px" }} aria-label={tx("次の月", "Next month")}>›</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4 }}>
          {(UI_EN ? DOW_EN : DOW).map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: i === 0 ? TC.skip : i === 6 ? TC.squat : TC.sub, paddingBottom: 2 }}>{d}</div>
          ))}
          {cells.map((k, i) => {
            if (!k) return <div key={"e" + i} />;
            const isToday = k === todayK, isSel = k === sel;
            const r = days[k];
            return (
              <button key={k} onClick={() => setSel(isSel ? null : k)} aria-pressed={isSel}
                      aria-label={`${label(k)} ${statusText(r) || (proj[k] ? `${tx("予定：", "planned: ")}${planText(proj[k])}` : "")}`}
                      title={r && (r.other || r.memo) ? [r.other, r.memo].filter(Boolean).join(" ／ ") : undefined}
                      style={{ minHeight: 56, padding: "4px 2px", borderRadius: 9, cursor: "pointer", fontFamily: "inherit",
                               display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                               border: isSel ? `2px solid ${TC.accent}` : isToday ? `2px solid ${TC.ink}` : `1px solid ${TC.line}`,
                               background: isSel ? TC.accentSoft : k > todayK ? TC.bg : TC.panel }}>
                <span style={{ fontSize: 12, fontWeight: isToday ? 800 : 600, color: TC.ink }}>{partsOf(k)[2]}</span>
                {badge(k)}
                {r && (r.memo || (r.meals && r.meals.length)) ? (
                  <span style={{ display: "flex", gap: 3 }}>
                    {r.meals && r.meals.length ? <span style={{ width: 5, height: 5, borderRadius: 3, background: TC.dinner }} /> : null}
                    {r.memo ? <span style={{ width: 5, height: 5, borderRadius: 3, background: TC.sub }} /> : null}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10, fontSize: 11, color: TC.sub, alignItems: "center", lineHeight: 1.9 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}><span style={chip(TC.squat, "#fff")}>{tx("Set1・3", "Set1/3")}</span><span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, color: TC.ink, marginRight: 4 }}>LEG DAY</span></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}><span style={chip(TC.run, "#fff")}>{tx("Set2・4", "Set2/4")}</span><span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, color: TC.ink, marginRight: 4 }}>RUN DAY</span></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}><span style={chip(TC.walk, "#fff")}>Set5</span><span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, color: TC.ink, marginRight: 4 }}>WALK DAY</span></span>
          <span style={chip(TC.other, "#fff")}>{tx("その他", "Other")}</span>
          <span style={chip(TC.rest, "#fff")}>{tx("休養", "Rest")}</span>
          <span style={chip(TC.dinner, "#fff")}>{tx("会食", "Dining")}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}><span style={chip(TC.aero, "#fff")}>{tx("有酸素", "Cardio")}</span>{UI_EN ? null : <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, color: TC.ink, marginRight: 4 }}>CARDIO</span>}</span>
          <span style={chip(TC.bg, TC.skip, `1.5px solid ${TC.skip}`)}>{tx("未実施", "Not done")}</span>
          <span style={chip(TC.skipset, "#fff")}>Skip</span>
          <span style={chip("transparent", TC.sub, `1px dashed ${TC.faint}`)}>{tx("点線", "Dotted")}</span><span>{tx("このまま進めた場合の予定", "Projected plan if you carry on")}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: 3, background: TC.dinner }} />{tx("食事の記録あり", "Meals logged")}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: 3, background: TC.sub }} />{tx("メモあり", "Has notes")}</span>
        </div>
      </div>
    );
  }

  function MonthSummary({ days, ym, todayK }) {
    const [y, m] = ym;
    const pre = `${y}-${pad(m)}-`;
    const ks = Object.keys(days).filter((k) => k.startsWith(pre));
    const cnt = (f) => ks.filter((k) => k <= todayK && f(days[k])).length;
    const planned = ks.filter((k) => k > todayK && days[k].s === "dinner").length;
    const per = SET_IDS.map((id) => ({ s: BASE[id], n: cnt((r) => r.s === "done" && r.set === id) }));
    const total = per.reduce((a, b) => a + b.n, 0);
    const others = [
      [tx("その他", "Other"), cnt((r) => r.s === "other")], [tx("休養", "Rest"), cnt((r) => r.s === "rest")],
      [tx("会食", "Dining out"), cnt((r) => r.s === "dinner")], [tx("未実施", "Not done"), cnt((r) => r.s === "skip")], ["Skip", cnt((r) => r.s === "skipset")], [tx("有酸素", "Cardio"), cnt((r) => r.s === "done" && r.set === "A")],
    ];
    return (
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <div style={{ ...h2, margin: 0 }}>{tx(`${m}月の進み具合`, `${MONTH_EN[m - 1]} progress`)}</div>
          <div style={{ fontSize: 13, color: TC.ink }}><b style={{ fontSize: 20 }}>{total}</b> / {tx(`${SET_IDS.length * MONTH_TARGET}回`, `${SET_IDS.length * MONTH_TARGET} sessions`)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 6, marginTop: 10 }}>
          {per.map(({ s, n }) => (
            <div key={s.id} style={{ background: TC.panel, borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: TC.sub }}>Set{s.n}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: TC.ink }}>{n}<span style={{ fontSize: 11, color: TC.sub, fontWeight: 600 }}>/{MONTH_TARGET}</span></div>
              <div style={{ height: 4, borderRadius: 2, background: TC.line, marginTop: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (n / MONTH_TARGET) * 100)}%`, height: "100%", background: KIND_COLOR[s.kind] }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: TC.sub, marginTop: 10, lineHeight: 1.7 }}>
          {UI_EN
            ? `${others.map(([nm, c]) => `${nm} ${pl(c, "day")}`).join(" · ")}${planned ? ` (dining out planned on ${pl(planned, "more day")})` : ""}`
            : `${others.map(([nm, c]) => `${nm} ${c}日`).join("・")}${planned ? `（このあと会食の予定 ${planned}日）` : ""}`}
        </div>
      </div>
    );
  }

  function TrainingHub() {
    const [ui, setUi] = useUiLang();
    UI_EN = ui === "en";
    const [data, setData] = useState(null);
    const [tab, setTab] = useState("log");
    // 開いているタブを URL に残す（#training/<タブ>）
    useNovaHubRoute("training", [tab === "log" ? "" : tab], (p) => setTab(["adjust", "log", "meal", "plan", "weight"].includes(p[0]) ? p[0] : "log"));
    const todayK = keyOf(new Date());
    const [ym, setYm] = useState(() => partsOf(todayK).slice(0, 2));
    const [sel, setSel] = useState(null);
    const [mealDate, setMealDate] = useState(null);
    const editorRef = useRef(null);
    useEffect(() => {
      (async () => {
        let d = null;
        try { const r = window.storage ? await window.storage.get(TR_KEY) : null; d = r && r.value ? JSON.parse(r.value) : null; } catch (e) { d = null; }
        setData(d && d.days ? d : { v: 1, days: {} });
      })();
    }, []);
    useEffect(() => { if (sel && editorRef.current) editorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [sel]);
    const persist = (next) => { try { if (window.storage) window.storage.set(TR_KEY, JSON.stringify(next)); } catch (e) { /* 保存できない環境では表示だけ更新 */ } };
    // 1日分を部分更新する。null で削除。空になった項目は消して保存データを小さく保つ
    const putDay = (k, patch) => {
      setData((prev) => {
        const days = { ...prev.days };
        if (patch === null) delete days[k];
        else {
          const cur = { ...(days[k] || {}), ...patch };
          Object.keys(cur).forEach((f) => { if (cur[f] === undefined || cur[f] === null || cur[f] === "") delete cur[f]; });
          if (cur.s !== "done") { delete cur.set; delete cur.run; delete cur.menu; }
          if (cur.s !== "other") delete cur.other;
          if (Object.keys(cur).length) days[k] = cur; else delete days[k];
        }
        const next = { ...prev, days };
        persist(next);
        return next;
      });
    };
    const putAdj = (fn) => {
      setData((prev) => {
        const adj = fn(JSON.parse(JSON.stringify(prev.adj || {})));
        const next = { ...prev, adj };
        if (!Object.keys(adj).length) delete next.adj;
        persist(next);
        return next;
      });
    };
    if (!data) return <div style={{ padding: 40, color: TC.sub, fontSize: 14 }}>{tx("読み込み中…", "Loading…")}</div>;
    const days = data.days;
    const adj = data.adj || {};
    const [y, m] = ym;
    const monthEnd = `${y}-${pad(m)}-${pad(new Date(y, m, 0).getDate())}`;
    const until = monthEnd > addDays(todayK, 30) ? monthEnd : addDays(todayK, 30);
    const proj = project(days, todayK, until);
    const selPos = sel && sel <= todayK ? posBefore(days, sel) : null;
    const TABS = UI_EN
      ? [["log", "Log"], ["meal", "Meals"], ["weight", "Weight"], ["plan", "Plan"], ["adjust", "Adjust Sets"]]
      : [["log", "記録"], ["meal", "食事"], ["weight", "体重"], ["plan", "プラン"], ["adjust", "Set調整"]];
    const todayPos = posBefore(days, todayK);
    return (
      <div style={{ background: "#F7F9FC", minHeight: "calc(100vh - 46px)", fontFamily: '"Inter", -apple-system, "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif' }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "18px 16px 60px" }}>
          <div style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: TC.accent, fontWeight: 700 }}>TRAINING HUB</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: TC.ink, margin: "2px 0 4px" }}>Progress Log</div>
            </div>
            <button onClick={() => setUi(ui === "ja" ? "en" : "ja")} title={tx("English に切り替え", "Switch to Japanese")}
                    style={{ ...btn(false), ...small, borderRadius: 999, marginTop: 2, whiteSpace: "nowrap" }}>
              {ui === "ja" ? "EN" : "日本語"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 2, marginBottom: 14, borderBottom: `1px solid ${TC.line}`, overflowX: "auto" }}>
            {TABS.map(([id, nm]) => (
              <button key={id} onClick={() => { setTab(id); if (id === "meal") setMealDate(null); }} aria-pressed={tab === id}
                      style={{ fontSize: 14, fontWeight: tab === id ? 800 : 600, padding: "9px 14px", border: "none", cursor: "pointer", background: "transparent", whiteSpace: "nowrap",
                               color: tab === id ? TC.accent : TC.sub, borderBottom: `2.5px solid ${tab === id ? TC.accent : "transparent"}`, marginBottom: -1, fontFamily: "inherit" }}>
                {nm}
              </button>
            ))}
          </div>
          {tab === "log" ? (
            <>
              <TodayCard key={`${todayK}-${todayPos}-${days[todayK] ? days[todayK].s : ""}`} days={days} adj={adj} todayK={todayK} proj={proj} onPut={putDay}
                         openEditor={(k) => { setYm(partsOf(k).slice(0, 2)); setSel(k); }} />
              <MonthSummary days={days} ym={ym} todayK={todayK} />
              <Calendar days={days} todayK={todayK} ym={ym} setYm={setYm} sel={sel} setSel={setSel} proj={proj} />
              {sel ? (
                <div ref={editorRef}>
                  <DayEditor key={sel} k={sel} rec={days[sel]} adj={adj} days={days} isFuture={sel > todayK}
                             expected={selPos != null ? CYCLE[selPos] : null} nextSet={selPos != null ? setAt(selPos) : null}
                             onPut={(p) => putDay(sel, p)} onClose={() => setSel(null)}
                             onOpenMeals={(k) => { setMealDate(k); setTab("meal"); }} />
                </div>
              ) : null}
            </>
          ) : null}
          {tab === "meal" ? <MealTab key={mealDate || todayK} days={days} todayK={todayK} putDay={putDay} initialDate={mealDate} /> : null}
          {tab === "weight" ? <WeightTab days={days} todayK={todayK} onPut={putDay} /> : null}
          {tab === "plan" ? <PlanTab adj={adj} goAdjust={() => setTab("adjust")} /> : null}
          {tab === "adjust" ? <AdjustTab adj={adj} putAdj={putAdj} /> : null}
        </div>
      </div>
    );
  }
  return TrainingHub;
})();
