# セキュリティ・ガバナンス道場「インシデント事例」の見直し手順

`nova-app/src/ProjectNova.jsx` の `GOVDOJO_INCIDENTS`（TechHub › セキュリティ・ガバナンス道場 › インシデント事例）は、
公表された実インシデントを「何が起きたか → 仕組み → 要因（技術・プロセス・ガバナンス）→ 対策 → 教訓」に分解して載せている。
報告期限の図（`GOVDOJO_CLOCKS`）と OWASP の名称（`GOVDOJO_OWASP`）も同じ時点で確認した。
事例は古くならないが、**新しい種類の事例が出ると全体の重みが変わる**ので、**半年に1回（目安は4月と10月）**見直す。

## 1件の形

```json
{"id":"echoleak","date":"2025-06","cat":"inject",
 "org":["Microsoft 365 Copilot","Microsoft 365 Copilot"],
 "t":["見出し","Title"], "what":["何が起きたか（帰属つき）","…"],
 "chain":[["攻撃・失敗の段（25字以内）","…"], …3〜5段],
 "cause":{"tech":[…],"proc":[…],"gov":[…]},
 "fix":{"vendor":[…],"tech":[…],"proc":[…],"gov":[…]},
 "map":["LLM01","LLM02"], "trifecta":[true,true,true],
 "lesson":["教訓（1文）","…"], "src":[{"title":"…","url":"https://…"}]}
```

- `cat`：inject（間接プロンプト注入・流出）／agent（エージェントの暴走・過剰権限）／supply（サプライチェーン）／abuse（AIを悪用した攻撃）／exposure（設定不備・データ露出）／content（出力の害・当局の処分）。
- `map`：OWASP Top 10 for LLM Applications 2025（LLM01〜10）と OWASP Top 10 for Agentic Applications（ASI01〜10）。
  名称は `GOVDOJO_OWASP` にある。OWASP が版を改めたら、番号の付け替えを全件で確認する。
- `trifecta`：致死的三要素（私的データ・信頼できないコンテンツ・外部への送信手段）。流出型の事例だけに付ける。
- 図解の「エージェントの境界」は `map` の番号から実例を自動で引く（`GOVDEF_GATES` の `codes`）。

## 手順

1. **候補を探す**：前回の見直し以降に公表された事例を、cat ごとに検索する（例：「prompt injection vulnerability 2027」「AI agent incident」「MCP vulnerability」「AI data breach」「生成AI 情報漏えい」）。
   被害の大きさ・新しい種類の攻撃や失敗・一次情報の有無で選ぶ。日本に関係する事例を優先して1〜2件入れる。
2. **裏取り**：出典は1件あたり2つ以上、うち1つは一次情報（提供者の公式発表・勧告、発見者の技術ブログ、CVE、当局の発表）。
   この環境では出典ページを開けない（WebFetch・curl が拒否される）ため、検索結果の題名・抜粋で確かめられたことだけを書く。
   日付・件数・金額・CVSS は、情報源が割れていたら書かない。
3. **書き方**：主張には帰属をつける（「〜と公表した」「〜と報じられた」）。要因は3層で重複させず、対策は要因に対応させる。
   検査スクリプトの基準（見出し30字以内、何が起きたか60〜260字、段25字以内など）に合わせる。
4. **差し替え**：古い事例は消さずに残してよい（年表で時系列が見える）。同じ種類の事例が5件を超えたら、教訓が重なる古いものから外す。
5. **問題も更新する**：道場の判定演習（`GOVDOJO_BANK`）には事例に基づく問題がある。事例を外したら、その事例を名指しした問題も外すか書き換える。
   追加するときは quiz-authoring の規約どおり100問以上のバッチで `check-batch.mjs` を通す。
6. **報告期限の確認**：EU AI法（第73条）・GDPR（第33条）・個人情報保護法・NIS2・米SEC（Form 8-K Item 1.05）の改正を確認し、`GOVDOJO_CLOCKS` を直す。
7. **差し込み後の確認**：
   - `cd nova-app && npm run build`（Hard errors 0）
   - 道場の「図解」「インシデント事例」を日英両方で開き、年表・境界図の実例リンク・報告期限の図が表示されること
   - `python3 .claude/skills/nova-consistency-audit/scripts/stale_scan.py` で MISMATCH 0（道場の問題数を書いた箇所がある）
8. この文書の冒頭とデータ先頭のコメントにある確認時点を更新する。
