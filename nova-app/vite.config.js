import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// ProjectNova.jsx は 15 万行超の巨大な単一コンポーネント。
// esbuild の変換上限に触れないよう、また .jsx を JSX として扱えるよう明示設定する。
// viteSingleFile: すべてを 1 つの index.html に埋め込み、ダブルクリックで開けるようにする。
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  esbuild: {
    legalComments: "none",
  },
  server: {
    host: true,
    port: 5173,
  },
});
