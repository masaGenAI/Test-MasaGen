// @@nova-part 30-consulting/010-head.jsx
// ================= ConsultingHubModule (source: consulting-thinking-hub.jsx) =================
const ConsultingHubModule = (function () {

/* =====================================================================
   Consulting Thinking Hub — コンサル思考術 統合ハブ
   MBB-level training: Logical / Critical / Lateral / Creative / Structuring
   Architecture: skeleton-first + Q.push() injection (Part 1 = 20 Q/domain)
   ===================================================================== */

// ---------- Design tokens ----------
const C = {
  ink: "#0F1B2D", inkSoft: "#1C2B42", paper: "#F6F7F9", card: "#FFFFFF",
  line: "#E3E7EE", txt: "#182233", sub: "#5A6B85",
  blue: "#2E5BFF", crimson: "#C42F3B", teal: "#0FA3B1", violet: "#7C5CFF",
  gold: "#C9A227", green: "#12B76A", red: "#F04438", amber: "#F79009",
  dx: "#0E9F6E",
};
const serif = 'Georgia, "Times New Roman", "Hiragino Mincho ProN", serif';
const sans = '-apple-system, "Segoe UI", "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif';

// ---------- Domains ----------
const DOMAINS = [
  { id: 0, ja: "ロジカルシンキング", en: "Logical Thinking", color: C.blue, mark: "▲" },
  { id: 1, ja: "クリティカルシンキング", en: "Critical Thinking", color: C.crimson, mark: "◆" },
  { id: 2, ja: "ラテラルシンキング", en: "Lateral Thinking", color: C.teal, mark: "◗" },
  { id: 3, ja: "クリエイティブシンキング", en: "Creative Thinking", color: C.violet, mark: "✦" },
  { id: 4, ja: "構造化", en: "Structuring", color: C.gold, mark: "▤" },
  { id: 5, ja: "DX", en: "Digital Transformation", color: C.dx, mark: "⬢" },
  { id: 6, ja: "AI", en: "AI", color: C.amber, mark: "◈" },
  { id: 7, ja: "論点思考", en: "Issue Thinking", color: "#BE4BDB", mark: "◉" },
  { id: 8, ja: "仮説思考", en: "Hypothesis Thinking", color: "#5C940D", mark: "❖" },
];

// ---------- UI strings ----------
const L = {
  title: { ja: "Consulting Hub", en: "Consulting Hub" },
  subtitle: { ja: "MBB水準の思考筋力を鍛える", en: "Train MBB-grade thinking muscles" },
  tabs: {
    quiz: { ja: "応用クイズ", en: "Applied Quiz" }, basics: { ja: "基礎暗記", en: "Basics" }, mock: { ja: "模試", en: "Mock" }, grand: { ja: "総合模試", en: "Grand Mock" },
    cases: { ja: "ケース演習", en: "Case Drills" }, diagrams: { ja: "図解", en: "Diagrams" },
    confuse: { ja: "混同注意", en: "Confusables" }, glossary: { ja: "用語集", en: "Glossary" },
    atlas: { ja: "体系図", en: "Atlas" },
    progress: { ja: "進捗", en: "Progress" }, srs: { ja: "間隔反復", en: "Spaced Rep" },
  },
  check: { ja: "回答する", en: "Check" }, next: { ja: "次の問題", en: "Next" }, prev: { ja: "前へ", en: "Back" },
  backStep: { ja: "1つ戻る", en: "Step back" },
  basicsQ: { ja: "の定義として正しいのは?", en: "" },
  review: { ja: "苦手復習", en: "Review Misses" },
  noWrong: { ja: "誤答した問題はありません。まずは通常モードで解いてみましょう!", en: "No missed questions yet — try the normal mode first!" },
  caseRead: { ja: "解説モード", en: "Read Mode" },
  caseDrill: { ja: "演習モード", en: "Drill Mode" },
  caseQ: { ja: "次の一手として最も適切なのは?", en: "What is the best next move?" },
  mockDomain: { ja: "出題範囲を選択", en: "Choose scope" },
  daily: { ja: "今日の10問", en: "Daily 10" },
  dailyDesc: { ja: "日替わりの固定10問。毎日同じセットが出るので、その日のうちに全問クリアを目指しましょう。", en: "A fixed set of 10 questions that changes daily. Clear all ten before the day ends!" },
  dailyDone: { ja: "本日の10問、完了!また明日、新しいセットでお会いしましょう。", en: "Today's ten are done! A fresh set arrives tomorrow." },
  exportBtn: { ja: "進捗をエクスポート(JSON)", en: "Export Progress (JSON)" },
  exportDone: { ja: "ダウンロードを開始しました", en: "Download started" },
  importBtn: { ja: "進捗をインポート(JSON)", en: "Import Progress (JSON)" },
  importDone: { ja: "進捗を取り込みました(既存の記録とマージ)。", en: "Progress imported (merged with existing records)." },
  importFail: { ja: "ファイルを読み込めませんでした。エクスポートしたJSONを選んでください。", en: "Could not read the file. Please choose an exported JSON." },
  correct: { ja: "正解!", en: "Correct!" }, wrong: { ja: "不正解", en: "Incorrect" },
  explanation: { ja: "解説", en: "Explanation" },
  allDomains: { ja: "全分野", en: "All Domains" },
  startMock: { ja: "模試を開始(25問)", en: "Start Mock (25 Q)" },
  finish: { ja: "採点する", en: "Grade" },
  score: { ja: "スコア", en: "Score" },
  reset: { ja: "進捗をリセット", en: "Reset progress" },
  search: { ja: "用語を検索…", en: "Search terms…" },
  answered: { ja: "回答済", en: "Answered" },
  accuracy: { ja: "正答率", en: "Accuracy" },
  step: { ja: "ステップ", en: "Step" }, reveal: { ja: "次のステップを表示", en: "Reveal next step" },
  restart: { ja: "最初から", en: "Restart" },
  q: { ja: "問", en: "Q" },
  mockDesc: { ja: "全分野から25問をランダム出題。解説は採点後に表示。", en: "25 random questions across all domains. Explanations shown after grading." },
  retry: { ja: "もう一度", en: "Retry" },
};
