import { CustomError } from './custom-error';

export class NotFountError extends CustomError {
  statusCode = 404;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotFountError.prototype);
  }

  serializeErrors() {
    return [
      { message: 'Not Found' }
    ];
  };
}