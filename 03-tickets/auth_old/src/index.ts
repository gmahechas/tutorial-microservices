import express from 'express';
import https from 'https';
import fs from 'fs';

import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import mongosee from 'mongoose';

import * as fromRoutes from './routes';

import { errorHanldler } from './middlewares/error-handler';
import { NotFountError } from './errors/not-found.error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

// Routes
app.use(fromRoutes.currentUserRouter);
app.use(fromRoutes.singinRouter);
app.use(fromRoutes.singoutRouter);
app.use(fromRoutes.singupRouter);

app.get('*', async (rew, res, next) => {
  throw new NotFountError();
});

// Middlewares
app.use(errorHanldler);

const start = async () => {
  try {
    await mongosee.connect("mongodb://10.1.0.229:27017/microservices?authSource=admin&w=majority&readPreference=primary&retryWrites=true&ssl=false", {
      user: 'root',
      pass: 'root',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (error) {
    console.log('Error:::', error);
  }

  https.createServer({
    key: fs.readFileSync(__dirname + '/../../ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/../../ssl/cert.pem'),
    passphrase: 'Analu'
  }, app)
    .listen(3000, () => {
      console.log('Listening on port 3000')
    });
};

start();