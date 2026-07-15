# ➕ キーワードから追加する手順（Learning Tracker）

資格名・書籍名・講座名・ツール名などを受け取ったら、以下の手順で1件（複数可）を追加する。
**進め方は Anything memo と同じ思想**：キーワードを送る → Webで補強 → 決定 → 1行追加 → 反映。

## 手順
### 1. 調べて決める（一次情報で裏取り）
Web検索で以下を確定する。数値・提供元・「最新」などは公式・発行元で裏取りし、
不確かなら「要確認」と明記して断定しない。

| 項目 | 決め方 |
|---|---|
| **区分 (cat)** | 資格 / Tools / 講座 / 書籍 / Udemy のどれか |
| **名称 (name)** | 正式名称。資格はコード（例 `PL-300`）や正式表記 |
| **提供 (prov)** | 資格・Tools のみ（MS/Google/AWS/GCP/Anthoropic/AICX/Oracle/OpenAI/Cursor/Dify/Meta/LangChain/LLM 等）。書籍・講座・Udemy は空 |
| **分類 (genre)** | 既存の選択肢に合わせる（下表）。新分類は必要時のみ新設し明記 |
| **ステータス (status)** | 資格=未取得/準備中/取得済み、その他=未着手/着手中/完了 等 |
| **URL (url)** | 公式ページや教材URL（任意） |

#### 分類の既存選択肢（参考）
- 資格 (大項目): `Cloud, AI, PL, DP, SC, Finance, ENG, Data`
- Tools (大項目): `業務効率化, AI駆動開発, エージェント構築`
- 講座 (ジャンル): `DX, ガバナンス, AX, ナレッジ, AIエージェント, AI駆動開発, Data, コンサル, セキュリティ, 起業, 副業, 資格試験`
- 書籍 (ジャンル): `生成AI・LLM, AIエージェント・開発, AI活用・DX, AIリスク・ガバナンス, データ分析・活用, 経営・戦略・事業, 思考・問題解決, ファイナンス・財務, キャリア・自己啓発, 教養・その他, ロジカルシンキング, 仮説思考, 論点思考, 問題解決, 構造化, 地頭, その他`
- Udemy (ジャンル): `IT資格（情報処理）, GAFAM-Certification, AI, DX, Data Science, Finance, Excel, PC-skill, PPT, English, 思考法`

### 2. 追記する
```bash
python artifacts/_build/add_entries.py \
  --cat 資格 --name "PL-300" --prov MS --genre PL --status 未取得 \
  --url "https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate/"
```
複数まとめて:
```bash
python artifacts/_build/add_entries.py --json '[{"cat":"書籍","name":"…","genre":"生成AI・LLM"}]'
```

### 3. 再生成
```bash
python artifacts/_build/build.py
```
→ 件数と完了数が表示され、`artifacts/learning-tracker/artifact.html` が更新される。

### 4. コミット & プッシュ
```bash
git add -A
git commit -m "Add <名称> to learning tracker"
git push -u origin claude/learning-tracker
```

### 5. アーティファクト更新
Artifact ツールで `artifacts/learning-tracker/artifact.html` を
`url=https://claude.ai/code/artifact/5ea42e83-20dc-48b0-8eb7-f656df28ff99` を指定して再デプロイ（同じURLを維持）。

## メモ
- データ正本は Notion。ここでの追加は**アーティファクト（静的スナップショット）への反映**。
  Notion 本体にも反映したい場合は別途 Notion 側で追加する（このリポの build は触らない）。
- `additions.json` は Notion 由来の `raw/` とは別管理なので、後で Notion 側を再エクスポート
  しても追加分が失われない。
