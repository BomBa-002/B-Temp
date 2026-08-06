/**
 * Backend process entrypoint.
 * @module server
 */
import { createApp } from '@/app.js';
import { env } from '@/config/env.js';
import { logger } from '@/utils/logger.js';

const app = createApp();
app.listen(env.BACKEND_PORT, () => logger.info('server_started', { port: env.BACKEND_PORT }));
