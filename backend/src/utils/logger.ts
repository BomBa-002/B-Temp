/**
 * Central application logger with console and file transports.
 * @module utils/logger
 */
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import winston from 'winston';

const logDirectory = path.resolve(process.cwd(), 'logs');
mkdirSync(logDirectory, { recursive: true });

/** Shared Winston logger instance. */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDirectory, 'application.log') }),
  ],
});
