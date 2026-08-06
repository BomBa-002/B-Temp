/**
 * Business operations for the task resource.
 * @module modules/tasks/service
 */
import { randomUUID } from 'node:crypto';
import { tasksRepository } from '@/modules/tasks/tasks.repository.js';

/** Task service facade. */
export const tasksService = {
  /** Lists all tasks. */
  list() { return tasksRepository.findAll(); },
  /** Gets one task. */
  get(id: string) { return tasksRepository.findById(id); },
  /** Creates a new active task. */
  create(title: string) {
    const now = new Date();
    return tasksRepository.create({ id: randomUUID(), title, completed: false, createdAt: now, updatedAt: now });
  },
  /** Applies a partial task update. */
  update(id: string, values: { title?: string; completed?: boolean }) { return tasksRepository.update(id, values); },
  /** Removes a task. */
  remove(id: string) { return tasksRepository.delete(id); },
};
