// @@nova-part 60-embedded/040-learning-tracker.jsx
// ================= LearningTrackerModule (source: learning-tracker.html, Blob-embedded) =================
const LearningTrackerModule = (function () {
  // トラッカーの編集内容(localStorage)を親へブリッジして永続化するためのキー。
  const LT_STORE_KEY = "lt:store:v1";
  function LearningTrackerModule() {
    // 学習ロードマップ トラッカー（自動保存つき表アプリ）を Blob URL 化して iframe で読み込む。
    // Blob は不透明オリジンで localStorage が使えないため、window.localStorage をメモリ実装に
    // 差し替え、書き込みを postMessage で親へ転送 → 親が自身の localStorage に保存する。
    // これでダブルクリック起動(file://)でも編集・進捗が保持される。
    const ref = useRef(null);
    useEffect(() => {
      const iframe = ref.current;
      if (!iframe) return;
      let mirror = {};
      try {
        mirror = JSON.parse(window.localStorage.getItem(LT_STORE_KEY) || "{}") || {};
      } catch (e) {
        mirror = {};
      }
      const seedJson = JSON.stringify(mirror).replace(/</g, "\\u003c");
      const bridge =
        "<script>(function(){try{" +
        "var mem=" +
        seedJson +
        ";" +
        "function post(op,k,v){try{parent.postMessage({__lt:1,op:op,k:k,v:v},'*');}catch(e){}}" +
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
      const html = LEARNING_TRACKER_HTML.replace("<head>", "<head>" + bridge);
      const onMsg = (ev) => {
        const d = ev.data;
        if (!d || d.__lt !== 1) return;
        try {
          let m = JSON.parse(window.localStorage.getItem(LT_STORE_KEY) || "{}") || {};
          if (d.op === "set") { try { novaDailyOnTracker(d.k, m[d.k] === undefined ? null : m[d.k], d.v); } catch (e) {} m[d.k] = d.v; }
          else if (d.op === "rm") delete m[d.k];
          else if (d.op === "clr") m = {};
          window.localStorage.setItem(LT_STORE_KEY, JSON.stringify(m));
        } catch (e) {
          /* ignore */
        }
      };
      window.addEventListener("message", onMsg);
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      iframe.src = url;
      return () => {
        window.removeEventListener("message", onMsg);
        URL.revokeObjectURL(url);
      };
    }, []);
    return (
      <iframe
        ref={ref}
        title="学習ロードマップ トラッカー"
        style={{ width: "100%", height: "calc(100vh - 46px)", border: "none", display: "block" }}
      />
    );
  }
  return LearningTrackerModule;
})();
