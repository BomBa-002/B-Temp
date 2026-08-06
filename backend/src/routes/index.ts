/**
 * Versioned API route composition.
 * @module routes/index
 */
import { Router } from 'express';
import { tasksRouter } from '@/modules/tasks/tasks.routes.js';
import { testRouter } from '@/routes/test.routes.js';
import { sendSuccess } from '@/utils/api-response.js';

/** Root API router. */
export const apiRouter = Router();

apiRouter.get('/health', (_request, response) => sendSuccess(response, { status: 'ok' }));
apiRouter.use('/tasks', tasksRouter);
apiRouter.use('/test', testRouter);
