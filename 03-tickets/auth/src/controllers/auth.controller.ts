import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../middlewares/errors/request-validation-error';
import { User } from '../databases/mongodb/user';
import { BadRequestError } from '../middlewares/errors/bad-request-error';

export const currentUser = (req: Request, res: Response) => {
  res.send('Hi there from controllers');
};

export const singIn = (req: Request, res: Response) => {
  res.send('Hi there from controllers');
};

export const singOut = (req: Request, res: Response) => {
  res.send('Hi there from controllers');
};

export const singUp = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, 'AnaLu' /* process.env.JWT_KEY! */ );
  // Store it on session Object
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);
};