const { hash } = require("bcryptjs");
const postgres = require("postgres");

async function main() {
  const h = await hash("admin123", 10);
  const sql = postgres(process.env.DATABASE_URL);
  
  // Update existing admin password hash (DB uses snake_case columns)
  const result = await sql`
    UPDATE account SET password = ${h}
    WHERE provider_id = 'credential'
    AND user_id IN (SELECT id FROM "user" WHERE email = 'admin@loop.fr')
  `;
  
  console.log("Admin password reset with bcryptjs hash. Rows:", result.count);
  await sql.end();
}

main().catch(e => { console.error(e); process.exit(1); });
