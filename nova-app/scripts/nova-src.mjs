// Project Nova の原稿（分けて保存した部品）と、作業用の1本の写し ProjectNova.jsx をそろえる共通の道具。
//
// ■ しくみ
//   - git に入れる原稿は nova-app/src/parts/ 以下の .jsx（以前の src/ProjectNova.jsx を、文の境界で切ったもの）。
//   - nova-app/src/ProjectNova.jsx は、部品をパスの辞書順につないだ「作業用の写し」。git には入れない（.gitignore）。
//     検査スクリプト・スキルの道具・ビルドは、これまでどおりこの1本を読む。行番号もこの1本のもの。
//   - `sync` が両方をそろえる。部品のほうが変わっていれば写しを作り直し、写しを直したのなら部品へ書き戻す。
//     両方が別々に変わっていたら止まる（どちらを採るか --prefer parts / --prefer view で指定する）。
//   - npm run dev / build / validate の前と、スキルの道具の最初に sync が自動で走る。
//     ★ コミットの前には必ず sync する（写しだけ直してコミットすると、変更が git に入らない）。
//
// ■ なぜ分けたか
//   - GitHub は 100MiB を超えるファイルを受け付けない（1本のままだと 97MiB まで来ていた）。
//   - 1問直すたびに 100MB のファイルを丸ごと保存し直さずに済む。
//
// ■ 決まりごと
//   - 各部品の1行目は「// @@nova-part <src/parts からの相対パス>」。この行は消さない・書き換えない（写しの中でも同じ）。
//   - つなぐ順はパスの辞書順。部品を足すときは番号の間を使う（例：030 と 040 の間なら 035-xxx.jsx）。
//     写しの中に新しい印の行を1行足して sync すれば、その位置で新しい部品に分かれる。
//   - 部品は文の途中で切らない（文と文の間でだけ切る）。部品1つは単独では動かない断片でよい。
//
// ■ 使い方（コマンド。リポジトリのどこから呼んでもよい）
//   node nova-app/scripts/nova-src.mjs sync                   写しと部品をそろえる（npm run nova:sync）
//   node nova-app/scripts/nova-src.mjs check                  印・順序・大きさを点検する
//   node nova-app/scripts/nova-src.mjs sizes                  部品ごとの大きさ
//   node nova-app/scripts/nova-src.mjs where "const MCQS ="   その文字列がどの部品の何行目にあるか
//   node nova-app/scripts/nova-src.mjs locate 123456          写しの行番号が、どの部品の何行目か
//
// ■ 使い方（スクリプトから）
//   import { syncNova, VIEW } from "…/nova-app/scripts/nova-src.mjs";
//   syncNova({ quiet: true });                 // 読む前に（書いたあとにも）呼ぶ
//   const text = fs.readFileSync(VIEW, "utf8");
//   Python からは同じ場所の nova_src.py（sync_nova / read_nova / write_nova）を使う。
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const APP_ROOT = path.resolve(HERE, "..");
export const PARTS_DIR = path.join(APP_ROOT, "src", "parts");
export const VIEW = path.join(APP_ROOT, "src", "ProjectNova.jsx");
const STAMP = path.join(APP_ROOT, "src", ".nova-sync.json");

const MARK = "// @@nova-part ";
const NAME_RE = /^[A-Za-z0-9_][A-Za-z0-9_\-./]*\.jsx$/;
// GitHub は 50MiB で警告、100MiB で拒否。余裕を見てここで止める
export const WARN_BYTES = 20 * 1024 * 1024;
export const MAX_BYTES = 45 * 1024 * 1024;

const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
function writeAtomic(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + ".tmp-" + process.pid;
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, file);
}

/** src/parts 以下の .jsx を、つなぐ順（相対パスの辞書順）で返す */
export function listParts(dir = PARTS_DIR) {
  const out = [];
  const walk = (d, rel) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const r = rel ? rel + "/" + e.name : e.name;
      if (e.isDirectory()) walk(path.join(d, e.name), r);
      else if (e.isFile() && e.name.endsWith(".jsx")) out.push(r);
    }
  };
  if (!fs.existsSync(dir)) throw new Error("原稿の置き場が見つかりません: " + dir);
  walk(dir, "");
  out.forEach((r) => { if (!NAME_RE.test(r)) throw new Error("部品の名前に使えない文字があります（英数字・_・-・. だけ）: " + r); });
  return out.sort();
}

/** 部品をつないだ1本の原稿を返す。各部品の1行目の印が、そのファイルのパスと合っているかも確かめる */
export function readNova(dir = PARTS_DIR) {
  const parts = listParts(dir);
  if (!parts.length) throw new Error("原稿の部品が1つもありません: " + dir);
  const chunks = [];
  for (const rel of parts) {
    const s = fs.readFileSync(path.join(dir, rel), "utf8");
    const want = MARK + rel + "\n";
    if (!s.startsWith(want)) throw new Error(`${rel} の1行目が「${want.trim()}」ではありません（印の行は消さない・書き換えない）`);
    if (s.indexOf("\n" + MARK, want.length - 1) >= 0) throw new Error(`${rel} の途中に印の行があります（1ファイルに印は1つ）`);
    if (!s.endsWith("\n")) throw new Error(`${rel} が改行で終わっていません`);
    chunks.push(s);
  }
  return chunks.join("");
}

/** 1本の原稿を印の行で切り分ける → [{ rel, text, line }]（text は印の行を含む。line は1本の中での先頭行） */
export function splitNova(text) {
  if (!text.startsWith(MARK)) throw new Error("原稿の先頭が印の行（// @@nova-part …）ではありません");
  const starts = [];
  for (let i = 0; i >= 0; i = text.indexOf("\n" + MARK, i)) {
    const at = i === 0 ? 0 : i + 1;
    const nl = text.indexOf("\n", at);
    if (nl < 0) throw new Error("印の行のあとに中身がありません");
    starts.push({ at, rel: text.slice(at + MARK.length, nl) });
    i = nl;
  }
  const seen = new Set();
  let line = 1;
  return starts.map((s, k) => {
    if (!NAME_RE.test(s.rel)) throw new Error("印の行のパスが正しくありません: " + s.rel);
    if (seen.has(s.rel)) throw new Error("同じ印が2回あります: " + s.rel);
    seen.add(s.rel);
    if (k > 0 && !(starts[k - 1].rel < s.rel)) throw new Error(`印の並びが辞書順ではありません: ${starts[k - 1].rel} → ${s.rel}`);
    const body = text.slice(s.at, k + 1 < starts.length ? starts[k + 1].at : text.length);
    if (!body.endsWith("\n")) throw new Error(s.rel + " が改行で終わっていません");
    const seg = { rel: s.rel, text: body, line };
    for (let j = body.indexOf("\n"); j >= 0; j = body.indexOf("\n", j + 1)) line++;
    return seg;
  });
}

/**
 * 1本の原稿を各部品へ書き戻す（中身が変わった部品だけ）。
 * 印が消えた部品があると、その中身は前の部品に混ざってしまうので、既定では止める（allowRemove で許す）。
 * @returns {{ changed: string[], added: string[], removed: string[] }}
 */
export function writeNova(text, opts = {}) {
  const dir = opts.dir || PARTS_DIR;
  const segs = splitNova(text);
  const have = new Set(listParts(dir));
  const next = new Set(segs.map((s) => s.rel));
  const removed = [...have].filter((r) => !next.has(r));
  if (removed.length && !opts.allowRemove) throw new Error("印の行が消えた部品があります（書き戻しを中止。意図した削除なら --allow-remove）: " + removed.join(", "));
  for (const s of segs) {
    const size = Buffer.byteLength(s.text);
    if (size > MAX_BYTES) throw new Error(`${s.rel} が ${(size / 1048576).toFixed(1)}MiB あります。${MAX_BYTES / 1048576}MiB を超える部品は、文の間に印の行を足して分けてください`);
  }
  const changed = [], added = [];
  for (const s of segs) {
    const f = path.join(dir, s.rel);
    if (!have.has(s.rel)) added.push(s.rel);
    else if (fs.readFileSync(f, "utf8") === s.text) continue;
    else changed.push(s.rel);
    writeAtomic(f, s.text);
  }
  for (const r of removed) fs.rmSync(path.join(dir, r));
  return { changed, added, removed };
}

/**
 * 写し（ProjectNova.jsx）と部品をそろえる。
 * @param {{ quiet?: boolean, prefer?: "parts" | "view", allowRemove?: boolean }} opts
 * @returns {{ action: "created" | "same" | "parts→view" | "view→parts", changed?: string[], added?: string[], removed?: string[] }}
 */
export function syncNova(opts = {}) {
  const log = (m) => { if (!opts.quiet) console.log("[nova-sync] " + m); };
  const P = readNova();
  const hP = sha(P);
  let stamp = null;
  try { stamp = JSON.parse(fs.readFileSync(STAMP, "utf8")); } catch (e) { stamp = null; }
  const save = (h) => { if (!stamp || stamp.hash !== h) fs.writeFileSync(STAMP, JSON.stringify({ hash: h }) + "\n"); };
  if (!fs.existsSync(VIEW)) {
    writeAtomic(VIEW, P);
    save(hP);
    log("ProjectNova.jsx を部品から作りました");
    return { action: "created" };
  }
  const V = fs.readFileSync(VIEW, "utf8");
  if (V === P) { save(hP); return { action: "same" }; }
  const hV = sha(V);
  const viewUntouched = !!stamp && stamp.hash === hV, partsUntouched = !!stamp && stamp.hash === hP;
  if (opts.prefer === "parts" || (!opts.prefer && viewUntouched)) {
    writeAtomic(VIEW, P);
    save(hP);
    log("部品の変更を ProjectNova.jsx に反映しました");
    return { action: "parts→view" };
  }
  if (opts.prefer === "view" || (!opts.prefer && partsUntouched)) {
    const r = writeNova(V, { allowRemove: opts.allowRemove });
    save(hV);
    log(`ProjectNova.jsx の変更を部品へ書き戻しました（変更 ${r.changed.length}・追加 ${r.added.length}・削除 ${r.removed.length}）` +
      [...r.changed, ...r.added].slice(0, 8).map((x) => "\n  src/parts/" + x).join(""));
    return { action: "view→parts", ...r };
  }
  throw new Error(
    "ProjectNova.jsx（作業用の写し）と src/parts（部品）が、前回そろえたあと両方とも変わっています。どちらを採るか指定してください：\n" +
    "  node nova-app/scripts/nova-src.mjs sync --prefer parts   部品を正として写しを作り直す（写しに入れた変更は消える）\n" +
    "  node nova-app/scripts/nova-src.mjs sync --prefer view    写しを正として部品へ書き戻す（部品に入れた変更は消える）");
}

/** 写しの行番号 → { rel, line }（その部品の中での行番号） */
export function locateLine(n, text = readNova()) {
  let hit = null;
  for (const s of splitNova(text)) { if (s.line <= n) hit = s; else break; }
  return hit ? { rel: hit.rel, line: n - hit.line + 1 } : null;
}

/** 文字列（または正規表現）が、どの部品の何行目にあるか → [{ rel, line, text }] */
export function whereInNova(needle, dir = PARTS_DIR, limit = 50) {
  const hits = [];
  for (const rel of listParts(dir)) {
    const lines = fs.readFileSync(path.join(dir, rel), "utf8").split("\n");
    for (let i = 0; i < lines.length && hits.length < limit; i++) {
      const j = typeof needle === "string" ? lines[i].indexOf(needle) : lines[i].search(needle);
      if (j >= 0) hits.push({ rel, line: i + 1, text: lines[i].slice(Math.max(0, j - 20), j + 100) });
    }
  }
  return hits;
}

/** 点検：印・順序は readNova / splitNova が見る。ここでは大きさも見る → { files, bytes, warn: [], error: [] } */
export function checkNova(dir = PARTS_DIR) {
  splitNova(readNova(dir));
  const warn = [], error = [];
  let bytes = 0;
  const parts = listParts(dir);
  for (const rel of parts) {
    const n = fs.statSync(path.join(dir, rel)).size;
    bytes += n;
    if (n > MAX_BYTES) error.push(`${rel}: ${(n / 1048576).toFixed(1)}MiB（上限 ${MAX_BYTES / 1048576}MiB。文の間に印の行を足して分けてください）`);
    else if (n > WARN_BYTES) warn.push(`${rel}: ${(n / 1048576).toFixed(1)}MiB（${WARN_BYTES / 1048576}MiB を超えました。次に足す前に分けるのがおすすめ）`);
  }
  return { files: parts.length, bytes, warn, error };
}

/**
 * Vite プラグイン：ビルド・開発サーバーの最初に sync し、開発サーバーでは部品か写しが変わるたびにそろえ直す。
 * （vite を npm run 経由でなく直接呼んでも、古い写しでビルドしてしまうことがない）
 */
export function novaSync() {
  return {
    name: "nova-sync",
    enforce: "pre",
    buildStart() { syncNova(); },
    configureServer(server) {
      server.watcher.add(PARTS_DIR);
      let timer = null;
      const kick = (file) => {
        const f = path.resolve(file);
        if (f !== VIEW && !f.startsWith(PARTS_DIR + path.sep)) return;
        if (/\.tmp-\d+$/.test(f)) return;
        clearTimeout(timer);
        timer = setTimeout(() => { try { syncNova({ quiet: true }); } catch (e) { server.config.logger.error("[nova-sync] " + e.message); } }, 200);
      };
      server.watcher.on("change", kick);
      server.watcher.on("add", kick);
      server.watcher.on("unlink", kick);
    },
  };
}

// ---- コマンドとして呼ばれたとき ----
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const [cmd, arg] = args;
  const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
  const mib = (n) => (n / 1048576).toFixed(2).padStart(7) + " MiB";
  try {
    if (cmd === "sync") {
      const prefer = flag("--prefer");
      if (prefer && prefer !== "parts" && prefer !== "view") throw new Error("--prefer は parts か view");
      const r = syncNova({ quiet: args.includes("--quiet"), prefer, allowRemove: args.includes("--allow-remove") });
      if (r.action === "same" && !args.includes("--quiet")) console.log("[nova-sync] ProjectNova.jsx と部品はそろっています");
    } else if (cmd === "check") {
      const r = checkNova();
      r.warn.forEach((w) => console.warn("WARN  " + w));
      r.error.forEach((e) => console.error("ERROR " + e));
      console.log(`${r.error.length ? "NG" : "OK"}: 原稿の部品 ${r.files} ファイル・計${mib(r.bytes).trim()}（警告 ${r.warn.length}・エラー ${r.error.length}）`);
      process.exit(r.error.length ? 1 : 0);
    } else if (cmd === "sizes") {
      let total = 0;
      for (const rel of listParts()) { const n = fs.statSync(path.join(PARTS_DIR, rel)).size; total += n; console.log(mib(n), " ", rel); }
      console.log(mib(total), "  合計");
    } else if (cmd === "where" && arg) {
      const hits = whereInNova(arg);
      hits.forEach((h) => console.log(`nova-app/src/parts/${h.rel}:${h.line}: ${h.text}`));
      if (!hits.length) { console.log("見つかりません: " + arg); process.exit(1); }
    } else if (cmd === "locate" && /^\d+$/.test(arg || "")) {
      const r = locateLine(Number(arg));
      if (!r) throw new Error("行番号が範囲外です");
      console.log(`nova-app/src/parts/${r.rel}:${r.line}`);
    } else {
      console.log("使い方: node nova-app/scripts/nova-src.mjs sync [--prefer parts|view] [--allow-remove] [--quiet] | check | sizes | where <文字列> | locate <写しの行番号>");
      process.exit(cmd ? 1 : 0);
    }
  } catch (e) {
    console.error("nova-src: " + (e && e.message ? e.message : e));
    process.exit(1);
  }
}
