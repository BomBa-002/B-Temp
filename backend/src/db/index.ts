/**
 * SQLite connection and schema bootstrap.
 * @module db
 */
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { env } from '@/config/env.js';

/** Resolves a file URL or relative database path. */
export function resolveDatabasePath(databaseUrl: string): string {
  const databasePath = databaseUrl.replace(/^file:/, '');
  return path.isAbsolute(databasePath) ? databasePath : path.resolve(process.cwd(), databasePath);
}

const databasePath = resolveDatabasePath(env.DATABASE_URL);
mkdirSync(path.dirname(databasePath), { recursive: true });

/** Native SQLite handle used by diagnostics and repositories. */
export const sqlite = new DatabaseSync(databasePath);
sqlite.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )
`);
