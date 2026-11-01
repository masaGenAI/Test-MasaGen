import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import fs from "node:fs";

// ProjectNova.jsx は 15 万行超の巨大な単一コンポーネント。
// esbuild の変換上限に触れないよう、また .jsx を JSX として扱えるよう明示設定する。
// viteSingleFile: アプリ本体を 1 つの index.html に埋め込む。
//
// Book-Summary（約40MB）とリベラルアーツ（約5MB）の HTML は本体に埋め込まず、
// public/ から dist/ に置かれる別ファイルを、ハブを開いたときに読み込む（本体の読み込みを軽くするため）。
// ポータルの目次に出す件数だけは、ビルド時にその2ファイルから数えて埋め込む。
function hubStats() {
  const read = (p) => { try { return fs.readFileSync(new URL(p, import.meta.url), "utf8"); } catch (e) { return ""; } };
  const h = read("./public/booksummaryhub.html");
  const la = read("./public/liberal-arts.html");
  const cnt = (s, needle) => { let n = 0, i = s.indexOf(needle); while (i >= 0) { n++; i = s.indexOf(needle, i + needle.length); } return n; };
  const flierPart = h.slice(h.indexOf("const DATA = ["), h.indexOf("const THEME_SYNTHESIS"));
  return {
    books: cnt(h, '"oneLiner":'), yt: cnt(h, '{"id":"yt_'), note: cnt(h, '{"id":"note_'),
    flier: (flierPart.match(/"oneLiner":/g) || []).length, listOnly: cnt(h, '"listOnly":true'),
    la: { people: (la.match(/"born":\d+/g) || []).length, inst: (la.match(/"people":\[/g) || []).length, trivia: (la.match(/"f":"/g) || []).length, domains: (la.match(/"ready":(true|false)/g) || []).length },
  };
}

// ポータルの横断検索用：Book-Summary の書名・著者の索引 [[id, title, author, kind], ...]（要約があるものだけ）
function bookIndex() {
  let h = "";
  try { h = fs.readFileSync(new URL("./public/booksummaryhub.html", import.meta.url), "utf8"); } catch (e) { return []; }
  const out = [];
  const re = /\{"id":"([^"]+)","title":"((?:[^"\\]|\\.)*)"(?:,"author":"((?:[^"\\]|\\.)*)")?/g;
  const un = (x) => { try { return JSON.parse('"' + (x || "") + '"'); } catch (e) { return x || ""; } };
  let m;
  while ((m = re.exec(h))) {
    const tail = h.slice(m.index, m.index + 4000);
    const next = tail.indexOf('{"id":"', 7);
    const rec = next > 0 ? tail.slice(0, next) : tail;
    if (!rec.includes('"oneLiner":') || rec.includes('"listOnly":true')) continue;
    const id = m[1];
    const kind = id.startsWith("yt_") ? "YouTube" : id.startsWith("note_") ? "note" : id.startsWith("ig_") ? "Instagram" : "";
    out.push([id, un(m[2]), un(m[3]), kind]);
  }
  return out;
}

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: {
    __NOVA_HUB_STATS__: JSON.stringify(hubStats()),
    __NOVA_BOOK_INDEX__: JSON.stringify(bookIndex()),
  },
  esbuild: {
    legalComments: "none",
  },
  server: {
    host: true,
    port: 5173,
  },
});
