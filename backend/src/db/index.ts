import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { env } from '@/config/env.js';
import * as schema from '@/db/schema/tasks.js';

function resolveDatabasePath(databaseUrl: string): string {
  const databasePath = databaseUrl.replace(/^file:/, '');
  return path.isAbsolute(databasePath) ? databasePath : path.resolve(process.cwd(), databasePath);
}

const databasePath = resolveDatabasePath(env.DATABASE_URL);
mkdirSync(path.dirname(databasePath), { recursive: true });

const sqlite = new Database(databasePath);
sqlite.pragma('journal_mode = WAL');
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )
`);

export const db = drizzle(sqlite, { schema });
