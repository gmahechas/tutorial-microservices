const grpc = require("grpc");

const greets = require("../protos/js/protos/streaming_pb");
const service = require("../protos/js/protos/streaming_grpc_pb");

function greetManyTimes(call, callback) {
  const firstName = call.request.getGreeting().getFirstName();

  let count = 0, intervalID = setInterval(function () {

    const greetManyTimesResponse = new greets.GreetManyTimesResponse();
    greetManyTimesResponse.setResult(count + ' - ' +firstName);

    // setup streaming
    call.write(greetManyTimesResponse);
    if (++count > 9) {
      clearInterval(intervalID);
      call.end(); // we have sent all messages
    }
  }, 1000);
}

function main() {
  const server = new grpc.Server();
  server.addService(service.GreetServiceService, { greetManyTimes });
  server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port 50051");
}

main();