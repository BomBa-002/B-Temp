import { Router } from 'express';
import { tasksRouter } from '@/modules/tasks/tasks.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.json({ data: { status: 'ok' }, error: null });
});
apiRouter.use('/tasks', tasksRouter);
