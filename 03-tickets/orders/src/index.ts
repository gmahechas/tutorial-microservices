import https from 'https';
import fs from 'fs';

import databasesConnection from './databases';
import { app } from './app';

const start = async () => {
  databasesConnection;
  https.createServer({
    key: fs.readFileSync(__dirname + '/../../ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/../../ssl/cert.pem'),
    passphrase: 'Analu'
  }, app).listen(3002, () => console.log('Listening on port 3002'));
};

start();