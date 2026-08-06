/**
 * Final Express error handler.
 * @module middlewares/error
 */
import type { ErrorRequestHandler } from 'express';
import { env } from '@/config/env.js';
import { AppError } from '@/utils/app-error.js';
import { sendError } from '@/utils/api-response.js';
import { logger } from '@/utils/logger.js';

/** Converts operational and unknown errors to the public API contract. */
export const errorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  const appError = error instanceof AppError ? error : new AppError('Internal server error');
  logger.error('request_error', { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
  sendError(response, env.NODE_ENV === 'production' ? appError.message : error instanceof Error ? error.message : String(error), appError.statusCode);
};
