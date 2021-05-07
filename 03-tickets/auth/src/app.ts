import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import 'express-async-errors';

import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import routes from './routes';
import { errorMiddleware, NotFountError } from '@gmahechas/common-ms';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)
app.use(routes);

app.all('*', async (request: Request, response: Response) => {
  throw new NotFountError();
})
app.use(errorMiddleware);

export { app };