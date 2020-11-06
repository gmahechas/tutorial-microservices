import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { User } from '../databases/mongodb/user';
import { BadRequestError } from '../middlewares/errors/bad-request-error';

import { Password } from '../utils/password';

export const currentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const singIn = async (req: Request, res: Response) => {

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, 'AnaLu' /* process.env.JWT_KEY! */);
  // Store it on session Object
  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);

};

export const singOut = (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};

export const singUp = async (req: Request, res: Response) => {

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
  }, 'AnaLu' /* process.env.JWT_KEY! */);
  // Store it on session Object
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);
};