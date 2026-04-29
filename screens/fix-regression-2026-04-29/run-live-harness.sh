#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/rick/Documents/websites/driivo"
ARTIFACT_DIR="${ARTIFACT_DIR:-$ROOT/screens/live-regression-$(date +%Y-%m-%d-%H%M%S)}"
APP_URL="${APP_URL:-https://app.driivo.fr}"
SITE_URL="${SITE_URL:-https://driivo.fr}"
RUN_ID="${RUN_ID:-$(date +%s)}"
TEST_USER_EMAIL="${TEST_USER_EMAIL:-codex.live.${RUN_ID}@example.com}"
TEST_ADMIN_EMAIL="${TEST_ADMIN_EMAIL:-admin@loop.fr}"
TEST_PASSWORD="${TEST_PASSWORD:-CodexDemo12345!}"

if [[ -z "${TEST_ADMIN_PASSWORD:-}" ]]; then
  echo "TEST_ADMIN_PASSWORD is required for live admin checks" >&2
  exit 1
fi

mkdir -p "$ARTIFACT_DIR"

export RUN_ID TEST_USER_EMAIL TEST_ADMIN_EMAIL APP_URL SITE_URL ARTIFACT_DIR
export TEST_PASSWORD="$TEST_PASSWORD"
export TEST_ADMIN_PASSWORD="$TEST_ADMIN_PASSWORD"
export PUBLIC_SIGNUP_BEFORE_APPLICATION=true
export STRICT_ACCOUNT_CREATE=false

cd "$ROOT"
BU_NAME="${BU_NAME:-driivo}" browser-harness -c "$(cat "$ROOT/screens/fix-regression-2026-04-29/browser-harness-fix-regression.py")"
