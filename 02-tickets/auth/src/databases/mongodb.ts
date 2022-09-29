import mongosee from 'mongoose';

export default async () => {

/*   if(!process.env.JWT_KEY) {
    throw new Error('JWT_key must be defined');
  } */

  try {
    await mongosee.connect('mongodb://10.1.0.229:27017/microservices?authSource=admin&w=majority&readPreference=primary&retryWrites=true&ssl=false', {
      user: 'root',
      pass: 'root',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      
    });
  } catch (error) {
    console.log('Error:::', error);
  }
}