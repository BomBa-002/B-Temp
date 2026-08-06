import cors from 'cors';
import express from 'express';
import { errorMiddleware } from '@/middlewares/error.middleware.js';
import { apiRouter } from '@/routes/index.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());
  app.use('/api/v1', apiRouter);
  app.use(errorMiddleware);

  return app;
}
