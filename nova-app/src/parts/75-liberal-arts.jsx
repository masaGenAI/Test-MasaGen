// @@nova-part 75-liberal-arts.jsx
// ================= LiberalArtsModule（source: liberal-arts.html, loaded on open, Blob iframe） =================
// 領域（音楽など）→ 年表 → 人物カード → 関連する言葉、とたどるリベラルアーツ。既読と成績は端末に保存する。
const LiberalArtsModule = (function () {
  const LAH_STORE_KEY = "lah:store:v1";
  function LiberalArtsModule() {
    const ref = useRef(null);
    const [st, setSt] = useState("loading");
    useEffect(() => {
      const iframe = ref.current;
      if (!iframe) return;
      let alive = true, url = null;
      let mirror = {};
      try { mirror = JSON.parse(window.localStorage.getItem(LAH_STORE_KEY) || "{}") || {}; } catch (e) { mirror = {}; }
      const seedJson = JSON.stringify(mirror).replace(/</g, "\\u003c");
      const bridge =
        "<script>(function(){try{" +
        "var mem=" + seedJson + ";" +
        "function post(op,k,v){try{parent.postMessage({__lah:1,op:op,k:k,v:v},'*');}catch(e){}}" +
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
      const onMsg = (ev) => {
        const d = ev.data;
        if (!d || d.__lah !== 1) return;
        try {
          let m = JSON.parse(window.localStorage.getItem(LAH_STORE_KEY) || "{}") || {};
          if (d.op === "set") m[d.k] = d.v;
          else if (d.op === "rm") delete m[d.k];
          else if (d.op === "clr") m = {};
          window.localStorage.setItem(LAH_STORE_KEY, JSON.stringify(m));
        } catch (e) { /* ignore */ }
      };
      window.addEventListener("message", onMsg);
      novaHubHtml("liberal-arts.html").then((src) => {
        if (!alive) return;
        const html = src.replace("<head>", "<head>" + bridge);
        url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
        iframe.src = url;
        setSt("ok");
      }).catch(() => { if (alive) setSt("fail"); });
      return () => { alive = false; window.removeEventListener("message", onMsg); if (url) URL.revokeObjectURL(url); };
    }, []);
    return (
      <>
        {st !== "ok" ? <NovaHubStatus state={st} file="liberal-arts.html" name="リベラルアーツ" /> : null}
        <iframe ref={ref} title="リベラルアーツ" style={{ width: "100%", height: "calc(100vh - 46px)", border: "none", display: st === "ok" ? "block" : "none" }} />
      </>
    );
  }
  return LiberalArtsModule;
})();
