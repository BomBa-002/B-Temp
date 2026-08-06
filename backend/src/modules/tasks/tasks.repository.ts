/**
 * Persistence operations for tasks.
 * @module modules/tasks/repository
 */
import { sqlite } from '@/db/index.js';
import { type NewTaskRecord, type TaskRecord } from '@/db/schema/tasks.js';

type TaskRow = {
  id: string;
  title: string;
  completed: number;
  created_at: number;
  updated_at: number;
};

function toTaskRecord(row: TaskRow): TaskRecord {
  return {
    id: row.id,
    title: row.title,
    completed: row.completed === 1,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

function getTask(id: string): TaskRecord | undefined {
  const row = sqlite.prepare('SELECT id, title, completed, created_at, updated_at FROM tasks WHERE id = ?').get(id) as TaskRow | undefined;
  return row ? toTaskRecord(row) : undefined;
}

/** Database gateway for task records. */
export const tasksRepository = {
  /** Returns all tasks newest first. */
  findAll(): TaskRecord[] {
    const rows = sqlite.prepare('SELECT id, title, completed, created_at, updated_at FROM tasks ORDER BY created_at DESC').all() as TaskRow[];
    return rows.map(toTaskRecord);
  },
  /** Finds one task by id. */
  findById(id: string): TaskRecord | undefined {
    return getTask(id);
  },
  /** Inserts and returns a task. */
  create(task: NewTaskRecord): TaskRecord {
    sqlite.prepare(
      'INSERT INTO tasks (id, title, completed, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
    ).run(task.id, task.title, task.completed ? 1 : 0, task.createdAt.getTime(), task.updatedAt.getTime());
    return getTask(task.id) as TaskRecord;
  },
  /** Updates and returns a task when it exists. */
  update(id: string, values: Partial<Pick<NewTaskRecord, 'title' | 'completed'>>): TaskRecord | undefined {
    const current = getTask(id);
    if (!current) return undefined;

    const title = values.title ?? current.title;
    const completed = values.completed ?? current.completed;
    const updatedAt = new Date();
    sqlite.prepare('UPDATE tasks SET title = ?, completed = ?, updated_at = ? WHERE id = ?').run(
      title,
      completed ? 1 : 0,
      updatedAt.getTime(),
      id,
    );
    return getTask(id);
  },
  /** Deletes a task and reports whether it existed. */
  delete(id: string): boolean {
    return sqlite.prepare('DELETE FROM tasks WHERE id = ?').run(id).changes > 0;
  },
};
