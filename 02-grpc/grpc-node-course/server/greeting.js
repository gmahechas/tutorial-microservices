const grpc = require("grpc");

const greets = require("../protos/js/protos/greet_pb");
const service = require("../protos/js/protos/greet_grpc_pb");

function greet(call, callback) {
  const greeting = new greets.GreetResponse();
  greeting.setResult("Hello " + call.request.getGreeting().getFirstName() + " " + call.request.getGreeting().getLastName());
  callback(null, greeting);
}

function main() {
  const server = new grpc.Server();
  server.addService(service.GreetServiceService, { greet });
  server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port 50051");
}

main();
