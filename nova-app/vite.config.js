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

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: {
    __NOVA_HUB_STATS__: JSON.stringify(hubStats()),
  },
  esbuild: {
    legalComments: "none",
  },
  server: {
    host: true,
    port: 5173,
  },
});
