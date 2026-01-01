import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env/server";
import * as schema from "~/lib/db/schema";

const sql = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 3,
  prepare: false,
  keep_alive: 30,
});

export const db = drizzle(sql, { schema, casing: "snake_case" });
