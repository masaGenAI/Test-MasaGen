# Anything Memo Tracker — 完全コード出力（Project-Nova 統合用）

Cowork から移設した「Anything Memo トラッカー」の全コードとデータを1ファイルにまとめたものです。Project-Nova へ統合する際は、まず「1. 概要」と「6. 統合メモ」を読んでください。

- 生成時点の件数: **メモ 20件 / ジャンル 5種**
- 依存ライブラリ: **なし**（HTML/CSS/JS 自己完結、外部リクエストなし）
- 保存: ブラウザ `localStorage`（キー `anything-memo-tracker.data.v2`）
- UIスコープ: すべて `#amt` 配下（他DOMと衝突しにくい）

---

## 目次

1. 概要
2. データモデル
3. データ本体（`data.json` 全文）
4. 完全なアプリHTML（スタンドアロン `index.html`）
5. 埋め込み用HTML（`artifact.html`＝doctype等なし）
6. Project-Nova 統合メモ
7. 追加ロジック（`add_entries.py` memo部分）

---

## 1. 概要

キーワードから作った「調べ済みノート」を追跡するアプリ。機能:

- メモ一覧（トピック・要約・ジャンルバッジ・日付）
- ジャンル別件数バー、統計（総数/ジャンル数/詳細あり）
- 検索、ジャンル絞り込み、日付並び替え
- 追加/編集/削除（localStorage保存）、JSONエクスポート/インポート、初期化

## 2. データモデル

### memo（1件）

````json
{
  "topic": "MMR（Maximal Marginal Relevance）",
  "genre": "ai",
  "date": "2026-07-15",
  "note": "検索/RAGで結果を選ぶ再ランク手法。クエリとの関連度と、既に選んだ文書との非類似度を両立させて選択。λで関連性と多様性のバランスを調整し、重複を減らして多様な文脈をLLMへ渡す。"
}
````

- `genre` は下記 `genres[].key` のいずれか。

### genres（固定5種・色つき）

| key | emoji | name | fill | text |
|---|---|---|---|---|
| `ai` | 🤖 | AI/生成AI | `#f1eafe` | `#9333ea` |
| `cloud` | ☁️ | クラウド/インフラ | `#eaf0ff` | `#2f6bff` |
| `dev` | 🔧 | 開発/DevOps | `#e6f6ee` | `#15803d` |
| `biz` | 📈 | ビジネス/マーケ | `#fde8d7` | `#d9480f` |
| `data` | 📊 | データ/分析 | `#e2f5fa` | `#0891b2` |

### palette（アプリ配色）

````json
{
  "headerGradient": [
    "#ebefff",
    "#f1eafe"
  ],
  "accent": "#2f6bff",
  "activeChip": "#1f2430",
  "background": "#f8fafc"
}
````

## 3. データ本体（`data.json` 全文）

````json
{
  "title": "Anything Memo トラッカー",
  "source": "Cowork artifact: Anything Memo Tracker",
  "capturedFrom": "0679c7cc-anythingmemotracker.pdf",
  "stats": {
    "memoTotal": 20,
    "genreCount": 5,
    "withDetail": 20
  },
  "palette": {
    "headerGradient": [
      "#ebefff",
      "#f1eafe"
    ],
    "accent": "#2f6bff",
    "activeChip": "#1f2430",
    "background": "#f8fafc"
  },
  "genres": [
    {
      "key": "ai",
      "emoji": "🤖",
      "name": "AI/生成AI",
      "fill": "#f1eafe",
      "text": "#9333ea",
      "count": 9
    },
    {
      "key": "cloud",
      "emoji": "☁️",
      "name": "クラウド/インフラ",
      "fill": "#eaf0ff",
      "text": "#2f6bff",
      "count": 4
    },
    {
      "key": "dev",
      "emoji": "🔧",
      "name": "開発/DevOps",
      "fill": "#e6f6ee",
      "text": "#15803d",
      "count": 3
    },
    {
      "key": "biz",
      "emoji": "📈",
      "name": "ビジネス/マーケ",
      "fill": "#fde8d7",
      "text": "#d9480f",
      "count": 3
    },
    {
      "key": "data",
      "emoji": "📊",
      "name": "データ/分析",
      "fill": "#e2f5fa",
      "text": "#0891b2",
      "count": 1
    }
  ],
  "memos": [
    {
      "topic": "MMR（Maximal Marginal Relevance）",
      "genre": "ai",
      "date": "2026-07-15",
      "note": "検索/RAGで結果を選ぶ再ランク手法。クエリとの関連度と、既に選んだ文書との非類似度を両立させて選択。λで関連性と多様性のバランスを調整し、重複を減らして多様な文脈をLLMへ渡す。"
    },
    {
      "topic": "MCP（Model Context Protocol）",
      "genre": "ai",
      "date": "2026-07-15",
      "note": "LLMと外部ツール・データソースをつなぐAnthropic発のオープン標準（2024年11月公開）。JSON-RPCベースで双方向接続し、連携のN×M爆発をM+Nに削減。OpenAIやGoogleも採用。"
    },
    {
      "topic": "TCO（総所有コスト）",
      "genre": "biz",
      "date": "2026-06-13",
      "note": "導入から廃棄までのライフサイクル全体でかかる総費用。初期費用＋運用・保守・人件費・廃棄まで含めて比較する考え方。"
    },
    {
      "topic": "Kubernetes（K8s）",
      "genre": "cloud",
      "date": "2026-06-13",
      "note": "コンテナ化アプリのデプロイ・スケーリング・管理を自動化するOSS基盤。自動スケール・自己修復・ロールバックが強み。"
    },
    {
      "topic": "データの民主化",
      "genre": "data",
      "date": "2026-06-13",
      "note": "社員全員がデータにアクセス・活用できる環境を整えること。「専門家だけのデータ」を誰もが使える状態に。AIの民主化のデータ版。"
    },
    {
      "topic": "疎結合（Loose Coupling）",
      "genre": "dev",
      "date": "2026-06-13",
      "note": "コンポーネント同士の依存を最小化し独立性を高める設計原則。変更に強く、独立した開発・デプロイ・スケールがしやすい。"
    },
    {
      "topic": "AIの民主化",
      "genre": "ai",
      "date": "2026-06-13",
      "note": "AIが「専門家だけのもの」から「誰でも使えるもの」へ開かれた状態。ノーコード・生成AIが加速。利便とリスクが両立。"
    },
    {
      "topic": "DAP（デジタルアダプションプラットフォーム）",
      "genre": "biz",
      "date": "2026-06-13",
      "note": "ソフトの画面にガイドを重ねて表示し、ユーザーの「使いこなし（定着）」を促すツール。WalkMe・Pendo・Whatfixが代表。"
    },
    {
      "topic": "CAC（顧客獲得コスト）",
      "genre": "biz",
      "date": "2026-06-13",
      "note": "新規顧客1人の獲得にかかった営業・マーケ費用。CAC=費用合計÷新規獲得顧客数。LTV÷CAC≧3が目安。"
    },
    {
      "topic": "主要なPython AI/MLライブラリ（6選）",
      "genre": "ai",
      "date": "2026-06-13",
      "note": "NumPy(土台)→Pandas(データ)→Matplotlib(可視化)→scikit-learn(古典ML)→TensorFlow/PyTorch(深層学習)の層で把握。"
    },
    {
      "topic": "AI開発に使われるプログラミング言語",
      "genre": "ai",
      "date": "2026-06-13",
      "note": "事実上の標準はPython（豊富なライブラリ＋書きやすさ）。用途に応じてR・Julia・C++・Java/Scala・JSが補完。"
    },
    {
      "topic": "Harness Engineering（エージェントハーネス設計）",
      "genre": "ai",
      "date": "2026-06-13",
      "note": "AIエージェントの性能はモデル本体だけでなく「周り（ハーネス）」の設計で決まる。その足場を意図的に設計する分野。"
    },
    {
      "topic": "代表的なLLMの種類と特徴",
      "genre": "ai",
      "date": "2026-06-13",
      "note": "開発元別の系列で把握：GPT(汎用/連携)・Claude(長文/コード/安全)・Gemini(マルチモーダル/長文脈)・Llama(オープン/自社運用)。用途で選ぶ時代。"
    },
    {
      "topic": "ビジネスで生成AIを活用する際の意識点",
      "genre": "ai",
      "date": "2026-06-13",
      "note": "①情報セキュリティ ②著作権 ③ハルシネーション対策 ④目的設定と効果測定 ⑤組織・人の対応 ⑥活用の3方向性。"
    },
    {
      "topic": "CI/CD（継続的インテグレーション／デリバリー）",
      "genre": "dev",
      "date": "2026-06-13",
      "note": "コード変更の統合・テスト・リリースを自動化。CI=頻繁な統合と自動テスト、CD=デプロイ自動化。品質と速度を両立。"
    },
    {
      "topic": "IDE（統合開発環境）",
      "genre": "dev",
      "date": "2026-06-13",
      "note": "エディタ・ビルド・デバッグ・テスト等を一つに統合した開発環境。代表例：VS Code、IntelliJ IDEA、Xcode。"
    },
    {
      "topic": "AWS Cloud Adoption Framework (CAF)",
      "genre": "cloud",
      "date": "2026-06-13",
      "note": "クラウド導入を6パースペクティブ（Business/People/Governance/Platform/Security/Operations）で整理する組織向けフレームワーク。"
    },
    {
      "topic": "クラウドの種類",
      "genre": "cloud",
      "date": "2026-06-13",
      "note": "提供範囲＝IaaS/PaaS/SaaS、利用形態＝パブリック/プライベート/ハイブリッドの2軸で分類。"
    },
    {
      "topic": "クラウドのシェアと役割",
      "genre": "cloud",
      "date": "2026-06-13",
      "note": "Synergy Q4 2025: AWS 28% / Azure 21% / Google 14%（上位3社 約63%）。役割＝即時調達・スケール・CapEx→OpEx・DX/AIの土台。"
    },
    {
      "topic": "Claude Skills（Agent Skills）",
      "genre": "ai",
      "date": "2026-06-03",
      "note": "再利用可能な手順＋資源をフォルダ単位でまとめ、必要時にロードしてClaudeを専門家化する仕組み。導入時は中身を監査。"
    }
  ]
}
````

## 4. 完全なアプリHTML（スタンドアロン `index.html`）

そのまま `.html` で保存してブラウザで開けば動作します。

````html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Anything Memo トラッカー</title>
</head>
<body style="margin:0">
<style>
#amt{--bg:#f8fafc;--card:#fff;--border:#e6e9ef;--text:#1e2330;--muted:#6b7280;--accent:#2f6bff;--chip:#1f2430;background:var(--bg);color:var(--text);font-family:-apple-system,"Segoe UI","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;line-height:1.55;min-height:100vh;}
#amt *{box-sizing:border-box;}
#amt .wrap{max-width:900px;margin:0 auto;padding:22px 16px 60px;}
#amt .hero{background:linear-gradient(120deg,#ebefff,#f1eafe);border:1px solid #e6e3fb;border-radius:14px;padding:20px 22px;margin-bottom:16px;}
#amt .hero h1{margin:0 0 6px;font-size:1.4rem;}#amt .hero p{margin:0;color:#5b6072;font-size:.85rem;}
#amt .banner{background:#eff4ff;border:1px solid #c7d7fe;color:#1e40af;border-radius:8px;padding:8px 12px;font-size:.78rem;margin-bottom:14px;}
#amt .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;}
#amt .stat{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 14px;}
#amt .stat .n{font-size:1.5rem;font-weight:800;}#amt .stat .l{font-size:.72rem;color:var(--muted);}
#amt .panel{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:16px;}
#amt .panel h2{margin:0 0 12px;font-size:.9rem;}
#amt .grow{display:grid;grid-template-columns:150px 1fr 30px;align-items:center;gap:10px;margin:7px 0;font-size:.8rem;}
#amt .grow .track{height:12px;background:#eef1f6;border-radius:6px;overflow:hidden;}
#amt .grow .track>span{display:block;height:100%;border-radius:6px;}
#amt .grow .cnt{text-align:right;color:var(--muted);font-weight:700;font-variant-numeric:tabular-nums;}
#amt .toolbar{display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;}
#amt .search{flex:1;min-width:220px;border:1px solid var(--border);border-radius:9px;padding:9px 12px;font-size:.85rem;background:var(--card);font-family:inherit;}
#amt .search:focus{outline:2px solid var(--accent);outline-offset:1px;}
#amt .sort{border:1px solid var(--border);background:var(--card);border-radius:9px;padding:9px 12px;font-size:.8rem;color:var(--muted);cursor:pointer;font-family:inherit;}
#amt .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
#amt .chip{border:1px solid var(--border);background:var(--card);border-radius:999px;padding:6px 13px;font-size:.78rem;cursor:pointer;color:var(--muted);font-weight:600;font-family:inherit;}
#amt .chip.active{background:var(--chip);color:#fff;border-color:var(--chip);}
#amt .memos{display:flex;flex-direction:column;gap:12px;}
#amt .memo{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:15px 18px;}
#amt .memo .top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;}
#amt .memo .t{color:var(--accent);font-weight:800;font-size:.98rem;margin-bottom:6px;}
#amt .memo .note{font-size:.83rem;color:#3a4051;margin-bottom:10px;}
#amt .memo .meta{display:flex;align-items:center;gap:10px;font-size:.74rem;color:var(--muted);}
#amt .badge{border-radius:999px;padding:3px 10px;font-weight:700;font-size:.72rem;}
#amt .empty{color:var(--muted);font-size:.85rem;padding:20px;text-align:center;}
#amt footer{margin-top:26px;font-size:.74rem;color:var(--muted);}

#amt .editbar{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px;}
#amt .ebtn{border:1px solid var(--border);background:var(--card);border-radius:8px;padding:8px 12px;font-size:.8rem;font-weight:700;cursor:pointer;color:var(--text);font-family:inherit;}
#amt .ebtn.primary{background:var(--accent);color:#fff;border-color:var(--accent);}
#amt .ebtn:hover{filter:brightness(.97);}
#amt .form{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:16px;display:none;}
#amt .form.open{display:block;}
#amt .form h3{margin:0 0 12px;font-size:.9rem;}
#amt .fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:12px;}
#amt .field label{display:block;font-size:.72rem;color:var(--muted);margin-bottom:4px;font-weight:700;}
#amt .field input,#amt .field select,#amt .field textarea{width:100%;border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:.82rem;font-family:inherit;background:#fff;color:var(--text);}
#amt .field textarea{min-height:64px;resize:vertical;}
#amt .field input:focus,#amt .field select:focus,#amt .field textarea:focus{outline:2px solid var(--accent);outline-offset:1px;}
#amt .factions{display:flex;gap:8px;}
#amt .rowbtns{display:inline-flex;gap:6px;}
#amt .ib{border:1px solid var(--border);background:var(--card);border-radius:6px;padding:2px 8px;font-size:.72rem;cursor:pointer;color:var(--muted);font-family:inherit;}
#amt .ib:hover{color:var(--text);}
</style>
<div id="amt"><div class="wrap">
<div class="hero"><h1>🗂️ Anything Memo トラッカー</h1><p>キーワードから作った「調べ済みノート」を追跡。メモの追加・編集ができ、データはブラウザ内に保存されます。</p></div>
<div class="banner">Cowork のアーティファクトを Code 側に移設した<strong>編集可能な単体版</strong>です。追加・編集・削除はローカル保存され、JSONで書き出し／読み込みできます。</div>
<div class="editbar"><button class="ebtn primary" id="amtAdd">＋ メモ追加</button><button class="ebtn" id="amtExport">⬇ JSONエクスポート</button><button class="ebtn" id="amtImport">⬆ JSONインポート</button><button class="ebtn" id="amtReset">↺ 初期データに戻す</button></div>
<div class="form" id="amtForm"><h3 id="amtFormTitle">メモを追加</h3>
<div class="fgrid">
<div class="field" style="grid-column:1/-1"><label>トピック</label><input id="aTopic" placeholder="例: RAG（検索拡張生成）"></div>
<div class="field"><label>ジャンル</label><select id="aGenre"></select></div>
<div class="field"><label>日付</label><input id="aDate" type="date"></div>
<div class="field" style="grid-column:1/-1"><label>メモ</label><textarea id="aNote" placeholder="要点を1〜2文で"></textarea></div>
</div>
<div class="factions"><button class="ebtn primary" id="aSave">保存</button><button class="ebtn" id="aCancel">キャンセル</button></div></div>
<div class="stats" id="amtStats"></div>
<div class="panel"><h2>ジャンル別の件数</h2><div id="amtGenreBars"></div></div>
<div class="toolbar"><input class="search" id="amtSearch" placeholder="🔍 トピック・メモ・ジャンルを検索"><button class="sort" id="amtSort">並び替え：日付順 ↓</button></div>
<div class="chips" id="amtChips"></div>
<div class="memos" id="amtList"></div>
<footer>元データ: Cowork「Anything Memo Tracker」PDFより抽出。編集内容はこのブラウザに保存されます。</footer>
</div></div>
<script>
(function(){

function _exportJSON(fname,obj){var blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download=fname;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);}
function _importJSON(cb){var inp=document.createElement("input");inp.type="file";inp.accept=".json,application/json";inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{cb(JSON.parse(r.result));}catch(e){alert("JSONの読み込みに失敗しました: "+e.message);}};r.readAsText(f);};inp.click();}
function _uid(){return "x"+Date.now().toString(36)+Math.floor(Math.random()*1e6).toString(36);}
const BASE={"genres": [{"key": "ai", "emoji": "🤖", "name": "AI/生成AI", "fill": "#f1eafe", "text": "#9333ea", "count": 9}, {"key": "cloud", "emoji": "☁️", "name": "クラウド/インフラ", "fill": "#eaf0ff", "text": "#2f6bff", "count": 4}, {"key": "dev", "emoji": "🔧", "name": "開発/DevOps", "fill": "#e6f6ee", "text": "#15803d", "count": 3}, {"key": "biz", "emoji": "📈", "name": "ビジネス/マーケ", "fill": "#fde8d7", "text": "#d9480f", "count": 3}, {"key": "data", "emoji": "📊", "name": "データ/分析", "fill": "#e2f5fa", "text": "#0891b2", "count": 1}], "memos": [{"topic": "MMR（Maximal Marginal Relevance）", "genre": "ai", "date": "2026-07-15", "note": "検索/RAGで結果を選ぶ再ランク手法。クエリとの関連度と、既に選んだ文書との非類似度を両立させて選択。λで関連性と多様性のバランスを調整し、重複を減らして多様な文脈をLLMへ渡す。", "id": "m1"}, {"topic": "MCP（Model Context Protocol）", "genre": "ai", "date": "2026-07-15", "note": "LLMと外部ツール・データソースをつなぐAnthropic発のオープン標準（2024年11月公開）。JSON-RPCベースで双方向接続し、連携のN×M爆発をM+Nに削減。OpenAIやGoogleも採用。", "id": "m2"}, {"topic": "TCO（総所有コスト）", "genre": "biz", "date": "2026-06-13", "note": "導入から廃棄までのライフサイクル全体でかかる総費用。初期費用＋運用・保守・人件費・廃棄まで含めて比較する考え方。", "id": "m3"}, {"topic": "Kubernetes（K8s）", "genre": "cloud", "date": "2026-06-13", "note": "コンテナ化アプリのデプロイ・スケーリング・管理を自動化するOSS基盤。自動スケール・自己修復・ロールバックが強み。", "id": "m4"}, {"topic": "データの民主化", "genre": "data", "date": "2026-06-13", "note": "社員全員がデータにアクセス・活用できる環境を整えること。「専門家だけのデータ」を誰もが使える状態に。AIの民主化のデータ版。", "id": "m5"}, {"topic": "疎結合（Loose Coupling）", "genre": "dev", "date": "2026-06-13", "note": "コンポーネント同士の依存を最小化し独立性を高める設計原則。変更に強く、独立した開発・デプロイ・スケールがしやすい。", "id": "m6"}, {"topic": "AIの民主化", "genre": "ai", "date": "2026-06-13", "note": "AIが「専門家だけのもの」から「誰でも使えるもの」へ開かれた状態。ノーコード・生成AIが加速。利便とリスクが両立。", "id": "m7"}, {"topic": "DAP（デジタルアダプションプラットフォーム）", "genre": "biz", "date": "2026-06-13", "note": "ソフトの画面にガイドを重ねて表示し、ユーザーの「使いこなし（定着）」を促すツール。WalkMe・Pendo・Whatfixが代表。", "id": "m8"}, {"topic": "CAC（顧客獲得コスト）", "genre": "biz", "date": "2026-06-13", "note": "新規顧客1人の獲得にかかった営業・マーケ費用。CAC=費用合計÷新規獲得顧客数。LTV÷CAC≧3が目安。", "id": "m9"}, {"topic": "主要なPython AI/MLライブラリ（6選）", "genre": "ai", "date": "2026-06-13", "note": "NumPy(土台)→Pandas(データ)→Matplotlib(可視化)→scikit-learn(古典ML)→TensorFlow/PyTorch(深層学習)の層で把握。", "id": "m10"}, {"topic": "AI開発に使われるプログラミング言語", "genre": "ai", "date": "2026-06-13", "note": "事実上の標準はPython（豊富なライブラリ＋書きやすさ）。用途に応じてR・Julia・C++・Java/Scala・JSが補完。", "id": "m11"}, {"topic": "Harness Engineering（エージェントハーネス設計）", "genre": "ai", "date": "2026-06-13", "note": "AIエージェントの性能はモデル本体だけでなく「周り（ハーネス）」の設計で決まる。その足場を意図的に設計する分野。", "id": "m12"}, {"topic": "代表的なLLMの種類と特徴", "genre": "ai", "date": "2026-06-13", "note": "開発元別の系列で把握：GPT(汎用/連携)・Claude(長文/コード/安全)・Gemini(マルチモーダル/長文脈)・Llama(オープン/自社運用)。用途で選ぶ時代。", "id": "m13"}, {"topic": "ビジネスで生成AIを活用する際の意識点", "genre": "ai", "date": "2026-06-13", "note": "①情報セキュリティ ②著作権 ③ハルシネーション対策 ④目的設定と効果測定 ⑤組織・人の対応 ⑥活用の3方向性。", "id": "m14"}, {"topic": "CI/CD（継続的インテグレーション／デリバリー）", "genre": "dev", "date": "2026-06-13", "note": "コード変更の統合・テスト・リリースを自動化。CI=頻繁な統合と自動テスト、CD=デプロイ自動化。品質と速度を両立。", "id": "m15"}, {"topic": "IDE（統合開発環境）", "genre": "dev", "date": "2026-06-13", "note": "エディタ・ビルド・デバッグ・テスト等を一つに統合した開発環境。代表例：VS Code、IntelliJ IDEA、Xcode。", "id": "m16"}, {"topic": "AWS Cloud Adoption Framework (CAF)", "genre": "cloud", "date": "2026-06-13", "note": "クラウド導入を6パースペクティブ（Business/People/Governance/Platform/Security/Operations）で整理する組織向けフレームワーク。", "id": "m17"}, {"topic": "クラウドの種類", "genre": "cloud", "date": "2026-06-13", "note": "提供範囲＝IaaS/PaaS/SaaS、利用形態＝パブリック/プライベート/ハイブリッドの2軸で分類。", "id": "m18"}, {"topic": "クラウドのシェアと役割", "genre": "cloud", "date": "2026-06-13", "note": "Synergy Q4 2025: AWS 28% / Azure 21% / Google 14%（上位3社 約63%）。役割＝即時調達・スケール・CapEx→OpEx・DX/AIの土台。", "id": "m19"}, {"topic": "Claude Skills（Agent Skills）", "genre": "ai", "date": "2026-06-03", "note": "再利用可能な手順＋資源をフォルダ単位でまとめ、必要時にロードしてClaudeを専門家化する仕組み。導入時は中身を監査。", "id": "m20"}]};
const LS="anything-memo-tracker.data.v2";
function clone(o){return JSON.parse(JSON.stringify(o));}
function load(){try{var s=JSON.parse(localStorage.getItem(LS));if(s&&s.memos)return s;}catch(e){}return clone(BASE);}
function save(){try{localStorage.setItem(LS,JSON.stringify(D));}catch(e){}}
var D=load();var G=Object.fromEntries(D.genres.map(function(g){return [g.key,g];}));
var activeGenre="all",q="",sortDesc=true,editing=null;
var $=function(id){return document.getElementById(id);};
function esc(t){return String(t).replace(/[&<>]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[m];});}
function counts(){var c={};D.genres.forEach(function(g){c[g.key]=0;});D.memos.forEach(function(m){if(c[m.genre]!=null)c[m.genre]++;});return c;}
function renderStats(){var withNote=D.memos.filter(function(m){return m.note&&m.note.trim();}).length;$("amtStats").innerHTML=[["メモ総数",D.memos.length],["ジャンル数",D.genres.length],["詳細あり",withNote]].map(function(x){return '<div class="stat"><div class="n">'+x[1]+'</div><div class="l">'+x[0]+"</div></div>";}).join("");}
function renderBars(){var c=counts();var max=Math.max(1,...Object.values(c));$("amtGenreBars").innerHTML=D.genres.map(function(g){return '<div class="grow"><span>'+g.emoji+" "+g.name+'</span><span class="track"><span style="width:'+(c[g.key]/max*100)+"%;background:"+g.text+'"></span></span><span class="cnt">'+c[g.key]+"</span></div>";}).join("");}
function renderChips(){var c=counts();var chips=['<button class="chip '+(activeGenre==="all"?"active":"")+'" data-g="all">すべて</button>'].concat(D.genres.map(function(g){return '<button class="chip '+(activeGenre===g.key?"active":"")+'" data-g="'+g.key+'">'+g.emoji+" "+g.name+" ("+c[g.key]+")</button>";}));$("amtChips").innerHTML=chips.join("");$("amtChips").querySelectorAll(".chip").forEach(function(x){x.onclick=function(){activeGenre=x.dataset.g;renderChips();renderList();};});}
function renderList(){var items=D.memos.slice();if(activeGenre!=="all")items=items.filter(function(m){return m.genre===activeGenre;});if(q){var s=q.toLowerCase();items=items.filter(function(m){return (m.topic+m.note+(G[m.genre]?G[m.genre].name:"")).toLowerCase().indexOf(s)>=0;});}items.sort(function(a,b){return sortDesc?String(b.date).localeCompare(a.date):String(a.date).localeCompare(b.date);});if(!items.length){$("amtList").innerHTML='<div class="empty">該当するメモがありません。</div>';return;}$("amtList").innerHTML=items.map(function(m){var g=G[m.genre]||{fill:"#eee",text:"#333",emoji:"",name:m.genre};return '<div class="memo"><div class="top"><div class="t">'+esc(m.topic)+' ›</div><span class="rowbtns"><button class="ib" data-edit="'+m.id+'">✎</button><button class="ib" data-del="'+m.id+'">✕</button></span></div><div class="note">'+esc(m.note)+'</div><div class="meta"><span class="badge" style="background:'+g.fill+";color:"+g.text+'">'+g.emoji+" "+g.name+'</span><span>📅 '+esc(m.date)+"</span></div></div>";}).join("");$("amtList").querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(){openEdit(b.dataset.edit);};});$("amtList").querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){delMemo(b.dataset.del);};});}
function fillGenreSelect(){$("aGenre").innerHTML=D.genres.map(function(g){return '<option value="'+g.key+'">'+g.emoji+" "+g.name+"</option>";}).join("");}
function openAdd(){editing=null;$("amtFormTitle").textContent="メモを追加";$("aTopic").value="";$("aGenre").value=D.genres[0].key;$("aDate").value="2026-07-15";$("aNote").value="";$("amtForm").classList.add("open");}
function openEdit(id){var m=D.memos.find(function(x){return x.id===id;});if(!m)return;editing=id;$("amtFormTitle").textContent="メモを編集";$("aTopic").value=m.topic;$("aGenre").value=m.genre;$("aDate").value=m.date;$("aNote").value=m.note;$("amtForm").classList.add("open");}
function closeForm(){$("amtForm").classList.remove("open");}
function saveForm(){var topic=$("aTopic").value.trim();if(!topic){alert("トピックを入力してください");return;}var rec={topic:topic,genre:$("aGenre").value,date:$("aDate").value||"",note:$("aNote").value.trim()};if(editing){var m=D.memos.find(function(x){return x.id===editing;});Object.assign(m,rec);}else{rec.id=_uid();D.memos.unshift(rec);}save();closeForm();renderAll();}
function delMemo(id){var m=D.memos.find(function(x){return x.id===id;});if(!m)return;if(!confirm("「"+m.topic+"」を削除しますか？"))return;D.memos=D.memos.filter(function(x){return x.id!==id;});save();renderAll();}
function renderAll(){G=Object.fromEntries(D.genres.map(function(g){return [g.key,g];}));renderStats();renderBars();renderChips();renderList();}
$("amtSearch").oninput=function(e){q=e.target.value;renderList();};
$("amtSort").onclick=function(){sortDesc=!sortDesc;$("amtSort").textContent="並び替え：日付順 "+(sortDesc?"↓":"↑");renderList();};
$("amtAdd").onclick=openAdd;$("aSave").onclick=saveForm;$("aCancel").onclick=closeForm;
$("amtExport").onclick=function(){_exportJSON("anything-memo-tracker-data.json",D);};
$("amtImport").onclick=function(){_importJSON(function(obj){if(!obj.memos){alert("形式が不正です");return;}D=obj;save();renderAll();});};
$("amtReset").onclick=function(){if(confirm("編集内容を破棄して初期データに戻しますか？")){D=clone(BASE);save();renderAll();}};
fillGenreSelect();renderAll();
})();
</script>
</body>
</html>
````

## 5. 埋め込み用HTML（`artifact.html`）

`<!DOCTYPE>`/`<html>`/`<head>`/`<body>` を含まない断片版。既存ページ内に差し込む/Artifact公開する場合はこちら。

````html
<title>Anything Memo トラッカー</title>
<style>
#amt{--bg:#f8fafc;--card:#fff;--border:#e6e9ef;--text:#1e2330;--muted:#6b7280;--accent:#2f6bff;--chip:#1f2430;background:var(--bg);color:var(--text);font-family:-apple-system,"Segoe UI","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;line-height:1.55;min-height:100vh;}
#amt *{box-sizing:border-box;}
#amt .wrap{max-width:900px;margin:0 auto;padding:22px 16px 60px;}
#amt .hero{background:linear-gradient(120deg,#ebefff,#f1eafe);border:1px solid #e6e3fb;border-radius:14px;padding:20px 22px;margin-bottom:16px;}
#amt .hero h1{margin:0 0 6px;font-size:1.4rem;}#amt .hero p{margin:0;color:#5b6072;font-size:.85rem;}
#amt .banner{background:#eff4ff;border:1px solid #c7d7fe;color:#1e40af;border-radius:8px;padding:8px 12px;font-size:.78rem;margin-bottom:14px;}
#amt .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;}
#amt .stat{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 14px;}
#amt .stat .n{font-size:1.5rem;font-weight:800;}#amt .stat .l{font-size:.72rem;color:var(--muted);}
#amt .panel{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:16px;}
#amt .panel h2{margin:0 0 12px;font-size:.9rem;}
#amt .grow{display:grid;grid-template-columns:150px 1fr 30px;align-items:center;gap:10px;margin:7px 0;font-size:.8rem;}
#amt .grow .track{height:12px;background:#eef1f6;border-radius:6px;overflow:hidden;}
#amt .grow .track>span{display:block;height:100%;border-radius:6px;}
#amt .grow .cnt{text-align:right;color:var(--muted);font-weight:700;font-variant-numeric:tabular-nums;}
#amt .toolbar{display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;}
#amt .search{flex:1;min-width:220px;border:1px solid var(--border);border-radius:9px;padding:9px 12px;font-size:.85rem;background:var(--card);font-family:inherit;}
#amt .search:focus{outline:2px solid var(--accent);outline-offset:1px;}
#amt .sort{border:1px solid var(--border);background:var(--card);border-radius:9px;padding:9px 12px;font-size:.8rem;color:var(--muted);cursor:pointer;font-family:inherit;}
#amt .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
#amt .chip{border:1px solid var(--border);background:var(--card);border-radius:999px;padding:6px 13px;font-size:.78rem;cursor:pointer;color:var(--muted);font-weight:600;font-family:inherit;}
#amt .chip.active{background:var(--chip);color:#fff;border-color:var(--chip);}
#amt .memos{display:flex;flex-direction:column;gap:12px;}
#amt .memo{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:15px 18px;}
#amt .memo .top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;}
#amt .memo .t{color:var(--accent);font-weight:800;font-size:.98rem;margin-bottom:6px;}
#amt .memo .note{font-size:.83rem;color:#3a4051;margin-bottom:10px;}
#amt .memo .meta{display:flex;align-items:center;gap:10px;font-size:.74rem;color:var(--muted);}
#amt .badge{border-radius:999px;padding:3px 10px;font-weight:700;font-size:.72rem;}
#amt .empty{color:var(--muted);font-size:.85rem;padding:20px;text-align:center;}
#amt footer{margin-top:26px;font-size:.74rem;color:var(--muted);}

#amt .editbar{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px;}
#amt .ebtn{border:1px solid var(--border);background:var(--card);border-radius:8px;padding:8px 12px;font-size:.8rem;font-weight:700;cursor:pointer;color:var(--text);font-family:inherit;}
#amt .ebtn.primary{background:var(--accent);color:#fff;border-color:var(--accent);}
#amt .ebtn:hover{filter:brightness(.97);}
#amt .form{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:16px;display:none;}
#amt .form.open{display:block;}
#amt .form h3{margin:0 0 12px;font-size:.9rem;}
#amt .fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:12px;}
#amt .field label{display:block;font-size:.72rem;color:var(--muted);margin-bottom:4px;font-weight:700;}
#amt .field input,#amt .field select,#amt .field textarea{width:100%;border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:.82rem;font-family:inherit;background:#fff;color:var(--text);}
#amt .field textarea{min-height:64px;resize:vertical;}
#amt .field input:focus,#amt .field select:focus,#amt .field textarea:focus{outline:2px solid var(--accent);outline-offset:1px;}
#amt .factions{display:flex;gap:8px;}
#amt .rowbtns{display:inline-flex;gap:6px;}
#amt .ib{border:1px solid var(--border);background:var(--card);border-radius:6px;padding:2px 8px;font-size:.72rem;cursor:pointer;color:var(--muted);font-family:inherit;}
#amt .ib:hover{color:var(--text);}
</style>
<div id="amt"><div class="wrap">
<div class="hero"><h1>🗂️ Anything Memo トラッカー</h1><p>キーワードから作った「調べ済みノート」を追跡。メモの追加・編集ができ、データはブラウザ内に保存されます。</p></div>
<div class="banner">Cowork のアーティファクトを Code 側に移設した<strong>編集可能な単体版</strong>です。追加・編集・削除はローカル保存され、JSONで書き出し／読み込みできます。</div>
<div class="editbar"><button class="ebtn primary" id="amtAdd">＋ メモ追加</button><button class="ebtn" id="amtExport">⬇ JSONエクスポート</button><button class="ebtn" id="amtImport">⬆ JSONインポート</button><button class="ebtn" id="amtReset">↺ 初期データに戻す</button></div>
<div class="form" id="amtForm"><h3 id="amtFormTitle">メモを追加</h3>
<div class="fgrid">
<div class="field" style="grid-column:1/-1"><label>トピック</label><input id="aTopic" placeholder="例: RAG（検索拡張生成）"></div>
<div class="field"><label>ジャンル</label><select id="aGenre"></select></div>
<div class="field"><label>日付</label><input id="aDate" type="date"></div>
<div class="field" style="grid-column:1/-1"><label>メモ</label><textarea id="aNote" placeholder="要点を1〜2文で"></textarea></div>
</div>
<div class="factions"><button class="ebtn primary" id="aSave">保存</button><button class="ebtn" id="aCancel">キャンセル</button></div></div>
<div class="stats" id="amtStats"></div>
<div class="panel"><h2>ジャンル別の件数</h2><div id="amtGenreBars"></div></div>
<div class="toolbar"><input class="search" id="amtSearch" placeholder="🔍 トピック・メモ・ジャンルを検索"><button class="sort" id="amtSort">並び替え：日付順 ↓</button></div>
<div class="chips" id="amtChips"></div>
<div class="memos" id="amtList"></div>
<footer>元データ: Cowork「Anything Memo Tracker」PDFより抽出。編集内容はこのブラウザに保存されます。</footer>
</div></div>
<script>
(function(){

function _exportJSON(fname,obj){var blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download=fname;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);}
function _importJSON(cb){var inp=document.createElement("input");inp.type="file";inp.accept=".json,application/json";inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{cb(JSON.parse(r.result));}catch(e){alert("JSONの読み込みに失敗しました: "+e.message);}};r.readAsText(f);};inp.click();}
function _uid(){return "x"+Date.now().toString(36)+Math.floor(Math.random()*1e6).toString(36);}
const BASE={"genres": [{"key": "ai", "emoji": "🤖", "name": "AI/生成AI", "fill": "#f1eafe", "text": "#9333ea", "count": 9}, {"key": "cloud", "emoji": "☁️", "name": "クラウド/インフラ", "fill": "#eaf0ff", "text": "#2f6bff", "count": 4}, {"key": "dev", "emoji": "🔧", "name": "開発/DevOps", "fill": "#e6f6ee", "text": "#15803d", "count": 3}, {"key": "biz", "emoji": "📈", "name": "ビジネス/マーケ", "fill": "#fde8d7", "text": "#d9480f", "count": 3}, {"key": "data", "emoji": "📊", "name": "データ/分析", "fill": "#e2f5fa", "text": "#0891b2", "count": 1}], "memos": [{"topic": "MMR（Maximal Marginal Relevance）", "genre": "ai", "date": "2026-07-15", "note": "検索/RAGで結果を選ぶ再ランク手法。クエリとの関連度と、既に選んだ文書との非類似度を両立させて選択。λで関連性と多様性のバランスを調整し、重複を減らして多様な文脈をLLMへ渡す。", "id": "m1"}, {"topic": "MCP（Model Context Protocol）", "genre": "ai", "date": "2026-07-15", "note": "LLMと外部ツール・データソースをつなぐAnthropic発のオープン標準（2024年11月公開）。JSON-RPCベースで双方向接続し、連携のN×M爆発をM+Nに削減。OpenAIやGoogleも採用。", "id": "m2"}, {"topic": "TCO（総所有コスト）", "genre": "biz", "date": "2026-06-13", "note": "導入から廃棄までのライフサイクル全体でかかる総費用。初期費用＋運用・保守・人件費・廃棄まで含めて比較する考え方。", "id": "m3"}, {"topic": "Kubernetes（K8s）", "genre": "cloud", "date": "2026-06-13", "note": "コンテナ化アプリのデプロイ・スケーリング・管理を自動化するOSS基盤。自動スケール・自己修復・ロールバックが強み。", "id": "m4"}, {"topic": "データの民主化", "genre": "data", "date": "2026-06-13", "note": "社員全員がデータにアクセス・活用できる環境を整えること。「専門家だけのデータ」を誰もが使える状態に。AIの民主化のデータ版。", "id": "m5"}, {"topic": "疎結合（Loose Coupling）", "genre": "dev", "date": "2026-06-13", "note": "コンポーネント同士の依存を最小化し独立性を高める設計原則。変更に強く、独立した開発・デプロイ・スケールがしやすい。", "id": "m6"}, {"topic": "AIの民主化", "genre": "ai", "date": "2026-06-13", "note": "AIが「専門家だけのもの」から「誰でも使えるもの」へ開かれた状態。ノーコード・生成AIが加速。利便とリスクが両立。", "id": "m7"}, {"topic": "DAP（デジタルアダプションプラットフォーム）", "genre": "biz", "date": "2026-06-13", "note": "ソフトの画面にガイドを重ねて表示し、ユーザーの「使いこなし（定着）」を促すツール。WalkMe・Pendo・Whatfixが代表。", "id": "m8"}, {"topic": "CAC（顧客獲得コスト）", "genre": "biz", "date": "2026-06-13", "note": "新規顧客1人の獲得にかかった営業・マーケ費用。CAC=費用合計÷新規獲得顧客数。LTV÷CAC≧3が目安。", "id": "m9"}, {"topic": "主要なPython AI/MLライブラリ（6選）", "genre": "ai", "date": "2026-06-13", "note": "NumPy(土台)→Pandas(データ)→Matplotlib(可視化)→scikit-learn(古典ML)→TensorFlow/PyTorch(深層学習)の層で把握。", "id": "m10"}, {"topic": "AI開発に使われるプログラミング言語", "genre": "ai", "date": "2026-06-13", "note": "事実上の標準はPython（豊富なライブラリ＋書きやすさ）。用途に応じてR・Julia・C++・Java/Scala・JSが補完。", "id": "m11"}, {"topic": "Harness Engineering（エージェントハーネス設計）", "genre": "ai", "date": "2026-06-13", "note": "AIエージェントの性能はモデル本体だけでなく「周り（ハーネス）」の設計で決まる。その足場を意図的に設計する分野。", "id": "m12"}, {"topic": "代表的なLLMの種類と特徴", "genre": "ai", "date": "2026-06-13", "note": "開発元別の系列で把握：GPT(汎用/連携)・Claude(長文/コード/安全)・Gemini(マルチモーダル/長文脈)・Llama(オープン/自社運用)。用途で選ぶ時代。", "id": "m13"}, {"topic": "ビジネスで生成AIを活用する際の意識点", "genre": "ai", "date": "2026-06-13", "note": "①情報セキュリティ ②著作権 ③ハルシネーション対策 ④目的設定と効果測定 ⑤組織・人の対応 ⑥活用の3方向性。", "id": "m14"}, {"topic": "CI/CD（継続的インテグレーション／デリバリー）", "genre": "dev", "date": "2026-06-13", "note": "コード変更の統合・テスト・リリースを自動化。CI=頻繁な統合と自動テスト、CD=デプロイ自動化。品質と速度を両立。", "id": "m15"}, {"topic": "IDE（統合開発環境）", "genre": "dev", "date": "2026-06-13", "note": "エディタ・ビルド・デバッグ・テスト等を一つに統合した開発環境。代表例：VS Code、IntelliJ IDEA、Xcode。", "id": "m16"}, {"topic": "AWS Cloud Adoption Framework (CAF)", "genre": "cloud", "date": "2026-06-13", "note": "クラウド導入を6パースペクティブ（Business/People/Governance/Platform/Security/Operations）で整理する組織向けフレームワーク。", "id": "m17"}, {"topic": "クラウドの種類", "genre": "cloud", "date": "2026-06-13", "note": "提供範囲＝IaaS/PaaS/SaaS、利用形態＝パブリック/プライベート/ハイブリッドの2軸で分類。", "id": "m18"}, {"topic": "クラウドのシェアと役割", "genre": "cloud", "date": "2026-06-13", "note": "Synergy Q4 2025: AWS 28% / Azure 21% / Google 14%（上位3社 約63%）。役割＝即時調達・スケール・CapEx→OpEx・DX/AIの土台。", "id": "m19"}, {"topic": "Claude Skills（Agent Skills）", "genre": "ai", "date": "2026-06-03", "note": "再利用可能な手順＋資源をフォルダ単位でまとめ、必要時にロードしてClaudeを専門家化する仕組み。導入時は中身を監査。", "id": "m20"}]};
const LS="anything-memo-tracker.data.v2";
function clone(o){return JSON.parse(JSON.stringify(o));}
function load(){try{var s=JSON.parse(localStorage.getItem(LS));if(s&&s.memos)return s;}catch(e){}return clone(BASE);}
function save(){try{localStorage.setItem(LS,JSON.stringify(D));}catch(e){}}
var D=load();var G=Object.fromEntries(D.genres.map(function(g){return [g.key,g];}));
var activeGenre="all",q="",sortDesc=true,editing=null;
var $=function(id){return document.getElementById(id);};
function esc(t){return String(t).replace(/[&<>]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[m];});}
function counts(){var c={};D.genres.forEach(function(g){c[g.key]=0;});D.memos.forEach(function(m){if(c[m.genre]!=null)c[m.genre]++;});return c;}
function renderStats(){var withNote=D.memos.filter(function(m){return m.note&&m.note.trim();}).length;$("amtStats").innerHTML=[["メモ総数",D.memos.length],["ジャンル数",D.genres.length],["詳細あり",withNote]].map(function(x){return '<div class="stat"><div class="n">'+x[1]+'</div><div class="l">'+x[0]+"</div></div>";}).join("");}
function renderBars(){var c=counts();var max=Math.max(1,...Object.values(c));$("amtGenreBars").innerHTML=D.genres.map(function(g){return '<div class="grow"><span>'+g.emoji+" "+g.name+'</span><span class="track"><span style="width:'+(c[g.key]/max*100)+"%;background:"+g.text+'"></span></span><span class="cnt">'+c[g.key]+"</span></div>";}).join("");}
function renderChips(){var c=counts();var chips=['<button class="chip '+(activeGenre==="all"?"active":"")+'" data-g="all">すべて</button>'].concat(D.genres.map(function(g){return '<button class="chip '+(activeGenre===g.key?"active":"")+'" data-g="'+g.key+'">'+g.emoji+" "+g.name+" ("+c[g.key]+")</button>";}));$("amtChips").innerHTML=chips.join("");$("amtChips").querySelectorAll(".chip").forEach(function(x){x.onclick=function(){activeGenre=x.dataset.g;renderChips();renderList();};});}
function renderList(){var items=D.memos.slice();if(activeGenre!=="all")items=items.filter(function(m){return m.genre===activeGenre;});if(q){var s=q.toLowerCase();items=items.filter(function(m){return (m.topic+m.note+(G[m.genre]?G[m.genre].name:"")).toLowerCase().indexOf(s)>=0;});}items.sort(function(a,b){return sortDesc?String(b.date).localeCompare(a.date):String(a.date).localeCompare(b.date);});if(!items.length){$("amtList").innerHTML='<div class="empty">該当するメモがありません。</div>';return;}$("amtList").innerHTML=items.map(function(m){var g=G[m.genre]||{fill:"#eee",text:"#333",emoji:"",name:m.genre};return '<div class="memo"><div class="top"><div class="t">'+esc(m.topic)+' ›</div><span class="rowbtns"><button class="ib" data-edit="'+m.id+'">✎</button><button class="ib" data-del="'+m.id+'">✕</button></span></div><div class="note">'+esc(m.note)+'</div><div class="meta"><span class="badge" style="background:'+g.fill+";color:"+g.text+'">'+g.emoji+" "+g.name+'</span><span>📅 '+esc(m.date)+"</span></div></div>";}).join("");$("amtList").querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(){openEdit(b.dataset.edit);};});$("amtList").querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){delMemo(b.dataset.del);};});}
function fillGenreSelect(){$("aGenre").innerHTML=D.genres.map(function(g){return '<option value="'+g.key+'">'+g.emoji+" "+g.name+"</option>";}).join("");}
function openAdd(){editing=null;$("amtFormTitle").textContent="メモを追加";$("aTopic").value="";$("aGenre").value=D.genres[0].key;$("aDate").value="2026-07-15";$("aNote").value="";$("amtForm").classList.add("open");}
function openEdit(id){var m=D.memos.find(function(x){return x.id===id;});if(!m)return;editing=id;$("amtFormTitle").textContent="メモを編集";$("aTopic").value=m.topic;$("aGenre").value=m.genre;$("aDate").value=m.date;$("aNote").value=m.note;$("amtForm").classList.add("open");}
function closeForm(){$("amtForm").classList.remove("open");}
function saveForm(){var topic=$("aTopic").value.trim();if(!topic){alert("トピックを入力してください");return;}var rec={topic:topic,genre:$("aGenre").value,date:$("aDate").value||"",note:$("aNote").value.trim()};if(editing){var m=D.memos.find(function(x){return x.id===editing;});Object.assign(m,rec);}else{rec.id=_uid();D.memos.unshift(rec);}save();closeForm();renderAll();}
function delMemo(id){var m=D.memos.find(function(x){return x.id===id;});if(!m)return;if(!confirm("「"+m.topic+"」を削除しますか？"))return;D.memos=D.memos.filter(function(x){return x.id!==id;});save();renderAll();}
function renderAll(){G=Object.fromEntries(D.genres.map(function(g){return [g.key,g];}));renderStats();renderBars();renderChips();renderList();}
$("amtSearch").oninput=function(e){q=e.target.value;renderList();};
$("amtSort").onclick=function(){sortDesc=!sortDesc;$("amtSort").textContent="並び替え：日付順 "+(sortDesc?"↓":"↑");renderList();};
$("amtAdd").onclick=openAdd;$("aSave").onclick=saveForm;$("aCancel").onclick=closeForm;
$("amtExport").onclick=function(){_exportJSON("anything-memo-tracker-data.json",D);};
$("amtImport").onclick=function(){_importJSON(function(obj){if(!obj.memos){alert("形式が不正です");return;}D=obj;save();renderAll();});};
$("amtReset").onclick=function(){if(confirm("編集内容を破棄して初期データに戻しますか？")){D=clone(BASE);save();renderAll();}};
fillGenreSelect();renderAll();
})();
</script>
````

## 6. Project-Nova 統合メモ

- **名前空間**: すべてのCSS/JSは `#amt` 配下にスコープ済み。ルート要素 `<div id="amt">` を対象ページに挿入すればそのまま動く。
- **データ注入**: `index.html` 内の `const BASE = {...}` にメモ・ジャンルが埋め込まれている。外部の `data.json` を正にしたい場合は、その定数を fetch 読み込みに差し替える（同一オリジン必要）。
- **保存先**: `localStorage['anything-memo-tracker.data.v2']`。Project-Nova側のキー命名と衝突しないよう必要ならリネーム。
- **エクスポート/インポート**: `_exportJSON` / `_importJSON` で JSON を入出力。Nova側のストレージと相互運用する場合はこの2関数を差し替える。
- **ジャンル追加**: `genres` 配列に `{key,emoji,name,fill,text,count}` を足すだけ。`count` は自動再計算される。
- **外部依存なし・CSPフレンドリ**: 画像/フォント/スクリプトの外部読み込みなし。
- **LLMキーワード調査**: このアプリ単体はLLMを呼ばない。語からメモ自動生成は別プロセス（下記 `add_entries.py` ＋LLM）で `data.json` に追記する運用。

## 7. 追加ロジック（`add_entries.py` の memo 部分）

キーワード調査結果を `data.json` に追記するヘルパー（重複は topic でスキップ、ジャンル件数と統計を自動再計算）。

````python
# -*- coding: utf-8 -*-
"""キーワード調査の結果をトラッカーの data.json に追記するヘルパー。
使い方:
  python add_entries.py memo     '[{"topic":..,"genre":"ai","note":..,"date":"2026-07-15"}]'
  python add_entries.py learning '[{"cat":"資格","provider":"MS","name":"AZ-104","bunrui":"Cloud"}]'
追記後は build.py を実行して index.html / artifact を再生成すること。
memo は topic、learning は (cat,name) で重複をスキップする。
"""
import json, sys, os
ART=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def add_memo(entries):
    p=f"{ART}/anything-memo-tracker/data.json"
    d=json.load(open(p,encoding="utf-8"))
    existing={m["topic"] for m in d["memos"]}
    added=0
    for e in entries:
        if e["topic"] in existing:
            print("skip(dup):",e["topic"]); continue
        d["memos"].insert(0,{"topic":e["topic"],"genre":e["genre"],
                             "date":e.get("date","2026-07-15"),"note":e["note"]})
        existing.add(e["topic"]); added+=1
    # recompute genre counts + stats
    gc={g["key"]:0 for g in d["genres"]}
    for m in d["memos"]:
        if m["genre"] in gc: gc[m["genre"]]+=1
    for g in d["genres"]: g["count"]=gc[g["key"]]
    d["stats"]={"memoTotal":len(d["memos"]),"genreCount":len(d["genres"]),
                "withDetail":sum(1 for m in d["memos"] if m.get("note","").strip())}
    json.dump(d,open(p,"w",encoding="utf-8"),ensure_ascii=False,indent=2)
    print(f"memo: +{added} (total {len(d['memos'])})")

def add_learning(entries):
    p=f"{ART}/learning-tracker/data.json"
    d=json.load(open(p,encoding="utf-8"))
    existing={(r["cat"],r["name"]) for r in d["rows"]}
    def next_no(cat):
        return max([r["no"] for r in d["rows"] if r["cat"]==cat]+[0])+1
    added=0
    for e in entries:
        key=(e["cat"],e["name"])
        if key in existing: print("skip(dup):",e["name"]); continue
        d["rows"].append({"no":next_no(e["cat"]),"cat":e["cat"],
                          "provider":e.get("provider",""),"name":e["name"],
                          "bunrui":e.get("bunrui","")})
        existing.add(key); added+=1
    d["totalItems"]=len(d["rows"])
    json.dump(d,open(p,"w",encoding="utf-8"),ensure_ascii=False,indent=0)
    print(f"learning: +{added} (total {len(d['rows'])})")

if __name__=="__main__":
    kind=sys.argv[1]; entries=json.loads(sys.argv[2])
    (add_memo if kind=="memo" else add_learning)(entries)
````
