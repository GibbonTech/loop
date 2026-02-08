const { hash } = require("bcryptjs");
const postgres = require("postgres");
const crypto = require("crypto");

async function main() {
  const h = await hash("admin123", 10);
  const sql = postgres(process.env.DATABASE_URL);

  // Check if admin user exists
  const existing = await sql`SELECT id FROM "user" WHERE email = 'admin@loop.fr'`;
  
  let userId;
  if (existing.length > 0) {
    userId = existing[0].id;
    console.log("Found existing admin user:", userId);
    // Update or insert account
    const acct = await sql`SELECT id FROM account WHERE user_id = ${userId} AND provider_id = 'credential'`;
    if (acct.length > 0) {
      await sql`UPDATE account SET password = ${h} WHERE user_id = ${userId} AND provider_id = 'credential'`;
      console.log("Updated existing account password.");
    } else {
      const accId = crypto.randomBytes(16).toString("hex");
      await sql`INSERT INTO account (id, account_id, provider_id, user_id, password) VALUES (${accId}, ${userId}, 'credential', ${userId}, ${h})`;
      console.log("Created account record for existing user.");
    }
  } else {
    userId = crypto.randomBytes(16).toString("hex");
    const accId = crypto.randomBytes(16).toString("hex");
    await sql`INSERT INTO "user" (id, name, email, email_verified, role) VALUES (${userId}, 'Admin Loop', 'admin@loop.fr', true, 'ADMIN')`;
    await sql`INSERT INTO account (id, account_id, provider_id, user_id, password) VALUES (${accId}, ${userId}, 'credential', ${userId}, ${h})`;
    console.log("Created new admin user and account.");
  }

  console.log("Admin password set with bcryptjs hash. Done.");
  await sql.end();
}

main().catch(e => { console.error(e); process.exit(1); });
