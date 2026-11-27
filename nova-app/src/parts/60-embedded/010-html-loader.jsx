// @@nova-part 60-embedded/010-html-loader.jsx
// ================= 別ファイルのハブ HTML の読み込み =================
// 大きいハブ（Book-Summary・リベラルアーツ）は本体の index.html に埋め込まず、同じ場所に置いた別ファイルを
// 開いたときに1回だけ読み込む。読み込めない場合（file:// で直接開いたときは fetch が使えない）は、ファイルを直接開く案内を出す。
// 公開版（npm run build:public。GitHub Pages に出すビルド）かどうか。公開版には Book-Summary の中身
// （booksummaryhub.html・booksummary-*.js・kindle-figs/）を入れない。理由と切り替え方は docs/publication-scope.md。
// vite.config.js の define が入らない場面（検査スクリプトが原稿を直接評価するとき）は、全部入り（false）として扱う。
const NOVA_PUBLIC_BUILD = typeof __NOVA_PUBLIC__ !== "undefined" && __NOVA_PUBLIC__ === true;
// 公開版に入れていないハブを開いたときの案内
function NovaLocalOnly({ name }) {
  const en = typeof window !== "undefined" && window.__novaLang === "en";
  const box = { maxWidth: 560, margin: "48px auto", padding: "20px 22px", borderRadius: 12, border: "1px solid #DEE5EF", background: "#F4F7FB", color: "#0E1E38", fontSize: 14, lineHeight: 1.8 };
  return (
    <div role="note" style={box}>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{en ? `${name} is not included in the public build` : `${name} は公開版には入れていません`}</div>
      <div style={{ color: "#5B6B85" }}>
        {en
          ? "Summaries of books, videos and articles are kept out of the public site out of respect for the terms of their sources. They open in a build you make locally (npm run build), where your reading progress is also kept."
          : "書籍・動画・記事の要約は、出典元の利用条件に配慮して、公開サイトには出していません。手元で作った版（npm run build）で開けます。既読・クイズなどの進捗も、その版に残ります。"}
      </div>
    </div>
  );
}
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
