import express from 'express';
import { body } from 'express-validator';

import { NotFountError, validateRequestMiddleware, currentUserMiddleware } from '@gmahechas/common-ms';

import * as fromauthController from '../controllers/auth.controller';


const router = express.Router();

router.get('/api/users/currentuser', currentUserMiddleware, fromauthController.currentUser);

router.post('/api/users/singin', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password ')
],
  validateRequestMiddleware,
  fromauthController.singIn);

router.post('/api/users/singout', fromauthController.singOut);

router.post('/api/users/singup', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
],
  validateRequestMiddleware,
  fromauthController.singUp);

router.get('*', async (rew, res, next) => {
  throw new NotFountError();
});

export { router as authRouter };