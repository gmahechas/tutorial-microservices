const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { request } = require("http");

const greetProtoPath = path.join(__dirname, "..", "protos", "greet.proto");
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  onefs: true,
});

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition)
  .greet;

const client = new greetPackageDefinition.GreetService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

function callGreetings() {

  var request = {
    greeting: {
      first_name: "Tavo",
      last_name: "Mahecha"
    }
  };

  client.greet(request, (error, response) => {
    if (!error) {
      console.log("Response:::", response.result);
    } else {
      console.log("Error:::", error);
    }
  });
}

function main() {
  callGreetings();
}

main();
