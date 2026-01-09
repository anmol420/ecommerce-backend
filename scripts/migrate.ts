import * as fs from "node:fs";
import path = require("node:path");
import { getPool, initDB } from "../src/db/db";

const MIG_DIR = path.join(process.cwd(), "migrations");

const parseMigration = async (
  sql: string,
): Promise<{ up: string; down: string }> => {
  const up = sql.split("-- migrate:up")[1]?.split("-- migrate:down")[0];
  const down = sql.split("-- migrate:down")[1];
  if (!up || !down) {
    throw new Error("Migration must contain -- migrate:up and -- migrate:down");
  }
  return {
    up: up.trim(),
    down: up.trim(),
  };
};

const migrateUp = async () => {
  await initDB();
  const pool = await getPool();
  await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        applied_at TIMESTAMP DEFAULT NOW()
      );
    `);
  const result = await pool.query(`
    SELECT filename FROM schema_migrations ORDER BY id;
  `);
  const applied = new Set(result.rows.map((r) => r.filename));
  const files = fs.readdirSync(MIG_DIR).sort();
  for (const file in files) {
    if (applied.has(file)) continue;
    const sql = fs.readFileSync(path.join(MIG_DIR, file), "utf-8");
    const { up } = await parseMigration(sql);

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(up);
      await client.query(`INSERT INTO schema_migrations (filename) VALUES $1`, [
        file,
      ]);
      await client.query("COMMIT");
      console.log(`Migrate UP: ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
};

const migrateDown = async () => {
  await initDB();
  const pool = await getPool();
  const result = await pool.query(
    `SELECT filename FROM schema_migrations ORDER BY id DESC LIMIT 1`,
  );
  if (result.rows.length === 0) {
    console.log("No migrations to rollback!");
    return;
  }
  const filename = result.rows[0].filename;
  const sql = fs.readFileSync(path.join(MIG_DIR, filename), "utf-8");
  const { down } = await parseMigration(sql);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(down);
    await client.query("DELETE FROM schema_migrations WHERE filename = $1", [
      filename,
    ]);
    await client.query("COMMIT");
    console.log(`Rolled back: ${filename}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const migration = process.argv[2];

if (migration === "up") {
  migrateUp()
} else if (migration === "down") {
  migrateDown()
} else {
  console.log("Usage: bun run migrate up | down");
}