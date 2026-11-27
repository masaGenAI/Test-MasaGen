// @@nova-part 84-portal-shell.jsx
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
