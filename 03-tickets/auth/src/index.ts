import express from 'express';
import https from 'https';
import fs from 'fs';
import 'express-async-errors';

import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import routes from './routes';
import middlewares from './middlewares';
import databasesConnection from './databases';

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
app.use(middlewares);


const start = async () => {
  await databasesConnection;

  https.createServer({
    key: fs.readFileSync(__dirname + '/../../ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/../../ssl/cert.pem'),
    passphrase: 'Analu'
  }, app).listen(3000, () => console.log('Listening on port 3000'));
};

start();