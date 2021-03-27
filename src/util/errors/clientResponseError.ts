import { InternalError } from './internalError';

export class ClientResponseError extends InternalError {
  constructor(client: string, message: string) {
    const internalMessage = `Unexpected error returned by ${client} service`;
    super(`${internalMessage}: ${message}`);
  }
}
