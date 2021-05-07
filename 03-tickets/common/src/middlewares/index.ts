import { currentUserMiddleware } from './current-user.middleware';
import { errorMiddleware } from './error.middleware';
import { requireAuthMiddleware } from './require-auth.middleware'
import { validateRequestMiddleware } from './validate-request.middleware';

export default [
  currentUserMiddleware,
  errorMiddleware,
  requireAuthMiddleware,
  validateRequestMiddleware
];