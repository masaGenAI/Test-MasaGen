import React from "react";
import ReactDOM from "react-dom/client";
import ProjectNova from "./ProjectNova.jsx";

/*
 * window.storage ポリフィル
 * --------------------------------------------------------------------------
 * ProjectNova.jsx は Claude.ai のアーティファクト実行環境が提供する
 * `window.storage` API（進捗の永続化用）に依存している。
 * 通常のブラウザには存在しないため、localStorage を使って同じ形の API を再現する。
 *
 *   window.storage.get(key) -> Promise<{ value: string } | null>
 *   window.storage.set(key, value: string) -> Promise<void>
 *
 * これが無いと進捗・SRS・翻訳キャッシュ等が保存されない（try/catch されているため
 * アプリ自体は落ちないが、リロードで状態が消える）。
 */
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    async get(key) {
      try {
        const value = window.localStorage.getItem(key);
        return value === null ? null : { value };
      } catch {
        return null;
      }
    },
    async set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* localStorage が使えない環境では黙って無視する */
      }
    },
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectNova />
  </React.StrictMode>,
);
