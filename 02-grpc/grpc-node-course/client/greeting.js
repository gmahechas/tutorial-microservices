const grpc = require("grpc");

const greets = require("../server/protos/greet_pb");
const service = require("../server/protos/greet_grpc_pb");

function main() {
  const client = new service.GreetServiceClient(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
  );

  const request = new greets.GreetRequest();

  const greeting = new greets.Greeting();
  greeting.setFirstName("Tavo");
  greeting.setLastName("Mahecha Soto");
  
  request.setGreeting(greeting);

  client.greet(request, (error, response) => {
    if (!error) {
      console.log("Response:::", response.getResult());
    } else {
      console.log("Error:::", error);
    }
  });
}

main();
