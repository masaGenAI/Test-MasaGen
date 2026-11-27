// ログインが要る置き場所（Cloudflare Pages ＋ Cloudflare Access）に全部入りの版を置く前の確認。
// 「ログインなしでは開けない」ことを確かめられたときだけ、本物を置いてよいと答える（確かめられなければ置かない）。
//
// やること：
//   1. Pages のプロジェクトがあるか調べ、無ければ作る（production branch は main）。
//   2. そのプロジェクトの2つの入口が、どちらも Cloudflare Access のログイン画面へ飛ばされることを確かめる：
//        - 本番の入口         https://<プロジェクト>.pages.dev/
//        - 配置ごとの入口     https://<8桁>.<プロジェクト>.pages.dev/（直近の配置のもの）
//      まだ1回も配置していないときは、確かめようがないので「未確認」とする。
//   3. 結果を GitHub Actions の出力（protected=true/false・host・reason）と、実行結果の要約に書く。
//
// 使い方（.github/workflows/deploy-private.yml から呼ぶ）：
//   CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… PAGES_PROJECT=project-nova node scripts/private-site.mjs
// 終了コード：0＝確認できた（protected は true か false）／1＝Cloudflare に問い合わせられなかった（トークンの誤りなど）
//
// API の出典（2026-11 に確認）：
//   プロジェクトの取得・作成  https://developers.cloudflare.com/api/resources/pages/subresources/projects/
//   Access の設定手順          https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain
import fs from "node:fs";

const TOKEN = process.env.CLOUDFLARE_API_TOKEN || "";
const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || "";
const PROJECT = process.env.PAGES_PROJECT || "project-nova";
// 動作確認用（scripts の試験で、にせのサーバーに向ける）
const API = process.env.NOVA_CF_API_BASE || "https://api.cloudflare.com/client/v4";
const SCHEME = process.env.NOVA_PROBE_SCHEME || "https";

const out = (k, v) => { if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`); };
const summary = (md) => { if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n"); };
const fail = (msg) => { console.error("private-site: " + msg); process.exit(1); };

async function api(method, path, body) {
  let res;
  try {
    res = await fetch(`${API}/accounts/${ACCOUNT}${path}`, {
      method,
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    fail(`Cloudflare の API に接続できません（${e.message}）`);
  }
  let json = null;
  try { json = await res.json(); } catch (e) { json = null; }
  return { status: res.status, ok: res.ok && json && json.success !== false, json };
}

// その入口が、ログインなしでは Cloudflare Access のログイン画面へ飛ばされるか
async function isLoginRequired(url) {
  try {
    const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "nova-private-site-check" } });
    const loc = res.headers.get("location") || "";
    let host = "";
    try { host = new URL(loc, url).hostname; } catch (e) { host = ""; }
    const yes = [301, 302, 303, 307, 308].includes(res.status) && host.endsWith(".cloudflareaccess.com");
    return { yes, detail: yes ? "ログイン画面へ飛ばされる" : `HTTP ${res.status}${loc ? "（転送先 " + host + "）" : ""}` };
  } catch (e) {
    return { yes: false, detail: "接続できない（" + (e.cause && e.cause.code ? e.cause.code : e.message) + "）" };
  }
}

async function main() {
  if (!TOKEN || !ACCOUNT) fail("CLOUDFLARE_API_TOKEN と CLOUDFLARE_ACCOUNT_ID が要ります");
  if (!/^[a-z0-9][a-z0-9-]{0,57}$/.test(PROJECT)) fail(`プロジェクト名「${PROJECT}」が正しくありません（英小文字・数字・ハイフン、58文字まで）`);

  let r = await api("GET", `/pages/projects/${PROJECT}`);
  let created = false;
  if (r.status === 404) {
    r = await api("POST", "/pages/projects", { name: PROJECT, production_branch: "main" });
    if (!r.ok) fail(`Pages のプロジェクト「${PROJECT}」を作れませんでした（HTTP ${r.status}）: ${JSON.stringify(r.json && r.json.errors)}`);
    created = true;
    console.log(`Pages のプロジェクト「${PROJECT}」を作りました`);
  } else if (!r.ok) {
    const hint = r.status === 401 || r.status === 403 ? " トークンの権限（Account › Cloudflare Pages › Edit）とアカウントIDを確かめてください。" : "";
    fail(`Pages のプロジェクトを調べられませんでした（HTTP ${r.status}）。${hint} ${JSON.stringify(r.json && r.json.errors)}`);
  }
  const project = r.json.result || {};
  const host = project.subdomain || `${PROJECT}.pages.dev`;
  const latest = project.canonical_deployment && project.canonical_deployment.url ? project.canonical_deployment.url : "";
  out("host", host);

  let ok = false, reason = "";
  const lines = [];
  if (created || !latest) {
    reason = "まだ1回も配置していないので、ログインの設定を確かめられません";
  } else {
    const prod = await isLoginRequired(`${SCHEME}://${host}/`);
    const each = await isLoginRequired(latest.replace(/\/?$/, "/"));
    lines.push(`- 本番の入口 \`${host}\`：${prod.detail}`, `- 配置ごとの入口 \`${new URL(latest).host}\`：${each.detail}`);
    ok = prod.yes && each.yes;
    if (!ok) reason = !prod.yes && !each.yes ? "どちらの入口も、ログインなしで開ける状態です" : !prod.yes ? "本番の入口が、ログインなしで開ける状態です" : "配置ごとの入口が、ログインなしで開ける状態です";
  }
  out("protected", ok ? "true" : "false");
  out("reason", reason);
  lines.forEach((l) => console.log(l));
  if (ok) {
    console.log(`OK: ${host} はログインが要る状態です。全部入りの版を置きます`);
    summary(`### 非公開サイト\n\n\`https://${host}\` はログインが要る状態です。全部入りの版を置きます。\n\n${lines.join("\n")}`);
  } else {
    console.log(`未確認: ${reason}。全部入りの版は置かず、「準備中」のページだけを置きます`);
    summary(`### 非公開サイト：ログインの設定を確かめられませんでした\n\n${reason}。**全部入りの版は置いていません**（「準備中」のページだけを置きます）。\n\n${lines.join("\n")}\n\n` +
      `Cloudflare のダッシュボードで \`${PROJECT}\` に Access を設定してから、このワークフローをもう一度実行してください。手順は \`docs/private-site-setup.md\` の「3. ログインを必須にする」。`);
  }
}

await main();
