#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/rick/Documents/websites/driivo"
LOOP_DIR="$ROOT/loop"
ARTIFACT_DIR="$ROOT/screens/fix-regression-2026-04-29"
NODE_DIR="/home/rick/.cache/ms-playwright-go/1.50.1"
APP_URL="${APP_URL:-http://127.0.0.1:3000}"
SITE_URL="${SITE_URL:-$APP_URL}"
RUN_ID="${RUN_ID:-$(date +%s)}"
TEST_USER_EMAIL="${TEST_USER_EMAIL:-codex.fix.user.${RUN_ID}@example.com}"
TEST_ADMIN_EMAIL="${TEST_ADMIN_EMAIL:-codex.fix.admin.${RUN_ID}@example.com}"
TEST_PASSWORD="${TEST_PASSWORD:-CodexDemo12345!}"

export PATH="$NODE_DIR:$PATH"
export RUN_ID TEST_USER_EMAIL TEST_ADMIN_EMAIL TEST_PASSWORD APP_URL SITE_URL ARTIFACT_DIR

cd "$LOOP_DIR"

./node_modules/.bin/tsx -e '
import "dotenv/config";
import { db } from "./src/lib/db";
import { user, account } from "./src/lib/db/schema";
import { hash } from "bcryptjs";
import { nanoid } from "nanoid";

(async () => {
  const password = await hash(process.env.TEST_PASSWORD, 10);
  const now = new Date();
  for (const item of [
    { email: process.env.TEST_USER_EMAIL, role: "USER", name: "Fix Regression" },
    { email: process.env.TEST_ADMIN_EMAIL, role: "ADMIN", name: "Fix Admin" },
  ]) {
    const id = nanoid();
    await db.insert(user).values({
      id,
      name: item.name,
      email: item.email,
      emailVerified: true,
      role: item.role,
      createdAt: now,
      updatedAt: now,
    }).onConflictDoNothing();
    await db.insert(account).values({
      id: nanoid(),
      accountId: id,
      providerId: "credential",
      userId: id,
      password,
      createdAt: now,
      updatedAt: now,
    }).onConflictDoNothing();
  }
  console.log(JSON.stringify({ ok: true, seededUsers: 2 }));
  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
'

cd "$ROOT"
BU_NAME="${BU_NAME:-driivo}" browser-harness -c "$(cat "$ARTIFACT_DIR/browser-harness-fix-regression.py")"

cd "$LOOP_DIR"
./node_modules/.bin/tsx -e '
import "dotenv/config";
import { db } from "./src/lib/db";
import { application, meetingBooking, user, account, session } from "./src/lib/db/schema";
import { inArray } from "drizzle-orm";

(async () => {
  const userEmails = [process.env.TEST_USER_EMAIL, process.env.TEST_ADMIN_EMAIL].filter(Boolean);
  const meetingEmails = [`codex.meeting.${process.env.RUN_ID}@example.com`];
  const users = await db.select({ id: user.id }).from(user).where(inArray(user.email, userEmails));
  const userIds = users.map((item) => item.id);
  await db.delete(meetingBooking).where(inArray(meetingBooking.email, meetingEmails));
  await db.delete(application).where(inArray(application.email, userEmails));
  if (userIds.length) {
    await db.delete(session).where(inArray(session.userId, userIds));
    await db.delete(account).where(inArray(account.userId, userIds));
    await db.delete(user).where(inArray(user.id, userIds));
  }
  console.log(JSON.stringify({ ok: true, cleanedUsers: userIds.length }));
  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
'
