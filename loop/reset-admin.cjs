const { hash } = require("bcryptjs");
const postgres = require("postgres");
const crypto = require("crypto");

async function main() {
  const h = await hash("admin123", 10);
  const sql = postgres(process.env.DATABASE_URL);

  const now = new Date().toISOString();

  // Check if admin user exists
  const existing = await sql`SELECT id FROM "user" WHERE email = 'admin@loop.fr'`;
  
  let userId;
  if (existing.length > 0) {
    userId = existing[0].id;
    console.log("Found existing admin user:", userId);
    // Update or insert account
    const acct = await sql`SELECT id FROM account WHERE user_id = ${userId} AND provider_id = 'credential'`;
    if (acct.length > 0) {
      await sql`UPDATE account SET password = ${h}, updated_at = ${now} WHERE user_id = ${userId} AND provider_id = 'credential'`;
      console.log("Updated existing account password.");
    } else {
      const accId = crypto.randomBytes(16).toString("hex");
      await sql`INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at) VALUES (${accId}, ${userId}, 'credential', ${userId}, ${h}, ${now}, ${now})`;
      console.log("Created account record for existing user.");
    }
  } else {
    userId = crypto.randomBytes(16).toString("hex");
    const accId = crypto.randomBytes(16).toString("hex");
    await sql`INSERT INTO "user" (id, name, email, email_verified, role, created_at, updated_at) VALUES (${userId}, 'Admin Loop', 'admin@loop.fr', true, 'ADMIN', ${now}, ${now})`;
    await sql`INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at) VALUES (${accId}, ${userId}, 'credential', ${userId}, ${h}, ${now}, ${now})`;
    console.log("Created new admin user and account.");
  }

  console.log("Admin password set with bcryptjs hash. Done.");
  await sql.end();
}

main().catch(e => { console.error(e); process.exit(1); });
