export class InternalError extends Error {
  constructor(
    message: string,
    readonly code: number = 500,
    readonly description?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
