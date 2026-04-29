import "dotenv/config";
import { pathToFileURL } from "node:url";
import { db } from "../lib/db";
import { user, account } from "../lib/db/schema";
import { hash } from "bcryptjs";
import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";

export async function seed() {
  console.log("Seeding database...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@driivo.fr";
  const adminName = process.env.ADMIN_NAME || "Admin Driivo";
  const rawAdminPassword = process.env.ADMIN_PASSWORD;

  if (!rawAdminPassword || rawAdminPassword.length < 12) {
    throw new Error("ADMIN_PASSWORD must be set and at least 12 characters long.");
  }

  const adminPassword = await hash(rawAdminPassword, 10);
  const accountId = nanoid();
  const [existingAdmin] = await db
    .select()
    .from(user)
    .where(eq(user.email, adminEmail))
    .limit(1);

  const userId = existingAdmin?.id || nanoid();

  if (existingAdmin) {
    await db
      .update(user)
      .set({ name: adminName, emailVerified: true, role: "ADMIN" })
      .where(eq(user.id, userId));
  } else {
    await db.insert(user).values({
      id: userId,
      name: adminName,
      email: adminEmail,
      emailVerified: true,
      role: "ADMIN",
    });
  }

  await db
    .delete(account)
    .where(and(eq(account.userId, userId), eq(account.providerId, "credential")));

  // Create account with password (Better Auth stores password in account table)
  await db.insert(account).values({
    id: accountId,
    accountId: userId,
    providerId: "credential",
    userId: userId,
    password: adminPassword,
  });

  console.log(`Admin user ready: ${adminEmail}`);
  console.log("Seeding complete.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
