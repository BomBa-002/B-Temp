/**
 * Helpers for the public API response contract.
 * @module utils/api-response
 */
import type { Response } from 'express';

/** Sends a successful response with optional metadata. */
export function sendSuccess<T>(response: Response, data: T, status = 200, meta?: Record<string, unknown>) {
  response.status(status).json({ success: true, data, error: null, meta: meta ?? null });
}

/** Sends a failed response with a stable error shape. */
export function sendError(response: Response, error: unknown, status = 500) {
  response.status(status).json({ success: false, data: null, error, meta: null });
}
