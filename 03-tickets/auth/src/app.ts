import express from 'express';
import https from 'https';
import fs from 'fs';
import 'express-async-errors';

import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import routes from './routes';
import middlewares from './middlewares';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)
app.use(routes);
app.use(middlewares);

export { app };