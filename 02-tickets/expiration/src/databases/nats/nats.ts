import { natsWrapper } from './nats-wrapper';

export default async () => {
  try {
    await natsWrapper.connect('ticketing', 'abc', 'http://10.1.0.229:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS connections closed!!!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    
  } catch(error) {
    console.log('Nats Error:::', error);
  }
}
