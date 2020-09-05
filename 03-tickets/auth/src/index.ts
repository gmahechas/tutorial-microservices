import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { singinRouter } from './routes/singin';
import { singoutRouter } from './routes/singout';
import { singupRouter } from './routes/singup';

import { errorHanldler } from './middlewares/error-handler';
import { NotFountError } from './errors/not-found.error';

const app = express();
app.use(json());

// Routes
app.use(currentUserRouter);
app.use(singinRouter);
app.use(singoutRouter);
app.use(singupRouter);

app.get('*', async (rew, res, next) => {
  throw new NotFountError();
});

// Middlewares
app.use(errorHanldler);

app.listen(3000, () => {
  console.log('Listening on port 3000')
});