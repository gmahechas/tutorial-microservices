import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongosee from 'mongoose';

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

const start = async () => {
  try {
    await mongosee.connect("mongodb+srv://tavogus:60myC0ZzX98aMUCb@microservices.lbqk1.mongodb.net/microservices?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (error) {
    console.log('Error:::', error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000')
  });
};

start();