import express from 'express';
import 'express-async-errors';

import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { ticketsRouter } from './routes/tickets';
import { errorMiddleware, currentUserMiddleware, NotFountError } from '@gmahechas/common-ms';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(currentUserMiddleware);
app.use(ticketsRouter);
app.all('*', async (req, res) => {
  throw new NotFountError();
})
app.use(errorMiddleware);

export { app };