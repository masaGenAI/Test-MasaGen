# 業界の追加（7業界）― REG_BRIEF.md の (B) への追記

既存の4業界（金融・医療・公共・製造）と同じ形で、7業界を足す。決まりは REG_BRIEF.md の (B) と同じ（取得した本文だけ、quote は文字どおり、Wikipedia 不可、二次は明記、「当てはめ」は note に明記、2026年10月時点）。

## 追加する項目（regs の各要素に）
- `themes`：次の9つから1〜3個（規定の主な対象）。
  ai＝AIそのものの規律／pi＝個人情報・データ／out＝委託・クラウド・調達／sec＝セキュリティ／model＝モデル検証・業務規制／prod＝製品・機器の安全と責任／info＝記録・秘密・輸出管理／cons＝消費者保護・表示・広告／labor＝雇用・労働
- `os`：true＝海外・国際の規定、false＝日本の規定。
- `note` は [日本語, 英語] の組にする（「当てはめ」「未確認」などの注記も英訳する）。

## ファイル
- 出力は `<担当ディレクトリ>/ind_<key>.json`。形は {"key": "<key>", "ind": "日本語名", "ind_en": "English", "scen": [道場のシナリオの industry 値], "regs": [...], "watch": [...]}。
- key と scen：保険 ins ["保険"]／小売・EC・広告 ret ["小売"]／人事・雇用 hr ["人事"]／教育 edu ["教育"]／通信・メディア・プラットフォーム tel []／エネルギー・重要インフラ ene []／自動車・モビリティ auto []。
- regs は 8〜12件（国内を中心に、海外の主要なものも）。watch は 5〜8件。
- 既存の業界と重なる横断ルール（AI法・AI事業者ガイドライン・個人情報保護法・EU AI法）は、その業界でAIに特に効く点があるときだけ入れる（例：EU AI法の附属書III の雇用・教育・重要インフラ）。

## 取れないサイト
サイト側が拒否するもの：www.jftc.go.jp、content.naic.org、unece.org、www.nhtsa.gov、www.ofcom.org.uk、www.cisa.gov、www.ferc.gov、www.ed.gov、iso.org、oecd.org。同じ機関の別ホスト（例：www.naic.org、studentprivacy.ed.gov）や、ほかの公式の出典を探す。無理に回避しない。
