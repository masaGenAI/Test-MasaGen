// ビルド時だけ、ProjectNova.jsx から大きいハブ（vite.config.js の hubs：TechHub・Certification Hub・Finance Hub・Consulting Hub・
// Linguistics Hub・Side Work Hub）を切り出して別ファイルにする Vite プラグイン。
//
// なぜ：index.html（vite-plugin-singlefile で全部入り）は 88MB あり、ポータルを開くだけでこれらのハブも毎回ダウンロード・解析していた。
// ProjectNova.jsx は多くの検査スクリプトやスキルが直接読む「唯一の原稿」なので、ファイルは分けず、ビルドのときにだけ切り出す。
//
// 何をするか（ProjectNova.jsx を読み込むとき）：
//   1. Rollup のパーサー（vite が再公開している parseAstAsync）で構文木を作り、`const <decl> = (function () { ... })();` の宣言を探す。
//   2. その中身が参照するトップレベルの名前（React のフック・StarButton などの共通部品・JSON の import など）を構文木から集める。
//   3. 中身を「共通部品を引数で受け取る関数」に包み、esbuild で JSX 変換・圧縮して、別ファイル nova-hub-<key>-<hash>.js にする。
//      ファイルは通常の <script>（module ではない）で読み込み、window.__NOVA_HUB_CHUNKS__[key] に関数を登録する。
//      → 共通部品・React は本体と同じものを使い、ハブの中身は読み込んだときに1回だけ評価される。
//   4. 本体では、その宣言を novaLazyHub({...})（ProjectNova.jsx で定義）に置き換える。これは読み込み中の表示・失敗時の案内を出し、
//      読み込めたら本物のハブを描く React コンポーネント。
//   5. ポータルの最初の描画で使う値（ハブの静的プロパティ。例：TechHub のタブ数・Mastery Track の件数・横断検索の項目）は、
//      元の ProjectNova.jsx を CommonJS に変換して別プロセスの Node で実行し（scripts/lazy-hubs-probe.cjs）、ビルド時に計算して
//      置き換えた宣言に埋め込む。
// 使う道具は vite が公開しているもの（parseAstAsync・transformWithEsbuild）だけなので、依存パッケージは増えない。
//
// ポータル（ハブの外）から `MegaTechHubModule.X` のように中身を読む箇所を増やすときは、vite.config.js の hubs の values / byLang に
// X を足す（足さないとビルドが止まる）。関数などビルド時に計算できないものは、ProjectNova.jsx で `await novaHubReady(XxxModule)` してから使う。
// npm run dev（開発サーバー）では何もしない（ハブは本体に入ったまま）。
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFile } from "node:child_process";
import { parseAstAsync, transformWithEsbuild } from "vite";

const isIdentifier = (s) => /^[A-Za-z_$][\w$]*$/.test(s);

// パターン（分割代入など）が宣言する名前
function patternNames(p, out = []) {
  if (!p) return out;
  if (p.type === "Identifier") out.push(p.name);
  else if (p.type === "ObjectPattern") p.properties.forEach((x) => patternNames(x.type === "RestElement" ? x.argument : x.value, out));
  else if (p.type === "ArrayPattern") p.elements.forEach((x) => patternNames(x, out));
  else if (p.type === "RestElement") patternNames(p.argument, out);
  else if (p.type === "AssignmentPattern") patternNames(p.left, out);
  return out;
}

// トップレベルの束縛：名前 → 種類（const / let / var / function / class / import）
function topLevelBindings(ast) {
  const top = new Map();
  for (const n0 of ast.body) {
    const n = (n0.type === "ExportNamedDeclaration" || n0.type === "ExportDefaultDeclaration") && n0.declaration && n0.declaration.type !== "Identifier" ? n0.declaration : n0;
    if (n.type === "VariableDeclaration") n.declarations.forEach((d) => patternNames(d.id).forEach((x) => top.set(x, n.kind)));
    else if ((n.type === "FunctionDeclaration" || n.type === "ClassDeclaration") && n.id) top.set(n.id.name, n.type === "ClassDeclaration" ? "class" : "function");
    else if (n.type === "ImportDeclaration") n.specifiers.forEach((s) => top.set(s.local.name, "import"));
  }
  return top;
}

// 構文木を歩き、名前の参照（プロパティ名・ラベル・HTML の小文字タグなどを除いた識別子）ごとに visit(name, node, parent, key) を呼ぶ。
// スコープは見ないので、内側で同じ名前を宣言して隠している場合も参照として数える（＝必要な名前の上位集合。余分に渡しても害はない）。
function walkRefs(root, visit) {
  const stack = [[root, null, null]];
  while (stack.length) {
    const [n, parent, key] = stack.pop();
    if (!n || typeof n !== "object") continue;
    if (Array.isArray(n)) { for (let i = n.length - 1; i >= 0; i--) stack.push([n[i], parent, key]); continue; }
    if (typeof n.type !== "string") continue;
    switch (n.type) {
      case "Identifier":
        if (parent && ((parent.type === "MemberExpression" && key === "property" && !parent.computed) ||
          ((parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") && key === "key" && !parent.computed) ||
          ((parent.type === "LabeledStatement" || parent.type === "BreakStatement" || parent.type === "ContinueStatement") && key === "label") ||
          parent.type === "MetaProperty")) continue;
        visit(n.name, n, parent, key);
        continue;
      case "JSXIdentifier":
        // <Foo /> と <Foo.Bar /> の Foo は参照。<div /> と属性名は参照ではない
        if ((key === "name" && parent && parent.type !== "JSXAttribute" && /^[A-Z_$]/.test(n.name)) || key === "object") visit(n.name, n, parent, key);
        continue;
      case "JSXAttribute":
        stack.push([n.value, n, "value"]);
        continue;
      case "JSXMemberExpression":
        stack.push([n.object, n, "object"]);
        if (n.object && n.object.type === "JSXIdentifier") visit(null, n, parent, key, n.object.name, n.property && n.property.name);
        continue;
      case "JSXNamespacedName":
        continue;
      default:
        if (n.type === "MemberExpression" && n.object && n.object.type === "Identifier") visit(null, n, parent, key, n.object.name, n.computed ? null : n.property && n.property.name);
        for (const k in n) {
          if (k === "type" || k === "start" || k === "end") continue;
          const v = n[k];
          if (v && typeof v === "object") stack.push([v, n, k]);
        }
    }
  }
}

// ポータルで最初に使う値は JSON にして埋め込むので、素のデータだけを許す
function assertPlainData(v, where) {
  const t = typeof v;
  if (v === null || t === "string" || t === "boolean") return;
  if (t === "number") { if (!Number.isFinite(v)) throw new Error(where + " に有限でない数があります"); return; }
  if (Array.isArray(v)) { v.forEach((x, i) => assertPlainData(x, where + "[" + i + "]")); return; }
  if (t === "object" && (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null)) { for (const k of Object.keys(v)) assertPlainData(v[k], where + "." + k); return; }
  throw new Error(where + " は JSON にできない値（" + t + "）です");
}

// 元のファイル（切り出す前）を CommonJS にして別プロセスで実行し、hubs の values / byLang を計算する。
// 返す Promise の cancel() で、ビルドが途中で止まったときに別プロセスと一時ファイルを片付ける。
function startProbe({ root, entry, code, hubs, define }) {
  let child = null, dir = null, cancelled = false;
  const cleanup = () => { if (dir) { fs.rmSync(dir, { recursive: true, force: true }); dir = null; } };
  const promise = (async () => {
    const footer = `\n;globalThis.__novaLazyProbe = { ${hubs.map((h) => h.decl).join(", ")} };\n`;
    const cjs = await transformWithEsbuild(code + footer, entry, {
      loader: "jsx", format: "cjs", jsx: "automatic", charset: "utf8", sourcemap: false, logLevel: "silent",
      define: { ...define, "process.env.NODE_ENV": '"production"' },
    });
    if (cancelled) throw new Error("lazy-hubs-probe: cancelled");
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "nova-lazy-hubs-"));
    const reqFile = path.join(dir, "request.json"), outFile = path.join(dir, "result.json"), codeFile = path.join(dir, "probe.cjs");
    fs.writeFileSync(codeFile, cjs.code);
    fs.writeFileSync(reqFile, JSON.stringify({ entry, codeFile, hubs: hubs.map((h) => ({ decl: h.decl, values: h.values || [], byLang: h.byLang || [] })) }));
    const script = path.join(root, "scripts", "lazy-hubs-probe.cjs");
    return await new Promise((resolve, reject) => {
      child = execFile(process.execPath, ["--max-old-space-size=6144", "--stack-size=4000", script, reqFile, outFile], { cwd: root, maxBuffer: 64 * 1024 * 1024, timeout: 10 * 60 * 1000 }, (err, stdout, stderr) => {
        try {
          if (err) { reject(new Error("lazy-hubs-probe が失敗しました: " + (err.message || err) + "\n" + String(stderr).slice(-4000))); return; }
          resolve(JSON.parse(fs.readFileSync(outFile, "utf8")));
        } catch (e) {
          reject(e);
        } finally {
          cleanup();
        }
      });
    });
  })();
  promise.cancel = () => { cancelled = true; if (child) child.kill(); cleanup(); };
  return promise;
}

/**
 * @param {{ entry: string, hubs: { decl: string, key: string, name: string, values?: string[], byLang?: string[] }[], loader?: string }} opts
 *   entry  : 切り出す元のファイル（vite の root からの相対パス）
 *   hubs   : decl=トップレベルの宣言名、key=識別子（ファイル名にも使う）、name=読み込み中・失敗時に出す名前、
 *            values=ビルド時に計算して埋め込む静的プロパティ、byLang=(en: boolean) => 値 の関数で、日英両方の結果を埋め込むもの
 *   loader : 置き換えに使う、entry のトップレベル関数の名前（既定 novaLazyHub）
 */
export function novaLazyHubs(opts) {
  const { entry, hubs } = opts;
  const loader = opts.loader || "novaLazyHub";
  let root = process.cwd(), target = "es2020", define = {}, entryPath = null, logger = null;
  const chunks = [];
  return {
    name: "nova-lazy-hubs",
    apply: "build",
    enforce: "pre",
    configResolved(config) {
      root = config.root;
      logger = config.logger;
      entryPath = path.resolve(root, entry);
      target = config.build.target || "es2020";
      define = {};
      for (const [k, v] of Object.entries(config.define || {})) if (typeof v === "string") define[k] = v;
    },
    async transform(code, id) {
      if (path.resolve(id.split("?")[0]) !== entryPath) return null;
      const t0 = Date.now();
      chunks.length = 0;
      // ポータル用の値の計算（別プロセス）を先に走らせ、その間に構文木を作る
      const probe = startProbe({ root, entry: entryPath, code, hubs, define });
      probe.catch(() => {});
      try {
        return await splitEntry(code, probe, t0);
      } catch (e) {
        probe.cancel();
        throw e;
      }
    },
    generateBundle() {
      for (const c of chunks) this.emitFile({ type: "asset", fileName: c.file, source: c.code });
    },
  };

  async function splitEntry(code, probe, t0) {
    const ast = await parseAstAsync(code, { jsx: true });
    const top = topLevelBindings(ast);
    if (top.get(loader) !== "function") throw new Error(`${entry} にトップレベルの function ${loader} がありません（lazy-hubs の置き換え先）`);
    const byDecl = new Map(hubs.map((h) => [h.decl, h]));
    const blocks = new Map(); // decl → 宣言ノード
    for (const n of ast.body) {
      if (n.type !== "VariableDeclaration") continue;
      for (const d of n.declarations) {
        if (d.id.type === "Identifier" && byDecl.has(d.id.name)) {
          if (n.kind !== "const" || n.declarations.length !== 1 || !d.init) throw new Error(`${d.id.name} は「const ${d.id.name} = (function () { ... })();」の形で1つだけ宣言してください`);
          blocks.set(d.id.name, n);
        }
      }
    }
    for (const h of hubs) if (!blocks.has(h.decl)) throw new Error(`${entry} にトップレベルの const ${h.decl} が見つかりません`);

    // 各ハブが参照するトップレベルの名前と、ハブの外から読む静的プロパティを調べる
    const refs = new Map(hubs.map((h) => [h.decl, new Set()]));
    const allowed = new Map(hubs.map((h) => [h.decl, new Set([...(h.values || []), ...(h.byLang || []), "load"])]));
    const problems = [];
    for (const n of ast.body) {
      const own = n.type === "VariableDeclaration" && n.declarations.length === 1 && n.declarations[0].id.type === "Identifier" && blocks.get(n.declarations[0].id.name) === n ? n.declarations[0].id.name : null;
      walkRefs(own ? n.declarations[0].init : n, (name, node, parent, key, objName, prop) => {
        if (name !== null) { if (own) refs.get(own).add(name); return; }
        // ハブの外（＝本体と、もう一方のハブ）から XxxModule.prop を読んでいる箇所
        if (!byDecl.has(objName) || objName === own) return;
        if (prop === null || !allowed.get(objName).has(prop)) {
          const line = code.slice(0, node.start).split("\n").length;
          problems.push(`${entry}:${line} ${objName}.${prop === null ? "[…]" : prop} — ビルドではこのハブを後から読み込むので、ポータルから直接は読めません。` +
            `vite.config.js の novaLazyHubs の values/byLang に足すか、await novaHubReady(${objName}) で読み込みを待ってから使ってください。`);
        }
      });
    }
    if (problems.length) throw new Error("lazy-hubs:\n" + problems.join("\n"));

    // 切り出した中身を、共通部品を引数で受け取る関数にして別ファイルへ
    const depsOf = new Map();
    await Promise.all(hubs.map(async (h) => {
      const node = blocks.get(h.decl);
      const deps = [...refs.get(h.decl)].filter((x) => top.has(x) && x !== h.decl).sort();
      const bad = deps.filter((x) => top.get(x) === "let" || top.get(x) === "var");
      if (bad.length) throw new Error(`${h.decl} がトップレベルの let/var（${bad.join(", ")}）を読んでいます。別ファイルには読み込み時の値しか渡せないので、const にするか、関数経由で読んでください`);
      depsOf.set(h.decl, deps);
      const body = code.slice(node.start, node.end);
      const wrapped =
        `(window.__NOVA_HUB_CHUNKS__ = window.__NOVA_HUB_CHUNKS__ || {})[${JSON.stringify(h.key)}] = function (__novaDeps) {\n"use strict";\n` +
        `const { ${["__nvH", "__nvF", ...deps].join(", ")} } = __novaDeps;\n${body}\nreturn ${h.decl};\n};\n`;
      // 本体の .jsx と同じ vite の esbuild 変換（JSX は共通の React.createElement を引数で受け取る古典的な形にする）
      const out = await transformWithEsbuild(wrapped, entryPath, {
        loader: "jsx", jsx: "transform", jsxFactory: "__nvH", jsxFragment: "__nvF",
        minify: true, charset: "utf8", legalComments: "none", target, sourcemap: false, logLevel: "silent",
        define: { ...define, "process.env.NODE_ENV": '"production"' },
      });
      const hash = crypto.createHash("sha256").update(out.code).digest("hex").slice(0, 10);
      chunks.push({ decl: h.decl, file: `nova-hub-${h.key}-${hash}.js`, code: out.code, deps: deps.length });
    }));

    chunks.sort((a, b) => hubs.findIndex((h) => h.decl === a.decl) - hubs.findIndex((h) => h.decl === b.decl));
    const probed = await probe;
    let main = code;
    const order = hubs.slice().sort((a, b) => blocks.get(b.decl).start - blocks.get(a.decl).start);
    for (const h of order) {
      const node = blocks.get(h.decl);
      const res = probed[h.decl] || {};
      const statics = {}, byLang = {};
      for (const k of h.values || []) { if (!(k in (res.values || {}))) throw new Error(`${h.decl}.${k} がビルド時に計算できませんでした`); statics[k] = res.values[k]; assertPlainData(statics[k], `${h.decl}.${k}`); }
      for (const k of h.byLang || []) { const v = (res.byLang || {})[k]; if (!Array.isArray(v) || v.length !== 2) throw new Error(`${h.decl}.${k}(en) がビルド時に計算できませんでした`); byLang[k] = v; assertPlainData(v, `${h.decl}.${k}`); }
      const deps = depsOf.get(h.decl).filter(isIdentifier);
      const chunk = chunks.find((c) => c.decl === h.decl);
      const repl =
        `const ${h.decl} = ${loader}({ key: ${JSON.stringify(h.key)}, name: ${JSON.stringify(h.name)}, file: ${JSON.stringify(chunk.file)}, ` +
        `deps: () => ({ __nvH: __novaLazyH, __nvF: __novaLazyF, ${deps.join(", ")} }), ` +
        `statics: ${JSON.stringify(statics)}, byLang: ${JSON.stringify(byLang)} });`;
      main = main.slice(0, node.start) + repl + main.slice(node.end);
    }
    main = `import { createElement as __novaLazyH, Fragment as __novaLazyF } from "react";\n` + main;
    const kb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";
    logger?.info(`[nova-lazy-hubs] split ${chunks.map((c) => `${c.decl} → ${c.file} (${kb(Buffer.byteLength(c.code))}, ${c.deps} deps)`).join(", ")} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    return { code: main, map: null };
  }
}
