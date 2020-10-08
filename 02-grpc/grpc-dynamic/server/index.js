const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const greetProtoPath = path.join(__dirname, "..", "protos", "greet.proto");
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  onefs: true,
});

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet;

function greet(call, callback) {
  var firstName = call.request.greeting.first_name;
  var lastName = call.request.greeting.last_name;

  callback(null, { result: "Hello" + firstName + " " + lastName });
}

function main() {
  const server = new grpc.Server();

  server.addService(greetPackageDefinition.GreetService.service, {
    greet: greet
  });

  server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Running at 127.0.0.1:50051");
}

main();