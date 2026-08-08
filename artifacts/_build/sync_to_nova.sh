#!/usr/bin/env bash
# Anything Memo の最新データ (data.json) を、GitHub Pages の配信元である
# Nova（デフォルトブランチ claude/friendly-allen-xZn87 の
# nova-app/public/anything-memo.html）へ反映し push する。
# push により deploy-pages.yml が起動し、Pages（Project-Nova）が自動更新される。
#
# 使い方: bash artifacts/_build/sync_to_nova.sh
# 前提: origin に push 権限があること。BASE データ行のみ差し替え、Nova 側の
#       UI・window.amtAgent 連携などはそのまま保持する。
set -euo pipefail

DEFAULT_BRANCH="claude/friendly-allen-xZn87"
NOVA_PATH="nova-app/public/anything-memo.html"
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
cd "$ROOT"

TMP="$(mktemp -d)"
BR="sync-nova-tmp-$$"
cleanup() { git worktree remove --force "$TMP/wt" 2>/dev/null || true; git branch -D "$BR" 2>/dev/null || true; rm -rf "$TMP"; }
trap cleanup EXIT

echo "→ fetch $DEFAULT_BRANCH"
git fetch origin "$DEFAULT_BRANCH" >/dev/null 2>&1
git show "origin/$DEFAULT_BRANCH:$NOVA_PATH" > "$TMP/amh.html"

echo "→ splice BASE from data.json"
python3 "$HERE/sync_to_nova.py" "$TMP/amh.html" "$TMP/amh-new.html"

git worktree add -b "$BR" "$TMP/wt" "origin/$DEFAULT_BRANCH" >/dev/null 2>&1
cp "$TMP/amh-new.html" "$TMP/wt/$NOVA_PATH"
git -C "$TMP/wt" add "$NOVA_PATH"
if git -C "$TMP/wt" diff --cached --quiet; then
  echo "✓ 変更なし（既に最新）。何もしません。"
  exit 0
fi
git -C "$TMP/wt" -c user.name="Claude" -c user.email="noreply@anthropic.com" \
  commit -q -m "Sync Anything Memo data to Nova (Pages)"
echo "→ push to $DEFAULT_BRANCH"
git -C "$TMP/wt" push origin "$BR:$DEFAULT_BRANCH"
echo "✓ 反映しました。Pages（Project-Nova）が数分で再ビルドされます。"
