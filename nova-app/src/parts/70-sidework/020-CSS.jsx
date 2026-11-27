// @@nova-part 70-sidework/020-CSS.jsx
  const CHECK_KEY = "sw:checked:v1";
  const GATE_KEY = "sw:gate:v1";
  const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || "{}") || {}; } catch (e) { return {}; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const SANS = 'Inter, -apple-system, "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif';

  // ---------- 画面の言語（ポータルの言語で開き、メニューの EN／日本語 で切り替える） ----------
  // 訳すのは画面の部品（見出し・ボタン・案内・凡例）と、データに入っている短い決まった名前（分類・地域・段階・役割・シリーズ名など）だけ。
  // 調査データ・企画・台本・出典など、日本語で発信するための中身は訳さない。値そのもの（絞り込み・保存・CSS のキー）も日本語のまま。
  // ハブの根（SideWorkHub）が描画のたびに UI_EN を入れ直すので、部品と補助関数は tx(日本語, 英語) で今の言語の文言を選ぶ。
  let UI_EN = false;
  const tx = (ja, en) => (UI_EN ? en : ja);
  const useUiLang = () => {
    const [ui, setUi] = useState(() => (typeof window !== "undefined" && window.__novaLang) || "ja"); // ポータルの言語で開く
    useEffect(() => {
      // ポータルが保存済みの言語を読み込んだとき・切り替えたとき（nova-lang）にも合わせる
      const f = () => { const l = window.__novaLang; if (l === "ja" || l === "en") setUi(l); };
      window.addEventListener("nova-lang", f);
      return () => window.removeEventListener("nova-lang", f);
    }, []);
    return [ui, setUi];
  };
  const EN_LABEL = {
    // 市場の分類・地域・題材
    "主要市場": "Major markets", "学び・お金": "Learning & money", "悩み系": "Personal worries", "趣味・教養": "Hobbies & culture", "クリエイター・AI": "Creators & AI",
    "世界": "World", "中国": "China", "米国": "US", "英国": "UK", "韓国": "South Korea", "日本": "Japan", "東アジア": "East Asia", "ワイン": "Wine", "歴史": "History",
    // 海外の事例・媒体の段階と種類
    "手本": "Role model", "反面教師": "Cautionary tale", "プラットフォームの動き": "Platform move", "AI量産": "AI mass production", "教養": "General knowledge",
    "急成長": "Surging", "伸び始め": "Rising", "定着": "Established",
    "コミュニティ": "Community", "テキスト・ニュースレター": "Text & newsletters", "画像・発見": "Images & discovery", "短尺動画": "Short video", "長尺・音声": "Long-form & audio",
    // 参考アカウントの役割・テーマ
    "ノウハウ": "Know-how", "協業候補": "Potential partner", "情報源": "Source",
    "AI・制作": "AI & production", "SNS運用": "Social media ops", "お酒全般": "Drinks in general", "その他": "Other", "歴史・文化": "History & culture",
    // ツールの分類・連携の工程と種類・自動化の度合い
    "リサーチ・台本": "Research & scripts", "音声": "Audio", "画像": "Images", "動画生成": "Video generation", "編集・字幕": "Editing & captions", "アバター": "Avatars", "投稿の自動化": "Posting automation", "分析": "Analytics",
    "調べる": "Research", "作る": "Make", "投稿": "Post", "管理": "Manage", "全体": "Overall",
    "台本": "Script", "編集": "Editing", "調査": "Research", "収録・編集": "Recording & editing", "切り出し": "Clipping",
    "コネクタ（MCP）": "Connector (MCP)", "プラグイン": "Plugin",
    "自動": "Auto", "半自動": "Semi-auto", "人": "Human",
    // 媒体とテーマの相性の段階
    "非常に高い": "Very high", "高い": "High", "中〜高": "Medium–high", "中": "Medium", "低〜中": "Low–medium", "低": "Low",
    // 発信プランの層
    "ライト": "Casual", "ミドル": "Middle", "コア": "Core",
    // 「その時」の型・時代
    "決断の瞬間": "Moment of decision", "出来事の瞬間": "Moment of event", "解説型": "Explainer",
    "古代": "Ancient", "中世": "Medieval", "近世": "Early modern", "近代": "Modern", "現代": "Contemporary",
    // シリーズ
    "ワイン：制度と格付け": "Wine: rules & classifications", "ワイン：人物とメゾン": "Wine: people & houses", "ワイン：事件・取引・戦争": "Wine: scandals, trade & war",
    "ワイン：産地と世界遺産": "Wine: regions & World Heritage", "ワイン：技術と品種": "Wine: techniques & grapes", "ワイン：文化・作品・評論": "Wine: culture, works & criticism",
    "世界：古代・中世": "World: ancient & medieval", "世界：近世": "World: early modern", "世界：近代": "World: modern", "世界：20世紀以降": "World: 20th century on",
    "日本：古代〜戦国": "Japan: ancient to Sengoku", "日本：江戸": "Japan: Edo", "日本：近代": "Japan: modern", "日本：戦後": "Japan: postwar",
    // 発信の型（名前と短い名前）
    "二人の対談で深掘り": "Two-person deep-dive talk", "地図と図解で戦況を追う": "Following events on maps & diagrams", "ユーモアのあるアニメ解説": "Humorous animated explainer",
    "超長尺の語りドキュメンタリー": "Very long narrated documentary", "図解インフォグラフィック": "Infographic explainer", "60秒の一問一答・逸話": "60-second Q&A or anecdote",
    "今と過去をつなぐ連載ニュースレター": "Serial newsletter linking past & present", "現地とモノから語る": "Told through places & objects",
    "対談": "Talk", "地図": "Maps", "アニメ": "Animation", "長尺語り": "Long narration", "図解": "Infographic", "ショート": "Short", "連載": "Serial", "現地": "On location",
    // 第1か月の台本の形
    "記念日ショート（60秒）": "Anniversary short (60 s)", "カルーセル5枚": "5-slide carousel", "長尺": "Long-form", "3分版": "3-minute version", "60秒「その時」版": "60-second \"moment\" version", "15〜30秒ショート": "15–30 s short",
  };
  const lbl = (s) => (UI_EN && EN_LABEL[s]) || s;
  const MONTH_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DOW_EN = { "日": "Sun", "月": "Mon", "火": "Tue", "水": "Wed", "木": "Thu", "金": "Fri", "土": "Sat", "土・日": "Sat–Sun" };
  const dowL = (d) => tx(d, DOW_EN[d] || d);
  const LangToggle = ({ ui, setUi }) => (
    <span className="sw-lang" role="group" aria-label="Language">
      {[["ja", "日本語"], ["en", "EN"]].map(([k, l]) => <button key={k} type="button" className={ui === k ? "on" : ""} aria-pressed={ui === k} onClick={() => setUi(k)}>{l}</button>)}
    </span>
  );

  const CSS = `
.sw{--bg:#F2F5FA;--panel:#fff;--ink:#0B1A33;--ink2:#22324D;--sub:#44526A;--faint:#526074;--line:#E2E8F1;--line2:#EEF2F7;
  --nav:#0A1730;--nav2:#10284D;--blue:#1D4ED8;--blue-d:#1D4ED8;--blue-dd:#1E3A8A;--blue-soft:#EAF1FE;--sky:#38BDF8;
  --ok:#047857;--ok-soft:#E6F6EF;--warn:#92400E;--warn-soft:#FEF3E2;--ng:#B91C1C;--ng-soft:#FDEDED;
  --wine:#9D174D;--wine-soft:#FCEEF4;--hist:#0E7490;--hist-soft:#E4F3F6;
  display:grid;grid-template-columns:252px minmax(0,1fr);min-height:100vh;background:var(--bg);color:var(--ink);font-family:${SANS};font-size:15px;line-height:1.7}
.sw *{box-sizing:border-box}
.sw a{color:var(--blue-d);text-decoration:none;font-weight:600}
.sw a:hover{text-decoration:underline}
.sw button{font-family:inherit}
.sw-side{background:linear-gradient(180deg,var(--nav),var(--nav2));color:#B8C6DE;padding:22px 14px 28px;position:sticky;top:0;height:100vh;overflow-y:auto}
.sw-logo{display:flex;align-items:center;gap:10px;padding:0 8px 18px}
.sw-logo-m{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#3B82F6,#1E3A8A);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(37,99,235,.45);flex-shrink:0}
.sw-logo-t{color:#fff;font-weight:800;font-size:14px;letter-spacing:-.01em;line-height:1.2;white-space:nowrap}
.sw-logo-s{font-size:10.5px;letter-spacing:.16em;color:#7F93B5;font-weight:700}
.sw-meter{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px;margin:0 4px 20px}
.sw-meter-l{display:flex;justify-content:space-between;font-size:11.5px;margin-bottom:8px}
.sw-meter-l b{color:#fff;font-variant-numeric:tabular-nums}
.sw-bar{height:6px;border-radius:99px;background:var(--line2);overflow:hidden}
.sw-side .sw-bar{background:rgba(255,255,255,.1)}
.sw-bar>i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#34D399,#047857);transition:width .3s}
.sw-grp{margin-bottom:14px}
.sw-grp-h{font-size:11px;letter-spacing:.16em;color:#8FA3C7;font-weight:700;padding:0 10px;margin-bottom:4px}
.sw-nav{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:none;padding:8px 10px;border-radius:9px;color:#C9D5EA;font-size:14.5px;cursor:pointer}
.sw-nav:hover{background:rgba(255,255,255,.06);color:#fff}
.sw-nav.on{background:linear-gradient(90deg,rgba(59,130,246,.95),rgba(37,99,235,.85));color:#fff;font-weight:700;box-shadow:0 4px 14px rgba(37,99,235,.35)}
.sw-nav svg{flex-shrink:0;opacity:.85}
.sw-mnav{display:none}
.sw-lang{display:inline-flex;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:2px;gap:2px}
.sw-lang button{border:0;background:none;color:#B8C6DE;font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:99px;cursor:pointer;white-space:nowrap}
.sw-lang button.on{background:#fff;color:var(--nav)}
.sw-side .sw-lang{margin:0 8px 16px}
.sw-mnav-top{display:flex;justify-content:flex-end;margin-bottom:6px}
.sw-main{min-width:0;padding:26px 32px 80px;max-width:1320px;width:100%}
.sw-top{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin-bottom:22px}
.sw-kick{font-size:11px;letter-spacing:.16em;font-weight:800;color:var(--blue)}
.sw-h1{font-size:28px;line-height:1.25;font-weight:800;margin:4px 0 6px;letter-spacing:-.02em}
.sw-lede{color:var(--sub);font-size:14.5px;max-width:820px;margin:0}
.sw-stamp{font-size:12px;color:var(--sub);background:var(--panel);border:1px solid var(--line);border-radius:99px;padding:6px 12px;white-space:nowrap}
.sw-sm{font-size:13.5px;color:var(--sub);line-height:1.65}
.sw-card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px 20px;box-shadow:0 1px 2px rgba(11,26,51,.04);overflow-wrap:anywhere;min-width:0}
.sw-ch{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.sw-ct{font-size:16px;font-weight:800;margin:0;letter-spacing:-.01em}
.sw-sec{margin-bottom:16px}
.sw-g{display:grid;gap:16px;margin-bottom:16px}
.sw-g2{grid-template-columns:repeat(2,minmax(0,1fr))}
.sw-g3{grid-template-columns:repeat(3,minmax(0,1fr))}
.sw-g4{grid-template-columns:repeat(4,minmax(0,1fr))}
.sw-g5{grid-template-columns:repeat(5,minmax(0,1fr))}
.sw-g-7-5{grid-template-columns:minmax(0,7fr) minmax(0,5fr)}
.sw-kpi{display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;cursor:pointer;color:inherit;font:inherit}
.sw-kpi:hover{border-color:#BFD3F6;box-shadow:0 6px 20px rgba(37,99,235,.08)}
.sw-kpi-i{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--blue-soft);color:var(--blue)}
.sw-kpi-n{font-size:28px;font-weight:800;letter-spacing:-.02em;line-height:1.1;font-variant-numeric:tabular-nums}
.sw-kpi-n small{font-size:13px;color:var(--faint);font-weight:600;margin-left:3px}
.sw-kpi-l{font-size:13.5px;color:var(--sub);font-weight:600}
.sw-kpi-s{font-size:12.5px;color:var(--sub)}
.sw-hb{display:grid;grid-template-columns:minmax(0,180px) minmax(0,1fr) auto;gap:10px;align-items:center;padding:5px 0;font-size:13.5px}
.sw-hb-l{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink2)}
.sw-hb-t{height:12px;background:var(--line2);border-radius:0 4px 4px 0;position:relative}
.sw-hb-t i{position:absolute;left:0;top:0;bottom:0;border-radius:0 4px 4px 0}
.sw-hb-v{font-variant-numeric:tabular-nums;font-weight:700;color:var(--ink2);white-space:nowrap;font-size:12px}
.sw-tip{position:fixed;z-index:50;pointer-events:none;background:var(--ink);color:#fff;font-size:12px;padding:6px 10px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.2);max-width:320px;white-space:normal}
.sw-donut{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.sw-em-r{display:grid;grid-template-columns:minmax(0,1fr) 72px 130px;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--line2);font-size:13px}
.sw-em-h{border-top:0;font-size:11px;color:var(--faint);font-weight:800;padding-top:0}
.sw-flow{display:grid;grid-template-columns:repeat(var(--cols,7),minmax(0,1fr));gap:10px 14px}
.sw-node{position:relative;text-align:left;border:1px solid var(--line);background:var(--panel);border-radius:12px;padding:10px;cursor:pointer;color:inherit;min-width:0;font:inherit}
.sw-node:not(:last-child)::after{content:"";position:absolute;right:-12px;top:50%;width:10px;height:2px;border-radius:2px;background:#C8D3E3}
.sw-flow.c4 .sw-node:nth-child(4n)::after{display:none}
.sw-node:hover{border-color:var(--blue)}
.sw-node.gate{border-color:#F3B4B4;background:var(--ng-soft)}
.sw-node-n{font-size:11px;font-weight:800;color:var(--blue)}
.sw-node.gate .sw-node-n{color:var(--ng)}
.sw-node-t{font-weight:700;font-size:12.5px;line-height:1.35;margin:2px 0 6px}
.sw-pill{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:99px;white-space:nowrap}
.sw-auto-自動{background:var(--ok-soft);color:var(--ok)}
.sw-auto-半自動{background:var(--warn-soft);color:var(--warn)}
.sw-auto-人{background:var(--ng-soft);color:var(--ng)}
.sw-st-急成長{background:#E0EAFF;color:#1D4ED8}
.sw-st-伸び始め{background:#E0F2FE;color:#0369A1}
.sw-st-定着{background:#EEF2F7;color:#475569}
.sw-badge{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:700;white-space:nowrap;margin-left:6px;vertical-align:1px}
.sw-badge::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.sw-badge.ok{color:var(--ok)}.sw-badge.no{color:var(--warn)}
.sw-btn{border:1px solid var(--line);background:var(--panel);border-radius:9px;padding:7px 13px;font-size:13.5px;font-weight:700;color:var(--ink);cursor:pointer;white-space:nowrap}
.sw-btn:hover{border-color:var(--blue);color:var(--blue-d)}
.sw-btn.pri{background:var(--blue);border-color:var(--blue);color:#fff}
.sw-btn.pri:hover{background:var(--blue-d);color:#fff}
.sw-todo{display:grid;grid-template-columns:26px 1fr auto;gap:12px;align-items:center;padding:11px 0;border-top:1px solid var(--line2)}
.sw-ch+.sw-todo{border-top:0}
.sw-todo-n{width:26px;height:26px;border-radius:8px;background:var(--blue-soft);color:var(--blue);font-weight:800;font-size:12px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.sw-vow{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.sw-vow>div{display:flex;flex-direction:column;gap:4px;padding:12px 14px;border-radius:12px;background:#F7F9FD;border:1px solid var(--line2)}
.sw-vow b{font-size:13px;line-height:1.4}
.sw-seg{display:inline-flex;background:#E7ECF4;border-radius:10px;padding:3px;gap:2px;flex-wrap:wrap}
.sw-seg button{border:0;background:none;padding:7px 13px;border-radius:8px;font-size:13.5px;font-weight:700;color:var(--sub);cursor:pointer;white-space:nowrap}
.sw-seg button.on{background:var(--panel);color:var(--blue-d);box-shadow:0 1px 3px rgba(11,26,51,.12)}
.sw-tabs{display:flex;gap:22px;border-bottom:1px solid var(--line);margin-bottom:18px;overflow-x:auto;scrollbar-width:none}
.sw-tabs button{border:0;background:none;padding:8px 0 10px;font-size:14.5px;font-weight:700;color:var(--sub);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap}
.sw-tabs button.on{color:var(--blue-d);border-bottom-color:var(--blue)}
.sw-tabs button span{font-size:12px;color:var(--sub);margin-left:4px;font-weight:600}
.sw-input{padding:8px 12px;border:1px solid var(--line);border-radius:10px;font-size:13px;background:var(--panel);color:var(--ink);flex:1 1 220px;min-width:0}
.sw-input:focus{outline:2px solid #BFD3F6;border-color:var(--blue)}
.sw-tbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
.sw-chk{display:inline-flex;gap:6px;align-items:center;font-size:12.5px;color:var(--sub);cursor:pointer}
.sw-tbl{background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden}
.sw-row{display:grid;grid-template-columns:var(--tc,92px minmax(0,1.3fr) minmax(0,1fr) 20px);gap:14px;align-items:center;padding:11px 16px;border:0;border-top:1px solid var(--line2);cursor:pointer;background:none;width:100%;text-align:left;color:inherit;font:inherit}
.sw-row:first-child{border-top:0}
.sw-row:hover{background:#F7F9FD}
.sw-row-h{cursor:default;background:#F7F9FD;font-size:12px;letter-spacing:.06em;color:var(--faint);font-weight:800;padding:9px 16px}
.sw-tag{display:inline-block;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:var(--blue-soft);color:var(--blue-d);white-space:nowrap}
.sw-size{font-weight:800;font-size:13.5px;line-height:1.4;font-variant-numeric:tabular-nums}
.sw-size.muted{font-weight:500;font-size:12.5px;color:var(--faint)}
.sw-chev{color:var(--faint);font-size:15px;text-align:right}
.sw-rowx{padding:6px 16px 16px 122px;background:#FBFCFE;border-top:1px dashed var(--line)}
.sw-kv{display:grid;grid-template-columns:84px 1fr;gap:4px 12px;font-size:13.5px;line-height:1.6;margin:0}
.sw-kv dt{color:var(--sub);font-weight:800}
.sw-kv dd{margin:0;color:var(--ink2)}
.sw-big{font-size:32px;font-weight:800;letter-spacing:-.02em;color:var(--blue-dd);line-height:1.1;font-variant-numeric:tabular-nums}
.sw-field{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:8px 0;border-top:1px solid var(--line2);font-size:13px}
.sw-field input{width:132px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;text-align:right;font-variant-numeric:tabular-nums}
.sw-dots{display:inline-flex;gap:4px;flex-shrink:0}
.sw-dots button{width:26px;height:26px;border-radius:7px;border:1px solid var(--line);background:var(--panel);font-size:12px;font-weight:700;color:var(--faint);cursor:pointer}
.sw-dots button.on{background:var(--blue);border-color:var(--blue);color:#fff}
.sw-heat{width:100%;border-collapse:separate;border-spacing:3px;font-variant-numeric:tabular-nums}
.sw-heat th{font-size:11px;color:var(--sub);font-weight:700;padding:4px 6px;text-align:center;white-space:nowrap}
.sw-heat th.r{text-align:left;font-size:12.5px;color:var(--ink);padding-left:0}
.sw-heat td{height:36px;min-width:40px;text-align:center;font-size:12px;font-weight:700;border-radius:7px;cursor:default}
.sw-heat td.all{box-shadow:inset 0 0 0 2px var(--ink)}
.sw-legend{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--sub);margin-top:10px;flex-wrap:wrap}
.sw-legend i{display:block;width:140px;height:8px;border-radius:99px;background:linear-gradient(90deg,#EFF6FF,#93C5FD,#1D4ED8,#172554)}
.sw-fit{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--sub)}
.sw-fit-b{display:inline-flex;gap:2px;flex-shrink:0}
.sw-fit-b i{width:14px;height:6px;border-radius:2px;background:var(--line)}
.sw-det{padding-top:12px;border-top:1px dashed var(--line);display:grid;gap:10px}
.sw-det h4{font-size:12px;letter-spacing:.06em;color:var(--sub);margin:0 0 2px;font-weight:800}
.sw-det p,.sw-det li{font-size:14px;margin:0;line-height:1.7;color:var(--ink2)}
.sw-det ul{margin:0;padding-left:18px}
.sw-mcard{display:flex;flex-direction:column;gap:10px}
.sw-mrate{font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums}
.sw-acc{display:flex;flex-direction:column;gap:6px;padding:14px 16px 14px 18px;border-radius:14px;background:var(--panel);border:1px solid var(--line);overflow-wrap:anywhere;position:relative}
.sw-acc::before{content:"";position:absolute;left:0;top:14px;bottom:14px;width:3px;border-radius:0 3px 3px 0;background:var(--c)}
.sw-acc-h{display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.sw-acc-u{font-weight:800;font-size:13.5px;color:var(--ink)!important}
.sw-score{display:inline-flex;gap:2px;flex-shrink:0}
.sw-score i{width:9px;height:9px;border-radius:2px;background:var(--line)}
.sw-score i.on{background:var(--c)}
.sw-role{font-size:11px;font-weight:800;color:var(--c)}
.sw-plans{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);gap:16px;align-items:start}
.sw-eplist{background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden}
.sw-ep{display:grid;grid-template-columns:56px 1fr;gap:10px;width:100%;text-align:left;border:0;border-top:1px solid var(--line2);background:none;padding:11px 14px;cursor:pointer;color:inherit;font:inherit;border-left:3px solid transparent}
.sw-ep:first-child{border-top:0}
.sw-ep:hover{background:#F7F9FD}
.sw-ep.on{background:var(--k-soft);border-left-color:var(--k)}
.sw-ep-y{font-size:14px;font-weight:800;color:var(--k);line-height:1.4;font-variant-numeric:tabular-nums}
.sw-ep-t{font-weight:700;font-size:14.5px;line-height:1.45;display:block;color:var(--ink)}
.sw-ep-p{font-size:12.5px;color:var(--sub);margin-top:3px;display:block}
.sw-epdetail{position:sticky;top:16px}
.sw-eplist-bar{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 14px;border-bottom:1px solid var(--line)}
.sw-back{display:none}
.sw-hook{font-size:18px;font-weight:700;line-height:1.6;border-left:3px solid var(--k);padding:2px 0 2px 14px;margin:14px 0 16px;color:var(--ink)}
.sw-tl{display:grid;grid-template-columns:1fr 1.15fr 1fr;margin:0 0 16px;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.sw-tl>div{padding:12px 14px;border-right:1px solid var(--line)}
.sw-tl>div:last-child{border-right:0}
.sw-tl>div.m{background:var(--k-soft)}
.sw-tl h5{font-size:12px;letter-spacing:.1em;color:var(--sub);margin:0 0 4px}
.sw-tl>div.m h5{color:var(--k)}
.sw-tl p{margin:0;font-size:14.5px;line-height:1.75}
.sw-fact{display:grid;grid-template-columns:20px 1fr;gap:8px;padding:10px 0;border-top:1px solid var(--line2);font-size:14.5px;line-height:1.75;cursor:pointer}
.sw-fact input{margin-top:6px;accent-color:var(--ok);width:16px;height:16px}
.sw-fnum{display:inline-block;min-width:20px;font-size:12.5px;color:var(--sub);font-variant-numeric:tabular-nums}
.sw-note{border-radius:10px;padding:11px 15px;font-size:14px;line-height:1.75}
.sw-note.warn{background:var(--warn-soft);color:#7A3E06}
.sw-note.ng{background:var(--ng-soft);color:#7F1D1D}
.sw-note.info{background:var(--blue-soft);color:#1E3A8A}
.sw-note b{font-weight:800}
.sw-story>div{display:grid;grid-template-columns:120px 1fr;gap:12px;padding:10px 0;border-top:1px solid var(--line2);font-size:14.5px;line-height:1.75}
.sw-story>div>span:first-child{font-size:12.5px;font-weight:800;color:var(--k)}
.sw-steps{position:relative;padding-left:46px}
.sw-steps::before{content:"";position:absolute;left:15px;top:10px;bottom:10px;width:2px;background:var(--line)}
.sw-step{position:relative;margin-bottom:12px}
.sw-step-n{position:absolute;left:-46px;top:14px;width:32px;height:32px;border-radius:10px;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;box-shadow:0 0 0 4px var(--bg)}
.sw-step-n.gate{background:var(--ng)}
.sw-chips{display:flex;flex-wrap:wrap;gap:6px}
.sw-chip{font-size:12.5px;padding:3px 10px;border-radius:99px;background:#EAEFF7;color:#26344F}
.sw-tool{display:grid;grid-template-columns:minmax(0,200px) 1fr;gap:4px 14px;padding:9px 0;border-top:1px solid var(--line2);font-size:14px;line-height:1.7}
.sw-gate-i{display:grid;grid-template-columns:22px 1fr;gap:10px;padding:11px 0;border-top:1px solid var(--line2)}
.sw-gate-i input{margin-top:4px;accent-color:var(--ok);width:16px;height:16px}
.sw-tier{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:7px;font-weight:800;font-size:12px;color:#fff;flex-shrink:0}
.sw-src{display:flex;gap:12px;padding:10px 0;border-top:1px solid var(--line2)}
.sw-src:first-child,.sw-rule:first-child{border-top:0}
.sw-rule{padding:11px 0;border-top:1px solid var(--line2)}
.sw-case{display:flex;flex-direction:column;gap:6px}
.sw-epchip{border:1px solid var(--line);background:#fff;border-left:3px solid var(--c);border-radius:8px;padding:3px 9px;font-size:12px;font-weight:700;color:var(--ink2);cursor:pointer;text-align:left;font-family:inherit}
.sw-epchip:hover{border-color:var(--c)}
.sw-select{padding:8px 10px;border:1px solid var(--line);border-radius:10px;font-size:13.5px;font-weight:700;background:var(--panel);color:var(--ink2);font-family:inherit;max-width:100%}
.sw-fmt-id{display:inline-block;font-size:11px;font-weight:800;color:#fff;background:var(--blue);border-radius:6px;padding:1px 6px;margin-right:8px;vertical-align:2px}
.sw-casemini{display:flex;flex-direction:column;gap:2px;padding:8px 0;border-top:1px solid var(--line2)}
.sw-fmtbox{border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin-bottom:8px;background:#F7F9FD}
.sw-scores{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 18px;padding:12px 14px;border:1px solid var(--line2);border-radius:12px;margin-bottom:6px}
.sw-scores>div{display:grid;grid-template-columns:110px 1fr 24px;gap:8px;align-items:center}
.sw-scores b{font-size:12.5px;text-align:right;font-variant-numeric:tabular-nums}
.sw-mx{display:grid;grid-template-columns:120px repeat(3,minmax(0,1fr));gap:4px}
.sw-mx-h{font-size:11.5px;font-weight:800;color:var(--sub);text-align:center;padding:4px}
.sw-mx-r{font-size:12px;font-weight:800;color:var(--ink2);display:flex;align-items:center;padding:6px 4px}
.sw-mx-c{border-radius:10px;padding:8px;min-height:64px}
.sw-mx-t{font-size:11px;font-weight:800;margin-bottom:6px}
.sw-script{border:1px solid var(--line);border-radius:12px;overflow:hidden}
.sw-script>div{display:grid;grid-template-columns:76px 1fr;gap:12px;padding:9px 14px;border-top:1px solid var(--line2);font-size:15px;line-height:1.8}
.sw-script>div:first-child{border-top:0}
.sw-script-t{font-size:12px;font-weight:800;color:var(--k);padding-top:3px}
.sw-fref{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 4px;margin-left:3px;border-radius:5px;font-size:11px;font-weight:800;background:var(--warn-soft);color:var(--warn);vertical-align:2px;cursor:help}
.sw-fref.ok{background:var(--ok-soft);color:var(--ok)}
.sw-aud{display:inline-block;margin-left:5px;padding:0 6px;border-radius:5px;font-size:11px;font-weight:700;background:var(--line2);color:var(--ink2);vertical-align:2px;cursor:help}
.sw-tier-s{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:4px;font-size:11px;font-weight:800;color:#fff;margin-right:6px;vertical-align:1px;cursor:help}
.sw-up{display:inline-block;font-size:11.5px;font-weight:700;color:var(--ok);background:var(--ok-soft);border-radius:5px;padding:0 6px;margin-left:6px}
.sw-up.warn{color:var(--warn);background:var(--warn-soft)}
.sw-stack{display:flex;height:14px;border-radius:4px;overflow:hidden;background:var(--line2);gap:2px}
.sw-stack i{display:block;height:100%}
.sw-stack-r{display:grid;grid-template-columns:84px 1fr;gap:8px;align-items:start;padding:6px 0;border-top:1px solid var(--line2)}
.sw-foot{margin-top:28px;padding-top:14px;border-top:1px solid var(--line);font-size:12px;color:var(--faint)}
.sw-fold{border:1px solid var(--line);border-radius:14px;background:var(--panel);margin-bottom:12px;overflow:hidden;min-width:0}
.sw-fold-h{display:flex;align-items:center;gap:10px;width:100%;border:0;background:#F6F8FC;padding:12px 16px;cursor:pointer;text-align:left;color:var(--ink);font:inherit}
.sw-fold-h:hover{background:#ECF2FB}
.sw-fold-h:focus-visible,.sw-grpl-h:focus-visible{outline:2px solid var(--blue);outline-offset:-2px}
.sw-fold.open>.sw-fold-h{border-bottom:1px solid var(--line2)}
.sw-fold-c{width:8px;height:8px;border-right:2px solid var(--sub);border-bottom:2px solid var(--sub);transform:rotate(-45deg);transition:transform .15s;flex-shrink:0;margin:0 3px 0 1px}
.sw-fold.open>.sw-fold-h .sw-fold-c,.sw-grpl.open>.sw-grpl-h .sw-fold-c{transform:rotate(45deg)}
.sw-fold-n{width:26px;height:26px;border-radius:8px;background:var(--k,var(--blue));color:#fff;font-size:13px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.sw-fold-t{font-weight:800;font-size:16px;flex:1;min-width:0;line-height:1.4}
.sw-fold-m{font-size:13px;color:var(--sub);font-weight:700;text-align:right}
.sw-fold-b{padding:14px 16px 16px}
.sw-fold.gate{border-color:#F3B4B4}.sw-fold.gate>.sw-fold-h{background:var(--ng-soft)}
.sw-fold.wine>.sw-fold-h{box-shadow:inset 4px 0 0 var(--wine)}.sw-fold.hist>.sw-fold-h{box-shadow:inset 4px 0 0 var(--hist)}
.sw-foldall{display:inline-flex;gap:6px;flex-wrap:wrap}
.sw-foldall .sw-btn{padding:5px 11px;font-size:12.5px}
.sw-grpl-h{display:flex;align-items:center;gap:10px;width:100%;border:0;border-top:1px solid var(--line);background:#F3F6FB;padding:11px 14px;cursor:pointer;text-align:left;font:inherit;color:var(--ink);box-shadow:inset 4px 0 0 var(--gk)}
.sw-grpl:first-child>.sw-grpl-h{border-top:0}
.sw-grpl-h:hover{background:#E9EFF9}
.sw-grpl-t{flex:1;font-weight:800;font-size:14.5px;min-width:0}
.sw-grpl-m{font-size:12.5px;color:var(--sub);font-weight:700;white-space:nowrap}
.sw-epd{padding:22px 24px}
.sw-epsum{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 2px}
.sw-epsum-i{display:flex;flex-direction:column;gap:1px;padding:7px 12px;border:1px solid var(--line);border-radius:10px;background:#F9FBFE;min-width:0}
.sw-epsum-i small{font-size:11.5px;color:var(--sub);font-weight:800;letter-spacing:.04em}
.sw-epsum-i b{font-size:14px;color:var(--ink);line-height:1.35}
.sw-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px;vertical-align:1px;box-shadow:0 0 0 1px rgba(11,26,51,.15)}
.sw-epd-bar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 10px}
.sw-sub-h{font-size:13px;font-weight:800;color:var(--ink2);margin:14px 0 6px;letter-spacing:.02em}
.sw-sub-h:first-child{margin-top:0}
.sw-card>.sw-ch{cursor:pointer}
.sw-card>.sw-ch>.sw-ct::before{content:"";display:inline-block;width:7px;height:7px;border-right:2px solid var(--faint);border-bottom:2px solid var(--faint);transform:rotate(45deg);margin:0 10px 3px 2px;transition:transform .15s}
.sw-card.sw-shut>.sw-ch>.sw-ct::before{transform:rotate(-45deg);margin-bottom:1px}
.sw-card.sw-shut>:not(.sw-ch){display:none!important}
.sw-card.sw-shut>.sw-ch{margin-bottom:0}
.sw-neta{border:1px solid var(--line);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:7px;background:var(--panel);min-width:0}
.sw-neta.on{border-color:var(--blue);box-shadow:0 0 0 2px var(--blue-soft)}
.sw-neta-h{display:flex;align-items:baseline;gap:10px}
.sw-neta-h b{flex:1;font-size:15.5px;line-height:1.4;min-width:0}
.sw-neta-h .sw-btn{flex-shrink:0;padding:4px 10px;font-size:12.5px}
.sw-neta-y{font-size:13.5px;font-weight:800;color:var(--blue-d);font-variant-numeric:tabular-nums;flex-shrink:0}
.sw-neta-q{font-weight:700;font-size:15px;color:var(--ink);border-left:3px solid var(--sky);padding-left:10px;line-height:1.6}
.sw-neta p{margin:0;font-size:14px;color:var(--ink2);line-height:1.7}
.sw-st{border-radius:16px;background:linear-gradient(135deg,#0B1A33,#1E3A8A);color:#fff;padding:18px 20px;margin:14px 0 14px;position:relative;overflow:hidden}
.sw-st::after{content:"";position:absolute;right:-40px;top:-40px;width:160px;height:160px;border-radius:50%;background:rgba(56,189,248,.12)}
.sw-st-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.sw-st-when{font-size:13px;font-weight:800;letter-spacing:.06em;color:#BAE6FD}
.sw-st-type{font-size:12px;font-weight:800;padding:2px 9px;border-radius:99px;background:rgba(255,255,255,.14);color:#fff;white-space:nowrap}
.sw-st-hl{font-size:20px;font-weight:800;line-height:1.55;margin:8px 0 6px;letter-spacing:-.01em;position:relative;z-index:1}
.sw-st-who{font-size:13.5px;color:#DBEAFE}
.sw-st-who b{color:#fff}
.sw-st-flow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;position:relative;z-index:1}
.sw-st-flow>div{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:9px 11px}
.sw-st-flow>div.m{background:rgba(56,189,248,.22);border-color:rgba(125,211,252,.5)}
.sw-st-flow h5{margin:0 0 3px;font-size:11.5px;letter-spacing:.08em;color:#BAE6FD}
.sw-st-flow p{margin:0;font-size:13.5px;line-height:1.7;color:#F1F5F9}
.sw-st-if{margin-top:10px;font-size:14px;color:#E0F2FE;font-weight:700;position:relative;z-index:1}
.sw-st .sw-fref{background:rgba(255,255,255,.18);color:#fff}
.sw-st .sw-fref.ok{background:#34D399;color:#053B2C}
.sw-stars{color:#F59E0B;letter-spacing:1px;font-size:12px;white-space:nowrap}
.sw-ep-h{display:block;font-size:13px;color:var(--ink2);line-height:1.55;margin-top:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sw-cal{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:12px}
.sw-cal-m{border:1px solid var(--line);border-radius:14px;background:var(--panel);overflow:hidden}
.sw-cal-m.now{border-color:var(--blue);box-shadow:0 0 0 2px var(--blue-soft)}
.sw-cal-h{display:flex;justify-content:space-between;align-items:baseline;padding:10px 14px;background:#F3F6FB;font-weight:800;font-size:15px}
.sw-cal-r{display:grid;grid-template-columns:44px minmax(0,1fr);gap:8px;width:100%;text-align:left;border:0;border-top:1px solid var(--line2);background:none;padding:8px 14px;cursor:pointer;font:inherit;color:inherit}
.sw-cal-r:hover{background:#F7F9FD}
.sw-cal-d{font-weight:800;color:var(--blue-d);font-variant-numeric:tabular-nums;font-size:14px}
.sw-cal-r.today .sw-cal-d{color:#fff;background:var(--blue);border-radius:6px;text-align:center}
.sw-neta-m{font-size:13.5px;color:var(--ink2);background:#F3F6FB;border-radius:8px;padding:6px 10px}
.sw-lyr{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:800;padding:2px 8px;border-radius:99px;white-space:nowrap}
.sw-lyr.l{background:#FEF3C7;color:#92400E}.sw-lyr.c{background:#E0E7FF;color:#3730A3}
.sw-slides{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.sw-slide{border:1px solid var(--line);border-radius:10px;padding:10px;background:#FFFDF7;min-width:0;display:flex;flex-direction:column;gap:4px}
.sw-slide small{font-size:11px;font-weight:800;color:#92400E}
.sw-slide b{font-size:14px;line-height:1.45}
.sw-slide span{font-size:13px;line-height:1.6;color:var(--ink2)}
.sw-bighook{font-size:19px;font-weight:800;line-height:1.5;padding:12px 14px;border-radius:12px;background:#FFFBEB;border:1px solid #FDE68A;margin-bottom:10px}
.sw-one{font-size:15px;font-weight:700;color:#92400E;margin:0 0 12px}
.sw-outl>div{display:grid;grid-template-columns:96px minmax(0,1fr);gap:12px;padding:10px 0;border-top:1px solid var(--line2)}
.sw-outl>div:first-child{border-top:0}
.sw-outl-t{font-size:12.5px;font-weight:800;color:#3730A3;font-variant-numeric:tabular-nums}
.sw-outl ul{margin:4px 0 0;padding-left:18px;font-size:14px;line-height:1.7;color:var(--ink2)}
.sw-persona{border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--panel);border-top:4px solid var(--c);display:flex;flex-direction:column;gap:6px;min-width:0}
.sw-persona h4{margin:0;font-size:16px}
.sw-funnel{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.sw-funnel>div{border-radius:12px;padding:12px;background:#F3F6FB;position:relative;min-width:0}
.sw-funnel>div b{display:block;font-size:15px}
.sw-arc{border-left:4px solid var(--c);padding:4px 0 4px 12px;margin-bottom:14px}
.sw-arc-eps{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:8px}
.sw-arc-eps i{color:var(--faint);font-style:normal}
.sw-wk{display:grid;grid-template-columns:110px repeat(2,minmax(0,1fr)) minmax(0,.9fr);gap:10px;padding:10px 0;border-top:1px solid var(--line2);align-items:start}
.sw-wk:first-child{border-top:0}
.sw-wk-h{font-size:12px;color:var(--sub);font-weight:800}
.sw-wk .sw-epchip{display:inline-block;margin:2px 4px 2px 0}
.sw-ph{border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:10px;background:var(--panel)}
.sw-ph h4{margin:0 0 4px;font-size:15.5px}
.sw-ph ul{margin:6px 0;padding-left:18px;font-size:14px;line-height:1.7}
.sw-m1-sum{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:12px}
.sw-m1-sum>div{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--panel);min-width:0}
.sw-m1-sched>div{display:grid;grid-template-columns:96px 150px minmax(0,1fr) 28px;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--line2);font-size:14px}
.sw-m1-sched>div:first-child{border-top:0}
.sw-m1-sched .d{font-weight:800;font-variant-numeric:tabular-nums}
.sw-m1-sched .o{opacity:.55}
.sw-m1-form{display:inline-block;font-size:12px;font-weight:800;padding:2px 8px;border-radius:99px;background:var(--k-soft,#EAEFF7);color:var(--k,#26344F);white-space:nowrap}
.sw-m1-rows{border:1px solid var(--line);border-radius:12px;overflow:hidden}
.sw-m1-rows>div{display:grid;grid-template-columns:86px minmax(0,1.7fr) minmax(0,.8fr) minmax(0,1fr);gap:12px;padding:9px 14px;border-top:1px solid var(--line2);font-size:14.5px;line-height:1.75}
.sw-m1-rows>div:first-child{border-top:0}
.sw-m1-rows>.hd{background:#F5F7FB;font-size:12px;font-weight:800;color:var(--sub);line-height:1.4}
.sw-m1-rows>.ch{display:block;background:#F8FAFD;font-size:13px;font-weight:800;color:var(--k,#26344F);padding:6px 14px}
.sw-m1-t{font-size:12px;font-weight:800;color:var(--k,#26344F);font-variant-numeric:tabular-nums;padding-top:3px}
.sw-m1-tel{display:inline-block;font-size:13px;font-weight:800;background:#FFFBEB;border:1px solid #FDE68A;border-radius:6px;padding:1px 7px;color:#78350F}
.sw-m1-vis{font-size:12.5px;color:var(--ink2);line-height:1.6}
.sw-m1-vis i{font-style:normal;color:var(--sub)}
.sw-m1-cap{white-space:pre-wrap;font-size:13px;line-height:1.7;background:#F8FAFD;border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin:6px 0 0;font-family:inherit;overflow-wrap:anywhere}
.sw-m1-chk{display:grid;grid-template-columns:24px minmax(0,1fr);gap:8px;padding:7px 0;border-top:1px solid var(--line2);font-size:14px;line-height:1.65}
.sw-m1-chk:first-child{border-top:0}
.sw-vtag{display:inline-block;font-size:12px;font-weight:800;border-radius:6px;padding:0 6px;margin:2px 4px 0 0}.sw-vtag.ok{background:var(--ok-soft);color:var(--ok)}.sw-vtag.part{background:var(--warn-soft);color:#7A3E06}.sw-vtag.ng{background:var(--ng-soft);color:#7F1D1D}
.sw-vq{font-size:12.5px;color:var(--ink2);border-left:3px solid var(--line);padding:2px 0 2px 8px;margin:4px 0 0;overflow-wrap:anywhere}
.sw-m1-why{display:inline-block;font-size:12px;font-weight:800;color:#7A3E06;background:var(--warn-soft);border-radius:6px;padding:0 6px;margin:2px 4px 0 0}
@media (max-width:900px){.sw-m1-sum{grid-template-columns:1fr}.sw-m1-rows>div{grid-template-columns:1fr;gap:3px}.sw-m1-rows>.hd{display:none}.sw-m1-sched>div{grid-template-columns:76px minmax(0,1fr) 28px}.sw-m1-sched .f{grid-column:2}.sw-m1-sched .tt{grid-column:1/-1}}
@media (max-width:1180px){.sw-slides{grid-template-columns:repeat(2,minmax(0,1fr))}.sw-funnel{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:1180px){.sw-g5{grid-template-columns:repeat(3,minmax(0,1fr))}.sw-g4{grid-template-columns:repeat(2,minmax(0,1fr))}.sw-g3{grid-template-columns:repeat(2,minmax(0,1fr))}.sw-g-7-5{grid-template-columns:1fr}.sw-vow{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:900px){
  .sw{grid-template-columns:1fr}
  .sw-side{display:none}
  .sw-main{padding:0 16px 72px}
  .sw-mnav{display:block;position:sticky;top:0;z-index:5;background:var(--nav);margin:0 -16px 18px;padding:10px 12px 8px}
  .sw-mnav-s{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px}
  .sw-mnav-s button{border:0;background:rgba(255,255,255,.07);border-radius:8px;padding:7px 2px;font-size:12px;font-weight:700;color:#B8C6DE;cursor:pointer;white-space:nowrap}
  .sw-mnav-s button.on{background:var(--blue);color:#fff}
  .sw-mnav-i{display:flex;gap:16px;overflow-x:auto;scrollbar-width:none;padding-top:8px}
  .sw-mnav-i button{flex:0 0 auto;border:0;background:none;padding:2px 0 4px;font-size:12.5px;color:#93A6C6;border-bottom:2px solid transparent;cursor:pointer}
  .sw-mnav-i button.on{color:#fff;font-weight:800;border-bottom-color:var(--sky)}
  .sw-h1{font-size:22px}
  .sw-stamp{display:none}
  .sw-g2,.sw-g3,.sw-g4,.sw-vow{grid-template-columns:1fr}
  .sw-g5{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .sw-g5>:last-child{grid-column:1/-1}
  .sw-kpi-n{font-size:24px}
  .sw-hb{grid-template-columns:minmax(0,104px) minmax(0,1fr) auto;gap:8px}
  .sw-em-r{grid-template-columns:minmax(0,1fr) 64px;}
  .sw-em-r>:last-child{grid-column:1/-1}
  .sw-row{grid-template-columns:minmax(0,1fr) 18px!important;gap:2px 10px}
  .sw-row>:first-child{grid-column:1/-1}
  .sw-row .sw-chev{grid-row:2;grid-column:2}
  .sw-row-h{display:none}
  .sw-rowx{padding:6px 16px 16px}
  .sw-plans{grid-template-columns:1fr}
  .sw-plans.has-sel .sw-eplist{display:none}
  .sw-plans:not(.has-sel) .sw-epdetail{display:none}
  .sw-epdetail{position:static}
  .sw-back{display:inline-block;margin-bottom:12px}
  .sw-tl{grid-template-columns:1fr}
  .sw-tl>div{border-right:0;border-bottom:1px solid var(--line)}
  .sw-tl>div:last-child{border-bottom:0}
  .sw-story>div{grid-template-columns:1fr;gap:2px}
  .sw-tool,.sw-kv{grid-template-columns:1fr}
  .sw-heat{border-spacing:1.5px}
  .sw-heat td{height:32px;min-width:0;font-size:10.5px;border-radius:4px;padding:0}
  .sw-heat th{padding:4px 0;font-size:10px}
  .sw-heat th.r{font-size:11px;padding-right:4px}
  .sw-flow,.sw-flow.c4{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .sw-node::after{display:none}
  .sw-field{flex-wrap:wrap}
  .sw-scores{grid-template-columns:1fr}
  .sw-epd{padding:16px 14px}
  .sw-slides,.sw-funnel{grid-template-columns:1fr}
  .sw-outl>div{grid-template-columns:1fr;gap:2px}
  .sw-wk{grid-template-columns:1fr;gap:4px}
  .sw-st{padding:14px}
  .sw-st-hl{font-size:17px}
  .sw-st-flow{grid-template-columns:1fr}
  .sw-epsum-i{flex:1 1 40%}
  .sw-fold-h{padding:11px 12px}
  .sw-fold-b{padding:12px}
  .sw-fold-m{display:none}
  .sw-script>div{grid-template-columns:1fr;gap:2px}
  .sw-stack-r{grid-template-columns:1fr}
  .sw-scores>div{grid-template-columns:96px 1fr 24px}
  .sw-mx{grid-template-columns:64px repeat(3,minmax(0,1fr))}
  .sw-mx-r{font-size:10.5px}
  .sw-mx-c{padding:6px;min-height:56px}
  .sw-mx .sw-chip{font-size:10.5px;padding:1px 6px}
}`;

  // ---------- アイコン（線画） ----------
  const ICONS = {
    dash: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
    market: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    media: "M4 6h16v12H4zM10 9l5 3-5 3z",
    users: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M22 19v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8",
    plan: "M4 4h12l4 4v12H4zM8 12h8M8 16h5",
    video: "M3 6h12v12H3zM15 10l6-3v10l-6-3",
    flow: "M5 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4M19 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4M5 8v4a4 4 0 0 0 4 4h8",
    shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5",
    book: "M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM4 19V5",
    scale: "M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z",
    check: "M4 12l5 5L20 6",
    tool: "M14 7l3-3 3 3-3 3M4 20l9-9M13 4l7 7M3 21l4-1-3-3z",
    plug: "M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5",
    bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3",
    target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2",
  };
  const Icon = ({ n, s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[n]} /></svg>
  );

  const NAV = [
    // 項目は [画面, 日本語, アイコン, 英語]
    { n: "00", label: "ダッシュボード", short: "ホーム", en: "Dashboard", shortEn: "Home", items: [["home", "ダッシュボード", "dash", "Dashboard"]] },
    { n: "01", label: "調べる", short: "調べる", en: "Research", shortEn: "Research", items: [["market", "市場", "market", "Markets"], ["media", "媒体", "media", "Platforms"], ["accounts", "参考アカウント", "users", "Reference accounts"]] },
    { n: "02", label: "企画する", short: "企画", en: "Plan", shortEn: "Plan", items: [["planx", "発信プラン", "target", "Publishing plan"], ["plans", "企画帳", "plan", "Episode plans"], ["neta", "ネタ帳", "bulb", "Idea bank"]] },
    { n: "03", label: "作る", short: "作る", en: "Make", shortEn: "Make", items: [["m1", "第1か月の台本", "plan", "Month 1 scripts"], ["video", "AI動画の手順", "video", "AI video steps"], ["pipeline", "自動化", "flow", "Automation"], ["tools", "ツール比較", "tool", "Tool comparison"], ["connect", "MCP・連携", "plug", "MCP & integrations"]] },
    { n: "04", label: "確かめる", short: "確かめる", en: "Check", shortEn: "Check", items: [["gate", "事実確認の関門", "shield", "Fact-check gate"], ["quality", "品質レポート", "check", "Quality report"], ["sources", "情報源", "book", "Sources"], ["rules", "規制・リスク", "scale", "Rules & risks"]] },
  ];
  const groupOf = (pg) => NAV.find((g) => g.items.some(([k]) => k === pg)) || NAV[0];

  // ---------- 小さな部品 ----------
  const Ext = ({ url, children }) => url ? <a href={url} target="_blank" rel="noopener noreferrer">{children || tx("出典", "Source")}</a> : null;
  const Badge = ({ v }) => (
    <span className={"sw-badge " + (v ? "ok" : "no")} title={v ? tx("出典の本文または公式ページで確認した", "Confirmed in the source text or on the official page") : tx("検索結果の要約でのみ確認。使う前に原文で確かめる", "Confirmed only from search-result summaries. Check the original before use")}>{v ? tx("確認済み", "Verified") : tx("要原文確認", "Check original")}</span>
  );
  const Auto = ({ a }) => <span className={"sw-pill sw-auto-" + a}>{a === "人" ? tx("人が行う", "By a person") : lbl(a)}</span>;
  const Seg = ({ value, onChange, options }) => (
    <div className="sw-seg" role="tablist">
      {options.map(([k, l]) => <button key={k} role="tab" aria-selected={value === k} className={value === k ? "on" : ""} onClick={() => onChange(k)}>{l}</button>)}
    </div>
  );
  const Tabs = ({ value, onChange, options }) => (
    <div className="sw-tabs" role="tablist">
      {options.map(([k, l, n]) => <button key={k} role="tab" aria-selected={value === k} className={value === k ? "on" : ""} onClick={() => onChange(k)}>{l}{n != null ? <span>{n}</span> : null}</button>)}
    </div>
  );
  const Head = ({ kick, title, lede, right }) => (
    <header className="sw-top">
      <div><div className="sw-kick">{kick}</div><h1 className="sw-h1">{title}</h1>{lede ? <p className="sw-lede">{lede}</p> : null}</div>
      {right || null}
    </header>
  );

  // ---------- 開閉できる区画 ----------
  // 開閉の状態は端末に覚える。「すべて開く／閉じる」は FoldSig で同じ画面の区画にまとめて伝える。
  const FOLD_KEY = "sw:fold:v1";
  const FoldSig = createContext(null);
  const useFoldSig = () => { const [sig, setSig] = useState({ open: true, n: 0 }); return [sig, (v) => setSig((x) => ({ open: v, n: x.n + 1 }))]; };
  const remember = (id, v) => { if (!id) return; const m = load(FOLD_KEY); m[id] = v ? 1 : 0; save(FOLD_KEY, m); };
  const recalled = (id, def) => { const m = load(FOLD_KEY); return id && Object.prototype.hasOwnProperty.call(m, id) ? !!m[id] : def; };
  function Fold({ id, n, title, meta, def = true, tone, open: cOpen, onToggle, children }) {
    const sig = useContext(FoldSig);
    const ctl = cOpen !== undefined;
    const [u, setU] = useState(() => recalled(id, def));
    useEffect(() => { if (!ctl && sig && sig.n) { setU(sig.open); remember(id, sig.open); } }, [sig && sig.n]);
    const open = ctl ? cOpen : u;
    const flip = () => { if (ctl) { if (onToggle) onToggle(!open); return; } setU(!open); remember(id, !open); };
    return (
      <section className={"sw-fold" + (open ? " open" : "") + (tone ? " " + tone : "")}>
        <button type="button" className="sw-fold-h" onClick={flip} aria-expanded={open}>
          <span className="sw-fold-c" aria-hidden="true" />
          {n != null ? <span className="sw-fold-n">{n}</span> : null}
          <span className="sw-fold-t">{title}</span>
          {meta != null && meta !== "" ? <span className="sw-fold-m">{meta}</span> : null}
        </button>
        {open ? <div className="sw-fold-b">{children}</div> : null}
      </section>
    );
  }
  const FoldAll = ({ onSet }) => <span className="sw-foldall"><button type="button" className="sw-btn" onClick={() => onSet(true)}>{tx("すべて開く", "Expand all")}</button><button type="button" className="sw-btn" onClick={() => onSet(false)}>{tx("すべて閉じる", "Collapse all")}</button></span>;
  const splitTitle = (t) => { const m = String(t || "").split(/：|――/); return [m[0], m.slice(1).join("――")]; };
  const usd = (bn) => { if (UI_EN) return bn >= 1000 ? `$${+(bn / 1000).toFixed(2)}T` : bn >= 1 ? `$${+bn.toFixed(1)}B` : `$${Math.round(bn * 1000)}M`; const oku = bn * 10; if (oku >= 10000 && oku % 10000 === 0) return `${(oku / 10000).toLocaleString()}兆ドル`; return oku >= 100 ? `${Math.round(oku).toLocaleString()}億ドル` : `${(Math.round(oku * 10) / 10).toLocaleString()}億ドル`; };
  const useTip = () => {
    const [tip, setTip] = useState(null);
    const el = tip ? <div className="sw-tip" style={{ left: Math.max(8, Math.min(tip.x + 14, (typeof window !== "undefined" ? window.innerWidth : 1200) - 330)), top: tip.y + 14 }}>{tip.t}</div> : null;
    return [el, (e, t) => setTip({ x: e.clientX, y: e.clientY, t }), () => setTip(null)];
  };

  // 事実の確認状況（調査時点の verified ＋ この端末で付けたチェック）
  const FACTS = [];
  ["wine", "history"].forEach((kind) => ((SW_DATA[kind] || {}).episodes || []).forEach((e) => (e.facts || []).forEach((f, j) => FACTS.push({ kind, key: `${kind}/${e.id}/${j}`, v: f.verified }))));

  // 世界の市場：同じ市場の複数推計は1本の棒に「幅」として表す
  const GM = SW_DATA.global_markets || [];
  const GM_BARS = (() => {
    const g = {};
    GM.filter((r) => typeof r.usd_bn === "number" && r.usd_bn > 0 && r.url).forEach((r) => {
      const base = String(r.name).split("（")[0];
      const k = base + "｜" + r.region;
      (g[k] = g[k] || { key: k, name: base, cat: r.cat, region: r.region, rows: [] }).rows.push(r);
    });
    return Object.values(g).map((x) => ({ ...x, lo: Math.min(...x.rows.map((r) => r.usd_bn)), hi: Math.max(...x.rows.map((r) => r.usd_bn)) })).sort((a, b) => b.hi - a.hi);
  })();
  function RangeBars({ rows, color = "var(--blue)", onTip, offTip }) {
    const top = Math.max(1, ...rows.map((r) => r.hi));
    return (
      <div onMouseLeave={offTip}>
        {rows.map((r) => (
          <div key={r.key} className="sw-hb" onMouseMove={(e) => onTip(e, tx(`${r.name}（${r.region}）：${r.rows.map((x) => `${x.size}・${x.year}・${x.source}`).join(" ／ ")}`, `${r.name} (${lbl(r.region)}): ${r.rows.map((x) => `${x.size} · ${x.year} · ${x.source}`).join(" / ")}`))}>
            <span className="sw-hb-l" title={r.name}>{r.name}{r.region !== "世界" ? tx(`（${r.region}）`, ` (${lbl(r.region)})`) : ""}</span>
            <span className="sw-hb-t">
              {r.hi > r.lo ? <i style={{ width: `${r.hi / top * 100}%`, background: color, opacity: .25 }} /> : null}
              <i style={{ width: `${Math.max(.8, r.lo / top * 100)}%`, background: color }} />
            </span>
            <span className="sw-hb-v">{r.hi > r.lo ? `${usd(r.lo)}${tx("〜", "–")}${usd(r.hi)}` : usd(r.lo)}</span>
          </div>
        ))}
      </div>
    );
  }
  function Donut({ done, total, size = 104 }) {
    const r = 42, c = 2 * Math.PI * r, p = total ? done / total : 0;
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`${done} / ${total}`} style={{ flexShrink: 0 }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E2E8F1" strokeWidth="10" />
        {p > 0 ? <circle cx="50" cy="50" r={r} fill="none" stroke="#047857" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * p} ${c}`} transform="rotate(-90 50 50)" /> : null}
        <text x="50" y="50" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0B1A33" fontFamily="Inter, sans-serif">{Math.round(p * 100)}%</text>
        <text x="50" y="66" textAnchor="middle" fontSize="10" fill="#5A6880" fontFamily="Inter, sans-serif">{done} / {total}</text>
      </svg>
    );
  }
  const FitBar = ({ v, color }) => <span className="sw-fit-b" aria-hidden="true">{[1, 2, 3, 4, 5].map((k) => <i key={k} style={k <= v ? { background: color } : null} />)}</span>;
  const Fit = ({ m }) => (
    <>
      <div className="sw-fit"><span style={{ width: UI_EN ? 50 : 40, flexShrink: 0 }}>{tx("ワイン", "Wine")}</span><FitBar v={m.fit_wine_n} color="var(--wine)" /><span>{lbl(m.fit_wine_l)}</span></div>
      <div className="sw-fit"><span style={{ width: UI_EN ? 50 : 40, flexShrink: 0 }}>{tx("歴史", "History")}</span><FitBar v={m.fit_history_n} color="var(--hist)" /><span>{lbl(m.fit_history_l)}</span></div>
    </>
  );

  // ---------- 00 ダッシュボード ----------
  // 工程は [画面, 日本語, 自動化の度合い, 英語]
  const FLOW = [
    ["market", "市場を調べる", "半自動", "Research markets"], ["plans", "テーマと企画", "人", "Themes & episodes"], ["sources", "一次情報を集める", "半自動", "Gather primary sources"],
    ["video", "台本・AI動画", "半自動", "Script & AI video"], ["gate", "事実確認の関門", "人", "Fact-check gate"], ["media", "発信する", "半自動", "Publish"], ["pipeline", "振り返る", "自動", "Review results"],
  ];
  // 約束は [日本語, 日本語の説明, 英語, 英語の説明]
  const VOWS = [
    ["出典のない事実は出さない", "見つからない話は「諸説あり」と言うか、使わない", "No fact without a source", "If you can't find support, say accounts differ or leave it out"],
    ["一次情報を優先する", "まとめ記事・SNS・AIの回答は出典にしない", "Primary sources first", "Summary articles, social posts and AI answers are never sources"],
    ["AIの下書きは人が照合する", "関門を通るまで公開しない", "A person checks every AI draft", "Nothing goes public until it passes the gate"],
    ["AIで作ったことを隠さない", "各SNSの規約に沿ってAI生成を表示する", "Don't hide that AI made it", "Label AI-generated content as each platform's rules require"],
    ["煽らない・誤認させない", "断定・誇張・ステマは法律と規約で禁じられている", "No hype, nothing misleading", "Overclaiming, exaggeration and stealth ads are banned by law and platform rules"],
  ];
  function Home({ go, done, checked, openEp }) {
    const W = (SW_DATA.wine || {}).episodes || [], H = (SW_DATA.history || {}).episodes || [];
    const acc = ((SW_DATA.accounts || {}).list || []).length;
    const em = SW_DATA.emerging_media || [], cs = SW_DATA.global_cases || [];
    const [tipEl, onTip, offTip] = useTip();
    const kdone = (k) => FACTS.filter((f) => f.kind === k && (f.v || checked[f.key])).length;
    const ktot = (k) => FACTS.filter((f) => f.kind === k).length;
    const emRise = em.filter((m) => m.stage === "急成長" || m.stage === "伸び始め").sort((a, b) => (a.stage === "急成長" ? 0 : 1) - (b.stage === "急成長" ? 0 : 1));
    const kpis = UI_EN ? [
      ["market", "market", (SW_DATA.markets || []).length + GM.length, "", "Market data", `Japan ${(SW_DATA.markets || []).length} · World ${GM.length}`],
      ["media", "media", (SW_DATA.media || []).length + em.length, "", "Platforms compared", `Major ${(SW_DATA.media || []).length} · Rising ${em.length}`],
      ["plans", "plan", W.length + H.length, "", "Episode plans", `Wine ${W.length} · History ${H.length} · Ideas ${NETA.length}`],
      ["accounts", "users", acc, "", "Reference accounts", `${cs.length} overseas cases`],
      ["plans", "shield", done, `/ ${FACTS.length}`, "Facts checked in the original", done ? `${FACTS.length - done} to go` : "None checked yet"],
    ] : [
      ["market", "market", (SW_DATA.markets || []).length + GM.length, "件", "市場データ", `日本 ${(SW_DATA.markets || []).length}・世界 ${GM.length}`],
      ["media", "media", (SW_DATA.media || []).length + em.length, "媒体", "比較した媒体", `主要 ${(SW_DATA.media || []).length}・伸び始め ${em.length}`],
      ["plans", "plan", W.length + H.length, "本", "企画", `ワイン ${W.length}・歴史 ${H.length}・ネタ帳 ${NETA.length}`],
      ["accounts", "users", acc, "件", "参考アカウント", `海外の事例 ${cs.length}件`],
      ["plans", "shield", done, `/ ${FACTS.length}`, "原文で確認した事実", done ? `残り ${FACTS.length - done}件` : "まだ確認していません"],
    ];
    return (
      <div>
        <Head kick="DASHBOARD" title={tx("嘘のない発信を、仕組みで回す", "Honest posting, run as a system")} lede={tx("ワインと歴史を題材に、調べる・企画する・作る・確かめるを、AIと人の役割を分けて回すための作業場です。", "A workspace for researching, planning, making and checking posts about wine and history, with clear roles for AI and for people.")} right={<span className="sw-stamp">{tx("調査時点　2026年10月", "Researched October 2026")}</span>} />
        {(() => { const cm = new Date().getMonth() + 1; const rs = EPS.filter((e) => e.st && MD(e.st.date_greg) && MD(e.st.date_greg)[0] === cm).sort((a, b) => MD(a.st.date_greg)[1] - MD(b.st.date_greg)[1]); return rs.length ? (
          <div className="sw-card sw-sec">
            <div className="sw-ch"><h2 className="sw-ct">{tx(`今月の「その時」　${cm}月の記念日`, `This month's "moments": anniversaries in ${MONTH_EN[cm - 1]}`)}</h2><button className="sw-btn" onClick={() => go("plans")}>{tx("企画帳へ", "Episode plans")}</button></div>
            <div className="sw-cal" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,320px),1fr))" }}>
              {rs.slice(0, 6).map((e) => <button key={e.kind + e.id} className="sw-cal-r" style={{ border: "1px solid var(--line2)", borderRadius: 10 }} onClick={() => openEp(e)}><span className="sw-cal-d">{tx(`${MD(e.st.date_greg)[1]}日`, `${MD(e.st.date_greg)[1]}`)}</span><span style={{ minWidth: 0 }}><b style={{ fontSize: 14 }}>{splitTitle(e.title)[0]}</b><span className="sw-sm" style={{ display: "block" }}>{e.st.headline}</span></span></button>)}
            </div>
          </div>
        ) : null; })()}
        <div className="sw-g sw-g5">
          {kpis.map(([k, ic, n, u, l, s], i) => (
            <button key={i} className="sw-card sw-kpi" onClick={() => go(k)}>
              <span className="sw-kpi-i" style={i === 4 ? { background: "var(--ok-soft)", color: "var(--ok)" } : null}><Icon n={ic} /></span>
              <span className="sw-kpi-n">{n}<small>{u}</small></span>
              <span className="sw-kpi-l">{l}</span>
              <span className="sw-kpi-s">{s}</span>
            </button>
          ))}
        </div>
        <div className="sw-g sw-g-7-5">
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("企画の4象限（話題性 × 根拠の固さ）", "Episode quadrants (interest × evidence)")}</h2><button className="sw-btn" onClick={() => go("plans")}>{tx("企画帳へ", "Episode plans")}</button></div>
            <Matrix list={EPS} onOpen={openEp} compact />
            <div className="sw-chips" style={{ marginTop: 8 }}>{quads().map(([q, n, , c]) => <span key={q} className="sw-chip" style={{ color: c, fontWeight: 800 }}>{n} {EPS.filter((e) => quadOf(SCORES[e.id]) === q).length}</span>)}</div>
          </div>
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("事実の原文確認", "Facts checked against originals")}</h2><button className="sw-btn" onClick={() => go("plans")}>{tx("企画帳へ", "Episode plans")}</button></div>
            <div className="sw-donut">
              <Donut done={done} total={FACTS.length} />
              <div style={{ flex: "1 1 160px", minWidth: 0 }}>
                {[["wine", tx("ワイン", "Wine"), "var(--wine)"], ["history", tx("歴史", "History"), "var(--hist)"]].map(([k, l, c]) => (
                  <div key={k} style={{ marginBottom: 10 }}>
                    <div className="sw-sm" style={{ display: "flex", justifyContent: "space-between" }}><span>{l}</span><b style={{ color: "var(--ink)" }}>{kdone(k)} / {ktot(k)}</b></div>
                    <div className="sw-bar"><i style={{ width: `${ktot(k) ? kdone(k) / ktot(k) * 100 : 0}%`, background: c }} /></div>
                  </div>
                ))}
                <p className="sw-sm" style={{ margin: 0 }}>{tx("調査では検索結果の要約しか読めていません。原文で確かめた事実だけが台本に入ります。", "The research could only read search-result summaries. Only facts you check in the original go into scripts.")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sw-g sw-g-7-5">
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("世界の市場規模（米ドル建ての上位）", "Global market sizes (top, in US dollars)")}</h2><button className="sw-btn" onClick={() => go("market")}>{tx("市場を見る", "View markets")}</button></div>
            {GM_BARS.length ? <RangeBars rows={GM_BARS.slice(0, 10)} onTip={onTip} offTip={offTip} /> : <p className="sw-sm">{tx("世界の市場データはまだありません。", "No global market data yet.")}</p>}
            <p className="sw-sm" style={{ margin: "10px 0 0" }}>{tx("出典が米ドルで示した数字だけを並べています（換算はしていません）。薄い部分は、調査会社によって推計に幅がある範囲です。年と範囲は市場ごとに違います。棒に触れると出典が出ます。", "Only figures the sources gave in US dollars (nothing converted). The pale part is the spread between research firms' estimates. Years and scope differ by market. Hover a bar to see its sources.")}</p>
          </div>
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("伸び始めの媒体", "Rising platforms")}</h2><button className="sw-btn" onClick={() => go("media")}>{tx("媒体を見る", "View platforms")}</button></div>
            {emRise.length ? (
              <div className="sw-em">
                <div className="sw-em-r sw-em-h"><span>{tx("媒体", "Platform")}</span><span>{tx("段階", "Stage")}</span><span>{tx("相性（ワイン／歴史）", "Fit (wine / history)")}</span></div>
                {emRise.map((m) => (
                  <div key={m.name} className="sw-em-r" onMouseMove={(e) => onTip(e, `${m.name}：${m.users}`)} onMouseLeave={offTip}>
                    <span style={{ fontWeight: 700, minWidth: 0 }}>{m.name}<span className="sw-sm" style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.users}</span></span>
                    <span><span className={"sw-pill sw-st-" + m.stage}>{lbl(m.stage)}</span></span>
                    <span style={{ display: "flex", gap: 8, alignItems: "center" }}><FitBar v={m.fit_wine_n} color="var(--wine)" /><FitBar v={m.fit_history_n} color="var(--hist)" /></span>
                  </div>
                ))}
              </div>
            ) : <p className="sw-sm">{tx("伸び始めの媒体のデータはまだありません。", "No data on rising platforms yet.")}</p>}
            <p className="sw-sm" style={{ margin: "10px 0 0" }}>{tx("利用者数は媒体ごとに定義（月間・日間・登録）と時点が違うので、横並びの比較はしていません。発信者が少ないことを直接示す統計は、どの媒体でも見つかっていません。", "User counts differ in definition (monthly, daily, registered) and date by platform, so they aren't compared side by side. No statistic directly showing a lack of creators was found for any platform.")}</p>
          </div>
        </div>
        <div className="sw-card sw-sec">
          <div className="sw-ch"><h2 className="sw-ct">{tx("7つの工程", "7 steps")}</h2><span className="sw-sm">{tx("テーマ選びと事実確認の関門は、自動化しても人が行います", "Choosing themes and the fact-check gate stay with people, even when automated")}</span></div>
          <div className="sw-flow">
            {FLOW.map(([k, t, a, te], i) => (
              <button key={i} className={"sw-node" + (k === "gate" ? " gate" : "")} onClick={() => go(k)}>
                <div className="sw-node-n">{String(i + 1).padStart(2, "0")}</div>
                <div className="sw-node-t">{tx(t, te)}</div>
                <Auto a={a} />
              </button>
            ))}
          </div>
        </div>
        <div className="sw-g sw-g2">
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("次にやること", "Next steps")}</h2></div>
            {(UI_EN ? [
              ["Check episode facts against the originals", `${FACTS.length - done} still unchecked`, "plans", "Episode plans"],
              ["Choose where to publish", "Compare usage rates and rising platforms", "media", "Platforms"],
              ["Pass the gate before publishing", "Check numbers, names and dates", "gate", "Gate"],
              ["Choose production and posting tools", "Compare budget stacks and MCP integrations", "tools", "Tools"],
            ] : [
              ["企画帳の事実を原文で確かめる", `未確認があと${FACTS.length - done}件`, "plans", "企画帳へ"],
              ["発信する媒体を決める", "利用率と伸び始めの媒体を比べる", "media", "媒体へ"],
              ["公開前に関門を通す", "数字・固有名詞・年月日を照合する", "gate", "関門へ"],
              ["制作と投稿のツールを決める", "予算別の組み合わせと MCP・連携を比べる", "tools", "ツールへ"],
            ]).map(([t, d, k, b], i) => (
              <div key={i} className="sw-todo">
                <span className="sw-todo-n">{i + 1}</span>
                <div style={{ minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div><div className="sw-sm">{d}</div></div>
                <button className={"sw-btn" + (i === 0 ? " pri" : "")} onClick={() => go(k)}>{b}</button>
              </div>
            ))}
          </div>
          <div className="sw-card">
          <div className="sw-ch"><h2 className="sw-ct">{tx("嘘をつかないための5つの約束", "5 promises for staying honest")}</h2></div>
          <div className="sw-vow" style={{ gridTemplateColumns: "1fr", gap: 8 }}>
            {VOWS.map(([t, d, te, de], i) => <div key={i}><span style={{ color: "var(--ok)" }}><Icon n="check" /></span><b>{tx(t, te)}</b><span className="sw-sm">{tx(d, de)}</span></div>)}
          </div>
        </div>
        </div>
        {tipEl}
      </div>
    );
  }

  // ---------- 01 調べる：市場 ----------
  // 採点の観点は [日本語, 日本語の説明, 英語, 英語の説明]
  const CRITERIA = [["当事者の数を数えられる", "公的統計や調査で人数・件数が分かる", "The people affected can be counted", "Official statistics or surveys give numbers of people or cases"], ["情報に偏りがある", "正しい情報が見つけにくく、整理するだけで価値が出る", "Information is lopsided", "Good information is hard to find, so organizing it adds value"], ["合法な稼ぎ方がある", "自分の商品、規制の範囲内の紹介・広告で稼げる", "There's a legal way to earn", "Your own products, or referrals and ads within the rules"], ["一次情報で差がつく", "公的データや原典を比べて、独自の発信ができる", "Primary sources set you apart", "Comparing public data and original texts lets you say something new"]];
  function RowTable({ rows, head, cols, render, detail }) {
    const [open, setOpen] = useState(-1);
    return (
      <div className="sw-tbl sw-sec" style={cols ? { "--tc": cols } : null}>
        <div className="sw-row sw-row-h">{head.map((h, i) => <span key={i}>{h}</span>)}<span /></div>
        {rows.map((r) => (
          <React.Fragment key={r.i}>
            <button className="sw-row" onClick={() => setOpen(open === r.i ? -1 : r.i)} aria-expanded={open === r.i}>
              {render(r)}
              <span className="sw-chev">{open === r.i ? "−" : "+"}</span>
            </button>
            {open === r.i ? <div className="sw-rowx"><dl className="sw-kv">{detail(r)}</dl></div> : null}
          </React.Fragment>
        ))}
        {!rows.length ? <div className="sw-sm" style={{ padding: 16 }}>{tx("該当するものはありません。", "Nothing matches.")}</div> : null}
      </div>
    );
  }
  function MarketJapan() {
    const rows = SW_DATA.markets || [];
    const cats = Array.from(new Set(rows.map((r) => r.cat)));
    const [cat, setCat] = useState("all");
    const [q, setQ] = useState("");
    const [only, setOnly] = useState(false);
    const list = rows.map((r, i) => ({ ...r, i })).filter((r) => (cat === "all" || r.cat === cat) && (!only || r.url) && (!q || [r.name, r.note, r.regs, r.size].join(" ").includes(q)));
    return (
      <>
        <div className="sw-tbar">
          <Seg value={cat} onChange={setCat} options={[["all", tx(`すべて ${rows.length}`, `All ${rows.length}`)], ...cats.map((c) => [c, `${lbl(c)} ${rows.filter((r) => r.cat === c).length}`])]} />
          <input className="sw-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx("市場名・メモ・規制で絞り込む", "Filter by market, note or rule")} aria-label={tx("市場を絞り込む", "Filter markets")} />
          <label className="sw-chk"><input type="checkbox" checked={only} onChange={() => setOnly(!only)} />{tx("出典があるものだけ", "Only with a source")}</label>
        </div>
        <RowTable rows={list} head={[tx("分類", "Category"), tx("市場", "Market"), tx("規模", "Size")]}
          render={(r) => <><span><span className="sw-tag">{lbl(r.cat)}</span></span><span style={{ fontWeight: 700 }}>{r.name}</span><span className={"sw-size" + (r.url ? "" : " muted")}>{r.url ? r.size : tx("出典が見つからないため使わない", "No source found, not used")}{r.url ? <Badge v={r.verified} /> : null}</span></>}
          detail={(r) => <>
            {!r.url ? <><dt>{tx("記録", "Record")}</dt><dd>{r.size}</dd></> : null}
            {r.scope ? <><dt>{tx("範囲", "Scope")}</dt><dd>{r.scope}</dd></> : null}
            {r.growth ? <><dt>{tx("伸び", "Growth")}</dt><dd>{r.growth}</dd></> : null}
            <dt>{tx("出典", "Source")}</dt><dd>{r.source} <Ext url={r.url}>{tx("開く", "Open")}</Ext></dd>
            {r.note ? <><dt>{tx("メモ", "Note")}</dt><dd>{r.note}</dd></> : null}
            {r.regs ? <><dt>{tx("規制", "Rules")}</dt><dd style={{ color: "var(--ng)" }}>{r.regs}</dd></> : null}
          </>} />
      </>
    );
  }
  function MarketGlobal() {
    const cats = Array.from(new Set(GM.map((r) => r.cat)));
    const regions = Array.from(new Set(GM.map((r) => r.region)));
    const [cat, setCat] = useState("all");
    const [reg, setReg] = useState("all");
    const [tipEl, onTip, offTip] = useTip();
    const list = GM.map((r, i) => ({ ...r, i })).filter((r) => (cat === "all" || r.cat === cat) && (reg === "all" || r.region === reg));
    const bars = GM_BARS.filter((b) => (cat === "all" || b.cat === cat) && (reg === "all" || b.region === reg));
    return (
      <>
        <div className="sw-tbar">
          <Seg value={cat} onChange={setCat} options={[["all", tx("すべての分類", "All categories")], ...cats.map((c) => [c, lbl(c)])]} />
          <Seg value={reg} onChange={setReg} options={[["all", tx("全地域", "All regions")], ...regions.map((c) => [c, lbl(c)])]} />
        </div>
        <MarketQuad rows={list} />
        {bars.length ? (
          <div className="sw-card sw-sec">
            <div className="sw-ch"><h2 className="sw-ct">{tx("市場規模の比較（米ドル建て）", "Market size comparison (US dollars)")}</h2><span className="sw-sm">{tx(`${bars.length}市場`, `${bars.length} markets`)}</span></div>
            <RangeBars rows={bars} onTip={onTip} offTip={offTip} />
            <p className="sw-sm" style={{ margin: "10px 0 0" }}>{tx("出典が米ドルで示した数字のみ。薄い部分は推計者による幅。年・範囲・実績か予測かは市場ごとに違うので、下の表で確かめてください。", "US-dollar figures from the sources only. The pale part is the spread between estimators. Year, scope and actual vs. forecast vary by market, so check the table below.")}</p>
          </div>
        ) : null}
        <RowTable rows={list} head={[tx("地域", "Region"), tx("市場", "Market"), tx("規模", "Size")]} cols="92px minmax(0,1.2fr) minmax(0,1fr) 20px"
          render={(r) => <><span><span className="sw-tag">{lbl(r.region)}</span></span><span><b>{r.name}</b><span className="sw-sm" style={{ display: "block" }}>{lbl(r.cat)}</span></span><span className={"sw-size" + (r.url ? "" : " muted")}>{r.url ? tx(`${r.size}（${r.year}）`, `${r.size} (${r.year})`) : tx("出典が見つからないため使わない", "No source found, not used")}{r.url ? <Badge v={r.verified} /> : null}</span></>}
          detail={(r) => <>
            {!r.url ? <><dt>{tx("記録", "Record")}</dt><dd>{r.size}</dd></> : null}
            {r.scope ? <><dt>{tx("範囲", "Scope")}</dt><dd>{r.scope}</dd></> : null}
            {r.growth ? <><dt>{tx("伸び", "Growth")}</dt><dd>{r.growth}</dd></> : null}
            <dt>{tx("出典", "Source")}</dt><dd>{r.source} <Ext url={r.url}>{tx("開く", "Open")}</Ext></dd>
            {r.note ? <><dt>{tx("示唆", "Takeaway")}</dt><dd>{r.note}</dd></> : null}
          </>} />
        {tipEl}
      </>
    );
  }
  const KIND_C = { "手本": "#1D4ED8", "反面教師": "#B91C1C", "プラットフォームの動き": "#92400E" };
  function Cases() {
    const rows = SW_DATA.global_cases || [];
    const kinds = Array.from(new Set(rows.map((r) => r.kind)));
    const niches = Array.from(new Set(rows.map((r) => r.niche)));
    const [kind, setKind] = useState("all");
    const [niche, setNiche] = useState("all");
    const list = rows.filter((r) => (kind === "all" || r.kind === kind) && (niche === "all" || r.niche === niche));
    return (
      <>
        <div className="sw-tbar">
          <Seg value={kind} onChange={setKind} options={[["all", tx(`すべて ${rows.length}`, `All ${rows.length}`)], ...kinds.map((k) => [k, `${lbl(k)} ${rows.filter((r) => r.kind === k).length}`])]} />
          <Seg value={niche} onChange={setNiche} options={[["all", tx("全ジャンル", "All genres")], ...niches.map((k) => [k, lbl(k)])]} />
        </div>
        <div className="sw-g sw-g3">
          {list.map((r, i) => (
            <div key={i} className="sw-card sw-case" style={{ borderTop: `3px solid ${KIND_C[r.kind] || "#E2E8F1"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                <b style={{ fontSize: 14 }}>{r.name}</b>
                <span className="sw-pill" style={{ background: "var(--line2)", color: KIND_C[r.kind] || "var(--sub)" }}>{lbl(r.kind)}</span>
              </div>
              <div className="sw-sm">{[r.country, lbl(r.niche), r.platform].filter(Boolean).join(tx("・", " · "))}</div>
              {r.scale ? <div style={{ fontWeight: 800, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{r.scale}</div> : null}
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink2)" }}>{r.what}</p>
              {r.model ? <div className="sw-sm"><b style={{ color: "var(--ink2)" }}>{tx("収益の形", "Revenue model")}</b>{tx("　", " ")}{r.model}</div> : null}
              {r.lesson ? <div className="sw-note info" style={{ padding: "8px 12px" }}><b>{tx("学び　", "Lesson: ")}</b>{r.lesson}</div> : null}
              <div className="sw-sm" style={{ marginTop: "auto" }}>{r.source} <Ext url={r.url}>{tx("開く", "Open")}</Ext><Badge v={r.verified} /></div>
            </div>
          ))}
        </div>
      </>
    );
  }
  function Estimator() {
    const [n, setN] = useState(76309), [rate, setRate] = useState(3), [price, setPrice] = useState(3000);
    const [score, setScore] = useState([3, 3, 3, 3]);
    const est = Math.round(n * rate / 100 * price);
    const total = score.reduce((a, b) => a + b, 0);
    const low = score.some((x) => x <= 1);
    return (
      <div className="sw-g sw-g2">
        <div className="sw-card">
          <div className="sw-ch"><h2 className="sw-ct">{tx("金額がない市場を見積もる", "Estimate a market with no published size")}</h2></div>
          <p className="sw-sm" style={{ margin: "0 0 8px" }}>{tx("当事者の数 × お金を払う割合 × 1人あたりの支払額。人数は公的統計から取り、割合と単価は自分の仮定として明記します。", "People affected × share who pay × spend per person. Take the head count from official statistics, and state the share and price as your own assumptions.")}</p>
          {[[tx("当事者の数（人・件／年）", "People affected (people or cases / year)"), n, setN, 1000], [tx("お金を払う割合（％）", "Share who pay (%)"), rate, setRate, 0.5], [tx("1人あたりの支払額（円）", "Spend per person (yen)"), price, setPrice, 100]].map(([l, v, set, st], i) => (
            <label key={i} className="sw-field"><span>{l}</span><input type="number" value={v} step={st} min={0} onChange={(e) => set(Number(e.target.value) || 0)} /></label>
          ))}
          <div style={{ borderTop: "1px solid var(--line2)", paddingTop: 12 }}>
            <div className="sw-sm">{tx("推計（年）", "Estimate (per year)")}</div>
            <div className="sw-big">{est.toLocaleString()}<span style={{ fontSize: 14, marginLeft: 4 }}>{tx("円", "yen")}</span></div>
            <div className="sw-sm" style={{ marginTop: 6 }}>{tx("初期値は自己破産（個人）の2024年の件数76,309件（司法統計）。割合と単価は仮の値なので、2〜3通り出して幅で示します。", "The default is the 76,309 personal bankruptcy cases of 2024 (Japan's judicial statistics). The share and price are placeholders, so try 2–3 scenarios and present a range.")}</div>
          </div>
        </div>
        <div className="sw-card">
          <div className="sw-ch"><h2 className="sw-ct">{tx("テーマを採点する", "Score a theme")}</h2></div>
          <p className="sw-sm" style={{ margin: "0 0 8px" }}>{tx("各1〜5点。どれか1つでも1点なら、そのテーマは選びません。", "1–5 points each. If any item scores 1, drop the theme.")}</p>
          {CRITERIA.map(([t, d, te, de], i) => (
            <div key={i} className="sw-field" style={{ alignItems: "flex-start" }}>
              <div><div style={{ fontWeight: 700 }}>{tx(t, te)}</div><div className="sw-sm">{tx(d, de)}</div></div>
              <div className="sw-dots" role="radiogroup" aria-label={tx(t, te)}>
                {[1, 2, 3, 4, 5].map((v) => <button key={v} role="radio" aria-checked={score[i] === v} className={score[i] >= v ? "on" : ""} onClick={() => { const s = score.slice(); s[i] = v; setScore(s); }}>{v}</button>)}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line2)", paddingTop: 12, display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <div className="sw-big" style={{ color: low ? "var(--ng)" : "var(--blue-dd)" }}>{total}<span style={{ fontSize: 14, color: "var(--faint)" }}> / 20</span></div>
            <span className="sw-sm">{low ? tx("1点の項目があるので選ばない", "An item scored 1, so don't pick it") : total >= 15 ? tx("有力な候補", "Strong candidate") : total >= 11 ? tx("条件つきで検討", "Consider with conditions") : tx("見送り", "Pass")}</span>
          </div>
        </div>
      </div>
    );
  }
  function Market() {
    const [t, setT] = useState("global");
    return (
      <div>
        <Head kick={tx("01 調べる", "01 RESEARCH")} title={tx("市場", "Markets")} lede={tx("業界の売上は、そのまま副業の取り分にはなりません。見るのは「その悩みや関心の情報にお金を払う人の数」と、海外で先に起きていることです。出典が見つからない数字は使いません。", "An industry's revenue isn't what a side project can earn. What matters is how many people pay for information on that worry or interest, and what has already happened overseas. Figures without a source are not used.")} />
        <Tabs value={t} onChange={setT} options={[["global", tx("世界", "World"), GM.length], ["japan", tx("日本", "Japan"), (SW_DATA.markets || []).length], ["cases", tx("海外の事例", "Overseas cases"), (SW_DATA.global_cases || []).length], ["tools", tx("見積もりと採点", "Estimate & score"), null]]} />
        {t === "global" && <MarketGlobal />}
        {t === "japan" && <MarketJapan />}
        {t === "cases" && <Cases />}
        {t === "tools" && <Estimator />}
      </div>
    );
  }

  // 市場の規模（米ドル・対数）× 年平均成長率。同じ市場の別推計は線でつなぐ
  function MarketQuad({ rows }) {
    const [tipEl, onTip, offTip] = useTip();
    const pts = rows.filter((r) => typeof r.usd_bn === "number" && r.usd_bn > 0 && typeof r.cagr === "number" && r.url);
    if (pts.length < 3) return null;
    const W = 680, H = 400, L = 54, R = 16, T = 16, B = 44;
    const lx = pts.map((r) => Math.log10(r.usd_bn));
    const x0 = Math.floor(Math.min(...lx) - 0.2), x1 = Math.ceil(Math.max(...lx) + 0.1);
    const y1 = Math.ceil((Math.max(...pts.map((r) => r.cagr)) + 4) / 5) * 5;
    const sx = (v) => L + (Math.log10(v) - x0) / (x1 - x0) * (W - L - R), sy = (v) => H - B - v / y1 * (H - T - B);
    const mx = sx(10), my = sy(10);
    const groups = {};
    pts.forEach((r) => { const k = String(r.name).split("（")[0]; (groups[k] = groups[k] || []).push(r); });
    const ticks = []; for (let e = x0; e <= x1; e++) ticks.push(Math.pow(10, e));
    // 名前の置き場所：点の右上・右下・左上・左下の順に試し、ほかの名前と点に重ならない所に置く
    const dots = pts.map((r) => [sx(r.usd_bn), sy(r.cagr)]);
    const placed = [];
    const hit = (b) => placed.some((q) => b.x0 < q.x1 && b.x1 > q.x0 && b.y0 < q.y1 && b.y1 > q.y0) || dots.some(([dx, dy]) => dx + 7 > b.x0 && dx - 7 < b.x1 && dy + 7 > b.y0 && dy - 7 < b.y1) || b.x0 < L || b.x1 > W - R;
    const labels = Object.entries(groups).sort((a, b) => sy(a[1][0].cagr) - sy(b[1][0].cagr)).map(([k, rs]) => {
      const cx = sx(rs[0].usd_bn), cy = sy(rs[0].cagr), w = k.length * 11 + 4;
      const opts = [[cx + 10, cy - 8, "start"], [cx + 10, cy + 16, "start"], [cx - 10, cy - 8, "end"], [cx - 10, cy + 16, "end"], [cx + 10, cy - 22, "start"], [cx - 10, cy + 30, "end"]];
      let pick = null;
      for (const [x, y, a] of opts) { const b = { x0: a === "start" ? x : x - w, x1: a === "start" ? x + w : x, y0: y - 11, y1: y + 3 }; if (!hit(b)) { pick = { k, x, y, a, b }; break; } }
      if (!pick) { const [x, y, a] = cx > W * 0.7 ? opts[2] : opts[0]; pick = { k, x, y, a, b: { x0: a === "start" ? x : x - w, x1: a === "start" ? x + w : x, y0: y - 11, y1: y + 3 } }; }
      placed.push(pick.b);
      return pick;
    });
    const tl = (v) => usd(v);
    return (
      <div className="sw-card sw-sec" onMouseLeave={offTip}>
        <div className="sw-ch"><h2 className="sw-ct">{tx("規模 × 伸び率（4象限）", "Size × growth (quadrants)")}</h2><span className="sw-sm">{tx(`${Object.keys(groups).length}市場・${pts.length}推計`, `${Object.keys(groups).length} markets · ${pts.length} estimates`)}</span></div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={tx("市場規模と年平均成長率の4象限", "Quadrants of market size and annual growth rate")} style={{ display: "block" }}>
          <rect x={L} y={T} width={mx - L} height={my - T} fill="#EFF6FF" />
          <rect x={mx} y={T} width={W - R - mx} height={my - T} fill="#ECFDF5" />
          <rect x={mx} y={my} width={W - R - mx} height={H - B - my} fill="#F8FAFC" />
          <rect x={L} y={my} width={mx - L} height={H - B - my} fill="#FCFCFD" />
          <line x1={mx} x2={mx} y1={T} y2={H - B} stroke="#CBD5E1" strokeDasharray="4 4" />
          <line x1={L} x2={W - R} y1={my} y2={my} stroke="#CBD5E1" strokeDasharray="4 4" />
          {[[tx("小さいが急伸", "Small but surging"), L + 8, T + 16, "start", "#1D4ED8"], [tx("大きく伸びる", "Big and growing"), W - R - 8, T + 16, "end", "#047857"], [tx("大きく安定", "Big and steady"), W - R - 8, H - B - 8, "end", "#5A6880"], [tx("小さく緩やか", "Small and slow"), L + 8, H - B - 8, "start", "#566479"]].map(([n, x, y, a, c]) => <text key={n} x={x} y={y} textAnchor={a} fontSize="12.5" fontWeight="800" fill={c} fontFamily="Inter, sans-serif">{n}</text>)}
          {ticks.map((v) => <g key={v}><line x1={sx(v)} x2={sx(v)} y1={H - B} y2={H - B + 4} stroke="#566479" /><text x={sx(v)} y={H - B + 16} textAnchor="middle" fontSize="10.5" fill="#5A6880" fontFamily="Inter, sans-serif">{tl(v)}</text></g>)}
          {[0, 10, 20, 30, 40].filter((v) => v <= y1).map((v) => <g key={v}><text x={L - 6} y={sy(v) + 4} textAnchor="end" fontSize="10.5" fill="#5A6880" fontFamily="Inter, sans-serif">{v}%</text></g>)}
          <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" fontSize="11.5" fill="#5A6880" fontFamily="Inter, sans-serif">{tx("市場規模（米ドル、対数目盛り）→", "Market size (US$, log scale) →")}</text>
          <text x={12} y={(T + H - B) / 2} textAnchor="middle" fontSize="11.5" fill="#5A6880" fontFamily="Inter, sans-serif" transform={`rotate(-90 12 ${(T + H - B) / 2})`}>{tx("年平均成長率 →", "Annual growth rate →")}</text>
          {Object.entries(groups).map(([k, rs]) => (
            <g key={k}>
              {rs.length > 1 ? <polyline points={rs.map((r) => `${sx(r.usd_bn)},${sy(r.cagr)}`).join(" ")} fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" /> : null}
              {rs.map((r, i) => <circle key={i} cx={sx(r.usd_bn)} cy={sy(r.cagr)} r="7" fill="#1D4ED8" fillOpacity=".85" stroke="#fff" strokeWidth="2" onMouseMove={(ev) => onTip(ev, tx(`${r.name}：${r.size}・年平均${r.cagr}%（${r.year}、${r.source}）`, `${r.name}: ${r.size} · ${r.cagr}%/yr (${r.year}, ${r.source})`))} />)}
            </g>
          ))}
          {labels.map((lb) => <text key={lb.k} x={lb.x} y={lb.y} textAnchor={lb.a} fontSize="11" fontWeight="700" fill="#22324D" fontFamily="Inter, sans-serif" style={{ pointerEvents: "none" }}>{lb.k}</text>)}
        </svg>
        <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("出典が米ドルの規模と年平均成長率の両方を示した市場だけを置いています。成長率は予測で、期間・定義は推計者ごとに違います。点線は同じ市場の別の推計です。境目は規模100億ドル・成長率10%に置いた目安です。", "Only markets whose sources give both a US-dollar size and an annual growth rate are plotted. Growth rates are forecasts, and periods and definitions differ by estimator. Dotted lines join different estimates of the same market. The dividers at $10B and 10% growth are a rough guide.")}</p>
        {tipEl}
      </div>
    );
  }

  // 媒体：成長の段階 × ワイン・歴史との相性。主要媒体は「定着」に置く
  function MediaMatrix() {
    const all = [...(SW_DATA.media || []).map((m) => ({ ...m, stage: "定着", major: true })), ...(SW_DATA.emerging_media || [])];
    const fitAvg = (m) => ((m.fit_wine_n || 0) + (m.fit_history_n || 0)) / 2;
    const col = (m) => fitAvg(m) >= 3.75 ? 2 : fitAvg(m) >= 2.75 ? 1 : 0;
    const ROWS = [["急成長", tx("急成長", "Surging")], ["伸び始め", tx("伸び始め", "Rising")], ["定着", tx("定着（主要媒体を含む）", "Established (incl. major platforms)")]];
    const COLS = [tx("相性 低", "Low fit"), tx("相性 中", "Medium fit"), tx("相性 高", "High fit")];
    const tone = (r, c) => c === 2 && r < 2 ? [tx("攻めどころ", "Opportunity"), "#ECFDF5", "#047857"] : c === 2 ? [tx("主戦場", "Main arena"), "#EFF6FF", "#1D4ED8"] : c === 1 && r < 2 ? [tx("試す価値あり", "Worth a try"), "#FFFBEB", "#92400E"] : [null, "#F8FAFC", "#566479"];
    return (
      <div className="sw-card sw-sec">
        <div className="sw-ch"><h2 className="sw-ct">{tx("伸び × テーマとの相性", "Growth × theme fit")}</h2><span className="sw-sm">{tx(`主要${(SW_DATA.media || []).length}＋伸び始め${(SW_DATA.emerging_media || []).length}媒体`, `${(SW_DATA.media || []).length} major + ${(SW_DATA.emerging_media || []).length} rising platforms`)}</span></div>
        <div className="sw-mx">
          <div className="sw-mx-h" />
          {COLS.map((c) => <div key={c} className="sw-mx-h">{c}</div>)}
          {ROWS.map(([st, label], r) => (
            <React.Fragment key={st}>
              <div className="sw-mx-r">{label}</div>
              {COLS.map((_, c) => {
                const [tag, bg, fg] = tone(r, c);
                const items = all.filter((m) => m.stage === st && col(m) === c);
                return (
                  <div key={c} className="sw-mx-c" style={{ background: bg }}>
                    {tag ? <div className="sw-mx-t" style={{ color: fg }}>{tag}</div> : null}
                    <div className="sw-chips">{items.map((m) => <span key={m.name} className="sw-chip" title={m.users} style={m.major ? { background: "#fff", border: "1px solid var(--line)" } : null}>{m.short || m.name}</span>)}</div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("相性は、ワインと歴史それぞれの相性（5段階、調査時の評価）の平均です。白い枠は主要媒体です。段階と相性は目安で、日本で使えるかどうかは各媒体の説明で確かめてください。", "Fit is the average of the wine and history fit (5-point scale, rated during research). White boxes are major platforms. Stage and fit are rough guides; check each platform's notes to see whether it works in Japan.")}</p>
      </div>
    );
  }

  // ---------- 01 調べる：媒体 ----------
  const AGES = ["全年代", "10代", "20代", "30代", "40代", "50代", "60代", "70代"];
  const ageLabel = (a) => tx(a, a === "全年代" ? "All ages" : a === "10代" ? "Teens" : a.replace("代", "s"));
  const RAMP = [[239, 246, 255], [147, 197, 253], [37, 99, 235], [23, 37, 84]];
  const heat = (v) => {
    const t = Math.max(0, Math.min(1, v / 100)) * (RAMP.length - 1);
    const i = Math.min(RAMP.length - 2, Math.floor(t)), f = t - i;
    const c = RAMP[i].map((x, k) => Math.round(x + (RAMP[i + 1][k] - x) * f));
    return { background: `rgb(${c.join(",")})`, color: v >= 50 ? "#fff" : "#0B1A33" };
  };
  function MediaMajor() {
    const rows = SW_DATA.media || [];
    const rated = rows.filter((m) => m.ages && m.ages["全年代"] != null).sort((a, b) => b.ages["全年代"] - a.ages["全年代"]);
    const [tipEl, onTip, offTip] = useTip();
    const [open, setOpen] = useState({});
    const src = rated[0] || {};
    return (
      <>
        <div className="sw-card sw-sec">
          <div className="sw-ch"><h2 className="sw-ct">{tx("年代別の利用率（日本）", "Usage by age group (Japan)")}</h2><span className="sw-sm">{src.users_src} <Ext url={src.users_url}>{tx("報告書", "Report")}</Ext><Badge v={!!src.users_verified} /></span></div>
          <div style={{ overflowX: "auto" }}>
            <table className="sw-heat" onMouseLeave={offTip}>
              <caption style={{ textAlign: "left", fontSize: 12, color: "var(--sub)", paddingBottom: 6 }}>{tx("利用している人の割合（％）。令和7年度調査、N=1,800", "Share of people who use each platform (%). FY2025 survey, N=1,800")}</caption>
              <thead><tr><th className="r">{tx("媒体", "Platform")}</th>{AGES.map((a) => <th key={a} scope="col">{ageLabel(a)}</th>)}</tr></thead>
              <tbody>
                {rated.map((m) => (
                  <tr key={m.name}>
                    <th className="r" scope="row">{m.short || m.name}</th>
                    {AGES.map((a) => {
                      const v = m.ages[a];
                      return <td key={a} className={a === "全年代" ? "all" : ""} style={v == null ? null : heat(v)} onMouseMove={(e) => onTip(e, tx(`${m.short || m.name}・${a}：${v}%`, `${m.short || m.name} · ${ageLabel(a)}: ${v}%`))}>{v == null ? "—" : v.toFixed(1)}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sw-legend"><span>0%</span><i /><span>100%</span><span style={{ marginLeft: 8 }}>{tx("太枠は全年代", "Bold column = all ages")}</span></div>
        </div>
        <div className="sw-g sw-g2">
          {rows.map((m, i) => (
            <div key={i} className="sw-card sw-mcard">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <h3 className="sw-ct" style={{ fontSize: 15.5 }}>{m.name}</h3>
                {m.ages && m.ages["全年代"] != null ? <div style={{ textAlign: "right", flexShrink: 0 }}><div className="sw-mrate">{m.ages["全年代"]}<span style={{ fontSize: 12 }}>%</span></div><div className="sw-sm" style={{ fontSize: 11 }}>{tx("全年代の利用率", "Usage, all ages")}</div></div> : <span className="sw-sm" style={{ flexShrink: 0 }}>{tx("利用率の統計なし", "No usage statistics")}</span>}
              </div>
              <Fit m={m} />
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink2)" }}>{m.formats}</p>
              <div><button className="sw-btn" onClick={() => setOpen({ ...open, [i]: !open[i] })} aria-expanded={!!open[i]}>{open[i] ? tx("閉じる", "Close") : tx("収益化・AI表示・酒類のルール", "Monetization, AI labels & alcohol rules")}</button></div>
              {open[i] ? (
                <div className="sw-det">
                  <div className="sw-sm">{tx("ここから下のルール", "Rules below")}<Badge v={m.verified} /></div>
                  <div><h4>{tx("ワイン発信では", "For wine content")}</h4><p>{m.fit_wine}</p></div>
                  <div><h4>{tx("歴史発信では", "For history content")}</h4><p>{m.fit_history}</p></div>
                  <div><h4>{tx("収益化", "Monetization")}</h4><ul>{(m.monetize || []).map((x, j) => <li key={j}>{x}</li>)}</ul>{m.monetize_url ? <Ext url={m.monetize_url}>{tx("参照ページ", "Reference page")}</Ext> : null}</div>
                  <div><h4>{tx("AI生成の表示", "AI-generated labels")}</h4><p>{m.ai_policy} <Ext url={m.ai_policy_url}>{tx("規約", "Terms")}</Ext></p></div>
                  <div><h4>{tx("酒類", "Alcohol")}</h4><p>{m.alcohol} <Ext url={m.alcohol_url}>{tx("規約", "Terms")}</Ext></p></div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {tipEl}
      </>
    );
  }
  function MediaEmerging() {
    const rows = SW_DATA.emerging_media || [];
    const kinds = Array.from(new Set(rows.map((r) => r.kind)));
    const [kind, setKind] = useState("all");
    const [open, setOpen] = useState({});
    const order = { "急成長": 0, "伸び始め": 1, "定着": 2 };
    const list = rows.map((r, i) => ({ ...r, i })).filter((r) => kind === "all" || r.kind === kind).sort((a, b) => ((order[a.stage] ?? 3) - (order[b.stage] ?? 3)) || ((b.users_m || 0) - (a.users_m || 0)));
    return (
      <>
        <div className="sw-note info sw-sec">{tx("「ブルーオーシャン」とは言い切れません。ここでは、利用者が伸びていることを示す数字と、発信者がまだ少ないと考える根拠を、出典とあわせて並べています。日本で使えるかどうかは媒体ごとに違います。", "We can't call these \"blue oceans\". This lists figures showing user growth and reasons to think there are still few creators, with sources. Whether each works in Japan varies by platform.")}</div>
        <div className="sw-tbar"><Seg value={kind} onChange={setKind} options={[["all", tx(`すべて ${rows.length}`, `All ${rows.length}`)], ...kinds.map((k) => [k, lbl(k)])]} /></div>
        <div className="sw-g sw-g2">
          {list.map((m) => (
            <div key={m.i} className="sw-card sw-mcard">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <div style={{ minWidth: 0 }}><h3 className="sw-ct" style={{ fontSize: 15.5 }}>{m.name}</h3><span className="sw-sm">{lbl(m.kind)}</span></div>
                <span className={"sw-pill sw-st-" + m.stage}>{lbl(m.stage)}</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 13.5, fontVariantNumeric: "tabular-nums" }}>{m.users}</div>
              {m.growth ? <div className="sw-sm"><b style={{ color: "var(--ink2)" }}>{tx("伸び", "Growth")}</b>{tx("　", " ")}{m.growth}</div> : null}
              <div className="sw-sm"><b style={{ color: "var(--ink2)" }}>{tx("日本", "Japan")}</b>{tx("　", " ")}{m.japan}</div>
              <Fit m={m} />
              <div className="sw-note info" style={{ padding: "8px 12px" }}><b>{tx("発信者が少ないと考える根拠　", "Why we think creators are few: ")}</b>{m.why_blue}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <button className="sw-btn" onClick={() => setOpen({ ...open, [m.i]: !open[m.i] })} aria-expanded={!!open[m.i]}>{open[m.i] ? tx("閉じる", "Close") : tx("収益化・規約・注意", "Monetization, terms & cautions")}</button>
                <span className="sw-sm">{m.source} <Ext url={m.url}>{tx("開く", "Open")}</Ext><Badge v={m.verified} /></span>
              </div>
              {open[m.i] ? (
                <div className="sw-det">
                  <div><h4>{tx("ワイン発信では", "For wine content")}</h4><p>{m.fit_wine}</p></div>
                  <div><h4>{tx("歴史発信では", "For history content")}</h4><p>{m.fit_history}</p></div>
                  <div><h4>{tx("収益化", "Monetization")}</h4><ul>{(m.monetize || []).map((x, j) => <li key={j}>{x}</li>)}</ul></div>
                  <div><h4>{tx("AI生成の表示", "AI-generated labels")}</h4><p>{m.ai_policy}</p></div>
                  <div><h4>{tx("酒類", "Alcohol")}</h4><p>{m.alcohol}</p></div>
                  {m.risk ? <div className="sw-note warn"><b>{tx("始める前に　", "Before you start: ")}</b>{m.risk}</div> : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </>
    );
  }
  function Media() {
    const [t, setT] = useState("major");
    return (
      <div>
        <Head kick={tx("01 調べる", "01 RESEARCH")} title={tx("媒体", "Platforms")} lede={tx("誰に届くかは利用率で、まだ空いているかは伸びと発信者の少なさで見ます。収益化・AI生成の表示・酒類の制限は媒体ごとに違い、よく変わるので、始める前に公式ヘルプで確かめてください。", "Usage rates show who you'll reach; growth and a shortage of creators show where there's still room. Monetization, AI labeling and alcohol limits differ by platform and change often, so check the official help before you start.")} />
        <MediaMatrix />
        <Tabs value={t} onChange={setT} options={[["major", tx("主要媒体", "Major platforms"), (SW_DATA.media || []).length], ["emerging", tx("伸び始めの媒体", "Rising platforms"), (SW_DATA.emerging_media || []).length]]} />
        {t === "major" ? <MediaMajor /> : <MediaEmerging />}
      </div>
    );
  }

  // ---------- 01 調べる：参考アカウント ----------
  // 役割は [日本語の説明, 色, 英語の説明]
  const ROLES = {
    "手本": ["企画・見せ方・つかみの参考にする", "#1D4ED8", "For ideas, presentation and hooks"],
    "情報源": ["一次情報・公式素材の出どころ。素材の利用は許諾を取る", "#047857", "Where primary information and official material come from. Get permission to use material"],
    "ノウハウ": ["AI動画・SNS運用・自動化の具体的な手順を学ぶ", "#7C3AED", "Learn concrete steps for AI video, social media and automation"],
    "協業候補": ["将来の取材・タイアップの相手。PR表示と年齢制限が必要", "#9D174D", "Future interview or tie-up partners. Needs ad disclosure and age limits"],
  };
  const RED_FLAGS_EN = [
    "Income claims with no period, breakdown or conditions (\"8 figures a month\", \"¥X00 million in sales\", \"¥400k a month in 30 min a day\")",
    "Claims that anyone can repeat it: \"anyone\", \"zero skills\", \"guaranteed\"",
    "Posts with no substance that just funnel you via comments or LINE sign-up perks into courses or calls",
    "Student counts, total sales or \"No. 1\" claims with no evidence",
    "Pressure to decide fast: \"closing soon\", \"only a few spots left\"",
  ];
  const RED_FLAGS = [
    "期間・内訳・条件のない収入額（「月8桁」「年商◯億」「1日30分で月40万」）",
    "「誰でも」「スキルゼロで」「確実に」と、再現できると断定する",
    "投稿に中身がなく、コメントやLINE登録の特典から講座・面談へ誘導するだけ",
    "受講生数・売上総額・「No.1」を根拠なしに掲げる",
    "「終了間近」「残りわずか」で決断を急がせる",
  ];
  function Accounts() {
    const A = SW_DATA.accounts || {};
    const rows = A.list || [];
    const [role, setRole] = useState("all");
    const [theme, setTheme] = useState("all");
    const themes = Array.from(new Set(rows.map((r) => r.theme)));
    const list = rows.filter((r) => (role === "all" || r.role === role) && (theme === "all" || r.theme === theme)).sort((a, b) => b.score - a.score);
    return (
      <div>
        <Head kick={tx("01 調べる", "01 RESEARCH")} title={tx("参考アカウント", "Reference accounts")} lede={tx(`フォロー中の${A.total || ""}件の候補を、このハブの計画との相性で5段階に採点し、3以上の${rows.length}件を載せています。プロフィールと投稿の読み取りによる推定で、実績や数字が本当かどうかは確かめていません。`, `${A.total || ""} followed accounts were scored 1–5 for fit with this hub's plan, and the ${rows.length} scoring 3 or more are listed. Scores are estimates from profiles and posts; claimed results and numbers have not been verified.`)} />
        <div className="sw-g sw-g4">
          {Object.entries(ROLES).map(([k, [d, c, de]]) => (
            <button key={k} onClick={() => setRole(role === k ? "all" : k)} aria-pressed={role === k} className="sw-card sw-kpi" style={{ boxShadow: role === k ? `0 0 0 2px ${c}` : undefined }}>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "100%" }}><b style={{ color: c }}>{lbl(k)}</b><span className="sw-kpi-n" style={{ fontSize: 22 }}>{rows.filter((r) => r.role === k).length}</span></span>
              <span className="sw-sm">{tx(d, de)}</span>
            </button>
          ))}
        </div>
        <div className="sw-tbar">
          <Seg value={theme} onChange={setTheme} options={[["all", tx("すべてのテーマ", "All themes")], ...themes.map((t) => [t, lbl(t)])]} />
          {role !== "all" ? <button className="sw-btn" onClick={() => setRole("all")}>{tx("役割の絞り込みを外す", "Clear role filter")}</button> : null}
          <span className="sw-sm" style={{ marginLeft: "auto" }}>{tx(`${list.length}件`, `${list.length} accounts`)}</span>
        </div>
        <div className="sw-g sw-g3">
          {list.map((r) => {
            const c = (ROLES[r.role] || [])[1] || "#566479";
            return (
              <div key={r.u} className="sw-acc" style={{ "--c": c }}>
                <div className="sw-acc-h">
                  <a className="sw-acc-u" href={`https://www.instagram.com/${r.u}/`} target="_blank" rel="noopener noreferrer">@{r.u}</a>
                  <span className="sw-score" title={tx(`相性 ${r.score} / 5`, `Fit ${r.score} / 5`)} aria-label={tx(`相性 ${r.score} / 5`, `Fit ${r.score} / 5`)}>{[1, 2, 3, 4, 5].map((k) => <i key={k} className={k <= r.score ? "on" : ""} />)}</span>
                </div>
                <div className="sw-sm" style={{ color: "var(--ink)" }}>{r.name}</div>
                <div className="sw-sm">{r.reason}</div>
                <div className="sw-sm" style={{ marginTop: "auto", display: "flex", gap: 8 }}><span className="sw-role">{lbl(r.role)}</span><span>{lbl(r.theme)}</span><span style={{ marginLeft: "auto" }}>{r.followers}</span></div>
              </div>
            );
          })}
        </div>
        <div className="sw-g sw-g2">
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("距離を置くべき発信の見分け方", "How to spot accounts to keep at a distance")}</h2></div>
            <p className="sw-sm" style={{ margin: "0 0 6px" }}>{tx("フォロー中にも、次の特徴を持つ副業系の発信が数十件ありました（アカウント名は載せません）。", "Dozens of the followed side-hustle accounts showed these signs (names not listed).")}</p>
            {tx(RED_FLAGS, RED_FLAGS_EN).map((t, i) => <div key={i} className="sw-fact" style={{ cursor: "default" }}><span style={{ color: "var(--ng)", fontWeight: 800 }}>×</span><span>{t}</span></div>)}
          </div>
          {A.gaps ? <div className="sw-card"><div className="sw-ch"><h2 className="sw-ct">{tx("フォロー先に足りないもの", "What the followed accounts lack")}</h2></div><p style={{ margin: 0, fontSize: 13.5 }}>{A.gaps}</p></div> : null}
        </div>
      </div>
    );
  }

  // ---------- 02 企画する ----------
  // ワインと歴史の企画を1つの一覧にまとめる。事実のチェックの鍵（kind/id/番号）は従来どおり。
  const KIND_INFO = { wine: ["ワイン", "#9D174D", "var(--wine)", "var(--wine-soft)"], history: ["歴史", "#0E7490", "var(--hist)", "var(--hist-soft)"] };
  const EPS = [];
  ["wine", "history"].forEach((kind) => ((SW_DATA[kind] || {}).episodes || []).forEach((e) => EPS.push({ ...e, kind })));
  const FORMATS = SW_DATA.formats || [];
  const FMT = Object.fromEntries(FORMATS.map((f) => [f.id, f]));
  const CASE_BY_NAME = Object.fromEntries((SW_DATA.global_cases || []).map((c) => [c.name, c]));
  const SCORES = SW_DATA.scores || {};
  const SERIES = SW_DATA.series || [];
  const PLAN = SW_DATA.plan || null;
  const LYR = ({ k, n }) => n ? <span className={"sw-lyr " + k} title={k === "l" ? tx(`ライト層への向き度 ${n} / 5`, `Fit for casual viewers ${n} / 5`) : tx(`コア層への向き度 ${n} / 5`, `Fit for core fans ${n} / 5`)}>{k === "l" ? tx("ライト", "Casual") : tx("コア", "Core")} {"★".repeat(n)}</span> : null;
  const AUD_OK = (e, lay) => { const a = e.aud; if (!a) return false; return lay === "l" ? a.l_fit >= 4 : lay === "c" ? a.c_fit >= 4 : lay === "lc" ? a.l_fit >= 4 && a.c_fit >= 4 : true; };
  const EP_PLAN = (() => { const m = {}; if (!PLAN) return m; (PLAN.arcs || []).forEach((a) => a.eps.forEach((id, i) => { m[id] = { arc: a, i: i + 1, n: a.eps.length }; })); (PLAN.weeks || []).forEach((w) => ["wine", "history"].forEach((k) => { if (w[k] && m[w[k].ep]) { m[w[k].ep].week = w.n; m[w[k].ep].start = w.start; } })); return m; })();
  const ST_TYPE = { "決断": "決断の瞬間", "瞬間": "出来事の瞬間", "解説": "解説型" };
  const Stars = ({ n }) => n ? <span className="sw-stars" title={tx(`その時度 ${n} / 5`, `"Moment" score ${n} / 5`)} aria-label={tx(`その時度 ${n} / 5`, `"Moment" score ${n} / 5`)}>{"★".repeat(n)}<span style={{ color: "#CBD5E1" }}>{"★".repeat(5 - n)}</span></span> : null;
  const stFit = (e) => (e.st && e.st.fit) || 0;
  const MD = (d) => { const m = /^-?\d+-(\d{2})-(\d{2})$/.exec(String(d || "")); return m ? [Number(m[1]), Number(m[2])] : null; };
  const SER = Object.fromEntries(SERIES.map((x) => [x.id, x]));
  const NETA = SW_DATA.neta || [];
  const NETA_KEY = "sw:neta:v1";
  const TIER_INFO = { S: ["公的・学術", "#047857"], A: ["事典・専門機関", "#1D4ED8"], B: ["報道・業界誌", "#0EA5E9"], C: ["Wikipedia・辞書", "#566479"], D: ["個人・まとめ・不明", "#92400E"] };
  const TIER_EN = { S: "Official & academic", A: "Encyclopedias & expert bodies", B: "News & trade press", C: "Wikipedia & dictionaries", D: "Personal, aggregator or unknown" };
  const tierName = (t) => tx(TIER_INFO[t][0], TIER_EN[t]);
  const VCLS = { "一致": "ok", "一部一致": "part", "不一致": "ng", "原文なし": "ng", "開けない": "part" };
  const VLAB = { "一致": "原文で一致", "一部一致": "原文で一部のみ一致", "不一致": "原文と食い違い", "原文なし": "原文に記述なし", "開けない": "原文を開けず" };
  const VLAB_EN = { "一致": "Matches original", "一部一致": "Partly matches original", "不一致": "Conflicts with original", "原文なし": "Not in original", "開けない": "Couldn't open original" };
  const VTag = ({ v }) => v && v.verdict ? <span className={"sw-vtag " + (VCLS[v.verdict] || "part")} title={[v.note, v.date ? tx(`確認日 ${v.date}`, `Checked ${v.date}`) : ""].filter(Boolean).join("　")}>{(UI_EN ? VLAB_EN : VLAB)[v.verdict] || v.verdict}{v.date ? tx(`（${v.date.slice(5).replace("-", "/")}）`, ` (${v.date.slice(5).replace("-", "/")})`) : ""}</span> : null;
  const TierTag = ({ t }) => t ? <span className="sw-tier-s" style={{ background: TIER_INFO[t][1] }} title={tx(`出典の段階 ${t}：${TIER_INFO[t][0]}`, `Source tier ${t}: ${TIER_EN[t]}`)}>{t}</span> : null;
  const sabShare = (e) => { const fs = e.facts || []; return fs.length ? Math.round(fs.filter((f) => "SAB".includes(f.tier || "D")).length / fs.length * 100) : 0; };
  const SRC_BY_NAME = { wine: Object.fromEntries(((SW_DATA.wine || {}).sources || []).map((x) => [x.name, x])), history: Object.fromEntries(((SW_DATA.history || {}).sources || []).map((x) => [x.name, x])) };
  const epArea = (e) => e.kind === "wine" ? "ワイン" : (e.area || "世界");
  const epYear = (e) => typeof e.year === "number" ? e.year : (e.kind === "history" && /^-?\d+$/.test(String(e.era || "")) ? Number(e.era) : null);
  const yearLabel = (y) => y == null ? "—" : y < 0 ? tx(`前${-y}`, `${-y} BC`) : String(y);
  const hashJ = (s, k) => { let h = 2166136261; for (const ch of s + k) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return ((h >>> 0) % 1000) / 1000 - 0.5; };
  const QUADS = [
    ["now", "今すぐ作る", "話題性が高く、根拠も固い", "#047857"],
    ["check", "裏取りしてから", "話題性は高いが、根拠が揺れやすい", "#92400E"],
    ["base", "シリーズの土台", "地味だが根拠が固く、積み上げに向く", "#1D4ED8"],
    ["later", "後回し", "話題性も根拠も弱め", "#566479"],
  ];
  const QUADS_EN = [
    ["now", "Make now", "High interest and solid evidence", "#047857"],
    ["check", "Verify first", "High interest, but the evidence is shaky", "#92400E"],
    ["base", "Series backbone", "Low-key but well sourced; good for building up", "#1D4ED8"],
    ["later", "Later", "Weaker on both interest and evidence", "#566479"],
  ];
  const quads = () => (UI_EN ? QUADS_EN : QUADS);
  const quadOf = (s) => !s ? null : s.appeal >= 5.5 ? (s.evidence >= 5.5 ? "now" : "check") : (s.evidence >= 5.5 ? "base" : "later");

  function EpChip({ e, onOpen }) {
    const [, c] = KIND_INFO[e.kind];
    return <button className="sw-epchip" style={{ "--c": c }} onClick={() => onOpen(e)} title={e.title}>{splitTitle(e.title)[0]}</button>;
  }

  function Matrix({ list, onOpen, compact }) {
    const [tipEl, onTip, offTip] = useTip();
    const pts = list.filter((e) => SCORES[e.id]);
    if (!pts.length) return <p className="sw-sm">{tx("採点データがまだありません。", "No scores yet.")}</p>;
    const W = 640, H = compact ? 300 : 420, L = 44, R = 14, T = 14, B = 40;
    const sx = (v) => L + (v - 0.5) / 10 * (W - L - R), sy = (v) => H - B - (v - 0.5) / 10 * (H - T - B);
    const mx = sx(5.5), my = sy(5.5);
    return (
      <div onMouseLeave={offTip}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={tx("企画の4象限（横：根拠の固さ、縦：話題性）", "Episode quadrants (x: evidence, y: interest)")} style={{ display: "block" }}>
          <rect x={mx} y={T} width={W - R - mx} height={my - T} fill="#ECFDF5" />
          <rect x={L} y={T} width={mx - L} height={my - T} fill="#FFFBEB" />
          <rect x={mx} y={my} width={W - R - mx} height={H - B - my} fill="#EFF6FF" />
          <rect x={L} y={my} width={mx - L} height={H - B - my} fill="#F8FAFC" />
          <line x1={mx} x2={mx} y1={T} y2={H - B} stroke="#CBD5E1" strokeDasharray="4 4" />
          <line x1={L} x2={W - R} y1={my} y2={my} stroke="#CBD5E1" strokeDasharray="4 4" />
          {[["now", W - R - 8, T + 18, "end"], ["check", L + 8, T + 18, "start"], ["base", W - R - 8, H - B - 10, "end"], ["later", L + 8, H - B - 10, "start"]].map(([q, x, y, a]) => {
            const Q = quads().find((z) => z[0] === q);
            return <text key={q} x={x} y={y} textAnchor={a} fontSize={compact ? 12 : 13} fontWeight="800" fill={Q[3]} fontFamily="Inter, sans-serif">{Q[1]}</text>;
          })}
          <text x={(L + W - R) / 2} y={H - 8} textAnchor="middle" fontSize="11.5" fill="#5A6880" fontFamily="Inter, sans-serif">{tx("根拠の固さ →（一次資料で裏が取りやすい）", "Evidence → (easier to back with primary sources)")}</text>
          <text x={14} y={(T + H - B) / 2} textAnchor="middle" fontSize="11.5" fill="#5A6880" fontFamily="Inter, sans-serif" transform={`rotate(-90 14 ${(T + H - B) / 2})`}>{tx("話題性 →", "Interest →")}</text>
          {pts.map((e) => {
            const s = SCORES[e.id];
            const x = sx(Math.max(1, Math.min(10, s.evidence + hashJ(e.id, "x") * 0.7))), y = sy(Math.max(1, Math.min(10, s.appeal + hashJ(e.id, "y") * 0.7)));
            return (
              <circle key={e.id} cx={x} cy={y} r={compact ? 5.5 : 7} fill={KIND_INFO[e.kind][1]} fillOpacity=".85" stroke="#fff" strokeWidth="2" style={{ cursor: "pointer" }}
                onMouseMove={(ev) => onTip(ev, tx(`${splitTitle(e.title)[0]}（話題性 ${s.appeal}・根拠 ${s.evidence}）`, `${splitTitle(e.title)[0]} (interest ${s.appeal} · evidence ${s.evidence})`))} onClick={() => onOpen(e)} />
            );
          })}
        </svg>
        <div className="sw-legend" style={{ marginTop: 4 }}>
          <span><span style={{ color: KIND_INFO.wine[1] }}>●</span> {tx("ワイン", "Wine")}</span><span><span style={{ color: KIND_INFO.history[1] }}>●</span> {tx("歴史", "History")}</span>
          <span>{tx("点に触れると題名、押すと企画が開きます", "Hover a dot for its title; click to open the episode")}</span>
        </div>
        {tipEl}
      </div>
    );
  }

  function Timeline({ list, onOpen }) {
    const [tipEl, onTip, offTip] = useTip();
    const BANDS = [[-300, 500, "古代"], [500, 1500, "中世"], [1500, 1800, "近世"], [1800, 1945, "近代"], [1945, 2030, "現代"]];
    const LANES = ["ワイン", "世界", "日本", "東アジア"];
    const W = 900, L = 70, R = 10, T = 26, LH = 54, H = T + LH * LANES.length + 8;
    const bw = (W - L - R) / BANDS.length;
    const xOf = (y) => { const i = BANDS.findIndex(([a, b]) => y >= a && y < b); const k = i < 0 ? (y < BANDS[0][0] ? 0 : BANDS.length - 1) : i; const [a, b] = BANDS[k]; return L + k * bw + Math.max(0, Math.min(1, (y - a) / (b - a))) * bw; };
    const pts = list.map((e) => ({ e, y: epYear(e), lane: LANES.indexOf(epArea(e)) })).filter((p) => p.y != null && p.lane >= 0);
    const noYear = list.filter((e) => epYear(e) == null);
    return (
      <div onMouseLeave={offTip}>
        <div style={{ overflowX: "auto" }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 560, display: "block" }} role="img" aria-label={tx("企画の年表", "Episode timeline")}>
            {BANDS.map(([a, b, n], i) => (
              <g key={n}>
                <rect x={L + i * bw} y={T - 22} width={bw} height={H - T + 22} fill={i % 2 ? "#F7F9FD" : "#fff"} />
                <text x={L + i * bw + bw / 2} y={T - 8} textAnchor="middle" fontSize="12" fontWeight="800" fill="#5A6880" fontFamily="Inter, sans-serif">{lbl(n)}<tspan fontWeight="400" fill="#566479">{tx("（", " (")}{yearLabel(a)}{tx("〜", "–")}{i === BANDS.length - 1 ? "" : yearLabel(b)}{tx("）", ")")}</tspan></text>
              </g>
            ))}
            {LANES.map((ln, i) => (
              <g key={ln}>
                <line x1={L} x2={W - R} y1={T + LH * i + LH / 2} y2={T + LH * i + LH / 2} stroke="#E2E8F1" />
                <text x={8} y={T + LH * i + LH / 2 + 4} fontSize="12" fontWeight="700" fill="#22324D" fontFamily="Inter, sans-serif">{lbl(ln)}</text>
              </g>
            ))}
            {pts.map(({ e, y, lane }) => (
              <circle key={e.id} cx={xOf(y)} cy={T + LH * lane + LH / 2 + hashJ(e.id, "t") * 26} r="6" fill={KIND_INFO[e.kind][1]} fillOpacity=".85" stroke="#fff" strokeWidth="2" style={{ cursor: "pointer" }}
                onMouseMove={(ev) => onTip(ev, `${yearLabel(y)}${tx("　", "  ")}${splitTitle(e.title)[0]}`)} onClick={() => onOpen(e)} />
            ))}
          </svg>
        </div>
        <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("時代ごとに同じ幅で並べています（年の間隔は時代によって違います）。点に触れると年と題名、押すと企画が開きます。", "Each era gets the same width (so the year scale differs by era). Hover a dot for its year and title; click to open the episode.")}{noYear.length ? tx(`年が定まらない${noYear.length}本は省いています。`, ` ${noYear.length} episodes without a definite year are left out.`) : ""}</p>
        {tipEl}
      </div>
    );
  }

  function FormatBoard({ list, onOpen }) {
    return (
      <div className="sw-g sw-g2">
        {FORMATS.map((f) => {
          const eps = list.filter((e) => (e.formats || []).includes(f.id));
          return (
            <div key={f.id} className="sw-card sw-mcard">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <h3 className="sw-ct" style={{ fontSize: 15.5 }}><span className="sw-fmt-id">{f.id}</span>{lbl(f.name)}</h3>
                <span className="sw-sm" style={{ flexShrink: 0 }}>{tx(`${eps.length}本`, `${eps.length} episodes`)}</span>
              </div>
              <div className="sw-chips"><span className="sw-chip">{f.length}</span><span className="sw-chip">{f.media}</span></div>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink2)" }}>{f.desc}</p>
              <div className="sw-note warn" style={{ padding: "8px 12px" }}><b>{tx("AIで作るときは　", "When making it with AI: ")}</b>{f.ai}</div>
              <div>
                <div className="sw-sm" style={{ fontWeight: 800, color: "var(--ink2)", marginBottom: 4 }}>{tx("海外・国内の手本", "Models abroad and in Japan")}</div>
                {(f.cases || []).map((n) => { const c = CASE_BY_NAME[n]; return c ? (
                  <div key={n} className="sw-casemini"><b>{c.name}</b><span className="sw-sm">{c.lesson}</span><span className="sw-sm">{c.source} <Ext url={c.url}>{tx("開く", "Open")}</Ext><Badge v={c.verified} /></span></div>
                ) : null; })}
              </div>
              {eps.length ? <div className="sw-chips">{eps.map((e) => <EpChip key={e.kind + e.id} e={e} onOpen={onOpen} />)}</div> : null}
            </div>
          );
        })}
      </div>
    );
  }

  // 記念日カレンダー：グレゴリオ暦の日付が分かる「その時」を月ごとに並べる（SNS で記念日に合わせて出すため）
  function StCalendar({ list, onOpen, months }) {
    const now = new Date(), cm = now.getMonth() + 1, cd = now.getDate();
    const rows = list.filter((e) => e.st && MD(e.st.date_greg)).map((e) => [e, ...MD(e.st.date_greg)]);
    const ms = months || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <>
        <p className="sw-sm" style={{ margin: "0 0 10px" }}>{tx(`グレゴリオ暦の年月日が事実で分かる「その時」${rows.length}本を、月日の順に並べました。旧暦・ユリウス暦の日付しか分からないものは載せていません。記念日に合わせて出すと、その日に検索・話題になりやすくなります。`, `${rows.length} "moments" with a known Gregorian date, in calendar order. Ones known only by lunisolar or Julian dates are left out. Posting on the anniversary helps them get searched and talked about that day.`)}</p>
        <div className="sw-cal">
          {ms.map((m) => { const rs = rows.filter(([, mm]) => mm === m).sort((a, b) => a[2] - b[2]); return (
            <div key={m} className={"sw-cal-m" + (m === cm ? " now" : "")}>
              <div className="sw-cal-h"><span>{tx(`${m}月${m === cm ? "（今月）" : ""}`, `${MONTH_EN[m - 1]}${m === cm ? " (this month)" : ""}`)}</span><span className="sw-sm">{tx(`${rs.length}本`, `${rs.length} episodes`)}</span></div>
              {rs.map(([e, , d]) => (
                <button key={e.kind + e.id} className={"sw-cal-r" + (m === cm && d === cd ? " today" : "")} onClick={() => onOpen(e)}>
                  <span className="sw-cal-d">{tx(`${d}日`, `${d}`)}</span>
                  <span style={{ minWidth: 0 }}><b style={{ fontSize: 14 }}>{splitTitle(e.title)[0]}</b><span className="sw-sm" style={{ display: "block" }}>{/^\d/.test(e.st.headline) ? "" : tx(`${String(e.st.date_greg).slice(0, 4).replace(/^0+/, "")}年・`, `${String(e.st.date_greg).slice(0, 4).replace(/^0+/, "")} · `)}{e.st.headline}</span></span>
                </button>
              ))}
              {!rs.length ? <div className="sw-sm" style={{ padding: "8px 14px" }}>{tx("この月の「その時」はまだありません。", "No \"moments\" in this month yet.")}</div> : null}
            </div>
          ); })}
        </div>
      </>
    );
  }

  // 企画帳の一覧で、シリーズごとに開閉できる束
  function EpGroup({ g, es, item, hasCur }) {
    const sig = useContext(FoldSig);
    const id = "grp:" + g.id;
    const [open, setOpen] = useState(() => hasCur || recalled(id, false));
    useEffect(() => { if (sig && sig.n) { setOpen(sig.open); remember(id, sig.open); } }, [sig && sig.n]);
    const now = es.filter((e) => quadOf(SCORES[e.id]) === "now").length;
    const gk = String(g.id)[0] === "W" ? "var(--wine)" : String(g.id)[0] === "H" ? "var(--hist)" : "var(--line)";
    return (
      <div className={"sw-grpl" + (open ? " open" : "")}>
        <button type="button" className="sw-grpl-h" style={{ "--gk": gk }} onClick={() => { setOpen(!open); remember(id, !open); }} aria-expanded={open} title={g.desc || ""}>
          <span className="sw-fold-c" aria-hidden="true" />
          <span className="sw-grpl-t">{lbl(g.name)}</span>
          <span className="sw-grpl-m">{tx(`${es.length}本${now ? `・今すぐ作る ${now}` : ""}`, `${es.length} episodes${now ? ` · make now ${now}` : ""}`)}</span>
        </button>
        {open ? es.map(item) : null}
      </div>
    );
  }

  function Plans({ checked, toggle, initial }) {
    const [view, setView] = useState("list");
    const [kind, setKind] = useState("all");
    const [area, setArea] = useState("all");
    const [fmt, setFmt] = useState("all");
    const [sort, setSort] = useState("series");
    const [ser, setSer] = useState("all");
    const [stt, setStt] = useState("all");
    const [lay, setLay] = useState("all");
    const [sel, setSel] = useState(initial || null);
    const [gsig, setGAll] = useFoldSig();
    const wide = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(min-width: 901px)").matches;
    const SORTS = { id: null, series: null, fit: (a, b) => (stFit(b) - stFit(a)) || (((SCORES[b.id] || {}).appeal || 0) - ((SCORES[a.id] || {}).appeal || 0)), quality: (a, b) => sabShare(b) - sabShare(a), appeal: (a, b) => ((SCORES[b.id] || {}).appeal || 0) - ((SCORES[a.id] || {}).appeal || 0), year: (a, b) => (epYear(a) ?? 9999) - (epYear(b) ?? 9999) };
    const list0 = EPS.filter((e) => (kind === "all" || e.kind === kind) && (area === "all" || epArea(e) === area) && (fmt === "all" || (e.formats || []).includes(fmt)) && (ser === "all" || e.series === ser) && (stt === "all" || (e.st && e.st.type === stt)) && (lay === "all" || AUD_OK(e, lay)));
    const list = SORTS[sort] ? list0.slice().sort(SORTS[sort]) : list0;
    const grouped = sort === "series";
    const byYear = (a, b) => (epYear(a) ?? 9999) - (epYear(b) ?? 9999);
    const groups = grouped ? [...SERIES.map((x) => [x, list.filter((e) => e.series === x.id).sort(byYear)]), [{ id: "etc", name: "その他", desc: "" }, list.filter((e) => !SER[e.series])]].filter(([, es]) => es.length) : [];
    const order = grouped ? groups.flatMap(([, es]) => es) : list;
    const cur = (sel && EPS.find((e) => e.kind + e.id === sel)) || (wide && view === "list" ? order[0] : null);
    const okCount = (e) => (e.facts || []).filter((f, j) => f.verified || checked[`${e.kind}/${e.id}/${j}`]).length;
    const open = (e) => { setView("list"); setSel(e.kind + e.id); if (!wide) { try { window.scrollTo({ top: 0 }); } catch (err) {} } };
    const areas = ["ワイン", "世界", "日本", "東アジア"].filter((a) => EPS.some((e) => epArea(e) === a));
    const qCount = (q) => list.filter((e) => quadOf(SCORES[e.id]) === q).length;
    const item = (e) => {
      const [t] = splitTitle(e.title), ok = okCount(e), all = (e.facts || []).length, q = quadOf(SCORES[e.id]);
      const [, c, kv, ks] = KIND_INFO[e.kind];
      return (
        <button key={e.kind + e.id} className={"sw-ep" + (cur && cur.kind + cur.id === e.kind + e.id ? " on" : "")} style={{ "--k": kv, "--k-soft": ks }} onClick={() => open(e)}>
          <span className="sw-ep-y" style={{ color: c }}>{yearLabel(epYear(e))}</span>
          <span style={{ minWidth: 0 }}>
            <span className="sw-ep-t">{t}</span>
            {e.st && e.st.headline ? <span className="sw-ep-h">{e.st.headline}</span> : null}
            <span className="sw-ep-p"><Stars n={stFit(e)} />{stFit(e) ? tx("　", "  ") : ""}{UI_EN
              ? `${e.aud ? `Casual ${e.aud.l_fit} · core ${e.aud.c_fit} · ` : ""}${grouped ? "" : `${lbl(epArea(e))} · `}facts ${ok}/${all} · sources ${sabShare(e)}%${q ? ` · ${QUADS_EN.find((z) => z[0] === q)[1]}` : ""}`
              : `${e.aud ? `ライト${e.aud.l_fit}・コア${e.aud.c_fit}・` : ""}${grouped ? "" : `${epArea(e)}・`}事実 ${ok}/${all}・出典 ${sabShare(e)}%${q ? `・${QUADS.find((z) => z[0] === q)[1]}` : ""}`}</span>
          </span>
        </button>
      );
    };
    return (
      <div>
        <Head kick={tx("02 企画する", "02 PLAN")} title={tx("企画帳", "Episode plans")} lede={tx(`ワインと歴史の企画${EPS.length}本。つかみ・事実・台本の骨組み・タイトル案・素材案に加え、海外の発信者の型と、その手本から得た学びを付けています。事実はまだ検索の要約でしか確かめていません。出典の原文と照らし合わせ、合っていたらチェックを付けてください。チェックした事実だけが台本に入ります。`, `${EPS.length} episode plans on wine and history, each with a hook, facts, a script outline, title ideas and visual ideas, plus formats from overseas creators and lessons from those models. Facts have only been checked against search summaries so far. Compare them with the original sources and tick the ones that match; only ticked facts go into scripts.`)} />
        <Tabs value={view} onChange={(v) => { setView(v); if (v !== "list") setSel(null); }} options={[["list", tx("一覧と詳細", "List & details"), list.length], ["cal", tx("記念日カレンダー", "Anniversary calendar"), EPS.filter((e) => e.st && MD(e.st.date_greg)).length], ["matrix", tx("4象限", "Quadrants"), null], ["timeline", tx("年表", "Timeline"), null], ["formats", tx("型で探す", "By format"), FORMATS.length]]} />
        <div className="sw-tbar">
          <Seg value={kind} onChange={(v) => { setKind(v); setSel(null); if (v === "wine") setArea("all"); }} options={[["all", tx(`すべて ${EPS.length}`, `All ${EPS.length}`)], ["wine", tx(`ワイン ${EPS.filter((e) => e.kind === "wine").length}`, `Wine ${EPS.filter((e) => e.kind === "wine").length}`)], ["history", tx(`歴史 ${EPS.filter((e) => e.kind === "history").length}`, `History ${EPS.filter((e) => e.kind === "history").length}`)]]} />
          <select className="sw-select" value={lay} onChange={(e) => { setLay(e.target.value); setSel(null); }} aria-label={tx("対象の層で絞り込む", "Filter by audience")}>
            <option value="all">{tx("対象の層：すべて", "Audience: all")}</option>
            <option value="l">{tx("ライト層向き（★4以上）", "For casual viewers (★4+)")}</option>
            <option value="c">{tx("コア層向き（★4以上）", "For core fans (★4+)")}</option>
            <option value="lc">{tx("両方に向く（★4以上）", "For both (★4+)")}</option>
          </select>
          <select className="sw-select" value={stt} onChange={(e) => { setStt(e.target.value); setSel(null); }} aria-label={tx("その時の型で絞り込む", "Filter by moment type")}>
            <option value="all">{tx("その時の型：すべて", "Moment type: all")}</option>
            {Object.entries(ST_TYPE).map(([k, l]) => <option key={k} value={k}>{tx(`${l}（${EPS.filter((e) => e.st && e.st.type === k).length}）`, `${lbl(l)} (${EPS.filter((e) => e.st && e.st.type === k).length})`)}</option>)}
          </select>
          <select className="sw-select" value={ser} onChange={(e) => { setSer(e.target.value); setSel(null); }} aria-label={tx("シリーズで絞り込む", "Filter by series")}>
            <option value="all">{tx("すべてのシリーズ", "All series")}</option>
            {SERIES.filter((x) => kind === "all" || x.kind === kind).map((x) => <option key={x.id} value={x.id}>{tx(`${x.name}（${EPS.filter((e) => e.series === x.id).length}）`, `${lbl(x.name)} (${EPS.filter((e) => e.series === x.id).length})`)}</option>)}
          </select>
          {kind !== "wine" ? <Seg value={area} onChange={(v) => { setArea(v); setSel(null); }} options={[["all", tx("全地域", "All regions")], ...areas.filter((a) => kind === "all" || a !== "ワイン").map((a) => [a, lbl(a)])]} /> : null}
          <select className="sw-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label={tx("並べ替え", "Sort")}>
            {UI_EN
              ? <><option value="series">Group by series</option><option value="fit">Best "moment" first</option><option value="id">By number</option><option value="quality">Best sources first</option><option value="appeal">Most interest first</option><option value="year">By year</option></>
              : <><option value="series">シリーズ別にまとめる</option><option value="fit">その時度が高い順</option><option value="id">番号順</option><option value="quality">出典の質が高い順</option><option value="appeal">話題性が高い順</option><option value="year">年代順</option></>}
          </select>
          <select className="sw-select" value={fmt} onChange={(e) => { setFmt(e.target.value); setSel(null); }} aria-label={tx("発信の型で絞り込む", "Filter by format")}>
            <option value="all">{tx("発信の型：すべて", "Format: all")}</option>
            {FORMATS.map((f) => <option key={f.id} value={f.id}>{f.id} {lbl(f.name)}</option>)}
          </select>
        </div>
        {view === "list" ? (
          <div className={"sw-plans" + (sel ? " has-sel" : "")}>
            <div className="sw-eplist">
              {grouped ? <div className="sw-eplist-bar"><span className="sw-sm">{tx(`${groups.length}シリーズ・${list.length}本`, `${groups.length} series · ${list.length} episodes`)}</span><FoldAll onSet={setGAll} /></div> : null}
              <FoldSig.Provider value={gsig}>
                {grouped ? groups.map(([g, es]) => <EpGroup key={g.id} g={g} es={es} item={item} hasCur={!!(cur && es.some((e) => e.kind + e.id === cur.kind + cur.id))} />) : list.map(item)}
              </FoldSig.Provider>
              {!list.length ? <div className="sw-sm" style={{ padding: 16 }}>{tx("条件に合う企画はありません。", "No episodes match.")}</div> : null}
            </div>
            <div className="sw-epdetail">{cur ? <Episode key={cur.kind + cur.id} e={cur} checked={checked} toggle={toggle} onBack={() => setSel(null)} /> : null}</div>
          </div>
        ) : null}
        {view === "matrix" ? (
          <>
            <div className="sw-card sw-sec">
              <div className="sw-ch"><h2 className="sw-ct">{tx("話題性 × 根拠の固さ", "Interest × evidence")}</h2><span className="sw-sm">{tx(`${list.filter((e) => SCORES[e.id]).length}本・仮採点`, `${list.filter((e) => SCORES[e.id]).length} episodes · provisional scores`)}</span></div>
              <Matrix list={list} onOpen={open} />
              <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("点数はAIによる仮採点で、目安です（各10点）。話題性＝知名度・意外性・検索されやすさ。根拠の固さ＝一次資料や定評ある資料で裏が取れる度合いと、学説の割れにくさ。詳細で採点の理由を確かめ、自分の判断で入れ替えてください。", "Scores are provisional AI ratings out of 10, as a rough guide. Interest = fame, surprise and searchability. Evidence = how well primary or respected sources back it up, and how settled the scholarship is. Check the reasons in each episode and re-rank with your own judgment.")}</p>
            </div>
            <div className="sw-g sw-g4">
              {quads().map(([q, n, d, c]) => (
                <div key={q} className="sw-card" style={{ borderTop: `3px solid ${c}` }}>
                  <div className="sw-ch" style={{ marginBottom: 4 }}><h3 className="sw-ct" style={{ color: c }}>{n}</h3><span className="sw-kpi-n" style={{ fontSize: 20 }}>{qCount(q)}</span></div>
                  <p className="sw-sm" style={{ margin: "0 0 8px" }}>{d}</p>
                  <div className="sw-chips">{list.filter((e) => quadOf(SCORES[e.id]) === q).sort((a, b) => (SCORES[b.id].appeal + SCORES[b.id].evidence) - (SCORES[a.id].appeal + SCORES[a.id].evidence)).map((e) => <EpChip key={e.kind + e.id} e={e} onOpen={open} />)}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
        {view === "cal" ? <StCalendar list={list} onOpen={open} /> : null}
        {view === "timeline" ? <div className="sw-card"><div className="sw-ch"><h2 className="sw-ct">{tx("企画の年表", "Episode timeline")}</h2><span className="sw-sm">{tx(`${list.length}本`, `${list.length} episodes`)}</span></div><Timeline list={list} onOpen={open} /></div> : null}
        {view === "formats" ? (
          <>
            <div className="sw-note info sw-sec">{tx("海外の事例から、副業で再現しやすい発信の型を8つに整理しました。型ごとに、手本の事例・AIで作るときの注意・その型が生きる企画を並べています。", "Eight formats drawn from overseas examples that are easy to reproduce as side work. Each lists model cases, cautions for making it with AI, and the episodes that suit it.")}</div>
            <FormatBoard list={list} onOpen={open} />
          </>
        ) : null}
      </div>
    );
  }

  const AXES = [["appeal", "話題性", "Interest"], ["evidence", "根拠の固さ", "Evidence"], ["ease", "作りやすさ", "Ease of making"], ["risk", "炎上・規制の注意度", "Backlash & regulatory risk"]];
  function Episode({ e, checked, toggle, onBack }) {
    const kind = e.kind;
    const [, , kv, ks] = KIND_INFO[kind];
    const [t, sub] = splitTitle(e.title);
    const fk = (j) => `${kind}/${e.id}/${j}`;
    const facts = (e.facts || []).map((f, j) => ({ ...f, j, ok: f.verified || !!checked[fk(j)] }));
    const okFacts = facts.filter((f) => f.ok);
    const s = SCORES[e.id];
    const sc = e.script;
    const fmts = (e.formats || []).map((id) => FMT[id]).filter(Boolean);
    const story = [
      [tx("0〜3秒 つかみ", "0–3 s hook"), e.hook],
      ...(kind === "history" ? [[tx("前提", "Setup"), e.before], [tx("転換点", "Turning point"), e.moment], [tx("その後", "Aftermath"), e.after]] : [[tx("展開", "Development"), e.angle]]),
      [tx("裏づけ", "Evidence"), okFacts.length ? okFacts.map((f) => `${f.t}（${f.src}）`).join(" ／ ") : tx("まだありません。「事実と出典」を原文で確かめ、チェックを付けると入ります。", "None yet. Check \"Facts & sources\" against the originals and tick them to add them here.")],
      [tx("締め", "Close"), kind === "history" ? tx("「もしこの瞬間が違っていたら？」と問いかけて終える", "End by asking: what if this moment had gone differently?") : tx("知るときに使える一言で終える", "End with a line viewers can take away and use")],
      [tx("概要欄", "Description"), tx("出典の一覧と、AIで作成した映像・音声であることの表示", "A list of sources and a note that the video and audio were made with AI")],
    ];
    const [sig, setAll] = useFoldSig();
    const st = e.st;
    const [ver, setVer] = useState(st ? "st60" : "s60");
    const [lyr, setLyr] = useState("l");
    const q = quadOf(s);
    const qd = q ? quads().find((z) => z[0] === q) : null;
    const sr = SER[e.series];
    const refs = (ns) => (ns || []).map((n) => facts[n] ? <span key={n} className={"sw-fref" + (facts[n].ok ? " ok" : "")} title={facts[n].t}>{n + 1}</span> : null);
    const aud = (l) => l.audited ? <span className="sw-aud" title={l.why || tx("台本の監査で直した行", "Line fixed in the script audit")}>{tx("監査で修正", "Fixed in audit")}</span> : null;
    const chars = (st ? st.script60 : sc ? sc.script60 : []).reduce((a, l) => a + String(l.line || "").length, 0);
    const sref = (k) => refs((st && st.refs && st.refs[k]) || []);
    let k = 0;
    return (
      <article className="sw-card sw-epd" style={{ "--k": kv, "--k-soft": ks }}>
        <button className="sw-btn sw-back" onClick={onBack}>{tx("← 一覧へ", "← Back to list")}</button>
        <div className="sw-kick" style={{ color: "var(--k)" }}>{kind === "history" ? `${yearLabel(epYear(e))}${tx("・", " · ")}${e.region || ""}` : `${tx("ワインの物語", "Wine story")}${e.place ? tx("・", " · ") + e.place : ""}${epYear(e) != null ? tx("・", " · ") + yearLabel(epYear(e)) : ""}`}</div>
        <h2 className="sw-h1" style={{ fontSize: 24, margin: "4px 0 2px" }}>{t}</h2>
        {sub ? <div className="sw-lede">{sub}</div> : null}
        <div className="sw-epsum">
          {sr ? <span className="sw-epsum-i"><small>{tx("シリーズ", "Series")}</small><b>{lbl(sr.name)}</b></span> : null}
          {qd ? <span className="sw-epsum-i"><small>{tx("判定（仮）", "Verdict (provisional)")}</small><b><i className="sw-dot" style={{ background: qd[3] }} />{qd[1]}</b></span> : null}
          <span className="sw-epsum-i"><small>{tx("出典の質", "Source quality")}</small><b>{tx("S〜B", "S–B")} {sabShare(e)}%</b></span>
          <span className="sw-epsum-i"><small>{tx("原文で確認", "Checked in original")}</small><b>{okFacts.length} / {facts.length}</b></span>
          {e.aud ? <span className="sw-epsum-i"><small>{tx("対象の層", "Audience")}</small><b style={{ display: "flex", gap: 4, flexWrap: "wrap" }}><LYR k="l" n={e.aud.l_fit} /><LYR k="c" n={e.aud.c_fit} /></b></span> : null}
          {EP_PLAN[e.id] ? <span className="sw-epsum-i"><small>{tx("発信プラン", "Publishing plan")}</small><b>{EP_PLAN[e.id].arc.title}{tx(`　${EP_PLAN[e.id].i}/${EP_PLAN[e.id].n}本目${EP_PLAN[e.id].week ? `・第${EP_PLAN[e.id].week}週` : ""}`, `  ${EP_PLAN[e.id].i}/${EP_PLAN[e.id].n}${EP_PLAN[e.id].week ? ` · week ${EP_PLAN[e.id].week}` : ""}`)}</b></span> : null}
        </div>
        {st ? (
          <div className="sw-st">
            <div className="sw-st-top"><span className="sw-st-when">{tx("その時　", "Moment: ")}{st.when}{st.where ? tx(`　${st.where}`, ` · ${st.where}`) : ""}{st.date_note ? tx(`（${st.date_note}）`, ` (${st.date_note})`) : ""}</span><span className="sw-st-type">{lbl(ST_TYPE[st.type] || st.type)}{tx("　", "  ")}<Stars n={st.fit} /></span></div>
            <div className="sw-st-hl">{st.headline}{sref("headline")}</div>
            {st.who ? <div className="sw-st-who">{tx("主人公　", "Protagonist: ")}<b>{st.who}</b>{sref("who")}</div> : null}
            <div className="sw-st-flow">
              <div><h5>{tx("懸かっていたもの", "What was at stake")}</h5><p>{st.stakes}{sref("stakes")}</p></div>
              <div><h5>{tx("迫られた選択", "The choice")}</h5><p>{st.choice}{sref("choice")}</p></div>
              <div className="m"><h5>{tx("その瞬間", "The moment")}</h5><p>{st.turn}{sref("turn")}</p></div>
              <div><h5>{tx("動いたもの", "What changed")}</h5><p>{st.moved}{sref("moved")}</p></div>
            </div>
            {st.ifnot ? <div className="sw-st-if">{tx("もしも　", "What if: ")}{st.ifnot}</div> : null}
          </div>
        ) : <blockquote className="sw-hook">{e.hook}</blockquote>}
        <div className="sw-epd-bar"><span className="sw-sm">{tx("見出しを押すと開閉できます", "Click a heading to open or close it")}</span><FoldAll onSet={setAll} /></div>
        <FoldSig.Provider value={sig}>
          <Fold id="ep:core" n={++k} title={tx("企画の芯", "Core of the episode")} meta={kind === "history" ? tx("その前・転換点・その後", "Before · turning point · after") : tx("切り口", "Angle")}>
            {kind === "history" ? (
              <div className="sw-tl">
                <div><h5>{tx("その前", "Before")}</h5><p>{e.before}</p></div>
                <div className="m"><h5>{tx("転換点", "Turning point")}</h5><p>{e.moment}</p></div>
                <div><h5>{tx("その後", "After")}</h5><p>{e.after}</p></div>
              </div>
            ) : <p style={{ fontSize: 14.5, margin: "0 0 12px", lineHeight: 1.8 }}>{e.angle}</p>}
            {e.people && e.people.length ? <p className="sw-sm" style={{ margin: "0 0 10px" }}><b style={{ color: "var(--ink2)" }}>{tx("人物", "People")}</b>{tx("　", " ")}{e.people.join("、")}</p> : null}
            {st && e.hook ? <p className="sw-sm" style={{ margin: "0 0 10px" }}><b style={{ color: "var(--ink2)" }}>{tx("解説型のつかみ", "Explainer hook")}</b>{tx("　", " ")}{e.hook}</p> : null}
            <div className="sw-chips">
              {(e.media || []).map((m) => <span key={m} className="sw-chip">{m}</span>)}
              {fmts.map((f) => <span key={f.id} className="sw-chip" style={{ background: "var(--blue-soft)", color: "var(--blue-d)", fontWeight: 700 }}>{f.id} {lbl(f.short)}</span>)}
            </div>
          </Fold>
          <Fold id="ep:facts" n={++k} title={tx("事実と出典", "Facts & sources")} meta={tx(`原文で確認 ${okFacts.length} / ${facts.length}`, `Checked ${okFacts.length} / ${facts.length}`)}>
            <div className="sw-bar" style={{ marginBottom: 4 }}><i style={{ width: `${facts.length ? okFacts.length / facts.length * 100 : 0}%` }} /></div>
            {facts.map((f) => (
              <label key={f.j} className="sw-fact" style={f.verified ? { cursor: "default" } : null}>
                <input type="checkbox" checked={f.ok} disabled={f.verified} onChange={() => toggle(fk(f.j))} aria-label={tx("原文で確認した", "Checked in the original")} />
                <span><b className="sw-fnum">{f.j + 1}</b><TierTag t={f.tier} />{f.t}<span className="sw-sm" style={{ display: "block" }}>{f.src} <Ext url={f.url}>{tx("開く", "Open")}</Ext><Badge v={f.ok} />{f.upgraded ? <span className="sw-up" title={(f.old_src ? tx(`格上げ前：${f.old_src}。`, `Before upgrade: ${f.old_src}. `) : "") + (f.up_note || "")}>{f.corrected ? tx("出典を格上げし文面を修正", "Source upgraded, wording fixed") : tx("出典を格上げ", "Source upgraded")}</span> : null}{f.url_est ? <span className="sw-up warn" title={tx("検索結果から出典ページを推定した。開いて該当の記述があるか確かめる", "Source page inferred from search results. Open it and confirm the passage is there")}>{tx("ページ要確認", "Check page")}</span> : null}{f.partial ? <span className="sw-up warn" title={tx(`新しい出典で確かめられたのは文の一部だけ。${f.up_note || ""}`, `The new source confirms only part of the sentence. ${f.up_note || ""}`)}>{tx("一部のみ裏づけ", "Partly supported")}</span> : null}{f.tier === "D" ? <span className="sw-up warn">{tx("出典が弱い", "Weak source")}</span> : null}{f.added_for_moment ? <span className="sw-up" style={{ background: "var(--blue-soft)", color: "var(--blue-d)" }} title={tx("「その時」を描くために、あとから調べて足した事実", "Fact researched later to portray the \"moment\"")}>{tx("その時のために追加", "Added for the moment")}</span> : null}{!f.url ? <span className="sw-up warn">{tx("出典ページ未特定", "Source page not identified")}</span> : null}<VTag v={f.v} />{f.t_old ? <span className="sw-up" title={tx(`直す前：${f.t_old}`, `Before: ${f.t_old}`)}>{tx("原文に合わせて修正", "Fixed to match the original")}</span> : null}</span>{f.v && f.v.note ? <span className="sw-sm" style={{ display: "block", color: "var(--ink2)" }}>{f.v.note}</span> : null}{f.v && (f.v.quote || []).length ? <span className="sw-vq" style={{ display: "block" }}>{tx("原文：", "Original: ")}{f.v.quote[0]}</span> : null}</span>
              </label>
            ))}
            {(e.caution || e.debate) ? <div className="sw-note warn" style={{ marginTop: 12 }}><b>{kind === "history" ? tx("学説が分かれる点・俗説　", "Disputed points & popular myths: ") : tx("俗説と事実の違い・注意　", "Myths vs. facts & cautions: ")}</b>{e.caution || e.debate}</div> : null}
          </Fold>
          <Fold id="ep:script" n={++k} title={tx("台本", "Script")} meta={st ? tx(`その時版 60秒 ${chars}字・3分 ${(st.beats3 || []).length}拍`, `Moment version: 60 s ${chars} chars · 3 min ${(st.beats3 || []).length} beats`) : sc ? tx(`60秒 ${chars}字・3分 ${(sc.beats3 || []).length}拍`, `60 s ${chars} chars · 3 min ${(sc.beats3 || []).length} beats`) : tx("骨組み", "Outline")}>
            {sc || st ? <div style={{ marginBottom: 10 }}><Seg value={ver} onChange={setVer} options={[...(st ? [["st60", tx("その時版 60秒", "Moment 60 s")], ["st3", tx("その時版 3分", "Moment 3 min")]] : []), ...(sc ? [["s60", st ? tx("解説版 60秒", "Explainer 60 s") : tx("60秒台本", "60 s script")], ["b3", st ? tx("解説版 3分", "Explainer 3 min") : tx("3分版の構成", "3 min structure")]] : []), ["bone", tx("骨組み", "Outline")]]} /></div> : null}
            {st && ver === "st60" ? (
              <div className="sw-script">
                {(st.script60 || []).map((l, j) => <div key={j}><span className="sw-script-t">{l.t}</span><span>{l.line}{refs(l.facts)}{aud(l)}</span></div>)}
              </div>
            ) : null}
            {st && ver === "st3" ? <div className="sw-story">{(st.beats3 || []).map((b, j) => <div key={j}><span>{b.t}　{b.beat}</span><span>{b.line}{refs(b.facts)}{aud(b)}</span></div>)}</div> : null}
            {sc && ver === "s60" ? (
              <div className="sw-script">
                {(sc.script60 || []).map((l, j) => <div key={j}><span className="sw-script-t">{l.t}</span><span>{l.line}{refs(l.facts)}{aud(l)}</span></div>)}
              </div>
            ) : null}
            {sc && ver === "b3" ? <div className="sw-story">{(sc.beats3 || []).map((b, j) => <div key={j}><span>{b.t}　{b.beat}</span><span>{b.line}{refs(b.facts)}{aud(b)}</span></div>)}</div> : null}
            {(!sc && !st) || ver === "bone" ? <div className="sw-story">{story.map(([a, b], j) => b ? <div key={j}><span>{a}</span><span>{b}</span></div> : null)}</div> : null}
            {st && (ver === "st60" || ver === "st3") ? <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("その時版は、冒頭で「その瞬間」に立ち会い、背景 → 迫られた選択 → 山場 → 動いたもの の順に進みます。事実にない場面・心情は描かず、分からないことは問いにしています。", "The moment version opens at the moment itself, then goes background → the choice → climax → what changed. It doesn't invent scenes or feelings beyond the facts; unknowns are posed as questions.")}</p> : null}
            {(sc || st) && ver !== "bone" ? <p className="sw-sm" style={{ margin: "8px 0 0" }}>{UI_EN
              ? <>Numbers show the facts each line relies on (numbered as in "Facts & sources"). <span className="sw-fref">1</span> not yet checked  <span className="sw-fref ok">1</span> checked. Don't publish lines that still carry unchecked numbers.</>
              : <>番号は、その行が頼る事実（「事実と出典」の番号）。<span className="sw-fref">1</span> 原文で未確認　<span className="sw-fref ok">1</span> 確認済み。未確認の番号が残る行は、そのまま公開しないでください。</>}</p> : null}
          </Fold>
          {e.aud ? (
            <Fold id="ep:aud" n={++k} title={tx("層別の作り方（ライト層・コア層）", "Versions by audience (casual · core)")} meta={tx(`ライト★${e.aud.l_fit}・コア★${e.aud.c_fit}`, `Casual ★${e.aud.l_fit} · core ★${e.aud.c_fit}`)}>
              <div style={{ marginBottom: 10 }}><Seg value={lyr} onChange={setLyr} options={[["l", tx("ライト層向け（入口）", "For casual viewers (entry)")], ["c", tx("コア層向け（深掘り）", "For core fans (deep dive)")]]} /></div>
              {lyr === "l" ? (
                <>
                  <div className="sw-bighook">{e.aud.l_hook}</div>
                  <p className="sw-one">{tx("持ち帰る一言：", "Takeaway: ")}{e.aud.l_one}</p>
                  <div className="sw-sub-h">{tx("15〜30秒ショート", "15–30 s short")}</div>
                  <div className="sw-script">{(e.aud.l_short || []).map((l, j) => <div key={j}><span className="sw-script-t">{j + 1}</span><span>{l.line}{refs(l.facts)}{aud(l)}</span></div>)}</div>
                  <div className="sw-sub-h">{tx("カルーセル（5枚）", "Carousel (5 slides)")}</div>
                  <div className="sw-slides">{(e.aud.l_carousel || []).map((x, j) => <div key={j} className="sw-slide"><small>{tx(`${j + 1}枚目`, `Slide ${j + 1}`)}</small><b>{x.h}</b><span>{x.b}{refs(x.facts)}</span></div>)}</div>
                  {(e.aud.l_words || []).length ? <><div className="sw-sub-h">{tx("言葉のやさしい言い換え", "Plain-language rewordings")}</div>{e.aud.l_words.map((w, j) => <div key={j} className="sw-sm" style={{ color: "var(--ink2)" }}>・<b>{w.term}</b>：{w.plain}</div>)}</> : null}
                </>
              ) : (
                <>
                  <div className="sw-note info" style={{ marginBottom: 10 }}><b>{tx("論点の問い　", "Key question: ")}</b>{e.aud.c_q}</div>
                  <div className="sw-sub-h">{tx("長尺の章立て（8〜12分）", "Long-form chapters (8–12 min)")}</div>
                  <div className="sw-outl">{(e.aud.c_outline || []).map((x, j) => <div key={j}><span className="sw-outl-t">{x.t}</span><div><b>{x.ch}</b>{refs(x.facts)}{aud(x)}<ul>{(x.pts || []).map((p, q) => <li key={q}>{p}</li>)}</ul></div></div>)}</div>
                  <div className="sw-sub-h">{tx("画面に出す資料", "Documents to show on screen")}</div>
                  <div className="sw-chips">{(e.aud.c_sources || []).map((x) => <span key={x} className="sw-chip">{x}</span>)}</div>
                  <div className="sw-sub-h">{tx("論点", "Points of debate")}</div>
                  {(e.aud.c_debate || []).map((x, j) => <div key={j} className="sw-sm" style={{ color: "var(--ink2)" }}>・{x}</div>)}
                  <div className="sw-sub-h">{tx("note 記事の見出し", "note article headings")}</div>
                  {(e.aud.c_note || []).map((x, j) => <div key={j} style={{ fontSize: 14, fontWeight: 700 }}>{j + 1}. {x}</div>)}
                </>
              )}
              {e.aud.audit ? <div className="sw-note info" style={{ marginTop: 10 }}><b>{tx("層別パックの監査　", "Audience pack audit: ")}</b>{e.aud.audit}</div> : null}
            </Fold>
          ) : null}
          {sc ? (
            <Fold id="ep:check" n={++k} title={tx("公開前チェック", "Pre-publish check")} meta={tx(`最優先で照合 ${(sc.check_first || []).length}件`, `${(sc.check_first || []).length} top-priority checks`)} def={false}>
              <div className="sw-sub-h">{tx("最優先で照合する事実", "Facts to check first")}</div>
              <div className="sw-note warn">{(sc.check_first || []).map((n) => facts[n] ? <div key={n}>・{n + 1}. {facts[n].t}</div> : null)}</div>
              <div className="sw-sub-h">{tx("確かめ先", "Where to check")}</div>
              <div className="sw-note info">{(sc.verify_at || []).length ? sc.verify_at.map((nm) => { const src = SRC_BY_NAME[kind][nm]; return <div key={nm}>・{src && src.url ? <Ext url={src.url}>{nm}</Ext> : nm}{src ? `（${src.tier}）` : ""}</div>; }) : <div>{tx("情報源の一覧に合うものがありません。事実ごとの出典から当たってください。", "Nothing matches the source list; work from each fact's own source.")}</div>}</div>
              {sc.disclosure ? <><div className="sw-sub-h">{tx("概要欄の文案", "Draft description")}</div><div className="sw-fmtbox"><div style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>{[].concat(sc.disclosure).join("\n")}</div>{kind === "wine" ? <div className="sw-sm" style={{ marginTop: 6, color: "#7A3E06" }}>{tx("＋ 酒類の注意表示を必ず添える（例：「20歳未満の飲酒は法律で禁止されています。」）。各SNSで年齢制限の設定も行う。", "+ Always add the alcohol notice (e.g. 「20歳未満の飲酒は法律で禁止されています。」), and set age restrictions on each platform.")}</div> : null}</div></> : null}
            </Fold>
          ) : null}
          <Fold id="ep:titles" n={++k} title={tx("タイトル案と素材", "Title ideas & visuals")} meta={tx(`タイトル ${(e.titles || []).length + ((st && st.titles) || []).length}・素材 ${(e.visuals || []).length}`, `Titles ${(e.titles || []).length + ((st && st.titles) || []).length} · visuals ${(e.visuals || []).length}`)} def={false}>
            {st && (st.titles || []).length ? <><div className="sw-sub-h">{tx("その時型のタイトル案", "Moment-style title ideas")}</div>{st.titles.map((x, j) => <div key={j} className="sw-fact" style={{ cursor: "default", gridTemplateColumns: "24px 1fr" }}><span className="sw-todo-n" style={{ width: 22, height: 22, fontSize: 11.5 }}>{j + 1}</span><span style={{ fontWeight: 700 }}>{x}</span></div>)}</> : null}
            {st && (st.staging || []).length ? <><div className="sw-sub-h">{tx("演出メモ（台本ではありません）", "Staging notes (not part of the script)")}</div>{st.staging.map((x, j) => <div key={j} className="sw-sm" style={{ color: "var(--ink2)" }}>・{x}</div>)}</> : null}
            {(e.titles || []).length ? <><div className="sw-sub-h">{st ? tx("解説型のタイトル案", "Explainer title ideas") : tx("タイトル案", "Title ideas")}</div>{e.titles.map((x, j) => <div key={j} className="sw-fact" style={{ cursor: "default", gridTemplateColumns: "24px 1fr" }}><span className="sw-todo-n" style={{ width: 22, height: 22, fontSize: 11.5 }}>{j + 1}</span><span style={{ fontWeight: 700 }}>{x}</span></div>)}</> : null}
            {(e.visuals || []).length ? <><div className="sw-sub-h">{tx("映像・画像の素材案", "Footage & image ideas")}</div>{e.visuals.map((v, j) => <div key={j} className="sw-tool"><span><b>{v.what}</b></span><span className="sw-sm" style={{ color: "var(--ink2)" }}>{v.source_hint}</span></div>)}</> : null}
          </Fold>
          {fmts.length ? (
            <Fold id="ep:fmt" n={++k} title={tx("発信の型と海外の手本", "Formats & overseas models")} meta={fmts.map((f) => f.id).join(tx("・", " · "))} def={false}>
              {e.format_note ? <p className="sw-sm" style={{ margin: "0 0 8px" }}>{e.format_note}</p> : null}
              {fmts.map((f) => (
                <div key={f.id} className="sw-fmtbox">
                  <div><b>{f.id} {lbl(f.name)}</b><span className="sw-sm">{tx(`　${f.length}・${f.media}`, `  ${f.length} · ${f.media}`)}</span></div>
                  {(f.cases || []).map((n) => { const c = CASE_BY_NAME[n]; return c ? <div key={n} className="sw-sm" style={{ marginTop: 4 }}><b style={{ color: "var(--ink2)" }}>{c.name}</b>{tx("：", ": ")}{c.lesson} <Ext url={c.url}>{tx("出典", "Source")}</Ext></div> : null; })}
                  <div className="sw-sm" style={{ marginTop: 4, color: "#7A3E06" }}>{tx("AIで作るときは：", "When making it with AI: ")}{f.ai}</div>
                </div>
              ))}
            </Fold>
          ) : null}
          {s ? (
            <Fold id="ep:score" n={++k} title={tx("採点（仮）", "Scores (provisional)")} meta={tx(`話題性 ${s.appeal}・根拠 ${s.evidence}・作りやすさ ${s.ease}・注意 ${s.risk}`, `Interest ${s.appeal} · evidence ${s.evidence} · ease ${s.ease} · caution ${s.risk}`)} def={false}>
              <div className="sw-scores">
                {AXES.map(([key, l, le]) => <div key={key}><span className="sw-sm">{tx(l, le)}</span><span className="sw-bar"><i style={{ width: `${(s[key] || 0) * 10}%`, background: key === "risk" ? "var(--warn)" : "var(--blue)" }} /></span><b>{s[key]}</b></div>)}
                {s.why ? <p className="sw-sm" style={{ margin: "4px 0 0", gridColumn: "1/-1" }}>{tx("採点の理由（仮）：", "Reasoning (provisional): ")}{s.why}</p> : null}
              </div>
            </Fold>
          ) : null}
          <Fold id="ep:log" n={++k} title={tx("見直しと監査の記録", "Review & audit log")} meta={tx(`直した点 ${(e.review || []).length}件${sc && sc.audit_n ? `・台本 ${sc.audit_n}行` : ""}`, `${(e.review || []).length} fixes${sc && sc.audit_n ? ` · ${sc.audit_n} script lines` : ""}`)} def={false}>
            {(e.review || []).length ? <div className="sw-note ng"><b>{tx("見直しで直した点", "Fixed in review")}</b>{e.review.map((r, j) => <div key={j}>・{r}</div>)}</div> : <p className="sw-sm" style={{ margin: 0 }}>{tx("見直しで直した点はありません。", "No fixes from review.")}</p>}
            {sc && sc.audit ? <div className="sw-note info" style={{ marginTop: 10 }}><b>{tx("台本の監査　", "Script audit: ")}</b>{sc.audit}</div> : null}
            {st && st.audit ? <div className="sw-note info" style={{ marginTop: 10 }}><b>{tx("その時版の監査　", "Moment version audit: ")}</b>{st.audit}</div> : null}
            {st && (st.needs || []).length ? <div className="sw-note warn" style={{ marginTop: 10 }}><b>{tx("「その時」を強めるために調べたいこと", "To research to strengthen the \"moment\"")}</b>{st.needs.map((x, j) => <div key={j}>・{x}</div>)}</div> : null}
          </Fold>
        </FoldSig.Provider>
      </article>
    );
  }

  // ---------- 02 企画する：発信プラン（誰に・どの順番で・どの形で） ----------
  function EpLink({ id, onOpen }) {
    const e = EPS.find((x) => x.id === id);
    if (!e) return null;
    const [, c] = KIND_INFO[e.kind];
    return <button className="sw-epchip" style={{ "--c": c }} onClick={() => onOpen(e)} title={e.st ? e.st.headline : e.title}>{splitTitle(e.title)[0]}{e.aud ? <span style={{ fontWeight: 600, color: "var(--sub)" }}>{tx(`　L${e.aud.l_fit}・C${e.aud.c_fit}`, `  L${e.aud.l_fit} · C${e.aud.c_fit}`)}</span> : null}</button>;
  }
  function PlanPage({ openEp, go }) {
    const [sig, setAll] = useFoldSig();
    if (!PLAN) return <div><Head kick={tx("02 企画する", "02 PLAN")} title={tx("発信プラン", "Publishing plan")} lede={tx("計画のデータがありません。", "No plan data.")} /></div>;
    const P = PLAN;
    const arcT = Object.fromEntries(P.arcs.map((a) => [a.id, a]));
    const months = [];
    P.weeks.forEach((w) => { const m = w.start.slice(0, 7); let g = months.find((x) => x[0] === m); if (!g) { g = [m, []]; months.push(g); } g[1].push(w); });
    const md = (iso) => `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}`;
    const KC = { wine: "var(--wine)", history: "var(--hist)" };
    const nowM = new Date().toISOString().slice(0, 7);
    return (
      <div>
        <Head kick={tx("02 企画する", "02 PLAN")} title={tx("発信プラン", "Publishing plan")} lede={tx("誰に向けて、どの順番で、どの形で出すかの1年の計画です。層の定義・頻度・測る数字は仮説で、公開後の数字でフェーズごとに見直します。", "A one-year plan for whom to reach, in what order and in which formats. Audience definitions, frequency and metrics are hypotheses, reviewed each phase against real numbers after launch.")} />
        <div className="sw-note info sw-sec"><b>{tx("骨組みは3つ　", "Three pillars: ")}</b>{tx("①ライト層を短い動画とカルーセルで集め、コア層を長尺と note で深める。②1つの企画から6つの形を、いちばん詳しいコア版から作って切り出す。③物語の順番を決めたシリーズを、毎週ワイン1本・歴史1本ずつ進め、記念日には該当の回を差し込む。", "① Draw casual viewers with short videos and carousels, and deepen core fans with long-form and note. ② Make six formats from each episode, starting from the most detailed core version and cutting it down. ③ Run series in a set story order, one wine and one history episode a week, slotting in the matching episode on anniversaries.")}</div>
        <div className="sw-epd-bar"><span className="sw-sm">{tx("見出しを押すと開閉できます", "Click a heading to open or close it")}</span><FoldAll onSet={setAll} /></div>
        <FoldSig.Provider value={sig}>
          <Fold id="plan:who" n={1} title={tx("狙う層", "Target audiences")} meta={tx("ワイン・歴史 × ライト・コア", "Wine · history × casual · core")}>
            <div className="sw-g sw-g2" style={{ marginBottom: 0 }}>
              {P.personas.map((p) => (
                <div key={p.id} className="sw-persona" style={{ "--c": p.layer === "light" ? "#F59E0B" : "#4F46E5" }}>
                  <h4><span className={"sw-lyr " + (p.layer === "light" ? "l" : "c")} style={{ marginRight: 8 }}>{p.layer === "light" ? tx("ライト", "Casual") : tx("コア", "Core")}</span>{p.name}</h4>
                  <div style={{ fontSize: 14 }}>{p.who}</div>
                  <dl className="sw-kv">
                    <dt>{tx("求めるもの", "Wants")}</dt><dd>{p.needs.join("／")}</dd>
                    <dt>{tx("出す形", "Formats")}</dt><dd>{p.formats.join("／")}</dd>
                    <dt>{tx("語り口", "Tone")}</dt><dd>{p.tone}</dd>
                    <dt>{tx("避ける", "Avoid")}</dt><dd>{p.avoid.join("／")}</dd>
                    <dt>{tx("確かめ方", "How to check")}</dt><dd>{p.check}</dd>
                  </dl>
                </div>
              ))}
            </div>
          </Fold>
          <Fold id="plan:produce" n={2} title={tx("1つの企画から6つの形を作る順番", "Order for making six formats from one episode")} meta={tx("深い方から浅い方へ", "From deepest to lightest")}>
            {P.produce.map(([t, dsc, l], i) => <div key={i} className="sw-todo" style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}><div><b style={{ fontSize: 14.5 }}>{t}</b><div className="sw-sm">{dsc}</div></div><span className="sw-chip">{l}</span></div>)}
          </Fold>
          <Fold id="plan:funnel" n={3} title={tx("公開の流れと頻度", "Publishing flow & frequency")} meta={tx("入口 → 橋渡し → 深掘り → 関係", "Entry → bridge → deep dive → relationship")}>
            <div className="sw-funnel">{P.funnel.map((f, i) => <div key={i}><span className="sw-sm" style={{ fontWeight: 800 }}>{i + 1}. {lbl(f.layer)}</span><b>{f.stage}</b><div style={{ fontSize: 13.5, margin: "4px 0" }}>{f.what}</div><div className="sw-sm">{tx("ねらい：", "Aim: ")}{f.aim}</div><div className="sw-sm">{tx("測る：", "Measure: ")}{f.measure}</div></div>)}</div>
          </Fold>
          <Fold id="plan:phase" n={4} title={tx("進め方（フェーズ0〜4）", "Roadmap (phases 0–4)")} meta={`${P.phases[0].from.slice(0, 7)}${tx("〜", "–")}${P.phases[P.phases.length - 1].to.slice(0, 7)}`}>
            {P.phases.map((p) => (
              <div key={p.n} className="sw-ph">
                <h4>{tx(`フェーズ${p.n}　${p.name}`, `Phase ${p.n}: ${p.name}`)}<span className="sw-sm" style={{ marginLeft: 8, fontWeight: 600 }}>{p.from}{tx("〜", "–")}{p.to}</span></h4>
                <div style={{ fontSize: 14 }}>{tx("ねらい：", "Aim: ")}{p.goal}</div>
                <ul>{p.do.map((x, i) => <li key={i}>{x}</li>)}</ul>
                <div className="sw-sm"><b style={{ color: "var(--ink2)" }}>{tx("次へ進む目安", "When to move on")}</b>{tx("　", " ")}{p.next}</div>
              </div>
            ))}
          </Fold>
          <Fold id="plan:arcs" n={5} title={tx("シリーズの物語（並べる順番と理由）", "Series storylines (order and why)")} meta={tx(`${P.arcs.length}シリーズ・${P.arcs.reduce((a, x) => a + x.eps.length, 0)}本`, `${P.arcs.length} series · ${P.arcs.reduce((a, x) => a + x.eps.length, 0)} episodes`)}>
            {["wine", "history"].map((kd) => (
              <div key={kd}>
                <div className="sw-sub-h">{kd === "wine" ? tx("ワイン", "Wine") : tx("歴史", "History")}</div>
                {P.arcs.filter((a) => a.kind === kd).map((a) => (
                  <div key={a.id} className="sw-arc" style={{ "--c": KC[kd] }}>
                    <b style={{ fontSize: 15.5 }}>{a.title}</b><span className="sw-sm">{tx(`　${a.eps.length}本`, `  ${a.eps.length} episodes`)}</span>
                    <div className="sw-sm" style={{ color: "var(--ink2)", marginTop: 2 }}>{a.story}</div>
                    <div className="sw-arc-eps">{a.eps.map((id, i) => <React.Fragment key={id}>{i ? <i>→</i> : null}<EpLink id={id} onOpen={openEp} /></React.Fragment>)}</div>
                  </div>
                ))}
              </div>
            ))}
            <div className="sw-sub-h">{tx("ワイン×歴史の交差回", "Wine × history crossover episodes")}</div>
            {P.cross.map(([a, b, t], i) => <div key={i} className="sw-sm" style={{ color: "var(--ink2)", margin: "4px 0" }}>・{t}　<EpLink id={a} onOpen={openEp} /><EpLink id={b} onOpen={openEp} /></div>)}
          </Fold>
          <Fold id="plan:weeks" n={6} title={tx("週ごとの公開表", "Weekly schedule")} meta={tx(`${P.weeks.length}週・特集はワイン1本＋歴史1本／週`, `${P.weeks.length} weeks · features: 1 wine + 1 history a week`)} def={false}>
            {M1 && go ? <div className="sw-note info" style={{ margin: "0 0 10px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}><span><b>{tx(`第1〜${M1.weeks.length}週は台本があります　`, `Weeks 1–${M1.weeks.length} have scripts: `)}</b>{tx("ナレーション・画面の文字・映像・概要欄・公開前チェックまで", "narration, on-screen text, footage, description and pre-publish checks")}</span><button className="sw-btn" onClick={() => go("m1")}>{tx("台本を開く", "Open scripts")}</button></div> : null}
            <p className="sw-sm" style={{ margin: "0 0 8px" }}>{tx("各週の特集企画から、ショート（15〜30秒と60秒）・カルーセル・3分版を作ります。長尺と note は、ワインと歴史を週ごとに入れ替えます（長尺はフェーズ1の第4週から、note はフェーズ2から）。記念日の欄は、その週に記念日がある企画で、ショートを1本差し込みます。", "From each week's featured episodes, make shorts (15–30 s and 60 s), a carousel and a 3-minute version. Long-form and note alternate between wine and history each week (long-form from week 4 of phase 1, note from phase 2). The anniversary column adds one short for an episode whose anniversary falls that week.")}</p>
            {months.map(([m, ws], mi) => (
              <Fold key={m} id={"plan:m:" + m} title={tx(`${Number(m.slice(0, 4))}年${Number(m.slice(5, 7))}月`, `${MONTH_EN[Number(m.slice(5, 7)) - 1]} ${Number(m.slice(0, 4))}`)} meta={tx(`${ws.length}週・フェーズ${[...new Set(ws.map((w) => w.phase))].join("・")}`, `${ws.length} weeks · phase ${[...new Set(ws.map((w) => w.phase))].join(", ")}`)} def={m === nowM || (mi === 0 && !months.some(([x]) => x === nowM))}>
                {ws.map((w) => (
                  <div key={w.n} className="sw-wk">
                    <div><div style={{ fontWeight: 800 }}>{tx(`第${w.n}週`, `Week ${w.n}`)}</div><div className="sw-wk-h">{tx(`${md(w.start)}〜・フェーズ${w.phase}`, `From ${md(w.start)} · phase ${w.phase}`)}</div></div>
                    <div><div className="sw-wk-h">{tx("歴史の特集", "History feature")}{w.history ? tx(`（${arcT[w.history.arc].title}）`, ` (${arcT[w.history.arc].title})`) : ""}</div>{w.history ? <EpLink id={w.history.ep} onOpen={openEp} /> : "—"}</div>
                    <div><div className="sw-wk-h">{tx("ワインの特集", "Wine feature")}{w.wine ? tx(`（${arcT[w.wine.arc].title}）`, ` (${arcT[w.wine.arc].title})`) : ""}</div>{w.wine ? <EpLink id={w.wine.ep} onOpen={openEp} /> : "—"}</div>
                    <div>
                      <div className="sw-wk-h">{tx("長尺：", "Long-form: ")}{w.long ? "" : "—"}{w.long ? <EpLink id={w.long} onOpen={openEp} /> : null}</div>
                      <div className="sw-wk-h">{tx("note：", "note: ")}{w.note ? "" : "—"}{w.note ? <EpLink id={w.note} onOpen={openEp} /> : null}</div>
                      {w.anniv.length ? <div className="sw-wk-h">{tx("記念日：", "Anniversaries: ")}{w.anniv.map((a) => <span key={a.ep} style={{ display: "inline-block" }}>{md(a.date)} <EpLink id={a.ep} onOpen={openEp} /></span>)}</div> : null}
                    </div>
                  </div>
                ))}
              </Fold>
            ))}
            {(P.rest || []).length ? <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx(`シリーズに入れていない${P.rest.length}本は、記念日の回や、反応を見て足す控えとして使います。`, `The ${P.rest.length} episodes outside any series are kept in reserve for anniversaries or to add based on audience response.`)}</p> : null}
          </Fold>
          <Fold id="plan:weekly" n={7} title={tx("1週間の作業の流れ", "Weekly workflow")} def={false}>
            {P.weekly.map(([d, t], i) => <div key={i} className="sw-todo" style={{ gridTemplateColumns: "52px 1fr" }}><span className="sw-todo-n" style={{ width: 44 }}>{dowL(d)}</span><span style={{ fontSize: 14 }}>{t}</span></div>)}
          </Fold>
          <Fold id="plan:measure" n={8} title={tx("測り方と見直しのルール", "Metrics & review rules")} def={false}>
            {P.measure.map(([l, m, r], i) => <div key={i} className="sw-rule"><b>{l}</b><div className="sw-sm" style={{ color: "var(--ink2)" }}>{tx("測る：", "Measure: ")}{m}</div><div className="sw-sm">{tx("見直し：", "Review: ")}{r}</div></div>)}
          </Fold>
        </FoldSig.Provider>
        <p className="sw-sm" style={{ marginTop: 10 }}>{P.note}</p>
      </div>
    );
  }

  // ---------- 03 作る：第1か月の台本 ----------
  const M1 = SW_DATA.m1 || null;
  const M1_KEY = "sw:m1:v1";
  function M1Copy({ text }) {
    const [ok, setOk] = useState(false);
    const go = () => { try { navigator.clipboard.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1500); }, () => {}); } catch (e) {} };
    return <button type="button" className="sw-btn" onClick={go}>{ok ? tx("コピーしました", "Copied") : tx("コピー", "Copy")}</button>;
  }
  function M1Piece({ p, openEp }) {
    const e = EPS.find((x) => x.id === p.ep);
    const facts = (e && e.facts) || [];
    const [, kc] = KIND_INFO[p.kind];
    const refs = (ns) => (ns || []).map((n) => facts[n] ? <span key={n} className={"sw-fref" + (facts[n].ok ? " ok" : "")} title={facts[n].t}>{n + 1}</span> : null);
    const lab = p.form === "long" ? "ch" : p.form === "s3" ? "beat" : null;
    let prev = null;
    return (
      <div style={{ "--k": kc }}>
        <dl className="sw-kv" style={{ marginBottom: 10 }}>
          <dt>{tx("題材", "Topic")}</dt><dd><EpLink id={p.ep} onOpen={openEp} /></dd>
          <dt>{tx("媒体", "Platform")}</dt><dd>{p.platform}</dd>
          <dt>{tx("長さ", "Length")}</dt><dd>{p.len}{p.form === "s3" || p.form === "long" ? tx("（5字/秒＋間で計算した目安）", " (estimated at 5 chars/s plus pauses)") : ""}</dd>
        </dl>
        {p.form === "car" ? (
          <div className="sw-slides">{p.rows.map((r, i) => <div key={i} className="sw-slide"><small>{r.t}</small><b>{r.h}</b><span>{r.line}{refs(r.facts)}</span></div>)}</div>
        ) : (
          <div className="sw-m1-rows">
            <div className="hd"><span>{tx("時間", "Time")}</span><span>{tx("ナレーション（数字は根拠の事実番号）", "Narration (numbers = supporting facts)")}</span><span>{tx("画面の文字", "On-screen text")}</span><span>{tx("映像", "Footage")}</span></div>
            {p.rows.map((r, i) => {
              const head = lab && r[lab] !== prev ? (prev = r[lab]) : null;
              return (
                <React.Fragment key={i}>
                  {head ? <div className="ch">{head}</div> : null}
                  <div>
                    <span className="sw-m1-t">{r.t}</span>
                    <span>{r.line}{refs(r.facts)}</span>
                    <span>{r.telop ? <span className="sw-m1-tel">{r.telop}</span> : null}</span>
                    <span className="sw-m1-vis">{r.visual}{r.hold ? <i>{tx(`（間${r.hold}秒）`, ` (pause ${r.hold} s)`)}</i> : null}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
        <div className="sw-sub-h" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>{p.form === "car" ? tx("キャプション", "Caption") : tx("概要欄・キャプション", "Description & caption")}<M1Copy text={p.caption} /></div>
        <pre className="sw-m1-cap">{p.caption}</pre>
      </div>
    );
  }
  function M1Page({ openEp }) {
    const [sig, setAll] = useFoldSig();
    const [wn, setWn] = useState(() => { const t = new Date().toISOString().slice(0, 10); const w = M1 ? M1.weeks.find((x) => t >= x.start && t <= x.end) : null; return w ? w.n : 1; });
    const [done, setDone] = useState(() => load(M1_KEY));
    const flip = (k) => { const d = { ...done }; if (d[k]) delete d[k]; else d[k] = 1; setDone(d); save(M1_KEY, d); };
    if (!M1) return <div><Head kick={tx("03 作る", "03 MAKE")} title={tx("第1か月の台本", "Month 1 scripts")} lede={tx("台本のデータがありません。", "No script data.")} /></div>;
    const w = M1.weeks.find((x) => x.n === wn) || M1.weeks[0];
    const md = (iso) => `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}`;
    const epT = (id) => { const e = EPS.find((x) => x.id === id); return e ? splitTitle(e.title)[0] : id; };
    const nDone = w.pieces.filter((p) => done[p.key]).length;
    const nChk = Object.values(w.checks).reduce((a, c) => a + c.facts.length + (c.audit || []).length, 0);
    const nChkDone = Object.entries(w.checks).reduce((a, [id, c]) => a + c.facts.filter((f) => f.verified || done[`chk:${id}:${f.n}`]).length + (c.audit || []).filter((x, j) => ((c.audit_v || [])[j] || {}).verdict === "一致" || done[`aud:${id}:${j}`]).length, 0);
    return (
      <div>
        <Head kick={tx("03 作る", "03 MAKE")} title={tx("第1か月の台本", "Month 1 scripts")} lede={tx(`発信プランの第1〜${M1.weeks.length}週（${md(M1.weeks[0].start)}〜${md(M1.weeks[M1.weeks.length - 1].end)}）に出す台本です。ナレーション・画面の文字・映像・概要欄まで、そのまま収録に使える形にしてあります。`, `Scripts for weeks 1–${M1.weeks.length} of the publishing plan (${md(M1.weeks[0].start)}–${md(M1.weeks[M1.weeks.length - 1].end)}). Narration, on-screen text, footage and descriptions are ready to record as they are.`)} />
        {M1.draft ? <div className="sw-note ng sw-sec"><b>{tx("下書きです　", "Draft: ")}</b>{tx("監査前の台本です。公開に使わないでください。", "These scripts haven't been audited yet. Don't publish them.")}</div> : null}
        <div className="sw-note warn sw-sec"><b>{tx("公開の前に必ず　", "Before publishing: ")}</b>{tx("台本の事実は、出典を検索結果や解説で確かめた段階で、原文での確認はまだです。各週の「公開前チェック」の事実を原文で確かめ、違っていたら台本を直してから出してください。", "Script facts have been checked only against search results and commentary, not the originals. Check each week's \"Pre-publish check\" facts against the originals, and fix the script before posting if anything differs.")}{M1.how.map((h, i) => <div key={i} className="sw-sm" style={{ marginTop: 4, color: "inherit" }}>・{h}</div>)}</div>
        <div className="sw-tbar">
          <Seg value={wn} onChange={setWn} options={M1.weeks.map((x) => [x.n, tx(`第${x.n}週 ${md(x.start)}〜`, `Week ${x.n} from ${md(x.start)}`)])} />
          <FoldAll onSet={setAll} />
        </div>
        <div className="sw-m1-sum">
          <div><div className="sw-wk-h">{tx("ワインの特集", "Wine feature")}</div><EpLink id={w.wine} onOpen={openEp} /></div>
          <div><div className="sw-wk-h">{tx("歴史の特集", "History feature")}</div><EpLink id={w.history} onOpen={openEp} /></div>
          <div><div className="sw-wk-h">{tx("進み具合", "Progress")}</div><b>{tx(`作った ${nDone}/${w.pieces.length}本`, `Made ${nDone}/${w.pieces.length}`)}</b>{tx("　", "  ")}<span className="sw-sm">{tx(`事実の確認 ${nChkDone}/${nChk}`, `Facts checked ${nChkDone}/${nChk}`)}</span>{w.long ? <div className="sw-wk-h" style={{ marginTop: 4 }}>{tx("長尺：", "Long-form: ")}<EpLink id={w.long} onOpen={openEp} /></div> : null}</div>
        </div>
        {w.note.map((n, i) => <div key={i} className="sw-note info" style={{ marginBottom: 10 }}>{n}</div>)}
        <FoldSig.Provider value={sig}>
          <Fold id={`m1:${w.n}:sched`} n={1} title={tx("公開の予定", "Publishing schedule")} meta={tx(`${w.pieces.length}本・チェックは「作った」印`, `${w.pieces.length} pieces · tick = made`)}>
            <div className="sw-m1-sched">
              {w.pieces.map((p) => (
                <div key={p.key} className={done[p.key] ? "o" : ""}>
                  <span className="d">{tx(`${md(p.date)}（${p.dow}）`, `${dowL(p.dow)} ${md(p.date)}`)}</span>
                  <span className="f" style={{ "--k": KIND_INFO[p.kind][1], "--k-soft": KIND_INFO[p.kind][3] }}><span className="sw-m1-form">{lbl(p.form_label)}{p.main ? "" : tx("・任意", " · optional")}</span></span>
                  <span className="tt">{epT(p.ep)}</span>
                  <input type="checkbox" checked={!!done[p.key]} onChange={() => flip(p.key)} aria-label={tx(`${md(p.date)} ${p.form_label} を作った`, `Made: ${lbl(p.form_label)} for ${md(p.date)}`)} />
                </div>
              ))}
            </div>
          </Fold>
          {w.pieces.map((p, i) => (
            <Fold key={p.key} id={`m1:${p.key}`} n={i + 2} tone={p.kind === "wine" ? "wine" : "hist"} def={false}
              title={tx(`${md(p.date)}（${p.dow}）${p.form_label}${p.main ? "" : "（任意）"}：${p.title}`, `${dowL(p.dow)} ${md(p.date)} ${lbl(p.form_label)}${p.main ? "" : " (optional)"}: ${p.title}`)} meta={`${p.len}${done[p.key] ? tx("・作った", " · made") : ""}`}>
              <M1Piece p={p} openEp={openEp} />
            </Fold>
          ))}
          <Fold id={`m1:${w.n}:chk`} n={w.pieces.length + 2} title={tx("公開前チェック（原文で確かめる事実）", "Pre-publish check (facts to confirm in the originals)")} meta={tx(`${nChkDone}/${nChk}件`, `${nChkDone}/${nChk}`)} def={false}>
            {Object.entries(w.checks).map(([id, c]) => (
              <div key={id} style={{ marginBottom: 14 }}>
                <div className="sw-sub-h"><EpLink id={id} onOpen={openEp} /></div>
                {c.facts.map((f) => (
                  <label key={f.n} className="sw-m1-chk">
                    <input type="checkbox" checked={!!(f.verified || done[`chk:${id}:${f.n}`])} disabled={!!f.verified} onChange={() => flip(`chk:${id}:${f.n}`)} />
                    <span><b>{tx(`事実${f.n + 1}`, `Fact ${f.n + 1}`)}</b>{tx(`（${f.tier}）`, ` (${f.tier}) `)}{f.t}<div className="sw-sm">{f.src}{f.url ? <>{tx("　", "  ")}<Ext url={f.url}>{tx("出典を開く", "Open source")}</Ext></> : null}{f.v_url && f.v_url !== f.url ? <>{tx("　", "  ")}<Ext url={f.v_url}>{tx("照合したページ", "Page checked")}</Ext></> : null}</div>{f.verdict ? <VTag v={{ verdict: f.verdict, note: f.v_note }} /> : null}{f.verified ? null : f.why.map((x, j) => <span key={j} className="sw-m1-why">{x}</span>)}{f.v_note ? <div className="sw-sm" style={{ color: "var(--ink2)" }}>{f.v_note}</div> : null}{f.v_quote ? <div className="sw-vq">{tx("原文：", "Original: ")}{f.v_quote}</div> : null}{f.t_old ? <div className="sw-sm">{tx("原文に合わせて直した。直す前：", "Fixed to match the original. Before: ")}{f.t_old}</div> : null}</span>
                  </label>
                ))}
                {(c.audit || []).map((a, j) => (
                  <label key={"a" + j} className="sw-m1-chk">
                    <input type="checkbox" checked={!!(((c.audit_v || [])[j] || {}).verdict === "一致" || done[`aud:${id}:${j}`])} disabled={((c.audit_v || [])[j] || {}).verdict === "一致"} onChange={() => flip(`aud:${id}:${j}`)} />
                    <span><span className="sw-m1-why">{tx("監査の指摘", "Audit note")}</span>{a}{(c.audit_v || [])[j] ? <div><VTag v={c.audit_v[j]} />{c.audit_v[j].note ? <span className="sw-sm" style={{ color: "var(--ink2)" }}>{c.audit_v[j].note}</span> : null}{(c.audit_v[j].quote || [])[0] ? <div className="sw-vq">{tx("原文：", "Original: ")}{c.audit_v[j].quote[0]}</div> : null}</div> : null}</span>
                  </label>
                ))}
                {c.where.length ? <div className="sw-sm" style={{ marginTop: 4 }}><b>{tx("確かめ先", "Where to check")}</b>{tx("　", " ")}{c.where.join("、")}</div> : null}
                <ul className="sw-sm" style={{ margin: "6px 0 0", paddingLeft: 18 }}>{c.std.map((x, j) => <li key={j}>{x}</li>)}</ul>
                {c.not_in.length ? <div className="sw-sm" style={{ marginTop: 4 }}><b>{tx("未確認のため台本に入れていないこと", "Left out of the script as unconfirmed")}</b>{tx("　", " ")}{c.not_in.join("／")}</div> : null}
              </div>
            ))}
          </Fold>
        </FoldSig.Provider>
      </div>
    );
  }

  // ---------- 02 企画する：ネタ帳（調査前の候補） ----------
  function NetaCard({ n, on, flip }) {
    return (
      <div className={"sw-neta" + (on ? " on" : "")}>
        <div className="sw-neta-h"><span className="sw-neta-y">{yearLabel(n.year)}</span><b>{n.title}{n.fit ? <span style={{ marginLeft: 6 }}><Stars n={n.fit} /></span> : null}</b><button type="button" className={"sw-btn" + (on ? " pri" : "")} onClick={flip} aria-pressed={on}>{on ? tx("★ 選んだ", "★ Picked") : tx("☆ 選ぶ", "☆ Pick")}</button></div>
        {n.moment || n.who ? <div className="sw-neta-m">{n.who ? <><b>{tx("主人公", "Protagonist")}</b>{tx("　", " ")}{n.who}{tx("　", "  ")}</> : null}{n.moment ? <><b>{tx("その瞬間", "The moment")}</b>{tx("　", " ")}{n.moment}</> : null}</div> : null}
        <div className="sw-neta-q">{n.q}</div>
        <p>{n.angle}</p>
        <dl className="sw-kv">
          <dt>{tx("確かめる", "To check")}</dt><dd>{(n.check || []).join(" ／ ")}</dd>
          <dt>{tx("確かめ先", "Where")}</dt><dd>{(n.where || []).join("、")}</dd>
          {n.risk ? <><dt>{tx("注意", "Caution")}</dt><dd>{n.risk}</dd></> : null}
        </dl>
        <div className="sw-chips">{n.area ? <span className="sw-chip">{lbl(n.area)}</span> : null}{(n.formats || []).map((f) => FMT[f] ? <span key={f} className="sw-chip" style={{ background: "var(--blue-soft)", color: "var(--blue-d)", fontWeight: 700 }}>{f} {lbl(FMT[f].short || FMT[f].name)}</span> : null)}</div>
      </div>
    );
  }
  function Neta() {
    const [kind, setKind] = useState("all");
    const [pick, setPick] = useState(() => load(NETA_KEY));
    const [only, setOnly] = useState(false);
    const [q, setQ] = useState("");
    const [sig, setAll] = useFoldSig();
    const flip = (id) => { const p = { ...pick }; if (p[id]) delete p[id]; else p[id] = 1; setPick(p); save(NETA_KEY, p); };
    const list = NETA.filter((n) => (kind === "all" || n.kind === kind) && (!only || pick[n.id]) && (!q || [n.title, n.q, n.angle].join(" ").includes(q)));
    const sers = SERIES.filter((x) => list.some((n) => n.series === x.id));
    const picked = NETA.filter((n) => pick[n.id]).length;
    const kpis = UI_EN
      ? [[NETA.length, "", "Ideas"], [NETA.filter((n) => n.kind === "wine").length, "", "Wine"], [NETA.filter((n) => n.kind === "history").length, "", "History"], [picked, "", "Picked"]]
      : [[NETA.length, "件", "候補"], [NETA.filter((n) => n.kind === "wine").length, "件", "ワイン"], [NETA.filter((n) => n.kind === "history").length, "件", "歴史"], [picked, "件", "選んだ候補"]];
    return (
      <div>
        <Head kick={tx("02 企画する", "02 PLAN")} title={tx("ネタ帳", "Idea bank")} lede={tx(`次に調べて企画にする題材の候補${NETA.length}件です。まだ調べていない候補なので、つかみは問いの形にしてあります。良いものを選び、企画帳と同じ手順（出典を2つで確かめる → 見直し → 台本）で本編にしてください。`, `${NETA.length} candidate topics to research next and turn into episodes. They haven't been researched yet, so hooks are written as questions. Pick the good ones and develop them with the same steps as the episode plans (confirm with 2 sources → review → script).`)} />
        <div className="sw-g sw-g4">
          {kpis.map(([v, u, l], i) => <div key={i} className="sw-card sw-kpi" style={{ cursor: "default" }}><span className="sw-kpi-n">{v}<small>{u}</small></span><span className="sw-kpi-l">{l}</span></div>)}
        </div>
        <div className="sw-note warn sw-sec"><b>{tx("調査前の候補です　", "Not yet researched: ")}</b>{tx("年は題材を特定するための目安で、事実は確かめていません。数字・人物の発言・因果は、確かめるまで動画に入れないでください。", "Years only help identify the topic; no facts have been checked. Keep numbers, quotes and causal claims out of videos until they're confirmed.")}</div>
        <div className="sw-tbar">
          <Seg value={kind} onChange={setKind} options={[["all", tx(`すべて ${NETA.length}`, `All ${NETA.length}`)], ["wine", tx("ワイン", "Wine")], ["history", tx("歴史", "History")]]} />
          <input className="sw-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx("題・つかみ・切り口で絞り込む", "Filter by title, hook or angle")} aria-label={tx("ネタを絞り込む", "Filter ideas")} />
          <label className="sw-chk"><input type="checkbox" checked={only} onChange={() => setOnly(!only)} />{tx("選んだものだけ", "Picked only")}</label>
          <FoldAll onSet={setAll} />
        </div>
        <FoldSig.Provider value={sig}>
          {sers.map((x) => { const ns = list.filter((n) => n.series === x.id); return (
            <Fold key={x.id} id={"neta:" + x.id} title={lbl(x.name)} meta={tx(`${ns.length}件${ns.some((n) => pick[n.id]) ? `・選んだ ${ns.filter((n) => pick[n.id]).length}` : ""}`, `${ns.length} ideas${ns.some((n) => pick[n.id]) ? ` · picked ${ns.filter((n) => pick[n.id]).length}` : ""}`)} def={false} tone={x.kind === "wine" ? "wine" : "hist"}>
              {x.desc ? <p className="sw-sm" style={{ margin: "0 0 10px" }}>{x.desc}</p> : null}
              <div className="sw-g sw-g2" style={{ marginBottom: 0 }}>{ns.map((n) => <NetaCard key={n.id} n={n} on={!!pick[n.id]} flip={() => flip(n.id)} />)}</div>
            </Fold>
          ); })}
        </FoldSig.Provider>
        {!list.length ? <div className="sw-sm">{tx("条件に合う候補はありません。", "No ideas match.")}</div> : null}
      </div>
    );
  }

  // ---------- 03 作る ----------
  function Video() {
    const PL = SW_DATA.pipeline || {};
    const steps = PL.video_steps || [];
    const [sig, setAll] = useFoldSig();
    return (
      <div>
        <Head kick={tx("03 作る", "03 MAKE")} title={tx("AI動画の手順", "AI video steps")} lede={tx("縦型ショート（1〜3分）を想定した手順です。映像・音声の生成ツールは、プランによって商用利用の条件が違います。使う前に料金ページで確かめてください。", "Steps for vertical shorts (1–3 min). Commercial-use terms for video and audio generators vary by plan, so check the pricing page before use.")} />
        <div className="sw-epd-bar"><span className="sw-sm">{tx(`${steps.length}工程。見出しを押すと開閉できます`, `${steps.length} steps. Click a heading to open or close it`)}</span><FoldAll onSet={setAll} /></div>
        <FoldSig.Provider value={sig}>
          <div className="sw-steps">
            {steps.map((st, i) => {
              const title = String(st.step).replace(/^\d+\.\s*/, "");
              const gate = /事実確認/.test(title);
              return (
                <div key={i} className="sw-step">
                  <span className={"sw-step-n" + (gate ? " gate" : "")} style={{ top: 9 }}>{i + 1}</span>
                  <Fold id={"vid:" + i} title={title} meta={st.tools && st.tools.length ? tx(`ツール ${st.tools.length}`, `${st.tools.length} tools`) : ""} tone={gate ? "gate" : ""} def={i === 0 || gate}>
                    <p style={{ margin: "0 0 8px", fontSize: 14.5, color: "var(--ink2)", lineHeight: 1.8 }}>{st.detail}</p>
                    {st.tools && st.tools.length ? <div className="sw-chips">{st.tools.map((x, j) => <span key={j} className="sw-chip">{x}</span>)}</div> : null}
                    {st.caution ? <div className="sw-note ng" style={{ marginTop: 10 }}><b>{tx("注意　", "Caution: ")}</b>{st.caution}</div> : null}
                  </Fold>
                </div>
              );
            })}
          </div>
        </FoldSig.Provider>
      </div>
    );
  }
  function Pipeline() {
    const PL = SW_DATA.pipeline || {};
    const st = PL.stages || [];
    const [op, setOp] = useState({ 0: true });
    const jump = (i) => { setOp((o) => ({ ...o, [i]: true })); setTimeout(() => { const el = document.getElementById(`sw-st-${i}`); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); };
    const setAll = (v) => setOp(v ? Object.fromEntries(st.map((_, i) => [i, true])) : {});
    return (
      <div>
        <Head kick={tx("03 作る", "03 MAKE")} title={tx("自動化の設計", "Automation design")} lede={tx("工程ごとに、AIに任せる範囲と人が見る点を決めます。緑は自動、黄は半自動（AIが下書きして人が直す）、赤は人が必ず行う工程です。", "For each step, decide what AI handles and what people review. Green is automatic, yellow is semi-automatic (AI drafts, a person edits), and red must always be done by a person.")} />
        <div className="sw-card sw-sec">
          <div className="sw-flow c4" style={{ "--cols": 4 }}>
            {st.map((x, i) => (
              <button key={i} onClick={() => jump(i)} className={"sw-node" + (x.auto === "人" ? " gate" : "")}>
                <div className="sw-node-n">{String(i + 1).padStart(2, "0")}</div>
                <div className="sw-node-t">{x.name}</div>
                <Auto a={x.auto} />
              </button>
            ))}
          </div>
          <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("工程を押すと、下の説明が開きます。", "Click a step to open its details below.")}</p>
        </div>
        <div className="sw-epd-bar"><span className="sw-sm">{tx(`${st.length}工程`, `${st.length} steps`)}</span><FoldAll onSet={setAll} /></div>
        {st.map((x, i) => (
          <div key={i} id={`sw-st-${i}`} style={{ scrollMarginTop: 80 }}>
            <Fold n={i + 1} title={<>{x.name}{tx("　", "  ")}<Auto a={x.auto} /></>} meta={(x.tools || []).length ? tx(`ツール ${(x.tools || []).length}`, `${(x.tools || []).length} tools`) : ""} tone={x.auto === "人" ? "gate" : ""} open={!!op[i]} onToggle={(v) => setOp((o) => ({ ...o, [i]: v }))}>
              <p style={{ margin: "0 0 10px", fontSize: 14.5, color: "var(--ink2)" }}>{x.goal}</p>
              {(x.tools || []).map((tl, j) => (
                <div key={j} className="sw-tool"><span><b>{tl.name}</b>{tl.url ? <> <Ext url={tl.url}>{tx("公式", "Official")}</Ext></> : null}<Badge v={tl.verified} /></span><span style={{ color: "var(--ink2)" }}>{tl.what}</span></div>
              ))}
              {x.human_check ? <div className="sw-note ng" style={{ marginTop: 10 }}><b>{tx("人が確認すること　", "Human check: ")}</b>{x.human_check}</div> : null}
              {x.output ? <div className="sw-sm" style={{ marginTop: 8 }}>{tx("できあがるもの：", "Output: ")}{x.output}</div> : null}
            </Fold>
          </div>
        ))}
      </div>
    );
  }

  // ---------- 03 作る：ツール比較（Claude 以外） ----------
  const TOOL_CATS = ["リサーチ・台本", "音声", "画像", "動画生成", "編集・字幕", "アバター", "投稿の自動化", "分析"];
  function Tools() {
    const rows = SW_DATA.tools || [];
    const stacks = SW_DATA.stacks || [];
    const cats = TOOL_CATS.filter((c) => rows.some((r) => r.cat === c));
    const [cat, setCat] = useState("all");
    const [q, setQ] = useState("");
    const [open, setOpen] = useState({});
    const list = rows.map((r, i) => ({ ...r, i })).filter((r) => (cat === "all" || r.cat === cat) && (!q || [r.name, r.what, r.best_for].join(" ").toLowerCase().includes(q.toLowerCase())));
    const [sig, setAll] = useFoldSig();
    const card = (r) => (
      <div key={r.i} className="sw-card sw-mcard">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
          <div style={{ minWidth: 0 }}><h3 className="sw-ct" style={{ fontSize: 16 }}>{r.name}</h3><span className="sw-tag">{lbl(r.cat)}</span></div>
          <span className="sw-sm" style={{ flexShrink: 0 }}><Ext url={r.url}>{tx("公式", "Official")}</Ext><Badge v={r.verified} /></span>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: "var(--ink2)" }}>{r.what}</p>
        {r.best_for ? <div className="sw-sm"><b style={{ color: "var(--ink2)" }}>{tx("向く工程", "Best for")}</b>{tx("　", " ")}{r.best_for}</div> : null}
        <dl className="sw-kv">
          <dt>{tx("料金", "Price")}</dt><dd>{r.price}</dd>
          <dt>{tx("商用", "Commercial use")}</dt><dd>{r.commercial}</dd>
        </dl>
        <div><button className="sw-btn" onClick={() => setOpen({ ...open, [r.i]: !open[r.i] })} aria-expanded={!!open[r.i]}>{open[r.i] ? tx("閉じる", "Close") : tx("日本語・連携・AI表示・注意", "Japanese, integrations, AI labels & cautions")}</button></div>
        {open[r.i] ? (
          <div className="sw-det">
            <div><h4>{tx("日本語", "Japanese support")}</h4><p>{r.japanese}</p></div>
            <div><h4>{tx("APIと連携", "API & integrations")}</h4><p>{r.api}</p></div>
            <div><h4>{tx("AI生成の表示・透かし", "AI labels & watermarks")}</h4><p>{r.ai_label}</p></div>
            {r.caution ? <div className="sw-note warn"><b>{tx("注意　", "Caution: ")}</b>{r.caution}</div> : null}
          </div>
        ) : null}
      </div>
    );
    return (
      <div>
        <Head kick={tx("03 作る", "03 MAKE")} title={tx("ツール比較", "Tool comparison")} lede={tx(`台本・音声・画像・動画・編集・投稿・分析に使う、Claude 以外のツール${rows.length}件。料金と商用の条件は変わりやすいので、出典の時点を添えています。使う前に公式の料金・規約ページで確かめてください。`, `${rows.length} tools other than Claude for scripts, audio, images, video, editing, posting and analytics. Prices and commercial terms change often, so source dates are noted. Check the official pricing and terms pages before use.`)} />
        {stacks.length ? (
          <div className="sw-g sw-g3">
            {stacks.map((s, i) => (
              <div key={i} className="sw-card sw-mcard" style={{ borderTop: `3px solid ${["#047857", "#1D4ED8", "#7C3AED"][i % 3]}` }}>
                <div className="sw-ch" style={{ marginBottom: 0 }}><h3 className="sw-ct">{s.name}</h3><span className="sw-sm">{s.cost}</span></div>
                <p className="sw-sm" style={{ margin: 0 }}>{s.who}</p>
                {s.steps.map(([st, tools], j) => (
                  <div key={j} className="sw-stack-r"><span className="sw-sm" style={{ fontWeight: 800 }}>{lbl(st)}</span><span className="sw-chips">{tools.map((t) => <span key={t} className="sw-chip">{t}</span>)}</span></div>
                ))}
                {s.note ? <div className="sw-note info" style={{ padding: "8px 12px" }}>{s.note}</div> : null}
              </div>
            ))}
          </div>
        ) : null}
        <div className="sw-tbar">
          <Seg value={cat} onChange={setCat} options={[["all", tx(`すべて ${rows.length}`, `All ${rows.length}`)], ...cats.map((c) => [c, `${lbl(c)} ${rows.filter((r) => r.cat === c).length}`])]} />
          <input className="sw-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx("ツール名・用途で絞り込む", "Filter by tool or use")} aria-label={tx("ツールを絞り込む", "Filter tools")} />
        </div>
        {cat === "all" && !q ? (
          <>
            <div className="sw-epd-bar"><span className="sw-sm">{tx(`${cats.length}分類・${rows.length}件`, `${cats.length} categories · ${rows.length} tools`)}</span><FoldAll onSet={setAll} /></div>
            <FoldSig.Provider value={sig}>
              {cats.map((c, ci) => { const rs = list.filter((r) => r.cat === c); return (
                <Fold key={c} id={"tool:" + c} n={ci + 1} title={lbl(c)} meta={tx(`${rs.length}件：${rs.map((r) => r.name).slice(0, 4).join("・")}${rs.length > 4 ? "ほか" : ""}`, `${rs.length}: ${rs.map((r) => r.name).slice(0, 4).join(", ")}${rs.length > 4 ? ", …" : ""}`)} def={false}>
                  <div className="sw-g sw-g2" style={{ marginBottom: 0 }}>{rs.map(card)}</div>
                </Fold>
              ); })}
            </FoldSig.Provider>
          </>
        ) : <div className="sw-g sw-g2">{list.map(card)}</div>}
      </div>
    );
  }
  // ---------- 03 作る：MCP・コネクタ・プラグイン ----------
  const STAGE_ORDER = ["調べる", "作る", "投稿", "分析", "管理", "全体"];
  function Connect() {
    const C = SW_DATA.connect || {};
    const items = C.items || [];
    const [stage, setStage] = useState("all");
    const [kind, setKind] = useState("all");
    const stages = STAGE_ORDER.filter((s) => items.some((r) => r.stage === s));
    const list = items.filter((r) => (stage === "all" || r.stage === stage) && (kind === "all" || r.kind === kind)).sort((a, b) => b.fit - a.fit);
    const [sig, setAll] = useFoldSig();
    const card = (r) => (
      <div key={r.name} className="sw-card sw-mcard">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <div style={{ minWidth: 0 }}><h3 className="sw-ct" style={{ fontSize: 15 }}>{r.name}</h3><span className="sw-tag" style={r.kind === "プラグイン" ? { background: "#F3E8FF", color: "#6D28D9" } : null}>{lbl(r.kind)}</span> <span className="sw-tag" style={{ background: "#EEF2F7", color: "#475569" }}>{lbl(r.stage)}</span></div>
                <span style={{ flexShrink: 0, textAlign: "right" }}><FitDots v={r.fit} /><div className="sw-sm" style={{ fontSize: 11 }}>{tx("この副業との相性", "Fit with this side work")}</div></span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink2)" }}>{r.what}</p>
              <div className="sw-sm"><b style={{ color: "var(--ink2)" }}>{tx("使い方", "How to use")}</b>{tx("　", " ")}{r.use}</div>
              {r.publisher ? <div className="sw-sm"><b style={{ color: "var(--ink2)" }}>{tx("公開者", "Publisher")}</b>{tx("　", " ")}{r.publisher}</div> : null}
              {r.tools && r.tools.length ? <div className="sw-chips">{r.tools.map((t) => <span key={t} className="sw-chip" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11 }}>{t}</span>)}</div> : null}
              <div className="sw-note warn" style={{ padding: "8px 12px" }}><b>{tx("注意　", "Caution: ")}</b>{r.caution}</div>
            </div>
    );
    const FitDots = ({ v }) => <span className="sw-score" style={{ "--c": "#1D4ED8" }} aria-label={tx(`相性 ${v} / 3`, `Fit ${v} / 3`)}>{[1, 2, 3].map((k) => <i key={k} className={k <= v ? "on" : ""} />)}</span>;
    return (
      <div>
        <Head kick={tx("03 作る", "03 MAKE")} title={tx("MCP・コネクタ・プラグイン", "MCP, connectors & plugins")} lede={tx(`Claude から外部サービスを動かすための連携を、この副業の工程に合わせて選びました（${C.checked || ""}に${C.source || "ディレクトリ"}で確認）。説明はディレクトリの記載にもとづき、実際に接続して動作を試したものではありません。`, `Integrations for driving outside services from Claude, picked to fit this side work's steps (checked in ${C.source || "the directory"}, ${C.checked || ""}). Descriptions follow the directory listings; none have been connected and tested.`)} />
        <div className="sw-card sw-sec">
          <div className="sw-ch"><h2 className="sw-ct">{tx("工程ごとの組み合わせ", "Combinations by step")}</h2><span className="sw-sm">{tx("相性の高いもの（●●●）だけを並べています", "Only the best fits (●●●) are shown")}</span></div>
          <div className="sw-flow" style={{ "--cols": 4 }}>
            {["調べる", "作る", "投稿", "分析"].map((s, i) => (
              <div key={s} className="sw-node" style={{ cursor: "default" }}>
                <div className="sw-node-n">{String(i + 1).padStart(2, "0")}</div>
                <div className="sw-node-t">{lbl(s)}</div>
                <div className="sw-chips">{items.filter((r) => r.stage === s && r.fit >= 3).map((r) => <span key={r.name} className="sw-chip">{r.name.replace(/ by .*| Social Media Management| - .*/, "")}</span>)}</div>
              </div>
            ))}
          </div>
          <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("管理（Notion など）は全工程の台帳として使います。事実確認の関門は、どの連携を使っても人が行います。", "Management tools (Notion, etc.) serve as the ledger for every step. Whatever the integration, the fact-check gate is done by a person.")}</p>
        </div>
        <div className="sw-g sw-g3">
          {(C.principles || []).map(([t, d], i) => (
            <div key={i} className="sw-card" style={{ display: "flex", gap: 10 }}>
              <span className="sw-todo-n">{i + 1}</span>
              <div><b style={{ fontSize: 13.5 }}>{t}</b><div className="sw-sm">{d}</div></div>
            </div>
          ))}
        </div>
        <div className="sw-tbar">
          <Seg value={stage} onChange={setStage} options={[["all", tx(`すべて ${items.length}`, `All ${items.length}`)], ...stages.map((s) => [s, lbl(s)])]} />
          <Seg value={kind} onChange={setKind} options={[["all", tx("種類すべて", "All types")], ["コネクタ（MCP）", lbl("コネクタ（MCP）")], ["プラグイン", lbl("プラグイン")]]} />
        </div>
        {stage === "all" ? (
          <>
            <div className="sw-epd-bar"><span className="sw-sm">{tx(`${stages.length}工程・${list.length}件`, `${stages.length} steps · ${list.length} items`)}</span><FoldAll onSet={setAll} /></div>
            <FoldSig.Provider value={sig}>
              {stages.map((sg, si) => { const rs = list.filter((r) => r.stage === sg); return rs.length ? (
                <Fold key={sg} id={"conn:" + sg} n={si + 1} title={lbl(sg)} meta={tx(`${rs.length}件：${rs.map((r) => r.name.replace(/ by .*| Social Media Management| - .*/, "")).slice(0, 3).join("・")}${rs.length > 3 ? "ほか" : ""}`, `${rs.length}: ${rs.map((r) => r.name.replace(/ by .*| Social Media Management| - .*/, "")).slice(0, 3).join(", ")}${rs.length > 3 ? ", …" : ""}`)} def={si === 0}>
                  <div className="sw-g sw-g2" style={{ marginBottom: 0 }}>{rs.map(card)}</div>
                </Fold>
              ) : null; })}
            </FoldSig.Provider>
          </>
        ) : <div className="sw-g sw-g2">{list.map(card)}</div>}
        {(C.not_fit || []).length ? (
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("今回は選ばなかったもの", "Not chosen this time")}</h2></div>
            {C.not_fit.map(([n, d], i) => <div key={i} className="sw-rule"><b>{n}</b><div className="sw-sm">{d}</div></div>)}
          </div>
        ) : null}
      </div>
    );
  }

  // ---------- 04 確かめる：品質レポート ----------
  function Quality({ openEp, done }) {
    const Q = SW_DATA.quality || {};
    const up = Q.upgrades || {};
    const allF = EPS.flatMap((e) => (e.facts || []).map((f) => ({ ...f, kind: e.kind })));
    const cnt = (fs) => { const c = { S: 0, A: 0, B: 0, C: 0, D: 0 }; fs.forEach((f) => { c[f.tier || "D"]++; }); return c; };
    const rows = [[tx("全体", "All"), allF], [tx("ワイン", "Wine"), allF.filter((f) => f.kind === "wine")], [tx("歴史", "History"), allF.filter((f) => f.kind === "history")]].map(([l, fs]) => [l, cnt(fs), fs.length]);
    const reviewed = EPS.reduce((a, e) => a + (e.review || []).length, 0);
    const audited = EPS.reduce((a, e) => a + ((e.script || {}).audit_n || 0), 0);
    const auditedEps = EPS.filter((e) => (e.script || {}).audit).length;
    const weak = EPS.slice().sort((a, b) => sabShare(a) - sabShare(b)).slice(0, 12);
    const [tipEl, onTip, offTip] = useTip();
    const kpis = UI_EN
      ? [[EPS.length, "", "Episodes"], [allF.length, "", "Facts"], [reviewed, "", "Fixes from review"], [(up.replaced || 0) + (up.corrected || 0), "", "Source upgrades"], [audited, "", "Script lines fixed in audit"], [done, `/ ${allF.length}`, "Facts checked in the original"]]
      : [[EPS.length, "本", "企画"], [allF.length, "件", "事実"], [reviewed, "件", "見直しで直した点"], [(up.replaced || 0) + (up.corrected || 0), "件", "出典の格上げ"], [audited, "行", "台本の監査で直した行"], [done, `/ ${allF.length}`, "原文で確認した事実"]];
    const STEPS = UI_EN ? [
      ["Standards for building episodes", "Episodes are built with instructions covering the 10 error types most often found in past reviews and the source-tier rules (no tier D; key numbers checked against 2 sources)."],
      ["Independent review", `Another model (Opus) read every episode, flagged errors, overstatements, calendar mistakes and myths, and replaced them with safe wording (${reviewed}).`],
      ["Source upgrades", `Facts with weak sources were switched to official, encyclopedia or news sources, with the wording fixed where the new source disagreed (${up.replaced || 0} replaced · ${up.corrected || 0} fixed · ${up.not_found || 0} not found). Replacements supported only in part (${allF.filter((f) => f.partial).length}) and those with an inferred source page (${allF.filter((f) => f.url_est).length}) are marked.`],
      ["Script audit", `Each script line was checked against the facts it cites, and overstated or unsupported lines were fixed (${auditedEps} episodes · ${audited} lines).`],
      ["Cross-checking episodes", `Mismatched years, numbers, names and calendars were found and fixed between episodes on the same events or systems, and within single episodes (${Q.consist || 0}).`],
      ["Checking the originals (you)", "Finally, open the original sources, compare, and tick the facts that match. Only ticked facts go into scripts."],
    ] : [
      ["企画づくりの基準", "過去の見直しで多かった誤り10種類と、出典の段階の基準（D は使わない、重要な数字は2つの出典で照合）を指示に入れて作る。"],
      ["独立した見直し", `別のモデル（Opus）が全企画を読み、誤り・言い過ぎ・暦の誤り・俗説を指摘し、安全な文面に置き換える（${reviewed}件）。`],
      ["出典の格上げ", `出典が弱い事実を、公的・事典・報道の出典に差し替える。差し替え先と食い違えば文面を直す（差し替え${up.replaced || 0}件・修正${up.corrected || 0}件・見つからず${up.not_found || 0}件）。差し替えのうち、文の一部だけ裏づけられたもの${allF.filter((f) => f.partial).length}件と、出典ページを推定したもの${allF.filter((f) => f.url_est).length}件には印を付けた。`],
      ["台本の監査", `台本の各行が、付けた事実で裏づけられているかを点検し、言い過ぎや根拠のない行を直す（${auditedEps}本・${audited}行）。`],
      ["企画どうしの突き合わせ", `同じ出来事・制度を扱う別の企画の間や、1つの企画の中で、年・数字・呼び名・暦の食い違いを洗い出して直す（${Q.consist || 0}件）。`],
      ["原文での確認（あなた）", "最後は出典の原文を開いて照合し、合っていたらチェックを付ける。チェックした事実だけが台本に入る。"],
    ];
    return (
      <div onMouseLeave={offTip}>
        <Head kick={tx("04 確かめる", "04 CHECK")} title={tx("品質レポート", "Quality report")} lede={tx("企画の事実がどこまで確かめられているかと、品質を上げるために通した工程です。調査の環境から出典サイトの本文を開けなかったため、原文での確認は最後にあなたが行う前提で、それ以外の点検を機械と別のモデルで通しています。", "How far the episode facts have been verified, and the steps used to raise quality. The research environment couldn't open source pages, so checking the originals is left to you as the last step; every other check was run by script and by a second model.")} />
        <div className="sw-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))" }}>
          {kpis.map(([n, u, l], i) => <div key={i} className="sw-card sw-kpi" style={{ cursor: "default" }}><span className="sw-kpi-n">{n}<small>{u}</small></span><span className="sw-kpi-l">{l}</span></div>)}
        </div>
        <div className="sw-card sw-sec">
          <div className="sw-ch"><h2 className="sw-ct">{tx("出典の段階の内訳", "Source tier breakdown")}</h2><span className="sw-sm">{tx("URLのドメインから機械的に判定", "Classified automatically from URL domains")}</span></div>
          {rows.map(([l, c, n]) => (
            <div key={l} className="sw-hb" style={{ gridTemplateColumns: "64px minmax(0,1fr) auto" }}>
              <span className="sw-hb-l">{l}</span>
              <span className="sw-stack">{["S", "A", "B", "C", "D"].map((t) => c[t] ? <i key={t} style={{ width: `${c[t] / n * 100}%`, background: TIER_INFO[t][1] }} onMouseMove={(e) => onTip(e, tx(`${l}・${t}（${TIER_INFO[t][0]}）：${c[t]}件（${Math.round(c[t] / n * 100)}%）`, `${l} · ${t} (${TIER_EN[t]}): ${c[t]} (${Math.round(c[t] / n * 100)}%)`))} /> : null)}</span>
              <span className="sw-hb-v">{tx("S〜B", "S–B")} {n ? Math.round((c.S + c.A + c.B) / n * 100) : 0}%</span>
            </div>
          ))}
          <div className="sw-legend">{["S", "A", "B", "C", "D"].map((t) => <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 2 }}><TierTag t={t} />{tierName(t)}</span>)}</div>
          {Q.sab_before != null ? <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx(`出典の格上げの前は S〜B が ${Q.sab_before}% でした（同じ事実を格上げ前の出典で数えた値）。いまは ${rows[0][2] ? Math.round((rows[0][1].S + rows[0][1].A + rows[0][1].B) / rows[0][2] * 100) : 0}% です。`, `Before the source upgrades, S–B was ${Q.sab_before}% (the same facts counted with their old sources). It's now ${rows[0][2] ? Math.round((rows[0][1].S + rows[0][1].A + rows[0][1].B) / rows[0][2] * 100) : 0}%.`)}</p> : null}
        </div>
        <div className="sw-g sw-g2">
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("品質のために通した工程", "Quality steps")}</h2></div>
            {STEPS.map(([t, d], i) => <div key={i} className="sw-todo" style={{ gridTemplateColumns: "26px 1fr" }}><span className="sw-todo-n">{i + 1}</span><div><div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div><div className="sw-sm">{d}</div></div></div>)}
          </div>
          <div className="sw-card">
            <div className="sw-ch"><h2 className="sw-ct">{tx("出典の質が低い企画", "Episodes with weak sources")}</h2><span className="sw-sm">{tx("S〜B の割合が低い順", "Lowest S–B share first")}</span></div>
            {weak.map((e) => (
              <button key={e.kind + e.id} className="sw-row" style={{ "--tc": "minmax(0,1fr) 64px", padding: "8px 0" }} onClick={() => openEp(e)}>
                <span><b style={{ fontSize: 13 }}>{splitTitle(e.title)[0]}</b><span className="sw-sm" style={{ display: "block" }}>{lbl(KIND_INFO[e.kind][0])}{tx("・", " · ")}{e.id}</span></span>
                <span className="sw-size" style={{ textAlign: "right", color: sabShare(e) < 40 ? "var(--warn)" : "var(--ink)" }}>{sabShare(e)}%</span>
              </button>
            ))}
            <p className="sw-sm" style={{ margin: "8px 0 0" }}>{tx("これらの企画は、公開前に出典を差し替えるか、題材ごと見送ることを考えてください。", "Before publishing these, consider replacing their sources or dropping the topic.")}</p>
          </div>
        </div>
        {tipEl}
      </div>
    );
  }

  // ---------- 04 確かめる ----------
  function Gate() {
    const PL = SW_DATA.pipeline || {};
    const items = PL.factcheck || [];
    const [chk, setChk] = useState(() => load(GATE_KEY));
    const [open, setOpen] = useState({});
    const n = items.filter((_, i) => chk[i]).length;
    const all = items.length > 0 && n === items.length;
    const flip = (i) => { const c = { ...chk }; if (c[i]) delete c[i]; else c[i] = 1; setChk(c); save(GATE_KEY, c); };
    const reset = () => { setChk({}); save(GATE_KEY, {}); };
    return (
      <div>
        <Head kick={tx("04 確かめる", "04 CHECK")} title={tx("事実確認の関門", "Fact-check gate")} lede={tx("1本の動画を公開する前に、ここを全部通します。自動化しても、この工程だけは人が行います。", "Every video passes all of these checks before it goes public. Even with automation, this step is always done by a person.")} />
        <div className="sw-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Donut done={n} total={items.length} size={84} />
              <div><div style={{ fontWeight: 800, color: all ? "var(--ok)" : "var(--warn)" }}>{all ? tx("公開してよい状態", "Ready to publish") : tx("公開前（未確認の項目あり）", "Not ready (unchecked items)")}</div><div className="sw-sm">{tx("チェックはこの端末に残ります", "Checks are saved on this device")}</div></div>
            </div>
            <button className="sw-btn" onClick={reset}>{tx("次の動画のためにリセット", "Reset for the next video")}</button>
          </div>
          <div style={{ marginTop: 10 }}>
            {items.map((f, i) => (
              <div key={i} className="sw-gate-i">
                <input type="checkbox" checked={!!chk[i]} onChange={() => flip(i)} aria-label={f.item} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                    <b style={{ fontSize: 13.5, cursor: "pointer", textDecoration: chk[i] ? "line-through" : "none", color: chk[i] ? "var(--faint)" : "var(--ink)" }} onClick={() => flip(i)}>{f.item}</b>
                    <button className="sw-btn" style={{ padding: "2px 10px", fontSize: 11.5 }} onClick={() => setOpen({ ...open, [i]: !open[i] })} aria-expanded={!!open[i]}>{open[i] ? tx("閉じる", "Close") : tx("やり方", "How")}</button>
                  </div>
                  {open[i] ? <p className="sw-sm" style={{ margin: "6px 0 0", color: "var(--ink2)" }}>{f.how}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // 段階は [記号, 日本語, 日本語の説明, 色, 英語, 英語の説明]
  const TIERS = [["S", "一次情報", "公的統計・公文書・公式発表・原典", "#047857", "Primary sources", "Official statistics, public records, official announcements, original texts"], ["A", "定評ある解説", "事典・学術書・専門機関の解説", "#1D4ED8", "Respected references", "Encyclopedias, scholarly books, explanations from expert bodies"], ["B", "信頼できる報道", "報道・業界メディア。独立した2つ以上で一致を確かめる", "#526074", "Reliable reporting", "News and trade media. Confirm agreement in 2 or more independent outlets"]];
  function Sources() {
    const [kind, setKind] = useState("wine");
    const rows = ((SW_DATA[kind] || {}).sources) || [];
    return (
      <div>
        <Head kick={tx("04 確かめる", "04 CHECK")} title={tx("情報源", "Sources")} lede={tx("出典は3段階で扱います。まとめ記事・SNS・AIの回答は出典にしません。", "Sources are handled in three tiers. Summary articles, social posts and AI answers are never sources.")} />
        <div className="sw-g sw-g3">
          {TIERS.map(([t, nm, d, c, nme, de]) => (
            <div key={t} className="sw-card" style={{ display: "flex", gap: 12 }}>
              <span className="sw-tier" style={{ background: c }}>{t}</span>
              <div><b>{tx(nm, nme)}</b><div className="sw-sm">{tx(d, de)}</div></div>
            </div>
          ))}
        </div>
        <Tabs value={kind} onChange={setKind} options={[["wine", tx("ワイン", "Wine"), ((SW_DATA.wine || {}).sources || []).length], ["history", tx("歴史", "History"), ((SW_DATA.history || {}).sources || []).length]]} />
        {TIERS.map(([t, nm, , c, nme]) => { const rs = rows.filter((x) => x.tier === t); return rs.length ? (
          <Fold key={kind + t} id={"src:" + t} title={<><span className="sw-tier" style={{ background: c, width: 22, height: 22, fontSize: 11.5, marginRight: 8, verticalAlign: -4 }}>{t}</span>{tx(nm, nme)}</>} meta={tx(`${rs.length}件`, `${rs.length}`)}>
            {rs.map((x, i) => (
              <div key={t + i} className="sw-src">
                <div><b>{x.name}</b> {x.url ? <Ext url={x.url}>{tx("開く", "Open")}</Ext> : <span className="sw-sm">{tx("（URLなし）", "(no URL)")}</span>}<div className="sw-sm">{x.why}</div></div>
              </div>
            ))}
          </Fold>
        ) : null; })}
      </div>
    );
  }
  function Rules() {
    const PL = SW_DATA.pipeline || {};
    const [g, setG] = useState("rights");
    const groups = { rights: [tx("権利とAI表示", "Rights & AI labels"), PL.rights || []], wine: [tx("酒類の発信", "Alcohol content"), (SW_DATA.wine || {}).rules || []], history: [tx("歴史の発信", "History content"), (SW_DATA.history || {}).rules || []] };
    const rows = groups[g][1];
    return (
      <div>
        <Head kick={tx("04 確かめる", "04 CHECK")} title={tx("規制・リスク", "Rules & risks")} lede={tx("著作権・肖像と声・ステマ規制・酒類の基準・AI生成の表示など、発信の前に押さえる決まりです。個別の判断が要るときは専門家に相談してください。", "Rules to know before posting: copyright, likeness and voice, stealth-marketing rules, alcohol standards, AI-generated labels and more. Consult a professional when a case needs individual judgment.")} />
        <Tabs value={g} onChange={setG} options={Object.entries(groups).map(([k, [l, r]]) => [k, l, r.length])} />
        <div className="sw-card sw-sec" style={{ padding: "6px 20px" }}>
          {rows.map((r, i) => (
            <div key={i} className="sw-rule">
              <div style={{ fontWeight: 800 }}>{r.name}{r.verified !== undefined ? <Badge v={r.verified} /> : null} {r.url ? <Ext url={r.url}>{tx("開く", "Open")}</Ext> : null}</div>
              <div className="sw-sm" style={{ color: "var(--ink2)" }}>{r.summary}</div>
            </div>
          ))}
        </div>
        <div className="sw-note warn"><b>{tx("悩み系のテーマで越えない線　", "Lines not to cross on personal-worry themes: ")}</b>{tx("医療（美容・薄毛・ダイエット）は医療広告ガイドラインと薬機法、法律の悩み（離婚・借金・退職）は弁護士法72条（紹介料の禁止・非弁行為）、紹介報酬つきの発信は景品表示法のステマ規制（広告であることの表示）に従います。違法な手口や、特定の人を調べる方法は発信しません。", "Medical topics (beauty, hair loss, diets) follow Japan's medical advertising guidelines and the Pharmaceuticals and Medical Devices Act; legal worries (divorce, debt, quitting a job) follow Article 72 of the Attorneys Act (no referral fees or unlicensed legal practice); posts with referral rewards follow the stealth-marketing rules of the Act against Unjustifiable Premiums and Misleading Representations (disclose that it's an ad). Never post illegal methods or ways to look into specific people.")}</div>
      </div>
    );
  }

  function SideWorkHub() {
    const [ui, setUi] = useUiLang();
    UI_EN = ui === "en";
    const [pg, setPg] = useState("home");
    const [focus, setFocus] = useState(null);
    // 開いている画面を URL に残す（#sidework/<画面>）
    useNovaHubRoute("sidework", [pg === "home" ? "" : pg], (p) => { const ok = ["accounts", "connect", "gate", "home", "market", "media", "neta", "pipeline", "plans", "planx", "quality", "rules", "sources", "tools", "video"]; setPg(p[0] && ok.includes(p[0]) ? p[0] : "home"); });
    const [checked, setChecked] = useState(() => load(CHECK_KEY));
    const toggle = (k) => { const c = { ...checked }; if (c[k]) delete c[k]; else c[k] = 1; setChecked(c); save(CHECK_KEY, c); };
    const done = FACTS.filter((f) => f.v || checked[f.key]).length;
    const go = (k) => { setPg(k); try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {} };
    const grp = groupOf(pg);
    // カードの見出し（.sw-ch）を押すとカードの中身を畳む。React の再描画では className を変えないので状態は保たれる。
    const shutCard = (ev) => { const t = ev.target; const h = t && t.closest ? t.closest(".sw-card > .sw-ch") : null; if (!h || t.closest("button, a, select, input, label")) return; h.parentElement.classList.toggle("sw-shut"); };
    return (
      <div className="sw">
        <style>{CSS}</style>
        <aside className="sw-side" aria-label={tx("Side Work Hub のメニュー", "Side Work Hub menu")}>
          <div className="sw-logo">
            <span className="sw-logo-m"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16v12H4zM10 9l5 3-5 3z" /></svg></span>
            <span><span className="sw-logo-s">SIDE WORK HUB</span><div className="sw-logo-t">{tx("SNS副業ダッシュボード", "Social media dashboard")}</div></span>
          </div>
          <LangToggle ui={ui} setUi={setUi} />
          <div className="sw-meter">
            <div className="sw-meter-l"><span>{tx("原文で確認した事実", "Facts checked in the original")}</span><b>{done} / {FACTS.length}</b></div>
            <div className="sw-bar"><i style={{ width: `${FACTS.length ? done / FACTS.length * 100 : 0}%` }} /></div>
          </div>
          {NAV.map((g) => (
            <div key={g.n} className="sw-grp">
              <div className="sw-grp-h">{g.n}{tx("　", " ")}{tx(g.label, g.en)}</div>
              {g.items.map(([k, l, ic, le]) => <button key={k} className={"sw-nav" + (pg === k ? " on" : "")} aria-current={pg === k ? "page" : undefined} onClick={() => go(k)}><Icon n={ic} />{tx(l, le)}</button>)}
            </div>
          ))}
        </aside>
        <main className="sw-main" onClick={shutCard}>
          <nav className="sw-mnav" aria-label={tx("Side Work Hub のメニュー", "Side Work Hub menu")}>
            <div className="sw-mnav-top"><LangToggle ui={ui} setUi={setUi} /></div>
            <div className="sw-mnav-s">{NAV.map((g) => <button key={g.n} className={grp.n === g.n ? "on" : ""} onClick={() => go(g.items[0][0])}>{tx(g.short, g.shortEn)}</button>)}</div>
            {grp.items.length > 1 ? <div className="sw-mnav-i">{grp.items.map(([k, l, , le]) => <button key={k} className={pg === k ? "on" : ""} onClick={() => go(k)}>{tx(l, le)}</button>)}</div> : null}
          </nav>
          {pg === "home" && <Home go={go} done={done} checked={checked} openEp={(e) => { setFocus(e.kind + e.id); go("plans"); }} />}
          {pg === "market" && <Market />}
          {pg === "media" && <Media />}
          {pg === "accounts" && <Accounts />}
          {pg === "plans" && <Plans key={focus || "p"} checked={checked} toggle={toggle} initial={focus} />}
          {pg === "neta" && <Neta />}
          {pg === "planx" && <PlanPage go={go} openEp={(e) => { setFocus(e.kind + e.id); go("plans"); }} />}
          {pg === "m1" && <M1Page openEp={(e) => { setFocus(e.kind + e.id); go("plans"); }} />}
          {pg === "video" && <Video />}
          {pg === "pipeline" && <Pipeline />}
          {pg === "tools" && <Tools />}
          {pg === "connect" && <Connect />}
          {pg === "gate" && <Gate />}
          {pg === "quality" && <Quality done={done} openEp={(e) => { setFocus(e.kind + e.id); go("plans"); }} />}
          {pg === "sources" && <Sources />}
          {pg === "rules" && <Rules />}
          <footer className="sw-foot">{tx("調査：2026年10月。規約・料金・市場規模は変わるので、使う前に出典で最新を確かめてください。「要原文確認」は検索結果の要約でしか確かめていないものです。", "Researched October 2026. Terms, prices and market sizes change, so check the latest at the source before use. \"Check original\" marks items confirmed only from search-result summaries.")}</footer>
        </main>
      </div>
    );
  }
  return SideWorkHub;
})();
