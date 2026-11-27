// @@nova-part 60-embedded/020-lazy-hub-loader.jsx
// ================= 別ファイルに分けた React のハブ（Finance・TechHub・Consulting・Certification・Side Work・Linguistics）の読み込み =================
// npm run build では、vite.config.js の novaLazyHubs に並べたハブ（FinanceHubModule・MegaTechHubModule・ConsultingHubModule・
// CertHubModule・SideWorkHubModule・LinguisticsHubModule）の中身を index.html に埋め込まず、
// 同じ場所の別ファイル（nova-hub-*.js）にして、開いたときに1回だけ読み込む（scripts/lazy-hubs.mjs が ProjectNova.jsx から
// 切り出し、ここの novaLazyHub(...) の呼び出しに置き換える）。中身はトップレベルの共通部品（React・StarButton など）を
// 引数で受け取るので、二重に評価されない。開発サーバー（npm run dev）と検査スクリプトは切り出さない元のファイルをそのまま使う。
// ポータルの最初の描画で使う値（タブ数・分野数・Mastery Track の件数・横断検索の項目・弱点レーダーの保存キー）は、
// ビルド時に計算して埋め込むので読み込みを待たない。
// それ以外の中身（関数など）がポータル側で要るときは novaHubReady(…) で読み込みを待つ（弱点レーダーの CLF・Linguistics）。
// 読み込みは <script>（module ではない）で行うので、index.html をファイルとして直接開いても、別ファイルが同じフォルダにあれば開ける。
const __novaHubScripts = {};
function novaLoadHubScript(key, file) {
  if (!__novaHubScripts[key]) {
    const pr = new Promise((resolve, reject) => {
      const reg = (window.__NOVA_HUB_CHUNKS__ = window.__NOVA_HUB_CHUNKS__ || {});
      if (reg[key]) { resolve(reg[key]); return; }
      const s = document.createElement("script");
      s.src = new URL(file, document.baseURI).href;
      s.async = true;
      s.charset = "utf-8";
      s.onload = () => { s.remove(); if (reg[key]) resolve(reg[key]); else reject(Object.assign(new Error(file + " を実行できませんでした"), { novaEval: true })); };
      s.onerror = () => { s.remove(); reject(new Error(file + " を読み込めませんでした")); };
      document.head.appendChild(s);
    });
    __novaHubScripts[key] = pr;
    pr.catch(() => { if (__novaHubScripts[key] === pr) delete __novaHubScripts[key]; });
  }
  return __novaHubScripts[key];
}
// cfg: { key, name, file, deps: () => ({ 共通部品 }), statics: { 名前: 値 }, byLang: { 名前: [日本語版の値, 英語版の値] } }
function novaLazyHub(cfg) {
  let mod = null, pending = null;
  const load = () => {
    if (mod) return Promise.resolve(mod);
    if (!pending) {
      pending = novaLoadHubScript(cfg.key, cfg.file).then((factory) => {
        if (!mod) { try { mod = factory(cfg.deps()); } catch (e) { throw Object.assign(e instanceof Error ? e : new Error(String(e)), { novaEval: true }); } }
        return mod;
      });
      pending.catch(() => { pending = null; });
    }
    return pending;
  };
  function NovaLazyHub(props) {
    const [st, setSt] = useState(mod ? "ok" : "loading");
    const [err, setErr] = useState(null);
    useEffect(() => {
      if (st !== "loading") return undefined;
      let alive = true;
      load().then(() => { if (alive) setSt("ok"); }, (e) => {
        try { console.error("[Nova] hub load failed:", cfg.key, e); } catch (x) {}
        if (!alive) return;
        if (e && e.novaEval) setErr(e); else setSt("fail");
      });
      return () => { alive = false; };
    }, [st]);
    // 読み込めたが中身の実行で失敗した（コードの誤り）→ ハブ単位のエラー境界に出す
    if (err) throw err;
    if (st === "ok" && mod) return React.createElement(mod, props);
    return <NovaHubStatus state={st} file={cfg.file} name={cfg.name} kind="script" onRetry={() => setSt("loading")} />;
  }
  Object.assign(NovaLazyHub, cfg.statics || {});
  Object.entries(cfg.byLang || {}).forEach(([k, v]) => { NovaLazyHub[k] = (en) => v[en ? 1 : 0]; });
  NovaLazyHub.load = load;
  NovaLazyHub.displayName = "NovaLazyHub(" + cfg.key + ")";
  return NovaLazyHub;
}
// 別ファイルに分けたハブの中身を使う前に読み込みを待つ（開発サーバーでは本体に入っているので、そのまま返す）
function novaHubReady(mod) {
  return mod && typeof mod.load === "function" ? mod.load() : Promise.resolve(mod);
}
