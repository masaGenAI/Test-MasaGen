// @@nova-part 10-finance/050-block.jsx

// ===== Added sections 19 & 20 (Bookkeeping L3 / L2) =====
// ============================================================
// 19_sec19.js — Section 19 (Bookkeeping Level 3 / 簿記3級対策)
//   Full-parity section: quiz/mock/calc/diagrams/compare/confuse/glossary.
// ============================================================
(function registerSection19() {
  if (typeof SECTIONS === "undefined") return;
  SECTIONS.push({
 "id": "sec19",
 "no": 19,
 "title": {
  "ja": "簿記3級対策",
  "en": "Bookkeeping Level 3"
 },
 "sub": {
  "ja": "仕訳・帳簿・決算の基礎（日商簿記3級 商業簿記）",
  "en": "Journals, ledgers, closing (JP Bookkeeping L3, commercial)"
 },
 "accent": "#0e7490",
 "accentActive": "#0891b2",
 "headerSub": "#a5f3fc",
 "domains": [
  {
   "id": "kihon",
   "ja": "簿記の基礎",
   "en": "Fundamentals"
  },
  {
   "id": "genkin",
   "ja": "現金・預金",
   "en": "Cash & Deposits"
  },
  {
   "id": "shohin",
   "ja": "商品売買",
   "en": "Merchandising"
  },
  {
   "id": "saiken",
   "ja": "債権・債務",
   "en": "Receivables & Payables"
  },
  {
   "id": "kotei",
   "ja": "固定資産",
   "en": "Fixed Assets"
  },
  {
   "id": "shihon",
   "ja": "資本・税金",
   "en": "Capital & Taxes"
  },
  {
   "id": "kessan",
   "ja": "決算手続",
   "en": "Closing Procedures"
  },
  {
   "id": "denpyo",
   "ja": "伝票・帳簿",
   "en": "Vouchers & Books"
  }
 ],
 "data": {
  "quiz": [
   {
    "id": "j001",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品11,000円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 11,000 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 11000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 11000
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"商品を仕入れたので、三分法では借方を「仕入」（費用）とする。代金を現金で払ったので貸方は現金（資産の減少）。金額は11,000円。借方を「商品」とする分記法の処理は誤り。","en":"Under the three-account method, goods bought are debited to Purchases (an expense). Paying cash reduces an asset, so Cash is credited. The amount is 11,000 yen. Debiting Merchandise, as the split-account method does, is a mistake."}
    },
   {
    "id": "j002",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品50,100円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 50,100 yen on account (payment due later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 50100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 50100
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     }
    ],
      "exp": {"ja":"商品の仕入なので借方は「仕入」。代金は後払いなので、将来支払う義務として貸方は買掛金（負債の増加）。金額は50,100円。商品以外の後払いに使う未払金と取り違える誤りが多い。","en":"Goods bought are debited to Purchases. Payment comes later, so the obligation is credited to Accounts payable (a liability increase). The amount is 50,100 yen. A common error is using Other payable, which is for non-merchandise items."}
    },
   {
    "id": "j003",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品89,200円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 89,200 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 89200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 89200
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"商品の仕入は借方「仕入」。自社が小切手を振り出すと当座預金の残高が減るので、貸方は当座預金。金額は89,200円。貸方を現金とする誤りが多い。","en":"Goods bought are debited to Purchases. Issuing our own check reduces the checking account balance, so Checking is credited. The amount is 89,200 yen. Crediting Cash is a common error."}
    },
   {
    "id": "j004",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品128,300円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 128,300 yen and paid by issuing a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 128300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 128300
     }
    ],
    "accounts": [
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"商品の仕入なので借方は「仕入」。約束手形を振り出したので、後日支払う義務として貸方は支払手形（負債の増加）。金額は128,300円。買掛金とする誤りは、手形を使った点の見落とし。","en":"Goods bought are debited to Purchases. A promissory note was issued, so the obligation to pay later is credited to Notes payable (a liability increase). The amount is 128,300 yen. Using Accounts payable overlooks that a note was issued."}
    },
   {
    "id": "j005",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を167,400円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 167,400 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 167400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 167400
     }
    ],
    "accounts": [
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」（収益）。代金を現金で受け取ったので借方は現金（資産の増加）。金額は167,400円。貸方を商品とする分記法の処理は誤り。","en":"Selling goods is revenue, so Sales is credited. Cash was received, so Cash (an asset increase) is debited. The amount is 167,400 yen. Crediting Merchandise, as in the split-account method, is a mistake."}
    },
   {
    "id": "j006",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を206,500円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 206,500 yen on account (payment to be received later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 206500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 206500
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」。代金は後で受け取るので、借方は売掛金（債権の増加）。金額は206,500円。商品以外の後日受取に使う未収入金と取り違える誤りが多い。","en":"Selling goods credits Sales. The price will be collected later, so Accounts receivable (a receivable increase) is debited. The amount is 206,500 yen. A common error is using Other receivable, which is for non-merchandise items."}
    },
   {
    "id": "j007",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を245,600円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 245,600 yen and received a check drawn by our own company, which was deposited immediately into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 245600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 245600
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」。受け取った小切手を直ちに当座預金に預けたので、借方は当座預金（資産の増加）。金額は245,600円。借方を現金とする誤りは、預け入れの指示の見落とし。","en":"Selling goods credits Sales. The check received was deposited at once into the checking account, so Checking (an asset increase) is debited. The amount is 245,600 yen. Debiting Cash overlooks the immediate deposit."}
    },
   {
    "id": "j008",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品の注文を受け、手付金284,700円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 284,700 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 284700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 284700
     }
    ],
    "accounts": [
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を引き渡すまで売上にならず、後で商品を渡す義務なので前受金（負債）で処理する。現金が増えるので借方は現金。金額は問題文の284,700円。貸方を売上とする誤りが多い。","en":"An advance received at the time of the order is not Sales until the goods are delivered; it is an obligation to deliver later, so it is Advance received (a liability). Cash increases and is debited. The amount is the 284,700 yen in the problem. Crediting Sales is a common error."}
    },
   {
    "id": "j009",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を注文し、手付金323,800円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 323,800 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 323800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 323800
     }
    ],
    "accounts": [
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を受け取るまで仕入にならず、後で商品を受け取る権利なので前払金（資産）で処理する。現金が減るので貸方は現金。金額は問題文の323,800円。借方を仕入とする誤りが多い。","en":"An advance paid at the time of the order is not Purchases until the goods are received; it is a right to receive goods later, so it is Advance paid (an asset). Cash decreases and is credited. The amount is the 323,800 yen in the problem. Debiting Purchases is a common error."}
    },
   {
    "id": "j010",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を362,900円でクレジット払いの条件で販売した(手数料14,516円は販売時計上)。",
     "en": "Sold merchandise for 362,900 yen under credit card payment terms. The fee of 14,516 yen is recorded at the time of the sale."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 348384
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 14516
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 362900
     }
    ],
    "accounts": [
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     }
    ],
      "exp": {"ja":"クレジット払いの販売は、代金を後でカード会社から受け取るのでクレジット売掛金（資産）とする。手数料14,516円は支払手数料（費用）。売掛金は362,900−14,516＝348,384円。手数料を差し引かず全額を売掛金とする誤りが多い。","en":"A card sale is collected later from the card company, so it is recorded as Credit card receivable (an asset). The 14,516 yen fee is Fee expense. The receivable is 362,900 − 14,516 = 348,384 yen. A common error is booking the full amount as the receivable without deducting the fee."}
    },
   {
    "id": "j011",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品402,000円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 402,000 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 402000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 402000
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"仕入は費用の発生なので借方、現金払いは資産の減少なので貸方に記入する。402,000円が仕入と現金に同額で入る。現金払いなのに貸方を買掛金とする誤りが多い。","en":"Purchases is an expense, so it goes on the debit side; paying cash reduces an asset, so Cash goes on the credit side. 402,000 yen is entered on both sides. A common error is crediting Accounts payable even though the payment was in cash."}
    },
   {
    "id": "j012",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品441,100円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 441,100 yen on account (payment due later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 441100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 441100
     }
    ],
    "accounts": [
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     }
    ],
      "exp": {"ja":"掛けの仕入は、借方に仕入、貸方に買掛金を同額で記入する。現金は動かないので現金は使わない。金額は441,100円。貸方を現金とする誤りに注意する。","en":"A credit purchase is recorded by debiting Purchases and crediting Accounts payable for the same amount. No cash moves, so Cash is not used. The amount is 441,100 yen. Do not credit Cash by mistake."}
    },
   {
    "id": "j013",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品480,200円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 480,200 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 480200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 480200
     }
    ],
    "accounts": [
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"小切手の振出は当座預金の減少として処理する。仕入が480,200円なので、借方に仕入、貸方に当座預金を同額記入する。小切手を受け取った場合は現金になる点との取り違えに注意する。","en":"Issuing a check is a decrease in the checking account. The purchase is 480,200 yen, so Purchases is debited and Checking is credited for the same amount. Do not confuse this with receiving a check, which is treated as Cash."}
    },
   {
    "id": "j014",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品519,300円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 519,300 yen and paid by issuing a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 519300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 519300
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"約束手形の振出は支払手形の増加で貸方に記入する。仕入519,300円が借方に入り、貸借が一致する。受取手形は手形を受け取る側の勘定なので、貸方に使う誤りに注意する。","en":"Issuing a promissory note increases Notes payable, which goes on the credit side. Purchases of 519,300 yen is debited and both sides balance. Notes receivable belongs to the party that receives the note, so it must not be used here."}
    },
   {
    "id": "j015",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を558,400円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 558,400 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 558400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 558400
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     }
    ],
      "exp": {"ja":"売上は収益の発生なので貸方、現金の受取は資産の増加なので借方に記入する。金額は558,400円で両方に同額。借方を売掛金とする誤りは、掛け売りと混同したもの。","en":"Sales is revenue, so it is credited; receiving cash is an asset increase, so Cash is debited. The amount is 558,400 yen on both sides. Debiting Accounts receivable confuses this with a credit sale."}
    },
   {
    "id": "j016",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を597,500円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 597,500 yen on account (payment to be received later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 597500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 597500
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"掛け売りは、借方に売掛金、貸方に売上を同額で記入する。現金はまだ入らないので現金は使わない。金額は597,500円。借方を現金とする誤りに注意する。","en":"A credit sale is recorded by debiting Accounts receivable and crediting Sales for the same amount. No cash comes in yet, so Cash is not used. The amount is 597,500 yen. Do not debit Cash by mistake."}
    },
   {
    "id": "j017",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を636,600円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 636,600 yen and received a check drawn by our own company, which was deposited immediately into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 636600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 636600
     }
    ],
    "accounts": [
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     }
    ],
      "exp": {"ja":"売上636,600円を貸方に記入する。代金は小切手だが、問題文で当座預金とあるので借方は当座預金になる。他店振出の小切手を受け取って手元に置く場合は現金で処理する点と区別する。","en":"Sales of 636,600 yen is credited. The payment was a check, but the problem says it was put into the checking account, so Checking is debited. This differs from holding a check received from another company, which is treated as Cash."}
    },
   {
    "id": "j018",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品の注文を受け、手付金675,700円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 675,700 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 675700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 675700
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     }
    ],
      "exp": {"ja":"手付金の受取は、貸方に前受金（負債の増加）、借方に現金を記入する。675,700円が両方に入る。売上に計上するのは商品を引き渡したときで、受取時ではない。","en":"Receiving a deposit credits Advance received (a liability increase) and debits Cash. 675,700 yen goes on both sides. Sales is recorded when the goods are delivered, not when the deposit is received."}
    },
   {
    "id": "j019",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を注文し、手付金714,800円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 714,800 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 714800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 714800
     }
    ],
    "accounts": [
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     }
    ],
      "exp": {"ja":"手付金の支払は、借方に前払金（資産の増加）、貸方に現金を記入する。714,800円が両方に入る。仕入に計上するのは商品を受け取ったときで、支払時ではない。","en":"Paying a deposit debits Advance paid (an asset increase) and credits Cash. 714,800 yen goes on both sides. Purchases is recorded when the goods are received, not when the deposit is paid."}
    },
   {
    "id": "j020",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を753,900円でクレジット払いの条件で販売した(手数料30,156円は販売時計上)。",
     "en": "Sold merchandise for 753,900 yen under credit card payment terms. The fee of 30,156 yen is recorded at the time of the sale."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 723744
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 30156
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 753900
     }
    ],
    "accounts": [
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"売上は753,900円全額を貸方に記入する。手数料30,156円は販売時に費用（支払手数料）とし、残りの753,900−30,156＝723,744円がクレジット売掛金。売上から手数料を引いて貸方に書く誤りに注意する。","en":"Sales is credited for the full 753,900 yen. The 30,156 yen fee is expensed at the time of sale as Fee expense, and the remaining 753,900 − 30,156 = 723,744 yen is Credit card receivable. Do not credit Sales net of the fee."}
    },
   {
    "id": "j021",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品793,000円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 793,000 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 793000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 793000
     }
    ],
    "accounts": [
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"商品の購入代金は原価で「仕入」に記入する。支払手段が現金なので貸方は現金、金額は793,000円。現金を借方、仕入を貸方と逆に書く誤りに注意する。","en":"The cost of the goods is recorded in Purchases. Because the payment was in cash, Cash is credited, and the amount is 793,000 yen. Do not reverse the sides by debiting Cash and crediting Purchases."}
    },
   {
    "id": "j022",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品832,100円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 832,100 yen on account (payment due later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 832100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 832100
     }
    ],
    "accounts": [
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     }
    ],
      "exp": {"ja":"仕入は費用の発生で借方、掛けは代金が未払いなので負債の買掛金が貸方に増える。金額は832,100円。支払手形は手形を振り出したときに使う勘定で、本問では誤り。","en":"Purchases is an expense on the debit side. Because the price is unpaid, the liability Accounts payable increases on the credit side. The amount is 832,100 yen. Notes payable is used only when a note is issued, so it is wrong here."}
    },
   {
    "id": "j023",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品871,200円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 871,200 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 871200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 871200
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"仕入は費用なので借方。代金は自社振出の小切手で払ったので当座預金（資産）が減り、貸方になる。金額は871,200円。支払手形とする誤りは、手形と小切手の取り違え。","en":"Purchases is an expense, so it is debited. The price was paid with our own check, so the asset Checking decreases and is credited. The amount is 871,200 yen. Using Notes payable confuses a note with a check."}
    },
   {
    "id": "j024",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品910,300円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 910,300 yen and paid by issuing a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 910300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 910300
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"仕入は費用で借方、手形を振り出して払うので貸方は支払手形になる。金額は910,300円。当座預金から払うのは手形が満期になったときで、振出時ではない。","en":"Purchases is an expense on the debit side; paying by issuing a note puts Notes payable on the credit side. The amount is 910,300 yen. Checking is reduced when the note matures, not when it is issued."}
    },
   {
    "id": "j025",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を949,400円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 949,400 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 949400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 949400
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"商品の販売代金は売価で「売上」に記入する。現金で受け取ったので借方は現金、金額は949,400円。現金を貸方、売上を借方と逆にする誤りに注意する。","en":"The selling price is recorded in Sales. Cash was received, so Cash is debited, and the amount is 949,400 yen. Do not reverse the sides by crediting Cash and debiting Sales."}
    },
   {
    "id": "j026",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を988,500円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 988,500 yen on account (payment to be received later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 988500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 988500
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     }
    ],
      "exp": {"ja":"売上は収益で貸方、掛けは代金が未回収なので資産の売掛金が借方に増える。金額は988,500円。受取手形は手形を受け取ったときの勘定で、本問では誤り。","en":"Sales is revenue on the credit side. Because the price is uncollected, the asset Accounts receivable increases on the debit side. The amount is 988,500 yen. Notes receivable is used only when a note is received, so it is wrong here."}
    },
   {
    "id": "j027",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を43,200円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 43,200 yen and received a check drawn by our own company, which was deposited immediately into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 43200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 43200
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」。受け取った小切手を直ちに当座預金に預けたので、借方は当座預金（資産の増加）。金額は43,200円。借方を現金とする誤りは、預け入れの指示の見落とし。","en":"Selling goods credits Sales. The check received was deposited at once into the checking account, so Checking (an asset increase) is debited. The amount is 43,200 yen. Debiting Cash overlooks the immediate deposit."}
    },
   {
    "id": "j028",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品の注文を受け、手付金82,300円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 82,300 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 82300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 82300
     }
    ],
    "accounts": [
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を引き渡すまで売上にならず、後で商品を渡す義務なので前受金（負債）で処理する。現金が増えるので借方は現金。金額は問題文の82,300円。貸方を売上とする誤りが多い。","en":"An advance received at the time of the order is not Sales until the goods are delivered; it is an obligation to deliver later, so it is Advance received (a liability). Cash increases and is debited. The amount is the 82,300 yen in the problem. Crediting Sales is a common error."}
    },
   {
    "id": "j029",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を注文し、手付金121,400円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 121,400 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 121400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 121400
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を受け取るまで仕入にならず、後で商品を受け取る権利なので前払金（資産）で処理する。現金が減るので貸方は現金。金額は問題文の121,400円。借方を仕入とする誤りが多い。","en":"An advance paid at the time of the order is not Purchases until the goods are received; it is a right to receive goods later, so it is Advance paid (an asset). Cash decreases and is credited. The amount is the 121,400 yen in the problem. Debiting Purchases is a common error."}
    },
   {
    "id": "j030",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を160,500円でクレジット払いの条件で販売した(手数料6,420円は販売時計上)。",
     "en": "Sold merchandise for 160,500 yen under credit card payment terms. The fee of 6,420 yen is recorded at the time of the sale."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 154080
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 6420
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 160500
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     }
    ],
      "exp": {"ja":"クレジット払いの販売は、代金を後でカード会社から受け取るのでクレジット売掛金（資産）とする。手数料6,420円は支払手数料（費用）。売掛金は160,500−6,420＝154,080円。手数料を差し引かず全額を売掛金とする誤りが多い。","en":"A card sale is collected later from the card company, so it is recorded as Credit card receivable (an asset). The 6,420 yen fee is Fee expense. The receivable is 160,500 − 6,420 = 154,080 yen. A common error is booking the full amount as the receivable without deducting the fee."}
    },
   {
    "id": "j031",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品199,600円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 199,600 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 199600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 199600
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"商品を仕入れたので、三分法では借方を「仕入」（費用）とする。代金を現金で払ったので貸方は現金（資産の減少）。金額は199,600円。借方を「商品」とする分記法の処理は誤り。","en":"Under the three-account method, goods bought are debited to Purchases (an expense). Paying cash reduces an asset, so Cash is credited. The amount is 199,600 yen. Debiting Merchandise, as the split-account method does, is a mistake."}
    },
   {
    "id": "j032",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品238,700円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 238,700 yen on account (payment due later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 238700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 238700
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     }
    ],
      "exp": {"ja":"商品の仕入なので借方は「仕入」。代金は後払いなので、将来支払う義務として貸方は買掛金（負債の増加）。金額は238,700円。商品以外の後払いに使う未払金と取り違える誤りが多い。","en":"Goods bought are debited to Purchases. Payment comes later, so the obligation is credited to Accounts payable (a liability increase). The amount is 238,700 yen. A common error is using Other payable, which is for non-merchandise items."}
    },
   {
    "id": "j033",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品277,800円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 277,800 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 277800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 277800
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     }
    ],
      "exp": {"ja":"商品の仕入は借方「仕入」。自社が小切手を振り出すと当座預金の残高が減るので、貸方は当座預金。金額は277,800円。貸方を現金とする誤りが多い。","en":"Goods bought are debited to Purchases. Issuing our own check reduces the checking account balance, so Checking is credited. The amount is 277,800 yen. Crediting Cash is a common error."}
    },
   {
    "id": "j034",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品316,900円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 316,900 yen and paid by issuing a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 316900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 316900
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     }
    ],
      "exp": {"ja":"商品の仕入なので借方は「仕入」。約束手形を振り出したので、後日支払う義務として貸方は支払手形（負債の増加）。金額は316,900円。買掛金とする誤りは、手形を使った点の見落とし。","en":"Goods bought are debited to Purchases. A promissory note was issued, so the obligation to pay later is credited to Notes payable (a liability increase). The amount is 316,900 yen. Using Accounts payable overlooks that a note was issued."}
    },
   {
    "id": "j035",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を356,000円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 356,000 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 356000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 356000
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」（収益）。代金を現金で受け取ったので借方は現金（資産の増加）。金額は356,000円。貸方を商品とする分記法の処理は誤り。","en":"Selling goods is revenue, so Sales is credited. Cash was received, so Cash (an asset increase) is debited. The amount is 356,000 yen. Crediting Merchandise, as in the split-account method, is a mistake."}
    },
   {
    "id": "j036",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を395,100円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 395,100 yen on account (payment to be received later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 395100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 395100
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」。代金は後で受け取るので、借方は売掛金（債権の増加）。金額は395,100円。商品以外の後日受取に使う未収入金と取り違える誤りが多い。","en":"Selling goods credits Sales. The price will be collected later, so Accounts receivable (a receivable increase) is debited. The amount is 395,100 yen. A common error is using Other receivable, which is for non-merchandise items."}
    },
   {
    "id": "j037",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を434,200円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 434,200 yen and received a check drawn by our own company, which was deposited immediately into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 434200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 434200
     }
    ],
    "accounts": [
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"売上434,200円を貸方に記入する。代金は小切手だが、問題文で当座預金とあるので借方は当座預金になる。他店振出の小切手を受け取って手元に置く場合は現金で処理する点と区別する。","en":"Sales of 434,200 yen is credited. The payment was a check, but the problem says it was put into the checking account, so Checking is debited. This differs from holding a check received from another company, which is treated as Cash."}
    },
   {
    "id": "j038",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品の注文を受け、手付金473,300円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 473,300 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 473300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 473300
     }
    ],
    "accounts": [
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     }
    ],
      "exp": {"ja":"手付金の受取は、貸方に前受金（負債の増加）、借方に現金を記入する。473,300円が両方に入る。売上に計上するのは商品を引き渡したときで、受取時ではない。","en":"Receiving a deposit credits Advance received (a liability increase) and debits Cash. 473,300 yen goes on both sides. Sales is recorded when the goods are delivered, not when the deposit is received."}
    },
   {
    "id": "j039",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を注文し、手付金512,400円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 512,400 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 512400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 512400
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     }
    ],
      "exp": {"ja":"手付金の支払は、借方に前払金（資産の増加）、貸方に現金を記入する。512,400円が両方に入る。仕入に計上するのは商品を受け取ったときで、支払時ではない。","en":"Paying a deposit debits Advance paid (an asset increase) and credits Cash. 512,400 yen goes on both sides. Purchases is recorded when the goods are received, not when the deposit is paid."}
    },
   {
    "id": "j040",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を551,500円でクレジット払いの条件で販売した(手数料22,060円は販売時計上)。",
     "en": "Sold merchandise for 551,500 yen under credit card payment terms. The fee of 22,060 yen is recorded at the time of the sale."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 529440
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 22060
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 551500
     }
    ],
    "accounts": [
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     }
    ],
      "exp": {"ja":"売上は551,500円全額を貸方に記入する。手数料22,060円は販売時に費用（支払手数料）とし、残りの551,500−22,060＝529,440円がクレジット売掛金。売上から手数料を引いて貸方に書く誤りに注意する。","en":"Sales is credited for the full 551,500 yen. The 22,060 yen fee is expensed at the time of sale as Fee expense, and the remaining 551,500 − 22,060 = 529,440 yen is Credit card receivable. Do not credit Sales net of the fee."}
    },
   {
    "id": "j041",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品590,600円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 590,600 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 590600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 590600
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     }
    ],
      "exp": {"ja":"仕入は費用の発生なので借方、現金払いは資産の減少なので貸方に記入する。590,600円が仕入と現金に同額で入る。現金払いなのに貸方を買掛金とする誤りが多い。","en":"Purchases is an expense, so it goes on the debit side; paying cash reduces an asset, so Cash goes on the credit side. 590,600 yen is entered on both sides. A common error is crediting Accounts payable even though the payment was in cash."}
    },
   {
    "id": "j042",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品629,700円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 629,700 yen on account (payment due later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 629700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 629700
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     }
    ],
      "exp": {"ja":"掛けの仕入は、借方に仕入、貸方に買掛金を同額で記入する。現金は動かないので現金は使わない。金額は629,700円。貸方を現金とする誤りに注意する。","en":"A credit purchase is recorded by debiting Purchases and crediting Accounts payable for the same amount. No cash moves, so Cash is not used. The amount is 629,700 yen. Do not credit Cash by mistake."}
    },
   {
    "id": "j043",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品668,800円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 668,800 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 668800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 668800
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"小切手の振出は当座預金の減少として処理する。仕入が668,800円なので、借方に仕入、貸方に当座預金を同額記入する。小切手を受け取った場合は現金になる点との取り違えに注意する。","en":"Issuing a check is a decrease in the checking account. The purchase is 668,800 yen, so Purchases is debited and Checking is credited for the same amount. Do not confuse this with receiving a check, which is treated as Cash."}
    },
   {
    "id": "j044",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品707,900円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 707,900 yen and paid by issuing a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 707900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 707900
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     }
    ],
      "exp": {"ja":"約束手形の振出は支払手形の増加で貸方に記入する。仕入707,900円が借方に入り、貸借が一致する。受取手形は手形を受け取る側の勘定なので、貸方に使う誤りに注意する。","en":"Issuing a promissory note increases Notes payable, which goes on the credit side. Purchases of 707,900 yen is debited and both sides balance. Notes receivable belongs to the party that receives the note, so it must not be used here."}
    },
   {
    "id": "j045",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を747,000円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 747,000 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 747000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 747000
     }
    ],
    "accounts": [
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"売上は収益の発生なので貸方、現金の受取は資産の増加なので借方に記入する。金額は747,000円で両方に同額。借方を売掛金とする誤りは、掛け売りと混同したもの。","en":"Sales is revenue, so it is credited; receiving cash is an asset increase, so Cash is debited. The amount is 747,000 yen on both sides. Debiting Accounts receivable confuses this with a credit sale."}
    },
   {
    "id": "j046",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を786,100円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 786,100 yen on account (payment to be received later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 786100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 786100
     }
    ],
    "accounts": [
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     }
    ],
      "exp": {"ja":"掛け売りは、借方に売掛金、貸方に売上を同額で記入する。現金はまだ入らないので現金は使わない。金額は786,100円。借方を現金とする誤りに注意する。","en":"A credit sale is recorded by debiting Accounts receivable and crediting Sales for the same amount. No cash comes in yet, so Cash is not used. The amount is 786,100 yen. Do not debit Cash by mistake."}
    },
   {
    "id": "j047",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を825,200円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 825,200 yen and received a check drawn by our own company, which was deposited immediately into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 825200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 825200
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」。受け取った小切手を直ちに当座預金に預けたので、借方は当座預金（資産の増加）。金額は825,200円。借方を現金とする誤りは、預け入れの指示の見落とし。","en":"Selling goods credits Sales. The check received was deposited at once into the checking account, so Checking (an asset increase) is debited. The amount is 825,200 yen. Debiting Cash overlooks the immediate deposit."}
    },
   {
    "id": "j048",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品の注文を受け、手付金864,300円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 864,300 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 864300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 864300
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を引き渡すまで売上にならず、後で商品を渡す義務なので前受金（負債）で処理する。現金が増えるので借方は現金。金額は問題文の864,300円。貸方を売上とする誤りが多い。","en":"An advance received at the time of the order is not Sales until the goods are delivered; it is an obligation to deliver later, so it is Advance received (a liability). Cash increases and is debited. The amount is the 864,300 yen in the problem. Crediting Sales is a common error."}
    },
   {
    "id": "j049",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を注文し、手付金903,400円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 903,400 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 903400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 903400
     }
    ],
    "accounts": [
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を受け取るまで仕入にならず、後で商品を受け取る権利なので前払金（資産）で処理する。現金が減るので貸方は現金。金額は問題文の903,400円。借方を仕入とする誤りが多い。","en":"An advance paid at the time of the order is not Purchases until the goods are received; it is a right to receive goods later, so it is Advance paid (an asset). Cash decreases and is credited. The amount is the 903,400 yen in the problem. Debiting Purchases is a common error."}
    },
   {
    "id": "j050",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を942,500円でクレジット払いの条件で販売した(手数料37,700円は販売時計上)。",
     "en": "Sold merchandise for 942,500 yen under credit card payment terms. The fee of 37,700 yen is recorded at the time of the sale."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 904800
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 37700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 942500
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"クレジット払いの販売は、代金を後でカード会社から受け取るのでクレジット売掛金（資産）とする。手数料37,700円は支払手数料（費用）。売掛金は942,500−37,700＝904,800円。手数料を差し引かず全額を売掛金とする誤りが多い。","en":"A card sale is collected later from the card company, so it is recorded as Credit card receivable (an asset). The 37,700 yen fee is Fee expense. The receivable is 942,500 − 37,700 = 904,800 yen. A common error is booking the full amount as the receivable without deducting the fee."}
    },
   {
    "id": "j051",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品981,600円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 981,600 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 981600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 981600
     }
    ],
    "accounts": [
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"商品の購入代金は原価で「仕入」に記入する。支払手段が現金なので貸方は現金、金額は981,600円。現金を借方、仕入を貸方と逆に書く誤りに注意する。","en":"The cost of the goods is recorded in Purchases. Because the payment was in cash, Cash is credited, and the amount is 981,600 yen. Do not reverse the sides by debiting Cash and crediting Purchases."}
    },
   {
    "id": "j052",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品36,300円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 36,300 yen on account (payment due later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 36300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 36300
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     }
    ],
      "exp": {"ja":"仕入は費用の発生で借方、掛けは代金が未払いなので負債の買掛金が貸方に増える。金額は36,300円。支払手形は手形を振り出したときに使う勘定で、本問では誤り。","en":"Purchases is an expense on the debit side. Because the price is unpaid, the liability Accounts payable increases on the credit side. The amount is 36,300 yen. Notes payable is used only when a note is issued, so it is wrong here."}
    },
   {
    "id": "j053",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品75,400円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 75,400 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 75400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 75400
     }
    ],
    "accounts": [
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"仕入は費用なので借方。代金は自社振出の小切手で払ったので当座預金（資産）が減り、貸方になる。金額は75,400円。支払手形とする誤りは、手形と小切手の取り違え。","en":"Purchases is an expense, so it is debited. The price was paid with our own check, so the asset Checking decreases and is credited. The amount is 75,400 yen. Using Notes payable confuses a note with a check."}
    },
   {
    "id": "j054",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品114,500円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 114,500 yen and paid by issuing a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 114500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 114500
     }
    ],
    "accounts": [
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     }
    ],
      "exp": {"ja":"仕入は費用で借方、手形を振り出して払うので貸方は支払手形になる。金額は114,500円。当座預金から払うのは手形が満期になったときで、振出時ではない。","en":"Purchases is an expense on the debit side; paying by issuing a note puts Notes payable on the credit side. The amount is 114,500 yen. Checking is reduced when the note matures, not when it is issued."}
    },
   {
    "id": "j055",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を153,600円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 153,600 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 153600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 153600
     }
    ],
    "accounts": [
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     }
    ],
      "exp": {"ja":"商品の販売代金は売価で「売上」に記入する。現金で受け取ったので借方は現金、金額は153,600円。現金を貸方、売上を借方と逆にする誤りに注意する。","en":"The selling price is recorded in Sales. Cash was received, so Cash is debited, and the amount is 153,600 yen. Do not reverse the sides by crediting Cash and debiting Sales."}
    },
   {
    "id": "j056",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を192,700円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 192,700 yen on account (payment to be received later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 192700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 192700
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"売上は収益で貸方、掛けは代金が未回収なので資産の売掛金が借方に増える。金額は192,700円。受取手形は手形を受け取ったときの勘定で、本問では誤り。","en":"Sales is revenue on the credit side. Because the price is uncollected, the asset Accounts receivable increases on the debit side. The amount is 192,700 yen. Notes receivable is used only when a note is received, so it is wrong here."}
    },
   {
    "id": "j057",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を231,800円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 231,800 yen and received a check drawn by our own company, which was deposited immediately into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 231800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 231800
     }
    ],
    "accounts": [
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"売上231,800円を貸方に記入する。代金は小切手だが、問題文で当座預金とあるので借方は当座預金になる。他店振出の小切手を受け取って手元に置く場合は現金で処理する点と区別する。","en":"Sales of 231,800 yen is credited. The payment was a check, but the problem says it was put into the checking account, so Checking is debited. This differs from holding a check received from another company, which is treated as Cash."}
    },
   {
    "id": "j058",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品の注文を受け、手付金270,900円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 270,900 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 270900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 270900
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     }
    ],
      "exp": {"ja":"手付金の受取は、貸方に前受金（負債の増加）、借方に現金を記入する。270,900円が両方に入る。売上に計上するのは商品を引き渡したときで、受取時ではない。","en":"Receiving a deposit credits Advance received (a liability increase) and debits Cash. 270,900 yen goes on both sides. Sales is recorded when the goods are delivered, not when the deposit is received."}
    },
   {
    "id": "j059",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を注文し、手付金310,000円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 310,000 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 310000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 310000
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     }
    ],
      "exp": {"ja":"手付金の支払は、借方に前払金（資産の増加）、貸方に現金を記入する。310,000円が両方に入る。仕入に計上するのは商品を受け取ったときで、支払時ではない。","en":"Paying a deposit debits Advance paid (an asset increase) and credits Cash. 310,000 yen goes on both sides. Purchases is recorded when the goods are received, not when the deposit is paid."}
    },
   {
    "id": "j060",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を349,100円でクレジット払いの条件で販売した(手数料13,964円は販売時計上)。",
     "en": "Sold merchandise for 349,100 yen under credit card payment terms. The fee of 13,964 yen is recorded at the time of the sale."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 335136
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 13964
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 349100
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"売上は349,100円全額を貸方に記入する。手数料13,964円は販売時に費用（支払手数料）とし、残りの349,100−13,964＝335,136円がクレジット売掛金。売上から手数料を引いて貸方に書く誤りに注意する。","en":"Sales is credited for the full 349,100 yen. The 13,964 yen fee is expensed at the time of sale as Fee expense, and the remaining 349,100 − 13,964 = 335,136 yen is Credit card receivable. Do not credit Sales net of the fee."}
    },
   {
    "id": "j061",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品388,200円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 388,200 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 388200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 388200
     }
    ],
    "accounts": [
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     }
    ],
      "exp": {"ja":"商品を仕入れたので、三分法では借方を「仕入」（費用）とする。代金を現金で払ったので貸方は現金（資産の減少）。金額は388,200円。借方を「商品」とする分記法の処理は誤り。","en":"Under the three-account method, goods bought are debited to Purchases (an expense). Paying cash reduces an asset, so Cash is credited. The amount is 388,200 yen. Debiting Merchandise, as the split-account method does, is a mistake."}
    },
   {
    "id": "j062",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品427,300円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 427,300 yen on account (payment due later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 427300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 427300
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     }
    ],
      "exp": {"ja":"商品の仕入なので借方は「仕入」。代金は後払いなので、将来支払う義務として貸方は買掛金（負債の増加）。金額は427,300円。商品以外の後払いに使う未払金と取り違える誤りが多い。","en":"Goods bought are debited to Purchases. Payment comes later, so the obligation is credited to Accounts payable (a liability increase). The amount is 427,300 yen. A common error is using Other payable, which is for non-merchandise items."}
    },
   {
    "id": "j063",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品466,400円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 466,400 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 466400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 466400
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"商品の仕入は借方「仕入」。自社が小切手を振り出すと当座預金の残高が減るので、貸方は当座預金。金額は466,400円。貸方を現金とする誤りが多い。","en":"Goods bought are debited to Purchases. Issuing our own check reduces the checking account balance, so Checking is credited. The amount is 466,400 yen. Crediting Cash is a common error."}
    },
   {
    "id": "j064",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品505,500円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 505,500 yen and paid by issuing a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 505500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 505500
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"商品の仕入なので借方は「仕入」。約束手形を振り出したので、後日支払う義務として貸方は支払手形（負債の増加）。金額は505,500円。買掛金とする誤りは、手形を使った点の見落とし。","en":"Goods bought are debited to Purchases. A promissory note was issued, so the obligation to pay later is credited to Notes payable (a liability increase). The amount is 505,500 yen. Using Accounts payable overlooks that a note was issued."}
    },
   {
    "id": "j065",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を544,600円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 544,600 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 544600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 544600
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」（収益）。代金を現金で受け取ったので借方は現金（資産の増加）。金額は544,600円。貸方を商品とする分記法の処理は誤り。","en":"Selling goods is revenue, so Sales is credited. Cash was received, so Cash (an asset increase) is debited. The amount is 544,600 yen. Crediting Merchandise, as in the split-account method, is a mistake."}
    },
   {
    "id": "j066",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を583,700円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 583,700 yen on account (payment to be received later)."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 583700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 583700
     }
    ],
    "accounts": [
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」。代金は後で受け取るので、借方は売掛金（債権の増加）。金額は583,700円。商品以外の後日受取に使う未収入金と取り違える誤りが多い。","en":"Selling goods credits Sales. The price will be collected later, so Accounts receivable (a receivable increase) is debited. The amount is 583,700 yen. A common error is using Other receivable, which is for non-merchandise items."}
    },
   {
    "id": "j067",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を622,800円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 622,800 yen and received a check drawn by our own company, which was deposited immediately into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 622800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 622800
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "土地",
      "en": "Land"
     }
    ],
      "exp": {"ja":"商品を売ったので貸方は「売上」。受け取った小切手を直ちに当座預金に預けたので、借方は当座預金（資産の増加）。金額は622,800円。借方を現金とする誤りは、預け入れの指示の見落とし。","en":"Selling goods credits Sales. The check received was deposited at once into the checking account, so Checking (an asset increase) is debited. The amount is 622,800 yen. Debiting Cash overlooks the immediate deposit."}
    },
   {
    "id": "j068",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品の注文を受け、手付金661,900円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 661,900 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 661900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 661900
     }
    ],
    "accounts": [
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を引き渡すまで売上にならず、後で商品を渡す義務なので前受金（負債）で処理する。現金が増えるので借方は現金。金額は問題文の661,900円。貸方を売上とする誤りが多い。","en":"An advance received at the time of the order is not Sales until the goods are delivered; it is an obligation to deliver later, so it is Advance received (a liability). Cash increases and is debited. The amount is the 661,900 yen in the problem. Crediting Sales is a common error."}
    },
   {
    "id": "j069",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を注文し、手付金701,000円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 701,000 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 701000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 701000
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     }
    ],
      "exp": {"ja":"注文時の手付金は、商品を受け取るまで仕入にならず、後で商品を受け取る権利なので前払金（資産）で処理する。現金が減るので貸方は現金。金額は問題文の701,000円。借方を仕入とする誤りが多い。","en":"An advance paid at the time of the order is not Purchases until the goods are received; it is a right to receive goods later, so it is Advance paid (an asset). Cash decreases and is credited. The amount is the 701,000 yen in the problem. Debiting Purchases is a common error."}
    },
   {
    "id": "j070",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を740,100円でクレジット払いの条件で販売した(手数料29,604円は販売時計上)。",
     "en": "Sold merchandise for 740,100 yen under credit card payment terms. The fee of 29,604 yen is recorded at the time of the sale."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 710496
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 29604
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 740100
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     }
    ],
      "exp": {"ja":"クレジット払いの販売は、代金を後でカード会社から受け取るのでクレジット売掛金（資産）とする。手数料29,604円は支払手数料（費用）。売掛金は740,100−29,604＝710,496円。手数料を差し引かず全額を売掛金とする誤りが多い。","en":"A card sale is collected later from the card company, so it is recorded as Credit card receivable (an asset). The 29,604 yen fee is Fee expense. The receivable is 740,100 − 29,604 = 710,496 yen. A common error is booking the full amount as the receivable without deducting the fee."}
    },
   {
    "id": "j071",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "現金346,800円を当座預金に預け入れた。",
     "en": "Deposited 346,800 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 346800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 346800
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"現金を当座預金に預けると、当座預金（資産）が増え現金（資産）が減る。借方は当座預金、貸方は現金で、金額は346,800円。普通預金と取り違える誤りに注意する。","en":"Depositing cash into the checking account increases Checking (an asset) and decreases Cash (an asset). Checking is debited and Cash is credited for 346,800 yen. Do not confuse Checking with the ordinary deposit."}
    },
   {
    "id": "j072",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "当座預金から現金385,900円を引き出した。",
     "en": "Withdrew 385,900 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 385900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 385900
     }
    ],
    "accounts": [
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     }
    ],
      "exp": {"ja":"当座預金から現金を引き出すと、現金（資産）が増え当座預金（資産）が減る。借方は現金、貸方は当座預金で、金額は385,900円。預け入れと方向を逆にする誤りが多い。","en":"Withdrawing cash from the checking account increases Cash (an asset) and decreases Checking (an asset). Cash is debited and Checking is credited for 385,900 yen. A common error is reversing the direction as if it were a deposit."}
    },
   {
    "id": "j073",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "現金425,000円を普通預金に預け入れた。",
     "en": "Deposited 425,000 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 425000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 425000
     }
    ],
    "accounts": [
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"現金を普通預金に預けると、普通預金（資産）が増え現金（資産）が減る。借方は普通預金、貸方は現金で、金額は425,000円。当座預金と取り違える誤りに注意する。","en":"Depositing cash into the ordinary deposit account increases Ordinary deposit (an asset) and decreases Cash (an asset). Ordinary deposit is debited and Cash is credited for 425,000 yen. Do not confuse it with the checking account."}
    },
   {
    "id": "j074",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)6,100円の原因が不明なので雑損とした。",
     "en": "At the end of the period, a debit balance of 6,100 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 6100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 6100
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     }
    ],
      "exp": {"ja":"現金過不足の借方残は、実際の現金が帳簿より少なかったことを表す。決算で原因が不明なら雑損（費用）に振り替える。借方は雑損、貸方は現金過不足で6,100円。雑益とする誤りが多い。","en":"A debit balance in Cash over and short means the actual cash was less than the books. At the period end, an unexplained balance is moved to Miscellaneous loss (an expense). Miscellaneous loss is debited and Cash over and short is credited for 6,100 yen. Using Miscellaneous gain is a common error."}
    },
   {
    "id": "j075",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)9,200円の原因が不明なので雑益とした。",
     "en": "At the end of the period, a credit balance of 9,200 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous gain."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 9200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 9200
     }
    ],
    "accounts": [
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     }
    ],
      "exp": {"ja":"現金過不足の貸方残は、実際の現金が帳簿より多かったことを表す。決算で原因が不明なら雑益（収益）に振り替える。借方は現金過不足、貸方は雑益で9,200円。雑損とする誤りが多い。","en":"A credit balance in Cash over and short means the actual cash was more than the books. At the period end, an unexplained balance is moved to Miscellaneous gain (revenue). Cash over and short is debited and Miscellaneous gain is credited for 9,200 yen. Using Miscellaneous loss is a common error."}
    },
   {
    "id": "j076",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "小口現金係から旅費交通費216,920円・通信費189,805円・消耗品費135,575円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported expenses of travel 216,920 yen, communication 189,805 yen and supplies 135,575 yen. The fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 216920
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 189805
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 135575
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 542300
     }
    ],
    "accounts": [
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"小口現金係の報告は、使った費用の分だけ各費用を借方に記入する。補給は小切手なので貸方は当座預金。合計は216,920＋189,805＋135,575＝542,300円。貸方を小口現金や現金とする誤りが多い。","en":"The custodian's report is recorded by debiting each expense actually used. The replenishment was by check, so Checking is credited. The total is 216,920 + 189,805 + 135,575 = 542,300 yen. Crediting Petty cash or Cash is a common error."}
    },
   {
    "id": "j077",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "買掛金の支払として581,400円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid 581,400 yen of accounts payable by bank transfer from the checking account. The transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 581400
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 581600
     }
    ],
    "accounts": [
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"買掛金の支払なので借方は買掛金（負債の減少）。振込手数料は当社負担なので支払手数料（費用）。当座預金から出る額は581,400＋200＝581,600円。手数料を買掛金に含める誤りが多い。","en":"Paying Accounts payable debits Accounts payable (a liability decrease). The transfer fee is borne by us, so it is Fee expense. The amount leaving Checking is 581,400 + 200 = 581,600 yen. A common error is including the fee in Accounts payable."}
    },
   {
    "id": "j078",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "現金620,500円を当座預金に預け入れた。",
     "en": "Deposited 620,500 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 620500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 620500
     }
    ],
    "accounts": [
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     }
    ],
      "exp": {"ja":"預け入れは資産の中での移動。増えた当座預金を借方、減った現金を貸方に620,500円で記入する。借方と貸方を逆にして、現金を借方に書く誤りが多い。","en":"A deposit is a shift within assets. Checking, which increased, is debited and Cash, which decreased, is credited, both for 620,500 yen. A common error is reversing the sides and debiting Cash."}
    },
   {
    "id": "j079",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "当座預金から現金659,600円を引き出した。",
     "en": "Withdrew 659,600 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 659600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 659600
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"引出しは資産の中での移動。増えた現金を借方、減った当座預金を貸方に659,600円で記入する。引き出し先が普通預金ではなく当座預金である点に注意する。","en":"A withdrawal is a shift within assets. Cash, which increased, is debited and Checking, which decreased, is credited, both for 659,600 yen. Note that the account is the checking account, not the ordinary deposit."}
    },
   {
    "id": "j080",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "現金698,700円を普通預金に預け入れた。",
     "en": "Deposited 698,700 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 698700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 698700
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"預け入れは資産の中での移動。増えた普通預金を借方、減った現金を貸方に698,700円で記入する。現金を借方に書く逆仕訳の誤りが多い。","en":"A deposit is a shift within assets. Ordinary deposit, which increased, is debited and Cash, which decreased, is credited, both for 698,700 yen. A common error is the reversed entry that debits Cash."}
    },
   {
    "id": "j081",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)9,800円の原因が不明なので雑損とした。",
     "en": "At the end of the period, a debit balance of 9,800 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 9800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 9800
     }
    ],
    "accounts": [
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     }
    ],
      "exp": {"ja":"借方に残った現金過不足9,800円を消すため、貸方に現金過不足を記入する。相手は原因不明の不足なので借方の雑損。残高の側と逆に記入して、現金過不足を借方に書く誤りに注意する。","en":"To clear the 9,800 yen debit balance in Cash over and short, it is credited. The unexplained shortage is debited to Miscellaneous loss. Do not debit Cash over and short again; the entry goes on the opposite side of the balance."}
    },
   {
    "id": "j082",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)3,900円の原因が不明なので雑益とした。",
     "en": "At the end of the period, a credit balance of 3,900 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous gain."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 3900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 3900
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"貸方に残った現金過不足3,900円を消すため、借方に現金過不足を記入する。相手は原因不明の過剰なので貸方の雑益。残高の側と逆に記入する点を取り違え、貸方に書く誤りに注意する。","en":"To clear the 3,900 yen credit balance in Cash over and short, it is debited. The unexplained excess is credited to Miscellaneous gain. Do not credit Cash over and short again; the entry goes on the opposite side of the balance."}
    },
   {
    "id": "j083",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "小口現金係から旅費交通費326,400円・通信費285,600円・消耗品費204,000円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported expenses of travel 326,400 yen, communication 285,600 yen and supplies 204,000 yen. The fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 326400
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 285600
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 204000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 816000
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     }
    ],
      "exp": {"ja":"旅費交通費、通信費、消耗品費をそれぞれ借方に記入する。補給額は使った額と同じ326,400＋285,600＋204,000＝816,000円で、小切手の振出なので当座預金が減る。費用を一括して雑費にする誤りに注意する。","en":"Travel expense, Communication expense and Supplies expense are each debited. The replenishment equals the amount used, 326,400 + 285,600 + 204,000 = 816,000 yen, and issuing a check reduces Checking. Do not lump the expenses into Miscellaneous expense."}
    },
   {
    "id": "j084",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "買掛金の支払として855,100円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid 855,100 yen of accounts payable by bank transfer from the checking account. The transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 855100
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 855300
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"買掛金855,100円と手数料200円を借方に分けて記入し、貸方は当座預金から実際に出た855,100＋200＝855,300円とする。手数料を差し引いた855,100円だけを貸方に書く誤りに注意する。","en":"Accounts payable of 855,100 yen and the fee of 200 yen are debited separately, and Checking is credited for the amount that actually left, 855,100 + 200 = 855,300 yen. Do not credit only 855,100 yen."}
    },
   {
    "id": "j085",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "現金894,200円を当座預金に預け入れた。",
     "en": "Deposited 894,200 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 894200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 894200
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     }
    ],
      "exp": {"ja":"現金を当座預金に預けると、当座預金（資産）が増え現金（資産）が減る。借方は当座預金、貸方は現金で、金額は894,200円。普通預金と取り違える誤りに注意する。","en":"Depositing cash into the checking account increases Checking (an asset) and decreases Cash (an asset). Checking is debited and Cash is credited for 894,200 yen. Do not confuse Checking with the ordinary deposit."}
    },
   {
    "id": "j086",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "当座預金から現金933,300円を引き出した。",
     "en": "Withdrew 933,300 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 933300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 933300
     }
    ],
    "accounts": [
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"当座預金から現金を引き出すと、現金（資産）が増え当座預金（資産）が減る。借方は現金、貸方は当座預金で、金額は933,300円。預け入れと方向を逆にする誤りが多い。","en":"Withdrawing cash from the checking account increases Cash (an asset) and decreases Checking (an asset). Cash is debited and Checking is credited for 933,300 yen. A common error is reversing the direction as if it were a deposit."}
    },
   {
    "id": "j087",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "現金972,400円を普通預金に預け入れた。",
     "en": "Deposited 972,400 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 972400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 972400
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"現金を普通預金に預けると、普通預金（資産）が増え現金（資産）が減る。借方は普通預金、貸方は現金で、金額は972,400円。当座預金と取り違える誤りに注意する。","en":"Depositing cash into the ordinary deposit account increases Ordinary deposit (an asset) and decreases Cash (an asset). Ordinary deposit is debited and Cash is credited for 972,400 yen. Do not confuse it with the checking account."}
    },
   {
    "id": "j088",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)1,100円の原因が不明なので雑損とした。",
     "en": "At the end of the period, a debit balance of 1,100 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 1100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 1100
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"現金過不足の借方残は、実際の現金が帳簿より少なかったことを表す。決算で原因が不明なら雑損（費用）に振り替える。借方は雑損、貸方は現金過不足で1,100円。雑益とする誤りが多い。","en":"A debit balance in Cash over and short means the actual cash was less than the books. At the period end, an unexplained balance is moved to Miscellaneous loss (an expense). Miscellaneous loss is debited and Cash over and short is credited for 1,100 yen. Using Miscellaneous gain is a common error."}
    },
   {
    "id": "j089",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)4,200円の原因が不明なので雑益とした。",
     "en": "At the end of the period, a credit balance of 4,200 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous gain."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 4200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 4200
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     }
    ],
      "exp": {"ja":"現金過不足の貸方残は、実際の現金が帳簿より多かったことを表す。決算で原因が不明なら雑益（収益）に振り替える。借方は現金過不足、貸方は雑益で4,200円。雑損とする誤りが多い。","en":"A credit balance in Cash over and short means the actual cash was more than the books. At the period end, an unexplained balance is moved to Miscellaneous gain (revenue). Cash over and short is debited and Miscellaneous gain is credited for 4,200 yen. Using Miscellaneous loss is a common error."}
    },
   {
    "id": "j090",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "小口現金係から旅費交通費42,120円・通信費36,855円・消耗品費26,325円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported expenses of travel 42,120 yen, communication 36,855 yen and supplies 26,325 yen. The fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 42120
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 36855
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 26325
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 105300
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     }
    ],
      "exp": {"ja":"小口現金係の報告は、使った費用の分だけ各費用を借方に記入する。補給は小切手なので貸方は当座預金。合計は42,120＋36,855＋26,325＝105,300円。貸方を小口現金や現金とする誤りが多い。","en":"The custodian's report is recorded by debiting each expense actually used. The replenishment was by check, so Checking is credited. The total is 42,120 + 36,855 + 26,325 = 105,300 yen. Crediting Petty cash or Cash is a common error."}
    },
   {
    "id": "j091",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "買掛金の支払として144,400円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid 144,400 yen of accounts payable by bank transfer from the checking account. The transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 144400
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 144600
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     }
    ],
      "exp": {"ja":"買掛金の支払なので借方は買掛金（負債の減少）。振込手数料は当社負担なので支払手数料（費用）。当座預金から出る額は144,400＋200＝144,600円。手数料を買掛金に含める誤りが多い。","en":"Paying Accounts payable debits Accounts payable (a liability decrease). The transfer fee is borne by us, so it is Fee expense. The amount leaving Checking is 144,400 + 200 = 144,600 yen. A common error is including the fee in Accounts payable."}
    },
   {
    "id": "j092",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "現金183,500円を当座預金に預け入れた。",
     "en": "Deposited 183,500 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 183500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 183500
     }
    ],
    "accounts": [
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"預け入れは資産の中での移動。増えた当座預金を借方、減った現金を貸方に183,500円で記入する。借方と貸方を逆にして、現金を借方に書く誤りが多い。","en":"A deposit is a shift within assets. Checking, which increased, is debited and Cash, which decreased, is credited, both for 183,500 yen. A common error is reversing the sides and debiting Cash."}
    },
   {
    "id": "j093",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "当座預金から現金222,600円を引き出した。",
     "en": "Withdrew 222,600 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 222600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 222600
     }
    ],
    "accounts": [
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"引出しは資産の中での移動。増えた現金を借方、減った当座預金を貸方に222,600円で記入する。引き出し先が普通預金ではなく当座預金である点に注意する。","en":"A withdrawal is a shift within assets. Cash, which increased, is debited and Checking, which decreased, is credited, both for 222,600 yen. Note that the account is the checking account, not the ordinary deposit."}
    },
   {
    "id": "j094",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "現金261,700円を普通預金に預け入れた。",
     "en": "Deposited 261,700 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 261700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 261700
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"預け入れは資産の中での移動。増えた普通預金を借方、減った現金を貸方に261,700円で記入する。現金を借方に書く逆仕訳の誤りが多い。","en":"A deposit is a shift within assets. Ordinary deposit, which increased, is debited and Cash, which decreased, is credited, both for 261,700 yen. A common error is the reversed entry that debits Cash."}
    },
   {
    "id": "j095",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)4,800円の原因が不明なので雑損とした。",
     "en": "At the end of the period, a debit balance of 4,800 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 4800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 4800
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"借方に残った現金過不足4,800円を消すため、貸方に現金過不足を記入する。相手は原因不明の不足なので借方の雑損。残高の側と逆に記入して、現金過不足を借方に書く誤りに注意する。","en":"To clear the 4,800 yen debit balance in Cash over and short, it is credited. The unexplained shortage is debited to Miscellaneous loss. Do not debit Cash over and short again; the entry goes on the opposite side of the balance."}
    },
   {
    "id": "j096",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)7,900円の原因が不明なので雑益とした。",
     "en": "At the end of the period, a credit balance of 7,900 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous gain."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 7900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 7900
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"貸方に残った現金過不足7,900円を消すため、借方に現金過不足を記入する。相手は原因不明の過剰なので貸方の雑益。残高の側と逆に記入する点を取り違え、貸方に書く誤りに注意する。","en":"To clear the 7,900 yen credit balance in Cash over and short, it is debited. The unexplained excess is credited to Miscellaneous gain. Do not credit Cash over and short again; the entry goes on the opposite side of the balance."}
    },
   {
    "id": "j097",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "小口現金係から旅費交通費151,600円・通信費132,650円・消耗品費94,750円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported expenses of travel 151,600 yen, communication 132,650 yen and supplies 94,750 yen. The fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 151600
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 132650
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 94750
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 379000
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     }
    ],
      "exp": {"ja":"旅費交通費、通信費、消耗品費をそれぞれ借方に記入する。補給額は使った額と同じ151,600＋132,650＋94,750＝379,000円で、小切手の振出なので当座預金が減る。費用を一括して雑費にする誤りに注意する。","en":"Travel expense, Communication expense and Supplies expense are each debited. The replenishment equals the amount used, 151,600 + 132,650 + 94,750 = 379,000 yen, and issuing a check reduces Checking. Do not lump the expenses into Miscellaneous expense."}
    },
   {
    "id": "j098",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "買掛金の支払として418,100円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid 418,100 yen of accounts payable by bank transfer from the checking account. The transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 418100
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 418300
     }
    ],
    "accounts": [
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     }
    ],
      "exp": {"ja":"買掛金418,100円と手数料200円を借方に分けて記入し、貸方は当座預金から実際に出た418,100＋200＝418,300円とする。手数料を差し引いた418,100円だけを貸方に書く誤りに注意する。","en":"Accounts payable of 418,100 yen and the fee of 200 yen are debited separately, and Checking is credited for the amount that actually left, 418,100 + 200 = 418,300 yen. Do not credit only 418,100 yen."}
    },
   {
    "id": "j099",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "現金457,200円を当座預金に預け入れた。",
     "en": "Deposited 457,200 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 457200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 457200
     }
    ],
    "accounts": [
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"現金を当座預金に預けると、当座預金（資産）が増え現金（資産）が減る。借方は当座預金、貸方は現金で、金額は457,200円。普通預金と取り違える誤りに注意する。","en":"Depositing cash into the checking account increases Checking (an asset) and decreases Cash (an asset). Checking is debited and Cash is credited for 457,200 yen. Do not confuse Checking with the ordinary deposit."}
    },
   {
    "id": "j100",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "当座預金から現金496,300円を引き出した。",
     "en": "Withdrew 496,300 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 496300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 496300
     }
    ],
    "accounts": [
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"当座預金から現金を引き出すと、現金（資産）が増え当座預金（資産）が減る。借方は現金、貸方は当座預金で、金額は496,300円。預け入れと方向を逆にする誤りが多い。","en":"Withdrawing cash from the checking account increases Cash (an asset) and decreases Checking (an asset). Cash is debited and Checking is credited for 496,300 yen. A common error is reversing the direction as if it were a deposit."}
    },
   {
    "id": "j101",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "現金535,400円を普通預金に預け入れた。",
     "en": "Deposited 535,400 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 535400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 535400
     }
    ],
    "accounts": [
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"現金を普通預金に預けると、普通預金（資産）が増え現金（資産）が減る。借方は普通預金、貸方は現金で、金額は535,400円。当座預金と取り違える誤りに注意する。","en":"Depositing cash into the ordinary deposit account increases Ordinary deposit (an asset) and decreases Cash (an asset). Ordinary deposit is debited and Cash is credited for 535,400 yen. Do not confuse it with the checking account."}
    },
   {
    "id": "j102",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)8,500円の原因が不明なので雑損とした。",
     "en": "At the end of the period, a debit balance of 8,500 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 8500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 8500
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     }
    ],
      "exp": {"ja":"現金過不足の借方残は、実際の現金が帳簿より少なかったことを表す。決算で原因が不明なら雑損（費用）に振り替える。借方は雑損、貸方は現金過不足で8,500円。雑益とする誤りが多い。","en":"A debit balance in Cash over and short means the actual cash was less than the books. At the period end, an unexplained balance is moved to Miscellaneous loss (an expense). Miscellaneous loss is debited and Cash over and short is credited for 8,500 yen. Using Miscellaneous gain is a common error."}
    },
   {
    "id": "j103",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)2,600円の原因が不明なので雑益とした。",
     "en": "At the end of the period, a credit balance of 2,600 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous gain."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 2600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 2600
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     }
    ],
      "exp": {"ja":"現金過不足の貸方残は、実際の現金が帳簿より多かったことを表す。決算で原因が不明なら雑益（収益）に振り替える。借方は現金過不足、貸方は雑益で2,600円。雑損とする誤りが多い。","en":"A credit balance in Cash over and short means the actual cash was more than the books. At the period end, an unexplained balance is moved to Miscellaneous gain (revenue). Cash over and short is debited and Miscellaneous gain is credited for 2,600 yen. Using Miscellaneous loss is a common error."}
    },
   {
    "id": "j104",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "小口現金係から旅費交通費261,080円・通信費228,445円・消耗品費163,175円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported expenses of travel 261,080 yen, communication 228,445 yen and supplies 163,175 yen. The fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 261080
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 228445
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 163175
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 652700
     }
    ],
    "accounts": [
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"小口現金係の報告は、使った費用の分だけ各費用を借方に記入する。補給は小切手なので貸方は当座預金。合計は261,080＋228,445＋163,175＝652,700円。貸方を小口現金や現金とする誤りが多い。","en":"The custodian's report is recorded by debiting each expense actually used. The replenishment was by check, so Checking is credited. The total is 261,080 + 228,445 + 163,175 = 652,700 yen. Crediting Petty cash or Cash is a common error."}
    },
   {
    "id": "j105",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "買掛金の支払として691,800円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid 691,800 yen of accounts payable by bank transfer from the checking account. The transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 691800
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 692000
     }
    ],
    "accounts": [
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"買掛金の支払なので借方は買掛金（負債の減少）。振込手数料は当社負担なので支払手数料（費用）。当座預金から出る額は691,800＋200＝692,000円。手数料を買掛金に含める誤りが多い。","en":"Paying Accounts payable debits Accounts payable (a liability decrease). The transfer fee is borne by us, so it is Fee expense. The amount leaving Checking is 691,800 + 200 = 692,000 yen. A common error is including the fee in Accounts payable."}
    },
   {
    "id": "j106",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "現金730,900円を当座預金に預け入れた。",
     "en": "Deposited 730,900 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 730900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 730900
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"預け入れは資産の中での移動。増えた当座預金を借方、減った現金を貸方に730,900円で記入する。借方と貸方を逆にして、現金を借方に書く誤りが多い。","en":"A deposit is a shift within assets. Checking, which increased, is debited and Cash, which decreased, is credited, both for 730,900 yen. A common error is reversing the sides and debiting Cash."}
    },
   {
    "id": "j107",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "当座預金から現金770,000円を引き出した。",
     "en": "Withdrew 770,000 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 770000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 770000
     }
    ],
    "accounts": [
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     }
    ],
      "exp": {"ja":"引出しは資産の中での移動。増えた現金を借方、減った当座預金を貸方に770,000円で記入する。引き出し先が普通預金ではなく当座預金である点に注意する。","en":"A withdrawal is a shift within assets. Cash, which increased, is debited and Checking, which decreased, is credited, both for 770,000 yen. Note that the account is the checking account, not the ordinary deposit."}
    },
   {
    "id": "j108",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "現金809,100円を普通預金に預け入れた。",
     "en": "Deposited 809,100 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 809100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 809100
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"預け入れは資産の中での移動。増えた普通預金を借方、減った現金を貸方に809,100円で記入する。現金を借方に書く逆仕訳の誤りが多い。","en":"A deposit is a shift within assets. Ordinary deposit, which increased, is debited and Cash, which decreased, is credited, both for 809,100 yen. A common error is the reversed entry that debits Cash."}
    },
   {
    "id": "j109",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)3,200円の原因が不明なので雑損とした。",
     "en": "At the end of the period, a debit balance of 3,200 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 3200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 3200
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     }
    ],
      "exp": {"ja":"借方に残った現金過不足3,200円を消すため、貸方に現金過不足を記入する。相手は原因不明の不足なので借方の雑損。残高の側と逆に記入して、現金過不足を借方に書く誤りに注意する。","en":"To clear the 3,200 yen debit balance in Cash over and short, it is credited. The unexplained shortage is debited to Miscellaneous loss. Do not debit Cash over and short again; the entry goes on the opposite side of the balance."}
    },
   {
    "id": "j110",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)6,300円の原因が不明なので雑益とした。",
     "en": "At the end of the period, a credit balance of 6,300 yen in Cash over and short remained and its cause could not be determined, so it was transferred to Miscellaneous gain."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 6300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 6300
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     }
    ],
      "exp": {"ja":"貸方に残った現金過不足6,300円を消すため、借方に現金過不足を記入する。相手は原因不明の過剰なので貸方の雑益。残高の側と逆に記入する点を取り違え、貸方に書く誤りに注意する。","en":"To clear the 6,300 yen credit balance in Cash over and short, it is debited. The unexplained excess is credited to Miscellaneous gain. Do not credit Cash over and short again; the entry goes on the opposite side of the balance."}
    },
   {
    "id": "j111",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "小口現金係から旅費交通費370,560円・通信費324,240円・消耗品費231,600円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported expenses of travel 370,560 yen, communication 324,240 yen and supplies 231,600 yen. The fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 370560
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 324240
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 231600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 926400
     }
    ],
    "accounts": [
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     }
    ],
      "exp": {"ja":"旅費交通費、通信費、消耗品費をそれぞれ借方に記入する。補給額は使った額と同じ370,560＋324,240＋231,600＝926,400円で、小切手の振出なので当座預金が減る。費用を一括して雑費にする誤りに注意する。","en":"Travel expense, Communication expense and Supplies expense are each debited. The replenishment equals the amount used, 370,560 + 324,240 + 231,600 = 926,400 yen, and issuing a check reduces Checking. Do not lump the expenses into Miscellaneous expense."}
    },
   {
    "id": "j112",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "買掛金の支払として965,500円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid 965,500 yen of accounts payable by bank transfer from the checking account. The transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 965500
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 965700
     }
    ],
    "accounts": [
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"買掛金965,500円と手数料200円を借方に分けて記入し、貸方は当座預金から実際に出た965,500＋200＝965,700円とする。手数料を差し引いた965,500円だけを貸方に書く誤りに注意する。","en":"Accounts payable of 965,500 yen and the fee of 200 yen are debited separately, and Checking is credited for the amount that actually left, 965,500 + 200 = 965,700 yen. Do not credit only 965,500 yen."}
    },
   {
    "id": "j113",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "現金20,200円を当座預金に預け入れた。",
     "en": "Deposited 20,200 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 20200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 20200
     }
    ],
    "accounts": [
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"現金を当座預金に預けると、当座預金（資産）が増え現金（資産）が減る。借方は当座預金、貸方は現金で、金額は20,200円。普通預金と取り違える誤りに注意する。","en":"Depositing cash into the checking account increases Checking (an asset) and decreases Cash (an asset). Checking is debited and Cash is credited for 20,200 yen. Do not confuse Checking with the ordinary deposit."}
    },
   {
    "id": "j114",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "当座預金から現金59,300円を引き出した。",
     "en": "Withdrew 59,300 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 59300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 59300
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     }
    ],
      "exp": {"ja":"当座預金から現金を引き出すと、現金（資産）が増え当座預金（資産）が減る。借方は現金、貸方は当座預金で、金額は59,300円。預け入れと方向を逆にする誤りが多い。","en":"Withdrawing cash from the checking account increases Cash (an asset) and decreases Checking (an asset). Cash is debited and Checking is credited for 59,300 yen. A common error is reversing the direction as if it were a deposit."}
    },
   {
    "id": "j115",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "現金98,400円を普通預金に預け入れた。",
     "en": "Deposited 98,400 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 98400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 98400
     }
    ],
    "accounts": [
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"現金を普通預金に預けると、普通預金（資産）が増え現金（資産）が減る。借方は普通預金、貸方は現金で、金額は98,400円。当座預金と取り違える誤りに注意する。","en":"Depositing cash into the ordinary deposit account increases Ordinary deposit (an asset) and decreases Cash (an asset). Ordinary deposit is debited and Cash is credited for 98,400 yen. Do not confuse it with the checking account."}
    },
   {
    "id": "j116",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "かねて振り出した約束手形703,300円が満期となり当座預金から支払われた。",
     "en": "A promissory note we had issued earlier, 703,300 yen, matured and was paid from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 703300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 703300
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     }
    ],
      "exp": {"ja":"自社が振り出した約束手形が満期になり支払われたので、支払手形（負債）が減り借方に記入する。当座預金（資産）も減り貸方。金額は703,300円。受取手形とする誤りが多い。","en":"Our own promissory note matured and was paid, so Notes payable (a liability) decreases and is debited. Checking (an asset) also decreases and is credited. The amount is 703,300 yen. Using Notes receivable is a common error."}
    },
   {
    "id": "j117",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "売掛金742,400円を現金で回収した。",
     "en": "Collected 742,400 yen of accounts receivable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 742400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 742400
     }
    ],
    "accounts": [
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     }
    ],
      "exp": {"ja":"売掛金を回収したので売掛金（資産）が減り、貸方に記入する。現金が増えるので借方は現金。金額は742,400円。貸方を売上とする誤りは、売上を二重に計上してしまう。","en":"Collecting a receivable decreases Accounts receivable (an asset), which is credited. Cash increases and is debited. The amount is 742,400 yen. Crediting Sales is wrong because it would record the revenue a second time."}
    },
   {
    "id": "j118",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "買掛金781,500円を現金で支払った。",
     "en": "Paid 781,500 yen of accounts payable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 781500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 781500
     }
    ],
    "accounts": [
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     }
    ],
      "exp": {"ja":"買掛金を支払ったので買掛金（負債）が減り、借方に記入する。現金が減るので貸方は現金。金額は781,500円。借方を仕入とする誤りは、仕入を二重に計上してしまう。","en":"Paying a payable decreases Accounts payable (a liability), which is debited. Cash decreases and is credited. The amount is 781,500 yen. Debiting Purchases is wrong because it would record the purchase a second time."}
    },
   {
    "id": "j119",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "従業員が負担すべき費用820,600円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 820,600 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 820600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 820600
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"従業員のために代わりに払った金額は、後で従業員から返してもらう権利なので立替金（資産）を借方に記入する。現金が減るので貸方は現金で820,600円。費用の勘定にする誤りが多い。","en":"Money paid on behalf of an employee is a right to be repaid later, so Advances to others (an asset) is debited. Cash decreases and is credited for 820,600 yen. Recording it in an expense account is a common error."}
    },
   {
    "id": "j120",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "給料859,700円のうち源泉所得税85,970円を預り、残額を現金で支払った。",
     "en": "Paid salaries of 859,700 yen in cash after withholding income tax of 85,970 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "給料",
       "en": "Salaries expense"
      },
      "amt": 859700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 85970
     },
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 773730
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     }
    ],
      "exp": {"ja":"給料は費用なので総額859,700円を借方に記入する。源泉所得税85,970円は会社が従業員に代わって納める預り金（負債）。現金で払う額は859,700−85,970＝773,730円。給料を手取り額で記入する誤りが多い。","en":"Salaries expense is debited for the gross amount of 859,700 yen. The withheld income tax of 85,970 yen is Deposits received (a liability), held for payment to the tax office. Cash paid is 859,700 − 85,970 = 773,730 yen. Recording salaries at the net amount is a common error."}
    },
   {
    "id": "j121",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "取引先に現金898,800円を貸し付けた。",
     "en": "Lent 898,800 yen in cash to a business partner."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 898800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 898800
     }
    ],
    "accounts": [
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"取引先に金銭を貸したので、返してもらう権利として貸付金（資産）を借方に記入する。現金が減るので貸方は現金で898,800円。貸方を借入金とする誤りは、貸す側と借りる側の取り違え。","en":"Lending money to a partner creates a right to repayment, so Loans receivable (an asset) is debited. Cash decreases and is credited for 898,800 yen. Using Loans payable mixes up the lender and the borrower."}
    },
   {
    "id": "j122",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "銀行から937,900円を借り入れ、当座預金とした。",
     "en": "Borrowed 937,900 yen from a bank and the proceeds were put into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 937900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 937900
     }
    ],
    "accounts": [
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     }
    ],
      "exp": {"ja":"銀行から借りた金は返す義務なので借入金（負債）を貸方に記入する。当座預金が増えるので借方は当座預金で937,900円。貸方を当座預金とする誤りは、借りる側と貸す側の取り違え。","en":"Money borrowed from a bank must be repaid, so Loans payable (a liability) is credited. Checking increases and is debited for 937,900 yen. Crediting Checking mixes up the borrower and the lender."}
    },
   {
    "id": "j123",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "貸付金977,000円を利息29,310円とともに現金で回収した。",
     "en": "Collected a loan of 977,000 yen together with interest of 29,310 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 1006310
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 977000
     },
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 29310
     }
    ],
    "accounts": [
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     }
    ],
      "exp": {"ja":"貸付金の回収で貸付金977,000円が減り貸方、利息29,310円は受取利息（収益）で貸方。現金で受け取る額は977,000＋29,310＝1,006,310円で借方。利息を貸付金に含める誤りが多い。","en":"Collecting the loan decreases Loans receivable of 977,000 yen, a credit, and the 29,310 yen interest is Interest income (revenue), also a credit. Cash received is 977,000 + 29,310 = 1,006,310 yen, a debit. A common error is including the interest in Loans receivable."}
    },
   {
    "id": "j124",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "借入金31,700円を利息951円とともに小切手で返済した。",
     "en": "Repaid a loan of 31,700 yen together with interest of 951 yen by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 31700
     },
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 951
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 32651
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"借入金の返済で借入金31,700円が減り借方、利息951円は支払利息（費用）で借方。小切手の振出なので貸方は当座預金31,700＋951＝32,651円。利息を借入金に含める誤りが多い。","en":"Repaying the loan decreases Loans payable of 31,700 yen, a debit, and the 951 yen interest is Interest expense, also a debit. Issuing a check reduces Checking by 31,700 + 951 = 32,651 yen, a credit. A common error is including the interest in Loans payable."}
    },
   {
    "id": "j125",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "得意先振出の約束手形70,800円が満期となり当座預金に入金された。",
     "en": "A promissory note drawn by a customer, 70,800 yen, matured and was collected into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 70800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取手形",
       "en": "Notes receivable"
      },
      "amt": 70800
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     }
    ],
      "exp": {"ja":"得意先が振り出した約束手形が満期になり入金されたので、受取手形（資産）が減り貸方に記入する。当座預金（資産）が増えて借方。金額は70,800円。支払手形とする誤りが多い。","en":"A note drawn by a customer matured and was collected, so Notes receivable (an asset) decreases and is credited. Checking (an asset) increases and is debited. The amount is 70,800 yen. Using Notes payable is a common error."}
    },
   {
    "id": "j126",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "かねて振り出した約束手形109,900円が満期となり当座預金から支払われた。",
     "en": "A promissory note we had issued earlier, 109,900 yen, matured and was paid from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 109900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 109900
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     }
    ],
      "exp": {"ja":"手形の決済は、振出時に貸方へ記入した支払手形を借方で消す処理。支払は当座預金からなので貸方は当座預金で109,900円。借方を買掛金とする誤りに注意する。","en":"Settling a note clears the Notes payable that was credited when the note was issued, so it is debited. Payment is from the checking account, so Checking is credited for 109,900 yen. Do not debit Accounts payable."}
    },
   {
    "id": "j127",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "売掛金149,000円を現金で回収した。",
     "en": "Collected 149,000 yen of accounts receivable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 149000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 149000
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     }
    ],
      "exp": {"ja":"掛け売りのときに借方へ記入した売掛金を、回収時に貸方で消す。現金の増加を借方に149,000円で記入する。売掛金を借方に書く方向の誤りに注意する。","en":"The Accounts receivable debited at the credit sale is cleared by crediting it on collection. The cash increase is debited for 149,000 yen. Do not put Accounts receivable on the debit side."}
    },
   {
    "id": "j128",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "買掛金188,100円を現金で支払った。",
     "en": "Paid 188,100 yen of accounts payable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 188100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 188100
     }
    ],
    "accounts": [
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     }
    ],
      "exp": {"ja":"掛け仕入のときに貸方へ記入した買掛金を、支払時に借方で消す。現金の減少を貸方に188,100円で記入する。買掛金を貸方に書く方向の誤りに注意する。","en":"The Accounts payable credited at the credit purchase is cleared by debiting it on payment. The cash decrease is credited for 188,100 yen. Do not put Accounts payable on the credit side."}
    },
   {
    "id": "j129",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "従業員が負担すべき費用227,200円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 227,200 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 227200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 227200
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"立替払いは会社の費用ではなく、あとで回収する債権。借方は立替金、貸方は現金で227,200円。従業員への貸付金や給料とする誤りに注意する。","en":"An advance payment is not the company's expense but a receivable to be collected later. Advances to others is debited and Cash is credited for 227,200 yen. Do not record it as Loans receivable or as Salaries expense."}
    },
   {
    "id": "j130",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "給料266,300円のうち源泉所得税26,630円を預り、残額を現金で支払った。",
     "en": "Paid salaries of 266,300 yen in cash after withholding income tax of 26,630 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "給料",
       "en": "Salaries expense"
      },
      "amt": 266300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 26630
     },
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 239670
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"借方は給料266,300円の総額。貸方は預り金26,630円と、支払った現金239,670円（266,300−26,630）に分かれる。源泉所得税を費用の租税公課とする誤りに注意する。","en":"The debit is the gross salary of 266,300 yen. The credit is split into Deposits received of 26,630 yen and Cash paid of 239,670 yen (266,300 − 26,630). Do not record the withheld tax as a tax expense."}
    },
   {
    "id": "j131",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "取引先に現金305,400円を貸し付けた。",
     "en": "Lent 305,400 yen in cash to a business partner."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 305400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 305400
     }
    ],
    "accounts": [
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     }
    ],
      "exp": {"ja":"貸付は資産の中での振り替え。増えた貸付金を借方、減った現金を貸方に305,400円で記入する。費用や仮払金にする誤りに注意する。","en":"A loan is a shift within assets. Loans receivable, which increased, is debited and Cash, which decreased, is credited, both for 305,400 yen. Do not treat it as an expense."}
    },
   {
    "id": "j132",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "銀行から344,500円を借り入れ、当座預金とした。",
     "en": "Borrowed 344,500 yen from a bank and the proceeds were put into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 344500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 344500
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     }
    ],
      "exp": {"ja":"借入れは資産と負債が同時に増える取引。借方に当座預金、貸方に借入金を344,500円で記入する。当座借越とする誤りは、残高がマイナスになる場合の処理と混同したもの。","en":"Borrowing increases both an asset and a liability. Checking is debited and Loans payable is credited for 344,500 yen. Using an overdraft confuses this with the treatment for a negative account balance."}
    },
   {
    "id": "j133",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "貸付金383,600円を利息11,508円とともに現金で回収した。",
     "en": "Collected a loan of 383,600 yen together with interest of 11,508 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 395108
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 383600
     },
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 11508
     }
    ],
    "accounts": [
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"元本は貸付金、利息は受取利息と分けて貸方に記入する。借方は元利合計の現金383,600＋11,508＝395,108円。受取利息を支払利息と取り違える誤りに注意する。","en":"The principal is credited to Loans receivable and the interest to Interest income, separately. The debit is Cash for principal plus interest, 383,600 + 11,508 = 395,108 yen. Do not confuse Interest income with Interest expense."}
    },
   {
    "id": "j134",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "借入金422,700円を利息12,681円とともに小切手で返済した。",
     "en": "Repaid a loan of 422,700 yen together with interest of 12,681 yen by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 422700
     },
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 12681
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 435381
     }
    ],
    "accounts": [
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     }
    ],
      "exp": {"ja":"元本は借入金、利息は支払利息と分けて借方に記入する。貸方は元利合計の422,700＋12,681＝435,381円を当座預金から。支払利息を受取利息と取り違える誤りに注意する。","en":"The principal is debited to Loans payable and the interest to Interest expense, separately. The credit is Checking for principal plus interest, 422,700 + 12,681 = 435,381 yen. Do not confuse Interest expense with Interest income."}
    },
   {
    "id": "j135",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "得意先振出の約束手形461,800円が満期となり当座預金に入金された。",
     "en": "A promissory note drawn by a customer, 461,800 yen, matured and was collected into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 461800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取手形",
       "en": "Notes receivable"
      },
      "amt": 461800
     }
    ],
    "accounts": [
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     }
    ],
      "exp": {"ja":"手形の取立ては、受け取った時に借方へ記入した受取手形を貸方で消す処理。入金先は当座預金なので借方は当座預金で461,800円。貸方を売掛金とする誤りに注意する。","en":"Collecting a note clears the Notes receivable that was debited when the note was received, so it is credited. The money went into the checking account, so Checking is debited for 461,800 yen. Do not credit Accounts receivable."}
    },
   {
    "id": "j136",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "かねて振り出した約束手形500,900円が満期となり当座預金から支払われた。",
     "en": "A promissory note we had issued earlier, 500,900 yen, matured and was paid from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 500900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 500900
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"自社が振り出した約束手形が満期になり支払われたので、支払手形（負債）が減り借方に記入する。当座預金（資産）も減り貸方。金額は500,900円。受取手形とする誤りが多い。","en":"Our own promissory note matured and was paid, so Notes payable (a liability) decreases and is debited. Checking (an asset) also decreases and is credited. The amount is 500,900 yen. Using Notes receivable is a common error."}
    },
   {
    "id": "j137",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "売掛金540,000円を現金で回収した。",
     "en": "Collected 540,000 yen of accounts receivable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 540000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 540000
     }
    ],
    "accounts": [
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     }
    ],
      "exp": {"ja":"売掛金を回収したので売掛金（資産）が減り、貸方に記入する。現金が増えるので借方は現金。金額は540,000円。貸方を売上とする誤りは、売上を二重に計上してしまう。","en":"Collecting a receivable decreases Accounts receivable (an asset), which is credited. Cash increases and is debited. The amount is 540,000 yen. Crediting Sales is wrong because it would record the revenue a second time."}
    },
   {
    "id": "j138",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "買掛金579,100円を現金で支払った。",
     "en": "Paid 579,100 yen of accounts payable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 579100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 579100
     }
    ],
    "accounts": [
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     }
    ],
      "exp": {"ja":"買掛金を支払ったので買掛金（負債）が減り、借方に記入する。現金が減るので貸方は現金。金額は579,100円。借方を仕入とする誤りは、仕入を二重に計上してしまう。","en":"Paying a payable decreases Accounts payable (a liability), which is debited. Cash decreases and is credited. The amount is 579,100 yen. Debiting Purchases is wrong because it would record the purchase a second time."}
    },
   {
    "id": "j139",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "従業員が負担すべき費用618,200円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 618,200 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 618200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 618200
     }
    ],
    "accounts": [
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     }
    ],
      "exp": {"ja":"従業員のために代わりに払った金額は、後で従業員から返してもらう権利なので立替金（資産）を借方に記入する。現金が減るので貸方は現金で618,200円。費用の勘定にする誤りが多い。","en":"Money paid on behalf of an employee is a right to be repaid later, so Advances to others (an asset) is debited. Cash decreases and is credited for 618,200 yen. Recording it in an expense account is a common error."}
    },
   {
    "id": "j140",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "給料657,300円のうち源泉所得税65,730円を預り、残額を現金で支払った。",
     "en": "Paid salaries of 657,300 yen in cash after withholding income tax of 65,730 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "給料",
       "en": "Salaries expense"
      },
      "amt": 657300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 65730
     },
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 591570
     }
    ],
    "accounts": [
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"給料は費用なので総額657,300円を借方に記入する。源泉所得税65,730円は会社が従業員に代わって納める預り金（負債）。現金で払う額は657,300−65,730＝591,570円。給料を手取り額で記入する誤りが多い。","en":"Salaries expense is debited for the gross amount of 657,300 yen. The withheld income tax of 65,730 yen is Deposits received (a liability), held for payment to the tax office. Cash paid is 657,300 − 65,730 = 591,570 yen. Recording salaries at the net amount is a common error."}
    },
   {
    "id": "j141",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "取引先に現金696,400円を貸し付けた。",
     "en": "Lent 696,400 yen in cash to a business partner."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 696400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 696400
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     }
    ],
      "exp": {"ja":"取引先に金銭を貸したので、返してもらう権利として貸付金（資産）を借方に記入する。現金が減るので貸方は現金で696,400円。貸方を借入金とする誤りは、貸す側と借りる側の取り違え。","en":"Lending money to a partner creates a right to repayment, so Loans receivable (an asset) is debited. Cash decreases and is credited for 696,400 yen. Using Loans payable mixes up the lender and the borrower."}
    },
   {
    "id": "j142",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "銀行から735,500円を借り入れ、当座預金とした。",
     "en": "Borrowed 735,500 yen from a bank and the proceeds were put into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 735500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 735500
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     }
    ],
      "exp": {"ja":"銀行から借りた金は返す義務なので借入金（負債）を貸方に記入する。当座預金が増えるので借方は当座預金で735,500円。貸方を当座預金とする誤りは、借りる側と貸す側の取り違え。","en":"Money borrowed from a bank must be repaid, so Loans payable (a liability) is credited. Checking increases and is debited for 735,500 yen. Crediting Checking mixes up the borrower and the lender."}
    },
   {
    "id": "j143",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "貸付金774,600円を利息23,238円とともに現金で回収した。",
     "en": "Collected a loan of 774,600 yen together with interest of 23,238 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 797838
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 774600
     },
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 23238
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     }
    ],
      "exp": {"ja":"貸付金の回収で貸付金774,600円が減り貸方、利息23,238円は受取利息（収益）で貸方。現金で受け取る額は774,600＋23,238＝797,838円で借方。利息を貸付金に含める誤りが多い。","en":"Collecting the loan decreases Loans receivable of 774,600 yen, a credit, and the 23,238 yen interest is Interest income (revenue), also a credit. Cash received is 774,600 + 23,238 = 797,838 yen, a debit. A common error is including the interest in Loans receivable."}
    },
   {
    "id": "j144",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "借入金813,700円を利息24,411円とともに小切手で返済した。",
     "en": "Repaid a loan of 813,700 yen together with interest of 24,411 yen by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 813700
     },
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 24411
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 838111
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"借入金の返済で借入金813,700円が減り借方、利息24,411円は支払利息（費用）で借方。小切手の振出なので貸方は当座預金813,700＋24,411＝838,111円。利息を借入金に含める誤りが多い。","en":"Repaying the loan decreases Loans payable of 813,700 yen, a debit, and the 24,411 yen interest is Interest expense, also a debit. Issuing a check reduces Checking by 813,700 + 24,411 = 838,111 yen, a credit. A common error is including the interest in Loans payable."}
    },
   {
    "id": "j145",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "得意先振出の約束手形852,800円が満期となり当座預金に入金された。",
     "en": "A promissory note drawn by a customer, 852,800 yen, matured and was collected into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 852800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取手形",
       "en": "Notes receivable"
      },
      "amt": 852800
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"得意先が振り出した約束手形が満期になり入金されたので、受取手形（資産）が減り貸方に記入する。当座預金（資産）が増えて借方。金額は852,800円。支払手形とする誤りが多い。","en":"A note drawn by a customer matured and was collected, so Notes receivable (an asset) decreases and is credited. Checking (an asset) increases and is debited. The amount is 852,800 yen. Using Notes payable is a common error."}
    },
   {
    "id": "j146",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "かねて振り出した約束手形891,900円が満期となり当座預金から支払われた。",
     "en": "A promissory note we had issued earlier, 891,900 yen, matured and was paid from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 891900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 891900
     }
    ],
    "accounts": [
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"手形の決済は、振出時に貸方へ記入した支払手形を借方で消す処理。支払は当座預金からなので貸方は当座預金で891,900円。借方を買掛金とする誤りに注意する。","en":"Settling a note clears the Notes payable that was credited when the note was issued, so it is debited. Payment is from the checking account, so Checking is credited for 891,900 yen. Do not debit Accounts payable."}
    },
   {
    "id": "j147",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "売掛金931,000円を現金で回収した。",
     "en": "Collected 931,000 yen of accounts receivable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 931000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 931000
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     }
    ],
      "exp": {"ja":"掛け売りのときに借方へ記入した売掛金を、回収時に貸方で消す。現金の増加を借方に931,000円で記入する。売掛金を借方に書く方向の誤りに注意する。","en":"The Accounts receivable debited at the credit sale is cleared by crediting it on collection. The cash increase is debited for 931,000 yen. Do not put Accounts receivable on the debit side."}
    },
   {
    "id": "j148",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "買掛金970,100円を現金で支払った。",
     "en": "Paid 970,100 yen of accounts payable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 970100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 970100
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"掛け仕入のときに貸方へ記入した買掛金を、支払時に借方で消す。現金の減少を貸方に970,100円で記入する。買掛金を貸方に書く方向の誤りに注意する。","en":"The Accounts payable credited at the credit purchase is cleared by debiting it on payment. The cash decrease is credited for 970,100 yen. Do not put Accounts payable on the credit side."}
    },
   {
    "id": "j149",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "従業員が負担すべき費用24,800円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 24,800 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 24800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 24800
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"立替払いは会社の費用ではなく、あとで回収する債権。借方は立替金、貸方は現金で24,800円。従業員への貸付金や給料とする誤りに注意する。","en":"An advance payment is not the company's expense but a receivable to be collected later. Advances to others is debited and Cash is credited for 24,800 yen. Do not record it as Loans receivable or as Salaries expense."}
    },
   {
    "id": "j150",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "給料63,900円のうち源泉所得税6,390円を預り、残額を現金で支払った。",
     "en": "Paid salaries of 63,900 yen in cash after withholding income tax of 6,390 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "給料",
       "en": "Salaries expense"
      },
      "amt": 63900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 6390
     },
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 57510
     }
    ],
    "accounts": [
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     }
    ],
      "exp": {"ja":"借方は給料63,900円の総額。貸方は預り金6,390円と、支払った現金57,510円（63,900−6,390）に分かれる。源泉所得税を費用の租税公課とする誤りに注意する。","en":"The debit is the gross salary of 63,900 yen. The credit is split into Deposits received of 6,390 yen and Cash paid of 57,510 yen (63,900 − 6,390). Do not record the withheld tax as a tax expense."}
    },
   {
    "id": "j151",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "取引先に現金103,000円を貸し付けた。",
     "en": "Lent 103,000 yen in cash to a business partner."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 103000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 103000
     }
    ],
    "accounts": [
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"貸付は資産の中での振り替え。増えた貸付金を借方、減った現金を貸方に103,000円で記入する。費用や仮払金にする誤りに注意する。","en":"A loan is a shift within assets. Loans receivable, which increased, is debited and Cash, which decreased, is credited, both for 103,000 yen. Do not treat it as an expense."}
    },
   {
    "id": "j152",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "銀行から142,100円を借り入れ、当座預金とした。",
     "en": "Borrowed 142,100 yen from a bank and the proceeds were put into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 142100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 142100
     }
    ],
    "accounts": [
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"借入れは資産と負債が同時に増える取引。借方に当座預金、貸方に借入金を142,100円で記入する。当座借越とする誤りは、残高がマイナスになる場合の処理と混同したもの。","en":"Borrowing increases both an asset and a liability. Checking is debited and Loans payable is credited for 142,100 yen. Using an overdraft confuses this with the treatment for a negative account balance."}
    },
   {
    "id": "j153",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "貸付金181,200円を利息5,436円とともに現金で回収した。",
     "en": "Collected a loan of 181,200 yen together with interest of 5,436 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 186636
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 181200
     },
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 5436
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     }
    ],
      "exp": {"ja":"元本は貸付金、利息は受取利息と分けて貸方に記入する。借方は元利合計の現金181,200＋5,436＝186,636円。受取利息を支払利息と取り違える誤りに注意する。","en":"The principal is credited to Loans receivable and the interest to Interest income, separately. The debit is Cash for principal plus interest, 181,200 + 5,436 = 186,636 yen. Do not confuse Interest income with Interest expense."}
    },
   {
    "id": "j154",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "借入金220,300円を利息6,609円とともに小切手で返済した。",
     "en": "Repaid a loan of 220,300 yen together with interest of 6,609 yen by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 220300
     },
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 6609
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 226909
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"元本は借入金、利息は支払利息と分けて借方に記入する。貸方は元利合計の220,300＋6,609＝226,909円を当座預金から。支払利息を受取利息と取り違える誤りに注意する。","en":"The principal is debited to Loans payable and the interest to Interest expense, separately. The credit is Checking for principal plus interest, 220,300 + 6,609 = 226,909 yen. Do not confuse Interest expense with Interest income."}
    },
   {
    "id": "j155",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "得意先振出の約束手形259,400円が満期となり当座預金に入金された。",
     "en": "A promissory note drawn by a customer, 259,400 yen, matured and was collected into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 259400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取手形",
       "en": "Notes receivable"
      },
      "amt": 259400
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     }
    ],
      "exp": {"ja":"手形の取立ては、受け取った時に借方へ記入した受取手形を貸方で消す処理。入金先は当座預金なので借方は当座預金で259,400円。貸方を売掛金とする誤りに注意する。","en":"Collecting a note clears the Notes receivable that was debited when the note was received, so it is credited. The money went into the checking account, so Checking is debited for 259,400 yen. Do not credit Accounts receivable."}
    },
   {
    "id": "j156",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "かねて振り出した約束手形298,500円が満期となり当座預金から支払われた。",
     "en": "A promissory note we had issued earlier, 298,500 yen, matured and was paid from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 298500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 298500
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     }
    ],
      "exp": {"ja":"自社が振り出した約束手形が満期になり支払われたので、支払手形（負債）が減り借方に記入する。当座預金（資産）も減り貸方。金額は298,500円。受取手形とする誤りが多い。","en":"Our own promissory note matured and was paid, so Notes payable (a liability) decreases and is debited. Checking (an asset) also decreases and is credited. The amount is 298,500 yen. Using Notes receivable is a common error."}
    },
   {
    "id": "j157",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "売掛金337,600円を現金で回収した。",
     "en": "Collected 337,600 yen of accounts receivable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 337600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 337600
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     }
    ],
      "exp": {"ja":"売掛金を回収したので売掛金（資産）が減り、貸方に記入する。現金が増えるので借方は現金。金額は337,600円。貸方を売上とする誤りは、売上を二重に計上してしまう。","en":"Collecting a receivable decreases Accounts receivable (an asset), which is credited. Cash increases and is debited. The amount is 337,600 yen. Crediting Sales is wrong because it would record the revenue a second time."}
    },
   {
    "id": "j158",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "買掛金376,700円を現金で支払った。",
     "en": "Paid 376,700 yen of accounts payable in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 376700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 376700
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     }
    ],
      "exp": {"ja":"買掛金を支払ったので買掛金（負債）が減り、借方に記入する。現金が減るので貸方は現金。金額は376,700円。借方を仕入とする誤りは、仕入を二重に計上してしまう。","en":"Paying a payable decreases Accounts payable (a liability), which is debited. Cash decreases and is credited. The amount is 376,700 yen. Debiting Purchases is wrong because it would record the purchase a second time."}
    },
   {
    "id": "j159",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "従業員が負担すべき費用415,800円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 415,800 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 415800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 415800
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"従業員のために代わりに払った金額は、後で従業員から返してもらう権利なので立替金（資産）を借方に記入する。現金が減るので貸方は現金で415,800円。費用の勘定にする誤りが多い。","en":"Money paid on behalf of an employee is a right to be repaid later, so Advances to others (an asset) is debited. Cash decreases and is credited for 415,800 yen. Recording it in an expense account is a common error."}
    },
   {
    "id": "j160",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "給料454,900円のうち源泉所得税45,490円を預り、残額を現金で支払った。",
     "en": "Paid salaries of 454,900 yen in cash after withholding income tax of 45,490 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "給料",
       "en": "Salaries expense"
      },
      "amt": 454900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 45490
     },
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 409410
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     }
    ],
      "exp": {"ja":"給料は費用なので総額454,900円を借方に記入する。源泉所得税45,490円は会社が従業員に代わって納める預り金（負債）。現金で払う額は454,900−45,490＝409,410円。給料を手取り額で記入する誤りが多い。","en":"Salaries expense is debited for the gross amount of 454,900 yen. The withheld income tax of 45,490 yen is Deposits received (a liability), held for payment to the tax office. Cash paid is 454,900 − 45,490 = 409,410 yen. Recording salaries at the net amount is a common error."}
    },
   {
    "id": "j161",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "取引先に現金494,000円を貸し付けた。",
     "en": "Lent 494,000 yen in cash to a business partner."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 494000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 494000
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"取引先に金銭を貸したので、返してもらう権利として貸付金（資産）を借方に記入する。現金が減るので貸方は現金で494,000円。貸方を借入金とする誤りは、貸す側と借りる側の取り違え。","en":"Lending money to a partner creates a right to repayment, so Loans receivable (an asset) is debited. Cash decreases and is credited for 494,000 yen. Using Loans payable mixes up the lender and the borrower."}
    },
   {
    "id": "j162",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "銀行から533,100円を借り入れ、当座預金とした。",
     "en": "Borrowed 533,100 yen from a bank and the proceeds were put into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 533100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 533100
     }
    ],
    "accounts": [
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"銀行から借りた金は返す義務なので借入金（負債）を貸方に記入する。当座預金が増えるので借方は当座預金で533,100円。貸方を当座預金とする誤りは、借りる側と貸す側の取り違え。","en":"Money borrowed from a bank must be repaid, so Loans payable (a liability) is credited. Checking increases and is debited for 533,100 yen. Crediting Checking mixes up the borrower and the lender."}
    },
   {
    "id": "j163",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "貸付金572,200円を利息17,166円とともに現金で回収した。",
     "en": "Collected a loan of 572,200 yen together with interest of 17,166 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 589366
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 572200
     },
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 17166
     }
    ],
    "accounts": [
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     }
    ],
      "exp": {"ja":"貸付金の回収で貸付金572,200円が減り貸方、利息17,166円は受取利息（収益）で貸方。現金で受け取る額は572,200＋17,166＝589,366円で借方。利息を貸付金に含める誤りが多い。","en":"Collecting the loan decreases Loans receivable of 572,200 yen, a credit, and the 17,166 yen interest is Interest income (revenue), also a credit. Cash received is 572,200 + 17,166 = 589,366 yen, a debit. A common error is including the interest in Loans receivable."}
    },
   {
    "id": "j164",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "借入金611,300円を利息18,339円とともに小切手で返済した。",
     "en": "Repaid a loan of 611,300 yen together with interest of 18,339 yen by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 611300
     },
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 18339
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 629639
     }
    ],
    "accounts": [
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"借入金の返済で借入金611,300円が減り借方、利息18,339円は支払利息（費用）で借方。小切手の振出なので貸方は当座預金611,300＋18,339＝629,639円。利息を借入金に含める誤りが多い。","en":"Repaying the loan decreases Loans payable of 611,300 yen, a debit, and the 18,339 yen interest is Interest expense, also a debit. Issuing a check reduces Checking by 611,300 + 18,339 = 629,639 yen, a credit. A common error is including the interest in Loans payable."}
    },
   {
    "id": "j165",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "得意先振出の約束手形650,400円が満期となり当座預金に入金された。",
     "en": "A promissory note drawn by a customer, 650,400 yen, matured and was collected into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 650400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取手形",
       "en": "Notes receivable"
      },
      "amt": 650400
     }
    ],
    "accounts": [
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     }
    ],
      "exp": {"ja":"得意先が振り出した約束手形が満期になり入金されたので、受取手形（資産）が減り貸方に記入する。当座預金（資産）が増えて借方。金額は650,400円。支払手形とする誤りが多い。","en":"A note drawn by a customer matured and was collected, so Notes receivable (an asset) decreases and is credited. Checking (an asset) increases and is debited. The amount is 650,400 yen. Using Notes payable is a common error."}
    },
   {
    "id": "j166",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "備品661,900円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 661,900 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 661900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 661900
     }
    ],
    "accounts": [
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     }
    ],
      "exp": {"ja":"長く使う備品は資産なので、借方は備品（取得原価）。代金を現金で払うので貸方は現金で661,900円。購入時に消耗品費などの費用にする誤りが多い。","en":"Equipment used for a long time is an asset, so Equipment (at acquisition cost) is debited. Cash is paid, so Cash is credited for 661,900 yen. A common error is expensing it at purchase, for example as Supplies expense."}
    },
   {
    "id": "j167",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "建物701,000円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 701,000 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 701000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 701000
     }
    ],
    "accounts": [
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     }
    ],
      "exp": {"ja":"建物は長期にわたり使う資産なので、借方は建物（取得原価）。小切手を振り出したので貸方は当座預金で701,000円。貸方を現金とする誤りが多い。","en":"A building is a long-term asset, so Buildings (at acquisition cost) is debited. A check was issued, so Checking is credited for 701,000 yen. Crediting Cash is a common error."}
    },
   {
    "id": "j168",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "車両運搬具740,100円を購入し、代金は月末払いとした。",
     "en": "Purchased a vehicle for 740,100 yen, with payment due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "車両運搬具",
       "en": "Vehicles"
      },
      "amt": 740100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 740100
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     }
    ],
      "exp": {"ja":"車両は長く使う資産なので、借方は車両運搬具。代金は月末払いで商品代金ではないため、貸方は未払金（負債）で740,100円。買掛金とする誤りが多い。","en":"A vehicle is a long-term asset, so Vehicles is debited. Payment is due at month end and is not for merchandise, so Other payable (a liability) is credited for 740,100 yen. Using Accounts payable is a common error."}
    },
   {
    "id": "j169",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "土地779,200円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 779,200 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 779200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 779200
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     }
    ],
      "exp": {"ja":"土地は長期にわたり使う資産なので、借方は土地（取得原価）。小切手を振り出したので貸方は当座預金で779,200円。貸方を現金とする誤りが多い。","en":"Land is a long-term asset, so Land (at acquisition cost) is debited. A check was issued, so Checking is credited for 779,200 yen. Crediting Cash is a common error."}
    },
   {
    "id": "j170",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "備品818,300円を購入し、409,150円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 818,300 yen; 409,150 yen was paid in cash and the remainder is due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 818300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 409150
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 409150
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"備品は資産なので借方に取得原価818,300円。現金払い409,150円は貸方の現金、残額818,300−409,150＝409,150円は月末払いの未払金（負債）。残額を買掛金とする誤りが多い。","en":"Equipment is an asset, so it is debited at its cost of 818,300 yen. The 409,150 yen paid in cash is a credit to Cash, and the remainder, 818,300 − 409,150 = 409,150 yen, is Other payable (a liability) due at month end. Using Accounts payable for the remainder is a common error."}
    },
   {
    "id": "j171",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "備品857,400円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 857,400 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 857400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 857400
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"備品の購入は資産の取得。増えた備品を借方、減った現金を貸方に857,400円で記入する。仕入は商品を買う場合の勘定なので、借方に使う誤りに注意する。","en":"Buying equipment is acquiring an asset. Equipment, which increased, is debited and Cash, which decreased, is credited, both for 857,400 yen. Purchases is for buying merchandise, so do not use it here."}
    },
   {
    "id": "j172",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "建物896,500円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 896,500 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 896500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 896500
     }
    ],
    "accounts": [
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"建物の購入は資産の取得で、費用にはならない。増えた建物を借方、減った当座預金を貸方に896,500円で記入する。土地と取り違えて借方を土地とする誤りに注意する。","en":"Buying a building is acquiring an asset, not an expense. Buildings, which increased, is debited and Checking, which decreased, is credited, both for 896,500 yen. Do not debit Land by confusing the two."}
    },
   {
    "id": "j173",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "車両運搬具935,600円を購入し、代金は月末払いとした。",
     "en": "Purchased a vehicle for 935,600 yen, with payment due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "車両運搬具",
       "en": "Vehicles"
      },
      "amt": 935600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 935600
     }
    ],
    "accounts": [
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"車両運搬具の購入は資産の取得。後払いの義務は、商品以外の取引なので未払金で処理し、935,600円を貸方に記入する。借方を仕入や費用にする誤りに注意する。","en":"Buying a vehicle is acquiring an asset. The obligation to pay later is for a non-merchandise item, so it is Other payable, credited for 935,600 yen. Do not debit Purchases or an expense."}
    },
   {
    "id": "j174",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "土地974,700円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 974,700 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 974700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 974700
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"土地の購入は資産の取得で、費用にはならない。増えた土地を借方、減った当座預金を貸方に974,700円で記入する。土地は減価償却しないので、償却費を併せて計上する誤りに注意する。","en":"Buying land is acquiring an asset, not an expense. Land, which increased, is debited and Checking, which decreased, is credited, both for 974,700 yen. Land is not depreciated, so do not record depreciation with it."}
    },
   {
    "id": "j175",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "備品29,400円を購入し、14,700円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 29,400 yen; 14,700 yen was paid in cash and the remainder is due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 29400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 14700
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 14700
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     }
    ],
      "exp": {"ja":"借方は備品29,400円の全額。貸方は現金14,700円と未払金14,700円（29,400−14,700）に分かれ、貸借が一致する。支払った現金分だけを備品とする誤りに注意する。","en":"The debit is the full 29,400 yen of Equipment. The credit is split into Cash of 14,700 yen and Other payable of 14,700 yen (29,400 − 14,700), so both sides balance. Do not record only the cash paid as Equipment."}
    },
   {
    "id": "j176",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "備品68,500円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 68,500 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 68500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 68500
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"長く使う備品は資産なので、借方は備品（取得原価）。代金を現金で払うので貸方は現金で68,500円。購入時に消耗品費などの費用にする誤りが多い。","en":"Equipment used for a long time is an asset, so Equipment (at acquisition cost) is debited. Cash is paid, so Cash is credited for 68,500 yen. A common error is expensing it at purchase, for example as Supplies expense."}
    },
   {
    "id": "j177",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "建物107,600円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 107,600 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 107600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 107600
     }
    ],
    "accounts": [
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     }
    ],
      "exp": {"ja":"建物は長期にわたり使う資産なので、借方は建物（取得原価）。小切手を振り出したので貸方は当座預金で107,600円。貸方を現金とする誤りが多い。","en":"A building is a long-term asset, so Buildings (at acquisition cost) is debited. A check was issued, so Checking is credited for 107,600 yen. Crediting Cash is a common error."}
    },
   {
    "id": "j178",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "車両運搬具146,700円を購入し、代金は月末払いとした。",
     "en": "Purchased a vehicle for 146,700 yen, with payment due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "車両運搬具",
       "en": "Vehicles"
      },
      "amt": 146700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 146700
     }
    ],
    "accounts": [
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     }
    ],
      "exp": {"ja":"車両は長く使う資産なので、借方は車両運搬具。代金は月末払いで商品代金ではないため、貸方は未払金（負債）で146,700円。買掛金とする誤りが多い。","en":"A vehicle is a long-term asset, so Vehicles is debited. Payment is due at month end and is not for merchandise, so Other payable (a liability) is credited for 146,700 yen. Using Accounts payable is a common error."}
    },
   {
    "id": "j179",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "土地185,800円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 185,800 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 185800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 185800
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     }
    ],
      "exp": {"ja":"土地は長期にわたり使う資産なので、借方は土地（取得原価）。小切手を振り出したので貸方は当座預金で185,800円。貸方を現金とする誤りが多い。","en":"Land is a long-term asset, so Land (at acquisition cost) is debited. A check was issued, so Checking is credited for 185,800 yen. Crediting Cash is a common error."}
    },
   {
    "id": "j180",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "備品224,900円を購入し、112,450円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 224,900 yen; 112,450 yen was paid in cash and the remainder is due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 224900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 112450
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 112450
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"備品は資産なので借方に取得原価224,900円。現金払い112,450円は貸方の現金、残額224,900−112,450＝112,450円は月末払いの未払金（負債）。残額を買掛金とする誤りが多い。","en":"Equipment is an asset, so it is debited at its cost of 224,900 yen. The 112,450 yen paid in cash is a credit to Cash, and the remainder, 224,900 − 112,450 = 112,450 yen, is Other payable (a liability) due at month end. Using Accounts payable for the remainder is a common error."}
    },
   {
    "id": "j181",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "備品264,000円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 264,000 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 264000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 264000
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     }
    ],
      "exp": {"ja":"備品の購入は資産の取得。増えた備品を借方、減った現金を貸方に264,000円で記入する。仕入は商品を買う場合の勘定なので、借方に使う誤りに注意する。","en":"Buying equipment is acquiring an asset. Equipment, which increased, is debited and Cash, which decreased, is credited, both for 264,000 yen. Purchases is for buying merchandise, so do not use it here."}
    },
   {
    "id": "j182",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "建物303,100円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 303,100 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 303100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 303100
     }
    ],
    "accounts": [
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     }
    ],
      "exp": {"ja":"建物の購入は資産の取得で、費用にはならない。増えた建物を借方、減った当座預金を貸方に303,100円で記入する。土地と取り違えて借方を土地とする誤りに注意する。","en":"Buying a building is acquiring an asset, not an expense. Buildings, which increased, is debited and Checking, which decreased, is credited, both for 303,100 yen. Do not debit Land by confusing the two."}
    },
   {
    "id": "j183",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "車両運搬具342,200円を購入し、代金は月末払いとした。",
     "en": "Purchased a vehicle for 342,200 yen, with payment due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "車両運搬具",
       "en": "Vehicles"
      },
      "amt": 342200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 342200
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     }
    ],
      "exp": {"ja":"車両運搬具の購入は資産の取得。後払いの義務は、商品以外の取引なので未払金で処理し、342,200円を貸方に記入する。借方を仕入や費用にする誤りに注意する。","en":"Buying a vehicle is acquiring an asset. The obligation to pay later is for a non-merchandise item, so it is Other payable, credited for 342,200 yen. Do not debit Purchases or an expense."}
    },
   {
    "id": "j184",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "土地381,300円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 381,300 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 381300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 381300
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     }
    ],
      "exp": {"ja":"土地の購入は資産の取得で、費用にはならない。増えた土地を借方、減った当座預金を貸方に381,300円で記入する。土地は減価償却しないので、償却費を併せて計上する誤りに注意する。","en":"Buying land is acquiring an asset, not an expense. Land, which increased, is debited and Checking, which decreased, is credited, both for 381,300 yen. Land is not depreciated, so do not record depreciation with it."}
    },
   {
    "id": "j185",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "備品420,400円を購入し、210,200円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 420,400 yen. Paid 210,200 yen in cash, and the remaining 210,200 yen is to be paid at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 420400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 210200
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 210200
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"備品の取得は資産の増加で借方、現金の支払は貸方。残額は商品以外の後払いなので買掛金ではなく未払金とする。420,400−210,200＝210,200円が未払金。備品を消耗品費にする誤りに注意。","en":"Acquiring equipment increases an asset, so debit it for 420,400 yen. The cash paid is credited, and the unpaid balance of 420,400 - 210,200 = 210,200 yen is Other payable, not Accounts payable, because the purchase is not merchandise. Do not expense it as supplies."}
    },
   {
    "id": "j186",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "備品459,500円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 459,500 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 459500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 459500
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     }
    ],
      "exp": {"ja":"備品の購入は資産の増加なので借方に備品、現金払いは資産の減少なので貸方に現金。金額は購入代価の459,500円。固定資産を費用として処理する誤りに注意。","en":"Buying equipment increases an asset, so debit Equipment for 459,500 yen. Paying in cash decreases Cash, which is credited. A common mistake is to treat a fixed asset as an expense."}
    },
   {
    "id": "j187",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "建物498,600円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 498,600 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 498600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 498600
     }
    ],
    "accounts": [
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"建物の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。建物は決算で減価償却の対象になるが、取得時は取得原価で計上する。","en":"The purchase of a building increases an asset: debit Buildings for 498,600 yen. Issuing our own check reduces the checking account, which is credited, not Cash. A building is depreciated at year end, but at purchase it is recorded at cost."}
    },
   {
    "id": "j188",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "車両運搬具537,700円を購入し、代金は月末払いとした。",
     "en": "Purchased a vehicle for 537,700 yen, with payment due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "車両運搬具",
       "en": "Vehicles"
      },
      "amt": 537700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 537700
     }
    ],
    "accounts": [
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"車両運搬具の購入は資産の増加で借方。代金の月末払いは商品以外の取引の未払いなので、買掛金ではなく未払金を貸方に記入する。商品の掛け仕入だけが買掛金になる。","en":"Buying a vehicle increases an asset, so debit Vehicles for 537,700 yen. Because the price is payable at month end and the item is not merchandise, credit Other payable, not Accounts payable (which is only for credit purchases of merchandise)."}
    },
   {
    "id": "j189",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "土地576,800円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 576,800 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 576800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 576800
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 576,800 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "j190",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "備品615,900円を購入し、307,950円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 615,900 yen. Paid 307,950 yen in cash, and the remaining 307,950 yen is to be paid at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 615900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 307950
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 307950
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"備品の取得は資産の増加で借方、現金の支払は貸方。残額は商品以外の後払いなので買掛金ではなく未払金とする。615,900−307,950＝307,950円が未払金。備品を消耗品費にする誤りに注意。","en":"Acquiring equipment increases an asset, so debit it for 615,900 yen. The cash paid is credited, and the unpaid balance of 615,900 - 307,950 = 307,950 yen is Other payable, not Accounts payable, because the purchase is not merchandise. Do not expense it as supplies."}
    },
   {
    "id": "j191",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "備品655,000円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 655,000 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 655000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 655000
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"備品の購入は資産の増加なので借方に備品、現金払いは資産の減少なので貸方に現金。金額は購入代価の655,000円。固定資産を費用として処理する誤りに注意。","en":"Buying equipment increases an asset, so debit Equipment for 655,000 yen. Paying in cash decreases Cash, which is credited. A common mistake is to treat a fixed asset as an expense."}
    },
   {
    "id": "j192",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "建物694,100円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 694,100 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 694100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 694100
     }
    ],
    "accounts": [
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     }
    ],
      "exp": {"ja":"建物の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。建物は決算で減価償却の対象になるが、取得時は取得原価で計上する。","en":"The purchase of a building increases an asset: debit Buildings for 694,100 yen. Issuing our own check reduces the checking account, which is credited, not Cash. A building is depreciated at year end, but at purchase it is recorded at cost."}
    },
   {
    "id": "j193",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "車両運搬具733,200円を購入し、代金は月末払いとした。",
     "en": "Purchased a vehicle for 733,200 yen, with payment due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "車両運搬具",
       "en": "Vehicles"
      },
      "amt": 733200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 733200
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     }
    ],
      "exp": {"ja":"車両運搬具の購入は資産の増加で借方。代金の月末払いは商品以外の取引の未払いなので、買掛金ではなく未払金を貸方に記入する。商品の掛け仕入だけが買掛金になる。","en":"Buying a vehicle increases an asset, so debit Vehicles for 733,200 yen. Because the price is payable at month end and the item is not merchandise, credit Other payable, not Accounts payable (which is only for credit purchases of merchandise)."}
    },
   {
    "id": "j194",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "土地772,300円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 772,300 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 772300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 772300
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 772,300 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "j195",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "備品811,400円を購入し、405,700円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 811,400 yen. Paid 405,700 yen in cash, and the remaining 405,700 yen is to be paid at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 811400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 405700
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 405700
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     }
    ],
      "exp": {"ja":"備品の取得は資産の増加で借方、現金の支払は貸方。残額は商品以外の後払いなので買掛金ではなく未払金とする。811,400−405,700＝405,700円が未払金。備品を消耗品費にする誤りに注意。","en":"Acquiring equipment increases an asset, so debit it for 811,400 yen. The cash paid is credited, and the unpaid balance of 811,400 - 405,700 = 405,700 yen is Other payable, not Accounts payable, because the purchase is not merchandise. Do not expense it as supplies."}
    },
   {
    "id": "j196",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "備品850,500円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 850,500 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 850500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 850500
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"備品の購入は資産の増加なので借方に備品、現金払いは資産の減少なので貸方に現金。金額は購入代価の850,500円。固定資産を費用として処理する誤りに注意。","en":"Buying equipment increases an asset, so debit Equipment for 850,500 yen. Paying in cash decreases Cash, which is credited. A common mistake is to treat a fixed asset as an expense."}
    },
   {
    "id": "j197",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "建物889,600円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 889,600 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 889600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 889600
     }
    ],
    "accounts": [
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     }
    ],
      "exp": {"ja":"建物の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。建物は決算で減価償却の対象になるが、取得時は取得原価で計上する。","en":"The purchase of a building increases an asset: debit Buildings for 889,600 yen. Issuing our own check reduces the checking account, which is credited, not Cash. A building is depreciated at year end, but at purchase it is recorded at cost."}
    },
   {
    "id": "j198",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "車両運搬具928,700円を購入し、代金は月末払いとした。",
     "en": "Purchased a vehicle for 928,700 yen, with payment due at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "車両運搬具",
       "en": "Vehicles"
      },
      "amt": 928700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 928700
     }
    ],
    "accounts": [
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"車両運搬具の購入は資産の増加で借方。代金の月末払いは商品以外の取引の未払いなので、買掛金ではなく未払金を貸方に記入する。商品の掛け仕入だけが買掛金になる。","en":"Buying a vehicle increases an asset, so debit Vehicles for 928,700 yen. Because the price is payable at month end and the item is not merchandise, credit Other payable, not Accounts payable (which is only for credit purchases of merchandise)."}
    },
   {
    "id": "j199",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "土地967,800円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 967,800 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 967800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 967800
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 967,800 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "j200",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "備品22,500円を購入し、11,250円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 22,500 yen. Paid 11,250 yen in cash, and the remaining 11,250 yen is to be paid at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 22500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 11250
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 11250
     }
    ],
    "accounts": [
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     }
    ],
      "exp": {"ja":"備品の取得は資産の増加で借方、現金の支払は貸方。残額は商品以外の後払いなので買掛金ではなく未払金とする。22,500−11,250＝11,250円が未払金。備品を消耗品費にする誤りに注意。","en":"Acquiring equipment increases an asset, so debit it for 22,500 yen. The cash paid is credited, and the unpaid balance of 22,500 - 11,250 = 11,250 yen is Other payable, not Accounts payable, because the purchase is not merchandise. Do not expense it as supplies."}
    },
   {
    "id": "j201",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "会社の設立にあたり株式を発行し829,800円の払込みを受け当座預金とした(全額資本金)。",
     "en": "Upon establishing the company, shares were issued and a payment of 829,800 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 829800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 829800
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"株式発行による払込みは純資産の増加なので貸方に資本金、受け入れた預金は資産の増加で借方に当座預金。全額を資本金とするので829,800円がそのまま入る。払込額を資本準備金や利益剰余金とする誤りに注意。","en":"Receiving payment for shares increases net assets, so credit Capital stock, and the deposit increases an asset, so debit Checking. The whole 829,800 yen is capital stock. Do not put it in capital reserve or retained earnings."}
    },
   {
    "id": "j202",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し868,900円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To increase capital, new shares were issued and a payment of 868,900 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 868900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 868900
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"新株の発行で資本金が増えるため貸方は資本金、受け入れた預金は借方の当座預金。全額資本金の指示なので868,900円で一致する。借方を現金や借入金とする誤りに注意。","en":"New share issuance increases Capital stock (credit), and the payment received increases Checking (debit). Because the entire amount is capital stock, 868,900 yen goes on both sides. Do not debit Cash or Loans payable."}
    },
   {
    "id": "j203",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "店主が私用のため現金33,000円を引き出した(引出金)。",
     "en": "The owner withdrew 33,000 yen in cash for personal use (record in the Drawings account)."
    },
    "debit": [
     {
      "acct": {
       "ja": "引出金",
       "en": "Drawings"
      },
      "amt": 33000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 33000
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"店主の私用の引き出しは事業の資本の減少で、費用ではない。資本金を直接減らさず引出金で処理するので借方は引出金、貸方は現金の減少。金額は33,000円。給料や雑費とする誤りに注意。","en":"A private withdrawal by the owner reduces capital and is not an expense. Debit Drawings (rather than reducing Capital directly) and credit Cash for 33,000 yen. Do not record it as salaries or miscellaneous expense."}
    },
   {
    "id": "j204",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "消費税の確定申告により未払消費税77,100円を現金で納付した。",
     "en": "Upon filing the final consumption tax return, the consumption tax payable of 77,100 yen was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "未払消費税",
       "en": "Consumption tax payable"
      },
      "amt": 77100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 77100
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"確定申告での納付は、決算で計上済みの未払消費税(負債)を消す取引。借方に未払消費税、貸方に現金で77,100円。税抜方式では租税公課(費用)とする誤りに注意。","en":"Paying the final consumption tax settles the liability recorded at year end: debit Consumption tax payable and credit Cash for 77,100 yen. Under the tax-excluded method, do not expense it as taxes and dues."}
    },
   {
    "id": "j205",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "法人税等の中間申告を行い46,200円を現金で納付した(仮払法人税等)。",
     "en": "An interim corporate tax return was filed and 46,200 yen was paid in cash (record as Prepaid corporate taxes)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仮払法人税等",
       "en": "Prepaid income taxes"
      },
      "amt": 46200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 46200
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     }
    ],
      "exp": {"ja":"中間申告での納付は、確定した税額ではなく前払いなので仮払法人税等(資産)を借方に、現金を貸方に46,200円。決算で法人税等に振り替え、未払分と精算する。ここで法人税等とする誤りに注意。","en":"The interim payment is made before the final tax is fixed, so debit Prepaid corporate taxes (an asset) and credit Cash for 46,200 yen. At year end it is moved to Income taxes. Do not debit Income taxes at payment."}
    },
   {
    "id": "j206",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税2,900円を現金で納付した。",
     "en": "Withheld income tax of 2,900 yen, which had been held as deposits received, was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 2900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 2900
     }
    ],
    "accounts": [
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"従業員から預かった源泉所得税は預り金(負債)で、納付すると負債が減る。借方に預り金、貸方に現金で2,900円。納付時に租税公課や給料とする誤りに注意。","en":"Withheld income tax was recorded as Deposits received (a liability), so paying it decreases that liability: debit Deposits received and credit Cash for 2,900 yen. Do not debit Taxes and dues or Salaries."}
    },
   {
    "id": "j207",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "会社の設立にあたり株式を発行し80,000円の払込みを受け当座預金とした(全額資本金)。",
     "en": "Upon establishing the company, shares were issued and a payment of 80,000 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 80000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 80000
     }
    ],
    "accounts": [
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     }
    ],
      "exp": {"ja":"株式発行による払込みは純資産の増加なので貸方に資本金、受け入れた預金は資産の増加で借方に当座預金。全額を資本金とするので80,000円がそのまま入る。払込額を資本準備金や利益剰余金とする誤りに注意。","en":"Receiving payment for shares increases net assets, so credit Capital stock, and the deposit increases an asset, so debit Checking. The whole 80,000 yen is capital stock. Do not put it in capital reserve or retained earnings."}
    },
   {
    "id": "j208",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し119,100円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To increase capital, new shares were issued and a payment of 119,100 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 119100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 119100
     }
    ],
    "accounts": [
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     }
    ],
      "exp": {"ja":"新株の発行で資本金が増えるため貸方は資本金、受け入れた預金は借方の当座預金。全額資本金の指示なので119,100円で一致する。借方を現金や借入金とする誤りに注意。","en":"New share issuance increases Capital stock (credit), and the payment received increases Checking (debit). Because the entire amount is capital stock, 119,100 yen goes on both sides. Do not debit Cash or Loans payable."}
    },
   {
    "id": "j209",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "店主が私用のため現金43,200円を引き出した(引出金)。",
     "en": "The owner withdrew 43,200 yen in cash for personal use (record in the Drawings account)."
    },
    "debit": [
     {
      "acct": {
       "ja": "引出金",
       "en": "Drawings"
      },
      "amt": 43200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 43200
     }
    ],
    "accounts": [
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"事業主が私用で現金を引き出すと資本が減る。直接は資本金を減らさず借方に引出金、貸方に現金とする。金額は引出額の43,200円。費用の勘定で処理する誤りに注意。","en":"When the owner takes cash for personal use, capital decreases. Debit Drawings and credit Cash for 43,200 yen instead of debiting Capital stock directly. Do not use an expense account."}
    },
   {
    "id": "j210",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "消費税の確定申告により未払消費税47,300円を現金で納付した。",
     "en": "Upon filing the final consumption tax return, the consumption tax payable of 47,300 yen was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "未払消費税",
       "en": "Consumption tax payable"
      },
      "amt": 47300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 47300
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"未払消費税は納付すると負債が減るので借方に記入し、現金の減少を貸方に47,300円記入する。納付時に費用の租税公課や仮払消費税を使う誤りに注意。","en":"Consumption tax payable is a liability, so paying it is a debit to that account, and Cash decreases by 47,300 yen (credit). Do not use the expense account Taxes and dues or Suspense consumption tax paid."}
    },
   {
    "id": "j211",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "法人税等の中間申告を行い96,400円を現金で納付した(仮払法人税等)。",
     "en": "An interim corporate tax return was filed and 96,400 yen was paid in cash (record as Prepaid corporate taxes)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仮払法人税等",
       "en": "Prepaid income taxes"
      },
      "amt": 96400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 96400
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     }
    ],
      "exp": {"ja":"法人税等の中間納付は決算まで税額が確定していないため、借方は仮払法人税等、貸方は現金で96,400円。費用の法人税等で処理して決算の精算を狂わせる誤りに注意。","en":"Because the final amount is not yet determined, the interim payment of 96,400 yen is debited to Prepaid corporate taxes and credited to Cash. Do not record it directly as the expense Income taxes."}
    },
   {
    "id": "j212",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税17,500円を現金で納付した。",
     "en": "Withheld income tax of 17,500 yen, which had been held as deposits received, was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 17500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 17500
     }
    ],
    "accounts": [
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     }
    ],
      "exp": {"ja":"源泉所得税は給与支払時に預り金として計上済みなので、納付は預り金の減少。借方預り金、貸方現金で17,500円。費用として二重に計上する誤りに注意。","en":"The tax was already booked as Deposits received when salaries were paid, so remitting it reduces that account. Debit Deposits received and credit Cash, 17,500 yen. Do not record it again as an expense."}
    },
   {
    "id": "j213",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "会社の設立にあたり株式を発行し314,600円の払込みを受け当座預金とした(全額資本金)。",
     "en": "Upon establishing the company, shares were issued and a payment of 314,600 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 314600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 314600
     }
    ],
    "accounts": [
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"株式発行による払込みは純資産の増加なので貸方に資本金、受け入れた預金は資産の増加で借方に当座預金。全額を資本金とするので314,600円がそのまま入る。払込額を資本準備金や利益剰余金とする誤りに注意。","en":"Receiving payment for shares increases net assets, so credit Capital stock, and the deposit increases an asset, so debit Checking. The whole 314,600 yen is capital stock. Do not put it in capital reserve or retained earnings."}
    },
   {
    "id": "j214",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し353,700円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To increase capital, new shares were issued and a payment of 353,700 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 353700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 353700
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     }
    ],
      "exp": {"ja":"新株の発行で資本金が増えるため貸方は資本金、受け入れた預金は借方の当座預金。全額資本金の指示なので353,700円で一致する。借方を現金や借入金とする誤りに注意。","en":"New share issuance increases Capital stock (credit), and the payment received increases Checking (debit). Because the entire amount is capital stock, 353,700 yen goes on both sides. Do not debit Cash or Loans payable."}
    },
   {
    "id": "j215",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "店主が私用のため現金37,800円を引き出した(引出金)。",
     "en": "The owner withdrew 37,800 yen in cash for personal use (record in the Drawings account)."
    },
    "debit": [
     {
      "acct": {
       "ja": "引出金",
       "en": "Drawings"
      },
      "amt": 37800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 37800
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"店主の私用の引き出しは事業の資本の減少で、費用ではない。資本金を直接減らさず引出金で処理するので借方は引出金、貸方は現金の減少。金額は37,800円。給料や雑費とする誤りに注意。","en":"A private withdrawal by the owner reduces capital and is not an expense. Debit Drawings (rather than reducing Capital directly) and credit Cash for 37,800 yen. Do not record it as salaries or miscellaneous expense."}
    },
   {
    "id": "j216",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "消費税の確定申告により未払消費税41,900円を現金で納付した。",
     "en": "Upon filing the final consumption tax return, the consumption tax payable of 41,900 yen was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "未払消費税",
       "en": "Consumption tax payable"
      },
      "amt": 41900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 41900
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     }
    ],
      "exp": {"ja":"確定申告での納付は、決算で計上済みの未払消費税(負債)を消す取引。借方に未払消費税、貸方に現金で41,900円。税抜方式では租税公課(費用)とする誤りに注意。","en":"Paying the final consumption tax settles the liability recorded at year end: debit Consumption tax payable and credit Cash for 41,900 yen. Under the tax-excluded method, do not expense it as taxes and dues."}
    },
   {
    "id": "j217",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "法人税等の中間申告を行い91,000円を現金で納付した(仮払法人税等)。",
     "en": "An interim corporate tax return was filed and 91,000 yen was paid in cash (record as Prepaid corporate taxes)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仮払法人税等",
       "en": "Prepaid income taxes"
      },
      "amt": 91000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 91000
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     }
    ],
      "exp": {"ja":"中間申告での納付は、確定した税額ではなく前払いなので仮払法人税等(資産)を借方に、現金を貸方に91,000円。決算で法人税等に振り替え、未払分と精算する。ここで法人税等とする誤りに注意。","en":"The interim payment is made before the final tax is fixed, so debit Prepaid corporate taxes (an asset) and credit Cash for 91,000 yen. At year end it is moved to Income taxes. Do not debit Income taxes at payment."}
    },
   {
    "id": "j218",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税12,100円を現金で納付した。",
     "en": "Withheld income tax of 12,100 yen, which had been held as deposits received, was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 12100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 12100
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     }
    ],
      "exp": {"ja":"従業員から預かった源泉所得税は預り金(負債)で、納付すると負債が減る。借方に預り金、貸方に現金で12,100円。納付時に租税公課や給料とする誤りに注意。","en":"Withheld income tax was recorded as Deposits received (a liability), so paying it decreases that liability: debit Deposits received and credit Cash for 12,100 yen. Do not debit Taxes and dues or Salaries."}
    },
   {
    "id": "j219",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "会社の設立にあたり株式を発行し549,200円の払込みを受け当座預金とした(全額資本金)。",
     "en": "Upon establishing the company, shares were issued and a payment of 549,200 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 549200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 549200
     }
    ],
    "accounts": [
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     }
    ],
      "exp": {"ja":"株式発行による払込みは純資産の増加なので貸方に資本金、受け入れた預金は資産の増加で借方に当座預金。全額を資本金とするので549,200円がそのまま入る。払込額を資本準備金や利益剰余金とする誤りに注意。","en":"Receiving payment for shares increases net assets, so credit Capital stock, and the deposit increases an asset, so debit Checking. The whole 549,200 yen is capital stock. Do not put it in capital reserve or retained earnings."}
    },
   {
    "id": "j220",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し588,300円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To increase capital, new shares were issued and a payment of 588,300 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 588300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 588300
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"新株の発行で資本金が増えるため貸方は資本金、受け入れた預金は借方の当座預金。全額資本金の指示なので588,300円で一致する。借方を現金や借入金とする誤りに注意。","en":"New share issuance increases Capital stock (credit), and the payment received increases Checking (debit). Because the entire amount is capital stock, 588,300 yen goes on both sides. Do not debit Cash or Loans payable."}
    },
   {
    "id": "j221",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "店主が私用のため現金32,400円を引き出した(引出金)。",
     "en": "The owner withdrew 32,400 yen in cash for personal use (record in the Drawings account)."
    },
    "debit": [
     {
      "acct": {
       "ja": "引出金",
       "en": "Drawings"
      },
      "amt": 32400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 32400
     }
    ],
    "accounts": [
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"事業主が私用で現金を引き出すと資本が減る。直接は資本金を減らさず借方に引出金、貸方に現金とする。金額は引出額の32,400円。費用の勘定で処理する誤りに注意。","en":"When the owner takes cash for personal use, capital decreases. Debit Drawings and credit Cash for 32,400 yen instead of debiting Capital stock directly. Do not use an expense account."}
    },
   {
    "id": "j222",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "消費税の確定申告により未払消費税36,500円を現金で納付した。",
     "en": "Upon filing the final consumption tax return, the consumption tax payable of 36,500 yen was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "未払消費税",
       "en": "Consumption tax payable"
      },
      "amt": 36500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 36500
     }
    ],
    "accounts": [
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"未払消費税は納付すると負債が減るので借方に記入し、現金の減少を貸方に36,500円記入する。納付時に費用の租税公課や仮払消費税を使う誤りに注意。","en":"Consumption tax payable is a liability, so paying it is a debit to that account, and Cash decreases by 36,500 yen (credit). Do not use the expense account Taxes and dues or Suspense consumption tax paid."}
    },
   {
    "id": "j223",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "法人税等の中間申告を行い85,600円を現金で納付した(仮払法人税等)。",
     "en": "An interim corporate tax return was filed and 85,600 yen was paid in cash (record as Prepaid corporate taxes)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仮払法人税等",
       "en": "Prepaid income taxes"
      },
      "amt": 85600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 85600
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"法人税等の中間納付は決算まで税額が確定していないため、借方は仮払法人税等、貸方は現金で85,600円。費用の法人税等で処理して決算の精算を狂わせる誤りに注意。","en":"Because the final amount is not yet determined, the interim payment of 85,600 yen is debited to Prepaid corporate taxes and credited to Cash. Do not record it directly as the expense Income taxes."}
    },
   {
    "id": "j224",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税6,700円を現金で納付した。",
     "en": "Withheld income tax of 6,700 yen, which had been held as deposits received, was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 6700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 6700
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"源泉所得税は給与支払時に預り金として計上済みなので、納付は預り金の減少。借方預り金、貸方現金で6,700円。費用として二重に計上する誤りに注意。","en":"The tax was already booked as Deposits received when salaries were paid, so remitting it reduces that account. Debit Deposits received and credit Cash, 6,700 yen. Do not record it again as an expense."}
    },
   {
    "id": "j225",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "会社の設立にあたり株式を発行し783,800円の払込みを受け当座預金とした(全額資本金)。",
     "en": "Upon establishing the company, shares were issued and a payment of 783,800 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 783800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 783800
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     }
    ],
      "exp": {"ja":"株式発行による払込みは純資産の増加なので貸方に資本金、受け入れた預金は資産の増加で借方に当座預金。全額を資本金とするので783,800円がそのまま入る。払込額を資本準備金や利益剰余金とする誤りに注意。","en":"Receiving payment for shares increases net assets, so credit Capital stock, and the deposit increases an asset, so debit Checking. The whole 783,800 yen is capital stock. Do not put it in capital reserve or retained earnings."}
    },
   {
    "id": "j226",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し822,900円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To increase capital, new shares were issued and a payment of 822,900 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 822900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 822900
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     }
    ],
      "exp": {"ja":"新株の発行で資本金が増えるため貸方は資本金、受け入れた預金は借方の当座預金。全額資本金の指示なので822,900円で一致する。借方を現金や借入金とする誤りに注意。","en":"New share issuance increases Capital stock (credit), and the payment received increases Checking (debit). Because the entire amount is capital stock, 822,900 yen goes on both sides. Do not debit Cash or Loans payable."}
    },
   {
    "id": "j227",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "店主が私用のため現金27,000円を引き出した(引出金)。",
     "en": "The owner withdrew 27,000 yen in cash for personal use (record in the Drawings account)."
    },
    "debit": [
     {
      "acct": {
       "ja": "引出金",
       "en": "Drawings"
      },
      "amt": 27000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 27000
     }
    ],
    "accounts": [
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     }
    ],
      "exp": {"ja":"店主の私用の引き出しは事業の資本の減少で、費用ではない。資本金を直接減らさず引出金で処理するので借方は引出金、貸方は現金の減少。金額は27,000円。給料や雑費とする誤りに注意。","en":"A private withdrawal by the owner reduces capital and is not an expense. Debit Drawings (rather than reducing Capital directly) and credit Cash for 27,000 yen. Do not record it as salaries or miscellaneous expense."}
    },
   {
    "id": "j228",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "消費税の確定申告により未払消費税31,100円を現金で納付した。",
     "en": "Upon filing the final consumption tax return, the consumption tax payable of 31,100 yen was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "未払消費税",
       "en": "Consumption tax payable"
      },
      "amt": 31100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 31100
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"確定申告での納付は、決算で計上済みの未払消費税(負債)を消す取引。借方に未払消費税、貸方に現金で31,100円。税抜方式では租税公課(費用)とする誤りに注意。","en":"Paying the final consumption tax settles the liability recorded at year end: debit Consumption tax payable and credit Cash for 31,100 yen. Under the tax-excluded method, do not expense it as taxes and dues."}
    },
   {
    "id": "j229",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "法人税等の中間申告を行い80,200円を現金で納付した(仮払法人税等)。",
     "en": "An interim corporate tax return was filed and 80,200 yen was paid in cash (record as Prepaid corporate taxes)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仮払法人税等",
       "en": "Prepaid income taxes"
      },
      "amt": 80200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 80200
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     }
    ],
      "exp": {"ja":"中間申告での納付は、確定した税額ではなく前払いなので仮払法人税等(資産)を借方に、現金を貸方に80,200円。決算で法人税等に振り替え、未払分と精算する。ここで法人税等とする誤りに注意。","en":"The interim payment is made before the final tax is fixed, so debit Prepaid corporate taxes (an asset) and credit Cash for 80,200 yen. At year end it is moved to Income taxes. Do not debit Income taxes at payment."}
    },
   {
    "id": "j230",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税21,300円を現金で納付した。",
     "en": "Withheld income tax of 21,300 yen, which had been held as deposits received, was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 21300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 21300
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "土地",
      "en": "Land"
     }
    ],
      "exp": {"ja":"従業員から預かった源泉所得税は預り金(負債)で、納付すると負債が減る。借方に預り金、貸方に現金で21,300円。納付時に租税公課や給料とする誤りに注意。","en":"Withheld income tax was recorded as Deposits received (a liability), so paying it decreases that liability: debit Deposits received and credit Cash for 21,300 yen. Do not debit Taxes and dues or Salaries."}
    },
   {
    "id": "j231",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり備品の減価償却費19,200円を間接法で計上する。",
     "en": "At the end of the period, record depreciation expense of 19,200 yen on equipment using the indirect method."
    },
    "debit": [
     {
      "acct": {
       "ja": "減価償却費",
       "en": "Depreciation expense"
      },
      "amt": 19200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "減価償却累計額",
       "en": "Accumulated depreciation"
      },
      "amt": 19200
     }
    ],
    "accounts": [
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     }
    ],
      "exp": {"ja":"減価償却費は費用の発生なので借方に計上する。間接法は備品を直接減らさず、備品のマイナスを示す減価償却累計額を貸方に19,200円記入する。備品を貸方にする直接法との取り違えに注意。","en":"Depreciation expense is debited for 19,200 yen. Under the indirect method the credit goes to Accumulated depreciation, a contra account to Equipment, not to Equipment itself. Do not mix up the direct and indirect methods."}
    },
   {
    "id": "j232",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり貸倒引当金12,300円を差額補充法で繰り入れる。",
     "en": "At the end of the period, provide 12,300 yen to the allowance for doubtful accounts using the difference method (replenishment method)."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸倒引当金繰入",
       "en": "Bad debt expense"
      },
      "amt": 12300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸倒引当金",
       "en": "Allowance for doubtful accounts"
      },
      "amt": 12300
     }
    ],
    "accounts": [
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"差額補充法では、貸倒見積額と現在の貸倒引当金残高の差額だけを補充する。その差額12,300円を借方の貸倒引当金繰入(費用)、貸方の貸倒引当金に記入する。見積額の全額を繰り入れる誤りに注意。","en":"Under the difference method only the shortfall between the estimate and the existing allowance is added. Debit Provision for doubtful accounts (an expense) and credit Allowance for doubtful accounts for 12,300 yen. Do not book the full estimate."}
    },
   {
    "id": "j233",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり支払保険料の前払分11,400円を前払保険料に振り替える。",
     "en": "At the end of the period, transfer the prepaid portion of insurance expense, 11,400 yen, to prepaid insurance."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払保険料",
       "en": "Prepaid insurance"
      },
      "amt": 11400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "保険料",
       "en": "Insurance expense"
      },
      "amt": 11400
     }
    ],
    "accounts": [
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"支払った保険料のうち翌期分は当期の費用ではない。借方に資産の前払保険料、貸方に費用の保険料を11,400円記入して費用を減らす。未払保険料(負債)とする誤り、借貸を逆にする誤りに注意。","en":"The part of the premium that covers the next period is not an expense of this period. Debit Prepaid insurance (an asset) and credit Insurance expense for 11,400 yen. Do not call it Accrued insurance (a liability) or reverse the entry."}
    },
   {
    "id": "j234",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり支払利息の未払分9,500円を計上する。",
     "en": "At the end of the period, accrue unpaid interest expense of 9,500 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 9500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払利息",
       "en": "Accrued interest payable"
      },
      "amt": 9500
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"利息は期間の経過で当期に費用が発生しているが、まだ支払っていない。借方に支払利息(費用)、貸方に未払利息(負債)を9,500円記入する。前払利息や未収利息と取り違える誤りに注意。","en":"Interest has accrued over the period but has not been paid, so debit Interest expense and credit Accrued interest payable (a liability) for 9,500 yen. Do not confuse it with prepaid or accrued interest receivable."}
    },
   {
    "id": "j235",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり受取地代の前受分5,100円を計上する。",
     "en": "At the end of the period, record unearned land rent of 5,100 yen received in advance."
    },
    "debit": [
     {
      "acct": {
       "ja": "受取地代",
       "en": "Land rent income"
      },
      "amt": 5100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受地代",
       "en": "Unearned land rent"
      },
      "amt": 5100
     }
    ],
    "accounts": [
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"受け取った地代のうち次期分は当期の収益ではない。借方に収益の受取地代を記入して減らし、貸方に負債の前受地代を5,100円計上する。未収地代(資産)とする誤りに注意。","en":"The part of the rent that relates to the next period is not revenue of this period. Debit Land rent income to reduce it and credit Unearned land rent (a liability) for 5,100 yen. Do not use the asset Accrued land rent."}
    },
   {
    "id": "j236",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり受取利息の未収分7,500円を計上する。",
     "en": "At the end of the period, accrue interest income of 7,500 yen that has not yet been received."
    },
    "debit": [
     {
      "acct": {
       "ja": "未収利息",
       "en": "Accrued interest receivable"
      },
      "amt": 7500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 7500
     }
    ],
    "accounts": [
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     }
    ],
      "exp": {"ja":"利息は当期に収益が発生しているが、まだ受け取っていない。借方に資産の未収利息、貸方に収益の受取利息を7,500円記入する。前受利息(負債)とする誤りに注意。","en":"Interest earned this period but not yet received is recorded by debiting Accrued interest receivable (an asset) and crediting Interest income (revenue) for 7,500 yen. Do not use the liability Unearned interest."}
    },
   {
    "id": "j237",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり未使用切手7,800円を貯蔵品に振り替える。",
     "en": "At the end of the period, transfer unused stamps of 7,800 yen to supplies."
    },
    "debit": [
     {
      "acct": {
       "ja": "貯蔵品",
       "en": "Storable supplies"
      },
      "amt": 7800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 7800
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     }
    ],
      "exp": {"ja":"未使用の切手は期末に残る資産なので、費用の通信費から取り除き貯蔵品に振り替える。借方に貯蔵品、貸方に通信費で7,800円。振替を忘れて全額を費用のままにする誤りに注意。","en":"Unused stamps are an asset at period end, so remove them from the expense Communication expense and move them to Supplies: debit Supplies, credit Communication expense, 7,800 yen. Do not leave the whole amount as expense."}
    },
   {
    "id": "j238",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算整理。期首商品64,900円を仕入勘定へ振り替える(しくり)。",
     "en": "Closing adjustment: transfer the beginning merchandise inventory of 64,900 yen to the Purchases account (the 'shikuri' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 64900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 64900
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"三分法の決算整理で、期首の繰越商品は当期に売れた分として売上原価に加える。借方に仕入、貸方に繰越商品で期首商品棚卸高64,900円。期末商品の振替(くりし)と借貸が逆になる誤りに注意。","en":"In the three-account method, beginning inventory is added to cost of goods sold: debit Purchases and credit Merchandise inventory for 64,900 yen. Do not reverse it, as that is the ending-inventory entry."}
    },
   {
    "id": "j239",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算整理。期末商品14,000円を繰越商品へ振り替える(くりし)。",
     "en": "Closing adjustment: transfer the ending merchandise inventory of 14,000 yen to the inventory account (the 'kurishi' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 14000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 14000
     }
    ],
    "accounts": [
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     }
    ],
      "exp": {"ja":"期末商品棚卸高14,000円は売れ残りで資産なので、借方に繰越商品を計上する。同額を貸方の仕入に記入して売上原価から差し引く。期首の振替(しくり)と借貸を逆にする誤りに注意。","en":"Ending inventory of 14,000 yen is unsold and therefore an asset: debit Merchandise inventory and credit Purchases to deduct it from cost of goods sold. Do not reverse it as in the beginning-inventory entry."}
    },
   {
    "id": "j240",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり売上763,100円を損益勘定に振り替える。",
     "en": "At the end of the period, transfer sales of 763,100 yen to the income summary account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 763100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "損益",
       "en": "Income summary"
      },
      "amt": 763100
     }
    ],
    "accounts": [
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"決算振替では収益の勘定残高を損益勘定へ集める。売上は貸方残高なので借方に売上を記入して残高をゼロにし、貸方に損益を763,100円記入する。費用の振替(借方損益)と逆にする誤りに注意。","en":"Closing entries gather revenue into the income summary. Sales has a credit balance, so debit Sales to clear 763,100 yen and credit Income summary. Expenses are closed the opposite way (debit Income summary), so do not mix them up."}
    },
   {
    "id": "j241",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり備品の減価償却費10,200円を間接法で計上する。",
     "en": "At the end of the period, record depreciation expense of 10,200 yen on equipment using the indirect method."
    },
    "debit": [
     {
      "acct": {
       "ja": "減価償却費",
       "en": "Depreciation expense"
      },
      "amt": 10200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "減価償却累計額",
       "en": "Accumulated depreciation"
      },
      "amt": 10200
     }
    ],
    "accounts": [
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     }
    ],
      "exp": {"ja":"費用として借方に減価償却費10,200円。間接法では貸方を備品ではなく減価償却累計額とし、備品の取得原価はそのまま残す。直接法と間接法を取り違える誤りに注意。","en":"Debit Depreciation expense for 10,200 yen. With the indirect method, credit Accumulated depreciation and leave the Equipment cost unchanged. The direct method, which credits Equipment, is a common mix-up."}
    },
   {
    "id": "j242",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり貸倒引当金3,300円を差額補充法で繰り入れる。",
     "en": "At the end of the period, provide 3,300 yen to the allowance for doubtful accounts using the difference method (replenishment method)."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸倒引当金繰入",
       "en": "Bad debt expense"
      },
      "amt": 3300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸倒引当金",
       "en": "Allowance for doubtful accounts"
      },
      "amt": 3300
     }
    ],
    "accounts": [
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     }
    ],
      "exp": {"ja":"繰入額3,300円は見積額と引当金残高の差額で、借方は貸倒引当金繰入(費用)、貸方は貸倒引当金。貸倒損失とする誤り、見積額全額を繰り入れる誤りに注意。","en":"The 3,300 yen is the difference between the estimated amount and the current allowance balance: debit the expense Provision for doubtful accounts and credit Allowance for doubtful accounts. Do not use Bad debt loss."}
    },
   {
    "id": "j243",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり支払保険料の前払分2,400円を前払保険料に振り替える。",
     "en": "At the end of the period, transfer the prepaid portion of insurance expense, 2,400 yen, to prepaid insurance."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払保険料",
       "en": "Prepaid insurance"
      },
      "amt": 2400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "保険料",
       "en": "Insurance expense"
      },
      "amt": 2400
     }
    ],
    "accounts": [
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"翌期分の保険料は費用から取り除き、前払保険料(資産)に振り替える。借方前払保険料、貸方保険料で2,400円。未払保険料とする誤りに注意。","en":"Remove the next period's premium from expense by debiting Prepaid insurance and crediting Insurance expense, 2,400 yen. Do not record it as a liability such as Accrued insurance."}
    },
   {
    "id": "j244",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり支払利息の未払分10,500円を計上する。",
     "en": "At the end of the period, accrue unpaid interest expense of 10,500 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 10500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払利息",
       "en": "Accrued interest payable"
      },
      "amt": 10500
     }
    ],
    "accounts": [
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     }
    ],
      "exp": {"ja":"当期分の利息で未払いのものは、費用の支払利息を借方に、負債の未払利息を貸方に10,500円計上する。資産の未収利息を使う誤りに注意。","en":"Unpaid interest for this period is an expense: debit Interest expense, credit Accrued interest payable, 10,500 yen. Using the asset Accrued interest receivable is a common error."}
    },
   {
    "id": "j245",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり受取地代の前受分12,100円を計上する。",
     "en": "At the end of the period, record unearned land rent of 12,100 yen received in advance."
    },
    "debit": [
     {
      "acct": {
       "ja": "受取地代",
       "en": "Land rent income"
      },
      "amt": 12100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受地代",
       "en": "Unearned land rent"
      },
      "amt": 12100
     }
    ],
    "accounts": [
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     }
    ],
      "exp": {"ja":"次期分の地代は、受取地代(収益)を借方で取り消し、前受地代(負債)として貸方に12,100円記入する。収益を減らさず借貸を逆にする誤りに注意。","en":"Cancel the next period's rent from revenue by debiting Land rent income and recording Unearned land rent as a liability (credit), 12,100 yen. Reversing the sides is a common mistake."}
    },
   {
    "id": "j246",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり受取利息の未収分6,100円を計上する。",
     "en": "At the end of the period, accrue interest income of 6,100 yen that has not yet been received."
    },
    "debit": [
     {
      "acct": {
       "ja": "未収利息",
       "en": "Accrued interest receivable"
      },
      "amt": 6100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 6100
     }
    ],
    "accounts": [
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"当期に発生して未収の利息は、受取利息(収益)を貸方に、未収利息(資産)を借方に6,100円計上する。収益の計上漏れ、負債の前受利息とする誤りに注意。","en":"Debit Accrued interest receivable and credit Interest income for 6,100 yen, since the revenue arose in this period. Omitting the revenue or using a liability such as Unearned interest is wrong."}
    },
   {
    "id": "j247",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり未使用切手8,400円を貯蔵品に振り替える。",
     "en": "At the end of the period, transfer unused stamps of 8,400 yen to supplies."
    },
    "debit": [
     {
      "acct": {
       "ja": "貯蔵品",
       "en": "Storable supplies"
      },
      "amt": 8400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 8400
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"購入時に通信費とした切手のうち未使用分は、貯蔵品(資産)にする。借方貯蔵品、貸方通信費で8,400円。消耗品や消耗品費と取り違える誤りに注意。","en":"Stamps bought as communication expense but not used are reclassified as an asset. Debit Supplies and credit Communication expense for 8,400 yen. Do not confuse them with consumable office supplies."}
    },
   {
    "id": "j248",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算整理。期首商品11,500円を仕入勘定へ振り替える(しくり)。",
     "en": "Closing adjustment: transfer the beginning merchandise inventory of 11,500 yen to the Purchases account (the 'shikuri' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 11500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 11500
     }
    ],
    "accounts": [
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"期首商品棚卸高11,500円を、仕入勘定で売上原価を算定するために借方の仕入、貸方の繰越商品へ振り替える。繰越商品を借方にする誤りに注意。","en":"Move the beginning inventory of 11,500 yen into Purchases so that cost of goods sold can be computed there: debit Purchases and credit Merchandise inventory. Debiting the inventory account is wrong."}
    },
   {
    "id": "j249",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算整理。期末商品50,600円を繰越商品へ振り替える(くりし)。",
     "en": "Closing adjustment: transfer the ending merchandise inventory of 50,600 yen to the inventory account (the 'kurishi' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 50600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 50600
     }
    ],
    "accounts": [
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     }
    ],
      "exp": {"ja":"売れ残った期末商品は売上原価に含めない。借方繰越商品、貸方仕入で50,600円。期首商品の振替と同じ向きにしてしまう誤りに注意。","en":"Unsold goods are excluded from cost of goods sold: debit Merchandise inventory and credit Purchases for 50,600 yen. Using the same direction as the beginning-inventory entry is a common mistake."}
    },
   {
    "id": "j250",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり売上169,700円を損益勘定に振り替える。",
     "en": "At the end of the period, transfer sales of 169,700 yen to the income summary account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 169700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "損益",
       "en": "Income summary"
      },
      "amt": 169700
     }
    ],
    "accounts": [
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     }
    ],
      "exp": {"ja":"収益の売上169,700円は貸方残高。それを消すため借方に売上、集計先の貸方に損益を記入する。仕入などの費用は逆に借方損益になる点との取り違えに注意。","en":"Sales of 169,700 yen is a credit balance, so debit Sales to zero it and credit Income summary. Expense accounts such as Purchases go the other way, with Income summary debited."}
    },
   {
    "id": "j251",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり備品の減価償却費16,800円を間接法で計上する。",
     "en": "At the end of the period, record depreciation expense of 16,800 yen on equipment using the indirect method."
    },
    "debit": [
     {
      "acct": {
       "ja": "減価償却費",
       "en": "Depreciation expense"
      },
      "amt": 16800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "減価償却累計額",
       "en": "Accumulated depreciation"
      },
      "amt": 16800
     }
    ],
    "accounts": [
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     }
    ],
      "exp": {"ja":"減価償却費は費用の発生なので借方に計上する。間接法は備品を直接減らさず、備品のマイナスを示す減価償却累計額を貸方に16,800円記入する。備品を貸方にする直接法との取り違えに注意。","en":"Depreciation expense is debited for 16,800 yen. Under the indirect method the credit goes to Accumulated depreciation, a contra account to Equipment, not to Equipment itself. Do not mix up the direct and indirect methods."}
    },
   {
    "id": "j252",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり貸倒引当金9,900円を差額補充法で繰り入れる。",
     "en": "At the end of the period, provide 9,900 yen to the allowance for doubtful accounts using the difference method (replenishment method)."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸倒引当金繰入",
       "en": "Bad debt expense"
      },
      "amt": 9900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸倒引当金",
       "en": "Allowance for doubtful accounts"
      },
      "amt": 9900
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     }
    ],
      "exp": {"ja":"差額補充法では、貸倒見積額と現在の貸倒引当金残高の差額だけを補充する。その差額9,900円を借方の貸倒引当金繰入(費用)、貸方の貸倒引当金に記入する。見積額の全額を繰り入れる誤りに注意。","en":"Under the difference method only the shortfall between the estimate and the existing allowance is added. Debit Provision for doubtful accounts (an expense) and credit Allowance for doubtful accounts for 9,900 yen. Do not book the full estimate."}
    },
   {
    "id": "j253",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり支払保険料の前払分9,000円を前払保険料に振り替える。",
     "en": "At the end of the period, transfer the prepaid portion of insurance expense, 9,000 yen, to prepaid insurance."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払保険料",
       "en": "Prepaid insurance"
      },
      "amt": 9000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "保険料",
       "en": "Insurance expense"
      },
      "amt": 9000
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"支払った保険料のうち翌期分は当期の費用ではない。借方に資産の前払保険料、貸方に費用の保険料を9,000円記入して費用を減らす。未払保険料(負債)とする誤り、借貸を逆にする誤りに注意。","en":"The part of the premium that covers the next period is not an expense of this period. Debit Prepaid insurance (an asset) and credit Insurance expense for 9,000 yen. Do not call it Accrued insurance (a liability) or reverse the entry."}
    },
   {
    "id": "j254",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり支払利息の未払分7,100円を計上する。",
     "en": "At the end of the period, accrue unpaid interest expense of 7,100 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 7100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払利息",
       "en": "Accrued interest payable"
      },
      "amt": 7100
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"利息は期間の経過で当期に費用が発生しているが、まだ支払っていない。借方に支払利息(費用)、貸方に未払利息(負債)を7,100円記入する。前払利息や未収利息と取り違える誤りに注意。","en":"Interest has accrued over the period but has not been paid, so debit Interest expense and credit Accrued interest payable (a liability) for 7,100 yen. Do not confuse it with prepaid or accrued interest receivable."}
    },
   {
    "id": "j255",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり受取地代の前受分6,700円を計上する。",
     "en": "At the end of the period, record unearned land rent of 6,700 yen received in advance."
    },
    "debit": [
     {
      "acct": {
       "ja": "受取地代",
       "en": "Land rent income"
      },
      "amt": 6700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受地代",
       "en": "Unearned land rent"
      },
      "amt": 6700
     }
    ],
    "accounts": [
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"受け取った地代のうち次期分は当期の収益ではない。借方に収益の受取地代を記入して減らし、貸方に負債の前受地代を6,700円計上する。未収地代(資産)とする誤りに注意。","en":"The part of the rent that relates to the next period is not revenue of this period. Debit Land rent income to reduce it and credit Unearned land rent (a liability) for 6,700 yen. Do not use the asset Accrued land rent."}
    },
   {
    "id": "j256",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり受取利息の未収分5,100円を計上する。",
     "en": "At the end of the period, accrue interest income of 5,100 yen that has not yet been received."
    },
    "debit": [
     {
      "acct": {
       "ja": "未収利息",
       "en": "Accrued interest receivable"
      },
      "amt": 5100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 5100
     }
    ],
    "accounts": [
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     }
    ],
      "exp": {"ja":"利息は当期に収益が発生しているが、まだ受け取っていない。借方に資産の未収利息、貸方に収益の受取利息を5,100円記入する。前受利息(負債)とする誤りに注意。","en":"Interest earned this period but not yet received is recorded by debiting Accrued interest receivable (an asset) and crediting Interest income (revenue) for 5,100 yen. Do not use the liability Unearned interest."}
    },
   {
    "id": "j257",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり未使用切手3,400円を貯蔵品に振り替える。",
     "en": "At the end of the period, transfer unused stamps of 3,400 yen to supplies."
    },
    "debit": [
     {
      "acct": {
       "ja": "貯蔵品",
       "en": "Storable supplies"
      },
      "amt": 3400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 3400
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     }
    ],
      "exp": {"ja":"未使用の切手は期末に残る資産なので、費用の通信費から取り除き貯蔵品に振り替える。借方に貯蔵品、貸方に通信費で3,400円。振替を忘れて全額を費用のままにする誤りに注意。","en":"Unused stamps are an asset at period end, so remove them from the expense Communication expense and move them to Supplies: debit Supplies, credit Communication expense, 3,400 yen. Do not leave the whole amount as expense."}
    },
   {
    "id": "j258",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算整理。期首商品42,500円を仕入勘定へ振り替える(しくり)。",
     "en": "Closing adjustment: transfer the beginning merchandise inventory of 42,500 yen to the Purchases account (the 'shikuri' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 42500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 42500
     }
    ],
    "accounts": [
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"三分法の決算整理で、期首の繰越商品は当期に売れた分として売上原価に加える。借方に仕入、貸方に繰越商品で期首商品棚卸高42,500円。期末商品の振替(くりし)と借貸が逆になる誤りに注意。","en":"In the three-account method, beginning inventory is added to cost of goods sold: debit Purchases and credit Merchandise inventory for 42,500 yen. Do not reverse it, as that is the ending-inventory entry."}
    },
   {
    "id": "j259",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算整理。期末商品81,600円を繰越商品へ振り替える(くりし)。",
     "en": "Closing adjustment: transfer the ending merchandise inventory of 81,600 yen to the inventory account (the 'kurishi' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 81600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 81600
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "土地",
      "en": "Land"
     }
    ],
      "exp": {"ja":"期末商品棚卸高81,600円は売れ残りで資産なので、借方に繰越商品を計上する。同額を貸方の仕入に記入して売上原価から差し引く。期首の振替(しくり)と借貸を逆にする誤りに注意。","en":"Ending inventory of 81,600 yen is unsold and therefore an asset: debit Merchandise inventory and credit Purchases to deduct it from cost of goods sold. Do not reverse it as in the beginning-inventory entry."}
    },
   {
    "id": "j260",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり売上560,700円を損益勘定に振り替える。",
     "en": "At the end of the period, transfer sales of 560,700 yen to the income summary account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 560700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "損益",
       "en": "Income summary"
      },
      "amt": 560700
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"決算振替では収益の勘定残高を損益勘定へ集める。売上は貸方残高なので借方に売上を記入して残高をゼロにし、貸方に損益を560,700円記入する。費用の振替(借方損益)と逆にする誤りに注意。","en":"Closing entries gather revenue into the income summary. Sales has a credit balance, so debit Sales to clear 560,700 yen and credit Income summary. Expenses are closed the opposite way (debit Income summary), so do not mix them up."}
    },
   {
    "id": "j261",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり備品の減価償却費47,800円を間接法で計上する。",
     "en": "At the end of the period, record depreciation expense of 47,800 yen on equipment using the indirect method."
    },
    "debit": [
     {
      "acct": {
       "ja": "減価償却費",
       "en": "Depreciation expense"
      },
      "amt": 47800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "減価償却累計額",
       "en": "Accumulated depreciation"
      },
      "amt": 47800
     }
    ],
    "accounts": [
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"費用として借方に減価償却費47,800円。間接法では貸方を備品ではなく減価償却累計額とし、備品の取得原価はそのまま残す。直接法と間接法を取り違える誤りに注意。","en":"Debit Depreciation expense for 47,800 yen. With the indirect method, credit Accumulated depreciation and leave the Equipment cost unchanged. The direct method, which credits Equipment, is a common mix-up."}
    },
   {
    "id": "j262",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり貸倒引当金20,900円を差額補充法で繰り入れる。",
     "en": "At the end of the period, provide 20,900 yen to the allowance for doubtful accounts using the difference method (replenishment method)."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸倒引当金繰入",
       "en": "Bad debt expense"
      },
      "amt": 20900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸倒引当金",
       "en": "Allowance for doubtful accounts"
      },
      "amt": 20900
     }
    ],
    "accounts": [
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     }
    ],
      "exp": {"ja":"繰入額20,900円は見積額と引当金残高の差額で、借方は貸倒引当金繰入(費用)、貸方は貸倒引当金。貸倒損失とする誤り、見積額全額を繰り入れる誤りに注意。","en":"The 20,900 yen is the difference between the estimated amount and the current allowance balance: debit the expense Provision for doubtful accounts and credit Allowance for doubtful accounts. Do not use Bad debt loss."}
    },
   {
    "id": "j263",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり支払保険料の前払分20,000円を前払保険料に振り替える。",
     "en": "At the end of the period, transfer the prepaid portion of insurance expense, 20,000 yen, to prepaid insurance."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払保険料",
       "en": "Prepaid insurance"
      },
      "amt": 20000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "保険料",
       "en": "Insurance expense"
      },
      "amt": 20000
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"翌期分の保険料は費用から取り除き、前払保険料(資産)に振り替える。借方前払保険料、貸方保険料で20,000円。未払保険料とする誤りに注意。","en":"Remove the next period's premium from expense by debiting Prepaid insurance and crediting Insurance expense, 20,000 yen. Do not record it as a liability such as Accrued insurance."}
    },
   {
    "id": "j264",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり支払利息の未払分8,100円を計上する。",
     "en": "At the end of the period, accrue unpaid interest expense of 8,100 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 8100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払利息",
       "en": "Accrued interest payable"
      },
      "amt": 8100
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"当期分の利息で未払いのものは、費用の支払利息を借方に、負債の未払利息を貸方に8,100円計上する。資産の未収利息を使う誤りに注意。","en":"Unpaid interest for this period is an expense: debit Interest expense, credit Accrued interest payable, 8,100 yen. Using the asset Accrued interest receivable is a common error."}
    },
   {
    "id": "j265",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり受取地代の前受分1,700円を計上する。",
     "en": "At the end of the period, record unearned land rent of 1,700 yen received in advance."
    },
    "debit": [
     {
      "acct": {
       "ja": "受取地代",
       "en": "Land rent income"
      },
      "amt": 1700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受地代",
       "en": "Unearned land rent"
      },
      "amt": 1700
     }
    ],
    "accounts": [
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"次期分の地代は、受取地代(収益)を借方で取り消し、前受地代(負債)として貸方に1,700円記入する。収益を減らさず借貸を逆にする誤りに注意。","en":"Cancel the next period's rent from revenue by debiting Land rent income and recording Unearned land rent as a liability (credit), 1,700 yen. Reversing the sides is a common mistake."}
    },
   {
    "id": "j266",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり受取利息の未収分4,100円を計上する。",
     "en": "At the end of the period, accrue interest income of 4,100 yen that has not yet been received."
    },
    "debit": [
     {
      "acct": {
       "ja": "未収利息",
       "en": "Accrued interest receivable"
      },
      "amt": 4100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 4100
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"当期に発生して未収の利息は、受取利息(収益)を貸方に、未収利息(資産)を借方に4,100円計上する。収益の計上漏れ、負債の前受利息とする誤りに注意。","en":"Debit Accrued interest receivable and credit Interest income for 4,100 yen, since the revenue arose in this period. Omitting the revenue or using a liability such as Unearned interest is wrong."}
    },
   {
    "id": "j267",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり未使用切手7,400円を貯蔵品に振り替える。",
     "en": "At the end of the period, transfer unused stamps of 7,400 yen to supplies."
    },
    "debit": [
     {
      "acct": {
       "ja": "貯蔵品",
       "en": "Storable supplies"
      },
      "amt": 7400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 7400
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"購入時に通信費とした切手のうち未使用分は、貯蔵品(資産)にする。借方貯蔵品、貸方通信費で7,400円。消耗品や消耗品費と取り違える誤りに注意。","en":"Stamps bought as communication expense but not used are reclassified as an asset. Debit Supplies and credit Communication expense for 7,400 yen. Do not confuse them with consumable office supplies."}
    },
   {
    "id": "j268",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算整理。期首商品73,500円を仕入勘定へ振り替える(しくり)。",
     "en": "Closing adjustment: transfer the beginning merchandise inventory of 73,500 yen to the Purchases account (the 'shikuri' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 73500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 73500
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     }
    ],
      "exp": {"ja":"期首商品棚卸高73,500円を、仕入勘定で売上原価を算定するために借方の仕入、貸方の繰越商品へ振り替える。繰越商品を借方にする誤りに注意。","en":"Move the beginning inventory of 73,500 yen into Purchases so that cost of goods sold can be computed there: debit Purchases and credit Merchandise inventory. Debiting the inventory account is wrong."}
    },
   {
    "id": "j269",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算整理。期末商品22,600円を繰越商品へ振り替える(くりし)。",
     "en": "Closing adjustment: transfer the ending merchandise inventory of 22,600 yen to the inventory account (the 'kurishi' entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 22600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 22600
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     }
    ],
      "exp": {"ja":"売れ残った期末商品は売上原価に含めない。借方繰越商品、貸方仕入で22,600円。期首商品の振替と同じ向きにしてしまう誤りに注意。","en":"Unsold goods are excluded from cost of goods sold: debit Merchandise inventory and credit Purchases for 22,600 yen. Using the same direction as the beginning-inventory entry is a common mistake."}
    },
   {
    "id": "j270",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり売上951,700円を損益勘定に振り替える。",
     "en": "At the end of the period, transfer sales of 951,700 yen to the income summary account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 951700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "損益",
       "en": "Income summary"
      },
      "amt": 951700
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"収益の売上951,700円は貸方残高。それを消すため借方に売上、集計先の貸方に損益を記入する。仕入などの費用は逆に借方損益になる点との取り違えに注意。","en":"Sales of 951,700 yen is a credit balance, so debit Sales to zero it and credit Income summary. Expense accounts such as Purchases go the other way, with Income summary debited."}
    },
   {
    "id": "j271",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり備品の減価償却費38,800円を間接法で計上する。",
     "en": "At the end of the period, record depreciation expense of 38,800 yen on equipment using the indirect method."
    },
    "debit": [
     {
      "acct": {
       "ja": "減価償却費",
       "en": "Depreciation expense"
      },
      "amt": 38800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "減価償却累計額",
       "en": "Accumulated depreciation"
      },
      "amt": 38800
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"減価償却費は費用の発生なので借方に計上する。間接法は備品を直接減らさず、備品のマイナスを示す減価償却累計額を貸方に38,800円記入する。備品を貸方にする直接法との取り違えに注意。","en":"Depreciation expense is debited for 38,800 yen. Under the indirect method the credit goes to Accumulated depreciation, a contra account to Equipment, not to Equipment itself. Do not mix up the direct and indirect methods."}
    },
   {
    "id": "j272",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり貸倒引当金7,500円を差額補充法で繰り入れる。",
     "en": "At the end of the period, provide 7,500 yen to the allowance for doubtful accounts using the difference method (replenishment method)."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸倒引当金繰入",
       "en": "Bad debt expense"
      },
      "amt": 7500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸倒引当金",
       "en": "Allowance for doubtful accounts"
      },
      "amt": 7500
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"差額補充法では、貸倒見積額と現在の貸倒引当金残高の差額だけを補充する。その差額7,500円を借方の貸倒引当金繰入(費用)、貸方の貸倒引当金に記入する。見積額の全額を繰り入れる誤りに注意。","en":"Under the difference method only the shortfall between the estimate and the existing allowance is added. Debit Provision for doubtful accounts (an expense) and credit Allowance for doubtful accounts for 7,500 yen. Do not book the full estimate."}
    },
   {
    "id": "j273",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり支払保険料の前払分6,600円を前払保険料に振り替える。",
     "en": "At the end of the period, transfer the prepaid portion of insurance expense, 6,600 yen, to prepaid insurance."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払保険料",
       "en": "Prepaid insurance"
      },
      "amt": 6600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "保険料",
       "en": "Insurance expense"
      },
      "amt": 6600
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"支払った保険料のうち翌期分は当期の費用ではない。借方に資産の前払保険料、貸方に費用の保険料を6,600円記入して費用を減らす。未払保険料(負債)とする誤り、借貸を逆にする誤りに注意。","en":"The part of the premium that covers the next period is not an expense of this period. Debit Prepaid insurance (an asset) and credit Insurance expense for 6,600 yen. Do not call it Accrued insurance (a liability) or reverse the entry."}
    },
   {
    "id": "j274",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり支払利息の未払分4,700円を計上する。",
     "en": "At the end of the period, accrue unpaid interest expense of 4,700 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 4700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払利息",
       "en": "Accrued interest payable"
      },
      "amt": 4700
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     }
    ],
      "exp": {"ja":"利息は期間の経過で当期に費用が発生しているが、まだ支払っていない。借方に支払利息(費用)、貸方に未払利息(負債)を4,700円記入する。前払利息や未収利息と取り違える誤りに注意。","en":"Interest has accrued over the period but has not been paid, so debit Interest expense and credit Accrued interest payable (a liability) for 4,700 yen. Do not confuse it with prepaid or accrued interest receivable."}
    },
   {
    "id": "j275",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり受取地代の前受分8,300円を計上する。",
     "en": "At the end of the period, record unearned land rent of 8,300 yen received in advance."
    },
    "debit": [
     {
      "acct": {
       "ja": "受取地代",
       "en": "Land rent income"
      },
      "amt": 8300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受地代",
       "en": "Unearned land rent"
      },
      "amt": 8300
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"受け取った地代のうち次期分は当期の収益ではない。借方に収益の受取地代を記入して減らし、貸方に負債の前受地代を8,300円計上する。未収地代(資産)とする誤りに注意。","en":"The part of the rent that relates to the next period is not revenue of this period. Debit Land rent income to reduce it and credit Unearned land rent (a liability) for 8,300 yen. Do not use the asset Accrued land rent."}
    },
   {
    "id": "j276",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "入金伝票。商品を767,700円で売り上げ現金を受け取った。",
     "en": "Cash receipt slip: sold merchandise for 767,700 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 767700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 767700
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"入金伝票は現金の増加を表す伝票。商品の現金売上なので借方に現金、貸方に売上を記入し、金額は767,700円。出金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A receipt slip records an increase in cash, so the debit is Cash. A cash sale of 767,700 yen is debit Cash, credit Sales. Do not confuse it with a payment slip."}
    },
   {
    "id": "j277",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "出金伝票。商品を806,800円で仕入れ現金で支払った。",
     "en": "Cash payment slip: purchased merchandise for 806,800 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 806800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 806800
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"出金伝票は現金の減少を表す伝票。商品の現金仕入なので借方に仕入、貸方に現金を806,800円記入する。入金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A payment slip records a decrease in cash, so the credit is Cash. A cash purchase of merchandise for 806,800 yen is debit Purchases, credit Cash. Do not confuse it with a receipt slip and reverse the sides."}
    },
   {
    "id": "j278",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "振替伝票。商品を845,900円で掛け仕入れした。",
     "en": "Transfer slip: purchased merchandise on credit for 845,900 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 845900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 845900
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     }
    ],
      "exp": {"ja":"掛け仕入は現金が動かない取引なので振替伝票を使う。借方に仕入、貸方に買掛金(負債の増加)を845,900円記入する。売掛金や支払手形と取り違える誤りに注意。","en":"A credit purchase involves no cash, so a transfer slip is used: debit Purchases and credit Accounts payable (a liability) for 845,900 yen. Do not confuse it with Accounts receivable or Notes payable."}
    },
   {
    "id": "j279",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "振替伝票。商品を885,000円で掛け売上げした。",
     "en": "Transfer slip: sold merchandise on credit for 885,000 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 885000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 885000
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     }
    ],
      "exp": {"ja":"掛け売上げは現金が動かない取引なので振替伝票を使う。借方に売掛金(資産の増加)、貸方に売上を885,000円記入する。買掛金や未収入金と取り違える誤りに注意。","en":"A credit sale involves no cash, so a transfer slip is used: debit Accounts receivable (an asset) and credit Sales for 885,000 yen. Do not confuse it with Accounts payable or Other receivable."}
    },
   {
    "id": "j280",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "出金伝票。旅費交通費924,100円を現金で支払った。",
     "en": "Cash payment slip: paid travel and transportation expenses of 924,100 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 924100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 924100
     }
    ],
    "accounts": [
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     }
    ],
      "exp": {"ja":"旅費交通費の支払は費用の発生なので借方に旅費交通費、現金の減少で貸方に現金を924,100円。現金払いなので出金伝票を使う。通信費や仕入と取り違える誤りに注意。","en":"Paying travel and transportation expenses creates an expense, so debit Travel and transportation expenses and credit Cash for 924,100 yen. A payment slip is used because it is a cash payment. Do not mistake it for communication expense or purchases."}
    },
   {
    "id": "j281",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "入金伝票。商品を963,200円で売り上げ現金を受け取った。",
     "en": "Cash receipt slip: sold merchandise for 963,200 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 963200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 963200
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"現金を受け取る取引は入金伝票を使い、仕訳は借方に現金、貸方に売上を963,200円。売掛金とする誤り、出金伝票で起票する誤りに注意。","en":"Cash received is recorded on a receipt slip: debit Cash and credit Sales for 963,200 yen. Recording it as Accounts receivable, or on a payment slip, is a mistake."}
    },
   {
    "id": "j282",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "出金伝票。商品を17,900円で仕入れ現金で支払った。",
     "en": "Cash payment slip: purchased merchandise for 17,900 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 17900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 17900
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"現金で支払う取引は出金伝票を使い、借方仕入、貸方現金の仕訳になる。金額は17,900円。買掛金とする誤り、入金伝票で起票する誤りに注意。","en":"Cash paid goes on a payment slip: debit Purchases, credit Cash, 17,900 yen. Recording Accounts payable or using a receipt slip is a mistake."}
    },
   {
    "id": "j283",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "振替伝票。商品を57,000円で掛け仕入れした。",
     "en": "Transfer slip: purchased merchandise on credit for 57,000 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 57000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 57000
     }
    ],
    "accounts": [
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"代金を後で支払う商品の仕入は、借方仕入、貸方買掛金で57,000円。現金の入出金を伴わないため振替伝票で起票する。買掛金を未払金とする誤りに注意。","en":"Merchandise bought with payment later is debit Purchases, credit Accounts payable, 57,000 yen, written on a transfer slip because no cash moves. Using Other payable is a mistake, as that is for non-merchandise."}
    },
   {
    "id": "j284",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "振替伝票。商品を96,100円で掛け売上げした。",
     "en": "Transfer slip: sold merchandise on credit for 96,100 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 96100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 96100
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     }
    ],
      "exp": {"ja":"代金を後で受け取る商品の売上は、借方売掛金、貸方売上で96,100円。入金がないので振替伝票を使う。借貸を逆にして買掛金とする誤りに注意。","en":"Merchandise sold with payment later is debit Accounts receivable, credit Sales, 96,100 yen, on a transfer slip as there is no cash receipt. Reversing the sides to Accounts payable is a common mistake."}
    },
   {
    "id": "j285",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "出金伝票。旅費交通費135,200円を現金で支払った。",
     "en": "Cash payment slip: paid travel and transportation expenses of 135,200 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 135200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 135200
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     }
    ],
      "exp": {"ja":"交通費などの現金払いは出金伝票で起票し、借方に旅費交通費(費用)、貸方に現金で135,200円。入金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A cash payment of travel costs goes on a payment slip: debit Travel and transportation expenses, credit Cash, 135,200 yen. Using a receipt slip and reversing the sides is a common error."}
    },
   {
    "id": "j286",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "入金伝票。商品を174,300円で売り上げ現金を受け取った。",
     "en": "Cash receipt slip: sold merchandise for 174,300 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 174300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 174300
     }
    ],
    "accounts": [
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"入金伝票は現金の増加を表す伝票。商品の現金売上なので借方に現金、貸方に売上を記入し、金額は174,300円。出金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A receipt slip records an increase in cash, so the debit is Cash. A cash sale of 174,300 yen is debit Cash, credit Sales. Do not confuse it with a payment slip."}
    },
   {
    "id": "j287",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "出金伝票。商品を213,400円で仕入れ現金で支払った。",
     "en": "Cash payment slip: purchased merchandise for 213,400 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 213400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 213400
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     }
    ],
      "exp": {"ja":"出金伝票は現金の減少を表す伝票。商品の現金仕入なので借方に仕入、貸方に現金を213,400円記入する。入金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A payment slip records a decrease in cash, so the credit is Cash. A cash purchase of merchandise for 213,400 yen is debit Purchases, credit Cash. Do not confuse it with a receipt slip and reverse the sides."}
    },
   {
    "id": "j288",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "振替伝票。商品を252,500円で掛け仕入れした。",
     "en": "Transfer slip: purchased merchandise on credit for 252,500 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 252500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 252500
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     }
    ],
      "exp": {"ja":"掛け仕入は現金が動かない取引なので振替伝票を使う。借方に仕入、貸方に買掛金(負債の増加)を252,500円記入する。売掛金や支払手形と取り違える誤りに注意。","en":"A credit purchase involves no cash, so a transfer slip is used: debit Purchases and credit Accounts payable (a liability) for 252,500 yen. Do not confuse it with Accounts receivable or Notes payable."}
    },
   {
    "id": "j289",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "振替伝票。商品を291,600円で掛け売上げした。",
     "en": "Transfer slip: sold merchandise on credit for 291,600 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 291600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 291600
     }
    ],
    "accounts": [
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     }
    ],
      "exp": {"ja":"掛け売上げは現金が動かない取引なので振替伝票を使う。借方に売掛金(資産の増加)、貸方に売上を291,600円記入する。買掛金や未収入金と取り違える誤りに注意。","en":"A credit sale involves no cash, so a transfer slip is used: debit Accounts receivable (an asset) and credit Sales for 291,600 yen. Do not confuse it with Accounts payable or Other receivable."}
    },
   {
    "id": "j290",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "出金伝票。旅費交通費330,700円を現金で支払った。",
     "en": "Cash payment slip: paid travel and transportation expenses of 330,700 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 330700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 330700
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"旅費交通費の支払は費用の発生なので借方に旅費交通費、現金の減少で貸方に現金を330,700円。現金払いなので出金伝票を使う。通信費や仕入と取り違える誤りに注意。","en":"Paying travel and transportation expenses creates an expense, so debit Travel and transportation expenses and credit Cash for 330,700 yen. A payment slip is used because it is a cash payment. Do not mistake it for communication expense or purchases."}
    },
   {
    "id": "j291",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "入金伝票。商品を369,800円で売り上げ現金を受け取った。",
     "en": "Cash receipt slip: sold merchandise for 369,800 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 369800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 369800
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     }
    ],
      "exp": {"ja":"現金を受け取る取引は入金伝票を使い、仕訳は借方に現金、貸方に売上を369,800円。売掛金とする誤り、出金伝票で起票する誤りに注意。","en":"Cash received is recorded on a receipt slip: debit Cash and credit Sales for 369,800 yen. Recording it as Accounts receivable, or on a payment slip, is a mistake."}
    },
   {
    "id": "j292",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "出金伝票。商品を408,900円で仕入れ現金で支払った。",
     "en": "Cash payment slip: purchased merchandise for 408,900 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 408900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 408900
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     }
    ],
      "exp": {"ja":"現金で支払う取引は出金伝票を使い、借方仕入、貸方現金の仕訳になる。金額は408,900円。買掛金とする誤り、入金伝票で起票する誤りに注意。","en":"Cash paid goes on a payment slip: debit Purchases, credit Cash, 408,900 yen. Recording Accounts payable or using a receipt slip is a mistake."}
    },
   {
    "id": "j293",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "振替伝票。商品を448,000円で掛け仕入れした。",
     "en": "Transfer slip: purchased merchandise on credit for 448,000 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 448000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 448000
     }
    ],
    "accounts": [
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"代金を後で支払う商品の仕入は、借方仕入、貸方買掛金で448,000円。現金の入出金を伴わないため振替伝票で起票する。買掛金を未払金とする誤りに注意。","en":"Merchandise bought with payment later is debit Purchases, credit Accounts payable, 448,000 yen, written on a transfer slip because no cash moves. Using Other payable is a mistake, as that is for non-merchandise."}
    },
   {
    "id": "j294",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "振替伝票。商品を487,100円で掛け売上げした。",
     "en": "Transfer slip: sold merchandise on credit for 487,100 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 487100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 487100
     }
    ],
    "accounts": [
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"代金を後で受け取る商品の売上は、借方売掛金、貸方売上で487,100円。入金がないので振替伝票を使う。借貸を逆にして買掛金とする誤りに注意。","en":"Merchandise sold with payment later is debit Accounts receivable, credit Sales, 487,100 yen, on a transfer slip as there is no cash receipt. Reversing the sides to Accounts payable is a common mistake."}
    },
   {
    "id": "j295",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "出金伝票。旅費交通費526,200円を現金で支払った。",
     "en": "Cash payment slip: paid travel and transportation expenses of 526,200 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 526200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 526200
     }
    ],
    "accounts": [
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"交通費などの現金払いは出金伝票で起票し、借方に旅費交通費(費用)、貸方に現金で526,200円。入金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A cash payment of travel costs goes on a payment slip: debit Travel and transportation expenses, credit Cash, 526,200 yen. Using a receipt slip and reversing the sides is a common error."}
    },
   {
    "id": "j296",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "入金伝票。商品を565,300円で売り上げ現金を受け取った。",
     "en": "Cash receipt slip: sold merchandise for 565,300 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 565300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 565300
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     }
    ],
      "exp": {"ja":"入金伝票は現金の増加を表す伝票。商品の現金売上なので借方に現金、貸方に売上を記入し、金額は565,300円。出金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A receipt slip records an increase in cash, so the debit is Cash. A cash sale of 565,300 yen is debit Cash, credit Sales. Do not confuse it with a payment slip."}
    },
   {
    "id": "j297",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "出金伝票。商品を604,400円で仕入れ現金で支払った。",
     "en": "Cash payment slip: purchased merchandise for 604,400 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 604400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 604400
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     }
    ],
      "exp": {"ja":"出金伝票は現金の減少を表す伝票。商品の現金仕入なので借方に仕入、貸方に現金を604,400円記入する。入金伝票と取り違えて借貸を逆にする誤りに注意。","en":"A payment slip records a decrease in cash, so the credit is Cash. A cash purchase of merchandise for 604,400 yen is debit Purchases, credit Cash. Do not confuse it with a receipt slip and reverse the sides."}
    },
   {
    "id": "j298",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "振替伝票。商品を643,500円で掛け仕入れした。",
     "en": "Transfer slip: purchased merchandise on credit for 643,500 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 643500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 643500
     }
    ],
    "accounts": [
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     }
    ],
      "exp": {"ja":"掛け仕入は現金が動かない取引なので振替伝票を使う。借方に仕入、貸方に買掛金(負債の増加)を643,500円記入する。売掛金や支払手形と取り違える誤りに注意。","en":"A credit purchase involves no cash, so a transfer slip is used: debit Purchases and credit Accounts payable (a liability) for 643,500 yen. Do not confuse it with Accounts receivable or Notes payable."}
    },
   {
    "id": "j299",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "振替伝票。商品を682,600円で掛け売上げした。",
     "en": "Transfer slip: sold merchandise on credit for 682,600 yen."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 682600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 682600
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     }
    ],
      "exp": {"ja":"掛け売上げは現金が動かない取引なので振替伝票を使う。借方に売掛金(資産の増加)、貸方に売上を682,600円記入する。買掛金や未収入金と取り違える誤りに注意。","en":"A credit sale involves no cash, so a transfer slip is used: debit Accounts receivable (an asset) and credit Sales for 682,600 yen. Do not confuse it with Accounts payable or Other receivable."}
    },
   {
    "id": "j300",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "出金伝票。旅費交通費721,700円を現金で支払った。",
     "en": "Cash payment slip: paid travel and transportation expenses of 721,700 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 721700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 721700
     }
    ],
    "accounts": [
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"旅費交通費の支払は費用の発生なので借方に旅費交通費、現金の減少で貸方に現金を721,700円。現金払いなので出金伝票を使う。通信費や仕入と取り違える誤りに注意。","en":"Paying travel and transportation expenses creates an expense, so debit Travel and transportation expenses and credit Cash for 721,700 yen. A payment slip is used because it is a cash payment. Do not mistake it for communication expense or purchases."}
    },
      {"id":"j301","dom":"kihon","diff":3,"q":{"ja":"借入金800,000円（年利3%、借入期間6か月）を返済日に、利息とともに普通預金から支払った。利息は月割で計算する。","en":"A loan of 800,000 yen (annual interest rate of 3%, borrowing period of 6 months) was repaid from the ordinary deposit account together with interest. Interest is calculated on a monthly basis."},"debit":[{"acct":{"ja":"借入金","en":"Loans payable"},"amt":800000},{"acct":{"ja":"支払利息","en":"Interest expense"},"amt":12000}],"credit":[{"acct":{"ja":"普通預金","en":"Ordinary deposit"},"amt":812000}],"accounts":[{"ja":"借入金","en":"Loans payable"},{"ja":"受取利息","en":"Interest income"},{"ja":"貸付金","en":"Loans receivable"},{"ja":"支払利息","en":"Interest expense"},{"ja":"未払利息","en":"Accrued interest payable"},{"ja":"普通預金","en":"Ordinary deposit"},{"ja":"現金","en":"Cash"},{"ja":"当座預金","en":"Checking"}],"exp":{"ja":"元本の返済で借入金（負債）が減り、利息は費用の支払利息。800,000×3%×6/12＝12,000、普通預金の減少は812,000円。年利のまま24,000円とする誤りや、利息を借入金に含める誤りに注意。","en":"Repaying principal reduces loans payable, while interest is an expense: 800,000 x 3% x 6/12 = 12,000, so the deposit decreases by 812,000. Do not use the full-year interest of 24,000 or include interest in loans payable."}},
      {"id":"j302","dom":"kihon","diff":1,"q":{"ja":"個人商店を開業するにあたり、現金800,000円を元入れした。","en":"A sole proprietor started a business by investing 800,000 yen in cash as capital."},"debit":[{"acct":{"ja":"現金","en":"Cash"},"amt":800000}],"credit":[{"acct":{"ja":"資本金","en":"Capital stock"},"amt":800000}],"accounts":[{"ja":"借入金","en":"Loans payable"},{"ja":"現金","en":"Cash"},{"ja":"引出金","en":"Drawings"},{"ja":"資本金","en":"Capital stock"},{"ja":"売上","en":"Sales"},{"ja":"預り金","en":"Deposits received"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"普通預金","en":"Ordinary deposit"}],"exp":{"ja":"元入れは店主の出資で、現金（資産）と資本金（純資産）がともに増える。借方現金800,000円、貸方資本金800,000円。出資を借入金や売上とする誤りが多い。","en":"The owner's investment increases cash (an asset) and capital stock (equity) by the same amount. Debit cash 800,000 and credit capital stock 800,000. A common error is to record the investment as a loan or as sales."}},
      {"id":"j303","dom":"kihon","diff":2,"q":{"ja":"店主が追加の元入れとして、自家用の乗用車（時価900,000円）を事業用に提供した。","en":"As additional capital, the owner contributed his personal car, with a market value of 900,000 yen, to the business."},"debit":[{"acct":{"ja":"車両運搬具","en":"Vehicles"},"amt":900000}],"credit":[{"acct":{"ja":"資本金","en":"Capital stock"},"amt":900000}],"accounts":[{"ja":"備品","en":"Equipment"},{"ja":"車両運搬具","en":"Vehicles"},{"ja":"未払金","en":"Other payable"},{"ja":"資本金","en":"Capital stock"},{"ja":"固定資産売却益","en":"Gain on sale of fixed assets"},{"ja":"借入金","en":"Loans payable"},{"ja":"引出金","en":"Drawings"},{"ja":"繰越利益剰余金","en":"Retained earnings"}],"exp":{"ja":"店主が現物を出資したので、車両運搬具（資産）と資本金（純資産）が増える。時価900,000円で受け入れる。備品とする誤りや、貸方を借入金や固定資産売却益とする誤りに注意。","en":"Because the owner contributed an asset in kind, vehicles (an asset) and capital stock (equity) both increase, at the market value of 900,000 yen. Do not use equipment, and do not credit loans payable or gain on sale of fixed assets."}},
      {"id":"j304","dom":"kihon","diff":1,"q":{"ja":"出張する従業員に、旅費の概算額60,000円を現金で渡した。","en":"The company gave an employee going on a business trip 60,000 yen in cash as an estimated travel allowance."},"debit":[{"acct":{"ja":"仮払金","en":"Suspense payment"},"amt":60000}],"credit":[{"acct":{"ja":"現金","en":"Cash"},"amt":60000}],"accounts":[{"ja":"旅費交通費","en":"Travel expense"},{"ja":"現金","en":"Cash"},{"ja":"立替金","en":"Advances to others"},{"ja":"仮払金","en":"Suspense payment"},{"ja":"前払金","en":"Advance paid"},{"ja":"貸付金","en":"Loans receivable"},{"ja":"仮受金","en":"Suspense receipt"},{"ja":"未払金","en":"Other payable"}],"exp":{"ja":"金額や内容がまだ確定しない支出は仮払金（資産）で処理し、精算時に確定した科目へ振り替える。借方仮払金、貸方現金。この時点で旅費交通費とする誤りや、立替金との取り違えに注意。","en":"An outlay whose final amount is not yet fixed is recorded as suspense payment (an asset) and moved to the proper account at settlement. Debit suspense payment and credit cash. Do not record travel expense yet or use advances to others."}},
      {"id":"j305","dom":"kihon","diff":3,"q":{"ja":"個人商店を開業するにあたり、店主が事業用に現金600,000円と備品400,000円を出資し、あわせて事業に関する借入金250,000円を引き継いだ。","en":"A sole proprietor started a business by contributing 600,000 yen in cash and equipment of 400,000 yen, and the business also took over a loan of 250,000 yen."},"debit":[{"acct":{"ja":"現金","en":"Cash"},"amt":600000},{"acct":{"ja":"備品","en":"Equipment"},"amt":400000}],"credit":[{"acct":{"ja":"借入金","en":"Loans payable"},"amt":250000},{"acct":{"ja":"資本金","en":"Capital stock"},"amt":750000}],"accounts":[{"ja":"買掛金","en":"Accounts payable"},{"ja":"現金","en":"Cash"},{"ja":"資本金","en":"Capital stock"},{"ja":"建物","en":"Buildings"},{"ja":"借入金","en":"Loans payable"},{"ja":"備品","en":"Equipment"},{"ja":"売掛金","en":"Accounts receivable"},{"ja":"引出金","en":"Drawings"},{"ja":"未払金","en":"Other payable"}],"exp":{"ja":"資産の合計1,000,000円から引き継ぐ負債250,000円を引いた差額が資本金になる。600,000＋400,000－250,000＝750,000。借入金を引かずに資本金を1,000,000円とする誤りに注意。","en":"Capital equals the contributed assets of 1,000,000 yen minus the liability taken over: 600,000 + 400,000 - 250,000 = 750,000. A common error is to record capital stock at 1,000,000 yen without deducting the loan."}},
      {"id":"j306","dom":"kihon","diff":1,"q":{"ja":"仲介した取引の手数料35,000円を現金で受け取った。","en":"A commission of 35,000 yen for an intermediated transaction was received in cash."},"debit":[{"acct":{"ja":"現金","en":"Cash"},"amt":35000}],"credit":[{"acct":{"ja":"受取手数料","en":"Commission income"},"amt":35000}],"accounts":[{"ja":"現金","en":"Cash"},{"ja":"受取手数料","en":"Commission income"},{"ja":"支払手数料","en":"Fee expense"},{"ja":"売上","en":"Sales"},{"ja":"受取利息","en":"Interest income"},{"ja":"前受金","en":"Advance received"},{"ja":"預り金","en":"Deposits received"},{"ja":"仮受金","en":"Suspense receipt"}],"exp":{"ja":"手数料の受取は収益の発生で、現金（資産）が増える。借方現金、貸方受取手数料。支払手数料（費用）と取り違える誤りや、売上に計上する誤りに注意。","en":"Receiving a commission is revenue earned, and cash (an asset) increases. Debit cash and credit commission income. Do not confuse it with commission expense, and do not record it as sales."}},
      {"id":"j307","dom":"kihon","diff":2,"q":{"ja":"普通預金口座に70,000円の入金があったが、その内容は不明である。","en":"A deposit of 70,000 yen was made into the ordinary deposit account, but its nature is unknown."},"debit":[{"acct":{"ja":"普通預金","en":"Ordinary deposit"},"amt":70000}],"credit":[{"acct":{"ja":"仮受金","en":"Suspense receipt"},"amt":70000}],"accounts":[{"ja":"売掛金","en":"Accounts receivable"},{"ja":"普通預金","en":"Ordinary deposit"},{"ja":"売上","en":"Sales"},{"ja":"雑益","en":"Miscellaneous gain"},{"ja":"仮受金","en":"Suspense receipt"},{"ja":"前受金","en":"Advance received"},{"ja":"預り金","en":"Deposits received"},{"ja":"仮払金","en":"Suspense payment"}],"exp":{"ja":"入金の理由が不明なので、売掛金の回収や売上と決めつけず、仮受金（仮の勘定）で処理して内容が判明したら振り替える。借方普通預金、貸方仮受金。売上や雑益とする誤りに注意。","en":"Because the reason for the deposit is unknown, do not assume a collection of receivables or sales; record it as suspense receipt and reclassify it once the reason is known. Debit ordinary deposit and credit suspense receipt."}},
      {"id":"j308","dom":"kihon","diff":3,"q":{"ja":"決算にあたり、給料420,000円、支払家賃180,000円、通信費32,000円の各費用勘定の残高を損益勘定に振り替える。","en":"At the end of the period, transfer the balances of salaries expense of 420,000 yen, rent expense of 180,000 yen and communication expense of 32,000 yen to the income summary account."},"debit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":632000}],"credit":[{"acct":{"ja":"給料","en":"Salaries expense"},"amt":420000},{"acct":{"ja":"支払家賃","en":"Rent expense"},"amt":180000},{"acct":{"ja":"通信費","en":"Communication expense"},"amt":32000}],"accounts":[{"ja":"給料","en":"Salaries expense"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"損益","en":"Income summary"},{"ja":"支払家賃","en":"Rent expense"},{"ja":"売上","en":"Sales"},{"ja":"資本金","en":"Capital stock"},{"ja":"通信費","en":"Communication expense"},{"ja":"仕入","en":"Purchases"},{"ja":"消耗品費","en":"Supplies expense"}],"exp":{"ja":"費用は借方残高なので貸方に記入して消し、借方は損益勘定に集める。420,000＋180,000＋32,000＝632,000。貸借を逆にして損益を貸方にする誤りや、一部の費用を振り替え忘れる誤りに注意。","en":"Expenses have debit balances, so credit each expense account and debit the income summary for the total: 420,000 + 180,000 + 32,000 = 632,000. Do not reverse the direction or forget one of the expense accounts."}},
      {"id":"j309","dom":"kihon","diff":1,"q":{"ja":"所有する建物の一部を貸し、1か月分の家賃120,000円が普通預金口座に振り込まれた。","en":"Part of a building owned by the company was leased out, and one month of rent, 120,000 yen, was deposited into the ordinary deposit account."},"debit":[{"acct":{"ja":"普通預金","en":"Ordinary deposit"},"amt":120000}],"credit":[{"acct":{"ja":"受取家賃","en":"Rent income"},"amt":120000}],"accounts":[{"ja":"普通預金","en":"Ordinary deposit"},{"ja":"支払家賃","en":"Rent expense"},{"ja":"受取家賃","en":"Rent income"},{"ja":"前受金","en":"Advance received"},{"ja":"受取手数料","en":"Commission income"},{"ja":"売上","en":"Sales"},{"ja":"建物","en":"Buildings"},{"ja":"受取利息","en":"Interest income"}],"exp":{"ja":"家賃の受取は収益の発生で、普通預金（資産）が増える。借方普通預金、貸方受取家賃。支払家賃（費用）や前受金とする誤りに注意。当月分なので前受にはならない。","en":"Rent received is revenue earned, and the ordinary deposit (an asset) increases. Debit ordinary deposit and credit rent income. Do not use rent expense or advance received, since this is rent for the current month."}},
      {"id":"j310","dom":"kihon","diff":1,"q":{"ja":"決算にあたり、受取手数料勘定の残高85,000円を損益勘定に振り替える。","en":"At the end of the period, transfer the 85,000 yen balance of commission income to the income summary account."},"debit":[{"acct":{"ja":"受取手数料","en":"Commission income"},"amt":85000}],"credit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":85000}],"accounts":[{"ja":"受取手数料","en":"Commission income"},{"ja":"資本金","en":"Capital stock"},{"ja":"売上","en":"Sales"},{"ja":"損益","en":"Income summary"},{"ja":"現金","en":"Cash"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"受取利息","en":"Interest income"},{"ja":"支払手数料","en":"Fee expense"}],"exp":{"ja":"収益の勘定は貸方残高なので、借方に記入して残高を消し、貸方の損益勘定へ移す。借方受取手数料、貸方損益。費用の振替と同じ向き（借方損益）にしてしまう誤りが多い。","en":"A revenue account has a credit balance, so debit it to clear the balance and credit the income summary. Debit commission income and credit income summary. Using the direction for expenses (debit income summary) is a common error."}},
      {"id":"j311","dom":"kihon","diff":2,"q":{"ja":"株式会社の決算にあたり、損益勘定の借方合計（費用）が2,150,000円、貸方合計（収益）が1,770,000円であった。当期純損失を繰越利益剰余金勘定に振り替える。","en":"At the end of the period for a corporation, the income summary shows debit total (expenses) of 2,150,000 yen and credit total (revenue) of 1,770,000 yen. Transfer the net loss to retained earnings."},"debit":[{"acct":{"ja":"繰越利益剰余金","en":"Retained earnings"},"amt":380000}],"credit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":380000}],"accounts":[{"ja":"資本金","en":"Capital stock"},{"ja":"損益","en":"Income summary"},{"ja":"売上","en":"Sales"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"現金","en":"Cash"},{"ja":"引出金","en":"Drawings"},{"ja":"仕入","en":"Purchases"},{"ja":"給料","en":"Salaries expense"}],"exp":{"ja":"費用が収益を上回る分が当期純損失で、損益勘定の貸方に記入して借方残高を消し、借方は繰越利益剰余金（純資産の減少）とする。2,150,000－1,770,000＝380,000。貸借を逆にする誤りが多い。","en":"Net loss is expenses minus revenue: 2,150,000 - 1,770,000 = 380,000. Credit the income summary to close its debit balance and debit retained earnings (a decrease in equity). Reversing debit and credit is a common error."}},
      {"id":"j312","dom":"kihon","diff":3,"q":{"ja":"従業員への給料450,000円から所得税の源泉徴収額33,000円を差し引き、残額を普通預金口座から振り込んだ。","en":"Salaries of 450,000 yen were paid by transfer from the ordinary deposit account after deducting 33,000 yen of withheld income tax."},"debit":[{"acct":{"ja":"給料","en":"Salaries expense"},"amt":450000}],"credit":[{"acct":{"ja":"預り金","en":"Deposits received"},"amt":33000},{"acct":{"ja":"普通預金","en":"Ordinary deposit"},"amt":417000}],"accounts":[{"ja":"給料","en":"Salaries expense"},{"ja":"租税公課","en":"Taxes and dues"},{"ja":"預り金","en":"Deposits received"},{"ja":"仮払金","en":"Suspense payment"},{"ja":"普通預金","en":"Ordinary deposit"},{"ja":"未払金","en":"Other payable"},{"ja":"現金","en":"Cash"},{"ja":"立替金","en":"Advances to others"},{"ja":"当座預金","en":"Checking"}],"exp":{"ja":"給料は総額450,000円を費用とし、源泉徴収した所得税は後で納付する預り金（負債）とする。450,000－33,000＝417,000が普通預金の減少。差引後の417,000円で給料を計上する誤りに注意。","en":"Salaries expense is recorded at the gross amount of 450,000, and withheld income tax is deposits received (a liability). The deposit decreases by 450,000 - 33,000 = 417,000. Do not record salaries at the net amount of 417,000."}},
      {"id":"j313","dom":"kihon","diff":2,"q":{"ja":"決算にあたり、売上勘定の残高3,800,000円と受取利息勘定の残高12,000円を損益勘定に振り替える。","en":"At the end of the period, transfer the balances of sales of 3,800,000 yen and interest income of 12,000 yen to the income summary account."},"debit":[{"acct":{"ja":"売上","en":"Sales"},"amt":3800000},{"acct":{"ja":"受取利息","en":"Interest income"},"amt":12000}],"credit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":3812000}],"accounts":[{"ja":"損益","en":"Income summary"},{"ja":"支払利息","en":"Interest expense"},{"ja":"売上","en":"Sales"},{"ja":"現金","en":"Cash"},{"ja":"受取利息","en":"Interest income"},{"ja":"仕入","en":"Purchases"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"資本金","en":"Capital stock"}],"exp":{"ja":"売上と受取利息はいずれも収益で貸方残高のため、借方に記入して消し、貸方の損益にまとめる。3,800,000＋12,000＝3,812,000。受取利息を除いて売上だけ振り替える漏れが多い。","en":"Sales and interest income are both revenue with credit balances, so debit them and credit the income summary for the total: 3,800,000 + 12,000 = 3,812,000. Leaving out interest income is a common mistake."}},
      {"id":"j314","dom":"kihon","diff":2,"q":{"ja":"決算にあたり、仕入勘定の借方に仕入高2,500,000円、貸方に返品140,000円が記入されている。仕入勘定の残高を損益勘定に振り替える。","en":"At the end of the period, the purchases account shows purchases of 2,500,000 yen on the debit side and returns of 140,000 yen on the credit side. Transfer its balance to the income summary account."},"debit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":2360000}],"credit":[{"acct":{"ja":"仕入","en":"Purchases"},"amt":2360000}],"accounts":[{"ja":"売上","en":"Sales"},{"ja":"繰越商品","en":"Merchandise inventory"},{"ja":"仕入","en":"Purchases"},{"ja":"買掛金","en":"Accounts payable"},{"ja":"売上原価","en":"Cost of goods sold"},{"ja":"損益","en":"Income summary"},{"ja":"資本金","en":"Capital stock"},{"ja":"繰越利益剰余金","en":"Retained earnings"}],"exp":{"ja":"仕入勘定の残高は、借方2,500,000円から返品の貸方140,000円を引いた借方残高。2,500,000－140,000＝2,360,000。費用なので貸方仕入、借方損益。総額2,500,000円で振り替える誤りに注意。","en":"The purchases balance is the debit of 2,500,000 less the credit for returns of 140,000: 2,500,000 - 140,000 = 2,360,000. It is an expense, so credit purchases and debit the income summary. Do not transfer the gross 2,500,000."}},
      {"id":"j315","dom":"kihon","diff":3,"q":{"ja":"税抜方式で記帳している。商品500,000円（税抜）を仕入れ、消費税10%を加えた金額を掛けとした。","en":"Under the tax-exclusion method, merchandise priced at 500,000 yen excluding tax was purchased on account, and the amount owed includes 10% consumption tax."},"debit":[{"acct":{"ja":"仕入","en":"Purchases"},"amt":500000},{"acct":{"ja":"仮払消費税","en":"Suspense consumption tax paid"},"amt":50000}],"credit":[{"acct":{"ja":"買掛金","en":"Accounts payable"},"amt":550000}],"accounts":[{"ja":"仕入","en":"Purchases"},{"ja":"仮受消費税","en":"Suspense consumption tax received"},{"ja":"買掛金","en":"Accounts payable"},{"ja":"未払消費税","en":"Consumption tax payable"},{"ja":"仮払消費税","en":"Suspense consumption tax paid"},{"ja":"租税公課","en":"Taxes and dues"},{"ja":"現金","en":"Cash"},{"ja":"売掛金","en":"Accounts receivable"}],"exp":{"ja":"税抜方式では消費税分は仕入に含めず、仮払消費税（資産）で処理する。500,000×10%＝50,000、買掛金は550,000円。仕入を550,000円とする誤りや、仮受消費税と取り違える誤りに注意。","en":"Under the tax-exclusion method, consumption tax is not part of purchases but is recorded as suspense consumption tax paid: 500,000 x 10% = 50,000, so accounts payable is 550,000. Do not record purchases at 550,000 or use the received-tax account."}},
      {"id":"j316","dom":"kihon","diff":2,"q":{"ja":"商品の売買を仲介し、取引額4,000,000円の3%にあたる手数料を現金で受け取った。","en":"The company acted as an intermediary in a sale of goods and received in cash a commission equal to 3% of the transaction amount of 4,000,000 yen."},"debit":[{"acct":{"ja":"現金","en":"Cash"},"amt":120000}],"credit":[{"acct":{"ja":"受取手数料","en":"Commission income"},"amt":120000}],"accounts":[{"ja":"現金","en":"Cash"},{"ja":"売上","en":"Sales"},{"ja":"受取手数料","en":"Commission income"},{"ja":"買掛金","en":"Accounts payable"},{"ja":"支払手数料","en":"Fee expense"},{"ja":"前受金","en":"Advance received"},{"ja":"受取利息","en":"Interest income"},{"ja":"預り金","en":"Deposits received"}],"exp":{"ja":"仲介の手数料は収益で、現金が増える。4,000,000×3%＝120,000。取引額の4,000,000円を計上する誤りや、売上勘定で処理する誤りに注意。自社の商品売買ではない。","en":"A brokerage fee is revenue, and cash increases: 4,000,000 x 3% = 120,000. Do not record the whole transaction amount of 4,000,000, and do not use the sales account, because the company did not sell its own goods."}},
      {"id":"j317","dom":"kihon","diff":2,"q":{"ja":"個人商店の決算にあたり、損益勘定の借方（費用合計）が1,500,000円、貸方（収益合計）が1,980,000円であった。当期純利益を資本金勘定に振り替える。","en":"At the end of the period for a sole proprietorship, the income summary shows total expenses of 1,500,000 yen on the debit side and total revenue of 1,980,000 yen on the credit side. Transfer the net income to capital stock."},"debit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":480000}],"credit":[{"acct":{"ja":"資本金","en":"Capital stock"},"amt":480000}],"accounts":[{"ja":"引出金","en":"Drawings"},{"ja":"売上","en":"Sales"},{"ja":"損益","en":"Income summary"},{"ja":"現金","en":"Cash"},{"ja":"資本金","en":"Capital stock"},{"ja":"預り金","en":"Deposits received"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"仕入","en":"Purchases"}],"exp":{"ja":"収益が費用を上回る分が当期純利益で、損益勘定の貸方残高を借方に移して消し、貸方は資本金とする。1,980,000－1,500,000＝480,000。個人商店では繰越利益剰余金を使わない。","en":"Net income is revenue minus expenses: 1,980,000 - 1,500,000 = 480,000. Debit the income summary to close its credit balance and credit capital stock. A sole proprietorship does not use retained earnings."}},
      {"id":"j318","dom":"kihon","diff":3,"q":{"ja":"営業用トラック2,000,000円を購入し、代金のうち800,000円は現金で支払い、残額は翌月末に支払うこととした。","en":"A delivery truck was purchased for 2,000,000 yen. 800,000 yen was paid in cash and the remainder will be paid at the end of next month."},"debit":[{"acct":{"ja":"車両運搬具","en":"Vehicles"},"amt":2000000}],"credit":[{"acct":{"ja":"現金","en":"Cash"},"amt":800000},{"acct":{"ja":"未払金","en":"Other payable"},"amt":1200000}],"accounts":[{"ja":"車両運搬具","en":"Vehicles"},{"ja":"仕入","en":"Purchases"},{"ja":"現金","en":"Cash"},{"ja":"備品","en":"Equipment"},{"ja":"買掛金","en":"Accounts payable"},{"ja":"当座預金","en":"Checking"},{"ja":"未払金","en":"Other payable"},{"ja":"支払手形","en":"Notes payable"}],"exp":{"ja":"トラックは車両運搬具（資産）で、取得原価を借方に記入する。商品以外の後払い代金は買掛金でなく未払金。2,000,000－800,000＝1,200,000。買掛金や仕入で処理する誤りに注意。","en":"A truck is a vehicle (an asset) recorded at cost on the debit side. The deferred payment is not for merchandise, so use other payable, not accounts payable: 2,000,000 - 800,000 = 1,200,000. Do not use purchases or accounts payable."}},
      {"id":"j319","dom":"kihon","diff":1,"q":{"ja":"水道光熱費28,000円を現金で支払った。","en":"Utilities expense of 28,000 yen was paid in cash."},"debit":[{"acct":{"ja":"水道光熱費","en":"Utilities expense"},"amt":28000}],"credit":[{"acct":{"ja":"現金","en":"Cash"},"amt":28000}],"accounts":[{"ja":"水道光熱費","en":"Utilities expense"},{"ja":"消耗品費","en":"Supplies expense"},{"ja":"現金","en":"Cash"},{"ja":"未払金","en":"Other payable"},{"ja":"通信費","en":"Communication expense"},{"ja":"旅費交通費","en":"Travel expense"},{"ja":"支払家賃","en":"Rent expense"},{"ja":"普通預金","en":"Ordinary deposit"}],"exp":{"ja":"水道光熱費は費用の発生で、現金（資産）が減る。借方水道光熱費、貸方現金。消耗品費や通信費と取り違える誤り、現金払いなのに貸方を未払金とする誤りに注意。","en":"Utilities expense is a cost incurred, and cash (an asset) decreases. Debit utilities expense and credit cash. Do not confuse it with supplies or communication expense, and do not credit other payable for a cash payment."}},
      {"id":"j320","dom":"kihon","diff":1,"q":{"ja":"株式会社の決算にあたり、損益勘定の貸方残高（当期純利益）1,250,000円を繰越利益剰余金勘定に振り替える。","en":"At the end of the period for a corporation, transfer the credit balance of the income summary (net income) of 1,250,000 yen to retained earnings."},"debit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":1250000}],"credit":[{"acct":{"ja":"繰越利益剰余金","en":"Retained earnings"},"amt":1250000}],"accounts":[{"ja":"損益","en":"Income summary"},{"ja":"資本金","en":"Capital stock"},{"ja":"現金","en":"Cash"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"売上","en":"Sales"},{"ja":"法人税等","en":"Income taxes"},{"ja":"引出金","en":"Drawings"},{"ja":"仕入","en":"Purchases"}],"exp":{"ja":"損益勘定の貸方残高は当期純利益で、借方に記入して消し、貸方の繰越利益剰余金（純資産）を増やす。株式会社では資本金ではなく繰越利益剰余金に振り替える点に注意。","en":"A credit balance in the income summary is net income. Debit the income summary to close it and credit retained earnings (equity). A corporation transfers profit to retained earnings, not to capital stock."}},
      {"id":"j321","dom":"kihon","diff":2,"q":{"ja":"新聞に掲載する広告の料金90,000円を後日支払うこととした。","en":"An advertisement to be placed in a newspaper cost 90,000 yen, which will be paid at a later date."},"debit":[{"acct":{"ja":"広告宣伝費","en":"Advertising expense"},"amt":90000}],"credit":[{"acct":{"ja":"未払金","en":"Other payable"},"amt":90000}],"accounts":[{"ja":"買掛金","en":"Accounts payable"},{"ja":"広告宣伝費","en":"Advertising expense"},{"ja":"仕入","en":"Purchases"},{"ja":"未払金","en":"Other payable"},{"ja":"前払金","en":"Advance paid"},{"ja":"現金","en":"Cash"},{"ja":"支払手数料","en":"Fee expense"},{"ja":"支払手形","en":"Notes payable"}],"exp":{"ja":"広告料は費用の発生で、後払いの代金は商品でないため買掛金ではなく未払金（負債の増加）とする。借方広告宣伝費、貸方未払金。仕入や買掛金とする誤りに注意。","en":"Advertising is an expense incurred, and the deferred payment is not for merchandise, so the liability is other payable, not accounts payable. Debit advertising expense and credit other payable. Do not use purchases or accounts payable."}},
      {"id":"j322","dom":"kihon","diff":3,"q":{"ja":"出張から戻った従業員から旅費の精算の報告を受け、旅費交通費54,000円を確認した。先に概算払いした60,000円との差額は現金で返金された。","en":"An employee returned from a business trip and reported travel expenses of 54,000 yen. The difference from the 60,000 yen advanced earlier was refunded in cash."},"debit":[{"acct":{"ja":"旅費交通費","en":"Travel expense"},"amt":54000},{"acct":{"ja":"現金","en":"Cash"},"amt":6000}],"credit":[{"acct":{"ja":"仮払金","en":"Suspense payment"},"amt":60000}],"accounts":[{"ja":"旅費交通費","en":"Travel expense"},{"ja":"雑益","en":"Miscellaneous gain"},{"ja":"現金","en":"Cash"},{"ja":"仮払金","en":"Suspense payment"},{"ja":"仮受金","en":"Suspense receipt"},{"ja":"立替金","en":"Advances to others"},{"ja":"未払金","en":"Other payable"},{"ja":"雑損","en":"Miscellaneous loss"}],"exp":{"ja":"概算払いの仮払金60,000円を消し、実際額54,000円を旅費交通費（費用）とし、差額を現金で受け取る。60,000－54,000＝6,000。差額を雑益とする誤りや、仮払金を残す誤りに注意。","en":"Clear the 60,000 yen suspense payment, record the actual 54,000 as travel expense, and receive the difference in cash: 60,000 - 54,000 = 6,000. Do not record the difference as miscellaneous gain or leave the suspense payment open."}},
      {"id":"j323","dom":"kihon","diff":2,"q":{"ja":"店主が自分の生活費にあてるため、店の普通預金から120,000円を引き出した。","en":"The owner withdrew 120,000 yen from the shop's ordinary deposit account to cover personal living expenses."},"debit":[{"acct":{"ja":"引出金","en":"Drawings"},"amt":120000}],"credit":[{"acct":{"ja":"普通預金","en":"Ordinary deposit"},"amt":120000}],"accounts":[{"ja":"当座預金","en":"Checking"},{"ja":"給料","en":"Salaries expense"},{"ja":"引出金","en":"Drawings"},{"ja":"立替金","en":"Advances to others"},{"ja":"資本金","en":"Capital stock"},{"ja":"現金","en":"Cash"},{"ja":"普通預金","en":"Ordinary deposit"},{"ja":"仮払金","en":"Suspense payment"},{"ja":"貸付金","en":"Loans receivable"}],"exp":{"ja":"店主の私的な引出しは事業の費用ではなく資本の減少であり、期中は引出金勘定で処理する。借方引出金、貸方普通預金。給料や仮払金とする誤りに注意。","en":"A private withdrawal by the owner is a reduction of capital, not a business expense, so it is recorded in the drawings account during the period. Debit drawings and credit ordinary deposit. Do not record it as salaries or a suspense payment."}},
      {"id":"j324","dom":"kihon","diff":2,"q":{"ja":"商品を単価800円で250個、掛けで売り上げた。","en":"Merchandise was sold on account at 800 yen per unit for 250 units."},"debit":[{"acct":{"ja":"売掛金","en":"Accounts receivable"},"amt":200000}],"credit":[{"acct":{"ja":"売上","en":"Sales"},"amt":200000}],"accounts":[{"ja":"売掛金","en":"Accounts receivable"},{"ja":"現金","en":"Cash"},{"ja":"売上","en":"Sales"},{"ja":"買掛金","en":"Accounts payable"},{"ja":"受取手形","en":"Notes receivable"},{"ja":"仕入","en":"Purchases"},{"ja":"前受金","en":"Advance received"},{"ja":"未収入金","en":"Other receivable"}],"exp":{"ja":"掛け売上は売掛金（資産）の増加と売上（収益）の発生。800×250＝200,000。代金を受け取るまで現金や受取手形としない。売掛金と買掛金の取り違え、貸方を仕入とする誤りに注意。","en":"A credit sale increases accounts receivable (an asset) and creates sales revenue: 800 x 250 = 200,000. Until payment is received, do not use cash or notes receivable. Do not confuse accounts receivable with accounts payable."}},
      {"id":"j325","dom":"kihon","diff":1,"q":{"ja":"知人から現金400,000円を借り入れた（返済期日は1年後）。","en":"The company borrowed 400,000 yen in cash from an acquaintance, repayable in one year."},"debit":[{"acct":{"ja":"現金","en":"Cash"},"amt":400000}],"credit":[{"acct":{"ja":"借入金","en":"Loans payable"},"amt":400000}],"accounts":[{"ja":"現金","en":"Cash"},{"ja":"資本金","en":"Capital stock"},{"ja":"貸付金","en":"Loans receivable"},{"ja":"受取利息","en":"Interest income"},{"ja":"借入金","en":"Loans payable"},{"ja":"買掛金","en":"Accounts payable"},{"ja":"預り金","en":"Deposits received"},{"ja":"未払金","en":"Other payable"}],"exp":{"ja":"現金（資産）が増え、返済義務である借入金（負債）が増える。借方現金、貸方借入金。貸付金や資本金とする誤り、貸方を受取利息などの収益とする誤りに注意。","en":"Cash (an asset) increases and the obligation to repay, loans payable (a liability), increases. Debit cash and credit loans payable. Do not use loans receivable or capital stock, and do not credit a revenue account."}},
      {"id":"j326","dom":"kihon","diff":3,"q":{"ja":"株式会社の決算にあたり、収益の各勘定（合計5,400,000円）と費用の各勘定（合計4,950,000円）を損益勘定に振り替えた。損益勘定の残高を繰越利益剰余金勘定に振り替える。","en":"At the end of the period for a corporation, revenue accounts totaling 5,400,000 yen and expense accounts totaling 4,950,000 yen were transferred to the income summary. Transfer the balance of the income summary to retained earnings."},"debit":[{"acct":{"ja":"損益","en":"Income summary"},"amt":450000}],"credit":[{"acct":{"ja":"繰越利益剰余金","en":"Retained earnings"},"amt":450000}],"accounts":[{"ja":"売上","en":"Sales"},{"ja":"損益","en":"Income summary"},{"ja":"現金","en":"Cash"},{"ja":"仕入","en":"Purchases"},{"ja":"資本金","en":"Capital stock"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"給料","en":"Salaries expense"},{"ja":"引出金","en":"Drawings"}],"exp":{"ja":"損益勘定は貸方に収益5,400,000円、借方に費用4,950,000円があり、差額の貸方残高が当期純利益。5,400,000－4,950,000＝450,000を繰越利益剰余金へ振り替える。収益の全額を振り替える誤りに注意。","en":"The income summary has revenue of 5,400,000 on the credit side and expenses of 4,950,000 on the debit side. The credit balance 5,400,000 - 4,950,000 = 450,000 is net income and goes to retained earnings. Do not transfer the full revenue amount."}},
      {"id":"j327","dom":"kihon","diff":1,"q":{"ja":"未払金150,000円を普通預金口座から振り込んで支払った。","en":"An other payable of 150,000 yen was paid by transfer from the ordinary deposit account."},"debit":[{"acct":{"ja":"未払金","en":"Other payable"},"amt":150000}],"credit":[{"acct":{"ja":"普通預金","en":"Ordinary deposit"},"amt":150000}],"accounts":[{"ja":"買掛金","en":"Accounts payable"},{"ja":"未払金","en":"Other payable"},{"ja":"現金","en":"Cash"},{"ja":"仮払金","en":"Suspense payment"},{"ja":"普通預金","en":"Ordinary deposit"},{"ja":"支払手形","en":"Notes payable"},{"ja":"預り金","en":"Deposits received"},{"ja":"借入金","en":"Loans payable"}],"exp":{"ja":"支払う義務が消えるので未払金（負債）が減り、普通預金（資産）も減る。借方未払金、貸方普通預金。商品代金ではないので買掛金は使わない。費用で処理する誤りも多い。","en":"The obligation is settled, so other payable (a liability) and ordinary deposit (an asset) both decrease. Debit other payable and credit ordinary deposit. Since it is not a merchandise debt, do not use accounts payable."}},
      {"id":"j328","dom":"kihon","diff":3,"q":{"ja":"商品を1個あたり1,200円で100個仕入れ、代金は掛けとした。なお、引取運賃7,500円は現金で支払った。","en":"Merchandise was purchased on account at 1,200 yen per unit for 100 units. The inward freight of 7,500 yen was paid in cash."},"debit":[{"acct":{"ja":"仕入","en":"Purchases"},"amt":127500}],"credit":[{"acct":{"ja":"買掛金","en":"Accounts payable"},"amt":120000},{"acct":{"ja":"現金","en":"Cash"},"amt":7500}],"accounts":[{"ja":"仕入","en":"Purchases"},{"ja":"発送費","en":"Shipping expense"},{"ja":"買掛金","en":"Accounts payable"},{"ja":"売上","en":"Sales"},{"ja":"売掛金","en":"Accounts receivable"},{"ja":"現金","en":"Cash"},{"ja":"未払金","en":"Other payable"},{"ja":"支払手数料","en":"Fee expense"}],"exp":{"ja":"仕入に要した引取運賃は仕入原価に含め、借方は仕入勘定にまとめる。1,200×100＋7,500＝127,500。運賃を発送費などの別の費用とする誤りに注意。貸方は買掛金120,000円と現金7,500円。","en":"Inward freight is part of the purchase cost, so debit purchases for the total: 1,200 x 100 + 7,500 = 127,500. Credit accounts payable 120,000 and cash 7,500. Do not record the freight as a separate expense such as shipping expense."}},
      {"id":"j329","dom":"kihon","diff":2,"q":{"ja":"決算にあたり、当期中に店主が毎月25,000円ずつ12か月にわたり引き出して生じた引出金を、資本金勘定に振り替える。","en":"At the end of the period, transfer to capital stock the drawings that arose because the owner withdrew 25,000 yen every month for 12 months."},"debit":[{"acct":{"ja":"資本金","en":"Capital stock"},"amt":300000}],"credit":[{"acct":{"ja":"引出金","en":"Drawings"},"amt":300000}],"accounts":[{"ja":"損益","en":"Income summary"},{"ja":"現金","en":"Cash"},{"ja":"資本金","en":"Capital stock"},{"ja":"給料","en":"Salaries expense"},{"ja":"引出金","en":"Drawings"},{"ja":"繰越利益剰余金","en":"Retained earnings"},{"ja":"普通預金","en":"Ordinary deposit"},{"ja":"仮払金","en":"Suspense payment"}],"exp":{"ja":"引出金は資本金の一時的な減少を示す勘定で、決算で資本金に振り替えて残高をゼロにする。25,000×12＝300,000。借方資本金、貸方引出金で、損益勘定へ振り替える誤りに注意。","en":"Drawings is a temporary account showing a decrease in capital, so it is closed to capital stock at period end: 25,000 x 12 = 300,000. Debit capital stock and credit drawings. Do not close it to the income summary account."}},
      {"id":"j330","dom":"kihon","diff":2,"q":{"ja":"掛けで仕入れた商品のうち、品違いのため単価400円の商品30個を返品した。","en":"Of the merchandise purchased on account, 30 units priced at 400 yen each were returned because they were the wrong items."},"debit":[{"acct":{"ja":"買掛金","en":"Accounts payable"},"amt":12000}],"credit":[{"acct":{"ja":"仕入","en":"Purchases"},"amt":12000}],"accounts":[{"ja":"買掛金","en":"Accounts payable"},{"ja":"売上","en":"Sales"},{"ja":"売掛金","en":"Accounts receivable"},{"ja":"現金","en":"Cash"},{"ja":"仕入","en":"Purchases"},{"ja":"支払手形","en":"Notes payable"},{"ja":"前払金","en":"Advance paid"},{"ja":"未払金","en":"Other payable"}],"exp":{"ja":"返品で仕入が取り消されるので仕入を貸方に記入し、仕入先への買掛金を借方で減らす。400×30＝12,000。売上や売掛金の減少とする誤りに注意。仕入側の取引である。","en":"A return cancels the purchase, so credit purchases and debit accounts payable to reduce the amount owed to the supplier: 400 x 30 = 12,000. Do not record it as a reduction of sales or accounts receivable."}}
    ],
  "mock": [
   {
    "id": "m001",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を167,400円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 167,400 yen and received the payment in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 167400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 167400
     }
    ],
    "accounts": [
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"商品の売上は収益の発生で貸方に売上、代金を現金で受け取ったので借方に現金を167,400円。掛けであれば売掛金になる点と取り違える誤りに注意。","en":"A sale creates revenue, so credit Sales, and the cash received is debited to Cash for 167,400 yen. If it were on credit, the debit would be Accounts receivable."}
    },
   {
    "id": "m002",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を206,500円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 206,500 yen on account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 206500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 206500
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上、代金は後日受け取るので借方に売掛金(資産の増加)を206,500円。現金とする誤り、商品以外の取引に使う未収入金とする誤りに注意。","en":"The sale credits Sales, and because payment comes later, debit Accounts receivable (asset increase) for 206,500 yen. Do not debit Cash, and do not use Other receivable, which is for non-merchandise."}
    },
   {
    "id": "m003",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を245,600円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 245,600 yen and received a check issued by the same store, which was immediately deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 245600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 245600
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上。受け取った小切手を直ちに当座預金に預け入れたので、借方は現金ではなく当座預金とし、245,600円を記入する。受取手形や売掛金とする誤りに注意。","en":"The sale is credited to Sales. Because the check received was deposited immediately, debit Checking, not Cash, for 245,600 yen. Do not use Notes receivable or Accounts receivable."}
    },
   {
    "id": "m004",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品402,000円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 402,000 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 402000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 402000
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"商品の仕入は三分法では借方に仕入(費用)で402,000円、現金払いなので貸方に現金。商品勘定や買掛金とする誤りに注意。","en":"In the three-account method, purchased merchandise is debited to Purchases for 402,000 yen, and the cash paid is credited to Cash. Do not use a Merchandise account or Accounts payable."}
    },
   {
    "id": "m005",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品441,100円を仕入れ、代金は掛けとした。",
     "en": "Purchased merchandise for 441,100 yen on account."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 441100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 441100
     }
    ],
    "accounts": [
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     }
    ],
      "exp": {"ja":"商品の仕入は借方に仕入、代金は後払いなので貸方に買掛金(負債の増加)で441,100円。現金とする誤り、商品以外の購入に使う未払金とする誤りに注意。","en":"Purchased merchandise is debited to Purchases, and since payment is deferred, credit Accounts payable (liability increase) for 441,100 yen. Do not credit Cash, or Other payable, which is for non-merchandise."}
    },
   {
    "id": "m006",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品519,300円を仕入れ、代金は約束手形を振り出した。",
     "en": "Purchased merchandise for 519,300 yen and issued a promissory note."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 519300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 519300
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"商品の仕入は借方に仕入。約束手形を振り出したので手形債務を表す支払手形(負債の増加)を貸方に519,300円記入する。買掛金や受取手形とする誤りに注意。","en":"Debit Purchases for 519,300 yen. Issuing a promissory note creates a note obligation, so credit Notes payable (liability increase). Do not use Accounts payable or Notes receivable."}
    },
   {
    "id": "m007",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を597,500円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 597,500 yen on account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 597500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 597500
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上、代金は後日受け取るので借方に売掛金(資産の増加)を597,500円。現金とする誤り、商品以外の取引に使う未収入金とする誤りに注意。","en":"The sale credits Sales, and because payment comes later, debit Accounts receivable (asset increase) for 597,500 yen. Do not debit Cash, and do not use Other receivable, which is for non-merchandise."}
    },
   {
    "id": "m008",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を636,600円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 636,600 yen and received a check issued by the same store, which was immediately deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 636600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 636600
     }
    ],
    "accounts": [
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上。受け取った小切手を直ちに当座預金に預け入れたので、借方は現金ではなく当座預金とし、636,600円を記入する。受取手形や売掛金とする誤りに注意。","en":"The sale is credited to Sales. Because the check received was deposited immediately, debit Checking, not Cash, for 636,600 yen. Do not use Notes receivable or Accounts receivable."}
    },
   {
    "id": "m009",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を753,900円でクレジット払いの条件で販売した(手数料30,156円は販売時計上)。",
     "en": "Sold merchandise for 753,900 yen under credit card payment terms (the fee of 30,156 yen is recorded at the time of sale)."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 723744
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 30156
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 753900
     }
    ],
    "accounts": [
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"クレジット払いの売上は、代金をカード会社から後日受け取るのでクレジット売掛金(資産)とする。手数料30,156円は販売時に支払手数料で計上し、753,900−30,156＝723,744円が債権。売掛金とする誤りに注意。","en":"A credit card sale is collected later from the card company, so the receivable is Credit card receivable. The fee of 30,156 yen is booked as Commission expense at sale, so the receivable is 753,900 - 30,156 = 723,744 yen. Do not use Accounts receivable."}
    },
   {
    "id": "m010",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を949,400円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 949,400 yen and received the payment in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 949400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 949400
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"商品の売上は収益の発生で貸方に売上、代金を現金で受け取ったので借方に現金を949,400円。掛けであれば売掛金になる点と取り違える誤りに注意。","en":"A sale creates revenue, so credit Sales, and the cash received is debited to Cash for 949,400 yen. If it were on credit, the debit would be Accounts receivable."}
    },
   {
    "id": "m011",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を988,500円で売り上げ、代金は掛けとした。",
     "en": "Sold merchandise for 988,500 yen on account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 988500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 988500
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上、代金は後日受け取るので借方に売掛金(資産の増加)を988,500円。現金とする誤り、商品以外の取引に使う未収入金とする誤りに注意。","en":"The sale credits Sales, and because payment comes later, debit Accounts receivable (asset increase) for 988,500 yen. Do not debit Cash, and do not use Other receivable, which is for non-merchandise."}
    },
   {
    "id": "m012",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を43,200円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 43,200 yen and received a check issued by the same store, which was immediately deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 43200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 43200
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上。受け取った小切手を直ちに当座預金に預け入れたので、借方は現金ではなく当座預金とし、43,200円を記入する。受取手形や売掛金とする誤りに注意。","en":"The sale is credited to Sales. Because the check received was deposited immediately, debit Checking, not Cash, for 43,200 yen. Do not use Notes receivable or Accounts receivable."}
    },
   {
    "id": "m013",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を注文し、手付金121,400円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 121,400 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 121400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 121400
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     }
    ],
      "exp": {"ja":"商品を注文して支払う手付金は、まだ商品を受け取っていないので仕入ではなく、前払金(資産)とする。借方前払金、貸方現金で121,400円。仕入や買掛金とする誤りに注意。","en":"A deposit paid on an order is not a purchase yet because no goods have arrived. Debit Advance payments (an asset) and credit Cash for 121,400 yen. Do not debit Purchases or credit Accounts payable."}
    },
   {
    "id": "m014",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品199,600円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 199,600 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 199600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 199600
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"商品の仕入は三分法では借方に仕入(費用)で199,600円、現金払いなので貸方に現金。商品勘定や買掛金とする誤りに注意。","en":"In the three-account method, purchased merchandise is debited to Purchases for 199,600 yen, and the cash paid is credited to Cash. Do not use a Merchandise account or Accounts payable."}
    },
   {
    "id": "m015",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を356,000円で売り上げ、代金は現金で受け取った。",
     "en": "Sold merchandise for 356,000 yen and received the payment in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 356000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 356000
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     }
    ],
      "exp": {"ja":"商品の売上は収益の発生で貸方に売上、代金を現金で受け取ったので借方に現金を356,000円。掛けであれば売掛金になる点と取り違える誤りに注意。","en":"A sale creates revenue, so credit Sales, and the cash received is debited to Cash for 356,000 yen. If it were on credit, the debit would be Accounts receivable."}
    },
   {
    "id": "m016",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を434,200円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 434,200 yen and received a check issued by the same store, which was immediately deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 434200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 434200
     }
    ],
    "accounts": [
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上。受け取った小切手を直ちに当座預金に預け入れたので、借方は現金ではなく当座預金とし、434,200円を記入する。受取手形や売掛金とする誤りに注意。","en":"The sale is credited to Sales. Because the check received was deposited immediately, debit Checking, not Cash, for 434,200 yen. Do not use Notes receivable or Accounts receivable."}
    },
   {
    "id": "m017",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品668,800円を仕入れ、代金は小切手を振り出して支払った。",
     "en": "Purchased merchandise for 668,800 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 668800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 668800
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"商品の仕入は借方に仕入で668,800円。小切手を振り出して支払ったので、貸方は当座預金の減少とする。現金とする誤り、受取手形とする誤りに注意。","en":"Debit Purchases for 668,800 yen. Paying by issuing our own check reduces the checking account, so credit Checking, not Cash or Notes receivable."}
    },
   {
    "id": "m018",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を825,200円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 825,200 yen and received a check issued by the same store, which was immediately deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 825200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 825200
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上。受け取った小切手を直ちに当座預金に預け入れたので、借方は現金ではなく当座預金とし、825,200円を記入する。受取手形や売掛金とする誤りに注意。","en":"The sale is credited to Sales. Because the check received was deposited immediately, debit Checking, not Cash, for 825,200 yen. Do not use Notes receivable or Accounts receivable."}
    },
   {
    "id": "m019",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品981,600円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 981,600 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 981600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 981600
     }
    ],
    "accounts": [
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"商品の仕入は三分法では借方に仕入(費用)で981,600円、現金払いなので貸方に現金。商品勘定や買掛金とする誤りに注意。","en":"In the three-account method, purchased merchandise is debited to Purchases for 981,600 yen, and the cash paid is credited to Cash. Do not use a Merchandise account or Accounts payable."}
    },
   {
    "id": "m020",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を231,800円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 231,800 yen and received a check issued by the same store, which was immediately deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 231800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 231800
     }
    ],
    "accounts": [
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上。受け取った小切手を直ちに当座預金に預け入れたので、借方は現金ではなく当座預金とし、231,800円を記入する。受取手形や売掛金とする誤りに注意。","en":"The sale is credited to Sales. Because the check received was deposited immediately, debit Checking, not Cash, for 231,800 yen. Do not use Notes receivable or Accounts receivable."}
    },
   {
    "id": "m021",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品の注文を受け、手付金270,900円を現金で受け取った。",
     "en": "Received an order for merchandise and collected a deposit of 270,900 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 270900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受金",
       "en": "Advance received"
      },
      "amt": 270900
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     }
    ],
      "exp": {"ja":"商品の注文を受けて受け取る手付金は、まだ売上ではなく商品を引き渡す義務を表すので前受金(負債)とする。借方は現金の増加、貸方は前受金で270,900円。売上とする誤りに注意。","en":"A deposit received on an order is not yet sales; it is an obligation to deliver goods, so credit Advances received (a liability) and debit Cash for 270,900 yen. Do not credit Sales."}
    },
   {
    "id": "m022",
    "dom": "shohin",
    "diff": 2,
    "q": {
     "ja": "商品を注文し、手付金310,000円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 310,000 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 310000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 310000
     }
    ],
    "accounts": [
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     }
    ],
      "exp": {"ja":"商品を注文して支払う手付金は、まだ商品を受け取っていないので仕入ではなく、前払金(資産)とする。借方前払金、貸方現金で310,000円。仕入や買掛金とする誤りに注意。","en":"A deposit paid on an order is not a purchase yet because no goods have arrived. Debit Advance payments (an asset) and credit Cash for 310,000 yen. Do not debit Purchases or credit Accounts payable."}
    },
   {
    "id": "m023",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を349,100円でクレジット払いの条件で販売した(手数料13,964円は販売時計上)。",
     "en": "Sold merchandise for 349,100 yen under credit card payment terms (the fee of 13,964 yen is recorded at the time of sale)."
    },
    "debit": [
     {
      "acct": {
       "ja": "クレジット売掛金",
       "en": "Credit card receivable"
      },
      "amt": 335136
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 13964
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 349100
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"クレジット払いの売上は、代金をカード会社から後日受け取るのでクレジット売掛金(資産)とする。手数料13,964円は販売時に支払手数料で計上し、349,100−13,964＝335,136円が債権。売掛金とする誤りに注意。","en":"A credit card sale is collected later from the card company, so the receivable is Credit card receivable. The fee of 13,964 yen is booked as Commission expense at sale, so the receivable is 349,100 - 13,964 = 335,136 yen. Do not use Accounts receivable."}
    },
   {
    "id": "m024",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品388,200円を仕入れ、代金は現金で支払った。",
     "en": "Purchased merchandise for 388,200 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 388200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 388200
     }
    ],
    "accounts": [
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     }
    ],
      "exp": {"ja":"商品の仕入は三分法では借方に仕入(費用)で388,200円、現金払いなので貸方に現金。商品勘定や買掛金とする誤りに注意。","en":"In the three-account method, purchased merchandise is debited to Purchases for 388,200 yen, and the cash paid is credited to Cash. Do not use a Merchandise account or Accounts payable."}
    },
   {
    "id": "m025",
    "dom": "shohin",
    "diff": 1,
    "q": {
     "ja": "商品を622,800円で売り上げ、代金は同店振出の小切手で受け取り直ちに当座預金とした。",
     "en": "Sold merchandise for 622,800 yen and received a check issued by the same store, which was immediately deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 622800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 622800
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "土地",
      "en": "Land"
     }
    ],
      "exp": {"ja":"商品の売上で貸方に売上。受け取った小切手を直ちに当座預金に預け入れたので、借方は現金ではなく当座預金とし、622,800円を記入する。受取手形や売掛金とする誤りに注意。","en":"The sale is credited to Sales. Because the check received was deposited immediately, debit Checking, not Cash, for 622,800 yen. Do not use Notes receivable or Accounts receivable."}
    },
   {
    "id": "m026",
    "dom": "shohin",
    "diff": 3,
    "q": {
     "ja": "商品を注文し、手付金701,000円を現金で支払った。",
     "en": "Ordered merchandise and paid a deposit of 701,000 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払金",
       "en": "Advance paid"
      },
      "amt": 701000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 701000
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     }
    ],
      "exp": {"ja":"商品を注文して支払う手付金は、まだ商品を受け取っていないので仕入ではなく、前払金(資産)とする。借方前払金、貸方現金で701,000円。仕入や買掛金とする誤りに注意。","en":"A deposit paid on an order is not a purchase yet because no goods have arrived. Debit Advance payments (an asset) and credit Cash for 701,000 yen. Do not debit Purchases or credit Accounts payable."}
    },
   {
    "id": "m027",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "現金425,000円を普通預金に預け入れた。",
     "en": "Deposited 425,000 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 425000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 425000
     }
    ],
    "accounts": [
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"現金を預金に預け入れると、現金が減り預金が増える資産内の振替。借方に普通預金、貸方に現金を425,000円記入する。借貸を逆にして引き出しの仕訳にする誤りに注意。","en":"Depositing cash moves value between assets: debit the ordinary deposit account and credit Cash for 425,000 yen. Reversing the sides would record a withdrawal."}
    },
   {
    "id": "m028",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "買掛金の支払として581,400円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid accounts payable of 581,400 yen by transfer from the checking account; the transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 581400
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 581600
     }
    ],
    "accounts": [
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"買掛金の支払で負債が減るので借方に買掛金、振込手数料は費用なので支払手数料200円を借方に計上する。当座預金から出た額は581,400＋200＝581,600円。手数料を買掛金に含める誤りに注意。","en":"Paying accounts payable reduces a liability (debit 581,400 yen), and the transfer fee is an expense, debit Commission expense 200 yen. The checking account falls by 581,400 + 200 = 581,600 yen. Do not fold the fee into Accounts payable."}
    },
   {
    "id": "m029",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)3,900円の原因が不明なので雑益とした。",
     "en": "At the end of the period, the cash over and short account has a credit balance of 3,900 yen whose cause is unknown, so it is treated as miscellaneous income."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 3900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 3900
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"現金過不足の貸方残は帳簿より実際の現金が多い状態。決算で原因不明なら雑益(収益)とし、借方の現金過不足で残高を消して貸方に雑益3,900円。雑損とする誤りに注意。","en":"A credit balance in Cash over and short means actual cash exceeds the books. If the cause is unknown at year end, clear it by debiting Cash over and short and crediting Miscellaneous income for 3,900 yen. Do not use Miscellaneous loss."}
    },
   {
    "id": "m030",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "買掛金の支払として855,100円を当座預金から振り込み、手数料200円を当社負担とした。",
     "en": "Paid accounts payable of 855,100 yen by transfer from the checking account; the transfer fee of 200 yen was borne by our company."
    },
    "debit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 855100
     },
     {
      "acct": {
       "ja": "支払手数料",
       "en": "Fee expense"
      },
      "amt": 200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 855300
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"買掛金の支払で負債が減るので借方に買掛金、振込手数料は費用なので支払手数料200円を借方に計上する。当座預金から出た額は855,100＋200＝855,300円。手数料を買掛金に含める誤りに注意。","en":"Paying accounts payable reduces a liability (debit 855,100 yen), and the transfer fee is an expense, debit Commission expense 200 yen. The checking account falls by 855,100 + 200 = 855,300 yen. Do not fold the fee into Accounts payable."}
    },
   {
    "id": "m031",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "現金894,200円を当座預金に預け入れた。",
     "en": "Deposited 894,200 yen in cash into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 894200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 894200
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     }
    ],
      "exp": {"ja":"現金を預金に預け入れると、現金が減り預金が増える資産内の振替。借方に当座預金、貸方に現金を894,200円記入する。借貸を逆にして引き出しの仕訳にする誤りに注意。","en":"Depositing cash moves value between assets: debit the checking account and credit Cash for 894,200 yen. Reversing the sides would record a withdrawal."}
    },
   {
    "id": "m032",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "現金972,400円を普通預金に預け入れた。",
     "en": "Deposited 972,400 yen in cash into the ordinary deposit account."
    },
    "debit": [
     {
      "acct": {
       "ja": "普通預金",
       "en": "Ordinary deposit"
      },
      "amt": 972400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 972400
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"現金を預金に預け入れると、現金が減り預金が増える資産内の振替。借方に普通預金、貸方に現金を972,400円記入する。借貸を逆にして引き出しの仕訳にする誤りに注意。","en":"Depositing cash moves value between assets: debit the ordinary deposit account and credit Cash for 972,400 yen. Reversing the sides would record a withdrawal."}
    },
   {
    "id": "m033",
    "dom": "genkin",
    "diff": 3,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)1,100円の原因が不明なので雑損とした。",
     "en": "At the end of the period, the cash over and short account has a debit balance of 1,100 yen whose cause is unknown, so it is treated as a miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 1100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 1100
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     }
    ],
      "exp": {"ja":"借方残の現金過不足1,100円は、実際が帳簿より少なかったことを示す。原因不明のまま決算を迎えたので借方雑損、貸方現金過不足とする。貸方残の処理(雑益)との取り違えに注意。","en":"The 1,100 yen debit balance means there is less cash than recorded. With no cause found at closing, debit Miscellaneous loss and credit Cash over and short. Do not apply the credit-balance treatment (Miscellaneous income)."}
    },
   {
    "id": "m034",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "小口現金係から旅費交通費42,120円・通信費36,855円・消耗品費26,325円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported travel expenses of 42,120 yen, communication expenses of 36,855 yen and supplies expenses of 26,325 yen, and the fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 42120
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 36855
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 26325
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 105300
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     }
    ],
      "exp": {"ja":"報告を受けた費用を借方にそのまま計上し、補給は小切手の振出なので貸方は当座預金。42,120＋36,855＋26,325＝105,300円。借方を小口現金とする誤りに注意。","en":"Debit each reported expense as is (Travel, Communication, Supplies expense). The replenishment is by check, so credit Checking for 42,120 + 36,855 + 26,325 = 105,300 yen. Do not debit Petty cash."}
    },
   {
    "id": "m035",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "当座預金から現金222,600円を引き出した。",
     "en": "Withdrew 222,600 yen in cash from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 222600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 222600
     }
    ],
    "accounts": [
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"当座預金から現金を引き出すと、現金が増え当座預金が減る。借方に現金、貸方に当座預金を222,600円記入する。預け入れの仕訳と借貸を逆にする誤りに注意。","en":"Withdrawing cash increases Cash and decreases the checking account: debit Cash and credit Checking for 222,600 yen. Reversing the sides would record a deposit."}
    },
   {
    "id": "m036",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "決算にあたり現金過不足(貸方残)7,900円の原因が不明なので雑益とした。",
     "en": "At the end of the period, the cash over and short account has a credit balance of 7,900 yen whose cause is unknown, so it is treated as miscellaneous income."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 7900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "雑益",
       "en": "Miscellaneous gain"
      },
      "amt": 7900
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"現金過不足の貸方残は帳簿より実際の現金が多い状態。決算で原因不明なら雑益(収益)とし、借方の現金過不足で残高を消して貸方に雑益7,900円。雑損とする誤りに注意。","en":"A credit balance in Cash over and short means actual cash exceeds the books. If the cause is unknown at year end, clear it by debiting Cash over and short and crediting Miscellaneous income for 7,900 yen. Do not use Miscellaneous loss."}
    },
   {
    "id": "m037",
    "dom": "genkin",
    "diff": 2,
    "q": {
     "ja": "決算にあたり現金過不足(借方残)8,500円の原因が不明なので雑損とした。",
     "en": "At the end of the period, the cash over and short account has a debit balance of 8,500 yen whose cause is unknown, so it is treated as a miscellaneous loss."
    },
    "debit": [
     {
      "acct": {
       "ja": "雑損",
       "en": "Miscellaneous loss"
      },
      "amt": 8500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金過不足",
       "en": "Cash over and short"
      },
      "amt": 8500
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     }
    ],
      "exp": {"ja":"借方残の現金過不足8,500円は、実際が帳簿より少なかったことを示す。原因不明のまま決算を迎えたので借方雑損、貸方現金過不足とする。貸方残の処理(雑益)との取り違えに注意。","en":"The 8,500 yen debit balance means there is less cash than recorded. With no cause found at closing, debit Miscellaneous loss and credit Cash over and short. Do not apply the credit-balance treatment (Miscellaneous income)."}
    },
   {
    "id": "m038",
    "dom": "genkin",
    "diff": 1,
    "q": {
     "ja": "小口現金係から旅費交通費261,080円・通信費228,445円・消耗品費163,175円の報告を受け、小切手で補給した。",
     "en": "The petty cash custodian reported travel expenses of 261,080 yen, communication expenses of 228,445 yen and supplies expenses of 163,175 yen, and the fund was replenished by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 261080
     },
     {
      "acct": {
       "ja": "通信費",
       "en": "Communication expense"
      },
      "amt": 228445
     },
     {
      "acct": {
       "ja": "消耗品費",
       "en": "Supplies expense"
      },
      "amt": 163175
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 652700
     }
    ],
    "accounts": [
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"報告を受けた費用を借方にそのまま計上し、補給は小切手の振出なので貸方は当座預金。261,080＋228,445＋163,175＝652,700円。借方を小口現金とする誤りに注意。","en":"Debit each reported expense as is (Travel, Communication, Supplies expense). The replenishment is by check, so credit Checking for 261,080 + 228,445 + 163,175 = 652,700 yen. Do not debit Petty cash."}
    },
   {
    "id": "m039",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "かねて振り出した約束手形703,300円が満期となり当座預金から支払われた。",
     "en": "A promissory note we issued earlier for 703,300 yen matured and was paid from the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払手形",
       "en": "Notes payable"
      },
      "amt": 703300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 703300
     }
    ],
    "accounts": [
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     }
    ],
      "exp": {"ja":"満期で手形代金が支払われたので、手形債務の支払手形(負債)が減り借方に記入する。当座預金から出るため貸方は当座預金で703,300円。受取手形とする誤りに注意。","en":"At maturity the note obligation is settled: debit Notes payable (liability decrease) and credit Checking for 703,300 yen. Do not use Notes receivable."}
    },
   {
    "id": "m040",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "売掛金742,400円を現金で回収した。",
     "en": "Collected accounts receivable of 742,400 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 742400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 742400
     }
    ],
    "accounts": [
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     }
    ],
      "exp": {"ja":"売掛金を回収すると債権が減るので貸方に売掛金、受け取った現金を借方に742,400円。借貸を逆にして売掛金を増やす誤り、売上とする誤りに注意。","en":"Collecting a receivable decreases the asset, so credit Accounts receivable, and debit Cash for 742,400 yen. Do not reverse the sides or credit Sales."}
    },
   {
    "id": "m041",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "従業員が負担すべき費用820,600円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 820,600 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 820600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 820600
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     }
    ],
      "exp": {"ja":"従業員のために立替払いした額は、後で返してもらう債権なので立替金(資産)とする。借方立替金、貸方現金で820,600円。給料や旅費交通費として費用処理する誤りに注意。","en":"Money paid on behalf of an employee will be repaid, so it is an asset: debit Advances paid and credit Cash for 820,600 yen. Do not expense it as salaries or travel costs."}
    },
   {
    "id": "m042",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "得意先振出の約束手形70,800円が満期となり当座預金に入金された。",
     "en": "A promissory note received from a customer for 70,800 yen matured and was deposited into the checking account."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 70800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取手形",
       "en": "Notes receivable"
      },
      "amt": 70800
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "仮受金",
      "en": "Suspense receipt"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     }
    ],
      "exp": {"ja":"得意先振出の手形が満期となり代金が入金されたので、手形債権の受取手形(資産)が減り貸方に記入する。借方は当座預金の増加で70,800円。支払手形とする誤りに注意。","en":"At maturity the note from the customer is collected: credit Notes receivable (asset decrease) and debit Checking for 70,800 yen. Do not use Notes payable."}
    },
   {
    "id": "m043",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "従業員が負担すべき費用227,200円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 227,200 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 227200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 227200
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"立替払いは費用ではなく、従業員への一時的な債権。借方に立替金(資産の増加)、貸方に現金の減少で227,200円。貸付金や未収入金と取り違える誤りに注意。","en":"A payment made for an employee is a temporary claim, not an expense. Debit Advances paid (asset increase) and credit Cash, 227,200 yen. Do not confuse it with Loans receivable or Other receivable."}
    },
   {
    "id": "m044",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "借入金422,700円を利息12,681円とともに小切手で返済した。",
     "en": "Repaid a loan of 422,700 yen together with interest of 12,681 yen by check."
    },
    "debit": [
     {
      "acct": {
       "ja": "借入金",
       "en": "Loans payable"
      },
      "amt": 422700
     },
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 12681
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 435381
     }
    ],
    "accounts": [
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     }
    ],
      "exp": {"ja":"借入金の返済は負債の減少で借方に借入金、利息は費用なので借方に支払利息。小切手で払うため当座預金は422,700＋12,681＝435,381円の減少。利息を借入金に含める誤りに注意。","en":"Repaying a loan reduces a liability (debit Loans payable 422,700 yen), and interest is an expense (debit Interest expense 12,681 yen). Checking falls by 422,700 + 12,681 = 435,381 yen. Do not include interest in the loan."}
    },
   {
    "id": "m045",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "従業員が負担すべき費用618,200円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 618,200 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 618200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 618200
     }
    ],
    "accounts": [
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     }
    ],
      "exp": {"ja":"従業員のために立替払いした額は、後で返してもらう債権なので立替金(資産)とする。借方立替金、貸方現金で618,200円。給料や旅費交通費として費用処理する誤りに注意。","en":"Money paid on behalf of an employee will be repaid, so it is an asset: debit Advances paid and credit Cash for 618,200 yen. Do not expense it as salaries or travel costs."}
    },
   {
    "id": "m046",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "給料657,300円のうち源泉所得税65,730円を預り、残額を現金で支払った。",
     "en": "Of the salary of 657,300 yen, withheld income tax of 65,730 yen was held as a deposit and the remainder was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "給料",
       "en": "Salaries expense"
      },
      "amt": 657300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 65730
     },
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 591570
     }
    ],
    "accounts": [
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"給料は費用の発生で借方に総額657,300円。源泉所得税は後で納付する預り金(負債)として貸方に65,730円、手取りは657,300−65,730＝591,570円の現金。給料を手取額で計上する誤りに注意。","en":"Salaries are an expense recorded at the gross amount of 657,300 yen. The withheld tax of 65,730 yen is Deposits received (liability), and cash paid is 657,300 - 65,730 = 591,570 yen. Do not record salaries at the net amount."}
    },
   {
    "id": "m047",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "貸付金774,600円を利息23,238円とともに現金で回収した。",
     "en": "Collected a loan receivable of 774,600 yen together with interest of 23,238 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 797838
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 774600
     },
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 23238
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     }
    ],
      "exp": {"ja":"貸付金の回収は債権の減少で貸方に貸付金、利息は収益なので貸方に受取利息。現金で受け取る総額は774,600＋23,238＝797,838円。利息を貸付金に含める誤りに注意。","en":"Collecting a loan reduces a receivable (credit Loans receivable 774,600 yen), and interest is revenue (credit Interest income 23,238 yen). Cash received is 774,600 + 23,238 = 797,838 yen. Do not fold the interest into the loan."}
    },
   {
    "id": "m048",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "売掛金931,000円を現金で回収した。",
     "en": "Collected accounts receivable of 931,000 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 931000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 931000
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     }
    ],
      "exp": {"ja":"売掛金を回収すると債権が減るので貸方に売掛金、受け取った現金を借方に931,000円。借貸を逆にして売掛金を増やす誤り、売上とする誤りに注意。","en":"Collecting a receivable decreases the asset, so credit Accounts receivable, and debit Cash for 931,000 yen. Do not reverse the sides or credit Sales."}
    },
   {
    "id": "m049",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "従業員が負担すべき費用24,800円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 24,800 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 24800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 24800
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"立替払いは費用ではなく、従業員への一時的な債権。借方に立替金(資産の増加)、貸方に現金の減少で24,800円。貸付金や未収入金と取り違える誤りに注意。","en":"A payment made for an employee is a temporary claim, not an expense. Debit Advances paid (asset increase) and credit Cash, 24,800 yen. Do not confuse it with Loans receivable or Other receivable."}
    },
   {
    "id": "m050",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "売掛金337,600円を現金で回収した。",
     "en": "Collected accounts receivable of 337,600 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 337600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 337600
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     }
    ],
      "exp": {"ja":"売掛金を回収すると債権が減るので貸方に売掛金、受け取った現金を借方に337,600円。借貸を逆にして売掛金を増やす誤り、売上とする誤りに注意。","en":"Collecting a receivable decreases the asset, so credit Accounts receivable, and debit Cash for 337,600 yen. Do not reverse the sides or credit Sales."}
    },
   {
    "id": "m051",
    "dom": "saiken",
    "diff": 2,
    "q": {
     "ja": "従業員が負担すべき費用415,800円を、会社が現金で立替払いした。",
     "en": "The company paid in cash, on an employee's behalf, 415,800 yen of expenses the employee should bear."
    },
    "debit": [
     {
      "acct": {
       "ja": "立替金",
       "en": "Advances to others"
      },
      "amt": 415800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 415800
     }
    ],
    "accounts": [
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"従業員のために立替払いした額は、後で返してもらう債権なので立替金(資産)とする。借方立替金、貸方現金で415,800円。給料や旅費交通費として費用処理する誤りに注意。","en":"Money paid on behalf of an employee will be repaid, so it is an asset: debit Advances paid and credit Cash for 415,800 yen. Do not expense it as salaries or travel costs."}
    },
   {
    "id": "m052",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "給料454,900円のうち源泉所得税45,490円を預り、残額を現金で支払った。",
     "en": "Of the salary of 454,900 yen, withheld income tax of 45,490 yen was held as a deposit and the remainder was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "給料",
       "en": "Salaries expense"
      },
      "amt": 454900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 45490
     },
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 409410
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     }
    ],
      "exp": {"ja":"給料は費用の発生で借方に総額454,900円。源泉所得税は後で納付する預り金(負債)として貸方に45,490円、手取りは454,900−45,490＝409,410円の現金。給料を手取額で計上する誤りに注意。","en":"Salaries are an expense recorded at the gross amount of 454,900 yen. The withheld tax of 45,490 yen is Deposits received (liability), and cash paid is 454,900 - 45,490 = 409,410 yen. Do not record salaries at the net amount."}
    },
   {
    "id": "m053",
    "dom": "saiken",
    "diff": 1,
    "q": {
     "ja": "取引先に現金494,000円を貸し付けた。",
     "en": "Lent 494,000 yen in cash to a business partner."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 494000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 494000
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     }
    ],
      "exp": {"ja":"取引先への金銭の貸付は、返してもらう債権の発生なので借方に貸付金(資産の増加)、貸方に現金の減少で494,000円。立替金や売掛金と取り違える誤りに注意。","en":"Lending money creates a claim to be repaid, so debit Loans receivable (asset increase) and credit Cash for 494,000 yen. Do not confuse it with Advances paid or Accounts receivable."}
    },
   {
    "id": "m054",
    "dom": "saiken",
    "diff": 3,
    "q": {
     "ja": "貸付金572,200円を利息17,166円とともに現金で回収した。",
     "en": "Collected a loan receivable of 572,200 yen together with interest of 17,166 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 589366
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸付金",
       "en": "Loans receivable"
      },
      "amt": 572200
     },
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 17166
     }
    ],
    "accounts": [
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     }
    ],
      "exp": {"ja":"貸付金の回収は債権の減少で貸方に貸付金、利息は収益なので貸方に受取利息。現金で受け取る総額は572,200＋17,166＝589,366円。利息を貸付金に含める誤りに注意。","en":"Collecting a loan reduces a receivable (credit Loans receivable 572,200 yen), and interest is revenue (credit Interest income 17,166 yen). Cash received is 572,200 + 17,166 = 589,366 yen. Do not fold the interest into the loan."}
    },
   {
    "id": "m055",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "土地779,200円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 779,200 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 779200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 779200
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 779,200 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "m056",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "土地974,700円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 974,700 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 974700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 974700
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 974,700 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "m057",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "土地185,800円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 185,800 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 185800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 185800
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 185,800 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "m058",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "土地381,300円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 381,300 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 381300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 381300
     }
    ],
    "accounts": [
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 381,300 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "m059",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "備品615,900円を購入し、307,950円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 615,900 yen. Paid 307,950 yen in cash, and the remaining 307,950 yen is to be paid at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 615900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 307950
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 307950
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"備品の取得は資産の増加で借方、現金の支払は貸方。残額は商品以外の後払いなので買掛金ではなく未払金とする。615,900−307,950＝307,950円が未払金。備品を消耗品費にする誤りに注意。","en":"Acquiring equipment increases an asset, so debit it for 615,900 yen. The cash paid is credited, and the unpaid balance of 615,900 - 307,950 = 307,950 yen is Other payable, not Accounts payable, because the purchase is not merchandise. Do not expense it as supplies."}
    },
   {
    "id": "m060",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "備品655,000円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 655,000 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 655000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 655000
     }
    ],
    "accounts": [
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"備品の購入は資産の増加なので借方に備品、現金払いは資産の減少なので貸方に現金。金額は購入代価の655,000円。固定資産を費用として処理する誤りに注意。","en":"Buying equipment increases an asset, so debit Equipment for 655,000 yen. Paying in cash decreases Cash, which is credited. A common mistake is to treat a fixed asset as an expense."}
    },
   {
    "id": "m061",
    "dom": "kotei",
    "diff": 3,
    "q": {
     "ja": "建物694,100円を購入し、代金は小切手を振り出した。",
     "en": "Purchased a building for 694,100 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "建物",
       "en": "Buildings"
      },
      "amt": 694100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 694100
     }
    ],
    "accounts": [
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     }
    ],
      "exp": {"ja":"建物の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。建物は決算で減価償却の対象になるが、取得時は取得原価で計上する。","en":"The purchase of a building increases an asset: debit Buildings for 694,100 yen. Issuing our own check reduces the checking account, which is credited, not Cash. A building is depreciated at year end, but at purchase it is recorded at cost."}
    },
   {
    "id": "m062",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "土地772,300円を購入し、代金は小切手を振り出した。",
     "en": "Purchased land for 772,300 yen and paid by issuing a check."
    },
    "debit": [
     {
      "acct": {
       "ja": "土地",
       "en": "Land"
      },
      "amt": 772300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 772300
     }
    ],
    "accounts": [
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"土地の購入は資産の増加で借方。自社振出の小切手を渡したので当座預金の減少として貸方に記入し、現金とはしない。土地は減価償却しない資産で、取得原価のまま計上する。","en":"The purchase of land increases an asset: debit Land for 772,300 yen. Issuing our own check reduces the checking account, which is credited, not Cash. Land is not depreciated and is carried at acquisition cost."}
    },
   {
    "id": "m063",
    "dom": "kotei",
    "diff": 1,
    "q": {
     "ja": "備品850,500円を購入し、代金は現金で支払った。",
     "en": "Purchased equipment for 850,500 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 850500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 850500
     }
    ],
    "accounts": [
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "現金",
      "en": "Cash"
     }
    ],
      "exp": {"ja":"備品の購入は資産の増加なので借方に備品、現金払いは資産の減少なので貸方に現金。金額は購入代価の850,500円。固定資産を費用として処理する誤りに注意。","en":"Buying equipment increases an asset, so debit Equipment for 850,500 yen. Paying in cash decreases Cash, which is credited. A common mistake is to treat a fixed asset as an expense."}
    },
   {
    "id": "m064",
    "dom": "kotei",
    "diff": 2,
    "q": {
     "ja": "備品22,500円を購入し、11,250円は現金・残額は月末払いとした。",
     "en": "Purchased equipment for 22,500 yen. Paid 11,250 yen in cash, and the remaining 11,250 yen is to be paid at the end of the month."
    },
    "debit": [
     {
      "acct": {
       "ja": "備品",
       "en": "Equipment"
      },
      "amt": 22500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 11250
     },
     {
      "acct": {
       "ja": "未払金",
       "en": "Other payable"
      },
      "amt": 11250
     }
    ],
    "accounts": [
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     }
    ],
      "exp": {"ja":"備品の取得は資産の増加で借方、現金の支払は貸方。残額は商品以外の後払いなので買掛金ではなく未払金とする。22,500−11,250＝11,250円が未払金。備品を消耗品費にする誤りに注意。","en":"Acquiring equipment increases an asset, so debit it for 22,500 yen. The cash paid is credited, and the unpaid balance of 22,500 - 11,250 = 11,250 yen is Other payable, not Accounts payable, because the purchase is not merchandise. Do not expense it as supplies."}
    },
   {
    "id": "m065",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "会社の設立にあたり株式を発行し829,800円の払込みを受け当座預金とした(全額資本金)。",
     "en": "Upon establishing the company, shares were issued and a payment of 829,800 yen was received and deposited in the checking account (the entire amount is capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 829800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 829800
     }
    ],
    "accounts": [
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"株式発行による払込みは純資産の増加なので貸方に資本金、受け入れた預金は資産の増加で借方に当座預金。全額を資本金とするので829,800円がそのまま入る。払込額を資本準備金や利益剰余金とする誤りに注意。","en":"Receiving payment for shares increases net assets, so credit Capital stock, and the deposit increases an asset, so debit Checking. The whole 829,800 yen is capital stock. Do not put it in capital reserve or retained earnings."}
    },
   {
    "id": "m066",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "店主が私用のため現金33,000円を引き出した(引出金)。",
     "en": "The owner withdrew 33,000 yen in cash for personal use (record in the Drawings account)."
    },
    "debit": [
     {
      "acct": {
       "ja": "引出金",
       "en": "Drawings"
      },
      "amt": 33000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 33000
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"事業主が私用で現金を引き出すと資本が減る。直接は資本金を減らさず借方に引出金、貸方に現金とする。金額は引出額の33,000円。費用の勘定で処理する誤りに注意。","en":"When the owner takes cash for personal use, capital decreases. Debit Drawings and credit Cash for 33,000 yen instead of debiting Capital stock directly. Do not use an expense account."}
    },
   {
    "id": "m067",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "消費税の確定申告により未払消費税77,100円を現金で納付した。",
     "en": "Upon filing the final consumption tax return, the consumption tax payable of 77,100 yen was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "未払消費税",
       "en": "Consumption tax payable"
      },
      "amt": 77100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 77100
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"未払消費税は納付すると負債が減るので借方に記入し、現金の減少を貸方に77,100円記入する。納付時に費用の租税公課や仮払消費税を使う誤りに注意。","en":"Consumption tax payable is a liability, so paying it is a debit to that account, and Cash decreases by 77,100 yen (credit). Do not use the expense account Taxes and dues or Suspense consumption tax paid."}
    },
   {
    "id": "m068",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税2,900円を現金で納付した。",
     "en": "Withheld income tax of 2,900 yen, which had been held as deposits received, was paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 2900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 2900
     }
    ],
    "accounts": [
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     }
    ],
      "exp": {"ja":"源泉所得税は給与支払時に預り金として計上済みなので、納付は預り金の減少。借方預り金、貸方現金で2,900円。費用として二重に計上する誤りに注意。","en":"The tax was already booked as Deposits received when salaries were paid, so remitting it reduces that account. Debit Deposits received and credit Cash, 2,900 yen. Do not record it again as an expense."}
    },
   {
    "id": "m069",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し119,100円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To raise capital, new shares were issued and 119,100 yen was received and deposited into the checking account (the entire amount is recorded as capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 119100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 119100
     }
    ],
    "accounts": [
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     }
    ],
      "exp": {"ja":"株式の払込みで資産の当座預金が増えるので借方、純資産の資本金が増えるので貸方に記入する。全額を資本金とするため払込額119,100円がそのまま金額になる。払込みを借入金や売上と取り違える誤りに注意。","en":"Issuing shares increases the checking account (asset, debit) and capital stock (equity, credit). The entire payment of 119,100 yen is capital stock, so no calculation is needed. Common error: treating the receipt as a loan or as sales."}
    },
   {
    "id": "m070",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "消費税の確定申告により未払消費税47,300円を現金で納付した。",
     "en": "Paid the consumption tax payable of 47,300 yen in cash upon filing the final consumption tax return."
    },
    "debit": [
     {
      "acct": {
       "ja": "未払消費税",
       "en": "Consumption tax payable"
      },
      "amt": 47300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 47300
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"確定申告で納付する消費税は、決算で計上済みの未払消費税（負債）を消すので借方、現金（資産）の減少を貸方に記入する。納付額47,300円がそのまま金額。租税公課や仮払消費税で処理する誤りに注意。","en":"Paying the tax filed in the final return settles the consumption tax payable (liability, debit) and reduces cash (asset, credit). The amount is the 47,300 yen paid. Common error: debiting taxes and dues or suspense consumption tax instead."}
    },
   {
    "id": "m071",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税17,500円を現金で納付した。",
     "en": "Paid in cash 17,500 yen of withholding income tax that had been held as deposits received."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 17500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 17500
     }
    ],
    "accounts": [
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     }
    ],
      "exp": {"ja":"給与から預かった源泉所得税は預り金（負債）で処理しており、納付で預り金が減るので借方、現金の減少を貸方に記入する。納付額17,500円がそのまま金額。所得税や租税公課（費用）とする誤りに注意。","en":"Withholding tax held from wages sits in deposits received (liability), so paying it reduces that liability (debit) and cash (credit). The amount is the 17,500 yen paid. Common error: recording it as an income tax or taxes-and-dues expense."}
    },
   {
    "id": "m072",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し353,700円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To raise capital, new shares were issued and 353,700 yen was received and deposited into the checking account (the entire amount is recorded as capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 353700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 353700
     }
    ],
    "accounts": [
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     }
    ],
      "exp": {"ja":"株式の払込みで資産の当座預金が増えるので借方、純資産の資本金が増えるので貸方に記入する。全額を資本金とするため払込額353,700円がそのまま金額になる。払込金を資本準備金に分ける誤りに注意（問題は全額資本金）。","en":"Issuing shares increases the checking account (asset, debit) and capital stock (equity, credit). The entire payment of 353,700 yen is capital stock, so no calculation is needed. Common error: splitting part of it into capital reserve, although the whole amount is capital stock."}
    },
   {
    "id": "m073",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "店主が私用のため現金37,800円を引き出した(引出金)。",
     "en": "The owner withdrew 37,800 yen in cash for personal use (recorded as drawings)."
    },
    "debit": [
     {
      "acct": {
       "ja": "引出金",
       "en": "Drawings"
      },
      "amt": 37800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 37800
     }
    ],
    "accounts": [
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "未収入金",
      "en": "Other receivable"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     }
    ],
      "exp": {"ja":"店主が私用で現金を引き出すと、元手である資本が減るため引出金を借方に、現金の減少を貸方に記入する。金額は引き出した37,800円。費用（雑費など）に計上する誤りに注意。","en":"When the owner takes cash for personal use, capital decreases, recorded as drawings (debit), and cash decreases (credit). The amount is the 37,800 yen withdrawn. Common error: booking it as an expense such as miscellaneous expense."}
    },
   {
    "id": "m074",
    "dom": "shihon",
    "diff": 3,
    "q": {
     "ja": "預り金として保管していた源泉所得税12,100円を現金で納付した。",
     "en": "Paid in cash 12,100 yen of withholding income tax that had been held as deposits received."
    },
    "debit": [
     {
      "acct": {
       "ja": "預り金",
       "en": "Deposits received"
      },
      "amt": 12100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 12100
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "クレジット売掛金",
      "en": "Credit card receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     }
    ],
      "exp": {"ja":"給与から預かった源泉所得税は預り金（負債）で処理しており、納付で預り金が減るので借方、現金の減少を貸方に記入する。納付額12,100円がそのまま金額。所得税や租税公課（費用）とする誤りに注意。","en":"Withholding tax held from wages sits in deposits received (liability), so paying it reduces that liability (debit) and cash (credit). The amount is the 12,100 yen paid. Common error: recording it as an income tax or taxes-and-dues expense."}
    },
   {
    "id": "m075",
    "dom": "shihon",
    "diff": 1,
    "q": {
     "ja": "会社の設立にあたり株式を発行し549,200円の払込みを受け当座預金とした(全額資本金)。",
     "en": "On the formation of the company, shares were issued and 549,200 yen was received and deposited into the checking account (the entire amount is recorded as capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 549200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 549200
     }
    ],
    "accounts": [
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     }
    ],
      "exp": {"ja":"株式の払込みで資産の当座預金が増えるので借方、純資産の資本金が増えるので貸方に記入する。全額を資本金とするため払込額549,200円がそのまま金額になる。払込みを借入金や売上と取り違える誤りに注意。","en":"Issuing shares increases the checking account (asset, debit) and capital stock (equity, credit). The entire payment of 549,200 yen is capital stock, so no calculation is needed. Common error: treating the receipt as a loan or as sales."}
    },
   {
    "id": "m076",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し588,300円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To raise capital, new shares were issued and 588,300 yen was received and deposited into the checking account (the entire amount is recorded as capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 588300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 588300
     }
    ],
    "accounts": [
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     }
    ],
      "exp": {"ja":"株式の払込みで資産の当座預金が増えるので借方、純資産の資本金が増えるので貸方に記入する。全額を資本金とするため払込額588,300円がそのまま金額になる。払込金を資本準備金に分ける誤りに注意（問題は全額資本金）。","en":"Issuing shares increases the checking account (asset, debit) and capital stock (equity, credit). The entire payment of 588,300 yen is capital stock, so no calculation is needed. Common error: splitting part of it into capital reserve, although the whole amount is capital stock."}
    },
   {
    "id": "m077",
    "dom": "shihon",
    "diff": 2,
    "q": {
     "ja": "増資のため新株を発行し822,900円の払込みを受け当座預金とした(全額資本金)。",
     "en": "To raise capital, new shares were issued and 822,900 yen was received and deposited into the checking account (the entire amount is recorded as capital stock)."
    },
    "debit": [
     {
      "acct": {
       "ja": "当座預金",
       "en": "Checking"
      },
      "amt": 822900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "資本金",
       "en": "Capital stock"
      },
      "amt": 822900
     }
    ],
    "accounts": [
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "仮払金",
      "en": "Suspense payment"
     },
     {
      "ja": "貸倒損失",
      "en": "Bad debt loss"
     }
    ],
      "exp": {"ja":"株式の払込みで資産の当座預金が増えるので借方、純資産の資本金が増えるので貸方に記入する。全額を資本金とするため払込額822,900円がそのまま金額になる。払込みを借入金や売上と取り違える誤りに注意。","en":"Issuing shares increases the checking account (asset, debit) and capital stock (equity, credit). The entire payment of 822,900 yen is capital stock, so no calculation is needed. Common error: treating the receipt as a loan or as sales."}
    },
   {
    "id": "m078",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算整理。期首商品64,900円を仕入勘定へ振り替える(しくり)。",
     "en": "At year-end adjustment, transfer the beginning merchandise inventory of 64,900 yen to the purchases account (the shi-kuri entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 64900
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 64900
     }
    ],
    "accounts": [
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     }
    ],
      "exp": {"ja":"期首商品は当期に販売される分なので、売上原価の計算のため仕入（費用）に加える。仕入を借方、繰越商品（資産）の減少を貸方に記入し、金額は期首商品64,900円。借方と貸方を逆にする誤りに注意。","en":"Beginning inventory is sold during the period, so it is added to purchases to compute cost of goods sold: purchases (expense) debit, merchandise inventory (asset) credit, for the beginning balance of 64,900 yen. Common error: reversing debit and credit."}
    },
   {
    "id": "m079",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり支払保険料の前払分2,400円を前払保険料に振り替える。",
     "en": "At year-end, reclassify 2,400 yen of the insurance expense paid in advance to prepaid insurance."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払保険料",
       "en": "Prepaid insurance"
      },
      "amt": 2400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "保険料",
       "en": "Insurance expense"
      },
      "amt": 2400
     }
    ],
    "accounts": [
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     }
    ],
      "exp": {"ja":"支払保険料のうち翌期分は当期の費用ではないので、費用から資産へ振り替える。前払保険料（資産）を借方、保険料の減少を貸方に記入し、金額は前払分2,400円。未払保険料（負債）とする誤りに注意。","en":"The part of insurance premiums covering next year is not a current expense, so it moves from expense to asset: prepaid insurance debit, insurance expense credit, for the prepaid 2,400 yen. Common error: using accrued (unpaid) insurance, a liability."}
    },
   {
    "id": "m080",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算整理。期首商品11,500円を仕入勘定へ振り替える(しくり)。",
     "en": "At year-end adjustment, transfer the beginning merchandise inventory of 11,500 yen to the purchases account (the shi-kuri entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 11500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 11500
     }
    ],
    "accounts": [
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     }
    ],
      "exp": {"ja":"期首商品は当期に販売される分なので、売上原価の計算のため仕入（費用）に加える。仕入を借方、繰越商品（資産）の減少を貸方に記入し、金額は期首商品11,500円。借方と貸方を逆にする誤りに注意。","en":"Beginning inventory is sold during the period, so it is added to purchases to compute cost of goods sold: purchases (expense) debit, merchandise inventory (asset) credit, for the beginning balance of 11,500 yen. Common error: reversing debit and credit."}
    },
   {
    "id": "m081",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり受取地代の前受分6,700円を計上する。",
     "en": "At year-end, record 6,700 yen of land rent income received in advance as unearned land rent."
    },
    "debit": [
     {
      "acct": {
       "ja": "受取地代",
       "en": "Land rent income"
      },
      "amt": 6700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受地代",
       "en": "Unearned land rent"
      },
      "amt": 6700
     }
    ],
    "accounts": [
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "消耗品費",
      "en": "Supplies expense"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"受け取った地代のうち翌期分は当期の収益ではないので、収益から負債へ繰り延べる。受取地代を借方、前受地代（負債）を貸方に記入し、金額は前受分6,700円。未収地代（資産）とする誤りに注意。","en":"Rent received for next year is not current revenue, so it is deferred from income to a liability: land rent income debit, unearned land rent credit, for the 6,700 yen received in advance. Common error: using accrued land rent receivable, an asset."}
    },
   {
    "id": "m082",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算にあたり受取利息の未収分5,100円を計上する。",
     "en": "At year-end, accrue 5,100 yen of interest income not yet received."
    },
    "debit": [
     {
      "acct": {
       "ja": "未収利息",
       "en": "Accrued interest receivable"
      },
      "amt": 5100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "受取利息",
       "en": "Interest income"
      },
      "amt": 5100
     }
    ],
    "accounts": [
     {
      "ja": "車両運搬具",
      "en": "Vehicles"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     }
    ],
      "exp": {"ja":"利息の受取日が来ていなくても当期分は収益に計上する。未収利息（資産）を借方、受取利息（収益）を貸方に記入し、金額は未収分5,100円。未払利息（負債）と取り違える誤りに注意。","en":"Interest earned in the period is revenue even if not yet received: accrued interest receivable (asset) debit, interest income (revenue) credit, for 5,100 yen. Common error: confusing it with accrued interest payable, a liability."}
    },
   {
    "id": "m083",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり売上560,700円を損益勘定に振り替える。",
     "en": "At year-end, close sales of 560,700 yen to the income summary account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 560700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "損益",
       "en": "Income summary"
      },
      "amt": 560700
     }
    ],
    "accounts": [
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "未払金",
      "en": "Other payable"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"収益の勘定は貸方に残高があるので、借方に記入して売上を0にし、相手は損益の貸方に記入する。金額は売上残高の560,700円。繰越利益剰余金へ直接振り替える誤りに注意。","en":"Revenue accounts carry credit balances, so sales is debited to zero and the income summary is credited with the balance of 560,700 yen. Common error: transferring directly to retained earnings brought forward."}
    },
   {
    "id": "m084",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり備品の減価償却費47,800円を間接法で計上する。",
     "en": "At year-end, record depreciation expense of 47,800 yen on equipment using the indirect method."
    },
    "debit": [
     {
      "acct": {
       "ja": "減価償却費",
       "en": "Depreciation expense"
      },
      "amt": 47800
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "減価償却累計額",
       "en": "Accumulated depreciation"
      },
      "amt": 47800
     }
    ],
    "accounts": [
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     }
    ],
      "exp": {"ja":"減価償却費（費用）を借方に記入し、間接法なので備品を直接減らさず減価償却累計額を貸方に記入する。金額は問題文の償却額47,800円。直接法の貸方を備品とする誤りに注意。","en":"Depreciation expense (expense) is debited, and under the indirect method the credit goes to accumulated depreciation rather than to equipment itself. The amount is the 47,800 yen given. Common error: crediting equipment, which is the direct method."}
    },
   {
    "id": "m085",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり支払利息の未払分8,100円を計上する。",
     "en": "At year-end, accrue 8,100 yen of interest expense not yet paid."
    },
    "debit": [
     {
      "acct": {
       "ja": "支払利息",
       "en": "Interest expense"
      },
      "amt": 8100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "未払利息",
       "en": "Accrued interest payable"
      },
      "amt": 8100
     }
    ],
    "accounts": [
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "未払利息",
      "en": "Accrued interest payable"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "支払利息",
      "en": "Interest expense"
     }
    ],
      "exp": {"ja":"利息の支払日が来ていなくても当期分は費用に計上する。支払利息（費用）を借方、未払利息（負債）を貸方に記入し、金額は未払分8,100円。未収利息（資産）と取り違える誤りに注意。","en":"Interest incurred in the period is an expense even if not yet paid: interest expense debit, accrued interest payable (liability) credit, for 8,100 yen. Common error: confusing it with accrued interest receivable, an asset."}
    },
   {
    "id": "m086",
    "dom": "kessan",
    "diff": 2,
    "q": {
     "ja": "決算整理。期首商品73,500円を仕入勘定へ振り替える(しくり)。",
     "en": "At year-end adjustment, transfer the beginning merchandise inventory of 73,500 yen to the purchases account (the shi-kuri entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 73500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 73500
     }
    ],
    "accounts": [
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     }
    ],
      "exp": {"ja":"期首商品は当期に販売される分なので、売上原価の計算のため仕入（費用）に加える。仕入を借方、繰越商品（資産）の減少を貸方に記入し、金額は期首商品73,500円。借方と貸方を逆にする誤りに注意。","en":"Beginning inventory is sold during the period, so it is added to purchases to compute cost of goods sold: purchases (expense) debit, merchandise inventory (asset) credit, for the beginning balance of 73,500 yen. Common error: reversing debit and credit."}
    },
   {
    "id": "m087",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算整理。期末商品22,600円を繰越商品へ振り替える(くりし)。",
     "en": "At year-end adjustment, transfer the ending merchandise inventory of 22,600 yen from the purchases account to merchandise inventory (the kuri-shi entry)."
    },
    "debit": [
     {
      "acct": {
       "ja": "繰越商品",
       "en": "Merchandise inventory"
      },
      "amt": 22600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 22600
     }
    ],
    "accounts": [
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "当座預金",
      "en": "Checking"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     }
    ],
      "exp": {"ja":"売上原価は期首商品＋当期仕入−期末商品で求める。売れ残った期末商品22,600円を仕入から減らして繰越商品（資産）に移すので、繰越商品が借方、仕入が貸方。しくりとくりしを取り違える誤りに注意。","en":"Cost of goods sold is beginning inventory plus purchases minus ending inventory. The unsold 22,600 yen is moved out of purchases into merchandise inventory (asset): inventory debit, purchases credit. Common error: confusing the shi-kuri and kuri-shi entries."}
    },
   {
    "id": "m088",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり売上951,700円を損益勘定に振り替える。",
     "en": "At year-end, close sales of 951,700 yen to the income summary account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 951700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "損益",
       "en": "Income summary"
      },
      "amt": 951700
     }
    ],
    "accounts": [
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "未収利息",
      "en": "Accrued interest receivable"
     },
     {
      "ja": "通信費",
      "en": "Communication expense"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     }
    ],
      "exp": {"ja":"収益の勘定は貸方に残高があるので、借方に記入して売上を0にし、相手は損益の貸方に記入する。金額は売上残高の951,700円。繰越利益剰余金へ直接振り替える誤りに注意。","en":"Revenue accounts carry credit balances, so sales is debited to zero and the income summary is credited with the balance of 951,700 yen. Common error: transferring directly to retained earnings brought forward."}
    },
   {
    "id": "m089",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり貸倒引当金7,500円を差額補充法で繰り入れる。",
     "en": "At year-end, provide 7,500 yen for the allowance for doubtful accounts using the difference supplement method."
    },
    "debit": [
     {
      "acct": {
       "ja": "貸倒引当金繰入",
       "en": "Bad debt expense"
      },
      "amt": 7500
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "貸倒引当金",
       "en": "Allowance for doubtful accounts"
      },
      "amt": 7500
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "貸倒引当金繰入",
      "en": "Bad debt expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"見積額に対する不足分だけを繰り入れる差額補充法なので、貸倒引当金繰入（費用）を借方、貸倒引当金を貸方に記入する。繰入額は問題文の7,500円。貸倒損失で処理する誤りに注意。","en":"Under the difference supplement method only the shortfall is provided: bad debt expense (allowance provision) debit, allowance for doubtful accounts credit, for the 7,500 yen given. Common error: using bad debt loss, which is for actual write-offs."}
    },
   {
    "id": "m090",
    "dom": "kessan",
    "diff": 1,
    "q": {
     "ja": "決算にあたり支払保険料の前払分6,600円を前払保険料に振り替える。",
     "en": "At year-end, reclassify 6,600 yen of the insurance expense paid in advance to prepaid insurance."
    },
    "debit": [
     {
      "acct": {
       "ja": "前払保険料",
       "en": "Prepaid insurance"
      },
      "amt": 6600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "保険料",
       "en": "Insurance expense"
      },
      "amt": 6600
     }
    ],
    "accounts": [
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     },
     {
      "ja": "貯蔵品",
      "en": "Storable supplies"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"支払保険料のうち翌期分は当期の費用ではないので、費用から資産へ振り替える。前払保険料（資産）を借方、保険料の減少を貸方に記入し、金額は前払分6,600円。未払保険料（負債）とする誤りに注意。","en":"The part of insurance premiums covering next year is not a current expense, so it moves from expense to asset: prepaid insurance debit, insurance expense credit, for the prepaid 6,600 yen. Common error: using accrued (unpaid) insurance, a liability."}
    },
   {
    "id": "m091",
    "dom": "kessan",
    "diff": 3,
    "q": {
     "ja": "決算にあたり受取地代の前受分8,300円を計上する。",
     "en": "At year-end, record 8,300 yen of land rent income received in advance as unearned land rent."
    },
    "debit": [
     {
      "acct": {
       "ja": "受取地代",
       "en": "Land rent income"
      },
      "amt": 8300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "前受地代",
       "en": "Unearned land rent"
      },
      "amt": 8300
     }
    ],
    "accounts": [
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "前受地代",
      "en": "Unearned land rent"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     }
    ],
      "exp": {"ja":"受け取った地代のうち翌期分は当期の収益ではないので、収益から負債へ繰り延べる。受取地代を借方、前受地代（負債）を貸方に記入し、金額は前受分8,300円。未収地代（資産）とする誤りに注意。","en":"Rent received for next year is not current revenue, so it is deferred from income to a liability: land rent income debit, unearned land rent credit, for the 8,300 yen received in advance. Common error: using accrued land rent receivable, an asset."}
    },
   {
    "id": "m092",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "入金伝票。商品を767,700円で売り上げ現金を受け取った。",
     "en": "Receipt slip: sold merchandise for 767,700 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 767700
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 767700
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "貸付金",
      "en": "Loans receivable"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "損益",
      "en": "Income summary"
     },
     {
      "ja": "保険料",
      "en": "Insurance expense"
     }
    ],
      "exp": {"ja":"商品を売って現金を受け取ったので、現金（資産）の増加を借方、売上（収益）を貸方に記入する。入金伝票は現金が借方と決まっており、伝票に書く科目は売上。金額は767,700円。売掛金とする誤りに注意。","en":"Selling merchandise for cash increases cash (asset, debit) and sales (revenue, credit). A receipt slip always means a cash debit, so the slip names the sales account for 767,700 yen. Common error: recording accounts receivable instead."}
    },
   {
    "id": "m093",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "出金伝票。旅費交通費924,100円を現金で支払った。",
     "en": "Payment slip: paid travel expenses of 924,100 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 924100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 924100
     }
    ],
    "accounts": [
     {
      "ja": "受取地代",
      "en": "Land rent income"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "前受金",
      "en": "Advance received"
     },
     {
      "ja": "現金過不足",
      "en": "Cash over and short"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     }
    ],
      "exp": {"ja":"旅費交通費（費用）の発生を借方、現金（資産）の減少を貸方に記入する。出金伝票は現金が貸方と決まっており、伝票に書く科目は旅費交通費。金額は924,100円。立替金や未払金とする誤りに注意。","en":"Travel expense (expense) is debited and cash (asset) is credited. A payment slip always means a cash credit, so the slip names travel expense for 924,100 yen. Common error: using advances paid or accounts payable."}
    },
   {
    "id": "m094",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "振替伝票。商品を57,000円で掛け仕入れした。",
     "en": "Transfer slip: purchased merchandise for 57,000 yen on account."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 57000
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "買掛金",
       "en": "Accounts payable"
      },
      "amt": 57000
     }
    ],
    "accounts": [
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "未払消費税",
      "en": "Consumption tax payable"
     },
     {
      "ja": "支払家賃",
      "en": "Rent expense"
     },
     {
      "ja": "建物",
      "en": "Buildings"
     },
     {
      "ja": "給料",
      "en": "Salaries expense"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "支払手形",
      "en": "Notes payable"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     }
    ],
      "exp": {"ja":"商品を掛けで仕入れたので、三分法により仕入（費用）を借方、後で支払う義務の買掛金（負債）を貸方に記入する。現金が動かないため振替伝票を使う。金額は57,000円。支払手形とする誤りに注意。","en":"A purchase on account debits purchases (expense) and credits accounts payable (liability). No cash moves, so a transfer slip is used, for 57,000 yen. Common error: using notes payable, which requires a bill."}
    },
   {
    "id": "m095",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "出金伝票。旅費交通費135,200円を現金で支払った。",
     "en": "Payment slip: paid travel expenses of 135,200 yen in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "旅費交通費",
       "en": "Travel expense"
      },
      "amt": 135200
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 135200
     }
    ],
    "accounts": [
     {
      "ja": "未払法人税等",
      "en": "Income taxes payable"
     },
     {
      "ja": "土地",
      "en": "Land"
     },
     {
      "ja": "法人税等",
      "en": "Income taxes"
     },
     {
      "ja": "仮払消費税",
      "en": "Suspense consumption tax paid"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "仮受消費税",
      "en": "Suspense consumption tax received"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     }
    ],
      "exp": {"ja":"旅費交通費（費用）の発生を借方、現金（資産）の減少を貸方に記入する。出金伝票は現金が貸方と決まっており、伝票に書く科目は旅費交通費。金額は135,200円。立替金や未払金とする誤りに注意。","en":"Travel expense (expense) is debited and cash (asset) is credited. A payment slip always means a cash credit, so the slip names travel expense for 135,200 yen. Common error: using advances paid or accounts payable."}
    },
   {
    "id": "m096",
    "dom": "denpyo",
    "diff": 2,
    "q": {
     "ja": "入金伝票。商品を174,300円で売り上げ現金を受け取った。",
     "en": "Receipt slip: sold merchandise for 174,300 yen and received cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 174300
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 174300
     }
    ],
    "accounts": [
     {
      "ja": "受取利息",
      "en": "Interest income"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "減価償却費",
      "en": "Depreciation expense"
     },
     {
      "ja": "固定資産売却益",
      "en": "Gain on sale of fixed assets"
     },
     {
      "ja": "普通預金",
      "en": "Ordinary deposit"
     },
     {
      "ja": "前払保険料",
      "en": "Prepaid insurance"
     },
     {
      "ja": "借入金",
      "en": "Loans payable"
     }
    ],
      "exp": {"ja":"商品を売って現金を受け取ったので、現金（資産）の増加を借方、売上（収益）を貸方に記入する。入金伝票は現金が借方と決まっており、伝票に書く科目は売上。金額は174,300円。売掛金とする誤りに注意。","en":"Selling merchandise for cash increases cash (asset, debit) and sales (revenue, credit). A receipt slip always means a cash debit, so the slip names the sales account for 174,300 yen. Common error: recording accounts receivable instead."}
    },
   {
    "id": "m097",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "出金伝票。商品を213,400円で仕入れ現金で支払った。",
     "en": "Payment slip: purchased merchandise for 213,400 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 213400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 213400
     }
    ],
    "accounts": [
     {
      "ja": "借入金",
      "en": "Loans payable"
     },
     {
      "ja": "支払手数料",
      "en": "Fee expense"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "固定資産売却損",
      "en": "Loss on sale of fixed assets"
     },
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "旅費交通費",
      "en": "Travel expense"
     },
     {
      "ja": "雑益",
      "en": "Miscellaneous gain"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     }
    ],
      "exp": {"ja":"商品を現金で仕入れたので、三分法により仕入（費用）を借方、現金の減少を貸方に記入する。出金伝票は現金が貸方と決まっており、伝票に書く科目は仕入。金額は213,400円。買掛金とする誤りに注意。","en":"Under the three-account method, purchases (expense) is debited and cash is credited. A payment slip always means a cash credit, so the slip names purchases for 213,400 yen. Common error: recording accounts payable although cash was paid."}
    },
   {
    "id": "m098",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "振替伝票。商品を487,100円で掛け売上げした。",
     "en": "Transfer slip: sold merchandise for 487,100 yen on account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 487100
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 487100
     }
    ],
    "accounts": [
     {
      "ja": "当座借越",
      "en": "Bank overdraft"
     },
     {
      "ja": "繰越商品",
      "en": "Merchandise inventory"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     },
     {
      "ja": "資本金",
      "en": "Capital stock"
     },
     {
      "ja": "買掛金",
      "en": "Accounts payable"
     },
     {
      "ja": "立替金",
      "en": "Advances to others"
     },
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "売上",
      "en": "Sales"
     }
    ],
      "exp": {"ja":"商品を掛けで売ったので、後で受け取る権利の売掛金（資産）を借方、売上（収益）を貸方に記入する。現金が動かないため振替伝票を使う。金額は487,100円。受取手形とする誤りに注意。","en":"A sale on account debits accounts receivable (asset) and credits sales (revenue). No cash moves, so a transfer slip is used, for 487,100 yen. Common error: using notes receivable, which requires a bill."}
    },
   {
    "id": "m099",
    "dom": "denpyo",
    "diff": 1,
    "q": {
     "ja": "出金伝票。商品を604,400円で仕入れ現金で支払った。",
     "en": "Payment slip: purchased merchandise for 604,400 yen and paid in cash."
    },
    "debit": [
     {
      "acct": {
       "ja": "仕入",
       "en": "Purchases"
      },
      "amt": 604400
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "現金",
       "en": "Cash"
      },
      "amt": 604400
     }
    ],
    "accounts": [
     {
      "ja": "現金",
      "en": "Cash"
     },
     {
      "ja": "預り金",
      "en": "Deposits received"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "備品",
      "en": "Equipment"
     },
     {
      "ja": "前払金",
      "en": "Advance paid"
     },
     {
      "ja": "雑損",
      "en": "Miscellaneous loss"
     },
     {
      "ja": "仕入",
      "en": "Purchases"
     },
     {
      "ja": "貸倒引当金",
      "en": "Allowance for doubtful accounts"
     }
    ],
      "exp": {"ja":"商品を現金で仕入れたので、三分法により仕入（費用）を借方、現金の減少を貸方に記入する。出金伝票は現金が貸方と決まっており、伝票に書く科目は仕入。金額は604,400円。買掛金とする誤りに注意。","en":"Under the three-account method, purchases (expense) is debited and cash is credited. A payment slip always means a cash credit, so the slip names purchases for 604,400 yen. Common error: recording accounts payable although cash was paid."}
    },
   {
    "id": "m100",
    "dom": "denpyo",
    "diff": 3,
    "q": {
     "ja": "振替伝票。商品を682,600円で掛け売上げした。",
     "en": "Transfer slip: sold merchandise for 682,600 yen on account."
    },
    "debit": [
     {
      "acct": {
       "ja": "売掛金",
       "en": "Accounts receivable"
      },
      "amt": 682600
     }
    ],
    "credit": [
     {
      "acct": {
       "ja": "売上",
       "en": "Sales"
      },
      "amt": 682600
     }
    ],
    "accounts": [
     {
      "ja": "売掛金",
      "en": "Accounts receivable"
     },
     {
      "ja": "仮払法人税等",
      "en": "Prepaid income taxes"
     },
     {
      "ja": "減価償却累計額",
      "en": "Accumulated depreciation"
     },
     {
      "ja": "小口現金",
      "en": "Petty cash"
     },
     {
      "ja": "租税公課",
      "en": "Taxes and dues"
     },
     {
      "ja": "売上",
      "en": "Sales"
     },
     {
      "ja": "引出金",
      "en": "Drawings"
     },
     {
      "ja": "繰越利益剰余金",
      "en": "Retained earnings"
     }
    ],
      "exp": {"ja":"商品を掛けで売ったので、後で受け取る権利の売掛金（資産）を借方、売上（収益）を貸方に記入する。現金が動かないため振替伝票を使う。金額は682,600円。受取手形とする誤りに注意。","en":"A sale on account debits accounts receivable (asset) and credits sales (revenue). No cash moves, so a transfer slip is used, for 682,600 yen. Common error: using notes receivable, which requires a bill."}
    }
  ],
  "calc": [],
  "diagrams": [
   {
    "id": "d01",
    "layout": "widget",
    "kind": "loop",
    "ramp": "teal",
    "title": {
     "ja": "簿記一巡（会計循環）",
     "en": "The accounting cycle"
    },
    "sub": {
     "ja": "取引から財務諸表まで。毎期くり返す循環。",
     "en": "Transaction to statements; repeats each period."
    },
    "nodes": [
     {
      "label": {
       "ja": "取引",
       "en": "Transaction"
      },
      "desc": {
       "ja": "資産等の増減をもたらす事象を認識する。",
       "en": "Recognize events changing assets/liabilities."
      }
     },
     {
      "label": {
       "ja": "仕訳",
       "en": "Journalize"
      },
      "desc": {
       "ja": "借方・貸方に分けて仕訳帳へ記入する。",
       "en": "Record debits and credits in the journal."
      }
     },
     {
      "label": {
       "ja": "転記",
       "en": "Post"
      },
      "desc": {
       "ja": "仕訳を総勘定元帳の各勘定へ書き移す。",
       "en": "Transfer entries to ledger accounts."
      }
     },
     {
      "label": {
       "ja": "試算表",
       "en": "Trial balance"
      },
      "desc": {
       "ja": "借方合計＝貸方合計で転記を検証する。",
       "en": "Check that debits equal credits."
      }
     },
     {
      "label": {
       "ja": "決算整理",
       "en": "Adjust"
      },
      "desc": {
       "ja": "売上原価・減価償却・経過勘定等を整理する。",
       "en": "COGS, depreciation, accruals/deferrals."
      }
     },
     {
      "label": {
       "ja": "財務諸表",
       "en": "Statements"
      },
      "desc": {
       "ja": "精算表を経てB/S・P/Lを作成し締め切る。",
       "en": "Prepare B/S and P/L, then close."
      }
     }
    ],
    "note": {
     "ja": "毎会計期間くり返される循環。締切後、翌期首へ残高を繰り越す。",
     "en": "A cycle repeated every period; balances carry to the next period."
    }
   },
   {
    "id": "d02",
    "layout": "widget",
    "kind": "nested",
    "title": {
     "ja": "簿記の5要素と増減の記入",
     "en": "Five elements and their sides"
    },
    "sub": {
     "ja": "各要素の増加をどちら側に書くか。タップで確認。",
     "en": "Which side records an increase? Tap each."
    },
    "container": {
     "label": {
      "ja": "5要素",
      "en": "Five elements"
     },
     "ramp": "indigo",
     "children": [
      {
       "label": {
        "ja": "借方に増加",
        "en": "Increase on debit"
       },
       "ramp": "indigo",
       "items": [
        {
         "label": {
          "ja": "資産",
          "en": "Assets"
         },
         "note": {
          "ja": "現金・売掛金・備品等。増加=借方、減少=貸方。",
          "en": "Cash, A/R, equipment; increase=debit."
         }
        },
        {
         "label": {
          "ja": "費用",
          "en": "Expenses"
         },
         "note": {
          "ja": "仕入・給料・支払家賃等。発生=借方。",
          "en": "Purchases, salaries, rent; incurred=debit."
         }
        }
       ]
      },
      {
       "label": {
        "ja": "貸方に増加",
        "en": "Increase on credit"
       },
       "ramp": "cyan",
       "items": [
        {
         "label": {
          "ja": "負債",
          "en": "Liabilities"
         },
         "note": {
          "ja": "買掛金・借入金等。増加=貸方。",
          "en": "A/P, loans; increase=credit."
         }
        },
        {
         "label": {
          "ja": "純資産",
          "en": "Equity"
         },
         "note": {
          "ja": "資本金・繰越利益剰余金。増加=貸方。",
          "en": "Capital, retained earnings; increase=credit."
         }
        },
        {
         "label": {
          "ja": "収益",
          "en": "Revenue"
         },
         "note": {
          "ja": "売上・受取利息等。発生=貸方。",
          "en": "Sales, interest income; earned=credit."
         }
        }
       ]
      }
     ]
    },
    "foot": {
     "ja": "借方＝資産・費用の増加／貸方＝負債・純資産・収益の増加。",
     "en": "Debit = ↑assets/expenses; credit = ↑liabilities/equity/revenue."
    }
   },
   {
    "id": "d03",
    "layout": "widget",
    "kind": "nested",
    "title": {
     "ja": "決算手続の流れ",
     "en": "Closing procedure"
    },
    "sub": {
     "ja": "試算表から財務諸表・帳簿締切まで。",
     "en": "From trial balance to statements and ruling off."
    },
    "container": {
     "label": {
      "ja": "決算の3段階",
      "en": "Three stages"
     },
     "ramp": "indigo",
     "children": [
      {
       "label": {
        "ja": "決算予備手続",
        "en": "Preliminary"
       },
       "ramp": "indigo",
       "items": [
        {
         "label": {
          "ja": "試算表の作成",
          "en": "Trial balance"
         },
         "note": {
          "ja": "転記の正確性を検証する。",
          "en": "Verify posting accuracy."
         }
        },
        {
         "label": {
          "ja": "棚卸・整理事項の把握",
          "en": "Take stock"
         },
         "note": {
          "ja": "期末商品・減価償却・貸倒・経過勘定を確定。",
          "en": "Ending inventory, depreciation, doubtful, accruals."
         }
        }
       ]
      },
      {
       "label": {
        "ja": "決算本手続",
        "en": "Main"
       },
       "ramp": "cyan",
       "items": [
        {
         "label": {
          "ja": "決算整理仕訳",
          "en": "Adjusting entries"
         },
         "note": {
          "ja": "しくり・くりし、減価償却、引当、経過勘定。",
          "en": "COGS swap, depreciation, allowances, accruals."
         }
        },
        {
         "label": {
          "ja": "精算表の作成",
          "en": "Worksheet"
         },
         "note": {
          "ja": "整理を集計しP/L・B/Sへ振り分ける。",
          "en": "Aggregate adjustments into P/L and B/S."
         }
        },
        {
         "label": {
          "ja": "帳簿の締切",
          "en": "Ruling off"
         },
         "note": {
          "ja": "損益勘定で純損益を算定し繰越利益剰余金へ。",
          "en": "Determine net income via Income summary → retained earnings."
         }
        }
       ]
      },
      {
       "label": {
        "ja": "財務諸表作成",
        "en": "Reporting"
       },
       "ramp": "green",
       "items": [
        {
         "label": {
          "ja": "B/S・P/L",
          "en": "B/S & P/L"
         },
         "note": {
          "ja": "貸借対照表と損益計算書を作成する。",
          "en": "Prepare the balance sheet and income statement."
         }
        }
       ]
      }
     ]
    },
    "foot": {
     "ja": "整理→精算表→締切→財務諸表。順序を守るのが正確な決算の鍵。",
     "en": "Adjust → worksheet → close → statements; order matters."
    }
   },
   {
    "id": "d04",
    "layout": "widget",
    "kind": "box",
    "title": {
     "ja": "分記法 と 三分法",
     "en": "Itemized vs 3-account method"
    },
    "sub": {
     "ja": "商品売買の記帳方法の対比。",
     "en": "Two ways to record merchandising."
    },
    "left": {
     "heading": {
      "ja": "分記法",
      "en": "Itemized method"
     },
     "blocks": [
      {
       "label": {
        "ja": "使用勘定",
        "en": "Accounts"
       },
       "sub": {
        "ja": "商品・商品売買益",
        "en": "Merchandise, Gain on sale"
       },
       "desc": {
        "ja": "売上のつど原価と利益を分けて記帳。",
        "en": "Split cost and profit at each sale."
       }
      },
      {
       "label": {
        "ja": "長所・短所",
        "en": "Pros/cons"
       },
       "desc": {
        "ja": "利益が都度分かるが手間が大きい。",
        "en": "Profit is visible per sale but laborious."
       }
      }
     ]
    },
    "right": {
     "heading": {
      "ja": "三分法",
      "en": "3-account method"
     },
     "blocks": [
      {
       "label": {
        "ja": "使用勘定",
        "en": "Accounts"
       },
       "sub": {
        "ja": "仕入・売上・繰越商品",
        "en": "Purchases, Sales, Inventory"
       },
       "desc": {
        "ja": "期中は仕入・売上で記帳し、決算で売上原価を算定。",
        "en": "Record purchases/sales; compute COGS at closing."
       }
      },
      {
       "label": {
        "ja": "長所・短所",
        "en": "Pros/cons"
       },
       "desc": {
        "ja": "記帳が簡単。実務・検定の標準。",
        "en": "Simple; the exam/standard practice."
       }
      }
     ]
    },
    "foot": {
     "ja": "3級では三分法が中心。売上原価＝期首＋仕入−期末。",
     "en": "Level 3 centers on the 3-account method; COGS = beg + purchases − end."
    }
   },
   {
    "id": "d05",
    "layout": "widget",
    "kind": "stack",
    "title": {
     "ja": "経過勘定：繰延べ と 見越し",
     "en": "Deferrals vs accruals"
    },
    "sub": {
     "ja": "期間帰属を正すための4勘定。上=繰延べ、下=見越し。",
     "en": "Four accrual accounts. Top = deferral, bottom = accrual."
    },
    "top": {
     "heading": {
      "ja": "繰延べ（すでに授受）",
      "en": "Deferral (already paid/received)"
     },
     "ramp": "cyan",
     "blocks": [
      {
       "label": {
        "ja": "前払費用（資産）",
        "en": "Prepaid expense (asset)"
       },
       "note": {
        "ja": "支払済だが次期の費用。当期費用から控除。",
        "en": "Paid but next period's cost; remove from this period."
       }
      },
      {
       "label": {
        "ja": "前受収益（負債）",
        "en": "Unearned revenue (liab.)"
       },
       "note": {
        "ja": "受取済だが次期の収益。当期収益から控除。",
        "en": "Received but next period's revenue."
       }
      }
     ]
    },
    "bottom": {
     "heading": {
      "ja": "見越し（まだ授受なし）",
      "en": "Accrual (not yet paid/received)"
     },
     "ramp": "amber",
     "blocks": [
      {
       "label": {
        "ja": "未払費用（負債）",
        "en": "Accrued expense (liab.)"
       },
       "note": {
        "ja": "役務を受けたが未払。当期費用に加算。",
        "en": "Incurred but unpaid; add to this period."
       }
      },
      {
       "label": {
        "ja": "未収収益（資産）",
        "en": "Accrued revenue (asset)"
       },
       "note": {
        "ja": "役務を提供したが未収。当期収益に加算。",
        "en": "Earned but not received; add to this period."
       }
      }
     ]
    },
    "divider": {
     "ja": "── 支払・受取の『済/未』× 費用・収益 ──",
     "en": "── paid/received vs not × expense/revenue ──"
    },
    "foot": {
     "ja": "当期に属する費用・収益を正しく計上するための調整。",
     "en": "Adjustments so each period bears its own revenues and expenses."
    }
   },
   {
    "id": "d06",
    "layout": "widget",
    "kind": "nested",
    "title": {
     "ja": "簿記上の『現金』の範囲",
     "en": "What counts as 'cash'"
    },
    "sub": {
     "ja": "通貨のほか通貨代用証券も現金。タップで確認。",
     "en": "Currency plus cash-equivalent instruments. Tap each."
    },
    "container": {
     "label": {
      "ja": "現金勘定に含まれるもの",
      "en": "Included in 'Cash'"
     },
     "ramp": "green",
     "children": [
      {
       "label": {
        "ja": "通貨",
        "en": "Currency"
       },
       "ramp": "indigo",
       "items": [
        {
         "label": {
          "ja": "紙幣・硬貨",
          "en": "Notes & coins"
         },
         "note": {
          "ja": "最も基本的な現金。",
          "en": "The basic form of cash."
         }
        }
       ]
      },
      {
       "label": {
        "ja": "通貨代用証券",
        "en": "Cash equivalents"
       },
       "ramp": "cyan",
       "items": [
        {
         "label": {
          "ja": "他人振出小切手",
          "en": "Received checks"
         },
         "note": {
          "ja": "受け取ったらすぐ換金可能。現金扱い。",
          "en": "Convertible immediately; treated as cash."
         }
        },
        {
         "label": {
          "ja": "送金小切手・為替証書",
          "en": "Remittance checks / money orders"
         },
         "note": {
          "ja": "金融機関で換金可能。現金扱い。",
          "en": "Encashable at banks; treated as cash."
         }
        },
        {
         "label": {
          "ja": "配当金領収証・期限到来公社債利札",
          "en": "Dividend receipts / matured coupons"
         },
         "note": {
          "ja": "これらも現金として扱う。",
          "en": "Also treated as cash."
         }
        }
       ]
      },
      {
       "label": {
        "ja": "含まれないもの",
        "en": "Excluded"
       },
       "ramp": "red",
       "items": [
        {
         "label": {
          "ja": "郵便切手・収入印紙",
          "en": "Stamps"
         },
         "note": {
          "ja": "通信費・租税公課（未使用は貯蔵品）。",
          "en": "Postage/taxes; unused → supplies."
         }
        },
        {
         "label": {
          "ja": "先日付小切手",
          "en": "Post-dated checks"
         },
         "note": {
          "ja": "受取手形または売掛金として扱う。",
          "en": "Treated as a note/receivable."
         }
        }
       ]
      }
     ]
    },
    "foot": {
     "ja": "『すぐ換金できるか』が現金判定の軸。切手・印紙は現金でない。",
     "en": "The test is immediate convertibility; stamps are not cash."
    }
   },
   {
    "id": "d07",
    "layout": "widget",
    "kind": "box",
    "title": {
     "ja": "減価償却：定額法（3級の中心）",
     "en": "Depreciation: straight-line (core for L3)"
    },
    "sub": {
     "ja": "計算式と記帳（直接法・間接法）の対比。",
     "en": "Formula and recording (direct vs indirect)."
    },
    "left": {
     "heading": {
      "ja": "計算",
      "en": "Computation"
     },
     "blocks": [
      {
       "label": {
        "ja": "定額法の式",
        "en": "Straight-line"
       },
       "sub": {
        "ja": "(取得原価−残存価額)÷耐用年数",
        "en": "(Cost − salvage) / life"
       },
       "desc": {
        "ja": "毎期同額。期中取得は月割。",
        "en": "Equal each year; pro-rate partial years."
       }
      }
     ]
    },
    "right": {
     "heading": {
      "ja": "記帳方法",
      "en": "Recording"
     },
     "blocks": [
      {
       "label": {
        "ja": "間接法",
        "en": "Indirect"
       },
       "sub": {
        "ja": "(借)減価償却費 /(貸)減価償却累計額",
        "en": "Dr Dep. exp / Cr Accum. dep."
       },
       "desc": {
        "ja": "資産は取得原価のまま。累計額で控除表示。",
        "en": "Asset stays at cost; contra shows accumulation."
       }
      },
      {
       "label": {
        "ja": "直接法",
        "en": "Direct"
       },
       "sub": {
        "ja": "(借)減価償却費 /(貸)当該資産",
        "en": "Dr Dep. exp / Cr Asset"
       },
       "desc": {
        "ja": "資産を直接減額する。",
        "en": "Reduce the asset directly."
       }
      }
     ]
    },
    "foot": {
     "ja": "3級は定額法が中心。帳簿価額＝取得原価−累計額。",
     "en": "L3 focuses on straight-line; book value = cost − accumulated depreciation."
    }
   }
  ],
  "compare": [
   {
    "id": "cmp01",
    "title": {
     "ja": "B/S と P/L",
     "en": "B/S vs P/L"
    },
    "cols": [
     {
      "ja": "貸借対照表(B/S)",
      "en": "Balance Sheet"
     },
     {
      "ja": "損益計算書(P/L)",
      "en": "Income Statement"
     }
    ],
    "rows": [
     {
      "aspect": {
       "ja": "示すもの",
       "en": "Shows"
      },
      "cells": [
       {
        "ja": "一時点の財政状態",
        "en": "Position at a point"
       },
       {
        "ja": "一定期間の経営成績",
        "en": "Performance over a period"
       }
      ]
     },
     {
      "aspect": {
       "ja": "構成",
       "en": "Elements"
      },
      "cells": [
       {
        "ja": "資産・負債・純資産",
        "en": "Assets/Liab./Equity"
       },
       {
        "ja": "収益・費用",
        "en": "Revenue/Expense"
       }
      ]
     },
     {
      "aspect": {
       "ja": "差額",
       "en": "Residual"
      },
      "cells": [
       {
        "ja": "純資産(資本)",
        "en": "Net assets"
       },
       {
        "ja": "当期純利益",
        "en": "Net income"
       }
      ]
     }
    ]
   },
   {
    "id": "cmp02",
    "title": {
     "ja": "分記法 と 三分法",
     "en": "Itemized vs 3-account"
    },
    "cols": [
     {
      "ja": "分記法",
      "en": "Itemized"
     },
     {
      "ja": "三分法",
      "en": "3-account"
     }
    ],
    "rows": [
     {
      "aspect": {
       "ja": "勘定",
       "en": "Accounts"
      },
      "cells": [
       {
        "ja": "商品・商品売買益",
        "en": "Merchandise/Gain"
       },
       {
        "ja": "仕入・売上・繰越商品",
        "en": "Purchases/Sales/Inventory"
       }
      ]
     },
     {
      "aspect": {
       "ja": "利益把握",
       "en": "Profit"
      },
      "cells": [
       {
        "ja": "販売の都度",
        "en": "At each sale"
       },
       {
        "ja": "決算で売上原価計算",
        "en": "COGS at closing"
       }
      ]
     },
     {
      "aspect": {
       "ja": "実務",
       "en": "Use"
      },
      "cells": [
       {
        "ja": "手間大",
        "en": "Laborious"
       },
       {
        "ja": "標準（検定中心）",
        "en": "Standard/exam"
       }
      ]
     }
    ]
   },
   {
    "id": "cmp03",
    "title": {
     "ja": "売掛金 と 受取手形",
     "en": "A/R vs Notes receivable"
    },
    "cols": [
     {
      "ja": "売掛金",
      "en": "A/R"
     },
     {
      "ja": "受取手形",
      "en": "Notes receivable"
     }
    ],
    "rows": [
     {
      "aspect": {
       "ja": "発生",
       "en": "Arises"
      },
      "cells": [
       {
        "ja": "掛売上",
        "en": "Sale on account"
       },
       {
        "ja": "手形の受取",
        "en": "Receiving a note"
       }
      ]
     },
     {
      "aspect": {
       "ja": "証券",
       "en": "Instrument"
      },
      "cells": [
       {
        "ja": "なし",
        "en": "None"
       },
       {
        "ja": "約束手形等",
        "en": "Promissory note"
       }
      ]
     },
     {
      "aspect": {
       "ja": "性質",
       "en": "Nature"
      },
      "cells": [
       {
        "ja": "債権（資産）",
        "en": "Claim (asset)"
       },
       {
        "ja": "債権（資産）",
        "en": "Claim (asset)"
       }
      ]
     }
    ]
   },
   {
    "id": "cmp04",
    "title": {
     "ja": "貸倒れ処理：当期発生 と 前期発生",
     "en": "Bad debt: current vs prior origin"
    },
    "cols": [
     {
      "ja": "当期発生分",
      "en": "Current period"
     },
     {
      "ja": "前期発生分",
      "en": "Prior period"
     }
    ],
    "rows": [
     {
      "aspect": {
       "ja": "引当金",
       "en": "Allowance"
      },
      "cells": [
       {
        "ja": "未設定",
        "en": "None set"
       },
       {
        "ja": "設定済",
        "en": "Already provided"
       }
      ]
     },
     {
      "aspect": {
       "ja": "処理",
       "en": "Entry"
      },
      "cells": [
       {
        "ja": "貸倒損失",
        "en": "Bad debt loss"
       },
       {
        "ja": "貸倒引当金を取崩",
        "en": "Charge the allowance"
       }
      ]
     },
     {
      "aspect": {
       "ja": "不足時",
       "en": "If short"
      },
      "cells": [
       {
        "ja": "—",
        "en": "—"
       },
       {
        "ja": "不足額は貸倒損失",
        "en": "Excess → bad debt loss"
       }
      ]
     }
    ]
   },
   {
    "id": "cmp05",
    "title": {
     "ja": "3伝票制 と 5伝票制",
     "en": "3-slip vs 5-slip"
    },
    "cols": [
     {
      "ja": "3伝票制",
      "en": "3-slip"
     },
     {
      "ja": "5伝票制",
      "en": "5-slip"
     }
    ],
    "rows": [
     {
      "aspect": {
       "ja": "伝票",
       "en": "Slips"
      },
      "cells": [
       {
        "ja": "入金・出金・振替",
        "en": "Receipt/Payment/Transfer"
       },
       {
        "ja": "＋仕入・売上",
        "en": "+Purchase/Sales"
       }
      ]
     },
     {
      "aspect": {
       "ja": "特徴",
       "en": "Note"
      },
      "cells": [
       {
        "ja": "汎用的",
        "en": "General"
       },
       {
        "ja": "商品取引を専用伝票化",
        "en": "Dedicated goods slips"
       }
      ]
     }
    ]
   }
  ],
  "confuse": [
   {
    "id": "cf01",
    "title": {
     "ja": "売上原価＝当期仕入高だと思っていませんか？",
     "en": "Is COGS just this period's purchases?"
    },
    "wrong": {
     "ja": "その期に仕入れた金額がそのまま売上原価になる。",
     "en": "Purchases of the period equal COGS."
    },
    "right": {
     "ja": "売上原価＝期首商品＋当期仕入−期末商品。売れ残り（期末）を除く必要がある。",
     "en": "COGS = beginning + purchases − ending; unsold goods are excluded."
    }
   },
   {
    "id": "cf02",
    "title": {
     "ja": "減価償却費は現金の支出だと思っていませんか？",
     "en": "Is depreciation a cash outflow?"
    },
    "wrong": {
     "ja": "毎期、減価償却の分だけ現金が出ていく。",
     "en": "Cash leaves each period equal to depreciation."
    },
    "right": {
     "ja": "減価償却は取得時に支払った原価を期間配分する非資金費用。当期の現金支出は伴わない。",
     "en": "It allocates the already-paid cost over time; no current cash outflow."
    }
   },
   {
    "id": "cf03",
    "title": {
     "ja": "仮払金と前払金は同じだと思っていませんか？",
     "en": "Are 'suspense payment' and 'prepayments' the same?"
    },
    "wrong": {
     "ja": "どちらも先に払うので同じ勘定でよい。",
     "en": "Both are advance payments, so use one account."
    },
    "right": {
     "ja": "仮払金は金額・内容が未確定の一時払い。前払金は商品等の対価の前払い（確定）。",
     "en": "Suspense = unconfirmed advance; prepayment = confirmed advance for goods."
    }
   },
   {
    "id": "cf04",
    "title": {
     "ja": "当座借越は資産だと思っていませんか？",
     "en": "Is a bank overdraft an asset?"
    },
    "wrong": {
     "ja": "当座預金の一種だから資産である。",
     "en": "It's a checking item, so an asset."
    },
    "right": {
     "ja": "残高を超えて引き出した状態＝銀行からの借入。当座借越（負債）として表示する。",
     "en": "It is money owed to the bank — a liability (overdraft)."
    }
   },
   {
    "id": "cf05",
    "title": {
     "ja": "前受金を売上に計上していませんか？",
     "en": "Do you record a deposit as sales?"
    },
    "wrong": {
     "ja": "手付金を受け取った時点で売上にする。",
     "en": "Recognize sales when a deposit is received."
    },
    "right": {
     "ja": "商品引渡前の入金は前受金（負債）。引渡し時に売上へ振り替える。",
     "en": "A pre-delivery deposit is a liability; move to sales upon delivery."
    }
   },
   {
    "id": "cf06",
    "title": {
     "ja": "試算表が一致すれば仕訳は完全に正しいと思っていませんか？",
     "en": "Does a balanced trial balance prove all entries are correct?"
    },
    "wrong": {
     "ja": "貸借が一致すれば誤りは一切ない。",
     "en": "If it balances, there are no errors."
    },
    "right": {
     "ja": "貸借一致は転記の一部を検証するのみ。相殺誤り・二重計上・勘定違いは検出できない。",
     "en": "It only checks equality; offsetting errors, duplicates, and wrong accounts go undetected."
    }
   }
  ],
  "glossary": [
   {
    "term": "複式簿記",
    "ja": "複式簿記",
    "en": "Double-entry bookkeeping",
    "descJa": "1取引を借方・貸方の両面から記録する方法。",
    "descEn": "Records each transaction on both debit and credit sides."
   },
   {
    "term": "仕訳",
    "ja": "仕訳",
    "en": "Journal entry",
    "descJa": "取引を借方・貸方の勘定と金額に分解する記録。",
    "descEn": "Splitting a transaction into debit/credit accounts and amounts."
   },
   {
    "term": "転記",
    "ja": "転記",
    "en": "Posting",
    "descJa": "仕訳を総勘定元帳の各勘定へ書き移す手続。",
    "descEn": "Transferring journal entries to ledger accounts."
   },
   {
    "term": "勘定",
    "ja": "勘定",
    "en": "Account",
    "descJa": "資産・負債等を記録する単位（T字勘定）。",
    "descEn": "A unit (T-account) for recording an item."
   },
   {
    "term": "試算表",
    "ja": "試算表",
    "en": "Trial balance",
    "descJa": "借方合計と貸方合計で転記を検証する集計表。",
    "descEn": "Aggregation checking debit = credit."
   },
   {
    "term": "精算表",
    "ja": "精算表",
    "en": "Worksheet",
    "descJa": "試算表から決算整理を経てB/S・P/Lへ導く一覧表。",
    "descEn": "Table leading from trial balance through adjustments to statements."
   },
   {
    "term": "三分法",
    "ja": "三分法",
    "en": "3-account method",
    "descJa": "仕入・売上・繰越商品で商品売買を記帳する方法。",
    "descEn": "Records merchandising via purchases, sales, inventory."
   },
   {
    "term": "売上原価",
    "ja": "売上原価",
    "en": "Cost of goods sold",
    "descJa": "期首商品＋当期仕入−期末商品。",
    "descEn": "Beginning + purchases − ending."
   },
   {
    "term": "繰越商品",
    "ja": "繰越商品",
    "en": "Merchandise inventory",
    "descJa": "期末に在庫として繰り越す商品（資産）。",
    "descEn": "Ending goods carried forward (asset)."
   },
   {
    "term": "売掛金",
    "ja": "売掛金",
    "en": "Accounts receivable",
    "descJa": "掛売上による代金請求権（資産）。",
    "descEn": "Claim from sales on account."
   },
   {
    "term": "買掛金",
    "ja": "買掛金",
    "en": "Accounts payable",
    "descJa": "掛仕入による支払義務（負債）。",
    "descEn": "Obligation from purchases on account."
   },
   {
    "term": "受取手形",
    "ja": "受取手形",
    "en": "Notes receivable",
    "descJa": "手形の受取による債権（資産）。",
    "descEn": "Claim evidenced by a received note."
   },
   {
    "term": "支払手形",
    "ja": "支払手形",
    "en": "Notes payable",
    "descJa": "手形の振出による債務（負債）。",
    "descEn": "Obligation from an issued note."
   },
   {
    "term": "貸倒引当金",
    "ja": "貸倒引当金",
    "en": "Allowance for doubtful accounts",
    "descJa": "将来の貸倒れに備える評価性引当金。",
    "descEn": "Contra-asset for expected uncollectibles."
   },
   {
    "term": "現金過不足",
    "ja": "現金過不足",
    "en": "Cash over/short",
    "descJa": "実際有高と帳簿残高の差を一時処理する勘定。",
    "descEn": "Temporary account for cash differences."
   },
   {
    "term": "当座借越",
    "ja": "当座借越",
    "en": "Bank overdraft",
    "descJa": "当座預金の貸方残高（銀行からの借入・負債）。",
    "descEn": "A credit checking balance owed to the bank."
   },
   {
    "term": "小口現金",
    "ja": "小口現金",
    "en": "Petty cash",
    "descJa": "少額支払用に前渡しする現金（定額資金前渡法）。",
    "descEn": "Imprest float for small payments."
   },
   {
    "term": "減価償却",
    "ja": "減価償却",
    "en": "Depreciation",
    "descJa": "固定資産の取得原価を耐用期間に費用配分する手続。",
    "descEn": "Allocating asset cost over its useful life."
   },
   {
    "term": "減価償却累計額",
    "ja": "減価償却累計額",
    "en": "Accumulated depreciation",
    "descJa": "間接法で計上する評価性の控除勘定。",
    "descEn": "Contra-asset accumulating depreciation (indirect method)."
   },
   {
    "term": "経過勘定",
    "ja": "経過勘定",
    "en": "Accrual/deferral accounts",
    "descJa": "前払・前受・未払・未収で期間帰属を調整する勘定。",
    "descEn": "Prepaid/unearned/accrued accounts aligning periods."
   },
   {
    "term": "租税公課",
    "ja": "租税公課",
    "en": "Taxes and dues",
    "descJa": "固定資産税・印紙税等を費用処理する勘定。",
    "descEn": "Expense for property/stamp taxes, etc."
   },
   {
    "term": "法人税等",
    "ja": "法人税等",
    "en": "Corporate taxes",
    "descJa": "法人税・住民税・事業税の総称。",
    "descEn": "Corporate, inhabitant, and enterprise taxes."
   },
   {
    "term": "消費税(税抜)",
    "ja": "消費税(税抜)",
    "en": "Consumption tax (exclusion)",
    "descJa": "仮払・仮受で処理し差額を納付する方式。",
    "descEn": "Input/output tax method; remit the net."
   },
   {
    "term": "資本金",
    "ja": "資本金",
    "en": "Capital stock",
    "descJa": "株主の払込資本（純資産）。",
    "descEn": "Paid-in capital (equity)."
   },
   {
    "term": "繰越利益剰余金",
    "ja": "繰越利益剰余金",
    "en": "Retained earnings",
    "descJa": "純利益の累積（配当・処分の原資）。",
    "descEn": "Accumulated net income (equity)."
   },
   {
    "term": "損益勘定",
    "ja": "損益勘定",
    "en": "Income summary",
    "descJa": "収益・費用を集めて純損益を算定する集合勘定。",
    "descEn": "Nominal accounts gather here to compute net income."
   },
   {
    "term": "伝票",
    "ja": "伝票",
    "en": "Voucher/slip",
    "descJa": "入金・出金・振替等で取引を記録する紙片。",
    "descEn": "Slips recording transactions (receipt/payment/transfer)."
   },
   {
    "term": "商品有高帳",
    "ja": "商品有高帳",
    "en": "Inventory ledger",
    "descJa": "受入・払出・残高を種類別に管理する補助簿。",
    "descEn": "Subsidiary book tracking receipts/issues/balance."
   }
  ]
 }
});
})();
