import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ProjectNova.jsx は 15 万行超の巨大な単一コンポーネント。
// esbuild の変換上限に触れないよう、また .jsx を JSX として扱えるよう明示設定する。
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // 巨大ファイルでも変換できるよう legalComments を無効化（出力を軽く保つ）
    legalComments: "none",
  },
  server: {
    host: true,
    port: 5173,
  },
});
