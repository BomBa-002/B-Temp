/**
 * Persistence operations for tasks.
 * @module modules/tasks/repository
 */
import { desc, eq } from 'drizzle-orm';
import { db } from '@/db/index.js';
import { tasks, type NewTaskRecord, type TaskRecord } from '@/db/schema/tasks.js';

/** Database gateway for task records. */
export const tasksRepository = {
  /** Returns all tasks newest first. */
  findAll(): TaskRecord[] { return db.select().from(tasks).orderBy(desc(tasks.createdAt)).all(); },
  /** Finds one task by id. */
  findById(id: string): TaskRecord | undefined { return db.select().from(tasks).where(eq(tasks.id, id)).get(); },
  /** Inserts and returns a task. */
  create(task: NewTaskRecord): TaskRecord { return db.insert(tasks).values(task).returning().get(); },
  /** Updates and returns a task when it exists. */
  update(id: string, values: Partial<Pick<NewTaskRecord, 'title' | 'completed'>>): TaskRecord | undefined {
    return db.update(tasks).set({ ...values, updatedAt: new Date() }).where(eq(tasks.id, id)).returning().get();
  },
  /** Deletes a task and reports whether it existed. */
  delete(id: string): boolean { return db.delete(tasks).where(eq(tasks.id, id)).run().changes > 0; },
};
