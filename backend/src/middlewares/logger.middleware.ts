/**
 * HTTP request logging middleware.
 * @module middlewares/logger
 */
import type { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger.js';

/** Logs method, path, status, and duration for each request. */
export function requestLogger(request: Request, response: Response, next: NextFunction) {
  const startedAt = Date.now();
  response.on('finish', () => {
    logger.info('http_request', { method: request.method, path: request.originalUrl, status: response.statusCode, durationMs: Date.now() - startedAt });
  });
  next();
}
