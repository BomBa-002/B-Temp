import type { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  process.stderr.write(`${error instanceof Error ? error.stack ?? error.message : String(error)}\n`);
  response.status(500).json({ data: null, error: 'Internal server error' });
};
