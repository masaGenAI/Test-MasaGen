/*
 * 押せる見た目の要素をキーボードでも押せるようにする（アプリ全体）
 * --------------------------------------------------------------------------
 * ProjectNova.jsx には、onClick を付けた div・span・SVG の g が多数ある（ハブ合計で150か所超）。
 * これらは Tab で移動できず、Enter でも押せないため、キーボードだけでは開けない画面があった
 * （ポータルのハブ一覧も同様）。1か所ずつ button に書き換える代わりに、ここで共通に補う。
 *
 * - 対象：style に cursor: pointer を持つ（または .gh-btn の）要素のうち、
 *   button・a・入力欄ではなく、role / tabindex をまだ持たず、button・a の中にも無いもの
 *   （カードの中のチェック欄のように入れ子になる場合は、両方に Tab で移れる）
 * - 補うもの：tabindex="0"、role="button"、Enter/Space で click、フォーカス枠
 * - iframe で開くハブ（Book-Summary など）は別文書なので対象外
 */

const MARK = "data-nova-kbd";
const SEL = '[style*="cursor: pointer"],[style*="cursor:pointer"],.gh-btn';
const SKIP_TAG = new Set(["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA", "SUMMARY", "LABEL", "OPTION"]);

function enhance(root) {
  let list;
  try { list = root.querySelectorAll(SEL); } catch (e) { return; }
  for (const el of list) {
    if (el.hasAttribute(MARK) || SKIP_TAG.has(el.tagName)) continue;
    if (el.hasAttribute("role") || el.hasAttribute("tabindex")) continue;
    if (el.parentElement && el.parentElement.closest("button,a[href],label")) continue;
    el.setAttribute(MARK, "");
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
  }
}

export function installKeyboardAccess() {
  if (typeof document === "undefined" || window.__novaKbd) return;
  window.__novaKbd = true;
  const css = document.createElement("style");
  css.textContent = `[${MARK}]:focus{outline:none}[${MARK}]:focus-visible{outline:2px solid #5B8CFF;outline-offset:2px;border-radius:4px}`;
  document.head.appendChild(css);
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const t = e.target;
    if (!t || !t.hasAttribute || !t.hasAttribute(MARK)) return;
    e.preventDefault();
    t.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  });
  let queued = false;
  const run = () => { queued = false; enhance(document.body); };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
  const start = () => {
    run();
    new MutationObserver(queue).observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
}
