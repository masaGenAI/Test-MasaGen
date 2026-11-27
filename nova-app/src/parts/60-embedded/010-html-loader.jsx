// @@nova-part 60-embedded/010-html-loader.jsx
// ================= 別ファイルのハブ HTML の読み込み =================
// 大きいハブ（Book-Summary・リベラルアーツ）は本体の index.html に埋め込まず、同じ場所に置いた別ファイルを
// 開いたときに1回だけ読み込む。読み込めない場合（file:// で直接開いたときは fetch が使えない）は、ファイルを直接開く案内を出す。
const __novaHubHtml = {};
function novaHubHtml(file) {
  if (!__novaHubHtml[file]) {
    const pr = fetch(new URL(file, window.location.href).href).then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); });
    __novaHubHtml[file] = pr;
    pr.catch(() => { if (__novaHubHtml[file] === pr) delete __novaHubHtml[file]; });
  }
  return __novaHubHtml[file];
}
function NovaHubStatus({ state, file, name, kind, onRetry }) {
  const box = { maxWidth: 560, margin: "48px auto", padding: "20px 22px", borderRadius: 12, border: "1px solid #3A3350", background: "#1E1832", color: "#EDE8F4", fontSize: 14, lineHeight: 1.8 };
  // kind="script"：ビルドで別ファイル（JS）にしたハブ（novaLazyHub）。案内はポータルの言語に合わせる
  const en = kind === "script" && typeof window !== "undefined" && window.__novaLang === "en";
  if (state === "fail" && kind === "script") {
    return (
      <div role="alert" style={box}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>{en ? `Could not load ${name}` : `${name} を読み込めませんでした`}</div>
        <div style={{ color: "#ADA4C6" }}>
          {en ? "Check your connection and try again. If you opened index.html as a file, keep " : "ネット接続を確かめて、もう一度開いてください。index.html をファイルとして直接開いている場合は、同じフォルダに"}
          <code style={{ color: "#8FA2FF", margin: en ? 0 : "0 4px", wordBreak: "break-all" }}>{file}</code>
          {en ? " next to it (index.html alone cannot open this hub)." : "が必要です（index.html だけを別の場所へ移すと、このハブは開けません）。"}
        </div>
        {onRetry ? (
          <button onClick={onRetry} style={{ marginTop: 12, padding: "6px 16px", borderRadius: 8, border: "1px solid #8FA2FF", background: "transparent", color: "#EDE8F4", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {en ? "Try again" : "もう一度読み込む"}
          </button>
        ) : null}
      </div>
    );
  }
  if (state === "fail") {
    return (
      <div role="alert" style={box}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>{name} を読み込めませんでした</div>
        <div style={{ color: "#ADA4C6" }}>
          ネット接続を確かめて、もう一度開いてください。index.html をファイルとして直接開いている場合は、同じフォルダにある
          <a href={file} target="_blank" rel="noreferrer" style={{ color: "#8FA2FF", margin: "0 4px" }}>{file}</a>
          を直接開いてください（その場合の進捗は、この画面の中で開いたときとは別に保存されます）。
        </div>
      </div>
    );
  }
  return <div role="status" style={{ ...box, textAlign: "center", color: "#ADA4C6" }}>{en ? `Loading ${name}…` : `${name} を読み込んでいます…`}</div>;
}
