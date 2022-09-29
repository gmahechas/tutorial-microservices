import { OrderCancelledListener } from '../../events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from '../../events/listeners/order-created-listener';
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
    
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
  } catch(error) {
    console.log('Nats Error:::', error);
  }
}
