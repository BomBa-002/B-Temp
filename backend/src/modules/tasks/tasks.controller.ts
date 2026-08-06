import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { tasksService } from '@/modules/tasks/tasks.service.js';

const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
});

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    completed: z.boolean().optional(),
  })
  .refine((value) => value.title !== undefined || value.completed !== undefined, {
    message: 'At least one field is required',
  });

function getTaskId(request: Request): string | undefined {
  const value = request.params.id;
  return typeof value === 'string' ? value : undefined;
}

export const tasksController = {
  list(_request: Request, response: Response) {
    response.json({ data: tasksService.list(), error: null });
  },

  get(request: Request, response: Response) {
    const id = getTaskId(request);
    if (!id) {
      response.status(400).json({ data: null, error: 'Invalid task id' });
      return;
    }
    const task = tasksService.get(id);
    if (!task) {
      response.status(404).json({ data: null, error: 'Task not found' });
      return;
    }
    response.json({ data: task, error: null });
  },

  create(request: Request, response: Response, next: NextFunction) {
    const result = createTaskSchema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({ data: null, error: result.error.flatten() });
      return;
    }

    try {
      response.status(201).json({ data: tasksService.create(result.data.title), error: null });
    } catch (error) {
      next(error);
    }
  },

  update(request: Request, response: Response, next: NextFunction) {
    const result = updateTaskSchema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({ data: null, error: result.error.flatten() });
      return;
    }

    const id = getTaskId(request);
    if (!id) {
      response.status(400).json({ data: null, error: 'Invalid task id' });
      return;
    }

    try {
      const task = tasksService.update(id, result.data);
      if (!task) {
        response.status(404).json({ data: null, error: 'Task not found' });
        return;
      }
      response.json({ data: task, error: null });
    } catch (error) {
      next(error);
    }
  },

  remove(request: Request, response: Response) {
    const id = getTaskId(request);
    if (!id) {
      response.status(400).json({ data: null, error: 'Invalid task id' });
      return;
    }
    const deleted = tasksService.remove(id);
    if (!deleted) {
      response.status(404).json({ data: null, error: 'Task not found' });
      return;
    }
    response.status(204).send();
  },
};
