# 資格ハブ：模擬試験を AB-620 水準へ引き上げる計画（引き継ぎ）

## ゴール
以下13資格の**模擬試験（模試 / Mock exam）**の難易度と分量を **AB-620 と同じレベル**にする。
対象: AIGP, ISO 42001 F, ISO 42001 LI, CCSK v5, CISM, CISA, AAISM, AAIR, AAIA, GH-900, GH-300, ADP, DP-900

## 難易度・分量の基準 = AB-620 の `EXAM_SETS`
- AB-620（`Station_AB620`）の模試は **`const EXAM_SETS`**（キュレーション済みの本番相当フルセット）で構成。`examCount = Object.keys(EXAM_SETS).length`（＝セット数）。
- 練習BANK（短い一問一答・平均25〜27文字）とは別物。**難易度はEXAM_SETS側にある**（シナリオ/事例、複数概念横断、紛らわしいが根拠のある誤答、解説付き）。
- 対象13資格の模試は主に練習BANKから出題しているため「簡単すぎる」。

## 最初にやること（仕様確定）
`Station_AB620` を精読し確定する：
1. `EXAM_SETS` の**正確な形状**（セットのキー、1セットの問題数、各問オブジェクトのフィールド：q/qEn, o/oEn, a, e/eEn, ドメインタグ 等）。
2. **セット数 × 1セット問題数**（＝目標分量）と合格ライン（`PASS`）。
3. **模試タブが EXAM_SETS をどう消費するか**（AB-620 の該当コンポーネント）。
4. 対象各資格の**現状の模試ソース**（BANK抽選か、EXAM_SETS未実装か）。

## ステーション種別（注入方式に影響）
- **ファクトリ `makeSecGovStation`**（185850付近）: ISO 42001 LI, CCSK, CISM, CISA, AAISM, AAIR, AAIA
  → ファクトリに `EXAM_SETS`（cfg経由）対応を1回入れ、各 cfg にデータを足せば7資格一括。図解の `FIGS` と同じパターン。
- **独自ステーション（IIFE）**: AIGP, ISO 42001 F, ADP, DP-900, GH-900, GH-300
  → 各ステーションに `EXAM_SETS` を追加し、模試タブを差し替え。

## 実行手順（先の「図解等3倍」作業と同方式）
1. 仕様確定（上記）。ターゲット: 「AB-620と同じ Nセット × M問」。
2. **生成**: 資格ごとに並列サブエージェント（general-purpose, Read+Write）で AB-620難易度の `EXAM_SETS` を生成。
   - 各試験の公式ブループリント/ドメイン比率に正確準拠、シナリオ主体、日英、解説必須。
   - 出力はスクラッチパッドへ `.../scratchpad/certgen/<id>_exam.js`（ステーションの EXAM_SETS 形状に一致させる）。
   - 既存の練習BANKやEXAM_SETSと重複しないこと。
3. **注入**: スクリプトで `EXAM_SETS` を追加＋模試タブを EXAM_SETS 参照へ。
   - ファクトリ: `makeSecGovStation` の分割代入に `EXAM_SETS` を追加し、模試レンダラーを EXAM_SETS 優先に。各 cfg に `EXAM_SETS:[...]`。
   - 独自: 各ステーションに追加＋模試タブ差し替え。
4. 各バッチで `cd nova-app && npm run build` 通過を確認、代表ステーションの模試をスクリーンショット検証、コミット＆プッシュ。

## 参考（前回の量産で使った道具・パターン）
- 注入スクリプトの雛形（配列へ追記／ファクトリ cfg へプロパティ追加／ブラケットマッチ）は前回 `scratchpad/certgen/*.mjs` に作成（スクラッチパッドは揮発するため、新セッションで再作成する）。
- ビルド: `cd /home/user/Test-MasaGen/nova-app && npm run build`（vite single-file、~1分）。
- 図解のインタラクティブ基盤: `FlowDiagram`(152) / `FlowSection`(347)。模試には不要。
- ブランチ: `claude/app-usage-question-1rkdar`。

## 注意
- 巨大な単一ファイル `nova-app/src/ProjectNova.jsx`（20万行超）。大規模データ追記は Edit ではなく **node スクリプトでのブラケットマッチ挿入**が安全。
- 正確性優先（前回同様、各試験範囲に厳密準拠、重複ゼロを検証）。
