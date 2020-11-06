import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string,
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {

  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, 'AnaLu') as UserPayload;
    req.currentUser = payload;
  } catch (err) { }

  next();
};