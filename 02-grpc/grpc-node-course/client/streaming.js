const grpc = require("grpc");

const greets = require("../protos/js/protos/streaming_pb");
const service = require("../protos/js/protos/streaming_grpc_pb");

function main() {

  const client = new service.GreetServiceClient("127.0.0.1:50051", grpc.credentials.createInsecure());

  const greeting = new greets.Greeting();
  greeting.setFirstName("Tavo");
  greeting.setLastName("Mahecha Soto");

  const request = new greets.GreetManyTimesRequest();
  request.setGreeting(greeting);

  var call = client.greetManyTimes(request, () => { });

  call.on('data', (response) => {
    console.log('Client Streaming Response:', response.getResult());
  });

  call.on('status', (status) => {
    console.log(status);
  });

  call.on('error', (error) => {
    console.error(error);
  });

  call.on('end', () => {
    console.log();
  });

}

main();