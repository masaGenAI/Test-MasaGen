import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ProjectNova from "./ProjectNova.jsx";
import { installKeyboardAccess } from "./kbdAccess.js";

installKeyboardAccess();

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
  const [showBackup, setShowBackup] = useState(false);
  const [hovered, setHovered] = useState(false);
  // トップ（ランチャー）画面では非表示。ハブ内でのみ表示する。
  const [onLauncher, setOnLauncher] = useState(
    typeof window !== "undefined" ? window.__novaLauncher !== false : true,
  );
  React.useEffect(() => {
    const h = (e) => setOnLauncher(!!(e && e.detail));
    window.addEventListener("nova:launcher", h);
    // ハブを URL で直接開いたときは、本体の通知がこの購読より先に出るため、ここで現在の状態に合わせる
    setOnLauncher(window.__novaLauncher !== false);
    return () => window.removeEventListener("nova:launcher", h);
  }, []);
  // スマホ幅では小さな丸いアイコンだけにし、下へスクロールしている間は隠す（本文のボタンや入力欄に重ならないように）。
  // 上へ戻すか、ページの末尾まで来ると再び出る。iframe のハブ（Book-Summary など）は中のスクロールを拾えないので、小さくするだけ。
  const [narrow, setNarrow] = useState(() => {
    try { return window.matchMedia("(max-width: 640px)").matches; } catch { return false; }
  });
  const [tucked, setTucked] = useState(false);
  // 表示言語はポータルの設定に合わせる（ポータルが切り替えると "nova-lang" を送ってくる）
  const [lang, setLang] = useState(() => (typeof window !== "undefined" && window.__novaLang) || "ja");
  React.useEffect(() => {
    const h = () => setLang(window.__novaLang || "ja");
    window.addEventListener("nova-lang", h);
    return () => window.removeEventListener("nova-lang", h);
  }, []);
  React.useEffect(() => {
    let mq;
    try { mq = window.matchMedia("(max-width: 640px)"); } catch { return undefined; }
    const h = () => setNarrow(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", h); else mq.addListener(h);
    return () => { if (mq.removeEventListener) mq.removeEventListener("change", h); else mq.removeListener(h); };
  }, []);
  React.useEffect(() => {
    let last = window.scrollY || 0;
    const h = () => {
      const y = window.scrollY || 0;
      const atEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
      if (atEnd || y < 120) setTucked(false);
      else if (y > last + 6) setTucked(true);
      else if (y < last - 6) setTucked(false);
      last = y;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (onLauncher) return null;
  const en = lang === "en";

  const flash = (m) => {
    setMsg(m);
    window.setTimeout(() => setMsg(""), 2600);
  };

  const exportProgress = () => {
    const data = collectProgress();
    const count = Object.keys(data).length;
    if (count === 0) {
      flash(en ? "No progress to save yet" : "保存できる進捗がまだありません");
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
    flash(en ? `Saved progress (${count} items)` : `進捗を保存しました（${count}件）`);
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
          if (!window.confirm(en ? `Restore ${keys.length} progress items? This overwrites your current progress.` : `${keys.length}件の進捗を復元します。現在の進捗に上書きされます。よろしいですか？`))
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
          flash(en ? "Restored. Reloading…" : "復元しました。画面を更新します…");
          window.setTimeout(() => window.location.reload(), 700);
        } catch (e) {
          flash(en ? "Restore failed (check the file)" : "復元に失敗しました（ファイルを確認してください）");
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

  const expanded = showBackup || hovered;
  const hide = tucked && !expanded && !msg;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        left: 12,
        bottom: 12,
        zIndex: 2147483000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6,
        // 別PC/ブラウザへ移すためのバックアップ入口。ホバー/クリックで展開。下へスクロール中は隠す。
        opacity: hide ? 0 : 1,
        transform: hide ? "translateY(72px)" : "none",
        pointerEvents: hide ? "none" : "auto",
        transition: "opacity .18s ease, transform .18s ease",
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
            maxWidth: 240,
            lineHeight: 1.5,
            boxShadow: "0 2px 8px rgba(11,31,63,0.25)",
          }}
        >
          {msg}
        </div>
      ) : null}

      {/* 展開時のみ: 自動保存の説明＋バックアップ操作（書き出しは押したときだけDL） */}
      {expanded ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e4e7ec",
            borderRadius: 10,
            padding: "10px 12px",
            boxShadow: "0 4px 14px rgba(11,31,63,0.14)",
            maxWidth: 250,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: LS_OK ? "#166534" : "#b45309", marginBottom: 4, lineHeight: 1.5 }}>
            {LS_OK ? (en ? "✓ Progress is saved automatically on this device" : "✓ 進捗はこの端末に自動保存されています") : (en ? "⚠ Auto-save is off in this browser. Back up your progress" : "⚠ このブラウザは自動保存オフ。バックアップ推奨")}
          </div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, lineHeight: 1.5 }}>
            {en ? "To move to another PC or browser, export a file here and import it there." : "別のPC・ブラウザへ移すには、書き出したファイルを相手側で読み込みます。"}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button style={btn} onClick={exportProgress} title={en ? "Export your learning progress to a file (to move it to another PC/browser)" : "学習の進捗をファイルに書き出します（別のPC/ブラウザへ移せます）"}>
              {en ? "⬇ Export to file" : "⬇ ファイルに書き出し"}
            </button>
            <button style={btn} onClick={importProgress} title={en ? "Import an exported progress file" : "書き出した進捗ファイルを読み込みます"}>
              {en ? "⬆ Import" : "⬆ 読み込み"}
            </button>
          </div>
        </div>
      ) : null}

      {/* 常時: 小さなボタンのみ（クリックでバックアップ操作を固定表示）。背景は不透明にして下の文字が透けないようにする */}
      <button
        onClick={() => setShowBackup((v) => !v)}
        title={LS_OK ? (en ? "Progress is saved automatically. Export/import here to move it to another PC/browser" : "進捗は自動保存されています。別のPC/ブラウザへ移すにはここから書き出し/読み込み") : (en ? "Auto-save is off. Back up here" : "自動保存オフ。ここからバックアップ")}
        aria-label={en ? "Progress backup" : "進捗バックアップ"}
        aria-expanded={showBackup}
        style={{
          borderRadius: 999,
          border: "1px solid " + (LS_OK ? "#b9d9c4" : "#e8c98d"),
          background: LS_OK ? "#E9F6EE" : "#FBF0E1",
          color: LS_OK ? "#166534" : "#9a4a07",
          fontSize: narrow ? 17 : 12.5,
          fontWeight: 700,
          lineHeight: 1,
          cursor: "pointer",
          boxShadow: "0 1px 4px rgba(11,31,63,0.18)",
          padding: narrow ? 0 : "8px 14px",
          width: narrow ? 40 : "auto",
          height: narrow ? 40 : "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter',-apple-system,'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif",
        }}
      >
        {narrow ? (LS_OK ? "💾" : "⚠") : (LS_OK ? "💾 " : "⚠ ") + (en ? "Progress backup" : "進捗バックアップ")}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectNova />
    {/* 画面下に浮くボタン（進捗バックアップ・トップへ）が本文の最終行を隠さないよう、末尾に余白を置く */}
    <div aria-hidden="true" style={{ height: 72 }} />
    <BackupBar />
  </React.StrictMode>,
);
