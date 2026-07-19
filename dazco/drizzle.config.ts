import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

function resolveDbUrl() {
  const url = process.env.DATABASE_URL ?? "file:./data/dazco.db";
  if (!url.startsWith("file:")) {
    return url;
  }

  const filePath = url.slice("file:".length);
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  return `file:${absolutePath}`;
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: resolveDbUrl(),
  },
});
