import { Pool, PoolClient } from "pg";
import { env } from "../helper/env.helper";

let pool: Pool;

export const initDB = async () => {
  pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    max: 10,
  });

  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("DB connection successful");
  } catch (error) {
    throw error;
  }
};

export const getPool = async (): Promise<Pool> => {
  if (!pool) {
    throw new Error("DB not initialized");
  }
  return pool;
};

export const getClient = async (): Promise<PoolClient> => {
  return (await getPool()).connect();
};
