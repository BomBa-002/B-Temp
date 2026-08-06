/**
 * HTTP controller for task CRUD operations.
 * @module modules/tasks/controller
 */
import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { tasksService } from '@/modules/tasks/tasks.service.js';
import { sendError, sendSuccess } from '@/utils/api-response.js';

const createTaskSchema = z.object({ title: z.string().trim().min(1).max(200) });
const updateTaskSchema = z.object({ title: z.string().trim().min(1).max(200).optional(), completed: z.boolean().optional() }).refine((value) => value.title !== undefined || value.completed !== undefined, { message: 'At least one field is required' });

/** Reads a route id without accepting arrays. */
function getTaskId(request: Request): string | undefined {
  const value = request.params.id;
  return typeof value === 'string' ? value : undefined;
}

/** Controller methods for tasks. */
export const tasksController = {
  /** Lists tasks. */
  list(_request: Request, response: Response) { sendSuccess(response, tasksService.list()); },
  /** Returns one task or 404. */
  get(request: Request, response: Response) {
    const id = getTaskId(request);
    if (!id) return sendError(response, 'Invalid task id', 400);
    const task = tasksService.get(id);
    return task ? sendSuccess(response, task) : sendError(response, 'Task not found', 404);
  },
  /** Validates and creates a task. */
  create(request: Request, response: Response, next: NextFunction) {
    const result = createTaskSchema.safeParse(request.body);
    if (!result.success) return sendError(response, result.error.flatten(), 400);
    try { return sendSuccess(response, tasksService.create(result.data.title), 201); } catch (error) { return next(error); }
  },
  /** Validates and updates a task. */
  update(request: Request, response: Response, next: NextFunction) {
    const result = updateTaskSchema.safeParse(request.body);
    if (!result.success) return sendError(response, result.error.flatten(), 400);
    const id = getTaskId(request);
    if (!id) return sendError(response, 'Invalid task id', 400);
    try {
      const task = tasksService.update(id, result.data);
      return task ? sendSuccess(response, task) : sendError(response, 'Task not found', 404);
    } catch (error) { return next(error); }
  },
  /** Deletes a task. */
  remove(request: Request, response: Response) {
    const id = getTaskId(request);
    if (!id) return sendError(response, 'Invalid task id', 400);
    if (!tasksService.remove(id)) return sendError(response, 'Task not found', 404);
    response.status(204).send();
  },
};
