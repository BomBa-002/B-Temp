/**
 * Task resource routes.
 * @module modules/tasks/routes
 */
import { Router } from 'express';
import { tasksController } from '@/modules/tasks/tasks.controller.js';

/** Router for task CRUD operations. */
export const tasksRouter = Router();
tasksRouter.get('/', tasksController.list);
tasksRouter.get('/:id', tasksController.get);
tasksRouter.post('/', tasksController.create);
tasksRouter.patch('/:id', tasksController.update);
tasksRouter.delete('/:id', tasksController.remove);
