/**
 * Drizzle schema and types for the task resource.
 * @module db/schema/tasks
 */
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** Persistent task table. */
export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
});

/** Task row returned from the database. */
export type TaskRecord = typeof tasks.$inferSelect;
/** Task insert shape accepted by the repository. */
export type NewTaskRecord = typeof tasks.$inferInsert;
