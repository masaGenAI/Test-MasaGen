// @@nova-part 80-linguistics/040-FIELD_OVERVIEW.jsx

const COMPARE_DATA = {
  "historical": [
    { ja: "歴史言語学", en: "Historical Linguistics", object: "言語の通時的変化", method: "比較法・内的再建法による祖形復元", keywords: "音韻変化, 文法化, 祖語", example: "グリムの法則によるゲルマン語派の子音推移(*p→f 等)の説明" },
    { ja: "比較言語学", en: "Comparative Linguistics", object: "複数言語間の系統関係", method: "同根語対応の収集と比較法", keywords: "同根語(cognate), 語族, 音対応", example: "英語 father・独語 Vater・羅語 pater の音対応から印欧祖語 *ph₂tḗr を再構築" },
    { ja: "言語類型論", en: "Linguistic Typology", object: "言語構造の類型的分類", method: "通言語的比較による普遍性の探求", keywords: "語順(SOV/SVO), 能格性, 普遍性", example: "日本語(SOV)と英語(SVO)の語順比較、Greenbergの含意的普遍性" },
  ],
  "computational": [
    { ja: "コーパス言語学", en: "Corpus Linguistics", object: "実際の言語使用データの収集・分析", method: "タグ付け・統計処理による用例分析", keywords: "コーパス, コロケーション, n-gram(連続n語)", model: "BNC(British National Corpus), COCA, KWIC検索", example: "「rancid butter / rotten meat」のようなコロケーションの偏りを頻度統計で検出" },
    { ja: "自然言語処理", en: "Natural Language Processing (NLP)", object: "自然言語の自動処理全般", method: "形態素解析から深層学習モデルまで", keywords: "トークン化, word embedding(単語埋め込み), Transformer", model: "BERT, word2vec, spaCy", example: "「猫が座る」を形態素解析し品詞タグ付け→構文解析→意味解析へ" },
    { ja: "音声言語処理", en: "Speech Processing", object: "音声信号の認識・合成", method: "音響特徴量抽出と統計・深層学習モデル", keywords: "ASR(自動音声認識), TTS(音声合成), スペクトログラム", model: "HMM, WaveNet, Whisper", example: "音声波形→MFCC特徴量抽出→音響モデルでテキストへ変換" },
    { ja: "機械翻訳", en: "Machine Translation", object: "言語間の自動翻訳", method: "統計的・ニューラルモデルによる翻訳", keywords: "BLEU(機械翻訳自動評価指標), NMT(ニューラル機械翻訳), Attention", model: "Transformer, Seq2Seq, DeepL", example: "Encoder-Decoder + Attentionで「猫が座る」→\"The cat sits\"を生成" },
    { ja: "情報検索", en: "Information Retrieval", object: "大量文書からの関連情報検索", method: "索引付けとランキングアルゴリズム", keywords: "転置インデックス, TF-IDF(単語頻度逆文書頻度), BM25", model: "BM25, PageRank, ベクトル検索", example: "クエリ「言語学 歴史」に対し転置インデックスでTF-IDFスコア順に文書を提示" },
    { ja: "LLM", en: "Large Language Models (LLM)", object: "大規模言語モデルによる言語生成・理解", method: "事前学習+ファインチューニング/プロンプト", keywords: "トークン, RLHF(人間フィードバックからの強化学習), RAG(検索拡張生成)", model: "GPT系, Claude, Transformer", example: "外部文書を検索(RAG)してから根拠つきで回答を生成させる仕組み" },
    { ja: "知識表現", en: "Knowledge Representation", object: "知識の形式的表現と推論", method: "オントロジー・グラフ構造・論理による記述", keywords: "RDF(資源記述の枠組み), OWL(Webオントロジー言語), 知識グラフ", model: "RDF/OWL, Wikidata, 推論エンジン", example: "「Claude is_a AIモデル」をRDFトリプルで記述しオントロジーへ組み込む" },
  ],
  "theoretical": [
    { ja: "音声学", en: "Phonetics", object: "言語音の物理的・生理的性質", method: "調音・音響・聴覚の観察と計測", keywords: "IPA(国際音声記号), フォルマント, 調音点", example: "[p]と[b]は調音点が同じ両唇音だが声帯振動の有無(無声/有声)で対立" },
    { ja: "音韻論", en: "Phonology", object: "音の体系的・機能的側面", method: "音素分析・弁別素性による体系化", keywords: "音素(phoneme), 異音(allophone), 最小対", example: "英語の /r/ と /l/ は最小対 right/light で意味を区別する別音素" },
    { ja: "形態論", en: "Morphology", object: "語の内部構造・形成", method: "形態素分析による語構造の記述", keywords: "形態素(morpheme), 屈折, 派生", example: "「食べ+させ+られ+た」のように複数形態素が結合する日本語の膠着構造" },
    { ja: "統語論", en: "Syntax", object: "文中の語の並び方・構造規則", method: "句構造規則・変形操作による分析", keywords: "句構造, 主要部(head), 移動(movement)", example: "\"What did you eat?\" は疑問詞whatが基底位置から文頭へ移動したと分析" },
    { ja: "意味論", en: "Semantics", object: "語・文の意味", method: "真理条件・合成性に基づく意味分析", keywords: "含意(entailment), 多義性, 意味役割", example: "「太郎が花子を殴った」は含意として「花子は殴られた」を導く" },
    { ja: "語用論", en: "Pragmatics", object: "文脈における言語使用・意味解釈", method: "発話行為・含意の語用論的分析", keywords: "発話行為, 会話的含意, ポライトネス", example: "「窓開いてる?」は文字通りの質問ではなく「閉めて」という依頼として解釈される" },
  ],
  "social": [
    { ja: "社会言語学", en: "Sociolinguistics", object: "言語と社会構造・階層の関係", method: "言語変異の社会的要因の分析", keywords: "コードスイッチング, 言語威信, 言語共同体", example: "職場では標準語、家庭では方言に切り替えるスタイル切り替えの観察" },
    { ja: "人類言語学", en: "Anthropological Linguistics", object: "言語と文化・世界観の関係", method: "エスノグラフィーによる言語使用の記述", keywords: "言語相対論(サピア=ウォーフ仮説), エスノグラフィー, 言語ドキュメンテーション", example: "色や方向を表す語彙が文化によって異なる認知的分類を反映する例" },
    { ja: "方言学", en: "Dialectology", object: "地域による言語変異", method: "等語線・言語地図による方言分布の記述", keywords: "等語線(isogloss), 方言周圏論, 標準語", example: "「かたつむり」の呼び方が地域ごとに異なる分布を示す方言周圏論の例" },
  ],
  "psycho": [
    { ja: "心理言語学", en: "Psycholinguistics", object: "言語の理解・産出の心理過程", method: "反応時間実験・読み時間測定など", keywords: "語彙アクセス, プライミング, ガーデンパス文", example: "\"The horse raced past the barn fell\" のようなガーデンパス文の再解析実験" },
    { ja: "神経言語学", en: "Neurolinguistics", object: "言語処理の脳内基盤", method: "脳損傷研究・ERP(事象関連電位)/fMRIによる計測", keywords: "ブローカ野, 失語症(aphasia), N400(意味的違反に伴う脳波成分)", example: "意味的に不自然な文を読んだ際にN400という脳波反応が現れる" },
    { ja: "第一言語習得", en: "First Language Acquisition", object: "子どもの母語獲得過程", method: "発達段階の縦断的観察", keywords: "臨界期仮説, 普遍文法(UG), 過剰generalization", example: "英語の不規則動詞 went を goed と過剰に規則化してしまう発達段階" },
    { ja: "第二言語習得", en: "Second Language Acquisition (SLA)", object: "第二言語の習得過程", method: "学習者言語(中間言語)の分析", keywords: "中間言語(interlanguage), 母語転移, 化石化", example: "母語の語順の影響で「彼は昨日行った学校」のような転移的誤りが生じる" },
  ],
  "applied": [
    { ja: "言語教育", en: "Language Education", object: "効果的な言語習得・教授法の研究", method: "教授法の設計と学習効果の検証", keywords: "コミュニカティブ・アプローチ, シラバス, CEFR(欧州言語共通参照枠)", example: "CEFRのA1〜C2の到達目標に沿ってコースのシラバスを設計する" },
    { ja: "翻訳", en: "Translation", object: "書かれた言語間の意味の移し替え", method: "等価性を保った訳文の作成・分析", keywords: "等価性(equivalence), スコポス理論, ローカリゼーション", example: "契約書は形式的等価、広告コピーは動的等価を優先して訳し分ける" },
    { ja: "通訳", en: "Interpretation", object: "話された言語のリアルタイム変換", method: "逐次・同時通訳の技能と認知負荷の研究", keywords: "逐次通訳, 同時通訳, ノートテイキング", example: "国際会議で発言と数秒遅れで同時通訳を行う際のデコレージ(遅延)の管理" },
    { ja: "辞書学", en: "Lexicography", object: "辞書の編纂・設計", method: "コーパスに基づく語義記述・用例選定", keywords: "見出し語(headword), コーパス辞書編纂, 学習者用辞書", example: "コーパス頻度順に語義を配列し、用例を実際の使用データから選定" },
    { ja: "言語テスト", en: "Language Testing", object: "言語能力の測定・評価", method: "妥当性・信頼性を担保したテスト設計", keywords: "妥当性(validity), 信頼性(reliability), ウォッシュバック効果", example: "スピーキングテスト導入により授業で口頭練習が増えるウォッシュバック" },
    { ja: "法言語学", en: "Forensic Linguistics", object: "法的文脈における言語分析", method: "著者推定・言語証拠の言語学的鑑定", keywords: "著者推定(authorship attribution), イディオレクト, 言語的証拠", example: "脅迫文の語彙・文体的特徴から書き手のイディオレクトを推定する" },
    { ja: "医療・ビジネス言語", en: "Medical & Business Language", object: "医療・ビジネス場面での言語使用", method: "対人コミュニケーションの談話分析", keywords: "プレイン・ランゲージ, 語用論的失敗, 医療通訳", example: "専門用語を避け「悪性腫瘍」を「がん」と平易に言い換える説明" },
  ],
  "interdisciplinary": [
    { ja: "言語哲学", en: "Philosophy of Language", object: "言語・意味・指示の哲学的探究", method: "概念分析と論証による意味理論の検討", keywords: "指示(reference), 意義と指示対象, 言語行為論", example: "「宵の明星」と「明けの明星」は指示対象(金星)は同じでも意義が異なる" },
    { ja: "認知言語学", en: "Cognitive Linguistics", object: "言語能力と一般認知能力の関係", method: "メタファー・カテゴリー化の認知的分析", keywords: "概念メタファー, プロトタイプ理論, 構文文法", example: "「時間はお金だ」のように抽象概念を具体的領域で理解する概念メタファー" },
    { ja: "生成文法", en: "Generative Grammar", object: "無限の文を生成する心的な言語能力", method: "規則・原理に基づく統語構造の形式化", keywords: "普遍文法(UG), 併合(Merge), 原理とパラメータ", example: "併合操作により2語ずつ組み合わさって無限に複雑な文が生成される" },
    { ja: "機能言語学", en: "Functional Linguistics", object: "言語形式をコミュニケーション機能から説明", method: "メタ機能・情報構造の分析", keywords: "SFL(選択体系機能言語学), テーマ/レーマ, 及物性", example: "「その本は私が昨日買った」でテーマ(その本)から新情報(買った)へ展開" },
    { ja: "談話分析", en: "Discourse Analysis", object: "文を超えたレベルの言語使用パターン", method: "結束性・一貫性・談話標識の分析", keywords: "結束性(cohesion), CDA(批判的談話分析), ジャンル分析", example: "ニュース記事の語彙選択に潜む権力関係をCDAの観点から分析する" },
    { ja: "会話分析", en: "Conversation Analysis (CA)", object: "自然会話の相互行為的構造", method: "ターンテイキング・修復の詳細な分析", keywords: "ターンテイキング, 隣接ペア, 修復(repair)", example: "「明日空いてる?」「うーん、ちょっと…」の間(ま)自体が拒否を示す選好構造" },
    { ja: "文体論", en: "Stylistics", object: "テキストの文体的特徴", method: "言語学的手法による文体分析", keywords: "前景化(foregrounding), レジスター, コーパス文体論", example: "同じ内容でも語彙選択で硬い論文調とくだけた会話調に文体が変わる" },
    { ja: "記号論", en: "Semiotics", object: "記号と意味作用の一般理論", method: "記号の分類と意味作用の分析", keywords: "シニフィアン/シニフィエ, 類像/指標/象徴, コード", example: "赤信号は「止まれ」を意味する象徴記号(社会的な取り決めによる結びつき)" },
  ],
};

// 知識表現(computational:knowledge-rep)6サブ項目専用の比較表データ
const KR_COMPARE_DATA = [
  { ja: "オントロジー", en: "Ontology", object: "概念とその関係の形式的体系", method: "クラス階層・公理による分類体系の構築", keywords: "クラス, インスタンス, is-a関係", example: "「動物 is-a 生物」「犬 is-a 哺乳類」のようなクラス階層の構築" },
  { ja: "知識グラフ", en: "Knowledge Graph", object: "エンティティ間関係のグラフ表現", method: "トリプル抽出とグラフ埋め込み", keywords: "トリプル, エンティティリンキング, リンク予測", example: "Wikidataで「東京タワー」ノードから「所在地」「高さ」等の関係を辿る" },
  { ja: "RDF", en: "Resource Description Framework (RDF)", object: "Web資源の主語述語目的語形式での記述", method: "URI(統一資源識別子)による資源識別とトリプル記述", keywords: "トリプル, URI, 名前空間(namespace)", example: "<Claude> <createdBy> <Anthropic> という1文のRDFトリプル" },
  { ja: "OWL", en: "Web Ontology Language (OWL)", object: "高度な意味表現・論理的制約の記述", method: "クラス制約と記述論理による形式化", keywords: "クラス制約, 個体(individual), 推論エンジン(reasoner)", example: "「Personクラスはhas Parent some Personを満たす」という制約の記述" },
  { ja: "セマンティックWeb", en: "Semantic Web", object: "機械可読な意味を持つWebの実現", method: "共通語彙とリンクトデータ(Linked Data)の公開・連携", keywords: "Linked Data, SPARQL(RDFクエリ言語), Schema.org", example: "検索エンジンがSchema.orgのマークアップからレシピの材料を直接抽出" },
  { ja: "推論", en: "Reasoning", object: "知識からの新たな知識・矛盾の導出", method: "演繹規則・前向き/後向き推論の適用", keywords: "TBox/ABox(用語/主張ボックス), 開世界仮説(OWA), 記述論理(DL)", example: "「全ての人は死ぬ」+「ソクラテスは人」→「ソクラテスは死ぬ」の演繹" },
];

const GLOSSARY_DATA = {
  "historical": [
    { ja: "祖語", en: "proto-language", def: "再構築された仮説上の共通祖先言語。印欧祖語のように、子孫の言語の比較から音や語形を推定したもので、文献には残っていない。", defEn: "A hypothetical common ancestor language that has been reconstructed. Proto-Indo-European is an example: its sounds and forms are inferred by comparing descendant languages, and no written record of it survives." },
    { ja: "同根語", en: "cognate", def: "共通祖先語に由来する語。英語のfatherとドイツ語のVaterがその例で、借用語と違い、親から子へ受け継がれた語である。", defEn: "A word that descends from a common ancestral word. English father and German Vater are an example; unlike loanwords, cognates are inherited rather than borrowed." },
    { ja: "音対応", en: "sound correspondence", def: "同根語間で見られる規則的な音の対応。ラテン語のpと英語のfが対応する(pater と father)のが例で、偶然の類似と区別する根拠になる。", defEn: "A regular correspondence of sounds observed among cognates. Latin p corresponding to English f, as in pater and father, is an example; such regularity separates true cognates from chance resemblance." },
    { ja: "文法化", en: "grammaticalization", def: "内容語が機能語へ変化する現象。英語の未来を表すbe going toは、移動を表す表現から生じた例である。", defEn: "The phenomenon in which a content word changes into a function word. The English future marker be going to is an example: it developed from an expression of physical movement." },
    { ja: "語族", en: "language family", def: "共通の祖語から派生した言語群。印欧語族のように祖語を共有する集まりを指し、接触で特徴が似た言語連合とは区別される。", defEn: "A group of languages that descend from a common proto-language. The Indo-European family is an example; a family shares a proto-language, unlike a Sprachbund, whose members resemble each other through contact." },
    { ja: "能格性", en: "ergativity", def: "自動詞主語と他動詞目的語が同格で標示される類型。バスク語などに見られ、自動詞主語と他動詞主語を同じに扱う対格型の言語と対になる。", defEn: "A typology in which the subject of an intransitive verb and the object of a transitive verb are marked alike. Basque is an example; the type contrasts with accusative languages, which mark intransitive and transitive subjects alike." },
    { ja: "言語連合", en: "Sprachbund", def: "系統に関わらず地理的接触で特徴を共有する言語群。バルカン半島の言語がその例で、同じ祖語を持つ語族とは区別される。", defEn: "A group of languages that share features through geographic contact regardless of genetic relationship. The languages of the Balkans are an example; a Sprachbund differs from a language family, whose members share a proto-language." },
    { ja: "語彙年代学", en: "glottochronology", def: "基礎語彙の置換率から分岐年代を推定する手法。基礎語彙が一定の割合で入れ替わると仮定する手法だが、その仮定には批判も多い。", defEn: "A method that estimates the date of divergence from the replacement rate of basic vocabulary. The method assumes that basic vocabulary is replaced at a steady rate, an assumption that has drawn much criticism." },
    { ja: "統合度指数", en: "index of synthesis", def: "テキスト中の語あたりの形態素数で合成度を測る指標。ベトナム語のように値が低い言語と、エスキモー語のように高い言語が対比される。", defEn: "An index that measures how synthetic a language is by the number of morphemes per word in a text. Vietnamese, with a low value, is contrasted with Eskimo, with a high value, in this index." },
    { ja: "借用語", en: "loanword", def: "他の言語から取り入れて自言語の語彙になった語。日本語のテレビは英語television由来で、祖語から受け継いだ同根語とは区別される。", defEn: "A word taken from another language into one's own vocabulary. Japanese terebi, from English television, is an example; it differs from a cognate, which is inherited from a proto-language." },
    { ja: "音位転換", en: "metathesis", def: "語の中で音の並び順が入れ替わる音変化。古英語のbridが現代英語のbirdになったのが例で、rと母音の位置が入れ替わった。", defEn: "A sound change in which the order of sounds in a word is reversed. Old English brid becoming Modern English bird is an example: the r and the vowel swapped places." },
    { ja: "大母音推移", en: "Great Vowel Shift", def: "中英語の長母音が体系的に高くなった英語史上の音変化。time の母音が[iː]から[aɪ]に変わったのが代表的な例である。", defEn: "The systematic raising of Middle English long vowels in the history of English. The vowel of time changing from [iː] to [aɪ] is a typical example." },
    { ja: "内的再構", en: "internal reconstruction", def: "一つの言語内の不規則な形から古い段階を推定する方法。英語のfoot/feetの母音交替から、かつて複数語尾が母音に影響した段階を推定する例がある。", defEn: "A method of inferring an earlier stage from irregular forms within a single language. One example infers from the vowel alternation of English foot and feet an earlier stage in which a plural ending affected the vowel." },
    { ja: "青年文法学派", en: "Neogrammarians", def: "音法則に例外はないと主張した19世紀後半の学派。ライプツィヒを拠点とし、例外に見える形も類推などで説明しようとした。", defEn: "A late nineteenth-century school that held sound laws admit no exceptions. Based in Leipzig, the school tried to explain apparent exceptions through factors such as analogy." },
  ],
  "computational": [
    { ja: "コーパス", en: "corpus", def: "実際の言語使用を集めたデータ集合。現代書き言葉均衡コーパス(BCCWJ)のように、語の頻度や用例を調べる基礎資料になる。", defEn: "A collection of data gathering actual language use. The Balanced Corpus of Contemporary Written Japanese is an example, serving as a base resource for checking word frequencies and usage." },
    { ja: "コロケーション", en: "collocation", def: "慣習的に共起しやすい語の組み合わせ。英語のheavy rainのように、意味が通じても別の語(strong rain)では不自然になる組み合わせを指す。", defEn: "A habitual combination of words that tend to co-occur. In English heavy rain is natural while strong rain is not, though the meaning would be clear; such pairings are collocations." },
    { ja: "トークン化", en: "tokenization", def: "テキストを単語等の単位に分割すること。英語は空白で区切れるが、日本語は語の境界が書かれないため形態素解析を使う。", defEn: "Splitting text into units such as words. English can be split at spaces, but Japanese does not mark word boundaries, so morphological analysis is used." },
    { ja: "word embedding", en: "word embedding", def: "単語を意味的類似性を反映した密なベクトルで表現する手法。word2vecが代表的で、意味の近い語がベクトル空間で近くに並ぶ。", defEn: "A technique that represents words as dense vectors reflecting semantic similarity. Word2vec is a typical example; words with similar meanings lie close together in the vector space." },
    { ja: "Attention機構", en: "attention mechanism", def: "出力生成時に入力の各部分へ動的に重み付けする仕組み。Transformerの中核で、翻訳では訳す語に対応する原文の語に大きな重みを置く。", defEn: "A mechanism that dynamically weights each part of the input when generating output. It is the core of the Transformer; in translation it puts more weight on the source words that correspond to the word being produced." },
    { ja: "ASR", en: "automatic speech recognition", def: "音声を文字に変換する技術。スマートフォンの音声入力や字幕の自動生成に使われ、音声合成とは逆向きの処理である。", defEn: "Technology that converts speech into text. It is used in voice input on smartphones and automatic captioning, and runs in the opposite direction to speech synthesis." },
    { ja: "MFCC", en: "mel-frequency cepstral coefficients", def: "聴覚特性を考慮した音声特徴量。音声認識の入力として長く使われ、メル尺度で周波数を並べ替えて声道の特徴を捉える。", defEn: "Speech features that take human auditory characteristics into account. Long used as input to speech recognition, it rearranges frequencies on the mel scale to capture vocal tract characteristics." },
    { ja: "BLEU", en: "Bilingual Evaluation Understudy", def: "n-gram一致度に基づく機械翻訳の自動評価指標。機械翻訳の出力と人間の参照訳で語の並びがどれだけ重なるかを数える。意味の正しさは直接測れない。", defEn: "An automatic evaluation metric for machine translation based on n-gram overlap. It counts how much the word sequences of a machine translation and a human reference overlap; it cannot measure correctness of meaning directly." },
    { ja: "NMT", en: "neural machine translation", def: "ニューラルネットワークによる機械翻訳。現在の翻訳サービスの主流で、フレーズ単位の統計的機械翻訳とは方式が異なる。", defEn: "Machine translation performed by neural networks. It is the mainstream of current translation services and works differently from phrase-based statistical machine translation." },
    { ja: "転置インデックス", en: "inverted index", def: "語がどの文書に出現するかを記録する索引構造。本の巻末索引と同じ発想で、検索エンジンが語から文書を素早く引くために使う。", defEn: "An index structure recording which documents each word appears in. It follows the same idea as a book's back-of-book index and lets a search engine find documents from a word quickly." },
    { ja: "TF-IDF", en: "Term Frequency-Inverse Document Frequency", def: "出現頻度(TF)と希少性(IDF)を掛け合わせ語の重要度を測る指標。どの文書にも出る語は重みが低く、特定の文書に偏って出る語ほど高くなる。", defEn: "A measure of term importance that multiplies frequency (TF) by rarity (IDF). Words that occur in every document get low weight, and words concentrated in particular documents get high weight." },
    { ja: "トークン(LLM)", en: "token", def: "モデルが処理する際の基本的な区切り単位(単語や部分語など)。言語モデルの入出力の長さや利用量はトークン数で数える。形態素とは必ずしも一致しない。", defEn: "The basic unit into which text is split for a model to process, such as a word or subword. The length of a model's input and output, and its usage, are counted in tokens, which do not always match morphemes." },
    { ja: "RAG", en: "retrieval-augmented generation", def: "外部知識を検索し生成に活用する手法。社内文書を検索して回答の根拠として渡すように使い、ハルシネーションを減らす目的でも使われる。", defEn: "A method that retrieves external knowledge and uses it in generation. One use is to search internal documents and supply them as grounds for an answer, which also helps reduce hallucination." },
    { ja: "知識グラフ", en: "knowledge graph", def: "エンティティと関係をグラフで表現した知識表現。「東京は日本の首都」のように実体を節点、関係を辺で表し、検索結果の情報カードなどに使われる。", defEn: "A knowledge representation that expresses entities and relations as a graph. Entities are nodes and relations are edges, as in 'Tokyo is the capital of Japan'; it is used for information cards in search results." },
    { ja: "オントロジー", en: "ontology", def: "ある領域の概念とその関係を形式的に定義した体系。哲学の存在論と同じ語だが、情報科学では語彙と関係を機械が扱える形に整えた体系を指す。", defEn: "A system that formally defines the concepts of a domain and their relations. The word is shared with the philosophy of being, but in information science it means a system of vocabulary and relations in machine-readable form." },
    { ja: "RDFトリプル", en: "RDF triple", def: "主語・述語・目的語からなるRDFの基本単位。「『吾輩は猫である』の著者は夏目漱石」という事実を、主語・述語・目的語の三つで表す。", defEn: "The basic unit of RDF, consisting of a subject, predicate, and object. The fact that Natsume Soseki wrote I Am a Cat is expressed as three parts: subject, predicate and object." },
    { ja: "SPARQL", en: "SPARQL", def: "RDFデータを問い合わせるためのクエリ言語。SQLが関係データベース用であるのに対し、グラフ状のRDFデータ用の言語である。", defEn: "A query language for retrieving RDF data. SQL is for relational databases, whereas SPARQL is for graph-shaped RDF data." },
    { ja: "トリプルストア", en: "triple store", def: "RDFトリプルを効率的に保存・検索するデータベース。関係データベースが表で保存するのに対し、三つ組を単位に保存してSPARQLで検索する。", defEn: "A database that efficiently stores and retrieves RDF triples. Where a relational database stores tables, a triple store keeps data as triples and is searched with SPARQL." },
    { ja: "OWLクラス制約", en: "OWL class restriction", def: "クラスに属するための条件をOWLで形式的に定義したもの。「親が1人以上いる」のように、プロパティの値の条件でクラスを定義できる。", defEn: "A formal definition in OWL of the conditions for belonging to a class. A class can be defined by a condition on property values, such as having at least one parent." },
    { ja: "TBox / ABox", en: "TBox / ABox", def: "概念の一般的定義(TBox)と個体の事実(ABox)の区別。「犬は動物である」はTBox、「ポチは犬である」はABoxに入る。", defEn: "The distinction between general definitions of concepts (TBox) and facts about individuals (ABox). 'A dog is an animal' belongs to the TBox, while 'Pochi is a dog' belongs to the ABox." },
    { ja: "前向き推論・後向き推論", en: "forward / backward chaining", def: "既知の事実から結論を導く方式と、目標から必要な条件を遡る方式。前向きは事実から、後向きは目標が成り立つかを確かめるため条件を調べる。Prologは後向きの代表である。", defEn: "Deriving conclusions from known facts, versus working backward from a goal to the conditions it requires. Forward chaining starts from facts; backward chaining checks the conditions needed for a goal. Prolog is a typical backward-chaining system." },
    { ja: "Schema.org", en: "Schema.org", def: "Webページに埋め込む構造化データの共通語彙。レシピやイベントなどの型があり、検索エンジンが内容を理解して表示を変えるのに使う。", defEn: "A shared vocabulary of structured data to embed in web pages. It defines types such as recipes and events, which search engines use to understand a page and change how it is displayed." },
    { ja: "エンティティリンキング", en: "entity linking", def: "テキスト中の言及を知識ベース中の実体に結びつけるタスク。文中の「アップル」が会社か果物かを判別し、知識ベースの正しい項目に結ぶ。", defEn: "The task of linking mentions in text to entities in a knowledge base. It decides whether Apple in a text means the company or the fruit and links it to the correct entry in the knowledge base." },
    { ja: "オープンワールド仮説", en: "open world assumption", def: "未記載の事実を偽と断定しない、OWLが採る推論上の前提。データベースの閉世界仮説と対照的で、書かれていないことは偽でなく不明として扱う。", defEn: "The reasoning premise adopted by OWL that does not treat unstated facts as false. This contrasts with the closed-world assumption of databases: what is not stated is treated as unknown, not false." },
    { ja: "パープレキシティ", en: "perplexity", def: "言語モデルの予測しにくさを表す指標で小さいほど良い。値が小さいほどモデルが次の語を絞り込めており、モデルどうしの比較に使う。", defEn: "A measure of how hard a language model finds text to predict; lower is better. A lower value means the model narrows down the next word better, and it is used to compare models." },
    { ja: "係り受け解析", en: "dependency parsing", def: "文中の語どうしの修飾・被修飾などの関係を求める解析。「白い猫の足」の「白い」が猫と足のどちらに係るかを決めるような解析である。", defEn: "Analysis that finds relations such as modifier and head between words in a sentence. One task is deciding whether the Japanese word for white in 'white cat's leg' modifies the cat or the leg." },
    { ja: "逆翻訳", en: "back-translation", def: "目的言語の文を原言語に訳して疑似対訳を作る手法。単言語の目的言語文を原言語に訳し戻し、できた疑似対訳を翻訳モデルの学習データに加える。", defEn: "A method that translates target-language text back into the source language to create pseudo-parallel data. Monolingual target-language text is translated back into the source language, and the resulting pseudo-pairs are added to the training data of a translation model." },
    { ja: "強制アライメント", en: "forced alignment", def: "既知の書き起こしと音声を照合し各語の時間位置を求める処理。字幕の時刻合わせや、音声コーパスで音素の境界を付ける作業に使う。", defEn: "A process that matches a known transcript to audio to find the time position of each word. It is used to time subtitles and to mark phoneme boundaries in speech corpora." },
    { ja: "PageRank", en: "PageRank", def: "リンクされる数と質からページの重要度を測る指標。重要なページからのリンクほど重く数える。検索エンジンの順位付けの初期の手法として知られる。", defEn: "A measure of a page's importance based on the number and quality of links to it. Links from important pages count for more. It is known as an early method of ranking in search engines." },
    { ja: "nDCG", en: "normalized discounted cumulative gain", def: "上位ほど重みを高くして順位の質を測る評価指標。検索結果のうち関連度が高い文書が上位に並ぶほど、値が高くなる。", defEn: "An evaluation measure of ranking quality that weights higher ranks more heavily. The more highly relevant documents appear near the top of the search results, the higher the value." },
    { ja: "ハルシネーション", en: "hallucination", def: "もっともらしいが事実に反する内容を生成すること。存在しない論文を引用して答えるのが例で、事実を別に確かめる必要がある。", defEn: "Generating content that sounds plausible but is contrary to fact. Citing a paper that does not exist in an answer is an example, so facts need to be checked separately." },
    { ja: "記述論理", en: "description logic", def: "概念・役割・個体で知識を表す、決定可能性を重んじる論理の族。OWLの理論的な基礎で、概念を役割で組み立てて表す。", defEn: "A family of decidability-minded logics that represent knowledge with concepts, roles and individuals. It is the theoretical basis of OWL, and builds up concepts out of roles." },
    { ja: "リンクトデータ", en: "Linked Data", def: "URIとRDFで互いに結び付けて公開する、機械可読なデータ。DBpediaのように、他のデータセットへのリンクをたどって情報を広げられる。", defEn: "Machine-readable data published and interlinked using URIs and RDF. As with DBpedia, one can follow links to other datasets to widen the information." },
    { ja: "単一化", en: "unification", def: "二つの論理式を同じ形にする変数の置き換えを求める操作。likes(X, tea)とlikes(mary, tea)は、X=maryと置き換えれば同じ形になる。", defEn: "The operation of finding a substitution that makes two logical expressions identical. likes(X, tea) and likes(mary, tea) become identical if X is replaced by mary." },
    { ja: "推論器", en: "reasoner", def: "公理から含意や矛盾を自動で導き出すプログラム。「犬は動物」「ポチは犬」から「ポチは動物」を導き、オントロジーの矛盾も検出する。", defEn: "A program that automatically derives entailments and inconsistencies from axioms. From 'dogs are animals' and 'Pochi is a dog' it derives 'Pochi is an animal', and it also detects contradictions in an ontology." },
  ],
  "theoretical": [
    { ja: "IPA", en: "International Phonetic Alphabet", def: "言語音を一貫して表記する国際的な記号体系。[ʃ]のように一音に一つの記号を当てるので、綴りが不規則な英語でも音を書き分けられる。", defEn: "A standardized system of symbols for transcribing the sounds of any language consistently. Each sound gets one symbol, as with [ʃ], so sounds can be written down accurately even for English, whose spelling is irregular." },
    { ja: "フォルマント", en: "formant", def: "母音の音色を特徴づける共鳴周波数。母音[i]は第2フォルマントが高く、[u]は低い。", defEn: "A resonant frequency of the vocal tract that characterizes the quality of a vowel. The vowel [i] has a high second formant, and [u] has a low one." },
    { ja: "VOT", en: "voice onset time", def: "破裂音の開放から声帯振動開始までの時間。有声と無声の区別の指標で、英語のpはbより値が大きい。", defEn: "The time from the release of a stop consonant to the onset of vocal-fold vibration. It is a cue to the voiced and voiceless contrast; English p has a larger value than b." },
    { ja: "音素", en: "phoneme", def: "意味の区別に関わる最小の音単位。「か」と「が」のように、入れ替えると語が変わる音の単位で、異音とは区別される。", defEn: "The smallest sound unit involved in distinguishing meaning. Sounds such as the Japanese ka and ga are separate phonemes because swapping them changes the word; allophones, by contrast, do not." },
    { ja: "異音", en: "allophone", def: "同一音素の環境的変異。英語のpはpinでは息を伴い、spinでは伴わないが、どちらも音素/p/に属する。", defEn: "A variant of a single phoneme that appears in a particular environment. English p is aspirated in pin but not in spin, yet both belong to the phoneme /p/." },
    { ja: "弁別素性", en: "distinctive feature", def: "音を区別する音韻的な特徴。有声性のように二値で表し、/p/と/b/の違いは[±voice]で記述できる。", defEn: "A phonological property that distinguishes one sound from another. Features are binary, such as voicing, and the difference between /p/ and /b/ can be described as [±voice]." },
    { ja: "形態素", en: "morpheme", def: "意味を持つ最小の言語単位。「食べさせられた」は食べ・させ・られ・たの四つに分かれ、語より小さい単位で数える。", defEn: "The smallest linguistic unit that carries meaning. The Japanese tabesaserareta divides into four morphemes, tabe, sase, rare and ta, so morphemes are counted below the word level." },
    { ja: "屈折", en: "inflection", def: "文法的情報を語形変化で表す過程。英語のwalkがwalkedになるのは過去を表すが語の種類は変わらず、派生とは対になる。", defEn: "The process of expressing grammatical information through changes in word form. English walk becoming walked marks past tense without changing the kind of word, in contrast to derivation." },
    { ja: "派生", en: "derivation", def: "新しい語を作る形態的操作。happyからhappinessを作るように品詞や意味が変わり、屈折とは区別される。", defEn: "A morphological operation that creates a new word. Making happiness from happy changes the part of speech and meaning, which distinguishes derivation from inflection." },
    { ja: "句構造規則", en: "phrase structure rules", def: "句や文の構造を生成する規則。S → NP VP のような書き換え規則で、文が名詞句と動詞句からなることを示す。", defEn: "Rules that generate the structure of phrases and sentences. A rewriting rule such as S → NP VP shows that a sentence consists of a noun phrase and a verb phrase." },
    { ja: "主要部", en: "head", def: "句の中心となる語。名詞句the red bookの主要部は名詞bookで、句全体の性質を決める。", defEn: "The central word of a phrase. In the noun phrase the red book, the head is the noun book, which determines the nature of the whole phrase." },
    { ja: "移動", en: "movement", def: "要素が基底位置から別位置へ移る統語操作。英語のWhat did you buy?では、whatは動詞の目的語の位置から文頭へ移ったと分析される。", defEn: "A syntactic operation in which an element moves from its base position to another position. In English What did you buy?, what is analyzed as having moved from the object position of the verb to the front of the sentence." },
    { ja: "含意", en: "entailment", def: "ある文が真なら別の文も必然的に真になる関係。「花子は赤い車を買った」が真なら「花子は車を買った」も真になる。", defEn: "A relation in which, if one sentence is true, another sentence is necessarily true as well. If 'Hanako bought a red car' is true, then 'Hanako bought a car' must also be true." },
    { ja: "多義性", en: "polysemy", def: "1語が複数の関連した意味を持つこと。「頭」が体の部位と先頭の意味を持つように、意味が関連する点で同音異義とは区別される。", defEn: "The property of a single word having several related meanings. The Japanese atama means both the head of the body and the top of something; the meanings are related, unlike homonyms." },
    { ja: "合成性の原理", en: "principle of compositionality", def: "文の意味は語の意味と組み合わせ方から決まるという原理。「犬が猫を追う」と「猫が犬を追う」は、同じ語でも組み合わせで意味が変わる。", defEn: "The principle that the meaning of a sentence is determined by the meanings of its words and the way they are combined. The same words in 'the dog chases the cat' and 'the cat chases the dog' give different meanings because they are combined differently." },
    { ja: "発話行為", en: "speech act", def: "発話によって行われる行為。「約束する」と言うこと自体が約束という行為になる。オースティンが提唱した。", defEn: "An action performed by means of an utterance. Saying 'I promise' is itself the act of promising. The idea was put forward by Austin." },
    { ja: "会話の含意", en: "conversational implicature", def: "文字通りの意味を超えて文脈的に推論される意味。「ここは寒いね」が窓を閉めてほしいという依頼の意味になる。グライスが論じた。", defEn: "Meaning inferred from context beyond the literal meaning. Saying 'It is cold here' can mean a request to close the window. Grice discussed this." },
    { ja: "ポライトネス", en: "politeness", def: "対人関係を配慮した言語使用方略。依頼を「窓を開けてくれませんか」と和らげるのが例で、ブラウンとレビンソンの理論が有名である。", defEn: "Language-use strategies that take interpersonal relationships into account. Softening a request to 'Could you open the window?' is an example; the theory of Brown and Levinson is well known." },
    { ja: "異形態", en: "allomorph", def: "同じ形態素が環境によって取る別々の形。英語の複数語尾-sは、catsで[s]、dogsで[z]、busesで[ɪz]と現れる。", defEn: "One morpheme's different shapes depending on the environment. The English plural ending -s appears as [s] in cats, [z] in dogs and [ɪz] in buses." },
    { ja: "接辞", en: "affix", def: "語幹に付いて意味や文法情報を加える拘束形態素。unhappyのun-(接頭辞)やhappinessの-ness(接尾辞)で、単独では語にならない。", defEn: "A bound morpheme attached to a stem to add meaning or grammar. Examples are the prefix un- in unhappy and the suffix -ness in happiness; neither can stand alone as a word." },
    { ja: "最小対", en: "minimal pair", def: "一つの音だけが違い意味も違う二語の組。英語のpinとbinのように、一音だけが違う二語で、音素を見つける手がかりになる。", defEn: "Two words differing in just one sound and in meaning. English pin and bin are an example; such pairs help identify phonemes." },
    { ja: "調音点", en: "place of articulation", def: "発音時に空気の流れを妨げる口の中の位置。[p]は両唇、[t]は歯茎、[k]は軟口蓋で作る音で、調音法とは区別される。", defEn: "The place in the mouth where airflow is obstructed. [p] is made at the lips, [t] at the alveolar ridge and [k] at the soft palate; place differs from manner of articulation." },
    { ja: "c統御", en: "c-command", def: "ある要素が、姉妹節点とその内側の要素に及ぶ構造上の関係。束縛条件で、再帰代名詞が先行詞にc統御される必要があることを説明するのに使う。", defEn: "A relation in which a node reaches its sister and everything inside it. In binding theory it is used to explain why a reflexive pronoun must be c-commanded by its antecedent." },
    { ja: "θ役割", en: "theta role", def: "動詞が項に割り当てる動作主や対象などの意味役割。「花子がボールを蹴った」で、花子は動作主、ボールは対象の役割を受ける。", defEn: "A semantic role such as agent or theme a verb assigns to an argument. In 'Hanako kicked the ball', Hanako receives the agent role and the ball the theme role." },
    { ja: "フェイス", en: "face", def: "人が保ちたいと願う社会的な自己像や面目。ブラウンとレビンソンは、認められたい積極的フェイスと、邪魔されたくない消極的フェイスを区別した。", defEn: "The public self-image a person wants to maintain. Brown and Levinson distinguished positive face, the wish to be approved of, from negative face, the wish not to be imposed on." },
    { ja: "上位語", en: "hypernym", def: "「犬」に対する「動物」のように包括的な語。逆に「犬」は「動物」の下位語で、対になる関係をなす。", defEn: "A more inclusive word, as 'animal' is to 'dog'. Conversely, dog is a hyponym of animal, and the two form a paired relation." },
    { ja: "照応", en: "anaphora", def: "代名詞などが先に出た語句と同じ対象を指すこと。「太郎は本を読み、それを返した」の「それ」は「本」を指す。", defEn: "Reference by a pronoun or similar form to what an earlier expression denotes. In the Japanese 'Taro read a book and returned it', the word for it refers to the book." },
  ],
  "social": [
    { ja: "コードスイッチング", en: "code-switching", def: "会話中に複数の言語・変種を切り替える現象。日本語と英語を一つの文で混ぜて話すのが例で、話題や相手によって切り替える。", defEn: "Alternating between multiple languages or varieties during a conversation. Mixing Japanese and English within one sentence is an example, and speakers switch according to topic or listener." },
    { ja: "言語威信", en: "prestige", def: "ある変種が社会的に高く評価される度合い。標準語は公的な場面で威信が高いが、方言が仲間内で威信を持つこともある。", defEn: "The degree to which a variety is socially highly valued. A standard language has high prestige in formal settings, but a dialect may carry prestige among friends." },
    { ja: "言語共同体", en: "speech community", def: "言語規範を共有する社会集団。同じ言語を話すとは限らず、規範の共有が基準になる点が、単なる話者の集合とは違う。", defEn: "A social group that shares norms about language. Members need not speak the same language; sharing norms is the criterion, which sets it apart from a mere set of speakers." },
    { ja: "言語相対論", en: "linguistic relativity", def: "言語が思考様式に影響するという仮説。サピア=ウォーフの仮説として知られ、色名の数が違う言語の話者の色の分類を調べる研究がある。", defEn: "The hypothesis that language influences ways of thinking. Known as the Sapir-Whorf hypothesis, it has been tested in studies of how speakers of languages with different color terms classify colors." },
    { ja: "エスノグラフィー", en: "ethnography", def: "文化・社会を参与観察により記述する手法。調査者が現地で長く生活し、話し方の実際を観察して記録するのが例である。", defEn: "A method of describing culture and society through participant observation. A typical case is a researcher who lives in the community for a long time and records how people actually speak." },
    { ja: "危機言語", en: "endangered language", def: "話者減少により消滅の危機にある言語。アイヌ語がその例で、ユネスコが消滅の危険度を段階で示している。", defEn: "A language facing extinction because its number of speakers is declining. Ainu is an example, and UNESCO rates the degree of danger of extinction in stages." },
    { ja: "等語線", en: "isogloss", def: "ある言語的特徴の分布境界を示す線。方言地図に引かれ、複数の等語線が重なる所が方言の境界とされる。", defEn: "A line showing the boundary of the distribution of a linguistic feature. Drawn on dialect maps, a place where several isoglosses bundle together is taken as a dialect boundary." },
    { ja: "方言周圏論", en: "concentric-circle theory of dialects", def: "新しい語形が中心で生まれて周囲へ広がり、遠い地域ほど古い形式が残るという分布理論。柳田国男の『蝸牛考』が有名で、カタツムリの呼び名が例になる。", defEn: "A distribution theory holding that new forms arise at a center and spread outward, so older forms remain in more distant regions. Yanagita Kunio's Kagyuko is famous, with the names for the snail as its example." },
    { ja: "コイネー化", en: "koineization", def: "方言接触の中で混合と平準化を経て、新しい共通の変種が形成されること。古代ギリシャ語のコイネーが語源で、方言の接触から生じた共通語を指す。", defEn: "The formation of a new common variety through the mixing and leveling of dialects in contact. The term comes from Koine Greek and refers to a common variety arising from dialect contact." },
    { ja: "言語交替", en: "language shift", def: "共同体が日常語を別の言語へ移していく変化。移民の子孫が親の言語から居住地の言語へ移るのが例で、言語の消滅につながる。", defEn: "The change in which a community gradually moves its everyday language to another. Descendants of immigrants moving from their parents' language to the language of the new country are an example, and it can lead to language loss." },
    { ja: "言語景観", en: "linguistic landscape", def: "看板や標識など公共の場に見える言語の姿。多言語の標識の言語や配置を調べ、その地域で優先される言語を読み取る。", defEn: "The languages visible in public space, such as on signs and billboards. Researchers examine the languages and layout of multilingual signs to see which language is given priority in an area." },
    { ja: "社会方言", en: "sociolect", def: "年齢や階層など社会集団ごとに異なる言葉の変種。地域で分かれる地域方言と対になり、年齢・性別・職業などで話し方が分かれる。", defEn: "A variety of speech that differs by social group such as age or class. In contrast to regional dialects, it differs by age, gender or occupation." },
    { ja: "ダイグロシア", en: "diglossia", def: "高位と低位の変種が場面で使い分けられる状態。アラビア語の文語と口語のような関係で、二言語併用とは区別される。", defEn: "A state in which a high and a low variety are used in different settings. The relation between literary and colloquial Arabic is an example, and diglossia is distinguished from simple bilingualism." },
    { ja: "言語態度", en: "language attitude", def: "ある言語や変種に対する話者の評価や感情。方言を「田舎くさい」と見る評価が例で、マッチト・ガイズ法などで測る。", defEn: "Speakers' evaluations and feelings toward a language or variety. Seeing a dialect as rustic is an example, and attitudes are measured with methods such as the matched-guise technique." },
  ],
  "psycho": [
    { ja: "語彙アクセス", en: "lexical access", def: "心内辞書から語の情報を取り出す過程。頻度の高い語ほど、見聞きして意味を引き出す速さが速い。", defEn: "The process of retrieving a word's information from the mental lexicon. The more frequent a word is, the faster its meaning is retrieved when it is seen or heard." },
    { ja: "ガーデンパス文", en: "garden path sentence", def: "途中まで誤った統語解釈に導かれる文。The horse raced past the barn fell. が代表例で、最後のfellで読み直しが必要になる。", defEn: "A sentence that leads the reader to a wrong syntactic analysis partway through. The horse raced past the barn fell is the classic example; the reader must reanalyze at the final word fell." },
    { ja: "プライミング", en: "priming", def: "先行刺激が後続処理に与える促進効果。doctorを見た直後はnurseの判断が速くなる意味的プライミングが例である。", defEn: "The facilitating effect that a preceding stimulus has on later processing. Seeing doctor makes the judgment of nurse faster, a case of semantic priming." },
    { ja: "失語症", en: "aphasia", def: "脳損傷による言語障害。話せなくなる運動性と、話せても意味が通らない感覚性があり、損傷した部位が関わる。", defEn: "A language disorder caused by brain damage. In motor aphasia a person cannot speak, and in sensory aphasia speech flows but makes no sense; the damaged site matters." },
    { ja: "ブローカ野", en: "Broca's area", def: "発話産出に関わるとされる脳部位。左半球の下前頭回にあり、損傷すると話すのは困難だが理解は比較的保たれる失語が起きる。", defEn: "A brain region said to be involved in speech production. Located in the left inferior frontal gyrus, damage there causes aphasia in which speaking is hard but comprehension is relatively preserved." },
    { ja: "N400", en: "N400 component", def: "意味的違反に関連するとされる脳波成分。「パンに靴下を塗った」のような不自然な語で、約400ミリ秒後に大きくなる。", defEn: "An ERP component said to be associated with semantic violations. It grows about 400 milliseconds after an anomalous word, as in a sentence about spreading socks on bread." },
    { ja: "臨界期仮説", en: "critical period hypothesis", def: "言語獲得に最適な限られた期間があるとする仮説。言語に触れずに育った子どもの事例などが根拠として論じられるが、第二言語では議論が続く。", defEn: "The hypothesis that there is a limited period that is optimal for language acquisition. Cases of children raised without exposure to language are cited as evidence, but for second languages the debate continues." },
    { ja: "普遍文法", en: "universal grammar", def: "生得的とされる言語獲得の基盤。チョムスキーが提唱した。子どもが限られた入力から文法を獲得できる理由の説明に使われる。", defEn: "A posited innate basis for language acquisition. Proposed by Chomsky, it is used to explain how children acquire grammar from limited input." },
    { ja: "過剰般化", en: "overgeneralization", def: "規則を例外にも適用してしまう誤り。英語の子どもがwentでなくgoedと言うように、過去形-edを不規則動詞にも付ける。", defEn: "An error of applying a rule to exceptions as well. An English-speaking child says goed instead of went, adding the regular past ending -ed to an irregular verb." },
    { ja: "中間言語", en: "interlanguage", def: "学習者独自の体系を持つ発達途上の言語体系。セリンカーが唱えた。学習者の誤りは母語でも目標言語でもない、独自の規則に従うことがある。", defEn: "A developing language system, with its own structure, that a learner has built. Selinker proposed it. A learner's errors may follow rules of their own, belonging neither to the native nor the target language." },
    { ja: "母語転移", en: "L1 transfer", def: "母語の知識が第二言語習得に影響すること。日本語話者が英語のlとrを区別しにくいのは例で、助けになる正の転移もある。", defEn: "The influence of native-language knowledge on second language acquisition. Difficulty for Japanese speakers in telling English l and r apart is an example, and there is also helpful positive transfer." },
    { ja: "化石化", en: "fossilization", def: "誤りが定着し改善しにくくなる現象。長年英語を使っても三単現のsが抜けるような誤りが残るのが例である。", defEn: "The phenomenon in which errors become entrenched and hard to improve. An example is a learner who still omits the third-person singular s after using English for many years." },
    { ja: "育児語", en: "child-directed speech", def: "養育者が幼児に向けて使う、高い声や単純な構造の話し方。「ワンワン」のような語や、ゆっくり抑揚を大きくした話し方が含まれる。", defEn: "The high-pitched, simply structured way caregivers speak to young children. It includes baby-talk words like wanwan for a dog and a slow, exaggerated intonation." },
    { ja: "誤用分析", en: "error analysis", def: "学習者の実際の誤りを集めて、原因や規則を調べる方法。誤りを母語の干渉か目標言語の過剰般化かに分類する。対照分析と対になる。", defEn: "A method that collects learners' actual errors to study their causes and rules. Errors are classified as interference from the native language or overgeneralization of the target language. It is paired with contrastive analysis." },
    { ja: "失名詞", en: "anomia", def: "物の名前が出てこない、失語に広く見られる症状。「あれ、ほら、あの…」と言葉が出ず、遠回しに説明する話し方になる。", defEn: "Difficulty finding the names of things, a symptom common across aphasias. A speaker says 'that, you know, that thing' and, unable to find the word, explains it in a roundabout way." },
    { ja: "心的辞書", en: "mental lexicon", def: "頭の中に蓄えられた語の知識の全体。語の発音・意味・品詞などが蓄えられており、語彙アクセスはここから情報を取り出す過程である。", defEn: "The whole of word knowledge stored in the mind. It stores the pronunciation, meaning and part of speech of words, and lexical access is the process of retrieving them from it." },
    { ja: "優位半球", en: "dominant hemisphere", def: "言語の処理を主に担う側の大脳半球。多くの右利きの人では左半球で、ブローカ野やウェルニッケ野はそこにある。", defEn: "The cerebral hemisphere mainly responsible for language processing. In most right-handed people it is the left hemisphere, where Broca's and Wernicke's areas lie." },
    { ja: "シャドーイング", en: "shadowing", def: "聞こえた音声を、すぐに追いかけて声に出して繰り返す課題。同時通訳の訓練や外国語の聞き取り練習に使われる。", defEn: "A task of repeating heard speech aloud right behind the speaker. It is used in training for simultaneous interpreting and in listening practice for foreign languages." },
  ],
  "applied": [
    { ja: "コミュニカティブ・アプローチ", en: "communicative approach", def: "意味の伝達・使用を重視する教授法。文法の正確さだけでなく、場面に応じて伝え合えることを目標にし、文法訳読法とは対になる。", defEn: "Teaching approach that emphasizes conveying and using meaning. Its goal is not only grammatical accuracy but communicating appropriately in context, in contrast to the grammar-translation method." },
    { ja: "シラバス", en: "syllabus", def: "学習内容・順序を定めた指導計画。文法項目を順に並べる文法シラバスや、場面で組む場面シラバスなどがある。", defEn: "A teaching plan that specifies learning content and its sequence. Types include the grammatical syllabus, which orders grammar points, and the situational syllabus, built around settings." },
    { ja: "CEFR", en: "Common European Framework of Reference for Languages", def: "A1〜C2の6段階で言語能力を示す欧州共通参照枠。A1が入門、C2が熟達の水準で、各国の語学試験の水準を比べる目安になる。", defEn: "The European framework that describes language proficiency on six levels, A1 to C2. A1 is the beginner level and C2 the mastery level, and it serves as a yardstick for comparing language tests across countries." },
    { ja: "等価性", en: "equivalence", def: "原文と訳文の間で保たれるべき対応関係。語の意味を合わせる形式的等価と、読者への効果を合わせる動的等価が区別される。", defEn: "The correspondence that should be maintained between a source text and its translation. Formal equivalence matches the wording, and dynamic equivalence matches the effect on the reader." },
    { ja: "スコポス理論", en: "Skopos theory", def: "翻訳の目的を訳出方針の基準とする理論。広告文を現地の消費者に響くよう訳し変えるように、目的で訳し方を決める。フェルメーアが提唱した。", defEn: "A theory that takes the purpose of a translation as the criterion for translation decisions. A translation of advertising copy is reworked to appeal to local consumers, so the purpose decides the approach. Vermeer proposed it." },
    { ja: "ローカリゼーション", en: "localization", def: "文化的背景に合わせた翻訳・適応。ソフトの日付形式や通貨、色の意味まで現地向けに直し、単なる翻訳より範囲が広い。", defEn: "Translation and adaptation to suit a target cultural background. Date formats, currency and even the meaning of colors in software are adapted locally, so it goes beyond plain translation." },
    { ja: "逐次通訳", en: "consecutive interpreting", def: "発話後にまとめて訳す通訳方式。話者が区切りごとに話を止め、通訳者がメモを見ながら訳す。同時通訳とは対になる。", defEn: "A mode of interpreting in which the interpreter renders the speech after the speaker has finished a segment. The speaker pauses at each segment and the interpreter renders it from notes, in contrast to simultaneous interpreting." },
    { ja: "同時通訳", en: "simultaneous interpreting", def: "発話とほぼ同時に訳す通訳方式。国際会議で、通訳者がブースで聞きながら訳し、聞き手はヘッドホンで聞く。", defEn: "A mode of interpreting in which the interpreter renders the speech almost at the same time as it is delivered. At an international conference the interpreter translates while listening inside a booth, and the audience listens through headphones." },
    { ja: "ノートテイキング", en: "note-taking", def: "逐次通訳のための記憶補助メモ技術。文章をそのまま書かず、記号や矢印で論理の流れを書き留めるのが特徴である。", defEn: "A memory-aiding note technique used for consecutive interpreting. Rather than writing sentences out, the interpreter records the flow of logic with symbols and arrows." },
    { ja: "見出し語", en: "headword", def: "辞書に掲載される語の代表形。「走った」「走れば」を「走る」の見出しにまとめるように、活用した形も代表形で引く。", defEn: "The representative form of a word listed in a dictionary. Inflected forms are looked up under the representative form, as the Japanese hashitta and hashireba are listed under hashiru." },
    { ja: "学習者用辞書", en: "learner's dictionary", def: "語学学習者向けに設計された辞書。定義に限られた基本語彙を使い、用例や文法情報を多く載せるのが特徴である。", defEn: "A dictionary designed for language learners. Its features are definitions written in a limited basic vocabulary and many examples and notes on grammar." },
    { ja: "コロケーション辞典", en: "collocation dictionary", def: "語の慣用的組み合わせを収録した辞書。heavy rainのように、どの語がどの語と自然に結びつくかを引ける。", defEn: "A dictionary that records customary combinations of words. One can look up which words go naturally with which, as in heavy rain." },
    { ja: "妥当性", en: "validity", def: "テストが測ろうとするものを正しく測れているか。読解力テストが語彙の知識しか測っていなければ、妥当性が低い。信頼性とは別の概念である。", defEn: "Whether a test measures what it is intended to measure, and measures it correctly. A reading test that measures only vocabulary knowledge has low validity. It is a different concept from reliability." },
    { ja: "信頼性", en: "reliability", def: "測定結果の一貫性・安定性。同じ人が同じテストを再び受けても似た得点が出るかで見る。妥当性とは別の概念である。", defEn: "The consistency and stability of measurement results. It is judged by whether the same person gets a similar score when retaking the same test. It is a different concept from validity." },
    { ja: "ウォッシュバック効果", en: "washback effect", def: "テストが指導・学習に及ぼす影響。入試に会話がなければ会話の授業が減るのが悪い例で、良い影響もある。", defEn: "The influence a test has on teaching and learning. A bad case is that conversation classes shrink if the entrance exam has no speaking section; it can also have a good influence." },
    { ja: "著者推定", en: "authorship attribution", def: "文章的特徴から書き手を推定する手法。匿名の文書や古典の作者を、助詞や語の使用頻度といった癖から絞り込む。", defEn: "A method of inferring the writer of a text from its stylistic features. The author of an anonymous document or a classic is narrowed down from habits such as the use of particles and word frequencies." },
    { ja: "イディオレクト", en: "idiolect", def: "個人に特有の言語使用パターン。同じ日本語でも、人ごとに語の選び方や口癖が違う。法言語学で手がかりになる。", defEn: "The pattern of language use peculiar to an individual. Even in the same language, people differ in word choice and verbal habits, which gives clues in forensic linguistics." },
    { ja: "言語的証拠", en: "linguistic evidence", def: "法的手続きで用いられる言語分析結果。脅迫状や録音の話者の特定に用いられるが、鑑定結果の確実さには限界がある。", defEn: "The results of linguistic analysis used in legal proceedings. It is used to identify the writer of a threatening letter or a speaker on a recording, though the certainty of the result is limited." },
    { ja: "プレイン・ランゲージ", en: "plain language", def: "明確で分かりやすい表現を目指す言語使用方針。法令や行政文書を、専門用語を避けて短い文で書き直す取り組みが例である。", defEn: "A language-use policy aiming at clear and easily understood expression. Rewriting laws and official documents in short sentences without technical terms is an example." },
    { ja: "語用論的失敗", en: "pragmatic failure", def: "意図と異なる解釈を招く文脈依存的な誤解。「検討します」を前向きな返事と受け取るように、文化による含みの違いで起きる。", defEn: "A context-dependent misunderstanding that leads to an interpretation different from the intended one. It arises from cultural differences in implication, as when a polite 'I will consider it' is taken as a positive reply." },
    { ja: "医療通訳", en: "medical interpreting", def: "医療現場における通訳活動。診察室で患者と医師の間に入り、症状や同意の説明を正確に訳す。", defEn: "Interpreting activity in healthcare settings. The interpreter stands between patient and doctor in the consulting room and accurately renders symptoms and explanations for consent." },
    { ja: "通訳ブース", en: "interpreting booth", def: "同時通訳者が入る、防音された小部屋。国際会議の会場後方などに置かれ、通訳者は中でマイクとヘッドホンを使う。", defEn: "A soundproofed small room in which simultaneous interpreters work. Placed at the back of an international conference hall, it holds interpreters who use a microphone and headphones inside." },
    { ja: "訂正フィードバック", en: "corrective feedback", def: "学習者の誤りに対して教師が示す訂正や手がかり。誤りを直接直す方法と、言い直して聞かせるリキャストなどがある。", defEn: "The correction or cues a teacher gives in response to a learner's error. Methods include correcting the error directly and recasts, in which the teacher restates the sentence correctly." },
    { ja: "用例", en: "example sentence", def: "語の使い方を示す、実際の文や句の例。辞書では語釈の後に載り、語がどんな語と使われるかを示す。", defEn: "A real sentence or phrase showing how a word is used. In a dictionary it follows the definition and shows which words the word is used with." },
    { ja: "語釈", en: "definition", def: "見出し語の意味を説明した文言。見出し語の後に置かれ、同じ意味の別の語で言い換える方法などで書かれる。", defEn: "The wording that explains the meaning of a headword. It comes after the headword and is written, for example, by paraphrasing with another word of the same meaning." },
    { ja: "原文", en: "source text", def: "翻訳の元になる、訳す前の文章。訳文と対になる語で、翻訳では原文を忠実に読むことが出発点になる。", defEn: "The text before translation, from which a translation is made. It is paired with the target text, and reading the source text faithfully is the starting point of translation." },
    { ja: "訳文", en: "target text", def: "翻訳の結果として得られた文章。原文と対になる語で、読み手の言語として自然かどうかが評価される。", defEn: "The text produced as the result of translating. It is paired with the source text, and is judged on whether it reads naturally in the reader's language." },
    { ja: "等化", en: "equating", def: "異なる版のテストの得点を、同じ尺度で比べられるよう調整する手続き。共通の問題を使って回ごとの難しさの差を補い、得点を同じ尺度に直す。", defEn: "A procedure that adjusts scores from different test forms so they can be compared on one scale. Common items are used to compensate for differences in difficulty between test forms and put scores on the same scale." },
    { ja: "項目弁別力", en: "item discrimination", def: "問題が高得点者と低得点者を区別できる度合い。上位群が正解し下位群が誤答する問題は弁別力が高く、全員が正解する問題は低い。", defEn: "The degree to which an item separates high scorers from low scorers. An item that high scorers answer correctly and low scorers miss has high discrimination, and one everyone answers correctly has low discrimination." },
    { ja: "法廷通訳", en: "court interpreting", def: "裁判で当事者の発言を正確に訳して伝える通訳。刑事裁判で外国人の被告人に起訴内容を通訳する場面が例で、正確さが求められる。", defEn: "Interpreting that conveys the statements of those in court accurately. Interpreting the charges to a foreign defendant in a criminal trial is an example, and accuracy is required." },
    { ja: "ヘルスリテラシー", en: "health literacy", def: "健康に関する情報を探して理解し、判断に使う力。薬の説明書や検査結果を読み、自分の判断に使えるかを指す。", defEn: "The ability to find and understand health information and use it for decisions. It covers whether a person can read a drug leaflet or test result and use it in their own decisions." },
    { ja: "剽窃検出", en: "plagiarism detection", def: "文章が他の文章と重なる部分を調べ、無断の流用を見つける作業。大学のレポートの提出時に、ウェブ上の文章との一致を調べるソフトが使われる。", defEn: "The work of finding overlap between texts to detect unattributed copying. Software that compares a university report with text on the web is used when it is submitted." },
  ],
  "interdisciplinary": [
    { ja: "指示", en: "reference", def: "語が指し示す対象との関係。「東京」という語が実在の都市を指すのが例で、語の意義とは区別される。", defEn: "Relation between a word and the object it refers to. The word Tokyo pointing to an actual city is an example; reference is distinguished from the sense of a word." },
    { ja: "意義と指示対象", en: "Sinn und Bedeutung", def: "フレーゲによる語の意義と指示対象の区別(内包と外延に重ねる説もある)。「明けの明星」と「宵の明星」は指示対象が同じ金星で、意義が違う。", defEn: "Frege's distinction between a term's sense and its reference (sometimes aligned with intension and extension). The morning star and the evening star have the same referent, Venus, but different senses." },
    { ja: "言語行為論", en: "speech act theory", def: "発話を行為として捉える理論。オースティンが唱え、サールが発展させた。約束や命名などの発話を行為とみなす。", defEn: "A theory that treats utterances as actions. Austin proposed it and Searle developed it. Utterances such as promising or naming count as actions." },
    { ja: "概念メタファー", en: "conceptual metaphor", def: "抽象概念を具体的領域で理解する認知的写像。「議論は戦争だ」という写像から、「論破する」「攻撃を受ける」といった表現が生まれる。", defEn: "A cognitive mapping by which abstract concepts are understood through concrete domains. From the mapping 'argument is war' come expressions like 'to demolish an argument' or 'to come under attack'." },
    { ja: "プロトタイプ理論", en: "prototype theory", def: "カテゴリーに典型例と周辺例があるとする理論。「鳥」ではスズメが典型で、ペンギンは周辺的な例になる。ロッシュの研究が基になった。", defEn: "A theory that categories have typical (central) and peripheral members. For the category bird, a sparrow is typical and a penguin is peripheral. Rosch's research was its basis." },
    { ja: "構文文法", en: "construction grammar", def: "構文自体が意味を持つとする文法理論。二重目的語構文のように、授与の意味が動詞だけでなく構文にも備わるとみなす。", defEn: "A grammatical theory holding that constructions themselves carry meaning. As in the double-object construction, the sense of giving is held to belong to the construction as well as to the verb." },
    { ja: "普遍文法", en: "universal grammar", def: "全言語に共通するとされる生得的な文法原理。チョムスキーの生成文法で中心となり、言語ごとの違いはパラメータで説明される。", defEn: "Innate grammatical principles said to be shared by all languages. Central to Chomsky's generative grammar, it explains differences between languages through parameters." },
    { ja: "併合", en: "Merge", def: "2つの要素を組み合わせ新たな構造を作る基本操作。ミニマリスト・プログラムの基本操作で、eatとappleを合わせてeat appleを作る。", defEn: "The basic operation that combines two elements to build a new structure. The basic operation of the Minimalist Program, it combines eat and apple to form eat apple." },
    { ja: "原理とパラメータ", en: "principles and parameters", def: "普遍的原理と言語ごとに異なる設定値からなる理論枠組み。主要部が先に来るか後に来るかというパラメータで、英語と日本語の語順の違いを説明する。", defEn: "A theoretical framework consisting of universal principles and language-specific parameter settings. The head-direction parameter, whether the head comes first or last, explains the word-order difference between English and Japanese." },
    { ja: "メタ機能", en: "metafunction", def: "観念的・対人的・テクスト的という言語の3つの機能。ハリデーの選択体系機能言語学の用語で、三つの機能が一つの節の中で同時に働く。", defEn: "The three functions of language: ideational, interpersonal and textual. A term of Halliday's systemic functional linguistics; the three functions operate at the same time within one clause." },
    { ja: "テーマ/レーマ", en: "theme/rheme", def: "文における出発点(テーマ)と、それについて述べる部分(レーマ)の区別。「太郎は本を読んだ」では「太郎は」がテーマで、残りがレーマになる。", defEn: "The distinction between a clause's starting point (theme) and the part that says something about it (rheme). In the Japanese 'Taro wa hon o yonda', Taro wa is the theme and the rest is the rheme." },
    { ja: "及物性", en: "transitivity", def: "過程・参与者・状況の関係を表す節の構造。ハリデーの体系では、物質・心理・関係などの過程の種類で節を分類する。", defEn: "The clause structure expressing relations among process, participants and circumstances. In Halliday's system, clauses are classified by process types such as material, mental and relational." },
    { ja: "結束性", en: "cohesion", def: "テクスト内の文法的・語彙的なつながり。代名詞「それ」や接続詞「しかし」が前の文とつなぐ。ハリデーとハッサンが論じた。", defEn: "Grammatical and lexical connections within a text. A pronoun like sore (it) or a conjunction like shikashi (but) links a sentence to the previous one. Halliday and Hasan discussed it." },
    { ja: "批判的談話分析", en: "critical discourse analysis", def: "言語使用に潜む権力関係を分析する立場。フェアクラフらが代表で、ニュース記事の語の選び方に隠れた立場を読み取る。", defEn: "An approach analyzing power relations embedded in language use. Fairclough is a representative figure; the approach reads hidden stances in the choice of words in news articles." },
    { ja: "ターンテイキング", en: "turn-taking", def: "会話における発話順番の交替の仕組み。相手の発話の終わりで次の話者が始める。サックスらの研究が有名である。", defEn: "The mechanism by which speakers alternate turns in conversation. The next speaker begins at the end of the other's utterance. The study by Sacks and colleagues is well known." },
    { ja: "隣接ペア", en: "adjacency pair", def: "質問-応答のように対をなす発話の組。挨拶と挨拶返し、依頼と承諾のように、第一部に対して第二部が期待される。", defEn: "A pair of utterances forming a unit, such as question and answer. A greeting and its return or a request and its acceptance are examples, where a second part is expected after the first." },
    { ja: "修復", en: "repair", def: "会話上の問題を訂正する相互行為的手続き。「え?」と聞き返す他者開始と、自分で言い直す自己開始が区別される。", defEn: "An interactional procedure for correcting problems in conversation. Repair started by another person, as when one asks 'Huh?', is distinguished from self-initiated repair, where the speaker rephrases." },
    { ja: "前景化", en: "foregrounding", def: "通常と異なる際立った言語使用。詩の繰り返しや語順の逆転のように、読者の注意を引く。プラハ学派の用語である。", defEn: "Salient language use that departs from the ordinary. Repetition or inverted word order in poetry draws the reader's attention. It is a term of the Prague School." },
    { ja: "レジスター", en: "register", def: "場面に応じた言語使用域。法律文書の硬い文体と友人との砕けた話し方のように、場面で語や文体が選ばれる。", defEn: "A language variety used according to the situation. The stiff style of legal documents and the casual speech among friends show how words and style are chosen by situation." },
    { ja: "シニフィアン/シニフィエ", en: "signifiant/signifié", def: "記号表現と記号内容の区別。ソシュールの用語。「木」という音や文字がシニフィアンで、木の概念がシニフィエである。", defEn: "The distinction between the signifier (form) and the signified (content) of a sign. A term of Saussure. The sound or letters of the word for tree are the signifier, and the concept of a tree is the signified." },
    { ja: "コード(記号論)", en: "code", def: "記号の意味解釈を支配する規則体系。交通信号の赤が「止まれ」を意味するのは、約束事としてのコードによる。", defEn: "A system of rules governing how signs are interpreted. A red traffic light meaning stop depends on a code, a convention." },
    { ja: "起点領域", en: "source domain", def: "概念メタファーで、理解の手がかりとなる具体的な領域。「人生は旅だ」では旅が起点領域で、人生が目標領域になる。", defEn: "In conceptual metaphor, the concrete domain used as a clue to understanding. In 'life is a journey', the journey is the source domain and life is the target domain." },
    { ja: "目標領域", en: "target domain", def: "概念メタファーで、理解しようとする抽象的な領域。「人生は旅だ」では人生が目標領域で、旅が起点領域になる。", defEn: "In conceptual metaphor, the abstract domain one is trying to understand. In 'life is a journey', life is the target domain and the journey is the source domain." },
    { ja: "痕跡", en: "trace", def: "移動した要素が元の位置に残すとされる、音を持たない要素。What did you buy tのように、疑問詞が文頭へ移った後の元の位置に置かれる。", defEn: "A silent element thought to be left behind in the original position of a moved element. In What did you buy t, it sits in the original position after the question word has moved to the front." },
    { ja: "構成素", en: "constituent", def: "文の中でまとまりとして働く語や句の連なり。疑問文の答えとして単独で現れる語の連なりが、構成素を見分ける手がかりになる。", defEn: "A word or string of words that functions as a unit within a sentence. A string of words that can stand alone as an answer to a question is a clue that it is a constituent." },
    { ja: "機能的文展望", en: "functional sentence perspective", def: "文を既知から新情報への流れとして分析する枠組み。プラハ学派が唱えた。既知の情報が文頭に、新情報が文末に来る傾向を捉える。", defEn: "A framework analyzing a sentence as a flow from known to new information. Proposed by the Prague School, it captures the tendency for known information to come first and new information last." },
    { ja: "ゼロ代名詞", en: "zero pronoun", def: "文中に表れず、文脈から補われる代名詞的な要素。日本語の「(私は)昨日映画を見た」のように、主語が省略されて表れない。", defEn: "A pronoun-like element that is absent from the sentence and supplied from context. In the Japanese 'Kinoo eiga o mita', the subject is left out and does not appear." },
    { ja: "あいづち", en: "backchannel", def: "相手の話を遮らず、聞いていると示す短い反応。日本語の「うん」「ええ」「なるほど」が例で、英語のuh-huhなども含まれる。", defEn: "A short response showing the listener is following without taking the turn. Japanese un, ee and naruhodo are examples, and English uh-huh is included." },
    { ja: "記号過程", en: "semiosis", def: "記号が解釈者に受け取られ、意味を生む過程。パースの記号論の用語で、記号と対象と解釈項の三項関係で捉える。", defEn: "The process in which a sign is taken up by an interpreter and produces meaning. A term in Peirce's theory of signs, it is understood as a three-part relation of sign, object and interpretant." },
    { ja: "ジャンル", en: "genre", def: "目的と形式の型を共有するテクストの類型。ニュース記事や論文の抄録は、定まった構成と文体を持つ。スウェイルズらの研究が有名である。", defEn: "A type of text sharing a purpose and a conventional form. News articles and paper abstracts have a settled structure and style. The studies of Swales and others are well known." },
    { ja: "文脈化の合図", en: "contextualization cue", def: "発話の解釈の枠を示す、韻律などの手がかり。ガンパーズが提唱した。声の高さや抑揚が、冗談か真剣かの解釈を左右する。", defEn: "A cue such as prosody that signals the frame for interpreting an utterance. Gumperz proposed it. Pitch and intonation can decide whether an utterance is read as a joke or as serious." },
    { ja: "指標詞", en: "indexical", def: "「私」「ここ」のように、指す対象が使われる文脈で決まる表現。「私」は話す人ごとに指す人が変わり、「昨日」は発話の日で決まる。", defEn: "An expression like 'I' or 'here' whose referent is fixed by the context of use. The word for I refers to a different person with each speaker, and yesterday is fixed by the day of the utterance." },
  ],
};

/* 紛らわしいポイント: カテゴリごとに混同しやすい概念ペアをまとめたデータ */
const CONFUSION_DATA = {
  historical: [
    {"a": "歴史言語学", "aEn": "Historical Linguistics", "b": "比較言語学", "bEn": "Comparative Linguistics", "note": "歴史言語学は単一言語(系統)の通時的変化そのものを研究するのに対し、比較言語学は複数言語を比較して系統関係・祖語を明らかにすることに重点を置く。両者は密接に関連する。", "noteEn": "Historical linguistics studies diachronic change within a single language or lineage, while comparative linguistics compares multiple languages to establish genetic relationships and reconstruct proto-forms. The two are closely intertwined."},
    {"a": "同根語", "aEn": "Cognate", "b": "音対応", "bEn": "Sound Correspondence", "note": "同根語は共通の祖先語に由来する語そのものを指し、音対応はその同根語間に見られる規則的な音の対応パターンを指す。", "noteEn": "A cognate is a word itself descended from a common ancestor, while a sound correspondence is the regular pattern of sound matching observed between such cognates."},
    {"a": "語彙年代学", "aEn": "Glottochronology", "b": "比較法", "bEn": "Comparative Method", "note": "語彙年代学は基礎語彙の置換率から分岐年代を推定する統計的手法、比較法は同根語の音対応から祖語の形を再構築する手法。目的が異なる。", "noteEn": "Glottochronology statistically estimates split dates from basic-vocabulary replacement rates, whereas the comparative method reconstructs proto-forms from sound correspondences among cognates. Their goals differ."},
    {"a": "通時的研究", "aEn": "Diachronic study", "b": "共時的研究", "bEn": "Synchronic study", "note": "通時的研究は言語の時間に沿った変化を扱い、共時的研究は特定の一時点の言語体系を記述する。この区別はソシュールが強調した。", "noteEn": "Diachronic study deals with change over time, whereas synchronic study describes the language system at one point in time. Saussure stressed this distinction."},
    {"a": "同根語", "aEn": "Cognate", "b": "借用語", "bEn": "Loanword", "note": "同根語は共通の祖先語から受け継いだ語、借用語は別の言語から取り入れた語。語形が似ていても、音対応が規則的かどうかで見分ける。", "noteEn": "A cognate is inherited from a common ancestor, while a loanword is taken from another language. Similar forms are told apart by whether the sound correspondences are regular."},
    {"a": "音変化", "aEn": "Sound change", "b": "類推", "bEn": "Analogy", "note": "音変化は条件が同じなら例外なく進む音の変化、類推は形どうしの結びつきによる形の作り替えで、音の規則とは別に起こる。", "noteEn": "Sound change is a shift that proceeds without exception under the same conditions; analogy remodels forms by association between forms and operates independently of sound laws."},
    {"a": "膠着語", "aEn": "Agglutinative language", "b": "屈折語", "bEn": "Fusional language", "note": "膠着語は一つの接辞が一つの意味を担い、境界がはっきりしている。屈折語は一つの接辞に複数の文法的意味が融合する。", "noteEn": "In agglutinative languages each affix carries one meaning with clear boundaries; in fusional languages a single affix merges several grammatical meanings."},
    {"a": "能格型", "aEn": "Ergative alignment", "b": "対格型", "bEn": "Accusative alignment", "note": "対格型は自動詞と他動詞の主語を同じに扱い、能格型は自動詞の主語と他動詞の目的語を同じに扱う。標示が異なるだけで、主語の概念は別問題である。", "noteEn": "Accusative alignment treats intransitive and transitive subjects alike, while ergative alignment treats the intransitive subject like the transitive object. These are patterns of marking, not simply different views of the subject."},
    {"a": "比較法", "aEn": "Comparative method", "b": "内的再建法", "bEn": "Internal reconstruction", "note": "比較法は複数の言語の同根語を比べて祖語を推定する。内的再建法は一つの言語内の不規則な交替から、より古い段階の形を推定する。", "noteEn": "The comparative method compares cognates across several languages to infer a proto-language; internal reconstruction infers earlier forms from irregular alternations within one language."},
    {"a": "語族", "aEn": "Language family", "b": "言語連合", "bEn": "Sprachbund", "note": "語族は共通の祖語から分かれた系統上のまとまり。言語連合は系統が違っても、地域での接触により構造が似通った言語群をいう。", "noteEn": "A family is a genetic group descended from a common ancestor; a Sprachbund is a group of languages, even unrelated ones, that came to share structures through regional contact."},
    {"a": "再建形", "aEn": "Reconstructed form", "b": "文証形", "bEn": "Attested form", "note": "再建形は比較から推定した仮説の形で*を付す。文証形は文献に実際に記録された形で、ラテン語paterは文証形、印欧祖語*ph₂tērは再建形。", "noteEn": "A reconstructed form is a hypothesis inferred by comparison and marked with *; an attested form is recorded in texts. Latin pater is attested, Proto-Indo-European *ph₂tēr is reconstructed."},
    {"a": "内的再構", "aEn": "Internal reconstruction", "b": "比較法", "bEn": "Comparative method", "note": "内的再構は一つの言語内の不規則な交替から古い形を推定する。比較法は同系統の複数の言語を比べて祖語を再構する。資料の範囲が異なる。", "noteEn": "Internal reconstruction infers older forms from irregular alternations inside one language, while the comparative method compares several related languages to reconstruct a proto-language. They differ in the evidence used."},
  ],
  computational: [
    {"a": "自然言語処理(NLP)", "aEn": "Natural Language Processing (NLP)", "b": "計算言語学", "bEn": "Computational Linguistics", "note": "計算言語学は言語現象を計算的手法でモデル化する学際分野全体を指し、NLPはその中でも実用的なシステム構築(応用寄り)に重点を置くことが多い。", "noteEn": "Computational linguistics is the broader interdisciplinary field modeling language phenomena computationally, while NLP tends to emphasize building practical, applied systems within that field."},
    {"a": "ASR(音声認識)", "aEn": "ASR (Automatic Speech Recognition)", "b": "NLU(自然言語理解)", "bEn": "NLU (Natural Language Understanding)", "note": "ASRは音声を文字に変換する技術、NLU(NLPの一部)はそのテキストの意味を理解する技術。処理の段階が異なる。", "noteEn": "ASR converts speech into text, while NLU (a subfield of NLP) understands the meaning of that text. They operate at different stages of the pipeline."},
    {"a": "BLEU", "aEn": "BLEU", "b": "BM25", "bEn": "BM25", "note": "BLEUは機械翻訳の品質を評価する自動評価指標、BM25は情報検索でランキングに使う確率的スコアリング関数。全く異なるタスクの指標。", "noteEn": "BLEU is an automatic metric for evaluating machine translation quality, while BM25 is a probabilistic scoring function used for ranking in information retrieval. They serve entirely different tasks."},
    {"a": "RDF / RDFS / OWL", "aEn": "RDF / RDFS / OWL", "b": "(表現力の階層)", "bEn": "(a hierarchy of expressiveness)", "note": "RDFはデータを主語-述語-目的語の三つ組で表現する基本形式、RDFSはクラス・プロパティの階層を定義する語彙、OWLはさらに高度な論理的制約・推論を可能にする言語。表現力はRDF < RDFS < OWLの順に高まる。", "noteEn": "RDF is the basic subject-predicate-object triple format, RDFS is a vocabulary for defining class/property hierarchies on top of RDF, and OWL adds richer logical constraints and reasoning. Expressiveness increases in the order RDF < RDFS < OWL."},
    {"a": "オントロジー", "aEn": "Ontology", "b": "タクソノミー", "bEn": "Taxonomy", "note": "タクソノミーは分類階層(is-a関係)のみを扱うのに対し、オントロジーはより多様な関係性や公理を含む豊かな体系。", "noteEn": "A taxonomy deals only with classification hierarchies (is-a relations), whereas an ontology is a richer system including a wider variety of relations and axioms."},
    {"a": "語幹抽出(ステミング)", "aEn": "Stemming", "b": "見出し語化(レンマ化)", "bEn": "Lemmatization", "note": "ステミングは規則で語尾を機械的に削って語幹に近づける処理で、結果が実在の語とは限らない。レンマ化は辞書と品詞を使って語の基本形(見出し語)に戻す。", "noteEn": "Stemming mechanically strips endings by rules, so the result need not be a real word. Lemmatization uses a dictionary and part of speech to return a word to its base form (lemma)."},
    {"a": "適合率(precision)", "aEn": "Precision", "b": "再現率(recall)", "bEn": "Recall", "note": "適合率は返した結果のうち正しいものの割合、再現率は正しい結果全体のうち実際に返せたものの割合。片方を上げるともう片方が下がりやすく、F値で両者をまとめる。", "noteEn": "Precision is the share of returned results that are correct; recall is the share of all correct results that were actually returned. Raising one tends to lower the other, and the F-measure combines them."},
    {"a": "タイプ(異なり語)", "aEn": "Type (distinct word)", "b": "トークン(延べ語)", "bEn": "Token (running word)", "note": "コーパスの語数を数えるとき、同じ語を何回出ても一つと数えるのがタイプ、出現のたびに数えるのがトークン。「the」が百回出れば、タイプは1、トークンは100になる。", "noteEn": "When counting words in a corpus, a type counts each distinct word once, while a token counts every occurrence. If 'the' appears 100 times, that is 1 type and 100 tokens."},
    {"a": "知識グラフ", "aEn": "Knowledge graph", "b": "オントロジー", "bEn": "Ontology", "note": "オントロジーは概念やその関係の定義(スキーマ)を指し、知識グラフは具体的な実体と事実を大量に結んだデータを指すことが多い。両者を組み合わせて使うが、区別のしかたは文献で揺れる。", "noteEn": "An ontology usually denotes definitions of concepts and relations (the schema), whereas a knowledge graph often denotes large data linking concrete entities and facts. They are used together, though the distinction varies across the literature."},
    {"a": "事前学習", "aEn": "Pretraining", "b": "ファインチューニング", "bEn": "Fine-tuning", "note": "事前学習は大量の文章から一般的な言語知識を学ぶ最初の段階で、ファインチューニングはそのモデルを特定の課題や指示への応答に合わせて追加学習する段階。目的とデータの量が異なる。", "noteEn": "Pretraining is the first stage, learning general language knowledge from large amounts of text; fine-tuning is the later stage of additional training that adapts the model to a specific task or to following instructions. Their purposes and data volumes differ."},
    {"a": "音響モデル", "aEn": "Acoustic model", "b": "言語モデル", "bEn": "Language model", "note": "音響モデルは音声の特徴と音の単位との対応を確率で表し、言語モデルは語の並びのもっともらしさを表す。音声認識ではこの2つを組み合わせて最も確からしい文字列を選ぶ。", "noteEn": "An acoustic model gives probabilities linking speech features to sound units, while a language model gives how plausible a word sequence is. Speech recognition combines the two to choose the likeliest text."},
    {"a": "形態素解析", "aEn": "Morphological analysis", "b": "構文解析", "bEn": "Syntactic parsing", "note": "形態素解析は文を形態素に区切って品詞や活用を判定する語の水準の処理で、構文解析はその結果を使って句構造や依存関係といった文の構造を求める。", "noteEn": "Morphological analysis segments a sentence into morphemes and identifies their parts of speech and inflection, a word-level task, while parsing uses that output to recover sentence structure such as phrases or dependencies."},
    {"a": "密検索", "aEn": "Dense retrieval", "b": "疎検索", "bEn": "Sparse retrieval", "note": "密検索は埋め込みベクトルの近さで意味の近い文書を探し、疎検索は転置インデックスで語の一致を手がかりにする。前者は言い換えに、後者は固有名詞に強い。", "noteEn": "Dense retrieval finds semantically close documents by embedding proximity, while sparse retrieval relies on term matches through an inverted index. The former handles paraphrase better, the latter proper names."},
    {"a": "RAG", "aEn": "RAG", "b": "ファインチューニング", "bEn": "Fine-tuning", "note": "RAGは生成時に外部の文書を検索して根拠に加え、モデルの重みは変えない。ファインチューニングは追加の学習で重みそのものを更新し、振る舞いを調整する。", "noteEn": "RAG retrieves external documents at generation time to ground the answer and leaves the model's weights unchanged. Fine-tuning updates the weights themselves through additional training to adjust behavior."},
    {"a": "開世界仮説", "aEn": "Open World Assumption", "b": "閉世界仮説", "bEn": "Closed World Assumption", "note": "開世界では書かれていない事実は不明とし、閉世界では偽とみなす。OWLは前者、データベースの問い合わせは通常後者に立つ。", "noteEn": "The open world treats unstated facts as unknown, the closed world as false. OWL takes the former; database queries normally take the latter."},
  ],
  theoretical: [
    {"a": "音声学", "aEn": "Phonetics", "b": "音韻論", "bEn": "Phonology", "note": "音声学は音の物理的・生理的性質(実際の発音)を扱い、音韻論はその音が言語体系の中でどう機能するか(音素・弁別性)を扱う。", "noteEn": "Phonetics deals with the physical/physiological properties of sounds (actual pronunciation), while phonology deals with how those sounds function within a language's system (phonemes, distinctiveness)."},
    {"a": "形態論", "aEn": "Morphology", "b": "統語論", "bEn": "Syntax", "note": "形態論は語の内部構造(形態素の組み合わせ)を、統語論は語が組み合わさって句・文を作る規則を扱う。", "noteEn": "Morphology deals with a word's internal structure (combinations of morphemes), while syntax deals with the rules by which words combine into phrases and sentences."},
    {"a": "意味論", "aEn": "Semantics", "b": "語用論", "bEn": "Pragmatics", "note": "意味論は文脈から独立した語・文の字義的な意味を、語用論は文脈に依存した話者の意図された意味を扱う。", "noteEn": "Semantics deals with the literal, context-independent meaning of words and sentences, while pragmatics deals with the speaker's intended meaning as shaped by context."},
    {"a": "音素", "aEn": "Phoneme", "b": "異音", "bEn": "Allophone", "note": "音素は意味の区別に働く抽象的な単位で、異音はそれが環境ごとに実際に現れる具体的な音。pin の p と spin の p は同じ音素の異音である。", "noteEn": "A phoneme is an abstract unit that distinguishes meaning; an allophone is its concrete realization in a given environment. The p of pin and the p of spin are allophones of one phoneme."},
    {"a": "屈折", "aEn": "Inflection", "b": "派生", "bEn": "Derivation", "note": "屈折は時制や数など文法情報を語形で表し、品詞は変わらない(walk と walked)。派生は新しい語を作り、品詞が変わることが多い(happy と happiness)。", "noteEn": "Inflection marks grammatical information such as tense or number without changing the category (walk, walked). Derivation creates a new word and often changes the category (happy, happiness)."},
    {"a": "含意", "aEn": "Entailment", "b": "前提", "bEn": "Presupposition", "note": "含意は文が真なら必ず真になる内容で、否定すると成り立たなくなる。前提は否定しても保たれる。「太郎が花子を殴った」の含意は「花子は殴られた」、前提は「花子がいる」。", "noteEn": "An entailment must be true whenever the sentence is true, and it fails under negation. A presupposition survives negation. For Taro hit Hanako, Hanako was hit is an entailment and Hanako exists is a presupposition."},
    {"a": "文法性", "aEn": "Grammaticality", "b": "容認可能性", "bEn": "Acceptability", "note": "文法性は文が文法規則に合うかという理論上の性質。容認可能性は話者が自然だと感じるかという実際の判断で、記憶の負担なども影響する。", "noteEn": "Grammaticality is a theoretical property: whether a sentence conforms to the grammar. Acceptability is speakers' actual judgment of naturalness, which can also be affected by factors such as memory load."},
    {"a": "多義語", "aEn": "Polysemy", "b": "同音異義語", "bEn": "Homonymy", "note": "多義は1語が関連のある複数の意味を持つこと(mouth の「口」と「河口」)。同音異義は無関係な別の語がたまたま同形になること(bank の「銀行」と「土手」)。", "noteEn": "Polysemy is one word with several related senses (the mouth of a person and the mouth of a river). Homonymy is unrelated words that happen to share a form (bank as a financial institution and bank as a river's edge)."},
    {"a": "調音点", "aEn": "Place of articulation", "b": "調音様式", "bEn": "Manner of articulation", "note": "調音点は口のどこで空気を妨げるかを指し、調音様式はどのように妨げるかを指す。[p]と[m]は同じ調音点だが様式が違う。", "noteEn": "Place is where in the mouth airflow is obstructed; manner is how. [p] and [m] share a place but differ in manner."},
    {"a": "形態素", "aEn": "Morpheme", "b": "語", "bEn": "Word", "note": "形態素は意味や文法の働きを持つ最小の単位で、語より小さいことがある。語は単独で用いられる単位で、複数の形態素から成ることが多い。", "noteEn": "A morpheme is the smallest unit with meaning or function and may be smaller than a word. A word stands alone and often consists of several morphemes."},
    {"a": "有声音", "aEn": "Voiced sound", "b": "有気音", "bEn": "Aspirated sound", "note": "有声音は声帯が振動する音で、有気音は破裂の後に強い息が続く音である。両者は別の特徴で、無声で有気の[pʰ]もある。", "noteEn": "A voiced sound has vocal fold vibration; an aspirated sound has a puff of breath after the release. They are separate traits, as in voiceless aspirated [pʰ]."},
    {"a": "外延", "aEn": "Extension", "b": "内包", "bEn": "Intension", "note": "外延は語が指す対象の集合、内包は語を適用する条件を指す。「明けの明星」と「宵の明星」は外延が同じ金星でも、内包が異なる。", "noteEn": "Extension is the set of things a term picks out; intension is the condition for applying it. 'Morning star' and 'evening star' share an extension, Venus, but differ in intension."},
  ],
  social: [
    {"a": "社会言語学", "aEn": "Sociolinguistics", "b": "方言学", "bEn": "Dialectology", "note": "社会言語学は社会的要因(階層・性別等)による言語変異を、方言学は地理的要因による言語変異を扱う。", "noteEn": "Sociolinguistics deals with language variation due to social factors (class, gender, etc.), while dialectology deals with variation due to geographic factors."},
    {"a": "言語相対論", "aEn": "Linguistic Relativity", "b": "言語決定論", "bEn": "Linguistic Determinism", "note": "言語相対論は言語が思考に「影響を与える」という穏健な立場、言語決定論は言語が思考を「完全に規定する」という強い立場。", "noteEn": "Linguistic relativity is the moderate view that language influences thought, while linguistic determinism is the strong view that language fully determines thought."},
    {"a": "ダイグロシア", "aEn": "Diglossia", "b": "バイリンガリズム", "bEn": "Bilingualism", "note": "ダイグロシアは同一共同体内で高位・低位変種が機能的に使い分けられる社会的状況、バイリンガリズムは個人が2言語を話せる能力を指す個人レベルの概念。", "noteEn": "Diglossia is a societal situation where a high and low variety are used for different functions within one community, while bilingualism is an individual-level ability to speak two languages."},
    {"a": "方言", "aEn": "Dialect", "b": "言語", "bEn": "Language", "note": "相互理解できるかは目安になるが、それだけでは決まらない。標準語の有無や政治的な境界、話者の帰属意識によって、別の言語とも同じ言語の方言とも扱われる。", "noteEn": "Mutual intelligibility is a guide but does not settle the matter. Whether varieties count as separate languages or dialects of one also depends on the existence of a standard, political borders and speakers' sense of identity."},
    {"a": "コードスイッチング", "aEn": "Code-switching", "b": "借用", "bEn": "Borrowing", "note": "コードスイッチングは話者が会話の中で言語を切り替える現象。借用は他言語の語が受け入れ側の言語の語彙として定着したもので、単一言語の話者も使う。", "noteEn": "Code-switching is a speaker alternating between languages within a conversation. A borrowing is a foreign word that has become established in the recipient language's lexicon and is used even by monolinguals."},
    {"a": "ピジン", "aEn": "Pidgin", "b": "クレオール", "bEn": "Creole", "note": "ピジンは共通の言語を持たない人々が接触の中で作る簡略な言語で、通常は母語話者がいない。クレオールはそれが子どもたちに母語として受け継がれ、語彙も文法も拡張したもの。", "noteEn": "A pidgin is a simplified language formed in contact between people without a common language and usually has no native speakers. A creole arises when it is acquired by children as a mother tongue and expands in vocabulary and grammar."},
    {"a": "言語ドキュメンテーション", "aEn": "Language documentation", "b": "言語復興", "bEn": "Language revitalization", "note": "ドキュメンテーションは音声・語彙・談話を記録し保存する作業。復興は話者を増やし、日常の使用領域を取り戻す社会的な取り組みで、記録だけでは達成できない。", "noteEn": "Documentation is the work of recording and preserving sounds, words and discourse. Revitalization is a social effort to increase speakers and restore everyday domains of use, which records alone cannot achieve."},
    {"a": "標準語", "aEn": "Standard language", "b": "共通語", "bEn": "Common language", "note": "日本語学では、標準語を規範として整えられた理想的な言語、共通語を地域を越えて実際に通用している言語と区別する立場がある。両者を同じ意味で使う用法も多い。", "noteEn": "In Japanese linguistics, one view distinguishes the standard language as a codified, idealized norm from the common language as the variety actually understood across regions. The two terms are also often used interchangeably."},
    {"a": "社会方言", "aEn": "Sociolect", "b": "地域方言", "bEn": "Regional dialect", "note": "社会方言は階層や年齢など話者の属する集団で分かれる変種で、地域方言は住む土地で分かれる変種を指す。同じ人が両方の特徴を示すこともある。", "noteEn": "A sociolect is a variety that divides by the social group a speaker belongs to, such as class or age, while a regional dialect divides by place of residence. One person may show features of both."},
    {"a": "地位計画", "aEn": "Status planning", "b": "本体計画", "bEn": "Corpus planning", "note": "地位計画は言語を公用語にするなど社会での役割を決める計画で、本体計画は正書法や語彙、文法など言語自体の形を整える計画を指す。", "noteEn": "Status planning decides a language's role in society, for example making it official, while corpus planning shapes the language itself, such as its orthography, vocabulary and grammar."},
    {"a": "見かけの時間", "aEn": "Apparent time", "b": "実時間", "bEn": "Real time", "note": "見かけの時間は一時点で世代間の差を比べて変化を推定する方法で、実時間は同じ共同体を時を隔てて調べ直し、変化を直接たどる方法を指す。", "noteEn": "Apparent time infers change by comparing generations at one moment, while real time re-studies the same community after an interval and traces change directly."},
    {"a": "言語交替", "aEn": "Language shift", "b": "コードスイッチング", "bEn": "Code-switching", "note": "言語交替は共同体が世代を重ねて別の言語に移る長期の変化で、コードスイッチングは個人が一つの会話の中で言語や変種を切り替える行為を指す。", "noteEn": "Language shift is a long-term change in which a community moves to another language over generations, while code-switching is an individual alternating between languages or varieties within a conversation."},
  ],
  psycho: [
    {"a": "心理言語学", "aEn": "Psycholinguistics", "b": "神経言語学", "bEn": "Neurolinguistics", "note": "心理言語学は言語処理の認知的・行動的側面(反応時間等)を、神経言語学はその脳内基盤(損傷・脳波等)を扱う。", "noteEn": "Psycholinguistics deals with the cognitive/behavioral side of language processing (reaction times, etc.), while neurolinguistics deals with its neural basis (lesions, brain waves, etc.)."},
    {"a": "第一言語習得", "aEn": "First Language Acquisition", "b": "第二言語習得", "bEn": "Second Language Acquisition", "note": "第一言語習得は特別な教授なしに自然に進む母語獲得過程、第二言語習得は既に母語を持つ学習者が目標言語を身につける過程で、母語転移などの影響を受ける。", "noteEn": "First language acquisition is the process of acquiring a native language, which proceeds naturally without special instruction, while second language acquisition is the process by which a learner who already has an L1 acquires a target language, subject to influences like L1 transfer."},
    {"a": "ブローカ失語", "aEn": "Broca's Aphasia", "b": "ウェルニッケ失語", "bEn": "Wernicke's Aphasia", "note": "ブローカ失語は非流暢で努力を要する発話(産出障害)が特徴、ウェルニッケ失語は流暢だが意味の通らない発話(理解障害)が特徴。", "noteEn": "Broca's aphasia is characterized by non-fluent, effortful speech (a production deficit), while Wernicke's aphasia is characterized by fluent but nonsensical speech (a comprehension deficit)."},
    {"a": "暗示的知識", "aEn": "Implicit knowledge", "b": "明示的知識", "bEn": "Explicit knowledge", "note": "暗示的知識は、使えても説明できない直観的な言語知識。明示的知識は規則として言葉で説明できる知識で、使用時には時間と注意を要しやすい。", "noteEn": "Implicit knowledge is intuitive knowledge of a language that one can use but not explain. Explicit knowledge can be stated as rules, and using it tends to require time and attention."},
    {"a": "N400", "aEn": "N400", "b": "P600", "bEn": "P600", "note": "N400は意味的に予測しにくい語で大きくなるとされる脳波成分。P600は統語的な違反や再解析に伴って現れるとされ、刺激の後600ms前後に出る正の成分である。", "noteEn": "The N400 is an ERP component said to grow for semantically unexpected words. The P600 is a positive component peaking around 600 ms that is said to accompany syntactic violations and reanalysis."},
    {"a": "習得", "aEn": "Acquisition", "b": "学習", "bEn": "Learning", "note": "クラッシェンの区別では、習得は意味のあるやり取りから無意識に身につく過程、学習は規則を意識して覚える過程。この二分法には批判もある。", "noteEn": "In Krashen's distinction, acquisition is the subconscious process of picking up a language through meaningful interaction, and learning is the conscious study of rules. The dichotomy has been criticized."},
    {"a": "過剰般化", "aEn": "Overgeneralization", "b": "母語転移", "bEn": "L1 transfer", "note": "どちらも学習者の誤りを生むが、原因が異なる。過剰般化は目標言語の規則の使いすぎ、母語転移は母語の規則や語順を持ち込むことで起こる。", "noteEn": "Both produce learner errors, but from different sources. Overgeneralization stems from overextending a rule of the target language, and L1 transfer from importing rules or word order from the native language."},
    {"a": "ボトムアップ処理", "aEn": "Bottom-up processing", "b": "トップダウン処理", "bEn": "Top-down processing", "note": "ボトムアップ処理は音や文字といった入力の情報から積み上げて理解する流れ。トップダウン処理は文脈や知識に基づく予測が理解を導く流れである。", "noteEn": "Bottom-up processing builds understanding upward from input such as sounds and letters. Top-down processing lets context and knowledge-based predictions guide understanding."},
    {"a": "失語症", "aEn": "aphasia", "b": "構音障害", "bEn": "dysarthria", "note": "失語症は脳の損傷による言語そのものの障害で、話す・理解する・読み書きに及ぶ。構音障害は発声や発音の筋の働きの障害で、言語の知識は保たれる。", "noteEn": "Aphasia is a language impairment caused by brain damage and can affect speaking, comprehension and literacy. Dysarthria is a disorder of the muscles of voice and articulation, with language knowledge intact."},
    {"a": "インプット", "aEn": "input", "b": "インテイク", "bEn": "intake", "note": "インプットは学習者が触れる言語データの全体を指す。インテイクはそのうち実際に取り込まれ、中間言語の形成に使われた部分を指す。", "noteEn": "Input is all the language data a learner is exposed to. Intake is the part actually taken in and used to build the interlanguage."},
    {"a": "ガーデンパス文", "aEn": "garden path sentence", "b": "中央埋め込み文", "bEn": "center-embedded sentence", "note": "ガーデンパス文は一時的な曖昧さのため途中で誤った解釈をして読み直しが要る文。中央埋め込み文は文の中に文が入れ子になり、記憶の負荷で理解しにくい文。", "noteEn": "A garden path sentence is temporarily ambiguous, so a wrong reading must be redone. A center-embedded sentence nests clauses inside one another and is hard to understand because of memory load."},
    {"a": "対照分析", "aEn": "contrastive analysis", "b": "誤用分析", "bEn": "error analysis", "note": "対照分析は母語と目標言語を比べて学習の困難を予測する。誤用分析は学習者が実際に出した誤りを集め、その原因を後から調べる。", "noteEn": "Contrastive analysis compares the native and target languages to predict difficulty. Error analysis collects the errors learners actually make and investigates their causes afterward."},
  ],
  applied: [
    {"a": "翻訳", "aEn": "Translation", "b": "通訳", "bEn": "Interpretation", "note": "翻訳は書かれたテキストを対象とし推敲の時間があるのに対し、通訳は話し言葉をリアルタイムで扱う。", "noteEn": "Translation deals with written text and allows time for revision, while interpretation deals with spoken language in real time."},
    {"a": "妥当性", "aEn": "Validity", "b": "信頼性", "bEn": "Reliability", "note": "妥当性はテストが測ろうとするものを正しく測れているかを、信頼性は測定結果がどれだけ一貫しているかを示す。信頼性が高くても妥当性が低いことはあるが、信頼性が低いテストは妥当であり得ない。", "noteEn": "Validity indicates whether a test measures what it intends to, while reliability indicates how consistent the measurement is. A test can be reliable but not valid, but an unreliable test cannot be valid: reliability is necessary but not sufficient."},
    {"a": "熟達度テスト", "aEn": "Proficiency Test", "b": "到達度テスト", "bEn": "Achievement Test", "note": "熟達度テストは特定の教育課程によらない一般的な言語能力を測り、到達度テストは特定のコース内容の学習到達度を測る。", "noteEn": "A proficiency test measures general language ability independent of any specific curriculum, while an achievement test measures mastery of a specific course's content."},
    {"a": "直訳", "aEn": "Literal translation", "b": "意訳", "bEn": "Free translation", "note": "直訳は原文の語順や表現に沿って訳し、意訳は原文の意味や効果を優先して表現を作り替える。どちらが適切かは、テキストの種類と翻訳の目的で決まる。", "noteEn": "A literal translation follows the wording and word order of the source, while a free translation recasts expressions to preserve meaning or effect. Which is appropriate depends on the text type and the purpose of the translation."},
    {"a": "逐次通訳", "aEn": "Consecutive interpreting", "b": "同時通訳", "bEn": "Simultaneous interpreting", "note": "逐次通訳は話者が区切った後にまとめて訳し、同時通訳は発言を聞きながらほぼ同時に訳す。前者はメモ取りが、後者は聞くことと話すことの並行処理が鍵になる。", "noteEn": "Consecutive interpreting renders a passage after the speaker pauses, while simultaneous interpreting renders speech as it is heard. Note-taking is key to the former, and handling listening and speaking in parallel is key to the latter."},
    {"a": "基準準拠テスト", "aEn": "Criterion-referenced test", "b": "集団準拠テスト", "bEn": "Norm-referenced test", "note": "基準準拠テストは決められた能力基準に達したかを判定し、集団準拠テストは受験者集団の中での相対的な位置を示す。得点の解釈の仕方が異なる。", "noteEn": "A criterion-referenced test judges whether a set standard of ability has been met, while a norm-referenced test shows a candidate's relative position within a group. The two differ in how scores are interpreted."},
    {"a": "記述的辞書", "aEn": "Descriptive dictionary", "b": "規範的辞書", "bEn": "Prescriptive dictionary", "note": "記述的辞書は実際に使われている語や用法をありのままに記録し、規範的辞書は望ましい正しい用法を示す。現代の多くの辞書は記述を基本としている。", "noteEn": "A descriptive dictionary records words and usages as they are actually used, while a prescriptive dictionary indicates the preferred correct usage. Many modern dictionaries take description as their basis."},
    {"a": "著者推定", "aEn": "Authorship attribution", "b": "話者鑑定", "bEn": "Forensic speaker comparison", "note": "著者推定は文字で書かれたテキストの語彙や文体の特徴から書き手を、話者鑑定は録音された音声の特徴から話者を検討する。対象が文章か音声かが異なる。", "noteEn": "Authorship attribution examines the writer of a written text from features of vocabulary and style, while speaker comparison examines the speaker of a recording from features of the voice. They differ in whether the material is text or speech."},
    {"a": "翻訳メモリ", "aEn": "Translation memory", "b": "機械翻訳", "bEn": "Machine translation", "note": "翻訳メモリは過去の原文と訳文を対にして保存し、一致する箇所を呼び出す。機械翻訳は訳文そのものを自動で生成する。前者は人が訳した資産の再利用にあたる。", "noteEn": "A translation memory stores past source-target pairs and recalls matching segments, while machine translation generates the target text itself. The former reuses human translations."},
    {"a": "形成的評価", "aEn": "Formative assessment", "b": "総括的評価", "bEn": "Summative assessment", "note": "形成的評価は指導の途中で学習の様子を確かめ、授業を改善するために行う。総括的評価は学習の終わりに到達度を判定し、成績や資格を決めるために行う。", "noteEn": "Formative assessment checks learning during instruction in order to improve teaching, while summative assessment judges attainment at the end to decide grades or qualifications."},
    {"a": "形成的評価", "aEn": "Formative assessment", "b": "総括的評価", "bEn": "Summative assessment", "note": "形成的評価は学習の途中で理解を確かめて指導を調整するために行い、総括的評価は学期末などに到達度を判定して成績や合否を決める。", "noteEn": "Formative assessment checks understanding during learning to adjust teaching, while summative assessment judges attainment at the end of a term to decide grades or pass/fail."},
    {"a": "著者推定", "aEn": "Authorship attribution", "b": "剽窃検出", "bEn": "Plagiarism detection", "note": "著者推定は文体の特徴から文章の書き手が誰かを推し量るのに対し、剽窃検出は文章が既存の文章とどれだけ重なるかを調べて無断の流用を見つける。", "noteEn": "Authorship attribution infers who wrote a text from stylistic features, while plagiarism detection checks how far a text overlaps existing texts to find unattributed copying."},
  ],
  interdisciplinary: [
    {"a": "生成文法", "aEn": "Generative Grammar", "b": "認知言語学", "bEn": "Cognitive Linguistics", "note": "生成文法は言語能力を他の認知能力から独立した自律的モジュールとみなすのに対し、認知言語学は言語能力を一般認知能力の一部とみなす。", "noteEn": "Generative grammar treats linguistic competence as an autonomous module independent of other cognitive abilities, while cognitive linguistics treats it as part of general cognition."},
    {"a": "談話分析", "aEn": "Discourse Analysis", "b": "会話分析", "bEn": "Conversation Analysis", "note": "談話分析は書き言葉・話し言葉を問わずテクスト全体のパターンを広く扱うのに対し、会話分析は自然な会話データの相互行為的構造(ターンテイキング等)を詳細に分析する。", "noteEn": "Discourse analysis broadly examines patterns across written and spoken texts, while conversation analysis closely examines the interactional structure (turn-taking, etc.) of naturally occurring conversation."},
    {"a": "統合関係", "aEn": "Syntagmatic Relation", "b": "範列関係", "bEn": "Paradigmatic Relation", "note": "統合関係は文中での語の組み合わせ関係を、範列関係はある位置で置き換え可能な語同士の関係を指す。", "noteEn": "A syntagmatic relation is the combinatory relation among words in a sequence, while a paradigmatic relation is the relation among words that could substitute for one another at a given position."},
    {"a": "意義", "aEn": "Sense", "b": "指示対象", "bEn": "Reference", "note": "意義は語の捉え方や意味の側面、指示対象は語が実際に指す対象を指す。「宵の明星」と「明けの明星」は指示対象が同じでも意義が異なる。", "noteEn": "Sense is the mode of presentation of a term, while reference is the object it actually picks out. 'Evening star' and 'morning star' share a referent but differ in sense."},
    {"a": "言語能力", "aEn": "Competence", "b": "言語運用", "bEn": "Performance", "note": "言語能力は話者が内在的に持つ文法知識、言語運用は実際の発話での使用を指す。言い間違いや中断は運用の問題で、能力の欠陥とは限らない。", "noteEn": "Competence is a speaker's internalized grammatical knowledge; performance is its actual use. Slips and false starts are matters of performance, not necessarily gaps in competence."},
    {"a": "結束性", "aEn": "Cohesion", "b": "一貫性", "bEn": "Coherence", "note": "結束性は指示語や接続語などテクストの表面にある文法的・語彙的なつながり、一貫性は読み手が内容を意味的にまとまったものと理解できることを指す。", "noteEn": "Cohesion is the grammatical and lexical linking visible on the surface of a text; coherence is a reader's understanding of the content as meaningfully unified."},
    {"a": "類像", "aEn": "Icon", "b": "指標", "bEn": "Index", "note": "類像は似ていることに基づく記号(肖像画、擬音語)、指標は因果や隣接に基づく記号(煙と火、足跡、指さし)である。パースの記号分類による。", "noteEn": "An icon works by resemblance (a portrait, onomatopoeia); an index works by causal or contiguous connection (smoke and fire, footprints, pointing). Both are in Peirce's classification of signs."},
    {"a": "メタファー", "aEn": "Metaphor", "b": "メトニミー", "bEn": "Metonymy", "note": "メタファーは類似に基づき別の領域の概念で理解する写像、メトニミーは「やかんが沸く」のように同じ領域内の隣接関係で別のものを指す表現である。", "noteEn": "Metaphor maps one domain onto another on the basis of similarity; metonymy refers to one thing through a contiguous relation within a single domain, as in 'the kettle is boiling'."},
    {"a": "文法的比喩", "aEn": "Grammatical metaphor", "b": "概念メタファー", "bEn": "Conceptual metaphor", "note": "文法的比喩は同じ意味を別の文法形式に言い換える現象で、動詞を名詞にする名詞化が例。概念メタファーは抽象的な領域を具体的な領域の写像で理解する認知の仕組み。", "noteEn": "Grammatical metaphor rewrites one meaning in another grammatical form, as in nominalizing a verb. Conceptual metaphor is a cognitive mechanism for understanding an abstract domain through a mapping from a concrete one."},
    {"a": "テーマ", "aEn": "Theme", "b": "主語", "bEn": "Subject", "note": "テーマは節の出発点という情報の組み立ての役割、主語は述語との関係で決まる文法上の役割。Yesterday it rained では Yesterday がテーマで it が主語になる。", "noteEn": "Theme is the starting point of a clause in how information is organized, while Subject is a grammatical role set by its relation to the predicate. In 'Yesterday it rained', Yesterday is the Theme and it is the Subject."},
    {"a": "外示", "aEn": "Denotation", "b": "共示", "bEn": "Connotation", "note": "外示は記号の字義どおりの第一次の意味、共示はそこに文化や感情が加わった二次の意味を指す。同じ記号でも共示は集団や時代で変わる。", "noteEn": "Denotation is a sign's literal first-order meaning; connotation is the second-order meaning added by culture and feeling, and it varies by group and era even for the same sign."},
    {"a": "逸脱", "aEn": "Deviation", "b": "前景化", "bEn": "Foregrounding", "note": "逸脱は言語の規範から外れた使い方そのもの、前景化は逸脱や過剰な反復で表現が際立つ効果を指す。逸脱は前景化を生む手段の一つ。", "noteEn": "Deviation is the use of language that departs from a norm; foregrounding is the effect of prominence produced by deviation or heavy repetition, so deviation is one means to it."},
  ],
};

/* 言語(ja/en)・ダークモードを下位コンポーネントへ配るコンテキスト */
const TRIVIA_DATA = {
  "theoretical:phonetics": { trivia: "IPAが定める子音は100以上あるが、どの言語も実際に使うのはそのごく一部だけ。", triviaEn: "Over 100 consonants are catalogued in the IPA, yet any single language typically uses only a small fraction.", realWorld: "音声認識AIの音響モデルの設計、語学アプリの発音フィードバック、言語聴覚士による構音障害の評価と訓練に応用されている。音の物理的な性質を測る知識が土台になる。放送局のアナウンサーや俳優の発声指導にも使われる。", realWorldEn: "Phonetics supports the acoustic models of speech-recognition systems, pronunciation feedback in language-learning apps, and the assessment and training of articulation disorders by speech-language pathologists. It is also used in voice coaching for announcers and actors." },
  "theoretical:phonology": { trivia: "英語話者は無意識に[p]と有気音[pʰ]を使い分けているが、英語では同じ音素として扱われるため区別に気づかない。", triviaEn: "English speakers unconsciously alternate between [p] and aspirated [pʰ], yet English treats them as the same phoneme, so most never notice.", realWorld: "音声合成エンジンが語や文脈に応じて自然な発音とアクセントを作る規則の設計、外国語学習者の発音指導、文字を持たない言語の表記法づくりに活用されている。歌詞や詩の韻の分析、言語の違いによる聞き取りの難しさの説明にも役立つ。", realWorldEn: "Phonology guides the rules that let speech-synthesis engines produce natural pronunciation and accent, shapes pronunciation teaching for foreign-language learners, and helps design writing systems for languages without one. It also helps analyze rhyme in lyrics and poetry and explain why some sounds are hard to hear in another language." },
  "theoretical:morphology": { trivia: "トルコ語は1語に多数の接辞が付き、1単語が英語の文1つ分の意味を表すことがある。", triviaEn: "In Turkish, a single word can carry so many suffixes that it conveys the meaning of an entire English sentence.", realWorld: "日本語入力のかな漢字変換、検索エンジンの語形の正規化、辞書にない語を分解して処理する機械翻訳の前処理に使われている。語の内部構造の分析が基盤になる。辞書編集や、造語の多い専門用語の整理にも役立つ。", realWorldEn: "Morphological analysis drives kana-to-kanji conversion in Japanese input methods, word-form normalization in search engines, and the preprocessing step in machine translation that splits unknown words into parts. It also helps in dictionary editing and in organizing technical terms rich in coined words." },
  "theoretical:syntax": { trivia: "統語論の基本道具である「木構造」は、プログラミング言語の構文解析(パーサー)にも同じ発想が使われている。", triviaEn: "The syntax tree, syntax's core analytical tool, uses the same basic idea as parse trees in programming-language analysis.", realWorld: "文法チェッカーの誤り検出、機械翻訳での語順の入れ替え、プログラミング言語のコンパイラが行う構文解析に応用されている。句の構造を扱う考え方が共通して使われる。曖昧な文を見つけて書き直す、文章校正の支援にも使われる。", realWorldEn: "Syntactic theory is applied in the error detection of grammar checkers, in word-order reordering for machine translation, and in the parsing stage of programming-language compilers, which all rely on analyzing phrase structure. It also supports proofreading by flagging ambiguous sentences for rewriting." },
  "theoretical:semantics": { trivia: "「bank」という語は「銀行」と「土手」という無関係な意味を持つ同綴異義語の定番例。", triviaEn: "The word 'bank' is a classic example of homonymy, having two unrelated senses.", realWorld: "検索エンジンが語の意味と問い合わせの意図を結びつける処理、チャットボットの応答生成、契約書や法令の文言の意味を厳密に確かめる作業に応用されている。辞書の語義の区分や、データベースの項目名の統一にも使われる。", realWorldEn: "Semantics underlies how search engines link word meaning to the intent of a query, how chatbots generate fitting replies, and how the wording of contracts and statutes is checked for precise meaning. It is also used to divide word senses in dictionaries and to unify field names in databases." },
  "theoretical:pragmatics": { trivia: "「塩取れる?」への返答は塩を渡すことであり、「はい」とだけ言うのは会話的含意に反すると受け取られる。", triviaEn: "If asked 'Can you pass the salt?', just saying 'yes' without passing it violates the expected implicature.", realWorld: "コールセンターの応対マニュアルの設計、異文化間のビジネス交渉の研修、AIアシスタントが婉曲な依頼や皮肉を読み取る仕組みの開発に活用されている。丁寧さや依頼の仕方の違いを扱うため、接客や医療の場面の言葉選びにも使われる。", realWorldEn: "Pragmatics informs the design of call-center response scripts, training for cross-cultural business negotiation, and the development of AI assistants that interpret indirect requests and irony. Because it deals with politeness and ways of making requests, it also informs wording in customer service and medical settings." },
  "historical:historical-ling": { trivia: "英語「knight」のkは昔は実際に発音されていたが、音韻変化で発音されなくなった名残り。", triviaEn: "The silent 'k' in 'knight' was once actually pronounced -- a fossil left by historical sound change.", realWorld: "語源辞典の編纂、消滅の危機にある言語の記録と復興、古文書や碑文の解読における語形の年代判定に活用されている。言語の変化の規則性が手がかりになる。古い文章の読解を助ける注釈書づくりにも使われる。", realWorldEn: "Historical linguistics is used to compile etymological dictionaries, to document and revitalize endangered languages, and to date word forms when deciphering old manuscripts and inscriptions, using the regularity of language change as a guide. It also helps produce annotated editions that make older texts readable." },
  "historical:comparative-ling": { trivia: "英語father・独語Vater・羅語paterは同じ印欧祖語の単語に由来する同根語。", triviaEn: "English 'father,' German 'Vater,' and Latin 'pater' are cognates from the same Proto-Indo-European word.", realWorld: "祖語の再構築、言語系統の分類、遺伝学や考古学と組み合わせた人類の移動史の研究に応用される。印欧語族の研究はその代表例である。語彙の借用関係の調査や、文字を持たない言語の系統の位置づけにも使われる。", realWorldEn: "Comparative linguistics is applied to reconstructing proto-languages, classifying language families, and studying human migration history together with genetics and archaeology. Research on the Indo-European family is a classic example. It is also used to investigate loanword relationships between languages and to place languages without writing in a family tree." },
  "historical:typology": { trivia: "世界の言語の約45%はSOV語順(日本語と同じ)で、実はSVO語順より多いとされる。", triviaEn: "About 45% of the world's languages use SOV word order, actually more common than SVO.", realWorld: "機械翻訳で語順が大きく異なる言語の組を扱う設計、少数言語の文法記述の調査票づくり、多言語の自然言語処理モデルの評価に活用されている。言語の分類や、世界の言語の特徴を示す地図の作成にも使われる。", realWorldEn: "Typology helps machine translation handle language pairs with very different word orders, shapes the questionnaires used to describe the grammar of minority languages, and supports the evaluation of multilingual language-processing models. It also supports language classification and the making of maps showing features of the world's languages." },
  "social:sociolinguistics": { trivia: "同じ人物でも上司と話す時と友人と話す時で無意識に語彙や口調を切り替えるスタイル切り替えは誰もが行う現象。", triviaEn: "Style-shifting -- changing vocabulary and tone with a boss versus a friend -- is something everyone does.", realWorld: "企業のブランドボイスの設計、自治体の多言語・やさしい日本語による情報提供の方針づくり、言語政策や少数言語の保護施策の立案に活用されている。世代や職業による言葉づかいの違いの調査は、マーケティングや接客の言葉の設計にも使われる。", realWorldEn: "Sociolinguistics is used to design corporate brand voice, to plan municipal information services in multiple languages or plain language, and to draft language policy and measures that protect minority languages. Surveys of speech differences by generation and occupation are also used in designing marketing and service language." },
  "social:anthro-ling": { trivia: "イヌイット語に雪の語が多いとよく言われるが誇張であり、実際は他言語と大差ないという指摘もある。", triviaEn: "The claim that Inuit languages have dozens of words for snow is often exaggerated.", realWorld: "先住民コミュニティと協働する言語・文化の継承事業、民族誌的なフィールド調査、医療や福祉の現場での文化に配慮したコミュニケーションの改善に活用されている。言葉と社会の関わりを記録する博物館や教育の展示づくりにも使われる。", realWorldEn: "Linguistic anthropology supports collaborative language and culture revitalization with Indigenous communities, ethnographic fieldwork, and culturally sensitive communication in healthcare and social-welfare settings. It also feeds museum and educational exhibits that record how language and society are connected." },
  "social:dialectology": { trivia: "「かたつむり」の呼び方は地域で「でんでんむし」「まいまい」等大きく異なり、方言周圏論の代表例。", triviaEn: "The Japanese word for 'snail' varies dramatically by region, a textbook example of dialect wave theory.", realWorld: "音声認識AIの地域アクセントへの対応、自治体の方言継承や観光PRの事業、方言の分布を示す言語地図の作成に活用されている。災害時の避難の呼びかけで方言がもたらす誤解の対策にも役立つ。", realWorldEn: "Dialectology helps speech-recognition systems cope with regional accents, supports local dialect-preservation and tourism-promotion projects, and underlies the linguistic atlases that map how dialects are distributed. It also helps address misunderstandings caused by dialect words in evacuation calls during disasters." },
  "psycho:psycholinguistics": { trivia: "「馬が納屋を通り過ぎて走らされた」のようなガーデンパス文は、読み手が途中で解釈をやり直す実験によく使われる。", triviaEn: "Garden-path sentences force readers to mentally reparse mid-sentence, a classic experimental tool.", realWorld: "アプリやウェブのUI文言の読みやすさの検証、失語症患者向けのリハビリ教材の開発、読み書きの困難を持つ子どもへの支援方法の設計に活用されている。文を読むときの視線の動きの測定は、ウェブ広告や案内表示の改善にも使われる。", realWorldEn: "Psycholinguistics informs readability testing of UI copy in apps and websites, the development of rehabilitation materials for people with aphasia, and support methods for children with reading and writing difficulties. Measuring eye movements during reading is also used to improve web advertising and signage." },
  "psycho:neurolinguistics": { trivia: "ブローカ野損傷は理解できても話しにくくなり、ウェルニッケ野損傷は流暢に話せても意味が通じなくなる対照的な症状。", triviaEn: "Broca's-area damage impairs speech while comprehension remains; Wernicke's-area damage allows fluent but nonsensical speech.", realWorld: "脳卒中後の失語症のリハビリ計画、手術前の言語機能の位置を調べる脳機能検査、脳活動から意思を読み取るBCI(ブレイン・コンピュータ・インターフェース)の研究に応用されている。認知症の早期発見に向けた言語課題の開発にも関わる。", realWorldEn: "Neurolinguistics is applied to planning aphasia rehabilitation after stroke, to brain-function testing that locates language areas before surgery, and to research on brain-computer interfaces that read intentions from brain activity. It also contributes to language tasks developed for the early detection of dementia." },
  "psycho:l1-acquisition": { trivia: "子どもは「goed」のように規則活用を不規則動詞に当てはめる時期を経て、正しい不規則形に戻っていく。", triviaEn: "Children overgeneralize regular patterns to irregular verbs (saying 'goed'), then later self-correct.", realWorld: "乳幼児健診での言語発達の評価、言語発達の遅れへの早期支援、年齢に合わせた絵本や知育アプリの語彙・文の設計に活用されている。子どもが話す言葉を集めた記録は、音声認識の子ども向け対応にも使われる。", realWorldEn: "First-language acquisition research is used to evaluate language development at infant checkups, to give early support for language delay, and to match the vocabulary and sentences of picture books and educational apps to a child's age. Recordings of children's speech are also used to adapt speech recognition to child voices." },
  "psycho:l2-acquisition": { trivia: "学習者は母語の影響を受けた「中間言語」という独自の体系を作り、単なる誤りの寄せ集めではないとされる。", triviaEn: "Learners build a systematic 'interlanguage' shaped by their native language -- not just random errors.", realWorld: "語学アプリのレベル別カリキュラム、学校の外国語教育の指導法、海外赴任者向けの語学研修、日本語教育での学習者の誤用分析に活用されている。学習者の誤りの傾向の研究は、試験問題や添削ツールの改善にも使われる。", realWorldEn: "Second-language acquisition research shapes the level-based curricula of language apps, teaching methods in school foreign-language education, language training for overseas assignees, and error analysis in teaching Japanese to learners. Research on learner error patterns is also used to improve test items and automated feedback tools." },
  "computational:corpus": { trivia: "英国国民コーパス(BNC)は1億語規模だが、現代の大規模言語モデルは数兆語規模で学習され、その差は1万倍以上。", triviaEn: "The BNC has about 100 million words, while modern LLMs train on trillions -- over 10,000x more.", realWorld: "辞書の用例収集と語義の記述、教科書や試験の語彙選定、機械学習モデルの学習データ作成、文体や頻度に基づく著者や類似文の判定に使われている。言語教育では、実際の使用頻度に基づく学習語彙リストの作成に使われる。", realWorldEn: "Corpora are used to collect example sentences and describe senses for dictionaries, to select vocabulary for textbooks and tests, to build training data for machine-learning models, and to judge authorship or similar texts from style and frequency. In language education, it is used to build learning word lists based on actual frequency of use." },
  "computational:nlp": { trivia: "「時蝿は矢を好む」のような文は複数の統語解釈が可能な曖昧文として、NLPの構文解析の難しさを説明する定番例。", triviaEn: "Sentences like 'Time flies like an arrow' are classic examples of why parsing is hard for NLP.", realWorld: "検索エンジン、スマートスピーカー、迷惑メールのフィルタ、SNSの投稿の感情分析、顧客の問い合わせの自動振り分けなど、日常の多くのサービスに組み込まれている。新聞記事の自動分類や、医療記録からの情報抽出といった専門分野でも使われる。", realWorldEn: "Natural language processing is built into many everyday services, such as search engines, smart speakers, spam filters, sentiment analysis of social media posts, and automatic routing of customer inquiries. It is also used in specialized work such as automatic classification of news articles and information extraction from medical records." },
  "computational:speech-processing": { trivia: "スマートスピーカーの音声認識は雑音・訛り・話速など無数の変動要因を扱う必要があり、実環境では精度が大きく変わる。", triviaEn: "Smart-speaker recognition must handle noise, accent, and rate -- accuracy differs greatly from lab conditions.", realWorld: "音声アシスタント、会議や講演の自動文字起こし、動画の自動字幕、声紋による本人確認、コールセンターの通話内容の分析に応用されている。耳の不自由な人への字幕支援や、声を失った人の合成音声にも使われる。", realWorldEn: "Speech processing is applied in voice assistants, automatic transcription of meetings and lectures, automatic video captions, voiceprint-based identity verification, and analysis of call-center conversations. It also supports captioning for deaf and hard-of-hearing people and synthetic voices for people who have lost their voice." },
  "computational:mt": { trivia: "初期の機械翻訳が「精神は強いが肉体は弱い」を「ウォッカは強いが肉は腐っている」と誤訳したという有名な逸話がある。", triviaEn: "A famous (semi-legendary) anecdote claims early MT mistranslated an idiom into something about vodka and rotten meat.", realWorld: "多言語のカスタマーサポート、旅行者向けのリアルタイム翻訳アプリ、特許や技術文書の下訳、翻訳者が修正して仕上げる後編集の作業に実装されている。近年は、ニューラルネットワークを用いた方式が主流になっている。", realWorldEn: "Machine translation is deployed in multilingual customer support, real-time translation apps for travelers, first-draft translation of patents and technical documents, and post-editing workflows in which human translators refine the output. In recent years, systems based on neural networks have become the mainstream approach." },
  "computational:ir": { trivia: "検索エンジンのランキングは数百の要因を考慮しているとされ、単純な語の一致だけでなくページの信頼性も評価する。", triviaEn: "Search ranking reportedly weighs hundreds of factors beyond simple keyword matching, including page credibility.", realWorld: "ウェブ検索に加え、社内文書の検索、法律事務所の判例検索、医学論文の検索、ECサイトの商品検索とレコメンドの基盤として使われている。検索の精度は、語の言い換えや関連語の扱いなど言語の知識に支えられている。", realWorldEn: "Information retrieval powers web search as well as enterprise document search, case-law research at law firms, medical literature search, and product search and recommendation on e-commerce sites. Search accuracy rests on linguistic knowledge such as handling paraphrases and related words." },
  "computational:llm": { trivia: "大規模言語モデルはパラメータ数が数千億に達するものもあり、学習には家庭数千軒分の電力に相当する資源が使われることがある。", triviaEn: "Some LLMs have hundreds of billions of parameters; training can use as much power as thousands of households.", realWorld: "プログラミングの補助、カスタマーサポートの自動応答、長い文書の要約、文章の下書きや校正、社内の資料検索の対話化など、業務の効率化に導入されている。翻訳や多言語の問い合わせ対応にも使われ、教育や研究の現場でも利用が広がっている。", realWorldEn: "Large language models are adopted to boost productivity through coding assistance, automated customer-support replies, summarization of long documents, drafting and proofreading, and conversational search over internal materials. They are also used for translation and multilingual inquiry handling, and their use is spreading in education and research." },
  "computational:knowledge-rep:ontology": { trivia: "医療分野のオントロジーSNOMED CTには35万以上の医学概念が定義され、電子カルテの標準用語として世界中で使われる。", triviaEn: "The medical ontology SNOMED CT defines over 350,000 concepts, used worldwide in electronic health records.", realWorld: "電子カルテの用語の標準化、製造業の部品や設計情報の管理、企業内の知識ベースの構築、異なるデータベース間で用語を対応づける作業に活用されている。言語学では、語彙を概念の関係で整理した語彙資源の設計にも使われる。", realWorldEn: "Ontologies are used to standardize terms in electronic health records, to manage parts and design information in manufacturing, to build enterprise knowledge bases, and to map terms across different databases. In linguistics, they also guide the design of lexical resources that organize vocabulary by conceptual relations." },
  "computational:knowledge-rep:knowledge-graph": { trivia: "Googleの検索結果の「ナレッジパネル」は同社の知識グラフを基に自動生成されている。", triviaEn: "Google's knowledge-panel summary cards are auto-generated from its knowledge graph.", realWorld: "検索結果に出る人物や組織の要約欄、ECサイトのレコメンド、医薬品の相互作用や遺伝子の関係を扱うデータベース、質問応答システムの裏付けに使われている。文章から人物や出来事の関係を取り出して蓄える情報抽出の成果を活用する。", realWorldEn: "Knowledge graphs power the summary panels about people and organizations in search results, recommendations on e-commerce sites, databases of drug interactions and gene relations, and the fact lookup behind question-answering systems. They make use of information extraction that pulls relations among people and events out of text and stores them." },
  "computational:knowledge-rep:rdf": { trivia: "RDFのトリプルは文の「主語-述語-目的語」構造を模しており、言語学の文法構造から着想を得ている。", triviaEn: "The RDF triple mirrors sentence subject-predicate-object structure, directly inspired by grammar.", realWorld: "図書館の蔵書目録を機関の間でつなぐ仕組み、政府や自治体のオープンデータの公開、博物館や文化財のデータの相互利用に使われている。主語・述語・目的語の三つ組でデータを表すため、異なる形式の情報も同じ形でつなげられる。", realWorldEn: "RDF is used to link library catalogs across institutions, to publish open data from governments and municipalities, and to share records of museums and cultural heritage collections. Because data is expressed as subject-predicate-object triples, information in different formats can be connected in one form." },
  "computational:knowledge-rep:owl": { trivia: "OWL(Web Ontology Language)は、あえて綴りをフクロウ(owl)と読めるようにして覚えやすくしたという逸話がある。", triviaEn: "OWL was deliberately spelled to read as the bird's name, making the acronym memorable.", realWorld: "製薬企業の化合物や疾患の分類、生物学の遺伝子機能の標準的な語彙、規制文書や設計仕様の整合性チェックなど、概念の関係を厳密に定義する場面で使われている。検索や質問応答の精度を上げる背景知識としても使われる。", realWorldEn: "OWL is used where relations between concepts must be defined strictly, such as classification of compounds and diseases in pharmaceutical work, standard vocabularies for gene function in biology, and consistency checks of regulatory documents and design specifications. It also serves as background knowledge that improves the accuracy of search and question answering." },
  "computational:knowledge-rep:semantic-web": { trivia: "セマンティックWebはWeb発明者ティム・バーナーズ=リー自身が2001年の論文で提唱した「次のWeb」の構想。", triviaEn: "The Semantic Web vision was proposed by Web inventor Tim Berners-Lee in a 2001 paper.", realWorld: "レシピサイトや商品ページの構造化データによる検索結果の強調表示、図書館や行政のデータ連携、サイト間で情報を機械的に統合する仕組みに使われている。機械が語の意味を手がかりに情報を探せるようにする点が、通常の文書の公開との違いである。", realWorldEn: "The Semantic Web is behind structured data that lets recipe sites and product pages appear with rich results in search, data exchange among libraries and public agencies, and the machine-driven merging of information across sites. What sets it apart from ordinary web publishing is that machines can use word meaning as a clue to find information." },
  "computational:knowledge-rep:reasoning": { trivia: "推論エンジンは数百万ルールの知識ベースからでも、人間なら何日もかかる論理的帰結をミリ秒単位で導出できる。", triviaEn: "A reasoning engine can derive conclusions from millions of rules in milliseconds -- days of human work.", realWorld: "保険の契約条件の自動チェック、法律文書の矛盾検出、診断支援システムでの判断の根拠づけ、設計仕様が満たされているかの検証に応用されている。既知の事実から新しい結論を導く仕組みで、専門家の判断を補助する。", realWorldEn: "Automated reasoning is applied to automatic checking of insurance contract conditions, detection of contradictions in legal documents, justification of decisions in diagnosis-support systems, and verification that design specifications are met. By deriving new conclusions from known facts, it assists expert judgment." },
  "applied:language-education": { trivia: "CEFRのC2レベルはネイティブ並みとされるが、実際には多くのネイティブ話者もC2水準の学術文章に苦労する。", triviaEn: "CEFR's C2 is described as near-native, yet many native speakers struggle to write at that academic level.", realWorld: "学校の外国語教育課程、語学学校の教材と指導法、企業の語学研修、日本語教師の養成と留学生向けの日本語教育に活用されている。学習者の誤りの分析や評価の方法も、授業改善や教材開発に生かされる。", realWorldEn: "Language education research shapes school foreign-language curricula, the materials and teaching methods of language schools, corporate language training, and the training of Japanese-language teachers and Japanese courses for international students. Analysis of learner errors and assessment methods also feeds into improving lessons and developing materials." },
  "applied:translation": { trivia: "聖書は現在2000以上の言語に翻訳されており、世界で最も多くの言語に翻訳された書物とされる。", triviaEn: "The Bible has been translated into more than 2,000 languages, the most-translated book in the world.", realWorld: "特許や契約書の翻訳、ゲームや映画のローカリゼーション、字幕翻訳、翻訳会社の品質管理、機械翻訳を使った翻訳作業の設計に活用されている。翻訳の質を測る基準づくりや、翻訳者の養成課程の設計にも関わる。", realWorldEn: "Translation studies is used in the translation of patents and contracts, localization of games and films, subtitling, quality control at translation agencies, and the design of workflows that incorporate machine translation. It also contributes to standards for measuring translation quality and to the design of translator training programs." },
  "applied:interpretation": { trivia: "同時通訳者の認知的負荷は非常に高く、国際会議では疲労防止のため通常15〜30分交代で担当する。", triviaEn: "Simultaneous interpreting is so cognitively demanding that interpreters typically rotate every 15-30 minutes.", realWorld: "国際会議の同時通訳者の養成、病院や裁判所で働く医療通訳者や法廷通訳者の育成と認定、災害時の多言語支援に活用されている。通訳の記憶や注意の使い方の研究は、訓練法の改善に生かされている。", realWorldEn: "Interpreting studies supports the training of simultaneous interpreters for international conferences, the education and certification of medical and court interpreters, and multilingual assistance during disasters. Research on how interpreters use memory and attention is used to improve training methods." },
  "applied:lexicography": { trivia: "オックスフォード英語辞典(OED)の初版完成には約70年かかり、その間に編纂方針も大きく変化した。", triviaEn: "Completing the first OED edition took about 70 years, during which editorial policy changed substantially.", realWorld: "紙と電子の辞書の語義の配列と用例の選定、学習者向け辞書の語彙の制限、機械翻訳や文章校正ツールの訳語・用語データベースの構築に活用されている。コーパスから語の使われ方を調べる手法は、現代の辞書編集の標準になっている。", realWorldEn: "Lexicography guides how senses and examples are arranged in print and electronic dictionaries, how vocabulary is restricted in learner dictionaries, and how term databases are built for machine translation and proofreading tools. Examining word usage in corpora has become standard practice in modern dictionary editing." },
  "applied:language-testing": { trivia: "TOEFLやIELTSは毎年数百万人が受験し、採点の一貫性を保つため採点者訓練に多大なコストがかけられている。", triviaEn: "TOEFL and IELTS are taken by millions annually; huge resources go into rater training for consistency.", realWorld: "大学入試や資格試験の問題設計、就労や留学の際の言語要件の審査、企業の語学力評価、試験の公平性や信頼性を統計的に検証する作業に活用されている。受験者の得点から能力を推定する統計の手法も、この分野の道具になっている。", realWorldEn: "Language testing is used to design university entrance and certification exams, to set language requirements for work and study abroad, to assess proficiency within companies, and to check statistically that tests are fair and reliable. Statistical methods that estimate ability from test scores are also tools of this field." },
  "applied:forensic-ling": { trivia: "著者推定の技術は、シェイクスピア作品の真の作者をめぐる論争など文学史上の謎の検証にも使われてきた。", triviaEn: "Authorship attribution has even been used to investigate debates over Shakespeare's true authorship.", realWorld: "脅迫状や詐欺メールの書き手の推定、録音された音声の話者の比較、商標の類似性をめぐる裁判での鑑定、供述調書の言葉遣いの分析に使われている。専門家の鑑定は、証拠としてどこまで使えるかの慎重な検討を伴う。", realWorldEn: "Forensic linguistics is used to estimate who wrote threatening letters or scam emails, to compare speakers in recorded audio, to give expert opinions in trademark disputes, and to analyze the wording of witness statements. Expert analysis is accompanied by careful consideration of how far it can serve as evidence." },
  "applied:medical-business-ling": { trivia: "研究によれば医師の説明時間は平均わずか数十秒とされ、患者が話し始めてすぐ遮られる傾向が問題視されてきた。", triviaEn: "Studies show physicians often interrupt patients within mere seconds, a flagged communication problem.", realWorld: "インフォームド・コンセントの説明文書の平易化、医療現場での患者との対話の研究、企業のビジネスメールや会議の言葉遣いの研修に活用されている。相手や場面に応じた言葉の選び方を扱う点で、現場の実務に直結する。", realWorldEn: "This field is used to rewrite informed-consent documents in plain language, to study conversations between clinicians and patients, and to train employees in business emails and meeting communication. It ties directly to practical work, because it deals with choosing words suited to the listener and the situation." },
  "interdisciplinary:philosophy-language": { trivia: "「宵の明星」と「明けの明星」は指す天体(金星)は同じでも、フレーゲはこれを「意義」の違いの例として有名にした。", triviaEn: "'Evening star' and 'morning star' refer to the same object, and Frege used this to illustrate sense vs. reference.", realWorld: "AIが言葉を理解するとはどういうことかという検討、法律の条文を解釈する際の理論、議論の誤りを見抜く論理教育に応用されている。意味や指示、真理といった概念を整理する作業が、これらの応用の土台になる。", realWorldEn: "Philosophy of language contributes to debates on what it means for AI to understand language, to the theory behind interpreting statutory text, and to logic education that teaches people to spot flaws in arguments. Its groundwork for these uses is the clarification of concepts such as meaning, reference, and truth." },
  "interdisciplinary:cognitive-ling": { trivia: "「時間はお金だ」という概念メタファーのおかげで、「時間を節約する」のような表現を自然に使っている。", triviaEn: "Thanks to the metaphor 'time is money,' we naturally say things like 'save time.'", realWorld: "広告コピーのメタファーの設計、UXライティングでの直感的な言葉選び、AIの言語モデルが人の概念理解とどう違うかを調べる研究に活用されている。人が言葉でものごとをどう捉えるかの知見を、製品や案内表示のわかりやすさに生かす。", realWorldEn: "Cognitive linguistics informs the design of metaphors in advertising copy, intuitive word choice in UX writing, and research that compares how language models and people represent concepts. Findings on how people grasp things through words are used to make products and signage easier to understand." },
  "interdisciplinary:generative-grammar": { trivia: "チョムスキーの生成文法は言語学だけでなく、計算機科学の形式文法・プログラミング言語理論にも影響を与えた。", triviaEn: "Chomsky's generative grammar influenced formal grammar and programming-language theory in computer science.", realWorld: "プログラミング言語の構文を定めて解析するパーサーの設計、文法に合った文を作るテキスト生成システム、子どもの言語獲得や言語障害の理論的研究に応用されている。人間の言語に共通する性質を探る研究として、言語習得の理論にも影響を与えた。", realWorldEn: "Generative grammar is applied to designing parsers that define and analyze programming-language syntax, to text-generation systems that produce grammatical sentences, and to theoretical research on child language acquisition and language disorders. As research into properties shared by human languages, it has also influenced theories of language acquisition." },
  "interdisciplinary:functional-ling": { trivia: "選択体系機能言語学(SFL)は言語教育にも広く応用され、オーストラリアの国語教育カリキュラムに大きな影響を与えている。", triviaEn: "SFL is widely applied in language education and has strongly influenced Australia's language-arts curriculum.", realWorld: "学術ライティングの指導、レポートや報告書などジャンル別の文章作法の教育、場面に応じた語彙や文体を選ぶ言語教育の設計に活用されている。言葉が場面の中でどんな働きをするかに注目するため、教育の現場と相性がよい。", realWorldEn: "Functional linguistics is used to teach academic writing, to teach genre-specific writing such as reports and essays, and to design language education that helps learners choose vocabulary and style suited to the situation. Because it focuses on what language does in context, it fits well with classroom practice." },
  "interdisciplinary:discourse-analysis": { trivia: "「つまり」「ところで」のような一見小さな談話標識も、批判的談話分析では権力関係を読み解く手がかりとされる。", triviaEn: "Small discourse markers like 'in other words' are treated as clues to power relations in critical discourse analysis.", realWorld: "ニュース報道の偏りの分析、政治家の演説のレトリックの研究、企業の広報文書や医療現場の説明のわかりやすさの検討に使われている。法廷や会議での発言の分析、学校の授業での教師と生徒のやりとりの研究にも使われる。", realWorldEn: "Discourse analysis is used to examine bias in news reporting, to study the rhetoric of political speeches, and to assess how clear corporate communications and explanations in healthcare settings are. It is also used to analyze statements made in courtrooms and meetings and to study teacher-student exchanges in classrooms." },
  "interdisciplinary:conversation-analysis": { trivia: "会話分析では、依頼への「断り」の返答は「はい」より長く間や言い淀みを伴いやすいという規則性が繰り返し確認されている。", triviaEn: "CA research repeatedly confirms refusals tend to be longer and more hesitant than acceptances.", realWorld: "コールセンターの応対品質の評価、医師と患者の診察場面の研究、AIチャットボットの相づちや話者交替の設計に活用されている。電話応対や緊急通報での聞き取りの手順の改善にも活用されている。", realWorldEn: "Conversation analysis is applied to evaluating the quality of call-center responses, studying doctor-patient consultations, and designing the backchannels and turn-taking of AI chatbots. It is also used to improve listening procedures in phone service and emergency calls." },
  "interdisciplinary:stylistics": { trivia: "文体統計分析によって、著者不明とされた文章の真の書き手が語彙頻度パターンから特定された例が複数報告されている。", triviaEn: "Stylometric analysis has repeatedly identified true authors of anonymous texts from word-frequency patterns.", realWorld: "盗作検出ソフトウェア、SNSでのなりすまし投稿の識別、文学作品の著者推定、読みやすい文章を作る編集や校閲の支援に応用されている。語の選び方や文の長さといった特徴を数えて文体を比べる手法を使う。", realWorldEn: "Stylistics is applied in plagiarism-detection software, in identifying impersonation posts on social media, in estimating the authorship of literary works, and in editing and proofreading support for readable prose. It relies on counting features such as word choice and sentence length to compare styles." },
  "interdisciplinary:semiotics": { trivia: "赤信号が「止まれ」を意味するのは自然な必然性ではなく社会的な取り決め(コード)にすぎない。", triviaEn: "A red light meaning 'stop' is not natural necessity but a social convention (a code).", realWorld: "企業ロゴやパッケージデザインの意味の分析、広告のブランド戦略の設計、道路標識やピクトグラムなど誰にでも伝わる記号の設計に活用されている。文化によって記号の意味が異なる点を踏まえ、海外向けの表示の検討にも使われる。", realWorldEn: "Semiotics is used to analyze the meaning of corporate logos and package designs, to shape brand strategy in advertising, and to design signs and pictograms such as road signs that anyone can understand. Since the meaning of signs differs across cultures, it also informs the review of signage for overseas audiences." },
};

/* 分野の要点カード：一言・研究対象・主要概念・代表的な研究者・古典的な例・関連分野（分野key → 内容） */
const FIELD_OVERVIEW = {"theoretical:phonetics": {"one": "言語音の物理的・生理的な性質を調べる分野", "oneEn": "The study of the physical and physiological properties of speech sounds.", "scope": "人が出す言語音を、発音の仕組み(調音)、空気の振動としての性質(音響)、耳での受け取り方(聴覚)の3面から記述する。観察、X線やMRIなどの撮像、音響分析、知覚実験を使う。", "scopeEn": "Describes speech sounds from three sides: how they are produced (articulation), their acoustic properties as sound waves, and how listeners perceive them, using observation, imaging, acoustic analysis, and perception experiments.", "concepts": [{"t": "調音点", "en": "place of articulation", "d": "子音を作るとき、口の中のどこで気流を妨げるかを示す位置。両唇や歯茎などがある。", "dEn": "The location in the vocal tract where airflow is obstructed to make a consonant, such as bilabial or alveolar."}, {"t": "調音様式", "en": "manner of articulation", "d": "気流をどのように妨げるかの違い。破裂、摩擦、鼻音などに分かれる。", "dEn": "How airflow is obstructed: for example plosive, fricative, or nasal."}, {"t": "有声・無声", "en": "voicing", "d": "声帯が振動するかどうかの区別。/p/ は無声、/b/ は有声である。", "dEn": "Whether the vocal folds vibrate: /p/ is voiceless and /b/ is voiced."}, {"t": "フォルマント", "en": "formant", "d": "声道の共鳴で強まる周波数帯。母音の音色を決める主な手がかりになる。", "dEn": "A band of frequencies reinforced by vocal-tract resonance; a main cue to vowel quality."}, {"t": "VOT", "en": "voice onset time", "d": "破裂音の開放から声帯振動が始まるまでの時間。有気音と無気音の区別に使う。", "dEn": "The time from the release of a stop to the onset of vocal-fold vibration; used to separate aspirated from unaspirated stops."}, {"t": "国際音声記号", "en": "International Phonetic Alphabet", "d": "世界の言語音を一貫して書き表すための記号体系。国際音声学会が管理する。", "dEn": "A symbol system for transcribing speech sounds of any language consistently, maintained by the International Phonetic Association."}, {"t": "基本母音", "en": "cardinal vowels", "d": "舌の位置を基準に母音を測るため、人為的に定められた母音の基準点。", "dEn": "Fixed reference vowels set up artificially to measure vowel quality by tongue position."}, {"t": "スペクトログラム", "en": "spectrogram", "d": "音を時間・周波数・強さの三つで表した図。フォルマントが帯として見える。", "dEn": "A display of sound by time, frequency and intensity, in which formants show as bands."}, {"t": "調音結合", "en": "coarticulation", "d": "隣り合う音の調音が重なり、互いの発音に影響し合う現象。", "dEn": "Overlap of the articulation of neighboring sounds so that each affects the other."}], "people": [{"n": "ヘンリー・スウィート", "en": "Henry Sweet", "w": "19世紀英国の音声学者。1877年に『音声学便覧』を著した。", "wEn": "A 19th-century British phonetician who published A Handbook of Phonetics in 1877.", "y": "1845-1912"}, {"n": "ダニエル・ジョーンズ", "en": "Daniel Jones", "w": "基本母音の体系を整え、1918年に『英語音声学概説』を著した。", "wEn": "Developed the system of cardinal vowels and published An Outline of English Phonetics in 1918.", "y": "1881-1967"}, {"n": "ピーター・ラデフォギド", "en": "Peter Ladefoged", "w": "世界の言語音の調査で知られ、教科書 A Course in Phonetics を著した。", "wEn": "Known for fieldwork on the sounds of the world's languages and for the textbook A Course in Phonetics.", "y": "1925-2006"}, {"n": "アレクサンダー・メルヴィル・ベル", "en": "Alexander Melville Bell", "w": "1867年の『視話法』で、発音器官の形を表す記号による音声表記を考案した。", "wEn": "In Visible Speech (1867) he devised a notation whose symbols depict the shapes of the speech organs.", "y": "1819-1905"}, {"n": "グンナー・ファント", "en": "Gunnar Fant", "w": "1960年の『音声生成の音響理論』で、声帯の音源と声道の濾波を分ける模型を示した。", "wEn": "In Acoustic Theory of Speech Production (1960) he set out the source-filter model of voice and vocal tract.", "y": "1919-2009"}], "example": "/p/ と /b/ はどちらも両唇で作る破裂音で、調音点も様式も同じである。違いは声帯が振動するかどうか(有声か無声か)だけで、音声学はこうした差を記述する。", "exampleEn": "/p/ and /b/ are both bilabial stops, sharing place and manner of articulation. They differ only in voicing, and phonetics describes exactly this kind of difference.", "related": ["theoretical:phonology", "computational:speech-processing", "psycho:neurolinguistics"]}, "theoretical:phonology": {"one": "音が言語の体系の中でどう働くかを調べる分野", "oneEn": "The study of how sounds function within the sound system of a language.", "scope": "ある言語がどの音を意味の区別に使い、音どうしがどう並び、環境でどう変わるかを調べる。最小対や分布の分析から音素を立て、規則や制約で音の交替を説明する。", "scopeEn": "Examines which sounds a language uses to distinguish meaning, how they are arranged, and how they change in context. Phonemes are posited from minimal pairs and distribution, and alternations are explained by rules or constraints.", "concepts": [{"t": "音素", "en": "phoneme", "d": "意味の区別に関わる最小の音の単位。話者の頭の中の単位として扱う。", "dEn": "The smallest sound unit that distinguishes meaning, treated as a unit in the speaker's mental system."}, {"t": "異音", "en": "allophone", "d": "同じ音素が環境によって実際に現れる、音声としての異なる姿。", "dEn": "The different phonetic realizations of one phoneme in different environments."}, {"t": "最小対", "en": "minimal pair", "d": "1か所の音だけが違い、意味が異なる2語の組。音素を確かめる基本の手段。", "dEn": "Two words differing in only one sound and in meaning; a basic test for phonemes."}, {"t": "相補分布", "en": "complementary distribution", "d": "2つの音が決して同じ環境に現れず、互いの環境を分け合う関係。", "dEn": "Two sounds never occur in the same environment and divide the environments between them."}, {"t": "弁別素性", "en": "distinctive feature", "d": "音を区別する特徴の単位。有声、鼻音などの2値で音を分解して表す。", "dEn": "A unit of contrast that breaks sounds down into binary properties such as voiced or nasal."}, {"t": "最適性理論", "en": "Optimality Theory", "d": "順位づけられた制約の競合で、入力から出力が選ばれると考える枠組み。", "dEn": "A framework in which the output is chosen from candidates by ranked, competing constraints."}, {"t": "音節", "en": "syllable", "d": "母音を核に、前後の子音を伴って一まとまりに発音される単位。", "dEn": "A unit pronounced as a group, built around a vowel nucleus with surrounding consonants."}, {"t": "同化", "en": "assimilation", "d": "隣り合う音の影響で、ある音が相手に似た音に変わること。", "dEn": "A sound becoming more like a neighboring sound."}, {"t": "中和", "en": "neutralization", "d": "特定の環境で、本来区別される二つの音素の対立がなくなること。", "dEn": "Loss of a contrast between two phonemes in a particular environment."}], "people": [{"n": "ニコライ・トルベツコイ", "en": "Nikolai Trubetzkoy", "w": "音韻論の基礎を築いた。没後の1939年に『音韻論の原理』が刊行された。", "wEn": "Laid the foundations of phonology; his Principles of Phonology appeared posthumously in 1939.", "y": "1890-1938"}, {"n": "ロマン・ヤコブソン", "en": "Roman Jakobson", "w": "プラハ学派の一員として弁別素性の考えを発展させた。", "wEn": "A Prague School linguist who developed the idea of distinctive features.", "y": "1896-1982"}, {"n": "モリス・ハレ", "en": "Morris Halle", "w": "チョムスキーと共に1968年に『英語の音のパターン』を著した。", "wEn": "Co-authored The Sound Pattern of English (1968) with Noam Chomsky.", "y": "1923-2018"}, {"n": "ケネス・パイク", "en": "Kenneth Pike", "w": "1948年の『声調言語』などで声調を論じ、音声と音素に基づくエミックとエティックの語を作った。", "wEn": "He wrote Tone Languages (1948) and coined emic and etic from phonemic and phonetic.", "y": "1912-2000"}, {"n": "ポール・キパルスキー", "en": "Paul Kiparsky", "w": "語彙音韻論を提唱し、語形成と音韻規則が段階的に絡み合うと論じた。", "wEn": "He proposed lexical phonology, in which word formation and phonological rules interact in stages.", "y": "1941-"}], "example": "英語の pin の p は息が強く出る有気音で、spin の p は出ない。この2つは同じ音素 /p/ の異音で、環境が違うので相補分布をなす。英語話者は区別に気づきにくい。", "exampleEn": "The p of English pin is aspirated while the p of spin is not. They are allophones of one phoneme /p/ in complementary distribution, and English speakers rarely notice the difference.", "related": ["theoretical:phonetics", "theoretical:morphology", "interdisciplinary:generative-grammar"]}, "theoretical:morphology": {"one": "語の内部構造と語の作られ方を調べる分野", "oneEn": "The study of the internal structure of words and how words are formed.", "scope": "語を形態素に分け、それらがどう組み合わさって語になるかを調べる。語形変化(屈折)、新語の形成(派生・複合)、語形を支える規則やパラダイムを、多言語のデータの比較から記述する。", "scopeEn": "Analyzes words into morphemes and studies how these combine to form words. It covers inflection, word formation by derivation and compounding, and the rules and paradigms behind word forms, drawing on cross-linguistic data.", "concepts": [{"t": "形態素", "en": "morpheme", "d": "意味や文法的な働きを持つ最小の言語単位。語より小さいこともある。", "dEn": "The smallest unit with meaning or grammatical function, often smaller than a word."}, {"t": "自由形態素・拘束形態素", "en": "free and bound morpheme", "d": "単独で語になれるものを自由、接辞のように単独で現れないものを拘束という。", "dEn": "A free morpheme can stand alone as a word; a bound morpheme, such as an affix, cannot."}, {"t": "屈折", "en": "inflection", "d": "時制や数など文法的な情報を、語形を変えて表す過程。品詞は変わらない。", "dEn": "Marking grammatical information such as tense or number by changing word form; the part of speech stays the same."}, {"t": "派生", "en": "derivation", "d": "接辞などを付けて新しい語を作る過程。品詞や意味が変わることが多い。", "dEn": "Creating a new word by adding affixes and the like; the category or meaning often changes."}, {"t": "異形態", "en": "allomorph", "d": "同じ形態素が環境に応じて取る、形の異なる実現形。", "dEn": "The different forms a single morpheme takes depending on its environment."}, {"t": "複合", "en": "compounding", "d": "2つ以上の語根を結びつけて1語を作る過程。blackboard など。", "dEn": "Combining two or more roots into one word, as in blackboard."}, {"t": "語彙素", "en": "lexeme", "d": "屈折形をまとめた抽象的な語の単位。辞書の見出しに相当する。", "dEn": "An abstract unit of vocabulary grouping inflected forms; roughly a dictionary headword."}, {"t": "生産性", "en": "productivity", "d": "接辞や規則が新しい語を作るのにどれだけ使えるかの度合い。", "dEn": "The degree to which an affix or rule can be used to form new words."}, {"t": "転換", "en": "conversion", "d": "形を変えずに品詞だけが変わる語形成。例は名詞emailの動詞化。", "dEn": "Word formation that changes the part of speech without changing the form, as in verbing the noun email."}], "people": [{"n": "エドワード・サピア", "en": "Edward Sapir", "w": "1921年の『言語』で、言語を形態の型で分類する議論を展開した。", "wEn": "In Language (1921) he discussed classifying languages by morphological type.", "y": "1884-1939"}, {"n": "レナード・ブルームフィールド", "en": "Leonard Bloomfield", "w": "1933年の『言語』で、形態素を中心とする記述の方法を体系化した。", "wEn": "Systematized morpheme-based description in his book Language (1933).", "y": "1887-1949"}, {"n": "マーク・アロノフ", "en": "Mark Aronoff", "w": "1976年の『生成文法における語形成』で、語形成を独立した部門として論じた。", "wEn": "Argued for word formation as a separate component in Word Formation in Generative Grammar (1976).", "y": "1949-"}, {"n": "チャールズ・ホケット", "en": "Charles Hockett", "w": "1954年の論文で、形態を項目と配列、項目と過程の二つの模型で捉え比べた。", "wEn": "In a 1954 paper he contrasted Item-and-Arrangement and Item-and-Process models of morphology.", "y": "1916-2000"}, {"n": "ユージン・ナイダ", "en": "Eugene Nida", "w": "形態素を見つけて分類するための原則を、実地調査向けに体系化した。", "wEn": "He systematized principles for identifying and classifying morphemes for fieldwork.", "y": "1914-2011"}], "example": "日本語の「食べさせられた」は、食べ+させ+られ+た と複数の形態素が順に連なる。トルコ語なども同様に、接辞を重ねて1語に多くの情報を載せる(膠着)。", "exampleEn": "Japanese tabesaserareta is built from a chain of morphemes, tabe + sase + rare + ta. Turkish likewise stacks affixes to put a lot of information in one word (agglutination).", "related": ["theoretical:syntax", "theoretical:phonology", "historical:typology", "computational:nlp"]}, "theoretical:syntax": {"one": "語が組み合わさって句や文になる規則を調べる分野", "oneEn": "The study of the rules by which words combine into phrases and sentences.", "scope": "文がどんな構造を持ち、どの語順や組み合わせが文法的かを調べる。母語話者の文法性判断を主なデータとし、句構造や木構造、移動などの操作で、有限の手段から無限の文ができる仕組みを説明する。", "scopeEn": "Studies what structure sentences have and which word orders and combinations are grammatical. Using native speakers' grammaticality judgments as main data, it explains with trees and operations such as movement how finite means yield unboundedly many sentences.", "concepts": [{"t": "句構造", "en": "phrase structure", "d": "語が句にまとまり、句がさらに文にまとまる階層的な構造。木構造で表す。", "dEn": "The hierarchical organization of words into phrases and phrases into sentences, shown as a tree."}, {"t": "主要部", "en": "head", "d": "句の中心となる語で、句の性質を決める。名詞句なら名詞。", "dEn": "The central word of a phrase that determines its category, such as the noun in a noun phrase."}, {"t": "移動", "en": "movement", "d": "要素が基底の位置から別の位置へ移る操作。疑問詞の文頭化など。", "dEn": "An operation moving an element from its base position to another, as with wh-words moving to the front."}, {"t": "c統御", "en": "c-command", "d": "木構造上の位置関係。束縛などの現象を述べる条件に使う。", "dEn": "A structural relation in trees used to state conditions on phenomena such as binding."}, {"t": "束縛理論", "en": "binding theory", "d": "再帰代名詞や代名詞が、文中のどの名詞句を指せるかを決める原則の体系。", "dEn": "Principles governing which noun phrases reflexives and pronouns may refer to."}, {"t": "島の制約", "en": "island constraint", "d": "ある構造の中から要素を外へ移動できない、という制約。", "dEn": "A constraint blocking movement of an element out of certain structures."}, {"t": "項構造", "en": "argument structure", "d": "動詞がどんな参与者を何個とるかを定めた情報。", "dEn": "Information on how many and what kinds of participants a verb takes."}, {"t": "Xバー理論", "en": "X-bar theory", "d": "すべての句が主要部・補部・指定部の同じ型を持つとする句構造の理論。", "dEn": "A theory that all phrases share one pattern of head, complement and specifier."}, {"t": "再帰性", "en": "recursion", "d": "同じ種類の構造が自分自身の中に入れ子になること。", "dEn": "A structure of one kind nested inside another of the same kind."}], "people": [{"n": "ノーム・チョムスキー", "en": "Noam Chomsky", "w": "1957年の『統語構造』で生成文法を提唱し、統語論の研究を方向づけた。", "wEn": "Proposed generative grammar in Syntactic Structures (1957), shaping the direction of syntax.", "y": "1928-"}, {"n": "ジョン・ロバート・ロス", "en": "John Robert Ross", "w": "1967年の博士論文で、統語的な島の制約を体系的に論じた。", "wEn": "Systematically discussed syntactic island constraints in his 1967 dissertation.", "y": "1938-2025"}, {"n": "レイ・ジャッケンドフ", "en": "Ray Jackendoff", "w": "1977年の『Xバー統語論』で、句構造の一般的な型を論じた。", "wEn": "Discussed the general format of phrase structure in X-bar Syntax (1977).", "y": "1945-"}, {"n": "リュシアン・テニエール", "en": "Lucien Tesnière", "w": "没後の1959年刊『構造統語論要説』で、依存関係と結合価に基づく文の捉え方を示した。", "wEn": "His Elements of Structural Syntax (1959, posthumous) set out dependency and valency in sentence analysis.", "y": "1893-1954"}, {"n": "ジョーン・ブレズナン", "en": "Joan Bresnan", "w": "ロナルド・カプランと語彙機能文法を作り、主語・目的語などの文法関係を句構造と分けた。", "wEn": "With Ronald Kaplan she built Lexical-Functional Grammar, separating grammatical relations from phrase structure.", "y": "1945-"}], "example": "What did you eat? では、what は eat の目的語だが文頭に現れる。多くの理論はこれを、what が基底の位置から文頭へ移動した結果と分析する。", "exampleEn": "In What did you eat?, what is the object of eat yet appears at the front. Many theories analyze this as what having moved from its base position to the front.", "related": ["theoretical:morphology", "theoretical:semantics", "interdisciplinary:generative-grammar", "computational:nlp"]}, "theoretical:semantics": {"one": "語や文の字義どおりの意味を調べる分野", "oneEn": "The study of the literal meaning of words and sentences.", "scope": "語の意味(語彙的意味)と、語の意味と構造から文の意味がどう決まるか(合成性)を調べる。真理条件や論理的な記述を使い、含意や前提など、文どうしの意味の関係を明らかにする。", "scopeEn": "Studies word meaning (lexical semantics) and how sentence meaning is determined by word meanings and structure (compositionality). It uses truth conditions and logical description to clarify meaning relations among sentences, such as entailment and presupposition.", "concepts": [{"t": "真理条件", "en": "truth conditions", "d": "文が真になるために世界がどうであるべきかという条件。意味の中心と見る立場がある。", "dEn": "The conditions the world must meet for a sentence to be true; one tradition treats them as central to meaning."}, {"t": "合成性の原理", "en": "principle of compositionality", "d": "文の意味は、部分の意味とその組み合わせ方で決まるという原理。", "dEn": "The principle that a sentence's meaning is determined by its parts' meanings and how they are combined."}, {"t": "含意", "en": "entailment", "d": "ある文が真なら別の文も必ず真になる関係。", "dEn": "A relation in which if one sentence is true, another must also be true."}, {"t": "前提", "en": "presupposition", "d": "文が成り立つ前に当然と見なされている内容。否定しても保たれる。", "dEn": "Content taken for granted for a sentence to be appropriate; it survives negation."}, {"t": "多義性", "en": "polysemy", "d": "1つの語が、互いに関連した複数の意味を持つこと。", "dEn": "A single word having several related senses."}, {"t": "意味役割", "en": "thematic role", "d": "動作主や被動者のように、動詞に対する名詞句の意味的な役割。", "dEn": "The semantic role of a noun phrase relative to a verb, such as agent or patient."}, {"t": "外延と内包", "en": "extension and intension", "d": "外延は語が指す対象の集合、内包はその語を適用する条件。", "dEn": "Extension is the set of things a term picks out; intension is the condition for applying it."}, {"t": "可能世界", "en": "possible world", "d": "現実とは別の仕方で成り立ちうる世界。必然性や様相の分析に使う。", "dEn": "A way the world might have been; used to analyze necessity and modality."}, {"t": "意味場", "en": "semantic field", "d": "意味の近い語が作る、互いに区切り合うまとまり。", "dEn": "A group of semantically related words that mark each other's boundaries."}], "people": [{"n": "ゴットロープ・フレーゲ", "en": "Gottlob Frege", "w": "1892年の論文で意義と指示対象を区別し、合成性の考えの源流となった。", "wEn": "In an 1892 paper he distinguished sense from reference, a source of the idea of compositionality.", "y": "1848-1925"}, {"n": "リチャード・モンタギュー", "en": "Richard Montague", "w": "自然言語を論理学の方法で扱う形式意味論の基礎を築いた。", "wEn": "Laid the foundations of formal semantics by treating natural language with the methods of logic.", "y": "1930-1971"}, {"n": "バーバラ・パーティー", "en": "Barbara Partee", "w": "形式意味論を言語学の中に確立することに大きく貢献した。", "wEn": "Contributed greatly to establishing formal semantics within linguistics.", "y": "1940-"}, {"n": "ルドルフ・カルナップ", "en": "Rudolf Carnap", "y": "1891-1970", "w": "1947年の『意味と必然性』で、表現の内包と外延を区別する意味論を展開した。", "wEn": "In Meaning and Necessity (1947) he developed a semantics distinguishing the intension and extension of expressions."}, {"n": "ソール・クリプキ", "en": "Saul Kripke", "y": "1940-2022", "w": "1970年の講義『名指しと必然性』で、固有名は固定指示子だと論じた。", "wEn": "In his 1970 lectures Naming and Necessity he argued that proper names are rigid designators."}], "example": "「太郎が花子を殴った」は「花子は殴られた」を含意する。前者が真なら後者は必ず真であり、この文どうしの関係を明らかにするのが意味論である。", "exampleEn": "Taro hit Hanako entails Hanako was hit. If the first is true the second must be true, and semantics aims to clarify such relations between sentences.", "related": ["theoretical:pragmatics", "theoretical:syntax", "interdisciplinary:philosophy-language", "computational:knowledge-rep:reasoning"]}, "theoretical:pragmatics": {"one": "文脈の中で、話し手の意図した意味を調べる分野", "oneEn": "The study of speaker-intended meaning as it depends on context.", "scope": "同じ文でも、誰が、いつ、誰に言うかで伝わる意味が変わる点を扱う。発話行為、会話の含意、直示、ポライトネスなどを、具体的な会話の例から推論の仕組みとして分析する。", "scopeEn": "Deals with how the same sentence conveys different meanings depending on who says it, when, and to whom. It analyzes speech acts, conversational implicature, deixis, and politeness as inference, starting from concrete conversational examples.", "concepts": [{"t": "発話行為", "en": "speech act", "d": "発話によって、依頼や約束、命名などの行為を行うこと。", "dEn": "Performing actions such as requesting, promising, or naming by uttering words."}, {"t": "会話の含意", "en": "conversational implicature", "d": "文字どおりの内容を超えて、文脈から推論される意味。", "dEn": "Meaning inferred from context beyond what is literally said."}, {"t": "協調の原則", "en": "cooperative principle", "d": "会話の参加者は互いに協力的に話す、というグライスの想定。", "dEn": "Grice's assumption that conversational participants cooperate with one another."}, {"t": "直示", "en": "deixis", "d": "私、ここ、今のように、話し手の位置や時点で指示対象が決まる表現。", "dEn": "Expressions such as I, here, and now whose reference depends on the speaker's position and time."}, {"t": "ポライトネス", "en": "politeness", "d": "相手の面子(フェイス)に配慮して言語を使う方略。", "dEn": "Language strategies that attend to the other person's face."}, {"t": "関連性理論", "en": "relevance theory", "d": "聞き手は最小の労力で最大の効果を得る解釈を選ぶ、とする立場。", "dEn": "A view that hearers choose the interpretation giving the greatest effect for the least effort."}, {"t": "遂行文", "en": "performative utterance", "d": "「約束する」のように、言うこと自体が行為になる文。", "dEn": "A sentence like 'I promise' whose utterance itself performs an action."}, {"t": "格率", "en": "maxim", "d": "協調の原則を具体化する、量・質・関係・様態の4種の会話上の規則。", "dEn": "Four conversational rules of quantity, quality, relation and manner that spell out the cooperative principle."}, {"t": "尺度含意", "en": "scalar implicature", "d": "「一部」と言えば「全部ではない」と推論する含意。語の強弱の尺度に基づく。", "dEn": "The inference that 'some' means 'not all', based on a scale of stronger and weaker words."}], "people": [{"n": "ジョン・オースティン", "en": "J. L. Austin", "w": "『言語と行為』(原題 How to Do Things with Words、1962年)で発話行為を論じた。", "wEn": "Discussed speech acts in How to Do Things with Words (1962).", "y": "1911-1960"}, {"n": "ポール・グライス", "en": "H. Paul Grice", "w": "協調の原則と会話の格率を提唱し、含意の研究の土台を作った。", "wEn": "Proposed the cooperative principle and maxims, founding the study of implicature.", "y": "1913-1988"}, {"n": "ジョン・サール", "en": "John Searle", "w": "1969年の『言語行為』で、発話行為の理論を体系化した。", "wEn": "Systematized speech act theory in Speech Acts (1969).", "y": "1932-2025"}, {"n": "ダン・スペルベル", "en": "Dan Sperber", "y": "1942-", "w": "1986年にウィルソンと『関連性』を著し、関連性理論を提示した。", "wEn": "With Wilson he published Relevance in 1986, presenting relevance theory."}, {"n": "ディアドラ・ウィルソン", "en": "Deirdre Wilson", "y": "1941-", "w": "スペルベルと関連性理論を築き、発話の解釈を認知の面から説明した。", "wEn": "Built relevance theory with Sperber, explaining utterance interpretation in cognitive terms."}], "example": "「窓開いてる?」は、文字どおりは質問だが、寒い部屋では「閉めて」という依頼として伝わる。字義と話し手の意図のずれを推論で埋めるのが語用論の中心課題である。", "exampleEn": "Is the window open? is literally a question, but in a cold room it conveys a request to close it. Bridging the gap between literal meaning and speaker intention by inference is a central task of pragmatics.", "related": ["theoretical:semantics", "interdisciplinary:conversation-analysis", "interdisciplinary:discourse-analysis", "social:sociolinguistics"]}, "psycho:psycholinguistics": {"one": "ことばの理解と産出の心的過程を実験で調べる分野", "oneEn": "The study of the mental processes behind understanding and producing language", "scope": "語の認識、文の解析、発話の計画といった言語処理の心的過程を扱う。反応時間、読み時間、視線計測、言い間違いの分析など、行動データから処理の仕組みを推定する。", "scopeEn": "Studies the mental processes of word recognition, sentence parsing and speech planning. Infers how processing works from behavioral data such as reaction times, reading times, eye movements and speech errors.", "concepts": [{"t": "語彙アクセス", "en": "lexical access", "d": "心内辞書から語の形・意味・文法情報を引き出す過程", "dEn": "The process of retrieving a word's form, meaning and grammatical information from the mental lexicon"}, {"t": "プライミング", "en": "priming", "d": "先に見聞きした刺激が後続の処理を速める効果", "dEn": "The effect by which a prior stimulus speeds up the processing of a later one"}, {"t": "語彙決定課題", "en": "lexical decision task", "d": "文字列が実在語かを判断させ、反応時間を測る課題", "dEn": "A task in which participants judge whether a string is a real word, and response time is measured"}, {"t": "ガーデンパス文", "en": "garden path sentence", "d": "途中まで誤った統語解釈に導かれ、再解析を要する文", "dEn": "A sentence that leads the reader to a wrong syntactic analysis midway and forces reanalysis"}, {"t": "言い間違い", "en": "speech error", "d": "発話計画の単位や段階を映すものとして分析される誤り", "dEn": "Slips of the tongue, analyzed as evidence for the units and stages of speech planning"}, {"t": "舌先現象", "en": "tip-of-the-tongue phenomenon", "d": "語の意味は分かるのに形が出てこない状態", "dEn": "The state of knowing a word's meaning but being unable to retrieve its form"}, {"t": "二重経路モデル", "en": "dual-route model", "d": "音読で、綴りから音への規則と語ごとの辞書的な経路が並行すると考えるモデル", "dEn": "A model of reading aloud with parallel routes: spelling-to-sound rules and word-specific lexical lookup."}, {"t": "コホートモデル", "en": "cohort model", "d": "音声が進むにつれ、始まりの音が合う候補語が絞られていくという聞き取りの理論", "dEn": "A theory of listening in which candidates sharing the opening sounds narrow as speech unfolds."}, {"t": "アイトラッキング", "en": "eye tracking", "d": "読みや聞き取りの最中の視線の動きを記録し、処理の時間経過を調べる方法", "dEn": "A method that records eye movements during reading or listening to trace processing over time."}], "people": [{"n": "トーマス・ベーバー", "en": "Thomas Bever", "y": "1939-", "w": "1970年の論考で The horse raced past the barn fell の文を示し、文理解の方略を論じた", "wEn": "Presented 'The horse raced past the barn fell' in a 1970 chapter on the cognitive basis of linguistic structures and sentence comprehension strategies"}, {"n": "ウィレム・レヴェルト", "en": "Willem Levelt", "y": "1938-", "w": "発話産出の包括的モデルを『Speaking』(1989年)にまとめた", "wEn": "Set out a comprehensive model of speech production in 'Speaking' (1989)"}, {"n": "リン・フレイジャー", "en": "Lyn Frazier", "y": "1952-", "w": "最小結合などの原則で文解析を説明する、ガーデンパス・モデルの代表的提唱者", "wEn": "A leading proponent of the garden-path model, which explains parsing with principles such as minimal attachment"}, {"n": "ジョージ・ミラー", "en": "George Miller", "y": "1920-2012", "w": "1951年の『Language and Communication』で、言語を心理学の対象として論じた", "wEn": "Treated language as a subject for psychology in 'Language and Communication' (1951)."}, {"n": "キース・レイナー", "en": "Keith Rayner", "y": "1943-2015", "w": "読みの最中の眼球運動を長年研究し、視線計測による読みの研究を発展させた", "wEn": "Studied eye movements in reading for decades and advanced eye-tracking research on reading."}], "example": "The horse raced past the barn fell は、raced を主動詞と読んで行き詰まり、読み手が最初から解析し直すことになる。解析の途中経過が見える例。", "exampleEn": "In 'The horse raced past the barn fell', readers take 'raced' as the main verb, hit a dead end at 'fell' and must reparse from the start. It shows how parsing proceeds incrementally.", "related": ["psycho:neurolinguistics", "theoretical:syntax", "interdisciplinary:cognitive-ling", "theoretical:semantics"]}, "psycho:neurolinguistics": {"one": "言語を支える脳のしくみを損傷や脳活動から調べる分野", "oneEn": "The study of how the brain supports language, via lesions and brain activity", "scope": "言語の理解や産出が脳のどこで、どのように行われるかを扱う。脳損傷と失語症の症状の対応、脳波(ERP)、fMRI などの計測から、言語機能の脳内基盤を探る。", "scopeEn": "Examines where and how language comprehension and production are carried out in the brain. Uses links between brain damage and aphasic symptoms, plus measures such as ERP and fMRI, to explore its neural basis.", "concepts": [{"t": "失語症", "en": "aphasia", "d": "脳損傷によって生じる、言語機能の障害", "dEn": "A language disorder caused by brain damage"}, {"t": "ブローカ野", "en": "Broca's area", "d": "左下前頭回にあり、発話産出に関わるとされる領域", "dEn": "A region of the left inferior frontal gyrus said to be involved in speech production"}, {"t": "ウェルニッケ野", "en": "Wernicke's area", "d": "左側頭葉後部にあり、言語理解に関わるとされる領域", "dEn": "A region of the posterior left temporal lobe said to be involved in language comprehension"}, {"t": "事象関連電位", "en": "event-related potential (ERP)", "d": "刺激に対する脳波の変化を、ミリ秒単位で捉える指標", "dEn": "A measure of brain-wave changes time-locked to a stimulus, with millisecond resolution"}, {"t": "N400", "en": "N400", "d": "意味的に不自然な語で大きくなるとされる脳波成分", "dEn": "An ERP component said to grow larger for semantically unexpected words"}, {"t": "側性化", "en": "lateralization", "d": "言語機能が主に一方の半球(多くは左)に偏ること", "dEn": "The concentration of language function mainly in one hemisphere, usually the left"}, {"t": "弓状束", "en": "arcuate fasciculus", "d": "ブローカ野とウェルニッケ野の領域を結ぶ神経線維の束", "dEn": "A bundle of nerve fibers linking the regions of Broca's and Wernicke's areas."}, {"t": "伝導失語", "en": "conduction aphasia", "d": "理解も発話も比較的保たれるが、聞いた語句の復唱が特に難しい失語", "dEn": "Aphasia with relatively spared comprehension and speech but especially poor repetition."}, {"t": "P600", "en": "P600", "d": "文法の誤りや構文の解析のやり直しで、約600ミリ秒後に出る陽性の脳波", "dEn": "A positive brain wave about 600 ms after a grammatical error or a syntactic reanalysis."}], "people": [{"n": "ポール・ブローカ", "en": "Paul Broca", "y": "1824-1880", "w": "1861年に、ほとんど発話できなくなった患者の脳の損傷部位を報告した", "wEn": "Reported in 1861 the brain lesion of a patient who had become almost unable to speak"}, {"n": "カール・ウェルニッケ", "en": "Carl Wernicke", "y": "1848-1905", "w": "1874年の著作で、理解の障害と側頭葉の損傷を結びつけた", "wEn": "Linked comprehension deficits to temporal-lobe damage in a 1874 work"}, {"n": "マルタ・クタス", "en": "Marta Kutas", "y": "1949-", "w": "スティーブン・ヒルヤードと共に、1980年にN400成分を報告した", "wEn": "Reported the N400 component in 1980 together with Steven Hillyard"}, {"n": "ノーマン・ゲシュウィンド", "en": "Norman Geschwind", "y": "1926-1984", "w": "1965年の論文で、言語に関わる脳部位の連絡が断たれると症状が出ると論じた", "wEn": "In a 1965 paper argued that cutting the connections between language-related brain regions produces symptoms."}, {"n": "アレクサンドル・ルリヤ", "en": "Alexander Luria", "y": "1902-1977", "w": "戦傷者の失語を分析し、言語を脳の複数の部位が協力して担う働きとして論じた", "wEn": "Analyzed aphasia in war wounded and described language as the joint work of several brain regions."}], "example": "発話はたどたどしいが理解は保たれる失語(ブローカ失語)と、流暢だが意味の通らない発話をする失語(ウェルニッケ失語)の対比が、古典的な例になっている。", "exampleEn": "A classic contrast is between aphasia with halting speech but preserved comprehension (Broca's aphasia) and aphasia with fluent but meaningless speech (Wernicke's aphasia).", "related": ["psycho:psycholinguistics", "interdisciplinary:cognitive-ling", "theoretical:phonetics", "psycho:l2-acquisition"]}, "psycho:l1-acquisition": {"one": "子どもが母語を身につけていく過程を調べる分野", "oneEn": "The study of how children come to acquire their native language", "scope": "喃語から一語文、二語文、複文へと進む発達の順序や、獲得を支える仕組みを扱う。子どもの発話の縦断的な観察や実験を使い、生得説と使用依拠の立場などの理論を検討する。", "scopeEn": "Covers the developmental sequence from babbling to one-word, two-word and complex sentences, and what drives it. Uses longitudinal observation and experiments to weigh theories such as nativist and usage-based approaches.", "concepts": [{"t": "喃語", "en": "babbling", "d": "生後半年ごろから現れる、音節の繰り返しの発声", "dEn": "Repeated syllable-like vocalizations that appear from around six months of age"}, {"t": "臨界期仮説", "en": "critical period hypothesis", "d": "言語獲得に最適な限られた期間があるとする仮説", "dEn": "The hypothesis that there is a limited window that is optimal for acquiring language"}, {"t": "普遍文法", "en": "universal grammar", "d": "生得的とされる、言語獲得の基盤となる知識", "dEn": "Innate knowledge posited as the basis for language acquisition"}, {"t": "刺激の貧困", "en": "poverty of the stimulus", "d": "得られる入力だけでは文法を学べないとする議論", "dEn": "The argument that the available input is insufficient to learn the grammar"}, {"t": "過剰般化", "en": "overgeneralization", "d": "規則を例外にも当てはめる誤り。goed などが例", "dEn": "Applying a rule to exceptions too, as in 'goed'"}, {"t": "使用依拠モデル", "en": "usage-based model", "d": "言語使用の経験から文法が形成されるとする立場", "dEn": "The view that grammar emerges from experience with language use"}, {"t": "共同注意", "en": "joint attention", "d": "養育者と子どもが同じ物に注意を向け、それを互いに分かっている状態", "dEn": "A state in which caregiver and child attend to the same object and both know it."}, {"t": "平均発話長", "en": "mean length of utterance (MLU)", "d": "1発話あたりの形態素数の平均。文法発達の目安に使う", "dEn": "The average number of morphemes per utterance, used as a gauge of grammatical development."}, {"t": "語彙の急増", "en": "vocabulary spurt", "d": "1歳半ごろから、覚える語の数が急に増える時期", "dEn": "A period from about 18 months when the number of words learned rises sharply."}], "people": [{"n": "エリック・レネバーグ", "en": "Eric Lenneberg", "y": "1921-1975", "w": "『Biological Foundations of Language』(1967年)で臨界期の考えを展開した", "wEn": "Developed the idea of a critical period in 'Biological Foundations of Language' (1967)"}, {"n": "ロジャー・ブラウン", "en": "Roger Brown", "y": "1925-1997", "w": "『A First Language』(1973年)で、子どもの文法の発達段階を記述した", "wEn": "Described stages of children's grammatical development in 'A First Language' (1973)"}, {"n": "マイケル・トマセロ", "en": "Michael Tomasello", "y": "1950-", "w": "『Constructing a Language』(2003年)で、使用依拠の言語獲得論を示した", "wEn": "Presented a usage-based theory of language acquisition in 'Constructing a Language' (2003)"}, {"n": "ジェローム・ブルーナー", "en": "Jerome Bruner", "y": "1915-2016", "w": "『Child's Talk』(1983年)で、養育者との定型的なやりとりが言語習得を支えると論じた", "wEn": "Argued in 'Child's Talk' (1983) that routine exchanges with caregivers support language acquisition."}, {"n": "スティーブン・ピンカー", "en": "Steven Pinker", "y": "1954-", "w": "1984年の著書で、子どもが文法を習得できるための条件を論じた", "wEn": "Analyzed the conditions under which grammar can be learned in his 1984 book 'Language Learnability and Language Development'."}], "example": "子どもは一度 went を正しく言えても、のちに goed と言うようになり、さらにあとで went に戻る。この U 字型の発達は、規則の獲得を示す例とされる。", "exampleEn": "A child may say 'went' correctly, later switch to 'goed', and then return to 'went'. This U-shaped development is often taken as evidence that a rule has been acquired.", "related": ["psycho:l2-acquisition", "interdisciplinary:generative-grammar", "theoretical:morphology", "psycho:psycholinguistics"]}, "psycho:l2-acquisition": {"one": "母語を持つ人が別の言語を身につける過程を調べる分野", "oneEn": "The study of how people who already have a native language learn another", "scope": "学習者が第二言語を習得する過程と、母語や入力、動機づけ、年齢などの影響を扱う。学習者の産出データを分析する学習者言語の研究や、実験、教室研究が方法になる。", "scopeEn": "Examines how learners acquire a second language and the effects of the native language, input, motivation and age. Methods include analyzing learner production (learner language), experiments and classroom research.", "concepts": [{"t": "中間言語", "en": "interlanguage", "d": "学習者独自の規則を持つ、発達途上の言語体系", "dEn": "A developing language system with rules of its own that a learner has built"}, {"t": "母語転移", "en": "L1 transfer", "d": "母語の知識が第二言語の習得に影響すること", "dEn": "The influence of native-language knowledge on second language acquisition"}, {"t": "化石化", "en": "fossilization", "d": "誤りが定着し、改善しにくくなる現象", "dEn": "The settling of errors so that they resist improvement"}, {"t": "インプット仮説", "en": "input hypothesis", "d": "理解できる入力が習得を進めるとするクラッシェンの仮説", "dEn": "Krashen's hypothesis that comprehensible input drives acquisition"}, {"t": "アウトプット仮説", "en": "output hypothesis", "d": "産出の経験が習得を促すとするスウェインの仮説", "dEn": "Swain's hypothesis that producing language promotes acquisition"}, {"t": "対照分析", "en": "contrastive analysis", "d": "母語と目標言語の違いから学習の困難点を予測する手法", "dEn": "A method that predicts learning difficulty from differences between the native and target languages"}, {"t": "気づき仮説", "en": "noticing hypothesis", "d": "入力の言語形式に意識的に気づくことが、習得の条件になるという考え", "dEn": "The idea that consciously noticing forms in the input is a condition for acquisition."}, {"t": "意味交渉", "en": "negotiation of meaning", "d": "聞き返しや確認を重ねて、互いの理解のずれを調整するやりとり", "dEn": "Exchanges of clarification and confirmation that adjust gaps in mutual understanding."}, {"t": "訂正フィードバック", "en": "corrective feedback", "d": "学習者の誤りに対して、教師や相手が示す訂正や言い直しの反応", "dEn": "A teacher's or partner's reaction that corrects or recasts a learner's error."}], "people": [{"n": "ラリー・セリンカー", "en": "Larry Selinker", "y": "1937-2026", "w": "1972年の論文『Interlanguage』で、中間言語の概念を提案した", "wEn": "Proposed the concept of interlanguage in the 1972 paper 'Interlanguage'"}, {"n": "スティーブン・クラッシェン", "en": "Stephen Krashen", "y": "1941-", "w": "インプット仮説を軸にした習得理論をまとめ、1980年代に広く議論された", "wEn": "Built an acquisition theory around the input hypothesis, widely debated in the 1980s"}, {"n": "ロバート・ラド", "en": "Robert Lado", "y": "1915-1995", "w": "『Linguistics Across Cultures』(1957年)で、対照分析の考え方を示した", "wEn": "Set out the approach of contrastive analysis in 'Linguistics Across Cultures' (1957)"}, {"n": "ピット・コーダー", "en": "Pit Corder", "y": "1918-1990", "w": "学習者の誤りを欠陥でなく発達の手がかりとみなし、誤用分析を広めた", "wEn": "Treated learner errors as signs of development rather than deficiency and popularized error analysis."}, {"n": "ウォレス・ランバート", "en": "Wallace Lambert", "y": "1922-2009", "w": "二言語使用を研究し、1965年開始のセント・ランバートのイマージョン実験に関わった", "wEn": "Studied bilingualism and was involved in the St. Lambert immersion experiment begun in 1965."}], "example": "日本語話者の英語学習者が、冠詞や複数形の s を落としやすい例が知られる。母語にその区別がないことの影響とされるが、学習者ごとの差も大きい。", "exampleEn": "Japanese-speaking learners of English are known to drop articles and plural -s, an effect attributed to the native language lacking such distinctions, though individual differences are large.", "related": ["psycho:l1-acquisition", "applied:language-education", "psycho:psycholinguistics", "applied:language-testing"]}, "social:sociolinguistics": {"one": "言語変異と社会集団・場面の結びつきを調べる分野", "oneEn": "Studies how language varies with social groups, settings and speakers' identities.", "scope": "階層・年齢・性別・場面といった社会的要因が言語使用にどう反映されるかを調べる。録音した自然な発話から変項の出現率を数え、統計的に分析する量的研究と、参与観察や面接を用いる質的研究がある。", "scopeEn": "Examines how social factors such as class, age, gender and situation are reflected in language use. Methods include quantitative analysis of variable rates in recorded speech and qualitative work based on interviews and participant observation.", "concepts": [{"t": "言語変種", "en": "variety", "d": "地域や社会集団、場面に結びついた言語の一つの形", "dEn": "A form of language tied to a region, social group or situation."}, {"t": "社会言語学的変項", "en": "sociolinguistic variable", "d": "同じ意味を表す複数の言い方が社会的要因と相関するもの", "dEn": "Alternative ways of saying the same thing whose use correlates with social factors."}, {"t": "スタイル切り替え", "en": "style-shifting", "d": "話し相手や場面に応じて、同じ話者が発話の様式を変えること", "dEn": "A single speaker's change of speech style according to addressee or setting."}, {"t": "言語威信", "en": "prestige", "d": "ある変種や形式が社会で高く評価される度合い", "dEn": "The degree to which a variety or form is socially valued."}, {"t": "見かけの時間", "en": "apparent time", "d": "一時点での年齢差から言語変化の進行を推定する考え方", "dEn": "Inferring ongoing language change from age differences observed at a single time."}, {"t": "コードスイッチング", "en": "code-switching", "d": "会話の中で複数の言語や変種を切り替えること", "dEn": "Alternating between languages or varieties within a conversation."}, {"t": "言語計画", "en": "language planning", "d": "国や社会が言語の地位や形を意図して整え、使い方を決めていく取り組み。", "dEn": "Deliberate efforts by a state or society to shape the status and form of a language and decide how it is used."}, {"t": "社会的ネットワーク", "en": "social network", "d": "個人の人づきあいの網の目。結びつきが強いほど地元の言葉を保つ傾向がある。", "dEn": "The web of a person's social ties; the stronger the ties, the more local speech tends to be kept."}, {"t": "コミュニケーション調節", "en": "communication accommodation", "d": "話し相手に合わせて、話し方を近づけたり遠ざけたりすること。", "dEn": "Adjusting one's way of speaking toward or away from that of the interlocutor."}], "people": [{"n": "ウィリアム・ラボフ", "en": "William Labov", "y": "1927-2024", "w": "ニューヨーク市の英語の社会的階層化の研究(1966年)など、変異研究の基礎を築いた", "wEn": "Founded variationist sociolinguistics, e.g. his study of the social stratification of English in New York City (1966)."}, {"n": "ジョン・ガンパーズ", "en": "John Gumperz", "y": "1922-2013", "w": "相互行為の社会言語学を提唱し、会話での文脈化の手がかりを分析した", "wEn": "Developed interactional sociolinguistics and analyzed contextualization cues in conversation."}, {"n": "ジョシュア・フィッシュマン", "en": "Joshua Fishman", "y": "1926-2015", "w": "言語維持と言語シフト、少数言語の復興を論じた", "wEn": "Wrote on language maintenance and shift and on the revitalization of minority languages."}, {"n": "チャールズ・ファーガソン", "en": "Charles Ferguson", "w": "1959年の論文でダイグロシアを論じ、高位と低位の変種が使い分けられる社会を示した。", "wEn": "In a 1959 paper described diglossia, a society where a high and a low variety are used for different purposes.", "y": "1921-1998"}, {"n": "エイナル・ハウゲン", "en": "Einar Haugen", "w": "ノルウェー語の標準化を研究し、言語計画を選択・成文化・精緻化・受容の段階で捉えた。", "wEn": "Studied the standardization of Norwegian and framed language planning as selection, codification, elaboration and acceptance.", "y": "1906-1994"}], "example": "ラボフはニューヨークの高級・中級・大衆の3つの百貨店で店員の/r/の発音率を調べ、店の格が高いほど/r/を発音する傾向を示した。", "exampleEn": "Labov compared the rate of pronouncing /r/ among salespeople in three New York department stores of high, middle and low rank, and found that /r/ was pronounced more often in the higher-ranked stores.", "related": ["social:dialectology", "social:anthro-ling", "interdisciplinary:conversation-analysis", "psycho:l2-acquisition"]}, "social:anthro-ling": {"one": "言語と文化・世界観・社会生活の関係を探る分野", "oneEn": "Explores how language relates to culture, worldview and social life.", "scope": "現地に長く滞在して言語使用を観察するエスノグラフィーを基本に、語彙の分類や語り・儀礼での言葉の使われ方、言語についての信念を調べる。危機言語の記録と継承も重要な課題である。", "scopeEn": "Based on ethnography, i.e. long-term fieldwork observing language use, it investigates lexical classification, the use of speech in narrative and ritual, and beliefs about language. Documenting and sustaining endangered languages is also a major concern.", "concepts": [{"t": "エスノグラフィー", "en": "ethnography", "d": "現地での参与観察により文化と言語使用を記述する手法", "dEn": "A method describing culture and language use through participant observation in the field."}, {"t": "言語相対論", "en": "linguistic relativity", "d": "言語の違いが思考や認識の様式に影響するという仮説", "dEn": "The hypothesis that differences between languages influence ways of thinking and perceiving."}, {"t": "コミュニケーションの民族誌", "en": "ethnography of communication", "d": "ある共同体での話し方の規範と場面ごとの使い方を記述する枠組み", "dEn": "A framework describing a community's norms of speaking and its use of speech in each setting."}, {"t": "言語イデオロギー", "en": "language ideology", "d": "言語の価値や正しさについて、集団が共有する信念", "dEn": "Beliefs shared by a group about the value and correctness of language."}, {"t": "言語社会化", "en": "language socialization", "d": "言語を学ぶことと社会の一員になることが同時に進む過程", "dEn": "The process in which learning a language and becoming a member of society go on together."}, {"t": "言語ドキュメンテーション", "en": "language documentation", "d": "消えゆく言語の音声・語彙・談話を記録し保存する活動", "dEn": "Recording and preserving the sounds, words and discourse of vanishing languages."}, {"t": "参与観察", "en": "participant observation", "d": "調査者が共同体の暮らしに加わり、話し方と行動を内側から長く観察する方法。", "dEn": "A method in which the researcher joins community life and observes speech and behavior from within over a long period."}, {"t": "親族名称", "en": "kinship terminology", "d": "親族をどう呼び分けるかの体系。言語ごとに区別が違い、社会構造の手がかりになる。", "dEn": "The system for naming relatives; distinctions differ by language and give clues to social structure."}, {"t": "基本色彩語", "en": "basic color terms", "d": "色を表す基本的な語。言語により数が異なり、増える順序に共通性が見られる。", "dEn": "The core words for colors; their number varies by language, and the order in which they are added shows common patterns."}], "people": [{"n": "エドワード・サピア", "en": "Edward Sapir", "y": "1884-1939", "w": "北米先住民諸語を研究し、『言語』(1921年)で言語と文化の関係を論じた", "wEn": "Studied Native American languages and discussed language and culture in 'Language' (1921)."}, {"n": "ベンジャミン・リー・ウォーフ", "en": "Benjamin Lee Whorf", "y": "1897-1941", "w": "ホピ語などの研究にもとづき、言語が認識の枠組みに関わると論じた", "wEn": "Argued, drawing on Hopi and other languages, that language bears on frameworks of perception."}, {"n": "デル・ハイムズ", "en": "Dell Hymes", "y": "1927-2009", "w": "コミュニケーションの民族誌を提唱し、言語使用の場面に注目する研究を広げた", "wEn": "Proposed the ethnography of communication and promoted research focused on the settings of speech."}, {"n": "フランツ・ボアズ", "en": "Franz Boas", "w": "米国の人類学の基礎を築き、先住民の諸言語を各言語固有の仕組みで記述する方針を示した。", "wEn": "Laid the foundations of American anthropology and set the policy of describing Native languages by their own structures.", "y": "1858-1942"}, {"n": "ケネス・パイク", "en": "Kenneth Pike", "w": "1954年に音声学と音素論に倣ってエミックとエティックの区別を示し、文化の分析に広げた。", "wEn": "In 1954 modeled emic and etic on phonetics and phonemics and extended the distinction to the analysis of culture.", "y": "1912-2000"}], "example": "ウォーフは火災保険の仕事で、「空」と呼ばれるガソリン缶の近くで人々が不注意に振る舞った事例を挙げ、語による分類が行動に影響すると論じた。", "exampleEn": "Working in fire insurance, Whorf cited cases of people behaving carelessly near gasoline drums labeled 'empty', and argued that categorization by words can affect behavior.", "related": ["social:sociolinguistics", "interdisciplinary:semiotics", "interdisciplinary:cognitive-ling", "historical:typology"]}, "social:dialectology": {"one": "言語の地域差を調べ、分布と成り立ちを探る分野", "oneEn": "Studies regional differences in language and the geography and history behind them.", "scope": "各地の話者に同じ質問をして語形や発音を集め、言語地図に表す。分布の境界や広がり方から、言語変化がどのように伝わったかや、地域どうしの接触の歴史を読み取る。", "scopeEn": "Collects words and pronunciations by asking speakers in many places the same questions, and plots them on linguistic maps. From boundaries and spread patterns it infers how changes were transmitted and how regions came into contact.", "concepts": [{"t": "等語線", "en": "isogloss", "d": "ある言語的特徴の分布の境界を地図上に引いた線", "dEn": "A line on a map marking the boundary of a linguistic feature's distribution."}, {"t": "方言連続体", "en": "dialect continuum", "d": "隣り合う地域の差は小さいが、遠く離れると通じにくくなる連なり", "dEn": "A chain of varieties where neighbors differ little but distant ones become hard to understand."}, {"t": "言語地図", "en": "linguistic atlas", "d": "語形や発音の地理的分布を調査にもとづいて示した地図", "dEn": "A survey-based map showing the geographic distribution of forms and pronunciations."}, {"t": "方言周圏論", "en": "concentric dialect distribution theory", "d": "文化の中心から遠い地域ほど古い語形が残るとする考え方", "dEn": "The view that regions farther from a cultural center preserve older forms."}, {"t": "波状理論", "en": "wave theory", "d": "言語変化が波紋のように周囲へ広がるとする見方", "dEn": "The view that linguistic changes spread outward like ripples."}, {"t": "コイネー化", "en": "koineization", "d": "方言どうしの接触で、共通の性格をもつ新しい変種が形づくられること", "dEn": "Formation of a new variety with shared, levelled features through contact between dialects."}, {"t": "言語島", "en": "language island", "d": "周囲と異なる言語や方言が、島のように孤立して話されている地域。", "dEn": "An area where a language or dialect different from its surroundings is spoken in isolation, like an island."}, {"t": "新方言", "en": "neo-dialect", "d": "古い方言とも共通語とも異なり、若い世代から広がった新しい方言形。", "dEn": "A new dialect form that differs from both the old dialect and the standard and spreads from younger speakers."}, {"t": "方言区画", "en": "dialect division", "d": "言語上の特徴の違いにより、一つの言語の話される地域を方言ごとに分けること。", "dEn": "Dividing the area of one language into dialect regions according to linguistic differences."}], "people": [{"n": "ゲオルク・ヴェンカー", "en": "Georg Wenker", "y": "1852-1911", "w": "1876年に学校への質問紙調査を始め、のちドイツ全域に広げて、ドイツ語の言語地図作成の基礎を築いた", "wEn": "Began a questionnaire survey of schools in 1876 and extended it across Germany, laying the foundation of German linguistic mapping."}, {"n": "柳田国男", "en": "Yanagita Kunio", "y": "1875-1962", "w": "『蝸牛考』(1930年)で、方言周圏論の代表的な例を示した", "wEn": "In 'Kagyuko' (1930) presented the best-known example of the dialect geography theory."}, {"n": "ピーター・トラッドギル", "en": "Peter Trudgill", "y": "1943-", "w": "『Dialects in Contact』(1986年)で、方言接触と新しい変種の形成を論じた", "wEn": "Discussed dialect contact and the formation of new varieties in 'Dialects in Contact' (1986)."}, {"n": "ジュール・ジリエロン", "en": "Jules Gilliéron", "w": "『フランス言語地図』を編み、語形の地理的分布から語の変化を探る言語地理学を築いた。", "wEn": "Edited the Linguistic Atlas of France and founded linguistic geography, which traces word change through geographic distribution.", "y": "1854-1926"}, {"n": "東条操", "en": "Misao Tojo", "w": "国語の方言を東部・西部・九州などに分ける方言区画を示し、日本の方言学の基礎を築いた。", "wEn": "Proposed a division of Japanese dialects into eastern, western, Kyushu and other groups and laid the groundwork of Japanese dialectology.", "y": "1884-1966"}], "example": "柳田の整理では、「かたつむり」の呼び方は、京都を含む近畿のデデムシ系を中心に、外側へマイマイ系、カタツムリ系、ツブリ系、ナメクジ系とおおむね同心円状に分布する。", "exampleEn": "In Yanagita's arrangement, Japanese words for 'snail' are distributed roughly in concentric zones around the dedemushi type of the Kinki region including Kyoto, with maimai, katatsumuri, tsuburi and namekuji types appearing in order toward the outside.", "related": ["social:sociolinguistics", "historical:historical-ling", "historical:comparative-ling", "theoretical:phonetics"]}, "applied:language-education": {"one": "言語の教え方と学び方を設計し、その効果を検証する", "oneEn": "Designs how languages are taught and learned, and tests whether it works.", "scope": "外国語・第二言語・母語の教授法、カリキュラムとシラバスの設計、教材、評価を扱う。第二言語習得研究の知見を教室に生かし、授業の効果を観察、実験、アンケートで検証する。", "scopeEn": "Covers teaching methods, curriculum and syllabus design, materials and assessment for foreign, second and first languages. It applies findings from second language acquisition research and checks classroom effects through observation, experiments and surveys.", "concepts": [{"t": "コミュニカティブ・アプローチ", "en": "communicative approach", "d": "文法の正確さだけでなく、意味のやり取りを通じた言語使用を重んじる教授法", "dEn": "A teaching approach that values using language to exchange meaning, not only grammatical accuracy."}, {"t": "シラバス", "en": "syllabus", "d": "学習内容とその配列、到達目標を定めた指導計画", "dEn": "A teaching plan that fixes what is learned, in what order, and toward which goals."}, {"t": "CEFR", "en": "CEFR", "d": "A1からC2の6段階で言語能力を記述する欧州の共通参照枠", "dEn": "A European framework describing language ability on six levels from A1 to C2."}, {"t": "タスクベース言語教授法", "en": "task-based language teaching", "d": "目的のある課題の遂行を中心に授業を組み立てる方法", "dEn": "A method that builds lessons around carrying out purposeful tasks."}, {"t": "足場かけ", "en": "scaffolding", "d": "学習者が自力では難しい課題を、支援を徐々に減らしながら達成させる指導", "dEn": "Instruction that helps learners complete tasks beyond them, gradually withdrawing support."}, {"t": "文法訳読法", "en": "grammar-translation method", "d": "母語への訳と文法規則の説明で読解を中心に教える伝統的な方法", "dEn": "A traditional method that teaches reading through translation into the L1 and explicit grammar rules."}, {"t": "オーディオリンガル法", "en": "audiolingual method", "d": "模倣と反復の口頭練習で習慣を作る教授法。行動主義の学習観に基づく", "dEn": "A method that builds habits through imitation and drill, based on a behaviorist view of learning."}, {"t": "内容言語統合型学習", "en": "content and language integrated learning", "d": "教科の内容を外国語で学び、内容と言語を同時に伸ばす。欧州で広まった", "dEn": "Learning subject content through a foreign language to develop both together; widespread in Europe."}, {"t": "フォーカス・オン・フォーム", "en": "focus on form", "d": "意味中心の活動の途中で、必要に応じて学習者の注意を言語形式へ向ける", "dEn": "Drawing learners' attention to linguistic form as needed during meaning-centered activity."}], "people": [{"n": "ディル・ハイムズ", "en": "Dell Hymes", "y": "1927-2009", "w": "言語運用の社会的な適切さを含む「コミュニケーション能力」の概念を提唱した", "wEn": "Proposed the notion of communicative competence, which includes the social appropriateness of language use."}, {"n": "ヘンリー・ウィドウソン", "en": "Henry Widdowson", "y": "1935-", "w": "『コミュニケーションとしての言語教育』(Teaching Language as Communication, 1978)で、コミュニカティブな教授の考え方を論じた", "wEn": "Argued for communicative teaching in Teaching Language as Communication (1978)."}, {"n": "スティーブン・クラッシェン", "en": "Stephen Krashen", "y": "1941-", "w": "理解可能なインプットを重視する第二言語習得の仮説群を唱え、教授法の議論に影響を与えた", "wEn": "Put forward second language acquisition hypotheses stressing comprehensible input, influencing debates on teaching."}, {"n": "ハロルド・パーマー", "en": "Harold Palmer", "w": "口頭教授法を提唱し、1922年に来日して翌年に英語教授研究所を設立した", "wEn": "Advocated the oral method, came to Japan in 1922 and founded an institute for English teaching research the next year.", "y": "1877-1949"}, {"n": "チャールズ・フリーズ", "en": "Charles Fries", "w": "ミシガン大学に英語研究所を設け、構造言語学に基づく教授法を築いた", "wEn": "Founded the English Language Institute at Michigan and built a teaching approach on structural linguistics.", "y": "1887-1967"}], "example": "文法訳読法の授業では英文を日本語に訳して文法を説明する。コミュニカティブな授業では、道案内を聞き取って相手に伝えるなど、情報のやり取りが必要な課題を行う。", "exampleEn": "A grammar-translation lesson translates English sentences into Japanese and explains the grammar. A communicative lesson sets tasks that require exchanging information, such as listening to directions and passing them on to a partner.", "related": ["psycho:l2-acquisition", "applied:language-testing", "theoretical:pragmatics"]}, "applied:translation": {"one": "原文の意味と機能を別の言語で再現する営みを研究する", "oneEn": "Studies how the meaning and function of a text are recreated in another language.", "scope": "書かれたテキストを別の言語に移す過程と訳文を扱う。原文と訳文の対応関係(等価性)、翻訳の目的、文化差の処理を、訳文の比較分析、翻訳コーパス、翻訳者の行動観察で調べる。", "scopeEn": "Covers the process and product of moving written texts into another language. It examines equivalence between source and target, the purpose of translation and the handling of cultural differences, using comparative analysis, translation corpora and observation of translators.", "concepts": [{"t": "等価性", "en": "equivalence", "d": "原文と訳文の間で保たれるべき対応関係", "dEn": "The correspondence that should hold between a source text and its translation."}, {"t": "形式的等価と動的等価", "en": "formal and dynamic equivalence", "d": "原文の形を重んじる訳と、読み手への効果を重んじる訳の区別", "dEn": "The distinction between translation that keeps the form of the original and translation that keeps its effect on readers."}, {"t": "スコポス理論", "en": "Skopos theory", "d": "翻訳の目的を訳出方針の基準とする理論", "dEn": "A theory that takes the purpose of the translation as the criterion for translating."}, {"t": "異質化と同化", "en": "foreignization and domestication", "d": "原文の異質さを残す訳し方と、訳文の読者に自然な訳し方", "dEn": "Keeping the foreignness of the original versus making the text read naturally for the target audience."}, {"t": "ローカリゼーション", "en": "localization", "d": "製品や文書を対象地域の言語・文化に合わせて作り替える作業", "dEn": "Adapting a product or document to the language and culture of a target locale."}, {"t": "翻訳メモリ", "en": "translation memory", "d": "過去の訳文を原文と対にして蓄え、再利用する仕組み", "dEn": "A system that stores past translations paired with their sources for reuse."}, {"t": "翻訳シフト", "en": "translation shift", "d": "原文から訳文へ移る際に、品詞や文構造などが規則的にずれること", "dEn": "A systematic departure in word class or structure when moving from source to target text."}, {"t": "逆翻訳", "en": "back-translation", "d": "訳文を元の言語へ訳し戻し、誤訳や意味のずれを確かめる手法", "dEn": "Translating a translation back into the original language to check for errors and shifts of meaning."}, {"t": "ポストエディット", "en": "post-editing", "d": "機械翻訳の出力を人が直し、必要な品質に整える作業", "dEn": "Human revision of machine translation output to bring it to the required quality."}], "people": [{"n": "ユージン・ナイダ", "en": "Eugene Nida", "y": "1914-2011", "w": "『翻訳の科学に向けて』(Toward a Science of Translating, 1964)で形式的等価と動的等価を区別した", "wEn": "Distinguished formal and dynamic equivalence in Toward a Science of Translating (1964)."}, {"n": "ハンス・フェアメーア", "en": "Hans Vermeer", "y": "1930-2010", "w": "スコポス理論を提唱し、ライスとの共著(1984)で一般翻訳理論として体系化した", "wEn": "Proposed Skopos theory and systematized it as a general translation theory with Reiss (1984)."}, {"n": "ローレンス・ヴェヌティ", "en": "Lawrence Venuti", "y": "1953-", "w": "『翻訳者の不可視性』(The Translator's Invisibility, 1995)で、同化的な訳が主流の英語圏を批判した", "wEn": "Criticized the dominance of domesticating translation in The Translator's Invisibility (1995)."}, {"n": "ローマン・ヤコブソン", "en": "Roman Jakobson", "w": "1959年の論文で翻訳を言語内・言語間・記号間の三種に分けた", "wEn": "In a 1959 paper he divided translation into intralingual, interlingual and intersemiotic types.", "y": "1896-1982"}, {"n": "フリードリヒ・シュライアマハー", "en": "Friedrich Schleiermacher", "w": "1813年の講演で、訳者が読者を原作へ近づけるか原作を読者へ近づけるかを論じた", "wEn": "In an 1813 lecture he discussed whether the translator moves the reader toward the author or the author toward the reader.", "y": "1768-1834"}], "example": "契約書の翻訳では条文の形式を保つ訳が求められ、広告コピーでは読み手に同じ印象を与える別の表現に作り替える。同じ言語の組み合わせでも、目的で適切な訳が変わる。", "exampleEn": "A contract translation must preserve the form of its clauses, while an advertising slogan is recast so that it gives readers the same impression. Even for the same language pair, the appropriate translation depends on its purpose.", "related": ["applied:interpretation", "computational:mt", "theoretical:semantics", "applied:lexicography"]}, "applied:interpretation": {"one": "話し言葉を即時に別の言語へ移す技能と認知過程を研究する", "oneEn": "Studies the skills and cognitive processes of rendering speech into another language on the spot.", "scope": "逐次通訳、同時通訳、ウィスパリングなどの方式を対象に、聞きながら訳す際の認知負荷、記憶、訳出の質、通訳者の役割や倫理を研究する。実験、訳出の書き起こし分析、現場の観察を用いる。", "scopeEn": "Covers consecutive, simultaneous and whispered interpreting, studying cognitive load, memory, output quality, and the role and ethics of interpreters. Methods include experiments, analysis of transcribed renditions and fieldwork observation.", "concepts": [{"t": "逐次通訳", "en": "consecutive interpreting", "d": "話者の発言が区切られた後で、まとめて訳す方式", "dEn": "A mode in which the interpreter renders a passage after the speaker pauses."}, {"t": "同時通訳", "en": "simultaneous interpreting", "d": "話者の発言を聞きながら、ほぼ同時に訳す方式", "dEn": "A mode in which the interpreter renders speech almost as it is being spoken."}, {"t": "ノートテイキング", "en": "note-taking", "d": "逐次通訳で記憶を補うために、記号や略語で取るメモ", "dEn": "Notes in symbols and abbreviations that support memory in consecutive interpreting."}, {"t": "シャドーイング", "en": "shadowing", "d": "聞こえた音声をすぐに同じ言語で追いかけて発話する訓練", "dEn": "A drill of repeating heard speech immediately in the same language."}, {"t": "デコレージ", "en": "decalage", "d": "話者の発言と訳出との時間的なずれ(耳と口のずれ)", "dEn": "The time lag between the speaker's words and the interpreter's output."}, {"t": "努力モデル", "en": "Effort Models", "d": "聞く・訳す・記憶などの処理に限られた容量を配分するという考え方", "dEn": "A view in which limited processing capacity is divided among listening, production and memory."}, {"t": "ウィスパリング通訳", "en": "whispered interpreting", "d": "聞き手の耳元で小声で同時に訳す方式。少人数向けで機材が要らない", "dEn": "Interpreting simultaneously in a low voice at a listener's ear; suited to small groups and needing no equipment."}, {"t": "視訳", "en": "sight translation", "d": "原文を目で追いながら口頭で訳す技法。契約書や資料の場で使う", "dEn": "Rendering a written text aloud into another language as one reads; used with contracts and documents."}, {"t": "リレー通訳", "en": "relay interpreting", "d": "別の通訳者の訳出を原文として訳す方式。多言語会議で言語の組み合わせを補う", "dEn": "Interpreting from another interpreter's output; it fills gaps in language combinations at multilingual meetings."}], "people": [{"n": "ダニカ・セレスコビッチ", "en": "Danica Seleskovitch", "y": "1921-2001", "w": "パリ学派を率い、通訳を意味の理解と再表現の過程とみなす「意味の理論」を唱えた", "wEn": "Led the Paris school and advanced the interpretive theory of sense, treating interpreting as understanding and re-expressing meaning."}, {"n": "ダニエル・ジル", "en": "Daniel Gile", "y": "", "w": "「努力モデル」を提案し、同時通訳の誤りを処理容量の配分から説明した", "wEn": "Proposed the Effort Models, explaining interpreting errors through the allocation of processing capacity."}, {"n": "セシリア・ワーデンショー", "en": "Cecilia Wadensjo", "y": "1954-", "w": "Interpreting as Interaction (1998)で、対話通訳者を話者間のやり取りに参加する存在として捉えた", "wEn": "In Interpreting as Interaction (1998), treated dialogue interpreters as participants in the exchange between speakers."}, {"n": "レオン・ドスタート", "en": "Leon Dostert", "w": "ニュルンベルク裁判で同時通訳の態勢づくりを率い、のちに機械翻訳の実験も進めた", "wEn": "Led the organization of simultaneous interpreting at the Nuremberg trials and later pursued machine translation experiments.", "y": "1904-1971"}, {"n": "ジャン・エルベール", "en": "Jean Herbert", "w": "1952年に会議通訳の手引書を著した先駆者で、国連の初期の通訳部門で働いた", "wEn": "A pioneer who wrote a conference interpreter's handbook in 1952 and worked in the early UN interpreting service.", "y": "1897-1980"}], "example": "国際会議の同時通訳者は、話者の発言から数秒遅れて訳し始める。この遅れの間に文の続きを予測しながら、すでに聞いた部分を声に出して訳していく。", "exampleEn": "A conference simultaneous interpreter starts a few seconds behind the speaker. During that lag the interpreter predicts how the sentence will continue while voicing a translation of what has already been heard.", "related": ["applied:translation", "psycho:psycholinguistics", "applied:medical-business-ling"]}, "applied:lexicography": {"one": "辞書の設計と編纂の原理を、語の記述として研究する", "oneEn": "Studies the principles of designing and compiling dictionaries as a way of describing words.", "scope": "収録語の選び方、見出しの配列、語義の区分、定義の書き方、用例の選定を扱う。現代の編纂ではコーパスの頻度や用例を根拠にし、利用者が辞書をどう引くかの調査も行う。", "scopeEn": "Covers the selection of entries, ordering of headwords, division of senses, writing of definitions and choice of examples. Modern compilation relies on corpus frequency and examples, and research also looks at how users consult dictionaries.", "concepts": [{"t": "見出し語", "en": "headword", "d": "辞書の項目の先頭に立てる、その語の代表となる形", "dEn": "The representative form under which a word is listed in a dictionary."}, {"t": "マクロ構造とミクロ構造", "en": "macrostructure and microstructure", "d": "辞書全体の配列と、一つの項目内の情報の並びの区別", "dEn": "The distinction between the arrangement of the whole dictionary and the information within one entry."}, {"t": "語義区分", "en": "sense division", "d": "一つの語の意味をどこで分けて記述するかの判断", "dEn": "The decision about where to divide the meanings of a word in the description."}, {"t": "記述的辞書と規範的辞書", "en": "descriptive and prescriptive dictionaries", "d": "実際の使用を記録する辞書と、望ましい用法を示す辞書の区別", "dEn": "Dictionaries that record actual usage versus those that prescribe preferred usage."}, {"t": "コーパスに基づく編纂", "en": "corpus-based compilation", "d": "大量の実例の頻度や用例を根拠に語義や用例を決める方法", "dEn": "Deciding senses and examples from the frequency and instances found in large text collections."}, {"t": "学習者用辞書", "en": "learner's dictionary", "d": "語学学習者向けに、平易な定義語で作られた辞書", "dEn": "A dictionary designed for language learners, using simple defining vocabulary."}, {"t": "定義語彙", "en": "defining vocabulary", "d": "語義説明に使う語を限った語彙。学習者用辞書では約2000語に絞る例がある", "dEn": "A restricted word list used to write definitions; some learner's dictionaries limit it to about 2,000 words."}, {"t": "逆引き辞書", "en": "reverse dictionary", "d": "語を語末から並べた辞書。語尾が共通する語や語形成を調べられる", "dEn": "A dictionary that orders words by their endings, useful for finding words with shared suffixes."}, {"t": "歴史的辞書", "en": "historical dictionary", "d": "語の意味や形の変遷を、年代順の用例で示す辞書。OEDが代表", "dEn": "A dictionary tracing changes in meaning and form through dated examples; the OED is the leading case."}], "people": [{"n": "サミュエル・ジョンソン", "en": "Samuel Johnson", "y": "1709-1784", "w": "『英語辞典』(A Dictionary of the English Language, 1755)を編み、文学作品からの引用を用例に用いた", "wEn": "Compiled A Dictionary of the English Language (1755), using literary quotations as examples."}, {"n": "ジェームズ・マレー", "en": "James Murray", "y": "1837-1915", "w": "『オックスフォード英語辞典』の編集主幹として編纂を主導した", "wEn": "Led the compilation of the Oxford English Dictionary as its editor."}, {"n": "ジョン・シンクレア", "en": "John Sinclair", "y": "1933-2007", "w": "コーパスに基づく学習者用辞書COBUILD(1987)の編纂を主導した", "wEn": "Led the compilation of the corpus-based learner's dictionary COBUILD (1987)."}, {"n": "ノア・ウェブスター", "en": "Noah Webster", "w": "1828年に『アメリカ英語辞典』を刊行し、綴りの米国式への改革も進めた", "wEn": "Published An American Dictionary of the English Language in 1828 and promoted American spelling reform.", "y": "1758-1843"}, {"n": "A・S・ホーンビー", "en": "A. S. Hornby", "w": "日本で英語を教えた経験をもとに学習者用英英辞典を編み、オックスフォード版の原型をつくった", "wEn": "Drew on teaching English in Japan to compile a learner's English dictionary, the basis of the Oxford learner's series.", "y": "1898-1978"}], "example": "綴りが同じbankは「銀行」と「土手」で語源が異なるため、別の項目に立てる。一方、一つの語の多義は同じ項目内で語義を分ける。この線引きが編纂上の典型的な判断になる。", "exampleEn": "Bank meaning a financial institution and bank meaning a river edge differ in origin, so they get separate entries. The senses of a single polysemous word are divided within one entry. Drawing this line is a typical compiling decision.", "related": ["computational:corpus", "theoretical:semantics", "applied:language-education"]}, "applied:language-testing": {"one": "言語能力を測る検査の設計と、その質を検証する", "oneEn": "Designs tests of language ability and checks their quality.", "scope": "言語能力の測定と評価を扱う。テストが測りたい能力を測れているか(妥当性)と結果が安定しているか(信頼性)を、統計分析や採点者の研究で検証し、試験が教育や社会に与える影響も調べる。", "scopeEn": "Covers the measurement and assessment of language ability. It checks whether a test measures what it intends to (validity) and whether results are stable (reliability), using statistical analysis and rater studies, and it also studies the effects of tests on education and society.", "concepts": [{"t": "妥当性", "en": "validity", "d": "テストが測ろうとするものを正しく測れているかという性質", "dEn": "The extent to which a test measures what it is meant to measure."}, {"t": "信頼性", "en": "reliability", "d": "同じ条件で測ったときに結果がどれだけ一貫し安定しているか", "dEn": "The consistency and stability of measurement results."}, {"t": "ウォッシュバック効果", "en": "washback effect", "d": "テストが指導や学習に及ぼす影響", "dEn": "The influence of a test on teaching and learning."}, {"t": "熟達度テストと到達度テスト", "en": "proficiency and achievement tests", "d": "一般的な能力を測る検査と、特定の授業内容の習得度を測る検査", "dEn": "Tests of general ability versus tests of mastery of specific course content."}, {"t": "項目反応理論", "en": "Item Response Theory", "d": "受験者の能力と問題の難しさから正答の確率をモデル化する理論", "dEn": "A theory that models the probability of a correct answer from examinee ability and item difficulty."}, {"t": "標準設定", "en": "standard setting", "d": "合否や等級の境となるカットスコアを定める手続き", "dEn": "The procedure for setting cut scores that separate pass/fail or levels."}, {"t": "構成概念妥当性", "en": "construct validity", "d": "テストの得点が、測ろうとする能力の理論的な意味に合っているかという妥当性", "dEn": "Validity concerning whether scores fit the theoretical meaning of the ability being measured."}, {"t": "評価者間信頼性", "en": "inter-rater reliability", "d": "複数の採点者が同じ答案に同じ評価をつけるかという一致の度合い", "dEn": "The degree to which several raters give the same rating to the same response."}, {"t": "ルーブリック", "en": "rubric", "d": "評価の観点と各段階の基準を表にした採点の指針", "dEn": "A scoring guide that tabulates the criteria and the level descriptions for each."}], "people": [{"n": "ロバート・ラド", "en": "Robert Lado", "y": "1915-1995", "w": "『言語テスト』(Language Testing, 1961)で、外国語テストの作成法を体系的に論じた", "wEn": "Treated the construction of foreign language tests systematically in Language Testing (1961)."}, {"n": "ライル・バックマン", "en": "Lyle Bachman", "y": "1944-", "w": "Fundamental Considerations in Language Testing (1990)で、コミュニケーション言語能力に基づくテストの枠組みを示した", "wEn": "Set out a framework for tests based on communicative language ability in Fundamental Considerations in Language Testing (1990)."}, {"n": "サミュエル・メシック", "en": "Samuel Messick", "y": "1931-1998", "w": "妥当性を、得点の解釈と使用の根拠を問う一つの統合的な概念として論じた(1989年の論考)", "wEn": "Argued that validity is a unified concept concerning the evidence for interpreting and using scores (1989)."}, {"n": "ゲオルク・ラッシュ", "en": "Georg Rasch", "y": "1901-1980", "w": "『知能・学力検査の確率モデル』(1960)で、受験者の能力と問題の難しさで正答を説明する確率モデルを示した", "wEn": "In Probabilistic Models for Some Intelligence and Attainment Tests (1960), he gave a model explaining correct answers by ability and item difficulty."}, {"n": "ジョン・キャロル", "en": "John B. Carroll", "y": "1916-2003", "w": "1961年の論文で、外国人留学生の英語力を測る試験に必要な基本的な考え方を論じた", "wEn": "In a 1961 paper, he discussed the basic considerations for testing the English proficiency of foreign students."}], "example": "話す試験を入試に導入すると、授業で口頭練習が増える。試験の内容が指導と学習のあり方を方向づけるこの現象が、ウォッシュバック効果である。", "exampleEn": "When a speaking test is introduced into entrance exams, classes spend more time on oral practice. This effect of test content on how teaching and learning are carried out is the washback effect.", "related": ["applied:language-education", "psycho:l2-acquisition", "computational:corpus"]}, "applied:forensic-ling": {"one": "法的な場面の言語を分析し、証拠や鑑定に生かす", "oneEn": "Analyzes language in legal settings for use as evidence and expert opinion.", "scope": "法律文書の言語、取り調べや法廷のやり取り、脅迫文などの証拠テキストを扱う。著者推定、音声の比較、商標の類似判断などで言語学の分析を用い、結果の確からしさを統計や確率で示す。", "scopeEn": "Covers the language of legal documents, police interviews and courtroom talk, and evidential texts such as threatening letters. Linguistic analysis is used for authorship attribution, voice comparison and trademark similarity, with the strength of results expressed statistically or probabilistically.", "concepts": [{"t": "著者推定", "en": "authorship attribution", "d": "文章の特徴から書き手を推定する手法", "dEn": "A method of inferring the writer of a text from its features."}, {"t": "イディオレクト", "en": "idiolect", "d": "個人に特有の言語使用のパターン", "dEn": "The pattern of language use peculiar to an individual."}, {"t": "言語的証拠", "en": "linguistic evidence", "d": "法的手続きで用いられる言語分析の結果", "dEn": "Results of language analysis used in legal proceedings."}, {"t": "話者鑑定", "en": "forensic speaker comparison", "d": "録音された音声の特徴を比べ、同一の話者かを検討する作業", "dEn": "Comparing features of recorded voices to assess whether they come from the same speaker."}, {"t": "尤度比", "en": "likelihood ratio", "d": "証拠が二つの仮説のもとで得られる確率の比で示す、鑑定結果の表し方", "dEn": "A way of reporting results as the ratio of the probability of the evidence under two hypotheses."}, {"t": "普通名称化", "en": "genericide", "d": "商標が商品の一般名として使われるようになる現象", "dEn": "The process by which a trademark comes to be used as the generic name of a product."}, {"t": "計量文体学", "en": "stylometry", "d": "語や文字列の頻度など数えられる特徴から文体を比べ、書き手を推定する研究", "dEn": "The study of comparing styles by countable features such as word or character frequencies, to infer a writer."}, {"t": "ミランダ警告", "en": "Miranda warning", "d": "米国で取り調べの前に、黙秘権や弁護人を求める権利などを告げる手続き", "dEn": "In the US, the notice of rights such as silence and counsel given before questioning."}, {"t": "誘導尋問", "en": "leading question", "d": "尋問者が望む答えを示唆する聞き方。答えが質問の形に引きずられやすい", "dEn": "A question whose form suggests the answer the questioner wants, so answers tend to follow it."}], "people": [{"n": "ヤン・スヴァルトヴィク", "en": "Jan Svartvik", "y": "1931-2024", "w": "The Evans Statements (1968)で供述調書の言語分析を行い、法言語学という語を打ち出した", "wEn": "Analyzed the language of police statements in The Evans Statements (1968), which introduced the term forensic linguistics."}, {"n": "マルコム・コールサード", "en": "Malcolm Coulthard", "y": "1943-", "w": "ベントレー事件の供述調書を分析するなど、法言語学の発展に寄与した", "wEn": "Contributed to the growth of forensic linguistics, including his analysis of the statements in the Bentley case."}, {"n": "ロジャー・シュイ", "en": "Roger Shuy", "y": "1931-", "w": "Language Crimes (1993)で、法廷での言語証拠の使われ方を紹介した", "wEn": "Described how language evidence is used in court in Language Crimes (1993)."}, {"n": "フレデリック・モステラー", "en": "Frederick Mosteller", "y": "1916-2006", "w": "ウォレスとの共著(1964)で、『ザ・フェデラリスト』の争われた論文の著者を機能語の頻度から統計的に推定した", "wEn": "In his 1964 book with Wallace, he estimated statistically from function-word frequencies who wrote the disputed Federalist papers."}, {"n": "ピーター・ティアズマ", "en": "Peter Tiersma", "y": "1952-2014", "w": "『法の言語』(Legal Language, 1999)で、法律文の特徴と歴史を論じ、言語学の立場から法を分析した", "wEn": "In Legal Language (1999), he discussed the features and history of legal texts and analyzed law from a linguistic standpoint."}], "example": "脅迫状の語の選び方、綴りの癖、句読点の使い方を、容疑者の文章と比べて同じ書き手かを検討する。個人に固有の言語使用の癖(イディオレクト)が手がかりになる。", "exampleEn": "Word choice, spelling habits and punctuation in a threatening letter are compared with a suspect's writing to judge whether the same person wrote them. The habits of language use peculiar to an individual (idiolect) serve as clues.", "related": ["interdisciplinary:discourse-analysis", "theoretical:phonetics", "theoretical:pragmatics", "interdisciplinary:stylistics"]}, "applied:medical-business-ling": {"one": "医療や職場での言語使用を調べ、伝わるやり取りを探る", "oneEn": "Examines language use in healthcare and the workplace to find what makes communication work.", "scope": "診察室での医師と患者の対話、説明や同意の文書、ビジネスの会議・メール・交渉を、談話分析や語用論の方法で調べる。誤解が生じる原因を明らかにし、平易な言い換えや研修などの改善策に結びつける。", "scopeEn": "Studies doctor-patient talk, explanation and consent documents, and business meetings, emails and negotiations with the methods of discourse analysis and pragmatics. It identifies causes of misunderstanding and links them to remedies such as plain rewording and training.", "concepts": [{"t": "プレイン・ランゲージ", "en": "plain language", "d": "明確で分かりやすい表現を目指す言語使用の方針", "dEn": "A policy of language use aiming at clear, easily understood expression."}, {"t": "語用論的失敗", "en": "pragmatic failure", "d": "話し手の意図と異なる解釈を招く、文脈に依存した誤解", "dEn": "A context-dependent misunderstanding in which an utterance is interpreted differently from what was intended."}, {"t": "医療通訳", "en": "medical interpreting", "d": "医療現場で患者と医療者の間をつなぐ通訳活動", "dEn": "Interpreting that links patients and clinicians in healthcare settings."}, {"t": "インフォームド・コンセント", "en": "informed consent", "d": "十分な説明を受けたうえで患者が同意する手続き", "dEn": "The procedure in which a patient agrees after receiving adequate explanation."}, {"t": "ティーチバック", "en": "teach-back", "d": "説明した内容を患者自身の言葉で言い返してもらう確認法", "dEn": "A check in which the patient restates the explanation in their own words."}, {"t": "ヘッジ表現", "en": "hedging", "d": "断定を和らげ、発言の確からしさや強さを調整する表現", "dEn": "Expressions that soften assertions and adjust the certainty or force of a statement."}, {"t": "特定目的の英語", "en": "English for Specific Purposes", "d": "医療やビジネスなど、特定の職業や分野で必要な英語に絞った教育", "dEn": "Teaching limited to the English needed in a particular profession or field, such as medicine or business."}, {"t": "ジャンル分析", "en": "genre analysis", "d": "ある集団が共有する目的に沿った文章や談話の型と、その構成を調べる方法", "dEn": "A method of studying the types of texts and talk shaped by a group's shared purposes, and their structure."}, {"t": "共同意思決定", "en": "shared decision-making", "d": "医療者と患者が情報を出し合い、治療方針を一緒に決める進め方", "dEn": "A process in which clinician and patient share information and decide on treatment together."}], "people": [{"n": "エリオット・ミッシュラー", "en": "Elliot Mishler", "y": "1924-2018", "w": "The Discourse of Medicine (1984)で、診察での対話を医学の声と生活世界の声の対立として分析した", "wEn": "Analyzed medical interviews as a contrast between the voice of medicine and the voice of the lifeworld in The Discourse of Medicine (1984)."}, {"n": "キャンディス・ウェスト", "en": "Candace West", "y": "", "w": "Routine Complications (1984)で、医師と患者の会話の進み方を会話分析の方法で調べた", "wEn": "Examined how doctor-patient talk unfolds, using conversation analysis, in Routine Complications (1984)."}, {"n": "ビジャイ・バティア", "en": "Vijay Bhatia", "y": "", "w": "Analysing Genre (1993)で、職業場面の文書をジャンル分析の観点から論じた", "wEn": "Discussed workplace texts from the standpoint of genre analysis in Analysing Genre (1993)."}, {"n": "ジョン・スウェールズ", "en": "John Swales", "y": "1938-2025", "w": "『ジャンル分析』(Genre Analysis, 1990)で、学術論文の型を調べ、ジャンルの考え方を英語教育に広めた", "wEn": "In Genre Analysis (1990), he studied the patterns of academic texts and spread the genre approach in English teaching."}, {"n": "デボラ・タネン", "en": "Deborah Tannen", "y": "1945-", "w": "『9時から5時まで話す』(Talking from 9 to 5, 1994)で、職場の会話での話し方の違いを論じた", "wEn": "In Talking from 9 to 5 (1994), she discussed differences in conversational style at work."}], "example": "医師が「悪性腫瘍」と告げても患者に伝わらないことがある。「がん」と言い換え、説明の後に患者自身の言葉で言い返してもらうと、理解の程度を確かめられる。", "exampleEn": "A patient may not understand when a doctor says the technical term malignant tumor. Rephrasing it as cancer, then asking the patient to say the explanation back in their own words, shows how much has been understood.", "related": ["interdisciplinary:discourse-analysis", "theoretical:pragmatics", "social:sociolinguistics", "applied:interpretation"]}, "historical:historical-ling": {"one": "言語が時間とともにどう変わるかを探る分野", "oneEn": "The study of how languages change over time and why.", "scope": "音・形態・統語・意味・語彙が世代を経てどう変化するかを、古い文献資料と現在の方言差、比較法・内的再建法による復元を使って調べる。変化の規則性と要因、広がり方が主な問いである。", "scopeEn": "It examines how sound, morphology, syntax, meaning and vocabulary change across generations, using old texts, present-day dialect differences, and reconstruction by the comparative method and internal reconstruction. Key questions are the regularity, causes and spread of change.", "concepts": [{"t": "音韻変化", "en": "sound change", "d": "ある音が体系的に別の音へ移る変化。条件が同じなら例外なく起こるとされる。", "dEn": "A systematic shift of one sound into another, held to apply without exception under the same conditions."}, {"t": "類推", "en": "analogy", "d": "規則的な形に引かれて不規則な形が作り替えられる変化。", "dEn": "Change in which irregular forms are remodeled on the pattern of regular ones."}, {"t": "文法化", "en": "grammaticalization", "d": "内容語が機能語や文法要素へ変わっていく過程。", "dEn": "The process by which content words develop into function words or grammatical markers."}, {"t": "内的再建法", "en": "internal reconstruction", "d": "一つの言語内の不規則な交替から、より古い段階の形を推定する方法。", "dEn": "A method that infers earlier forms from irregular alternations within a single language."}, {"t": "語彙拡散", "en": "lexical diffusion", "d": "音変化が語ごとに少しずつ広がるとする見方。", "dEn": "The view that a sound change spreads gradually from word to word."}, {"t": "借用", "en": "borrowing", "d": "他の言語から語や要素を取り入れ、言語が変わる経路。", "dEn": "A route of change in which words or features are taken in from another language."}, {"t": "青年文法学派", "en": "Neogrammarians", "d": "1870年代後半にドイツで興った学派。音法則に例外はないと主張した。", "dEn": "A school that arose in Germany in the late 1870s, claiming that sound laws admit no exceptions."}, {"t": "言語接触", "en": "language contact", "d": "異なる言語の話者が交流し、語彙や構造が影響し合うこと。", "dEn": "Mutual influence on vocabulary and structure when speakers of different languages interact."}, {"t": "意味変化", "en": "semantic change", "d": "語の意味が時代とともに広がる、狭まる、移るなどして変わること。", "dEn": "Change in a word's meaning over time by broadening, narrowing, shifting and so on."}], "people": [{"n": "ヤーコプ・グリム", "en": "Jacob Grimm", "y": "1785-1863", "w": "ゲルマン語の子音推移を体系的に記述した(いわゆるグリムの法則)。", "wEn": "Described the Germanic consonant shift systematically (Grimm's Law)."}, {"n": "カール・ヴェルナー", "en": "Karl Verner", "y": "1846-1896", "w": "1870年代半ばに、グリムの法則の見かけの例外をアクセントの位置で説明した(ヴェルナーの法則)。", "wEn": "In the mid-1870s explained apparent exceptions to Grimm's Law by the position of the accent (Verner's Law)."}, {"n": "ウィリアム・ラボフ", "en": "William Labov", "y": "1927-2024", "w": "進行中の音変化を実測する社会言語学的手法で、変化の研究を進めた。", "wEn": "Advanced the study of change by measuring sound change in progress through sociolinguistic methods."}, {"n": "カール・ブルクマン", "en": "Karl Brugmann", "y": "1849-1919", "w": "オストホフと1878年に青年文法学派の宣言を書き、印欧語比較文法の大著も著した。", "wEn": "With Osthoff he wrote the 1878 manifesto of the Neogrammarians and also authored a major Indo-European comparative grammar."}, {"n": "ヘルマン・パウル", "en": "Hermann Paul", "y": "1846-1921", "w": "1880年の『言語史原理』で、青年文法学派の言語変化論を体系的にまとめた。", "wEn": "His 1880 Principles of Language History systematized the Neogrammarian account of language change."}], "example": "英語の knight の k は中英語では発音されていたが後に消え、綴りだけが残った。綴りは発音の古い段階を映す化石になる。", "exampleEn": "The k of English 'knight' was pronounced in Middle English and later lost, while the spelling stayed. Spelling can thus preserve an older stage of pronunciation like a fossil.", "related": ["historical:comparative-ling", "theoretical:phonology", "social:sociolinguistics", "interdisciplinary:functional-ling"]}, "historical:comparative-ling": {"one": "言語どうしの血縁関係を比べて調べる分野", "oneEn": "The study of genetic relationships among languages by comparison.", "scope": "複数の言語から同根語を集め、規則的な音対応を確かめて、共通の祖語の形を再構築する。そのうえで言語の系統関係と語族内の下位分類を組み立てる。比較法が中心の方法である。", "scopeEn": "It collects cognates from several languages, checks regular sound correspondences, and reconstructs the forms of their common proto-language. From this it builds genetic relationships and subgroupings within a family. The comparative method is the central tool.", "concepts": [{"t": "同根語", "en": "cognate", "d": "共通の祖先語に由来する語。語形や意味が似ていても借用語とは区別する。", "dEn": "A word descended from a common ancestor, distinguished from loanwords even if they look similar."}, {"t": "音対応", "en": "sound correspondence", "d": "同根語どうしに見られる規則的な音の対応。系統関係の根拠になる。", "dEn": "Regular sound matches among cognates, serving as evidence of genetic relationship."}, {"t": "祖語", "en": "proto-language", "d": "比較法で再構築される仮説上の共通祖先言語。形には * を付す。", "dEn": "A hypothetical common ancestor reconstructed by the comparative method; forms are marked with *."}, {"t": "共有革新", "en": "shared innovation", "d": "下位グループだけが共有する新しい変化。分類の決め手になる。", "dEn": "A new change shared only by a subgroup, which is decisive for subgrouping."}, {"t": "語族", "en": "language family", "d": "共通の祖語から分かれた言語のまとまり。", "dEn": "A group of languages descended from a common proto-language."}, {"t": "語彙年代学", "en": "glottochronology", "d": "基礎語彙の置換率から分岐年代を推定する手法。信頼性には批判が多い。", "dEn": "A method estimating split dates from basic-vocabulary replacement; its reliability is widely criticized."}, {"t": "比較法", "en": "comparative method", "d": "同根語の音対応を集め、祖語の形と音変化を再建する手続き。", "dEn": "A procedure that gathers sound correspondences among cognates to reconstruct proto-forms and sound changes."}, {"t": "言語孤立", "en": "language isolate", "d": "他のどの言語とも系統関係が示されていない言語。バスク語が代表例。", "dEn": "A language with no demonstrated genetic relationship to any other; Basque is a leading example."}, {"t": "基礎語彙", "en": "basic vocabulary", "d": "身体部位や数詞など、借用されにくい日常語。系統判定の材料になる。", "dEn": "Everyday words such as body parts and numerals that are rarely borrowed; evidence for judging relationship."}], "people": [{"n": "ウィリアム・ジョーンズ", "en": "William Jones", "y": "1746-1794", "w": "1786年の講演で、サンスクリット語がギリシア語やラテン語と共通の源をもつ可能性を述べた。", "wEn": "In a 1786 lecture suggested that Sanskrit may share a common source with Greek and Latin."}, {"n": "フランツ・ボップ", "en": "Franz Bopp", "y": "1791-1867", "w": "インド・ヨーロッパ諸語の動詞活用を比較し、比較文法の基礎を築いた。", "wEn": "Compared verb conjugation across Indo-European languages and helped found comparative grammar."}, {"n": "ラスムス・ラスク", "en": "Rasmus Rask", "y": "1787-1832", "w": "古ノルド語など北方諸語の研究で、語の対応の規則性に注目した。", "wEn": "Studied Old Norse and related languages and stressed the regularity of word correspondences."}, {"n": "アウグスト・シュライヒャー", "en": "August Schleicher", "y": "1821-1868", "w": "1861年の『印欧語比較文法綱要』で、印欧祖語の再建形を体系的に示した。", "wEn": "In his 1861 Compendium of Indo-European comparative grammar he systematically presented reconstructed Proto-Indo-European forms."}, {"n": "アントワーヌ・メイエ", "en": "Antoine Meillet", "y": "1866-1936", "w": "1903年の『印欧語比較研究序説』で、比較法の方法を整理した。", "wEn": "In his 1903 introduction to the comparative study of Indo-European languages he laid out the method of comparison."}], "example": "英語 father、ドイツ語 Vater、ラテン語 pater の対応から、印欧祖語の *ph2ter が再構される。p と f の対応は規則的である。", "exampleEn": "English 'father', German 'Vater' and Latin 'pater' point to Proto-Indo-European *ph2ter. The correspondence between p and f recurs regularly across the vocabulary.", "related": ["historical:historical-ling", "historical:typology", "social:dialectology"]}, "historical:typology": {"one": "言語の構造を世界規模で比べて分類する分野", "oneEn": "The study of structural types and patterns across the world's languages.", "scope": "語順、格標示、形態の複雑さなどの構造的特徴を、系統に関係なく多くの言語で比べる。型の分布を調べ、言語に共通する傾向や含意関係を見つけ出すことが目的である。", "scopeEn": "It compares structural features such as word order, case marking and morphological complexity across many languages regardless of ancestry. The aim is to map the distribution of types and to find shared tendencies and implicational relations.", "concepts": [{"t": "語順類型", "en": "word order type", "d": "主語・目的語・動詞の基本的な並び方(SOV、SVO など)による分類。", "dEn": "Classification by basic order of subject, object and verb, such as SOV or SVO."}, {"t": "含意的普遍性", "en": "implicational universal", "d": "ある特徴をもつ言語は別の特徴ももつ、という形の一般化。", "dEn": "A generalization of the form: languages with one feature also have another."}, {"t": "能格性", "en": "ergativity", "d": "自動詞の主語と他動詞の目的語を同じに扱う標示の型。", "dEn": "An alignment type treating the intransitive subject and the transitive object alike."}, {"t": "形態類型", "en": "morphological type", "d": "孤立語・膠着語・屈折語などの語の組み立て方による分類。", "dEn": "Classification by how words are built, such as isolating, agglutinative or fusional."}, {"t": "有標性", "en": "markedness", "d": "対立する二項のうち、特殊で制限のある側を有標とする考え方。", "dEn": "The idea that, in a pair of opposites, the more restricted or special member is marked."}, {"t": "主要部標示と依存部標示", "en": "head/dependent marking", "d": "句の関係を主要部と依存部のどちらに示すかの違い。", "dEn": "A difference in whether a phrase relation is marked on the head or on the dependent."}, {"t": "抱合", "en": "polysynthesis", "d": "名詞などを動詞に取り込み、一語で文に近い内容を表す語形成の型。", "dEn": "A word-formation type that packs nouns and other material into the verb so one word can express a whole clause."}, {"t": "有生性階層", "en": "animacy hierarchy", "d": "人間・動物・無生物の順に、生き物らしさの度合いを並べた序列。", "dEn": "A ranking of referents by animacy, from humans through animals to inanimate things."}, {"t": "分裂能格", "en": "split ergativity", "d": "時制や人称などの条件で、能格型と対格型が使い分けられる体系。", "dEn": "A system in which ergative and accusative patterns are used under conditions such as tense or person."}], "people": [{"n": "ジョゼフ・グリーンバーグ", "en": "Joseph Greenberg", "y": "1915-2001", "w": "1963年の論文で、語順を中心とする言語普遍性を多数の言語から提案した。", "wEn": "In a 1963 paper proposed universals centered on word order from a sample of many languages."}, {"n": "バーナード・コムリー", "en": "Bernard Comrie", "y": "1947-", "w": "『言語普遍性と言語類型論』(1981年)で類型論の方法を体系的に紹介した。", "wEn": "Presented the methods of typology systematically in 'Language Universals and Linguistic Typology' (1981)."}, {"n": "ジョアンナ・ニコルズ", "en": "Johanna Nichols", "y": "1945-", "w": "主要部標示と依存部標示の区別を提示し、言語特徴の地理的分布を論じた。", "wEn": "Set out the head-marking versus dependent-marking distinction and discussed the geographic distribution of features."}, {"n": "ヴィルヘルム・フォン・フンボルト", "en": "Wilhelm von Humboldt", "w": "言語を孤立・膠着・屈折・抱合の型に分け、言語の構造と精神の関係を論じた。", "wEn": "Divided languages into isolating, agglutinating, inflecting and incorporating types and discussed how language structure relates to the mind.", "y": "1767-1835"}, {"n": "ローマン・ヤコブソン", "en": "Roman Jakobson", "w": "音の習得と失語の順序から音韻の普遍的な含意関係を示し、有標性の考えを広めた。", "wEn": "Showed implicational universals in phonology from the order of sound acquisition and loss in aphasia, and spread the idea of markedness.", "y": "1896-1982"}], "example": "日本語は SOV で後置詞をもち、英語は SVO で前置詞をもつ。語順と付置詞の組み合わせには、世界の言語で偏りが見られる。", "exampleEn": "Japanese is SOV with postpositions, and English is SVO with prepositions. Across the world's languages, combinations of verb order and adposition order show a marked skew.", "related": ["historical:comparative-ling", "theoretical:syntax", "theoretical:morphology", "interdisciplinary:functional-ling"]}, "computational:corpus": {"one": "実際の言語使用データから言語の傾向を調べる", "oneEn": "Studying language patterns through large collections of real language use", "scope": "話し言葉や書き言葉を大量に集めたコーパスを、頻度・共起・用例検索などの統計的手法で分析し、語彙や文法の実際の使われ方を記述する分野。内省に頼らず観察可能な証拠から出発する。", "scopeEn": "This field analyzes large collections of spoken and written texts (corpora) with frequency, co-occurrence, and concordance methods to describe how vocabulary and grammar are actually used, starting from observable evidence rather than introspection.", "concepts": [{"t": "コーパス", "en": "corpus", "d": "実際の言語使用を一定の基準で集めたデータ集合", "dEn": "A principled collection of authentic language use, stored in machine-readable form"}, {"t": "コンコーダンス", "en": "concordance", "d": "検索語を文脈つきで一覧にしたもの(KWIC形式が代表的)", "dEn": "A listing of a search word with its surrounding context, typically in KWIC format"}, {"t": "コロケーション", "en": "collocation", "d": "慣習的に共起しやすい語どうしの結びつき", "dEn": "The habitual tendency of certain words to occur together"}, {"t": "均衡性と代表性", "en": "balance and representativeness", "d": "対象とする言語変種を偏りなく反映させる設計上の条件", "dEn": "Design criteria for reflecting the target language variety without skew"}, {"t": "頻度と共起強度", "en": "frequency and association measures", "d": "出現回数や相互情報量などで語の結びつきを数値化する", "dEn": "Quantifying word links through counts and measures such as mutual information"}, {"t": "アノテーション", "en": "annotation", "d": "品詞や構文などの言語情報をコーパスに付与すること", "dEn": "Adding linguistic information such as parts of speech or syntax to a corpus"}, {"t": "ジップの法則", "en": "Zipf's law", "d": "語の頻度が頻度順位にほぼ反比例するという経験則", "dEn": "The empirical rule that a word's frequency is roughly inversely proportional to its frequency rank."}, {"t": "キーワード分析", "en": "keyword analysis", "d": "参照コーパスと比べ対象コーパスで際立って多い語を抽出する", "dEn": "Extracting words that are markedly more frequent in a target corpus than in a reference corpus."}, {"t": "nグラム", "en": "n-gram", "d": "連続するn個の語や文字の並び。頻度を数えて分析に使う", "dEn": "A sequence of n consecutive words or characters whose frequencies are counted for analysis."}], "people": [{"n": "ジョン・シンクレア", "en": "John Sinclair", "y": "1933-2007", "w": "コーパスに基づく辞書COBUILDの編纂を主導し、コロケーションや語彙文法の研究を進めた", "wEn": "Led the corpus-based COBUILD dictionary project and advanced work on collocation and lexical grammar"}, {"n": "ランドルフ・クワーク", "en": "Randolph Quirk", "y": "1920-2017", "w": "英語用法調査(Survey of English Usage)を創設し、英語の包括的文法書の編者の一人となった", "wEn": "Founded the Survey of English Usage and co-authored comprehensive grammars of English"}, {"n": "W・ネルソン・フランシス", "en": "W. Nelson Francis", "y": "1910-2002", "w": "ヘンリー・クチェラとともに、100万語規模のブラウン・コーパスを作成した", "wEn": "Created the one-million-word Brown Corpus together with Henry Kucera"}, {"n": "ジェフリー・リーチ", "en": "Geoffrey Leech", "w": "ランカスター大学の言語学者。LOBコーパスの編纂と品詞自動タグ付け(CLAWS)の開発に関わった", "wEn": "Lancaster linguist who helped compile the LOB Corpus and develop the CLAWS automatic part-of-speech tagger.", "y": "1936-2014"}, {"n": "ヘンリー・クチェラ", "en": "Henry Kucera", "w": "ブラウン大学の言語学者。W・N・フランシスとともに最初期の電子コーパスの一つ、ブラウン・コーパスを編纂した", "wEn": "Brown University linguist who, with W. N. Francis, compiled the Brown Corpus, one of the first electronic corpora.", "y": "1925-2010"}], "example": "ブラウン・コーパスは1961年刊行の資料から採った約100万語の英語コーパスで、1960年代に計算機で扱える形で作られ、のちのコーパス設計の手本となった。", "exampleEn": "The Brown Corpus, a roughly one-million-word corpus of American English drawn from 1961 publications and compiled in machine-readable form in the 1960s, served as a model for later corpus design.", "related": ["computational:nlp", "applied:lexicography", "interdisciplinary:functional-ling", "psycho:l2-acquisition"]}, "computational:nlp": {"one": "人間の言語を計算機で処理・理解・生成する", "oneEn": "Processing, understanding, and generating human language by computer", "scope": "文章や会話を計算機で扱うための技術を研究する分野。形態素解析・構文解析・意味解析などの要素技術から、質問応答・要約・分類といった応用タスクまでを、規則・統計・ニューラルネットワークで実現する。", "scopeEn": "This field develops techniques for handling text and dialogue by computer, from components such as morphological, syntactic, and semantic analysis to applications such as question answering, summarization, and classification, using rules, statistics, and neural networks.", "concepts": [{"t": "トークン化", "en": "tokenization", "d": "テキストを単語や部分語などの処理単位に分けること", "dEn": "Splitting text into processing units such as words or subwords"}, {"t": "形態素解析", "en": "morphological analysis", "d": "文を形態素に分割し品詞や活用形を判定する処理", "dEn": "Segmenting a sentence into morphemes and determining their parts of speech and forms"}, {"t": "構文解析", "en": "parsing", "d": "文の句構造や依存関係を求める処理", "dEn": "Determining the phrase structure or dependency relations of a sentence"}, {"t": "固有表現認識", "en": "named entity recognition", "d": "人名・地名・組織名などの言及を見つけて分類するタスク", "dEn": "Finding and classifying mentions of people, places, organizations, and similar names"}, {"t": "単語埋め込み", "en": "word embedding", "d": "単語を意味の近さを反映した密なベクトルで表す手法", "dEn": "Representing words as dense vectors that reflect semantic similarity"}, {"t": "言語モデル", "en": "language model", "d": "語の並びの出現しやすさを確率で表すモデル", "dEn": "A model that assigns probabilities to sequences of words"}, {"t": "品詞タグ付け", "en": "part-of-speech tagging", "d": "文中の各語に名詞・動詞などの品詞ラベルを付ける処理", "dEn": "Assigning a part-of-speech label such as noun or verb to each word in a sentence."}, {"t": "語義曖昧性解消", "en": "word sense disambiguation", "d": "多義語が文脈の中でどの意味で使われているかを決めるタスク", "dEn": "The task of deciding which sense of a polysemous word is used in context."}, {"t": "共参照解析", "en": "coreference resolution", "d": "同じ対象を指す「彼」や固有名などの表現を結びつけるタスク", "dEn": "The task of linking expressions such as pronouns and names that refer to the same entity."}], "people": [{"n": "ジョセフ・ワイゼンバウム", "en": "Joseph Weizenbaum", "y": "1923-2008", "w": "対話プログラムELIZAを1960年代に発表し、人と計算機の対話研究に影響を与えた", "wEn": "Published the dialogue program ELIZA in the 1960s, influencing research on human-computer conversation"}, {"n": "テリー・ウィノグラード", "en": "Terry Winograd", "y": "1946-", "w": "積み木の世界で英語の指示を理解するシステムSHRDLUを開発した", "wEn": "Developed SHRDLU, a system that understood English instructions in a blocks world"}, {"n": "トマス・ミコロフ", "en": "Tomas Mikolov", "y": "1982-", "w": "2013年にword2vecを発表し、単語埋め込みを広く普及させた", "wEn": "Introduced word2vec in 2013, popularizing word embeddings"}, {"n": "カレン・スパーク・ジョーンズ", "en": "Karen Sparck Jones", "w": "1972年に語の希少性で重みを付けるIDFの考えを示し、情報検索と言語処理の橋渡しをした", "wEn": "Introduced the idea of weighting terms by rarity (IDF) in 1972 and bridged information retrieval and language processing.", "y": "1935-2007"}, {"n": "ロジャー・シャンク", "en": "Roger Schank", "w": "概念依存理論を唱え、文の意味を基本的な行為の組で表して言語理解を計算機で扱おうとした", "wEn": "Proposed conceptual dependency theory, representing sentence meaning with primitive acts to model language understanding.", "y": "1946-2023"}], "example": "「時間は矢のように飛ぶ」のように、一つの文が複数の構造に解釈できる曖昧文は、構文解析が単なる品詞の並べ替えでは済まないことを示す古典的な例である。", "exampleEn": "Ambiguous sentences such as 'Time flies like an arrow', which allow several structural readings, are a classic demonstration that parsing is more than simply sequencing parts of speech.", "related": ["computational:corpus", "computational:llm", "theoretical:syntax", "theoretical:semantics"]}, "computational:speech-processing": {"one": "音声を計算機で認識・合成・分析する", "oneEn": "Recognizing, synthesizing, and analyzing speech by computer", "scope": "音声信号をデジタルデータとして扱い、音声認識・音声合成・話者認識などを実現する分野。音響学と音声学の知識に加え、確率モデルやニューラルネットワークで音と文字の対応を学習する。", "scopeEn": "This field treats speech signals as digital data to realize speech recognition, synthesis, and speaker recognition. It combines acoustics and phonetics with probabilistic and neural models that learn the mapping between sounds and text.", "concepts": [{"t": "音声認識", "en": "automatic speech recognition", "d": "音声を文字列に変換する技術(ASR)", "dEn": "Technology that converts speech into text (ASR)"}, {"t": "音声合成", "en": "text-to-speech synthesis", "d": "文字列から音声を生成する技術(TTS)", "dEn": "Technology that generates speech from text (TTS)"}, {"t": "スペクトログラム", "en": "spectrogram", "d": "音の周波数成分の時間変化を図に表したもの", "dEn": "A plot showing how the frequency content of sound changes over time"}, {"t": "MFCC", "en": "mel-frequency cepstral coefficients", "d": "聴覚特性を考慮した伝統的な音声特徴量", "dEn": "A traditional speech feature designed to reflect human hearing"}, {"t": "隠れマルコフモデル", "en": "hidden Markov model", "d": "音の系列を確率的状態遷移でモデル化する手法", "dEn": "A method that models sound sequences with probabilistic state transitions"}, {"t": "単語誤り率", "en": "word error rate", "d": "認識結果と正解の差を単語単位で測る評価指標(WER)", "dEn": "An evaluation metric measuring differences between output and reference at the word level"}, {"t": "音響モデル", "en": "acoustic model", "d": "音声の特徴量と音素などの単位との対応を確率で表すモデル", "dEn": "A model that expresses, in probabilities, how speech features correspond to units such as phonemes."}, {"t": "ボコーダ", "en": "vocoder", "d": "音の特徴量から音声波形を作り出す装置やモデル", "dEn": "A device or model that produces a speech waveform from sound features."}, {"t": "CTC", "en": "connectionist temporal classification", "d": "音声と文字列の対応位置が不明でも系列を学習できる損失の枠組み", "dEn": "A loss framework that learns sequences even when alignment between audio and text is unknown."}], "people": [{"n": "グンナー・ファント", "en": "Gunnar Fant", "y": "1919-2009", "w": "音声生成の音源フィルタ理論を体系化し、『音声生成の音響理論』(1960年)を著した", "wEn": "Systematized the source-filter theory of speech production in Acoustic Theory of Speech Production (1960)"}, {"n": "ホーマー・ダドリー", "en": "Homer Dudley", "y": "1896-1980", "w": "ボコーダーを開発し、音声を電気的に合成・圧縮する研究の先駆けとなった", "wEn": "Developed the vocoder, pioneering the electrical synthesis and compression of speech"}, {"n": "フレデリック・ジェリネク", "en": "Frederick Jelinek", "y": "1932-2010", "w": "IBMで統計的手法による音声認識を推進し、確率モデルの利用を広めた", "wEn": "Promoted statistical speech recognition at IBM and spread the use of probabilistic models"}, {"n": "ローレンス・ラビナー", "en": "Lawrence Rabiner", "w": "ベル研究所などで音声処理を研究し、1989年の隠れマルコフモデルの解説論文で音声認識への普及に貢献した", "wEn": "Speech researcher at Bell Labs and elsewhere whose 1989 tutorial on hidden Markov models helped spread them in speech recognition.", "y": "1943-"}, {"n": "ラージ・レディ", "en": "Raj Reddy", "w": "カーネギーメロン大学で大語彙の連続音声認識を開拓し、Hearsayなどの音声理解システムを手がけた", "wEn": "Pioneered large-vocabulary continuous speech recognition at Carnegie Mellon and worked on speech understanding systems such as Hearsay.", "y": "1937-"}], "example": "同じ「あ」でも話者や前後の音で波形は大きく変わる。この変動の中から同じ音を取り出す難しさが、音声認識に統計的なモデルが必要とされた理由である。", "exampleEn": "Even the same vowel produces very different waveforms depending on the speaker and neighboring sounds; the difficulty of extracting the same sound from this variation is why speech recognition needed statistical models.", "related": ["theoretical:phonetics", "theoretical:phonology", "computational:nlp", "computational:llm"]}, "computational:mt": {"one": "ある言語の文を計算機で別の言語に訳す", "oneEn": "Translating text from one language to another by computer", "scope": "原文を目的言語の文へ自動的に変換する技術を研究する分野。規則に基づく方式、対訳コーパスから学ぶ統計的方式、ニューラルネットワークによる方式へと発展し、訳質の自動評価も扱う。", "scopeEn": "This field studies automatic conversion of source text into a target language. Approaches have developed from rule-based methods to statistical methods learned from parallel corpora and then neural networks, and the field also covers automatic evaluation of translation quality.", "concepts": [{"t": "規則に基づく翻訳", "en": "rule-based machine translation", "d": "言語学者が書いた文法規則と辞書で訳す方式", "dEn": "Translation using grammar rules and dictionaries written by linguists"}, {"t": "統計的機械翻訳", "en": "statistical machine translation", "d": "対訳コーパスから翻訳の確率を学習する方式", "dEn": "An approach that learns translation probabilities from parallel corpora"}, {"t": "ニューラル機械翻訳", "en": "neural machine translation", "d": "ニューラルネットワークで文全体を一括して訳す方式", "dEn": "An approach that translates whole sentences with a single neural network"}, {"t": "単語アライメント", "en": "word alignment", "d": "対訳文の中で対応する単語や句を結びつけること", "dEn": "Linking corresponding words or phrases within a sentence pair"}, {"t": "対訳コーパス", "en": "parallel corpus", "d": "原文とその翻訳を対にして集めたデータ", "dEn": "A collection of source texts paired with their translations"}, {"t": "自動評価指標", "en": "automatic evaluation metric", "d": "BLEUなど、参照訳との近さで訳質を測る指標", "dEn": "Metrics such as BLEU that score quality by closeness to reference translations"}, {"t": "ビームサーチ", "en": "beam search", "d": "有望な部分訳の候補を一定数だけ残しながら訳文を組み立てる探索", "dEn": "A search that builds a translation while keeping only a fixed number of promising partial candidates."}, {"t": "サブワード分割", "en": "subword segmentation", "d": "語を頻出する部分文字列に分け、未知語にも対応する手法", "dEn": "Splitting words into frequent substrings so that unseen words can still be handled."}, {"t": "用例ベース翻訳", "en": "example-based machine translation", "d": "過去の対訳例を探し、似た例を組み合わせて訳す方式", "dEn": "A method that retrieves past translation examples and combines similar ones to translate."}], "people": [{"n": "ウォーレン・ウィーバー", "en": "Warren Weaver", "y": "1894-1978", "w": "1949年の覚書『翻訳』で、計算機による翻訳の可能性を提起した", "wEn": "Raised the possibility of computer translation in his 1949 memorandum 'Translation'"}, {"n": "イェホシュア・バーヒレル", "en": "Yehoshua Bar-Hillel", "y": "1915-1975", "w": "完全自動の高品質翻訳は困難だと論じ、人間の介在を含む翻訳を主張した", "wEn": "Argued that fully automatic high-quality translation was infeasible and favored human involvement"}, {"n": "ピーター・ブラウン", "en": "Peter F. Brown", "y": "1955-", "w": "IBMの研究者で、統計的機械翻訳のIBMモデルを体系化した1993年の論文の筆頭著者", "wEn": "IBM researcher and first author of the 1993 paper that systematized the IBM models of statistical machine translation"}, {"n": "マーガレット・マスターマン", "en": "Margaret Masterman", "w": "ケンブリッジ言語研究ユニットを創設し、意味ネットワークを用いる機械翻訳と情報検索を研究した", "wEn": "Founded the Cambridge Language Research Unit and studied machine translation and retrieval using semantic networks.", "y": "1910-1986"}, {"n": "長尾真", "en": "Makoto Nagao", "w": "1984年に用例に基づく機械翻訳の考えを提案した情報学者。後に京都大学の総長を務めた", "wEn": "Information scientist who proposed example-based machine translation in 1984; later president of Kyoto University.", "y": "1936-2021"}], "example": "1954年のジョージタウン=IBM実験では、ロシア語の文を英語に自動で訳す公開デモが行われた。語彙も文数も限られていたが、機械翻訳への関心を一気に高めた。", "exampleEn": "The 1954 Georgetown-IBM experiment publicly demonstrated automatic Russian-to-English translation. Its vocabulary and sentences were very limited, yet it greatly raised interest in machine translation.", "related": ["applied:translation", "computational:nlp", "computational:llm", "historical:typology"]}, "computational:ir": {"one": "大量の文書から求める情報を探し出す", "oneEn": "Finding the information a user needs within large document collections", "scope": "利用者の問い合わせに合う文書を大量の集合から検索し、順位づけする技術を研究する分野。索引の作り方、語の重みづけ、検索結果の評価方法が中心で、近年は意味的な類似度も使う。", "scopeEn": "This field studies techniques for retrieving and ranking documents that match a user's query from large collections. Its core topics are index construction, term weighting, and evaluation of results, with semantic similarity increasingly used in recent years.", "concepts": [{"t": "転置インデックス", "en": "inverted index", "d": "語がどの文書に出現するかを記録した索引構造", "dEn": "An index structure recording which documents each term appears in"}, {"t": "TF-IDF", "en": "TF-IDF", "d": "語の出現頻度と希少性から文書内での重要度を測る重み", "dEn": "A weight combining term frequency and rarity to measure a term's importance in a document"}, {"t": "ベクトル空間モデル", "en": "vector space model", "d": "文書と検索語をベクトルで表し類似度で順位づけする", "dEn": "Representing documents and queries as vectors and ranking by similarity"}, {"t": "適合率と再現率", "en": "precision and recall", "d": "検索結果の正確さと網羅性を測る二つの指標", "dEn": "Two measures of how accurate and how complete the retrieved results are"}, {"t": "BM25", "en": "BM25", "d": "語の頻度と文書長を考慮する確率的なランキング関数", "dEn": "A probabilistic ranking function that accounts for term frequency and document length"}, {"t": "クエリ拡張", "en": "query expansion", "d": "同義語などを検索語に加えて取りこぼしを減らす手法", "dEn": "Adding synonyms and related terms to a query to reduce missed documents"}, {"t": "適合性フィードバック", "en": "relevance feedback", "d": "利用者が関連と判定した結果を使い、検索語や順位を改善する手法", "dEn": "A method that uses results a user judged relevant to improve the query or the ranking."}, {"t": "ストップワード", "en": "stop word", "d": "「の」「the」など頻出で区別力が低く、索引から除くことが多い語", "dEn": "Very frequent words such as 'the' with little discriminating power, often left out of the index."}, {"t": "テストコレクション", "en": "test collection", "d": "文書集合・検索課題・正解の関連判定を組にした評価用データ", "dEn": "An evaluation resource pairing a document set, search topics and relevance judgments."}], "people": [{"n": "ジェラルド・サルトン", "en": "Gerard Salton", "y": "1927-1995", "w": "SMART検索システムを率い、ベクトル空間モデルによる検索を発展させた", "wEn": "Led the SMART retrieval system and developed vector space model retrieval"}, {"n": "カレン・スパルク・ジョーンズ", "en": "Karen Sparck Jones", "y": "1935-2007", "w": "1972年に逆文書頻度(IDF)の考え方を提案した", "wEn": "Proposed the idea of inverse document frequency (IDF) in 1972"}, {"n": "スティーブン・ロバートソン", "en": "Stephen Robertson", "y": "1946-", "w": "確率的検索モデルを研究し、BM25の開発に中心的に関わった", "wEn": "Researched probabilistic retrieval models and played a central role in developing BM25"}, {"n": "ハンス・ペーター・ルーン", "en": "Hans Peter Luhn", "w": "IBMで語の出現頻度に基づく自動索引づけや自動抄録を研究した", "wEn": "Researched automatic indexing and abstracting based on word frequency at IBM.", "y": "1896-1964"}, {"n": "シリル・クレバードン", "en": "Cyril Cleverdon", "w": "クランフィールド実験を主導し、適合率と再現率による検索評価の土台を築いた", "wEn": "Led the Cranfield experiments and laid the groundwork for evaluating retrieval by precision and recall.", "y": "1914-1997"}], "example": "検索語「銀行」に対し、金融機関の文書と川岸の文書が混ざって返される。語の一致だけでは意味の違いを区別できないことが、情報検索の古典的な課題である。", "exampleEn": "For the query 'bank', documents about financial institutions and riverbanks may both be returned. That word matching alone cannot separate senses is a classic problem of information retrieval.", "related": ["computational:corpus", "computational:nlp", "computational:llm", "computational:knowledge-rep:knowledge-graph"]}, "computational:llm": {"one": "大規模な文章データで学習した言語モデル", "oneEn": "Language models trained on very large amounts of text", "scope": "膨大な文章で次の語を予測するよう学習したニューラルネットワークを研究する分野。Transformerを基盤とし、事前学習と微調整、プロンプトによる指示、評価や安全性、事実性の問題を扱う。", "scopeEn": "This field studies neural networks trained to predict the next word on enormous amounts of text. Built on the Transformer, it covers pretraining and fine-tuning, instruction by prompting, evaluation, safety, and factuality.", "concepts": [{"t": "Transformer", "en": "Transformer", "d": "注意機構を中心とし、並列処理に向く系列モデルの構造", "dEn": "A sequence-model architecture built around attention and well suited to parallel processing"}, {"t": "事前学習", "en": "pretraining", "d": "大量の文章で一般的な言語の知識をあらかじめ学習する段階", "dEn": "The stage of learning general language knowledge from large amounts of text beforehand"}, {"t": "ファインチューニング", "en": "fine-tuning", "d": "特定の課題向けに追加の学習でモデルを調整すること", "dEn": "Adjusting a model through additional training for a particular task"}, {"t": "プロンプト", "en": "prompt", "d": "モデルに与える指示や例を含む入力文", "dEn": "The input text, including instructions or examples, given to a model"}, {"t": "トークン", "en": "token", "d": "モデルが処理する最小の言語単位", "dEn": "The smallest unit of language a model processes"}, {"t": "RAG", "en": "retrieval-augmented generation", "d": "外部の文書を検索して生成の根拠に使う手法", "dEn": "A method that retrieves external documents and uses them as grounds for generation"}, {"t": "文脈内学習", "en": "in-context learning", "d": "プロンプトに例を示すだけで、重みを更新せずに新しい課題をこなす", "dEn": "Doing a new task from examples in the prompt alone, without updating any weights."}, {"t": "スケーリング則", "en": "scaling law", "d": "モデルの大きさ・データ量・計算量と性能の関係を表す経験則", "dEn": "An empirical rule linking model size, data and compute to performance."}, {"t": "RLHF", "en": "reinforcement learning from human feedback", "d": "人間による好みの評価を報酬にして、出力を調整する強化学習", "dEn": "Reinforcement learning that uses human preference judgments as the reward to tune outputs."}], "people": [{"n": "クロード・シャノン", "en": "Claude Shannon", "y": "1916-2001", "w": "1948年の論文で情報理論を築き、英語の文字列を確率的に近似する例も示した", "wEn": "Founded information theory in his 1948 paper, which also showed probabilistic approximations of English text"}, {"n": "アシシュ・ヴァスワニ", "en": "Ashish Vaswani", "y": "1986-", "w": "2017年の論文『Attention Is All You Need』の筆頭著者として、Transformerを提案した", "wEn": "Lead author of the 2017 paper 'Attention Is All You Need', which proposed the Transformer"}, {"n": "ジェイコブ・デブリン", "en": "Jacob Devlin", "y": "", "w": "2018年にBERTを発表した論文の筆頭著者", "wEn": "Lead author of the 2018 paper introducing BERT"}, {"n": "フレデリック・イェリネク", "en": "Frederick Jelinek", "w": "IBMで音声認識に統計的な言語モデルを持ち込み、研究を率いた", "wEn": "Led IBM research that brought statistical language models into speech recognition.", "y": "1932-2010"}, {"n": "ヨシュア・ベンジオ", "en": "Yoshua Bengio", "w": "2003年にニューラル確率言語モデルを発表し、語を連続ベクトルで表す道を開いた", "wEn": "Published the neural probabilistic language model in 2003, opening the way to continuous word vectors.", "y": "1964-"}], "example": "文の続きを予測するだけの学習でも、モデルが大規模になると翻訳や要約など多くの課題を指示だけでこなすようになる。この性質が、LLMへの関心を高めた。", "exampleEn": "Even when trained only to predict what comes next, sufficiently large models can carry out many tasks such as translation and summarization from instructions alone, which raised interest in LLMs.", "related": ["computational:nlp", "computational:ir", "computational:mt", "interdisciplinary:philosophy-language"]}, "computational:knowledge-rep:ontology": {"one": "ある領域の概念と関係を形式的に定義する", "oneEn": "Formally defining the concepts and relations of a domain", "scope": "ある分野で使う概念、その性質、概念どうしの関係を、計算機が扱える形で明示的に定義する分野。語彙の共有と意味の統一を目的とし、クラス階層や公理を設計する。哲学の存在論を語源とする。", "scopeEn": "This field explicitly defines, in machine-processable form, the concepts of a domain, their properties, and the relations among them. It aims at shared vocabulary and consistent meaning by designing class hierarchies and axioms. The term derives from ontology in philosophy.", "concepts": [{"t": "概念化の明示的仕様", "en": "explicit specification of a conceptualization", "d": "オントロジーを定義するときによく引かれるグルーバーの定式化", "dEn": "Gruber's formulation, often cited as a definition of an ontology"}, {"t": "クラスと個体", "en": "class and individual", "d": "概念の種類と、その具体的な事例を区別する", "dEn": "The distinction between a kind of concept and its concrete instances"}, {"t": "is-a関係", "en": "is-a relation", "d": "下位概念が上位概念に含まれることを表す関係", "dEn": "The relation stating that a subconcept falls under a superconcept"}, {"t": "プロパティ", "en": "property", "d": "概念の性質や、概念どうしを結ぶ関係", "dEn": "An attribute of a concept or a relation connecting concepts"}, {"t": "上位オントロジー", "en": "upper ontology", "d": "特定分野に依存しない最上位の汎用概念を定めたもの", "dEn": "An ontology of top-level general concepts independent of any particular domain"}, {"t": "語彙の再利用", "en": "vocabulary reuse", "d": "共通の定義を共有してシステム間の相互運用を図る", "dEn": "Sharing common definitions to enable interoperability between systems"}, {"t": "公理", "en": "axiom", "d": "概念の関係について常に成り立つと定める、推論の出発点となる文", "dEn": "A statement fixed as always true about concepts, serving as a starting point for inference."}, {"t": "オントロジーアライメント", "en": "ontology alignment", "d": "別々のオントロジーの概念どうしの対応を見つけて結ぶ作業", "dEn": "The work of finding and linking corresponding concepts across separate ontologies."}, {"t": "記述論理", "en": "description logic", "d": "概念と役割を扱う論理の一族で、OWLの理論的な土台になる", "dEn": "A family of logics for concepts and roles that underpins OWL."}], "people": [{"n": "アリストテレス", "en": "Aristotle", "y": "前384-前322", "w": "『カテゴリー論』などで、存在するものを種類ごとに分ける考察を示した", "wEn": "Examined how to divide what exists into kinds, notably in the Categories"}, {"n": "トーマス・グルーバー", "en": "Thomas Gruber", "y": "1959-", "w": "1993年の論文で、オントロジーを概念化の明示的な仕様と定義した", "wEn": "Defined an ontology as an explicit specification of a conceptualization in a 1993 paper"}, {"n": "ニコラ・グアリーノ", "en": "Nicola Guarino", "y": "1954-", "w": "形式オントロジーの研究を進め、情報システムへの応用を論じた", "wEn": "Advanced formal ontology and discussed its application to information systems"}, {"n": "ダグラス・レナト", "en": "Douglas Lenat", "w": "1984年にCycを始め、常識を論理で書き込む巨大な知識ベースを築いた", "wEn": "Started Cyc in 1984 and built a huge knowledge base encoding common sense in logic.", "y": "1950-2023"}, {"n": "クリスティアン・ヴォルフ", "en": "Christian Wolff", "w": "『第一哲学あるいは存在論』を著し、オントロジーを体系的な学問に整えた", "wEn": "Wrote a work on first philosophy or ontology and shaped ontology into a systematic discipline.", "y": "1679-1754"}], "example": "「犬は哺乳類の一種であり、哺乳類は動物の一種である」という階層を定義すると、「犬は動物である」という結論を計算機が自動で導ける。", "exampleEn": "If one defines that a dog is a kind of mammal and a mammal is a kind of animal, a computer can automatically derive that a dog is an animal.", "related": ["computational:knowledge-rep:knowledge-graph", "computational:knowledge-rep:owl", "computational:knowledge-rep:reasoning", "interdisciplinary:philosophy-language"]}, "computational:knowledge-rep:knowledge-graph": {"one": "実体と関係をグラフで表した知識のネットワーク", "oneEn": "A network of knowledge expressing entities and relations as a graph", "scope": "人物・場所・作品などの実体を節点、それらの関係を辺として結び、大量の事実を表す知識表現。構築、実体の同定、欠けた関係の補完、検索や質問応答への利用を扱う。", "scopeEn": "A knowledge representation in which entities such as people, places, and works are nodes and their relations are edges, expressing large numbers of facts. It covers construction, entity identification, completion of missing relations, and use in search and question answering.", "concepts": [{"t": "エンティティ", "en": "entity", "d": "人物や場所など、グラフ上の節点になる実体", "dEn": "A real-world thing, such as a person or place, that forms a node in the graph"}, {"t": "関係(辺)", "en": "relation", "d": "実体どうしを結び、意味を持つ有向の結びつき", "dEn": "A meaningful, directed link connecting entities"}, {"t": "トリプル", "en": "triple", "d": "主語・述語・目的語の三つ組で一つの事実を表す", "dEn": "A subject-predicate-object triple expressing a single fact"}, {"t": "エンティティリンキング", "en": "entity linking", "d": "文中の言及を知識ベース上の実体へ対応づける処理", "dEn": "Mapping mentions in text to entities in a knowledge base"}, {"t": "知識グラフ補完", "en": "knowledge graph completion", "d": "欠けている事実や関係を推定して補う課題", "dEn": "The task of inferring and filling in missing facts or relations"}, {"t": "リンクトデータ", "en": "Linked Data", "d": "ウェブ上の識別子で実体を結びつけて公開する原則", "dEn": "Principles for publishing data by linking entities through web identifiers"}, {"t": "知識グラフ埋め込み", "en": "knowledge graph embedding", "d": "実体と関係をベクトルにし、欠けた事実の推定に使う手法", "dEn": "A method that turns entities and relations into vectors, used to infer missing facts."}, {"t": "関係抽出", "en": "relation extraction", "d": "文章から実体どうしの関係を見つけ、三つ組として取り出す処理", "dEn": "The task of finding relations between entities in text and extracting them as triples."}, {"t": "プロパティグラフ", "en": "property graph", "d": "節点と辺のそれぞれに属性を持たせられるグラフの形式", "dEn": "A graph model in which both nodes and edges can carry attributes."}], "people": [{"n": "ロス・キリアン", "en": "M. Ross Quillian", "y": "", "w": "1960年代に意味ネットワークによる記憶のモデルを提案した", "wEn": "Proposed a semantic-network model of memory in the 1960s"}, {"n": "ティム・バーナーズ=リー", "en": "Tim Berners-Lee", "y": "1955-", "w": "2006年にリンクトデータの設計上の原則を示した", "wEn": "Set out design principles for Linked Data in 2006"}, {"n": "アミット・シンガル", "en": "Amit Singhal", "y": "1968-", "w": "2012年にGoogleのナレッジグラフを発表した際の中心人物", "wEn": "A leading figure in Google's 2012 announcement of its Knowledge Graph"}, {"n": "マービン・ミンスキー", "en": "Marvin Minsky", "w": "1974年にフレームの考えを示し、知識を構造にまとめて表す道を開いた", "wEn": "Set out the idea of frames in 1974, opening a way to represent knowledge as structured units.", "y": "1927-2016"}, {"n": "ジョン・ソーワ", "en": "John F. Sowa", "w": "意味ネットワークと論理を結ぶ概念グラフを考案し、著書『Conceptual Structures』で体系化した", "wEn": "Devised conceptual graphs linking semantic networks and logic, and systematized them in his book 'Conceptual Structures'.", "y": "1940-"}], "example": "検索エンジンで人物名を調べると生年・出身地・代表作が横に並ぶ。これは文字列の一致ではなく、その人物という実体と結びついた事実を引いて表示している。", "exampleEn": "When a search engine shows a person's birth year, birthplace, and major works beside the results, it draws on facts tied to that person as an entity rather than on string matching.", "related": ["computational:knowledge-rep:ontology", "computational:knowledge-rep:rdf", "computational:knowledge-rep:semantic-web", "computational:ir"]}, "computational:knowledge-rep:rdf": {"one": "データを主語・述語・目的語の三つ組で表す", "oneEn": "Expressing data as subject-predicate-object triples", "scope": "ウェブ上の情報を、主語・述語・目的語の三つ組(トリプル)と識別子(URI)で記述するW3Cの標準的なデータモデル。三つ組の集まりがグラフとなり、異なるデータの結合や問い合わせが可能になる。", "scopeEn": "A W3C standard data model that describes information on the web with subject-predicate-object triples and identifiers (URIs). A set of triples forms a graph, enabling different datasets to be combined and queried.", "concepts": [{"t": "トリプル", "en": "triple", "d": "主語・述語・目的語で一つの記述を表す基本単位", "dEn": "The basic unit expressing one statement with a subject, predicate, and object"}, {"t": "URI", "en": "URI", "d": "実体や関係をウェブ上で一意に指す識別子", "dEn": "An identifier that uniquely refers to an entity or relation on the web"}, {"t": "リテラル", "en": "literal", "d": "文字列や数値など、具体的な値をとる目的語", "dEn": "An object that is a concrete value such as a string or number"}, {"t": "RDFS", "en": "RDF Schema", "d": "RDFにクラスやプロパティの階層を加える語彙", "dEn": "A vocabulary adding class and property hierarchies to RDF"}, {"t": "SPARQL", "en": "SPARQL", "d": "RDFデータに対する問い合わせ言語", "dEn": "A query language for RDF data"}, {"t": "シリアライゼーション", "en": "serialization", "d": "Turtle、RDF/XMLなどRDFを文字列として書き出す形式", "dEn": "Formats such as Turtle and RDF/XML for writing RDF out as text"}, {"t": "空白ノード", "en": "blank node", "d": "URIもリテラルも持たず、名前なしで対象を表すノード", "dEn": "A node standing for something with neither a URI nor a literal, i.e. unnamed"}, {"t": "名前付きグラフ", "en": "named graph", "d": "トリプルの集まりにURIで名前を付け、出どころなどを記述する仕組み", "dEn": "A way to name a set of triples with a URI so that provenance can be described"}, {"t": "リイフィケーション", "en": "reification", "d": "RDFの記述そのものを対象として、別の記述を加える手法", "dEn": "A technique that treats an RDF statement as a subject of further statements"}], "people": [{"n": "オラ・ラッシラ", "en": "Ora Lassila", "y": "", "w": "RDFの初期仕様(1999年)に関わり、セマンティックWebの提唱者の一人となった", "wEn": "Contributed to the original RDF specification (1999) and co-authored the Semantic Web proposal"}, {"n": "ティム・バーナーズ=リー", "en": "Tim Berners-Lee", "y": "1955-", "w": "ウェブの発明者で、RDFを基盤とするセマンティックWebを提唱した", "wEn": "Inventor of the web and proponent of the RDF-based Semantic Web"}, {"n": "ダン・ブリックリー", "en": "Dan Brickley", "y": "", "w": "RDFスキーマ(RDFS)など、RDF語彙の標準化に関わった", "wEn": "Involved in standardizing RDF vocabularies such as RDF Schema"}, {"n": "R・V・グハ", "en": "R. V. Guha", "w": "ネットスケープ時代にRDFの前身となる記述形式を作り、W3Cの仕様づくりに加わった", "wEn": "Built a precursor of RDF at Netscape and took part in drafting the W3C specifications", "y": ""}, {"n": "パット・ヘイズ", "en": "Pat Hayes", "w": "知識表現を研究し、W3CのRDF意味論の仕様の編集者を務めた", "wEn": "Studied knowledge representation and served as editor of the W3C RDF semantics specification", "y": "1944-"}], "example": "「東京 は首都である 日本」のように事実を三つ組で書くと、別々の場所にあるデータでも同じ識別子で結びつけ、一つのグラフとして扱える。", "exampleEn": "When a fact is written as a triple, such as Tokyo - is capital of - Japan, data held in separate places can be linked through shared identifiers and handled as one graph.", "related": ["computational:knowledge-rep:owl", "computational:knowledge-rep:semantic-web", "computational:knowledge-rep:knowledge-graph"]}, "computational:knowledge-rep:owl": {"one": "RDFの上で概念の厳密な定義と推論を可能にする言語", "oneEn": "A language for precise concept definitions and reasoning on top of RDF", "scope": "概念やその関係を論理的に厳密に記述するW3Cの言語。記述論理に基づき、クラスの制約や性質の特性を定め、矛盾の検出や暗黙の事実の導出といった推論を機械に任せられる。", "scopeEn": "A W3C language for describing concepts and their relations with logical rigor. Based on description logics, it defines class restrictions and property characteristics, so that reasoners can detect inconsistencies and derive implicit facts.", "concepts": [{"t": "記述論理", "en": "description logic", "d": "OWLの論理的な基盤となる、推論可能性を重視した論理の族", "dEn": "The family of logics, designed with decidability in mind, that underlies OWL"}, {"t": "クラス制約", "en": "class restriction", "d": "クラスに属するための条件を形式的に定めたもの", "dEn": "A formally stated condition for membership in a class"}, {"t": "プロパティの特性", "en": "property characteristics", "d": "推移的・対称的など、関係が持つ性質の宣言", "dEn": "Declarations such as transitive or symmetric that describe how a relation behaves"}, {"t": "TBoxとABox", "en": "TBox and ABox", "d": "概念の一般的な定義と、個体に関する事実の区別", "dEn": "The distinction between general definitions of concepts and facts about individuals"}, {"t": "オープンワールド仮説", "en": "open world assumption", "d": "書かれていない事実を偽と決めつけない前提", "dEn": "The assumption that an unstated fact is not treated as false"}, {"t": "OWL 2とプロファイル", "en": "OWL 2 profiles", "d": "用途に応じて表現力と計算効率を調整した部分言語", "dEn": "Sublanguages that trade expressiveness against computational efficiency for particular uses"}, {"t": "OWL DLとOWL Full", "en": "OWL DL and OWL Full", "d": "決定可能性を保つ部分言語と、RDFと完全に互換な制約のない全体", "dEn": "A sublanguage that keeps decidability, and the unrestricted whole that is fully compatible with RDF"}, {"t": "カーディナリティ制約", "en": "cardinality restriction", "d": "プロパティの値の個数を、最小・最大・ちょうどで制限する条件", "dEn": "A condition limiting how many values a property may have: at least, at most or exactly"}, {"t": "同一個体の宣言", "en": "sameAs and differentFrom", "d": "異なる名前が同じ個体か別の個体かを、明示して宣言できる", "dEn": "Lets one state explicitly whether different names denote the same individual or different ones"}], "people": [{"n": "イアン・ホロックス", "en": "Ian Horrocks", "y": "1958-", "w": "記述論理の推論手法を研究し、OWLの設計に中心的に関わった", "wEn": "Researched reasoning for description logics and played a central role in designing OWL"}, {"n": "フランツ・バーダー", "en": "Franz Baader", "y": "1959-", "w": "記述論理の理論を体系化し、『記述論理ハンドブック』(2003年)を共同で編集した", "wEn": "Systematized description logic theory and co-edited The Description Logic Handbook (2003)"}, {"n": "ジェームズ・ヘンドラー", "en": "James Hendler", "y": "1957-", "w": "DAML計画などを通じ、セマンティックWebの言語の策定に関わった", "wEn": "Contributed to semantic web languages through efforts such as the DAML program"}, {"n": "マービン・ミンスキー", "en": "Marvin Minsky", "w": "フレームの考えを示し、記述論理に続く構造化された知識表現の流れを開いた", "wEn": "Proposed frames and opened the line of structured knowledge representation leading to description logics", "y": "1927-2016"}, {"n": "アルフレッド・タルスキ", "en": "Alfred Tarski", "w": "真理を定義するモデル理論的意味論を築き、論理の意味づけの標準となった", "wEn": "Built the model-theoretic semantics defining truth, the standard way to give logic its meaning", "y": "1901-1983"}], "example": "「親である」の逆を「子である」と宣言し、「祖先である」を推移的と宣言すれば、AがBの親でBがCの親という事実から、AがCの祖先であると推論できる。", "exampleEn": "If a relation is declared as the inverse of 'is a child of' and 'is an ancestor of' is declared transitive, a reasoner can infer from parent facts A-B and B-C that A is an ancestor of C.", "related": ["computational:knowledge-rep:rdf", "computational:knowledge-rep:ontology", "computational:knowledge-rep:reasoning", "computational:knowledge-rep:semantic-web"]}, "computational:knowledge-rep:semantic-web": {"one": "ウェブ上の情報を機械が意味で扱えるようにする構想", "oneEn": "A vision of making web information processable by machines by meaning", "scope": "ウェブ上の文書やデータに意味を表す構造化された記述を与え、計算機が情報を結びつけて利用できるようにする構想とその技術群。RDF、OWL、SPARQLなどのW3C標準が中心となる。", "scopeEn": "A vision, and the set of technologies behind it, of giving web documents and data structured descriptions of meaning so that computers can link and use information. W3C standards such as RDF, OWL, and SPARQL are its core.", "concepts": [{"t": "構造化データ", "en": "structured data", "d": "意味を機械が読める形で付与したデータ", "dEn": "Data annotated with meaning in a machine-readable form"}, {"t": "リンクトデータ", "en": "Linked Data", "d": "識別子で結び合わされた公開データの集まり", "dEn": "Openly published data connected to one another through identifiers"}, {"t": "Schema.org", "en": "Schema.org", "d": "ウェブページに埋め込む構造化データの共通語彙", "dEn": "A shared vocabulary for structured data embedded in web pages"}, {"t": "語彙とオントロジー", "en": "vocabularies and ontologies", "d": "データの意味を共有するために使う定義の集まり", "dEn": "Collections of definitions used to share the meaning of data"}, {"t": "SPARQLエンドポイント", "en": "SPARQL endpoint", "d": "ウェブ越しにRDFデータへ問い合わせを受け付ける窓口", "dEn": "A web-accessible service that accepts queries over RDF data"}, {"t": "相互運用性", "en": "interoperability", "d": "異なるシステムの間でデータを交換し活用できること", "dEn": "The ability of different systems to exchange and use data"}, {"t": "JSON-LD", "en": "JSON-LD", "d": "JSONの形でリンクトデータを書くための記法", "dEn": "A notation for writing linked data in the form of JSON"}, {"t": "RDFa", "en": "RDFa", "d": "HTMLの属性にRDFの記述を埋め込む方法", "dEn": "A way to embed RDF statements in the attributes of HTML"}, {"t": "5つ星オープンデータ", "en": "5-star open data", "d": "公開データの質を、形式とリンクの度合いで5段階に分ける目安", "dEn": "A five-step scale rating open data by its format and degree of linking"}], "people": [{"n": "ティム・バーナーズ=リー", "en": "Tim Berners-Lee", "y": "1955-", "w": "ウェブを発明し、2001年にセマンティックWebの構想を共著で発表した", "wEn": "Invented the web and co-published the Semantic Web vision in 2001"}, {"n": "ジェームズ・ヘンドラー", "en": "James Hendler", "y": "1957-", "w": "セマンティックWebの構想を共著で発表し、関連技術の普及に努めた", "wEn": "Co-authored the Semantic Web vision and worked to spread related technologies"}, {"n": "オラ・ラッシラ", "en": "Ora Lassila", "y": "", "w": "2001年の『Scientific American』の記事の共著者", "wEn": "Co-author of the 2001 Scientific American article"}, {"n": "トム・グルーバー", "en": "Tom Gruber", "w": "1993年にオントロジーを共有された概念化の明示的仕様と定義し、後にSiriを共同創業した", "wEn": "Defined ontology in 1993 as an explicit specification of a conceptualization; later co-founded Siri", "y": "1959-"}, {"n": "R・V・グハ", "en": "R. V. Guha", "w": "Googleでスキーマ・ドット・オーグの立ち上げを主導し、構造化データの共通語彙を広めた", "wEn": "Led the launch of Schema.org at Google, spreading a shared vocabulary for structured data", "y": ""}], "example": "レシピのページに材料や調理時間を構造化データとして埋め込むと、検索エンジンがそれを読み取り、結果の一覧に調理時間などを表示できる。", "exampleEn": "When a recipe page embeds ingredients and cooking time as structured data, a search engine can read them and display details such as the cooking time in its results.", "related": ["computational:knowledge-rep:rdf", "computational:knowledge-rep:owl", "computational:knowledge-rep:knowledge-graph", "computational:ir"]}, "computational:knowledge-rep:reasoning": {"one": "既知の知識から新しい結論を導く", "oneEn": "Deriving new conclusions from existing knowledge", "scope": "記号で表した知識と規則から、新しい事実を導き出す手続きを研究する分野。演繹・推論規則・論理プログラミングなどを扱い、導出の正しさと計算量、知識が不完全な場合の扱いが論点となる。", "scopeEn": "This field studies procedures for deriving new facts from knowledge and rules expressed in symbols. It covers deduction, inference rules, and logic programming, and its central issues are the soundness and computational cost of derivations and the handling of incomplete knowledge.", "concepts": [{"t": "演繹", "en": "deduction", "d": "前提が真なら結論も必ず真になる推論", "dEn": "Inference in which the conclusion is necessarily true if the premises are true"}, {"t": "前向き推論", "en": "forward chaining", "d": "既知の事実から規則を適用して結論を導く方式", "dEn": "Applying rules to known facts to derive conclusions"}, {"t": "後向き推論", "en": "backward chaining", "d": "目標から出発し、必要な条件を遡って確かめる方式", "dEn": "Starting from a goal and working back to verify the conditions it needs"}, {"t": "健全性と完全性", "en": "soundness and completeness", "d": "導出が正しいこと、導けるべきものを全て導けること", "dEn": "Derivations being correct, and all derivable conclusions being reached"}, {"t": "閉世界仮説", "en": "closed world assumption", "d": "記述されていない事実を偽とみなす前提", "dEn": "The assumption that unstated facts are treated as false"}, {"t": "非単調推論", "en": "non-monotonic reasoning", "d": "新しい情報で以前の結論を取り消すことのある推論", "dEn": "Reasoning in which new information can retract earlier conclusions"}, {"t": "帰納", "en": "induction", "d": "個々の事例から一般的な規則を導く推論。結論は確実ではない", "dEn": "Inference from individual cases to a general rule; the conclusion is not certain"}, {"t": "アブダクション", "en": "abduction", "d": "観察された結果を最もよく説明する仮説を推し当てる推論", "dEn": "Inference to the hypothesis that best explains an observed result"}, {"t": "決定可能性", "en": "decidability", "d": "どの入力にも有限時間で答えを出す手続きが存在する性質", "dEn": "The property that a procedure exists giving an answer to any input in finite time"}], "people": [{"n": "アリストテレス", "en": "Aristotle", "y": "前384-前322", "w": "三段論法を体系化し、論理的な推論の研究の出発点を築いた", "wEn": "Systematized the syllogism and laid the starting point for the study of logical inference"}, {"n": "ジョン・アラン・ロビンソン", "en": "John Alan Robinson", "y": "1930-2016", "w": "1965年に導出原理(レゾリューション)を発表し、自動定理証明の基礎を築いた", "wEn": "Published the resolution principle in 1965, a foundation of automated theorem proving"}, {"n": "ロバート・コワルスキー", "en": "Robert Kowalski", "y": "1941-", "w": "論理プログラミングの理論的な基礎づけに貢献した", "wEn": "Contributed to the theoretical foundations of logic programming"}, {"n": "ゴットロープ・フレーゲ", "en": "Gottlob Frege", "w": "1879年の『概念記法』で述語論理の原型を作り、現代論理学の出発点となった", "wEn": "Created the prototype of predicate logic in the 1879 Begriffsschrift, a starting point of modern logic", "y": "1848-1925"}, {"n": "アレン・ニューウェル", "en": "Allen Newell", "w": "サイモンらと論理定理証明プログラムLogic Theoristを作り、記号による推論を実装した", "wEn": "Built the Logic Theorist theorem prover with Simon and others, implementing symbolic reasoning", "y": "1927-1992"}], "example": "「人間は死ぬ」「ソクラテスは人間である」という前提から「ソクラテスは死ぬ」を導く三段論法は、推論規則を機械的に適用する形式推論の古典的な例である。", "exampleEn": "The syllogism deriving 'Socrates is mortal' from 'All humans are mortal' and 'Socrates is a human' is a classic example of formal reasoning by mechanically applying inference rules.", "related": ["computational:knowledge-rep:owl", "computational:knowledge-rep:ontology", "computational:knowledge-rep:knowledge-graph", "interdisciplinary:philosophy-language"]}, "interdisciplinary:philosophy-language": {"one": "言語と意味・指示・真理・行為の関係を哲学的に問う分野", "oneEn": "Philosophical inquiry into meaning, reference, truth and action in language", "scope": "語や文はどのように世界の対象や事態と結びつくのか、意味とは何か、発話は何をなすのかを問う。思考実験や反例を用いた概念分析と論証によって、意味・指示・真理の理論を検討する。", "scopeEn": "Asks how words and sentences connect to objects and states of affairs, what meaning is, and what utterances do. It tests theories of meaning, reference and truth through conceptual analysis, thought experiments and counterexamples.", "concepts": [{"t": "意義と指示対象", "en": "sense and reference", "d": "フレーゲによる、語の意義(捉え方)と、語が指す対象の区別", "dEn": "Frege's distinction between a term's sense (mode of presentation) and the object it refers to"}, {"t": "確定記述", "en": "definite description", "d": "「現在のフランス王」のような記述を量化で分析するラッセルの理論", "dEn": "Russell's analysis of phrases like 'the present King of France' in terms of quantification"}, {"t": "固定指示子", "en": "rigid designator", "d": "あらゆる可能世界で同じ対象を指す表現。クリプキが固有名の特徴とした", "dEn": "An expression that refers to the same object in every possible world; Kripke took proper names to be such"}, {"t": "言語行為", "en": "speech act", "d": "発話そのものが約束・命名・宣言などの行為になるという着想", "dEn": "The idea that uttering words can itself perform acts such as promising, naming or declaring"}, {"t": "使用説", "en": "use theory of meaning", "d": "語の意味はその言語内での使われ方にあるとする、後期ウィトゲンシュタインの見方", "dEn": "The view, associated with the later Wittgenstein, that a word's meaning lies in its use in the language"}, {"t": "真理条件", "en": "truth conditions", "d": "文の意味を、その文が真となる条件を与えることとみる立場がある", "dEn": "One tradition holds that giving a sentence's meaning is stating the conditions under which it is true"}, {"t": "私的言語論", "en": "private language argument", "d": "本人だけが意味を知る言語は成り立たないという後期ウィトゲンシュタインの議論", "dEn": "Later Wittgenstein's argument that a language whose meanings only its user can know is not possible."}, {"t": "命題態度", "en": "propositional attitude", "d": "「〜と信じる」「〜を望む」のように、命題に対する心の構えを表す表現", "dEn": "Expressions of a mental stance toward a proposition, as in 'believes that' or 'hopes that'."}, {"t": "検証原理", "en": "verification principle", "d": "文が意味をもつのは経験で検証できるときだけだとする論理実証主義の原理", "dEn": "The logical positivist principle that a sentence is meaningful only if it can be verified by experience."}], "people": [{"n": "フレーゲ", "en": "Gottlob Frege", "y": "1848-1925", "w": "1892年の論文「意義と指示対象について」で意義と指示対象を区別した", "wEn": "Distinguished sense from reference in his 1892 paper on sense and reference"}, {"n": "ラッセル", "en": "Bertrand Russell", "y": "1872-1970", "w": "1905年の論文「指示について」で確定記述の理論を示した", "wEn": "Presented the theory of definite descriptions in his 1905 paper 'On Denoting'"}, {"n": "クリプキ", "en": "Saul Kripke", "y": "1940-2022", "w": "『名指しと必然性』(1980年刊)で固定指示子と因果的な指示の見方を論じた", "wEn": "In Naming and Necessity (published 1980) argued for rigid designators and a causal picture of reference"}, {"n": "ウィトゲンシュタイン", "en": "Ludwig Wittgenstein", "y": "1889-1951", "w": "『哲学探究』(死後1953)で、言語を多様な言語ゲームとしてとらえ、語の意味を使い方に求めた", "wEn": "In Philosophical Investigations (1953, posthumous), he saw language as varied language games and sought meaning in use."}, {"n": "クワイン", "en": "Willard Van Orman Quine", "y": "1908-2000", "w": "『言葉と対象』(1960)で、証拠が同じでも翻訳が複数ありうるという翻訳の不確定性を論じた", "wEn": "In Word and Object (1960), he argued for the indeterminacy of translation: the same evidence allows several translations."}], "example": "「宵の明星」と「明けの明星」はどちらも金星を指すが、「両者は同一だ」という文は情報を持つ。指示対象だけでなく意義が要ると、フレーゲは論じた。", "exampleEn": "'The evening star' and 'the morning star' both refer to Venus, yet 'they are identical' is informative. Frege argued that reference alone is not enough and that sense is also needed.", "related": ["interdisciplinary:cognitive-ling", "theoretical:semantics", "theoretical:pragmatics", "interdisciplinary:semiotics"]}, "interdisciplinary:cognitive-ling": {"one": "言語を一般的な認知能力と身体経験に基づくものとして捉える分野", "oneEn": "Studies language as grounded in general cognition and bodily experience", "scope": "言語知識は知覚・記憶・カテゴリー化などの一般的な認知と切り離せないとみて、意味や文法を話者の概念化から説明する。メタファー、カテゴリー、構文の用例を分析し、言語使用に基づいて研究する。", "scopeEn": "Treats linguistic knowledge as inseparable from perception, memory and categorization, and explains meaning and grammar through speakers' conceptualization. It analyzes metaphor, categories and constructions in actual language use.", "concepts": [{"t": "概念メタファー", "en": "conceptual metaphor", "d": "抽象的な領域を、具体的な経験領域からの写像で理解する仕組み", "dEn": "A mapping from a concrete experiential domain used to understand an abstract one"}, {"t": "プロトタイプ", "en": "prototype", "d": "カテゴリーの中で最も典型的な成員。周辺の成員ほど典型性が下がる", "dEn": "The most typical member of a category; peripheral members are less typical"}, {"t": "イメージスキーマ", "en": "image schema", "d": "容器や経路など、身体経験から得られる反復的な認知の型", "dEn": "A recurring cognitive pattern, such as container or path, derived from bodily experience"}, {"t": "フレーム", "en": "frame", "d": "語の理解に必要な背景知識の構造。フレーム意味論の中心概念", "dEn": "A structure of background knowledge needed to understand a word; central to frame semantics"}, {"t": "構文", "en": "construction", "d": "形式と意味の対としての言語単位。語から文型まで連続的に扱う", "dEn": "A pairing of form and meaning; treated on a continuum from words to sentence patterns"}, {"t": "図と地", "en": "figure and ground", "d": "注目される対象と背景の区別。認知文法で捉え方の違いを説明する", "dEn": "The contrast between an attended entity and its background; used in cognitive grammar to describe construal"}, {"t": "身体性", "en": "embodiment", "d": "概念や意味は、身体の感覚や運動の経験に根ざしているという考え", "dEn": "The view that concepts and meaning are grounded in bodily sensation and movement."}, {"t": "用法基盤モデル", "en": "usage-based model", "d": "文法を、実際の使用から繰り返し抽出された知識の体系とみる立場", "dEn": "The view that grammar is knowledge abstracted from repeated actual use."}, {"t": "概念融合", "en": "conceptual blending", "d": "二つの入力空間から要素を選び、新しい意味を持つ混成空間を作る操作", "dEn": "An operation that draws on two input spaces to build a blended space with new meaning."}], "people": [{"n": "レイコフ", "en": "George Lakoff", "y": "1941-", "w": "ジョンソンとの共著『Metaphors We Live By』(1980年)で概念メタファーを論じた", "wEn": "With Johnson, argued for conceptual metaphor in Metaphors We Live By (1980)"}, {"n": "ラネカー", "en": "Ronald Langacker", "y": "1942-", "w": "『Foundations of Cognitive Grammar』(1987年、1991年)で認知文法を体系化した", "wEn": "Developed Cognitive Grammar in Foundations of Cognitive Grammar (1987, 1991)"}, {"n": "ロッシュ", "en": "Eleanor Rosch", "y": "1938-", "w": "1970年代の実験で、カテゴリーのプロトタイプ効果と基本レベルを示した", "wEn": "Showed prototype effects and the basic level of categorization in experiments of the 1970s"}, {"n": "ジョンソン", "en": "Mark Johnson", "y": "1949-", "w": "『The Body in the Mind』(1987年)で、意味の基盤を身体経験に求めた", "wEn": "In The Body in the Mind (1987), grounded meaning in bodily experience"}, {"n": "フィルモア", "en": "Charles J. Fillmore", "y": "1929-2014", "w": "格文法からフレーム意味論へ進み、語彙データベースFrameNetの計画を率いた", "wEn": "Moved from case grammar to frame semantics and led the FrameNet lexical database project"}], "example": "「時間はお金だ」という見方から、「時間を節約する」「時間を無駄にする」などの表現が生まれる。認知言語学は、比喩を飾りでなく思考の枠組みとみなす。", "exampleEn": "The view that 'time is money' underlies expressions such as 'save time' and 'waste time'. Cognitive linguistics regards metaphor as a framework of thought, not mere decoration.", "related": ["interdisciplinary:generative-grammar", "theoretical:semantics", "psycho:psycholinguistics", "interdisciplinary:philosophy-language"]}, "interdisciplinary:generative-grammar": {"one": "人間の言語能力を生得的な規則体系として形式的に解明する分野", "oneEn": "Formal study of the human language faculty as an innate system of rules and principles", "scope": "母語話者が無限に多くの文を作り理解できる知識を心的な文法として捉え、その仕組みを規則や原理で形式化する。主なデータは文の適格性の判断で、言語獲得の問題も視野に入れる。", "scopeEn": "Treats the knowledge that lets speakers produce and understand unboundedly many sentences as a mental grammar and formalizes it with rules and principles. Its main data are acceptability judgments, and it also addresses language acquisition.", "concepts": [{"t": "言語能力と言語運用", "en": "competence and performance", "d": "話者が持つ文法知識と、実際の発話での使用との区別", "dEn": "The distinction between a speaker's grammatical knowledge and its use in actual speech"}, {"t": "普遍文法", "en": "universal grammar", "d": "人間に生得的に備わるとされる、全言語に共通の文法の基盤", "dEn": "The innate basis of grammar that is posited to be common to all human languages"}, {"t": "X-バー理論", "en": "X-bar theory", "d": "句が主要部・補部・指定部からなる共通の構造を持つとする理論", "dEn": "A theory that phrases share a common structure of head, complement and specifier"}, {"t": "移動", "en": "movement", "d": "要素が元の位置から別の位置へ移る操作。疑問文などの説明に使われる", "dEn": "An operation relocating an element from its original position, used to analyze questions and more"}, {"t": "併合", "en": "Merge", "d": "2つの要素から新しい構造を作る、ミニマリスト・プログラムの基本操作", "dEn": "The basic operation of the Minimalist Program that combines two elements into a new structure"}, {"t": "原理とパラメータ", "en": "principles and parameters", "d": "共通の原理と、言語ごとに値が異なるパラメータで言語差を説明する枠組み", "dEn": "A framework explaining language differences through shared principles and language-specific parameters"}, {"t": "刺激の貧困", "en": "poverty of the stimulus", "d": "子どもが接する言語資料だけでは、習得する文法知識を説明しきれないという議論", "dEn": "The argument that the input children get cannot account for the grammatical knowledge they acquire."}, {"t": "束縛理論", "en": "binding theory", "d": "再帰代名詞・代名詞・名詞句が、文中で何と同じものを指せるかを定める理論", "dEn": "A theory fixing what reflexives, pronouns and full noun phrases may corefer with in a sentence."}, {"t": "島の制約", "en": "island constraint", "d": "特定の構造の内側からの要素の移動を禁じる制約。ロスが提唱した", "dEn": "A constraint barring movement of an element out of certain structures; proposed by Ross."}], "people": [{"n": "チョムスキー", "en": "Noam Chomsky", "y": "1928-", "w": "『統語構造論』(1957年)と『統辞理論の諸相』(1965年)で生成文法の基礎を築いた", "wEn": "Laid the foundations in Syntactic Structures (1957) and Aspects of the Theory of Syntax (1965)"}, {"n": "ロス", "en": "John Robert Ross", "y": "1938-2025", "w": "1967年の博士論文で、移動を制限する島の制約を示した", "wEn": "Identified island constraints on movement in his 1967 dissertation"}, {"n": "ケイン", "en": "Richard Kayne", "y": "1944-", "w": "『The Antisymmetry of Syntax』(1994年)で語順と構造の関係の理論を提案した", "wEn": "Proposed a theory linking word order and structure in The Antisymmetry of Syntax (1994)"}, {"n": "ハレ", "en": "Morris Halle", "y": "1923-2018", "w": "チョムスキーと『英語の音パターン』(1968年)を著し、生成音韻論を築いた", "wEn": "Co-wrote The Sound Pattern of English (1968) with Chomsky and built generative phonology"}, {"n": "ジャッケンドフ", "en": "Ray Jackendoff", "y": "1945-", "w": "『X-Bar Syntax』(1977年)でX-バー理論を詳しく論じ、のち並列的な文法構造を提案した", "wEn": "Developed X-bar theory in detail in X-Bar Syntax (1977) and later proposed a parallel grammatical architecture"}], "example": "英語の疑問文「What did you buy?」で、what は動詞 buy の目的語として理解される。what が元の位置から文頭へ移動したと分析され、移動の典型例とされる。", "exampleEn": "In 'What did you buy?', 'what' is understood as the object of 'buy'. It is analyzed as having moved from its original position to the front of the sentence, a standard case of movement.", "related": ["theoretical:syntax", "interdisciplinary:cognitive-ling", "psycho:l1-acquisition", "computational:nlp"]}, "interdisciplinary:functional-ling": {"one": "言語の形式を、伝達や社会的な機能のはたらきから説明する分野", "oneEn": "Explains linguistic form through its communicative and social functions", "scope": "言語は意味を伝え人間関係を築くための資源だとみて、形式の選択を機能から説明する。実際のテクストを分析し、情報の流れや語彙文法の選択体系を記述する。", "scopeEn": "Sees language as a resource for conveying meaning and building relationships, and explains formal choices by function. It analyzes real texts and describes information flow and the systems of choice in lexicogrammar.", "concepts": [{"t": "メタ機能", "en": "metafunction", "d": "言語の3つの機能。観念的・対人的・テクスト的(SFLの中心概念)", "dEn": "The three functions of language: ideational, interpersonal and textual; central to SFL"}, {"t": "テーマとレーマ", "en": "theme and rheme", "d": "節の出発点(テーマ)と、そこで述べられる部分(レーマ)の区別", "dEn": "The distinction between a clause's starting point (theme) and what is said about it (rheme)"}, {"t": "及物性", "en": "transitivity", "d": "過程・参与者・状況によって経験を表す、節の意味的な構造", "dEn": "The semantic structure of a clause, representing experience through process, participants and circumstances"}, {"t": "情報構造", "en": "information structure", "d": "既知情報と新情報など、話者が情報を並べる仕方", "dEn": "How speakers arrange information, such as given versus new"}, {"t": "選択体系", "en": "system network", "d": "言語を、意味を作るための選択肢の網として記述する考え方", "dEn": "A way of describing language as a network of choices for making meaning"}, {"t": "ジャンル", "en": "genre", "d": "目的を持ち、段階を踏んで進む社会的なテクストの類型", "dEn": "A goal-oriented, staged type of social text"}, {"t": "文法的比喩", "en": "grammatical metaphor", "d": "同じ意味を別の文法形式で表すこと。動詞を名詞にする名詞化が代表", "dEn": "Expressing the same meaning in another grammatical form; nominalization is the typical case."}, {"t": "ムード", "en": "mood", "d": "平叙・疑問・命令など、主語と定形要素の並びで対人的な意味を担う節の構造", "dEn": "The clause structure, built on the order of Subject and Finite, that carries interpersonal meaning such as statement, question or command."}, {"t": "ランク尺度", "en": "rank scale", "d": "節・句(群)・語・形態素と、大きな単位が小さな単位から成る階層", "dEn": "The hierarchy in which a larger unit consists of smaller ones: clause, group or phrase, word and morpheme."}], "people": [{"n": "ハリデー", "en": "M. A. K. Halliday", "y": "1925-2018", "w": "選択体系機能言語学を創始し、『機能文法入門』(1985年初版)をまとめた", "wEn": "Founded Systemic Functional Linguistics; author of An Introduction to Functional Grammar (first edition 1985)"}, {"n": "マテジウス", "en": "Vilem Mathesius", "y": "1882-1945", "w": "プラハ学派の創設者の一人で、文の機能的な見方と情報の配列を研究した", "wEn": "A founder of the Prague School who studied the functional view of the sentence and the arrangement of information"}, {"n": "ハサン", "en": "Ruqaiya Hasan", "y": "1931-2015", "w": "ハリデーとの共著『Cohesion in English』(1976年)で結束性を論じた", "wEn": "With Halliday, wrote Cohesion in English (1976) on cohesion"}, {"n": "ディック", "en": "Simon C. Dik", "y": "1940-1995", "w": "1978年の『Functional Grammar』で、形式的に記述する機能文法を提唱した", "wEn": "Proposed a formally stated Functional Grammar in his 1978 book Functional Grammar"}, {"n": "マルティネ", "en": "André Martinet", "y": "1908-1999", "w": "二重分節を唱え、音の変化を表現の経済性から説明しようとした", "wEn": "Put forward double articulation and tried to explain sound change through economy of expression"}], "example": "「その本は私が昨日買った」では、「その本」を話題(テーマ)として先に置き、続く部分で新しい情報を述べる。語順が話者の伝え方の順序を反映する。", "exampleEn": "In 'That book, I bought yesterday', 'that book' is put first as the theme and the rest adds new information. Word order reflects the order in which the speaker presents the message.", "related": ["interdisciplinary:discourse-analysis", "theoretical:syntax", "theoretical:pragmatics", "applied:language-education"]}, "interdisciplinary:discourse-analysis": {"one": "文を超えた単位のテクストや談話のまとまりと働きを分析する分野", "oneEn": "Analyzes the organization and functions of texts and discourse beyond the sentence", "scope": "文より大きな言語使用の単位で、文どうしがどうつながって意味のまとまりを作るか、社会的文脈とどう結びつくかを調べる。書き言葉と話し言葉の実例から、結束性や談話標識、権力関係を分析する。", "scopeEn": "Examines units of language use larger than the sentence: how sentences connect into coherent wholes and how they relate to social context. It analyzes cohesion, discourse markers and power relations in written and spoken examples.", "concepts": [{"t": "結束性", "en": "cohesion", "d": "指示、接続、語彙の反復など、テクストを表面でつなぐ手段", "dEn": "Surface devices that link a text, such as reference, conjunction and lexical repetition"}, {"t": "一貫性", "en": "coherence", "d": "テクスト全体が意味としてまとまっていると読み手が理解できること", "dEn": "The sense that a text as a whole hangs together in meaning for its reader"}, {"t": "談話標識", "en": "discourse marker", "d": "「ところで」のように、談話の展開や話し手の態度を示す表現", "dEn": "An expression like 'by the way' that signals how discourse develops or the speaker's stance"}, {"t": "ジャンル分析", "en": "genre analysis", "d": "目的を持つテクストの型と構成を分析する方法", "dEn": "A method of analyzing the types and structures of purposeful texts"}, {"t": "批判的談話分析", "en": "critical discourse analysis", "d": "言語使用に潜む権力やイデオロギーを分析する立場", "dEn": "An approach analyzing the power and ideology embedded in language use"}, {"t": "修辞構造理論", "en": "rhetorical structure theory", "d": "文章を、部分どうしの修辞的な関係の木として分析する理論", "dEn": "A theory that analyzes a text as a tree of rhetorical relations between its parts."}, {"t": "照応", "en": "anaphora", "d": "代名詞などが、先に出た語句を指して、文をまたいで話題をつなぐこと", "dEn": "A pronoun or similar form pointing back to an earlier expression and linking sentences."}, {"t": "談話表示理論", "en": "discourse representation theory", "d": "談話が進むにつれて更新される表示で、代名詞の指す先などを扱う理論", "dEn": "A theory that handles pronoun reference and more through a representation updated as discourse proceeds."}, {"t": "間テクスト性", "en": "intertextuality", "d": "あるテクストが他のテクストとの関係の中で意味を持つこと", "dEn": "The fact that a text takes on meaning through its relations to other texts."}], "people": [{"n": "ハリス", "en": "Zellig Harris", "y": "1909-1992", "w": "1952年の論文「Discourse Analysis」で、文を超えた分布の分析を試みた", "wEn": "Attempted a distributional analysis beyond the sentence in his 1952 paper 'Discourse Analysis'"}, {"n": "シンクレア", "en": "John Sinclair", "y": "1933-2007", "w": "クルサードとの共著(1975年)で、教室談話の構造を分析した", "wEn": "With Coulthard (1975), analyzed the structure of classroom discourse"}, {"n": "フェアクラフ", "en": "Norman Fairclough", "y": "1941-", "w": "『Language and Power』(1989年)で批判的談話分析の方法を論じた", "wEn": "Set out an approach to critical discourse analysis in Language and Power (1989)"}, {"n": "ラボフ", "en": "William Labov", "y": "1927-2024", "w": "ワレツキーとの1967年の論文で、個人的体験の語りを分析する枠組みを示した", "wEn": "In a 1967 paper with Waletzky, set out a framework for analyzing narratives of personal experience"}, {"n": "ヴァン・デイク", "en": "Teun A. van Dijk", "y": "1943-", "w": "『Macrostructures』(1980年)で談話全体の内容を束ねる大域構造を論じた", "wEn": "In Macrostructures (1980), discussed the global structure that binds a whole discourse"}], "example": "ニュースで同じ事件を「衝突」と書くか「襲撃」と書くかで、行為者の責任の見え方が変わる。批判的談話分析は、こうした語の選択を手がかりにする。", "exampleEn": "Whether a news report calls the same incident a 'clash' or an 'attack' changes how responsibility appears. Critical discourse analysis uses such lexical choices as evidence.", "related": ["interdisciplinary:conversation-analysis", "interdisciplinary:functional-ling", "social:sociolinguistics", "interdisciplinary:stylistics"]}, "interdisciplinary:conversation-analysis": {"one": "自然な会話の順番交替と行為の連鎖を詳細に記述する分野", "oneEn": "Describes in detail turn-taking and sequences of action in natural conversation", "scope": "録音や録画をした自然会話を書き起こし、話し手が順番をどう交替し、行為をどう連ねて互いの理解を示すかを細かく分析する。理論を先に立てず、データから参加者の方法を記述する。", "scopeEn": "Transcribes recorded natural conversation and closely analyzes how speakers take turns and chain actions to display mutual understanding. Rather than starting from theory, it describes participants' methods from the data.", "concepts": [{"t": "ターンテイキング", "en": "turn-taking", "d": "会話で発話の順番が交替する仕組み。次の話し手を決める規則を含む", "dEn": "The system by which speaking turns alternate, including rules for who speaks next"}, {"t": "隣接ペア", "en": "adjacency pair", "d": "質問と応答のように、前の発話が次の発話を期待させる対", "dEn": "A pair of utterances, like question and answer, where the first makes the second expected"}, {"t": "選好構造", "en": "preference organization", "d": "依頼への承諾と断りなど、応答の選択肢に優先関係があること", "dEn": "The fact that alternative responses, such as accepting or refusing a request, differ in preference"}, {"t": "修復", "en": "repair", "d": "聞き取りや理解の問題を、訂正や確認で解決する手続き", "dEn": "A procedure that resolves problems of hearing or understanding through correction or checking"}, {"t": "連鎖組織", "en": "sequence organization", "d": "発話が行為の連なりとして組み立てられる仕方", "dEn": "How utterances are built up as ordered sequences of actions"}, {"t": "先行連鎖", "en": "pre-sequence", "d": "依頼や誘いの前に「今ひま?」と可能性を探る、本題の前置きの連鎖", "dEn": "A prefatory sequence that checks feasibility before a request or invitation, e.g. 'Are you free?'"}, {"t": "挿入連鎖", "en": "insertion sequence", "d": "質問と答えの間に、別の質問と答えの対が入り込む連鎖", "dEn": "A question-answer pair inserted between the first and second parts of another pair."}, {"t": "転移関連場所", "en": "transition relevance place", "d": "話者交替が起こりうる、発話単位の終わり付近の位置", "dEn": "The point near the end of a turn unit where a change of speaker may occur."}, {"t": "ジェファーソン式転記", "en": "Jefferson transcription", "d": "間・重なり・抑揚を記号で書き込む、会話の書き起こし方式", "dEn": "A transcription system that marks pauses, overlaps and intonation with symbols."}], "people": [{"n": "サックス", "en": "Harvey Sacks", "y": "1935-1975", "w": "会話分析の創始者の一人で、録音された自然会話の分析を始めた", "wEn": "A founder of conversation analysis who began analyzing recorded natural conversation"}, {"n": "シェグロフ", "en": "Emanuel Schegloff", "w": "1974年のターンテイキング論文の共著者で、修復や連鎖の研究を進めた", "wEn": "Co-authored the 1974 turn-taking paper and advanced research on repair and sequences", "y": "1937-2024"}, {"n": "ジェファーソン", "en": "Gail Jefferson", "y": "1938-2008", "w": "書き起こしの記号体系を整え、1974年のターンテイキング論文を共著した", "wEn": "Developed the transcription conventions and co-authored the 1974 turn-taking paper"}, {"n": "ハロルド・ガーフィンケル", "en": "Harold Garfinkel", "w": "エスノメソドロジーの創始者。人々が日常の秩序を作る方法を研究し、会話分析の土台を築いた", "wEn": "Founder of ethnomethodology; studied how people produce everyday order, laying the ground for conversation analysis.", "y": "1917-2011"}, {"n": "チャールズ・グッドウィン", "en": "Charles Goodwin", "w": "会話での視線や身振りなど視覚的な資源の働きを示し、相互行為の研究を広げた", "wEn": "Showed the role of visual resources such as gaze and gesture in talk, broadening the study of interaction.", "y": "1943-2018"}], "example": "「明日空いてる?」に「うーん、ちょっと」と答えるとき、答えの前の間や言い淀みが断りの予告として働く。承諾は間をおかず返されやすい。", "exampleEn": "When 'Are you free tomorrow?' is answered with 'Well, um, a bit...', the pause and hesitation before the answer foreshadow a refusal. Acceptances tend to come without delay.", "related": ["interdisciplinary:discourse-analysis", "theoretical:pragmatics", "social:sociolinguistics", "psycho:psycholinguistics"]}, "interdisciplinary:stylistics": {"one": "文学や日常のテクストの文体的特徴を言語学の方法で分析する分野", "oneEn": "Analyzes the stylistic features of literary and everyday texts with linguistic methods", "scope": "作者や場面によって表現の選び方がどう違うかを、語彙・文法・音・修辞の面から記述する。印象に頼らず言語学の概念を使い、近年はコーパスと頻度の統計で文体効果の根拠を示す。", "scopeEn": "Describes how choices of expression differ by author or situation in vocabulary, grammar, sound and rhetoric. It relies on linguistic concepts rather than impressions, and recently uses corpora and frequency statistics to support claims about style.", "concepts": [{"t": "前景化", "en": "foregrounding", "d": "通常から外れる、または規則的に反復される表現が際立つこと", "dEn": "The prominence of expressions that deviate from the norm or repeat regularly"}, {"t": "逸脱", "en": "deviation", "d": "言語の規範から外れた使用。詩的効果を生む手段とされる", "dEn": "Use that departs from linguistic norms, regarded as a means of creating poetic effect"}, {"t": "レジスター", "en": "register", "d": "場面・話題・相手に応じて使い分けられる言語使用域", "dEn": "A variety of language used according to situation, topic and addressee"}, {"t": "コーパス文体論", "en": "corpus stylistics", "d": "大量のテクストデータの頻度分析で文体の特徴を調べる方法", "dEn": "A method that examines stylistic features through frequency analysis of large text data"}, {"t": "視点", "en": "point of view", "d": "語り手が出来事をどの立場から語るかによる表現の違い", "dEn": "Differences in expression arising from the position from which a narrator tells events"}, {"t": "並行法", "en": "parallelism", "d": "同じ構造や音を繰り返して、表現を規則的に際立たせる手法", "dEn": "A device that repeats the same structure or sound to make an expression stand out."}, {"t": "マインド・スタイル", "en": "mind style", "d": "語り手や人物の世界観が、繰り返される言語選択に表れるとする見方", "dEn": "The view that a narrator's or character's worldview shows in recurring linguistic choices."}, {"t": "認知詩学", "en": "cognitive poetics", "d": "認知科学の知見で、文学を読む心の働きと文体を説明する分野", "dEn": "A field that uses cognitive science to explain how readers process literary style."}, {"t": "頭韻", "en": "alliteration", "d": "近接する語の語頭の子音を繰り返し、音のつながりで表現を際立たせる手法", "dEn": "Repeating initial consonants of nearby words so that sound ties the expression together."}], "people": [{"n": "バイイ", "en": "Charles Bally", "y": "1865-1947", "w": "『フランス語文体論概説』(1909年)で、言語の感情的な表現を研究した", "wEn": "Studied the expressive and affective side of language in his 1909 treatise on French stylistics"}, {"n": "ヤコブソン", "en": "Roman Jakobson", "y": "1896-1982", "w": "1958年の講演をもとに1960年に刊行された論文「言語学と詩学」で、言語の詩的機能を論じた", "wEn": "In \"Linguistics and Poetics\" (a 1958 lecture published in 1960) he set out the poetic function of language"}, {"n": "リーチ", "en": "Geoffrey Leech", "y": "1936-2014", "w": "『A Linguistic Guide to English Poetry』(1969年)で詩の言語を分析した", "wEn": "Analyzed the language of poetry in A Linguistic Guide to English Poetry (1969)"}, {"n": "レオ・シュピッツァー", "en": "Leo Spitzer", "w": "言語表現の特徴から作家の精神に迫る文体研究を進め、文学の言語研究の基礎を作った", "wEn": "Pursued stylistic study that reads a writer's mind through linguistic features, laying a base for linguistic study of literature.", "y": "1887-1960"}, {"n": "ヤン・ムカジョフスキー", "en": "Jan Mukarovsky", "w": "プラハ学派の美学者。詩的言語を論じて前景化の考えを示し、文体論に影響を与えた", "wEn": "Prague School aesthetician who discussed poetic language and foregrounding, influencing stylistics.", "y": "1891-1975"}], "example": "「彼は死んだ」でなく「彼は旅立った」と書くと、同じ事実でも婉曲で柔らかい響きになる。こうした語の選択が文体効果を生む。", "exampleEn": "Writing 'he passed away' instead of 'he died' conveys the same fact in a more indirect, softer tone. Such lexical choices create stylistic effects.", "related": ["interdisciplinary:functional-ling", "interdisciplinary:discourse-analysis", "computational:corpus", "interdisciplinary:semiotics"]}, "interdisciplinary:semiotics": {"one": "記号と、それが意味を生み出す仕組みを一般的に研究する分野", "oneEn": "General study of signs and the ways they produce meaning", "scope": "言語だけでなく、信号・図像・服装・儀礼なども記号として扱い、記号が意味を持つ条件と人々が解釈する仕組みを調べる。記号の分類と、社会的なコードの分析が中心となる。", "scopeEn": "Treats not only language but also signals, images, clothing and rituals as signs, and examines the conditions under which signs carry meaning and how people interpret them. Classifying signs and analyzing social codes are central.", "concepts": [{"t": "シニフィアンとシニフィエ", "en": "signifier and signified", "d": "記号の2面。記号表現(音や形)と記号内容(意味)。ソシュールの用語", "dEn": "The two sides of a sign: its form (sound or shape) and its meaning; Saussure's terms"}, {"t": "恣意性", "en": "arbitrariness", "d": "言語記号で、音と意味の結びつきに必然性がないこと", "dEn": "The fact that the link between sound and meaning in a linguistic sign is not necessary"}, {"t": "類像・指標・象徴", "en": "icon, index, symbol", "d": "パースの記号分類。類似・因果的な関連・慣習に基づく", "dEn": "Peirce's classification of signs, based on resemblance, causal connection and convention"}, {"t": "コード", "en": "code", "d": "記号の解釈を支配する、社会的に共有された規則体系", "dEn": "A system of rules governing how signs are interpreted"}, {"t": "共示", "en": "connotation", "d": "記号が持つ二次的・文化的な意味。バルトが大衆文化の分析に用いた", "dEn": "The secondary, cultural meaning of a sign, used by Barthes to analyze popular culture"}, {"t": "解釈項", "en": "interpretant", "d": "パースの用語。記号が人の心に生む、その記号を解釈する別の記号や理解", "dEn": "Peirce's term for the further sign or understanding that a sign produces in a mind."}, {"t": "外示", "en": "denotation", "d": "記号の字義どおりの第一次の意味。共示の土台になる", "dEn": "The literal, first-order meaning of a sign, which is the base for connotation."}, {"t": "神話", "en": "myth", "d": "バルトの用語。共示が当然のものとして社会に定着した意味の体系", "dEn": "Barthes's term for connotations settled in society as if natural."}, {"t": "環世界", "en": "Umwelt", "d": "ユクスキュルの用語。動物が知覚し意味づけた、その種に固有の世界", "dEn": "Uexkull's term for the world as a species perceives and gives meaning to it."}], "people": [{"n": "ソシュール", "en": "Ferdinand de Saussure", "y": "1857-1913", "w": "没後の1916年に弟子が編集した『一般言語学講義』で、記号の理論が伝わった", "wEn": "His theory of the sign was transmitted through the Course in General Linguistics, edited by students in 1916"}, {"n": "パース", "en": "Charles Sanders Peirce", "y": "1839-1914", "w": "記号を類像・指標・象徴に分類する理論を展開した", "wEn": "Developed a theory classifying signs as icons, indexes and symbols"}, {"n": "バルト", "en": "Roland Barthes", "y": "1915-1980", "w": "『神話作用』(1957年)で、大衆文化の記号を分析した", "wEn": "Analyzed signs of popular culture in Mythologies (1957)"}, {"n": "ウンベルト・エーコ", "en": "Umberto Eco", "w": "イタリアの記号学者。『開かれた作品』(1962年)などで解釈の多様性を論じ、小説も書いた", "wEn": "Italian semiotician who discussed the plurality of interpretation in The Open Work (1962) and also wrote novels.", "y": "1932-2016"}, {"n": "ルイ・イェルムスレウ", "en": "Louis Hjelmslev", "w": "ソシュールを受け継ぎ、記号を表現と内容の二つの面で捉える言理学を築いた", "wEn": "Following Saussure, built glossematics, which treats the sign as an expression plane and a content plane.", "y": "1899-1965"}], "example": "赤信号が「止まれ」を意味するのは自然な必然性ではなく、社会の取り決めによる。このような慣習による結びつきの記号を、パースは象徴と呼んだ。", "exampleEn": "A red light means 'stop' not by natural necessity but by social agreement. Peirce called a sign tied to its object by such convention a symbol.", "related": ["interdisciplinary:philosophy-language", "theoretical:semantics", "social:anthro-ling", "interdisciplinary:cognitive-ling"]}};

/* 分野の図解（データ）：専用の図がない分野に、型（流れ・階層・分類・対比・循環・2軸）で描く図。豆知識の追加分は TRIVIA_MORE */
/* 分野の図解（データ）：専用の図がない分野に、型（流れ・階層・分類・対比・循環・2軸）で描く図。豆知識の追加分は TRIVIA_MORE */
/* 分野の図解（データ）：専用の図がない分野に、型（流れ・階層・分類・対比・循環・2軸）で描く図。豆知識の追加分は TRIVIA_MORE */
/* 分野の図解（データ）：専用の図がない分野に、型（流れ・階層・分類・対比・循環・2軸）で描く図。豆知識の追加分は TRIVIA_MORE */
const FIELD_FIGS = {"social:sociolinguistics": [{"type": "tree", "title": "言語変異を左右する社会的要因", "titleEn": "Social factors behind language variation", "caption": "同じ言語でも、話者の属性と場面の違いに応じて形が変わる。枝を押すと例が出る。", "captionEn": "Even within one language, forms shift with who speaks and in what setting. Tap a branch for examples.", "root": {"l": "言語変異", "lEn": "Language variation", "d": "同じ内容を表す言い方が、社会的な条件によって使い分けられること", "dEn": "Different ways of saying the same thing are used according to social conditions."}, "items": [{"l": "社会階層", "lEn": "Social class", "d": "職業・学歴・収入などによる集団差。威信の高い形が上位層に多い傾向がある", "dEn": "Group differences by occupation, education and income; prestige forms tend to be commoner in higher strata.", "sub": [{"l": "威信変種", "lEn": "Prestige form", "d": "社会で高く評価される形。丁寧な場面で増える", "dEn": "A socially valued form; it increases in careful speech."}, {"l": "隠れた威信", "lEn": "Covert prestige", "d": "標準から外れた形が仲間意識を示して好まれること", "dEn": "Non-standard forms favored because they signal group solidarity."}]}, {"l": "年齢", "lEn": "Age", "d": "世代差。一時点の年齢差から変化の進行を読む手がかりになる", "dEn": "Generational differences; age gaps at one time hint at change in progress.", "sub": [{"l": "見かけの時間", "lEn": "Apparent time", "d": "年齢差を言語変化の進行とみなす方法", "dEn": "Treating age differences as evidence of ongoing change."}]}, {"l": "性別", "lEn": "Gender", "d": "男女で出現率が異なる変項がある。安定した変項では標準形が女性に多い傾向が報告される", "dEn": "Some variables differ in rate between men and women; for stable variables, standard forms are often reported to be commoner among women."}, {"l": "場面", "lEn": "Setting", "d": "話し相手や話題、改まり度に応じて同じ人が話し方を変える", "dEn": "The same person changes speech with addressee, topic and formality.", "sub": [{"l": "スタイル切り替え", "lEn": "Style-shifting", "d": "改まった場面ほど標準形が増える", "dEn": "Standard forms increase as the setting becomes more formal."}, {"l": "コードスイッチング", "lEn": "Code-switching", "d": "会話中に言語や変種そのものを切り替える", "dEn": "Switching languages or varieties within a conversation."}]}]}, {"type": "flow", "title": "変異研究の基本の手順", "titleEn": "Steps in a variationist study", "caption": "自然な発話から変項の出現率を数え、社会的要因との関係を調べる流れ。", "captionEn": "From natural speech to counting a variable's rate and relating it to social factors.", "items": [{"l": "変項を決める", "lEn": "Pick a variable", "d": "同じ意味を表す複数の形を選ぶ。例は母音の後の/r/を発音するかどうか", "dEn": "Choose alternative forms with the same meaning, e.g. whether /r/ after a vowel is pronounced."}, {"l": "話者を選ぶ", "lEn": "Sample speakers", "d": "階層・年齢・性別が偏らないように話者を集める", "dEn": "Recruit speakers so that class, age and gender are balanced."}, {"l": "発話を録る", "lEn": "Record speech", "d": "面接や観察で自然な発話を集め、場面も変えて録音する", "dEn": "Collect natural speech through interviews or observation, across several settings."}, {"l": "出現率を数える", "lEn": "Count rates", "d": "各形が出た回数を数え、全体に占める割合を出す", "dEn": "Count each form and compute its share of all cases."}, {"l": "要因と照らす", "lEn": "Relate to factors", "d": "割合を社会的要因ごとに比べ、傾向を統計で確かめる", "dEn": "Compare rates across social factors and test the pattern statistically."}]}, {"type": "compare", "title": "ダイグロシアの高位と低位", "titleEn": "High and low varieties in diglossia", "caption": "ファーガソンは、一つの社会で二つの変種が役割を分けて使われる状態を、機能・威信・習得などの面から比べた。", "captionEn": "Ferguson compared the two varieties that divide roles in one society by function, prestige, acquisition and more.", "left": {"l": "高位変種", "lEn": "High variety"}, "right": {"l": "低位変種", "lEn": "Low variety"}, "rows": [{"k": "使う場面", "kEn": "Use", "a": "礼拝・講義・公文書・報道", "aEn": "Worship, lectures, official documents, news", "b": "家庭・友人・市場での会話", "bEn": "Talk at home, with friends, in markets"}, {"k": "習得", "kEn": "Acquisition", "a": "主に学校で学ぶ", "aEn": "Mostly learned at school", "b": "家庭で自然に身につける", "bEn": "Picked up naturally at home"}, {"k": "威信", "kEn": "Prestige", "a": "高く評価される", "aEn": "Highly valued", "b": "低く見られがち", "bEn": "Often looked down on"}, {"k": "文学の伝統", "kEn": "Literary heritage", "a": "豊かな書き言葉の伝統", "aEn": "A rich written tradition", "b": "書き言葉の伝統は乏しい", "bEn": "A thin written tradition"}, {"k": "例", "kEn": "Examples", "a": "古典アラビア語・標準ドイツ語", "aEn": "Classical Arabic, Standard German", "b": "口語アラビア語・スイスドイツ語", "bEn": "Colloquial Arabic, Swiss German"}]}], "social:anthro-ling": [{"type": "compare", "title": "強い仮説と弱い仮説", "titleEn": "Strong and weak versions of the hypothesis", "caption": "「サピア=ウォーフ仮説」は後世の呼称で、言語が思考を左右する度合いにより強弱二つの読みに分けられる。", "captionEn": "\"Sapir-Whorf hypothesis\" is a later label; it is read in a strong and a weak form, depending on how far language is said to shape thought.", "left": {"l": "言語決定論", "lEn": "Linguistic determinism"}, "right": {"l": "言語相対論", "lEn": "Linguistic relativity"}, "rows": [{"k": "主張", "kEn": "Claim", "a": "言語が思考を決める", "aEn": "Language determines thought", "b": "言語が思考に影響する", "bEn": "Language influences thought"}, {"k": "思考の自由度", "kEn": "Room for thought", "a": "言語にない考えは持てない", "aEn": "No thought beyond one's language", "b": "言語がなくても考えられる", "bEn": "Thought is possible without the words"}, {"k": "翻訳", "kEn": "Translation", "a": "原理的にできない", "aEn": "Impossible in principle", "b": "できるが負担は違う", "bEn": "Possible, but effort differs"}, {"k": "検証", "kEn": "Testing", "a": "実証的な支持がなく退けられた", "aEn": "Set aside for lack of empirical support", "b": "色や空間の実験で検討", "bEn": "Tested in color and space tasks"}, {"k": "現在の位置", "kEn": "Status today", "a": "ほぼ支持されない", "aEn": "Largely unsupported", "b": "穏健な形で議論が続く", "bEn": "Debated in a moderate form"}]}, {"type": "flow", "title": "言語ドキュメンテーションの流れ", "titleEn": "Workflow of language documentation", "caption": "消えゆく言語を、話者の同意のもとで記録し、保存して共同体に返すまでの段階。", "captionEn": "Stages from recording a vanishing language with speakers' consent to archiving it and returning it to the community.", "items": [{"l": "同意を得る", "lEn": "Obtain consent", "d": "話者と共同体に目的を説明し、記録と公開の範囲を合意する", "dEn": "Explain the aims to speakers and the community and agree on what is recorded and shared."}, {"l": "録音・録画", "lEn": "Record", "d": "語り、会話、儀礼など幅広い場面を音声と映像で残す", "dEn": "Capture narratives, conversations and rituals in audio and video."}, {"l": "書き起こし", "lEn": "Transcribe", "d": "音声を文字にし、語ごとの対訳と注釈を付ける", "dEn": "Transcribe the audio and add word-by-word glosses and translations."}, {"l": "保存する", "lEn": "Archive", "d": "資料を整理して、長く読める形でアーカイブに納める", "dEn": "Organize the materials and deposit them in an archive in lasting formats."}, {"l": "共同体へ返す", "lEn": "Give back", "d": "教材や辞書にして、話者の共同体が使えるようにする", "dEn": "Turn the materials into lessons or dictionaries the speech community can use."}]}, {"type": "compare", "title": "エミックとエティック", "titleEn": "Emic and etic viewpoints", "caption": "パイクは、音素論と音声学の違いに倣い、現地の人の視点と外からの視点を分けて文化を調べることを唱えた。", "captionEn": "Following the contrast between phonemics and phonetics, Pike urged studying culture from both the insider's and the outsider's viewpoints.", "left": {"l": "エミック", "lEn": "Emic"}, "right": {"l": "エティック", "lEn": "Etic"}, "rows": [{"k": "立場", "kEn": "Viewpoint", "a": "内部の話者の視点", "aEn": "The insider speaker's view", "b": "外部の観察者の視点", "bEn": "The outside observer's view"}, {"k": "区別の基準", "kEn": "Criterion", "a": "話者にとって意味があるか", "aEn": "Whether it is meaningful to speakers", "b": "誰でも測れる共通の尺度", "bEn": "A common measure anyone can apply"}, {"k": "言語での対応", "kEn": "In language", "a": "音素論の音素", "aEn": "Phonemes in phonemics", "b": "音声学の音声", "bEn": "Phones in phonetics"}, {"k": "長所", "kEn": "Strength", "a": "現地の意味に近づける", "aEn": "Gets close to local meaning", "b": "文化どうしを比べやすい", "bEn": "Eases comparison across cultures"}, {"k": "短所", "kEn": "Weakness", "a": "他の文化と比べにくい", "aEn": "Hard to compare with other cultures", "b": "現地の意味を取りこぼしやすい", "bEn": "May miss local meaning"}]}], "social:dialectology": [{"type": "flow", "title": "言語地図ができるまで", "titleEn": "How a linguistic atlas is made", "caption": "各地で同じ質問をして語形を集め、地図に書き込んで分布の意味を読み取る手順。", "captionEn": "Ask the same questions in many places, plot the forms on maps, and read the meaning of their distribution.", "items": [{"l": "質問票を作る", "lEn": "Design questions", "d": "全地点で同じ質問をするため、項目を前もって決める", "dEn": "Fix the items in advance so every place is asked the same questions."}, {"l": "地点を決める", "lEn": "Choose sites", "d": "調査する地点と、各地点で答える話者を選ぶ", "dEn": "Select the places to survey and the speakers who answer in each."}, {"l": "語形を集める", "lEn": "Collect forms", "d": "面接や質問紙で語形や発音を記録する", "dEn": "Record words and pronunciations by interview or questionnaire."}, {"l": "地図に記す", "lEn": "Plot on maps", "d": "項目ごとに地図を作り、語形を地点に書き込む", "dEn": "Make one map per item and write the forms at each site."}, {"l": "等語線を引く", "lEn": "Draw isoglosses", "d": "分布の境目に線を引き、広がり方の理由を探る", "dEn": "Draw lines at distribution boundaries and look for why forms spread as they did."}]}, {"type": "compare", "title": "方言周圏論と波状理論", "titleEn": "Dialect geography and wave theory", "caption": "どちらも変化が中心から広がる像を使うが、由来と注目点が違う。", "captionEn": "Both use the image of change spreading from a center, but they differ in origin and focus.", "left": {"l": "方言周圏論", "lEn": "Dialect geography theory"}, "right": {"l": "波状理論", "lEn": "Wave theory"}, "rows": [{"k": "着目点", "kEn": "Focus", "a": "語形の新旧の並び方", "aEn": "Order of older and newer forms", "b": "変化の広がり方", "bEn": "How a change spreads"}, {"k": "分布の形", "kEn": "Pattern", "a": "中心の周りの同心円", "aEn": "Concentric rings around a center", "b": "波紋のような広がり", "bEn": "Ripple-like spread"}, {"k": "遠い地域", "kEn": "Distant areas", "a": "古い形が残りやすい", "aEn": "Older forms tend to survive", "b": "変化が遅れて届く", "bEn": "Change arrives later"}, {"k": "代表例", "kEn": "Example", "a": "柳田国男の蝸牛考(1930年)", "aEn": "Yanagita Kunio's study of snail words (1930)", "b": "シュミットの印欧語論(1872年)", "bEn": "Johannes Schmidt's work on Indo-European (1872)"}]}, {"type": "tree", "title": "日本語の方言区画", "titleEn": "Division of Japanese dialects", "caption": "東条操の区画では、日本語の方言をまず本土方言と琉球方言に分け、さらに下位に分ける。枝を押すと説明が出る。", "captionEn": "In Tojo's scheme Japanese dialects are first split into mainland and Ryukyuan groups, then subdivided. Tap a branch for details.", "root": {"l": "日本語の方言", "lEn": "Japanese dialects", "d": "東条操の区画では、まず本土方言と琉球方言の二つに大きく分ける", "dEn": "In Tojo's scheme the dialects are first divided into mainland and Ryukyuan."}, "items": [{"l": "本土方言", "lEn": "Mainland dialects", "d": "九州を含む本土の方言。東部・西部・九州の三つに分かれる", "dEn": "The dialects of the mainland including Kyushu, divided into eastern, western and Kyushu groups.", "sub": [{"l": "東部方言", "lEn": "Eastern dialects", "d": "東日本の方言群。東北・関東・東海東山などに分かれる", "dEn": "The eastern group, including Tohoku, Kanto and Tokai-Tosan."}, {"l": "西部方言", "lEn": "Western dialects", "d": "西日本の方言群。近畿・中国・四国などに分かれる", "dEn": "The western group, including Kinki, Chugoku and Shikoku."}, {"l": "九州方言", "lEn": "Kyushu dialects", "d": "豊日・肥筑・薩隅の三つに分かれる", "dEn": "Divided into Honichi, Hichiku and Satsugu."}]}, {"l": "琉球方言", "lEn": "Ryukyuan dialects", "d": "沖縄などの島々の方言。奄美・沖縄・先島に分かれる", "dEn": "The dialects of Okinawa and other islands, divided into Amami, Okinawa and Sakishima.", "sub": [{"l": "奄美方言", "lEn": "Amami dialects", "d": "奄美群島の方言", "dEn": "The dialects of the Amami Islands."}, {"l": "沖縄方言", "lEn": "Okinawa dialects", "d": "沖縄本島周辺の方言", "dEn": "The dialects around the main island of Okinawa."}, {"l": "先島方言", "lEn": "Sakishima dialects", "d": "宮古・八重山など先島諸島の方言", "dEn": "The dialects of the Sakishima Islands such as Miyako and Yaeyama."}]}]}], "psycho:psycholinguistics": [{"type": "flow", "title": "発話産出の段階", "titleEn": "Stages of Speech Production", "caption": "言いたい内容が音になるまでの流れ。言い間違いは、どの段階で起きたかを示す手がかりになる。", "captionEn": "From an intended message to sound. Speech errors hint at the stage where something went wrong.", "items": [{"l": "概念化", "lEn": "Conceptualization", "d": "伝えたい内容を決める段階。何を言うかを準備する。", "dEn": "Deciding what to say; the message to be expressed is prepared."}, {"l": "語の選択", "lEn": "Lemma selection", "d": "心内辞書から意味と文法情報を持つ語を選ぶ。言い間違いでは類義語に入れ替わることがある。", "dEn": "A word with its meaning and grammar is chosen from the mental lexicon. Errors here often swap in a related word."}, {"l": "音韻符号化", "lEn": "Phonological encoding", "d": "選んだ語に音の並びを与え、文全体の音の列に組み立てる。音の入れ替えはここで起こるとされる。", "dEn": "Sounds are assigned to the chosen words and assembled into a sequence. Sound swaps are thought to arise here."}, {"l": "調音", "lEn": "Articulation", "d": "音の計画を口や舌の運動として実行し、実際の音声にする。", "dEn": "The sound plan is carried out as movements of the mouth and tongue, producing actual speech."}, {"l": "自己モニタリング", "lEn": "Self-monitoring", "d": "自分の発話を聞いて誤りを検出し、言い直す。発話の途中でも働く。", "dEn": "Speakers listen to their own speech, detect errors and repair them, even in mid-utterance."}]}, {"type": "compare", "title": "文解析の二つの見方", "titleEn": "Two Views of Sentence Parsing", "caption": "ガーデンパス文の読みをどう説明するかで、二段階モデルと制約充足モデルが対立する。", "captionEn": "Two-stage and constraint-based models explain garden-path reading in different ways.", "left": {"l": "二段階モデル", "lEn": "Two-stage model"}, "right": {"l": "制約充足モデル", "lEn": "Constraint-based model"}, "rows": [{"k": "最初の解析", "kEn": "First pass", "a": "統語情報だけで一つに決める", "aEn": "Decides on one analysis from syntax alone", "b": "複数の解釈を同時に比べる", "bEn": "Weighs several readings at once"}, {"k": "意味や文脈", "kEn": "Meaning and context", "a": "後の段階で使う", "aEn": "Used only at a later stage", "b": "最初から使う", "bEn": "Used from the start"}, {"k": "代表的な原則", "kEn": "Key principle", "a": "最小結合、遅い閉じ", "aEn": "Minimal attachment, late closure", "b": "語の頻度や使われ方の統計", "bEn": "Word frequency and usage statistics"}, {"k": "再解析", "kEn": "Reanalysis", "a": "誤った解析を捨てて作り直す", "aEn": "Discards the wrong parse and rebuilds", "b": "優勢な解釈が入れ替わる", "bEn": "The leading reading is replaced"}]}, {"type": "tree", "title": "語の認識を左右する要因", "titleEn": "Factors shaping word recognition", "caption": "語彙決定課題などの実験で、語の認識の速さは語そのものの性質と前後の文脈の両方に左右されることが示されてきた。", "captionEn": "Experiments such as lexical decision tasks show that speed of word recognition depends on both a word's own properties and its context.", "root": {"l": "語の認識", "lEn": "Word recognition", "d": "文字や音の入力から、心的辞書の中の語を見つけ出す過程", "dEn": "The process of finding a word in the mental lexicon from letters or sounds."}, "items": [{"l": "頻度", "lEn": "Frequency", "d": "よく出会う語ほど速く正確に認識される", "dEn": "Words met more often are recognized faster and more accurately.", "sub": [{"l": "頻度効果", "lEn": "Frequency effect", "d": "高頻度語は低頻度語より速く判断される", "dEn": "High-frequency words are judged faster than low-frequency ones."}]}, {"l": "習得年齢", "lEn": "Age of acquisition", "d": "早い時期に覚えた語ほど、処理が速い傾向がある", "dEn": "Words learned early tend to be processed faster."}, {"l": "近隣語", "lEn": "Neighbors", "d": "似た綴りや音の語が多いか少ないかで、処理の速さが変わる", "dEn": "Processing speed varies with how many words resemble the target in spelling or sound."}, {"l": "文脈", "lEn": "Context", "d": "直前の語や文の意味が、関連する語の認識を速める", "dEn": "The meaning of preceding words or sentences speeds recognition of related words.", "sub": [{"l": "プライミング", "lEn": "Priming", "d": "「医者」の後に「看護師」が速く認識される", "dEn": "'Nurse' is recognized faster after 'doctor'."}]}]}], "psycho:l1-acquisition": [{"type": "flow", "title": "母語の発達のみちすじ", "titleEn": "Path of Early Language Development", "caption": "月齢や年齢は目安で個人差が大きい。音から語、文へと、単位が少しずつ大きくなる。", "captionEn": "Ages are rough guides and vary widely. The units grow step by step from sounds to words to sentences.", "items": [{"l": "喃語", "lEn": "Babbling", "d": "生後6〜10か月ごろから、ba-ba のような音節を繰り返す。母語に使われる音へ次第に近づく。", "dEn": "From about six to ten months, babies repeat syllables like 'ba-ba', gradually shifting toward the sounds of the native language."}, {"l": "一語文", "lEn": "One-word stage", "d": "1歳ごろ、一つの語で文の働きをする。例えば、まんま、で食べたいを表す。", "dEn": "Around age one, a single word serves as a whole utterance, such as one word meaning 'I want food'."}, {"l": "二語文", "lEn": "Two-word stage", "d": "1歳半から2歳ごろ、二つの語をつなぐ。ワンワン きた、のように語順が現れ始める。", "dEn": "At about 18 to 24 months, two words are combined, and word order begins to appear."}, {"l": "多語文", "lEn": "Multiword sentences", "d": "助詞や活用語尾などの文法要素が増え、文が長くなる。過剰般化の誤りもこの時期に目立つ。", "dEn": "Grammatical elements such as particles and inflections increase and sentences lengthen. Overgeneralization errors are conspicuous now."}, {"l": "複文", "lEn": "Complex sentences", "d": "2〜3歳ごろから、節をつないだ文や、からや けれども を使った文が出始める。初めは決まった言い回しが多い。", "dEn": "From about age two to three, sentences with linked clauses and conjunctions begin to appear, often as fixed phrases at first."}]}, {"type": "compare", "title": "生得説と使用依拠の立場", "titleEn": "Nativist vs. Usage-Based Views", "caption": "文法はどこから来るのかをめぐる、言語獲得論の二つの代表的な考え方の対比。", "captionEn": "Two leading theories of where a child's grammar comes from.", "left": {"l": "生得説", "lEn": "Nativist"}, "right": {"l": "使用依拠", "lEn": "Usage-based"}, "rows": [{"k": "出発点", "kEn": "Starting point", "a": "生得的な文法知識を持つ", "aEn": "Born with innate grammatical knowledge", "b": "一般的な認知能力を持つ", "bEn": "Born with general cognitive abilities"}, {"k": "入力の役割", "kEn": "Role of input", "a": "生得知識の設定を決める", "aEn": "Sets the parameters of innate knowledge", "b": "文法を作る材料そのもの", "bEn": "The very material grammar is built from"}, {"k": "刺激の貧困", "kEn": "Poverty of stimulus", "a": "入力は不足すると考える", "aEn": "Holds that input is insufficient", "b": "入力は十分に豊かと考える", "bEn": "Holds that input is rich enough"}, {"k": "代表的な論者", "kEn": "Representatives", "a": "チョムスキー", "aEn": "Chomsky", "b": "トマセロ", "bEn": "Tomasello"}]}, {"type": "tree", "title": "語の意味を推測する手がかり", "titleEn": "Cues for guessing word meaning", "caption": "新しい語を聞いた幼児は、可能な意味を絞るための仮定や手がかりを使うと考えられてきた。マークマンらの制約と共同注意を並べる。", "captionEn": "Hearing a new word, young children narrow the possible meanings with assumptions and cues. Markman's constraints are shown alongside joint attention.", "root": {"l": "語の意味の推測", "lEn": "Guessing a word's meaning", "d": "一つの語に対して、物の可能な指し方は無数にある。幼児はそれを絞って推測する", "dEn": "A word could point to countless things; children narrow the options when guessing."}, "items": [{"l": "事物全体の仮定", "lEn": "Whole-object", "d": "新しい語は、物の部分や色でなく物全体の名前だと考える傾向", "dEn": "A tendency to take a new word as naming the whole object, not a part or a color."}, {"l": "分類の仮定", "lEn": "Taxonomic", "d": "新しい語を、関連する物でなく同じ種類の物に広げる傾向", "dEn": "A tendency to extend a new word to things of the same kind, not to related things."}, {"l": "相互排他性", "lEn": "Mutual exclusivity", "d": "一つの物には一つの名前しかないと考え、新しい語は名前を知らない物を指すと推測する", "dEn": "Assuming one name per object, so a new word is guessed to name something that has no name yet.", "sub": [{"l": "未知の物を選ぶ", "lEn": "Pick the unknown", "d": "知っている物と知らない物が並ぶと、新しい語を知らない物に結びつける", "dEn": "Given a known and an unknown object, links the new word to the unknown one."}]}, {"l": "大人の視線", "lEn": "Adult gaze", "d": "大人が見ている物や指す物を手がかりに、語の指す先を決める", "dEn": "Uses what an adult looks at or points to to decide what a word refers to.", "sub": [{"l": "共同注意", "lEn": "Joint attention", "d": "同じ物を見ているという共有が、語と物の結びつきを支える", "dEn": "Shared attention to the same object supports linking words to things."}]}]}], "psycho:l2-acquisition": [{"type": "flow", "title": "入力から産出までの過程", "titleEn": "From Input to Output", "caption": "学習者の中で言語の知識が更新されていく流れ。入力仮説、気づき、アウトプット仮説が各段階に対応する。", "captionEn": "How a learner's knowledge gets updated. The input, noticing and output hypotheses each address one step.", "items": [{"l": "インプット", "lEn": "Input", "d": "聞いたり読んだりして触れる言語。理解できる入力が大切だとクラッシェンは考えた。", "dEn": "Language heard or read. Krashen argued that comprehensible input is what matters."}, {"l": "気づき", "lEn": "Noticing", "d": "入力の中の形に注意が向く段階。シュミットは、入力が取り込みになるには気づきが必要だと論じた。", "dEn": "The stage where attention falls on a form in the input. Schmidt argued that noticing is necessary for input to become intake."}, {"l": "取り込み", "lEn": "Intake", "d": "注意を向けた部分が、学習者の知識に取り込まれる。入力のすべてが取り込まれるわけではない。", "dEn": "The attended part is taken into the learner's knowledge. Not all input becomes intake."}, {"l": "中間言語の更新", "lEn": "Interlanguage update", "d": "取り込んだ内容をもとに、学習者独自の規則の体系が書き換わる。", "dEn": "The learner's own system of rules is revised on the basis of what was taken in."}, {"l": "アウトプット", "lEn": "Output", "d": "実際に話す、書く。スウェインは、産出が自分の知識の不足への気づきも促すと論じた。", "dEn": "Actually speaking or writing. Swain argued that production also reveals gaps in one's own knowledge."}]}, {"type": "tree", "title": "母語転移の種類", "titleEn": "Kinds of L1 Transfer", "caption": "母語の影響は、助けになる場合と妨げになる場合があり、使うのを避けるという形でも現れる。", "captionEn": "The native language can help or hinder, and its influence can also show up as avoidance.", "root": {"l": "母語転移", "lEn": "L1 transfer", "d": "母語の知識が第二言語の習得に影響すること。", "dEn": "The influence of native-language knowledge on second language acquisition."}, "items": [{"l": "正の転移", "lEn": "Positive transfer", "d": "母語と目標言語が似ている部分で、学習が楽になる。", "dEn": "Learning is easier where the native and target languages are alike.", "sub": [{"l": "共通の構造", "lEn": "Shared structure", "d": "語順などが共通だと、そのまま使えて誤りが少ない。", "dEn": "Shared features such as word order can be reused with few errors."}, {"l": "同根語", "lEn": "Cognates", "d": "似た形と意味の語が多いと、語彙の習得が速い。", "dEn": "Words with similar form and meaning speed up vocabulary learning."}]}, {"l": "負の転移", "lEn": "Negative transfer", "d": "母語と目標言語が異なる部分で、母語の規則が誤りの原因になる。", "dEn": "Where the languages differ, native-language rules cause errors.", "sub": [{"l": "語順の持ち込み", "lEn": "Word-order carryover", "d": "母語の語順を目標言語の文に当てはめてしまう。", "dEn": "The native word order is applied to target-language sentences."}, {"l": "音の聞き分け", "lEn": "Sound discrimination", "d": "母語にない音の区別が、聞き取りや発音で難しくなる。", "dEn": "Sound contrasts absent from the native language are hard to hear and produce."}]}, {"l": "回避", "lEn": "Avoidance", "d": "難しい構造を避けて、使えそうな別の表現ですませる。", "dEn": "Difficult structures are avoided in favor of expressions that seem easier.", "sub": [{"l": "関係節の回避", "lEn": "Avoiding relative clauses", "d": "シャクターは、中国語や日本語の話者が英語の関係節を避ける傾向を報告した。", "dEn": "Schachter reported that Chinese and Japanese speakers tended to avoid English relative clauses."}]}]}, {"type": "compare", "title": "文法中心と意味中心の指導", "titleEn": "Focus on forms and focus on form", "caption": "ロングは1991年に、意味のやりとりの中で必要に応じて形式へ注意を向ける指導を、文法項目を順に教える指導と区別した。", "captionEn": "In 1991 Long distinguished teaching that draws attention to form within meaningful exchange from teaching grammar items one by one.", "left": {"l": "文法項目中心の指導", "lEn": "Focus on forms"}, "right": {"l": "意味の中の形式注目", "lEn": "Focus on form"}, "rows": [{"k": "授業の軸", "kEn": "Lesson axis", "a": "文法項目を順に取り上げる", "aEn": "Takes grammar items one by one", "b": "意味のある活動が軸になる", "bEn": "Built around meaningful tasks"}, {"k": "形式の扱い", "kEn": "Treatment of form", "a": "あらかじめ決めた形式を教える", "aEn": "Teaches pre-selected forms", "b": "困難が出た時に形式へ注意を向ける", "bEn": "Draws attention when trouble arises"}, {"k": "学習者の注意", "kEn": "Learner attention", "a": "形式そのものに向く", "aEn": "Directed at the form itself", "b": "意味から形式へ短く移る", "bEn": "Shifts briefly from meaning to form"}, {"k": "主な例", "kEn": "Typical example", "a": "文型練習や文法説明", "aEn": "Pattern drills and grammar explanation", "b": "課題中の言い直しや訂正", "bEn": "Recasts and corrections during a task"}]}], "interdisciplinary:philosophy-language": [{"type": "tree", "title": "言語行為の三つの層", "titleEn": "Three layers of a speech act", "caption": "オースティンは一つの発話を、言う行為・発語内行為・発語媒介行為の三つの面から分けた。", "captionEn": "Austin analyzed a single utterance on three levels: saying, the act performed in saying, and the effect produced.", "root": {"l": "発話という行為", "lEn": "Utterance as act", "d": "「また連絡するよ」のような一つの発話が、同時に複数の行為になる。", "dEn": "One utterance such as 'I will call you' is several acts at once."}, "items": [{"l": "発語行為", "lEn": "Locutionary act", "d": "音と語を組み合わせ、意味のある文を言う行為そのもの。", "dEn": "The act of uttering a meaningful sentence: sounds, words and sense."}, {"l": "発語内行為", "lEn": "Illocutionary act", "d": "発話によって約束・依頼・命名・警告などを行う行為。", "dEn": "The act performed in speaking, such as promising, requesting, naming or warning."}, {"l": "発語媒介行為", "lEn": "Perlocutionary act", "d": "発話の結果として、相手を説得したり驚かせたりする効果。", "dEn": "The effect on the hearer, such as persuading or surprising, produced by the utterance."}]}, {"type": "compare", "title": "名前の指示:記述説と因果説", "titleEn": "Reference of names: description vs causal", "caption": "固有名はなぜ特定の人を指せるのか。記述説とクリプキの因果的な見方を対比する。", "captionEn": "How does a proper name pick out a particular person? Descriptivism is contrasted with Kripke's causal picture.", "left": {"l": "記述説", "lEn": "Descriptivism"}, "right": {"l": "因果的指示理論", "lEn": "Causal theory"}, "rows": [{"k": "名の意味", "kEn": "Meaning of a name", "a": "結びついた記述", "aEn": "An associated description", "b": "命名からの因果の連鎖", "bEn": "A causal chain from naming"}, {"k": "代表者", "kEn": "Proponents", "a": "フレーゲ、ラッセル", "aEn": "Frege, Russell", "b": "クリプキ", "bEn": "Kripke"}, {"k": "可能世界", "kEn": "Possible worlds", "a": "世界ごとに指示が変わりうる", "aEn": "Reference may vary by world", "b": "どの世界でも同じ対象", "bEn": "Same object in every world"}, {"k": "鍵となる例", "kEn": "Key example", "a": "宵の明星と明けの明星", "aEn": "Evening and morning star", "b": "ゲーデルとシュミットの例", "bEn": "The Godel and Schmidt case"}]}, {"type": "compare", "title": "意味の指示説と使用説", "titleEn": "Referential and use theories of meaning", "caption": "語の意味を、語が指す対象に求めるか、言語の中での使われ方に求めるか。後期ウィトゲンシュタインは後者を打ち出した。", "captionEn": "Does a word's meaning lie in the object it names or in how it is used in the language? Later Wittgenstein put forward the latter.", "left": {"l": "指示説", "lEn": "Referential theory"}, "right": {"l": "使用説", "lEn": "Use theory"}, "rows": [{"k": "意味とは", "kEn": "Meaning is", "a": "語が指す対象", "aEn": "The object the word names", "b": "言語での使われ方", "bEn": "How the word is used in the language"}, {"k": "「机」の場合", "kEn": "For 'desk'", "a": "机という物そのもの", "aEn": "The desk itself", "b": "「机を持ってきて」と頼むなどの使い方", "bEn": "Uses such as asking someone to bring a desk"}, {"k": "「ありがとう」", "kEn": "For 'thank you'", "a": "指す物がなく説明しにくい", "aEn": "Names no object, so hard to explain", "b": "感謝を表す使い方として説明できる", "bEn": "Explained as a use for expressing thanks"}, {"k": "問われる点", "kEn": "Open question", "a": "指す対象がない語や機能語をどう扱うか", "aEn": "How to treat words with no object, and function words", "b": "使い方の違いを意味の違いとどう区別するか", "bEn": "How to tell differences in use from differences in meaning"}]}], "interdisciplinary:cognitive-ling": [{"type": "layers", "title": "カテゴリーの三つのレベル", "titleEn": "Three levels of categorization", "caption": "ロッシュによると、人は上位・基本・下位のうち、中ほどの基本レベルで最も自然にものを分ける。", "captionEn": "Rosch showed that of superordinate, basic and subordinate levels, people categorize most naturally at the basic level.", "items": [{"l": "上位レベル", "lEn": "Superordinate", "d": "例は「動物」。共通点が少なく、形を思い浮かべにくい。", "dEn": "E.g. 'animal'. Few shared features and hard to picture as one shape."}, {"l": "基本レベル", "lEn": "Basic level", "d": "例は「犬」。形も動作も思い浮かべやすく、幼児が早くから使う語になりやすい。", "dEn": "E.g. 'dog'. Easy to picture in shape and action; often among the first object words children use."}, {"l": "下位レベル", "lEn": "Subordinate", "d": "例は「柴犬」。基本レベルより細かく、専門知識で使い分ける。", "dEn": "E.g. 'Shiba'. More specific than the basic level, used with expert knowledge."}]}, {"type": "tree", "title": "イメージスキーマの代表例", "titleEn": "Typical image schemas", "caption": "身体経験から生まれる単純な型が、抽象的な事柄を語る比喩の土台になる。枝を押すと例が出る。", "captionEn": "Simple patterns born of bodily experience underlie metaphors about abstract matters. Tap a branch for examples.", "root": {"l": "イメージスキーマ", "lEn": "Image schema", "d": "身体経験から得られる、反復的で単純な認知の型", "dEn": "A simple, recurrent cognitive pattern drawn from bodily experience."}, "items": [{"l": "容器", "lEn": "Container", "d": "内部・境界・外部からなる型。「眠りに入る」のように抽象的な状態にも使う", "dEn": "A pattern of interior, boundary and exterior, also applied to abstract states as in falling asleep.", "sub": [{"l": "内と外", "lEn": "In and out", "d": "境界をはさんで内側と外側を分ける", "dEn": "Divides inside from outside across a boundary."}]}, {"l": "経路", "lEn": "Source-Path-Goal", "d": "起点から着点へ向かう移動の型。「人生の道を歩む」の土台", "dEn": "A pattern of movement from a start to a goal; the base of walking the road of life.", "sub": [{"l": "起点と着点", "lEn": "Start and goal", "d": "移動の出発点と到達点", "dEn": "The point where movement begins and where it ends."}]}, {"l": "上下", "lEn": "Up-Down", "d": "垂直方向の型。「気分が上がる」のように量や価値の増減と結びつく", "dEn": "A vertical pattern linked to more and less, as in one's mood going up."}, {"l": "力", "lEn": "Force", "d": "押す・引く・妨げるといった力の働きの型。「圧力に負ける」の土台", "dEn": "A pattern of pushing, pulling or blocking; the base of giving in to pressure."}]}], "interdisciplinary:generative-grammar": [{"type": "flow", "title": "ミニマリストの文の組み立て", "titleEn": "Building a sentence in minimalism", "caption": "語彙項目を選び、併合で構造を作り、音と意味の二つの面へ送り出すという流れ。", "captionEn": "Lexical items are chosen, Merge builds structure, and the result is sent to the sound and meaning interfaces.", "items": [{"l": "語彙項目の選択", "lEn": "Select items", "d": "文に使う語を語彙部門から選び出す段階。", "dEn": "The stage where the words for the sentence are drawn from the lexicon."}, {"l": "併合", "lEn": "Merge", "d": "二つの要素を一つにまとめる基本操作。くり返して階層構造を作る。", "dEn": "The basic operation joining two elements into one, repeated to build hierarchy."}, {"l": "移動", "lEn": "Move", "d": "すでにある要素を構造の上位に再び併合する操作。疑問文などで働く。", "dEn": "Re-merging an existing element higher in the structure, as in questions."}, {"l": "書き出し", "lEn": "Spell-Out", "d": "構造を音の側と意味の側へ分けて送る時点。", "dEn": "The point where the structure is sent to the sound side and the meaning side."}, {"l": "音声形式と論理形式", "lEn": "PF and LF", "d": "発音のための表示と、解釈のための表示の二つ。", "dEn": "The two representations: one for pronunciation and one for interpretation."}]}, {"type": "layers", "title": "チョムスキー階層", "titleEn": "The Chomsky hierarchy", "caption": "チョムスキーが1950年代に整理した、書き換え規則の制限の強さで文法を入れ子に分ける階層。", "captionEn": "A nested classification of grammars by how restricted their rewriting rules are, set out by Chomsky in the 1950s.", "items": [{"l": "正規文法", "lEn": "Regular", "d": "規則の形が最も限られる。有限状態の仕組みで扱える(タイプ3)", "dEn": "The most restricted rule forms, handled by finite-state machinery (Type 3)."}, {"l": "文脈自由文法", "lEn": "Context-free", "d": "一つの記号を、周りに関係なく書き換える。プログラミング言語の構文に多用(タイプ2)", "dEn": "Rewrites a single symbol regardless of its surroundings; widely used for programming syntax (Type 2)."}, {"l": "文脈依存文法", "lEn": "Context-sensitive", "d": "記号を周りの記号に応じて書き換える(タイプ1)", "dEn": "Rewrites a symbol depending on the symbols around it (Type 1)."}, {"l": "無制限文法", "lEn": "Unrestricted", "d": "規則に制限がなく、チューリング機械が扱える範囲に当たる(タイプ0)", "dEn": "Rules are unrestricted, matching what a Turing machine can handle (Type 0)."}]}], "interdisciplinary:functional-ling": [{"type": "tree", "title": "言語の三つのメタ機能", "titleEn": "The three metafunctions of language", "caption": "ハリデーは、節が同時に三つの働きを担うとみて、それぞれに対応する文法の仕組みを示した。", "captionEn": "Halliday saw each clause as doing three jobs at once, each matched by its own grammatical system.", "root": {"l": "節の三つの働き", "lEn": "Clause functions", "d": "一つの節が、世界の描写・相手との関係・文章の組み立てを同時に担う。", "dEn": "One clause at once represents the world, relates speaker and hearer, and organizes text."}, "items": [{"l": "観念構成的", "lEn": "Ideational", "d": "経験を言葉で描く働き。経験的機能は及物性が中心となる。", "dEn": "Representing experience in language; the experiential part centers on transitivity.", "sub": [{"l": "経験的機能", "lEn": "Experiential", "d": "誰が何をどうしたかという出来事の内容を表す。", "dEn": "Expresses who did what to whom."}, {"l": "論理的機能", "lEn": "Logical", "d": "節どうしがどうつながるかの関係を表す。", "dEn": "Expresses links between clauses."}]}, {"l": "対人的", "lEn": "Interpersonal", "d": "話し手と聞き手の関係を作る働き。", "dEn": "Enacting the relation between speaker and hearer.", "sub": [{"l": "ムード", "lEn": "Mood", "d": "平叙・疑問・命令など、発話の役割の別を表す。", "dEn": "Declarative, interrogative, imperative and so on."}, {"l": "モダリティ", "lEn": "Modality", "d": "可能性や義務の度合いを話し手がどう示すか。", "dEn": "Marks degrees of probability or obligation."}]}, {"l": "テクスト的", "lEn": "Textual", "d": "節を文章の流れの中に位置づける働き。", "dEn": "Fitting a clause into the flow of the text.", "sub": [{"l": "テーマ構造", "lEn": "Theme structure", "d": "文の出発点となる部分と、残りの部分との区別。", "dEn": "The split between starting point and the rest."}, {"l": "情報構造", "lEn": "Information", "d": "既知の情報と新しい情報をどう配分するか。", "dEn": "The distribution of given and new information."}]}]}, {"type": "layers", "title": "言語の四つの層", "titleEn": "Four strata of language", "caption": "機能言語学では、言語を文脈・意味・語彙文法・音韻の層に分け、上の層が下の層で実現されるとみる。", "captionEn": "Functional linguistics divides language into context, semantics, lexicogrammar and phonology, each realized by the one below.", "items": [{"l": "文脈", "lEn": "Context", "d": "場面・目的・参加者など、テクストを取り巻く社会的な状況", "dEn": "The social situation around a text: setting, purpose and participants."}, {"l": "意味", "lEn": "Semantics", "d": "観念的・対人的・テクスト的な意味の選択が行われる層", "dEn": "The stratum where ideational, interpersonal and textual meanings are chosen."}, {"l": "語彙文法", "lEn": "Lexicogrammar", "d": "語彙と文法を一つの連続体として扱い、意味を語や構造で表す", "dEn": "Treats vocabulary and grammar as one continuum that expresses meaning in words and structures."}, {"l": "音韻・表記", "lEn": "Phonology", "d": "意味を音や文字の形として実現する最も下の層", "dEn": "The lowest stratum, which realizes meaning as sounds or written forms."}]}], "interdisciplinary:discourse-analysis": [{"type": "compare", "title": "結束性と一貫性", "titleEn": "Cohesion and coherence", "caption": "文章がまとまって読めるのは、表面のつながりと、読み手が補う意味のつながりの両方による。", "captionEn": "A text reads as unified through surface links and through the meaning connections a reader supplies.", "left": {"l": "結束性", "lEn": "Cohesion"}, "right": {"l": "一貫性", "lEn": "Coherence"}, "rows": [{"k": "所在", "kEn": "Where it lies", "a": "テクストの表面", "aEn": "On the surface of the text", "b": "読み手の理解の中", "bEn": "In the reader's understanding"}, {"k": "手がかり", "kEn": "Clues", "a": "接続詞・代名詞・語の反復", "aEn": "Connectives, pronouns, repetition", "b": "背景知識と推論", "bEn": "Background knowledge, inference"}, {"k": "具体例", "kEn": "Example", "a": "「それ」「しかし」", "aEn": "'it', 'however'", "b": "「電話だよ」「今お風呂」", "bEn": "'Phone!' 'In the bath.'"}, {"k": "欠けると", "kEn": "If lacking", "a": "つながりが見えにくい", "aEn": "Links are hard to see", "b": "意味が通じなくなる", "bEn": "The text stops making sense"}]}, {"type": "flow", "title": "語りの六つの構成要素", "titleEn": "Six parts of a narrative", "caption": "ラボフは個人的体験の語りを六つの部分に分けた。すべてが揃うとは限らず、評価は語り全体にも散らばる。", "captionEn": "Labov divided narratives of personal experience into six parts; not all always appear, and evaluation is also spread through the telling.", "items": [{"l": "要約", "lEn": "Abstract", "d": "語りの冒頭で、これから話す内容を一言で示す", "dEn": "Opens the telling with a short statement of what is to come."}, {"l": "状況設定", "lEn": "Orientation", "d": "時・場所・登場人物・場面を聞き手に伝える", "dEn": "Tells the listener the time, place, people and situation."}, {"l": "展開", "lEn": "Complicating action", "d": "出来事を起こった順に述べ、話を前へ進める", "dEn": "Narrates events in the order they happened and moves the story on."}, {"l": "評価", "lEn": "Evaluation", "d": "話の要点や、語り手がなぜ話すのかを示す", "dEn": "Shows the point of the story and why the teller is telling it."}, {"l": "結果", "lEn": "Resolution", "d": "出来事がどう決着したかを述べる", "dEn": "Says how the events turned out."}, {"l": "終結", "lEn": "Coda", "d": "語りを終え、聞き手を現在の話題に戻す", "dEn": "Closes the telling and brings the listener back to the present."}]}], "interdisciplinary:conversation-analysis": [{"type": "cycle", "title": "順番交替のめぐり", "titleEn": "The turn-taking cycle", "caption": "サックスらは、会話の順番が小さな単位ごとに区切られ、そのたびに次の話者が決まる循環として描いた。", "captionEn": "Sacks and colleagues described turns as a cycle: a unit ends, and each time the next speaker is settled.", "items": [{"l": "順番構成単位", "lEn": "Turn unit", "d": "語・句・節など、話者が一つの順番として話し切る単位。", "dEn": "A word, phrase or clause that a speaker can complete as one turn."}, {"l": "移行適切場所", "lEn": "Transition place", "d": "単位の終わり付近で、話者交替が起こりうる位置。", "dEn": "The point near the end of a unit where a change of speaker may occur."}, {"l": "次話者の決定", "lEn": "Choosing next", "d": "現話者の指名か、他の人の自己選択か、現話者の続行かが決まる。", "dEn": "Settled by current speaker selection, self-selection, or the speaker continuing."}, {"l": "次の発話の開始", "lEn": "Next turn starts", "d": "間をほとんど置かずに次の話者が話し始め、また単位が始まる。", "dEn": "The next speaker starts with little gap, and a new unit begins."}]}, {"type": "matrix", "title": "修復の四つの型", "titleEn": "Four types of repair", "caption": "言い直しの問題を示すのが誰か、直すのが誰かの二つの軸で、修復を四つに分ける。", "captionEn": "Repair divides into four types by who flags the trouble and who fixes it.", "x": {"l": "開始者", "lEn": "Initiator"}, "y": {"l": "修復者", "lEn": "Repairer"}, "cells": [{"l": "自己開始自己修復", "lEn": "Self-self", "d": "話し手が言い淀み、自分で言い直す。最もよく見られる型。", "dEn": "The speaker hesitates and fixes it alone; the most common type."}, {"l": "他者開始自己修復", "lEn": "Other-self", "d": "聞き手が「えっ?」と問い、話し手が言い直す。", "dEn": "The hearer queries with 'huh?' and the speaker fixes it."}, {"l": "自己開始他者修復", "lEn": "Self-other", "d": "話し手が言葉を探し、相手が補う。", "dEn": "The speaker searches for a word and the partner supplies it."}, {"l": "他者開始他者修復", "lEn": "Other-other", "d": "聞き手が誤りを指摘し、そのまま訂正する。", "dEn": "The hearer points out an error and corrects it directly."}]}, {"type": "tree", "title": "隣接ペアの三つの拡張", "titleEn": "Three expansions of an adjacency pair", "caption": "シェグロフの整理では、基本の対の前・間・後に別の連鎖が付くことで、会話の連鎖は伸びていく。", "captionEn": "In Schegloff's account, sequences grow when other sequences attach before, between or after the base pair.", "root": {"l": "基本の対", "lEn": "Base pair", "d": "質問と答えのように、第一部分と第二部分でできる最小の連鎖", "dEn": "The minimal sequence of a first part and a second part, such as a question and an answer."}, "items": [{"l": "先行拡張", "lEn": "Pre-expansion", "d": "第一部分の前に付き、本題に入ってよいかを探る", "dEn": "Placed before the first part to check whether the main action can proceed.", "sub": [{"l": "誘いの前置き", "lEn": "Pre-invitation", "d": "「今夜ひま?」と問い、誘いの可否をうかがう", "dEn": "Asking 'Free tonight?' to test the ground for an invitation."}]}, {"l": "挿入拡張", "lEn": "Insert expansion", "d": "第一部分と第二部分の間に入り、答えの前に確認をはさむ", "dEn": "Comes between the two parts, adding a check before the answer is given.", "sub": [{"l": "確認の挿入", "lEn": "Clarifying insert", "d": "「誰の?」と問い返してから、もとの質問に答える", "dEn": "Asking 'Whose?' before answering the original question."}]}, {"l": "後続拡張", "lEn": "Post-expansion", "d": "第二部分の後に付き、答えを受け止めて連鎖を閉じる", "dEn": "Follows the second part, receiving the answer and closing the sequence.", "sub": [{"l": "受け止め", "lEn": "Receipt", "d": "答えのあとに「そっか」「なるほど」と受ける", "dEn": "Receiving the answer with a short 'I see' or 'oh'."}]}]}], "interdisciplinary:stylistics": [{"type": "layers", "title": "文体分析の言語レベル", "titleEn": "Linguistic levels in stylistic analysis", "caption": "文体は音から談話まで複数のレベルに表れ、分析はそれぞれの層の特徴を調べる。", "captionEn": "Style shows at several levels from sound to discourse, and analysis examines the features of each layer.", "items": [{"l": "音と表記", "lEn": "Sound and graphology", "d": "音の繰り返し、句読点、改行など。詩では前景化されやすい。", "dEn": "Sound repetition, punctuation, line breaks; often foregrounded in verse."}, {"l": "語彙", "lEn": "Lexis", "d": "語の選択、語の長さ、位相(硬い語・くだけた語)。", "dEn": "Word choice, word length and register of words."}, {"l": "文法", "lEn": "Grammar", "d": "文の長さ、態、時制、修飾の使い方。", "dEn": "Sentence length, voice, tense and modification."}, {"l": "談話", "lEn": "Discourse", "d": "語り手の視点、会話文の扱い、文章の展開。", "dEn": "Point of view, handling of speech and how the text develops."}]}, {"type": "flow", "title": "計量文体論による著者推定", "titleEn": "Authorship attribution by stylometry", "caption": "候補作家の文章を数値にして、問題の文章と比べ、最も近い書き手を探す手順。", "captionEn": "The procedure turns candidates' texts into numbers and compares them with the disputed text to find the closest writer.", "items": [{"l": "コーパス作成", "lEn": "Build corpus", "d": "候補者の著作と、問題の文章を電子化して集める。", "dEn": "Digitize candidates' works and the disputed text."}, {"l": "特徴の選択", "lEn": "Pick features", "d": "内容に左右されにくい機能語や語の長さを選ぶ。", "dEn": "Choose features less tied to topic, such as function words and word length."}, {"l": "頻度の計算", "lEn": "Count", "d": "選んだ特徴の出現率を、文章ごとに数える。", "dEn": "Count how often each chosen feature occurs in each text."}, {"l": "距離の比較", "lEn": "Compare distance", "d": "各候補との隔たりを測り、最も近い書き手を探す。", "dEn": "Measure the distance from each candidate and find the nearest."}, {"l": "結果の検証", "lEn": "Check", "d": "別の特徴や方法でも結果が変わらないかを確かめる。", "dEn": "Confirm that other features or methods give the same result."}]}, {"type": "tree", "title": "人物の言葉の伝え方", "titleEn": "Ways of presenting speech", "caption": "同じ発言でも、語り手がどう伝えるかで、語り手と人物のどちらの声が前に出るかが変わる。", "captionEn": "The same utterance can be reported so that the voice of the narrator or of the character comes forward.", "root": {"l": "話法", "lEn": "Speech presentation", "d": "人物の発言や思考を、語り手が文章の中でどう伝えるかの型", "dEn": "Types of reporting a character's speech or thought within a narrator's text."}, "items": [{"l": "直接話法", "lEn": "Direct speech", "d": "人物の言葉をそのまま引き、人物の声が前に出る", "dEn": "Quotes the character's words as spoken, so the character's voice is foremost.", "sub": [{"l": "例", "lEn": "Example", "d": "彼は「明日は月曜だ」と言った。", "dEn": "He said, 'Tomorrow is Monday.'"}]}, {"l": "間接話法", "lEn": "Indirect speech", "d": "語り手の言葉に直して伝え、語り手の声が前に出る", "dEn": "Reports the content in the narrator's words, so the narrator's voice is foremost.", "sub": [{"l": "例", "lEn": "Example", "d": "彼は翌日が月曜だと言った。", "dEn": "He said that the next day was Monday."}]}, {"l": "自由間接話法", "lEn": "Free indirect", "d": "伝達の語を省き、語り手と人物の声が混じる", "dEn": "Drops the reporting clause, so narrator and character voices blend.", "sub": [{"l": "例", "lEn": "Example", "d": "翌日は月曜だった。いやになる。", "dEn": "The next day was Monday. How tiresome."}]}]}], "interdisciplinary:semiotics": [{"type": "tree", "title": "パースの記号の三分類", "titleEn": "Peirce's three kinds of sign", "caption": "パースは、記号と対象の結びつき方によって、記号を類像・指標・象徴の三つに分けた。", "captionEn": "Peirce divided signs into icon, index and symbol according to how a sign is linked to its object.", "root": {"l": "記号", "lEn": "Sign", "d": "あるものが、別のものを表すものとして働くこと。", "dEn": "Something that stands for something else."}, "items": [{"l": "類像", "lEn": "Icon", "d": "対象に似ていることによって対象を表す記号。", "dEn": "Represents by resembling its object.", "sub": [{"l": "肖像写真", "lEn": "Portrait photo", "d": "写っている本人の姿に似ていることで表す。", "dEn": "Resembles the person shown."}, {"l": "トイレの絵記号", "lEn": "Toilet pictogram", "d": "人の形に似せた図で、場所の用途を表す。", "dEn": "A figure that looks like a person."}]}, {"l": "指標", "lEn": "Index", "d": "対象との実際のつながりによって対象を表す記号。", "dEn": "Represents by a real connection to its object.", "sub": [{"l": "煙の存在", "lEn": "Smoke", "d": "煙があることが、火があることを示す。", "dEn": "Shows that there is a fire."}, {"l": "風見鶏", "lEn": "Weathervane", "d": "向きが変わることで、風向きを示す。", "dEn": "Shows the wind direction."}]}, {"l": "象徴", "lEn": "Symbol", "d": "社会的な取り決めによって対象を表す記号。", "dEn": "Represents by social convention.", "sub": [{"l": "赤信号", "lEn": "Red light", "d": "「止まれ」という社会的な約束で意味を持つ。", "dEn": "The convention for 'stop'."}, {"l": "ふつうの語", "lEn": "Ordinary words", "d": "語と意味の結びつきの多くは、取り決めによる。", "dEn": "Most words are linked by convention."}]}]}, {"type": "compare", "title": "ソシュールとパースの記号", "titleEn": "Saussure's and Peirce's signs", "caption": "言語学から出たソシュールの二項モデルと、論理学から出たパースの三項モデルの対比。", "captionEn": "Saussure's two-part model from linguistics is set against Peirce's three-part model from logic.", "left": {"l": "ソシュール", "lEn": "Saussure"}, "right": {"l": "パース", "lEn": "Peirce"}, "rows": [{"k": "記号の構成", "kEn": "Structure", "a": "二項(表現と内容)", "aEn": "Two parts: signifier, signified", "b": "三項(表意体・対象・解釈項)", "bEn": "Three parts: sign, object, interpretant"}, {"k": "学の名", "kEn": "Name", "a": "記号学(セミオロジー)", "aEn": "Semiology", "b": "記号論(セミオティクス)", "bEn": "Semiotics"}, {"k": "出発点", "kEn": "Starting point", "a": "言語学", "aEn": "Linguistics", "b": "論理学・哲学", "bEn": "Logic and philosophy"}, {"k": "結びつき", "kEn": "Link", "a": "恣意的", "aEn": "Arbitrary", "b": "類像・指標・象徴の3種", "bEn": "Icon, index, symbol"}]}, {"type": "flow", "title": "写真が神話になる流れ", "titleEn": "How a photograph becomes a myth", "caption": "バルトは『神話作用』(1957年)で、雑誌の表紙写真を例に、一次の記号が二次の意味の器になる過程を示した。", "captionEn": "In Mythologies (1957) Barthes used a magazine cover to show a first-order sign becoming the vessel of a second-order meaning.", "items": [{"l": "一次の記号", "lEn": "First-order sign", "d": "軍服の黒人青年が三色旗に敬礼する雑誌の表紙写真。そのまま見れば一枚の写真", "dEn": "A magazine cover showing a young Black soldier saluting the tricolor; taken at face value, a photograph."}, {"l": "記号が器に", "lEn": "Sign as vessel", "d": "写真の全体が新しい記号表現となり、別の意味を載せる器になる", "dEn": "The whole photograph becomes a new signifier, a vessel that carries another meaning."}, {"l": "神話の意味", "lEn": "The myth", "d": "「フランスは人種を問わず皆が忠誠を尽くす大帝国だ」という意味が、自然なものに見える", "dEn": "The meaning 'France is a great empire whose sons all serve loyally, whatever their colour' comes to look natural."}]}], "applied:language-education": [{"type": "tree", "title": "言語教授法の主な系統", "titleEn": "Families of language teaching methods", "caption": "教授法を、形・意味・内容のどこに重点を置くかで3つに分けた整理の一例。各枝を押すと説明が出る。", "captionEn": "One way to group teaching methods by whether they stress form, meaning or content. Tap a branch for details.", "root": {"l": "言語教授法", "lEn": "Teaching methods", "d": "外国語や第二言語をどう教えるかの方針や手順の総称", "dEn": "The general name for policies and procedures for teaching a foreign or second language."}, "items": [{"l": "形に重点", "lEn": "Form-focused", "d": "文法規則や言語の形を明示的に学ばせる系統", "dEn": "Methods that have learners study grammar rules and linguistic form explicitly.", "sub": [{"l": "文法訳読法", "lEn": "Grammar-translation", "d": "母語への訳と文法説明で読解を教える伝統的な方法", "dEn": "A traditional method teaching reading through translation into the L1 and grammar explanation."}, {"l": "オーディオリンガル法", "lEn": "Audiolingual method", "d": "文型の反復練習で習慣形成をねらう口頭中心の方法", "dEn": "An oral method that aims to form habits through repeated drills of sentence patterns."}]}, {"l": "意味に重点", "lEn": "Meaning-focused", "d": "意味のやり取りを通じて使える力を育てる系統", "dEn": "Methods that build usable ability through exchanging meaning.", "sub": [{"l": "コミュニカティブ・アプローチ", "lEn": "Communicative approach", "d": "場面での意味の伝達と言語使用を中心に据える教え方", "dEn": "Centers lessons on conveying meaning and using language in context."}, {"l": "タスクベース教授法", "lEn": "Task-based teaching", "d": "目的のある課題の遂行を軸に授業を組み立てる方法", "dEn": "Builds lessons around carrying out purposeful tasks."}]}, {"l": "内容に重点", "lEn": "Content-focused", "d": "教科や主題の学習と言語学習を同時に進める系統", "dEn": "Methods that learn a subject and the language at the same time.", "sub": [{"l": "CBI", "lEn": "Content-based instruction", "d": "主題内容を教材として言語を教える指導", "dEn": "Teaches language through subject-matter content."}, {"l": "イマージョン教育", "lEn": "Immersion education", "d": "教科の授業を学習言語で行う教育", "dEn": "Delivers school subjects in the target language."}]}]}, {"type": "layers", "title": "CEFRの3段階6レベル", "titleEn": "CEFR: three bands, six levels", "caption": "CEFRは言語能力をAからCの3段階に大別し、各段階をさらに2つに分けて計6レベルで示す。", "captionEn": "CEFR splits ability into bands A to C, each divided in two, giving six levels.", "items": [{"l": "熟達した使い手(C)", "lEn": "Proficient user (C1-C2)", "d": "C1とC2。複雑な内容を流ちょうに、場面に応じて使い分けられる", "dEn": "C1 and C2: handles complex content fluently and adapts language to the situation."}, {"l": "自立した使い手(B)", "lEn": "Independent user (B1-B2)", "d": "B1とB2。身近な話題や仕事の話題を自力でやり取りできる", "dEn": "B1 and B2: manages familiar and work topics without help."}, {"l": "基礎段階の使い手(A)", "lEn": "Basic user (A1-A2)", "d": "A1とA2。身近な表現や簡単なやり取りができる", "dEn": "A1 and A2: uses familiar expressions and simple exchanges."}]}, {"type": "flow", "title": "タスク中心の授業の流れ", "titleEn": "Flow of a task-based lesson", "caption": "ウィリスの枠組みでは、課題の前に導入し、課題のあとで言語の形に注目する。形の指導は最後に置かれる。", "captionEn": "In Willis's framework a lesson opens with an introduction and turns to language form only after the task.", "items": [{"l": "課題の導入", "lEn": "Pre-task", "d": "話題と課題の内容を示し、必要な語句に触れさせる", "dEn": "Introduce the topic and the task, and expose learners to useful words."}, {"l": "課題に取り組む", "lEn": "Do the task", "d": "学習者が少人数で、手持ちの言語を使って課題を進める", "dEn": "In small groups, learners work through the task with the language they already have."}, {"l": "報告の準備", "lEn": "Plan report", "d": "課題の結果を伝えるため、言い方を整えて練習する", "dEn": "Learners polish and rehearse how to present their results."}, {"l": "結果の報告", "lEn": "Report", "d": "結果をクラスに伝え、他の組の発表と聞き比べる", "dEn": "Results are given to the class and compared with other groups' reports."}, {"l": "言語に注目", "lEn": "Language focus", "d": "課題で出た表現を取り上げ、形や使い方を分析し練習する", "dEn": "Expressions from the task are picked out, analyzed and practiced."}]}], "applied:translation": [{"type": "compare", "title": "形式的等価と動的等価", "titleEn": "Formal vs dynamic equivalence", "caption": "ナイダが区別した2つの等価。原文の形を残すか、読み手への効果を残すかで訳が変わる。", "captionEn": "Nida's two kinds of equivalence: keep the form of the original, or keep its effect on readers.", "left": {"l": "形式的等価", "lEn": "Formal equivalence"}, "right": {"l": "動的等価", "lEn": "Dynamic equivalence"}, "rows": [{"k": "重視する点", "kEn": "Priority", "a": "原文の形と構造", "aEn": "Form and structure of the source", "b": "読み手への効果", "bEn": "Effect on the reader"}, {"k": "訳文の姿", "kEn": "Target text", "a": "原文に近く硬くなりやすい", "aEn": "Close to the source, often stiff", "b": "自然な訳文になりやすい", "bEn": "Reads naturally"}, {"k": "読み手", "kEn": "Reader", "a": "原文を調べる人", "aEn": "Someone who studies the source", "b": "一般の読者", "bEn": "General readers"}, {"k": "向く文書", "kEn": "Suited to", "a": "契約書や法令", "aEn": "Contracts and statutes", "b": "広告や読み物", "bEn": "Ads and general reading"}]}, {"type": "flow", "title": "翻訳作業の流れ", "titleEn": "Stages of a translation job", "caption": "依頼を受けてから納品するまでの標準的な工程を左から右へ並べた図。", "captionEn": "The usual stages from receiving a job to delivery, in order from left to right.", "items": [{"l": "原文分析", "lEn": "Source analysis", "d": "目的、読み手、文体、専門用語を確認する", "dEn": "Check the purpose, readers, style and terminology."}, {"l": "訳出", "lEn": "Drafting", "d": "訳語を選んで、訳文の初稿を作り上げる", "dEn": "Choose equivalents and produce a first draft."}, {"l": "推敲", "lEn": "Revision", "d": "原文と見比べ、誤訳や不自然な表現を直す", "dEn": "Compare with the source and fix errors and awkward wording."}, {"l": "校閲", "lEn": "Review", "d": "別の人が訳文の正確さと表記を確認する", "dEn": "A second person checks accuracy and conventions."}, {"l": "納品", "lEn": "Delivery", "d": "指定の形式で渡し、必要なら修正に応じる", "dEn": "Hand over in the requested format and handle any corrections."}]}, {"type": "tree", "title": "ヤコブソンの翻訳の三区分", "titleEn": "Jakobson's three kinds of translation", "caption": "ヤコブソンは翻訳を、記号が何に置き換わるかで三つに分けた。ふつうの翻訳は真ん中の型にあたる。", "captionEn": "Jakobson divided translation by what a sign is rendered into; ordinary translation is the middle type.", "root": {"l": "翻訳", "lEn": "Translation", "d": "ある記号を別の記号で解釈すること", "dEn": "Interpreting a sign by means of another sign."}, "items": [{"l": "言語内翻訳", "lEn": "Intralingual", "d": "同じ言語の中での言い換え。要約や平易な書き直しなど", "dEn": "Rewording within one language, such as summaries and plain rewrites."}, {"l": "言語間翻訳", "lEn": "Interlingual", "d": "ある言語の記号を別の言語の記号で解釈する。一般にいう翻訳", "dEn": "Interpreting signs of one language by those of another; translation proper."}, {"l": "記号間翻訳", "lEn": "Intersemiotic", "d": "言語の記号を絵や音楽など非言語の記号へ移す。小説の映画化など", "dEn": "Moving verbal signs into non-verbal ones such as images or music, e.g. filming a novel."}]}], "applied:interpretation": [{"type": "compare", "title": "逐次通訳と同時通訳", "titleEn": "Consecutive vs simultaneous", "caption": "通訳の2大方式。話者が区切るのを待って訳すか、話と同時に訳すかで条件が大きく違う。", "captionEn": "The two main modes: wait for the speaker to pause, or interpret as the speech goes on.", "left": {"l": "逐次通訳", "lEn": "Consecutive"}, "right": {"l": "同時通訳", "lEn": "Simultaneous"}, "rows": [{"k": "訳すタイミング", "kEn": "Timing", "a": "発話の区切りのあと", "aEn": "After the speaker pauses", "b": "発話とほぼ同時", "bEn": "Almost at the same time"}, {"k": "設備", "kEn": "Equipment", "a": "特別な設備は不要", "aEn": "No special equipment", "b": "ブースと音声機器が必要", "bEn": "Booth and audio gear"}, {"k": "支える技術", "kEn": "Key technique", "a": "ノートテイキング", "aEn": "Note-taking", "b": "聞くと話すの並行処理", "bEn": "Parallel listening and speaking"}, {"k": "所要時間", "kEn": "Time needed", "a": "発言の分だけ延びる", "aEn": "Meeting runs longer", "b": "ほぼ延びない", "bEn": "Hardly any extra time"}]}, {"type": "flow", "title": "同時通訳の処理の流れ", "titleEn": "Processing in simultaneous interpreting", "caption": "聞く、理解する、訳す、話すの各段階が、実際にはほぼ並行して進む。図は段階の順を示す。", "captionEn": "Listening, understanding, rendering and speaking overlap in practice. The figure shows their order.", "items": [{"l": "聞く", "lEn": "Listen", "d": "話者の音声を聞き取り、続きを予測する", "dEn": "Take in the speech and anticipate what follows."}, {"l": "理解", "lEn": "Comprehend", "d": "意味をつかみ、要点を短く保持する", "dEn": "Grasp the meaning and hold the gist briefly."}, {"l": "訳語選択", "lEn": "Reformulate", "d": "目標言語の表現を選び、語順を組み替える", "dEn": "Choose target-language wording and reorder the sentence."}, {"l": "発話", "lEn": "Speak", "d": "訳を話しつつ、次の発話も聞き続ける", "dEn": "Speak the rendering while still listening to the next part."}]}, {"type": "tree", "title": "通訳が行われる主な場面", "titleEn": "Main settings where interpreting is done", "caption": "通訳は場面で性格が変わる。会議では訳し方の型が、地域の窓口では相手の生活への配慮が重くなる。枝を押すと例が出る。", "captionEn": "Interpreting changes character by setting: conference work stresses mode, community work stresses care for the client's life. Tap a branch for examples.", "root": {"l": "通訳の場面", "lEn": "Interpreting settings", "d": "通訳が必要になる場の違いにより、求められる技能や倫理が変わる", "dEn": "The skills and ethics required change with the setting in which interpreting is needed."}, "items": [{"l": "会議通訳", "lEn": "Conference", "d": "国際会議や国連などで、発言者の話を各国語に訳す", "dEn": "Rendering speakers' talk into several languages at international meetings and the UN.", "sub": [{"l": "同時通訳", "lEn": "Simultaneous", "d": "ブースから話と同時に訳す形が中心", "dEn": "Mostly done from a booth, at the same time as the speaker."}, {"l": "リレー通訳", "lEn": "Relay", "d": "他の通訳者の訳を受けて別の言語へ訳す", "dEn": "Rendering from another interpreter's output into a further language."}]}, {"l": "コミュニティ通訳", "lEn": "Community", "d": "地域の暮らしの場で、住民と公的サービスの間をつなぐ", "dEn": "Bridging residents and public services in everyday community life.", "sub": [{"l": "医療通訳", "lEn": "Medical", "d": "診察や説明の場で、患者と医療者の間を訳す", "dEn": "Interpreting between patients and clinicians in consultations."}, {"l": "司法通訳", "lEn": "Legal", "d": "警察・法廷で、正確さと中立性が特に重く求められる", "dEn": "In police and court settings, where accuracy and neutrality weigh most."}]}, {"l": "手話通訳", "lEn": "Sign language", "d": "手話と音声言語の間で訳す。講演・会議・公共の場で使われる", "dEn": "Interpreting between a sign language and a spoken one, in lectures, meetings and public life."}, {"l": "放送通訳", "lEn": "Broadcast", "d": "テレビやラジオで、外国語の会見や中継を生放送で訳す", "dEn": "Rendering foreign-language press events and live feeds on air."}]}], "applied:lexicography": [{"type": "flow", "title": "コーパス辞書の編纂手順", "titleEn": "How a corpus-based dictionary is made", "caption": "実際の使用例を集めた資料から、語義と用例を決めて辞書の項目に仕上げるまでの流れ。", "captionEn": "From a collection of real usage to a finished entry with senses and examples.", "items": [{"l": "コーパス構築", "lEn": "Build corpus", "d": "話し言葉や書き言葉の実例を大量に集める", "dEn": "Collect large amounts of spoken and written examples."}, {"l": "用例検索", "lEn": "Search examples", "d": "見出し語の用例や共起語を一覧にして調べる", "dEn": "List the examples and collocates of each headword."}, {"l": "語義区分", "lEn": "Divide senses", "d": "用法の違いから語義を分け、頻度順などで並べる", "dEn": "Split senses by usage and order them, often by frequency."}, {"l": "定義執筆", "lEn": "Write definitions", "d": "学習者に分かる言葉で定義を書く", "dEn": "Write definitions in words learners can understand."}, {"l": "編集校正", "lEn": "Edit and proof", "d": "体裁や参照の統一を確かめて仕上げる", "dEn": "Check consistency of layout and cross-references."}]}, {"type": "layers", "title": "辞書の項目の構成", "titleEn": "Anatomy of a dictionary entry", "caption": "1つの項目が上から下へどんな情報で組み立てられているかを示す。", "captionEn": "Shows, from top to bottom, the kinds of information that make up one entry.", "items": [{"l": "見出し語", "lEn": "Headword", "d": "項目の先頭に置かれる語の代表形", "dEn": "The base form of the word placed at the start of the entry."}, {"l": "発音・品詞", "lEn": "Pronunciation, part of speech", "d": "読み方と、品詞や活用などの文法情報を示す部分", "dEn": "How the word is read, and grammatical information."}, {"l": "語義・定義", "lEn": "Senses and definitions", "d": "語の意味を区分して説明する部分", "dEn": "The part that divides and explains the word's meanings."}, {"l": "用例", "lEn": "Examples", "d": "実際の使い方を示す短い文の例を、複数載せる部分", "dEn": "Sentences showing the word in actual use."}, {"l": "コロケーション", "lEn": "Collocations", "d": "結びつきやすい語の組み合わせの情報", "dEn": "Information on words that commonly combine with it."}]}, {"type": "tree", "title": "辞書の主な種類", "titleEn": "Main kinds of dictionaries", "caption": "辞書は、扱う言語の数や目的によって分かれる。枝を押すと例が出る。", "captionEn": "Dictionaries divide by the number of languages and by purpose. Tap a branch for examples.", "root": {"l": "辞書", "lEn": "Dictionary", "d": "語を集め、意味や使い方を調べられるように並べた本", "dEn": "A work that gathers words and arranges them so meaning and use can be looked up."}, "items": [{"l": "単言語辞書", "lEn": "Monolingual", "d": "一つの言語で、その言語の語を説明する", "dEn": "Explains the words of a language in that same language.", "sub": [{"l": "学習者用辞書", "lEn": "Learner's", "d": "限られた語彙で語義を説明し、用例を多く載せる", "dEn": "Defines with a limited vocabulary and gives many examples."}, {"l": "歴史的辞書", "lEn": "Historical", "d": "語の意味や形の変遷を、年代順の用例で示す", "dEn": "Shows changes in meaning and form through dated examples."}]}, {"l": "二言語辞書", "lEn": "Bilingual", "d": "二つの言語の語を対応させる。翻訳や外国語学習に使う", "dEn": "Pairs words of two languages, for translation and foreign-language study."}, {"l": "専門用語辞典", "lEn": "Specialized", "d": "医学や法律など、一つの分野の用語を集める", "dEn": "Collects the terms of one field, such as medicine or law."}, {"l": "類義語辞典", "lEn": "Thesaurus", "d": "意味の近い語や関連する語を、意味の分野ごとに並べる", "dEn": "Arranges words close or related in meaning by semantic field."}]}], "applied:language-testing": [{"type": "matrix", "title": "妥当性と信頼性の組み合わせ", "titleEn": "Validity and reliability combined", "caption": "測るべきものを測れているか(妥当性)と、結果が安定しているか(信頼性)の2軸で4つに分ける。", "captionEn": "Two axes: does it measure the right thing (validity), and are results stable (reliability)?", "x": {"l": "信頼性", "lEn": "Reliability (low to high)"}, "y": {"l": "妥当性", "lEn": "Validity (high to low)"}, "cells": [{"l": "狙いは合うが不安定", "lEn": "On target, unstable", "d": "課題は狙う能力に近いが、採点者で点が割れる。信頼性が低いと妥当性も確保できない", "dEn": "The task resembles the target ability, but raters disagree; without reliability, validity cannot be secured either."}, {"l": "理想の状態", "lEn": "Valid and reliable", "d": "狙う能力を測れて、結果も安定している", "dEn": "Measures the target ability and gives stable results."}, {"l": "どちらも低い", "lEn": "Neither", "d": "狙う能力からずれていて、点数も安定しない", "dEn": "Off target, and scores are unstable."}, {"l": "安定だがずれる", "lEn": "Reliable, not valid", "d": "点数は安定しているが、別の能力を測っている", "dEn": "Scores are stable but reflect a different ability."}]}, {"type": "cycle", "title": "波及効果のめぐり方", "titleEn": "The washback cycle", "caption": "テストの形式が学習や授業を変え、その結果がまた試験の見直しに返っていく循環を示す。", "captionEn": "Test format shapes teaching and learning, and the results feed back into revising the test.", "items": [{"l": "試験の設計", "lEn": "Test design", "d": "何をどう出題するかの方針が決まる", "dEn": "What is tested and how is decided."}, {"l": "授業・学習の変化", "lEn": "Teaching and learning", "d": "試験に出る技能に学習時間が集まる", "dEn": "Study time gathers around the skills the test covers."}, {"l": "学習成果", "lEn": "Learning outcomes", "d": "力の伸びや技能ごとの偏りが成績に表れる", "dEn": "Gains and imbalances show up in scores."}, {"l": "試験の見直し", "lEn": "Test revision", "d": "成果を見て、出題の形式や内容を改める", "dEn": "Results prompt changes to format and content."}]}, {"type": "flow", "title": "言語テストの作り方", "titleEn": "How a language test is developed", "caption": "目的を決めてから問題を書き、試行の結果で直す。作って終わりでなく、運用後も見直す。", "captionEn": "A test starts from its purpose, then items are written and revised from trial results. It is reviewed even after it goes into use.", "items": [{"l": "目的を定める", "lEn": "Define the purpose", "d": "誰の何の力を、何のために測るのかを決める。結果の使い道もここで考える", "dEn": "Decide whose ability is measured and why, and how results will be used."}, {"l": "仕様を作る", "lEn": "Write specifications", "d": "測る技能・問題形式・配点・所要時間などを文書にまとめる", "dEn": "Document the skills tested, item types, scoring and time."}, {"l": "問題を書く", "lEn": "Write items", "d": "仕様に沿って問題と採点基準を作り、他の人が読んで点検する", "dEn": "Write items and scoring criteria to the specifications and have others review them."}, {"l": "試行して分析", "lEn": "Pilot and analyze", "d": "少数の受験者で試し、正答率や弁別力を調べて問題を直す", "dEn": "Try the items on a small group, check facility and discrimination, and revise."}, {"l": "運用と見直し", "lEn": "Operate and review", "d": "本番で使い、得点の様子や波及効果を見て、必要なら改訂する", "dEn": "Use the test, watch score patterns and washback, and revise if needed."}]}], "applied:forensic-ling": [{"type": "flow", "title": "著者推定の手順", "titleEn": "Steps of authorship attribution", "caption": "文章の書き手を言語的特徴から絞り込む作業の標準的な流れを示す。", "captionEn": "The usual flow of narrowing down who wrote a text from its linguistic features.", "items": [{"l": "資料収集", "lEn": "Collect texts", "d": "問題の文書と、書き手候補の既知の文書を集める", "dEn": "Gather the questioned text and known texts of candidate writers."}, {"l": "特徴抽出", "lEn": "Extract features", "d": "語彙、文法、綴り、句読点の癖を取り出す", "dEn": "Pick out habits of vocabulary, grammar, spelling and punctuation."}, {"l": "比較", "lEn": "Compare", "d": "問題の文書と候補の文書で特徴を照らし合わせる", "dEn": "Match features of the questioned text against each candidate."}, {"l": "評価", "lEn": "Evaluate", "d": "一致の度合いと偶然の可能性を見積もる", "dEn": "Estimate how strong the match is and how likely chance is."}, {"l": "意見の提示", "lEn": "Report opinion", "d": "限界を明記して鑑定意見を述べる", "dEn": "State the opinion together with its limits."}]}, {"type": "tree", "title": "法言語学の主な領域", "titleEn": "Main areas of forensic linguistics", "caption": "法と言語が交わる場面を、書き言葉、話し言葉、法の言葉の3つに分けて整理した。", "captionEn": "Areas where law and language meet, sorted into written, spoken and legal language.", "root": {"l": "法言語学", "lEn": "Forensic linguistics", "d": "法的な場面で言語を分析し、役立てる分野", "dEn": "The field that analyzes language in legal settings."}, "items": [{"l": "書かれた言語", "lEn": "Written language", "d": "脅迫状や遺書など、文書を対象にする", "dEn": "Works on documents such as threatening letters and notes.", "sub": [{"l": "著者推定", "lEn": "Authorship attribution", "d": "文体の特徴から書き手を絞り込む", "dEn": "Narrows down the writer from stylistic features."}, {"l": "剽窃の検出", "lEn": "Plagiarism detection", "d": "文章の一致や言い換えの有無を調べる", "dEn": "Examines textual overlap and paraphrase."}]}, {"l": "話された言語", "lEn": "Spoken language", "d": "録音や供述など、発話を対象にする", "dEn": "Works on speech such as recordings and statements.", "sub": [{"l": "話者の識別", "lEn": "Speaker identification", "d": "声の高さや話し方の特徴から話者を比べる", "dEn": "Compares speakers by features of their voices."}, {"l": "供述の分析", "lEn": "Statement analysis", "d": "供述書の成り立ちや言葉づかいを調べる", "dEn": "Examines how a statement was produced and worded."}]}, {"l": "法の言語", "lEn": "Language of the law", "d": "法廷や法文の言葉づかいを対象にする", "dEn": "Works on the wording of courts and legal texts.", "sub": [{"l": "法廷談話", "lEn": "Courtroom discourse", "d": "法廷での尋問や証言のやり取りを詳しく分析する", "dEn": "Analyzes questioning and testimony."}, {"l": "法文の平易化", "lEn": "Plain legal drafting", "d": "契約書や説示を分かりやすく直す", "dEn": "Rewrites contracts and instructions to be clearer."}]}]}, {"type": "compare", "title": "文体観察と計量文体学", "titleEn": "Stylistic observation and stylometry", "caption": "書き手の手がかりを、分析者の目で拾うか、数えて統計で比べるか。二つの方法は補い合って使われる。", "captionEn": "Clues to a writer can be picked up by an analyst's eye or counted and compared statistically. The two methods complement each other.", "left": {"l": "文体の観察", "lEn": "Stylistic observation"}, "right": {"l": "計量文体学", "lEn": "Stylometry"}, "rows": [{"k": "手がかり", "kEn": "Clues", "a": "綴りの癖・句読点・言い回しなど目に見える特徴", "aEn": "Visible traits such as spelling, punctuation and phrasing", "b": "機能語の頻度や文字列の並びなど数えられる特徴", "bEn": "Countable traits such as function-word frequencies and character strings"}, {"k": "判断の根拠", "kEn": "Basis of judgment", "a": "分析者の経験と解釈", "aEn": "The analyst's experience and interpretation", "b": "統計モデルが出す数値", "bEn": "Numbers from a statistical model"}, {"k": "長所", "kEn": "Strength", "a": "珍しい癖を拾い上げられる", "aEn": "Can pick up unusual habits", "b": "手順を公開して検証しやすい", "bEn": "The procedure can be shown and checked"}, {"k": "弱み", "kEn": "Weakness", "a": "分析者によって判断が分かれうる", "aEn": "Judgments may differ between analysts", "b": "短い文ではデータが足りない", "bEn": "Short texts give too little data"}]}], "applied:medical-business-ling": [{"type": "compare", "title": "専門的な言い方と平易な言い方", "titleEn": "Expert wording vs plain wording", "caption": "同じ内容を、専門家どうしの言い方と患者や顧客に向けた言い方で比べた対比。", "captionEn": "The same content put in expert-to-expert terms and in terms meant for patients or clients.", "left": {"l": "専門的な言い方", "lEn": "Expert wording"}, "right": {"l": "平易な言い方", "lEn": "Plain wording"}, "rows": [{"k": "用語", "kEn": "Terms", "a": "悪性腫瘍、予後", "aEn": "Malignant tumor, prognosis", "b": "がん、今後の見通し", "bEn": "Cancer, outlook"}, {"k": "文の長さ", "kEn": "Sentences", "a": "長く条件が多い", "aEn": "Long, many conditions", "b": "短く区切る", "bEn": "Short and separate"}, {"k": "順序", "kEn": "Order", "a": "経過から説明する", "aEn": "Starts with the course", "b": "結論を先に伝える", "bEn": "Gives the conclusion first"}, {"k": "確認", "kEn": "Checking", "a": "理解を前提にする", "aEn": "Assumes understanding", "b": "相手に言い直してもらう", "bEn": "Asks the listener to restate"}]}, {"type": "flow", "title": "患者への説明の流れ", "titleEn": "Flow of explaining to a patient", "caption": "相手の理解を確かめながら説明を進め、最後に言い直しで確認する手順を示す。", "captionEn": "Explain while checking understanding, and finish by having the patient restate it.", "items": [{"l": "理解の確認", "lEn": "Check background", "d": "相手が何をどこまで知っているかをたずねる", "dEn": "Ask what the patient already knows."}, {"l": "言い換え", "lEn": "Rephrase", "d": "専門語を日常の言葉に置き換える", "dEn": "Replace technical terms with everyday words."}, {"l": "要点の整理", "lEn": "Give key points", "d": "伝えることを絞り、結論から話す", "dEn": "Limit the message and lead with the conclusion."}, {"l": "ティーチバック", "lEn": "Teach-back", "d": "患者に自分の言葉で言い直してもらい、誤解を正す", "dEn": "Have the patient restate it and correct any misunderstanding."}]}, {"type": "flow", "title": "論文序論の三つの動き", "titleEn": "Three moves of an article introduction", "caption": "スウェールズが示した型。研究論文の序論は、領域を示し、空白を指摘し、それを埋める順に進むことが多い。", "captionEn": "Swales's pattern: a research article introduction often shows the territory, points to a gap, and then fills it.", "items": [{"l": "領域を確立", "lEn": "Establish territory", "d": "研究テーマの重要性を述べ、これまでの研究を振り返る", "dEn": "State why the topic matters and review earlier work."}, {"l": "空白を示す", "lEn": "Establish a niche", "d": "先行研究に足りない点や問いを指摘し、研究の余地を示す", "dEn": "Point to what earlier work lacks or leaves open, showing room for research."}, {"l": "空白を占める", "lEn": "Occupy the niche", "d": "本研究の目的や内容を述べて、示した空白を埋める位置を主張する", "dEn": "State the aims of this study, claiming the position that fills the gap."}]}], "historical:comparative-ling": [{"type": "flow", "title": "比較法の手順", "titleEn": "Steps of the comparative method", "caption": "比較法は左から右へ進む。借用語を除いたうえで規則的な音対応だけを根拠にし、祖形の再建と内部の分類へ進む。", "captionEn": "The method runs left to right: remove loanwords, rely only on regular sound correspondences, then reconstruct proto-forms and subgroup the family.", "items": [{"l": "同根語を集める", "lEn": "Collect cognates", "d": "基本的な意味の語を複数の言語から集め、似た語を候補として並べる。", "dEn": "Gather words of basic meaning from several languages and line up similar-looking candidates."}, {"l": "借用語を除く", "lEn": "Exclude loanwords", "d": "他言語から入った語を外し、共通の祖先に由来する語だけを残す。", "dEn": "Remove words borrowed from other languages, keeping only those inherited from a common ancestor."}, {"l": "音対応を立てる", "lEn": "Set correspondences", "d": "候補どうしで、ある音が別の音と規則的に対応するかを確かめる。", "dEn": "Check whether a sound in one language regularly matches a particular sound in the others."}, {"l": "祖形を再建する", "lEn": "Reconstruct proto-forms", "d": "対応から祖語の音を推定し、* を付けた再建形を作る。", "dEn": "Infer the proto-language sounds from the correspondences and write starred reconstructed forms."}, {"l": "下位分類する", "lEn": "Subgroup", "d": "一部の言語だけが共有する革新を手がかりに、語族の内部を枝分かれさせる。", "dEn": "Use innovations shared by only some languages to branch the family into subgroups."}]}, {"type": "compare", "title": "系統樹モデルと波動モデル", "titleEn": "Family tree vs wave model", "caption": "言語の分かれ方を、分岐として描くか、周囲へ広がる波として描くかの対比。どちらも一部の事実をうまく説明する。", "captionEn": "Two ways to picture how languages relate: as branching splits or as waves spreading outward. Each explains part of the evidence well.", "left": {"l": "系統樹モデル", "lEn": "Family tree"}, "right": {"l": "波動モデル", "lEn": "Wave model"}, "rows": [{"k": "発想", "kEn": "Idea", "a": "祖語が分岐して分かれる", "aEn": "A proto-language splits and diverges", "b": "変化が波のように広がる", "bEn": "Changes spread outward like waves"}, {"k": "提唱者", "kEn": "Proposer", "a": "シュライヒャー", "aEn": "August Schleicher", "b": "ヨハネス・シュミット", "bEn": "Johannes Schmidt"}, {"k": "得意", "kEn": "Strength", "a": "祖語の再建と明確な分岐", "aEn": "Proto-forms and clean splits", "b": "隣り合う言語の共通特徴", "bEn": "Features shared by neighbors"}, {"k": "弱点", "kEn": "Weakness", "a": "接触の影響を描けない", "aEn": "Cannot show contact effects", "b": "分岐の順序を示しにくい", "bEn": "Hard to show order of splits"}, {"k": "図の形", "kEn": "Diagram", "a": "枝分かれした木", "aEn": "A branching tree", "b": "重なる同心円", "bEn": "Overlapping circles"}]}, {"type": "tree", "title": "印欧語族の主な語派", "titleEn": "Main branches of Indo-European", "caption": "印欧祖語から分かれた語派と、それぞれに属する現代の言語の例。枝を押すと例が出る。", "captionEn": "Branches descended from Proto-Indo-European, with modern languages in each. Tap a branch for examples.", "root": {"l": "印欧語族", "lEn": "Indo-European", "d": "ヨーロッパから南アジアまで広がる、最も研究が進んだ語族の一つ", "dEn": "One of the best-studied families, spread from Europe to South Asia."}, "items": [{"l": "ゲルマン語派", "lEn": "Germanic", "d": "英語・ドイツ語などを含む。グリムの法則で知られる子音推移を経た", "dEn": "Includes English and German; underwent the consonant shift known from Grimm's Law.", "sub": [{"l": "英語", "lEn": "English", "d": "ゲルマン語派の西ゲルマン諸語に入る", "dEn": "A West Germanic language."}, {"l": "ドイツ語", "lEn": "German", "d": "高地ドイツ語の子音推移を経た", "dEn": "Went through the High German consonant shift."}, {"l": "スウェーデン語", "lEn": "Swedish", "d": "北ゲルマン諸語の一つ", "dEn": "A North Germanic language."}]}, {"l": "イタリック語派", "lEn": "Italic", "d": "ラテン語とその子孫であるロマンス諸語が属する", "dEn": "Latin and its descendants, the Romance languages.", "sub": [{"l": "スペイン語", "lEn": "Spanish", "d": "俗ラテン語から分かれた", "dEn": "Descended from Vulgar Latin."}, {"l": "イタリア語", "lEn": "Italian", "d": "俗ラテン語から分かれた", "dEn": "Descended from Vulgar Latin."}, {"l": "フランス語", "lEn": "French", "d": "俗ラテン語から分かれた", "dEn": "Descended from Vulgar Latin."}]}, {"l": "インド・イラン語派", "lEn": "Indo-Iranian", "d": "サンスクリット語や現代インド諸語、ペルシア語などを含む", "dEn": "Includes Sanskrit, modern Indic languages and Persian.", "sub": [{"l": "ヒンディー語", "lEn": "Hindi", "d": "インド語派の現代語", "dEn": "A modern Indic language."}, {"l": "ペルシア語", "lEn": "Persian", "d": "イラン語派の言語", "dEn": "An Iranian language."}, {"l": "ベンガル語", "lEn": "Bengali", "d": "インド語派の現代語", "dEn": "A modern Indic language."}]}, {"l": "スラヴ語派", "lEn": "Slavic", "d": "東欧から中欧にかけて話される言語群", "dEn": "Languages spoken from eastern to central Europe.", "sub": [{"l": "ロシア語", "lEn": "Russian", "d": "東スラヴ諸語の一つ", "dEn": "An East Slavic language."}, {"l": "ポーランド語", "lEn": "Polish", "d": "西スラヴ諸語の一つ", "dEn": "A West Slavic language."}, {"l": "チェコ語", "lEn": "Czech", "d": "西スラヴ諸語の一つ", "dEn": "A West Slavic language."}]}, {"l": "ケルト語派", "lEn": "Celtic", "d": "かつて西欧に広く分布し、今は大西洋岸に残る", "dEn": "Once widespread in western Europe, now surviving on the Atlantic fringe.", "sub": [{"l": "アイルランド語", "lEn": "Irish", "d": "ゲール語系のケルト語", "dEn": "A Goidelic Celtic language."}, {"l": "ウェールズ語", "lEn": "Welsh", "d": "ブリソン語系のケルト語", "dEn": "A Brittonic Celtic language."}, {"l": "ブルトン語", "lEn": "Breton", "d": "ブリソン語系のケルト語", "dEn": "A Brittonic Celtic language."}]}]}], "historical:typology": [{"type": "matrix", "title": "語順と付置詞の組み合わせ", "titleEn": "Verb-object order and adpositions", "caption": "動詞と目的語の語順と、付置詞が名詞の前か後かは連動しやすい。左上と右下に多くの言語が集まり、他の2マスは少ない。", "captionEn": "Verb-object order tends to go with the position of adpositions. Most languages fall in the top-left and bottom-right cells; the other two are rarer.", "x": {"l": "動詞と目的語の語順(OV/VO)", "lEn": "Verb-object order (OV / VO)"}, "y": {"l": "付置詞の位置(後置/前置)", "lEn": "Adposition (post- / pre-)"}, "cells": [{"l": "OVと後置詞", "lEn": "OV + postposition", "d": "日本語やトルコ語に見られる、典型的で数の多い組み合わせ。", "dEn": "The typical, common pairing, seen in Japanese and Turkish."}, {"l": "VOと後置詞", "lEn": "VO + postposition", "d": "少数の言語にしか見られない、まれな組み合わせ。WALSでは42言語。", "dEn": "A rare pairing found in only a minority of languages; 42 in the WALS sample."}, {"l": "OVと前置詞", "lEn": "OV + preposition", "d": "ペルシア語が例。VOと後置詞よりさらにまれだが存在する組み合わせ。", "dEn": "Persian is an example; rarer still than VO with postpositions, but attested."}, {"l": "VOと前置詞", "lEn": "VO + preposition", "d": "英語やアラビア語に見られる、もう一つの多い組み合わせ。", "dEn": "The other common pairing, seen in English and Arabic."}]}, {"type": "tree", "title": "形態的類型の4分類", "titleEn": "Four morphological types", "caption": "語の中の形態素の結びつき方で言語を4型に分ける。実際の言語は複数の型の性質を併せ持つため、型は傾向を示す。", "captionEn": "Languages are sorted by how morphemes combine within a word. Real languages mix traits of several types, so the types describe tendencies.", "root": {"l": "形態的類型", "lEn": "Morphological types", "d": "語がどう形態素に分かれ、どう結びつくかによる古典的な分類。", "dEn": "A classic classification by how words divide into morphemes and how these combine."}, "items": [{"l": "孤立語", "lEn": "Isolating", "d": "語形変化がほとんどなく、語順や助詞で関係を示す。中国語が例。", "dEn": "Little word inflection; relations are shown by word order or particles. Mandarin is an example."}, {"l": "膠着語", "lEn": "Agglutinative", "d": "語幹に接辞が順に付き、一つの接辞が一つの意味を担う。日本語が例。", "dEn": "Affixes attach in sequence, each carrying one meaning. Japanese and Turkish are examples."}, {"l": "屈折語", "lEn": "Fusional", "d": "一つの語尾が格・数・性などを同時に表す。ラテン語が例。", "dEn": "One ending expresses case, number, gender and more at once. Latin is an example."}, {"l": "抱合語", "lEn": "Polysynthetic", "d": "動詞に多くの要素が組み込まれ、一語が文に相当する。イヌイット語が例。", "dEn": "Many elements fold into the verb, so one word can equal a sentence. Inuit languages are examples."}]}, {"type": "flow", "title": "類型論の調べ方", "titleEn": "How a typological survey proceeds", "caption": "一つの特徴を選び、多くの言語の記述から分布を集めて、偏りの理由を探る流れ。", "captionEn": "Pick one feature, collect its distribution from descriptions of many languages, then look for reasons behind the patterns.", "items": [{"l": "特徴を決める", "lEn": "Choose a feature", "d": "比べる項目を一つ選ぶ。例は基本語順や母音の数。", "dEn": "Pick one property to compare, such as basic word order or number of vowels."}, {"l": "言語を選ぶ", "lEn": "Sample languages", "d": "系統と地域が偏らないように、多くの言語を抜き出す。", "dEn": "Draw many languages so that families and regions are not skewed."}, {"l": "記述で調べる", "lEn": "Check grammars", "d": "各言語の文法書や資料から、その特徴の値を読み取る。", "dEn": "Read the value of the feature from each language's grammar or other sources."}, {"l": "分布を数える", "lEn": "Tally values", "d": "値ごとの言語数を数え、表や地図にまとめる。", "dEn": "Count languages per value and present them in tables or maps."}, {"l": "関連を探す", "lEn": "Seek correlations", "d": "ある特徴と別の特徴が一緒に現れやすいかを調べる。", "dEn": "Check whether one feature tends to co-occur with another."}, {"l": "理由を考える", "lEn": "Explain patterns", "d": "処理のしやすさや歴史的な変化など、偏りの原因を探る。", "dEn": "Look for causes of the skew, such as ease of processing or historical change."}]}], "theoretical:phonology": [{"type": "flow", "title": "基底形から発音までの流れ", "titleEn": "From Underlying Form to Pronunciation", "caption": "頭の中の音の形が、規則や制約で表層形になり、最後に実際の音声として出される。", "captionEn": "A sound shape stored in the mind is turned into a surface form by rules or constraints, then pronounced.", "items": [{"l": "基底形", "lEn": "underlying form", "d": "語彙として記憶されている音の形。変化を受ける前の姿で、音素の並びで表す。", "dEn": "The sound shape stored in the lexicon before any change applies, written as a string of phonemes."}, {"l": "規則・制約", "lEn": "rules / constraints", "d": "同化や脱落などの音の交替を起こす仕組み。規則の順序や制約の順位で働く。", "dEn": "The machinery behind alternations such as assimilation and deletion, working through ordered rules or ranked constraints."}, {"l": "表層形", "lEn": "surface form", "d": "音韻部門が最終的に出す形。異音の選択もここで決まる。", "dEn": "The form the phonology finally outputs; the choice of allophone is settled here."}, {"l": "音声実現", "lEn": "phonetic realization", "d": "表層形が調音され、空気の振動として実際に聞こえる段階。ここから音声学の領域になる。", "dEn": "The stage where the surface form is articulated and heard as sound; this is where phonetics takes over."}]}, {"type": "compare", "title": "規則による説明と制約による説明", "titleEn": "Rules versus Constraints", "caption": "同じ音の交替を、順序づけた規則で導くか、順位づけた制約の競合で選ぶかという2つの立場の対比。", "captionEn": "Two ways to explain the same alternation: derive it by ordered rules, or choose it through ranked, competing constraints.", "left": {"l": "規則に基づく", "lEn": "Rule-based"}, "right": {"l": "最適性理論", "lEn": "Optimality Theory"}, "rows": [{"k": "道具", "kEn": "Tool", "a": "順序づけた書き換え規則", "aEn": "Ordered rewrite rules", "b": "順位づけた制約", "bEn": "Ranked constraints"}, {"k": "入力から出力", "kEn": "Derivation", "a": "規則を順に適用して導く", "aEn": "Apply rules step by step", "b": "候補から最適なものを選ぶ", "bEn": "Pick the best candidate"}, {"k": "言語差", "kEn": "Variation", "a": "規則の有無と順序の違い", "aEn": "Which rules exist, and their order", "b": "制約の順位の違い", "bEn": "Different constraint rankings"}, {"k": "代表的文献", "kEn": "Landmark", "a": "1968年の『英語の音のパターン』", "aEn": "The Sound Pattern of English (1968)", "b": "1993年のPrinceとSmolensky報告", "bEn": "Prince and Smolensky (1993 report)"}]}, {"type": "layers", "title": "韻律の階層", "titleEn": "The prosodic hierarchy", "caption": "発話の音は、小さな単位が大きな単位に順に組み込まれて階層をなす。", "captionEn": "Speech sounds form layers, each smaller unit nested inside a larger one.", "items": [{"l": "音韻句", "lEn": "Phonological phrase", "d": "語のまとまり。句の中で高さの上がり下がりや区切りが決まる。", "dEn": "A group of words; pitch movement and breaks are set within it."}, {"l": "韻律語", "lEn": "Prosodic word", "d": "一つのアクセントを持つ語のまとまり。", "dEn": "A group of syllables bearing one main stress or accent."}, {"l": "フット", "lEn": "Foot", "d": "強い音節と弱い音節のまとまり。英語のリズムの基本単位。", "dEn": "A strong syllable with weak ones; a basic unit of English rhythm."}, {"l": "音節", "lEn": "Syllable", "d": "母音を核とする、一息で発音される単位。", "dEn": "A unit built around a vowel, pronounced in one pulse."}, {"l": "モーラ", "lEn": "Mora", "d": "音節の重さを測る単位。日本語では拍にあたる。", "dEn": "A unit of syllable weight; in Japanese it corresponds to the beat."}]}], "theoretical:morphology": [{"type": "compare", "title": "屈折と派生のちがい", "titleEn": "Inflection versus Derivation", "caption": "どちらも接辞で語を変えるが、同じ語の別の形を作るか、新しい語を作るかで性質が分かれる。", "captionEn": "Both use affixes, but inflection makes another form of the same word while derivation makes a new word.", "left": {"l": "屈折", "lEn": "Inflection"}, "right": {"l": "派生", "lEn": "Derivation"}, "rows": [{"k": "結果", "kEn": "Result", "a": "同じ語の別の形", "aEn": "Another form of the same word", "b": "新しい別の語", "bEn": "A new, different word"}, {"k": "品詞", "kEn": "Word class", "a": "ふつう変わらない", "aEn": "Usually unchanged", "b": "変わることが多い", "bEn": "Often changes"}, {"k": "表す内容", "kEn": "Meaning", "a": "数・時制などの文法情報", "aEn": "Grammatical info such as number, tense", "b": "語彙的な意味の変化", "bEn": "A change in lexical meaning"}, {"k": "具体例", "kEn": "Example", "a": "walk から walked", "aEn": "walk to walked", "b": "happy から unhappy", "bEn": "happy to unhappy"}]}, {"type": "tree", "title": "語を作る主な方法", "titleEn": "Main ways of forming words", "caption": "新しい語は、既存の要素を足す・合わせる・混ぜる・削る・品詞を変えるなどの方法で作られる。", "captionEn": "New words are made from existing material by adding, joining, blending, cutting or shifting category.", "root": {"l": "語形成", "lEn": "Word formation", "d": "既存の語や形態素から新しい語を作る営み", "dEn": "Making new words out of existing words and morphemes."}, "items": [{"l": "派生", "lEn": "Derivation", "d": "語幹に接辞を付けて別の語を作る。例は happy から unhappy", "dEn": "Attach an affix to a stem to make another word, as unhappy from happy."}, {"l": "複合", "lEn": "Compounding", "d": "語と語を結んで一語にする。例は black と board から blackboard", "dEn": "Join words into one, as blackboard from black and board."}, {"l": "転換", "lEn": "Conversion", "d": "形を変えず品詞だけ変える。例は名詞 e-mail から動詞の to e-mail", "dEn": "Change the category without changing the form, as noun e-mail to verb to e-mail."}, {"l": "混成", "lEn": "Blending", "d": "二語の一部ずつをつなぐ。例は smoke と fog から smog", "dEn": "Splice parts of two words, as smog from smoke and fog."}, {"l": "短縮", "lEn": "Clipping", "d": "語の一部を切り落とす。例は laboratory から lab", "dEn": "Cut part of a word off, as lab from laboratory."}]}], "theoretical:semantics": [{"type": "tree", "title": "語どうしの意味関係", "titleEn": "Sense Relations Between Words", "caption": "語は単独でなく他の語との関係で意味を持つ。代表的な関係を型ごとに整理する。", "captionEn": "Words gain meaning through relations to other words; the main relation types are grouped here.", "root": {"l": "意味関係", "lEn": "sense relations", "d": "語と語のあいだに成り立つ意味上のつながりの総称。語彙意味論の基本の見方。", "dEn": "The general term for meaning links between words, a basic view in lexical semantics."}, "items": [{"l": "同義", "lEn": "synonymy", "d": "意味がほぼ同じ語の関係。完全に同じ例はまれとされる。", "dEn": "Words with nearly the same meaning; perfect synonyms are rare.", "sub": [{"l": "具体例", "lEn": "example", "d": "「大きい」と「巨大な」は近いが、使える場面が少し違う。", "dEn": "Large and huge are close, but they differ somewhat in where they fit."}]}, {"l": "反義", "lEn": "antonymy", "d": "意味が対立する語の関係。対立のしかたで下位に分かれる。", "dEn": "Words with opposed meanings; subtypes depend on how they are opposed.", "sub": [{"l": "相補的", "lEn": "complementary", "d": "一方を否定すると他方になる。生と死、など。", "dEn": "Denying one gives the other, as with alive and dead."}, {"l": "段階的", "lEn": "gradable", "d": "程度を持つ対立。大きいと小さいは中間がある。", "dEn": "Opposition with degrees; big and small have a middle range."}, {"l": "逆義", "lEn": "converse", "d": "立場を入れ替えた関係。買うと売る、など。", "dEn": "A reversal of viewpoint, as in buy and sell."}]}, {"l": "上位・下位", "lEn": "hyponymy", "d": "包含する関係。「犬」は「動物」の下位語になる。", "dEn": "An inclusion relation: dog is a hyponym of animal."}, {"l": "部分・全体", "lEn": "meronymy", "d": "部分と全体の関係。「指」は「手」の部分にあたる。", "dEn": "A part-whole relation: finger is a part of hand."}]}, {"type": "flow", "title": "合成性による文の意味の組み立て", "titleEn": "Building Sentence Meaning by Composition", "caption": "語の意味を統語構造に沿って順に合成すると、文全体の意味と真理条件が得られる。", "captionEn": "Combining word meanings along the syntactic structure yields the meaning and truth conditions of the whole sentence.", "items": [{"l": "語の意味", "lEn": "word meanings", "d": "辞書に登録された個々の語の意味。出発点になる。", "dEn": "The meaning of each word as listed in the lexicon; the starting point."}, {"l": "統語構造", "lEn": "syntactic structure", "d": "語がどう組み合わさるかを示す構造。合成の順序を決める。", "dEn": "The structure showing how words combine; it fixes the order of composition."}, {"l": "合成規則", "lEn": "composition rules", "d": "下の要素の意味を組み合わせて、上の句の意味を作る規則。", "dEn": "Rules that combine the meanings of lower parts into the meaning of the phrase above."}, {"l": "真理条件", "lEn": "truth conditions", "d": "文が真になるための条件。文の意味を表す基本の形とされる。", "dEn": "The conditions under which the sentence is true; a standard way to state sentence meaning."}]}, {"type": "compare", "title": "成分分析とプロトタイプ理論", "titleEn": "Componential analysis and prototype theory", "caption": "語の意味を、条件の束で捉えるか、典型例を中心とした像で捉えるかの違い。", "captionEn": "Whether a word's meaning is captured as a bundle of conditions or as an image centered on typical members.", "left": {"l": "成分分析", "lEn": "Componential analysis"}, "right": {"l": "プロトタイプ理論", "lEn": "Prototype theory"}, "rows": [{"k": "意味の捉え方", "kEn": "View of meaning", "a": "必要十分な素性の束", "aEn": "A bundle of necessary and sufficient features", "b": "典型例を中心にした像", "bEn": "An image centered on typical members"}, {"k": "範疇の境界", "kEn": "Category boundary", "a": "明確に区切れる", "aEn": "Sharply drawn", "b": "周辺ほどあいまい", "bEn": "Fuzzier toward the edge"}, {"k": "例", "kEn": "Example", "a": "独身者は[+男性 +成人 -既婚]", "aEn": "'Bachelor' as [+male +adult -married]", "b": "鳥はスズメが典型、ペンギンは周辺", "bEn": "For 'bird', sparrows are typical and penguins peripheral"}, {"k": "成員の資格", "kEn": "Membership", "a": "どの成員も同等", "aEn": "All members count equally", "b": "典型度に差がある", "bEn": "Members differ in typicality"}, {"k": "得意な領域", "kEn": "Best suited to", "a": "親族名称など体系的な語彙", "aEn": "Systematic vocabulary such as kin terms", "b": "鳥や家具など自然な範疇", "bEn": "Natural categories such as birds and furniture"}]}], "theoretical:pragmatics": [{"type": "tree", "title": "発話行為の5分類", "titleEn": "Five Classes of Speech Acts", "caption": "発話が何をするかによって、発話行為を5つに分ける。サールの分類が広く知られる。", "captionEn": "Speech acts are grouped into five classes by what the utterance does; Searle's scheme is widely known.", "root": {"l": "発話行為", "lEn": "speech acts", "d": "言うことで同時に行う行為。オースティンが論じ、サールが整理した。", "dEn": "Acts performed in saying something, discussed by Austin and systematized by Searle."}, "items": [{"l": "断言型", "lEn": "assertives", "d": "事実を述べる。話者がその真実性を保証する。", "dEn": "States how things are, committing the speaker to its truth.", "sub": [{"l": "報告する", "lEn": "example", "d": "「雨が降っている」と報告する発話が典型例。", "dEn": "Reporting that it is raining."}]}, {"l": "指示型", "lEn": "directives", "d": "聞き手に何かをさせようとする。", "dEn": "Tries to get the hearer to do something.", "sub": [{"l": "依頼・命令", "lEn": "example", "d": "「窓を閉めて」と頼む、命令する。", "dEn": "Requesting or ordering that the window be closed."}]}, {"l": "約束型", "lEn": "commissives", "d": "話者が将来の行為を引き受ける発話。", "dEn": "Commits the speaker to a future action.", "sub": [{"l": "約束する", "lEn": "example", "d": "「明日行きます」と約束する発話が典型例。", "dEn": "Promising to come tomorrow."}]}, {"l": "表出型", "lEn": "expressives", "d": "話者の心的態度や感情を表す発話。", "dEn": "Expresses the speaker's attitude or feeling.", "sub": [{"l": "謝罪・感謝", "lEn": "example", "d": "謝る、感謝する、祝うなどの発話が当たる。", "dEn": "Apologizing, thanking, congratulating."}]}, {"l": "宣言型", "lEn": "declarations", "d": "発話そのものが現実の状態を変える発話。", "dEn": "The utterance itself changes the state of affairs.", "sub": [{"l": "開会宣言", "lEn": "example", "d": "「開会します」と宣言する発話が典型例。", "dEn": "Declaring a meeting open."}]}]}, {"type": "flow", "title": "会話の含みを読み取る推論", "titleEn": "Reasoning to a Conversational Implicature", "caption": "聞き手は字義が会話の目的に合わないと気づくと、話者は協調しているはずだと考えて含みを導く。", "captionEn": "When the literal meaning does not fit the conversation, the hearer assumes cooperation and infers an implicature.", "items": [{"l": "発話を聞く", "lEn": "hear utterance", "d": "聞き手がまず発話の字義どおりの意味を解釈する。", "dEn": "The hearer first interprets the literal meaning."}, {"l": "ずれに気づく", "lEn": "notice mismatch", "d": "字義が会話の目的や文脈に合わず、情報の過不足や無関係さが見える。", "dEn": "The literal meaning does not fit the purpose or context; it seems too little, too much or irrelevant."}, {"l": "協調を仮定", "lEn": "assume cooperation", "d": "話者は協調の原則に従っているはずだと聞き手が前提にする。", "dEn": "The hearer presumes that the speaker is following the Cooperative Principle."}, {"l": "含みを導く", "lEn": "infer implicature", "d": "その前提と合う追加の意味を推論で補う。", "dEn": "The hearer fills in extra meaning that is consistent with that presumption."}, {"l": "意図の解釈", "lEn": "reach intent", "d": "字義を超えた話者の意図にたどり着き、理解が完了する。", "dEn": "The hearer arrives at the speaker's intended meaning beyond the literal one."}]}, {"type": "tree", "title": "ポライトネスの五つの方略", "titleEn": "Five politeness strategies", "caption": "ブラウンとレヴィンソンが挙げた、相手のフェイスを脅かす行為への対処の仕方。依頼の例で示す。", "captionEn": "Brown and Levinson's ways of handling an act that threatens the other's face, shown with a request.", "root": {"l": "フェイス脅かし", "lEn": "Face-threatening act", "d": "依頼のように、相手の自由や面目を損なうおそれのある行為", "dEn": "An act such as a request that may damage the other's freedom or face."}, "items": [{"l": "率直に言う", "lEn": "Bald on record", "d": "配慮を加えず、直接的に行う", "dEn": "Do the act directly with no softening.", "sub": [{"l": "直接依頼", "lEn": "Direct request", "d": "「ペンを貸して」", "dEn": "'Lend me your pen.'"}]}, {"l": "積極的ポライトネス", "lEn": "Positive politeness", "d": "親しさや仲間意識を示して近づく", "dEn": "Approach the hearer by showing closeness and solidarity.", "sub": [{"l": "仲間意識", "lEn": "Solidarity", "d": "「仲間だろ、ペンを貸してくれよ」", "dEn": "'We're friends, lend me your pen.'"}]}, {"l": "消極的ポライトネス", "lEn": "Negative politeness", "d": "相手の自由を尊重し、押しつけを和らげる", "dEn": "Respect the hearer's freedom and soften the imposition.", "sub": [{"l": "遠慮の表現", "lEn": "Hedged request", "d": "「よければペンをお借りできますか」", "dEn": "'Could I possibly borrow your pen?'"}]}, {"l": "暗に言う", "lEn": "Off record", "d": "はっきり言わず、相手の推論に任せる", "dEn": "Do not say it outright and leave it to the hearer's inference.", "sub": [{"l": "ほのめかし", "lEn": "Hint", "d": "「ペンがないんだよな」", "dEn": "'I seem to have no pen.'"}]}, {"l": "行為をしない", "lEn": "Do not perform", "d": "脅かしが大きいと見て、その行為自体をやめる", "dEn": "Judge the threat too great and give up the act itself."}]}], "computational:corpus": [{"type": "tree", "title": "コーパスの種類", "titleEn": "Kinds of corpora", "caption": "目的に応じて、集める言語データの範囲と構成が変わる。代表的な4系統を示す。", "captionEn": "The scope and makeup of the collected data change with the research goal. Four major families are shown.", "root": {"l": "コーパス", "lEn": "Corpus", "d": "実際の言語使用を一定の基準で集めた、電子化されたデータ集合。", "dEn": "A principled, machine-readable collection of authentic language use."}, "items": [{"l": "一般コーパス", "lEn": "General corpus", "d": "ある言語全体の標準的な姿を映すよう、多様なジャンルを均衡よく集めたもの。", "dEn": "Balanced across many genres to mirror a language as a whole.", "sub": [{"l": "BNC", "lEn": "BNC", "d": "英国英語を約1億語集めた参照コーパス。", "dEn": "A reference corpus of about 100 million words of British English."}, {"l": "BCCWJ", "lEn": "BCCWJ", "d": "現代日本語書き言葉均衡コーパス。書籍・雑誌・Webなどを含む。", "dEn": "The Balanced Corpus of Contemporary Written Japanese, covering books, magazines, and the web."}]}, {"l": "専門コーパス", "lEn": "Specialized corpus", "d": "医学論文や法律文書など、特定の分野や場面に絞って集めたもの。", "dEn": "Restricted to a field or setting, such as medical papers or legal texts."}, {"l": "学習者コーパス", "lEn": "Learner corpus", "d": "外国語学習者が書いた・話した言語を集め、誤用の傾向を調べる。", "dEn": "Collects learners' writing or speech to study typical errors."}, {"l": "対訳コーパス", "lEn": "Parallel corpus", "d": "原文と訳文を文単位で対応づけたもの。機械翻訳の学習にも使われる。", "dEn": "Source and translated sentences aligned one to one; also used to train MT."}]}, {"type": "flow", "title": "コーパス分析の手順", "titleEn": "Steps of corpus analysis", "caption": "データを集めてから結論を出すまでの一般的な流れ。各段階で結果が見直されることも多い。", "captionEn": "A common route from data collection to conclusions. Results are often revisited at each stage.", "items": [{"l": "設計・収集", "lEn": "Design and collect", "d": "研究目的に合わせて対象の変種・規模・ジャンルを決め、テキストを集める。", "dEn": "Decide variety, size, and genres to fit the question, then gather texts."}, {"l": "整形・注釈", "lEn": "Clean and annotate", "d": "文字コードをそろえ、品詞や語形などの情報を付与する。", "dEn": "Normalize encoding and add information such as parts of speech and lemmas."}, {"l": "検索", "lEn": "Search", "d": "検索語を文脈つきで並べるコンコーダンスで、実際の用例を確かめる。", "dEn": "Inspect real examples through concordances that show each hit in context."}, {"l": "統計処理", "lEn": "Statistics", "d": "頻度や共起強度を数え、偶然とは言えない偏りを見つける。", "dEn": "Count frequencies and association strength to find patterns beyond chance."}, {"l": "解釈", "lEn": "Interpret", "d": "数値と用例を読み合わせ、語や文法の使われ方を記述する。", "dEn": "Read numbers and examples together to describe how words and grammar are used."}]}, {"type": "compare", "title": "コーパス基盤とコーパス駆動", "titleEn": "Corpus-based and corpus-driven", "caption": "コーパスを仮説の検証に使うか、仮説の発見に使うかで研究の進め方が分かれる。", "captionEn": "Research proceeds differently depending on whether a corpus is used to test hypotheses or to discover them.", "left": {"l": "コーパス基盤", "lEn": "Corpus-based"}, "right": {"l": "コーパス駆動", "lEn": "Corpus-driven"}, "rows": [{"k": "出発点", "kEn": "Starting point", "a": "既存の理論やカテゴリ", "aEn": "Existing theory and categories", "b": "データに現れる型", "bEn": "Patterns in the data"}, {"k": "コーパスの役割", "kEn": "Role of corpus", "a": "仮説を検証する", "aEn": "Tests hypotheses", "b": "仮説を見つける", "bEn": "Discovers hypotheses"}, {"k": "注釈", "kEn": "Annotation", "a": "既存の注釈体系を用いる", "aEn": "Uses established tag sets", "b": "先入観を避け最小限にする", "bEn": "Kept minimal to avoid bias"}, {"k": "用例の扱い", "kEn": "Use of examples", "a": "理論に合う例を探す", "aEn": "Looks for fitting examples", "b": "頻度と共起から型を読む", "bEn": "Reads patterns from frequency and co-occurrence"}, {"k": "代表的な流れ", "kEn": "Associated with", "a": "多くの応用研究", "aEn": "Many applied studies", "b": "シンクレアの流れ", "bEn": "Sinclair's tradition"}]}], "computational:nlp": [{"type": "flow", "title": "NLPの処理パイプライン", "titleEn": "The NLP pipeline", "caption": "文章を段階的に分析する古典的な流れ。近年は複数の段階を一つのモデルがまとめて担うことも多い。", "captionEn": "The classic step-by-step analysis of text. Modern models often handle several stages in one network.", "items": [{"l": "トークン化", "lEn": "Tokenization", "d": "文字列を単語や部分語などの処理単位に区切る。", "dEn": "Split a character string into units such as words or subwords."}, {"l": "形態素解析", "lEn": "Morphology", "d": "単位ごとに品詞や活用形を判定する。日本語では分かち書きも兼ねる。", "dEn": "Assign parts of speech and forms; for Japanese this also finds word boundaries."}, {"l": "構文解析", "lEn": "Parsing", "d": "語どうしの句構造や係り受け関係を求める。", "dEn": "Recover phrase structure or dependency relations among words."}, {"l": "意味解析", "lEn": "Semantic analysis", "d": "語義や述語と項の関係を決め、文の意味を表す。", "dEn": "Resolve word senses and predicate-argument relations to represent meaning."}, {"l": "応用タスク", "lEn": "Applications", "d": "質問応答・要約・分類など、目的に応じた処理を行う。", "dEn": "Carry out tasks such as question answering, summarization, and classification."}]}, {"type": "compare", "title": "規則ベースと機械学習", "titleEn": "Rule-based vs learning-based", "caption": "NLPの二大アプローチ。規則は人が書き、学習はデータからパターンを獲得する。", "captionEn": "Two main approaches to NLP: people write rules, or the system acquires patterns from data.", "left": {"l": "規則ベース", "lEn": "Rule-based"}, "right": {"l": "機械学習", "lEn": "Machine learning"}, "rows": [{"k": "知識の源", "kEn": "Source", "a": "言語学者が書く規則", "aEn": "Rules written by linguists", "b": "大量のデータ", "bEn": "Large amounts of data"}, {"k": "長所", "kEn": "Strength", "a": "動作が説明しやすい", "aEn": "Behavior is easy to explain", "b": "例外や揺れに強い", "bEn": "Robust to exceptions and variation"}, {"k": "短所", "kEn": "Weakness", "a": "網羅に手間がかかる", "aEn": "Coverage takes much effort", "b": "理由が見えにくい", "bEn": "Reasons are hard to see"}, {"k": "必要なもの", "kEn": "Needs", "a": "文法・辞書の整備", "aEn": "Grammars and lexicons", "b": "学習用の注釈データ", "bEn": "Annotated training data"}]}, {"type": "tree", "title": "NLPの主なタスク", "titleEn": "Main tasks in NLP", "caption": "自然言語処理の課題は、出力の形で大きく4つに分けて見渡せる。枝を押すと例が出る。", "captionEn": "NLP tasks can be surveyed in four groups by the form of their output. Tap a branch for examples.", "root": {"l": "NLPのタスク", "lEn": "NLP tasks", "d": "テキストを入力に、ラベル・構造・文章などを出力する処理の総称", "dEn": "Processes that take text as input and output labels, structures or text."}, "items": [{"l": "分類", "lEn": "Classification", "d": "文や文書全体に1つのラベルを付ける", "dEn": "Assign one label to a sentence or a whole document.", "sub": [{"l": "感情分析", "lEn": "Sentiment", "d": "文章の肯定・否定を判定する", "dEn": "Judge whether a text is positive or negative."}, {"l": "話題分類", "lEn": "Topic", "d": "文書を話題の区分に振り分ける", "dEn": "Sort documents into topic categories."}]}, {"l": "系列ラベル付け", "lEn": "Sequence labeling", "d": "語ごとにラベルを付け、全体の並びを整える", "dEn": "Label each word while keeping the whole sequence consistent.", "sub": [{"l": "品詞タグ付け", "lEn": "POS tagging", "d": "各語に品詞を付ける", "dEn": "Give each word its part of speech."}, {"l": "固有表現認識", "lEn": "NER", "d": "人名や地名を見つけて分類する", "dEn": "Find and classify names of people and places."}]}, {"l": "構造予測", "lEn": "Structure prediction", "d": "文の内部構造を木などの形で求める", "dEn": "Recover a sentence's internal structure as a tree or similar.", "sub": [{"l": "係り受け解析", "lEn": "Dependency parsing", "d": "語どうしの依存関係を求める", "dEn": "Find dependency relations between words."}]}, {"l": "生成", "lEn": "Generation", "d": "入力に応じて新しいテキストを作る", "dEn": "Produce new text in response to the input.", "sub": [{"l": "要約", "lEn": "Summarization", "d": "長い文章を短くまとめる", "dEn": "Condense a long text into a short one."}, {"l": "対話", "lEn": "Dialogue", "d": "発話に対して応答の文を返す", "dEn": "Return a reply to an utterance."}]}]}], "computational:speech-processing": [{"type": "flow", "title": "音声認識の流れ", "titleEn": "How speech recognition works", "caption": "音声波形が文字列になるまでの古典的な構成。端末から端末まで一つのモデルで行う方式もある。", "captionEn": "The classic chain from waveform to text. Some systems instead use a single end-to-end model.", "items": [{"l": "音声入力", "lEn": "Audio input", "d": "マイクで拾った音を、一定間隔で標本化してデジタル信号にする。", "dEn": "Sound from a microphone is sampled at fixed intervals into a digital signal."}, {"l": "特徴量抽出", "lEn": "Feature extraction", "d": "短い区間ごとにスペクトルを求め、MFCCなどの特徴量にまとめる。", "dEn": "Compute spectra over short frames and summarize them as features such as MFCC."}, {"l": "音響モデル", "lEn": "Acoustic model", "d": "特徴量がどの音素らしいかの確率を求める。", "dEn": "Estimate how likely each frame is to belong to each phoneme."}, {"l": "言語モデル", "lEn": "Language model", "d": "音の候補のうち、言語として自然な語の並びを選ぶ。", "dEn": "Prefer word sequences that are natural in the language among acoustic candidates."}, {"l": "文字列出力", "lEn": "Text output", "d": "最も確からしい単語列を探索し、認識結果として返す。", "dEn": "Search for the most probable word sequence and return it as the result."}]}, {"type": "compare", "title": "音声認識と音声合成", "titleEn": "Recognition vs synthesis", "caption": "音声言語処理の二大タスクは、互いに入力と出力が逆になっている。", "captionEn": "The two core speech tasks are mirror images: each one's input is the other's output.", "left": {"l": "音声認識(ASR)", "lEn": "ASR"}, "right": {"l": "音声合成(TTS)", "lEn": "TTS"}, "rows": [{"k": "入力", "kEn": "Input", "a": "音声波形", "aEn": "Speech waveform", "b": "文字列", "bEn": "Text"}, {"k": "出力", "kEn": "Output", "a": "文字列", "aEn": "Text", "b": "音声波形", "bEn": "Speech waveform"}, {"k": "難しさ", "kEn": "Difficulty", "a": "雑音・訛り・話速", "aEn": "Noise, accents, speaking rate", "b": "自然な抑揚と間", "bEn": "Natural intonation and pauses"}, {"k": "主な用途", "kEn": "Uses", "a": "文字起こし・音声操作", "aEn": "Transcription, voice control", "b": "読み上げ・案内音声", "bEn": "Read-aloud, spoken guidance"}]}, {"type": "flow", "title": "音声合成の処理手順", "titleEn": "Steps of speech synthesis", "caption": "文字列を読みと韻律に直し、音響特徴量を経て波形にする流れ。", "captionEn": "Text is turned into readings and prosody, then acoustic features, and finally a waveform.", "items": [{"l": "テキスト正規化", "lEn": "Normalize text", "d": "数字や記号を読める形に直す", "dEn": "Rewrite numbers and symbols into readable form."}, {"l": "読みの付与", "lEn": "Add readings", "d": "漢字に読みとアクセントを付ける", "dEn": "Give kanji their readings and accents."}, {"l": "韻律の生成", "lEn": "Make prosody", "d": "音の高さ・長さ・強さの変化を決める", "dEn": "Decide variation in pitch, duration and stress."}, {"l": "特徴量の生成", "lEn": "Make features", "d": "音響モデルが音響特徴量の時系列を出す", "dEn": "An acoustic model outputs a time series of acoustic features."}, {"l": "波形の生成", "lEn": "Make waveform", "d": "ボコーダが特徴量から音声波形を作る", "dEn": "A vocoder generates the speech waveform from the features."}]}], "computational:mt": [{"type": "layers", "title": "翻訳の深さの三角形", "titleEn": "The Vauquois triangle", "caption": "上へ行くほど原文を深く分析する。分析が深いほど翻訳側の作業は軽くなる。", "captionEn": "Moving up means analyzing the source more deeply; the deeper the analysis, the less work remains on the target side.", "items": [{"l": "中間言語", "lEn": "Interlingua", "d": "言語に依存しない意味表現に変換し、そこから訳文を生成する。", "dEn": "Convert to a language-neutral meaning representation, then generate the target."}, {"l": "意味変換", "lEn": "Semantic transfer", "d": "意味構造を分析し、訳す言語の意味構造に写してから生成する。", "dEn": "Analyze meaning structure, map it to the target language's, then generate."}, {"l": "統語変換", "lEn": "Syntactic transfer", "d": "構文木を分析し、語順や構造の規則で訳す言語の木に変える。", "dEn": "Analyze the parse tree and rewrite it into the target tree by structural rules."}, {"l": "直接翻訳", "lEn": "Direct translation", "d": "分析をほぼ行わず、語を辞書で置き換えて語順を整える。", "dEn": "Little analysis: replace words via a dictionary and adjust word order."}]}, {"type": "compare", "title": "統計的MTとニューラルMT", "titleEn": "Statistical vs neural MT", "caption": "2010年代半ばから後半にかけて、主流は句単位の統計的手法からニューラル手法へ移った。", "captionEn": "From the mid to late 2010s the mainstream moved from phrase-based statistical methods to neural methods.", "left": {"l": "統計的MT", "lEn": "Statistical MT"}, "right": {"l": "ニューラルMT", "lEn": "Neural MT"}, "rows": [{"k": "翻訳の単位", "kEn": "Unit", "a": "句の対応表", "aEn": "Phrase-pair tables", "b": "文全体の表現", "bEn": "Whole-sentence representation"}, {"k": "構成", "kEn": "Structure", "a": "翻訳・言語モデルを別々に調整", "aEn": "Separate translation and language models", "b": "一つの網で一括学習", "bEn": "One network trained jointly"}, {"k": "訳文の特徴", "kEn": "Output", "a": "部分的には正確でぎこちない", "aEn": "Locally accurate but choppy", "b": "流暢だが誤訳が見えにくい", "bEn": "Fluent, but errors are subtle"}, {"k": "学習資料", "kEn": "Data", "a": "対訳コーパス", "aEn": "Parallel corpus", "b": "対訳コーパス(より大量)", "bEn": "Parallel corpus (typically more)"}]}, {"type": "flow", "title": "ニューラル翻訳の処理の流れ", "titleEn": "Flow of neural translation", "caption": "原文を部分語に分け、符号化と復号を経て訳文を探索する流れ。", "captionEn": "A source sentence is split into subwords, encoded, decoded and searched for the best translation.", "items": [{"l": "部分語に分割", "lEn": "Split subwords", "d": "原文を頻出する部分語の列に直す。未知語も扱える", "dEn": "Turn the source into a sequence of frequent subword units, which also covers unseen words."}, {"l": "符号化", "lEn": "Encode", "d": "エンコーダが各語を文脈を含むベクトルに変える", "dEn": "The encoder turns each word into a context-aware vector."}, {"l": "注意の計算", "lEn": "Attend", "d": "訳す位置ごとに原文のどこを見るかの重みを求める", "dEn": "For each output position, compute weights over which source words to look at."}, {"l": "復号", "lEn": "Decode", "d": "デコーダが直前までの訳と注意の結果から次の語の確率を出す", "dEn": "The decoder gives next-word probabilities from the translation so far and the attention result."}, {"l": "訳文の探索", "lEn": "Search", "d": "ビームサーチで確率の高い訳文の候補を選ぶ", "dEn": "Beam search picks high-probability translation candidates."}]}], "computational:ir": [{"type": "flow", "title": "検索エンジンの手順", "titleEn": "Steps of a search engine", "caption": "文書を集めて索引にしておき、質問が来たら該当文書を見つけて順位をつける流れ。", "captionEn": "Documents are collected and indexed in advance; a query then retrieves and ranks matching documents.", "items": [{"l": "文書収集", "lEn": "Crawl and collect", "d": "検索対象の文書を集め、本文を取り出して整える。", "dEn": "Gather the documents to be searched and extract their text."}, {"l": "索引作成", "lEn": "Indexing", "d": "語ごとに出現する文書を記録した転置インデックスを作る。", "dEn": "Build an inverted index recording which documents contain each term."}, {"l": "質問の解析", "lEn": "Query processing", "d": "検索語を同じ方法で単位に分け、表記ゆれを正規化する。", "dEn": "Split the query into terms the same way and normalize spelling variants."}, {"l": "順位づけ", "lEn": "Ranking", "d": "TF-IDFやBM25などで各文書のスコアを計算し、並べ替える。", "dEn": "Score each document with TF-IDF, BM25, or similar and sort by score."}, {"l": "評価", "lEn": "Evaluation", "d": "適合率と再現率などで、結果の良し悪しを測る。", "dEn": "Judge result quality with measures such as precision and recall."}]}, {"type": "matrix", "title": "適合率と再現率の整理", "titleEn": "Precision and recall", "caption": "検索結果を「検索されたか」「適合か」で4つに分ける。適合率は左列、再現率は上段で決まる。", "captionEn": "Results split by retrieved or not and relevant or not. Precision looks at the left column, recall at the top row.", "x": {"l": "検索されたか", "lEn": "Retrieved?"}, "y": {"l": "本当に適合か", "lEn": "Relevant?"}, "cells": [{"l": "検索・適合", "lEn": "Hit", "d": "求める文書を正しく見つけた状態。多いほど良い。", "dEn": "Relevant documents correctly found. More is better."}, {"l": "未検索・適合", "lEn": "Miss", "d": "求める文書を取りこぼした状態。多いと再現率が下がる。", "dEn": "Relevant documents that were missed; many of them lower recall."}, {"l": "検索・不適合", "lEn": "False hit", "d": "関係ない文書を出した状態。多いと適合率が下がる。", "dEn": "Irrelevant documents returned; many of them lower precision."}, {"l": "未検索・不適合", "lEn": "Correct reject", "d": "関係ない文書を出さなかった状態。通常は大多数を占める。", "dEn": "Irrelevant documents left out; normally the vast majority."}]}, {"type": "tree", "title": "検索モデルの系統", "titleEn": "Families of retrieval models", "caption": "文書とクエリの関連度をどう計算するかで、検索モデルはいくつかの系統に分かれる。", "captionEn": "Retrieval models fall into several families according to how they compute relevance between a query and a document.", "root": {"l": "検索モデル", "lEn": "Retrieval model", "d": "クエリと文書の関連度を決める計算の枠組み", "dEn": "A framework for computing how relevant a document is to a query."}, "items": [{"l": "ブールモデル", "lEn": "Boolean model", "d": "AND・OR・NOTで条件を満たすかを二値で判定し、順位はつけない", "dEn": "Judges by AND, OR and NOT whether a document satisfies the query, with no ranking."}, {"l": "ベクトル空間", "lEn": "Vector space", "d": "文書とクエリを重みのベクトルにし、近さで順位づけする", "dEn": "Represents documents and queries as weighted vectors and ranks by closeness.", "sub": [{"l": "TF-IDF", "lEn": "TF-IDF", "d": "語の頻度と希少性で重みをつける", "dEn": "Weights terms by frequency and rarity."}, {"l": "余弦類似度", "lEn": "Cosine similarity", "d": "ベクトルの向きの近さを測る", "dEn": "Measures how close the vectors' directions are."}]}, {"l": "確率モデル", "lEn": "Probabilistic", "d": "文書が関連する確率をもとに順位をつける", "dEn": "Ranks documents by their estimated probability of relevance.", "sub": [{"l": "BM25", "lEn": "BM25", "d": "語頻度と文書長を調整する代表的な関数", "dEn": "A leading function adjusting for term frequency and document length."}]}, {"l": "学習ベース", "lEn": "Learning-based", "d": "関連性の判定データから順位づけの仕組みを学習する", "dEn": "Learns the ranking mechanism from relevance-labelled data.", "sub": [{"l": "ランキング学習", "lEn": "Learning to rank", "d": "順位づけ関数を教師データから獲得する", "dEn": "Acquires the ranking function from training data."}, {"l": "密検索", "lEn": "Dense retrieval", "d": "埋め込みベクトルの近さで探す", "dEn": "Searches by closeness of embedding vectors."}]}]}], "computational:llm": [{"type": "flow", "title": "LLMができるまで", "titleEn": "How an LLM is built", "caption": "大量の文章で言語の規則性を学び、その後に人の指示に沿うよう調整するという二段構えが基本。", "captionEn": "The basic recipe: learn regularities from huge text first, then tune the model to follow human instructions.", "items": [{"l": "データ収集", "lEn": "Data collection", "d": "Web・書籍・コードなどの文章を集め、重複や低品質な文を除く。", "dEn": "Collect web pages, books, and code, then filter duplicates and low-quality text."}, {"l": "事前学習", "lEn": "Pretraining", "d": "次のトークンを予測する課題を大量の文章で解き続け、言語の知識を得る。", "dEn": "Keep predicting the next token over huge text, acquiring knowledge of language."}, {"l": "指示チューニング", "lEn": "Instruction tuning", "d": "指示と望ましい応答の組で追加学習し、指示に従う動作を教える。", "dEn": "Further train on instruction and ideal-response pairs to teach instruction following."}, {"l": "人間の評価で調整", "lEn": "Preference tuning", "d": "人の好みの比較をもとに、有用で安全な応答へ近づける(RLHFなど)。", "dEn": "Use human preference comparisons to favor helpful, safe answers (e.g. RLHF)."}, {"l": "推論・利用", "lEn": "Inference and use", "d": "プロンプトを与えて応答を生成する。検索(RAG)や道具と組み合わせることもある。", "dEn": "Generate replies from a prompt, sometimes combined with retrieval (RAG) or tools."}]}, {"type": "compare", "title": "エンコーダ型とデコーダ型", "titleEn": "Encoder vs decoder models", "caption": "Transformerを使うモデルは主に、文を読み取る型と続きを書く型に分かれる。両者を組み合わせた型もある。", "captionEn": "Transformer models mainly split into those that read and encode text and those that generate continuations; a combined encoder-decoder type also exists.", "left": {"l": "エンコーダ型", "lEn": "Encoder-only"}, "right": {"l": "デコーダ型", "lEn": "Decoder-only"}, "rows": [{"k": "代表例", "kEn": "Example", "a": "BERT", "aEn": "BERT", "b": "GPT系", "bEn": "GPT family"}, {"k": "文脈の見方", "kEn": "Context", "a": "前後の両方向", "aEn": "Both left and right", "b": "左から右へ順に", "bEn": "Left to right, in order"}, {"k": "学習の課題", "kEn": "Training task", "a": "伏せた語の穴埋め", "aEn": "Fill in masked words", "b": "次のトークン予測", "bEn": "Next-token prediction"}, {"k": "得意な用途", "kEn": "Best for", "a": "分類・抽出・検索", "aEn": "Classification, extraction, search", "b": "文章生成・対話", "bEn": "Text generation, dialogue"}]}, {"type": "cycle", "title": "一語ずつ生成する循環", "titleEn": "The one-token-at-a-time loop", "caption": "自己回帰型のモデルは、次のトークンを一つ選んでは入力に足す手順を、終わりまでくり返す。", "captionEn": "An autoregressive model picks one next token, appends it to the input, and repeats until it finishes.", "items": [{"l": "入力を分割", "lEn": "Tokenize", "d": "プロンプトをトークンの列に分け、数値のIDに変える", "dEn": "Split the prompt into tokens and turn them into numeric IDs."}, {"l": "確率を計算", "lEn": "Compute odds", "d": "文脈全体を見て、次に来るトークンの確率分布を出す", "dEn": "Look at the whole context and output a distribution over the next token."}, {"l": "一つ選ぶ", "lEn": "Pick a token", "d": "分布から次のトークンを選ぶ。選び方で出力の多様さが変わる", "dEn": "Choose the next token from the distribution; the method changes output diversity."}, {"l": "入力に追加", "lEn": "Append", "d": "選んだトークンを文脈の末尾に足し、次の計算に回す", "dEn": "Add the chosen token to the end of the context for the next step."}]}], "theoretical:phonetics": [{"type": "flow", "title": "話し手から聞き手への音の連鎖", "titleEn": "The speech chain", "caption": "音声は、話し手の頭の中の言葉から聞き手の理解まで、段階をたどって伝わる。", "captionEn": "Speech passes in stages from words in the speaker's mind to understanding in the listener.", "items": [{"l": "発話の計画", "lEn": "Plan the speech", "d": "話し手が言葉を選び、音の並びを頭の中で組み立てる。", "dEn": "The speaker selects words and assembles the sound sequence in the mind."}, {"l": "調音", "lEn": "Articulation", "d": "肺・声帯・舌・唇などを動かして音を作る。", "dEn": "Lungs, vocal folds, tongue and lips move to make sound."}, {"l": "音波の伝達", "lEn": "Sound wave", "d": "口から出た空気の振動が、聞き手の耳まで音波として届く。", "dEn": "Air vibration leaving the mouth travels to the listener as a sound wave."}, {"l": "聴覚", "lEn": "Hearing", "d": "耳が音波を受け取り、神経信号に変えて脳へ送る。", "dEn": "The ear receives the wave and sends it to the brain as nerve signals."}, {"l": "理解", "lEn": "Understanding", "d": "聞き手が信号から音や語を認識し、意味を読み取る。", "dEn": "The listener recognizes sounds and words and extracts meaning."}]}], "theoretical:syntax": [{"type": "compare", "title": "補部と付加部", "titleEn": "Complements and adjuncts", "caption": "動詞句の中で、動詞に要求される要素と、自由に足せる要素を分けて比べる。", "captionEn": "Within a verb phrase, elements the verb requires are set against elements that can be freely added.", "left": {"l": "補部", "lEn": "Complement"}, "right": {"l": "付加部", "lEn": "Adjunct"}, "rows": [{"k": "必要性", "kEn": "Necessity", "a": "主要部が要求することが多い", "aEn": "Often required by the head", "b": "随意で、なくても成り立つ", "bEn": "Optional; can be left out"}, {"k": "位置", "kEn": "Position", "a": "主要部のすぐ近く", "aEn": "Close to the head", "b": "補部の外側", "bEn": "Outside the complement"}, {"k": "数", "kEn": "Number", "a": "主要部ごとにほぼ決まる", "aEn": "Largely fixed by the head", "b": "何個でも重ねられる", "bEn": "Can be stacked freely"}, {"k": "do so置換", "kEn": "Do-so test", "a": "動詞とともに置き換わる", "aEn": "Replaced along with the verb", "b": "置換後も残せる", "bEn": "Can remain after replacement"}, {"k": "例", "kEn": "Example", "a": "read a book の a book", "aEn": "a book in read a book", "b": "in the park, yesterday", "bEn": "in the park, yesterday"}]}], "historical:historical-ling": [{"type": "tree", "title": "音変化の主な型", "titleEn": "Main types of sound change", "caption": "音が変わるときの典型的なパターン。枝を押すと、実際の言語の例が出る。", "captionEn": "Typical patterns by which sounds change. Tap a branch for examples from real languages.", "root": {"l": "音変化の型", "lEn": "Types of sound change", "d": "音の変化は、いくつかの典型的な型に分類して捉えられる", "dEn": "Sound changes can be classified into a few typical patterns."}, "items": [{"l": "同化", "lEn": "Assimilation", "d": "隣り合う音が互いに似る変化", "dEn": "A sound becomes more like a neighboring sound.", "sub": [{"l": "ptがtt", "lEn": "pt becomes tt", "d": "ラテン語septemがイタリア語ではsetteになった", "dEn": "Latin septem became Italian sette."}]}, {"l": "脱落", "lEn": "Deletion", "d": "ある音が発音されなくなる変化", "dEn": "A sound ceases to be pronounced.", "sub": [{"l": "語末の-e", "lEn": "Final -e", "d": "中英語の語末の-eは発音されなくなり、綴りだけが残った", "dEn": "Final -e of Middle English fell silent, leaving only the spelling."}]}, {"l": "音位転換", "lEn": "Metathesis", "d": "語の中で音の順序が入れ替わる変化", "dEn": "The order of sounds within a word is reversed.", "sub": [{"l": "brid>bird", "lEn": "brid > bird", "d": "古英語のbridは中英語でbirdの語順になった", "dEn": "Old English brid came to be bird in Middle English."}]}, {"l": "添加", "lEn": "Epenthesis", "d": "もとにない音が挿入される変化", "dEn": "A sound that was not there is inserted.", "sub": [{"l": "thunder", "lEn": "thunder", "d": "古英語のþunorにdが入り、thunderになった", "dEn": "A d was inserted into Old English thunor, giving thunder."}]}, {"l": "弱化", "lEn": "Lenition", "d": "音が弱く、発音しやすくなる変化", "dEn": "A sound becomes weaker and easier to pronounce.", "sub": [{"l": "tがd", "lEn": "t becomes d", "d": "ラテン語vitaがスペイン語ではvidaになった", "dEn": "Latin vita became Spanish vida."}]}]}], "psycho:neurolinguistics": [{"type": "tree", "title": "失語症の主な型", "titleEn": "Main types of aphasia", "caption": "古典的な分類では、流暢さ、理解、復唱のどこが損なわれるかで型を分ける。", "captionEn": "The classical scheme separates types by which of fluency, comprehension and repetition is impaired.", "root": {"l": "失語症", "lEn": "Aphasia", "d": "脳の損傷のあとに、話す・理解する・読む・書くといった言語の力が損なわれる状態", "dEn": "Impairment of speaking, understanding, reading or writing after brain damage."}, "items": [{"l": "ブローカ失語", "lEn": "Broca's aphasia", "d": "発話がたどたどしく、文法語が抜けやすい。理解は比較的保たれる", "dEn": "Halting speech with missing function words; comprehension is relatively preserved.", "sub": [{"l": "非流暢", "lEn": "Non-fluent", "d": "話す量が少なく、努力を要する", "dEn": "Little speech, produced with effort."}]}, {"l": "ウェルニッケ失語", "lEn": "Wernicke's aphasia", "d": "発話は流暢だが意味が通じにくく、聞いた内容の理解も悪い", "dEn": "Speech is fluent but hard to follow, and comprehension is poor.", "sub": [{"l": "流暢", "lEn": "Fluent", "d": "話す量は多く、抑揚も保たれる", "dEn": "Plenty of speech with preserved intonation."}]}, {"l": "伝導失語", "lEn": "Conduction aphasia", "d": "理解と発話は比較的保たれるが、復唱が特に難しい", "dEn": "Comprehension and speech are relatively preserved, but repetition is especially hard."}, {"l": "全失語", "lEn": "Global aphasia", "d": "話すことも理解することも重く損なわれる", "dEn": "Both speaking and understanding are severely impaired."}]}], "computational:knowledge-rep:knowledge-graph": [{"type": "flow", "title": "知識グラフの作り方", "titleEn": "How a knowledge graph is built", "caption": "文章などの元データから実体と関係を取り出し、検証してグラフにまとめていく流れ。", "captionEn": "From raw sources such as text, entities and relations are extracted, checked and assembled into a graph.", "items": [{"l": "固有表現抽出", "lEn": "Entity recognition", "d": "文中から人名・地名・組織名などの言及を見つける", "dEn": "Find mentions of people, places and organizations in text."}, {"l": "実体の対応づけ", "lEn": "Entity linking", "d": "見つけた言及を、知識ベース上の同じ実体に結びつける", "dEn": "Tie each mention to the same entity in the knowledge base."}, {"l": "関係の抽出", "lEn": "Relation extraction", "d": "実体どうしの関係を読み取り、三つ組の形にする", "dEn": "Read off relations between entities and put them in triple form."}, {"l": "統合と検証", "lEn": "Merge and verify", "d": "重複や矛盾を整理し、誤りを取り除く", "dEn": "Resolve duplicates and conflicts, and remove errors."}, {"l": "公開と更新", "lEn": "Publish and update", "d": "問い合わせに使える形で公開し、新しい事実で更新する", "dEn": "Publish in a queryable form and update with new facts."}]}], "computational:knowledge-rep:ontology": [{"type": "layers", "title": "オントロジーの抽象度", "titleEn": "Levels of ontology generality", "caption": "グアリーノは、対象とする範囲の広さで、上位・領域とタスク・応用の三段にオントロジーを分けた。", "captionEn": "Guarino divided ontologies by scope into top-level, domain and task, and application ontologies.", "items": [{"l": "上位", "lEn": "Top-level", "d": "時間・物・出来事など、どの分野にも通じる最も一般的な概念を扱う", "dEn": "Covers the most general concepts, such as time, object and event, common to every field."}, {"l": "領域・タスク", "lEn": "Domain and task", "d": "医療など特定の分野や、診断などの特定の作業に使う概念を扱う", "dEn": "Covers concepts for one field such as medicine, or one task such as diagnosis."}, {"l": "応用", "lEn": "Application", "d": "個々のシステムの必要に合わせて、領域とタスクの概念を組み合わせる", "dEn": "Combines domain and task concepts to meet the needs of a single system."}]}], "computational:knowledge-rep:owl": [{"type": "tree", "title": "OWLオントロジーの三つの部品", "titleEn": "Three building blocks of an OWL ontology", "caption": "OWLはクラス・プロパティ・個体の三つで知識を書く。枝を押すと、それぞれに使う宣言が出る。", "captionEn": "OWL writes knowledge with classes, properties and individuals. Tap a branch to see the declarations used for each.", "root": {"l": "OWL文書", "lEn": "OWL ontology", "d": "クラス・プロパティ・個体についての公理の集まり", "dEn": "A set of axioms about classes, properties and individuals."}, "items": [{"l": "クラス", "lEn": "Class", "d": "個体の集合を表す。階層や制約を公理で与える", "dEn": "Stands for a set of individuals; hierarchy and constraints are given by axioms.", "sub": [{"l": "サブクラス", "lEn": "Subclass", "d": "一方の個体がすべて他方にも属する関係", "dEn": "One class's members all belong to the other."}, {"l": "同値クラス", "lEn": "Equivalent class", "d": "二つのクラスが全く同じ個体を持つ関係", "dEn": "Two classes have exactly the same members."}, {"l": "排他クラス", "lEn": "Disjoint classes", "d": "共通の個体を持てない関係", "dEn": "Classes that cannot share any member."}]}, {"l": "プロパティ", "lEn": "Property", "d": "個体どうし、または個体と値を結ぶ関係", "dEn": "A relation linking individuals to each other or to values.", "sub": [{"l": "対象プロパティ", "lEn": "Object property", "d": "個体と個体を結ぶ。例は親子関係", "dEn": "Links two individuals, e.g. parent of."}, {"l": "データ型プロパティ", "lEn": "Datatype property", "d": "個体と数値や文字列を結ぶ", "dEn": "Links an individual to a number or string."}]}, {"l": "個体", "lEn": "Individual", "d": "クラスの具体的な一員。名前が重なっても別とは限らない", "dEn": "A concrete member of a class; two names need not mean two things."}]}], "computational:knowledge-rep:rdf": [{"type": "flow", "title": "RDFデータを作って使う流れ", "titleEn": "From making RDF data to using it", "caption": "対象に名前を付けてトリプルで述べ、書き出して蓄え、問い合わせるまでの基本の手順。", "captionEn": "The basic path from naming things and stating triples to storing and querying them.", "items": [{"l": "URIを付ける", "lEn": "Name with URIs", "d": "記述したい対象と関係に、URIで名前を付ける", "dEn": "Give the things and relations to describe a URI each."}, {"l": "トリプルで書く", "lEn": "Write triples", "d": "主語・述語・目的語の三つ組で事実を述べる", "dEn": "State each fact as a subject, predicate and object."}, {"l": "書式で出力", "lEn": "Serialize", "d": "TurtleやRDF/XMLなどの書式で文字列にする", "dEn": "Write the triples out as text in Turtle, RDF/XML or similar."}, {"l": "ストアに蓄える", "lEn": "Load a store", "d": "トリプルストアに読み込み、検索できる状態にする", "dEn": "Load them into a triple store so they can be searched."}, {"l": "SPARQLで問う", "lEn": "Query it", "d": "SPARQLで条件に合うトリプルを取り出す", "dEn": "Retrieve matching triples with SPARQL."}]}], "computational:knowledge-rep:reasoning": [{"type": "compare", "title": "演繹と帰納", "titleEn": "Deduction and induction", "caption": "同じ「推論」でも、演繹は前提から結論を必然的に導き、帰納は事例から一般則を推し広げる。", "captionEn": "Both are inference, but deduction derives a conclusion necessarily from premises, while induction extends cases to a general rule.", "left": {"l": "演繹", "lEn": "Deduction"}, "right": {"l": "帰納", "lEn": "Induction"}, "rows": [{"k": "向き", "kEn": "Direction", "a": "一般から個別へ", "aEn": "General to particular", "b": "個別から一般へ", "bEn": "Particular to general"}, {"k": "結論の確かさ", "kEn": "Certainty", "a": "前提が真なら必ず真", "aEn": "True whenever premises are true", "b": "確からしいだけで覆りうる", "bEn": "Only probable and can be overturned"}, {"k": "新しい知識", "kEn": "New knowledge", "a": "前提に含まれる内容を明示する", "aEn": "Makes explicit what premises contain", "b": "前提を超えた内容を述べる", "bEn": "Says more than the premises"}, {"k": "例", "kEn": "Example", "a": "人は死ぬ、ゆえに太郎も死ぬ", "aEn": "All humans die, so Taro dies", "b": "見た白鳥が白い、ゆえに白鳥は白い", "bEn": "Swans seen were white, so swans are white"}, {"k": "機械での役割", "kEn": "Role in machines", "a": "規則に基づく推論エンジン", "aEn": "Rule-based inference engines", "b": "事例から学ぶ機械学習", "bEn": "Machine learning from examples"}]}], "computational:knowledge-rep:semantic-web": [{"type": "layers", "title": "セマンティックWebの階層", "titleEn": "The Semantic Web layers", "caption": "バーナーズ=リーが示した「階層ケーキ」の簡略図。上の層は下の層の仕様の上に成り立つ。", "captionEn": "A simplified view of Berners-Lee's layer cake. Each layer builds on the specifications below it.", "items": [{"l": "信頼・証明", "lEn": "Proof and trust", "d": "結論の根拠を示し、情報源を信頼できるか判断する", "dEn": "Show the grounds for conclusions and judge whether sources can be trusted."}, {"l": "規則・論理", "lEn": "Rules and logic", "d": "規則を書き、論理にもとづいて新しい事実を導く", "dEn": "Write rules and derive new facts by logic."}, {"l": "オントロジー", "lEn": "Ontology", "d": "RDFSやOWLで、語の意味や関係を取り決める", "dEn": "Fix the meaning of terms and relations with RDFS and OWL."}, {"l": "RDF", "lEn": "RDF", "d": "トリプルでデータを表す共通のデータモデル", "dEn": "The common data model that expresses data as triples."}, {"l": "URIと文字", "lEn": "URI and Unicode", "d": "あらゆる対象に名前を付ける識別子と、文字の基盤", "dEn": "Identifiers that name anything, and the character foundation."}]}]};

const TRIVIA_MORE = {"applied:language-education": [{"trivia": "第二次大戦中の1942年、米国は陸軍特別訓練計画を始め、会話力を重視する集中訓練を行った。これが後のオーディオリンガル法の源流とされる。", "triviaEn": "In 1942 the US began the Army Specialized Training Program, an intensive course stressing speaking. It is seen as a root of the later audiolingual method."}, {"trivia": "ベルリッツは1878年に米国のプロビデンスで語学学校を開き、授業を学習言語だけで行う直接法を広めた。", "triviaEn": "Maximilian Berlitz opened a language school in Providence, USA, in 1878 and popularized the direct method, which teaches only in the target language."}, {"trivia": "CEFRは欧州評議会が2001年に刊行した。同年は欧州言語年にあたり、各国で言語学習を広げる催しが行われた。", "triviaEn": "The Council of Europe published the CEFR in 2001, the European Year of Languages, when events promoting language learning were held across countries."}, {"trivia": "TOEFLの最初の試験は1964年に行われた。2005年には、インターネットで受ける形式のiBTが導入され始めた。", "triviaEn": "The first TOEFL test was given in 1964; in 2005 the internet-based iBT began to be introduced."}], "applied:translation": [{"trivia": "国際翻訳デーは9月30日で、聖書をラテン語に訳した聖ヒエロニムスの記念日にあたる。国連は2017年に総会決議でこの日を制定した。", "triviaEn": "International Translation Day is 30 September, the feast of St. Jerome, who translated the Bible into Latin. The UN General Assembly established it by resolution in 2017."}, {"trivia": "ロゼッタ・ストーンは1799年に発見され、同じ内容が3種類の文字で刻まれていた。シャンポリオンが1822年に解読の鍵を示した。", "triviaEn": "The Rosetta Stone was found in 1799 with one text in three scripts. Champollion presented the key to deciphering hieroglyphs in 1822."}, {"trivia": "1954年のジョージタウン=IBM実験では、ロシア語の文60余りをコンピューターが英語へ訳す様子が公開された。", "triviaEn": "In the 1954 Georgetown-IBM experiment, a computer was shown translating more than 60 Russian sentences into English."}, {"trivia": "グーグル翻訳は2006年に始まり、2016年に一部の言語でニューラル機械翻訳に切り替えられた。", "triviaEn": "Google Translate began in 2006 and, in 2016, switched some languages to neural machine translation."}], "applied:interpretation": [{"trivia": "1945年から46年のニュルンベルク裁判は、法廷で同時通訳が本格的に使われた最初期の例として知られ、この方式が広まる契機になった。", "triviaEn": "The Nuremberg trials of 1945-46 are known as one of the first courts to use simultaneous interpreting at scale, which helped the method spread."}, {"trivia": "国際会議通訳者協会(AIIC)は1953年に設立された。同じ1953年には、国際翻訳家連盟(FIT)も設立されている。", "triviaEn": "The International Association of Conference Interpreters (AIIC) was founded in 1953. The International Federation of Translators (FIT) was founded the same year."}, {"trivia": "1919年のパリ講和会議で、ヴェルサイユ条約は英語とフランス語の両方が正文とされた。外交の言語がフランス語一色でなくなった例とされる。", "triviaEn": "At the 1919 Paris Peace Conference, the Treaty of Versailles was made authentic in both English and French, an example of diplomacy ceasing to be French alone."}, {"trivia": "国連の公用語は英語・フランス語・スペイン語・ロシア語・中国語・アラビア語の6つで、アラビア語は1973年に総会の公用語と作業言語に加わった。", "triviaEn": "The UN has six official languages, English, French, Spanish, Russian, Chinese and Arabic; Arabic became an official and working language of the General Assembly in 1973."}], "applied:lexicography": [{"trivia": "ジョンソンは1755年に英語辞典を出した。学士院の会員40人が40年かけたフランスの辞書と比べ、冗談まじりに自分の速さを誇ったと伝わる。", "triviaEn": "Johnson published his English dictionary in 1755. He is said to have joked about his own speed compared with the French Academy's forty members and forty years."}, {"trivia": "1987年刊のコリンズ・コビルド英英辞典は、バーミンガム大学のコーパスに基づいて作られた。編集主幹はジョン・シンクレア。", "triviaEn": "The Collins COBUILD English Language Dictionary of 1987 was built on the University of Birmingham's corpus. John Sinclair was editor in chief."}, {"trivia": "OEDの編纂には、精神科病院に収容されていた元米軍軍医ウィリアム・マイナーが、多数の用例を送って協力した。", "triviaEn": "A former US army surgeon, William Minor, confined in an asylum, contributed a great many quotations to the OED."}, {"trivia": "最初の学習者用英英辞典とされる辞書は1942年に東京で刊行された。ホーンビーらの編で、1948年にオックスフォード大学出版局が英国で出した。", "triviaEn": "A dictionary regarded as the first learner's English dictionary appeared in Tokyo in 1942, by Hornby and colleagues; Oxford University Press issued it in Britain in 1948."}], "applied:language-testing": [{"trivia": "英検の最初の試験は1963年に実施され、当初は1級から3級の3段階で、大学程度、高校程度、中学程度に分けられていた。", "triviaEn": "The first Eiken test was held in 1963 with three grades, 1 to 3, set at university, high school and junior high school levels."}, {"trivia": "TOEFLは1964年に初めて実施された。米国の大学に留学する非英語母語話者の英語力を測る試験として始まった。", "triviaEn": "TOEFL was first administered in 1964, as a test of English proficiency for non-native speakers applying to study at US universities."}, {"trivia": "TOEICは、日本からの要請を受けてETSが開発したテストで、最初の公開テストは1979年12月に日本で実施された。", "triviaEn": "TOEIC was developed by ETS at a request from Japan, and its first public administration took place in Japan in December 1979."}, {"trivia": "ケンブリッジ大学の英語熟達度試験CPEは1913年に始まった。現在はC2 Proficiencyの名で、いまも実施されている。", "triviaEn": "Cambridge's Certificate of Proficiency in English began in 1913. It is still given today under the name C2 Proficiency."}], "applied:forensic-ling": [{"trivia": "法言語学という語は、1968年にヤン・スバルトヴィクがエヴァンズ事件の供述書を分析した著作で初めて使われた。", "triviaEn": "The term forensic linguistics first appeared in 1968 in Jan Svartvik's study of the statements in the Timothy Evans case."}, {"trivia": "1995年9月、新聞2紙が連続爆弾犯の声明文を掲載した。文体に気づいた弟の通報が、1996年4月の逮捕につながった。", "triviaEn": "In September 1995 two newspapers printed the Unabomber's manifesto. His brother recognized the style and reported it, leading to the arrest in April 1996."}, {"trivia": "2013年、ロバート・ガルブレイス名義の推理小説について、新聞社が言語分析を依頼した。結果はJ.K.ローリングの文体と近く、本人が作者と認めた。", "triviaEn": "In 2013 a newspaper asked for a linguistic analysis of a crime novel by 'Robert Galbraith'. The results matched J.K. Rowling's style, and she acknowledged authorship."}, {"trivia": "1966年6月13日、米連邦最高裁はミランダ対アリゾナ州事件の判決で、取り調べ前に黙秘権などを告げることを警察に義務づけた。", "triviaEn": "On June 13, 1966, the US Supreme Court ruled in Miranda v. Arizona that police must inform suspects of rights such as silence before questioning."}], "applied:medical-business-ling": [{"trivia": "米国の平易文書法は2010年10月13日に署名され、連邦機関に、国民向けの文書を分かりやすい言葉で書くことを義務づけた。", "triviaEn": "The US Plain Writing Act was signed on 13 October 2010 and requires federal agencies to write public-facing documents in plain language."}, {"trivia": "国立国語研究所の委員会は2009年3月に最終報告をまとめ、「重篤」「予後」など患者に伝わりにくい語の言い換えを医療者に提案した。", "triviaEn": "A committee of Japan's National Institute for Japanese Language issued its final report in March 2009, proposing plain paraphrases of terms such as juutoku and yogo for medical staff."}, {"trivia": "インフォームド・コンセントという語は、1957年の米国カリフォルニア州のサルゴ事件の判決で、初めて使われたとされる。", "triviaEn": "The term 'informed consent' is said to have first been used in the 1957 Salgo case ruling in California."}, {"trivia": "日本では1997年の医療法改正で、医療者は適切な説明を行い、医療を受ける者の理解を得るよう努めることが定められた。", "triviaEn": "In Japan, the 1997 revision of the Medical Care Act required medical professionals to explain appropriately and strive to gain the patient's understanding."}], "historical:historical-ling": [{"trivia": "ソシュールは1879年の論文で、印欧祖語に当時未知の音があったと予測した。1927年にクリウォヴィチが、ヒッタイト語の喉音がその音にあたると示した。", "triviaEn": "In an 1879 monograph, Saussure predicted that Proto-Indo-European had sounds unknown at the time. In 1927 Kurylowicz showed that a Hittite consonant matched them, confirming it nearly 50 years later."}, {"trivia": "チョーサーの時代、英語のmouseやhouseの母音は今の「ムース」「フース」に近かった。大母音推移でおよそ1400年から1700年にかけて変わったとされる。", "triviaEn": "In Chaucer's time, 'mouse' and 'house' sounded closer to 'moose' and 'hoose.' The Great Vowel Shift changed such vowels roughly between 1400 and 1700, though the start and end are dated differently."}, {"trivia": "英語のcow・pig・sheepは古英語に由来するが、beef・pork・muttonは1066年のノルマン征服後に入った古フランス語に由来する。", "triviaEn": "English cow, pig and sheep come from Old English, but beef, pork and mutton come from Old French, entering after the Norman Conquest of 1066."}, {"trivia": "英語のniceはラテン語のnescius(無知な)に由来し、中英語では「愚かな」の意で使われた。のちに意味が移り、「よい」になった。", "triviaEn": "English nice comes from Latin nescius 'ignorant' and meant 'foolish' in Middle English; its meaning later shifted to 'pleasant'."}], "historical:comparative-ling": [{"trivia": "1868年、シュライヒャーは再建した印欧祖語で短い寓話「羊と馬」(Avis akvasas ka)を書いた。祖語で書かれた最初の文章とされ、のちに何度も書き直された。", "triviaEn": "In 1868 August Schleicher wrote a short fable, 'The Sheep and the Horses,' in reconstructed Proto-Indo-European. It is regarded as the first text composed in the language and was later revised several times."}, {"trivia": "ハンガリーのサイノヴィチは1770年の著作で、ハンガリー語とサーミ語が同系だと論じた。1769年の金星の日面通過を観測する遠征がきっかけだった。", "triviaEn": "In his 1770 work Demonstratio, the Hungarian Janos Sajnovics argued that Hungarian and Sami are related. It grew out of the 1769 expedition to observe the transit of Venus."}, {"trivia": "20世紀初めに中国新疆のタリム盆地で見つかった写本の言語は、1908年にジークとジークリングが印欧語と論じ、トカラ語と呼ばれる。", "triviaEn": "A language found in manuscripts from the Tarim Basin in Xinjiang was argued to be Indo-European by Sieg and Siegling in 1908; it is called Tocharian."}, {"trivia": "1915年、チェコのフロズニーはヒッタイト語の楔形文字の粘土板を解読し、同語が印欧語族に属することを示した。", "triviaEn": "In 1915 the Czech scholar Hrozny deciphered Hittite cuneiform tablets and showed that Hittite belongs to the Indo-European family."}], "historical:typology": [{"trivia": "グリーンバーグは1963年、わずか30言語の資料から45の言語普遍性を提示した。語順と形態の対応を論じ、現代の類型論の出発点になった。", "triviaEn": "In 1963 Joseph Greenberg proposed 45 linguistic universals from a sample of just 30 languages, linking word order and morphology. The paper is a starting point of modern typology."}, {"trivia": "グリーンバーグは1963年の『アフリカの諸言語』で、アフリカの言語を四つの語族にまとめた。同じ年に語順の普遍性も論じている。", "triviaEn": "In his 1963 book The Languages of Africa, Greenberg grouped African languages into four families. The same year he also discussed word order universals."}, {"trivia": "ブラジルのヒシュカリヤナ語は目的語-動詞-主語の語順を基本とする。1977年にダービーシャーが報告するまで、そうした言語はないと見られていた。", "triviaEn": "Hixkaryana of Brazil has basic object-verb-subject order. Until Derbyshire reported it in 1977, such languages were thought not to exist."}, {"trivia": "パプアニューギニアのロトカス語は、中央方言の音素が11個しかなく、ラテン文字12字で書き表される。音素数の少なさで知られる。", "triviaEn": "Central Rotokas of Papua New Guinea has only 11 phonemes and is written with 12 Latin letters. It is known for its small inventory."}], "interdisciplinary:philosophy-language": [{"trivia": "クリプキの『名指しと必然性』は、1970年1月にプリンストン大学で行った3回の講義が元で、録音から起こして1972年に論文集に載り、1980年に単行本になった。", "triviaEn": "Kripke's Naming and Necessity comes from three lectures at Princeton in January 1970; transcribed from tape, it appeared in a 1972 volume and as a separate book in 1980."}, {"trivia": "オースティンの『言語と行為』は、1955年にハーバード大学で行ったウィリアム・ジェイムズ講義が元で、没後の1962年に刊行された。", "triviaEn": "Austin's How to Do Things with Words grew out of the William James Lectures at Harvard in 1955 and was published after his death, in 1962."}, {"trivia": "『論理哲学論考』は1921年にドイツ語で発表され、翌1922年に英訳が出た。ラッセルが序文を寄せている。", "triviaEn": "The Tractatus appeared in German in 1921, and an English translation followed in 1922. Russell wrote an introduction."}, {"trivia": "クワインは『言葉と対象』で、未知の言語の話者が兎を見て「ガヴァガイ」と言う例を挙げ、その訳が一つに定まらないと論じた。", "triviaEn": "In Word and Object, Quine imagined a speaker of an unknown language saying 'gavagai' at a rabbit, and argued the translation cannot be fixed."}], "interdisciplinary:cognitive-ling": [{"trivia": "レイコフの著書『Women, Fire, and Dangerous Things』(1987年)の題は、オーストラリア先住民のディルバル語で女性・火・危険なものが同じ名詞類に入ることに由来する。", "triviaEn": "The title of Lakoff's 1987 book Women, Fire, and Dangerous Things comes from a noun class in Dyirbal, an Australian Aboriginal language, that groups women, fire and dangerous things."}, {"trivia": "ニューギニアのダニ族は基本色名を2つしか持たないが、ハイダー(のちのロッシュ)の1972年の実験では名のない典型的な色の方が覚えやすかった。後の追試で異論も出ている。", "triviaEn": "The Dani of New Guinea have only two basic color terms, yet in Heider's (later Rosch's) 1972 experiments unnamed focal colors were easier to remember; later replications have disputed this."}, {"trivia": "レイコフとジョンソンの『Metaphors We Live By』(1980年)は「議論は戦争だ」を例に挙げ、議論を踊りとみなす文化を想像してみせた。", "triviaEn": "Lakoff and Johnson's Metaphors We Live By (1980) takes ARGUMENT IS WAR as an example and imagines a culture that sees argument as a dance."}, {"trivia": "タルミーは移動の表現を比べ、英語は「run into」のように様態を動詞に、スペイン語は「entrar corriendo」のように経路を動詞に置く傾向があるとした。", "triviaEn": "Comparing motion expressions, Talmy noted that English tends to put manner in the verb (run into) and Spanish path in the verb (entrar corriendo)."}], "interdisciplinary:generative-grammar": [{"trivia": "チョムスキーは1959年、スキナーの『言語行動』の書評を学術誌Languageに発表し、行動主義による言語習得の説明を厳しく批判した。", "triviaEn": "In 1959 Chomsky published in the journal Language a review of Skinner's Verbal Behavior that sharply criticized the behaviorist account of language learning."}, {"trivia": "『統語構造論』(1957年)の例文「Colorless green ideas sleep furiously」は、文法的でも無意味になりうることを示し、文法と意味の区別を訴えた。", "triviaEn": "The sentence 'Colorless green ideas sleep furiously' in Syntactic Structures (1957) showed that a sentence can be grammatical yet meaningless, supporting a split between grammar and meaning."}, {"trivia": "ロスは1967年のMITの博士論文で、移動を妨げる構造を「島」と名づけ、のちの統語論で広く使われる用語になった。", "triviaEn": "In his 1967 MIT dissertation Ross named structures that block movement 'islands', a term later widely used in syntax."}, {"trivia": "チョムスキーの『The Logical Structure of Linguistic Theory』は1955年に書かれたが、一部が刊行されたのは1975年だった。", "triviaEn": "Chomsky's The Logical Structure of Linguistic Theory was written in 1955, but part of it was only published in 1975."}], "interdisciplinary:functional-ling": [{"trivia": "ハリデーは英国生まれだが、1940年代に中国で北京大学の羅常培や嶺南大学の王力に学び、のちケンブリッジで中国語学の博士号を取った。", "triviaEn": "Born in England, Halliday studied in China in the 1940s under Luo Changpei at Peking University and Wang Li at Lingnan University, then took a Cambridge doctorate in Chinese linguistics."}, {"trivia": "プラハ言語学サークルは1926年にマテジウスらが創設し、彼は既知情報と新情報による文の分け方を「機能的文展望」の名で論じた。", "triviaEn": "The Prague Linguistic Circle was founded in 1926 with Vilem Mathesius as its leading figure; he discussed the split of a sentence into given and new information as functional sentence perspective."}, {"trivia": "ハリデーは『Learning How to Mean』(1975年)で、自分の息子ナイジェルの言語発達を生後9か月ごろから追い、幼児の言葉の働きを記述した。", "triviaEn": "In Learning How to Mean (1975), Halliday followed his son Nigel's language development from about nine months and described the functions of a child's words."}, {"trivia": "マルティネは、言語が意味を持つ単位への分節と、意味を持たない音への分節という二重の分節からなると捉え、これを言語に固有の特徴とした。", "triviaEn": "Martinet saw language as built on double articulation, into meaningful units and into meaningless sounds, and took this as a distinctive feature of language."}], "interdisciplinary:discourse-analysis": [{"trivia": "「談話分析」の語を広めたのは1952年のハリスの論文で、意味を使わず形態素の分布だけで、つながった文章を形式的に分析する方法だった。", "triviaEn": "Zellig Harris's 1952 article 'Discourse Analysis' popularized the term; it was a formal method that analyzed connected text using only the distribution of morphemes, not their meanings."}, {"trivia": "ハリデーとハサンの『英語の結束性』(1976年)は、指示・代用・省略・接続・語彙的結束の5種類で、文章のつながりを整理した。", "triviaEn": "Halliday and Hasan's Cohesion in English (1976) sorted the ties within a text into five types: reference, substitution, ellipsis, conjunction and lexical cohesion."}, {"trivia": "ラボフは語りを引き出すため、命の危険を感じた経験の有無を尋ね、集めた語りから要約や評価などの構成要素を整理した。", "triviaEn": "To elicit narratives, Labov asked whether people had been in danger of death, and sorted the collected stories into parts such as abstract and evaluation."}, {"trivia": "ヴァン・デイクは『Poetics』『Text』『Discourse & Society』など、談話研究の学術誌をいくつも創刊し、分野の土台づくりを進めた。", "triviaEn": "Van Dijk founded several journals of discourse study, including Poetics, Text and Discourse & Society, helping build the field's base."}], "interdisciplinary:conversation-analysis": [{"trivia": "10言語の会話を比べた2009年の研究では、どの言語も発話の重なりを避けて順番の間を短く保ち、言語間の平均の差は250ミリ秒の範囲に収まった。", "triviaEn": "A 2009 study of ten languages found that all avoid overlapping talk and keep gaps between turns short; the languages' average gaps differed only within a 250 ms range."}, {"trivia": "聞き返しの「えっ?」に当たる語は、2013年の31言語の調査でどれも似た音をしており、母音は口の前の低い位置に集まっていた。", "triviaEn": "A 2013 study of 31 languages found a word like 'Huh?' in each, with similar sound and function; its vowel always fell in the low front area of the vowel space."}, {"trivia": "サックスは1963年にロサンゼルス自殺防止センターの研究員となり、そこで録音された電話相談の会話を分析の材料にした。", "triviaEn": "In 1963 Sacks became a fellow at the Los Angeles Suicide Prevention Center and used its recorded helpline calls as analytic material."}, {"trivia": "サックスは1975年に40歳で事故死したが、1964〜72年の講義の録音が書き起こされ、1992年に『会話についての講義』全2巻として刊行された。", "triviaEn": "Sacks died in a car accident in 1975 at 40; his 1964-72 lectures were transcribed and published in 1992 as the two-volume Lectures on Conversation."}], "interdisciplinary:stylistics": [{"trivia": "モステラーとウォレスは1963〜64年に、冠詞や前置詞などの機能語の頻度から、『ザ・フェデラリスト』の著者不明の12編はマディソンの作だと結論した。", "triviaEn": "In 1963-64 Mosteller and Wallace used the frequencies of function words such as articles and prepositions to conclude that Madison wrote all 12 disputed Federalist papers."}, {"trivia": "2013年、新人作家ガルブレイスの小説『カッコウの呼び声』は、語の長さや頻出語の分析でJ・K・ローリングの作と疑われ、本人が認めた。", "triviaEn": "In 2013, analysis of word length and frequent words pointed to J. K. Rowling as the true author of The Cuckoo's Calling, published under the name Robert Galbraith; she then confirmed it."}, {"trivia": "ヤコブソンは1960年発表の論文「言語学と詩学」で、1952年の米大統領選のスローガン「I like Ike」を、音の反復が働く例として挙げた。", "triviaEn": "In his 1960 paper 'Linguistics and Poetics' Jakobson cited the 1952 US election slogan 'I like Ike' as an example of sound repetition at work."}, {"trivia": "レーモン・クノーの『文体練習』(1947年)は、バスの中のごく些細な出来事を99通りの文体で書き直した作品である。", "triviaEn": "Raymond Queneau's Exercises in Style (1947) retells one trivial bus incident in 99 different styles."}], "interdisciplinary:semiotics": [{"trivia": "ソシュールの『一般言語学講義』(1916年)は、彼の死後に弟子のバイイとセシュエが受講生のノートから編集したもので、2人は講義に出ていなかった。", "triviaEn": "Saussure's Course in General Linguistics (1916) was compiled after his death from students' notes by Bally and Sechehaye, neither of whom had attended the lectures."}, {"trivia": "『薔薇の名前』(1980年)の作者エーコは、ボローニャ大学で記号学を教えた記号学者で、小説家としても世界的に知られた。", "triviaEn": "Umberto Eco, author of The Name of the Rose (1980), was a semiotician who taught semiotics at the University of Bologna as well as a world-famous novelist."}, {"trivia": "ソシュールは『一般言語学講義』で、記号を研究する将来の学問に「セミオロジー(記号学)」の名を与え、言語学はその一部になると述べた。", "triviaEn": "In the Course in General Linguistics Saussure named a future science of signs 'semiology' and said linguistics would be part of it."}, {"trivia": "ユクスキュルによると、マダニは酪酸の匂い、約37度の温もり、皮膚の感触という三つの手がかりで動き、これがマダニの環世界をなす。", "triviaEn": "Uexkull described the tick as acting on three cues, the smell of butyric acid, warmth near 37 degrees and the feel of skin, which form its Umwelt."}], "computational:corpus": [{"trivia": "ブラウン・コーパスは1961年に米国で出版された英文から、約2000語ずつの見本500点を集めて作られた。総語数は約101万語。", "triviaEn": "The Brown Corpus was built from 500 samples of about 2,000 words each, drawn from English prose published in the US in 1961, for roughly 1.01 million words."}, {"trivia": "ブラウン・コーパスで最も多い語 the は約7万回出現し、全体の約7%を占める。頻度が順位に反比例するジップの法則を示す例としてよく挙げられる。", "triviaEn": "In the Brown Corpus the commonest word, the, occurs about 70,000 times, roughly 7% of all words, and is a standard illustration of Zipf's law."}, {"trivia": "1987年刊行のコウビルド英英辞典は、バーミンガム大学のシンクレアらが集めた実際の用例に基づいて作られた、学習者向けの最初期の辞書として知られる。", "triviaEn": "The Collins COBUILD dictionary of 1987, built on real examples gathered by Sinclair's team at Birmingham, is known as a pioneering learners' dictionary."}, {"trivia": "2010年に公開されたGoogleブックスのNgramビューアは、デジタル化された書籍の語の頻度を年代別にグラフにでき、文化の変化を量的に調べる道具になった。", "triviaEn": "The Google Books Ngram Viewer, released in 2010, plots word frequencies by year from digitized books and became a tool for studying cultural change quantitatively."}], "computational:nlp": [{"trivia": "対話プログラムELIZAは1960年代半ばにMITで作られた。単純なキーワード照合なのに、利用者が理解や関心を読み取ってしまう「ELIZA効果」を生んだ。", "triviaEn": "ELIZA was written at MIT in the mid-1960s. Though it only matched keywords, users read understanding into it, giving rise to the so-called ELIZA effect."}, {"trivia": "2013年のミコロフらの論文は、単語ベクトルで king から man を引き woman を足すと queen に近い点になる、と報告して話題を集めた。", "triviaEn": "A 2013 paper by Mikolov and colleagues reported that in word vectors, king minus man plus woman lands close to queen, which drew wide attention."}, {"trivia": "2017年の論文「Attention Is All You Need」が示したTransformerは、再帰を使わず注意機構だけで系列を処理し、大規模言語モデルの基本構造になった。", "triviaEn": "The Transformer from the 2017 paper Attention Is All You Need processes sequences with attention alone, without recurrence, and became the basic architecture of today's large language models."}, {"trivia": "ウィノグラード・スキーマは、代名詞が何を指すかを常識で決める問題である。ヘクター・レベスクが2011年に提案し、言語理解の試験として使われた。", "triviaEn": "Winograd schemas are problems where common sense decides what a pronoun refers to; Hector Levesque proposed them in 2011 as a test of language understanding."}], "computational:speech-processing": [{"trivia": "1952年にベル研究所が作った音声認識装置Audreyが聞き分けられたのは数字の0から9だけで、実質的に開発者本人の声にしか使えなかった。", "triviaEn": "Audrey, a speech recognizer built at Bell Labs in 1952, could only recognize the digits 0 to 9, and in practice worked only for its developer's voice."}, {"trivia": "IBMのShoeboxは1962年のシアトル万博で披露され、0から9の数字と6つの演算命令の計16語を聞き分けて、加算機を動かした。", "triviaEn": "IBM's Shoebox, shown at the 1962 Seattle World's Fair, recognized 16 spoken words, the digits 0 to 9 plus six commands, and operated an adding machine."}, {"trivia": "1939年のニューヨーク万博でベル研究所が披露したVoderは、鍵盤と足ペダルを訓練された操作者が操り、人の声のような音を合成した。", "triviaEn": "The Voder shown by Bell Labs at the 1939 New York World's Fair was played by trained operators with keys and a foot pedal to synthesize voice-like sound."}, {"trivia": "1997年発売のDragon NaturallySpeakingは、単語の間に区切りの間を置かずに話せる連続音声の口述入力を、一般向けのパソコンソフトとして実現した。", "triviaEn": "Dragon NaturallySpeaking, released in 1997, brought dictation of continuous speech, without pauses between words, to ordinary consumers as PC software."}], "computational:mt": [{"trivia": "1954年1月のジョージタウン大学とIBMの公開実験では、60文余りのロシア語が英語に自動翻訳された。語彙は約250語、文法規則は6つだけだった。", "triviaEn": "In the January 1954 Georgetown-IBM demonstration, over sixty Russian sentences were translated automatically into English, using only about 250 words and six grammar rules."}, {"trivia": "1966年のALPAC報告は、機械翻訳は人手翻訳より遅く高くつくと評価した。これを機に米国政府の機械翻訳への資金が大きく減った。", "triviaEn": "The 1966 ALPAC report judged machine translation slower and costlier than human translation, and US government funding for the field then fell sharply."}, {"trivia": "1949年、ウォーレン・ウィーバーは暗号解読の発想を翻訳に応用する覚書を書いた。ロシア語を英語の暗号とみなす比喩で、機械翻訳研究の出発点の一つになった。", "triviaEn": "In 1949 Warren Weaver wrote a memorandum applying code-breaking ideas to translation, treating Russian as English in code, and it became one starting point of machine translation research."}, {"trivia": "Google翻訳は2006年に公開され、初期は統計的方式を軸とし、2016年にニューラル方式への移行を始めた。約10年で中身の方式が入れ替わったことになる。", "triviaEn": "Google Translate launched in 2006, initially centered on statistical methods, and began moving to a neural one in 2016, so its core method was replaced within about ten years."}], "computational:ir": [{"trivia": "検索の順位づけに使われるBM25は、ロンドンのシティ大学のOkapiシステムで生まれた。BMは Best Match の略とされ、25は式の通し番号とされる。", "triviaEn": "BM25 grew out of the Okapi system at City University London. BM is said to stand for Best Match, and the 25 is said to be a formula number in a series."}, {"trivia": "PageRankの名は、論文の著者の一人でGoogle共同創業者のラリー・ペイジに由来し、同時に「Webページ」にもかけた語呂合わせでもある。", "triviaEn": "The name PageRank comes from Larry Page, co-founder of Google, and is also a pun on 'web page'."}, {"trivia": "1958年、IBMのルーンは、語の出現頻度から重要な文を選んで抄録を自動で作る方法を論文で発表した。", "triviaEn": "In 1958 IBM's Luhn published a method that selects important sentences by word frequency to build abstracts automatically."}, {"trivia": "TRECは1992年に米国のNISTと国防高等研究計画局(DARPA)の支援で始まり、共通の課題と評価で検索システムを比べる場となった。", "triviaEn": "TREC began in 1992 with support from NIST and DARPA, and became a venue for comparing retrieval systems on shared tasks and evaluation."}], "computational:llm": [{"trivia": "Transformerは、2017年の論文「Attention Is All You Need」で提案された。著者は8人で、WMT 2014の英独翻訳でBLEU 28.4を報告した。", "triviaEn": "The Transformer was proposed in the 2017 paper 'Attention Is All You Need' by eight authors, which reported a BLEU score of 28.4 on WMT 2014 English-to-German."}, {"trivia": "2020年発表のGPT-3は、最大版でパラメータ数が約1750億あった。当時としては桁外れの規模で、大規模化の流れを決定づけた。", "triviaEn": "GPT-3, announced in 2020, had about 175 billion parameters in its largest version, an unusually large scale at the time that set the trend toward bigger models."}, {"trivia": "2018年のBERTは基本版で約1.1億、大型版で約3.4億のパラメータを持つ。現在の大規模言語モデルに比べると、ずっと小さい。", "triviaEn": "BERT in 2018 had about 110 million parameters in its base version and 340 million in the large one, far smaller than today's large models."}, {"trivia": "2022年のChinchillaは700億パラメータで約1.4兆トークンを学習し、2800億パラメータのGopherを上回った。データ量の重要性を示した。", "triviaEn": "In 2022 Chinchilla, with 70 billion parameters trained on about 1.4 trillion tokens, outperformed the 280-billion-parameter Gopher, showing the weight of data."}], "computational:knowledge-rep:ontology": [{"trivia": "Cycは1984年にダグラス・レナットがテキサス州オースティンのMCCで始めた。常識を一つずつ論理で書き込む、巨大な知識ベース兼オントロジーである。", "triviaEn": "Cyc was begun in 1984 by Douglas Lenat at MCC in Austin, Texas, as a huge knowledge base and ontology that writes common sense into logic piece by piece."}, {"trivia": "Cycを生んだMCCは、日本の第五世代コンピュータ計画に対抗するため、米国の企業が共同で設立した研究コンソーシアムである。", "triviaEn": "MCC, where Cyc began, was a research consortium formed by US companies to counter Japan's Fifth Generation Computer Project."}, {"trivia": "遺伝子オントロジー(GO)は2000年に論文で報告され、遺伝子の働きを細胞内の場所や過程などの共通語彙で記述できるようにした。", "triviaEn": "The Gene Ontology (GO) was reported in a 2000 paper and gave genes a shared vocabulary for function, cellular location and process."}, {"trivia": "「オントロジー」にあたるラテン語ontologiaは、1606年に出たロルハルトの著作に現れ、最初期の使用例とされる。当時は形而上学とほぼ同義だった。", "triviaEn": "The Latin ontologia appears in Lorhard's 1606 work, among the earliest uses; at that time it was nearly a synonym of metaphysics."}], "computational:knowledge-rep:knowledge-graph": [{"trivia": "Googleは2012年5月、「文字列ではなく、モノ」を掲げて知識グラフを発表した。当時の規模は5億以上の対象と35億以上の事実や関係だった。", "triviaEn": "In May 2012 Google announced its Knowledge Graph under the slogan 'things, not strings', with over 500 million objects and over 3.5 billion facts and relationships."}, {"trivia": "Googleの知識グラフの初期データは、Freebase、Wikipedia、CIAのWorld Factbookなどの公開情報から集められ、その後に大きく拡張された。", "triviaEn": "The Knowledge Graph's initial data came from public sources such as Freebase, Wikipedia, and the CIA World Factbook, and was then expanded at a much larger scale."}, {"trivia": "ウィキデータは2012年にウィキメディア・ドイツが始めた、誰でも編集できる共有の知識ベースで、ウィキペディアの各言語版から参照される。", "triviaEn": "Wikidata, started by Wikimedia Deutschland in 2012, is a shared knowledge base anyone can edit and that Wikipedia editions draw on."}, {"trivia": "DBpediaは2007年に公表され、ウィキペディアの記事の情報ボックスから事実を取り出して、リンクトデータとして公開した。", "triviaEn": "DBpedia was presented in 2007; it extracted facts from Wikipedia infoboxes and published them as Linked Data."}], "computational:knowledge-rep:rdf": [{"trivia": "RDFの最初のW3C勧告「Model and Syntax」は1999年2月に出た。RDFスキーマを含む一連の勧告は、2004年2月に改めてそろった。", "triviaEn": "The first W3C Recommendation for RDF, 'Model and Syntax', appeared in February 1999. A fuller suite of RDF Recommendations including RDF Schema followed in February 2004."}, {"trivia": "RDFのトリプルは、主語・述語・目的語のそれぞれをURIで名づけられる。そのため別々の組織が作ったデータでも、同じ対象を指して結びつけやすい。", "triviaEn": "Each part of an RDF triple can be named by a URI, so data from different organizations can point to the same thing and be linked easily."}, {"trivia": "RDF 1.1は2014年2月25日に勧告となった。同じ日に、TurtleやN-Triplesといった書式の仕様も勧告になった。", "triviaEn": "RDF 1.1 became a W3C Recommendation on 25 February 2014, together with format specifications such as Turtle and N-Triples."}, {"trivia": "メタデータ規格Dublin Coreの名は、1995年に最初の会合が開かれた米国オハイオ州ダブリンに由来する。RDFでもよく使われる。", "triviaEn": "The metadata standard Dublin Core is named after Dublin, Ohio, where its first meeting was held in 1995. It is widely used in RDF."}], "computational:knowledge-rep:owl": [{"trivia": "OWLは2004年2月10日にW3C勧告となった。その後に拡張されたOWL 2は、2009年10月27日に勧告された。", "triviaEn": "OWL became a W3C Recommendation on 10 February 2004. Its extension, OWL 2, was recommended on 27 October 2009."}, {"trivia": "OWLはRDFの上に載るWebオントロジー言語として設計され、2004年の最初の版では交換用の標準の書式としてRDF/XMLが使われた。", "triviaEn": "OWL was designed as a Web ontology language layered on RDF; in its first 2004 version, RDF/XML served as the standard exchange syntax."}, {"trivia": "2004年のOWLにはLite・DL・Fullの3種があった。OWL 2ではLiteの区分がなくなり、新たにEL・QL・RLの三つのプロファイルが定められた。", "triviaEn": "The 2004 OWL had three species: Lite, DL and Full. OWL 2 dropped the Lite division and defined three new profiles: EL, QL and RL."}, {"trivia": "OWLの前身は、米国DARPAの計画から生まれたDAMLと、欧州のOILを統合したDAML+OILである。W3CはこれをもとにOWLを策定した。", "triviaEn": "OWL's predecessor was DAML+OIL, merging DAML from a US DARPA program with the European OIL. The W3C built OWL on it."}], "computational:knowledge-rep:semantic-web": [{"trivia": "Schema.orgは2011年6月2日にGoogle、Bing、Yahoo!が共同で発表した。同年11月にはロシアのYandexも加わった。", "triviaEn": "Schema.org was announced on 2 June 2011 by Google, Bing, and Yahoo!, and Russia's Yandex joined in November of that year."}, {"trivia": "Schema.orgの語彙は、JSON-LD、RDFa、Microdataのどの書式でも書ける。検索エンジンごとに異なる記法が乱立する状況を避けるためだった。", "triviaEn": "Schema.org vocabulary can be written in JSON-LD, RDFa, or Microdata, which was meant to end the situation of each search engine backing its own markup."}, {"trivia": "Wikidataは2012年10月29日にウィキメディア・ドイツが始めた。データはCC0で公開され、SPARQLで問い合わせられる。", "triviaEn": "Wikidata was launched by Wikimedia Deutschland on 29 October 2012. Its data is released under CC0 and can be queried with SPARQL."}, {"trivia": "Googleは2012年5月に「ナレッジグラフ」を発表し、検索結果に事物の要約情報を直接示すようになった。", "triviaEn": "In May 2012 Google announced its Knowledge Graph, which began showing summary information about things directly in search results."}], "computational:knowledge-rep:reasoning": [{"trivia": "論理プログラミング言語Prologは、1972年にマルセイユでアラン・コルムロエらが開発した。名は「論理によるプログラミング」を意味するフランス語の略である。", "triviaEn": "The logic programming language Prolog was developed in Marseille in 1972 by Alain Colmerauer and colleagues. Its name abbreviates the French for 'programming in logic'."}, {"trivia": "Prologの名づけは、開発仲間フィリップ・ルーセルの妻ジャクリーヌの案だったと伝えられる。論理による推論を実用的な言語にした先駆けである。", "triviaEn": "The name Prolog is credited to Jacqueline, wife of co-developer Philippe Roussel. The language was a pioneer in making logical inference a practical programming tool."}, {"trivia": "1956年のLogic Theoristは、『プリンキピア・マテマティカ』第2章の最初の52定理のうち38を証明した。", "triviaEn": "In 1956 the Logic Theorist proved 38 of the first 52 theorems in chapter 2 of Principia Mathematica."}, {"trivia": "三段論法の型には、中世以来「バルバラ」「ケラレント」などの名があり、名前の母音が命題の種類を表す覚え方になっている。", "triviaEn": "Syllogism forms have carried names like Barbara and Celarent since medieval times; the vowels in each name encode the kinds of propositions."}], "social:sociolinguistics": [{"trivia": "ラボフは1962年、ニューヨークの百貨店3店で店員に4階の売り場を尋ね、fourth floorのrを発音する率を比べた。高級店ほどrが多かった。", "triviaEn": "In 1962 Labov asked staff in three New York department stores (Saks, Macy's, S. Klein) where a fourth-floor department was, and compared how often they pronounced the r in 'fourth floor'."}, {"trivia": "「社会言語学」という語は、1952年にハーバー・カリーが南部話法雑誌の論文で初めて使ったとされる。分野が確立する1960年代より前のことである。", "triviaEn": "The term 'sociolinguistics' is credited to Haver Currie, who used it in a 1952 paper in the Southern Speech Journal, well before the field was established in the 1960s."}, {"trivia": "ラボフは1961年からマーサズ・ヴィニヤード島で調べ、島への帰属意識が強い人ほどaiとawの出だしを中央寄りに発音すると示した。", "triviaEn": "Starting in 1961 Labov studied Martha's Vineyard and showed that the stronger a person's attachment to the island, the more centralized the start of ai and aw."}, {"trivia": "ミルロイはベルファストの労働者地区3か所で調べ、地域の人づきあいが濃い人ほど地元の発音を保つと示した。報告は1980年の著書である。", "triviaEn": "Milroy studied three working-class areas of Belfast and showed that people with dense local ties keep local pronunciation better. She reported it in her 1980 book."}], "social:anthro-ling": [{"trivia": "ベルリンとケイは1969年、98言語の基本色名を調べ、どの言語にも基本色名は2〜11個で、増える順序も決まっていると主張した。", "triviaEn": "In 1969 Berlin and Kay surveyed basic color terms in 98 languages and argued that every language has between 2 and 11 of them, added in a fixed order."}, {"trivia": "ウォーフは、ホピ語に時間を直接表す語や形がないと論じた。だが1983年、マロトキの大著『ホピの時間』が時間表現の実例を数百挙げて反論した。", "triviaEn": "Whorf argued that Hopi has no words or forms referring directly to time, but Ekkehart Malotki's 1983 book 'Hopi Time' countered with hundreds of examples of Hopi temporal expressions."}, {"trivia": "ボアズ編の『アメリカ・インディアン諸言語便覧』は第1巻が1911年に出た。序論はヨーロッパ語の文法を当てはめず、各言語の型で記述する方針を示した。", "triviaEn": "Boas's Handbook of American Indian Languages began with Volume 1 in 1911. Its introduction argued for describing each language in its own terms rather than by European grammar."}, {"trivia": "マリノフスキーは1923年、『意味の意味』の補論で、挨拶や世間話のように情報より人の結びつきを作る言葉を交感的言語使用と呼んだ。", "triviaEn": "In a 1923 supplement to The Meaning of Meaning, Malinowski called speech like greetings and small talk, which builds social bonds more than it conveys information, phatic communion."}], "social:dialectology": [{"trivia": "フランスの言語地図(1902〜1910年刊)の調査は、エドモンという一人の調査員が自転車で639地点を回って行った。質問は1,500項目を超えた。", "triviaEn": "For the Linguistic Atlas of France (published 1902-1910), a single fieldworker, Edmond Edmont, cycled to 639 localities; the questionnaire ran to over 1,500 items."}, {"trivia": "ヴェンカーはドイツ帝国各地の学校教師に、40の短い文を地元の言葉に書き直してもらい、5万通近い質問票を集めた。この40文はヴェンカー文と呼ばれる。", "triviaEn": "Georg Wenker had schoolteachers across the German Empire rewrite 40 short sentences in their local speech and gathered nearly 50,000 questionnaires; the sentences are called the Wenker sentences."}, {"trivia": "『日本言語地図』は国立国語研究所が1966年から1974年に全6巻で刊行した。285項目が300面の地図にまとめられている。", "triviaEn": "The Linguistic Atlas of Japan was issued by the National Language Research Institute in six volumes from 1966 to 1974, with 285 items shown on 300 maps."}, {"trivia": "イングランド方言調査は1950年代に313地点で行われた。伝統的な方言が残ると見て、話者は主に農村に住む高齢の男性だった。", "triviaEn": "The Survey of English Dialects covered 313 localities in the 1950s. Seeking traditional dialect, it relied mainly on elderly men living in rural areas."}], "theoretical:phonetics": [{"trivia": "国際音声学会は1886年にパリで、ポール・パシーら語学教師の小さな集まりとして始まった。最初の国際音声記号は1888年に出ている。", "triviaEn": "The International Phonetic Association began in Paris in 1886 as a small group of language teachers led by Paul Passy; the first IPA appeared in 1888."}, {"trivia": "1976年、マクガークとマクドナルドは Nature 誌で、映像の口の動きが聞こえる音を変えてしまう現象を報告した。今はマガーク効果と呼ばれる。", "triviaEn": "In 1976 McGurk and MacDonald reported in Nature that seen lip movements can change the sound heard. It is now called the McGurk effect."}, {"trivia": "英語では [ŋ] が語頭に立たないが、ベトナム語の姓 Nguyễn は語頭にこの音を持つ。語頭に立てるかは言語ごとに違う。", "triviaEn": "English never has [ŋ] at the start of a word, but the Vietnamese surname Nguyễn begins with it. Permitted positions differ by language."}, {"trivia": "英語の「チッチッ」という舌打ちの音は、歯の裏に舌先を付けて吸い込む歯音の吸着音で、IPAでは [ǀ] で表される。", "triviaEn": "The English tut-tut sound is a dental click, made by drawing in air with the tongue tip on the teeth; the IPA writes it [ǀ]."}], "theoretical:phonology": [{"trivia": "パプアニューギニアのロトカス語は、中央方言の音素が子音6つと母音5つの計11個で、世界でも最少級の音の体系とされる。", "triviaEn": "Rotokas of Papua New Guinea has, in its central dialect, six consonants and five vowels, 11 phonemes in all, one of the smallest sound systems known."}, {"trivia": "ウビフ語は80以上の子音を持つ一方、母音は2つ程度とされる。数え方には諸説ある。最後の話者は1992年に亡くなった。", "triviaEn": "Ubykh is usually said to have over 80 consonants but only about two vowels, though counts vary. Its last speaker died in 1992."}, {"trivia": "ハワイ語の文字は a e i o u h k l m n p w と声門閉鎖を表すオキナの13で、世界でも音の数が少ない言語の一つである。", "triviaEn": "Hawaiian is written with 13 letters, a e i o u h k l m n p w plus the okina for the glottal stop, among the smallest sound inventories."}, {"trivia": "「東京」は [toːkjoː] で音節は二つだが、日本語の単位である拍(モーラ)では四つに数える。俳句の音数も拍で数える。", "triviaEn": "Tokyo is two syllables, [toː] and [kjoː], but four morae, the unit Japanese counts. Haiku syllable counts are really mora counts."}], "theoretical:morphology": [{"trivia": "ドイツ語には牛肉表示の監督業務の委任を定めた州法の名で、ウムラウトを含め63文字の語があった。この法は2013年に廃止された。", "triviaEn": "German had a 63-letter word, counting umlauts, naming a state law on delegating beef-labeling oversight in Mecklenburg-Vorpommern. The law was repealed in 2013."}, {"trivia": "cranberry の cran- は単独では意味を持たない。このような拘束形態素は、例の語にちなみ「クランベリー形態素」と呼ばれる。", "triviaEn": "The cran- of cranberry has no independent meaning. Bound morphemes of this kind are called cranberry morphemes, after the textbook example."}, {"trivia": "antidisestablishmentarianism は anti-, dis-, establish など六つの部分に分けられ、28文字ある。", "triviaEn": "Antidisestablishmentarianism splits into six parts, among them anti-, dis- and establish. It has 28 letters."}, {"trivia": "ルイス・キャロルは1871年の『鏡の国のアリス』で、ハンプティ・ダンプティに slithy を lithe と slimy の混成と説明させ、かばん語の名を広めた。", "triviaEn": "In Through the Looking-Glass (1871), Lewis Carroll had Humpty Dumpty explain slithy as lithe plus slimy, popularizing the term portmanteau word."}], "theoretical:syntax": [{"trivia": "チョムスキーは1957年の『文法の構造』で、文法的だが無意味な例として「Colorless green ideas sleep furiously」を挙げた。", "triviaEn": "In Syntactic Structures (1957), Chomsky offered 'Colorless green ideas sleep furiously' as a grammatical sentence with no sensible meaning."}, {"trivia": "「Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo」は、都市名、動物、動詞「威圧する」の3用法で成り立つ8語の文である。", "triviaEn": "'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo' is a grammatical eight-word sentence using Buffalo as a city, buffalo as an animal and buffalo as a verb."}, {"trivia": "「The horse raced past the barn fell」は、1970年にベヴァーが示した袋小路文の代表例で、途中まで読むと動詞 raced を主文の述語と誤解する。", "triviaEn": "Bever's 1970 garden-path sentence The horse raced past the barn fell tempts readers to take raced as the main verb."}, {"trivia": "ブラジルのヒシュカリヤナ語は、目的語・動詞・主語の順が基本とされる。この型は1970年代の記述で知られるまで、ほぼ存在しないと見られていた。", "triviaEn": "Brazil's Hixkaryana has basic object-verb-subject order. Described in the 1970s, this type had been thought almost nonexistent."}], "theoretical:semantics": [{"trivia": "OED第3版の改訂で、動詞 run は645の語義を持つ単独で最大の項目になったと、編集者のジョン・シンプソンが述べている。", "triviaEn": "Editor John Simpson said that in the OED's third-edition revision the verb 'run' reached 645 senses, making it the largest single entry."}, {"trivia": "チョムスキーは1957年、「無色の緑の考えが猛烈に眠る」という文を挙げ、文法的でも意味が成り立たない文がありうると示した。", "triviaEn": "In 1957 Chomsky gave 'Colorless green ideas sleep furiously' to show that a sentence can be grammatical yet make no sense."}, {"trivia": "意味論(sémantique)という語は、フランスのブレアルが1883年に提案し、1897年の著書Essai de sémantiqueで広まった。", "triviaEn": "The word semantics (sémantique) was proposed by the Frenchman Bréal in 1883 and spread through his 1897 book Essai de sémantique."}, {"trivia": "タルスキは「『雪は白い』が真なのは、雪が白いとき、そしてそのときに限る」という形で、真理の定義の条件を示した。", "triviaEn": "Tarski stated the condition for a definition of truth in the form ''Snow is white' is true if and only if snow is white'."}], "theoretical:pragmatics": [{"trivia": "グライスの講義「論理と会話」は1967年にハーバード大学で行われた。量・質・関係・様態の4つの格率で知られる。", "triviaEn": "Grice delivered 'Logic and Conversation' at Harvard in 1967. It is known for four maxims: quantity, quality, relation and manner."}, {"trivia": "オースティンの『言語と行為』は、1955年のハーバード大学での講義を基に、彼の死後の1962年に出版された。", "triviaEn": "Austin's How to Do Things with Words was published in 1962, after his death in 1960, from his 1955 lectures at Harvard."}, {"trivia": "1938年、モリスは記号論を統語論・意味論・語用論の3部門に分け、語用論は記号とその使い手との関係を扱うとした。", "triviaEn": "In 1938 Morris divided semiotics into syntax, semantics and pragmatics, the last dealing with the relation of signs to their users."}, {"trivia": "ポライトネス理論はブラウンとレヴィンソンが1978年に発表し、1987年に単行本として刊行した。ゴフマンのフェイスの考えを土台にした。", "triviaEn": "Brown and Levinson presented politeness theory in 1978 and issued it as a book in 1987, building on Goffman's idea of face."}], "psycho:psycholinguistics": [{"trivia": "マガーク効果は、音は「ba」なのに唇の映像が「ga」だと、多くの人に「da」と聞こえる現象で、1976年に Nature で報告された。", "triviaEn": "The McGurk effect: audio 'ba' dubbed over lips saying 'ga' is often heard as 'da'. It was reported in Nature in 1976."}, {"trivia": "言い間違いのスプーナリズムの名は、オックスフォードのニュー・カレッジの学寮長スプーナーに由来するが、彼の作とされる例の多くは作り話とされる。", "triviaEn": "'Spoonerism' comes from W. A. Spooner of New College, Oxford, but many examples credited to him are thought to be apocryphal."}, {"trivia": "マコンキーとレイナーは1975年、視線に合わせて文字を変える窓移動法で、英語の読み手は注視点の右約14〜15文字、左約3〜4文字から情報を得ると示した。", "triviaEn": "In 1975 McConkie and Rayner used a moving-window method to show English readers take in information from about 14 to 15 characters right of fixation and 3 to 4 to the left."}, {"trivia": "マースレン=ウィルソンは1973年、耳にした言葉を約250ミリ秒の遅れで繰り返せる人がいると報告し、聞き取りが音声の終わりを待たずに進む証拠として論じた。", "triviaEn": "In 1973 Marslen-Wilson reported that some people can repeat speech with a lag of about 250 ms, which he took as evidence that comprehension does not wait for the end of the sound."}], "psycho:neurolinguistics": [{"trivia": "ブローカの有名な患者は「タン」としか言えないことから「タン」と呼ばれ、1861年4月に死去した。2013年に本名がルボルニュと特定された。", "triviaEn": "Broca's famous patient was nicknamed 'Tan' for the one syllable he could say. He died in April 1861 and was identified in 2013 as Louis Leborgne."}, {"trivia": "1980年にクタスとヒルヤードは「パンにソックスを塗った」のような文で、意味が不自然な語の約400ミリ秒後に大きな陰性の脳波が出るのを見つけた。", "triviaEn": "In 1980 Kutas and Hillyard found that a semantically odd word, as in 'spread the warm bread with socks', evokes a large negative wave about 400 ms later."}, {"trivia": "日本の和田淳は1949年に、頸動脈へ麻酔薬を注入して片方の大脳半球を一時的に止め、言語を担う側を調べる方法を報告した。のちに和田テストと呼ばれる。", "triviaEn": "In 1949 Juhn Wada of Japan reported injecting an anesthetic into a carotid artery to briefly silence one hemisphere and find the language side. It came to be called the Wada test."}, {"trivia": "ウェルニッケは1874年に感覚性失語を論じた著作を発表し、ブローカ野とは別の側頭葉に理解を担う部位があると主張した。伝導失語の存在も予測した。", "triviaEn": "In 1874 Wernicke published a work on sensory aphasia, arguing that comprehension rests in a temporal region apart from Broca's area. He also predicted conduction aphasia."}], "psycho:l1-acquisition": [{"trivia": "1970年に13歳で保護された少女ジーニーは、長く言葉に触れずに育った。語彙は増えたが、文法は十分に身につかなかったと報告されている。", "triviaEn": "Genie, found in 1970 at age 13 after years with almost no language exposure, built a large vocabulary but did not master grammar, researchers reported."}, {"trivia": "2009年の研究で、生後2〜5日の新生児の泣き声は、フランス語圏では上昇調、ドイツ語圏では下降調の傾向があり、母語の抑揚に似ていた。", "triviaEn": "A 2009 study of newborns aged 2 to 5 days found French babies' cries tended to rise and German babies' cries to fall, echoing each native language's melody."}, {"trivia": "1958年にジーン・バーコは、架空の鳥「wug」の絵を幼児に見せて複数形を答えさせた。幼児が「wugs」と言えたことは、語形の丸暗記ではなく規則を使う証拠になった。", "triviaEn": "In 1958 Jean Berko showed children a picture of an imaginary bird, a 'wug', and asked for the plural. Their answer 'wugs' showed they were applying a rule, not memorizing forms."}, {"trivia": "ワーカーとティーズは1984年に、英語圏の乳児はヒンディー語の音の違いを生後6〜8か月なら聞き分けるが、10〜12か月ではほぼ聞き分けないと報告した。", "triviaEn": "In 1984 Werker and Tees reported that English-learning infants discriminate Hindi sound contrasts at 6 to 8 months but mostly fail to by 10 to 12 months."}], "psycho:l2-acquisition": [{"trivia": "ジョンソンとニューポートは1989年に、3歳から39歳で米国に移住した中国語・韓国語話者46人の英文法判断を調べ、早く移住した人ほど成績が良かった。", "triviaEn": "In 1989 Johnson and Newport tested 46 Chinese and Korean speakers who arrived in the US between ages 3 and 39. Earlier arrivals did better on English grammar."}, {"trivia": "ハクタらは2003年に、1990年の米国国勢調査の約230万人分の移民のデータを分析し、英語力は年齢とともに徐々に下がり、臨界期のような断絶は見えなかった。", "triviaEn": "In 2003 Hakuta and colleagues analyzed 1990 US census data on about 2.3 million immigrants. English skill declined gradually with age, with no sharp break like a critical period."}, {"trivia": "1965年、カナダのケベック州セント・ランバートで、英語を話す幼稚園児がほぼ全てフランス語で教わる実験が始まり、のちのイマージョン教育の広がりにつながった。", "triviaEn": "In 1965 in St. Lambert, Quebec, an experiment began in which English-speaking kindergartners were taught almost entirely in French, leading to the spread of immersion education."}, {"trivia": "スウェインはカナダのイマージョン教育を観察し、聞いて分かる力が伸びても話す文法に誤りが残ることに注目して、1985年にアウトプット仮説を唱えた。", "triviaEn": "Observing Canadian immersion classes, Swain noted that grammatical errors remained in speaking even as comprehension grew, and proposed the output hypothesis in 1985."}]};
// 分野ごとの最近の動き（2023年以降）。出典は WebSearch の結果で確かめたもの
const FIELD_RECENT = {"theoretical:morphology": [{"y": "2023", "kind": "研究", "t": "ChatGPTのウグ・テスト検証", "tEn": "Testing ChatGPT's morphology with wug tests", "d": "Weissweilerらは2023年のEMNLPで、ChatGPTに英語・ドイツ語・タミル語・トルコ語のウグ・テストを課した。特に英語で専用システムに及ばないと報告した。", "dEn": "At EMNLP 2023, Weissweiler et al. gave ChatGPT wug tests in English, German, Tamil and Turkish, and reported that it falls well short of dedicated systems, especially in English.", "src": [{"title": "Counting the Bugs in ChatGPT's Wugs: A Multilingual Investigation into the Morphological Capabilities of a Large Language Model", "url": "https://arxiv.org/pdf/2310.15113"}, {"title": "2023.emnlp main.401", "url": "https://aclanthology.org/2023.emnlp-main.401"}]}, {"y": "2023", "kind": "出来事", "t": "形態屈折の共通課題2023", "tEn": "SIGMORPHON-UniMorph 2023 inflection shared task", "d": "ACL 2023(トロント)併設のSIGMORPHONで、9語族26言語の屈折生成を競う共通課題が行われた。評価は語彙素で分割し、未知語への一般化を測った。", "dEn": "At the SIGMORPHON workshop alongside ACL 2023, a shared task on inflection covered 26 languages from 9 families, with lemma-split data to test generalization to unseen lemmas.", "src": [{"title": "SIGMORPHON–UniMorph 2023 Shared Task 0: Typologically Diverse Morphological Inflection", "url": "https://aclanthology.org/2023.sigmorphon-1.13"}]}], "theoretical:phonetics": [{"y": "2023", "kind": "研究", "t": "自己教師あり音声モデルと調音", "tEn": "Speech SSL models infer articulatory kinematics", "d": "Choらは2023年10月公開の論文で、自己教師あり音声モデルが音声から調音運動を推定できると示した。単純な変換で話者や言語を越えて転用できるという。", "dEn": "Cho et al. (arXiv, Oct 2023) showed that self-supervised speech models can infer articulatory kinematics from audio, and that simple affine transformations transfer across speakers and languages.", "src": [{"title": "Self-Supervised Models of Speech Infer Universal Articulatory Kinematics", "url": "https://arxiv.org/abs/2310.10788v2"}]}], "theoretical:phonology": [{"y": "2024", "kind": "研究", "t": "LLMの音韻能力を測るPhonologyBench", "tEn": "PhonologyBench tests LLM phonological skills", "d": "Suvarnaらは2024年、大規模言語モデルの音韻能力を測る英語のベンチマークを発表した。書記素音素変換・音節数・脚韻語生成を扱い、音節数と脚韻で人に及ばなかった。", "dEn": "Suvarna et al. (2024) introduced PhonologyBench, an English benchmark of grapheme-to-phoneme conversion, syllable counting and rhyme generation; LLMs trailed humans on syllables and rhymes.", "src": [{"title": "PhonologyBench: Evaluating Phonological Skills of Large Language Models", "url": "https://arxiv.org/abs/2404.02456v2"}, {"title": "2024.knowllm 1.1", "url": "https://aclanthology.org/2024.knowllm-1.1"}]}], "theoretical:syntax": [{"y": "2024", "kind": "研究", "t": "不可能言語でLMの文法学習を検証", "tEn": "Impossible language models and syntax learning", "d": "Kalliniらは英語の語順などを人工的に崩した「不可能言語」でGPT-2を訓練し、英語より学習しにくいと示した。この論文はACL 2024の最優秀論文賞を受けた。", "dEn": "Kallini et al. trained GPT-2 on 'impossible languages' made by altering English word order, finding they were harder to learn than English. The paper won an ACL 2024 Best Paper Award.", "src": [{"title": "Mission: Impossible Language Models", "url": "https://arxiv.org/pdf/2401.06416"}, {"title": "Mission: Impossible Language Models", "url": "https://aclanthology.org/2024.acl-long.787"}]}], "interdisciplinary:cognitive-ling": [{"y": "2024", "kind": "研究", "t": "LLMで概念メタファーを検出", "tEn": "LLMs tested on conceptual metaphor identification", "d": "HickeらはLLMが概念メタファーを見つけて説明できるかを検証し、注釈指針に基づく新しいプロンプトで人間向け指針に従えると報告した。計算研究の道を開く成果で、発表は2024年の計算人文学会議。", "dEn": "Hicke and colleagues tested whether LLMs can identify and explain conceptual metaphors. Using a prompting method based on annotation guidelines, they found LLMs can follow human guidelines (CHR 2024).", "src": [{"title": "Science Is Exploration: Computational Frontiers for Conceptual Metaphor Theory", "url": "https://arxiv.org/abs/2410.08991v1"}]}, {"y": "2025", "kind": "研究", "t": "概念メタファー理論をLLMの促し方に応用", "tEn": "Conceptual Metaphor Theory used to prompt LLMs", "d": "Kramerは2025年2月、概念メタファー理論でプロンプトを構成する方法を提案した。Llama3.2など4モデルで比較し、推論の正確さや比喩の整合性が基準モデルを上回ったと報告している。", "dEn": "In February 2025 Kramer proposed structuring LLM prompts with Conceptual Metaphor Theory. Across four open models, CMT prompting beat baselines in reasoning accuracy and metaphorical coherence.", "src": [{"title": "Conceptual Metaphor Theory as a Prompting Paradigm for Large Language Models", "url": "https://arxiv.org/pdf/2502.01901"}]}], "interdisciplinary:discourse-analysis": [{"y": "2024", "kind": "研究", "t": "ChatGPTの談話解析能力を実証検証", "tEn": "Testing ChatGPT on dialogue discourse analysis", "d": "Fanらは対話の話題分割と談話構造解析でChatGPTを検証した。一般領域の話題構造は捉えるが専門領域では苦戦し、修辞構造は階層でなく線形に解析した。LREC-COLING 2024で発表。", "dEn": "Fan et al. evaluated ChatGPT on dialogue topic segmentation and discourse parsing. It handles general-domain topic structure but struggles in specific domains and parses rhetorical structure only linearly (LREC-COLING 2024).", "src": [{"title": "Uncovering the Potential of ChatGPT for Discourse Analysis in Dialogue: An Empirical Study", "url": "https://aclanthology.org/2024.lrec-main.1477"}]}, {"y": "2024", "kind": "研究", "t": "会話分析と対話AIの接点を論じる", "tEn": "Conversation analysis meets conversational AI", "d": "Stokoeらは2024年、学界と産業界の接点として会話分析と対話技術を論じる論文をDiscourse & Communication誌に発表した。キーワードにチャットボットとLLMを挙げる。", "dEn": "Stokoe and colleagues published a 2024 article in Discourse & Communication on common ground between conversation analysis and conversational technologies, with chatbots and LLMs among its keywords.", "src": [{"title": "Conversation analysis and conversational technologies: finding the common ground between academia and industry", "url": "https://researchonline.lse.ac.uk/id/eprint/123945"}]}], "interdisciplinary:functional-ling": [{"y": "2025", "kind": "出来事", "t": "ハリデー生誕100年の機能言語学会", "tEn": "Macau symposium marks Halliday's centenary", "d": "2025年4月、マカオで第30回機能言語学・談話分析シンポジウムが開かれ、ハリデー生誕100年を記念した。マーティンやマティスンらが登壇し、AIによる談話分析なども議論された。", "dEn": "In April 2025 the 30th Symposium on Functional Linguistics and Discourse Analysis in Macau marked 100 years since Halliday's birth. Speakers included Martin and Matthiessen; AI-driven discourse analysis was discussed.", "src": [{"title": "The 30th Symposium on Functional Linguistics and Discourse Analysis", "url": "https://fhss.cityu.edu.mo/en/news/572"}]}], "interdisciplinary:generative-grammar": [{"y": "2023", "kind": "研究", "t": "LLMは生得性の議論を覆すかをめぐる論争", "tEn": "Debate over LLMs and innateness in syntax", "d": "Piantadosiが大規模言語モデルは生成文法より優れた言語理論だと主張したのに対し、Katzirは2023年12月、モデルが12歳児の身につける統語制約を学べない点を挙げて反論した。", "dEn": "Piantadosi argued LLMs are better theories of language than generative linguistics. Katzir replied in December 2023, noting LLMs fail to acquire syntactic constraints that a 12-year-old has mastered.", "src": [{"title": "Why Large Language Models Are Poor Theories of Human Linguistic Cognition: A Reply to Piantadosi", "url": "https://bioling.psychopen.eu/index.php/bioling/article/view/13153"}]}], "interdisciplinary:conversation-analysis": [{"y": "2024", "kind": "研究", "t": "LLMは話す内容は分かるが間は苦手", "tEn": "LLMs know what to say but not when to speak", "d": "Umairらは会話中に話者交替が可能になる地点を参加者に判定させたデータを作り、LLMに予測させた。結果は人間を大きく下回り、会話のタイミング処理の限界が示された。", "dEn": "Umair and colleagues built a dataset of within-turn points where speakers may take a turn, labeled by participants, and tested LLMs. Performance was far below humans, showing limits in modeling conversational timing.", "src": [{"title": "Large Language Models Know What To Say But Not When To Speak", "url": "https://arxiv.org/pdf/2410.16044"}, {"title": "Large Language Models Know What To Say But Not When To Speak (Findings of EMNLP 2024)", "url": "https://preview.aclanthology.org/dashboard/2024.findings-emnlp.909"}]}, {"y": "2025", "kind": "資源", "t": "発話・ジェスチャー・視線の対話コーパス", "tEn": "ECOLANG: multimodal conversation corpus released", "d": "Scientific Data（2025年）でECOLANGコーパスが公開された。英語話者の大人と3〜4歳児や大人との半自然な会話を録画し、発話・身振り・物の操作・視線に注釈を付けている。", "dEn": "The ECOLANG corpus appeared in Scientific Data in 2025: audiovisual recordings of English-speaking adults talking semi-naturally with 3-4-year-old children or adults, annotated for speech, gesture, object manipulation and eye gaze.", "src": [{"title": "Scientific Data (Jan 2025)", "url": "https://doaj.org/article/08c716982263485bb9a4bfbc10e17081"}, {"title": "ECOLANG_Corpus", "url": "https://rdr.ucl.ac.uk/articles/dataset/ECOLANG_Corpus/28087613"}]}], "interdisciplinary:semiotics": [{"y": "2024", "kind": "研究", "t": "AI生成画像を視覚の文法で分析", "tEn": "Semiotic analysis of text-prompted AI-generated images", "d": "Ghazvinehは2024年、Language and Semiotic Studies誌で、文章の指示から作られたBing Image Creatorの画像の意味を、クレスとファン・レーウェンの視覚デザインの文法で分析した。", "dEn": "In Language and Semiotic Studies (2024), Ghazvineh analyzed the ideational meaning of images generated from text prompts by Bing Image Creator, using Kress and van Leeuwen's Grammar of Visual Design.", "src": [{"title": "Language and Semiotic Studies (Mar 2024)", "url": "https://doaj.org/article/ab283d03dcd244bd9b897f4f6ba42617"}, {"title": "An inter-semiotic analysis of ideational meaning in text-prompted AI-generated images (De Gruyter Brill)", "url": "https://www.degruyterbrill.com/document/doi/10.1515/lass-2023-0030/html?lang=en"}]}, {"y": "2024", "kind": "出来事", "t": "国際記号学会がワルシャワで世界大会", "tEn": "IASS/AIS 16th World Congress held in Warsaw", "d": "国際記号学会（IASS/AIS）の第16回世界大会が2024年9月1日から6日にかけてポーランドのワルシャワで開かれた。記号学者が世界から集まる学会の定期大会である。", "dEn": "The 16th World Congress of the International Association for Semiotic Studies (IASS/AIS) took place in Warsaw, Poland, from 1 to 6 September 2024, the association's regular worldwide gathering of semioticians.", "src": [{"title": "Sing and Realities, 16th World Congress of the IASS/AIS", "url": "https://site.unibo.it/cultup/it/agenda/sing-and-realities-16th-world-congress-of-the-iass-ais"}]}], "interdisciplinary:stylistics": [{"y": "2025", "kind": "研究", "t": "人間とAIの創作文を文体計量で比較", "tEn": "Stylometry separates human and AI creative writing", "d": "O'Sullivanは2025年、短編小説をバローズのデルタ法で比べ、人間の作品は散らばり、GPT-3.5・GPT-4・Llama 70bの出力はモデルごとに固まり、両者が区別できると報告した。", "dEn": "In 2025 O'Sullivan compared short stories with Burrows' Delta: human texts clustered loosely, while GPT-3.5, GPT-4 and Llama 70b outputs clustered tightly by model, remaining distinguishable from human writing.", "src": [{"title": "Stylometric comparisons of human versus AI-generated creative writing", "url": "https://research.ucc.ie/en/publications/stylometric-comparisons-of-human-versus-ai-generated-creative-wri/"}, {"title": "New study reveals that AI cannot fully write like a human", "url": "https://www.ucc.ie/en/news/2025/new-study-reveals-that-ai-cannot-fully-write-like-a-human.html"}]}, {"y": "2025", "kind": "研究", "t": "LLMは文学的な文体を見分けられるか", "tEn": "Probing LLMs' understanding of literary style", "d": "HickeとMimnoは2025年、Computational Humanities Research誌掲載の論文で、大規模言語モデルが非常に短い文章から作者とジャンルを見分けられるかを調べ、文体理解を探った。", "dEn": "In a 2025 Computational Humanities Research paper, Hicke and Mimno probed whether large language models can tell author and genre from very short passages, testing their grasp of literary style.", "src": [{"title": "Looking for the Inner Music: Probing LLMs' Understanding of Literary Style", "url": "https://arxiv.org/pdf/2502.03647"}]}], "historical:comparative-ling": [{"y": "2023", "kind": "研究", "t": "印欧語の系統樹と起源の再検討", "tEn": "New Indo-European tree and hybrid origin model", "d": "Heggartyらは現代109言語と歴史的52言語の語彙データに祖先を組み込んだベイズ系統解析を行い、根の年代を約8120年前と推定。起源は東の肥沃な三日月地帯とする混合説を示した。", "dEn": "Heggarty and colleagues ran ancestry-enabled Bayesian analysis on 109 modern and 52 historical languages, dating the root to about 8,120 years ago and proposing a hybrid origin model (Science, 2023).", "src": [{"title": "Date published:", "url": "https://uczelniabadawcza.amu.edu.pl/en/wiadomosci/biblioteka/language-trees-with-sampled-ancestors-support-a-hybrid-model-for-the-origin-of-indo-european-languages"}, {"title": "Paul Heggarty: A New Database, Family Tree and Origins Hypothesis for the Indo-European Language Family", "url": "https://www.gw.uni-jena.de/en/48774/guest-talk-paul-heggarty"}]}], "historical:historical-ling": [{"y": "2024", "kind": "出来事", "t": "古代言語の機械学習ワークショップ", "tEn": "First workshop on machine learning for ancient languages", "d": "2024年8月、バンコクで第1回「古代言語のための機械学習」ワークショップが開かれ、論文集が刊行された。古い文献の復元や解析に計算手法を使う研究が学会の場で扱われ始めた。", "dEn": "In August 2024 the first Workshop on Machine Learning for Ancient Languages was held in Bangkok and its proceedings were published, bringing computational work on ancient texts to a dedicated venue.", "src": [{"title": "proceedings of the 1st workshop on machine learning for ancient l", "url": "https://publires.unicatt.it/en/publications/proceedings-of-the-1st-workshop-on-machine-learning-for-ancient-l/"}]}], "theoretical:pragmatics": [{"y": "2025", "kind": "研究", "t": "大規模言語モデルと語用論の調査", "tEn": "ACL survey on pragmatics in the LLM era", "d": "Maらは2025年のACLで、語用論の能力を測るデータセットと評価法を整理した調査論文を発表した。含意や指示などの現象別に資源を分類し、英語中心である点などの課題を挙げた。", "dEn": "At ACL 2025, Ma et al. surveyed datasets and evaluation methods for pragmatic ability in language models, sorting resources by phenomenon such as implicature and noting gaps like English-centric data.", "src": [{"title": "Pragmatics in the Era of Large Language Models: A Survey on Datasets, Evaluation, Opportunities and Challenges", "url": "https://aclanthology.org/2025.acl-long.425"}]}], "theoretical:semantics": [{"y": "2024", "kind": "研究", "t": "語彙置換で意味変化を模擬し検証", "tEn": "Simulating semantic change via lexical replacements", "d": "Peritiらは対象語を関連度の異なる語に置き換えて意味変化を模擬する方法を提案し、2024年のACLで報告した。現代の言語モデルは意味が変化した語の文脈化が苦手だと論じた。", "dEn": "Periti et al. (ACL 2024) simulated semantic change by replacing target words with words of varying relatedness, arguing that modern language models struggle to contextualize words that have undergone change.", "src": [{"title": "Analyzing Semantic Change through Lexical Replacements", "url": "https://arxiv.org/html/2404.18570v1"}]}, {"y": "2024", "kind": "資源", "t": "OEWN 2024年版が公開", "tEn": "Open English WordNet 2024 edition released", "d": "無償の英語語彙意味網Open English WordNetの2024年版が11月1日に公開された。動詞の階層を新たに整え多くのリンクを追加し、性別を表す語の扱いも見直した。", "dEn": "The 2024 edition of Open English WordNet came out on 1 November 2024, adding a new verb hierarchy with many links and revising how gendered terms are handled.", "src": [{"title": "Open English Wordnet", "url": "https://en-word.net/downloads"}]}], "historical:typology": [{"y": "2025", "kind": "研究", "t": "言語の普遍性191件をベイズ法で検証", "tEn": "191 grammatical universals tested with Bayesian models", "d": "Verkerkらは2025年、Grambankを使い提案済みの文法的普遍性191件を検証した。系統と地理を考慮すると、支持されたのは約3分の1で、語順と階層構造に関するものが多かった。", "dEn": "In 2025 Verkerk and colleagues tested 191 proposed grammatical universals with Grambank, controlling for ancestry and geography. About a third were supported, mostly concerning word order and hierarchy.", "src": [{"title": "enduring constraints on grammar revealed by bayesian spatiophylogenetic analyses", "url": "https://sfb1102.uni-saarland.de/publication/enduring-constraints-on-grammar-revealed-by-bayesian-spatiophylogenetic-analyses/"}]}, {"y": "2023", "kind": "資源", "t": "類型論DB Grambankを計算言語学へ紹介", "tEn": "Grambank introduced for computational typology", "d": "Haynieらは2023年5月、SIGTYPワークショップで論文を発表し、195の特徴を2,467の言語変種についてコードした類型論データベースGrambankを、資源の乏しい言語の計算研究に使う資源として紹介した。", "dEn": "In May 2023 Haynie and colleagues presented Grambank, coding 195 features for 2,467 language varieties, at the SIGTYP workshop as a resource for computational research on under-resourced languages.", "src": [{"title": "Grambank’s Typological Advances Support Computational Research on Diverse Languages", "url": "https://simon.net.nz/articles/grambank-sigtyp/"}, {"title": "Hello Grambank! A new typological database of 2,467 language varieties", "url": "https://allthingslinguistic.com/post/721852714993270784"}]}], "social:anthro-ling": [{"y": "2024", "kind": "制度", "t": "ブラジルで先住民言語の記録資料を集約", "tEn": "Brazil project to gather Indigenous language records", "d": "UNESCOの先住民言語の10年の枠で、ブラジルでは2024〜2025年の事業として、国内にある先住民言語の記録資料を洗い出し、共同体が使える保管庫で利用できるようにする計画が進められた。", "dEn": "Under UNESCO's Decade of Indigenous Languages, a 2024-2025 project in Brazil aimed to identify all documentation on Indigenous languages and make it available in archives accessible to communities.", "src": [{"title": "Project ID 3210614061", "url": "https://core.unesco.org/en/project/3210614061"}]}], "social:dialectology": [{"y": "2023", "kind": "制度", "t": "チェコ全土で方言を50年ぶりに再調査", "tEn": "Czech nationwide dialect survey after 50 years", "d": "チェコでは2023〜2027年の計画「チェコ語アトラス2027」で、約50年ぶりに全国の方言を調べ直している。成果として、対話型の地図と地理データベースの公開が予定されている。", "dEn": "The Czech Language Atlas 2027 project (2023-2027) resurveys dialects nationwide about 50 years after the last survey, and plans interactive multimedia maps and a geodatabase.", "src": [{"title": "atlas ceskeho jazyka 2027 celouzemni vyzkum nareci ceskeho jazyka po 50 letech", "url": "https://www.geoinformatics.upol.cz/projekty/atlas-ceskeho-jazyka-2027-celouzemni-vyzkum-nareci-ceskeho-jazyka-po-50-letech/?lang=en"}]}, {"y": "2025", "kind": "研究", "t": "北米言語地図計画の歩みを概説する書", "tEn": "Overview of the North American Linguistic Atlas Project", "d": "2025年2月、ケンブリッジ大学出版局のElementsシリーズから、北米言語地図計画の方法と変遷を音声・文章・地図で示す『方言学と言語地図計画』が刊行された。", "dEn": "In February 2025 Cambridge University Press published the Element Dialectology and the Linguistic Atlas Project, tracing the project's methods and growth in North America through audio, text and maps.", "src": [{"title": "Dialectology and the Linguistic Atlas Project", "url": "https://www.cambridge.org/core/books/dialectology-and-the-linguistic-atlas-project/90D32D4FAC2E3CCC31780458F322833C"}]}], "social:sociolinguistics": [{"y": "2025", "kind": "研究", "t": "AIはドイツ語方言話者に偏見を示す", "tEn": "LLMs show bias against German dialect speakers", "d": "マインツ大学などの研究がEMNLP 2025で発表され、大規模言語モデル10種を標準ドイツ語と7方言で試験した。ほぼ全てで方言話者に固定観念が結びつき、方言と明示すると偏りが強まった。", "dEn": "A Mainz University study at EMNLP 2025 tested 10 large language models on standard German and seven dialects. Nearly all attached stereotypes to dialect speakers, and bias grew when texts were labelled as dialect.", "src": [{"title": "AI language models show bias against regional German dialects", "url": "https://press.uni-mainz.de/ai-language-models-show-bias-against-regional-german-dialects/"}]}, {"y": "2025", "kind": "研究", "t": "AI買い物助手が英語の方言で精度低下", "tEn": "Amazon's AI shopping assistant struggles with dialects", "d": "コーネル大学の研究は、AmazonのAI買い物助手Rufusが、アフリカ系アメリカ人英語など一部の英語方言、特に誤字を含む入力に曖昧で誤った応答をすると示し、2025年6月のFAccTで最優秀論文賞を得た。", "dEn": "A Cornell study audited Amazon's shopping assistant Rufus and found vague or wrong answers for some English dialects such as AAE, especially with typos. It won a Best Paper Award at FAccT in June 2025.", "src": [{"title": "Amazon’s AI assistant struggles with diverse dialects, study finds", "url": "https://news.cornell.edu/index%2Ephp/stories/2025/07/amazons-ai-assistant-struggles-diverse-dialects-study-finds"}]}], "psycho:l1-acquisition": [{"y": "2025", "kind": "研究", "t": "15か月児が見ない物の語を学ぶ", "tEn": "15-month-olds learn words for objects never seen", "d": "2025年4月、ノースウェスタン大学とハーバード大学の研究が報告。乳児134人の実験で、15か月児は聞いた言葉だけから未見の物の名を学べたが、12か月児は示さなかった。", "dEn": "An April 2025 Northwestern and Harvard study of 134 infants found that 15-month-olds could learn names of objects they had never seen from spoken language alone, while 12-month-olds did not show this.", "src": [{"title": "by 15 months infants begin to learn new words for objects even those theyve never seen", "url": "https://news.northwestern.edu/stories/2025/04/by-15-months-infants-begin-to-learn-new-words-for-objects-even-those-theyve-never-seen"}]}, {"y": "2023", "kind": "資源", "t": "BabyLM：子ども規模のデータで学習", "tEn": "BabyLM Challenge: training on child-scale data", "d": "2023年1月、子どもは1億語未満の入力で言語を獲得するという前提のもと、小規模データで言語モデルを訓練する共有課題BabyLMが始まった。2025年4月には成果報告の論文が公開された。", "dEn": "Launched in January 2023, the BabyLM Challenge asks teams to train language models on under 100 million words, the amount of input a child receives; a findings paper followed in April 2025.", "src": [{"title": "Call for Papers - The BabyLM Challenge: Sample-efficient pretraining", "url": "https://ar5iv.labs.arxiv.org/html/2301.11796"}, {"title": "huggingface.co", "url": "https://huggingface.co/papers/2504.08165"}]}], "psycho:l2-acquisition": [{"y": "2024", "kind": "研究", "t": "二言語話者の脳ネットワーク研究", "tEn": "Brain network efficiency in bilinguals", "d": "2024年10月、Communications Biologyに151人を対象とした研究が載った。二言語話者は脳ネットワークの全体効率が高く、第二言語の習得開始が早いほどその傾向が見られた。", "dEn": "An October 2024 Communications Biology study of 151 participants reported higher global brain-network efficiency in bilinguals, linked to an earlier age of second-language acquisition.", "src": [{"title": "Communications Biology (Oct 2024)", "url": "https://doaj.org/article/a0c0f2d2b6d94e8a82e686826665e742"}]}], "psycho:neurolinguistics": [{"y": "2023", "kind": "技術", "t": "脳インプラントで発話を文字化", "tEn": "Speech neuroprostheses decode attempted speech", "d": "2023年8月、Nature誌に二つの研究が載った。スタンフォード大のBCIはALS患者の発話の試みを毎分62語で文字化し、UCSFは脳表面の電極で毎分78語の中央値を示した。", "dEn": "In August 2023 Nature published two speech neuroprosthesis studies: a Stanford implant decoded attempted speech at 62 words per minute, and a UCSF system reached a median of 78 words per minute.", "src": [{"title": "decoding speech", "url": "https://www.brown.edu/news/2023-08-23/decoding-speech"}, {"title": "www.natureasia.com", "url": "https://www.natureasia.com/en/info/press-releases/detail/9440"}]}, {"y": "2025", "kind": "技術", "t": "脳信号をほぼ即時に音声へ変換", "tEn": "Near-real-time brain-to-voice synthesis", "d": "2025年3月、UCバークレーとUCSFがNature Neuroscienceで報告。AIモデルで脳信号を音声に近リアルタイムで合成する方式を示し、従来の約8秒の遅れを改善した。", "dEn": "In March 2025 UC Berkeley and UCSF reported in Nature Neuroscience an AI-based streaming method that synthesizes speech from brain signals in near-real time, improving on an earlier approach with an 8-second delay.", "src": [{"title": "From silence to sound (UC Berkeley Engineering)", "url": "https://engineering.berkeley.edu/news/2025/06/from-silence-to-sound/"}, {"title": "Brain-voice neuroprosthesis restores naturalistic speech", "url": "https://www.universityofcalifornia.edu/news/brain-voice-neuroprosthesis-restores-naturalistic-speech"}]}], "psycho:psycholinguistics": [{"y": "2024", "kind": "研究", "t": "ChatGPTは人の言語使用に似るか", "tEn": "Do large language models resemble humans in language use?", "d": "2024年のCMCLワークショップ論文が、事前登録した12の心理言語学実験でChatGPTとVicunaを検証。人間と同じ傾向をChatGPTは10実験、Vicunaは7実験で再現した。", "dEn": "A 2024 CMCL workshop paper ran 12 pre-registered psycholinguistic experiments on ChatGPT and Vicuna; ChatGPT replicated the human pattern in 10 and Vicuna in 7.", "src": [{"title": "2024.cmcl 1.4", "url": "https://aclanthology.org/2024.cmcl-1.4"}]}, {"y": "2025", "kind": "研究", "t": "大規模言語モデルの内部層と読み時間", "tEn": "LLM internal layers and human reading behavior", "d": "2025年のarXiv論文が、言語モデルの驚き度(サプライザル)は人の読み時間とずれることがあると報告。大きなモデルは最終層でなく内部の層を使うと人の読みをよく説明できる。", "dEn": "A 2025 arXiv paper found LM surprisal often deviates from human reading behavior, while larger models match human reading data better when their internal layers, not the final one, are used.", "src": [{"title": "Large Language Models Are Human-Like Internally", "url": "https://arxiv.org/pdf/2502.01615"}]}], "computational:corpus": [{"y": "2024", "kind": "資源", "t": "公有ドメイン中心のCommon Corpus公開", "tEn": "Common Corpus: open dataset for LLM pretraining released", "d": "Pleias等のチームが2024年3月、公有ドメインの文書を中心とする大規模な学習用データをHugging Faceで公開。のちの論文は著作権フリーか許諾の明確なデータ約2兆トークンと説明する。", "dEn": "In March 2024 a team including Pleias released a large dataset centered on public-domain texts on Hugging Face. A later paper describes about 2 trillion tokens of uncopyrighted or permissively licensed data.", "src": [{"title": "Common Corpus public domain data set released", "url": "https://openfuture.eu/note/common-corpus-public-domain-data-set-released/"}, {"title": "arxiv.org (Common Corpus: The Largest Collection of Ethical Data for LLM Pre-Training)", "url": "https://arxiv.org/pdf/2506.01732v1"}]}, {"y": "2025", "kind": "制度", "t": "EUがAI学習データの要約公開を義務化", "tEn": "EU AI Act requires public summaries of AI training content", "d": "EU AI法の汎用AIモデル向け義務が2025年8月2日に適用開始。欧州委員会は同年7月24日に、学習に使ったコンテンツの公開要約の様式を示した。コーパスの出所の説明責任が制度化された。", "dEn": "EU AI Act obligations for general-purpose AI models began applying on 2 August 2025. On 24 July 2025 the Commission published a template for the public summary of training content, formalizing accountability for data sources.", "src": [{"title": "EU AI Act News: Rules on General-Purpose AI Start Applying, Guidelines and Template for Summary of Training Data Finalized", "url": "https://www.mayerbrown.com/en/insights/publications/2025/08/eu-ai-act-news-rules-on-general-purpose-ai-start-applying-guidelines-and-template-for-summary-of-training-data-finalized"}, {"title": "EU's General-Purpose AI Obligations Are Now in Force, With New Guidance", "url": "https://www.skadden.com/-/media/files/publications/2025/08/eus_generalpurpose_ai_obligations_are_now_in_force_with_new_guidance.pdf"}]}], "computational:mt": [{"y": "2024", "kind": "研究", "t": "WMT24でLLM翻訳を本格比較", "tEn": "WMT24 compares LLMs with MT systems at scale", "d": "機械翻訳の国際共有タスクWMT24は11言語対を対象に、LLM8種とオンライン翻訳4種の出力も評価に加えた。専門家による誤り区間注釈(ESA)で採点し、題名は「MTは未解決」と総括した。", "dEn": "The WMT24 shared task covered 11 language pairs and also evaluated outputs of eight LLMs and four online services. Professional annotators scored them with Error Span Annotations; the paper is titled 'MT Is Not Solved Yet'.", "src": [{"title": "Findings of the WMT24 General Machine Translation Shared Task: The LLM Era is Here but MT is Not Solved Yet", "url": "https://aclanthology.org/2024.wmt-1.1"}, {"title": "Findings of the WMT24 General Machine Translation Shared Task: The LLM Era is Here but MT is Not Solved Yet", "url": "https://research.google/pubs/findings-of-the-wmt24-general-machine-translation-shared-task-the-llm-era-is-here-but-mt-is-not-solved-yet/"}]}, {"y": "2025", "kind": "研究", "t": "Seamless音声翻訳がNature掲載", "tEn": "Meta's Seamless speech-text translation published in Nature", "d": "MetaのSeamless Communicationチームが2025年1月、音声とテキストを1つのモデルで約100言語にわたり翻訳する研究をNature誌に発表。既存の段階式システムよりBLEUが高いと報告した。", "dEn": "In January 2025 Meta's Seamless Communication team published in Nature a single model translating speech and text across up to 100 languages, reporting higher BLEU than existing cascaded systems.", "src": [{"title": "Meta's new AI model can translate speech from more than 100 languages", "url": "https://www.technologyreview.com/2025/01/15/1109994/metas-new-ai-model-can-translate-speech-from-more-than-100-languages/"}, {"title": "Research press release (Nature Asia)", "url": "https://www.natureasia.com/ja-jp/nature/pr-highlights/15138"}]}], "computational:nlp": [{"y": "2024", "kind": "出来事", "t": "第2回BabyLMチャレンジの結果", "tEn": "Second BabyLM Challenge: learning from child-scale data", "d": "BabyLMは子どもが触れる量に近い1億語以下のデータで言語モデルを訓練して競う催し。2024年の第2回は31件の提出があり、因果型とマスク型を組み合わせた構造が他の手法を上回った。", "dEn": "BabyLM asks participants to train language models on 100 million words or fewer, near a child's exposure. The second round in 2024 drew 31 submissions, and a hybrid causal-masked architecture outperformed other approaches.", "src": [{"title": "Findings of the BabyLM Challenge: Sample-Efficient Pretraining on Developmentally Plausible Corpora", "url": "https://www.research-collection.ethz.ch/handle/20.500.11850/650680"}, {"title": "BabyLM Challenge (2024)", "url": "https://aclanthology.org/events/babylm-2024/"}]}, {"y": "2025", "kind": "資源", "t": "UD 2.17が186言語・339件に拡大", "tEn": "Universal Dependencies 2.17 reaches 186 languages", "d": "多言語の統語注釈資源Universal Dependenciesは2025年11月15日公開の2.17で、ツリーバンクが339件、言語が186に達した。2024年5月の2.14は283件・161言語で、1年半で大きく増えた。", "dEn": "Universal Dependencies release 2.17 (15 November 2025) lists 339 treebanks in 186 languages, up from 283 treebanks in 161 languages in release 2.14 (May 2024).", "src": [{"title": "Download UD treebanks", "url": "https://universaldependencies.org/download.html"}]}], "computational:speech-processing": [{"y": "2023", "kind": "技術", "t": "MetaがMMSで1100超の言語に対応", "tEn": "Meta's MMS extends speech tech to 1,100+ languages", "d": "Metaは2023年5月、1100以上の言語で音声認識と音声合成ができるMMSを公開。聖書朗読の音声と自己教師あり学習を使い、言語識別は4000以上の言語に対応。重みはCC-BY-NCで配布された。", "dEn": "In May 2023 Meta released MMS, covering speech recognition and synthesis in over 1,100 languages. It used Bible readings and self-supervised learning; language identification covers over 4,000 languages, under a CC-BY-NC license.", "src": [{"title": "Meta's new open source models speak more than 1,100 languages", "url": "https://the-decoder.com/metas-new-open-source-models-speak-more-than-1100-languages/"}, {"title": "meta open source speech ai models support over 1100 languages", "url": "https://www.artificialintelligence-news.com/news/meta-open-source-speech-ai-models-support-over-1100-languages/"}]}, {"y": "2024", "kind": "技術", "t": "Whisper large-v3-turbo公開", "tEn": "OpenAI releases Whisper large-v3-turbo", "d": "OpenAIは2024年、Whisperのデコーダ層を32から4に減らした高速版turboを公開。文字起こしのデータのみで追加訓練したため、翻訳モードの性能は下がった。コードと重みはMITライセンス。", "dEn": "In 2024 OpenAI released Whisper turbo, which cuts decoder layers from 32 to 4 and was fine-tuned on transcription data only, so translation quality dropped. Code and weights remain under the MIT license.", "src": [{"title": "`turbo` model release · openai/whisper · Discussion #2363", "url": "https://github.com/openai/whisper/discussions/2363"}, {"title": "whisper large v3 turbo model", "url": "https://simonwillison.net/2024/Oct/1/whisper-large-v3-turbo-model"}]}], "computational:ir": [{"y": "2024", "kind": "出来事", "t": "TREC 2024にRAGトラックが新設", "tEn": "TREC 2024 launches a Retrieval-Augmented Generation track", "d": "NISTのTREC 2024に、検索・拡張生成・RAG全体の3課題を持つRAGトラックが置かれた。MS MARCO V2.1の約1億1352万パッセージが対象で、RAGの共通評価基盤となった。", "dEn": "TREC 2024 ran a RAG track with three tasks: retrieval, augmented generation and full RAG, over the MS MARCO V2.1 segment collection of about 113.5 million passages.", "src": [{"title": "2024 RAG Search Track", "url": "https://trec.nist.gov/data/rag2024.html"}, {"title": "A Reusable RAG Framework and Baselines for TREC 2024 Retrieval-Augmented Generation Track", "url": "https://huggingface.co/papers/2406.16828.md"}, {"title": "A Large-Scale Study of Relevance Assessments with Large Language Models: An Initial Look", "url": "https://arxiv.org/pdf/2411.08275"}]}, {"y": "2025", "kind": "資源", "t": "多言語の埋め込み評価MMTEB公開", "tEn": "MMTEB: a massive multilingual embedding benchmark", "d": "ICLR 2025で発表されたMMTEBは、500超の評価課題を250以上の言語で集めた埋め込みモデル用ベンチマーク。公開モデルの最良はmultilingual-e5-large-instructだった。", "dEn": "MMTEB, presented at ICLR 2025, gathers 500+ evaluation tasks across 250+ languages for embedding models; the best public model was multilingual-e5-large-instruct (560M parameters).", "src": [{"title": "MMTEB: Massive Multilingual Text Embedding Benchmark", "url": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/fc0e3f908a2116ba529ad0a1530a3675-Abstract-Conference.html"}, {"title": "MMTEB (arXiv v4)", "url": "https://arxiv.org/pdf/2502.13595v4"}]}], "computational:knowledge-rep:knowledge-graph": [{"y": "2024", "kind": "研究", "t": "GraphRAGが知識グラフで全体要約へ", "tEn": "GraphRAG: knowledge graphs for query-focused summarization", "d": "Microsoft ResearchのEdgeらは、LLMで文書から実体と関係の知識グラフを作り、階層的なコミュニティ要約で全体に関わる質問に答えるGraphRAGを2024年に提案した。", "dEn": "Edge et al. at Microsoft Research proposed GraphRAG in 2024: an LLM builds an entity-relation knowledge graph, and hierarchical community summaries answer corpus-wide questions.", "src": [{"title": "From Local to Global: A GraphRAG Approach to Query-Focused Summarization", "url": "https://arxiv.org/html/2404.16130v2"}, {"title": "Implementing 'from local to global' GraphRAG with Neo4j and LangChain: Constructing the graph", "url": "https://neo4j.com/blog/developer/global-graphrag-neo4j-langchain/"}]}, {"y": "2025", "kind": "資源", "t": "Wikidata埋め込みプロジェクトが公開", "tEn": "Wikidata Embedding Project released to the public", "d": "Wikimedia Deutschlandは2025年10月、Wikidataの約1.2億項目を意味検索できるベクトルデータベースを公開した。MCPに対応し、AIが構造化データを直接参照できる。", "dEn": "In October 2025 Wikimedia Deutschland released a vector database over nearly 120 million Wikidata entries, searchable by meaning and supporting MCP for AI systems.", "src": [{"title": "New project makes Wikipedia data more accessible to AI", "url": "https://techcrunch.com/2025/10/01/new-project-makes-wikipedia-data-more-accessible-to-ai"}, {"title": "Wikidata Launches Free Vector Database as Open Alternative to Closed AI Systems", "url": "https://itsfoss.com/news/wikidata-launches-vector-database/"}]}], "computational:knowledge-rep:ontology": [{"y": "2024", "kind": "出来事", "t": "LLMによるオントロジー学習の初の競技", "tEn": "First LLMs4OL challenge on ontology learning", "d": "ISWC 2024（米ボルチモア）で第1回LLMs4OLチャレンジが開かれた。語の型付け、分類体系の発見、非分類的関係の抽出の3課題でLLMの力量を競った。", "dEn": "The first LLMs4OL challenge ran at ISWC 2024 in Baltimore, testing LLMs on term typing, taxonomy discovery and non-taxonomic relation extraction.", "src": [{"title": "LLMs4OL 2024 Overview: The 1st Large Language Models for Ontology Learning Challenge", "url": "https://arxiv.org/pdf/2409.10146"}, {"title": "LLMs4OL: Large Language Models for Ontology Learning", "url": "https://sites.google.com/view/llms4ol2024"}]}, {"y": "2025", "kind": "資源", "t": "遺伝子オントロジーの2026年版論文", "tEn": "Gene Ontology knowledgebase in 2026 paper published", "d": "Gene Ontology Consortiumは2025年12月、Nucleic Acids Research誌に3年分の更新を報告した。代謝や宿主と病原体の相互作用などの項目を改訂し、GO-CAMの経路モデルは1500超とした。", "dEn": "In December 2025 the Gene Ontology Consortium reported three years of updates in Nucleic Acids Research, revising metabolism and host-pathogen terms; GO-CAM models exceed 1,500.", "src": [{"title": "The Gene Ontology knowledgebase in 2026", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12807639/"}, {"title": "New GO Paper is out! \"The Gene Ontology knowledgebase in 2026\"", "url": "https://community.alliancegenome.org/t/new-go-paper-is-out-the-gene-ontology-knowledgebase-in-2026/8579"}]}], "computational:llm": [{"y": "2025", "kind": "研究", "t": "DeepSeek-R1がNature誌に掲載", "tEn": "DeepSeek-R1 published in Nature", "d": "DeepSeek-R1の論文が2025年9月17日にNature誌へ載った。人手の推論例を使わず強化学習だけで推論力を引き出せると示し、査読を経た形で手法が公開された。", "dEn": "The DeepSeek-R1 paper appeared in Nature on 17 September 2025, showing that reasoning in LLMs can be incentivized by reinforcement learning without human-written demonstrations.", "src": [{"title": "DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning", "url": "https://www.nature.com/nature-index/article/10.1038/s41586-025-09422-z"}, {"title": "DeepSeek-R1 (arXiv 2501.12948)", "url": "https://arxiv.org/abs/2501.12948"}]}], "computational:knowledge-rep:owl": [{"y": "2024", "kind": "研究", "t": "LLMによるOWL作成を学生と比較", "tEn": "ESWC 2024 study: LLMs generating OWL ontologies", "d": "リンシェーピング大学のSaeedizadeとBlomqvistは、ESWC 2024で要件からOWLオントロジーをLLMに直接生成させる研究を発表し、修士課程の学生の成果物と比較した。", "dEn": "At ESWC 2024, Saeedizade and Blomqvist (Linköping University) studied LLMs generating OWL ontologies directly from requirements, comparing outputs with master's students' submissions.", "src": [{"title": "eswc-conferences.org", "url": "https://2024.eswc-conferences.org/wp-content/uploads/2024/04/146640137.pdf"}, {"title": "Supplementary materials for the paper:", "url": "https://github.com/LiUSemWeb/LLMs4OntologyDev-ESWC2024"}]}, {"y": "2025", "kind": "研究", "t": "能力質問からOWLを作るOntogenia", "tEn": "Ontology Generation using LLMs (Ontogenia)", "d": "2025年のarXiv論文は、能力質問とユーザーストーリーからOWLオントロジーを作る手法Ontogeniaを提案した。10個のオントロジーで試し、o1-previewで実用的な品質を報告した。", "dEn": "A 2025 arXiv paper proposed Ontogenia, a prompting method for drafting OWL ontologies from competency questions and user stories; with o1-preview it reported quality meeting engineers' requirements.", "src": [{"title": "Ontology Generation using Large Language Models", "url": "https://arxiv.org/pdf/2503.05388"}]}], "computational:knowledge-rep:rdf": [{"y": "2026", "kind": "制度", "t": "RDF 1.2が候補勧告に進む", "tEn": "RDF 1.2 Concepts reaches Candidate Recommendation", "d": "W3Cは2026年4月7日にRDF 1.2 Concepts and Abstract Data Modelの候補勧告スナップショットを公開した。トリプルを目的語に置けるトリプル項や方向付き言語タグ文字列を導入する。", "dEn": "On 7 April 2026 W3C published a Candidate Recommendation snapshot of RDF 1.2 Concepts, adding triple terms usable in object position and directional language-tagged strings.", "src": [{"title": "RDF 1.2 Concepts and Abstract Data Model", "url": "https://www.w3.org/TR/2026/CR-rdf12-concepts-20260407/"}, {"title": "W3C Invites Implementations of RDF 1.2 Concepts and Abstract Data Model and RDF 1.2 Semantics", "url": "https://www.w3.org/news/2026/w3c-invites-implementations-of-rdf-1-2-concepts-and-abstract-data-model-and-rdf-1-2-semantics"}]}, {"y": "2026", "kind": "制度", "t": "SPARQL 1.2の作業草案が更新", "tEn": "SPARQL 1.2 Query Language drafts updated in 2026", "d": "W3Cは2026年1月から6月にかけてSPARQL 1.2 Query Languageの作業草案を繰り返し公開した。まだ候補勧告ではなく、最新の勧告は2013年のSPARQL 1.1のままである。", "dEn": "W3C repeatedly published Working Drafts of SPARQL 1.2 Query Language from January to June 2026; it is not yet a Candidate Recommendation and SPARQL 1.1 (2013) remains the latest Recommendation.", "src": [{"title": "SPARQL 1.2 Query Language", "url": "https://www.w3.org/TR/2026/WD-sparql12-query-20260612/"}, {"title": "SPARQL 1.2 Query Language", "url": "https://www.w3.org/TR/sparql12-query/"}]}], "computational:knowledge-rep:reasoning": [{"y": "2024", "kind": "技術", "t": "AlphaProofがIMO問題で銀相当", "tEn": "AlphaProof and AlphaGeometry 2 at IMO 2024", "d": "Google DeepMindのAlphaProofとAlphaGeometry 2は2024年のIMOの6問中4問を解き、42点中28点で銀メダル水準に達した。AlphaProofは形式言語Leanで証明を学習する。", "dEn": "Google DeepMind's AlphaProof and AlphaGeometry 2 solved four of six IMO 2024 problems, scoring 28 of 42 points, silver-medal standard; AlphaProof trains itself to prove statements in Lean.", "src": [{"title": "AI achieves silver-medal standard solving International Mathematical Olympiad problems", "url": "https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level"}]}, {"y": "2025", "kind": "出来事", "t": "自然言語推論でIMO金メダル水準", "tEn": "Gemini Deep Think reaches IMO 2025 gold standard", "d": "Google DeepMindのGemini Deep Thinkは2025年のIMOで6問中5問を解き、35点で金メダル水準になった。問題文から自然言語で直接証明し、IMO側が採点を認証した。", "dEn": "Google DeepMind's Gemini Deep Think solved five of six IMO 2025 problems for 35 points, gold-medal standard, proving directly in natural language from problem text; IMO coordinators certified the grading.", "src": [{"title": "advanced version of gemini with deep think officially achieves gold medal standard at the international mathematical olympiad", "url": "https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad"}]}], "computational:knowledge-rep:semantic-web": [{"y": "2024", "kind": "制度", "t": "W3CがSHACL 1.2のWG憲章案を提示", "tEn": "W3C Data Shapes WG charter proposed for SHACL 1.2", "d": "W3Cは2024年10月、データシェイプ作業部会の憲章案を示した。SHACLをRDF-starとSPARQL-starに対応させ、RDFとSPARQLの1.2版に合わせて更新することを主目的とする。", "dEn": "In October 2024 W3C proposed a Data Shapes Working Group charter aiming to give SHACL handling of RDF-star and SPARQL-star and update it in line with RDF and SPARQL 1.2.", "src": [{"title": "PROPOSED Data Shapes Working Group Charter", "url": "https://www.w3.org/2024/10/data-shapes.html"}]}], "applied:interpretation": [{"y": "2025", "kind": "技術", "t": "同時音声翻訳AIが声まで再現", "tEn": "End-to-end simultaneous speech translation, voice kept", "d": "ByteDanceのSeedチームは2025年7月、話者の声を保ったまま超低遅延で訳す、エンドツーエンドの同時音声翻訳モデルSeed-LiveInterpret 2.0の論文を公開した。", "dEn": "In July 2025, ByteDance's Seed team published Seed-LiveInterpret 2.0, an end-to-end simultaneous speech-to-speech model aiming at ultra-low latency with voice cloning.", "src": [{"title": "seed liveinterpret 2 0 end to end simultaneous speech to speech translation with your voice", "url": "https://seed.bytedance.com/en/public_papers/seed-liveinterpret-2-0-end-to-end-simultaneous-speech-to-speech-translation-with-your-voice"}]}, {"y": "2025", "kind": "技術", "t": "AirPodsにライブ翻訳機能", "tEn": "Apple adds Live Translation to AirPods", "d": "Appleは2025年後半のAirPods Pro 3の発表に合わせ、相手の発話を装着者の言語に訳して耳に届けるライブ翻訳を示した。相手が非対応でもiPhoneに訳文を表示できる。", "dEn": "With AirPods Pro 3 in the second half of 2025, Apple introduced Live Translation, which relays a speaker's words in the wearer's language; the iPhone can show translated text.", "src": [{"title": "airpods upgrade to include live translation", "url": "https://mobileworldlive.com/apple/airpods-upgrade-to-include-live-translation"}, {"title": "Apple's AirPods Update Brings Real-Time Translation To Everyday Conversations (Making Trips Abroad Easier)", "url": "https://www.islands.com/1983997/apple-intelligence-airpods-update-real-time-translation-everyday-conversations-trips-abroad-easier"}]}], "applied:language-education": [{"y": "2025", "kind": "研究", "t": "英国の語学教育でのAI利用調査", "tEn": "England's Language Trends 2025 survey covers AI use", "d": "英国の学校語学教育の年次調査Language Trends England 2025は、フランス語・ドイツ語・スペイン語の授業でのAI活用が小学校ではごく限られていると報告した。", "dEn": "The 2025 Language Trends England survey on school language teaching reported that use of AI in language lessons remains minimal in primary schools.", "src": [{"title": "language trends england 2025", "url": "https://www.britishcouncil.org/sites/default/files/language_trends_england_2025.pdf"}]}, {"y": "2026", "kind": "研究", "t": "外国語教育の生成AI研究を総覧", "tEn": "Scoping review: generative AI in language education", "d": "2023年から2026年1月までの32件の研究を整理したスコーピングレビュー。生成AIは個別指導役、会話相手、教師の授業準備の支援に使われ、教員の準備不足が課題とされた。", "dEn": "A scoping review of 32 studies from 2023 to January 2026 found generative AI used as tutor, conversation partner and lesson-planning aid, with uneven teacher preparedness a challenge.", "src": [{"title": "Generative AI in Foreign Language Education: A Scoping Review of Pedagogical Applications and Challenges", "url": "https://www.dliflc.edu/ojs/ALL/article/view/67"}]}], "applied:lexicography": [{"y": "2026", "kind": "出来事", "t": "メリアム・ウェブスター第12版", "tEn": "Merriam-Webster Collegiate Dictionary, 12th edition", "d": "メリアム・ウェブスターは2026年、約20年ぶりの新版となる『Collegiate Dictionary』第12版(紙の辞書)を刊行した。約5000語を追加し、rizzやdoggoなどが載る。", "dEn": "In 2026 Merriam-Webster issued the 12th edition of its Collegiate Dictionary, the first new print edition in over 20 years, with some 5,000 new words such as rizz and doggo.", "src": [{"title": "merriam websters collegiate dictionary twelfth edition", "url": "https://shop.merriam-webster.com/products/merriam-websters-collegiate-dictionary-twelfth-edition"}, {"title": "© 2026 WUSF", "url": "https://www.wusf.org/2026-01-02/merriam-websters-12th-edition-is-the-first-hardcover-in-more-than-two-decades"}]}, {"y": "2026", "kind": "資源", "t": "OEDが2026年3月に500語超を追加", "tEn": "OED adds over 500 entries in March 2026 update", "d": "オックスフォード英語辞典(OED)は2026年3月の更新で、doomscrollingやto touch grassなど500超の新しい語・句・語義を追加した。OEDは現在、四半期ごとに更新される。", "dEn": "The Oxford English Dictionary's March 2026 update added more than 500 new words, phrases and senses, including doomscrolling and to touch grass; the OED now updates quarterly.", "src": [{"title": "10 highlights from the March 2026 Oxford English Dictionary update", "url": "https://corp.oup.com/news/10-highlights-from-the-march-2026-oxford-english-dictionary-update/"}]}], "applied:translation": [{"y": "2024", "kind": "研究", "t": "200言語対応の機械翻訳をNature掲載", "tEn": "Nature paper: neural MT scaled to 200 languages", "d": "MetaのNLLBチームは2024年6月、資源の少ない言語を含む200言語を1つのモデルで扱う機械翻訳の論文をNatureに発表した。従来の最先端より平均でBLEUが44%向上した。", "dEn": "In June 2024 Meta's NLLB team published in Nature a single model translating 200 languages, including low-resource ones, with an average 44% BLEU gain over prior state of the art.", "src": [{"title": "Scaling neural machine translation to 200 languages", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11208141/"}, {"title": "2024 06 meta ai dozens resourced languages", "url": "https://techxplore.com/news/2024-06-meta-ai-dozens-resourced-languages.html"}]}, {"y": "2025", "kind": "研究", "t": "WMT25が翻訳評価の難度を問う", "tEn": "WMT25 findings: time to stop evaluating on easy test sets", "d": "機械翻訳の国際共同課題WMT25の総括は、30言語対で60システム(参加36、LLMやオンライン翻訳24)を評価し、易しいテスト集合での評価をやめる時期だと論じた。", "dEn": "The WMT25 general MT findings evaluated 60 systems (36 submitted, 24 LLMs and online engines) on 30 language pairs and argued it is time to stop evaluating on easy test sets.", "src": [{"title": "Findings of the WMT25 General Machine Translation Shared Task: Time to Stop Evaluating on Easy Test Sets", "url": "https://aclanthology.org/2025.wmt-1.22"}]}], "applied:forensic-ling": [{"y": "2025", "kind": "研究", "t": "生成AIが法言語学に突きつけた課題", "tEn": "LLMs challenge forensic linguistics' idiolect premise", "d": "2025年12月公開のレビュー論文は、大規模言語モデルが個人固有の文体という前提を揺るがすと論じ、AI文章検出器の誤判定や証拠能力の問題を指摘した。", "dEn": "A December 2025 review argues that large language models undermine the premise of a distinctive personal style, and flags false positives of AI-text detectors and admissibility concerns.", "src": [{"title": "Large Language Models and Forensic Linguistics: Navigating Opportunities and Threats in the Age of Generative AI", "url": "https://arxiv.org/html/2512.06922v1"}]}, {"y": "2025", "kind": "研究", "t": "ドイツ連邦刑事庁の声紋鑑定の報告枠組み", "tEn": "BKA plans verbal likelihood ratios for voice comparison", "d": "ドイツ連邦刑事庁(BKA)の音声鑑定部門が、結論を言葉の事後確率から言葉の尤度比で述べる方式へ移る計画を2025年の論文で報告し、関連母集団の定義を論点とした。", "dEn": "A 2025 paper reports the German BKA's planned shift from verbal posterior probabilities to verbal likelihood ratios in voice comparison, with the relevant population as a central issue.", "src": [{"title": "Toward shifting to a verbal likelihood ratio framework for forensic voice comparison at the BKA Text, Speech and Audio department. Part 1: relevant population", "url": "https://www.ebsco.com/articles/law/563cc3f7-f42f-53a9-a3ea-cb5b3ece4b4b/toward-shifting-to-a-verbal-likelihood-ratio-framework-for-forensic-voice-comparison-at-the-bka-text-speech-and-audio-department-part-1-relevant-population/"}]}], "applied:language-testing": [{"y": "2026", "kind": "制度", "t": "TOEFL iBTが1〜6段階の成績表示へ", "tEn": "TOEFL iBT moves to a 1-6 score scale in 2026", "d": "ETSは2026年1月21日から、TOEFL iBTの成績を0.5刻みの1〜6段階でCEFRに対応させて示す。ReadingとListeningは多段階の適応型になった。", "dEn": "From January 21, 2026, ETS reports TOEFL iBT scores on a 1-6 scale in half-point steps aligned to CEFR, and Reading and Listening became multistage adaptive.", "src": [{"title": "skip to main content skip to footer (ETS: TOEFL iBT scores)", "url": "https://www.ets.org/toefl/ibt/scores/understand"}]}, {"y": "2024", "kind": "制度", "t": "英検が2024年度に問題形式を一部刷新", "tEn": "Eiken renews its test format from fiscal 2024", "d": "日本英語検定協会は2024年度第1回から英検を一部刷新した。ライティングは準2級・3級でEメール問題、2級以上で要約問題が加わり、2題になった。", "dEn": "From the first 2024 administration, Eiken added an email-writing task for Grades Pre-2 and 3 and a summary task for Grade 2 and above, making writing two tasks.", "src": [{"title": "2024年度 実用英語技能検定(英検) 問題形式リニューアルサイト｜英検｜公益財団法人 日本英語検定協会", "url": "https://www.eiken.or.jp/eiken/2024renewal/"}]}], "applied:medical-business-ling": [{"y": "2024", "kind": "研究", "t": "医療でのAI翻訳を検証した系統的レビュー", "tEn": "Systematic review of AI translation in clinical care", "d": "2024年12月発表の系統的レビューは、診療でのAI翻訳を検討した。英語からの翻訳は精度83〜97.8%、英語への翻訳は36〜76%で、複雑な場面では通訳者が必要とした。", "dEn": "A December 2024 systematic review of AI in clinical translation found 83-97.8% accuracy from English but 36-76% into English, and concluded human interpreters remain needed for complex discussions.", "src": [{"title": "Artificial intelligence in clinical settings: a systematic review of its role in language translation and interpretation", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11729812/"}]}, {"y": "2026", "kind": "研究", "t": "AI通訳ツールと認定通訳者の比較研究", "tEn": "AI interpreter tool compared with certified interpreters", "d": "2026年のnpj Health Systems誌の模擬研究は、院内開発のAIツールLingualAIを認定通訳者と比べ、英語・スペイン語の耳鼻咽喉科の診察で品質が劣らないかを検証した。", "dEn": "A 2026 npj Health Systems simulation study compared the in-house AI tool LingualAI with certified interpreters in English-Spanish otolaryngology encounters, testing non-inferiority.", "src": [{"title": "Faculty, Staff and Student Publications (UTHealth Houston, LingualAI study)", "url": "https://digitalcommons.library.tmc.edu/uthshis_docs/837"}]}], "interdisciplinary:philosophy-language": [{"y": "2023", "kind": "研究", "t": "大規模言語モデルは意味を理解するか", "tEn": "Meaning and understanding in large language models", "d": "ハヴリークは2023年10月にarXivへ論文を投稿し、機械が自然言語の意味を理解しうるのかを、大規模言語モデルの成功を手がかりに哲学の観点から問うた。", "dEn": "In October 2023 Havlik posted an arXiv paper asking from a philosophical standpoint whether a machine can understand the meanings of natural language, given the success of large language models.", "src": [{"title": "Meaning and understanding in large language models", "url": "https://arxiv.org/abs/2310.17407v1"}]}, {"y": "2024", "kind": "研究", "t": "フレーゲとラッセルでLLMの意味論を検討", "tEn": "Frege and Russell applied to LLM semantics", "d": "シュレは2024年にIntellectica誌で、フレーゲとラッセルの古典的な意味論を用い、大規模言語モデルの語と文の意味論を検討した。論文は2025年にarXivにも掲載された。", "dEn": "Schule's 2024 Intellectica paper applies Frege's and Russell's classical theories to word- and sentence-level semantics of large language models; it was also posted to arXiv in 2025.", "src": [{"title": "On the Semantics of Large Language Models", "url": "https://arxiv.org/pdf/2507.05448"}]}]};

const AppContext = createContext({ lang: "ja", dark: false, t: (ja) => ja });

function FontStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      .lh-root {
        --lh-bg: #ffffff;
        --lh-text: #14213d;
        --lh-muted: #5F6B80;
        --lh-muted2: #64738E;
        --lh-border: #e7e9ee;
        --lh-border2: #e0e4eb;
        --lh-card: #ffffff;
        --lh-hover: #f7f9fc;
        --lh-soft: #fbfcfe;
        --lh-soft2: #f1f3f7;
        font-family: 'Inter', -apple-system, sans-serif;
        background: var(--lh-bg);
        color: var(--lh-text);
        min-height: 100%;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .lh-root.dark {
        --lh-bg: #10141d;
        --lh-text: #e7eaf1;
        --lh-muted: #93a0b8;
        --lh-muted2: #7c879c;
        --lh-border: #2a3142;
        --lh-border2: #333a4d;
        --lh-card: #171d29;
        --lh-hover: #1c2330;
        --lh-soft: #161b26;
        --lh-soft2: #1b2230;
      }
      .lh-serif {
        font-family: 'Fraunces', Georgia, serif;
      }
      .lh-input {
        background: var(--lh-card);
        color: var(--lh-text);
        border-color: var(--lh-border2);
      }
      .lh-input::placeholder {
        color: var(--lh-muted);
      }
    `}</style>
  );
}

/* ネイビー→スカイブルーのグラデーションを段階的に返す */
function accentColor(index, total) {
  const start = [11, 37, 69]; // #0B2545
  const end = [76, 139, 245]; // #4C8BF5
  const t = total <= 1 ? 0 : index / (total - 1);
  const rgb = start.map((s, i) => Math.round(s + (end[i] - s) * t));
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function Breadcrumb({ items, onNavigate }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 6,
        fontSize: 13,
        color: "var(--lh-muted)",
        marginBottom: 28,
      }}
    >
      {items.map((it, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <ChevronRight size={12} strokeWidth={1.5} />}
          {i < items.length - 1 ? (
            <button
              onClick={() => onNavigate(it.target)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "var(--lh-muted)",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {it.label}
            </button>
          ) : (
            <span style={{ color: "var(--lh-text)", fontWeight: 500 }}>{it.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

function IndexRow({ index, total, jaLabel, enLabel, meta, done, onClick, Icon, accuracy }) {
  const color = accentColor(index, total);
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 4px",
        borderBottom: "1px solid var(--lh-border)",
        background: "none",
        border: "none",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "var(--lh-border)",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--lh-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
    >
      <span
        style={{
          fontFamily: "Fraunces, serif",
          fontSize: 13,
          color: "var(--lh-muted2)",
          width: 28,
          flexShrink: 0,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {Icon && (
        <span style={{ flexShrink: 0, color, display: "flex" }}>
          <Icon size={20} strokeWidth={1.5} />
        </span>
      )}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          className="lh-serif"
          style={{
            display: "block",
            fontSize: 17,
            fontWeight: 500,
            color: "var(--lh-text)",
          }}
        >
          {jaLabel}
        </span>
        <span style={{ display: "block", fontSize: 12.5, color: "var(--lh-muted)", marginTop: 2 }}>
          {enLabel}
          {meta ? ` · ${meta}` : ""}
        </span>
        {typeof accuracy === "number" && (
          <span
            style={{
              display: "block",
              marginTop: 6,
              height: 4,
              borderRadius: 999,
              background: "var(--lh-border)",
              overflow: "hidden",
              maxWidth: 220,
            }}
          >
            <span
              style={{
                display: "block",
                height: "100%",
                width: `${Math.round(accuracy * 100)}%`,
                background: color,
                borderRadius: 999,
              }}
            />
          </span>
        )}
      </span>
      {done && (
        <span style={{ color, flexShrink: 0, display: "flex" }}>
          <Check size={16} strokeWidth={2} />
        </span>
      )}
      <ChevronRight size={16} strokeWidth={1.5} color="var(--lh-border2)" style={{ flexShrink: 0 }} />
    </button>
  );
}

function PlaceholderDetail({ ja, en, breadcrumbItems, onNavigate, onMarkDone, done }) {
  const { t } = useContext(AppContext);
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />
      <h1 className="lh-serif" style={{ fontSize: 30, fontWeight: 500, margin: 0 }}>
        {ja}
      </h1>
      <p style={{ fontSize: 14, color: "var(--lh-muted)", marginTop: 4, marginBottom: 32 }}>{en}</p>

      <div
        style={{
          border: "1px solid var(--lh-border)",
          borderRadius: 4,
          padding: "40px 28px",
          textAlign: "center",
          color: "var(--lh-muted)",
        }}
      >
        <Circle size={22} strokeWidth={1.2} style={{ margin: "0 auto 14px", display: "block" }} />
        <p style={{ fontSize: 14, margin: 0 }}>
          {t(
            "このセクションの詳細コンテンツ(クイズ・図解・比較表・用語集など)は",
            "Detailed content for this section (quiz, diagrams, comparison table, glossary) will be"
          )}
          <br />
          {t("今後の指示に基づいて追加されます。", "added based on future instructions.")}
        </p>
      </div>

      <button
        onClick={onMarkDone}
        style={{
          marginTop: 24,
          padding: "10px 20px",
          borderRadius: 4,
          border: "1px solid #0B2545",
          background: done ? "#0B2545" : "var(--lh-card)",
          color: done ? "#ffffff" : "#0B2545",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Check size={14} strokeWidth={2} />
        {done ? t("訪問済みとして記録済み", "Marked as visited") : t("訪問済みにする", "Mark as visited")}
      </button>
    </div>
  );
}

const CATEGORY_TABS = [
  { id: "fields", label: "分野", labelEn: "Fields" },
  { id: "compare", label: "比較表", labelEn: "Compare" },
  { id: "diagram", label: "図解", labelEn: "Diagrams" },
  { id: "confusion", label: "見極めポイント", labelEn: "Key Distinctions" },
  { id: "glossary", label: "用語集", labelEn: "Glossary" },
];

function CategoryTabBar({ active, onChange }) {
  const { lang } = useContext(AppContext);
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        marginBottom: 28,
        borderBottom: "1px solid var(--lh-border)",
      }}
    >
      {CATEGORY_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: "8px 14px 10px",
            background: "none",
            border: "none",
            borderBottom: active === tab.id ? "2px solid #0B2545" : "2px solid transparent",
            color: active === tab.id ? "#4C8BF5" : "var(--lh-muted)",
            fontSize: 13.5,
            fontWeight: active === tab.id ? 600 : 500,
            cursor: "pointer",
            marginBottom: -1,
          }}
        >
          {lang === "ja" ? tab.label : tab.labelEn}
        </button>
      ))}
    </div>
  );
}

const CATEGORY_THEME = {
  theoretical: { objectLabel: "分析単位", objectLabelEn: "Unit of Analysis", methodLabel: "代表的手法", methodLabelEn: "Key Method", diagram: "layers" },
  historical: { objectLabel: "研究対象", objectLabelEn: "Object of Study", methodLabel: "代表的手法", methodLabelEn: "Key Method", diagram: "timeline" },
  social: { objectLabel: "研究対象", objectLabelEn: "Object of Study", methodLabel: "研究アプローチ", methodLabelEn: "Research Approach", diagram: "network" },
  psycho: { objectLabel: "研究対象", objectLabelEn: "Object of Study", methodLabel: "主な研究手法", methodLabelEn: "Main Method", diagram: "radial" },
  computational: { objectLabel: "研究対象", objectLabelEn: "Object of Study", methodLabel: "主な手法", methodLabelEn: "Key Method", diagram: "pipeline" },
  applied: { objectLabel: "研究対象", objectLabelEn: "Object of Study", methodLabel: "実務での主なアプローチ", methodLabelEn: "Practical Approach", diagram: "radial" },
  interdisciplinary: { objectLabel: "研究対象", objectLabelEn: "Object of Study", methodLabel: "理論的アプローチ", methodLabelEn: "Theoretical Approach", diagram: "mesh" },
};

function CompareRow({ r, i, total, objectLabel, methodLabel, levelBadge }) {
  const fields = [
    { label: objectLabel, value: r.object },
    { label: methodLabel, value: r.method },
  ];
  const { t } = useContext(AppContext);
  if (r.model) fields.push({ label: t("代表的モデル・技術例", "Representative Models/Tech"), value: r.model });
  fields.push({ label: t("キーワード", "Keywords"), value: r.keywords });

  return (
    <div style={{ padding: "20px 4px", borderBottom: "1px solid var(--lh-border)" }}>
      <div
        className="lh-serif"
        style={{
          fontSize: 15.5,
          fontWeight: 500,
          color: accentColor(i, total),
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {levelBadge != null && (
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: "#ffffff",
              background: accentColor(i, total),
              borderRadius: 999,
              padding: "2px 8px",
              fontFamily: "Inter, sans-serif",
              flexShrink: 0,
            }}
          >
            Lv.{levelBadge}
          </span>
        )}
        {r.ja}
        <span style={{ fontSize: 12, color: "var(--lh-muted)", fontWeight: 400 }}>{r.en}</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px 28px",
        }}
      >
        {fields.map((f, idx) => (
          <div key={idx}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#0B2545", marginBottom: 3 }}>{f.label}</div>
            <div style={{ fontSize: 13, color: "var(--lh-text)", lineHeight: 1.6 }}>{f.value}</div>
          </div>
        ))}
      </div>

      {r.example && (
        <div
          style={{
            marginTop: 14,
            padding: "10px 14px",
            background: "var(--lh-hover)",
            borderRadius: 5,
            fontSize: 12.5,
            color: "var(--lh-text)",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "#4C8BF5" }}>{t("具体例", "Example")}: </strong>
          {r.example}
        </div>
      )}
    </div>
  );
}

function ComparisonTable({ cat }) {
  const { lang, t } = useContext(AppContext);
  const baseRows = COMPARE_DATA[cat.id] || [];
  const theme = CATEGORY_THEME[cat.id] || { objectLabel: "研究対象", methodLabel: "代表的手法" };
  const objectLabel = lang === "ja" ? theme.objectLabel : theme.objectLabelEn || theme.objectLabel;
  const methodLabel = lang === "ja" ? theme.methodLabel : theme.methodLabelEn || theme.methodLabel;
  const [query, setQuery] = useState("");
  const [sortAlpha, setSortAlpha] = useState(false);

  if (baseRows.length === 0) {
    return <p style={{ fontSize: 14, color: "var(--lh-muted)" }}>{t("比較表は準備中です。", "Comparison table coming soon.")}</p>;
  }

  const q = query.trim().toLowerCase();
  let rows = baseRows.map((r, origIndex) => ({ ...r, origIndex }));
  if (q) {
    rows = rows.filter((r) =>
      [r.ja, r.en, r.object, r.method, r.keywords, r.example, r.model].some(
        (v) => v && v.toLowerCase().includes(q)
      )
    );
  }
  if (sortAlpha) {
    rows = [...rows].sort((a, b) => a.ja.localeCompare(b.ja, "ja"));
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        <input
          className="lh-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t("分野名・キーワードで絞り込み", "Filter by name or keyword")} placeholder={t("分野名・キーワードで絞り込み", "Filter by name or keyword")}
          style={{
            flex: 1,
            minWidth: 160,
            boxSizing: "border-box",
            padding: "9px 12px",
            borderRadius: 6,
            border: "1px solid var(--lh-border2)",
            fontSize: 13,
            fontFamily: "Inter, sans-serif",
            outline: "none",
          }}
        />
        <button
          onClick={() => setSortAlpha((s) => !s)}
          style={{
            padding: "9px 14px",
            borderRadius: 6,
            border: sortAlpha ? "1px solid #0B2545" : "1px solid var(--lh-border2)",
            background: sortAlpha ? "#0B2545" : "var(--lh-card)",
            color: sortAlpha ? "#ffffff" : "var(--lh-text)",
            fontSize: 12.5,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {sortAlpha ? t("五十音順", "A–Z order") : t("既定の順", "Default order")}
        </button>
      </div>

      {rows.length === 0 ? (
        <p style={{ fontSize: 13.5, color: "var(--lh-muted)" }}>{t("該当する分野が見つかりません。", "No matching fields found.")}</p>
      ) : (
        rows.map((r) => (
          <CompareRow
            key={r.origIndex}
            r={r}
            i={r.origIndex}
            total={baseRows.length}
            objectLabel={objectLabel}
            methodLabel={methodLabel}
            levelBadge={cat.id === "theoretical" ? r.origIndex + 1 : null}
          />
        ))
      )}

      {cat.id === "computational" && !q && (
        <div style={{ marginTop: 28 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 11.5,
              letterSpacing: "0.06em",
              color: "#4C8BF5",
              background: "#eef3fd",
              borderRadius: 4,
              padding: "3px 10px",
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            {t("知識表現 サブ項目比較", "Knowledge Representation: Sub-topic Comparison")}
          </div>
          {KR_COMPARE_DATA.map((r, i) => (
            <CompareRow
              key={"kr-" + i}
              r={r}
              i={i}
              total={KR_COMPARE_DATA.length}
              objectLabel={t("研究対象", "Object of Study")}
              methodLabel={t("主な手法", "Key Method")}
              levelBadge={null}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ConfusionList({ cat }) {
  const { lang, t } = useContext(AppContext);
  const pairs = CONFUSION_DATA[cat.id] || [];
  if (pairs.length === 0) {
    return <p style={{ fontSize: 14, color: "var(--lh-muted)" }}>{t("見極めポイントは準備中です。", "Key distinctions coming soon.")}</p>;
  }
  return (
    <div>
      <p style={{ fontSize: 12.5, color: "var(--lh-muted2)", marginTop: 0, marginBottom: 18 }}>
        {t("混同しやすい概念のペアと、その違いをまとめました。", "Commonly confused concept pairs and how they differ.")}
      </p>
      {pairs.map((p, i) => (
        <div key={i} style={{ padding: "18px 4px", borderBottom: "1px solid var(--lh-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
            <span
              className="lh-serif"
              style={{
                fontSize: 14.5,
                fontWeight: 600,
                color: "#0B2545",
                background: "#eef3fd",
                borderRadius: 5,
                padding: "3px 10px",
              }}
            >
              {lang === "ja" ? p.a : p.aEn}
            </span>
            <span style={{ fontSize: 12, color: "var(--lh-muted2)" }}>vs</span>
            <span
              className="lh-serif"
              style={{
                fontSize: 14.5,
                fontWeight: 600,
                color: "#7a4a0b",
                background: "#fdf1de",
                borderRadius: 5,
                padding: "3px 10px",
              }}
            >
              {lang === "ja" ? p.b : p.bEn}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--lh-text)", lineHeight: 1.7 }}>
            {lang === "ja" ? p.note : p.noteEn}
          </div>
        </div>
      ))}
    </div>
  );
}

function GlossaryList({ cat }) {
  const { lang, t } = useContext(AppContext);
  const terms = GLOSSARY_DATA[cat.id] || [];
  const [query, setQuery] = useState("");
  if (terms.length === 0) {
    return <p style={{ fontSize: 14, color: "var(--lh-muted)" }}>{t("用語集は準備中です。", "Glossary coming soon.")}</p>;
  }
  const q = query.trim().toLowerCase();
  const filtered = q
    ? terms.filter(
        (term) =>
          term.ja.toLowerCase().includes(q) || term.en.toLowerCase().includes(q) || term.def.toLowerCase().includes(q)
      )
    : terms;
  return (
    <div>
      <div style={{ position: "relative", marginBottom: 16 }}>
        <input
          className="lh-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t("用語・英語名・説明で検索", "Search term, English name, or definition")} placeholder={t("用語・英語名・説明で検索", "Search term, English name, or definition")}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid var(--lh-border2)",
            fontSize: 13.5,
            fontFamily: "Inter, sans-serif",
            outline: "none",
          }}
        />
      </div>
      <p style={{ fontSize: 12, color: "var(--lh-muted2)", marginTop: 0, marginBottom: 10 }}>
        {q
          ? t(`${filtered.length}件ヒット / 全${terms.length}件`, `${filtered.length} of ${terms.length} matched`)
          : t(`全${terms.length}件`, `${terms.length} terms`)}
      </p>
      {filtered.length === 0 ? (
        <p style={{ fontSize: 14, color: "var(--lh-muted)" }}>{t("該当する用語が見つかりません。", "No matching terms found.")}</p>
      ) : (
        filtered.map((term, i) => (
          <div key={i} style={{ padding: "14px 4px", borderBottom: "1px solid var(--lh-border)" }}>
            <div className="lh-serif" style={{ fontSize: 14.5, fontWeight: 500 }}>
              {term.ja} <span style={{ fontSize: 12, color: "var(--lh-muted)", fontWeight: 400 }}>{term.en}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--lh-muted)", marginTop: 4, lineHeight: 1.6 }}>{lang === "en" && term.defEn ? term.defEn : term.def}</div>
          </div>
        ))
      )}
    </div>
  );
}

function truncateLabel(s, len) {
  return s.length > len ? s.slice(0, len - 1) + "…" : s;
}

function RadialDiagram({ cat, selected, onSelect }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 112;
  const nodeR = 36;
  const n = cat.fields.length;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
      {cat.fields.map((f, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const color = accentColor(i, n);
        return (
          <line
            key={f.id}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke={color}
            strokeWidth={selected === i ? 2 : 1}
            opacity={selected === i ? 0.9 : 0.5}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={42} fill="#0B2545" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#ffffff" fontFamily="Inter, sans-serif">
        {truncateLabel(cat.ja, 6)}
      </text>
      {cat.fields.map((f, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const color = accentColor(i, n);
        const isSel = selected === i;
        return (
          <g key={f.id + "-node"} onClick={() => onSelect(i)} style={{ cursor: "pointer" }}>
            <circle cx={x} cy={y} r={nodeR} fill={isSel ? color : "#ffffff"} stroke={color} strokeWidth={isSel ? 2.5 : 1.5} />
            <text
              x={x}
              y={y - 2}
              textAnchor="middle"
              fontSize="9.5"
              fill={isSel ? "#ffffff" : "#14213d"}
              fontFamily="Georgia, serif"
            >
              {truncateLabel(f.ja, 6)}
            </text>
            <text
              x={x}
              y={y + 11}
              textAnchor="middle"
              fontSize="7"
              fill={isSel ? "#eef3fd" : "#5F6B80"}
              fontFamily="Inter, sans-serif"
            >
              {truncateLabel(f.en, 14)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LayersDiagram({ cat, selected, onSelect }) {
  const width = 340;
  const rowH = 44;
  const gap = 8;
  const n = cat.fields.length;
  const height = n * (rowH + gap) + gap;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
      {cat.fields.map((f, i) => {
        const y = height - gap - (i + 1) * rowH - i * gap;
        const color = accentColor(i, n);
        const w = width - 24 - i * 16;
        const x = (width - w) / 2;
        const isSel = selected === i;
        return (
          <g key={f.id} onClick={() => onSelect(i)} style={{ cursor: "pointer" }}>
            <rect
              x={x}
              y={y}
              width={w}
              height={rowH}
              rx={6}
              fill={color}
              opacity={isSel ? 0.9 : 0.1}
              stroke={color}
              strokeWidth={isSel ? 2.2 : 1.3}
            />
            <text
              x={width / 2}
              y={y + rowH / 2 - 4}
              textAnchor="middle"
              fontSize="11.5"
              fill={isSel ? "#ffffff" : "#14213d"}
              fontFamily="Georgia, serif"
            >
              {f.ja}
            </text>
            <text
              x={width / 2}
              y={y + rowH / 2 + 12}
              textAnchor="middle"
              fontSize="7.5"
              fill={isSel ? "#eef3fd" : "#5F6B80"}
              fontFamily="Inter, sans-serif"
            >
              {f.en}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TimelineDiagram({ cat, selected, onSelect }) {
  const width = 360;
  const height = 170;
  const n = cat.fields.length;
  const marginX = 40;
  const y = height / 2;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
      <line x1={marginX} y1={y} x2={width - marginX} y2={y} stroke="#c2c9d6" strokeWidth="1.5" />
      {cat.fields.map((f, i) => {
        const x = marginX + (i * (width - 2 * marginX)) / (n - 1 || 1);
        const color = accentColor(i, n);
        const up = i % 2 === 0;
        const labelY = up ? y - 28 : y + 40;
        const lineY2 = up ? y - 14 : y + 14;
        const isSel = selected === i;
        return (
          <g key={f.id} onClick={() => onSelect(i)} style={{ cursor: "pointer" }}>
            <line x1={x} y1={y} x2={x} y2={lineY2} stroke={color} strokeWidth={isSel ? 2 : 1.2} />
            <circle cx={x} cy={y} r={isSel ? 9 : 7} fill={color} stroke={isSel ? "#0B2545" : "none"} strokeWidth="1.5" />
            <text
              x={x}
              y={labelY}
              textAnchor="middle"
              fontSize={isSel ? "11" : "10.5"}
              fontWeight={isSel ? "600" : "400"}
              fill="#14213d"
              fontFamily="Georgia, serif"
            >
              {truncateLabel(f.ja, 8)}
            </text>
            <text x={x} y={labelY + 12} textAnchor="middle" fontSize="7.5" fill="#5F6B80" fontFamily="Inter, sans-serif">
              {truncateLabel(f.en, 13)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PipelineDiagram({ cat, selected, onSelect }) {
  const n = cat.fields.length;
  const cols = Math.min(n, 4);
  const rows = Math.ceil(n / cols);
  const boxW = 78;
  const boxH = 56;
  const gapX = 20;
  const gapY = 34;
  const width = cols * boxW + (cols - 1) * gapX + 20;
  const height = rows * boxH + (rows - 1) * gapY + 20;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: 440, display: "block", margin: "0 auto" }}>
      {cat.fields.map((f, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = 10 + col * (boxW + gapX);
        const y = 10 + row * (boxH + gapY);
        const color = accentColor(i, n);
        const isRowEnd = col === cols - 1 || i === n - 1;
        const isSel = selected === i;
        return (
          <g key={f.id} onClick={() => onSelect(i)} style={{ cursor: "pointer" }}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={6}
              fill={isSel ? color : "#ffffff"}
              stroke={color}
              strokeWidth={isSel ? 2.2 : 1.5}
            />
            <text
              x={x + boxW / 2}
              y={y + boxH / 2 - 2}
              textAnchor="middle"
              fontSize="9.5"
              fill={isSel ? "#ffffff" : "#14213d"}
              fontFamily="Georgia, serif"
            >
              {truncateLabel(f.ja, 6)}
            </text>
            <text
              x={x + boxW / 2}
              y={y + boxH / 2 + 13}
              textAnchor="middle"
              fontSize="6.8"
              fill={isSel ? "#eef3fd" : "#5F6B80"}
              fontFamily="Inter, sans-serif"
            >
              {truncateLabel(f.en, 12)}
            </text>
            {!isRowEnd && (
              <line x1={x + boxW} y1={y + boxH / 2} x2={x + boxW + gapX} y2={y + boxH / 2} stroke={color} strokeWidth="1.5" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function MeshDiagram({ cat, selected, onSelect }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 110;
  const nodeR = 32;
  const n = cat.fields.length;
  const pts = cat.fields.map((f, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return { f, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), color: accentColor(i, n) };
  });
  const lines = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const highlight = selected === i || selected === j;
      lines.push({ a: pts[i], b: pts[j], highlight });
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
      {lines.map((l, idx) => (
        <line
          key={idx}
          x1={l.a.x}
          y1={l.a.y}
          x2={l.b.x}
          y2={l.b.y}
          stroke={l.highlight ? "#4C8BF5" : "#c2c9d6"}
          strokeWidth={l.highlight ? 1.3 : 0.7}
          opacity={l.highlight ? 0.8 : 0.5}
        />
      ))}
      {pts.map((p, i) => {
        const isSel = selected === i;
        return (
          <g key={p.f.id} onClick={() => onSelect(i)} style={{ cursor: "pointer" }}>
            <circle cx={p.x} cy={p.y} r={nodeR} fill={isSel ? p.color : "#ffffff"} stroke={p.color} strokeWidth={isSel ? 2.2 : 1.5} />
            <text
              x={p.x}
              y={p.y - 2}
              textAnchor="middle"
              fontSize="9"
              fill={isSel ? "#ffffff" : "#14213d"}
              fontFamily="Georgia, serif"
            >
              {truncateLabel(p.f.ja, 6)}
            </text>
            <text
              x={p.x}
              y={p.y + 11}
              textAnchor="middle"
              fontSize="6.8"
              fill={isSel ? "#eef3fd" : "#5F6B80"}
              fontFamily="Inter, sans-serif"
            >
              {truncateLabel(p.f.en, 13)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CategoryDiagram({ cat }) {
  const { lang, t } = useContext(AppContext);
  const [selected, setSelected] = useState(0);
  const theme = CATEGORY_THEME[cat.id] || { diagram: "radial", objectLabel: "研究対象", methodLabel: "代表的手法" };
  const objectLabel = lang === "ja" ? theme.objectLabel : theme.objectLabelEn || theme.objectLabel;
  const methodLabel = lang === "ja" ? theme.methodLabel : theme.methodLabelEn || theme.methodLabel;
  const rows = COMPARE_DATA[cat.id] || [];
  const detail = rows[selected];

  const onSelect = (i) => setSelected(i === selected ? -1 : i);

  let DiagramEl;
  if (theme.diagram === "layers") DiagramEl = <LayersDiagram cat={cat} selected={selected} onSelect={onSelect} />;
  else if (theme.diagram === "timeline") DiagramEl = <TimelineDiagram cat={cat} selected={selected} onSelect={onSelect} />;
  else if (theme.diagram === "pipeline") DiagramEl = <PipelineDiagram cat={cat} selected={selected} onSelect={onSelect} />;
  else if (theme.diagram === "network" || theme.diagram === "mesh")
    DiagramEl = <MeshDiagram cat={cat} selected={selected} onSelect={onSelect} />;
  else DiagramEl = <RadialDiagram cat={cat} selected={selected} onSelect={onSelect} />;

  return (
    <div>
      <p style={{ fontSize: 12, color: "var(--lh-muted2)", textAlign: "center", marginTop: 0, marginBottom: 8 }}>
        {t("図形をクリックすると詳細が表示されます", "Click a shape to see details")}
      </p>
      {DiagramEl}
      <div
        style={{
          marginTop: 20,
          padding: "16px 18px",
          border: "1px solid var(--lh-border)",
          borderRadius: 6,
          background: "var(--lh-soft)",
          minHeight: 96,
        }}
      >
        {detail ? (
          <div>
            <div className="lh-serif" style={{ fontSize: 15, fontWeight: 500, color: "var(--lh-text)", marginBottom: 6 }}>
              {detail.ja} <span style={{ fontSize: 12, color: "var(--lh-muted)", fontWeight: 400 }}>{detail.en}</span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--lh-text)", lineHeight: 1.7 }}>
              <div>
                <strong style={{ color: "#0B2545" }}>{objectLabel}: </strong>
                {detail.object}
              </div>
              <div>
                <strong style={{ color: "#0B2545" }}>{methodLabel}: </strong>
                {detail.method}
              </div>
              {detail.model && (
                <div>
                  <strong style={{ color: "#0B2545" }}>{t("代表的モデル", "Key Models")}: </strong>
                  {detail.model}
                </div>
              )}
              {detail.example && (
                <div style={{ marginTop: 6, color: "#4C8BF5" }}>
                  <strong>{t("具体例", "Example")}: </strong>
                  {detail.example}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: "var(--lh-muted2)", margin: 0, textAlign: "center" }}>
            {t("上の図から分野を選んでください", "Select a field from the diagram above")}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   知識表現(computational:knowledge-rep)サブ項目専用の解説図
   ------------------------------------------------------------ */
function DiagramInfoBox({ text }) {
  return (
    <div
      style={{
        marginTop: 12,
        padding: "10px 14px",
        background: "#f7f9fc",
        borderRadius: 5,
        fontSize: 12,
        color: "#3c4a5e",
        lineHeight: 1.6,
        minHeight: 20,
      }}
    >
      {text || <span style={{ color: "#64738E" }}>図の要素をクリックすると説明が表示されます</span>}
    </div>
  );
}

function OntologyDiagram() {
  const [selected, setSelected] = useState(null);
  const nodes = [
    { id: "animal", ja: "動物", x: 170, y: 20, info: "最上位のクラス。下位クラス(哺乳類・鳥類)の性質を包含する一般概念。" },
    { id: "mammal", ja: "哺乳類", x: 90, y: 90, info: "「動物」のサブクラス(is-a関係)。恒温・胎生などの性質を持つ。" },
    { id: "bird", ja: "鳥類", x: 250, y: 90, info: "「動物」のサブクラス(is-a関係)。羽毛・卵生などの性質を持つ。" },
    { id: "dog", ja: "犬", x: 50, y: 160, info: "「哺乳類」のサブクラス。個体(例: ポチ)はこのクラスのインスタンスとなる。" },
    { id: "cat", ja: "猫", x: 130, y: 160, info: "「哺乳類」のサブクラス。個体(例: タマ)はこのクラスのインスタンスとなる。" },
  ];
  const edges = [
    ["animal", "mammal"],
    ["animal", "bird"],
    ["mammal", "dog"],
    ["mammal", "cat"],
  ];
  const find = (id) => nodes.find((n) => n.id === id);
  const sel = nodes.find((n) => n.id === selected);
  return (
    <div>
      <svg viewBox="0 0 340 200" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        {edges.map(([a, b], i) => {
          const A = find(a);
          const B = find(b);
          return <line key={i} x1={A.x} y1={A.y + 14} x2={B.x} y2={B.y - 14} stroke="#4C8BF5" strokeWidth="1.3" />;
        })}
        {nodes.map((n) => {
          const isSel = selected === n.id;
          return (
            <g key={n.id} onClick={() => setSelected(isSel ? null : n.id)} style={{ cursor: "pointer" }}>
              <rect
                x={n.x - 34}
                y={n.y - 14}
                width={68}
                height={28}
                rx={5}
                fill={isSel ? "#0B2545" : "#ffffff"}
                stroke="#0B2545"
                strokeWidth={isSel ? 2 : 1.3}
              />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10.5" fill={isSel ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
                {n.ja}
              </text>
            </g>
          );
        })}
        <text x={170} y="195" textAnchor="middle" fontSize="9" fill="#5F6B80" fontFamily="Inter, sans-serif">
          is-a 関係によるクラス階層の例(クリックして各クラスを確認)
        </text>
      </svg>
      <DiagramInfoBox text={sel && `${sel.ja}: ${sel.info}`} />
    </div>
  );
}

function KnowledgeGraphDiagram() {
  const [selected, setSelected] = useState(null);
  const nodes = [
    { id: "a", ja: "Anthropic", x: 60, y: 40, info: "Claudeを開発する組織。知識グラフ上ではエンティティ(実体)として表現される。" },
    { id: "b", ja: "Claude", x: 220, y: 40, info: "Anthropicが開発したAIアシスタント。「creates」関係でAnthropicと結ばれる。" },
    { id: "c", ja: "AIモデル", x: 280, y: 130, info: "Claudeが属する上位カテゴリ。「is_a」関係でClaudeと結ばれる。" },
    { id: "d", ja: "サンフランシスコ", x: 60, y: 150, info: "Anthropicの所在地。「located_in」関係でAnthropicと結ばれる。" },
  ];
  const edges = [
    ["a", "b", "creates"],
    ["b", "c", "is_a"],
    ["a", "d", "located_in"],
  ];
  const find = (id) => nodes.find((n) => n.id === id);
  const sel = nodes.find((n) => n.id === selected);
  return (
    <div>
      <svg viewBox="0 0 340 190" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        {edges.map(([a, b, label], i) => {
          const A = find(a);
          const B = find(b);
          const mx = (A.x + B.x) / 2;
          const my = (A.y + B.y) / 2;
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#4C8BF5" strokeWidth="1.3" />
              <rect x={mx - 24} y={my - 9} width={48} height={16} fill="#ffffff" />
              <text x={mx} y={my + 3} textAnchor="middle" fontSize="8" fill="#4C8BF5" fontFamily="Inter, sans-serif">
                {label}
              </text>
            </g>
          );
        })}
        {nodes.map((n) => {
          const isSel = selected === n.id;
          return (
            <g key={n.id} onClick={() => setSelected(isSel ? null : n.id)} style={{ cursor: "pointer" }}>
              <circle cx={n.x} cy={n.y} r={30} fill={isSel ? "#0B2545" : "#ffffff"} stroke="#0B2545" strokeWidth={isSel ? 2 : 1.3} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="9" fill={isSel ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
                {n.ja}
              </text>
            </g>
          );
        })}
      </svg>
      <DiagramInfoBox text={sel && `${sel.ja}: ${sel.info}`} />
    </div>
  );
}

function RDFDiagram() {
  const [selected, setSelected] = useState(null);
  const boxes = [
    { id: "s", ja: "主語", en: "Subject", ex: ":Claude", x: 30, info: "文の主体となるリソース。URIで一意に識別される(例: :Claude)。" },
    { id: "p", ja: "述語", en: "Predicate", ex: ":createdBy", x: 130, info: "主語と目的語の関係を表すプロパティ(例: :createdBy = 「作成者は」)。" },
    { id: "o", ja: "目的語", en: "Object", ex: ":Anthropic", x: 230, info: "関係の相手側となるリソースまたはリテラル値(例: :Anthropic)。" },
  ];
  const sel = boxes.find((b) => b.id === selected);
  return (
    <div>
      <svg viewBox="0 0 320 140" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        {boxes.map((b, i) => {
          const isSel = selected === b.id;
          return (
            <g key={i} onClick={() => setSelected(isSel ? null : b.id)} style={{ cursor: "pointer" }}>
              <rect
                x={b.x}
                y={40}
                width={80}
                height={50}
                rx={6}
                fill={isSel ? accentColor(i, 3) : "#ffffff"}
                stroke={accentColor(i, 3)}
                strokeWidth={isSel ? 2.2 : 1.5}
              />
              <text x={b.x + 40} y={62} textAnchor="middle" fontSize="10" fill={isSel ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
                {b.ja}
              </text>
              <text x={b.x + 40} y={78} textAnchor="middle" fontSize="8.5" fill={isSel ? "#eef3fd" : "#4C8BF5"} fontFamily="Inter, sans-serif">
                {b.ex}
              </text>
              {i < boxes.length - 1 && (
                <line x1={b.x + 80} y1={65} x2={boxes[i + 1].x} y2={65} stroke="#c2c9d6" strokeWidth="1.3" />
              )}
            </g>
          );
        })}
        <text x={160} y="115" textAnchor="middle" fontSize="9" fill="#5F6B80" fontFamily="Inter, sans-serif">
          RDF(Resource Description Framework)トリプルの基本構造
        </text>
      </svg>
      <DiagramInfoBox text={sel && `${sel.ja}(${sel.en}): ${sel.info}`} />
    </div>
  );
}

function OWLDiagram() {
  const [selected, setSelected] = useState(null);
  const parts = {
    class: "クラス(Class): ある共通の性質を持つ個体の集合を定義する概念のカテゴリ。",
    restriction: "制約(restriction): そのクラスに属するための条件を論理的に規定する要素。",
    individual: "個体(individual): クラスに属する具体的な実例(インスタンス)。",
  };
  return (
    <div>
      <svg viewBox="0 0 340 180" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        <g onClick={() => setSelected(selected === "class" ? null : "class")} style={{ cursor: "pointer" }}>
          <rect x={40} y={20} width={130} height={50} rx={6} fill={selected === "class" ? "#0B2545" : "#ffffff"} stroke="#0B2545" strokeWidth={selected === "class" ? 2.2 : 1.5} />
          <text x={105} y={40} textAnchor="middle" fontSize="10.5" fill={selected === "class" ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
            クラス: Person
          </text>
          <text x={105} y={58} textAnchor="middle" fontSize="8" fill={selected === "class" ? "#eef3fd" : "#5F6B80"} fontFamily="Inter, sans-serif">
            Class
          </text>
        </g>

        <g onClick={() => setSelected(selected === "restriction" ? null : "restriction")} style={{ cursor: "pointer" }}>
          <rect x={190} y={20} width={130} height={50} rx={6} fill={selected === "restriction" ? "#4C8BF5" : "#ffffff"} stroke="#4C8BF5" strokeWidth={selected === "restriction" ? 2.2 : 1.5} />
          <text x={255} y={38} textAnchor="middle" fontSize="9" fill={selected === "restriction" ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
            restriction:
          </text>
          <text x={255} y={52} textAnchor="middle" fontSize="8.5" fill={selected === "restriction" ? "#eef3fd" : "#4C8BF5"} fontFamily="Inter, sans-serif">
            hasParent some Person
          </text>
        </g>

        <line x1={170} y1={45} x2={190} y2={45} stroke="#0B2545" strokeWidth="1.3" />

        <g onClick={() => setSelected(selected === "individual" ? null : "individual")} style={{ cursor: "pointer" }}>
          <rect x={90} y={110} width={150} height={44} rx={6} fill={selected === "individual" ? "#7fb88a" : "#ffffff"} stroke="#7fb88a" strokeWidth={selected === "individual" ? 2.2 : 1.5} />
          <text x={165} y={128} textAnchor="middle" fontSize="9.5" fill={selected === "individual" ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
            個体: taro (individual)
          </text>
          <text x={165} y={144} textAnchor="middle" fontSize="8" fill={selected === "individual" ? "#eef6ee" : "#1f5c2b"} fontFamily="Inter, sans-serif">
            Person に属するインスタンス
          </text>
        </g>
        <line x1={105} y1={70} x2={140} y2={110} stroke="#0B2545" strokeWidth="1.2" />
      </svg>
      <DiagramInfoBox text={selected && parts[selected]} />
    </div>
  );
}

function SemanticWebDiagram() {
  const [selected, setSelected] = useState(null);
  const layers = [
    { id: "trust", label: "Trust", info: "信頼(Trust): データや推論結果がどれだけ信頼できるかを扱う最上位層。" },
    { id: "proof", label: "Proof", info: "証明(Proof): 推論の正当性を第三者が検証できるようにする層。" },
    { id: "sparql", label: "SPARQL / Query", info: "SPARQL: RDFデータに対しグラフパターンで問い合わせるクエリ言語の層。" },
    { id: "owl", label: "OWL(オントロジー)", info: "OWL(Web Ontology Language): 高度な意味表現・論理的制約を記述する層。" },
    { id: "rdfs", label: "RDFS", info: "RDF Schema: クラスやプロパティの階層など基本的な語彙を定義する層。" },
    { id: "rdf", label: "RDF", info: "RDF(Resource Description Framework): 主語-述語-目的語でデータを表現する基盤層。" },
    { id: "uri", label: "URI / Unicode", info: "資源の識別子(URI)と文字コード(Unicode)という最も基礎的な層。" },
  ];
  const rowH = 24;
  const gap = 4;
  const width = 320;
  const height = layers.length * (rowH + gap) + gap;
  const sel = layers.find((l) => l.id === selected);
  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        {layers.map((l, i) => {
          const y = gap + i * (rowH + gap);
          const color = accentColor(layers.length - 1 - i, layers.length);
          const isSel = selected === l.id;
          return (
            <g key={i} onClick={() => setSelected(isSel ? null : l.id)} style={{ cursor: "pointer" }}>
              <rect
                x={10}
                y={y}
                width={width - 20}
                height={rowH}
                rx={4}
                fill={color}
                opacity={isSel ? 0.85 : 0.12}
                stroke={color}
                strokeWidth={isSel ? 2 : 1.1}
              />
              <text
                x={width / 2}
                y={y + rowH / 2 + 4}
                textAnchor="middle"
                fontSize="9.5"
                fill={isSel ? "#ffffff" : "#14213d"}
                fontFamily="Inter, sans-serif"
              >
                {l.label}
              </text>
            </g>
          );
        })}
      </svg>
      <DiagramInfoBox text={sel && sel.info} />
    </div>
  );
}

function ReasoningDiagram() {
  const [selected, setSelected] = useState(null);
  const parts = {
    p1: "前提1: 一般的な規則(全称命題)。「全てのPはQである」という形式。",
    p2: "前提2: 個別の事実。「aはPである」という具体的な主張。",
    c: "結論(演繹): モーダスポネンスにより前提1・2から必然的に導かれる帰結。",
  };
  return (
    <div>
      <svg viewBox="0 0 320 170" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        <g onClick={() => setSelected(selected === "p1" ? null : "p1")} style={{ cursor: "pointer" }}>
          <rect x={20} y={16} width={130} height={44} rx={6} fill={selected === "p1" ? "#0B2545" : "#ffffff"} stroke="#0B2545" strokeWidth={selected === "p1" ? 2.2 : 1.3} />
          <text x={85} y={34} textAnchor="middle" fontSize="9" fill={selected === "p1" ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
            前提1
          </text>
          <text x={85} y={48} textAnchor="middle" fontSize="8" fill={selected === "p1" ? "#eef3fd" : "#4C8BF5"} fontFamily="Inter, sans-serif">
            全てのPはQである
          </text>
        </g>

        <g onClick={() => setSelected(selected === "p2" ? null : "p2")} style={{ cursor: "pointer" }}>
          <rect x={170} y={16} width={130} height={44} rx={6} fill={selected === "p2" ? "#0B2545" : "#ffffff"} stroke="#0B2545" strokeWidth={selected === "p2" ? 2.2 : 1.3} />
          <text x={235} y={34} textAnchor="middle" fontSize="9" fill={selected === "p2" ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
            前提2
          </text>
          <text x={235} y={48} textAnchor="middle" fontSize="8" fill={selected === "p2" ? "#eef3fd" : "#4C8BF5"} fontFamily="Inter, sans-serif">
            aはPである
          </text>
        </g>

        <line x1={160} y1={60} x2={160} y2={100} stroke="#5F6B80" strokeWidth="1.3" />
        <polygon points="155,96 165,96 160,106" fill="#5F6B80" />

        <g onClick={() => setSelected(selected === "c" ? null : "c")} style={{ cursor: "pointer" }}>
          <rect x={80} y={110} width={160} height={46} rx={6} fill={selected === "c" ? "#7fb88a" : "#eef6ee"} stroke="#7fb88a" strokeWidth={selected === "c" ? 2.2 : 1.5} />
          <text x={160} y={130} textAnchor="middle" fontSize="9.5" fill={selected === "c" ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
            結論(演繹)
          </text>
          <text x={160} y={146} textAnchor="middle" fontSize="8.5" fill={selected === "c" ? "#eef6ee" : "#1f5c2b"} fontFamily="Inter, sans-serif">
            よってaはQである
          </text>
        </g>
      </svg>
      <DiagramInfoBox text={selected && parts[selected]} />
    </div>
  );
}

/* ------------------------------------------------------------
   その他の分野の個別解説図(音声学・統語論・神経言語学・歴史言語学)
   ------------------------------------------------------------ */
function PhoneticsDiagram() {
  const [selected, setSelected] = useState(null);
  const places = [
    { id: "bilabial", label: "両唇音", ex: "[p] [b] [m]", info: "両唇音: 上下の唇を閉じて作る音。例: [p][b][m]。" },
    { id: "alveolar", label: "歯茎音", ex: "[t] [d] [n]", info: "歯茎音: 舌先を上の歯茎に近づけて作る音。例: [t][d][n]。" },
    { id: "palatal", label: "硬口蓋音", ex: "[ɕ] [j]", info: "硬口蓋音: 舌の中央を硬口蓋に近づけて作る音。例: 日本語の「し」[ɕ]。" },
    { id: "velar", label: "軟口蓋音", ex: "[k] [g] [ŋ]", info: "軟口蓋音: 舌の奥を軟口蓋に近づけて作る音。例: [k][g][ŋ]。" },
    { id: "glottal", label: "声門音", ex: "[h] [ʔ]", info: "声門音: 声門(声帯の間)で作る音。例: [h]。" },
  ];
  const sel = places.find((p) => p.id === selected);
  return (
    <div>
      <svg viewBox="0 0 340 120" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        <line x1={20} y1={60} x2={320} y2={60} stroke="#c2c9d6" strokeWidth="1.5" />
        <text x={20} y="14" fontSize="8.5" fill="#5F6B80" fontFamily="Inter, sans-serif">
          前(唇側)
        </text>
        <text x={300} y="14" fontSize="8.5" fill="#5F6B80" fontFamily="Inter, sans-serif" textAnchor="end">
          後(喉側)
        </text>
        {places.map((p, i) => {
          const x = 40 + i * 65;
          const isSel = selected === p.id;
          const color = accentColor(i, places.length);
          return (
            <g key={p.id} onClick={() => setSelected(isSel ? null : p.id)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={60} r={26} fill={isSel ? color : "#ffffff"} stroke={color} strokeWidth={isSel ? 2.2 : 1.4} />
              <text x={x} y={57} textAnchor="middle" fontSize="8.5" fill={isSel ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
                {p.label}
              </text>
              <text x={x} y={69} textAnchor="middle" fontSize="7.5" fill={isSel ? "#eef3fd" : "#4C8BF5"} fontFamily="Inter, sans-serif">
                {p.ex}
              </text>
            </g>
          );
        })}
      </svg>
      <DiagramInfoBox text={sel && sel.info} />
    </div>
  );
}

function SyntaxTreeDiagram() {
  const [selected, setSelected] = useState(null);
  const nodes = [
    { id: "s", label: "S", x: 170, y: 20, info: "S(文): 文全体を表す最上位のノード。" },
    { id: "np", label: "NP", x: 90, y: 70, info: "NP(名詞句): 主語となる名詞句。例: 「猫が」。" },
    { id: "vp", label: "VP", x: 250, y: 70, info: "VP(動詞句): 述語となる動詞句。例: 「座る」。" },
    { id: "n", label: "N", x: 90, y: 120, info: "N(名詞): 名詞句の主要部。例: 「猫」。" },
    { id: "v", label: "V", x: 250, y: 120, info: "V(動詞): 動詞句の主要部。例: 「座る」。" },
  ];
  const edges = [
    ["s", "np"],
    ["s", "vp"],
    ["np", "n"],
    ["vp", "v"],
  ];
  const find = (id) => nodes.find((n) => n.id === id);
  const sel = nodes.find((n) => n.id === selected);
  return (
    <div>
      <svg viewBox="0 0 340 150" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        {edges.map(([a, b], i) => {
          const A = find(a);
          const B = find(b);
          return <line key={i} x1={A.x} y1={A.y + 14} x2={B.x} y2={B.y - 14} stroke="#c2c9d6" strokeWidth="1.3" />;
        })}
        {nodes.map((n) => {
          const isSel = selected === n.id;
          return (
            <g key={n.id} onClick={() => setSelected(isSel ? null : n.id)} style={{ cursor: "pointer" }}>
              <circle cx={n.x} cy={n.y} r={20} fill={isSel ? "#0B2545" : "#ffffff"} stroke="#0B2545" strokeWidth={isSel ? 2.2 : 1.4} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fill={isSel ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
                {n.label}
              </text>
            </g>
          );
        })}
        <text x={170} y="145" textAnchor="middle" fontSize="8.5" fill="#5F6B80" fontFamily="Inter, sans-serif">
          句構造木の例: 「猫が座る」
        </text>
      </svg>
      <DiagramInfoBox text={sel && sel.info} />
    </div>
  );
}

function NeuroBrainDiagram() {
  const [selected, setSelected] = useState(null);
  const regions = [
    { id: "broca", label: "ブローカ野", x: 110, y: 90, rx: 42, ry: 26, info: "ブローカ野(前頭葉下部): 発話の産出・統語処理に関与するとされる領域。" },
    { id: "wernicke", label: "ウェルニッケ野", x: 230, y: 110, rx: 46, ry: 28, info: "ウェルニッケ野(側頭葉): 言語理解に関与するとされる領域。" },
  ];
  const sel = regions.find((r) => r.id === selected);
  return (
    <div>
      <svg viewBox="0 0 340 200" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        <ellipse cx={175} cy={110} rx={150} ry={80} fill="none" stroke="#c2c9d6" strokeWidth="1.5" />
        <text x={175} y="30" textAnchor="middle" fontSize="8.5" fill="#5F6B80" fontFamily="Inter, sans-serif">
          脳(側面図・簡略化)
        </text>
        {regions.map((r) => {
          const isSel = selected === r.id;
          return (
            <g key={r.id} onClick={() => setSelected(isSel ? null : r.id)} style={{ cursor: "pointer" }}>
              <ellipse
                cx={r.x}
                cy={r.y}
                rx={r.rx}
                ry={r.ry}
                fill={isSel ? "#4C8BF5" : "#ffffff"}
                stroke="#0B2545"
                strokeWidth={isSel ? 2.2 : 1.4}
                opacity={isSel ? 0.9 : 1}
              />
              <text x={r.x} y={r.y + 4} textAnchor="middle" fontSize="10" fill={isSel ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
                {r.label}
              </text>
            </g>
          );
        })}
      </svg>
      <DiagramInfoBox text={sel && sel.info} />
    </div>
  );
}

function SoundChangeDiagram() {
  const [selected, setSelected] = useState(null);
  const pairs = [
    { id: "p", before: "*p", after: "f", info: "*p → f(例: 羅 pater → 英 father)。グリムの法則による第一次子音推移の一例。" },
    { id: "t", before: "*t", after: "θ", info: "*t → θ(例: 羅 tres → 英 three)。無声閉鎖音が摩擦音へ変化。" },
    { id: "k", before: "*k", after: "h", info: "*k → h(例: 羅 cornu → 英 horn)。軟口蓋閉鎖音が声門摩擦音へ変化。" },
  ];
  const sel = pairs.find((p) => p.id === selected);
  return (
    <div>
      <svg viewBox="0 0 320 130" style={{ width: "100%", maxWidth: 380, display: "block", margin: "0 auto" }}>
        {pairs.map((p, i) => {
          const x = 60 + i * 100;
          const isSel = selected === p.id;
          const color = accentColor(i, pairs.length);
          return (
            <g key={p.id} onClick={() => setSelected(isSel ? null : p.id)} style={{ cursor: "pointer" }}>
              <rect x={x - 40} y={20} width={80} height={40} rx={6} fill={isSel ? color : "#ffffff"} stroke={color} strokeWidth={isSel ? 2.2 : 1.4} />
              <text x={x} y={45} textAnchor="middle" fontSize="13" fill={isSel ? "#ffffff" : "#14213d"} fontFamily="Georgia, serif">
                {p.before}
              </text>
              <line x1={x} y1={62} x2={x} y2={78} stroke={color} strokeWidth="1.5" />
              <polygon points={`${x - 4},74 ${x + 4},74 ${x},82`} fill={color} />
              <rect x={x - 40} y={84} width={80} height={36} rx={6} fill={isSel ? color : "#eef6ee"} stroke="#7fb88a" strokeWidth={isSel ? 2.2 : 1.4} />
              <text x={x} y={107} textAnchor="middle" fontSize="13" fill={isSel ? "#ffffff" : "#1f5c2b"} fontFamily="Georgia, serif">
                {p.after}
              </text>
            </g>
          );
        })}
      </svg>
      <DiagramInfoBox text={sel && sel.info} />
    </div>
  );
}

const FIELD_DIAGRAMS = {
  "computational:knowledge-rep:ontology": OntologyDiagram,
  "computational:knowledge-rep:knowledge-graph": KnowledgeGraphDiagram,
  "computational:knowledge-rep:rdf": RDFDiagram,
  "computational:knowledge-rep:owl": OWLDiagram,
  "computational:knowledge-rep:semantic-web": SemanticWebDiagram,
  "computational:knowledge-rep:reasoning": ReasoningDiagram,
  "theoretical:phonetics": PhoneticsDiagram,
  "theoretical:syntax": SyntaxTreeDiagram,
  "psycho:neurolinguistics": NeuroBrainDiagram,
  "historical:historical-ling": SoundChangeDiagram,
};
// 専用の図がない分野は、データで描く図（SpecDiagram）を図解タブに出す。専用の図がある分野は、その下に続けて出す
Object.keys(FIELD_FIGS).forEach((k) => {
  const Base = FIELD_DIAGRAMS[k];
  FIELD_DIAGRAMS[k] = Base
    ? () => (
        <>
          <Base />
          <div style={{ marginTop: 16 }}>
            <SpecDiagram figs={FIELD_FIGS[k]} />
          </div>
        </>
      )
    : () => <SpecDiagram figs={FIELD_FIGS[k]} />;
});

const STARS = { 1: "★", 2: "★★", 3: "★★★", 4: "★★★★" };
const DIFF_LABEL = { 1: "初級", 2: "中級", 3: "上級", 4: "専門" };
const DIFF_LABEL_EN = { 1: "Beginner", 2: "Intermediate", 3: "Advanced", 4: "Expert" };

/* 文字列から決定的な整数シードを作る簡易ハッシュ */
/* 英訳データ(QUIZ_DATA_EN)があれば言語に応じて問題文・選択肢・解説を差し替える */
function getLocalizedQuestion(q, fieldKey, lang) {
  if (lang === "ja") return q;
  const enMap = QUIZ_DATA_EN[fieldKey];
  const en = enMap && enMap[q.id];
  if (!en) return q;
  const choices = q.perm ? q.perm.map((j) => en.choices[j]) : en.choices;
  return { ...q, question: en.question, choices, exp: en.exp, translated: true };
}

// 解説中の {c0}〜{c3}（元の選択肢番号）を、いま表示している位置の記号（A〜D）に置き換える
function expText(q) {
  const perm = q.perm || [0, 1, 2, 3];
  return (q.exp || "").replace(/\{c([0-3])\}/g, (_, d) => "ABCD"[perm.indexOf(Number(d))] || "?");
}

function seedFromString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/* シードに基づく決定的Fisher-Yatesシャッフル。正解インデックスも追従させる */
function seededShuffleChoices(question, seed) {
  const idx = question.choices.map((_, i) => i);
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return {
    ...question,
    choices: idx.map((i) => question.choices[i]),
    answer: idx.indexOf(question.answer),
    perm: idx.map((i) => (question.perm || [0, 1, 2, 3])[i]),
  };
}

function TriviaBox({ fieldKey }) {
  const { lang, t } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const data = TRIVIA_DATA[fieldKey];
  const more = TRIVIA_MORE[fieldKey] || [];
  if (!data) return null;
  return (
    <div
      style={{
        border: "1px solid var(--lh-border)",
        borderRadius: 6,
        padding: "12px 16px",
        marginBottom: 18,
        background: "var(--lh-soft)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 0,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#0B2545", display: "flex", alignItems: "center", gap: 6 }}>
          💡 {t("豆知識 & 実世界での応用", "Trivia & Real-World Use")}
        </span>
        <ChevronRight
          size={14}
          strokeWidth={2}
          color="var(--lh-muted)"
          style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}
        />
      </button>
      {open && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--lh-text)", lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>
            <strong style={{ color: "#0B2545" }}>{t("豆知識", "Trivia")}: </strong>
            {lang === "ja" ? data.trivia : data.triviaEn}
          </div>
          <div>
            <strong style={{ color: "#0B2545" }}>{t("実世界での応用", "Real-World Use")}: </strong>
            {lang === "ja" ? data.realWorld : data.realWorldEn}
          </div>
          {more.map((x, i) => (
            <div key={i} style={{ marginTop: 8 }}>
              <strong style={{ color: "#0B2545" }}>{t("豆知識", "Trivia")} {i + 2}: </strong>
              {lang === "ja" ? x.trivia : x.triviaEn}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 分野の図解（データで描く）。型：flow（流れ）・layers（階層）・tree（分類）・compare（対比）・cycle（循環）・matrix（2軸の4分類）
// 図の項目を押すと、その説明を図の下に出す
function figL(x, E) {
  return x ? (E ? x.lEn || x.l : x.l) : "";
}
function FigChip({ it, E, sel, onSel, strong, style }) {
  const on = sel === it;
  return (
    <button
      onClick={() => onSel(on ? null : it)}
      style={{
        border: "1.3px solid #4C8BF5",
        background: on ? "#4C8BF5" : strong ? "#0B2545" : "var(--lh-card)",
        color: on || strong ? "#ffffff" : "var(--lh-text)",
        borderRadius: 8,
        padding: "7px 10px",
        fontSize: 12.5,
        lineHeight: 1.35,
        cursor: "pointer",
        textAlign: "center",
        minWidth: 0,
        ...style,
      }}
    >
      {figL(it, E)}
    </button>
  );
}
function FigArrow({ dir }) {
  return <span aria-hidden="true" style={{ color: "#4C8BF5", fontSize: 16, lineHeight: 1, alignSelf: "center", flexShrink: 0 }}>{dir}</span>;
}
function SpecFigure({ fig }) {
  const { lang } = useContext(AppContext);
  const E = lang === "en";
  const [sel, setSel] = useState(null);
  const c = { E, sel, onSel: setSel };
  let body = null;
  if (fig.type === "flow") {
    body = (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "stretch", justifyContent: "center" }}>
        {fig.items.map((it, i) => (
          <React.Fragment key={i}>
            {i > 0 && <FigArrow dir="→" />}
            <FigChip it={it} {...c} style={{ flex: "1 1 96px", maxWidth: 170 }} />
          </React.Fragment>
        ))}
      </div>
    );
  } else if (fig.type === "layers") {
    const n = fig.items.length;
    body = (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
        {fig.items.map((it, i) => (
          <FigChip key={i} it={it} {...c} style={{ width: `${Math.round(56 + (44 * (i + 1)) / n)}%`, maxWidth: 460 }} />
        ))}
      </div>
    );
  } else if (fig.type === "tree") {
    body = (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FigChip it={fig.root} {...c} strong style={{ minWidth: 140 }} />
        <div style={{ width: 2, height: 12, background: "var(--lh-border2)" }} />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${fig.items.length > 3 ? 112 : 140}px),1fr))`, gap: 8, width: "100%", borderTop: "2px solid var(--lh-border2)", paddingTop: 10 }}>
          {fig.items.map((it, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <FigChip it={it} {...c} />
              {(it.sub || []).map((s, j) => (
                <FigChip key={j} it={s} {...c} style={{ fontSize: 11.5, padding: "5px 8px", borderStyle: "dashed", marginLeft: 10 }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (fig.type === "cycle") {
    const n = fig.items.length;
    body = (
      <div style={{ position: "relative", width: "100%", maxWidth: 440, height: 250, margin: "0 auto" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
          <ellipse cx="50" cy="50" rx="34" ry="34" fill="none" stroke="var(--lh-border2)" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", color: "#4C8BF5", fontSize: 22 }} aria-hidden="true">↻</div>
        {fig.items.map((it, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
          return (
            <div key={i} style={{ position: "absolute", left: `${50 + 34 * Math.cos(a)}%`, top: `${50 + 36 * Math.sin(a)}%`, transform: "translate(-50%,-50%)", width: "34%", maxWidth: 140, display: "flex", justifyContent: "center" }}>
              <FigChip it={it} {...c} style={{ width: "100%" }} />
            </div>
          );
        })}
      </div>
    );
  } else if (fig.type === "compare") {
    const cell = { padding: "7px 8px", borderBottom: "1px solid var(--lh-border)", fontSize: 12.5, verticalAlign: "top" };
    body = (
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ ...cell, width: "26%" }}></th>
            <th style={{ ...cell, background: "#0B2545", color: "#fff", fontWeight: 600 }}>{figL(fig.left, E)}</th>
            <th style={{ ...cell, background: "#4C8BF5", color: "#fff", fontWeight: 600 }}>{figL(fig.right, E)}</th>
          </tr>
        </thead>
        <tbody>
          {fig.rows.map((r, i) => (
            <tr key={i}>
              <th style={{ ...cell, color: "var(--lh-muted)", fontWeight: 600, textAlign: "left" }}>{E ? r.kEn : r.k}</th>
              <td style={cell}>{E ? r.aEn : r.a}</td>
              <td style={cell}>{E ? r.bEn : r.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (fig.type === "matrix") {
    body = (
      <div style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 6, maxWidth: 480, margin: "0 auto" }}>
        <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", textAlign: "center", fontSize: 11.5, color: "var(--lh-muted)" }}>{figL(fig.y, E)} →</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {fig.cells.map((it, i) => (
            <FigChip key={i} it={it} {...c} style={{ minHeight: 56 }} />
          ))}
        </div>
        <div />
        <div style={{ textAlign: "center", fontSize: 11.5, color: "var(--lh-muted)" }}>{figL(fig.x, E)} →</div>
      </div>
    );
  }
  return (
    <div style={{ border: "1px solid var(--lh-border)", borderRadius: 8, padding: "14px 14px 12px", marginBottom: 16, background: "var(--lh-card)" }}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: "var(--lh-text)" }}>{E ? fig.titleEn : fig.title}</div>
      <div style={{ fontSize: 12.5, color: "var(--lh-muted)", marginBottom: 12, lineHeight: 1.6 }}>{E ? fig.captionEn : fig.caption}</div>
      {body}
      {fig.type !== "compare" && (
        <div style={{ marginTop: 12, padding: "9px 12px", background: "var(--lh-soft)", borderRadius: 6, fontSize: 12.5, color: "var(--lh-text)", lineHeight: 1.6, minHeight: 20 }}>
          {sel ? (
            <>
              <b>{figL(sel, E)}</b>
              {!E && sel.lEn && <span style={{ color: "var(--lh-muted)", marginLeft: 6, fontSize: 11.5 }}>{sel.lEn}</span>}
              <div>{E ? sel.dEn : sel.d}</div>
            </>
          ) : (
            <span style={{ color: "var(--lh-muted)" }}>{E ? "Tap an element of the diagram to see its explanation." : "図の要素を押すと説明が出ます"}</span>
          )}
        </div>
      )}
    </div>
  );
}
function SpecDiagram({ figs }) {
  return (
    <div>
      {figs.map((f, i) => (
        <SpecFigure key={i} fig={f} />
      ))}
    </div>
  );
}

// 分野の要点カード。概念マップ（中心に分野名、周りに主要概念）と、概念・人物・古典的な例・関連分野を示す
function conceptMapLabel(s, n) {
  const max = /[　-鿿]/.test(s) ? n : Math.round(n * 1.9); // 和文は全角幅で数える
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
function ConceptMap({ center, concepts, selected, onSelect }) {
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.innerWidth < 600);
  useEffect(() => {
    const on = () => setNarrow(window.innerWidth < 600);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const n = concepts.length;
  // 広い画面：中心の周りに円く並べる。狭い画面：中心を上に置き、概念を2列に並べる（文字を小さくしない）
  const W = narrow ? 340 : 600, H = narrow ? 70 + Math.ceil(n / 2) * 44 : 236;
  const cx = W / 2, cy = narrow ? 28 : H / 2;
  const bw = narrow ? 158 : 170, lim = narrow ? 11 : 12;
  const pos = (i) => {
    if (narrow) return [i % 2 === 0 ? 84 : 256, 84 + Math.floor(i / 2) * 44];
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + 212 * Math.cos(a), cy + 82 * Math.sin(a)];
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={center} style={{ width: "100%", maxWidth: W, display: "block", margin: "6px auto 2px" }}>
      {concepts.map((c, i) => {
        const [x, y] = pos(i);
        return <line key={"l" + i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--lh-border2)" strokeWidth={1.2} />;
      })}
      <ellipse cx={cx} cy={cy} rx={66} ry={22} fill="#0B2545" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fill="#ffffff" fontWeight="600">{conceptMapLabel(center, 9)}</text>
      {concepts.map((c, i) => {
        const [x, y] = pos(i);
        const on = selected === i;
        return (
          <g key={"n" + i} onClick={() => onSelect(on ? null : i)} style={{ cursor: "pointer" }}>
            <rect x={x - bw / 2} y={y - 15} width={bw} height={30} rx={15} fill={on ? "#4C8BF5" : "var(--lh-card)"} stroke="#4C8BF5" strokeWidth={1.3} />
            <text x={x} y={y + 4.5} textAnchor="middle" fontSize={narrow ? 12.5 : 12} fill={on ? "#ffffff" : "var(--lh-text)"}>{conceptMapLabel(c, lim)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function fieldKeyTarget(key) {
  const [catId, fieldId, subId] = key.split(":");
  return subId ? { level: "sub", catId, fieldId, subId } : { level: "field", catId, fieldId };
}
function fieldKeyName(key, lang) {
  const [catId, fieldId, subId] = key.split(":");
  const cat = CATEGORIES.find((c) => c.id === catId);
  const f = cat && cat.fields.find((x) => x.id === fieldId);
  const s = subId && f && f.sub ? f.sub.find((x) => x.id === subId) : null;
  const node = s || f;
  return node ? (lang === "en" ? node.en : node.ja) : key;
}

/* 複数の分野に出てくる人物（英語名で名寄せ）→ 出てくる分野キーの一覧 */
const PERSON_FIELDS = (() => {
  const m = {};
  Object.entries(FIELD_OVERVIEW).forEach(([key, o]) => (o.people || []).forEach((p) => { (m[p.en] = m[p.en] || []).push(key); }));
  return m;
})();
const fieldKeyToView = (key) => {
  const [catId, fieldId, subId] = key.split(":");
  return subId ? { level: "sub", catId, fieldId, subId } : { level: "field", catId, fieldId };
};

/* 分野ページから、カテゴリの用語集・見極めポイントと、この分野の解説に出てくる用語へつなぐ */
function FieldLinks({ fieldKey, onNavigate }) {
  const { lang, t } = useContext(AppContext);
  const catId = fieldKey.split(":")[0];
  const terms = GLOSSARY_DATA[catId] || [];
  const pairs = CONFUSION_DATA[catId] || [];
  const o = FIELD_OVERVIEW[fieldKey];
  const text = o ? [o.one, o.scope, o.example, ...(o.concepts || []).map((c) => c.t + c.d)].join(" ") : "";
  const related = terms.filter((g) => g.ja && g.ja.length >= 2 && text.includes(g.ja)).slice(0, 8);
  if (!terms.length && !pairs.length) return null;
  const btn = { fontSize: 12, padding: "4px 10px", borderRadius: 6, border: "1px solid var(--lh-border2)", background: "transparent", color: "var(--lh-text)", cursor: "pointer" };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 14, fontSize: 12.5, color: "var(--lh-muted)" }}>
      {terms.length > 0 && <button style={btn} onClick={() => onNavigate({ level: "category", catId, tab: "glossary" })}>{t(`このカテゴリの用語集（${terms.length}語）`, `Category glossary (${terms.length})`)}</button>}
      {pairs.length > 0 && <button style={btn} onClick={() => onNavigate({ level: "category", catId, tab: "confusion" })}>{t(`見極めポイント（${pairs.length}件）`, `Commonly confused (${pairs.length})`)}</button>}
      {related.length > 0 && <span>{t("関係する用語：", "Related terms: ")}{related.map((g, i) => <span key={i} title={lang === "en" ? g.defEn : g.def} style={{ borderBottom: "1px dotted var(--lh-muted)", marginRight: 8, cursor: "help" }}>{lang === "en" ? g.en : g.ja}</span>)}</span>}
    </div>
  );
}

function FieldOverview({ fieldKey, ja, en, onNavigate }) {
  const { lang, t } = useContext(AppContext);
  const [open, setOpen] = useState(true);
  const [sel, setSel] = useState(null);
  const o = FIELD_OVERVIEW[fieldKey];
  if (!o) return null;
  const E = lang === "en";
  const sec = { fontSize: 11, letterSpacing: ".08em", color: "var(--lh-muted)", margin: "16px 0 6px", fontWeight: 600 };
  return (
    <div style={{ border: "1px solid var(--lh-border)", borderRadius: 6, padding: "12px 16px", marginBottom: 14, background: "var(--lh-card)" }}>
      <button onClick={() => setOpen((v) => !v)} style={{ display: "flex", justifyContent: "space-between", width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--lh-text)", fontSize: 13, fontWeight: 600 }}>
        <span>📘 {t("この分野の要点", "Field at a glance")}</span>
        <span style={{ color: "var(--lh-muted)" }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--lh-text)" }}>
          <p style={{ margin: "10px 0 4px", fontSize: 15, fontWeight: 600 }}>{E ? o.oneEn : o.one}</p>
          <p style={{ margin: 0, color: "var(--lh-muted)" }}>{E ? o.scopeEn : o.scope}</p>

          <div style={sec}>{t("概念マップ（図の概念を押すと説明が出ます）", "Concept map (tap a concept)")}</div>
          <ConceptMap center={E ? en : ja} concepts={o.concepts.map((c) => (E ? c.en : c.t))} selected={sel} onSelect={setSel} />
          {sel !== null && o.concepts[sel] && (
            <div style={{ background: "var(--lh-soft)", borderRadius: 6, padding: "8px 12px", fontSize: 13 }}>
              <b>{E ? o.concepts[sel].en : o.concepts[sel].t}</b>
              {!E && <span style={{ color: "var(--lh-muted)", marginLeft: 6, fontSize: 12 }}>{o.concepts[sel].en}</span>}
              <div>{E ? o.concepts[sel].dEn : o.concepts[sel].d}</div>
            </div>
          )}

          <div style={sec}>{t("主要な概念", "Key concepts")}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: 8 }}>
            {o.concepts.map((c, i) => (
              <div key={i} style={{ border: "1px solid var(--lh-border)", borderRadius: 6, padding: "8px 10px", fontSize: 12.5 }}>
                <div style={{ fontWeight: 600 }}>
                  {E ? c.en : c.t}
                  {!E && <span style={{ fontWeight: 400, color: "var(--lh-muted)", marginLeft: 6, fontSize: 11.5 }}>{c.en}</span>}
                </div>
                <div style={{ color: "var(--lh-muted)" }}>{E ? c.dEn : c.d}</div>
              </div>
            ))}
          </div>

          <div style={sec}>{t("代表的な研究者", "Key figures")}</div>
          {o.people.map((p, i) => (
            <div key={i} style={{ fontSize: 13, marginBottom: 4 }}>
              <b>{E ? p.en : p.n}</b>
              <span style={{ color: "var(--lh-muted)", fontSize: 12 }}>
                {!E ? `（${p.en}${p.y ? "、" + p.y : ""}）` : p.y ? ` (${p.y})` : ""}
              </span>
              ：{E ? p.wEn : p.w}
              {(PERSON_FIELDS[p.en] || []).length > 1 && onNavigate && (
                <span style={{ fontSize: 11.5, color: "var(--lh-muted)" }}>
                  {" "}{t("（ほかの分野にも：", "(also in: ")}
                  {PERSON_FIELDS[p.en].filter((k) => k !== fieldKey).map((k, j) => (
                    <button key={k} onClick={() => onNavigate(fieldKeyToView(k))} style={{ background: "none", border: "none", padding: 0, color: "#4C8BF5", cursor: "pointer", fontSize: 11.5 }}>{(j ? "・" : "") + fieldKeyToLabel(k, lang)}</button>
                  ))}
                  {t("）", ")")}
                </span>
              )}
            </div>
          ))}

          <div style={sec}>{t("この分野を象徴する例", "A classic example")}</div>
          <div style={{ borderLeft: "3px solid #4C8BF5", paddingLeft: 10, fontSize: 13 }}>{E ? o.exampleEn : o.example}</div>

          {(FIELD_RECENT[fieldKey] || []).length > 0 && (
            <>
              <div style={sec}>{t("最近の動き", "Recent developments")}</div>
              {FIELD_RECENT[fieldKey].map((r, i) => (
                <div key={i} style={{ border: "1px solid var(--lh-border)", borderRadius: 6, padding: "8px 10px", marginBottom: 8, fontSize: 12.5 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{ background: "#0B2545", color: "#fff", borderRadius: 4, padding: "1px 6px", fontSize: 11 }}>{r.y}</span>
                    <b style={{ fontSize: 13 }}>{E ? r.tEn : r.t}</b>
                  </div>
                  <div style={{ marginTop: 4 }}>{E ? r.dEn : r.d}</div>
                  <div style={{ marginTop: 4, fontSize: 11.5, color: "var(--lh-muted)" }}>
                    {t("出典", "Source")}:{" "}
                    {r.src.map((x, j) => (
                      <React.Fragment key={j}>
                        {j > 0 && " / "}
                        <a href={x.url} target="_blank" rel="noopener noreferrer" style={{ color: "#4C8BF5", wordBreak: "break-all" }}>{x.title}</a>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {o.related && o.related.length > 0 && onNavigate && (
            <>
              <div style={sec}>{t("関連する分野", "Related fields")}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {o.related.map((k) => (
                  <button key={k} onClick={() => onNavigate(fieldKeyTarget(k))} style={{ border: "1px solid var(--lh-border2)", background: "var(--lh-card)", color: "var(--lh-text)", borderRadius: 999, padding: "4px 12px", fontSize: 12, cursor: "pointer" }}>
                    {fieldKeyName(k, lang)} →
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function QuizView({ fieldKey, ja, en, allQuestions, breadcrumbItems, onNavigate, progress, onProgressUpdate }) {
  const { lang, t } = useContext(AppContext);
  const [difficulty, setDifficulty] = useState(1);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);

  const isWrong = (q) => progress[`wrong:${fieldKey}:${q.id}`] && !progress[`${fieldKey}:${q.id}`];
  const isBookmarked = (q) => !!progress[`bm:${fieldKey}:${q.id}`];

  const tierQuestions = useMemo(
    () => allQuestions.filter((q) => q.difficulty === difficulty),
    [allQuestions, difficulty]
  );
  const reviewQuestions = useMemo(
    () => allQuestions.filter((q) => isWrong(q) || isBookmarked(q)),
    [allQuestions, progress, fieldKey]
  );
  const baseQuestions = reviewMode ? reviewQuestions : tierQuestions;
  const localizedQuestions = useMemo(
    () => baseQuestions.map((q) => getLocalizedQuestion(q, fieldKey, lang)),
    [baseQuestions, fieldKey, lang]
  );
  const questions = useMemo(() => {
    if (!shuffleOn) return localizedQuestions;
    return localizedQuestions.map((q) => seededShuffleChoices(q, seedFromString(fieldKey + ":" + q.id)));
  }, [localizedQuestions, shuffleOn, fieldKey]);
  const current = questions[qIndex];

  useEffect(() => {
    setQIndex(0);
    setSelected(null);
    setRevealed(false);
  }, [difficulty, reviewMode]);

  const tierStats = (d) => {
    const qs = allQuestions.filter((q) => q.difficulty === d);
    const correct = qs.filter((q) => progress[`${fieldKey}:${q.id}`]).length;
    return { total: qs.length, correct };
  };

  function selectChoice(idx) {
    if (revealed || !current) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === current.answer) {
      onProgressUpdate(`${fieldKey}:${current.id}`, true);
    } else {
      onProgressUpdate(`wrong:${fieldKey}:${current.id}`, true);
    }
  }

  function toggleBookmark(e) {
    e.stopPropagation();
    if (!current) return;
    onProgressUpdate(`bm:${fieldKey}:${current.id}`, !isBookmarked(current));
  }

  function next() {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setRevealed(false);
    }
  }
  function prev() {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  const totalAll = allQuestions.length;
  const correctAll = allQuestions.filter((q) => progress[`${fieldKey}:${q.id}`]).length;
  const reviewCount = allQuestions.filter((q) => isWrong(q) || isBookmarked(q)).length;

  return (
    <div>
      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />}
      <h1 className="lh-serif" style={{ fontSize: 28, fontWeight: 500, margin: 0 }}>
        {ja}
      </h1>
      <p style={{ fontSize: 13.5, color: "var(--lh-muted)", marginTop: 4, marginBottom: 18 }}>
        {en} · {t(`全${totalAll}問中 ${correctAll}問正解`, `${correctAll} of ${totalAll} correct`)}
      </p>

      <FieldOverview fieldKey={fieldKey} ja={ja} en={en} onNavigate={onNavigate} />
      <FieldLinks fieldKey={fieldKey} onNavigate={onNavigate} />
      <TriviaBox fieldKey={fieldKey} />

      {/* モード切り替え: 通常 / 復習 / シャッフル */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button
          onClick={() => setReviewMode(false)}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: !reviewMode ? "1px solid #0B2545" : "1px solid var(--lh-border2)",
            background: !reviewMode ? "#0B2545" : "var(--lh-card)",
            color: !reviewMode ? "#ffffff" : "var(--lh-text)",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {t("通常モード", "Normal")}
        </button>
        <button
          onClick={() => setReviewMode(true)}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: reviewMode ? "1px solid #0B2545" : "1px solid var(--lh-border2)",
            background: reviewMode ? "#0B2545" : "var(--lh-card)",
            color: reviewMode ? "#ffffff" : "var(--lh-text)",
            fontSize: 12,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <RotateCcw size={12} strokeWidth={2} />
          {t("復習", "Review")} ({reviewCount})
        </button>
        <button
          onClick={() => setShuffleOn((s) => !s)}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: shuffleOn ? "1px solid #4C8BF5" : "1px solid var(--lh-border2)",
            background: shuffleOn ? "#eef3fd" : "var(--lh-card)",
            color: shuffleOn ? "#0B2545" : "var(--lh-text)",
            fontSize: 12,
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          {shuffleOn ? t("シャッフル: ON", "Shuffle: ON") : t("シャッフル: OFF", "Shuffle: OFF")}
        </button>
      </div>

      {/* 難易度タブ(通常モードのみ) */}
      {!reviewMode && (
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[1, 2, 3, 4].filter((d) => allQuestions.some((q) => q.difficulty === d)).map((d) => {
            const stat = tierStats(d);
            const active = d === difficulty;
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: active ? "1px solid #0B2545" : "1px solid var(--lh-border2)",
                  background: active ? "#0B2545" : "var(--lh-card)",
                  color: active ? "#ffffff" : "var(--lh-text)",
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ letterSpacing: 1 }}>{STARS[d]}</span>
                <span style={{ opacity: 0.85 }}>{lang === "ja" ? DIFF_LABEL[d] : DIFF_LABEL_EN[d]}</span>
                <span
                  style={{
                    fontSize: 11.5,
                    padding: "1px 6px",
                    borderRadius: 999,
                    background: active ? "rgba(255,255,255,0.18)" : "var(--lh-soft2)",
                    color: active ? "#ffffff" : "var(--lh-muted)",
                  }}
                >
                  {stat.correct}/{stat.total}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {!current ? (
        <p style={{ color: "var(--lh-muted)", fontSize: 14 }}>
          {reviewMode
            ? t(
                "復習対象の問題はありません(不正解・ブックマークした問題がここに表示されます)。",
                "No questions to review yet (incorrect or bookmarked questions will appear here)."
              )
            : t("この難易度の問題はまだありません。", "No questions at this difficulty yet.")}
        </p>
      ) : (
        <div>
          {/* 進捗ドット */}
          <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
            {questions.map((q, i) => (
              <span
                key={q.id}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    i === qIndex
                      ? "#0B2545"
                      : progress[`${fieldKey}:${q.id}`]
                      ? "#4C8BF5"
                      : "var(--lh-border2)",
                }}
              />
            ))}
          </div>

          <div
            style={{
              border: "1px solid var(--lh-border)",
              borderRadius: 6,
              padding: "24px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: "var(--lh-muted)" }}>
                Q{qIndex + 1} / {questions.length}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "var(--lh-muted)", letterSpacing: 1 }}>
                  {STARS[current.difficulty]}
                </span>
                <button
                  onClick={toggleBookmark}
                  title={t("ブックマーク", "Bookmark")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                >
                  <Star
                    size={16}
                    strokeWidth={1.8}
                    color={isBookmarked(current) ? "#f5a623" : "var(--lh-muted2)"}
                    fill={isBookmarked(current) ? "#f5a623" : "none"}
                  />
                </button>
              </div>
            </div>
            <p className="lh-serif" style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.6, margin: "0 0 8px" }}>
              {current.question}
            </p>
            {lang === "en" && !current.translated && (
              <p style={{ fontSize: 11.5, color: "var(--lh-muted2)", margin: "0 0 12px", fontStyle: "italic" }}>
                {t("", "(English translation not yet available for this question — shown in Japanese)")}
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              {current.choices.map((c, i) => {
                let bg = "var(--lh-card)";
                let border = "var(--lh-border2)";
                let textColor = "var(--lh-text)";
                if (revealed) {
                  if (i === current.answer) {
                    bg = "#eef6ee";
                    border = "#7fb88a";
                    textColor = "#1f5c2b";
                  } else if (i === selected) {
                    bg = "#fdefee";
                    border = "#d98a83";
                    textColor = "#8c2d24";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => selectChoice(i)}
                    style={{
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: 5,
                      border: `1px solid ${border}`,
                      background: bg,
                      color: textColor,
                      fontSize: 14,
                      cursor: revealed ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "1px solid currentColor",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                      }}
                    >
                      {revealed && i === current.answer ? (
                        <Check size={12} strokeWidth={2.5} />
                      ) : revealed && i === selected ? (
                        <X size={12} strokeWidth={2.5} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    {c}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div
                style={{
                  marginTop: 18,
                  padding: "12px 14px",
                  background: "var(--lh-hover)",
                  borderRadius: 5,
                  fontSize: 13,
                  color: "var(--lh-text)",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "#0B2545" }}>{t("解説", "Explanation")}: </strong>
                {expText(current)}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 20 }}>
              <button
                onClick={prev}
                disabled={qIndex === 0}
                style={{
                  padding: "10px 30px",
                  borderRadius: 4,
                  border: "1px solid var(--lh-border2)",
                  background: "var(--lh-card)",
                  color: qIndex === 0 ? "var(--lh-border2)" : "var(--lh-text)",
                  fontSize: 13,
                  cursor: qIndex === 0 ? "default" : "pointer",
                }}
              >
                ← {t("前の問題", "Previous")}
              </button>
              <button
                onClick={next}
                disabled={qIndex === questions.length - 1}
                style={{
                  padding: "10px 30px",
                  borderRadius: 4,
                  border: "1px solid #0B2545",
                  background: qIndex === questions.length - 1 ? "var(--lh-soft2)" : "#0B2545",
                  color: qIndex === questions.length - 1 ? "var(--lh-muted2)" : "#ffffff",
                  fontSize: 13,
                  cursor: qIndex === questions.length - 1 ? "default" : "pointer",
                }}
              >
                {t("次の問題", "Next")} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 模擬試験の出題候補。scope は "all" かカテゴリID、mode は
   all（すべて）/ unsolved（まだ正解していない）/ wrong（一度でも間違えた）/ bm（ブックマーク） */
function examPool(scope, mode, progress) {
  const flat = [];
  Object.entries(QUIZ_DATA).forEach(([fieldKey, questions]) => {
    if (scope !== "all" && fieldKey.split(":")[0] !== scope) return;
    questions.forEach((q) => {
      const k = `${fieldKey}:${q.id}`;
      if (mode === "unsolved" && progress[k]) return;
      if (mode === "wrong" && !progress[`wrong:${k}`]) return;
      if (mode === "bm" && !progress[`bm:${k}`]) return;
      flat.push({ ...q, fieldKey });
    });
  });
  return flat;
}

/* 出題候補をシャッフルして count 問を取り出す */
function buildExamQuestions(count, scope = "all", mode = "all", progress = {}) {
  const flat = examPool(scope, mode, progress);
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flat[i], flat[j]] = [flat[j], flat[i]];
  }
  return flat.slice(0, Math.min(count, flat.length));
}

function fieldKeyToLabel(fieldKey, lang) {
  const parts = fieldKey.split(":");
  const cat = CATEGORIES.find((c) => c.id === parts[0]);
  const f = cat?.fields.find((ff) => ff.id === parts[1]);
  const sub = parts[2] ? f?.sub?.find((s) => s.id === parts[2]) : null;
  const target = sub || f;
  if (!target) return fieldKey;
  return lang === "ja" ? target.ja : target.en;
}

function MockExamView({ examQuestions, onFinish, onExit, onProgressUpdate }) {
  const { lang, t } = useContext(AppContext);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [finished, startTime]);

  const rawCurrent = examQuestions[qIndex];
  const current = rawCurrent ? getLocalizedQuestion(rawCurrent, rawCurrent.fieldKey, lang) : null;
  const total = examQuestions.length;

  function selectChoice(idx) {
    if (revealed || !current) return;
    setSelected(idx);
    setRevealed(true);
    setAnswers((a) => ({ ...a, [qIndex]: idx === current.answer }));
    // 分野ごとのクイズと同じキーで記録し、模擬試験の解答も進捗と復習に反映する
    if (onProgressUpdate) {
      const k = `${rawCurrent.fieldKey}:${rawCurrent.id}`;
      onProgressUpdate(idx === current.answer ? k : `wrong:${k}`, true);
    }
  }

  function next() {
    if (qIndex < total - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  }

  const mm = Math.floor(elapsed / 60);
  const ss = String(elapsed % 60).padStart(2, "0");

  if (finished) {
    const correctCount = Object.values(answers).filter(Boolean).length;
    const byCat = {};
    examQuestions.forEach((q, i) => {
      const catId = q.fieldKey.split(":")[0];
      const cat = CATEGORIES.find((c) => c.id === catId);
      const catLabel = lang === "ja" ? cat?.ja : cat?.en;
      if (!byCat[catLabel]) byCat[catLabel] = { total: 0, correct: 0 };
      byCat[catLabel].total += 1;
      if (answers[i]) byCat[catLabel].correct += 1;
    });
    return (
      <div>
        <h1 className="lh-serif" style={{ fontSize: 26, fontWeight: 500, margin: "0 0 4px" }}>
          {t("模擬試験 結果", "Mock Exam Results")}
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--lh-muted)", marginTop: 0, marginBottom: 24 }}>
          {t(`所要時間 ${mm}分${ss}秒`, `Time taken: ${mm}m ${ss}s`)}
        </p>
        <div
          style={{
            border: "1px solid var(--lh-border)",
            borderRadius: 8,
            padding: "28px 24px",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <div className="lh-serif" style={{ fontSize: 42, fontWeight: 600, color: "#0B2545" }}>
            {correctCount} / {total}
          </div>
          <div style={{ fontSize: 13, color: "var(--lh-muted)", marginTop: 4 }}>
            {t("正解数", "Correct answers")} ({Math.round((correctCount / total) * 100)}%)
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--lh-text)", marginBottom: 10 }}>
            {t("カテゴリ別内訳", "Breakdown by category")}
          </div>
          {Object.entries(byCat).map(([label, s], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: "var(--lh-text)", width: 140, flexShrink: 0 }}>{label}</span>
              <span
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--lh-border)",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: `${(s.correct / s.total) * 100}%`,
                    background: "#4C8BF5",
                    borderRadius: 999,
                  }}
                />
              </span>
              <span style={{ fontSize: 11.5, color: "var(--lh-muted)", width: 40, textAlign: "right" }}>
                {s.correct}/{s.total}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onExit}
            style={{
              padding: "10px 18px",
              borderRadius: 4,
              border: "1px solid var(--lh-border2)",
              background: "var(--lh-card)",
              color: "var(--lh-text)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {t("ホームに戻る", "Back to home")}
          </button>
          <button
            onClick={onFinish}
            style={{
              padding: "10px 18px",
              borderRadius: 4,
              border: "1px solid #0B2545",
              background: "#0B2545",
              color: "#ffffff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {t("もう一度挑戦", "Try again")}
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 className="lh-serif" style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
          {t("模擬試験", "Mock Exam")}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--lh-muted)", fontFamily: "monospace" }}>
            ⏱ {mm}:{ss}
          </span>
          <button
            onClick={onExit}
            style={{ background: "none", border: "none", color: "var(--lh-muted)", fontSize: 12.5, cursor: "pointer" }}
          >
            {t("中断", "Quit")}
          </button>
        </div>
      </div>

      <div style={{ height: 4, borderRadius: 999, background: "var(--lh-border)", marginBottom: 20, overflow: "hidden" }}>
        <span
          style={{
            display: "block",
            height: "100%",
            width: `${((qIndex + 1) / total) * 100}%`,
            background: "#4C8BF5",
            borderRadius: 999,
          }}
        />
      </div>

      <div style={{ border: "1px solid var(--lh-border)", borderRadius: 6, padding: "24px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: "var(--lh-muted)" }}>
            Q{qIndex + 1} / {total}
          </span>
          <span
            style={{
              fontSize: 10.5,
              color: "#4C8BF5",
              background: "#eef3fd",
              borderRadius: 999,
              padding: "1px 8px",
            }}
          >
            {fieldKeyToLabel(current.fieldKey, lang)} · {STARS[current.difficulty]}
          </span>
        </div>
        <p className="lh-serif" style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.6, margin: "0 0 20px" }}>
          {current.question}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {current.choices.map((c, i) => {
            let bg = "var(--lh-card)";
            let border = "var(--lh-border2)";
            let textColor = "var(--lh-text)";
            if (revealed) {
              if (i === current.answer) {
                bg = "#eef6ee";
                border = "#7fb88a";
                textColor = "#1f5c2b";
              } else if (i === selected) {
                bg = "#fdefee";
                border = "#d98a83";
                textColor = "#8c2d24";
              }
            }
            return (
              <button
                key={i}
                onClick={() => selectChoice(i)}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: 5,
                  border: `1px solid ${border}`,
                  background: bg,
                  color: textColor,
                  fontSize: 14,
                  cursor: revealed ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid currentColor",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                  }}
                >
                  {revealed && i === current.answer ? (
                    <Check size={12} strokeWidth={2.5} />
                  ) : revealed && i === selected ? (
                    <X size={12} strokeWidth={2.5} />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                {c}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div
            style={{
              marginTop: 18,
              padding: "12px 14px",
              background: "var(--lh-hover)",
              borderRadius: 5,
              fontSize: 13,
              color: "var(--lh-text)",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#0B2545" }}>{t("解説", "Explanation")}: </strong>
            {expText(current)}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button
            onClick={next}
            disabled={!revealed}
            style={{
              padding: "10px 30px",
              borderRadius: 4,
              border: "1px solid #0B2545",
              background: !revealed ? "var(--lh-soft2)" : "#0B2545",
              color: !revealed ? "var(--lh-muted2)" : "#ffffff",
              fontSize: 13,
              cursor: !revealed ? "default" : "pointer",
            }}
          >
            {qIndex === total - 1 ? t("結果を見る", "See results") : t("次の問題", "Next")} →
          </button>
        </div>
      </div>
    </div>
  );
}

/* フィールド（または知識表現サブ項目）の集計: {total, correct} */
function statFor(key, progress) {
  const quiz = QUIZ_DATA[key];
  if (quiz) {
    const correct = quiz.filter((q) => progress[`${key}:${q.id}`]).length;
    return { total: quiz.length, correct, isQuiz: true };
  }
  return { total: 1, correct: progress[key] ? 1 : 0, isQuiz: false };
}

function fieldStat(catId, field, progress) {
  if (field.sub) {
    let total = 0;
    let correct = 0;
    field.sub.forEach((s) => {
      const st = statFor(`${catId}:${field.id}:${s.id}`, progress);
      total += st.total;
      correct += st.correct;
    });
    return { total, correct, isQuiz: true };
  }
  return statFor(`${catId}:${field.id}`, progress);
}

function categoryStat(cat, progress) {
  let total = 0;
  let correct = 0;
  cat.fields.forEach((f) => {
    const st = fieldStat(cat.id, f, progress);
    total += st.total;
    correct += st.correct;
  });
  return { total, correct, accuracy: total > 0 ? correct / total : 0 };
}

function LinguisticsHub() {
  // view: {level:'home'} | {level:'category', catId} | {level:'field', catId, fieldId} | {level:'sub', catId, fieldId, subId}
  const [view, setView] = useState({ level: "home" });
  // 開いている分類・分野を URL に残す（#linguisticshub/<分類>/<分野>/<細目>）
  useNovaHubRoute("linguisticshub",
    view.level === "category" ? [view.catId] : view.level === "field" ? [view.catId, view.fieldId] : view.level === "sub" ? [view.catId, view.fieldId, view.subId] : view.level === "exam" ? ["exam"] : [],
    (p) => {
      const c = CATEGORIES.find((x) => x.id === p[0]);
      const f = c && (c.fields || []).find((x) => x.id === p[1]);
      const sb = f && (f.sub || []).find((x) => x.id === p[2]);
      setView(sb ? { level: "sub", catId: c.id, fieldId: f.id, subId: sb.id } : f ? { level: "field", catId: c.id, fieldId: f.id } : c ? { level: "category", catId: c.id } : { level: "home" });
    });
  const [progress, setProgress] = useState({});
  const [, setLoaded] = useState(false);
  const [categoryTab, setCategoryTab] = useState("fields");
  // 分野ページの「用語集」「見極め」ボタンは { level: "category", tab } で来る
  useEffect(() => { if (view.level === "category" && view.tab) setCategoryTab(view.tab); }, [view]);
  const [fieldTab, setFieldTab] = useState("quiz");
  const [examQuestions, setExamQuestions] = useState(null);

  const [examCfg, setExamCfg] = useState({ count: 20, scope: "all", mode: "all" });
  const startExam = () => {
    setExamQuestions(buildExamQuestions(examCfg.count, examCfg.scope, examCfg.mode, progress));
    setView({ level: "exam" });
  };
  const exitExam = () => {
    setExamQuestions(null);
    setView({ level: "home" });
  };
  const [lang, setLang] = useState(() => (typeof window !== "undefined" && window.__novaLang) || "ja"); // ポータルの言語設定で開く
  const [dark, setDark] = useState(false);
  const [streak, setStreak] = useState(0);

  const t = (ja, en) => (lang === "ja" ? ja : en);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage?.get(STORAGE_KEY);
        let loadedProgress = {};
        if (res?.value) {
          loadedProgress = JSON.parse(res.value);
          setProgress(loadedProgress);
        }
        // 連続学習日数(streak)の計算
        const today = novaLocalDay();
        const lastVisit = loadedProgress["meta:lastVisitDate"];
        let newStreak = loadedProgress["meta:streak"] || 0;
        if (lastVisit !== today) {
          const y = new Date();
          y.setDate(y.getDate() - 1);
          const yesterday = novaLocalDay(y);
          newStreak = lastVisit === yesterday ? newStreak + 1 : 1;
          const next = { ...loadedProgress, "meta:lastVisitDate": today, "meta:streak": newStreak };
          setProgress(next);
          try {
            await window.storage?.set(STORAGE_KEY, JSON.stringify(next));
          } catch (e) {
            console.error("streak save failed", e);
          }
        }
        setStreak(newStreak);
      } catch (e) {
        // 初回はキーが無いため何もしない
        setStreak(1);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = async (next) => {
    setProgress(next);
    try {
      await window.storage?.set(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("progress save failed", e);
    }
  };

  const markDone = (key) => {
    const next = { ...progress, [key]: !progress[key] };
    persist(next);
  };

  const setQuizAnswer = (key, val) => {
    if (progress[key] === val) return;
    const next = { ...progress, [key]: val };
    persist(next);
  };

  const category = useMemo(() => CATEGORIES.find((c) => c.id === view.catId), [view.catId]);
  const field = useMemo(() => category?.fields.find((f) => f.id === view.fieldId), [category, view.fieldId]);
  const subField = useMemo(() => field?.sub?.find((s) => s.id === view.subId), [field, view.subId]);

  const goHome = () => setView({ level: "home" });
  const goCategory = (catId) => {
    setCategoryTab("fields");
    setView({ level: "category", catId });
  };
  const goField = (catId, fieldId) => setView({ level: "field", catId, fieldId });
  const goSub = (catId, fieldId, subId) => {
    setFieldTab("quiz");
    setView({ level: "sub", catId, fieldId, subId });
  };

  const totalDoneAll = CATEGORIES.reduce((sum, c) => sum + categoryStat(c, progress).correct, 0);

  const [globalGlossaryQuery, setGlobalGlossaryQuery] = useState("");
  const allGlossaryFlat = useMemo(() => {
    const flat = [];
    CATEGORIES.forEach((c) => {
      (GLOSSARY_DATA[c.id] || []).forEach((term) => {
        flat.push({ ...term, catId: c.id, catJa: c.ja });
      });
    });
    return flat;
  }, []);
  const globalGlossaryResults = useMemo(() => {
    const q = globalGlossaryQuery.trim().toLowerCase();
    if (!q) return [];
    return allGlossaryFlat.filter(
      (term) => term.ja.toLowerCase().includes(q) || term.en.toLowerCase().includes(q) || term.def.toLowerCase().includes(q)
    );
  }, [globalGlossaryQuery, allGlossaryFlat]);

  /* クイズ問題文も横断検索できるようにフラット化 */
  const allQuizFlat = useMemo(() => {
    const flat = [];
    Object.entries(QUIZ_DATA).forEach(([key, questions]) => {
      const parts = key.split(":");
      const catId = parts[0];
      const fieldId = parts[1];
      const subId = parts[2];
      const cat = CATEGORIES.find((c) => c.id === catId);
      const f = cat?.fields.find((ff) => ff.id === fieldId);
      const sub = subId ? f?.sub?.find((s) => s.id === subId) : null;
      if (!cat || !f) return;
      questions.forEach((q) => {
        flat.push({
          question: q.question,
          catId,
          fieldId,
          subId,
          catJa: cat.ja,
          fieldJa: sub ? sub.ja : f.ja,
        });
      });
    });
    return flat;
  }, []);
  const globalQuizResults = useMemo(() => {
    const q = globalGlossaryQuery.trim().toLowerCase();
    if (!q) return [];
    return allQuizFlat.filter((item) => item.question.toLowerCase().includes(q)).slice(0, 20);
  }, [globalGlossaryQuery, allQuizFlat]);

  /* 分野の解説（要点・人物・最近の動き）も横断検索できるようにフラット化 */
  const allOverviewFlat = useMemo(() => {
    const flat = [];
    Object.keys(FIELD_OVERVIEW).forEach((key) => {
      const [catId, fieldId, subId] = key.split(":");
      const cat = CATEGORIES.find((c) => c.id === catId);
      const f = cat?.fields.find((ff) => ff.id === fieldId);
      const sub = subId ? f?.sub?.find((x) => x.id === subId) : null;
      if (!cat || !f) return;
      const base = { catId, fieldId, subId, fieldJa: sub ? sub.ja : f.ja, fieldEn: sub ? sub.en : f.en };
      const o = FIELD_OVERVIEW[key];
      (o.concepts || []).forEach((c) => flat.push({ ...base, kind: ["要点", "Concept"], title: c.t, titleEn: c.en, body: c.d, bodyEn: c.dEn }));
      (o.people || []).forEach((pp) => flat.push({ ...base, kind: ["人物", "Person"], title: pp.n, titleEn: pp.en, body: pp.w, bodyEn: pp.wEn }));
      (FIELD_RECENT[key] || []).forEach((r) => flat.push({ ...base, kind: ["最近の動き", "Recent"], title: r.t, titleEn: r.tEn, body: r.d, bodyEn: r.dEn }));
    });
    return flat;
  }, []);
  const globalOverviewResults = useMemo(() => {
    const q = globalGlossaryQuery.trim().toLowerCase();
    if (!q) return [];
    return allOverviewFlat.filter((x) => [x.title, x.titleEn, x.body, x.bodyEn].some((v) => (v || "").toLowerCase().includes(q))).slice(0, 20);
  }, [globalGlossaryQuery, allOverviewFlat]);

  const examPoolSizes = useMemo(() => {
    const out = {};
    ["all", "unsolved", "wrong", "bm"].forEach((m) => (out[m] = examPool(examCfg.scope, m, progress).length));
    return out;
  }, [examCfg.scope, progress]);

  const goToSearchResult = (item) => {
    if (item.subId) goSub(item.catId, item.fieldId, item.subId);
    else goField(item.catId, item.fieldId);
  };

  return (
    <AppContext.Provider value={{ lang, dark, t }}>
      <div className={"lh-root" + (dark ? " dark" : "")}>
        <FontStyles />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
          {/* ヘッダー */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <span
                style={{
                  fontSize: 11.5,
                  letterSpacing: "0.12em",
                  color: "var(--lh-muted2)",
                  textTransform: "uppercase",
                }}
              >
                Linguistics Hub
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                {streak > 1 && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--lh-muted)",
                      background: "var(--lh-soft2)",
                      borderRadius: 999,
                      padding: "4px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    🔥 {t(`${streak}日連続`, `${streak}-day streak`)}
                  </span>
                )}
                <button
                  onClick={() => setLang(lang === "ja" ? "en" : "ja")}
                  title={t("English に切り替え", "Switch to Japanese")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid var(--lh-border2)",
                    background: "var(--lh-card)",
                    color: "var(--lh-text)",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  <Globe size={13} strokeWidth={1.8} />
                  {lang === "ja" ? "EN" : "日本語"}
                </button>
                <button
                  onClick={() => setDark((d) => !d)}
                  title={t("ダークモード切替", "Toggle dark mode")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 8px",
                    borderRadius: 999,
                    border: "1px solid var(--lh-border2)",
                    background: "var(--lh-card)",
                    color: "var(--lh-text)",
                    cursor: "pointer",
                  }}
                >
                  {dark ? <Sun size={14} strokeWidth={1.8} /> : <Moon size={14} strokeWidth={1.8} />}
                </button>
              </div>
            </div>
            <h1
              className="lh-serif"
              style={{
                fontSize: 34,
                fontWeight: 500,
                margin: "6px 0 6px",
                background: "linear-gradient(90deg, #0B2545, #4C8BF5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("Linguistics Hub", "Linguistics Hub")}
            </h1>
            <p style={{ fontSize: 13.5, color: "var(--lh-muted)", margin: 0 }}>
              {t(
                `7カテゴリ・${MAIN_FIELDS}分野（知識表現の細目${TOTAL_FIELDS - MAIN_FIELDS}を含め${TOTAL_FIELDS}項目）を横断する言語学リファレンス ／ 正解累計 ${totalDoneAll} 件`,
                `A linguistics reference spanning 7 categories and ${MAIN_FIELDS} fields (${TOTAL_FIELDS} items incl. ${TOTAL_FIELDS - MAIN_FIELDS} knowledge-representation topics) / ${totalDoneAll} correct answers total`
              )}
            </p>
          </div>

          {/* ホーム: 用語横断検索 + カテゴリ一覧 */}
          {view.level === "home" && (
            <div>
              <div style={{ border: "1px solid var(--lh-border)", borderRadius: 8, padding: "14px 16px", marginBottom: 28, background: "var(--lh-soft)" }}>
                <div className="lh-serif" style={{ fontSize: 15, fontWeight: 600, color: "var(--lh-text)", marginBottom: 10 }}>
                  {t("模擬試験・横断復習", "Mock exam & cross-field review")}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10, fontSize: 12.5, color: "var(--lh-muted)" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {t("範囲", "Scope")}
                    <select
                      value={examCfg.scope}
                      onChange={(e) => setExamCfg({ ...examCfg, scope: e.target.value })}
                      style={{ fontSize: 12.5, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--lh-border2)", background: "var(--lh-bg)", color: "var(--lh-text)" }}
                    >
                      <option value="all">{t("全カテゴリ", "All categories")}</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{lang === "en" ? c.en : c.ja}</option>
                      ))}
                    </select>
                  </label>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {t("問題数", "Questions")}
                    {[10, 20, 40].map((n) => (
                      <button
                        key={n}
                        onClick={() => setExamCfg({ ...examCfg, count: n })}
                        style={{ fontSize: 12, padding: "3px 10px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (examCfg.count === n ? "#0B2545" : "var(--lh-border2)"), background: examCfg.count === n ? "#0B2545" : "transparent", color: examCfg.count === n ? "#fff" : "var(--lh-text)" }}
                      >
                        {n}
                      </button>
                    ))}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                  {[
                    ["all", "すべての問題", "All questions"],
                    ["unsolved", "まだ正解していない問題", "Not yet answered correctly"],
                    ["wrong", "一度でも間違えた問題", "Ever answered wrong"],
                    ["bm", "ブックマークした問題", "Bookmarked"],
                  ].map(([m, ja, en]) => (
                    <button
                      key={m}
                      onClick={() => setExamCfg({ ...examCfg, mode: m })}
                      style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, cursor: "pointer", border: "1px solid " + (examCfg.mode === m ? "#4C8BF5" : "var(--lh-border2)"), background: examCfg.mode === m ? "#eef3fd" : "transparent", color: examCfg.mode === m ? "#0B2545" : "var(--lh-text)" }}
                    >
                      {t(ja, en)} · {examPoolSizes[m]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={startExam}
                  disabled={examPoolSizes[examCfg.mode] === 0}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: 8,
                    border: "1px solid #0B2545",
                    background: examPoolSizes[examCfg.mode] === 0 ? "var(--lh-soft2)" : "linear-gradient(90deg, #0B2545, #4C8BF5)",
                    color: examPoolSizes[examCfg.mode] === 0 ? "var(--lh-muted2)" : "#ffffff",
                    cursor: examPoolSizes[examCfg.mode] === 0 ? "default" : "pointer",
                  }}
                >
                  <span>
                    <span className="lh-serif" style={{ fontSize: 16, fontWeight: 600, display: "block" }}>
                      {t("模擬試験を始める", "Start Mock Exam")}
                    </span>
                    <span style={{ fontSize: 12, opacity: 0.85 }}>
                      {examPoolSizes[examCfg.mode] === 0
                        ? t("この条件に当てはまる問題はまだありません", "No questions match these settings yet")
                        : t(
                            `対象${examPoolSizes[examCfg.mode]}問から${Math.min(examCfg.count, examPoolSizes[examCfg.mode])}問をランダムに出題・タイム計測。解答は分野ごとの進捗にも記録されます`,
                            `${Math.min(examCfg.count, examPoolSizes[examCfg.mode])} random questions from ${examPoolSizes[examCfg.mode]}, timed. Answers also count toward field progress`
                          )}
                    </span>
                  </span>
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>

              <div style={{ marginBottom: 28 }}>
                <input
                  className="lh-input"
                  value={globalGlossaryQuery}
                  onChange={(e) => setGlobalGlossaryQuery(e.target.value)}
                  aria-label={t(
                    "全カテゴリの用語・問題文を検索(例: オントロジー, RDF, 音素)",
                    "Search terms and questions across all categories (e.g. ontology, RDF, phoneme)"
                  )} placeholder={t(
                    "全カテゴリの用語・問題文を検索(例: オントロジー, RDF, 音素)",
                    "Search terms and questions across all categories (e.g. ontology, RDF, phoneme)"
                  )}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "12px 16px",
                    borderRadius: 6,
                    border: "1px solid var(--lh-border2)",
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                    outline: "none",
                  }}
                />
                {globalGlossaryQuery.trim() && (
                  <div style={{ marginTop: 10 }}>
                    <p style={{ fontSize: 12, color: "var(--lh-muted2)", margin: "0 0 4px" }}>
                      {t("用語", "Glossary")} · {globalGlossaryResults.length}
                      {t("件ヒット", " matches")}
                    </p>
                    {globalGlossaryResults.length === 0 ? (
                      <p style={{ fontSize: 13.5, color: "var(--lh-muted)" }}>{t("該当する用語が見つかりません。", "No matching terms found.")}</p>
                    ) : (
                      globalGlossaryResults.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            goCategory(term.catId);
                            setCategoryTab("glossary");
                          }}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "12px 4px",
                            borderBottom: "1px solid var(--lh-border)",
                            background: "none",
                            border: "none",
                            borderBottomWidth: 1,
                            borderBottomStyle: "solid",
                            borderBottomColor: "var(--lh-border)",
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span
                              className="lh-serif"
                              style={{ fontSize: 14.5, fontWeight: 500, color: "var(--lh-text)" }}
                            >
                              {term.ja}
                            </span>
                            <span style={{ fontSize: 12, color: "var(--lh-muted)" }}>{term.en}</span>
                            <span
                              style={{
                                fontSize: 10.5,
                                color: "#4C8BF5",
                                background: "#eef3fd",
                                borderRadius: 999,
                                padding: "1px 8px",
                                marginLeft: "auto",
                              }}
                            >
                              {term.catJa}
                            </span>
                          </div>
                          <div style={{ fontSize: 12.5, color: "var(--lh-muted)", marginTop: 3 }}>{lang === "en" && term.defEn ? term.defEn : term.def}</div>
                        </button>
                      ))
                    )}

                    <p style={{ fontSize: 12, color: "var(--lh-muted2)", margin: "18px 0 4px" }}>
                      {t("分野の解説（要点・人物・最近の動き）", "Field notes (concepts, people, recent work)")} · {globalOverviewResults.length}
                      {t("件ヒット(最大20件)", " matches (up to 20)")}
                    </p>
                    {globalOverviewResults.length === 0 ? (
                      <p style={{ fontSize: 13.5, color: "var(--lh-muted)" }}>{t("該当する解説が見つかりません。", "No matching notes found.")}</p>
                    ) : (
                      globalOverviewResults.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => goToSearchResult(item)}
                          style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 4px", background: "none", border: "none", borderBottom: "1px solid var(--lh-border)", cursor: "pointer" }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 10.5, color: "var(--lh-muted)", border: "1px solid var(--lh-border2)", borderRadius: 4, padding: "0 5px", flexShrink: 0 }}>{t(item.kind[0], item.kind[1])}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--lh-text)" }}>{lang === "en" ? item.titleEn : item.title}</span>
                            <span style={{ fontSize: 10.5, color: "#4C8BF5", background: "#eef3fd", borderRadius: 999, padding: "1px 8px", marginLeft: "auto", flexShrink: 0 }}>{lang === "en" ? item.fieldEn : item.fieldJa}</span>
                          </div>
                          <div style={{ fontSize: 12.5, color: "var(--lh-muted)", marginTop: 3 }}>{lang === "en" ? item.bodyEn : item.body}</div>
                        </button>
                      ))
                    )}

                    <p style={{ fontSize: 12, color: "var(--lh-muted2)", margin: "18px 0 4px" }}>
                      {t("クイズ問題", "Quiz Questions")} · {globalQuizResults.length}
                      {t("件ヒット(最大20件)", " matches (up to 20)")}
                    </p>
                    {globalQuizResults.length === 0 ? (
                      <p style={{ fontSize: 13.5, color: "var(--lh-muted)" }}>
                        {t("該当する問題が見つかりません。", "No matching questions found.")}
                      </p>
                    ) : (
                      globalQuizResults.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => goToSearchResult(item)}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "12px 4px",
                            borderBottom: "1px solid var(--lh-border)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 13, color: "var(--lh-text)", lineHeight: 1.5 }}>{item.question}</span>
                            <span
                              style={{
                                fontSize: 10.5,
                                color: "#4C8BF5",
                                background: "#eef3fd",
                                borderRadius: 999,
                                padding: "1px 8px",
                                marginLeft: "auto",
                                flexShrink: 0,
                              }}
                            >
                              {item.fieldJa}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {!globalGlossaryQuery.trim() &&
                CATEGORIES.map((cat, i) => {
                const stat = categoryStat(cat, progress);
                return (
                  <IndexRow
                    key={cat.id}
                    index={i}
                    total={CATEGORIES.length}
                    jaLabel={cat.ja}
                    enLabel={cat.en}
                    meta={`${stat.correct}/${stat.total}`}
                    accuracy={stat.total > 0 ? stat.accuracy : null}
                    done={stat.total > 0 && stat.correct === stat.total}
                    Icon={cat.Icon}
                    onClick={() => goCategory(cat.id)}
                  />
                );
              })}
          </div>
        )}

        {/* カテゴリ: 分野一覧 */}
        {view.level === "category" && category && (
          <div>
            <Breadcrumb
              items={[
                { label: t("言語学", "Linguistics"), target: { level: "home" } },
                { label: category.ja },
              ]}
              onNavigate={goHome}
            />
            <h2 className="lh-serif" style={{ fontSize: 26, fontWeight: 500, margin: "0 0 4px" }}>
              {category.ja}
            </h2>
            <p style={{ fontSize: 13, color: "#5F6B80", marginTop: 0, marginBottom: 20 }}>{category.en}</p>

            <CategoryTabBar active={categoryTab} onChange={setCategoryTab} />

            {categoryTab === "fields" &&
              category.fields.map((f, i) => {
                const st = fieldStat(category.id, f, progress);
                const meta = f.sub
                  ? `${f.sub.length}サブ項目・${st.correct}/${st.total}問正解`
                  : st.isQuiz
                  ? `${st.total}問・${st.correct}問正解`
                  : undefined;
                return (
                  <IndexRow
                    key={f.id}
                    index={i}
                    total={category.fields.length}
                    jaLabel={f.ja}
                    enLabel={f.en}
                    meta={meta}
                    done={st.total > 0 && st.correct === st.total}
                    onClick={() => goField(category.id, f.id)}
                  />
                );
              })}

            {categoryTab === "compare" && <ComparisonTable cat={category} />}
            {categoryTab === "diagram" && (
              <div style={{ padding: "20px 0" }}>
                <CategoryDiagram cat={category} />
              </div>
            )}
            {categoryTab === "confusion" && <ConfusionList cat={category} />}
            {categoryTab === "glossary" && <GlossaryList cat={category} />}
          </div>
        )}

        {/* 分野: クイズがあればQuizView、なければプレースホルダー */}
        {view.level === "field" && category && field && !field.sub && (
          (() => {
            const key = `${category.id}:${field.id}`;
            const quiz = QUIZ_DATA[key];
            const DiagramComp = FIELD_DIAGRAMS[key];
            const breadcrumbItems = [
              { label: t("言語学", "Linguistics"), target: { level: "home" } },
              { label: category.ja, target: { level: "category", catId: category.id } },
              { label: field.ja },
            ];
            if (quiz && DiagramComp) {
              return (
                <div>
                  <Breadcrumb items={breadcrumbItems} onNavigate={(target) => setView(target)} />
                  <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                    {[
                      { id: "quiz", label: t("クイズ", "Quiz") },
                      { id: "diagram", label: t("図解", "Diagram") },
                    ].map((tb) => (
                      <button
                        key={tb.id}
                        onClick={() => setFieldTab(tb.id)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 999,
                          border: fieldTab === tb.id ? "1px solid #0B2545" : "1px solid var(--lh-border2)",
                          background: fieldTab === tb.id ? "#0B2545" : "var(--lh-card)",
                          color: fieldTab === tb.id ? "#ffffff" : "var(--lh-text)",
                          fontSize: 12.5,
                          cursor: "pointer",
                        }}
                      >
                        {tb.label}
                      </button>
                    ))}
                  </div>
                  {fieldTab === "diagram" ? (
                    <div>
                      <h2 className="lh-serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px" }}>
                        {field.ja}
                      </h2>
                      <p style={{ fontSize: 12.5, color: "var(--lh-muted)", marginTop: 0, marginBottom: 20 }}>{field.en}</p>
                      <div style={{ padding: "16px 0" }}>
                        <DiagramComp />
                      </div>
                    </div>
                  ) : (
                    <QuizView
                      fieldKey={key}
                      ja={field.ja}
                      en={field.en}
                      allQuestions={quiz}
                      breadcrumbItems={null}
                      onNavigate={(target) => setView(target)}
                      progress={progress}
                      onProgressUpdate={setQuizAnswer}
                    />
                  )}
                </div>
              );
            }
            if (quiz) {
              return (
                <QuizView
                  fieldKey={key}
                  ja={field.ja}
                  en={field.en}
                  allQuestions={quiz}
                  breadcrumbItems={breadcrumbItems}
                  onNavigate={(target) => setView(target)}
                  progress={progress}
                  onProgressUpdate={setQuizAnswer}
                />
              );
            }
            return (
              <PlaceholderDetail
                ja={field.ja}
                en={field.en}
                done={!!progress[key]}
                onMarkDone={() => markDone(key)}
                breadcrumbItems={breadcrumbItems}
                onNavigate={(target) => setView(target)}
              />
            );
          })()
        )}

        {/* 分野に知識表現のようなサブ項目がある場合: サブ項目一覧 */}
        {view.level === "field" && category && field && field.sub && (
          <div>
            <Breadcrumb
              items={[
                { label: t("言語学", "Linguistics"), target: { level: "home" } },
                { label: category.ja, target: { level: "category", catId: category.id } },
                { label: field.ja },
              ]}
              onNavigate={(target) => setView(target)}
            />
            <h2 className="lh-serif" style={{ fontSize: 26, fontWeight: 500, margin: "0 0 4px" }}>
              {field.ja}
            </h2>
            <p style={{ fontSize: 13, color: "#5F6B80", marginTop: 0, marginBottom: 28 }}>{field.en}</p>
            {field.sub.map((s, i) => {
              const key = `${category.id}:${field.id}:${s.id}`;
              const st = statFor(key, progress);
              return (
                <IndexRow
                  key={s.id}
                  index={i}
                  total={field.sub.length}
                  jaLabel={s.ja}
                  enLabel={s.en}
                  meta={st.isQuiz ? `${st.total}問・${st.correct}問正解` : undefined}
                  done={st.total > 0 && st.correct === st.total}
                  onClick={() => goSub(category.id, field.id, s.id)}
                />
              );
            })}
          </div>
        )}

        {/* サブ項目詳細(知識表現配下) */}
        {view.level === "sub" && category && field && subField && (
          (() => {
            const key = `${category.id}:${field.id}:${subField.id}`;
            const quiz = QUIZ_DATA[key];
            const DiagramComp = FIELD_DIAGRAMS[key];
            const breadcrumbItems = [
              { label: t("言語学", "Linguistics"), target: { level: "home" } },
              { label: category.ja, target: { level: "category", catId: category.id } },
              { label: field.ja, target: { level: "field", catId: category.id, fieldId: field.id } },
              { label: subField.ja },
            ];

            if (quiz && DiagramComp) {
              return (
                <div>
                  <Breadcrumb items={breadcrumbItems} onNavigate={(target) => setView(target)} />
                  <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                    {[
                      { id: "quiz", label: t("クイズ", "Quiz") },
                      { id: "diagram", label: t("図解", "Diagram") },
                    ].map((tb) => (
                      <button
                        key={tb.id}
                        onClick={() => setFieldTab(tb.id)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 999,
                          border: fieldTab === tb.id ? "1px solid #0B2545" : "1px solid var(--lh-border2)",
                          background: fieldTab === tb.id ? "#0B2545" : "var(--lh-card)",
                          color: fieldTab === tb.id ? "#ffffff" : "var(--lh-text)",
                          fontSize: 12.5,
                          cursor: "pointer",
                        }}
                      >
                        {tb.label}
                      </button>
                    ))}
                  </div>
                  {fieldTab === "diagram" ? (
                    <div>
                      <h2 className="lh-serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px" }}>
                        {subField.ja}
                      </h2>
                      <p style={{ fontSize: 12.5, color: "var(--lh-muted)", marginTop: 0, marginBottom: 20 }}>{subField.en}</p>
                      <div style={{ padding: "16px 0" }}>
                        <DiagramComp />
                      </div>
                    </div>
                  ) : (
                    <QuizView
                      fieldKey={key}
                      ja={subField.ja}
                      en={subField.en}
                      allQuestions={quiz}
                      breadcrumbItems={null}
                      onNavigate={(target) => setView(target)}
                      progress={progress}
                      onProgressUpdate={setQuizAnswer}
                      hideBreadcrumb
                    />
                  )}
                </div>
              );
            }

            if (quiz) {
              return (
                <QuizView
                  fieldKey={key}
                  ja={subField.ja}
                  en={subField.en}
                  allQuestions={quiz}
                  breadcrumbItems={breadcrumbItems}
                  onNavigate={(target) => setView(target)}
                  progress={progress}
                  onProgressUpdate={setQuizAnswer}
                />
              );
            }
            return (
              <PlaceholderDetail
                ja={subField.ja}
                en={subField.en}
                done={!!progress[key]}
                onMarkDone={() => markDone(key)}
                breadcrumbItems={breadcrumbItems}
                onNavigate={(target) => setView(target)}
              />
            );
          })()
        )}

        {view.level === "exam" && examQuestions && (
          <MockExamView
            examQuestions={examQuestions}
            onFinish={startExam}
            onExit={exitExam}
            onProgressUpdate={setQuizAnswer}
          />
        )}

        {view.level !== "home" && view.level !== "exam" && (
          <div style={{ marginTop: 40 }}>
            <button
              onClick={goHome}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                color: "var(--lh-muted)",
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
              }}
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              {t("ホームに戻る", "Back to home")}
            </button>
          </div>
        )}
        </div>
      </div>
    </AppContext.Provider>
  );
}
  // ポータルの目次タグに分野数を出すため。
  LinguisticsHub.FIELD_STATS = { cats: CATEGORIES.length, fields: CATEGORIES.reduce((a, c) => a + (c.fields || []).length, 0) };
  // 弱点レーダー用：進捗（"分類:分野:問題id" = 正解済み、"wrong:分類:分野:問題id" = 間違えた）から分類ごとの解答数・正解数を数える
  LinguisticsHub.WEAK_TABLE = (prog) => {
    if (!prog || typeof prog !== "object") return [];
    const cats = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
    const subIds = new Set();
    CATEGORIES.forEach((c) => (c.fields || []).forEach((f) => (f.sub || []).forEach((sb) => subIds.add(c.id + ":" + f.id + ":" + sb.id))));
    const att = {}, ok = {};
    Object.entries(prog).forEach(([k, v]) => {
      if (v !== true) return;
      const wrong = k.startsWith("wrong:");
      const base = wrong ? k.slice(6) : k;
      const seg = base.split(":");
      if (seg.length < 3 || !cats[seg[0]] || subIds.has(base) || !(cats[seg[0]].fields || []).some((f) => f.id === seg[1])) return;
      (att[seg[0]] = att[seg[0]] || new Set()).add(base);
      if (!wrong) (ok[seg[0]] = ok[seg[0]] || new Set()).add(base);
    });
    return Object.keys(att).map((cid) => ({ dom: [cats[cid].ja, cats[cid].en], a: att[cid].size, c: ok[cid] ? ok[cid].size : 0 }));
  };
  // ポータルの横断検索に出す分類・分野
  LinguisticsHub.PORTAL_INDEX = (en) => {
    const out = [];
    CATEGORIES.forEach((c) => {
      out.push({ label: en ? c.en : c.ja, sub: en ? "Linguistics category" : "Linguistics の分類", hash: "linguisticshub/" + c.id, extra: [c.ja, c.en].join(" ") });
      (c.fields || []).forEach((f) => out.push({ label: en ? (f.en || f.ja) : f.ja, sub: "Linguistics · " + (en ? c.en : c.ja), hash: "linguisticshub/" + c.id + "/" + f.id, extra: [f.ja, f.en].join(" ") }));
    });
    return out;
  };
  return LinguisticsHub;
})();

// ================================================================
// Project-Nova : Portal Shell (v4)
// 3つの独立ハブ(Finance / MegaTech / Consulting)への統一入口。
// 各ハブのソースは無改変・IIFE名前空間で分離済み(上部参照)。
// ================================================================

const NOVA_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,480;1,9..144,420&family=Inter:wght@400;500;600&display=swap');
`;

const NOVA = {
  bg: "#FFFFFF",
  panel: "#F4F7FB",
  panelSoft: "#EEF3FA",
  line: "#DEE5EF",
  ink: "#0E1E38",
  sub: "#5B6B85",
  faint: "#A9B4C6",
  accent: "#1B4B8C",
  finance: "#123A6B",
  megatech: "#1F6FB0",
  consulting: "#3E8FD6",
  certification: "#0A2E52",
  languagehub: "#6BB6E0",
  linguisticshub: "#2A5C87",
  booksummary: "#173D63",
  tracker: "#4f46e5",
  amt: "#2f6bff",
  training: "#1E7A6E",
  liberalarts: "#8A5A2B",
  sidework: "#2563EB",
};

const NOVA_SERIF = '"Fraunces", Georgia, "Hiragino Mincho ProN", serif';
const NOVA_SANS = '"Inter", -apple-system, "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif';

const NOVA_L = {
  ja: {
    masthead: "PROJECT NOVA",
    index: "INDEX",
    enter: "入る",
    langBtn: "EN",
    back: "ポータルへ",
  },
  en: {
    masthead: "PROJECT NOVA",
    index: "INDEX",
    enter: "Enter",
    langBtn: "JA",
    back: "Portal",
  },
};

// ---- Pictograms (line-art, single stroke color inherited via `color`) ----
function IconFinance({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <path d="M7 33V21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 33V14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M27 33V7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M33 33H5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M22 9L27 5L31 10" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMegatech({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <circle cx="20" cy="9" r="3.2" stroke={color} strokeWidth="1.6" />
      <circle cx="8" cy="30" r="3.2" stroke={color} strokeWidth="1.6" />
      <circle cx="32" cy="30" r="3.2" stroke={color} strokeWidth="1.6" />
      <circle cx="20" cy="21" r="2.2" stroke={color} strokeWidth="1.6" />
      <path d="M20 12.2V18.8" stroke={color} strokeWidth="1.6" />
      <path d="M10.6 28L17.8 22.6" stroke={color} strokeWidth="1.6" />
      <path d="M29.4 28L22.2 22.6" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function IconConsulting({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <path d="M20 6L33 28H7L20 6Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 34L7 12H33L20 34Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconCert({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <path
        d="M20 5L32 9.5V18.5C32 26.5 27 32 20 35C13 32 8 26.5 8 18.5V9.5L20 5Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14.5 19.5L18.5 23.5L26 14.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLanguage({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.6" />
      <path d="M6 20H34" stroke={color} strokeWidth="1.6" />
      <path d="M20 6C24.5 10.5 24.5 29.5 20 34C15.5 29.5 15.5 10.5 20 6Z" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function IconSideWork({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <rect x="6" y="9" width="28" height="19" rx="3" stroke={color} strokeWidth="1.6" />
      <path d="M17 14.5v8l7-4-7-4Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 33h14M20 28v5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLiberal({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <path d="M6 14L20 7l14 7-14 7-14-7Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 18v8c0 2 3.6 4.5 8 4.5s8-2.5 8-4.5v-8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M34 14v9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLinguistics({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <circle cx="20" cy="7" r="2.4" stroke={color} strokeWidth="1.6" />
      <path d="M20 9.4V15" stroke={color} strokeWidth="1.6" />
      <path d="M20 15L10 15" stroke={color} strokeWidth="1.6" />
      <path d="M20 15L30 15" stroke={color} strokeWidth="1.6" />
      <path d="M10 15V20" stroke={color} strokeWidth="1.6" />
      <path d="M30 15V20" stroke={color} strokeWidth="1.6" />
      <circle cx="10" cy="23" r="2.4" stroke={color} strokeWidth="1.6" />
      <circle cx="30" cy="23" r="2.4" stroke={color} strokeWidth="1.6" />
      <path d="M6 33L10 25.4" stroke={color} strokeWidth="1.6" />
      <path d="M14 33L10 25.4" stroke={color} strokeWidth="1.6" />
      <path d="M26 33L30 25.4" stroke={color} strokeWidth="1.6" />
      <path d="M34 33L30 25.4" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function IconBook({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <path d="M20 10C17 7.5 12 6.5 7 7V29C12 28.5 17 29.5 20 32" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 10C23 7.5 28 6.5 33 7V29C28 28.5 23 29.5 20 32" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 10V32" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}
function IconTracker({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <rect x="9" y="8" width="22" height="26" rx="3" stroke={color} strokeWidth="1.6" />
      <path d="M15 6.5h10v4H15z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14.5 18.5l2 2 4-4M14.5 26l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 18.5h3M24 26h3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconTraining({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <rect x="6" y="13" width="5" height="14" rx="1.5" stroke={color} strokeWidth="1.6" />
      <rect x="29" y="13" width="5" height="14" rx="1.5" stroke={color} strokeWidth="1.6" />
      <path d="M3 17v6M37 17v6M11 20h18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 31h10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconMemo({ color, size }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <path d="M10 7h14l6 6v20a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M24 7v6h6" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 20h12M14 25h12M14 30h8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// 目次タグの数字は各ハブの実データから数える。手書きのタグは、
// Book-Summary に YouTube・note を足しても「flier・Kindle・YouTube」のままだった。
let __novaStats = null;
const novaStats = () => {
  if (__novaStats) return __novaStats;
  const hs = __NOVA_HUB_STATS__;
  const sum = (rows) => rows.reduce((a, r) => a + r.qn, 0);
  __novaStats = {
    books: hs.books, yt: hs.yt, note: hs.note, flier: hs.flier, listOnly: hs.listOnly,
    mega: sum(BOOTCAMP_QUEST.mega), cons: sum(BOOTCAMP_QUEST.cons),
    tabs: MegaTechHubModule.TAB_COUNT, ling: LinguisticsHubModule.FIELD_STATS,
    la: hs.la,
  };
  return __novaStats;
};
const nf = (n) => Number(n).toLocaleString();
