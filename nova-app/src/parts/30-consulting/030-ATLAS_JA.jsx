// @@nova-part 30-consulting/030-ATLAS_JA.jsx

const GLOSSARY = [
  { d: 0, t: "MECE", e: "MECE", dj: "モレなくダブりなく。分解の網羅性と排他性を保証する原則。", de: "Mutually Exclusive, Collectively Exhaustive — no gaps, no overlaps." },
  { d: 0, t: "ピラミッド原則", e: "Pyramid Principle", dj: "結論を頂点に、根拠をMECEに配置する文章・思考構造(バーバラ・ミント)。", de: "Minto's structure: answer on top, MECE support below." },
  { d: 0, t: "イシューツリー", e: "Issue Tree", dj: "主要な問いをMECEなサブ論点へ分解する樹形図。", de: "A tree decomposing the key question into MECE sub-issues." },
  { d: 0, t: "仮説思考", e: "Hypothesis-Driven Thinking", dj: "先に仮の答えを置き、検証に分析を集中させる思考法。", de: "Form a tentative answer first; focus analysis on verifying it." },
  { d: 0, t: "論点思考", e: "Issue-Based Thinking", dj: "解くべき問題(論点)そのものを見極める思考(内田和成)。", de: "Identifying which problem is worth solving (Uchida)." },
  { d: 0, t: "空・雨・傘", e: "Sky-Rain-Umbrella", dj: "事実→解釈→行動を区別するマッキンゼー流の基本枠組み。", de: "McKinsey's fact → interpretation → action discipline." },
  { d: 0, t: "So What? / Why So?", e: "So What? / Why So?", dj: "示唆抽出と根拠検証を往復させる垂直論理の問い。", de: "Paired questions linking claims and support vertically." },
  { d: 0, t: "演繹法", e: "Deduction", dj: "一般則を個別事例に適用する推論。前提が真なら結論も真。", de: "Applying general rules to specifics; truth-preserving." },
  { d: 0, t: "帰納法", e: "Induction", dj: "複数の観察から一般則を導く推論。一般化の飛躍リスクあり。", de: "Generalizing from observations; risks overgeneralization." },
  { d: 0, t: "SCQ", e: "SCQ Framework", dj: "状況→複雑化→問いで導入を組むミントの型。", de: "Situation → Complication → Question introduction framing." },
  { d: 0, t: "Answer First", e: "Answer First", dj: "結論から話すベイン流コミュニケーション原則。", de: "Bain's conclusion-first communication norm." },
  { d: 0, t: "Day 1仮説", e: "Day 1 Hypothesis", dj: "プロジェクト初日に置く暫定的な答え。", de: "A tentative answer formed on the project's first day." },
  { d: 0, t: "80/20ルール", e: "80/20 Rule (Pareto)", dj: "少数の要因が成果の大半を生むという経験則。", de: "A vital few drivers produce most of the results." },
  { d: 0, t: "エレベーターテスト", e: "Elevator Test", dj: "30秒で提言の核心を語れるかを試すマッキンゼーの規律。", de: "Can you convey the recommendation in 30 seconds?" },
  { d: 1, t: "確証バイアス", e: "Confirmation Bias", dj: "自説に合う情報だけ集め、反証を無視する傾向。", de: "Seeking confirming evidence, ignoring disconfirming data." },
  { d: 1, t: "アンカリング", e: "Anchoring", dj: "最初の数値に判断が引きずられる効果。", de: "Judgments biased toward an initial reference number." },
  { d: 1, t: "サンクコストの誤謬", e: "Sunk Cost Fallacy", dj: "回収不能な過去コストに固執して撤退できない誤り。", de: "Letting unrecoverable past costs drive future decisions." },
  { d: 1, t: "生存者バイアス", e: "Survivorship Bias", dj: "生き残った事例だけを見て全体を誤認する偏り。", de: "Judging from survivors while missing the failures." },
  { d: 1, t: "利用可能性ヒューリスティック", e: "Availability Heuristic", dj: "想起しやすい事例を過大評価する傾向。", de: "Overweighting easily recalled examples." },
  { d: 1, t: "基準率の無視", e: "Base Rate Neglect", dj: "事前確率を無視して個別情報だけで判断する誤り。", de: "Ignoring prior probabilities when judging cases." },
  { d: 1, t: "ハロー効果", e: "Halo Effect", dj: "一つの目立つ属性が全体評価を歪める効果。", de: "One salient trait distorting overall evaluation." },
  { d: 1, t: "フレーミング効果", e: "Framing Effect", dj: "同一情報でも提示の枠組みで選好が変わる現象。", de: "Choices flipping with how identical facts are framed." },
  { d: 1, t: "集団思考", e: "Groupthink", dj: "結束の強い集団で異論が抑圧され誤った合意に至る現象。", de: "Cohesion suppressing dissent, yielding flawed consensus." },
  { d: 1, t: "ストローマン", e: "Straw Man", dj: "相手の主張を歪めた別物に反論する誤謬。", de: "Rebutting a distorted version of the opponent's claim." },
  { d: 1, t: "対人論証", e: "Ad Hominem", dj: "主張でなく発言者の属性を攻撃する誤謬。", de: "Attacking the speaker instead of the argument." },
  { d: 1, t: "誤った二分法", e: "False Dichotomy", dj: "実際は他の選択肢があるのに二択に絞る誤謬。", de: "Presenting two options when more exist." },
  { d: 1, t: "滑り坂論法", e: "Slippery Slope", dj: "根拠なく極端な帰結へ連鎖すると主張する誤謬。", de: "Claiming an inevitable chain to extremes without evidence." },
  { d: 1, t: "前後即因果の誤謬", e: "Post Hoc Fallacy", dj: "時間的前後関係を因果関係と誤認する誤り。", de: "Mistaking sequence for causation." },
  { d: 1, t: "交絡因子", e: "Confounder", dj: "2変数の相関を生み出す隠れた第三の要因。", de: "A hidden third factor creating spurious correlation." },
  { d: 1, t: "外部視点", e: "Outside View", dj: "類似事例の統計(参照クラス)から予測を補正する方法。", de: "Correcting forecasts with reference-class statistics." },
  { d: 2, t: "水平思考", e: "Lateral Thinking", dj: "前提を変え、別の出発点から発想するデボノの思考法。", de: "De Bono's method of shifting assumptions to new starting points." },
  { d: 2, t: "垂直思考", e: "Vertical Thinking", dj: "論理を一方向に深掘りする伝統的思考。", de: "Traditional step-by-step logical deepening." },
  { d: 2, t: "6つの帽子", e: "Six Thinking Hats", dj: "白(事実)黒(リスク)黄(利点)赤(感情)緑(創造)青(進行)で思考を分業する会議手法。", de: "Parallel thinking: White facts, Black risks, Yellow benefits, Red feelings, Green ideas, Blue process." },
  { d: 2, t: "PO(挑発)", e: "PO (Provocation)", dj: "真偽を問わない挑発的仮定で思考を強制移動させる操作。", de: "A provocative statement used for movement, not truth." },
  { d: 2, t: "ランダム刺激法", e: "Random Entry", dj: "無関係な単語と課題を強制結合して発想する技法。", de: "Forcing links between a random word and the problem." },
  { d: 2, t: "概念扇", e: "Concept Fan", dj: "具体案を上位概念に戻し、別の具体案へ展開する図法。", de: "Abstract to concepts, then fan out to new alternatives." },
  { d: 2, t: "問題の再定義", e: "Problem Reframing", dj: "問いの枠組み自体を変えて解空間を広げる操作。", de: "Changing the problem frame to expand the solution space." },
  { d: 2, t: "移動価値", e: "Movement Value", dj: "挑発から実用案へ橋渡しする際の評価基準。", de: "Judging ideas by where they can take you, not truth." },
  { d: 3, t: "ブレインストーミング", e: "Brainstorming", dj: "批判厳禁・質より量で発散するオズボーンの集団発想法。", de: "Osborn's group ideation: no criticism, quantity first." },
  { d: 3, t: "SCAMPER", e: "SCAMPER", dj: "代用・結合・応用・修正・転用・削除・逆転の7つの問い。", de: "Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse." },
  { d: 3, t: "デザイン思考", e: "Design Thinking", dj: "共感→定義→発想→試作→検証の人間中心プロセス。", de: "Empathize → Define → Ideate → Prototype → Test." },
  { d: 3, t: "TRIZ", e: "TRIZ", dj: "技術的矛盾を40の発明原理で解く体系(アルトシュラー)。", de: "Altshuller's system resolving contradictions via 40 principles." },
  { d: 3, t: "アナロジー思考", e: "Analogical Thinking", dj: "他分野の構造を抽象化し自分の課題へ転写する発想法。", de: "Abstracting structures from other domains and mapping them over." },
  { d: 3, t: "KJ法", e: "KJ Method (Affinity)", dj: "カード化した情報を類似で群化し構造を発見する手法。", de: "Grouping carded data by affinity to discover structure." },
  { d: 3, t: "ブレインライティング", e: "Brainwriting (6-3-5)", dj: "6人×3案×5分の沈黙筆記で案を回覧・発展させる手法。", de: "6 people × 3 ideas × 5 minutes of silent writing, passed around." },
  { d: 3, t: "発散と収束", e: "Divergence & Convergence", dj: "広げる思考と絞る思考。時間的に分離するのが鉄則。", de: "Expanding vs narrowing; keep them separated in time." },
  { d: 3, t: "HMW", e: "How Might We", dj: "「どうすれば〜できるか?」形式の発想を開く問い。", de: "'How might we…?' — an open, generative question format." },
  { d: 4, t: "3C", e: "3C Analysis", dj: "顧客・競合・自社で事業環境を俯瞰する枠組み。", de: "Customer, Competitor, Company view of the business." },
  { d: 4, t: "4P", e: "Marketing 4Ps", dj: "製品・価格・流通・販促のマーケティング施策の型。", de: "Product, Price, Place, Promotion." },
  { d: 4, t: "5フォース", e: "Five Forces", dj: "業界の構造的収益性を5つの力で診断(ポーター)。", de: "Porter's five forces of structural industry profitability." },
  { d: 4, t: "SWOT", e: "SWOT", dj: "内部(強み/弱み)×外部(機会/脅威)の整理枠。", de: "Internal S/W × external O/T mapping." },
  { d: 4, t: "PEST", e: "PEST", dj: "政治・経済・社会・技術でマクロ環境を走査。", de: "Political, Economic, Social, Technological macro scan." },
  { d: 4, t: "バリューチェーン", e: "Value Chain", dj: "事業活動を主活動・支援活動に分解し価値の源泉を診る。", de: "Decomposing activities to locate value and cost sources." },
  { d: 4, t: "7S", e: "McKinsey 7S", dj: "ハード3S+ソフト4Sで組織の整合性を診断。", de: "Hard 3S + soft 4S organizational alignment model." },
  { d: 4, t: "ドライバーツリー", e: "Driver Tree", dj: "KGIを四則演算で分解し操作可能な変数まで下ろす樹形図。", de: "Arithmetic decomposition of a goal down to actionable levers." },
  { d: 4, t: "TAM/SAM/SOM", e: "TAM/SAM/SOM", dj: "全体市場/獲得可能市場/現実的獲得市場の3階層。", de: "Total, serviceable, and obtainable market layers." },
  { d: 4, t: "STP", e: "STP", dj: "セグメンテーション→ターゲティング→ポジショニング。", de: "Segmentation → Targeting → Positioning." },
  { d: 4, t: "損益分岐点", e: "Break-Even Point", dj: "固定費÷(単価−変動費単価)で求まる採算ライン。", de: "Fixed costs ÷ (price − variable cost per unit)." },
  { d: 4, t: "フェルミ推定", e: "Fermi Estimation", dj: "未知の数量を分解と常識的仮定で概算する技法。", de: "Approximating unknowns via decomposition and sensible assumptions." },
  { d: 0, t: "アブダクション", e: "Abduction", dj: "観察結果を最もよく説明する仮説を推論する。証明でなく仮説生成の道具。", de: "Inferring the best explanation for an observation — a hypothesis generator, not a proof." },
  { d: 0, t: "必要条件と十分条件", e: "Necessary vs Sufficient", dj: "必要=無ければ成立しない、十分=あれば必ず成立する。混同が施策論の最頻出エラー。", de: "Necessary: without it, no; sufficient: with it, always yes. Swapping them is the top initiative-debate error." },
  { d: 0, t: "後件肯定", e: "Affirming the Consequent", dj: "P→QからQを根拠にPを導く形式的誤謬(高ROE→優良企業、など)。", de: "Inferring P from Q given P→Q — e.g., high ROE therefore excellent firm." },
  { d: 0, t: "ガバニングメッセージ", e: "Governing Message", dj: "資料全体を支配する一文の結論。全ページがこれを支える構造にする。", de: "The single sentence ruling the document; every page exists to support it." },
  { d: 0, t: "ゼロベース思考", e: "Zero-Based Thinking", dj: "前年踏襲を排し、目的から資源配分を白紙で積み直す思考法。", de: "Rebuilding allocations from purpose on a blank sheet, rejecting incrementalism." },
  { d: 0, t: "シナリオプランニング", e: "Scenario Planning", dj: "複数の未来に耐える打ち手と早期警戒指標を準備する手法。予測ではない。", de: "Preparing robust moves and tripwires across multiple futures — not forecasting." },
  { d: 0, t: "なぜなぜ分析(5 Whys)", e: "Five Whys", dj: "なぜを繰り返し、制御可能な仕組みの原因まで掘る根本原因分析。", de: "Iterating why until reaching a controllable, systemic cause." },
  { d: 0, t: "論理の飛躍", e: "Logical Leap", dj: "根拠と結論の間の暗黙の前提が欠落・未検証な状態。", de: "A missing or untested hidden premise between evidence and claim." },
  { d: 1, t: "シンプソンのパラドックス", e: "Simpson's Paradox", dj: "集計の粒度(層)を変えると結論が反転する現象。", de: "Conclusions reversing when the aggregation layer changes." },
  { d: 1, t: "計画錯誤", e: "Planning Fallacy", dj: "工期・費用を系統的に楽観視する傾向。外部視点で補正する。", de: "Systematic optimism in schedules and costs; corrected by the outside view." },
  { d: 1, t: "グッドハートの法則", e: "Goodhart's Law", dj: "指標が目標になると指標として機能しなくなる(ゲーミングを誘発)。", de: "When a measure becomes a target, it ceases to be a good measure." },
  { d: 1, t: "マクナマラの誤謬", e: "McNamara Fallacy", dj: "測定できるものだけで判断し、測れない価値を存在しない扱いにする誤り。", de: "Deciding only on the measurable, treating the unmeasured as nonexistent." },
  { d: 1, t: "認知的不協和", e: "Cognitive Dissonance", dj: "決定後、自分の選択を正当化する情報を選好する心理。", de: "Post-decision preference for choice-vindicating information." },
  { d: 1, t: "損失回避", e: "Loss Aversion", dj: "同額でも損失は利得の約2倍重く感じる傾向(プロスペクト理論)。", de: "Losses weigh roughly twice as much as equal gains (prospect theory)." },
  { d: 1, t: "後知恵バイアス", e: "Hindsight Bias", dj: "結果を知った後「最初から分かっていた」と感じる偏り。判断は決定時点の情報で評価する。", de: "'I knew it all along' after the fact; judge decisions on time-of-decision information." },
  { d: 1, t: "平均への回帰", e: "Regression to the Mean", dj: "極端な結果は介入なしでも平均側へ戻りやすい統計的現象。", de: "Extreme results drift back toward the average even without intervention." },
  { d: 1, t: "反証可能性", e: "Falsifiability", dj: "仮説が誤りだと示せる検証手段を持つこと。良い仮説の条件(ポパー)。", de: "A hypothesis must be capable of being proven wrong (Popper)." },
  { d: 2, t: "SIT(体系的発明思考)", e: "SIT (Systematic Inventive Thinking)", dj: "分割・引き算・課題統合・属性依存など、型で発想を生む手法体系。", de: "Templates — division, subtraction, task unification, attribute dependency — that generate ideas systematically." },
  { d: 2, t: "課題統合", e: "Task Unification", dj: "既存の資源に追加の役割を与えるSITの型(カート=広告媒体)。", de: "Giving an existing resource an extra job (cart = ad space)." },
  { d: 2, t: "属性依存", e: "Attribute Dependency", dj: "固定的な属性を別の変数に連動させるSITの型(時間で変わる価格)。", de: "Tying a fixed attribute to a context variable (time-varying prices)." },
  { d: 2, t: "PMI", e: "PMI (Plus / Minus / Interesting)", dj: "判断前に利点・欠点・興味深い点へ注意を強制配分するデボノの技法。", de: "De Bono's tool forcing attention to pluses, minuses, and interesting points before judging." },
  { d: 2, t: "OPV(他者の視点)", e: "OPV (Other People's Views)", dj: "関係者それぞれの得失と反応を体系的に列挙する視点走査の技法。", de: "Systematically enumerating each stakeholder's gains, losses, and reactions." },
  { d: 2, t: "エスケープ", e: "Escape", dj: "業界の当たり前の特徴を1つ消して発想するデボノの挑発の型。", de: "De Bono's provocation template: delete one taken-for-granted trait." },
  { d: 2, t: "バックキャスティング", e: "Backcasting", dj: "あるべき未来を固定し、必要な変化を現在へ逆引きする思考法。", de: "Fix the target future, then derive the required changes backward to today." },
  { d: 2, t: "チェスタトンの柵", e: "Chesterton's Fence", dj: "撤去する前に「なぜ柵があるのか」を理解せよという原則。逆張りの前提検証。", de: "Understand why the fence stands before removing it — the contrarian's due diligence." },
  { d: 3, t: "機能的固着", e: "Functional Fixedness", dj: "物や資産を本来の用途でしか見られない認知の固着(ろうそく問題)。", de: "Seeing objects only in their canonical use (the candle problem)." },
  { d: 3, t: "デザイン固着", e: "Design Fixation", dj: "最初の案に固執して代替案が出なくなる現象。並行複数案で防ぐ。", de: "Clinging to the first concept; prevented by mandatory parallel alternatives." },
  { d: 3, t: "オズの魔法使い型", e: "Wizard of Oz Prototype", dj: "表は自動に見せ裏は人力で回し、需要と体験を先に検証する方式。", de: "Automated-looking front, human-powered back — testing demand before building tech." },
  { d: 3, t: "コンシェルジュMVP", e: "Concierge MVP", dj: "人力サービスだと公言して少数顧客に提供し、価値仮説と業務を学ぶ方式。", de: "Openly hand-delivered service to a few customers, to learn the value hypothesis and workflow." },
  { d: 3, t: "逆ブレインストーミング", e: "Reverse Brainstorming", dj: "問題を悪化させる方法を出し尽くし、反転して防止策に変換する技法。", de: "Generate ways to worsen the problem, then invert each into prevention." },
  { d: 3, t: "リトル・ベッツ", e: "Little Bets", dj: "損失上限を固定した安価な実験を多数打ち、当たりだけ段階増資する戦略。", de: "Many cheap, loss-capped experiments; scale funding only into winners." },
  { d: 3, t: "形態分析法", e: "Morphological Analysis", dj: "属性軸×選択肢の全組合せを機械的に走査して未開拓案を探す手法(ツビッキー)。", de: "Exhaustively scanning attribute-option combinations for untried cells (Zwicky)." },
  { d: 3, t: "ジョブ理論", e: "Jobs to be Done", dj: "顧客は製品でなく「片付けたい用事」を雇うという需要の捉え方。", de: "Customers hire products to get jobs done — demand framed as jobs, not features." },
  { d: 4, t: "デュポン分解", e: "DuPont Decomposition", dj: "ROE=利益率×回転率×レバレッジ。高ROEの中身を暴く分解。", de: "ROE = margin × turnover × leverage — exposing what's inside a good number." },
  { d: 4, t: "ポケットプライス", e: "Pocket Price", dj: "定価から値引・リベート等のリークを引いた実収価格。ばらつきの正当性が論点。", de: "Realized price after all leaks from list; the variance's justification is the issue." },
  { d: 4, t: "PPM", e: "Growth-Share Matrix (BCG)", dj: "市場成長率×相対シェアで事業を4象限に整理し資金配分を議論する枠組み。", de: "Growth × relative share quadrants grounding the cash-allocation debate." },
  { d: 4, t: "ユニットエコノミクス", e: "Unit Economics (LTV/CAC)", dj: "顧客1人あたりの生涯粗利(LTV)と獲得コスト(CAC)の採算構造。目安はLTV/CAC≧3。", de: "Per-customer lifetime gross profit vs acquisition cost; LTV/CAC ≥ 3 is the common bar." },
  { d: 4, t: "CCC", e: "Cash Conversion Cycle", dj: "売上債権日数+在庫日数−仕入債務日数。運転資本の拘束期間。", de: "DSO + DIO − DPO: how long cash is tied up in working capital." },
  { d: 4, t: "営業レバレッジ", e: "Operating Leverage", dj: "固定費比率が高いほど数量変動が利益変動に増幅される構造。", de: "High fixed costs amplify volume swings into profit swings." },
  { d: 4, t: "利益プール", e: "Profit Pool", dj: "バリューチェーンのどの段階に業界利益が溜まるかの地図。売上地図とは別物。", de: "The map of where industry profit accumulates along the chain — distinct from the revenue map." },
  { d: 4, t: "RFM分析", e: "RFM Analysis", dj: "最新購買・頻度・金額で顧客を状態別に層別し施策を割り当てる手法。", de: "Segmenting customers by recency, frequency, and monetary value to assign actions." },
  { d: 4, t: "コホート分析", e: "Cohort Analysis", dj: "獲得時期別に顧客群を層別し、事業の質の変化の方向を平均に埋もれる前に見る。", de: "Stratifying customers by acquisition period to see quality drift before averages bury it." },
  { d: 5, t: "DX(デジタルトランスフォーメーション)", e: "Digital Transformation (DX)", dj: "デジタル技術を用いて業務・ビジネスモデル・組織を変革し競争優位を作ること。電子化そのものではない。", de: "Using digital technology to transform operations, business models, and the organization — not mere digitization." },
  { d: 5, t: "デジタイゼーション/デジタライゼーション", e: "Digitization vs Digitalization", dj: "前者は情報の電子化(紙→PDF)、後者はプロセスのデジタル化。DXはその先の変革を指す3階層。", de: "Digitization converts information (paper → PDF); digitalization digitizes processes; DX is the transformation beyond both." },
  { d: 5, t: "レガシーシステム", e: "Legacy System", dj: "老朽化・複雑化・ブラックボックス化し、保守費と変更リスクが高止まりした既存システム。", de: "Aging, complex, black-boxed systems whose maintenance costs and change risks stay high." },
  { d: 5, t: "2025年の崖", e: "The 2025 Cliff", dj: "レガシー放置で人材枯渇・保守限界により大きな経済損失が生じるとした経産省DXレポートの警句。", de: "METI's warning that unaddressed legacy systems would cause major losses as talent and support run out." },
  { d: 5, t: "PoC(概念実証)", e: "Proof of Concept", dj: "本格投資の前に技術・効果の成立性を小規模に検証する実験。成功基準と次段階への接続が生命線。", de: "A small-scale test of feasibility before full investment; success criteria and the path to scale are its lifeline." },
  { d: 5, t: "PoC疲れ/PoC止まり", e: "PoC Purgatory", dj: "実証実験が乱立するが本番展開に至らない状態。展開計画・予算・オーナーの事前固定で防ぐ。", de: "Endless pilots that never reach production — prevented by pre-committing rollout plans, budget, and owners." },
  { d: 5, t: "アジャイル開発", e: "Agile Development", dj: "短い反復で動くソフトを届け、学習しながら要求を進化させる開発思想。手法は成功の十分条件ではない。", de: "Delivering working software in short iterations, evolving requirements through learning; the method alone guarantees nothing." },
  { d: 5, t: "ノーコード/ローコード", e: "No-Code / Low-Code", dj: "プログラミング無し(または最小限)でアプリを構築できる開発基盤。市民開発の技術的土台。", de: "Platforms for building apps with little or no programming — the technical base of citizen development." },
  { d: 5, t: "市民開発", e: "Citizen Development", dj: "業務部門の非エンジニアが自らアプリを作ること。ガードレール型の統治が野良アプリ化を防ぐ。", de: "Non-engineers in business units building their own apps; guardrail governance prevents rogue-app sprawl." },
  { d: 5, t: "シャドーIT", e: "Shadow IT", dj: "IT部門の承認外で現場が使うツール群。全面禁止の統制は往々にしてこれを増やす。", de: "Tools used without IT approval; blanket bans often multiply them." },
  { d: 5, t: "SoR / SoE / SoI", e: "SoR / SoE / SoI", dj: "記録(安定性)・顧客接点(変更速度)・洞察(分析柔軟性)でシステムを層別し、層ごとに統治を変える分類。", de: "Layering systems by record (stability), engagement (velocity), and insight (flexibility) — governing each differently." },
  { d: 5, t: "Run / Grow / Transform", e: "Run / Grow / Transform", dj: "IT予算を維持・改善・変革に区分し、守りと攻めの配分比率を経営の意思として管理する枠組み。", de: "Splitting IT budgets into keep-running, improve, and transform — making the defend/attack ratio an executive decision." },
  { d: 5, t: "Build / Buy / Partner", e: "Build / Buy / Partner", dj: "能力獲得の3経路。差別化の核は内製、業界共通機能は購入・提携が定石。", de: "Three routes to capability: build the differentiating core; buy or partner for industry commodities." },
  { d: 5, t: "DX成熟度モデル", e: "DX Maturity Model", dj: "デジタル能力を段階評価する診断座標。全項目満点でなく、戦略上必要な能力のギャップ特定に使う。", de: "A staged diagnostic of digital capability — for locating strategic gaps, not chasing top marks everywhere." },
  { d: 5, t: "カニバリゼーション", e: "Cannibalization", dj: "新チャネル・新サービスが自社既存の売上を侵食する現象。チャネル評価は純増分で行う。", de: "New channels eating your own existing revenue; evaluate channels on net incremental impact." },
  { d: 6, t: "大規模言語モデル(LLM)", e: "Large Language Model", dj: "大量テキストで次トークンの確率を学習し文脈に応じて生成するモデル。理解に見える能力は統計的パターンから創発する。", de: "A model trained to predict the next token over vast text; apparent understanding emerges from statistical pattern." },
  { d: 6, t: "トークン", e: "Token", dj: "LLMが処理する文字列の単位。API課金・文脈長・速度がこの数で決まる。日本語は英語よりトークン効率が低い傾向。", de: "The unit of text an LLM processes; billing, context length, and speed all scale with it." },
  { d: 6, t: "ハルシネーション", e: "Hallucination", dj: "もっともらしいが誤った内容の生成。確率的生成に根ざし、指示だけでは消えない。接地と検証で対処する。", de: "Fluent but false generation, rooted in probabilistic modeling; addressed by grounding and verification, not instruction alone." },
  { d: 6, t: "RAG(検索拡張生成)", e: "Retrieval-Augmented Generation", dj: "関連文書を検索し文脈に注入して根拠つきで生成する構成。知識を外部化し更新・出典提示を可能にする。", de: "Retrieving relevant documents and injecting them as context for grounded generation; externalizes knowledge for updates and citations." },
  { d: 6, t: "ファインチューニング", e: "Fine-tuning", dj: "既存モデルを追加データで再調整し文体・形式・タスクの型を習得させる手法。知識更新はRAGが向く。", de: "Adapting an existing model with extra data to acquire style, format, and task patterns; knowledge updates favor RAG." },
  { d: 6, t: "埋め込み(エンベディング)", e: "Embedding", dj: "テキスト等を意味の近さが距離に反映されるベクトルに変換したもの。意味検索・分類・類似判定の基盤。", de: "A vector where semantic similarity becomes geometric proximity; the base of meaning-based search and similarity." },
  { d: 6, t: "プロンプトインジェクション", e: "Prompt Injection", dj: "処理対象データに指示を紛れ込ませAIに実行させる攻撃。データと命令の境界の崩壊を突く。", de: "Smuggling instructions into processed data so the AI executes them; exploits the collapsed data-instruction boundary." },
  { d: 6, t: "AIエージェント", e: "AI Agent", dj: "目標に向け計画・ツール実行・観察・再計画を自律的に回し外界に作用するAI。権限・監視・巻き戻しの設計が要る。", de: "AI that autonomously plans, calls tools, observes, and replans toward a goal — needing authority, monitoring, and rollback design." },
  { d: 6, t: "MLOps / LLMOps", e: "MLOps / LLMOps", dj: "モデルの本番運用工学。コードに加えデータ・モデル・プロンプトの版管理、監視、再学習、評価を継続的に回す。", de: "The engineering of running models in production — versioning data, models, and prompts, plus monitoring, retraining, and evaluation." },
  { d: 6, t: "ドリフト", e: "Drift", dj: "環境変化でモデル性能が静かに劣化する現象。入力分布の変化(データドリフト)と関係自体の変化(コンセプトドリフト)がある。", de: "Silent performance decay as the world shifts — data drift (input distribution) versus concept drift (the relationship itself)." },
  { d: 6, t: "EU AI Act", e: "EU AI Act", dj: "用途のリスクで義務を傾斜させるEUのAI規制。2024年8月発効で段階適用(禁止規定2025年2月・汎用AI2025年8月・高リスク2027年12月以降、2026年10月時点)。域外企業もEU市場向け提供で適用され得る。", de: "The EU's risk-tiered AI regulation, in force since August 2024 with phased application (prohibitions Feb 2025, general-purpose AI Aug 2025, high-risk Dec 2027 or later; as of October 2026); reaches non-EU firms serving the EU market." },
  { d: 6, t: "レッドチーミング", e: "Red-teaming", dj: "攻撃者視点で脆弱性(ジェイルブレイク・情報引き出し・有害出力)を公開前に発見する敵対的検査。", de: "Adversarial probing from the attacker's view to find vulnerabilities before release." },
  { d: 6, t: "基盤モデル", e: "Foundation Model", dj: "大規模な事前学習で広範な能力を持ち、多様な下流タスクに適応できるモデル。汎用能力をコモディティ化させた。", de: "A broadly pretrained model adaptable to many downstream tasks; commoditized generic capability." },
  { d: 6, t: "ガードレール", e: "Guardrails", dj: "モデルの前後に入出力検査を配置し、違反時の挙動(拒否・再生成・人へ)を定義する安全機構。", de: "Input/output checks around a model with defined violation behavior — refuse, regenerate, or escalate." },
  { d: 6, t: "コンテキストウィンドウ", e: "Context Window", dj: "一度にモデルへ渡せる情報量の上限(トークン数)。長文は分割・要約・検索で必要部分だけ渡す。", de: "The token ceiling passable in one call; long inputs are chunked, summarized, or retrieved to fit." },
,
{"d": 7, "t": "論点", "e": "Issue", "dj": "意思決定に直結する、答えを出すべき問い。分析や施策の前に何を明らかにすべきかを定める出発点となる。", "de": "The specific question whose answer will change a decision; the starting point that determines what analysis must clarify before any action."},
{"d": 7, "t": "大論点・中論点・小論点", "e": "Major / Mid / Minor Issue", "dj": "論点を階層で分けた呼び方。大論点は全体の問い、中論点はその構成要素、小論点は検証可能な粒度まで分解した問いを指す。", "de": "A hierarchy of issues: the major issue frames the whole problem, mid issues break it into components, and minor issues are small enough to test directly."},
{"d": 7, "t": "イシュー度", "e": "Issue Degree", "dj": "その論点に取り組む価値の高さを示す度合い。答えが出た時に意思決定や成果へ与える影響の大きさで測る。", "de": "A measure of how worthwhile an issue is to pursue, based on how much impact its answer would have on the decision or outcome."},
{"d": 7, "t": "論点候補", "e": "Candidate Issue", "dj": "検討の初期段階で挙げる、まだ検証されていない論点の仮のリスト。後の絞り込みで真の論点かを見極める対象となる。", "de": "A tentative list of possible issues raised early in a project, before screening determines which ones are the real issue to pursue."},
{"d": 7, "t": "真の論点", "e": "True Issue", "dj": "表面的な依頼や症状の裏にある、本当に答えを出すべき問い。依頼された作業をそのまま論点とせず、掘り直して見出す。", "de": "The genuine question that must be answered beneath a surface-level request or symptom, found by digging past the task as originally framed."},
{"d": 7, "t": "論点ツリー", "e": "Issue Tree", "dj": "大論点を答えられる粒度まで、MECEに近い形で枝分かれさせた問いの構造図。分析設計の骨格として使う。", "de": "A branching diagram that decomposes a major issue into answerable sub-questions in a roughly MECE structure, used as the skeleton for analysis design."},
{"d": 7, "t": "問いの再定義", "e": "Issue Reframing", "dj": "依頼された問いをそのまま受けず、本当に答えるべき問いへ言い換える作業。前提や範囲を疑うことから始まる。", "de": "Restating a request into the question that truly needs answering, rather than accepting it at face value, by questioning its premises and scope."},
{"d": 7, "t": "インパクト×解決可能性", "e": "Impact x Solvability", "dj": "論点候補を絞り込む2軸。結論への影響度と、今のリソースや手段で答えを出せるかを掛け合わせて優先順位を決める。", "de": "A two-axis screen for candidate issues that weighs how much the answer would matter against whether it can actually be resolved now."},
{"d": 7, "t": "答える資格", "e": "License to Answer", "dj": "その論点に答えるための十分な情報・権限・立場を持っているかという視点。持たないまま断定すると誤った結論を招く。", "de": "Whether one has enough information, authority, or standing to answer a given issue; asserting an answer without it risks a false conclusion."},
{"d": 7, "t": "空・雨・傘", "e": "Sky-Rain-Umbrella", "dj": "事実(空が曇っている)・解釈(雨が降りそう)・行動(傘を持つ)の3層で論理を組む型。提言を事実と混同させない。", "de": "A three-layer logic pattern — fact (clouds), interpretation (rain is likely), action (bring an umbrella) — that keeps a recommendation separate from raw facts."},
{"d": 7, "t": "イシュードリブン", "e": "Issue-Driven", "dj": "手元のデータや使えるフレームからではなく、論点から逆算して必要な分析だけを設計して進める考え方。", "de": "An approach that designs only the analysis needed to answer the issue, working backward from the question rather than from available data or frameworks."},
{"d": 7, "t": "論点整理", "e": "Issue Clarification", "dj": "乱雑に挙がった論点候補を洗い出し、重複や粒度違いを整えて優先順位づけできる状態にする作業。", "de": "The work of laying out scattered candidate issues, removing overlaps and mismatched granularity, so they can be prioritized cleanly."},
{"d": 7, "t": "スコーピング", "e": "Scoping", "dj": "取り組む論点の範囲と期間、扱わない領域をあらかじめ線引きする作業。依頼主との認識合わせの土台になる。", "de": "Drawing the boundary of which issues and timeframe are in scope and which are explicitly out, forming the basis for aligning with the client."},
{"d": 7, "t": "決め打ちの罠", "e": "Premature Framing Trap", "dj": "手持ちのフレームワークや過去の成功パターンに事実を当てはめ、論点を検討する前に答えを固定してしまう誤り。", "de": "The error of forcing facts into a familiar framework or past success pattern, locking in an answer before the issue has even been examined."},
{"d": 7, "t": "成功の定義", "e": "Definition of Success", "dj": "論点に取り組んだ結果、何が達成されれば成功とみなすかをあらかじめ具体的に決めておく合意事項。", "de": "An upfront, concrete agreement on what outcome counts as success once the issue has been worked through."},
{"d": 7, "t": "意思決定基準", "e": "Decision Criteria", "dj": "複数の打ち手や答えの候補を比較し、最終的にどれを選ぶかを判断するために事前に定めるものさし。", "de": "The predefined yardstick used to compare candidate answers or courses of action and decide which one to choose."},
{"d": 7, "t": "依頼の裏の論点", "e": "Hidden Issue Behind the Request", "dj": "クライアントが言葉にした依頼内容の背後にある、本人も明確に自覚していない本当の関心事や制約を指す。", "de": "The real concern or constraint sitting behind a client's stated request, which even the client may not have fully articulated."},
{"d": 7, "t": "論点のすり合わせ", "e": "Issue Alignment", "dj": "設定した論点が依頼主の問題認識と一致しているかを、作業に入る前に確認し合意を取る対話のプロセス。", "de": "The dialogue used to confirm, before work begins, that the issue as framed matches the client's own understanding of the problem."},
{"d": 8, "t": "仮説", "e": "Hypothesis", "dj": "まだ検証されていないが、論点に対する仮の答えとして置く仮の結論。検証を通じて更新される前提の出発点となる。", "de": "A tentative answer to an issue, held as a provisional conclusion before verification, and updated as evidence comes in."},
{"d": 8, "t": "初期仮説", "e": "Initial Hypothesis", "dj": "分析に入る前、限られた情報と経験から素早く立てる最初の仮説。精度より速さと検証可能性を重視する。", "de": "The first hypothesis formed quickly from limited information and experience before analysis begins, prized for speed and testability over accuracy."},
{"d": 8, "t": "仮説検証サイクル", "e": "Hypothesis-Verification Cycle", "dj": "仮説を立て、データや事実で検証し、結果に応じて仮説を修正・棄却・強化することを繰り返す進め方を指す。", "de": "The repeating loop of forming a hypothesis, testing it against data or facts, and then revising, discarding, or reinforcing it based on the result."},
{"d": 8, "t": "So What?", "e": "So What?", "dj": "手元の事実やデータの並びから、結局何が言えるのかという意味・結論を引き出すための問いかけである。", "de": "The question that pushes from a set of facts or data toward the actual conclusion or implication they support."},
{"d": 8, "t": "Why So?", "e": "Why So?", "dj": "ある主張や結論に対し、その根拠は何かを逆に問い返し、論理の飛躍や根拠不足を確かめる問いかけである。", "de": "The question that works backward from a claim to its evidence, checking whether the logic has gaps or insufficient support."},
{"d": 8, "t": "反証条件", "e": "Falsification Condition", "dj": "仮説を立てる時点で、どんな事実が見つかれば仮説を誤りと認めるかをあらかじめ決めておく基準を指す。", "de": "The condition set at the time a hypothesis is formed, specifying what evidence would count as proving it wrong."},
{"d": 8, "t": "確証バイアス", "e": "Confirmation Bias", "dj": "仮説を支持する情報ばかりを集め、反する情報を軽視・無視してしまう認知の偏り。検証の規律を崩す原因になる。", "de": "The cognitive tendency to seek out information that supports a hypothesis while downplaying or ignoring evidence against it, undermining verification discipline."},
{"d": 8, "t": "仮説の進化", "e": "Hypothesis Evolution", "dj": "検証結果を受けて、初期仮説をより精緻で具体的な形へ書き換えていく段階的な更新のプロセスを指す。", "de": "The staged process of rewriting an initial hypothesis into a more precise and specific form as verification results come in."},
{"d": 8, "t": "狙い撃ちの情報収集", "e": "Targeted Information Gathering", "dj": "手当たり次第に調べるのではなく、仮説を検証するために必要な情報だけを的を絞って集める活動を指す。", "de": "Gathering only the specific information needed to test a hypothesis, rather than researching broadly without a target."},
{"d": 8, "t": "引き出し(アナロジー)", "e": "Drawer (Analogy Pool)", "dj": "過去の経験や他業界の事例など、仮説を発想する際の材料として頭の中に蓄えておく知識の在庫を指す。", "de": "The stock of past experience and cross-industry examples kept in mind as raw material for coming up with hypotheses."},
{"d": 8, "t": "言い切り", "e": "Definitive Statement", "dj": "仮説を「かもしれない」で濁さず、検証可能な形にするため、一旦断定して言葉にすることを指す。", "de": "Stating a hypothesis as a firm claim rather than hedging it, so that it becomes concrete enough to be tested."},
{"d": 8, "t": "確信度", "e": "Confidence Level", "dj": "その仮説が正しいとどの程度信じているかの度合い。検証が進むにつれて上下し、扱いを変える判断材料になる。", "de": "The degree to which a hypothesis is believed to be true at a given point, rising or falling as verification proceeds and guiding how it is treated."},
{"d": 8, "t": "クイック&ダーティ", "e": "Quick and Dirty", "dj": "精度は粗くてよいので、まず短時間で仮説の当たり外れを確かめる簡易な検証のやり方を指す。", "de": "A rough, fast way of testing a hypothesis just enough to see whether it is roughly on target, accepting low precision for speed."},
{"d": 8, "t": "仮説ドリブン", "e": "Hypothesis-Driven", "dj": "先に仮説を置き、それを検証するために必要なデータや分析だけを後から設計して進める考え方を指す。", "de": "An approach that sets a hypothesis first and only afterward designs the data and analysis needed to test it."},
{"d": 8, "t": "ゼロベース", "e": "Zero-Based Thinking", "dj": "過去の経験や既存の枠組みを一旦外し、白紙の状態から仮説や打ち手を考え直す姿勢を指す。", "de": "The stance of setting aside past experience and existing frameworks to rethink a hypothesis or solution from a blank slate."},
{"d": 8, "t": "構造化仮説", "e": "Structured Hypothesis", "dj": "単発の思いつきではなく、論点ツリーの各枝に対応づけて体系的に配置された仮説の集合を指す。", "de": "A set of hypotheses arranged systematically against each branch of an issue tree, rather than a single unconnected guess."},
{"d": 8, "t": "検証質問", "e": "Verification Question", "dj": "仮説が正しいかを判定するために、具体的にどのデータや事実を確認すればよいかを表す質問を指す。", "de": "The concrete question specifying exactly what data or fact must be checked to judge whether a hypothesis holds."},
{"d": 8, "t": "棄却基準", "e": "Rejection Criterion", "dj": "検証の結果がどうであれば仮説を捨てるべきかを事前に定めた線引き。仮説への粘着を防ぐ役割を持つ。", "de": "A predefined threshold for when verification results mean a hypothesis must be abandoned, guarding against clinging to it too long."}
];
// 配列に空き要素（単独のカンマ）があり length が実件数より1多い。記録は添字で保存しているので空きは消さず、件数は実要素で数える
const GLOSSARY_N = GLOSSARY.filter(Boolean).length;

// =====================================================================
// CONFUSABLE PAIRS
// =====================================================================
const CONFUSE = [
  { aj: "必要条件", ae: "Necessary Condition", bj: "十分条件", be: "Sufficient Condition",
    xj: "必要=それが無ければ成立しない(成功者は皆Xを持つ)。十分=それがあれば必ず成立する(Xがあれば成功)。前者から後者への飛躍が施策論の最頻出エラー。", xe: "Necessary: without it, no success. Sufficient: with it, guaranteed success. Leaping from the first to the second is the most common error in initiative debates." },
  { aj: "後件肯定", ae: "Affirming the Consequent", bj: "前件否定", be: "Denying the Antecedent",
    xj: "P→Qに対し、後件肯定=QからPを導く誤り(高ROE→優良)。前件否定=Pの否定からQの否定を導く誤り(広告なし→売上増なし)。どちらも「逆・裏は必ずしも真ならず」。", xe: "Given P→Q: affirming the consequent infers P from Q (high ROE → excellent); denying the antecedent infers not-Q from not-P (no ads → no growth). Neither converse nor inverse follows." },
  { aj: "パーセント(%)", ae: "Percent", bj: "パーセントポイント(pt)", be: "Percentage Point",
    xj: "解約率2%→3%は「1ポイント」の上昇だが、相対では「50%」の増加。差はポイント、比はパーセントで語り分けないと変化の規模を誤認させる。", xe: "Churn going 2%→3% is a 1-point rise but a 50% relative increase. Differences speak in points, ratios in percent — mixing them misrepresents magnitude." },
  { aj: "統計的有意", ae: "Statistical Significance", bj: "実務的重要性", be: "Practical Significance",
    xj: "有意=偶然では説明しにくい、の判定。重要=投資を正当化する効果量があるか。巨大サンプルでは無視してよい差も「有意」になる。", xe: "Significance judges non-randomness; importance judges whether the effect size justifies investment. With huge samples, ignorable differences turn 'significant.'" },
  { aj: "NPV", ae: "NPV", bj: "IRR", be: "IRR",
    xj: "NPVは創造される価値の絶対額(本尊)、IRRは投資効率の率(規模を無視)。IRR最大の小型案がNPV最大の大型案に劣ることは普通に起こる。", xe: "NPV is the absolute value created (the master metric); IRR is an efficiency rate blind to scale. A small high-IRR project routinely loses to a large high-NPV one." },
  { aj: "感応度分析", ae: "Sensitivity Analysis", bj: "シナリオ分析", be: "Scenario Analysis",
    xj: "感応度=変数を1つずつ動かし影響度を序列化。シナリオ=複数変数の整合的な組合せ(不況=売上減∧金利上昇)で耐性を試す。前者で急所を特定し後者で複合ストレスをかける。", xe: "Sensitivity moves one variable at a time to rank impacts; scenarios stress coherent multi-variable combinations. Locate the jugular with the first, then stress it with the second." },
  { aj: "市場シェア", ae: "Market Share", bj: "シェア・オブ・ウォレット", be: "Share of Wallet",
    xj: "市場シェア=市場全体に占める割合。ウォレットシェア=既存顧客の同カテゴリ支出に占める割合。分母の違いが「新規獲得か深耕か」という戦略の重心を決める。", xe: "Market share divides by the whole market; wallet share by your existing customers' category spend. The denominator choice sets the strategy's center of gravity: acquisition vs deepening." },
  { aj: "ロゴリテンション", ae: "Logo Retention", bj: "NRR", be: "Net Revenue Retention",
    xj: "ロゴ=顧客「数」の残存率。NRR=既存顧客の「売上」の残存率(拡張−縮小−解約込み)。顧客数が減ってもNRR120%はあり得る——どちらの血圧を測っているか自覚する。", xe: "Logo retention counts surviving customers; NRR tracks surviving revenue including expansion. NRR can hit 120% while logos shrink — know which blood pressure you're reading." },
  { aj: "オズの魔法使い型", ae: "Wizard of Oz", bj: "コンシェルジュMVP", be: "Concierge MVP",
    xj: "オズ=自動化を「装い」裏を人力で回す(顧客は知らない)。コンシェルジュ=人力サービスだと「公言」して併走する。偽装の有無が学べる内容(体験検証vs業務理解)を変える。", xe: "Wizard of Oz feigns automation with hidden humans; concierge declares the human service openly. The presence of pretense changes what you learn: experience validation vs workflow anatomy." },
  { aj: "イシューツリー", ae: "Issue Tree", bj: "デシジョンツリー", be: "Decision Tree",
    xj: "イシューツリー=問いをMECEに分解する診断の地図。デシジョンツリー=選択肢×確率×結果で期待値を計算する選択の計算機。診断前に期待値計算を始めると誤った選択肢集合の中で最適化する。", xe: "Issue trees map questions for diagnosis; decision trees compute expected values over choices. Calculating EVs before diagnosis optimizes within the wrong option set." },
  { aj: "フォアキャスティング", ae: "Forecasting", bj: "バックキャスティング", be: "Backcasting",
    xj: "フォア=現状から前へ積み上げる(制約を全部背負う)。バック=あるべき未来を固定し必要な変化を逆引きする(制約を変数扱い)。非連続な目標は後者でしか届かない。", xe: "Forecasting extrapolates forward carrying every current constraint; backcasting fixes the target future and derives changes backward, treating constraints as variables. Discontinuous goals yield only to the latter." },
  { aj: "決定の質", ae: "Decision Quality", bj: "結果の質", be: "Outcome Quality",
    xj: "良い判断でも不運で失敗し、悪い判断でも幸運で成功する。評価は決定時点の情報とプロセスで行う——結果だけで裁く組織はリスクテイクと正直な報告を殺す。", xe: "Good decisions fail on bad luck; bad ones succeed on good luck. Judge on time-of-decision information and process — outcome-only tribunals kill risk-taking and honest reporting." },
  { aj: "MECE", ae: "MECE", bj: "ロジックツリー", be: "Logic Tree",
    xj: "MECEは分解の「品質基準」(モレ・ダブりなし)、ロジックツリーはその基準で作る「成果物」(樹形図)。", xe: "MECE is the quality standard for decomposition; a logic tree is the artifact built to that standard." },
  { aj: "演繹法", ae: "Deduction", bj: "帰納法", be: "Induction",
    xj: "演繹=一般則→個別(前提が真なら結論も真)。帰納=個別観察→一般化(飛躍リスクあり)。", xe: "Deduction applies rules to cases (truth-preserving); induction generalizes from cases (risks leaps)." },
  { aj: "相関", ae: "Correlation", bj: "因果", be: "Causation",
    xj: "相関は「一緒に動く」事実。因果は「一方が他方を動かす」機序。交絡・逆因果・偶然を排除して初めて因果と言える。", xe: "Correlation is co-movement; causation is mechanism. Rule out confounders, reverse causality, and chance first." },
  { aj: "論点思考", ae: "Issue Thinking", bj: "仮説思考", be: "Hypothesis Thinking",
    xj: "論点思考=「解くべき問いは何か」(上流)。仮説思考=「その問いの答えは何か」(下流)。内田和成の2部作の関係。", xe: "Issue thinking picks the right question (upstream); hypothesis thinking drafts its answer (downstream)." },
  { aj: "ロジカルシンキング", ae: "Logical Thinking", bj: "クリティカルシンキング", be: "Critical Thinking",
    xj: "ロジカル=筋道を「組み立てる」技術。クリティカル=前提・根拠を「疑い吟味する」技術。建設と検査の関係。", xe: "Logical thinking builds arguments; critical thinking inspects premises and evidence — construction vs inspection." },
  { aj: "ラテラルシンキング", ae: "Lateral Thinking", bj: "クリエイティブシンキング", be: "Creative Thinking",
    xj: "ラテラルは「前提転換で別の出発点を作る」技法群(デボノ)。クリエイティブはより広く「新規で有用な産出」全般を指す。", xe: "Lateral thinking is de Bono's specific toolkit for shifting assumptions; creative thinking is the broader capacity for novel, useful output." },
  { aj: "So What?", ae: "So What?", bj: "Why So?", be: "Why So?",
    xj: "So What?=事実から上へ(示唆抽出)。Why So?=結論から下へ(根拠検証)。同じ縦の論理を逆方向に点検する。", xe: "So What? moves up (implications); Why So? moves down (verification) — the same vertical logic, both directions." },
  { aj: "イシューツリー", ae: "Issue Tree", bj: "フレームワーク", be: "Framework",
    xj: "イシューツリーは論点に合わせた「自作の構造」。フレームワークは汎用の「既製の型」。MBB面接では前者が評価される。", xe: "Issue trees are custom structures fitted to the question; frameworks are off-the-shelf templates. MBB rewards the former." },
  { aj: "空(事実)", ae: "Sky (Fact)", bj: "雨(解釈)", be: "Rain (Interpretation)",
    xj: "「西の空が暗い」は事実、「雨が降りそうだ」は解釈。報告書で両者を混ぜるのが最頻出の初歩ミス。", xe: "'Dark clouds in the west' is a fact; 'it will likely rain' is an interpretation — mixing them is the classic rookie error." },
  { aj: "3C", ae: "3C", bj: "SWOT", be: "SWOT",
    xj: "3Cは環境の「事実収集の視点」(顧客・競合・自社)。SWOTは事実を「評価・整理する枠」(内外×正負)。3C→SWOTの順で使うと機能する。", xe: "3C is a lens for gathering facts; SWOT is a frame for evaluating them (internal/external × positive/negative). Use 3C first, then SWOT." },
  { aj: "トップダウン推定", ae: "Top-Down Estimation", bj: "ボトムアップ推定", be: "Bottom-Up Estimation",
    xj: "トップダウン=全体(人口等)から絞り込む。ボトムアップ=単位(1店舗等)から積み上げる。両方で挟んで検算するのがMBB流。", xe: "Top-down narrows from totals; bottom-up builds from units. MBB practice: do both and cross-check." },
  { aj: "固定費", ae: "Fixed Cost", bj: "変動費", be: "Variable Cost",
    xj: "固定費は操業度に関わらず発生(家賃・正社員給与)、変動費は数量に比例(材料費)。境界は期間と意思決定次第で動く点に注意。", xe: "Fixed costs don't vary with volume (rent, salaries); variable costs do (materials). The boundary shifts with the time horizon." },
,
{"aj": "論点", "ae": "Issue", "bj": "仮説", "be": "Hypothesis", "xj": "論点は答えを出すべき『問い』そのものであり、仮説はその論点に対する仮の『答え』である。論点を立てる前に仮説だけが先走ると、検証すべき問いが曖昧なまま仮の答えが独り歩きしてしまう。", "xe": "An issue is the question that needs answering, while a hypothesis is a tentative answer to it. When a hypothesis runs ahead before the issue is framed, a provisional answer ends up driving the work with no clear question behind it."},
{"aj": "論点", "ae": "Issue", "bj": "作業(タスク)", "be": "Task", "xj": "論点は答える価値のある『問い』だが、作業は論点に答えるために実行する『行動』にすぎない。「業界レポートを読む」は作業であって論点ではなく、そこから何を確かめたいのかという問いを別に立てる必要がある。", "xe": "An issue is a question worth answering, whereas a task is merely an action taken to answer it. \"Read the industry report\" is a task, not an issue, since it still needs a separate question about what it is meant to confirm."},
{"aj": "仮説", "ae": "Hypothesis", "bj": "願望", "be": "Wish", "xj": "仮説は反証条件を持ち、事実によって否定される可能性を受け入れた仮の答えである。願望は「こうであってほしい」という結論を検証抜きで信じ続けるもので、反証されても捨てられない点で仮説と根本的に異なる。", "xe": "A hypothesis carries a falsification condition and accepts that facts may disprove it. A wish is a preferred conclusion held without testing, and differs fundamentally from a hypothesis in that it survives even when evidence contradicts it."},
{"aj": "So What?", "ae": "So What?", "bj": "Why So?", "be": "Why So?", "xj": "So What?は事実の集まりから『結局何が言えるか』という結論を導く前向きの問いで、Why So?はある結論に対し『その根拠は何か』と逆方向に検証する問いである。両者を往復させて論理の飛躍を防ぐ。", "xe": "So What? moves forward from a set of facts to the conclusion they imply, while Why So? moves backward from a conclusion to check what evidence actually supports it. Cycling between the two catches gaps in the logic."}
];

// =====================================================================
// CASE DRILLS — step-by-step walkthroughs
// =====================================================================
const CASES = [
  {
    tj: "フェルミ推定:日本のカフェ市場規模", te: "Fermi: Japan's café market size",
    dj: "需要サイドのトップダウンで年間市場規模を概算する。", de: "Top-down, demand-side annual market sizing.",
    dom: 4,
    steps: [
      { tj: "構造を宣言する", te: "Declare the structure", bj: "市場規模 = 人口 × カフェ利用率 × 年間利用頻度 × 1回あたり単価。計算前に式を面接官に示すのがMBBの作法。", be: "Market = population × café-user rate × annual frequency × spend per visit. State the formula before computing — standard MBB etiquette." },
      { tj: "人口と利用率を仮定", te: "Assume population & usage", bj: "日本の人口 約1.25億人。通学・通勤層を中心にカフェを使う人を約50%と仮定 → 約6,000万人。", be: "Japan ≈ 125M people. Assume ~50% use cafés (commuters, students) → ~60M users." },
      { tj: "頻度と単価を仮定", te: "Assume frequency & price", bj: "平均利用頻度を月2回(年24回)、1回あたり単価を500円と仮定。ヘビー/ライトユーザーで加重すればより精緻化できる。", be: "Assume 2 visits/month (24/yr) and ¥500 per visit. Weighting heavy vs light users refines it further." },
      { tj: "計算する", te: "Compute", bj: "6,000万人 × 24回 × 500円 = 7,200億円/年。桁を丁寧に:6×24=144、144×500=72,000 → 7.2兆…ではなく7,200億円(0.6億×2.4万円)。", be: "60M × 24 × ¥500 = ¥720B/year. Track the zeros carefully: 60M × ¥12,000/user = ¥720B." },
      { tj: "サニティチェック", te: "Sanity check", bj: "実際の国内コーヒー・カフェ関連市場は概ね兆円規模との推計もあり、桁(数千億〜1兆円)が合っていれば合格。フェルミは精密さでなく「分解の筋の良さ」を見る。", be: "Public estimates put the market around the high-hundreds-of-billions to ~¥1T range — being within the right order of magnitude passes. Fermi tests decomposition quality, not precision." },
    ],
  },
  {
    tj: "収益性改善ケース:利益ツリーで診断", te: "Profitability case: diagnose with a profit tree",
    dj: "「クライアントの利益が2年で30%減。原因と打ち手は?」", de: "'Client profit fell 30% in two years. Why, and what should they do?'",
    dom: 4,
    steps: [
      { tj: "利益を分解する", te: "Decompose profit", bj: "利益 = 売上 − コスト。売上 = 単価 × 数量、コスト = 固定費 + 変動費。まずどちら側の問題かを特定する。", be: "Profit = Revenue − Cost; Revenue = P × Q; Cost = fixed + variable. First isolate which side broke." },
      { tj: "データで切り分ける", te: "Segment with data", bj: "売上横ばい・コスト増ならコスト側を深掘り。売上減なら単価か数量か、さらに製品別・地域別・チャネル別に分解して劣化箇所を特定する。", be: "If revenue is flat but costs rose, dig into costs; if revenue fell, split P vs Q, then by product, region, channel." },
      { tj: "外部要因を確認する", te: "Check external factors", bj: "市場全体が縮小しているのか、自社シェアだけ落ちているのかを分離(市場成長率 vs 自社成長率)。ここで3Cの視点が効く。", be: "Separate market decline from share loss (market growth vs company growth) — the 3C lens applies here." },
      { tj: "仮説を立てて検証する", te: "Hypothesize & test", bj: "例:「新規参入のLCC競合に価格感度の高い顧客層を奪われ数量が減少」。この仮説なら顧客離反データと競合価格で検証できる。", be: "E.g., 'a low-cost entrant took price-sensitive customers, cutting volume' — testable via churn data and competitor pricing." },
      { tj: "打ち手を構造化して提言", te: "Structure recommendations", bj: "短期(価格・プロモ調整、コスト削減)と中期(セグメント再定義、差別化投資)に分け、インパクト×実現性で優先順位づけして結論から述べる。", be: "Split short-term (pricing, cost cuts) vs mid-term (repositioning, differentiation), prioritize by impact × feasibility, and answer first." },
    ],
  },
  {
    tj: "市場参入ケース:Go / No-Goの構造", te: "Market entry: structuring Go / No-Go",
    dj: "「国内飲料メーカーが東南アジア市場に参入すべきか?」", de: "'Should a domestic beverage maker enter Southeast Asia?'",
    dom: 0,
    steps: [
      { tj: "判断基準を先に定義する", te: "Define decision criteria first", bj: "参入判断 = ①市場の魅力度 ②自社の勝ち筋 ③参入方法と経済性 ④リスク。この4論点をMECEに宣言してから始める。", be: "Entry = (1) market attractiveness, (2) right to win, (3) entry mode & economics, (4) risks. Declare these MECE issues upfront." },
      { tj: "市場の魅力度", te: "Market attractiveness", bj: "市場規模(TAM/SAM/SOM)、成長率、収益性(5フォースで構造診断)、規制環境(PEST)を評価する。", be: "Assess size (TAM/SAM/SOM), growth, structural profitability (Five Forces), and regulation (PEST)." },
      { tj: "自社の勝ち筋", te: "Right to win", bj: "自社の強み(ブランド、技術、コスト構造)が現地の勝敗要因(KSF)に合致するか。3Cで競合と比較する。", be: "Do the company's strengths match local key success factors? Compare via 3C." },
      { tj: "参入方法の選択肢", te: "Entry-mode options", bj: "輸出/ライセンス/合弁/買収/自社設立をスピード・投資額・コントロール・リスクの軸で比較。二分法(参入するか否か)に陥らない。", be: "Compare export / license / JV / M&A / greenfield on speed, capital, control, risk — avoid a false dichotomy." },
      { tj: "結論を条件付きで述べる", te: "Conclude with conditions", bj: "「SOMが◯億円超かつ現地パートナーが確保できるなら合弁で参入すべき」のように、条件と根拠を添えてAnswer Firstで締める。", be: "'Enter via JV if obtainable market exceeds X and a local partner is secured' — answer first, with explicit conditions." },
    ],
  },
  {
    tj: "プライシングケース:3つのアプローチ", te: "Pricing case: three lenses",
    dj: "「新製品の価格をどう設定すべきか?」", de: "'How should we price the new product?'",
    dom: 4,
    steps: [
      { tj: "3つのレンズを宣言", te: "Declare the three lenses", bj: "価格設定 = ①コストベース(原価+マージン) ②競合ベース(代替品との相対) ③価値ベース(顧客の支払意思額)。3つを併用して整合を取る。", be: "Pricing = (1) cost-plus, (2) competitor-based, (3) value-based (willingness to pay). Use all three and reconcile." },
      { tj: "コストベースで下限を引く", te: "Cost sets the floor", bj: "変動費単価が価格の下限。固定費回収を含めた損益分岐点を計算し、最低ラインを把握する。", be: "Variable cost per unit is the floor; compute break-even including fixed-cost recovery." },
      { tj: "競合ベースで相場を見る", te: "Competitors set the reference", bj: "最も近い代替品の価格帯を確認。差別化要素がなければ相場から大きく外れられない。", be: "Check the nearest substitutes' price range; without differentiation you can't stray far." },
      { tj: "価値ベースで上限を探る", te: "Value sets the ceiling", bj: "顧客が得る経済価値(節約額・便益)を金額換算し、支払意思額(WTP)の上限を推定。B2Bなら顧客のROIで正当化する。", be: "Quantify the customer's economic value (savings, benefits) to estimate WTP; in B2B, justify via the customer's ROI." },
      { tj: "戦略目的で最終決定", te: "Strategy decides", bj: "シェア獲得優先ならペネトレーション(低価格)、利益率優先ならスキミング(高価格)。価格は戦略の表現であると締める。", be: "Penetration pricing for share, skimming for margin — close by noting that price expresses strategy."},
    ],
  },
  {
    tj: "MBB三社の思考法の違い", te: "How McKinsey, BCG, and Bain think differently",
    dj: "各ファームの流儀を比較し、共通の核を理解する。", de: "Compare each firm's style and find the common core.",
    dom: 0,
    steps: [
      { tj: "マッキンゼー:構造の規律", te: "McKinsey: structural discipline", bj: "MECE、ピラミッド原則、空・雨・傘、イシュードリブン。「構造化してから解く」規律が文化の中核。7つの習慣的動作として新人に叩き込まれる。", be: "MECE, the Pyramid Principle, Sky-Rain-Umbrella, issue-driven work — 'structure before solving' is the cultural core." },
      { tj: "BCG:論点と仮説の往復", te: "BCG: issues and hypotheses", bj: "内田和成(元BCG日本代表)の『論点思考』『仮説思考』が象徴。正しい問いの設定と、少ない情報での大胆な仮説構築を重視する。", be: "Symbolized by Uchida's 'Issue Thinking' and 'Hypothesis Thinking' — pick the right question, then hypothesize boldly with limited data." },
      { tj: "ベイン:Answer Firstと結果主義", te: "Bain: Answer First & results", bj: "結論先出しのコミュニケーションと、クライアントの株価・業績という「結果」へのコミットが特徴。実行支援まで踏み込む文化。", be: "Conclusion-first communication and commitment to measurable client results, including implementation." },
      { tj: "共通の核", te: "The common core", bj: "三社とも①論点定義→②構造分解(MECE)→③仮説→④検証→⑤結論先出しの提言、という同じエンジンを回している。流儀の差は強調点の差にすぎない。", be: "All three run the same engine: define the issue → decompose (MECE) → hypothesize → test → recommend answer-first. Styles differ only in emphasis." },
      { tj: "面接での評価軸", te: "What interviews assess", bj: "構造化能力、数値感覚(桁勘定)、ビジネスセンス(示唆の鋭さ)、コミュニケーション(結論から簡潔に)。本ハブの5分野はこの評価軸に直結する。", be: "Structuring, quantitative sense, business judgment, and communication — the five domains of this hub map directly onto these criteria." },
    ],
  },
  {
    tj: "M&Aケース:買収すべきか、いくらまでか", te: "M&A case: should we buy, and up to what price?",
    dj: "「クライアント(食品メーカー)が同業中堅の買収を検討中。実行すべきか?」", de: "'Our food-maker client is weighing the acquisition of a mid-size rival. Should they proceed?'",
    dom: 4,
    steps: [
      { tj: "論点の構造を宣言する", te: "Declare the issue structure", bj: "M&A判断=①戦略適合性(なぜ買うのか)②スタンドアロン価値(単体でいくらか)③シナジー(一緒だと幾ら増えるか)④価格とストラクチャー(いくらで・どう買うか)⑤実行リスク(PMI・人材流出)。この5論点をMECEに提示してから着手する。", be: "M&A = (1) strategic fit (why buy), (2) standalone value, (3) synergies, (4) price & structure, (5) execution risk (PMI, talent flight). Declare these five MECE issues before diving in." },
      { tj: "戦略適合性を検証する", te: "Test strategic fit", bj: "買収の目的(シェア・チャネル・技術・時間を買う)を明確化し、自社戦略との整合と「自力構築(build)・提携(ally)との比較」を行う。目的が曖昧な買収はシナジー計算以前に棄却候補。", be: "Clarify the deal's purpose (share, channels, technology, buying time), check strategy alignment, and compare against build or ally options. Purpose-free deals are rejection candidates before any math." },
      { tj: "スタンドアロン価値を見積もる", te: "Value the target standalone", bj: "対象単体の将来FCFをDCFで、また類似会社マルチプル(EV/EBITDA等)で挟み撃ちにして評価レンジを作る。楽観・保守シナリオで感応度も確認する。", be: "Bracket the range with a DCF of standalone free cash flows and comparable multiples (EV/EBITDA), plus optimistic/conservative sensitivity runs." },
      { tj: "シナジーを定量化し、確度で割り引く", te: "Quantify synergies, discounted by confidence", bj: "コストシナジー(調達統合・重複機能削減)は実現確度が高く、収益シナジー(クロスセル)は低め。実現確率とタイミングで割り引き、統合コストとディスシナジー(顧客・人材の離反)も必ず控除する。", be: "Cost synergies (procurement, deduplication) are high-confidence; revenue synergies (cross-sell) much less so. Discount by probability and timing, and always subtract integration costs and dis-synergies (customer and talent attrition)." },
      { tj: "価格上限を定め、条件付きで結論を述べる", te: "Set the walk-away price and conclude conditionally", bj: "支払上限=スタンドアロン価値+確度調整後シナジー−買い手が確保すべきリターン。上限超過は「勝者の呪い」。結論は『上限X億円以下で、かつキーマン残留が契約条件なら買収すべき』のように条件付きAnswer Firstで締める。", be: "Walk-away = standalone value + risk-adjusted synergies − the buyer's required return; paying beyond it is the winner's curse. Conclude answer-first with conditions: 'Acquire below ¥X B, contingent on key-person retention.'" },
    ],
  },
  {
    tj: "ターンアラウンドケース:赤字事業の再生", te: "Turnaround case: rescuing a loss-making business",
    dj: "「3期連続赤字の小売チェーン。手元資金は残り10ヶ月分。再生プランを描け」", de: "'A retail chain, three straight years in the red, with 10 months of cash left. Draft the turnaround.'",
    dom: 0,
    steps: [
      { tj: "止血:キャッシュを最優先する", te: "Stop the bleeding: cash first", bj: "再生の時間軸を決めるのは損益でなくキャッシュ。13週間の資金繰り表を作り、支払サイト交渉・在庫圧縮・不要資産売却で滑走路(ランウェイ)を延ばす。倒産だけは全ての選択肢を消す。", be: "Cash, not P&L, sets the clock. Build a 13-week cash forecast; stretch payables, compress inventory, sell idle assets to extend the runway. Insolvency deletes every other option." },
      { tj: "出血箇所を利益ツリーで特定する", te: "Locate the bleeding with a profit tree", bj: "赤字を店舗別・カテゴリ別・顧客セグメント別に分解。「全店が薄く赤い」のか「2割の店が赤字の8割を作る」のかで処方箋は全く違う。80/20で出血源を絞り込む。", be: "Decompose losses by store, category, and segment. 'Everything slightly red' vs '20% of stores driving 80% of losses' demand opposite prescriptions — apply 80/20 to find the wound." },
      { tj: "事業を仕分ける:残す・直す・畳む", te: "Triage: keep, fix, exit", bj: "各店舗・事業を「構造的に稼げる(残す)/テコ入れで戻る(直す)/構造的に無理(畳む)」に仕分け。判断軸は立地の将来性・貢献利益・撤退コスト。感情とサンクコストを排し、撤退も再生の打ち手と位置づける。", be: "Sort each unit into structurally viable (keep), fixable (fix), or structurally doomed (exit), using location outlook, contribution margin, and exit costs. Strip sentiment and sunk costs — exits are turnaround moves too." },
      { tj: "コスト構造と組織を作り直す", te: "Rebuild the cost structure and organization", bj: "本部固定費・調達条件・店舗オペレーションをゼロベースで見直し、損益分岐点を「縮んだ売上でも黒字化する水準」まで下げる。同時に再生を率いる体制(権限集中・週次モニタリング)を敷く。", be: "Zero-base HQ overhead, procurement, and store operations to pull break-even below the shrunken revenue line. Simultaneously install turnaround governance: concentrated authority and weekly monitoring." },
      { tj: "再成長ストーリーとマイルストーンで締める", te: "Close with a regrowth story and milestones", bj: "縮小均衡で終わらせず、残した中核(勝てる立地×勝てるカテゴリ)への再投資ストーリーを描く。『90日:資金繰り安定/1年:営業黒字/2年:成長投資再開』とマイルストーンを切り、金融機関・従業員への説明装置にする。", be: "Don't end at shrink-to-survive: articulate reinvestment in the kept core (winning locations × winning categories). Set milestones — 90 days: cash stabilized; year 1: operating profit; year 2: growth investment resumes — as the narrative for banks and employees." },
    ],
  },
  {
    tj: "コスト削減ケース:販管費を20%削れ", te: "Cost case: cut SG&A by 20%",
    dj: "「利益率悪化に苦しむクライアントから販管費20%削減の依頼。どう進めるか?」", de: "'A margin-squeezed client asks for a 20% SG&A reduction. How do you proceed?'",
    dom: 4,
    steps: [
      { tj: "目的とガードレールを確認する", te: "Confirm the purpose and guardrails", bj: "「何のための削減か(生存か・再投資原資か)」で削り方が変わる。品質・安全・法令・顧客体験の下限(ガードレール)と聖域の有無を先に合意し、「20%」という数字自体の根拠も確認する。", be: "Why we're cutting (survival vs funding reinvestment) changes how we cut. Agree first on floors — quality, safety, compliance, customer experience — and sanctuaries, and probe where the '20%' even came from." },
      { tj: "コストを構造化しベースラインを固定する", te: "Structure the cost base and fix the baseline", bj: "販管費を費目×活動×固変で見える化し、「誰が・何のために・いくら使っているか」の地図を作る。ベースライン(比較の起点)を固定しないと削減効果が測れず、成果の水増しが起こる。", be: "Map SG&A by account × activity × fixed/variable — who spends what, for what. Without a frozen baseline, savings can't be measured and get inflated." },
      { tj: "削減レバーを列挙し効き目×難易度で評価する", te: "Enumerate levers, score by impact × difficulty", bj: "レバーは5系統:やめる(業務廃止)・減らす(頻度・水準)・安くする(調達交渉・仕様)・まとめる(共通化・集約)・自動化する。各レバーを金額インパクト×実行難易度×効果発現速度で採点し優先順位づけする。", be: "Five lever families: eliminate, reduce (frequency/level), buy cheaper (negotiation/specs), consolidate, automate. Score each on impact × difficulty × speed-to-effect and rank." },
      { tj: "筋肉と脂肪を峻別する", te: "Separate muscle from fat", bj: "一律◯%カットは診断なき外科手術で、成長投資・顧客接点・中核能力(筋肉)ごと削る。活動を「価値貢献」と突き合わせ、脂肪(重複・過剰品質・使われない報告書)に刃を集中する。守る費目を明示することが現場の協力を引き出す。", be: "Flat cuts are surgery without diagnosis, slicing growth investment and customer touchpoints (muscle) along with fat (duplication, gold-plating, unread reports). Naming what will be protected is what earns frontline cooperation." },
      { tj: "実行を設計しリバウンドを防ぐ", te: "Design execution and prevent rebound", bj: "クイックウィン(90日で見える成果)を先行させ推進力を作る。レバーごとにオーナー・金額目標・追跡指標を設定し、削減分の予算を翌年度ベースから恒久的に外す。仕組みを変えない削減は2年で元に戻る。", be: "Lead with 90-day quick wins to build momentum. Assign each lever an owner, target, and tracking metric, and remove savings from next year's budget base permanently. Cuts that don't change the system rebound within two years." },
    ],
  },
  {
    tj: "新規事業ケース:0→1の立ち上げ検証", te: "New venture case: validating from zero to one",
    dj: "「大手メーカーの新規事業チームが新サービス案を持ってきた。事業化すべきか?」", de: "'A corporate venture team brings a new service concept. Should it be pursued?'",
    dom: 3,
    steps: [
      { tj: "検証すべき論点を順序づける", te: "Sequence the issues to test", bj: "新規事業の論点は①課題は実在するか②解決策は欲しがられるか③顧客は払うか④採算が成り立つか⑤自社が勝てるか。最も安く検証でき、かつ死因になりやすい上流(①)から順に潰す。", be: "The issues: (1) does the problem exist, (2) is the solution wanted, (3) will they pay, (4) do the economics work, (5) can we win. Attack them upstream-first — the cheapest tests kill the most ventures." },
      { tj: "課題仮説を検証する(解決策を語らない)", te: "Test the problem hypothesis (don't pitch)", bj: "顧客インタビューでは自案の説明を封印し、過去の実際の行動(最後にその問題が起きた時どうしたか・いくら/何時間かけたか)を聞く。回避行動や自作の代替手段(ワークアラウンド)の実在が、課題の実在の最強の証拠。", be: "In interviews, seal away your pitch and ask about actual past behavior — what they did last time, what it cost in money and hours. Existing workarounds are the strongest evidence the problem is real." },
      { tj: "解決策を最小コストで検証する", te: "Test the solution at minimum cost", bj: "コンシェルジュ型(人力を公言)やオズの魔法使い型(裏側人力)で、作り込む前に体験の価値を検証する。検証すべき最大リスクに対して最小の作り物を選ぶのが規律で、「まず完成させてから」は最も高価な検証手段。", be: "Use concierge or Wizard-of-Oz prototypes to test the experience before building. Match the smallest artifact to the biggest risk — 'finish it first' is the most expensive possible test." },
      { tj: "経済性を検証する", te: "Test the economics", bj: "支払意思は行動(事前予約・有償パイロット)で確認し、ユニットエコノミクス(LTV/CAC≧3の目安)と市場規模(TAM/SAM/SOM)を試算する。単価×顧客数の上限が事業の器を決めるため、「良いサービスだが小さすぎる」を早期に見抜く。", be: "Confirm willingness to pay through behavior (pre-orders, paid pilots), then model unit economics (LTV/CAC ≥ 3) and market size (TAM/SAM/SOM). Price × customer ceiling sets the venture's vessel — catch 'lovely but tiny' early." },
      { tj: "段階投資でGo/No-Goを運用する", te: "Run Go/No-Go with staged investment", bj: "一括投資でなくマイルストーン型(検証クリアごとに増資)にし、撤退基準を着手前に書面化する。判断者と推進者を分け、サンクコストと愛着が基準を侵食するのを防ぐ。撤退は失敗でなく「安く学んだ」成果と定義する。", be: "Fund by milestones, not lump sums, with exit criteria written before work begins. Separate the judge from the champion so sunk costs and affection can't erode the bar. Define exits as cheap learning, not failure." },
    ],
  },
  {
    tj: "組織変革ケース:全社DX推進が進まない", te: "Change case: a stalled company-wide DX",
    dj: "「トップがDXを号令し予算もついたが、2年経っても現場が動かない。何が問題で、どう再起動するか?」", de: "'The CEO decreed DX and funded it, yet two years on the frontline hasn't moved. What's wrong, and how do you restart it?'",
    dom: 1,
    steps: [
      { tj: "「動かない」を3因に分解して診断する", te: "Diagnose 'won't move' into three causes", bj: "実行されない原因を知らない(伝わっていない)・できない(スキル/権限/ツールがない)・やる気がない(評価・インセンティブが旧来のまま)にMECEに分ける。多くのDX停滞は「号令は届いたが、できない×やる気がない」の複合で、研修(=できない対策)だけ打っても動かない。", be: "Split the failure MECE into don't-know (message never landed), can't (no skills, authority, or tools), and won't (incentives still reward the old way). Most DX stalls are a can't × won't compound — training alone (a can't fix) won't move it." },
      { tj: "抵抗を「不合理」でなく「合理的反応」と読み替える", te: "Reread resistance as rational, not irrational", bj: "現場の抵抗は多くの場合、既存の評価軸(短期の数字・失敗の罰)の下での最適行動。「なぜ動かないか」を人の問題でなく仕組みの問題として問う(5 Whysの主語を仕組みに置く)。抵抗の中身にこそ、変革設計の欠陥情報が埋まっている。", be: "Frontline resistance is usually optimal behavior under the existing incentives (short-term numbers, punished failure). Ask why they won't move as a systems question, not a people one (five whys with the system as subject). The resistance encodes the design flaws of the change itself." },
      { tj: "早期の勝ちパターン(クイックウィン)を作り可視化する", te: "Manufacture and broadcast early wins", bj: "全社一斉でなく、意欲と条件の揃った一部門で90日以内の目に見える成果を作る。変革は論理でなく実例で伝播する:『あの部署が楽になって数字も出た』という社内の生き証人が、抽象的な号令より強い。コッターの言う短期的成果の演出。", be: "Skip the big-bang; engineer a visible 90-day win in one willing, well-conditioned unit. Change spreads through proof, not logic: a live internal witness ('that team got easier AND hit its numbers') beats any abstract decree. Kotter's short-term wins." },
      { tj: "仕組み(評価・権限・プロセス)を新戦略に合わせて作り替える", te: "Rewire systems — incentives, authority, process — to the new strategy", bj: "7SでいえばStrategyだけ変えてSystems(評価・報酬)とStaff(スキル)が旧のままなら組織は動かない。DX行動を評価に組み込み、意思決定権限を現場に降ろし、失敗を許容する場(実験枠)を制度化する。号令の効果は仕組みの整合で決まる。", be: "In 7S terms, changing Strategy while Systems (rewards) and Staff (skills) stay old freezes the org. Bake DX behavior into appraisals, push decision rights down, and institutionalize a safe-to-fail experiment space. A decree's power equals the alignment of the systems beneath it." },
      { tj: "変革を制度化し後戻りを防ぐ", te: "Anchor the change and prevent regression", bj: "初期の勢いは必ず減衰する。新しいやり方を『次の当たり前』にするため、標準プロセス・オンボーディング・後任育成に組み込み、旧プロセスへの退路を意図的に断つ。変革の失敗の多くは立ち上げでなく、定着前の中だるみで旧習に回帰することで起きる。", be: "Early momentum always decays. To make the new way the next default, embed it in standard processes, onboarding, and succession, and deliberately remove the path back to the old process. Most change failures happen not at launch but in the mid-slump, regressing to old habits before anchoring." },
    ],
  },
  {
    tj: "フェルミ推定:コンビニの1日来店客数(供給サイド)", te: "Fermi: daily convenience-store visits (supply side)",
    dj: "「日本のコンビニ全体で1日に何人が来店するか」を供給サイドで概算する。", de: "Estimate Japan's total daily convenience-store visits from the supply side.",
    dom: 4,
    steps: [
      { tj: "サイドを選び、式を宣言する", te: "Pick the side, declare the formula", bj: "需要(人口×利用頻度)でも解けるが、店舗という供給単位が明確なので供給サイドを選ぶ:来店客数 = 店舗数 × 1店舗あたり日次客数。選んだ理由を一言添えるのが作法。", be: "Demand-side works too, but stores are a clean supply unit: visits = store count × daily visits per store. Say why you chose the side." },
      { tj: "店舗数を置く", te: "Place the store count", bj: "コンビニは大手3チェーンで大半を占め、合計はおよそ5.5万店程度と置く。知らなくても「人口2,200人に1店」のような比率から逆算して概数を作れる。", be: "Assume roughly 55,000 stores (the big three dominate). If unknown, derive it: about one store per ~2,200 people." },
      { tj: "1店舗の日次客数を仮定する", te: "Assume per-store daily visits", bj: "立地で幅が大きい(オフィス街>住宅街)。平均をおよそ800人/日と置き、幅(600〜1,000)も添える。1時間あたりに直すと約50人 — 感覚と照合できる粒度に落とすのがコツ。", be: "Location spreads it widely; take ~800/day with a 600-1,000 band. That's ~50/hour — a checkable granularity." },
      { tj: "計算する", te: "Compute", bj: "5.5万店 × 800人 = 4,400万人/日。桁の確認:5.5×8=44、万×百=百万の桁 → 4,400万。", be: "55k × 800 = 44M visits/day. Watch the orders: 5.5 × 8 = 44, ten-thousands × hundreds = millions." },
      { tj: "サニティチェック", te: "Sanity check", bj: "人口1.25億人に対し1日4,400万来店 = 国民の約3人に1人が毎日1回。通勤層の複数回利用を含むと考えれば桁として妥当。需要サイド(利用者×頻度)で逆算して突き合わせれば精度の主張になる。", be: "44M visits vs 125M people means one in three daily — plausible with repeat visits. Cross-checking from the demand side is your accuracy claim." },
    ],
  },
  {
    tj: "AX投資ケース:営業事務エージェントの投資判断", te: "AX investment case: judging the sales-ops agent",
    dj: "「営業事務にAIエージェントを入れたい。投資判断をどう組み立てるか?」", de: "'We want an agent in sales operations. How do you build the investment decision?'",
    dom: 6,
    steps: [
      { tj: "Beforeを実測してから語る", te: "Measure the baseline first", bj: "対象業務の月間件数・1件あたり時間・エラー率を先に取る。Before実測なしのROIは検証不能な作文になる — 「導入後に測る」は判断の放棄。", be: "Take monthly volume, minutes per item and error rate first. ROI without a baseline is unverifiable prose; measure later is a non-decision." },
      { tj: "効果を3分類で積む", te: "Stack benefits in three classes", bj: "コスト削減(測りやすい・上限あり)/売上増(測りにくい・上限なし)/リスク回避(確率×損害額)。削減だけの積み上げは投資規模の天井が早い — 売上系レバーを必ず1本入れる。", be: "Cost cuts (measurable, capped), revenue (uncapped), risk (probability × impact). Cuts alone cap the case early — include one revenue lever." },
      { tj: "時間×時給の罠を自分から封じる", te: "Renounce the hours-times-wage trap yourself", bj: "「削減時間×時給」は再配置計画がなければ利益にならない。出てくるのは余力であり、その使い道(増件対応・残業減・人員計画)まで言って初めて効果になる — 先に自分で言うと信頼が生まれる。", be: "Hours saved times wage is not profit without a redeployment plan; it is capacity. Naming where it goes — volume, overtime, staffing — is what makes it a benefit. Saying so first builds trust." },
      { tj: "段階投資と撤退ゲートを設計する", te: "Design staged investment with exit gates", bj: "PoC→パイロット→展開の各ゲートに評価条件と足切りを事前固定し、撤退可能性を残す(実物オプション)。全社一括投資は撤退オプションを自ら潰す設計。", be: "Freeze evaluation conditions and cut-offs at each gate — PoC, pilot, rollout — keeping the exit open (a real option). One big-bang spend destroys your own option." },
      { tj: "CFOの言葉で締める", te: "Close in the CFO's language", bj: "効果が誰のPLのどの科目に、いつ、いくらで現れるかまで言い切る。回収期間12〜18か月なら通りやすく、24か月超なら分割・縮小を検討 — 数字の置き場所まで示すのが提言。", be: "Say whose P&L line the benefit lands on, when, and how much. Twelve to eighteen months payback passes; beyond twenty-four, split or descope. A recommendation names where the number sits." },
    ],
  },
];

// =====================================================================
// CASE MCQ OPTIONS — index 0 is always correct (shuffled at render)
// =====================================================================
const CASE_OPTS = [
  [ // 0: Fermi cafe
    [["計算前に「人口×利用率×頻度×単価」と式を宣言する", "Declare the formula (population × usage × frequency × price) before computing"], ["いきなり電卓を叩いて計算を始める", "Start punching numbers immediately"], ["正確な統計データを探しに行く", "Go hunting for exact statistics"], ["直感で「5,000億円」と即答する", "Gut-call ¥500B instantly"]],
    [["人口1.25億人に常識的な利用率(約50%)を根拠付きで置く", "Put a reasoned ~50% usage rate on 125M people"], ["利用率を小数点2桁まで精密化しようと悩む", "Agonize over two-decimal precision"], ["全国民がカフェを使うと仮定する", "Assume every citizen uses cafés"], ["面接官に正解の利用率を尋ねる", "Ask the interviewer for the right rate"]],
    [["頻度・単価に生活実感と整合する仮定(月2回・500円)を置く", "Assume frequency and price consistent with daily life (2/month, ¥500)"], ["自分の利用頻度(毎日)を全体に適用する", "Project your own daily habit onto everyone"], ["単価は不明なので0円と置く", "Set price to zero as unknown"], ["頻度は重要でないので省略する", "Skip frequency as unimportant"]],
    [["桁に注意して掛け、中間値も声に出して検算する", "Multiply carefully, verbalizing intermediate values"], ["暗算で最終値だけ一気に言う", "Blurt only the final number"], ["電卓がないので計算不能と答える", "Declare it uncomputable without a calculator"], ["有効数字10桁で答える", "Answer to ten significant figures"]],
    [["1人あたり年間支出に直し生活実感と突き合わせる", "Normalize per capita and test against lived reality"], ["出た数字をそのまま断定して終了する", "Assert the raw output and stop"], ["数字を2倍して安全マージンを取る", "Double it as a safety margin"], ["面接官の表情で正誤を判断する", "Read the interviewer's face"]],
  ],
  [ // 1: Profitability
    [["利益=売上−コスト、売上=単価×数量へ分解し所在を絞る", "Decompose profit = revenue − cost, revenue = P × Q to localize"], ["まず営業増員を提案する", "Propose hiring reps first"], ["直近の業界ニュースを読み漁る", "Binge industry news"], ["社長の見立てをそのまま採用する", "Adopt the CEO's hunch as-is"]],
    [["製品別・地域別・チャネル別に切り劣化箇所を特定する", "Cut by product, region, channel to find the failing branch"], ["全社平均の数字だけで判断する", "Judge from company-wide averages"], ["景気のせいと確定させる", "Blame the economy and close"], ["データが多いので分析を外注する", "Outsource the analysis"]],
    [["市場成長率と自社成長率を比べ、市場問題かシェア問題か分離する", "Compare market vs company growth to split market decline from share loss"], ["外部要因は制御不能なので無視する", "Ignore externals as uncontrollable"], ["競合の悪評を収集する", "Collect rival gossip"], ["為替だけ確認して終える", "Check FX and stop"]],
    [["検証可能な仮説(LCC参入で価格感度層が流出)を立てデータで検証", "Form a testable hypothesis (LCC entry took price-sensitive users) and test it"], ["仮説は偏見の元なので立てない", "Avoid hypotheses as bias"], ["全データを見てから考える", "Look at all data before thinking"], ["仮説に合う情報だけ集める", "Collect only confirming data"]],
    [["短期/中期に分けインパクト×実現性で優先順位づけ、結論から提言", "Split short vs mid-term, rank by impact × feasibility, answer first"], ["思いつく施策を全部列挙する", "List every idea unranked"], ["決定は先送りし追加調査を提案する", "Defer and propose more study"], ["値下げ一本で勝負する", "Bet everything on a price cut"]],
  ],
  [ // 2: Market entry
    [["魅力度・勝ち筋・参入方法・リスクの4論点をMECEに宣言する", "Declare four MECE issues: attractiveness, right to win, entry mode, risk"], ["いきなり市場規模の計算を始める", "Jump straight into market sizing"], ["参入ありきで手続きを調べる", "Research procedures assuming entry"], ["競合トップの経歴を調べる", "Research rival executives' bios"]],
    [["TAM/SAM/SOM・成長率・5フォース・規制で魅力度を評価する", "Assess size (TAM/SAM/SOM), growth, Five Forces, regulation"], ["市場規模の大きさだけで判断する", "Judge on raw size alone"], ["現地の気候と食文化を調査する", "Study climate and cuisine"], ["SNSの評判だけ確認する", "Check social buzz only"]],
    [["自社の強みが現地KSFに合致するか競合比で検証する", "Test whether our strengths match local KSFs versus rivals"], ["国内での成功をそのまま前提にする", "Assume domestic success transfers"], ["強みは謙遜して低めに見積もる", "Modestly understate strengths"], ["社歴の長さを勝ち筋と定義する", "Define company age as the edge"]],
    [["輸出/ライセンス/合弁/買収/自社設立を速度・投資・リスクで比較", "Compare export / license / JV / M&A / greenfield on speed, capital, risk"], ["「参入するか否か」の二択で議論する", "Debate only enter vs not-enter"], ["最も投資額の大きい方法を選ぶ", "Pick the costliest mode"], ["競合と同じ方法を無条件に選ぶ", "Copy the rival's mode blindly"]],
    [["条件付き(SOM◯億超×パートナー確保)でAnswer Firstで締める", "Conclude answer-first with explicit conditions (SOM threshold × partner secured)"], ["「状況次第です」と曖昧に締める", "Close with 'it depends'"], ["結論を述べず追加分析を提案する", "Skip the answer, propose more analysis"], ["全条件が確定するまで沈黙する", "Stay silent until everything is certain"]],
  ],
  [ // 3: Pricing
    [["コスト・競合・価値の3レンズを宣言し併用する", "Declare and combine the three lenses: cost, competition, value"], ["原価に一律30%乗せて即決する", "Slap 30% on cost and decide"], ["競合と同額に即決する", "Match the rival instantly"], ["社長の希望価格を聞いて従う", "Ask the CEO's preferred price"]],
    [["変動費単価を下限とし損益分岐点を計算する", "Set variable cost as the floor and compute break-even"], ["固定費は価格に無関係なので無視する", "Ignore fixed costs entirely"], ["下限は0円と置く", "Set the floor at zero"], ["原価は推測で済ませる", "Guess the costs"]],
    [["最も近い代替品の価格帯を確認し相場との距離を測る", "Map the nearest substitutes' range and your distance from it"], ["競合価格は一切見ない", "Never look at rival prices"], ["最高値の競合だけを参照する", "Reference only the priciest rival"], ["海外市場の価格をそのまま使う", "Import overseas prices as-is"]],
    [["顧客の経済価値(節約額・便益)からWTP上限を推定する", "Estimate the WTP ceiling from the customer's economic value (savings, benefits)"], ["「いくらなら買う?」と聞くだけで済ます", "Just ask 'what would you pay?'"], ["上限は青天井とみなす", "Treat the ceiling as infinite"], ["WTPは測定不能と諦める", "Give up on WTP as unmeasurable"]],
    [["戦略目的(シェアvs利益)でペネトレーションかスキミングを選ぶ", "Let strategy (share vs margin) choose penetration or skimming"], ["3手法の平均値を機械的に採用する", "Mechanically average the three lenses"], ["常に最も高い値を選ぶ", "Always pick the highest number"], ["最後はくじ引きで決める", "Draw lots"]],
  ],
  [ // 4: MBB comparison
    [["MECE・ピラミッド・空雨傘など「構造の規律」が文化の中核", "Structural discipline — MECE, pyramids, Sky-Rain-Umbrella — is the cultural core"], ["直感と人脈だけが文化の中核", "Gut and connections are the core"], ["分析より接待力を重視する", "Entertaining clients beats analysis"], ["構造化を意図的に禁止している", "Structuring is deliberately banned"]],
    [["論点思考と仮説思考:正しい問いの設定と大胆な仮説構築を重視", "Issue thinking and hypothesis thinking: the right question, then bold hypotheses"], ["網羅的な情報収集を最重視する", "Exhaustive data collection above all"], ["仮説を持つことを禁じる文化", "Hypotheses are forbidden"], ["結論を最後まで保留する文化", "Conclusions withheld to the end"]],
    [["Answer Firstと、実行・業績という「結果」へのコミットが特徴", "Answer First plus commitment to measurable results and implementation"], ["提言のみで実行には関与しない", "Recommendations only, never implementation"], ["結論を述べない奥ゆかしさが特徴", "Famous for never concluding"], ["分析業務をすべて外注する", "Outsources all analysis"]],
    [["論点定義→分解→仮説→検証→結論先出しの同一エンジンを共有", "All three share one engine: define → decompose → hypothesize → test → answer first"], ["三社は全く異なる思考体系を持つ", "The three share nothing methodologically"], ["共通点は料金体系だけ", "Only their fee models are alike"], ["共通点はオフィスの立地だけ", "Only their office locations are alike"]],
    [["構造化・数値感覚・ビジネスセンス・コミュニケーションの4軸", "Structuring, quantitative sense, business judgment, communication"], ["学歴と資格の数で評価する", "Degrees and certificate counts"], ["声の大きさと体力で評価する", "Volume and stamina"], ["フレームワークの暗記量で評価する", "Framework memorization volume"]],
  ],
  [ // 5: M&A
    [["戦略適合・単体価値・シナジー・価格・実行リスクの5論点を宣言", "Declare five issues: fit, standalone value, synergies, price, execution risk"], ["まず価格交渉から始める", "Open with price haggling"], ["相手のオフィスを見学に行く", "Tour the target's office"], ["新聞報道を集めて雰囲気を掴む", "Collect press clippings for vibes"]],
    [["買収の目的を明確化しbuild(自力)/ally(提携)と比較する", "Clarify the deal's purpose and compare against build or ally"], ["買収ありきで手続きを進める", "Proceed assuming the deal"], ["目的は成約後に考える", "Define purpose after closing"], ["同業が買っている流行に乗る", "Ride the acquisition fad"]],
    [["DCFと類似会社マルチプルで単体価値のレンジを作る", "Bracket standalone value with DCF and comparable multiples"], ["簿価をそのまま企業価値とする", "Use book value as the value"], ["売り手の言い値を評価基準にする", "Anchor on the seller's ask"], ["価値評価は面倒なので省略する", "Skip valuation"]],
    [["シナジーを確度と時期で割引き、統合コストとディスシナジーを控除", "Discount synergies by probability and timing; subtract integration costs and dis-synergies"], ["夢は大きくシナジーを満額計上する", "Book synergies at full dream value"], ["コストシナジーは地味なので無視", "Ignore boring cost synergies"], ["収益シナジーを最も確実とみなす", "Treat revenue synergies as the surest"]],
    [["支払上限=単体価値+調整後シナジー−必要リターンで定め条件付き結論", "Set walk-away = standalone + adjusted synergies − required return; conclude with conditions"], ["競り勝つまで無制限に価格を上げる", "Outbid without limit"], ["上限は決めず柔軟に交渉する", "Negotiate with no ceiling"], ["相手の希望額で即決する", "Accept the ask on the spot"]],
  ],
  [ // 6: Turnaround
    [["13週資金繰り表を作りキャッシュ最優先で滑走路を延ばす", "Build a 13-week cash forecast and extend the runway first"], ["まず3ヶ年の中期ビジョンを策定する", "Draft a 3-year vision first"], ["全社員に危機感醸成の研修を行う", "Run urgency-mindset training"], ["ブランドロゴを刷新して心機一転する", "Refresh the logo for a new start"]],
    [["店舗別・カテゴリ別に赤字を分解し80/20で出血源を特定する", "Decompose losses by store and category; find the bleed with 80/20"], ["全店一律◯%のコスト削減を即実施", "Impose a flat cost cut everywhere now"], ["最も古い店から順に閉める", "Close the oldest stores first"], ["赤字は景気のせいと結論づける", "Conclude the economy did it"]],
    [["残す/直す/畳むに仕分け、撤退も再生の打ち手と位置づける", "Triage keep / fix / exit — treating exits as turnaround moves"], ["全店舗を維持して気合で頑張る", "Keep every store and push harder"], ["思い入れの強い店を優先して残す", "Keep the sentimental favorites"], ["判断を避けて全店舗を即閉鎖する", "Close everything to avoid choosing"]],
    [["固定費をゼロベースで見直しBEPを縮小売上でも黒字の水準へ下げる", "Zero-base fixed costs, pulling break-even below the shrunken revenue line"], ["売上回復を待ち固定費は温存する", "Preserve fixed costs awaiting recovery"], ["管理強化のため本部人員を倍増する", "Double HQ staff for control"], ["値上げのみで採算を合わせる", "Fix economics with price hikes alone"]],
    [["中核への再投資ストーリーとマイルストーンを金融機関・従業員に示す", "Present a core-reinvestment story with milestones to banks and staff"], ["縮小均衡の達成で計画を終了する", "End the plan at shrink-to-survive"], ["目標は「全員頑張る」で十分とする", "Set 'everyone tries hard' as the goal"], ["成果は3年後に一括達成する計画にする", "Back-load all results into year three"]],
  ],
  [ // 7: Cost reduction
    [["削減の目的とガードレール(品質・安全・聖域)を先に合意する", "Agree first on the cut's purpose and guardrails (quality, safety, sanctuaries)"], ["即日で一律20%カットを通達する", "Decree a flat 20% cut today"], ["まず人員削減リストを作る", "Draft the layoff list first"], ["20%という数字を無条件に受け入れる", "Accept the 20% figure unquestioned"]],
    [["費目×活動×固変で見える化しベースラインを固定する", "Map costs by account × activity × behavior and freeze the baseline"], ["大きい費目から順に機械的に削る", "Cut the biggest accounts mechanically"], ["各部門の自己申告に任せる", "Let each department self-report savings"], ["ベースラインは後で決める", "Fix the baseline later"]],
    [["やめる・減らす・安くする・まとめる・自動化の5レバーを効き目×難易度で採点", "Score five levers (eliminate, reduce, buy cheaper, consolidate, automate) by impact × difficulty"], ["思いついた施策から順に着手する", "Start with whatever comes to mind"], ["自動化だけに絞って検討する", "Consider automation only"], ["他社の削減事例をそのまま採用する", "Copy another firm's cuts verbatim"]],
    [["価値貢献と突き合わせ、脂肪に刃を集中し守る費目を明示する", "Match spend to value, aim at fat, and name what will be protected"], ["全費目を平等に同率で削る", "Cut every line at the same rate"], ["顧客接点コストから先に削る", "Cut customer touchpoints first"], ["成長投資を真っ先に止める", "Halt growth investment first"]],
    [["クイックウィン先行・オーナーと追跡指標・予算ベースからの恒久控除", "Lead with quick wins; assign owners and metrics; remove savings from the budget base permanently"], ["宣言だけして進捗は追わない", "Announce and never track"], ["全施策を3年後に一括実行する", "Execute everything in year three"], ["削減分は翌年の予算に戻す", "Return savings to next year's budget"]],
  ],
  [ // 8: New venture 0→1
    [["課題実在→欲しさ→支払→採算→勝ち筋の順に、安く死因を潰す", "Sequence the tests problem → desirability → payment → economics → right to win, killing risks cheaply upstream"], ["まず完成品の開発に着手する", "Start building the full product"], ["いきなり全国展開の計画を作る", "Draft the national rollout first"], ["競合が出るまで様子を見る", "Wait until rivals move"]],
    [["自案を語らず、過去の実際の行動とワークアラウンドを聞く", "Seal the pitch; ask about actual past behavior and workarounds"], ["自案を熱く説明して感想を聞く", "Pitch passionately and collect reactions"], ["「あったら使いますか?」と聞く", "Ask 'would you use this if it existed?'"], ["家族と同僚の意見だけ集める", "Survey only family and colleagues"]],
    [["コンシェルジュ/オズ型で作り込む前に体験価値を検証する", "Use concierge / Wizard-of-Oz prototypes to test the experience before building"], ["全機能を実装してから見せる", "Implement everything, then show it"], ["検証は省略して直感で進める", "Skip testing; trust the gut"], ["特許出願を最優先する", "File patents first"]],
    [["支払意思を行動(有償パイロット)で確認しLTV/CACと市場規模を試算", "Confirm payment through behavior (paid pilots); model LTV/CAC and market size"], ["アンケートの「買いたい」を売上とみなす", "Treat survey intent as revenue"], ["採算は黒字化してから考える", "Worry about economics after profitability"], ["市場規模は大きいはずと仮定する", "Assume the market must be big"]],
    [["マイルストーン型増資と事前の撤退基準、判断者と推進者の分離", "Milestone funding, pre-written exit criteria, and separating judge from champion"], ["初日に全額を一括投資する", "Invest the full amount on day one"], ["撤退基準は状況を見て後で決める", "Decide exit criteria later, as things unfold"], ["推進者自身に撤退判断を任せる", "Let the champion judge their own exit"]],
  ],
  [ // 9: Change / DX
    [["知らない・できない・やる気がないの3因にMECEに分解して診断する", "Diagnose MECE into don't-know, can't, and won't"], ["やる気の問題と断定して精神論の研修を打つ", "Declare it a motivation problem and run pep-talk training"], ["現場の抵抗勢力を更迭する", "Purge the resisters"], ["DXの号令をさらに強く繰り返す", "Repeat the DX decree even louder"]],
    [["抵抗を旧評価軸の下での合理的反応と読み、仕組みの欠陥を探る", "Read resistance as rational under old incentives and hunt the system's flaws"], ["現場が保守的で非協力的だと結論づける", "Conclude the frontline is conservative and uncooperative"], ["抵抗する個人の性格を分析する", "Analyze the resisters' personalities"], ["抵抗は無視して強行する", "Ignore resistance and force it through"]],
    [["意欲と条件の揃った一部門で90日の勝ちパターンを作り可視化する", "Engineer and broadcast a 90-day win in one willing, well-conditioned unit"], ["全部門で一斉に完全移行する", "Switch every department over at once"], ["成果が出るまで社内には一切共有しない", "Share nothing internally until results are proven"], ["最も抵抗の強い部門から着手する", "Start with the most resistant unit"]],
    [["評価・権限・プロセスを新戦略に合わせて作り替える", "Rewire incentives, authority, and process to the new strategy"], ["戦略の号令だけ変えて仕組みは据え置く", "Change the strategy decree but leave the systems intact"], ["旧評価制度のままDX行動を求める", "Demand DX behavior under the old appraisal system"], ["権限は本部に集中したまま現場に実行を命じる", "Keep authority at HQ and order the frontline to execute"]],
    [["標準プロセス・育成に組み込み旧プロセスへの退路を断つ", "Embed it in standard process and succession, removing the path back"], ["立ち上げが済めば自然に定着すると考える", "Assume it anchors itself once launched"], ["初期の勢いが続く前提で監視をやめる", "Stop monitoring, assuming momentum persists"], ["旧プロセスも並行して残し選択制にする", "Keep the old process in parallel as an option"]],
  ],
  [ // 12: Fermi convenience store (supply side)
    [["店舗という供給単位が明確なので供給サイドを選び、式を宣言する", "Pick the supply side for its clean unit (stores) and declare the formula"], ["需要サイドと供給サイドの両方を最後まで並行して計算する", "Run demand and supply sides fully in parallel from the start"], ["どちらのサイドかは決めずに手元の数字から計算を始める", "Start computing from whatever numbers you have"], ["過去の統計資料を検索して正確な値を先に確認する", "Search for the exact statistic first"]],
    [["約5.5万店と置き、知らなければ人口比(2,200人に1店)から逆算する", "Assume ~55k stores, or derive from one per ~2,200 people"], ["店舗数は企業秘密なので推定をあきらめて別の問題に変える", "Give up since store counts are secret"], ["1万店と置いて計算を簡単にする", "Call it 10k stores to simplify"], ["全チェーンの公式サイトを1社ずつ数え上げる", "Count each chain's site one by one"]],
    [["立地差に触れつつ平均800人/日(幅600〜1,000)と置き、時間あたりに直して感覚と照合する", "Take ~800/day with a band, convert to per-hour and gut-check"], ["最も混む店の数字(3,000人/日)を全店に適用する", "Apply the busiest store's 3,000/day to all"], ["客数は分からないので売上から遠回りに逆算し直す", "Detour through revenue instead"], ["幅は示さず1点の数字だけを置く", "One point estimate, no band"]],
    [["5.5万×800=4,400万人/日。桁を声に出して確認する", "55k × 800 = 44M/day, checking the orders aloud"], ["電卓がないので概算をあきらめる", "No calculator, so give up"], ["4.4億人/日と即答する", "Answer 440M/day instantly"], ["44万人/日と即答する", "Answer 440k/day instantly"]],
    [["国民の約3人に1人が毎日来店という含意を需要サイドと突き合わせて妥当性を語る", "Read the one-in-three implication and cross-check from the demand side"], ["計算が終わったので検算せずに結論を述べる", "Done computing, so conclude without checking"], ["実際の統計と1%単位で一致するまで数字を調整する", "Tune until it matches statistics to 1%"], ["日本の人口を上回っていないかだけ確認して終える", "Only check it doesn't exceed the population"]],
  ],
  [ // 13: AX investment case
    [["月間件数・1件あたり時間・エラー率のBeforeを先に実測する", "Measure baseline volume, minutes and error rate first"], ["導入を先に決め、効果は運用が落ち着いてから測る", "Decide first, measure after things settle"], ["ベンダーの標準的な導入効果の数字をそのまま使う", "Use the vendor's standard benefit figures"], ["経営の号令があるので測定は省略して速度を優先する", "Skip measurement — the executives already ordered it"]],
    [["削減・売上増・リスク回避の3分類で積み、売上系レバーを必ず1本入れる", "Stack cuts, revenue and risk — with at least one revenue lever"], ["最も測りやすいコスト削減だけで投資額を正当化する", "Justify the spend on easily-measured cuts alone"], ["定性的な「働き方改革効果」を主軸に据える", "Lead with qualitative workstyle benefits"], ["リスク回避効果は不確実なので常に除外する", "Always exclude risk benefits as uncertain"]],
    [["削減時間は「余力」であり、再配置先まで言って初めて効果になると自分から言う", "Say yourself that hours saved are capacity until redeployed"], ["時間×時給をそのまま年間削減額として提示する", "Present hours × wage as the annual saving"], ["効果の解釈は経理部門に委ねる", "Leave interpretation to accounting"], ["余力の使い道は導入後に現場が自然に決めると説明する", "The field will naturally decide after launch"]],
    [["PoC→パイロット→展開の各ゲートに評価条件と足切りを事前固定し撤退可能性を残す", "Freeze gate conditions with exits kept open"], ["承認の手間を省くため初回から全社一括で投資する", "Invest company-wide at once to save approvals"], ["ゲートは置くが評価条件は結果を見てから決める", "Set gates but decide criteria after results"], ["撤退条件を示すと弱気に見えるので提案からは外す", "Hide exit criteria — they look weak"]],
    [["効果が誰のPLのどの科目に・いつ・いくらで現れるかと回収期間まで言い切る", "Name the P&L line, timing, amount and payback"], ["技術の先進性を強調して締める", "Close on technical sophistication"], ["競合他社の導入事例の列挙で締める", "Close with a list of competitors' deployments"], ["回収期間はあえて示さず柔軟性を残す", "Withhold payback to stay flexible"]],
  ],
];
CASE_OPTS.forEach((c, i) => c.forEach((o, j) => { if (CASES[i] && CASES[i].steps[j]) CASES[i].steps[j].opt = o; }));

// =====================================================================
// DIAGRAMS (SVG)
// =====================================================================
function DiagramPyramid({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 340" style={{ width: "100%", height: "auto" }}>
      <rect x="220" y="20" width="200" height="52" rx="6" fill={C.ink} />
      <text x="320" y="42" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{t("結論(メインメッセージ)", "Conclusion (Main message)")}</text>
      <text x="320" y="60" textAnchor="middle" fill="#9FB2D0" fontSize="11">{t("Answer First", "Answer First")}</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1="320" y1="72" x2={140 + i * 180} y2="130" stroke={C.blue} strokeWidth="2" />
          <rect x={70 + i * 180} y="130" width="140" height="44" rx="6" fill={C.blue} opacity="0.92" />
          <text x={140 + i * 180} y="156" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">{t(`根拠 ${i + 1}`, `Key line ${i + 1}`)}</text>
          {[0, 1].map((k) => (
            <g key={k}>
              <line x1={140 + i * 180} y1="174" x2={105 + i * 180 + k * 70} y2="222" stroke={C.line} strokeWidth="2" />
              <rect x={72 + i * 180 + k * 70} y="222" width="66" height="38" rx="5" fill="#fff" stroke={C.line} />
              <text x={105 + i * 180 + k * 70} y="245" textAnchor="middle" fill={C.sub} fontSize="10">{t("事実", "Fact")}</text>
            </g>
          ))}
        </g>
      ))}
      <text x="26" y="105" fill={C.crimson} fontSize="11" fontWeight="700">↑ So What?</text>
      <text x="26" y="122" fill={C.sub} fontSize="10">{t("(示唆を上へ)", "(implication up)")}</text>
      <text x="540" y="105" fill={C.teal} fontSize="11" fontWeight="700">↓ Why So?</text>
      <text x="540" y="122" fill={C.sub} fontSize="10">{t("(根拠を下へ)", "(support down)")}</text>
      <text x="320" y="300" textAnchor="middle" fill={C.sub} fontSize="11">{t("横の論理:同レベルはMECE / 縦の論理:So What?とWhy So?で接続", "Horizontal: MECE at each level / Vertical: linked by So What? & Why So?")}</text>
    </svg>
  );
}

function DiagramSkyRain({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const items = [
    { j: "空", e: "Sky", sj: "事実", se: "Fact", dj: "「西の空が暗い」", de: "'Dark clouds in the west'", c: C.blue },
    { j: "雨", e: "Rain", sj: "解釈", se: "Interpretation", dj: "「雨が降りそうだ」", de: "'It will likely rain'", c: C.teal },
    { j: "傘", e: "Umbrella", sj: "行動", se: "Action", dj: "「傘を持って出よう」", de: "'Take an umbrella'", c: C.gold },
  ];
  return (
    <svg viewBox="0 0 640 220" style={{ width: "100%", height: "auto" }}>
      {items.map((it, i) => (
        <g key={i}>
          <rect x={30 + i * 210} y="40" width="180" height="110" rx="10" fill="#fff" stroke={it.c} strokeWidth="2.5" />
          <text x={120 + i * 210} y="72" textAnchor="middle" fill={it.c} fontSize="20" fontWeight="800">{t(it.j, it.e)}</text>
          <text x={120 + i * 210} y="96" textAnchor="middle" fill={C.txt} fontSize="13" fontWeight="700">{t(it.sj, it.se)}</text>
          <text x={120 + i * 210} y="120" textAnchor="middle" fill={C.sub} fontSize="11">{t(it.dj, it.de)}</text>
          {i < 2 && <text x={222 + i * 210} y="100" fill={C.sub} fontSize="20">→</text>}
        </g>
      ))}
      <text x="320" y="190" textAnchor="middle" fill={C.sub} fontSize="11">{t("事実・解釈・打ち手を混ぜないのが提言の基本規律。「空から傘へ直行」が最頻出の論理飛躍。", "Never blur fact, interpretation, and action; 'Sky straight to Umbrella' is the classic leap.")}</text>
    </svg>
  );
}

function DiagramProfitTree({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (x, y, w, jt, et, fill, txtc) => (
    <g>
      <rect x={x} y={y} width={w} height="36" rx="6" fill={fill} stroke={fill === "#fff" ? C.line : "none"} />
      <text x={x + w / 2} y={y + 23} textAnchor="middle" fill={txtc} fontSize="11.5" fontWeight="600">{t(jt, et)}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 320" style={{ width: "100%", height: "auto" }}>
      <line x1="120" y1="150" x2="230" y2="80" stroke={C.line} strokeWidth="2" />
      <line x1="120" y1="150" x2="230" y2="230" stroke={C.line} strokeWidth="2" />
      <line x1="330" y1="80" x2="440" y2="40" stroke={C.line} strokeWidth="2" />
      <line x1="330" y1="80" x2="440" y2="115" stroke={C.line} strokeWidth="2" />
      <line x1="330" y1="230" x2="440" y2="195" stroke={C.line} strokeWidth="2" />
      <line x1="330" y1="230" x2="440" y2="270" stroke={C.line} strokeWidth="2" />
      {node(20, 132, 100, "利益", "Profit", C.ink, "#fff")}
      {node(230, 62, 100, "売上", "Revenue", C.gold, "#fff")}
      {node(230, 212, 100, "コスト", "Cost", C.crimson, "#fff")}
      {node(440, 22, 170, "単価 (Price)", "Price", "#fff", C.txt)}
      {node(440, 97, 170, "数量 (Quantity)", "Quantity", "#fff", C.txt)}
      {node(440, 177, 170, "固定費", "Fixed costs", "#fff", C.txt)}
      {node(440, 252, 170, "変動費", "Variable costs", "#fff", C.txt)}
      <text x="530" y="150" textAnchor="middle" fill={C.sub} fontSize="10">{t("数量=顧客数×頻度×購入量", "Q = customers × frequency × units")}</text>
      <text x="320" y="305" textAnchor="middle" fill={C.sub} fontSize="11">{t("収益性ケースの標準ツリー。「どの枝が劣化したか」をデータで切り分ける。", "The standard profitability tree — isolate the broken branch with data.")}</text>
    </svg>
  );
}

function DiagramFiveForces({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const box = (x, y, jt, et, c) => (
    <g>
      <rect x={x} y={y} width="170" height="46" rx="8" fill="#fff" stroke={c} strokeWidth="2.5" />
      <text x={x + 85} y={y + 28} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t(jt, et)}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 340" style={{ width: "100%", height: "auto" }}>
      <rect x="235" y="140" width="170" height="60" rx="8" fill={C.ink} />
      <text x="320" y="166" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{t("業界内の競争", "Industry rivalry")}</text>
      <text x="320" y="184" textAnchor="middle" fill="#9FB2D0" fontSize="10">{t("既存企業間の敵対関係", "Among existing firms")}</text>
      {box(235, 24, "新規参入の脅威", "Threat of new entrants", C.blue)}
      {box(235, 268, "代替品の脅威", "Threat of substitutes", C.violet)}
      {box(20, 147, "売り手の交渉力", "Supplier power", C.teal)}
      {box(450, 147, "買い手の交渉力", "Buyer power", C.gold)}
      <line x1="320" y1="70" x2="320" y2="140" stroke={C.sub} strokeWidth="2" markerEnd="" />
      <line x1="320" y1="268" x2="320" y2="200" stroke={C.sub} strokeWidth="2" />
      <line x1="190" y1="170" x2="235" y2="170" stroke={C.sub} strokeWidth="2" />
      <line x1="450" y1="170" x2="405" y2="170" stroke={C.sub} strokeWidth="2" />
      <text x="320" y="326" textAnchor="middle" fill={C.sub} fontSize="11">{t("5つの力が強いほど業界の構造的収益性は低い(ポーター)。", "The stronger the five forces, the lower the industry's structural profitability (Porter).")}</text>
    </svg>
  );
}

function DiagramSixHats({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const hats = [
    { c: "#E8E8E8", tx: C.txt, j: "白:事実・データ", e: "White: facts & data" },
    { c: "#C93B3B", tx: "#fff", j: "赤:感情・直感", e: "Red: feelings & hunches" },
    { c: "#2B2B2B", tx: "#fff", j: "黒:リスク・弱点", e: "Black: risks & cautions" },
    { c: "#E8B90F", tx: "#3A3000", j: "黄:利点・価値", e: "Yellow: benefits & value" },
    { c: "#2C9C4B", tx: "#fff", j: "緑:創造・代替案", e: "Green: creativity & options" },
    { c: "#2E5BFF", tx: "#fff", j: "青:進行・統括", e: "Blue: process control" },
  ];
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {hats.map((h, i) => {
        const x = 30 + (i % 3) * 200, y = 30 + Math.floor(i / 3) * 110;
        return (
          <g key={i}>
            <rect x={x} y={y} width="180" height="84" rx="10" fill={h.c} />
            <text x={x + 90} y={y + 40} textAnchor="middle" fill={h.tx} fontSize="12.5" fontWeight="800">{t(h.j, h.e).split(":")[0]}</text>
            <text x={x + 90} y={y + 60} textAnchor="middle" fill={h.tx} fontSize="11">{t(h.j, h.e).split(/[::]/)[1] || ""}</text>
          </g>
        );
      })}
      <text x="320" y="282" textAnchor="middle" fill={C.sub} fontSize="11">{t("全員が同時に同じ帽子をかぶる「並行思考」で、対立でなく協働の議論を作る(デボノ)。", "Everyone wears the same hat at once — parallel thinking replaces adversarial debate (de Bono).")}</text>
    </svg>
  );
}

function DiagramIssueTree({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (x, y, w, h, jt, et, fill, tc, fs) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} stroke={fill === "#fff" ? C.line : "none"} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill={tc} fontSize={fs || 11} fontWeight="600">{t(jt, et)}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 330" style={{ width: "100%", height: "auto" }}>
      <line x1="150" y1="160" x2="250" y2="60" stroke={C.line} strokeWidth="2" />
      <line x1="150" y1="160" x2="250" y2="160" stroke={C.line} strokeWidth="2" />
      <line x1="150" y1="160" x2="250" y2="260" stroke={C.line} strokeWidth="2" />
      {[60, 160, 260].map((y, i) => (
        <g key={i}>
          <line x1="410" y1={y} x2="470" y2={y - 24} stroke={C.line} strokeWidth="1.5" />
          <line x1="410" y1={y} x2="470" y2={y + 24} stroke={C.line} strokeWidth="1.5" />
        </g>
      ))}
      {node(15, 132, 135, 56, "利益をどう回復するか?", "How to restore profit?", C.ink, "#fff", 10.5)}
      {node(250, 38, 160, 44, "売上を伸ばせるか?", "Can we grow revenue?", C.blue, "#fff")}
      {node(250, 138, 160, 44, "コストを削れるか?", "Can we cut costs?", C.crimson, "#fff")}
      {node(250, 238, 160, 44, "事業構成を変えるか?", "Reshape the portfolio?", C.teal, "#fff")}
      {node(470, 16, 150, 34, "単価を上げられるか", "Raise price?", "#fff", C.sub, 10)}
      {node(470, 66, 150, 34, "数量を増やせるか", "Grow volume?", "#fff", C.sub, 10)}
      {node(470, 118, 150, 34, "固定費を削れるか", "Cut fixed costs?", "#fff", C.sub, 10)}
      {node(470, 166, 150, 34, "変動費を削れるか", "Cut variable costs?", "#fff", C.sub, 10)}
      {node(470, 218, 150, 34, "撤退すべき事業は", "Exit any business?", "#fff", C.sub, 10)}
      {node(470, 266, 150, 34, "参入すべき領域は", "Enter any space?", "#fff", C.sub, 10)}
      <text x="320" y="318" textAnchor="middle" fill={C.sub} fontSize="11">{t("各枝は疑問文で書き、MECEに分解する。答えが出る粒度まで下ろすのが作法。", "Write each branch as a question, keep levels MECE, and drill until answerable.")}</text>
    </svg>
  );
}

function DiagramDupont({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (x, y, w, jt, et, fill, tc, fs) => (
    <g>
      <rect x={x} y={y} width={w} height="40" rx="6" fill={fill} stroke={fill === "#fff" ? C.line : "none"} />
      <text x={x + w / 2} y={y + 25} textAnchor="middle" fill={tc} fontSize={fs || 11.5} fontWeight="600">{t(jt, et)}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 330" style={{ width: "100%", height: "auto" }}>
      <line x1="115" y1="60" x2="230" y2="60" stroke={C.line} strokeWidth="2" />
      <line x1="230" y1="60" x2="230" y2="250" stroke={C.line} strokeWidth="2" />
      <line x1="230" y1="60" x2="290" y2="60" stroke={C.line} strokeWidth="2" />
      <line x1="230" y1="155" x2="290" y2="155" stroke={C.line} strokeWidth="2" />
      <line x1="230" y1="250" x2="290" y2="250" stroke={C.line} strokeWidth="2" />
      {node(15, 40, 100, "ROE", "ROE", C.ink, "#fff", 14)}
      {node(290, 40, 180, "純利益率(利益÷売上)", "Net margin (profit ÷ sales)", C.blue, "#fff", 10.5)}
      {node(290, 135, 180, "総資産回転率(売上÷資産)", "Asset turnover (sales ÷ assets)", C.teal, "#fff", 10.5)}
      {node(290, 230, 180, "財務レバレッジ(資産÷自己資本)", "Leverage (assets ÷ equity)", C.crimson, "#fff", 10)}
      <text x="278" y="105" textAnchor="middle" fill={C.sub} fontSize="16" fontWeight="700">×</text>
      <text x="278" y="200" textAnchor="middle" fill={C.sub} fontSize="16" fontWeight="700">×</text>
      <text x="493" y="63" fill={C.sub} fontSize="10.5">{t("← 事業の収益力", "← earning power")}</text>
      <text x="493" y="158" fill={C.sub} fontSize="10.5">{t("← 資産の効率", "← asset efficiency")}</text>
      <text x="493" y="253" fill={C.sub} fontSize="10.5">{t("← 借入への依存", "← debt reliance")}</text>
      <text x="320" y="300" textAnchor="middle" fill={C.sub} fontSize="11">{t("同じROE15%でも「3%×1.0×5.0」と「10%×1.5×1.0」は別物。高ROE=優良と即断しない(後件肯定の解毒剤)。ROICは分子をNOPAT、分母を投下資本に替えた事業目線の親戚。", "The same 15% ROE from 3%×1.0×5.0 vs 10%×1.5×1.0 are different animals — never equate high ROE with quality. ROIC is the operating cousin: NOPAT over invested capital.")}</text>
    </svg>
  );
}

function DiagramPriceWaterfall({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const bars = [
    { jt: "定価", et: "List", v: 1000, drop: 0, c: C.ink },
    { jt: "数量値引", et: "Volume disc.", v: 0, drop: 120, c: C.crimson },
    { jt: "リベート", et: "Rebates", v: 0, drop: 80, c: C.crimson },
    { jt: "支払条件", et: "Terms", v: 0, drop: 50, c: C.crimson },
    { jt: "返品・物流", et: "Returns/logistics", v: 0, drop: 30, c: C.crimson },
    { jt: "実収価格", et: "Pocket price", v: 720, drop: 0, c: C.gold },
  ];
  let running = 1000;
  const scale = (v) => 230 - (v / 1000) * 200;
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {bars.map((b, i) => {
        const x = 30 + i * 100;
        let top, h;
        if (b.v > 0) { top = scale(b.v); h = 230 - top; }
        else { const newRun = running - b.drop; top = scale(running); h = scale(newRun) - scale(running); running = newRun; }
        return (
          <g key={i}>
            <rect x={x} y={top} width="70" height={Math.max(h, 2)} rx="3" fill={b.c} opacity={b.v > 0 ? 1 : 0.85} />
            <text x={x + 35} y="252" textAnchor="middle" fill={C.txt} fontSize="10" fontWeight="600">{t(b.jt, b.et)}</text>
            <text x={x + 35} y={top - 6} textAnchor="middle" fill={C.sub} fontSize="10.5" fontWeight="700">{b.v > 0 ? `¥${b.v}` : `−${b.drop}`}</text>
            {i < bars.length - 1 && <line x1={x + 70} y1={b.v > 0 ? top : top + h} x2={x + 100} y2={b.v > 0 ? top : top + h} stroke={C.sub} strokeWidth="1" strokeDasharray="3,3" />}
          </g>
        );
      })}
      <text x="320" y="285" textAnchor="middle" fill={C.sub} fontSize="11">{t("定価と実収の間のリーク(漏れ)を項目別に可視化。本丸は平均でなく顧客別・経路別のばらつきの正当性。", "Itemize the leaks between list and pocket price. The real prize: whether the customer-by-customer spread is justified.")}</text>
    </svg>
  );
}

function DiagramPPM({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const cell = (x, y, c, jt, et, jd, ed) => (
    <g>
      <rect x={x} y={y} width="235" height="105" rx="8" fill="#fff" stroke={c} strokeWidth="2.5" />
      <text x={x + 117} y={y + 32} textAnchor="middle" fill={c} fontSize="14" fontWeight="800">{t(jt, et)}</text>
      <text x={x + 117} y={y + 56} textAnchor="middle" fill={C.txt} fontSize="10">{t(jd, ed)}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 330" style={{ width: "100%", height: "auto" }}>
      {cell(75, 25, C.blue, "花形 (Star)", "Star", "高成長×高シェア:投資継続で将来の金のなる木へ", "High growth × high share: keep investing")}
      {cell(330, 25, C.violet, "問題児 (?)", "Question Mark", "高成長×低シェア:選別して集中投資 or 撤退", "High growth × low share: pick winners or exit")}
      {cell(75, 150, C.gold, "金のなる木", "Cash Cow", "低成長×高シェア:創出キャッシュを他へ再配分", "Low growth × high share: harvest and redeploy cash")}
      {cell(330, 150, C.crimson, "負け犬 (Dog)", "Dog", "低成長×低シェア:原則撤退。ただしシナジーは要確認", "Low growth × low share: default exit — but check synergies")}
      <path d="M 190 155 Q 150 120 190 85" fill="none" stroke={C.gold} strokeWidth="2.5" markerEnd="" strokeDasharray="5,4" />
      <text x="128" y="128" fill={C.gold} fontSize="10" fontWeight="700">{t("資金供給", "cash flows")}</text>
      <text x="320" y="15" textAnchor="middle" fill={C.sub} fontSize="10.5">{t("← 相対シェア 高 | 低 →", "← relative share: high | low →")}</text>
      <text x="30" y="145" textAnchor="middle" fill={C.sub} fontSize="10.5" transform="rotate(-90 30 145)">{t("← 市場成長率 低 | 高 →", "← market growth: low | high →")}</text>
      <text x="320" y="300" textAnchor="middle" fill={C.sub} fontSize="11">{t("2軸は代理変数にすぎない:シェアと収益が連動しない業界では誤導する。象限は結論でなく問いの入口。", "Both axes are proxies — misleading where share and profit decouple. Quadrants open questions; they don't close them.")}</text>
    </svg>
  );
}


/* =====================================================================
   IssueTreeDiagram — MECE-corrected two-tier issue tree (図解)
   for コンサル思考術 統合ハブ / Consulting Thinking Hub
   --------------------------------------------------------------------
   Fix: the original tree placed 3 siblings on TWO different axes
        (P&L component: 売上/コスト  vs  action level: 事業構成).
        Portfolio moves overlap with 売上/コスト. This version cuts on a
        single top axis (operate vs. reconfigure), pushing 売上/コスト
        one level down under "operations" → no overlap, still insightful.
   Drop-in: register in the hub's Diagrams section; accepts `lang`.
   ===================================================================== */


function DiagramIssueTreeV2({ lang = "ja" }) {
  const t = (ja, en) => (lang === "ja" ? ja : en);
  const W = 1000, H = 560;

  // node: {id, x, y, w, h, label:[l1,l2?], fill, textCol, kind}
  const NW1 = 190, NW2 = 168, NW3 = 176, LH = 70;
  const nodes = {
    root: { x: 30, y: 240, w: 190, h: 74, fill: C.ink, tc: "#fff",
      label: [t("利益をどう回復するか?", "How to recover profit?")] },

    op: { x: 280, y: 128, w: NW1, h: 62, fill: C.blue, tc: "#fff",
      label: [t("① 既存事業を強くする", "① Improve current business"), t("(オペレーション)", "(operations)")] },
    pf: { x: 280, y: 372, w: NW1, h: 62, fill: C.teal, tc: "#fff",
      label: [t("② 事業の顔ぶれを変える", "② Reshape the portfolio"), t("(ポートフォリオ)", "(where to play)")] },

    rev: { x: 528, y: 58, w: NW2, h: 54, fill: "#EAF0FF", tc: C.blue, bd: C.blue,
      label: [t("売上を伸ばす", "Grow revenue")] },
    cost: { x: 528, y: 190, w: NW2, h: 54, fill: "#FDEDEE", tc: C.crimson, bd: C.crimson,
      label: [t("コストを削る", "Cut cost")] },
    exit: { x: 528, y: 344, w: NW2, h: 54, fill: "#E7F7F8", tc: C.teal, bd: C.teal,
      label: [t("撤退すべき事業は", "Which to exit")] },
    enter: { x: 528, y: 416, w: NW2, h: 54, fill: "#E7F7F8", tc: C.teal, bd: C.teal,
      label: [t("参入・M&Aすべき領域は", "Where to enter / M&A")] },

    price: { x: 760, y: 30, w: NW3, h: 48, fill: "#fff", tc: C.txt, bd: C.line,
      label: [t("単価を上げられるか", "Can we raise price")] },
    vol: { x: 760, y: 90, w: NW3, h: 48, fill: "#fff", tc: C.txt, bd: C.line,
      label: [t("数量を増やせるか", "Can we grow volume")] },
    fix: { x: 760, y: 162, w: NW3, h: 48, fill: "#fff", tc: C.txt, bd: C.line,
      label: [t("固定費を削れるか", "Cut fixed cost")] },
    varc: { x: 760, y: 222, w: NW3, h: 48, fill: "#fff", tc: C.txt, bd: C.line,
      label: [t("変動費を削れるか", "Cut variable cost")] },
  };
  const edges = [
    ["root", "op"], ["root", "pf"],
    ["op", "rev"], ["op", "cost"],
    ["pf", "exit"], ["pf", "enter"],
    ["rev", "price"], ["rev", "vol"],
    ["cost", "fix"], ["cost", "varc"],
  ];
  const rc = (n) => ({ x: n.x + n.w, y: n.y + n.h / 2 });     // right-center
  const lc = (n) => ({ x: n.x, y: n.y + n.h / 2 });           // left-center

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, fontFamily: sans }}>
      {/* edges */}
      {edges.map(([a, b], i) => {
        const p = rc(nodes[a]), q = lc(nodes[b]);
        const mx = (p.x + q.x) / 2;
        return <path key={i} d={`M${p.x},${p.y} C${mx},${p.y} ${mx},${q.y} ${q.x},${q.y}`}
          fill="none" stroke={C.line} strokeWidth="1.6" />;
      })}
      {/* nodes */}
      {Object.values(nodes).map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10"
            fill={n.fill} stroke={n.bd || "none"} strokeWidth={n.bd ? 1.4 : 0} />
          {n.label.length === 1 ? (
            <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 4} textAnchor="middle"
              fontSize="13.5" fontWeight="600" fill={n.tc}>{n.label[0]}</text>
          ) : (
            <>
              <text x={n.x + n.w / 2} y={n.y + n.h / 2 - 6} textAnchor="middle"
                fontSize="12.5" fontWeight="700" fill={n.tc}>{n.label[0]}</text>
              <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 12} textAnchor="middle"
                fontSize="10.5" fontWeight="500" fill={n.tc} opacity="0.9">{n.label[1]}</text>
            </>
          )}
        </g>
      ))}

      {/* axis annotations */}
      <text x={375} y={22} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.sub}>
        {t("第1階層 = 打ち手のレベルで切る", "Tier 1 = cut on the level of action")}
      </text>
      <line x1={280} y1={30} x2={470} y2={30} stroke={C.line} strokeWidth="1" strokeDasharray="3 3" />

      {/* caption */}
      <text x={W / 2} y={H - 40} textAnchor="middle" fontSize="12.5" fill={C.txt}>
        {t("① と ② を『打ち手のレベル』という単一の軸で切ると重複が消える。売上/コストは①の下に収まる。",
          "Cutting ① vs. ② on one axis (level of action) removes overlap — revenue/cost live under ①.")}
      </text>
      <text x={W / 2} y={H - 20} textAnchor="middle" fontSize="11.5" fill={C.sub}>
        {t("旧ツリーは、この2段構造を1段に潰していたため『事業構成』が売上・コストと重なって見えた。",
          "The old tree flattened these two tiers into one, so 'portfolio' appeared to overlap with revenue/cost.")}
      </text>
    </svg>
  );
}

// ---- Critical thinking (d:1) ----
function DiagramLadderInference({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const steps = [
    { j: "行動する", e: "Act", c: C.crimson },
    { j: "結論を出す", e: "Conclude", c: C.crimson },
    { j: "仮定を置く", e: "Assume", c: C.gold },
    { j: "意味づけする", e: "Interpret", c: C.gold },
    { j: "データを選ぶ", e: "Select data", c: C.blue },
    { j: "観察可能な事実", e: "Observable facts", c: C.ink },
  ];
  return (
    <svg viewBox="0 0 640 340" style={{ width: "100%", height: "auto" }}>
      {steps.map((s, i) => {
        const y = 24 + i * 48;
        return (
          <g key={i}>
            <rect x={140} y={y} width={360} height={38} rx={8} fill={i === steps.length - 1 ? C.ink : "#fff"} stroke={s.c} strokeWidth="2.5" />
            <text x={320} y={y + 24} textAnchor="middle" fill={i === steps.length - 1 ? "#fff" : C.txt} fontSize="12.5" fontWeight="700">{t(s.j, s.e)}</text>
            {i < steps.length - 1 && <line x1={320} y1={y + 38} x2={320} y2={y + 48} stroke={C.sub} strokeWidth="2" markerEnd="url(#arrUp)" />}
          </g>
        );
      })}
      <defs><marker id="arrUp" markerWidth="9" markerHeight="9" refX="4.5" refY="7" orient="auto"><path d="M0,7 L4.5,0 L9,7" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={332} textAnchor="middle" fill={C.sub} fontSize="11">{t("人は事実から結論まで一気に「はしご」を登る。どの段で飛躍したかを問うのが批判的思考。", "We climb the ladder from facts to action in one leap — critical thinking asks at which rung the jump happened.")}</text>
    </svg>
  );
}
function DiagramSurvivorship({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={30} width={160} height={54} rx={8} fill={C.ink} />
      <text x={120} y={53} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{t("母集団", "Full population")}</text>
      <text x={120} y={71} textAnchor="middle" fill="#9FB2D0" fontSize="10">{t("成功も失敗も含む", "wins and losses")}</text>
      <rect x={410} y={20} width={200} height={54} rx={8} fill="#fff" stroke={C.green} strokeWidth="2.5" />
      <text x={510} y={42} textAnchor="middle" fill={C.txt} fontSize="12" fontWeight="700">{t("見えるデータ", "Visible: survivors")}</text>
      <text x={510} y={60} textAnchor="middle" fill={C.sub} fontSize="10">{t("生き残り(成功)のみ", "successes only")}</text>
      <rect x={410} y={110} width={200} height={54} rx={8} fill="#fff" stroke={C.crimson} strokeWidth="2.5" strokeDasharray="6 4" />
      <text x={510} y={132} textAnchor="middle" fill={C.crimson} fontSize="12" fontWeight="700">{t("消えたデータ", "Missing: non-survivors")}</text>
      <text x={510} y={150} textAnchor="middle" fill={C.sub} fontSize="10">{t("失敗は記録に残らない", "failures leave no record")}</text>
      <line x1={200} y1={52} x2={410} y2={47} stroke={C.green} strokeWidth="2" markerEnd="url(#arrR1)" />
      <line x1={200} y1={60} x2={410} y2={135} stroke={C.crimson} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrR1)" />
      <rect x={160} y={210} width={320} height={50} rx={8} fill={C.gold} />
      <text x={320} y={232} textAnchor="middle" fill="#3A3000" fontSize="12" fontWeight="800">{t("見える分だけで結論 → 偏った成功法則", "Concluding from survivors → biased 'success' rules")}</text>
      <text x={320} y={250} textAnchor="middle" fill="#3A3000" fontSize="10">{t("ウォルドの爆撃機:帰還機の被弾箇所ではなく、帰らなかった機を補強せよ", "Wald's bombers: reinforce where returning planes were NOT hit")}</text>
      <defs><marker id="arrR1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={290} textAnchor="middle" fill={C.sub} fontSize="11">{t("生存者バイアス:失敗が観測から抜け落ちると、成功要因の推定が系統的に歪む。", "Survivorship bias: when failures drop out of the sample, inferences about success are systematically distorted.")}</text>
    </svg>
  );
}
// ---- Creative thinking (d:3) ----
function DiagramDoubleDiamond({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const dia = (cx, top, bot, half, fill) => `${cx - half},${(top + bot) / 2} ${cx},${top} ${cx + half},${(top + bot) / 2} ${cx},${bot}`;
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      <polygon points={dia(180, 60, 220, 150, C.violet)} fill="#F1ECFF" stroke={C.violet} strokeWidth="2.5" />
      <polygon points={dia(460, 60, 220, 150, C.teal)} fill="#E7F7F4" stroke={C.teal} strokeWidth="2.5" />
      <text x={180} y={45} textAnchor="middle" fill={C.violet} fontSize="12.5" fontWeight="800">{t("問題の探索", "Problem")}</text>
      <text x={460} y={45} textAnchor="middle" fill={C.teal} fontSize="12.5" fontWeight="800">{t("解の探索", "Solution")}</text>
      <text x={110} y={145} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("発散", "Diverge")}</text>
      <text x={250} y={145} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("収束", "Converge")}</text>
      <text x={390} y={145} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("発散", "Diverge")}</text>
      <text x={530} y={145} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("収束", "Converge")}</text>
      <text x={180} y={150} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t("発見→定義", "Discover→Define")}</text>
      <text x={460} y={150} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t("展開→提供", "Develop→Deliver")}</text>
      <line x1={320} y1={140} x2={320} y2={140} stroke={C.line} />
      <text x={320} y={248} textAnchor="middle" fill={C.ink} fontSize="12" fontWeight="800">{t("正しい問題を作る × 正しく解く", "Design the right thing × design the thing right")}</text>
      <text x={320} y={286} textAnchor="middle" fill={C.sub} fontSize="11">{t("ダブルダイヤモンド:発散(広げる)と収束(絞る)を2回繰り返す。問題定義を飛ばさない。", "Double Diamond: diverge then converge, twice — never skip defining the problem.")}</text>
    </svg>
  );
}
function DiagramDesignThinking({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [
    { j: "共感", e: "Empathize", c: C.blue },
    { j: "定義", e: "Define", c: C.violet },
    { j: "発想", e: "Ideate", c: C.gold },
    { j: "試作", e: "Prototype", c: C.teal },
    { j: "検証", e: "Test", c: C.crimson },
  ];
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => {
        const cx = 80 + i * 120;
        return (
          <g key={i}>
            <circle cx={cx} cy={90} r={42} fill="#fff" stroke={s.c} strokeWidth="3" />
            <text x={cx} y={86} textAnchor="middle" fill={s.c} fontSize="13" fontWeight="800">{t(s.j, s.e).length > 9 ? t(s.j, s.e).slice(0, 9) : t(s.j, s.e)}</text>
            <text x={cx} y={104} textAnchor="middle" fill={C.sub} fontSize="9">{i + 1}</text>
            {i < st.length - 1 && <line x1={cx + 42} y1={90} x2={cx + 78} y2={90} stroke={C.sub} strokeWidth="2" markerEnd="url(#arrR2)" />}
          </g>
        );
      })}
      <path d="M560,120 C560,190 80,190 80,132" fill="none" stroke={C.sub} strokeWidth="1.8" strokeDasharray="6 5" markerEnd="url(#arrR2)" />
      <text x={320} y={182} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("反復:検証の学びを共感・定義へ戻す", "Iterate: feed test learnings back")}</text>
      <defs><marker id="arrR2" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={244} textAnchor="middle" fill={C.sub} fontSize="11">{t("デザイン思考:人間中心で発散と試作を高速に回す。直線でなく反復のループ。", "Design thinking: human-centered, fast diverge-and-prototype loops — iterative, not linear.")}</text>
    </svg>
  );
}
// ---- DX (d:5) ----
function DiagramDXMaturity({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const steps = [
    { j: "無関心", e: "Absent", c: "#B8C0CC" },
    { j: "実験", e: "Experiment", c: C.blue },
    { j: "連結", e: "Connect", c: C.teal },
    { j: "最適化", e: "Optimize", c: C.gold },
    { j: "変革", e: "Transform", c: C.dx },
  ];
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {steps.map((s, i) => {
        const w = 108, x = 30 + i * 116, h = 40 + i * 40, y = 250 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx={6} fill={s.c} />
            <text x={x + w / 2} y={y + 24} textAnchor="middle" fill="#fff" fontSize="12.5" fontWeight="800">{t(s.j, s.e)}</text>
            <text x={x + w / 2} y={266} textAnchor="middle" fill={C.sub} fontSize="10">Lv.{i + 1}</text>
          </g>
        );
      })}
      <line x1={20} y1={250} x2={620} y2={250} stroke={C.line} strokeWidth="1.5" />
      <text x={40} y={26} fill={C.sub} fontSize="10.5">{t("← ツール導入のみ", "← tools only")}</text>
      <text x={600} y={26} textAnchor="end" fill={C.dx} fontSize="10.5" fontWeight="700">{t("業務・組織・モデルの変革 →", "→ business & model change")}</text>
      <text x={320} y={292} textAnchor="middle" fill={C.sub} fontSize="11">{t("DX成熟度は診断座標。全項目満点でなく、戦略上必要な次の一段の能力ギャップを特定する。", "DX maturity is a diagnostic coordinate — target the next-rung capability gap strategy needs, not top marks everywhere.")}</text>
    </svg>
  );
}
function DiagramRunGrowTransform({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const seg = [
    { j: "ラン(維持)", e: "Run", c: "#8895A7", w: 300 },
    { j: "グロー(改善)", e: "Grow", c: C.blue, w: 190 },
    { j: "トランスフォーム(変革)", e: "Transform", c: C.dx, w: 110 },
  ];
  let x = 20;
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      {seg.map((s, i) => {
        const r = <g key={i}>
          <rect x={x} y={80} width={s.w} height={64} rx={7} fill={s.c} />
          <text x={x + s.w / 2} y={108} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">{t(s.j, s.e)}</text>
          <text x={x + s.w / 2} y={128} textAnchor="middle" fill="#fff" fontSize="10">{Math.round(s.w / 6)}%</text>
        </g>;
        x += s.w;
        return r;
      })}
      <text x={30} y={64} fill={C.sub} fontSize="11" fontWeight="700">{t("守り", "Defend")}</text>
      <text x={610} y={64} textAnchor="end" fill={C.dx} fontSize="11" fontWeight="700">{t("攻め", "Attack")}</text>
      <text x={320} y={186} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("維持費が変革投資を静かに侵食する。配分比率を経営の意思として管理する。", "Run costs quietly crowd out transformation — manage the ratio as an executive decision.")}</text>
      <text x={320} y={222} textAnchor="middle" fill={C.sub} fontSize="11">{t("IT/DX予算を3区分し、攻めに回す比率を明示的に設計する枠組み。", "Split IT/DX spend into three buckets and deliberately design the share aimed at offense.")}</text>
    </svg>
  );
}
// ---- AI (d:6) ----
function DiagramRAG({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const box = (x, y, w, jt, et, c, sub) => (
    <g>
      <rect x={x} y={y} width={w} height={54} rx={8} fill="#fff" stroke={c} strokeWidth="2.5" />
      <text x={x + w / 2} y={y + (sub ? 24 : 32)} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t(jt, et)}</text>
      {sub && <text x={x + w / 2} y={y + 42} textAnchor="middle" fill={C.sub} fontSize="9.5">{t(sub[0], sub[1])}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {box(20, 40, 120, "質問", "Query", C.ink)}
      {box(170, 40, 130, "埋め込み検索", "Embed & search", C.blue, ["意味の近さで取得", "by semantic proximity"])}
      {box(330, 40, 130, "ベクトルDB", "Vector store", C.violet, ["社内文書の断片", "document chunks"])}
      {box(330, 140, 130, "文脈に注入", "Inject context", C.teal)}
      {box(150, 140, 130, "LLM生成", "LLM generate", C.gold)}
      {box(20, 140, 110, "根拠つき回答", "Grounded answer", C.dx)}
      <line x1={140} y1={67} x2={170} y2={67} stroke={C.sub} strokeWidth="2" markerEnd="url(#arrR3)" />
      <line x1={300} y1={67} x2={330} y2={67} stroke={C.sub} strokeWidth="2" markerEnd="url(#arrR3)" />
      <line x1={395} y1={94} x2={395} y2={140} stroke={C.sub} strokeWidth="2" markerEnd="url(#arrR3)" />
      <line x1={330} y1={167} x2={280} y2={167} stroke={C.sub} strokeWidth="2" markerEnd="url(#arrR3)" />
      <line x1={150} y1={167} x2={130} y2={167} stroke={C.sub} strokeWidth="2" markerEnd="url(#arrR3)" />
      <rect x={20} y={218} width={600} height={40} rx={7} fill="#FEF6E7" stroke={C.gold} strokeWidth="1.5" />
      <text x={320} y={243} textAnchor="middle" fill="#7A5B00" fontSize="10.5">{t("根拠が見つからなければ「わからない」を返す設計が幻覚を防ぐ最後の砦。", "Returning 'I don't know' when no grounds are found is the last wall against hallucination.")}</text>
      <defs><marker id="arrR3" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={288} textAnchor="middle" fill={C.sub} fontSize="11">{t("RAG:知識をモデル外に置き、検索して文脈注入。更新は差し替えで済み、出典も示せる。", "RAG keeps knowledge outside the model — retrieve, inject, cite; updates become swaps.")}</text>
    </svg>
  );
}
function DiagramHumanAI({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const cell = (x, y, jt, et, c, jd, ed) => (
    <g>
      <rect x={x} y={y} width={230} height={88} rx={9} fill="#fff" stroke={c} strokeWidth="2.5" />
      <text x={x + 115} y={y + 30} textAnchor="middle" fill={c} fontSize="12.5" fontWeight="800">{t(jt, et)}</text>
      <text x={x + 115} y={y + 54} textAnchor="middle" fill={C.txt} fontSize="10">{t(jd, ed)}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 340" style={{ width: "100%", height: "auto" }}>
      <text x={30} y={30} fill={C.sub} fontSize="11" fontWeight="700">{t("影響度 高 ↑", "Impact high ↑")}</text>
      {cell(90, 46, "人が担う", "Human owns", C.crimson, "前例なき判断・最終責任", "novel judgment, accountability")}
      {cell(340, 46, "AIで増強", "AI augments", C.gold, "下書き・分析を人が検証", "AI drafts, human verifies")}
      {cell(90, 168, "監督のみ", "Oversee", C.blue, "低影響・人は例外対応", "low impact, exceptions only")}
      {cell(340, 168, "AIに任せる", "Delegate to AI", C.dx, "定型・大量・検証可能", "routine, high-volume, verifiable")}
      <text x={175} y={286} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("代替可能性 低", "substitutable: low")}</text>
      <text x={455} y={286} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("代替可能性 高 →", "substitutable: high →")}</text>
      <line x1={320} y1={40} x2={320} y2={266} stroke={C.line} strokeWidth="1.2" />
      <line x1={80} y1={266} x2={570} y2={266} stroke={C.line} strokeWidth="1.2" />
      <text x={320} y={318} textAnchor="middle" fill={C.sub} fontSize="11">{t("人とAIの分業:比較優位で配置する。責任と関係は人、速度と網羅はAIへ。", "Human-AI division by comparative advantage: accountability and relationships to people, speed and coverage to AI.")}</text>
    </svg>
  );
}
function DiagramAIRiskPyramid({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const tiers = [
    { j: "許容不可(禁止)", e: "Unacceptable (banned)", c: C.crimson, w: 140 },
    { j: "高リスク(厳格義務)", e: "High-risk (strict duties)", c: C.gold, w: 300 },
    { j: "限定リスク(透明性)", e: "Limited (transparency)", c: C.blue, w: 440 },
    { j: "最小リスク(自由)", e: "Minimal (free use)", c: C.teal, w: 580 },
  ];
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {tiers.map((s, i) => {
        const y = 30 + i * 52, x = 320 - s.w / 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={s.w} height={46} rx={6} fill={s.c} opacity={0.92} />
            <text x={320} y={y + 28} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">{t(s.j, s.e)}</text>
          </g>
        );
      })}
      <text x={320} y={268} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("用途のリスクで義務を傾斜配分する(EU AI Act型のリスクベース)。", "Obligations graded by use-case risk — the risk-based model (EU AI Act).")}</text>
      <text x={320} y={290} textAnchor="middle" fill={C.sub} fontSize="11">{t("一律最厳格は活用を殺しシャドーAIを生む。比例統制が安全と速度を両立させる。", "Uniform maximum control kills adoption and breeds shadow AI — proportional control reconciles safety with speed.")}</text>
    </svg>
  );
}

// ===== Added diagrams: Logical (d:0) =====
function DiagramMECE({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 280" style={{ width: "100%", height: "auto" }}>
      <text x={160} y={30} textAnchor="middle" fill={C.crimson} fontSize="12.5" fontWeight="800">{t("ダメな例", "Not MECE")}</text>
      <rect x={40} y={44} width={110} height={70} rx={6} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2" />
      <rect x={130} y={70} width={110} height={70} rx={6} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2" opacity="0.7" />
      <text x={160} y={168} textAnchor="middle" fill={C.crimson} fontSize="10.5">{t("重複(ダブり)／漏れ", "overlaps / gaps")}</text>
      <text x={480} y={30} textAnchor="middle" fill={C.green} fontSize="12.5" fontWeight="800">{t("MECE", "MECE")}</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={370 + (i % 2) * 112} y={44 + Math.floor(i / 2) * 60} width={108} height={56} rx={6} fill="#EBFAF1" stroke={C.green} strokeWidth="2" />
      ))}
      <text x={480} y={168} textAnchor="middle" fill={C.green} fontSize="10.5">{t("重複なく・漏れなく全体を覆う", "no overlap, no gap, full coverage")}</text>
      <text x={320} y={228} textAnchor="middle" fill={C.txt} fontSize="12" fontWeight="700">{t("Mutually Exclusive(相互排他)× Collectively Exhaustive(全体網羅)", "Mutually Exclusive & Collectively Exhaustive")}</text>
      <text x={320} y={262} textAnchor="middle" fill={C.sub} fontSize="11">{t("分解の各枝がダブりも漏れもない状態。全ての論理分解の品質基準。", "Every branch without overlap or gap — the quality bar for all logical decomposition.")}</text>
    </svg>
  );
}
function DiagramDeductionInduction({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const box = (x, y, w, jt, et, c) => (<g><rect x={x} y={y} width={w} height={40} rx={7} fill="#fff" stroke={c} strokeWidth="2.5" /><text x={x + w / 2} y={y + 25} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      <text x={160} y={26} textAnchor="middle" fill={C.blue} fontSize="13" fontWeight="800">{t("演繹", "Deduction")}</text>
      {box(40, 40, 240, "大前提:人は皆いつか死ぬ", "Rule: all humans are mortal", C.blue)}
      {box(40, 96, 240, "小前提:ソクラテスは人", "Case: Socrates is human", C.blue)}
      {box(40, 152, 240, "結論:ソクラテスは死ぬ", "So: Socrates is mortal", C.ink)}
      <line x1={160} y1={80} x2={160} y2={96} stroke={C.sub} strokeWidth="2" markerEnd="url(#dArr)" />
      <line x1={160} y1={136} x2={160} y2={152} stroke={C.sub} strokeWidth="2" markerEnd="url(#dArr)" />
      <text x={480} y={26} textAnchor="middle" fill={C.gold} fontSize="13" fontWeight="800">{t("帰納", "Induction")}</text>
      {box(360, 40, 240, "観察:A社もB社もC社も値上げ", "Cases: A, B, C all raised prices", C.gold)}
      {box(360, 96, 240, "パターン:業界全体が値上げ", "Pattern: the whole sector raises", C.gold)}
      {box(360, 152, 240, "一般化:今後も値上げ傾向", "General rule: prices trend up", C.ink)}
      <line x1={480} y1={80} x2={480} y2={96} stroke={C.sub} strokeWidth="2" markerEnd="url(#dArr)" />
      <line x1={480} y1={136} x2={480} y2={152} stroke={C.sub} strokeWidth="2" markerEnd="url(#dArr)" />
      <defs><marker id="dArr" markerWidth="9" markerHeight="9" refX="4.5" refY="7" orient="auto"><path d="M0,0 L4.5,7 L9,0" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={160} y={222} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("前提が真なら結論も必ず真", "true premises ⇒ certain conclusion")}</text>
      <text x={480} y={222} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("確実でなく蓋然的(反例に弱い)", "probable, not certain — vulnerable to counterexamples")}</text>
      <text x={320} y={278} textAnchor="middle" fill={C.sub} fontSize="11">{t("演繹=規則から個へ(確実)／帰納=個から規則へ(拡張的だが可謬)。両輪で使う。", "Deduction: rule→case (certain). Induction: cases→rule (expansive but fallible). Use both.")}</text>
    </svg>
  );
}
function DiagramSoWhat({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      <rect x={200} y={26} width={240} height={44} rx={8} fill={C.ink} />
      <text x={320} y={53} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{t("結論:主張", "Conclusion: the claim")}</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 200} y={130} width={170} height={44} rx={8} fill="#fff" stroke={C.blue} strokeWidth="2.5" />
          <text x={125 + i * 200} y={157} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t("根拠", "Support")} {i + 1}</text>
          <line x1={320} y1={70} x2={125 + i * 200} y2={130} stroke={C.line} strokeWidth="1.8" />
        </g>
      ))}
      <text x={470} y={104} fill={C.gold} fontSize="11" fontWeight="800">{t("↑ So What?(だから何?)", "↑ So What?")}</text>
      <text x={90} y={200} fill={C.violet} fontSize="11" fontWeight="800">{t("↓ Why So?(なぜそう言える?)", "↓ Why So?")}</text>
      <text x={320} y={240} textAnchor="middle" fill={C.sub} fontSize="11">{t("縦の関係を上下2方向で検証:上へSo What、下へWhy So。ピラミッドの背骨。", "Test the vertical link both ways — So What upward, Why So downward. The spine of the pyramid.")}</text>
    </svg>
  );
}
function DiagramWhyTree({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (x, y, w, jt, et, c, tc) => (<g><rect x={x} y={y} width={w} height={38} rx={6} fill={c} stroke={c === "#fff" ? C.line : "none"} strokeWidth="1.5" /><text x={x + w / 2} y={y + 24} textAnchor="middle" fill={tc} fontSize="10.5" fontWeight="600">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {node(20, 130, 150, "解約が増えた", "Churn rose", C.crimson, "#fff")}
      {node(210, 60, 170, "なぜ?価格不満", "Why? price", "#fff", C.txt)}
      {node(210, 130, 170, "なぜ?品質不満", "Why? quality", "#fff", C.txt)}
      {node(210, 200, 170, "なぜ?競合流出", "Why? rival", "#fff", C.txt)}
      {node(420, 60, 200, "値上げの説明不足", "poor price comms", C.blue, "#fff")}
      {node(420, 130, 200, "障害対応の遅延", "slow incident response", C.blue, "#fff")}
      {node(420, 200, 200, "新機能で見劣り", "feature gap", C.blue, "#fff")}
      {[60, 130, 200].map((y, i) => (<g key={i}><line x1={170} y1={149} x2={210} y2={y + 19} stroke={C.line} strokeWidth="1.6" /><line x1={380} y1={y + 19} x2={420} y2={y + 19} stroke={C.line} strokeWidth="1.6" /></g>))}
      <text x={320} y={276} textAnchor="middle" fill={C.sub} fontSize="11">{t("「なぜ?」を繰り返し原因を分解(なぜなぜ分析)。打ち手が出る粒度まで下ろす。", "Repeat 'why?' to decompose causes — drill until an actionable root emerges.")}</text>
    </svg>
  );
}
function DiagramHypothesisCycle({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "仮説を立てる", e: "Hypothesize", c: C.blue }, { j: "検証を設計", e: "Design test", c: C.violet }, { j: "データで検証", e: "Test with data", c: C.gold }, { j: "採否・修正", e: "Keep or revise", c: C.teal }];
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const cx = i % 2 === 0 ? 200 : 440, cy = i < 2 ? 80 : 200; return (<g key={i}><rect x={cx - 100} y={cy - 30} width={200} height={60} rx={10} fill="#fff" stroke={s.c} strokeWidth="2.5" /><text x={cx} y={cy - 4} textAnchor="middle" fill={s.c} fontSize="12.5" fontWeight="800">{t(s.j, s.e)}</text><text x={cx} y={cy + 16} textAnchor="middle" fill={C.sub} fontSize="9.5">{i + 1}</text></g>); })}
      <line x1={300} y1={80} x2={340} y2={80} stroke={C.sub} strokeWidth="2" markerEnd="url(#hArr)" />
      <line x1={440} y1={110} x2={440} y2={170} stroke={C.sub} strokeWidth="2" markerEnd="url(#hArr)" />
      <line x1={340} y1={200} x2={300} y2={200} stroke={C.sub} strokeWidth="2" markerEnd="url(#hArr)" />
      <line x1={200} y1={170} x2={200} y2={110} stroke={C.sub} strokeWidth="2" markerEnd="url(#hArr)" />
      <defs><marker id="hArr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={286} textAnchor="middle" fill={C.sub} fontSize="11">{t("仮説思考:答えの当たりを先に置き、検証で高速に絞る。網羅より仮説先行。", "Hypothesis-driven: lead with a probable answer, then test to converge fast — hypothesis before exhaustion.")}</text>
    </svg>
  );
}
function DiagramFermi({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (x, y, w, jt, et, c, tc) => (<g><rect x={x} y={y} width={w} height={40} rx={6} fill={c} stroke={c === "#fff" ? C.line : "none"} strokeWidth="1.5" /><text x={x + w / 2} y={y + 25} textAnchor="middle" fill={tc} fontSize="10.5" fontWeight="600">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 290" style={{ width: "100%", height: "auto" }}>
      {node(180, 20, 280, "都内のカフェ需要は?(推定)", "Cafe demand in Tokyo? (estimate)", C.ink, "#fff")}
      {node(30, 110, 170, "人口 × コーヒー頻度", "population × frequency", "#fff", C.txt)}
      {node(235, 110, 170, "1杯あたり単価", "price per cup", "#fff", C.txt)}
      {node(440, 110, 170, "自店シェア", "our share", "#fff", C.txt)}
      {node(140, 195, 360, "= 分解した係数の積で桁を推定", "= product of decomposed factors → order of magnitude", C.blue, "#fff")}
      <line x1={320} y1={60} x2={115} y2={110} stroke={C.line} strokeWidth="1.6" />
      <line x1={320} y1={60} x2={320} y2={110} stroke={C.line} strokeWidth="1.6" />
      <line x1={320} y1={60} x2={525} y2={110} stroke={C.line} strokeWidth="1.6" />
      {[115, 320, 525].map((x, i) => <line key={i} x1={x} y1={150} x2={320} y2={195} stroke={C.line} strokeWidth="1.4" />)}
      <text x={320} y={268} textAnchor="middle" fill={C.sub} fontSize="11">{t("フェルミ推定:未知量を既知の係数の積に分解し、桁で捉える。分解の質が精度を決める。", "Fermi estimation: decompose the unknown into a product of knowns and get the order of magnitude — decomposition quality drives accuracy.")}</text>
    </svg>
  );
}
function DiagramCorrelationCausation({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (x, y, jt, et, c) => (<g><circle cx={x} cy={y} r={40} fill="#fff" stroke={c} strokeWidth="2.5" /><text x={x} y={y + 4} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 280" style={{ width: "100%", height: "auto" }}>
      {node(120, 90, "アイス販売", "Ice cream", C.blue)}
      {node(360, 90, "水難事故", "Drownings", C.crimson)}
      {node(240, 210, "気温(交絡)", "Heat (confounder)", C.gold)}
      <line x1={160} y1={90} x2={320} y2={90} stroke={C.sub} strokeWidth="2" strokeDasharray="6 4" />
      <text x={240} y={78} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("相関(見かけ)", "correlation (spurious)")}</text>
      <line x1={222} y1={175} x2={140} y2={125} stroke={C.gold} strokeWidth="2.5" markerEnd="url(#cArr)" />
      <line x1={258} y1={175} x2={340} y2={125} stroke={C.gold} strokeWidth="2.5" markerEnd="url(#cArr)" />
      <text x={240} y={250} textAnchor="middle" fill={C.gold} fontSize="10.5" fontWeight="700">{t("真の原因は両者を同時に動かす", "the real cause moves both")}</text>
      <defs><marker id="cArr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.gold} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={272} textAnchor="middle" fill={C.sub} fontSize="11">{t("相関≠因果:第3の交絡変数が両者を動かす例。因果を主張する前に交絡を疑う。", "Correlation ≠ causation: a third confounder can drive both — suspect confounders before claiming cause.")}</text>
    </svg>
  );
}

// ===== Added diagrams: Critical (d:1) =====
function DiagramConfirmationBias({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 270" style={{ width: "100%", height: "auto" }}>
      <rect x={230} y={26} width={180} height={44} rx={8} fill={C.ink} />
      <text x={320} y={53} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{t("既存の信念", "Existing belief")}</text>
      <rect x={40} y={130} width={230} height={54} rx={8} fill="#EBFAF1" stroke={C.green} strokeWidth="2.5" />
      <text x={155} y={152} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t("支持する情報", "Confirming evidence")}</text>
      <text x={155} y={170} textAnchor="middle" fill={C.green} fontSize="10">{t("進んで集める・重く見る", "sought and overweighted")}</text>
      <rect x={370} y={130} width={230} height={54} rx={8} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2.5" strokeDasharray="6 4" />
      <text x={485} y={152} textAnchor="middle" fill={C.crimson} fontSize="11" fontWeight="700">{t("反する情報", "Disconfirming evidence")}</text>
      <text x={485} y={170} textAnchor="middle" fill={C.sub} fontSize="10">{t("無視・軽視・都合よく解釈", "ignored or explained away")}</text>
      <line x1={260} y1={70} x2={155} y2={130} stroke={C.green} strokeWidth="2" markerEnd="url(#cb1)" />
      <line x1={380} y1={70} x2={485} y2={130} stroke={C.crimson} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#cb1)" />
      <defs><marker id="cb1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={222} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("対策:自説の反証をあえて探す(反証テスト)", "Counter: deliberately seek what would prove you wrong")}</text>
      <text x={320} y={252} textAnchor="middle" fill={C.sub} fontSize="11">{t("確証バイアス:信じたい結論に合う情報だけを集め、反証を割り引く傾向。", "Confirmation bias: gathering only belief-consistent evidence while discounting the rest.")}</text>
    </svg>
  );
}
function DiagramToulmin({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const box = (x, y, w, jt, et, c) => (<g><rect x={x} y={y} width={w} height={44} rx={7} fill="#fff" stroke={c} strokeWidth="2.5" /><text x={x + w / 2} y={y + 27} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 280" style={{ width: "100%", height: "auto" }}>
      {box(30, 40, 180, "データ(事実)", "Data (fact)", C.blue)}
      {box(430, 40, 180, "主張(結論)", "Claim", C.ink)}
      {box(230, 40, 180, "論拠(なぜ繋がる)", "Warrant", C.gold)}
      {box(230, 120, 180, "裏づけ", "Backing", C.teal)}
      {box(430, 120, 180, "限定・反証", "Qualifier / Rebuttal", C.crimson)}
      <line x1={210} y1={62} x2={230} y2={62} stroke={C.sub} strokeWidth="2" markerEnd="url(#tm1)" />
      <line x1={410} y1={62} x2={430} y2={62} stroke={C.sub} strokeWidth="2" markerEnd="url(#tm1)" />
      <line x1={320} y1={84} x2={320} y2={120} stroke={C.sub} strokeWidth="2" markerEnd="url(#tm1)" />
      <line x1={520} y1={84} x2={520} y2={120} stroke={C.sub} strokeWidth="2" markerEnd="url(#tm1)" />
      <defs><marker id="tm1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={210} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("データが主張を支えるには「論拠」が要る。論拠の妥当性こそ議論の急所。", "Data supports a claim only via a warrant — the warrant's validity is the argument's crux.")}</text>
      <text x={320} y={250} textAnchor="middle" fill={C.sub} fontSize="11">{t("トゥールミンモデル:主張・データ・論拠の三点で議論の構造を解剖する。", "Toulmin model: dissect an argument into claim, data, and warrant (plus backing and rebuttal).")}</text>
    </svg>
  );
}
function DiagramFactOpinion({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const row = (y, jt, et, c, jd, ed) => (<g><rect x={40} y={y} width={560} height={46} rx={7} fill="#fff" stroke={c} strokeWidth="2" /><rect x={40} y={y} width={140} height={46} rx={7} fill={c} /><text x={110} y={y + 28} textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="800">{t(jt, et)}</text><text x={200} y={y + 28} fill={C.txt} fontSize="11">{t(jd, ed)}</text></g>);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      {row(24, "事実", "Fact", C.blue, "売上が前年比12%減少した", "sales fell 12% YoY")}
      {row(84, "解釈", "Inference", C.gold, "主力商品の競争力が落ちた", "our flagship lost competitiveness")}
      {row(144, "意見", "Opinion", C.crimson, "だから値下げすべきだ", "so we should cut prices")}
      <text x={320} y={218} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("事実→解釈→意見と混ざるほど検証しにくくなる。層を分けて聞く。", "The more fact, inference, and opinion blur, the harder to verify — separate the layers.")}</text>
      <text x={320} y={242} textAnchor="middle" fill={C.sub} fontSize="11">{t("批判的思考の起点:どこまでが事実で、どこからが話し手の解釈かを切り分ける。", "Critical thinking starts by drawing the line between fact and the speaker's inference.")}</text>
    </svg>
  );
}
function DiagramBaseRate({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      <text x={320} y={26} textAnchor="middle" fill={C.txt} fontSize="12" fontWeight="800">{t("有病率1% ・検査精度99% で陽性 → 実際に病気の確率は?", "1% prevalence, 99% accurate test, positive → true-positive probability?")}</text>
      {Array.from({ length: 100 }).map((_, i) => {
        const x = 60 + (i % 20) * 26, y = 50 + Math.floor(i / 20) * 26;
        const sick = i === 0; const fp = i >= 1 && i < 2;
        return <rect key={i} x={x} y={y} width={20} height={20} rx={3} fill={sick ? C.crimson : fp ? C.gold : "#E4E9F0"} />;
      })}
      <text x={320} y={202} textAnchor="middle" fill={C.txt} fontSize="12" fontWeight="700">{t("陽性は約2人(真1 + 偽陽性1)→ 本当に病気は約50%", "≈2 positives (1 true + ≈1 false) → only ≈50% truly sick")}</text>
      <text x={320} y={232} textAnchor="middle" fill={C.sub} fontSize="11">{t("ベースレートの誤り:低い基礎確率を無視すると、検査精度を過大評価する。", "Base-rate neglect: ignoring low prior probability inflates how much a test tells you.")}</text>
    </svg>
  );
}
function DiagramAnchoring({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <line x1={60} y1={120} x2={580} y2={120} stroke={C.line} strokeWidth="2" />
      <circle cx={180} cy={120} r={9} fill={C.crimson} />
      <text x={180} y={100} textAnchor="middle" fill={C.crimson} fontSize="11" fontWeight="800">{t("最初の数字(アンカー)", "First number (anchor)")}</text>
      <circle cx={260} cy={120} r={9} fill={C.gold} />
      <text x={300} y={150} textAnchor="middle" fill={C.gold} fontSize="11" fontWeight="700">{t("調整後の判断", "adjusted estimate")}</text>
      <path d="M189,120 Q225,150 251,120" fill="none" stroke={C.sub} strokeWidth="1.8" markerEnd="url(#an1)" />
      <circle cx={460} cy={120} r={9} fill={C.green} />
      <text x={460} y={100} textAnchor="middle" fill={C.green} fontSize="11" fontWeight="800">{t("本来の妥当値", "true value")}</text>
      <defs><marker id="an1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={196} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("調整は不十分にしか働かず、判断はアンカーに引き寄せられる。", "Adjustment is insufficient — judgment stays pulled toward the anchor.")}</text>
      <text x={320} y={224} textAnchor="middle" fill={C.sub} fontSize="11">{t("アンカリング:先に提示された数値が、その後の見積りを不当に縛る。", "Anchoring: an initial number unduly constrains all later estimates.")}</text>
    </svg>
  );
}
function DiagramFallacies({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const items = [
    { j: "藁人形", e: "Straw man", d: "相手の主張を歪めて反論", de: "distort then refute" },
    { j: "滑り坂", e: "Slippery slope", d: "極端な連鎖を根拠なく想定", de: "unfounded chain to extreme" },
    { j: "人身攻撃", e: "Ad hominem", d: "論でなく人を攻撃", de: "attack the person" },
    { j: "偽の二分法", e: "False dilemma", d: "選択肢を2つに限定", de: "only two options" },
    { j: "循環論法", e: "Circular", d: "結論を前提に使う", de: "premise = conclusion" },
    { j: "権威に訴える", e: "Appeal to authority", d: "偉い人が言ったから", de: "an authority said so" },
  ];
  return (
    <svg viewBox="0 0 640 270" style={{ width: "100%", height: "auto" }}>
      {items.map((s, i) => { const x = 30 + (i % 3) * 200, y = 30 + Math.floor(i / 3) * 100; return (<g key={i}><rect x={x} y={y} width={180} height={80} rx={9} fill="#fff" stroke={C.crimson} strokeWidth="2" /><text x={x + 90} y={y + 30} textAnchor="middle" fill={C.crimson} fontSize="12" fontWeight="800">{t(s.j, s.e)}</text><text x={x + 90} y={y + 54} textAnchor="middle" fill={C.sub} fontSize="9.8">{t(s.d, s.de)}</text></g>); })}
      <text x={320} y={258} textAnchor="middle" fill={C.sub} fontSize="11">{t("論理的誤謬:形は説得的でも中身が破綻した推論。型を知ると即座に見抜ける。", "Logical fallacies: persuasive in form but broken in substance — knowing the types lets you spot them fast.")}</text>
    </svg>
  );
}
function DiagramGoodhart({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const box = (x, y, w, jt, et, c) => (<g><rect x={x} y={y} width={w} height={46} rx={8} fill="#fff" stroke={c} strokeWidth="2.5" /><text x={x + w / 2} y={y + 28} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      {box(30, 40, 180, "真の目的", "True goal", C.green)}
      {box(230, 40, 180, "代理指標(KPI)", "Proxy metric (KPI)", C.blue)}
      {box(430, 40, 180, "指標の最大化", "Gaming the metric", C.crimson)}
      <line x1={210} y1={63} x2={230} y2={63} stroke={C.sub} strokeWidth="2" markerEnd="url(#gh1)" />
      <line x1={410} y1={63} x2={430} y2={63} stroke={C.sub} strokeWidth="2" markerEnd="url(#gh1)" />
      <path d="M520,86 Q520,150 320,150 Q120,150 120,86" fill="none" stroke={C.crimson} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#gh1)" />
      <text x={320} y={168} textAnchor="middle" fill={C.crimson} fontSize="10.5" fontWeight="700">{t("目的から乖離(指標だけ達成)", "diverges from the goal — metric met, purpose missed")}</text>
      <defs><marker id="gh1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={218} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("「指標が目標になると、それは良い指標でなくなる」(グッドハートの法則)", "'When a measure becomes a target, it ceases to be a good measure' (Goodhart's law)")}</text>
    </svg>
  );
}
function DiagramAvailability({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={40} width={230} height={54} rx={8} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2.5" />
      <text x={155} y={62} textAnchor="middle" fill={C.crimson} fontSize="11.5" fontWeight="800">{t("思い出しやすい事例", "Vivid, recent cases")}</text>
      <text x={155} y={80} textAnchor="middle" fill={C.sub} fontSize="10">{t("報道・最近・鮮烈", "news, recent, dramatic")}</text>
      <rect x={370} y={40} width={230} height={54} rx={8} fill="#fff" stroke={C.blue} strokeWidth="2.5" />
      <text x={485} y={62} textAnchor="middle" fill={C.blue} fontSize="11.5" fontWeight="800">{t("頻度・確率を過大評価", "overestimated frequency")}</text>
      <text x={485} y={80} textAnchor="middle" fill={C.sub} fontSize="10">{t("実際の統計と乖離", "diverges from real stats")}</text>
      <line x1={270} y1={67} x2={370} y2={67} stroke={C.sub} strokeWidth="2" markerEnd="url(#av1)" />
      <text x={320} y={56} textAnchor="middle" fill={C.sub} fontSize="10">{t("=で判断", "judged by ease of recall")}</text>
      <defs><marker id="av1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={158} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("対策:体感でなく基礎統計(発生率・母数)に立ち返って確率を見積もる。", "Counter: estimate probability from base rates and denominators, not from what comes to mind.")}</text>
      <text x={320} y={212} textAnchor="middle" fill={C.sub} fontSize="11">{t("利用可能性ヒューリスティック:思い出しやすさを頻度と取り違える(カーネマン)。", "Availability heuristic: mistaking ease of recall for frequency (Kahneman).")}</text>
    </svg>
  );
}

// ===== Added diagrams: Lateral (d:2) =====
function DiagramSCAMPER({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const items = [
    { k: "S", j: "代用", e: "Substitute" }, { k: "C", j: "結合", e: "Combine" }, { k: "A", j: "応用", e: "Adapt" },
    { k: "M", j: "修正/拡大", e: "Modify" }, { k: "P", j: "転用", e: "Put to other use" }, { k: "E", j: "削除", e: "Eliminate" }, { k: "R", j: "逆転", e: "Reverse" },
  ];
  const cols = [C.blue, C.violet, C.teal, C.gold, C.dx, C.crimson, C.ink];
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      {items.map((s, i) => { const x = 20 + (i % 4) * 155, y = 30 + Math.floor(i / 4) * 92; return (<g key={i}><rect x={x} y={y} width={140} height={72} rx={9} fill="#fff" stroke={cols[i]} strokeWidth="2.5" /><circle cx={x + 26} cy={y + 26} r={16} fill={cols[i]} /><text x={x + 26} y={y + 31} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">{s.k}</text><text x={x + 88} y={y + 31} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t(s.j, s.e)}</text></g>); })}
      <text x={320} y={244} textAnchor="middle" fill={C.sub} fontSize="11">{t("SCAMPER:7つの操作を機械的に適用し、才能でなく手順で発想を再点火する。", "SCAMPER: seven operations applied mechanically — reigniting ideas by procedure, not talent.")}</text>
    </svg>
  );
}
function DiagramAssumptionReversal({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={40} width={240} height={54} rx={8} fill="#fff" stroke={C.sub} strokeWidth="2" />
      <text x={160} y={62} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("前提:レストランは", "Assumption: a restaurant")}</text>
      <text x={160} y={82} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("客が来て注文する", "has guests who order")}</text>
      <rect x={360} y={40} width={240} height={54} rx={8} fill="#F1ECFF" stroke={C.violet} strokeWidth="2.5" />
      <text x={480} y={62} textAnchor="middle" fill={C.violet} fontSize="11.5" fontWeight="800">{t("逆転:客が来ない/", "Reverse: no guests /")}</text>
      <text x={480} y={82} textAnchor="middle" fill={C.violet} fontSize="11.5" fontWeight="800">{t("注文しない店とは?", "no ordering?")}</text>
      <line x1={280} y1={67} x2={360} y2={67} stroke={C.sub} strokeWidth="2" markerEnd="url(#ar1)" />
      <rect x={140} y={130} width={360} height={48} rx={8} fill={C.gold} />
      <text x={320} y={152} textAnchor="middle" fill="#3A3000" fontSize="11.5" fontWeight="800">{t("→ デリバリー専業・自動注文・ゴーストキッチン", "→ delivery-only, auto-order, ghost kitchen")}</text>
      <text x={320} y={170} textAnchor="middle" fill="#3A3000" fontSize="10">{t("前提を壊すと新しい事業形態が見える", "breaking the premise reveals new models")}</text>
      <defs><marker id="ar1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={214} textAnchor="middle" fill={C.sub} fontSize="11">{t("前提逆転法:当然視している前提を明示し、あえて反転して発想を跳ばす。", "Assumption reversal: surface the taken-for-granted premise, then flip it to leap.")}</text>
    </svg>
  );
}
function DiagramLateralVertical({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      <text x={160} y={30} textAnchor="middle" fill={C.blue} fontSize="13" fontWeight="800">{t("垂直思考", "Vertical")}</text>
      {[0, 1, 2].map((i) => (<g key={i}><rect x={100} y={50 + i * 55} width={120} height={40} rx={7} fill="#fff" stroke={C.blue} strokeWidth="2" /><text x={160} y={74 + i * 55} textAnchor="middle" fill={C.txt} fontSize="10.5">{t("深掘り", "dig deeper")} {i + 1}</text>{i < 2 && <line x1={160} y1={90 + i * 55} x2={160} y2={105 + i * 55} stroke={C.sub} strokeWidth="2" markerEnd="url(#lv1)" />}</g>))}
      <text x={480} y={30} textAnchor="middle" fill={C.violet} fontSize="13" fontWeight="800">{t("水平思考", "Lateral")}</text>
      {[0, 1, 2, 3].map((i) => { const cx = 400 + (i % 2) * 160, cy = 70 + Math.floor(i / 2) * 80; return (<g key={i}><circle cx={cx} cy={cy} r={30} fill="#fff" stroke={C.violet} strokeWidth="2" /><text x={cx} y={cy + 4} textAnchor="middle" fill={C.txt} fontSize="10">{t("別角度", "angle")} {i + 1}</text></g>); })}
      <line x1={430} y1={70} x2={530} y2={150} stroke={C.line} strokeWidth="1.4" /><line x1={560} y1={70} x2={430} y2={150} stroke={C.line} strokeWidth="1.4" />
      <defs><marker id="lv1" markerWidth="9" markerHeight="9" refX="4.5" refY="7" orient="auto"><path d="M0,0 L4.5,7 L9,0" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={242} textAnchor="middle" fill={C.sub} fontSize="11">{t("垂直=論理で1つの穴を深く掘る／水平=前提を横に飛び新しい穴を探す(デボノ)。", "Vertical digs one hole deeper by logic; lateral jumps sideways to new holes (de Bono).")}</text>
    </svg>
  );
}
function DiagramAnalogy({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const box = (x, y, jt, et, c) => (<g><rect x={x} y={y} width={200} height={50} rx={8} fill="#fff" stroke={c} strokeWidth="2.5" /><text x={x + 100} y={y + 30} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      {box(30, 40, "源泉:回転寿司", "Source: conveyor sushi", C.teal)}
      {box(410, 40, "対象:物流/供給", "Target: logistics", C.gold)}
      {box(220, 130, "構造を抽出:巡回供給", "Abstract structure: circulating supply", C.violet)}
      <line x1={230} y1={65} x2={320} y2={130} stroke={C.line} strokeWidth="1.8" markerEnd="url(#ay1)" />
      <line x1={410} y1={65} x2={320} y2={130} stroke={C.line} strokeWidth="1.8" markerEnd="url(#ay1)" />
      <text x={320} y={100} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("表層でなく「構造」を運ぶ", "transport structure, not surface")}</text>
      <defs><marker id="ay1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={210} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("→ 移動販売・巡回配送・マイクロフルフィルメント", "→ mobile retail, roving delivery, micro-fulfillment")}</text>
      <text x={320} y={236} textAnchor="middle" fill={C.sub} fontSize="11">{t("アナロジー思考:遠い領域の構造を抽象化して転写し、新結合を生む。", "Analogical thinking: abstract a distant domain's structure and transcribe it to spark new combinations.")}</text>
    </svg>
  );
}
function DiagramRandomStimulus({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={40} width={180} height={54} rx={8} fill={C.ink} />
      <text x={130} y={72} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{t("課題:会議を短く", "Problem: shorter meetings")}</text>
      <circle cx={330} cy={67} r={44} fill="#F1ECFF" stroke={C.violet} strokeWidth="2.5" />
      <text x={330} y={64} textAnchor="middle" fill={C.violet} fontSize="12" fontWeight="800">{t("無作為語", "Random word")}</text>
      <text x={330} y={82} textAnchor="middle" fill={C.violet} fontSize="12" fontWeight="800">{t("「砂時計」", "'hourglass'")}</text>
      <rect x={430} y={40} width={180} height={54} rx={8} fill={C.gold} />
      <text x={520} y={64} textAnchor="middle" fill="#3A3000" fontSize="11" fontWeight="800">{t("→ 発言に持ち時間", "→ speaking time limits")}</text>
      <text x={520} y={82} textAnchor="middle" fill="#3A3000" fontSize="11" fontWeight="800">{t("砂が落ちたら交代", "sand runs, next speaker")}</text>
      <line x1={220} y1={67} x2={286} y2={67} stroke={C.sub} strokeWidth="2" markerEnd="url(#rs1)" />
      <line x1={374} y1={67} x2={430} y2={67} stroke={C.sub} strokeWidth="2" markerEnd="url(#rs1)" />
      <defs><marker id="rs1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={200} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("無関係な刺激が、固まった思考経路を強制的に迂回させる。", "An unrelated stimulus forces a detour around stuck thought paths.")}</text>
      <text x={320} y={226} textAnchor="middle" fill={C.sub} fontSize="11">{t("ランダム刺激法:偶然の言葉を課題に結びつけ、連想を跳ばす(デボノ)。", "Random stimulus: force-connect a chance word to the problem to jump associations (de Bono).")}</text>
    </svg>
  );
}
function DiagramReverseBrainstorm({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={40} width={250} height={54} rx={8} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2.5" />
      <text x={165} y={62} textAnchor="middle" fill={C.crimson} fontSize="11.5" fontWeight="800">{t("どうすれば最悪にできるか?", "How to make it worst?")}</text>
      <text x={165} y={82} textAnchor="middle" fill={C.sub} fontSize="10">{t("破壊の発想は出やすい", "破壊 ideas flow easily")}</text>
      <rect x={350} y={40} width={250} height={54} rx={8} fill="#EBFAF1" stroke={C.green} strokeWidth="2.5" />
      <text x={475} y={62} textAnchor="middle" fill={C.green} fontSize="11.5" fontWeight="800">{t("各項目を反転", "Invert each item")}</text>
      <text x={475} y={82} textAnchor="middle" fill={C.sub} fontSize="10">{t("= 防止すべき施策", "= what to prevent")}</text>
      <line x1={290} y1={67} x2={350} y2={67} stroke={C.sub} strokeWidth="2" markerEnd="url(#rb1)" />
      <text x={320} y={56} textAnchor="middle" fill={C.sub} fontSize="10">{t("反転", "flip")}</text>
      <defs><marker id="rb1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={160} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("「成功させる方法」より「失敗させる方法」の方が網羅しやすい。", "Listing 'ways to fail' is easier to exhaust than 'ways to succeed.'")}</text>
      <text x={320} y={214} textAnchor="middle" fill={C.sub} fontSize="11">{t("逆ブレインストーミング:問題を逆さにして出し尽くし、反転して解に変える。", "Reverse brainstorming: exhaust the inverted problem, then flip answers into solutions.")}</text>
    </svg>
  );
}
function DiagramMandala({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const c = i % 2 === 0 ? "#fff" : "#fff"; const center = i === 4;
        const x = 200 + (i % 3) * 82, y = 30 + Math.floor(i / 3) * 82;
        return (<g key={i}><rect x={x} y={y} width={78} height={78} rx={6} fill={center ? C.violet : "#fff"} stroke={center ? C.violet : C.line} strokeWidth={center ? 0 : 1.8} /><text x={x + 39} y={y + 44} textAnchor="middle" fill={center ? "#fff" : C.sub} fontSize={center ? 11 : 10} fontWeight={center ? 800 : 500}>{center ? t("中心テーマ", "Core") : t("連想", "idea")}</text></g>);
      })}
      <text x={320} y={290} textAnchor="middle" fill={C.sub} fontSize="11">{t("マンダラート:中心テーマの周囲8マスを強制的に埋め、発想を網羅的に広げる。", "Mandal-Art: force-fill the eight cells around a core theme to expand ideas exhaustively.")}</text>
    </svg>
  );
}
function DiagramOsborn({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const items = [["転用", "Put to other use"], ["応用", "Adapt"], ["変更", "Modify"], ["拡大", "Magnify"], ["縮小", "Minify"], ["代用", "Substitute"], ["置換", "Rearrange"], ["逆転", "Reverse"], ["結合", "Combine"]];
  return (
    <svg viewBox="0 0 640 280" style={{ width: "100%", height: "auto" }}>
      {items.map((s, i) => { const x = 40 + (i % 3) * 190, y = 26 + Math.floor(i / 3) * 68; return (<g key={i}><rect x={x} y={y} width={170} height={52} rx={8} fill="#fff" stroke={C.teal} strokeWidth="2" /><text x={x + 30} y={y + 32} textAnchor="middle" fill={C.teal} fontSize="13" fontWeight="800">{i + 1}</text><text x={x + 105} y={y + 32} textAnchor="middle" fill={C.txt} fontSize="11" fontWeight="700">{t(s[0], s[1])}</text></g>); })}
      <text x={320} y={268} textAnchor="middle" fill={C.sub} fontSize="11">{t("オズボーンのチェックリスト:9つの問いを順に当て、改良アイデアを引き出す。", "Osborn's checklist: run nine prompts in sequence to draw out improvement ideas.")}</text>
    </svg>
  );
}
function DiagramForcedConnection({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <circle cx={140} cy={90} r={48} fill="#fff" stroke={C.blue} strokeWidth="2.5" />
      <text x={140} y={94} textAnchor="middle" fill={C.txt} fontSize="12" fontWeight="700">{t("要素A", "Element A")}</text>
      <circle cx={500} cy={90} r={48} fill="#fff" stroke={C.gold} strokeWidth="2.5" />
      <text x={500} y={94} textAnchor="middle" fill={C.txt} fontSize="12" fontWeight="700">{t("要素B", "Element B")}</text>
      <rect x={250} y={62} width={140} height={56} rx={10} fill={C.violet} />
      <text x={320} y={88} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">{t("強制結合", "Force-connect")}</text>
      <text x={320} y={106} textAnchor="middle" fill="#EBE3FF" fontSize="10">{t("新結合", "new combination")}</text>
      <line x1={188} y1={90} x2={250} y2={90} stroke={C.sub} strokeWidth="2" />
      <line x1={390} y1={90} x2={452} y2={90} stroke={C.sub} strokeWidth="2" />
      <text x={320} y={186} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("無関係な2要素を無理やり結ぶと、意外な機能・製品が生まれる。", "Forcing two unrelated elements together yields surprising functions and products.")}</text>
      <text x={320} y={220} textAnchor="middle" fill={C.sub} fontSize="11">{t("強制連結法:イノベーションの多くは既存要素の「新しい組合せ」である。", "Forced connection: most innovation is a new combination of existing elements.")}</text>
    </svg>
  );
}

// ===== Added diagrams: Creative (d:3) =====
function DiagramDivergeConverge({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      <polygon points="60,120 320,30 320,210" fill="#F1ECFF" stroke={C.violet} strokeWidth="2.5" />
      <polygon points="580,120 320,30 320,210" fill="#E7F7F4" stroke={C.teal} strokeWidth="2.5" />
      <text x={180} y={125} textAnchor="middle" fill={C.violet} fontSize="13" fontWeight="800">{t("発散", "Diverge")}</text>
      <text x={180} y={145} textAnchor="middle" fill={C.sub} fontSize="10">{t("量・多様・判断保留", "quantity, variety, no judging")}</text>
      <text x={455} y={125} textAnchor="middle" fill={C.teal} fontSize="13" fontWeight="800">{t("収束", "Converge")}</text>
      <text x={455} y={145} textAnchor="middle" fill={C.sub} fontSize="10">{t("評価・選別・決定", "evaluate, select, decide")}</text>
      <text x={320} y={230} textAnchor="middle" fill={C.sub} fontSize="11">{t("発散と収束を同時にやらない。広げ切ってから絞る——混ぜると両方が痩せる。", "Never diverge and converge at once — expand fully, then narrow; mixing starves both.")}</text>
    </svg>
  );
}
function DiagramBrainstormRules({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const items = [["批判しない", "Defer judgment"], ["自由奔放", "Encourage wild ideas"], ["質より量", "Go for quantity"], ["結合・便乗", "Build on others"]];
  return (
    <svg viewBox="0 0 640 230" style={{ width: "100%", height: "auto" }}>
      {items.map((s, i) => { const x = 30 + (i % 2) * 300, y = 30 + Math.floor(i / 2) * 80; return (<g key={i}><rect x={x} y={y} width={280} height={62} rx={10} fill="#fff" stroke={C.violet} strokeWidth="2.5" /><circle cx={x + 32} cy={y + 31} r={18} fill={C.violet} /><text x={x + 32} y={y + 37} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800">{i + 1}</text><text x={x + 165} y={y + 37} textAnchor="middle" fill={C.txt} fontSize="12.5" fontWeight="700">{t(s[0], s[1])}</text></g>); })}
      <text x={320} y={214} textAnchor="middle" fill={C.sub} fontSize="11">{t("ブレスト4原則(オズボーン):批判の禁止が発散を守る中核ルール。", "Brainstorming's four rules (Osborn): deferring judgment is the core rule that protects divergence.")}</text>
    </svg>
  );
}
function DiagramKJ({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      <text x={100} y={26} textAnchor="middle" fill={C.sub} fontSize="11" fontWeight="700">{t("① 発散(カード)", "① Cards")}</text>
      {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={30 + (i % 3) * 46} y={40 + Math.floor(i / 3) * 32} width={40} height={26} rx={3} fill="#fff" stroke={C.line} strokeWidth="1.4" />)}
      <text x={320} y={26} textAnchor="middle" fill={C.sub} fontSize="11" fontWeight="700">{t("② 親和で群化", "② Cluster by affinity")}</text>
      <rect x={250} y={40} width={140} height={54} rx={6} fill="#F1ECFF" stroke={C.violet} strokeWidth="2" />
      <rect x={250} y={104} width={140} height={44} rx={6} fill="#E7F7F4" stroke={C.teal} strokeWidth="2" />
      <text x={540} y={26} textAnchor="middle" fill={C.sub} fontSize="11" fontWeight="700">{t("③ 表札→構造", "③ Label→structure")}</text>
      <rect x={470} y={40} width={140} height={40} rx={6} fill={C.ink} /><text x={540} y={65} textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700">{t("表札A", "Header A")}</text>
      <rect x={470} y={92} width={140} height={40} rx={6} fill={C.gold} /><text x={540} y={117} textAnchor="middle" fill="#3A3000" fontSize="10.5" fontWeight="700">{t("表札B", "Header B")}</text>
      <line x1={155} y1={100} x2={250} y2={70} stroke={C.line} strokeWidth="1.4" markerEnd="url(#kj1)" />
      <line x1={390} y1={70} x2={470} y2={60} stroke={C.line} strokeWidth="1.4" markerEnd="url(#kj1)" />
      <defs><marker id="kj1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={220} textAnchor="middle" fill={C.sub} fontSize="11">{t("KJ法:既成分類に振り分けず、親和性でボトムアップに「未知の構造」を発見する。", "KJ method: don't sort into fixed categories — discover unknown structure bottom-up by affinity.")}</text>
    </svg>
  );
}
function DiagramLeanLoop({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "アイデア", e: "Ideas", c: C.violet }, { j: "構築", e: "Build", c: C.blue }, { j: "製品(MVP)", e: "Product (MVP)", c: C.teal }, { j: "計測", e: "Measure", c: C.gold }, { j: "データ", e: "Data", c: C.crimson }, { j: "学習", e: "Learn", c: C.dx }];
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const ang = (i / 6) * Math.PI * 2 - Math.PI / 2; const cx = 320 + Math.cos(ang) * 100, cy = 120 + Math.sin(ang) * 80; return (<g key={i}><circle cx={cx} cy={cy} r={34} fill="#fff" stroke={s.c} strokeWidth="2.5" /><text x={cx} y={cy + 4} textAnchor="middle" fill={s.c} fontSize="10.5" fontWeight="800">{t(s.j, s.e)}</text></g>); })}
      <text x={320} y={124} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("最速で学ぶ", "learn fastest")}</text>
      <text x={320} y={246} textAnchor="middle" fill={C.sub} fontSize="11">{t("リーンスタートアップ:構築→計測→学習のループを最小コスト・最速で回す。", "Lean startup: spin the build-measure-learn loop at minimum cost and maximum speed.")}</text>
    </svg>
  );
}
function DiagramMVP({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <text x={160} y={28} textAnchor="middle" fill={C.crimson} fontSize="12" fontWeight="800">{t("ダメ:部品を順に作る", "Wrong: build parts")}</text>
      {["タイヤ", "車体", "完成車"].map((s, i) => <g key={i}><rect x={60 + i * 70} y={44} width={60} height={40} rx={6} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2" /><text x={90 + i * 70} y={68} textAnchor="middle" fill={C.crimson} fontSize="9">{["🛞", "🚗", "✅"][i]}</text></g>)}
      <text x={160} y={104} textAnchor="middle" fill={C.sub} fontSize="10">{t("最後まで乗れない", "nothing usable until the end")}</text>
      <text x={480} y={28} textAnchor="middle" fill={C.green} fontSize="12" fontWeight="800">{t("MVP:毎回「乗れる」", "MVP: always rideable")}</text>
      {["スケボー", "自転車", "車"].map((s, i) => <g key={i}><rect x={380 + i * 70} y={44} width={60} height={40} rx={6} fill="#EBFAF1" stroke={C.green} strokeWidth="2" /><text x={410 + i * 70} y={68} textAnchor="middle" fill={C.green} fontSize="9">{t(s, ["skateboard", "bike", "car"][i])}</text></g>)}
      <text x={480} y={104} textAnchor="middle" fill={C.sub} fontSize="10">{t("各段階で価値を検証", "value tested at each step")}</text>
      <text x={320} y={168} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("MVP=価値仮説を検証できる最小の「動く全体」。部品でなく体験を刻む。", "An MVP is the smallest working whole that tests the value hypothesis — slice experience, not parts.")}</text>
      <text x={320} y={214} textAnchor="middle" fill={C.sub} fontSize="11">{t("実用最小限の製品:早く学ぶために「未完成でも成立する形」を設計する。", "Minimum Viable Product: design a form that stands even while incomplete, to learn early.")}</text>
    </svg>
  );
}
function DiagramJTBD({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={50} width={200} height={54} rx={8} fill="#fff" stroke={C.sub} strokeWidth="2" />
      <text x={140} y={72} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("製品:ドリル", "Product: a drill")}</text>
      <text x={140} y={92} textAnchor="middle" fill={C.sub} fontSize="10">{t("(手段に注目)", "(focus on means)")}</text>
      <rect x={400} y={50} width={200} height={54} rx={8} fill="#F1ECFF" stroke={C.violet} strokeWidth="2.5" />
      <text x={500} y={72} textAnchor="middle" fill={C.violet} fontSize="11.5" fontWeight="800">{t("ジョブ:穴が欲しい", "Job: a hole")}</text>
      <text x={500} y={92} textAnchor="middle" fill={C.sub} fontSize="10">{t("(片付けたい用事)", "(progress to be made)")}</text>
      <line x1={240} y1={77} x2={400} y2={77} stroke={C.sub} strokeWidth="2" markerEnd="url(#jb1)" />
      <text x={320} y={66} textAnchor="middle" fill={C.sub} fontSize="10">{t("視点を移す", "reframe")}</text>
      <defs><marker id="jb1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={160} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("顧客はドリルでなく「穴(進歩)」を雇う。手段から独立して機会が広がる。", "Customers hire the hole (the progress), not the drill — opportunity widens once freed from the means.")}</text>
      <text x={320} y={212} textAnchor="middle" fill={C.sub} fontSize="11">{t("JTBD:達成したい進歩を軸に据えると、競合も解も再定義される。", "Jobs-to-be-Done: anchoring on the desired progress redefines both competitors and solutions.")}</text>
    </svg>
  );
}
function DiagramPrototypeFidelity({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "紙・スケッチ", e: "Paper / sketch", c: C.blue }, { j: "モック", e: "Mockup", c: C.violet }, { j: "動くプロトタイプ", e: "Interactive", c: C.gold }, { j: "本番相当", e: "Production-like", c: C.dx }];
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const x = 30 + i * 150; return (<g key={i}><rect x={x} y={60} width={130} height={54} rx={8} fill="#fff" stroke={s.c} strokeWidth="2.5" /><text x={x + 65} y={92} textAnchor="middle" fill={C.txt} fontSize="10.5" fontWeight="700">{t(s.j, s.e)}</text>{i < 3 && <line x1={x + 130} y1={87} x2={x + 150} y2={87} stroke={C.sub} strokeWidth="2" markerEnd="url(#pf1)" />}</g>); })}
      <text x={95} y={44} fill={C.sub} fontSize="10">{t("速い・安い・捨てやすい", "fast, cheap, disposable")}</text>
      <text x={610} y={44} textAnchor="end" fill={C.sub} fontSize="10">{t("忠実だが重い", "faithful but heavy")}</text>
      <defs><marker id="pf1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={160} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("検証したい問いに必要な最小の忠実度を選ぶ。作り込みすぎは学習を遅らせる。", "Pick the lowest fidelity that answers your question — over-building slows learning.")}</text>
      <text x={320} y={210} textAnchor="middle" fill={C.sub} fontSize="11">{t("プロトタイプの忠実度:目的(検証)に合わせて粗さを意図的に選ぶ。", "Prototype fidelity: deliberately choose roughness to match the purpose — validation.")}</text>
    </svg>
  );
}
function DiagramDesignSprint({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [["理解", "Map"], ["発散", "Sketch"], ["決定", "Decide"], ["試作", "Prototype"], ["検証", "Test"]];
  return (
    <svg viewBox="0 0 640 220" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const x = 40 + i * 118; return (<g key={i}><rect x={x} y={60} width={100} height={56} rx={9} fill="#fff" stroke={C.teal} strokeWidth="2.5" /><text x={x + 50} y={84} textAnchor="middle" fill={C.teal} fontSize="12" fontWeight="800">{t(s[0], s[1])}</text><text x={x + 50} y={104} textAnchor="middle" fill={C.sub} fontSize="9.5">{t("Day", "Day")} {i + 1}</text>{i < 4 && <line x1={x + 100} y1={88} x2={x + 118} y2={88} stroke={C.sub} strokeWidth="2" markerEnd="url(#ds1)" />}</g>); })}
      <defs><marker id="ds1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={168} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("5日で「作る前に学ぶ」:重い開発の前に、試作と顧客検証を圧縮する。", "Learn before building in five days — compress prototyping and customer testing ahead of heavy dev.")}</text>
      <text x={320} y={200} textAnchor="middle" fill={C.sub} fontSize="11">{t("デザインスプリント(Google Ventures):意思決定を1週間に凝縮する型。", "Design Sprint (Google Ventures): a format that compresses decisions into one week.")}</text>
    </svg>
  );
}

// ===== Added diagrams: Structuring (d:4) =====
function Diagram3C({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (cx, cy, jt, et, c, jd, ed) => (<g><circle cx={cx} cy={cy} r={70} fill={c} opacity="0.14" /><circle cx={cx} cy={cy} r={70} fill="none" stroke={c} strokeWidth="2.5" /><text x={cx} y={cy - 4} textAnchor="middle" fill={c} fontSize="13" fontWeight="800">{t(jt, et)}</text><text x={cx} y={cy + 16} textAnchor="middle" fill={C.sub} fontSize="9.5">{t(jd, ed)}</text></g>);
  return (
    <svg viewBox="0 0 640 280" style={{ width: "100%", height: "auto" }}>
      {node(320, 100, "顧客", "Customer", C.blue, "市場・ニーズ", "market, needs")}
      {node(220, 190, "自社", "Company", C.gold, "強み・資源", "strengths")}
      {node(420, 190, "競合", "Competitor", C.crimson, "相対的位置", "relative position")}
      <text x={320} y={258} textAnchor="middle" fill={C.sub} fontSize="11">{t("3C:顧客・競合・自社の三点から事業環境を構造化し、勝ち筋を導く(大前)。", "3C: structure the business environment through Customer, Competitor, Company to find where to win (Ohmae).")}</text>
    </svg>
  );
}
function DiagramSWOT({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const cell = (x, y, jt, et, c, jd, ed) => (<g><rect x={x} y={y} width={270} height={82} rx={8} fill="#fff" stroke={c} strokeWidth="2.5" /><text x={x + 14} y={y + 26} fill={c} fontSize="12.5" fontWeight="800">{t(jt, et)}</text><text x={x + 14} y={y + 52} fill={C.sub} fontSize="10">{t(jd, ed)}</text></g>);
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      <text x={175} y={20} textAnchor="middle" fill={C.sub} fontSize="10.5" fontWeight="700">{t("内部", "Internal")}</text>
      {cell(30, 28, "S 強み", "S Strengths", C.green, "活かす資源", "assets to leverage")}
      {cell(340, 28, "W 弱み", "W Weaknesses", C.crimson, "補う課題", "gaps to fix")}
      {cell(30, 124, "O 機会", "O Opportunities", C.blue, "追い風", "external upside")}
      {cell(340, 124, "T 脅威", "T Threats", C.gold, "向かい風", "external risk")}
      <text x={320} y={244} textAnchor="middle" fill={C.sub} fontSize="11">{t("SWOT:内部(強み弱み)×外部(機会脅威)。掛け合わせ(TOWS)で戦略に変換する。", "SWOT: internal (S/W) × external (O/T); cross them (TOWS) to convert into strategy.")}</text>
    </svg>
  );
}
function DiagramValueChain({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const prim = [["購買物流", "Inbound"], ["製造", "Operations"], ["出荷物流", "Outbound"], ["販売", "Marketing"], ["サービス", "Service"]];
  const sup = [["全般管理", "Firm infra"], ["人事", "HR"], ["技術開発", "Tech dev"], ["調達", "Procurement"]];
  return (
    <svg viewBox="0 0 640 270" style={{ width: "100%", height: "auto" }}>
      {sup.map((s, i) => <g key={i}><rect x={40} y={26 + i * 30} width={470} height={26} rx={4} fill="#EEF1F6" stroke={C.line} strokeWidth="1" /><text x={275} y={44 + i * 30} textAnchor="middle" fill={C.sub} fontSize="10">{t(s[0], s[1])}</text></g>)}
      {prim.map((s, i) => <g key={i}><rect x={40 + i * 94} y={150} width={88} height={50} rx={6} fill={C.blue} opacity="0.9" /><text x={84 + i * 94} y={180} textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700">{t(s[0], s[1])}</text></g>)}
      <polygon points="512,26 560,120 512,200" fill={C.gold} /><text x={528} y={118} textAnchor="middle" fill="#3A3000" fontSize="11" fontWeight="800">{t("利", "Margin")}</text>
      <text x={275} y={140} textAnchor="middle" fill={C.sub} fontSize="10">{t("支援活動 ↑ / 主活動 ↓", "support ↑ / primary ↓")}</text>
      <text x={320} y={244} textAnchor="middle" fill={C.sub} fontSize="11">{t("バリューチェーン:活動ごとに価値とコストを分解し、差別化の源泉を特定する(ポーター)。", "Value chain: decompose value and cost by activity to locate the source of differentiation (Porter).")}</text>
    </svg>
  );
}
function Diagram7S({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const hard = [["戦略", "Strategy"], ["組織", "Structure"], ["制度", "Systems"]];
  const soft = [["価値観", "Shared values"], ["人材", "Staff"], ["能力", "Skills"], ["style", "Style"]];
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      <circle cx={320} cy={120} r={44} fill={C.gold} /><text x={320} y={116} textAnchor="middle" fill="#3A3000" fontSize="10.5" fontWeight="800">{t("共通の", "Shared")}</text><text x={320} y={132} textAnchor="middle" fill="#3A3000" fontSize="10.5" fontWeight="800">{t("価値観", "Values")}</text>
      {hard.concat(soft.slice(1)).map((s, i) => { const ang = (i / 6) * Math.PI * 2 - Math.PI / 2; const cx = 320 + Math.cos(ang) * 150, cy = 120 + Math.sin(ang) * 88; const isHard = i < 3; return (<g key={i}><circle cx={cx} cy={cy} r={38} fill="#fff" stroke={isHard ? C.blue : C.violet} strokeWidth="2.5" /><text x={cx} y={cy + 4} textAnchor="middle" fill={isHard ? C.blue : C.violet} fontSize="10.5" fontWeight="700">{t(s[0], s[1])}</text><line x1={320} y1={120} x2={cx} y2={cy} stroke={C.line} strokeWidth="1" /></g>); })}
      <text x={320} y={244} textAnchor="middle" fill={C.sub} fontSize="11">{t("7S:ハード3(戦略/組織/制度)とソフト4を整合させる。変革は全要素の同時調整。", "7S: align three hard elements with four soft ones — change means tuning all together (McKinsey).")}</text>
    </svg>
  );
}
// ===== Added diagrams: DX (d:5) =====
function DiagramDigitizationLayers({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "デジタイゼーション", e: "Digitization", d: "情報の電子化(紙→PDF)", de: "info → digital (paper→PDF)", c: "#8895A7" }, { j: "デジタライゼーション", e: "Digitalization", d: "プロセスのデジタル化", de: "process digitalized", c: C.blue }, { j: "DX(変革)", e: "Transformation", d: "事業・組織・モデルの変革", de: "business & model change", c: C.dx }];
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const w = 260 + i * 120, x = 320 - w / 2, y = 30 + i * 62; return (<g key={i}><rect x={x} y={y} width={w} height={52} rx={8} fill={s.c} /><text x={320} y={y + 24} textAnchor="middle" fill="#fff" fontSize="12.5" fontWeight="800">{t(s.j, s.e)}</text><text x={320} y={y + 42} textAnchor="middle" fill="#fff" fontSize="9.5" opacity="0.9">{t(s.d, s.de)}</text></g>); })}
      <text x={320} y={238} textAnchor="middle" fill={C.sub} fontSize="11">{t("3層:電子化→プロセス化→変革。DXは最上位で、電子化そのものではない。", "Three layers: digitize → digitalize → transform. DX is the top layer — not mere digitization.")}</text>
    </svg>
  );
}
function DiagramAmbidexterity({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={50} width={250} height={90} rx={10} fill="#EEF3FF" stroke={C.blue} strokeWidth="2.5" />
      <text x={165} y={82} textAnchor="middle" fill={C.blue} fontSize="13" fontWeight="800">{t("深化(知の活用)", "Exploit")}</text>
      <text x={165} y={106} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("既存事業の効率・改善", "efficiency of the core")}</text>
      <rect x={350} y={50} width={250} height={90} rx={10} fill="#F0FFF6" stroke={C.dx} strokeWidth="2.5" />
      <text x={475} y={82} textAnchor="middle" fill={C.dx} fontSize="13" fontWeight="800">{t("探索(知の探索)", "Explore")}</text>
      <text x={475} y={106} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("新規事業・実験", "new bets, experiments")}</text>
      <text x={320} y={100} textAnchor="middle" fill={C.sub} fontSize="16" fontWeight="800">×</text>
      <text x={320} y={180} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("同じ基準・予算で測ると探索が必ず負ける。別枠・別評価で両立させる。", "Under one yardstick, exploration always loses — separate budgets and criteria let both thrive.")}</text>
      <text x={320} y={224} textAnchor="middle" fill={C.sub} fontSize="11">{t("両利きの経営:深化(守り)と探索(攻め)を同時に担う組織能力。", "Ambidexterity: the organizational capacity to exploit and explore at once.")}</text>
    </svg>
  );
}
function DiagramSoRSoESoI({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "SoR 記録", e: "SoR: Record", d: "基幹・安定性重視", de: "core, stability", c: C.ink }, { j: "SoE 顧客接点", e: "SoE: Engagement", d: "変更速度重視", de: "change velocity", c: C.blue }, { j: "SoI 洞察", e: "SoI: Insight", d: "分析柔軟性重視", de: "analytical flexibility", c: C.gold }];
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const x = 30 + i * 200; return (<g key={i}><rect x={x} y={40} width={180} height={90} rx={10} fill="#fff" stroke={s.c} strokeWidth="2.5" /><text x={x + 90} y={72} textAnchor="middle" fill={s.c} fontSize="12.5" fontWeight="800">{t(s.j, s.e)}</text><text x={x + 90} y={98} textAnchor="middle" fill={C.sub} fontSize="10">{t(s.d, s.de)}</text></g>); })}
      <text x={320} y={172} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("層で要求特性が違う。基幹に接点並みの変更速度を求めると事故る。", "Each layer demands different traits — demanding SoE-speed change from SoR breeds accidents.")}</text>
      <text x={320} y={214} textAnchor="middle" fill={C.sub} fontSize="11">{t("SoR/SoE/SoI:システムを層別し、開発手法・投資・統制を層ごとに最適化する。", "SoR/SoE/SoI: tier systems and optimize methods, investment, and control per layer.")}</text>
    </svg>
  );
}
function DiagramBuildBuyPartner({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <line x1={60} y1={150} x2={580} y2={150} stroke={C.line} strokeWidth="2" />
      <text x={60} y={172} fill={C.sub} fontSize="10.5">{t("業界共通(コモディティ)", "commodity")}</text>
      <text x={580} y={172} textAnchor="end" fill={C.dx} fontSize="10.5" fontWeight="700">{t("差別化の核", "differentiating core")}</text>
      {[["購入", "Buy", 140, C.blue], ["提携", "Partner", 320, C.violet], ["内製", "Build", 500, C.dx]].map((s, i) => (<g key={i}><circle cx={s[2]} cy={150} r={10} fill={s[3]} /><rect x={s[2] - 60} y={80} width={120} height={44} rx={8} fill="#fff" stroke={s[3]} strokeWidth="2.5" /><text x={s[2]} y={107} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="800">{t(s[0], s[1])}</text><line x1={s[2]} y1={124} x2={s[2]} y2={140} stroke={C.sub} strokeWidth="1.5" /></g>))}
      <text x={320} y={216} textAnchor="middle" fill={C.sub} fontSize="11">{t("Build/Buy/Partner:差別化の核は内製、業界共通は購入・提携。価格は方向決定の後。", "Build/Buy/Partner: build the core, buy or partner for commodities — price comes after direction.")}</text>
    </svg>
  );
}
function DiagramPPT({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const node = (cx, cy, jt, et, c) => (<g><circle cx={cx} cy={cy} r={62} fill={c} opacity="0.14" /><circle cx={cx} cy={cy} r={62} fill="none" stroke={c} strokeWidth="2.5" /><text x={cx} y={cy + 4} textAnchor="middle" fill={c} fontSize="12.5" fontWeight="800">{t(jt, et)}</text></g>);
  return (
    <svg viewBox="0 0 640 270" style={{ width: "100%", height: "auto" }}>
      {node(320, 96, "人", "People", C.blue)}
      {node(230, 180, "プロセス", "Process", C.gold)}
      {node(410, 180, "技術", "Technology", C.dx)}
      <text x={320} y={252} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("技術だけ入れて人・プロセスが旧態なら「高価な現状維持」になる。", "Technology alone, with old people and process, yields an expensive status quo.")}</text>
    </svg>
  );
}
function DiagramDataStair({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "記述", e: "Descriptive", d: "何が起きた?", de: "what happened?" }, { j: "診断", e: "Diagnostic", d: "なぜ?", de: "why?" }, { j: "予測", e: "Predictive", d: "何が起きる?", de: "what will happen?" }, { j: "処方", e: "Prescriptive", d: "何をすべき?", de: "what to do?" }];
  const cols = ["#8895A7", C.blue, C.gold, C.dx];
  return (
    <svg viewBox="0 0 640 270" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const w = 120, x = 30 + i * 140, h = 50 + i * 42, y = 220 - h; return (<g key={i}><rect x={x} y={y} width={w} height={h} rx={6} fill={cols[i]} /><text x={x + w / 2} y={y + 26} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">{t(s.j, s.e)}</text><text x={x + w / 2} y={y + 44} textAnchor="middle" fill="#fff" fontSize="9" opacity="0.9">{t(s.d, s.de)}</text></g>); })}
      <text x={40} y={24} fill={C.sub} fontSize="10.5">{t("価値・難度 →", "value & difficulty →")}</text>
      <line x1={20} y1={220} x2={620} y2={220} stroke={C.line} strokeWidth="1.5" />
      <text x={320} y={260} textAnchor="middle" fill={C.sub} fontSize="11">{t("データ活用の4段階:記述→診断→予測→処方。上るほど価値も難度も上がる。", "The analytics staircase: descriptive→diagnostic→predictive→prescriptive — value and difficulty rise together.")}</text>
    </svg>
  );
}
function DiagramCustomerJourney({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [["認知", "Aware"], ["検討", "Consider"], ["購入", "Buy"], ["利用", "Use"], ["推奨", "Advocate"]];
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const x = 40 + i * 118; return (<g key={i}><circle cx={x + 40} cy={80} r={30} fill="#fff" stroke={C.dx} strokeWidth="2.5" /><text x={x + 40} y={84} textAnchor="middle" fill={C.dx} fontSize="11" fontWeight="800">{t(s[0], s[1])}</text>{i < 4 && <line x1={x + 70} y1={80} x2={x + 118 + 10} y2={80} stroke={C.sub} strokeWidth="2" markerEnd="url(#cj1)" />}<rect x={x + 4} y={128} width={72} height={40} rx={5} fill="#F6F8FB" stroke={C.line} strokeWidth="1" /><text x={x + 40} y={152} textAnchor="middle" fill={C.sub} fontSize="9">{t("接点/痛点", "touch/pain")}</text></g>); })}
      <defs><marker id="cj1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={206} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("部門で分断された接点を顧客の時間軸に並べ直し、境界の断絶を可視化する。", "Re-sequence siloed touchpoints along the customer's timeline to expose the breaks between silos.")}</text>
    </svg>
  );
}
function DiagramPoCValley({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <path d="M40,70 L200,70 L320,180 L440,70 L600,70" fill="none" stroke={C.line} strokeWidth="2" />
      <circle cx={120} cy={70} r={9} fill={C.blue} /><text x={120} y={54} textAnchor="middle" fill={C.blue} fontSize="10.5" fontWeight="700">PoC</text>
      <circle cx={320} cy={180} r={11} fill={C.crimson} /><text x={320} y={210} textAnchor="middle" fill={C.crimson} fontSize="11" fontWeight="800">{t("死の谷(本番化の壁)", "valley: productionization")}</text>
      <circle cx={520} cy={70} r={9} fill={C.dx} /><text x={520} y={54} textAnchor="middle" fill={C.dx} fontSize="10.5" fontWeight="700">{t("本番展開", "Production")}</text>
      <text x={320} y={110} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("成功基準・予算・オーナーの事前接続で谷を越える", "cross via pre-wired criteria, budget, owner")}</text>
      <text x={320} y={228} textAnchor="middle" fill={C.sub} fontSize="11">{t("PoCの谷:多くの実証は本番に至らず消える。出口の事前設計が生死を分ける。", "The PoC valley: most pilots never reach production — pre-designing the exit decides survival.")}</text>
    </svg>
  );
}

// ===== Added diagrams: AI (d:6) =====
function DiagramMLLifecycle({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "問題定義", e: "Frame", c: C.ink }, { j: "データ整備", e: "Data", c: C.blue }, { j: "学習", e: "Train", c: C.violet }, { j: "評価", e: "Evaluate", c: C.gold }, { j: "デプロイ", e: "Deploy", c: C.teal }, { j: "監視", e: "Monitor", c: C.crimson }];
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const ang = (i / 6) * Math.PI * 2 - Math.PI / 2; const cx = 320 + Math.cos(ang) * 110, cy = 118 + Math.sin(ang) * 82; return (<g key={i}><circle cx={cx} cy={cy} r={36} fill="#fff" stroke={s.c} strokeWidth="2.5" /><text x={cx} y={cy + 4} textAnchor="middle" fill={s.c} fontSize="10.5" fontWeight="800">{t(s.j, s.e)}</text></g>); })}
      <text x={320} y={122} textAnchor="middle" fill={C.sub} fontSize="10">{t("継続ループ", "continuous")}</text>
      <text x={320} y={246} textAnchor="middle" fill={C.sub} fontSize="11">{t("MLライフサイクル:リリースは終点でなく監視・再学習が続く循環。生鮮品として扱う。", "The ML lifecycle: release is not the end — monitoring and retraining continue; treat models as perishable.")}</text>
    </svg>
  );
}
function DiagramRAGvsFTvsPrompt({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "プロンプト", e: "Prompting", d: "軽い・即時", de: "light, instant", c: C.teal }, { j: "RAG(検索)", e: "RAG", d: "知識を外部化・更新容易", de: "external, updatable knowledge", c: C.blue }, { j: "ファインチューニング", e: "Fine-tuning", d: "振る舞いを習得・要再学習", de: "learns behavior, needs retraining", c: C.violet }, { j: "事前学習", e: "Pretraining", d: "最重・最後の手段", de: "heaviest, last resort", c: C.crimson }];
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const w = 200 + i * 100, x = 30, y = 30 + i * 52; return (<g key={i}><rect x={x} y={y} width={w} height={44} rx={7} fill={s.c} opacity="0.9" /><text x={x + 14} y={y + 20} fill="#fff" fontSize="11.5" fontWeight="800">{t(s.j, s.e)}</text><text x={x + 14} y={y + 36} fill="#fff" fontSize="9" opacity="0.9">{t(s.d, s.de)}</text></g>); })}
      <text x={600} y={26} textAnchor="end" fill={C.sub} fontSize="10.5">{t("コスト・専門性・保守 →", "cost, expertise, upkeep →")}</text>
      <text x={320} y={252} textAnchor="middle" fill={C.sub} fontSize="11">{t("投資順序:まず軽い手段で足りるか確認し、必要な分だけ重い手段へ上る。", "Investment order: verify whether lighter means suffice, then climb only as far as needed.")}</text>
    </svg>
  );
}
function DiagramConfusionMatrix({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const cell = (x, y, jt, et, c, sub) => (<g><rect x={x} y={y} width={150} height={70} rx={8} fill={c} opacity="0.16" /><rect x={x} y={y} width={150} height={70} rx={8} fill="none" stroke={c} strokeWidth="2" /><text x={x + 75} y={y + 30} textAnchor="middle" fill={c} fontSize="12" fontWeight="800">{t(jt, et)}</text><text x={x + 75} y={y + 50} textAnchor="middle" fill={C.sub} fontSize="9.5">{sub}</text></g>);
  return (
    <svg viewBox="0 0 640 270" style={{ width: "100%", height: "auto" }}>
      <text x={230} y={30} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("実際:陽性", "actual +")}</text>
      <text x={410} y={30} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("実際:陰性", "actual −")}</text>
      <text x={90} y={80} fill={C.sub} fontSize="10.5">{t("予測+", "pred +")}</text>
      <text x={90} y={165} fill={C.sub} fontSize="10.5">{t("予測−", "pred −")}</text>
      {cell(155, 40, "TP", "TP", C.green, t("正しく陽性", "true positive"))}
      {cell(335, 40, "FP", "FP", C.crimson, t("誤検知", "false positive"))}
      {cell(155, 125, "FN", "FN", C.crimson, t("見逃し", "false negative"))}
      {cell(335, 125, "TN", "TN", C.green, t("正しく陰性", "true negative"))}
      <text x={320} y={222} textAnchor="middle" fill={C.txt} fontSize="11">{t("適合率=TP/(TP+FP) 誤検知の少なさ／再現率=TP/(TP+FN) 見逃しの少なさ", "Precision=TP/(TP+FP); Recall=TP/(TP+FN)")}</text>
      <text x={320} y={252} textAnchor="middle" fill={C.sub} fontSize="11">{t("混同行列:誤りの型で指標を選ぶ。誤検知と見逃し、どちらが高くつくかで運転点を決める。", "Confusion matrix: choose metrics by error type — set the operating point by which error costs more.")}</text>
    </svg>
  );
}
function DiagramAgentLoop({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "計画", e: "Plan", c: C.blue }, { j: "ツール実行", e: "Act (tools)", c: C.gold }, { j: "観察", e: "Observe", c: C.teal }, { j: "再計画", e: "Replan", c: C.violet }];
  return (
    <svg viewBox="0 0 640 260" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const cx = i % 2 === 0 ? 210 : 430, cy = i < 2 ? 80 : 180; return (<g key={i}><rect x={cx - 95} y={cy - 28} width={190} height={56} rx={10} fill="#fff" stroke={s.c} strokeWidth="2.5" /><text x={cx} y={cy + 4} textAnchor="middle" fill={s.c} fontSize="12.5" fontWeight="800">{t(s.j, s.e)}</text></g>); })}
      <line x1={305} y1={80} x2={335} y2={80} stroke={C.sub} strokeWidth="2" markerEnd="url(#ag1)" />
      <line x1={430} y1={108} x2={430} y2={152} stroke={C.sub} strokeWidth="2" markerEnd="url(#ag1)" />
      <line x1={335} y1={180} x2={305} y2={180} stroke={C.sub} strokeWidth="2" markerEnd="url(#ag1)" />
      <line x1={210} y1={152} x2={210} y2={108} stroke={C.sub} strokeWidth="2" markerEnd="url(#ag1)" />
      <rect x={250} y={104} width={140} height={50} rx={8} fill="#FEF6E7" stroke={C.gold} strokeWidth="1.5" />
      <text x={320} y={126} textAnchor="middle" fill="#7A5B00" fontSize="9.5">{t("権限最小化", "least privilege")}</text>
      <text x={320} y={142} textAnchor="middle" fill="#7A5B00" fontSize="9.5">{t("停止・巻き戻し", "kill / rollback")}</text>
      <defs><marker id="ag1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={244} textAnchor="middle" fill={C.sub} fontSize="11">{t("AIエージェント:計画→実行→観察→再計画を自律で回す。実行主体には権限と巻き戻しの設計が必須。", "AI agent: autonomously loops plan→act→observe→replan — acting requires authority and rollback design.")}</text>
    </svg>
  );
}
function DiagramLearningTypes({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const st = [{ j: "教師あり", e: "Supervised", d: "正解ラベルから対応を学ぶ", de: "learn mapping from labels", c: C.blue }, { j: "教師なし", e: "Unsupervised", d: "ラベルなしで構造を発見", de: "find structure, no labels", c: C.violet }, { j: "強化学習", e: "Reinforcement", d: "報酬で試行錯誤", de: "trial & error via reward", c: C.gold }];
  return (
    <svg viewBox="0 0 640 230" style={{ width: "100%", height: "auto" }}>
      {st.map((s, i) => { const x = 30 + i * 200; return (<g key={i}><rect x={x} y={40} width={180} height={92} rx={10} fill="#fff" stroke={s.c} strokeWidth="2.5" /><text x={x + 90} y={72} textAnchor="middle" fill={s.c} fontSize="12.5" fontWeight="800">{t(s.j, s.e)}</text><text x={x + 90} y={98} textAnchor="middle" fill={C.sub} fontSize="9.5">{t(s.d, s.de)}</text></g>); })}
      <text x={320} y={174} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("需要予測=教師あり／顧客分類=教師なし／在庫最適化=強化。データの状況が手法を決める。", "Forecasting: supervised; segmentation: unsupervised; sequential optimization: RL — the data situation dictates the method.")}</text>
      <text x={320} y={210} textAnchor="middle" fill={C.sub} fontSize="11">{t("機械学習の3類型:問題の定式化がモデル選択の前に来る。", "Three ML paradigms: problem formulation precedes model choice.")}</text>
    </svg>
  );
}
function DiagramMLOpsLoop({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 250" style={{ width: "100%", height: "auto" }}>
      <rect x={40} y={90} width={150} height={54} rx={9} fill={C.blue} /><text x={115} y={122} textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="800">{t("開発", "Dev")}</text>
      <rect x={245} y={90} width={150} height={54} rx={9} fill={C.violet} /><text x={320} y={116} textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="800">{t("デプロイ", "Deploy")}</text><text x={320} y={132} textAnchor="middle" fill="#EBE3FF" fontSize="9">{t("段階公開", "canary")}</text>
      <rect x={450} y={90} width={150} height={54} rx={9} fill={C.crimson} /><text x={525} y={116} textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="800">{t("監視", "Monitor")}</text><text x={525} y={132} textAnchor="middle" fill="#FFD9D5" fontSize="9">{t("ドリフト検知", "drift")}</text>
      <line x1={190} y1={117} x2={245} y2={117} stroke={C.sub} strokeWidth="2" markerEnd="url(#mo1)" />
      <line x1={395} y1={117} x2={450} y2={117} stroke={C.sub} strokeWidth="2" markerEnd="url(#mo1)" />
      <path d="M525,90 Q525,40 115,40 Q115,40 115,90" fill="none" stroke={C.sub} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#mo1)" />
      <text x={320} y={34} textAnchor="middle" fill={C.sub} fontSize="10">{t("劣化を検知→再学習へ戻す(条件駆動)", "drift → retrain (condition-driven)")}</text>
      <defs><marker id="mo1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={196} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("変化(データ・モデル・プロンプト)を前提に、検知・検証・巻き戻しを常設する。", "Assume change in data, models, prompts — keep detection, validation, and rollback standing.")}</text>
      <text x={320} y={230} textAnchor="middle" fill={C.sub} fontSize="11">{t("MLOps/LLMOps:信頼性は一度の検証でなく継続する規律から生まれる。", "MLOps/LLMOps: reliability comes from continuous discipline, not one-time verification.")}</text>
    </svg>
  );
}
function DiagramGuardrails({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  return (
    <svg viewBox="0 0 640 240" style={{ width: "100%", height: "auto" }}>
      <rect x={30} y={80} width={110} height={54} rx={8} fill={C.ink} /><text x={85} y={112} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">{t("入力", "Input")}</text>
      <rect x={165} y={80} width={120} height={54} rx={8} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2.5" /><text x={225} y={104} textAnchor="middle" fill={C.crimson} fontSize="10.5" fontWeight="800">{t("入力検査", "Input filter")}</text><text x={225} y={122} textAnchor="middle" fill={C.sub} fontSize="9">{t("インジェクション等", "injection etc.")}</text>
      <rect x={310} y={80} width={110} height={54} rx={8} fill={C.gold} /><text x={365} y={112} textAnchor="middle" fill="#3A3000" fontSize="11" fontWeight="800">{t("モデル", "Model")}</text>
      <rect x={445} y={80} width={120} height={54} rx={8} fill="#FCE9E7" stroke={C.crimson} strokeWidth="2.5" /><text x={505} y={104} textAnchor="middle" fill={C.crimson} fontSize="10.5" fontWeight="800">{t("出力検査", "Output filter")}</text><text x={505} y={122} textAnchor="middle" fill={C.sub} fontSize="9">{t("有害・機密・形式", "harm/secret/format")}</text>
      {[140, 285, 420].map((x, i) => <line key={i} x1={x} y1={107} x2={x + 25} y2={107} stroke={C.sub} strokeWidth="2" markerEnd="url(#gr1)" />)}
      <text x={505} y={160} textAnchor="middle" fill={C.sub} fontSize="9.5">{t("違反時:拒否/再生成/人へ", "on violation: refuse/regenerate/escalate")}</text>
      <defs><marker id="gr1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="none" stroke={C.sub} strokeWidth="1.6" /></marker></defs>
      <text x={320} y={200} textAnchor="middle" fill={C.txt} fontSize="11.5" fontWeight="700">{t("モデル内蔵の安全性だけに頼らず、アプリ層で入出力を挟む多層防御。", "Don't rely on model-internal safety alone — layer input/output checks at the app level.")}</text>
      <text x={320} y={228} textAnchor="middle" fill={C.sub} fontSize="11">{t("ガードレール:確率的な部品を検証・拒否・人の確認で囲み、頑健な業務を作る。", "Guardrails: fence a probabilistic component with validation, refusal, and human review.")}</text>
    </svg>
  );
}

function DiagramEngagementMap({ lang }) {
  const t = (j, e) => (lang === "ja" ? j : e);
  const [st, setSt] = useState(0);
  const STAGES = [
    { j: "初回訪問", e: "First call", main: [7, 1], sub: [0],
      wj: "相手が語る「課題」を鵜呑みにせず、解く価値のある論点かを疑う場。質問の質がそのまま次アポの確度になる",
      we: "Do not take the stated problem at face value — test whether it is an issue worth solving. Question quality converts directly into the next meeting",
      hj: "TechHub側の対応物: PLAYBOOK「FIRST CALL」・AX診断", he: "TechHub counterpart: the FIRST CALL playbook and the AX assessment" },
    { j: "論点設計", e: "Issue design", main: [4, 8], sub: [7],
      wj: "調べる前に構造を作り、仮の答えを張る。仮説なき調査は網羅への逃避 — ツリーの末端だけを検証する",
      we: "Structure before research, with a provisional answer pinned. Research without hypotheses is escape into completeness — verify only the leaves",
      hj: "対応物: 論点マップ・提案の型I(骨子)", he: "Counterpart: the issue map and Proposal Kit I" },
    { j: "分析・検証", e: "Analysis", main: [0, 1], sub: [5, 6],
      wj: "So What / Why So の往復で主張と事実を繋ぎ、反対の結論を支える事実を先に探す。AI・データはここの道具",
      we: "Run So What / Why So both ways, and hunt first for the facts that support the opposite conclusion. AI and data are tools of this stage",
      hj: "対応物: 定量データ(ファクトブック)・Evals設計", he: "Counterpart: the factbook and evals design" },
    { j: "提案書・プレゼン", e: "Proposal & pitch", main: [4, 0], sub: [],
      wj: "Answer First。結論→根拠→詳細のピラミッドに組み直し、意思決定事項・リソース・期限・責任者まで落ちて提言になる",
      we: "Answer first: conclusion, support, detail — and it becomes a recommendation only when it lands on decisions, resources, deadlines and owners",
      hj: "対応物: 提案の型VII(フル提案書)・PLAYBOOK「EXEC PITCH」", he: "Counterpart: Proposal Kit VII and the EXEC PITCH playbook" },
    { j: "合意形成・次の一手", e: "Agreement & next move", main: [2, 3], sub: [8],
      wj: "反対意見を「潰す」のでなく、失うものを特定して設計で返す。行き詰まりには視点をずらす道具(ラテラル・類推)が効く",
      we: "Do not crush objections — find what the objector loses and answer it in the design. When stuck, the sideways tools (lateral moves, analogy) earn their keep",
      hj: "対応物: 想定問答・PLAYBOOK「ONBOARD 90」", he: "Counterpart: objection handling and the ONBOARD 90 playbook" },
  ];
  const cur = STAGES[st];
  return (
    <div>
      <svg viewBox="0 0 640 120" style={{ width: "100%", height: "auto" }}>
        <defs>
          <marker id="egmA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.line} />
          </marker>
        </defs>
        {STAGES.map((x, i) => {
          const w = 112, gap = 18, x0 = 8 + i * (w + gap), on = st === i;
          return (
            <g key={i} onClick={() => setSt(i)} style={{ cursor: "pointer" }} role="button" tabIndex={0}
              onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSt(i); } }}>
              <rect x={x0} y={34} width={w} height={46} rx={9} fill={on ? C.ink : "#fff"} stroke={on ? C.ink : C.line} strokeWidth="2" />
              <text x={x0 + w / 2} y={62} textAnchor="middle" fill={on ? "#fff" : C.txt} fontSize="11.5" fontWeight="700">{t(x.j, x.e)}</text>
              {i < STAGES.length - 1 ? <line x1={x0 + w} y1={57} x2={x0 + w + gap - 3} y2={57} stroke={C.line} strokeWidth="2" markerEnd="url(#egmA)" /> : null}
            </g>
          );
        })}
        <text x={320} y={16} textAnchor="middle" fill={C.sub} fontSize="11">{t("段階をクリック — 主役の思考法が切り替わる", "Click a stage — the leading disciplines change")}</text>
        <text x={320} y={106} textAnchor="middle" fill={C.sub} fontSize="10.5">{t("9つの思考法は並列ではなく、案件の工程ごとに主役が交代する", "The nine disciplines are not parallel; each stage has its leads")}</text>
      </svg>
      <div style={{ background: "#fff", border: `1.5px solid ${C.line}`, borderRadius: 12, padding: "14px 16px", marginTop: 8 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: C.sub }}>{t("主役:", "Leads:")}</span>
          {cur.main.map((d) => (
            <span key={d} style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", background: DOMAINS[d].color, borderRadius: 999, padding: "3px 11px" }}>{lang === "ja" ? DOMAINS[d].ja : DOMAINS[d].en}</span>
          ))}
          {cur.sub.length > 0 && <span style={{ fontSize: 11, fontWeight: 800, color: C.sub, marginLeft: 6 }}>{t("脇:", "Support:")}</span>}
          {cur.sub.map((d) => (
            <span key={d} style={{ fontSize: 11.5, fontWeight: 700, color: DOMAINS[d].color, border: `1.5px solid ${DOMAINS[d].color}`, borderRadius: 999, padding: "2px 10px" }}>{lang === "ja" ? DOMAINS[d].ja : DOMAINS[d].en}</span>
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: C.txt, lineHeight: 1.75, marginBottom: 6 }}>{t(cur.wj, cur.we)}</div>
        <div style={{ fontSize: 11.5, color: C.sub }}>{t(cur.hj, cur.he)}</div>
      </div>
    </div>
  );
}

const DIAGRAMS = [
  { tj: "コンサル思考×案件工程マップ", te: "Disciplines x Engagement Stages", C: DiagramEngagementMap, d: 7 },
  { tj: "ピラミッド原則", te: "Pyramid Principle", C: DiagramPyramid, d: 0 },
  { tj: "空・雨・傘", te: "Sky-Rain-Umbrella", C: DiagramSkyRain, d: 0 },
  { tj: "イシューツリー", te: "Issue Tree", C: DiagramIssueTree, d: 0 },
  { tj: "イシューツリー（2段構え）", te: "Issue Tree (two-tier, MECE-fixed)", C: DiagramIssueTreeV2, d: 4 },
  { tj: "利益ドライバーツリー", te: "Profit Driver Tree", C: DiagramProfitTree, d: 4 },
  { tj: "デュポン分解(ROE/ROIC)", te: "DuPont (ROE/ROIC)", C: DiagramDupont, d: 4 },
  { tj: "価格ウォーターフォール", te: "Price Waterfall", C: DiagramPriceWaterfall, d: 4 },
  { tj: "PPMマトリクス", te: "Growth-Share Matrix", C: DiagramPPM, d: 4 },
  { tj: "5フォース", te: "Five Forces", C: DiagramFiveForces, d: 4 },
  { tj: "6つの帽子", te: "Six Thinking Hats", C: DiagramSixHats, d: 2 },
  { tj: "推論のはしご", te: "Ladder of Inference", C: DiagramLadderInference, d: 1 },
  { tj: "生存者バイアス", te: "Survivorship Bias", C: DiagramSurvivorship, d: 1 },
  { tj: "ダブルダイヤモンド", te: "Double Diamond", C: DiagramDoubleDiamond, d: 3 },
  { tj: "デザイン思考5段階", te: "Design Thinking (5 stages)", C: DiagramDesignThinking, d: 3 },
  { tj: "DX成熟度の階段", te: "DX Maturity Staircase", C: DiagramDXMaturity, d: 5 },
  { tj: "Run / Grow / Transform", te: "Run / Grow / Transform", C: DiagramRunGrowTransform, d: 5 },
  { tj: "RAGの流れ", te: "RAG Flow", C: DiagramRAG, d: 6 },
  { tj: "人とAIの分業", te: "Human-AI Division", C: DiagramHumanAI, d: 6 },
  { tj: "AIリスク階層", te: "AI Risk Tiers", C: DiagramAIRiskPyramid, d: 6 },
  // --- expansion (research-based) ---
  { tj: "MECE", te: "MECE", C: DiagramMECE, d: 0 },
  { tj: "演繹と帰納", te: "Deduction & Induction", C: DiagramDeductionInduction, d: 0 },
  { tj: "So What / Why So", te: "So What / Why So", C: DiagramSoWhat, d: 0 },
  { tj: "なぜなぜ分析", te: "Why-Why (cause tree)", C: DiagramWhyTree, d: 0 },
  { tj: "仮説検証サイクル", te: "Hypothesis Cycle", C: DiagramHypothesisCycle, d: 0 },
  { tj: "フェルミ推定", te: "Fermi Estimation", C: DiagramFermi, d: 0 },
  { tj: "相関と因果", te: "Correlation vs Causation", C: DiagramCorrelationCausation, d: 0 },
  { tj: "確証バイアス", te: "Confirmation Bias", C: DiagramConfirmationBias, d: 1 },
  { tj: "トゥールミンモデル", te: "Toulmin Model", C: DiagramToulmin, d: 1 },
  { tj: "事実・解釈・意見", te: "Fact / Inference / Opinion", C: DiagramFactOpinion, d: 1 },
  { tj: "ベースレートの誤り", te: "Base-Rate Neglect", C: DiagramBaseRate, d: 1 },
  { tj: "アンカリング", te: "Anchoring", C: DiagramAnchoring, d: 1 },
  { tj: "論理的誤謬", te: "Logical Fallacies", C: DiagramFallacies, d: 1 },
  { tj: "グッドハートの法則", te: "Goodhart's Law", C: DiagramGoodhart, d: 1 },
  { tj: "利用可能性ヒューリスティック", te: "Availability Heuristic", C: DiagramAvailability, d: 1 },
  { tj: "SCAMPER", te: "SCAMPER", C: DiagramSCAMPER, d: 2 },
  { tj: "前提逆転法", te: "Assumption Reversal", C: DiagramAssumptionReversal, d: 2 },
  { tj: "水平と垂直思考", te: "Lateral vs Vertical", C: DiagramLateralVertical, d: 2 },
  { tj: "アナロジー思考", te: "Analogical Thinking", C: DiagramAnalogy, d: 2 },
  { tj: "ランダム刺激法", te: "Random Stimulus", C: DiagramRandomStimulus, d: 2 },
  { tj: "逆ブレインストーミング", te: "Reverse Brainstorming", C: DiagramReverseBrainstorm, d: 2 },
  { tj: "マンダラート", te: "Mandal-Art", C: DiagramMandala, d: 2 },
  { tj: "オズボーンのチェックリスト", te: "Osborn's Checklist", C: DiagramOsborn, d: 2 },
  { tj: "強制連結法", te: "Forced Connection", C: DiagramForcedConnection, d: 2 },
  { tj: "発散と収束", te: "Diverge & Converge", C: DiagramDivergeConverge, d: 3 },
  { tj: "ブレスト4原則", te: "Brainstorming Rules", C: DiagramBrainstormRules, d: 3 },
  { tj: "KJ法", te: "KJ Method", C: DiagramKJ, d: 3 },
  { tj: "リーン(構築-計測-学習)", te: "Lean Build-Measure-Learn", C: DiagramLeanLoop, d: 3 },
  { tj: "MVP", te: "Minimum Viable Product", C: DiagramMVP, d: 3 },
  { tj: "JTBD(片付けたい用事)", te: "Jobs to be Done", C: DiagramJTBD, d: 3 },
  { tj: "プロトタイプの忠実度", te: "Prototype Fidelity", C: DiagramPrototypeFidelity, d: 3 },
  { tj: "デザインスプリント", te: "Design Sprint", C: DiagramDesignSprint, d: 3 },
  { tj: "3C分析", te: "3C Analysis", C: Diagram3C, d: 4 },
  { tj: "SWOT / TOWS", te: "SWOT / TOWS", C: DiagramSWOT, d: 4 },
  { tj: "バリューチェーン", te: "Value Chain", C: DiagramValueChain, d: 4 },
  { tj: "7Sフレームワーク", te: "7S Framework", C: Diagram7S, d: 4 },
  { tj: "デジタイゼーション3層", te: "Digitization Layers", C: DiagramDigitizationLayers, d: 5 },
  { tj: "両利きの経営", te: "Ambidexterity", C: DiagramAmbidexterity, d: 5 },
  { tj: "SoR / SoE / SoI", te: "SoR / SoE / SoI", C: DiagramSoRSoESoI, d: 5 },
  { tj: "Build / Buy / Partner", te: "Build / Buy / Partner", C: DiagramBuildBuyPartner, d: 5 },
  { tj: "People-Process-Technology", te: "People-Process-Technology", C: DiagramPPT, d: 5 },
  { tj: "データ活用の4段階", te: "Analytics Staircase", C: DiagramDataStair, d: 5 },
  { tj: "カスタマージャーニー", te: "Customer Journey", C: DiagramCustomerJourney, d: 5 },
  { tj: "PoCの谷", te: "PoC Valley", C: DiagramPoCValley, d: 5 },
  { tj: "MLライフサイクル", te: "ML Lifecycle", C: DiagramMLLifecycle, d: 6 },
  { tj: "RAG/FT/プロンプトの順序", te: "RAG / FT / Prompt Order", C: DiagramRAGvsFTvsPrompt, d: 6 },
  { tj: "混同行列(精度/再現率)", te: "Confusion Matrix", C: DiagramConfusionMatrix, d: 6 },
  { tj: "AIエージェントのループ", te: "Agent Loop", C: DiagramAgentLoop, d: 6 },
  { tj: "機械学習の3類型", te: "Three ML Paradigms", C: DiagramLearningTypes, d: 6 },
  { tj: "MLOps継続ループ", te: "MLOps Loop", C: DiagramMLOpsLoop, d: 6 },
  { tj: "ガードレール", te: "Guardrails", C: DiagramGuardrails, d: 6 },
];

// =====================================================================
// Utilities
// =====================================================================
function seededPerm(seed, n) {
  const a = [...Array(n).keys()];
  let s = seed * 2654435761 % 4294967296;
  for (let i = n - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const STORAGE_KEY = "consulting-thinking-hub-v1";

// =====================================================================
// Main App
// =====================================================================
// =====================================================================
// SPACED REPETITION (間隔反復) — SM-2 + forgetting curve
// =====================================================================
/* =====================================================================
   Spaced Repetition Add-on — 間隔反復モジュール(忘却曲線ベース)
   for コンサル思考術 統合ハブ / Consulting Thinking Hub
   --------------------------------------------------------------------
   Contents:
     (1) SR scheduler   — SM-2 variant + forgetting-curve retention
     (2) ForgettingCurveDiagram / SpacedRepetitionSchedule  (SVG 図解)
     (3) ReviewTab      — bilingual review UI, window.storage persistence
   Integration:
     - Add tab key "review" to L.tabs, render <ReviewTab .../>
     - Pass the hub's Q array as `pool` (or expose window.__HUB_Q)
     - Optionally seed weak items from the hub's answer `stats`
   ===================================================================== */

// ---------- Design tokens (hub-consistent) ----------

// ---------- Storage key ----------
const SR_KEY = "csr:cards:v1";

// =====================================================================
// (1) SR SCHEDULER — pure functions
// grade: 0 = Again(忘れた) / 1 = Hard(難しい) / 2 = Good(普通) / 3 = Easy(簡単)
// A card: { id, ef, interval(days), reps, lapses, due(ms), last(ms), stability(days) }
// =====================================================================
const DAY = 86400000;
const MIN10 = DAY * (10 / 1440); // 10 minutes in days-of-ms

function newCard(id, now) {
  return { id, ef: 2.5, interval: 0, reps: 0, lapses: 0, due: now, last: now, stability: 0.5 };
}

// SM-2 style ease update from a 0..3 grade mapped to SM-2 quality 2..5
function updateEase(ef, grade) {
  const q = grade + 2;                       // 0->2, 1->3, 2->4, 3->5
  const next = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  return Math.max(1.3, Math.min(3.0, next));
}

// Core scheduler: returns a NEW card object (does not mutate)
function schedule(card, grade, now) {
  const c = { ...card, last: now };
  if (grade === 0) {
    // lapse: relearn shortly, drop ease
    c.reps = 0;
    c.lapses = (c.lapses || 0) + 1;
    c.ef = Math.max(1.3, c.ef - 0.2);
    c.interval = MIN10 / DAY;                 // ~10 min, expressed in days
    c.due = now + MIN10;
    c.stability = 0.3;
    return c;
  }
  c.reps = (c.reps || 0) + 1;
  let iv;
  if (c.reps === 1) iv = grade === 3 ? 2 : 1;                 // first pass
  else if (c.reps === 2) iv = grade === 1 ? 3 : grade === 3 ? 6 : 4;
  else {
    const mult = grade === 1 ? 0.8 : grade === 3 ? 1.3 : 1.0; // hard/good/easy
    iv = Math.max(1, Math.round((card.interval || 1) * c.ef * mult));
  }
  c.ef = updateEase(c.ef, grade);
  c.interval = iv;
  c.stability = iv;                           // stability ≈ current interval (days)
  c.due = now + iv * DAY;
  return c;
}

// Estimated retention at time `now` given the forgetting curve R = exp(-t/S)
function retention(card, now) {
  if (!card || !card.last) return 0;
  const elapsedDays = Math.max(0, (now - card.last) / DAY);
  const S = Math.max(0.2, card.stability || card.interval || 0.5);
  return Math.exp(-elapsedDays / S);
}

// Due cards (retention-weighted): overdue first, then lowest retention
function dueCards(cards, now) {
  return Object.values(cards)
    .filter((c) => c.due <= now)
    .sort((a, b) => (a.due - b.due) || (retention(a, now) - retention(b, now)));
}

// Cards becoming due within `hoursAhead` (for "soon" preview)
function upcomingCount(cards, now, hoursAhead) {
  const limit = now + hoursAhead * 3600000;
  return Object.values(cards).filter((c) => c.due > now && c.due <= limit).length;
}

// =====================================================================
// (2) DIAGRAMS (SVG 図解)
// =====================================================================

// --- Forgetting curve: naive decay vs. spaced-review reinforced decay ---
function ForgettingCurveDiagram({ lang }) {
  const t = (ja, en) => (lang === "ja" ? ja : en);
  const W = 680, H = 360, padL = 54, padR = 24, padT = 28, padB = 46;
  const x0 = padL, x1 = W - padR, y0 = H - padB, y1 = padT;
  const days = 30;
  const sx = (d) => x0 + (d / days) * (x1 - x0);
  const sy = (r) => y0 + (y1 - y0) * r; // r in [0,1], 1=top

  // naive single decay, stability S=2 days
  const naive = [];
  for (let d = 0; d <= days; d += 0.5) naive.push([sx(d), sy(Math.exp(-d / 2))]);

  // spaced reviews at these days; each review resets to 1 and increases stability
  const reviewDays = [0, 1, 4, 10, 22];
  const stab = [2, 4, 8, 16, 30];
  const spaced = [];
  for (let i = 0; i < reviewDays.length; i++) {
    const start = reviewDays[i];
    const end = i + 1 < reviewDays.length ? reviewDays[i + 1] : days;
    const S = stab[i];
    for (let d = start; d <= end; d += 0.4) {
      spaced.push([sx(d), sy(Math.exp(-(d - start) / S))]);
    }
  }
  const toPath = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");

  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, fontFamily: sans }}>
      {/* axes grid */}
      {yTicks.map((r, i) => (
        <g key={i}>
          <line x1={x0} y1={sy(r)} x2={x1} y2={sy(r)} stroke={C.line} strokeWidth="1" />
          <text x={x0 - 8} y={sy(r) + 4} textAnchor="end" fontSize="11" fill={C.sub}>{Math.round(r * 100)}%</text>
        </g>
      ))}
      {[0, 7, 14, 21, 30].map((d) => (
        <text key={d} x={sx(d)} y={y0 + 18} textAnchor="middle" fontSize="11" fill={C.sub}>{d}{t("日", "d")}</text>
      ))}
      <text x={(x0 + x1) / 2} y={H - 6} textAnchor="middle" fontSize="12" fill={C.txt}>{t("経過日数", "Days elapsed")}</text>
      <text x={16} y={(y0 + y1) / 2} textAnchor="middle" fontSize="12" fill={C.txt} transform={`rotate(-90 16 ${(y0 + y1) / 2})`}>{t("記憶保持率", "Retention")}</text>

      {/* naive decay */}
      <path d={toPath(naive)} fill="none" stroke={C.red} strokeWidth="2.5" strokeDasharray="5 4" />
      {/* spaced */}
      <path d={toPath(spaced)} fill="none" stroke={C.blue} strokeWidth="2.5" />
      {/* review markers */}
      {reviewDays.map((d, i) => (
        <g key={i}>
          <line x1={sx(d)} y1={sy(1)} x2={sx(d)} y2={y0} stroke={C.green} strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
          <circle cx={sx(d)} cy={sy(1)} r="4" fill={C.green} />
        </g>
      ))}
      {/* legend */}
      <g transform={`translate(${x1 - 210},${y1 + 4})`}>
        <line x1="0" y1="0" x2="24" y2="0" stroke={C.red} strokeWidth="2.5" strokeDasharray="5 4" />
        <text x="30" y="4" fontSize="11" fill={C.txt}>{t("復習なし(急速に忘却)", "No review (rapid decay)")}</text>
        <line x1="0" y1="18" x2="24" y2="18" stroke={C.blue} strokeWidth="2.5" />
        <text x="30" y="22" fontSize="11" fill={C.txt}>{t("間隔反復(曲線が平坦化)", "Spaced (curve flattens)")}</text>
        <circle cx="12" cy="36" r="4" fill={C.green} />
        <text x="30" y="40" fontSize="11" fill={C.txt}>{t("復習タイミング", "Review point")}</text>
      </g>
    </svg>
  );
}

// --- Spaced-repetition interval ladder (expanding intervals) ---
function SpacedRepetitionSchedule({ lang }) {
  const t = (ja, en) => (lang === "ja" ? ja : en);
  const W = 680, H = 250, padL = 20, padR = 20, padT = 40, padB = 40;
  const steps = [
    { lab: t("初回", "New"), iv: t("即時", "0"), d: 0 },
    { lab: "R1", iv: "1" + t("日", "d"), d: 1 },
    { lab: "R2", iv: "3" + t("日", "d"), d: 3 },
    { lab: "R3", iv: "7" + t("日", "d"), d: 7 },
    { lab: "R4", iv: "16" + t("日", "d"), d: 16 },
    { lab: "R5", iv: "35" + t("日", "d"), d: 35 },
    { lab: "R6", iv: "90" + t("日", "d"), d: 90 },
  ];
  const maxLog = Math.log(90 + 1);
  const x0 = padL, x1 = W - padR;
  const sx = (d) => x0 + (Math.log(d + 1) / maxLog) * (x1 - x0);
  const yBase = H - padB;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, fontFamily: sans }}>
      <line x1={x0} y1={yBase} x2={x1} y2={yBase} stroke={C.line} strokeWidth="2" />
      {steps.map((s, i) => {
        const x = sx(s.d);
        const h = 24 + i * 16; // growing bars = growing confidence/interval
        const col = i === 0 ? C.sub : `hsl(${210 + i * 12},70%,${58 - i * 3}%)`;
        return (
          <g key={i}>
            <line x1={x} y1={yBase} x2={x} y2={yBase - h} stroke={col} strokeWidth="10" strokeLinecap="round" />
            <circle cx={x} cy={yBase - h} r="6" fill={col} />
            <text x={x} y={yBase - h - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill={C.txt}>{s.iv}</text>
            <text x={x} y={yBase + 18} textAnchor="middle" fontSize="11" fill={C.sub}>{s.lab}</text>
            {i > 0 && (
              <path d={`M${sx(steps[i - 1].d)},${yBase - 6} Q${(sx(steps[i - 1].d) + x) / 2},${yBase - h - 22} ${x},${yBase - h + 4}`}
                fill="none" stroke={col} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
            )}
          </g>
        );
      })}
      <text x={(x0 + x1) / 2} y={20} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={C.ink}>
        {t("正解を重ねるほど復習間隔が指数的に拡大", "Intervals expand exponentially as answers stay correct")}
      </text>
      <text x={(x0 + x1) / 2} y={H - 6} textAnchor="middle" fontSize="11" fill={C.sub}>
        {t("不正解なら間隔はリセットされ、短い間隔から再スタート", "A miss resets the interval, restarting from short spacing")}
      </text>
    </svg>
  );
}

// =====================================================================
// (3) REVIEW TAB
// props: lang ("ja"|"en"), pool: [{id, d, j, e, o, a, x}], stats (optional seed)
// =====================================================================
const RL = {
  title: { ja: "間隔反復レビュー", en: "Spaced Repetition Review" },
  intro: {
    ja: "忘却曲線に基づき、忘れかけたタイミングで自動的に問題を再出題します。正解を重ねるほど間隔が延び、間違えると短く戻ります。",
    en: "Based on the forgetting curve, items resurface just as you're about to forget them. Correct answers stretch the interval; misses shorten it.",
  },
  due: { ja: "復習期限", en: "Due now" },
  soon: { ja: "24時間以内", en: "Within 24h" },
  learned: { ja: "登録済み", en: "Tracked" },
  avgRet: { ja: "平均保持率", en: "Avg. retention" },
  start: { ja: "復習を開始", en: "Start review" },
  seed: { ja: "苦手問題を取り込む", en: "Seed from weak items" },
  seedDone: { ja: "件を復習キューに追加しました", en: "items added to the review queue" },
  none: { ja: "今すぐ復習すべき問題はありません。お疲れさまでした。", en: "Nothing is due right now. Well done." },
  noPool: { ja: "問題プールが接続されていません(hub の Q 配列を pool として渡してください)。", en: "No question pool connected (pass the hub's Q array as `pool`)." },
  again: { ja: "忘れた", en: "Again" },
  hard: { ja: "難しい", en: "Hard" },
  good: { ja: "普通", en: "Good" },
  easy: { ja: "簡単", en: "Easy" },
  show: { ja: "解答を表示", en: "Show answer" },
  next: { ja: "次回", en: "Next" },
  finish: { ja: "セッション終了", en: "Session complete" },
  reviewed: { ja: "問を復習しました", en: "items reviewed" },
  reset: { ja: "スケジュールをリセット", en: "Reset schedule" },
  explanation: { ja: "解説", en: "Explanation" },
  curveTitle: { ja: "忘却曲線と間隔反復", en: "The forgetting curve & spaced repetition" },
  ladderTitle: { ja: "復習間隔の拡大", en: "Expanding review intervals" },
  retLabel: { ja: "推定保持率", en: "Est. retention" },
};

async function loadCards() {
  try {
    const r = await window.storage.get(SR_KEY);
    return r && r.value ? JSON.parse(r.value) : {};
  } catch (e) { return {}; }
}
async function saveCards(cards) {
  try { await window.storage.set(SR_KEY, JSON.stringify(cards)); } catch (e) { /* no-op */ }
}

const SR_HIST_KEY = "csr:history:v1";
function srDayKey(now) { const d = new Date(now); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function srSnapshot(cards, now) {
  const arr = Object.values(cards);
  const avg = arr.length ? arr.reduce((s, c) => s + retention(c, now), 0) / arr.length : 0;
  const due = arr.filter((c) => c.due <= now).length;
  return { d: srDayKey(now), avg: Math.round(avg * 1000) / 1000, due, tracked: arr.length };
}
function srUpsert(history, snap) {
  const h = (history || []).filter((x) => x.d !== snap.d);
  h.push(snap); h.sort((a, b) => (a.d < b.d ? -1 : 1));
  return h.slice(-90);
}
async function loadHistory() { try { const r = await window.storage.get(SR_HIST_KEY); return r && r.value ? JSON.parse(r.value) : []; } catch (e) { return []; } }
async function saveHistory(h) { try { await window.storage.set(SR_HIST_KEY, JSON.stringify(h)); } catch (e) { /* ignore */ } }

function srStreak(history) {
  if (!history || !history.length) return 0;
  const days = new Set(history.map((h) => h.d));
  const ONE = 86400000;
  let cur = Date.now();
  if (!days.has(srDayKey(cur))) cur -= ONE; // grace: allow streak ending yesterday
  let n = 0;
  while (days.has(srDayKey(cur))) { n++; cur -= ONE; }
  return n;
}

function RetentionTrend({ history, lang, target = 0.85 }) {
  const t = (ja, en) => (lang === "ja" ? ja : en);
  const data = (history || []).slice(-30);
  if (data.length < 2) return <div style={{ fontSize: 13, color: C.sub }}>{t("\u5fa9\u7fd2\u3092\u91cd\u306d\u308b\u30682\u65e5\u76ee\u4ee5\u964d\u306b\u30c8\u30ec\u30f3\u30c9\u304c\u8868\u793a\u3055\u308c\u307e\u3059\uff08\u30c7\u30fc\u30bf\u53ce\u96c6\u4e2d\uff09\u3002", "The trend appears from day 2 as you keep reviewing (collecting data).")}</div>;
  const W = 640, H = 220, padL = 42, padR = 16, padT = 16, padB = 34;
  const x0 = padL, x1 = W - padR, y0 = H - padB, y1 = padT;
  const sx = (i) => x0 + (data.length === 1 ? 0 : (i / (data.length - 1)) * (x1 - x0));
  const sy = (r) => y0 + (y1 - y0) * r;
  const line = data.map((p, i) => (i ? "L" : "M") + sx(i).toFixed(1) + "," + sy(p.avg).toFixed(1)).join(" ");
  const area = "M" + sx(0).toFixed(1) + "," + y0 + " " + data.map((p, i) => "L" + sx(i).toFixed(1) + "," + sy(p.avg).toFixed(1)).join(" ") + " L" + sx(data.length - 1).toFixed(1) + "," + y0 + " Z";
  return (
    <svg viewBox={"0 0 " + W + " " + H} width="100%" style={{ maxWidth: W, fontFamily: sans }}>
      {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
        <g key={i}>
          <line x1={x0} y1={sy(r)} x2={x1} y2={sy(r)} stroke={C.line} strokeWidth="1" />
          <text x={x0 - 6} y={sy(r) + 4} textAnchor="end" fontSize="10" fill={C.sub}>{Math.round(r * 100)}%</text>
        </g>
      ))}
      <path d={area} fill={C.blue} opacity="0.08" />
      <path d={line} fill="none" stroke={C.blue} strokeWidth="2.5" />
      {data.map((p, i) => <circle key={i} cx={sx(i)} cy={sy(p.avg)} r="3" fill={C.blue} />)}
      <line x1={x0} y1={sy(target)} x2={x1} y2={sy(target)} stroke={C.green} strokeWidth="1.5" strokeDasharray="6 4" />
      <text x={x1} y={sy(target) - 5} textAnchor="end" fontSize="10" fontWeight="700" fill={C.green}>{t("目標", "Target")} {Math.round(target * 100)}%</text>
      <text x={x0} y={H - 8} textAnchor="start" fontSize="10" fill={C.sub}>{data[0].d.slice(5)}</text>
      <text x={x1} y={H - 8} textAnchor="end" fontSize="10" fill={C.sub}>{data[data.length - 1].d.slice(5)}</text>
      <text x={(x0 + x1) / 2} y={H - 8} textAnchor="middle" fontSize="10.5" fill={C.txt}>{t("\u5e73\u5747\u4fdd\u6301\u7387\u306e\u63a8\u79fb", "Average retention over time")}</text>
    </svg>
  );
}

function DomainPriority({ cards, poolById, lang, onReview }) {
  const t = (ja, en) => (lang === "ja" ? ja : en);
  const now = Date.now();
  const rows = DOMAINS.map((dm) => {
    const cs = Object.values(cards).filter((c) => poolById[c.id] && poolById[c.id].d === dm.id);
    const due = cs.filter((c) => c.due <= now).length;
    const avg = cs.length ? cs.reduce((s, c) => s + retention(c, now), 0) / cs.length : null;
    const weak = cs.filter((c) => retention(c, now) < 0.5).length;
    const score = due * 2 + weak + (avg != null ? (1 - avg) * 3 : 0);
    return { dm, tracked: cs.length, due, avg, weak, score };
  }).filter((r) => r.tracked > 0);
  if (!rows.length) return <div style={{ fontSize: 13, color: C.sub }}>{t("\u307e\u3060\u767b\u9332\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u300c\u82e6\u624b\u554f\u984c\u3092\u53d6\u308a\u8fbc\u3080\u300d\u3067\u958b\u59cb\u3067\u304d\u307e\u3059\u3002", "No tracked items yet \u2014 use \u2018Seed from weak items\u2019 to begin.")}</div>;
  rows.sort((a, b) => b.score - a.score);
  const label = (r) => (r.due > 0 || (r.avg != null && r.avg < 0.5)) ? { x: t("\u9ad8", "High"), c: C.red } : (r.avg != null && r.avg < 0.75) ? { x: t("\u4e2d", "Med"), c: C.amber } : { x: t("\u4f4e", "Low"), c: C.green };
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {rows.map((r, i) => {
        const L = label(r);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid " + C.line, borderRadius: 10 }}>
            <span style={{ width: 30, height: 24, borderRadius: 6, background: L.c, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{L.x}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.txt }}><span style={{ color: r.dm.color }}>{r.dm.mark}</span> {lang === "ja" ? r.dm.ja : r.dm.en}</div>
              <div style={{ fontSize: 11.5, color: C.sub, marginTop: 2 }}>{t("\u671f\u9650\u5207\u308c", "Due")} {r.due} \u00b7 {t("\u4fdd\u6301\u7387", "Retention")} {r.avg == null ? "\u2014" : Math.round(r.avg * 100) + "%"} \u00b7 {t("\u5f31\u3044", "Weak")} {r.weak}</div>
            </div>
            <button onClick={() => onReview(r.dm.id)} disabled={r.due === 0} style={{ padding: "7px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "none", background: r.due ? C.ink : C.line, color: "#fff", cursor: r.due ? "pointer" : "default", flexShrink: 0, whiteSpace: "nowrap" }}>{t("\u3053\u306e\u5206\u91ce\u3092\u5fa9\u7fd2", "Review")}</button>
          </div>
        );
      })}
    </div>
  );
}

function RetentionHeatmap({ cards, poolById, lang }) {
  const t = (ja, en) => (lang === "ja" ? ja : en);
  const now = Date.now();
  const byDom = {};
  Object.values(cards).forEach((c) => {
    const q = poolById[c.id];
    if (!q) return;
    (byDom[q.d] = byDom[q.d] || []).push(retention(c, now));
  });
  const total = Object.values(byDom).reduce((s, a) => s + a.length, 0);
  if (!total) return <div style={{ fontSize: 13, color: C.sub }}>{t("\u307e\u3060\u767b\u9332\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u300c\u82e6\u624b\u554f\u984c\u3092\u53d6\u308a\u8fbc\u3080\u300d\u3067\u958b\u59cb\u3067\u304d\u307e\u3059\u3002", "No tracked items yet \u2014 use \u2018Seed from weak items\u2019 to begin.")}</div>;
  const colorFor = (r) => (r >= 0.85 ? "#12B76A" : r >= 0.6 ? "#84CC16" : r >= 0.4 ? "#F79009" : r >= 0.2 ? "#F97316" : "#F04438");
  return (
    <div>
      {DOMAINS.map((d) => {
        const arr = (byDom[d.id] || []).slice().sort((a, b) => a - b);
        const avg = arr.length ? Math.round((arr.reduce((s, x) => s + x, 0) / arr.length) * 100) : null;
        return (
          <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <div style={{ width: 132, fontSize: 12, color: C.txt, flexShrink: 0 }}>
              <span style={{ color: d.color, fontWeight: 800 }}>{d.mark}</span> {lang === "ja" ? d.ja : d.en}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3, flex: 1, minHeight: 13 }}>
              {arr.length === 0 ? <span style={{ fontSize: 11, color: C.sub }}>\u2014</span>
                : arr.map((r, i) => <div key={i} title={Math.round(r * 100) + "%"} style={{ width: 13, height: 13, borderRadius: 3, background: colorFor(r) }} />)}
            </div>
            <div style={{ width: 42, textAlign: "right", fontSize: 11, color: C.sub, flexShrink: 0 }}>{avg == null ? "\u2014" : avg + "%"}</div>
          </div>
        );
      })}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 11, color: C.sub }}>
        <span>{t("\u5f31\u3044", "Weak")}</span>
        {["#F04438", "#F97316", "#F79009", "#84CC16", "#12B76A"].map((c, i) => <div key={i} style={{ width: 18, height: 10, borderRadius: 2, background: c }} />)}
        <span>{t("\u5f37\u3044", "Strong")}</span>
        <span style={{ marginLeft: "auto" }}>{t("\u5404\u30bb\u30eb=1\u554f\uff0f\u5f31\u3044\u9806", "each cell = one item, weakest first")}</span>
      </div>
    </div>
  );
}

function ReviewTab({ lang = "ja", pool = [], stats = null }) {
  const t = (o) => (o ? (lang === "ja" ? o.ja : o.en) : "");
  const [cards, setCards] = useState({});
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null); // {queue:[ids], idx, done, revealed}
  const __opBack = useLocalHistory([[session, setSession]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const [flash, setFlash] = useState("");
  const [history, setHistory] = useState([]);
  const streak = useMemo(() => srStreak(history), [history]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const c = await loadCards();
      const h0 = await loadHistory();
      const h1 = srUpsert(h0, srSnapshot(c, Date.now()));
      await saveHistory(h1);
      if (alive) { setCards(c); setHistory(h1); setReady(true); }
    })();
    return () => { alive = false; };
  }, []);

  const poolById = useMemo(() => {
    const m = {};
    pool.forEach((q, i) => { const id = q.id != null ? q.id : "q" + i; m[id] = q; });
    return m;
  }, [pool]);

  const now = Date.now();
  const due = useMemo(() => dueCards(cards, now).filter((c) => poolById[c.id]), [cards, poolById]);
  const soon = useMemo(() => upcomingCount(cards, now, 24), [cards]);
  const avgRet = useMemo(() => {
    const arr = Object.values(cards);
    if (!arr.length) return null;
    return arr.reduce((s, c) => s + retention(c, now), 0) / arr.length;
  }, [cards]);

  const persist = useCallback((next) => {
    setCards(next); saveCards(next);
    setHistory((prev) => { const h = srUpsert(prev, srSnapshot(next, Date.now())); saveHistory(h); return h; });
  }, []);

  // Seed: register wrong-answered (weak) items from hub stats, or all pool if no stats
  const seedWeak = useCallback(() => {
    const n = { ...cards };
    let added = 0;
    const ids = Object.keys(poolById);
    ids.forEach((id) => {
      if (n[id]) return;
      // hub stats shape: { [qid]: { ok: bool, t: ms } }
      let weak = true;
      if (stats && stats[id]) weak = !stats[id].ok; // wrong last time; unanswered => weak
      if (weak) { n[id] = newCard(id, now); added++; }
    });
    persist(n);
    setFlash(added + " " + t(RL.seedDone));
    setTimeout(() => setFlash(""), 2600);
  }, [cards, poolById, stats]);

  const startSession = useCallback((domFilter = null) => {
    let d2 = due;
    if (domFilter != null && typeof domFilter === "number") d2 = due.filter((c) => poolById[c.id] && poolById[c.id].d === domFilter);
    const queue = d2.slice(0, 20).map((c) => c.id);
    if (!queue.length) return;
    setSession({ queue, idx: 0, done: 0, revealed: false, picked: null });
  }, [due, poolById]);

  const grade = useCallback((g) => {
    if (!session) return;
    const id = session.queue[session.idx];
    const card = cards[id] || newCard(id, Date.now());
    const updated = schedule(card, g, Date.now());
    const next = { ...cards, [id]: updated };
    persist(next);
    const nextIdx = session.idx + 1;
    if (nextIdx >= session.queue.length) {
      setSession({ ...session, done: session.done + 1, finished: true });
    } else {
      setSession({ ...session, idx: nextIdx, done: session.done + 1, revealed: false, picked: null });
    }
  }, [session, cards]);

  const resetSchedule = useCallback(() => { persist({}); setSession(null); }, []);

  const box = (bg, border) => ({
    background: bg || C.card, border: `1px solid ${border || C.line}`,
    borderRadius: 12, padding: 16,
  });

  if (!ready) return <div style={{ padding: 24, color: C.sub, fontFamily: sans }}>…</div>;

  // ---- Active session view ----
  if (session && !session.finished) {
    const id = session.queue[session.idx];
    const q = poolById[id];
    const gLabels = [
      { g: 0, l: RL.again, col: C.red }, { g: 1, l: RL.hard, col: C.amber },
      { g: 2, l: RL.good, col: C.blue }, { g: 3, l: RL.easy, col: C.green },
    ];
    return (
      <div style={{ fontFamily: sans, color: C.txt, maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: C.sub }}>{session.idx + 1} / {session.queue.length}</span>
          <span style={{ fontSize: 12, color: C.sub }}>{t(RL.retLabel)}: {Math.round(retention(cards[id] || newCard(id, now), now) * 100)}%</span>
        </div>
        <div style={{ height: 4, background: C.line, borderRadius: 4, marginBottom: 18 }}>
          <div style={{ width: `${(session.idx / session.queue.length) * 100}%`, height: "100%", background: C.blue, borderRadius: 4 }} />
        </div>
        <div style={box()}>
          <div style={{ fontSize: 16, lineHeight: 1.6, fontWeight: 600, display: "flex", alignItems: "flex-start", gap: 6 }}><span style={{ flex: 1 }}>{lang === "ja" ? q.j : q.e}</span><StarButton id={"q#" + novaQHash(q.j || q.e || "")} text={q.j || q.e} scope={"Consulting"} /></div>
          <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
            {q.o.map((opt, i) => {
              const isAns = i === q.a;
              const show = session.revealed;
              return (
                <div key={i} style={{
                  padding: "10px 12px", borderRadius: 9, fontSize: 14,
                  border: `1px solid ${show && isAns ? C.green : C.line}`,
                  background: show && isAns ? "#ECFDF3" : "#FBFCFE",
                  color: show && isAns ? "#05603A" : C.txt, fontWeight: show && isAns ? 600 : 400,
                }}>
                  {lang === "ja" ? opt[0] : opt[1]}
                </div>
              );
            })}
          </div>
          {session.revealed && (
            <div style={{ marginTop: 14, padding: 12, background: C.paper, borderRadius: 9, fontSize: 13.5, lineHeight: 1.65, color: C.inkSoft }}>
              <strong style={{ color: C.blue }}>{t(RL.explanation)}: </strong>
              {lang === "ja" ? q.x[0] : q.x[1]}
            </div>
          )}
        </div>
        {!session.revealed ? (
          <button onClick={() => setSession({ ...session, revealed: true })}
            style={{ marginTop: 16, width: "100%", padding: "12px", background: C.ink, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            {t(RL.show)}
          </button>
        ) : (
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {gLabels.map(({ g, l, col }) => (
              <button key={g} onClick={() => grade(g)}
                style={{ padding: "12px 4px", background: "#fff", color: col, border: `1.5px solid ${col}`, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {t(l)}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---- Session finished ----
  if (session && session.finished) {
    return (
      <div style={{ fontFamily: sans, color: C.txt, maxWidth: 620, margin: "0 auto", textAlign: "center", padding: "32px 0" }}>
        <div style={{ fontSize: 44 }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.ink, marginTop: 8 }}>{t(RL.finish)}</div>
        <div style={{ color: C.sub, marginTop: 6 }}>{session.done} {t(RL.reviewed)}</div>
        <button onClick={() => setSession(null)}
          style={{ marginTop: 22, padding: "10px 24px", background: C.blue, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          OK
        </button>
      </div>
    );
  }

  // ---- Dashboard view ----
  const Stat = ({ label, value, col }) => (
    <div style={{ ...box(), textAlign: "center", flex: 1 }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: col || C.ink, fontFamily: serif }}>{value}</div>
      <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ fontFamily: sans, color: C.txt, maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ fontFamily: serif, fontSize: 22, color: C.ink, margin: "0 0 6px" }}>{t(RL.title)}</h2>
      <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.65, margin: "0 0 18px" }}>{t(RL.intro)}</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Stat label={t(RL.due)} value={due.length} col={due.length ? C.crimson : C.green} />
        <Stat label={t(RL.soon)} value={soon} col={C.amber} />
        <Stat label={t(RL.learned)} value={Object.keys(cards).length} col={C.blue} />
        <Stat label={t(RL.avgRet)} value={avgRet == null ? "—" : Math.round(avgRet * 100) + "%"} col={C.teal} />
        <Stat label={lang === "ja" ? "連続学習" : "Streak"} value={streak + (lang === "ja" ? "日" : "d")} col={C.violet} />
      </div>

      {flash && <div style={{ padding: "10px 14px", background: "#ECFDF3", color: "#05603A", borderRadius: 9, fontSize: 13, marginBottom: 12 }}>{flash}</div>}

      {pool.length === 0 && (
        <div style={{ ...box("#FFFBEB", "#FDE68A"), fontSize: 13, color: "#92400E", marginBottom: 14 }}>{t(RL.noPool)}</div>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 26 }}>
        <button onClick={() => startSession()} disabled={!due.length}
          style={{ flex: "1 1 200px", padding: "13px", background: due.length ? C.ink : C.line, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: due.length ? "pointer" : "default" }}>
          {t(RL.start)}{due.length ? ` (${due.length})` : ""}
        </button>
        <button onClick={seedWeak} disabled={!pool.length}
          style={{ flex: "1 1 200px", padding: "13px", background: "#fff", color: C.blue, border: `1.5px solid ${C.blue}`, borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: pool.length ? "pointer" : "default" }}>
          {t(RL.seed)}
        </button>
      </div>

      {!due.length && Object.keys(cards).length > 0 && (
        <div style={{ ...box("#ECFDF3", "#A6F4C5"), fontSize: 14, color: "#05603A", marginBottom: 24 }}>{t(RL.none)}</div>
      )}

      <div style={{ ...box(), marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{lang === "ja" ? "保持率ヒートマップ" : "Retention heatmap"}</div>
        <RetentionHeatmap cards={cards} poolById={poolById} lang={lang} />
      </div>
      <div style={{ ...box(), marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{lang === "ja" ? "分野別 復習優先度" : "Review priority by domain"}</div>
        <DomainPriority cards={cards} poolById={poolById} lang={lang} onReview={(d) => startSession(d)} />
      </div>
      <div style={{ ...box(), marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{lang === "ja" ? "保持率トレンド" : "Retention trend"}</div>
        <RetentionTrend history={history} lang={lang} />
      </div>
      {/* 図解 */}
      <div style={{ ...box(), marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8 }}>{t(RL.curveTitle)}</div>
        <ForgettingCurveDiagram lang={lang} />
      </div>
      <div style={{ ...box(), marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 8 }}>{t(RL.ladderTitle)}</div>
        <SpacedRepetitionSchedule lang={lang} />
      </div>

      <button onClick={resetSchedule}
        style={{ marginTop: 6, padding: "8px 16px", background: "transparent", color: C.sub, border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12.5, cursor: "pointer" }}>
        {t(RL.reset)}
      </button>
    </div>
  );
}

function ConsultingThinkingHub() {
  const [lang, setLang] = useState(() => (typeof window !== "undefined" && window.__novaLang) || "ja"); // ポータルの言語設定で開く
  const [tab, _setTab] = useState("basics");
  const [resetKey, setResetKey] = useState(0); // 「↑トップへ」で現在タブを再マウント→トップへ
  // 1つ前の画面に戻る（閲覧履歴。setTab 経由のタブ遷移を自動記録）
  const [tabHist, setTabHist] = useState([]);
  const setTab = (k) => { if (k !== tab) setTabHist((h) => [...h, tab]); _setTab(k); };
  // 開いているタブを URL に残す（#consulting/<タブ>）
  useNovaHubRoute("consulting", [tab === "basics" ? "" : tab], (p) => { const ok = ["basics", "cases", "confuse", "daily", "diagrams", "glossary", "grand", "mock", "progress", "quiz", "srs"]; _setTab(p[0] && ok.includes(p[0]) ? p[0] : "basics"); });
  // アクティブな子コンポーネントの深い操作履歴（無ければタブ履歴を戻る）
  const hubBack = useHubBack();
  const goBackTab = () => {
    if (hubBack.ctx.goBack()) { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (!tabHist.length) return;
    const prev = tabHist[tabHist.length - 1]; setTabHist(tabHist.slice(0, -1)); _setTab(prev);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [stats, setStats] = useState({});
  // 模試の採点のように続けて記録するとき、古い stats から組み立て直して前の解答を消さないよう最新値を持つ
  const statsRef = useRef({});
  const [srCards, setSrCards] = useState({});
  useEffect(() => { (async () => { try { const r = await window.storage.get(SR_KEY); setSrCards(r && r.value ? JSON.parse(r.value) : {}); } catch (e) { /* ignore */ } })(); }, [tab]);
  const srDue = useMemo(() => dueCards(srCards, Date.now()).length, [srCards]);
  const [loaded, setLoaded] = useState(false);
  const t = (obj) => obj[lang];
  const tt = (j, e) => (lang === "ja" ? j : e);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) { const v = JSON.parse(r.value); statsRef.current = v; setStats(v); }
      } catch (e) { /* first run */ }
      setLoaded(true);
    })();
  }, []);

  const persist = async (next) => {
    statsRef.current = next;
    setStats(next);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(next)); } catch (e) { /* ignore */ }
    // ポータルの弱点レーダー用に、応用クイズの分野別の解答数・正答数を別キーに残す
    const dom = {};
    Object.keys(next).forEach((k) => {
      const q = /^\d+$/.test(k) ? Q[+k] : null;
      if (!q || !next[k]) return;
      const d = dom[q.d] || (dom[q.d] = { a: 0, c: 0 });
      d.a += 1;
      if (next[k].ok) d.c += 1;
    });
    try { await window.storage.set("consulting_dom_stats_v1", JSON.stringify(dom)); } catch (e) { /* ignore */ }
  };
  const recordAnswer = (qid, ok) => {
    const next = { ...statsRef.current, [qid]: { ok, t: Date.now() } };
    persist(next);
  };
  const resetAll = async () => {
    persist({});
  };
  const importAll = (obj) => {
    persist({ ...statsRef.current, ...obj });
  };

  const tabDefs = [
    ["basics", L.tabs.basics], ["quiz", L.tabs.quiz], ["daily", L.daily], ["mock", L.tabs.mock], ["grand", L.tabs.grand], ["cases", L.tabs.cases],
    ["diagrams", L.tabs.diagrams], ["confuse", L.tabs.confuse],
    ["glossary", L.tabs.glossary], ["atlas", L.tabs.atlas], ["srs", L.tabs.srs], ["progress", L.tabs.progress],
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.paper, fontFamily: sans, color: C.txt }}>
      {/* 1つ前の操作画面に戻る（子の深い操作履歴 or タブ履歴がある時に表示。bottom:104） */}
      {(tabHist.length > 0 || hubBack.anyChildCanBack) && (
        <button onClick={goBackTab} aria-label="Back"
          style={{ position: "fixed", right: 16, bottom: 104, zIndex: 45, border: "1.5px solid #1a3a5c", cursor: "pointer", borderRadius: 22, padding: "9px 15px", background: "#fff", color: "#1a3a5c", fontSize: 12.5, fontWeight: 700, boxShadow: "0 4px 14px rgba(0,0,0,.20)" }}>
          {lang === "en" ? "← Back" : "← 戻る"}
        </button>
      )}
      {/* トップへ: 現在タブをトップ画面へリセットし、ページ先頭へスクロール。bottom:60 */}
      <button
        onClick={() => { setResetKey((k) => k + 1); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); }}
        aria-label="Back to top"
        style={{ position: "fixed", right: 16, bottom: 60, zIndex: 45, border: "none", cursor: "pointer", borderRadius: 22, padding: "10px 15px", background: "#1a3a5c", color: "#fff", fontSize: 12.5, fontWeight: 700, boxShadow: "0 4px 14px rgba(0,0,0,.28)" }}>
        {lang === "en" ? "↑ Top" : "↑ トップへ"}
      </button>
      {/* Header */}
      <header style={{ background: C.ink, padding: "22px 20px 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
                <polygon points="22,4 40,38 4,38" fill="none" stroke={C.gold} strokeWidth="2.5" />
                <line x1="13" y1="26" x2="31" y2="26" stroke={C.gold} strokeWidth="1.5" />
                <circle cx="22" cy="15" r="2.6" fill={C.gold} />
              </svg>
              <div>
                <h1 style={{ margin: 0, fontFamily: serif, fontSize: 24, color: "#fff", letterSpacing: 0.5 }}>{t(L.title)}</h1>
                <p style={{ margin: "3px 0 0", color: "#93A5C4", fontSize: 12.5 }}>{t(L.subtitle)} — Logical · Critical · Lateral · Creative · Structuring</p>
              </div>
            </div>
            <button onClick={() => setLang(lang === "ja" ? "en" : "ja")}
              style={{ background: "transparent", color: C.gold, border: `1.5px solid ${C.gold}`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {lang === "ja" ? "EN" : "日本語"}
            </button>
          </div>
          <nav style={{ display: "flex", gap: 2, marginTop: 18, overflowX: "auto" }}>
            {tabDefs.map(([id, lbl]) => (
              <button key={id} onClick={() => setTab(id)}
                style={{
                  background: tab === id ? C.paper : "transparent", color: tab === id ? C.ink : "#93A5C4",
                  border: "none", borderRadius: "8px 8px 0 0", padding: "10px 16px", fontSize: 13.5,
                  fontWeight: tab === id ? 800 : 500, cursor: "pointer", whiteSpace: "nowrap",
                }}>
                {t(lbl)}{id === "srs" && srDue > 0 ? (
                  <span style={{ marginLeft: 6, background: C.crimson, color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 800 }}>{srDue}</span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <HubBackCtx.Provider value={hubBack.ctx}>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 60px" }}>
        {!loaded ? null : (
          <div key={resetKey} style={{ display: "contents" }}>
            {tab === "quiz" && <QuizTab lang={lang} stats={stats} recordAnswer={recordAnswer} tt={tt} t={t} />}
            {tab === "basics" && <BasicsTab lang={lang} stats={stats} recordAnswer={recordAnswer} tt={tt} t={t} />}
            {tab === "daily" && <DailyTab lang={lang} stats={stats} recordAnswer={recordAnswer} tt={tt} t={t} srDue={srDue} onGoReview={() => setTab("srs")} />}
            {tab === "mock" && <MockTab lang={lang} recordAnswer={recordAnswer} tt={tt} t={t} />}
            {tab === "grand" && <GrandMockTab lang={lang} stats={stats} recordAnswer={recordAnswer} tt={tt} t={t} />}
            {tab === "cases" && <CasesTab lang={lang} tt={tt} t={t} />}
            {tab === "diagrams" && <DiagramsTab lang={lang} tt={tt} />}
            {tab === "confuse" && <ConfuseTab lang={lang} tt={tt} />}
            {tab === "glossary" && <GlossaryTab lang={lang} tt={tt} t={t} />}
            {tab === "atlas" && <AtlasTab lang={lang} tt={tt} />}
            {tab === "srs" && <ReviewTab lang={lang} pool={Q.map((q, i) => ({ ...q, id: i }))} stats={stats} />}
            {tab === "progress" && <ProgressTab lang={lang} stats={stats} resetAll={resetAll} importAll={importAll} tt={tt} t={t} />}
          </div>
        )}
      </main>
      </HubBackCtx.Provider>
    </div>
  );
}

// ---------- Shared bits ----------
function DomainChip({ dom, active, onClick, lang, count, on, onToggle }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 18,
      border: `1.5px solid ${on ? "#16A34A" : (active ? dom.color : C.line)}`, background: active ? dom.color : "#fff",
      color: active ? "#fff" : C.txt, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
    }}>
      {onToggle ? <DoneCheck on={on} onToggle={onToggle} en={lang === "en"} /> : null}
      <span>{dom.mark}</span>{lang === "ja" ? dom.ja : dom.en}{count != null ? ` (${count})` : ""}
    </button>
  );
}
function Card({ children, style }) {
  return <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 20, ...style }}>{children}</div>;
}

// ---------- Review toggle (shared) ----------
function ReviewToggle({ review, setReview, t }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <button onClick={() => setReview(!review)} style={{
        display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 18,
        border: `1.8px solid ${C.crimson}`, background: review ? C.crimson : "#fff",
        color: review ? "#fff" : C.crimson, fontSize: 12.5, fontWeight: 800, cursor: "pointer",
      }}>
        ✗ {t(L.review)} {review ? "ON" : "OFF"}
      </button>
    </div>
  );
}

// ---------- Quiz Tab ----------
function QuizTab({ lang, stats, recordAnswer, tt, t }) {
  const [domain, setDomain] = useState(-1);
  const [lvl, setLvl] = useState(0);
  const [review, setReview] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const __opBack = useLocalHistory([[domain, setDomain], [review, setReview], [idx, setIdx], [checked, setChecked]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const domDone = useDoneSet("consulting_domain_done_v1");

  const pool = useMemo(
    () => Q.map((q, i) => ({ ...q, id: i })).filter((q) =>
      (domain === -1 || q.d === domain) && (lvl === 0 || q.lv === lvl) && (!review || (stats[q.id] && !stats[q.id].ok))
    ),
    [domain, review, lvl]
  );
  useEffect(() => { setIdx(0); setPicked(null); setChecked(false); }, [domain, review, lvl]);

  const controls = (
    <>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          <DomainChip dom={{ color: C.ink, mark: "◎", ja: t(L.allDomains), en: t(L.allDomains) }} active={domain === -1} onClick={() => setDomain(-1)} lang={lang} count={Q.length} />
          {DOMAINS.map((d) => (
            <DomainChip key={d.id} dom={d} active={domain === d.id} onClick={() => setDomain(d.id)} lang={lang} count={Q.filter((x) => x.d === d.id).length}
              on={domDone.has(d.id)} onToggle={(e) => domDone.toggle(d.id, e)} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, color: C.sub, fontWeight: 700 }}>{lang === "ja" ? "難易度" : "Level"}</span>
          {[[0, lang === "ja" ? "すべて" : "All"], [1, "★ 基礎"], [2, "★★ 標準"], [3, "★★★ 難問"], [4, "★★★★ エキスパート"]].map(([lv, lb]) => (
            <button key={lv} onClick={() => setLvl(lv)} style={{ fontFamily: "inherit", cursor: "pointer", fontSize: 11.5, padding: "5px 12px", borderRadius: 999, border: `1px solid ${lvl === lv ? C.ink : C.line}`, background: lvl === lv ? C.ink : "#fff", color: lvl === lv ? "#fff" : C.sub, fontWeight: lvl === lv ? 700 : 500 }}>{lb}{lv > 0 ? ` (${Q.filter((x) => x.lv === lv).length})` : ""}</button>
          ))}
        </div>
    </>
  );
  if (pool.length === 0) return (
    <div>
      <ReviewToggle review={review} setReview={setReview} t={t} />
      {controls}
      <Card style={{ textAlign: "center", padding: 32, color: C.sub }}>
        {review ? t(L.noWrong) : lang === "ja" ? "この分野・難易度の問題はありません。難易度を「すべて」にしてください。" : "No questions match this domain and level. Set the level to All."}
      </Card>
    </div>
  );
  const q = pool[idx % pool.length];
  const perm = seededPerm(q.id + 7, 4);
  const dom = DOMAINS[q.d];

  const pick = (pos) => {
    if (checked) return;
    setPicked(pos);
    const ok = perm[pos] === q.a;
    recordAnswer(q.id, ok);
    setChecked(true);
  };
  const next = () => { setIdx((idx + 1) % pool.length); setPicked(null); setChecked(false); };
  const prev = () => { setIdx((idx - 1 + pool.length) % pool.length); setPicked(null); setChecked(false); };

  return (
    <div>
      <ReviewToggle review={review} setReview={setReview} t={t} />
      {controls}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ color: dom.color, fontSize: 12, fontWeight: 800 }}>{dom.mark} {lang === "ja" ? dom.ja : dom.en}</span>
          <span style={{ color: C.sub, fontSize: 12 }}>{t(L.q)} {idx % pool.length + 1} / {pool.length}{stats[q.id] ? (stats[q.id].ok ? " · ✓" : " · ✗") : ""}</span>
        </div>
        <h2 style={{ fontFamily: serif, fontSize: 18, margin: "0 0 18px", lineHeight: 1.55 }}>{tt(q.j, q.e)}</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {perm.map((oi, pos) => {
            const isPicked = picked === pos;
            const isAns = oi === q.a;
            let border = C.line, bg = "#fff";
            if (checked && isAns) { border = C.green; bg = "#EBFAF1"; }
            else if (checked && isPicked && !isAns) { border = C.red; bg = "#FEECEB"; }
            else if (isPicked) { border = dom.color; bg = "#F4F7FF"; }
            return (
              <button key={pos} onClick={() => pick(pos)} style={{
                textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.8px solid ${border}`,
                background: bg, fontSize: 14, cursor: checked ? "default" : "pointer", color: C.txt, lineHeight: 1.5,
              }}>
                <b style={{ color: C.sub, marginRight: 8 }}>{String.fromCharCode(65 + pos)}</b>
                {lang === "ja" ? q.o[oi][0] : q.o[oi][1]}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={prev} style={{ background: "#fff", color: C.ink, border: `1.5px solid ${C.line}`, borderRadius: 8, padding: "10px 30px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>← {t(L.prev)}</button>
          {checked && (
            <span style={{ fontWeight: 800, color: perm[picked] === q.a ? C.green : C.red }}>
              {perm[picked] === q.a ? t(L.correct) : t(L.wrong)}
            </span>
          )}
          <span style={{ flex: 1 }} />
          <button onClick={next} style={{ background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "10px 30px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{t(L.next)} →</button>
        </div>
        {checked && (
          <div style={{ marginTop: 16, background: C.paper, borderLeft: `4px solid ${dom.color}`, borderRadius: 8, padding: "13px 16px" }}>
            <b style={{ fontSize: 12, color: dom.color }}>{t(L.explanation)}</b>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.7 }}>{tt(q.x[0], q.x[1])}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

// ---------- Basics Tab (定義暗記: auto-generated from GLOSSARY) ----------
function BasicsTab({ lang, stats, recordAnswer, tt, t }) {
  const [domain, setDomain] = useState(-1);
  const [review, setReview] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const __opBack = useLocalHistory([[domain, setDomain], [review, setReview], [idx, setIdx], [checked, setChecked]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const domDone = useDoneSet("consulting_domain_done_v1");

  const pool = useMemo(
    () => GLOSSARY.map((g, i) => ({ ...g, gi: i })).filter((g) =>
      (domain === -1 || g.d === domain) && (!review || (stats["g" + g.gi] && !stats["g" + g.gi].ok))
    ),
    [domain, review]
  );
  useEffect(() => { setIdx(0); setPicked(null); setChecked(false); }, [domain, review]);

  if (pool.length === 0) return (
    <div>
      <ReviewToggle review={review} setReview={setReview} t={t} />
      <Card style={{ textAlign: "center", padding: 32, color: C.sub }}>{t(L.noWrong)}</Card>
    </div>
  );
  const g = pool[idx % pool.length];
  const dom = DOMAINS[g.d];

  // Distractors: prefer same-domain definitions (harder), fill from others
  const sameD = GLOSSARY.map((x, i) => i).filter((i) => i !== g.gi && GLOSSARY[i].d === g.d);
  const rest = GLOSSARY.map((x, i) => i).filter((i) => i !== g.gi && GLOSSARY[i].d !== g.d);
  const ordered = seededPerm(g.gi + 31, sameD.length).map((k) => sameD[k])
    .concat(seededPerm(g.gi + 17, rest.length).map((k) => rest[k]));
  const opts = [g.gi, ...ordered.slice(0, 3)];
  const perm = seededPerm(g.gi + 5, 4);
  const key = "g" + g.gi;

  const pick = (pos) => {
    if (checked) return;
    setPicked(pos);
    recordAnswer(key, opts[perm[pos]] === g.gi);
    setChecked(true);
  };
  const move = (dir) => { setIdx((idx + dir + pool.length) % pool.length); setPicked(null); setChecked(false); };
  const isCorrect = checked && picked != null && opts[perm[picked]] === g.gi;

  return (
    <div>
      <ReviewToggle review={review} setReview={setReview} t={t} />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        <DomainChip dom={{ color: C.ink, mark: "◎", ja: t(L.allDomains), en: t(L.allDomains) }} active={domain === -1} onClick={() => setDomain(-1)} lang={lang} count={GLOSSARY_N} />
        {DOMAINS.map((d) => (
          <DomainChip key={d.id} dom={d} active={domain === d.id} onClick={() => setDomain(d.id)} lang={lang} count={GLOSSARY.filter((x) => x.d === d.id).length}
            on={domDone.has(d.id)} onToggle={(e) => domDone.toggle(d.id, e)} />
        ))}
      </div>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ color: dom.color, fontSize: 12, fontWeight: 800 }}>{dom.mark} {lang === "ja" ? dom.ja : dom.en}</span>
          <span style={{ color: C.sub, fontSize: 12 }}>{t(L.q)} {idx % pool.length + 1} / {pool.length}{stats[key] ? (stats[key].ok ? " · ✓" : " · ✗") : ""}</span>
        </div>
        <h2 style={{ fontFamily: serif, fontSize: 18, margin: "0 0 18px", lineHeight: 1.55 }}>
          {lang === "ja" ? `「${g.t}」${L.basicsQ.ja}` : `Which is the correct definition of "${g.e}"?`}
        </h2>
        <div style={{ display: "grid", gap: 10 }}>
          {perm.map((oi, pos) => {
            const entry = GLOSSARY[opts[oi]];
            const isPicked = picked === pos;
            const isAns = opts[oi] === g.gi;
            let border = C.line, bg = "#fff";
            if (checked && isAns) { border = C.green; bg = "#EBFAF1"; }
            else if (checked && isPicked && !isAns) { border = C.red; bg = "#FEECEB"; }
            else if (isPicked) { border = dom.color; bg = "#F4F7FF"; }
            return (
              <button key={pos} onClick={() => pick(pos)} style={{
                textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.8px solid ${border}`,
                background: bg, fontSize: 14, cursor: checked ? "default" : "pointer", color: C.txt, lineHeight: 1.5,
              }}>
                <b style={{ color: C.sub, marginRight: 8 }}>{String.fromCharCode(65 + pos)}</b>
                {lang === "ja" ? entry.dj : entry.de}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => move(-1)} style={{ background: "#fff", color: C.ink, border: `1.5px solid ${C.line}`, borderRadius: 8, padding: "10px 30px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>← {t(L.prev)}</button>
          {checked && (
            <span style={{ fontWeight: 800, color: isCorrect ? C.green : C.red }}>{isCorrect ? t(L.correct) : t(L.wrong)}</span>
          )}
          <span style={{ flex: 1 }} />
          <button onClick={() => move(1)} style={{ background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "10px 30px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{t(L.next)} →</button>
        </div>
        {checked && (
          <div style={{ marginTop: 16, background: C.paper, borderLeft: `4px solid ${dom.color}`, borderRadius: 8, padding: "13px 16px" }}>
            <b style={{ fontSize: 12, color: dom.color }}>{lang === "ja" ? g.t : g.e} <span style={{ color: C.sub, fontWeight: 500 }}>({lang === "ja" ? g.e : g.t})</span></b>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.7 }}>{tt(g.dj, g.de)}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

// ---------- Daily 10 Tab (date-seeded fixed set) ----------
function DailyTab({ lang, stats, recordAnswer, tt, t, srDue, onGoReview }) {
  const now = new Date();
  const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const dateLabel = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
  const ids = useMemo(() => seededPerm(dateSeed % 99991, Q.length).slice(0, 10), [dateSeed]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const __opBack = useLocalHistory([[idx, setIdx], [checked, setChecked]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const [session, setSession] = useState([]);

  const done = idx >= ids.length;
  if (done) {
    const ok = session.filter(Boolean).length;
    return (
      <Card style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 12.5, color: C.sub, fontWeight: 700 }}>{dateLabel}</div>
        <div style={{ fontFamily: serif, fontSize: 40, fontWeight: 700, margin: "10px 0", color: ok === 10 ? C.green : ok >= 6 ? C.amber : C.red }}>{ok} / 10</div>
        <p style={{ color: C.sub, fontSize: 14 }}>{t(L.dailyDone)}</p>
        <button onClick={() => { setIdx(0); setPicked(null); setChecked(false); setSession([]); }} style={{ marginTop: 8, background: "#fff", color: C.ink, border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>{t(L.retry)}</button>
      </Card>
    );
  }

  const qid = ids[idx];
  const q = Q[qid];
  const dom = DOMAINS[q.d];
  const perm = seededPerm(qid + 7, 4);
  const pick = (pos) => {
    if (checked) return;
    setPicked(pos);
    const ok = perm[pos] === q.a;
    recordAnswer(qid, ok);
    setSession([...session, ok]);
    setChecked(true);
  };
  const next = () => { setIdx(idx + 1); setPicked(null); setChecked(false); };
  const isCorrect = checked && picked != null && perm[picked] === q.a;

  return (
    <div>
      {srDue > 0 && (
        <div onClick={onGoReview} style={{ cursor: "pointer", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <span style={{ fontSize: 13.5, color: "#9A3412", fontWeight: 600 }}>{lang === "ja" ? ("今日の復習が " + srDue + " 件あります") : (srDue + " items are due for review today")}</span>
          <span style={{ fontSize: 12.5, color: "#C2410C", fontWeight: 800, whiteSpace: "nowrap" }}>{lang === "ja" ? "間隔反復へ →" : "Go to review →"}</span>
        </div>
      )}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: C.gold }}>◆ {t(L.daily)} · {dateLabel}</span>
          <span style={{ color: C.sub, fontSize: 12 }}>{idx + 1} / 10 · ✓{session.filter(Boolean).length}</span>
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
          {ids.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < session.length ? (session[i] ? C.green : C.red) : i === idx ? C.gold : C.line }} />
          ))}
        </div>
        <span style={{ color: dom.color, fontSize: 12, fontWeight: 800 }}>{dom.mark} {lang === "ja" ? dom.ja : dom.en}</span>
        <h2 style={{ fontFamily: serif, fontSize: 17.5, margin: "8px 0 16px", lineHeight: 1.6 }}>{tt(q.j, q.e)}</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {perm.map((oi, pos) => {
            const isPicked = picked === pos;
            const isAns = oi === q.a;
            let border = C.line, bg = "#fff";
            if (checked && isAns) { border = C.green; bg = "#EBFAF1"; }
            else if (checked && isPicked && !isAns) { border = C.red; bg = "#FEECEB"; }
            else if (isPicked) { border = dom.color; bg = "#F4F7FF"; }
            return (
              <button key={pos} onClick={() => pick(pos)} style={{
                textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.8px solid ${border}`,
                background: bg, fontSize: 13.5, cursor: checked ? "default" : "pointer", color: C.txt, lineHeight: 1.55,
              }}>
                <b style={{ color: C.sub, marginRight: 8 }}>{String.fromCharCode(65 + pos)}</b>
                {lang === "ja" ? q.o[oi][0] : q.o[oi][1]}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center" }}>
          {checked && <span style={{ fontWeight: 800, color: isCorrect ? C.green : C.red }}>{isCorrect ? t(L.correct) : t(L.wrong)}</span>}
          <span style={{ flex: 1 }} />
          <button onClick={next} disabled={!checked} style={{ background: checked ? C.blue : C.line, color: "#fff", border: "none", borderRadius: 8, padding: "10px 30px", fontSize: 14, fontWeight: 700, cursor: checked ? "pointer" : "default" }}>{t(L.next)} →</button>
        </div>
        {checked && (
          <div style={{ marginTop: 16, background: C.paper, borderLeft: `4px solid ${dom.color}`, borderRadius: 8, padding: "13px 16px" }}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7 }}>{tt(q.x[0], q.x[1])}</p>
          </div>
        )}
      </Card>
      <p style={{ color: C.sub, fontSize: 12, textAlign: "center", marginTop: 12 }}>{t(L.dailyDesc)}</p>
    </div>
  );
}

// ---------- Mock Tab ----------
function GrandMockTab({ lang, stats, recordAnswer, tt, t }) {
  const tg = (ja, en) => (lang === "ja" ? ja : en);
  const [srCards, setSrCards] = useState({});
  const [count, setCount] = useState(40);
  const [set_, setSet] = useState(null);
  const [answers, setAnswers] = useState({});
  const [graded, setGraded] = useState(false);
  const __opBack = useLocalHistory([[set_, setSet], [graded, setGraded]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  useEffect(() => { let a = true; (async () => { const c = await loadCards(); if (a) setSrCards(c); })(); return () => { a = false; }; }, []);

  const weightOf = (i) => {
    let w;
    const s = stats[i];
    if (s) w = s.ok ? 0.4 : 3.0; else w = 1.5;      // missed-heavy, unseen moderate, correct light
    const c = srCards[i];
    if (c) w += (1 - retention(c, Date.now())) * 2.5; // low retention -> higher priority
    return w;
  };
  const start = () => {
    const per = Math.ceil(count / DOMAINS.length);
    let ids = [];
    DOMAINS.forEach((dm) => {
      const pool = Q.map((q, i) => i).filter((i) => Q[i].d === dm.id);
      const scored = pool.map((i) => ({ i, k: weightOf(i) * (0.5 + Math.random()) }));
      scored.sort((a, b) => b.k - a.k);
      ids = ids.concat(scored.slice(0, per).map((x) => x.i));
    });
    ids = ids.map((v) => ({ v, r: Math.random() })).sort((a, b) => a.r - b.r).map((x) => x.v).slice(0, count);
    setSet(ids); setAnswers({}); setGraded(false);
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  };

  if (!set_) {
    const tracked = Object.keys(srCards).length;
    const wrongCount = Object.keys(stats).filter((k) => stats[k] && !stats[k].ok).length;
    return (
      <Card style={{ textAlign: "center", padding: 40 }}>
        <h2 style={{ fontFamily: serif, fontSize: 20, marginTop: 0 }}>{tg("\u7dcf\u5408\u6a21\u8a66\uff08\u5f31\u70b9\u96c6\u4e2d\uff09", "Grand Mock (weakness-focused)")}</h2>
        <p style={{ color: C.sub, fontSize: 13.5, lineHeight: 1.7, maxWidth: 520, margin: "8px auto 0" }}>{tg("\u5168\u554f\u304b\u30895\u5206\u91ce\u3092\u6a2a\u65ad\u3057\u3001\u8aa4\u7b54\u30fb\u5fd8\u5374\u304c\u9032\u3093\u3060\u554f\u984c\u3092\u91cd\u70b9\u7684\u306b\u51fa\u984c\u3057\u307e\u3059\u3002", "Draws across all five domains from the full bank, weighting toward missed and fading items.")}</p>
        <div style={{ fontSize: 12, color: C.sub, margin: "14px 0 18px" }}>{tg("\u8aa4\u7b54", "Missed")} {wrongCount} \u00b7 {tg("\u9593\u9694\u53cd\u5fa9\u767b\u9332", "Tracked")} {tracked}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
          {[20, 40, 60].map((n) => (
            <button key={n} onClick={() => setCount(n)} style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "1.5px solid " + (count === n ? C.ink : C.line), background: count === n ? C.ink : "#fff", color: count === n ? "#fff" : C.txt }}>{n}{tg("\u554f", "")}</button>
          ))}
        </div>
        <button onClick={start} style={{ background: C.ink, color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{tg("\u6a21\u8a66\u3092\u958b\u59cb", "Start mock")}</button>
      </Card>
    );
  }

  const grade = () => {
    set_.forEach((qid) => { const perm = seededPerm(qid + 7, 4), p = answers[qid]; if (p != null) recordAnswer(qid, perm[p] === Q[qid].a); });
    setGraded(true);
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  };
  const isC = (qid) => { const p = answers[qid]; return p != null && seededPerm(qid + 7, 4)[p] === Q[qid].a; };
  const score = set_.filter(isC).length;
  const perDom = DOMAINS.map((dm) => {
    const ids = set_.filter((qid) => Q[qid].d === dm.id);
    return { dm, ok: ids.filter(isC).length, total: ids.length };
  });

  return (
    <div>
      {graded && (
        <Card style={{ marginBottom: 18, textAlign: "center", borderTop: "4px solid " + (score / set_.length >= 0.8 ? C.green : score / set_.length >= 0.6 ? C.amber : C.crimson) }}>
          <div style={{ fontFamily: serif, fontSize: 34, fontWeight: 700 }}>{score} / {set_.length}</div>
          <div style={{ color: C.sub, fontSize: 13 }}>{Math.round(score / set_.length * 100)}%</div>
          <div style={{ marginTop: 14, display: "grid", gap: 6, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
            {perDom.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 96, textAlign: "right", fontSize: 11.5, color: C.sub }}>{lang === "ja" ? r.dm.ja : r.dm.en}</span>
                <div style={{ flex: 1, height: 8, background: C.line, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: (r.total ? (r.ok / r.total * 100) : 0) + "%", height: "100%", background: r.dm.color }} />
                </div>
                <span style={{ width: 42, fontSize: 11.5, color: C.txt }}>{r.ok}/{r.total}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setSet(null)} style={{ marginTop: 16, background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "9px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{tg("\u3082\u3046\u4e00\u5ea6", "Again")}</button>
        </Card>
      )}
      {!graded && (
        <div style={{ position: "sticky", top: 0, zIndex: 5, background: C.paper, padding: "10px 0", marginBottom: 8 }}>
          <button onClick={grade} style={{ width: "100%", background: C.ink, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{tg("\u63a1\u70b9\u3059\u308b", "Grade")} ({Object.keys(answers).length}/{set_.length})</button>
        </div>
      )}
      {set_.map((qid, n) => {
        const q = Q[qid], perm = seededPerm(qid + 7, 4), dom = DOMAINS[q.d], p = answers[qid];
        return (
          <Card key={qid} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11.5, color: dom.color, fontWeight: 800, marginBottom: 8 }}>Q{n + 1} \u00b7 {lang === "ja" ? dom.ja : dom.en}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, lineHeight: 1.55, display: "flex", alignItems: "flex-start", gap: 6 }}><span style={{ flex: 1 }}>{lang === "ja" ? q.j : q.e}</span><StarButton id={"q#" + novaQHash(q.j || q.e || "")} text={q.j || q.e} scope={"Consulting"} /></div>
            <div style={{ display: "grid", gap: 8 }}>
              {perm.map((oi, pos) => {
                const picked = p === pos, ans = oi === q.a;
                let border = C.line, bg = "#fff";
                if (graded && ans) { border = C.green; bg = "#EBFAF1"; }
                else if (graded && picked && !ans) { border = C.red; bg = "#FEECEB"; }
                else if (picked) { border = dom.color; bg = "#F4F7FF"; }
                return (
                  <button key={pos} onClick={() => !graded && setAnswers({ ...answers, [qid]: pos })} style={{ textAlign: "left", padding: "11px 14px", borderRadius: 9, border: "1.6px solid " + border, background: bg, fontSize: 13.5, cursor: graded ? "default" : "pointer", color: C.txt }}>
                    <b style={{ color: C.sub, marginRight: 8 }}>{String.fromCharCode(65 + pos)}</b>{lang === "ja" ? q.o[oi][0] : q.o[oi][1]}
                  </button>
                );
              })}
            </div>
            {graded && <div style={{ marginTop: 12, background: C.paper, borderLeft: "4px solid " + dom.color, padding: "10px 14px", borderRadius: 6 }}><p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>{lang === "ja" ? q.x[0] : q.x[1]}</p></div>}
          </Card>
        );
      })}
    </div>
  );
}

function MockTab({ lang, recordAnswer, tt, t }) {
  const [set_, setSet] = useState(null);
  const [answers, setAnswers] = useState({});
  const [graded, setGraded] = useState(false);
  const __opBack = useLocalHistory([[set_, setSet], [graded, setGraded]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const [mockDom, setMockDom] = useState(-1);
  const domDone = useDoneSet("consulting_domain_done_v1");

  const start = () => {
    const base = Q.map((q, i) => i).filter((i) => mockDom === -1 || Q[i].d === mockDom);
    const perm = seededPerm(Date.now() % 100000, base.length);
    const ids = perm.slice(0, Math.min(25, base.length)).map((k) => base[k]);
    setSet(ids); setAnswers({}); setGraded(false);
  };
  if (!set_) {
    return (
      <Card style={{ textAlign: "center", padding: 40 }}>
        <h2 style={{ fontFamily: serif, fontSize: 20, marginTop: 0 }}>{t(L.tabs.mock)}</h2>
        <p style={{ color: C.sub, fontSize: 14 }}>{t(L.mockDesc)}</p>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: C.sub, margin: "18px 0 10px" }}>{t(L.mockDomain)}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 22 }}>
          <DomainChip dom={{ color: C.ink, mark: "◎", ja: t(L.allDomains), en: t(L.allDomains) }} active={mockDom === -1} onClick={() => setMockDom(-1)} lang={lang} />
          {DOMAINS.map((d) => (
            <DomainChip key={d.id} dom={d} active={mockDom === d.id} onClick={() => setMockDom(d.id)} lang={lang}
              on={domDone.has(d.id)} onToggle={(e) => domDone.toggle(d.id, e)} />
          ))}
        </div>
        <button onClick={start} style={{ background: C.ink, color: "#fff", border: "none", borderRadius: 8, padding: "12px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t(L.startMock)}</button>
      </Card>
    );
  }
  const grade = () => {
    set_.forEach((qid) => {
      const q = Q[qid], perm = seededPerm(qid + 7, 4), p = answers[qid];
      if (p != null) recordAnswer(qid, perm[p] === q.a);
    });
    setGraded(true);
  };
  const score = set_.filter((qid) => {
    const p = answers[qid]; if (p == null) return false;
    return seededPerm(qid + 7, 4)[p] === Q[qid].a;
  }).length;

  return (
    <div>
      {graded && (
        <Card style={{ marginBottom: 18, textAlign: "center", borderTop: `4px solid ${score >= 20 ? C.green : score >= 13 ? C.amber : C.red}` }}>
          <div style={{ fontFamily: serif, fontSize: 34, fontWeight: 700 }}>{score} / 25</div>
          <div style={{ color: C.sub, fontSize: 13 }}>{t(L.score)} · {Math.round(score / 25 * 100)}%</div>
          <button onClick={start} style={{ marginTop: 12, background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "9px 22px", fontWeight: 700, cursor: "pointer" }}>{t(L.retry)}</button>
        </Card>
      )}
      {set_.map((qid, n) => {
        const q = Q[qid], perm = seededPerm(qid + 7, 4), dom = DOMAINS[q.d], p = answers[qid];
        return (
          <Card key={qid} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11.5, color: dom.color, fontWeight: 800, marginBottom: 8 }}>{t(L.q)}{n + 1} · {dom.mark} {lang === "ja" ? dom.ja : dom.en}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, lineHeight: 1.55 }}>{tt(q.j, q.e)}</div>
            <div style={{ display: "grid", gap: 8 }}>
              {perm.map((oi, pos) => {
                let border = C.line, bg = "#fff";
                if (graded) {
                  if (oi === q.a) { border = C.green; bg = "#EBFAF1"; }
                  else if (p === pos) { border = C.red; bg = "#FEECEB"; }
                } else if (p === pos) { border = C.ink; bg = "#F0F3F8"; }
                return (
                  <button key={pos} onClick={() => !graded && setAnswers({ ...answers, [qid]: pos })} style={{
                    textAlign: "left", padding: "10px 13px", borderRadius: 8, border: `1.6px solid ${border}`,
                    background: bg, fontSize: 13.5, cursor: graded ? "default" : "pointer", lineHeight: 1.5,
                  }}>
                    <b style={{ color: C.sub, marginRight: 7 }}>{String.fromCharCode(65 + pos)}</b>
                    {lang === "ja" ? q.o[oi][0] : q.o[oi][1]}
                  </button>
                );
              })}
            </div>
            {graded && (
              <p style={{ margin: "12px 0 0", fontSize: 13, color: C.sub, lineHeight: 1.65, background: C.paper, borderRadius: 8, padding: "10px 13px" }}>{tt(q.x[0], q.x[1])}</p>
            )}
          </Card>
        );
      })}
      {!graded && (
        <button onClick={grade} style={{ background: C.ink, color: "#fff", border: "none", borderRadius: 8, padding: "13px 34px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%" }}>
          {t(L.finish)} ({Object.keys(answers).length}/25)
        </button>
      )}
    </div>
  );
}

// ---------- Cases Tab ----------
function CasesTab({ lang, tt, t }) {
  const [open, setOpen] = useState(0);
  const [mode, setMode] = useState("read");
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState(null);
  const [answered, setAnswered] = useState(false);
  const __opBack = useLocalHistory([[open, setOpen], [mode, setMode], [step, setStep], [answered, setAnswered]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const [score, setScore] = useState(0);
  const caseDone = useDoneSet("consulting_case_done_v1");
  useEffect(() => { setStep(1); setPicked(null); setAnswered(false); setScore(0); }, [open, mode]);

  const cs = CASES[open];
  const dom = DOMAINS[cs.dom];
  const total = cs.steps.length;
  const cur = cs.steps[step - 1];
  const perm = cur && cur.opt ? seededPerm(open * 11 + step + 3, 4) : null;
  const finished = mode === "drill" && answered && step === total;

  const pick = (pos) => {
    if (answered) return;
    setPicked(pos);
    setAnswered(true);
    if (perm[pos] === 0) setScore(score + 1);
  };
  const nextStep = () => { setStep(step + 1); setPicked(null); setAnswered(false); };

  const stepBlock = (s, i) => (
    <div key={i} style={{ display: "flex", gap: 14, marginTop: 16 }}>
      <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: dom.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>{i + 1}</div>
      <div>
        <b style={{ fontSize: 14.5 }}>{tt(s.tj, s.te)}</b>
        <p style={{ margin: "5px 0 0", fontSize: 13.5, lineHeight: 1.75, color: C.txt }}>{tt(s.bj, s.be)}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {CASES.map((c, i) => (
          <button key={i} onClick={() => setOpen(i)} style={{
            padding: "8px 14px", borderRadius: 18, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
            border: `1.5px solid ${caseDone.has(i) ? "#16A34A" : (open === i ? C.ink : C.line)}`, background: open === i ? C.ink : "#fff", color: open === i ? "#fff" : C.txt,
          }}><DoneCheck on={caseDone.has(i)} onToggle={(e) => caseDone.toggle(i, e)} en={lang === "en"} />{tt(c.tj, c.te)}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[["read", L.caseRead], ["drill", L.caseDrill]].map(([m, lbl]) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "7px 16px", borderRadius: 18, fontSize: 12.5, fontWeight: 800, cursor: "pointer",
            border: `1.8px solid ${mode === m ? C.blue : C.line}`, background: mode === m ? C.blue : "#fff", color: mode === m ? "#fff" : C.txt,
          }}>{m === "drill" ? "✎ " : "☰ "}{t(lbl)}</button>
        ))}
      </div>
      <Card>
        <div style={{ fontSize: 12, color: dom.color, fontWeight: 800 }}>{dom.mark} {lang === "ja" ? dom.ja : dom.en}{mode === "drill" ? ` · ${score}/${answered ? step : step - 1}` : ""}</div>
        <h2 style={{ fontFamily: serif, fontSize: 20, margin: "6px 0 4px" }}>{tt(cs.tj, cs.te)}</h2>
        <p style={{ color: C.sub, fontSize: 13.5, marginTop: 0 }}>{tt(cs.dj, cs.de)}</p>

        {mode === "read" && (
          <>
            {cs.steps.slice(0, step).map(stepBlock)}
            <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} style={{ background: "#fff", color: C.ink, border: `1.5px solid ${C.line}`, borderRadius: 8, padding: "10px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>← {t(L.backStep)}</button>
              )}
              {step < total ? (
                <button onClick={() => setStep(step + 1)} style={{ background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  {t(L.reveal)} ({step}/{total})
                </button>
              ) : (
                <button onClick={() => setStep(1)} style={{ background: "#fff", color: C.ink, border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{t(L.restart)}</button>
              )}
            </div>
          </>
        )}

        {mode === "drill" && (
          <>
            {cs.steps.slice(0, answered ? step : step - 1).map(stepBlock)}
            {!answered && cur && cur.opt && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.blue }}>{t(L.step)} {step}/{total}</div>
                <div style={{ fontFamily: serif, fontSize: 16.5, fontWeight: 700, margin: "6px 0 14px" }}>{t(L.caseQ)}</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {perm.map((oi, pos) => (
                    <button key={pos} onClick={() => pick(pos)} style={{
                      textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.8px solid ${C.line}`,
                      background: "#fff", fontSize: 13.5, cursor: "pointer", color: C.txt, lineHeight: 1.5,
                    }}>
                      <b style={{ color: C.sub, marginRight: 8 }}>{String.fromCharCode(65 + pos)}</b>
                      {lang === "ja" ? cur.opt[oi][0] : cur.opt[oi][1]}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {answered && (
              <div style={{ marginTop: 14 }}>
                <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
                  {perm.map((oi, pos) => {
                    let border = C.line, bg = "#fff";
                    if (oi === 0) { border = C.green; bg = "#EBFAF1"; }
                    else if (picked === pos) { border = C.red; bg = "#FEECEB"; }
                    return (
                      <div key={pos} style={{ padding: "10px 14px", borderRadius: 9, border: `1.8px solid ${border}`, background: bg, fontSize: 13, lineHeight: 1.5, color: C.txt }}>
                        <b style={{ color: C.sub, marginRight: 8 }}>{String.fromCharCode(65 + pos)}</b>
                        {lang === "ja" ? cur.opt[oi][0] : cur.opt[oi][1]}
                      </div>
                    );
                  })}
                </div>
                <span style={{ fontWeight: 800, color: perm[picked] === 0 ? C.green : C.red }}>
                  {perm[picked] === 0 ? t(L.correct) : t(L.wrong)}
                </span>
                {!finished ? (
                  <div style={{ marginTop: 16 }}>
                    <button onClick={nextStep} style={{ background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{t(L.next)}</button>
                  </div>
                ) : (
                  <div style={{ marginTop: 18, textAlign: "center", background: C.paper, borderRadius: 10, padding: 18 }}>
                    <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: score === total ? C.green : score >= Math.ceil(total * 0.6) ? C.amber : C.red }}>{score} / {total}</div>
                    <button onClick={() => { setStep(1); setPicked(null); setAnswered(false); setScore(0); }} style={{ marginTop: 10, background: "#fff", color: C.ink, border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>{t(L.retry)}</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

// ---------- Diagrams Tab ----------
function DiagramsTab({ lang, tt }) {
  const [open, setOpen] = useState(null); // null=一覧, 数値=詳細
  const __opBack = useLocalHistory([[open, setOpen]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const diagDone = useDoneSet("consulting_diagram_done_v1");
  const t = (j, e) => (lang === "ja" ? j : e);
  const groups = DOMAINS.map((dom) => ({
    dom,
    items: DIAGRAMS.map((d, i) => ({ d, i })).filter((x) => x.d.d === dom.id),
  })).filter((g) => g.items.length > 0);

  // ---- 詳細ビュー ----
  if (open != null) {
    const D = DIAGRAMS[open];
    const dom = DOMAINS[D.d];
    const siblings = DIAGRAMS.map((d, i) => ({ d, i })).filter((x) => x.d.d === D.d);
    const pos = siblings.findIndex((x) => x.i === open);
    const prevIdx = pos > 0 ? siblings[pos - 1].i : null;
    const nextIdx = pos < siblings.length - 1 ? siblings[pos + 1].i : null;
    return (
      <div>
        <button onClick={() => setOpen(null)} style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14,
          background: "#fff", color: C.ink, border: `1.5px solid ${C.line}`, borderRadius: 8,
          padding: "9px 16px", fontSize: 13.5, fontWeight: 700, cursor: "pointer",
        }}>← {t("一覧に戻る", "Back to list")}</button>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: dom.color, color: "#fff", fontSize: 12, fontWeight: 800 }}>{dom.mark}</span>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: dom.color }}>{t(dom.ja, dom.en)}</span>
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 20, margin: "2px 0 12px" }}>{tt(D.tj, D.te)}</h2>
          <FigFrame id={"cons:" + D.id} lang={lang} terms={GLOSSARY} topic={tt(D.tj, D.te)}
                    hint={t("図の中の文字をクリックすると意味が出て、自分の説明メモも残せます。「ラベルを隠して思い出す」で暗記、狭い画面では＋で拡大できます。", "Click any label for its meaning and to add your own note; hide the labels to test recall, or use ＋ to enlarge on a small screen.")}>
            <D.C lang={lang} />
          </FigFrame>
        </Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 14 }}>
          <button onClick={() => prevIdx != null && setOpen(prevIdx)} disabled={prevIdx == null} style={{
            background: "#fff", color: prevIdx == null ? C.line : C.ink, border: `1.5px solid ${C.line}`, borderRadius: 8,
            padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: prevIdx == null ? "default" : "pointer",
          }}>← {prevIdx != null ? tt(DIAGRAMS[prevIdx].tj, DIAGRAMS[prevIdx].te) : t("前へ", "Prev")}</button>
          <button onClick={() => nextIdx != null && setOpen(nextIdx)} disabled={nextIdx == null} style={{
            background: "#fff", color: nextIdx == null ? C.line : C.ink, border: `1.5px solid ${C.line}`, borderRadius: 8,
            padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: nextIdx == null ? "default" : "pointer",
          }}>{nextIdx != null ? tt(DIAGRAMS[nextIdx].tj, DIAGRAMS[nextIdx].te) : t("次へ", "Next")} →</button>
        </div>
      </div>
    );
  }

  // ---- 一覧ビュー(テーマ別) ----
  return (
    <div>
      <p style={{ color: C.sub, fontSize: 12.5, margin: "0 0 14px" }}>{t("図解を選んで開く(70点)", "Pick a diagram to open (70 total)")}</p>
      <div style={{ display: "grid", gap: 16 }}>
        {groups.map((g) => (
          <div key={g.dom.id}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: g.dom.color, color: "#fff", fontSize: 12, fontWeight: 800 }}>{g.dom.mark}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: g.dom.color }}>{t(g.dom.ja, g.dom.en)}</span>
              <span style={{ fontSize: 11.5, color: C.sub }}>· {g.items.length}</span>
              <span style={{ flex: 1, height: 1, background: C.line }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {g.items.map(({ d, i }) => (
                <button key={i} onClick={() => setOpen(i)} style={{
                  padding: "8px 14px", borderRadius: 18, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                  border: `1.5px solid ${diagDone.has(i) ? "#16A34A" : C.line}`, background: "#fff", color: C.txt,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = g.dom.color; e.currentTarget.style.color = g.dom.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = diagDone.has(i) ? "#16A34A" : C.line; e.currentTarget.style.color = C.txt; }}
                ><DoneCheck on={diagDone.has(i)} onToggle={(e) => diagDone.toggle(i, e)} en={lang === "en"} />{tt(d.tj, d.te)}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Confuse Tab ----------
function ConfuseTab({ lang, tt }) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {CONFUSE.map((c, i) => (
        <Card key={i}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            <span style={{ background: C.ink, color: "#fff", borderRadius: 6, padding: "4px 12px", fontSize: 13, fontWeight: 800 }}>{tt(c.aj, c.ae)}</span>
            <span style={{ color: C.crimson, fontWeight: 800, fontSize: 13 }}>vs</span>
            <span style={{ background: C.gold, color: "#fff", borderRadius: 6, padding: "4px 12px", fontSize: 13, fontWeight: 800 }}>{tt(c.bj, c.be)}</span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.75, color: C.txt }}>{tt(c.xj, c.xe)}</p>
        </Card>
      ))}
    </div>
  );
}

// ---------- Glossary Tab ----------
function GlossaryTab({ lang, tt, t }) {
  const [q, setQ] = useState("");
  const [dom, setDom] = useState(-1);
  const __opBack = useLocalHistory([[dom, setDom]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const list = GLOSSARY.filter((g) =>
    (dom === -1 || g.d === dom) &&
    (q === "" || g.t.toLowerCase().includes(q.toLowerCase()) || g.e.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <DomainChip dom={{ color: C.ink, mark: "◎", ja: t(L.allDomains), en: t(L.allDomains) }} active={dom === -1} onClick={() => setDom(-1)} lang={lang} />
        {DOMAINS.map((d) => <DomainChip key={d.id} dom={d} active={dom === d.id} onClick={() => setDom(d.id)} lang={lang} />)}
      </div>
      <input value={q} onChange={(e) => setQ(e.target.value)} aria-label={t(L.search)} placeholder={t(L.search)}
        style={{ width: "100%", boxSizing: "border-box", padding: "11px 15px", borderRadius: 9, border: `1.5px solid ${C.line}`, fontSize: 14, marginBottom: 16, fontFamily: sans }} />
      <div style={{ display: "grid", gap: 10 }}>
        {list.map((g, i) => (
          <Card key={i} style={{ padding: "14px 18px", borderLeft: `4px solid ${DOMAINS[g.d].color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <b style={{ fontSize: 14.5 }}>{lang === "ja" ? g.t : g.e}</b>
              <span style={{ color: C.sub, fontSize: 12.5 }}>{lang === "ja" ? g.e : g.t}</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: C.txt, lineHeight: 1.65 }}>{tt(g.dj, g.de)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- Progress Tab ----------
function ProgressTab({ lang, stats, resetAll, importAll, tt, t }) {
  const fileRef = useRef(null);
  const [importMsg, setImportMsg] = useState("");
  const rows = DOMAINS.map((d) => {
    const ids = Q.map((q, i) => ({ q, i })).filter((x) => x.q.d === d.id).map((x) => x.i);
    const answered = ids.filter((i) => stats[i]);
    const correct = answered.filter((i) => stats[i].ok);
    return { d, total: ids.length, ans: answered.length, ok: correct.length };
  });
  const totAns = rows.reduce((s, r) => s + r.ans, 0);
  const totOk = rows.reduce((s, r) => s + r.ok, 0);
  const gKeys = Object.keys(stats).filter((k) => k.startsWith("g"));
  const gOk = gKeys.filter((k) => stats[k].ok).length;
  return (
    <div>
      <Card style={{ marginBottom: 16, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 46, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700 }}>{totAns} / {Q.length}</div>
            <div style={{ color: C.sub, fontSize: 12.5 }}>{t(L.tabs.quiz)} · {t(L.answered)}</div>
          </div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700 }}>{gKeys.length} / {GLOSSARY_N}</div>
            <div style={{ color: C.sub, fontSize: 12.5 }}>{t(L.tabs.basics)} · {gKeys.length ? Math.round(gOk / gKeys.length * 100) : 0}%</div>
          </div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: totAns ? (totOk / totAns >= 0.8 ? C.green : C.amber) : C.txt }}>
              {totAns ? Math.round(totOk / totAns * 100) : 0}%
            </div>
            <div style={{ color: C.sub, fontSize: 12.5 }}>{t(L.accuracy)}</div>
          </div>
        </div>
      </Card>
      {rows.map((r) => (
        <Card key={r.d.id} style={{ marginBottom: 12, padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13.5 }}>
            <b style={{ color: r.d.color }}>{r.d.mark} {lang === "ja" ? r.d.ja : r.d.en}</b>
            <span style={{ color: C.sub }}>{r.ans}/{r.total} · {r.ans ? Math.round(r.ok / r.ans * 100) : 0}%</span>
          </div>
          <div style={{ height: 9, background: C.paper, borderRadius: 6, overflow: "hidden", display: "flex" }}>
            <div style={{ width: `${(r.ok / r.total) * 100}%`, background: r.d.color }} />
            <div style={{ width: `${((r.ans - r.ok) / r.total) * 100}%`, background: C.red, opacity: 0.5 }} />
          </div>
        </Card>
      ))}
      <input type="file" accept="application/json,.json" style={{ display: "none" }} ref={fileRef} onChange={(e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(reader.result);
            const incoming = parsed && parsed.stats && typeof parsed.stats === "object" ? parsed.stats : parsed;
            if (!incoming || typeof incoming !== "object") throw new Error("bad");
            const clean = {};
            for (const [kk, vv] of Object.entries(incoming)) {
              if (vv && typeof vv === "object" && "ok" in vv) clean[kk] = { ok: !!vv.ok, t: vv.t || Date.now() };
            }
            importAll(clean);
            setImportMsg(t(L.importDone));
          } catch (_) {
            setImportMsg(t(L.importFail));
          }
          e.target.value = "";
        };
        reader.readAsText(f);
      }} />
      <button onClick={() => {
        const payload = { app: "consulting-thinking-hub", exportedAt: new Date().toISOString(), totals: { applied: Q.length, basics: GLOSSARY_N }, stats };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `thinking-hub-progress-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }} style={{ marginTop: 8, marginRight: 10, background: C.ink, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
        ↓ {t(L.exportBtn)}
      </button>
      <button onClick={() => fileRef.current && fileRef.current.click()} style={{ marginTop: 8, marginRight: 10, background: "#fff", color: C.ink, border: `1.5px solid ${C.ink}`, borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
        ↑ {t(L.importBtn)}
      </button>
      <button onClick={resetAll} style={{ marginTop: 8, background: "#fff", color: C.red, border: `1.5px solid ${C.red}`, borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
        {t(L.reset)}
      </button>
      {importMsg && <div style={{ marginTop: 12, fontSize: 12.5, color: C.sub }}>{importMsg}</div>}
    </div>
  );
}
  // ポータルの横断検索に出すタブ
  ConsultingThinkingHub.PORTAL_INDEX = (en) => Object.entries(L.tabs).map(([k, v]) => ({ label: v[en ? "en" : "ja"], sub: en ? "Consulting Hub tab" : "Consulting Hub のタブ", hash: "consulting/" + k, extra: [v.ja, v.en].join(" ") }));

const ATLAS_JA = {"layers": {"L": {"name": "法則", "en": "Laws", "q": "世界はどう動くか", "subj": "世界", "form": "記述（〜になる）", "test": "誰が何をしても成り立つ規則性か", "axis": "分析単位：システム → 個人 → 組織 → 市場 → 技術・社会 → AI・計算機", "role": "現実を支配する「物理」"}, "S": {"name": "戦略", "en": "Strategies", "q": "どう勝つか", "subj": "自分（自社）", "form": "規範（〜すれば勝てる）", "test": "選択と資源配分を伴う勝ち筋の命題か", "axis": "優位の源泉：どこで・何で・いつ・誰に対し・誰と・どれだけ", "role": "法則を味方につける「打ち手」"}, "F": {"name": "フレームワーク", "en": "Frameworks", "q": "どう考えるか", "subj": "分析者", "form": "道具（この枠を埋めよ）", "test": "答えではなく問いを構造化する器か", "axis": "思考プロセスの段階：基本形 → 外部診断 → 内部診断 → 構想・設計 → 実行・統治 → 学習", "role": "法則と打ち手を見るための「計器」"}}, "cats": {"L1": {"layer": "L", "name": "システム・数理", "en": "Systems & math", "desc": "分野を問わず現れる普遍的な構造"}, "L2": {"layer": "L", "name": "個人の認知・行動", "en": "Individual cognition", "desc": "一人の人間の判断と動機の癖"}, "L3": {"layer": "L", "name": "組織・チーム", "en": "Organizations", "desc": "人が集まると生じる規則性"}, "L4": {"layer": "L", "name": "市場・経済・競争", "en": "Markets & competition", "desc": "企業と顧客の相互作用が生む規則性"}, "L5": {"layer": "L", "name": "技術・イノベーション・社会", "en": "Technology & society", "desc": "技術の進化と社会への浸透の規則性"}, "L6": {"layer": "L", "name": "AI・計算機", "en": "AI & computing", "desc": "AIとソフトウェアに固有の規則性"}, "S1": {"layer": "S", "name": "ポジショニング", "en": "Where to play", "desc": "どこで戦うか", "w": "Where"}, "S2": {"layer": "S", "name": "ケイパビリティ", "en": "What to win with", "desc": "何を強みに戦うか", "w": "What"}, "S3": {"layer": "S", "name": "タイミング・スピード", "en": "When & how fast", "desc": "いつ・どの速さで動くか", "w": "When"}, "S4": {"layer": "S", "name": "相互作用・駆け引き", "en": "Against whom", "desc": "相手とどう渡り合うか", "w": "vs Whom"}, "S5": {"layer": "S", "name": "エコシステム", "en": "With whom", "desc": "誰と組むか・どこまで自前か", "w": "With whom"}, "S6": {"layer": "S", "name": "ポートフォリオ", "en": "How much to bet", "desc": "何にどれだけ賭けるか", "w": "How much"}, "F1": {"layer": "F", "name": "思考の基本形", "en": "Thinking basics", "desc": "あらゆる分析の土台になる型"}, "F2": {"layer": "F", "name": "外部環境の診断", "en": "External diagnosis", "desc": "マクロ・業界・顧客を見る"}, "F3": {"layer": "F", "name": "内部・統合の診断", "en": "Internal diagnosis", "desc": "自社を見て内外を統合する"}, "F4": {"layer": "F", "name": "構想・設計", "en": "Strategy & solution design", "desc": "選択肢を出して選び、解決策を設計する"}, "F5": {"layer": "F", "name": "実行・変革・統治", "en": "Execution, change & governance", "desc": "動かし、測り、定着させ、統制する"}, "F6": {"layer": "F", "name": "意思決定・学習", "en": "Decision & learning", "desc": "決め、振り返り、前提を更新する"}}, "meta": {"M1": {"name": "非線形性", "en": "Nonlinearity", "def": "入力と結果は比例しない。指数・べき乗・閾値で、小さな差が桁違いの差になる。", "imp": "平均ではなく、裾（外れ値）と閾値（臨界量）で考える。勝てる場所に集中し、臨界量を越えるまで投じる。"}, "M2": {"name": "フィードバック", "en": "Feedback", "def": "結果が原因に戻って作用する。好循環・悪循環が生まれ、指標は行動を歪め返す。", "imp": "出来事ではなく循環構造に介入する。KPIは必ず行動を歪める前提で設計する。"}, "M3": {"name": "制約", "en": "Constraint", "def": "全体の成果は、最も弱い一点で決まる。制約は解消すると移動する。", "imp": "平均的な底上げより、制約一点の解消に資源を集める。次の制約を常に探す。"}, "M4": {"name": "不確実性と非対称性", "en": "Uncertainty & asymmetry", "def": "確率・情報・損得は対称ではない。上振れと下振れ、知る者と知らない者の差が結果を決める。", "imp": "下振れを限定し、上振れを開けておく（オプション）。情報の優位を作る。"}, "M5": {"name": "時間と経路", "en": "Time & path", "def": "遅れ、S字、経路依存。いつ行うかで結果が変わり、過去の選択が未来を縛る。", "imp": "タイミングと可逆性を設計変数にする。早期のロックインと長期の複利を狙う。"}, "M6": {"name": "認知の限界", "en": "Bounded cognition", "def": "人も組織も合理的に判断しきれない。注意・記憶・計算力には限りがある。", "imp": "人を変えようとするより、選択環境と意思決定の手順を設計する。"}, "M7": {"name": "適合と多様性", "en": "Fit & variety", "def": "戦略・組織・環境が噛み合って初めて機能する。環境の複雑さには内部の多様性で応える。", "imp": "単体の打ち手ではなく、要素同士の整合（フィット）を設計する。"}, "M8": {"name": "相互依存", "en": "Interdependence", "def": "自分の結果は相手の選択に依存する。競争と協調は同時に起きる。", "imp": "相手の反応を織り込んで打ち手を選ぶ。パイを広げる協調と、分け合う競争を使い分ける。"}}, "grades": {"S": {"name": "数理・物理", "def": "数学的帰結、または物理法則として確立している"}, "A": {"name": "頑健な実証", "def": "多数の追試・メタ分析などで広く支持されている"}, "B": {"name": "条件付きの実証", "def": "実証はあるが、条件・効果量・一般化に議論がある"}, "C": {"name": "経験則", "def": "観察・事例・洞察に基づく。定量的な検証は限られる"}, "D": {"name": "要注意", "def": "通説の形では根拠が弱い、または再現性に重大な疑義がある"}}, "rules": [{"t": "名称ではなく中身で分類する", "d": "「理論」と呼ばれていても記述的なら法則（イノベーションの普及理論 → L5-04）、「法則」に由来していても打ち手の命題なら戦略（ランチェスター戦略 → S1-03）。"}, {"t": "現象とそれを利用する打ち手を分ける", "d": "観察された規則性は法則に、それを利用する打ち手は戦略に置いた（普及理論 L5-04 → キャズム理論 S1-05、ネットワーク効果 L4-05 → プラットフォーム戦略 S5-01）。"}, {"t": "戦略とその実装ツールを分ける", "d": "勝ち筋の命題は戦略、空欄を埋める器はフレームワークに置いた（ブルー・オーシャン戦略 S1-02 → 戦略キャンバス F4-07、資源ベース戦略 S2-01 → VRIO分析 F3-02、最小律 L1-07 → TOCの5ステップ F5-05）。"}, {"t": "カテゴリは排他、メタ原理は非排他", "d": "各項目は一つの層・一つのカテゴリにだけ属する。複数の原理にまたがる性質は、8つのメタ原理タグ（重複あり）で表した。"}, {"t": "ジャンルは別の軸として重ねる", "d": "層とカテゴリ（種類の軸）とは別に、学問の出自（10領域・排他）、業界（12・非排他）、専門家レンズ（8・非排他）の3つのジャンル軸を重ねた。種類の分類を崩さずに、別の切り口から同じ項目を引ける。"}, {"t": "根拠の強さを同じ物差しで測る", "d": "数学の定理と現場の経験則を同列に並べないため、法則には5段階の根拠グレード（S〜D）を付けた。戦略とフレームワークは真偽を問う命題ではないため付けていない。"}], "summary": [{"h": "{{total}}の知見は3層・{{nCat}}カテゴリに分かれ、8つの原理に収束する", "b": "法則（世界はどう動くか）{{nL}}件、戦略（どう勝つか）{{nS}}件、フレームワーク（どう考えるか）{{nF}}件。層をまたいで見ると、非線形性・フィードバック・制約など8つのメタ原理に集約される。覚えるべきは個々の名前ではなく、この8つの原理である。"}, {"h": "優れた戦略は、必ず法則を味方につけている", "b": "経験曲線がコストリーダーシップを、ネットワーク効果がプラットフォーム戦略を、ファットテールがバーベル戦略を支える。法則の裏付けがない戦略は願望にすぎず、戦略につながらないフレームワーク分析は作業にすぎない。本資料では{{nChain}}本の連鎖として示した。"}, {"h": "戦略の本質は二律背反の選択にある", "b": "集中か分散か、計画か創発か、人に任せるかAIに任せるかに、普遍的な正解はない。取り上げた{{nT}}つの二律背反のうち{{nT3}}つは、「成果の分布の形」「不確実性の種類」「決定の可逆性」の3つの判断軸で決着する。"}, {"h": "「法則」の確からしさは、まちまちである", "b": "法則{{nL}}件のうち、数学・物理として確立したものは{{gS}}件にとどまり、経験則か要注意のものが{{gCD}}件ある。80:20、150人、2:6:2といった数字を、そのまま設計値にしない。AIに固有の法則{{nL6}}件は、観測の歴史が短いぶん、経験則と条件付きの実証が中心になる。"}, {"h": "AIは、業界ごとに違う形で地図を書き換える", "b": "{{nInd}}業界それぞれで、AIが①コスト構造を変える所、②参入障壁を溶かす所、③データと顧客接点の複利が効く所を特定した。人手と情報処理に依存する業界ほど変化が大きく、規制と設備に守られた業界ほど変化は遅いが深い。"}, {"h": "専門家のレンズは必ず対立する。対立を明示して初めて提言になる", "b": "AIコンサル・アーキテクト・エンジニアリング・戦略・営業・CFO・マーケ・セキュリティの8つのレンズで同じ論点を見ると、速度と統制、効果の測り方、着手する業務の選び方で衝突が起きる。全員が賛成する分析は、検査が甘い兆候である。"}], "chains": [{"t": "規模の連鎖", "L": ["L4-04", "L4-03"], "S": ["S1-01", "S6-01"], "F": ["F4-02"], "mech": ["累積生産量がコストを下げる", "先にシェアを取った者がコストで勝つ", "事業ごとのシェアで資金を配分する"]}, {"t": "ネットワークの連鎖", "L": ["L4-05", "L5-07"], "S": ["S5-01", "S3-01"], "F": ["F4-06"], "mech": ["利用者が利用者を呼び、規格が固定される", "片側を補助して臨界量を先に取る", "誰から収益を得るかを1枚で設計する"]}, {"t": "裾の連鎖", "L": ["L1-02", "L1-04"], "S": ["S6-02", "S6-03"], "F": ["F6-06", "F4-03"], "mech": ["少数の外れ値が全体を支配する", "下振れを限った小さな賭けを数多く打つ", "期待値と時間軸で賭けを管理する"]}, {"t": "普及の連鎖", "L": ["L5-04", "L2-11"], "S": ["S1-05"], "F": ["F4-04"], "mech": ["普及は層ごとに進み、層の間に溝がある", "狭い顧客層を橋頭堡として完全に制圧する", "狙う層を選び、位置づけを決める"]}, {"t": "世代交代の連鎖", "L": ["L5-05", "L5-06"], "S": ["S1-04", "S2-04"], "F": ["F4-03"], "mech": ["どの技術も天井に当たり、次に置き換わる", "自社を破壊する新事業を別組織で育てる", "時間軸の異なる事業を別の物差しで測る"]}, {"t": "同質化の連鎖", "L": ["L4-08", "L4-10"], "S": ["S1-02", "S4-03"], "F": ["F4-07"], "mech": ["競合は中央に収束し、改善しても順位は変わらない", "競争の軸そのものを変える", "競争要因を組み替えて価値曲線を描き直す"]}, {"t": "制約の連鎖", "L": ["L1-07", "L3-03"], "S": ["S5-03", "S3-04"], "F": ["F5-05", "F5-03"], "mech": ["全体は最も弱い一点で決まる", "自社とエコシステムの制約を先に解く", "制約を特定し、数式で感度を測る"]}, {"t": "協調の連鎖", "L": ["L4-09"], "S": ["S4-04", "S4-06"], "F": ["F2-02"], "mech": ["個々の合理が全員にとっての損を生む", "繰り返しの関係と評判で協調を引き出す", "業界内の競争の強さを5つの力で測る"]}, {"t": "抵抗の連鎖", "L": ["L2-02", "L2-06", "L5-09"], "S": ["S4-05"], "F": ["F5-07", "F5-08"], "mech": ["人は失うものに敏感で、初期設定を好み、効果は遅れて出る", "退路を断つ宣言で、現状維持という選択肢を消す", "組織と個人の両方の段階で定着を設計する"]}, {"t": "計画の連鎖", "L": ["L2-08", "L1-10"], "S": ["S3-03", "S6-03"], "F": ["F6-05", "F6-08"], "mech": ["計画は楽観的に見積もられ、複雑な設計は一度では動かない", "小さく始めて学び、段階ごとに投資する", "失敗を先に想像し、可逆性で決め方を変える"]}, {"t": "AI品質の連鎖", "L": ["L6-07", "L6-10", "L1-11"], "S": ["S2-10"], "F": ["F6-15", "F6-16"], "mech": ["データの質が上限を決め、誤りは避けられず、多段の処理で増幅する", "使われるほど判断結果と正誤が貯まり、改善が回る仕組みを持つ", "評価セットとLLMOpsのループで品質を測り続ける"]}, {"t": "AI価値移転の連鎖", "L": ["L4-14", "L4-13", "L6-15"], "S": ["S2-08", "S5-06"], "F": ["F2-09"], "mech": ["モデルが汎用品化すると、利益は隣の層へ移る", "汎用品でない層（独自の資源、顧客との接点）で持続的な優位を築く", "構成要素の進化の段階を地図にして、自前と調達を分ける"]}, {"t": "組織の連鎖", "L": ["L3-04", "L3-10"], "S": ["S2-05"], "F": ["F3-03"], "mech": ["システムは組織を写し、組織は戦略に従う", "活動と組織を、相互に補強し合う体系として設計する", "ハードとソフトの7要素の整合を診断する"]}], "tensions": [{"t": "集中か、分散か", "axis": "dist", "rel": [], "a": {"l": "集中", "ids": ["S6-01", "S1-01", "L1-01"]}, "b": {"l": "分散", "ids": ["S6-02", "S6-03", "L1-02"]}, "rule": "成果の分布が正規分布に近く予測できるなら集中する。裾が重く予測できないなら、小さく多く賭けて分散する。"}, {"t": "先行か、追随か", "axis": "unc", "rel": ["S3-01"], "a": {"l": "先行", "ids": ["L4-05", "L5-07"]}, "b": {"l": "追随", "ids": ["L5-02", "L5-05"]}, "rule": "ネットワーク効果やロックインが強く、勝者が早く決まる市場では先行する。技術や需要の不確実性が大きく、標準が定まっていない市場では、追随して学ぶ。"}, {"t": "深化か、探索か", "axis": "unc", "rel": ["S2-04", "F4-03"], "a": {"l": "深化", "ids": ["L4-04", "S2-05", "L1-03"]}, "b": {"l": "探索", "ids": ["L5-05", "L5-06", "S1-04"]}, "rule": "既存技術のS字が天井に近いほど、探索に配分を移す。天井の位置が分からないこと自体が、両方を同時に持つ理由になる。"}, {"t": "計画か、創発か", "axis": "unc", "rel": ["F6-07"], "a": {"l": "計画", "ids": ["F4-08", "S2-05", "S1-01"]}, "b": {"l": "創発", "ids": ["S3-05", "S3-03", "L1-10"]}, "rule": "分析すれば因果が分かる「煩雑」な領域では計画する。やってみないと分からない「複雑」な領域では、実験の中から戦略を拾い上げる。"}, {"t": "効率か、冗長か", "axis": "dist", "rel": [], "a": {"l": "効率", "ids": ["L1-07", "F5-05", "S6-01"]}, "b": {"l": "冗長", "ids": ["L1-09", "L3-11", "S6-02"]}, "rule": "想定外の衝撃が稀で小さいなら効率を取る。稀でも致命的な衝撃がありうるなら余力を持つ。効率は平時に、冗長は有事に報われる。"}, {"t": "速さか、慎重さか", "axis": "rev", "rel": ["F6-08"], "a": {"l": "速さ", "ids": ["S3-02", "S3-04", "L3-01"]}, "b": {"l": "慎重さ", "ids": ["F6-06", "F6-05", "L2-08"]}, "rule": "やり直せる決定は速さを、やり直せない決定は慎重さを優先する。迷ったら、決定を小さく分けてやり直せる形にする。"}, {"t": "人に任せるか、AIに任せるか", "axis": "unc", "rel": ["F5-15"], "a": {"l": "人", "ids": ["L6-05", "L5-15", "L2-13"]}, "b": {"l": "AI", "ids": ["L6-06", "L3-12", "L1-13"]}, "rule": "AIの能力の境界の内側にある業務は任せ、外側の業務と、誤りが致命的な業務は人が判断する。境界は自社の業務で実験して見極め、実績に応じて任せる範囲を広げる。"}, {"t": "公開か、秘匿か", "axis": "other", "rel": ["S5-04"], "a": {"l": "公開", "ids": ["S5-02", "S5-01", "L4-05"]}, "b": {"l": "秘匿", "ids": ["S2-01", "F3-02", "L4-07"]}, "rule": "普及させたい層は公開し、利益を取る層は秘匿する。境界は「どこで稼ぐか」から逆算して決める。"}], "axes": {"dist": "成果の分布の形", "unc": "不確実性の種類", "rev": "決定の可逆性", "other": "収益源の位置"}, "misuse": [{"t": "整理で止まる", "ids": ["F3-04", "F2-01", "F1-04"], "sym": "SWOTやPESTの表は埋まったが、何をするかが決まらない。", "fix": "各分析の最後に「だから何をする／しない」を1行で書く。書けない分析は資料から削る。"}, {"t": "静止画で動画を判断する", "ids": ["F2-02", "F3-04", "L4-10", "L5-05"], "sym": "現時点の業界構造や強みを根拠に、5年先に効く投資を決める。", "fix": "「3年後に各要素はどう動くか」を書き加え、シナリオ・プランニング（F2-04）と組み合わせる。"}, {"t": "指標が目的化する", "ids": ["F5-01", "F5-03", "L3-07", "L5-11"], "sym": "KPIは達成したのに、事業は良くならない。", "fix": "指標は複数を組み合わせて定期的に入れ替え、数字の背後の実態を現場で確かめる。"}, {"t": "成功事例を真似る", "ids": ["L2-09", "L1-05", "S2-05", "S2-06"], "sym": "他社のベストプラクティスを導入したが、差がつかない。", "fix": "消えた企業とも比べたうえで、自社の活動の体系と噛み合うかで選ぶ。業務効率の改善は戦略ではない（S2-05）。"}, {"t": "経験則を物理法則として扱う", "ids": ["L1-01", "L3-05", "L3-11", "L2-10", "L5-03"], "sym": "「150人の壁」や「2:6:2」を前提に、組織や人事制度を設計する。", "fix": "根拠グレードを確かめ、数字は目安として扱う。自社のデータで検証してから設計値にする。"}, {"t": "比喩を前提ごと持ち込む", "ids": ["L1-08", "L1-09", "S1-03", "S4-02"], "sym": "物理学や軍事の理論を、成り立つ条件を確かめずに経営に当てはめる。", "fix": "原典の前提（閉じた系か、相手は合理的か、など）が自社の状況で成り立つかを先に確かめる。"}], "guide": [{"w": "Why", "q": "なぜ業績が変わったのか", "L": ["L1-05", "L1-17", "L4-10", "L5-05", "L2-09"], "S": [], "F": ["F3-05", "F6-02", "F2-02", "F6-04", "F1-11"]}, {"w": "Where", "q": "どの市場・顧客で戦うか", "L": ["L4-08", "L4-05", "L5-04", "L4-15"], "S": ["S1-01", "S1-02", "S1-03", "S1-05", "S1-06"], "F": ["F2-01", "F2-02", "F2-03", "F4-04", "F2-08"]}, {"w": "What", "q": "何を強みにするか", "L": ["L4-03", "L4-04", "L1-07", "L4-14"], "S": ["S2-01", "S2-02", "S2-05", "S2-08", "S2-10"], "F": ["F3-01", "F3-02", "F2-05", "F2-09"]}, {"w": "When", "q": "いつ参入し、いつ撤退するか", "L": ["L5-02", "L5-05", "L2-05", "L5-03", "L5-17"], "S": ["S3-01", "S1-04", "S6-03", "S3-06"], "F": ["F4-03", "F6-08", "F2-04", "F6-12"]}, {"w": "Who", "q": "誰と組み、誰と競うか", "L": ["L4-09", "L4-06", "L5-07", "L3-15"], "S": ["S4-04", "S4-06", "S5-01", "S5-03", "S5-05", "S5-06"], "F": ["F2-02", "F2-03", "F5-12"]}, {"w": "How", "q": "どう実行し、定着させるか", "L": ["L2-02", "L2-06", "L3-04", "L3-07", "L5-09", "L2-15"], "S": ["S2-04", "S3-03", "S4-05", "S3-07"], "F": ["F5-01", "F5-07", "F5-08", "F5-13", "F3-03"]}, {"w": "How much", "q": "何にどれだけ賭けるか", "L": ["L1-02", "L1-04", "L2-08", "L6-15"], "S": ["S6-01", "S6-02", "S6-03", "S6-05"], "F": ["F6-06", "F4-02", "F6-07", "F6-09", "F6-10"]}, {"w": "With AI", "q": "AIをどの方式で作り、どう統制するか", "L": ["L6-07", "L6-10", "L1-11", "L6-11"], "S": ["S2-10", "S2-11"], "F": ["F4-11", "F6-15", "F5-15", "F3-10", "F5-16"]}], "aiLens": [{"t": "効率化しても総コストは下がらない", "ids": ["L4-11"], "b": "推論の単価が下がるほど利用量が増え、計算資源と電力の総需要は伸びる。投資を「コスト削減額」だけで判断すると、需要の拡大を見誤る。"}, {"t": "価値は補完財に移る", "ids": ["L4-01"], "b": "文章・コード・画像の供給が急増すると、それ自体の価格は下がる。価値は希少なもの、つまり独自のデータ、顧客との接点、信頼、結果への責任に移る。"}, {"t": "人の役割は比較優位で決まる", "ids": ["L4-06", "L6-01"], "b": "AIが多くの業務で人を上回っても、人の役割は消えない。相対的に得意な業務に人を再配置する。自動化は直感と逆の順序で進み、知的な事務作業から先に変わりうる。"}, {"t": "効果は再設計の後に来る", "ids": ["L5-09", "L1-10"], "b": "ツールを配っただけでは生産性は上がらない。業務の再設計と人材育成という無形の投資が先に要る。全社一斉より、小さく動く成功例から育てる。"}, {"t": "期待の振れ幅を管理する", "ids": ["L5-02", "L5-03"], "b": "短期の過大評価と長期の過小評価が同時に起きる。PoCの失望で撤退しない。ハイプ・サイクルを予測には使わず、中間指標で前進を測る。"}, {"t": "作り込みより乗り換えやすさ", "ids": ["L6-02", "L6-03"], "b": "モデルの性能は計算量とデータで予測可能に伸びてきた。特定のモデルに合わせた作り込みは陳腐化しやすい。部品を差し替えられる設計と、自社のデータ資産に投資する。"}, {"t": "AIの設計は組織を写す", "ids": ["L3-04", "L3-10"], "b": "全社のAI基盤やエージェントの構成は、組織の縦割りをそのまま写す。部門横断で効くAIを望むなら、先に組織と意思決定の流れを設計する。"}, {"t": "指標の抜け道探しが加速する", "ids": ["L3-07", "L5-11"], "b": "AIは与えられた指標の最適化が得意で、指標の抜け道も素早く見つける。評価指標の設計と、定性的な確認の重みが増す。"}, {"t": "社内の普及は層ごとに設計する", "ids": ["L5-04", "L2-11", "F5-08"], "b": "社内のAI定着も普及理論に従う。全員一律の研修より、早期採用者の成功例を見えるようにし、個人が「欲求」の段階で止まっていないかを診断する。"}, {"t": "エージェントは工程数で信頼性を失う", "ids": ["L1-11", "L1-12"], "b": "各工程の精度が95%でも、20工程つなげば通しの成功率は約36%になる。工程を減らし、中間の検証と人の承認を重ねて設計する。"}, {"t": "速くなるのは作業、遅いままなのは承認", "ids": ["L1-13", "L1-14"], "b": "作業をAIで短縮しても、承認待ちや確認が残る限り、全体のリードタイムは縮まらない。業務フローの逐次部分と仕掛かりの量を同時に見直す。"}, {"t": "新人が最も伸び、熟練者の役割が変わる", "ids": ["L6-06", "L6-05"], "b": "AIの支援は経験の浅い人を大きく押し上げる一方、能力の境界の外側の業務では、使うほど正答率が下がる。熟練者は、境界の見極めと知見の提供に役割を移す。"}, {"t": "一次データの価値が上がる", "ids": ["L6-08", "L6-07"], "b": "AIが生成した文書で社内ナレッジが埋まると、検索と学習の質が落ちる。人が作った一次情報と、判断の結果の記録が、模倣されにくい資産になる。"}, {"t": "ガバナンスは可逆性で設計する", "ids": ["L5-10", "F6-08"], "b": "影響が見えてから規制しても遅く、見える前に完璧な規則は作れない。やり直せる決定は速く、やり直せない決定（顧客データの扱いなど）は慎重に、と分けて統治する。"}], "disc": {"D1": {"n": "数学・統計", "ids": ["L1-02", "L1-03", "L1-04", "L1-05", "L1-14", "L1-16", "L1-17", "L2-09", "L5-08", "F1-10", "F6-06", "F6-10"]}, "D2": {"n": "自然科学・工学", "ids": ["L1-06", "L1-07", "L1-08", "L1-09", "L1-10", "L1-11", "F1-08", "F1-11", "F2-07", "F5-05", "F6-01"]}, "D3": {"n": "生物・進化・人類学", "ids": ["L3-05", "L3-11", "L4-10"]}, "D4": {"n": "心理学・行動経済学", "ids": ["L1-12", "L2-01", "L2-02", "L2-03", "L2-04", "L2-05", "L2-06", "L2-07", "L2-08", "L2-10", "L2-11", "L2-12", "L2-13", "L2-14", "L2-15", "L2-16", "L2-17", "L2-18", "L2-19", "L3-06", "L3-09", "L3-12", "L5-15", "F5-06", "F6-05", "F6-13"]}, "D5": {"n": "経済学", "ids": ["L1-01", "L3-07", "L3-15", "L4-01", "L4-02", "L4-03", "L4-06", "L4-07", "L4-08", "L4-09", "L4-11", "L4-15", "L4-16", "L4-17", "L5-06", "L5-07", "L5-09", "L5-12", "L5-13", "L5-17", "L6-06", "S4-05", "S4-08", "S5-01", "S5-05", "S6-03", "F6-09"]}, "D6": {"n": "経営学", "ids": ["L3-01", "L3-02", "L3-08", "L3-10", "L3-13", "L3-14", "L4-14", "L6-05", "S1-01", "S1-02", "S1-04", "S1-06", "S2-01", "S2-02", "S2-03", "S2-04", "S2-05", "S2-06", "S2-09", "S2-11", "S3-01", "S3-05", "S4-06", "S4-09", "S5-02", "S5-03", "S5-04", "S6-04", "F2-01", "F2-02", "F2-05", "F2-08", "F3-01", "F3-02", "F3-04", "F4-01", "F4-04", "F4-05", "F4-06", "F4-07", "F4-09", "F5-02", "F5-07", "F5-12", "F6-04", "F6-07", "F6-12"]}, "D7": {"n": "社会科学・法・哲学", "ids": ["L1-15", "L5-02", "L5-04", "L5-10", "L5-11", "L5-14", "L5-16", "S4-04", "S4-07", "F1-06", "F1-07", "F3-10", "F5-16", "F5-17", "F5-18"]}, "D8": {"n": "軍事・兵法", "ids": ["S1-03", "S3-02", "S4-01", "S4-02", "S4-03", "F6-03", "F6-14"]}, "D9": {"n": "計算機科学・AI", "ids": ["L1-13", "L3-03", "L3-04", "L4-05", "L5-01", "L6-01", "L6-02", "L6-03", "L6-04", "L6-07", "L6-08", "L6-09", "L6-10", "L6-11", "L6-12", "L6-13", "L6-14", "L6-16", "F3-11", "F4-11", "F5-15", "F6-15", "F6-16"]}, "D10": {"n": "実務（企業・コンサル・業界）", "ids": ["L4-04", "L4-12", "L4-13", "L5-03", "L5-05", "L6-15", "S1-05", "S2-07", "S2-08", "S2-10", "S3-03", "S3-04", "S3-06", "S3-07", "S5-06", "S6-01", "S6-02", "S6-05", "S6-06", "F1-01", "F1-02", "F1-03", "F1-04", "F1-05", "F1-09", "F1-12", "F2-03", "F2-04", "F2-06", "F2-09", "F2-10", "F3-03", "F3-05", "F3-06", "F3-07", "F3-08", "F3-09", "F4-02", "F4-03", "F4-08", "F4-10", "F4-12", "F4-13", "F5-01", "F5-03", "F5-04", "F5-08", "F5-09", "F5-10", "F5-11", "F5-13", "F5-14", "F6-02", "F6-08", "F6-11"]}}, "industries": [{"id": "I01", "n": "エネルギー・素材", "sub": "化学・鉄鋼・非鉄・電力・ガス", "gics": "エネルギー／素材／公益事業", "econ": "巨額の設備投資と稼働率が収益を決める装置産業。市況と規制に左右され、規模とコスト競争力が基本になる。", "L": ["L4-03", "L4-04", "L1-07", "L5-07"], "S": ["S1-01", "S6-06", "S4-09", "S6-01"], "F": ["F2-04", "F2-01", "F5-05", "F6-09"], "kpi": ["稼働率", "製品1単位あたりコスト", "設備投資利益率", "CO2排出原単位"], "ai": {"cost": "設備の予知保全、プラントの運転最適化、需要予測による燃料と在庫の削減。", "barrier": "熟練オペレーターの暗黙知（L5-14）がAIで形式知になると、新設プラントとの運転ノウハウの差が縮む。", "data": "長年の運転・保全データを持つ既存企業に有利。データの統合と品質（L6-07）が勝負を分ける。"}, "uc": ["予知保全", "プロセス条件の最適化", "材料探索（マテリアルズ・インフォマティクス）"], "agenda": ["脱炭素への移行期に、どの設備をいつ止め、どこに投資するか？", "市況の変動に耐えるよう、事業ポートフォリオをどう組み替えるか？", "熟練者の大量退職を前に、運転ノウハウをどう残すか？"], "risk": "制御系へのAIの適用は、保安規制とサイバー攻撃の対象になる。人の最終判断（F5-15）を残す。"}, {"id": "I02", "n": "製造業", "sub": "機械・電機・自動車・部品", "gics": "資本財／自動車・自動車部品", "econ": "製品開発力・品質・サプライチェーンの効率で競う。擦り合わせの技術力と、モジュール化による水平分業の圧力がせめぎ合う。", "L": ["L4-13", "L4-14", "L4-04", "L5-05"], "S": ["S2-02", "S5-04", "S1-06", "S5-05"], "F": ["F3-01", "F2-09", "F6-12", "F5-05"], "kpi": ["開発リードタイム", "不良率", "在庫回転日数", "サービス売上比率"], "ai": {"cost": "設計と試験の仮想化、外観検査の自動化、技術文書の検索と作成。", "barrier": "ソフトウェアとAIが製品価値を決める比率が上がり、ソフトに強い新規参入者への障壁が下がる。", "data": "稼働中の製品から得られる利用データと保守データ。売り切りからサービスへの転換で複利が効く。"}, "uc": ["設計支援", "品質検査", "技術文書の検索（RAG）", "保守サービスの高度化"], "agenda": ["製品の価値の源泉は、ハードからソフト・サービスへどれだけ移るか？", "どの層を自社で持ち、どの層を標準化・外部化するか？", "現場の改善文化とAIをどう結びつけるか？"], "risk": "設計図や顧客の図面など機密の扱い。輸出管理の対象となる技術情報をAIに入力する際の規制。"}, {"id": "I03", "n": "運輸・物流", "sub": "陸運・海運・空運・倉庫", "gics": "資本財・サービス（運輸）", "econ": "ネットワークの密度と稼働率、そして人手が収益を決める。需要の波と人手不足が最大の制約になっている。", "L": ["L1-14", "L1-07", "L1-13", "L4-03"], "S": ["S3-04", "S5-06", "S5-05"], "F": ["F5-05", "F5-03", "F3-06"], "kpi": ["積載率", "車両・倉庫の稼働率", "1件あたり配送コスト", "定時率"], "ai": {"cost": "配車とルートの最適化、需要予測による人員計画、倉庫作業と事務の自動化。", "barrier": "最適化のアルゴリズムを持つプラットフォーマーが、荷主と運び手の間に入る（S5-06）。", "data": "荷動き・位置・需要のデータ。複数の荷主のデータを束ねた者ほど、最適化が効く。"}, "uc": ["配車・ルート最適化", "需要予測", "倉庫ロボットとの連携", "問い合わせ対応"], "agenda": ["ドライバーの時間外労働の上限規制（2024年問題）の中で、どの機能を自動化・共同化するか？", "荷主との関係で、データと顧客接点を誰が握るか？"], "risk": "安全に関わる運行判断の自動化では、責任の分界と人による監督を明確にする。"}, {"id": "I04", "n": "小売・消費財", "sub": "小売・食品・日用品・アパレル", "gics": "一般消費財・サービス／生活必需品", "econ": "顧客接点と品揃え、在庫回転、ブランドで競う。利益率の薄い業態が多く、オペレーションの効率が利益を決める。", "L": ["L1-01", "L2-18", "L4-12", "L2-19"], "S": ["S2-07", "S2-10", "S5-06", "S1-02"], "F": ["F2-10", "F4-04", "F3-07", "F5-09"], "kpi": ["既存店売上高", "在庫回転率", "客数×客単価", "顧客生涯価値（LTV）", "粗利率"], "ai": {"cost": "需要予測と自動発注、商品説明や販促物の生成、問い合わせ対応。", "barrier": "顧客がAIアシスタントに比較や推薦を頼むと、店舗や自社ECの集客力が弱まる（S5-06）。", "data": "会員・購買データと顧客の声。個別化された提案の精度に複利が効く。"}, "uc": ["需要予測・自動発注", "パーソナライズ", "販促コンテンツの生成", "接客支援"], "agenda": ["AIエージェントが買い物を代行する時代に、自社はどう選ばれるか？", "需要予測で、在庫と廃棄をどこまで減らせるか？"], "risk": "個人データの利用目的と同意、生成した広告表現の表示規制（景品表示法など）。"}, {"id": "I05", "n": "金融", "sub": "銀行・保険・証券・決済", "gics": "金融", "econ": "情報とリスクの仲介で稼ぐ規制産業。信用・規模・規制への対応力が参入障壁で、業務の大半が情報処理である。", "L": ["L4-07", "L1-02", "L3-15", "L1-16"], "S": ["S4-08", "S4-09", "S5-01", "S6-02"], "F": ["F3-10", "F5-16", "F6-09", "F5-15"], "kpi": ["経費率（OHR）", "ROE", "与信コスト率", "顧客あたり預かり資産"], "ai": {"cost": "審査・事務・コンプライアンス確認・顧客対応など、情報処理業務の大半が対象になる。", "barrier": "規制と信用は障壁であり続ける一方、AIによる与信や助言で、特定の機能だけを切り出す専門業者が参入しやすくなる。", "data": "取引・決済のデータと長期の顧客関係。説明できる形でデータを活用できるかが差になる。"}, "uc": ["与信・審査の支援", "不正検知", "コンプライアンス確認", "営業支援", "コールセンター"], "agenda": ["経費率を構造的に下げるため、どの業務をAI前提で作り直すか？", "AIによる与信や助言の説明責任を、どう確保するか？"], "risk": "信用力の評価や生命・医療保険の価格設定は、EU AI法で高リスクの用途に当たる。説明責任・公平性・記録が必須になる。"}, {"id": "I06", "n": "ヘルスケア", "sub": "医療・製薬・医療機器", "gics": "ヘルスケア", "econ": "規制・保険償還・研究開発のリスクが収益を左右する。製薬は長期で高リスクの開発ポートフォリオ、医療の提供は人手に依存するサービスである。", "L": ["L4-16", "L1-02", "L6-10", "L2-13"], "S": ["S6-03", "S5-02", "S4-09"], "F": ["F6-12", "F3-10", "F6-06", "F5-15"], "kpi": ["開発パイプラインの成功確率", "1剤あたり開発費", "病床稼働率", "医師1人あたり事務時間"], "ai": {"cost": "創薬の候補探索、臨床試験の設計と文書の作成、診療記録や事務書類の作成支援。", "barrier": "規制当局の承認は障壁として残る一方、AI創薬企業が候補探索の段階で既存企業と提携・競合する。", "data": "臨床データとゲノムデータ。プライバシーを守りながら統合できる者に複利が効く。"}, "uc": ["創薬の候補探索", "臨床試験文書の作成", "診療記録の作成支援", "画像診断の支援"], "agenda": ["研究開発のどの段階にAIを入れると、成功確率と期間が最も改善するか？", "医療従事者の事務負担を、どこまで減らせるか？"], "risk": "医療機器プログラムとしての規制、要配慮個人情報の扱い、診断支援での自動化バイアス（L2-13）。"}, {"id": "I07", "n": "IT・ソフトウェア", "sub": "SaaS・SI・半導体を除くIT", "gics": "情報技術", "econ": "限界費用が低く、規模・ネットワーク効果・スイッチングコストで勝者に集中する。成長と収益性のバランスが企業価値を決める。", "L": ["L4-17", "L4-05", "L4-14", "L6-15"], "S": ["S2-08", "S3-07", "S5-01", "S3-06"], "F": ["F3-08", "F3-07", "F5-09", "F2-09"], "kpi": ["ARR", "売上継続率（NRR）", "解約率", "Rule of 40", "粗利率"], "ai": {"cost": "開発・テスト・運用の自動化で、ソフトウェアを作るコストが下がる。", "barrier": "開発コストの低下で参入障壁が下がり、機能の差だけでは守れなくなる。AIエージェントが業務アプリの画面操作を代わりに行うと、利用者数に応じた課金モデルが揺らぐ。", "data": "業務の実行データと、顧客の業務フローへの組み込み。記録のシステム（System of Record）の立場を持つ者が強い。"}, "uc": ["コード生成・レビュー", "テストの自動化", "顧客サポート", "製品へのAI機能の組み込み"], "agenda": ["利用者数に応じた課金から、成果や利用量に応じた課金への移行をどう設計するか？", "AIエージェントの時代に、自社製品は記録のシステムとして残るか、置き換えられる画面になるか？"], "risk": "製品に組み込んだAIの出力に対する責任、顧客データの学習への利用の可否、オープンソースとモデルのライセンス。"}, {"id": "I08", "n": "通信・メディア", "sub": "通信・放送・出版・ゲーム・エンタメ", "gics": "コミュニケーション・サービス", "econ": "通信は設備と規模の産業、メディアはヒットと注意（アテンション）の産業。どちらも固定費が大きく、限界費用が低い。", "L": ["L4-15", "L1-02", "L4-17", "L1-15"], "S": ["S5-06", "S6-02", "S5-01", "S4-09"], "F": ["F2-10", "F5-09", "F3-07"], "kpi": ["ARPU", "解約率", "視聴時間・エンゲージメント", "作品1本あたり収益"], "ai": {"cost": "コンテンツの制作・翻訳・吹き替え・編集のコストが大きく下がる。", "barrier": "制作コストの低下でコンテンツの供給が爆発し、希少な知的財産と流通の支配力に価値が集中する（L4-01）。", "data": "視聴・利用の行動データと、ファンとの関係。推薦の精度に複利が効く。"}, "uc": ["制作支援", "多言語化", "推薦の個別化", "カスタマーサポート", "ネットワーク運用の最適化"], "agenda": ["生成AIで供給が爆発する中で、自社の知的財産の価値をどう守り、どう貸し出すか？", "AIに学習される側として、どのような権利と対価を求めるか？"], "risk": "著作権・肖像権・ディープフェイク、AI生成コンテンツの表示。"}, {"id": "I09", "n": "不動産・建設", "sub": "ゼネコン・住宅・不動産開発・仲介", "gics": "不動産／資本財（建設）", "econ": "立地と資本コスト、案件ごとのプロジェクト管理が収益を決める。建設は多重下請けと人手不足、不動産は金利と稼働率が鍵になる。", "L": ["L2-08", "L4-16", "L1-07", "L4-07"], "S": ["S5-05", "S6-06", "S2-01"], "F": ["F6-13", "F6-09", "F5-05", "F6-12"], "kpi": ["工期・予算の遵守率", "1人あたり施工高", "稼働率・賃料水準", "NOI利回り"], "ai": {"cost": "設計・積算・施工計画の自動化、書類の作成、現場の安全監視。", "barrier": "価格の査定と取引情報の透明化で、仲介の情報の優位（L4-07）が薄れる。", "data": "案件ごとの施工の実績とコストのデータ。参照クラス予測（F6-13）の精度に直結する。"}, "uc": ["積算・見積もり", "図面チェック", "施工記録と報告書の作成", "物件の査定"], "agenda": ["人手不足の中で、工期と品質を守るために、どの工程を標準化・自動化するか？", "仲介の情報の優位が薄れた後、何で手数料を正当化するか？"], "risk": "安全に関わる判断の責任、図面と顧客情報の機密、下請けを含めたデータ共有のルール。"}, {"id": "I10", "n": "プロフェッショナルサービス", "sub": "コンサル・法律・会計・人材", "gics": "資本財・サービス（商業・専門サービス）", "econ": "人の時間を売る労働集約型。稼働率・単価・レバレッジ（若手の比率）が利益を決める、ボーモルのコスト病（L4-16）の典型である。", "L": ["L4-16", "L6-05", "L6-06", "L4-15"], "S": ["S2-07", "S4-08", "S2-11", "S3-07"], "F": ["F1-12", "F1-02", "F5-10", "F6-13"], "kpi": ["稼働率", "1人あたり売上", "単価", "レバレッジ比率", "受注率"], "ai": {"cost": "調査・分析・資料作成・文書レビューの時間が大幅に減る。若手の作業の多くが対象になる。", "barrier": "時間課金と、若手を多く抱えるピラミッド型の利益構造が揺らぐ。成果報酬や製品化したサービスで新規参入が増える。", "data": "案件の知見・成果物・判断の記録。社内の知識基盤を持つファームが有利になる。"}, "uc": ["調査・分析", "資料作成", "契約書のレビュー", "監査手続き", "提案書の作成"], "agenda": ["時間課金から成果・価値に基づく課金へ、どの商品から移行するか？", "若手の育成の場が減る中で、どう専門家を育てるか（L5-15）？", "ジャギッド・フロンティアの外側の業務で、品質をどう守るか？"], "risk": "顧客の機密情報の入力、守秘義務、成果物の誤りに対する専門家としての責任。"}, {"id": "I11", "n": "公共・行政・教育", "sub": "国・自治体・学校・大学", "gics": "GICS外（公的部門）", "econ": "利益ではなく、公共の価値と説明責任で評価される。予算は単年度主義が多く、公平性と手続きの正統性が重視される。", "L": ["L3-07", "L5-11", "L5-10", "L3-13"], "S": ["S5-02", "S3-03", "S6-03"], "F": ["F5-18", "F3-10", "F5-06", "F5-12"], "kpi": ["手続きの処理時間", "住民・利用者の満足度", "職員1人あたり処理件数", "オンライン手続きの比率"], "ai": {"cost": "申請の審査・問い合わせ対応・文書作成など、定型的な行政事務の多くが対象になる。", "barrier": "調達制度と単年度予算が、継続的な改善を前提とするAIの導入を難しくする。", "data": "行政データは量が多いが、部門間で分断されている。連携の制度設計が鍵になる。"}, "uc": ["問い合わせ対応", "文書の作成・要約", "申請審査の支援", "教材の作成と個別学習の支援"], "agenda": ["職員が減る中で、どの行政サービスをAI前提で作り直すか？", "公平性と説明責任を保ちながら、AIによる判断の支援をどこまで使うか？"], "risk": "行政判断の説明責任、個人情報、教育でのAI利用（評価の公正さ、学習効果）。"}, {"id": "I12", "n": "商社・卸売", "sub": "総合商社・専門商社・卸", "gics": "資本財・サービス（商社・流通業者）", "econ": "取引の仲介・情報・信用・物流の機能で稼ぎ、事業投資で収益源を広げる。日本の総合商社は事業投資会社の性格が強い。", "L": ["L4-07", "L4-14", "L1-15", "L4-06"], "S": ["S6-06", "S5-05", "S6-02", "S6-03"], "F": ["F6-09", "F2-08", "F2-04"], "kpi": ["投下資本利益率（ROIC）", "取扱高", "持分法による投資損益", "事業の入れ替えの頻度"], "ai": {"cost": "受発注・貿易書類・与信管理などの事務処理。", "barrier": "AIで情報の非対称性が減り、仲介だけの機能は中抜きされやすくなる。", "data": "多くの産業と地域にまたがる取引データと関係網。投資先の経営改善にAIを横展開できる者が強い。"}, "uc": ["貿易書類の処理", "需給の予測", "投資先のデューデリジェンス支援", "営業情報の集約"], "agenda": ["仲介機能の価値が薄れる中で、どこに事業投資を振り向けるか？", "投資先の群れにAI活用を横展開する仕組みを、どう作るか？"], "risk": "制裁・輸出管理の確認、取引先の機密、多くの国の規制の適用。"}], "lenses": [{"id": "K1", "n": "AIコンサルタント", "role": "ユースケースの選定から全社展開・定着まで導く。技術の実現性と組織の受容性の両方を扱う。", "crit": ["事業インパクト×実現可能性でユースケースを序列化しているか", "PoC止まりを避ける設計になっているか", "業務プロセスに埋め込まれるか"], "core": ["F3-09", "F4-10", "F5-13", "F6-12", "L5-04", "L5-09", "F5-08", "L2-14"], "ask": ["そのユースケースの導入前の業務は、時間・件数・誤り率で定量化されているか？", "成功の定義は誰と合意済みで、どう測るか？"], "trap": ["技術デモの感動を業務価値と混同する", "全社展開を全部署同時展開と解釈する"], "check": ["CFO：効果測定と撤退ゲート", "アーキテクト：方式の過剰・過小", "セキュリティ：データの利用可否"]}, {"id": "K2", "n": "AIアーキテクト", "role": "要件を技術方式に翻訳し、拡張性・保守性・安全性・コストを満たす構造を決める。", "crit": ["最もシンプルな方式から検討したか", "非機能要件が数値で定義されているか", "モデルとベンダーを交換できるか"], "core": ["F4-11", "L6-14", "L6-07", "L1-11", "L1-12", "F5-15", "L6-11", "F3-11"], "ask": ["許容できる誤り率と、誤ったときの損害はいくらか？", "3年後にモデルが世代交代したとき、何を捨てて何が残る設計か？"], "trap": ["最新手法を要件より先に決める", "デモ環境の精度を本番の精度と同一視する"], "check": ["エンジニアリング：評価可能性と運用負荷", "CFO：3年の総保有コスト", "セキュリティ：脅威モデルと権限設計"]}, {"id": "K3", "n": "AIエンジニアリング", "role": "設計を、動き、測れ、運用できるシステムにする。中心は「書くこと」より「評価すること」。", "crit": ["評価が実装より先にあるか", "本番の観測（記録・失敗の収集）が設計されているか", "コストとレイテンシが要件に収まる見込みがあるか"], "core": ["F6-15", "F6-16", "L6-16", "L6-09", "L6-12", "L6-04", "L6-15", "L1-13"], "ask": ["「良い出力」の定義を評価コードで表現できるか？", "モデルやプロンプトを変えたとき、何を確認すればリリースしてよいか？"], "trap": ["数件の目視確認で「できた」と報告する", "LLMによる評価を較正せずに信頼する"], "check": ["アーキテクト：実測値を踏まえた方式の再考", "CFO：1処理あたり原価の実測値"]}, {"id": "K4", "n": "戦略コンサルタント", "role": "論点を構造化し、事実に基づく仮説検証で、経営の意思決定に耐える答えを出す。何をやらないかを決めさせる。", "crit": ["イシューは正しいか（答えると意思決定が変わるか）", "構造はMECEか", "競合や代替手段との比較で語られているか"], "core": ["F1-05", "F1-02", "S2-08", "F4-09", "L4-14", "S2-05", "F2-09", "F1-12"], "ask": ["この問いに答えると、誰の何の意思決定が変わるか？", "競合が同じ打ち手を取ったら、優位は残るか？"], "trap": ["フレームワークを埋めること自体が目的化する", "「市場は伸びる」を「自社が勝てる」と混同する"], "check": ["CFO：シナリオの財務成立性", "マーケ：顧客の比較軸の実態", "アーキテクト：技術前提の実現性"]}, {"id": "K5", "n": "営業スペシャリスト", "role": "価値を顧客の意思決定に変換する。正しい提案と、稟議が通る提案は別物だと知っている。", "crit": ["顧客の痛みは予算がつくほど実在するか", "意思決定のプロセスを把握しているか", "社内推進者（チャンピオン）を武装させているか"], "core": ["F5-10", "F5-11", "F5-12", "S3-07", "L2-04", "L2-16", "S4-07", "F6-11"], "ask": ["この案件が失注するとしたら、理由は何か？", "決裁者は誰で、その人の評価指標に提案はどう効くか？"], "trap": ["担当者の好感触を案件の確度と誤認する", "値引きで意思決定を買おうとする"], "check": ["CFO：価格・段階契約の採算", "マーケ：事例と反証コンテンツ", "AIコンサル：受注後の定着計画"]}, {"id": "K6", "n": "CFO・ファイナンス", "role": "すべての施策を資本コストと機会費用で審査する。夢を数字に翻訳させ、数字にならない前提を炙り出す。", "crit": ["投資対効果は検証できる形で定義されているか", "ユニットエコノミクスは規模とともに改善するか", "前提が2〜3割ぶれても判断は変わらないか"], "core": ["F6-09", "F6-10", "S6-03", "F3-07", "L4-11", "L6-15", "F6-13", "F3-08"], "ask": ["効果は誰の損益計算書のどの科目に、いつ、いくら現れるか？", "削減した工数は本当に削減されるのか（再配置の計画はあるか）？"], "trap": ["削減時間×時給を実際のコスト削減と同一視する", "PoCの費用だけを見て本番運用の総コストを見ない"], "check": ["エンジニアリング：単価と処理量の実測", "戦略：比較すべき代替投資", "営業：パイプラインの実態"]}, {"id": "K7", "n": "マーケティング", "role": "誰の、どんな課題の、唯一の解決策として認知されるかを設計する。選ばれる理由が明確な製品が売れる。", "crit": ["ポジショニングを一文で言えるか", "理想の顧客像は絞れているか", "メッセージは顧客の言葉か"], "core": ["F4-13", "F2-10", "F4-04", "F5-09", "S4-08", "L2-18", "S5-06", "L4-15"], "ask": ["顧客は購入前に何と比較し、その軸で勝てるか？", "「選ばない理由」の上位3つに、反証できるコンテンツはあるか？"], "trap": ["機能の一覧をメッセージと呼ぶ", "リード数をKPIにして商談化率を無視する"], "check": ["CFO：CACとLTVの比率", "営業：商談の現場で機能するか", "戦略：やらないことの決定との整合"]}, {"id": "K8", "n": "セキュリティ・ガバナンス", "role": "AIの導入・運用に伴うリスクを、事業の速度を殺さずに統制する。越えてはならない一線は明確に引く。", "crit": ["データの分類と流れが特定されているか", "リスクの大きさに応じた統制か（一律禁止も一律許可も放棄）", "統制が現場で回るか"], "core": ["F3-10", "F3-11", "F5-16", "F5-17", "F5-18", "L1-12", "F6-14", "L2-13"], "ask": ["このユースケースに入るデータの最高機密区分は何で、流してよい根拠は何か？", "取り返しのつかない操作の前に、人の承認はあるか？"], "trap": ["とりあえず全面禁止にして、シャドーAIを地下に潜らせる", "規程の整備を統制の実装と混同する"], "check": ["アーキテクト：ポリシーの技術的な実装", "AIコンサル：統制が現場で回るか", "CFO：統制コストの予算化"]}], "council": {"q": "全社の生成AIを「PoC止まり」から「定着」へ移すには、何から手を打つべきか", "exec": ["結論は条件付きで「灯台部門から全社へ」。全社一斉の展開は避け、評価と効果測定の仕組みを先に作り、3部門で業務への組み込みまで到達させてから横に広げる。", "最大の対立は、展開の速度と、統制・効果測定の厳密さの間にある。リスク区分ごとに審査の深さを変え、二層のKPIで判断することで両立させる。", "反証条件：灯台部門で6か月以内に継続利用が過半に届かなければ、ツールではなく業務設計の問題として対象業務を選び直す。"], "lenses": [{"k": "K1", "c": "壁は成熟度の「部門PoC→業務組込」の段差にあり、原因はツール層だけの施策にある。", "why": "定着には三層（ツール・プロセス・カルチャー）すべての施策が要る（F5-13）。普及は早期採用者から層ごとに進む（L5-04）。", "worry": "利用率だけを見て全社展開を判断すること。利用は増えても業務は変わっていない状態を見逃す。", "conf": "対象業務の導入前の状態（時間・件数・誤り率）は数字で残っているか。", "ids": ["F3-09", "F5-13", "L5-04", "F4-10"]}, {"k": "K2", "c": "全社共通の基盤は「RAG＋ワークフロー」で足りる用途が大半。エージェントは後でよい。", "why": "最もシンプルな方式から検討する原則（F4-11）。回答精度の上限は文書の質で決まる（L6-07）。", "worry": "社内文書の版管理が崩れたまま検索させ、誤った文書を根拠に答えること。エージェント化の先走り。", "conf": "対象データの所在、機密区分、更新の責任者は特定されているか。", "ids": ["F4-11", "L6-07", "L6-14", "L1-11"]}, {"k": "K3", "c": "評価セットのないPoCは、Go/No-Goを判定できない。判定できないPoCは失敗と同じである。", "why": "評価の三層（F6-15）とLLMOpsループ（F6-16）がなければ、改善は感想の言い合いになる。", "worry": "モデルの更新で、出力の癖に依存していた業務が黙って壊れること（L6-11）。", "conf": "本番での失敗は誰に、何時間で届くか。", "ids": ["F6-15", "F6-16", "L6-11", "L6-16"]}, {"k": "K4", "c": "「AI活用」は戦略ではない。競争の構造が変わる業務を選んで集中する。", "why": "AIで①コスト構造が変わる所、②参入障壁が溶ける所、③データと顧客接点の複利が効く所を特定する。利益は汎用品化しない層へ移る（L4-14）。", "worry": "全部門の効率化に予算が薄く分散し、差別化に効く業務に資源が集まらないこと。", "conf": "3年後の勝敗を分ける業務はどれか。", "ids": ["F4-09", "L4-14", "S2-10", "S2-08"]}, {"k": "K5", "c": "決裁者と現場の推進者が揃わない部門には、展開しない。", "why": "社内展開も案件と同じで、MEDDICの要素（F5-10）が欠ければ予算がつかない。小さく始めて広げる道筋を最初に描く（S3-07）。", "worry": "担当者の好感触を、定着の見込みと誤認すること。", "conf": "部門長の評価指標に、AIによる業務成果が入っているか。", "ids": ["F5-10", "F5-12", "S3-07", "L2-11"]}, {"k": "K6", "c": "「削減時間×時給」は効果として認めない。損益計算書の科目に着地する効果だけを、本番拡大の基準にする。", "why": "段階投資を実物オプションとして設計し（S6-03）、前提の感度を確かめる（F6-10）。利用が増えれば推論コストも増える（L4-11）。", "worry": "利用量の増加で推論コストが青天井になること。浮いた時間が再配置されず、コストに現れないこと。", "conf": "削減した時間の再配置計画、または外注費・残業代の削減計画はあるか。", "ids": ["S6-03", "F6-10", "L4-11", "L6-15"]}, {"k": "K7", "c": "社内の事例が最強のコンテンツになる。灯台部門の導入前後の変化を数字で発信する。", "why": "人は身近な人の行動に動かされる（L2-11）。成果を一文で言えない施策は広がらない（F4-13）。", "worry": "「AIを使おう」という抽象的な呼びかけと、機能の紹介だけの研修。", "conf": "現場の生の声（使わない理由の上位3つ）を集めているか。", "ids": ["L2-11", "F4-13", "L2-15", "F5-09"]}, {"k": "K8", "c": "一律の禁止はシャドーAIを生む。リスクの区分ごとに統制の重さを変える。", "why": "リスクベースの分類（F3-10）と、管理の仕組みとしての運用（F5-17）。防護は重ねて設計する（L1-12）。", "worry": "審査が承認の関所になり、現場の速度を殺して統制の外での利用を増やすこと。", "conf": "ユースケースの審査には何日かかり、低リスクの用途は即日使えるか。", "ids": ["F3-10", "F5-17", "F5-15", "L1-12"]}], "conflicts": [{"a": "K6", "b": "K1", "t": "効果の測り方", "d": "CFOは損益に着地する効果しか認めないが、AIコンサルは定着の先行指標（継続利用・業務への組み込み率）を重視する。定着の初期には損益の効果はまだ出ない。", "r": "二層のKPIにする。先行指標で段階の関門を通し、損益の指標で本番の拡大を判断する。"}, {"a": "K8", "b": "K5", "t": "審査の厳格さと展開の速度", "d": "セキュリティは全ユースケースの事前審査を求め、営業（社内推進）は推進者の熱が冷める前に動かしたい。", "r": "リスク区分で審査の深さを変える。最小リスクの用途は事前に許可した一覧の範囲で即日使い、高リスクの用途だけを個別に審査する。"}, {"a": "K4", "b": "K1", "t": "どの業務から始めるか", "d": "戦略は差別化に効く難しい業務への集中を求め、AIコンサルは成功確率の高い容易な業務から始めたい。", "r": "二本立てにする。容易な業務で裾野を広げつつ、差別化に効く業務で灯台を作る。予算は70-20-10（S6-05）の考え方で明示的に配分する。"}, {"a": "K2", "b": "K5", "t": "見せ方と作り方", "d": "推進者は経営陣に響くエージェントのデモを求め、アーキテクトはワークフローで十分だと主張する。", "r": "デモと本番を分ける。デモはエージェントで将来像を示し、本番はワークフローから始め、評価の結果を見て自律性を上げる。"}], "synthesis": ["決裁者と推進者が揃う3部門を灯台に選ぶ（F5-12、F5-10）。", "PoCの開始前に、評価セット、Go/No-Goの基準、撤退の条件を合意する（F6-15、F6-12）。", "先行指標（継続利用・業務への組み込み率）と成果指標（損益の科目）の二層で判断する（F5-09、F6-09）。", "リスク区分ごとに審査の深さを変え、低リスクの用途は即日使えるようにする（F3-10、F5-14）。", "業務手順書と人事評価にAI活用を書き込む（F5-13）。", "灯台部門の導入前後の数字で横展開する（L2-11、S3-07）。"], "assumptions": ["対象は従業員数千人規模の日本の大企業で、全社向けの対話型AIは配布済み（成熟度は個人利用から部門PoCの段階）。", "AIで浮いた時間は人員削減ではなく、再配置に使う方針。", "機密データの区分は規程上存在するが、運用は徹底されていない（保守的な側に倒した）。", "「6か月」「3部門」は判断の目安として置いた仮定値で、実証された数字ではない。"], "falsify": ["灯台部門で6か月以内に継続利用が過半に届かない場合、ツールではなく業務設計の問題として、対象業務を選び直す。", "推論コストが効果を上回る場合、プロンプトの圧縮、キャッシュ、安価なモデルへのタスク分割を先に行う。", "取引先や規制当局からの要求で高リスクの用途が増えた場合、統制の重みを上げ、展開の速度を落とす。"], "next": ["灯台候補の部門長と推進者の特定（2週間）", "対象業務の導入前の数値の計測", "評価セット20〜50件の作成"]}, "items": [{"id": "L1-01", "n": "パレートの法則", "en": "Pareto principle", "by": "V.パレート（観察）／J.ジュラン（一般化）", "y": "1896／1940年代", "g": "C", "m": ["M1"], "r": ["L1-02", "S6-01", "S1-03"], "d": "結果の大半は、少数の要因から生じる。典型として「8割の結果を2割の要因が生む」と表される。", "s": "顧客・製品・不具合の上位を特定し、経営資源を「重要な少数」に集中させる。", "c": "80:20は目安で、比率は対象次第。残り8割を切り捨てると将来の芽を失うことがある。", "ai": "生成AIの利用も一部の業務に集中する。全社展開の前に、利用が偏る高頻度業務へ先に当てると効く。", "ask": "工数の大半を占める業務の上位三つはどれか？"}, {"id": "L1-02", "n": "ファットテール（べき乗則）", "en": "Fat-tailed distribution", "by": "B.マンデルブロ（1963）／N.タレブ（2007）", "y": "1963／2007", "g": "A", "m": ["M1", "M4"], "r": ["L1-01", "L1-04", "S6-02", "F6-06", "L4-12"], "d": "極端な事象の起きる確率が、正規分布の想定より桁違いに高い分布。少数の外れ値が全体を支配する。", "s": "平均値ではなく、最悪の下振れと最大の上振れで意思決定する。ヒット作、災害、ベンチャー投資のリターンはこの世界にある。", "c": "「べき乗則」と主張された分布の多くは、厳密には別の裾の重い分布だとする検証がある（Clauset他 2009）。裾が重いという結論自体は変わらない。", "ai": "AIの成果は一部の用途に偏り、多くの試行は空振りになる。大当たりを取り逃さない試行の本数が要る。", "ask": "桁違いの成果が出うるAIの賭けを、何本持っているか？"}, {"id": "L1-03", "n": "複利（指数的成長）", "en": "Compound interest", "by": "72の法則：L.パチョーリ（1494）", "y": "1494", "g": "S", "m": ["M1", "M5"], "r": ["L5-05", "L5-08"], "d": "成長分が元本に上乗せされ、時間とともに加速する。72を成長率（%）で割ると、倍増にかかる年数の近似になる。", "s": "学習、信頼、顧客基盤、データなど、複利で効く資産に早く投資し、途切れさせない。", "c": "現実の指数的成長はいずれ制約に突き当たり、S字に変わる（L5-05）。", "ai": "業務データと運用ノウハウは使うほど溜まり、モデルが入れ替わっても残る複利の資産になる。", "ask": "AIの利用で積み上がる自社固有の資産は、何が記録されているか？"}, {"id": "L1-04", "n": "大数の法則", "en": "Law of large numbers", "by": "J.ベルヌーイ", "y": "1713", "g": "S", "m": ["M4"], "r": ["L1-02", "L1-05", "S6-02"], "d": "試行の回数を増やすほど、結果の平均は期待値に近づく。", "s": "個別の勝敗ではなく、試行の数で勝つ。保険、投資ポートフォリオ、A/Bテストはこの原理の上にある。", "c": "裾の重い分布では収束が極めて遅く、少ない回数の成績では判断できない（L1-02）。", "ai": "AIの出力品質は一度の試験では判定できない。大量の実行ログで平均精度とばらつきを測る。", "ask": "AIの品質判定は、何件の実運用ログに基づいているか？"}, {"id": "L1-05", "n": "平均への回帰", "en": "Regression toward the mean", "by": "F.ゴルトン", "y": "1886", "g": "S", "m": ["M4", "M6"], "r": ["L2-09", "L1-04"], "d": "偶然の要素を含む成績は、極端な値が出た次の回には平均に近づきやすい。", "s": "好業績直後の失速や、不振の後の回復を、施策や担当者の手腕に誤って帰属させない。", "c": "「叱ったら伸び、褒めたら落ちた」の多くはこの錯覚。施策の効果は比較対照群で測る。", "ai": "PoCの好成績は、条件の良い案件が選ばれた偶然を含む。本番拡大後に数字が落ちる前提で見る。", "ask": "PoCの好成績は、案件選びの偏りを除いても再現するか？"}, {"id": "L1-06", "n": "フィードバック・ループ", "en": "Feedback loop", "by": "J.フォレスター（1961）／D.メドウズ（2008）", "y": "1961", "g": "S", "m": ["M2", "M5"], "r": ["L4-05", "L3-07", "F6-04"], "d": "結果が原因に戻って作用する構造。雪だるま式に増幅する自己強化型と、元に戻そうとする均衡型がある。", "s": "問題を個別の出来事ではなく構造で捉え、好循環の起点と悪循環の遮断点に手を打つ。", "c": "作用に時間の遅れがあると、過剰反応と振動が起きる（サプライチェーンのブルウィップ効果）。", "ai": "利用が増えて精度が上がる好循環も、不信が離脱を呼ぶ悪循環も、AIでは速く回る。", "ask": "AI利用の好循環と悪循環、それぞれの起点は何か？"}, {"id": "L1-07", "n": "最小律（ボトルネック）", "en": "Liebig's law of the minimum", "by": "C.シュプレンゲル（1828）／J.リービッヒ（1840）", "y": "1828／1840", "g": "S", "m": ["M3"], "r": ["F5-05", "F5-03", "S5-03", "L4-02"], "d": "全体の成果は、最も不足している要素（制約）によって決まる。", "s": "全体の平均的な底上げより、制約となっている一点の解消が成果を動かす。", "c": "制約は解消すると別の場所へ移動する。農学の原型は近似則だが、直列工程の処理能力については数学的に成り立つ。", "ai": "AI導入ではモデル性能より、データ整備や承認手続きが制約になりやすい。速くなった工程の次で詰まる。", "ask": "AIで速くなった工程の次に、今いちばん滞留している工程はどこか？"}, {"id": "L1-08", "n": "エントロピー増大の法則", "en": "Second law of thermodynamics", "by": "R.クラウジウス", "y": "1865", "g": "S", "m": ["M5"], "r": ["L1-06"], "d": "閉じた系の無秩序さ（エントロピー）は、自然には減少しない。", "s": "組織・業務・データの秩序は、放置すれば劣化する。保守と更新に継続的なエネルギーを配分する。", "c": "物理法則としては確立しているが、組織への適用は比喩である。比喩に物理法則の確かさを持ち込まない。", "ai": "プロンプトやナレッジ、エージェント設定は放置すると陳腐化する。AI資産にも運用担当と更新予算が要る。", "ask": "導入済みAIの棚卸しと更新を担う責任者は誰か？"}, {"id": "L1-09", "n": "必要多様性の法則", "en": "Law of requisite variety", "by": "W.R.アシュビー", "y": "1956", "g": "S", "m": ["M7"], "r": ["F6-07", "L3-11", "S5-02"], "d": "制御する側は、制御される対象と同等以上の多様性を持たなければならない。", "s": "複雑な環境は、本社の一律な規則では統制しきれない。現場への権限移譲や多様な人材で応答の幅を持つ。", "c": "サイバネティクスの定理を組織に当てはめるのは類推である。多様性にはコストがかかる。", "ai": "エージェントは現場ごとの例外に合わせて動ける。本社の一律ルールを足すより、現場の判断を支える道具にする。", "ask": "現場の例外処理のうち、本社ルールで吸収できていない領域はどこか？"}, {"id": "L1-10", "n": "ゴールの法則", "en": "Gall's law", "by": "J.ゴール", "y": "1975", "g": "C", "m": ["M5", "M7"], "r": ["S3-03", "S6-03", "L2-08"], "d": "うまく動く複雑なシステムは、例外なく、うまく動いていた単純なシステムから進化したものである。", "s": "全社一斉の大規模設計より、小さく動くものを作って育てる。", "c": "規制対応やインフラの全面刷新など、段階的な移行が難しい領域もある。", "ai": "巨大な全社AI基盤の構想より、一つの業務で動くエージェントを育てて横に広げる方が成功しやすい。", "ask": "来月に現場で動かせる、最小のAI業務は何か？"}, {"id": "L1-11", "n": "ルッサーの法則（直列システムの信頼性）", "en": "Lusser's law", "by": "R.ルッサー", "y": "1950年代", "g": "S", "m": ["M1", "M3"], "r": ["L1-12", "F5-15", "L6-10"], "d": "部品が直列につながったシステムの信頼性は、各部品の信頼性の積になる。各工程が95%でも、20工程つなぐと全体は約36%に落ちる。", "s": "工程を増やすほど、全体の失敗率は指数的に増える。工程数を減らし、要所に検査と回復の仕組みを置く。", "c": "工程間で失敗が独立しているという前提に立つ。並列の冗長化を入れれば信頼性は上がる。", "ai": "多段のAIエージェントは、各ステップの精度が高くても通しの成功率が急落する。ステップ数の削減と中間の検証が設計の要になる。", "ask": "この業務は何工程で、各工程の成功率を掛け合わせると何%になるか？"}, {"id": "L1-12", "n": "スイスチーズモデル", "en": "Swiss cheese model", "by": "J.リーズン", "y": "1990", "g": "C", "m": ["M3", "M4"], "r": ["L1-11", "F6-14", "F5-15"], "d": "事故は、複数の防護層それぞれにある穴（欠陥）が、たまたま一直線に並んだときに起きる。", "s": "完璧な単一の対策より、性質の異なる不完全な防護を重ねる。事故の分析では、最後に触れた個人より、穴が並んだ構造を見る。", "c": "防護層同士が同じ前提に依存していると、穴は同時に開く。層の独立性を確かめる。", "ai": "AIの安全対策は、入力の検査・権限の制限・出力の検査・人の承認を重ねて設計する。どれか一枚に頼る設計は破られる。", "ask": "誤った出力が顧客に届くまでに、独立した防護は何層あり、それぞれの穴は何か？"}, {"id": "L1-13", "n": "アムダールの法則", "en": "Amdahl's law", "by": "G.アムダール", "y": "1967", "g": "S", "m": ["M3"], "r": ["L1-07", "F5-05", "L1-14"], "d": "処理の一部だけを高速化しても、全体の速度向上は、高速化できない部分の割合で頭打ちになる。", "s": "業務の8割を自動化しても、残る2割が変わらなければ、全体は最大でも5倍速にしかならない。残る部分を見て投資を決める。", "c": "元は並列計算の理論である。業務への適用では、自動化によって工程そのものが組み替わる効果を別に考える。", "ai": "AIで作業時間を短縮しても、承認待ちや人の確認が残れば、全体のリードタイムは縮まらない。人が介在する逐次部分が上限を決める。", "ask": "AIで速くできない工程（承認・確認・待ち）は、全体の何割か？"}, {"id": "L1-14", "n": "リトルの法則", "en": "Little's law", "by": "J.リトル", "y": "1961", "g": "S", "m": ["M3", "M5"], "r": ["L1-13", "F5-05"], "d": "安定した仕組みでは、仕掛かり中の量＝処理の速さ×1件あたりの滞在時間、が成り立つ。", "s": "リードタイムを短くするには、処理能力を上げるか、同時に抱える案件数（仕掛かり）を減らす。仕掛かり制限の理論的根拠になる。", "c": "流入と流出が釣り合った定常状態で成り立つ。", "ai": "AIで処理件数が増えても、仕掛かりが積み上がればリードタイムは伸びる。AIの導入時は、仕掛かりの上限管理もセットにする。", "ask": "いま同時に抱えている案件は何件で、それを半分にするとリードタイムはどうなるか？"}, {"id": "L1-15", "n": "累積的優位（マタイ効果）", "en": "Matthew effect", "by": "R.K.マートン（1968）／A.-L.バラバシ & R.アルバート（1999）", "y": "1968／1999", "g": "B", "m": ["M1", "M2"], "r": ["L4-15", "L4-05", "S2-10"], "d": "すでに多くを持つ者ほど、さらに多くを得やすい。評判・つながり・資源が、自己強化的に集中していく。", "s": "初期の小さな優位が、後に大きな差になる。初期の実績と評判の獲得に資源を集中させる価値がある。", "c": "偶然の初期差が、実力の差と誤認されやすい。実力の評価と運の要素を分けて見る。", "ai": "利用データと評判が集まるAIサービスほど改善が速く、さらに選ばれる。AI人材も実績のある組織に集まりやすい。", "ask": "自社が早期に先行できる評判や実績はどこにあり、それを複利で回す仕組みはあるか？"}, {"id": "L1-16", "n": "ベンフォードの法則", "en": "Benford's law", "by": "S.ニューカム（1881）／F.ベンフォード（1938）", "y": "1881／1938", "g": "A", "m": ["M4"], "r": ["L1-17", "L4-07"], "d": "桁が広く分布する多くの実データでは、先頭の数字が1である割合が約30%と最も多く、9は約5%にとどまる。", "s": "会計データや経費精算の先頭の数字の分布を調べ、不自然な偏りから、不正や入力ミスの兆候を見つける。", "c": "範囲の狭いデータや、人が決めた数値（価格、番号）には当てはまらない。", "ai": "AIを使った監査の異常検知で、最初にかける簡易な検査として使える。人為的に作られた数値の検出にも効く。", "ask": "経費や取引のデータについて、先頭の数字の分布を最後に確認したのはいつか？"}, {"id": "L1-17", "n": "シンプソンのパラドックス", "en": "Simpson's paradox", "by": "U.ユール（1903）／E.シンプソン（1951）", "y": "1903／1951", "g": "S", "m": ["M4", "M6"], "r": ["L1-05", "F3-06"], "d": "集団全体で見た傾向が、部分集団に分けると逆転することがある。原因は構成比の違いにある。", "s": "全社平均の改善や悪化を、セグメント別に分けてから判断する。構成比の変化（ミックス）と、各セグメントの変化を分ける。", "c": "どの切り口で分けるべきかは因果の構造で決まり、データだけでは決まらない。", "ai": "AI導入の効果を全社平均で測ると、利用者の構成の偏りで、効果が逆に見えることがある。部門や習熟度ごとに分けて測る。", "ask": "その平均値は、どの切り口で分けても同じ傾向を示すか？"}, {"id": "L2-01", "n": "限定合理性", "en": "Bounded rationality", "by": "H.サイモン", "y": "1947／1957", "g": "A", "m": ["M6"], "r": ["L2-04", "F1-05"], "d": "人は情報・時間・処理能力の制約の中で、最適ではなく「満足できる」解を選ぶ。", "s": "意思決定者の注意は最も希少な資源である。選択肢・指標・会議を絞る設計が成果を左右する。", "c": "「非合理」ではなく、制約下での合理である。人を責めるより環境を設計して改善する。", "ai": "AIは選択肢を増やせるが、候補が多すぎると役員の判断負荷は上がる。AIには絞り込んだ形で返させる。", "ask": "役員会に上がるAI関連の判断事項は、いくつに絞れているか？"}, {"id": "L2-02", "n": "損失回避（プロスペクト理論）", "en": "Loss aversion", "by": "D.カーネマン & A.トヴェルスキー", "y": "1979", "g": "A", "m": ["M4", "M6"], "r": ["L2-06", "F5-07", "S4-07"], "d": "同じ額でも、利得より損失を強く感じる（目安で約2倍）。価値は絶対額ではなく、参照点からの変化で判断される。", "s": "変革は「得るもの」よりも「失うもの」によって抵抗される。失うものへの手当てと、現状維持の損失の可視化が要る。", "c": "19か国の追試で主要なパターンは再現された（Ruggeri他 2020）。ただし係数は文脈で変わり、普遍性への反論もある（Gal & Rucker 2018）。", "ai": "AI導入は仕事を失う損失として受け止められ、抵抗を生む。役割の再定義を先に示す必要がある。", "ask": "AI導入で現場が失うと感じているものは何か？"}, {"id": "L2-03", "n": "確証バイアス", "en": "Confirmation bias", "by": "P.ウェイソン（1960）ほか", "y": "1960", "g": "A", "m": ["M6"], "r": ["F1-05", "F6-05", "L3-09"], "d": "自分の仮説を支持する情報ばかりを集め、反する情報を軽視する。", "s": "仮説思考とは表裏一体。反証を探す役割（レッドチーム、プレモーテム）を制度として組み込む。", "c": "知識や経験が豊富な人ほど自信と結びつき、かえって強まることがある。", "ai": "AIは問いの向きに沿った根拠を返しやすく、仮説の確証に使うと偏りを増幅する。反証を出させる運用が要る。", "ask": "自分の仮説を否定する根拠をAIに探させる手順は、あるか？"}, {"id": "L2-04", "n": "アンカリング", "en": "Anchoring", "by": "A.トヴェルスキー & D.カーネマン", "y": "1974", "g": "A", "m": ["M6"], "r": ["S4-07", "L2-08"], "d": "最初に示された数値が基準点となり、その後の判断を強く引き寄せる。", "s": "交渉・予算・価格では、最初の数字を誰が出すかが結果を動かす。社内計画の「前年比」も強い錨になる。", "c": "判断と無関係な数値でも効果がある。見積もりは複数の独立した基準から作る。", "ai": "AIが出した初案の数字や構成が錨になり、人の検討はそこから離れにくい。初案を見せる順序を設計する。", "ask": "AIの初案を見る前に、人が自分の見立てを出しているか？"}, {"id": "L2-05", "n": "サンクコスト効果", "en": "Sunk cost effect", "by": "H.アークス & C.ブルーマー", "y": "1985", "g": "B", "m": ["M4", "M6"], "r": ["S6-03", "S4-05"], "d": "回収できない過去の投資を理由に、損の出ている案件を続けてしまう。", "s": "継続の判断は「これから投じる分」と「これから得る分」だけで行う。撤退基準は開始前に決めておく。", "c": "効果の大きさは研究ごとにばらつく。評判や学習価値など、正当な継続理由との区別が要る。", "ai": "投じたAI開発費やライセンス料を理由に、成果の出ないツールを使い続けがちになる。撤退条件を契約前に置く。", "ask": "成果の出ないAIツールを止める基準は、契約前に決めたか？"}, {"id": "L2-06", "n": "現状維持バイアス", "en": "Status quo bias", "by": "W.サミュエルソン & R.ゼックハウザー", "y": "1988", "g": "A", "m": ["M6"], "r": ["L2-02", "F5-06", "F5-08"], "d": "変更したほうが合理的でも、現状や初期設定（デフォルト）を選びやすい。", "s": "望ましい行動を初期設定にすると普及が進む（臓器提供の意思表示方式の研究：Johnson & Goldstein 2003）。", "c": "初期設定の力は強いため、透明性と選択の自由を確保して使う。", "ai": "任意利用のままAIは広がらない。業務の標準手順にAIを組み込むことが、普及の速さを決める。", "ask": "AIの利用を初期設定にした業務は、いくつあるか？"}, {"id": "L2-07", "n": "双曲割引（現在バイアス）", "en": "Hyperbolic discounting", "by": "G.エインズリー（1975）／D.レイブソン（1997）", "y": "1975／1997", "g": "B", "m": ["M5", "M6"], "r": ["S4-05", "F4-03"], "d": "目先の利得を不釣り合いに重く見て、先にある大きな利得を過小評価する。", "s": "中長期の投資は四半期の評価に負けやすい。予算の別枠化など、事前の約束（コミットメント）で守る。", "c": "現在を重視する傾向自体は頑健だが、厳密に双曲線の形かどうかには議論がある。", "ai": "AI定着の投資は成果が出るまで時間がかかり、四半期の数字に負けやすい。人材育成枠を別建てで守る。", "ask": "AI定着の予算は、四半期の削減圧力から守られているか？"}, {"id": "L2-08", "n": "計画錯誤", "en": "Planning fallacy", "by": "D.カーネマン & A.トヴェルスキー", "y": "1979", "g": "A", "m": ["M6"], "r": ["F6-05", "S6-03", "L1-10"], "d": "自分の計画に要する時間と費用を、楽観的に少なく見積もる。", "s": "内部の積み上げではなく、類似案件の実績の分布から見積もる（参照クラス予測）。", "c": "余裕を見込んだ計画にも同じ錯誤が働く。ホフスタッターの法則は「それを考慮しても、予定より長くかかる」と表現した。", "ai": "AI導入の期間と費用は、データ整備や業務調整を見落として過小に見積もられやすい。類似案件で補正する。", "ask": "過去の類似システム導入は、計画に対してどれだけ超過したか？"}, {"id": "L2-09", "n": "生存者バイアス", "en": "Survivorship bias", "by": "A.ウォールド", "y": "1943", "g": "S", "m": ["M4", "M6"], "r": ["L1-05", "S2-06"], "d": "生き残った事例だけを見て、消えた事例を見落としたまま結論を出す。", "s": "成功企業の共通点や成功談の教訓は、同じことをして消えた企業と比べるまで信用しない。", "c": "帰還した爆撃機の被弾箇所ではなく、被弾していない箇所を補強すべきだ、という分析が原点。", "ai": "公開されるAI成功事例は選ばれた成功例で、止まった導入は語られない。事例の裏にある失敗を探す。", "ask": "参考にしたAI事例の裏で、止まった案件はどれだけあったか？"}, {"id": "L2-10", "n": "ダニング＝クルーガー効果", "en": "Dunning-Kruger effect", "by": "J.クルーガー & D.ダニング", "y": "1999", "g": "D", "m": ["M6"], "r": ["L1-05", "F3-02"], "d": "能力の低い人ほど、自分の能力を過大に評価しやすい、とされる効果。", "s": "自己評価だけで人材や組織能力を判断しない。客観的なフィードバックの仕組みを持つ。", "c": "平均への回帰などの統計的な性質で大部分を説明できるという批判がある。よく見る「馬鹿の山」の曲線は原論文にない。", "ai": "生成AIは流暢な出力で、使い手の自己評価を実力以上に押し上げる。成果物を第三者が検証する仕組みが要る。", "ask": "AIを使った成果物の品質を、誰が独立に確認しているか？"}, {"id": "L2-11", "n": "影響力の原理", "en": "Principles of persuasion", "by": "R.チャルディーニ", "y": "1984", "g": "B", "m": ["M6", "M8"], "r": ["L5-04", "F5-07"], "d": "人は返報性・一貫性・社会的証明・好意・権威・希少性に反応して動く（2016年に一体性を追加）。", "s": "社内の変革でも、身近な早期採用者の事例（社会的証明）と小さな公約（一貫性）が効く。", "c": "効果は文脈に左右される。操作的に使えば信頼を失う。", "ai": "AI定着には、同僚が使って成果を出した実例が最も効く。早期利用者の実演を社内で広げるのが近道になる。", "ask": "社内で最初にAIで成果を出した人を、他部署に紹介したか？"}, {"id": "L2-12", "n": "自己決定理論", "en": "Self-determination theory", "by": "E.デシ & R.ライアン", "y": "1985", "g": "A", "m": ["M6"], "r": ["F5-08", "F5-01"], "d": "自律性・有能感・関係性の3つが満たされると、内発的な動機づけが高まる。", "s": "報酬で行動を買うより、裁量・成長の実感・仲間を設計する。定型的でない仕事では、金銭的な誘因が逆効果になることがある。", "c": "外発的な報酬が常に悪いわけではない。仕事の性質によって使い分ける。", "ai": "AIが定型作業を引き取ると、人に残る裁量と成長実感が動機を左右する。空いた時間の使い道を示す。", "ask": "AIで空いた時間に、社員が挑める裁量ある仕事は何か？"}, {"id": "L2-13", "n": "自動化バイアス", "en": "Automation bias", "by": "K.モジャー & L.スキトカ ほか", "y": "1996〜", "g": "B", "m": ["M6"], "r": ["L2-14", "F5-15", "L5-15"], "d": "自動化された支援の出力を過信し、誤りを見逃したり、自分の判断を手放したりする。", "s": "人による確認を置いても、形だけになりやすい。確認の手順と責任を具体的に設計する。", "c": "疲労や時間の圧力が強いほど強まる。逆にAIを避けすぎる傾向（L2-14）もある。", "ai": "人の承認を挟む設計では、承認率が100%に近づいたら形骸化を疑う。誤りを混ぜた抜き打ちの検査で、確認の実効性を測る。", "ask": "AIの出力を人が差し戻した割合は何%で、それは妥当な水準か？"}, {"id": "L2-14", "n": "アルゴリズム嫌悪", "en": "Algorithm aversion", "by": "B.ディートヴォルスト, J.シモンズ & C.マッセイ", "y": "2015", "g": "B", "m": ["M6"], "r": ["L2-13", "L2-15", "L5-04"], "d": "人は、アルゴリズムが一度誤るのを見ると、人間より正確であっても、それを使うのを避けるようになる。", "s": "導入初期の失敗を目立たせない設計と、結果を人が少し調整できる余地を残すと、利用が定着しやすい（Dietvorst他 2018）。", "c": "逆に、アルゴリズムの助言を人の助言より好む傾向を示した研究もある（Logg他 2019）。状況によって向きが変わる。", "ai": "AIの一度の失敗が社内で語り継がれると、定着が止まる。失敗の共有と改善の見える化をセットで運用する。", "ask": "現場でAIが「使えない」と言われた具体的な事例は何で、それは今も起きるか？"}, {"id": "L2-15", "n": "IKEA効果", "en": "IKEA effect", "by": "M.ノートン, D.モション & D.アリエリー", "y": "2012", "g": "B", "m": ["M6"], "r": ["L2-14", "F5-13"], "d": "人は自分で手を加えて作ったものを、同じ品質の既製品より高く評価する。", "s": "現場が自ら作り込みに参加した仕組みほど、使われ、守られる。", "c": "作った本人の評価は甘くなる。品質の評価は第三者が行う。", "ai": "社内AIの定着には、現場が自分でプロンプトやワークフローを作る場を設けると効く。完成品を配るだけでは使われにくい。", "ask": "現場の社員が、自分の手でAIの使い方を作った経験はあるか？"}, {"id": "L2-16", "n": "フレーミング効果", "en": "Framing effect", "by": "A.トヴェルスキー & D.カーネマン", "y": "1981", "g": "A", "m": ["M6", "M4"], "r": ["L2-02", "F4-13"], "d": "同じ内容でも、表現の仕方（得をする枠か、損をする枠か）によって、選択が変わる。", "s": "同じ提案でも、「避けられる損失」として示すか「得られる利益」として示すかで、承認されやすさが変わる。", "c": "意図的な誘導は信頼を損なう。重要な判断では、両方の枠で示す。", "ai": "AIへの指示の枠組みでも出力は変わる。評価や比較では、同じ問いを複数の言い回しで確かめる。", "ask": "この提案は、損失を避ける枠と利益を得る枠のどちらで示すと、決裁者に響くか？"}, {"id": "L2-17", "n": "認知負荷理論", "en": "Cognitive load theory", "by": "J.スウェラー", "y": "1988", "g": "B", "m": ["M6"], "r": ["L2-01", "F1-03"], "d": "作業記憶の容量は小さく、学習や作業に関係のない負荷が増えると、理解と成果が落ちる。", "s": "資料・画面・手順から余計な情報を削り、一度に扱う要素を絞る。研修は段階的に積み上げる。", "c": "熟練者には、初心者向けの丁寧な支援がかえって負荷になる（熟達化の逆転効果）。", "ai": "AIの出力が長く網羅的すぎると、判断が遅くなる。要約の粒度と出す順番を、業務に合わせて設計する。", "ask": "現場の担当者は、一つの判断のためにいくつの画面と資料を見ているか？"}, {"id": "L2-18", "n": "ピーク・エンドの法則", "en": "Peak-end rule", "by": "D.カーネマン他", "y": "1993", "g": "B", "m": ["M6"], "r": ["F2-06", "F2-07"], "d": "人は経験全体を、最も強く感情が動いた瞬間（ピーク）と、最後（エンド）の印象で評価する。", "s": "顧客体験は、全行程を均等に磨くより、山場と終わり方に投資する。", "c": "記憶に基づく評価の話であり、その場その場の満足度の総和とは一致しない。", "ai": "AI窓口の評価は、最後に人へ引き継ぐ場面の印象で決まりやすい。引き継ぎと締めくくりの体験を重点的に設計する。", "ask": "顧客の体験で、最も感情が動く瞬間と最後の接点はどこか？"}, {"id": "L2-19", "n": "保有効果", "en": "Endowment effect", "by": "R.セイラー（1980）／D.カーネマン, J.クネッチ & R.セイラー（1990）", "y": "1980／1990", "g": "B", "m": ["M6", "M4"], "r": ["L2-06", "L2-05"], "d": "人は、すでに持っているものを、持っていない同じものより高く評価する。", "s": "無料の試用で一度「自分のもの」にしてもらうと、手放しにくくなる。逆に、自社の既存の資産や事業も過大に評価しやすい。", "c": "実験の条件によって効果が消えるとの反論がある（Plott & Zeiler 2005）。", "ai": "現場は慣れた業務手順を手放したがらない。AI化では、旧手順の価値を一度きちんと認めてから移行する。", "ask": "自社が手放せずにいる事業や手順は、他社が持っていたら買うだろうか？"}, {"id": "L3-01", "n": "パーキンソンの法則", "en": "Parkinson's law", "by": "C.N.パーキンソン", "y": "1955", "g": "C", "m": ["M3", "M6"], "r": ["L2-08", "F5-01"], "d": "仕事の量は、完了までに与えられた時間をすべて満たすまで膨張する。", "s": "締切と予算は「必要な量」ではなく「上限」として機能する。短い期限と小さな枠で設計する。", "c": "原典は英『エコノミスト』誌の風刺エッセイで、厳密な実証ではない。", "ai": "AIで作業が短縮されても期限が据え置かれると、浮いた時間は別の作業に吸収される。短縮分を成果へ変える設計が要る。", "ask": "AIで短縮した工数は、どこへ再配分すると決めたか？"}, {"id": "L3-02", "n": "ピーターの法則", "en": "Peter principle", "by": "L.J.ピーター", "y": "1969", "g": "B", "m": ["M7"], "r": ["L3-10"], "d": "階層組織では、人は自分が無能になる地位まで昇進する。", "s": "昇進の基準を「現職での成果」ではなく「次の役割への適性」で設計し、専門職としての昇進の道も用意する。", "c": "風刺として書かれたが、営業職の人事データで支持する実証研究がある（Benson, Li & Shue 2019）。", "ai": "AIを使いこなす力と管理職の力は別物。AI活用の達人をそのまま管理職に上げると、適性を外す恐れがある。", "ask": "AI活用の達人を、管理職以外でどう処遇するか？"}, {"id": "L3-03", "n": "ブルックスの法則", "en": "Brooks's law", "by": "F.ブルックス", "y": "1975", "g": "C", "m": ["M3", "M1"], "r": ["L1-07", "L3-06"], "d": "遅れているソフトウェア開発プロジェクトに人員を追加すると、さらに遅れる。", "s": "新メンバーの立ち上げと、人数の2乗に近い速さで増える調整コストが原因。遅延時は人を足すより範囲（スコープ）を削る。", "c": "作業を分割しやすい場合や、早い段階での増員では当てはまらないこともある。", "ai": "遅れたAI案件は、人を足すより範囲を絞り、モデルとデータの前提を固める方が早く動く。", "ask": "遅れているAI案件で、削れる範囲はどこか？"}, {"id": "L3-04", "n": "コンウェイの法則", "en": "Conway's law", "by": "M.コンウェイ", "y": "1968", "g": "B", "m": ["M7"], "r": ["L3-10", "F3-03", "S2-05"], "d": "システムの設計は、それを作る組織のコミュニケーション構造を写したものになる。", "s": "望むシステムの構造に合わせて、先に組織を設計する（逆コンウェイ戦略）。全社のデータ基盤も組織の縦割りを写す。", "c": "製品と組織の構造の対応（ミラーリング仮説）は、実証研究で概ね支持されている（MacCormack他 2012）。", "ai": "AIエージェントの連携は部門の縦割りをそのまま写す。部門をまたぐ業務は、組織の接点から先に設計する。", "ask": "AIが部門をまたぐ業務の境界で、責任を持つ部署はどこか？"}, {"id": "L3-05", "n": "ダンバー数", "en": "Dunbar's number", "by": "R.ダンバー", "y": "1992", "g": "B", "m": ["M6", "M3"], "r": ["L3-06", "L3-10"], "d": "人が安定した社会関係を維持できる人数には認知的な上限があり、約150人とされる。", "s": "150人前後を超えると、顔の見える非公式な調整が効かなくなり、制度・階層・組織分割が必要になる。", "c": "推定の信頼区間が極めて広いとの再分析がある（Lindenfors他 2021）。「150」を設計値として過信しない。", "ai": "AI専任組織が一定規模を超えると、非公式な知見共有が効かなくなる。ユースケースの共有基盤と窓口が要る。", "ask": "AI推進の知見は、どの仕組みで部門間に流れているか？"}, {"id": "L3-06", "n": "社会的手抜き（リンゲルマン効果）", "en": "Social loafing", "by": "M.リンゲルマン（1913）／B.ラタネ他（1979）", "y": "1913／1979", "g": "A", "m": ["M6", "M8"], "r": ["F5-04", "L3-03"], "d": "集団の人数が増えるほど、一人あたりの努力量が下がる。", "s": "個人の貢献を見えるようにし、小さなチームに明確な責任を持たせる。", "c": "メタ分析で頑健に確認されている（Karau & Williams 1993）。課題の意義を感じているときは弱まる。", "ai": "AIが成果物を作ると誰の貢献か見えにくくなり、確認の手抜きが起きる。出力への人の責任を明確にする。", "ask": "AIの出力を最終承認する担当者は、名前で特定できるか？"}, {"id": "L3-07", "n": "グッドハートの法則", "en": "Goodhart's law", "by": "C.グッドハート（1975）／M.ストラザーン（1997）", "y": "1975／1997", "g": "C", "m": ["M2"], "r": ["F5-01", "F5-02", "F5-03", "L5-11"], "d": "指標が目標になると、その指標は良い指標ではなくなる。", "s": "KPIは複数を組み合わせ、定期的に見直し、数字の背後の実態を定性的にも確認する。", "c": "社会指標が圧力を受けて腐敗する現象は「キャンベルの法則」としても知られる。", "ai": "利用回数や生成数を目標にすると、無意味な利用が増える。AIのKPIは業務成果と組み合わせて測る。", "ask": "AIのKPIは、利用量以外のどの業務成果と結びついているか？"}, {"id": "L3-08", "n": "心理的安全性", "en": "Psychological safety", "by": "A.エドモンドソン", "y": "1999", "g": "A", "m": ["M2", "M7"], "r": ["F6-03", "F6-02", "L3-09"], "d": "対人関係のリスクを取っても罰せられないと、チームの全員が信じている状態。学習行動の前提になる。", "s": "失敗の報告、反対意見、素朴な質問が出る組織ほど学習が速い。Googleの社内調査でも最重要の因子とされた（2015年）。", "c": "「ぬるい職場」とは別物。高い基準と組み合わせて初めて成果につながる。", "ai": "AIの誤りや不安を率直に報告できる職場が早く学び、事故も防ぐ。失敗事例を共有できる文化が要る。", "ask": "AIの失敗を報告した社員は、社内で評価されているか？"}, {"id": "L3-09", "n": "集団浅慮（グループシンク）", "en": "Groupthink", "by": "I.ジャニス", "y": "1972", "g": "B", "m": ["M6", "M8"], "r": ["F6-05", "L2-03", "L3-08"], "d": "結束の強い集団が合意を優先し、異論や代替案の検討を怠る。", "s": "意思決定者は最後に発言する。反対役を指名し、外部の視点を入れる。", "c": "主に事例研究に基づく理論で、実験による支持は部分的である。", "ai": "経営陣がAI推進で合意を急ぐと、リスクの指摘が消える。AIの方針決定にも反対役と外部の視点を置く。", "ask": "AI投資の決裁会議で、反対意見を述べる役は誰か？"}, {"id": "L3-10", "n": "組織は戦略に従う", "en": "Structure follows strategy", "by": "A.チャンドラー", "y": "1962", "g": "C", "m": ["M7"], "r": ["F3-03", "L3-04", "S2-05", "L3-02"], "d": "多角化などの戦略の変化が、事業部制などの組織構造の変化を促す。", "s": "新しい戦略を古い組織で実行しない。戦略の転換と組織の再設計はセットで行う。", "c": "逆に、既存の組織が選べる戦略を縛る「戦略は組織に従う」という面もある。", "ai": "エージェントで業務を動かす戦略は、職務や承認線を前提にした旧来の組織図では回らない。", "ask": "AI戦略に合わせて、組織図のどの線を引き直すか？"}, {"id": "L3-11", "n": "働きアリの法則（2:6:2）", "en": "2-6-2 rule", "by": "日本のビジネス俗説（アリの研究：長谷川英祐他 2016）", "y": "2016", "g": "D", "m": ["M7"], "r": ["L1-09", "S6-02"], "d": "集団は自然に「よく働く2割・普通の6割・働かない2割」に分かれる、という俗説。", "s": "元になったアリの研究が示したのは、休んでいる個体が交代要員として集団の持続性を支えること。冗長性は効率の敵ではない。", "c": "人の組織で2:6:2の比率が成り立つという実証はない。", "ai": "AIで一律に効率化して人員を絞ると、緊急対応に回れる余力まで失う。AI時代の冗長性を設計し直す。", "ask": "AIで効率化した後、緊急対応を担う余力は誰が持つか？", "wl": "ja"}, {"id": "L3-12", "n": "ノイズ（判断のばらつき）", "en": "Noise", "by": "D.カーネマン, O.シボニー & C.サンスティーン", "y": "2021", "g": "B", "m": ["M6"], "r": ["L3-09", "F6-13"], "d": "同じ情報に対する専門家の判断は、人によっても、同じ人でも時と場合によっても、大きくばらつく。", "s": "判断のばらつきを測る（ノイズ監査）。判断基準の構造化と、独立した複数の評価の平均で、ノイズを減らす。", "c": "ばらつきを減らすことと、偏り（バイアス）を正すことは、別の課題である。", "ai": "ルールやモデルによる判断は人よりばらつきが小さく、ノイズを減らす手段になる。ただし偏りがあれば、一貫して再生産される。", "ask": "同じ案件を別の担当者が審査したら、結論はどれくらい一致するか？"}, {"id": "L3-13", "n": "構造的慣性", "en": "Structural inertia", "by": "M.ハナン & J.フリーマン", "y": "1984", "g": "B", "m": ["M5", "M7"], "r": ["L3-14", "S2-04", "L3-10"], "d": "組織は信頼性と説明責任を高めるほど、構造を変えにくくなる。大規模で古い組織ほど、変化が遅い。", "s": "既存の組織の中での抜本的な変革は難しい。新しい事業は、別組織で立ち上げる選択肢を持つ。", "c": "慣性は弱みであると同時に、信頼性の源泉でもある。", "ai": "AIによる業務再設計を既存部門の改善活動に任せると、現行業務の延長で止まる。別動隊と権限が必要になる。", "ask": "この変革で、既存の組織構造や権限を変えなければならない部分はどこか？"}, {"id": "L3-14", "n": "コンピテンシー・トラップ", "en": "Competency trap", "by": "B.レヴィット & J.マーチ", "y": "1988", "g": "B", "m": ["M5", "M2"], "r": ["L3-13", "S2-04", "F6-04"], "d": "得意な手法で成果が出るほど、その手法を使い続け、より優れた新しい手法の習熟が遅れる。", "s": "成功している部門ほど、新しい手法への切り替えが遅れる。探索のための予算と評価を別に確保する。", "c": "既存の手法を深めることが合理的な局面もある（両利きの経営 S2-04）。", "ai": "熟練者ほど、自分のやり方で十分だとAIを使わない。熟練者の暗黙知をAIに移す役割を与えると、巻き込める。", "ask": "最も成果を上げている部門は、新しい手法をどれだけ試しているか？"}, {"id": "L3-15", "n": "プリンシパル＝エージェント問題", "en": "Principal-agent problem", "by": "M.ジェンセン & W.メックリング", "y": "1976", "g": "A", "m": ["M4", "M8"], "r": ["L4-07", "L6-09", "F6-11"], "d": "仕事を任せる側（プリンシパル）と任される側（エージェント）の利害と情報が一致しないと、任された側は自分の利益を優先しうる。", "s": "報酬の設計、監視、情報の開示で利害を揃える。経営者報酬や外部委託の契約設計の基礎になる。", "c": "監視と報酬にはコストがかかり、問題を完全には解消できない。", "ai": "AIエージェントに業務を任せる場合も、目的のずれと監視の問題が生じる。権限・目標・記録の設計が、契約の設計にあたる。", "ask": "業務を任せる相手（人・委託先・AI）の目標は、自社の目標とどこでずれているか？"}, {"id": "L4-01", "n": "需要と供給", "en": "Supply and demand", "by": "A.マーシャル ほか", "y": "1890", "g": "A", "m": ["M2"], "r": ["L4-11", "L4-07"], "d": "価格は需要と供給が釣り合う点に向かう。不足すれば上がり、余れば下がる。", "s": "供給が急増する領域では価値が下がり、希少な補完財に価値が移る（例：生成AIで量産できる文章やコード）。", "c": "規制、情報の非対称性、ネットワーク効果などで均衡は歪む。", "ai": "AIで量産できる成果物は値下げ圧力を受ける。自社が売る対象が量産可能かどうかが、価格の行方を決める。", "ask": "自社の売上のうち、AIが安価に代替できる部分はどこか？"}, {"id": "L4-02", "n": "収穫逓減", "en": "Diminishing returns", "by": "A.R.J.テュルゴー（1767頃）／D.リカード（1815）", "y": "1767頃／1815", "g": "A", "m": ["M3"], "r": ["L1-07", "L4-05"], "d": "他の要素を固定して一つの投入だけを増やすと、追加1単位あたりの成果は次第に減る。", "s": "同じ施策を積み増すより、次の制約になっている要素へ投資を振り向ける。", "c": "知識やネットワークが価値の源泉となる事業では、逆に収穫逓増が起きる（L4-05）。", "ai": "同じAIツールのライセンスを積み増しても効果は逓減する。追加投資は次の制約であるデータや業務設計に回す。", "ask": "AI投資を追加するなら、次に効く要素は何か？"}, {"id": "L4-03", "n": "規模の経済・範囲の経済", "en": "Economies of scale and scope", "by": "A.スミス（1776）／J.パンザー & R.ウィリッグ（1981）", "y": "1776／1981", "g": "A", "m": ["M1", "M3"], "r": ["L4-04", "S6-04", "S2-02"], "d": "規模の拡大で単位コストが下がる（規模の経済）。共通の資源を複数の事業で使うとコストが下がる（範囲の経済）。", "s": "データ・人材・ブランドなどの共通基盤を複数の事業で使い回せることが、多角化を正当化する。", "c": "一定の規模を超えると、調整コストの増加で「規模の不経済」が起きる。", "ai": "全社共通のAI基盤、データ、評価の仕組みを複数事業で使い回すと、一事業あたりの導入費が下がる。", "ask": "複数事業で共有できるAI基盤の部品は、今どれか？"}, {"id": "L4-04", "n": "経験曲線", "en": "Experience curve", "by": "T.P.ライト（1936）／B.ヘンダーソン（BCG, 1960年代）", "y": "1936／1960年代", "g": "B", "m": ["M1", "M5"], "r": ["S1-01", "F4-02", "L4-03"], "d": "累積生産量が2倍になるごとに、単位コストが一定の率（典型的には20〜30%）で下がる。", "s": "先にシェアを取った企業がコストの優位を得る。コストリーダーシップ戦略とPPMの理論的な根拠。", "c": "自動的に起きるわけではない。技術の非連続な変化が起きると、蓄積した経験は価値を失う。", "ai": "本番運用の実績が、プロンプトや評価データの質を高める。早く本番に出た企業ほど、改善の速さで差がつく。", "ask": "本番運用で溜まる学習データを、競合より先に得られているか？"}, {"id": "L4-05", "n": "ネットワーク効果（メトカーフの法則）", "en": "Network effect", "by": "R.メトカーフ（1980頃）／G.ギルダー（1993）", "y": "1980頃／1993", "g": "B", "m": ["M1", "M2"], "r": ["S5-01", "S3-01", "L5-07"], "d": "利用者が増えるほど、一人あたりの価値が高まる。ネットワークの価値は利用者数の2乗に比例するとされる。", "s": "臨界量を越えた側が市場を総取りしやすい。初期は収益よりも利用者の密度を優先する。", "c": "「2乗」は過大評価だとの指摘がある（Briscoe, Odlyzko & Tilly 2006）。多くの場合、効果は地域や用途ごとに局所的に働く。", "ai": "社内でも、使う人が増えるほど共有プロンプトやエージェントの価値が上がる。利用者の密度を先に作る。", "ask": "AIの共有資産を使う社員は、部門内でどこまで広がったか？"}, {"id": "L4-06", "n": "比較優位", "en": "Comparative advantage", "by": "D.リカード", "y": "1817", "g": "S", "m": ["M8"], "r": ["S5-05", "L6-01"], "d": "すべての分野で劣っていても、相対的に得意な分野に特化して交換すれば、双方が得をする。", "s": "AIが多くの業務で人より優れていても、人が相対的に得意な業務に集中すれば価値を生む。分業は絶対優位ではなく比較優位で決める。", "c": "前提を置いたモデル上の帰結である。移行時の摩擦（失業、再教育）は理論の外にある。", "ai": "AIが全業務で人を上回っても、人は相対的に得意な業務へ回る方が全体の成果は大きい。", "ask": "人が相対的に得意な業務は、どれだと見ているか？"}, {"id": "L4-07", "n": "情報の非対称性（レモン市場）", "en": "Market for lemons", "by": "G.アカロフ", "y": "1970", "g": "A", "m": ["M4"], "r": ["L4-01", "S4-05"], "d": "売り手だけが品質を知る市場では、良品が退出し、粗悪品だけが残る。", "s": "保証、ブランド、第三者認証、実績の公開によって品質を示せる（シグナリング）企業が勝つ。", "c": "シグナルは偽装されうる。発信にコストのかかるシグナルほど信頼される。2001年にノーベル経済学賞の対象となった。", "ai": "AI出力の品質は買い手に見えにくい。評価結果と監査の公開が、AI活用企業の信頼のシグナルになる。", "ask": "AI利用の品質を、顧客に示す根拠は何か？"}, {"id": "L4-08", "n": "ホテリングの法則（最小差別化）", "en": "Hotelling's law", "by": "H.ホテリング", "y": "1929", "g": "B", "m": ["M8"], "r": ["S1-02", "F4-07", "L4-10"], "d": "競合同士は顧客を奪い合ううちに、似た立ち位置（中央）に収束する。", "s": "業界の同質化は自然に起きる。意図して別の軸で勝負しない限り、価格競争に向かう。", "c": "価格競争を考慮すると、逆に最大限の差別化が起きるとの反証モデルがある（d'Aspremont他 1979）。", "ai": "各社が同じ基盤モデルと同じ導入手法に寄ると、AI活用は同質化する。差は固有データと業務の組み方に出る。", "ask": "競合と同じAIツールを使って、何で違いを出すのか？"}, {"id": "L4-09", "n": "囚人のジレンマ", "en": "Prisoner's dilemma", "by": "M.フラッド & M.ドレッシャー（1950）／A.タッカー（命名）", "y": "1950", "g": "S", "m": ["M8"], "r": ["S4-04", "S4-06"], "d": "各自が合理的に行動すると、全員が協調した場合より悪い結果に陥る。", "s": "値下げ合戦や過剰な設備投資はこの構造をしている。繰り返しの関係、評判、ルールの設計で協調を引き出す。", "c": "1回限りの関係か、繰り返しの関係かで最適な行動が変わる。", "ai": "AIで値下げや投資を競うと、全社が疲弊する。業界内でAI活用の協調領域と競争領域を切り分ける。", "ask": "AI投資で、競合との協調が成立する領域はあるか？"}, {"id": "L4-10", "n": "赤の女王仮説", "en": "Red Queen effect", "by": "L.ヴァン・ヴェーレン（1973）／W.バーネット & M.ハンセン（1996）", "y": "1973／1996", "g": "B", "m": ["M8", "M2"], "r": ["S2-03", "F2-02", "S1-02"], "d": "競争相手も進化するため、今の地位を保つだけでも走り続けなければならない。", "s": "改善を重ねても相対的な地位は上がらない。競争の軸そのものを変えない限り、消耗戦が続く。", "c": "競争は企業を鍛える一方、過去の競争環境に過剰に適応するリスクも生む。", "ai": "競合も同時にAIを入れるため、導入しただけでは優位にならない。優位の持続は短く、更新の速さが勝敗を分ける。", "ask": "AI導入で得た優位は、競合が追いつくまで何か月持つと見るか？"}, {"id": "L4-11", "n": "ジェボンズのパラドックス", "en": "Jevons paradox", "by": "W.S.ジェボンズ", "y": "1865", "g": "B", "m": ["M2", "M1"], "r": ["L4-01", "L6-03"], "d": "資源の利用効率が上がると、かえってその資源の総消費量が増えることがある。", "s": "AIの推論コストが下がるほど利用量が増え、計算資源と電力の需要は伸びる。効率化で総コストが下がるとは限らない。", "c": "総消費量が増える（バックファイア）かどうかは、需要の価格弾力性による。", "ai": "推論の単価が下がると利用が増え、AI費用の総額は膨らみうる。予算は単価の低下でなく総額で管理する。", "ask": "AI利用の総コストを、誰が月次で見ているか？"}, {"id": "L4-12", "n": "ロングテール", "en": "Long tail", "by": "C.アンダーソン", "y": "2004", "g": "B", "m": ["M1"], "r": ["L1-02", "L1-01"], "d": "ネット流通では、少数のヒット商品の外側にある膨大なニッチ商品の合計が、大きな市場になる。", "s": "在庫と探索のコストがゼロに近い事業では、品揃えの幅と推薦の精度が武器になる。", "c": "実際の販売データでは、むしろヒットへの集中が強まった例も多い（Elberse 2008）。", "ai": "AIは個別対応のコストを下げ、少数向けの商品やサービスを採算に乗せる。ニッチ顧客への個別提案が事業になる。", "ask": "AIで採算に乗る少数顧客向けのサービスはあるか？"}, {"id": "L4-13", "n": "スマイルカーブ", "en": "Smile curve", "by": "施振榮（スタン・シー、エイサー創業者）", "y": "1992", "g": "C", "m": ["M3"], "r": ["L4-14", "F3-01", "S5-05"], "d": "バリューチェーンの付加価値は、上流（研究開発・部品）と下流（ブランド・サービス）で高く、中間（組立）で低くなる。", "s": "自社が谷（組立や汎用的な加工）にいるなら、上流と下流のどちらへ移るかを決める。", "c": "業界と時代で形は変わる。半導体の受託製造のように、中間が高い付加価値を持つ例もある。", "ai": "AIの価値連鎖でも、半導体や計算基盤（上流）と、顧客接点や業務への作り込み（下流）に利益が集まり、汎用的な中間層は値崩れしやすい。", "ask": "自社のバリューチェーン上の位置は、カーブの谷にないか？"}, {"id": "L4-14", "n": "魅力的な利益の保存則", "en": "Conservation of attractive profits", "by": "C.クリステンセン & M.レイナー", "y": "2003", "g": "C", "m": ["M3", "M8"], "r": ["L4-13", "S2-08", "F2-09"], "d": "ある階層が汎用品化（モジュール化）すると、利益は隣接する、まだ性能が足りない階層へ移る。", "s": "業界のどの層が汎用品になりつつあるかを見て、次に利益が集まる層へ先回りする。", "c": "どの層の性能が「まだ足りない」かの見極めは、事前には難しい。", "ai": "基盤モデルが汎用品化するほど、利益はデータ・業務への統合・評価・信頼の層へ移る。自社がどの層で稼ぐかを決める。", "ask": "自社の事業の中で、汎用品になりつつある層と、まだ性能が足りない層はどこか？"}, {"id": "L4-15", "n": "スーパースター経済", "en": "Economics of superstars", "by": "S.ローゼン", "y": "1981", "g": "B", "m": ["M1"], "r": ["L1-15", "L4-05", "L1-02"], "d": "複製や配信のコストが低い市場では、わずかな品質の差が巨大な収入の差になり、少数の勝者に集中する。", "s": "デジタル化された市場では、2番手の価値が急落する。1位になれる狭い領域を選ぶ。", "c": "地域・言語・規制で市場が分断されていると、集中は弱まる。", "ai": "AIで制作や配信のコストが下がるほど、トップの人材と上位のサービスへの集中が強まる。差別化の焦点を絞り込む必要が増す。", "ask": "この市場で、品質がわずかに上回る競合に、顧客の大半を奪われる構造はあるか？"}, {"id": "L4-16", "n": "ボーモルのコスト病", "en": "Baumol's cost disease", "by": "W.ボーモル & W.ボーエン", "y": "1966", "g": "A", "m": ["M5", "M3"], "r": ["L5-12", "L6-06"], "d": "生産性が上がりにくいサービス（教育・医療・演奏など）は、他産業の賃金上昇につられて、相対的に割高になり続ける。", "s": "人手に依存するサービスは、コスト構造を変えない限り、価格かマージンが圧迫され続ける。", "c": "割高になっても、社会全体が貧しくなるわけではない。", "ai": "生成AIは、これまで生産性が上がりにくかった知的サービスの生産性を、初めて大きく動かしうる。コスト病の治療薬になるかが論点になる。", "ask": "自社の売上原価のうち、人の時間に比例して増えるコストは何割か？"}, {"id": "L4-17", "n": "情報財の経済", "en": "Information rules", "by": "C.シャピロ & H.ヴァリアン", "y": "1998", "g": "A", "m": ["M1", "M4"], "r": ["L4-15", "L4-05"], "d": "情報財は作るのに高い固定費がかかるが、複製の限界費用はほぼゼロになる。価格はコストではなく、顧客にとっての価値で決まる。", "s": "顧客ごとの価値に合わせて版を分ける（バージョニング）、束ねて売る（バンドリング）など、価値を基準に価格を設計する。", "c": "限界費用がゼロの市場は、価格競争で利益が消えやすい。差別化か規模の優位が要る。", "ai": "生成AIの出力は複製のコストがほぼゼロだが、推論には変動費がかかる。利用量に比例する原価を、価格の設計に織り込む。", "ask": "この商品の価格は、原価からではなく、顧客にとっての価値から決めているか？"}, {"id": "L5-01", "n": "ムーアの法則", "en": "Moore's law", "by": "G.ムーア", "y": "1965／1975改訂", "g": "B", "m": ["M1", "M5"], "r": ["L5-05", "L1-03"], "d": "半導体の集積度は、約2年ごとに倍増する。", "s": "指数関数的に安くなる資源を前提に事業を設計した企業が、勝ってきた。", "c": "物理法則ではなく、産業の目標を兼ねた経験則である。微細化は減速し、性能向上の源泉は設計や並列化に移っている。", "ai": "AIの推論単価は下がり続ける前提で、今は割高な用途も将来の価格で設計しておく。", "ask": "今は高すぎて見送ったAI用途は、価格が下がれば成立するか？"}, {"id": "L5-02", "n": "アマラの法則", "en": "Amara's law", "by": "R.アマラ（とされる）", "y": "1960〜70年代とされる", "g": "C", "m": ["M5", "M6"], "r": ["L5-03", "L5-09", "S3-01"], "d": "人は、技術の影響を短期的には過大に、長期的には過小に評価する。", "s": "初期の失望で撤退せず、長期の構造変化に向けた投資を続ける。", "c": "発言の正確な時期と出典は確認できていない。", "ai": "生成AIの短期の過熱と失望の後でも、業務構造への長期の影響は残る。短期の成果だけでPoCを打ち切らない。", "ask": "AI投資の評価は、短期の成果と長期の構造変化で分けているか？"}, {"id": "L5-03", "n": "ハイプ・サイクル", "en": "Gartner hype cycle", "by": "ガートナー（J.フェン）", "y": "1995", "g": "D", "m": ["M5", "M6"], "r": ["L5-02", "L5-04"], "d": "新技術は「過度な期待のピーク」と「幻滅の谷」を経て、「生産性の安定期」に至るとするモデル。", "s": "期待の管理と投資のタイミングを議論する、共通の言葉として使う。", "c": "実際にこの曲線をたどる技術は少ないとのレビューがある（Dedehayir & Steinert 2016）。予測のモデルとしては使わない。", "ai": "AI技術ごとに成熟度は異なる。生成AIとエージェントが今どの段階かを役員間の共通言語にして、投資を割り振る。", "ask": "自社のAI案件は、期待の山と幻滅の谷のどこにあるか？"}, {"id": "L5-04", "n": "イノベーションの普及理論", "en": "Diffusion of innovations", "by": "E.ロジャーズ", "y": "1962", "g": "A", "m": ["M5", "M2"], "r": ["S1-05", "L2-11", "F5-08"], "d": "新しいものは、革新者→初期採用者→前期多数派→後期多数派→遅滞者の順に広がり、累積でS字を描く。", "s": "全員に同時に広げようとせず、初期採用者を起点にする。試しやすさと、成果の見えやすさを高めると速く広がる。", "c": "2.5／13.5／34／34／16%の区分は、正規分布を標準偏差で区切った便宜上の数値である。", "ai": "AIの社内展開は、熱心な少数の利用者から始めて成果を見せながら広げる。全員一斉の研修では定着しにくい。", "ask": "AIの初期採用者は誰で、その成果を誰に見せるか？"}, {"id": "L5-05", "n": "技術のS字カーブ", "en": "Technology S-curve", "by": "R.フォスター", "y": "1986", "g": "B", "m": ["M5", "M1"], "r": ["S1-04", "F4-03", "L1-03"], "d": "技術の性能向上は、初期は遅く、中盤で加速し、物理的な限界に近づくと鈍化する。", "s": "既存技術が天井に近づいたら、今は性能の低い新技術のS字に乗り換える準備をする。", "c": "天井の位置は事前に分かりにくく、乗り換えが早すぎても失敗する。", "ai": "大規模モデルの性能向上が鈍る局面もありうる。単一モデルに依存せず、次の方式へ乗り換えられる構えを持つ。", "ask": "今のAI方式が頭打ちになったとき、乗り換え先は何か？"}, {"id": "L5-06", "n": "創造的破壊", "en": "Creative destruction", "by": "J.シュンペーター（1942）／P.アギオン & P.ハウイット（1992）", "y": "1942", "g": "B", "m": ["M5", "M8"], "r": ["S1-04", "S2-04", "L5-05"], "d": "新しい技術や事業が古いものを壊しながら、経済を成長させていく。", "s": "自社の既存事業を壊す新事業を、他社より先に自ら手がける覚悟が要る。", "c": "アギオンとハウイットが数理モデル化し、2025年のノーベル経済学賞の対象となった（モキイアと共同受賞）。", "ai": "AIエージェントは自社の中核業務を代替しうる。他社に先んじて、自社の収益源を置き換える実験を行う。", "ask": "AIが自社の主力事業を代替するなら、どの業務からか？"}, {"id": "L5-07", "n": "経路依存・ロックイン", "en": "Path dependence", "by": "P.デイヴィッド（1985）／W.B.アーサー（1989）", "y": "1985／1989", "g": "B", "m": ["M5", "M2"], "r": ["L4-05", "S5-04", "S3-01"], "d": "初期の偶然の選択が自己強化され、劣った技術であっても標準として固定される。", "s": "標準規格、データ形式、エコシステムの初期の争奪に資源を集中させる。一度固定されると覆すのは難しい。", "c": "代表例とされるQWERTY配列については反論がある（Liebowitz & Margolis 1990）。", "ai": "特定ベンダーのモデルやエージェント基盤に深く依存すると、乗り換えが困難になる。データ形式と接続の標準を先に押さえる。", "ask": "今のAI基盤から別の基盤へ、データは移せるか？"}, {"id": "L5-08", "n": "リンディ効果", "en": "Lindy effect", "by": "A.ゴールドマン（1964）／N.タレブ（2012）", "y": "1964／2012", "g": "C", "m": ["M5"], "r": ["L1-03", "L5-03"], "d": "腐らないもの（思想、技術、書物）は、すでに長く生き残っているほど、今後も長く残る。", "s": "流行の手法より、長く使われてきた原理（本資料の法則層）に学習の時間を投じる。", "c": "人や機械のように物理的な寿命があるものには当てはまらない。", "ai": "モデルやツールは短期間で入れ替わるが、業務の原理や判断の型は残る。人材育成は後者に時間を割く。", "ask": "AI研修の内容のうち、ツールが変わっても使える部分はどこか？"}, {"id": "L5-09", "n": "生産性パラドックス／Jカーブ", "en": "Productivity J-curve", "by": "R.ソロー（1987）／E.ブリニョルフソン他（2021）", "y": "1987／2021", "g": "B", "m": ["M5"], "r": ["L5-02", "F5-08", "F5-07"], "d": "新技術が普及しても、しばらくは生産性の統計に表れない。業務の再設計や人材育成など、補完的な無形投資が先に必要になるため。", "s": "AI導入の効果は、道具の配布ではなく業務と組織の再設計から生まれる。初期の数字が悪くても、方向が正しければ続ける。", "c": "「Jカーブだから待て」は失敗の言い訳にもなる。中間指標で前進を確認する。", "ai": "AI投資の回収には時間差がある。導入直後の生産性低下を見込み、経営会議での評価時期を後ろへ置く。", "ask": "AI投資の効果を測るまで、経営はどれだけの猶予を許すか？"}, {"id": "L5-10", "n": "コリングリッジのジレンマ", "en": "Collingridge dilemma", "by": "D.コリングリッジ", "y": "1980", "g": "C", "m": ["M5", "M2"], "r": ["F6-08", "S3-03"], "d": "技術の影響は普及するまで予測できないが、普及した後では制御が難しい。", "s": "AIのガバナンスは「後で完璧な規則を作る」ではなく、小さく始めて見直し続ける適応型にする。", "c": "予防か放任かの二択ではない。後から修正できる可逆性を残す設計が鍵になる。", "ai": "AIの規制や影響は、普及してからでないと見えない。ガバナンスは小さな運用から始め、定期的に更新する。", "ask": "AIガバナンスの見直しは、どの頻度で行う決まりか？"}, {"id": "L5-11", "n": "意図せざる結果（コブラ効果）", "en": "Unintended consequences", "by": "R.K.マートン（1936）／H.ジーベルト（2001）", "y": "1936／2001", "g": "C", "m": ["M2"], "r": ["L3-07", "F6-05"], "d": "目的をもった施策が、想定していない、ときに逆の結果を生む。", "s": "施策の二次・三次の影響を事前に洗い出し、報酬の仕組みが生む抜け道を想定しておく。", "c": "名前の由来であるインドのコブラ駆除の逸話は史料が乏しい。1902年のハノイのネズミ駆除報奨金は史料で確認できる（Vann 2003）。", "ai": "AIの利用目標を設けると、AIで水増しした成果物のような想定外の抜け道が生まれる。指標の悪用を先に洗い出す。", "ask": "AI利用の目標は、どんな抜け道を生みうるか？"}, {"id": "L5-12", "n": "汎用技術（GPT）", "en": "General purpose technology", "by": "T.ブレスナハン & M.トラジテンバーグ", "y": "1995", "g": "B", "m": ["M5", "M2"], "r": ["L5-09", "L5-13", "L4-16"], "d": "蒸気機関・電気・半導体のような汎用技術は、多くの産業に浸透し、改良が続き、補完的な発明を次々と生む。", "s": "汎用技術の効果は、技術そのものより、それを前提とした業務・組織・製品の再設計から生まれ、時間がかかる。", "c": "何が汎用技術だったかは、多くの場合、後から分かる。", "ai": "生成AIは汎用技術の条件を満たすとの見方が有力で、大規模言語モデルが多くの職業のタスクに影響しうるとの推計もある（Eloundou他 2023）。", "ask": "自社の業務のうち、AIを前提に作り直すと構造ごと変わるのはどこか？"}, {"id": "L5-13", "n": "タスクベース・アプローチ", "en": "Task-based approach", "by": "D.オーター, F.レヴィ & R.マーネイン", "y": "2003", "g": "A", "m": ["M7"], "r": ["L5-12", "L4-06", "L5-14"], "d": "技術は職業を丸ごと置き換えるのではなく、職業を構成するタスクの単位で代替・補完する。定型的なタスクほど代替されやすい。", "s": "人員計画は、職種の単位でなくタスクの単位で分析する。代替されるタスクと、価値が上がるタスクを分ける。", "c": "生成AIは定型でない認知的なタスクにも及ぶため、「定型かどうか」だけの区分では足りなくなっている。", "ai": "AIの影響評価はタスクの単位で行い、浮いた時間をどの高付加価値タスクに振り向けるかまで設計する。", "ask": "この職種の仕事をタスクに分けると、AIで代替・補完・不変のものはそれぞれ何割か？"}, {"id": "L5-14", "n": "ポランニーのパラドックス", "en": "Polanyi's paradox", "by": "M.ポランニー（1966）／D.オーター（2014）", "y": "1966／2014", "g": "C", "m": ["M6"], "r": ["L5-13", "L6-01", "L3-14"], "d": "人は、言葉で説明できる以上のことを知っている。暗黙知は手順として書き出せないため、従来の自動化が難しかった。", "s": "熟練者の判断は、規則として書き出すより、事例と対話を通じて移す。", "c": "大量の事例から学ぶ機械学習は、このパラドックスを部分的に回避し始めている。", "ai": "生成AIは暗黙知の一部を事例から学習できる。熟練者の判断の事例をデータとして残すことが、技能継承の新しい手段になる。", "ask": "熟練者の判断のうち、マニュアルに書けていない部分は何か？"}, {"id": "L5-15", "n": "自動化の皮肉", "en": "Ironies of automation", "by": "L.ベインブリッジ", "y": "1983", "g": "B", "m": ["M6", "M2"], "r": ["L2-13", "F5-15", "L6-06"], "d": "自動化が進むほど、人に残るのは自動化できない難しい判断と異常への対応になる。一方で日常の練習の機会は失われ、肝心な時に対応できなくなる。", "s": "自動化と同時に、人の技能を保つ訓練と、異常時の引き継ぎを設計する。", "c": "航空やプラント制御の知見が中心である。業務の重大性に応じて、対策の程度を見極める。", "ai": "AIに定型業務を任せるほど、若手が判断力を鍛える機会が減る。育成のための意図的な手作業と、AI出力の検証の訓練を残す。", "ask": "AIが止まった日に、業務を手で回せる人は何人いるか？"}, {"id": "L5-16", "n": "クランツバーグの第一法則", "en": "Kranzberg's first law", "by": "M.クランツバーグ", "y": "1986", "g": "C", "m": ["M7"], "r": ["L5-11", "L5-10"], "d": "技術は善でも悪でもなく、中立でもない。影響は、使われる文脈と社会の仕組みによって決まる。", "s": "技術の評価は性能だけでなく、誰がどう使い、何が変わるかという文脈で行う。", "c": "法則というより、技術を考えるときの姿勢を示す格言である。", "ai": "同じAIでも、使い方と統制の設計しだいで、生産性の道具にもリスクの源にもなる。評価には業務の文脈と運用のルールを含める。", "ask": "このAIの使い方で、最も得をする人と損をする人は誰か？"}, {"id": "L5-17", "n": "技術革命と金融資本", "en": "Technological revolutions and financial capital", "by": "C.ペレス", "y": "2002", "g": "C", "m": ["M5", "M2"], "r": ["L5-03", "L5-02", "L5-06"], "d": "技術革命は、金融資本が殺到してバブルを生む導入期と、崩壊の後に実体経済へ広く浸透する展開期の、二段階で進む。", "s": "熱狂の時期と浸透の時期を区別する。本格的な普及と勝者の確定は、バブル崩壊の後に来る。", "c": "歴史の解釈に基づく枠組みであり、時期の予測には使えない。", "ai": "AIへの巨額投資が過熱しても、技術の価値の否定にはならない。崩壊の局面でも業務への実装を続けた企業が、展開期の勝者になりうる。", "ask": "自社のAI投資は、市場の熱狂が冷めても続ける価値がある計画か？"}, {"id": "L6-01", "n": "モラベックのパラドックス", "en": "Moravec's paradox", "by": "H.モラベック", "y": "1988", "g": "C", "m": ["M6"], "r": ["L4-06", "L6-02"], "d": "人間に難しい高度な推論はAIには易しく、人間に易しい知覚や運動はAIには難しい。", "s": "自動化は「人にとって難しい順」には進まない。知的な事務作業ほど先に代替が進みうる。", "c": "ロボット工学の進歩で、この境界は動き続けている。", "ai": "契約書の確認や資料作成のような知的事務は代替が先に進み、現場の手作業は遅れる。事務職の再配置を先に考える。", "ask": "自社でAIに代替されやすい知的事務は、どの部署に多いか？"}, {"id": "L6-02", "n": "苦い教訓", "en": "The Bitter Lesson", "by": "R.サットン", "y": "2019", "g": "C", "m": ["M5", "M1"], "r": ["L6-03", "S2-03"], "d": "AI研究の歴史では、人間の知識を組み込む手法より、計算量の増加を活かせる汎用的な手法が最終的に勝ってきた。", "s": "独自ルールの作り込みより、モデルの進化に乗れる設計（部品の差し替えやすさ、データ資産）を重視する。", "c": "AI研究の歴史を観察した経験則である。短期の実務では、作り込みが勝つ場面も多い。", "ai": "業務ごとのルールの作り込みは、次のモデルで無駄になりうる。差し替え可能な設計と自社データに投資する。", "ask": "今の作り込みは、次のモデルが出ても不要にならないか？"}, {"id": "L6-03", "n": "スケーリング則", "en": "Neural scaling law", "by": "J.カプラン他（2020）／J.ホフマン他（2022）", "y": "2020／2022", "g": "B", "m": ["M1"], "r": ["L6-02", "L4-11", "L5-01"], "d": "言語モデルの性能は、パラメータ数・データ量・計算量のべき乗則に従って、予測可能な形で向上する。", "s": "モデル性能の競争は、計算資源とデータを調達する力の競争になる。自社が戦う層と、借りる層を分ける。", "c": "観測された範囲での経験則である。データの不足や、推論時の計算量への重心の移動など、前提は変わりつつある。", "ai": "最先端モデルの開発は資本力の勝負になる。多くの企業は借りたモデルの上で、独自データによって差をつける。", "ask": "自社は、モデルを作る側と借りる側のどちらに立つか？"}, {"id": "L6-04", "n": "推論時スケーリング", "en": "Test-time compute scaling", "by": "OpenAI（o1, 2024）／C.スネル他（2024）", "y": "2024", "g": "B", "m": ["M1", "M4"], "r": ["L6-03", "L6-15"], "d": "学習時だけでなく、推論時に使う計算量（考える長さ、試行の回数）を増やすことでも、性能が向上する。", "s": "難易度に応じて計算量を配分する設計が、性能とコストの両方を決める。", "c": "効果はタスクによって大きく異なり、計算量に比例して費用も増える。", "ai": "トークンの単価が下がっても、推論モデルは1件あたりに大量のトークンを使うため、業務あたりの費用は下がりにくい。", "ask": "この業務は、速く安い回答と、時間をかけた正確な回答のどちらが価値を生むか？"}, {"id": "L6-05", "n": "ジャギッド・フロンティア", "en": "Jagged technological frontier", "by": "F.デラクア他（ハーバード・ビジネス・スクール & BCG）", "y": "2023", "g": "B", "m": ["M4", "M6"], "r": ["L6-06", "L2-13", "F5-15"], "d": "AIの能力の境界はでこぼこで、同じくらい難しく見えるタスクでも、AIが得意なものと苦手なものが混在する。", "s": "758人のコンサルタントを対象にした実験で、境界の内側のタスクでは処理量が12.2%増え、25.1%速くなり、品質も40%以上高まった。外側のタスクでは、正答率が19ポイント下がった。", "c": "境界は外からは見えず、モデルの更新で動き続ける。自社の業務で確かめるしかない。", "ai": "AI活用の指針は、業務ごとに「任せる・協働する・任せない」を実験で見極めることから始める。一律の利用推奨は、境界の外側の業務で品質を落とす。", "ask": "AIに任せて品質が上がった業務と下がった業務を、自社で区別できているか？"}, {"id": "L6-06", "n": "AIによる技能の平準化", "en": "Skill-leveling effect", "by": "E.ブリニョルフソン, D.リー & L.レイモンド", "y": "2023／2025", "g": "B", "m": ["M6", "M7"], "r": ["L6-05", "L4-16", "L5-15"], "d": "生成AIの支援は、熟練者よりも経験の浅い人の生産性を大きく引き上げる。熟練者の行動パターンがAIに学習され、経験の浅い人に伝わるため。", "s": "カスタマーサポート担当者5,179人の調査で、1時間あたりの解決件数は平均14%、経験の浅い担当者や技能の低い担当者では34%向上し、熟練者への効果はわずかだった。", "c": "1社1職種での結果である。起業家を対象にした研究では、成果の高い人ほど恩恵が大きく、低い人はむしろ悪化した例もある（Otis他 2024）。", "ai": "AIは新人の立ち上がりを早める道具として最も効く。育成計画と人員配置をAI前提で見直し、熟練者には知見をAIに提供する役割を与える。", "ask": "新人が一人前になるまでの期間を、AIでどれだけ短くできるか？"}, {"id": "L6-07", "n": "GIGO（ガベージイン・ガベージアウト）", "en": "Garbage in, garbage out", "by": "1950年代のコンピュータ業界の格言", "y": "1950年代", "g": "C", "m": ["M3"], "r": ["L1-07", "L6-08", "F4-11"], "d": "入力の質が悪ければ、どれほど優れた処理をしても、出力の質は悪くなる。", "s": "AIやデータ分析の成果の上限は、データの質で決まる。モデルを選ぶより先に、データの整備に投資する。", "c": "大量のデータで多少のノイズは吸収できるが、系統的な誤りや偏りは増幅される。", "ai": "社内文書を検索して答えるRAGでは、文書の版管理と正確さが回答精度の上限になる。文書の整理が、AI導入の前提工事になる。", "ask": "AIに読ませる社内データは最新で正しいと、誰が保証しているか？"}, {"id": "L6-08", "n": "モデル崩壊", "en": "Model collapse", "by": "I.シュマイロフ他", "y": "2024", "g": "B", "m": ["M2"], "r": ["L6-07", "S2-10"], "d": "AIが生成したデータで次のAIを繰り返し学習させると、元のデータ分布の裾が失われ、性能が劣化していく。", "s": "人間が作った、出所の確かなデータの価値が上がる。独自の一次データは戦略的な資産になる。", "c": "生成データを人間のデータに置き換えず、蓄積して混ぜて使えば劣化は抑えられる、とする研究もある。", "ai": "社内のナレッジがAI生成の文書で埋まると、検索や学習の質が下がる。AI生成物の識別と、一次情報の保存を運用のルールにする。", "ask": "社内ナレッジのうち、AIが生成した文書と人が書いた一次情報を区別できているか？"}, {"id": "L6-09", "n": "報酬ハッキング（仕様ゲーミング）", "en": "Specification gaming", "by": "D.アモデイ他（2016）／V.クラコヴナ他（2020）", "y": "2016／2020", "g": "B", "m": ["M2"], "r": ["L3-07", "L3-15", "F6-14"], "d": "AIは、与えられた目標を文字どおりに最適化し、設計者の意図に反する抜け道を見つけてしまう。", "s": "AIに与える目標や評価指標は、抜け道がある前提で設計し、結果の中身を人が確かめる。", "c": "グッドハートの法則（L3-07）のAI版と言える。AIの能力が高いほど、抜け道も巧妙になる。", "ai": "エージェントに「テストを通す」「KPIを上げる」と指示すると、テストや指標そのものを書き換える形で達成しうる。権限と評価を分離する。", "ask": "AIに与えた目標を、意図に反する方法で達成できる抜け道はないか？"}, {"id": "L6-10", "n": "ハルシネーションの不可避性", "en": "Calibrated models must hallucinate", "by": "A.T.カライ & S.ヴェンパラ", "y": "2024", "g": "B", "m": ["M4"], "r": ["L1-11", "F5-15", "F6-15"], "d": "正しく較正された言語モデルは、学習データにまれにしか現れない事実について、一定の割合で誤りを生成することが理論的に避けられない。", "s": "誤りゼロを前提にした業務設計をしない。誤りが起きても検知・訂正できる仕組みを組み込む。", "c": "理論上の下限についての議論である。検索の併用や出典の明示で、実務上の誤りは大きく減らせる。", "ai": "目標は「誤りが起きても困らない業務設計」に置く。出典の明示を必須にし、人が確認する位置を決める。", "ask": "AIの誤りが顧客に届いた場合の損害はいくらで、どこで止める設計か？"}, {"id": "L6-11", "n": "ハイラムの法則", "en": "Hyrum's law", "by": "H.ライト（Google）", "y": "2010年代", "g": "C", "m": ["M2", "M5"], "r": ["F6-15", "F6-16", "L5-07"], "d": "利用者が十分に多ければ、仕様に書かれていない振る舞いも含め、システムの観測可能なあらゆる振る舞いに、誰かが依存する。", "s": "変更の影響は、仕様ではなく実際の使われ方で決まる。変更の前に利用の実態を観測する。", "c": "ソフトウェア工学の経験則で、『Software Engineering at Google』（2020）で広く知られた。", "ai": "モデルを新しい版に切り替えると、出力の癖に依存していた業務やプロンプトが壊れる。評価セットによる回帰確認を、切り替えの条件にする。", "ask": "モデルを入れ替えたとき、どの業務が壊れるかを事前に確かめる手段はあるか？"}, {"id": "L6-12", "n": "機械学習の隠れた技術的負債", "en": "Hidden technical debt in ML", "by": "D.スカリー他（Google）", "y": "2015", "g": "C", "m": ["M3", "M5"], "r": ["L6-07", "F6-16", "F6-09"], "d": "実運用の機械学習システムでは、モデルのコードはごく一部で、データの収集・検証・監視・設定などの周辺部分が大半を占め、そこに負債が溜まる。", "s": "AIの導入費用は、モデルの開発よりも、データ基盤と運用の整備で膨らむ。総保有コストで見積もる。", "c": "論文は2015年時点の機械学習を対象とする。生成AIでは、負債の中身（プロンプト、評価、外部モデルへの依存）が変わっている。", "ai": "生成AIアプリの負債は、管理されないプロンプト、評価のない改修、特定ベンダーへの依存に溜まる。プロンプトをコードとして管理する。", "ask": "このAIシステムの費用のうち、モデル以外（データ・評価・運用）の比率を見積もっているか？"}, {"id": "L6-13", "n": "テスラーの定理（AI効果）", "en": "Tesler's theorem", "by": "L.テスラー（とされる）", "y": "1970年代", "g": "C", "m": ["M6", "M5"], "r": ["L5-02", "L5-09"], "d": "AIとは、まだ実現されていないことのすべてである。実現された技術はAIと呼ばれなくなり、ただのソフトウェアになる。", "s": "AIの成果は、実現するほど目立たなくなる。投資の効果は「AIらしさ」ではなく、業務の指標で語る。", "c": "発言の出典と正確な文言には諸説ある。", "ai": "定着したAI活用は当たり前の業務になり、推進部門の成果として見えにくくなる。効果測定の基準線を、導入前に残しておく。", "ask": "導入前の業務の状態（時間・件数・誤り率）を、数字で残しているか？"}, {"id": "L6-14", "n": "ロスト・イン・ザ・ミドル", "en": "Lost in the middle", "by": "N.F.リュー他", "y": "2023", "g": "B", "m": ["M6"], "r": ["L2-17", "F4-11", "L6-07"], "d": "言語モデルは、長い入力の冒頭と末尾にある情報はよく使うが、中間にある情報を見落としやすい。", "s": "長い資料をそのまま渡すより、必要な部分を検索して短く渡し、重要な指示は冒頭か末尾に置く。", "c": "新しいモデルでは改善が進んでおり、程度はモデルによって異なる。", "ai": "扱える入力の長さが伸びても、検索で絞り込む設計（RAG）の価値は残る。長文を入れられることを理由に、RAGを不要と即断しない。", "ask": "AIに渡している資料のうち、回答に本当に必要な部分はどれだけか？"}, {"id": "L6-15", "n": "推論コストの急低下（LLMフレーション）", "en": "LLMflation", "by": "G.アッペンツェラー（a16z）ほか", "y": "2024", "g": "C", "m": ["M1", "M5"], "r": ["L4-11", "L6-04", "L5-01"], "d": "同じ性能の言語モデルを使うコストは、年に約10分の1のペースで下がってきた、との観測がある。", "s": "今は高すぎて採算が合わない用途も、1〜2年で採算が合う可能性がある。価格の下落を前提に計画を立てる。", "c": "下落率は測り方で大きく変わる（Epoch AIは課題により年9〜900倍と推計）。推論モデルは1件あたりのトークン量が多く、業務あたりの請求額は単価ほど下がらない。", "ai": "原価の計画は、単価の下落と、利用量・推論量の増加の両方のシナリオで持つ。単価だけで計画すると総額を見誤る（L4-11）。", "ask": "このユースケースの採算は、AIの単価が今の10分の1になったらどう変わるか？"}, {"id": "L6-16", "n": "ベンチマークの飽和", "en": "Benchmark saturation", "by": "D.キーラ他", "y": "2021", "g": "C", "m": ["M2", "M5"], "r": ["L3-07", "F6-15", "L6-09"], "d": "AIの性能を測る公開ベンチマークは、作られてから人間並みの性能に達するまでの期間が短くなり続け、すぐに差がつかなくなる。", "s": "公開ベンチマークの順位だけでモデルを選ばない。自社の業務での評価を持つ。", "c": "学習データにベンチマークが混入している（汚染）可能性もある。", "ai": "モデルの選定とリリースの判断は、自社の失敗事例から作った評価セットで行う。評価セットは自社の知的資産になる。", "ask": "自社の業務でモデルを比べる評価セットは何件あり、誰が管理しているか？"}, {"id": "S1-01", "n": "3つの基本戦略", "en": "Porter's generic strategies", "by": "M.ポーター", "y": "1980", "m": ["M7"], "r": ["L4-04", "F2-02", "S2-05"], "d": "コストリーダーシップ、差別化、集中のいずれかを選び、組織全体でそれを徹底する。", "s": "業界の中での立ち位置を明確にし、資源配分・組織・評価をその一つに揃える。", "c": "どれも中途半端な「スタック・イン・ザ・ミドル」は低収益になるとされたが、両立させた企業の例もある。", "ai": "生成AIで差別化とコスト優位の両立が現実味を帯び、中途半端という旧来の警告の前提が揺らぐ。", "ask": "自社は何で選ばれ、AIで浮いた原資をどの軸に注ぐか？"}, {"id": "S1-02", "n": "ブルー・オーシャン戦略", "en": "Blue ocean strategy", "by": "W.C.キム & R.モボルニュ", "y": "2005", "m": ["M8"], "r": ["F4-07", "L4-08", "L4-10", "F1-06"], "d": "競争のない市場空間を自ら創り、差別化と低コストを同時に実現する。", "s": "業界の常識となっている競争要因を「取り除く・減らす・増やす・付け加える」で組み替え、新しい価値曲線を作る。", "c": "青い海はやがて赤くなる。模倣を防ぐ壁を別に用意する。成功事例の多くは事後的な解釈だとの批判もある。", "ai": "人手を前提にした提供価値をAIで削り、新しい価値曲線を描ける。ただし模倣も速く、青い海は短命になる。", "ask": "顧客が払う対価のうち、人手を前提に残っている要素は何か？"}, {"id": "S1-03", "n": "ランチェスター戦略", "en": "Lanchester strategy", "by": "F.ランチェスター（1914）／田岡信夫（1970年代）", "y": "1914／1970年代", "m": ["M1", "M3"], "r": ["L1-01", "S1-01", "S4-03"], "d": "弱者は局地戦・一点集中・接近戦で差別化し、強者は広域戦・総合戦と相手の模倣（ミート）で押さえ込む。", "s": "シェアで劣る企業は、地域・顧客層・製品を絞り込み、局所的な1位を作ってから広げる。", "c": "戦闘の数理モデル（兵力の2乗則）を経営に当てはめた類推である。日本で独自に体系化され普及した。", "ai": "少人数でもAIエージェントで広域に手が届き、弱者が絞るべき局地の範囲が従来より広がる。", "ask": "局地戦で1位を取るなら、どの顧客層のどの業務か？", "wl": "ja"}, {"id": "S1-04", "n": "破壊的イノベーション", "en": "Disruptive innovation", "by": "J.バウアー & C.クリステンセン（1995）／C.クリステンセン（1997）", "y": "1995／1997", "m": ["M5", "M8"], "r": ["L5-05", "S2-04", "L5-06"], "d": "既存の顧客には性能不足でも、安価で簡便な製品でローエンドや新市場から参入し、やがて主流の市場を奪う。", "s": "既存企業は優良顧客の声に従うほど、破壊への対応が遅れる。別組織・別の評価軸で迎え撃つ。", "c": "「破壊的」が新技術一般の意味で乱用されている。理論の予測力には批判もある（Lepore 2014）。", "ai": "安く粗い生成AIが専門サービスの下位から侵食する。自社の薄利顧客が最初の標的になる。", "ask": "自社で最も利幅の薄い顧客は、AI代替品に最初に流れないか？"}, {"id": "S1-05", "n": "キャズム理論", "en": "Crossing the chasm", "by": "G.ムーア", "y": "1991", "m": ["M5"], "r": ["L5-04", "F4-04"], "d": "初期採用者と前期多数派の間には深い溝（キャズム）がある。特定のニッチ市場を橋頭堡として制圧することで越える。", "s": "狭い顧客層に完全な解決策（ホールプロダクト）を届け、ボウリングのピンのように隣接する市場へ広げる。", "c": "B2Bのテクノロジー製品を前提に生まれた理論で、消費財には当てはまりにくい。", "ai": "試験導入は容易で初期採用は増えるが、業務に組み込む完全な解決策がなければ溝で止まる。", "ask": "最初に完全な解決策を届けるニッチは、誰のどの業務か？"}, {"id": "S1-06", "n": "隠れたチャンピオン", "en": "Hidden champions", "by": "H.サイモン", "y": "1996", "m": ["M3", "M7"], "r": ["S1-03", "S1-01", "L4-15", "S2-09"], "d": "狭い市場に特化して世界シェアの上位を取り、顧客との深い関係と技術で守る中堅企業の戦い方。", "s": "規模で劣る企業は、ニッチを世界規模で取ることで規模の経済を得る。日本ではグローバル・ニッチトップとして政策的にも注目されている。", "c": "ニッチ市場そのものが縮小・消滅すると、逃げ場がない。", "ai": "AIで海外の顧客開拓や多言語対応のコストが下がり、ニッチトップが世界に展開する障壁は低くなる。", "ask": "自社が世界で上位3社に入れる、狭く深い市場はどこか？"}, {"id": "S2-01", "n": "資源ベース戦略（RBV）", "en": "Resource-based view", "by": "B.ワーナーフェルト（1984）／J.バーニー（1991）", "y": "1984／1991", "m": ["M7"], "r": ["F3-02", "S2-03", "S2-02"], "d": "価値があり、希少で、模倣も代替も難しい内部資源が、持続的な競争優位を生む。", "s": "魅力的な外部市場から考えるのではなく、自社にしかない資源から戦略を組み立てる。", "c": "環境が変わると、強みだった資源が変化を妨げる硬直性（コア・リジディティ）に転じる。", "ai": "モデルは誰でも買えるため希少性は消え、自社固有のデータと業務知が模倣困難な資源として残る。", "ask": "競合が金を積んでも手に入らない自社データは何か？"}, {"id": "S2-02", "n": "コア・コンピタンス", "en": "Core competence", "by": "C.K.プラハラード & G.ハメル", "y": "1990", "m": ["M7"], "r": ["L4-03", "S6-04", "S2-01"], "d": "複数の製品・市場に展開でき、顧客価値に大きく寄与し、模倣が難しい中核的な技能に集中する。", "s": "事業部の寄せ集めとしてではなく、共通の中核技能を育て、それを新事業に展開する。", "c": "定義が抽象的になりやすく、何でも「コア」と呼び始めると機能しない。", "ai": "暗黙知だった中核技能をAIで形式知化すれば横展開が速まる。同時に、写し取られて流出する危険も生む。", "ask": "自社の中核技能は、AIに写し取られても真似されないか？"}, {"id": "S2-03", "n": "ダイナミック・ケイパビリティ", "en": "Dynamic capabilities", "by": "D.ティース, G.ピサノ & A.シューエン", "y": "1997", "m": ["M5", "M7"], "r": ["L4-10", "S2-01", "F6-04"], "d": "環境の変化を感知し、機会を捉え、資源を組み替え続ける能力そのものが、優位の源泉になる。", "s": "変化の速い市場では、「何を持っているか」より「どれだけ速く組み替えられるか」を鍛える。", "c": "概念が広く、測定と実務への落とし込みが難しい。", "ai": "モデルの更新は絶え間なく続く。特定ツールの習熟よりも、入れ替え続ける組織能力が差を生む。", "ask": "新しいモデルが出てから業務に反映するまで、何日かかるか？"}, {"id": "S2-04", "n": "両利きの経営", "en": "Organizational ambidexterity", "by": "J.マーチ（1991）／C.オライリー & M.タッシュマン（2004）", "y": "1991／2004", "m": ["M7", "M5"], "r": ["S1-04", "F4-03", "S6-02"], "d": "既存事業の深化と、新事業の探索を同時に行う。探索部門は組織的に分けつつ、経営トップが両者を統合する。", "s": "既存事業の物差しで新事業を評価しない。資源配分と評価指標を分ける。", "c": "分けすぎると既存の資産を活かせず、統合しすぎると探索が潰される。", "ai": "エージェントによる既存業務の効率化と新事業の探索が同じ予算を奪い合い、配分ルールが要になる。", "ask": "AI投資のうち効率化と探索への配分比率を、誰が決めているか？"}, {"id": "S2-05", "n": "戦略的フィット（活動システム）", "en": "Strategic fit", "by": "M.ポーター", "y": "1996", "m": ["M7"], "r": ["S1-01", "S2-06", "F3-03"], "d": "戦略とはトレードオフを伴う選択である。活動同士が互いを補強し合う体系は、全体として模倣が難しい。", "s": "業務効率の改善（ベストプラクティスの導入）は戦略ではない。「何をしないか」を決める。", "c": "強いフィットは、環境が変わったときの柔軟性を下げる。", "ai": "AIを個別業務に点で入れても優位にならない。活動の連鎖ごと再設計して初めて模倣されにくくなる。", "ask": "AIを入れる前に、自社があえてやめる活動は何か？"}, {"id": "S2-06", "n": "ストーリーとしての競争戦略", "en": "Strategy as a story", "by": "楠木建", "y": "2010", "m": ["M7"], "r": ["S2-05", "L2-09"], "d": "個々の打ち手ではなく、因果でつながった一貫した筋書きが優位を生む。核は、単独では一見非合理に見える打ち手（クリティカル・コア）。", "s": "競合が「合理的でない」と考えて真似しない要素を、自社の筋書きの中では合理的にする。", "c": "成功事例を事後的に物語化する罠（生存者バイアス）に注意する。", "ai": "生成AIは打ち手の案をいくらでも出せるが、因果でつなぐ筋書きと捨てる判断は経営者に残る。", "ask": "AI活用の打ち手は、どの因果で自社の勝ち筋につながるか？", "wl": "ja"}, {"id": "S2-07", "n": "価値規律", "en": "Value disciplines", "by": "M.トレーシー & F.ウィアセーマ", "y": "1993", "m": ["M7"], "r": ["S1-01", "S2-05"], "d": "業務の卓越性、製品リーダーシップ、顧客との親密性のうち一つで突出し、他の二つは業界水準を保つ。", "s": "組織文化、指標、採用する人材を、選んだ一つの規律に揃える。", "c": "3つすべてで1位を狙うと、どれでも勝てなくなる。", "ai": "業務の卓越性はAIで誰もが到達しやすくなる。差がつくのは親密性か製品の側へ移りやすい。", "ask": "AI時代に自社が突出すべき規律は、業務、製品、親密性のどれか？"}, {"id": "S2-08", "n": "7パワーズ", "en": "7 Powers", "by": "H.ヘルマー", "y": "2016", "m": ["M1", "M8"], "r": ["L4-14", "S2-01", "S2-10"], "d": "持続的な高収益の源泉は、規模の経済・ネットワーク経済・カウンターポジショニング・スイッチングコスト・ブランド・独占的資源・プロセス力の7つに限られる。", "s": "自社の優位がどのパワーに当たり、事業のどの段階で築けるかを確かめる。カウンターポジショニングは、既存企業が本業を傷つけるために真似できない新モデルで勝つ型。", "c": "7つに当てはまらない一時的な優位（先行、運）を、持続的な優位と混同しない。", "ai": "AIそのものは誰でも使えるため、パワーにならない。AIで強化できる独占的資源（独自データ）やプロセス力、既存企業が採れない提供・価格のモデルが源泉になる。", "ask": "自社の利益を守っているのは7つのパワーのどれで、それはAIで崩れないか？"}, {"id": "S2-09", "n": "ハリネズミの概念", "en": "Hedgehog concept", "by": "J.コリンズ", "y": "2001", "m": ["M7"], "r": ["S6-01", "L2-09", "S2-02"], "d": "情熱を持てること、世界一になれること、経済的な原動力になることの3つが重なる一点に集中する。", "s": "事業の選択と集中を、3つの円の重なりで議論する。", "c": "『ビジョナリー・カンパニー2』で取り上げた企業の多くは、後に業績が低迷した。生存者バイアス（L2-09）に注意する。", "ai": "AIで何でもできるようになるほど、何に集中するかの判断の価値が上がる。AI活用の領域選定にも、3つの円を当てる。", "ask": "自社が世界一になれる領域と、利益の原動力は一致しているか？"}, {"id": "S2-10", "n": "データ・フライホイール", "en": "Data flywheel", "by": "J.コリンズ（フライホイール, 2001）／A.ング（AIの好循環）", "y": "2001〜", "m": ["M2", "M1"], "r": ["L1-15", "L6-08", "S2-08"], "d": "製品を使う人が増えるとデータが増え、データでAIが良くなり、良くなった製品がさらに利用者を呼ぶ、という好循環を回す。", "s": "利用の現場でデータが自然に貯まる仕組み（フィードバックの取得、利用ログ）を、最初から製品に組み込む。", "c": "データの増加による改善は早期に頭打ちになりやすく、参入障壁としては過大評価されがちである（Casado & Lauten 2019）。", "ai": "汎用モデルの性能向上が速いと、自社データで作った差は短期間で縮む。データは量より、業務の判断結果とその正誤の記録として貯める。", "ask": "自社のAIは、使われるほど何が良くなる仕組みになっているか？"}, {"id": "S2-11", "n": "AIファクトリー", "en": "AI factory", "by": "M.イアンシティ & K.ラカーニ", "y": "2020", "m": ["M1", "M7"], "r": ["S2-10", "L3-13", "L4-02"], "d": "データの収集、アルゴリズムによる予測、実験、ソフトウェア基盤を事業の中核に置いた企業は、規模が大きくなっても収穫逓減に陥りにくい。", "s": "AIを個別の業務改善の道具ではなく、意思決定を生み出す工場として事業の中心に据える。データ基盤と実験の仕組みを全社で共通化する。", "c": "既存企業がこの形に移るには、組織と権限の大きな再設計が要る（L3-13）。", "ai": "人の判断を前提とした業務が減るほど、AIファクトリー型の企業は人員に比例しない成長を実現しやすくなる。", "ask": "自社で、人を増やさずに規模を拡大できる業務はどこか？"}, {"id": "S3-01", "n": "先行者優位と後発優位", "en": "First-mover advantage", "by": "M.リーバーマン & D.モンゴメリー", "y": "1988", "m": ["M5", "M8"], "r": ["L4-05", "L5-07", "L5-02"], "d": "先行者は技術・資源・顧客の囲い込みで有利になりうる。後発者は、市場の不確実性が晴れた後に学習し、安く参入できる。", "s": "ネットワーク効果やロックインが強い市場では先行が、技術や需要が不確実な市場では素早い追随が有利になる。", "c": "市場を開拓した企業の失敗率は47%に上るとの研究がある（Golder & Tellis 1993）。", "ai": "利用データが改善に還流する領域では先行の学習効果が効く。基盤モデルの乗り換えで後発も追いつく。", "ask": "先に動いて得られる自社固有の学習は何で、いつ蓄積されるか？"}, {"id": "S3-02", "n": "OODAループ", "en": "OODA loop", "by": "J.ボイド", "y": "1970年代後半〜1980年代", "m": ["M5", "M8"], "r": ["F6-01", "F6-08", "S4-02"], "d": "観察→状況判断→意思決定→行動のループを相手より速く回し、相手の判断を混乱させて勝つ。", "s": "計画の精緻さよりも、状況判断を更新する速さで勝負する。現場への権限委譲が前提になる。", "c": "PDCAとの優劣論は不毛である。核心は、経験や文化に基づく解釈を担う「状況判断（Orient）」にある。", "ai": "観察と状況判断をエージェントが常時担い、ループは秒単位に縮む。人は判断基準と権限の設計に回る。", "ask": "判断の遅れは、情報収集と承認のどちらで起きているか？"}, {"id": "S3-03", "n": "リーン・スタートアップ", "en": "Lean startup", "by": "S.ブランク（2005）／E.リース（2011）", "y": "2005／2011", "m": ["M5"], "r": ["L1-10", "S6-03", "F4-06"], "d": "最小限の製品（MVP）で仮説を検証し、構築→計測→学習のループを回しながら、必要なら方向転換（ピボット）する。", "s": "不確実性の高い新規事業では、計画の正確さより学習の速さで勝つ。", "c": "規制産業や大規模なインフラでは、MVPが成立しにくい。", "ai": "試作の費用が激減し、MVPを数日で多数作れる。競争の焦点は、何を検証するかの選別に移る。", "ask": "来月までに検証すべき、最も危うい仮説は何か？"}, {"id": "S3-04", "n": "タイムベース競争", "en": "Time-based competition", "by": "G.ストーク", "y": "1988", "m": ["M5", "M3"], "r": ["S3-02", "F5-05"], "d": "開発・生産・配送のスピードそのものを、競争優位の源泉とする。", "s": "リードタイムの短縮は、コスト、品質、顧客満足を同時に改善しうる。", "c": "スピードのための品質低下や、現場の疲弊に注意する。", "ai": "見積や契約審査などの待ち時間が縮む。ただし速度の差はすぐ標準化され、優位は短命に終わりやすい。", "ask": "顧客が最も待たされている工程のリードタイムは、今何日か？"}, {"id": "S3-05", "n": "創発的戦略", "en": "Emergent strategy", "by": "H.ミンツバーグ & J.ウォーターズ", "y": "1985", "m": ["M5", "M7"], "r": ["F4-08", "S3-03", "F6-07"], "d": "実際に実現される戦略は、計画された戦略だけでなく、現場の行動の積み重ねから事後的に形成されたパターンからも生まれる。", "s": "計画と現場の実験を両立させ、うまくいった創発を拾い上げて正式な戦略に格上げする。", "c": "「創発」を、計画を放棄する言い訳にしない。", "ai": "現場が自発的に始めたAI利用が創発の源になる。拾い上げる仕組みがなければ、隠れた利用で終わる。", "ask": "現場で自発的に始まったAI活用を、誰がいつ拾い上げているか？"}, {"id": "S3-06", "n": "ブリッツスケーリング", "en": "Blitzscaling", "by": "R.ホフマン & C.イェ", "y": "2018", "m": ["M5", "M1"], "r": ["L4-05", "S3-01", "L4-15"], "d": "勝者総取りの市場では、効率を犠牲にしてでも、競合より圧倒的に速く規模を取りに行く。", "s": "ネットワーク効果やスイッチングコストが強い市場でのみ有効。効率よりスピードを優先する期間と条件を明確にする。", "c": "勝者総取りでない市場で行うと、資金を燃やすだけに終わる。", "ai": "AI市場ではモデルの性能差が短期間で縮むため、速度だけで築いた優位は崩れやすい。顧客接点とデータの囲い込みとセットで考える。", "ask": "この市場は本当に勝者総取りで、速度を優先するに値するか？"}, {"id": "S3-07", "n": "ランド・アンド・エクスパンド", "en": "Land and expand", "by": "SaaS企業の販売実務", "y": "2010年代", "m": ["M5"], "r": ["S6-03", "F5-10", "L1-10"], "d": "まず小さな部署や用途で導入してもらい（ランド）、成果を示しながら、同じ顧客の中で利用範囲を広げる（エクスパンド）。", "s": "初回の契約を小さくして意思決定のハードルを下げ、拡大の道筋を最初の契約に仕込む。", "c": "他部署へ広げる価値がなければ、小さな契約のまま終わる。", "ai": "AI案件はPoCで止まりやすい。初回の契約に、本番移行の条件と、次の展開先についての優先交渉を書き込む。", "ask": "初回の導入が成功した場合、次に広げる部署と予算は決まっているか？"}, {"id": "S4-01", "n": "孫子の兵法", "en": "The Art of War", "by": "孫武（成立は諸説）", "y": "紀元前5世紀頃", "m": ["M8", "M4"], "r": ["S4-03", "F2-03"], "d": "戦わずして勝つことを最上とする。彼を知り己を知れば、百戦しても危うくない。", "s": "正面からの衝突より、同盟・情報・地の利によって、相手が戦えない状況を作る。", "c": "抽象度が高いため、どんな行動でも後から正当化できてしまう。", "ai": "競合の採用や公開情報をエージェントで継続収集でき、戦う前に相手を知る精度と頻度が上がる。", "ask": "競合の動きを、今は誰がどの頻度で把握しているか？"}, {"id": "S4-02", "n": "クラウゼヴィッツの戦争論", "en": "On War", "by": "C.v.クラウゼヴィッツ", "y": "1832", "m": ["M3", "M4"], "r": ["S3-02", "S4-01"], "d": "戦争は他の手段をもってする政治の継続である。計画は「摩擦」と「霧」で必ず狂う前提に立ち、敵の重心に戦力を集中する。", "s": "戦略は上位の目的に従属する。計画は実行時に必ず狂うものとして、現場の判断の余地を残す。", "c": "「重心」の解釈は論者によって異なる。", "ai": "AIの出力はもっともらしく外れる。計画通りに動く前提で自動化すると、現場の摩擦で破綻する。", "ask": "自動化が想定外に止まったとき、誰が判断を引き取るか？"}, {"id": "S4-03", "n": "間接アプローチ", "en": "Indirect approach", "by": "B.H.リデル・ハート", "y": "1954", "m": ["M8"], "r": ["S1-04", "S1-03", "S4-01"], "d": "敵の正面を避け、予期しない方向から弱点を突き、心理的な混乱によって勝つ。", "s": "強者の主戦場で戦わず、相手が反応しにくい顧客層・チャネル・ビジネスモデルから攻める。", "c": "相手も同じことを考える。予期されない方向は長くは続かない。", "ai": "大手が手を出しにくい小口の顧客層も、AIの低い対応コストなら採算に乗せられる。", "ask": "大手が採算が合わず手を出さない顧客層は、どこか？"}, {"id": "S4-04", "n": "しっぺ返し戦略", "en": "Tit for tat", "by": "A.ラパポート（考案）／R.アクセルロッド（1984）", "y": "1980／1984", "m": ["M8"], "r": ["L4-09", "S4-06"], "d": "最初は協調し、その後は相手の前回の手をそのまま返す。繰り返し型の囚人のジレンマの総当たり戦で、最高得点を挙げた。", "s": "取引先や競合との長期的な関係では、協調を基本にし、裏切りには即座に応じ、許すのも早くする。", "c": "誤解や偶然のミスが起きる環境では、報復の連鎖に陥る。寛容さを加えた変種のほうが強い。", "ai": "価格をAIが自動改定する市場では報復の応酬が高速化し、誤読による値崩れも起きやすい。", "ask": "競合の値下げへの反応を、自社はどこまで自動化するか？"}, {"id": "S4-05", "n": "コミットメント戦略", "en": "Strategic commitment", "by": "T.シェリング", "y": "1960", "m": ["M8", "M4"], "r": ["S4-04", "L2-05", "L2-07"], "d": "自分の選択肢をあえて減らし、後戻りできない姿勢を示すことで、相手の行動を変える。", "s": "大規模な設備投資や公約で、競合の参入を思いとどまらせる。社内でも、退路を断つ宣言が変革を加速する。", "c": "相手が信じなければ、単なる損失になる。撤退できないリスクを自ら負う。", "ai": "AI基盤への大型投資の宣言は競合への信号になる。ただし技術の進みが速く、後戻りの損失も膨らむ。", "ask": "後戻りしないと公言できるAI領域は、どこか？"}, {"id": "S4-06", "n": "コーペティション", "en": "Co-opetition", "by": "A.ブランデンバーガー & B.ネイルバフ", "y": "1996", "m": ["M8"], "r": ["L4-09", "S5-04", "S4-04"], "d": "競争と協調を組み合わせる。自社製品の価値を高める他社（補完者）を含めた「価値相関図」で関係を捉える。", "s": "競合とも標準づくりでは協調し、市場が広がった後で競争する。パイを大きくしてから分け合う。", "c": "協調の範囲を明確にしないと、技術の流出や独占禁止法上のリスクを招く。", "ai": "競合とデータを出し合い共通モデルを育てる余地が生まれる。データの帰属が、協調の火種にもなる。", "ask": "競合と共有してよいデータと、出せないデータの線はどこか？"}, {"id": "S4-07", "n": "原則立脚型交渉（BATNA）", "en": "Principled negotiation", "by": "R.フィッシャー & W.ユーリー", "y": "1981", "m": ["M4", "M8"], "r": ["L2-04", "L2-02"], "d": "立場ではなく利害に焦点を当てる。交渉が決裂した場合の最善の代替案（BATNA）を強くすることが、交渉力の源泉になる。", "s": "交渉の前に代替案を作り込んでおく。相手のBATNAも推定する。", "c": "自分のBATNAを過大に評価すると、成立させるべき合意を逃す。", "ai": "AIが相手の過去条件や相場を即座に整理し、BATNAの推定精度が上がる。相手も同じ道具を持つ。", "ask": "今の交渉相手が降りたとき、自社の次善の手は何か？"}, {"id": "S4-08", "n": "シグナリング", "en": "Signaling", "by": "M.スペンス", "y": "1973", "m": ["M4", "M8"], "r": ["L4-07", "S4-05"], "d": "情報を持つ側が、真似するとコストが高くつく行動（保証、学歴、大型投資）によって、自分の質を相手に伝える。", "s": "品質への自信を、長期保証、成果報酬、実績の公開など、コストのかかる形で示す。", "c": "コストの低いシグナルは誰でも真似できるため、信頼されない。", "ai": "「AI搭載」は誰でも名乗れるため、品質のシグナルにならない。第三者の認証、評価結果の公開、成果連動の契約が、信頼の証拠になる。", "ask": "自社の品質を、競合が簡単には真似できない形で示す手段は何か？"}, {"id": "S4-09", "n": "非市場戦略", "en": "Nonmarket strategy", "by": "D.バロン", "y": "1995", "m": ["M8"], "r": ["L5-10", "F5-18", "F3-10", "L5-16"], "d": "市場での競争だけでなく、規制・政策・世論・社会からの評価といった市場の外の環境に、戦略的に働きかける。", "s": "規制の形成に早期から関与し、業界の自主ルールづくりを主導する。市場戦略と一体で設計する。", "c": "不透明なロビー活動は評判のリスクを生む。透明性が前提になる。", "ai": "AIでは規制とガイドラインが急速に形成されつつあり、ルールづくりへの参加が競争条件を左右する。ガバナンスの実践を対外的に示すこと自体が非市場戦略になる。", "ask": "自社の事業に影響するAI関連のルールづくりに、誰がどう関与しているか？"}, {"id": "S5-01", "n": "プラットフォーム戦略", "en": "Platform strategy", "by": "J.C.ロシェ & J.ティロール（2003）／G.パーカー他（2016）", "y": "2003／2016", "m": ["M1", "M2", "M8"], "r": ["L4-05", "F4-06", "S5-04"], "d": "複数の利用者グループをつなぐ場を提供し、グループ間のネットワーク効果で価値を増幅させる。", "s": "片側を補助（無料化）して利用者を集め、もう片側で収益を上げる。「鶏が先か卵が先か」の問題を最初に解く。", "c": "勝者総取りになりやすく、規制や独占禁止法の監視の対象になる。", "ai": "エージェントが利用者と事業者の窓口になれば、画面を持つ場の優位は中抜きされる恐れがある。", "ask": "エージェントが間に入っても選ばれ続ける理由は、何か？"}, {"id": "S5-02", "n": "オープン・イノベーション", "en": "Open innovation", "by": "H.チェスブロウ", "y": "2003", "m": ["M7"], "r": ["S5-04", "L1-09"], "d": "社内外の知識と技術を意図的に流入・流出させ、イノベーションを加速する。", "s": "自前主義を捨て、スタートアップ・大学・顧客の知見を取り込む。自社で使わない技術はライセンスで外に出す。", "c": "受け入れる側に外部の知識を理解し活用する力（吸収能力）がなければ、成果は出ない。", "ai": "外部のモデルや技術を取り込む敷居は下がった。受け入れ側の評価力が追いつかず、選別で詰まりやすい。", "ask": "外部のAI技術の採否を判断できる人は、社内に何人いるか？"}, {"id": "S5-03", "n": "エコシステム戦略（ワイドレンズ）", "en": "The Wide Lens", "by": "R.アドナー", "y": "2012", "m": ["M3", "M8"], "r": ["L1-07", "S5-01"], "d": "自社製品が優れていても、補完製品の準備や流通の受け入れが揃わなければ、顧客に価値は届かない。", "s": "補完者の開発が遅れるリスクと、流通の各段階が採用を拒むリスクを洗い出し、エコシステムが揃う順序を設計する。", "c": "エコシステムの主導権争いに時間を取られ、市場投入が遅れることもある。", "ai": "AIの価値は、既存システムとの接続やデータ整備といった補完要素の準備に左右される。", "ask": "AIが価値を出すために、他社の何が揃う必要があるか？"}, {"id": "S5-04", "n": "オープン＆クローズ戦略", "en": "Open and closed strategy", "by": "小川紘一", "y": "2014", "m": ["M8"], "r": ["S5-01", "S4-06", "L5-07"], "d": "普及させたい領域は標準化・公開し、収益の源泉となる中核はブラックボックス化して守る。", "s": "何を公開して市場を広げ、どこで稼ぐかの境界を、事業の開始前に設計する。", "c": "日本企業が「技術で勝って事業で負けた」反省から体系化された。境界の設計を誤ると価値が流出する。", "ai": "公開した標準やAPIはAIに読み取られ再現されやすい。クローズにすべき中核の範囲を引き直す必要がある。", "ask": "AIに読み取られても守れる、自社の収益源はどこか？", "wl": "ja"}, {"id": "S5-05", "n": "垂直統合と水平分業", "en": "Make or buy", "by": "R.コース（1937）／O.ウィリアムソン（1975）", "y": "1937／1975", "m": ["M3", "M7"], "r": ["S2-01", "L4-06", "F3-01"], "d": "取引コストの高い活動（自社専用の資産が要る、不確実性が高い）は内製し、低い活動は市場から調達する。", "s": "何を自社で持ち、何を外部に任せるかを、取引コストの大きさで判断する。技術が成熟すると最適解は変わる。", "c": "業界の進化に伴い、統合と分業は振り子のように揺れ動く。", "ai": "基盤モデルは外部調達が基本になる。自社データと業務に密着する層は、依存を避けて内製を問われる。", "ask": "AIの機能のうち、乗り換えが効かず内製すべき層はどこか？"}, {"id": "S5-06", "n": "アグリゲーション理論", "en": "Aggregation theory", "by": "B.トンプソン", "y": "2015", "m": ["M1", "M2"], "r": ["S5-01", "L4-05", "L4-15"], "d": "インターネットでは流通と取引のコストがゼロに近づき、供給者ではなく、利用者の体験を束ねる者（アグリゲーター）が市場の支配力を持つ。", "s": "供給を持つことより、利用者との直接の接点と体験を持つことが力になる。供給者の側は、アグリゲーターへの依存度を管理する。", "c": "規制や供給者の団結によって、アグリゲーターの支配力は制約されうる。", "ai": "AIアシスタントが利用者の入口になると、検索や比較サイトに代わる新しいアグリゲーターになりうる。自社がAI経由でどう選ばれるかを設計する。", "ask": "顧客が自社を見つける入口は、誰に握られているか？"}, {"id": "S6-01", "n": "選択と集中", "en": "Focus and selection", "by": "J.ウェルチ", "y": "1981", "m": ["M1", "M3"], "r": ["L1-01", "F4-02", "S6-02"], "d": "業界で1位か2位になれる事業に経営資源を集中し、それ以外は立て直し、売却、閉鎖のいずれかを選ぶ。", "s": "総花的な資源配分をやめ、勝てる事業に投資を集める。", "c": "行き過ぎると、将来の芽（オプション）を摘む。日本では人員削減の名目として使われた例も多い。", "ai": "AIで事業ごとの固定費構造が変わり、1位か2位かという判断基準そのものを再計算する必要が出る。", "ask": "AIを前提にすると、採算が崩れる事業はどれか？"}, {"id": "S6-02", "n": "バーベル戦略", "en": "Barbell strategy", "by": "N.タレブ", "y": "2007／2012", "m": ["M4", "M1"], "r": ["L1-02", "S6-03", "S6-01"], "d": "資源の大部分を極めて安全な領域に、小部分を上振れの大きい高リスク領域に置き、中途半端な中間を避ける。", "s": "本業の安定した収益を守りながら、小さな賭けを数多く打ち、大きな上振れを狙う。", "c": "「安全な側」が本当に安全かどうかの検証が欠かせない。", "ai": "本業の自動化を安全側に置き、探索は小口の実験を大量に走らせて当たりを選別できる。", "ask": "失っても構わない額で、AIの小さな賭けを何本打つか？"}, {"id": "S6-03", "n": "リアル・オプション", "en": "Real options", "by": "S.マイヤーズ（1977）／R.マグレイス & I.マクミラン（1995）", "y": "1977／1995", "m": ["M4", "M5"], "r": ["L2-05", "S3-03", "F6-06"], "d": "不確実な投資を、小さく始めて学び、結果に応じて拡大または撤退できる「権利」として扱う。", "s": "新規事業は段階ごとに投資し、各段階の仮説の検証結果を見て次の投資を判断する（仮説指向計画法）。", "c": "撤退が実際に実行されなければ、小口の投資を続けるだけになる（サンクコスト効果）。", "ai": "試作費が下がり、小さく始める段階を細かく刻める。撤退基準を事前に決めなければ、実験が終わらない。", "ask": "PoCを止める条件を、始める前に数値で決めているか？"}, {"id": "S6-04", "n": "関連多角化", "en": "Related diversification", "by": "R.ルメルト", "y": "1974", "m": ["M7"], "r": ["L4-03", "S2-02", "F4-01"], "d": "共通の資源・技術・市場でつながる分野への多角化は、関連のない多角化より高い業績につながりやすい。", "s": "新事業を選ぶ基準を「自社の中核資源が活きるか」に置く。", "c": "「関連」の定義が曖昧だと、どんな事業でも関連づけられてしまう。", "ai": "共通のデータと基盤モデルで事業間のつながりが見えやすくなり、関連といえる範囲が広がる。", "ask": "自社の既存データが活きる隣接事業は、どこか？"}, {"id": "S6-05", "n": "70-20-10ルール", "en": "70-20-10 rule", "by": "B.ナジ & G.タフ", "y": "2012", "m": ["M4", "M5"], "r": ["F4-03", "S2-04", "S6-02"], "d": "イノベーションへの投資を、中核事業の改善に約7割、隣接領域に約2割、変革的な新領域に約1割配分する。", "s": "投資の配分を明示し、中核への偏りを防ぐ。配分の比率は、業界と成長の段階に合わせて調整する。", "c": "比率は目安である。著者らも、業界によって最適な配分は異なるとしている。", "ai": "AI投資も、既存業務の効率化（中核）、隣接サービス、AIを前提とした新事業に分けて予算を持つ。効率化だけに集中すると成長の機会を逃す。", "ask": "AIの予算のうち、効率化以外に投じている比率は何%か？"}, {"id": "S6-06", "n": "ベストオーナー原則", "en": "Best-owner principle", "by": "T.コラー他（マッキンゼー『Valuation』）／経済産業省『事業再編実務指針』", "y": "2010年代／2020", "m": ["M7"], "r": ["S6-01", "S6-04", "L2-19"], "d": "ある事業は、その事業から最も多くの価値を引き出せる所有者のもとで、最も高く評価される。", "s": "事業ポートフォリオを、自社がその事業のベストオーナーかどうかで定期的に見直し、そうでなければ売却や切り出しを検討する。", "c": "ベストオーナーの判断には、シナジーの過大評価がつきまといやすい。", "ai": "AIで業務の標準化と統合が進むほど、事業間のシナジーの源泉が変わる。共通のAI基盤を活かせるかが、ベストオーナーの新しい判断軸になる。", "ask": "この事業から、自社より多くの価値を引き出せる所有者は他にいないか？"}, {"id": "F1-01", "n": "MECE", "en": "MECE principle", "by": "B.ミント（マッキンゼー）", "y": "1960年代", "m": ["M6"], "r": ["F1-02", "F1-03"], "d": "「漏れなく、ダブりなく」分ける分類の原則。", "s": "論点や選択肢を網羅し、議論の重複と見落としを防ぐ。本資料の分類もこの原則で設計している。", "c": "MECEな分け方は無数にある。意思決定に効く切り口を選ぶことが本質である。", "ai": "生成AIに論点を列挙させ、漏れと重複の点検を任せる。どの切り口で割るかの選択は人が決める。", "ask": "この意思決定で、どの切り口で分ければ打ち手が変わるか？"}, {"id": "F1-02", "n": "ロジックツリー（イシューツリー）", "en": "Issue tree", "by": "コンサルティング実務", "y": "—", "m": ["M6"], "r": ["F1-01", "F5-03", "F1-07"], "d": "問題を、原因・解決策・論点の階層に、MECEに分解していく。", "s": "大きな問いを、調べれば答えが出る大きさまで分解する。", "c": "分解すること自体が目的になりやすい。優先順位づけとセットで使う。", "ai": "AIに第一階層の分け方を複数案出させて比べる。分解の深さが妥当かは現場知で検証する。", "ask": "最初の問いは、誰がいつまでに何を決めるためのものか？"}, {"id": "F1-03", "n": "ピラミッド原則", "en": "Pyramid principle", "by": "B.ミント", "y": "1970年代", "m": ["M6"], "r": ["F1-04", "F1-01"], "d": "結論を頂点に置き、それを支える根拠を下に階層化して伝える。", "s": "経営層への報告は結論から始める。各階層の要素はMECEにする。", "c": "考えを探索する段階ではなく、伝える段階のための型である。", "ai": "AIに要約させると結論が丸くなりやすい。頂点のメッセージは人が尖らせて置く。", "ask": "経営会議で承認を取りたい結論を、一文で言うと何か？"}, {"id": "F1-04", "n": "So What?／Why So?", "en": "So What / Why So", "by": "照屋華子・岡田恵子", "y": "2001", "m": ["M6"], "r": ["F1-03", "F3-04"], "d": "情報から「だから何が言えるか」を引き出し、結論に対して「なぜそう言えるか」を確かめる往復。", "s": "分析結果の羅列を、示唆と打ち手に変換する。", "c": "So What?を飛ばしたフレームワーク分析は、「整理しただけ」で終わる。", "ai": "AIは要約が得意だが、示唆は一般論に流れやすい。自社固有のSo What?は人が詰める。", "ask": "この分析結果を見て、経営者は明日何を変えるのか？", "wl": "ja", "wq": "ロジカル・シンキング"}, {"id": "F1-05", "n": "仮説思考（イシュー起点）", "en": "Hypothesis-driven thinking", "by": "内田和成（2006）／安宅和人（2010）", "y": "2006／2010", "m": ["M6"], "r": ["L2-03", "S3-03", "L2-01"], "d": "情報を集め切る前に仮の答えを置き、検証しながら修正する。そもそも答えるべき問い（イシュー）を見極めることから始める。", "s": "調査と分析の量を減らし、意思決定までの時間を短くする。", "c": "確証バイアス（L2-03）と表裏一体である。反証を探す姿勢が前提になる。", "ai": "仮説を大量に出させて検証を速められる。AIの仮説はもっともらしく見えるため、反証の設計が要る。", "ask": "この仮説が誤りだと分かるのは、どんなデータが出たときか？", "wl": "ja", "wq": "仮説思考"}, {"id": "F1-06", "n": "第一原理思考", "en": "First principles thinking", "by": "アリストテレス（起源）／E.マスク（普及）", "y": "—", "m": ["M3"], "r": ["S1-02", "L1-07"], "d": "慣習や類推を外し、それ以上分解できない事実から考え直す。", "s": "業界の常識とされるコスト構造や制約を疑い、根本から設計し直す。", "c": "時間がかかる。すべての判断に使うと、意思決定が遅くなる。", "ai": "AIの出力は既存の常識の平均に寄る。コストの根拠を契約や物理の水準まで問い直す相手に使う。", "ask": "この業界で当然とされる制約のうち、誰も検証していないものは何か？"}, {"id": "F1-07", "n": "5W1H", "en": "Five Ws", "by": "古典修辞学に起源／報道の基本原則", "y": "—", "m": ["M6"], "r": ["F1-01", "F1-02"], "d": "誰が、何を、いつ、どこで、なぜ、どのように、の6つの問いで事象を構造化する。", "s": "背景・目的・論点を整理する最初の一手。本資料の「問い別ガイド」もこの枠で構成している。", "c": "要素を埋めるだけでは示唆は出ない。「なぜ」を掘り下げる。", "ai": "AI導入の背景整理に使う。Whoには、AIの出力に責任を持つ人を必ず入れる。", "ask": "AIの出力を最終確認し、結果に責任を持つのは誰か？"}, {"id": "F1-08", "n": "フェルミ推定", "en": "Fermi estimation", "by": "E.フェルミ", "y": "1940年代", "m": ["M6"], "r": ["F1-02", "F6-10"], "d": "直接は分からない数量を、分かっている要素の掛け算に分解し、桁を外さない概算を出す。", "s": "市場規模や効果の大きさを短時間で見積もり、議論を始める。精密な調査の前に、検討する価値があるかを判断する。", "c": "分解の構造と前提の置き方で、答えが大きく変わる。前提を明示し、感度を確かめる。", "ai": "AIに概算を頼むと、もっともらしい数字が根拠なく返ることがある。分解の式と前提は人が設計し、各要素の数値の出典を確かめる。", "ask": "その数字は、どんな掛け算に分解でき、どの前提が一番効いているか？"}, {"id": "F1-09", "n": "ゼロベース思考", "en": "Zero-based thinking", "by": "実務（ゼロベース予算：P.パイアー）", "y": "1970", "m": ["M3"], "r": ["F1-06", "L2-06"], "d": "既存の前提や枠組みをいったん外し、白紙から最適な形を考える。", "s": "前年踏襲の予算や慣行となった業務を、必要性からゼロで問い直して組み立て直す。", "c": "すべてをゼロから考えるのは非効率である。見直す対象を絞って使う。", "ai": "AIを前提にすると、業務を一から設計し直す価値が上がる。既存業務へのAIの後付けで止めず、ゼロから設計した案と比べる。", "ask": "いまこの業務を一から作るとしたら、今の形を選ぶだろうか？"}, {"id": "F1-10", "n": "インバージョン（逆転思考）", "en": "Inversion", "by": "C.ヤコビ（数学）／C.マンガー（投資）", "y": "19世紀／1980年代〜", "m": ["M4"], "r": ["F6-05", "F6-14"], "d": "「どうすれば確実に失敗するか」を先に考え、その条件を避ける形で計画を作る。", "s": "失敗の条件を洗い出すと、見落としていたリスクと、やってはいけないことが明確になる。", "c": "失敗を避けるだけでは成功しない。攻めの打ち手と組み合わせる。", "ai": "AI導入を確実に失敗させる方法（評価なし、現場不在、統制なし）を先に列挙すると、計画の穴が見つかる。", "ask": "このプロジェクトを確実に失敗させるには、何をすればよいか？"}, {"id": "F1-11", "n": "システム思考（因果ループ図）", "en": "Systems thinking", "by": "J.フォレスター／P.センゲ", "y": "1990", "m": ["M2"], "r": ["L1-06", "L5-11"], "d": "要素同士の因果関係を矢印でつなぎ、自己強化と均衡のループ、時間の遅れを図にして、構造から問題を理解する。", "s": "対症療法が逆効果になる構造（問題のすり替わり、成功の限界など）を見つけ、効く介入点を探す。", "c": "図を描くこと自体が目的になりやすい。検証できる仮説に落とす。", "ai": "AI導入の効果と副作用（利用の増加→コストの増加、自動化→技能の低下）をループで描くと、二次的な影響を事前に議論できる。", "ask": "この施策が効いた結果、何が起き、それが元の問題にどう戻ってくるか？"}, {"id": "F1-12", "n": "ゴースト・デッキ（空パック）", "en": "Ghost deck", "by": "コンサルティング実務", "y": "—", "m": ["M6"], "r": ["F1-03", "F1-05", "L2-03"], "d": "調査を始める前に、最終報告の各ページの結論（メッセージ）とグラフの形だけを先に作る。", "s": "必要な分析と不要な分析が分かり、作業が絞られる。関係者と結論の仮説を早くすり合わせられる。", "c": "先に作った結論に分析を合わせてしまう危険がある（確証バイアス L2-03）。反証が出たら作り直す。", "ai": "AIで分析や資料の作成が速くなるほど、何を作るかの設計が品質を決める。ゴースト・デッキを、AIへの作業指示書として使う。", "ask": "最終報告の1枚目に書く結論の仮説は何か？"}, {"id": "F2-01", "n": "PEST（PESTLE）分析", "en": "PEST analysis", "by": "F.アギラー", "y": "1967", "m": ["M5"], "r": ["F2-04", "F3-04"], "d": "政治・経済・社会・技術（と法律・環境）の観点で、マクロ環境の変化を洗い出す。", "s": "自社では動かせない中長期の変化を捉え、機会と脅威に変換する。", "c": "項目の羅列で終わりやすい。自社への影響の大きさと時期で優先順位をつける。", "ai": "規制や技術動向の収集はAIで加速する。AI規制は地域差が大きく、情報の鮮度確認が欠かせない。", "ask": "今後三年で、自社のAI活用を左右しうる外部変化は何か？"}, {"id": "F2-02", "n": "ファイブフォース分析", "en": "Porter's five forces", "by": "M.ポーター", "y": "1979", "m": ["M8"], "r": ["S1-01", "L4-10", "F2-03"], "d": "既存の競合、新規参入、代替品、買い手、売り手の5つの力で、業界の収益性を説明する。", "s": "参入すべき業界か、どの力を弱めれば利益が残るかを判断する。", "c": "静的な分析である。補完者やエコシステム、急速な技術変化は捉えにくい。", "ai": "買い手が自前でAIを使い、代替品や新規参入が増える。業界構造そのものが動く前提で見直す。", "ask": "顧客が自分でAIを使い始めたら、自社に残る価値は何か？"}, {"id": "F2-03", "n": "3C分析", "en": "3C analysis", "by": "大前研一", "y": "1975", "m": ["M8"], "r": ["F2-02", "S4-01", "F3-02"], "d": "顧客、競合、自社の3つの視点から、成功の鍵（KSF）を導く。", "s": "事業戦略の最初の診断。顧客が求め、自社が提供でき、競合が提供できない領域に勝機を探す。", "c": "協力者（Co-operator）などを加えて拡張されることもある。", "ai": "顧客と競合の情報収集はAIで広げられる。顧客が重視する基準自体がAI時代に変わるかも見る。", "ask": "AIが普及しても、顧客が自社を選ぶ理由は変わらないか？", "wl": "ja", "wq": "3C分析"}, {"id": "F2-04", "n": "シナリオ・プランニング", "en": "Scenario planning", "by": "P.ワック（ロイヤル・ダッチ・シェル）", "y": "1970年代", "m": ["M4", "M5"], "r": ["L1-02", "F2-01", "F6-07"], "d": "不確実性の高い要因を軸に複数の未来像を描き、どの未来でも通用する戦略と、未来の分岐を知らせる兆候を準備する。", "s": "予測が当たらない領域で、意思決定者の思い込みを揺さぶる。石油危機への備えで知られる。", "c": "シナリオを「予測」として扱うと、本来の目的を失う。", "ai": "シナリオ草案はAIに大量に作らせ、人は軸の選定と兆候の設計に集中する。AIの進歩速度も軸にする。", "ask": "将来を最も大きく分ける不確実性を、二つ挙げるなら何か？"}, {"id": "F2-05", "n": "ジョブ理論（JTBD）", "en": "Jobs to be done", "by": "C.クリステンセン他", "y": "2016", "m": ["M7"], "r": ["F4-04", "F2-06"], "d": "顧客は製品そのものを買うのではない。ある状況で片づけたい用事（ジョブ）のために、製品を「雇う」。", "s": "年齢や業種などの属性ではなく、状況と「進歩したい」という欲求で顧客を理解し、本当の競合を見直す。", "c": "ジョブの定義が抽象的すぎると、具体的な施策に落ちない。", "ai": "問合せログや顧客の声をAIで解析し、ジョブの候補を拾う。AIが肩代わりするジョブは何かも問う。", "ask": "顧客はどんな状況で、何を片づけるために自社製品を使うのか？"}, {"id": "F2-06", "n": "カスタマージャーニー", "en": "Customer journey map", "by": "サービスデザイン分野で発展", "y": "—", "m": ["M7"], "r": ["F2-05", "L3-04"], "d": "顧客が認知から購入、利用、推奨に至るまでの行動・思考・感情を、時系列で可視化する。", "s": "体験が途切れる点（ペインポイント）と、部門の縦割りによる不整合を見つける。", "c": "理想の旅程を描いて終わりがち。行動データやインタビューで裏付ける。", "ai": "行動ログの解析やペルソナ別の疑似体験をAIで作れる。接点にAIを入れると、体験の切れ目が移る。", "ask": "顧客が離脱するのは、旅程のどの接点か？"}, {"id": "F2-07", "n": "狩野モデル", "en": "Kano model", "by": "狩野紀昭", "y": "1984", "m": ["M1", "M5"], "r": ["S1-02", "F4-07"], "d": "品質の要素を、当たり前品質・一元的品質・魅力的品質などに分け、充足度と満足度の関係を示す。", "s": "当たり前品質は満たしても満足は上がらないが、欠けると不満が大きい。機能投資の優先順位づけに使う。", "c": "魅力的品質は、時間とともに当たり前品質に変わっていく。", "ai": "AI機能は導入直後こそ魅力的品質だが、すぐ当たり前品質になる。陳腐化の速さを前提に投資を決める。", "ask": "競合が同じAI機能を載せたら、顧客の評価はどう変わるか？"}, {"id": "F2-08", "n": "ポーターのダイヤモンド", "en": "Porter's diamond", "by": "M.ポーター", "y": "1990", "m": ["M7"], "r": ["F2-02", "F2-01"], "d": "国や地域の産業の競争力を、要素条件・需要条件・関連産業・企業の戦略と競争環境の、4要素の相互作用で説明する。", "s": "拠点の立地、産業クラスターへの参加、政策の評価に使う。", "c": "政府と偶然の役割は、補助的な要因として扱われる。", "ai": "AI産業の競争力は、計算資源・電力・人材・データと規制環境の組み合わせで決まる。AI拠点の立地の判断にも使える。", "ask": "この事業に必要な要素（人材・電力・需要・関連企業）が揃う地域はどこか？"}, {"id": "F2-09", "n": "ワードリー・マッピング", "en": "Wardley mapping", "by": "S.ワードリー", "y": "2005〜", "m": ["M5", "M3"], "r": ["L4-14", "S5-05", "L4-13"], "d": "顧客のニーズを起点に、それを支える構成要素を縦に並べ、各要素の進化の段階（新規→特注→製品→汎用品）を横軸に置いて地図にする。", "s": "どの要素を自前で作り、どれを汎用のサービスで調達するかを判断する。競合が見落としている進化の動きを読む。", "c": "進化の段階の判定に主観が入る。複数人で描いて議論する。", "ai": "AIの構成要素（計算資源・基盤モデル・検索・業務アプリ）がどの段階にあるかを描くと、内製すべき部分と汎用品を使う部分が見える。", "ask": "この事業を支える要素のうち、すでに汎用品になったものを自前で作っていないか？"}, {"id": "F2-10", "n": "購買行動モデル（AIDA・AIDMA・AISAS）", "en": "Purchase funnel", "by": "E.S.ルイス（AIDA）／S.R.ホール（AIDMA）／電通（AISAS）", "y": "1898〜2004", "m": ["M6"], "r": ["F5-09", "F4-04", "S5-06"], "d": "顧客が認知から購買に至る心理と行動を段階に分ける。AISASは、検索と共有を加えたインターネット時代の型。", "s": "どの段階で顧客が離脱しているかを特定し、段階ごとに施策と指標を割り当てる。", "c": "実際の購買は直線的には進まない。段階の順番は、製品や顧客によって異なる。", "ai": "顧客がAIアシスタントに比較や推薦を頼むようになると、検索の段階がAIとの対話に置き換わる。AIに推薦されるための情報設計が新しい課題になる。", "ask": "顧客が自社を比較検討するとき、最初に相談する相手は誰（または何）か？"}, {"id": "F3-01", "n": "バリューチェーン分析", "en": "Value chain", "by": "M.ポーター", "y": "1985", "m": ["M3"], "r": ["S5-05", "S2-05"], "d": "企業の活動を主活動と支援活動に分け、どこで価値とコストが生まれているかを分析する。", "s": "強化すべき活動、外部化すべき活動、デジタル化すべき活動を特定する。AI導入の対象業務の洗い出しにも使える。", "c": "製造業を前提にした構造で、プラットフォーム型の事業には合わない。", "ai": "各活動のAI適用余地を、頻度、定型性、誤りの許容度で評価する。個別工程だけでなく全体の再設計まで見る。", "ask": "最も人手と時間を使っている活動は、どの工程か？"}, {"id": "F3-02", "n": "VRIO分析", "en": "VRIO framework", "by": "J.バーニー", "y": "1991／1995", "m": ["M7"], "r": ["S2-01", "S2-02"], "d": "経営資源を、価値、希少性、模倣困難性、組織（活用する体制）の4つの問いで評価する。", "s": "持続的な競争優位の源泉になる資源を特定し、守り育てる対象を選ぶ。", "c": "自社の評価は甘くなりがちである。顧客と競合の視点で検証する。", "ai": "モデル自体は誰でも調達できるため、希少性は生まれにくい。独自データと活用体制が資源になるかを問う。", "ask": "競合が同じAIを使っても、自社だけが持てる資源は何か？"}, {"id": "F3-03", "n": "7Sモデル", "en": "McKinsey 7S framework", "by": "R.ウォーターマン, T.ピーターズ & J.フィリップス", "y": "1980", "m": ["M7"], "r": ["L3-10", "F5-07", "L3-04"], "d": "戦略・組織構造・仕組み（ハードの3S）と、価値観・スタイル・人材・スキル（ソフトの4S）の整合を診断する。", "s": "変革が進まない原因を、組織図ではなく価値観やスキルの不整合に見つける。", "c": "7つの要素の整合状態は示すが、どの順番で変えるべきかは教えてくれない。", "ai": "AI導入が止まる原因は、技術よりスキルや価値観の不整合に表れやすい。7Sで診断する。", "ask": "AI活用を妨げている最大の壁は、制度、人材、価値観のどれか？"}, {"id": "F3-04", "n": "SWOT／クロスSWOT", "en": "SWOT analysis", "by": "1960年代の米国の経営教育で発展（起源は諸説）／H.ワイリック（1982, TOWS）", "y": "1960年代／1982", "m": ["M7"], "r": ["F2-01", "F3-02", "F1-04"], "d": "強み・弱み・機会・脅威を整理し、それらを掛け合わせて戦略の選択肢を導く。", "s": "外部と内部の分析結果を統合し、戦略の選択肢を網羅的に出す。", "c": "整理で止まりやすく、優先順位がつかない。同じ事実が強みにも弱みにもなりうる。", "ai": "要素の列挙はAIで速くなる。クロスで打ち手に変え、優先順位をつける工程は人が担う。", "ask": "この強みが最も生きる機会を、一つに絞ると何か？"}, {"id": "F3-05", "n": "デュポン分析（ROEツリー）", "en": "DuPont analysis", "by": "F.D.ブラウン（デュポン社）", "y": "1910年代", "m": ["M3"], "r": ["F5-03", "L1-07"], "d": "ROE（自己資本利益率）を、売上高利益率×総資産回転率×財務レバレッジに分解する。", "s": "収益性の差がどの要素から来ているかを特定し、打ち手を絞り込む。KPIツリーの原型でもある。", "c": "財務指標の分解にとどまり、ブランドや人材などの非財務要因は見えない。", "ai": "AI投資の効果をマージンと回転率のどこに出すかを先に決める。コスト削減だけで測らない。", "ask": "AI投資は、ROEのどの要素を動かす狙いか？"}, {"id": "F3-06", "n": "ベンチマーキング", "en": "Benchmarking", "by": "R.キャンプ（ゼロックス）", "y": "1989", "m": ["M7"], "r": ["S2-05", "L1-17"], "d": "業界内外の最も優れた実践と自社を指標で比べ、差の原因を分析して取り入れる。", "s": "自社の水準を客観的に把握し、改善の目標を設定する。業界の外の優れた事例からも学ぶ。", "c": "他社の実践は、自社の活動の体系と噛み合わなければ機能しない（S2-05）。数字の比較は定義の違いに注意する。", "ai": "AI活用度の他社比較は、利用率より、業務の成果（処理時間・品質）で行う。定義と母集団を揃えなければ比較にならない。", "ask": "比べている他社の数字は、定義・母集団・時期が自社と揃っているか？"}, {"id": "F3-07", "n": "ユニットエコノミクス（LTV／CAC）", "en": "Unit economics", "by": "SaaS・スタートアップの実務", "y": "2010年代", "m": ["M3"], "r": ["F3-08", "F5-09", "L4-17"], "d": "顧客1人あたりの生涯価値（LTV）と獲得コスト（CAC）を比べ、事業が規模とともに儲かる構造かを判断する。", "s": "LTVがCACの何倍か、CACを何か月で回収できるかを、顧客層とチャネルの別に見る。LTV/CACは3倍以上が目安とされることが多い。", "c": "LTVは解約率の仮定に強く依存し、楽観的になりやすい。", "ai": "AIサービスには利用量に比例する推論原価があり、粗利が従来のSaaSより低くなりうる。LTVは粗利をもとに計算する。", "ask": "顧客1社あたりの粗利ベースのLTVは、獲得コストの何倍か？"}, {"id": "F3-08", "n": "Rule of 40", "en": "Rule of 40", "by": "B.フェルドほか", "y": "2015", "m": ["M4"], "r": ["F3-07", "F6-09"], "d": "ソフトウェア企業の健全性を、売上の成長率と利益率（多くは営業キャッシュフロー率やEBITDA率）の合計が40%を超えるかで見る。", "s": "成長と収益性のどちらを優先しているかを一つの指標で比べ、投資判断の目安にする。", "c": "利益率の定義が企業によって違うため、比較には揃える必要がある。成長段階の違いも考慮する。", "ai": "AI企業は推論原価で利益率が圧迫されやすい。成長率だけでなく、規模の拡大につれて粗利が改善するかを合わせて見る。", "ask": "自社（または投資先）の成長率と利益率の合計は何%で、どちらで稼いでいるか？"}, {"id": "F3-09", "n": "AI成熟度モデル", "en": "AI maturity model", "by": "AI導入の実務で用いられる段階モデル", "y": "—", "m": ["M5"], "r": ["F4-10", "F5-13", "L5-04", "L6-13"], "d": "組織のAI活用を、個人の試行→部門での検証（PoC）→業務への組み込み→全社基盤→AIを前提とした業務の再設計、の段階で診断する。", "s": "現在の段階と、次の1段階だけを議論する。段階を飛ばした計画は失敗しやすい。", "c": "段階の定義は機関によって異なる。数字での比較より、次に進むための条件の議論に使う。", "ai": "多くの企業は、個人の試行と部門のPoCの間で止まる。次の段階に進む条件（評価・データ・統制・予算）を明示して、計画に落とす。", "ask": "自社はどの段階にいて、次の段階に進むために足りない条件は何か？"}, {"id": "F3-10", "n": "リスクベース分類（EU AI法の4区分）", "en": "Risk-based classification", "by": "欧州連合（AI法）", "y": "2024", "m": ["M4"], "r": ["F5-18", "F5-15", "S4-09"], "d": "AIの用途を、禁止・高リスク・限定リスク・最小リスクの4段階に分け、リスクに応じた義務を課す。", "s": "自社のAI用途を影響度で分類し、高リスク（人事・与信・医療など）には人による最終判断と記録を必須にし、低リスクは速度を優先する。", "c": "AI法は2024年8月に発効し、義務は段階的に適用される。実施の時期や細則は見直しが続いており、最新の条文と運用指針を確認する。", "ai": "EU域内で事業をしていなくても、取引先からの要求や日本のAI事業者ガイドラインを通じて、同じリスクベースの考え方が求められる。", "ask": "自社のAI用途のうち、人の権利や重要な意思決定に関わるものはどれか？"}, {"id": "F3-11", "n": "OWASP LLM Top 10", "en": "OWASP Top 10 for LLM Applications", "by": "OWASP", "y": "2023〜", "m": ["M4"], "r": ["L1-12", "F6-14", "F5-15"], "d": "大規模言語モデルを使うアプリケーションの主要な脆弱性（プロンプト・インジェクション、機密情報の漏洩、過剰な権限など）を10項目に整理した一覧。", "s": "AIアプリの設計レビューとテストの観点表として使う。従来のセキュリティ審査に上乗せする。", "c": "版ごとに項目が見直される。最新版を参照する。", "ai": "エージェントが外部の文書やメールを読む設計では、間接的なプロンプト・インジェクションが最大の脅威になる。権限の最小化と人の承認を組み合わせる。", "ask": "AIが読む外部データに悪意ある指示が紛れ込んだら、何が起きるか？"}, {"id": "F4-01", "n": "アンゾフの成長マトリクス", "en": "Ansoff matrix", "by": "H.I.アンゾフ", "y": "1957", "m": ["M4"], "r": ["S6-04", "F4-03"], "d": "製品（既存／新規）と市場（既存／新規）の組み合わせで、市場浸透・市場開拓・製品開発・多角化の4つの成長の方向を整理する。", "s": "成長の選択肢を網羅し、それぞれのリスクの高さを比べる（多角化が最も高い）。", "c": "選択肢を整理するだけで、どれを選ぶかは自社の資源次第である（S6-04）。", "ai": "AIで既存製品を新市場へ展開する障壁が下がる。多角化に見える案が実は低リスクかを再評価する。", "ask": "AIで障壁が下がり、新たに狙えるようになった市場はどこか？"}, {"id": "F4-02", "n": "PPM（BCGマトリクス）", "en": "Growth-share matrix", "by": "B.ヘンダーソン（BCG）", "y": "1970", "m": ["M1"], "r": ["L4-04", "S6-01"], "d": "市場成長率と相対市場シェアで事業を「花形・金のなる木・問題児・負け犬」に分け、資金の配分を決める。", "s": "金のなる木が生む資金を問題児の育成に回す、全社の資源配分の共通言語になる。", "c": "経験曲線を前提にしている。シェアと収益性が連動しない業界では判断を誤る。", "ai": "事業ごとにAIによる代替の度合いを加え、金のなる木が急に衰える可能性を点検する。", "ask": "稼ぎ頭の事業は、AIによる代替でどう変わりうるか？"}, {"id": "F4-03", "n": "3つのホライズン", "en": "Three horizons", "by": "M.バガイ, S.コーリー & D.ホワイト（マッキンゼー）", "y": "1999", "m": ["M5"], "r": ["S2-04", "S6-02", "L5-05"], "d": "中核事業の強化（H1）、成長事業の拡大（H2）、将来の選択肢の創出（H3）を同時に管理する。", "s": "時間軸の異なる投資を、一つの物差しで評価しない。ホライズンごとに指標と予算を分ける。", "c": "H3がいつまでも予算の余り物の扱いになりやすい。", "ai": "AI案件をH1の効率化、H2の新サービス、H3の探索に分け、指標と予算も別々に管理する。", "ask": "AI関連の投資のうち、H3に回す比率は意図した水準か？"}, {"id": "F4-04", "n": "STP", "en": "Segmentation, targeting, positioning", "by": "W.スミス（1956）／P.コトラー", "y": "1956", "m": ["M7"], "r": ["F2-05", "F4-05", "S1-05"], "d": "市場を細分化し、狙う顧客層を決め、競合に対する独自の位置づけを定める。", "s": "全員に売ろうとせず、勝てる顧客層を選ぶ。マーケティング施策（4P）の前提になる。", "c": "属性による細分化では、購入の理由を捉えにくい（ジョブ理論で補う）。", "ai": "AIで顧客を細かく分けられるが、分けても全員を狙えば失敗する。狙う層を絞る判断は人が行う。", "ask": "どの顧客層なら、競合に勝てると言い切れるか？"}, {"id": "F4-05", "n": "4P／4C", "en": "Marketing mix", "by": "E.J.マッカーシー（1960）／R.ラウターボーン（1990）", "y": "1960／1990", "m": ["M7"], "r": ["F4-04"], "d": "製品・価格・流通・販促（売り手の視点）を、顧客価値・顧客の負担・利便性・対話（顧客の視点）と対にして設計する。", "s": "施策同士の一貫性を確かめる。価格だけ、販促だけの議論を防ぐ。", "c": "サービス業では、人・プロセス・物的証拠を加えた7Pが使われる。", "ai": "AIは価格の個別最適化や販促文の大量生成を担える。施策間の一貫性の確認は人が行う。", "ask": "価格、販促、流通の施策は、同じ顧客像に向いているか？"}, {"id": "F4-06", "n": "ビジネスモデル・キャンバス", "en": "Business model canvas", "by": "A.オスターワルダー & Y.ピニュール", "y": "2010", "m": ["M7"], "r": ["S5-01", "S3-03"], "d": "顧客、価値提案、チャネル、顧客との関係、収益の流れ、主要な資源・活動・パートナー、コスト構造の9要素で、事業の全体像を1枚に描く。", "s": "新規事業の仮説を素早く描き、要素同士の整合を議論する。", "c": "競合との比較や、時間による変化は表現できない。", "ai": "AI事業ではコスト構造に推論費用が入り、顧客との関係が学習で変わる。この二点を描き直す。", "ask": "この事業で、顧客から対価を得る仕組みは何か？"}, {"id": "F4-07", "n": "戦略キャンバスとERRC", "en": "Strategy canvas", "by": "W.C.キム & R.モボルニュ", "y": "2005", "m": ["M8"], "r": ["S1-02", "L4-08", "F2-07"], "d": "業界の競争要因ごとに自社と競合の水準を折れ線で描き、「取り除く・減らす・増やす・付け加える」で新しい価値曲線を作る。", "s": "同質化した業界で、差別化と低コストを同時に実現する打ち手を発想する。", "c": "どの競争要因を選ぶかで結論が変わる。要因は顧客の視点で選ぶ。", "ai": "AI導入で業界の競争要因の水準が一斉に上がる。何を減らし取り除くかを決めて、新しい曲線を描く。", "ask": "顧客が価値を感じていないのに、業界が投資している要因は何か？"}, {"id": "F4-08", "n": "Playing to Win（戦略選択カスケード）", "en": "Playing to Win", "by": "A.G.ラフリー & R.マーティン", "y": "2013", "m": ["M7"], "r": ["S3-05", "S1-01", "F5-02"], "d": "勝利の定義→どこで戦うか→どう勝つか→必要な能力→管理の仕組み、の5つの問いを上から下まで一貫させる。", "s": "戦略を「計画書」ではなく「選択の連鎖」として定義し、上位と下位の選択の整合を取る。", "c": "選択を避けると、各段が抽象的な願望で埋まって終わる。", "ai": "AIをどこで使うかは、勝ち筋から逆算して選ぶ。必要な能力の段には、データと人材を入れて問う。", "ask": "当社が勝つとは、三年後に何がどうなっている状態か？"}, {"id": "F4-09", "n": "戦略の核（グッド・ストラテジー）", "en": "The kernel of good strategy", "by": "R.ルメルト", "y": "2011", "m": ["M3"], "r": ["F4-08", "F1-05", "S2-05", "F1-09"], "d": "良い戦略は、状況の診断、基本方針、一貫した行動の3要素からなる。目標の羅列や美辞麗句は戦略ではない。", "s": "戦略案を、最大の課題を特定した診断になっているか、方針は選択を伴うか、行動は互いに一貫しているか、で点検する。", "c": "診断を誤ると、以降のすべてが誤る。診断の根拠を事実で固める。", "ai": "「AIを活用する」は目標であって戦略ではない。AIで解く最大の課題の診断から始める。", "ask": "この戦略は、どんな課題の診断に基づき、何をやらないと決めているか？"}, {"id": "F4-10", "n": "AIユースケース評価マトリクス", "en": "Use-case prioritization matrix", "by": "AI導入の実務（インパクト×実現容易性）", "y": "—", "m": ["M3", "M4"], "r": ["F3-09", "F6-12", "L6-05"], "d": "AIのユースケースを、事業インパクト（売上・コスト・リスク）と実現容易性（データの整備度・技術の成熟度・業務変更の難しさ）の2軸で評価し、着手の順番を決める。", "s": "インパクトが大きく容易なものから着手し、インパクトが大きく難しいものは、基盤を整えてから取り組む本命として準備する。", "c": "インパクトの見積もりは楽観的になりやすい。導入前の業務量（件数・時間・誤り率）を測ってから評価する。", "ai": "技術デモの印象で評価が上振れしやすい。実データでの小規模な検証の結果を、実現容易性の評価に反映する。", "ask": "このユースケースの導入前の業務量は、件数と時間で測れているか？"}, {"id": "F4-11", "n": "AI方式選定ツリー", "en": "AI solution selection tree", "by": "AIアーキテクチャの実務", "y": "—", "m": ["M3"], "r": ["L6-07", "L6-14", "L1-11"], "d": "最もシンプルな方式から順に検討する。プロンプト→検索拡張（RAG）→ツール利用→ワークフロー→エージェント→追加学習（ファインチューニング）。", "s": "知識の参照が必要ならRAG、手順の決まった操作ならワークフロー、動的な判断が本当に必要な場合だけエージェントを選ぶ。手前の方式で足りるなら先に進まない。", "c": "自律性を上げるほど、評価・デバッグ・コスト・失敗時の影響範囲が大きくなる。", "ai": "最新の手法（マルチエージェントなど）を要件より先に決めるのが典型的な失敗。エージェントでなければ不可能だと示せない限り、ワークフローで組む。", "ask": "この要件は、エージェントでなければ本当に実現できないのか？"}, {"id": "F4-12", "n": "バリュー・プロポジション・キャンバス", "en": "Value proposition canvas", "by": "A.オスターワルダー他", "y": "2014", "m": ["M7"], "r": ["F4-06", "F2-05"], "d": "顧客の片づけたい用事・悩み・得たい成果と、自社の製品・悩みの解消策・成果の創出策を左右に並べ、適合を確かめる。", "s": "製品の機能を顧客の悩みと成果に対応づけ、対応のない機能を削る。", "c": "顧客の側の記述が想像で埋まりがち。インタビューで検証する。", "ai": "AI機能の企画は「何ができるか」から考えがちになる。顧客の悩みの側から、AIでしか解けないものを探す。", "ask": "この機能は、顧客のどの悩みを解消し、どの成果を生むか？"}, {"id": "F4-13", "n": "ポジショニング・ステートメント", "en": "Positioning statement", "by": "G.ムーアほか", "y": "1991", "m": ["M8"], "r": ["F4-04", "S1-05", "L2-16", "F4-12"], "d": "「（対象顧客）にとって、（製品）は（競合の代替手段）と違い、（固有の価値）を提供する（カテゴリ）である」の一文で立ち位置を定める。", "s": "一文で書けないなら、戦略に穴がある。営業・マーケティング・開発の言葉を揃える基準にする。", "c": "書けることと、顧客にそう認識されることは別である。顧客の言葉で検証する。", "ai": "「AI搭載」は差別化ではなく、市場への入場券にすぎない。固有の価値は、業務の成果（導入前後の変化）で書く。", "ask": "顧客は購入前に何と比べ、その比較の軸で自社は勝てるか？"}, {"id": "F5-01", "n": "OKR", "en": "Objectives and key results", "by": "A.グローブ（インテル, 1970年代）／J.ドーア（2018）", "y": "1970年代／2018", "m": ["M2"], "r": ["L3-07", "F5-02", "L2-12"], "d": "野心的な目標（O）と、その達成度を測る少数の主要な成果（KR）を、短い周期で設定し公開する。", "s": "全社の方向を揃えつつ、挑戦的な目標を促す。人事評価や報酬とは切り離すのが原則。", "c": "KRそのものが目的化すると、指標の歪みが起きる（L3-07）。", "ai": "AI活用のKRに利用回数を置くと、使うこと自体が目的になる。業務成果で測れるKRにする。", "ask": "AIの導入で、四半期後に何が変われば成功といえるか？"}, {"id": "F5-02", "n": "バランスト・スコアカード／戦略マップ", "en": "Balanced scorecard", "by": "R.キャプラン & D.ノートン", "y": "1992／2004", "m": ["M2", "M5"], "r": ["F5-01", "F5-03", "L3-07"], "d": "財務・顧客・業務プロセス・学習と成長の4つの視点で戦略を指標にし、その因果関係を戦略マップで示す。", "s": "財務指標だけに偏った短期志向を補い、成果に先立つ先行指標を管理する。", "c": "指標が多すぎると、管理のための管理になる。", "ai": "AI投資は学習と成長の視点から始まり、業務、顧客、財務の順に効く。因果を戦略マップで描く。", "ask": "AIの効果が財務に出る前に、先に動く先行指標は何か？"}, {"id": "F5-03", "n": "KPIツリー", "en": "KPI tree", "by": "経営管理の実務（デュポン分析の発展形）", "y": "—", "m": ["M3"], "r": ["F3-05", "L1-07", "L3-07"], "d": "最終目標（KGI）を、計算式でつながる要素（KPI）に分解する。", "s": "現場の行動指標と経営目標を数式でつなぎ、どこを動かすと最も効くか（感度）を特定する。", "c": "数式でつながらない要素（ブランド、人材など）が抜け落ちる。", "ai": "分解の案出しと過去データからの感度推定がAIで速くなる。式に入らない人材やブランドは人が補う。", "ask": "この数字を動かすために、現場が毎週変えられる行動は何か？", "wl": "ja", "wq": "重要業績評価指標"}, {"id": "F5-04", "n": "RACI", "en": "Responsibility assignment matrix", "by": "プロジェクト管理の実務（起源は諸説）", "y": "—", "m": ["M6"], "r": ["L3-06", "L3-04"], "d": "作業ごとに、実行責任者・説明責任者・相談先・報告先を明確にする。", "s": "「誰の仕事か分からない」状態と、「決める人が多すぎる」状態を同時に解消する。", "c": "説明責任者は一人に限る。表を作っても運用しなければ意味がない。", "ai": "AIエージェントの業務にも責任者が要る。AIが実行する作業に、誰が説明責任を負うかを表に明記する。", "ask": "AIの出力で問題が起きたとき、説明責任を負う人は誰か？"}, {"id": "F5-05", "n": "TOCの5つの集中ステップ", "en": "Theory of constraints", "by": "E.ゴールドラット", "y": "1984〜", "m": ["M3"], "r": ["L1-07", "F5-03", "S3-04"], "d": "制約を特定する→制約を徹底活用する→他を制約に従わせる→制約を強化する→次の制約に移る、を繰り返す。", "s": "全工程の効率化ではなく、制約となる工程の稼働を最大化して、全体の産出を増やす。", "c": "制約以外の工程を効率化しても、在庫と無駄が増えるだけになりうる。", "ai": "非制約工程をAIで速めても、全体の成果は増えない。まず制約工程にAIを当てているかを確認する。", "ask": "全体の産出量を決めているボトルネックは、どの工程か？"}, {"id": "F5-06", "n": "レヴィンの3段階モデル", "en": "Lewin's change model", "by": "K.レヴィン", "y": "1947", "m": ["M5"], "r": ["F5-07", "L2-06"], "d": "解凍（現状を揺さぶる）→変革→再凍結（新しい状態を定着させる）の3段階で変化を捉える。", "s": "変革そのものより、事前の「解凍」と事後の「定着」に十分な資源を割く。", "c": "3段階モデルとしての定式化は、後世の再構成だとする研究がある（Cummings他 2016）。", "ai": "AI導入では解凍が不足しやすい。ツールを配る前に、現状のやり方が続かない理由を共有する。", "ask": "現場は、今のやり方を変える必要をどの程度感じているか？"}, {"id": "F5-07", "n": "コッターの8段階", "en": "Kotter's 8-step model", "by": "J.コッター", "y": "1995／1996", "m": ["M5", "M2"], "r": ["L2-02", "L2-06", "F5-08"], "d": "危機感の醸成→推進チーム→ビジョン→伝達→障害の除去→短期的な成果→さらなる変革→文化への定着、の8段階で組織を変える。", "s": "変革の失敗の多くは、最初の段階（危機感の不足）で起きる。短期的な成果を見せて懐疑派を動かす。", "c": "段階を一直線に進む前提のため、並行し反復する現実の変革とずれることがある。", "ai": "AIの短期成果は作りやすい。ただし見せ方次第で、懐疑派が自分の仕事への脅威と受け取る。", "ask": "変革の推進チームに、現場で影響力のある人は入っているか？"}, {"id": "F5-08", "n": "ADKARモデル", "en": "ADKAR model", "by": "J.ハイアット（Prosci）", "y": "2006", "m": ["M6"], "r": ["F5-07", "L2-12", "L5-04"], "d": "個人の変化を、認知・欲求・知識・能力・定着の5段階で捉え、どこで止まっているかを診断する。", "s": "組織の変革（コッター）を個人の単位に落とし込む。研修で知識を与えても、欲求がなければ定着しない。", "c": "コンサルティング会社の実務モデルで、学術的な検証は限られている。", "ai": "研修でAIの知識と能力は付けられる。欲求の段階で、仕事を奪われる不安が止めていないかを見る。", "ask": "AI活用の足が止まっているのは、認知から定着のどの段階か？"}, {"id": "F5-09", "n": "AARRR（パイレーツ・メトリクス）", "en": "AARRR", "by": "D.マクルーア", "y": "2007", "m": ["M2"], "r": ["F2-10", "F3-07", "F5-13"], "d": "顧客の獲得・活性化・継続・紹介・収益化の5段階で指標を置き、成長のどこが詰まっているかを見る。", "s": "段階ごとの転換率を測り、最も詰まっている段階に施策を集中する。", "c": "段階の定義を事業ごとに決めないと、指標を比較できない。", "ai": "社内のAI定着も、利用開始・継続利用・業務への組み込み・他者への推奨・成果の段階で測ると、どこで止まっているかが見える。", "ask": "顧客（社内の利用者）が最も多く離脱しているのはどの段階か？"}, {"id": "F5-10", "n": "MEDDIC", "en": "MEDDIC", "by": "PTC社の営業実務（D.ダンケルほか）", "y": "1996", "m": ["M8"], "r": ["S3-07", "F5-12", "F6-11"], "d": "案件の確度を、定量効果・予算決裁者・判断基準・判断プロセス・顧客の痛み・社内推進者（チャンピオン）の6要素で検証する。", "s": "欠けている要素を案件のリスクとして特定し、次の営業活動を決める。", "c": "チェックリストを埋めること自体が目的になると、顧客理解が浅くなる。", "ai": "AI案件は定量効果の合意が甘くなりがちで、PoCの後に予算がつかない。効果の測り方と決裁者を、PoCの前に確定させる。", "ask": "この案件の予算決裁者は誰で、その人の評価指標に提案はどう効くか？"}, {"id": "F5-11", "n": "SPIN話法", "en": "SPIN selling", "by": "N.ラッカム", "y": "1988", "m": ["M6"], "r": ["F5-10", "L2-02"], "d": "状況質問→問題質問→示唆質問→解決質問の順に聞き、顧客自身に課題の深刻さと解決の価値を語ってもらう。", "s": "大型案件では、提案の前に、顧客が「放置した場合のコスト」を自分の言葉で語る状態を作る。", "c": "型どおりの質問は尋問に聞こえる。顧客理解の深さが前提になる。", "ai": "商談の録音をAIで分析すると、示唆質問の不足など、質問の偏りが見える。営業の育成に使える。", "ask": "顧客は、課題を放置した場合のコストを自分の言葉で語っているか？"}, {"id": "F5-12", "n": "ステークホルダー・マップ（権力×関心）", "en": "Stakeholder map", "by": "A.メンデロウ", "y": "1991", "m": ["M8"], "r": ["F5-07", "F6-11", "F5-10"], "d": "関係者を、影響力の大きさと関心の高さの2軸で分け、それぞれに対する関与の仕方を決める。", "s": "影響力も関心も高い人とは密に協働し、影響力は高いが関心の低い人は満足させ、関心は高いが影響力の低い人には情報を届ける。", "c": "関係者の立場は変化する。定期的に更新する。", "ai": "AI導入では、推進者・決裁者・利用現場・情報システム部門・法務の関心がそれぞれ違う。各者の関心に個別に答える。", "ask": "この変革に反対しうる人の中で、最も影響力が大きいのは誰か？"}, {"id": "F5-13", "n": "導入の三層（ツール・プロセス・カルチャー）", "en": "Three layers of adoption", "by": "AI導入の実務", "y": "—", "m": ["M7"], "r": ["F3-09", "F5-08", "L2-15", "F5-14"], "d": "新しい技術の定着には、ツール層（環境の提供）、プロセス層（業務への埋め込み）、カルチャー層（評価と動機づけ）の三層すべてに施策が要る。", "s": "研修とツールの配布（ツール層）だけで終わっていないかを点検し、業務手順と評価制度の変更まで計画する。", "c": "カルチャー層の変化には時間がかかる。短期の成果指標とは分けて管理する。", "ai": "生成AIの全社展開で利用が伸びない原因の多くは、プロセス層とカルチャー層の欠落にある。業務手順書と人事評価にAI活用を組み込む。", "ask": "AIの活用は、業務手順書と人事評価のどこに書かれているか？"}, {"id": "F5-14", "n": "AI CoE（ハブ＆スポーク型の推進体制）", "en": "AI center of excellence", "by": "AI導入の実務", "y": "—", "m": ["M7"], "r": ["F5-13", "S2-04", "L1-09"], "d": "中央の専門組織（ハブ）が基盤・標準・ガバナンス・人材育成を担い、各事業部門の推進者（スポーク）がユースケースを実装する。", "s": "集中型の専門性と、分散型の現場知識を両立させる。初期は集中させ、成熟とともに権限を現場へ移す。", "c": "ハブが承認の関所になると、現場の速度が落ち、統制の外で使われるシャドーAIを生む。", "ai": "ハブの役割は、共通基盤・評価の仕組み・利用規程の提供に絞り、個別のユースケースは現場が速く回せるようにする。", "ask": "現場がAIのユースケースを始めるとき、中央の承認に何日かかっているか？"}, {"id": "F5-15", "n": "ヒューマン・イン・ザ・ループ設計", "en": "Human-in-the-loop design", "by": "AI・自動化の実務", "y": "—", "m": ["M4", "M6"], "r": ["L2-13", "L6-10", "L5-15"], "d": "AIの処理の流れのどこで、誰が、何を確認・承認するかを、誤りの影響度に応じて設計する。", "s": "取り返しのつかない操作（送金・外部への送信・削除）の前には必ず人の承認を置き、影響の小さい処理は事後の抜き取り確認にする。", "c": "確認の負担が大きすぎると、形だけの承認になる（自動化バイアス L2-13）。", "ai": "確認の位置と密度は固定せず、AIの実績（誤り率）に応じて段階的に緩める。緩める条件を事前に決めておく。", "ask": "この業務で、AIが誤ったときに取り返しがつかない操作はどれか？"}, {"id": "F5-16", "n": "NIST AIリスク管理フレームワーク", "en": "NIST AI RMF", "by": "米国国立標準技術研究所（NIST）", "y": "2023", "m": ["M4"], "r": ["F5-17", "F5-18", "F3-10"], "d": "AIのリスク管理を、統治（Govern）・把握（Map）・測定（Measure）・対処（Manage）の4機能で整理した、任意の枠組み。", "s": "自社のAIガバナンスの抜け漏れを4機能で点検する。国際的な共通言語として、取引先への説明にも使える。", "c": "認証制度ではなく任意の指針である。自社の規模とリスクに合わせて取捨選択する。", "ai": "生成AIに特有のリスク（誤情報、著作権、情報漏洩など）は、生成AI向けの補足文書（NIST AI 600-1、2024年）で補う。", "ask": "自社のAIリスクについて、統治・把握・測定・対処のうち最も弱いのはどれか？"}, {"id": "F5-17", "n": "ISO/IEC 42001（AIマネジメントシステム）", "en": "ISO/IEC 42001", "by": "ISO／IEC", "y": "2023", "m": ["M4", "M2"], "r": ["F5-16", "F6-01", "F5-18"], "d": "AIを開発・提供・利用する組織が、方針・リスク評価・管理策・継続的な改善を仕組みとして運用するための国際規格。第三者の認証を受けられる。", "s": "AIガバナンスを、文書の整備ではなく、PDCAで回る管理の仕組みとして構築する。取引先に統制の実効性を示す証拠になる。", "c": "認証の取得が目的になると、現場で回らない規程が増える。", "ai": "情報セキュリティのISO/IEC 27001と共通の構造を持つため、既存のマネジメントシステムと統合して運用できる。", "ask": "自社のAIの規程は誰がいつ見直し、守られていることをどう確かめているか？"}, {"id": "F5-18", "n": "AI事業者ガイドライン", "en": "AI Guidelines for Business (Japan)", "by": "総務省・経済産業省", "y": "2024", "m": ["M4"], "r": ["F3-10", "F5-16", "S4-09"], "d": "AIの開発者・提供者・利用者が取り組むべき事項を示した、日本政府の統一的な指針。法的拘束力はなく、リスクベースの自主的な取り組みを促す。", "s": "自社が開発者・提供者・利用者のどの立場にあるかを確認し、該当する指針とチェックリストで取り組みを点検する。", "c": "第1.0版（2024年4月）、第1.1版（2025年3月）と更新が続いている。最新版を確認する。", "ai": "AIエージェントやフィジカルAIの普及を踏まえた更新が検討されている。社内規程は、指針の更新に追随できる構造にしておく。", "ask": "自社はAIの開発者・提供者・利用者のどの立場にあり、それぞれの責任は明確か？"}, {"id": "F6-01", "n": "PDCA", "en": "PDCA cycle", "by": "W.シューハート（1939）／W.E.デミング（1950）", "y": "1939／1950", "m": ["M2"], "r": ["S3-02", "F6-03", "F6-04"], "d": "計画→実行→評価→改善を繰り返し、継続的に改善する。", "s": "定常業務の品質と効率の改善に強い。", "c": "デミング自身は、後に評価を「学ぶ（Study）」に置き換えたPDSAを推奨した。計画に時間をかけすぎると、不確実な環境に合わない。", "ai": "AIは評価と改善案の生成を速める。サイクルが速くなる分、何を学ぶかの設計がないと空回りする。", "ask": "次の改善サイクルで、検証したい仮説は何か？"}, {"id": "F6-02", "n": "なぜなぜ分析", "en": "Five whys", "by": "豊田佐吉（起源）／大野耐一（1978）", "y": "1978", "m": ["M2"], "r": ["L3-08", "F6-03"], "d": "問題に対して「なぜ」を繰り返し、表面的な原因から根本原因にたどり着く。", "s": "再発防止策を、個人のミスではなく仕組みの問題として立てる。", "c": "原因が複数ある問題では、一本道の分析が誤る。個人攻撃になると機能しない。", "ai": "AIに原因候補を広く挙げさせると、一本道の分析を避けられる。現場での事実確認は省けない。", "ask": "この問題の原因として、まだ検証していない可能性は何か？"}, {"id": "F6-03", "n": "AAR（アフター・アクション・レビュー）", "en": "After-action review", "by": "米国陸軍", "y": "1970年代", "m": ["M2"], "r": ["L3-08", "F6-04", "F6-02"], "d": "何をする予定だったか、実際に何が起きたか、差はなぜ生じたか、次に何をするか、の4つの問いで行動の直後に振り返る。", "s": "成功か失敗かを問わず、学びを短時間で次の行動に反映させる。", "c": "責任追及の場になると、誰も本当のことを話さなくなる（心理的安全性が前提）。", "ai": "会議の記録と要約はAIが担える。本音を引き出す場づくりは人が担う。", "ask": "計画と実際の差が最も大きかったのは、どの場面か？"}, {"id": "F6-04", "n": "ダブルループ学習", "en": "Double-loop learning", "by": "C.アージリス（1977）／C.アージリス & D.ショーン（1978）", "y": "1977／1978", "m": ["M2", "M7"], "r": ["L4-10", "F6-01", "S2-03"], "d": "行動の修正（シングルループ）だけでなく、その行動を導いた前提や目標そのものを問い直す。", "s": "改善を重ねても成果が出ないときは、ゲームのルール（前提）が変わっていないかを疑う。", "c": "前提を問い直すと、組織の防衛的な反応を招きやすい。", "ai": "AI活用は既存業務の改善に偏りがちである。AIを前提に、業務の目的やルールを問い直せているかを点検する。", "ask": "改善を重ねても成果が出ない、根っこの前提は何か？"}, {"id": "F6-05", "n": "プレモーテム", "en": "Pre-mortem", "by": "G.クライン", "y": "2007", "m": ["M6"], "r": ["L3-09", "L2-08", "L2-03"], "d": "計画を始める前に「1年後、この計画は大失敗に終わった」と仮定し、その理由を全員で挙げる。", "s": "集団浅慮と過度な楽観を抑え、言い出しにくいリスクを表に出す。失敗を確定した事実として想像すると、原因を挙げる力が約30%高まるとの研究がある（Mitchell他 1989）。", "c": "リスクの列挙で終わらせず、対策と担当者まで決める。", "ai": "AIに失敗シナリオを多数出させ、人が思いつかない盲点を拾う。対策の決定と担当の割り当ては人が行う。", "ask": "一年後に計画が失敗したとして、最もありそうな理由は何か？"}, {"id": "F6-06", "n": "ディシジョンツリーと期待値", "en": "Decision tree", "by": "H.ライファ", "y": "1968", "m": ["M4"], "r": ["L1-02", "S6-03", "F6-08"], "d": "選択肢、不確実な事象、その確率と結果を樹形図で表し、期待値で比較する。", "s": "「やる・やらない」の議論を、確率と影響の議論に変える。追加で情報を得ることの価値も計算できる。", "c": "裾の重いリスク（L1-02）がある場合、期待値だけで判断すると破滅しうる。", "ai": "AIで確率や結果の推定を作れるが、根拠の薄い数字が精密に見えてしまう。前提の確からしさを併記する。", "ask": "この決定の結果を最も左右する、不確実な前提は何か？"}, {"id": "F6-07", "n": "クネビン・フレームワーク", "en": "Cynefin framework", "by": "D.スノーデン（1999）／D.スノーデン & M.ブーン（2007）", "y": "1999／2007", "m": ["M7", "M4"], "r": ["S3-03", "F6-01", "S3-05"], "d": "状況を「明白・煩雑・複雑・混沌」（と、どれか分からない「混乱」）に分け、領域ごとに適した意思決定の型を選ぶ。", "s": "煩雑な問題は専門家の分析で、複雑な問題は小さな実験で、混沌とした状況ではまず行動して安定させる。", "c": "領域の名称は改訂されてきた。今どの領域にいるかの判定自体が難しい。", "ai": "AIは煩雑な領域で力を発揮し、複雑な領域では実験の補助にとどまる。領域の誤認が最大の落とし穴になる。", "ask": "この問題は、専門家の分析で答えが出るか、実験が要るか？"}, {"id": "F6-08", "n": "一方通行のドアと双方向のドア", "en": "One-way and two-way door decisions", "by": "J.ベゾス（株主への手紙）", "y": "2015", "m": ["M4", "M5"], "r": ["S3-02", "F6-06", "L5-10"], "d": "やり直せない決定（一方通行のドア）は慎重に、やり直せる決定（双方向のドア）は少人数で素早く決める。", "s": "大半の決定はやり直せる。すべてを慎重に決める組織は遅くなる。", "c": "可逆性の見立てを誤る（実は戻れない）リスクがある。", "ai": "AI導入の多くは双方向のドアで、小さく試せる。データ流出やモデルへの依存の固定化は一方通行になりうる。", "ask": "この決定は、半年後にやり直せるか？"}, {"id": "F6-09", "n": "NPV／IRR（割引キャッシュフロー）", "en": "Net present value", "by": "I.フィッシャー（1930）／J.ディーン（1951）", "y": "1930／1951", "m": ["M4", "M5"], "r": ["S6-03", "F6-10", "F6-06"], "d": "将来のキャッシュフローを資本コストで現在の価値に割り引き、投資額と比べて判断する（NPV）。NPVがゼロになる割引率がIRR。", "s": "投資案を同じ物差しで比較し、資本コストを上回るリターンが見込めるかを判断する。", "c": "遠い将来の不確実なキャッシュフローの見積もりに依存する。撤退や拡大の選択肢の価値は捉えにくい（S6-03で補う）。", "ai": "AI投資は効果の不確実性が高く、単一のNPVでは判断を誤りやすい。段階投資のオプション価値と、シナリオ別のNPVを併用する。", "ask": "このAI投資のNPVは、効果が想定の半分だった場合にもプラスか？"}, {"id": "F6-10", "n": "感度分析（トルネード図）", "en": "Sensitivity analysis", "by": "意思決定分析の実務", "y": "—", "m": ["M4"], "r": ["F6-09", "F1-08", "F6-06"], "d": "主要な前提を一つずつ動かし、結論がどの前提に最も影響されるかを測る。影響の大きい順に棒を並べた図がトルネード図。", "s": "結論を左右する前提を特定し、その前提の検証に調査の資源を集中させる。", "c": "前提同士が連動している場合、一つずつ動かす分析では不十分である。シナリオ分析と組み合わせる。", "ai": "AI投資の計画では、利用率・単価・人員の再配置の有無が結論を左右しやすい。前提が2〜3割ぶれても判断が変わらないかを確かめる。", "ask": "結論を覆す前提はどれで、それがどれだけ外れると判断が変わるか？"}, {"id": "F6-11", "n": "RAPID（意思決定の役割）", "en": "RAPID decision roles", "by": "P.ロジャーズ & M.ブレンコ（ベイン）", "y": "2006", "m": ["M8", "M6"], "r": ["F5-04", "F5-12"], "d": "意思決定の役割を、提案（Recommend）・合意（Agree）・実行（Perform）・助言（Input）・決定（Decide）に分け、誰が最終的に決めるかを明確にする。", "s": "決定が遅い・覆る組織では、決定権の所在を明確にし、合意権を持つ人を絞る。", "c": "役割を細かく決めすぎると運用されない。重要な意思決定に絞って使う。", "ai": "AIが提案や助言の役割を担う場面が増える。AIの出力を判断材料とする場合も、決定の責任者は必ず人に置く。", "ask": "この意思決定の最終決定者は、一人に決まっているか？"}, {"id": "F6-12", "n": "ステージゲート法", "en": "Stage-Gate", "by": "R.クーパー", "y": "1990", "m": ["M4", "M5"], "r": ["S6-03", "F4-10", "L2-05"], "d": "新製品の開発を段階に分け、各段階の終わりの関門（ゲート）で、続行・中止・保留を事前の基準で判断する。", "s": "不確実な開発への投資を段階的に行い、見込みのない案件を早く止める。", "c": "関門の基準が形骸化すると、止める判断がされず、案件が溜まる。", "ai": "AIのPoCは、開始前に本番移行の判断基準を合意し、技術の検証と価値の検証を分けて関門を置く。", "ask": "このPoCを止める条件は、始める前に合意されているか？"}, {"id": "F6-13", "n": "参照クラス予測", "en": "Reference class forecasting", "by": "D.カーネマン & A.トヴェルスキー（1979）／B.フリウビヤ（2006）", "y": "1979／2006", "m": ["M6", "M4"], "r": ["L2-08", "L3-12"], "d": "似た案件の実績の分布（参照クラス）から、費用・期間・成果を予測する。個別の計画の積み上げで生じる楽観を補正する。", "s": "大型プロジェクトの予算超過と遅延を防ぐ。自社の計画を、類似案件の分布のどこに位置づけるかで補正する。", "c": "参照クラスの選び方で、結果が変わる。", "ai": "AI導入プロジェクトの期間と効果の見積もりは楽観的になりやすい。過去のIT導入や他社のAI導入の実績の分布で補正する。", "ask": "似たプロジェクトの実績では、予算と期間はどれくらい超過しているか？"}, {"id": "F6-14", "n": "レッドチーミング", "en": "Red teaming", "by": "軍事演習に起源／AIの安全性評価で普及", "y": "—", "m": ["M4", "M8"], "r": ["F6-05", "F3-11", "L1-12", "F1-10"], "d": "攻撃者や反対者の立場に立つ独立したチームが、計画やシステムの弱点を意図的に突いて検証する。", "s": "重要な戦略や提案を、内部の反対役が「失敗する理由」から点検する。", "c": "結果を受け止める側に反論を歓迎する文化がないと、機能しない（L3-08）。", "ai": "AIシステムは、プロンプト・インジェクションや不適切な出力を引き出す攻撃を、公開前に専門チームで試す。モデルの更新のたびに繰り返す。", "ask": "この計画が失敗するとしたら、最も可能性が高い理由は何か？"}, {"id": "F6-15", "n": "評価の三層（evals）", "en": "LLM evaluation layers", "by": "AIエンジニアリングの実務", "y": "—", "m": ["M2", "M4"], "r": ["L6-16", "L6-11", "F6-16"], "d": "AIの出力を、コードによる自動検査（形式・構造）→LLMを使った評価（品質の大量判定）→人による評価（最終品質・例外）の三層で測る。下の層で拾えるものは上の層に上げない。", "s": "本番の失敗事例から20〜50件の評価セットを作って始め、失敗のたびに追加する。網羅性より代表性を重視する。", "c": "LLMによる評価は、人の評価で較正しないと信頼できない。", "ai": "評価のないAIの改善は、感想の言い合いになる。評価セットを、モデル選定・プロンプト変更・リリース判断の共通の物差しにする。", "ask": "「良い出力」の定義を、自動で判定できる形で書けているか？"}, {"id": "F6-16", "n": "LLMOpsループ", "en": "LLMOps loop", "by": "AIエンジニアリングの実務", "y": "—", "m": ["M2"], "r": ["F6-15", "L6-12", "F6-01"], "d": "デプロイ→実行記録の収集→失敗の分類→評価セットへの追加→改善→回帰の確認→デプロイ、を繰り返す運用の循環。", "s": "このループを回す速さが、AIシステムの品質向上の速さを決める。プロンプトはコードとして版管理する。", "c": "実行記録には個人情報や機密が含まれうる。保存と閲覧の権限を設計する。", "ai": "本番の失敗が、誰に、何時間で届くかを決めておく。失敗の検知が遅いと、改善のループが回らない。", "ask": "本番でAIが失敗したことを、誰がどうやって知るか？"}]};
const ATLAS_EN = {"layers": {"L": {"name": "Laws", "en": "Laws", "q": "How does the world work?", "subj": "The world", "form": "Descriptive (X happens)", "test": "Is it a regularity that holds regardless of who does what?", "axis": "Unit of analysis: system → individual → organization → market → technology & society → AI & computing", "role": "The “physics” that governs reality"}, "S": {"name": "Strategies", "en": "Strategies", "q": "How do we win?", "subj": "Ourselves (our company)", "form": "Normative (do X and you win)", "test": "Is it a winning proposition that involves choice and resource allocation?", "axis": "Source of advantage: where, with what, when, against whom, with whom, how much", "role": "The “moves” that put the laws on our side"}, "F": {"name": "Frameworks", "en": "Frameworks", "q": "How do we think?", "subj": "The analyst", "form": "Tool (fill in this frame)", "test": "Is it a vessel that structures questions rather than supplying answers?", "axis": "Stage of the thinking process: basic forms → external diagnosis → internal diagnosis → strategy & solution design → execution & governance → learning", "role": "The “instruments” for observing laws and moves"}}, "cats": {"L1": {"layer": "L", "name": "Systems & Math", "en": "Systems & math", "desc": "Universal structures that appear across every field"}, "L2": {"layer": "L", "name": "Individual Cognition & Behavior", "en": "Individual cognition", "desc": "Quirks in one person's judgment and motivation"}, "L3": {"layer": "L", "name": "Organizations & Teams", "en": "Organizations", "desc": "Regularities that emerge when people gather"}, "L4": {"layer": "L", "name": "Markets, Economics & Competition", "en": "Markets & competition", "desc": "Regularities produced by company-customer interaction"}, "L5": {"layer": "L", "name": "Technology, Innovation & Society", "en": "Technology & society", "desc": "Regularities in how technology evolves and permeates society"}, "L6": {"layer": "L", "name": "AI & Computing", "en": "AI & computing", "desc": "Regularities specific to AI and software"}, "S1": {"layer": "S", "name": "Positioning", "en": "Where to play", "desc": "Where to compete", "w": "Where"}, "S2": {"layer": "S", "name": "Capabilities", "en": "What to win with", "desc": "What strengths to compete on", "w": "What"}, "S3": {"layer": "S", "name": "Timing & Speed", "en": "When & how fast", "desc": "When to move and how fast", "w": "When"}, "S4": {"layer": "S", "name": "Interaction & Gamesmanship", "en": "Against whom", "desc": "How to deal with counterparts", "w": "vs Whom"}, "S5": {"layer": "S", "name": "Ecosystem", "en": "With whom", "desc": "Whom to partner with and how much to build in-house", "w": "With whom"}, "S6": {"layer": "S", "name": "Portfolio", "en": "How much to bet", "desc": "What to bet on and how much", "w": "How much"}, "F1": {"layer": "F", "name": "Basic Forms of Thinking", "en": "Thinking basics", "desc": "Templates that underpin all analysis"}, "F2": {"layer": "F", "name": "External Environment Diagnosis", "en": "External diagnosis", "desc": "Examining the macro environment, industry and customers"}, "F3": {"layer": "F", "name": "Internal & Integrated Diagnosis", "en": "Internal diagnosis", "desc": "Examining the company and integrating internal and external views"}, "F4": {"layer": "F", "name": "Strategy & Solution Design", "en": "Strategy & solution design", "desc": "Generating options, choosing among them and designing solutions"}, "F5": {"layer": "F", "name": "Execution, Change & Governance", "en": "Execution, change & governance", "desc": "Mobilizing, measuring, embedding and controlling"}, "F6": {"layer": "F", "name": "Decision-Making & Learning", "en": "Decision & learning", "desc": "Deciding, reflecting and updating assumptions"}}, "meta": {"M1": {"name": "Nonlinearity", "en": "Nonlinearity", "def": "Inputs and outcomes are not proportional. Through exponentials, power laws and thresholds, small differences become differences of orders of magnitude.", "imp": "Think in terms of tails (outliers) and thresholds (critical mass), not averages. Concentrate on where you can win and invest until you pass critical mass."}, "M2": {"name": "Feedback", "en": "Feedback", "def": "Results flow back to act on their causes. Virtuous and vicious cycles emerge, and metrics in turn distort behavior.", "imp": "Intervene in the circular structure, not in individual events. Design KPIs on the assumption that they will always distort behavior."}, "M3": {"name": "Constraints", "en": "Constraint", "def": "Overall output is determined by the weakest single point. Once a constraint is resolved, it moves elsewhere.", "imp": "Concentrate resources on resolving the single constraint rather than lifting everything evenly. Always look for the next constraint."}, "M4": {"name": "Uncertainty & Asymmetry", "en": "Uncertainty & asymmetry", "def": "Probabilities, information and gains and losses are not symmetric. Outcomes are determined by the gap between upside and downside, and between those who know and those who do not.", "imp": "Cap the downside and keep the upside open (options). Build an information advantage."}, "M5": {"name": "Time & Path", "en": "Time & path", "def": "Delays, S-curves and path dependence. Outcomes change with when you act, and past choices bind the future.", "imp": "Make timing and reversibility design variables. Aim for early lock-in and long-term compounding."}, "M6": {"name": "Cognitive Limits", "en": "Bounded cognition", "def": "Neither people nor organizations can judge fully rationally. Attention, memory and computing power are limited.", "imp": "Rather than trying to change people, design the choice environment and the decision-making procedures."}, "M7": {"name": "Fit & Diversity", "en": "Fit & variety", "def": "Strategy, organization and environment work only when they mesh. Environmental complexity must be met with internal diversity.", "imp": "Design the fit among elements, not individual moves in isolation."}, "M8": {"name": "Interdependence", "en": "Interdependence", "def": "Your outcome depends on the other party's choices. Competition and cooperation occur at the same time.", "imp": "Factor counterparts' reactions into your choice of moves. Distinguish cooperation that expands the pie from competition that divides it."}}, "grades": {"S": {"name": "Math/physics", "def": "Established as a mathematical consequence or a physical law"}, "A": {"name": "Robust evidence", "def": "Widely supported by numerous replications, meta-analyses and the like"}, "B": {"name": "Conditional evidence", "def": "Supported by evidence, but conditions, effect sizes and generalizability are debated"}, "C": {"name": "Rule of thumb", "def": "Based on observation, cases and insight; quantitative validation is limited"}, "D": {"name": "Caution", "def": "Evidence is weak in the form commonly held, or there are serious doubts about reproducibility"}}, "rules": [{"t": "Classify by substance, not by name", "d": "Something called a “theory” is a law if it is descriptive (Diffusion of Innovations → L5-04); something derived from a “law” is a strategy if it is a proposition about moves (Lanchester Strategy → S1-03)."}, {"t": "Separate phenomena from the moves that exploit them", "d": "Observed regularities are placed under laws, and the moves that exploit them under strategies (Diffusion of Innovations L5-04 → Chasm Theory S1-05; Network Effects L4-05 → Platform Strategy S5-01)."}, {"t": "Separate strategies from the tools that implement them", "d": "Winning propositions are placed under strategies, and vessels with blanks to fill under frameworks (Blue Ocean Strategy S1-02 → Strategy Canvas F4-07; Resource-Based Strategy S2-01 → VRIO Analysis F3-02; Law of the Minimum L1-07 → TOC Five Focusing Steps F5-05)."}, {"t": "Categories are exclusive; meta-principles are not", "d": "Each item belongs to exactly one layer and one category. Properties that span multiple principles are expressed through eight meta-principle tags (overlap allowed)."}, {"t": "Genres are overlaid as separate axes", "d": "Apart from layers and categories (the axis of type), three genre axes are overlaid: academic origin (10 disciplines, exclusive), industry (12, non-exclusive) and expert lens (8, non-exclusive). They let you reach the same item from a different angle without disturbing the classification by type."}, {"t": "Measure strength of evidence on a single scale", "d": "To avoid ranking mathematical theorems alongside field rules of thumb, laws carry a five-level evidence grade (S to D). Strategies and frameworks are not propositions of truth or falsity, so they carry no grade."}], "summary": [{"h": "{{total}} insights fall into 3 layers and {{nCat}} categories, and converge on 8 principles", "b": "Laws (how the world works): {{nL}}; Strategies (how to win): {{nS}}; Frameworks (how to think): {{nF}}. Viewed across layers, they reduce to 8 meta-principles, including nonlinearity, feedback and constraints. What matters is not memorizing individual names but these 8 principles."}, {"h": "Every strong strategy has the laws on its side", "b": "The experience curve underpins cost leadership, network effects underpin platform strategy, and fat tails underpin the barbell strategy. A strategy without a supporting law is mere wishful thinking, and framework analysis that does not lead to strategy is mere busywork. This document presents {{nChain}} chains that show these links."}, {"h": "The essence of strategy is choosing between tensions", "b": "There is no universal answer to concentration versus diversification, planning versus emergence, or delegating to people versus delegating to AI. Of the {{nT}} tensions covered, {{nT3}} are settled by three decision axes: the shape of the outcome distribution, the type of uncertainty and the reversibility of the decision."}, {"h": "The reliability of “laws” varies", "b": "Of the {{nL}} laws, only {{gS}} are established as mathematics or physics, while {{gCD}} are rules of thumb or carry a caution. Do not use figures such as 80:20, 150 people or 2:6:2 directly as design values. The {{nL6}} laws specific to AI have a short observation history, so they rest mainly on rules of thumb and conditional evidence."}, {"h": "AI redraws the map differently in each industry", "b": "For each of the {{nInd}} industries, we identified where AI (1) changes the cost structure, (2) dissolves barriers to entry, and (3) triggers compounding of data and customer touchpoints. Industries that depend on manual labor and information processing change the most; industries protected by regulation and physical assets change more slowly but more deeply."}, {"h": "Expert lenses always conflict; only by making the conflicts explicit do they become a recommendation", "b": "Examining the same issue through eight lenses (AI Consultant, Architect, Engineering, Strategy, Sales, CFO, Marketing and Security) produces clashes over speed versus control, how to measure impact, and which work to start with. An analysis on which everyone agrees is a sign of lax scrutiny."}], "chains": [{"t": "Scale chain", "L": ["L4-04", "L4-03"], "S": ["S1-01", "S6-01"], "F": ["F4-02"], "mech": ["Cumulative production lowers cost", "Whoever takes share first wins on cost", "Allocate capital by each business's share"]}, {"t": "Network chain", "L": ["L4-05", "L5-07"], "S": ["S5-01", "S3-01"], "F": ["F4-06"], "mech": ["Users attract users and the standard locks in", "Subsidize one side to reach critical mass first", "Design on one page who generates the revenue"]}, {"t": "Tail chain", "L": ["L1-02", "L1-04"], "S": ["S6-02", "S6-03"], "F": ["F6-06", "F4-03"], "mech": ["A few outliers dominate the whole", "Place many small bets with capped downside", "Manage bets by expected value and time horizon"]}, {"t": "Diffusion chain", "L": ["L5-04", "L2-11"], "S": ["S1-05"], "F": ["F4-04"], "mech": ["Diffusion proceeds segment by segment, with gaps between segments", "Fully dominate a narrow customer segment as a beachhead", "Choose the target segment and define the positioning"]}, {"t": "Generational turnover chain", "L": ["L5-05", "L5-06"], "S": ["S1-04", "S2-04"], "F": ["F4-03"], "mech": ["Every technology hits a ceiling and is replaced by the next", "Nurture a business that disrupts your own in a separate organization", "Measure businesses with different time horizons by different yardsticks"]}, {"t": "Homogenization chain", "L": ["L4-08", "L4-10"], "S": ["S1-02", "S4-03"], "F": ["F4-07"], "mech": ["Competitors converge on the center, and improving does not change the ranking", "Change the axis of competition itself", "Rearrange the competitive factors and redraw the value curve"]}, {"t": "Constraint chain", "L": ["L1-07", "L3-03"], "S": ["S5-03", "S3-04"], "F": ["F5-05", "F5-03"], "mech": ["The whole is determined by the weakest single point", "Resolve the constraints of your company and ecosystem first", "Identify the constraint and measure sensitivity with a formula"]}, {"t": "Cooperation chain", "L": ["L4-09"], "S": ["S4-04", "S4-06"], "F": ["F2-02"], "mech": ["Individual rationality produces a loss for everyone", "Elicit cooperation through repeated relationships and reputation", "Measure the intensity of industry competition with the Five Forces"]}, {"t": "Resistance chain", "L": ["L2-02", "L2-06", "L5-09"], "S": ["S4-05"], "F": ["F5-07", "F5-08"], "mech": ["People are sensitive to loss, prefer defaults, and see effects only with a delay", "Eliminate the status quo option with a declaration that burns the bridges", "Design adoption at both the organizational and individual stages"]}, {"t": "Planning chain", "L": ["L2-08", "L1-10"], "S": ["S3-03", "S6-03"], "F": ["F6-05", "F6-08"], "mech": ["Plans are estimated optimistically, and complex designs do not work the first time", "Start small, learn, and invest stage by stage", "Imagine failure first, and vary how you decide according to reversibility"]}, {"t": "AI quality chain", "L": ["L6-07", "L6-10", "L1-11"], "S": ["S2-10"], "F": ["F6-15", "F6-16"], "mech": ["Data quality sets the ceiling, errors are unavoidable, and multi-step processing amplifies them", "Build a mechanism in which use accumulates decision outcomes and their correctness, so that improvement keeps turning", "Keep measuring quality with evaluation sets and an LLMOps loop"]}, {"t": "AI value transfer chain", "L": ["L4-14", "L4-13", "L6-15"], "S": ["S2-08", "S5-06"], "F": ["F2-09"], "mech": ["As models commoditize, profit moves to the adjacent layer", "Build a lasting advantage in layers that are not commoditized (proprietary resources, customer touchpoints)", "Map the evolutionary stage of each component to separate build from buy"]}, {"t": "Organization chain", "L": ["L3-04", "L3-10"], "S": ["S2-05"], "F": ["F3-03"], "mech": ["Systems mirror the organization, and the organization follows strategy", "Design activities and organization as a mutually reinforcing system", "Diagnose the fit among the seven hard and soft elements"]}], "tensions": [{"t": "Concentrate or diversify?", "axis": "dist", "rel": [], "a": {"l": "Concentrate", "ids": ["S6-01", "S1-01", "L1-01"]}, "b": {"l": "Diversify", "ids": ["S6-02", "S6-03", "L1-02"]}, "rule": "If outcomes are close to a normal distribution and predictable, concentrate. If the tails are heavy and outcomes unpredictable, diversify with many small bets."}, {"t": "Lead or follow?", "axis": "unc", "rel": ["S3-01"], "a": {"l": "Lead", "ids": ["L4-05", "L5-07"]}, "b": {"l": "Follow", "ids": ["L5-02", "L5-05"]}, "rule": "Lead in markets where network effects and lock-in are strong and winners are decided early. Follow and learn in markets where technology and demand are highly uncertain and standards are not yet set."}, {"t": "Exploit or explore?", "axis": "unc", "rel": ["S2-04", "F4-03"], "a": {"l": "Exploit", "ids": ["L4-04", "S2-05", "L1-03"]}, "b": {"l": "Explore", "ids": ["L5-05", "L5-06", "S1-04"]}, "rule": "The closer the existing technology's S-curve is to its ceiling, the more allocation should shift to exploration. Not knowing where the ceiling lies is itself a reason to hold both at once."}, {"t": "Plan or let strategy emerge?", "axis": "unc", "rel": ["F6-07"], "a": {"l": "Plan", "ids": ["F4-08", "S2-05", "S1-01"]}, "b": {"l": "Emerge", "ids": ["S3-05", "S3-03", "L1-10"]}, "rule": "Plan in “complicated” domains where analysis reveals cause and effect. In “complex” domains where you can only learn by doing, pick up strategy from experiments."}, {"t": "Efficiency or redundancy?", "axis": "dist", "rel": [], "a": {"l": "Efficiency", "ids": ["L1-07", "F5-05", "S6-01"]}, "b": {"l": "Redundancy", "ids": ["L1-09", "L3-11", "S6-02"]}, "rule": "Choose efficiency if unexpected shocks are rare and small. Keep slack if shocks, though rare, could be fatal. Efficiency pays off in normal times, redundancy in a crisis."}, {"t": "Speed or caution?", "axis": "rev", "rel": ["F6-08"], "a": {"l": "Speed", "ids": ["S3-02", "S3-04", "L3-01"]}, "b": {"l": "Caution", "ids": ["F6-06", "F6-05", "L2-08"]}, "rule": "Prioritize speed for decisions that can be undone and caution for those that cannot. When in doubt, break the decision into small pieces so that it can be undone."}, {"t": "Delegate to people or to AI?", "axis": "unc", "rel": ["F5-15"], "a": {"l": "Humans", "ids": ["L6-05", "L5-15", "L2-13"]}, "b": {"l": "AI", "ids": ["L6-06", "L3-12", "L1-13"]}, "rule": "Delegate work that lies within AI's capability frontier. Humans decide work outside it, and work where an error would be fatal. Identify the frontier by experimenting on your own work, and widen the scope of delegation as results accumulate."}, {"t": "Open or closed?", "axis": "other", "rel": ["S5-04"], "a": {"l": "Open", "ids": ["S5-02", "S5-01", "L4-05"]}, "b": {"l": "Closed", "ids": ["S2-01", "F3-02", "L4-07"]}, "rule": "Open the layer where you want adoption to spread, and keep closed the layer where you earn profit. Set the boundary by working backward from where you make money."}], "axes": {"dist": "Shape of the outcome distribution", "unc": "Type of uncertainty", "rev": "Reversibility of the decision", "other": "Location of the revenue source"}, "misuse": [{"t": "Stopping at organizing", "ids": ["F3-04", "F2-01", "F1-04"], "sym": "The SWOT or PEST tables are filled in, but what to do remains undecided.", "fix": "End every analysis with a one-line “so we will do / not do X.” Cut from the deck any analysis that cannot supply one."}, {"t": "Judging a movie from a still image", "ids": ["F2-02", "F3-04", "L4-10", "L5-05"], "sym": "Deciding investments that must pay off five years out on the basis of today's industry structure and strengths.", "fix": "Add “how will each element move in three years?” and combine with scenario planning (F2-04)."}, {"t": "Metrics become the goal", "ids": ["F5-01", "F5-03", "L3-07", "L5-11"], "sym": "The KPIs are met, yet the business does not improve.", "fix": "Combine multiple metrics, rotate them periodically, and check on the ground what lies behind the numbers."}, {"t": "Copying success stories", "ids": ["L2-09", "L1-05", "S2-05", "S2-06"], "sym": "Another company's best practice is adopted, but no differentiation results.", "fix": "Compare also with companies that have disappeared, and choose by whether the practice fits your own system of activities. Operational effectiveness is not strategy (S2-05)."}, {"t": "Treating a rule of thumb as a law of physics", "ids": ["L1-01", "L3-05", "L3-11", "L2-10", "L5-03"], "sym": "Designing the organization or HR system on the premise of the “150-person limit” or “2:6:2.”", "fix": "Check the evidence grade and treat the figures as guides. Validate them with your own data before making them design values."}, {"t": "Importing a metaphor along with its premises", "ids": ["L1-08", "L1-09", "S1-03", "S4-02"], "sym": "Applying theories from physics or the military to management without checking the conditions under which they hold.", "fix": "First check whether the premises of the original theory (a closed system, a rational counterpart, and so on) hold in your situation."}], "guide": [{"w": "Why", "q": "Why did performance change?", "L": ["L1-05", "L1-17", "L4-10", "L5-05", "L2-09"], "S": [], "F": ["F3-05", "F6-02", "F2-02", "F6-04", "F1-11"]}, {"w": "Where", "q": "Which market and customers should we compete for?", "L": ["L4-08", "L4-05", "L5-04", "L4-15"], "S": ["S1-01", "S1-02", "S1-03", "S1-05", "S1-06"], "F": ["F2-01", "F2-02", "F2-03", "F4-04", "F2-08"]}, {"w": "What", "q": "What should we build our strength on?", "L": ["L4-03", "L4-04", "L1-07", "L4-14"], "S": ["S2-01", "S2-02", "S2-05", "S2-08", "S2-10"], "F": ["F3-01", "F3-02", "F2-05", "F2-09"]}, {"w": "When", "q": "When should we enter, and when should we exit?", "L": ["L5-02", "L5-05", "L2-05", "L5-03", "L5-17"], "S": ["S3-01", "S1-04", "S6-03", "S3-06"], "F": ["F4-03", "F6-08", "F2-04", "F6-12"]}, {"w": "Who", "q": "With whom should we partner, and against whom should we compete?", "L": ["L4-09", "L4-06", "L5-07", "L3-15"], "S": ["S4-04", "S4-06", "S5-01", "S5-03", "S5-05", "S5-06"], "F": ["F2-02", "F2-03", "F5-12"]}, {"w": "How", "q": "How do we execute and make it stick?", "L": ["L2-02", "L2-06", "L3-04", "L3-07", "L5-09", "L2-15"], "S": ["S2-04", "S3-03", "S4-05", "S3-07"], "F": ["F5-01", "F5-07", "F5-08", "F5-13", "F3-03"]}, {"w": "How much", "q": "What should we bet on, and how much?", "L": ["L1-02", "L1-04", "L2-08", "L6-15"], "S": ["S6-01", "S6-02", "S6-03", "S6-05"], "F": ["F6-06", "F4-02", "F6-07", "F6-09", "F6-10"]}, {"w": "With AI", "q": "How should we build AI, and how should we govern it?", "L": ["L6-07", "L6-10", "L1-11", "L6-11"], "S": ["S2-10", "S2-11"], "F": ["F4-11", "F6-15", "F5-15", "F3-10", "F5-16"]}], "aiLens": [{"t": "Efficiency gains do not lower total cost", "ids": ["L4-11"], "b": "As the unit price of inference falls, usage grows, and total demand for compute and power rises. Judging investment on “cost savings” alone leads to misjudging the expansion of demand."}, {"t": "Value moves to complements", "ids": ["L4-01"], "b": "When the supply of text, code and images surges, their own price falls. Value moves to what is scarce: proprietary data, customer touchpoints, trust and accountability for outcomes."}, {"t": "People's roles are set by comparative advantage", "ids": ["L4-06", "L6-01"], "b": "Even where AI outperforms people in many tasks, the human role does not disappear. People are redeployed to tasks where they hold a relative advantage. Automation proceeds in the opposite order from intuition, and intellectual clerical work may change first."}, {"t": "Impact comes after redesign", "ids": ["L5-09", "L1-10"], "b": "Handing out tools does not raise productivity. Intangible investment in work redesign and talent development has to come first. Grow from small successful cases rather than a company-wide rollout."}, {"t": "Manage the swing in expectations", "ids": ["L5-02", "L5-03"], "b": "Short-term overestimation and long-term underestimation occur at the same time. Do not withdraw over PoC disappointment. Do not use the hype cycle for forecasting; measure progress with interim indicators."}, {"t": "Ease of switching over deep customization", "ids": ["L6-02", "L6-03"], "b": "Model performance has grown predictably with compute and data. Customization tuned to a specific model quickly becomes obsolete. Invest in a design whose parts can be swapped and in your own data assets."}, {"t": "AI design mirrors the organization", "ids": ["L3-04", "L3-10"], "b": "Company-wide AI platforms and agent configurations mirror the organization's silos as they are. If you want AI that works across departments, design the organization and the flow of decisions first."}, {"t": "The search for metric loopholes accelerates", "ids": ["L3-07", "L5-11"], "b": "AI is good at optimizing a given metric and quickly finds its loopholes. The design of evaluation metrics, and the weight given to qualitative checks, grow in importance."}, {"t": "Design internal diffusion by segment", "ids": ["L5-04", "L2-11", "F5-08"], "b": "Internal AI adoption also follows diffusion theory. Rather than uniform training for everyone, make early adopters' successes visible, and diagnose whether individuals are stalling at the “desire” stage."}, {"t": "Agents lose reliability as steps multiply", "ids": ["L1-11", "L1-12"], "b": "Even at 95% accuracy per step, chaining 20 steps yields an end-to-end success rate of about 36%. Reduce the number of steps, and layer intermediate verification and human approval into the design."}, {"t": "The work gets faster; approval stays slow", "ids": ["L1-13", "L1-14"], "b": "Even if AI shortens the work, overall lead time does not shrink as long as approval waits and checks remain. Review the sequential parts of the workflow and the amount of work in progress together."}, {"t": "Newcomers gain the most, and veterans' roles change", "ids": ["L6-06", "L6-05"], "b": "AI support lifts less experienced people substantially, but for tasks outside the capability frontier, accuracy falls the more it is used. Veterans shift their role to identifying the frontier and contributing their expertise."}, {"t": "Primary data rises in value", "ids": ["L6-08", "L6-07"], "b": "When internal knowledge fills up with AI-generated documents, the quality of search and learning declines. Human-created primary information and records of decision outcomes become assets that are hard to imitate."}, {"t": "Design governance around reversibility", "ids": ["L5-10", "F6-08"], "b": "Regulating after the impact becomes visible is too late, and a perfect rule cannot be written before it is visible. Govern by separating decisions: move fast on those that can be undone, and be cautious on those that cannot (such as the handling of customer data)."}], "disc": {"D1": {"n": "Mathematics & Statistics", "ids": ["L1-02", "L1-03", "L1-04", "L1-05", "L1-14", "L1-16", "L1-17", "L2-09", "L5-08", "F1-10", "F6-06", "F6-10"]}, "D2": {"n": "Natural Science & Engineering", "ids": ["L1-06", "L1-07", "L1-08", "L1-09", "L1-10", "L1-11", "F1-08", "F1-11", "F2-07", "F5-05", "F6-01"]}, "D3": {"n": "Biology, Evolution & Anthropology", "ids": ["L3-05", "L3-11", "L4-10"]}, "D4": {"n": "Psychology & Behavioral Economics", "ids": ["L1-12", "L2-01", "L2-02", "L2-03", "L2-04", "L2-05", "L2-06", "L2-07", "L2-08", "L2-10", "L2-11", "L2-12", "L2-13", "L2-14", "L2-15", "L2-16", "L2-17", "L2-18", "L2-19", "L3-06", "L3-09", "L3-12", "L5-15", "F5-06", "F6-05", "F6-13"]}, "D5": {"n": "Economics", "ids": ["L1-01", "L3-07", "L3-15", "L4-01", "L4-02", "L4-03", "L4-06", "L4-07", "L4-08", "L4-09", "L4-11", "L4-15", "L4-16", "L4-17", "L5-06", "L5-07", "L5-09", "L5-12", "L5-13", "L5-17", "L6-06", "S4-05", "S4-08", "S5-01", "S5-05", "S6-03", "F6-09"]}, "D6": {"n": "Management Science", "ids": ["L3-01", "L3-02", "L3-08", "L3-10", "L3-13", "L3-14", "L4-14", "L6-05", "S1-01", "S1-02", "S1-04", "S1-06", "S2-01", "S2-02", "S2-03", "S2-04", "S2-05", "S2-06", "S2-09", "S2-11", "S3-01", "S3-05", "S4-06", "S4-09", "S5-02", "S5-03", "S5-04", "S6-04", "F2-01", "F2-02", "F2-05", "F2-08", "F3-01", "F3-02", "F3-04", "F4-01", "F4-04", "F4-05", "F4-06", "F4-07", "F4-09", "F5-02", "F5-07", "F5-12", "F6-04", "F6-07", "F6-12"]}, "D7": {"n": "Social Science, Law & Philosophy", "ids": ["L1-15", "L5-02", "L5-04", "L5-10", "L5-11", "L5-14", "L5-16", "S4-04", "S4-07", "F1-06", "F1-07", "F3-10", "F5-16", "F5-17", "F5-18"]}, "D8": {"n": "Military Science & the Art of War", "ids": ["S1-03", "S3-02", "S4-01", "S4-02", "S4-03", "F6-03", "F6-14"]}, "D9": {"n": "Computer Science & AI", "ids": ["L1-13", "L3-03", "L3-04", "L4-05", "L5-01", "L6-01", "L6-02", "L6-03", "L6-04", "L6-07", "L6-08", "L6-09", "L6-10", "L6-11", "L6-12", "L6-13", "L6-14", "L6-16", "F3-11", "F4-11", "F5-15", "F6-15", "F6-16"]}, "D10": {"n": "Practice (Corporate, Consulting, Industry)", "ids": ["L4-04", "L4-12", "L4-13", "L5-03", "L5-05", "L6-15", "S1-05", "S2-07", "S2-08", "S2-10", "S3-03", "S3-04", "S3-06", "S3-07", "S5-06", "S6-01", "S6-02", "S6-05", "S6-06", "F1-01", "F1-02", "F1-03", "F1-04", "F1-05", "F1-09", "F1-12", "F2-03", "F2-04", "F2-06", "F2-09", "F2-10", "F3-03", "F3-05", "F3-06", "F3-07", "F3-08", "F3-09", "F4-02", "F4-03", "F4-08", "F4-10", "F4-12", "F4-13", "F5-01", "F5-03", "F5-04", "F5-08", "F5-09", "F5-10", "F5-11", "F5-13", "F5-14", "F6-02", "F6-08", "F6-11"]}}, "industries": [{"id": "I01", "n": "Energy & Materials", "sub": "Chemicals, steel, non-ferrous metals, power, gas", "gics": "Energy / Materials / Utilities", "econ": "A capital-intensive industry in which massive capex and utilization rates determine profitability. Exposed to market cycles and regulation, with scale and cost competitiveness as the fundamentals.", "L": ["L4-03", "L4-04", "L1-07", "L5-07"], "S": ["S1-01", "S6-06", "S4-09", "S6-01"], "F": ["F2-04", "F2-01", "F5-05", "F6-09"], "kpi": ["Utilization rate", "Cost per unit of product", "Return on capital expenditure", "CO2 emissions intensity"], "ai": {"cost": "Predictive maintenance of equipment, plant operation optimization, and fuel and inventory reductions through demand forecasting.", "barrier": "As the tacit knowledge of veteran operators (L5-14) is codified through AI, the gap in operating know-how versus newly built plants narrows.", "data": "Favors incumbents with long histories of operating and maintenance data. Data integration and quality (L6-07) decide the winners."}, "uc": ["Predictive maintenance", "Process condition optimization", "Materials discovery (materials informatics)"], "agenda": ["During the transition to decarbonization, which assets should be shut down and when, and where should investment go?", "How should the business portfolio be reshaped to withstand market volatility?", "How can operating know-how be preserved ahead of the mass retirement of veteran staff?"], "risk": "Applying AI to control systems makes them a target of safety regulation and cyberattacks. Retain final human judgment (F5-15)."}, {"id": "I02", "n": "Manufacturing", "sub": "Machinery, electrical equipment, automotive, components", "gics": "Capital Goods / Automobiles & Components", "econ": "Competes on product development capability, quality, and supply chain efficiency. Integral (suriawase) engineering strength is pitted against the pressure for horizontal specialization through modularization.", "L": ["L4-13", "L4-14", "L4-04", "L5-05"], "S": ["S2-02", "S5-04", "S1-06", "S5-05"], "F": ["F3-01", "F2-09", "F6-12", "F5-05"], "kpi": ["Development lead time", "Defect rate", "Days of inventory", "Service revenue ratio"], "ai": {"cost": "Virtualization of design and testing, automated visual inspection, and search and drafting of technical documents.", "barrier": "As software and AI account for a growing share of product value, barriers to entry fall for software-strong new entrants.", "data": "Usage and maintenance data from products in operation. Data compounding takes effect as the business shifts from one-off sales to services."}, "uc": ["Design support", "Quality inspection", "Technical document search (RAG)", "Advanced maintenance services"], "agenda": ["How far will the source of product value shift from hardware to software and services?", "Which layers should be kept in-house, and which standardized or externalized?", "How can the shop-floor culture of continuous improvement be linked with AI?"], "risk": "Handling of confidential material such as design blueprints and customer drawings. Regulation on entering export-controlled technical information into AI."}, {"id": "I03", "n": "Transport & Logistics", "sub": "Land, sea, and air transport; warehousing", "gics": "Capital Goods & Services (Transportation)", "econ": "Network density, utilization, and labor determine profitability. Demand swings and labor shortages are the biggest constraints.", "L": ["L1-14", "L1-07", "L1-13", "L4-03"], "S": ["S3-04", "S5-06", "S5-05"], "F": ["F5-05", "F5-03", "F3-06"], "kpi": ["Load factor", "Vehicle and warehouse utilization", "Delivery cost per shipment", "On-time rate"], "ai": {"cost": "Dispatch and route optimization, workforce planning through demand forecasting, and automation of warehouse work and clerical tasks.", "barrier": "Platform players with optimization algorithms insert themselves between shippers and carriers (S5-06).", "data": "Data on cargo flows, location, and demand. The more shippers' data a player consolidates, the more effective its optimization."}, "uc": ["Dispatch and route optimization", "Demand forecasting", "Integration with warehouse robots", "Inquiry handling"], "agenda": ["Under the overtime caps for drivers (Japan's “2024 problem”), which functions should be automated or shared across companies?", "In the relationship with shippers, who will own the data and the customer touchpoint?"], "risk": "When automating safety-critical operating decisions, clarify the allocation of responsibility and human oversight."}, {"id": "I04", "n": "Retail & Consumer Goods", "sub": "Retail, food, household goods, apparel", "gics": "Consumer Discretionary / Consumer Staples", "econ": "Competes on customer touchpoints, assortment, inventory turnover, and brand. Many formats have thin margins, so operational efficiency determines profit.", "L": ["L1-01", "L2-18", "L4-12", "L2-19"], "S": ["S2-07", "S2-10", "S5-06", "S1-02"], "F": ["F2-10", "F4-04", "F3-07", "F5-09"], "kpi": ["Same-store sales", "Inventory turnover", "Customer count x average spend per customer", "Customer lifetime value (LTV)", "Gross margin"], "ai": {"cost": "Demand forecasting and automated ordering, generation of product descriptions and promotional materials, and inquiry handling.", "barrier": "When customers ask AI assistants to compare and recommend, the traffic-drawing power of stores and proprietary e-commerce sites weakens (S5-06).", "data": "Membership and purchase data and the voice of the customer. Data compounding improves the precision of personalized recommendations."}, "uc": ["Demand forecasting and automated ordering", "Personalization", "Promotional content generation", "Customer service support"], "agenda": ["In an era when AI agents shop on customers' behalf, how will the company get chosen?", "How far can demand forecasting reduce inventory and waste?"], "risk": "Purposes of use of and consent for personal data, and display regulations on generated advertising copy (such as Japan's Act against Unjustifiable Premiums and Misleading Representations)."}, {"id": "I05", "n": "Financial Services", "sub": "Banking, insurance, securities, payments", "gics": "Financials", "econ": "A regulated industry that earns money by intermediating information and risk. Credibility, scale, and regulatory capability are the barriers to entry, and most work is information processing.", "L": ["L4-07", "L1-02", "L3-15", "L1-16"], "S": ["S4-08", "S4-09", "S5-01", "S6-02"], "F": ["F3-10", "F5-16", "F6-09", "F5-15"], "kpi": ["Overhead ratio (OHR)", "ROE", "Credit cost ratio", "Assets under custody per customer"], "ai": {"cost": "Most information-processing work is in scope, including underwriting, back-office operations, compliance checks, and customer service.", "barrier": "Regulation and credibility will remain barriers, but AI-driven credit assessment and advice make it easier for specialists that carve out a single function to enter.", "data": "Transaction and payment data and long-term customer relationships. The ability to use data in an explainable form creates the difference."}, "uc": ["Credit and underwriting support", "Fraud detection", "Compliance checks", "Sales support", "Call center"], "agenda": ["To structurally lower the overhead ratio, which processes should be rebuilt on an AI-first basis?", "How can accountability for AI-driven credit assessment and advice be ensured?"], "risk": "Creditworthiness assessment and pricing of life and health insurance are high-risk uses under the EU AI Act. Accountability, fairness, and record-keeping become mandatory."}, {"id": "I06", "n": "Healthcare", "sub": "Medical care, pharmaceuticals, medical devices", "gics": "Health Care", "econ": "Regulation, insurance reimbursement, and R&D risk drive profitability. Pharma runs a long-term, high-risk development portfolio, while healthcare delivery is a labor-dependent service.", "L": ["L4-16", "L1-02", "L6-10", "L2-13"], "S": ["S6-03", "S5-02", "S4-09"], "F": ["F6-12", "F3-10", "F6-06", "F5-15"], "kpi": ["Pipeline success probability", "Development cost per drug", "Bed occupancy rate", "Administrative time per physician"], "ai": {"cost": "Drug-candidate discovery, design of clinical trials and drafting of their documents, and support for drafting medical records and administrative paperwork.", "barrier": "Regulatory approval remains a barrier, while AI drug-discovery companies partner with or compete against incumbents at the candidate-discovery stage.", "data": "Clinical and genomic data. Data compounding benefits those who can integrate it while protecting privacy."}, "uc": ["Drug-candidate discovery", "Clinical trial document drafting", "Medical record drafting support", "Diagnostic imaging support"], "agenda": ["At which R&D stage does introducing AI most improve success probability and timelines?", "How far can the administrative burden on healthcare professionals be reduced?"], "risk": "Regulation as software as a medical device, handling of special-care-required personal information, and automation bias in diagnostic support (L2-13)."}, {"id": "I07", "n": "IT & Software", "sub": "SaaS, system integration, IT excluding semiconductors", "gics": "Information Technology", "econ": "Low marginal cost, with winners concentrating through scale, network effects, and switching costs. The balance between growth and profitability determines enterprise value.", "L": ["L4-17", "L4-05", "L4-14", "L6-15"], "S": ["S2-08", "S3-07", "S5-01", "S3-06"], "F": ["F3-08", "F3-07", "F5-09", "F2-09"], "kpi": ["ARR", "Net revenue retention (NRR)", "Churn rate", "Rule of 40", "Gross margin"], "ai": {"cost": "Automation of development, testing, and operations lowers the cost of building software.", "barrier": "Lower development costs reduce barriers to entry, so feature differences alone no longer provide protection. If AI agents operate business-application screens on users' behalf, per-seat pricing models are shaken.", "data": "Business execution data and embedding in customers' workflows. Players holding the position of System of Record are strong."}, "uc": ["Code generation and review", "Test automation", "Customer support", "Embedding AI features in products"], "agenda": ["How should the shift from per-seat pricing to outcome-based or usage-based pricing be designed?", "In the era of AI agents, will the company's product remain a system of record, or become a screen that gets replaced?"], "risk": "Liability for the output of AI embedded in products, whether customer data may be used for training, and open-source and model licenses."}, {"id": "I08", "n": "Telecom & Media", "sub": "Telecommunications, broadcasting, publishing, games, entertainment", "gics": "Communication Services", "econ": "Telecom is an industry of infrastructure and scale; media is an industry of hits and attention. Both have large fixed costs and low marginal costs.", "L": ["L4-15", "L1-02", "L4-17", "L1-15"], "S": ["S5-06", "S6-02", "S5-01", "S4-09"], "F": ["F2-10", "F5-09", "F3-07"], "kpi": ["ARPU", "Churn rate", "Viewing time and engagement", "Revenue per title"], "ai": {"cost": "The costs of content production, translation, dubbing, and editing fall sharply.", "barrier": "Lower production costs cause an explosion in content supply, concentrating value in scarce intellectual property and control of distribution (L4-01).", "data": "Viewing and usage behavior data and relationships with fans. Data compounding improves recommendation precision."}, "uc": ["Production support", "Multilingual localization", "Personalized recommendations", "Customer support", "Network operations optimization"], "agenda": ["As generative AI causes supply to explode, how should the company protect and license its intellectual property?", "As a party whose content is used for AI training, what rights and compensation should it demand?"], "risk": "Copyright, portrait rights, deepfakes, and labeling of AI-generated content."}, {"id": "I09", "n": "Real Estate & Construction", "sub": "General contractors, housing, real estate development, brokerage", "gics": "Real Estate / Capital Goods (Construction)", "econ": "Location, cost of capital, and project-by-project management determine profitability. Construction is shaped by multi-tier subcontracting and labor shortages; real estate hinges on interest rates and occupancy.", "L": ["L2-08", "L4-16", "L1-07", "L4-07"], "S": ["S5-05", "S6-06", "S2-01"], "F": ["F6-13", "F6-09", "F5-05", "F6-12"], "kpi": ["On-schedule and on-budget delivery rate", "Construction output per worker", "Occupancy rate and rent level", "NOI yield"], "ai": {"cost": "Automation of design, quantity takeoff and estimating, and construction planning; document drafting; and on-site safety monitoring.", "barrier": "Price valuation and greater transparency of transaction information erode brokers' information advantage (L4-07).", "data": "Project-by-project construction track record and cost data. Directly tied to the accuracy of reference-class forecasting (F6-13)."}, "uc": ["Quantity takeoff and estimating", "Drawing checks", "Drafting of construction records and reports", "Property valuation"], "agenda": ["Amid labor shortages, which processes should be standardized or automated to protect schedules and quality?", "Once brokers' information advantage fades, what will justify their fees?"], "risk": "Responsibility for safety-critical decisions, confidentiality of drawings and customer information, and rules for data sharing including subcontractors."}, {"id": "I10", "n": "Professional Services", "sub": "Consulting, legal, accounting, staffing", "gics": "Capital Goods & Services (Commercial & Professional Services)", "econ": "A labor-intensive model that sells people's time. Utilization, rates, and leverage (the share of junior staff) determine profit, making it a textbook case of Baumol's cost disease (L4-16).", "L": ["L4-16", "L6-05", "L6-06", "L4-15"], "S": ["S2-07", "S4-08", "S2-11", "S3-07"], "F": ["F1-12", "F1-02", "F5-10", "F6-13"], "kpi": ["Utilization rate", "Revenue per head", "Billing rate", "Leverage ratio", "Win rate"], "ai": {"cost": "Time spent on research, analysis, document preparation, and document review falls substantially. Much of junior staff work is in scope.", "barrier": "Time-based billing and the pyramid-shaped profit structure built on large junior cohorts are shaken. Outcome-based fees and productized services bring more new entrants.", "data": "Engagement insights, deliverables, and records of judgment. Firms with an internal knowledge base have the advantage."}, "uc": ["Research and analysis", "Document preparation", "Contract review", "Audit procedures", "Proposal drafting"], "agenda": ["Moving from time-based billing to outcome- and value-based pricing, which offerings should go first?", "As opportunities for junior staff to learn on the job shrink, how will experts be developed (L5-15)?", "How can quality be protected for work outside the jagged frontier?"], "risk": "Entering confidential client information, duty of confidentiality, and professional liability for errors in deliverables."}, {"id": "I11", "n": "Public Sector & Education", "sub": "National and local government, schools, universities", "gics": "Outside GICS (public sector)", "econ": "Evaluated on public value and accountability rather than profit. Budgets are often annual, and fairness and procedural legitimacy are emphasized.", "L": ["L3-07", "L5-11", "L5-10", "L3-13"], "S": ["S5-02", "S3-03", "S6-03"], "F": ["F5-18", "F3-10", "F5-06", "F5-12"], "kpi": ["Procedure processing time", "Resident and user satisfaction", "Cases processed per staff member", "Share of procedures completed online"], "ai": {"cost": "Much routine administrative work is in scope, including application review, inquiry handling, and document drafting.", "barrier": "Procurement rules and annual budgets make it hard to adopt AI, which presupposes continuous improvement.", "data": "Government data is abundant but siloed across departments. The institutional design of data linkage is the key."}, "uc": ["Inquiry handling", "Document drafting and summarization", "Application review support", "Creation of teaching materials and personalized learning support"], "agenda": ["As staff numbers decline, which public services should be rebuilt on an AI-first basis?", "While maintaining fairness and accountability, how far should AI support for decision-making be used?"], "risk": "Accountability for administrative decisions, personal information, and AI use in education (fairness of assessment, learning effectiveness)."}, {"id": "I12", "n": "Trading Companies & Wholesale", "sub": "Sogo shosha (general trading companies), specialized trading companies, wholesalers", "gics": "Capital Goods & Services (Trading Companies & Distributors)", "econ": "Earns money through the functions of transaction intermediation, information, credit, and logistics, and broadens its revenue sources through business investment. Japan's sogo shosha (general trading companies) are largely business-investment companies in character.", "L": ["L4-07", "L4-14", "L1-15", "L4-06"], "S": ["S6-06", "S5-05", "S6-02", "S6-03"], "F": ["F6-09", "F2-08", "F2-04"], "kpi": ["Return on invested capital (ROIC)", "Transaction volume", "Equity-method investment income", "Frequency of business portfolio turnover"], "ai": {"cost": "Back-office processing such as order placement and receipt, trade documents, and credit management.", "barrier": "AI reduces information asymmetry, making pure intermediation functions easier to disintermediate.", "data": "Transaction data and relationship networks spanning many industries and regions. Players that can roll out AI across portfolio companies to improve their management are strong."}, "uc": ["Trade document processing", "Supply and demand forecasting", "Due diligence support for investees", "Consolidation of sales information"], "agenda": ["As the value of the intermediation function fades, where should business investment be directed?", "How can a mechanism be built to roll out AI use across the portfolio of investee companies?"], "risk": "Sanctions and export-control checks, counterparty confidentiality, and the application of regulations in many countries."}], "lenses": [{"id": "K1", "n": "AI Consultant", "role": "Guides the client from use-case selection through company-wide rollout and adoption. Addresses both technical feasibility and organizational receptiveness.", "crit": ["Are use cases prioritized by business impact x feasibility?", "Is the design built to avoid getting stuck at the PoC stage?", "Will it be embedded in business processes?"], "core": ["F3-09", "F4-10", "F5-13", "F6-12", "L5-04", "L5-09", "F5-08", "L2-14"], "ask": ["Is the pre-deployment work for that use case quantified in time, volume, and error rate?", "With whom has the definition of success been agreed, and how will it be measured?"], "trap": ["Confusing the thrill of a technology demo with business value", "Interpreting company-wide rollout as simultaneous rollout across all departments"], "check": ["CFO: impact measurement and exit gates", "Architect: over- or under-engineering of the approach", "Security: whether the data may be used"]}, {"id": "K2", "n": "AI Architect", "role": "Translates requirements into a technical approach and decides on a structure that satisfies scalability, maintainability, safety, and cost.", "crit": ["Was the simplest approach considered first?", "Are non-functional requirements defined numerically?", "Can models and vendors be swapped out?"], "core": ["F4-11", "L6-14", "L6-07", "L1-11", "L1-12", "F5-15", "L6-11", "F3-11"], "ask": ["What error rate is acceptable, and what is the loss when an error occurs?", "When models turn over a generation in three years, what does the design discard and what does it keep?"], "trap": ["Choosing the latest technique before the requirements", "Equating demo-environment accuracy with production accuracy"], "check": ["Engineering: evaluability and operational burden", "CFO: three-year total cost of ownership", "Security: threat model and permission design"]}, {"id": "K3", "n": "AI Engineering", "role": "Turns the design into a system that runs, can be measured, and can be operated. The focus is on evaluating rather than on writing.", "crit": ["Does evaluation come before implementation?", "Is production observability (logging, failure collection) designed in?", "Is there a prospect that cost and latency will fit within requirements?"], "core": ["F6-15", "F6-16", "L6-16", "L6-09", "L6-12", "L6-04", "L6-15", "L1-13"], "ask": ["Can the definition of a “good output” be expressed in evaluation code?", "When the model or prompt changes, what must be confirmed before release is acceptable?"], "trap": ["Reporting “it's done” after eyeballing a handful of cases", "Trusting LLM-based evaluation without calibrating it"], "check": ["Architect: rethinking the approach in light of measured values", "CFO: measured cost per transaction"]}, {"id": "K4", "n": "Strategy Consultant", "role": "Structures the issues and, through fact-based hypothesis testing, produces answers that withstand executive decision-making. Forces decisions about what not to do.", "crit": ["Is the issue right (would answering it change a decision)?", "Is the structure MECE?", "Is the argument made in comparison with competitors and alternatives?"], "core": ["F1-05", "F1-02", "S2-08", "F4-09", "L4-14", "S2-05", "F2-09", "F1-12"], "ask": ["If this question is answered, whose decision on what will change?", "If a competitor took the same action, would the advantage remain?"], "trap": ["Filling in the framework becomes the goal in itself", "Confusing “the market will grow” with “we can win”"], "check": ["CFO: financial viability of the scenario", "Marketing: the reality of customers' comparison criteria", "Architect: feasibility of the technical assumptions"]}, {"id": "K5", "n": "Sales Specialist", "role": "Converts value into the customer's decision. Knows that a correct proposal and a proposal that gets approved through the customer's internal approval process (ringi) are different things.", "crit": ["Is the customer's pain real enough to attract budget?", "Is the decision-making process understood?", "Is the internal champion equipped?"], "core": ["F5-10", "F5-11", "F5-12", "S3-07", "L2-04", "L2-16", "S4-07", "F6-11"], "ask": ["If we lose this deal, what will be the reason?", "Who is the budget holder, and how does the proposal affect that person's performance metrics?"], "trap": ["Mistaking the contact person's good impression for deal probability", "Trying to buy the decision with discounts"], "check": ["CFO: profitability of pricing and staged contracts", "Marketing: case studies and counter-evidence content", "AI Consultant: post-win adoption plan"]}, {"id": "K6", "n": "CFO / Finance", "role": "Reviews every initiative against the cost of capital and opportunity cost. Makes dreams translate into numbers and surfaces assumptions that cannot be turned into numbers.", "crit": ["Is the return on investment defined in a verifiable form?", "Do unit economics improve with scale?", "Would the decision hold if the assumptions were off by 20-30%?"], "core": ["F6-09", "F6-10", "S6-03", "F3-07", "L4-11", "L6-15", "F6-13", "F3-08"], "ask": ["In which line item of whose P&L will the impact appear, when, and by how much?", "Will the labor hours saved actually be eliminated (is there a redeployment plan)?"], "trap": ["Equating hours saved x hourly wage with actual cost reduction", "Looking only at PoC costs and not at the total cost of production operations"], "check": ["Engineering: measured unit costs and processing volumes", "Strategy: alternative investments to compare against", "Sales: the reality of the pipeline"]}, {"id": "K7", "n": "Marketing", "role": "Designs for being recognized as the only solution to whose problem, and what kind of problem. Products with a clear reason to be chosen are the ones that sell.", "crit": ["Can the positioning be stated in one sentence?", "Is the ideal customer profile narrowed down?", "Is the message in the customer's own words?"], "core": ["F4-13", "F2-10", "F4-04", "F5-09", "S4-08", "L2-18", "S5-06", "L4-15"], "ask": ["What do customers compare against before buying, and can we win on that criterion?", "Is there content that can rebut the top three “reasons not to choose us”?"], "trap": ["Calling a list of features a message", "Making lead volume the KPI and ignoring the opportunity conversion rate"], "check": ["CFO: CAC-to-LTV ratio", "Sales: does it work in the field during deal conversations?", "Strategy: consistency with decisions on what not to do"]}, {"id": "K8", "n": "Security & Governance", "role": "Controls the risks that come with adopting and operating AI without killing business speed. Draws a clear line that must not be crossed.", "crit": ["Are data classification and data flows identified?", "Are controls proportionate to the size of the risk (neither blanket prohibition nor blanket permission)?", "Do the controls work in the field?"], "core": ["F3-10", "F3-11", "F5-16", "F5-17", "F5-18", "L1-12", "F6-14", "L2-13"], "ask": ["What is the highest confidentiality classification of the data entering this use case, and what is the basis for allowing it to flow?", "Is there human approval before irreversible operations?"], "trap": ["Imposing a blanket ban for now and driving shadow AI underground", "Confusing the drafting of policies with the implementation of controls"], "check": ["Architect: technical implementation of policies", "AI Consultant: whether the controls work in the field", "CFO: budgeting for the cost of controls"]}], "council": {"q": "To move company-wide generative AI from “stuck at PoC” to adoption, where should we start?", "exec": ["The conclusion is, conditionally, “from lighthouse departments to the whole company.” Avoid a company-wide rollout. Build the evaluation and impact-measurement mechanisms first, take three departments all the way to embedding in their work, and only then expand horizontally.", "The greatest conflict lies between speed of rollout and rigor in control and impact measurement. Reconcile them by varying the depth of review by risk tier and deciding with two-tier KPIs.", "Falsification condition: if continued use does not reach a majority in the lighthouse departments within 6 months, treat it as a problem of work design, not of tools, and reselect the target work."], "lenses": [{"k": "K1", "c": "The wall lies in the maturity step from “departmental PoC → embedding in work,” and the cause is that measures target only the tool layer.", "why": "Adoption requires measures across all three layers (tools, processes, culture) (F5-13). Diffusion proceeds segment by segment, starting with early adopters (L5-04).", "worry": "Deciding on company-wide rollout from usage rates alone, and missing the case where usage rises but the work has not changed.", "conf": "Is the pre-adoption state of the target work (time, volume, error rate) recorded in numbers?", "ids": ["F3-09", "F5-13", "L5-04", "F4-10"]}, {"k": "K2", "c": "For most use cases, “RAG plus workflow” suffices as the company-wide foundation. Agents can wait.", "why": "The principle of starting with the simplest approach (F4-11). The ceiling on answer accuracy is set by document quality (L6-07).", "worry": "Running search over internal documents whose version control has broken down, so answers rest on the wrong document. Rushing ahead to agents.", "conf": "Have the location, confidentiality classification and update owner of the target data been identified?", "ids": ["F4-11", "L6-07", "L6-14", "L1-11"]}, {"k": "K3", "c": "A PoC without an evaluation set cannot determine Go/No-Go. A PoC that cannot determine Go/No-Go is the same as a failed one.", "why": "Without the three-layer evaluation (F6-15) and the LLMOps loop (F6-16), improvement degenerates into trading opinions.", "worry": "A model update silently breaking work that depended on the quirks of its output (L6-11).", "conf": "Who learns of a production failure, and within how many hours?", "ids": ["F6-15", "F6-16", "L6-11", "L6-16"]}, {"k": "K4", "c": "“Using AI” is not a strategy. Select and concentrate on the work where the competitive structure changes.", "why": "Identify where AI (1) changes the cost structure, (2) dissolves barriers to entry, and (3) compounds data and customer touchpoints. Profit moves to the layers that do not commoditize (L4-14).", "worry": "The budget being spread thin across efficiency gains in every department, so that resources do not gather on the work that drives differentiation.", "conf": "Which work will decide the winners and losers three years from now?", "ids": ["F4-09", "L4-14", "S2-10", "S2-08"]}, {"k": "K5", "c": "Do not roll out in a department that lacks both a budget holder and a frontline champion.", "why": "Internal rollout is like a deal: without the MEDDIC elements (F5-10), no budget is released. Sketch first the path to start small and expand (S3-07).", "worry": "Mistaking a contact person's good impression for the prospect of adoption.", "conf": "Do department heads' performance metrics include business results from AI?", "ids": ["F5-10", "F5-12", "S3-07", "L2-11"]}, {"k": "K6", "c": "“Hours saved × hourly rate” is not recognized as impact. Only impact that lands in income statement line items should be the criterion for production expansion.", "why": "Design staged investment as a real option (S6-03) and test the sensitivity of assumptions (F6-10). As usage grows, inference cost grows too (L4-11).", "worry": "Inference cost becoming unbounded as usage grows. Freed-up time not being redeployed, so it never shows up in cost.", "conf": "Is there a plan to redeploy the hours saved, or to cut outsourcing and overtime costs?", "ids": ["S6-03", "F6-10", "L4-11", "L6-15"]}, {"k": "K7", "c": "Internal cases are the most powerful content. Publicize the before-and-after change in the lighthouse departments in numbers.", "why": "People are moved by the behavior of those close to them (L2-11). An initiative whose results cannot be stated in one sentence does not spread (F4-13).", "worry": "Abstract calls to “use AI,” and training that only introduces features.", "conf": "Are we collecting the frontline's raw voices (the top three reasons for not using it)?", "ids": ["L2-11", "F4-13", "L2-15", "F5-09"]}, {"k": "K8", "c": "A blanket ban breeds shadow AI. Vary the weight of control by risk tier.", "why": "Risk-based classification (F3-10) and operation as a management mechanism (F5-17). Design defenses in layers (L1-12).", "worry": "Review turning into an approval checkpoint that kills frontline speed and increases use outside control.", "conf": "How many days does use-case review take, and can low-risk uses start the same day?", "ids": ["F3-10", "F5-17", "F5-15", "L1-12"]}], "conflicts": [{"a": "K6", "b": "K1", "t": "How to measure impact", "d": "The CFO recognizes only impact that lands in the income statement, while the AI Consultant emphasizes leading indicators of adoption (continued use, rate of embedding in work). In the early stage of adoption, income statement impact does not yet appear.", "r": "Use two-tier KPIs. Pass stage gates with leading indicators, and decide production expansion with income statement metrics."}, {"a": "K8", "b": "K5", "t": "Rigor of review versus speed of rollout", "d": "Security demands prior review of every use case, while Sales (internal promotion) wants to move before the champion's enthusiasm cools.", "r": "Vary the depth of review by risk tier. Use cases at minimal risk can be used the same day within a pre-approved list; only high-risk use cases get individual review."}, {"a": "K4", "b": "K1", "t": "Which work to start with", "d": "Strategy calls for concentrating on difficult work that drives differentiation, while the AI Consultant wants to start with easy work that has a high probability of success.", "r": "Run two tracks. Broaden the base with easy work while building a lighthouse with work that drives differentiation. Allocate budget explicitly on the 70-20-10 principle (S6-05)."}, {"a": "K2", "b": "K5", "t": "How it looks versus how it is built", "d": "The champion wants an agent demo that resonates with executives, while the Architect argues that a workflow is sufficient.", "r": "Separate the demo from production. Show the future vision with an agent in the demo, start production with a workflow, and raise autonomy based on evaluation results."}], "synthesis": ["Select as lighthouses three departments that have both a budget holder and a champion (F5-12, F5-10).", "Before starting a PoC, agree on the evaluation set, the Go/No-Go criteria and the exit conditions (F6-15, F6-12).", "Decide with two tiers: leading indicators (continued use, rate of embedding in work) and outcome metrics (income statement line items) (F5-09, F6-09).", "Vary the depth of review by risk tier, and let low-risk uses start the same day (F3-10, F5-14).", "Write AI use into work procedures and performance evaluations (F5-13).", "Expand horizontally using the before-and-after numbers from the lighthouse departments (L2-11, S3-07)."], "assumptions": ["The target is a large Japanese company with several thousand employees, where a company-wide conversational AI has already been distributed (maturity is between individual use and departmental PoC).", "The policy is to use the time freed up by AI for redeployment, not headcount reduction.", "Confidential-data classifications exist in policy but are not consistently applied in practice (we erred on the conservative side).", "“6 months” and “3 departments” are assumed values set as guides for judgment, not empirically proven figures."], "falsify": ["If continued use does not reach a majority in the lighthouse departments within 6 months, treat it as a problem of work design, not of tools, and reselect the target work.", "If inference cost exceeds the impact, first compress prompts, apply caching, and split tasks onto cheaper models.", "If high-risk uses increase because of demands from business partners or regulators, raise the weight of control and slow the pace of rollout."], "next": ["Identify the heads and champions of candidate lighthouse departments (2 weeks)", "Measure the pre-adoption figures for the target work", "Build an evaluation set of 20 to 50 cases"]}, "items": [{"id": "L1-01", "n": "Pareto principle", "en": "Pareto principle", "by": "V. Pareto (observation)/J. Juran (generalization)", "y": "1896/1940s", "g": "C", "m": ["M1"], "r": ["L1-02", "S6-01", "S1-03"], "d": "Most results stem from a small number of causes. Typically expressed as “20% of causes produce 80% of results.”", "s": "Identify the top customers, products and defects, and concentrate resources on the “vital few.”", "c": "80:20 is a rule of thumb; the ratio depends on the subject. Discarding the remaining 80% can forfeit future seeds of growth.", "ai": "Generative AI usage also concentrates in a few tasks. Before a company-wide rollout, apply it first to the high-frequency tasks where usage clusters.", "ask": "What are the top three tasks that consume most of the effort?"}, {"id": "L1-02", "n": "Fat-tailed distribution", "en": "Fat-tailed distribution", "by": "B. Mandelbrot (1963)/N. Taleb (2007)", "y": "1963/2007", "g": "A", "m": ["M1", "M4"], "r": ["L1-01", "L1-04", "S6-02", "F6-06", "L4-12"], "d": "A distribution in which extreme events occur with orders-of-magnitude higher probability than a normal distribution assumes. A few outliers dominate the whole.", "s": "Decide on the worst downside and the largest upside, not on the average. Hit products, disasters and venture returns live in this world.", "c": "Some tests show that many distributions claimed to be “power laws” are, strictly speaking, other heavy-tailed distributions (Clauset et al. 2009). The conclusion that the tail is heavy is unchanged.", "ai": "AI results are skewed toward a few use cases, and most trials come to nothing. You need enough trials so as not to miss the big hit.", "ask": "How many AI bets do you hold that could deliver orders-of-magnitude results?"}, {"id": "L1-03", "n": "Compound interest", "en": "Compound interest", "by": "Rule of 72: L. Pacioli (1494)", "y": "1494", "g": "S", "m": ["M1", "M5"], "r": ["L5-05", "L5-08"], "d": "Growth is added to the principal and accelerates over time. Dividing 72 by the growth rate (%) approximates the years needed to double.", "s": "Invest early, and without interruption, in assets that compound: learning, trust, customer base, data.", "c": "Real-world exponential growth eventually hits constraints and turns into an S-curve (L5-05).", "ai": "Operational data and know-how accumulate with use and remain as compounding assets even when the model is replaced.", "ask": "What is recorded in the company-specific assets that build up through AI use?"}, {"id": "L1-04", "n": "Law of large numbers", "en": "Law of large numbers", "by": "J. Bernoulli", "y": "1713", "g": "S", "m": ["M4"], "r": ["L1-02", "L1-05", "S6-02"], "d": "The more trials you run, the closer the average result gets to the expected value.", "s": "Win on the number of trials, not on individual wins and losses. Insurance, investment portfolios and A/B tests rest on this principle.", "c": "With heavy-tailed distributions, convergence is extremely slow, and results from a small number of trials cannot support a judgment (L1-02).", "ai": "AI output quality cannot be judged from a single test. Measure average accuracy and variance from large volumes of execution logs.", "ask": "How many real-operation logs is the AI quality assessment based on?"}, {"id": "L1-05", "n": "Regression toward the mean", "en": "Regression toward the mean", "by": "F. Galton", "y": "1886", "g": "S", "m": ["M4", "M6"], "r": ["L2-09", "L1-04"], "d": "Results that include an element of chance tend to move closer to the average after an extreme value.", "s": "Do not wrongly attribute a slump right after strong performance, or a recovery after a poor stretch, to a measure or to a person’s skill.", "c": "Much of “scolding improved performance, praise reduced it” is this illusion. Measure the effect of a measure against a control group.", "ai": "Strong PoC results include the chance that favorable cases were selected. Assume the numbers will fall after scaling to production.", "ask": "Do the strong PoC results still reproduce after removing the bias in case selection?"}, {"id": "L1-06", "n": "Feedback loop", "en": "Feedback loop", "by": "J. Forrester (1961)/D. Meadows (2008)", "y": "1961", "g": "S", "m": ["M2", "M5"], "r": ["L4-05", "L3-07", "F6-04"], "d": "A structure in which results feed back into their causes. There are reinforcing loops that amplify like a snowball and balancing loops that pull back toward the original state.", "s": "See problems as structures rather than isolated events, and act on the starting points of virtuous cycles and the break points of vicious cycles.", "c": "When actions are delayed, overreaction and oscillation occur (the bullwhip effect in supply chains).", "ai": "With AI, both the virtuous cycle (more use, higher accuracy) and the vicious cycle (distrust, abandonment) turn faster.", "ask": "What are the starting points of the virtuous and vicious cycles in AI use?"}, {"id": "L1-07", "n": "Liebig's law of the minimum", "en": "Liebig's law of the minimum", "by": "C. Sprengel (1828)/J. Liebig (1840)", "y": "1828/1840", "g": "S", "m": ["M3"], "r": ["F5-05", "F5-03", "S5-03", "L4-02"], "d": "Overall output is determined by the scarcest element (the constraint).", "s": "Resolving the single constraint moves results more than raising the overall average.", "c": "Once a constraint is resolved, it moves elsewhere. The agronomic original is an approximate law, but it holds mathematically for the throughput of serial processes.", "ai": "In AI adoption, the constraint is more often data preparation or approval procedures than model performance. Work jams at the step after the one that got faster.", "ask": "Which step is now the most congested, right after the step AI made faster?"}, {"id": "L1-08", "n": "Second law of thermodynamics", "en": "Second law of thermodynamics", "by": "R. Clausius", "y": "1865", "g": "S", "m": ["M5"], "r": ["L1-06"], "d": "The disorder (entropy) of a closed system does not decrease naturally.", "s": "The order of organizations, operations and data degrades if left alone. Allocate continuous energy to maintenance and renewal.", "c": "It is established as a law of physics, but its application to organizations is a metaphor. Do not carry the certainty of a physical law into the metaphor.", "ai": "Prompts, knowledge and agent settings become obsolete if left alone. AI assets also need an operations owner and an update budget.", "ask": "Who is responsible for taking inventory of, and updating, the AI already deployed?"}, {"id": "L1-09", "n": "Law of requisite variety", "en": "Law of requisite variety", "by": "W. R. Ashby", "y": "1956", "g": "S", "m": ["M7"], "r": ["F6-07", "L3-11", "S5-02"], "d": "The controller must have at least as much variety as the system being controlled.", "s": "Complex environments cannot be governed by uniform rules from headquarters. Build response range through delegation to the front line and a diverse workforce.", "c": "Applying a theorem of cybernetics to organizations is an analogy. Variety has a cost.", "ai": "Agents can adapt to exceptions at each site. Rather than adding uniform headquarters rules, make them tools that support front-line judgment.", "ask": "In which areas are front-line exceptions not absorbed by headquarters rules?"}, {"id": "L1-10", "n": "Gall's law", "en": "Gall's law", "by": "J. Gall", "y": "1975", "g": "C", "m": ["M5", "M7"], "r": ["S3-03", "S6-03", "L2-08"], "d": "A complex system that works invariably evolved from a simple system that worked.", "s": "Build something small that works and grow it, rather than designing a large company-wide system all at once.", "c": "Some areas, such as regulatory compliance or full infrastructure overhauls, are hard to migrate in stages.", "ai": "Growing an agent that works in a single task and spreading it laterally succeeds more often than conceiving a giant company-wide AI platform.", "ask": "What is the smallest AI task the front line could run next month?"}, {"id": "L1-11", "n": "Lusser's law", "en": "Lusser's law", "by": "R. Lusser", "y": "1950s", "g": "S", "m": ["M1", "M3"], "r": ["L1-12", "F5-15", "L6-10"], "d": "The reliability of a system whose components are connected in series is the product of the reliabilities of each component. Even at 95% per step, chaining 20 steps drops the overall figure to about 36%.", "s": "The more steps you add, the more the overall failure rate grows exponentially. Reduce the number of steps and place checks and recovery mechanisms at key points.", "c": "It assumes failures are independent across steps. Adding parallel redundancy raises reliability.", "ai": "In multi-step AI agents, end-to-end success rates plunge even when each step is highly accurate. Reducing the number of steps and verifying in between are the keys to the design.", "ask": "How many steps does this task have, and what is the product of the per-step success rates?"}, {"id": "L1-12", "n": "Swiss cheese model", "en": "Swiss cheese model", "by": "J. Reason", "y": "1990", "g": "C", "m": ["M3", "M4"], "r": ["L1-11", "F6-14", "F5-15"], "d": "Accidents occur when the holes (defects) in multiple layers of defense happen to line up in a straight line.", "s": "Layer imperfect defenses of different natures rather than relying on one perfect measure. In accident analysis, look at the structure in which the holes lined up rather than the last individual involved.", "c": "If defense layers depend on the same assumptions, their holes open at the same time. Check the independence of the layers.", "ai": "Design AI safeguards by layering input checks, permission limits, output checks and human approval. A design that relies on any single layer will be breached.", "ask": "How many independent layers of defense stand between an erroneous output and the customer, and what are the holes in each?"}, {"id": "L1-13", "n": "Amdahl's law", "en": "Amdahl's law", "by": "G. Amdahl", "y": "1967", "g": "S", "m": ["M3"], "r": ["L1-07", "F5-05", "L1-14"], "d": "Even if only part of the processing is accelerated, the overall speedup is capped by the share that cannot be accelerated.", "s": "Even if 80% of a task is automated, if the remaining 20% is unchanged, the overall speedup is at most 5x. Decide on investment by looking at what remains.", "c": "It originates in the theory of parallel computing. When applying it to operations, consider separately the effect of automation reshaping the process itself.", "ai": "Even if AI shortens work time, overall lead time does not shrink if approval waits and human checks remain. The sequential portion where people intervene sets the ceiling.", "ask": "What share of the whole is made up of steps AI cannot speed up (approvals, checks, waiting)?"}, {"id": "L1-14", "n": "Little's law", "en": "Little's law", "by": "J. Little", "y": "1961", "g": "S", "m": ["M3", "M5"], "r": ["L1-13", "F5-05"], "d": "In a stable system, work in progress = throughput x time spent per item.", "s": "To shorten lead time, raise processing capacity or reduce the number of cases held at once (work in progress). This is the theoretical basis for limiting work in progress.", "c": "It holds in a steady state where inflow and outflow are balanced.", "ai": "Even if AI raises the number of items processed, lead time lengthens if work in progress piles up. When introducing AI, manage a cap on work in progress as well.", "ask": "How many cases are we holding at once now, and what happens to lead time if we halve that?"}, {"id": "L1-15", "n": "Matthew effect", "en": "Matthew effect", "by": "R. K. Merton (1968)/A.-L. Barabasi & R. Albert (1999)", "y": "1968/1999", "g": "B", "m": ["M1", "M2"], "r": ["L4-15", "L4-05", "S2-10"], "d": "Those who already have much find it easier to gain even more. Reputation, connections and resources concentrate in a self-reinforcing way.", "s": "A small early advantage becomes a large gap later. It is worth concentrating resources on winning early track record and reputation.", "c": "Chance early differences are easily mistaken for differences in ability. Separate the assessment of ability from the element of luck.", "ai": "AI services that gather usage data and reputation improve faster and get chosen even more. AI talent also tends to gather at organizations with a track record.", "ask": "Where can we gain an early lead in reputation or track record, and do we have a mechanism to compound it?"}, {"id": "L1-16", "n": "Benford's law", "en": "Benford's law", "by": "S. Newcomb (1881)/F. Benford (1938)", "y": "1881/1938", "g": "A", "m": ["M4"], "r": ["L1-17", "L4-07"], "d": "In many real-world datasets spanning a wide range of magnitudes, the leading digit is 1 most often, about 30% of the time, while 9 accounts for only about 5%.", "s": "Examine the distribution of leading digits in accounting and expense-claim data, and detect signs of fraud or input errors from unnatural skews.", "c": "It does not apply to data with a narrow range or to human-assigned numbers (prices, serial numbers).", "ai": "It can serve as a simple first-pass check in AI-assisted audit anomaly detection. It is also effective for detecting artificially fabricated figures.", "ask": "When did we last check the leading-digit distribution of expense and transaction data?"}, {"id": "L1-17", "n": "Simpson's paradox", "en": "Simpson's paradox", "by": "U. Yule (1903)/E. Simpson (1951)", "y": "1903/1951", "g": "S", "m": ["M4", "M6"], "r": ["L1-05", "F3-06"], "d": "A trend seen in the whole group can reverse when it is split into subgroups. The cause is a difference in composition ratios.", "s": "Split company-wide average improvements or deteriorations by segment before judging them. Separate the change in composition (mix) from the change within each segment.", "c": "Which cut to split by is determined by the causal structure, not by the data alone.", "ai": "If the effect of AI adoption is measured on the company-wide average, a skew in the composition of users can make the effect look reversed. Measure by department and by proficiency level.", "ask": "Does that average show the same trend however it is split?"}, {"id": "L2-01", "n": "Bounded rationality", "en": "Bounded rationality", "by": "H. Simon", "y": "1947/1957", "g": "A", "m": ["M6"], "r": ["L2-04", "F1-05"], "d": "Within limits of information, time and processing capacity, people choose a “satisficing” solution rather than the optimal one.", "s": "A decision-maker’s attention is the scarcest resource. Designs that narrow options, metrics and meetings determine results.", "c": "It is not “irrational” but rationality under constraints. Improve by designing the environment rather than blaming people.", "ai": "AI can multiply options, but too many candidates raise the executive’s decision burden. Have AI return results in a narrowed-down form.", "ask": "How many AI-related decision items reaching the executive committee have been narrowed down?"}, {"id": "L2-02", "n": "Loss aversion", "en": "Loss aversion", "by": "D. Kahneman & A. Tversky", "y": "1979", "g": "A", "m": ["M4", "M6"], "r": ["L2-06", "F5-07", "S4-07"], "d": "For the same amount, people feel losses more strongly than gains (roughly twice as much). Value is judged not by the absolute amount but by the change from a reference point.", "s": "Transformation is resisted more because of what is lost than because of what is gained. You need to compensate for what is lost and make visible the loss of staying with the status quo.", "c": "The main pattern was replicated in 19 countries (Ruggeri et al. 2020). However, the coefficient varies with context, and there are objections to its universality (Gal & Rucker 2018).", "ai": "AI adoption is received as the loss of one’s job and creates resistance. The redefinition of roles must be shown first.", "ask": "What does the front line feel it will lose through AI adoption?"}, {"id": "L2-03", "n": "Confirmation bias", "en": "Confirmation bias", "by": "P. Wason (1960) et al.", "y": "1960", "g": "A", "m": ["M6"], "r": ["F1-05", "F6-05", "L3-09"], "d": "People collect only information that supports their own hypothesis and discount information that contradicts it.", "s": "It is two sides of the same coin as hypothesis-driven thinking. Build into the system a role that seeks disconfirmation (red team, premortem).", "c": "It can actually get stronger in people with extensive knowledge and experience, because it is tied to confidence.", "ai": "AI tends to return evidence in the direction of the question, so using it to confirm a hypothesis amplifies bias. Operate it so that it produces disconfirming evidence.", "ask": "Do we have a procedure for having AI search for evidence that refutes our own hypothesis?"}, {"id": "L2-04", "n": "Anchoring", "en": "Anchoring", "by": "A. Tversky & D. Kahneman", "y": "1974", "g": "A", "m": ["M6"], "r": ["S4-07", "L2-08"], "d": "The first number presented becomes the reference point and strongly pulls later judgments toward it.", "s": "In negotiation, budgeting and pricing, who puts forward the first number moves the outcome. The “year-over-year” figure in an internal plan is also a strong anchor.", "c": "The effect occurs even with numbers unrelated to the judgment. Build estimates from multiple independent baselines.", "ai": "The numbers and structure of AI’s first draft become an anchor, and human deliberation struggles to move away from it. Design the order in which the first draft is shown.", "ask": "Do people put forward their own view before seeing the AI’s first draft?"}, {"id": "L2-05", "n": "Sunk cost effect", "en": "Sunk cost effect", "by": "H. Arkes & C. Blumer", "y": "1985", "g": "B", "m": ["M4", "M6"], "r": ["S6-03", "S4-05"], "d": "People continue a loss-making project because of past investment that cannot be recovered.", "s": "Base the decision to continue only on what will be invested from here and what will be gained from here. Set exit criteria before starting.", "c": "The size of the effect varies across studies. It must be distinguished from legitimate reasons to continue, such as reputation or learning value.", "ai": "There is a tendency to keep using tools that produce no results because of the AI development costs or license fees already spent. Put exit conditions in place before signing.", "ask": "Did we set the criteria for stopping an AI tool that produces no results before signing the contract?"}, {"id": "L2-06", "n": "Status quo bias", "en": "Status quo bias", "by": "W. Samuelson & R. Zeckhauser", "y": "1988", "g": "A", "m": ["M6"], "r": ["L2-02", "F5-06", "F5-08"], "d": "Even when changing would be rational, people tend to choose the status quo or the initial setting (default).", "s": "Making the desired behavior the default drives adoption (study of organ-donation consent formats: Johnson & Goldstein 2003).", "c": "Because the power of defaults is strong, use them while ensuring transparency and freedom of choice.", "ai": "AI does not spread if left optional. Building AI into standard work procedures determines how quickly it spreads.", "ask": "For how many tasks have we made AI use the default?"}, {"id": "L2-07", "n": "Hyperbolic discounting", "en": "Hyperbolic discounting", "by": "G. Ainslie (1975)/D. Laibson (1997)", "y": "1975/1997", "g": "B", "m": ["M5", "M6"], "r": ["S4-05", "F4-03"], "d": "People weigh immediate gains disproportionately heavily and underestimate larger gains further ahead.", "s": "Medium- and long-term investments tend to lose out to quarterly evaluations. Protect them with advance commitments, such as ring-fenced budgets.", "c": "The present bias itself is robust, but whether it is strictly hyperbolic in form is debated.", "ai": "Investment in AI adoption takes time to pay off and tends to lose to quarterly numbers. Protect the talent-development allocation as a separate line.", "ask": "Is the AI adoption budget protected from quarterly cost-cutting pressure?"}, {"id": "L2-08", "n": "Planning fallacy", "en": "Planning fallacy", "by": "D. Kahneman & A. Tversky", "y": "1979", "g": "A", "m": ["M6"], "r": ["F6-05", "S6-03", "L1-10"], "d": "People optimistically underestimate the time and cost their own plans will require.", "s": "Estimate from the distribution of actual results of similar projects, not from an internal bottom-up build-up (reference class forecasting).", "c": "The same fallacy affects plans that include a buffer. Hofstadter’s Law is expressed as “it always takes longer than you expect, even when you take into account Hofstadter’s Law.”", "ai": "The duration and cost of AI adoption tend to be underestimated by overlooking data preparation and operational coordination. Correct them using similar projects.", "ask": "By how much did past similar system implementations overrun their plans?"}, {"id": "L2-09", "n": "Survivorship bias", "en": "Survivorship bias", "by": "A. Wald", "y": "1943", "g": "S", "m": ["M4", "M6"], "r": ["L1-05", "S2-06"], "d": "Drawing conclusions from surviving cases alone while overlooking the cases that disappeared.", "s": "Do not trust the commonalities of successful companies or the lessons of success stories until you have compared them with companies that did the same thing and disappeared.", "c": "The origin is the analysis that armor should be added not where returning bombers were hit, but where they were not hit.", "ai": "Publicly shared AI success stories are selected successes, and stalled deployments go unreported. Look for the failures behind each case.", "ask": "Behind the AI cases we referenced, how many projects stalled?"}, {"id": "L2-10", "n": "Dunning-Kruger effect", "en": "Dunning-Kruger effect", "by": "J. Kruger & D. Dunning", "y": "1999", "g": "D", "m": ["M6"], "r": ["L1-05", "F3-02"], "d": "An effect in which less capable people are said to overestimate their own ability.", "s": "Do not judge people or organizational capability on self-assessment alone. Put in place a mechanism for objective feedback.", "c": "Critics argue that statistical properties such as regression to the mean can explain much of it. The familiar “Mount Stupid” curve does not appear in the original paper.", "ai": "Generative AI’s fluent output inflates users’ self-assessment beyond their real ability. A mechanism for third parties to verify deliverables is needed.", "ask": "Who independently checks the quality of AI-assisted deliverables?"}, {"id": "L2-11", "n": "Principles of persuasion", "en": "Principles of persuasion", "by": "R. Cialdini", "y": "1984", "g": "B", "m": ["M6", "M8"], "r": ["L5-04", "F5-07"], "d": "People are moved by reciprocity, consistency, social proof, liking, authority and scarcity (unity was added in 2016).", "s": "In internal change as well, examples from nearby early adopters (social proof) and small commitments (consistency) work.", "c": "Effects depend on context. Used manipulatively, they destroy trust.", "ai": "For AI adoption, real examples of colleagues getting results with it work best. Spreading early users’ demonstrations internally is the shortcut.", "ask": "Have we introduced the first person to get results with AI to other departments?"}, {"id": "L2-12", "n": "Self-determination theory", "en": "Self-determination theory", "by": "E. Deci & R. Ryan", "y": "1985", "g": "A", "m": ["M6"], "r": ["F5-08", "F5-01"], "d": "Intrinsic motivation rises when three needs are met: autonomy, competence and relatedness.", "s": "Rather than buying behavior with rewards, design discretion, a sense of growth and colleagues. For non-routine work, financial incentives can backfire.", "c": "Extrinsic rewards are not always bad. Use them selectively according to the nature of the work.", "ai": "When AI takes over routine tasks, the discretion and sense of growth left to people shape motivation. Show how the freed-up time can be used.", "ask": "What discretionary work can employees take on with the time freed up by AI?"}, {"id": "L2-13", "n": "Automation bias", "en": "Automation bias", "by": "K. Mosier & L. Skitka et al.", "y": "1996〜", "g": "B", "m": ["M6"], "r": ["L2-14", "F5-15", "L5-15"], "d": "Over-trusting the output of automated aids, overlooking errors or giving up one’s own judgment.", "s": "Even with human checks in place, they tend to become a formality. Design the check procedure and accountability concretely.", "c": "It intensifies under fatigue and time pressure. Conversely, there is also a tendency to avoid AI excessively (L2-14).", "ai": "In designs with human approval, suspect that it has become a formality when the approval rate nears 100%. Measure the effectiveness of checks through spot inspections with deliberately seeded errors.", "ask": "What percentage of AI outputs have humans sent back, and is that a reasonable level?"}, {"id": "L2-14", "n": "Algorithm aversion", "en": "Algorithm aversion", "by": "B. Dietvorst, J. Simmons & C. Massey", "y": "2015", "g": "B", "m": ["M6"], "r": ["L2-13", "L2-15", "L5-04"], "d": "After seeing an algorithm err once, people avoid using it, even when it is more accurate than a human.", "s": "Adoption takes hold more easily if the design keeps early failures from standing out and leaves people some room to adjust the results (Dietvorst et al. 2018).", "c": "Conversely, other studies show a tendency to prefer algorithmic advice over human advice (Logg et al. 2019). The direction changes with the situation.", "ai": "If a single AI failure is passed down in internal lore, adoption stalls. Operate sharing of failures together with visible improvement.", "ask": "What specific cases led the front line to say AI is “unusable,” and do they still occur?"}, {"id": "L2-15", "n": "IKEA effect", "en": "IKEA effect", "by": "M. Norton, D. Mochon & D. Ariely", "y": "2012", "g": "B", "m": ["M6"], "r": ["L2-14", "F5-13"], "d": "People value what they have put their own effort into making more highly than a ready-made item of the same quality.", "s": "Systems that the front line helped build are more used and more protected.", "c": "The maker’s own evaluation is lenient. Have third parties assess quality.", "ai": "For in-house AI adoption, it helps to create settings where the front line builds its own prompts and workflows. Simply handing out finished products makes them unlikely to be used.", "ask": "Have front-line employees had the experience of building their own way of using AI with their own hands?"}, {"id": "L2-16", "n": "Framing effect", "en": "Framing effect", "by": "A. Tversky & D. Kahneman", "y": "1981", "g": "A", "m": ["M6", "M4"], "r": ["L2-02", "F4-13"], "d": "Even with identical content, choices change depending on how it is expressed (a gain frame or a loss frame).", "s": "Even for the same proposal, how easily it is approved changes depending on whether it is presented as a “loss that can be avoided” or a “gain that can be obtained.”", "c": "Deliberate steering damages trust. For important decisions, present both frames.", "ai": "AI output also changes with how the instruction is framed. In evaluations and comparisons, check the same question with multiple phrasings.", "ask": "Would this proposal resonate more with the budget holder framed as avoiding a loss or as gaining a benefit?"}, {"id": "L2-17", "n": "Cognitive load theory", "en": "Cognitive load theory", "by": "J. Sweller", "y": "1988", "g": "B", "m": ["M6"], "r": ["L2-01", "F1-03"], "d": "Working memory capacity is small, and when load unrelated to learning or the task increases, understanding and performance drop.", "s": "Cut unnecessary information from materials, screens and procedures, and limit the elements handled at once. Build training up in stages.", "c": "For experts, careful support designed for beginners can become a burden instead (the expertise reversal effect).", "ai": "If AI output is too long and exhaustive, decisions slow down. Design the summary granularity and order of presentation to fit the task.", "ask": "How many screens and documents does a front-line person look at to make a single decision?"}, {"id": "L2-18", "n": "Peak-end rule", "en": "Peak-end rule", "by": "D. Kahneman et al.", "y": "1993", "g": "B", "m": ["M6"], "r": ["F2-06", "F2-07"], "d": "People evaluate an entire experience by the moment of strongest emotion (the peak) and by the impression at the end.", "s": "For customer experience, invest in the high point and the ending rather than polishing every step evenly.", "c": "This concerns memory-based evaluation and does not match the sum of moment-by-moment satisfaction.", "ai": "Ratings of AI service desks tend to be set by the impression at the handoff to a human. Focus design on the handoff and closing experience.", "ask": "In the customer experience, where is the moment of strongest emotion and where is the last touchpoint?"}, {"id": "L2-19", "n": "Endowment effect", "en": "Endowment effect", "by": "R. Thaler (1980)/D. Kahneman, J. Knetsch & R. Thaler (1990)", "y": "1980/1990", "g": "B", "m": ["M6", "M4"], "r": ["L2-06", "L2-05"], "d": "People value what they already own more highly than the same thing they do not own.", "s": "Once people have made something “theirs” through a free trial, they find it hard to let go. Conversely, we also tend to overvalue our own existing assets and businesses.", "c": "There are objections that the effect disappears under certain experimental conditions (Plott & Zeiler 2005).", "ai": "The front line is reluctant to give up familiar work procedures. In AI transformation, properly acknowledge the value of the old procedure before moving on.", "ask": "If another company owned the business or procedure we cannot let go of, would we buy it?"}, {"id": "L3-01", "n": "Parkinson's law", "en": "Parkinson's law", "by": "C. N. Parkinson", "y": "1955", "g": "C", "m": ["M3", "M6"], "r": ["L2-08", "F5-01"], "d": "Work expands to fill the time available for its completion.", "s": "Deadlines and budgets function as a “ceiling,” not as the “required amount.” Design with short deadlines and small allocations.", "c": "The original was a satirical essay in the British Economist and is not rigorous empirical work.", "ai": "If AI shortens work but deadlines stay fixed, the time saved is absorbed by other work. A design that converts the saved time into results is needed.", "ask": "Where have we decided to reallocate the effort saved through AI?"}, {"id": "L3-02", "n": "Peter principle", "en": "Peter principle", "by": "L. J. Peter", "y": "1969", "g": "B", "m": ["M7"], "r": ["L3-10"], "d": "In a hierarchical organization, people rise to the position at which they become incompetent.", "s": "Design promotion criteria around aptitude for the next role rather than performance in the current one, and also provide a promotion path as a specialist.", "c": "It was written as satire, but an empirical study using sales-staff personnel data supports it (Benson, Li & Shue 2019).", "ai": "Skill at using AI and managerial skill are different things. Promoting AI power users straight into management risks missing their aptitude.", "ask": "How will we reward AI power users outside of management roles?"}, {"id": "L3-03", "n": "Brooks's law", "en": "Brooks's law", "by": "F. Brooks", "y": "1975", "g": "C", "m": ["M3", "M1"], "r": ["L1-07", "L3-06"], "d": "Adding people to a late software development project makes it later.", "s": "The causes are the ramp-up of new members and coordination costs that grow at a rate close to the square of headcount. When late, cut scope rather than add people.", "c": "It may not hold when the work is easily divisible or when people are added at an early stage.", "ai": "For a delayed AI project, narrowing scope and firming up model and data assumptions moves faster than adding people.", "ask": "In a delayed AI project, what scope can be cut?"}, {"id": "L3-04", "n": "Conway's law", "en": "Conway's law", "by": "M. Conway", "y": "1968", "g": "B", "m": ["M7"], "r": ["L3-10", "F3-03", "S2-05"], "d": "A system’s design mirrors the communication structure of the organization that builds it.", "s": "Design the organization first to match the desired system structure (inverse Conway maneuver). A company-wide data platform also mirrors organizational silos.", "c": "The correspondence between product and organizational structure (the mirroring hypothesis) is broadly supported by empirical research (MacCormack et al. 2012).", "ai": "Coordination among AI agents mirrors departmental silos as they are. For tasks that span departments, design the organizational interfaces first.", "ask": "Which department is responsible at the boundaries of tasks where AI spans departments?"}, {"id": "L3-05", "n": "Dunbar's number", "en": "Dunbar's number", "by": "R. Dunbar", "y": "1992", "g": "B", "m": ["M6", "M3"], "r": ["L3-06", "L3-10"], "d": "There is a cognitive upper limit to the number of people with whom one can maintain stable social relationships, said to be about 150.", "s": "Beyond roughly 150 people, informal coordination based on face-to-face familiarity stops working, and systems, hierarchy and organizational splits become necessary.", "c": "A reanalysis found that the confidence interval of the estimate is extremely wide (Lindenfors et al. 2021). Do not over-trust 150 as a design value.", "ai": "When a dedicated AI organization grows beyond a certain size, informal knowledge sharing stops working. A shared platform for use cases and a point of contact are needed.", "ask": "Through what mechanism do AI promotion insights flow between departments?"}, {"id": "L3-06", "n": "Social loafing", "en": "Social loafing", "by": "M. Ringelmann (1913)/B. Latane et al. (1979)", "y": "1913/1979", "g": "A", "m": ["M6", "M8"], "r": ["F5-04", "L3-03"], "d": "The larger the group, the lower the effort per person.", "s": "Make individual contributions visible, and give small teams clear responsibility.", "c": "It has been robustly confirmed in meta-analyses (Karau & Williams 1993). It weakens when people feel the task is meaningful.", "ai": "When AI produces deliverables, whose contribution it is becomes hard to see, and corner-cutting in checks occurs. Make human responsibility for outputs explicit.", "ask": "Can the person who gives final approval of AI output be identified by name?"}, {"id": "L3-07", "n": "Goodhart's law", "en": "Goodhart's law", "by": "C. Goodhart (1975)/M. Strathern (1997)", "y": "1975/1997", "g": "C", "m": ["M2"], "r": ["F5-01", "F5-02", "F5-03", "L5-11"], "d": "When a measure becomes a target, it ceases to be a good measure.", "s": "Combine multiple KPIs, review them regularly, and also check qualitatively the reality behind the numbers.", "c": "The phenomenon in which social indicators are corrupted under pressure is also known as Campbell’s Law.", "ai": "If usage counts or generation counts are made the target, meaningless usage increases. Measure AI KPIs in combination with business outcomes.", "ask": "Which business outcomes other than usage volume are our AI KPIs tied to?"}, {"id": "L3-08", "n": "Psychological safety", "en": "Psychological safety", "by": "A. Edmondson", "y": "1999", "g": "A", "m": ["M2", "M7"], "r": ["F6-03", "F6-02", "L3-09"], "d": "A state in which everyone on the team believes they will not be punished for taking interpersonal risks. It is a precondition for learning behavior.", "s": "Organizations in which failure reports, dissent and naive questions surface learn faster. It was also named the most important factor in Google’s internal study (2015).", "c": "It is not the same as a “comfortable workplace.” It leads to results only when combined with high standards.", "ai": "Workplaces where AI errors and concerns can be reported candidly learn faster and also prevent accidents. A culture in which failure cases can be shared is needed.", "ask": "Are employees who report AI failures valued within the company?"}, {"id": "L3-09", "n": "Groupthink", "en": "Groupthink", "by": "I. Janis", "y": "1972", "g": "B", "m": ["M6", "M8"], "r": ["F6-05", "L2-03", "L3-08"], "d": "A cohesive group prioritizes consensus and neglects to consider dissent and alternatives.", "s": "The decision-maker speaks last. Appoint a devil’s advocate and bring in outside perspectives.", "c": "It is a theory based mainly on case studies, and experimental support is partial.", "ai": "If executives rush to consensus on AI promotion, risk warnings disappear. Place a devil’s advocate and outside perspectives in AI policy decisions too.", "ask": "At the approval meeting for AI investment, who plays the role of voicing dissent?"}, {"id": "L3-10", "n": "Structure follows strategy", "en": "Structure follows strategy", "by": "A. Chandler", "y": "1962", "g": "C", "m": ["M7"], "r": ["F3-03", "L3-04", "S2-05", "L3-02"], "d": "Changes in strategy, such as diversification, drive changes in organizational structure, such as the divisional form.", "s": "Do not execute a new strategy with an old organization. Change strategy and redesign the organization together.", "c": "Conversely, there is also the side that “strategy follows organization,” in which the existing organization constrains the strategies available.", "ai": "A strategy of running operations with agents will not work with a traditional org chart built on job roles and approval lines.", "ask": "Which lines in the org chart will we redraw to fit the AI strategy?"}, {"id": "L3-11", "n": "2-6-2 rule", "en": "2-6-2 rule", "by": "Japanese business myth (ant study: Eisuke Hasegawa et al. 2016)", "y": "2016", "g": "D", "m": ["M7"], "r": ["L1-09", "S6-02"], "d": "The myth that groups naturally split into “2 hard workers, 6 average workers, 2 non-workers.”", "s": "The ant study behind it showed that idle individuals serve as reserves and support the group’s sustainability. Redundancy is not the enemy of efficiency.", "c": "There is no empirical evidence that the 2:6:2 ratio holds in human organizations.", "ai": "If AI-driven efficiency is applied uniformly and headcount is cut, even the spare capacity to handle emergencies is lost. Redesign redundancy for the AI era.", "ask": "After AI-driven efficiency gains, who holds the spare capacity for emergency response?", "wl": "ja"}, {"id": "L3-12", "n": "Noise", "en": "Noise", "by": "D. Kahneman, O. Sibony & C. Sunstein", "y": "2021", "g": "B", "m": ["M6"], "r": ["L3-09", "F6-13"], "d": "Expert judgments on the same information vary widely, both between people and for the same person across time and circumstances.", "s": "Measure the variability of judgments (noise audit). Reduce noise by structuring judgment criteria and averaging multiple independent assessments.", "c": "Reducing variability and correcting bias are separate challenges.", "ai": "Judgments by rules or models vary less than those by people and are a means of reducing noise. However, any bias is consistently reproduced.", "ask": "If a different reviewer examined the same case, how closely would the conclusions agree?"}, {"id": "L3-13", "n": "Structural inertia", "en": "Structural inertia", "by": "M. Hannan & J. Freeman", "y": "1984", "g": "B", "m": ["M5", "M7"], "r": ["L3-14", "S2-04", "L3-10"], "d": "The more an organization enhances reliability and accountability, the harder it becomes to change its structure. Larger and older organizations change more slowly.", "s": "Radical transformation within an existing organization is difficult. Keep open the option of launching new businesses in a separate organization.", "c": "Inertia is a weakness and also a source of reliability.", "ai": "If AI-driven operational redesign is left to improvement activities of existing departments, it stops at an extension of current operations. A separate task force and authority are needed.", "ask": "In this transformation, which parts of the existing organizational structure and authority must change?"}, {"id": "L3-14", "n": "Competency trap", "en": "Competency trap", "by": "B. Levitt & J. March", "y": "1988", "g": "B", "m": ["M5", "M2"], "r": ["L3-13", "S2-04", "F6-04"], "d": "The more results a familiar method produces, the more people keep using it, and mastery of better new methods lags.", "s": "The more successful a department, the later it switches to new methods. Secure a separate budget and evaluation for exploration.", "c": "There are situations in which deepening existing methods is rational (ambidextrous management, S2-04).", "ai": "Experts do not use AI, feeling their own way is enough. Giving them the role of transferring experts’ tacit knowledge to AI can bring them on board.", "ask": "How many new methods is our best-performing department trying?"}, {"id": "L3-15", "n": "Principal-agent problem", "en": "Principal-agent problem", "by": "M. Jensen & W. Meckling", "y": "1976", "g": "A", "m": ["M4", "M8"], "r": ["L4-07", "L6-09", "F6-11"], "d": "If the interests and information of the one delegating work (principal) and the one entrusted with it (agent) do not align, the agent may put its own interests first.", "s": "Align interests through compensation design, monitoring and disclosure. It is the basis for executive compensation and outsourcing contract design.", "c": "Monitoring and compensation have costs, and the problem cannot be fully eliminated.", "ai": "When work is delegated to AI agents, goal misalignment and monitoring problems also arise. Designing authority, goals and records is the equivalent of contract design.", "ask": "Where do the goals of those we delegate to (people, contractors, AI) diverge from our own?"}, {"id": "L4-01", "n": "Supply and demand", "en": "Supply and demand", "by": "A. Marshall et al.", "y": "1890", "g": "A", "m": ["M2"], "r": ["L4-11", "L4-07"], "d": "Prices move toward the point where supply and demand balance. Shortages push them up; surpluses push them down.", "s": "Where supply surges, value falls and shifts to scarce complements (e.g., text and code that generative AI can mass-produce).", "c": "Regulation, information asymmetry, network effects and the like distort the equilibrium.", "ai": "Deliverables that AI can mass-produce face downward price pressure. Whether what you sell can be mass-produced determines where prices head.", "ask": "Which part of our revenue can AI replace at low cost?"}, {"id": "L4-02", "n": "Diminishing returns", "en": "Diminishing returns", "by": "A.R.J. Turgot (c. 1767) / D. Ricardo (1815)", "y": "c. 1767 / 1815", "g": "A", "m": ["M3"], "r": ["L1-07", "L4-05"], "d": "If you increase only one input while holding the others fixed, the output gained from each additional unit eventually declines.", "s": "Rather than piling on more of the same initiative, redirect investment to the factor that is the next constraint.", "c": "In businesses where knowledge and networks are the source of value, increasing returns occur instead (L4-05).", "ai": "Adding more licenses of the same AI tool yields diminishing returns. Direct incremental investment to the next constraint: data and process design.", "ask": "If we add AI investment, which factor will pay off next?"}, {"id": "L4-03", "n": "Economies of scale and scope", "en": "Economies of scale and scope", "by": "A. Smith (1776) / J. Panzar & R. Willig (1981)", "y": "1776 / 1981", "g": "A", "m": ["M1", "M3"], "r": ["L4-04", "S6-04", "S2-02"], "d": "Expanding scale lowers unit cost (economies of scale). Using shared resources across multiple businesses lowers cost (economies of scope).", "s": "The ability to reuse common foundations such as data, talent and brand across multiple businesses justifies diversification.", "c": "Beyond a certain scale, rising coordination costs cause diseconomies of scale.", "ai": "Reusing a company-wide AI platform, data and evaluation mechanisms across multiple businesses lowers the deployment cost per business.", "ask": "Which components of an AI platform can we share across businesses today?"}, {"id": "L4-04", "n": "Experience curve", "en": "Experience curve", "by": "T.P. Wright (1936) / B. Henderson (BCG, 1960s)", "y": "1936 / 1960s", "g": "B", "m": ["M1", "M5"], "r": ["S1-01", "F4-02", "L4-03"], "d": "Each time cumulative output doubles, unit cost falls by a fixed rate (typically 20–30%).", "s": "The company that gains share first gains a cost advantage. This is the theoretical basis for the cost leadership strategy and for PPM.", "c": "It does not happen automatically. When technology changes discontinuously, accumulated experience loses its value.", "ai": "Track record in production improves the quality of prompts and evaluation data. The earlier a company reaches production, the wider the gap in speed of improvement.", "ask": "Are we obtaining the learning data generated in production operations ahead of competitors?"}, {"id": "L4-05", "n": "Network effect", "en": "Network effect", "by": "R. Metcalfe (c. 1980) / G. Gilder (1993)", "y": "c. 1980 / 1993", "g": "B", "m": ["M1", "M2"], "r": ["S5-01", "S3-01", "L5-07"], "d": "The more users there are, the greater the value per user. The value of a network is said to be proportional to the square of the number of users.", "s": "The side that passes critical mass tends to take the entire market. In the early stage, prioritize user density over revenue.", "c": "It has been pointed out that “squared” is an overestimate (Briscoe, Odlyzko & Tilly 2006). In many cases the effect operates locally, by region or use case.", "ai": "Inside a company too, the more people use shared prompts and agents, the more valuable they become. Build user density first.", "ask": "How far has the use of shared AI assets spread among employees within each department?"}, {"id": "L4-06", "n": "Comparative advantage", "en": "Comparative advantage", "by": "D. Ricardo", "y": "1817", "g": "S", "m": ["M8"], "r": ["S5-05", "L6-01"], "d": "Even if you are inferior in every field, both sides gain if each specializes in the field where it is relatively stronger and trades.", "s": "Even if AI outperforms people in many tasks, people create value by concentrating on the tasks where they are relatively stronger. Divide labor by comparative advantage, not absolute advantage.", "c": "This is a conclusion within a model built on assumptions. Transition frictions (unemployment, retraining) lie outside the theory.", "ai": "Even if AI surpasses people in every task, overall output is greater when people move to the tasks where they are relatively stronger.", "ask": "Which tasks do we see people being relatively stronger at?"}, {"id": "L4-07", "n": "Market for lemons", "en": "Market for lemons", "by": "G. Akerlof", "y": "1970", "g": "A", "m": ["M4"], "r": ["L4-01", "S4-05"], "d": "In a market where only the seller knows quality, good products exit and only poor products remain.", "s": "Companies that can signal quality through warranties, brand, third-party certification and published track records (signaling) win.", "c": "Signals can be faked. Signals that are costly to send are more trusted. The work was recognized by the Nobel Prize in Economics in 2001.", "ai": "The quality of AI output is hard for buyers to see. Publishing evaluation results and audits becomes a signal of trust for companies using AI.", "ask": "What evidence do we have to show customers the quality of our AI use?"}, {"id": "L4-08", "n": "Hotelling's law", "en": "Hotelling's law", "by": "H. Hotelling", "y": "1929", "g": "B", "m": ["M8"], "r": ["S1-02", "F4-07", "L4-10"], "d": "As competitors fight over customers, they converge on similar positions (the center).", "s": "Industry homogenization occurs naturally. Unless you deliberately compete on a different axis, you head toward price competition.", "c": "There are counter-models showing that, once price competition is taken into account, maximum differentiation occurs instead (d'Aspremont et al. 1979).", "ai": "If every company gravitates to the same foundation models and the same deployment methods, AI use becomes homogenized. Differences emerge in proprietary data and how work is structured.", "ask": "Using the same AI tools as competitors, what will we differentiate on?"}, {"id": "L4-09", "n": "Prisoner's dilemma", "en": "Prisoner's dilemma", "by": "M. Flood & M. Dresher (1950) / A. Tucker (naming)", "y": "1950", "g": "S", "m": ["M8"], "r": ["S4-04", "S4-06"], "d": "When each party acts rationally, everyone ends up worse off than if all had cooperated.", "s": "Price wars and excessive capital investment have this structure. Elicit cooperation through repeated relationships, reputation and rule design.", "c": "The optimal action differs depending on whether the relationship is one-shot or repeated.", "ai": "If companies compete on AI price cuts or investment, all of them are exhausted. Separate the cooperative and competitive areas of AI use within the industry.", "ask": "Are there areas of AI investment where cooperation with competitors is viable?"}, {"id": "L4-10", "n": "Red Queen effect", "en": "Red Queen effect", "by": "L. Van Valen (1973) / W. Barnett & M. Hansen (1996)", "y": "1973 / 1996", "g": "B", "m": ["M8", "M2"], "r": ["S2-03", "F2-02", "S1-02"], "d": "Because competitors also evolve, you must keep running just to hold your current position.", "s": "Continuous improvement does not raise your relative position. Unless you change the axis of competition itself, the war of attrition continues.", "c": "Competition strengthens firms, but it also creates the risk of over-adapting to past competitive environments.", "ai": "Because competitors adopt AI at the same time, adoption alone confers no advantage. Advantages are short-lived, and speed of renewal decides the outcome.", "ask": "How many months will the advantage gained from AI adoption last before competitors catch up?"}, {"id": "L4-11", "n": "Jevons paradox", "en": "Jevons paradox", "by": "W.S. Jevons", "y": "1865", "g": "B", "m": ["M2", "M1"], "r": ["L4-01", "L6-03"], "d": "When the efficiency of resource use improves, total consumption of that resource can paradoxically increase.", "s": "As the cost of AI inference falls, usage grows and demand for compute and electricity rises. Efficiency gains do not necessarily lower total cost.", "c": "Whether total consumption rises (backfire) depends on the price elasticity of demand.", "ai": "As the unit price of inference falls, usage grows and total AI spending can swell. Manage the budget by total amount, not by the decline in unit price.", "ask": "Who reviews total AI usage cost on a monthly basis?"}, {"id": "L4-12", "n": "Long tail", "en": "Long tail", "by": "C. Anderson", "y": "2004", "g": "B", "m": ["M1"], "r": ["L1-02", "L1-01"], "d": "In online distribution, the sum of the vast number of niche products outside a few hits forms a large market.", "s": "In businesses where inventory and search costs are close to zero, breadth of assortment and accuracy of recommendation become weapons.", "c": "In actual sales data, there are many cases where concentration on hits has instead intensified (Elberse 2008).", "ai": "AI lowers the cost of individualized service and makes products and services for small audiences profitable. Personalized proposals to niche customers become a business.", "ask": "Are there services for small customer segments that AI makes profitable?"}, {"id": "L4-13", "n": "Smile curve", "en": "Smile curve", "by": "Stan Shih (Acer founder)", "y": "1992", "g": "C", "m": ["M3"], "r": ["L4-14", "F3-01", "S5-05"], "d": "Value added in a value chain is high upstream (R&D, components) and downstream (brand, service), and low in the middle (assembly).", "s": "If your company sits in the valley (assembly or generic processing), decide whether to move upstream or downstream.", "c": "The shape changes by industry and era. There are cases, such as semiconductor contract manufacturing, where the middle holds high value added.", "ai": "In the AI value chain too, profits concentrate in semiconductors and compute infrastructure (upstream) and in customer touchpoints and tailoring to operations (downstream), while the generic middle layer is prone to price collapse.", "ask": "Is our position in the value chain in the valley of the curve?"}, {"id": "L4-14", "n": "Conservation of attractive profits", "en": "Conservation of attractive profits", "by": "C. Christensen & M. Raynor", "y": "2003", "g": "C", "m": ["M3", "M8"], "r": ["L4-13", "S2-08", "F2-09"], "d": "When one layer becomes commoditized (modularized), profits shift to the adjacent layer whose performance is still insufficient.", "s": "Watch which layer of the industry is becoming a commodity, and move ahead to the layer where profits will gather next.", "c": "Judging which layer's performance is “still insufficient” is difficult in advance.", "ai": "As foundation models become commoditized, profits shift to the layers of data, integration into operations, evaluation and trust. Decide which layer you will earn in.", "ask": "Within our business, which layers are becoming commodities and which are still insufficient in performance?"}, {"id": "L4-15", "n": "Economics of superstars", "en": "Economics of superstars", "by": "S. Rosen", "y": "1981", "g": "B", "m": ["M1"], "r": ["L1-15", "L4-05", "L1-02"], "d": "In markets where the cost of replication and distribution is low, a small difference in quality becomes a huge difference in income, concentrated among a few winners.", "s": "In digitized markets, the value of being second plummets. Choose a narrow domain where you can be number one.", "c": "Where the market is fragmented by region, language or regulation, concentration weakens.", "ai": "As AI lowers the cost of production and distribution, concentration on top talent and top-ranked services intensifies. The need to narrow the focus of differentiation grows.", "ask": "In this market, is there a structure in which a competitor with slightly higher quality takes most of our customers?"}, {"id": "L4-16", "n": "Baumol's cost disease", "en": "Baumol's cost disease", "by": "W. Baumol & W. Bowen", "y": "1966", "g": "A", "m": ["M5", "M3"], "r": ["L5-12", "L6-06"], "d": "Services where productivity is hard to raise (education, healthcare, performance, etc.) keep becoming relatively more expensive as wages rise in other industries.", "s": "Labor-dependent services will keep facing pressure on price or margin unless the cost structure is changed.", "c": "Even if they become relatively more expensive, society as a whole does not become poorer.", "ai": "Generative AI may, for the first time, substantially move the productivity of intellectual services where productivity has been hard to raise. The question is whether it can be the cure for cost disease.", "ask": "What share of our cost of sales is cost that grows in proportion to people's time?"}, {"id": "L4-17", "n": "Information rules", "en": "Information rules", "by": "C. Shapiro & H. Varian", "y": "1998", "g": "A", "m": ["M1", "M4"], "r": ["L4-15", "L4-05"], "d": "Information goods require high fixed costs to create, but the marginal cost of replication is nearly zero. Price is determined not by cost but by value to the customer.", "s": "Design pricing on the basis of value, for example by splitting versions by customer value (versioning) or selling in bundles (bundling).", "c": "In markets with zero marginal cost, profits tend to vanish in price competition. Differentiation or a scale advantage is required.", "ai": "Generative AI output costs almost nothing to replicate, but inference incurs variable costs. Build the cost that scales with usage into pricing design.", "ask": "Do we set the price of this product from value to the customer rather than from cost?"}, {"id": "L5-01", "n": "Moore's law", "en": "Moore's law", "by": "G. Moore", "y": "1965 / revised 1975", "g": "B", "m": ["M1", "M5"], "r": ["L5-05", "L1-03"], "d": "The integration density of semiconductors doubles roughly every two years.", "s": "Companies that designed their businesses on the premise of resources getting exponentially cheaper have won.", "c": "It is not a law of physics but an empirical rule that also served as an industry target. Miniaturization is slowing, and the source of performance gains is shifting to design and parallelization.", "ai": "On the premise that the unit price of AI inference keeps falling, design use cases that are costly today around their future prices.", "ask": "Would the AI use cases we shelved as too expensive become viable if prices fall?"}, {"id": "L5-02", "n": "Amara's law", "en": "Amara's law", "by": "R. Amara (attributed)", "y": "1960s–70s (attributed)", "g": "C", "m": ["M5", "M6"], "r": ["L5-03", "L5-09", "S3-01"], "d": "People overestimate the impact of a technology in the short run and underestimate it in the long run.", "s": "Do not withdraw after early disappointment; keep investing toward long-term structural change.", "c": "The exact date and source of the remark have not been confirmed.", "ai": "Even after the short-term hype and disappointment of generative AI, its long-term impact on work structures remains. Do not terminate PoCs on short-term results alone.", "ask": "Do we evaluate AI investment separately for short-term results and long-term structural change?"}, {"id": "L5-03", "n": "Gartner hype cycle", "en": "Gartner hype cycle", "by": "Gartner (J. Fenn)", "y": "1995", "g": "D", "m": ["M5", "M6"], "r": ["L5-02", "L5-04"], "d": "A model in which a new technology passes through the “peak of inflated expectations” and the “trough of disillusionment” to reach the “plateau of productivity.”", "s": "Use it as a common language for discussing the management of expectations and the timing of investment.", "c": "Reviews indicate that few technologies actually follow this curve (Dedehayir & Steinert 2016). Do not use it as a forecasting model.", "ai": "Maturity differs by AI technology. Use where generative AI and agents currently sit as a shared language among executives, and allocate investment accordingly.", "ask": "Where do our AI initiatives sit between the peak of expectations and the trough of disillusionment?"}, {"id": "L5-04", "n": "Diffusion of innovations", "en": "Diffusion of innovations", "by": "E. Rogers", "y": "1962", "g": "A", "m": ["M5", "M2"], "r": ["S1-05", "L2-11", "F5-08"], "d": "A new thing spreads in the order innovators → early adopters → early majority → late majority → laggards, tracing an S-curve cumulatively.", "s": "Do not try to spread it to everyone at once; start from the early adopters. Spread is faster when ease of trial and visibility of results are increased.", "c": "The 2.5 / 13.5 / 34 / 34 / 16% segmentation is a convenient set of figures obtained by dividing a normal distribution at standard deviations.", "ai": "Roll out AI internally by starting with a small number of enthusiastic users and spreading while showing results. Company-wide simultaneous training is unlikely to achieve adoption.", "ask": "Who are our early adopters of AI, and to whom will we show their results?"}, {"id": "L5-05", "n": "Technology S-curve", "en": "Technology S-curve", "by": "R. Foster", "y": "1986", "g": "B", "m": ["M5", "M1"], "r": ["S1-04", "F4-03", "L1-03"], "d": "Technology performance improves slowly at first, accelerates in the middle, and slows as it approaches physical limits.", "s": "When an existing technology nears its ceiling, prepare to move onto the S-curve of a new technology whose performance is currently lower.", "c": "The location of the ceiling is hard to know in advance, and switching too early also fails.", "ai": "There may be phases in which performance gains from large models slow. Do not depend on a single model; be ready to move to the next approach.", "ask": "If today's AI approach plateaus, what do we switch to?"}, {"id": "L5-06", "n": "Creative destruction", "en": "Creative destruction", "by": "J. Schumpeter (1942) / P. Aghion & P. Howitt (1992)", "y": "1942", "g": "B", "m": ["M5", "M8"], "r": ["S1-04", "S2-04", "L5-05"], "d": "New technologies and businesses grow the economy by destroying old ones.", "s": "You need the resolve to launch, ahead of others, the new business that destroys your own existing business.", "c": "Aghion and Howitt formalized it mathematically and were recognized by the 2025 Nobel Prize in Economics (shared with Mokyr).", "ai": "AI agents may replace a company's core operations. Run experiments that replace your own revenue sources ahead of others.", "ask": "If AI replaces our main business, which operation will it start with?"}, {"id": "L5-07", "n": "Path dependence", "en": "Path dependence", "by": "P. David (1985) / W.B. Arthur (1989)", "y": "1985 / 1989", "g": "B", "m": ["M5", "M2"], "r": ["L4-05", "S5-04", "S3-01"], "d": "An early chance choice is self-reinforcing, and even an inferior technology becomes locked in as the standard.", "s": "Concentrate resources on the early contest over standards, data formats and ecosystems. Once locked in, it is hard to overturn.", "c": "There are rebuttals concerning the QWERTY layout, the representative example (Liebowitz & Margolis 1990).", "ai": "Depending heavily on a specific vendor's models or agent platform makes switching difficult. Secure data formats and connection standards first.", "ask": "Can we move our data from the current AI platform to another?"}, {"id": "L5-08", "n": "Lindy effect", "en": "Lindy effect", "by": "A. Goldman (1964) / N. Taleb (2012)", "y": "1964 / 2012", "g": "C", "m": ["M5"], "r": ["L1-03", "L5-03"], "d": "For things that do not perish (ideas, technologies, books), the longer they have already survived, the longer they will remain.", "s": "Invest learning time in principles that have been used for a long time (the law layer of this material) rather than in fashionable methods.", "c": "It does not apply to things with a physical lifespan, such as people or machines.", "ai": "Models and tools are replaced in a short time, but the principles of work and patterns of judgment remain. Talent development should devote time to the latter.", "ask": "Which parts of our AI training remain usable even when the tools change?"}, {"id": "L5-09", "n": "Productivity J-curve", "en": "Productivity J-curve", "by": "R. Solow (1987) / E. Brynjolfsson et al. (2021)", "y": "1987 / 2021", "g": "B", "m": ["M5"], "r": ["L5-02", "F5-08", "F5-07"], "d": "Even after a new technology spreads, it does not show up in productivity statistics for a while, because complementary intangible investments such as work redesign and talent development are needed first.", "s": "The effects of AI adoption come from redesigning work and organization, not from distributing tools. Even if early figures are poor, continue if the direction is right.", "c": "“It's a J-curve, so wait” can also become an excuse for failure. Confirm progress with intermediate indicators.", "ai": "There is a time lag in recovering AI investment. Anticipate a productivity dip right after adoption and set the evaluation timing at management meetings later.", "ask": "How much time will management allow before measuring the effect of AI investment?"}, {"id": "L5-10", "n": "Collingridge dilemma", "en": "Collingridge dilemma", "by": "D. Collingridge", "y": "1980", "g": "C", "m": ["M5", "M2"], "r": ["F6-08", "S3-03"], "d": "The impact of a technology cannot be predicted until it has spread, but once it has spread it is difficult to control.", "s": "Make AI governance adaptive, starting small and continually reviewing, rather than “creating perfect rules later.”", "c": "It is not a binary choice between precaution and laissez-faire. The key is a design that preserves reversibility so that corrections can be made later.", "ai": "The regulation and impact of AI become visible only after it has spread. Start governance with small-scale operations and update it regularly.", "ask": "How often are we required to review AI governance?"}, {"id": "L5-11", "n": "Unintended consequences", "en": "Unintended consequences", "by": "R.K. Merton (1936) / H. Siebert (2001)", "y": "1936 / 2001", "g": "C", "m": ["M2"], "r": ["L3-07", "F6-05"], "d": "A purposeful initiative produces unintended, sometimes opposite, results.", "s": "Identify second- and third-order effects of an initiative in advance, and anticipate the loopholes that incentive schemes create.", "c": "The Indian cobra-eradication anecdote that gave the effect its name is poorly documented. The 1902 Hanoi rat-eradication bounty can be confirmed in the historical record (Vann 2003).", "ai": "Setting AI usage targets creates unintended loopholes, such as deliverables padded with AI. Identify the misuse of metrics first.", "ask": "What loopholes could our AI usage targets create?"}, {"id": "L5-12", "n": "General purpose technology", "en": "General purpose technology", "by": "T. Bresnahan & M. Trajtenberg", "y": "1995", "g": "B", "m": ["M5", "M2"], "r": ["L5-09", "L5-13", "L4-16"], "d": "General-purpose technologies such as the steam engine, electricity and semiconductors permeate many industries, keep improving, and spawn one complementary invention after another.", "s": "The effect of a general-purpose technology comes less from the technology itself than from the redesign of operations, organizations and products built on it, and takes time.", "c": "What counted as a general-purpose technology is, in many cases, known only in hindsight.", "ai": "A leading view is that generative AI meets the conditions of a general-purpose technology, and some estimates suggest that large language models could affect the tasks of many occupations (Eloundou et al. 2023).", "ask": "Which of our operations would change structurally if rebuilt on the premise of AI?"}, {"id": "L5-13", "n": "Task-based approach", "en": "Task-based approach", "by": "D. Autor, F. Levy & R. Murnane", "y": "2003", "g": "A", "m": ["M7"], "r": ["L5-12", "L4-06", "L5-14"], "d": "Technology does not replace whole occupations; it substitutes for or complements the tasks that make up an occupation. The more routine the task, the more easily it is replaced.", "s": "Analyze workforce plans at the level of tasks, not job categories. Separate tasks that will be replaced from tasks that will rise in value.", "c": "Because generative AI extends to non-routine cognitive tasks, a “routine or not” distinction alone is no longer sufficient.", "ai": "Assess the impact of AI at the task level, and design how the freed-up time will be redirected to which high-value tasks.", "ask": "If we break this role's work into tasks, what share is replaced by AI, complemented by AI, or unchanged?"}, {"id": "L5-14", "n": "Polanyi's paradox", "en": "Polanyi's paradox", "by": "M. Polanyi (1966) / D. Autor (2014)", "y": "1966 / 2014", "g": "C", "m": ["M6"], "r": ["L5-13", "L6-01", "L3-14"], "d": "People know more than they can tell. Because tacit knowledge cannot be written out as procedures, it has been difficult to automate with conventional methods.", "s": "Transfer experts' judgment through cases and dialogue rather than writing it out as rules.", "c": "Machine learning, which learns from large numbers of cases, is beginning to partially circumvent this paradox.", "ai": "Generative AI can learn part of tacit knowledge from cases. Preserving cases of experts' judgment as data becomes a new means of passing on skills.", "ask": "Which parts of our experts' judgment are not yet written in manuals?"}, {"id": "L5-15", "n": "Ironies of automation", "en": "Ironies of automation", "by": "L. Bainbridge", "y": "1983", "g": "B", "m": ["M6", "M2"], "r": ["L2-13", "F5-15", "L6-06"], "d": "The more automation advances, the more what remains for people is the difficult judgment that cannot be automated and the handling of anomalies. At the same time, opportunities for routine practice are lost, and people cannot respond when it matters most.", "s": "Together with automation, design training to preserve human skills and handovers during anomalies.", "c": "The insights come mainly from aviation and plant control. Determine the extent of countermeasures according to the criticality of the work.", "ai": "The more routine work is left to AI, the fewer chances junior staff have to build judgment. Preserve deliberate manual work for development, and training in verifying AI output.", "ask": "On the day AI stops, how many people can run operations by hand?"}, {"id": "L5-16", "n": "Kranzberg's first law", "en": "Kranzberg's first law", "by": "M. Kranzberg", "y": "1986", "g": "C", "m": ["M7"], "r": ["L5-11", "L5-10"], "d": "Technology is neither good nor bad, nor is it neutral. Its impact is determined by the context in which it is used and by the workings of society.", "s": "Evaluate technology not only on performance but in context: who uses it, how, and what changes.", "c": "It is less a law than an aphorism that expresses an attitude for thinking about technology.", "ai": "The same AI can be a tool for productivity or a source of risk, depending on how it is used and how controls are designed. Include the business context and operating rules in the evaluation.", "ask": "In this use of AI, who gains the most and who loses the most?"}, {"id": "L5-17", "n": "Technological revolutions and financial capital", "en": "Technological revolutions and financial capital", "by": "C. Perez", "y": "2002", "g": "C", "m": ["M5", "M2"], "r": ["L5-03", "L5-02", "L5-06"], "d": "A technological revolution proceeds in two phases: an installation phase in which financial capital rushes in and creates a bubble, and a deployment phase after the collapse in which the technology permeates the real economy broadly.", "s": "Distinguish the period of frenzy from the period of diffusion. Full-scale adoption and the determination of winners come after the bubble bursts.", "c": "It is a framework based on historical interpretation and cannot be used to predict timing.", "ai": "Even if massive AI investment overheats, it does not negate the value of the technology. Companies that kept implementing in operations even during the collapse phase may become winners of the deployment phase.", "ask": "Is our AI investment a plan worth continuing even after market frenzy cools?"}, {"id": "L6-01", "n": "Moravec's paradox", "en": "Moravec's paradox", "by": "H. Moravec", "y": "1988", "g": "C", "m": ["M6"], "r": ["L4-06", "L6-02"], "d": "Advanced reasoning that is hard for humans is easy for AI, while perception and movement that are easy for humans are hard for AI.", "s": "Automation does not proceed in order of “difficulty for humans.” Intellectual clerical work may be replaced first.", "c": "With advances in robotics, this boundary keeps moving.", "ai": "Intellectual clerical work such as contract review and document preparation is replaced first, while manual work on the front line lags. Consider the reallocation of clerical staff first.", "ask": "In which departments is there most intellectual clerical work that AI can easily replace?"}, {"id": "L6-02", "n": "The Bitter Lesson", "en": "The Bitter Lesson", "by": "R. Sutton", "y": "2019", "g": "C", "m": ["M5", "M1"], "r": ["L6-03", "S2-03"], "d": "In the history of AI research, general-purpose methods that exploit growing computation have ultimately won over methods that build in human knowledge.", "s": "Prioritize designs that can ride model progress (ease of swapping components, data assets) over building in proprietary rules.", "c": "It is an empirical rule drawn from observing the history of AI research. In short-term practice, there are many cases where building in custom logic wins.", "ai": "Custom rules built for each task may be wasted with the next model. Invest in swappable design and in your own data.", "ask": "Will what we are hand-building now become unnecessary when the next model arrives?"}, {"id": "L6-03", "n": "Neural scaling law", "en": "Neural scaling law", "by": "J. Kaplan et al. (2020) / J. Hoffmann et al. (2022)", "y": "2020 / 2022", "g": "B", "m": ["M1"], "r": ["L6-02", "L4-11", "L5-01"], "d": "The performance of language models improves predictably, following power laws in the number of parameters, the amount of data and the amount of compute.", "s": "Competition on model performance becomes competition on the ability to procure compute and data. Separate the layers where you compete from the layers you rent.", "c": "It is an empirical rule within the observed range. Its premises are changing, such as data scarcity and the shift of weight toward inference-time compute.", "ai": "Developing frontier models becomes a contest of capital. Most companies differentiate on rented models through proprietary data.", "ask": "Are we on the side that builds models or the side that rents them?"}, {"id": "L6-04", "n": "Test-time compute scaling", "en": "Test-time compute scaling", "by": "OpenAI (o1, 2024) / C. Snell et al. (2024)", "y": "2024", "g": "B", "m": ["M1", "M4"], "r": ["L6-03", "L6-15"], "d": "Performance also improves by increasing the compute used at inference time (length of thinking, number of attempts), not only at training time.", "s": "A design that allocates compute according to difficulty determines both performance and cost.", "c": "The effect varies greatly by task, and cost rises in proportion to compute.", "ai": "Even if the unit price per token falls, reasoning models use a large number of tokens per request, so the cost per task does not easily fall.", "ask": "For this task, which creates more value: a fast, cheap answer or a slower, accurate one?"}, {"id": "L6-05", "n": "Jagged technological frontier", "en": "Jagged technological frontier", "by": "F. Dell'Acqua et al. (Harvard Business School & BCG)", "y": "2023", "g": "B", "m": ["M4", "M6"], "r": ["L6-06", "L2-13", "F5-15"], "d": "The frontier of AI capability is jagged: among tasks that appear equally difficult, some are ones AI does well and others ones it does poorly.", "s": "In an experiment with 758 consultants, for tasks inside the frontier, throughput rose 12.2%, work was 25.1% faster and quality was more than 40% higher. For tasks outside the frontier, the correct-answer rate fell by 19 percentage points.", "c": "The frontier is invisible from the outside and keeps moving with model updates. It can only be confirmed in your own operations.", "ai": "Guidelines for AI use should start by determining, through experiments, which tasks to delegate, collaborate on, or not delegate. A uniform recommendation to use AI lowers quality in tasks outside the frontier.", "ask": "Can we tell apart, in our own company, the tasks where delegating to AI raised quality from those where it lowered quality?"}, {"id": "L6-06", "n": "Skill-leveling effect", "en": "Skill-leveling effect", "by": "E. Brynjolfsson, D. Li & L. Raymond", "y": "2023 / 2025", "g": "B", "m": ["M6", "M7"], "r": ["L6-05", "L4-16", "L5-15"], "d": "Generative AI assistance raises the productivity of less experienced workers far more than that of experts, because the behavior patterns of experts are learned by the AI and passed on to the less experienced.", "s": "In a study of 5,179 customer support agents, issues resolved per hour rose 14% on average and 34% for less experienced or lower-skilled agents, with only a slight effect on experts.", "c": "These are results from one company and one occupation. A study of entrepreneurs found that higher performers benefited more, and in some cases lower performers even got worse (Otis et al. 2024).", "ai": "AI works best as a tool to speed up the ramp-up of new hires. Review development plans and staffing on the premise of AI, and give experts the role of contributing their knowledge to the AI.", "ask": "By how much can AI shorten the time it takes a new hire to become fully productive?"}, {"id": "L6-07", "n": "Garbage in, garbage out", "en": "Garbage in, garbage out", "by": "Computing industry maxim of the 1950s", "y": "1950s", "g": "C", "m": ["M3"], "r": ["L1-07", "L6-08", "F4-11"], "d": "If the quality of input is poor, however excellent the processing, the quality of output will be poor.", "s": "The upper limit of results from AI and data analysis is set by data quality. Invest in data preparation before choosing a model.", "c": "Large volumes of data can absorb some noise, but systematic errors and biases are amplified.", "ai": "In RAG, which searches internal documents to answer, document version control and accuracy set the upper limit of answer accuracy. Organizing documents becomes the groundwork for AI adoption.", "ask": "Who guarantees that the internal data we let AI read is up to date and correct?"}, {"id": "L6-08", "n": "Model collapse", "en": "Model collapse", "by": "I. Shumailov et al.", "y": "2024", "g": "B", "m": ["M2"], "r": ["L6-07", "S2-10"], "d": "If the next AI is repeatedly trained on data generated by AI, the tails of the original data distribution are lost and performance degrades.", "s": "Human-created data with a reliable provenance rises in value. Proprietary primary data becomes a strategic asset.", "c": "Some research shows that degradation can be contained if generated data is accumulated and mixed with human data rather than replacing it.", "ai": "If internal knowledge fills up with AI-generated documents, the quality of search and training declines. Make identifying AI-generated material and preserving primary information an operating rule.", "ask": "Within our internal knowledge, can we distinguish documents generated by AI from primary information written by people?"}, {"id": "L6-09", "n": "Specification gaming", "en": "Specification gaming", "by": "D. Amodei et al. (2016) / V. Krakovna et al. (2020)", "y": "2016 / 2020", "g": "B", "m": ["M2"], "r": ["L3-07", "L3-15", "F6-14"], "d": "AI optimizes the goal it is given literally, and finds loopholes that run counter to the designer's intent.", "s": "Design the goals and evaluation metrics given to AI on the assumption that loopholes exist, and have people check what is actually in the results.", "c": "It can be called the AI version of Goodhart's law (L3-07). The more capable the AI, the more sophisticated the loopholes.", "ai": "If an agent is told to “make the tests pass” or “raise the KPI,” it may achieve this by rewriting the tests or the metrics themselves. Separate permissions from evaluation.", "ask": "Is there a loophole through which the goal we gave AI can be achieved in a way that runs counter to our intent?"}, {"id": "L6-10", "n": "Calibrated models must hallucinate", "en": "Calibrated models must hallucinate", "by": "A.T. Kalai & S. Vempala", "y": "2024", "g": "B", "m": ["M4"], "r": ["L1-11", "F5-15", "F6-15"], "d": "A well-calibrated language model inevitably generates errors at a certain rate for facts that appear only rarely in the training data.", "s": "Do not design operations on the premise of zero errors. Build in mechanisms that detect and correct errors when they occur.", "c": "This is a discussion of a theoretical lower bound. Combining retrieval and citing sources can greatly reduce errors in practice.", "ai": "Set the goal as “operations designed so that errors do no harm.” Make citing sources mandatory and decide where people check.", "ask": "If an AI error reaches a customer, how much damage results, and where is it designed to be stopped?"}, {"id": "L6-11", "n": "Hyrum's law", "en": "Hyrum's law", "by": "H. Wright (Google)", "y": "2010s", "g": "C", "m": ["M2", "M5"], "r": ["F6-15", "F6-16", "L5-07"], "d": "With a sufficient number of users, someone will depend on every observable behavior of a system, including behavior not written in the specification.", "s": "The impact of a change is determined by actual usage, not by the specification. Observe actual usage before making a change.", "c": "It is a rule of thumb from software engineering, made widely known by “Software Engineering at Google” (2020).", "ai": "Switching to a new model version breaks tasks and prompts that relied on quirks of the output. Make regression checks with an evaluation set a condition for switching.", "ask": "Do we have a way to check in advance which tasks will break when we swap the model?"}, {"id": "L6-12", "n": "Hidden technical debt in ML", "en": "Hidden technical debt in ML", "by": "D. Sculley et al. (Google)", "y": "2015", "g": "C", "m": ["M3", "M5"], "r": ["L6-07", "F6-16", "F6-09"], "d": "In production machine learning systems, model code is only a small part; surrounding components such as data collection, verification, monitoring and configuration make up most of the system, and debt accumulates there.", "s": "The cost of AI adoption swells more in preparing the data foundation and operations than in developing the model. Estimate on a total cost of ownership basis.", "c": "The paper addresses machine learning as of 2015. With generative AI, the content of the debt (prompts, evaluation, dependence on external models) has changed.", "ai": "Debt in generative AI applications accumulates in unmanaged prompts, changes made without evaluation, and dependence on a specific vendor. Manage prompts as code.", "ask": "Have we estimated the share of this AI system's cost that is outside the model (data, evaluation, operations)?"}, {"id": "L6-13", "n": "Tesler's theorem", "en": "Tesler's theorem", "by": "L. Tesler (attributed)", "y": "1970s", "g": "C", "m": ["M6", "M5"], "r": ["L5-02", "L5-09"], "d": "AI is whatever has not been done yet. Once a technology is realized, it stops being called AI and becomes just software.", "s": "The more AI achieves, the less conspicuous it becomes. Describe the effect of investment in business metrics, not in terms of “AI-ness.”", "c": "There are differing accounts of the source and exact wording of the remark.", "ai": "Once AI use has taken hold, it becomes ordinary work and is harder to see as an achievement of the promotion team. Record a baseline for measuring effects before adoption.", "ask": "Have we recorded the pre-adoption state of operations (time, volume, error rate) in numbers?"}, {"id": "L6-14", "n": "Lost in the middle", "en": "Lost in the middle", "by": "N.F. Liu et al.", "y": "2023", "g": "B", "m": ["M6"], "r": ["L2-17", "F4-11", "L6-07"], "d": "Language models use information at the beginning and end of a long input well, but tend to overlook information in the middle.", "s": "Rather than handing over long documents as they are, retrieve the necessary parts and pass them in short form, and place important instructions at the beginning or end.", "c": "Newer models have improved, and the degree varies by model.", "ai": "Even as the input length that can be handled grows, the value of designs that narrow down by retrieval (RAG) remains. Do not conclude at once that RAG is unnecessary just because long text can be entered.", "ask": "How much of the material we give AI is actually needed for the answer?"}, {"id": "L6-15", "n": "LLMflation", "en": "LLMflation", "by": "G. Appenzeller (a16z) et al.", "y": "2024", "g": "C", "m": ["M1", "M5"], "r": ["L4-11", "L6-04", "L5-01"], "d": "It has been observed that the cost of using a language model of the same performance has fallen at a pace of about one tenth per year.", "s": "Use cases that are too expensive to be profitable today may become profitable in one to two years. Plan on the premise that prices will fall.", "c": "The rate of decline varies greatly with how it is measured (Epoch AI estimates 9 to 900 times per year depending on the task). Reasoning models use more tokens per request, so the bill per task does not fall as much as the unit price.", "ai": "Plan costs with scenarios for both falling unit prices and rising usage and inference volume. Planning on unit price alone leads to misjudging the total (L4-11).", "ask": "How would the profitability of this use case change if the unit price of AI fell to one tenth of today's?"}, {"id": "L6-16", "n": "Benchmark saturation", "en": "Benchmark saturation", "by": "D. Kiela et al.", "y": "2021", "g": "C", "m": ["M2", "M5"], "r": ["L3-07", "F6-15", "L6-09"], "d": "For public benchmarks that measure AI performance, the time from creation to reaching human-level performance keeps shortening, and they soon stop differentiating.", "s": "Do not choose models on public benchmark rankings alone. Maintain your own evaluation on your own tasks.", "c": "There is also the possibility that benchmarks have leaked into the training data (contamination).", "ai": "Base model selection and release decisions on an evaluation set built from your own failure cases. The evaluation set becomes your company's intellectual asset.", "ask": "How many evaluation sets do we have for comparing models on our own tasks, and who manages them?"}, {"id": "S1-01", "n": "Porter's generic strategies", "en": "Porter's generic strategies", "by": "M. Porter", "y": "1980", "m": ["M7"], "r": ["L4-04", "F2-02", "S2-05"], "d": "Choose one of cost leadership, differentiation or focus, and pursue it consistently across the whole organization.", "s": "Clarify your position within the industry and align resource allocation, organization and evaluation to that one choice.", "c": "Firms that are half-hearted on all of them were said to be “stuck in the middle” and earn low returns, but some firms have achieved both.", "ai": "Generative AI makes combining differentiation and cost advantage realistic, shaking the premise of the old “stuck in the middle” warning.", "ask": "What do customers choose us for, and which axis should we put the resources freed up by AI into?"}, {"id": "S1-02", "n": "Blue ocean strategy", "en": "Blue ocean strategy", "by": "W. C. Kim & R. Mauborgne", "y": "2005", "m": ["M8"], "r": ["F4-07", "L4-08", "L4-10", "F1-06"], "d": "Create an uncontested market space and achieve differentiation and low cost at the same time.", "s": "Reconfigure the competitive factors the industry takes for granted by “eliminating, reducing, raising and creating” to build a new value curve.", "c": "Blue oceans eventually turn red. Prepare separate barriers against imitation. Critics argue that many success stories are post-hoc interpretations.", "ai": "AI lets you strip out value delivery that presupposes human labor and draw a new value curve. But imitation is also fast, so blue oceans are short-lived.", "ask": "Which elements of what customers pay for still rely on human labor?"}, {"id": "S1-03", "n": "Lanchester strategy", "en": "Lanchester strategy", "by": "F. Lanchester (1914) / Nobuo Taoka (1970s)", "y": "1914 / 1970s", "m": ["M1", "M3"], "r": ["L1-01", "S1-01", "S4-03"], "d": "The weak differentiate through local battles, concentration on a single point and close combat; the strong overwhelm through wide-area, comprehensive warfare and by matching (imitating) the opponent.", "s": "A firm with lower share narrows its region, customer segment and product, builds a local No. 1, and then expands.", "c": "This is an analogy applying a mathematical model of combat (the square law of force strength) to management. It was systematized and popularized independently in Japan.", "ai": "Even a small team can reach widely with AI agents, so the range of local battlefields the weak should focus on is broader than before.", "ask": "If we are to win No. 1 in a local battle, which task of which customer segment is it?", "wl": "ja"}, {"id": "S1-04", "n": "Disruptive innovation", "en": "Disruptive innovation", "by": "J. Bower & C. Christensen (1995) / C. Christensen (1997)", "y": "1995 / 1997", "m": ["M5", "M8"], "r": ["L5-05", "S2-04", "L5-06"], "d": "Enter from the low end or a new market with a cheap, simple product that underperforms for existing customers, and eventually capture the mainstream market.", "s": "The more incumbents listen to their best customers, the slower they respond to disruption. Counter with a separate organization and different evaluation criteria.", "c": "“Disruptive” is overused to mean new technology in general. The theory's predictive power has also been criticized (Lepore 2014).", "ai": "Cheap, rough generative AI erodes professional services from the bottom. Our thin-margin customers are the first target.", "ask": "Won't our lowest-margin customers be the first to move to AI substitutes?"}, {"id": "S1-05", "n": "Crossing the chasm", "en": "Crossing the chasm", "by": "G. Moore", "y": "1991", "m": ["M5"], "r": ["L5-04", "F4-04"], "d": "There is a deep chasm between early adopters and the early majority. Cross it by taking control of a specific niche market as a beachhead.", "s": "Deliver a complete solution (the whole product) to a narrow customer segment, then expand to adjacent markets like bowling pins.", "c": "The theory arose for B2B technology products and is hard to apply to consumer goods.", "ai": "Pilots are easy and early adoption grows, but without a complete solution embedded in operations, progress stalls at the chasm.", "ask": "In which niche, for whose task, will we first deliver a complete solution?"}, {"id": "S1-06", "n": "Hidden champions", "en": "Hidden champions", "by": "H. Simon", "y": "1996", "m": ["M3", "M7"], "r": ["S1-03", "S1-01", "L4-15", "S2-09"], "d": "How mid-sized firms win: specialize in a narrow market, take a top global share, and defend it through deep customer relationships and technology.", "s": "A firm lacking scale gains economies of scale by capturing a niche globally. In Japan it also draws policy attention as the Global Niche Top concept.", "c": "If the niche market itself shrinks or disappears, there is nowhere to go.", "ai": "AI lowers the cost of overseas customer development and multilingual support, reducing the barriers for niche leaders to expand globally.", "ask": "In which narrow, deep market could we rank in the global top three?"}, {"id": "S2-01", "n": "Resource-based view", "en": "Resource-based view", "by": "B. Wernerfelt (1984) / J. Barney (1991)", "y": "1984 / 1991", "m": ["M7"], "r": ["F3-02", "S2-03", "S2-02"], "d": "Internal resources that are valuable, rare, and hard to imitate or substitute create sustained competitive advantage.", "s": "Build strategy from resources only we have, rather than starting from attractive external markets.", "c": "When the environment changes, a resource that was a strength can turn into rigidity (core rigidity) that blocks change.", "ai": "Models can be bought by anyone, so scarcity disappears; our proprietary data and operational know-how remain as hard-to-imitate resources.", "ask": "Which of our data could competitors not obtain even if they paid for it?"}, {"id": "S2-02", "n": "Core competence", "en": "Core competence", "by": "C. K. Prahalad & G. Hamel", "y": "1990", "m": ["M7"], "r": ["L4-03", "S6-04", "S2-01"], "d": "Concentrate on core competencies that can extend across multiple products and markets, contribute greatly to customer value, and are hard to imitate.", "s": "Rather than treating the firm as a collection of business units, cultivate shared core competencies and extend them into new businesses.", "c": "Definitions tend to become abstract, and the concept stops working once everything is called “core.”", "ai": "Formalizing tacit core competencies with AI speeds lateral expansion. It also creates the risk of their being copied and leaking out.", "ask": "Could our core competencies be copied by AI and still not be imitated?"}, {"id": "S2-03", "n": "Dynamic capabilities", "en": "Dynamic capabilities", "by": "D. Teece, G. Pisano & A. Shuen", "y": "1997", "m": ["M5", "M7"], "r": ["L4-10", "S2-01", "F6-04"], "d": "The ability itself to sense environmental change, seize opportunities and keep reconfiguring resources is the source of advantage.", "s": "In fast-changing markets, build how quickly you can reconfigure rather than what you own.", "c": "The concept is broad, making it hard to measure and translate into practice.", "ai": "Model updates never stop. The difference comes from an organizational capability to keep swapping tools in, not from mastering any one tool.", "ask": "How many days does it take from a new model's release to reflecting it in operations?"}, {"id": "S2-04", "n": "Organizational ambidexterity", "en": "Organizational ambidexterity", "by": "J. March (1991) / C. O'Reilly & M. Tushman (2004)", "y": "1991 / 2004", "m": ["M7", "M5"], "r": ["S1-04", "F4-03", "S6-02"], "d": "Deepen existing businesses and explore new ones at the same time. Separate the exploration unit organizationally while top management integrates the two.", "s": "Do not evaluate new businesses by the yardstick of existing ones. Separate resource allocation and performance metrics.", "c": "Separating too much prevents leveraging existing assets; integrating too much crushes exploration.", "ai": "Agent-driven efficiency in existing operations and exploration of new businesses compete for the same budget, making allocation rules pivotal.", "ask": "Who decides the split of AI investment between efficiency and exploration?"}, {"id": "S2-05", "n": "Strategic fit", "en": "Strategic fit", "by": "M. Porter", "y": "1996", "m": ["M7"], "r": ["S1-01", "S2-06", "F3-03"], "d": "Strategy is a choice that involves trade-offs. A system of activities that reinforce one another is hard to imitate as a whole.", "s": "Improving operational effectiveness (adopting best practices) is not strategy. Decide what not to do.", "c": "Strong fit reduces flexibility when the environment changes.", "ai": "Applying AI to individual tasks piecemeal does not create advantage. Only by redesigning the whole chain of activities does it become hard to imitate.", "ask": "Before introducing AI, which activities will we deliberately stop?"}, {"id": "S2-06", "n": "Strategy as a story", "en": "Strategy as a story", "by": "Ken Kusunoki", "y": "2010", "m": ["M7"], "r": ["S2-05", "L2-09"], "d": "Advantage comes not from individual moves but from a consistent storyline linked by causality. Its core is a move that looks irrational in isolation (the critical core).", "s": "Make elements that competitors consider “irrational” and therefore do not copy rational within our own storyline.", "c": "Beware the trap of retrospectively turning success stories into narratives (survivorship bias).", "ai": "Generative AI can produce endless ideas for moves, but the storyline linking them causally and the judgment to discard remain with executives.", "ask": "Through which causal chain do our AI moves connect to our path to winning?", "wl": "ja"}, {"id": "S2-07", "n": "Value disciplines", "en": "Value disciplines", "by": "M. Treacy & F. Wiersema", "y": "1993", "m": ["M7"], "r": ["S1-01", "S2-05"], "d": "Excel in one of operational excellence, product leadership or customer intimacy, and keep the other two at industry standard.", "s": "Align organizational culture, metrics and the talent you hire to the one chosen discipline.", "c": "Aiming to be No. 1 in all three means winning in none.", "ai": "AI makes operational excellence easier for anyone to reach. Differences are likely to shift to intimacy or product.", "ask": "In the AI era, which discipline should we excel in: operations, product or intimacy?"}, {"id": "S2-08", "n": "7 Powers", "en": "7 Powers", "by": "H. Helmer", "y": "2016", "m": ["M1", "M8"], "r": ["L4-14", "S2-01", "S2-10"], "d": "Sources of sustained high profitability are limited to seven: scale economies, network economies, counter-positioning, switching costs, branding, cornered resource and process power.", "s": "Verify which power our advantage corresponds to and at which stage of the business it can be built. Counter-positioning means winning with a new model that incumbents cannot copy without hurting their core business.", "c": "Do not confuse temporary advantages that fit none of the seven (first-mover timing, luck) with sustained advantage.", "ai": "AI itself is available to anyone and so is not a power. Sources are cornered resources AI can strengthen (proprietary data), process power, and offer and pricing models incumbents cannot adopt.", "ask": "Which of the seven powers protects our profits, and will AI erode it?"}, {"id": "S2-09", "n": "Hedgehog concept", "en": "Hedgehog concept", "by": "J. Collins", "y": "2001", "m": ["M7"], "r": ["S6-01", "L2-09", "S2-02"], "d": "Concentrate on the single point where what you can be passionate about, what you can be best in the world at, and what drives your economic engine overlap.", "s": "Discuss business selection and focus through the overlap of three circles.", "c": "Many of the companies featured in Good to Great later saw performance decline. Beware survivorship bias (L2-09).", "ai": "The more AI can do, the more valuable the judgment of what to focus on becomes. Apply the three circles to selecting AI use domains as well.", "ask": "Do the domain where we can be best in the world and our profit engine coincide?"}, {"id": "S2-10", "n": "Data flywheel", "en": "Data flywheel", "by": "J. Collins (flywheel, 2001) / A. Ng (AI virtuous cycle)", "y": "2001〜", "m": ["M2", "M1"], "r": ["L1-15", "L6-08", "S2-08"], "d": "Run a virtuous cycle: more product users generate more data, data improves the AI, and the improved product attracts still more users.", "s": "Build mechanisms that accumulate data naturally at the point of use (feedback capture, usage logs) into the product from the start.", "c": "Improvement from more data tends to plateau early and is often overestimated as an entry barrier (Casado & Lauten 2019).", "ai": "When general-purpose models improve fast, a gap built on our own data narrows within a short time. Accumulate data not as volume but as records of operational decisions and whether they were right or wrong.", "ask": "What gets better the more our AI is used?"}, {"id": "S2-11", "n": "AI factory", "en": "AI factory", "by": "M. Iansiti & K. Lakhani", "y": "2020", "m": ["M1", "M7"], "r": ["S2-10", "L3-13", "L4-02"], "d": "Firms that put data collection, algorithmic prediction, experimentation and a software infrastructure at the core of the business are less prone to diminishing returns as they scale.", "s": "Place AI at the center of the business as a factory that produces decisions, not as a tool for improving individual tasks. Standardize the data infrastructure and experimentation mechanisms company-wide.", "c": "For incumbents to move to this form requires a major redesign of organization and authority (L3-13).", "ai": "As work premised on human judgment shrinks, AI-factory firms find it easier to achieve growth that does not scale with headcount.", "ask": "In which operations can we scale up without adding people?"}, {"id": "S3-01", "n": "First-mover advantage", "en": "First-mover advantage", "by": "M. Lieberman & D. Montgomery", "y": "1988", "m": ["M5", "M8"], "r": ["L4-05", "L5-07", "L5-02"], "d": "First movers can gain advantage through technology, resources and customer lock-in. Late movers can learn after market uncertainty clears and enter cheaply.", "s": "First-mover advantage pays in markets with strong network effects or lock-in; fast following pays in markets with uncertain technology or demand.", "c": "One study found that 47% of firms that pioneered a market failed (Golder & Tellis 1993).", "ai": "In domains where usage data feeds back into improvement, first movers' learning effects count. Late movers catch up by switching foundation models.", "ask": "What proprietary learning do we gain by moving first, and when does it accumulate?"}, {"id": "S3-02", "n": "OODA loop", "en": "OODA loop", "by": "J. Boyd", "y": "late 1970s–1980s", "m": ["M5", "M8"], "r": ["F6-01", "F6-08", "S4-02"], "d": "Win by cycling the observe, orient, decide, act loop faster than the opponent and confusing the opponent's judgment.", "s": "Compete on the speed of updating your orientation rather than the precision of your plan. Delegating authority to the front line is a prerequisite.", "c": "Debating whether it beats PDCA is fruitless. The core lies in Orient, the interpretation based on experience and culture.", "ai": "Agents take on continuous observation and orientation, shrinking the loop to seconds. People move to designing judgment criteria and authority.", "ask": "Do decision delays occur in information gathering or in approval?"}, {"id": "S3-03", "n": "Lean startup", "en": "Lean startup", "by": "S. Blank (2005) / E. Ries (2011)", "y": "2005 / 2011", "m": ["M5"], "r": ["L1-10", "S6-03", "F4-06"], "d": "Test hypotheses with a minimum viable product (MVP), run the build-measure-learn loop, and pivot if necessary.", "s": "In highly uncertain new businesses, win through speed of learning rather than accuracy of the plan.", "c": "In regulated industries and large-scale infrastructure, an MVP is hard to establish.", "ai": "The cost of prototyping falls sharply, allowing many MVPs in days. The competitive focus shifts to selecting what to test.", "ask": "What is the riskiest hypothesis we should test by next month?"}, {"id": "S3-04", "n": "Time-based competition", "en": "Time-based competition", "by": "G. Stalk", "y": "1988", "m": ["M5", "M3"], "r": ["S3-02", "F5-05"], "d": "Make the speed of development, production and delivery itself the source of competitive advantage.", "s": "Shortening lead times can improve cost, quality and customer satisfaction at the same time.", "c": "Beware quality degradation for the sake of speed and front-line exhaustion.", "ai": "Waiting times in quoting and contract review shrink. But speed differences are quickly standardized, so the advantage tends to be short-lived.", "ask": "How many days is the lead time today for the step where customers wait the longest?"}, {"id": "S3-05", "n": "Emergent strategy", "en": "Emergent strategy", "by": "H. Mintzberg & J. Waters", "y": "1985", "m": ["M5", "M7"], "r": ["F4-08", "S3-03", "F6-07"], "d": "The strategy actually realized arises not only from planned strategy but also from patterns formed after the fact from accumulated front-line actions.", "s": "Combine planning with front-line experimentation, and pick up successful emergent patterns and elevate them to formal strategy.", "c": "Do not use “emergence” as an excuse for abandoning planning.", "ai": "AI use that the front line starts on its own becomes a source of emergence. Without a mechanism to pick it up, it ends as hidden use.", "ask": "Who picks up AI use that started spontaneously on the front line, and when?"}, {"id": "S3-06", "n": "Blitzscaling", "en": "Blitzscaling", "by": "R. Hoffman & C. Yeh", "y": "2018", "m": ["M5", "M1"], "r": ["L4-05", "S3-01", "L4-15"], "d": "In winner-take-all markets, go for scale far faster than competitors, even at the expense of efficiency.", "s": "Effective only in markets with strong network effects or switching costs. Make clear the period and conditions in which speed is prioritized over efficiency.", "c": "In markets that are not winner-take-all, it merely burns cash.", "ai": "In AI markets, model performance gaps narrow within a short time, so advantage built on speed alone is easily eroded. Pair it with locking in customer touchpoints and data.", "ask": "Is this market truly winner-take-all and worth prioritizing speed?"}, {"id": "S3-07", "n": "Land and expand", "en": "Land and expand", "by": "SaaS sales practice", "y": "2010s", "m": ["M5"], "r": ["S6-03", "F5-10", "L1-10"], "d": "First get adopted in a small department or use case (land), then expand usage within the same customer while demonstrating results (expand).", "s": "Lower the decision hurdle by keeping the initial contract small, and build the path to expansion into the first contract.", "c": "If there is no value in spreading to other departments, it stays a small contract.", "ai": "AI deals tend to stall at PoC. Write into the initial contract the conditions for moving to production and a right of first negotiation on the next rollout.", "ask": "If the initial deployment succeeds, are the next department and budget already decided?"}, {"id": "S4-01", "n": "The Art of War", "en": "The Art of War", "by": "Sun Tzu (authorship disputed)", "y": "c. 5th century BC", "m": ["M8", "M4"], "r": ["S4-03", "F2-03"], "d": "Winning without fighting is best. Know the enemy and know yourself, and you need not fear a hundred battles.", "s": "Rather than direct clashes, create a situation in which the opponent cannot fight, through alliances, information and terrain.", "c": "Being highly abstract, it can be used to justify any action after the fact.", "ai": "Agents can continuously collect competitors' hiring and public information, raising the precision and frequency with which we know the opponent before fighting.", "ask": "Who tracks competitor moves today, and how often?"}, {"id": "S4-02", "n": "On War", "en": "On War", "by": "C. v. Clausewitz", "y": "1832", "m": ["M3", "M4"], "r": ["S3-02", "S4-01"], "d": "War is the continuation of politics by other means. Assume plans will inevitably go awry through “friction” and the “fog,” and concentrate force on the enemy's center of gravity.", "s": "Strategy is subordinate to higher purpose. Treat plans as bound to go awry in execution and leave room for front-line judgment.", "c": "Interpretations of the “center of gravity” differ among writers.", "ai": "AI output goes plausibly wrong. Automating on the assumption that things proceed as planned breaks down under front-line friction.", "ask": "When automation stops unexpectedly, who takes over the decision?"}, {"id": "S4-03", "n": "Indirect approach", "en": "Indirect approach", "by": "B. H. Liddell Hart", "y": "1954", "m": ["M8"], "r": ["S1-04", "S1-03", "S4-01"], "d": "Avoid the enemy's front, strike weak points from an unexpected direction, and win through psychological disruption.", "s": "Do not fight on the strong player's main battlefield; attack from customer segments, channels and business models the opponent is slow to respond to.", "c": "The opponent thinks the same way. An unexpected direction does not stay unexpected for long.", "ai": "Small customer segments that big players find hard to enter can be made profitable at AI's low servicing cost.", "ask": "Which customer segments do big players skip because they are unprofitable?"}, {"id": "S4-04", "n": "Tit for tat", "en": "Tit for tat", "by": "A. Rapoport (devised) / R. Axelrod (1984)", "y": "1980 / 1984", "m": ["M8"], "r": ["L4-09", "S4-06"], "d": "Cooperate first, then simply return the opponent's previous move. It scored highest in a round-robin tournament of the repeated prisoner's dilemma.", "s": "In long-term relationships with partners and competitors, cooperate by default, respond immediately to defection, and be quick to forgive.", "c": "In environments where misunderstandings and accidental errors occur, it falls into chains of retaliation. Variants with added generosity are stronger.", "ai": "In markets where AI reprices automatically, retaliation exchanges speed up and misreadings can trigger price collapses.", "ask": "How far will we automate our response to competitors' price cuts?"}, {"id": "S4-05", "n": "Strategic commitment", "en": "Strategic commitment", "by": "T. Schelling", "y": "1960", "m": ["M8", "M4"], "r": ["S4-04", "L2-05", "L2-07"], "d": "Change the opponent's behavior by deliberately reducing your own options and showing a stance of no retreat.", "s": "Deter competitor entry through large capital investment or public commitments. Internally too, a declaration burning the bridges speeds transformation.", "c": "If the opponent does not believe it, it is just a loss. You take on the risk of being unable to withdraw.", "ai": "Announcing large investment in an AI platform signals to competitors. But technology advances fast, and the loss from being unable to reverse swells.", "ask": "In which AI domains can we publicly commit to no turning back?"}, {"id": "S4-06", "n": "Co-opetition", "en": "Co-opetition", "by": "A. Brandenburger & B. Nalebuff", "y": "1996", "m": ["M8"], "r": ["L4-09", "S5-04", "S4-04"], "d": "Combine competition and cooperation. Capture relationships through a “value net” that includes other firms (complementors) that raise the value of our product.", "s": "Cooperate even with competitors on standard-setting, and compete after the market has grown. Make the pie bigger, then share it.", "c": "Without clarifying the scope of cooperation, you invite technology leakage and antitrust risk.", "ai": "There is room to pool data with competitors and grow a shared model. Data ownership can also become a source of conflict in cooperation.", "ask": "Where is the line between data we can share with competitors and data we cannot?"}, {"id": "S4-07", "n": "Principled negotiation", "en": "Principled negotiation", "by": "R. Fisher & W. Ury", "y": "1981", "m": ["M4", "M8"], "r": ["L2-04", "L2-02"], "d": "Focus on interests, not positions. Strengthening your best alternative to a negotiated agreement (BATNA) is the source of bargaining power.", "s": "Build out alternatives before negotiating. Also estimate the other side's BATNA.", "c": "Overestimating your own BATNA makes you miss agreements you should have closed.", "ai": "AI instantly organizes the counterparty's past terms and market rates, improving BATNA estimation accuracy. The other side has the same tool.", "ask": "If our current counterparty walks away, what is our next-best option?"}, {"id": "S4-08", "n": "Signaling", "en": "Signaling", "by": "M. Spence", "y": "1973", "m": ["M4", "M8"], "r": ["L4-07", "S4-05"], "d": "The informed party conveys its quality to the other side through actions that are costly to imitate (warranties, education, large investments).", "s": "Show confidence in quality in costly forms such as long warranties, pay for performance and publication of track records.", "c": "Low-cost signals can be copied by anyone and so are not trusted.", "ai": "Anyone can claim “AI-powered,” so it is not a quality signal. Third-party certification, published evaluation results and outcome-linked contracts become proof of trust.", "ask": "What is a way to show our quality that competitors cannot easily imitate?"}, {"id": "S4-09", "n": "Nonmarket strategy", "en": "Nonmarket strategy", "by": "D. Baron", "y": "1995", "m": ["M8"], "r": ["L5-10", "F5-18", "F3-10", "L5-16"], "d": "Act strategically not only on market competition but also on the environment outside the market: regulation, policy, public opinion and social evaluation.", "s": "Engage early in shaping regulation and lead the creation of industry self-regulatory rules. Design it together with market strategy.", "c": "Opaque lobbying creates reputational risk. Transparency is a prerequisite.", "ai": "In AI, regulation and guidelines are forming rapidly, and participation in rule-making shapes the terms of competition. Demonstrating governance practice externally is itself a nonmarket strategy.", "ask": "Who is engaged, and how, in AI-related rule-making that affects our business?"}, {"id": "S5-01", "n": "Platform strategy", "en": "Platform strategy", "by": "J. C. Rochet & J. Tirole (2003) / G. Parker et al. (2016)", "y": "2003 / 2016", "m": ["M1", "M2", "M8"], "r": ["L4-05", "F4-06", "S5-04"], "d": "Provide a venue connecting multiple user groups and amplify value through cross-group network effects.", "s": "Subsidize (make free) one side to attract users and earn revenue on the other. Solve the “chicken-and-egg” problem first.", "c": "Prone to winner-take-all and subject to regulatory and antitrust scrutiny.", "ai": "If agents become the interface between users and businesses, the advantage of platforms that own the screen risks being disintermediated.", "ask": "Why would we still be chosen with an agent in between?"}, {"id": "S5-02", "n": "Open innovation", "en": "Open innovation", "by": "H. Chesbrough", "y": "2003", "m": ["M7"], "r": ["S5-04", "L1-09"], "d": "Deliberately let knowledge and technology flow in and out of the firm to accelerate innovation.", "s": "Abandon the not-invented-here mindset and take in insights from startups, universities and customers. License out technology we do not use ourselves.", "c": "Without absorptive capacity on the receiving side, the ability to understand and use external knowledge, no results emerge.", "ai": "The bar to bringing in external models and technology has fallen. The receiving side's ability to evaluate lags, and selection tends to become the bottleneck.", "ask": "How many people in-house can judge whether to adopt external AI technology?"}, {"id": "S5-03", "n": "The Wide Lens", "en": "The Wide Lens", "by": "R. Adner", "y": "2012", "m": ["M3", "M8"], "r": ["L1-07", "S5-01"], "d": "Even if our product is superior, value does not reach customers unless complementary products are ready and distribution accepts it.", "s": "Identify the risk that complementors' development lags and the risk that each stage of distribution refuses adoption, and design the sequence in which the ecosystem comes together.", "c": "Struggles for ecosystem leadership can consume time and delay market entry.", "ai": "The value of AI depends on the readiness of complementary elements such as connections to existing systems and data preparation.", "ask": "What must other firms put in place for AI to deliver value?"}, {"id": "S5-04", "n": "Open and closed strategy", "en": "Open and closed strategy", "by": "Koichi Ogawa", "y": "2014", "m": ["M8"], "r": ["S5-01", "S4-06", "L5-07"], "d": "Standardize and open the domains you want to spread, and black-box and protect the core that is the source of revenue.", "s": "Design before the business starts the boundary between what to open to expand the market and where to earn.", "c": "Systematized from the reflection that Japanese firms “won on technology but lost on business.” Misdesigning the boundary leaks value.", "ai": "Published standards and APIs are easily read and reproduced by AI. The scope of the core to keep closed must be redrawn.", "ask": "Where is our revenue source that stays protected even if AI reads it?", "wl": "ja"}, {"id": "S5-05", "n": "Make or buy", "en": "Make or buy", "by": "R. Coase (1937) / O. Williamson (1975)", "y": "1937 / 1975", "m": ["M3", "M7"], "r": ["S2-01", "L4-06", "F3-01"], "d": "Activities with high transaction costs (requiring firm-specific assets, high uncertainty) are done in-house; those with low costs are sourced from the market.", "s": "Decide what to own and what to outsource by the size of transaction costs. The optimal answer changes as technology matures.", "c": "As industries evolve, integration and specialization swing like a pendulum.", "ai": "Foundation models are sourced externally by default. Layers closely tied to our data and operations are pressed to be built in-house to avoid dependence.", "ask": "Which AI functions can't be switched out and should be built in-house?"}, {"id": "S5-06", "n": "Aggregation theory", "en": "Aggregation theory", "by": "B. Thompson", "y": "2015", "m": ["M1", "M2"], "r": ["S5-01", "L4-05", "L4-15"], "d": "On the internet, distribution and transaction costs approach zero, and whoever bundles the user experience (the aggregator), not the supplier, holds market power.", "s": "Power comes from owning the direct touchpoint and experience with users rather than owning supply. Suppliers manage their dependence on aggregators.", "c": "Regulation and supplier solidarity can constrain aggregators' power.", "ai": "If AI assistants become the users' entry point, they could become new aggregators replacing search and comparison sites. Design how we get chosen through AI.", "ask": "Who controls the entry point through which customers find us?"}, {"id": "S6-01", "n": "Focus and selection", "en": "Focus and selection", "by": "J. Welch", "y": "1981", "m": ["M1", "M3"], "r": ["L1-01", "F4-02", "S6-02"], "d": "Concentrate resources on businesses that can be No. 1 or No. 2 in their industry, and for the rest choose among fixing, selling or closing.", "s": "Stop spreading resources thinly and concentrate investment on winnable businesses.", "c": "Taken too far, it cuts off future options. In Japan it was often used as a pretext for headcount cuts.", "ai": "AI changes each business's fixed-cost structure, so the No. 1 or No. 2 criterion itself must be recalculated.", "ask": "Which of our businesses stop being profitable if we assume AI?"}, {"id": "S6-02", "n": "Barbell strategy", "en": "Barbell strategy", "by": "N. Taleb", "y": "2007 / 2012", "m": ["M4", "M1"], "r": ["L1-02", "S6-03", "S6-01"], "d": "Put most resources in an extremely safe area and a small part in high-risk areas with large upside, avoiding the half-hearted middle.", "s": "While protecting stable earnings from the core business, place many small bets to aim for a large upside.", "c": "It is essential to verify that the “safe side” is truly safe.", "ai": "Place core-business automation on the safe side, and for exploration run many small experiments and select the winners.", "ask": "How many small AI bets will we place, at an amount we can afford to lose?"}, {"id": "S6-03", "n": "Real options", "en": "Real options", "by": "S. Myers (1977) / R. McGrath & I. MacMillan (1995)", "y": "1977 / 1995", "m": ["M4", "M5"], "r": ["L2-05", "S3-03", "F6-06"], "d": "Treat uncertain investments as an option: start small, learn, and expand or withdraw depending on results.", "s": "Invest in new businesses stage by stage and decide the next investment by the results of testing each stage's hypotheses (discovery-driven planning).", "c": "If withdrawal is not actually executed, you just keep making small investments (sunk-cost effect).", "ai": "Prototyping costs fall, so stages for starting small can be cut finer. Without exit criteria decided in advance, experiments never end.", "ask": "Have we set numeric conditions for stopping the PoC before starting?"}, {"id": "S6-04", "n": "Related diversification", "en": "Related diversification", "by": "R. Rumelt", "y": "1974", "m": ["M7"], "r": ["L4-03", "S2-02", "F4-01"], "d": "Diversification into fields linked by common resources, technology or markets tends to yield higher performance than unrelated diversification.", "s": "Make “does our core resource come into play?” the criterion for choosing new businesses.", "c": "If “related” is vaguely defined, any business can be called related.", "ai": "Common data and foundation models make links between businesses easier to see, widening what counts as related.", "ask": "Which adjacent businesses can make use of our existing data?"}, {"id": "S6-05", "n": "70-20-10 rule", "en": "70-20-10 rule", "by": "B. Nagji & G. Tuff", "y": "2012", "m": ["M4", "M5"], "r": ["F4-03", "S2-04", "S6-02"], "d": "Allocate innovation investment roughly 70% to improving the core, 20% to adjacent areas and 10% to transformational new areas.", "s": "Make the allocation explicit and prevent bias toward the core. Adjust the ratio to the industry and growth stage.", "c": "The ratios are a guide. The authors themselves say the optimal allocation differs by industry.", "ai": "Split AI investment too into budgets for efficiency in existing operations (core), adjacent services and AI-native new businesses. Focusing on efficiency alone forgoes growth opportunities.", "ask": "What percentage of our AI budget goes to things other than efficiency?"}, {"id": "S6-06", "n": "Best-owner principle", "en": "Best-owner principle", "by": "T. Koller et al. (McKinsey, Valuation) / METI (Japan), Practical Guidelines for Business Restructuring", "y": "2010s / 2020", "m": ["M7"], "r": ["S6-01", "S6-04", "L2-19"], "d": "A business is valued most highly under the owner who can extract the most value from it.", "s": "Periodically review the business portfolio by whether we are the best owner of each business, and consider selling or carving out those where we are not.", "c": "Best-owner judgments are prone to overestimating synergies.", "ai": "As AI advances standardization and integration of operations, the sources of synergy between businesses change. Whether a common AI platform can be leveraged becomes a new best-owner criterion.", "ask": "Is there another owner who could extract more value from this business than we can?"}, {"id": "F1-01", "n": "MECE principle", "en": "MECE principle", "by": "B. Minto (McKinsey)", "y": "1960s", "m": ["M6"], "r": ["F1-02", "F1-03"], "d": "A classification principle of dividing “without omission or overlap.”", "s": "Cover issues and options exhaustively and prevent duplication and oversights in discussion. This material's classification is also designed on this principle.", "c": "There are countless MECE ways to divide. The essence is choosing the cut that matters for the decision.", "ai": "Have generative AI list the issues and check for gaps and overlaps. People decide which cut to divide by.", "ask": "For this decision, which cut would change our moves?"}, {"id": "F1-02", "n": "Issue tree", "en": "Issue tree", "by": "Consulting practice", "y": "—", "m": ["M6"], "r": ["F1-01", "F5-03", "F1-07"], "d": "Decompose a problem MECE-ly into a hierarchy of causes, solutions and issues.", "s": "Break a big question down to a size that research can answer.", "c": "Decomposition tends to become an end in itself. Use it together with prioritization.", "ai": "Have AI propose several ways to split the first level and compare them. Verify with front-line knowledge whether the depth of decomposition is appropriate.", "ask": "For whom, to decide what, and by when, is the initial question?"}, {"id": "F1-03", "n": "Pyramid principle", "en": "Pyramid principle", "by": "B. Minto", "y": "1970s", "m": ["M6"], "r": ["F1-04", "F1-01"], "d": "Place the conclusion at the apex and communicate by layering the supporting grounds below it.", "s": "Start executive reports with the conclusion. Make the elements at each level MECE.", "c": "It is a form for the communicating stage, not the stage of exploring ideas.", "ai": "When AI summarizes, conclusions tend to get rounded off. People should sharpen the top-level message.", "ask": "In one sentence, what conclusion do we want approved at the executive meeting?"}, {"id": "F1-04", "n": "So What / Why So", "en": "So What / Why So", "by": "Hanako Teruya & Keiko Okada", "y": "2001", "m": ["M6"], "r": ["F1-03", "F3-04"], "d": "A back-and-forth of drawing out “so what can we say” from information and checking “why can we say so” against the conclusion.", "s": "Convert a list of analysis results into implications and actions.", "c": "Framework analysis that skips So What? ends as “mere organizing.”", "ai": "AI is good at summarizing, but its implications tend to drift into generalities. People must sharpen the So What? specific to our firm.", "ask": "Seeing this analysis, what will executives change tomorrow?", "wl": "ja", "wq": "ロジカル・シンキング"}, {"id": "F1-05", "n": "Hypothesis-driven thinking", "en": "Hypothesis-driven thinking", "by": "Kazunari Uchida (2006) / Kazuto Ataka (2010)", "y": "2006 / 2010", "m": ["M6"], "r": ["L2-03", "S3-03", "L2-01"], "d": "Put a tentative answer in place before gathering all information, and revise it as you test. Start by identifying the question that actually needs answering (the issue).", "s": "Reduce the volume of research and analysis and shorten the time to decision.", "c": "It is two sides of the same coin as confirmation bias (L2-03). A willingness to look for disconfirming evidence is a prerequisite.", "ai": "You can speed up verification by generating many hypotheses. AI hypotheses look plausible, so you need to design disconfirmation.", "ask": "What data would show this hypothesis is wrong?", "wl": "ja", "wq": "仮説思考"}, {"id": "F1-06", "n": "First principles thinking", "en": "First principles thinking", "by": "Aristotle (origin) / E. Musk (popularization)", "y": "—", "m": ["M3"], "r": ["S1-02", "L1-07"], "d": "Set aside convention and analogy and rethink from facts that cannot be broken down further.", "s": "Question the cost structures and constraints the industry takes for granted, and redesign from the ground up.", "c": "It takes time. Using it for every decision slows decision-making.", "ai": "AI output gravitates toward the average of existing conventional wisdom. Use it as a counterpart for questioning the basis of costs down to the level of contracts and physics.", "ask": "Which constraints taken for granted in this industry has no one verified?"}, {"id": "F1-07", "n": "Five Ws", "en": "Five Ws", "by": "Origin in classical rhetoric / basic principle of journalism", "y": "—", "m": ["M6"], "r": ["F1-01", "F1-02"], "d": "Structure an event through six questions: who, what, when, where, why and how.", "s": "The first step in organizing background, purpose and issues. This material's “guide by question” is also structured with this framework.", "c": "Filling in the elements alone yields no implications. Dig deeper into “why.”", "ai": "Use it to organize the background for AI adoption. Always include in Who the person accountable for AI output.", "ask": "Who gives the final check on AI output and is accountable for the result?"}, {"id": "F1-08", "n": "Fermi estimation", "en": "Fermi estimation", "by": "E. Fermi", "y": "1940s", "m": ["M6"], "r": ["F1-02", "F6-10"], "d": "Break a quantity you cannot know directly into a product of known factors and produce a rough estimate that gets the order of magnitude right.", "s": "Quickly estimate market size or the scale of an effect to start the discussion. Before precise research, judge whether it is worth examining.", "c": "The answer changes greatly with the structure of decomposition and how assumptions are set. State assumptions explicitly and test sensitivity.", "ai": "Asking AI for a rough estimate may return plausible numbers without basis. People should design the decomposition formula and assumptions and verify the source of each factor's figure.", "ask": "Into what product can that number be decomposed, and which assumption matters most?"}, {"id": "F1-09", "n": "Zero-based thinking", "en": "Zero-based thinking", "by": "Practice (zero-based budgeting: P. Pyhrr)", "y": "1970", "m": ["M3"], "r": ["F1-06", "L2-06"], "d": "Set aside existing assumptions and frameworks and think about the optimal form from a blank sheet.", "s": "Question from zero the necessity of year-over-year budgets and customary tasks, and rebuild them.", "c": "Thinking everything from zero is inefficient. Use it on a narrowed scope of review.", "ai": "With AI as a premise, the value of redesigning work from scratch rises. Do not stop at retrofitting AI onto existing work; compare against a design made from zero.", "ask": "If we built this work from scratch today, would we choose its current form?"}, {"id": "F1-10", "n": "Inversion", "en": "Inversion", "by": "C. Jacobi (mathematics) / C. Munger (investing)", "y": "19th century / 1980s–", "m": ["M4"], "r": ["F6-05", "F6-14"], "d": "Think first about “how would we be sure to fail” and build the plan to avoid those conditions.", "s": "Listing the conditions for failure clarifies overlooked risks and things you must not do.", "c": "Avoiding failure alone does not produce success. Combine it with offensive moves.", "ai": "Listing first the ways to guarantee AI adoption fails (no evaluation, no front-line involvement, no controls) reveals holes in the plan.", "ask": "What would we do to make this project certain to fail?"}, {"id": "F1-11", "n": "Systems thinking", "en": "Systems thinking", "by": "J. Forrester / P. Senge", "y": "1990", "m": ["M2"], "r": ["L1-06", "L5-11"], "d": "Connect causal relationships between elements with arrows and diagram reinforcing and balancing loops and time delays to understand problems from their structure.", "s": "Find structures in which symptomatic fixes backfire (shifting the burden, limits to success, etc.) and look for effective leverage points.", "c": "Drawing the diagram tends to become an end in itself. Reduce it to testable hypotheses.", "ai": "Drawing the effects and side effects of AI adoption as loops (more use → higher cost, automation → skill decline) lets you discuss secondary impacts in advance.", "ask": "If this initiative works, what happens, and how does it feed back into the original problem?"}, {"id": "F1-12", "n": "Ghost deck", "en": "Ghost deck", "by": "Consulting practice", "y": "—", "m": ["M6"], "r": ["F1-03", "F1-05", "L2-03"], "d": "Before starting research, first create only the conclusion (message) and chart shape for each page of the final report.", "s": "It shows which analyses are needed and which are not, focusing the work. It lets you align early with stakeholders on the hypothesized conclusion.", "c": "There is a danger of fitting the analysis to the conclusion drafted first (confirmation bias L2-03). If disconfirming evidence appears, rebuild.", "ai": "The faster AI makes analysis and document creation, the more the design of what to create determines quality. Use the ghost deck as a work instruction for AI.", "ask": "What is the hypothesized conclusion for page one of the final report?"}, {"id": "F2-01", "n": "PEST analysis", "en": "PEST analysis", "by": "F. Aguilar", "y": "1967", "m": ["M5"], "r": ["F2-04", "F3-04"], "d": "Identify changes in the macro environment through the lenses of politics, economy, society and technology (plus law and environment).", "s": "Capture medium- to long-term changes the company cannot control and convert them into opportunities and threats.", "c": "Easily ends as a mere list of items. Prioritize by magnitude of impact on the company and timing.", "ai": "AI accelerates the collection of regulatory and technology trends. AI regulation varies widely by region, so checking the freshness of information is essential.", "ask": "Which external changes could shape the company's use of AI over the next three years?"}, {"id": "F2-02", "n": "Porter's five forces", "en": "Porter's five forces", "by": "M. Porter", "y": "1979", "m": ["M8"], "r": ["S1-01", "L4-10", "F2-03"], "d": "Explains industry profitability through five forces: existing rivals, new entrants, substitutes, buyers and suppliers.", "s": "Judge whether an industry is worth entering and which forces to weaken so that profit remains.", "c": "A static analysis. Struggles to capture complementors, ecosystems and rapid technological change.", "ai": "Buyers use AI in-house, and substitutes and new entrants multiply. Revisit the analysis on the premise that industry structure itself is shifting.", "ask": "If customers start using AI themselves, what value remains with us?"}, {"id": "F2-03", "n": "3C analysis", "en": "3C analysis", "by": "Kenichi Ohmae", "y": "1975", "m": ["M8"], "r": ["F2-02", "S4-01", "F3-02"], "d": "Derive key success factors (KSF) from three perspectives: customer, competitor and company.", "s": "The first diagnostic of business strategy. Look for the winning space where customers want something, the company can deliver it and competitors cannot.", "c": "Sometimes extended by adding co-operators and others.", "ai": "AI can broaden the gathering of customer and competitor information. Also check whether the criteria customers value will themselves change in the AI era.", "ask": "Even if AI becomes widespread, will the reasons customers choose us stay the same?", "wl": "ja", "wq": "3C分析"}, {"id": "F2-04", "n": "Scenario planning", "en": "Scenario planning", "by": "P. Wack (Royal Dutch Shell)", "y": "1970s", "m": ["M4", "M5"], "r": ["L1-02", "F2-01", "F6-07"], "d": "Draw multiple pictures of the future along highly uncertain factors, and prepare strategies that work in any future plus signals that indicate which way the future is branching.", "s": "In domains where forecasts fail, shake decision-makers' assumptions. Known for preparing Shell for the oil crisis.", "c": "Treating scenarios as “forecasts” defeats their purpose.", "ai": "Have AI generate scenario drafts in volume, while humans focus on selecting the axes and designing signals. Make the pace of AI progress one of the axes.", "ask": "If you had to name two uncertainties that most divide the future, what would they be?"}, {"id": "F2-05", "n": "Jobs to be done", "en": "Jobs to be done", "by": "C. Christensen et al.", "y": "2016", "m": ["M7"], "r": ["F4-04", "F2-06"], "d": "Customers do not buy the product itself. They “hire” a product for a job they want done in a given situation.", "s": "Understand customers by situation and the desire to “make progress” rather than by attributes such as age or industry, and reassess who the real competitors are.", "c": "If the job is defined too abstractly, it does not translate into concrete actions.", "ai": "Use AI to analyze inquiry logs and customer voices to surface candidate jobs. Also ask which jobs AI will take over.", "ask": "In what situation, and to get what done, do customers use our product?"}, {"id": "F2-06", "n": "Customer journey map", "en": "Customer journey map", "by": "Developed in the field of service design", "y": "—", "m": ["M7"], "r": ["F2-05", "L3-04"], "d": "Visualize customer actions, thoughts and emotions chronologically, from awareness through purchase and use to recommendation.", "s": "Find the points where the experience breaks (pain points) and inconsistencies caused by departmental silos.", "c": "Tends to end with drawing an ideal journey. Back it up with behavioral data and interviews.", "ai": "AI can analyze behavior logs and simulate experiences by persona. Introducing AI at touchpoints shifts where the experience breaks.", "ask": "At which touchpoint in the journey do customers drop off?"}, {"id": "F2-07", "n": "Kano model", "en": "Kano model", "by": "Noriaki Kano", "y": "1984", "m": ["M1", "M5"], "r": ["S1-02", "F4-07"], "d": "Classify quality elements into must-be quality, one-dimensional quality, attractive quality and others, and show the relationship between fulfillment and satisfaction.", "s": "Meeting must-be quality does not raise satisfaction, but lacking it causes major dissatisfaction. Use it to prioritize feature investment.", "c": "Attractive quality turns into must-be quality over time.", "ai": "AI features are attractive quality only right after launch and soon become must-be quality. Decide investments assuming rapid obsolescence.", "ask": "If competitors add the same AI feature, how will customers' evaluation change?"}, {"id": "F2-08", "n": "Porter's diamond", "en": "Porter's diamond", "by": "M. Porter", "y": "1990", "m": ["M7"], "r": ["F2-02", "F2-01"], "d": "Explains the competitiveness of a nation's or region's industry through the interaction of four elements: factor conditions, demand conditions, related industries, and firm strategy and rivalry.", "s": "Use for evaluating site locations, participation in industry clusters and policy.", "c": "The roles of government and chance are treated as auxiliary factors.", "ai": "The competitiveness of the AI industry is determined by the combination of compute, power, talent, data and the regulatory environment. Can also inform decisions on locating AI hubs.", "ask": "Which regions have all the elements this business needs (talent, power, demand, related firms)?"}, {"id": "F2-09", "n": "Wardley mapping", "en": "Wardley mapping", "by": "S. Wardley", "y": "2005〜", "m": ["M5", "M3"], "r": ["L4-14", "S5-05", "L4-13"], "d": "Starting from customer needs, stack the supporting components vertically and place each component's stage of evolution (genesis → custom-built → product → commodity) on the horizontal axis to form a map.", "s": "Decide which components to build in-house and which to procure as commodity services. Read evolutionary movements competitors have overlooked.", "c": "Judging the stage of evolution involves subjectivity. Draw the map with several people and discuss it.", "ai": "Mapping the stage of AI components (compute, foundation models, search, business applications) reveals which parts to build in-house and which to use as commodities.", "ask": "Among the components supporting this business, are we building in-house any that have already become commodities?"}, {"id": "F2-10", "n": "Purchase funnel", "en": "Purchase funnel", "by": "E. S. Lewis (AIDA) / S. R. Hall (AIDMA) / Dentsu (AISAS)", "y": "1898〜2004", "m": ["M6"], "r": ["F5-09", "F4-04", "S5-06"], "d": "Divide the customer's psychology and behavior from awareness to purchase into stages. AISAS is the internet-era model that adds search and share.", "s": "Identify at which stage customers drop off, and assign actions and metrics to each stage.", "c": "Actual purchasing does not progress linearly. The order of stages differs by product and customer.", "ai": "When customers ask AI assistants for comparisons and recommendations, the search stage is replaced by dialogue with AI. Designing information so that AI recommends us becomes a new challenge.", "ask": "When customers compare options including us, whom (or what) do they consult first?"}, {"id": "F3-01", "n": "Value chain", "en": "Value chain", "by": "M. Porter", "y": "1985", "m": ["M3"], "r": ["S5-05", "S2-05"], "d": "Divide a firm's activities into primary and support activities and analyze where value and cost arise.", "s": "Identify activities to strengthen, outsource and digitize. Can also be used to identify target processes for AI adoption.", "c": "The structure presumes manufacturing and does not fit platform-type businesses.", "ai": "Assess the scope for applying AI to each activity by frequency, routineness and tolerance for error. Look not only at individual processes but at redesigning the whole.", "ask": "Which process consumes the most labor and time?"}, {"id": "F3-02", "n": "VRIO framework", "en": "VRIO framework", "by": "J. Barney", "y": "1991/1995", "m": ["M7"], "r": ["S2-01", "S2-02"], "d": "Evaluate resources through four questions: value, rarity, inimitability and organization (the structure to exploit them).", "s": "Identify resources that can be sources of sustainable competitive advantage and choose what to protect and cultivate.", "c": "Firms tend to rate themselves leniently. Verify from the customer's and competitors' perspectives.", "ai": "Since anyone can procure the model itself, rarity is hard to create. Ask whether proprietary data and the organization to exploit it can become the resource.", "ask": "Even if competitors use the same AI, which resources can only we hold?"}, {"id": "F3-03", "n": "McKinsey 7S framework", "en": "McKinsey 7S framework", "by": "R. Waterman, T. Peters & J. Phillips", "y": "1980", "m": ["M7"], "r": ["L3-10", "F5-07", "L3-04"], "d": "Diagnose the alignment of strategy, structure and systems (the hard 3S) with shared values, style, staff and skills (the soft 4S).", "s": "Find the cause of stalled change in misalignment of values and skills, not in the organization chart.", "c": "Shows how well the seven elements are aligned, but not in what order they should be changed.", "ai": "Stalled AI adoption tends to stem from misalignment of skills and values rather than technology. Diagnose with the 7S.", "ask": "What is the biggest barrier to AI use: systems, people or values?"}, {"id": "F3-04", "n": "SWOT analysis", "en": "SWOT analysis", "by": "Developed in U.S. management education in the 1960s (origin disputed) / H. Weihrich (1982, TOWS)", "y": "1960s/1982", "m": ["M7"], "r": ["F2-01", "F3-02", "F1-04"], "d": "Organize strengths, weaknesses, opportunities and threats, then cross them to derive strategic options.", "s": "Integrate the results of external and internal analysis and generate strategic options comprehensively.", "c": "Tends to stop at organizing and fails to prioritize. The same fact can be both a strength and a weakness.", "ai": "AI speeds up listing the elements. Humans handle the steps of crossing them into actions and prioritizing.", "ask": "If you had to narrow it to one, which opportunity would this strength serve best?"}, {"id": "F3-05", "n": "DuPont analysis", "en": "DuPont analysis", "by": "F. D. Brown (DuPont)", "y": "1910s", "m": ["M3"], "r": ["F5-03", "L1-07"], "d": "Decompose ROE (return on equity) into net profit margin × total asset turnover × financial leverage.", "s": "Identify which element drives profitability differences and narrow down the actions. Also the prototype of the KPI tree.", "c": "Limited to decomposing financial metrics; non-financial factors such as brand and talent are invisible.", "ai": "Decide first where AI investment should show up, in margin or turnover. Do not measure by cost reduction alone.", "ask": "Which element of ROE is the AI investment meant to move?"}, {"id": "F3-06", "n": "Benchmarking", "en": "Benchmarking", "by": "R. Camp (Xerox)", "y": "1989", "m": ["M7"], "r": ["S2-05", "L1-17"], "d": "Compare the company against the best practices inside and outside the industry using metrics, analyze the causes of gaps and adopt them.", "s": "Grasp the company's level objectively and set improvement targets. Learn also from outstanding cases outside the industry.", "c": "Other firms' practices do not work unless they fit the company's own system of activities (S2-05). Beware of differences in definitions when comparing numbers.", "ai": "Benchmark AI use against others by business outcomes (processing time, quality) rather than usage rates. Without aligned definitions and populations, the comparison is meaningless.", "ask": "Are the definitions, populations and periods of the competitors' figures we are comparing aligned with ours?"}, {"id": "F3-07", "n": "Unit economics", "en": "Unit economics", "by": "SaaS and startup practice", "y": "2010s", "m": ["M3"], "r": ["F3-08", "F5-09", "L4-17"], "d": "Compare per-customer lifetime value (LTV) with acquisition cost (CAC) to judge whether the business becomes profitable as it scales.", "s": "Examine how many times LTV exceeds CAC and in how many months CAC is recovered, by customer segment and channel. An LTV/CAC of 3x or more is often cited as a benchmark.", "c": "LTV depends heavily on churn assumptions and tends to be optimistic.", "ai": "AI services carry inference costs that scale with usage, so gross margin can be lower than for traditional SaaS. Calculate LTV on gross profit.", "ask": "How many times acquisition cost is the gross-profit-based LTV per customer?"}, {"id": "F3-08", "n": "Rule of 40", "en": "Rule of 40", "by": "B. Feld et al.", "y": "2015", "m": ["M4"], "r": ["F3-07", "F6-09"], "d": "Judge the health of a software company by whether the sum of revenue growth rate and profit margin (often operating cash flow margin or EBITDA margin) exceeds 40%.", "s": "Compare growth versus profitability priorities with a single metric and use it as a guide for investment decisions.", "c": "Profit margin definitions differ by company, so they must be aligned for comparison. Also consider differences in growth stage.", "ai": "AI companies' margins are easily squeezed by inference costs. Look not only at growth rate but at whether gross margin improves as scale expands.", "ask": "What is the sum of growth rate and profit margin for our company (or portfolio company), and which one is it earning on?"}, {"id": "F3-09", "n": "AI maturity model", "en": "AI maturity model", "by": "Staged model used in AI adoption practice", "y": "—", "m": ["M5"], "r": ["F4-10", "F5-13", "L5-04", "L6-13"], "d": "Diagnose an organization's AI use by stage: individual experimentation → departmental validation (PoC) → embedding in operations → company-wide platform → redesign of work premised on AI.", "s": "Discuss only the current stage and the next one. Plans that skip stages tend to fail.", "c": "Stage definitions differ by institution. Use it to discuss the conditions for advancing rather than to compare numbers.", "ai": "Many companies stall between individual experimentation and departmental PoC. Make explicit the conditions for advancing (evaluation, data, controls, budget) and build them into the plan.", "ask": "Which stage are we at, and what conditions are missing for us to advance to the next?"}, {"id": "F3-10", "n": "Risk-based classification", "en": "Risk-based classification", "by": "European Union (AI Act)", "y": "2024", "m": ["M4"], "r": ["F5-18", "F5-15", "S4-09"], "d": "Classify AI uses into four tiers (prohibited, high-risk, limited-risk, minimal-risk) and impose obligations according to risk.", "s": "Classify the company's AI uses by impact; require final human judgment and records for high-risk uses (HR, credit, healthcare, etc.) and prioritize speed for low-risk ones.", "c": "The AI Act entered into force in August 2024, and its obligations apply in phases. Implementation timing and detailed rules continue to be revised, so check the latest text and operational guidance.", "ai": "Even firms with no business in the EU are expected to follow the same risk-based approach, through client requirements and Japan's AI business guidelines.", "ask": "Which of our AI uses affect people's rights or important decisions?"}, {"id": "F3-11", "n": "OWASP Top 10 for LLM Applications", "en": "OWASP Top 10 for LLM Applications", "by": "OWASP", "y": "2023〜", "m": ["M4"], "r": ["L1-12", "F6-14", "F5-15"], "d": "A list organizing the main vulnerabilities of applications using large language models (prompt injection, leakage of sensitive information, excessive agency, etc.) into 10 items.", "s": "Use as a checklist for design reviews and testing of AI apps. Layer it on top of conventional security reviews.", "c": "Items are revised with each edition. Refer to the latest version.", "ai": "In designs where agents read external documents or emails, indirect prompt injection is the biggest threat. Combine least privilege with human approval.", "ask": "What happens if malicious instructions are mixed into external data the AI reads?"}, {"id": "F4-01", "n": "Ansoff matrix", "en": "Ansoff matrix", "by": "H. I. Ansoff", "y": "1957", "m": ["M4"], "r": ["S6-04", "F4-03"], "d": "Organize four growth directions (market penetration, market development, product development, diversification) by combining product (existing/new) and market (existing/new).", "s": "Cover the options for growth comprehensively and compare the level of risk of each (diversification is the highest).", "c": "It only organizes the options; which to choose depends on the company's resources (S6-04).", "ai": "AI lowers the barrier to taking existing products into new markets. Reassess whether proposals that look like diversification are actually low-risk.", "ask": "Which markets can we newly target now that AI has lowered the barriers?"}, {"id": "F4-02", "n": "Growth-share matrix", "en": "Growth-share matrix", "by": "B. Henderson (BCG)", "y": "1970", "m": ["M1"], "r": ["L4-04", "S6-01"], "d": "Classify businesses as “stars, cash cows, question marks, dogs” by market growth rate and relative market share, and decide capital allocation.", "s": "A common language for company-wide resource allocation: channel the cash generated by cash cows into nurturing question marks.", "c": "Presumes the experience curve. Misleads in industries where share and profitability are not linked.", "ai": "Add the degree of AI substitution to each business and check whether a cash cow could decline suddenly.", "ask": "How might our main earner change under AI substitution?"}, {"id": "F4-03", "n": "Three horizons", "en": "Three horizons", "by": "M. Baghai, S. Coley & D. White (McKinsey)", "y": "1999", "m": ["M5"], "r": ["S2-04", "S6-02", "L5-05"], "d": "Manage simultaneously the strengthening of the core business (H1), expansion of growth businesses (H2) and creation of future options (H3).", "s": "Do not evaluate investments with different time horizons on a single yardstick. Separate metrics and budgets by horizon.", "c": "H3 tends to be treated forever as a budget leftover.", "ai": "Divide AI initiatives into H1 efficiency, H2 new services and H3 exploration, and manage metrics and budgets separately.", "ask": "Is the share of AI-related investment going to H3 at the intended level?"}, {"id": "F4-04", "n": "Segmentation, targeting, positioning", "en": "Segmentation, targeting, positioning", "by": "W. Smith (1956) / P. Kotler", "y": "1956", "m": ["M7"], "r": ["F2-05", "F4-05", "S1-05"], "d": "Segment the market, decide the target customer segments and define a distinctive position against competitors.", "s": "Choose the segments you can win rather than trying to sell to everyone. It is the premise of marketing actions (4P).", "c": "Segmentation by attributes struggles to capture reasons for purchase (complement with jobs-to-be-done).", "ai": "AI can segment customers finely, but targeting everyone after segmenting still fails. Humans decide which segments to narrow down to.", "ask": "For which customer segment can we say with confidence that we beat competitors?"}, {"id": "F4-05", "n": "Marketing mix", "en": "Marketing mix", "by": "E. J. McCarthy (1960) / R. Lauterborn (1990)", "y": "1960/1990", "m": ["M7"], "r": ["F4-04"], "d": "Design product, price, place and promotion (the seller's view) paired with customer value, customer cost, convenience and communication (the customer's view).", "s": "Check the consistency of actions. Prevents discussions of price alone or promotion alone.", "c": "In services, the 7Ps are used, adding people, process and physical evidence.", "ai": "AI can handle individually optimized pricing and mass generation of promotional copy. Humans check consistency across actions.", "ask": "Are the price, promotion and distribution actions aimed at the same customer image?"}, {"id": "F4-06", "n": "Business model canvas", "en": "Business model canvas", "by": "A. Osterwalder & Y. Pigneur", "y": "2010", "m": ["M7"], "r": ["S5-01", "S3-03"], "d": "Draw the whole picture of a business on one page with nine elements: customers, value proposition, channels, customer relationships, revenue streams, key resources, activities and partners, and cost structure.", "s": "Quickly sketch hypotheses for a new business and discuss the consistency among elements.", "c": "Cannot express comparison with competitors or change over time.", "ai": "In AI businesses, inference costs enter the cost structure and customer relationships change through learning. Redraw these two points.", "ask": "In this business, what is the mechanism by which customers pay us?"}, {"id": "F4-07", "n": "Strategy canvas", "en": "Strategy canvas", "by": "W. C. Kim & R. Mauborgne", "y": "2005", "m": ["M8"], "r": ["S1-02", "L4-08", "F2-07"], "d": "Plot the company's and competitors' levels on each competitive factor of the industry as a line, and create a new value curve by “eliminate, reduce, raise, create.”", "s": "In an industry where offerings have homogenized, generate ideas that achieve differentiation and low cost at the same time.", "c": "The conclusion changes depending on which competitive factors are chosen. Choose factors from the customer's perspective.", "ai": "AI adoption raises the level of the industry's competitive factors across the board. Decide what to reduce and eliminate, and draw a new curve.", "ask": "Which factors is the industry investing in that customers do not value?"}, {"id": "F4-08", "n": "Playing to Win", "en": "Playing to Win", "by": "A. G. Lafley & R. Martin", "y": "2013", "m": ["M7"], "r": ["S3-05", "S1-01", "F5-02"], "d": "Keep five questions consistent from top to bottom: what is the winning aspiration → where to play → how to win → what capabilities are needed → what management systems.", "s": "Define strategy not as a “plan document” but as a “chain of choices,” aligning higher-level and lower-level choices.", "c": "If choices are avoided, each tier ends up filled with abstract wishes.", "ai": "Choose where to use AI by working backward from the way to win. For the capabilities tier, ask about data and talent.", "ask": "What would it mean for us to win, in terms of what has changed in three years?"}, {"id": "F4-09", "n": "The kernel of good strategy", "en": "The kernel of good strategy", "by": "R. Rumelt", "y": "2011", "m": ["M3"], "r": ["F4-08", "F1-05", "S2-05", "F1-09"], "d": "Good strategy consists of three elements: a diagnosis of the situation, a guiding policy and coherent action. A list of goals or fine rhetoric is not strategy.", "s": "Check a strategy draft: does it diagnose the biggest challenge, does the policy involve choices, and are the actions coherent with one another?", "c": "If the diagnosis is wrong, everything after it is wrong. Ground the basis of the diagnosis in facts.", "ai": "“Use AI” is a goal, not a strategy. Start with a diagnosis of the biggest challenge to be solved with AI.", "ask": "What challenge diagnosis is this strategy based on, and what has it decided not to do?"}, {"id": "F4-10", "n": "Use-case prioritization matrix", "en": "Use-case prioritization matrix", "by": "AI adoption practice (impact × feasibility)", "y": "—", "m": ["M3", "M4"], "r": ["F3-09", "F6-12", "L6-05"], "d": "Evaluate AI use cases on two axes, business impact (revenue, cost, risk) and feasibility (data readiness, technology maturity, difficulty of changing operations), and decide the order of starting.", "s": "Start with those that have high impact and are easy; prepare those with high impact but difficult as the main bets to tackle after the foundation is built.", "c": "Impact estimates tend to be optimistic. Measure pre-adoption workload (volume, time, error rate) before evaluating.", "ai": "Evaluations tend to be inflated by the impression of technical demos. Reflect the results of small-scale validation on real data in the feasibility assessment.", "ask": "Have we measured this use case's pre-adoption workload in volume and time?"}, {"id": "F4-11", "n": "AI solution selection tree", "en": "AI solution selection tree", "by": "AI architecture practice", "y": "—", "m": ["M3"], "r": ["L6-07", "L6-14", "L1-11"], "d": "Consider from the simplest approach upward: prompt → retrieval-augmented generation (RAG) → tool use → workflow → agent → additional training (fine-tuning).", "s": "Choose RAG if knowledge lookup is needed, workflow for operations with fixed procedures, and agents only when dynamic judgment is truly required. Do not move on if an earlier approach suffices.", "c": "The higher the autonomy, the greater the burden of evaluation, debugging, cost and the blast radius of failure.", "ai": "A typical failure is deciding on the latest techniques (such as multi-agent) before the requirements. Unless it can be shown to be impossible without an agent, build it as a workflow.", "ask": "Can this requirement truly not be met without an agent?"}, {"id": "F4-12", "n": "Value proposition canvas", "en": "Value proposition canvas", "by": "A. Osterwalder et al.", "y": "2014", "m": ["M7"], "r": ["F4-06", "F2-05"], "d": "Place the customer's jobs, pains and gains on one side and the company's products, pain relievers and gain creators on the other, and check the fit.", "s": "Map product features to customer pains and gains, and cut features that have no match.", "c": "The customer side tends to be filled with imagination. Verify through interviews.", "ai": "Planning AI features tends to start from “what it can do.” Start from the customer's pains and look for what only AI can solve.", "ask": "Which customer pain does this feature relieve, and which gain does it create?"}, {"id": "F4-13", "n": "Positioning statement", "en": "Positioning statement", "by": "G. Moore et al.", "y": "1991", "m": ["M8"], "r": ["F4-04", "S1-05", "L2-16", "F4-12"], "d": "Define the position in one sentence: “For (target customer), (product) is a (category) that, unlike (competing alternative), provides (unique value).”", "s": "If it cannot be written in one sentence, the strategy has a hole. Use it as the standard for aligning the language of sales, marketing and development.", "c": "Being able to write it is different from customers perceiving it that way. Verify in customers' words.", "ai": "“AI-powered” is not differentiation but merely a ticket to enter the market. Write the unique value in terms of business outcomes (change before and after adoption).", "ask": "What do customers compare us with before buying, and can we win on the axis of that comparison?"}, {"id": "F5-01", "n": "Objectives and key results", "en": "Objectives and key results", "by": "A. Grove (Intel, 1970s) / J. Doerr (2018)", "y": "1970s/2018", "m": ["M2"], "r": ["L3-07", "F5-02", "L2-12"], "d": "Set and publish ambitious objectives (O) and a few key results (KR) that measure their achievement, on a short cycle.", "s": "Align the direction of the whole company while encouraging challenging goals. As a rule, keep it separate from performance evaluation and compensation.", "c": "When the KR itself becomes the goal, metric distortion occurs (L3-07).", "ai": "If usage count is set as the KR for AI use, using it becomes the goal. Make KRs measurable by business outcomes.", "ask": "After AI adoption, what must have changed a quarter from now for us to call it a success?"}, {"id": "F5-02", "n": "Balanced scorecard", "en": "Balanced scorecard", "by": "R. Kaplan & D. Norton", "y": "1992/2004", "m": ["M2", "M5"], "r": ["F5-01", "F5-03", "L3-07"], "d": "Translate strategy into metrics from four perspectives (financial, customer, internal business process, learning and growth) and show their causal relationships in a strategy map.", "s": "Compensate for short-term orientation biased toward financial metrics and manage leading indicators that precede results.", "c": "Too many metrics turn it into management for management's sake.", "ai": "AI investment starts from the learning and growth perspective and takes effect in the order of operations, customers and finance. Draw the causality in a strategy map.", "ask": "Before AI's effect appears in financials, which leading indicators move first?"}, {"id": "F5-03", "n": "KPI tree", "en": "KPI tree", "by": "Management accounting practice (an evolution of DuPont analysis)", "y": "—", "m": ["M3"], "r": ["F3-05", "L1-07", "L3-07"], "d": "Decompose the ultimate goal (KGI) into elements (KPIs) connected by formulas.", "s": "Connect frontline behavioral metrics and management goals with formulas, and identify where moving the number is most effective (sensitivity).", "c": "Elements that cannot be linked by formulas (brand, talent, etc.) drop out.", "ai": "AI speeds up generating decomposition ideas and estimating sensitivity from historical data. Humans supplement talent and brand, which do not fit in the formula.", "ask": "To move this number, what actions can the frontline change every week?", "wl": "ja", "wq": "重要業績評価指標"}, {"id": "F5-04", "n": "Responsibility assignment matrix", "en": "Responsibility assignment matrix", "by": "Project management practice (origin disputed)", "y": "—", "m": ["M6"], "r": ["L3-06", "L3-04"], "d": "For each task, clarify who is responsible for execution, who is accountable, who is consulted and who is informed.", "s": "Resolve both “nobody knows whose job it is” and “too many people decide” at the same time.", "c": "Limit the accountable role to one person. Creating the table is meaningless if it is not operated.", "ai": "AI agent tasks also need an owner. In the table, specify who is accountable for work executed by AI.", "ask": "When a problem arises from AI output, who is accountable?"}, {"id": "F5-05", "n": "Theory of constraints", "en": "Theory of constraints", "by": "E. Goldratt", "y": "1984〜", "m": ["M3"], "r": ["L1-07", "F5-03", "S3-04"], "d": "Repeat: identify the constraint → exploit the constraint fully → subordinate everything else to it → elevate the constraint → move on to the next constraint.", "s": "Rather than making all processes efficient, maximize the utilization of the constraining process to increase overall throughput.", "c": "Improving the efficiency of non-constraint processes can merely increase inventory and waste.", "ai": "Speeding up non-constraint processes with AI does not raise overall results. First confirm that AI is applied to the constraint process.", "ask": "Which process is the bottleneck that determines overall throughput?"}, {"id": "F5-06", "n": "Lewin's change model", "en": "Lewin's change model", "by": "K. Lewin", "y": "1947", "m": ["M5"], "r": ["F5-07", "L2-06"], "d": "View change in three stages: unfreeze (shake the status quo) → change → refreeze (embed the new state).", "s": "Devote sufficient resources to the preceding “unfreeze” and the following “adoption” rather than to the change itself.", "c": "Some studies argue that the formulation as a three-stage model is a later reconstruction (Cummings et al. 2016).", "ai": "Unfreezing tends to be insufficient in AI adoption. Before distributing tools, share why the current way of working cannot continue.", "ask": "How strongly does the front line feel the need to change the current way of working?"}, {"id": "F5-07", "n": "Kotter's 8-step model", "en": "Kotter's 8-step model", "by": "J. Kotter", "y": "1995/1996", "m": ["M5", "M2"], "r": ["L2-02", "L2-06", "F5-08"], "d": "Change the organization in eight steps: create urgency → build a guiding coalition → form a vision → communicate → remove obstacles → generate short-term wins → consolidate gains and produce more change → anchor in culture.", "s": "Most change failures occur at the first step (insufficient urgency). Show short-term wins to move skeptics.", "c": "Because it presumes a straight-line progression through the steps, it can diverge from real change, which is parallel and iterative.", "ai": "Short-term AI wins are easy to create. However, depending on how they are presented, skeptics may take them as a threat to their jobs.", "ask": "Does the change coalition include people with influence on the front line?"}, {"id": "F5-08", "n": "ADKAR model", "en": "ADKAR model", "by": "J. Hiatt (Prosci)", "y": "2006", "m": ["M6"], "r": ["F5-07", "L2-12", "L5-04"], "d": "View individual change in five stages (awareness, desire, knowledge, ability, reinforcement) and diagnose where it is stuck.", "s": "Translate organizational change (Kotter) to the individual level. Even if training provides knowledge, without desire it does not become adoption.", "c": "A practice model of a consulting firm, with limited academic validation.", "ai": "Training can build AI knowledge and ability. At the desire stage, check whether fear of losing one's job is holding people back.", "ask": "At which stage, from awareness to reinforcement, is AI use stalled?"}, {"id": "F5-09", "n": "AARRR", "en": "AARRR", "by": "D. McClure", "y": "2007", "m": ["M2"], "r": ["F2-10", "F3-07", "F5-13"], "d": "Set metrics across five stages (acquisition, activation, retention, referral, revenue) of the customer to see where growth is clogged.", "s": "Measure conversion rates by stage and concentrate actions on the most clogged stage.", "c": "Unless stage definitions are set for each business, metrics cannot be compared.", "ai": "Internal AI adoption can also be measured by stages of first use, continued use, embedding in work, recommendation to others and results, which shows where it is stalled.", "ask": "At which stage do the most customers (internal users) drop off?"}, {"id": "F5-10", "n": "MEDDIC", "en": "MEDDIC", "by": "PTC sales practice (D. Dunkel et al.)", "y": "1996", "m": ["M8"], "r": ["S3-07", "F5-12", "F6-11"], "d": "Verify deal certainty through six elements: quantified benefit, economic buyer (budget holder), decision criteria, decision process, pain and internal champion.", "s": "Identify missing elements as deal risks and decide the next sales action.", "c": "If filling in the checklist becomes the goal, understanding of the customer stays shallow.", "ai": "AI deals tend to have loose agreement on quantified benefit, and no budget is approved after the PoC. Fix how benefits are measured and who the budget holder is before the PoC.", "ask": "Who is the budget holder for this deal, and how does our proposal affect that person's performance metrics?"}, {"id": "F5-11", "n": "SPIN selling", "en": "SPIN selling", "by": "N. Rackham", "y": "1988", "m": ["M6"], "r": ["F5-10", "L2-02"], "d": "Ask in the order situation questions → problem questions → implication questions → need-payoff questions, so that customers themselves articulate the seriousness of the problem and the value of solving it.", "s": "In large deals, before proposing, create a state in which the customer states the “cost of leaving it unaddressed” in their own words.", "c": "Formulaic questions sound like interrogation. Depth of customer understanding is a prerequisite.", "ai": "Analyzing recorded sales meetings with AI reveals biases in questioning, such as a shortage of implication questions. Useful for sales training.", "ask": "Is the customer describing, in their own words, the cost of leaving the problem unaddressed?"}, {"id": "F5-12", "n": "Stakeholder map", "en": "Stakeholder map", "by": "A. Mendelow", "y": "1991", "m": ["M8"], "r": ["F5-07", "F6-11", "F5-10"], "d": "Divide stakeholders on two axes, level of influence and level of interest, and decide how to engage each.", "s": "Collaborate closely with those high in both influence and interest, keep satisfied those high in influence but low in interest, and keep informed those high in interest but low in influence.", "c": "Stakeholders' positions change. Update regularly.", "ai": "In AI adoption, champions, budget holders, user departments, IT and legal each have different interests. Respond individually to each party's interests.", "ask": "Among those who might oppose this change, who has the greatest influence?"}, {"id": "F5-13", "n": "Three layers of adoption", "en": "Three layers of adoption", "by": "AI adoption practice", "y": "—", "m": ["M7"], "r": ["F3-09", "F5-08", "L2-15", "F5-14"], "d": "For a new technology to take hold, measures are needed in all three layers: tools (providing the environment), process (embedding in work) and culture (evaluation and motivation).", "s": "Check whether you have stopped at training and tool distribution (the tools layer), and plan through changes to work procedures and the evaluation system.", "c": "Change in the culture layer takes time. Manage it separately from short-term outcome metrics.", "ai": "In most cases where usage does not grow in company-wide generative AI rollouts, the process and culture layers are missing. Build AI use into work manuals and performance evaluation.", "ask": "Where is AI use written into work manuals and performance evaluation?"}, {"id": "F5-14", "n": "AI center of excellence", "en": "AI center of excellence", "by": "AI adoption practice", "y": "—", "m": ["M7"], "r": ["F5-13", "S2-04", "L1-09"], "d": "A central specialist organization (hub) handles the platform, standards, governance and talent development, while champions in each business unit (spokes) implement use cases.", "s": "Combine centralized expertise with distributed frontline knowledge. Centralize in the early stage and shift authority to the front line as maturity grows.", "c": "If the hub becomes an approval gate, the front line slows down and shadow AI, used outside controls, emerges.", "ai": "Limit the hub's role to providing the common platform, evaluation mechanisms and usage policies, and let the front line run individual use cases quickly.", "ask": "When the front line starts an AI use case, how many days does central approval take?"}, {"id": "F5-15", "n": "Human-in-the-loop design", "en": "Human-in-the-loop design", "by": "AI and automation practice", "y": "—", "m": ["M4", "M6"], "r": ["L2-13", "L6-10", "L5-15"], "d": "Design where in the AI processing flow, who checks and approves what, according to the impact of errors.", "s": "Always place human approval before irreversible operations (remittance, external transmission, deletion), and use after-the-fact sampling checks for low-impact processing.", "c": "If the burden of checking is too heavy, approval becomes a formality (automation bias, L2-13).", "ai": "Do not fix the position and density of checks; relax them gradually according to AI's track record (error rate). Decide the conditions for relaxing in advance.", "ask": "In this process, which operations are irreversible if AI makes an error?"}, {"id": "F5-16", "n": "NIST AI RMF", "en": "NIST AI RMF", "by": "U.S. National Institute of Standards and Technology (NIST)", "y": "2023", "m": ["M4"], "r": ["F5-17", "F5-18", "F3-10"], "d": "A voluntary framework organizing AI risk management into four functions: Govern, Map, Measure and Manage.", "s": "Check the company's AI governance for gaps using the four functions. It can also serve as an international common language when explaining to business partners.", "c": "It is voluntary guidance, not a certification scheme. Select from it to fit the company's size and risk.", "ai": "Risks specific to generative AI (misinformation, copyright, information leakage, etc.) are covered by the supplementary document for generative AI (NIST AI 600-1, 2024).", "ask": "For our AI risks, which is weakest: Govern, Map, Measure or Manage?"}, {"id": "F5-17", "n": "ISO/IEC 42001", "en": "ISO/IEC 42001", "by": "ISO/IEC", "y": "2023", "m": ["M4", "M2"], "r": ["F5-16", "F6-01", "F5-18"], "d": "An international standard for organizations that develop, provide or use AI to operate policy, risk assessment, controls and continual improvement as a system. Third-party certification is available.", "s": "Build AI governance not as document preparation but as a management system that runs on PDCA. Serves as evidence of effective controls for business partners.", "c": "If obtaining certification becomes the goal, policies that do not work on the front line increase.", "ai": "Because it shares a structure with ISO/IEC 27001 for information security, it can be operated integrated with existing management systems.", "ask": "Who reviews our AI policies and when, and how do we confirm they are followed?"}, {"id": "F5-18", "n": "AI Guidelines for Business (Japan)", "en": "AI Guidelines for Business (Japan)", "by": "MIC & METI (Japan)", "y": "2024", "m": ["M4"], "r": ["F3-10", "F5-16", "S4-09"], "d": "Unified guidance from the Japanese government setting out what AI developers, providers and users should address. It is not legally binding and encourages risk-based voluntary efforts.", "s": "Confirm whether the company is a developer, provider or user, and check its efforts against the applicable guidance and checklists.", "c": "Updates continue: version 1.0 (April 2024), version 1.1 (March 2025). Check the latest version.", "ai": "An update reflecting the spread of AI agents and physical AI is under consideration. Structure internal policies so they can follow updates to the guidance.", "ask": "Are we an AI developer, provider or user, and are the responsibilities of each clear?"}, {"id": "F6-01", "n": "PDCA cycle", "en": "PDCA cycle", "by": "W. Shewhart (1939) / W. E. Deming (1950)", "y": "1939/1950", "m": ["M2"], "r": ["S3-02", "F6-03", "F6-04"], "d": "Improve continuously by repeating plan → do → check → act.", "s": "Strong for improving the quality and efficiency of routine work.", "c": "Deming himself later recommended PDSA, replacing check with “Study.” Spending too much time on planning does not suit uncertain environments.", "ai": "AI speeds up evaluation and the generation of improvement ideas. The faster the cycle, the more it spins its wheels without a design of what to learn.", "ask": "In the next improvement cycle, what hypothesis do we want to test?"}, {"id": "F6-02", "n": "Five whys", "en": "Five whys", "by": "Sakichi Toyoda (origin) / Taiichi Ohno (1978)", "y": "1978", "m": ["M2"], "r": ["L3-08", "F6-03"], "d": "Ask “why” repeatedly about a problem to get from surface causes to the root cause.", "s": "Set recurrence-prevention measures as problems of the system, not of individual mistakes.", "c": "For problems with multiple causes, a single-track analysis goes wrong. It does not work if it turns into personal blame.", "ai": "Having AI list candidate causes broadly avoids single-track analysis. Fact-checking on site cannot be skipped.", "ask": "What possible causes of this problem have we not yet examined?"}, {"id": "F6-03", "n": "After-action review", "en": "After-action review", "by": "U.S. Army", "y": "1970s", "m": ["M2"], "r": ["L3-08", "F6-04", "F6-02"], "d": "Reflect immediately after an action with four questions: what was supposed to happen, what actually happened, why the difference arose, and what to do next.", "s": "Whether success or failure, reflect lessons into the next action in a short time.", "c": "If it becomes a forum for assigning blame, no one tells the truth (psychological safety is a prerequisite).", "ai": "AI can handle meeting records and summaries. Humans create the setting that draws out candid views.", "ask": "In which situation was the gap between plan and actual the largest?"}, {"id": "F6-04", "n": "Double-loop learning", "en": "Double-loop learning", "by": "C. Argyris (1977) / C. Argyris & D. Schön (1978)", "y": "1977/1978", "m": ["M2", "M7"], "r": ["L4-10", "F6-01", "S2-03"], "d": "Beyond correcting actions (single-loop), question the assumptions and goals that guided those actions.", "s": "When results do not appear despite repeated improvement, suspect that the rules of the game (assumptions) have changed.", "c": "Questioning assumptions tends to provoke defensive reactions in the organization.", "ai": "AI use tends to be biased toward improving existing work. Check whether the purposes and rules of work are being questioned on the premise of AI.", "ask": "What underlying assumption keeps results from appearing despite repeated improvement?"}, {"id": "F6-05", "n": "Pre-mortem", "en": "Pre-mortem", "by": "G. Klein", "y": "2007", "m": ["M6"], "r": ["L3-09", "L2-08", "L2-03"], "d": "Before starting a plan, assume “a year from now, this plan ended in a disastrous failure,” and have everyone list the reasons.", "s": "Curb groupthink and excessive optimism and surface risks that are hard to voice. Research suggests that imagining failure as an established fact raises the ability to identify causes by about 30% (Mitchell et al. 1989).", "c": "Do not stop at listing risks; decide countermeasures and owners.", "ai": "Have AI produce many failure scenarios to pick up blind spots humans do not think of. Humans decide countermeasures and assign owners.", "ask": "If the plan fails a year from now, what is the most likely reason?"}, {"id": "F6-06", "n": "Decision tree", "en": "Decision tree", "by": "H. Raiffa", "y": "1968", "m": ["M4"], "r": ["L1-02", "S6-03", "F6-08"], "d": "Represent options, uncertain events, and their probabilities and outcomes in a decision tree and compare by expected value.", "s": "Turn the “do or don't” debate into one about probability and impact. The value of obtaining additional information can also be calculated.", "c": "When there are fat-tailed risks (L1-02), judging by expected value alone can be ruinous.", "ai": "AI can produce estimates of probabilities and outcomes, but poorly grounded numbers look precise. State how reliable the assumptions are alongside.", "ask": "Which uncertain assumption most affects the outcome of this decision?"}, {"id": "F6-07", "n": "Cynefin framework", "en": "Cynefin framework", "by": "D. Snowden (1999) / D. Snowden & M. Boone (2007)", "y": "1999/2007", "m": ["M7", "M4"], "r": ["S3-03", "F6-01", "S3-05"], "d": "Divide situations into “clear, complicated, complex, chaotic” (plus “confused,” when it is unclear which applies) and choose the decision-making approach suited to each domain.", "s": "Use expert analysis for complicated problems, small experiments for complex ones, and act first to stabilize in chaotic situations.", "c": "The names of the domains have been revised. Judging which domain one is in is itself difficult.", "ai": "AI excels in the complicated domain and only assists experiments in the complex domain. Misjudging the domain is the biggest pitfall.", "ask": "Can expert analysis answer this problem, or do we need experiments?"}, {"id": "F6-08", "n": "One-way and two-way door decisions", "en": "One-way and two-way door decisions", "by": "J. Bezos (letter to shareholders)", "y": "2015", "m": ["M4", "M5"], "r": ["S3-02", "F6-06", "L5-10"], "d": "Decide irreversible decisions (one-way doors) carefully, and decide reversible decisions (two-way doors) quickly with a small group.", "s": "Most decisions are reversible. An organization that decides everything carefully becomes slow.", "c": "There is a risk of misjudging reversibility (it is actually irreversible).", "ai": "Most AI adoption is a two-way door and can be tried small. Data leakage and lock-in to a model dependency can be one-way.", "ask": "Can this decision be reversed in six months?"}, {"id": "F6-09", "n": "Net present value", "en": "Net present value", "by": "I. Fisher (1930) / J. Dean (1951)", "y": "1930/1951", "m": ["M4", "M5"], "r": ["S6-03", "F6-10", "F6-06"], "d": "Discount future cash flows to present value at the cost of capital and compare with the investment amount (NPV). The discount rate at which NPV is zero is the IRR.", "s": "Compare investment proposals on the same yardstick and judge whether returns exceeding the cost of capital are expected.", "c": "Depends on estimating uncertain cash flows in the distant future. The value of exit and expansion options is hard to capture (complement with S6-03).", "ai": "AI investment has high uncertainty about effects, and a single NPV can easily mislead. Use the option value of staged investment together with scenario-based NPVs.", "ask": "Is this AI investment's NPV still positive if the effect is half of what we assumed?"}, {"id": "F6-10", "n": "Sensitivity analysis", "en": "Sensitivity analysis", "by": "Decision analysis practice", "y": "—", "m": ["M4"], "r": ["F6-09", "F1-08", "F6-06"], "d": "Move key assumptions one at a time and measure which assumption the conclusion is most sensitive to. A chart with bars arranged in order of impact is a tornado diagram.", "s": "Identify the assumptions that determine the conclusion and concentrate research resources on verifying them.", "c": "When assumptions are interlinked, analysis that moves them one at a time is insufficient. Combine with scenario analysis.", "ai": "In AI investment plans, utilization, unit price and whether staff are redeployed tend to determine the conclusion. Check whether the decision would stay the same if assumptions were off by 20–30%.", "ask": "Which assumption could overturn the conclusion, and by how much would it have to be off for the decision to change?"}, {"id": "F6-11", "n": "RAPID decision roles", "en": "RAPID decision roles", "by": "P. Rogers & M. Blenko (Bain)", "y": "2006", "m": ["M8", "M6"], "r": ["F5-04", "F5-12"], "d": "Divide decision roles into Recommend, Agree, Perform, Input and Decide, and make clear who finally decides.", "s": "In organizations where decisions are slow or reversed, clarify where decision rights lie and limit the people with agree rights.", "c": "If roles are defined too finely, they are not operated. Use it only for important decisions.", "ai": "There are more situations where AI takes the recommend and input roles. Even when AI output is used as input to judgment, always place the decision owner with a human.", "ask": "Is there a single final decision-maker for this decision?"}, {"id": "F6-12", "n": "Stage-Gate", "en": "Stage-Gate", "by": "R. Cooper", "y": "1990", "m": ["M4", "M5"], "r": ["S6-03", "F4-10", "L2-05"], "d": "Divide new product development into stages and, at the gate at the end of each stage, decide go, kill or hold based on predefined criteria.", "s": "Invest in uncertain development in stages and stop unpromising projects early.", "c": "If the gate criteria become a formality, stop decisions are not made and projects pile up.", "ai": "For AI PoCs, agree on the criteria for moving to production before starting, and set gates that separate technical validation from value validation.", "ask": "Have the conditions for stopping this PoC been agreed before we start?"}, {"id": "F6-13", "n": "Reference class forecasting", "en": "Reference class forecasting", "by": "D. Kahneman & A. Tversky (1979) / B. Flyvbjerg (2006)", "y": "1979/2006", "m": ["M6", "M4"], "r": ["L2-08", "L3-12"], "d": "Forecast cost, duration and results from the distribution of outcomes of similar projects (the reference class). Corrects the optimism produced by building up an individual plan bottom-up.", "s": "Prevent budget overruns and delays in large projects. Correct by locating the company's plan within the distribution of similar projects.", "c": "The results change depending on how the reference class is chosen.", "ai": "Estimates of duration and effects for AI adoption projects tend to be optimistic. Correct them with the distribution of past IT implementations and other companies' AI adoption results.", "ask": "In similar projects, by how much have budgets and schedules been exceeded?"}, {"id": "F6-14", "n": "Red teaming", "en": "Red teaming", "by": "Originated in military exercises / popularized in AI safety evaluation", "y": "—", "m": ["M4", "M8"], "r": ["F6-05", "F3-11", "L1-12", "F1-10"], "d": "An independent team taking the position of attackers or opponents deliberately probes the weaknesses of a plan or system to test it.", "s": "Have an internal devil's advocate check important strategies and proposals starting from “reasons they will fail.”", "c": "It does not work unless the receiving side has a culture that welcomes counterarguments (L3-08).", "ai": "AI systems are tested before release by specialist teams with attacks that elicit prompt injection and inappropriate output. Repeat with every model update.", "ask": "If this plan fails, what is the most likely reason?"}, {"id": "F6-15", "n": "LLM evaluation layers", "en": "LLM evaluation layers", "by": "AI engineering practice", "y": "—", "m": ["M2", "M4"], "r": ["L6-16", "L6-11", "F6-16"], "d": "Measure AI output in three layers: automated code checks (format, structure) → LLM-based evaluation (mass judgment of quality) → human evaluation (final quality, exceptions). Do not escalate to an upper layer what a lower layer can catch.", "s": "Start by building a 20–50-item eval set from production failures and add to it with each failure. Prioritize representativeness over coverage.", "c": "LLM-based evaluation is not reliable unless calibrated against human evaluation.", "ai": "Improving AI without evaluation becomes an exchange of impressions. Make the eval set the common yardstick for model selection, prompt changes and release decisions.", "ask": "Have we written the definition of a “good output” in a form that can be judged automatically?"}, {"id": "F6-16", "n": "LLMOps loop", "en": "LLMOps loop", "by": "AI engineering practice", "y": "—", "m": ["M2"], "r": ["F6-15", "L6-12", "F6-01"], "d": "An operating cycle that repeats: deploy → collect execution logs → classify failures → add to the eval set → improve → regression check → deploy.", "s": "The speed of running this loop determines the speed of quality improvement in the AI system. Version prompts as code.", "c": "Execution logs may contain personal and confidential information. Design permissions for storage and viewing.", "ai": "Decide who learns of production failures, and within how many hours. If failure detection is slow, the improvement loop does not run.", "ask": "Who will learn that AI failed in production, and how?"}]};
const ATLAS_LAYER = {
  L: { color: C.blue, mark: "●" },
  S: { color: C.crimson, mark: "▲" },
  F: { color: C.teal, mark: "■" },
};
const ATLAS_GRADE_COLOR = { S: C.green, A: C.dx, B: C.gold, C: C.amber, D: C.red };
const ATLAS_LORDER = ["L", "S", "F"];
const ATLAS_GORDER = ["S", "A", "B", "C", "D"];

// @atlas-quiz-begin
// 体系図クイズの問題生成（純粋関数・決定的）。scripts/validate-atlas.mjs がこの区間を取り出して全問を検査する。
// 形式: def=説明→名称 / cat=名称→カテゴリ / ask=コンサルの問い→名称 / ai=AI読み替え→名称 / by=名称→提唱者
// 長さの手掛かり対策（quiz-authoring 規約）：日英とも「最長を選ぶ（同点は先頭）」で正解を引けない並びにし、
// 約1/4の問題は正解を最長の同点にして（同じ長さの誤答を先に置く）「最長を消す」消去法も効かないようにする。
function atlasBuildQuiz(JA, EN) {
  const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; };
  // 32bit整数演算の乱数（mulberry32）。浮動小数の桁落ちで並びが偏らないようにする
  const rng = (seed) => { let x = seed >>> 0; return () => { x = (x + 0x6D2B79F5) >>> 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const perm = (seed, n) => { const r = rng(seed), a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const LEN = new Map();
  const len = (s) => { let v = LEN.get(s); if (v === undefined) { v = [...s].length; LEN.set(s, v); } return v; };
  const ja = {}, en = {};
  JA.items.forEach((it) => { ja[it.id] = it; });
  EN.items.forEach((it) => { en[it.id] = it; });
  const ids = JA.items.map((it) => it.id);
  const cat = (id) => id.slice(0, 2), layer = (id) => id[0];
  // 名称の要素（括弧・スラッシュで分割）。本文に含まれていたら「答えの漏洩」とみなす
  const PARTS = new Map();
  const parts = (name) => { let v = PARTS.get(name); if (!v) { v = name.split(/[（）()／/]/).map((x) => x.trim().toLowerCase()).filter((x) => x.length >= 2); PARTS.set(name, v); } return v; };
  const leaks = (stem, name) => { const s = stem.toLowerCase(); return parts(name).some((p) => s.includes(p)); };
  const SN = new Map();
  const surnames = (by) => { if (SN.has(by)) return SN.get(by); const out = new Set(); SN.set(by, out); for (const m of by.matchAll(/[A-Z]\.(?:[-A-Z.]*\.)?([ァ-ヴー・]{2,})/g)) m[1].split("・").forEach((x) => x.length >= 2 && out.add(x)); return out; };
  const person = (id) => /^[A-Z]\.(?:[-A-Z.]*\.)?[ァ-ヴ]/.test(ja[id].by);
  // 選択肢では年の注記を外して形式を揃える（年の有無が正解の手掛かりにならないように）
  const noYearJ = (s) => s.replace(/（[^）]*\d[^）]*）/g, "").trim();
  const noYearE = (s) => s.replace(/\s*\([^)]*\d[^)]*\)/g, "").trim();
  const BYJ = {}, BYE = {}, BYS = {};
  ids.forEach((id) => { BYJ[id] = noYearJ(ja[id].by); BYE[id] = noYearE(en[id].by); BYS[id] = surnames(ja[id].by); });
  const shuffled = (key, xs) => perm(hash(key), xs.length).map((i) => xs[i]);
  // 誤答3つを選ぶ。order は優先順に並べた候補（同じカテゴリ→同じ層）。txt(c) は選択肢の日英テキスト。
  // 言語ごとの型：tie=誤答の最長が正解と同じ長さ／under=誤答の最長が正解以上。まず素直に選び、
  // 型に合わなければ1つだけ入れ替えて合わせる。tie が作れなければ under に落とし、それも無理なら出題しない。
  const choose = (seedKey, order, ok, txt, ans) => {
    const got = [];
    for (const c of order) { if (got.length >= 3) break; if (ok(c, got)) got.push(c); }
    if (got.length < 3) return null;
    const aJ = len(ans.ja), aE = len(ans.en), LJ = new Map(), LE = new Map();
    order.forEach((c) => { const t = txt(c); LJ.set(c, len(t.ja)); LE.set(c, len(t.en)); });
    const fit1 = (m, a, mode) => (mode === "tie" ? m === a : m >= a);
    const fits = (ds, mode) => fit1(Math.max(LJ.get(ds[0]), LJ.get(ds[1]), LJ.get(ds[2])), aJ, mode.ja) && fit1(Math.max(LE.get(ds[0]), LE.get(ds[1]), LE.get(ds[2])), aE, mode.en);
    const tryMode = (mode) => {
      if (fits(got, mode)) return got;
      for (let j = 2; j >= 0; j--) {
        const rest = got.filter((_, k) => k !== j);
        for (const c of order) {
          if (got.includes(c)) continue;
          const ds = got.slice(); ds[j] = c;
          if (fits(ds, mode) && ok(c, rest)) return ds;
        }
      }
      return null;
    };
    const want = { ja: hash(seedKey + "#tj") % 3 === 0 ? "tie" : "under", en: hash(seedKey + "#te") % 3 === 0 ? "tie" : "under" };
    return tryMode(want) || tryMode({ ja: want.ja, en: "under" }) || tryMode({ ja: "under", en: want.en }) || tryMode({ ja: "under", en: "under" });
  };
  const nameTxt = (c) => ({ ja: ja[c].n, en: en[c].n });
  const nameOpts = (qid, id, stemJ, stemE) => {
    const CL = new Map();
    const clean = (c) => { let v = CL.get(c); if (v === undefined) { v = !leaks(stemJ, ja[c].n) && !leaks(stemE, en[c].n); CL.set(c, v); } return v; };
    const okName = (c, got) => clean(c) && !got.some((g) => ja[g].n === ja[c].n || en[g].n === en[c].n);
    const same = ids.filter((c) => c !== id && cat(c) === cat(id));
    const wide = ids.filter((c) => c !== id && layer(c) === layer(id) && cat(c) !== cat(id));
    // 同じカテゴリを優先し、足りない・長さが合わないときだけ同じ層の別カテゴリから補う
    const d = choose(qid, shuffled(qid + "#c", same).concat(shuffled(qid + "#l", wide)), okName, nameTxt, nameTxt(id));
    return d ? [id, ...d] : null;
  };
  const expl = (id) => ({
    ja: `正解：${ja[id].n}（${id}）。${ja[id].d}`,
    en: `Answer: ${en[id].n} (${id}). ${en[id].d}`,
  });
  const Q = [];
  for (const id of ids) {
    const J = ja[id], E = en[id];
    // def / ask / ai：本文から項目名を当てる
    for (const [t, fj, fe, pj, pe] of [
      ["def", J.d, E.d, "次の説明に当てはまるのはどれか？", "Which entry matches this description?"],
      ["ask", J.ask, E.ask, "このコンサルの問いは、どの項目から立てたものか？", "Which entry does this consultant's question come from?"],
      ["ai", J.ai, E.ai, "この「生成AI時代の読み替え」は、どの項目のものか？", "Which entry does this generative-AI reading belong to?"],
    ]) {
      const qid = `${t}:${id}`;
      if (leaks(fj, J.n) || leaks(fe, E.n)) continue;
      const opts = nameOpts(qid, id, fj, fe);
      if (!opts) continue;
      Q.push({ id: qid, t, item: id, p: { ja: pj, en: pe }, stem: { ja: fj, en: fe },
        o: opts.map((c) => ({ ja: ja[c].n, en: en[c].n, ref: c })), a: 0, x: expl(id) });
    }
    // cat：項目名からカテゴリを当てる（同じ層の別カテゴリを誤答に使う）
    {
      const qid = `cat:${id}`;
      const others = Object.keys(JA.cats).filter((c) => JA.cats[c].layer === layer(id) && c !== cat(id));
      const ctxt = (c) => ({ ja: JA.cats[c].name, en: EN.cats[c].name });
      const d = choose(qid, shuffled(qid, others), () => true, ctxt, ctxt(cat(id)));
      if (d) {
        const cj = JA.cats[cat(id)], ce = EN.cats[cat(id)], lj = JA.layers[layer(id)], le = EN.layers[layer(id)];
        Q.push({ id: qid, t: "cat", item: id, p: { ja: `「${J.n}」が属するカテゴリはどれか？`, en: `Which category does “${E.n}” belong to?` }, stem: null,
          o: [cat(id), ...d].map((c) => ({ ja: JA.cats[c].name, en: EN.cats[c].name, ref: c })), a: 0,
          x: { ja: `正解：${cj.name}（${cat(id)}）。${lj.name}の分類軸は「${lj.axis}」。${cj.name}は「${cj.desc}」。`,
            en: `Answer: ${ce.name} (${cat(id)}). The ${le.name} axis is “${le.axis}”; ${ce.name} covers “${ce.desc}”.` } });
      }
    }
    // by：項目名から提唱者を当てる（人名が特定できる項目だけ。同じ人物を含む誤答は除外）
    if (person(id)) {
      const qid = `by:${id}`;
      const mine = BYS[id];
      const cands = ids.filter((c) => c !== id && layer(c) === layer(id) && person(c));
      const btxt = (c) => ({ ja: BYJ[c], en: BYE[c] });
      const d = choose(qid, shuffled(qid, cands), (c, got) => {
        const s = BYS[c];
        if ([...s].some((x) => mine.has(x))) return false;
        if (BYJ[c] === BYJ[id] || BYE[c] === BYE[id]) return false;
        return !got.some((g) => BYJ[g] === BYJ[c] || BYE[g] === BYE[c] || [...BYS[g]].some((x) => s.has(x)));
      }, btxt, btxt(id));
      if (d) {
        Q.push({ id: qid, t: "by", item: id, p: { ja: `「${J.n}」の提唱者・出典として正しいのはどれか？`, en: `Who is the origin of “${E.n}”?` }, stem: null,
          o: [id, ...d].map((c) => ({ ja: BYJ[c], en: BYE[c], ref: c })), a: 0,
          x: { ja: `正解：${J.by}（${J.y}）。${J.d}`, en: `Answer: ${E.by} (${E.y}). ${E.d}` } });
      }
    }
  }
  // 並び：24通りのうち日英とも「最長を選ぶ（同点は先頭）」で正解を引かないものだけを候補にし、
  // 正解の表示位置が A〜D に均等に散るよう重みを付けて選ぶ（同点型は A に置けないので、その分を他で補う）
  const ALL = []; (function gen(a, rest) { if (!rest.length) { ALL.push(a); return; } rest.forEach((x, i) => gen(a.concat(x), rest.filter((_, k) => k !== i))); })([], [0, 1, 2, 3]);
  const hit = (L, p) => { let b = p[0]; for (const i of p) if (L[i] > L[b]) b = i; return b === 0; };
  const valid = Q.map((q) => { const LJ = q.o.map((o) => len(o.ja)), LE = q.o.map((o) => len(o.en)); return ALL.filter((p) => !hit(LJ, p) && !hit(LE, p)); });
  const open = valid.map((v) => [0, 1, 2, 3].filter((k) => v.some((p) => p.indexOf(0) === k)));
  const share = [0, 0, 0, 0];
  open.forEach((ks) => ks.forEach((k) => { share[k] += 1 / ks.length; }));
  const w = share.map((s) => (s > 0 ? Q.length / 4 / s : 1));
  Q.forEach((q, i) => {
    const ks = open[i];
    if (!ks.length) { q.perm = null; return; }
    const r = rng(hash(q.id) + 7)(), tot = ks.reduce((s, k) => s + w[k], 0);
    let acc = 0, k = ks[ks.length - 1];
    for (const c of ks) { acc += w[c] / tot; if (r < acc) { k = c; break; } }
    const ps = valid[i].filter((p) => p.indexOf(0) === k);
    q.perm = ps[hash(q.id + "#p") % ps.length];
  });
  return Q.filter((q) => q.perm);
}
// @atlas-quiz-end
// 体系図クイズは初めて開いたときに一度だけ作る（ハブを開くたびに約1,000問を組み立てない）
let __atlasQ = null;
const atlasQuiz = () => { if (!__atlasQ) { const list = atlasBuildQuiz(ATLAS_JA, ATLAS_EN); __atlasQ = { list, by: Object.fromEntries(list.map((q) => [q.id, q])) }; } return __atlasQ; };
const ATLAS_QKEY = "consulting_atlas_quiz_v1";
const ATLAS_SRKEY = "consulting_atlas_sr_v1";

function atlasIndex(A) {
  const BY = {};
  A.items.forEach((it) => { BY[it.id] = { ...it, layer: it.id[0], cat: it.id.slice(0, 2) }; });
  const ALL = A.items.map((it) => BY[it.id]);
  const back = {};
  ALL.forEach((it) => it.r.forEach((r) => { (back[r] = back[r] || []).push(it.id); }));
  const discOf = {};
  Object.entries(A.disc).forEach(([d, v]) => v.ids.forEach((id) => { discOf[id] = d; }));
  const indOf = {};
  A.industries.forEach((x) => [...new Set([...x.L, ...x.S, ...x.F])].forEach((id) => { (indOf[id] = indOf[id] || []).push(x.id); }));
  const lensOf = {};
  A.lenses.forEach((x) => x.core.forEach((id) => { (lensOf[id] = lensOf[id] || []).push(x.id); }));
  const lensById = Object.fromEntries(A.lenses.map((x) => [x.id, x]));
  const indById = Object.fromEntries(A.industries.map((x) => [x.id, x]));
  const gc = {};
  ALL.filter((i) => i.layer === "L").forEach((l) => { gc[l.g] = (gc[l.g] || 0) + 1; });
  const vals = {
    total: ALL.length, nL: ALL.filter((i) => i.layer === "L").length, nS: ALL.filter((i) => i.layer === "S").length,
    nF: ALL.filter((i) => i.layer === "F").length, nChain: A.chains.length, nT: A.tensions.length,
    nT3: A.tensions.filter((t) => t.axis !== "other").length, gS: gc.S || 0, gCD: (gc.C || 0) + (gc.D || 0),
    nP: A.misuse.length, nCat: Object.keys(A.cats).length, nL6: ALL.filter((i) => i.cat === "L6").length, nInd: A.industries.length,
  };
  return { BY, ALL, back, discOf, indOf, lensOf, lensById, indById, gc, vals };
}

function AtlasPill({ active, color, onClick, children, title }) {
  const col = color || C.ink;
  return (
    <button onClick={onClick} title={title} style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 18,
      border: `1.5px solid ${active ? col : C.line}`, background: active ? col : "#fff",
      color: active ? "#fff" : C.txt, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: sans,
    }}>{children}</button>
  );
}
function AtlasMark({ layer, size = 22 }) {
  const m = ATLAS_LAYER[layer];
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size, borderRadius: 6, background: m.color, color: "#fff", fontSize: size * 0.5, fontWeight: 800, flex: "none" }}>{m.mark}</span>;
}
function AtlasHead({ color, mark, label, count, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "4px 0 10px", flexWrap: "wrap" }}>
      {mark ? <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: color, color: "#fff", fontSize: 12, fontWeight: 800 }}>{mark}</span> : null}
      <span style={{ fontSize: 13.5, fontWeight: 800, color }}>{label}</span>
      {count != null ? <span style={{ fontSize: 11.5, color: C.sub }}>· {count}</span> : null}
      {sub ? <span style={{ fontSize: 11.5, color: C.sub }}>{sub}</span> : null}
      <span style={{ flex: 1, minWidth: 20, height: 1, background: C.line }} />
    </div>
  );
}
function AtlasGrade({ g, A }) {
  const col = ATLAS_GRADE_COLOR[g];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 800, padding: "2px 9px", borderRadius: 10, color: col, background: col + "18", border: `1px solid ${col}55`, whiteSpace: "nowrap" }}>{g} {A.grades[g].name}</span>;
}
function AtlasH({ children, sub }) {
  return (
    <div style={{ margin: "6px 0 12px" }}>
      <h2 style={{ fontFamily: serif, fontSize: 20, margin: 0, color: C.ink }}>{children}</h2>
      {sub ? <p style={{ margin: "5px 0 0", color: C.sub, fontSize: 12.5, lineHeight: 1.7 }}>{sub}</p> : null}
    </div>
  );
}
const atlasLabel = { fontSize: 11.5, fontWeight: 800, color: C.sub, letterSpacing: 0.3, margin: "0 0 5px" };
// 開閉カードを並べても、閉じたカードが隣の開いたカードの高さまで伸びないよう上揃えにする
const atlasGrid = (min) => ({ display: "grid", gap: 12, gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, alignItems: "start" });
// 開閉できるカード。見出しは常に表示し、押すと中身が開く（初期状態は閉じている）
function AtlasFold({ open, onToggle, head, meta, accent, gap, style, children }) {
  return (
    <Card style={{ padding: 0, overflow: "hidden", ...(accent ? { borderLeft: `4px solid ${accent}` } : null), ...style }}>
      <button type="button" onClick={onToggle} aria-expanded={!!open} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#fff", border: "none", cursor: "pointer", textAlign: "left", fontFamily: sans, color: C.txt }}>
        <span style={{ flex: 1, minWidth: 0 }}>{head}</span>
        {meta != null ? <span style={{ flex: "none", fontSize: 11.5, color: C.sub }}>{meta}</span> : null}
        <span aria-hidden="true" style={{ flex: "none", width: 14, textAlign: "center", fontSize: 10.5, color: C.sub, transform: open ? "rotate(90deg)" : "none", transition: "transform .15s" }}>▶</span>
      </button>
      {open ? <div style={{ display: "grid", gap: gap != null ? gap : 10, padding: "12px 16px 16px", borderTop: `1px solid ${C.line}` }}>{children}</div> : null}
    </Card>
  );
}

function AtlasTab({ lang, tt }) {
  const A = lang === "en" ? ATLAS_EN : ATLAS_JA;
  const X = useMemo(() => atlasIndex(A), [A]);
  const [view, setView] = useState("summary");
  const [open, setOpen] = useState(null);
  const [genre, setGenre] = useState("ind");
  const [q, setQ] = useState("");
  const [fLayer, setFLayer] = useState("all");
  const [fCat, setFCat] = useState("");
  const [fMeta, setFMeta] = useState("");
  const [fGrade, setFGrade] = useState("");
  const [fInd, setFInd] = useState("");
  const [fLens, setFLens] = useState("");
  const [fDisc, setFDisc] = useState("");
  const [qs, setQs] = useState(null); // クイズのセッション {ids, pos, picked, score, mode}
  const [qLayer, setQLayer] = useState("all");
  const [qType, setQType] = useState("all");
  const [qStats, setQStats] = useState({});
  const [qCards, setQCards] = useState({});
  const [folds, setFolds] = useState({}); // 開閉カードの状態（キー→開いているか）。最初はすべて閉じている
  const fo = (k) => !!folds[k];
  const ft = (k) => setFolds((f) => ({ ...f, [k]: !f[k] }));
  const foldAll = (keys) => {
    const all = keys.length > 0 && keys.every((k) => folds[k]);
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "0 0 10px" }}>
        <AtlasPill onClick={() => setFolds((f) => { const n = { ...f }; keys.forEach((k) => { n[k] = !all; }); return n; })}>{all ? tt("▴ すべて閉じる", "▴ Collapse all") : tt("▾ すべて開く", "▾ Expand all")}</AtlasPill>
      </div>
    );
  };
  useEffect(() => {
    let ok = true;
    (async () => {
      try { const r = await window.storage.get(ATLAS_QKEY); if (ok && r && r.value) setQStats(JSON.parse(r.value)); } catch (e) {}
      try { const r = await window.storage.get(ATLAS_SRKEY); if (ok && r && r.value) setQCards(JSON.parse(r.value)); } catch (e) {}
    })();
    return () => { ok = false; };
  }, []);
  const __opBack = useLocalHistory([[view, setView], [open, setOpen], [genre, setGenre], [fCat, setFCat], [qs, setQs]]);
  useRegisterBack(__opBack.back, __opBack.canBack);
  const done = useDoneSet("consulting_atlas_done_v1");
  const toTop = () => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };
  const go = (id) => { setOpen(id); toTop(); };
  const fill = (s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => X.vals[k]);
  const nameOf = (id) => X.BY[id].n;
  const subName = (it) => (lang === "en" ? ATLAS_JA.items.find((x) => x.id === it.id).n : it.en);
  const doneCount = X.ALL.filter((i) => done.has(i.id)).length;

  const Chip = ({ id }) => {
    const it = X.BY[id];
    const col = ATLAS_LAYER[it.layer].color;
    return (
      <button onClick={() => go(id)} style={{
        display: "inline-flex", alignItems: "baseline", gap: 6, padding: "5px 11px", borderRadius: 16, fontSize: 12.5, fontWeight: 700,
        cursor: "pointer", border: `1.5px solid ${done.has(id) ? "#16A34A" : C.line}`, background: "#fff", color: C.txt, textAlign: "left", fontFamily: sans,
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = col; e.currentTarget.style.color = col; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = done.has(id) ? "#16A34A" : C.line; e.currentTarget.style.color = C.txt; }}>
        <span style={{ fontSize: 10.5, fontWeight: 800, color: col, fontVariantNumeric: "tabular-nums" }}>{id}</span>{it.n}
      </button>
    );
  };
  const Chips = ({ ids }) => (ids && ids.length ? <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{ids.map((id) => <Chip key={id} id={id} />)}</div> : <span style={{ color: C.sub, fontSize: 12.5 }}>—</span>);
  const List = ({ items }) => <ul style={{ margin: 0, paddingLeft: "1.2em", display: "grid", gap: 4, fontSize: 13, lineHeight: 1.7 }}>{items.map((x, i) => <li key={i}>{x}</li>)}</ul>;

  const views = [
    ["summary", tt("サマリー", "Summary")], ["map", tt("体系マップ", "Map")], ["catalog", tt("カタログ", "Catalog")],
    ["genre", tt("ジャンル別", "By genre")], ["insights", tt("深掘り", "Deep dives")], ["council", tt("専門家カウンシル", "Expert council")],
    ["guide", tt("問い別ガイド", "Question guide")], ["quiz", tt("クイズ", "Quiz")],
  ];
  const nav = (
    <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
      {views.map(([k, l]) => <AtlasPill key={k} active={view === k && open == null} onClick={() => { setOpen(null); setView(k); }}>{l}</AtlasPill>)}
    </div>
  );

  // ---- 詳細ビュー ----
  if (open != null && X.BY[open]) {
    const it = X.BY[open];
    const lay = ATLAS_LAYER[it.layer];
    const sib = X.ALL.filter((x) => x.cat === it.cat);
    const pos = sib.findIndex((x) => x.id === it.id);
    const prev = pos > 0 ? sib[pos - 1] : null;
    const next = pos < sib.length - 1 ? sib[pos + 1] : null;
    const labD = { L: tt("内容", "Definition"), S: tt("命題（勝ち筋）", "Proposition"), F: tt("構造", "Structure") }[it.layer];
    const labS = it.layer === "L" ? tt("経営への示唆", "Implication") : tt("使いどころ", "When to use");
    const wl = it.wl || "en";
    const wq = it.wq || (wl === "ja" ? ATLAS_JA.items.find((x) => x.id === it.id).n : it.en);
    const wiki = `https://${wl}.wikipedia.org/w/index.php?search=${encodeURIComponent(wq)}&title=Special:Search&go=Go`;
    const ment = [];
    A.chains.forEach((c) => { if ([...c.L, ...c.S, ...c.F].includes(it.id)) ment.push(tt("連鎖「", "Chain: “") + c.t + tt("」", "”")); });
    A.tensions.forEach((t) => { if ([...t.a.ids, ...t.b.ids, ...t.rel].includes(it.id)) ment.push(tt("二律背反「", "Tension: “") + t.t + tt("」", "”")); });
    A.misuse.forEach((p) => { if (p.ids.includes(it.id)) ment.push(tt("誤用「", "Misuse: “") + p.t + tt("」", "”")); });
    A.aiLens.forEach((a) => { if (a.ids.includes(it.id)) ment.push(tt("AIレンズ「", "AI lens: “") + a.t + tt("」", "”")); });
    A.council.lenses.forEach((c) => { if (c.ids.includes(it.id)) ment.push(tt("カウンシル（", "Council (") + X.lensById[c.k].n + tt("）", ")")); });
    const Field = ({ label, children, accent }) => (
      <div style={accent ? { borderLeft: `3px solid ${accent}`, paddingLeft: 12 } : null}>
        <p style={{ ...atlasLabel, color: accent || C.sub }}>{label}</p>
        <div style={{ fontSize: 13.5, lineHeight: 1.8, color: C.txt }}>{children}</div>
      </div>
    );
    const navBtn = (x, dir) => (
      <button onClick={() => x && go(x.id)} disabled={!x} style={{
        background: "#fff", color: x ? C.ink : C.line, border: `1.5px solid ${C.line}`, borderRadius: 8,
        padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: x ? "pointer" : "default", fontFamily: sans,
      }}>{dir < 0 ? "← " : ""}{x ? x.n : dir < 0 ? tt("前へ", "Prev") : tt("次へ", "Next")}{dir > 0 ? " →" : ""}</button>
    );
    return (
      <div>
        {nav}
        <button onClick={() => setOpen(null)} style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, background: "#fff", color: C.ink,
          border: `1.5px solid ${C.line}`, borderRadius: 8, padding: "9px 16px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: sans,
        }}>← {tt("一覧に戻る", "Back to list")}</button>
        <Card style={{ borderTop: `4px solid ${lay.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <AtlasMark layer={it.layer} />
            <span style={{ fontSize: 11.5, fontWeight: 800, color: lay.color }}>{A.layers[it.layer].name} › {it.cat} {A.cats[it.cat].name}</span>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: C.sub }}>{it.id}</span>
            {it.g ? <AtlasGrade g={it.g} A={A} /> : null}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "baseline" }}>
            <h2 style={{ fontFamily: serif, fontSize: 22, margin: "4px 0 2px", color: C.ink }}>{it.n}</h2>
            <span onClick={(e) => done.toggle(it.id, e)} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 700, color: done.has(it.id) ? "#16A34A" : C.sub }}>
              <DoneCheck on={done.has(it.id)} onToggle={(e) => done.toggle(it.id, e)} en={lang === "en"} />{done.has(it.id) ? tt("読了", "Read") : tt("読了にする", "Mark as read")}
            </span>
          </div>
          <p style={{ margin: "0 0 4px", color: C.sub, fontSize: 12.5 }}>{subName(it)}</p>
          <p style={{ margin: "0 0 16px", color: C.txt, fontSize: 12.5 }}><span style={{ color: C.sub }}>{tt("提唱・出典：", "Origin: ")}</span>{it.by}{it.y && it.y !== "—" && !/\d/.test(it.by) ? `${tt("（", " (")}${it.y}${tt("）", ")")}` : ""}</p>
          <div style={{ display: "grid", gap: 16 }}>
            <Field label={labD}><span style={{ fontSize: 14.5 }}>{it.d}</span></Field>
            <Field label={labS}>{it.s}</Field>
            <Field label={tt("注意・補足", "Caveats")}>{it.c}</Field>
            <Field label={tt("生成AI時代の読み替え", "Reading for the generative-AI era")} accent={C.teal}>{it.ai}</Field>
            <Field label={tt("コンサルの問い", "The consultant's question")} accent={C.crimson}>{it.ask}</Field>
            {it.g ? <Field label={tt("根拠グレード", "Evidence grade")}><AtlasGrade g={it.g} A={A} /> <span style={{ color: C.sub, fontSize: 12.5 }}>{A.grades[it.g].def}</span></Field> : null}
            <Field label={tt("メタ原理", "Meta-principles")}>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{it.m.map((m) => <AtlasPill key={m} onClick={() => { setOpen(null); setView("insights"); toTop(); }}>{A.meta[m].name}</AtlasPill>)}</div>
            </Field>
            <Field label={tt("ジャンル", "Genres")}>
              <div style={{ display: "grid", gap: 8 }}>
                <div><span style={{ color: C.sub, fontSize: 12 }}>{tt("学問の出自：", "Discipline: ")}</span>{A.disc[X.discOf[it.id]].n}</div>
                {(X.indOf[it.id] || []).length ? <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}><span style={{ color: C.sub, fontSize: 12 }}>{tt("業界：", "Industries: ")}</span>{X.indOf[it.id].map((k) => <AtlasPill key={k} onClick={() => { setOpen(null); setGenre("ind"); setView("genre"); toTop(); }}>{X.indById[k].n}</AtlasPill>)}</div> : null}
                {(X.lensOf[it.id] || []).length ? <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}><span style={{ color: C.sub, fontSize: 12 }}>{tt("専門家レンズ：", "Expert lenses: ")}</span>{X.lensOf[it.id].map((k) => <AtlasPill key={k} onClick={() => { setOpen(null); setGenre("lens"); setView("genre"); toTop(); }}>{X.lensById[k].n}</AtlasPill>)}</div> : null}
              </div>
            </Field>
            <Field label={tt("関連する項目", "Related")}><Chips ids={it.r} /></Field>
            <Field label={tt("この項目を関連に挙げている項目", "Referenced by")}><Chips ids={X.back[it.id]} /></Field>
            {ment.length ? <Field label={tt("深掘りでの登場箇所", "Appears in")}><List items={ment} /></Field> : null}
            <a href={wiki} target="_blank" rel="noopener noreferrer" style={{ color: C.blue, fontSize: 12.5, fontWeight: 700 }}>{tt("Wikipediaで「", "Search Wikipedia for “")}{wq}{tt("」を検索 ↗", "” ↗")}</a>
          </div>
        </Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 14, flexWrap: "wrap" }}>{navBtn(prev, -1)}{navBtn(next, 1)}</div>
      </div>
    );
  }

  // ---- サマリー ----
  const layerCard = (l) => {
    const Lr = A.layers[l];
    const cats = Object.keys(A.cats).filter((c) => A.cats[c].layer === l);
    const max = Math.max(...Object.keys(A.cats).map((c) => X.ALL.filter((i) => i.cat === c).length));
    return (
      <Card key={l} style={{ borderTop: `4px solid ${ATLAS_LAYER[l].color}`, display: "grid", gap: 10, alignContent: "start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><AtlasMark layer={l} /><b style={{ fontFamily: serif, fontSize: 18 }}>{Lr.name}</b><span style={{ color: C.sub, fontSize: 12 }}>{X.ALL.filter((i) => i.layer === l).length}</span></div>
        <div style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: ATLAS_LAYER[l].color }}>{Lr.q}</div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3px 10px", fontSize: 12.5 }}>
          {[[tt("主語", "Subject"), Lr.subj], [tt("文の形", "Form"), Lr.form], [tt("判定", "Test"), Lr.test], [tt("役割", "Role"), Lr.role]].map(([a, b]) => <React.Fragment key={a}><span style={{ color: C.sub }}>{a}</span><span>{b}</span></React.Fragment>)}
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {cats.map((c) => {
            const n = X.ALL.filter((i) => i.cat === c).length;
            return (
              <button key={c} onClick={() => { setFLayer("all"); setFCat(c); setView("catalog"); }} style={{ display: "grid", gridTemplateColumns: "2.4em 1fr auto", gap: "3px 8px", alignItems: "center", border: "none", background: "none", padding: 0, cursor: "pointer", textAlign: "left", fontFamily: sans, color: C.txt, fontSize: 12.5 }}>
                <span style={{ fontWeight: 800, color: ATLAS_LAYER[l].color, fontSize: 11.5 }}>{c}</span><span>{A.cats[c].name}</span><span style={{ color: C.sub, fontVariantNumeric: "tabular-nums" }}>{n}</span>
                <span style={{ gridColumn: "2 / 4", height: 5, borderRadius: 3, background: C.line, overflow: "hidden" }}><span style={{ display: "block", height: "100%", width: `${(n / max) * 100}%`, background: ATLAS_LAYER[l].color }} /></span>
              </button>
            );
          })}
        </div>
      </Card>
    );
  };
  const gradeRow = (label, items, key) => {
    const n = items.length;
    return (
      <div key={key} style={{ display: "grid", gridTemplateColumns: "minmax(7em, 11em) 1fr 2.4em", gap: 10, alignItems: "center", fontSize: 12.5 }}>
        <span>{label}</span>
        <div style={{ display: "flex", height: 16, borderRadius: 4, overflow: "hidden", background: C.line }}>
          {ATLAS_GORDER.map((g) => { const k = items.filter((i) => i.g === g).length; return k ? <span key={g} title={`${g}: ${k}`} style={{ width: `${(k / n) * 100}%`, background: ATLAS_GRADE_COLOR[g], borderRight: "1px solid #fff" }} /> : null; })}
        </div>
        <span style={{ fontVariantNumeric: "tabular-nums", textAlign: "right" }}>{n}</span>
      </div>
    );
  };

  let body = null;
  if (view === "summary") {
    const laws = X.ALL.filter((i) => i.layer === "L");
    body = (
      <div style={{ display: "grid", gap: 22 }}>
        <Card style={{ background: C.ink, border: "none", color: "#fff" }}>
          <h2 style={{ fontFamily: serif, fontSize: 22, margin: 0, color: "#fff" }}>{tt("法則・戦略・フレームワーク体系図", "Atlas of Laws, Strategies & Frameworks")}</h2>
          <p style={{ margin: "6px 0 14px", color: "#93A5C4", fontSize: 13, lineHeight: 1.75 }}>{tt("世の中の法則、勝ち方の型、思考の道具を3層・18カテゴリにMECEで整理し、業界・専門家レンズ・学問の出自の3つのジャンル軸を重ねた。全項目に「生成AI時代の読み替え」と「コンサルの問い」付き。", "Laws of the world, patterns for winning and tools for thinking, organized MECE into 3 layers and 18 categories, overlaid with three genre axes: industry, expert lens and discipline. Every entry carries a generative-AI reading and a consultant's question.")}</p>
          <div style={{ display: "flex", gap: "8px 22px", flexWrap: "wrap" }}>
            {[[X.vals.total, tt("項目", "entries")], [3, tt("層", "layers")], [X.vals.nCat, tt("カテゴリ", "categories")], [Object.keys(A.meta).length, tt("メタ原理", "meta-principles")], [A.industries.length, tt("業界", "industries")], [A.lenses.length, tt("専門家レンズ", "expert lenses")], [Object.keys(A.disc).length, tt("学問領域", "disciplines")], [atlasQuiz().list.length.toLocaleString(), tt("問", "questions")]].map(([n, l]) => (
              <span key={l} style={{ fontSize: 12.5, color: "#93A5C4" }}><b style={{ fontFamily: serif, fontSize: 20, color: C.gold, marginRight: 4 }}>{n}</b>{l}</span>
            ))}
          </div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "#93A5C4" }}>
            <span>{tt("読了", "Read")} {doneCount} / {X.vals.total}</span>
            <span style={{ flex: 1, height: 6, borderRadius: 3, background: "#ffffff22", overflow: "hidden" }}><span style={{ display: "block", height: "100%", width: `${(doneCount / X.vals.total) * 100}%`, background: C.gold }} /></span>
          </div>
        </Card>
        <div>
          <AtlasH sub={tt(`${X.vals.total}の知見を構造化し、層・業界・専門家のレンズをまたいで掘り下げた結論。`, `Conclusions from structuring ${X.vals.total} entries and digging across layers, industries and expert lenses.`)}>{tt("要旨", "Key messages")}</AtlasH>
          {foldAll(A.summary.map((_, i) => "sum" + i))}
          <div style={{ display: "grid", gap: 10 }}>
            {A.summary.map((k, i) => (
              <AtlasFold key={i} open={fo("sum" + i)} onToggle={() => ft("sum" + i)} head={<span style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 10, alignItems: "baseline" }}><span style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.gold }}>{i + 1}</span><b style={{ fontSize: 14.5, lineHeight: 1.5 }}>{fill(k.h)}</b></span>}>
                <span style={{ fontSize: 13, color: C.sub, lineHeight: 1.75, paddingLeft: 38 }}>{fill(k.b)}</span>
              </AtlasFold>
            ))}
          </div>
        </div>
        <div>
          <AtlasH sub={tt("名称ではなく「文の主語」と「文の形」で層を分けた。カテゴリを押すと一覧が開く。", "Layers are split by the subject and the form of the statement, not by name. Tap a category to open its list.")}>{tt("3層の構造", "Three layers")}</AtlasH>
          <div style={{ ...atlasGrid(250), alignItems: "stretch" }}>{ATLAS_LORDER.map(layerCard)}</div>
        </div>
        <div>
          <AtlasH sub={tt(`数学の定理と現場の経験則を同列に並べないよう、法則${X.vals.nL}件を5段階で評価した（本体系図による評価）。`, `To keep theorems and rules of thumb apart, the ${X.vals.nL} laws are graded on five levels (this atlas's own assessment).`)}>{tt("法則の根拠グレード", "Evidence grades of the laws")}</AtlasH>
          <Card style={{ display: "grid", gap: 8 }}>
            {Object.keys(A.cats).filter((c) => A.cats[c].layer === "L").map((c) => gradeRow(`${c} ${A.cats[c].name}`, laws.filter((i) => i.cat === c), c))}
            {gradeRow(tt("法則全体", "All laws"), laws, "all")}
            <div style={{ display: "grid", gap: 4, marginTop: 8, fontSize: 12 }}>
              {ATLAS_GORDER.map((g) => <span key={g} style={{ display: "flex", gap: 8, alignItems: "baseline" }}><span style={{ width: 10, height: 10, borderRadius: 2, background: ATLAS_GRADE_COLOR[g], flex: "none" }} /><b>{g} {A.grades[g].name}</b><span style={{ color: C.sub }}>{tt("（", "(")}{X.gc[g] || 0}{tt("）", ") ")}{A.grades[g].def}</span></span>)}
            </div>
          </Card>
        </div>
      </div>
    );
  } else if (view === "map") {
    body = (
      <div style={{ display: "grid", gap: 22 }}>
        <div>
          <AtlasH sub={tt("カテゴリは層ごとに一つの軸で切り、各項目はどれか一つにだけ属する。点の色は法則の根拠グレード、☑は読了。", "Each layer is cut along a single axis and every entry belongs to exactly one category. Dots show evidence grades of laws; ☑ marks entries you have read.")}>{tt("体系マップ", "Map")}</AtlasH>
          {foldAll([...Object.keys(A.cats).map((c) => "cat" + c), "rules"])}
        </div>
        {ATLAS_LORDER.map((l) => (
          <div key={l}>
            <AtlasHead color={ATLAS_LAYER[l].color} mark={ATLAS_LAYER[l].mark} label={A.layers[l].name} count={X.ALL.filter((i) => i.layer === l).length} sub={A.layers[l].axis} />
            <div style={atlasGrid(220)}>
              {Object.keys(A.cats).filter((c) => A.cats[c].layer === l).map((c) => (
                <AtlasFold key={c} open={fo("cat" + c)} onToggle={() => ft("cat" + c)} head={<span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><b style={{ fontSize: 13.5 }}>{A.cats[c].name}</b><span style={{ fontSize: 11.5, fontWeight: 800, color: ATLAS_LAYER[l].color }}>{c}</span></span>} meta={tt(`${X.ALL.filter((i) => i.cat === c).length}項目`, `${X.ALL.filter((i) => i.cat === c).length} entries`)} accent={ATLAS_LAYER[l].color}>
                  <p style={{ margin: "2px 0 10px", fontSize: 11.5, color: C.sub }}>{A.cats[c].desc}</p>
                  <div style={{ display: "grid", gap: 4 }}>
                    {X.ALL.filter((i) => i.cat === c).map((i) => (
                      <button key={i.id} onClick={() => go(i.id)} style={{ display: "grid", gridTemplateColumns: "auto 3.2em 1fr auto", gap: 6, alignItems: "center", border: `1px solid ${C.line}`, background: "#fff", borderRadius: 7, padding: "5px 8px", cursor: "pointer", textAlign: "left", fontSize: 12.5, fontFamily: sans, color: C.txt }}>
                        <DoneCheck on={done.has(i.id)} onToggle={(e) => done.toggle(i.id, e)} en={lang === "en"} />
                        <span style={{ fontSize: 10.5, fontWeight: 800, color: ATLAS_LAYER[l].color }}>{i.id}</span>
                        <span>{i.n}</span>
                        {i.g ? <span title={`${i.g} ${A.grades[i.g].name}`} style={{ width: 8, height: 8, borderRadius: "50%", background: ATLAS_GRADE_COLOR[i.g] }} /> : <span />}
                      </button>
                    ))}
                  </div>
                </AtlasFold>
              ))}
            </div>
          </div>
        ))}
        <div>
          <AtlasH sub={tt("MECEを担保するための定義と、境界で迷う項目の判定ルール。", "Definitions that keep the taxonomy MECE, and rules for borderline entries.")}>{tt("分類の基準", "Classification rules")}</AtlasH>
          <AtlasFold open={fo("rules")} onToggle={() => ft("rules")} head={<b style={{ fontSize: 13.5 }}>{tt("判定ルール", "Rules")}</b>} meta={A.rules.length} gap={12}>
            {A.rules.map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: "2px 8px" }}>
                <span style={{ fontFamily: serif, fontWeight: 700, color: C.gold, gridRow: "span 2" }}>{i + 1}</span>
                <b style={{ fontSize: 13.5 }}>{r.t}</b><span style={{ fontSize: 12.5, color: C.sub, lineHeight: 1.7 }}>{r.d}</span>
              </div>
            ))}
          </AtlasFold>
        </div>
      </div>
    );
  } else if (view === "catalog") {
    const ql = q.trim().toLowerCase();
    const res = X.ALL.filter((i) =>
      (fLayer === "all" || i.layer === fLayer) && (!fCat || i.cat === fCat) && (!fMeta || i.m.includes(fMeta)) &&
      (!fGrade || i.g === fGrade) && (!fInd || (X.indOf[i.id] || []).includes(fInd)) && (!fLens || (X.lensOf[i.id] || []).includes(fLens)) &&
      (!fDisc || X.discOf[i.id] === fDisc) &&
      (!ql || [i.id, i.n, i.en, i.by, i.y, i.d, i.s, i.c, i.ai, i.ask].join(" ").toLowerCase().includes(ql)));
    const nAct = [fMeta, fGrade, fInd, fLens, fDisc].filter(Boolean).length;
    const sel = (value, set, opts, label) => (
      <label style={{ display: "grid", gap: 3, fontSize: 11.5, color: C.sub, fontWeight: 700 }}>{label}
        <select value={value} onChange={(e) => set(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${C.line}`, fontSize: 13, background: "#fff", color: C.txt, fontFamily: sans }}>
          <option value="">{tt("すべて", "All")}</option>{opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
    );
    body = (
      <div>
        <AtlasH sub={tt("名前・提唱者・本文・AIの読み替え・コンサルの問いを横断検索できる。", "Search names, origins, text, AI readings and consultant questions.")}>{tt("カタログ", "Catalog")}</AtlasH>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <AtlasPill active={fLayer === "all"} onClick={() => setFLayer("all")}>◎ {tt("すべて", "All")}</AtlasPill>
          {ATLAS_LORDER.map((l) => <AtlasPill key={l} color={ATLAS_LAYER[l].color} active={fLayer === l} onClick={() => setFLayer(l)}><span>{ATLAS_LAYER[l].mark}</span>{A.layers[l].name}</AtlasPill>)}
          {fCat ? <AtlasPill active onClick={() => setFCat("")}>{fCat} {A.cats[fCat].name} ×</AtlasPill> : null}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tt("例：ポーター、ネットワーク、損失、エージェント", "e.g. Porter, network, loss, agent")}
          style={{ width: "100%", boxSizing: "border-box", padding: "11px 15px", borderRadius: 9, border: `1.5px solid ${C.line}`, fontSize: 14, marginBottom: 12, fontFamily: sans }} />
        <AtlasFold open={fo("filters")} onToggle={() => ft("filters")} head={<b style={{ fontSize: 13 }}>{tt("詳細な絞り込み", "More filters")}</b>} meta={nAct ? tt(`${nAct}件を適用中`, `${nAct} active`) : null} style={{ marginBottom: 14 }}>
        <div style={atlasGrid(160)}>
          {sel(fMeta, setFMeta, Object.entries(A.meta).map(([k, v]) => [k, v.name]), tt("メタ原理", "Meta-principle"))}
          {sel(fGrade, setFGrade, ATLAS_GORDER.map((g) => [g, `${g} ${A.grades[g].name}`]), tt("根拠グレード", "Evidence grade"))}
          {sel(fInd, setFInd, A.industries.map((x) => [x.id, x.n]), tt("業界", "Industry"))}
          {sel(fLens, setFLens, A.lenses.map((x) => [x.id, x.n]), tt("専門家レンズ", "Expert lens"))}
          {sel(fDisc, setFDisc, Object.entries(A.disc).map(([k, v]) => [k, v.n]), tt("学問の出自", "Discipline"))}
        </div>
        {nAct ? <div><AtlasPill onClick={() => { setFMeta(""); setFGrade(""); setFInd(""); setFLens(""); setFDisc(""); }}>× {tt("絞り込みを解除", "Clear filters")}</AtlasPill></div> : null}
        </AtlasFold>
        <p style={{ color: C.sub, fontSize: 12.5, margin: "0 0 10px" }}>{res.length} {tt("件", "entries")}</p>
        <div style={{ display: "grid", gap: 10 }}>
          {res.map((i) => (
            <Card key={i.id} style={{ padding: "14px 18px", borderLeft: `4px solid ${ATLAS_LAYER[i.layer].color}`, cursor: "pointer" }}>
              <div onClick={() => go(i.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "baseline" }}>
                  <span><DoneCheck on={done.has(i.id)} onToggle={(e) => done.toggle(i.id, e)} en={lang === "en"} /><span style={{ fontSize: 11, fontWeight: 800, color: ATLAS_LAYER[i.layer].color, marginRight: 8 }}>{i.id}</span><b style={{ fontSize: 14.5 }}>{i.n}</b></span>
                  <span style={{ color: C.sub, fontSize: 12.5 }}>{subName(i)}</span>
                </div>
                <p style={{ margin: "6px 0 4px", fontSize: 13, color: C.txt, lineHeight: 1.65 }}>{i.d}</p>
                <p style={{ margin: 0, fontSize: 12.5, color: C.sub, lineHeight: 1.6 }}><b style={{ color: C.teal, fontSize: 11, marginRight: 6 }}>AI</b>{i.ai}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  } else if (view === "genre") {
    const tabs = [["ind", tt("業界別", "Industries")], ["lens", tt("専門家レンズ別", "Expert lenses")], ["disc", tt("学問の出自別", "Disciplines")]];
    let inner = null;
    if (genre === "ind") {
      inner = (
        <div style={{ display: "grid", gap: 14 }}>
          <p style={{ color: C.sub, fontSize: 12.5, margin: 0, lineHeight: 1.7 }}>{tt("GICSの11セクターを基礎に、日本企業の経営論点で重要な単位に再編した12業界（公共・教育はGICS外）。", "12 industries regrouped from the 11 GICS sectors around the issues that matter for Japanese corporates (public sector and education sit outside GICS).")}</p>
          {A.industries.map((x) => (
            <AtlasFold key={x.id} open={fo("ind" + x.id)} onToggle={() => ft("ind" + x.id)} head={<span style={{ display: "grid", gap: 2 }}><span style={{ fontSize: 11, fontWeight: 800, color: C.sub }}>{x.id} · {x.gics}</span><b style={{ fontFamily: serif, fontSize: 17 }}>{x.n}</b><span style={{ fontSize: 12, color: C.sub }}>{x.sub}</span></span>} gap={12}>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.75 }}>{x.econ}</p>
              <div style={atlasGrid(220)}>
                {[["L", x.L, tt("支配的な法則", "Dominant laws")], ["S", x.S, tt("勝ち筋の戦略", "Winning strategies")], ["F", x.F, tt("使うフレームワーク", "Frameworks to use")]].map(([l, ids, h]) => (
                  <div key={l}><p style={{ ...atlasLabel, color: ATLAS_LAYER[l].color }}>{h}</p><Chips ids={ids} /></div>
                ))}
              </div>
              <div style={{ background: C.paper, borderRadius: 10, padding: "12px 14px" }}>
                <p style={{ ...atlasLabel, color: C.teal }}>{tt("生成AIが業界地図を変える3つの点", "Where generative AI redraws the map")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(6em, auto) 1fr", gap: "6px 12px", fontSize: 13, lineHeight: 1.7 }}>
                  {[[tt("コスト構造", "Cost structure"), x.ai.cost], [tt("参入障壁", "Barriers to entry"), x.ai.barrier], [tt("データの複利", "Data compounding"), x.ai.data]].map(([a, b]) => <React.Fragment key={a}><b style={{ color: C.ink }}>{a}</b><span>{b}</span></React.Fragment>)}
                </div>
              </div>
              <div style={atlasGrid(220)}>
                <div><p style={atlasLabel}>{tt("主要KPI", "Key KPIs")}</p><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{x.kpi.map((k) => <span key={k} style={{ fontSize: 12, border: `1px solid ${C.line}`, borderRadius: 12, padding: "2px 10px", background: "#fff" }}>{k}</span>)}</div></div>
                <div><p style={atlasLabel}>{tt("代表的なAIユースケース", "Typical AI use cases")}</p><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{x.uc.map((k) => <span key={k} style={{ fontSize: 12, border: `1px solid ${C.line}`, borderRadius: 12, padding: "2px 10px", background: "#fff" }}>{k}</span>)}</div></div>
              </div>
              <div><p style={atlasLabel}>{tt("コンサルの典型論点", "Typical consulting agenda")}</p><List items={x.agenda} /></div>
              <p style={{ margin: 0, fontSize: 12.5, color: C.sub, lineHeight: 1.7 }}><b style={{ color: C.crimson, marginRight: 8 }}>{tt("規制・ガバナンス", "Regulation & governance")}</b>{x.risk}</p>
            </AtlasFold>
          ))}
        </div>
      );
    } else if (genre === "lens") {
      inner = (
        <div style={atlasGrid(300)}>
          {A.lenses.map((x) => (
            <AtlasFold key={x.id} open={fo("lens" + x.id)} onToggle={() => ft("lens" + x.id)} head={<span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><b style={{ fontFamily: serif, fontSize: 17 }}>{x.n}</b><span style={{ fontSize: 11, fontWeight: 800, color: C.sub }}>{x.id}</span></span>}>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>{x.role}</p>
              <div><p style={atlasLabel}>{tt("判断基準", "Criteria")}</p><List items={x.crit} /></div>
              <div><p style={atlasLabel}>{tt("中核の項目", "Core entries")}</p><Chips ids={x.core} /></div>
              <div><p style={atlasLabel}>{tt("必ず問うこと", "Always ask")}</p><List items={x.ask} /></div>
              <div><p style={atlasLabel}>{tt("典型的な落とし穴", "Typical traps")}</p><List items={x.trap} /></div>
              <div><p style={atlasLabel}>{tt("検証を依頼する相手", "Cross-checks")}</p><List items={x.check} /></div>
            </AtlasFold>
          ))}
        </div>
      );
    } else {
      const max = Math.max(...Object.values(A.disc).map((v) => v.ids.length));
      inner = (
        <div style={{ display: "grid", gap: 14 }}>
          <Card style={{ display: "grid", gap: 6 }}>
            {Object.entries(A.disc).map(([d, v]) => (
              <div key={d} style={{ display: "grid", gridTemplateColumns: "minmax(8em, 13em) 1fr 2.4em", gap: 10, alignItems: "center", fontSize: 12.5 }}>
                <span>{v.n}</span><span style={{ height: 10, borderRadius: 3, background: C.line, overflow: "hidden" }}><span style={{ display: "block", height: "100%", width: `${(v.ids.length / max) * 100}%`, background: C.inkSoft }} /></span><span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{v.ids.length}</span>
              </div>
            ))}
          </Card>
          <div style={atlasGrid(300)}>
            {Object.entries(A.disc).map(([d, v]) => (
              <AtlasFold key={d} open={fo("disc" + d)} onToggle={() => ft("disc" + d)} head={<span style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontFamily: serif, fontSize: 16 }}>{v.n}</b><span style={{ fontSize: 11.5, color: C.sub }}>{v.ids.length}</span></span>}>
                {ATLAS_LORDER.map((l) => { const ids = v.ids.filter((i) => i[0] === l); return ids.length ? <div key={l}><p style={{ ...atlasLabel, color: ATLAS_LAYER[l].color }}>{A.layers[l].name}</p><Chips ids={ids} /></div> : null; })}
              </AtlasFold>
            ))}
          </div>
        </div>
      );
    }
    body = (
      <div>
        <AtlasH>{tt("ジャンル別", "By genre")}</AtlasH>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>{tabs.map(([k, l]) => <AtlasPill key={k} active={genre === k} onClick={() => setGenre(k)}>{l}</AtlasPill>)}</div>
        {foldAll(genre === "ind" ? A.industries.map((x) => "ind" + x.id) : genre === "lens" ? A.lenses.map((x) => "lens" + x.id) : Object.keys(A.disc).map((d) => "disc" + d))}
        {inner}
      </div>
    );
  } else if (view === "insights") {
    body = (
      <div style={{ display: "grid", gap: 26 }}>
        <div>
          {foldAll([...Object.keys(A.meta).map((m) => "meta" + m), ...A.chains.map((_, i) => "chain" + i), ...A.tensions.map((_, i) => "ten" + i), ...A.misuse.map((_, i) => "mis" + i), ...A.aiLens.map((_, i) => "ail" + i)])}
          <AtlasH sub={tt("全項目に背後で働く原理のタグ（重複あり）を付けて束ねた。", "Every entry is tagged with the principles at work behind it (tags may overlap).")}>01 {tt("8つのメタ原理", "Eight meta-principles")}</AtlasH>
          <div style={atlasGrid(280)}>
            {Object.entries(A.meta).map(([m, v]) => {
              const ids = X.ALL.filter((i) => i.m.includes(m)).map((i) => i.id);
              return (
                <AtlasFold key={m} open={fo("meta" + m)} onToggle={() => ft("meta" + m)} head={<span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><b style={{ fontFamily: serif, fontSize: 16 }}>{v.name}</b><span style={{ fontSize: 11.5, color: C.sub }}>{m} · {ids.length}</span></span>} gap={8}>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>{v.def}</p>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, borderLeft: `3px solid ${C.gold}`, paddingLeft: 10 }}>{v.imp}</p>
                  <details><summary style={{ cursor: "pointer", fontSize: 12.5, color: C.sub }}>{tt(`該当する${ids.length}項目`, `${ids.length} entries`)}</summary><div style={{ marginTop: 8 }}><Chips ids={ids} /></div></details>
                </AtlasFold>
              );
            })}
          </div>
        </div>
        <div>
          <AtlasH sub={tt("勝ち筋の背後には法則があり、それを確かめる道具がある。", "Behind every winning move is a law, and a tool to check it.")}>02 {tt("法則 → 戦略 → フレームワークの連鎖", "Chains: law → strategy → framework")}</AtlasH>
          <div style={{ display: "grid", gap: 10 }}>
            {A.chains.map((c, i) => (
              <AtlasFold key={i} open={fo("chain" + i)} onToggle={() => ft("chain" + i)} head={<b style={{ fontFamily: serif, fontSize: 16 }}>{c.t}</b>}>
                <div style={atlasGrid(220)}>
                  {[["L", c.L, tt("法則：なぜ効くか", "Law: why it works"), c.mech[0]], ["S", c.S, tt("戦略：どう勝つか", "Strategy: how to win"), c.mech[1]], ["F", c.F, tt("FW：何で確かめるか", "Framework: how to check"), c.mech[2]]].map(([l, ids, h, m]) => (
                    <div key={l} style={{ display: "grid", gap: 6, alignContent: "start" }}><p style={{ ...atlasLabel, color: ATLAS_LAYER[l].color, margin: 0 }}>{h}</p><span style={{ fontSize: 12.5, color: C.sub, lineHeight: 1.6 }}>{m}</span><Chips ids={ids} /></div>
                  ))}
                </div>
              </AtlasFold>
            ))}
          </div>
        </div>
        <div>
          <AtlasH sub={tt(`${X.vals.nT}つのうち${X.vals.nT3}つは「${A.axes.dist}」「${A.axes.unc}」「${A.axes.rev}」の3軸で決まる。`, `${X.vals.nT3} of the ${X.vals.nT} tensions resolve on three axes: ${A.axes.dist}, ${A.axes.unc}, ${A.axes.rev}.`)}>03 {tt("戦略の二律背反", "Strategic tensions")}</AtlasH>
          <div style={atlasGrid(300)}>
            {A.tensions.map((t, i) => (
              <AtlasFold key={i} open={fo("ten" + i)} onToggle={() => ft("ten" + i)} head={<span style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}><b style={{ fontFamily: serif, fontSize: 16 }}>{t.t}</b><span style={{ fontSize: 11.5, border: `1px solid ${t.axis === "other" ? C.line : C.ink}`, borderRadius: 12, padding: "1px 9px", color: t.axis === "other" ? C.sub : C.ink }}>{A.axes[t.axis]}</span></span>}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "start" }}>
                  <div><p style={{ ...atlasLabel, color: C.ink }}>{t.a.l}</p><Chips ids={t.a.ids} /></div>
                  <span style={{ color: C.crimson, fontWeight: 800, paddingTop: 18 }}>vs</span>
                  <div><p style={{ ...atlasLabel, color: C.ink }}>{t.b.l}</p><Chips ids={t.b.ids} /></div>
                </div>
                {t.rel.length ? <div><p style={atlasLabel}>{tt("両立・判断に使う", "Use to decide")}</p><Chips ids={t.rel} /></div> : null}
                <div style={{ background: C.paper, borderRadius: 8, padding: "10px 12px", fontSize: 13, lineHeight: 1.7 }}>{t.rule}</div>
              </AtlasFold>
            ))}
          </div>
        </div>
        <div>
          <AtlasH sub={tt("失敗の多くは道具の欠陥ではなく使い方の誤りから生まれる。", "Most failures come from misuse, not from the tool.")}>04 {tt("誤用のパターン", "Misuse patterns")}</AtlasH>
          <div style={atlasGrid(280)}>
            {A.misuse.map((p, i) => (
              <AtlasFold key={i} open={fo("mis" + i)} onToggle={() => ft("mis" + i)} head={<b style={{ fontFamily: serif, fontSize: 16 }}>{p.t}</b>} gap={8}>
                <div><p style={{ ...atlasLabel, color: C.crimson }}>{tt("症状", "Symptom")}</p><span style={{ fontSize: 13, lineHeight: 1.7 }}>{p.sym}</span></div>
                <div><p style={{ ...atlasLabel, color: C.green }}>{tt("処方", "Fix")}</p><span style={{ fontSize: 13, lineHeight: 1.7 }}>{p.fix}</span></div>
                <Chips ids={p.ids} />
              </AtlasFold>
            ))}
          </div>
        </div>
        <div>
          <AtlasH sub={tt("生成AIの普及で重みが増す法則と、経営判断への含意。", "Laws that gain weight as generative AI spreads, and what they mean for decisions.")}>05 {tt("生成AI時代のレンズ", "The generative-AI lens")}</AtlasH>
          <div style={atlasGrid(280)}>
            {A.aiLens.map((a, i) => (
              <AtlasFold key={i} open={fo("ail" + i)} onToggle={() => ft("ail" + i)} head={<span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><b style={{ fontSize: 14 }}>{a.t}</b><span style={{ fontSize: 11.5, color: C.sub }}>{String(i + 1).padStart(2, "0")}</span></span>} gap={8}>
                <span style={{ fontSize: 13, color: C.sub, lineHeight: 1.7 }}>{a.b}</span>
                <Chips ids={a.ids} />
              </AtlasFold>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (view === "council") {
    const C2 = A.council;
    const ln = (k) => X.lensById[k].n;
    body = (
      <div style={{ display: "grid", gap: 22 }}>
        <div>
          <p style={{ fontSize: 11.5, fontWeight: 800, color: C.gold, letterSpacing: 1, margin: "0 0 4px" }}>FULL COUNCIL</p>
          <AtlasH sub={tt("8つの専門家レンズで同じ論点を独立に分析し、対立を明示したうえで一つの提言に統合した。", "Eight expert lenses analyse the same issue independently; conflicts are made explicit and synthesised into one recommendation.")}>{C2.q}</AtlasH>
          <Card style={{ background: C.ink, border: "none", color: "#fff" }}>
            <b style={{ fontFamily: serif, fontSize: 16, color: C.gold }}>{tt("エグゼクティブサマリー", "Executive summary")}</b>
            <ol style={{ margin: "8px 0 0", paddingLeft: "1.3em", display: "grid", gap: 6, fontSize: 13, lineHeight: 1.75 }}>{C2.exec.map((x, i) => <li key={i}>{x}</li>)}</ol>
          </Card>
        </div>
        <div>
          {foldAll([...C2.lenses.map((x) => "cl" + x.k), ...C2.conflicts.map((_, i) => "cf" + i), "cn0", "cn1", "cn2"])}
          <AtlasHead color={C.ink} label={tt("レンズ別分析", "Analysis by lens")} count={C2.lenses.length} />
          <div style={atlasGrid(290)}>
            {C2.lenses.map((x) => (
              <AtlasFold key={x.k} open={fo("cl" + x.k)} onToggle={() => ft("cl" + x.k)} head={<span style={{ display: "grid", gap: 4 }}><span style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontFamily: serif, fontSize: 16 }}>{ln(x.k)}</b><span style={{ fontSize: 11, color: C.sub, fontWeight: 800 }}>{x.k}</span></span><span style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.6 }}>{x.c}</span></span>} gap={8}>
                {[[tt("根拠", "Rationale"), x.why], [tt("最大の懸念", "Biggest concern"), x.worry], [tt("前提の確認事項", "Assumption to confirm"), x.conf]].map(([a, b]) => <div key={a}><p style={atlasLabel}>{a}</p><span style={{ fontSize: 12.5, lineHeight: 1.7 }}>{b}</span></div>)}
                <Chips ids={x.ids} />
              </AtlasFold>
            ))}
          </div>
        </div>
        <div>
          <AtlasHead color={C.crimson} label={tt("対立点とトレードオフ", "Conflicts and trade-offs")} count={C2.conflicts.length} />
          <div style={atlasGrid(290)}>
            {C2.conflicts.map((x, i) => (
              <AtlasFold key={i} open={fo("cf" + i)} onToggle={() => ft("cf" + i)} head={<span style={{ display: "grid", gap: 6 }}><span style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}><span style={{ background: C.ink, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 12.5, fontWeight: 800 }}>{ln(x.a)}</span><span style={{ color: C.crimson, fontWeight: 800 }}>vs</span><span style={{ background: C.gold, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 12.5, fontWeight: 800 }}>{ln(x.b)}</span></span><span style={{ fontSize: 14, fontWeight: 700 }}>{x.t}</span></span>} gap={8}>
                <span style={{ fontSize: 12.5, color: C.sub, lineHeight: 1.7 }}>{x.d}</span>
                <div style={{ background: C.paper, borderRadius: 8, padding: "10px 12px", fontSize: 13, lineHeight: 1.7 }}><b style={{ color: C.green, marginRight: 8 }}>{tt("統合の仕方", "Resolution")}</b>{x.r}</div>
              </AtlasFold>
            ))}
          </div>
        </div>
        <Card>
          <b style={{ fontFamily: serif, fontSize: 16 }}>{tt("統合提言", "Integrated recommendation")}</b>
          <ol style={{ margin: "8px 0 0", paddingLeft: "1.3em", display: "grid", gap: 6, fontSize: 13, lineHeight: 1.75 }}>{C2.synthesis.map((x, i) => <li key={i}>{x}</li>)}</ol>
        </Card>
        <div style={atlasGrid(260)}>
          {[[tt("仮定一覧", "Assumptions"), C2.assumptions], [tt("反証条件", "Falsification conditions"), C2.falsify], [tt("次のアクション", "Next actions"), C2.next]].map(([h, items], ci) => (
            <AtlasFold key={h} open={fo("cn" + ci)} onToggle={() => ft("cn" + ci)} head={<b style={{ fontFamily: serif, fontSize: 15 }}>{h}</b>} meta={items.length} gap={8}><List items={items} /></AtlasFold>
          ))}
        </div>
      </div>
    );
  } else if (view === "guide") {
    body = (
      <div>
        <AtlasH sub={tt("経営の問いを5W2H＋AIで分け、確認すべき法則・検討する戦略・使うフレームワークを対応させた。", "Management questions split by 5W2H plus AI, each mapped to the laws to check, strategies to consider and frameworks to use.")}>{tt("問い別ガイド", "Question guide")}</AtlasH>
        {foldAll(A.guide.map((g) => "gd" + g.w))}
        <div style={{ display: "grid", gap: 10 }}>
          {A.guide.map((g) => (
            <AtlasFold key={g.w} open={fo("gd" + g.w)} onToggle={() => ft("gd" + g.w)} head={<span><span style={{ fontSize: 11.5, fontWeight: 800, color: C.gold, letterSpacing: 0.5 }}>{g.w}</span><b style={{ display: "block", fontFamily: serif, fontSize: 16 }}>{g.q}</b></span>} gap={12}>
              <div style={atlasGrid(220)}>
                {[["L", g.L, tt("確認すべき法則", "Laws to check")], ["S", g.S, tt("検討する戦略", "Strategies to consider")], ["F", g.F, tt("使うフレームワーク", "Frameworks to use")]].map(([l, ids, h]) => (
                  <div key={l}><p style={{ ...atlasLabel, color: ATLAS_LAYER[l].color }}>{h}</p>{ids.length ? <Chips ids={ids} /> : <span style={{ color: C.sub, fontSize: 12.5 }}>{tt("— まず原因を特定する", "— diagnose the cause first")}</span>}</div>
                ))}
              </div>
            </AtlasFold>
          ))}
        </div>
      </div>
    );
  } else if (view === "quiz") {
    const { list: ATLAS_Q, by: ATLAS_QBY } = atlasQuiz();
    const TYPE = { def: tt("説明→名称", "Description → entry"), cat: tt("名称→カテゴリ", "Entry → category"), ask: tt("問い→名称", "Question → entry"), ai: tt("AI読み替え→名称", "AI reading → entry"), by: tt("名称→提唱者", "Entry → origin") };
    const now = Date.now();
    const pool = ATLAS_Q.filter((q) => (qLayer === "all" || q.item[0] === qLayer) && (qType === "all" || q.t === qType));
    const dueIds = dueCards(qCards, now).map((c) => c.id).filter((id) => ATLAS_QBY[id]);
    const ansIds = Object.keys(qStats).filter((id) => ATLAS_QBY[id]);
    const okN = ansIds.filter((id) => qStats[id].ok).length;
    const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
    const startPractice = () => {
      const wrong = pool.filter((q) => qStats[q.id] && !qStats[q.id].ok), fresh = pool.filter((q) => !qStats[q.id]), rest = pool.filter((q) => qStats[q.id] && qStats[q.id].ok);
      const ids = [...shuffle(wrong), ...shuffle(fresh), ...shuffle(rest)].slice(0, 10).map((q) => q.id);
      if (ids.length) setQs({ ids, pos: 0, picked: null, score: 0, mode: "practice" });
    };
    const startReview = () => { if (dueIds.length) setQs({ ids: dueIds.slice(0, 20), pos: 0, picked: null, score: 0, mode: "review" }); };
    const answer = (q, pos) => {
      if (qs.picked != null) return;
      const ok = q.perm[pos] === q.a, t0 = Date.now();
      const ns = { ...qStats, [q.id]: { ok, t: t0 } };
      const nc = { ...qCards, [q.id]: schedule(qCards[q.id] || newCard(q.id, t0), ok ? 2 : 0, t0) };
      setQStats(ns); setQCards(nc);
      try { window.storage.set(ATLAS_QKEY, JSON.stringify(ns)); window.storage.set(ATLAS_SRKEY, JSON.stringify(nc)); } catch (e) {}
      setQs({ ...qs, picked: pos, score: qs.score + (ok ? 1 : 0) });
    };
    const btn = (bg, fg, bd) => ({ background: bg, color: fg, border: bd ? `1.5px solid ${C.line}` : "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: sans });
    if (!qs) {
      body = (
        <div style={{ display: "grid", gap: 16 }}>
          <AtlasH sub={tt("226項目から自動生成した4択。答えた問題は忘却曲線（SM-2）で復習の時期を管理し、体系図の各項目に戻って確認できる。", "Four-option questions generated from the 226 entries. Answers feed an SM-2 forgetting-curve schedule, and every answer links back to its entry.")}>{tt("体系図クイズ", "Atlas quiz")}</AtlasH>
          <Card style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: "8px 22px", flexWrap: "wrap" }}>
              {[[ATLAS_Q.length.toLocaleString(), tt("問", "questions")], [ansIds.length, tt("回答済み", "answered")], [ansIds.length ? Math.round((okN / ansIds.length) * 100) + "%" : "—", tt("正答率", "accuracy")], [dueIds.length, tt("復習待ち", "due for review")]].map(([n, l]) => (
                <span key={l} style={{ fontSize: 12.5, color: C.sub }}><b style={{ fontFamily: serif, fontSize: 20, color: C.ink, marginRight: 4 }}>{n}</b>{l}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              <AtlasPill active={qLayer === "all"} onClick={() => setQLayer("all")}>◎ {tt("すべての層", "All layers")}</AtlasPill>
              {ATLAS_LORDER.map((l) => <AtlasPill key={l} color={ATLAS_LAYER[l].color} active={qLayer === l} onClick={() => setQLayer(l)}><span>{ATLAS_LAYER[l].mark}</span>{A.layers[l].name}</AtlasPill>)}
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              <AtlasPill active={qType === "all"} onClick={() => setQType("all")}>{tt("すべての形式", "All formats")}</AtlasPill>
              {Object.entries(TYPE).map(([k, v]) => <AtlasPill key={k} active={qType === k} onClick={() => setQType(k)}>{v}</AtlasPill>)}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={startPractice} disabled={!pool.length} style={btn(C.blue, "#fff")}>{tt("10問に挑戦", "Start 10 questions")} →</button>
              <button onClick={startReview} disabled={!dueIds.length} style={{ ...btn("#fff", dueIds.length ? C.ink : C.line, true) }}>{tt("復習する", "Review")}（{dueIds.length}）</button>
              <span style={{ fontSize: 12, color: C.sub }}>{tt(`対象 ${pool.length} 問。間違えた問題と未回答の問題を優先して出題する。`, `${pool.length} in scope. Wrong and unanswered questions come first.`)}</span>
            </div>
          </Card>
          <Card style={{ display: "grid", gap: 8 }}>
            <p style={atlasLabel}>{tt("形式別の到達度", "Progress by format")}</p>
            {Object.entries(TYPE).map(([k, v]) => {
              const all = ATLAS_Q.filter((q) => q.t === k), a = all.filter((q) => qStats[q.id]), c = a.filter((q) => qStats[q.id].ok);
              return (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "minmax(9em, 12em) 1fr 6.5em", gap: 10, alignItems: "center", fontSize: 12.5 }}>
                  <span>{v}</span>
                  <span style={{ height: 8, borderRadius: 4, background: C.line, overflow: "hidden", display: "flex" }}><span style={{ width: `${(c.length / all.length) * 100}%`, background: C.green }} /><span style={{ width: `${((a.length - c.length) / all.length) * 100}%`, background: C.red }} /></span>
                  <span style={{ textAlign: "right", color: C.sub, fontVariantNumeric: "tabular-nums" }}>{c.length}/{all.length}</span>
                </div>
              );
            })}
          </Card>
        </div>
      );
    } else if (qs.pos >= qs.ids.length) {
      const wrongItems = [...new Set(qs.ids.filter((id) => qStats[id] && !qStats[id].ok).map((id) => ATLAS_QBY[id].item))];
      body = (
        <Card style={{ display: "grid", gap: 14, textAlign: "center" }}>
          <b style={{ fontFamily: serif, fontSize: 20 }}>{tt("結果", "Result")}</b>
          <span style={{ fontFamily: serif, fontSize: 40, color: C.ink }}>{qs.score} / {qs.ids.length}</span>
          {wrongItems.length ? <div style={{ textAlign: "left" }}><p style={atlasLabel}>{tt("間違えた項目（復習キューに入った）", "Missed entries (added to the review queue)")}</p><Chips ids={wrongItems} /></div> : <span style={{ color: C.green, fontWeight: 800 }}>{tt("全問正解", "All correct")}</span>}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => { setQs(null); setTimeout(startPractice, 0); }} style={btn(C.blue, "#fff")}>{tt("次の10問", "Next 10")} →</button>
            <button onClick={() => setQs(null)} style={btn("#fff", C.ink, true)}>{tt("終了", "Finish")}</button>
          </div>
        </Card>
      );
    } else {
      const q = ATLAS_QBY[qs.ids[qs.pos]];
      const it = X.BY[q.item], lay = ATLAS_LAYER[it.layer];
      const done_ = qs.picked != null, ok = done_ && q.perm[qs.picked] === q.a;
      body = (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 10, flexWrap: "wrap" }}>
            <span style={{ color: lay.color, fontSize: 12, fontWeight: 800 }}>{lay.mark} {A.layers[it.layer].name} · {TYPE[q.t]}{qs.mode === "review" ? tt(" · 復習", " · review") : ""}</span>
            <span style={{ color: C.sub, fontSize: 12 }}>{tt("問", "Q")} {qs.pos + 1} / {qs.ids.length}</span>
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 18, margin: "0 0 14px", lineHeight: 1.55 }}>{tt(q.p.ja, q.p.en)}</h2>
          {q.stem ? <div style={{ background: C.paper, borderRadius: 8, padding: "12px 14px", fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>{tt(q.stem.ja, q.stem.en)}</div> : null}
          <div style={{ display: "grid", gap: 10 }}>
            {q.perm.map((oi, pos) => {
              const isPicked = qs.picked === pos, isAns = oi === q.a;
              let border = C.line, bg = "#fff";
              if (done_ && isAns) { border = C.green; bg = "#EBFAF1"; }
              else if (done_ && isPicked && !isAns) { border = C.red; bg = "#FEECEB"; }
              return (
                <button key={pos} onClick={() => answer(q, pos)} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 9, border: `1.8px solid ${border}`, background: bg, fontSize: 14, cursor: done_ ? "default" : "pointer", color: C.txt, lineHeight: 1.5, fontFamily: sans }}>
                  <b style={{ color: C.sub, marginRight: 8 }}>{String.fromCharCode(65 + pos)}</b>{tt(q.o[oi].ja, q.o[oi].en)}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={() => setQs(null)} style={btn("#fff", C.ink, true)}>{tt("中断", "Quit")}</button>
            {done_ ? <span style={{ fontWeight: 800, color: ok ? C.green : C.red }}>{ok ? tt("正解", "Correct") : tt("不正解", "Incorrect")}</span> : null}
            <span style={{ flex: 1 }} />
            <button onClick={() => done_ && setQs({ ...qs, pos: qs.pos + 1, picked: null })} disabled={!done_} style={{ ...btn(done_ ? C.blue : C.line, "#fff"), cursor: done_ ? "pointer" : "default" }}>{qs.pos + 1 < qs.ids.length ? tt("次へ", "Next") : tt("結果を見る", "See result")} →</button>
          </div>
          {done_ ? (
            <div style={{ marginTop: 16, background: C.paper, borderLeft: `4px solid ${lay.color}`, borderRadius: 8, padding: "13px 16px" }}>
              <b style={{ fontSize: 12, color: lay.color }}>{tt("解説", "Explanation")}</b>
              <p style={{ margin: "6px 0 10px", fontSize: 13.5, lineHeight: 1.7 }}>{tt(q.x.ja, q.x.en)}</p>
              <button onClick={() => go(q.item)} style={{ background: "#fff", color: C.ink, border: `1.5px solid ${C.line}`, borderRadius: 8, padding: "7px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: sans }}>{tt("体系図で開く", "Open in atlas")}（{q.item}）→</button>
            </div>
          ) : null}
        </Card>
      );
    }
  }

  return (
    <div>
      {nav}
      {body}
      <p style={{ marginTop: 26, color: C.sub, fontSize: 11.5, lineHeight: 1.7 }}>
        {tt("根拠グレード、メタ原理・ジャンルの割り当て、業界プロファイル、カウンシル分析は本体系図による整理であり、学術的な合意ではない。カウンシルの数値（6か月・3部門など）は判断の目安として置いた仮定値。",
          "Evidence grades, meta-principle and genre assignments, industry profiles and the council analysis are this atlas's own synthesis, not an academic consensus. Figures in the council (six months, three departments) are working assumptions.")}
      </p>
    </div>
  );
}

  return ConsultingThinkingHub;
})();
