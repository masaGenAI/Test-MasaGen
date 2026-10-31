# 追加5業界の判定演習とシナリオ ― 作成の指示

QUIZ_BRIEF.md（問題）と SCEN_BRIEF.md（シナリオ）の決まりに従う。QUIZ2_BRIEF.md との違いは次の点だけ。

- **根拠**：担当の検算済みファイル（a4_a/ind3_final.json：pha 製薬・trn 物流、a4_b/ind3_final.json：pro 士業・rea 不動産、a4_c/ind3_final.json：cnt コンテンツ）。横断の事実は regs_final.json も使ってよい。材料に書いていない事実（日付・数字・名称・義務）を入れない。note の 未確認／当てはめ／二次／案 の表示を守る。
- **領域**：すべて `"d": "D8"`。`ref` は `ind3:<key>:<規定の番号0始まり>` か `ind3:<key>:watch:<番号>`。
- **既存の問題と重ねない**：final/bank_new.json と final/bank_ind2.json の D8、とくに著作権（edu）・広告表示（ret）・EU AI規則第50条（ret・tel）・個人情報保護委員会の生成AI注意喚起と同じ論点・問い方を避ける。
- **数**：1業界21問。シナリオは1業界1本（3段）。industry の値は 製薬／士業／物流／不動産／コンテンツ。id は sc-<key>-xxxx。架空で名前のない組織にする（実在しそうな社名・人名を付けない）。
- 書いたら `python3 -I tools/qlen.py <自分の問題ファイル>` で NG 0、正解が最長 10〜30%、位置 15〜35%。リポジトリのルートから `node .claude/skills/quiz-authoring/check-batch.mjs <絶対パス> --bank GOVDOJO_BANK` を通し、100問未満のエラー以外を0にする。
