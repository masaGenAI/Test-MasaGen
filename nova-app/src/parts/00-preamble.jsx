// @@nova-part 00-preamble.jsx
import React, { useState, useEffect, useMemo, useRef, useCallback, useContext, createContext } from "react";
import { Waves, Clock3, Users, Brain, Cpu, BookOpen, Layers, ChevronRight, ArrowLeft, Check, Circle, X, Star, Sun, Moon, Globe, RotateCcw } from "lucide-react";
// Book-Summary ハブ（public/booksummaryhub.html）とリベラルアーツ（public/liberal-arts.html）は本体に埋め込まず、
// ハブを開いたときに別ファイルとして読み込む（novaHubHtml）。ポータルの件数はビルド時に数えた __NOVA_HUB_STATS__ を使う。
// 大きい React のハブ（Finance・TechHub・Consulting・Certification・Side Work・Linguistics の6つ。一覧は vite.config.js の novaLazyHubs）は
// このファイルの中で書くが、ビルドでは別ファイルに切り出して開いたときに読み込む（scripts/lazy-hubs.mjs・novaLazyHub）。
// ポータルからこれらのハブの中身を読むときは、その説明を参照。
// 学習ロードマップ トラッカー（資格/Tools/講座/書籍/Udemy の一元管理・自動保存つき表アプリ）
import LEARNING_TRACKER_HTML from "../public/learning-tracker.html?raw";
// Anything Memo トラッカー（調べ済みノートの一覧・検索・ジャンル別・自動保存）
import ANYTHING_MEMO_HTML from "../public/anything-memo.html?raw";
// TechHub「AIフォーサイト」のブリーフと情報源ライブラリ（情報源は月次メンテナンスで nova-app/scripts/foresight_linkcheck.py が更新する）
import FORESIGHT from "./data/foresight-briefs.json";
import FORESIGHT_SOURCES from "./data/foresight-sources.json";
import FORESIGHT_COLLECTION from "./data/foresight-collection.json";
import FORESIGHT_THEMES from "./data/foresight-collection-themes.json";
import ITSEC from "./data/itsec-concepts.json";
import ITSEC_EN from "./data/itsec-concepts.en.json";
// ITセキュリティ用語の英訳（別ファイル）を、同じ id の概念に nameEn・defEn などとして重ねる
ITSEC_EN.forEach((e) => { const c = ITSEC.find((x) => x.id === e.id); if (c) Object.assign(c, e); });
const itL = (c, k, en) => (c ? (en && c[k + "En"]) || c[k] : "");
import ITSEC_TAX from "./data/itsec-taxonomy.json";
import ITSEC_SCEN from "./data/itsec-scenarios.json";
import ITSEC_PRAC from "./data/itsec-practice.json";

// =============================================================================
// QUIZ SAVE SLOT — ゲームのセーブのように、クイズの途中経過を1スロット保存/再開する
// （全ハブのモジュールIIFEから参照できるよう、必ずトップレベルに置く）
// =============================================================================
function nowMs() { try { return Date.now(); } catch (e) { return 0; } }
async function loadQuizSave(key) {
  try { const r = await window.storage.get(key); return r && r.value ? JSON.parse(r.value) : null; } catch (e) { return null; }
}
async function writeQuizSave(key, data) {
  try { await window.storage.set(key, data ? JSON.stringify(data) : ""); } catch (e) {}
}
// key ごとに1件の途中セーブを管理するフック。save()で保存、read()で復元用データ取得、remove()で削除。
function useQuizSlot(key) {
  const [meta, setMeta] = useState(null); // 保存があれば {t, label}
  useEffect(() => {
    let ok = true;
    loadQuizSave(key).then((d) => { if (ok) setMeta(d ? { t: d.__t || 0, label: d.__label || "" } : null); });
    return () => { ok = false; };
  }, [key]);
  const save = async (payload, label) => {
    const d = { ...payload, __t: nowMs(), __label: label || "" };
    await writeQuizSave(key, d);
    setMeta({ t: d.__t, label: d.__label });
  };
  const remove = async () => { await writeQuizSave(key, null); setMeta(null); };
  const read = () => loadQuizSave(key);
  return { meta, save, remove, read };
}
// key ごとに「完了チェック集合」を端末内へ自動保存するフック。
// has(id)=チェック済みか / toggle(id, e)=切替。ドメインチップ・模試セット・ケース単位で使う。
function useDoneSet(key) {
  const [done, setDone] = useState({});
  useEffect(() => {
    let ok = true;
    (async () => {
      try { const r = await window.storage.get(key); if (ok && r && r.value) setDone(JSON.parse(r.value)); } catch (e) {}
    })();
    return () => { ok = false; };
  }, [key]);
  const has = (id) => !!done[id];
  const toggle = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      try { window.storage.set(key, JSON.stringify(next)); } catch (_) {}
      return next;
    });
  };
  return { has, toggle };
}
// 完了チェックの小さな四角（☐/☑）。ボタン等の中に置く場合はクリックを親に伝播させない。
function DoneCheck({ on, onToggle, size = 13, en }) {
  return (
    <span role="checkbox" aria-checked={!!on} tabIndex={0}
      onClick={(e) => onToggle(e)}
      title={en ? "Toggle done" : "完了にする / 解除"}
      style={{ cursor: "pointer", fontSize: size, lineHeight: 1, userSelect: "none", color: on ? "#16A34A" : "currentColor", opacity: on ? 1 : .75, marginRight: 5 }}>
      {on ? "☑" : "☐"}
    </span>
  );
}
// 図解カードをインタラクティブな折りたたみ（番号つきカラーノード＋左アクセント）で表示。
// 資格ハブごとに配色(C)が異なるため、色は props で受け取る。
const DIAG_PALETTE = ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626", "#db2777", "#4f46e5", "#0d9488", "#9333ea"];
function AccordionCard({ n, h, b, accent, mid, deep, ink, defaultOpen, diagram, lang, terms }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const hasDiag = diagram && (diagram.nodes || []).length > 0;
  return (
    <div style={{ background: "#fff", border: `1px solid ${mid}`, borderLeft: `5px solid ${accent}`, borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", textAlign: "left", background: open ? "#f8fafc" : "#fff", border: "none", cursor: "pointer", padding: "13px 15px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: accent, color: nvInk("#ffffff", accent), display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>{n}</span>
        <span style={{ flex: 1, fontSize: 13.5, fontWeight: 800, color: deep }}>{h}</span>
        {hasDiag ? <span style={{ fontSize: 10.5, color: nvInk(accent, "#f8fafc"), fontWeight: 700, marginRight: 4 }}>◨ {lang === "en" ? "diagram" : "図解"}</span> : null}
        <span style={{ color: nvInk(accent, "#f8fafc", 3), fontSize: 16, fontWeight: 800, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div style={{ padding: "2px 16px 14px clamp(14px, 5vw, 51px)", fontSize: 13, lineHeight: 1.75, color: ink }}>
          {hasDiag ? <FlowDiagram graph={diagram} lang={lang} terms={terms} /> : null}
          {b}
          {terms ? <TermStrip text={typeof b === "string" ? b : ""} terms={terms} lang={lang} /> : null}
        </div>
      ) : null}
    </div>
  );
}
// ====== 資格ごとのSVGフロー図データ（アセンブラで注入） ======
const CARD_DIAGRAMS = {"GH-600": [{"titleJa": "D1: アーキテクチャとSDLC", "titleEn": "D1: Architecture & SDLC", "nodes": [{"id": "n1", "labelJa": "エージェント×SDLC", "labelEn": "Agent x SDLC", "detailJa": "エージェントをSDLCの各段階に統合する全体像。", "detailEn": "Overall picture of integrating agents into each SDLC stage."}, {"id": "n2", "labelJa": "SDLC統合", "labelEn": "SDLC integration", "detailJa": "実行ステップ・アンチパターン・入出力/成功基準を定義。", "detailEn": "Define execution steps, anti-patterns, and I/O success criteria."}, {"id": "n3", "labelJa": "計画と実行の分離", "labelEn": "Plan/action split", "detailJa": "構造化プランを検証し、承認前は行動させない。", "detailEn": "Validate structured plans; no action before approval."}, {"id": "n4", "labelJa": "観測性と自律度", "labelEn": "Observability & autonomy", "detailJa": "適切な自律度と検査可能なアーティファクトを両立。", "detailEn": "Balance right-sized autonomy with inspectable artifacts."}, {"id": "n5", "labelJa": "承認前は非実行", "labelEn": "No act pre-approval", "detailJa": "プラン検証を経てから初めて行動を許可する。", "detailEn": "Allow action only after plan validation passes."}, {"id": "n6", "labelJa": "検査可能な記録", "labelEn": "Inspectable records", "detailJa": "後から検証できるアーティファクトを残す。", "detailEn": "Leave artifacts that can be inspected later."}, {"id": "n7", "labelJa": "納期を落とさぬ介入", "labelEn": "Non-blocking oversight", "detailJa": "人的介入を挟みつつ納期を遅らせない設計。", "detailEn": "Human intervention that doesn't slow delivery."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n1", "n4"], ["n3", "n5"], ["n4", "n6"], ["n4", "n7"]]}, {"titleJa": "D2: ツール・MCP・環境", "titleEn": "D2: Tools, MCP & Environments", "nodes": [{"id": "n1", "labelJa": "ツール選定/最小権限", "labelEn": "Select tools/least-priv", "detailJa": "エージェントに与えるツールと権限を最小限に選定。", "detailEn": "Select agent tools with least-privilege permissions."}, {"id": "n2", "labelJa": "MCPサーバー設定", "labelEn": "Configure MCP servers", "detailJa": "GitHubリモートMCP・レジストリ・許可リストを設定。", "detailEn": "Configure GitHub remote MCP, registries, allow lists."}, {"id": "n3", "labelJa": "開発環境へ統合", "labelEn": "Integrate dev env", "detailJa": "リポジトリ/ブランチスコープとCI起動を統合。", "detailEn": "Integrate repo/branch scope and CI invocation."}, {"id": "n4", "labelJa": "自律的な実行", "labelEn": "Autonomous execution", "detailJa": "自律的にブランチ作成やPR作成を行う。", "detailEn": "Autonomously create branches and PRs."}, {"id": "n5", "labelJa": "エラー処理/リトライ", "labelEn": "Error handling/retry", "detailJa": "失敗時のエラー処理とリトライを実装。", "detailEn": "Implement error handling and retries on failure."}, {"id": "n6", "labelJa": "ロールバック", "labelEn": "Rollback", "detailJa": "問題発生時に安全に変更を戻す。", "detailEn": "Safely revert changes when issues occur."}, {"id": "n7", "labelJa": "エスカレーション/追跡", "labelEn": "Escalation/traceability", "detailJa": "人へのエスカレーションと追跡可能性を確保。", "detailEn": "Ensure escalation to humans and traceability."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"]]}, {"titleJa": "D3: メモリと状態", "titleEn": "D3: Memory & State", "nodes": [{"id": "n1", "labelJa": "メモリと状態管理", "labelEn": "Memory & state mgmt", "detailJa": "エージェントの記憶と状態管理の全体構造。", "detailEn": "Overall structure of agent memory and state management."}, {"id": "n2", "labelJa": "短期メモリ", "labelEn": "Short-term memory", "detailJa": "対話内など一時的に保持するメモリ。", "detailEn": "Memory held temporarily, e.g. within a conversation."}, {"id": "n3", "labelJa": "長期メモリ", "labelEn": "Long-term memory", "detailJa": "セッションを超えて保持するメモリ。", "detailEn": "Memory retained across sessions."}, {"id": "n4", "labelJa": "外部メモリ", "labelEn": "External memory", "detailJa": "外部ストアに保持しスコープを管理するメモリ。", "detailEn": "Memory kept in an external store with managed scope."}, {"id": "n5", "labelJa": "失効/剪定/リセット", "labelEn": "Expire/prune/reset", "detailJa": "不要になったメモリを失効・剪定・リセット。", "detailEn": "Expire, prune, or reset memory no longer needed."}, {"id": "n6", "labelJa": "永続アーティファクト化", "labelEn": "Persist as artifact", "detailJa": "進捗を永続的なアーティファクトとして保存。", "detailEn": "Persist progress as a durable artifact."}, {"id": "n7", "labelJa": "ドリフト検出と是正", "labelEn": "Detect & fix drift", "detailJa": "状態のずれを検出し矛盾なく是正する。", "detailEn": "Detect state drift and correct it without conflict."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n1", "n4"], ["n1", "n5"], ["n5", "n6"], ["n6", "n7"]]}, {"titleJa": "D4: 評価とチューニング", "titleEn": "D4: Evaluation & Tuning", "nodes": [{"id": "n1", "labelJa": "成功基準/シグナル定義", "labelEn": "Define success signals", "detailJa": "意図に沿った定性/定量の評価シグナルを定義。", "detailEn": "Define qualitative/quantitative signals aligned to intent."}, {"id": "n2", "labelJa": "自動スキャンで生成", "labelEn": "Generate via scanning", "detailJa": "コード/シークレットスキャンやテストでシグナル生成。", "detailEn": "Generate signals via code/secret scanning and tests."}, {"id": "n3", "labelJa": "失敗分析", "labelEn": "Analyze failures", "detailJa": "ログ/プラン/トレース/アーティファクトを分析。", "detailEn": "Analyze logs, plans, traces, and artifacts."}, {"id": "n4", "labelJa": "根本原因の分類", "labelEn": "Classify root cause", "detailJa": "失敗の根本原因を分類する。", "detailEn": "Classify the root cause of failures."}, {"id": "n5", "labelJa": "指示のチューニング", "labelEn": "Tune instructions", "detailJa": "エージェントへの指示を調整する。", "detailEn": "Tune the instructions given to the agent."}, {"id": "n6", "labelJa": "ワークフロー/メモリ調整", "labelEn": "Tune workflow/memory", "detailJa": "ワークフローとメモリ設定を調整する。", "detailEn": "Tune workflows and memory settings."}, {"id": "n7", "labelJa": "ツールアクセス調整", "labelEn": "Tune tool access", "detailJa": "付与するツールアクセスを調整する。", "detailEn": "Tune the tool access granted to the agent."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n4", "n6"], ["n4", "n7"]]}, {"titleJa": "D5: マルチエージェント連携", "titleEn": "D5: Multi-agent Orchestration", "nodes": [{"id": "n1", "labelJa": "パターン適用", "labelEn": "Apply patterns", "detailJa": "オーケストレーションパターンを適用する。", "detailEn": "Apply orchestration patterns."}, {"id": "n2", "labelJa": "並列実行のための分離", "labelEn": "Isolate for parallel", "detailJa": "並列実行できるようエージェントを分離。", "detailEn": "Isolate agents so they can run in parallel."}, {"id": "n3", "labelJa": "競合検出/解消", "labelEn": "Detect/resolve conflict", "detailJa": "変更重複や作業重複の競合を検出し解消。", "detailEn": "Detect and resolve overlapping-change conflicts."}, {"id": "n4", "labelJa": "監査アーティファクト", "labelEn": "Audit artifacts", "detailJa": "監査可能なアーティファクトとハンドオフを記録。", "detailEn": "Record audit-ready artifacts and handoffs."}, {"id": "n5", "labelJa": "失敗からの回復", "labelEn": "Recover from failure", "detailJa": "劣化や失敗からロールバックで回復。", "detailEn": "Recover from failure/degradation via rollback."}, {"id": "n6", "labelJa": "人間関与での回復", "labelEn": "Human-in-the-loop", "detailJa": "必要に応じ人間が介入して回復する。", "detailEn": "A human intervenes to help recovery when needed."}, {"id": "n7", "labelJa": "ライフサイクル管理", "labelEn": "Lifecycle management", "detailJa": "監査性を保ちエージェントを追加/置換/廃止。", "detailEn": "Add/replace/retire agents while preserving auditability."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"]]}, {"titleJa": "D6: ガードレールと説明責任", "titleEn": "D6: Guardrails & Accountability", "nodes": [{"id": "n1", "labelJa": "行動をリスクで分類", "labelEn": "Classify action risk", "detailJa": "運用/セキュリティ/コンプライアンスの観点で分類。", "detailEn": "Classify actions by operational/security/compliance risk."}, {"id": "n2", "labelJa": "自律度レベルの割当", "labelEn": "Assign autonomy level", "detailJa": "リスクに応じ自律度レベルを割り当てる。", "detailEn": "Assign autonomy levels based on risk."}, {"id": "n3", "labelJa": "人間判断が必要な行動", "labelEn": "Flag human-judgment acts", "detailJa": "人間の判断が必要な行動を特定する。", "detailEn": "Identify actions that need human judgment."}, {"id": "n4", "labelJa": "ポリシー違反をブロック", "labelEn": "Block policy violations", "detailJa": "ポリシー違反となる行動をブロックする。", "detailEn": "Block actions that violate policy."}, {"id": "n5", "labelJa": "最小権限の適用", "labelEn": "Enforce least privilege", "detailJa": "最小権限の原則を適用する。", "detailEn": "Enforce the principle of least privilege."}, {"id": "n6", "labelJa": "不可逆変更は統制経路", "labelEn": "Controlled path for risk", "detailJa": "不可逆/コンプライアンス影響の大きい変更を統制。", "detailEn": "Route irreversible/compliance-sensitive changes through controls."}, {"id": "n7", "labelJa": "低価値承認を削減", "labelEn": "Cut low-value approvals", "detailJa": "速度を維持するため低価値な承認を減らす。", "detailEn": "Reduce low-value approvals to preserve velocity."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n3", "n4"], ["n2", "n5"], ["n5", "n6"], ["n6", "n7"]]}, {"titleJa": "Copilot拡張：2つの形態", "titleEn": "Copilot Extensions: 2 Forms", "nodes": [{"id": "n1", "labelJa": "Copilot Extensions", "labelEn": "Copilot Extensions", "detailJa": "外部サービス/独自ツールと統合する2つの形態。", "detailEn": "Two forms for integrating external services/custom tools."}, {"id": "n2", "labelJa": "エージェント", "labelEn": "Agent", "detailJa": "会話全体を制御する統合形態。", "detailEn": "A form that controls the entire conversation."}, {"id": "n3", "labelJa": "スキルセット", "labelEn": "Skillset", "detailJa": "API機能のみを公開する軽量な形態。", "detailEn": "A lightweight form that just exposes API functions."}, {"id": "n4", "labelJa": "会話全体を制御", "labelEn": "Controls conversation", "detailJa": "複雑な多段階対話に向く。", "detailEn": "Suited to complex multi-turn interaction."}, {"id": "n5", "labelJa": "独自LLM呼び出し", "labelEn": "Calls own LLM", "detailJa": "エージェント自身のLLMを呼び出せる。", "detailEn": "Can call its own LLM."}, {"id": "n6", "labelJa": "API関数を公開", "labelEn": "Exposes API functions", "detailJa": "単純なAPI連携に向く。", "detailEn": "Suited to simple API integration."}, {"id": "n7", "labelJa": "Copilotのモデルが解釈", "labelEn": "Copilot's model reads it", "detailJa": "Copilot自身のモデルが関数を解釈する。", "detailEn": "Copilot's own model interprets the functions."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n2", "n4"], ["n2", "n5"], ["n3", "n6"], ["n3", "n7"]]}, {"titleJa": "MCPの3プリミティブ", "titleEn": "3 MCP Primitives", "nodes": [{"id": "n1", "labelJa": "MCPプリミティブ", "labelEn": "MCP Primitives", "detailJa": "外部の能力と知識をエージェントに提供する3種。", "detailEn": "Three types that expose external capability/knowledge to agents."}, {"id": "n2", "labelJa": "Tools", "labelEn": "Tools", "detailJa": "副作用のある実行可能な関数。", "detailEn": "Callable functions with side effects."}, {"id": "n3", "labelJa": "Resources", "labelEn": "Resources", "detailJa": "読み取り専用のコンテキストデータ。", "detailEn": "Read-only context data."}, {"id": "n4", "labelJa": "Prompts", "labelEn": "Prompts", "detailJa": "人が選択して起動する定型テンプレート。", "detailEn": "Reusable templates a human selects and invokes."}, {"id": "n5", "labelJa": "副作用を伴う実行", "labelEn": "Has side effects", "detailJa": "呼び出すと外部状態を変更しうる。", "detailEn": "Calling it can change external state."}, {"id": "n6", "labelJa": "読み取り専用データ", "labelEn": "Read-only data", "detailJa": "状態を変更せずコンテキストを提供。", "detailEn": "Provides context without changing state."}, {"id": "n7", "labelJa": "人が選択して起動", "labelEn": "Human-invoked", "detailJa": "自動実行ではなく人が明示的に選ぶ。", "detailEn": "Explicitly selected by a human, not auto-run."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n1", "n4"], ["n2", "n5"], ["n3", "n6"], ["n4", "n7"]]}, {"titleJa": "コーディングエージェントのプロンプト設計", "titleEn": "Prompting Coding Agents", "nodes": [{"id": "n1", "labelJa": "プロンプト設計の3本柱", "labelEn": "3 pillars of prompting", "detailJa": "正確なエージェント動作を支える設計の土台。", "detailEn": "The foundation for accurate agent behavior."}, {"id": "n2", "labelJa": "システムプロンプト", "labelEn": "System prompt", "detailJa": "役割と制約を持続的に定義する。", "detailEn": "Persistently define role and constraints."}, {"id": "n3", "labelJa": "出力制御", "labelEn": "Output control", "detailJa": "ゼロショット/少数ショット/CoTで制御。", "detailEn": "Control output via zero/few-shot examples and CoT."}, {"id": "n4", "labelJa": "コンテキスト予算", "labelEn": "Context budget", "detailJa": "コンテキストウィンドウとトークン予算に収める。", "detailEn": "Fit within the context window and token budget."}, {"id": "n5", "labelJa": "役割/制約の持続定義", "labelEn": "Persistent role/constraints", "detailJa": "システムプロンプトで一貫して定義する。", "detailEn": "Defined consistently via the system prompt."}, {"id": "n6", "labelJa": "出力粒度/形式の制御", "labelEn": "Control granularity/format", "detailJa": "例示や思考の連鎖で形式を制御する。", "detailEn": "Control format via examples and chain-of-thought."}, {"id": "n7", "labelJa": "必要情報を予算内に", "labelEn": "Fit info in budget", "detailJa": "必要な情報だけをトークン予算内に収める。", "detailEn": "Fit only the necessary info within the token budget."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n1", "n4"], ["n2", "n5"], ["n3", "n6"], ["n4", "n7"]]}, {"titleJa": "エージェントのアンチパターン", "titleEn": "Agent Anti-patterns", "nodes": [{"id": "n1", "labelJa": "代表的アンチパターン", "labelEn": "Classic anti-patterns", "detailJa": "運用を不安定・危険にする代表例。", "detailEn": "Classic examples that make operation unstable or unsafe."}, {"id": "n2", "labelJa": "曖昧な指示", "labelEn": "Vague instructions", "detailJa": "解釈の余地が大きい指示を与えてしまう。", "detailEn": "Giving instructions with too much room for interpretation."}, {"id": "n3", "labelJa": "ワイルドカード過剰権限", "labelEn": "Over-grant via wildcards", "detailJa": "ワイルドカードでツールを過剰に付与する。", "detailEn": "Over-granting tools via wildcard permissions."}, {"id": "n4", "labelJa": "終了条件なき無限ループ", "labelEn": "Infinite loop, no exit", "detailJa": "終了条件のないループに陥る。", "detailEn": "Falling into a loop with no exit condition."}, {"id": "n5", "labelJa": "ツール拡散", "labelEn": "Tool sprawl", "detailJa": "機能が重複したツールが乱立する。", "detailEn": "Overlapping capabilities cause tool sprawl."}, {"id": "n6", "labelJa": "オートメーションバイアス", "labelEn": "Automation bias", "detailJa": "検証せず出力を信じてしまう過信。", "detailEn": "Trusting agent output without verification."}, {"id": "n7", "labelJa": "不安定/危険な運用", "labelEn": "Unstable/unsafe ops", "detailJa": "これらが重なると運用全体が危うくなる。", "detailEn": "Together these make overall operation unsafe."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n1", "n4"], ["n1", "n5"], ["n1", "n6"], ["n2", "n7"], ["n3", "n7"], ["n4", "n7"], ["n5", "n7"], ["n6", "n7"]]}, {"titleJa": "エージェント評価の継続ループ", "titleEn": "Continuous Evaluation Loop", "nodes": [{"id": "n1", "labelJa": "ゴールデンデータセット", "labelEn": "Golden dataset", "detailJa": "絶対的な品質基準を測るための基準データ。", "detailEn": "Reference data for measuring absolute quality."}, {"id": "n2", "labelJa": "品質の絶対基準測定", "labelEn": "Measure absolute quality", "detailJa": "基準データに対して品質を測定する。", "detailEn": "Measure quality against the golden dataset."}, {"id": "n3", "labelJa": "回帰テストスイート", "labelEn": "Regression test suite", "detailJa": "過去の失敗を再現するテスト群。", "detailEn": "A suite of tests reproducing past failures."}, {"id": "n4", "labelJa": "過去失敗の再発防止", "labelEn": "Prevent recurrence", "detailJa": "同じ失敗が再発しないことを確認する。", "detailEn": "Confirm the same failures don't recur."}, {"id": "n5", "labelJa": "ハルシネーション分析", "labelEn": "Hallucination analysis", "detailJa": "誤った出力の傾向を分析する。", "detailEn": "Analyze patterns of incorrect output."}, {"id": "n6", "labelJa": "根本原因分析", "labelEn": "Root cause analysis", "detailJa": "失敗の根本原因を突き止める。", "detailEn": "Identify the root cause of failures."}, {"id": "n7", "labelJa": "チューニングへ反映", "labelEn": "Feed back into tuning", "detailJa": "分析結果をチューニングに反映する。", "detailEn": "Feed analysis results back into tuning."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"]]}, {"titleJa": "AI生成コードのセキュリティ", "titleEn": "Security of AI-generated Code", "nodes": [{"id": "n1", "labelJa": "AI生成コードの検証", "labelEn": "Verify AI-generated code", "detailJa": "人間が書いたコードと同じ厳格さで検証する。", "detailEn": "Verify with the same rigor as human-written code."}, {"id": "n2", "labelJa": "継続的SAST/DAST", "labelEn": "Continuous SAST/DAST", "detailJa": "静的/動的解析で継続的にスキャンする。", "detailEn": "Continuously scan with static/dynamic analysis."}, {"id": "n3", "labelJa": "SBOM/プロブナンス", "labelEn": "SBOM/provenance", "detailJa": "SBOMで出所と依存関係を管理する。", "detailEn": "Track provenance and dependencies via SBOMs."}, {"id": "n4", "labelJa": "依存関係混乱への警戒", "labelEn": "Dependency confusion", "detailJa": "依存関係の混乱を招く攻撃に警戒する。", "detailEn": "Guard against dependency confusion attacks."}, {"id": "n5", "labelJa": "タイポスクワッティング対策", "labelEn": "Typosquatting defense", "detailJa": "似た名前の悪意あるパッケージに注意する。", "detailEn": "Watch for malicious similarly-named packages."}, {"id": "n6", "labelJa": "セキュアコーディング準拠", "labelEn": "Secure coding standards", "detailJa": "セキュアコーディング標準に準拠する。", "detailEn": "Adhere to secure coding standards."}, {"id": "n7", "labelJa": "人間コードと同基準", "labelEn": "Same rigor as human code", "detailJa": "AI生成だからと基準を緩めない。", "detailEn": "Don't lower the bar just because AI generated it."}], "edges": [["n1", "n2"], ["n1", "n3"], ["n1", "n4"], ["n1", "n5"], ["n1", "n6"], ["n1", "n7"]]}],"AB-100": [{"titleJa": "計画フェーズ（D1）の構成要素", "titleEn": "Plan Phase (D1) Building Blocks", "nodes": [{"id": "hub", "labelJa": "計画（D1）", "labelEn": "Plan (D1)", "detailJa": "AI導入の計画フェーズ全体を統括する起点。", "detailEn": "The starting point overseeing the whole AI-adoption planning phase."}, {"id": "req", "labelJa": "要件・データ評価", "labelEn": "Requirements Review", "detailJa": "要件とグラウンディングデータの品質を評価する。", "detailEn": "Review business requirements and grounding-data quality."}, {"id": "strategy", "labelJa": "AI戦略（CAF）", "labelEn": "AI Strategy (CAF)", "detailJa": "Cloud Adoption FrameworkでAI導入戦略を策定する。", "detailEn": "Define the AI adoption strategy via Cloud Adoption Framework."}, {"id": "multiagent", "labelJa": "マルチエージェント設計", "labelEn": "Multi-agent Design", "detailJa": "M365 Copilot/Copilot Studio/Foundry横断で構成を設計する。", "detailEn": "Design across M365 Copilot, Copilot Studio, and Foundry."}, {"id": "bbe", "labelJa": "Build/Buy/Extend判断", "labelEn": "Build vs Buy vs Extend", "detailJa": "ROI/TCOを踏まえて構築・購入・拡張を判断する。", "detailEn": "Decide build, buy, or extend weighing ROI and TCO."}, {"id": "router", "labelJa": "モデルルーター", "labelEn": "Model Router", "detailJa": "カスタムエージェントかM365 Copilot拡張かを含め最適モデルを選定。", "detailEn": "Select the right model, including custom agent vs M365 Copilot extension."}, {"id": "coe", "labelJa": "SLM・AI CoE", "labelEn": "SLM & AI CoE", "detailJa": "小型言語モデル、プロンプトライブラリ、AI CoEを整備する。", "detailEn": "Establish SLMs, a prompt library, and an AI Center of Excellence."}], "edges": [["hub", "req"], ["hub", "strategy"], ["hub", "multiagent"], ["hub", "bbe"], ["hub", "router"], ["hub", "coe"]]}, {"titleJa": "設計フェーズ（D2）の構成要素", "titleEn": "Design Phase (D2) Building Blocks", "nodes": [{"id": "hub", "labelJa": "設計（D2）", "labelEn": "Design (D2)", "detailJa": "エージェントとオーケストレーションを具体化する設計フェーズ。", "detailEn": "The design phase that concretizes agents and orchestration."}, {"id": "types", "labelJa": "エージェント種別", "labelEn": "Agent Types", "detailJa": "タスク型・自律型・prompt-and-response型を選ぶ。", "detailEn": "Choose task, autonomous, or prompt-and-response agent types."}, {"id": "studio", "labelJa": "Copilot Studioフロー", "labelEn": "Copilot Studio Flows", "detailJa": "トピック・エージェントフロー・プロンプトアクションを組む。", "detailEn": "Build topics, agent flows, and prompt actions in Copilot Studio."}, {"id": "orch", "labelJa": "オーケストレーション選択", "labelEn": "Orchestration Choice", "detailJa": "NLP・CLU・生成AIオーケストレーションから方式を選定。", "detailEn": "Pick between NLP, CLU, and generative orchestration."}, {"id": "ext", "labelJa": "拡張性", "labelEn": "Extensibility", "detailJa": "Foundryカスタムモデル・MCP・Computer Use・音声で拡張。", "detailEn": "Extend via Foundry custom models, MCP, Computer Use, and voice."}, {"id": "d365", "labelJa": "D365 Copilotカスタマイズ", "labelEn": "D365 Copilot Customization", "detailJa": "プリビルトエージェントの構成をカスタマイズする。", "detailEn": "Customize and orchestrate prebuilt D365 Copilot agents."}], "edges": [["hub", "types"], ["hub", "studio"], ["hub", "orch"], ["hub", "ext"], ["hub", "d365"]]}, {"titleJa": "展開フェーズ（D3）の構成要素", "titleEn": "Deploy Phase (D3) Building Blocks", "nodes": [{"id": "hub", "labelJa": "展開（D3）", "labelEn": "Deploy (D3)", "detailJa": "出題比率40-45%を占める本番運用フェーズ。", "detailEn": "The production-operations phase, weighted 40-45% of the exam."}, {"id": "mon", "labelJa": "監視・テレメトリ", "labelEn": "Monitoring & Telemetry", "detailJa": "テレメトリに基づきチューニングを継続する。", "detailEn": "Continuously tune based on telemetry data."}, {"id": "test", "labelJa": "テスト戦略", "labelEn": "Testing Strategy", "detailJa": "D365横断でE2Eテストを実施する。", "detailEn": "Run end-to-end testing across D365."}, {"id": "alm", "labelJa": "ALM", "labelEn": "ALM", "detailJa": "データ・エージェント・コネクタ・カスタムモデルを管理する。", "detailEn": "Manage data, agents, connectors, and custom models via ALM."}, {"id": "rai", "labelJa": "責任あるAI・セキュリティ", "labelEn": "Responsible AI & Security", "detailJa": "エージェント/モデルのセキュリティとプロンプト操作対策を行う。", "detailEn": "Secure agents/models and mitigate prompt-manipulation attacks."}, {"id": "gov", "labelJa": "ガバナンス・監査証跡", "labelEn": "Governance & Audit", "detailJa": "データレジデンシーと監査証跡を確保する。", "detailEn": "Ensure data residency and maintain audit trails."}], "edges": [["hub", "mon"], ["hub", "test"], ["hub", "alm"], ["hub", "rai"], ["hub", "gov"]]}, null, {"titleJa": "マルチエージェント協調パターンの選択", "titleEn": "Choosing a Multi-agent Cooperation Pattern", "nodes": [{"id": "hub", "labelJa": "パターン選択", "labelEn": "Choose Pattern", "detailJa": "タスク依存関係とリスク許容度から協調方式を選ぶ起点。", "detailEn": "Decision point based on task dependencies and risk tolerance."}, {"id": "seq", "labelJa": "シーケンシャル", "labelEn": "Sequential", "detailJa": "工程順に1つずつ処理させる方式。", "detailEn": "Agents run one after another in order."}, {"id": "conc", "labelJa": "コンカレント", "labelEn": "Concurrent", "detailJa": "複数エージェントを並列に走らせる方式。", "detailEn": "Multiple agents run in parallel."}, {"id": "group", "labelJa": "グループチャット", "labelEn": "Group Chat", "detailJa": "エージェント同士が協調して議論する方式。", "detailEn": "Agents collaborate together in a shared conversation."}, {"id": "handoff", "labelJa": "ハンドオフ", "labelEn": "Handoff", "detailJa": "担当エージェントへタスクを委譲する方式。", "detailEn": "Delegate the task to a specialist agent."}, {"id": "redesign", "labelJa": "専門エージェントへ再設計", "labelEn": "Redesign as Specialists", "detailJa": "単一エージェントが複雑化したら責務分割する。", "detailEn": "When one agent grows too complex, split it into specialists."}], "edges": [["hub", "seq"], ["hub", "conc"], ["hub", "group"], ["hub", "handoff"], ["hub", "redesign"]]}, {"titleJa": "グラウンディングとRAGパイプライン", "titleEn": "Grounding and the RAG Pipeline", "nodes": [{"id": "sources", "labelJa": "ナレッジソース", "labelEn": "Knowledge Sources", "detailJa": "Dataverse・SharePoint・Webなどの情報源。", "detailEn": "Sources such as Dataverse, SharePoint, and the web."}, {"id": "mode", "labelJa": "鮮度 or 規模？", "labelEn": "Freshness vs Scale?", "detailJa": "鮮度重視ならリアルタイム、規模・速度重視ならバッチを選ぶ。", "detailEn": "Pick real-time lookup for freshness, or batch indexing for scale/speed."}, {"id": "index", "labelJa": "インデックス化", "labelEn": "Index", "detailJa": "選んだ方式でナレッジソースをインデックス化する。", "detailEn": "Index the knowledge sources using the chosen mode."}, {"id": "retrieve", "labelJa": "関連情報検索", "labelEn": "Retrieve Passages", "detailJa": "ユーザー入力に意味的に近い情報を検索する。", "detailEn": "Retrieve passages semantically relevant to the user's input."}, {"id": "augment", "labelJa": "プロンプト拡張", "labelEn": "Augment Prompt", "detailJa": "検索結果をプロンプトに組み込む。", "detailEn": "Feed the retrieved passages into the prompt."}, {"id": "generate", "labelJa": "モデル応答生成", "labelEn": "Generate Response", "detailJa": "拡張済みプロンプトからモデルが応答を生成する。", "detailEn": "The model generates a response from the augmented prompt."}], "edges": [["sources", "mode"], ["mode", "index"], ["index", "retrieve"], ["retrieve", "augment"], ["augment", "generate"]]}, {"titleJa": "責任あるAIの多層防御", "titleEn": "Responsible AI as Layered Guardrails", "nodes": [{"id": "input", "labelJa": "エージェント入力", "labelEn": "Agent Input", "detailJa": "ユーザーやシステムからの入力が最初の層に届く。", "detailEn": "User or system input enters the first defense layer."}, {"id": "shields", "labelJa": "Prompt Shields", "labelEn": "Prompt Shields", "detailJa": "入力への攻撃（プロンプトインジェクション）を防ぐ。", "detailEn": "Defends against prompt-injection style input attacks."}, {"id": "safety", "labelJa": "Content Safety", "labelEn": "Content Safety", "detailJa": "有害コンテンツ全般をフィルタリングする。", "detailEn": "Filters harmful content broadly."}, {"id": "halluc", "labelJa": "ハルシネーション検出", "labelEn": "Hallucination Detection", "detailJa": "事実と異なる生成結果を検出する。", "detailEn": "Detects factually incorrect generated output."}, {"id": "redteam", "labelJa": "レッドチーミング", "labelEn": "Red Teaming", "detailJa": "意図的な攻撃テストで弱点を洗い出す。", "detailEn": "Proactively probes weaknesses via adversarial testing."}, {"id": "output", "labelJa": "保護されたエージェント", "labelEn": "Protected Agent", "detailJa": "多層防御を通過した安全な出力。", "detailEn": "The safe output that has passed all defense layers."}], "edges": [["input", "shields"], ["shields", "safety"], ["safety", "halluc"], ["halluc", "redteam"], ["redteam", "output"]]}, {"titleJa": "人間関与モデルの選択（HITL / HOTL）", "titleEn": "Choosing HITL vs HOTL", "nodes": [{"id": "assess", "labelJa": "リスク評価", "labelEn": "Risk Assessment", "detailJa": "アクションの不可逆性・影響範囲・規制要件を評価する起点。", "detailEn": "Starting point: assess irreversibility, impact, and regulation."}, {"id": "high", "labelJa": "影響大・不可逆", "labelEn": "High Impact / Irreversible", "detailJa": "取り消しが困難で影響が大きいアクション。", "detailEn": "Actions that are hard to reverse and high impact."}, {"id": "low", "labelJa": "影響小・可逆", "labelEn": "Low Impact / Reversible", "detailJa": "取り消し可能で影響が小さいアクション。", "detailEn": "Actions that are reversible and low impact."}, {"id": "hitl", "labelJa": "HITL（実行前承認）", "labelEn": "HITL (Approval Gate)", "detailJa": "実行前に人間の承認を必須とする。", "detailEn": "Requires human approval before execution."}, {"id": "hotl", "labelJa": "HOTL（事後監視）", "labelEn": "HOTL (Post-hoc Monitor)", "detailJa": "実行後に人間が監視する運用。", "detailEn": "Humans monitor the action after it executes."}], "edges": [["assess", "high"], ["assess", "low"], ["high", "hitl"], ["low", "hotl"]]}, {"titleJa": "エージェントのALMとデプロイ戦略", "titleEn": "Agent ALM and Deployment Strategy", "nodes": [{"id": "package", "labelJa": "ソリューション化", "labelEn": "Package Solution", "detailJa": "エージェント・コネクタ・データをソリューション対応ALMでまとめる。", "detailEn": "Package agents, connectors, and data with solution-aware ALM."}, {"id": "pipeline", "labelJa": "Power Platformパイプライン", "labelEn": "Power Platform Pipelines", "detailJa": "パイプラインで環境間の昇格を自動化する。", "detailEn": "Automate promotion across environments via pipelines."}, {"id": "promote", "labelJa": "環境間昇格", "labelEn": "Promote Across Envs", "detailJa": "開発・テスト・本番へ順に展開する。", "detailEn": "Move the solution through dev, test, and production."}, {"id": "canary", "labelJa": "カナリアリリース", "labelEn": "Canary Release", "detailJa": "一部ユーザーに限定して先行公開しリスクを抑える。", "detailEn": "Release to a small user subset first to limit risk."}, {"id": "rollback", "labelJa": "ロールバック計画", "labelEn": "Rollback Plan", "detailJa": "問題発生時に即座に戻せる戦略を用意する。", "detailEn": "Have a strategy to revert immediately if issues arise."}], "edges": [["package", "pipeline"], ["pipeline", "promote"], ["promote", "canary"], ["canary", "rollback"]]}, {"titleJa": "コスト・ROIフレームワーク", "titleEn": "Cost and ROI Framework", "nodes": [{"id": "hub", "labelJa": "コスト・ROI", "labelEn": "Cost & ROI", "detailJa": "投資判断と継続的な実績管理の起点。", "detailEn": "Central hub for investment decisions and ongoing tracking."}, {"id": "ptu", "labelJa": "PTU vs PAYG", "labelEn": "PTU vs PAYG", "detailJa": "確保容量課金か従量課金かを選ぶ。", "detailEn": "Choose between provisioned throughput and pay-as-you-go."}, {"id": "capacity", "labelJa": "Copilotクレジット見積", "labelEn": "Capacity Estimate", "detailJa": "必要なCopilotクレジット（旧メッセージ）の量を見積もる。", "detailEn": "Estimate the required Copilot Credits (formerly messages)."}, {"id": "tco", "labelJa": "TCO/ROI正当化", "labelEn": "TCO/ROI Justification", "detailJa": "総所有コストと投資対効果の両面で投資を正当化する。", "detailEn": "Justify the investment on both TCO and ROI."}, {"id": "dashboard", "labelJa": "消費量ダッシュボード", "labelEn": "Consumption Dashboard", "detailJa": "実績を継続的に監視するダッシュボード。", "detailEn": "Monitor actual consumption continuously via a dashboard."}, {"id": "reconcile", "labelJa": "計画との照合", "labelEn": "Reconcile with Plan", "detailJa": "実績を計画と突き合わせて調整する。", "detailEn": "Reconcile actuals against the original plan."}], "edges": [["hub", "ptu"], ["hub", "capacity"], ["hub", "tco"], ["hub", "dashboard"], ["hub", "reconcile"]]}],"AB-410": [{"titleJa": "ソリューション基盤の流れ", "titleEn": "Solution foundation flow", "nodes": [{"id": "req", "labelJa": "要件", "labelEn": "Requirements", "detailJa": "業務要件とユーザー要求を整理し、実現方式の前提を固める。", "detailEn": "Gather business and user requirements to set the foundation for design choices."}, {"id": "comp", "labelJa": "コンポーネント/拡張性", "labelEn": "Components & extensibility", "detailJa": "必要なコンポーネントと将来の拡張性を検討する。", "detailEn": "Decide which components are needed and how extensible the solution must be."}, {"id": "env", "labelJa": "環境タイプ", "labelEn": "Environment type", "detailJa": "開発/テスト/本番など環境タイプを選定する。", "detailEn": "Choose the environment type (dev/test/prod) to host the solution."}, {"id": "alm", "labelJa": "ソリューション+ALM戦略", "labelEn": "Solution + ALM strategy", "detailJa": "ソリューション構成とALM(アプリケーションライフサイクル管理)戦略を決定する。", "detailEn": "Define solution packaging and an ALM strategy for lifecycle management."}, {"id": "dv", "labelJa": "Dataverseデータモデル", "labelEn": "Dataverse data model", "detailJa": "テーブル・列・リレーション・プロンプト列・行要約・セキュリティを設計する。", "detailEn": "Design tables, columns, relationships, prompt columns, row summaries, and security."}], "edges": [["req", "comp"], ["comp", "env"], ["env", "alm"], ["alm", "dv"]]}, {"titleJa": "アプリ作成：2つの方式", "titleEn": "Building apps: two approaches", "nodes": [{"id": "hub", "labelJa": "アプリ作成", "labelEn": "App building", "detailJa": "Power Appsで作るアプリには大きく2方式がある。", "detailEn": "Power Apps offers two main ways to build an app."}, {"id": "md", "labelJa": "モデル駆動型", "labelEn": "Model-driven", "detailJa": "Dataverse中心。フォーム/ビュー/生成ページ/チャートで構成。", "detailEn": "Dataverse-centric apps built from forms, views, generative pages, and charts."}, {"id": "canvas", "labelJa": "キャンバス", "labelEn": "Canvas", "detailJa": "自由配置のUI。データ・コンポーネント・変数などで構成。", "detailEn": "Freeform-layout UI composed of data, components, and variables."}, {"id": "mdf1", "labelJa": "フォーム/ビュー", "labelEn": "Forms/Views", "detailJa": "レコード編集用フォームと一覧表示のビュー。", "detailEn": "Record edit forms and list views for data."}, {"id": "mdf2", "labelJa": "生成ページ/チャート", "labelEn": "Generative pages/Charts", "detailJa": "AIが生成するページやチャートで可視化。", "detailEn": "AI-generated pages and charts for visualization."}, {"id": "cf1", "labelJa": "データ/コンポーネント", "labelEn": "Data/Components(UDF)", "detailJa": "名前付き数式・UDF・変数/コレクションでロジックを構築。", "detailEn": "Named formulas, UDFs, variables, and collections build the logic."}, {"id": "cf2", "labelJa": "エラー処理/Monitor", "labelEn": "Error handling/Monitor", "detailJa": "エラー処理を実装し、Monitorでデバッグ・監視する。", "detailEn": "Implement error handling and debug/monitor with Monitor tool."}], "edges": [["hub", "md"], ["hub", "canvas"], ["md", "mdf1"], ["md", "mdf2"], ["canvas", "cf1"], ["canvas", "cf2"]]}, {"titleJa": "ロジックと自動化（D3）の分類", "titleEn": "Logic & automation (D3) categories", "nodes": [{"id": "hub", "labelJa": "ロジックと自動化", "labelEn": "Logic & automation", "detailJa": "D3ドメイン(40-45%)。業務ロジックと自動化の主要手段。", "detailEn": "Domain D3 (40-45%): the main tools for business logic and automation."}, {"id": "flow", "labelJa": "クラウドフロー", "labelEn": "Cloud flows", "detailJa": "トリガー・コネクタ・承認・条件/ループ・テストで構成。", "detailEn": "Built from triggers, connectors, approvals, conditions/loops, and testing."}, {"id": "aihub", "labelJa": "AI Hub プロンプト/モデル", "labelEn": "AI Hub prompts/models", "detailJa": "アプリ/フローで構築・消費し、ナレッジと入力を扱う。", "detailEn": "Build and consume in apps/flows, handling knowledge and inputs."}, {"id": "rules", "labelJa": "ビジネスルール", "labelEn": "Business rules", "detailJa": "ノーコードでフォーム/テーブルに適用する条件ロジック。", "detailEn": "No-code conditional logic applied to forms/tables."}, {"id": "bpf", "labelJa": "BPF", "labelEn": "Business process flow", "detailJa": "段階的なガイド付きプロセスをユーザーに提示。", "detailEn": "Guides users through staged, guided processes."}, {"id": "calc", "labelJa": "計算/ロールアップ列", "labelEn": "Calculated/rollup columns", "detailJa": "数式や集計で自動的に値を導出する列。", "detailEn": "Columns that derive values automatically via formulas or aggregation."}], "edges": [["hub", "flow"], ["hub", "aihub"], ["hub", "rules"], ["hub", "bpf"], ["hub", "calc"]]}, {"titleJa": "ビジネスロジックの選択基準", "titleEn": "Choosing the right business logic", "nodes": [{"id": "hub", "labelJa": "ロジック選択", "labelEn": "Choose logic type", "detailJa": "要件に応じて最適なロジック手段を選ぶ。", "detailEn": "Pick the right logic mechanism based on the requirement."}, {"id": "rule", "labelJa": "ビジネスルール", "labelEn": "Business rule", "detailJa": "ノーコード、単一フォーム/テーブル向けの簡易条件。", "detailEn": "No-code, simple conditions scoped to a single form/table."}, {"id": "flow", "labelJa": "クラウドフロー", "labelEn": "Cloud flow", "detailJa": "サービス横断の自動化が必要な場合に使う。", "detailEn": "Use when automation must span multiple services/connectors."}, {"id": "bpf", "labelJa": "BPF", "labelEn": "BPF", "detailJa": "ユーザーを段階的にガイドしたい場合に使う。", "detailEn": "Use to guide users step-by-step through defined stages."}, {"id": "calc", "labelJa": "計算列", "labelEn": "Calculated column", "detailJa": "他の値から派生する値を自動計算したい場合に使う。", "detailEn": "Use to automatically derive a value from other columns."}], "edges": [["hub", "rule"], ["hub", "flow"], ["hub", "bpf"], ["hub", "calc"]]}, null, {"titleJa": "会話型生成エージェントの仕組み", "titleEn": "How a generative conversational agent works", "nodes": [{"id": "user", "labelJa": "ユーザー発話", "labelEn": "User utterance", "detailJa": "ユーザーがチャットで発話・入力する。", "detailEn": "The user speaks or types into the chat."}, {"id": "orch", "labelJa": "生成オーケストレーション", "labelEn": "Generative orchestration", "detailJa": "LLMが発話の意図を解釈し、次の行動を判断する。", "detailEn": "The LLM interprets intent and decides the next action."}, {"id": "rag", "labelJa": "ナレッジ検索(RAG)", "labelEn": "Search knowledge (RAG)", "detailJa": "知識ソースを検索し、回答の根拠を得る。", "detailEn": "Search knowledge sources to ground the answer."}, {"id": "action", "labelJa": "アクション実行", "labelEn": "Run an action", "detailJa": "コネクタやフローなどのアクションを実行する。", "detailEn": "Execute an action such as a connector or flow."}, {"id": "topic", "labelJa": "トピックへ分岐", "labelEn": "Branch to a topic", "detailJa": "生成オーケストレーションが適切なトピックへ分岐する。", "detailEn": "Generative orchestration branches into the right topic."}, {"id": "classic", "labelJa": "クラシックトピック", "labelEn": "Classic topic (direct)", "detailJa": "トリガーフレーズで直接分岐する代替経路。", "detailEn": "An alternate path that branches directly on trigger phrases."}, {"id": "reply", "labelJa": "応答生成・返信", "labelEn": "Compose & return reply", "detailJa": "応答を生成し、チャネル経由でユーザーへ返す。", "detailEn": "Compose the reply and return it via the channel."}], "edges": [["user", "orch"], ["user", "classic"], ["orch", "rag"], ["orch", "action"], ["orch", "topic"], ["rag", "reply"], ["action", "reply"], ["topic", "reply"], ["classic", "reply"]]}, {"titleJa": "RAGパイプライン", "titleEn": "The RAG pipeline", "nodes": [{"id": "ingest", "labelJa": "文書取り込み", "labelEn": "Ingest documents", "detailJa": "対象の文書やナレッジソースを取り込む。", "detailEn": "Ingest source documents and knowledge into the pipeline."}, {"id": "embed", "labelJa": "埋め込みに変換", "labelEn": "Convert to embeddings", "detailJa": "取り込んだ文書をベクトル(埋め込み)に変換する。", "detailEn": "Convert ingested documents into vector embeddings."}, {"id": "index", "labelJa": "ベクトルインデックス格納", "labelEn": "Store in vector index", "detailJa": "埋め込みをベクトルインデックスに保存する。", "detailEn": "Store the embeddings in a vector index for retrieval."}, {"id": "query", "labelJa": "質問の類似度検索", "labelEn": "Embed query & search", "detailJa": "ユーザーの質問も埋め込みに変換し類似度検索する。", "detailEn": "Convert the user's question to an embedding and run similarity search."}, {"id": "prompt", "labelJa": "プロンプトに結合", "labelEn": "Add passages to prompt", "detailJa": "検索でヒットした関連箇所をプロンプトに含める。", "detailEn": "Include the retrieved passages in the prompt sent to the LLM."}, {"id": "answer", "labelJa": "根拠付き回答生成", "labelEn": "Generate grounded answer", "detailJa": "取得した証拠に基づいた回答をLLMが生成する。", "detailEn": "The LLM generates an answer grounded in the retrieved evidence."}], "edges": [["ingest", "embed"], ["embed", "index"], ["index", "query"], ["query", "prompt"], ["prompt", "answer"]]}, {"titleJa": "AI Hubのモデル選択とコスト", "titleEn": "Model selection and cost in AI Hub", "nodes": [{"id": "catalog", "labelJa": "モデルカタログで選択", "labelEn": "Pick from model catalog", "detailJa": "タスクの複雑さ・レイテンシ・コストで基盤モデルを選ぶ。", "detailEn": "Weigh task complexity, latency, and cost to pick a foundation model."}, {"id": "build", "labelJa": "プロンプト/カスタム構築", "labelEn": "Build prompt/custom model", "detailJa": "選んだモデルをプロンプトまたはカスタムモデルとして構築。", "detailEn": "Build it as a prompt or a custom model."}, {"id": "consume", "labelJa": "アプリ/フローで消費", "labelEn": "Consume in apps/flows", "detailJa": "アプリ・フロー・エージェントから利用する。", "detailEn": "Consume the model from apps, flows, and agents."}, {"id": "bill", "labelJa": "AI Builder/Copilotクレジット課金", "labelEn": "Billed as AI Builder or Copilot Credits", "detailJa": "アプリ・フローはAI Builderクレジット（尽きたらCopilotクレジット）、エージェントはCopilotクレジットで課金される（2026年11月時点）。", "detailEn": "Apps and flows use AI Builder credits (then Copilot Credits once those run out); agents use Copilot Credits (as of November 2026)."}, {"id": "monitor", "labelJa": "消費状況監視で最適化", "labelEn": "Track via consumption monitoring", "detailJa": "消費状況モニタリングで追跡・最適化する。", "detailEn": "Track and optimize usage via consumption monitoring."}], "edges": [["catalog", "build"], ["build", "consume"], ["consume", "bill"], ["bill", "monitor"]]}, {"titleJa": "エージェント・ツール・マルチエージェント", "titleEn": "Agents, tools, and multi-agent setups", "nodes": [{"id": "parent", "labelJa": "親エージェント", "labelEn": "Parent agent", "detailJa": "生成オーケストレーションを持つ主エージェント。", "detailEn": "The primary agent that runs generative orchestration."}, {"id": "orch", "labelJa": "生成オーケストレーションで委任", "labelEn": "Orchestration delegates", "detailJa": "意図に応じて適切なツールや子エージェントへ委任する。", "detailEn": "Delegates work to the right tool or child agent based on intent."}, {"id": "action", "labelJa": "アクション(コネクタ/フロー)", "labelEn": "Action (connector/flow)", "detailJa": "コネクタやフローを直接ツールとして呼び出す。", "detailEn": "Call connectors or flows directly as tools."}, {"id": "childA", "labelJa": "専門エージェントA", "labelEn": "Specialized agent A", "detailJa": "特定業務に特化した子エージェントをツールとして追加。", "detailEn": "A specialized child agent added as a tool."}, {"id": "childB", "labelJa": "専門エージェントB", "labelEn": "Specialized agent B", "detailJa": "別分野に特化したもう一つの子エージェント。", "detailEn": "Another specialized child agent for a different domain."}], "edges": [["parent", "orch"], ["orch", "action"], ["orch", "childA"], ["orch", "childB"]]}, {"titleJa": "生成AIのガードレール", "titleEn": "Guardrails for generative AI", "nodes": [{"id": "hub", "labelJa": "生成AIガードレール", "labelEn": "Generative AI guardrails", "detailJa": "安全とガバナンスを支える4つの仕組み。", "detailEn": "Four mechanisms underpinning safety and governance."}, {"id": "mod", "labelJa": "コンテンツモデレーション", "labelEn": "Content moderation", "detailJa": "有害な入力・出力をブロックする。", "detailEn": "Blocks harmful input and output content."}, {"id": "dlp", "labelJa": "DLPポリシー", "labelEn": "DLP policy", "detailJa": "コネクタとデータの混在を防止する。", "detailEn": "Prevents connectors and data from mixing improperly."}, {"id": "gov", "labelJa": "テナント/ガバナンス", "labelEn": "Tenant & governance", "detailJa": "誰が作成・公開できるかを制御する。", "detailEn": "Tenant settings and Copilot Studio governance control who can build/publish."}, {"id": "audit", "labelJa": "監査ログ/レジデンシー", "labelEn": "Audit logs & residency", "detailJa": "追跡性とデータ所在地を担保する。", "detailEn": "Audit logs and data residency ensure traceability and data location."}], "edges": [["hub", "mod"], ["hub", "dlp"], ["hub", "gov"], ["hub", "audit"]]}, {"titleJa": "デプロイと監視のライフサイクル", "titleEn": "The deployment & monitoring lifecycle", "nodes": [{"id": "build", "labelJa": "開発・テスト", "labelEn": "Build & test in dev", "detailJa": "開発環境で構築し、テストチャットペインで検証する。", "detailEn": "Build in dev and verify with the test chat pane."}, {"id": "promote", "labelJa": "環境間の昇格", "labelEn": "Promote across environments", "detailJa": "ソリューションとして環境間に展開する。", "detailEn": "Promote it across environments as a solution."}, {"id": "pipeline", "labelJa": "パイプライン移送", "labelEn": "Pipeline transport", "detailJa": "パイプラインによる自動移送で展開する。", "detailEn": "Deploy via automated pipeline transport."}, {"id": "manual", "labelJa": "手動移送", "labelEn": "Manual transport", "detailJa": "手動でのソリューションインポートによる展開。", "detailEn": "Deploy via manual solution import/export."}, {"id": "publish", "labelJa": "チャネルへ発行", "labelEn": "Publish to channels", "detailJa": "発行してエージェント/アプリをチャネルへ配信する。", "detailEn": "Publish it out to channels for users."}, {"id": "monitor", "labelJa": "分析・監視で最適化", "labelEn": "Analytics & monitoring", "detailJa": "Copilot Studio分析・Monitor・消費監視で稼働とコストを観察する。", "detailEn": "Watch operation and cost via Copilot Studio analytics, Monitor, and consumption monitoring."}], "edges": [["build", "promote"], ["promote", "pipeline"], ["promote", "manual"], ["pipeline", "publish"], ["manual", "publish"], ["publish", "monitor"]]}],"AI-300": [{"titleJa": "MLOps ライフサイクル", "titleEn": "MLOps Lifecycle", "nodes": [{"id": "data", "labelJa": "データ", "labelEn": "Data", "detailJa": "学習用データを収集・準備する起点。", "detailEn": "Starting point: collect and prepare training data."}, {"id": "train", "labelJa": "学習(MLflow/AutoML)", "labelEn": "Train (MLflow/AutoML)", "detailJa": "MLflowやAutoMLでモデルを学習させる。", "detailEn": "Train the model using MLflow or AutoML."}, {"id": "register", "labelJa": "モデル登録", "labelEn": "Register Model", "detailJa": "学習済みモデルをレジストリに登録しバージョン管理。", "detailEn": "Register the trained model in a versioned registry."}, {"id": "deploy", "labelJa": "デプロイ", "labelEn": "Deploy", "detailJa": "オンライン/バッチ エンドポイントへ配置。", "detailEn": "Deploy to an online or batch endpoint."}, {"id": "monitor", "labelJa": "監視(ドリフト)", "labelEn": "Monitor (Drift)", "detailJa": "本番でのドリフトやパフォーマンス低下をアラートで検知。", "detailEn": "Detect drift and performance decay in production via alerts."}, {"id": "retrain", "labelJa": "再学習", "labelEn": "Retrain", "detailJa": "監視結果を受けてモデルを再学習しループを継続。", "detailEn": "Retrain the model based on monitoring signals, continuing the loop."}], "edges": [["data", "train"], ["train", "register"], ["register", "deploy"], ["deploy", "monitor"], ["monitor", "retrain"]]}, {"titleJa": "GenAIOps ループ", "titleEn": "GenAIOps Loop", "nodes": [{"id": "foundry", "labelJa": "Foundryプロジェクト", "labelEn": "Foundry Project", "detailJa": "AI Foundryでプロジェクトを作成し基盤モデルを扱う起点。", "detailEn": "Create an AI Foundry project as the starting point for foundation models."}, {"id": "deploy", "labelJa": "基盤モデル配置", "labelEn": "Deploy Model", "detailJa": "サーバーレスまたはマネージド(PTU)でモデルを配置。", "detailEn": "Deploy via serverless or managed (PTU) compute."}, {"id": "prompt", "labelJa": "プロンプト管理(Git)", "labelEn": "Prompt Versioning", "detailJa": "プロンプトをGitでバージョン管理し変更履歴を追跡。", "detailEn": "Version prompts in Git to track change history."}, {"id": "eval", "labelJa": "評価", "labelEn": "Evaluate", "detailJa": "groundedness/relevanceなどの指標で品質を評価。", "detailEn": "Evaluate quality using metrics like groundedness/relevance."}, {"id": "observe", "labelJa": "可観測性", "labelEn": "Observe", "detailJa": "レイテンシ・トークンコスト・トレースを監視。", "detailEn": "Monitor latency, token cost, and tracing."}], "edges": [["foundry", "deploy"], ["deploy", "prompt"], ["prompt", "eval"], ["eval", "observe"]]}, {"titleJa": "RAG 最適化ノブ", "titleEn": "RAG Optimization Knobs", "nodes": [{"id": "core", "labelJa": "RAGチューニング", "labelEn": "RAG Tuning", "detailJa": "検索精度を左右する複数のパラメータを調整する中心概念。", "detailEn": "Central concept: tune multiple parameters that affect retrieval quality."}, {"id": "chunk", "labelJa": "チャンクサイズ", "labelEn": "Chunk Size", "detailJa": "文書分割の粒度。小さすぎ/大きすぎに注意。", "detailEn": "Granularity of document splitting; avoid too small or too large."}, {"id": "threshold", "labelJa": "類似度しきい値", "labelEn": "Similarity Threshold", "detailJa": "検索結果を採用する類似度の下限を設定。", "detailEn": "Set the minimum similarity score to accept a result."}, {"id": "hybrid", "labelJa": "ハイブリッド検索", "labelEn": "Hybrid Search", "detailJa": "セマンティック検索とキーワード検索を組み合わせる。", "detailEn": "Combine semantic and keyword search."}, {"id": "embed", "labelJa": "埋め込みモデル選択", "labelEn": "Embedding Model", "detailJa": "用途に合った埋め込みモデルを選定。", "detailEn": "Choose an embedding model suited to the use case."}, {"id": "eval", "labelJa": "評価(A/Bテスト)", "labelEn": "Evaluate (A/B Test)", "detailJa": "関連性メトリクスとA/Bテストで効果を検証。", "detailEn": "Validate impact with relevance metrics and A/B tests."}], "edges": [["core", "chunk"], ["core", "threshold"], ["core", "hybrid"], ["core", "embed"], ["chunk", "eval"], ["threshold", "eval"], ["hybrid", "eval"], ["embed", "eval"]]}, {"titleJa": "品質・安全 評価軸", "titleEn": "Quality & Safety Axes", "nodes": [{"id": "hub", "labelJa": "評価者(Evaluators)", "labelEn": "Evaluators", "detailJa": "モデル出力を多面的に採点する評価の中心。", "detailEn": "Central hub scoring model output across multiple dimensions."}, {"id": "groundedness", "labelJa": "Groundedness", "labelEn": "Groundedness", "detailJa": "回答が根拠データに基づいているか。", "detailEn": "Whether the answer is grounded in source data."}, {"id": "relevance", "labelJa": "Relevance", "labelEn": "Relevance", "detailJa": "質問に対する回答の関連性。", "detailEn": "Relevance of the answer to the question."}, {"id": "coherence", "labelJa": "Coherence", "labelEn": "Coherence", "detailJa": "文章としての一貫性・論理性。", "detailEn": "Logical and structural coherence of the text."}, {"id": "fluency", "labelJa": "Fluency", "labelEn": "Fluency", "detailJa": "自然な文章表現かどうか。", "detailEn": "Whether the text reads naturally."}, {"id": "risksafety", "labelJa": "リスク&安全", "labelEn": "Risk & Safety", "detailJa": "有害コンテンツの有無を評価。", "detailEn": "Evaluate for harmful content."}, {"id": "custom", "labelJa": "組込み+カスタム", "labelEn": "Built-in + Custom", "detailJa": "標準評価者に加えカスタム評価者を自動ワークフローに統合。", "detailEn": "Combine built-in and custom evaluators into automated workflows."}], "edges": [["hub", "groundedness"], ["hub", "relevance"], ["hub", "coherence"], ["hub", "fluency"], ["hub", "risksafety"], ["hub", "custom"]]}, {"titleJa": "CI/CD/CT パイプライン", "titleEn": "CI/CD/CT Pipeline", "nodes": [{"id": "push", "labelJa": "コードpush", "labelEn": "Code Push", "detailJa": "開発者がコード変更をリポジトリにpush。", "detailEn": "Developer pushes code changes to the repository."}, {"id": "ci", "labelJa": "CI(ビルド/テスト)", "labelEn": "CI (Build/Test)", "detailJa": "自動ビルドとテストを実行して品質を検証。", "detailEn": "Automatically build and test to verify quality."}, {"id": "cd", "labelJa": "CD(デプロイ)", "labelEn": "CD (Deploy)", "detailJa": "検証済みの成果物を環境へデプロイ。", "detailEn": "Deploy the validated artifact to an environment."}, {"id": "monitor", "labelJa": "本番監視", "labelEn": "Prod Monitoring", "detailJa": "本番環境でドリフトや劣化を検知。", "detailEn": "Detect drift or degradation in production."}, {"id": "ct", "labelJa": "CT(自動再学習)", "labelEn": "CT (Auto Retrain)", "detailJa": "監視結果を受けてモデルを自動的に再学習。", "detailEn": "Automatically retrain the model based on monitoring results."}, {"id": "nextci", "labelJa": "次のCIへ再突入", "labelEn": "Re-enters CI", "detailJa": "新しいモデルが再びCIパイプラインに入り輪が続く。", "detailEn": "The new model re-enters the CI pipeline, continuing the loop."}], "edges": [["push", "ci"], ["ci", "cd"], ["cd", "monitor"], ["monitor", "ct"], ["ct", "nextci"]]}, {"titleJa": "デプロイ戦略の選択", "titleEn": "Choosing a Deployment Strategy", "nodes": [{"id": "criteria", "labelJa": "判断基準", "labelEn": "Decision Criteria", "detailJa": "本番結果に影響してよいか、ロールバック速度、影響範囲を検討。", "detailEn": "Consider whether production results may be affected, rollback speed, and blast radius."}, {"id": "decision", "labelJa": "戦略を選ぶ", "labelEn": "Choose Strategy", "detailJa": "基準に基づき3つの戦略から選択する分岐点。", "detailEn": "Branch point: choose among three strategies based on criteria."}, {"id": "shadow", "labelJa": "シャドウ", "labelEn": "Shadow", "detailJa": "本番に影響なく新モデルを裏で比較。", "detailEn": "Compare the new model in the background with zero production impact."}, {"id": "canary", "labelJa": "カナリア", "labelEn": "Canary", "detailJa": "一部トラフィックに段階的に展開しリスクを抑える。", "detailEn": "Gradually roll out to a subset of traffic to limit risk."}, {"id": "bluegreen", "labelJa": "ブルーグリーン", "labelEn": "Blue-Green", "detailJa": "ダウンタイムなく一括で新環境に切替。", "detailEn": "Cut over to the new environment all at once with no downtime."}], "edges": [["criteria", "decision"], ["decision", "shadow"], ["decision", "canary"], ["decision", "bluegreen"]]}, {"titleJa": "可観測性スタック", "titleEn": "Observability Stack", "nodes": [{"id": "tracing", "labelJa": "トレーシング", "labelEn": "Tracing", "detailJa": "リクエストの流れを個々に追跡。", "detailEn": "Follow the flow of individual requests."}, {"id": "logging", "labelJa": "ロギング", "labelEn": "Logging", "detailJa": "個々の出来事をイベントとして記録。", "detailEn": "Record individual events as logs."}, {"id": "metrics", "labelJa": "メトリクス", "labelEn": "Metrics", "detailJa": "レイテンシ・エラー率・トークンコストを集計。", "detailEn": "Aggregate latency, error rate, and token cost."}, {"id": "consolidate", "labelJa": "集約(App Insights)", "labelEn": "Consolidate (App Insights)", "detailJa": "Application Insights/Azure Monitorに一元集約。", "detailEn": "Consolidate into Application Insights / Azure Monitor."}, {"id": "alerts", "labelJa": "アラート", "labelEn": "Alerts", "detailJa": "異常を検知し担当者に通知。", "detailEn": "Detect anomalies and notify the team."}], "edges": [["tracing", "consolidate"], ["logging", "consolidate"], ["metrics", "consolidate"], ["consolidate", "alerts"]]}, {"titleJa": "評価ハーネスの流れ", "titleEn": "Evaluation Harness Workflow", "nodes": [{"id": "golden", "labelJa": "ゴールデンデータ", "labelEn": "Golden Dataset", "detailJa": "評価用の正解データセットを準備。", "detailEn": "Prepare a labeled reference dataset for evaluation."}, {"id": "run", "labelJa": "プロンプト/モデル実行", "labelEn": "Run Prompt/Model", "detailJa": "対象のプロンプトやモデルを実行し出力を取得。", "detailEn": "Run the target prompt or model to get outputs."}, {"id": "score", "labelJa": "スコアリング", "labelEn": "Score", "detailJa": "組込み+カスタム評価者で出力を採点。", "detailEn": "Score outputs with built-in and custom evaluators."}, {"id": "gate", "labelJa": "閾値ゲート", "labelEn": "Threshold Gate", "detailJa": "スコアが基準を満たすか合否判定。", "detailEn": "Pass/fail judgment against a score threshold."}, {"id": "cicd", "labelJa": "CI/CDに統合", "labelEn": "Wire into CI/CD", "detailJa": "自動化して回帰を継続的に検知。", "detailEn": "Automate to continuously detect regressions."}], "edges": [["golden", "run"], ["run", "score"], ["score", "gate"], ["gate", "cicd"]]}, {"titleJa": "コスト・レイテンシ最適化", "titleEn": "Cost & Latency Optimization", "nodes": [{"id": "core", "labelJa": "最適化レバー", "labelEn": "Optimization Levers", "detailJa": "コストとレイテンシを改善する複数の手段の中心概念。", "detailEn": "Central concept covering multiple ways to improve cost and latency."}, {"id": "ptu", "labelJa": "PTU予約", "labelEn": "PTU Reservation", "detailJa": "容量を予約し予測可能な低レイテンシを確保。", "detailEn": "Reserve capacity for predictable low latency."}, {"id": "caching", "labelJa": "プロンプトキャッシュ", "labelEn": "Prompt Caching", "detailJa": "繰り返し計算を削減してコストを下げる。", "detailEn": "Reduce repeated computation to cut cost."}, {"id": "quant", "labelJa": "量子化/蒸留", "labelEn": "Quantization/Distillation", "detailJa": "モデルを軽量化して推論を高速化。", "detailEn": "Lighten the model to speed up inference."}, {"id": "routing", "labelJa": "モデルルーティング", "labelEn": "Model Routing", "detailJa": "簡単なクエリを小型モデルへ振り分ける。", "detailEn": "Route easy queries to a smaller model."}], "edges": [["core", "ptu"], ["core", "caching"], ["core", "quant"], ["core", "routing"]]}, {"titleJa": "ガードレールの多層防御", "titleEn": "Defense-in-Depth Guardrails", "nodes": [{"id": "inputfilter", "labelJa": "入力フィルター", "labelEn": "Input Filter", "detailJa": "Prompt Shieldsで攻撃・有害入力を遮断。", "detailEn": "Block attacks and harmful input with Prompt Shields."}, {"id": "sysmsg", "labelJa": "システムメッセージ", "labelEn": "System Message", "detailJa": "モデルの振る舞いを制約する指示を設定。", "detailEn": "Constrain model behavior with system instructions."}, {"id": "generation", "labelJa": "生成", "labelEn": "Generation", "detailJa": "モデルが応答を生成する段階。", "detailEn": "The model generates a response."}, {"id": "outputfilter", "labelJa": "出力フィルター", "labelEn": "Output Filter", "detailJa": "生成後のコンテンツをフィルタリング。", "detailEn": "Filter generated content after the fact."}, {"id": "groundcheck", "labelJa": "根拠性検出", "labelEn": "Groundedness Check", "detailJa": "ハルシネーションを検知する。", "detailEn": "Detect hallucinations in the output."}, {"id": "protected", "labelJa": "保護素材検出", "labelEn": "Protected Material Check", "detailJa": "著作権保護対象コンテンツを検出。", "detailEn": "Detect protected/copyrighted material."}], "edges": [["inputfilter", "sysmsg"], ["sysmsg", "generation"], ["generation", "outputfilter"], ["outputfilter", "groundcheck"], ["groundcheck", "protected"]]}]};
const CERT_FLOWS = {"AB-620": [{"titleJa": "エージェントソリューションのALM", "titleEn": "Agent Solution ALM Lifecycle", "nodes": [{"id": "n1", "labelJa": "設計", "labelEn": "Design", "detailJa": "業務要件からトピック・ナレッジ・ツールの構成を設計する。責任あるAIの観点も設計時に織り込む。", "detailEn": "Design the topic, knowledge, and tool composition from business requirements, factoring in responsible AI from the start."}, {"id": "n2", "labelJa": "開発環境で構築", "labelEn": "Build in dev env", "detailJa": "開発環境の未管理ソリューションでトピック・エージェントフロー・接続を構築する。", "detailEn": "Build topics, agent flows, and connections in an unmanaged solution within the development environment."}, {"id": "n3", "labelJa": "テストセットで検証", "labelEn": "Validate with test sets", "detailJa": "テストセットと評価方法で応答品質を検証し、既存動作の回帰がないか確認する。", "detailEn": "Validate response quality with test sets and evaluation methods, checking for regressions in existing behavior."}, {"id": "n4", "labelJa": "ソリューション化", "labelEn": "Package as solution", "detailJa": "環境変数・接続参照を使ってエージェント一式をソリューションにパッケージする。", "detailEn": "Package the agent and its components into a solution, using environment variables and connection references."}, {"id": "n5", "labelJa": "パイプラインで昇格", "labelEn": "Promote via pipeline", "detailJa": "デプロイパイプラインでソリューションをテスト環境や本番環境へ自動的に昇格させる。", "detailEn": "Use a deployment pipeline to automatically promote the solution to test or production environments."}, {"id": "n6", "labelJa": "本番へ公開", "labelEn": "Publish to production", "detailJa": "管理ソリューションとして本番環境に読み取り専用でデプロイし、対象チャネルに公開する。", "detailEn": "Deploy as a managed solution (read-only) to production and publish to the target channels."}, {"id": "n7", "labelJa": "監視・分析", "labelEn": "Monitor & analyze", "detailJa": "分析ダッシュボードや会話トランスクリプトで利用状況・満足度・失敗パターンを監視する。", "detailEn": "Monitor usage, satisfaction, and failure patterns via analytics dashboards and conversation transcripts."}, {"id": "n8", "labelJa": "次サイクルへ", "labelEn": "Next cycle", "detailJa": "監視で得た知見をもとに次の設計サイクルへフィードバックし、継続的に改善する。", "detailEn": "Feed monitoring insights back into the next design cycle for continuous improvement."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"titleJa": "要件定義フロー", "titleEn": "Requirements Definition Flow", "nodes": [{"id": "n1", "labelJa": "業務課題の特定", "labelEn": "Identify business problem", "detailJa": "エージェントで解決すべき業務課題と対象ユーザーを明確にする。", "detailEn": "Clarify the business problem the agent should solve and identify the target users."}, {"id": "n2", "labelJa": "スコープ定義", "labelEn": "Define scope", "detailJa": "対応するユースケースの範囲と、対象外とする範囲を決める。", "detailEn": "Define which use cases are in scope and explicitly exclude those that are not."}, {"id": "n3", "labelJa": "データ/知識ソース選定", "labelEn": "Select data & knowledge sources", "detailJa": "SharePoint・Azure AI検索・SAP等のエンタープライズソースから必要なデータ/知識ソースを選ぶ。", "detailEn": "Select the required data and knowledge sources, such as SharePoint, Azure AI Search, or enterprise systems like SAP."}, {"id": "n4", "labelJa": "トピック設計", "labelEn": "Design topics", "detailJa": "トリガーフレーズと会話フローを設計し、ユーザー発話をトピックにマッピングする。", "detailEn": "Design trigger phrases and conversation flows, mapping user utterances to topics."}, {"id": "n5", "labelJa": "アクション/フロー設計", "labelEn": "Design actions & flows", "detailJa": "コネクタ・API・MCP・エージェントフローで実行するアクションを設計する。", "detailEn": "Design the actions to be executed via connectors, APIs, MCP, or agent flows."}, {"id": "n6", "labelJa": "ガードレール定義", "labelEn": "Define guardrails", "detailJa": "認証方式・データ損失防止（DLP）・トピックの範囲制限など責任あるAIのガードレールを定義する。", "detailEn": "Define responsible AI guardrails, including authentication method, DLP policy, and topic scope limits."}, {"id": "n7", "labelJa": "ステークホルダー承認", "labelEn": "Stakeholder approval", "detailJa": "業務オーナーやガバナンス担当者がスコープとガードレールをレビューし承認する。", "detailEn": "Business owners and governance stakeholders review and approve the scope and guardrails."}, {"id": "n8", "labelJa": "次サイクルへ", "labelEn": "Next cycle", "detailJa": "承認後の構築フェーズで得たフィードバックを次の要件定義サイクルに反映する。", "detailEn": "Feed feedback from the subsequent build phase back into the next requirements cycle."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n3", "n5"], ["n4", "n6"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"titleJa": "RAG/知識ソース構成", "titleEn": "RAG & Knowledge Source Pipeline", "nodes": [{"id": "n1", "labelJa": "知識ソース選定", "labelEn": "Select knowledge source", "detailJa": "SharePoint・Web・Azure AI検索・エンタープライズシステムから根拠データの出所を選ぶ。", "detailEn": "Choose the source of grounding data, such as SharePoint, the web, Azure AI Search, or enterprise systems."}, {"id": "n2", "labelJa": "取込・チャンク化", "labelEn": "Ingest & chunk", "detailJa": "文書を取り込み、検索に適したサイズの断片（チャンク）に分割する。", "detailEn": "Ingest documents and split them into chunks sized appropriately for retrieval."}, {"id": "n3", "labelJa": "埋め込み・索引作成", "labelEn": "Embed & index", "detailJa": "各チャンクを埋め込みベクトル化し、Azure AI検索にインデックスとして格納する。", "detailEn": "Embed each chunk as a vector and store it in an Azure AI Search index."}, {"id": "n4", "labelJa": "ユーザーの質問", "labelEn": "User question", "detailJa": "ユーザーが自然言語でエージェントに質問を入力する。", "detailEn": "The user submits a natural-language question to the agent."}, {"id": "n5", "labelJa": "検索・取得", "labelEn": "Retrieve chunks", "detailJa": "ベクトル/セマンティック検索で質問に最も関連するチャンクを取得する。", "detailEn": "Use vector/semantic search to retrieve the chunks most relevant to the question."}, {"id": "n6", "labelJa": "根拠付き生成", "labelEn": "Grounded generation", "detailJa": "取得したチャンクを根拠として、モデルが応答を生成する。", "detailEn": "The model generates a response grounded in the retrieved chunks."}, {"id": "n7", "labelJa": "引用の提示", "labelEn": "Show citations", "detailJa": "回答とともに出典元の文書やリンクを引用として提示し、検証可能にする。", "detailEn": "Present the source documents or links as citations alongside the answer, making it verifiable."}, {"id": "n8", "labelJa": "次サイクルへ", "labelEn": "Next cycle", "detailJa": "新しい文書や更新を定期的に再取込・再索引し、知識ソースを最新に保つ。", "detailEn": "Periodically re-ingest and re-index new or updated documents to keep the knowledge source current."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n5"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"titleJa": "マルチエージェント連携", "titleEn": "Multi-Agent Collaboration", "nodes": [{"id": "n1", "labelJa": "ユーザー要求", "labelEn": "User request", "detailJa": "Teamsなどのチャネルでユーザーがオーケストレーターエージェントに要求を送る。", "detailEn": "The user sends a request to the orchestrator agent via a channel such as Teams."}, {"id": "n2", "labelJa": "意図判定・委譲", "labelEn": "Classify & delegate", "detailJa": "オーケストレーターが意図を判断し、適切な子エージェントへ処理を委譲する。", "detailEn": "The orchestrator judges the intent and delegates the task to the appropriate child agent."}, {"id": "n3", "labelJa": "Copilot Studio子", "labelEn": "Copilot Studio child agent", "detailJa": "特定業務ドメインに特化したCopilot Studioの子エージェントが呼び出される。", "detailEn": "A domain-specialized Copilot Studio child agent is invoked."}, {"id": "n4", "labelJa": "Foundry/Fabric子", "labelEn": "Foundry/Fabric child agent", "detailJa": "A2Aプロトコル経由で、高度なモデルを持つFoundryエージェントや大規模データ向けFabricデータエージェントが呼び出される。", "detailEn": "A Foundry agent (advanced models) or Fabric data agent (large-scale data queries) is invoked via the A2A protocol."}, {"id": "n5", "labelJa": "ツール/コネクタ実行", "labelEn": "Call tools/connectors", "detailJa": "各子エージェントがコネクタ・カスタムコネクタ・MCPツールを呼び出して処理を実行する。", "detailEn": "Each child agent executes its task by calling connectors, custom connectors, or MCP tools."}, {"id": "n6", "labelJa": "結果集約", "labelEn": "Aggregate results", "detailJa": "オーケストレーターが各子エージェントからの結果を集約し整合性を確認する。", "detailEn": "The orchestrator aggregates the results from each child agent and checks for consistency."}, {"id": "n7", "labelJa": "応答生成・返却", "labelEn": "Compose response", "detailJa": "集約結果をもとに単一の応答を生成し、必要に応じて人の承認を挟んでユーザーに返す。", "detailEn": "Compose a single response from the aggregated results, optionally with human-in-the-loop approval, and return it to the user."}, {"id": "n8", "labelJa": "次サイクルへ", "labelEn": "Next cycle", "detailJa": "次のユーザー発話でも同じオーケストレーションの流れが繰り返される。", "detailEn": "The same orchestration flow repeats for the user's next turn."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n2", "n4"], ["n3", "n5"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"kind": "cycle", "titleJa": "エージェント開発ライフサイクル", "titleEn": "Agent Development Lifecycle", "centerJa": "反復", "centerEn": "Iterate", "nodes": [{"id": "n1", "labelJa": "計画", "labelEn": "Plan", "detailJa": "業務課題とKPIを定義し、対象シナリオ・データ源・成功指標を決める。", "detailEn": "Define the business problem, KPIs, target scenarios, data sources and success metrics."}, {"id": "n2", "labelJa": "構築", "labelEn": "Build", "detailJa": "Copilot Studio でトピック・知識・アクション（コネクタ/フロー）を実装する。", "detailEn": "Implement topics, knowledge and actions (connectors/flows) in Copilot Studio."}, {"id": "n3", "labelJa": "テスト", "labelEn": "Test", "detailJa": "テストパネルとサンプル会話で応答品質・グラウンディング・権限を検証する。", "detailEn": "Validate response quality, grounding and permissions via the test panel and sample chats."}, {"id": "n4", "labelJa": "公開", "labelEn": "Publish", "detailJa": "チャネル（Teams/Web）へ発行し、環境間を ALM で昇格する。", "detailEn": "Publish to channels (Teams/Web) and promote across environments via ALM."}, {"id": "n5", "labelJa": "監視", "labelEn": "Monitor", "detailJa": "分析ダッシュボードでエンゲージメント・離脱・エスカレーションを観測する。", "detailEn": "Watch engagement, drop-off and escalations in the analytics dashboard."}, {"id": "n6", "labelJa": "改善", "labelEn": "Improve", "detailJa": "未解決トピックとフィードバックから知識とフローを更新し、次サイクルへ。", "detailEn": "Update knowledge and flows from unresolved topics and feedback, then loop."}], "edges": []}, {"kind": "matrix", "titleJa": "エージェント設計の判断軸", "titleEn": "Agent Design Trade-offs", "axisXJa": ["定型・限定", "自律・広範"], "axisXEn": ["Scripted / narrow", "Autonomous / broad"], "axisYJa": ["軽量ガバナンス", "厳格ガバナンス"], "axisYEn": ["Light governance", "Strict governance"], "nodes": [{"id": "m1", "labelJa": "規制業種の一次窓口", "labelEn": "Regulated first-line bot", "detailJa": "定型トピック中心。監査ログとDLPを重視し逸脱を抑える。", "detailEn": "Mostly scripted; emphasize audit logs and DLP to limit deviation.", "q": 0}, {"id": "m2", "labelJa": "統制下の自律エージェント", "labelEn": "Governed autonomous agent", "detailJa": "生成応答＋アクションだが承認・HITL・厳格な権限境界を敷く。", "detailEn": "Generative answers plus actions, but with approvals, HITL and strict permission boundaries.", "q": 1}, {"id": "m3", "labelJa": "社内ヘルプ", "labelEn": "Internal helper", "detailJa": "低リスクな社内利用。軽量な統制で素早く展開する。", "detailEn": "Low-risk internal use; ship fast with light controls.", "q": 2}, {"id": "m4", "labelJa": "実験的コパイロット", "labelEn": "Experimental copilot", "detailJa": "広い自律・軽い統制。PoC向きだが本番前に統制強化が必須。", "detailEn": "Broad autonomy, light controls; fine for PoC but needs governance before production.", "q": 3}], "edges": []}], "AI-103": [{"titleJa": "RAG構成：Azure AI Searchで根拠付き生成", "titleEn": "RAG Architecture with Azure AI Search", "nodes": [{"id": "n1", "labelJa": "文書を取込", "labelEn": "Ingest documents", "detailJa": "Blob Storage等にあるPDFやOffice文書、Webページをデータソースとして接続し取り込む。", "detailEn": "Connect and ingest PDFs, Office files, or web pages from sources like Blob Storage as the data source."}, {"id": "n2", "labelJa": "分割(チャンク化)", "labelEn": "Chunk documents", "detailJa": "長文を検索・埋め込みに適したサイズ（数百トークン程度）の断片に分割する。", "detailEn": "Split long text into chunks of a few hundred tokens, sized for effective retrieval and embedding."}, {"id": "n3", "labelJa": "埋め込み生成", "labelEn": "Generate embeddings", "detailJa": "埋め込みモデルで各チャンクをベクトル化し、意味的な近さを数値で表現する。", "detailEn": "Use an embedding model to vectorize each chunk, representing semantic similarity numerically."}, {"id": "n4", "labelJa": "インデックス作成", "labelEn": "Build search index", "detailJa": "Azure AI Searchにベクトルとメタデータを格納し、ベクトル/キーワード/ハイブリッド検索用のインデックスを構築する。", "detailEn": "Store vectors and metadata in Azure AI Search, building an index for vector, keyword, or hybrid search."}, {"id": "n5", "labelJa": "クエリで検索", "labelEn": "Retrieve on query", "detailJa": "ユーザーの質問を埋め込み化し、インデックスから関連度の高いチャンクを検索（ハイブリッド検索）で取得する。", "detailEn": "Embed the user's question and retrieve the most relevant chunks from the index via hybrid search."}, {"id": "n6", "labelJa": "プロンプトに統合", "labelEn": "Augment prompt", "detailJa": "取得したチャンクをシステムプロンプトやコンテキストとしてLLMへの入力に組み込む(グラウンディング)。", "detailEn": "Inject retrieved chunks into the LLM's context as grounding data alongside the system prompt."}, {"id": "n7", "labelJa": "生成AIが応答", "labelEn": "Generate response", "detailJa": "Azure OpenAI等のモデルが、取得情報に基づいた根拠ある回答を生成する。", "detailEn": "The Azure OpenAI model generates a grounded answer based on the retrieved information."}, {"id": "n8", "labelJa": "引用元を提示", "labelEn": "Cite sources", "detailJa": "回答に出典（文書名・抜粋）を添えて提示し、ユーザーが根拠を検証できるようにする。", "detailEn": "Present citations (document name, excerpt) with the answer so users can verify the grounding."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"titleJa": "AIソリューション設計フロー", "titleEn": "AI Solution Design Flow", "nodes": [{"id": "n1", "labelJa": "要件を定義", "labelEn": "Define requirements", "detailJa": "ユースケース、精度・レイテンシ・コストの要件、対象言語やモダリティを整理する。", "detailEn": "Clarify the use case, required accuracy/latency/cost targets, target languages and modalities."}, {"id": "n2", "labelJa": "Azureサービス選定", "labelEn": "Select Azure services", "detailJa": "Foundry上でLLM/SLM、Computer Vision、Language、Document Intelligence等から適切なサービスを選ぶ。", "detailEn": "Choose the right services in Foundry — LLM/SLM, Computer Vision, Language, Document Intelligence, etc."}, {"id": "n3", "labelJa": "PoCを構築", "labelEn": "Build a PoC", "detailJa": "Foundryのプレイグラウンドやプロンプトフローで小規模な概念実証を作り、精度と挙動を検証する。", "detailEn": "Prototype in the Foundry playground or prompt flow to validate accuracy and behavior at small scale."}, {"id": "n4", "labelJa": "責任あるAI評価", "labelEn": "Responsible AI review", "detailJa": "公平性・安全性・プライバシー・透明性の観点でモデルと出力を評価し、リスクを洗い出す。", "detailEn": "Assess the model and outputs for fairness, safety, privacy, and transparency to surface risks."}, {"id": "n5", "labelJa": "安全対策を実装", "labelEn": "Implement safeguards", "detailJa": "Content SafetyのフィルターやシステムメッセージでNGコンテンツ・ジェイルブレイクを緩和する。", "detailEn": "Add Content Safety filters and system-message guardrails to mitigate harmful content and jailbreaks."}, {"id": "n6", "labelJa": "本番デプロイ", "labelEn": "Deploy to production", "detailJa": "エンドポイントを発行し、認証・スケーリング・リージョン冗長性を含めて本番環境へ展開する。", "detailEn": "Publish the endpoint and deploy to production, including auth, scaling, and regional redundancy."}, {"id": "n7", "labelJa": "監視と評価", "labelEn": "Monitor and evaluate", "detailJa": "トークン使用量、レイテンシ、品質指標、有害コンテンツ検出率を継続的に監視する。", "detailEn": "Continuously monitor token usage, latency, quality metrics, and harmful-content detection rates."}, {"id": "n8", "labelJa": "改善して再要件化", "labelEn": "Refine and re-scope", "detailJa": "監視結果とユーザーフィードバックをもとに要件を見直し、次の改善サイクルへつなげる。", "detailEn": "Use monitoring results and user feedback to revisit requirements and feed the next improvement cycle."}, {"id": "n9", "labelJa": "次サイクルへ", "labelEn": "Next cycle", "detailJa": "更新された要件を起点に、選定・PoC・評価のサイクルを再び回す。", "detailEn": "With updated requirements, the selection, PoC, and evaluation cycle begins again."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"], ["n8", "n9"]]}, {"titleJa": "コンテンツ安全パイプライン", "titleEn": "Content Safety Pipeline", "nodes": [{"id": "n1", "labelJa": "ユーザー入力受信", "labelEn": "Receive user input", "detailJa": "チャットやフォームからユーザーのプロンプトを受け取る。", "detailEn": "Accept the user's prompt from a chat interface or form submission."}, {"id": "n2", "labelJa": "入力フィルタ", "labelEn": "Filter input", "detailJa": "Content Safetyのプロンプトシールドで、ジェイルブレイクや間接プロンプトインジェクションを検出する。", "detailEn": "Use Content Safety Prompt Shields to detect jailbreak attempts and indirect prompt injection."}, {"id": "n3", "labelJa": "システムプロンプト適用", "labelEn": "Apply system prompt", "detailJa": "利用範囲や禁止事項を明示するシステムメッセージでモデルの挙動を制約する。", "detailEn": "Constrain model behavior with a system message that states scope and prohibited actions."}, {"id": "n4", "labelJa": "生成AIが応答生成", "labelEn": "Model generates response", "detailJa": "LLM/SLMがコンテキストとグラウンディングデータを踏まえて応答案を生成する。", "detailEn": "The LLM/SLM generates a draft response using context and any grounding data."}, {"id": "n5", "labelJa": "根拠性チェック", "labelEn": "Check groundedness", "detailJa": "Groundedness detectionで、応答がソース文書から逸脱（幻覚）していないか検証する。", "detailEn": "Use groundedness detection to verify the response doesn't deviate from source documents (hallucination check)."}, {"id": "n6", "labelJa": "出力フィルタ", "labelEn": "Filter output", "detailJa": "有害カテゴリ（暴力・自傷・性的・ヘイト）を重大度スコアで判定し、しきい値超えをブロックする。", "detailEn": "Score harmful categories (violence, self-harm, sexual, hate) by severity and block if thresholds are exceeded."}, {"id": "n7", "labelJa": "ユーザーへ返却", "labelEn": "Return to user", "detailJa": "安全性チェックを通過した応答のみをユーザーに提示する。", "detailEn": "Present only the response that has passed all safety checks to the user."}, {"id": "n8", "labelJa": "監査ログ記録", "labelEn": "Log for audit", "detailJa": "入出力・フィルタ結果をログに記録し、コンプライアンス監査や継続的改善に活用する。", "detailEn": "Log inputs, outputs, and filter results for compliance audits and ongoing improvement."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"kind": "layers", "titleJa": "Azure AI アプリの技術スタック", "titleEn": "Azure AI App Stack", "nodes": [{"id": "a1", "labelJa": "アプリ / UX", "labelEn": "App & UX", "detailJa": "チャット/エージェントUIで利用者に届ける。", "detailEn": "Deliver via chat/agent UI to users."}, {"id": "a2", "labelJa": "オーケストレーション", "labelEn": "Orchestration", "detailJa": "AI Foundry・Semantic Kernel で会話とツールを制御。", "detailEn": "Control dialogue and tools with AI Foundry / Semantic Kernel."}, {"id": "a3", "labelJa": "知識 / RAG", "labelEn": "Knowledge / RAG", "detailJa": "検索・ベクトルDBで根拠を供給しグラウンディング。", "detailEn": "Ground answers via search and vector DB."}, {"id": "a4", "labelJa": "モデル基盤", "labelEn": "Model foundation", "detailJa": "Azure OpenAI など基盤モデルが推論を担う。", "detailEn": "Foundation models (Azure OpenAI) perform inference."}], "edges": []}, {"kind": "timeline", "titleJa": "AIアプリ実装フェーズ", "titleEn": "AI App Implementation Phases", "nodes": [{"id": "b1", "labelJa": "設計 Design", "labelEn": "Design", "detailJa": "要件・データ・責任あるAI要件を定義する。", "detailEn": "Define requirements, data and Responsible AI needs."}, {"id": "b2", "labelJa": "試作 Prototype", "labelEn": "Prototype", "detailJa": "プロンプト/RAG で最小構成を実装する。", "detailEn": "Build a minimal version with prompts/RAG."}, {"id": "b3", "labelJa": "評価 Evaluate", "labelEn": "Evaluate", "detailJa": "精度・安全性・コストをオフライン評価する。", "detailEn": "Evaluate accuracy, safety and cost offline."}, {"id": "b4", "labelJa": "本番 Deploy", "labelEn": "Deploy", "detailJa": "監視とコンテンツフィルタ付きで公開する。", "detailEn": "Ship with monitoring and content filters."}, {"id": "b5", "labelJa": "運用 Operate", "labelEn": "Operate", "detailJa": "利用状況を監視し継続的に改善する。", "detailEn": "Monitor usage and improve continuously."}], "edges": []}], "AI-200": [{"titleJa": "エージェント／生成AIアプリの構成", "titleEn": "Agent / Generative AI App Architecture", "nodes": [{"id": "input", "labelJa": "ユーザー入力", "labelEn": "User Input", "detailJa": "チャットUIやAPI経由でユーザーの質問・指示を受け取る。Azure API ManagementやApp Serviceがフロントエンドとして受付を担うことが多い。", "detailEn": "The user's question or instruction arrives via a chat UI or API. Azure API Management or App Service commonly fronts this entry point."}, {"id": "orchestrator", "labelJa": "オーケストレーター（Semantic Kernel等）", "labelEn": "Orchestrator (e.g., Semantic Kernel)", "detailJa": "会話履歴・プランニングを管理し、ツール呼び出しが必要か、RAG検索が必要かを判断してAzure OpenAIへの呼び出しを組み立てる。", "detailEn": "Manages conversation state and planning, deciding whether function calling or RAG retrieval is needed, and composes the calls to Azure OpenAI."}, {"id": "tool_call", "labelJa": "関数呼び出し（外部API/プラグイン）", "labelEn": "Function Calling (External API / Plugin)", "detailJa": "Azure OpenAIのfunction callingで外部API・業務システム・プラグインを呼び出し、構造化された結果を取得する。", "detailEn": "Azure OpenAI function calling invokes an external API, backend system, or plugin and returns a structured result."}, {"id": "rag_retrieval", "labelJa": "RAG検索（Azure AI Search）", "labelEn": "RAG Retrieval (Azure AI Search)", "detailJa": "Azure AI Searchのベクトル／ハイブリッドインデックスに対しクエリを実行し、関連ドキュメント断片を取得する。", "detailEn": "Queries an Azure AI Search vector or hybrid index to retrieve relevant document passages for grounding."}, {"id": "grounded_context", "labelJa": "グラウンディングコンテキスト組み立て", "labelEn": "Grounded Context Assembly", "detailJa": "ツール結果と検索結果を統合し、プロンプトに埋め込むコンテキストとしてトークン数を考慮しながら整形する。", "detailEn": "Combines tool outputs and retrieved passages into a single context, trimmed to fit the prompt's token budget."}, {"id": "llm_generate", "labelJa": "Azure OpenAIによる生成", "labelEn": "Azure OpenAI Generation", "detailJa": "システムプロンプト・グラウンディングコンテキスト・ユーザー入力を渡し、Azure OpenAIモデル（例: GPT系）で応答を生成する。", "detailEn": "Passes the system prompt, grounded context, and user input to an Azure OpenAI model (e.g., a GPT-series deployment) to generate a response."}, {"id": "content_safety", "labelJa": "Content Safetyガードレール", "labelEn": "Content Safety Guardrail", "detailJa": "Azure AI Content Safetyでプロンプト・生成結果の有害コンテンツやジェイルブレイクを検査し、閾値超過時はブロック・修正する。", "detailEn": "Azure AI Content Safety screens both the prompt and the generated output for harmful content or jailbreak attempts, blocking or revising when thresholds are exceeded."}, {"id": "response", "labelJa": "応答をユーザーへ返却", "labelEn": "Return Response to User", "detailJa": "検査済みの応答をクライアントへ返し、必要に応じて会話履歴・監査ログをApplication Insightsへ記録する。", "detailEn": "The vetted response is returned to the client, with conversation history and audit logs optionally recorded to Application Insights."}], "edges": [["input", "orchestrator"], ["orchestrator", "tool_call"], ["orchestrator", "rag_retrieval"], ["tool_call", "grounded_context"], ["rag_retrieval", "grounded_context"], ["grounded_context", "llm_generate"], ["llm_generate", "content_safety"], ["content_safety", "response"]]}, {"titleJa": "ベクトル検索／RAGデータフロー", "titleEn": "Vector Search / RAG Data Flow", "nodes": [{"id": "ingest", "labelJa": "データ取込（Blob Storage）", "labelEn": "Data Ingestion (Blob Storage)", "detailJa": "PDFやOffice文書などのソースデータをAzure Blob Storageに配置し、インデクサーのデータソースとして登録する。", "detailEn": "Source documents (PDFs, Office files, etc.) are placed in Azure Blob Storage and registered as an indexer data source."}, {"id": "indexer_skillset", "labelJa": "インデクサー＋スキルセットでチャンク分割", "labelEn": "Indexer + Skillset Chunking", "detailJa": "Azure AI Searchのインデクサーがスキルセット（Text Splitスキル等）を実行し、文書を検索・埋め込みに適したサイズのチャンクへ分割する。", "detailEn": "The Azure AI Search indexer runs a skillset (e.g., a Text Split skill) that breaks documents into chunks sized for retrieval and embedding."}, {"id": "embed", "labelJa": "埋め込み生成（Azure OpenAI Embeddings）", "labelEn": "Embedding Generation (Azure OpenAI Embeddings)", "detailJa": "各チャンクをAzure OpenAIの埋め込みモデル（例: text-embedding系）でベクトル化する。組み込みスキルまたはカスタムスキルで実行される。", "detailEn": "Each chunk is vectorized by an Azure OpenAI embedding model (e.g., a text-embedding deployment), invoked via a built-in or custom skill."}, {"id": "vector_index", "labelJa": "ベクトルインデックス格納（Azure AI Search）", "labelEn": "Vector Index Storage (Azure AI Search)", "detailJa": "生成したベクトルとメタデータをAzure AI Searchのインデックスに格納し、後続のベクトル／ハイブリッド検索に備える。", "detailEn": "The resulting vectors and metadata are stored in an Azure AI Search index, ready for subsequent vector or hybrid search."}, {"id": "query_embed", "labelJa": "クエリの埋め込み変換", "labelEn": "Query Embedding", "detailJa": "ユーザーの検索クエリを同じ埋め込みモデルでベクトル化し、インデックスと比較可能な形式にする。", "detailEn": "The user's search query is embedded with the same model used for indexing, so it can be compared against the vector index."}, {"id": "hybrid_search", "labelJa": "ハイブリッド検索（ベクトル＋キーワード）", "labelEn": "Hybrid Search (Vector + Keyword)", "detailJa": "クエリベクトルとキーワード（BM25）検索を組み合わせたハイブリッド検索を実行し、候補チャンクを取得する。", "detailEn": "Runs hybrid search combining the query vector with keyword (BM25) search to retrieve candidate chunks."}, {"id": "rerank", "labelJa": "セマンティック再ランク", "labelEn": "Semantic Reranking", "detailJa": "Azure AI Searchのセマンティックランカーが候補結果をクエリとの意味的関連度で並べ替え、上位のみを生成用コンテキストに採用する。", "detailEn": "The Azure AI Search semantic ranker reorders candidates by semantic relevance to the query, and only the top results are kept for the generation context."}, {"id": "generate", "labelJa": "Azure OpenAIによる回答生成", "labelEn": "Azure OpenAI Answer Generation", "detailJa": "再ランク後の上位チャンクを根拠としてプロンプトに組み込み、Azure OpenAIが根拠付きの回答を生成する。", "detailEn": "The top reranked chunks are embedded as grounding context in the prompt, and Azure OpenAI generates a grounded answer."}], "edges": [["ingest", "indexer_skillset"], ["indexer_skillset", "embed"], ["embed", "vector_index"], ["query_embed", "hybrid_search"], ["vector_index", "hybrid_search"], ["hybrid_search", "rerank"], ["rerank", "generate"]]}, {"titleJa": "セキュア化／デプロイフロー", "titleEn": "Securing & Deployment Flow", "nodes": [{"id": "entra_auth", "labelJa": "Microsoft Entra IDで認証", "labelEn": "Microsoft Entra ID Authentication", "detailJa": "利用者・サービスの本人確認をMicrosoft Entra IDで行い、OAuth 2.0トークンに基づいてAPIやアプリへのアクセスを許可する。", "detailEn": "Users and services are authenticated via Microsoft Entra ID, granting access to APIs and apps based on OAuth 2.0 tokens."}, {"id": "managed_identity", "labelJa": "マネージドID＋RBACで権限付与", "labelEn": "Managed Identity + RBAC Authorization", "detailJa": "アプリにシークレットを持たせず、システム割り当てマネージドIDとAzure RBACで、Azure OpenAIやAzure AI Searchへの最小権限アクセスを構成する。", "detailEn": "Instead of embedding secrets, a system-assigned managed identity plus Azure RBAC grants the app least-privilege access to Azure OpenAI and Azure AI Search."}, {"id": "key_vault", "labelJa": "Key Vaultでシークレット管理", "labelEn": "Key Vault Secret Management", "detailJa": "APIキーや接続文字列などの残る機密情報はAzure Key Vaultに保管し、マネージドID経由で取得することでコードへの直書きを避ける。", "detailEn": "Remaining secrets such as API keys and connection strings are stored in Azure Key Vault and fetched via managed identity, avoiding hard-coded credentials."}, {"id": "vnet_private_endpoint", "labelJa": "VNet統合とプライベートエンドポイント", "labelEn": "VNet Integration & Private Endpoints", "detailJa": "Azure OpenAI・Azure AI Search・ストレージへの通信をプライベートエンドポイント経由に限定し、VNet統合でパブリックインターネットへの露出を遮断する。", "detailEn": "Traffic to Azure OpenAI, Azure AI Search, and storage is restricted to private endpoints, with VNet integration cutting off public internet exposure."}, {"id": "content_safety_gate", "labelJa": "Content Safetyフィルター適用", "labelEn": "Content Safety Filtering", "detailJa": "デプロイ前にAzure AI Content Safetyのコンテンツフィルターとブロックリストを構成し、有害・機密出力のリスクを低減する。", "detailEn": "Before deployment, Azure AI Content Safety content filters and blocklists are configured to reduce the risk of harmful or sensitive output."}, {"id": "deploy_container_apps", "labelJa": "Container Apps／AKSへデプロイ", "labelEn": "Deploy to Container Apps / AKS", "detailJa": "コンテナー化したアプリをACRからAzure Container AppsまたはAKSへデプロイし、スケーリングルールとリビジョン管理を設定する。", "detailEn": "The containerized app is deployed from ACR to Azure Container Apps or AKS, with scaling rules and revision management configured."}, {"id": "monitor", "labelJa": "Azure Monitor／Application Insightsで監視", "labelEn": "Azure Monitor & Application Insights Monitoring", "detailJa": "Application Insightsでリクエストのトレース・トークン使用量・レイテンシを収集し、Azure Monitorのアラートで異常を検知する。", "detailEn": "Application Insights collects request traces, token usage, and latency, while Azure Monitor alerts detect anomalies."}], "edges": [["entra_auth", "managed_identity"], ["managed_identity", "key_vault"], ["managed_identity", "vnet_private_endpoint"], ["key_vault", "content_safety_gate"], ["vnet_private_endpoint", "content_safety_gate"], ["content_safety_gate", "deploy_container_apps"], ["deploy_container_apps", "monitor"]]}, {"kind": "matrix", "titleJa": "AIサービス選定の判断軸", "titleEn": "Choosing an AI Service", "axisXJa": ["既製 (低カスタム)", "カスタム (高)"], "axisXEn": ["Prebuilt", "Custom"], "axisYJa": ["運用負荷 低", "運用負荷 高"], "axisYEn": ["Low ops", "High ops"], "nodes": [{"id": "c1", "labelJa": "既製+微調整", "labelEn": "Prebuilt + tuning", "detailJa": "既製サービスに設定と少量調整。運用管理はやや増える。", "detailEn": "Prebuilt service with config and light tuning; some ops overhead.", "q": 0}, {"id": "c2", "labelJa": "独自ファインチューニング", "labelEn": "Custom fine-tuning", "detailJa": "最大の自由度だが MLOps 運用負荷が最大。", "detailEn": "Maximum control but the highest MLOps burden.", "q": 1}, {"id": "c3", "labelJa": "Foundry Tools（旧 Azure AI Services）", "labelEn": "Foundry Tools (formerly Azure AI Services)", "detailJa": "API を呼ぶだけ。定型タスク向けで最速。", "detailEn": "Just call the API — fastest for standard tasks.", "q": 2}, {"id": "c4", "labelJa": "Foundry モデルカタログ", "labelEn": "Foundry model catalog", "detailJa": "選んだモデルをマネージドで展開し負荷を抑制。", "detailEn": "Deploy a chosen model managed, with contained ops.", "q": 3}], "edges": []}, {"kind": "pyramid", "titleJa": "AI活用の成熟度モデル", "titleEn": "AI Maturity Model", "nodes": [{"id": "d1", "labelJa": "自律・最適化", "labelEn": "Autonomous", "detailJa": "エージェントが判断・実行し継続的に最適化する。", "detailEn": "Agents decide, act and continuously optimize."}, {"id": "d2", "labelJa": "予測", "labelEn": "Predictive", "detailJa": "モデルが将来を予測し先手を打つ。", "detailEn": "Models predict the future and act ahead."}, {"id": "d3", "labelJa": "分析", "labelEn": "Diagnostic", "detailJa": "なぜ起きたかを分析する。", "detailEn": "Analyze why things happened."}, {"id": "d4", "labelJa": "データ基盤", "labelEn": "Foundation", "detailJa": "データ整備と AI サービス基盤を用意する。", "detailEn": "Prepare data and the AI service foundation."}], "edges": []}], "GH-900": [{"titleJa": "GitHub Flow（ブランチからデプロイまで）", "titleEn": "GitHub Flow (Branch to Deploy)", "nodes": [{"id": "branch", "labelJa": "ブランチ作成", "labelEn": "Create Branch", "detailJa": "main から作業用ブランチを作成する。命名例: feature/login-fix。1ブランチ=1機能/1修正が基本。", "detailEn": "Create a working branch off main, e.g. feature/login-fix. Keep one branch focused on one feature or fix."}, {"id": "commit", "labelJa": "コミット", "labelEn": "Commit Changes", "detailJa": "変更を小さく分けてコミットする。メッセージは命令形・現在形で簡潔に書く（例: Add login validation）。", "detailEn": "Make small, focused commits. Write messages in the imperative mood, e.g. 'Add login validation'."}, {"id": "push", "labelJa": "プッシュ", "labelEn": "Push to Remote", "detailJa": "git push origin ブランチ名 でリモートにブランチを反映し、他メンバーやCIから見える状態にする。", "detailEn": "Run git push origin <branch> to publish the branch remotely so teammates and CI can see it."}, {"id": "pr", "labelJa": "プルリクエスト作成", "labelEn": "Open Pull Request", "detailJa": "base=main、compare=作業ブランチでPRを作成。変更内容・目的をタイトルと説明に記載する。", "detailEn": "Open a PR with base=main and compare=your branch. Describe what changed and why in the title/description."}, {"id": "review", "labelJa": "コードレビュー", "labelEn": "Code Review", "detailJa": "レビュアーがコメント・変更要求（Request changes）・承認（Approve）を行う。CIチェックの結果もここで確認する。", "detailEn": "Reviewers comment, request changes, or approve. CI check results are also verified at this stage."}, {"id": "merge", "labelJa": "マージ", "labelEn": "Merge", "detailJa": "承認とCI成功が揃ったらmainへマージする。Merge/Squash/Rebaseなどの戦略をリポジトリの方針に合わせて選ぶ。", "detailEn": "Once approved and CI passes, merge into main using the repo's chosen strategy (merge, squash, or rebase)."}, {"id": "deploy", "labelJa": "デプロイ", "labelEn": "Deploy", "detailJa": "mainへのマージをトリガーに自動デプロイ、または手動でリリースする。GitHub Flowは常にデプロイ可能な状態を前提とする。", "detailEn": "A merge to main can trigger auto-deploy, or a manual release follows. GitHub Flow assumes main is always deployable."}], "edges": [["branch", "commit"], ["commit", "push"], ["push", "pr"], ["pr", "review"], ["review", "merge"], ["merge", "deploy"]]}, {"titleJa": "CI/CD（GitHub Actions ワークフロー）", "titleEn": "CI/CD with GitHub Actions", "nodes": [{"id": "trigger", "labelJa": "push / PR発生", "labelEn": "Push / PR Event", "detailJa": "リポジトリへのpushやプルリクエスト作成・更新が発生する。これがワークフローの起点となるイベント。", "detailEn": "A push or pull request create/update event occurs in the repository — the event that starts the workflow."}, {"id": "workflow_start", "labelJa": "ワークフロー起動", "labelEn": "Workflow Triggered", "detailJa": ".github/workflows/ 配下のYAMLファイルのonキーがイベントに一致すると、GitHub Actionsがワークフローを起動する。", "detailEn": "GitHub Actions starts the workflow when the event matches the 'on:' key of a YAML file under .github/workflows/."}, {"id": "runner", "labelJa": "ランナー割り当て", "labelEn": "Runner Assigned", "detailJa": "GitHub-hosted または self-hosted のランナーにジョブが割り当てられ、実行環境（VM）が起動する。", "detailEn": "The job is assigned to a GitHub-hosted or self-hosted runner, which boots the execution environment (VM)."}, {"id": "build", "labelJa": "ビルド", "labelEn": "Build", "detailJa": "依存関係のインストールやコンパイルなど、ジョブ内のstepsを順に実行してアプリをビルドする。", "detailEn": "The job runs its steps in order — installing dependencies, compiling, and building the application."}, {"id": "test", "labelJa": "テスト実行", "labelEn": "Run Tests", "detailJa": "自動テストを実行し、結果をチェック（checks）としてPRやコミットに反映する。失敗すればワークフローは赤くなる。", "detailEn": "Automated tests run, and results appear as checks on the PR/commit. A failure marks the workflow as failed."}, {"id": "gate", "labelJa": "チェック合格判定", "labelEn": "Status Check Gate", "detailJa": "必須ステータスチェック（required status checks）が全て成功していることをブランチ保護ルールが確認する。", "detailEn": "Branch protection rules confirm all required status checks have passed before allowing merge."}, {"id": "deploy_cd", "labelJa": "デプロイ", "labelEn": "Deploy", "detailJa": "テスト合格後、環境（environment）へ自動デプロイするジョブが実行される。承認が必要な環境ではデプロイ前に手動承認が入る。", "detailEn": "After tests pass, a deploy job ships to the target environment. Protected environments may require manual approval first."}], "edges": [["trigger", "workflow_start"], ["workflow_start", "runner"], ["runner", "build"], ["build", "test"], ["test", "gate"], ["gate", "deploy_cd"]]}, {"titleJa": "Issue から Projects への作業管理", "titleEn": "Issue-to-Projects Work Management", "nodes": [{"id": "issue_create", "labelJa": "Issue作成", "labelEn": "Create Issue", "detailJa": "バグ報告や機能要望をIssueとして起票する。テンプレートがあれば再利用し、再現手順や背景を記載する。", "detailEn": "File a bug report or feature request as an Issue. Use an issue template if available and describe context/steps."}, {"id": "triage", "labelJa": "トリアージ / ラベル付け", "labelEn": "Triage & Labeling", "detailJa": "bug・enhancement・priority:high などのラベルを付け、重複や優先度を整理するトリアージを行う。", "detailEn": "Apply labels such as bug, enhancement, or priority:high, and triage for duplicates and priority."}, {"id": "board", "labelJa": "Projectボードに追加", "labelEn": "Add to Project Board", "detailJa": "GitHub Projects（テーブル/ボード/ロードマップ表示）にIssueを追加し、Todo/In Progress/Doneなどのステータス列で管理する。", "detailEn": "Add the Issue to a GitHub Project (table/board/roadmap view) and track it through status columns like Todo/In Progress/Done."}, {"id": "assign", "labelJa": "担当者割り当て", "labelEn": "Assign Owner", "detailJa": "Assigneesに担当者を設定し、必要に応じてMilestoneやIterationフィールドで期日・スプリントを紐付ける。", "detailEn": "Set an Assignee, and optionally link a Milestone or Iteration field for due dates or sprint tracking."}, {"id": "in_progress", "labelJa": "作業開始（進行中）", "labelEn": "Work In Progress", "detailJa": "担当者がブランチを切って作業を開始し、ボード上のステータスをIn Progressへ更新する。", "detailEn": "The assignee creates a branch and starts work, updating the board status to In Progress."}, {"id": "link_pr", "labelJa": "PRとIssueを紐付け", "labelEn": "Link PR to Issue", "detailJa": "PRの説明に \"Closes #123\" のようなキーワードを書き、Issueと自動連携させる。", "detailEn": "Reference the Issue in the PR description with a keyword like 'Closes #123' to auto-link them."}, {"id": "close", "labelJa": "完了 / クローズ", "labelEn": "Done & Close", "detailJa": "紐付けたPRがマージされるとIssueが自動でクローズされ、Projectボードのステータスも自動的にDoneへ移動する。", "detailEn": "When the linked PR merges, the Issue auto-closes and the Project board status automatically moves to Done."}], "edges": [["issue_create", "triage"], ["triage", "board"], ["board", "assign"], ["assign", "in_progress"], ["in_progress", "link_pr"], ["link_pr", "close"]]}, {"kind": "cycle", "titleJa": "GitHub Flow", "titleEn": "GitHub Flow", "centerJa": "反復", "centerEn": "Iterate", "nodes": [{"id": "g1", "labelJa": "ブランチ作成", "labelEn": "Branch", "detailJa": "main から作業ブランチを切る。", "detailEn": "Create a working branch off main."}, {"id": "g2", "labelJa": "コミット", "labelEn": "Commit", "detailJa": "小さく変更をコミットしプッシュする。", "detailEn": "Commit small changes and push."}, {"id": "g3", "labelJa": "プルリク", "labelEn": "Pull request", "detailJa": "変更を PR で提案し議論する。", "detailEn": "Propose the change via a PR and discuss."}, {"id": "g4", "labelJa": "レビュー", "labelEn": "Review", "detailJa": "レビューと CI チェックを通す。", "detailEn": "Pass review and CI checks."}, {"id": "g5", "labelJa": "マージ", "labelEn": "Merge", "detailJa": "承認後 main へマージする。", "detailEn": "Merge into main after approval."}, {"id": "g6", "labelJa": "デプロイ", "labelEn": "Deploy", "detailJa": "main から自動デプロイし次の変更へ。", "detailEn": "Auto-deploy from main, then next change."}], "edges": []}, {"kind": "layers", "titleJa": "GitHub の構成要素", "titleEn": "GitHub Building Blocks", "nodes": [{"id": "h1", "labelJa": "リポジトリ", "labelEn": "Repository", "detailJa": "コードと履歴を保管する中心。", "detailEn": "The core store of code and history."}, {"id": "h2", "labelJa": "Issues / Projects", "labelEn": "Issues / Projects", "detailJa": "作業を追跡し計画する。", "detailEn": "Track and plan the work."}, {"id": "h3", "labelJa": "Pull Requests", "labelEn": "Pull Requests", "detailJa": "変更のレビューと統合を行う。", "detailEn": "Review and integrate changes."}, {"id": "h4", "labelJa": "Actions (CI/CD)", "labelEn": "Actions (CI/CD)", "detailJa": "自動ビルド・テスト・デプロイ。", "detailEn": "Automated build, test and deploy."}, {"id": "h5", "labelJa": "Security", "labelEn": "Security", "detailJa": "Dependabot・コードスキャンで保護する。", "detailEn": "Protect with Dependabot and code scanning."}], "edges": []},
  {
    "titleJa": "フォークからの貢献フロー（OSS）",
    "titleEn": "Fork-Based Contribution Flow (Open Source)",
    "nodes": [
      { "id": "fk_fork", "labelJa": "フォーク", "labelEn": "Fork", "detailJa": "書き込み権限のない公開リポジトリを自分のアカウント配下にコピーする。これが貢献の起点になる。", "detailEn": "Copy a public repo you lack write access to under your own account — the starting point for contributing." },
      { "id": "fk_clone", "labelJa": "クローン", "labelEn": "Clone", "detailJa": "フォークした自分のリポジトリを手元に複製し、upstream として本家も remote に追加する。", "detailEn": "Clone your fork locally and add the original repo as the 'upstream' remote." },
      { "id": "fk_branch", "labelJa": "ブランチ作成", "labelEn": "Create Branch", "detailJa": "変更用のトピックブランチを切って作業を分離する。", "detailEn": "Create a topic branch to isolate your changes." },
      { "id": "fk_commit", "labelJa": "コミット", "labelEn": "Commit", "detailJa": "変更を小さくコミットし、フォークへ push する。", "detailEn": "Make small commits and push them to your fork." },
      { "id": "fk_pr", "labelJa": "プルリクエスト", "labelEn": "Open Pull Request", "detailJa": "本家リポジトリに対し、フォークのブランチから PR を作成して変更を提案する。", "detailEn": "Open a PR from your fork's branch against the original repo to propose the change." },
      { "id": "fk_review", "labelJa": "レビュー・修正", "labelEn": "Review & Update", "detailJa": "メンテナのレビューに応じて追加コミットで修正する。", "detailEn": "Respond to maintainer review with follow-up commits." },
      { "id": "fk_merge", "labelJa": "本家へマージ", "labelEn": "Merged Upstream", "detailJa": "承認されると本家にマージされ、貢献が取り込まれる。以後は upstream から同期する。", "detailEn": "Once approved it is merged upstream, incorporating your contribution; then sync from upstream." }
    ],
    "edges": [ ["fk_fork","fk_clone"], ["fk_clone","fk_branch"], ["fk_branch","fk_commit"], ["fk_commit","fk_pr"], ["fk_pr","fk_review"], ["fk_review","fk_merge"] ]
  },
  {
    "titleJa": "Git のローカルからリモートへの流れ",
    "titleEn": "Git Working-to-Remote Lifecycle",
    "nodes": [
      { "id": "gl_modify", "labelJa": "作業ツリーで編集", "labelEn": "Edit in Working Tree", "detailJa": "ファイルを編集する。この段階の変更はまだ Git に記録されていない。", "detailEn": "Edit files; at this stage the changes are not yet recorded by Git." },
      { "id": "gl_stage", "labelJa": "ステージング", "labelEn": "Stage (git add)", "detailJa": "git add で次のコミットに含める変更をステージングエリアへ選ぶ。", "detailEn": "Use git add to select which changes go into the next commit (staging area)." },
      { "id": "gl_commit", "labelJa": "コミット", "labelEn": "Commit", "detailJa": "git commit でステージした変更をローカルリポジトリに履歴として確定する。", "detailEn": "Run git commit to record the staged changes as history in the local repo." },
      { "id": "gl_push", "labelJa": "プッシュ", "labelEn": "Push", "detailJa": "git push でローカルのコミットをリモート（GitHub）へ送信し共有する。", "detailEn": "Run git push to upload local commits to the remote (GitHub) and share them." },
      { "id": "gl_pull", "labelJa": "プル（同期）", "labelEn": "Pull (Sync)", "detailJa": "git pull で他者の変更を取得しローカルへ統合する。作業前に行い最新状態を保つ。", "detailEn": "Run git pull to fetch and integrate others' changes; do it before working to stay current." }
    ],
    "edges": [ ["gl_modify","gl_stage"], ["gl_stage","gl_commit"], ["gl_commit","gl_push"], ["gl_push","gl_pull"] ]
  },
  {
    "titleJa": "Codespaces での開発フロー",
    "titleEn": "Developing with Codespaces",
    "nodes": [
      { "id": "cs_open", "labelJa": "Codespace作成", "labelEn": "Create Codespace", "detailJa": "リポジトリから Codespace を起動し、ブラウザや VS Code でクラウド環境に接続する。", "detailEn": "Launch a Codespace from the repo and connect to the cloud environment in the browser or VS Code." },
      { "id": "cs_devc", "labelJa": "devcontainer適用", "labelEn": "Dev Container Applied", "detailJa": "devcontainer.json に基づき依存やツールが整った統一環境が自動構築される。", "detailEn": "A uniform environment with dependencies and tools is built automatically from devcontainer.json." },
      { "id": "cs_edit", "labelJa": "編集・実行", "labelEn": "Edit & Run", "detailJa": "クラウド上でコードを編集・ビルド・テストする。ローカル環境構築は不要。", "detailEn": "Edit, build and test code in the cloud with no local setup required." },
      { "id": "cs_commit", "labelJa": "コミット・プッシュ", "labelEn": "Commit & Push", "detailJa": "変更をコミットしブランチへ push する。", "detailEn": "Commit changes and push them to a branch." },
      { "id": "cs_pr", "labelJa": "プルリクエスト", "labelEn": "Open Pull Request", "detailJa": "そのまま PR を作成してレビューへ回す。使い終わった Codespace は削除できる。", "detailEn": "Open a PR for review; the Codespace can be deleted when finished." }
    ],
    "edges": [ ["cs_open","cs_devc"], ["cs_devc","cs_edit"], ["cs_edit","cs_commit"], ["cs_commit","cs_pr"] ]
  },
  {
    "titleJa": "Dependabot による脆弱性修正フロー",
    "titleEn": "Dependabot Vulnerability Fix Flow",
    "nodes": [
      { "id": "db_graph", "labelJa": "依存関係グラフ", "labelEn": "Dependency Graph", "detailJa": "リポジトリが使う依存パッケージを解析し一覧化する。", "detailEn": "Analyzes and lists the dependency packages the repository uses." },
      { "id": "db_alert", "labelJa": "アラート検知", "labelEn": "Alert Raised", "detailJa": "既知の脆弱性を持つ依存が見つかると Dependabot アラートが通知される。", "detailEn": "When a dependency has a known vulnerability, a Dependabot alert is raised." },
      { "id": "db_pr", "labelJa": "修正PR自動作成", "labelEn": "Auto PR Created", "detailJa": "security update が安全なバージョンへ更新する PR を自動生成する。", "detailEn": "A security update auto-opens a PR bumping the package to a safe version." },
      { "id": "db_ci", "labelJa": "CIで検証", "labelEn": "Verify with CI", "detailJa": "Actions のテストが走り、更新が既存機能を壊さないか確認する。", "detailEn": "Actions tests run to confirm the update does not break existing functionality." },
      { "id": "db_merge", "labelJa": "マージ", "labelEn": "Merge", "detailJa": "検証が通れば PR をマージし、脆弱性を解消する。", "detailEn": "If checks pass, merge the PR to remediate the vulnerability." }
    ],
    "edges": [ ["db_graph","db_alert"], ["db_alert","db_pr"], ["db_pr","db_ci"], ["db_ci","db_merge"] ]
  },
  {
    "kind": "cycle",
    "titleJa": "コードレビューの反復",
    "titleEn": "Code Review Iteration",
    "centerJa": "反復",
    "centerEn": "Iterate",
    "nodes": [
      { "id": "cr1", "labelJa": "PR作成", "labelEn": "Open PR", "detailJa": "変更を PR として提案する。", "detailEn": "Propose the change as a PR." },
      { "id": "cr2", "labelJa": "レビュー依頼", "labelEn": "Request Review", "detailJa": "レビュアーやCODEOWNERSに確認を依頼する。", "detailEn": "Ask reviewers or CODEOWNERS to look." },
      { "id": "cr3", "labelJa": "コメント", "labelEn": "Comments", "detailJa": "レビュアーが指摘や提案の変更を残す。", "detailEn": "Reviewers leave feedback and suggested changes." },
      { "id": "cr4", "labelJa": "修正コミット", "labelEn": "Update", "detailJa": "指摘に応じて追加コミットで修正する。", "detailEn": "Address feedback with follow-up commits." },
      { "id": "cr5", "labelJa": "承認", "labelEn": "Approve", "detailJa": "レビュアーが Approve しCIも成功する。", "detailEn": "Reviewers approve and CI passes." },
      { "id": "cr6", "labelJa": "マージ", "labelEn": "Merge", "detailJa": "main へマージし次の変更へ進む。", "detailEn": "Merge into main and move to the next change." }
    ],
    "edges": []
  },
  {
    "kind": "cycle",
    "titleJa": "DevOps 継続的サイクル",
    "titleEn": "DevOps Continuous Loop",
    "centerJa": "継続的改善",
    "centerEn": "Continuous improvement",
    "nodes": [
      { "id": "do1", "labelJa": "計画", "labelEn": "Plan", "detailJa": "Issues と Projects で作業を計画する。", "detailEn": "Plan work with Issues and Projects." },
      { "id": "do2", "labelJa": "コード", "labelEn": "Code", "detailJa": "ブランチで実装しコミットする。", "detailEn": "Implement on a branch and commit." },
      { "id": "do3", "labelJa": "ビルド", "labelEn": "Build", "detailJa": "Actions が自動でビルドする。", "detailEn": "Actions builds automatically." },
      { "id": "do4", "labelJa": "テスト", "labelEn": "Test", "detailJa": "自動テストで品質を検証する。", "detailEn": "Automated tests verify quality." },
      { "id": "do5", "labelJa": "リリース", "labelEn": "Release", "detailJa": "環境へデプロイしリリースする。", "detailEn": "Deploy to an environment and release." },
      { "id": "do6", "labelJa": "監視", "labelEn": "Monitor", "detailJa": "運用を観測し次の計画へ反映する。", "detailEn": "Observe operations and feed back into planning." }
    ],
    "edges": []
  },
  {
    "kind": "layers",
    "titleJa": "GitHub 管理階層",
    "titleEn": "GitHub Administrative Hierarchy",
    "nodes": [
      { "id": "ad1", "labelJa": "Enterprise", "labelEn": "Enterprise", "detailJa": "複数組織を束ね課金・ポリシー・SSOを一元管理する最上位。", "detailEn": "The top layer grouping many orgs for central billing, policy and SSO." },
      { "id": "ad2", "labelJa": "Organization", "labelEn": "Organization", "detailJa": "チームとリポジトリを共同所有・管理する単位。", "detailEn": "The unit that jointly owns and manages teams and repositories." },
      { "id": "ad3", "labelJa": "Team", "labelEn": "Team", "detailJa": "メンバーをまとめアクセス権を一括付与するグループ。", "detailEn": "A group bundling members to grant access collectively." },
      { "id": "ad4", "labelJa": "Repository", "labelEn": "Repository", "detailJa": "コードと作業が実際に置かれる場所。", "detailEn": "Where the code and work actually live." },
      { "id": "ad5", "labelJa": "Member", "labelEn": "Member", "detailJa": "権限に応じてリポジトリを操作する個々の利用者。", "detailEn": "Individual users who act on repos per their permissions." }
    ],
    "edges": []
  },
  {
    "kind": "layers",
    "titleJa": "GitHub のセキュリティ機能",
    "titleEn": "GitHub Security Building Blocks",
    "nodes": [
      { "id": "sec1", "labelJa": "秘密スキャン", "labelEn": "Secret scanning", "detailJa": "コミットされたキーやトークンを検出する。", "detailEn": "Detects committed keys and tokens." },
      { "id": "sec2", "labelJa": "Dependabot", "labelEn": "Dependabot", "detailJa": "依存の脆弱性を検知し更新PRを出す。", "detailEn": "Finds dependency vulnerabilities and opens update PRs." },
      { "id": "sec3", "labelJa": "依存関係レビュー", "labelEn": "Dependency review", "detailJa": "PRで追加される依存の危険を事前に示す。", "detailEn": "Flags risky dependencies added in a PR before merge." },
      { "id": "sec4", "labelJa": "コードスキャン", "labelEn": "Code scanning", "detailJa": "CodeQLでコードの脆弱性を静的解析する。", "detailEn": "Statically analyzes code for vulnerabilities via CodeQL." },
      { "id": "sec5", "labelJa": "セキュリティアドバイザリ", "labelEn": "Security advisories", "detailJa": "脆弱性を非公開で調整し公開する。", "detailEn": "Privately coordinate and then publish vulnerabilities." }
    ],
    "edges": []
  },
  {
    "kind": "matrix",
    "titleJa": "リポジトリ可視性の選択",
    "titleEn": "Choosing Repository Visibility",
    "axisXJa": ["限定公開", "広く公開"],
    "axisXEn": ["Restricted", "Broad"],
    "axisYJa": ["個人所有", "組織管理"],
    "axisYEn": ["Personal", "Org-managed"],
    "nodes": [
      { "id": "rv1", "labelJa": "個人のPrivate", "labelEn": "Personal private", "detailJa": "自分だけ、または招待した少数がアクセスする個人用の非公開リポジトリ。", "detailEn": "A personal private repo accessible only to you or a few invited people.", "q": 0 },
      { "id": "rv2", "labelJa": "個人のPublic (OSS)", "labelEn": "Personal public (OSS)", "detailJa": "誰でも閲覧・フォークできる個人の公開リポジトリ。OSS公開に使う。", "detailEn": "A public personal repo anyone can view and fork, used to publish open source.", "q": 1 },
      { "id": "rv3", "labelJa": "組織のPrivate", "labelEn": "Org private", "detailJa": "組織が所有し、許可されたメンバー/チームのみがアクセスする非公開リポジトリ。", "detailEn": "An org-owned private repo accessible only to permitted members/teams.", "q": 2 },
      { "id": "rv4", "labelJa": "Internal (InnerSource)", "labelEn": "Internal (InnerSource)", "detailJa": "Enterprise内の全メンバーへ公開し、社内でOSS的協業を促す可視性。", "detailEn": "Visible to all enterprise members to enable open, InnerSource-style collaboration internally.", "q": 3 }
    ]
  },
  {
    "kind": "matrix",
    "titleJa": "アカウントとプランの選択",
    "titleEn": "Choosing Account & Plan",
    "axisXJa": ["個人", "組織"],
    "axisXEn": ["Individual", "Organization"],
    "axisYJa": ["無償", "有償"],
    "axisYEn": ["Free", "Paid"],
    "nodes": [
      { "id": "ap1", "labelJa": "GitHub Free (個人)", "labelEn": "Free (individual)", "detailJa": "個人向け無償プラン。無制限のPublic/Privateリポジトリと基本機能を利用できる。", "detailEn": "Free individual plan with unlimited public/private repos and core features.", "q": 0 },
      { "id": "ap2", "labelJa": "GitHub Pro", "labelEn": "GitHub Pro", "detailJa": "個人向け有償プラン。高度なツールやより多いActions/Codespaces枠が付く。", "detailEn": "Paid individual plan adding advanced tools and larger Actions/Codespaces allowances.", "q": 1 },
      { "id": "ap3", "labelJa": "Organization Free", "labelEn": "Org Free", "detailJa": "組織向け無償プラン。チーム共同作業を基本機能の範囲で行える。", "detailEn": "Free org plan enabling team collaboration with core features.", "q": 2 },
      { "id": "ap4", "labelJa": "Team / Enterprise", "labelEn": "Team / Enterprise", "detailJa": "組織向け有償プラン。高度な管理・SSO・監査ログ等でガバナンスを強化する。", "detailEn": "Paid org plans adding advanced admin, SSO and audit logs for stronger governance.", "q": 3 }
    ]
  },
], "GH-300": [{"titleJa": "Copilot 提案のライフサイクル", "titleEn": "Lifecycle of a Copilot Suggestion", "nodes": [{"id": "context", "labelJa": "コンテキスト収集", "labelEn": "Context gathering", "detailJa": "現在のファイル、カーソル位置、開いている関連タブ、インポート文などをCopilotが収集する。ニューロン的な近傍コード（neighboring tabs）も参照される。", "detailEn": "Copilot gathers the active file, cursor position, open related tabs, and import statements. Neighboring-tabs content is also referenced for extra context."}, {"id": "exclude", "labelJa": "コンテンツ除外フィルタ", "labelEn": "Content exclusion filter", "detailJa": "組織で設定されたContent Exclusion（.gitignoreパターン等）に一致するファイルやパスは、この時点でコンテキストから除外される。", "detailEn": "Files or paths matching organization-configured Content Exclusion rules (gitignore-style patterns) are stripped from context at this stage."}, {"id": "prompt", "labelJa": "プロンプト構築", "labelEn": "Prompt construction", "detailJa": "収集・フィルタ済みのコンテキストとコメントやコード断片を組み合わせ、モデルに送信するプロンプトが内部で組み立てられる。", "detailEn": "Filtered context is combined with the developer's comments or code fragments into an internal prompt payload sent to the model."}, {"id": "inference", "labelJa": "モデル推論", "labelEn": "Model inference", "detailJa": "クラウド上のCopilotモデルがプロンプトを処理し、複数候補の補完案を生成する。応答はストリーミングで返却される。", "detailEn": "The cloud-hosted Copilot model processes the prompt and generates multiple candidate completions, streamed back to the client."}, {"id": "display", "labelJa": "提案表示", "labelEn": "Suggestion display", "detailJa": "エディタ上にゴーストテキスト、またはCopilot Chatのパネルとして提案が表示される。複数候補はAlt+]で切り替え可能。", "detailEn": "The suggestion appears as inline ghost text in the editor or in the Copilot Chat panel; multiple candidates can be cycled with Alt+]."}, {"id": "accept", "labelJa": "受入（Tab）", "labelEn": "Accept (Tab)", "detailJa": "開発者がTabキー等で提案を受け入れると、コードがそのまま挿入され、テレメトリとして受入イベントが記録される。", "detailEn": "The developer presses Tab (or similar) to accept; the code is inserted verbatim and an acceptance event is logged in telemetry."}, {"id": "reject", "labelJa": "却下（継続入力）", "labelEn": "Reject (keep typing)", "detailJa": "提案を無視してそのまま入力を続けるか、Escで明示的に却下する。却下も統計として記録され、モデルには反映されない。", "detailEn": "The developer ignores the suggestion and keeps typing, or presses Esc to explicitly dismiss it; rejection is logged but does not retrain the model."}], "edges": [["context", "exclude"], ["exclude", "prompt"], ["prompt", "inference"], ["inference", "display"], ["display", "accept"], ["display", "reject"]]}, {"titleJa": "プロンプトエンジニアリングの流れ", "titleEn": "Prompt Engineering Flow", "nodes": [{"id": "comment_context", "labelJa": "コメント/コンテキスト入力", "labelEn": "Comment / context input", "detailJa": "開発者が意図を説明するコメントや関数名、既存コードのスタイルなど、暗黙のコンテキストを用意する。", "detailEn": "The developer supplies an intent-describing comment, meaningful function names, and existing code style as implicit context."}, {"id": "specificity", "labelJa": "具体性を高める指示", "labelEn": "Increase specificity", "detailJa": "曖昧な指示を避け、入出力の型・制約・エッジケースなど具体的な情報を盛り込むことで候補の精度を上げる。", "detailEn": "Vague instructions are avoided in favor of concrete details—types, constraints, edge cases—to improve candidate accuracy."}, {"id": "template", "labelJa": "コード例・パターン提示", "labelEn": "Show code examples / patterns", "detailJa": "類似関数や期待するコーディングパターンを1つ提示することで、Copilotが従うべきスタイルを学習しやすくする。", "detailEn": "Providing one similar function or the desired coding pattern makes it easier for Copilot to infer the style to follow."}, {"id": "candidate_gen", "labelJa": "候補生成", "labelEn": "Candidate generation", "detailJa": "具体的な指示とコード例を踏まえ、モデルが複数の補完候補を生成し、内部でランキングする。", "detailEn": "Based on the specific instructions and examples, the model generates multiple completion candidates and ranks them internally."}, {"id": "refine", "labelJa": "絞り込み/リファイン", "labelEn": "Narrow down / refine", "detailJa": "Copilot Chatの/fixや/explain、追加の質問により候補を絞り込み、意図に合うよう反復的に調整する。", "detailEn": "Slash commands like /fix and /explain, or follow-up questions in Copilot Chat, iteratively narrow the candidates toward intent."}, {"id": "verify", "labelJa": "検証", "labelEn": "Verification", "detailJa": "生成されたコードをテスト実行や要件との突き合わせで検証し、期待通りに動作するか確認する。", "detailEn": "The generated code is verified by running tests or checking it against requirements to confirm it behaves as expected."}, {"id": "adopt", "labelJa": "採用してコミット", "labelEn": "Adopt and commit", "detailJa": "検証を通過したコードを採用し、通常のコードレビュープロセスに乗せてコミットする。", "detailEn": "Code that passes verification is adopted and committed, entering the normal code review process."}], "edges": [["comment_context", "specificity"], ["comment_context", "template"], ["specificity", "candidate_gen"], ["template", "candidate_gen"], ["candidate_gen", "refine"], ["refine", "verify"], ["verify", "adopt"]]}, {"titleJa": "セーフガードとレビューの流れ", "titleEn": "Safeguards and Review Flow", "nodes": [{"id": "generate", "labelJa": "生成コード", "labelEn": "Generated code", "detailJa": "Copilotによって生成・受け入れられたコードが、リポジトリのブランチにコミットされる直前の状態。", "detailEn": "Code generated and accepted from Copilot, sitting just before it is committed to a repository branch."}, {"id": "sast", "labelJa": "SASTスキャン", "labelEn": "SAST scan", "detailJa": "CodeQLなどの静的解析セキュリティテスト（SAST）とシークレットスキャンを実行し、脆弱性や機密情報の混入を検出する。", "detailEn": "Static Application Security Testing (e.g. CodeQL) and secret scanning run to detect vulnerabilities or leaked credentials."}, {"id": "license", "labelJa": "ライセンス/来歴確認", "labelEn": "License / provenance check", "detailJa": "Copilotのコード参照機能（public code matching）を用いて、公開コードとの一致やライセンス表記の要否を確認する。", "detailEn": "Copilot's code referencing (public code matching) feature checks for matches against public code and whether license attribution is required."}, {"id": "block", "labelJa": "ブロック/差し戻し", "labelEn": "Block / send back", "detailJa": "脆弱性、ライセンス抵触、レビュー不合格のいずれかが検出された場合、マージをブロックし開発者に修正を差し戻す。", "detailEn": "If a vulnerability, license conflict, or failed review is found at any stage, the merge is blocked and sent back to the developer for fixes."}, {"id": "human_review", "labelJa": "人手レビュー", "labelEn": "Human review", "detailJa": "SASTとライセンス確認を通過したコードは、通常のプルリクエストとして人間のレビュアーによる最終確認を受ける。", "detailEn": "Code that passes SAST and license checks goes through a normal pull request for final review by a human reviewer."}, {"id": "approve", "labelJa": "承認", "labelEn": "Approval", "detailJa": "レビュアーが変更内容、テスト結果、責任あるAI利用の観点から問題なしと判断し、承認する。", "detailEn": "The reviewer judges the change, test results, and responsible-AI-use considerations to be acceptable and approves it."}, {"id": "merge", "labelJa": "マージ", "labelEn": "Merge", "detailJa": "承認されたプルリクエストが対象ブランチにマージされ、CI/CDパイプラインを経て本番へと進む。", "detailEn": "The approved pull request is merged into the target branch and proceeds through the CI/CD pipeline toward production."}], "edges": [["generate", "sast"], ["sast", "license"], ["sast", "block"], ["license", "human_review"], ["license", "block"], ["human_review", "approve"], ["human_review", "block"], ["approve", "merge"]]}, {"kind": "timeline", "titleJa": "Copilot 導入ステップ", "titleEn": "Copilot Adoption Steps", "nodes": [{"id": "i1", "labelJa": "評価 Assess", "labelEn": "Assess", "detailJa": "対象チーム・ユースケース・ライセンスを評価する。", "detailEn": "Assess target teams, use cases and licensing."}, {"id": "i2", "labelJa": "試験導入 Pilot", "labelEn": "Pilot", "detailJa": "少人数で効果と受容性を検証する。", "detailEn": "Validate impact and acceptance with a small group."}, {"id": "i3", "labelJa": "展開 Rollout", "labelEn": "Rollout", "detailJa": "組織へ展開しオンボーディングする。", "detailEn": "Roll out org-wide and onboard."}, {"id": "i4", "labelJa": "ガバナンス Govern", "labelEn": "Govern", "detailJa": "ポリシー・除外・監査を整備する。", "detailEn": "Set policies, exclusions and audit."}, {"id": "i5", "labelJa": "定着 Adopt", "labelEn": "Adopt", "detailJa": "計測しベストプラクティスを共有する。", "detailEn": "Measure and share best practices."}], "edges": []}, {"kind": "matrix", "titleJa": "Copilot 活用場面", "titleEn": "Where to Use Copilot", "axisXJa": ["探索的", "定型的"], "axisXEn": ["Exploratory", "Routine"], "axisYJa": ["リスク 低", "リスク 高"], "axisYEn": ["Low risk", "High risk"], "nodes": [{"id": "j1", "labelJa": "設計案の壁打ち", "labelEn": "Ideation", "detailJa": "アイデア出しに有用だが人のレビュー必須。", "detailEn": "Great for ideation, but human review is required.", "q": 0}, {"id": "j2", "labelJa": "本番/重要コード", "labelEn": "Critical code", "detailJa": "生成は補助に留め、必ず検証とレビューを。", "detailEn": "Keep generation assistive; always verify and review.", "q": 1}, {"id": "j3", "labelJa": "学習・下書き", "labelEn": "Learning / drafts", "detailJa": "新技術の学習やコード下書きに最適。", "detailEn": "Ideal for learning and drafting code.", "q": 2}, {"id": "j4", "labelJa": "定型コード生成", "labelEn": "Boilerplate", "detailJa": "テストや定型コードの自動生成で高効率。", "detailEn": "High efficiency for tests and boilerplate.", "q": 3}], "edges": []},
  {
  "kind": "flow",
  "titleJa": "Copilot Chat 応答の流れ",
  "titleEn": "Copilot Chat Response Flow",
  "nodes": [
   {
    "id": "q_ask",
    "labelJa": "質問入力",
    "labelEn": "Ask",
    "detailJa": "開発者が自然言語で質問し、必要なら@参加者や#変数でコンテキストを指定する。",
    "detailEn": "The developer asks in natural language, optionally scoping context via @participants and #variables."
   },
   {
    "id": "q_ctx",
    "labelJa": "コンテキスト収集",
    "labelEn": "Gather context",
    "detailJa": "開いたファイル・選択範囲・指定リポジトリなど関連情報を集める。",
    "detailEn": "Relevant info such as open files, selection and named repos is gathered."
   },
   {
    "id": "q_excl",
    "labelJa": "除外適用",
    "labelEn": "Apply exclusions",
    "detailJa": "コンテンツ除外に一致するファイルはコンテキストから外される。",
    "detailEn": "Files matching content exclusion are removed from context."
   },
   {
    "id": "q_model",
    "labelJa": "モデル推論",
    "labelEn": "Model inference",
    "detailJa": "組み立てたプロンプトをモデルへ送り回答を生成する。",
    "detailEn": "The assembled prompt is sent to the model to generate an answer."
   },
   {
    "id": "q_filter",
    "labelJa": "出力フィルタ",
    "labelEn": "Output filtering",
    "detailJa": "有害表現や公開コード一致などを後処理でチェックする。",
    "detailEn": "Post-processing checks for toxic content and public-code matches."
   },
   {
    "id": "q_ans",
    "labelJa": "回答表示",
    "labelEn": "Show answer",
    "detailJa": "説明・コード・修正案を提示し、適用や追質問が可能。",
    "detailEn": "The explanation/code/fix is shown; the user can apply it or ask follow-ups."
   },
   {
    "id": "q_follow",
    "labelJa": "追質問/適用",
    "labelEn": "Follow-up / apply",
    "detailJa": "フォローアップで精緻化するか、提案を採用する。",
    "detailEn": "Refine via follow-up or accept the suggestion."
   }
  ],
  "edges": [
   [
    "q_ask",
    "q_ctx"
   ],
   [
    "q_ctx",
    "q_excl"
   ],
   [
    "q_excl",
    "q_model"
   ],
   [
    "q_model",
    "q_filter"
   ],
   [
    "q_filter",
    "q_ans"
   ],
   [
    "q_ans",
    "q_follow"
   ]
  ]
 },
 {
  "kind": "flow",
  "titleJa": "コンテンツ除外の適用フロー",
  "titleEn": "Content Exclusion Flow",
  "nodes": [
   {
    "id": "e_set",
    "labelJa": "除外設定",
    "labelEn": "Configure exclusion",
    "detailJa": "組織やリポジトリの管理者が除外するパスを設定する。",
    "detailEn": "Org or repo admins configure which paths to exclude."
   },
   {
    "id": "e_match",
    "labelJa": "パス照合",
    "labelEn": "Match paths",
    "detailJa": "要求時にファイル/パスが除外パターンに一致するか判定する。",
    "detailEn": "At request time, files/paths are checked against exclusion patterns."
   },
   {
    "id": "e_strip",
    "labelJa": "文脈から除外",
    "labelEn": "Strip from context",
    "detailJa": "一致したファイルはコンテキストや提案対象から外される。",
    "detailEn": "Matching files are removed from context and suggestions."
   },
   {
    "id": "e_noinl",
    "labelJa": "補完の抑止",
    "labelEn": "No inline suggestions",
    "detailJa": "除外ファイル内では補完が提供されない。",
    "detailEn": "No inline suggestions are offered inside excluded files."
   },
   {
    "id": "e_apply",
    "labelJa": "効果反映",
    "labelEn": "Take effect",
    "detailJa": "設定はIDEに同期され以後の要求へ反映される。",
    "detailEn": "Settings sync to the IDE and apply to subsequent requests."
   }
  ],
  "edges": [
   [
    "e_set",
    "e_match"
   ],
   [
    "e_match",
    "e_strip"
   ],
   [
    "e_strip",
    "e_noinl"
   ],
   [
    "e_match",
    "e_apply"
   ]
  ]
 },
 {
  "kind": "flow",
  "titleJa": "PRサマリー生成の流れ",
  "titleEn": "PR Summary Generation Flow",
  "nodes": [
   {
    "id": "p_diff",
    "labelJa": "差分収集",
    "labelEn": "Collect diff",
    "detailJa": "プルリクの変更差分とコミットを取得する。",
    "detailEn": "Gather the pull request's diff and commits."
   },
   {
    "id": "p_gen",
    "labelJa": "要約生成",
    "labelEn": "Generate summary",
    "detailJa": "変更内容を要約し説明欄の下書きを作る。",
    "detailEn": "Summarize the changes and draft the description."
   },
   {
    "id": "p_walk",
    "labelJa": "変更ウォークスルー",
    "labelEn": "Change walkthrough",
    "detailJa": "主要なファイル単位の変更点を箇条書きで示す。",
    "detailEn": "List key per-file changes as a walkthrough."
   },
   {
    "id": "p_review",
    "labelJa": "人がレビュー",
    "labelEn": "Human review",
    "detailJa": "作成者が内容を確認・編集して正確性を担保する。",
    "detailEn": "The author reviews and edits to ensure accuracy."
   },
   {
    "id": "p_post",
    "labelJa": "説明へ反映",
    "labelEn": "Post to PR",
    "detailJa": "確定した説明をプルリクへ反映する。",
    "detailEn": "Apply the finalized description to the pull request."
   }
  ],
  "edges": [
   [
    "p_diff",
    "p_gen"
   ],
   [
    "p_gen",
    "p_walk"
   ],
   [
    "p_walk",
    "p_review"
   ],
   [
    "p_review",
    "p_post"
   ]
  ]
 },
 {
  "kind": "flow",
  "titleJa": "Copilot CLI コマンド提案の流れ",
  "titleEn": "Copilot CLI Command Flow",
  "nodes": [
   {
    "id": "c_nl",
    "labelJa": "自然言語で依頼",
    "labelEn": "Ask in NL",
    "detailJa": "ターミナルでやりたい操作を自然言語で入力する。",
    "detailEn": "In the terminal, describe the desired operation in natural language."
   },
   {
    "id": "c_sug",
    "labelJa": "コマンド提案",
    "labelEn": "Suggest command",
    "detailJa": "目的に合うシェルコマンドを提案する。",
    "detailEn": "Suggest a shell command matching the intent."
   },
   {
    "id": "c_exp",
    "labelJa": "説明",
    "labelEn": "Explain",
    "detailJa": "提案コマンドの各部の意味を説明する。",
    "detailEn": "Explain what each part of the suggested command does."
   },
   {
    "id": "c_conf",
    "labelJa": "確認/修正",
    "labelEn": "Confirm / revise",
    "detailJa": "ユーザーが内容を確認し必要なら修正する。",
    "detailEn": "The user reviews and revises if needed."
   },
   {
    "id": "c_run",
    "labelJa": "実行",
    "labelEn": "Execute",
    "detailJa": "承認後にコマンドを実行する。",
    "detailEn": "Execute the command after approval."
   }
  ],
  "edges": [
   [
    "c_nl",
    "c_sug"
   ],
   [
    "c_sug",
    "c_exp"
   ],
   [
    "c_exp",
    "c_conf"
   ],
   [
    "c_conf",
    "c_run"
   ]
  ]
 },
 {
  "kind": "cycle",
  "titleJa": "プロンプト改善サイクル",
  "titleEn": "Prompt Refinement Cycle",
  "centerJa": "反復改善",
  "centerEn": "Iterate",
  "nodes": [
   {
    "id": "pr1",
    "labelJa": "目的を明確化",
    "labelEn": "Clarify goal",
    "detailJa": "達成したい成果と制約を具体的に定める。",
    "detailEn": "Define the desired outcome and constraints concretely."
   },
   {
    "id": "pr2",
    "labelJa": "文脈を付与",
    "labelEn": "Add context",
    "detailJa": "関連コードや例を選択・参照させる。",
    "detailEn": "Select and reference relevant code and examples."
   },
   {
    "id": "pr3",
    "labelJa": "プロンプト作成",
    "labelEn": "Draft prompt",
    "detailJa": "具体的で明確な指示を書く。",
    "detailEn": "Write a specific and clear instruction."
   },
   {
    "id": "pr4",
    "labelJa": "出力を評価",
    "labelEn": "Evaluate output",
    "detailJa": "結果の正しさと形式を確認・テストする。",
    "detailEn": "Check and test the result's correctness and format."
   },
   {
    "id": "pr5",
    "labelJa": "改善して再試行",
    "labelEn": "Refine & retry",
    "detailJa": "不足を補いプロンプトを調整して繰り返す。",
    "detailEn": "Adjust the prompt to fix gaps and repeat."
   }
  ],
  "edges": []
 },
 {
  "kind": "cycle",
  "titleJa": "責任あるAI実践サイクル",
  "titleEn": "Responsible AI Practice Cycle",
  "centerJa": "人の監督",
  "centerEn": "Human oversight",
  "nodes": [
   {
    "id": "ra1",
    "labelJa": "提案を受領",
    "labelEn": "Receive suggestion",
    "detailJa": "Copilotの提案やコードを受け取る。",
    "detailEn": "Receive Copilot's suggestion or code."
   },
   {
    "id": "ra2",
    "labelJa": "レビュー",
    "labelEn": "Review",
    "detailJa": "意図・正確性・可読性を人が確認する。",
    "detailEn": "Humans review intent, correctness and readability."
   },
   {
    "id": "ra3",
    "labelJa": "検証",
    "labelEn": "Verify",
    "detailJa": "テストとセキュリティ確認で妥当性を検証する。",
    "detailEn": "Verify via tests and security checks."
   },
   {
    "id": "ra4",
    "labelJa": "判断",
    "labelEn": "Decide",
    "detailJa": "採用・修正・却下を責任を持って決める。",
    "detailEn": "Accountably decide to accept, edit or reject."
   },
   {
    "id": "ra5",
    "labelJa": "学びを反映",
    "labelEn": "Feed back",
    "detailJa": "得た知見を指示や運用に反映する。",
    "detailEn": "Feed insights back into instructions and practice."
   }
  ],
  "edges": []
 },
 {
  "kind": "cycle",
  "titleJa": "Copilot導入の定着サイクル",
  "titleEn": "Copilot Adoption Loop",
  "centerJa": "計測",
  "centerEn": "Measure",
  "nodes": [
   {
    "id": "ad1",
    "labelJa": "有効化",
    "labelEn": "Enable",
    "detailJa": "対象チームへライセンスとポリシーを付与する。",
    "detailEn": "Grant licenses and policies to target teams."
   },
   {
    "id": "ad2",
    "labelJa": "教育",
    "labelEn": "Educate",
    "detailJa": "効果的な使い方と責任ある利用を学ぶ。",
    "detailEn": "Teach effective and responsible use."
   },
   {
    "id": "ad3",
    "labelJa": "活用",
    "labelEn": "Use",
    "detailJa": "日々の開発でCopilotを使う。",
    "detailEn": "Use Copilot in daily development."
   },
   {
    "id": "ad4",
    "labelJa": "計測",
    "labelEn": "Measure",
    "detailJa": "受け入れ率や満足度を指標で把握する。",
    "detailEn": "Track acceptance rate and satisfaction."
   },
   {
    "id": "ad5",
    "labelJa": "改善",
    "labelEn": "Improve",
    "detailJa": "知見を共有しポリシーと運用を見直す。",
    "detailEn": "Share insights and refine policy and practice."
   }
  ],
  "edges": []
 },
 {
  "kind": "layers",
  "titleJa": "Copilot アーキテクチャの層",
  "titleEn": "Copilot Architecture Layers",
  "nodes": [
   {
    "id": "ar1",
    "labelJa": "IDE/クライアント",
    "labelEn": "IDE / Client",
    "detailJa": "補完表示・コンテキスト収集・除外適用を担う。",
    "detailEn": "Handles suggestion display, context gathering and exclusion."
   },
   {
    "id": "ar2",
    "labelJa": "プロキシ層",
    "labelEn": "Proxy layer",
    "detailJa": "前処理フィルタと後処理を行う中継サービス。",
    "detailEn": "An intermediary service performing pre- and post-processing filters."
   },
   {
    "id": "ar3",
    "labelJa": "基盤モデル",
    "labelEn": "Foundation model",
    "detailJa": "クラウド上で候補を生成する大規模モデル。",
    "detailEn": "The large cloud model that generates candidates."
   },
   {
    "id": "ar4",
    "labelJa": "GitHub連携",
    "labelEn": "GitHub context",
    "detailJa": "リポジトリ・ナレッジベース等の組織文脈を供給する。",
    "detailEn": "Supplies org context such as repos and knowledge bases."
   }
  ],
  "edges": []
 },
 {
  "kind": "layers",
  "titleJa": "プロンプトのコンテキスト階層",
  "titleEn": "Prompt Context Hierarchy",
  "nodes": [
   {
    "id": "cx1",
    "labelJa": "カスタム指示",
    "labelEn": "Custom instructions",
    "detailJa": "常時適用される背景ルール(個人/リポジトリ)。",
    "detailEn": "Always-on background rules (personal/repository)."
   },
   {
    "id": "cx2",
    "labelJa": "明示参照",
    "labelEn": "Explicit references",
    "detailJa": "#fileや選択範囲で明示的に渡す情報。",
    "detailEn": "Info passed explicitly via #file and selections."
   },
   {
    "id": "cx3",
    "labelJa": "自動コンテキスト",
    "labelEn": "Automatic context",
    "detailJa": "開いたタブや近傍コードなど暗黙の情報。",
    "detailEn": "Implicit info such as open tabs and neighboring code."
   },
   {
    "id": "cx4",
    "labelJa": "ユーザー入力",
    "labelEn": "User prompt",
    "detailJa": "その場の質問や指示そのもの。",
    "detailEn": "The immediate question or instruction itself."
   }
  ],
  "edges": []
 },
 {
  "kind": "matrix",
  "titleJa": "Copilotプランの選び方",
  "titleEn": "Choosing a Copilot Plan",
  "axisXJa": [
   "個人",
   "組織"
  ],
  "axisXEn": [
   "Individual",
   "Organization"
  ],
  "axisYJa": [
   "統制 不要",
   "統制 重視"
  ],
  "axisYEn": [
   "Low governance",
   "High governance"
  ],
  "nodes": [
   {
    "id": "pl1",
    "labelJa": "個人開発者",
    "labelEn": "Solo developer",
    "detailJa": "Individualで手軽に開始。組織管理は不要。",
    "detailEn": "Start easily with Individual; no org management needed.",
    "q": 0
   },
   {
    "id": "pl2",
    "labelJa": "規制の厳しい個人",
    "labelEn": "Regulated solo",
    "detailJa": "個人でも統制が要るならBusiness相当を検討。",
    "detailEn": "If a solo user needs governance, consider Business-level.",
    "q": 1
   },
   {
    "id": "pl3",
    "labelJa": "小規模チーム",
    "labelEn": "Small team",
    "detailJa": "Businessでシート管理と基本ポリシーを利用。",
    "detailEn": "Use Business for seat management and core policy.",
    "q": 2
   },
   {
    "id": "pl4",
    "labelJa": "大企業",
    "labelEn": "Enterprise",
    "detailJa": "Enterpriseで組織知識連携と高度な統制を得る。",
    "detailEn": "Use Enterprise for org-knowledge integration and advanced governance.",
    "q": 3
   }
  ],
  "edges": []
 },
], "DP-900": [{"titleJa": "データ取り込みから可視化までのパイプライン", "titleEn": "End-to-End Data Pipeline", "nodes": [{"id": "n1", "labelJa": "データソース", "labelEn": "Data sources", "detailJa": "オンプレミスDB、IoTデバイス、アプリログなど多様な発生源からデータが生まれる。", "detailEn": "Data originates from on-prem databases, IoT devices, application logs, and more."}, {"id": "n2", "labelJa": "取り込み", "labelEn": "Ingestion", "detailJa": "Azure Data FactoryやEvent Hubsを使い、バッチ/ストリーミングでデータを収集する。", "detailEn": "Azure Data Factory or Event Hubs collects data via batch or streaming ingestion."}, {"id": "n3", "labelJa": "Rawゾーン保存", "labelEn": "Raw zone storage", "detailJa": "Data Lake Storage Gen2のRawゾーンに未加工のまま安価に保存する。", "detailEn": "Raw, unprocessed data lands cheaply in the Data Lake Storage Gen2 raw zone."}, {"id": "n4", "labelJa": "変換・加工", "labelEn": "Transform", "detailJa": "Data Factoryのマッピングデータフローや Databricksでクレンジング・整形を行う。", "detailEn": "Data Factory mapping data flows or Databricks clean and reshape the data."}, {"id": "n5", "labelJa": "Curatedゾーン保存", "labelEn": "Curated zone storage", "detailJa": "整形済みデータをCuratedゾーンやSynapseのテーブルに格納する。", "detailEn": "Cleaned data is stored in the curated zone or Synapse tables."}, {"id": "n6", "labelJa": "サーバーレスSQLで探索", "labelEn": "Ad-hoc query (serverless SQL)", "detailJa": "Rawデータに対してサーバーレスSQLプールで直接アドホック分析することも可能。", "detailEn": "Serverless SQL pool can also query raw data directly for ad-hoc analysis."}, {"id": "n7", "labelJa": "Power BIで可視化", "labelEn": "Visualize in Power BI", "detailJa": "Curatedデータやクエリ結果をPower BIでレポート・ダッシュボード化する。", "detailEn": "Power BI turns curated data or query results into reports and dashboards."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n7"], ["n3", "n6"], ["n6", "n7"]]}, {"titleJa": "OLTPからBIまでの分析ワークロード", "titleEn": "From OLTP to BI Analytics Workload", "nodes": [{"id": "n1", "labelJa": "OLTPシステム", "labelEn": "OLTP system", "detailJa": "Azure SQL Databaseなどで日々のトランザクションを処理する運用系システム。", "detailEn": "Azure SQL Database and similar systems process day-to-day transactions."}, {"id": "n2", "labelJa": "変更データの検出", "labelEn": "Change data capture", "detailJa": "変更フィードやCDCで更新差分を検出し、後続処理へ渡す。", "detailEn": "Change feed or CDC detects updated rows and passes them downstream."}, {"id": "n3", "labelJa": "ETL/ELTパイプライン", "labelEn": "ETL/ELT pipeline", "detailJa": "Data FactoryやSynapse Pipelinesが抽出・変換・格納を自動化する。", "detailEn": "Data Factory or Synapse Pipelines automate extract, transform, and load."}, {"id": "n4", "labelJa": "ディメンションモデル化", "labelEn": "Dimensional modeling", "detailJa": "ファクトテーブルとディメンションテーブルでスタースキーマを構築する。", "detailEn": "Fact and dimension tables are organized into a star schema."}, {"id": "n5", "labelJa": "OLAPストアへ格納", "labelEn": "Load into OLAP store", "detailJa": "Synapse専用SQLプールなど分析向けストアに整形済みデータを格納する。", "detailEn": "Cleaned data is loaded into an analytical store such as a dedicated SQL pool."}, {"id": "n6", "labelJa": "BIツールで分析", "labelEn": "Analyze in BI tool", "detailJa": "Power BIがOLAPストアに接続し、多次元分析やレポートを提供する。", "detailEn": "Power BI connects to the OLAP store to provide multidimensional analysis and reports."}, {"id": "n7", "labelJa": "意思決定に活用", "labelEn": "Drive decisions", "detailJa": "経営層や業務部門がダッシュボードを見て意思決定に活用する。", "detailEn": "Business and leadership teams use the dashboards to make decisions."}, {"id": "n8", "labelJa": "次サイクルへ", "labelEn": "Next batch cycle", "detailJa": "バッチは一定間隔で繰り返され、次のETL/ELTサイクルへつながる。", "detailEn": "The batch repeats on a schedule, feeding into the next ETL/ELT cycle."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"titleJa": "リレーショナル/非リレーショナルの選択フロー", "titleEn": "Choosing Relational vs Non-relational", "nodes": [{"id": "n1", "labelJa": "要件を評価", "labelEn": "Assess requirements", "detailJa": "データの形状や整合性要件、スケール要件を最初に洗い出す。", "detailEn": "Start by identifying data shape, consistency needs, and scale requirements."}, {"id": "n2", "labelJa": "固定スキーマが必要?", "labelEn": "Fixed schema needed?", "detailJa": "行と列の厳密な構造やJOINが必要かどうかを判断する。", "detailEn": "Decide whether strict rows/columns and JOINs are required."}, {"id": "n3", "labelJa": "リレーショナルDBを選択", "labelEn": "Choose relational DB", "detailJa": "Azure SQL DatabaseやPostgreSQLなどACID準拠のRDBMSを選ぶ。", "detailEn": "Pick an ACID-compliant RDBMS such as Azure SQL Database or PostgreSQL."}, {"id": "n4", "labelJa": "データ形状を確認", "labelEn": "Check data shape", "detailJa": "キー値、ドキュメント、グラフ、列指向のどれに近いかを確認する。", "detailEn": "Determine whether the data resembles key-value, document, graph, or wide-column shapes."}, {"id": "n5", "labelJa": "スケール要件を確認", "labelEn": "Check scale needs", "detailJa": "グローバル分散や超低遅延、大量書き込みが必要かを確認する。", "detailEn": "Check whether global distribution, low latency, or heavy writes are required."}, {"id": "n6", "labelJa": "Cosmos DBのAPIを選択", "labelEn": "Choose Cosmos DB API", "detailJa": "データ形状に応じてCore(SQL)/Mongo/Cassandra/Gremlin/TableのAPIを選ぶ。", "detailEn": "Pick the Cosmos DB API (Core SQL, Mongo, Cassandra, Gremlin, Table) matching the data shape."}, {"id": "n7", "labelJa": "実装・デプロイ", "labelEn": "Implement and deploy", "detailJa": "選択したデータベースサービスをAzureにプロビジョニングして実装する。", "detailEn": "Provision and implement the chosen database service on Azure."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n2", "n4"], ["n4", "n5"], ["n5", "n6"], ["n3", "n7"], ["n6", "n7"]]}, {"kind": "layers", "titleJa": "Azure データプラットフォームの階層", "titleEn": "Azure Data Platform Layers", "nodes": [{"id": "l1", "labelJa": "取込 Ingest", "labelEn": "Ingest", "detailJa": "Data Factory・Event Hubs でバッチ/ストリームを取り込む。", "detailEn": "Ingest batch and streaming data via Data Factory and Event Hubs."}, {"id": "l2", "labelJa": "格納 Store", "labelEn": "Store", "detailJa": "Data Lake Storage・Blob に生データを安価に保管する。", "detailEn": "Store raw data cheaply in Data Lake Storage / Blob."}, {"id": "l3", "labelJa": "処理 Process", "labelEn": "Process", "detailJa": "Synapse・Databricks で変換・集計・モデル化する。", "detailEn": "Transform, aggregate and model with Synapse / Databricks."}, {"id": "l4", "labelJa": "提供 Serve", "labelEn": "Serve", "detailJa": "SQL Database・Synapse SQL で分析用に整形して提供する。", "detailEn": "Serve curated data for analytics via SQL Database / Synapse SQL."}, {"id": "l5", "labelJa": "可視化 Visualize", "labelEn": "Visualize", "detailJa": "Power BI でダッシュボード化し意思決定に用いる。", "detailEn": "Visualize in Power BI dashboards to drive decisions."}], "edges": []}, {"kind": "pyramid", "titleJa": "データ活用の価値ピラミッド (DIKW)", "titleEn": "DIKW Value Pyramid", "nodes": [{"id": "p1", "labelJa": "知恵 Wisdom", "labelEn": "Wisdom", "detailJa": "予測に基づく最適な意思決定・自動化。", "detailEn": "Optimal, automated decisions grounded in prediction."}, {"id": "p2", "labelJa": "知識 Knowledge", "labelEn": "Knowledge", "detailJa": "パターンとモデル。「なぜ起きたか」を説明する。", "detailEn": "Patterns and models; explains why it happened."}, {"id": "p3", "labelJa": "情報 Information", "labelEn": "Information", "detailJa": "集計・関連付け。「何が起きたか」を示す。", "detailEn": "Aggregations and relationships; shows what happened."}, {"id": "p4", "labelJa": "データ Data", "labelEn": "Data", "detailJa": "生の測定値・記録。すべての基盤となる素材。", "detailEn": "Raw measurements and records; the foundation for everything."}], "edges": []},
  {
    "kind": "matrix",
    "titleJa": "Azureデータサービスの選択（ワークロード×データモデル）",
    "titleEn": "Choosing an Azure Data Service (Workload x Data Model)",
    "axisXJa": ["リレーショナル", "非リレーショナル"],
    "axisXEn": ["Relational", "Non-relational"],
    "axisYJa": ["分析 (OLAP)", "トランザクション (OLTP)"],
    "axisYEn": ["Analytics (OLAP)", "Transactional (OLTP)"],
    "nodes": [
      {"id": "dm1", "labelJa": "Azure SQL Database", "labelEn": "Azure SQL Database", "detailJa": "固定スキーマの業務トランザクションを高頻度に処理するリレーショナルなOLTP向けのPaaS。", "detailEn": "A relational PaaS for high-frequency OLTP transactions on a fixed schema.", "q": 0},
      {"id": "dm2", "labelJa": "Azure Cosmos DB", "labelEn": "Azure Cosmos DB", "detailJa": "グローバル分散と低遅延で柔軟スキーマのトランザクションを処理する非リレーショナルなOLTP向けサービス。", "detailEn": "A non-relational OLTP service handling flexible-schema transactions with global distribution and low latency.", "q": 1},
      {"id": "dm3", "labelJa": "Synapse専用SQLプール", "labelEn": "Synapse dedicated SQL pool", "detailJa": "構造化データを大規模に集計するリレーショナルなデータウェアハウス(OLAP)エンジン。", "detailEn": "A relational data warehouse (OLAP) engine that aggregates structured data at scale.", "q": 2},
      {"id": "dm4", "labelJa": "Data Lake + Spark", "labelEn": "Data Lake + Spark", "detailJa": "多様な形式の生データをそのまま貯めて分散処理する非リレーショナルな分析基盤。", "detailEn": "A non-relational analytics foundation that stores diverse raw data and processes it in a distributed way.", "q": 3}
    ],
    "edges": []
  },
  {
    "kind": "cycle",
    "titleJa": "データのライフサイクル",
    "titleEn": "The Data Lifecycle",
    "centerJa": "循環",
    "centerEn": "Lifecycle",
    "nodes": [
      {"id": "dl1", "labelJa": "生成", "labelEn": "Create", "detailJa": "アプリやデバイス、業務システムから新しいデータが生み出される。", "detailEn": "New data is generated by apps, devices, and business systems."},
      {"id": "dl2", "labelJa": "格納", "labelEn": "Store", "detailJa": "生成されたデータをデータベースやデータレイクに保存する。", "detailEn": "Generated data is stored in databases or a data lake."},
      {"id": "dl3", "labelJa": "処理", "labelEn": "Process", "detailJa": "クレンジング・変換・統合を行い分析に使える形に整える。", "detailEn": "Data is cleansed, transformed, and integrated into an analyzable form."},
      {"id": "dl4", "labelJa": "分析・活用", "labelEn": "Analyze and use", "detailJa": "レポートやモデルで洞察を引き出し意思決定に活用する。", "detailEn": "Insights are drawn via reports and models to drive decisions."},
      {"id": "dl5", "labelJa": "アーカイブ", "labelEn": "Archive", "detailJa": "利用頻度が下がったデータを低コスト層へ移して長期保管する。", "detailEn": "Rarely used data is moved to a low-cost tier for long-term retention."},
      {"id": "dl6", "labelJa": "破棄", "labelEn": "Dispose", "detailJa": "保持ポリシーに従い不要になったデータを安全に削除する。", "detailEn": "Data no longer needed is securely deleted per the retention policy."}
    ],
    "edges": []
  },
  {
    "kind": "flow",
    "titleJa": "メダリオンアーキテクチャのデータフロー",
    "titleEn": "Medallion Architecture Data Flow",
    "nodes": [
      {"id": "md1", "labelJa": "ソース", "labelEn": "Sources", "detailJa": "業務システムやファイルなど多様なソースからデータを取得する。", "detailEn": "Data is acquired from diverse sources such as business systems and files."},
      {"id": "md2", "labelJa": "ブロンズ層", "labelEn": "Bronze layer", "detailJa": "生データをそのままの形式で取り込み、再処理の原本として保持する。", "detailEn": "Raw data is ingested as-is and kept as the source of truth for reprocessing."},
      {"id": "md3", "labelJa": "シルバー層", "labelEn": "Silver layer", "detailJa": "クレンジング・重複排除・統合を行い整合の取れた詳細データにする。", "detailEn": "Data is cleansed, deduplicated, and integrated into conformed detail data."},
      {"id": "md4", "labelJa": "ゴールド層", "labelEn": "Gold layer", "detailJa": "ビジネス向けに集約・モデル化した指標データを用意する。", "detailEn": "Business-ready aggregated and modeled metric data is prepared."},
      {"id": "md5", "labelJa": "Power BIで可視化", "labelEn": "Visualize in Power BI", "detailJa": "ゴールド層のデータをレポートやダッシュボードで可視化する。", "detailEn": "Gold-layer data is visualized in reports and dashboards in Power BI."}
    ],
    "edges": [["md1", "md2"], ["md2", "md3"], ["md3", "md4"], ["md4", "md5"]]
  },
  {
    "kind": "layers",
    "titleJa": "Azure SQL の多層防御セキュリティ",
    "titleEn": "Azure SQL Defense-in-Depth Security",
    "nodes": [
      {"id": "sl1", "labelJa": "ネットワークセキュリティ", "labelEn": "Network security", "detailJa": "ファイアウォール規則やプライベートエンドポイントで接続元を制限する。", "detailEn": "Firewall rules and private endpoints restrict where connections can come from."},
      {"id": "sl2", "labelJa": "アクセス管理", "labelEn": "Access management", "detailJa": "Microsoft Entra ID認証とRBACで誰が何にアクセスできるかを制御する。", "detailEn": "Microsoft Entra ID authentication and RBAC control who can access what."},
      {"id": "sl3", "labelJa": "脅威保護", "labelEn": "Threat protection", "detailJa": "Microsoft Defender for SQLで脆弱性評価と異常検知を行う。", "detailEn": "Microsoft Defender for SQL provides vulnerability assessment and anomaly detection."},
      {"id": "sl4", "labelJa": "情報保護", "labelEn": "Information protection", "detailJa": "TDE・Always Encrypted・動的データマスキングでデータ自体を保護する。", "detailEn": "TDE, Always Encrypted, and dynamic data masking protect the data itself."},
      {"id": "sl5", "labelJa": "監査", "labelEn": "Auditing", "detailJa": "操作ログを記録し、コンプライアンスと事後調査に備える。", "detailEn": "Activity is logged for compliance and post-incident investigation."}
    ],
    "edges": []
  },
  {
    "kind": "cycle",
    "titleJa": "Power BI 開発ライフサイクル",
    "titleEn": "Power BI Development Lifecycle",
    "centerJa": "反復",
    "centerEn": "Iterate",
    "nodes": [
      {"id": "pb1", "labelJa": "接続", "labelEn": "Connect", "detailJa": "Power BI Desktopでデータソースへ接続してデータを取得する。", "detailEn": "Connect to data sources and get data in Power BI Desktop."},
      {"id": "pb2", "labelJa": "変換", "labelEn": "Transform", "detailJa": "Power Queryでクレンジングや整形を行いデータを準備する。", "detailEn": "Prepare data by cleansing and shaping it with Power Query."},
      {"id": "pb3", "labelJa": "モデル化", "labelEn": "Model", "detailJa": "リレーションシップとDAXメジャーを定義してデータモデルを作る。", "detailEn": "Build the data model by defining relationships and DAX measures."},
      {"id": "pb4", "labelJa": "可視化", "labelEn": "Visualize", "detailJa": "ビジュアルを配置して対話的なレポートを作成する。", "detailEn": "Create interactive reports by arranging visuals."},
      {"id": "pb5", "labelJa": "発行", "labelEn": "Publish", "detailJa": "レポートをPower BI Serviceへ発行しワークスペースに配置する。", "detailEn": "Publish the report to the Power BI Service into a workspace."},
      {"id": "pb6", "labelJa": "共有・更新", "labelEn": "Share and refresh", "detailJa": "アプリで配布しスケジュール更新で最新状態を保つ。", "detailEn": "Distribute via an app and keep data current with scheduled refresh."}
    ],
    "edges": []
  },
  {
    "kind": "matrix",
    "titleJa": "分析エンジンの選択（処理方式×実装スタイル）",
    "titleEn": "Choosing an Analytics Engine (Processing x Style)",
    "axisXJa": ["SQL中心", "コード/Spark中心"],
    "axisXEn": ["SQL-centric", "Code/Spark-centric"],
    "axisYJa": ["バッチ", "リアルタイム"],
    "axisYEn": ["Batch", "Real-time"],
    "nodes": [
      {"id": "ae1", "labelJa": "Azure Stream Analytics", "labelEn": "Azure Stream Analytics", "detailJa": "SQLライクなクエリでストリーミングデータをリアルタイムに処理する。", "detailEn": "Processes streaming data in real time using SQL-like queries.", "q": 0},
      {"id": "ae2", "labelJa": "Spark構造化ストリーミング", "labelEn": "Spark Structured Streaming", "detailJa": "Databricks等でコードを書きリアルタイムのストリームを分散処理する。", "detailEn": "Processes real-time streams in a distributed way with code in Databricks and similar.", "q": 1},
      {"id": "ae3", "labelJa": "Synapse専用SQLプール", "labelEn": "Synapse dedicated SQL pool", "detailJa": "T-SQLで大量の蓄積データをバッチで集計するデータウェアハウス。", "detailEn": "A data warehouse that batch-aggregates large accumulated data with T-SQL.", "q": 2},
      {"id": "ae4", "labelJa": "Azure Databricks (バッチ)", "labelEn": "Azure Databricks (batch)", "detailJa": "Sparkコードで大規模データをバッチ変換・機械学習する。", "detailEn": "Batch-transforms large data and runs machine learning with Spark code.", "q": 3}
    ],
    "edges": []
  },
  {
    "kind": "flow",
    "titleJa": "リアルタイムストリーミング分析パイプライン",
    "titleEn": "Real-Time Streaming Analytics Pipeline",
    "nodes": [
      {"id": "rs1", "labelJa": "イベント発生源", "labelEn": "Event producers", "detailJa": "IoTデバイスやアプリが継続的にイベントデータを送信する。", "detailEn": "IoT devices and apps continuously emit event data."},
      {"id": "rs2", "labelJa": "取り込み", "labelEn": "Ingest", "detailJa": "Event HubsやIoT Hubが大量のイベントストリームを受け止める。", "detailEn": "Event Hubs or IoT Hub captures the high-volume event stream."},
      {"id": "rs3", "labelJa": "ストリーム処理", "labelEn": "Stream processing", "detailJa": "Stream Analyticsが時間ウィンドウで集計・フィルタリングする。", "detailEn": "Stream Analytics aggregates and filters over time windows."},
      {"id": "rs4", "labelJa": "保存", "labelEn": "Store", "detailJa": "処理結果をSQLやData Lakeに保存して後続分析に備える。", "detailEn": "Results are stored in SQL or a data lake for further analysis."},
      {"id": "rs5", "labelJa": "リアルタイムダッシュボード", "labelEn": "Real-time dashboard", "detailJa": "Power BIへ直接出力しほぼ即時に状況を可視化する。", "detailEn": "Output flows directly to Power BI to visualize status almost instantly."}
    ],
    "edges": [["rs1", "rs2"], ["rs2", "rs3"], ["rs3", "rs4"], ["rs3", "rs5"]]
  },
  {
    "kind": "layers",
    "titleJa": "Microsoft Fabric のアーキテクチャ層",
    "titleEn": "Microsoft Fabric Architecture Layers",
    "nodes": [
      {"id": "fl1", "labelJa": "OneLake基盤", "labelEn": "OneLake foundation", "detailJa": "組織全体で単一の論理データレイクとして全アイテムのデータを保持する。", "detailEn": "Holds all items' data as a single organization-wide logical data lake."},
      {"id": "fl2", "labelJa": "計算エンジン", "labelEn": "Compute engines", "detailJa": "SQL・Spark・KQLなどの共有エンジンがOneLake上のデータを処理する。", "detailEn": "Shared engines such as SQL, Spark, and KQL process data on OneLake."},
      {"id": "fl3", "labelJa": "ワークロード", "labelEn": "Workloads", "detailJa": "データエンジニアリング・ウェアハウス・リアルタイム分析などの体験を提供する。", "detailEn": "Provide experiences such as data engineering, warehousing, and real-time analytics."},
      {"id": "fl4", "labelJa": "提示 (Power BI)", "labelEn": "Presentation (Power BI)", "detailJa": "Direct Lakeでデータを直接読み込みレポートとして可視化する。", "detailEn": "Reads data directly via Direct Lake and visualizes it as reports."},
      {"id": "fl5", "labelJa": "ガバナンス", "labelEn": "Governance", "detailJa": "Purview連携で分類・系統追跡・アクセス制御を横断的に行う。", "detailEn": "Integrates with Purview for classification, lineage, and access control across the platform."}
    ],
    "edges": []
  },
  {
    "kind": "cycle",
    "titleJa": "データガバナンスのサイクル",
    "titleEn": "Data Governance Cycle",
    "centerJa": "統治",
    "centerEn": "Govern",
    "nodes": [
      {"id": "gv1", "labelJa": "発見", "labelEn": "Discover", "detailJa": "組織内のデータ資産をスキャンしてカタログに登録する。", "detailEn": "Scan data assets across the organization and register them in a catalog."},
      {"id": "gv2", "labelJa": "分類", "labelEn": "Classify", "detailJa": "機密度や種類に応じてデータへラベルを付ける。", "detailEn": "Label data according to its sensitivity and type."},
      {"id": "gv3", "labelJa": "保護", "labelEn": "Protect", "detailJa": "暗号化やアクセス制御で分類に応じた保護を適用する。", "detailEn": "Apply protection such as encryption and access control based on classification."},
      {"id": "gv4", "labelJa": "監視", "labelEn": "Monitor", "detailJa": "アクセスや系統を追跡し、方針からの逸脱を検知する。", "detailEn": "Track access and lineage to detect deviations from policy."},
      {"id": "gv5", "labelJa": "改善", "labelEn": "Improve", "detailJa": "監視結果をもとにポリシーと分類を見直し次のサイクルへ回す。", "detailEn": "Refine policies and classifications from monitoring, then loop to the next cycle."}
    ],
    "edges": []
  },
  {
    "kind": "flow",
    "titleJa": "リレーショナルデータの正規化ステップ",
    "titleEn": "Relational Normalization Steps",
    "nodes": [
      {"id": "nf1", "labelJa": "非正規化テーブル", "labelEn": "Unnormalized table", "detailJa": "1つのセルに複数値を持つなど繰り返しや冗長が多い状態。", "detailEn": "A state with repeating groups and redundancy, such as multiple values in one cell."},
      {"id": "nf2", "labelJa": "第一正規形 (1NF)", "labelEn": "First normal form (1NF)", "detailJa": "各列を原子値にし、繰り返しグループを排除する。", "detailEn": "Make each column atomic and eliminate repeating groups."},
      {"id": "nf3", "labelJa": "第二正規形 (2NF)", "labelEn": "Second normal form (2NF)", "detailJa": "複合キーの一部だけに依存する部分従属を排除する。", "detailEn": "Remove partial dependencies on only part of a composite key."},
      {"id": "nf4", "labelJa": "第三正規形 (3NF)", "labelEn": "Third normal form (3NF)", "detailJa": "非キー属性間の推移的従属を排除して整合性を高める。", "detailEn": "Remove transitive dependencies among non-key attributes to improve integrity."}
    ],
    "edges": [["nf1", "nf2"], ["nf2", "nf3"], ["nf3", "nf4"]]
  },
], "SC-500": [{"titleJa": "ゼロトラストのアクセス制御フロー", "titleEn": "Zero Trust Access Control Flow", "nodes": [{"id": "request", "labelJa": "アクセス要求", "labelEn": "Access Request", "detailJa": "ユーザーやワークロードがアプリ・リソースへのアクセスを要求する起点。", "detailEn": "The starting point where a user or workload requests access to an app or resource."}, {"id": "identity", "labelJa": "ID検証", "labelEn": "Identity Verification", "detailJa": "Entra IDによるユーザー認証(パスワードレス/MFA含む)で本人確認を行う。", "detailEn": "Entra ID authenticates the requester's identity, including passwordless and MFA methods."}, {"id": "device", "labelJa": "デバイス準拠確認", "labelEn": "Device Compliance Check", "detailJa": "Intune管理対象かつコンプライアンスポリシーに準拠したデバイスかを確認する。", "detailEn": "Verifies the device is Intune-managed and meets compliance policy requirements."}, {"id": "risk", "labelJa": "リスク信号評価", "labelEn": "Risk Signal Evaluation", "detailJa": "Entra ID Protectionがサインインリスク・ユーザーリスクをリアルタイムで評価する。", "detailEn": "Entra ID Protection evaluates sign-in risk and user risk signals in real time."}, {"id": "ca", "labelJa": "条件付きアクセス評価", "labelEn": "Conditional Access Evaluation", "detailJa": "ユーザー・デバイス・場所・リスクの条件に基づき許可/ブロック/追加認証要求を判定する。", "detailEn": "Grants, blocks, or challenges access based on user, device, location, and risk conditions."}, {"id": "leastpriv", "labelJa": "最小権限の付与", "labelEn": "Least-Privilege Grant", "detailJa": "PIMのJIT昇格やスコープの絞られたロールで必要最小限の権限のみ付与する。", "detailEn": "Grants only the minimum necessary permissions via PIM just-in-time elevation or scoped roles."}, {"id": "audit", "labelJa": "監査とログ記録", "labelEn": "Audit and Logging", "detailJa": "アクセス結果と権限利用を継続的にログ記録し、後続の監査・検知に利用する。", "detailEn": "Continuously logs access outcomes and privilege usage for downstream audit and detection."}], "edges": [["request", "identity"], ["identity", "device"], ["device", "risk"], ["risk", "ca"], ["ca", "leastpriv"], ["leastpriv", "audit"]]}, {"titleJa": "インシデント対応フロー", "titleEn": "Incident Response Flow", "nodes": [{"id": "detect", "labelJa": "検知", "labelEn": "Detection", "detailJa": "Sentinelの分析ルールやDefender for Cloudのアラートが疑わしい活動を検知する。", "detailEn": "Sentinel analytics rules or Defender for Cloud alerts detect suspicious activity."}, {"id": "triage", "labelJa": "トリアージ", "labelEn": "Triage", "detailJa": "アラートの重大度と影響範囲を評価し、優先順位を付けてインシデント化する。", "detailEn": "Assesses alert severity and scope, prioritizing and converting it into an incident."}, {"id": "investigate", "labelJa": "調査", "labelEn": "Investigation", "detailJa": "KQLハンティングクエリや攻撃タイムラインで根本原因と侵害範囲を特定する。", "detailEn": "Uses KQL hunting queries and attack timelines to identify root cause and blast radius."}, {"id": "contain", "labelJa": "封じ込め", "labelEn": "Containment", "detailJa": "侵害アカウントの無効化やネットワーク隔離で被害拡大を止める。", "detailEn": "Disables compromised accounts or isolates network segments to stop further damage."}, {"id": "eradicate", "labelJa": "根絶", "labelEn": "Eradication", "detailJa": "マルウェアの除去や悪用された脆弱性・バックドアの排除を行う。", "detailEn": "Removes malware and eliminates exploited vulnerabilities or backdoors."}, {"id": "recover", "labelJa": "復旧", "labelEn": "Recovery", "detailJa": "システムとサービスを正常状態に復元し、段階的に運用を再開する。", "detailEn": "Restores systems and services to a healthy state and resumes operations in stages."}, {"id": "lessons", "labelJa": "教訓の反映", "labelEn": "Lessons Learned", "detailJa": "事後レビューを実施し、検知ルールやプレイブックに改善を反映する。", "detailEn": "Conducts a post-incident review and feeds improvements back into detection rules and playbooks."}], "edges": [["detect", "triage"], ["triage", "investigate"], ["investigate", "contain"], ["contain", "eradicate"], ["eradicate", "recover"], ["recover", "lessons"]]}, {"titleJa": "データ保護フロー", "titleEn": "Data Protection Flow", "nodes": [{"id": "discover", "labelJa": "データ検出", "labelEn": "Data Discovery", "detailJa": "Purviewのデータマップやスキャナーで組織内の機密データの所在を洗い出す。", "detailEn": "Purview data map and scanners locate where sensitive data resides across the organization."}, {"id": "classify", "labelJa": "機密度分類", "labelEn": "Sensitivity Classification", "detailJa": "機密情報の種類(SIT)やトレーニング可能な分類子でデータの機密度を判定する。", "detailEn": "Determines data sensitivity using sensitive information types and trainable classifiers."}, {"id": "label", "labelJa": "ラベル付け", "labelEn": "Labeling", "detailJa": "機密ラベルを自動または手動でファイル・メールに適用する。", "detailEn": "Applies sensitivity labels automatically or manually to files and emails."}, {"id": "protect", "labelJa": "保護適用", "labelEn": "Protection Enforcement", "detailJa": "ラベルに基づき暗号化・アクセス制限・DLPポリシーを適用する。", "detailEn": "Enforces encryption, access restrictions, and DLP policies driven by the label."}, {"id": "monitor", "labelJa": "監視と検知", "labelEn": "Monitoring and Detection", "detailJa": "内部リスク管理やDLPアラートで不審なデータ持ち出しを継続監視する。", "detailEn": "Continuously monitors for suspicious data exfiltration via insider risk management and DLP alerts."}, {"id": "remediate", "labelJa": "是正アクション", "labelEn": "Remediation Action", "detailJa": "検知結果に基づきアクセス取り消しやポリシー調整などの是正を行う。", "detailEn": "Takes remediation actions such as revoking access or tuning policy based on detection results."}], "edges": [["discover", "classify"], ["classify", "label"], ["label", "protect"], ["protect", "monitor"], ["monitor", "remediate"]]}, {"kind": "cycle", "titleJa": "SOCインシデント対応ループ", "titleEn": "SOC Incident Response Loop", "centerJa": "継続運用", "centerEn": "Continuous", "nodes": [{"id": "s1", "labelJa": "収集 Collect", "labelEn": "Collect", "detailJa": "ログ・シグナルを Sentinel/Defender に集約する。", "detailEn": "Aggregate logs and signals into Sentinel/Defender."}, {"id": "s2", "labelJa": "検知 Detect", "labelEn": "Detect", "detailJa": "相関ルールと ML で脅威を検知する。", "detailEn": "Detect threats with correlation rules and ML."}, {"id": "s3", "labelJa": "調査 Investigate", "labelEn": "Investigate", "detailJa": "スコープ・侵入経路・影響資産を特定する。", "detailEn": "Determine scope, entry path and affected assets."}, {"id": "s4", "labelJa": "対応 Respond", "labelEn": "Respond", "detailJa": "封じ込め・根絶とプレイブック実行を行う。", "detailEn": "Contain, eradicate and run automated playbooks."}, {"id": "s5", "labelJa": "復旧 Recover", "labelEn": "Recover", "detailJa": "サービスを復元し再発防止策を適用する。", "detailEn": "Restore service and apply preventive measures."}, {"id": "s6", "labelJa": "改善 Improve", "labelEn": "Improve", "detailJa": "教訓を検出ルールと運用に反映する。", "detailEn": "Feed lessons back into detections and operations."}], "edges": []}, {"kind": "matrix", "titleJa": "脅威対応の優先度", "titleEn": "Threat Response Priority", "axisXJa": ["影響 小", "影響 大"], "axisXEn": ["Low impact", "High impact"], "axisYJa": ["緊急度 低", "緊急度 高"], "axisYEn": ["Low urgency", "High urgency"], "nodes": [{"id": "x1", "labelJa": "監視強化", "labelEn": "Heighten monitoring", "detailJa": "緊急だが影響限定。自動対応とアラート監視で対処。", "detailEn": "Urgent but limited impact — handle with automation and alert monitoring.", "q": 0}, {"id": "x2", "labelJa": "即時対応 (P1)", "labelEn": "Respond now (P1)", "detailJa": "封じ込めを最優先。SOC総動員でインシデント対応。", "detailEn": "Contain first; full SOC incident response.", "q": 1}, {"id": "x3", "labelJa": "記録・様子見", "labelEn": "Log & watch", "detailJa": "低優先度。ログを残し傾向を観察する。", "detailEn": "Low priority — log it and watch the trend.", "q": 2}, {"id": "x4", "labelJa": "計画的修正", "labelEn": "Planned fix", "detailJa": "影響大だが猶予あり。是正計画で段階対応。", "detailEn": "High impact but not urgent — remediate on a plan.", "q": 3}], "edges": []}], "SC-900": [{"titleJa": "Microsoft Entra ID のサインイン フロー(認証→条件付きアクセス→認可)", "titleEn": "Microsoft Entra ID Sign-in Flow (Authentication → Conditional Access → Authorization)", "nodes": [{"id": "n1", "labelJa": "サインイン要求", "labelEn": "Sign-in request", "detailJa": "ユーザーがアプリやサービスにアクセスしようとし、Microsoft Entra IDにサインインを要求する。", "detailEn": "The user attempts to access an app or service and initiates a sign-in request to Microsoft Entra ID."}, {"id": "n2", "labelJa": "認証(本人確認)", "labelEn": "Authentication", "detailJa": "パスワード、Windows Hello、FIDO2キー、Authenticatorアプリなどでユーザーが本人であることを証明する。「あなたは誰か」を確認する段階。", "detailEn": "The user proves their identity using a password, Windows Hello, a FIDO2 key, or the Authenticator app — the 'who are you' step."}, {"id": "n3", "labelJa": "サインイン リスク評価", "labelEn": "Sign-in risk evaluation", "detailJa": "Identity Protectionが匿名IPや通常と異なる場所など不審な兆候を検出し、リスクレベルを算出する。", "detailEn": "Identity Protection detects suspicious signals such as anonymous IPs or atypical travel and calculates a risk level."}, {"id": "n4", "labelJa": "条件付きアクセス ポリシー評価", "labelEn": "Conditional Access policy evaluation", "detailJa": "ユーザー・場所・デバイス・アプリ・リスクなどのシグナルをポリシーと照合し、許可/ブロック/追加要件を判定する。", "detailEn": "Signals such as user, location, device, app, and risk are matched against policies to decide allow, block, or additional requirements."}, {"id": "n5", "labelJa": "追加要件の充足", "labelEn": "Satisfy additional requirements", "detailJa": "ポリシーがMFA、準拠デバイス、パスワード変更などを要求した場合、ユーザーはそれを満たす必要がある。", "detailEn": "If the policy requires MFA, a compliant device, or a password change, the user must satisfy it before proceeding."}, {"id": "n6", "labelJa": "アクセス可否の決定", "labelEn": "Access decision", "detailJa": "すべての条件が満たされればサインインが許可され、満たされなければブロックまたは制限付きアクセスとなる。", "detailEn": "If all conditions are met, sign-in is allowed; otherwise it is blocked or granted limited access."}, {"id": "n7", "labelJa": "認可(権限の適用)", "labelEn": "Authorization", "detailJa": "サインインが許可された本人に対し、RBACやアクセス許可ポリシーに基づき「何ができるか」を決定する。", "detailEn": "For the authenticated user, RBAC and access permission policies determine what they are allowed to do."}, {"id": "n8", "labelJa": "リソースへのアクセス", "labelEn": "Access to resource", "detailJa": "認可された範囲内でアプリやデータなどのリソースにアクセスできる。", "detailEn": "The user can now access the app, data, or other resource within the authorized scope."}], "edges": [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n6"], ["n6", "n7"], ["n7", "n8"]]}, {"titleJa": "多層防御の7つの層(境界からデータまで)", "titleEn": "Defense in Depth: Seven Layers from Perimeter to Data", "nodes": [{"id": "m1", "labelJa": "物理セキュリティ", "labelEn": "Physical security", "detailJa": "データセンターへの物理的な侵入を防ぐ最外層。施錠、監視カメラ、入退室管理などが該当する。", "detailEn": "The outermost layer preventing physical intrusion into datacenters, using locks, cameras, and access control."}, {"id": "m2", "labelJa": "ID・アクセス管理", "labelEn": "Identity and access", "detailJa": "認証・認可を通じて正しい相手にのみアクセスを許可する層。MFAや条件付きアクセスが中核となる。", "detailEn": "The layer that grants access only to the right identities through authentication and authorization, centered on MFA and Conditional Access."}, {"id": "m3", "labelJa": "境界", "labelEn": "Perimeter", "detailJa": "DDoS対策やファイアウォールでネットワーク全体への不正な流入・攻撃を防ぐ層。", "detailEn": "The layer that uses DDoS protection and firewalls to prevent malicious traffic from reaching the network at all."}, {"id": "m4", "labelJa": "ネットワーク", "labelEn": "Network", "detailJa": "NSGやネットワーク セグメンテーションでリソース間の通信を制限し、侵害の拡大を防ぐ層。", "detailEn": "The layer that limits communication between resources using NSGs and segmentation to contain the blast radius."}, {"id": "m5", "labelJa": "コンピューティング", "labelEn": "Compute", "detailJa": "VMやコンテナーへのアクセス制御・パッチ適用・エンドポイント保護(EDR)を行う層。", "detailEn": "The layer securing VMs and containers through access control, patching, and endpoint protection (EDR)."}, {"id": "m6", "labelJa": "アプリケーション", "labelEn": "Application", "detailJa": "WAFやセキュアな開発(SDL)でアプリケーション層の脆弱性を防ぐ層。", "detailEn": "The layer that guards against application-layer vulnerabilities using a WAF and secure development practices."}, {"id": "m7", "labelJa": "データ", "labelEn": "Data", "detailJa": "暗号化やアクセス制御でデータそのものを保護する最も内側の層。攻撃者の最終目標であることが多い。", "detailEn": "The innermost layer protecting the data itself via encryption and access control — usually the attacker's ultimate target."}], "edges": [["m1", "m2"], ["m2", "m3"], ["m3", "m4"], ["m4", "m5"], ["m5", "m6"], ["m6", "m7"]]}, {"titleJa": "コンプライアンス管理サイクル(評価→ポリシー→是正→監査/レポート)", "titleEn": "Compliance Management Cycle (Assess → Policy → Remediate → Audit/Report)", "nodes": [{"id": "c1", "labelJa": "現状評価", "labelEn": "Assess current state", "detailJa": "Compliance Managerで規制テンプレートに基づき管理策の実施状況を評価し、コンプライアンス スコアを算出する。", "detailEn": "Compliance Manager assesses control implementation against regulatory templates and calculates a compliance score."}, {"id": "c2", "labelJa": "ギャップの特定", "labelEn": "Identify gaps", "detailJa": "評価結果から未実施・不十分な管理策を洗い出す。", "detailEn": "The assessment results reveal controls that are missing or insufficient."}, {"id": "c3", "labelJa": "ポリシーの策定", "labelEn": "Define policy", "detailJa": "秘密度ラベル、DLP、保持ポリシーなど、ギャップを埋めるための管理策・ポリシーを設計する。", "detailEn": "Sensitivity labels, DLP, retention policies, and other controls are designed to close the identified gaps."}, {"id": "c4", "labelJa": "ポリシーの展開", "labelEn": "Deploy policy", "detailJa": "策定したポリシーを対象のユーザーやコンテンツに適用する。", "detailEn": "The defined policies are applied to the target users and content."}, {"id": "c5", "labelJa": "モニタリングと是正", "labelEn": "Monitor and remediate", "detailJa": "Activity Explorerやアラートで違反を継続的に監視し、検出した問題を是正する。", "detailEn": "Activity Explorer and alerts continuously monitor for violations, and detected issues are remediated."}, {"id": "c6", "labelJa": "監査ログの記録", "labelEn": "Record audit logs", "detailJa": "統合監査ログがユーザーと管理者の操作を記録し、追跡可能な証跡を残す。", "detailEn": "The unified audit log records user and admin actions, creating a traceable record."}, {"id": "c7", "labelJa": "レポートと改善", "labelEn": "Report and improve", "detailJa": "コンプライアンス スコアと監査証跡をもとに経営層へ報告し、次の評価サイクルへの改善点を反映する。", "detailEn": "The compliance score and audit trails inform a report to leadership, feeding improvements into the next assessment cycle."}], "edges": [["c1", "c2"], ["c2", "c3"], ["c3", "c4"], ["c4", "c5"], ["c5", "c6"], ["c6", "c7"]]}, {"kind": "cycle", "titleJa": "セキュリティ運用サイクル (NIST CSF)", "titleEn": "Security Operations Cycle (NIST CSF)", "centerJa": "継続的", "centerEn": "Continuous", "nodes": [{"id": "c1", "labelJa": "識別 Identify", "labelEn": "Identify", "detailJa": "資産・リスク・データ分類を把握し優先度を付ける。", "detailEn": "Inventory assets, risks and data classification; set priorities."}, {"id": "c2", "labelJa": "防御 Protect", "labelEn": "Protect", "detailJa": "ID保護・条件付きアクセス・暗号化・DLPで守る。", "detailEn": "Protect with identity, Conditional Access, encryption and DLP."}, {"id": "c3", "labelJa": "検知 Detect", "labelEn": "Detect", "detailJa": "Defender・Sentinel で異常と脅威を検知する。", "detailEn": "Detect anomalies and threats with Defender and Sentinel."}, {"id": "c4", "labelJa": "対応 Respond", "labelEn": "Respond", "detailJa": "インシデントをトリアージし封じ込め・根絶する。", "detailEn": "Triage, contain and eradicate incidents."}, {"id": "c5", "labelJa": "復旧 Recover", "labelEn": "Recover", "detailJa": "復元し、教訓を次の防御へ反映する。", "detailEn": "Restore service and feed lessons back into defenses."}], "edges": []}], "GH-600": [{"titleJa": "エージェント統合SDLC（計画→実装→レビュー→CI/セキュリティスキャン→PR→マージ）", "titleEn": "Agent-integrated SDLC (Plan → Implement → Review → CI/Security Scan → PR → Merge)", "nodes": [{"id": "plan", "labelJa": "計画立案", "labelEn": "Plan", "detailJa": "Issueや要件からエージェントが構造化プラン（作業手順・成功基準）を作成する", "detailEn": "The agent drafts a structured plan (steps and success criteria) from an issue or requirement"}, {"id": "implement", "labelJa": "実装", "labelEn": "Implement", "detailJa": "プランに沿ってエージェントがコード変更を生成しコミットする", "detailEn": "The agent generates code changes and commits them according to the plan"}, {"id": "draftpr", "labelJa": "ドラフトPR作成", "labelEn": "Open Draft PR", "detailJa": "自己検証（テスト/lint）を経た変更をドラフトプルリクエストとして公開する", "detailEn": "After self-checks (tests/lint) the change is published as a draft pull request"}, {"id": "review", "labelJa": "コードレビュー", "labelEn": "Code Review", "detailJa": "Copilotコードレビューや人間のレビュアーが変更内容を確認しコメントする", "detailEn": "Copilot code review or a human reviewer inspects the change and leaves comments"}, {"id": "ci", "labelJa": "CIパイプライン", "labelEn": "CI Pipeline", "detailJa": "GitHub Actionsでビルド・単体テスト・回帰テストを自動実行する", "detailEn": "GitHub Actions automatically runs the build, unit tests, and regression tests"}, {"id": "secscan", "labelJa": "セキュリティスキャン", "labelEn": "Security Scan", "detailJa": "SAST・シークレットスキャン・依存関係スキャンでAI生成コードの脆弱性を検査する", "detailEn": "SAST, secret scanning, and dependency scanning inspect the AI-generated code for vulnerabilities"}, {"id": "approve", "labelJa": "承認ゲート", "labelEn": "Approval Gate", "detailJa": "レビュー承認とセキュリティスキャン合格の両方が揃った時点でマージ可能になる", "detailEn": "The change becomes mergeable once both review approval and a passing security scan are in place"}, {"id": "merge", "labelJa": "マージ", "labelEn": "Merge", "detailJa": "承認ゲートを通過した変更をmainブランチへマージし監査ログに記録する", "detailEn": "The change that passed the approval gate is merged into the main branch and logged for audit"}], "edges": [["plan", "implement"], ["implement", "draftpr"], ["draftpr", "review"], ["draftpr", "ci"], ["ci", "secscan"], ["review", "approve"], ["secscan", "approve"], ["approve", "merge"]]}, {"titleJa": "MCP接続構成（エージェント→MCPサーバ→Tools/Resources/Prompts→外部サービス）", "titleEn": "MCP Connection Architecture (Agent → MCP Server → Tools/Resources/Prompts → External Service)", "nodes": [{"id": "agent", "labelJa": "AIエージェント", "labelEn": "AI Agent", "detailJa": "Copilot等のエージェントがタスク遂行に必要な外部機能をMCP経由で呼び出す", "detailEn": "An agent such as Copilot invokes external capabilities it needs via MCP"}, {"id": "transport", "labelJa": "トランスポート層", "labelEn": "Transport Layer", "detailJa": "stdio（ローカル）またはHTTP/SSE（リモート）で接続を確立する", "detailEn": "The connection is established over stdio (local) or HTTP/SSE (remote)"}, {"id": "authz", "labelJa": "認可", "labelEn": "Authorization", "detailJa": "OAuthやAPIキーでMCPサーバーへのアクセスを認可する", "detailEn": "Access to the MCP server is authorized via OAuth or an API key"}, {"id": "mcpserver", "labelJa": "MCPサーバー", "labelEn": "MCP Server", "detailJa": "接続を受け付け、Tools/Resources/Promptsの3プリミティブを公開する", "detailEn": "The server accepts the connection and exposes the three MCP primitives: Tools, Resources, and Prompts"}, {"id": "tools", "labelJa": "Tools（実行可能関数）", "labelEn": "Tools (Callable Functions)", "detailJa": "エージェントが呼び出せる実行可能なアクション（例：Issue作成、デプロイ）を提供する", "detailEn": "Provides callable actions the agent can invoke, such as creating an issue or triggering a deploy"}, {"id": "resources", "labelJa": "Resources（読み取り専用データ）", "labelEn": "Resources (Read-only Data)", "detailJa": "ファイルやレコードなど読み取り専用のコンテキストデータをエージェントへ提供する", "detailEn": "Supplies read-only contextual data, such as files or records, to the agent"}, {"id": "prompts", "labelJa": "Prompts（定型テンプレート）", "labelEn": "Prompts (Reusable Templates)", "detailJa": "サーバー側が用意した再利用可能なプロンプトテンプレートをエージェントへ提供する", "detailEn": "Provides reusable prompt templates prepared by the server for the agent to use"}, {"id": "extsvc", "labelJa": "外部サービス", "labelEn": "External Service", "detailJa": "Tools/ResourcesがAPI・データベース・SaaSなど実際の外部システムを操作・参照する", "detailEn": "Tools and Resources ultimately operate on or read from a real external system such as an API, database, or SaaS"}], "edges": [["agent", "transport"], ["transport", "authz"], ["authz", "mcpserver"], ["mcpserver", "tools"], ["mcpserver", "resources"], ["mcpserver", "prompts"], ["tools", "extsvc"], ["resources", "extsvc"], ["prompts", "extsvc"]]}, {"titleJa": "エージェント評価ループ（ゴールデンデータ→評価→失敗分析→チューニング→回帰テスト）", "titleEn": "Agent Evaluation Loop (Golden Dataset → Evaluation → Failure Analysis → Tuning → Regression Test)", "nodes": [{"id": "golden", "labelJa": "ゴールデンデータセット", "labelEn": "Golden Dataset", "detailJa": "既知の正解が付与された入出力ペアの集合をベンチマークとして用意する", "detailEn": "A curated set of input/output pairs with known correct answers is prepared as a benchmark"}, {"id": "run", "labelJa": "エージェント実行", "labelEn": "Agent Run", "detailJa": "ゴールデンデータセットの各ケースに対しエージェントを実行し出力を収集する", "detailEn": "The agent is run against each case in the golden dataset and its outputs are collected"}, {"id": "eval", "labelJa": "評価（スコアリング）", "labelEn": "Evaluation (Scoring)", "detailJa": "LLM-as-a-Judgeや人間レビューで出力を正解と比較しスコアを付ける", "detailEn": "Outputs are scored against the expected answers using LLM-as-a-judge or human review"}, {"id": "failure", "labelJa": "失敗分析", "labelEn": "Failure Analysis", "detailJa": "不合格ケースを推論エラー・ツール誤用などの根本原因に分類する", "detailEn": "Failing cases are classified by root cause, such as reasoning error or tool misuse"}, {"id": "tuning", "labelJa": "チューニング", "labelEn": "Tuning", "detailJa": "分類結果に基づきプロンプト・ツール定義・ガードレールを調整する", "detailEn": "Prompts, tool definitions, or guardrails are adjusted based on the failure classification"}, {"id": "regression", "labelJa": "回帰テスト", "labelEn": "Regression Test", "detailJa": "調整後のエージェントを既存の全ケースに対して再実行し性能低下がないか検証する", "detailEn": "The tuned agent is re-run against the full existing case set to confirm no regressions"}, {"id": "release", "labelJa": "リリース判定", "labelEn": "Release Gate", "detailJa": "合格基準を満たした時点でエージェントの変更を本番へ反映する", "detailEn": "Once the pass criteria are met, the agent change is promoted to production"}], "edges": [["golden", "run"], ["run", "eval"], ["eval", "release"], ["eval", "failure"], ["failure", "tuning"], ["tuning", "regression"], ["regression", "release"]]}, {"kind": "cycle", "titleJa": "エージェント実行ループ", "titleEn": "Agent Execution Loop", "centerJa": "Reason + Act", "centerEn": "Reason + Act", "nodes": [{"id": "g1", "labelJa": "知覚 Perceive", "labelEn": "Perceive", "detailJa": "ユーザー要求・コンテキスト・履歴を取り込む。", "detailEn": "Take in the user request, context and history."}, {"id": "g2", "labelJa": "計画 Plan", "labelEn": "Plan", "detailJa": "目標を分解し、次に取る行動を決める。", "detailEn": "Decompose the goal and decide the next action."}, {"id": "g3", "labelJa": "ツール実行 Act", "labelEn": "Act (tools)", "detailJa": "関数・API・検索など外部ツールを呼び出す。", "detailEn": "Invoke external tools: functions, APIs, retrieval."}, {"id": "g4", "labelJa": "観察 Observe", "labelEn": "Observe", "detailJa": "結果を評価し内部状態を更新する。", "detailEn": "Evaluate the result and update internal state."}, {"id": "g5", "labelJa": "振り返り Reflect", "labelEn": "Reflect", "detailJa": "十分なら回答、不足なら再計画してループする。", "detailEn": "Answer if sufficient; otherwise re-plan and loop."}], "edges": []}], "AB-100": [{"titleJa": "単一エージェントの実行ループ", "titleEn": "Single-agent execution loop", "nodes": [{"id": "input", "labelJa": "入力受信", "labelEn": "Receive input", "detailJa": "ユーザーの発話やイベント(メール受信、レコード更新等)をトリガーとしてエージェントが起動する", "detailEn": "The agent starts when triggered by a user utterance or an event such as an email arriving or a record being updated"}, {"id": "plan", "labelJa": "計画立案", "labelEn": "Plan the task", "detailJa": "目標を達成するために必要な手順を推論し、どの情報やツールが必要かを組み立てる", "detailEn": "The agent reasons about the steps needed to reach the goal and works out which information or tools it will need"}, {"id": "retrieve", "labelJa": "グラウンディングデータ取得", "labelEn": "Retrieve grounding data", "detailJa": "Dataverse・SharePoint・ベクトルインデックス等のナレッジソースから関連データを検索し文脈として取り込む", "detailEn": "Relevant data is retrieved from knowledge sources such as Dataverse, SharePoint, or a vector index and pulled in as context"}, {"id": "tool_exec", "labelJa": "ツール実行", "labelEn": "Execute tool/action", "detailJa": "関数呼び出しやAPI・コネクタを介して外部システムに対する実際のアクション(検索・書き込み・計算等)を実行する", "detailEn": "The agent invokes a function, API, or connector to take a real action on an external system, such as searching, writing, or calculating"}, {"id": "verify", "labelJa": "結果検証", "labelEn": "Verify the result", "detailJa": "ツールの出力が目標や事実と整合しているかを自己チェックし、グラウンデッドネスと関連性を評価する", "detailEn": "The agent self-checks whether the tool's output aligns with the goal and the facts, evaluating groundedness and relevance"}, {"id": "output", "labelJa": "応答生成・出力", "labelEn": "Generate response", "detailJa": "検証に合格した結果をもとに、ユーザー向けの最終的な応答やアクション結果を生成して返す", "detailEn": "Once verification passes, the agent composes and returns the final response or action result to the user"}, {"id": "escalate", "labelJa": "人間へのエスカレーション", "labelEn": "Escalate to a human", "detailJa": "検証に失敗した、または自信度が低い場合は自動応答せず人間のオペレーターへ引き継ぐ", "detailEn": "If verification fails or confidence is low, the agent does not respond automatically and instead hands off to a human operator"}], "edges": [["input", "plan"], ["plan", "retrieve"], ["retrieve", "tool_exec"], ["tool_exec", "verify"], ["verify", "output"], ["verify", "escalate"]]}, {"titleJa": "マルチエージェント・オーケストレーション", "titleEn": "Multi-agent orchestration", "nodes": [{"id": "request", "labelJa": "リクエスト受信", "labelEn": "Receive request", "detailJa": "ユーザーまたは上流システムから複合的なタスクの依頼が届く", "detailEn": "A complex task request arrives from a user or an upstream system"}, {"id": "orchestrator", "labelJa": "オーケストレーターが意図分析", "labelEn": "Orchestrator analyzes intent", "detailJa": "オーケストレーターエージェントが要求内容を解釈し、どの専門エージェントに何を任せるかを決定する", "detailEn": "The orchestrator agent interprets the request and decides which specialist agents should handle which parts of it"}, {"id": "agent_research", "labelJa": "専門エージェントA(リサーチ)", "labelEn": "Specialist agent A (research)", "detailJa": "外部データや社内ナレッジを検索し、必要な情報を収集する専門エージェント", "detailEn": "A specialist agent that searches external data and internal knowledge to gather the needed information"}, {"id": "agent_analysis", "labelJa": "専門エージェントB(分析)", "labelEn": "Specialist agent B (analysis)", "detailJa": "収集されたデータを分析・要約し、判断材料となる洞察を生成する専門エージェント", "detailEn": "A specialist agent that analyzes and summarizes the gathered data to produce actionable insight"}, {"id": "agent_content", "labelJa": "専門エージェントC(生成)", "labelEn": "Specialist agent C (generation)", "detailJa": "分析結果をもとにドキュメントや回答文などの成果物を生成する専門エージェント", "detailEn": "A specialist agent that produces the deliverable—a document, a drafted answer—based on the analysis"}, {"id": "aggregate", "labelJa": "結果の集約・統合", "labelEn": "Aggregate results", "detailJa": "複数の専門エージェントの出力を1つの一貫した成果物にまとめる", "detailEn": "The outputs of the multiple specialist agents are combined into one coherent deliverable"}, {"id": "handoff", "labelJa": "ハンドオフ判定", "labelEn": "Handoff decision", "detailJa": "統合結果を自動で返してよいか、追加承認や人間への引き継ぎが必要かを判定する", "detailEn": "The system decides whether the aggregated result can be returned automatically or needs further approval or handoff to a human"}, {"id": "response", "labelJa": "最終応答", "labelEn": "Final response", "detailJa": "利用者または依頼元システムへ最終的な統合結果を返す", "detailEn": "The final combined result is delivered back to the user or the requesting system"}], "edges": [["request", "orchestrator"], ["orchestrator", "agent_research"], ["orchestrator", "agent_analysis"], ["orchestrator", "agent_content"], ["agent_research", "aggregate"], ["agent_analysis", "aggregate"], ["agent_content", "aggregate"], ["aggregate", "handoff"], ["handoff", "response"]]}, {"titleJa": "ガバナンス経路: リスク分類から監査まで", "titleEn": "Governance path: from risk classification to audit", "nodes": [{"id": "action_proposed", "labelJa": "アクションの提案", "labelEn": "Agent proposes an action", "detailJa": "エージェントが目標達成のために次に取ろうとする具体的なアクションを提案する", "detailEn": "The agent proposes a specific action it intends to take next in pursuit of its goal"}, {"id": "risk_classify", "labelJa": "リスク分類", "labelEn": "Classify risk", "detailJa": "提案されたアクションの影響範囲・可逆性・機密度を評価し、リスクレベルを分類する", "detailEn": "The proposed action's blast radius, reversibility, and sensitivity are assessed and assigned a risk level"}, {"id": "autonomy_assign", "labelJa": "自律レベルの割り当て", "labelEn": "Assign autonomy level", "detailJa": "リスク分類に基づき、そのアクションを自律実行してよいか承認を要するかの自律レベル(L1〜L4)を割り当てる", "detailEn": "Based on the risk classification, an autonomy level (L1-L4) is assigned to determine whether the action can run autonomously or needs approval"}, {"id": "low_risk_auto", "labelJa": "低リスク→監視付き自動実行", "labelEn": "Low risk -> automatic execution with monitoring", "detailJa": "低リスクと判定されたアクションは人間の承認を待たずに実行され、事後の監視対象となる", "detailEn": "Actions classified as low risk execute without waiting for human approval and are subject to after-the-fact monitoring"}, {"id": "high_risk_gate", "labelJa": "高リスク→HITL承認ゲート", "labelEn": "High risk -> human-in-the-loop approval gate", "detailJa": "高リスクと判定されたアクションは実行前に人間の承認ゲートで止められる", "detailEn": "Actions classified as high risk are held at a human approval gate before they can execute"}, {"id": "approve", "labelJa": "承認→実行", "labelEn": "Approved -> execute", "detailJa": "人間の承認者が内容を確認し許可した場合にのみアクションが実行される", "detailEn": "The action executes only after a human approver reviews and authorizes it"}, {"id": "block", "labelJa": "却下→ブロック", "labelEn": "Rejected -> blocked", "detailJa": "承認者がリスクを許容できないと判断した場合、アクションは実行されずブロックされる", "detailEn": "If the approver judges the risk unacceptable, the action is blocked and does not execute"}, {"id": "audit", "labelJa": "監査ログ記録", "labelEn": "Record audit log", "detailJa": "実行・承認・却下のいずれの経路でも、誰が何を判断しエージェントが何を行ったかを監査証跡として記録する", "detailEn": "Regardless of the path taken, who decided what and what the agent did is recorded as an audit trail"}], "edges": [["action_proposed", "risk_classify"], ["risk_classify", "autonomy_assign"], ["autonomy_assign", "low_risk_auto"], ["autonomy_assign", "high_risk_gate"], ["high_risk_gate", "approve"], ["high_risk_gate", "block"], ["low_risk_auto", "audit"], ["approve", "audit"], ["block", "audit"]]}, {"kind": "pyramid", "titleJa": "エージェント成熟度モデル", "titleEn": "Agent Maturity Model", "nodes": [{"id": "k1", "labelJa": "自律オーケストレーション", "labelEn": "Autonomous orchestration", "detailJa": "複数エージェントが協調し業務を自律遂行する。", "detailEn": "Multiple agents collaborate to run work autonomously."}, {"id": "k2", "labelJa": "ツール実行", "labelEn": "Tool use", "detailJa": "API やシステムを操作して行動する。", "detailEn": "Operate APIs and systems to take action."}, {"id": "k3", "labelJa": "検索連携 (RAG)", "labelEn": "Grounded RAG", "detailJa": "社内知識に基づき根拠ある回答をする。", "detailEn": "Answer grounded in enterprise knowledge."}, {"id": "k4", "labelJa": "単純応答", "labelEn": "Basic chat", "detailJa": "FAQ 的な会話。基盤となる一歩。", "detailEn": "FAQ-style chat — the foundational step."}], "edges": []}, {"kind": "matrix", "titleJa": "ユースケース優先度", "titleEn": "Use-case Prioritization", "axisXJa": ["実現性 低", "実現性 高"], "axisXEn": ["Low feasibility", "High feasibility"], "axisYJa": ["価値 低", "価値 高"], "axisYEn": ["Low value", "High value"], "nodes": [{"id": "l1", "labelJa": "戦略投資", "labelEn": "Strategic bet", "detailJa": "価値は高いが難所。PoC で検証する。", "detailEn": "High value but hard — validate with a PoC.", "q": 0}, {"id": "l2", "labelJa": "最優先 (Quick win)", "labelEn": "Quick win", "detailJa": "価値も実現性も高い本命。すぐ着手。", "detailEn": "High value and feasible — start now.", "q": 1}, {"id": "l3", "labelJa": "見送り", "labelEn": "Defer", "detailJa": "今は投資しない。", "detailEn": "Not worth investing in now.", "q": 2}, {"id": "l4", "labelJa": "省力自動化", "labelEn": "Easy automation", "detailJa": "低コストで小さく改善する。", "detailEn": "Small, cheap improvements.", "q": 3}], "edges": []}], "AB-410": [{"titleJa": "RAG(検索拡張生成)の知識ソース構成フロー", "titleEn": "RAG (Retrieval-Augmented Generation) Knowledge Source Pipeline", "nodes": [{"id": "select_src", "labelJa": "知識ソース選択", "labelEn": "Select Knowledge Source", "detailJa": "SharePoint/ファイル・Dataverseテーブル・公開Webサイト等、エージェントが参照する知識ソースの種類を選ぶ。", "detailEn": "Choose the type of knowledge source the agent will reference — SharePoint/files, a Dataverse table, or a public website."}, {"id": "ingest", "labelJa": "取り込み", "labelEn": "Ingest", "detailJa": "選択したソースからドキュメントやレコードをコネクタ経由で取得し、アクセス権情報とともに読み込む。", "detailEn": "Fetch documents or records from the chosen source via a connector, along with their access-permission metadata."}, {"id": "chunk", "labelJa": "分割(チャンク化)", "labelEn": "Chunking", "detailJa": "長い文書を検索・生成に適した小さな単位(チャンク)に分割する。", "detailEn": "Split long documents into smaller chunks sized for retrieval and generation."}, {"id": "embed", "labelJa": "埋め込み生成", "labelEn": "Generate Embeddings", "detailJa": "各チャンクを意味的な近さを表す数値ベクトル(埋め込み)に変換する。", "detailEn": "Convert each chunk into a numeric vector (embedding) representing its semantic meaning."}, {"id": "index", "labelJa": "ベクトルインデックス格納", "labelEn": "Store in Vector Index", "detailJa": "生成した埋め込みをベクトルインデックスに保存し、類似度検索に備える。", "detailEn": "Store the generated embeddings in a vector index, ready for similarity search."}, {"id": "vsearch", "labelJa": "ベクトル検索(意味検索)", "labelEn": "Vector Search", "detailJa": "ユーザーの質問も埋め込みに変換し、インデックス内で意味的に近いチャンクを検索する。", "detailEn": "Convert the user's question into an embedding too, then search the index for semantically similar chunks."}, {"id": "generate", "labelJa": "生成応答の作成", "labelEn": "Generate Answer", "detailJa": "検索で得たチャンクを根拠(グラウンディング)としてLLMが自然文の回答を動的に生成する。", "detailEn": "Using the retrieved chunks as grounding, the LLM dynamically composes a natural-language answer."}, {"id": "cite", "labelJa": "引用の提示", "labelEn": "Show Citations", "detailJa": "回答とともに参照元のドキュメントやリンクを引用として提示し、根拠を確認できるようにする。", "detailEn": "Present the source documents or links as citations alongside the answer so users can verify the grounding."}], "edges": [["select_src", "ingest"], ["ingest", "chunk"], ["chunk", "embed"], ["embed", "index"], ["index", "vsearch"], ["vsearch", "generate"], ["generate", "cite"]]}, {"titleJa": "Copilot Studio 生成オーケストレーションのフロー", "titleEn": "Copilot Studio Generative Orchestration Flow", "nodes": [{"id": "trigger", "labelJa": "トリガー(発話受信)", "labelEn": "Trigger (User Utterance)", "detailJa": "チャネル経由でユーザーの発話を受信し会話を開始する。", "detailEn": "The agent receives the user's utterance via a channel and starts the conversation."}, {"id": "orchestrate", "labelJa": "生成オーケストレーション判断", "labelEn": "Generative Orchestration Decision", "detailJa": "LLMが発話内容と会話履歴から、実行すべきトピック・知識ソース・アクションを動的に判断する。", "detailEn": "The LLM dynamically decides which topic, knowledge source, or action to invoke based on the utterance and conversation history."}, {"id": "topic", "labelJa": "トピック実行", "labelEn": "Run Topic", "detailJa": "該当するクラシックトピックがあれば、その会話フローに従って処理を進める。", "detailEn": "If a matching classic topic exists, the conversation follows its predefined flow."}, {"id": "knowledge", "labelJa": "知識ソース参照", "labelEn": "Reference Knowledge Source", "detailJa": "生成的回答が必要な場合、知識ソースを検索し関連情報を取得する。", "detailEn": "When a generative answer is needed, the agent searches the knowledge source for relevant information."}, {"id": "action", "labelJa": "アクション呼び出し", "labelEn": "Invoke Action", "detailJa": "コネクタやPower Automateフローを呼び出し、実際の処理(データ取得・更新等)を実行する。", "detailEn": "The agent calls a connector or Power Automate flow to perform an actual task, such as retrieving or updating data."}, {"id": "compose", "labelJa": "応答の統合生成", "labelEn": "Compose Response", "detailJa": "トピック・知識・アクションの結果を統合し、自然文の応答を作成する。", "detailEn": "The results from the topic, knowledge, and action steps are combined into a coherent natural-language response."}, {"id": "reply", "labelJa": "ユーザーへ応答", "labelEn": "Reply to User", "detailJa": "生成した応答をチャネルを通じてユーザーに返し、会話を継続または終了する。", "detailEn": "The generated response is sent back to the user through the channel, continuing or ending the conversation."}], "edges": [["trigger", "orchestrate"], ["orchestrate", "topic"], ["orchestrate", "knowledge"], ["orchestrate", "action"], ["topic", "compose"], ["knowledge", "compose"], ["action", "compose"], ["compose", "reply"]]}, {"titleJa": "開発から公開・監視までのライフサイクル(環境昇格・DLP・コンテンツ安全)", "titleEn": "Lifecycle from Development to Publish & Monitoring (Promotion, DLP, Content Safety)", "nodes": [{"id": "dev", "labelJa": "開発", "labelEn": "Develop", "detailJa": "開発環境でアプリ・フロー・エージェントを作成し、知識ソースやアクションを構成する。", "detailEn": "Build the app, flow, or agent in a development environment, configuring knowledge sources and actions."}, {"id": "testchat", "labelJa": "テストチャットで確認", "labelEn": "Verify in Test Chat", "detailJa": "テストチャットペインでエージェントの応答を試し、意図通りに動くか確認する。", "detailEn": "Try the agent's responses in the test chat pane to confirm it behaves as intended."}, {"id": "eval", "labelJa": "モデル評価", "labelEn": "Model Evaluation", "detailJa": "テストデータに対する応答の品質・精度・安全性を体系的に測定する。", "detailEn": "Systematically measure response quality, accuracy, and safety against test data."}, {"id": "dlp", "labelJa": "DLPポリシー確認", "labelEn": "Check DLP Policy", "detailJa": "使用しているコネクタの組み合わせがデータ損失防止ポリシーに違反していないか確認する。", "detailEn": "Confirm the connector combinations in use do not violate the data loss prevention policy."}, {"id": "safety", "labelJa": "コンテンツ安全性設定", "labelEn": "Configure Content Safety", "detailJa": "コンテンツモデレーションや禁止トピックを設定し、有害・不適切な内容を防ぐ。", "detailEn": "Configure content moderation and blocked topics to prevent harmful or inappropriate content."}, {"id": "promote", "labelJa": "環境昇格(パイプライン展開)", "labelEn": "Environment Promotion (Pipeline Deploy)", "detailJa": "パイプラインを使いソリューションを検証環境・本番環境へ段階的に展開する。", "detailEn": "Use a pipeline to progressively deploy the solution to test and production environments."}, {"id": "publish", "labelJa": "発行", "labelEn": "Publish", "detailJa": "エージェントやアプリをチャネルに発行し、エンドユーザーが利用できる状態にする。", "detailEn": "Publish the agent or app to its channels so end users can access it."}, {"id": "monitor", "labelJa": "監視(分析)", "labelEn": "Monitor (Analytics)", "detailJa": "Copilot Studio分析やApplication Insightsでセッション数・成功率・エラーを継続的に監視する。", "detailEn": "Continuously monitor session counts, success rate, and errors using Copilot Studio analytics or Application Insights."}], "edges": [["dev", "testchat"], ["testchat", "eval"], ["eval", "dlp"], ["dlp", "safety"], ["safety", "promote"], ["promote", "publish"], ["publish", "monitor"]]}, {"kind": "layers", "titleJa": "インテリジェントアプリの層", "titleEn": "Intelligent App Layers", "nodes": [{"id": "m1", "labelJa": "アプリ / 体験層", "labelEn": "Experience", "detailJa": "UI・チャネルで利用者に届ける。", "detailEn": "Deliver via UI and channels to users."}, {"id": "m2", "labelJa": "オーケストレーション層", "labelEn": "Orchestration", "detailJa": "エージェント・ツール・フローを制御する。", "detailEn": "Control agents, tools and flows."}, {"id": "m3", "labelJa": "モデル / 推論層", "labelEn": "Model", "detailJa": "基盤モデルとファインチューニングを担う。", "detailEn": "Foundation models and fine-tuning."}, {"id": "m4", "labelJa": "データ / 知識層", "labelEn": "Data & knowledge", "detailJa": "ベクトルDB・業務データを供給する。", "detailEn": "Supply vector DB and business data."}], "edges": []}, {"kind": "cycle", "titleJa": "インテリジェントアプリ構築ループ", "titleEn": "Intelligent App Build Loop", "centerJa": "反復", "centerEn": "Iterate", "nodes": [{"id": "n1", "labelJa": "要件", "labelEn": "Requirements", "detailJa": "課題・データ・成功指標を定義する。", "detailEn": "Define the problem, data and success metrics."}, {"id": "n2", "labelJa": "設計", "labelEn": "Design", "detailJa": "モデル・RAG・ツール構成を設計する。", "detailEn": "Design the model, RAG and tool composition."}, {"id": "n3", "labelJa": "実装", "labelEn": "Build", "detailJa": "オーケストレーションと統合を実装する。", "detailEn": "Implement orchestration and integrations."}, {"id": "n4", "labelJa": "評価", "labelEn": "Evaluate", "detailJa": "精度・安全性・コストを評価する。", "detailEn": "Evaluate accuracy, safety and cost."}, {"id": "n5", "labelJa": "展開", "labelEn": "Deploy", "detailJa": "監視とガードレール付きで公開する。", "detailEn": "Ship with monitoring and guardrails."}, {"id": "n6", "labelJa": "改善", "labelEn": "Improve", "detailJa": "フィードバックで次サイクルへ。", "detailEn": "Loop with feedback into the next cycle."}], "edges": []}], "AI-300": [{"titleJa": "MLOpsパイプライン（CI/CD/CTを含む一連の流れ）", "titleEn": "MLOps pipeline (the full CI/CD/CT cycle)", "nodes": [{"id": "data", "labelJa": "データ準備", "labelEn": "Data prep", "detailJa": "データストアからデータを取得し、データアセットとしてバージョン管理する", "detailEn": "Pull data from the datastore and version it as a data asset"}, {"id": "train", "labelJa": "学習（CI検証込み）", "labelEn": "Training (with CI checks)", "detailJa": "コンピューティングクラスターでトレーニングパイプラインを実行。CIがコードとパイプライン定義を事前にテストする", "detailEn": "Run the training pipeline on a compute cluster; CI tests the code and pipeline definitions beforehand"}, {"id": "evaluate", "labelJa": "モデル評価", "labelEn": "Model evaluation", "detailJa": "テストデータセットで精度を検証し、しきい値を満たさなければ後続に進めない", "detailEn": "Validate accuracy on the test dataset; block progression if it fails the threshold"}, {"id": "register", "labelJa": "モデル登録", "labelEn": "Model registration", "detailJa": "合格したモデルをMLflow経由でモデルレジストリにバージョン登録する", "detailEn": "Register the passing model version to the model registry via MLflow"}, {"id": "deploy", "labelJa": "デプロイ（CD）", "labelEn": "Deployment (CD)", "detailJa": "CDパイプラインがオンラインエンドポイントへ自動デプロイする", "detailEn": "The CD pipeline automatically deploys the model to an online endpoint"}, {"id": "monitor", "labelJa": "本番監視", "labelEn": "Production monitoring", "detailJa": "データドリフトとモデル性能を継続的に監視する", "detailEn": "Continuously monitor data drift and model performance"}, {"id": "drift", "labelJa": "ドリフト検知", "labelEn": "Drift detected", "detailJa": "しきい値を超えるドリフトや性能劣化をアラートで検知する", "detailEn": "Alert when drift or performance degradation exceeds the threshold"}, {"id": "ct", "labelJa": "CT起動→次サイクルへ", "labelEn": "CT trigger → next cycle", "detailJa": "継続的トレーニング（CT）が自動起動し、新しいデータで再学習サイクルを開始する", "detailEn": "Continuous Training (CT) automatically kicks off, starting a new retraining cycle with fresh data"}], "edges": [["data", "train"], ["train", "evaluate"], ["evaluate", "register"], ["register", "deploy"], ["deploy", "monitor"], ["monitor", "drift"], ["drift", "ct"]]}, {"titleJa": "デプロイ戦略（安全な段階的ロールアウト）", "titleEn": "Deployment strategy (safe staged rollout)", "nodes": [{"id": "candidate", "labelJa": "候補モデル", "labelEn": "Candidate model", "detailJa": "新しく登録されたモデルバージョンをデプロイ候補として用意する", "detailEn": "Prepare a newly registered model version as the deployment candidate"}, {"id": "shadow", "labelJa": "シャドーデプロイ", "labelEn": "Shadow deployment", "detailJa": "本番トラフィックをミラーリングして候補モデルに複製し、ユーザー応答には影響を与えず結果だけ収集する", "detailEn": "Mirror live production traffic to the candidate model without affecting user responses, collecting results only"}, {"id": "shadow_eval", "labelJa": "シャドー結果評価", "labelEn": "Shadow result review", "detailJa": "ミラーリングされた推論結果を既存モデルと比較し、品質とエラー率を確認する", "detailEn": "Compare mirrored inference results against the current model to check quality and error rate"}, {"id": "canary", "labelJa": "カナリアデプロイ", "labelEn": "Canary deployment", "detailJa": "実トラフィックの一部（例: 5%）を候補モデルへ振り分け、実利用での挙動を検証する", "detailEn": "Route a small slice (e.g. 5%) of real traffic to the candidate model to validate real-world behavior"}, {"id": "gate", "labelJa": "承認ゲート", "labelEn": "Approval gate", "detailJa": "エラー率・レイテンシ・品質指標が基準を満たすことを人手またはルールで承認する", "detailEn": "A human or rule-based check confirms error rate, latency, and quality metrics meet the bar"}, {"id": "staged", "labelJa": "段階的トラフィック昇格", "labelEn": "Staged traffic ramp-up", "detailJa": "トラフィック配分を25%→50%→75%と段階的に引き上げながら監視を継続する", "detailEn": "Gradually raise traffic share from 25% to 50% to 75% while monitoring continues"}, {"id": "production", "labelJa": "100%本番昇格", "labelEn": "Full production promotion", "detailJa": "全トラフィックを新モデルに切り替え、旧バージョンは切り戻し用に一定期間保持する", "detailEn": "Switch 100% of traffic to the new model, keeping the old version available for rollback for a period"}], "edges": [["candidate", "shadow"], ["shadow", "shadow_eval"], ["shadow_eval", "canary"], ["canary", "gate"], ["gate", "staged"], ["staged", "production"]]}, {"titleJa": "GenAIOps評価・ガードレールの流れ", "titleEn": "GenAIOps evaluation & guardrail flow", "nodes": [{"id": "input_filter", "labelJa": "入力フィルター", "labelEn": "Input filter", "detailJa": "Prompt Shieldsでジェイルブレイクやプロンプトインジェクションを検知しブロックする", "detailEn": "Prompt Shields detects and blocks jailbreak attempts and prompt injection"}, {"id": "retrieval", "labelJa": "グラウンディングデータ取得", "labelEn": "Grounding data retrieval", "detailJa": "ベクトルインデックスとセマンティックランカーで根拠となるドキュメントチャンクを検索する", "detailEn": "Retrieve grounding document chunks using the vector index and semantic ranker"}, {"id": "generate", "labelJa": "応答生成", "labelEn": "Response generation", "detailJa": "取得したコンテキストを添えてLLMに推論させ、回答を生成する", "detailEn": "Prompt the LLM with the retrieved context to generate a response"}, {"id": "groundedness", "labelJa": "根拠性チェック", "labelEn": "Groundedness check", "detailJa": "生成された回答が根拠データに忠実かをGroundedness Detectionで検証し、幻覚を検知する", "detailEn": "Verify the response is faithful to the grounding data via Groundedness Detection, catching hallucinations"}, {"id": "output_filter", "labelJa": "出力フィルター", "labelEn": "Output content filter", "detailJa": "有害コンテンツや保護対象素材を出力前にコンテンツセーフティでフィルタリングする", "detailEn": "Filter harmful content and protected material from the output via Content Safety before it's returned"}, {"id": "trace_eval", "labelJa": "トレース記録・評価", "labelEn": "Trace logging & evaluation", "detailJa": "OpenTelemetryでトレースを記録し、評価ハーネスで根拠性・関連性などを継続的にスコアリングする", "detailEn": "Log traces with OpenTelemetry and continuously score groundedness, relevance, and more via the evaluation harness"}], "edges": [["input_filter", "retrieval"], ["retrieval", "generate"], ["generate", "groundedness"], ["groundedness", "output_filter"], ["output_filter", "trace_eval"]]}, {"kind": "timeline", "titleJa": "AIソリューション導入フェーズ", "titleEn": "AI Solution Adoption Phases", "nodes": [{"id": "t1", "labelJa": "評価 Assess", "labelEn": "Assess", "detailJa": "ユースケース選定と実現性・データ準備を評価する。", "detailEn": "Select use cases; assess feasibility and data readiness."}, {"id": "t2", "labelJa": "PoC", "labelEn": "PoC", "detailJa": "小規模で価値と精度・コストを検証する。", "detailEn": "Validate value, accuracy and cost at small scale."}, {"id": "t3", "labelJa": "パイロット Pilot", "labelEn": "Pilot", "detailJa": "限定ユーザーで運用性とガバナンスを確認する。", "detailEn": "Confirm operability and governance with limited users."}, {"id": "t4", "labelJa": "本番 Production", "labelEn": "Production", "detailJa": "SLA・監視・責任あるAIを備えて展開する。", "detailEn": "Deploy with SLA, monitoring and Responsible AI."}, {"id": "t5", "labelJa": "スケール Scale", "labelEn": "Scale", "detailJa": "多部門へ拡大し MLOps で継続的に改善する。", "detailEn": "Expand across teams and improve continuously with MLOps."}], "edges": []}]};
// DAGを層状に自動レイアウトする（ノードにレイヤ番号→縦方向に配置、辺は矢印）。
function flowLayout(nodes, edges) {
  const id2node = {}; nodes.forEach((n) => { id2node[n.id] = n; });
  const adj = {}, indeg = {}; nodes.forEach((n) => { adj[n.id] = []; indeg[n.id] = 0; });
  const E = (edges || []).map((e) => (Array.isArray(e) ? { from: e[0], to: e[1] } : e)).filter((e) => id2node[e.from] && id2node[e.to]);
  E.forEach((e) => { adj[e.from].push(e.to); indeg[e.to] = (indeg[e.to] || 0) + 1; });
  const layer = {}; nodes.forEach((n) => { layer[n.id] = 0; });
  // longest-path layering via relaxation（サイクルがあっても pass 数で上限が付き無限ループしない）
  for (let pass = 0; pass < nodes.length + 1; pass++) {
    let changed = false;
    E.forEach((e) => { if (layer[e.to] < layer[e.from] + 1) { layer[e.to] = layer[e.from] + 1; changed = true; } });
    if (!changed) break;
  }
  const byLayer = {}; nodes.forEach((n) => { (byLayer[layer[n.id]] = byLayer[layer[n.id]] || []).push(n.id); });
  const layers = Object.keys(byLayer).map(Number).sort((a, b) => a - b);
  return { layer, byLayer, layers, E, id2node };
}
// ノードのラベルからステージ種別を推定してアイコン＋凡例ラベルを返す
const FLOW_ICONS = [
  [["データ", "data", "取込", "ingest", "収集", "抽出", "extract"], "🗄", "データ", "Data"],
  [["学習", "train", "訓練", "fine-tun", "ファインチュ"], "🧠", "学習", "Train"],
  [["評価", "eval", "検証", "verify", "テスト", "test", "品質"], "✅", "評価", "Eval"],
  [["デプロイ", "deploy", "公開", "release", "rollout", "カナリア", "canary", "昇格", "promote", "シャドー", "shadow"], "🚀", "デプロイ", "Deploy"],
  [["監視", "monitor", "observ", "ドリフト", "drift", "alert", "アラート", "トレース", "trace"], "📈", "監視", "Monitor"],
  [["設計", "design", "計画", "plan", "要件", "requirement", "トリアージ", "triage"], "📐", "設計/計画", "Plan"],
  [["認証", "authenticat", "サインイン", "sign-in", "signin", "認可", "authoriz", "条件付きアクセス", "conditional"], "🔑", "認証/認可", "Auth"],
  [["セキュ", "security", "防御", "protect", "暗号", "encrypt", "dlp", "ガードレール", "guardrail", "分類", "classif", "ラベル", "label", "封じ込め", "contain"], "🛡", "セキュリティ", "Security"],
  [["入力", "input", "要求", "request", "トリガ", "trigger", "プロンプト", "prompt"], "📥", "入力", "Input"],
  [["出力", "output", "応答", "response", "結果", "result", "レポート", "report", "引用", "citation"], "📤", "出力", "Output"],
  [["ツール", "tool", "実行", "execut", "アクション", "action", "コネクタ", "connector"], "🛠", "ツール実行", "Tools"],
  [["検索", "search", "retriev", "rag", "埋込", "embed", "ベクトル", "vector", "チャンク", "chunk", "分割", "split"], "🔍", "検索/RAG", "Retrieve"],
  [["承認", "approv", "hitl", "人間", "human", "監査", "audit", "ガバナンス", "govern", "統制", "リスク", "risk", "ポリシー", "policy"], "⚖", "統制/承認", "Govern"],
  [["再学習", "retrain", "次サイクル", "next cycle", "cycle", "ループ", "loop", "反復"], "🔁", "反復", "Loop"],
  [["保存", "store", "登録", "register", "registry", "index", "インデックス", "カタログ", "catalog", "保管"], "💾", "保存/登録", "Store"],
];
function flowIcon(s) {
  const t = (s || "").toLowerCase();
  for (const e of FLOW_ICONS) { if (e[0].some((k) => t.includes(k))) return e[1]; }
  return "▸";
}
function flowIconLabel(ic, en) {
  for (const e of FLOW_ICONS) { if (e[1] === ic) return en ? e[3] : e[2]; }
  return en ? "Step" : "手順";
}
// 2点の矩形間をベジェで結ぶ（横=左→右 / 縦=上→下）
function fdEdgePath(a, b, vert) {
  if (vert) { const sx = a.x + a.w / 2, sy = a.y + a.h, tx = b.x + b.w / 2, ty = b.y, my = (sy + ty) / 2; return `M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`; }
  const sx = a.x + a.w, sy = a.y + a.h / 2, tx = b.x, ty = b.y + b.h / 2, mx = (sx + tx) / 2; return `M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`;
}
const FD_KIND_LABEL = { flow: ["フロー", "Flow"], cycle: ["サイクル", "Cycle"], layers: ["レイヤー", "Layers"], pyramid: ["ピラミッド", "Pyramid"], matrix: ["マトリクス", "Matrix"], timeline: ["タイムライン", "Timeline"] };
const FD_KIND_ICON = { flow: "🔀", cycle: "🔁", layers: "▤", pyramid: "🔺", matrix: "▦", timeline: "📅" };
// 図の練習フレーム — どのSVG図解にもかぶせられる操作枠。
// 図そのものには手を入れず、描画後の <text> を拾って操作を付けるので、既存の図解すべてで同じように使える。
//   ・拡大／縮小（狭い画面で文字が潰れる問題への対処。枠が横スクロールする）
//   ・ラベルを隠す＝暗記モード（思い出してからクリックで1つずつ開く）
//   ・語をクリックして強調し、自分の言葉で説明を書き残す（端末に保存）
// 出題分野バーの下に置く「その分野だけで解く」ドリル。
// 各ステーションが持つ分野別の問題セット（DOMAIN_SETS）をそのまま使うので、図を見て終わりにせず
// 「比率の大きい分野が弱い」と分かったその場で解きにいける。配色はハブごとに違うため色指定はしない。
function DomainDrillPanel({ sets, domains, lang, size }) {
  const [dom, setDom] = useState(null);
  const [qs, setQs] = useState(null);
  const [pos, setPos] = useState(0);
  const [pick, setPick] = useState(null);
  const [hit, setHit] = useState(0);
  const en = String(lang || "").startsWith("en");
  const N = size || 10;
  if (!sets || !domains || !domains.length) return null;
  const label = (d) => (en ? (d.nameEn || d.en || d.name || d.ja || d.id) : (d.name || d.ja || d.nameEn || d.id));
  const pool = (id) => (sets[id] || []).filter((q) => q && q.q && Array.isArray(q.o) && typeof q.a === "number");
  const tx = (q, k) => (en ? (q[k + "En"] || q[k]) : q[k]);
  const opts = (q) => (en && Array.isArray(q.oEn) ? q.oEn : q.o);

  const begin = (id) => {
    const p = pool(id);
    if (!p.length) return;
    const shuffled = p.map((q) => q).sort(() => Math.random() - 0.5).slice(0, Math.min(N, p.length));
    setDom(id); setQs(shuffled); setPos(0); setPick(null); setHit(0);
  };
  const stop = () => { setQs(null); setDom(null); setPick(null); setPos(0); setHit(0); };
  const btn = (on) => ({
    fontSize: 11.5, padding: "5px 11px", borderRadius: 16, cursor: "pointer", marginRight: 6, marginBottom: 6,
    border: `1.5px solid ${on ? "#0e7490" : "rgba(128,128,128,.45)"}`, background: "transparent",
    color: "inherit", fontWeight: on ? 800 : 600,
  });

  if (!qs) {
    return (
      <div style={{ marginTop: 10, borderTop: "1px dashed rgba(128,128,128,.4)", paddingTop: 10 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 6 }}>
          {en ? "Drill just this domain" : "この分野だけを解く"}
          <span style={{ fontWeight: 400, opacity: .7, marginLeft: 6 }}>{en ? `(${N} questions)` : `（${N}問）`}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {domains.map((d) => {
            const n = pool(d.id).length;
            return (
              <button key={d.id} onClick={() => begin(d.id)} disabled={!n} style={{ ...btn(false), opacity: n ? 1 : .35 }}>
                {d.id} {label(d)}<span style={{ opacity: .8, marginLeft: 5 }}>{n}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const q = qs[pos];
  const o = opts(q);
  const done = pos >= qs.length;
  if (done || !q) {
    return (
      <div style={{ marginTop: 10, borderTop: "1px dashed rgba(128,128,128,.4)", paddingTop: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>
          {en ? `Score ${hit}/${qs.length}` : `${qs.length}問中 ${hit}問 正解`}
        </div>
        <button onClick={() => begin(dom)} style={btn(true)}>{en ? "Another set" : "もう一度この分野"}</button>
        <button onClick={stop} style={btn(false)}>{en ? "Pick another domain" : "分野を選び直す"}</button>
      </div>
    );
  }
  return (
    <div style={{ marginTop: 10, borderTop: "1px dashed rgba(128,128,128,.4)", paddingTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, opacity: .75, marginBottom: 6 }}>
        <span>{dom}　{pos + 1} / {qs.length}</span>
        <button onClick={stop} style={{ ...btn(false), marginRight: 0, marginBottom: 0 }}>{en ? "Stop" : "やめる"}</button>
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.75, marginBottom: 8 }}>{tx(q, "q")}</div>
      <div style={{ display: "grid", gap: 6 }}>
        {o.map((op, i) => {
          const chosen = pick !== null;
          const right = i === q.a;
          const mark = chosen && (right ? "#16A34A" : (i === pick ? "#DC2626" : "rgba(128,128,128,.45)"));
          return (
            <button key={i} onClick={() => { if (pick === null) { setPick(i); if (right) setHit(hit + 1); } }}
                    style={{ textAlign: "left", fontSize: 12, lineHeight: 1.6, padding: "8px 10px", borderRadius: 8, cursor: chosen ? "default" : "pointer",
                             border: `1.5px solid ${chosen ? mark : "rgba(128,128,128,.45)"}`, background: "transparent", color: "inherit" }}>
              {chosen && right ? "◎ " : (chosen && i === pick ? "× " : "")}{op}
            </button>
          );
        })}
      </div>
      {pick !== null && (
        <div style={{ marginTop: 8 }}>
          {tx(q, "e") ? <div style={{ fontSize: 11.5, lineHeight: 1.75, opacity: .9, marginBottom: 6 }}>{tx(q, "e")}</div> : null}
          <button onClick={() => { setPick(null); setPos(pos + 1); }} style={btn(true)}>
            {pos + 1 >= qs.length ? (en ? "See score" : "結果を見る") : (en ? "Next" : "次の問題")}
          </button>
        </div>
      )}
    </div>
  );
}

// 用語集はハブごとに形が違う。オブジェクト（{t,e,dj,de}）と配列（[分野, 和, 英, 説明和, 説明英]）の
// どちらで渡されても同じように引けるよう、ここで一度そろえてから使う。
const glossNorm = (x) => String(x || "").replace(/[\s()（）・:：,、。]/g, "").toLowerCase();
const glossParts = (x) => String(x || "").split(/[・／/、,]/).map(glossNorm).filter(Boolean);
const glossEntry = (g) => {
  // 配列型 [分野, 和, 英, 説明和, 説明英]。英語欄が "-" のバンクがあるので空扱いにする。
  if (Array.isArray(g)) return { t: g[1], e: g[2] && g[2] !== "-" ? g[2] : "", dj: g[3], de: g[4] || "" };
  if (!g || typeof g !== "object") return null;
  // オブジェクト型は {t,e,dj,de} と {term,termEn,def,defEn} の2種類がある。
  return { t: g.t || g.term, e: g.e || g.termEn || "", dj: g.dj || g.def, de: g.de || g.defEn || "" };
};
const glossList = (terms) => (Array.isArray(terms)
  ? terms.map(glossEntry).filter((g) => g && (g.t || g.e))
  : null);
// 「空・雨・傘」のような連結語は図の中では「空」「雨」「傘」と別々に置かれている。
// 区切り文字で割った断片でも引けるようにしないと、そういう図では1件も当たらない。
const glossFind = (list, term) => {
  if (!list || !term) return [];
  const k = glossNorm(term);
  if (!k) return [];
  const exact = list.filter((g) => glossNorm(g.t) === k || glossNorm(g.e) === k
    || glossParts(g.t).includes(k) || (k.length >= 3 && glossParts(g.e).includes(k)));
  if (exact.length) return exact.slice(0, 2);
  if (k.length < 2) return [];
  return list.filter((g) => {
    const a = glossNorm(g.t), b = glossNorm(g.e);
    return (a.length >= 2 && (k.includes(a) || a.includes(k))) || (b.length >= 3 && (k.includes(b) || b.includes(k)));
  }).slice(0, 2);
};
// 本文に出てくる用語を拾う（図でも説明文でも同じ判定で使う）
const glossScan = (text, list, max) => {
  if (!list) return [];
  const body = glossNorm(text);
  const out = [];
  for (const g of list) {
    const a = glossNorm(g.t);
    if (a.length >= 2 && body.includes(a) && !out.some((x) => x.t === g.t)) out.push({ t: g.t, e: g.e });
    if (out.length >= (max || 16)) break;
  }
  return out;
};

// 用語集の項目そのものの表示（図の枠でもカードの帯でも同じ形で出す）
function GlossLine({ g, sel, en }) {
  const main = en ? (g.e || g.t) : g.t;
  const alt = en ? g.t : g.e;
  const same = glossNorm(main) === glossNorm(sel);
  return (
    <div style={{ fontSize: 11.5, lineHeight: 1.7, marginBottom: 6, paddingLeft: 8, borderLeft: "2px solid rgba(128,128,128,.4)" }}>
      {same ? null : <span style={{ fontWeight: 700 }}>{main}</span>}
      {alt && alt !== main ? <span style={{ opacity: .6, marginLeft: same ? 0 : 6 }}>{alt}</span> : null}
      <div style={{ opacity: .85 }}>{en ? (g.de || g.dj) : g.dj}</div>
    </div>
  );
}

// カード型の解説（図ではなく文章）に付ける用語の帯。
// 本文をなぞって用語集に載っている語を並べ、押すと意味を出す。図のように DOM は触らない。
function TermStrip({ text, terms, lang }) {
  const [sel, setSel] = useState(null);
  const en = String(lang || "").startsWith("en");
  const list = glossList(terms);
  const found = glossScan(text, list, 12);
  if (!found.length) return null;
  const hits = sel ? glossFind(list, sel) : [];
  return (
    <div style={{ marginTop: 10, borderTop: "1px dashed rgba(128,128,128,.35)", paddingTop: 8 }}>
      <div style={{ fontSize: 10.5, opacity: .7, marginBottom: 4 }}>
        {en ? `Terms in this card (${found.length}) — tap for the definition` : `この解説に出てくる用語（${found.length}）　押すと意味が出ます`}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {found.map((g) => (
          <button key={g.t} onClick={() => setSel(sel === g.t ? null : g.t)} aria-pressed={sel === g.t}
                  style={{ fontSize: 11, padding: "3px 9px", borderRadius: 13, cursor: "pointer", background: "transparent",
                           border: `1px solid ${sel === g.t ? "#D8A94E" : "rgba(128,128,128,.4)"}`,
                           color: sel === g.t ? "#D8A94E" : "inherit", fontWeight: sel === g.t ? 700 : 500 }}>
            {en ? (g.e || g.t) : g.t}
          </button>
        ))}
      </div>
      {sel && hits.length ? (
        <div style={{ marginTop: 8, border: "1px solid rgba(128,128,128,.35)", borderLeft: "3px solid #D8A94E", borderRadius: 8, padding: "8px 11px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, marginBottom: 6 }}>{sel}</div>
          {hits.map((g, i) => <GlossLine key={i} g={g} sel={sel} en={en} />)}
        </div>
      ) : null}
    </div>
  );
}

function FigFrame({ children, id, lang, hint, terms, topic }) {
  const box = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [mask, setMask] = useState(false);
  const [shown, setShown] = useState(() => new Set());
  const [sel, setSel] = useState(null);
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const [labels, setLabels] = useState(0);
  const [hasSvg, setHasSvg] = useState(false); // 拡大ボタンは SVG の図にだけ効く（HTML の図は幅が広がるだけなので出さない）
  const [figTerms, setFigTerms] = useState([]);
  const sigRef = useRef("");
  // 狭い画面で SVG の図が縮みすぎて文字が読めないとき（9px 未満）は、最初から読める大きさまで拡大して横スクロールにする
  const [autoZoom, setAutoZoom] = useState(false);
  React.useLayoutEffect(() => {
    const root = box.current; if (!root) return;
    let minPx = Infinity;
    root.querySelectorAll("svg").forEach((svg) => {
      if (svg.parentElement && svg.parentElement.closest("svg")) return;
      const vb = svg.viewBox && svg.viewBox.baseVal; if (!vb || !vb.width) return;
      const w = svg.getBoundingClientRect().width; if (!w) return;
      const k = w / vb.width;
      svg.querySelectorAll("text").forEach((t) => { const fs = parseFloat(getComputedStyle(t).fontSize) || 0; if (fs && (t.textContent || "").trim()) minPx = Math.min(minPx, fs * k); });
    });
    if (minPx < 9) { setZoom(Math.min(3, Math.ceil((10 / minPx) * 4) / 4)); setAutoZoom(true); }
  }, []);
  const en = String(lang || "").startsWith("en");
  const KEY = "fig_notes_v1";

  useEffect(() => {
    try { setNotes(JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { /* 保存できない環境では無効 */ }
  }, []);
  const mine = notes[id] || {};
  const putNote = (term, text) => {
    const nx = { ...notes, [id]: { ...mine } };
    if (text && text.trim()) nx[id][term] = text.trim(); else delete nx[id][term];
    if (!Object.keys(nx[id]).length) delete nx[id];
    setNotes(nx);
    try { localStorage.setItem(KEY, JSON.stringify(nx)); } catch (e) { /* 同上 */ }
  };

  // 描画のたびに図の中のテキストへ操作を付け直す（図が差し替わっても追従する）
  useEffect(() => {
    const root = box.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll("svg text"));
    if (els.length !== labels) setLabels(els.length);
    const sv = Array.from(root.querySelectorAll("svg")).some((g) => !g.closest("[data-fd]") && g.getBoundingClientRect().width > 60);
    if (sv !== hasSvg) setHasSvg(sv);
    const bound = [];
    els.forEach((el, i) => {
      const term = (el.textContent || "").trim() || "#" + i;
      const hidden = mask && !shown.has(term);
      el.style.cursor = "pointer";
      el.style.opacity = hidden ? "0.06" : (sel && sel !== term ? "0.4" : "1");
      el.style.fontWeight = sel === term ? "800" : "";
      const pick = (e) => {
        e.stopPropagation();
        if (mask && !shown.has(term)) setShown(new Set([...shown, term]));
        setSel(term);
        setDraft((notes[id] || {})[term] || "");
      };
      el.addEventListener("click", pick);
      bound.push([el, pick]);
    });
    return () => bound.forEach(([el, h]) => el.removeEventListener("click", h));
  });

  // 図の中の語を用語集と突き合わせる（判定は共通のヘルパに寄せてある）
  const norm = glossNorm;
  const glossary = glossList(terms);
  const lookup = (term) => glossFind(glossary, term);
  // 資格ハブの図はSVGではなくHTMLで組まれているものが多く、文字をクリックする仕掛けが効かない。
  // どちらの図でも使えるよう、図の本文に出てくる用語を用語集と突き合わせて下に並べる。
  useEffect(() => {
    const root = box.current;
    if (!root) return;
    if (!glossary) { if (figTerms.length) { sigRef.current = ""; setFigTerms([]); } return; }
    const raw = root.textContent || "";
    const sig = id + "|" + raw.length + "|" + raw.slice(0, 60);
    if (sig === sigRef.current) return;
    sigRef.current = sig;
    setFigTerms(glossScan(raw, glossary, 16));
  });

  const hit = sel ? lookup(sel) : [];
  // 押した語に用語集の項目がないときは、その図そのものの項目を出す（空振りで終わらせない）
  const fallback = sel && !hit.length ? lookup(topic).slice(0, 1) : [];
  const found = hit.length ? hit : fallback;

  const btn = (on) => ({
    fontSize: 11.5, padding: "4px 10px", borderRadius: 7, cursor: "pointer",
    border: `1px solid ${on ? "#D8A94E" : "rgba(128,128,128,.4)"}`,
    background: "transparent", color: on ? "#D8A94E" : "inherit", fontWeight: on ? 700 : 500,
  });
  const noteCount = Object.keys(mine).length;

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
        {labels > 0 && (
          <button onClick={() => { setMask(!mask); setShown(new Set()); setSel(null); }} aria-pressed={mask} style={btn(mask)}>
            {mask ? (en ? "Show all labels" : "ラベルを全部出す") : (en ? "Hide labels (recall)" : "ラベルを隠して思い出す")}
          </button>
        )}
        {mask && <span style={{ fontSize: 10.5, opacity: .7 }}>{en ? `${shown.size}/${labels} revealed` : `${labels}個中 ${shown.size}個を開いた`}</span>}
        <span style={{ flex: 1 }} />
        {hasSvg ? (<>
        <button onClick={() => setZoom(Math.max(1, Math.round((zoom - 0.25) * 100) / 100))} disabled={zoom <= 1}
                title={en ? "Zoom out" : "縮小"} style={{ ...btn(false), opacity: zoom <= 1 ? .6 : 1 }}>−</button>
        <span style={{ fontSize: 10.5, opacity: .7, minWidth: 34, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(Math.min(3, Math.round((zoom + 0.25) * 100) / 100))} disabled={zoom >= 3}
                title={en ? "Zoom in" : "拡大"} style={{ ...btn(false), opacity: zoom >= 3 ? .6 : 1 }}>＋</button>
        </>) : null}
        {noteCount > 0 && (
          <button onClick={() => setShowNotes(!showNotes)} aria-pressed={showNotes} style={btn(showNotes)}>
            {en ? `My notes (${noteCount})` : `自分のメモ（${noteCount}）`}
          </button>
        )}
      </div>

      {autoZoom && zoom > 1 ? (
        <div style={{ fontSize: 10.5, opacity: .75, margin: "-2px 0 6px" }}>
          {en ? "Enlarged so the labels are readable — scroll sideways (− to shrink)." : "文字が読める大きさに拡大しています。横にスクロールできます（−で縮小）。"}
        </div>
      ) : null}
      <div style={{ overflowX: zoom > 1 ? "auto" : "visible", WebkitOverflowScrolling: "touch" }}>
        <div ref={box} style={{ width: `${zoom * 100}%` }}>{children}</div>
      </div>

      {figTerms.length > 0 && (
        <div style={{ marginTop: 9 }}>
          <div style={{ fontSize: 10.5, opacity: .7, marginBottom: 4 }}>
            {en ? `Terms in this figure (${figTerms.length}) — tap for the definition`
                : `この図に出てくる用語（${figTerms.length}）　押すと意味が出ます`}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {figTerms.map((g) => (
              <button key={g.t} onClick={() => { setSel(g.t); setDraft((notes[id] || {})[g.t] || ""); }}
                      aria-pressed={sel === g.t}
                      style={{ fontSize: 11, padding: "3px 9px", borderRadius: 13, cursor: "pointer", background: "transparent",
                               border: `1px solid ${sel === g.t ? "#D8A94E" : "rgba(128,128,128,.4)"}`,
                               color: sel === g.t ? "#D8A94E" : "inherit", fontWeight: sel === g.t ? 700 : 500 }}>
                {en ? (g.e || g.t) : g.t}
              </button>
            ))}
          </div>
        </div>
      )}

      {sel ? (
        <div style={{ marginTop: 10, border: "1px solid rgba(128,128,128,.35)", borderLeft: "3px solid #D8A94E", borderRadius: 8, padding: "9px 11px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, marginBottom: 6 }}>{sel}</div>
          {!hit.length && fallback.length ? (
            <div style={{ fontSize: 10.5, opacity: .7, marginBottom: 4 }}>
              {en ? "No glossary entry for this label — showing the figure's own term."
                  : "この語そのものの項目はありません。図の用語を出します。"}
            </div>
          ) : null}
          {found.map((g, i) => <GlossLine key={i} g={g} sel={sel} en={en} />)}
          <div style={{ fontSize: 11, opacity: .75, marginBottom: 6 }}>
            {en ? "Write what you would say about this element in your own words." : "この要素について、自分の言葉で説明を書いてみる。"}
          </div>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={2}
                    aria-label={en ? "e.g. what it is for, when it breaks" : "例：何のためにあるか、どこで崩れるか"} placeholder={en ? "e.g. what it is for, when it breaks" : "例：何のためにあるか、どこで崩れるか"}
                    style={{ width: "100%", boxSizing: "border-box", fontSize: 12, fontFamily: "inherit", padding: "6px 8px",
                             borderRadius: 6, border: "1px solid rgba(128,128,128,.4)", background: "transparent", color: "inherit", resize: "vertical" }} />
          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            <button onClick={() => putNote(sel, draft)} style={btn(true)}>{en ? "Save" : "保存"}</button>
            {mine[sel] && <button onClick={() => { putNote(sel, ""); setDraft(""); }} style={btn(false)}>{en ? "Delete" : "削除"}</button>}
            <button onClick={() => { setSel(null); setDraft(""); }} style={btn(false)}>{en ? "Close" : "閉じる"}</button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 8, fontSize: 10.5, opacity: .7, lineHeight: 1.6 }}>
          {labels === 0
            ? (hasSvg ? (en ? "Use ＋ to enlarge this figure on a small screen." : "狭い画面では＋で拡大して読めます。") : null)
            : (hint || (en ? "Click any label to see its glossary definition, if there is one, and to add your own note."
                           : "図の中の文字をクリックすると、用語集にあれば意味が出て、自分の説明メモも残せます。"))}
        </div>
      )}

      {showNotes && noteCount > 0 && (
        <div style={{ marginTop: 8, border: "1px solid rgba(128,128,128,.35)", borderRadius: 8, padding: "8px 11px" }}>
          {Object.keys(mine).map((k) => (
            <div key={k} style={{ fontSize: 11.5, lineHeight: 1.7, marginBottom: 4 }}>
              <span style={{ fontWeight: 700, color: "#D8A94E" }}>{k}</span>：{mine[k]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 汎用インタラクティブ図解。graph.kind で形（flow/cycle/layers/pyramid/matrix/timeline）を切替。
// ノードのラベル幅の見積もり（11.5px 太字。全角は1字、半角は字形で幅を変える）。箱の高さを決めるのに使う
function fdTextW(s) {
  let w = 0;
  for (const ch of String(s || "")) { const c = ch.codePointAt(0); w += (c >= 0x2e80 || c >= 0x1f000) ? 11.8 : ch === " " ? 3.4 : /[A-Z0-9MW@%&]/.test(ch) ? 7.8 : /[il.,:;'|!()\/-]/.test(ch) ? 4 : 6.6; }
  return w;
}
// 幅 iw の箱に入れたときの行数の見積もり。英語は語の途中で折り返さないので、語を順に詰めて数える
function fdLines(t, iw) {
  const str = String(t || "");
  if ((str.match(/[ -~]/g) || []).length <= str.length / 2) return Math.max(1, Math.ceil((fdTextW(str) * 1.08) / iw));
  let lines = 1, cur = 0;
  for (const word of str.split(/\s+/).filter(Boolean)) {
    const ww = fdTextW(word) * 1.12;
    if (ww > iw) { lines += (cur ? 1 : 0) + Math.floor(ww / iw); cur = ww % iw; continue; }
    if (!cur) cur = ww; else if (cur + 3.8 + ww <= iw) cur += 3.8 + ww; else { lines++; cur = ww; }
  }
  return lines;
}
// 見積もり幅 maxW に収まるように行を分ける（英語は語で、日本語は字で区切る）。k は 11.5px に対する文字の倍率
function fdWrap(t, maxW, k) {
  const out = []; const str = String(t || ""); const toks = /\s/.test(str) ? str.split(/(\s+)/) : Array.from(str); let cur = "";
  for (const tok of toks) { const nx = cur + tok; if (cur.trim() && fdTextW(nx.trim()) * k > maxW) { out.push(cur.trim()); cur = tok.replace(/^\s+/, ""); } else cur = nx; }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
function FlowDiagram({ graph, lang, terms }) {
  const en = lang === "en";
  const kind = graph.kind || "flow";
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const [vertPref, setVertPref] = useState(null); // flow のみ：null=画面幅で自動 / false=横 / true=縦
  const [zoom, setZoom] = useState(1);
  // 図を描く枠の幅。狭い画面では縮めすぎず（文字が読めなくなる）、横スクロールか縦向きに切り替える
  const scroller = useRef(null);
  const [availW, setAvailW] = useState(0);
  React.useLayoutEffect(() => {
    const el = scroller.current; if (!el) return;
    const upd = () => setAvailW(Math.max(0, el.clientWidth - 24));
    upd();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(upd); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [step, setStep] = useState(null);   // null=全表示 / 0..n-1=ステップ再生
  const [playing, setPlaying] = useState(false);
  const drag = useRef(null);
  useEffect(() => { setMounted(false); const t = setTimeout(() => setMounted(true), 30); return () => clearTimeout(t); }, [graph, kind]);
  const nodes = graph.nodes || [], edges = graph.edges || [];
  const iconOf = (n) => flowIcon((n.labelJa || "") + " " + (n.labelEn || ""));
  const usedIcons = [...new Set(nodes.map(iconOf))];
  const L = useMemo(() => flowLayout(nodes, edges), [graph]);
  const adj = useMemo(() => {
    const m = {}; const push = (a, b) => { (m[a] = m[a] || new Set()).add(b); };
    (edges || []).forEach((e) => { const f = Array.isArray(e) ? e[0] : e.from, t = Array.isArray(e) ? e[1] : e.to; if (f && t) { push(f, t); push(t, f); } });
    return m;
  }, [graph]);
  const BW = 158, BH = 62, GX = 46, GY = 22, PAD = 14;
  const palette = (i) => DIAG_PALETTE[((i % DIAG_PALETTE.length) + DIAG_PALETTE.length) % DIAG_PALETTE.length];
  const pick = (ja, def) => (en ? (ja && ja.en) || def : (ja && ja.ja) || def);
  // 文字を読める大きさに保つ下限の縮尺（ノードの文字 11.5px → 約 10.4px）
  const FD_MIN = 0.9;
  const hW = L.layers.length * BW + Math.max(0, L.layers.length - 1) * GX;
  const vRows = Math.max(1, ...L.layers.map((l) => L.byLayer[l].length));
  const vW = vRows * BW + (vRows - 1) * GX;
  const autoVert = kind === "flow" && availW > 0 && hW * FD_MIN > availW && vW < hW;
  const vert = vertPref == null ? autoVert : vertPref;

  // ---- kind ごとのレイアウト計算 ----
  const lay = useMemo(() => {
    let width = 0, height = 0; const pos = {}; let edgeList = []; const decos = []; let center = null; let showToggle = false;
    // ラベルが箱に収まる高さ（長い英語ラベルが下で切れていたため、図ごとに箱の高さをそろえて広げる）
    const lab = (n) => (en ? n.labelEn : n.labelJa) || "";
    const needH = (n, w, icon) => fdLines(lab(n), Math.max(40, w - 22 - (icon ? 20 : 0))) * 15 + 16;
    const hOf = (w, icon, min) => Math.max(min, ...nodes.map((n) => needH(n, w, icon)));
    if (kind === "cycle") {
      const N = Math.max(1, nodes.length), w = 138, h = hOf(138, true, BH), R = Math.max(120, Math.round(N * 26)), C = R + w / 2 + PAD + 12;
      width = height = 2 * C;
      center = fdWrap(en ? (graph.centerEn || graph.centerJa) : (graph.centerJa || graph.centerEn), Math.max(60, 2 * R - w - 24), 12.5 / 11.5);
      nodes.forEach((n, i) => { const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N; const cx = C + R * Math.cos(ang), cy = C + R * Math.sin(ang); pos[n.id] = { x: cx - w / 2, y: cy - h / 2, w, h, cx, cy }; });
      const seq = edges.length ? edges.map((e) => (Array.isArray(e) ? { from: e[0], to: e[1] } : e)) : nodes.map((n, i) => ({ from: n.id, to: nodes[(i + 1) % N].id }));
      edgeList = seq.map((e) => { const a = pos[e.from], b = pos[e.to]; if (!a || !b) return null; const mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2; const ox = mx - C, oy = my - C, ol = Math.hypot(ox, oy) || 1; const px = mx + (ox / ol) * 30, py = my + (oy / ol) * 30; const trim = (fx, fy, tx, ty, d) => { const dx = tx - fx, dy = ty - fy, l = Math.hypot(dx, dy) || 1; return [fx + (dx / l) * d, fy + (dy / l) * d]; }; const [s0x, s0y] = trim(a.cx, a.cy, px, py, 46); const [t0x, t0y] = trim(b.cx, b.cy, px, py, 46); return { from: e.from, to: e.to, d: `M${s0x},${s0y} Q${px},${py} ${t0x},${t0y}` }; }).filter(Boolean);
      decos.push(<circle key="cg" cx={C} cy={C} r={R} fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 7" />);
    } else if (kind === "layers") {
      const need = Math.min(480, Math.max(300, ...nodes.map((n) => (((en ? n.labelEn : n.labelJa) || "").length * 10 + 80))));
      const LW = availW && availW / FD_MIN < need + PAD * 2 ? Math.max(220, Math.floor(availW / FD_MIN) - PAD * 2) : need;
      const LH = hOf(LW, false, BH);
      width = LW + PAD * 2; height = PAD * 2 + nodes.length * LH + (nodes.length - 1) * 12;
      nodes.forEach((n, i) => { pos[n.id] = { x: PAD, y: PAD + i * (LH + 12), w: LW, h: LH }; });
    } else if (kind === "pyramid") {
      const N = Math.max(1, nodes.length), maxW = availW && availW / FD_MIN < 460 + PAD * 2 ? Math.max(240, Math.floor(availW / FD_MIN) - PAD * 2) : 460, minW = Math.min(170, Math.round(maxW * 0.45)), PH = hOf(minW, false, BH); width = maxW + PAD * 2; height = PAD * 2 + N * PH + (N - 1) * 10;
      nodes.forEach((n, i) => { const w = Math.round(minW + (maxW - minW) * (N <= 1 ? 1 : i / (N - 1))); pos[n.id] = { x: PAD + (maxW - w) / 2, y: PAD + i * (PH + 10), w, h: PH }; });
    } else if (kind === "matrix") {
      const OX = PAD + 26, OY = PAD + 22;
      const CW = availW && availW / FD_MIN < 2 * 230 + 26 + PAD * 2 ? Math.max(130, Math.floor((availW / FD_MIN - 26 - PAD * 2) / 2)) : 230;
      const nw = CW - 26, nh = hOf(nw, false, 44);
      const perQ = [0, 0, 0, 0]; nodes.forEach((n, i) => { perQ[n.q != null ? n.q : i % 4]++; });
      const ax = en ? (graph.axisXEn || graph.axisXJa || ["Low", "High"]) : (graph.axisXJa || ["低", "高"]);
      const ay = en ? (graph.axisYEn || graph.axisYJa || ["Low", "High"]) : (graph.axisYJa || ["低", "高"]);
      const aw = (t) => fdTextW(t + " ▶") * 1.08;
      const CH = Math.max(152, 18 + Math.max(...perQ) * (nh + 6), Math.ceil((aw(ay[0]) + aw(ay[1]) + 28) / 2));
      const xTwo = aw(ax[0]) + aw(ax[1]) + 24 > 2 * CW;
      width = OX + 2 * CW + PAD; height = OY + 2 * CH + 58 + (xTwo ? 16 : 0);
      decos.push(<rect key="mg" x={OX} y={OY} width={2 * CW} height={2 * CH} rx="8" fill="#fff" stroke="#cbd5e1" />);
      decos.push(<line key="mv" x1={OX + CW} y1={OY} x2={OX + CW} y2={OY + 2 * CH} stroke="#cbd5e1" strokeDasharray="4 4" />);
      decos.push(<line key="mh" x1={OX} y1={OY + CH} x2={OX + 2 * CW} y2={OY + CH} stroke="#cbd5e1" strokeDasharray="4 4" />);
      decos.push(<text key="axl" x={OX + 2} y={OY + 2 * CH + 22} fontSize="11.5" fontWeight="700" fill="#64748b">◀ {ax[0]}</text>);
      decos.push(<text key="axr" x={OX + 2 * CW - 2} y={OY + 2 * CH + 22 + (xTwo ? 17 : 0)} fontSize="11.5" fontWeight="700" fill="#64748b" textAnchor="end">{ax[1]} ▶</text>);
      decos.push(<text key="ayt" x={OX - 10} y={OY + 4} transform={`rotate(-90 ${OX - 10} ${OY + 4})`} fontSize="11.5" fontWeight="700" fill="#64748b" textAnchor="end">{ay[1]} ▶</text>);
      decos.push(<text key="ayb" x={OX - 10} y={OY + 2 * CH - 4} transform={`rotate(-90 ${OX - 10} ${OY + 2 * CH - 4})`} fontSize="11.5" fontWeight="700" fill="#64748b" textAnchor="start">◀ {ay[0]}</text>);
      const qc = [0, 0, 0, 0];
      nodes.forEach((n, i) => { const q = (n.q != null ? n.q : i % 4); const col = q % 2, row = q < 2 ? 0 : 1; const x = OX + col * CW + 13, y = OY + row * CH + 12 + qc[q] * (nh + 6); qc[q]++; pos[n.id] = { x, y, w: nw, h: nh }; });
    } else if (kind === "timeline") {
      const N = Math.max(1, nodes.length), SX = 200, nw = 178, nh = hOf(178, true, BH), axisY = PAD + 22 + nh + 18; width = PAD * 2 + 44 + N * SX; height = axisY + nh + 42;
      decos.push(<line key="tax" x1={PAD + 20} y1={axisY} x2={width - PAD} y2={axisY} stroke="#94a3b8" strokeWidth="2.4" markerEnd="url(#fdArrow)" />);
      nodes.forEach((n, i) => { const cx = PAD + 44 + i * SX + nw / 2; const above = i % 2 === 0; const y = above ? axisY - 20 - nh : axisY + 20; pos[n.id] = { x: cx - nw / 2, y, w: nw, h: nh }; decos.push(<circle key={"td" + i} cx={cx} cy={axisY} r="6" fill={palette(i)} stroke="#fff" strokeWidth="2" />); decos.push(<line key={"tc" + i} x1={cx} y1={axisY} x2={cx} y2={above ? axisY - 20 : axisY + 20} stroke={palette(i)} strokeWidth="1.6" />); });
    } else { // flow (default)
      showToggle = true;
      const maxRows = Math.max(1, ...L.layers.map((l) => L.byLayer[l].length));
      const FH = hOf(BW, true, BH);
      width = vert ? (maxRows * BW + (maxRows - 1) * GX) : (L.layers.length * BW + (L.layers.length - 1) * GX);
      height = vert ? Math.max(FH, L.layers.length * FH + (L.layers.length - 1) * GY) : Math.max(FH, maxRows * FH + (maxRows - 1) * GY);
      L.layers.forEach((l, li) => {
        const ids = L.byLayer[l];
        if (vert) { const rowW = ids.length * BW + (ids.length - 1) * GX; const x0 = (width - rowW) / 2; ids.forEach((id, j) => { pos[id] = { x: x0 + j * (BW + GX), y: li * (FH + GY), w: BW, h: FH }; }); }
        else { const colH = ids.length * FH + (ids.length - 1) * GY; const y0 = (height - colH) / 2; ids.forEach((id, j) => { pos[id] = { x: li * (BW + GX), y: y0 + j * (FH + GY), w: BW, h: FH }; }); }
      });
      edgeList = L.E.map((e) => { const a = pos[e.from], b = pos[e.to]; if (!a || !b) return null; return { from: e.from, to: e.to, d: fdEdgePath(a, b, vert) }; }).filter(Boolean);
    }
    return { width: Math.max(width, 40), height: Math.max(height, 40), pos, edgeList, decos, center, showToggle };
  }, [graph, kind, vert, en, L, availW]);

  const activeId = hov || sel;
  const selNode = sel ? (L.id2node[sel] || nodes.find((n) => n.id === sel)) : null;
  const colorOf = (n, i) => (kind === "flow" ? palette(L.layer[n.id]) : palette(i));
  const showLegend = (kind === "flow" || kind === "cycle" || kind === "timeline") && usedIcons.length;
  const kl = FD_KIND_LABEL[kind] || FD_KIND_LABEL.flow;
  const fit = availW ? Math.min(1, availW / lay.width) : 1;
  const sc = Math.min(1, Math.max(fit, FD_MIN)) * zoom;
  const scrollsX = availW > 0 && lay.width * sc > availW + 2;
  // ドラッグで枠をスクロールする（マウスのみ。指は端末の標準スクロールに任せる）
  const onMove = (e) => { const d = drag.current, el = scroller.current; if (!d || !el) return; el.scrollLeft = d.sl - (e.clientX - d.x); el.scrollTop = d.st - (e.clientY - d.y); };
  const endPan = () => { drag.current = null; };
  const btn = { fontSize: 11, fontWeight: 700, border: "1px solid #cbd5e1", background: "#fff", color: "#475569", borderRadius: 7, padding: "3px 8px", cursor: "pointer", lineHeight: 1 };
  // 検索：ラベル一致ノードの集合
  const q = query.trim().toLowerCase();
  const matchSet = q ? new Set(nodes.filter((n) => ((n.labelJa || "") + " " + (n.labelEn || "")).toLowerCase().includes(q)).map((n) => n.id)) : null;
  // ステップ再生の順序：flow は層順、それ以外は配列順
  const orderIds = useMemo(() => (kind === "flow" ? L.layers.flatMap((l) => L.byLayer[l]) : nodes.map((n) => n.id)), [graph, kind, L]);
  const revealIdx = {}; orderIds.forEach((id, i) => { revealIdx[id] = i; });
  const stepId = step != null ? orderIds[step] : null;
  const revealed = (id) => step == null || revealIdx[id] <= step;
  useEffect(() => {
    if (!playing) return;
    if (step == null) { setStep(0); return; }
    if (step >= orderIds.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => (s == null ? 0 : s + 1)), 1100);
    return () => clearTimeout(t);
  }, [playing, step, orderIds.length]);
  const resetPlay = () => { setPlaying(false); setStep(null); };

  return (
    <div data-fd="1" style={{ margin: "6px 0 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10.5, fontWeight: 800, color: "#475569", background: "#eef2ff", border: "1px solid #e0e7ff", borderRadius: 20, padding: "2px 9px" }}>{FD_KIND_ICON[kind] || "🔀"} {en ? kl[1] : kl[0]}</span>
        {(graph.titleJa || graph.titleEn) ? <div style={{ fontSize: 13, fontWeight: 800, color: "#1e293b" }}>{en ? graph.titleEn : graph.titleJa}</div> : null}
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", gap: 6, flexShrink: 0 }}>
        {lay.showToggle ? (
          <button onClick={() => setVertPref(!vert)} style={btn}>{vert ? (en ? "⇄ Horizontal" : "⇄ 横向き") : (en ? "⇅ Vertical" : "⇅ 縦向き")}</button>
        ) : null}
        <button onClick={() => setZoom((z) => Math.max(0.5, +(z / 1.2).toFixed(3)))} style={btn} title="zoom out">－</button>
        <button onClick={() => { setZoom(1); const el = scroller.current; if (el) { el.scrollLeft = 0; el.scrollTop = 0; } }} style={btn} title="reset">⟲</button>
        <button onClick={() => setZoom((z) => Math.min(2.2, +(z * 1.2).toFixed(3)))} style={btn} title="zoom in">＋</button>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label={en ? "🔍 search nodes" : "🔍 ノード検索"} placeholder={en ? "🔍 search nodes" : "🔍 ノード検索"}
          style={{ fontSize: 11.5, border: "1px solid #cbd5e1", borderRadius: 7, padding: "4px 9px", width: 150, color: "#334155" }} />
        {matchSet ? <span style={{ fontSize: 10.5, color: "#64748b", fontWeight: 700 }}>{matchSet.size}{en ? " hit" : "件"}</span> : null}
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 10.5, color: "#64748b", fontWeight: 700 }}>{en ? "Play:" : "再生:"}</span>
        <button onClick={() => setStep((s) => Math.max(0, (s == null ? 0 : s) - 1))} style={btn} title="prev">⏮</button>
        <button onClick={() => setPlaying((p) => !p)} style={{ ...btn, background: playing ? "#475569" : "#fff", color: playing ? "#fff" : "#475569" }} title="play/pause">{playing ? "⏸" : "▶"}</button>
        <button onClick={() => setStep((s) => Math.min(orderIds.length - 1, (s == null ? -1 : s) + 1))} style={btn} title="next">⏭</button>
        <button onClick={resetPlay} style={btn} title="reset">⟲{en ? " all" : " 全"}</button>
        {step != null ? <span style={{ fontSize: 10.5, color: "#475569", fontWeight: 700 }}>{step + 1}/{orderIds.length}</span> : null}
        </span>
      </div>
      {showLegend ? (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8, alignItems: "center" }}>
          <span style={{ fontSize: 10.5, color: "#64748b", fontWeight: 700 }}>{en ? "Legend:" : "凡例:"}</span>
          {usedIcons.map((ic) => (
            <span key={ic} style={{ fontSize: 10.5, color: "#64748b", display: "inline-flex", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 13 }}>{ic}</span>{flowIconLabel(ic, en)}
            </span>
          ))}
          <span style={{ fontSize: 10.5, color: "#64748b" }}>{en ? "🖱 hover to highlight · click for details" : "🖱 ホバーで強調 ・ クリックで詳細"}{terms ? (en ? " · terms explained" : " ・ 用語の意味も") : ""}</span>
        </div>
      ) : (
        <div style={{ fontSize: 10.5, color: "#64748b", marginBottom: 8 }}>{en ? "🖱 hover to highlight · click for details · drag to pan" : "🖱 ホバーで強調 ・ クリックで詳細 ・ ドラッグで移動"}{terms ? (en ? " · terms explained" : " ・ 用語の意味も") : ""}</div>
      )}
      <div ref={scroller} style={{ overflow: "auto", border: "1px solid #e2e8f0", borderRadius: 12, background: "#fbfcfe", padding: 12 }}>
        <svg width={Math.round(lay.width * sc)} height={Math.round(lay.height * sc)} viewBox={`0 0 ${lay.width} ${lay.height}`}
          onMouseMove={onMove} onMouseUp={endPan} onMouseLeave={endPan}
          style={{ display: "block", margin: scrollsX ? 0 : "0 auto", touchAction: "pan-x pan-y" }}>
          <defs>
            <marker id="fdArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L7,3 L0,6 Z" fill="#94a3b8" />
            </marker>
          </defs>
          <rect x="0" y="0" width={lay.width} height={lay.height} fill="transparent"
            onMouseDown={(e) => { const el = scroller.current; drag.current = { x: e.clientX, y: e.clientY, sl: el ? el.scrollLeft : 0, st: el ? el.scrollTop : 0 }; }}
            style={{ cursor: "grab" }} />
          <g>
            {lay.decos}
            {lay.center && lay.center.length ? <text x={lay.width / 2} y={lay.height / 2 - (lay.center.length - 1) * 8} textAnchor="middle" dominantBaseline="middle" fontSize="12.5" fontWeight="800" fill="#475569">{lay.center.map((ln, i) => <tspan key={i} x={lay.width / 2} dy={i ? 16 : 0}>{ln}</tspan>)}</text> : null}
            {lay.edgeList.map((e, i) => {
              const shown = revealed(e.from) && revealed(e.to);
              const eact = activeId && (e.from === activeId || e.to === activeId);
              const edim = (activeId && !eact) || (matchSet && !(matchSet.has(e.from) || matchSet.has(e.to)));
              return <path key={i} d={e.d} fill="none" stroke={eact ? "#475569" : "#94a3b8"} strokeWidth={eact ? 2.6 : 1.6} markerEnd="url(#fdArrow)"
                style={{ opacity: mounted ? (!shown ? 0.05 : edim ? 0.18 : 1) : 0, transition: "opacity .3s ease, stroke .2s, stroke-width .2s" }} />;
            })}
            {nodes.map((n, i) => {
              const p = lay.pos[n.id]; if (!p) return null;
              const col = colorOf(n, i);
              const isSel = sel === n.id;
              const show = revealed(n.id);
              const match = !matchSet || matchSet.has(n.id);
              const near = activeId && (n.id === activeId || (adj[activeId] && adj[activeId].has(n.id)));
              const dim = (!show) || (matchSet && !match) || (activeId && !near && !isSel);
              const filled = isSel || hov === n.id || (matchSet && match) || (stepId === n.id);
              return (
                <foreignObject key={n.id} x={p.x} y={p.y} width={p.w} height={p.h} style={{ overflow: "visible" }}>
                  <div onMouseEnter={() => setHov(n.id)} onMouseLeave={() => setHov((h) => (h === n.id ? null : h))}
                    onClick={() => setSel(isSel ? null : n.id)}
                    style={{ boxSizing: "border-box", width: p.w, height: p.h, border: `2px solid ${col}`, background: filled ? col : "#fff", color: filled ? "#fff" : "#1e293b", borderRadius: kind === "pyramid" ? 8 : 10, padding: "5px 9px", fontSize: 11.5, fontWeight: 700, lineHeight: 1.3, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, textAlign: "center", cursor: (n.detailJa || n.detailEn) ? "pointer" : "default", overflow: "hidden", opacity: mounted ? (!show ? 0.08 : dim ? 0.28 : 1) : 0, pointerEvents: show ? "auto" : "none", transform: mounted ? (filled ? "scale(1.05)" : "scale(1)") : "scale(.95)", boxShadow: filled ? `0 5px 16px ${col}55` : "0 1px 2px #0000000f", transition: "opacity .25s ease, transform .2s cubic-bezier(.4,0,.2,1), background .18s, box-shadow .2s" }}>
                    {(kind === "flow" || kind === "cycle" || kind === "timeline") ? <span style={{ fontSize: 15, flexShrink: 0 }}>{iconOf(n)}</span> : null}
                    <span style={{ overflow: "hidden", overflowWrap: "anywhere" }}>{en ? n.labelEn : n.labelJa}</span>
                  </div>
                </foreignObject>
              );
            })}
          </g>
        </svg>
      </div>
      {scrollsX ? <div style={{ marginTop: 4, fontSize: 10.5, color: "#64748b", textAlign: "right" }}>{en ? "Scroll sideways to see the rest →" : "横にスクロールすると続きが見えます →"}</div> : null}
      {selNode && (selNode.detailJa || selNode.detailEn) ? (
        <div style={{ marginTop: 8, padding: "10px 14px", background: "#f1f5f9", borderLeft: "4px solid #475569", borderRadius: 8, fontSize: 12.5, lineHeight: 1.7, color: "#1e293b" }}>
          <b>{en ? selNode.labelEn : selNode.labelJa}:</b> {en ? (selNode.detailEn || selNode.detailJa) : (selNode.detailJa || selNode.detailEn)}
          {/* 選んだノードの解説に出てくる用語だけを並べる（図全体でまとめると語が混ざるため） */}
          {terms ? <TermStrip key={selNode.id} lang={lang} terms={terms}
                              text={[selNode.labelJa, selNode.labelEn, selNode.detailJa, selNode.detailEn].join(" ")} /> : null}
        </div>
      ) : (
        <div style={{ marginTop: 6, fontSize: 11, color: "#64748b" }}>{en ? "Click a box for details" : "ボックスをクリックで詳細"}</div>
      )}
    </div>
  );
}
// CertCompletion — 資格ステーション共通の「学習完了度」メーター（MegaTech同様、
// クイズ消化・模試セット完了・図解確認を合成）。storeKey は当該ステーションの STORE_KEY、
// figsKey は figs_done_v1 のキー接頭辞、figsTotal は図解の総数、bankLen は練習BANKの問数。
function CertCompletion({ state, storeKey, figsKey, figsTotal, bankLen, lang, C }) {
  const en = lang === "en";
  const col = (C && (C.primary || C.deep)) || "#1F6FB0";
  const ink = (C && (C.deep || C.ink)) || "#123A6B";
  const [act, setAct] = useState({ mock: 0, figs: 0 });
  useEffect(() => { (async () => {
    let mock = 0, figs = 0;
    try { const r = await window.storage.get("msexam_done_v1"); const m = r && r.value ? JSON.parse(r.value) || {} : {}; const pre = (storeKey || "") + ":msexam#exam"; mock = Object.keys(m).filter(k => k.startsWith(pre)).length; } catch (e) {}
    try { const r = await window.storage.get("figs_done_v1"); const m = r && r.value ? JSON.parse(r.value) || {} : {}; const pre = (figsKey || storeKey || "") + "#"; figs = Object.keys(m).filter(k => k.startsWith(pre)).length; } catch (e) {}
    setAct({ mock, figs });
  })(); }, [state]);
  let ta = 0; try { Object.values(state.progress || {}).forEach(p => { ta += (p && p.attempts) || 0; }); } catch (e) {}
  const quizPct = bankLen ? Math.min(100, Math.round((ta / bankLen) * 100)) : 0;
  const mockPct = Math.min(100, Math.round((act.mock / 5) * 100));
  const figsPct = figsTotal ? Math.min(100, Math.round((act.figs / figsTotal) * 100)) : null;
  const parts = figsPct === null ? [quizPct, mockPct] : [quizPct, mockPct, figsPct];
  const compPct = Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
  const bar = (label, pct, extra) => (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}><span style={{ fontWeight: 700, color: ink }}>{label}</span><span style={{ color: "#5f6974" }}>{extra ? extra + "・" : ""}{pct}%</span></div>
      <div style={{ height: 7, background: "#eef2f5", borderRadius: 999, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: pct >= 100 ? "#158F6B" : col }} /></div>
    </div>
  );
  return (
    <div style={{ background: (C && C.light) || "#F2F7FB", border: `1px solid ${(C && C.mid) || "#cfe0ee"}`, borderRadius: 12, padding: "13px 16px", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: ink }}>{en ? "Completion" : "学習完了度"}</span>
        <span style={{ fontSize: 22, fontWeight: 800, color: compPct >= 100 ? "#158F6B" : nvInk(col, (C && C.light) || "#F2F7FB") }}>{compPct}<span style={{ fontSize: 12 }}>%</span></span>
        <span style={{ fontSize: 10.5, color: "#5f6974" }}>{en ? "quiz · mock exams · diagrams" : "クイズ・模試・図解の完了を計測"}</span>
      </div>
      {bar(en ? "Quiz coverage" : "クイズ消化", quizPct, `${Math.min(ta, bankLen)}/${bankLen}${en ? "" : "問"}`)}
      {bar(en ? "Mock exam sets" : "模試セット完了", mockPct, `${act.mock}/5`)}
      {figsPct === null ? null : bar(en ? "Diagrams reviewed" : "図解確認", figsPct, `${act.figs}/${figsTotal}`)}
    </div>
  );
}

function FlowSection({ flows, lang, doneKey, terms }) {
  // doneKey（ステーション固有キー）を渡すと各図に「確認済み」トグルが付き、
  // figs_done_v1（全ステーション共通マップ）へ保存される。進捗タブの図解完了率の元データ。
  const en = lang === "en";
  const [done, setDone] = useState({});
  useEffect(() => {
    if (!doneKey) return;
    (async () => { try { const r = await window.storage.get("figs_done_v1"); if (r && r.value) setDone(JSON.parse(r.value) || {}); } catch (e) {} })();
  }, [doneKey]);
  if (!flows || !flows.length) return null;
  const keyOf = (f) => doneKey + "#" + (f.titleJa || f.titleEn || "");
  const toggle = (f) => setDone((prev) => {
    const k = keyOf(f); const next = { ...prev };
    if (next[k]) delete next[k]; else next[k] = true;
    try { window.storage.set("figs_done_v1", JSON.stringify(next)); } catch (e) {}
    return next;
  });
  return <div style={{ marginBottom: 8 }}>{flows.map((f, i) => (
    <div key={i}>
      {doneKey ? (
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "0 0 -4px" }}>
          <button onClick={() => toggle(f)} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: done[keyOf(f)] ? "#158F6B" : "transparent", border: `1.5px solid ${done[keyOf(f)] ? "#158F6B" : "#c9d4dc"}`, borderRadius: 999, padding: "2px 10px", fontSize: 10.5, fontWeight: 700, color: done[keyOf(f)] ? "#fff" : "#5d6b78", cursor: "pointer" }}>
            {done[keyOf(f)] ? "✓ " : "○ "}{en ? (done[keyOf(f)] ? "Reviewed" : "Mark reviewed") : (done[keyOf(f)] ? "確認済み" : "確認したらチェック")}
          </button>
        </div>
      ) : null}
      <FlowDiagram graph={f} lang={lang} terms={terms} />
    </div>
  ))}</div>;
}

// ====== ★ブックマーク（全ハブ共通） ======
// クイズ・模試などの問題に★を付けて後で振り返る。nova_starred_v1 に
// { key: { t:問題文(先頭160字), s:出典ラベル, ts:登録時刻 } } で保存。
function novaQHash(s) { let h = 5381; for (let i = 0; i < (s || "").length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) | 0; } return (h >>> 0).toString(36); }
const StarStore = {
  map: null, subs: new Set(),
  async load() {
    if (this.map) return this.map;
    try { const r = await window.storage.get("nova_starred_v1"); this.map = r && r.value ? (JSON.parse(r.value) || {}) : {}; } catch (e) { this.map = {}; }
    return this.map;
  },
  toggle(k, meta) {
    const m = this.map || (this.map = {});
    if (m[k]) delete m[k]; else m[k] = { ...meta, ts: Date.now() };
    try { window.storage.set("nova_starred_v1", JSON.stringify(m)); } catch (e) {}
    this.subs.forEach((f) => { try { f(); } catch (e) {} });
  },
};
function StarButton({ id, text, scope, size }) {
  const [, force] = useState(0);
  useEffect(() => {
    let on = true;
    StarStore.load().then(() => { if (on) force((x) => x + 1); });
    const f = () => force((x) => x + 1);
    StarStore.subs.add(f);
    return () => { on = false; StarStore.subs.delete(f); };
  }, []);
  const starred = !!(StarStore.map && StarStore.map[id]);
  return (
    <button onClick={(e) => { e.stopPropagation(); StarStore.toggle(id, { t: (text || "").slice(0, 160), s: scope || "" }); }}
      title={starred ? "★を外す" : "あとで振り返る（★）"}
      style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: size || 17, lineHeight: 1, color: starred ? "#B7791F" : "#7f8b98", padding: "2px 4px", flexShrink: 0 }}>
      {starred ? "★" : "☆"}
    </button>
  );
}
// Study Log 内の「★ふりかえり」一覧（全ハブ横断）
function StarredPanel({ lang }) {
  const en = lang === "en";
  const [, force] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let on = true;
    StarStore.load().then(() => { if (on) force((x) => x + 1); });
    const f = () => force((x) => x + 1);
    StarStore.subs.add(f);
    return () => { on = false; StarStore.subs.delete(f); };
  }, []);
  const m = StarStore.map || {};
  const entries = Object.entries(m).sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0));
  if (!entries.length) return null;
  return (
    <div style={{ background: "#FFFDF5", border: "1px solid #F0DFB6", borderRadius: 10, padding: "10px 13px", margin: "10px 0" }}>
      <div onClick={() => setOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <span style={{ fontSize: 13, color: "#E8A03D" }}>★</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#6b5b2e" }}>{en ? "Starred for review" : "★ふりかえりリスト"}</span>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: "#a08b52" }}>{entries.length}{en ? "" : "件"}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: "#a08b52" }}>{open ? "▾" : "▸"}</span>
      </div>
      {open ? (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, maxHeight: 340, overflowY: "auto" }}>
          {entries.map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 11.5, borderTop: "1px solid #F2E8CE", padding: "5px 0 1px" }}>
              <button onClick={() => StarStore.toggle(k, {})} title={en ? "remove" : "★を外す"} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#E8A03D", fontSize: 14, lineHeight: 1, padding: 0, flexShrink: 0 }}>★</button>
              <div style={{ minWidth: 0 }}>
                {v.s ? <span style={{ fontSize: 9.5, fontWeight: 800, color: "#8a7743", background: "#F7EED8", borderRadius: 4, padding: "1px 6px", marginRight: 6 }}>{v.s}</span> : null}
                <span style={{ color: "#4b4633", lineHeight: 1.55 }}>{v.t}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ====== 資格別の概念図（多様な図解: サイクル / レイヤー / マトリクス） ======
// 解説の薄い基礎（Fundamentals/入門）資格に、要点を俯瞰する図を追加する。
// FlowDiagram（kind 対応）を再利用するので新レンダラ不要。
// 追加は CONCEPT_FIGS に station id をキーでエントリを足すだけ。
const CONCEPT_FIGS = {
  // ── AWS Certified Cloud Practitioner (CLF-C02) ──
  clf: [
    {
      kind: "cycle", titleJa: "クラウド導入のライフサイクル", titleEn: "Cloud Adoption Lifecycle",
      centerJa: "クラウド活用", centerEn: "Cloud journey",
      nodes: [
        { id: "assess", labelJa: "評価", labelEn: "Assess", detailJa: "現状のワークロードとコストを棚卸しし、クラウド化の目的とKPIを定める。", detailEn: "Inventory current workloads and costs; define goals and KPIs for moving to the cloud." },
        { id: "plan", labelJa: "計画・PoC", labelEn: "Plan / PoC", detailJa: "移行方式（リホスト等）を選び、小さく試して実現性とコストを検証する。", detailEn: "Choose a migration path (rehost, etc.) and validate feasibility and cost with a small pilot." },
        { id: "migrate", labelJa: "移行", labelEn: "Migrate", detailJa: "対象をAWSへ段階的に移行。責任共有モデルに沿って構成する。", detailEn: "Migrate workloads to AWS in stages, configured along the shared responsibility model." },
        { id: "operate", labelJa: "運用・監視", labelEn: "Operate", detailJa: "CloudWatch等で監視し、Well-Architectedの観点で運用を安定させる。", detailEn: "Monitor with CloudWatch and stabilize operations against the Well-Architected pillars." },
        { id: "optimize", labelJa: "最適化", labelEn: "Optimize", detailJa: "コスト・性能・セキュリティを継続的に見直し、次の評価へ回す。", detailEn: "Continuously refine cost, performance, and security, then loop back to reassessment." },
      ],
    },
    {
      kind: "layers", titleJa: "Well-Architected Framework の6本柱", titleEn: "The 6 Pillars of the Well-Architected Framework",
      nodes: [
        { id: "ops", labelJa: "運用上の優秀性", labelEn: "Operational Excellence", detailJa: "運用を自動化し、変更を小さく頻繁に行い、失敗から学ぶ。", detailEn: "Automate operations, make small frequent changes, and learn from failure." },
        { id: "sec", labelJa: "セキュリティ", labelEn: "Security", detailJa: "最小権限・多層防御・トレーサビリティでデータとシステムを守る。", detailEn: "Protect data and systems with least privilege, defense in depth, and traceability." },
        { id: "rel", labelJa: "信頼性", labelEn: "Reliability", detailJa: "障害から自動回復し、需要変化にスケールで応える。", detailEn: "Recover automatically from failure and scale to meet changing demand." },
        { id: "perf", labelJa: "パフォーマンス効率", labelEn: "Performance Efficiency", detailJa: "要件に合ったリソースを選び、技術の進化を取り入れる。", detailEn: "Select resources that fit requirements and adopt evolving technologies." },
        { id: "cost", labelJa: "コスト最適化", labelEn: "Cost Optimization", detailJa: "不要な支出を避け、消費モデルと適正サイズで無駄を削る。", detailEn: "Avoid unneeded spend using consumption models and right-sizing." },
        { id: "sus", labelJa: "持続可能性", labelEn: "Sustainability", detailJa: "環境負荷を意識し、使用リソースと影響を最小化する。", detailEn: "Minimize resource use and environmental impact of the workload." },
      ],
    },
    {
      kind: "matrix", titleJa: "EC2 購入オプションの選び方", titleEn: "Choosing EC2 Purchasing Options",
      axisXJa: ["コミット小", "コミット大"], axisXEn: ["Low commitment", "High commitment"],
      axisYJa: ["割引小", "割引大"], axisYEn: ["Low discount", "High discount"],
      nodes: [
        { id: "spot", q: 0, labelJa: "スポット", labelEn: "Spot", detailJa: "最大90%割引だが中断あり。ステートレスなバッチ・耐障害処理向き。", detailEn: "Up to 90% off but interruptible—best for stateless, fault-tolerant batch work." },
        { id: "savings", q: 1, labelJa: "Savings Plans", labelEn: "Savings Plans", detailJa: "1/3年の利用量コミットで柔軟に割引。サービス横断で適用。", detailEn: "Commit to 1- or 3-year usage for flexible discounts across services." },
        { id: "reserved", q: 1, labelJa: "リザーブド", labelEn: "Reserved Instances", detailJa: "特定構成を1/3年予約して割引＋容量確保。安定稼働向き。", detailEn: "Reserve a specific configuration for 1–3 years for discount plus capacity." },
        { id: "ondemand", q: 2, labelJa: "オンデマンド", labelEn: "On-Demand", detailJa: "コミット不要で従量課金。短期・予測困難な負荷向き。", detailEn: "Pay-as-you-go with no commitment—good for short or unpredictable workloads." },
        { id: "dedicated", q: 3, labelJa: "Dedicated Hosts", labelEn: "Dedicated Hosts", detailJa: "物理サーバを専有。ライセンス持ち込みやコンプライアンス要件向き。", detailEn: "Dedicated physical servers for BYOL licensing and compliance needs." },
      ],
    },
  ],

  // ── Microsoft Power Platform Fundamentals (PL-900) ──
  pl900: [
    {
      kind: "cycle", titleJa: "ローコード ソリューション開発サイクル", titleEn: "Low-Code Solution Development Cycle",
      centerJa: "ローコード開発", centerEn: "Low-code build",
      nodes: [
        { id: "discover", labelJa: "発見・要件", labelEn: "Discover", detailJa: "業務課題を洗い出し、自動化・アプリ化する対象を決める。", detailEn: "Identify business problems and decide what to app-ify or automate." },
        { id: "design", labelJa: "設計", labelEn: "Design", detailJa: "データモデル（Dataverse）と画面・フローの流れを設計する。", detailEn: "Design the data model (Dataverse) plus screens and flow logic." },
        { id: "build", labelJa: "構築", labelEn: "Build", detailJa: "Power Apps / Automate でドラッグ操作中心に作る。コード最小限。", detailEn: "Build largely by drag-and-drop in Power Apps / Automate with minimal code." },
        { id: "test", labelJa: "テスト", labelEn: "Test", detailJa: "現場ユーザーと検証し、権限・データ接続を確認する。", detailEn: "Validate with end users; check permissions and data connections." },
        { id: "deploy", labelJa: "公開", labelEn: "Deploy", detailJa: "ソリューションとして環境へ配布し、利用者へ展開する。", detailEn: "Package as a solution and deploy across environments to users." },
        { id: "operate", labelJa: "運用・改善", labelEn: "Operate", detailJa: "利用状況を見て改善。次の発見フェーズへ回す。", detailEn: "Monitor usage, improve, and loop back to discovery." },
      ],
    },
    {
      kind: "layers", titleJa: "Power Platform スタック", titleEn: "The Power Platform Stack",
      nodes: [
        { id: "copilot", labelJa: "Copilot Studio", labelEn: "Copilot Studio", detailJa: "会話型AIエージェント／コパイロットをノーコードで構築。", detailEn: "Build conversational AI agents and copilots with no code." },
        { id: "apps", labelJa: "Power Apps / Pages", labelEn: "Power Apps / Pages", detailJa: "業務アプリと外部向けWebサイトをローコードで作成。", detailEn: "Build business apps and external websites with low code." },
        { id: "automate", labelJa: "Power Automate", labelEn: "Power Automate", detailJa: "クラウドフローとRPAで手作業を自動化。", detailEn: "Automate manual work with cloud flows and RPA." },
        { id: "bi", labelJa: "Power BI", labelEn: "Power BI", detailJa: "データを対話的なダッシュボードで可視化・分析。", detailEn: "Visualize and analyze data with interactive dashboards." },
        { id: "dataverse", labelJa: "Dataverse + コネクタ", labelEn: "Dataverse + Connectors", detailJa: "共通データ基盤と1000以上のコネクタで各サービスをつなぐ。", detailEn: "A shared data platform and 1000+ connectors tying the services together." },
      ],
    },
    {
      kind: "matrix", titleJa: "Power Automate フローの種類", titleEn: "Types of Power Automate Flows",
      axisXJa: ["人が起動", "自動で起動"], axisXEn: ["Human-triggered", "Auto-triggered"],
      axisYJa: ["デスクトップ(RPA)", "クラウド"], axisYEn: ["Desktop (RPA)", "Cloud"],
      nodes: [
        { id: "instant", q: 0, labelJa: "インスタントフロー", labelEn: "Instant flow", detailJa: "ボタン等で人が手動起動するクラウドフロー。", detailEn: "A cloud flow a person starts manually, e.g. via a button." },
        { id: "automated", q: 1, labelJa: "自動化フロー", labelEn: "Automated flow", detailJa: "イベントやスケジュールを引き金に自動実行するクラウドフロー。", detailEn: "A cloud flow triggered automatically by an event or schedule." },
        { id: "attended", q: 2, labelJa: "デスクトップ(有人)", labelEn: "Desktop (attended)", detailJa: "人の操作に合わせPC上のレガシー画面を操作するRPA。", detailEn: "RPA driving legacy desktop apps alongside a human operator." },
        { id: "unattended", q: 3, labelJa: "デスクトップ(無人)", labelEn: "Desktop (unattended)", detailJa: "スケジュールで無人実行するデスクトップRPA。", detailEn: "Desktop RPA run unattended on a schedule." },
      ],
    },
  ],

  // ── Security, Compliance, and Identity Fundamentals (SC-900) ──
  sc900: [
    {
      kind: "cycle", titleJa: "アイデンティティ ライフサイクル", titleEn: "Identity Lifecycle",
      centerJa: "Microsoft Entra", centerEn: "Microsoft Entra",
      nodes: [
        { id: "provision", labelJa: "登録・作成", labelEn: "Provision", detailJa: "入社等でIDを作成し、必要な属性とグループを割り当てる。", detailEn: "Create an identity (e.g. on joining) and assign attributes and groups." },
        { id: "authn", labelJa: "認証 (MFA)", labelEn: "Authenticate", detailJa: "本人確認。多要素認証（MFA）で「誰か」を検証する。", detailEn: "Verify who the user is, strengthened by multifactor authentication (MFA)." },
        { id: "authz", labelJa: "認可", labelEn: "Authorize", detailJa: "RBACと条件付きアクセスで「何ができるか」を制御する。", detailEn: "Control what the user can do via RBAC and Conditional Access." },
        { id: "review", labelJa: "アクセスレビュー", labelEn: "Access review", detailJa: "権限が過剰でないか定期的に棚卸しし、最小権限を保つ。", detailEn: "Periodically recertify access to keep least privilege." },
        { id: "deprovision", labelJa: "失効・削除", labelEn: "Deprovision", detailJa: "退職・異動でアクセスを速やかに剥奪し、IDを整理する。", detailEn: "Promptly revoke access on leaving or moving roles and retire the identity." },
      ],
    },
    {
      kind: "layers", titleJa: "多層防御 (Defense in Depth)", titleEn: "Defense in Depth",
      nodes: [
        { id: "physical", labelJa: "物理", labelEn: "Physical", detailJa: "データセンターへの物理アクセスを制限する。", detailEn: "Restrict physical access to the datacenter." },
        { id: "identity", labelJa: "ID とアクセス", labelEn: "Identity & Access", detailJa: "MFAと条件付きアクセスで入口を守る（ゼロトラストの起点）。", detailEn: "Guard the front door with MFA and Conditional Access—the Zero Trust starting point." },
        { id: "perimeter", labelJa: "境界", labelEn: "Perimeter", detailJa: "DDoS防御やファイアウォールで境界を守る。", detailEn: "Protect the boundary with DDoS protection and firewalls." },
        { id: "network", labelJa: "ネットワーク", labelEn: "Network", detailJa: "セグメント化とアクセス制御で横移動を防ぐ。", detailEn: "Segment networks and limit access to prevent lateral movement." },
        { id: "compute", labelJa: "コンピュート", labelEn: "Compute", detailJa: "エンドポイントとVMを保護し、脆弱性を管理する。", detailEn: "Secure endpoints and VMs and manage vulnerabilities." },
        { id: "app", labelJa: "アプリケーション", labelEn: "Application", detailJa: "セキュアな開発と脆弱性対策でアプリを守る。", detailEn: "Protect apps through secure development and remediation." },
        { id: "data", labelJa: "データ", labelEn: "Data", detailJa: "暗号化と分類・保護（Purview）で最重要資産を守る。", detailEn: "Protect the crown-jewel asset with encryption and classification (Purview)." },
      ],
    },
    {
      kind: "matrix", titleJa: "リスク対応マトリクス", titleEn: "Risk Response Matrix",
      axisXJa: ["可能性 低", "可能性 高"], axisXEn: ["Low likelihood", "High likelihood"],
      axisYJa: ["影響 小", "影響 大"], axisYEn: ["Low impact", "High impact"],
      nodes: [
        { id: "transfer", q: 0, labelJa: "移転", labelEn: "Transfer", detailJa: "保険や委託で影響を第三者に移す（稀だが打撃大）。", detailEn: "Shift impact to a third party via insurance or outsourcing (rare but severe)." },
        { id: "avoid", q: 1, labelJa: "回避・優先軽減", labelEn: "Avoid / Mitigate", detailJa: "最優先で統制を強化、または活動自体を止める。", detailEn: "Top priority: strengthen controls or stop the activity entirely." },
        { id: "accept", q: 2, labelJa: "受容", labelEn: "Accept", detailJa: "影響が小さく起きにくいものは監視のうえ受け入れる。", detailEn: "Monitor and accept risks that are minor and unlikely." },
        { id: "reduce", q: 3, labelJa: "軽減・運用統制", labelEn: "Reduce", detailJa: "頻発するが影響が小さいものは運用で低減する。", detailEn: "Reduce frequent but low-impact risks through operational controls." },
      ],
    },
  ],

  // ── GitHub Foundations (GH-900) ──
  gh900: [
    {
      kind: "cycle", titleJa: "GitHub Flow", titleEn: "GitHub Flow",
      centerJa: "main は常にデプロイ可能", centerEn: "main is always deployable",
      nodes: [
        { id: "branch", labelJa: "ブランチ作成", labelEn: "Create branch", detailJa: "mainから作業用ブランチを分け、変更を隔離する。", detailEn: "Branch off main to isolate your changes." },
        { id: "commit", labelJa: "コミット", labelEn: "Commit", detailJa: "小さな単位で変更を記録し、履歴を残す。", detailEn: "Record changes in small commits that build history." },
        { id: "pr", labelJa: "プルリク作成", labelEn: "Open PR", detailJa: "変更をまとめてレビューを依頼するプルリクを開く。", detailEn: "Open a pull request to bundle changes and request review." },
        { id: "review", labelJa: "レビュー", labelEn: "Review", detailJa: "チームがコードを確認し、改善提案や承認を行う。", detailEn: "Teammates review the code and suggest changes or approve." },
        { id: "ci", labelJa: "Actions / CI", labelEn: "Actions / CI", detailJa: "GitHub Actionsが自動でテスト・ビルドを実行する。", detailEn: "GitHub Actions runs tests and builds automatically." },
        { id: "merge", labelJa: "マージ", labelEn: "Merge", detailJa: "承認とCI通過後、mainへ統合する。", detailEn: "After approval and passing CI, integrate into main." },
        { id: "deploy", labelJa: "デプロイ", labelEn: "Deploy", detailJa: "mainから本番へ配布し、次のブランチへ回す。", detailEn: "Deploy from main to production, then start the next branch." },
      ],
    },
    {
      kind: "layers", titleJa: "GitHub 機能スタック", titleEn: "GitHub Feature Stack",
      nodes: [
        { id: "copilot", labelJa: "Copilot", labelEn: "Copilot", detailJa: "AIがコード補完・提案・説明で開発を支援する。", detailEn: "AI assists with code completion, suggestions, and explanations." },
        { id: "plan", labelJa: "Projects / Issues", labelEn: "Projects / Issues", detailJa: "課題管理とボードで作業を計画・追跡する。", detailEn: "Plan and track work with issues and project boards." },
        { id: "pr", labelJa: "Pull Requests", labelEn: "Pull Requests", detailJa: "レビューと議論を通じて変更を安全に統合する。", detailEn: "Integrate changes safely through review and discussion." },
        { id: "actions", labelJa: "Actions", labelEn: "Actions", detailJa: "CI/CDワークフローを自動化する。", detailEn: "Automate CI/CD workflows." },
        { id: "security", labelJa: "Advanced Security", labelEn: "Advanced Security", detailJa: "コード・シークレット・依存関係の脆弱性を検出する。", detailEn: "Detect vulnerabilities in code, secrets, and dependencies." },
        { id: "repo", labelJa: "Repositories (Git)", labelEn: "Repositories (Git)", detailJa: "コードとバージョン履歴を管理する土台。", detailEn: "The foundation: managing code and version history." },
      ],
    },
    {
      kind: "matrix", titleJa: "コラボレーション機能の使い分け", titleEn: "Choosing Collaboration Tools",
      axisXJa: ["アイデア・計画", "コード・変更"], axisXEn: ["Ideas & planning", "Code & changes"],
      axisYJa: ["自由な会話", "構造化・追跡"], axisYEn: ["Free-form talk", "Structured & tracked"],
      nodes: [
        { id: "projects", q: 0, labelJa: "Projects", labelEn: "Projects", detailJa: "ロードマップやボードで計画を構造化して管理する。", detailEn: "Manage plans in a structured way with roadmaps and boards." },
        { id: "pr", q: 1, labelJa: "Pull Requests", labelEn: "Pull Requests", detailJa: "コード変更をレビュー・追跡してマージする。", detailEn: "Review, track, and merge code changes." },
        { id: "discussions", q: 2, labelJa: "Discussions", labelEn: "Discussions", detailJa: "Q&Aやアイデアを自由形式で会話する。", detailEn: "Hold free-form Q&A and idea conversations." },
        { id: "issues", q: 3, labelJa: "Issues", labelEn: "Issues", detailJa: "バグやタスクをラベル付きで追跡・議論する。", detailEn: "Track and discuss bugs and tasks with labels." },
      ],
    },
  ],

  // ── Azure Data Fundamentals (DP-900) ──
  dp900: [
    {
      kind: "cycle", titleJa: "データ分析ライフサイクル", titleEn: "Data Analytics Lifecycle",
      centerJa: "データ活用", centerEn: "Data to decisions",
      nodes: [
        { id: "ingest", labelJa: "取り込み", labelEn: "Ingest", detailJa: "バッチ／ストリームで多様なソースからデータを取り込む。", detailEn: "Bring in data from many sources via batch or streaming." },
        { id: "store", labelJa: "保存", labelEn: "Store", detailJa: "Data Lakeに生データを、目的別ストアに整形データを保存。", detailEn: "Store raw data in a data lake and shaped data in purpose-built stores." },
        { id: "transform", labelJa: "変換", labelEn: "Transform", detailJa: "ETL/ELTでクレンジング・結合し分析可能な形にする。", detailEn: "Clean and join via ETL/ELT into an analysis-ready shape." },
        { id: "model", labelJa: "モデル化・提供", labelEn: "Model / Serve", detailJa: "スター スキーマ等でモデル化し、クエリ用に提供する。", detailEn: "Model (e.g. star schema) and serve the data for querying." },
        { id: "visualize", labelJa: "可視化", labelEn: "Visualize", detailJa: "Power BIでダッシュボード化し、洞察を伝える。", detailEn: "Build Power BI dashboards to communicate insight." },
        { id: "decide", labelJa: "意思決定", labelEn: "Decide", detailJa: "洞察を行動につなげ、次の取り込みへ回す。", detailEn: "Turn insight into action and loop back to ingestion." },
      ],
    },
    {
      kind: "layers", titleJa: "最新分析パイプラインの層", titleEn: "Modern Analytics Pipeline Layers",
      nodes: [
        { id: "viz", labelJa: "可視化・BI", labelEn: "Visualization / BI", detailJa: "Power BIで対話的に可視化し意思決定を支える。", detailEn: "Power BI provides interactive visuals to support decisions." },
        { id: "serve", labelJa: "提供・モデル", labelEn: "Serve / Model", detailJa: "Synapse / Fabric のウェアハウスがクエリ用に提供する。", detailEn: "Synapse / Fabric warehouses serve modeled data for queries." },
        { id: "transform", labelJa: "変換", labelEn: "Transform", detailJa: "Data Factory等がETL/ELTで整形する。", detailEn: "Data Factory and others transform via ETL/ELT." },
        { id: "store", labelJa: "保存", labelEn: "Store", detailJa: "Data Lake / Blob が低コストで大量データを保持する。", detailEn: "Data Lake / Blob holds large volumes cheaply." },
        { id: "ingest", labelJa: "取り込み", labelEn: "Ingest", detailJa: "バッチ・ストリームでソースからデータを取り込む土台。", detailEn: "The base: ingesting from sources via batch and streaming." },
      ],
    },
    {
      kind: "matrix", titleJa: "データストアの選択", titleEn: "Choosing a Data Store",
      axisXJa: ["非リレーショナル", "リレーショナル"], axisXEn: ["Non-relational", "Relational"],
      axisYJa: ["トランザクション(OLTP)", "分析(OLAP)"], axisYEn: ["Transactional (OLTP)", "Analytical (OLAP)"],
      nodes: [
        { id: "lake", q: 0, labelJa: "Data Lake / Blob", labelEn: "Data Lake / Blob", detailJa: "非構造データを大量に保持し分析基盤に使う。", detailEn: "Holds large volumes of unstructured data for analytics." },
        { id: "synapse", q: 1, labelJa: "Synapse / Fabric", labelEn: "Synapse / Fabric", detailJa: "構造化データの大規模分析（データウェアハウス）向き。", detailEn: "For large-scale analytics on structured data (warehouse)." },
        { id: "cosmos", q: 2, labelJa: "Cosmos DB", labelEn: "Cosmos DB", detailJa: "非リレーショナルの高速トランザクション（NoSQL）向き。", detailEn: "For fast non-relational transactions (NoSQL)." },
        { id: "sql", q: 3, labelJa: "Azure SQL Database", labelEn: "Azure SQL Database", detailJa: "リレーショナルなトランザクション処理（OLTP）向き。", detailEn: "For relational transactional processing (OLTP)." },
      ],
    },
  ],

  // ── AI Agent Strategist 認定 (AICX) ──
  aicx: [
    {
      kind: "cycle", titleJa: "AIエージェントの実行ループ", titleEn: "AI Agent Execution Loop",
      centerJa: "Agent Loop", centerEn: "Agent loop",
      nodes: [
        { id: "perceive", labelJa: "知覚・入力", labelEn: "Perceive", detailJa: "ユーザー要求と現在の状態・文脈を取り込む。", detailEn: "Take in the user request plus current state and context." },
        { id: "plan", labelJa: "計画・推論", labelEn: "Plan", detailJa: "目標を分解し、次に取るべき行動を推論する。", detailEn: "Decompose the goal and reason about the next action." },
        { id: "act", labelJa: "ツール実行", labelEn: "Act (tools)", detailJa: "検索・API・コード実行などのツールを呼び出す。", detailEn: "Call tools such as search, APIs, or code execution." },
        { id: "observe", labelJa: "観察・結果", labelEn: "Observe", detailJa: "ツールの結果や環境の変化を受け取る。", detailEn: "Receive tool results and changes in the environment." },
        { id: "reflect", labelJa: "内省・評価", labelEn: "Reflect", detailJa: "目標達成度を評価し、続行か完了かを判断して次へ。", detailEn: "Evaluate progress toward the goal and decide to continue or finish." },
      ],
    },
    {
      kind: "layers", titleJa: "生成AIソリューションの階層", titleEn: "Generative AI Solution Layers",
      nodes: [
        { id: "gov", labelJa: "ガバナンス・安全性", labelEn: "Governance & Safety", detailJa: "ガードレール・評価・監査で全層を横断して守る。", detailEn: "Guardrails, evaluation, and audit cut across all layers." },
        { id: "app", labelJa: "アプリ・UX", labelEn: "App / UX", detailJa: "ユーザー体験と業務フローへの組み込み。", detailEn: "The user experience and embedding into business workflows." },
        { id: "orch", labelJa: "オーケストレーション", labelEn: "Orchestration", detailJa: "RAG・エージェント・ツール連携で能力を束ねる。", detailEn: "RAG, agents, and tool use bind capabilities together." },
        { id: "model", labelJa: "基盤モデル", labelEn: "Foundation Model", detailJa: "LLM等の基盤モデルが推論の中核を担う。", detailEn: "Foundation models (LLMs) provide the reasoning core." },
        { id: "infra", labelJa: "データ・インフラ", labelEn: "Data & Infrastructure", detailJa: "ベクトルDB・GPU・クラウドが土台を支える。", detailEn: "Vector DBs, GPUs, and cloud form the foundation." },
      ],
    },
    {
      kind: "matrix", titleJa: "AIユースケースの優先順位", titleEn: "Prioritizing AI Use Cases",
      axisXJa: ["実現性 低", "実現性 高"], axisXEn: ["Low feasibility", "High feasibility"],
      axisYJa: ["価値 小", "価値 大"], axisYEn: ["Low value", "High value"],
      nodes: [
        { id: "strategic", q: 0, labelJa: "戦略投資", labelEn: "Strategic bet", detailJa: "価値は大きいが難度も高い。段階的に基盤を固めて挑む。", detailEn: "High value but hard—build foundations and pursue in stages." },
        { id: "quickwin", q: 1, labelJa: "クイックウィン", labelEn: "Quick win", detailJa: "価値が高く実現も容易。最優先で着手する。", detailEn: "High value and easy to build—start here first." },
        { id: "avoid", q: 2, labelJa: "見送り", labelEn: "Avoid", detailJa: "価値が小さく難しい。当面は着手しない。", detailEn: "Low value and hard—leave it for now." },
        { id: "later", q: 3, labelJa: "後回し", labelEn: "Fill-in", detailJa: "容易だが価値は限定的。余力があれば実施する。", detailEn: "Easy but limited value—do it if there's spare capacity." },
      ],
    },
  ],

  // ── AWS Certified Solutions Architect – Associate (SAA-C03) ──
  saa: [
    {
      kind: "cycle", titleJa: "AWSアーキテクチャ設計・レビューサイクル", titleEn: "AWS Architecture Design & Review Cycle",
      centerJa: "Well-Architected", centerEn: "Well-Architected",
      nodes: [
        { id: "reqs", labelJa: "要件定義", labelEn: "Requirements", detailJa: "可用性・性能・コストなど非機能要件とKPIを整理する。", detailEn: "Clarify non-functional requirements (availability, performance, cost) and KPIs." },
        { id: "design", labelJa: "設計", labelEn: "Design", detailJa: "Well-Architectedの6本柱に沿ってサービスを選定し構成を設計する。", detailEn: "Select services and design the architecture against the 6 Well-Architected pillars." },
        { id: "implement", labelJa: "実装", labelEn: "Implement", detailJa: "IaC（CloudFormation/CDK）でリソースを構築する。", detailEn: "Provision resources using IaC (CloudFormation/CDK)." },
        { id: "test", labelJa: "検証", labelEn: "Test", detailJa: "負荷試験やセキュリティ検証で設計要件を満たすか確認する。", detailEn: "Validate the design meets requirements via load and security testing." },
        { id: "operate", labelJa: "運用・監視", labelEn: "Operate & Monitor", detailJa: "CloudWatch等で稼働を監視し障害に対応する。", detailEn: "Monitor operations with CloudWatch and respond to incidents." },
        { id: "optimize", labelJa: "最適化", labelEn: "Optimize", detailJa: "コストと性能を継続的に見直し次の要件定義へフィードバックする。", detailEn: "Continuously review cost and performance, feeding back into requirements." },
      ],
    },
    {
      kind: "layers", titleJa: "典型的なAWS 3層Webアーキテクチャ", titleEn: "Typical AWS 3-Tier Web Architecture",
      nodes: [
        { id: "dns", labelJa: "DNS / Route53", labelEn: "DNS / Route 53", detailJa: "ドメイン名解決とヘルスチェックベースのルーティングを行う。", detailEn: "Resolves domain names and routes based on health checks." },
        { id: "cdn", labelJa: "CloudFront (エッジ)", labelEn: "CloudFront (Edge)", detailJa: "静的コンテンツをエッジにキャッシュし配信を高速化する。", detailEn: "Caches static content at the edge to speed up delivery." },
        { id: "alb", labelJa: "ALB（ロードバランサ）", labelEn: "ALB (Load Balancer)", detailJa: "リクエストを複数AZのターゲットへ分散する。", detailEn: "Distributes requests across targets in multiple AZs." },
        { id: "app", labelJa: "EC2 / Auto Scaling（アプリ層）", labelEn: "EC2 / Auto Scaling (App)", detailJa: "プライベートサブネットでアプリを実行し負荷に応じて自動増減する。", detailEn: "Runs the app in private subnets, scaling automatically with load." },
        { id: "data", labelJa: "RDS Multi-AZ（データ層）", labelEn: "RDS Multi-AZ (Data)", detailJa: "マルチAZ構成のRDSでデータを永続化し高可用性を確保する。", detailEn: "Persists data in Multi-AZ RDS for high availability." },
      ],
    },
    {
      kind: "matrix", titleJa: "ストレージサービスの選び方", titleEn: "Choosing an AWS Storage Service",
      axisXJa: ["低頻度アクセス", "高頻度アクセス"], axisXEn: ["Low access frequency", "High access frequency"],
      axisYJa: ["単一インスタンス専有", "複数から共有アクセス"], axisYEn: ["Single-instance / dedicated", "Shared across multiple clients"],
      nodes: [
        { id: "s3", q: 0, labelJa: "S3", labelEn: "S3", detailJa: "多数のクライアントから共有アクセスできる汎用オブジェクトストレージ。", detailEn: "General-purpose object storage shared by many clients via API." },
        { id: "efs", q: 1, labelJa: "EFS", labelEn: "EFS", detailJa: "複数のEC2から同時マウントできる高頻度アクセス向け共有ファイルストレージ。", detailEn: "Shared file storage multiple EC2 instances can mount for frequent access." },
        { id: "glacier", q: 2, labelJa: "S3 Glacier", labelEn: "S3 Glacier", detailJa: "低頻度・長期保管向けアーカイブストレージ。取り出しに時間がかかる。", detailEn: "Archive storage for infrequent, long-term retention with retrieval delay." },
        { id: "ebs", q: 3, labelJa: "EBS", labelEn: "EBS", detailJa: "単一EC2に専有アタッチする高頻度・低レイテンシのブロックストレージ。", detailEn: "Dedicated, low-latency block storage attached to a single EC2 instance." },
      ],
    },
  ],

  // ── Claude Certified Architect – Foundations (CCA-F) ──
  ccaf: [
    {
      kind: "cycle", titleJa: "エージェントの実行ループ", titleEn: "The Agent Execution Loop",
      centerJa: "エージェントループ", centerEn: "Agent loop",
      nodes: [
        { id: "receive", labelJa: "タスク受信", labelEn: "Receive task", detailJa: "ユーザーからのゴールや指示、必要なコンテキストを受け取る。", detailEn: "Receive the user's goal, instructions, and relevant context." },
        { id: "plan", labelJa: "推論・計画", labelEn: "Reason & plan", detailJa: "ゴール達成に必要なステップとツールを考える。", detailEn: "Reason about the steps and tools needed to reach the goal." },
        { id: "call", labelJa: "ツール呼び出し", labelEn: "Call tool (MCP)", detailJa: "MCP経由で外部ツールやデータソースを呼び出す。", detailEn: "Invoke an external tool or data source via MCP." },
        { id: "observe", labelJa: "結果の観察", labelEn: "Observe result", detailJa: "ツールの実行結果を読み取り状況を更新する。", detailEn: "Read the tool's output and update the working state." },
        { id: "decide", labelJa: "次の行動判断", labelEn: "Decide next step", detailJa: "継続・別ツール呼び出し・完了報告のいずれかを判断する。", detailEn: "Decide whether to continue, call another tool, or report completion." },
      ],
    },
    {
      kind: "layers", titleJa: "Claudeアプリケーションスタック", titleEn: "The Claude Application Stack",
      nodes: [
        { id: "model", labelJa: "モデル（Claude）", labelEn: "Model (Claude)", detailJa: "推論・生成の中核となる基盤モデル。", detailEn: "The foundation model that performs reasoning and generation." },
        { id: "context", labelJa: "プロンプト/コンテキスト設計", labelEn: "Prompt & context engineering", detailJa: "システムプロンプトと関連情報を過不足なくモデルに渡す。", detailEn: "Feed the model well-scoped system prompts and relevant context." },
        { id: "tools", labelJa: "ツール / MCP", labelEn: "Tools / MCP", detailJa: "MCPサーバーを介して外部システムやデータへアクセスする手段を与える。", detailEn: "Give the model access to external systems and data via MCP servers." },
        { id: "orch", labelJa: "オーケストレーション", labelEn: "Orchestration", detailJa: "単一/複数エージェントの実行順序や連携を制御する。", detailEn: "Control execution order and coordination across single or multiple agents." },
        { id: "guard", labelJa: "ガードレール・評価", labelEn: "Guardrails & evals", detailJa: "安全性と品質を評価・監視し逸脱を防ぐ。", detailEn: "Evaluate and monitor for safety and quality to catch deviations." },
      ],
    },
    {
      kind: "matrix", titleJa: "ツールを持たせるべきかの判断", titleEn: "When to Build a Tool for an Agent",
      axisXJa: ["一度きりのタスク", "繰り返し発生するタスク"], axisXEn: ["One-off task", "Recurring task"],
      axisYJa: ["モデルの知識で十分", "外部データ/操作が必要"], axisYEn: ["Model knowledge suffices", "Needs external data/action"],
      nodes: [
        { id: "adhoc", q: 0, labelJa: "その場でツール呼び出し", labelEn: "Ad-hoc tool call", detailJa: "一度きりの外部情報取得はその場限りのツール呼び出しで済ませる。", detailEn: "For a one-off need, just call an existing tool once, no new build." },
        { id: "mcp", q: 1, labelJa: "MCPツールとして構築", labelEn: "Build an MCP tool", detailJa: "頻繁に外部システムへアクセスする処理は常設のMCPツール化する。", detailEn: "Turn frequent external-access needs into a persistent MCP tool." },
        { id: "direct", q: 2, labelJa: "直接応答", labelEn: "Answer directly", detailJa: "モデルの知識だけで一度きり答えられるならツールは不要。", detailEn: "If model knowledge alone answers a one-off question, skip tools." },
        { id: "skill", q: 3, labelJa: "再利用プロンプト/スキル化", labelEn: "Reusable prompt/skill", detailJa: "頻出するが外部アクセス不要な処理はスキルやテンプレートにまとめる。", detailEn: "Package frequent, tool-free tasks as a reusable prompt or skill." },
      ],
    },
  ],

  // ── Designing and Building AI Solutions with Copilot Studio (AB-620) ──
  ab620: [
    {
      kind: "cycle", titleJa: "Copilot Studioエージェント構築サイクル", titleEn: "Copilot Studio Agent Build Cycle",
      centerJa: "エージェント構築", centerEn: "Agent build",
      nodes: [
        { id: "usecase", labelJa: "ユースケース定義", labelEn: "Define use case", detailJa: "解決したい業務課題と対象ユーザーを明確にする。", detailEn: "Clarify the business problem to solve and the target users." },
        { id: "topics", labelJa: "会話設計（トピック）", labelEn: "Design topics", detailJa: "トリガーフレーズと対話フローをトピックとして設計する。", detailEn: "Design trigger phrases and conversation flow as topics." },
        { id: "knowledge", labelJa: "ナレッジ接続", labelEn: "Connect knowledge", detailJa: "SharePointやウェブサイト等をナレッジソースとして接続する。", detailEn: "Connect knowledge sources such as SharePoint or websites." },
        { id: "actions", labelJa: "アクション/コネクタ追加", labelEn: "Add actions", detailJa: "Power Automateやコネクタで業務システムを操作可能にする。", detailEn: "Add Power Automate flows and connectors to act on business systems." },
        { id: "test", labelJa: "テスト", labelEn: "Test", detailJa: "テストチャットで応答とアクションの動作を検証する。", detailEn: "Validate responses and actions in the test chat pane." },
        { id: "publish", labelJa: "公開・監視", labelEn: "Publish & monitor", detailJa: "チャネルへ公開し分析情報から改善点を次のユースケースへ反映する。", detailEn: "Publish to channels and feed analytics insights back into the next iteration." },
      ],
    },
    {
      kind: "layers", titleJa: "Copilot Studio ソリューションスタック", titleEn: "The Copilot Studio Solution Stack",
      nodes: [
        { id: "channels", labelJa: "チャネル", labelEn: "Channels", detailJa: "Teams・Web・Omnichannelなどエンドユーザーとの接点。", detailEn: "Teams, web, and Omnichannel touchpoints with end users." },
        { id: "agent", labelJa: "トピック / 生成的エージェント", labelEn: "Topics / generative agent", detailJa: "定義済みトピックと生成AIによる自律応答を組み合わせる。", detailEn: "Combine defined topics with generative AI-driven responses." },
        { id: "knowledge", labelJa: "ナレッジ / RAG", labelEn: "Knowledge / RAG", detailJa: "接続したナレッジソースを検索し回答の根拠にする。", detailEn: "Search connected knowledge sources to ground answers." },
        { id: "actions", labelJa: "アクション / コネクタ", labelEn: "Actions / connectors", detailJa: "Power Automateやコネクタで業務システムを呼び出す。", detailEn: "Invoke business systems via Power Automate and connectors." },
        { id: "dataverse", labelJa: "Dataverse / データ基盤", labelEn: "Dataverse / data layer", detailJa: "会話ログや業務データを保持する基盤データストア。", detailEn: "The underlying data store holding conversation logs and business data." },
      ],
    },
    {
      kind: "matrix", titleJa: "ナレッジソースの種類", titleEn: "Types of Knowledge Sources",
      axisXJa: ["非構造化データ", "構造化データ"], axisXEn: ["Unstructured data", "Structured data"],
      axisYJa: ["社内ソース", "社外ソース"], axisYEn: ["Internal source", "External source"],
      nodes: [
        { id: "website", q: 0, labelJa: "パブリックウェブサイト", labelEn: "Public website", detailJa: "社外の非構造化なウェブページをクロールしてナレッジ化する。", detailEn: "Crawl external unstructured web pages to build knowledge." },
        { id: "connector", q: 1, labelJa: "外部コネクタ/データ", labelEn: "External connector data", detailJa: "外部システムの構造化データをコネクタ経由で参照する。", detailEn: "Reference structured data in external systems via a connector." },
        { id: "files", q: 2, labelJa: "SharePoint / OneDrive", labelEn: "SharePoint / OneDrive", detailJa: "社内の非構造化ドキュメントをナレッジソースとして接続する。", detailEn: "Connect internal unstructured documents as a knowledge source." },
        { id: "dataverse", q: 3, labelJa: "Dataverseテーブル", labelEn: "Dataverse table", detailJa: "社内の構造化データであるDataverseテーブルを参照する。", detailEn: "Reference internal structured data in Dataverse tables." },
      ],
    },
  ],

  // ── Cloud and AI Security Engineer Associate (SC-500) ──
  sc500: [
    {
      kind: "cycle", titleJa: "セキュリティ運用（SecOps）ライフサイクル", titleEn: "The Security Operations (SecOps) Lifecycle",
      centerJa: "SecOps", centerEn: "SecOps",
      nodes: [
        { id: "detect", labelJa: "検知", labelEn: "Detect", detailJa: "Sentinelやログの相関分析で不審な兆候を検知する。", detailEn: "Detect suspicious signals via Sentinel and log correlation." },
        { id: "investigate", labelJa: "調査", labelEn: "Investigate", detailJa: "アラートの詳細と影響範囲を調査し優先度を判断する。", detailEn: "Investigate alert details and scope to determine priority." },
        { id: "respond", labelJa: "対応", labelEn: "Respond", detailJa: "アカウント無効化や隔離などの対応策を実行する。", detailEn: "Execute containment actions such as disabling accounts or isolating hosts." },
        { id: "recover", labelJa: "復旧", labelEn: "Recover", detailJa: "影響を受けたシステムとサービスを正常状態に復旧する。", detailEn: "Restore affected systems and services to normal operation." },
        { id: "harden", labelJa: "強化・教訓", labelEn: "Harden & learn", detailJa: "原因を分析し検知ルールやポリシーを見直して次の検知精度を高める。", detailEn: "Analyze root cause and refine detection rules and policies." },
      ],
    },
    {
      kind: "layers", titleJa: "Microsoft多層防御の構成", titleEn: "The Microsoft Defense-in-Depth Stack",
      nodes: [
        { id: "identity", labelJa: "ID（Entra ID Protection）", labelEn: "Identity (Entra ID Protection)", detailJa: "サインインリスクを評価し不正アクセスを防ぐ。", detailEn: "Assess sign-in risk to block unauthorized access." },
        { id: "endpoint", labelJa: "エンドポイント（Defender for Endpoint）", labelEn: "Endpoint (Defender for Endpoint)", detailJa: "デバイス上の脅威を検知・対処する。", detailEn: "Detect and respond to threats on devices." },
        { id: "appdata", labelJa: "アプリ・データ（Cloud Apps / Purview）", labelEn: "Apps & data (Cloud Apps / Purview)", detailJa: "SaaS利用の可視化と機密データの分類・保護を行う。", detailEn: "Provide SaaS visibility and classify/protect sensitive data." },
        { id: "cloudinfra", labelJa: "クラウドワークロード（Defender for Cloud）", labelEn: "Cloud workloads (Defender for Cloud)", detailJa: "クラウドリソースの構成ミスや脅威を検知するCSPM/CWPP。", detailEn: "CSPM/CWPP to catch misconfigurations and threats in cloud resources." },
        { id: "siem", labelJa: "統合監視（Microsoft Sentinel）", labelEn: "Unified detection (Microsoft Sentinel)", detailJa: "全レイヤーのログを集約しSIEM/SOARで検知・自動対応する。", detailEn: "Aggregate logs from all layers for SIEM/SOAR detection and automation." },
      ],
    },
    {
      kind: "matrix", titleJa: "インシデントの優先度付け（リスクマトリクス）", titleEn: "Incident Prioritization (Risk Matrix)",
      axisXJa: ["発生可能性: 低", "発生可能性: 高"], axisXEn: ["Low likelihood", "High likelihood"],
      axisYJa: ["影響度: 低", "影響度: 高"], axisYEn: ["Low impact", "High impact"],
      nodes: [
        { id: "rare", q: 0, labelJa: "稀だが重大", labelEn: "Rare but severe", detailJa: "発生頻度は低いが影響が大きいため対応手順を準備しておく。", detailEn: "Low frequency but high impact; keep a response playbook ready." },
        { id: "top", q: 1, labelJa: "頻発かつ重大", labelEn: "Frequent & severe", detailJa: "頻度・影響とも高く最優先で自動対応・エスカレーションする。", detailEn: "High frequency and impact; top priority for automated response." },
        { id: "minor", q: 2, labelJa: "低頻度・軽微", labelEn: "Rare & minor", detailJa: "頻度・影響とも低く通常の監視で十分。", detailEn: "Low frequency and low impact; routine monitoring suffices." },
        { id: "noisy", q: 3, labelJa: "頻発・軽微", labelEn: "Frequent & minor", detailJa: "頻度は高いが影響は小さいため自動トリアージで抑制する。", detailEn: "High frequency but low impact; suppress via automated triage." },
      ],
    },
  ],

  // ── GitHub Agentic AI Developer (GH-600) ──
  gh600: [
    {
      kind: "cycle", titleJa: "エージェント駆動型SDLC", titleEn: "The Agentic SDLC",
      centerJa: "エージェント駆動SDLC", centerEn: "Agentic SDLC",
      nodes: [
        { id: "issue", labelJa: "Issue作成", labelEn: "Create issue", detailJa: "対応すべきタスクや要件をIssueとして記述する。", detailEn: "Describe the task or requirement as a GitHub issue." },
        { id: "assign", labelJa: "エージェントに割当", labelEn: "Assign to agent", detailJa: "Copilot coding agent等にタスクを割り当てる。", detailEn: "Assign the task to the Copilot coding agent or similar." },
        { id: "implement", labelJa: "実装", labelEn: "Implement", detailJa: "エージェントがMCPツールを使いコード変更を行う。", detailEn: "The agent makes code changes using MCP tools." },
        { id: "pr", labelJa: "PR作成", labelEn: "Open PR", detailJa: "変更をまとめたプルリクエストを自動で作成する。", detailEn: "The agent opens a pull request summarizing the changes." },
        { id: "review", labelJa: "レビュー", labelEn: "Review", detailJa: "人間またはCopilotレビューアが変更を確認する。", detailEn: "A human or Copilot reviewer checks the changes." },
        { id: "merge", labelJa: "マージ・デプロイ", labelEn: "Merge & deploy", detailJa: "承認後マージしActionsでデプロイし、次のIssueへ進む。", detailEn: "Merge on approval, deploy via Actions, and move to the next issue." },
      ],
    },
    {
      kind: "layers", titleJa: "GitHubエージェントプラットフォームスタック", titleEn: "The GitHub Agent Platform Stack",
      nodes: [
        { id: "ui", labelJa: "開発者インターフェース（Chat / IDE）", labelEn: "Developer interface (Chat / IDE)", detailJa: "Copilot ChatやIDE統合で開発者がエージェントに指示する。", detailEn: "Developers direct agents via Copilot Chat and IDE integration." },
        { id: "agent", labelJa: "自律コーディングエージェント", labelEn: "Autonomous coding agent", detailJa: "割り当てられたタスクを自律的に計画・実行する。", detailEn: "Autonomously plans and executes assigned tasks." },
        { id: "mcp", labelJa: "MCPサーバー / ツール", labelEn: "MCP servers / tools", detailJa: "エージェントに外部システムへのアクセス手段を与える。", detailEn: "Give the agent access to external systems." },
        { id: "actions", labelJa: "GitHub Actions / CI", labelEn: "GitHub Actions / CI", detailJa: "ビルド・テスト・デプロイを自動実行する。", detailEn: "Automate build, test, and deploy pipelines." },
        { id: "governance", labelJa: "リポジトリガバナンス", labelEn: "Repo governance", detailJa: "ブランチ保護や監査ログでエージェントの行動を統制する。", detailEn: "Govern agent behavior via branch protection and audit logs." },
      ],
    },
    {
      kind: "matrix", titleJa: "エージェントの自律性とタスクリスク", titleEn: "Agent Autonomy vs. Task Risk",
      axisXJa: ["タスクリスク: 低", "タスクリスク: 高"], axisXEn: ["Low task risk", "High task risk"],
      axisYJa: ["自律性: 低", "自律性: 高"], axisYEn: ["Low autonomy", "High autonomy"],
      nodes: [
        { id: "safe", q: 0, labelJa: "低リスクを完全自律実行", labelEn: "Low-risk full autonomy", detailJa: "フォーマット修正など低リスクなタスクは自律的に処理してよい。", detailEn: "Low-risk tasks like formatting fixes can run fully autonomously." },
        { id: "danger", q: 1, labelJa: "危険領域：要ガードレール", labelEn: "Danger zone: needs guardrails", detailJa: "高リスクなのに高自律な組み合わせは必ず承認ゲートを追加する。", detailEn: "High risk plus high autonomy always needs an approval gate." },
        { id: "overcheck", q: 2, labelJa: "過剰な人間介入", labelEn: "Over-supervision", detailJa: "低リスクなのに毎回承認を求めると非効率になる。", detailEn: "Requiring approval for every low-risk change is inefficient." },
        { id: "human", q: 3, labelJa: "人間レビュー必須", labelEn: "Human review required", detailJa: "本番デプロイなど高リスクタスクは必ず人間が最終承認する。", detailEn: "High-risk tasks like production deploys always need human sign-off." },
      ],
    },
  ],

  // ── Agentic AI Business Solutions Architect (AB-100) ──
  ab100: [
    {
      kind: "cycle", titleJa: "アジェンティックAIソリューション導入サイクル", titleEn: "The Agentic AI Solution Delivery Cycle",
      centerJa: "ソリューション導入", centerEn: "Solution delivery",
      nodes: [
        { id: "discover", labelJa: "課題発見", labelEn: "Discover problem", detailJa: "業務上の課題とAI活用の機会を特定する。", detailEn: "Identify business pain points and opportunities for AI." },
        { id: "prioritize", labelJa: "ユースケース優先順位付け", labelEn: "Prioritize use cases", detailJa: "価値と実現可能性でユースケースの優先度を決める。", detailEn: "Rank use cases by business value and feasibility." },
        { id: "design", labelJa: "ソリューション設計", labelEn: "Design solution", detailJa: "Copilot Studio・Foundry・D365を組み合わせて設計する。", detailEn: "Design the solution using Copilot Studio, Foundry, and D365." },
        { id: "build", labelJa: "構築・統合", labelEn: "Build & integrate", detailJa: "エージェントを構築し既存業務システムと統合する。", detailEn: "Build the agent and integrate it with existing business systems." },
        { id: "deploy", labelJa: "展開", labelEn: "Deploy", detailJa: "対象ユーザーへ段階的に展開する。", detailEn: "Roll out to target users in stages." },
        { id: "measure", labelJa: "価値測定・改善", labelEn: "Measure value & iterate", detailJa: "効果を測定し次の課題発見にフィードバックする。", detailEn: "Measure impact and feed insights back into problem discovery." },
      ],
    },
    {
      kind: "layers", titleJa: "ビジネスAIソリューションスタック", titleEn: "The Business AI Solution Stack",
      nodes: [
        { id: "process", labelJa: "業務プロセス / ユーザー体験", labelEn: "Business process / UX", detailJa: "ユーザーが実際に触れる業務プロセスと画面。", detailEn: "The business process and UI the user actually interacts with." },
        { id: "agent", labelJa: "エージェント（Copilot Studio）", labelEn: "Agents (Copilot Studio)", detailJa: "対話的に業務を支援するエージェント層。", detailEn: "The agent layer that assists work conversationally." },
        { id: "foundry", labelJa: "AI基盤（Microsoft Foundry）", labelEn: "AI platform (Microsoft Foundry)", detailJa: "モデルの選定・オーケストレーションを担う基盤。", detailEn: "The platform handling model selection and orchestration." },
        { id: "apps", labelJa: "業務アプリ（Dynamics 365 / Power Platform）", labelEn: "Business apps (Dynamics 365 / Power Platform)", detailJa: "業務ロジックとトランザクションを担うアプリ層。", detailEn: "The app layer carrying business logic and transactions." },
        { id: "data", labelJa: "データ基盤・ガバナンス", labelEn: "Data & governance", detailJa: "Dataverse等のデータとアクセス統制を支える基盤。", detailEn: "The underlying data (e.g. Dataverse) and access governance." },
      ],
    },
    {
      kind: "matrix", titleJa: "ユースケースの優先順位付け", titleEn: "Use Case Prioritization",
      axisXJa: ["実現可能性: 低", "実現可能性: 高"], axisXEn: ["Low feasibility", "High feasibility"],
      axisYJa: ["ビジネス価値: 低", "ビジネス価値: 高"], axisYEn: ["Low business value", "High business value"],
      nodes: [
        { id: "roadmap", q: 0, labelJa: "将来ロードマップ候補", labelEn: "Future roadmap candidate", detailJa: "価値は高いが今は実現困難なため調査・準備を進める。", detailEn: "High value but not yet feasible; research and prepare." },
        { id: "quickwin", q: 1, labelJa: "最優先で着手", labelEn: "Build first", detailJa: "価値・実現性とも高いユースケースから着手する。", detailEn: "Start with use cases high in both value and feasibility." },
        { id: "deprioritize", q: 2, labelJa: "却下・保留", labelEn: "Deprioritize", detailJa: "価値も実現性も低いユースケースは保留する。", detailEn: "Shelve use cases low in both value and feasibility." },
        { id: "fillin", q: 3, labelJa: "低優先の実施可能案件", labelEn: "Low-priority fill-in", detailJa: "実現は容易だが価値が低いため空き時間で対応する。", detailEn: "Easy to build but low value; handle as capacity allows." },
      ],
    },
  ],

  // ── Intelligent Applications Builder Associate (AB-410) ──
  ab410: [
    {
      kind: "cycle", titleJa: "インテリジェントアプリ構築サイクル", titleEn: "The Intelligent App Build Cycle",
      centerJa: "アプリ構築", centerEn: "App build",
      nodes: [
        { id: "reqs", labelJa: "要件定義", labelEn: "Define requirements", detailJa: "解決したい業務課題と必要な機能を整理する。", detailEn: "Clarify the business problem and required functionality." },
        { id: "datamodel", labelJa: "データモデル設計", labelEn: "Design data model", detailJa: "Dataverseでテーブルとリレーションを設計する。", detailEn: "Design tables and relationships in Dataverse." },
        { id: "ui", labelJa: "画面構築", labelEn: "Build UI", detailJa: "Power Appsでユーザー向け画面を構築する。", detailEn: "Build the user-facing screens with Power Apps." },
        { id: "logic", labelJa: "ロジック/AI組み込み", labelEn: "Add logic & AI", detailJa: "AI BuilderやCopilot Studioで知能を組み込む。", detailEn: "Embed intelligence using AI Builder or Copilot Studio." },
        { id: "automation", labelJa: "自動化接続", labelEn: "Connect automation", detailJa: "Power Automateでバックエンド処理を自動化する。", detailEn: "Automate backend processing with Power Automate." },
        { id: "publish", labelJa: "テスト・公開", labelEn: "Test & publish", detailJa: "動作を検証して公開し、フィードバックを次の要件定義に反映する。", detailEn: "Validate, publish, and feed feedback into the next iteration." },
      ],
    },
    {
      kind: "layers", titleJa: "インテリジェントアプリスタック", titleEn: "The Intelligent App Stack",
      nodes: [
        { id: "ui", labelJa: "UI（Power Apps）", labelEn: "UI (Power Apps)", detailJa: "ユーザーが操作する画面とフォーム。", detailEn: "The screens and forms the user interacts with." },
        { id: "agent", labelJa: "エージェント（Copilot Studio）", labelEn: "Agent (Copilot Studio)", detailJa: "対話的なアシスタント機能を提供する層。", detailEn: "Provides conversational assistant functionality." },
        { id: "ai", labelJa: "AIサービス（AI Builder / Foundry）", labelEn: "AI services (AI Builder / Foundry)", detailJa: "予測やドキュメント処理などのAIモデルを提供する。", detailEn: "Provides AI models such as prediction and document processing." },
        { id: "automation", labelJa: "自動化（Power Automate）", labelEn: "Automation (Power Automate)", detailJa: "バックグラウンドの業務フローを実行する。", detailEn: "Executes background business process flows." },
        { id: "data", labelJa: "データ（Dataverse）", labelEn: "Data (Dataverse)", detailJa: "アプリ全体を支えるデータストア。", detailEn: "The data store underpinning the whole app." },
      ],
    },
    {
      kind: "matrix", titleJa: "Power Platformコンポーネントの選び方", titleEn: "Choosing a Power Platform Component",
      axisXJa: ["非対話・バックグラウンド", "対話的"], axisXEn: ["Non-interactive / background", "Interactive"],
      axisYJa: ["定型ロジックで十分", "AI/知能が必要"], axisYEn: ["Deterministic logic suffices", "Needs AI / intelligence"],
      nodes: [
        { id: "aibuilder", q: 0, labelJa: "AI Builder", labelEn: "AI Builder", detailJa: "予測やOCRなどのAIモデルをバックグラウンド処理に組み込む。", detailEn: "Embed AI models like prediction or OCR into background processing." },
        { id: "copilotstudio", q: 1, labelJa: "Copilot Studio", labelEn: "Copilot Studio", detailJa: "会話型エージェントでユーザーと対話しながら知的に応答する。", detailEn: "A conversational agent that responds intelligently in dialogue." },
        { id: "automate", q: 2, labelJa: "Power Automate", labelEn: "Power Automate", detailJa: "定型的なバックグラウンド業務フローを自動化する。", detailEn: "Automates deterministic background business flows." },
        { id: "apps", q: 3, labelJa: "Power Apps", labelEn: "Power Apps", detailJa: "定型ロジックのユーザー向け画面・フォームアプリを構築する。", detailEn: "Builds user-facing form apps with deterministic logic." },
      ],
    },
  ],

  // ── Azure ML Operations Engineer Associate (AI-300) ──
  ai300: [
    {
      kind: "cycle", titleJa: "MLOps / GenAIOps ライフサイクル", titleEn: "The MLOps / GenAIOps Lifecycle",
      centerJa: "MLOps", centerEn: "MLOps",
      nodes: [
        { id: "prepare", labelJa: "データ準備", labelEn: "Prepare data", detailJa: "学習に使うデータを収集・前処理する。", detailEn: "Collect and preprocess data for training." },
        { id: "train", labelJa: "学習", labelEn: "Train", detailJa: "Azure MLでモデルを学習・チューニングする。", detailEn: "Train and tune the model using Azure ML." },
        { id: "register", labelJa: "登録", labelEn: "Register", detailJa: "学習済みモデルをモデルレジストリに登録し版管理する。", detailEn: "Register the trained model in the model registry for versioning." },
        { id: "deploy", labelJa: "デプロイ", labelEn: "Deploy", detailJa: "オンライン/バッチエンドポイントとしてデプロイする。", detailEn: "Deploy as an online or batch endpoint." },
        { id: "monitor", labelJa: "監視", labelEn: "Monitor", detailJa: "精度低下やデータドリフトを監視する。", detailEn: "Monitor for performance degradation and data drift." },
        { id: "retrain", labelJa: "再学習", labelEn: "Retrain", detailJa: "ドリフト検知時に新データで再学習しデータ準備へ戻る。", detailEn: "Retrain on new data when drift is detected, looping back." },
      ],
    },
    {
      kind: "layers", titleJa: "MLOpsプラットフォームスタック", titleEn: "The MLOps Platform Stack",
      nodes: [
        { id: "experiment", labelJa: "実験・開発（ノートブック）", labelEn: "Experimentation (notebooks)", detailJa: "Azure MLのノートブックでモデルを試行錯誤する。", detailEn: "Iterate on models in Azure ML notebooks." },
        { id: "pipeline", labelJa: "パイプライン / CI-CD", labelEn: "Pipelines / CI-CD", detailJa: "学習・評価・デプロイを自動化するパイプライン。", detailEn: "Pipelines automating training, evaluation, and deployment." },
        { id: "registry", labelJa: "モデルレジストリ", labelEn: "Model registry", detailJa: "モデルのバージョンと系統を管理する。", detailEn: "Track model versions and lineage." },
        { id: "endpoint", labelJa: "エンドポイント（オンライン/バッチ）", labelEn: "Endpoints (online/batch)", detailJa: "推論を提供するマネージドエンドポイント。", detailEn: "Managed endpoints that serve inference." },
        { id: "governance", labelJa: "監視・責任あるAIガバナンス", labelEn: "Monitoring & responsible AI", detailJa: "モデル品質と責任あるAI原則を継続監視する。", detailEn: "Continuously monitor model quality and responsible AI compliance." },
      ],
    },
    {
      kind: "matrix", titleJa: "モデルのデプロイ先の選び方", titleEn: "Choosing a Model Deployment Target",
      axisXJa: ["レイテンシ許容（バッチ）", "即時応答が必要"], axisXEn: ["Latency-tolerant (batch)", "Real-time required"],
      axisYJa: ["クラウド中央", "エッジ / 現地"], axisYEn: ["Central cloud", "Edge / on-site"],
      nodes: [
        { id: "edgebatch", q: 0, labelJa: "エッジ・バッチ推論", labelEn: "Edge batch inference", detailJa: "現地機器で定期的にまとめて推論を実行する。", detailEn: "Run inference in scheduled batches on local edge devices." },
        { id: "edgerealtime", q: 1, labelJa: "エッジ・リアルタイム推論", labelEn: "Edge real-time inference", detailJa: "IoT Edgeモジュールで現地で即時に推論する。", detailEn: "Run immediate inference on-site via an IoT Edge module." },
        { id: "batchendpoint", q: 2, labelJa: "バッチエンドポイント", labelEn: "Batch endpoint", detailJa: "クラウドで大量データを定期的に一括推論する。", detailEn: "Run large-scale scheduled batch inference in the cloud." },
        { id: "onlineendpoint", q: 3, labelJa: "オンラインエンドポイント", labelEn: "Online endpoint", detailJa: "クラウドのマネージドAPIでリアルタイムに推論する。", detailEn: "Serve real-time inference via a managed cloud API." },
      ],
    },
  ],

  // ── Azure AI Apps and Agents Developer Associate (AI-103) ──
  ai103: [
    {
      kind: "cycle", titleJa: "RAGリクエストパイプライン", titleEn: "The RAG Request Pipeline",
      centerJa: "RAGパイプライン", centerEn: "RAG pipeline",
      nodes: [
        { id: "query", labelJa: "クエリ受信", labelEn: "Receive query", detailJa: "ユーザーからの質問を受け取る。", detailEn: "Receive the user's question." },
        { id: "embed", labelJa: "クエリ埋め込み", labelEn: "Embed query", detailJa: "クエリをベクトルに変換する。", detailEn: "Convert the query into an embedding vector." },
        { id: "retrieve", labelJa: "検索", labelEn: "Retrieve", detailJa: "Azure AI Searchから関連ドキュメントを取得する。", detailEn: "Retrieve relevant documents from Azure AI Search." },
        { id: "augment", labelJa: "コンテキスト拡張", labelEn: "Augment context", detailJa: "取得結果をプロンプトに組み込む。", detailEn: "Inject retrieved content into the prompt." },
        { id: "generate", labelJa: "生成", labelEn: "Generate", detailJa: "Azure OpenAIが根拠に基づいた回答を生成する。", detailEn: "Azure OpenAI generates a grounded answer." },
        { id: "evaluate", labelJa: "応答返却・評価", labelEn: "Return & evaluate", detailJa: "回答を返却し品質を評価して次のクエリ改善に活かす。", detailEn: "Return the answer, evaluate quality, and inform future queries." },
      ],
    },
    {
      kind: "layers", titleJa: "Foundry AIアプリスタック", titleEn: "The Foundry AI App Stack",
      nodes: [
        { id: "ui", labelJa: "クライアント / エージェントUI", labelEn: "Client / agent UI", detailJa: "ユーザーが対話するアプリやチャット画面。", detailEn: "The app or chat surface the user interacts with." },
        { id: "orchestration", labelJa: "オーケストレーション（Foundry Agent Service）", labelEn: "Orchestration (Foundry Agent Service)", detailJa: "エージェントの実行順序とツール呼び出しを制御する。", detailEn: "Controls agent execution order and tool invocation." },
        { id: "model", labelJa: "モデル（Azure OpenAI）", labelEn: "Model (Azure OpenAI)", detailJa: "生成・推論を担う基盤モデル。", detailEn: "The foundation model performing generation and reasoning." },
        { id: "search", labelJa: "検索・知識（Azure AI Search）", labelEn: "Search / knowledge (Azure AI Search)", detailJa: "回答の根拠となる情報を検索するグラウンディング層。", detailEn: "Grounding layer that retrieves information for answers." },
        { id: "data", labelJa: "データソース", labelEn: "Data sources", detailJa: "検索対象となる文書やコンテンツの元データ。", detailEn: "The underlying documents and content that get indexed." },
      ],
    },
    {
      kind: "matrix", titleJa: "Azure AIサービスの選び方", titleEn: "Choosing an Azure AI Service",
      axisXJa: ["テキスト", "画像 / マルチモーダル"], axisXEn: ["Text", "Image / multimodal"],
      axisYJa: ["分析・検索", "生成"], axisYEn: ["Analysis / retrieval", "Generation"],
      nodes: [
        { id: "openai", q: 0, labelJa: "Azure OpenAI（テキスト生成）", labelEn: "Azure OpenAI (text generation)", detailJa: "対話・要約などオープンエンドなテキスト生成を行う。", detailEn: "Performs open-ended text generation, chat, and summarization." },
        { id: "imagegen", q: 1, labelJa: "Azure OpenAI（画像生成）", labelEn: "Azure OpenAI (image generation)", detailJa: "DALL-E等でテキストから画像を生成する。", detailEn: "Generates images from text prompts via DALL-E and similar models." },
        { id: "search", q: 2, labelJa: "Azure AI Search", labelEn: "Azure AI Search", detailJa: "テキストコーパスをベクトル/キーワード検索しRAGの根拠を得る。", detailEn: "Vector/keyword search over text corpora to ground RAG answers." },
        { id: "vision", q: 3, labelJa: "Azure AI Vision", labelEn: "Azure AI Vision", detailJa: "OCRや物体検出など画像の定型分析を行う。", detailEn: "Performs deterministic image analysis such as OCR and object detection." },
      ],
    },
  ],

  // ── Azure AI Cloud Developer Associate (AI-200) ──
  ai200: [
    {
      kind: "cycle", titleJa: "クラウドネイティブAIアプリのデプロイループ", titleEn: "The Cloud-Native AI App Deploy Loop",
      centerJa: "デプロイループ", centerEn: "Deploy loop",
      nodes: [
        { id: "develop", labelJa: "コード実装", labelEn: "Develop code", detailJa: "アプリとAI呼び出しロジックを実装する。", detailEn: "Implement the app and its AI call logic." },
        { id: "container", labelJa: "コンテナ化", labelEn: "Containerize", detailJa: "Dockerでアプリをコンテナイメージ化する。", detailEn: "Package the app as a Docker container image." },
        { id: "cicd", labelJa: "CI/CDビルド", labelEn: "Build & CI/CD", detailJa: "パイプラインでビルド・テストを自動実行する。", detailEn: "Automate build and test through a CI/CD pipeline." },
        { id: "deploy", labelJa: "AKS/Container Appsへデプロイ", labelEn: "Deploy to AKS/Container Apps", detailJa: "コンテナをオーケストレーション基盤にデプロイする。", detailEn: "Deploy the container to an orchestration platform." },
        { id: "process", labelJa: "メッセージング/データ連携", labelEn: "Process via messaging & data", detailJa: "メッセージングとデータサービス経由でリクエストを処理する。", detailEn: "Process requests through messaging and data services." },
        { id: "monitor", labelJa: "監視・スケール", labelEn: "Monitor & scale", detailJa: "稼働状況を監視し自動スケールしながら次の実装へ反映する。", detailEn: "Monitor and auto-scale, feeding insights back into development." },
      ],
    },
    {
      kind: "layers", titleJa: "Azureクラウドアプリスタック", titleEn: "The Azure Cloud App Stack",
      nodes: [
        { id: "client", labelJa: "クライアント", labelEn: "Client apps", detailJa: "ユーザーが操作するWeb/モバイルアプリ。", detailEn: "The web/mobile apps users interact with." },
        { id: "api", labelJa: "API / コンテナオーケストレーション", labelEn: "API / container orchestration", detailJa: "AKSやContainer Apps、API Managementでリクエストを受ける。", detailEn: "Receives requests via AKS, Container Apps, or API Management." },
        { id: "messaging", labelJa: "メッセージング", labelEn: "Messaging", detailJa: "Service BusやEvent Hubsでサービス間を疎結合に連携する。", detailEn: "Decouple services via Service Bus or Event Hubs." },
        { id: "data", labelJa: "データ", labelEn: "Data", detailJa: "Cosmos DBやSQLでアプリの状態を永続化する。", detailEn: "Persist application state in Cosmos DB or SQL." },
        { id: "ai", labelJa: "AIサービス", labelEn: "AI services", detailJa: "Azure OpenAI等の生成AI・認識サービスを呼び出す。", detailEn: "Call generative AI and cognitive services like Azure OpenAI." },
      ],
    },
    {
      kind: "matrix", titleJa: "Azureメッセージングサービスの選び方", titleEn: "Choosing an Azure Messaging Service",
      axisXJa: ["スループット: 低", "スループット: 高"], axisXEn: ["Low throughput", "High throughput"],
      axisYJa: ["キュー（P2P）", "パブサブ/イベント"], axisYEn: ["Queue (point-to-point)", "Pub/sub / events"],
      nodes: [
        { id: "eventgrid", q: 0, labelJa: "Event Grid", labelEn: "Event Grid", detailJa: "低頻度・離散的なイベントをパブサブで配信する。", detailEn: "Delivers low-volume, discrete events via pub/sub." },
        { id: "eventhubs", q: 1, labelJa: "Event Hubs", labelEn: "Event Hubs", detailJa: "大量のテレメトリ/ストリーミングイベントをパブサブで取り込む。", detailEn: "Ingests high-volume streaming/telemetry events via pub/sub." },
        { id: "queuestorage", q: 2, labelJa: "Queue Storage", labelEn: "Queue Storage", detailJa: "シンプルで低コストなポイントツーポイントのキュー。", detailEn: "Simple, low-cost point-to-point queuing." },
        { id: "servicebus", q: 3, labelJa: "Service Bus", labelEn: "Service Bus", detailJa: "高信頼・高スループットなエンタープライズ向けキュー/トピック。", detailEn: "High-reliability, high-throughput enterprise queues/topics." },
      ],
    },
  ],

  // ── GitHub Copilot (GH-300) ──
  gh300: [
    {
      kind: "cycle", titleJa: "Copilotプロンプト改善ループ", titleEn: "The Copilot Prompt-Refine Loop",
      centerJa: "プロンプト改善", centerEn: "Prompt refinement",
      nodes: [
        { id: "context", labelJa: "コンテキスト提供", labelEn: "Provide context", detailJa: "開いているファイルやコメントで文脈を与える。", detailEn: "Give Copilot context via open files and comments." },
        { id: "prompt", labelJa: "プロンプト作成", labelEn: "Write prompt", detailJa: "具体的な指示や質問を記述する。", detailEn: "Write a specific instruction or question." },
        { id: "suggest", labelJa: "提案生成", labelEn: "Generate suggestion", detailJa: "Copilotがコードや回答の提案を生成する。", detailEn: "Copilot generates a code or answer suggestion." },
        { id: "review", labelJa: "レビュー", labelEn: "Review", detailJa: "提案内容が正しく安全かを確認する。", detailEn: "Check the suggestion for correctness and safety." },
        { id: "refine", labelJa: "受け入れ/修正", labelEn: "Accept or refine", detailJa: "採用するか、プロンプトを修正して再生成する。", detailEn: "Accept it or refine the prompt and regenerate." },
        { id: "feedback", labelJa: "フィードバック学習", labelEn: "Feedback improves next", detailJa: "採否の結果が次の提案の精度向上に活かされる。", detailEn: "Acceptance feedback improves the quality of future suggestions." },
      ],
    },
    {
      kind: "layers", titleJa: "Copilot機能サーフェスの階層", titleEn: "The Copilot Feature Surface Stack",
      nodes: [
        { id: "completions", labelJa: "コード補完", labelEn: "Code completions", detailJa: "IDE内でタイプ中にコードを自動補完する。", detailEn: "Auto-completes code as you type in the IDE." },
        { id: "chat", labelJa: "Copilot Chat", labelEn: "Copilot Chat", detailJa: "対話形式でコードの説明・修正・生成を行う。", detailEn: "Explains, fixes, and generates code through conversation." },
        { id: "cli", labelJa: "Copilot CLI", labelEn: "Copilot CLI", detailJa: "ターミナルから Copilot に質問・コード作成・GitHub.com の操作を依頼する。", detailEn: "Ask Copilot questions, write code and work with GitHub.com from the terminal." },
        { id: "pr", labelJa: "PR要約 / レビュー", labelEn: "PR summaries / reviews", detailJa: "プルリクエストの差分を自動要約・レビューする。", detailEn: "Automatically summarizes and reviews pull request diffs." },
        { id: "enterprise", labelJa: "エンタープライズ管理", labelEn: "Enterprise management", detailJa: "Copilot のポリシーやライセンス（シート）の割り当てを組織・エンタープライズ全体で管理する。", detailEn: "Manage Copilot policies and license (seat) assignment across the organization or enterprise." },
      ],
    },
    {
      kind: "matrix", titleJa: "タスクに応じたCopilotサーフェスの選び方", titleEn: "Choosing a Copilot Surface by Task",
      axisXJa: ["単一行/関数", "プロジェクト全体"], axisXEn: ["Single line/function", "Whole project"],
      axisYJa: ["非対話（自動）", "対話的"], axisYEn: ["Non-interactive (automatic)", "Interactive"],
      nodes: [
        { id: "chatinline", q: 0, labelJa: "Copilot Chat（インライン）", labelEn: "Copilot Chat (inline)", detailJa: "特定の関数について対話しながら修正を指示する。", detailEn: "Direct fixes to a specific function through conversation." },
        { id: "chatworkspace", q: 1, labelJa: "Copilot Chat（ワークスペース）/ Coding Agent", labelEn: "Copilot Chat (workspace) / Coding Agent", detailJa: "リポジトリ全体を対象に対話的にタスクを依頼する。", detailEn: "Assign repo-wide tasks conversationally to Copilot or the coding agent." },
        { id: "completions", q: 2, labelJa: "コード補完", labelEn: "Code completions", detailJa: "タイプ中の1行や関数を自動補完する。", detailEn: "Auto-completes the line or function you're typing." },
        { id: "prreview", q: 3, labelJa: "PRレビュー自動化", labelEn: "Automated PR review", detailJa: "PR全体の差分を自動でレビュー・要約する。", detailEn: "Automatically reviews and summarizes an entire PR's diff." },
      ],
    },
  ],

  // ── Google Cloud Associate Data Practitioner (ADP) ──
  adp: [
    {
      kind: "cycle", titleJa: "GCPデータ分析ライフサイクル", titleEn: "The GCP Data Analytics Lifecycle",
      centerJa: "データ分析", centerEn: "Data analytics",
      nodes: [
        { id: "ingest", labelJa: "取り込み", labelEn: "Ingest", detailJa: "Pub/Subなどでデータをリアルタイムに取り込む。", detailEn: "Ingest data in real time via Pub/Sub and similar services." },
        { id: "store", labelJa: "保存", labelEn: "Store", detailJa: "Cloud StorageやBigQueryにデータを保存する。", detailEn: "Store data in Cloud Storage or BigQuery." },
        { id: "transform", labelJa: "変換", labelEn: "Transform", detailJa: "DataflowやDataprocでデータを整形・加工する。", detailEn: "Clean and transform data with Dataflow or Dataproc." },
        { id: "analyze", labelJa: "分析", labelEn: "Analyze", detailJa: "BigQueryでSQLを使い分析する。", detailEn: "Analyze data with SQL in BigQuery." },
        { id: "visualize", labelJa: "可視化", labelEn: "Visualize", detailJa: "Lookerでダッシュボードとして可視化する。", detailEn: "Visualize results as dashboards in Looker." },
        { id: "govern", labelJa: "運用管理・ガバナンス", labelEn: "Govern & monitor", detailJa: "品質とアクセスを管理し次の取り込み設計へ反映する。", detailEn: "Manage quality and access, feeding back into ingestion design." },
      ],
    },
    {
      kind: "layers", titleJa: "GCPデータスタック", titleEn: "The GCP Data Stack",
      nodes: [
        { id: "ingest", labelJa: "取り込み（Pub/Sub）", labelEn: "Ingest (Pub/Sub)", detailJa: "イベントデータをリアルタイムに受け取る。", detailEn: "Receives event data in real time." },
        { id: "store", labelJa: "保存（Cloud Storage / BigQuery）", labelEn: "Store (Cloud Storage / BigQuery)", detailJa: "生データや構造化データを保存する。", detailEn: "Stores raw or structured data." },
        { id: "transform", labelJa: "変換（Dataflow / Dataproc）", labelEn: "Transform (Dataflow / Dataproc)", detailJa: "データをクレンジング・変換する。", detailEn: "Cleans and transforms the data." },
        { id: "analyze", labelJa: "分析（BigQuery）", labelEn: "Analyze (BigQuery)", detailJa: "サーバーレスDWHで大規模データを分析する。", detailEn: "Analyzes large-scale data in a serverless DWH." },
        { id: "visualize", labelJa: "可視化（Looker / Looker Studio）", labelEn: "Visualize (Looker / Looker Studio)", detailJa: "分析結果をレポートやダッシュボードで共有する。", detailEn: "Shares analysis results via reports and dashboards." },
      ],
    },
    {
      kind: "matrix", titleJa: "データストア/処理方式の選び方", titleEn: "Choosing a Data Store / Processing Approach",
      axisXJa: ["構造化データ", "非構造化データ"], axisXEn: ["Structured data", "Unstructured data"],
      axisYJa: ["バッチ", "ストリーミング"], axisYEn: ["Batch", "Streaming"],
      nodes: [
        { id: "bqstream", q: 0, labelJa: "BigQuery（ストリーミング取り込み）", labelEn: "BigQuery (streaming insert)", detailJa: "構造化データをリアルタイムに取り込み即時分析する。", detailEn: "Stream structured data in for near-real-time analysis." },
        { id: "pubsubdataflow", q: 1, labelJa: "Pub/Sub + Dataflow", labelEn: "Pub/Sub + Dataflow", detailJa: "非構造化/半構造化イベントをリアルタイムに処理する。", detailEn: "Process unstructured/semi-structured events in real time." },
        { id: "bqbatch", q: 2, labelJa: "BigQuery（バッチクエリ）", labelEn: "BigQuery (batch query)", detailJa: "構造化データを定期バッチでSQL分析する。", detailEn: "Run scheduled batch SQL analysis on structured data." },
        { id: "gcsdataproc", q: 3, labelJa: "Cloud Storage + Dataproc", labelEn: "Cloud Storage + Dataproc", detailJa: "非構造化データをHadoop/Sparkでバッチ処理する。", detailEn: "Batch-process unstructured files with Hadoop/Spark." },
      ],
    },
  ],
};

// 資格詳細ページの末尾に差し込む概念図パネル（既定は折りたたみ／ボタンで開閉・独自の言語トグルつき）。
function ConceptFigures({ id }) {
  const figs = CONCEPT_FIGS[id];
  const [lang, setLang] = useState(() => (typeof window !== "undefined" && (window.__novaCertLang || window.__novaLang)) || "ja"); // ページの言語で開く
  const [open, setOpen] = useState(false);
  if (!figs || !figs.length) return null;
  const en = lang === "en";
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px 44px" }}>
      <div style={{ margin: "8px 0 0", paddingTop: 22, borderTop: "1px solid #e5e5e5" }}>
        <button onClick={() => setOpen((o) => !o)}
          style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: open ? "#f6f8ff" : "#ffffff", border: `1px solid ${open ? "#c7d2fe" : "#e0e7ff"}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", flexWrap: "wrap" }}>
          <span style={{ fontSize: 19 }}>🗺️</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a" }}>{en ? "Concept Maps" : "概念図で俯瞰する"}</span>
          <span style={{ fontSize: 11.5, color: "#5b6470", fontWeight: 700, background: "#eef2ff", border: "1px solid #e0e7ff", borderRadius: 999, padding: "2px 10px" }}>{en ? "Cycle · Layers · Matrix" : "サイクル・レイヤー・マトリクス"}</span>
          <span style={{ fontSize: 11, color: "#8a94a6", fontWeight: 600 }}>{figs.length}{en ? " diagrams" : "枚"}</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#4b5563" }}>{open ? (en ? "Close ▲" : "閉じる ▲") : (en ? "Open ▼" : "開く ▼")}</span>
        </button>
      </div>
      {open ? (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 12.5, color: "#666", lineHeight: 1.75, flex: 1, minWidth: 200 }}>{en ? "Big-picture diagrams for this certification. Hover to highlight, click a box for details, and press ▶ to step through." : "この資格の要点を俯瞰する図です。ホバーで強調、ボックスをクリックで詳細、▶ でステップ再生できます。"}</div>
            <button onClick={() => setLang(en ? "ja" : "en")} style={{ border: "1px solid #d5d9e0", background: "#fff", color: "#555", borderRadius: 8, padding: "6px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>{en ? "日本語" : "EN"}</button>
          </div>
          <FlowSection flows={figs} lang={lang} doneKey={"concept:" + id} />
        </div>
      ) : null}
    </div>
  );
}
// ====== インタラクティブ比較表（ソート・フィルタ・ハイライト・行ピン留め） ======
// 数値を含むセルは数値として比較、それ以外はロケール文字列比較。
function cmpCellNum(s) { const m = String(s == null ? "" : s).replace(/[,\s%¥$]/g, "").match(/-?\d+\.?\d*/); return m ? parseFloat(m[0]) : null; }
function CmpOne({ c, C, en }) {
  C = Object.assign({ light: "#eef3f8", mid: "#cbd5e1", deep: "#1e293b", ink: "#334155" }, C || {});
  const cols = en ? c.colsEn : c.cols;
  const rows = en ? c.rowsEn : c.rows;
  const [sortBy, setSortBy] = useState(null); // 0=項目列 / 1..=データ列
  const [dir, setDir] = useState(1);
  const [hovCol, setHovCol] = useState(null);
  const [hovRow, setHovRow] = useState(null);
  const [pin, setPin] = useState(null);
  const clickSort = (idx) => {
    if (sortBy === idx) { if (dir === 1) setDir(-1); else { setSortBy(null); setDir(1); } }
    else { setSortBy(idx); setDir(1); }
  };
  const arrow = (idx) => (sortBy === idx ? (dir === 1 ? " ▲" : " ▼") : "");
  const order = rows.map((_, i) => i);
  if (sortBy != null) {
    order.sort((a, b) => {
      const va = String(rows[a][sortBy] == null ? "" : rows[a][sortBy]);
      const vb = String(rows[b][sortBy] == null ? "" : rows[b][sortBy]);
      const na = cmpCellNum(va), nb = cmpCellNum(vb);
      const cmp = (na != null && nb != null) ? (na - nb) : va.localeCompare(vb, en ? "en" : "ja");
      return cmp * dir;
    });
  }
  const hl = C.light || "#eef3f8";
  const pinBg = (C.mid || "#dbe6f0");
  const thBase = { padding: "8px 10px", borderBottom: `2px solid ${C.mid}`, color: C.deep, fontWeight: 700, cursor: "pointer", userSelect: "none", textAlign: "left", whiteSpace: "nowrap", transition: "background .15s" };
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.mid}`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.deep }}>{en ? c.titleEn : c.title}</div>
        <span style={{ fontSize: 10.5, color: "#64748b" }}>{en ? "click a header to sort ・ hover to highlight ・ click a row to pin" : "見出しクリックで並替 ・ ホバーで強調 ・ 行クリックで固定"}</span>
        {(sortBy != null || pin != null) ? <button onClick={() => { setSortBy(null); setDir(1); setPin(null); }} style={{ fontSize: 10, border: `1px solid ${C.mid}`, background: "#fff", color: C.deep, borderRadius: 6, padding: "2px 7px", cursor: "pointer" }}>{en ? "reset" : "解除"}</button> : null}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, minWidth: cols.length > 2 ? 460 : 0 }}>
          <thead>
            <tr style={{ background: C.light }}>
              <th onClick={() => clickSort(0)} onMouseEnter={() => setHovCol(0)} onMouseLeave={() => setHovCol(null)}
                style={{ ...thBase, background: hovCol === 0 ? pinBg : "transparent" }}>{en ? (c.axisEn || c.axisJa || "Item") : (c.axisJa || "項目")}{arrow(0)}</th>
              {cols.map((col, i) => (
                <th key={i} onClick={() => clickSort(i + 1)} onMouseEnter={() => setHovCol(i + 1)} onMouseLeave={() => setHovCol(null)}
                  style={{ ...thBase, background: hovCol === i + 1 ? pinBg : "transparent" }}>{col}{arrow(i + 1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.map((ri) => {
              const row = rows[ri];
              const rowHi = hovRow === ri || pin === ri;
              const pinned = pin === ri;
              return (
                <tr key={ri} onMouseEnter={() => setHovRow(ri)} onMouseLeave={() => setHovRow(null)}
                  onClick={() => setPin((p) => (p === ri ? null : ri))}
                  style={{ background: pinned ? pinBg : rowHi ? hl : (order.indexOf(ri) % 2 ? "#fbfcfe" : "#fff"), cursor: "pointer", transition: "background .12s" }}>
                  <td style={{ padding: "8px 10px", borderBottom: `1px solid ${C.light}`, fontWeight: 700, color: C.ink, whiteSpace: "nowrap", background: (hovCol === 0 && !rowHi) ? hl : "transparent" }}>{row[0]}</td>
                  {row.slice(1).map((cell, i) => (
                    <td key={i} style={{ padding: "8px 10px", borderBottom: `1px solid ${C.light}`, color: "#33485e", lineHeight: 1.5, fontWeight: pinned ? 600 : 400, background: (hovCol === i + 1 && !rowHi) ? hl : "transparent" }}>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function CmpTable({ compare, C, lang, t }) {
  const en = lang === "en";
  const [q, setQ] = useState("");
  const list = (compare || []).filter((c) => {
    if (!q) return true;
    const hay = [c.title, c.titleEn, ...(c.cols || []), ...(c.colsEn || []), ...(c.rows || []).flat(), ...(c.rowsEn || []).flat()].join("").toLowerCase();
    return hay.includes(q.toLowerCase());
  });
  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} aria-label={t.compareSearch} placeholder={t.compareSearch}
        style={{ width: "100%", padding: 11, borderRadius: 9, border: `1.5px solid ${C.mid}`, fontSize: 14, marginBottom: 14, boxSizing: "border-box" }} />
      {list.map((c, ci) => <CmpOne key={ci} c={c} C={C} en={en} />)}
      {list.length === 0 && <div style={{ textAlign: "center", color: "#8499ad", padding: 20 }}>{t.noMatch}</div>}
    </div>
  );
}
// 共有の用語集ビュー（資格ハブ14+で重複していた Glossary を統合）。
// 検索・分野フィルタに加えて A–Z 並び替えと件数表示を付与。旧実装の setOpen 参照バグも解消。
function GlossaryView({ GLOSSARY, GLOSSARY_CATS, DOM_HUE, C, lang, t }) {
  const en = lang === "en";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("すべて");
  const [sortAz, setSortAz] = useState(false);
  let list = (GLOSSARY || []).filter((g) => {
    if (cat !== "すべて" && g[0] !== cat) return false;
    if (!q) return true;
    return (g[1] + g[2] + g[3] + (g[4] || "")).toLowerCase().includes(q.toLowerCase());
  });
  if (sortAz) list = list.slice().sort((a, b) => String(a[1]).localeCompare(String(b[1]), en ? "en" : "ja"));
  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} aria-label={t.glossarySearch} placeholder={t.glossarySearch}
        style={{ width: "100%", padding: 11, borderRadius: 9, border: `1.5px solid ${C.mid}`, fontSize: 14, marginBottom: 10, boxSizing: "border-box" }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
        {(GLOSSARY_CATS || []).map((k) => (
          <button key={k} onClick={() => setCat(k)}
            style={{ padding: "5px 11px", borderRadius: 16, fontSize: 12, cursor: "pointer", border: `1px solid ${cat === k ? C.primary : C.mid}`, background: cat === k ? C.primary : "#fff", color: cat === k ? nvInk(C.deep, C.primary) : C.ink, fontWeight: 600 }}>
            {k === "すべて" ? t.allFields : k}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <button onClick={() => setSortAz((v) => !v)} title="sort" style={{ padding: "5px 11px", borderRadius: 8, fontSize: 11.5, cursor: "pointer", border: `1px solid ${sortAz ? C.primary : C.mid}`, background: sortAz ? C.primary : "#fff", color: sortAz ? C.deep : C.ink, fontWeight: 700 }}>{sortAz ? (en ? "↕ A–Z" : "↕ 名前順") : (en ? "↕ default" : "↕ 既定順")}</button>
        <span style={{ fontSize: 11, color: "#7b6d62" }}>{list.length}{en ? " terms" : " 件"}</span>
      </div>
      {list.map((g, i) => (
        <div key={i} style={{ background: "#fff", border: `1px solid ${C.mid}`, borderRadius: 10, padding: 13, marginBottom: 9 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ background: DOM_HUE[g[0]], color: nvInk("#ffffff", DOM_HUE[g[0]]), borderRadius: 4, padding: "1px 6px", fontSize: 10.5 }}>{g[0]}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: C.deep }}>{g[1]}</span>
            {g[2] !== "-" && <span style={{ fontSize: 11.5, color: "#7b6d62" }}>{g[2]}</span>}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>{en && g[4] ? g[4] : g[3]}</div>
        </div>
      ))}
      {list.length === 0 && <div style={{ textAlign: "center", color: "#7b6d62", padding: 20 }}>{t.noMatch}</div>}
    </div>
  );
}
// 4大クラウド比較（ダークテーマ専用のインタラクティブ表：ソート・ハイライト・行ピン留め）
function Cloud4Compare({ COMPARE, C, clang, t }) {
  const en = clang === "en";
  const axes = en ? COMPARE.axesEn : COMPARE.axes;
  const rows = COMPARE.rows;
  const [sortBy, setSortBy] = useState(null);
  const [dir, setDir] = useState(1);
  const [hovCol, setHovCol] = useState(null);
  const [hovRow, setHovRow] = useState(null);
  const [pin, setPin] = useState(null);
  const cellOf = (r, idx) => (idx === 0 ? r.co : (en ? r.cellsEn : r.cells)[idx - 1]);
  const clickSort = (idx) => { if (sortBy === idx) { if (dir === 1) setDir(-1); else { setSortBy(null); setDir(1); } } else { setSortBy(idx); setDir(1); } };
  const arrow = (idx) => (sortBy === idx ? (dir === 1 ? " ▲" : " ▼") : "");
  const order = rows.map((_, i) => i);
  if (sortBy != null) {
    order.sort((a, b) => {
      const va = String(cellOf(rows[a], sortBy) == null ? "" : cellOf(rows[a], sortBy));
      const vb = String(cellOf(rows[b], sortBy) == null ? "" : cellOf(rows[b], sortBy));
      const na = cmpCellNum(va), nb = cmpCellNum(vb);
      const cmp = (na != null && nb != null) ? (na - nb) : va.localeCompare(vb, en ? "en" : "ja");
      return cmp * dir;
    });
  }
  const hoverBg = C.surface2 || "rgba(255,255,255,.06)";
  const th = (i, label) => (
    <th onClick={() => clickSort(i)} onMouseEnter={() => setHovCol(i)} onMouseLeave={() => setHovCol(null)}
      style={{ textAlign: "left", padding: "8px 10px", color: C.gold, borderBottom: `2px solid ${C.wine}`, whiteSpace: "nowrap", cursor: "pointer", userSelect: "none", background: hovCol === i ? hoverBg : (i === 0 ? C.bg : "transparent"), position: i === 0 ? "sticky" : undefined, left: i === 0 ? 0 : undefined }}>{label}{arrow(i)}</th>
  );
  return (
    <div>
      <div style={{ fontSize: 10.5, color: C.dim || C.muted, marginBottom: 6 }}>
        {en ? "click a header to sort ・ hover to highlight ・ click a row to pin" : "見出しクリックで並替 ・ ホバーで強調 ・ 行クリックで固定"}
        {(sortBy != null || pin != null) ? <button onClick={() => { setSortBy(null); setDir(1); setPin(null); }} style={{ marginLeft: 8, fontSize: 10, border: `1px solid ${C.wine}`, background: "transparent", color: C.gold, borderRadius: 6, padding: "1px 7px", cursor: "pointer" }}>{en ? "reset" : "解除"}</button> : null}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12, minWidth: 640 }}>
          <thead><tr>{th(0, t(clang, "cmp_company"))}{axes.map((ax, i) => th(i + 1, ax))}</tr></thead>
          <tbody>
            {order.map((ri) => {
              const r = rows[ri];
              const rowHi = hovRow === ri || pin === ri;
              const cells = en ? r.cellsEn : r.cells;
              return (
                <tr key={r.co} onMouseEnter={() => setHovRow(ri)} onMouseLeave={() => setHovRow(null)} onClick={() => setPin((p) => (p === ri ? null : ri))}
                  style={{ cursor: "pointer", background: rowHi ? hoverBg : "transparent" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.line}`, position: "sticky", left: 0, background: rowHi ? hoverBg : C.bg }}>{r.co}</td>
                  {cells.map((c, i) => (
                    <td key={i} style={{ padding: "8px 10px", color: c.includes("◎") ? C.teal : C.muted, borderBottom: `1px solid ${C.line}`, fontWeight: c.includes("◎") ? 700 : (pin === ri ? 600 : 400), background: (hovCol === i + 1 && !rowHi) ? hoverBg : "transparent" }}>{c}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function saveStamp(ms) {
  if (!ms) return "";
  try { const d = new Date(ms); const p = (n) => String(n).padStart(2, "0");
    return `${d.getMonth() + 1}/${d.getDate()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  } catch (e) { return ""; }
}

/* ============================================================
 * Project-Nova : 統合戦略ポータル
 * Finance Integrated Hub / MegaTech AI Architect Hub / Consulting Thinking Hub
 * 各ハブは名前空間分離(IIFE)された独立モジュールとして格納。中身は無改変。
 * ============================================================ */

// ============================================================
// 全ハブ共通:「1つ前の操作画面に戻る」ための履歴ユーティリティ。
// - useLocalHistory: 画面を決める [値, セッター] の配列を渡すと、いずれかが
//   変化するたびに直前のタプルを積み、back() で1手ずつ（グループ一括）復元する。
// - useRegisterBack: アクティブな子コンポーネントが自分の back()/canBack を
//   ハブの backRef に登録する。ハブの戻るは「子の戻り→無ければタブ履歴」の順で処理。
//   （CLF 資格ハブと同じ backRef パターン）
// ============================================================
const HubBackCtx = createContext(null);

// ============================================================
// ハブの中の位置（第1階層：どの資格・どのセクション・どの画面か）を URL のハッシュ #hub/a/b に残す。
// - 開いたとき：URL に位置があれば、そこから始める（再読み込み・共有したリンク）
// - 位置が変わったとき：ブラウザの履歴に積む（「戻る」でひとつ前の位置へ）
// - 「戻る」「進む」：URL の位置を画面に戻す
// parts は今の状態を表す文字列の配列、apply(arr) は配列から状態を戻す関数（不正な値は既定に戻すこと）。
// それより深い位置（資格の中のタブなど）は、各ハブのアプリ内「戻る」に任せる。
// ============================================================
// 文字色を背景に対して読める濃さ（既定 4.5:1）まで寄せる。暗い背景なら明るく、明るい背景なら暗くする。
// アクセント色をそのまま文字に使っている所（資格一覧のコード・「開く →」など）で使う。
function nvInk(fg, bg, min = 4.5) {
  try {
    const rgb = (h) => { const x = String(h).replace("#", ""); const f = x.length === 3 ? x.split("").map((c) => c + c).join("") : x; return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)); };
    const lum = (c) => { const v = c.map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
    const ratio = (a, b) => { const la = lum(a), lb = lum(b); return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05); };
    const B = rgb(bg); let c = rgb(fg);
    if (B.some((x) => Number.isNaN(x)) || c.some((x) => Number.isNaN(x))) return fg;
    if (ratio(c, B) >= min) return fg;
    const to = lum(B) < 0.18 ? 255 : 0;
    for (let t = 0.05; t <= 1.0001; t += 0.05) {
      const d = c.map((x) => Math.round(x + (to - x) * t));
      if (ratio(d, B) >= min) return "#" + d.map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    return to ? "#ffffff" : "#000000";
  } catch (e) { return fg; }
}
function novaHubPath(hub) {
  try {
    const h = (window.location.hash || "").replace(/^#\/?/, "").split("?")[0];
    const [head, ...rest] = h.split("/");
    return head === hub ? rest.filter(Boolean).map((x) => { try { return decodeURIComponent(x); } catch (e) { return x; } }) : null;
  } catch (e) { return null; }
}
function useNovaHubRoute(hub, parts, apply) {
  const key = parts.filter((x) => x != null && x !== "").map(String).join("/");
  const applyRef = useRef(apply);
  applyRef.current = apply;
  const lastRef = useRef(null);
  const fromUrlRef = useRef(false);
  useEffect(() => {
    const p = novaHubPath(hub);
    // URL から位置を戻した直後の描画は、まだ古い状態のままなので、下の書き込みで履歴を積まない
    if (p && p.length) { lastRef.current = p.join("/"); fromUrlRef.current = true; applyRef.current(p); }
    else lastRef.current = key;
    const onNav = () => {
      const q = novaHubPath(hub);
      if (q === null) return; // ハブの外へ出た（ポータル側が処理する）
      const k = q.join("/");
      if (k === lastRef.current) return;
      lastRef.current = k;
      applyRef.current(q);
    };
    window.addEventListener("popstate", onNav);
    window.addEventListener("hashchange", onNav);
    return () => { window.removeEventListener("popstate", onNav); window.removeEventListener("hashchange", onNav); };
  }, [hub]);
  useEffect(() => {
    if (fromUrlRef.current) { fromUrlRef.current = false; if (key !== lastRef.current) return; }
    if (lastRef.current === null || key === lastRef.current) return;
    lastRef.current = key;
    const url = "#" + [hub, ...key.split("/").filter(Boolean).map(encodeURIComponent)].join("/");
    try { if (novaHubPath(hub) !== null) window.history.pushState(null, "", url); } catch (e) {}
  }, [key, hub]);
}

function useLocalHistory(pairs) {
  const values = pairs.map((p) => p[0]);
  const setters = pairs.map((p) => p[1]);
  const prevRef = useRef(values);
  const skipRef = useRef(false);
  const [stack, setStack] = useState([]);
  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      prevRef.current = values;
      return;
    }
    let changed = false;
    for (let i = 0; i < values.length; i++) {
      if (!Object.is(values[i], prevRef.current[i])) { changed = true; break; }
    }
    if (changed) {
      const snap = prevRef.current;
      prevRef.current = values;
      setStack((s) => [...s, snap]);
    }
  });
  const back = () => {
    if (!stack.length) return false;
    const prev = stack[stack.length - 1];
    skipRef.current = true;
    for (let i = 0; i < setters.length; i++) {
      if (!Object.is(prev[i], values[i])) setters[i](prev[i]);
    }
    prevRef.current = prev;
    setStack((s) => s.slice(0, -1));
    return true;
  };
  return { back, canBack: stack.length > 0 };
}

let __opBackId = 0;

// 画面担当コンポーネントが自分の back()/canBack をハブの登録リストへ登録する。
function useRegisterBack(backFn, canBack) {
  const ctx = useContext(HubBackCtx);
  const idRef = useRef(0);
  if (idRef.current === 0) idRef.current = ++__opBackId;
  const fnRef = useRef(backFn);
  fnRef.current = backFn;
  const canRef = useRef(canBack);
  canRef.current = canBack;
  useEffect(() => {
    if (!ctx) return undefined;
    ctx.register(idRef.current, () => fnRef.current(), canRef);
    return () => ctx.unregister(idRef.current);
  }, [ctx]);
  useEffect(() => {
    if (ctx) ctx.notifyCanBack();
  }, [ctx, canBack]);
}

// ハブ側: 画面担当コンポーネントの戻り処理を登録リストで束ね、
// 「深い階層(後に登録された方)から順に」1手戻す。戻せたら true。
function useHubBack() {
  const listRef = useRef([]); // [{ id, back, canRef }] 登録順=浅→深
  const [ver, setVer] = useState(0);
  const ctx = useMemo(
    () => ({
      register(id, back, canRef) {
        if (!listRef.current.some((e) => e.id === id)) {
          listRef.current.push({ id, back, canRef });
          setVer((v) => v + 1);
        }
      },
      unregister(id) {
        listRef.current = listRef.current.filter((e) => e.id !== id);
        setVer((v) => v + 1);
      },
      notifyCanBack() { setVer((v) => v + 1); },
      goBack() {
        for (let i = listRef.current.length - 1; i >= 0; i--) {
          const e = listRef.current[i];
          if (e.canRef.current && e.back()) return true;
        }
        return false;
      },
    }),
    [],
  );
  void ver; // canBack 変化時の再評価のために参照
  const anyChildCanBack = listRef.current.some((e) => e.canRef.current);
  return { ctx, anyChildCanBack };
}

