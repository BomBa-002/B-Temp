/**
 * Express application composition root.
 * @module app
 */
import cors from 'cors';
import express from 'express';
import { env } from '@/config/env.js';
import { errorMiddleware } from '@/middlewares/error.middleware.js';
import { requestLogger } from '@/middlewares/logger.middleware.js';
import { apiRouter } from '@/routes/index.js';

/** Creates a configured Express application. */
export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN }));
  app.use(express.json({ limit: '100kb' }));
  app.use(requestLogger);
  app.use('/api/v1', apiRouter);
  app.use(errorMiddleware);
  return app;
}
