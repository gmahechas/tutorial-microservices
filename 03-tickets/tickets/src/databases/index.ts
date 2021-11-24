import mongoseeConnection from './mongodb';
import natConnection from './nats/nats';
export default [
  mongoseeConnection(),
  natConnection()
]; 