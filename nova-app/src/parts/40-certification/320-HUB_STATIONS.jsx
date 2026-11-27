// @@nova-part 40-certification/320-HUB_STATIONS.jsx

/* ================================================================
   Certification-Dashboard-Hub : Portal Shell
   7つの資格別ダッシュボードへの統一入口。
   各ダッシュボードのソースは無改変・IIFE名前空間で分離済み(上部参照)。
   ================================================================ */

// ===== AIガバナンス実装キット（資格ハブ内の常設リファレンス）=====
function Station_GovKit() {
  const C = {
    bg: "#0A1420", panel: "#101F33", panel2: "#0D1A2B", border: "#22374F", line: "#1D3049",
    ink: "#EAF0F6", sub: "#8598B0", faint: "#5F7290",
    accent: "#37B1A5", accentInk: "#6FD2C8",
    tP: "#E27069", tH: "#E28C4E", tL: "#D6B152", tM: "#72BA88",
  };
  const [ind, setInd] = React.useState("all");
  const tiers = [
    { code: "TIER 0", name: "禁止", col: C.tP, d: "人の尊厳・基本的人権を侵す用途。方針で遮断（統制ではなく「やらない」）。" },
    { code: "TIER 1", name: "高リスク", col: C.tH, d: "人の権利・安全・重要な意思決定に影響（与信・人事・医療・重要インフラ）。人間の最終判断・記録・監査を必須化。" },
    { code: "TIER 2", name: "限定リスク", col: C.tL, d: "対人・外部発信（チャットボット・生成コンテンツ）。AIである旨の開示と出力検証。" },
    { code: "TIER 3", name: "最小リスク", col: C.tM, d: "社内・非機微・低影響。速度優先。事後モニタリングで管理。" },
  ];
  const modules = [
    { no: "01", t: "AI利用規程", en: "Acceptable Use Policy", pts: ["データ機密区分 × 許容/条件付/要審査/禁止の対応表", "禁止だけでなく「例外申請の経路」を用意（シャドーAI抑止）", "出力の責任は利用者に帰属"] },
    { no: "02", t: "リスク階層化", en: "Risk Tiering", pts: ["新ユースケースは上から問い、最初に該当した階層で止める", "統制の強度を階層に比例させる", "モデル更新・用途拡大で再評価（階層はイベントで動く）"] },
    { no: "03", t: "適用宣言書（SoA）", en: "ISO/IEC 42001 Annex A", pts: ["Annex A 管理策 × 適用可否・理由・実装状態を宣言", "除外には正当な理由を明記", "ベンダー審査：学習利用/保持/リージョン/再委託/認証/責任分界"] },
    { no: "04", t: "LLM脅威モデル", en: "OWASP LLM Top 10", pts: ["プロンプトインジェクション（間接注入含む）", "過剰エージェンシー → 最小権限・アクション承認ゲート", "出力の不適切処理 → 下流を「信頼しない」設計"] },
    { no: "05", t: "インシデント・ランブック", en: "Incident Runbook", pts: ["準備→検知→封じ込め→根絶→復旧→事後", "説明責任ログ：承認・根拠・確認を事後再構成", "通知義務（先/期限/要件）を事前にプレイブック化"] },
  ];
  const overlays = [
    { id: "finance", label: "金融", uc: "与信・不正検知・顧客対応AI・アルゴリズム取引", reg: "金融庁ガイドライン / モデルリスク管理(SR 11-7型) / AML・CFT", delta: "独立モデル検証・説明可能性・非差別テスト・長期証跡", th: "誤情報 / 過剰エージェンシー" },
    { id: "health", label: "医療・ヘルスケア", uc: "診断支援・トリアージ・画像読影補助・患者向けチャット", reg: "個人情報保護法(要配慮) / 医療機器規制(SaMD) / 医療広告", delta: "臨床責任者の最終判断・臨床評価・オプトイン同意・再識別防止", th: "機密漏洩 / 誤情報" },
    { id: "public", label: "公共・自治体", uc: "給付/受付の審査支援・住民向け問い合わせ・文書作成", reg: "日本のAI事業者ガイドライン / 透明性・説明責任 / 調達基準", delta: "説明可能性と不服申立て経路・公平性の継続監視・利用の開示", th: "注入 / 誤情報" },
    { id: "mfg", label: "製造", uc: "予知保全・外観検査・需要予測・OT連携エージェント・設計支援", reg: "製品/機能安全 / OTセキュリティ(IEC 62443型) / 営業秘密・輸出管理", delta: "OT/IT境界統制・アクチュエータに物理セーフティ・図面の学習遮断・供給網来歴", th: "過剰エージェンシー / 汚染" },
    { id: "cross", label: "一般事業会社", uc: "社内ナレッジ検索(RAG)・稟議/文書ドラフト・顧客サポート・コード補助", reg: "個人情報保護法 / 契約上の秘密保持 / 著作権・ライセンス", delta: "シャドーAIの観測・全社利用規程・ベンダー審査・RAGソースのアクセス制御", th: "注入 / 機密漏洩" },
  ];
  const road = [
    { d: "DAY 0–30 · 可視化", t: "現状把握と土台", li: ["AI資産の棚卸（シャドーAI観測含む）", "利用規程v1とリスク階層の判定基準", "ガバナンス体制・RACIを定義"] },
    { d: "DAY 31–60 · 統制", t: "審査と技術層", li: ["ユースケース審査・ベンダー審査を稼働", "SSO/DLP/ログ/PII検出を灯台部門に実装", "TIER 1に脅威モデリングと影響評価"] },
    { d: "DAY 61–90 · 定着", t: "運用と横展開", li: ["インシデント・ランブックを机上演習", "指標で有効性を測定", "灯台→隣接部門へ横展開・再監査サイクル"] },
  ];
  const card = { background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" };
  const filtered = ind === "all" ? overlays : overlays.filter(o => o.id === ind);
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 18px 64px" }}>
        <div style={{ borderTop: `3px solid ${C.accent}`, paddingTop: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accentInk, fontWeight: 700 }}>Implementation Kit · Reference</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: "10px 0 6px", letterSpacing: "-0.01em" }}>AIガバナンス実装キット</h1>
          <p style={{ color: C.sub, fontSize: 14.5, lineHeight: 1.7, maxWidth: "62ch", margin: "10px 0 0" }}>
            「ポリシーを書く」ではなく「統制を回す」ための実装リファレンス。<b style={{ color: C.ink }}>リスクベース</b>で用途を階層化し、<b style={{ color: C.ink }}>三層（ポリシー／プロセス／技術）</b>で実装し、インシデントに説明責任で応える——その骨格。普遍コア5モジュール＋業種別オーバーレイ。
          </p>
          <div style={{ marginTop: 16, fontSize: 11.5, color: C.faint, fontFamily: "ui-monospace, monospace", letterSpacing: "0.02em" }}>準拠フレーム: NIST AI RMF · ISO/IEC 42001 · EU AI Act · OWASP LLM Top 10</div>
        </div>

        {/* tier legend */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12, margin: "28px 0 8px" }}>
          {tiers.map(t => (
            <div key={t.code} style={{ ...card, borderLeft: `4px solid ${t.col}`, padding: "13px 15px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 3 }}>
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: t.col }}>{t.code}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: t.col }}>{t.name}</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{t.d}</p>
            </div>
          ))}
        </div>

        {/* core modules */}
        <SectionTitle no="—" title="普遍コア 5モジュール" C={C} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 14 }}>
          {modules.map(m => (
            <div key={m.no} style={card}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginBottom: 8 }}>
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: C.accentInk }}>{m.no}</span>
                <span style={{ fontWeight: 700, fontSize: 15.5 }}>{m.t}</span>
              </div>
              <div style={{ fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: C.faint, marginBottom: 8 }}>{m.en}</div>
              <ul style={{ margin: 0, paddingLeft: 17 }}>
                {m.pts.map((p, i) => <li key={i} style={{ fontSize: 13, color: C.sub, margin: "5px 0", lineHeight: 1.55 }}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* industry overlay */}
        <SectionTitle no="—" title="業種別オーバーレイ" C={C} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, margin: "0 0 12px" }}>
          {[{ id: "all", label: "すべて" }, ...overlays].map(o => (
            <button key={o.id} onClick={() => setInd(o.id)} style={{
              border: `1px solid ${ind === o.id ? C.accent : C.border}`, background: ind === o.id ? C.accent : "transparent",
              color: ind === o.id ? "#04201D" : C.sub, borderRadius: 20, padding: "5px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            }}>{o.label}</button>
          ))}
        </div>
        <div style={{ overflowX: "auto", border: `1px solid ${C.border}`, borderRadius: 12 }}>
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 680, fontSize: 12.5 }}>
            <thead><tr>{["業種", "代表的な高リスク用途", "上乗せ規制・基準（要確認）", "統制デルタ", "特に効く脅威"].map(h => (
              <th key={h} style={{ textAlign: "left", background: C.panel2, color: C.ink, fontWeight: 700, fontSize: 11, letterSpacing: "0.03em", padding: "11px 13px", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={o.id} style={{ background: i % 2 ? C.panel2 : "transparent" }}>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${C.line}`, color: C.ink, fontWeight: 700, verticalAlign: "top", whiteSpace: "nowrap" }}>{o.label}</td>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${C.line}`, color: C.sub, verticalAlign: "top", lineHeight: 1.5 }}>{o.uc}</td>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${C.line}`, color: C.sub, verticalAlign: "top", lineHeight: 1.5 }}>{o.reg}</td>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${C.line}`, color: C.sub, verticalAlign: "top", lineHeight: 1.5 }}>{o.delta}</td>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${C.line}`, color: C.accentInk, verticalAlign: "top", lineHeight: 1.5, whiteSpace: "nowrap" }}>{o.th}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: C.faint, margin: "10px 0 0", lineHeight: 1.6 }}>行き先が変わっても骨格は同じ。コア5モジュールに「統制デルタ」を足すだけで業種適合できる。規制名は2025年時点の出発点で、実適用は法務・各業種の専門家確認が前提。</p>

        {/* roadmap */}
        <SectionTitle no="—" title="導入ロードマップ 30 / 60 / 90" C={C} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14 }}>
          {road.map(p => (
            <div key={p.d} style={card}>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: C.accentInk, letterSpacing: "0.04em" }}>{p.d}</div>
              <div style={{ fontWeight: 700, fontSize: 16, margin: "4px 0 10px" }}>{p.t}</div>
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {p.li.map((x, i) => <li key={i} style={{ fontSize: 12.5, color: C.sub, margin: "6px 0", lineHeight: 1.5 }}>{x}</li>)}
              </ol>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${C.border}`, fontSize: 11.5, color: C.faint, lineHeight: 1.7 }}>
          <b style={{ color: C.sub }}>非公式・テンプレートの注記。</b> 本キットは公開フレームワーク・規制の考え方に基づく出発点であり、いずれの認定団体・規制当局の公式文書でもありません。管理策番号（Annex A等）は参照であり原典で確認してください。規制の実適用は組織・データ主体・顧客の所在地に基づき法務および各業種の専門家の確認を前提とします。
        </div>
      </div>
    </div>
  );
}
function SectionTitle({ no, title, C }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, borderBottom: `2px solid ${C.border}`, paddingBottom: 10, margin: "40px 0 16px" }}>
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: C.accentInk }}>{no}</span>
      <h2 style={{ fontSize: 21, fontWeight: 800, margin: 0 }}>{title}</h2>
    </div>
  );
}

const Station_GovMix = (function(){
const GC = { primary:"#0E7A5F", deep:"#0A5645", light:"#E9F6F1", mid:"#BFE3D6", ink:"#142821", ng:"#C0392B" };
const PER_CERT = 5;
const GM_SETS = 3;
// 選択肢を「選択肢A」「(B)」のように記号で参照している問題は、並べ替えると解説と食い違うので動かさない
const GM_LETTER_REF = /(?:選択肢|肢)\s*[A-DＡ-Ｄ]|（[A-D]）|\([A-D]\)|\b(?:option|choice) [A-D]\b/i;
function gmBuildSet(setNo){
  const out = [];
  SECGOV_REG.forEach((st) => {
    const bank = st.bank || [];
    if (!bank.length) return;
    // 各資格の 15 問（5 問 × 3 セット）をバンク全体から均等に取る。以前は先頭 15 問を使っていたため、
    // 分野が D1 に偏り、正解の位置も偏っていた（バンクは塊ごとに作られている）。セット n は 15 区画の n, n+3, n+6… 番目
    for (let i = 0; i < PER_CERT; i++) {
      const slot = i * GM_SETS + (setNo - 1);
      const q = bank[Math.min(bank.length - 1, Math.floor((slot + 0.5) * bank.length / (PER_CERT * GM_SETS)))];
      if (q && Array.isArray(q.o)) out.push({ src: st.code, hue: st.hue, q });
    }
  });
  // deterministic interleave: sort by (index within cert, cert order) so certs alternate
  const inter = [];
  for (let i = 0; i < PER_CERT; i++) for (let c = 0; c < SECGOV_REG.length; c++) {
    const item = out[c * PER_CERT + i];
    if (item) inter.push(item);
  }
  // 正解の位置をならす：A〜D を同じ数ずつ並べた列をセットごとの固定の種で混ぜ、その位置に正解が来るよう選択肢を巡回させる
  // （ほかの選択肢の並び順は保つ。A→B→C→D の決まった順にすると、それ自体が手がかりになる）
  let seed = setNo * 7919 + 17;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const targets = inter.map((_, j) => j % 4);
  for (let i = targets.length - 1; i > 0; i--) { const k = Math.floor(rnd() * (i + 1)); const t = targets[i]; targets[i] = targets[k]; targets[k] = t; }
  return inter.map((it, j) => {
    const q = it.q, n = q.o.length;
    if (n < 2 || typeof q.a !== "number" || [q.e, q.eEn, ...(q.o || []), ...(q.oEn || [])].some((t) => GM_LETTER_REF.test(String(t || "")))) return it;
    const target = targets[j] % n, shift = (target - q.a + n) % n;
    if (!shift) return it;
    const rot = (arr) => (Array.isArray(arr) && arr.length === n ? arr.map((_, k) => arr[(k - shift + n) % n]) : arr);
    if (Array.isArray(q.oEn) && q.oEn.length !== n) return it;
    return { ...it, q: { ...q, o: rot(q.o), oEn: rot(q.oEn), a: target } };
  });
}
function App(){
  const [lang, setLang] = useState(certInitLang);
  const en = lang === "en";
  const [setNo, setSetNo] = useState(null);
  const [qs, setQs] = useState([]);
  const [pos, setPos] = useState(0);
  const [sel, setSel] = useState(null);
  const [answers, setAnswers] = useState([]);
  const start = (n) => { setSetNo(n); setQs(gmBuildSet(n)); setPos(0); setSel(null); setAnswers([]); };
  const card = { background:"#fff", border:`1px solid ${GC.mid}`, borderRadius:12, padding:"16px 18px" };
  const wrap = { minHeight: "60vh", background: "#F4FAF7", padding: "22px 16px 50px", fontFamily: '-apple-system, "Segoe UI", "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif' };
  if (setNo === null) {
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: GC.deep, marginBottom: 4 }}>{en ? "Cross-Certification Governance Mock" : "AIガバナンス横断模試"}</div>
            <button onClick={() => setLang(en ? "ja" : "en")} style={{ marginLeft: "auto", background: "#fff", border: `1px solid ${GC.mid}`, color: GC.deep, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{en ? "日本語" : "EN"}</button>
          </div>
          <div style={{ fontSize: 12.5, color: "#4A6157", lineHeight: 1.75, marginBottom: 14 }}>
            {en ? "Forty-five questions per set, five drawn from each of the nine security & governance banks, with the source certificate hidden until you answer. The point is transfer: seeing that one piece of knowledge serves several exams — and which certificate's territory you are weakest in. Unofficial study aid; verify scope against each official outline." : "1セット45問 — セキュリティ・ガバナンス9資格の問題バンクから5問ずつを横断出題する。出題元の資格は答えるまで伏せられる。狙いは転移の実感：1つの知識が複数の試験に効くこと、そして自分がどの資格の領域で弱いかを見ること。非公式の学習補助であり、出題範囲は各公式の試験要項で確認すること。"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 10 }}>
            {[1, 2, 3].map((n) => (
              <button key={n} onClick={() => start(n)}
                style={{ ...card, cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: GC.primary }}>{en ? `Set ${n}` : `セット${n}`}</div>
                <div style={{ fontSize: 12, color: "#4A6157", marginTop: 3 }}>{en ? "45 questions - 9 certificates x 5" : "45問 — 9資格×5問"}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (pos >= qs.length) {
    const per = {};
    answers.forEach((a) => { const p = per[a.src] = per[a.src] || { c: 0, t: 0, hue: a.hue }; p.t++; if (a.ok) p.c++; });
    const rows = Object.entries(per).map(([k, v]) => ({ code: k, ...v, acc: v.t ? v.c / v.t : 0 })).sort((x, y) => x.acc - y.acc);
    const total = answers.filter((a) => a.ok).length;
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ ...card, marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: GC.deep, marginBottom: 4 }}>{en ? `Result: ${total} / ${qs.length}` : `結果: ${total} / ${qs.length} 問正解`}</div>
            <div style={{ fontSize: 12, color: "#4A6157" }}>{en ? "Certificates ordered weakest first - the top rows are where to spend next." : "正答率の低い資格順に並んでいる。上の行が、次に時間を使う場所。"}</div>
          </div>
          {rows.map((r) => (
            <div key={r.code} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1px solid ${GC.mid}`, borderRadius: 10, padding: "9px 14px", marginBottom: 7 }}>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: nvInk(r.hue, "#ffffff") || GC.deep, minWidth: 110 }}>{r.code}</span>
              <div style={{ flex: 1, height: 8, background: GC.light, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.round(r.acc * 100)}%`, height: "100%", background: r.hue || GC.primary }} />
              </div>
              <span style={{ fontSize: 12, color: "#4A6157", minWidth: 54, textAlign: "right" }}>{r.c}/{r.t}（{Math.round(r.acc * 100)}%）</span>
            </div>
          ))}
          <button onClick={() => setSetNo(null)} style={{ marginTop: 12, background: GC.primary, color: nvInk("#ffffff", GC.primary), border: "none", borderRadius: 9, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {en ? "Back to sets" : "セット選択へ戻る"}
          </button>
        </div>
      </div>
    );
  }
  const cur = qs[pos];
  const Q = cur.q;
  const qText = en && Q.qEn ? Q.qEn : Q.q;
  const opts = en && Q.oEn ? Q.oEn : Q.o;
  const expl = en && Q.eEn ? Q.eEn : Q.e;
  const choose = (k) => { if (sel !== null) return; setSel(k); setAnswers((a) => [...a, { src: cur.src, hue: cur.hue, ok: k === Q.a }]); };
  return (
    <div style={wrap}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: GC.deep }}>{en ? `Set ${setNo}` : `セット${setNo}`} · {pos + 1} / {qs.length}</span>
          <span style={{ fontSize: 11.5, color: "#4A6157" }}>{sel === null ? (en ? "Source certificate hidden until you answer" : "出題元の資格は解答後に表示") : null}</span>
          {sel !== null && <span style={{ fontSize: 11.5, fontWeight: 800, color: nvInk(cur.hue || GC.primary, GC.light), marginLeft: "auto" }}>{en ? "From: " : "出題元: "}{cur.src}</span>}
        </div>
        <div style={{ ...card, marginBottom: 10 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: GC.ink, lineHeight: 1.7 }}>{qText}</div>
        </div>
        <div style={{ display: "grid", gap: 8, marginBottom: 10 }}>
          {opts.map((o, k) => {
            let bd = GC.mid, bg = "#fff", col = GC.ink;
            if (sel !== null) {
              if (k === Q.a) { bd = GC.primary; bg = GC.light; col = GC.deep; }
              else if (k === sel) { bd = GC.ng; bg = "#FBEDEB"; col = GC.ng; }
              else { col = "#5F7169"; }
            }
            return (
              <button key={k} onClick={() => choose(k)}
                style={{ textAlign: "left", background: bg, border: `1.4px solid ${bd}`, color: col, borderRadius: 10, padding: "10px 14px", fontSize: 12.5, lineHeight: 1.6, cursor: sel === null ? "pointer" : "default" }}>
                <span style={{ fontWeight: 800, marginRight: 8 }}>{String.fromCharCode(65 + k)}</span>{o}
              </button>
            );
          })}
        </div>
        {sel !== null && (
          <div style={{ ...card, borderLeft: `3px solid ${sel === Q.a ? GC.primary : GC.ng}`, marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: sel === Q.a ? GC.deep : GC.ng, marginBottom: 3 }}>{sel === Q.a ? (en ? "Correct" : "正解") : (en ? "Incorrect" : "不正解")}</div>
            <div style={{ fontSize: 12, color: "#33473E", lineHeight: 1.7 }}>{expl}</div>
            <button onClick={() => { setPos(pos + 1); setSel(null); }}
              style={{ marginTop: 10, background: GC.primary, color: nvInk("#ffffff", GC.primary), border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
              {pos + 1 >= qs.length ? (en ? "See results →" : "結果を見る →") : (en ? "Next →" : "次の問題 →")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
return App;
})();

const HUB = {
  bg: "#0A1420",
  panel: "#101F33",
  panelHover: "#132844",
  border: "#22374F",
  ink: "#EAF0F6",
  sub: "#7E93AC",
  line: "#1D3049",
  signal: "#3ED6A7",
};

const HUB_STATIONS = [
  {
    id: "clf",
    official: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    code: "CLF-C02",
    ja: "AWS Certified Cloud Practitioner",
    en: "AWS Certified Cloud Practitioner",
    descJa: "AWSの基礎知識・クラウド概念・セキュリティ・料金体系を問う入門資格。",
    descEn: "Entry-level AWS certification covering cloud concepts, security, and billing.",
    accent: "#FF9900",
    deep: "#232F3E",
    vendor: "AWS",
    category: "aws",
    Comp: Station_CLF,
  },
  {
    id: "saa",
    official: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    code: "SAA-C03",
    ja: "AWS Certified Solutions Architect – Associate",
    en: "AWS Certified Solutions Architect – Associate",
    descJa: "セキュア・弾力性・高性能・コスト最適なアーキテクチャ設計を問うアソシエイト資格。",
    descEn: "Associate-level exam on designing secure, resilient, performant, cost-optimized architectures.",
    accent: "#FF9900",
    deep: "#232F3E",
    vendor: "AWS",
    category: "aws",
    Comp: Station_SAA,
  },
  {
    id: "ccaf",
    official: "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification",
    code: "CCA-F",
    ja: "Claude Certified Architect – Foundations",
    en: "Claude Certified Architect – Foundations",
    descJa: "エージェント設計・ツール統合・MCPなど、Claude活用の基礎を問う資格。",
    descEn: "Foundational certification on agentic architecture, tool design, and MCP integration.",
    accent: "#C8633F",
    deep: "#8A3D22",
    vendor: "Anthropic",
    category: "anthropic",
    Comp: Station_CCAF,
  },
  {
    id: "aicx",
    official: "https://aicx.jp/certifications/strategist",
    code: "AICX",
    ja: "AI Agent Strategist 認定",
    en: "AI Agent Strategist Certification",
    descJa: "生成AI・AIエージェントの基礎から業務プロセス活用までを問う資格。",
    descEn: "Covers generative AI and AI agent fundamentals through business process application.",
    accent: "#2563EB",
    deep: "#1E3A8A",
    vendor: "AICX",
    category: "others",
    Comp: Station_AICX,
  },
  {
    id: "pl900",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900",
    code: "PL-900",
    ja: "Microsoft Power Platform Fundamentals",
    en: "Microsoft Power Platform Fundamentals",
    descJa: "Power Platform全体のビジネス価値と主要コンポーネントを問う入門資格。",
    descEn: "Entry-level exam on Power Platform's business value and core components.",
    accent: "#0EA5C4",
    deep: "#0B6E8F",
    vendor: "Microsoft",
    category: "microsoft",
    Comp: Station_PL900,
  },
  {
    id: "ab620",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-620",
    code: "AB-620",
    ja: "Copilot Studioでの統合AIソリューションの設計と構築",
    en: "Designing and Building AI Solutions with Copilot Studio",
    descJa: "Copilot Studioを用いたエージェントソリューションの計画・構成・拡張を問う資格。",
    descEn: "Covers planning, configuring, and extending agent solutions with Copilot Studio.",
    accent: "#1F6FEB",
    deep: "#0B3D91",
    vendor: "Microsoft",
    category: "microsoft",
    Comp: Station_AB620,
  },
  {
    id: "sc500",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-500",
    code: "SC-500",
    ja: "クラウドおよび AI セキュリティ エンジニア アソシエイト",
    en: "Cloud and AI Security Engineer Associate",
    descJa: "クラウド/ハイブリッド環境の ID・ネットワーク・データ・コンピュート・AI ワークロードのセキュリティ制御を、Defender・Sentinel・Purview 等で実装し監視する能力を問う。",
    descEn: "Implement and monitor end-to-end security controls across identity, network, data, compute, and AI workloads with Defender, Sentinel, and Purview.",
    accent: "#7C3AED",
    deep: "#4C1D95",
    vendor: "Microsoft",
    category: "microsoft",
    Comp: Station_SC500,
  },
  {
    id: "sc900",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900",
    code: "SC-900",
    ja: "セキュリティ、コンプライアンス、ID の基礎",
    en: "Security, Compliance, and Identity Fundamentals",
    descJa: "セキュリティ/コンプライアンス/ID の基礎概念と Microsoft Entra・セキュリティ・コンプライアンス ソリューションを問う入門資格。",
    descEn: "Fundamentals of security, compliance, and identity across Microsoft Entra, security, and compliance solutions.",
    accent: "#0E7C7B",
    deep: "#0B4F4E",
    vendor: "Microsoft",
    category: "microsoft",
    Comp: Station_SC900,
  },
  {
    id: "gh600", code: "GH-600",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-600",
    ja: "エージェント AI 開発者",
    en: "Agentic AI Developer",
    descJa: "GitHub を制御プレーンに、Copilot・MCP・マルチエージェントで本番SDLC内のAIエージェントを構築・運用・統治する開発者向け資格（GH-600）。",
    descEn: "Developer cert (GH-600) for building, operating, and governing AI agents inside production SDLC workflows using GitHub as the control plane (Copilot, MCP, multi-agent).",
    accent: "#8250DF", deep: "#6639BA", vendor: "GitHub", category: "microsoft",
    Comp: Station_GH600,
  },
  {
    id: "ab100", code: "AB-100",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100",
    ja: "エージェント AI ビジネス ソリューション アーキテクト",
    en: "Agentic AI Business Solutions Architect",
    descJa: "Copilot Studio・Microsoft Foundry・Dynamics 365 でエージェント型AIビジネスソリューションを計画・設計・展開するエキスパート（アーキテクト）資格。",
    descEn: "Expert (architect) cert for planning, designing, and deploying agentic AI business solutions with Copilot Studio, Microsoft Foundry, and Dynamics 365.",
    accent: "#4338CA", deep: "#312E81", vendor: "Microsoft", category: "microsoft",
    Comp: Station_AB100,
  },
  {
    id: "ab410", code: "AB-410",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-410",
    ja: "インテリジェント アプリケーション ビルダー アソシエイト (ベータ)",
    en: "Intelligent Applications Builder Associate (beta)",
    descJa: "Power Platform・Copilot Studio・AI Hub でインテリジェントなアプリとエージェント、業務ロジック・自動化を構築する開発者向け資格（ベータ）。",
    descEn: "Building intelligent apps, agents, business logic, and automation with Power Platform, Copilot Studio, and AI Hub (beta).",
    accent: "#C2410C", deep: "#7C2D12", vendor: "Microsoft", category: "microsoft",
    Comp: Station_AB410,
  },
  {
    id: "ai300", code: "AI-300",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-300",
    ja: "Machine Learning 運用エンジニア アソシエイト",
    en: "Machine Learning Operations Engineer Associate",
    descJa: "Azure Machine Learning と Microsoft Foundry での ML・生成AI ソリューションの運用（MLOps・GenAIOps）を問う資格。",
    descEn: "Operationalizing ML and generative AI solutions with Azure Machine Learning and Microsoft Foundry (MLOps/GenAIOps).",
    accent: "#0F766E", deep: "#134E4A", vendor: "Microsoft", category: "microsoft",
    Comp: Station_AI300,
  },
  {
    id: "ai103",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103",
    code: "AI-103",
    ja: "Azure AI アプリ・エージェント開発者アソシエイト",
    en: "Azure AI Apps and Agents Developer Associate",
    descJa: "Microsoft Foundry で AI アプリ・エージェントを設計・実装・運用する開発者向け資格。",
    descEn: "Developer cert on building, managing, and deploying AI apps and agents with Microsoft Foundry.",
    accent: "#7C3AED",
    deep: "#4C1D95",
    vendor: "Microsoft",
    category: "microsoft",
    Comp: Station_AI103,
  },
  {
    id: "ai200",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-200",
    code: "AI-200",
    ja: "Azure AI クラウド開発者アソシエイト",
    en: "Azure AI Cloud Developer Associate",
    descJa: "Azure でコンテナー・データ・メッセージングを用いた AI クラウドソリューションを開発する資格。",
    descEn: "Developer cert on building AI cloud solutions with containers, data services, and messaging on Azure.",
    accent: "#0891B2",
    deep: "#155E75",
    vendor: "Microsoft",
    category: "microsoft",
    Comp: Station_AI200,
  },
  {
    id: "gh900",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/github-foundations",
    code: "GH-900",
    ja: "GitHub Foundations（GitHubの基礎）",
    en: "GitHub Foundations",
    descJa: "Git・リポジトリ・コラボレーション・Actions・セキュリティなど GitHub の基礎を問う入門資格。",
    descEn: "Entry-level cert on Git, repositories, collaboration, Actions, and GitHub security fundamentals.",
    accent: "#2DA44E",
    deep: "#1B1F24",
    vendor: "GitHub",
    category: "microsoft",
    Comp: Station_GH900,
  },
  {
    id: "gh300",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300",
    code: "GH-300",
    ja: "GitHub Copilot",
    en: "GitHub Copilot",
    descJa: "GitHub Copilot の効果的・責任ある活用、機能・プロンプト・データ/セキュリティを問う中級資格。",
    descEn: "Intermediate cert on using GitHub Copilot effectively and responsibly: features, prompting, data, and safeguards.",
    accent: "#BF3989",
    deep: "#99286E",
    vendor: "GitHub",
    category: "microsoft",
    Comp: Station_GH300,
  },
  {
    id: "adp",
    official: "https://cloud.google.com/learn/certification/data-practitioner",
    code: "ADP",
    ja: "Google Cloud Associate Data Practitioner",
    en: "Google Cloud Associate Data Practitioner",
    descJa: "データの準備・分析・可視化・パイプライン運用の基礎を問うアソシエイト資格。",
    descEn: "Associate-level exam on data preparation, analysis, visualization, and pipelines.",
    accent: "#1A73E8",
    deep: "#174EA6",
    vendor: "Google Cloud",
    category: "googlecloud",
    Comp: Station_ADP,
  },
  {
    id: "agwa",
    official: "https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=ja",
    code: "AGWA",
    ja: "Associate Google Workspace Administrator",
    en: "Associate Google Workspace Administrator",
    descJa: "Google Workspace の日常管理（ユーザーとディレクトリ、コアサービス、データ ガバナンス、セキュリティ、エンドポイント、トラブルシューティング）を問うアソシエイト資格。",
    descEn: "Associate-level exam on day-to-day Google Workspace administration: users and directory, core services, data governance, security, endpoints, and troubleshooting.",
    accent: "#1E8E3E",
    deep: "#137333",
    vendor: "Google Cloud",
    category: "googlecloud",
    jaOnly: true,
    Comp: Station_AGWA,
  },
  {
    id: "dp900",
    official: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900",
    code: "DP-900",
    ja: "Azure Data Fundamentals",
    en: "Azure Data Fundamentals",
    descJa: "データの中核概念と、Azure 上のリレーショナル/非リレーショナル/分析ワークロードの扱い方を問う入門資格。",
    descEn: "Fundamentals of core data concepts and working with relational, non-relational, and analytics data on Azure.",
    accent: "#0F6CBD",
    deep: "#0A4E8A",
    vendor: "Microsoft",
    category: "microsoft",
    Comp: Station_DP900,
  },
  {
    id: "aigp",
    official: "https://iapp.org/certify/aigp",
    code: "AIGP",
    ja: "AI Governance Professional",
    en: "AI Governance Professional",
    descJa: "IAPP認定。責任あるAIの原則、AIに適用される法規制（GDPR・EU AI Act等）、AIライフサイクルとリスク管理、ガバナンスの実装を問うAIガバナンスの中核資格。",
    descEn: "IAPP certification covering responsible-AI principles, laws applying to AI (GDPR, EU AI Act), the AI lifecycle and risk management, and governance implementation.",
    accent: "#5B54C9",
    deep: "#3A348F",
    vendor: "IAPP",
    category: "secgov",
    Comp: Station_AIGP,
  },
  {
    id: "iso42001f",
    official: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-42001/iso-iec-42001-foundation",
    code: "ISO 42001 F",
    ja: "ISO/IEC 42001 Foundation",
    en: "ISO/IEC 42001 Foundation",
    descJa: "AIマネジメントシステム（AIMS）の国際規格ISO/IEC 42001の基礎。責任あるAIの原則、要求事項（Clause 4–10）、Annex A管理策とSoA、AIリスク・影響評価、PDCAと監査を学ぶ（PECB）。",
    descEn: "Foundations of ISO/IEC 42001, the AI management system (AIMS) standard: responsible-AI principles, requirements (Clauses 4–10), Annex A controls and the SoA, AI risk/impact assessment, and PDCA/audit (PECB).",
    accent: "#0E8A6E",
    deep: "#0B5B49",
    vendor: "ISO / PECB",
    category: "secgov",
    Comp: Station_ISO42001F,
  },
  {
    id: "iso42001li",
    official: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-42001/iso-iec-42001-lead-implementer",
    code: "ISO 42001 LI",
    ja: "ISO/IEC 42001 Lead Implementer",
    en: "ISO/IEC 42001 Lead Implementer",
    descJa: "AIマネジメントシステム（AIMS）の実装を主導する上級資格。要求事項の解釈、実装プロジェクトの計画・実行、リスク・影響評価、監視・測定、継続的改善と認証審査準備までを体系的に学ぶ（PECB）。",
    descEn: "Advanced credential for leading the implementation of an AI management system (AIMS): interpreting requirements, planning and executing the implementation project, risk/impact assessment, monitoring and measurement, and continual improvement through certification-audit preparation (PECB).",
    accent: "#1569A6",
    deep: "#0E4A76",
    vendor: "ISO / PECB",
    category: "secgov",
    Comp: Station_ISO42001LI,
  },
  {
    id: "ccsk",
    official: "https://cloudsecurityalliance.org/education/ccsk",
    code: "CCSK v5",
    ja: "Certificate of Cloud Security Knowledge",
    en: "Certificate of Cloud Security Knowledge",
    descJa: "CSA認定のクラウドセキュリティ資格。責任共有モデル、ガバナンス・リスク・監査、IDアクセス管理、インフラ/ワークロード、データ/アプリ保護、インシデント対応・ゼロトラスト・生成AIまでを横断的に学ぶ（CSA Guidance v5準拠）。",
    descEn: "CSA's vendor-neutral cloud security certificate spanning the shared-responsibility model, governance/risk/audit, IAM, infrastructure/workloads, data/app security, incident response, Zero Trust, and GenAI (aligned to CSA Guidance v5).",
    accent: "#0E9AA7",
    deep: "#0A5D66",
    vendor: "CSA",
    category: "secgov",
    Comp: Station_CCSK,
  },
  {
    id: "cism",
    official: "https://www.isaca.org/credentialing/cism/get-cism-certified",
    code: "CISM",
    ja: "Certified Information Security Manager",
    en: "Certified Information Security Manager",
    descJa: "ISACA認定の情報セキュリティ管理職向け資格。ガバナンス、リスク管理、セキュリティプログラムの構築・運用、インシデント管理の4ドメインを、事業リスクの観点からマネジメント目線で学ぶ。",
    descEn: "ISACA's management-focused credential covering four domains—governance, risk management, building/operating the security program, and incident management—from a business-risk, managerial perspective.",
    accent: "#9B2D5E",
    deep: "#6E1F44",
    vendor: "ISACA",
    category: "secgov",
    Comp: Station_CISM,
  },
  {
    id: "aaism",
    official: "https://www.isaca.org/credentialing/aaism",
    code: "AAISM",
    ja: "Advanced in AI Security Management",
    en: "Advanced in AI Security Management",
    descJa: "ISACA認定のAIセキュリティ管理の上級資格。AIガバナンスとプログラム管理、AIリスク管理、AI技術と統制の3ドメインで、AI固有の脅威（プロンプトインジェクション・データ汚染等）への対策を管理者目線で学ぶ。",
    descEn: "ISACA's advanced credential for AI security management across three domains—AI governance/program management, AI risk management, and AI technologies/controls—addressing AI-specific threats (prompt injection, data poisoning) from a manager's view.",
    accent: "#C05621",
    deep: "#8A3D12",
    vendor: "ISACA",
    category: "secgov",
    Comp: Station_AAISM,
  },
  {
    id: "aair",
    official: "https://www.isaca.org/credentialing/aair",
    code: "AAIR",
    ja: "Advanced in AI Risk",
    en: "Advanced in AI Risk",
    descJa: "ISACA認定のAIリスク管理の上級資格。AIリスクガバナンスとフレームワーク統合、AIライフサイクルリスク管理、AIリスクプログラム管理の3領域で、AI導入に伴うリスクを識別・評価・対応・監視する能力を学ぶ。",
    descEn: "ISACA's advanced credential for AI risk professionals across three practice areas—AI risk governance and framework integration, AI lifecycle risk management, and AI risk program management—covering the full risk lifecycle of AI adoption.",
    accent: "#B7791F",
    deep: "#8A5B12",
    vendor: "ISACA",
    category: "secgov",
    Comp: Station_AAIR,
  },
  {
    id: "aaia",
    official: "https://www.isaca.org/credentialing/aaia",
    code: "AAIA",
    ja: "Advanced in AI Audit",
    en: "Advanced in AI Audit",
    descJa: "ISACA認定のAI監査の上級資格。AIガバナンスとリスク、AIオペレーション、AI監査のツールと技法の3ドメインで、AIシステムを独立した立場で検証・保証する能力を学ぶ。",
    descEn: "ISACA's advanced credential for AI auditors across three domains—AI governance & risk, AI operations, and AI auditing tools & techniques—covering how to independently verify and provide assurance over AI systems.",
    accent: "#455A64",
    deep: "#2E3B42",
    vendor: "ISACA",
    category: "secgov",
    Comp: Station_AAIA,
  },
  {
    id: "cisa",
    official: "https://www.isaca.org/credentialing/cisa/get-cisa-certified",
    code: "CISA",
    ja: "Certified Information Systems Auditor",
    en: "Certified Information Systems Auditor",
    descJa: "ISACA認定の情報システム監査の国際資格。監査プロセス、ITガバナンス、システムの取得・開発・実装、運用と事業レジリエンス、情報資産の保護の5ドメイン（2024年8月改定）を体系的に学ぶ。",
    descEn: "ISACA's globally recognized IS audit credential covering five domains (Aug 2024 update)—the audit process, IT governance, systems acquisition/development/implementation, operations & business resilience, and protection of information assets.",
    accent: "#2C5282",
    deep: "#1A365D",
    vendor: "ISACA",
    category: "secgov",
    Comp: Station_CISA,
  },
  {
    id: "govmix",
    code: "GOV MIX",
    ja: "AIガバナンス横断模試",
    en: "Cross-Cert Governance Mock",
    descJa: "セキュリティ・ガバナンス9資格の問題バンクから毎セット45問（各5問）を横断出題。出題元の資格は解答後に表示され、結果は「弱い資格順」で返る。1つの知識が複数試験に効く感覚を作るための混成演習。",
    descEn: "Forty-five questions per set drawn across the nine security & governance banks, five each, with the source certificate revealed only after answering. Results return weakest-certificate-first.",
    accent: "#3ED6A7",
    deep: "#0E7A5F",
    vendor: "統合演習",
    category: "secgov",
    kind: "kit",
    Comp: Station_GovMix,
  },
];

const HUB_L = {
  ja: {
    kicker: "CERTIFICATION HUB",
    subtitle: "AWS・Microsoft（GitHubを含む）・Google Cloud・Anthropicの認定と、AIガバナンス・セキュリティ資格（IAPP・ISACA・PECB・CSA）を横断する統合ダッシュボード。",
    stations: "STATIONS",
    enter: "開く",
    langBtn: "EN",
    back: "← ハブに戻る",
    footer: "各ダッシュボードは独立モジュールとして格納。進捗データはダッシュボードごとに個別管理されます。",
  },
  en: {
    kicker: "CERTIFICATION HUB",
    subtitle: "An integrated dashboard spanning AWS, Microsoft (including GitHub), Google Cloud and Anthropic certifications plus AI governance and security credentials (IAPP, ISACA, PECB, CSA).",
    stations: "STATIONS",
    enter: "Open",
    langBtn: "JA",
    back: "← Back to hub",
    footer: "Each dashboard is stored as an independent module. Progress data is tracked separately per dashboard.",
  },
};

// 資格を Fundamentals → Associate → Professional の3層に構造化。
// ベンダーは各カードのラベルとして引き続き表示。未登録IDは associate 扱い。
// 資格のレベル（公式の位置づけ）。ベンダー内はこの順（基礎→アソシエイト→上級）で並べる。
const CERT_LEVEL = {
  // Fundamentals / Foundational（基礎・入門）
  clf: "fundamentals",   // AWS Certified Cloud Practitioner（Foundational）
  ccaf: "fundamentals",  // Claude Certified Architect – Foundations
  aicx: "fundamentals",  // AI Agent Strategist（入門）
  pl900: "fundamentals", // PL-900 Power Platform Fundamentals
  sc900: "fundamentals", // SC-900 Security, Compliance, and Identity Fundamentals
  dp900: "fundamentals", // DP-900 Azure Data Fundamentals
  gh900: "fundamentals", // GH-900 GitHub Foundations
  // Associate（アソシエイト・実務）
  saa: "associate",   // AWS Solutions Architect – Associate
  ab620: "associate", // AB-620 Copilot Studio ソリューション設計・構築
  sc500: "associate", // SC-500 Cloud and AI Security Engineer Associate
  ab410: "associate", // AB-410 Intelligent Applications Builder Associate
  ai300: "associate", // AI-300 ML Operations Engineer Associate
  ai103: "associate", // AI-103 Azure AI Apps and Agents Developer Associate
  ai200: "associate", // AI-200 Azure AI Cloud Developer Associate
  gh600: "associate", // GH-600 Agentic AI Developer
  gh300: "associate", // GH-300 GitHub Copilot
  adp: "associate",   // ADP Google Cloud Associate Data Practitioner
  agwa: "associate",  // AGWA Associate Google Workspace Administrator
  aigp: "professional", // AIGP AI Governance Professional（IAPP）
  iso42001f: "fundamentals", // ISO/IEC 42001 Foundation（PECB）
  iso42001li: "professional", // ISO/IEC 42001 Lead Implementer（PECB）
  ccsk: "associate", // CCSK v5 Certificate of Cloud Security Knowledge（CSA）
  cism: "professional", // CISM Certified Information Security Manager（ISACA）
  aaism: "professional", // AAISM Advanced in AI Security Management（ISACA）
  aair: "professional", // AAIR Advanced in AI Risk（ISACA）
  aaia: "professional", // AAIA Advanced in AI Audit（ISACA）
  cisa: "professional", // CISA Certified Information Systems Auditor（ISACA）
  // Professional / Expert（上級・アーキテクト）
  ab100: "professional", // AB-100 Agentic AI Business Solutions Architect
};
const LEVEL_RANK = { fundamentals: 0, associate: 1, professional: 2 };
const LEVEL_META = {
  fundamentals: { ja: "Fundamentals", en: "Fundamentals", color: "#3ED6A7" },
  associate: { ja: "Associate", en: "Associate", color: "#4C9BE8" },
  professional: { ja: "Professional", en: "Professional", color: "#E08A5B" },
};

// 取得のハードル（すべて個人が取得する資格。組織認証ではない）。
// tier: open=前提資格なし・誰でも受験可 / experience=受験は可だが正式認定に実務経験 / prereq=先に別資格が必要
// 控えめに表示するための短いラベルと、詳細を伝える tip を持つ。
const CERT_ELIGIBILITY = {
  aigp:       { tier: "open",       label: "Open entry",          tipJa: "個人が取得する資格。前提資格・実務経験なしで受験・取得できます（IAPP）。（2026年10月確認）", tipEn: "Individual credential — no prerequisite or experience required (IAPP). (checked October 2026)" },
  iso42001f:  { tier: "open",       label: "Open entry",          tipJa: "個人向けのFoundation資格。前提なしで受験・取得できます。ISO 42001は組織の認証もありますが、これは人が取る資格です（PECB）。（2026年10月確認）", tipEn: "Individual Foundation credential, no prerequisite. ISO 42001 also certifies organizations, but this is the personal one (PECB). (checked October 2026)" },
  ccsk:       { tier: "open",       label: "Open entry",          tipJa: "個人が取得するオンライン試験。前提資格・実務経験なしで受験・取得できます（CSA）。（2026年10月確認）", tipEn: "Individual online exam — no prerequisite or experience required (CSA). (checked October 2026)" },
  iso42001li: { tier: "experience", label: "Experience required", tipJa: "個人が取得する上級資格。受験は可能ですが、正式認定には実務経験が必要です（PECB）。（2026年10月確認）", tipEn: "Individual advanced credential. Exam is open; formal certification needs professional experience (PECB). (checked October 2026)" },
  cism:       { tier: "experience", label: "Experience required", tipJa: "個人が取得する資格。受験は誰でも可能ですが、正式認定には情報セキュリティ管理の実務約5年が必要（一部免除あり）（ISACA）。（2026年10月確認）", tipEn: "Individual credential. Anyone can sit the exam; certification needs ~5 yrs of infosec-management experience (waivers apply) (ISACA). (checked October 2026)" },
  cisa:       { tier: "experience", label: "Experience required", tipJa: "個人が取得する資格。受験は誰でも可能ですが、正式認定にはIS監査等の実務約5年が必要（一部免除あり）（ISACA）。（2026年10月確認）", tipEn: "Individual credential. Anyone can sit the exam; certification needs ~5 yrs of IS-audit experience (waivers apply) (ISACA). (checked October 2026)" },
  aaism:      { tier: "prereq",     label: "Prior cert required", tipJa: "個人が取得する上級資格。受験にはCISMまたはCISSPの保有が前提です（ISACA）。（2026年10月確認）", tipEn: "Individual advanced credential — requires holding CISM or CISSP first (ISACA). (checked October 2026)" },
  aair:       { tier: "prereq",     label: "Prior cert required", tipJa: "個人が取得する上級資格。受験にはCISA/CISM/CRISC/CISSP等（対象資格のいずれか）の保有が前提です（ISACA）。（2026年10月確認）", tipEn: "Individual advanced credential — requires one qualifying cert first (CISA/CISM/CRISC/CISSP, etc.) (ISACA). (checked October 2026)" },
  aaia:       { tier: "prereq",     label: "Prior cert required", tipJa: "個人が取得する上級資格。受験にはCISAの保有、またはIT監査・ITアドバイザリーの職務にあるCIA・米国公認会計士（CPA）等の保有が前提です（ISACA）。（2026年10月確認）", tipEn: "Individual advanced credential — requires holding CISA, or CIA / US CPA etc. while in an IT audit or IT advisory role (ISACA). (checked October 2026)" },
};

// 資格はベンダー別にグルーピングする（Microsoft は Microsoft でまとめる）。
const HUB_CATEGORIES = [
  { id: "aws", ja: "AWS", en: "AWS", accent: "#FF9900" },
  { id: "microsoft", ja: "Microsoft", en: "Microsoft", accent: "#1F6FEB" },
  { id: "googlecloud", ja: "Google Cloud", en: "Google Cloud", accent: "#1A73E8" },
  { id: "anthropic", ja: "Anthropic", en: "Anthropic", accent: "#C8633F" },
  { id: "others", ja: "Others", en: "Others", accent: "#2563EB" },
  { id: "secgov", ja: "セキュリティ・ガバナンス", en: "Security & Governance", accent: "#5B54C9" },
];

const OVM_CERTS = {
  iso42001f: { c: "#0E8A6E", n: "ISO 42001 F",
    d: ["AIMS（AIマネジメントシステム）の言葉を最初に入れる資格。Clause 4〜10・Annex A・SoA という規格の骨格を持っておくと、AIGP のガバナンス実装も LI の文書問題も読み物として楽になる", "The vocabulary certificate: carry Clauses 4-10, Annex A and the SoA and both AIGP's governance material and LI's documentation questions become readable"] },
  ccsk: { c: "#0E9AA7", n: "CCSK v5",
    d: ["クラウドの責任共有と統制の語彙。AIの統制はクラウド統制の上に載るので、ここが薄いと AAISM の技術文脈が宙に浮く", "Shared responsibility and the control vocabulary of cloud. AI controls sit on cloud controls, so a thin base here leaves AAISM's technical context floating"] },
  aigp: { c: "#5B54C9", n: "AIGP",
    d: ["法規制（EU AI Act・GDPR）とガバナンス実装の中核。ここを深くやると、AAIR のガバナンス領域と ISO の原則論はかなり再利用できる — 9資格の中で「他への波及」が最も大きい", "The regulatory and governance core. Study it deeply and AAIR's governance area and ISO's principles largely reuse — the highest spillover of the nine"] },
  cism: { c: "#9B2D5E", n: "CISM",
    d: ["マネジメント視点の情報セキュリティ4ドメイン。AAISM の受験前提。実務経験が認定要件なので、受験時期は経験年数から逆算する", "Management-viewpoint security across four domains, and the prerequisite for AAISM. Certification needs experience, so schedule backwards from your years"] },
  cisa: { c: "#2C5282", n: "CISA",
    d: ["監査プロセスの型。AAIA の受験前提。監査の語彙（証跡・保証・独立性）は AAIA だけでなく統制設計の説明力にも効く", "The audit-process discipline and the prerequisite for AAIA. Audit vocabulary — evidence, assurance, independence — also powers control-design explanations"] },
  iso42001li: { c: "#1569A6", n: "ISO 42001 LI",
    d: ["F の上位で、AIMS 実装プロジェクトを主導する側の資格。認定には実務経験が要る。F→LI は同じ規格の深掘りなので教材の再利用率が最も高い", "The implementation-lead tier above F, requiring experience for certification. F to LI is the same standard deepened — the highest material-reuse pair"] },
  aaism: { c: "#C05621", n: "AAISM",
    d: ["AI固有の脅威（プロンプトインジェクション・エージェント権限）と統制。CISM または CISSP の保有が受験前提", "AI-specific threats and controls — prompt injection, agent permissions. Holding CISM or CISSP is the exam prerequisite"] },
  aair: { c: "#B7791F", n: "AAIR",
    d: ["AIリスクの3領域（ガバナンス統合・ライフサイクル・プログラム管理）。対象資格（CISA/CISM/CRISC/CISSP等）のいずれか保有が前提", "AI risk across three areas. Holding one of the qualifying certs (CISA, CISM, CRISC, CISSP and others) is the prerequisite"] },
  aaia: { c: "#455A64", n: "AAIA",
    d: ["AIシステムを独立した立場で検証・保証する監査資格。CISA または CIA 等の保有が前提", "Independent verification and assurance over AI systems. Holding CISA or CIA (among others) is the prerequisite"] },
};
const OVM_BANDS = [
  { t: ["① 前提なし — 今日から受けられる", "1. No prerequisites - start today"], ids: ["iso42001f", "ccsk", "aigp"] },
  { t: ["② 認定に実務経験", "2. Experience for certification"], ids: ["cism", "cisa", "iso42001li"] },
  { t: ["③ 先に別資格が必要", "3. Prior certificate required"], ids: ["aaism", "aaia", "aair"] },
];
const OVM_ARROWS = [["cism", "aaism", ""], ["cisa", "aaia", ""], ["cism", "aair", ""], ["cisa", "aair", ""], ["iso42001f", "iso42001li", "同系"]];
const OVM_TOPICS = [
  { t: ["ガバナンス体制（方針・役割・監督）", "Governance structures"], m: { aigp: 2, iso42001f: 2, iso42001li: 2, aaism: 1, aair: 1, aaia: 1, cism: 1 } },
  { t: ["AIリスク評価・影響評価", "AI risk and impact assessment"], m: { aair: 2, iso42001f: 2, aigp: 2, aaism: 1, aaia: 1, iso42001li: 1 } },
  { t: ["AI規制（EU AI Act・各国法）", "AI regulation"], m: { aigp: 2, aair: 1, iso42001f: 1, aaia: 1 } },
  { t: ["AI固有の脅威と統制", "AI-specific threats and controls"], m: { aaism: 2, ccsk: 1, aaia: 1, aair: 1 } },
  { t: ["クラウドセキュリティ基盤", "Cloud security foundations"], m: { ccsk: 2, cism: 1, aaism: 1 } },
  { t: ["監査・保証・証跡", "Audit, assurance, evidence"], m: { cisa: 2, aaia: 2, iso42001li: 1, cism: 1 } },
  { t: ["マネジメントシステム（PDCA・SoA）", "Management systems (PDCA, SoA)"], m: { iso42001f: 2, iso42001li: 2, cism: 1, aigp: 1 } },
  { t: ["インシデント管理", "Incident management"], m: { cism: 2, aaism: 1, ccsk: 1 } },
];

function CertOverlapMap({ lang }) {
  const ja = lang === "ja";
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState("aigp");
  const [topic, setTopic] = useState(0);
  const ids = Object.keys(OVM_CERTS);
  const cert = OVM_CERTS[sel];
  const pos = {};
  OVM_BANDS.forEach((b, ci) => b.ids.forEach((id, ri) => { pos[id] = { x: 10 + ci * 152, y: 40 + ri * 58 }; }));
  const tp = OVM_TOPICS[topic];
  return (
    <div style={{ background: HUB.panel, border: `1px solid ${HUB.border}`, borderRadius: 14, marginTop: 26, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", color: HUB.ink, padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 800 }}>{ja ? "セキュリティ・ガバナンス9資格の重なりマップ — 学習順序の設計" : "Overlap Map for the Nine Security & Governance Certifications"}</span>
        <span style={{ marginLeft: "auto", fontSize: 18, color: HUB.signal }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontSize: 12, color: HUB.sub, lineHeight: 1.7, marginBottom: 12 }}>
            {ja ? "9資格を「受けられる順」に3列で置き、前提の矢印を重ねた地図。重なりの評価はこのアプリの見立てであり、出題範囲は必ず各公式の試験要項（Exam Content Outline）で確認すること。" : "The nine certificates laid out in the order you can actually take them, with prerequisite arrows. The overlap ratings are this app's own reading — always verify scope against each official exam content outline."}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            <svg viewBox="0 0 460 226" style={{ width: "100%", maxWidth: 520 }} role="img" aria-label={ja ? "資格の順序マップ" : "certification order map"}>
              <defs>
                <marker id="ovmA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={HUB.sub} />
                </marker>
              </defs>
              {OVM_BANDS.map((b, ci) => (
                <text key={ci} x={10 + ci * 152 + 66} y={20} textAnchor="middle" fill={HUB.sub} fontSize="8" fontWeight="800">{b.t[ja ? 0 : 1]}</text>
              ))}
              {OVM_ARROWS.map(([f, t2, lb], k) => {
                const a = pos[f], b2 = pos[t2];
                const x1 = a.x + 132, y1 = a.y + 21, x2 = b2.x, y2 = b2.y + 21;
                return (
                  <g key={k}>
                    <line x1={x1} y1={y1} x2={x2 - 2} y2={y2} stroke={HUB.sub} strokeWidth="1" opacity="0.75" markerEnd="url(#ovmA)" strokeDasharray={lb ? "4 3" : "0"} />
                    {lb ? <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 4} textAnchor="middle" fill={HUB.sub} fontSize="7">{lb}</text> : null}
                  </g>
                );
              })}
              {ids.map((id) => {
                const p2 = pos[id], c2 = OVM_CERTS[id], on = sel === id, cov = tp.m[id] || 0;
                return (
                  <g key={id} className="gh-node" onClick={() => setSel(id)} role="button" tabIndex={0}
                    onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(id); } }}>
                    <rect x={p2.x} y={p2.y} width="132" height="42" rx="7" fill={on ? c2.c : HUB.bg} fillOpacity={on ? 0.35 : 1} stroke={c2.c} strokeWidth={on ? 2.2 : 1.3} />
                    <text x={p2.x + 66} y={p2.y + 19} textAnchor="middle" fill={c2.c} fontSize="9.5" fontWeight="800">{c2.n}</text>
                    <text x={p2.x + 66} y={p2.y + 33} textAnchor="middle" fill={cov === 2 ? HUB.signal : cov === 1 ? HUB.sub : "#33465C"} fontSize="8.5" fontWeight="700">{cov === 2 ? (ja ? "◎ 主戦場" : "◎ core") : cov === 1 ? (ja ? "○ 一部重複" : "○ partial") : "—"}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div style={{ fontSize: 10.5, color: HUB.sub, textAlign: "center", marginBottom: 12 }}>{ja ? "下のトピックを選ぶと、各資格の◎○が切り替わる。資格をクリックすると解説。" : "Pick a topic below to recolor the map; click a certificate for its note."}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {OVM_TOPICS.map((x, k) => (
              <button key={k} onClick={() => setTopic(k)}
                style={{ background: topic === k ? HUB.signal : "transparent", border: `1px solid ${topic === k ? HUB.signal : HUB.border}`, color: topic === k ? "#06251B" : HUB.sub, borderRadius: 999, padding: "4px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                {x.t[ja ? 0 : 1]}
              </button>
            ))}
          </div>
          <div style={{ background: HUB.bg, border: `1px solid ${OVM_CERTS[sel].c}`, borderLeft: `3px solid ${OVM_CERTS[sel].c}`, borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: OVM_CERTS[sel].c, marginBottom: 4 }}>{cert.n}</div>
            <div style={{ fontSize: 12, color: HUB.ink, lineHeight: 1.7 }}>{cert.d[ja ? 0 : 1]}</div>
          </div>
          <div style={{ fontSize: 12, color: HUB.sub, lineHeight: 1.75 }}>
            {ja ? "使い方：◎が同じトピックに並ぶ資格は教材と記憶を共有できるので、1つを深く→残りへ薄く広げるのが最短。順序の例 — ISO 42001 F → AIGP（CCSK を並行）→ CISM → AAISM／AAIR。監査側へ行くなら CISA → AAIA。②③列は実務経験・前提資格が要件なので、受験時期はそこから逆算する。" : "How to use it: certificates sharing a ◎ share material and memory, so go deep on one and spread thin to the rest. One sequence — ISO 42001 F, then AIGP (CCSK in parallel), then CISM, then AAISM or AAIR; for the audit line, CISA then AAIA. Columns two and three carry experience or prerequisite requirements, so schedule backwards from those."}
          </div>
        </div>
      )}
    </div>
  );
}

// 公式ページで試験の現行版を確かめた結果（既定は2026-11-01。4つ目の要素があればその日付に確認）。kind: changed=出題範囲の改定あり / ok=改定・廃止の告知なし / none=公式ページを確認できず。
// Microsoft・GitHub は Microsoft Learn の試験ガイド、AWS・Google・IAPP は公式ページで確認。ここに書くのは公式ページに書いてあったことだけ。
// 各資格の公式ページを確かめた記録（画面には出さない。保守用の控え）
const CERT_CHECK_DATE = "2026-11-01";
const CERT_CHECK = {
  clf: ["ok", "公式ページで提供中を確認。試験ガイドの版・日付はページに記載なし。", "Confirmed as offered on the official page. The page gives no exam-guide version or date."],
  saa: ["ok", "公式ページで提供中を確認。英語版に変更を反映したとの記載はあるが、日付・内容の記載なし。", "Confirmed as offered. The page mentions a change applied to the English exam but gives no date or detail."],
  pl900: ["changed", "2026年7月24日に出題範囲を改定（英語版。他の言語は約8週間後に更新とされる）。Power Pages の分野とキャンバス／モデル駆動アプリの作成を削除し、「Copilot Studio のエージェント」（20〜25%）を追加。このページは改定後の5分野に組み替え済み。旧 Power Pages の問題は「旧範囲」として残し、模擬試験と通常の出題からは外している。", "Skills measured changed on 24 July 2026 (English first; other languages about eight weeks later). Power Pages and building canvas/model-driven apps were removed, and 'agents in Copilot Studio' (20–25%) was added. This station now follows the five revised domains; the old Power Pages questions are kept as 'old scope' and left out of the mock exams and regular sets."],
  sc900: ["changed", "2026年10月21日に小さな改定（Entra の ID の種類、Defender XDR の項目）。改定された項目は既存の問題でそろっていることを確かめ、ワークロード ID と Microsoft Threat Intelligence の問題を8問足した。", "Minor update on 21 October 2026 (Entra identity types, Defender XDR). The changed areas were already covered; 8 questions on workload identities and Microsoft Threat Intelligence were added.", "2026-11-02"],
  dp900: ["changed", "2026年7月21日に小さな改定（データの表し方・Azure Storage・リアルタイム分析の項目）。手薄だったリアルタイム分析（Microsoft Fabric Real-Time Intelligence、Spark Structured Streaming）と Azure Files・Table storage の問題を20問足した。", "Minor update on 21 July 2026 (data representation, Azure Storage, real-time analytics). 20 questions were added where coverage was thin: Microsoft Fabric Real-Time Intelligence, Spark Structured Streaming, Azure Files and Table storage.", "2026-11-02"],
  gh300: ["changed", "2026年8月7日に小さな改定（IDE での利用、機能、安全策の項目）。追加は計125問：クラウドエージェントのセッションとチャットのコンテキストの上限（12問）と、GitHub Docs を根拠にした Agent Sessions・Sub-Agents・Spaces・コードレビューの指示ファイル・Chat の制限とフィードバック・Copilot CLI（導入、対話とセッション、スクリプトとファイル操作）・Code Review のポリシー・IDE と github.com での機能の提供範囲・結合テスト・エディタ設定（113問）。Spark は GitHub Docs のページが「github.com 上の GitHub Spark の廃止予告」（2026年8月4日付の Changelog。本文はこの環境から読めず未確認）へ転送されるため問題を足さず、既存3問の解説に注記した。旧 gh copilot 拡張を扱う既存問題にも、現行の Copilot CLI との違いを解説に注記した。", "Minor update on 7 August 2026 (IDE usage, features, safeguards). 125 questions added in total: 12 on cloud-agent sessions and chat context limits, and 113 grounded in GitHub Docs on agent sessions, sub-agents, Spaces, code-review instruction files, Chat limits and feedback, Copilot CLI (install, interactive use and sessions, scripts and files), Code Review policies, feature availability across IDEs and github.com, integration tests and editor settings. No Spark questions were added: its GitHub Docs page redirects to a GitHub Changelog post on the upcoming deprecation of GitHub Spark on github.com (4 August 2026; the post could not be read from here). The 3 existing Spark questions and the questions on the older gh copilot extension carry a note in their explanations.", "2026-11-03"],
  gh900: ["changed", "2026年1月に大きく改定（認定ページの更新日 2026-02-19）。7分野の名前と比率は改定後の試験ガイドと一致。手薄だった項目（Copilot のエージェントとマルチモデル、GitHub Mobile、Feature preview、Wiki、InnerSource）の問題を49問足した。改定後の項目に名前のない既存の問題（GitHub Advanced Security など約50問）は、関連範囲として残している。", "Major update in January 2026 (certification page updated 2026-02-19). The seven domains and weights match the revised guide. 49 questions were added for thin areas (Copilot agents and multi-model, GitHub Mobile, Feature preview, wikis, InnerSource). About 50 older questions on topics the revised list doesn't name (such as GitHub Advanced Security) are kept as related material.", "2026-11-02"],
  ab100: ["changed", "2026年11月16日から新しい出題範囲（英語版。他の言語は約8週間後に更新とされる）。比率は 計画 35〜40%・設計 30〜35%・展開 20〜25%（以前は 25〜30・25〜30・40〜45%）。このページの比率と模擬試験の配分は新しい範囲に合わせた。日本語で受験する場合、日本語版が更新されるまでは以前の比率の可能性がある。計画（D1）の問題が配点に比べて少なかったため、Microsoft Learn を根拠に計画の問題を107問足した。", "New skills measured from 16 November 2026 (English first; other languages about eight weeks later). Weights: Plan 35–40%, Design 30–35%, Deploy 20–25% (previously 25–30/25–30/40–45). This station's weights and mock-exam mix follow the new outline. Exams in other languages may use the previous weights until they are updated. Because Plan (D1) had few questions for its weight, 107 Plan questions grounded in Microsoft Learn were added.", "2026-11-03"],
  ai103: ["ok", "出題範囲は2026年4月16日時点のもの。改定・廃止の告知なし。", "Skills measured as of 16 April 2026. No change or retirement notice."],
  ab620: ["ok", "改定・廃止の告知なし（出題範囲の日付はページに記載なし）。", "No change or retirement notice (no skills-measured date on the page)."],
  sc500: ["ok", "改定・廃止の告知なし（出題範囲の日付はページに記載なし）。", "No change or retirement notice (no skills-measured date on the page)."],
  ab410: ["ok", "改定・廃止の告知なし（出題範囲の日付はページに記載なし）。", "No change or retirement notice (no skills-measured date on the page)."],
  ai300: ["ok", "改定・廃止の告知なし（出題範囲の日付はページに記載なし）。", "No change or retirement notice (no skills-measured date on the page)."],
  ai200: ["ok", "改定・廃止の告知なし（出題範囲の日付はページに記載なし）。", "No change or retirement notice (no skills-measured date on the page)."],
  gh600: ["ok", "改定・廃止の告知なし（出題範囲の日付はページに記載なし）。", "No change or retirement notice (no skills-measured date on the page)."],
  adp: ["changed", "公式ページに「ブランド名の変更を反映して近く更新」とある（日付の記載なし）。", "The official page says the exam will soon be updated for recent branding changes (no date given)."],
  agwa: ["ok", "2026-11-17 に公式ページで提供中を確認（2時間・50〜60問・$125・英語と日本語）。日本語の試験ガイド（PDF）に版や日付の記載なし。", "Confirmed as offered on the official page on 2026-11-17 (2 hours, 50-60 questions, $125, English and Japanese). The Japanese exam guide PDF shows no version or date."],
  aigp: ["ok", "公式ページから BoK（PDF）を確認。現行は v2.1（2026年2月2日発効・4ドメイン）。出題数の範囲は D1 16〜20／D2 19〜23／D3 21〜25／D4 21〜25問。", "BoK (PDF) linked from the official page checked: v2.1, effective 2 Feb 2026, four domains; question ranges D1 16–20, D2 19–23, D3 21–25, D4 21–25.", "2026-11-12"],
  // 以下の10資格は 2026-11-02 に公式ページで確認（それまでは公式サイトに接続できず未確認だった）
  ccaf: ["ok", "公式の試験ガイド（Version 1.0・2026年7月から有効・試験コード CCAR-F）の5分野と比率は、このページと一致。60問・120分・合格はスケールスコア720（100〜1,000）。受験は Claude Partner Network の組織に限られる。", "Matches the official exam guide (Version 1.0, effective July 2026, exam code CCAR-F): five domains and weights. 60 items, 120 minutes, passing scaled score 720 (100–1,000). Available only to organizations in the Claude Partner Network.", "2026-11-02"],
  aicx: ["changed", "公式シラバスは2026年8月に Version 1.3 へ改訂（Section 3・20・27 の記述を整理）。シラバスは6章・32セクションで、分野ごとの出題比率は公表されていない。このページの6分野は公式の6章に対応する（名前を章名に合わせた）。改訂の中身がこのページに反映されているかは未確認。試験時間は第2回から90分（従来75分）。", "Official syllabus revised to Version 1.3 in August 2026 (Sections 3, 20 and 27). It has 6 chapters and 32 sections and publishes no weights per area. This station's six areas follow the six chapters (names aligned). Whether the revision is reflected here is not checked. Exam time is 90 minutes from the 2nd sitting (formerly 75).", "2026-11-02"],
  iso42001f: ["ok", "改定・廃止の告知なし。公式の試験範囲は2つの能力領域（AIMS の基本原則と概念／AIMS）で、比率は公表されていない。このページの5区分と比率は学習用の目安。", "No change or retirement notice. The official exam covers two competency domains (fundamental principles and concepts of an AIMS; the AIMS) with no published weights. This station's five areas and weights are a study guide only.", "2026-11-02"],
  iso42001li: ["ok", "改定・廃止の告知なし。公式の認証スキーム文書（v1.2・2026年3月16日）では6領域・80問・3時間・合格70%。領域ごとの出題数は17・5・20・18・10・10問で、このページの比率をこれに合わせて直した。", "No change or retirement notice. The official certification scheme (v1.2, 16 March 2026): six domains, 80 questions, 3 hours, pass mark 70%. Questions per domain are 17/5/20/18/10/10; this station's weights were corrected to match.", "2026-11-02"],
  ccsk: ["ok", "改定・廃止の告知なし。CCSK v5 の公式は12分野で、比率は公表されていない。このページは12分野を6つにまとめた学習用の区分で（各分野の横に対応する公式の分野番号を表示）、公式の D4『組織管理』に当たる区分はない。60問・120分・合格80%・オープンブック（同じページの別の箇所には90分ともある）。", "No change or retirement notice. CCSK v5 has 12 official domains with no published weights. This station groups them into six study areas (the matching official domain numbers are shown next to each area); official D4 'Organization Management' has no group here. 60 questions, 120 minutes, pass mark 80%, open book (the same page also mentions 90 minutes).", "2026-11-02"],
  cism: ["changed", "2026年11月3日から新しい出題範囲（ISACA の2026年9月10日の発表）。4分野は変わらず、比率は D1 18%・D2 20%・D3 33%・D4 29%（11月2日までは17・20・33・30%）。このページの比率は新しい値に合わせた。新たに加わる『エンタープライズアーキテクチャ』と『情報セキュリティアーキテクチャ』がどの分野に入るかは未確認で、この2つの問題はまだない。2026年11月3日時点でも ISACA の出題範囲のページ本文は旧版のままで、詳細は support.isaca.org の記事に案内されているが、この環境ではその記事を表示できず未確認。", "New exam content outline from 3 November 2026 (ISACA announcement, 10 September 2026). The four domains stay; weights become D1 18%, D2 20%, D3 33%, D4 29% (17/20/33/30 until 2 November). This station uses the new weights. Two content areas are added — enterprise architecture and information security architecture; which domain they sit in is not confirmed, and this station has no questions on them yet. As of 3 November 2026 the body of ISACA's exam content outline page still shows the old outline; it points to a support.isaca.org article for details, which could not be displayed from here.", "2026-11-03"],
  cisa: ["ok", "改定・廃止の告知なし。公式の5分野と比率（18・18・12・26・26%）はこのページと一致。", "No change or retirement notice. The five official domains and weights (18/18/12/26/26%) match this station.", "2026-11-02"],
  aaism: ["ok", "改定・廃止の告知なし。公式の3分野と比率（31・31・38%）はこのページと一致。", "No change or retirement notice. The three official domains and weights (31/31/38%) match this station.", "2026-11-02"],
  aair: ["ok", "改定・廃止の告知なし。公式の比率は D1 37%・D2 21%・D3 42%。このページの比率（約34・33・33%）は誤りだったので、公式の値に直した。", "No change or retirement notice. Official weights are D1 37%, D2 21%, D3 42%; this station had about 34/33/33%, now corrected.", "2026-11-02"],
  aaia: ["ok", "改定・廃止の告知なし。公式の3分野と比率（33・46・21%）はこのページと一致。", "No change or retirement notice. The three official domains and weights (33/46/21%) match this station.", "2026-11-02"],
};
// 公式の学習コンテンツ（2026-11-03 に Microsoft Learn で確認）。res は試験ガイドの「Study resources」節。
// doms は分野ごとの学習パス・モジュール等で、公式の Fundamentals 学習パスか、試験ガイド自身が案内しているものがある資格だけに載せる
// （docs.github.com のリンクは GitHub 試験の試験ガイドに載っているもの）。
const CERT_STUDY = {"pl900":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900#study-resources","doms":[["D1",["Power Platform のビジネス価値","Power Platform のビジネス価値"],[["PL-900: Microsoft Power Platform Fundamentals","https://learn.microsoft.com/training/paths/power-plat-fundamentals/"],["Describe the business value of the Microsoft Power Platform","https://learn.microsoft.com/training/modules/introduction-power-platform/"]]],["D2",["Power Platform 環境の管理（Dataverse・管理とガバナンス）","Power Platform 環境の管理（Dataverse・管理とガバナンス）"],[["Identify foundational components of Microsoft Power Platform","https://learn.microsoft.com/training/modules/identify-foundational-components-microsoft-power-platfor/"]]],["D3",["Power Apps の機能","Power Apps の機能"],[["Describe how to build applications with Microsoft Power Apps","https://learn.microsoft.com/training/modules/introduction-power-apps/"]]],["D4",["Power Automate の機能","Power Automate の機能"],[["Describe building automation with Microsoft Power Automate","https://learn.microsoft.com/training/modules/introduction-power-automate/"]]],["D5",["Copilot Studio のエージェント","Copilot Studio のエージェント"],[["Describe the AI authoring experience in Power Platform","https://learn.microsoft.com/training/modules/describe-ai-authoring-experience-power-platform/"]]]]},"ab620":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-620#study-resources"},"sc500":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-500#study-resources"},"sc900":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900#study-resources","doms":[["D1",["セキュリティ・コンプライアンス・ID の概念","Concepts of Security, Compliance, and Identity"],[["Introduction to security, compliance, and identity concepts","https://learn.microsoft.com/training/paths/describe-concepts-of-security-compliance-identity/"]]],["D2",["Microsoft Entra の機能","Capabilities of Microsoft Entra"],[["Introduction to Microsoft Entra","https://learn.microsoft.com/training/paths/describe-capabilities-of-microsoft-identity-access/"]]],["D3",["Microsoft セキュリティ ソリューションの機能","Capabilities of Microsoft Security Solutions"],[["Introduction to Microsoft security solutions","https://learn.microsoft.com/training/paths/describe-capabilities-of-microsoft-security-solutions/"]]],["D4",["Microsoft コンプライアンス ソリューションの機能","Capabilities of Microsoft Compliance Solutions"],[["Introduction to Microsoft Priva and Microsoft Purview","https://learn.microsoft.com/training/paths/describe-capabilities-of-microsoft-compliance-solutions/"]]]]},"gh600":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-600#study-resources","doms":[["D1",["エージェントアーキテクチャとSDLCの準備","Prepare Agent Architecture & SDLC"],[["Foundations of Agentic AI in GitHub","https://learn.microsoft.com/training/modules/foundations-agentic-ai/"],["Designing Agent Architecture and SDLC Integration","https://learn.microsoft.com/training/modules/design-agent-architecture-integration/"],["Prepare agent architecture and SDLC processes (docs.github.com)","https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents"]]],["D2",["ツール使用と環境操作の実装","Implement Tool Use & Environment Interaction"],[["Tooling, MCP, and Agent Execution Environments","https://learn.microsoft.com/training/modules/agent-tooling-mcp-execution-environments/"],["Implement tool use and environment interaction (docs.github.com)","https://docs.github.com/copilot/how-tos/copilot-sdk/use-copilot-sdk/custom-agents"]]],["D3",["メモリ・状態・実行の管理","Manage Memory, State & Execution"],[["Manage memory, state, and execution (docs.github.com)","https://docs.github.com/copilot/concepts/agents/copilot-memory"]]],["D4",["評価・エラー分析・チューニング","Evaluation, Error Analysis & Tuning"],[["Perform evaluation, error analysis, and tuning (docs.github.com)","https://docs.github.com/copilot/tutorials/customization-library/custom-agents/implementation-planner"]]],["D5",["マルチエージェント連携のオーケストレーション","Orchestrate Multi-agent Coordination"],[["Orchestrate multi-agent coordination (docs.github.com)","https://docs.github.com/copilot/how-tos/copilot-sdk/use-copilot-sdk/custom-agents"]]],["D6",["ガードレールと説明責任の実装","Implement Guardrails & Accountability"],[["Implement guardrails and accountability: build guardrails (docs.github.com)","https://docs.github.com/copilot/tutorials/cloud-agent/build-guardrails"],["Cloud agent risks and mitigations (docs.github.com)","https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations"]]]]},"ab100":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100#study-resources"},"ab410":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-410#study-resources"},"ai300":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-300#study-resources"},"ai103":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103#study-resources"},"ai200":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-200#study-resources"},"gh900":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-900#study-resources","doms":[["D1",["Git と GitHub の基礎","Understand Git & GitHub basics"],[["GitHub Foundations Part 1 of 2","https://learn.microsoft.com/training/paths/github-foundations/"],["Introduction to Git","https://learn.microsoft.com/training/modules/intro-to-git/"],["Introduction to Git and GitHub (docs.github.com)","https://docs.github.com/get-started"]]],["D2",["GitHubリポジトリの操作","Work with GitHub repositories"],[["Introduction to GitHub","https://learn.microsoft.com/training/modules/introduction-to-github/"],["Working with GitHub repositories (docs.github.com)","https://docs.github.com/repositories"]]],["D3",["GitHubでのコラボレーション","Collaborate using GitHub"],[["Manage repository changes by using pull requests on GitHub","https://learn.microsoft.com/training/modules/manage-changes-pull-requests-github/"],["Communicate effectively on GitHub using Markdown","https://learn.microsoft.com/training/modules/communicate-using-markdown/"],["Issues (docs.github.com)","https://docs.github.com/issues"],["Pull requests (docs.github.com)","https://docs.github.com/pull-requests"],["Discussions (docs.github.com)","https://docs.github.com/discussions"]]],["D4",["モダン開発プラクティス","Apply modern development practices"],[["Code with GitHub Codespaces","https://learn.microsoft.com/training/modules/code-with-github-codespaces/"],["Introduction to GitHub Copilot","https://learn.microsoft.com/training/modules/introduction-to-github-copilot/"],["GitHub Actions (docs.github.com)","https://docs.github.com/actions"],["GitHub Copilot (docs.github.com)","https://docs.github.com/copilot"],["GitHub Codespaces (docs.github.com)","https://docs.github.com/codespaces"]]],["D5",["GitHubでのプロジェクト管理","Manage projects with GitHub"],[["Manage your work with GitHub Projects","https://learn.microsoft.com/training/modules/manage-work-github-projects/"],["Planning and tracking with Projects (docs.github.com)","https://docs.github.com/issues/planning-and-tracking-with-projects"]]],["D6",["プライバシー・セキュリティ・管理","Privacy, security & administration"],[["Introduction to GitHub administration","https://learn.microsoft.com/training/modules/github-introduction-administration/"],["Authenticate and authorize user identities on GitHub","https://learn.microsoft.com/training/modules/authenticate-authorize-user-identities-github/"],["Maintain a secure repository by using GitHub best practices","https://learn.microsoft.com/training/modules/maintain-secure-repository-github/"]]],["D7",["GitHubコミュニティ","Explore the GitHub community"],[["Contribute to an open-source project on GitHub","https://learn.microsoft.com/training/modules/contribute-open-source/"],["Manage an InnerSource program by using GitHub","https://learn.microsoft.com/training/modules/manage-innersource-program-github/"],["Exploring projects on GitHub (docs.github.com)","https://docs.github.com/get-started/exploring-projects-on-github"]]]]},"gh300":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300#study-resources","doms":[["D1",["Copilot を責任を持って使う","Use GitHub Copilot responsibly"],[["Responsible AI with GitHub Copilot","https://learn.microsoft.com/training/modules/responsible-ai-with-github-copilot/"]]],["D2",["GitHub Copilot の機能を使う","Use GitHub Copilot features"],[["GitHub Copilot Fundamentals Part 1 of 2","https://learn.microsoft.com/training/paths/copilot/"],["GitHub Copilot Across Environments: IDE, Chat, and Command Line Techniques","https://learn.microsoft.com/training/modules/github-copilot-across-environments/"],["Using advanced GitHub Copilot features","https://learn.microsoft.com/training/modules/advanced-github-copilot/"]]],["D3",["Copilot のデータとアーキテクチャ","Copilot data & architecture"],[["GitHub Copilot plans and features (docs.github.com)","https://docs.github.com/copilot/about-github-copilot/plans-for-github-copilot"]]],["D4",["プロンプトエンジニアリング","Prompt engineering & context"],[["Introduction to prompt engineering with GitHub Copilot","https://learn.microsoft.com/training/modules/introduction-prompt-engineering-with-github-copilot/"],["Prompt engineering for Copilot Chat (docs.github.com)","https://docs.github.com/copilot/using-github-copilot/copilot-chat/prompt-engineering-for-copilot-chat"]]],["D5",["開発生産性の向上","Improve developer productivity"],[["Developer use cases for AI with GitHub Copilot","https://learn.microsoft.com/training/modules/developer-use-cases-for-ai-with-github-copilot/"],["Develop unit tests using GitHub Copilot tools","https://learn.microsoft.com/training/modules/develop-unit-tests-using-github-copilot-tools/"]]],["D6",["プライバシー・除外・セーフガード","Privacy, exclusions & safeguards"],[["Management and customization considerations with GitHub Copilot","https://learn.microsoft.com/training/modules/github-copilot-management-and-customizations/"],["Configuring and auditing content exclusion (docs.github.com)","https://docs.github.com/copilot/managing-copilot/configuring-and-auditing-content-exclusion"]]]]},"dp900":{"res":"https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900#study-resources","doms":[["D1",["データの中核概念","Core Data Concepts"],[["Introduction to Microsoft Azure Data core data concepts","https://learn.microsoft.com/training/paths/azure-data-fundamentals-explore-core-data-concepts/"]]],["D2",["Azure のリレーショナルデータ","Relational Data on Azure"],[["Introduction to Microsoft Azure Data relational data in Azure","https://learn.microsoft.com/training/paths/azure-data-fundamentals-explore-relational-data/"]]],["D3",["Azure の非リレーショナルデータ","Non-relational Data on Azure"],[["Introduction to Microsoft Azure Data non-relational data in Azure","https://learn.microsoft.com/training/paths/azure-data-fundamentals-explore-non-relational-data/"]]],["D4",["Azure の分析ワークロード","Analytics Workload on Azure"],[["Introduction to Microsoft Azure Data analytics in Azure","https://learn.microsoft.com/training/paths/azure-data-fundamentals-explore-data-warehouse-analytics/"]]]]}};
function CertStudyLinks({ id, lang }) {
  const c = CERT_STUDY[id];
  if (!c) return null;
  const en = lang === "en";
  const a = { color: "#1F5FAE", fontWeight: 700, textDecoration: "none" };
  return (
    <details key={id} style={{ fontSize: 12, lineHeight: 1.6, color: "#3A4652", background: "#F3F7FC", padding: "6px 14px", borderBottom: `1px solid ${HUB.border}` }}>
      <summary style={{ cursor: "pointer", fontWeight: 700 }}>{en ? "Official study content" : "公式の学習コンテンツ"}{c.doms ? (en ? " (by domain)" : "（分野別）") : ""}</summary>
      <div style={{ margin: "4px 0 2px" }}>
        <a href={c.res} target="_blank" rel="noopener noreferrer" style={a}>{en ? "Study resources in the official study guide ↗" : "試験ガイドの学習リソース（Study resources）↗"}</a>
      </div>
      {c.doms ? c.doms.map(([did, nm, ls]) => (
        <div key={did} style={{ margin: "4px 0" }}>
          <div style={{ fontWeight: 700 }}>{did}　{en ? nm[1] : nm[0]}</div>
          <ul style={{ margin: "2px 0 0", paddingLeft: 18 }}>
            {ls.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer" style={a}>{t} ↗</a></li>)}
          </ul>
        </div>
      )) : null}
    </details>
  );
}


// 資格ごとの学習記録（端末内）の保存キー。一覧のカードに解答数と正答率を出すために読む
const CERT_STORE = { clf: "clf_c02_dashboard_v1", saa: "saa_c03_study_v1", ccaf: "cca_f_study_v1", aicx: "aics_study_v2", pl900: "pl900_study_v2", ab620: "ab620_study_v2", sc500: "sc500_study_v1", sc900: "sc900_study_v1", gh600: "gh600_study_v2", ab100: "ab100_study_v2", ab410: "ab410_study_v2", ai300: "ai300_study_v2", ai103: "ai103_study_v1", ai200: "ai200_study_v1", gh900: "gh900_study_v1", gh300: "gh300_study_v1", adp: "adp_study_v3", agwa: "agwa_study_v1", dp900: "dp900_study_v1", aigp: "aigp_hub_study_v1", iso42001f: "iso42001f_hub_study_v1", iso42001li: "iso42001li_hub_study_v1", ccsk: "ccsk_hub_study_v1", cism: "cism_hub_study_v1", cisa: "cisa_hub_study_v1", aaism: "aaism_hub_study_v1", aair: "aair_hub_study_v1", aaia: "aaia_hub_study_v1" };
function certProgress(id) {
  const key = CERT_STORE[id]; if (!key) return null;
  let st = null; try { st = JSON.parse(window.localStorage.getItem(key) || "null"); } catch (e) { return null; }
  if (!st || typeof st !== "object") return { att: 0, cor: 0 };
  if (id === "clf") return (Station_CLF.WEAK_TABLE ? Station_CLF.WEAK_TABLE(st) : []).reduce((t, r) => ({ att: t.att + r.a, cor: t.cor + r.c }), { att: 0, cor: 0 });
  let att = 0, cor = 0;
  Object.values(st.progress || {}).forEach((p) => { if (p && typeof p === "object") { att += Number(p.attempts != null ? p.attempts : p.a) || 0; cor += Number(p.correct != null ? p.correct : p.c) || 0; } });
  return { att, cor };
}

function HubApp() {
  const [active, setActive] = useState(null);
  // 開いている資格を URL に残す（#certification/<資格>）。「戻る」で資格一覧に戻る
  useNovaHubRoute("certification", [active], (p) => setActive(p[0] && HUB_STATIONS.some((s) => s.id === p[0]) ? p[0] : null));
  const [lang, setLangRaw] = useState(() => { const l = (typeof window !== "undefined" && window.__novaLang) || "ja"; try { window.__novaCertLang = l; } catch (e) {} return l; }); // ポータルの言語で開く
  const setLang = (l) => { try { window.__novaCertLang = l; } catch (e) {} setLangRaw(l); }; // 切り替えた言語は、このあと開く資格ページにも引き継ぐ
  const t = HUB_L[lang];
  // 資格の「取得済み」チェック状態（端末内に自動保存）
  const [done, setDone] = useState({});
  // 各資格の解答数と正答率（一覧に戻ったときに読み直す）
  const certProg = useMemo(() => (active ? {} : Object.fromEntries(HUB_STATIONS.map((x) => [x.id, certProgress(x.id)]))), [active]);
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("hub_cert_done_v1");
        if (r && r.value) setDone(JSON.parse(r.value));
      } catch (e) {}
    })();
  }, []);
  const toggleDone = (id, e) => {
    if (e) e.stopPropagation();
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      try { window.storage.set("hub_cert_done_v1", JSON.stringify(next)); } catch (_) {}
      return next;
    });
  };

  if (active) {
    const st = HUB_STATIONS.find((s) => s.id === active);
    const Comp = st.Comp;
    return (
      <div style={{ minHeight: "100vh", background: "#ffffff" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: HUB.bg,
            borderBottom: `1px solid ${HUB.line}`,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <button
            onClick={() => setActive(null)}
            style={{
              background: "transparent",
              color: HUB.sub,
              border: `1px solid ${HUB.border}`,
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {t.back}
          </button>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: st.accent,
              display: "inline-block",
            }}
          />
          <span style={{ color: HUB.ink, fontSize: 13, fontWeight: 700 }}>{st.code}</span>
          <span style={{ color: HUB.sub, fontSize: 12 }}>{lang === "ja" ? st.ja : st.en}</span>
          {st.official && (
            <a href={st.official} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontSize: 11.5, color: nvInk(st.accent, HUB.bg), fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
              {lang === "ja" ? "公式の試験ページ ↗" : "Official exam page ↗"}
            </a>
          )}
        </div>
        <CertStudyLinks id={st.id} lang={lang} />
        {lang === "en" && st.jaOnly && (
          <div style={{ fontSize: 12.5, color: "#7A4B00", background: "#FFF7E6", padding: "7px 14px" }}>This station is available in Japanese only: its questions and screens have not been translated.</div>
        )}
        <Comp />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: HUB.bg,
        color: HUB.ink,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
        padding: "48px 24px 64px",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 36,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.16em",
                color: HUB.signal,
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              {t.kicker}
            </div>
          </div>
          <button
            onClick={() => setLang(lang === "ja" ? "en" : "ja")}
            style={{
              background: HUB.panel,
              border: `1px solid ${HUB.border}`,
              color: HUB.ink,
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {t.langBtn}
          </button>
        </div>

        {HUB_CATEGORIES.map((cat) => {
          const items = HUB_STATIONS.filter((s) => s.category === cat.id)
            .slice()
            .sort((a, b) => {
              if ((a.kind === "kit") !== (b.kind === "kit")) return a.kind === "kit" ? -1 : 1;
              return LEVEL_RANK[CERT_LEVEL[a.id] || "associate"] - LEVEL_RANK[CERT_LEVEL[b.id] || "associate"];
            });
          if (items.length === 0) return null;
          return (
            <div key={cat.id} style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: cat.accent,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    color: HUB.ink,
                    fontWeight: 700,
                  }}
                >
                  {lang === "ja" ? cat.ja : cat.en}
                </span>
                <span style={{ fontSize: 11, color: HUB.sub }}>({items.length})</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 12,
                }}
              >
                {items.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setActive(st.id)}
                    style={{
                      background: HUB.panel,
                      border: `1px solid ${HUB.border}`,
                      borderRadius: 14,
                      padding: 14,
                      cursor: "pointer",
                      transition: "border-color 0.15s, transform 0.15s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = st.accent;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = HUB.border;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {lang === "en" && st.jaOnly && <span style={{ position: "absolute", top: 8, right: 8, fontSize: 10, fontWeight: 700, color: "#7A4B00", background: "#FFF7E6", borderRadius: 999, padding: "2px 8px" }}>Japanese only</span>}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: done[st.id] ? "#16A34A" : st.accent,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: nvInk(st.accent, HUB.panel),
                            letterSpacing: "0.06em",
                          }}
                        >
                          {st.code}
                        </span>
                        {st.kind === "kit" ? (
                          <span style={{ fontSize: 9.5, fontWeight: 700, color: nvInk(st.accent, HUB.panel), border: `1px solid ${st.accent}`, borderRadius: 20, padding: "1px 7px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {lang === "ja" ? "リファレンス" : "Reference"}
                          </span>
                        ) : (() => {
                          const lv = LEVEL_META[CERT_LEVEL[st.id] || "associate"];
                          return (
                            <span style={{ fontSize: 9.5, fontWeight: 700, color: lv.color, border: `1px solid ${lv.color}`, borderRadius: 20, padding: "1px 7px", letterSpacing: "0.02em" }}>
                              {lang === "ja" ? lv.ja : lv.en}
                            </span>
                          );
                        })()}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {st.kind !== "kit" && certProg[st.id] ? (
                          <span title={lang === "ja" ? "この端末での解答数と正答率" : "Answers and accuracy on this device"} style={{ fontSize: 10, fontWeight: 700, color: certProg[st.id].att ? HUB.ink : HUB.sub }}>
                            {certProg[st.id].att
                              ? (lang === "ja" ? `${certProg[st.id].att}問・正答率${Math.round((certProg[st.id].cor / certProg[st.id].att) * 100)}%` : `${certProg[st.id].att} answered · ${Math.round((certProg[st.id].cor / certProg[st.id].att) * 100)}%`)
                              : (lang === "ja" ? "未着手" : "Not started")}
                          </span>
                        ) : null}
                        <span style={{ fontSize: 10, color: HUB.sub }}>{st.vendor}</span>
                        {st.kind !== "kit" && (
                          <span
                            role="checkbox"
                            aria-checked={!!done[st.id]}
                            tabIndex={0}
                            onClick={(e) => toggleDone(st.id, e)}
                            title={lang === "ja" ? "取得済みにする / 解除" : "Toggle acquired"}
                            style={{
                              cursor: "pointer",
                              fontSize: 16,
                              lineHeight: 1,
                              userSelect: "none",
                              color: done[st.id] ? "#16A34A" : HUB.sub,
                            }}
                          >
                            {done[st.id] ? "☑" : "☐"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.35 }}>
                      {lang === "ja" ? st.ja : st.en}
                    </div>
                    {st.kind === "kit" && (
                      <div style={{ fontSize: 12, color: HUB.sub, lineHeight: 1.5, marginBottom: 9 }}>
                        {lang === "ja" ? "9資格の知識を実務に落とす実装リファレンス（規程・階層化・SoA・脅威モデル・IR＋業種別）" : "Turn the 9 certs into practice: policy, tiering, SoA, threat model, IR + industry overlays"}
                      </div>
                    )}
                    {(() => {
                      const el = CERT_ELIGIBILITY[st.id];
                      if (!el) return null;
                      const dot = el.tier === "open" ? "#3ED6A7" : el.tier === "experience" ? "#C9A24B" : "#B07AA1";
                      return (
                        <div
                          title={lang === "ja" ? el.tipJa : el.tipEn}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 9, cursor: "help" }}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, boxShadow: `0 0 6px ${dot}66`, flexShrink: 0 }} />
                          <span style={{ fontSize: 9, color: HUB.sub, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                            {el.label}
                          </span>
                        </div>
                      );
                    })()}
                    <div
                      style={{
                        fontSize: 12,
                        color: done[st.id] ? "#4ADE80" : nvInk(st.accent, HUB.panel),
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {st.kind === "kit"
                        ? (lang === "ja" ? "実装キットを開く →" : "Open the kit →")
                        : done[st.id]
                          ? (lang === "ja" ? "取得済み ✓" : "Acquired ✓")
                          : `${t.enter} →`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <CertOverlapMap lang={lang} />
      </div>
    </div>
  );
}

function App() {
  return <HubApp />;
}
  // ポータルの横断検索に出す資格
  App.CLF_WEAK = (st) => (Station_CLF.WEAK_TABLE ? Station_CLF.WEAK_TABLE(st) : []);
  App.PORTAL_INDEX = (en) => HUB_STATIONS.filter((s) => s.Comp).map((s) => ({ label: s.code + "  " + (en ? s.en : s.ja), sub: (en ? "Certification · " : "資格・") + (s.vendor || ""), hash: "certification/" + s.id, extra: [s.ja, s.en, s.vendor].join(" ") }));
  return App;
})();
