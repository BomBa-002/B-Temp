import { desc, eq } from 'drizzle-orm';
import { db } from '@/db/index.js';
import { tasks, type NewTaskRecord, type TaskRecord } from '@/db/schema/tasks.js';

export const tasksRepository = {
  findAll(): TaskRecord[] {
    return db.select().from(tasks).orderBy(desc(tasks.createdAt)).all();
  },

  findById(id: string): TaskRecord | undefined {
    return db.select().from(tasks).where(eq(tasks.id, id)).get();
  },

  create(task: NewTaskRecord): TaskRecord {
    return db.insert(tasks).values(task).returning().get();
  },

  update(id: string, values: Partial<Pick<NewTaskRecord, 'title' | 'completed'>>): TaskRecord | undefined {
    return db
      .update(tasks)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning()
      .get();
  },

  delete(id: string): boolean {
    return db.delete(tasks).where(eq(tasks.id, id)).run().changes > 0;
  },
};
