/**
 * Typed operational error used by controllers and middleware.
 * @module utils/app-error
 */
export class AppError extends Error {
  /** Creates an operational application error. */
  constructor(public readonly message: string, public readonly statusCode = 500, public readonly details?: unknown) {
    super(message);
    this.name = 'AppError';
  }
}
