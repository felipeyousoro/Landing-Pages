import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema";

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

const client = createClient({ url: resolveDbUrl() });

export const db = drizzle(client, { schema });
