import { randomUUID } from 'node:crypto';
import { tasksRepository } from '@/modules/tasks/tasks.repository.js';

export const tasksService = {
  list() {
    return tasksRepository.findAll();
  },

  get(id: string) {
    return tasksRepository.findById(id);
  },

  create(title: string) {
    const now = new Date();
    return tasksRepository.create({
      id: randomUUID(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    });
  },

  update(id: string, values: { title?: string; completed?: boolean }) {
    return tasksRepository.update(id, values);
  },

  remove(id: string) {
    return tasksRepository.delete(id);
  },
};
