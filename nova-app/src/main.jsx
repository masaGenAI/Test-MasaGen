import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ProjectNova from "./ProjectNova.jsx";

/*
 * window.storage ポリフィル + 進捗バックアップ
 * --------------------------------------------------------------------------
 * ProjectNova.jsx は Claude.ai 実行環境の `window.storage` API（進捗永続化用）に
 * 依存している。通常ブラウザには無いので localStorage で再現する。
 *
 *   window.storage.get(key) -> Promise<{ value: string } | null>
 *   window.storage.set(key, value: string) -> Promise<void>
 *
 * さらに、ダブルクリックで開く file:// 形式では、ブラウザによって localStorage が
 * 閉じると消える場合がある（特に Safari は file:// で保存不可）。そこで、
 *   - メモリミラー(mem)で「開いている間」は確実に保持
 *   - JSON バックアップの「保存/復元」で、閉じても・別PCでも進捗を引き継げる
 * ようにする。
 */

// localStorage が実際に書けるか判定
const LS_OK = (() => {
  try {
    const k = "__nova_ls_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
})();

// 開いている間の状態を確実に保持するメモリミラー。起動時に localStorage から復元。
const mem = {};
if (LS_OK) {
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      mem[k] = window.localStorage.getItem(k);
    }
  } catch {
    /* ignore */
  }
}

if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    async get(key) {
      if (Object.prototype.hasOwnProperty.call(mem, key)) return { value: mem[key] };
      if (LS_OK) {
        try {
          const v = window.localStorage.getItem(key);
          if (v !== null) {
            mem[key] = v;
            return { value: v };
          }
        } catch {
          /* ignore */
        }
      }
      return null;
    },
    async set(key, value) {
      mem[key] = value;
      if (LS_OK) {
        try {
          window.localStorage.setItem(key, value);
        } catch {
          /* ignore */
        }
      }
    },
  };
}

// 進捗データ（localStorage + メモリ）を1つのオブジェクトに集約
function collectProgress() {
  const data = {};
  if (LS_OK) {
    try {
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k === "__nova_ls_test__") continue;
        data[k] = window.localStorage.getItem(k);
      }
    } catch {
      /* ignore */
    }
  }
  Object.assign(data, mem); // セッション中の最新値を優先
  return data;
}

function BackupBar() {
  const [msg, setMsg] = useState("");

  const flash = (m) => {
    setMsg(m);
    window.setTimeout(() => setMsg(""), 2600);
  };

  const exportProgress = () => {
    const data = collectProgress();
    const count = Object.keys(data).length;
    if (count === 0) {
      flash("保存できる進捗がまだありません");
      return;
    }
    const payload = JSON.stringify(
      { format: "nova-progress", version: 1, savedAt: new Date().toISOString(), data },
      null,
      2,
    );
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `nova-progress-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    flash(`進捗を保存しました（${count}件）`);
  };

  const importProgress = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          const data = parsed && parsed.data ? parsed.data : parsed;
          if (!data || typeof data !== "object") throw new Error("形式が不正です");
          const keys = Object.keys(data);
          if (!window.confirm(`${keys.length}件の進捗を復元します。現在の進捗に上書きされます。よろしいですか？`))
            return;
          keys.forEach((k) => {
            mem[k] = String(data[k]);
            if (LS_OK) {
              try {
                window.localStorage.setItem(k, String(data[k]));
              } catch {
                /* ignore */
              }
            }
          });
          flash("復元しました。画面を更新します…");
          window.setTimeout(() => window.location.reload(), 700);
        } catch (e) {
          flash("復元に失敗しました（ファイルを確認してください）");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const btn = {
    border: "1px solid #d5dbe6",
    background: "#ffffff",
    color: "#1E3A6E",
    borderRadius: 8,
    padding: "7px 12px",
    fontSize: 12.5,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Inter',-apple-system,'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif",
    boxShadow: "0 1px 3px rgba(11,31,63,0.10)",
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 14,
        bottom: 14,
        zIndex: 2147483000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
      }}
    >
      {msg ? (
        <div
          style={{
            background: "#0B1F3F",
            color: "#fff",
            fontSize: 12,
            padding: "6px 11px",
            borderRadius: 7,
            maxWidth: 260,
            lineHeight: 1.5,
            boxShadow: "0 2px 8px rgba(11,31,63,0.25)",
          }}
        >
          {msg}
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 6 }}>
        <button style={btn} onClick={exportProgress} title="学習の進捗をファイルに保存します">
          ⬇ 進捗を保存
        </button>
        <button style={btn} onClick={importProgress} title="保存した進捗ファイルを読み込みます">
          ⬆ 復元
        </button>
      </div>
      {!LS_OK ? (
        <div style={{ fontSize: 10.5, color: "#b45309", maxWidth: 240, textAlign: "right", lineHeight: 1.5 }}>
          ※ このブラウザは自動保存が無効です。「進捗を保存」でバックアップしてください。
        </div>
      ) : null}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectNova />
    <BackupBar />
  </React.StrictMode>,
);
