const grpc = require("grpc");

const calculator = require("../protos/js/protos/calculator_pb");
const calculatorService = require("../protos/js/protos/calculator_grpc_pb");

function main() {
  const client = new calculatorService.CalculatorServiceClient("127.0.0.1:50052", grpc.credentials.createInsecure());

  const sumRequest = new calculator.SumRequest();
  sumRequest.setFirstNumber(10);
  sumRequest.setSecondNumber(3);

  client.sum(sumRequest, (error, response) => {
    if (!error) {
      console.log(sumRequest.getFirstNumber() + "+" + sumRequest.getSecondNumber() + "=" + response.getSumResult() );
    } else {
      console.log("Error:::", error);
    }
  });
}

main();
