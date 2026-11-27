// @@nova-part 60-embedded/030-booksummary.jsx
// ================= BookSummaryModule (source: booksummaryhub.html, loaded on open into an isolated iframe) =================
// ユーザーが作り込んだ完成版 Book-Summary ハブ（独自ダークモード / 全書籍検索 / クイズ /
// メモ / localStorage 永続化 / 履歴ナビ）を、React へ変換せずそのまま iframe に埋め込む。
// srcDoc の iframe は親ページと同一オリジンで動くため localStorage を共有し、進捗も残る。
const BookSummaryModule = (function () {
  // Book-Summary の進捗を親（本体）の localStorage に橋渡しして永続化するためのキー。
  const BSH_STORE_KEY = "bsh:store:v1";

  function BookSummaryModule() {
    // 完成版 Book-Summary ハブ（flier・Kindle・YouTube・note・Instagram の要約、検索・クイズ・メモ・ダークモード・履歴ナビ）を、
    // 実行時に Blob URL 化して iframe で読み込む。これにより単一HTMLファイルのままでも
    // 大容量インラインスクリプトが確実に実行され、履歴ナビ(#/route)も正しく動作する。
    //
    // Blob は不透明オリジンのため iframe 内 localStorage は閉じると消える。そこで:
    //   1. 開くとき、親が保存しておいた進捗スナップショットを HTML 先頭に注入して復元(seed)。
    //   2. 使用中の localStorage への書き込みを postMessage で親へ転送。
    //   3. 親は自身の localStorage(=file:// でも残る) に保存。
    // これで Book-Summary の既読・クイズ・メモ・テーマがダブルクリック起動でも永続化される。
    // 親の localStorage は右下「進捗を保存/復元」のバックアップ対象にも含まれる。
    const ref = useRef(null);
    const [st, setSt] = useState("loading");
    useEffect(() => {
      const iframe = ref.current;
      if (!iframe) return;
      let alive = true, url = null;
      let mirror = {};
      try {
        mirror = JSON.parse(window.localStorage.getItem(BSH_STORE_KEY) || "{}") || {};
      } catch (e) {
        mirror = {};
      }
      // JSON 内の "<" をエスケープして </script> によるタグ閉じを防ぐ
      const seedJson = JSON.stringify(mirror).replace(/</g, "\\u003c");
      // Blob(不透明オリジン)の iframe では localStorage 自体がアクセス拒否(例外)になる。
      // そこで window.localStorage をメモリ実装に差し替える。読み取りは親から渡された
      // スナップショット(seed)から同期的に返し、書き込みは親へ postMessage で転送する。
      // このブリッジは他スクリプト（テーマ判定含む）より先に実行させる必要があるため <head> 直後に注入。
      const bridge =
        "<script>(function(){try{" +
        "var mem=" +
        seedJson +
        ";" +
        "function post(op,k,v){try{parent.postMessage({__bsh:1,op:op,k:k,v:v},'*');}catch(e){}}" +
        "var fake={" +
        "getItem:function(k){return Object.prototype.hasOwnProperty.call(mem,k)?String(mem[k]):null;}," +
        "setItem:function(k,v){mem[k]=String(v);post('set',String(k),String(v));}," +
        "removeItem:function(k){delete mem[k];post('rm',String(k));}," +
        "clear:function(){mem={};post('clr');}," +
        "key:function(i){var ks=Object.keys(mem);return i>=0&&i<ks.length?ks[i]:null;}" +
        "};" +
        "Object.defineProperty(fake,'length',{get:function(){return Object.keys(mem).length;}});" +
        "try{Object.defineProperty(window,'localStorage',{configurable:true,get:function(){return fake;}});}catch(e){}" +
        "}catch(e){}})();<" +
        "/script>";
      // iframe は blob: の文書なので相対 URL が解決できない。図解などの静的ファイル（public/ 配下）は親ページの場所から読む
      const assetBase = "<script>window.__NOVA_ASSET_BASE__=" + JSON.stringify(new URL(".", window.location.href).href) + ";</" + "script>";

      const onMsg = (ev) => {
        const d = ev.data;
        if (!d || d.__bsh !== 1) return;
        try {
          let m = JSON.parse(window.localStorage.getItem(BSH_STORE_KEY) || "{}") || {};
          if (d.op === "set") { try { novaDailyOnWrite("bsh:" + d.k, m[d.k] === undefined ? null : m[d.k], d.v); } catch (e) {} m[d.k] = d.v; }
          else if (d.op === "rm") delete m[d.k];
          else if (d.op === "clr") m = {};
          window.localStorage.setItem(BSH_STORE_KEY, JSON.stringify(m));
        } catch (e) {
          /* ignore */
        }
      };
      window.addEventListener("message", onMsg);

      novaHubHtml("booksummaryhub.html").then((src) => {
        if (!alive) return;
        const html = src.replace("<head>", "<head>" + bridge + assetBase);
        url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
        // #booksummary/book/<id> などで開かれたら、Book-Summary の中の同じ位置（#/book/<id>）から始める
        const sub = novaHubPath("booksummary");
        iframe.src = url + (sub && sub.length ? "#/" + sub.map(encodeURIComponent).join("/") : "");
        setSt("ok");
      }).catch(() => { if (alive) setSt("fail"); });
      return () => {
        alive = false;
        window.removeEventListener("message", onMsg);
        if (url) URL.revokeObjectURL(url);
      };
    }, []);
    return (
      <>
        {st !== "ok" ? <NovaHubStatus state={st} file="booksummaryhub.html" name="Book-Summary" /> : null}
        <iframe
          ref={ref}
          title="Book Summary 統合戦略ハブ"
          style={{ width: "100%", height: "calc(100vh - 46px)", border: "none", display: st === "ok" ? "block" : "none" }}
        />
      </>
    );
  }
  return BookSummaryModule;
})();
