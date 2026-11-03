import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import fs from "node:fs";
import { novaLazyHubs } from "./scripts/lazy-hubs.mjs";

// ProjectNova.jsx は 15 万行超の巨大な単一コンポーネント。
// esbuild の変換上限に触れないよう、また .jsx を JSX として扱えるよう明示設定する。
// viteSingleFile: アプリ本体を 1 つの index.html に埋め込む。
//
// Book-Summary（約40MB）とリベラルアーツ（約5MB）の HTML は本体に埋め込まず、
// public/ から dist/ に置かれる別ファイルを、ハブを開いたときに読み込む（本体の読み込みを軽くするため）。
// ポータルの目次に出す件数だけは、ビルド時にその2ファイルから数えて埋め込む。
//
// 大きい React のハブ（下の hubs：TechHub・Certification Hub・Finance Hub・Consulting Hub・Linguistics Hub・Side Work Hub。
// 合わせて ProjectNova.jsx の 98% ほど）も本体に埋め込まない。
// 原稿は ProjectNova.jsx のまま（検査スクリプトやスキルが直接読むため）で、ビルドのときにだけ novaLazyHubs が
// 各ハブを別ファイル dist/nova-hub-<key>-<hash>.js に切り出し、ハブを開いたときに <script> で読み込む（scripts/lazy-hubs.mjs）。
// ポータルが最初の描画で使う値（下の values / byLang）は、ビルド時に計算して本体に埋め込む。
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
  plugins: [
    novaLazyHubs({
      entry: "src/ProjectNova.jsx",
      hubs: [
        // values: ポータルが読む静的プロパティ（そのまま埋め込む）／byLang: (en) => 値 の関数（日英の結果を埋め込む）
        // key はハブの id（URL の #<id>）にそろえる。name は読み込み中・失敗時の案内に出す名前（ポータルの表示名）
        { decl: "MegaTechHubModule", key: "megatech", name: "TechHub", values: ["TAB_COUNT", "MASTERY_COUNTS"], byLang: ["PORTAL_INDEX"] },
        { decl: "CertHubModule", key: "certification", name: "Certification Hub", values: [], byLang: ["PORTAL_INDEX"] },
        // WEAK_KEYS：弱点レーダーが読む保存キーと見出し
        { decl: "FinanceHubModule", key: "finance", name: "Finance Hub", values: ["WEAK_KEYS"], byLang: ["PORTAL_INDEX"] },
        { decl: "ConsultingHubModule", key: "consulting", name: "Consulting Hub", values: [], byLang: ["PORTAL_INDEX"] },
        // FIELD_STATS：目次タグの分類数・分野数（弱点レーダーの WEAK_TABLE は関数なので、記録があるときだけ novaHubReady で読み込んで使う）
        { decl: "LinguisticsHubModule", key: "linguisticshub", name: "Linguistics Hub", values: ["FIELD_STATS"], byLang: ["PORTAL_INDEX"] },
        { decl: "SideWorkHubModule", key: "sidework", name: "Side Work Hub", values: [], byLang: [] },
      ],
    }),
    react(),
    viteSingleFile(),
  ],
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
