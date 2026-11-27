# 非公開サイトの準備（タブレットや PC のブラウザで、自分だけが開ける全部入りの版）

2026-11-27 作成。Book-Summary を含む**全部入りの版**を、ログインが要る置き場所に置くための手順。
公開サイト（GitHub Pages）には Book-Summary の中身を出さないことにしたので（[`publication-scope.md`](publication-scope.md)）、
Book-Summary を Android タブレットや PC のブラウザで読むには、こちらを使う。

## できあがりの姿

| | 公開サイト | 非公開サイト（これ） |
|---|---|---|
| 置き場所 | GitHub Pages | Cloudflare Pages ＋ Cloudflare Access |
| 中身 | 公開版（Book-Summary 抜き） | 全部入り |
| 開ける人 | 誰でも | 許可したメールアドレスの本人だけ（メールに届く確認コードでログイン） |
| 開ける端末 | どれでも | ブラウザがあれば、タブレット・PC・スマホのどれでも |
| 更新 | push すると自動 | push すると自動（`.github/workflows/deploy-private.yml`） |

Cloudflare は無料プランで足りる。上限は1ファイル 25MiB・20,000 ファイルまで（今の全部入りは最大 19.7MiB・1,363 ファイル）。
出典：[Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)、
[Cloudflare Zero Trust のプラン](https://www.cloudflare.com/plans/sase-zero-trust/)（Access は50ユーザーまで無料）。

## 本人がやること（4つ。目安は合わせて15分ほど）

### 1. Cloudflare のアカウントを作る

[Cloudflare のダッシュボード](https://dash.cloudflare.com/)でアカウントを作る（無料）。ドメインの購入や追加は要らない。

### 2. GitHub に2つの値を登録して、1回目を動かす

1. **API トークンを作る**：[API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → **Custom Token** の **Get started**
   → **Permissions** で **Account** › **Cloudflare Pages** › **Edit** を選ぶ → **Continue to summary** → **Create Token**。
   表示された文字列を控える（この画面でしか見られない）。
2. **アカウントID を控える**：ダッシュボードで **Workers & Pages** を開いたときのアドレス
   `https://dash.cloudflare.com/<ここの32文字>/…` がアカウントID。
3. **GitHub に登録する**：リポジトリの **Settings** › **Secrets and variables** › **Actions** › **New repository secret** で、次の2つを足す。
   - 名前 `CLOUDFLARE_API_TOKEN`、値は 1 のトークン
   - 名前 `CLOUDFLARE_ACCOUNT_ID`、値は 2 のアカウントID
4. **1回目を動かす**：リポジトリの **Actions** タブ → 左の一覧から
   **Deploy the full edition to the login-protected site (Cloudflare Pages)** → **Run workflow**。
   Cloudflare に `project-nova` というプロジェクトができ、「準備中」と書いたページだけが置かれる
   （まだログインの設定が無いので、**中身は置かれない**）。

出典：[Use Direct Upload with continuous integration](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)

### 3. ログインを必須にする

Cloudflare のダッシュボードで行う。入口が2種類（本番 `project-nova.pages.dev` と、配置ごとの `<8桁>.project-nova.pages.dev`）あり、両方に設定する。

1. **Workers & Pages** → `project-nova` → **Settings** → **Enable access policy**
   （初めて使うときは、チーム名とプランを選ぶ画面が出ることがある。プランは Free を選ぶ）
2. できた Access policy の **Manage** → **Access** › **Applications** でこのプロジェクトを選び、**Configure**
3. **Public hostname** の **Subdomain** から `*`（ワイルドカード）を消して **Save**
4. Pages のプロジェクトに戻り、**Settings** › **General** で、もう一度 **Enable access policy**
5. Access のアプリケーションが2つ（本番用と、配置ごとの入口用）できていることを確かめる
6. それぞれのポリシーで、**許可されているのが自分のメールアドレスだけ**であることを確かめる
   （初期設定では、Cloudflare アカウントのメンバーが許可される）

出典：[Known issues › Enable Access on your *.pages.dev domain](https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain)（2026-11-06 更新の版で確認）

### 4. もう一度動かして、開く

1. GitHub の **Actions** で、同じワークフローをもう一度 **Run workflow**。
   今度は2つの入口がログイン画面へ飛ばされることを確かめたうえで、全部入りの版が置かれる。
2. 実行結果の要約（Summary）に出るアドレス（`https://project-nova.pages.dev`。同じ名前が先に使われていると、少し違う名前になることがある）を、
   タブレットや PC のブラウザで開く。メールアドレスを入れ、届いた確認コードを入れると開く。

これ以降は、公開ブランチに push するたびに自動で更新される。

## 知っておくこと

- **進捗は公開サイトと別**。進捗はブラウザごと・アドレスごとに保存されるので、公開サイトの進捗は引き継がれない。
  移すときは、ハブを開いたときに画面左下に出る「進捗バックアップ」で書き出し、非公開サイトで読み込む。
- **Access を外さない**。外すと、次に動いたときにワークフローが気づいて本番を「準備中」のページに差し替えるが、
  それまでのあいだと、過去の配置ごとの入口（`<8桁>.project-nova.pages.dev`）は、誰でも開ける状態になる。
- **アドレスは実行ログに出る**。リポジトリが公開のあいだは、Actions のログも誰でも読める。ログインが要るので中身は見られないが、
  気になる場合はリポジトリを非公開にする。
- **リポジトリを非公開にするとき**：非公開サイトのほうは、そのまま動く。公開サイト（GitHub Pages）は、無料プランでは止まる
  （[`publication-scope.md`](publication-scope.md)）。全部を非公開サイトで足りるなら、無料プランのまま非公開にできる。

## しくみ（安全側に倒してある）

`.github/workflows/deploy-private.yml` は、置く前に毎回 `nova-app/scripts/private-site.mjs` で次を確かめる。

- 本番の入口と、直近の配置の入口が、どちらも Cloudflare Access のログイン画面（`*.cloudflareaccess.com`）へ飛ばされること
- 確かめられないとき（まだ配置が無い・設定が片方だけ・接続できない）は、全部入りの版を置かずに「準備中」のページだけを置く
- secrets が無いときは何もしない

置く直前に `nova-app/scripts/check-dist.mjs` が、1ファイル 25MiB・20,000 ファイルの上限に収まっているかも確かめる。
大きいハブ（Certification・TechHub）は、ビルドが 20MiB 以下のファイルに小分けする（`nova-app/scripts/lazy-hubs.mjs`）。

**この手順とワークフローは、公式ドキュメントに沿って作り、Cloudflare 役のにせのサーバーで動作を確かめたもの。
実際の Cloudflare のアカウントではまだ動かしていない。** 1回目・2回目の実行でつまずいたら、実行ログの文面をそのまま Claude に見せること。

## やめるとき

Cloudflare のダッシュボードで `project-nova` を削除し、GitHub の2つの secrets を消す。ワークフローは secrets が無ければ何もしない。
