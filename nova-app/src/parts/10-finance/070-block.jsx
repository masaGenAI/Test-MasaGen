// @@nova-part 10-finance/070-block.jsx


/* ---------------------------------------------------------------------------
 * Schema normalization — runs after all SECTIONS.push(...) calls, before export.
 * Adapts every section to the shape the engine renders, without editing any
 * section source file. Idempotent: each rule only fires when the compact
 * markers are present, so engine-native sections are left untouched.
 *
 * Handles:
 *  - theme:{...}                    -> top-level accent / accentActive / headerSub
 *  - missing `no`                   -> derived from the number in `id`
 *  - quiz/mock question ch/a        -> choices:[{ja,en}] / ans
 *  - mock {title, items}            -> {ja, en, questions}
 *  - diagrams type + steps/items/branches -> layout + nodes:[{id,label,desc}]
 *  - compare cols:{ja,en}/rows:{ja,en}    -> cols:[{ja,en}] / rows:[{aspect,cells}]
 *  - compare cols with leading aspect header -> aspect header dropped (align to engine)
 *  - confuse a/b/tip                -> wrong (both confused items) / right (the tip)
 *  - glossary def:{ja,en}           -> descJa / descEn
 * ------------------------------------------------------------------------- */
(function normalizeSections() {
  function pairToArr(p) {
    var out = [], ja = (p && p.ja) || [], en = (p && p.en) || [];
    for (var i = 0; i < ja.length; i++) out.push({ ja: ja[i], en: en[i] });
    return out;
  }
  function fixQ(q) {
    if (q.choices == null && q.ch) q.choices = pairToArr(q.ch);
    if (q.ans == null && typeof q.a === "number") q.ans = q.a;
    return q;
  }
  function nodesFrom(list, id) {
    return list.map(function (st, i) {
      return { id: (id || "d") + "-" + i, label: { ja: st.ja, en: st.en }, desc: { ja: "", en: "" } };
    });
  }
  SECTIONS.forEach(function (s, si) {
    if (!s || typeof s !== "object") return;

    if (s.theme && typeof s.theme === "object") {
      if (s.accent == null) s.accent = s.theme.accent;
      if (s.accentActive == null) s.accentActive = s.theme.accentActive;
      if (s.headerSub == null) s.headerSub = s.theme.headerSub;
    }
    if (s.no == null) { var m = s.id && String(s.id).match(/(\d+)/); s.no = m ? parseInt(m[1], 10) : si + 1; }

    var d = s.data; if (!d) return;

    if (Array.isArray(d.quiz)) d.quiz.forEach(fixQ);

    if (Array.isArray(d.mock)) d.mock.forEach(function (mk) {
      if (mk.ja == null && mk.title) { mk.ja = mk.title.ja; mk.en = mk.title.en; }
      if (mk.questions == null && Array.isArray(mk.items)) mk.questions = mk.items;
      if (Array.isArray(mk.questions)) mk.questions.forEach(fixQ);
    });

    if (Array.isArray(d.diagrams)) d.diagrams.forEach(function (dg) {
      if (dg.layout == null && dg.type) dg.layout = dg.type;
      if (dg.nodes == null) {
        if (Array.isArray(dg.steps)) {
          if (dg.layout === "box" || dg.layout == null) dg.layout = "flow";
          dg.nodes = nodesFrom(dg.steps, dg.id);
        } else if (Array.isArray(dg.items)) {
          dg.layout = "flow";
          dg.nodes = nodesFrom(dg.items, dg.id);
        } else if (Array.isArray(dg.branches)) {
          dg.layout = "tree";
          var nodes = [];
          if (dg.root) nodes.push({ id: (dg.id || "d") + "-root", label: { ja: dg.root.ja, en: dg.root.en }, desc: { ja: "", en: "" } });
          dg.branches.forEach(function (b, i) {
            var kids = b.children || [];
            nodes.push({
              id: (dg.id || "d") + "-b" + i,
              label: { ja: b.ja, en: b.en },
              desc: { ja: kids.map(function (c) { return c.ja; }).join(" / "), en: kids.map(function (c) { return c.en; }).join(" / ") }
            });
          });
          dg.nodes = nodes;
        }
      }
      // any box lacking engine's left/right becomes a flow of its nodes
      if (dg.layout === "box" && (!dg.left || !dg.right) && Array.isArray(dg.nodes)) dg.layout = "flow";
      // the engine unconditionally reads dg.sub.ja — guarantee it exists
      if (!(dg.sub && typeof dg.sub === "object" && "ja" in dg.sub)) {
        dg.sub = { ja: "各要素をタップで詳細を表示", en: "Tap each item to expand details" };
      }
      // avoid blank expand panels: converted nodes with no desc fall back to their label
      if (Array.isArray(dg.nodes)) dg.nodes.forEach(function (n) {
        if (!(n.desc && (n.desc.ja || n.desc.en))) n.desc = { ja: (n.label && n.label.ja) || "", en: (n.label && n.label.en) || "" };
      });
    });

    if (Array.isArray(d.compare)) d.compare.forEach(function (cp) {
      if (cp.cols && !Array.isArray(cp.cols) && Array.isArray(cp.cols.ja)) {
        var colsFull = pairToArr(cp.cols);
        cp.rows = (cp.rows || []).map(function (r) {
          var ja = r.ja || [], en = r.en || [];
          return { aspect: { ja: ja[0], en: en[0] }, cells: ja.slice(1).map(function (x, i) { return { ja: x, en: en[i + 1] }; }) };
        });
        cp.cols = colsFull.slice(1);
      } else if (Array.isArray(cp.cols) && Array.isArray(cp.rows) && cp.rows[0] &&
                 Array.isArray(cp.rows[0].cells) && cp.cols.length === cp.rows[0].cells.length + 1) {
        cp.cols = cp.cols.slice(1); // drop leading aspect header so columns align
      }
    });

    if (Array.isArray(d.confuse)) d.confuse.forEach(function (cf) {
      if (cf.wrong == null && (cf.a || cf.b || cf.tip)) {
        var a = cf.a || { ja: "", en: "" }, b = cf.b || { ja: "", en: "" };
        cf.wrong = { ja: [a.ja, b.ja].filter(Boolean).join("　／　"), en: [a.en, b.en].filter(Boolean).join(" / ") };
        cf.right = cf.tip ? { ja: cf.tip.ja, en: cf.tip.en } : { ja: b.ja, en: b.en };
      }
    });

    if (Array.isArray(d.glossary)) d.glossary.forEach(function (g) {
      if (g.descJa == null && g.def) { g.descJa = g.def.ja; g.descEn = g.def.en; }
    });
  });
})();

  // 弱点レーダー用：セクションごとのクイズの正誤（kb_<セクション>_progress_v1 = { 問題id: { picked, correct } }）の保存キーと見出し。
  // 関数ではなく素のデータにしておく（ビルドではこのハブを開いたときに読み込むので、ポータルが読むこの値はビルド時に計算して埋め込む）
  App.WEAK_KEYS = SECTIONS.map((x) => ({ key: "kb_" + x.id + "_progress_v1", label: [(x.no ? x.no + ". " : "") + (x.title ? x.title.ja : x.id), (x.no ? x.no + ". " : "") + (x.title ? x.title.en : x.id)] }));
  // ポータルの横断検索に出すセクション
  App.PORTAL_INDEX = (en) => SECTIONS.map((x) => ({ label: (x.no ? x.no + ". " : "") + (x.title ? x.title[en ? "en" : "ja"] : x.id), sub: (en ? "Finance · " : "Finance・") + (x.sub ? x.sub[en ? "en" : "ja"] : ""), hash: "finance/" + x.id, extra: x.title ? [x.title.ja, x.title.en, x.sub && x.sub.ja].join(" ") : "" }));
  return App;
})();

