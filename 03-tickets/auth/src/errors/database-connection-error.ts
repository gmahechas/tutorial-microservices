import { CustomError } from './custom-error';

export class DatabaseValidationError extends CustomError {
  statusCode = 500;
  reason = 'Error connectiong to database';
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.reason }
    ];
  };
}