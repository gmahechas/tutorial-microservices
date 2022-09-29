import { TicketCreatedListener } from '../../events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from '../../events/listeners/ticket-updated-listener';
import { natsWrapper } from './nats-wrapper';

export default async () => {

  try {
    await natsWrapper.connect('ticketing', 'abc2', 'http://10.1.0.229:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS connections closed!!!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
  } catch(error) {
    console.log('Nats Error:::', error);
  }
}
