import https from 'https';
import fs from 'fs';

import databasesConnection from './databases';
import { app } from './app';

const start = async () => {
  await databasesConnection;
  https.createServer({
    key: fs.readFileSync(__dirname + '/../../ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/../../ssl/cert.pem'),
    passphrase: 'Analu'
  }, app).listen(3001, () => console.log('Listening on port 3001'));
};

start();