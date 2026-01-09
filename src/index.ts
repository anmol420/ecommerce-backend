import app from "./app";
import { initDB } from "./db/db";
import { env } from "./helper/env.helper";

initDB()
  .then(() => {
    Bun.serve({
      fetch: app.fetch,
      idleTimeout: 30,
      port: env.PORT,
    });
    console.log(`Server Started On Port - ${env.PORT}`);
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
