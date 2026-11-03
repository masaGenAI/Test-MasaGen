// ビルド時だけ、Book-Summary（public/booksummaryhub.html・約40MB の1ファイル）を「最初の画面に要る小さい HTML」と
// 「開いたときに読み込む別ファイル booksummary-*.js」に分けて dist/ に書き出す Vite プラグイン（と単体のコマンド）。
//
// なぜ：dist/booksummaryhub.html は public/ からそのまま写した 39.5MB（gzip で 12MB）で、ブラウザは全部を
// ダウンロード・解析するまで何も描けなかった（10Mbps の携帯回線で約10秒）。
// public/booksummaryhub.html はスキルや検査スクリプト（flier-summary-authoring・youtube-summary-authoring・
// nova-consistency-audit）が直接読み書きする「唯一の原稿」なので、ファイルは分けず、ビルドのときにだけ分ける。
// 原稿はそのまま開いても（file:// でも）全部入りの1ファイルとして動く。
//
// 何をするか：
//   1. 原稿の大きい <script> を Rollup のパーサー（vite が再公開している parseAstAsync）で構文木にし、データの部分を見分ける。
//      データ＝下の PROVIDED の宣言と、それらを参照するトップレベルの文（Object.assign(SOURCE_DIGEST, …)・
//      attachYTBooks などの書架へのぶら下げ・クイズの派生）、およびそれらが読む素のリテラルの const（YT_BOOKS・QUIZ_SOURCE など）。
//   2. そのデータの部分だけを Node の vm で実行し（ブラウザと同じ元のコード）、ぶら下げ後の DATA・クイズ・出典の総括を得る。
//   3. 書き出すもの：
//      - dist/booksummaryhub.html … 元の HTML・CSS・画面のコードに、索引（<script type="application/json" id="bsh-index">：
//        書架の木・各本の書名や著者などの軽い項目・テーマ総括）と読み込み係（window.__BSH_LAZY__）を入れたもの。
//        最初の画面（出典の一覧・件数・進捗・検索の書名一致）はこれだけで描ける。
//      - dist/booksummary-b<N>-<hash>.js … 本の本文（BODY_FIELDS：一言・概要・要点・示唆・注記・図解など）とその本のクイズ。
//        出典の枝ごと（flier はジャンルごと）にまとめて約 600KB ずつ。本を開いたときにその1つを読み込む。
//      - dist/booksummary-n<N>-<hash>.js … 出典の総括（SOURCE_DIGEST・SOURCE_EXTRA・THEME_NOTE・GROUP_NOTE）。出典を開いたときに読み込む。
//      - dist/booksummary-q<N>-<hash>.js … 本文のない本のクイズ（あれば）。
//      別ファイルは通常の <script>（fetch ではない）で読み込み、window.__BSH_CHUNKS__[key] に入れる形なので、
//      file:// で直接開いても、GitHub Pages のサブパスでも、ポータル（blob: の iframe。window.__NOVA_ASSET_BASE__ で場所を知る）でも読める。
//      最初の画面のあとは、手すきの時間に残りを順に読み込んでおく（通信量を節約する設定のときはしない）。検索は本文が届いた分から順に広がる。
//   4. 画面のコード（原稿の中）は、データの読み込みを bshDefer({...}, retry) で待つ（原稿のままのときは何もしない）。
//      ここでは、画面のコードが別ファイルに移した項目を「待たずに」読んでいないかを構文木で確かめ、違反があればビルドを止める（下の READERS）。
//
// 原稿の HTML を直すときの決まり：
//   - 本の BODY_FIELDS（overview など）を新しい関数で読むときは、その関数を BODY_READERS に足す。
//     足すのは「本を開いたあと（openBook の後）にだけ呼ばれる」関数か、本文がまだのときを自分で扱う関数（bookHay）だけ。
//     一覧・検索結果の行などで読みたいときは、その項目を BODY_FIELDS から外す（索引に入るので最初から読める）。
//   - BOOK_QUIZ や SOURCE_DIGEST などを新しい関数で読むときも同じ（LAZY_READERS）。画面を開く入口で bshDefer を呼んでから使う。
// npm run dev（開発サーバー）では何もしない（原稿の1ファイルをそのまま配る）。
//
// 単体でも動かせる： node scripts/booksummary-split.mjs public/booksummaryhub.html <出力フォルダ>
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

// 画面のコードが名前で読むデータ。DATA 以外は、索引に入れる（INDEXED）か、別ファイルから後で埋める（LAZY）
const INDEXED = ["DATA", "THEME_SYNTHESIS", "THEME_QUIZ_BOOKS"];
const LAZY_READERS = {
  // 名前: それを読んでよい関数（どれも bshDefer で読み込みを待つ画面の中でだけ呼ばれる）
  BOOK_QUIZ: ["wrongQuestions", "bookQuizStats", "themeQuizQuestions", "mountBookQuiz", "openBook"],
  BOOK_QUIZ_TITLE: ["wrongQuestions", "themeQuizQuestions"],
  SOURCE_DIGEST: ["sourceDigestHTML"],
  SOURCE_EXTRA: ["sourceDigestHTML"],
  THEME_NOTE: ["themeNoteFor"],
  GROUP_NOTE: ["groupNoteFor"],
};
const PROVIDED = [...INDEXED, ...Object.keys(LAZY_READERS)];
// 本の項目のうち、本を開いたとき（と全文検索）にだけ使うもの。索引には入れず、本文のファイルに入れる
const BODY_FIELDS = ["oneLiner", "overview", "points", "takeaway", "notes", "figs", "concepts", "diagram",
  "srcNote", "url", "publisher", "format", "pages", "price", "asin", "refUnmentioned", "shelf"];
// BODY_FIELDS と同じ名前のプロパティを読んでよい関数。本を開いたあとにだけ呼ばれるか、本の以外のもの
// （テーマ総括・出典の総括の points など）を読む関数
const BODY_READERS = [
  // 本の詳細ページ（openBook）と、その中の図解・重要概念
  "openBook", "diagramHTML", "bookFigsHTML", "kConceptsHTML", "kChapIdx", "kChapLinks", "kBuildMap", "kWireMap", "kcView", "kcSelect", "kcZoom",
  // 全文検索の文字列（本文がまだの本は書名などだけで照合し、届いてから作り直す）
  "bookHay",
  // 本以外の points（テーマ総括・出典の総括・テーマの読み筋）
  "synthesisHTML", "sourceDigestHTML", "themeNoteHTML",
];
const CHUNK_BYTES = 600 * 1024;
const NOTE_BYTES = 256 * 1024;
const GLOBALS = new Set(["Object", "Array", "JSON", "String", "Number", "Boolean", "Math", "Set", "Map", "console", "undefined", "Infinity", "NaN", "isFinite", "parseInt", "parseFloat"]);

// ---------------------------------------------------------------- 構文木の小道具
// 名前の参照（プロパティ名・ラベルなどを除いた識別子）ごとに visit(name, node) を呼ぶ。スコープは見ない（＝上位集合）
function forEachRef(root, visit) {
  const stack = [[root, null, null]];
  while (stack.length) {
    const [n, parent, key] = stack.pop();
    if (!n || typeof n !== "object") continue;
    if (Array.isArray(n)) { for (let i = n.length - 1; i >= 0; i--) stack.push([n[i], parent, key]); continue; }
    if (typeof n.type !== "string") continue;
    if (n.type === "Identifier") {
      if (parent && ((parent.type === "MemberExpression" && key === "property" && !parent.computed) ||
        ((parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") && key === "key" && !parent.computed) ||
        ((parent.type === "LabeledStatement" || parent.type === "BreakStatement" || parent.type === "ContinueStatement") && key === "label") ||
        parent.type === "MetaProperty")) continue;
      visit(n.name, n);
      continue;
    }
    for (const k in n) {
      if (k === "type" || k === "start" || k === "end") continue;
      const v = n[k];
      if (v && typeof v === "object") stack.push([v, n, k]);
    }
  }
}
// a.b（計算でない）のプロパティ名ごとに visit(name, node)
function forEachMember(root, visit) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if (!n || typeof n !== "object") continue;
    if (Array.isArray(n)) { for (let i = n.length - 1; i >= 0; i--) stack.push(n[i]); continue; }
    if (typeof n.type !== "string") continue;
    if (n.type === "MemberExpression" && !n.computed && n.property && n.property.type === "Identifier") visit(n.property.name, n);
    for (const k in n) {
      if (k === "type" || k === "start" || k === "end") continue;
      const v = n[k];
      if (v && typeof v === "object") stack.push(v);
    }
  }
}
// 素のリテラル（JSON にできる値だけでできた式）か
function isPureLiteral(n) {
  switch (n && n.type) {
    case "Literal": return !n.regex && typeof n.value !== "bigint";
    case "TemplateLiteral": return n.expressions.length === 0;
    case "ArrayExpression": return n.elements.every((e) => e && e.type !== "SpreadElement" && isPureLiteral(e));
    case "ObjectExpression": return n.properties.every((p) => p.type === "Property" && p.kind === "init" && !p.method && !p.computed && isPureLiteral(p.value));
    case "UnaryExpression": return (n.operator === "-" || n.operator === "+") && n.argument.type === "Literal" && typeof n.argument.value === "number";
    default: return false;
  }
}
function declNames(n) {
  if (n.type === "VariableDeclaration") return n.declarations.flatMap((d) => (d.id.type === "Identifier" ? [d.id.name] : []));
  if ((n.type === "FunctionDeclaration" || n.type === "ClassDeclaration") && n.id) return [n.id.name];
  return [];
}

// ---------------------------------------------------------------- 原稿の読み取り
function findMainScript(html) {
  const re = /<script>([\s\S]*?)<\/script>/g;
  let m, best = null;
  while ((m = re.exec(html))) if (!best || m[1].length > best.code.length) best = { tagStart: m.index, start: m.index + "<script>".length, code: m[1] };
  if (!best) throw new Error("booksummary-split: 原稿に <script> が見つかりません");
  return best;
}

function lineOf(text, pos) { let n = 1, i = -1; while ((i = text.indexOf("\n", i + 1)) >= 0 && i < pos) n++; return n; }

/**
 * 原稿の HTML を分ける。
 * @param {string} html 原稿（public/booksummaryhub.html）の中身
 * @param {{ parseAstAsync: Function, prefix?: string, chunkBytes?: number, noteBytes?: number, warn?: (msg: string) => void }} opts
 * @returns {Promise<{ html: string, files: { name: string, code: string }[], report: object }>}
 */
export async function splitBookSummary(html, opts) {
  const { parseAstAsync } = opts;
  const prefix = opts.prefix || "booksummary-";
  const chunkBytes = opts.chunkBytes || CHUNK_BYTES, noteBytes = opts.noteBytes || NOTE_BYTES;
  const warn = opts.warn || ((m) => console.warn(m));
  const main = findMainScript(html);
  const code = main.code;
  const where = (pos) => "booksummaryhub.html:" + lineOf(html, main.start + pos);
  const ast = await parseAstAsync(code);

  // --- 1. データの部分を見分ける
  const top = new Map(); // 名前 → 宣言の文
  for (const n of ast.body) for (const x of declNames(n)) top.set(x, n);
  for (const name of PROVIDED) {
    const n = top.get(name);
    if (!n) throw new Error(`booksummary-split: 原稿にトップレベルの const ${name} がありません`);
    if (n.type !== "VariableDeclaration" || n.kind !== "const" || n.declarations.length !== 1 || !isPureLiteral(n.declarations[0].init))
      throw new Error(`booksummary-split: ${name} は「const ${name} = <リテラル>;」の形で1つだけ宣言してください（${where(n.start)}）`);
  }
  const refsCache = new Map();
  const refsOf = (n) => { if (!refsCache.has(n)) { const s = new Set(); forEachRef(n, (x) => s.add(x)); refsCache.set(n, s); } return refsCache.get(n); };
  const dataNames = new Set(PROVIDED);
  const selected = new Set(PROVIDED.map((x) => top.get(x)));
  for (let changed = true; changed;) {
    changed = false;
    for (const n of ast.body) {
      if (selected.has(n) || n.type === "VariableDeclaration" || n.type === "FunctionDeclaration" || n.type === "ClassDeclaration") continue;
      if ([...refsOf(n)].some((x) => dataNames.has(x))) { selected.add(n); changed = true; }
    }
    for (const n of [...selected]) {
      for (const x of refsOf(n)) {
        if (dataNames.has(x) || !top.has(x)) continue;
        const d = top.get(x);
        if (d.type === "VariableDeclaration" && d.kind === "const" && d.declarations.length === 1 && isPureLiteral(d.declarations[0].init)) {
          dataNames.add(x); selected.add(d); changed = true;
        } else {
          throw new Error(`booksummary-split: データの文（${where(n.start)}）が画面のコードの ${x} を読んでいます。データの文はデータ（リテラルの const）だけを読むようにしてください`);
        }
      }
    }
  }
  for (const n of selected) for (const x of refsOf(n)) if (!dataNames.has(x) && top.has(x)) throw new Error(`booksummary-split: データの文（${where(n.start)}）が ${x} を読んでいます`);
  const removedOnly = new Set([...dataNames].filter((x) => !PROVIDED.includes(x)));

  // --- 2. 残る画面のコードが、別ファイルに移したものを待たずに読んでいないか
  const problems = [];
  const lazyBy = new Map(Object.entries(LAZY_READERS).map(([k, v]) => [k, new Set(v)]));
  const bodyFields = new Set(BODY_FIELDS), bodyReaders = new Set(BODY_READERS);
  for (const n of ast.body) {
    if (selected.has(n)) continue;
    const owner = declNames(n)[0] || "(トップレベルの文)";
    forEachRef(n, (x, node) => {
      if (removedOnly.has(x)) problems.push(`${where(node.start)} ${owner} が ${x} を読んでいます。dist では ${x} は無くなる（中身は DATA などに入る）ので、DATA・BOOK_INDEX から読んでください`);
      else if (lazyBy.has(x) && !lazyBy.get(x).has(owner)) problems.push(`${where(node.start)} ${owner} が ${x} を読んでいます。dist では ${x} は開いたときに別ファイルから埋めるので、画面の入口で bshDefer を呼んでから使い、scripts/booksummary-split.mjs の LAZY_READERS に ${owner} を足してください`);
    });
    forEachMember(n, (p, node) => {
      if (bodyFields.has(p) && !bodyReaders.has(owner)) problems.push(`${where(node.start)} ${owner} が .${p} を読んでいます。dist では本の ${p} は本を開いたときに読み込むので、一覧などで使うなら scripts/booksummary-split.mjs の BODY_FIELDS から ${p} を外し、本を開いたあとだけなら BODY_READERS に ${owner} を足してください`);
    });
  }
  if (problems.length) throw new Error("booksummary-split:\n" + problems.join("\n"));

  // --- 3. データの部分を実行する（ブラウザと同じ元のコード。書架へのぶら下げやクイズの派生もここで済ませる）
  const order = ast.body.filter((n) => selected.has(n));
  const program = order.map((n) => code.slice(n.start, n.end)).join("\n;\n") +
    `\n;JSON.stringify({ ${PROVIDED.join(", ")} }, function (k, v) {\n` +
    `  var t = typeof v;\n  if (t === "function" || t === "undefined" || t === "symbol" || t === "bigint" || (t === "number" && !isFinite(v))) throw new Error("JSON にできない値: " + k + " (" + t + ")");\n  return v;\n});`;
  const warnings = [];
  const ctx = vm.createContext({ console: { warn: (...a) => warnings.push(a.join(" ")), log: () => {}, error: (...a) => warnings.push(a.join(" ")) } });
  let out;
  try {
    out = JSON.parse(vm.runInContext(program, ctx, { filename: "booksummaryhub.html(data)" }));
  } catch (e) {
    throw new Error("booksummary-split: データの部分を実行できませんでした: " + (e && e.message));
  }
  for (const w of warnings) warn("[booksummary-split] 原稿のデータ: " + w);

  // --- 4. 本を、索引に入れる軽い項目と本文に分け、本文を出典の枝ごとのファイルにまとめる
  const stubs = []; // 書架の木を順にたどった順（読み込み係も同じ順にたどる）
  const walk = (node, topId) => { (node.books || []).forEach((b) => stubs.push({ b, topId })); (node.children || []).forEach((c) => walk(c, topId)); };
  out.DATA.forEach((cat) => walk(cat, cat.id));
  const firstPath = (b) => (Array.isArray(b.srcPaths) && b.srcPaths.length ? b.srcPaths[0] : Array.isArray(b.srcPath) && b.srcPath.length ? b.srcPath : [b.src || "flier"].concat(b.ch ? [b.ch] : []));
  const groupOrder = new Map();
  const entries = [];
  const bodyIdx = new Array(stubs.length).fill(-1);
  stubs.forEach(({ b, topId }, pos) => {
    const heavy = {};
    let has = false;
    for (const k of Object.keys(b)) if (bodyFields.has(k)) { heavy[k] = b[k]; delete b[k]; has = true; }
    if (!has) return;
    const p = firstPath(b);
    const group = p[0] === "flier" ? "flier/" + topId : p.slice(0, 3).join("/");
    if (!groupOrder.has(group)) groupOrder.set(group, groupOrder.size);
    entries.push({ pos, id: b.id, group, heavy, bytes: Buffer.byteLength(JSON.stringify(heavy)) + 8 });
  });
  entries.sort((a, b) => groupOrder.get(a.group) - groupOrder.get(b.group) || a.pos - b.pos);
  const pack = (items, target, keyOf) => {
    const res = [];
    let cur = null, curKey = null;
    for (const e of items) {
      const k = keyOf(e);
      if (cur && (cur.bytes + e.bytes > target || (k !== curKey && cur.bytes >= target / 2))) { res.push(cur); cur = null; }
      if (!cur) cur = { items: [], bytes: 0 };
      cur.items.push(e); cur.bytes += e.bytes; curKey = k;
    }
    if (cur) res.push(cur);
    return res;
  };
  const chunks = pack(entries, chunkBytes, (e) => e.group).map((c, i) => ({ key: "b" + i, kind: "b", data: { b: c.items.flatMap((e) => [e.pos, e.heavy]) }, groups: [...new Set(c.items.map((e) => e.group))] }));
  chunks.forEach((c, i) => c.data.b.forEach((x, k) => { if (k % 2 === 0) bodyIdx[x] = i; }));

  // クイズ：その本の本文と同じファイルに入れる（同じ id が2か所にあれば、BOOK_INDEX と同じく後ろの方）。本文のない本の分は q0 に
  const lastPos = new Map();
  stubs.forEach(({ b }, pos) => lastPos.set(b.id, pos));
  const quizOf = {};
  const misc = { key: "q0", kind: "q", data: { q: {}, t: {} } };
  for (const bid of Object.keys(out.BOOK_QUIZ)) {
    const pos = lastPos.get(bid);
    const ci = pos === undefined ? -1 : bodyIdx[pos];
    const c = ci >= 0 ? chunks[ci] : misc;
    c.data.q = c.data.q || {}; c.data.t = c.data.t || {};
    c.data.q[bid] = out.BOOK_QUIZ[bid];
    if (Object.prototype.hasOwnProperty.call(out.BOOK_QUIZ_TITLE, bid)) c.data.t[bid] = out.BOOK_QUIZ_TITLE[bid];
    quizOf[bid] = c;
  }
  if (Object.keys(misc.data.q).length) chunks.push(misc);

  // 出典の総括：キー（'yt/sam/psych' など）の上2段ごとにまとめる
  const NOTE_NAMES = ["SOURCE_DIGEST", "SOURCE_EXTRA", "THEME_NOTE", "GROUP_NOTE"];
  const noteKeys = [...new Set(NOTE_NAMES.flatMap((x) => Object.keys(out[x])))];
  const noteGroup = (k) => k.split("/").slice(0, 2).join("/");
  const noteGroupOrder = new Map();
  noteKeys.forEach((k) => { if (!noteGroupOrder.has(noteGroup(k))) noteGroupOrder.set(noteGroup(k), noteGroupOrder.size); });
  const noteItems = noteKeys.map((k, i) => {
    const val = {};
    for (const x of NOTE_NAMES) if (Object.prototype.hasOwnProperty.call(out[x], k)) val[x] = out[x][k];
    return { k, i, val, bytes: Buffer.byteLength(JSON.stringify(val)) };
  }).sort((a, b) => noteGroupOrder.get(noteGroup(a.k)) - noteGroupOrder.get(noteGroup(b.k)) || a.i - b.i);
  const noteOf = {};
  pack(noteItems, noteBytes, (e) => noteGroup(e.k)).forEach((c, i) => {
    const n = {};
    for (const x of NOTE_NAMES) n[x] = {};
    for (const e of c.items) for (const x of Object.keys(e.val)) n[x][e.k] = e.val[x];
    const ch = { key: "n" + i, kind: "n", data: { n }, groups: [...new Set(c.items.map((e) => noteGroup(e.k)))] };
    chunks.push(ch);
    for (const e of c.items) noteOf[e.k] = ch;
  });

  // --- 5. 別ファイル（JSON.parse で読む JS。<script> で読み込むと window.__BSH_CHUNKS__[key] に入る）
  const jsString = (s) => "'" + s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + "'";
  const files = chunks.map((c) => {
    const body = `(window.__BSH_CHUNKS__=window.__BSH_CHUNKS__||{})[${JSON.stringify(c.key)}]=JSON.parse(${jsString(JSON.stringify(c.data))});\n`;
    const hash = crypto.createHash("sha256").update(body).digest("hex").slice(0, 10);
    c.file = `${prefix}${c.key}-${hash}.js`;
    return { name: c.file, code: body };
  });
  const idx = (c) => chunks.indexOf(c);
  const lazy = {
    files: chunks.map((c) => c.file), keys: chunks.map((c) => c.key), kind: chunks.map((c) => c.kind).join(""),
    body: bodyIdx, quiz: Object.fromEntries(Object.entries(quizOf).map(([k, c]) => [k, idx(c)])),
    note: Object.fromEntries(Object.entries(noteOf).map(([k, c]) => [k, idx(c)])), prefetchDelay: 2000,
  };

  // --- 6. 最初に配る HTML：索引（JSON）と読み込み係を入れ、データの文を「索引から作る宣言」に置き換える
  const index = { DATA: out.DATA, THEME_SYNTHESIS: out.THEME_SYNTHESIS, THEME_QUIZ_BOOKS: out.THEME_QUIZ_BOOKS, lazy };
  const indexJson = JSON.stringify(index).replace(/</g, "\\u003c");
  const decl =
    "/* ---- ここから npm run build（scripts/booksummary-split.mjs）が作ったもの ----\n" +
    "   原稿のデータ（DATA・YT_BOOKS・KINDLE_BOOKS・NOTE_BOOKS・IG_BOOKS・クイズ・出典の総括など）は、書架へのぶら下げまで済ませてから\n" +
    "   索引（#bsh-index：書架の木・各本の書名などの軽い項目）と別ファイル（booksummary-*.js：本文・クイズ・出典の総括）に分けてある。\n" +
    "   BOOK_QUIZ などは空で始まり、開いたときに読み込み係（window.__BSH_LAZY__）が埋める。 */\n" +
    "const __BSH_INDEX = JSON.parse(document.getElementById('bsh-index').textContent);\n" +
    INDEXED.map((x) => `const ${x} = __BSH_INDEX.${x};`).join("\n") + "\n" +
    Object.keys(LAZY_READERS).map((x) => `const ${x} = {};`).join("\n") + "\n" +
    `window.__BSH_LAZY__.attach(__BSH_INDEX.lazy, { ${PROVIDED.join(", ")} });\n` +
    "/* ---- ここまで ---- */";
  let newCode = "", last = 0, placed = false;
  for (const n of ast.body) {
    if (!selected.has(n)) continue;
    newCode += code.slice(last, n.start) + (placed ? "" : decl);
    placed = true;
    last = n.end;
    if (code[last] === ";") last++;
  }
  newCode += code.slice(last);
  const runtime = `(${bshLazyRuntime.toString()})();`;
  let core = html.slice(0, main.tagStart) +
    `<script type="application/json" id="bsh-index">${indexJson}</script>\n<script>${runtime}</script>\n<script>` + newCode + html.slice(main.start + code.length);
  const headEnd = core.indexOf("</head>");
  if (headEnd < 0) throw new Error("booksummary-split: 原稿に </head> がありません");
  core = core.slice(0, headEnd) + `<style>${RUNTIME_CSS}</style>\n` + core.slice(headEnd);

  const bytes = (s) => Buffer.byteLength(s);
  const report = {
    source: bytes(html), core: bytes(core), index: bytes(indexJson), books: stubs.length, chunks: files.length,
    chunkBytes: files.reduce((a, f) => a + bytes(f.code), 0), largest: Math.max(...files.map((f) => bytes(f.code))),
    removed: [...dataNames].sort(),
  };
  return { html: core, files, report };
}

// ---------------------------------------------------------------- 読み込み係（dist の HTML に入る。ブラウザで動く）
// 文字列にして埋め込むので、この関数の外の名前は使わないこと
function bshLazyRuntime() {
  "use strict";
  var W = window, D = document;
  var REG = (W.__BSH_CHUNKS__ = W.__BSH_CHUNKS__ || {});
  var own = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var cfg = null, store = null, stubs = [], idChunks = Object.create(null);
  var done = [], loading = [], failed = [], bodyChunks = [], bodyLeft = 0;
  var pending = 0, seq = 0, toast = null, toastTimer = 0;
  var searchCb = null, searchTimer = 0, queue = [], active = 0, limit = 1;

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  // ポータルの中（blob: の iframe）では相対パスが解決できないので、ポータルが教える場所から読む
  function url(file) { var b = W.__NOVA_ASSET_BASE__; return b ? b + file : file; }

  function load(i, prio) {
    if (done[i]) return Promise.resolve();
    if (loading[i]) return loading[i];
    var key = cfg.keys[i], file = cfg.files[i];
    var p = new Promise(function (resolve, reject) {
      var s = D.createElement("script");
      s.src = url(file);
      s.async = true;
      s.charset = "utf-8";
      if (prio) s.setAttribute("fetchpriority", prio);
      s.onload = function () {
        s.remove();
        if (!own(REG, key)) { reject(new Error(file + " を実行できませんでした")); return; }
        var data = REG[key];
        delete REG[key];
        try { apply(i, data); } catch (e) { reject(e); return; }
        resolve();
      };
      s.onerror = function () { s.remove(); reject(new Error(file + " を読み込めませんでした")); };
      (D.head || D.documentElement).appendChild(s);
    });
    loading[i] = p;
    failed[i] = false;
    p.then(function () { loading[i] = null; }, function () {
      loading[i] = null;
      failed[i] = true;
      if (cfg.kind.charAt(i) === "b") bodyChanged();
    });
    return p;
  }
  function apply(i, d) {
    var k, b = d.b || [], q = d.q || {}, t = d.t || {}, n = d.n || {};
    for (k = 0; k < b.length; k += 2) Object.assign(stubs[b[k]], b[k + 1]);
    for (k in q) if (own(q, k)) { store.BOOK_QUIZ[k] = q[k]; if (own(t, k)) store.BOOK_QUIZ_TITLE[k] = t[k]; }
    for (k in n) if (own(n, k)) Object.assign(store[k], n[k]);
    done[i] = true;
    if (cfg.kind.charAt(i) === "b") { bodyLeft--; bodyChanged(); }
  }

  // ---- 画面を開く前の待ち合わせ（原稿の bshDefer から呼ばれる）
  function missing(need) {
    var out = [];
    var add = function (i) { if (typeof i === "number" && i >= 0 && !done[i] && out.indexOf(i) < 0) out.push(i); };
    if (need.book != null && idChunks[need.book]) idChunks[need.book].forEach(add);
    (need.quiz || []).forEach(function (bid) { if (own(cfg.quiz, bid)) add(cfg.quiz[bid]); });
    if (need.note != null && own(cfg.note, need.note)) add(cfg.note[need.note]);
    return out;
  }
  function defer(need, retry) {
    var list = missing(need);
    if (!list.length) return false;
    var tok = ++seq;
    pending = tok;
    showLoading(tok);
    Promise.all(list.map(function (i) { return load(i, "high"); })).then(function () {
      if (pending !== tok) return;
      pending = 0;
      hideToast();
      try { retry(); } catch (e) { setTimeout(function () { throw e; }, 0); }
    }, function (err) {
      try { console.error("[Book-Summary] 読み込めませんでした:", err && err.message); } catch (e) {}
      if (pending !== tok) return;
      showError(tok, list, function () { pending = 0; hideToast(); if (!defer(need, retry)) retry(); });
    });
    return true;
  }
  // 別の画面へ移った（戻る・別の行を開いた）ら、待っていた画面は開かない
  function cancel() { if (pending) { pending = 0; hideToast(); } }

  function box() {
    if (!toast) {
      toast = D.createElement("div");
      toast.className = "bsh-lazy";
      toast.hidden = true;
      D.body.appendChild(toast);
    }
    return toast;
  }
  function showLoading(tok) {
    clearTimeout(toastTimer);
    // すぐ読み終わるとき（手元にある・速い回線）にちらつかないよう、少し待ってから出す
    toastTimer = setTimeout(function () {
      if (pending !== tok) return;
      var t = box();
      t.setAttribute("role", "status");
      t.innerHTML = '<span class="bsh-spin" aria-hidden="true"></span><span>読み込んでいます…</span>';
      t.hidden = false;
    }, 150);
  }
  function showError(tok, list, onRetry) {
    clearTimeout(toastTimer);
    var t = box();
    var files = list.filter(function (i) { return !done[i]; }).map(function (i) { return cfg.files[i]; });
    t.setAttribute("role", "alert");
    t.innerHTML = '<div class="bsh-msg"><b>データを読み込めませんでした</b><br>ネット接続を確かめて、もう一度読み込んでください。' +
      'この HTML をファイルとして開いている場合は、同じフォルダに <code>' + esc(files.slice(0, 3).join("、") + (files.length > 3 ? " など" : "")) + '</code> が必要です。</div>' +
      '<div class="bsh-act"><button type="button" class="bsh-btn bsh-retry">もう一度読み込む</button><button type="button" class="bsh-btn bsh-close">閉じる</button></div>';
    t.hidden = false;
    t.querySelector(".bsh-retry").onclick = function () { if (pending === tok) onRetry(); };
    t.querySelector(".bsh-close").onclick = function () { if (pending === tok) pending = 0; hideToast(); };
    t.querySelector(".bsh-retry").focus();
  }
  function hideToast() { clearTimeout(toastTimer); if (toast) { toast.hidden = true; toast.innerHTML = ""; } }

  // ---- 本文の手前読み（最初の画面のあと・検索のとき）
  function pump() {
    while (active < limit && queue.length) {
      var i = queue.shift();
      if (done[i] || loading[i] || failed[i]) continue;
      active++;
      load(i, limit > 1 ? "auto" : "low").then(next, next);
    }
  }
  function next() { active--; pump(); }
  function enqueue(onlyBody) {
    for (var i = 0; i < cfg.files.length; i++) {
      if (onlyBody && cfg.kind.charAt(i) !== "b") continue;
      if (!done[i] && !loading[i] && !failed[i] && queue.indexOf(i) < 0) queue.push(i);
    }
    pump();
  }
  function prefetch() {
    var c = navigator.connection;
    // 通信量を節約する設定・2G のとき、または window.__BSH_NO_PREFETCH__ が true のとき（検査用）は、手前読みしない
    if (W.__BSH_NO_PREFETCH__ || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) return;
    enqueue(false);
  }
  // 全部読み込む（検査用）。読み込めなかったものがあれば reject
  function loadAll() {
    var all = [];
    for (var i = 0; i < cfg.files.length; i++) all.push(load(i));
    return Promise.all(all).then(function () {});
  }
  function idle(fn) { if (W.requestIdleCallback) W.requestIdleCallback(fn, { timeout: 4000 }); else setTimeout(fn, 1); }

  // ---- 検索（原稿の renderSearchResults・bookHay から呼ばれる）
  function bodyReady(id) {
    var a = idChunks[id];
    if (!a) return true;
    for (var k = 0; k < a.length; k++) if (!done[a[k]]) return false;
    return true;
  }
  function warmSearch() { limit = Math.max(limit, 4); enqueue(true); }
  // 本文が全部そろっていれば ''（原稿と同じ表示）。まだなら読み込みを進め、届くたびに rerender を呼ぶ
  function searchWait(rerender) {
    if (!bodyLeft) { searchCb = null; return ""; }
    searchCb = rerender;
    warmSearch();
    var bad = 0, busy = 0;
    bodyChunks.forEach(function (i) { if (failed[i]) bad++; else if (!done[i]) busy++; });
    var have = bodyChunks.length - bodyLeft;
    if (bad && !busy) {
      return '<p class="bsh-search-wait" role="alert">本文の一部を読み込めなかったため、その分は書名・著者・棚の名前だけで探しています。' +
        '<button type="button" class="bsh-btn" onclick="window.__BSH_LAZY__.retrySearch()">もう一度読み込む</button></p>';
    }
    return '<p class="bsh-search-wait" role="status"><span class="bsh-spin" aria-hidden="true"></span>本文を読み込み中（' + have + ' / ' + bodyChunks.length +
      '）。届いた分から順に本文でも探します。いまの結果は書名・著者・棚の名前などで一致したものを含む途中経過です。</p>';
  }
  function bodyChanged() {
    if (!searchCb || searchTimer) return;
    searchTimer = setTimeout(function () { searchTimer = 0; if (searchCb) searchCb(); }, bodyLeft ? 150 : 0);
  }
  function retrySearch() {
    bodyChunks.forEach(function (i) { failed[i] = false; });
    warmSearch();
    bodyChanged();
  }

  function attach(c, st) {
    cfg = c;
    store = st;
    var walk = function (n) { (n.books || []).forEach(function (b) { stubs.push(b); }); (n.children || []).forEach(walk); };
    st.DATA.forEach(walk);
    if (stubs.length !== c.body.length) { try { console.error("[Book-Summary] 索引と本文の対応が合いません", stubs.length, c.body.length); } catch (e) {} }
    c.body.forEach(function (ci, pos) {
      if (ci < 0 || !stubs[pos]) return;
      var a = idChunks[stubs[pos].id] || (idChunks[stubs[pos].id] = []);
      if (a.indexOf(ci) < 0) a.push(ci);
    });
    for (var i = 0; i < c.files.length; i++) if (c.kind.charAt(i) === "b") { bodyChunks.push(i); bodyLeft++; }
    var start = function () { setTimeout(function () { idle(prefetch); }, c.prefetchDelay || 0); };
    if (D.readyState === "complete") start(); else W.addEventListener("load", start);
    W.addEventListener("popstate", cancel);
  }
  // 検査用：何をどこまで読み込んだか
  function status() {
    return { files: cfg ? cfg.files.length : 0, done: done.filter(Boolean).length, loading: loading.filter(Boolean).length, failed: failed.filter(Boolean).length, bodyLeft: bodyLeft, pending: !!pending };
  }
  W.__BSH_LAZY__ = { attach: attach, defer: defer, cancel: cancel, bodyReady: bodyReady, searchWait: searchWait, warmSearch: warmSearch, retrySearch: retrySearch, status: status, loadAll: loadAll };
}

const RUNTIME_CSS = [
  ".bsh-lazy{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:1000;box-sizing:border-box;width:max-content;max-width:calc(100vw - 32px);",
  "display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap;padding:10px 16px;border-radius:12px;border:1px solid var(--hairline);",
  "background:var(--paper,#fff);color:var(--ink);box-shadow:0 6px 24px rgba(0,0,0,.18);font-size:13.5px;line-height:1.6;}",
  ".bsh-lazy[hidden]{display:none;}",
  ".bsh-lazy .bsh-msg{flex:1 1 280px;}",
  ".bsh-lazy code{font-size:12px;word-break:break-all;}",
  ".bsh-lazy .bsh-act{display:flex;gap:8px;}",
  ".bsh-btn{font:inherit;font-size:12.5px;font-weight:600;padding:5px 12px;border-radius:8px;border:1px solid var(--sky-ink);background:transparent;color:var(--sky-ink);cursor:pointer;}",
  ".bsh-btn:hover{background:var(--sky-ink);color:var(--paper,#fff);}",
  ".bsh-spin{flex:none;display:inline-block;width:14px;height:14px;border-radius:50%;border:2px solid var(--hairline);border-top-color:var(--sky-ink);animation:bsh-spin .8s linear infinite;}",
  "@keyframes bsh-spin{to{transform:rotate(360deg);}}",
  "@media (prefers-reduced-motion:reduce){.bsh-spin{animation:none;}}",
  ".bsh-search-wait{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;font-size:12.5px;line-height:1.6;color:var(--muted);margin:8px 4px 4px;}",
].join("");

// ---------------------------------------------------------------- Vite プラグイン
/**
 * @param {{ src?: string, file?: string }} [opts]
 *   src : 原稿（vite の root からの相対パス。既定 public/booksummaryhub.html）
 *   file: dist での名前（既定 booksummaryhub.html。public/ から写された同名のファイルを置き換える）
 */
export function novaBookSummarySplit(opts = {}) {
  const src = opts.src || "public/booksummaryhub.html";
  const file = opts.file || "booksummaryhub.html";
  let root = process.cwd(), outDir = "dist", logger = null, job = null;
  return {
    name: "nova-booksummary-split",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(root, config.build.outDir);
      logger = config.logger;
    },
    buildStart() {
      // 本体のビルド（ProjectNova.jsx の変換）と並行して進める
      const t0 = Date.now();
      job = (async () => {
        const { parseAstAsync } = await import("vite");
        const html = fs.readFileSync(path.resolve(root, src), "utf8");
        const res = await splitBookSummary(html, { parseAstAsync, warn: (m) => logger?.warn(m) });
        res.ms = Date.now() - t0;
        return res;
      })();
      job.catch(() => {});
    },
    async writeBundle() {
      const res = await job;
      // public/ から写された 40MB の原稿を、小さい HTML に置き換える
      fs.writeFileSync(path.join(outDir, file), res.html);
      for (const f of res.files) fs.writeFileSync(path.join(outDir, f.name), f.code);
      const mb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";
      const r = res.report;
      logger?.info(`[nova-booksummary-split] ${file}: ${mb(r.source)} → ${mb(r.core)}（索引 ${mb(r.index)}・本と動画・記事 ${r.books} 件分）＋ booksummary-*.js ${r.chunks} 個（計 ${mb(r.chunkBytes)}・最大 ${mb(r.largest)}） in ${(res.ms / 1000).toFixed(1)}s`);
    },
  };
}

// ---------------------------------------------------------------- 単体のコマンド
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [srcFile, outDirArg] = process.argv.slice(2);
  if (!srcFile || !outDirArg) {
    console.error("使い方: node scripts/booksummary-split.mjs <public/booksummaryhub.html> <出力フォルダ>");
    process.exit(2);
  }
  const here = path.dirname(fileURLToPath(import.meta.url));
  const { parseAstAsync } = await import(pathToFileURL(path.join(here, "..", "node_modules", "vite", "dist", "node", "index.js")).href);
  const t0 = Date.now();
  const res = await splitBookSummary(fs.readFileSync(srcFile, "utf8"), { parseAstAsync });
  fs.mkdirSync(outDirArg, { recursive: true });
  fs.writeFileSync(path.join(outDirArg, path.basename(srcFile)), res.html);
  for (const f of res.files) fs.writeFileSync(path.join(outDirArg, f.name), f.code);
  console.log(JSON.stringify({ ...res.report, removed: res.report.removed.join(" "), ms: Date.now() - t0 }));
}
