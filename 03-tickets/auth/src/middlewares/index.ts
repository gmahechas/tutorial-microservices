import { errorMiddleware } from './error.middleware';
import { validateRequestMiddleware } from './validate-request.middleware';
import { currentUserMiddleware } from './current-user.middleware';

export default [
  errorMiddleware,
  validateRequestMiddleware,
  currentUserMiddleware
];