const grpc = require("grpc");

const calculator = require("../protos/js/protos/calculator_pb");
const calculatorService = require("../protos/js/protos/calculator_grpc_pb");

function sum(call, callback) {
  const sumResponse = new calculator.SumResponse();
  sumResponse.setSumResult(call.request.getFirstNumber() + call.request.getSecondNumber());
  callback(null, sumResponse);
}

function main() {
  const server = new grpc.Server();
  server.addService(calculatorService.CalculatorServiceService, { sum });
  server.bind("127.0.0.1:50052", grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server operations running on port 50052");
}

main();
