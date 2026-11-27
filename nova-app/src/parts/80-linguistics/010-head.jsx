// @@nova-part 80-linguistics/010-head.jsx
// ================= LinguisticsHubModule (source: linguistics-hub.jsx) =================
const LinguisticsHubModule = (function () {

/* ============================================================
   言語学 統合ハブ / Linguistics Integrated Hub
   ------------------------------------------------------------
   構造: 7カテゴリ → 各分野（うち「知識表現」のみ6サブ項目を内包）
   歴史・比較（3分野）と計算言語学（7分野＋知識表現6サブ項目）に
   3段階難易度（★/★★/★★★）のクイズを実装。
   他の分野は今後の指示に応じて拡張するプレースホルダーのまま。
   ============================================================ */

const STORAGE_KEY = "linguistics-hub-progress-v2";

const CATEGORIES = [
  {
    id: "theoretical",
    ja: "理論言語学",
    en: "Theoretical Linguistics",
    Icon: Waves,
    fields: [
      { id: "phonetics", ja: "音声学", en: "Phonetics" },
      { id: "phonology", ja: "音韻論", en: "Phonology" },
      { id: "morphology", ja: "形態論", en: "Morphology" },
      { id: "syntax", ja: "統語論", en: "Syntax" },
      { id: "semantics", ja: "意味論", en: "Semantics" },
      { id: "pragmatics", ja: "語用論", en: "Pragmatics" },
    ],
  },
  {
    id: "historical",
    ja: "歴史・比較",
    en: "Historical & Comparative",
    Icon: Clock3,
    fields: [
      { id: "historical-ling", ja: "歴史言語学", en: "Historical Linguistics" },
      { id: "comparative-ling", ja: "比較言語学", en: "Comparative Linguistics" },
      { id: "typology", ja: "言語類型論", en: "Linguistic Typology" },
    ],
  },
  {
    id: "social",
    ja: "社会・文化",
    en: "Social & Cultural",
    Icon: Users,
    fields: [
      { id: "sociolinguistics", ja: "社会言語学", en: "Sociolinguistics" },
      { id: "anthro-ling", ja: "人類言語学", en: "Anthropological Linguistics" },
      { id: "dialectology", ja: "方言学", en: "Dialectology" },
    ],
  },
  {
    id: "psycho",
    ja: "心理・脳",
    en: "Psycho & Neuro",
    Icon: Brain,
    fields: [
      { id: "psycholinguistics", ja: "心理言語学", en: "Psycholinguistics" },
      { id: "neurolinguistics", ja: "神経言語学", en: "Neurolinguistics" },
      { id: "l1-acquisition", ja: "第一言語習得", en: "First Language Acquisition" },
      { id: "l2-acquisition", ja: "第二言語習得", en: "Second Language Acquisition" },
    ],
  },
  {
    id: "computational",
    ja: "計算言語学",
    en: "Computational Linguistics",
    Icon: Cpu,
    fields: [
      { id: "corpus", ja: "コーパス言語学", en: "Corpus Linguistics" },
      { id: "nlp", ja: "自然言語処理", en: "Natural Language Processing (NLP)" },
      { id: "speech-processing", ja: "音声言語処理", en: "Speech Processing" },
      { id: "mt", ja: "機械翻訳", en: "Machine Translation" },
      { id: "ir", ja: "情報検索", en: "Information Retrieval" },
      { id: "llm", ja: "LLM", en: "Large Language Models" },
      {
        id: "knowledge-rep",
        ja: "知識表現",
        en: "Knowledge Representation",
        sub: [
          { id: "ontology", ja: "オントロジー", en: "Ontology" },
          { id: "knowledge-graph", ja: "知識グラフ", en: "Knowledge Graph" },
          { id: "rdf", ja: "RDF", en: "RDF" },
          { id: "owl", ja: "OWL", en: "OWL" },
          { id: "semantic-web", ja: "セマンティックWeb", en: "Semantic Web" },
          { id: "reasoning", ja: "推論", en: "Reasoning" },
        ],
      },
    ],
  },
  {
    id: "applied",
    ja: "応用言語学",
    en: "Applied Linguistics",
    Icon: BookOpen,
    fields: [
      { id: "language-education", ja: "言語教育", en: "Language Education" },
      { id: "translation", ja: "翻訳", en: "Translation" },
      { id: "interpretation", ja: "通訳", en: "Interpretation" },
      { id: "lexicography", ja: "辞書学", en: "Lexicography" },
      { id: "language-testing", ja: "言語テスト", en: "Language Testing" },
      { id: "forensic-ling", ja: "法言語学", en: "Forensic Linguistics" },
      { id: "medical-business-ling", ja: "医療・ビジネス言語", en: "Medical & Business Language" },
    ],
  },
  {
    id: "interdisciplinary",
    ja: "学際・理論",
    en: "Interdisciplinary & Theory",
    Icon: Layers,
    fields: [
      { id: "philosophy-language", ja: "言語哲学", en: "Philosophy of Language" },
      { id: "cognitive-ling", ja: "認知言語学", en: "Cognitive Linguistics" },
      { id: "generative-grammar", ja: "生成文法", en: "Generative Grammar" },
      { id: "functional-ling", ja: "機能言語学", en: "Functional Linguistics" },
      { id: "discourse-analysis", ja: "談話分析", en: "Discourse Analysis" },
      { id: "conversation-analysis", ja: "会話分析", en: "Conversation Analysis" },
      { id: "stylistics", ja: "文体論", en: "Stylistics" },
      { id: "semiotics", ja: "記号論", en: "Semiotics" },
    ],
  },
];

const MAIN_FIELDS = CATEGORIES.reduce((sum, c) => sum + c.fields.length, 0);
const TOTAL_FIELDS = CATEGORIES.reduce(
  (sum, c) => sum + c.fields.length + c.fields.reduce((s, f) => s + (f.sub ? f.sub.length : 0), 0),
  0
);

/* ------------------------------------------------------------
   クイズデータ（歴史・比較 3分野 ＋ 計算言語学 7分野＋知識表現6サブ）
   各問: [difficulty(1-3), question, choiceA, choiceB, choiceC, choiceD, answerIndex, explanation]
   ------------------------------------------------------------ */
// 元データは正解が先頭（A）に偏っているため、問題IDから決まる位置へ正解を移す（並びは毎回同じ）。
// perm[表示位置] = 元の選択肢番号。英訳の選択肢と解説中の {c0}〜{c3}（元の番号で選択肢を指す印）もこれで読み替える。
function answerSlot(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % 4;
}
function buildQuestions(tuples, prefix) {
  return tuples
    .map((t, i) => {
      const id = `${prefix}-${i}`;
      const slot = answerSlot(id);
      const others = [0, 1, 2, 3].filter((j) => j !== t[6]);
      const perm = [...others.slice(0, slot), t[6], ...others.slice(slot)];
      return { id, difficulty: t[0], question: t[1], choices: perm.map((j) => t[2 + j]), answer: slot, perm, exp: t[7] };
    })
    .filter(() => true); // 配列の穴（", ,[" で生じた空要素）を詰める。id は元の位置の番号のまま
}
