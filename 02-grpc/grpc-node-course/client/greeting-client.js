const grpc = require('grpc');

const greets = require('../protos/greet/greet_pb');
const service = require('../protos/greet/greet_grpc_pb');

const client = new service.GreetServiceClient('127.0.0.1:50051', grpc.credentials.createInsecure());

// ***************************** DeadLines

const getRPCDeadLine = (rpcType) => {
  var timeAllowed = 5000;

  switch (rpcType) {
    case 1:
      timeAllowed = 1000;
      break;
    case 2:
      timeAllowed = 7000;
      break;
    default:
      console.log('Invalid');
      break;
  }

  return new Date(Date.now() + timeAllowed);
};

// ***************************** Unary API
const unary = () => {

  const deadline = getRPCDeadLine(1);

  const greeting = new greets.Greeting();
  greeting.setFirstName('');
  greeting.setLastName('Mahecha');

  const request = new greets.GreetRequest();
  request.setGreeting(greeting);

  client.greet(request, { deadline }, (error, response) => {
    if (!error) {
      console.log('Response:::', response.getResult());
    } else {
      console.log('Error:::', error.message);
    }
  });
}

// ***************************** Server Streaming
const serverStream = () => {
  const greeting = new greets.Greeting();
  greeting.setFirstName('Tavo');
  greeting.setLastName('Mahecha');

  const request = new greets.GreetRequest();
  request.setGreeting(greeting);

  const call = client.greetManyTimes(request, () => { });
  call.on('data', (response) => {
    console.log('response:::', response.getResult());
  });
  call.on('status', (status) => {
    console.log('status:::', status);
  });
  call.on('error', (error) => {
    console.log('error:::', error);
  });
  call.on('end', () => {
    console.log('end:::');
  });
}

// ***************************** Client Streaming
const clientStream = () => {
  const request = new greets.GreetRequest();
  const call = client.longGreet(request, (error, response) => {
    if (!error) {
      console.log('response aca:::', response.getResult());
    } else {
      console.log('Paila', error);
    }
  })

  let count = 0, intervalID = setInterval(() => {
    console.log(`sending ${count}`);

    const greeting1 = new greets.Greeting();
    greeting1.setFirstName('Tavo');
    greeting1.setLastName('Mahecha');
    const request1 = new greets.GreetRequest();
    request1.setGreeting(greeting1);

    const greeting2 = new greets.Greeting();
    greeting2.setFirstName('Alexandra');
    greeting2.setLastName('Vanegas');
    const request2 = new greets.GreetRequest();
    request2.setGreeting(greeting2);

    call.write(request1);
    call.write(request2);

    if (++count > 9) {
      clearInterval(intervalID);
      call.end();
    }

  }, 1000);
};

// ***************************** Bidirectional
const sleep = async (interval) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
};

const bidirectional = async () => {
  const request = new greets.GreetRequest();
  const call = client.greetEveryone(request, (error, response) => {
    console.log('Server reponse:::', response);
  });
  call.on('data', response => {
    console.log(`Hello Client`, response.getResult());
  });
  call.on('error', (error) => {
    console.log('error:::', error);
  });
  call.on('end', () => {
    console.log('the end...')
  });

  for (let i = 0; i < 10; i++) {
    const greeting1 = new greets.Greeting();
    greeting1.setFirstName('Tavo');
    greeting1.setLastName('Mahecha');
    const request1 = new greets.GreetRequest();
    request1.setGreeting(greeting1);

    call.write(request1);
    await sleep(1500);
  }
  call.end();
};

const main = () => {
  unary();
  // serverStream();
  // clientStream();
  // bidirectional();
};

main();
