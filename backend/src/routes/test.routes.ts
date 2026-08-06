/**
 * Diagnostic endpoints for local development and deployment checks.
 * @module routes/test
 */
import { Router } from 'express';
import { sqlite } from '@/db/index.js';
import { sendSuccess } from '@/utils/api-response.js';

/** Creates diagnostic routes. */
export const testRouter = Router();

testRouter.get('/', (_request, response) => sendSuccess(response, { message: 'Test endpoint is reachable' }));
testRouter.get('/db', (_request, response) => {
  const result = sqlite.prepare('SELECT 1 AS connected').get() as { connected: number };
  sendSuccess(response, { connected: result.connected === 1 });
});
