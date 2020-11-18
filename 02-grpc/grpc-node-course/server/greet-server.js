const grpc = require('grpc');

const greets = require('../protos/greet/greet_pb');
const service = require('../protos/greet/greet_grpc_pb');

// ***************************** Unary API
const greet = (call, callback) => {
  const firstName = call.request.getGreeting().getFirstName();
  const lastName = call.request.getGreeting().getLastName();

  if(firstName.length > 0) {
    const greeting = new greets.GreetResponse();
    greeting.setResult('Hello ' + firstName + ' ' + lastName);
    callback(null, greeting);
  } else {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "{ error: 'ddd', filed: 'firstName'}"
    })
  }

}

// ***************************** Server Streaming
const greetManyTimes = (call, callback) => {
  const firstName = call.request.getGreeting().getFirstName();
  const lastName = call.request.getGreeting().getLastName();

  let count = 0, intervalID = setInterval(() => {
    const greetResponse = new greets.GreetResponse();
    greetResponse.setResult(`Hello ${count} to ${firstName}`);
    call.write(greetResponse);
    if(++count > 9) {
      clearInterval(intervalID);
      call.end(); 
    }
  }, 1000);
}

// ***************************** Client Streaming
const longGreet = (call, callback) => {
  call.on('data', (request) => {
    const firstName = request.getGreeting().getFirstName();
    const lastName = request.getGreeting().getLastName();
    console.log(`Hello ${firstName} ${lastName}`);
  });
  call.on('error', (error) => {
    console.log('error:::', error);
  });
  call.on('end', () => {
    const response = new greets.GreetResponse();
    response.setResult('Long Greet Client Streaming...');
    callback(null, response);
  });
};

// ***************************** Bidirectional
const sleep = async(interval) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
};

const greetEveryone = async (call, callback) => {
  call.on('data', response => {
    const firstName = response.getGreeting().getFirstName();
    const lastName = response.getGreeting().getLastName();
    console.log(`Hello ${firstName} ${lastName}`);
  })
  call.on('error', (error) => {
    console.log('error:::', error);
  });
  call.on('end', () => {
    console.log('the end...')
  });

  for (let i = 0; i < 10; i++) {

    const response1 = new greets.GreetResponse();
    response1.setResult('Bidirectional Respopnse');

    call.write(response1);

    await sleep(1000);
  }

  call.end();
};

const main = () => {
  const server = new grpc.Server();
  server.addService(service.GreetServiceService, { greet, greetManyTimes, longGreet, greetEveryone });
  server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
  server.start();

  console.log('Server running on port 50051');
}

main();
