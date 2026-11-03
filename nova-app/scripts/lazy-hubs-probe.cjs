// scripts/lazy-hubs.mjs（Vite プラグイン）が別プロセスで呼ぶ補助スクリプト。単体で使うものではない。
//   node scripts/lazy-hubs-probe.cjs <request.json> <result.json>
// 切り出す前の ProjectNova.jsx（プラグインが CommonJS に変換したもの）をそのまま Node で実行し、
// 切り出すハブの静的プロパティ（ポータルの最初の描画で使う値）を計算して書き出す。
// ブラウザと同じ元のコードを実行するので、件数は切り出す前の index.html と一致する。window・document などはブラウザの代わりの最小限の作り物。
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");

const [reqFile, outFile] = process.argv.slice(2);
const req = JSON.parse(fs.readFileSync(reqFile, "utf8"));
process.env.NODE_ENV = "production";
const entry = req.entry;
const code = fs.readFileSync(req.codeFile, "utf8");

// --- ブラウザの代わり（読み込み時に触れられても落ちない程度） ---
const noop = () => {};
const any = new Proxy(function () {}, {
  get: (t, k) => (k === "then" ? undefined : k === Symbol.toPrimitive ? () => "" : k === Symbol.iterator ? undefined : any),
  apply: () => any, construct: () => any,
});
const store = new Map();
const storage = {
  getItem: (k) => (store.has(String(k)) ? store.get(String(k)) : null), setItem: (k, v) => { store.set(String(k), String(v)); },
  removeItem: (k) => { store.delete(String(k)); }, clear: () => store.clear(), key: (i) => [...store.keys()][i] ?? null,
  get length() { return store.size; },
};
const def = (k, v) => Object.defineProperty(globalThis, k, { value: v, configurable: true, writable: true });
def("window", globalThis);
def("self", globalThis);
def("localStorage", storage);
def("sessionStorage", storage);
def("document", any);
def("location", { href: "http://localhost/", hash: "", pathname: "/", search: "", origin: "http://localhost", protocol: "http:", host: "localhost" });
def("history", { pushState: noop, replaceState: noop, back: noop, forward: noop, go: noop, length: 1, state: null });
def("addEventListener", noop);
def("removeEventListener", noop);
def("dispatchEvent", () => true);
def("matchMedia", () => ({ matches: false, media: "", addEventListener: noop, removeEventListener: noop, addListener: noop, removeListener: noop }));
def("requestAnimationFrame", (f) => setTimeout(f, 0));
def("cancelAnimationFrame", (id) => clearTimeout(id));
def("requestIdleCallback", (f) => setTimeout(f, 0));
def("getComputedStyle", () => any);
def("innerWidth", 1280);
def("innerHeight", 900);
def("devicePixelRatio", 1);
def("CustomEvent", class CustomEvent { constructor(type, o) { this.type = type; this.detail = o && o.detail; } });
if (typeof globalThis.navigator === "undefined") def("navigator", { userAgent: "node", language: "ja", languages: ["ja"], onLine: true }); // Node 20 には無い

// "?raw" の import（HTML をそのまま文字列で読む）
const origRequire = Module.prototype.require;
Module.prototype.require = function (id) {
  if (typeof id === "string" && id.endsWith("?raw")) return fs.readFileSync(path.resolve(path.dirname(this.filename), id.slice(0, -4)), "utf8");
  return origRequire.apply(this, arguments);
};

const filename = path.join(path.dirname(entry), "__nova_lazy_probe__.cjs");
const m = new Module(filename, null);
m.filename = filename;
m.paths = Module._nodeModulePaths(path.dirname(entry));
m._compile(code, filename);

const P = globalThis.__novaLazyProbe;
const result = {};
for (const h of req.hubs) {
  const M = P[h.decl];
  if (typeof M !== "function") throw new Error(h.decl + " がコンポーネント（関数）ではありません");
  const r = { values: {}, byLang: {} };
  for (const k of h.values) { if (!(k in M)) throw new Error(`${h.decl}.${k} がありません`); r.values[k] = M[k]; }
  for (const k of h.byLang) { if (typeof M[k] !== "function") throw new Error(`${h.decl}.${k} が関数ではありません`); r.byLang[k] = [M[k](false), M[k](true)]; }
  result[h.decl] = r;
}
fs.writeFileSync(outFile, JSON.stringify(result));
process.exit(0);
