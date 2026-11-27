// @@nova-part 20-techhub/160-SL_SKILLS.jsx
// ============ 実務論点マップ 画面 ============
function NoteBadge({ children, color }) {
  return <span style={{ fontSize: 10, color: color || C.muted, border: `1px solid ${C.line}`, borderRadius: 999, padding: "2px 8px", whiteSpace: "nowrap" }}>{children}</span>;
}
function NoteField({ label, value, color }) {
  if (!value) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ color: color || C.gold, fontWeight: 700, fontSize: 11, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 12, lineHeight: 1.75 }}>{value}</div>
    </div>
  );
}
function NoteSourceNote({ en }) {
  return (
    <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.8, background: C.surface2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "10px 12px", marginBottom: 16 }}>
      {en
        ? "Source: six digests built from note articles, a members-only magazine and the accounts this user follows (Dec 2022 – Oct 2026), plus three YouTube channel digests (two covering 13 Jul – 13 Oct 2026, and the full 2020–2026 back catalogue of Stabiji) taken from the full captions and descriptions. It also includes the 35 articles of Studymeter Inc.'s knowledge site LEARNING BASE (Jul 2025 – Jun 2026; https://studymeter.jp/insights, cited with the company name and URL as the site asks), and 543 AI-related posts from Gartner's official Instagram account @gartner_inc (Feb 2018 – 3 Nov 2026), with the charts in those posts read and redrawn in Japanese (in English mode the figures are English redraws of those Japanese figures); Gartner's figures are its own forecasts and surveys. What follows is what those articles and videos claim and the figures they cite — not verified fact. Follow the source URLs before reusing a number. Full per-account digests (Shiraki, Chang, Shia2n, the mid-level consultant membership) live in Book-Summary › note. Names marked † were romanized or translated from Japanese by us; the owners' own spellings and kanji readings are not confirmed."
        : "出所：note の公開記事・会員限定マガジン・フォロー中アカウントから作成されたダイジェスト6本（2022-12〜2026-10）と、YouTube 3チャンネルの動画ダイジェスト3本（泥臭コンサル・はやたすは2026-07-13〜10-13、スタビジは2020-05〜2026-09の全期間。自動字幕の全文から抽出）。あわせて、スタディメーター株式会社のナレッジサイト「LEARNING BASE」の記事35本（2025-07〜2026-06。出典：スタディメーター株式会社 https://studymeter.jp/insights、サイトの引用ポリシーに従い社名とURLを明記）と、Gartner公式Instagram（@gartner_inc）のAI関連投稿543件（2018-02〜2026-11-03。投稿内の図表は日本語で組み直して読み取ったもの。数値はGartner自身の予測・調査）を収録しています。以下は各記事・動画・投稿の主張と、そこで引用された数値の転記であり、検証済みの事実ではありません。数値を持ち出す前に一次ソースのURLをたどって確認してください。アカウント単位の全記事ダイジェスト（しらき・Chang・シアニン・中堅コンサル）は Book-Summary の「note」に収録しています。"}
    </div>
  );
}

// ===== Gartner 統合図解（ダイジェストの構造化スペックをその場で描く。英語表示では文言を TH_EN の英訳に置き換える。図の画像は日本語のまま）=====
// 図解の画像（ダイジェスト作成者が日本語で組み直した図。public/gartner-figs/<id>.webp。開いたときだけ読み込む）
// 英語表示では英語で描き直した図（gartner-figs/en/<id>.webp）を出す
const GT_FIG_URL = (id, en) => "gartner-figs/" + (en ? "en/" : "") + id + ".webp";
const GT_GAL_BY_ID = (() => { const m = {}; NOTE_GT_GAL.forEach((g) => { m[g.id] = g; }); return m; })();
const GtFigCtx = createContext(null);
// 図を拡大表示する枠。ids を渡すと ←→ で前後の図へ移れる
function GtFigProvider({ en, children }) {
  const [st, setSt] = useState(null);
  const open = useCallback((id, ids) => { if (GT_GAL_BY_ID[id]) setSt({ id, ids: ids && ids.length ? ids : [id] }); }, []);
  const close = useCallback(() => setSt(null), []);
  const step = useCallback((d) => setSt((s) => { if (!s) return s; const i = s.ids.indexOf(s.id); const n = s.ids[(i + d + s.ids.length) % s.ids.length]; return { ...s, id: n }; }), []);
  useEffect(() => {
    if (!st) return undefined;
    const onKey = (e) => { if (e.key === "Escape") close(); else if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1); };
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [st, close, step]);
  const g = st && GT_GAL_BY_ID[st.id];
  const post = g && NOTE_GT_PMAP[g.id];
  return (
    <GtFigCtx.Provider value={open}>
      {children}
      {g ? (
        <div role="dialog" aria-modal="true" aria-label={g.id + " " + g.t} onClick={close}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.78)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "12px 8px", overflowY: "auto" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 1100, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 10, padding: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.5 }}>{g.id}　{thEn(g.t, en)}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{[thEn(g.g, en), g.d, thEn(g.k, en)].filter(Boolean).join(en ? " · " : " ・ ")}</div>
              </div>
              {st.ids.length > 1 ? <><button type="button" className="gh-btn" onClick={() => step(-1)} aria-label={en ? "Previous figure" : "前の図"}>←</button><span style={{ fontSize: 11, color: C.muted, alignSelf: "center" }}>{st.ids.indexOf(st.id) + 1}/{st.ids.length}</span><button type="button" className="gh-btn" onClick={() => step(1)} aria-label={en ? "Next figure" : "次の図"}>→</button></> : null}
              <button type="button" className="gh-btn" onClick={close} autoFocus aria-label={en ? "Close" : "閉じる"}>✕</button>
            </div>
            <img src={GT_FIG_URL(g.id, en)} alt={g.id + " " + thEn(g.t, en)} style={{ width: "100%", height: "auto", display: "block", background: "#fcfcfb", borderRadius: 6 }} />
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 11.5, marginTop: 8 }}>
              {post ? <a href={post} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{en ? "Original post (Instagram)" : "元の投稿を開く（Instagram）"}</a> : null}
              <a href={GT_FIG_URL(g.id, en)} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{en ? "Open the image in a new tab" : "画像を新しいタブで開く"}</a>
              {en ? <a href={GT_FIG_URL(g.id)} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>Japanese original</a> : null}
              <span style={{ color: C.dim }}>{en ? "Redrawn in English from the digest author's Japanese figure, which re-composed the post's chart without copying Gartner's original design." : "ダイジェスト作成者が日本語で組み直した図（原図のデザインは複製していない）。"}</span>
            </div>
          </div>
        </div>
      ) : null}
    </GtFigCtx.Provider>
  );
}
// 文中の P-番号（ダイジェストの投稿図解番号）。枠の中では押すとその図を拡大表示し、枠の外では元の投稿へのリンクにする
function GtRef({ p }) {
  const open = useContext(GtFigCtx);
  if (open && GT_GAL_BY_ID[p]) return <button type="button" onClick={() => open(p)} style={{ background: "none", border: "none", padding: 0, font: "inherit", color: C.teal, textDecoration: "underline", cursor: "pointer" }}>{p}</button>;
  return NOTE_GT_PMAP[p] ? <a href={NOTE_GT_PMAP[p]} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{p}</a> : p;
}
function gtLink(text) {
  return String(text == null ? "" : text).split(/(P-\d{3})/).map((p, i) => (/^P-\d{3}$/.test(p) ? <GtRef key={i} p={p} /> : p));
}
// 図の一覧（ジャンルで絞り、押すと拡大）
function NoteGtGallery({ en }) {
  const open = useContext(GtFigCtx);
  const groups = useMemo(() => { const g = []; NOTE_GT_GAL.forEach((x) => { if (g.indexOf(x.g) < 0) g.push(x.g); }); return g; }, []);
  const [grp, setGrp] = useState("ALL");
  const [n, setN] = useState(24);
  const list = useMemo(() => NOTE_GT_GAL.filter((x) => grp === "ALL" || x.g === grp), [grp]);
  const ids = useMemo(() => list.map((x) => x.id), [list]);
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{en ? `Figure gallery (${NOTE_GT_GAL.length})` : `図解ギャラリー（${NOTE_GT_GAL.length}枚）`}</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {[["ALL", en ? "All" : "すべて"]].concat(groups.map((g) => [g, thEn(g, en)])).map(([v, l]) => {
          const c = v === "ALL" ? NOTE_GT_GAL.length : NOTE_GT_GAL.filter((x) => x.g === v).length;
          return <button key={v} type="button" className="gh-btn" onClick={() => { setGrp(v); setN(24); }} aria-pressed={grp === v} style={{ fontSize: 11, padding: "4px 8px", ...(grp === v ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}) }}>{l} {c}</button>;
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%, 150px),1fr))", gap: 8 }}>
        {list.slice(0, n).map((x) => (
          <button key={x.id} type="button" onClick={() => open && open(x.id, ids)} title={x.id + " " + thEn(x.t, en)}
            style={{ textAlign: "left", font: "inherit", color: C.text, background: C.surface2, border: `1px solid ${C.line}`, borderRadius: 8, padding: 6, cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <img src={GT_FIG_URL(x.id, en)} alt="" loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", objectPosition: "top", background: "#fcfcfb", borderRadius: 4, display: "block" }} />
            <span style={{ fontSize: 10.5, color: C.muted }}>{x.id}{x.d ? " ・ " + x.d : ""}</span>
            <span style={{ fontSize: 11.5, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{thEn(x.t, en)}</span>
          </button>
        ))}
      </div>
      {list.length > n ? <button type="button" className="gh-btn" onClick={() => setN(n + 48)} style={{ marginTop: 10 }}>{en ? `Show more (${list.length - n} left)` : `さらに表示（残り${list.length - n}枚）`}</button> : null}
    </div>
  );
}
function NoteGtFlow({ g, en }) {
  const [hl, setHl] = useState(null);
  const near = useMemo(() => {
    if (!hl) return null;
    const s = new Set([hl]);
    (g.edges || []).forEach(([a, b]) => { if (a === hl) s.add(b); if (b === hl) s.add(a); });
    return s;
  }, [hl, g]);
  return (
    <div style={{ overflowX: "auto", paddingBottom: 4 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "stretch", minWidth: g.columns.length * 150 }}>
        {g.columns.map((col, ci) => (
          <React.Fragment key={ci}>
            {ci > 0 && <div aria-hidden="true" style={{ alignSelf: "center", color: C.muted, fontSize: 14 }}>→</div>}
            <div style={{ flex: 1, minWidth: 130, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: C.gold }}>{thEn(col.header, en)}</div>
              {col.nodes.map((n) => {
                const on = near && near.has(n.id);
                return (
                  <button key={n.id} type="button" onClick={() => setHl(hl === n.id ? null : n.id)} aria-pressed={hl === n.id}
                    style={{ textAlign: "left", font: "inherit", fontSize: 11.5, lineHeight: 1.5, color: C.text, cursor: "pointer", padding: "6px 8px", borderRadius: 8,
                      background: C.surface2, border: `1px solid ${on ? C.gold : C.line}`, opacity: near && !on ? 0.45 : 1 }}>
                    {gtLink(thEn(n.label, en))}
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
function NoteGtDiag({ g, en }) {
  const tj = (x) => thEn(x, en);
  const box = { background: C.surface2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 9px", fontSize: 11.5, lineHeight: 1.55 };
  const T = g.title_ja ? <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, margin: "14px 0 6px" }}>{tj(g.title_ja)}</div> : null;
  let body = null;
  if (g.type === "table") {
    body = (
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", fontSize: 11.5, lineHeight: 1.55, width: "100%", minWidth: g.headers.length > 4 ? 560 : 0 }}>
          <thead><tr>{g.headers.map((h, i) => <th key={i} scope="col" style={{ textAlign: "left", padding: "6px 8px", borderBottom: `2px solid ${C.line}`, color: C.muted, fontWeight: 700 }}>{tj(h)}</th>)}</tr></thead>
          <tbody>{g.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: "6px 8px", borderBottom: `1px solid ${C.line}`, verticalAlign: "top", fontWeight: j === 0 ? 600 : 400 }}>{gtLink(tj(c))}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  } else if (g.type === "stats") {
    body = (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 8 }}>
        {g.items.map((it, i) => <div key={i} style={box}><div style={{ fontSize: 22, fontWeight: 800, color: C.gold, lineHeight: 1.2 }}>{tj(it.value)}</div><div style={{ marginTop: 4 }}>{gtLink(tj(it.label))}</div></div>)}
      </div>
    );
  } else if (g.type === "list") {
    const L = g.numbered ? "ol" : "ul";
    body = <L style={{ margin: 0, paddingLeft: 20, fontSize: 12, lineHeight: 1.7 }}>{g.items.map((it, i) => <li key={i} style={{ marginBottom: 4 }}><b>{gtLink(tj(it.label))}</b>{it.desc ? <span style={{ color: C.muted }}> — {gtLink(tj(it.desc))}</span> : null}</li>)}</L>;
  } else if (g.type === "steps") {
    body = (
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8 }}>
        {g.steps.map((it, i) => <li key={i} style={box}><div style={{ fontWeight: 700 }}><span style={{ color: C.gold, marginRight: 6 }}>{i + 1}</span>{gtLink(tj(it.label))}</div>{it.desc ? <div style={{ color: C.muted, marginTop: 3 }}>{gtLink(tj(it.desc))}</div> : null}</li>)}
      </ol>
    );
  } else if (g.type === "timeline") {
    body = (
      <div style={{ borderLeft: `2px solid ${C.line}`, marginLeft: 6, paddingLeft: 12, display: "grid", gap: 6 }}>
        {g.items.map((it, i) => <div key={i} style={{ fontSize: 12, lineHeight: 1.6 }}><NoteBadge>{tj(it.when)}</NoteBadge> <span>{gtLink(tj(it.label))}</span></div>)}
      </div>
    );
  } else if (g.type === "layers") {
    body = (
      <div style={{ display: "flex", gap: 8, alignItems: "stretch", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px", display: "grid", gap: 6 }}>
          {g.layers.map((ly, i) => (
            <div key={i} style={box}>
              <div style={{ fontWeight: 700 }}>{gtLink(tj(ly.label))}{ly.sub ? <span style={{ color: C.muted, fontWeight: 400 }}> — {tj(ly.sub)}</span> : null}</div>
              {ly.items && ly.items.length ? <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>{ly.items.map((x, j) => <NoteBadge key={j} color={C.teal}>{tj(x)}</NoteBadge>)}</div> : null}
            </div>
          ))}
        </div>
        {g.side ? (
          <div style={{ ...box, flex: "0 1 180px", borderColor: C.gold }}>
            <div style={{ fontWeight: 700, color: C.gold }}>{gtLink(tj(g.side.label))}</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{en ? "Spans every layer" : "全層に横断"}</div>
            {(g.side.items || []).map((x, j) => <div key={j}>{tj(x)}</div>)}
          </div>
        ) : null}
      </div>
    );
  } else if (g.type === "tree") {
    body = (
      <div>
        <div style={{ ...box, display: "inline-block", fontWeight: 700, borderColor: C.gold, marginBottom: 8 }}>{gtLink(tj(g.root))}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 220px),1fr))", gap: 8 }}>
          {g.children.map((n, i) => (
            <div key={i} style={box}>
              <div style={{ fontWeight: 700 }}>{gtLink(tj(n.label))}</div>
              {n.children && n.children.length ? <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>{n.children.map((m, j) => <li key={j}>{gtLink(tj(m.label))}</li>)}</ul> : null}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (g.type === "matrix") {
    const nx = g.x_levels.length, ny = g.y_levels.length;
    const cell = (x, y) => g.cells.find((c) => c.x === x && c.y === y);
    body = (
      <div style={{ overflowX: "auto" }}>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>↑ {tj(g.y_axis)}</div>
        <div style={{ display: "grid", gridTemplateColumns: `auto repeat(${nx}, minmax(120px,1fr))`, gap: 6, minWidth: 120 * nx + 40 }}>
          {Array.from({ length: ny }, (_, r) => ny - 1 - r).map((y) => (
            <React.Fragment key={y}>
              <div style={{ fontSize: 11, color: C.muted, alignSelf: "center" }}>{tj(g.y_levels[y])}</div>
              {Array.from({ length: nx }, (_, x) => { const c = cell(x, y); return (
                <div key={x} style={{ ...box, minHeight: 56 }}>{c ? <><div style={{ fontWeight: 700 }}>{gtLink(tj(c.label))}</div>{c.desc ? <div style={{ color: C.muted, marginTop: 3 }}>{gtLink(tj(c.desc))}</div> : null}</> : null}</div>
              ); })}
            </React.Fragment>
          ))}
          <div />
          {g.x_levels.map((l, i) => <div key={i} style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>{tj(l)}</div>)}
        </div>
        <div style={{ fontSize: 11, color: C.muted, textAlign: "right", marginTop: 2 }}>{tj(g.x_axis)} →</div>
      </div>
    );
  } else if (g.type === "flow") {
    body = <><div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{en ? "Tap a box to highlight what it connects to." : "箱を押すと、つながる箱が強調されます。"}</div><NoteGtFlow g={g} en={en} /></>;
  }
  return body ? <div>{T}{body}</div> : null;
}
function NoteGtFigs({ en }) {
  return (
    <details style={{ marginBottom: 12, fontSize: 12 }}>
      <summary style={{ cursor: "pointer", color: C.teal, fontWeight: 700 }}>{en ? `Diagrams: ${NOTE_GT_FIGS.length - 1} integrated, ${NOTE_GT_GAL.length} figures in all` : `図解 — 統合図${NOTE_GT_FIGS.length - 1}枚（アプリ内で描画）と図解ギャラリー${NOTE_GT_GAL.length}枚（投稿・分析・統合）`}</summary>
      <GtFigProvider en={en}><NoteGtFigsBody en={en} /></GtFigProvider>
    </details>
  );
}
function NoteGtFigsBody({ en }) {
  const open = useContext(GtFigCtx);
  const [cur, setCur] = useState(1);
  const f = NOTE_GT_FIGS[cur] || NOTE_GT_FIGS[0];
  return (
    <div>
      <div style={{ fontSize: 11, color: C.dim, margin: "8px 0", lineHeight: 1.7 }}>
        {en ? "All figures were redrawn in Japanese by the digest's author from the charts in Gartner's posts, without copying the original designs. In the integrated diagrams some headings, arrows and groupings are the author's arrangement (see 'How it was built'). Tap a P-number to open that post's figure; the figure links on to the original post. In English mode the diagram text and the figure images are English renderings of that Japanese material, not Gartner's original wording; each enlarged figure links to its Japanese original."
            : "図はすべて、ダイジェスト作成者がGartnerの投稿の図表を日本語で組み直したもの（原図のデザインは複製していない）。統合図の列見出し・矢印・分類の一部は作成者の整理です（「作り方」を参照）。P-番号を押すとその投稿の図解が開き、そこから元の投稿にも移れます。"}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10, alignItems: "center" }}>
        <button type="button" className="gh-btn" onClick={() => setCur((c) => (c + NOTE_GT_FIGS.length - 1) % NOTE_GT_FIGS.length)} aria-label={en ? "Previous diagram" : "前の図"}>←</button>
        <select className="gh-btn" value={cur} onChange={(e) => setCur(+e.target.value)} aria-label={en ? "Choose a diagram" : "図を選ぶ"} style={{ flex: "1 1 220px", minWidth: 0, maxWidth: "100%" }}>
          {NOTE_GT_FIGS.map((x, i) => <option key={x.id} value={i}>{x.id === "A" ? (en ? "Counts by year" : "件数") : x.id} {thEn(x.t, en)}</option>)}
        </select>
        <button type="button" className="gh-btn" onClick={() => setCur((c) => (c + 1) % NOTE_GT_FIGS.length)} aria-label={en ? "Next diagram" : "次の図"}>→</button>
        <span style={{ fontSize: 11, color: C.muted }}>{cur + 1} / {NOTE_GT_FIGS.length}</span>
      </div>
      <Card>
        <div style={{ display: "flex", gap: 8, alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{f.id === "A" ? "" : f.id + " "}{thEn(f.t, en)}</div>
          {GT_GAL_BY_ID[f.id] && open ? <button type="button" className="gh-btn" onClick={() => open(f.id, NOTE_GT_FIGS.filter((x) => GT_GAL_BY_ID[x.id]).map((x) => x.id))} style={{ fontSize: 11, padding: "4px 8px" }}>{en ? "View as an image" : "作成者の図（画像）で見る"}</button> : null}
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.75, marginTop: 6, borderLeft: `3px solid ${C.gold}`, paddingLeft: 8 }}>{gtLink(thEn(f.k, en))}</div>
        {f.g.map((g, i) => <NoteGtDiag key={f.id + "-" + i} g={g} en={en} />)}
        {f.m ? <div style={{ fontSize: 11, color: C.dim, marginTop: 12, lineHeight: 1.7 }}>{en ? "How it was built: " : "作り方："}{gtLink(thEn(f.m, en))}</div> : null}
        {f.src && f.src.length ? (
          <div style={{ fontSize: 11, marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "baseline" }}>
            <span style={{ color: C.muted }}>{en ? "Figures from the posts used:" : "使った投稿の図解："}</span>
            {f.src.map((p) => <GtRef key={p} p={p} />)}
          </div>
        ) : null}
      </Card>
      <NoteGtGallery en={en} />
    </div>
  );
}

function NoteMapView({ en }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <NoteSourceNote en={en} />
      {NOTE_CORPORA.map((c) => (
        <FoldSection key={c.id} id={"note-" + c.id} title={thEn(c.title, en)} meta={<>{thEn(c.sub, en)}{en ? " · " : " ・ "}{c.period}{en ? " · " : " ・ "}{c.n}{en ? " articles" : "本"}{en ? " · " : " ・ "}{c.themes.length}{en ? " themes" : "論点"}</>}>
        <div style={{ marginBottom: 22 }}>
          {c.axis && <div style={{ fontSize: 11, color: C.teal, marginBottom: 10 }}>{en ? "Axis: " : "分類軸："}{thEn(c.axis, en)}</div>}
          {c.insights && c.insights.length ? (
            <Card style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{en ? `Cross-cutting insights (${c.insights.length}${c.insights.every((x) => TH_EN[x]) ? "" : ", in Japanese"})` : `横断インサイト（${c.insights.length}つの論点）`}</div>
              <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, lineHeight: 1.75 }}>{c.insights.map((x, i) => <li key={i} style={{ marginBottom: 4 }}>{thEn(x, en)}</li>)}</ol>
            </Card>
          ) : null}
          {c.figs === "gartner" ? <NoteGtFigs en={en} /> : null}
          {(c.resources && c.resources.length) || (c.tools && c.tools.length) ? (
            <details style={{ marginBottom: 12, fontSize: 12 }}>
              <summary style={{ cursor: "pointer", color: C.teal, fontWeight: 700 }}>{en ? `Free lecture materials and learning tools (${(c.resources || []).length + (c.tools || []).length})` : `無料公開の講義資料と学習ツール（${(c.resources || []).length + (c.tools || []).length}件）`}</summary>
              <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                {(c.resources || []).map((r, i) => (
                  <div key={"r" + i} style={{ borderLeft: `3px solid ${C.line}`, paddingLeft: 10, lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 600 }}>{thEn(r.t, en)}{en && TH_EN[r.t] ? <span style={{ color: C.muted, fontWeight: 400 }}> (course in Japanese)</span> : null}</div>
                    <div style={{ color: C.muted, fontSize: 11 }}>{thEn(r.th, en)}</div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 11.5 }}>
                      {(r.m || []).map((m, j) => <a key={j} href={m.u} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{thEn(m.l, en)}</a>)}
                      {r.u ? <a href={r.u} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{en ? "Udemy course" : "Udemy講座"}</a> : null}
                    </div>
                  </div>
                ))}
                {(c.tools || []).map((r, i) => (
                  <div key={"t" + i} style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 10, lineHeight: 1.6 }}>
                    <a href={r.u} target="_blank" rel="noopener noreferrer" style={{ color: C.teal, fontWeight: 600 }}>{thEn(r.t, en)}</a>
                    <div style={{ color: C.muted, fontSize: 11.5 }}>{thEn(r.c, en)}</div>
                  </div>
                ))}
              </div>
            </details>
          ) : null}
          {c.srcNote ? <div style={{ fontSize: 11, color: C.dim, marginBottom: 10, lineHeight: 1.7 }}>{en ? "Source: " : "出典："}{c.src ? <a href={c.src} target="_blank" rel="noopener noreferrer" style={{ color: C.teal }}>{c.src}</a> : null}{en ? (TH_EN[c.srcNote] ? " " + TH_EN[c.srcNote] : "") : "　" + c.srcNote}</div> : null}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 340px),1fr))", gap: 12 }}>
            {c.themes.map((th) => {
              const key = c.id + th.t;
              const isOpen = open === key;
              return (
                <Card key={key} style={isOpen ? { borderColor: C.gold } : {}}>
                  <div style={{ cursor: "pointer" }} onClick={() => setOpen(isOpen ? null : key)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{thEn(th.t, en)}</span>
                      {th.n && <NoteBadge>{th.n}{en ? "" : "件"}</NoteBadge>}
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.75, marginTop: 6, color: C.text }}>{thEn(th.c, en)}</div>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 10, paddingTop: 4 }}>
                      <NoteField label={en ? "Representative evidence" : "代表エビデンス"} value={thEn(th.e, en)} />
                      <NoteField label={en ? "Practical implication" : "実務示唆"} value={thEn(th.a, en)} color={C.wine} />
                      <NoteField label={en ? "Who writes this" : "書き手"} value={thEn(th.who, en)} color={C.teal} />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
        </FoldSection>
      ))}
    </div>
  );
}

function NoteGovView({ en }) {
  const [obj, setObj] = useState("ALL");
  const objs = useMemo(() => Array.from(new Set(NOTE_GOV.map.map((g) => g.obj))), []);
  const list = obj === "ALL" ? NOTE_GOV.map : NOTE_GOV.map.filter((g) => g.obj === obj);
  return (
    <div>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 10 }}>
        {en ? `Issue map by governed party (${NOTE_GOV.period}). The tension axis is where the field genuinely disagrees — read it as an open question, not a settled answer.`
            : `統治対象別の論点マップ（${NOTE_GOV.period}）。「対立軸」は決着していない論点です。答えでなく、いま割れている場所として読んでください。`}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {["ALL"].concat(objs).map((o) => (
          <button key={o} className="gh-btn" onClick={() => setObj(o)} style={obj === o ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}}>
            {o === "ALL" ? (en ? "All" : "すべて") : thEn(o, en)}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 380px),1fr))", gap: 14 }}>
        {list.map((g) => (
          <Card key={g.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{thEn(g.t, en)}</span>
              <NoteBadge color={C.teal}>{g.id}{en ? " · " : " ・ "}{thEn(g.obj, en)}</NoteBadge>
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{thEn(g.d, en)}</div>
            <div style={{ fontSize: 12, lineHeight: 1.75, marginTop: 8 }}>{thEn(g.c, en)}</div>
            <div style={{ background: C.surface2, borderRadius: 8, padding: "8px 10px", borderLeft: `3px solid ${C.wine}`, marginTop: 10 }}>
              <div style={{ color: C.wineInk, fontWeight: 700, fontSize: 11, marginBottom: 3 }}>{en ? "Tension" : "対立軸"}</div>
              <div style={{ fontSize: 12, lineHeight: 1.7 }}>{thEn(g.x, en)}</div>
            </div>
            <NoteField label={en ? "Caveat" : "留意"} value={thEn(g.n, en)} color={C.muted} />
            <NoteField label={en ? "Implication" : "実務への示唆"} value={thEn(g.a, en)} />
            {g.u && <div style={{ marginTop: 10 }}><a href={g.u} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.teal }}>{en ? "Primary source" : "一次ソースを開く"}</a></div>}
          </Card>
        ))}
      </div>
    </div>
  );
}

function NoteSourceView({ en }) {
  const [view, setView] = useState("src");
  const checks = NOTE_GOV.checks;
  return (
    <div>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 12 }}>
        {en ? "What was confirmed, and what could not be. Keeping the unconfirmed visible is what stops an unverified number from spreading. Names marked † were romanized or translated from Japanese by us; the owners' own spellings and kanji readings are not confirmed."
            : "何を確認し、何を確認できなかったか。未確認を消さずに残すことが、裏の取れていない数値が独り歩きするのを止めます。"}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {[["src", en ? "Primary sources" : "一次ソース"], ["check", en ? "Verification memo" : "検証メモ"], ["note", en ? "Note articles" : "note主要記事"]].map(([v, l]) => (
          <button key={v} className="gh-btn" onClick={() => setView(v)} style={view === v ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}}>{l}</button>
        ))}
      </div>
      {view === "src" && (
        <div style={{ display: "grid", gap: 10 }}>
          {NOTE_GOV.sources.map((s, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{thEn(s.who, en)}</span>
                <span style={{ display: "flex", gap: 6 }}><NoteBadge>{thEn(s.kind, en)}</NoteBadge>{s.rel && <NoteBadge color={C.teal}>{thEn(s.rel, en)}</NoteBadge>}<NoteBadge>{thEn(s.d, en)}</NoteBadge></span>
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.75, marginTop: 6 }}>{thEn(s.t, en)}</div>
              {s.u && <div style={{ marginTop: 6 }}><a href={s.u} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.teal, wordBreak: "break-all" }}>{s.u}</a></div>}
            </Card>
          ))}
        </div>
      )}
      {view === "check" && (
        <div style={{ display: "grid", gap: 10 }}>
          {checks.map((c, i) => {
            const done = String(c.k).indexOf("確認済") === 0;
            return (
              <Card key={i} style={{ borderLeft: `3px solid ${done ? C.teal : C.wine}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{thEn(c.t, en)}</span>
                  <span style={{ display: "flex", gap: 6 }}><NoteBadge color={done ? C.teal : C.wine}>{thEn(c.k, en)}</NoteBadge>{c.v && <NoteBadge>{thEn(c.v, en)}</NoteBadge>}</span>
                </div>
                {c.e && <div style={{ fontSize: 12, lineHeight: 1.75, marginTop: 6, color: C.dim }}>{thEn(c.e, en)}</div>}
              </Card>
            );
          })}
        </div>
      )}
      {view === "note" && (
        <div style={{ display: "grid", gap: 8 }}>
          {NOTE_GOV.notes.map((n, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{thEn(n.t, en)}</span>
                <span style={{ display: "flex", gap: 6 }}>{n.tag && <NoteBadge color={C.teal}>{thEn(n.tag, en)}</NoteBadge>}<NoteBadge>{n.d}</NoteBadge></span>
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }} title={en && TH_EN[n.w] ? n.w : undefined}>{thEn(n.w, en)}</div>
              {n.u && <div style={{ marginTop: 6 }}><a href={n.u} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.teal }}>{en ? "Open article" : "記事を開く"}</a></div>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// 投稿カードの図解（押すと拡大）
function GtThumb({ id, en }) {
  const open = useContext(GtFigCtx); const g = GT_GAL_BY_ID[id];
  if (!g) return null;
  return (
    <button type="button" onClick={() => open && open(id)} style={{ display: "block", marginTop: 10, padding: 0, border: `1px solid ${C.line}`, borderRadius: 6, background: "#fcfcfb", cursor: "zoom-in", width: "100%", maxWidth: 420 }} aria-label={(en ? "Enlarge figure " : "図解を拡大 ") + id}>
      <img src={GT_FIG_URL(id, en)} alt={id + " " + thEn(g.t, en)} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block", borderRadius: 6 }} />
    </button>
  );
}
function NoteArticleView({ en }) {
  return <GtFigProvider en={en}><NoteArticleViewInner en={en} /></GtFigProvider>;
}
function NoteArticleViewInner({ en }) {
  const [corpus, setCorpus] = useState("ALL");
  const [theme, setTheme] = useState("ALL");
  const [qstr, setQstr] = useState("");
  const [open, setOpen] = useState(null);
  const themes = useMemo(() => {
    const src = corpus === "ALL" ? NOTE_ARTICLES : NOTE_ARTICLES.filter((a) => a.k === corpus);
    return Array.from(new Set(src.map((a) => a.th).filter(Boolean)));
  }, [corpus]);
  const list = useMemo(() => {
    const needle = qstr.trim().toLowerCase();
    return NOTE_ARTICLES.filter((a) => {
      if (corpus !== "ALL" && a.k !== corpus) return false;
      if (theme !== "ALL" && a.th !== theme) return false;
      if (!needle) return true;
      const ae = NOTE_ART_EN[a.id];
      return (a.t + a.w + a.c + a.e + a.a + (a.sm || "") + (ae ? " " + ae.t + " " + ae.c + " " + ae.a + " " + (ae.sm || "") + " " + (ae.e || "") : "")).toLowerCase().indexOf(needle) !== -1;
    });
  }, [corpus, theme, qstr]);
  return (
    <div>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 10 }}>
        {en ? `${NOTE_ARTICLES.length} articles, videos and posts with their central claim, the figures cited, and the practical implication. Strength A/B/C is the digest author's rating of how well the claim is evidenced. All article text is shown in English, translated from the Japanese digests. Most originals are in Japanese; Gartner's posts are in English, so this wording is a translation of the digest, not Gartner's own. Names marked † were romanized or translated from Japanese by us; the owners' own spellings and kanji readings are not confirmed.`
            : `記事・動画・投稿${NOTE_ARTICLES.length}本を、中心主張・引用された数値・実務示唆つきで一覧します。強度A/B/Cはダイジェスト作成者による根拠の評価です。`}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {[["ALL", en ? "All" : "すべて"]].concat(NOTE_CORPORA.map((c) => [c.id, thEn(c.title, en)])).map(([v, l]) => (
          <button key={v} className="gh-btn" onClick={() => { setCorpus(v); setTheme("ALL"); }} style={corpus === v ? { borderColor: C.gold, color: C.gold, fontWeight: 700 } : {}}>{l}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <select className="gh-btn" value={theme} onChange={(e) => setTheme(e.target.value)} style={{ maxWidth: "100%" }}>
          <option value="ALL">{en ? "All themes" : "テーマすべて"}</option>
          {themes.map((th) => <option key={th} value={th}>{thEn(th, en)}</option>)}
        </select>
        <input className="gh-btn" value={qstr} onChange={(e) => setQstr(e.target.value)} aria-label={en ? "search" : "本文を検索"} placeholder={en ? "search" : "本文を検索"} style={{ minWidth: 160 }} />
        <span style={{ fontSize: 11, color: C.muted }}>{list.length}{en ? " hits" : "件"}</span>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {list.slice(0, 200).map((a) => {
          const isOpen = open === a.id;
          const ae = en ? NOTE_ART_EN[a.id] : null;
          return (
            <Card key={a.id} style={isOpen ? { borderColor: C.gold } : {}}>
              <div style={{ cursor: "pointer" }} onClick={() => setOpen(isOpen ? null : a.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{(ae && ae.t) || a.t}</span>
                  <span style={{ display: "flex", gap: 6 }}>{a.pr && <NoteBadge>{thEn(a.pr, en)}</NoteBadge>}{a.s && <NoteBadge color={a.s === "A" ? C.teal : a.s === "C" ? C.wine : C.muted}>{en ? "strength " : "強度"}{a.s}</NoteBadge>}<NoteBadge>{a.d}</NoteBadge></span>
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}><span title={en && TH_EN[a.w] ? a.w : undefined}>{thEn(a.w, en)}</span>{a.th ? (en ? " · " : " ・ ") + thEn(a.th, en) : ""}</div>
                <div style={{ fontSize: 12, lineHeight: 1.75, marginTop: 6 }}>{(ae && ae.c) || a.c}</div>
              </div>
              {isOpen && (
                <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 10, paddingTop: 4 }}>
                  {a.sm && <NoteField label={en ? (ae && ae.sm ? "Summary" : "Summary (in Japanese)") : "要約"} value={(ae && ae.sm) || a.sm} color={C.teal} />}
                  {a.f ? <GtThumb id={a.f} en={en} /> : null}
                  <NoteField label={a.k === "gartner" ? (en ? (ae && ae.e ? "What the image shows (as read by the digest author)" : "What the image shows (in Japanese)") : "画像の読取内容") : (en ? (ae && ae.e ? "Figures cited" : "Figures cited (in Japanese)") : "エビデンス（数値・出典）")} value={(ae && ae.e) || a.e} />
                  <NoteField label={en ? "Practical implication" : "実務示唆"} value={(ae && ae.a) || a.a} color={C.wine} />
                  {a.u && <div style={{ marginTop: 10 }}><a href={a.u} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.teal, wordBreak: "break-all" }}>{a.u.indexOf("youtube.com") !== -1 ? (en ? "Watch the video" : "動画を開く") : a.u.indexOf("instagram.com") !== -1 ? (en ? "Open the post" : "投稿を開く") : (en ? "Open the article" : "記事を開く")}</a>{a.f ? <span style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>{en ? "Figure " : "図解 "}{a.f}</span> : null}</div>}
                </div>
              )}
            </Card>
          );
        })}
      </div>
      {list.length > 200 && <div style={{ fontSize: 11, color: C.muted, marginTop: 10 }}>{en ? `Showing the first 200 of ${list.length}. Narrow with the filters above.` : `${list.length}件のうち先頭200件を表示しています。上の絞り込みを使ってください。`}</div>}
    </div>
  );
}

function NoteQuizView({ en }) {
  return <CheckEngine bank={NOTEISSUE_BANK} domains={NOTEISSUE_DOMAINS} storeKey="noteissue_stats_v1" noTitle
    intro="noteの7つの論点領域と、Gartner公式Instagramの発信（N9）、スタディメーター株式会社のナレッジ記事（N10、出典：https://studymeter.jp/insights）、YouTubeの業務改善・BPRの動画（N11、泥臭コンサルの非常識なDX学）、データサイエンスとAIの動画（N12、スタビジ・はやたす）から作成した問題です。数値には時点を、推計値・予測・話者の目安にはその旨を付けています。"
    introEn="Built from the seven issue areas of the note corpora, Gartner's official Instagram posts (N9), Studymeter Inc.'s knowledge articles (N10, source: https://studymeter.jp/insights), YouTube videos on business-process improvement and BPR (N11, the channel 'Unconventional DX by a Down-to-Earth Consultant') and on data science and AI (N12, the channels Stabiji and Hayatasu; channel names romanized from Japanese); figures carry dates or an estimate, forecast or speaker's-rule-of-thumb label. " />;
}

function TabNoteIssues() {
  const clang = useLang();
  const en = clang === "en";
  const [view, setView] = useState("map");
  const __opBack = useLocalHistory([[view, setView]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const views = [["map", ["論点マップ", "Issue map"]], ["gov", ["統治の論点", "Governance"]], ["src", ["一次ソースと検証", "Sources & checks"]], ["arts", ["記事エクスプローラ", "Articles"]], ["quiz", ["論点クイズ", "Issue quiz"]]];
  return (
    <div>
      <SectionTitle jp={`実務論点マップ — note・YouTube・Web・Instagram ${NOTE_CORPORA.length}コーパス／記事・動画・投稿${NOTE_ARTICLES.length}本の論点・根拠・示唆`} en={`Practice Issue Map — claims, evidence and implications across ${NOTE_ARTICLES.length} note and web articles, videos and posts`} />
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {views.map(([v, l]) => (
          <button key={v} className="gh-btn" onClick={() => setView(v)} style={view === v ? { borderColor: C.wine, color: C.wineInk, fontWeight: 700 } : {}}>{en ? l[1] : l[0]}</button>
        ))}
      </div>
      {view === "map" && <NoteMapView en={en} />}
      {view === "gov" && <NoteGovView en={en} />}
      {view === "src" && <NoteSourceView en={en} />}
      {view === "arts" && <NoteArticleView en={en} />}
      {view === "quiz" && <NoteQuizView en={en} />}
    </div>
  );
}

// ============ Slalom 変革道場（Transformation職のスキルと演習） ============
// 出所: この環境からは slalom.com・報道各社のページに直接アクセスできないため、
// Web検索が返した要約を材料にしている。各事実には確度（高/中/低）と出所の種類を付け、
// 自社発表の数値は「自社発表」と明記する。一次ページでの確認を前提に読むこと。
const SL_CONF = { high: ["確度 高", "High confidence", "#72BA88"], mid: ["確度 中", "Medium confidence", "#D6B152"], low: ["確度 低", "Low confidence", "#E28C4E"] };
const SL_FACTS = [
  { k: ["創業・本社", "Founded / HQ"], v: ["2001年、米国シアトル。戦略・テクノロジー・事業変革を扱うコンサルティングファーム。", "2001, Seattle. A consulting firm spanning strategy, technology and business transformation."], c: "high", s: ["複数の検索要約で一致", "Consistent across several search summaries"] },
  { k: ["規模", "Scale"], v: ["従業員は約1万〜1.3万人、売上は約30億ドルとする資料が多い。人材データ企業の集計には2026年3月時点で約9,600人（2023年比 約26%減）とするものもあり、資料により差が大きい。", "Most sources say ~10–13k staff and ~$3B revenue; one workforce tracker shows ~9,600 in March 2026 (about −26% vs 2023). Figures vary widely by source."], c: "mid", s: ["企業情報サイト・人材データの集計（二次）", "Company-data sites and workforce trackers (secondary)"] },
  { k: ["運営モデル", "Operating model"], v: ["「ローカルマーケット」型。各都市で採用し、その地域の顧客を長期に担当する。移動の多い働き方を前提にしない。", "The 'local market' model: hire in each city and serve that region's clients over the long term, without a travel-heavy lifestyle."], c: "mid", s: ["ファーム解説・面接対策記事（二次）", "Firm profiles and interview guides (secondary)"] },
  { k: ["開発部隊", "Build arm"], v: ["Slalom Build — アプリや機械学習を組み込んだ製品の設計と構築を担う。", "Slalom Build — designs and builds applications and ML-enabled products."], c: "mid", s: ["ファーム解説（二次）", "Firm profiles (secondary)"] },
  { k: ["パートナー", "Partners"], v: ["技術パートナー700社超（公式サイト・2026年11月時点。AWS、Google Cloud、Microsoft、Salesforce、Snowflake、Tableauなど）。2025年にGoogle CloudのAIパートナー賞（公共部門）、AWSとAIファースト企業への変革で戦略的協業、2026年第1四半期にMicrosoftとSnowflakeから表彰。", "700+ technology partners per Slalom's website as of Nov 2026 (AWS, Google Cloud, Microsoft, Salesforce, Snowflake, Tableau…). 2025 Google Cloud AI Partner of the Year (public sector); a strategic collaboration with AWS on AI-first transformation; Q1 2026 recognition from Microsoft and Snowflake."], c: "mid", s: ["自社発表（報道発表の要約）", "Vendor announcements (press-release summaries)"] },
  { k: ["日本法人", "Japan entity"], v: ["Slalom株式会社。2019年6月設立、2021年に本格始動（JETROの2021年の告知）。東京都港区愛宕2-5-1 愛宕グリーンヒルズMORIタワー7F。", "Slalom K.K., incorporated June 2019, full operations from 2021 (JETRO notice, 2021). Atago Green Hills Mori Tower 7F, Minato-ku, Tokyo."], c: "high", s: ["JETRO・企業情報サイト（複数で一致）", "JETRO and company-data sites (consistent)"] },
  { k: ["日本の体制", "Japan team"], v: ["2025年4月1日付で渡邉 知志 氏が Slalom株式会社の社長に就任（公式サイトの肩書は Country Lead）。日本ディジタルイクイップメント、フューチャーシステムコンサルティングを経て2013年にデロイト トーマツ コンサルティングへ入社し、小売・流通・不動産・運輸を中心に戦略立案とオペレーション・システムの変革を担った。2020年から同社コンシューマー部門のリーダー、2023年からグループのコンシューマー業界リーダーを務め、2024年9月に Slalom に参画。前任は2021年9月1日就任の浅見 光 氏（同じくデロイト出身）。日本の人員は2023年4月時点で約100名という二次情報があるが、現在値は公表を確認できていない。", "Satoshi Watanabe became president of Slalom K.K. on 1 April 2025 (titled Country Lead on the official site). After Digital Equipment Japan and Future System Consulting he joined Deloitte Tohmatsu Consulting in 2013, leading strategy and operations/systems transformation mainly in retail, distribution, real estate and transport; he led its consumer division from 2020 and was the group's consumer industry leader from 2023, joining Slalom in September 2024. His predecessor was Ko Asami (also ex-Deloitte), president from 1 September 2021. A secondary source put Japan headcount at about 100 in April 2023; no current figure could be confirmed."], c: "mid", s: ["2025年4月の日本法人プレスリリース（PR TIMES）と公式サイトの Country Lead ページの検索結果で一致。本文は環境の通信制限で未取得（2026年9月確認）", "Consistent across search results for the April 2025 Japan press release (PR TIMES) and the official Country Lead page; page bodies not fetched due to network limits (checked Sept 2026)"] },
  { k: ["本社の経営陣の近年の動き", "Recent global leadership moves"], v: ["2025年3月17日に Rich Coughlin 氏が初の COO（米国中部リージョンのプレジデントを兼務）、2025年8月13日に Wayne Ingram 氏がカナダ・EMEA のプレジデント兼リージョンリーダー、2026年8月6日に Dan Garrison 氏（アクセンチュアに約30年、直近は Accenture Song の CTO）が Chief AI Officer に就任。CEO は共同創業者の Brad Jackson 氏とする企業データベースが多い。", "Rich Coughlin became the first COO on 17 March 2025 (also President, US Central); Wayne Ingram became President and Regional Leader for Canada and EMEA on 13 August 2025; Dan Garrison (about 30 years at Accenture, most recently CTO of Accenture Song) joined as Chief AI Officer on 6 August 2026. Company databases mostly list co-founder Brad Jackson as CEO."], c: "mid", s: ["本社ニュースルームと通信社配信の検索結果で一致。CEO は企業データベースの記載（本文未取得）", "Consistent across search results for the newsroom and wire releases; CEO per company databases (bodies not fetched)"] },
  { k: ["日本での打ち出し", "Japan positioning"], v: ["日経クロステックの見出しは「PoCはもう古い」。組織変革と社員教育まで伴走するDX支援として紹介され、社内の約半数がエンジニアとされる。欧米の発想と日本の専門性の融合を掲げる。", "Nikkei xTECH headlined it 'PoC is already old': DX support that stays through organisational change and staff education, with about half the members engineers. It promotes blending Western ideas with Japanese expertise."], c: "mid", s: ["報道の見出しと要約（本文は未確認）", "Press headline and summary (full text unread)"] },
  { k: ["価値観", "Core values"], v: ["つながりとチームワーク／情熱と冒険／当事者意識（Take ownership）／やり遂げる（Get it done）／らしさを称える／成果に集中／成長と革新／謙虚で好奇心を持つ／より良い未来を築く／Smile。", "Drive connection and teamwork; inspire passion and adventure; take ownership; get it done; celebrate authenticity; focus on outcomes; fuel growth and innovation; stay humble and curious; build and shape a better future; smile."], c: "low", s: ["検索要約（一次ページ未確認）", "Search summaries (primary page unverified)"] },
];
const SL_OFFER = [
  { t: ["オペレーティングモデルとアジャイル", "Operating model & agility"], d: ["価値を中心にした組織構造・統治・運営のリズムを設計し、人とエージェントが組むチームで顧客価値を届ける。", "Design value-centred structures, governance and operating rhythms so human-plus-agent teams deliver customer value."], col: "#5FD3C2" },
  { t: ["組織変革と人材（OCM & Talent）", "Organisational change & talent"], d: ["マインドセット・スキル・構造を作り替える。小さな反復と率直なフィードバックを全段階で回し、変化を信頼と参加を築く機会にする。", "Reshape mindsets, skills and structures; run small iterations and honest feedback through every phase, using change to build trust and engagement."], col: "#E28C4E" },
  { t: ["プロダクト変革", "Product transformation"], d: ["プロダクトのポートフォリオをどう構成し、どう資金を付け、どう運営するかを作り替える。", "Rework how the product portfolio is structured, funded and run."], col: "#D6B152" },
  { t: ["AIトランスフォーメーション", "AI transformation"], d: ["戦略から実装・定着まで。求人には「AIプロダクト運営モデル」の職種も見られる。", "From strategy to implementation and adoption; job postings include an 'AI product operating model' role."], col: "#C2417E" },
];
const SL_JPROLE = [
  ["チェンジマネジメント", "Change management"], ["ITプロジェクトマネジメント", "IT project management"], ["プロセス改善・最適化", "Process improvement"],
  ["組織設計・オペレーティングモデル", "Org design & operating model"], ["マネジメントコンサルティング経験（5年以上）", "5+ years of management consulting"], ["顧客と信頼関係を築く人間性", "Building trusted client relationships"],
];
const SL_SURVEY = [
  { n: "93%", t: ["人材面の課題を抱える組織", "organisations facing workforce challenges"], d: ["2025年10月公表・リーダー層と実務者 約2,000人。半数は基幹業務を旧来の基盤で動かす。2026年にほぼ全社がAI支出を増やす計画で、最大の動機は費用削減。", "Oct 2025, ~2,000 leaders and practitioners. Half run core apps on legacy platforms; nearly all plan higher AI spend in 2026, driven mainly by cost reduction."] },
  { n: "5%→52%", t: ["経営と技術の横断チームで進める割合", "share running AI via business-tech teams"], d: ["2023年から2024年への変化。AIは技術部門だけの案件ではなくなった。", "From 2023 to 2024: AI is no longer an IT-only project."] },
  { n: "68%", t: ["2025年の焦点を「データ・AI駆動」か「適応型組織」とした経営層", "executives whose 2025 focus is data/AI-driven or adaptive"], d: ["300人超の経営層との対話から。変革の需要の中心は、技術と組織の両方にある。", "From conversations with 300+ executives: demand sits in both technology and organisation."] },
];
const SL_CASES = [
  { co: "United Airlines", what: ["生成AIで運航情報の案内を個別化し、問い合わせの解決を速めた。", "Used GenAI to personalise flight updates and resolve enquiries faster."], num: ["個別化した案内 +35%／解決速度 2倍", "+35% personalised updates / 2× resolution speed"], lesson: ["速度は技術だけでは出ない。例外対応の権限と手順を現場に下ろして初めて解決が速くなる。", "Speed does not come from tech alone — it needs exception-handling authority and procedures pushed to the frontline."], jp: ["日本の航空・鉄道・小売の顧客対応では、例外の判断を誰に任せるかが変革の論点になる。", "In Japanese airline, rail and retail service, who may decide exceptions becomes the change issue."] },
  { co: "Norwegian Cruise Line", what: ["旅程の計画を生成AIで案内し、より高単価の予約につなげた。", "Guided trip planning with GenAI, driving higher-value bookings."], num: ["予約の可能性 +58%", "+58% booking likelihood"], lesson: ["売上側の効果は、比較群などの測定設計がないと主張できない。効果の定義を先に置く。", "Revenue-side benefits cannot be claimed without measurement design such as control groups; define the benefit first."], jp: ["旅行・小売の送客施策では、効果の検証方法を提案の段階で合意しておく。", "For Japanese travel and retail, agree how the effect will be tested at proposal stage."] },
  { co: "Avetta", what: ["顧客サービスの運用にAIを組み込んだ。", "Embedded AI into customer-service operations."], num: ["処理時間 −25%／自己解決 +38%", "−25% handle time / +38% deflection"], lesson: ["自己解決が増えると、人に残る問い合わせは難しいものに偏る。オペレーターの技能と評価の再設計が要る。", "More deflection leaves harder cases for people; operator skills and appraisal must be redesigned."], jp: ["コールセンターの評価が件数中心のままだと、難問の比率上昇で評価が下がる。指標の見直しを同時に。", "If call-centre appraisal stays volume-based, rising difficulty drags scores down — revise metrics at the same time."] },
  { co: "Jaja Finance", what: ["AIで顧客サービスの担当者の時間を空けた。", "Freed customer-service staff time with AI."], num: ["空いた時間 30〜40%", "30–40% time freed"], lesson: ["空いた時間を複雑な問い合わせへ振り向ける計画があったから効果になった。再配分の設計がベネフィット実現の核。", "It became a benefit because freed time was redirected to complex queries; redeployment design is the core of benefit realisation."], jp: ["日本の金融では、再配置先と育成の計画を先に示すと、現場と労務の合意が得やすい。", "In Japanese finance, showing redeployment and training plans first eases frontline and labour agreement."] },
];

const SLALOM_DOMAINS = [
  { id: "SL1", ja: "オペレーティングモデル設計", en: "Operating model design" },
  { id: "SL2", ja: "チェンジマネジメント", en: "Change management" },
  { id: "SL3", ja: "デリバリーとアジャイル", en: "Delivery & agility" },
  { id: "SL4", ja: "価値実現とビジネスケース", en: "Value & business case" },
  { id: "SL5", ja: "AI変革（人＋エージェント）", en: "AI transformation (human + agent)" },
  { id: "SL6", ja: "パートナー横断の翻訳", en: "Cross-platform translation" },
  { id: "SL7", ja: "顧客関係とアカウント成長", en: "Client relationship & growth" },
  { id: "SL8", ja: "日本とグローバルの橋渡し", en: "Japan–global bridging" },
  { id: "SL9", ja: "Slalomの働き方と価値観", en: "Slalom ways of working" },
];
const SL_SKILLS = [
  { id: "SL1", core: true, why: ["公式サービスは「価値中心の組織構造・統治・運営リズム」と「人＋エージェントのチーム」を掲げ、求人にもプロダクト運営モデルの職種が並ぶ。", "Service pages lead with value-centred structures, governance and rhythms for human-plus-agent teams; job postings list product-operating-model roles."],
    good: [["価値の流れ→能力→チーム→統治・資金の順で設計を説明できる", "Explain design in the order value stream → capabilities → teams → governance & funding"], ["稟議と決定権の関係を設計図に書き込める", "Write the ringi-versus-decision-rights relationship into the design"], ["移行期の二重運用と撤退条件を添えて経営に出せる", "Present with a dual-run transition and rollback criteria"]],
    drill: ["いまの案件の顧客で「誰がどの判断を待っているか」を5件書き出し、決定権の置き場所を一枚にする。", "List five decisions your client is waiting on and draw, on one page, where each decision right should sit."],
    trap: ["組織図から描き始め、現行の権限構造をなぞってしまう。", "Starting from the org chart and tracing the existing power structure."] },
  { id: "SL2", core: true, why: ["日本の求人の筆頭要件がチェンジマネジメント。公式には「小さな反復と率直なフィードバック」を全段階で回す進め方を掲げる。", "Change management heads the Japan job requirements; the official approach runs small iterations and honest feedback through every phase."],
    good: [["定着しない原因を段階（認知〜定着）で特定できる", "Locate the failing stage from awareness to reinforcement"], ["影響分析で、支援の厚みを集団ごとに変えられる", "Scale support by group using an impact assessment"], ["新しいやり方を評価・手順・権限に埋め込める", "Embed the new way in appraisal, procedures and permissions"]],
    drill: ["過去に関わった導入で使われなかったものを一つ選び、5段階のどこで詰まったかを根拠付きで書く。", "Pick one past rollout that went unused and write, with evidence, which of the five stages failed."],
    trap: ["研修の受講率を定着と取り違える。", "Mistaking training attendance for adoption."] },
  { id: "SL3", core: true, why: ["求人はITプロジェクトマネジメントとプロセス改善を明示。価値観「Get it done」はデリバリーの規律として評価される。", "Postings name IT project management and process improvement; 'Get it done' is judged as delivery discipline."],
    good: [["週次報告を「未決の判断」から始められる", "Open weekly reports with pending decisions"], ["前提（Assumption）を書き出し、定期的に点検する", "Write down assumptions and check them regularly"], ["範囲の追加に「何を外すか」を同じ場で合意できる", "Agree what drops out whenever scope is added"]],
    drill: ["今週の会議を一つ選び、議題を「決めてほしいこと・選択肢・推奨」の形に書き直す。", "Rewrite one of this week's agendas as 'decision needed, options, recommendation'."],
    trap: ["活動量の報告で安心し、詰まりを隠してしまう。", "Reporting activity and hiding the blockage."] },
  { id: "SL4", core: true, why: ["自社の2025年調査で経営層のAI投資の最大の動機は費用削減。変革の担当は、その効果を損益計算書まで届かせる設計で差がつく。", "In Slalom's 2025 survey the top AI-investment driver is cost reduction; the differentiator is landing it in the P&L."],
    good: [["効果ごとに持ち主・時期・科目を決められる", "Set owner, timing and line item for every benefit"], ["先行指標と遅行指標を因果でつなげる", "Connect leading and lagging indicators causally"], ["「時間×時給」を再配分の計画と結びつけて語れる", "Tie 'hours × wage' to a concrete redeployment plan"]],
    drill: ["いまの案件の効果を一つ選び、CFOの問い「どの科目に、いつ、いくら」に一枚で答える。", "Answer the CFO's 'which line, when, how much' on one page for one benefit of your engagement."],
    trap: ["効果の測定を導入後に考え始め、基準線を失う。", "Starting measurement after go-live and losing the baseline."] },
  { id: "SL5", core: true, why: ["2025年調査は経営の楽観と現場の準備の差（93%が人材面の課題）を示し、2026年の発信は人とエージェントの組み合わせを強調する。", "The 2025 survey shows the gap between executive optimism and readiness (93% face workforce challenges); 2026 messaging stresses human-plus-agent models."],
    good: [["最初の対象業務を効果・誤りの影響・推進役で選べる", "Pick first targets by impact, error containment and a champion"], ["元に戻せない操作を人の承認に残す線を引ける", "Draw the line that keeps irreversible actions with human approval"], ["エージェントの台帳（責任者・停止権限・再検証の契機）を作れる", "Build an agent register: owner, stop authority, revalidation triggers"]],
    drill: ["TechHubの実務論点マップで「エージェントの権限設計」を読み、顧客の業務一つに当てはめて線を引く。", "Read the agent-permission design issues in the Practice Issue Map and draw the line for one client process."],
    trap: ["成熟度を二段飛ばしした提案をする。", "Proposing two maturity stages ahead."] },
  { id: "SL6", core: false, why: ["700社超のパートナーと、社内の約半数がエンジニアという混成の組織。変革の担当は技術と業務の間を訳す役になる。", "700+ partners and a workforce reportedly half engineers: the transformation consultant translates between tech and business."],
    good: [["技術の選択が業務と組織に与える影響をエンジニアの言葉で議論できる", "Discuss how tech choices affect work and organisation in engineers' terms"], ["製品ではなく業務の成果から提案を組み立てる", "Build proposals from outcomes, not product features"], ["主要クラウド・CRMの運営モデル上の含意を一枚で説明できる", "Explain, on one page, the operating-model implications of the main clouds and CRM"]],
    drill: ["AWS・Salesforce・Microsoftのうち一つを選び、「導入後に誰の仕事がどう変わるか」を役割ごとに書く。", "Pick AWS, Salesforce or Microsoft and write, role by role, whose work changes how after go-live."],
    trap: ["パートナーの営業目標に範囲を合わせ、中立性を失う。", "Fitting scope to a partner's sales target and losing neutrality."] },
  { id: "SL7", core: false, why: ["ローカルマーケット型の運営では、同じ地域の顧客と長く付き合う中で次の案件が生まれる。日本法人はまだ大きくないため、入口案件から広げる力が効く。", "In a local-market model, work arises from long relationships in one region; the Japan office is still modest, so landing and expanding matters."],
    good: [["提案書を顧客の推進役が稟議に使える形で書ける", "Write proposals a client champion can use for ringi"], ["複数の関係者に目的と成果を共有しておける", "Keep several stakeholders aligned on goals and results"], ["案件の終わりに、成果と残課題と次の一手を顧客と文書で合意できる", "Close with a written agreement on results, open issues and next step"]],
    drill: ["担当顧客のステークホルダーマップ（推進役・決裁者・現場・情シス・法務）を作り、各人の関心を一行ずつ書く。", "Map your client's champion, decision-maker, frontline, IT and legal, with one line on each person's interest."],
    trap: ["担当者の好感触を案件の確度と取り違える。", "Mistaking a friendly contact for deal certainty."] },
  { id: "SL8", core: false, why: ["日本法人は欧米の発想と日本の専門性の融合を掲げる。グローバルの手法と事例を、日本の意思決定と現場に翻訳する役が求められる。", "Slalom Japan promotes blending Western ideas with Japanese expertise; you translate global methods and cases into Japanese decision-making."],
    good: [["手法の狙いを保ったまま、言葉と進め方を顧客に合わせられる", "Keep a method's intent while adapting language and process"], ["根回しを計画の工程として書き込める", "Plan pre-alignment as a real step"], ["日本で機能した工夫をグローバルへ事例として返せる", "Return what worked in Japan to the global network as cases"]],
    drill: ["このタブのグローバル事例を一つ選び、日本の役員会で使う一枚（移せる点・移せない点・前提の違い）を作る。", "Take one global case here and build a one-pager for a Japanese board: what transfers, what does not, and why."],
    trap: ["海外の数字をそのまま示し、同じ効果を約束してしまう。", "Quoting overseas figures as-is and promising the same effect."] },
  { id: "SL9", core: false, why: ["面接や評価では、深い専門を一つ持ち幅でつなぐT字型と、価値観に沿った振る舞いが重視されるとされる。", "Hiring and evaluation reportedly value a T-shape — one deep spike plus connecting breadth — and behaviour aligned with the values."],
    good: [["自分の深い専門（例：OCMかオペモデル）を一つ宣言できる", "Declare one deep spike (e.g. OCM or operating model)"], ["論点と仮説を持って社内の専門家に相談できる", "Consult internal experts with a framing and hypothesis"], ["解消した判断と残した能力を事実で記録している", "Keep a factual record of decisions unblocked and capability left"]],
    drill: ["自分の「T字」を一枚に描く：縦棒の専門、横棒でつなげる領域、次の四半期に伸ばす一点。", "Draw your T on one page: the vertical spike, the connecting breadth, and one thing to grow next quarter."],
    trap: ["束ねる役割の貢献を記録せず、他人の成果に埋もれる。", "Not recording a connector's contribution and disappearing into others' results."] },
];
const SL_COUNCIL = {
  lenses: [
    { n: ["戦略", "Strategy"], c: ["「AI活用」ではなく、人とエージェントが組む前提で組織・統治・資金の流れを作り替える論点へ引き上げられる人が、Slalomの変革の打ち出しに乗れる。", "Those who can lift 'AI use' into redesigning organisation, governance and funding for human-plus-agent work ride Slalom's transformation positioning."], w: ["変革の話が技術導入の付属品として扱われ、単価と差別化を失うこと。", "Change being treated as an add-on to tech rollout, losing price and differentiation."] },
    { n: ["AIコンサル／定着", "AI consulting / adoption"], c: ["技術が動いた後に使われる状態を作る力が中核。調査が示す経営と現場の差は、まさに変革の担当の仕事の場所。", "The core is making technology get used after go-live; the executive–workforce gap the survey shows is exactly where this role works."], w: ["研修や利用率で定着を語り、業務と評価が変わっていないこと。", "Talking adoption in training and usage terms while work and appraisal stay the same."] },
    { n: ["営業", "Sales"], c: ["ローカルマーケット型では関係の継続が次の案件を生む。日本は組織がまだ大きくなく、パートナー案件に変革を付けて入り、成果で広げる動きが現実的。", "In a local-market model, continuity creates the next deal; with a modest Japan office, entering via partner deals with change attached and expanding on results is realistic."], w: ["推進役一人に依存し、異動で案件が止まること。", "Depending on one champion and stalling when they move."] },
    { n: ["CFO", "CFO"], c: ["費用削減が投資の最大の動機である以上、効果を損益に届かせる設計（持ち主・時期・再配分）ができないと、変革は予算で負ける。", "With cost reduction the top driver, change loses budget fights unless benefits land in the P&L — owner, timing, redeployment."], w: ["「時間×時給」を効果と呼び、半年後に元へ戻ること。", "Calling hours × wage a benefit and slipping back within six months."] },
    { n: ["セキュリティ・ガバナンス", "Security & governance"], c: ["人とエージェントのチームを設計するなら、判断の範囲・承認の線・説明責任の記録は運営モデルの一部。後付けにしない。", "Designing human-plus-agent teams makes decision scope, approval lines and accountability records part of the operating model — not an afterthought."], w: ["速度を優先して権限と記録を後回しにし、事故の後に全面停止となること。", "Deferring permissions and records for speed, then a full stop after an incident."] },
  ],
  conflicts: [
    [["戦略 × 営業", "Strategy × Sales"], ["戦略は最初から「運営モデルの作り替え」を売れと言い、営業はパートナー案件に変革を付けて小さく入れと言う。", "Strategy wants to sell operating-model redesign up front; sales wants to enter small, attaching change to partner deals."], ["入口は小さく、提案書と契約に拡大の道筋（次の論点・優先交渉）を書いて両立させる。", "Enter small, but write the path to expansion — next issues, first-refusal — into proposal and contract."]],
    [["AIコンサル × CFO", "AI consulting × CFO"], ["定着の指標（利用・習熟）を重視する側と、損益の科目への着地を求める側がぶつかる。", "Adoption metrics (usage, proficiency) clash with the demand to land in P&L line items."], ["先行指標と遅行指標の二層で設計し、因果の説明を一枚にまとめる。", "Design two tiers — leading and lagging — and explain the causal link on one page."]],
    [["戦略 × ガバナンス", "Strategy × Governance"], ["人＋エージェントの運営モデルを速く広げたい側と、権限と記録を先に設計したい側。", "Speed in spreading human-plus-agent models versus designing permissions and records first."], ["元に戻せない操作だけ人の承認に残し、それ以外は自動に。台帳を最初の四半期に作る。", "Keep only irreversible actions under human approval, automate the rest, and build the register in the first quarter."]],
    [["グローバル × 日本", "Global × Japan"], ["小さな反復と率直なフィードバックというグローバルの型と、合意形成に時間をかける日本の顧客。", "The global habit of small iterations and candour versus Japanese clients' slower consensus."], ["率直さが安全に出る場（少人数・匿名）を設計し、根回しを工程として計画に入れる。", "Design safe channels for candour and plan pre-alignment as a step."]],
  ],
  rec: ["最初の一年は「OCMかオペレーティングモデルのどちらかを深い専門にし、AI変革とベネフィット実現を幅として持つT字」を目標にする。案件はパートナーの導入案件に変革を付けて入り、成果と能力移転で次の案件を作る。", "For the first year, aim for a T: one deep spike in OCM or operating-model design, with AI transformation and benefit realisation as breadth. Enter via partner implementations with change attached, and create the next engagement through results and capability transfer."],
  assume: [["入社時の職位はコンサルタント〜シニアコンサルタントと仮定（不明）。", "Joining grade assumed consultant to senior consultant (unknown)."], ["日本のTransformationの範囲は、求人とグローバルのサービス紹介から「OCM・運営モデル・PMO・AI定着」と推定。", "Japan Transformation scope inferred from postings and global service pages as OCM, operating model, PMO and AI adoption."], ["日本法人の規模は2023年時点の約100名という二次情報に拠る（現在は不明）。", "Japan office size relies on a secondary ~100 (2023) figure; current size unknown."]],
  falsify: [["日本のチームの実態がパートナー案件のPMO中心なら、デリバリー（SL3）とパートナー横断（SL6）の重みを上げる。", "If the Japan team is mostly PMO on partner deals, weight delivery (SL3) and cross-platform (SL6) higher."], ["職位がプリンシパル以上なら、顧客関係とアカウント成長（SL7）を最優先に置き換える。", "If you join at Principal or above, make client relationship and growth (SL7) the top priority."], ["主要顧客が外資系の日本拠点なら、稟議より本社との決定権の整理と英語での橋渡しを重く見る。", "If main clients are Japan arms of foreign firms, weight HQ decision rights and English bridging over ringi."]],
};
const SL_DRILLS = [
  { t: ["パートナー導入案件に変革を付ける", "Attach change to a partner rollout"], s: ["顧客はAWSへの基幹移行を発注済み。「組織の話は要らない、技術だけでいい」と言う。", "The client has bought an AWS core migration and says 'we don't need the people side, just the tech'."], hint: [["移行後に誰の仕事がどう変わるか", "Whose work changes how after migration"], ["変革がないと何が起きるか（放置コスト）", "What happens without change (cost of inaction)"], ["最小の入口は何か", "What is the smallest entry"]], ans: ["移行後に変わる役割と手順を3つ特定し、「使われない基盤」の放置コストを顧客の言葉で示す。入口は影響分析と定着指標の設計の2週間に絞り、拡大は成果で判断してもらう。", "Name three roles and procedures that change after migration, express the cost of an unused platform in the client's words, and scope entry to a two-week impact assessment and adoption-metric design, with expansion decided on results."] },
  { t: ["稟議とプロダクトオーナー", "Ringi and product owners"], s: ["製造業の顧客がプロダクト型へ移りたいが、すべての変更に部門長の稟議が必要。", "A manufacturer wants a product model, but every change needs department-head ringi."], hint: [["稟議を経ずに下せる判断の範囲", "Decisions that can bypass ringi"], ["予算の配分の単位", "The unit of funding"], ["試す部門", "Which unit pilots"]], ans: ["まず一つのプロダクトで、四半期の予算枠内の優先度変更はプロダクトオーナーが決めると明文化する。稟議は枠の設定と枠を超える判断に限定し、半年後に待ち時間の変化で評価する。", "In one product, codify that priority changes within a quarterly budget envelope belong to the product owner; limit ringi to setting and exceeding the envelope; evaluate by wait-time change after six months."] },
  { t: ["試行20件・本番0件を立て直す", "Twenty pilots, zero in production"], s: ["顧客は生成AIの試行を20件行ったが、本番に移ったものがない。90日で立て直す計画を求められた。", "The client ran 20 GenAI pilots with none in production and wants a 90-day turnaround."], hint: [["本番への判断基準", "Go/no-go criteria"], ["どれを捨てるか", "Which to drop"], ["持ち主", "Owners"]], ans: ["全件を効果・誤りの影響・推進役の有無で並べ、上位3件に絞る。各件に本番の判断基準と業務側の持ち主を決め、残りは明示的に停止する。90日目に基準で判定する。", "Rank all 20 on impact, error containment and champion; keep the top three, give each go/no-go criteria and a business owner, stop the rest explicitly, and judge at day 90 against the criteria."] },
  { t: ["「3割削減」への応答", "Responding to 'cut 30%'"], s: ["役員が「AIで人員を3割減らしたい」と最初に切り出した。", "An executive opens with 'we want AI to cut headcount 30%'."], hint: [["どの業務がどう変わるか", "Which work changes how"], ["浮いた力の行き先", "Where freed capacity goes"], ["現場の協力", "Frontline cooperation"]], ans: ["数字を否定せず、業務ごとの変化と浮く工数を先に描くと提案する。削減・採用抑制・再配置の三つの選択肢で財務効果を示し、現場への伝え方を役員と合意してから進める。", "Do not reject the number; propose mapping work change and freed effort first, show financial effect across cuts, hiring avoidance and redeployment, and agree frontline messaging with the executive before proceeding."] },
  { t: ["グローバル事例を役員会で使う", "Using a global case at a board"], s: ["役員会で米国の事例を紹介したいが、「うちは事情が違う」と言われるのが目に見えている。", "You want to show a US case at a board meeting but expect 'our situation is different'."], hint: [["移せる点・移せない点", "What transfers and what does not"], ["前提の違い", "Differing assumptions"], ["数値の性質", "Nature of the figures"]], ans: ["先に前提の違い（市場・規制・組織）を自分から示し、移せる仕組みを一つに絞って話す。数値は自社発表であることを添え、自社で検証する小さな試行を提案する。", "State the differences in market, regulation and organisation yourself, focus on one transferable mechanism, note the figures are vendor-published, and propose a small pilot to test locally."] },
  { t: ["抵抗する部門長との1on1", "1:1 with a resisting department head"], s: ["変革に強く反対する部門長と30分の面談がある。", "You have 30 minutes with a department head who strongly opposes the change."], hint: [["失うと感じているもの", "What they feel they will lose"], ["設計に反映できる点", "What the design can absorb"], ["次の約束", "The next commitment"]], ans: ["最初の20分は聞くことに使い、失うものを本人の言葉で確認する。設計に反映できる点を一つ持ち帰ると約束し、次回その結果を返す。説得は次回以降にする。", "Spend the first 20 minutes listening and confirm the loss in their words; promise to take one item back into the design and return with the result next time. Persuasion waits."] },
  { t: ["CFOに効果の着地を説明する", "Explaining benefit landing to the CFO"], s: ["CFOが「この変革の効果はどの科目に、いつ、いくら出るのか」と聞いた。", "The CFO asks which line item, when and how much."], hint: [["科目と時期", "Line item and timing"], ["前提となる行動", "Dependent actions"], ["範囲で示す", "Show a range"]], ans: ["科目（外注費・採用費など）・時期・金額の範囲を示し、それぞれが依存する行動（再配置・契約の見直し）と持ち主を併記する。先行指標で途中の進路を確かめる計画も添える。", "Give line item (contractors, hiring), timing and range, with the dependent actions and owners for each, plus a plan to track direction with leading indicators."] },
  { t: ["エージェント導入後の役割", "Roles after agent rollout"], s: ["請求処理にエージェントを導入したら、確認の担当者が疲弊し、承認が形だけになり始めた。", "After an invoicing agent went live, reviewers are overloaded and approvals are becoming rubber stamps."], hint: [["承認の範囲", "Scope of approval"], ["確認役の設計", "Reviewer role design"], ["記録", "Records"]], ans: ["元に戻せない操作（支払の確定など）だけに承認を絞り、その他は事後の抜き取り確認に変える。確認役の負荷と精度を指標にし、台帳に停止権限と再検証の契機を記す。", "Limit approval to irreversible actions such as payment release, move the rest to after-the-fact sampling, track reviewer load and accuracy, and record stop authority and revalidation triggers in the register."] },
];
const SL_PLAN = [
  { d: ["最初の30日", "Days 1–30"], items: [["社内の地図を作る：専門家・パートナー窓口・過去事例の置き場", "Map the firm: experts, partner contacts, where past cases live"], ["自分の深い専門（T字の縦棒）を一つ宣言する", "Declare your one deep spike"], ["配属案件のステークホルダーマップを作る", "Build the stakeholder map for your engagement"], ["英語で1分の自己紹介と専門の説明を用意する", "Prepare a one-minute English intro and specialty pitch"]] },
  { d: ["31〜60日", "Days 31–60"], items: [["案件で目に見える成果を一つ出す（例：影響分析・定着指標の設計）", "Deliver one visible result (e.g. impact assessment, adoption metrics)"], ["パートナー1社の導入で変わる役割を一枚にまとめる", "Summarise, on one page, the roles one partner's rollout changes"], ["学びを社内のナレッジとして1本書く", "Write one internal knowledge piece"]] },
  { d: ["61〜90日", "Days 61–90"], items: [["次の論点を顧客の言葉で整理し、提案の種にする", "Frame the next issue in the client's words as a proposal seed"], ["日本で機能した工夫をグローバルの仲間に共有する", "Share what worked in Japan with global peers"], ["このタブの自己評価をやり直し、次の四半期の一点を決める", "Redo the self-assessment here and pick one focus for next quarter"]] },
];
const SL_LEVELS = [["知っている", "Know it"], ["支援があればできる", "Do with help"], ["一人でできる", "Do alone"], ["人に教えられる", "Teach it"]];
