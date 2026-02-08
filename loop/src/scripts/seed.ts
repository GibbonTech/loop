import "dotenv/config";
import { db } from "../lib/db";
import { user, account } from "../lib/db/schema";
import { hash } from "bcryptjs";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  const adminPassword = await hash("admin123", 10);
  const userId = nanoid();
  const accountId = nanoid();
  
  // Delete existing admin user if exists
  await db.delete(account).where(eq(account.providerId, "credential"));
  await db.delete(user).where(eq(user.email, "admin@loop.fr"));
  
  // Create user
  await db.insert(user).values({
    id: userId,
    name: "Admin Loop",
    email: "admin@loop.fr",
    emailVerified: true,
    role: "ADMIN",
  });

  // Create account with password (Better Auth stores password in account table)
  await db.insert(account).values({
    id: accountId,
    accountId: userId,
    providerId: "credential",
    userId: userId,
    password: adminPassword,
  });

  console.log("✅ Admin user created: admin@loop.fr / admin123");
  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
