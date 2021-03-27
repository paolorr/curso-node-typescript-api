import { InternalError } from './internalError';

export class ClientRequestError extends InternalError {
  constructor(client: string, message: string) {
    const internalMessage = `Unexpected error when trying to communicate to ${client}`;
    super(`${internalMessage}: ${message}`);
  }
}
