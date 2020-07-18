// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_streaming_pb = require('../protos/streaming_pb.js');

function serialize_streaming_GreetManyTimesRequest(arg) {
  if (!(arg instanceof protos_streaming_pb.GreetManyTimesRequest)) {
    throw new Error('Expected argument of type streaming.GreetManyTimesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_streaming_GreetManyTimesRequest(buffer_arg) {
  return protos_streaming_pb.GreetManyTimesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_streaming_GreetManyTimesResponse(arg) {
  if (!(arg instanceof protos_streaming_pb.GreetManyTimesResponse)) {
    throw new Error('Expected argument of type streaming.GreetManyTimesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_streaming_GreetManyTimesResponse(buffer_arg) {
  return protos_streaming_pb.GreetManyTimesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreetServiceService = exports.GreetServiceService = {
  // Streaming
greetManyTimes: {
    path: '/streaming.GreetService/GreetManyTimes',
    requestStream: false,
    responseStream: true,
    requestType: protos_streaming_pb.GreetManyTimesRequest,
    responseType: protos_streaming_pb.GreetManyTimesResponse,
    requestSerialize: serialize_streaming_GreetManyTimesRequest,
    requestDeserialize: deserialize_streaming_GreetManyTimesRequest,
    responseSerialize: serialize_streaming_GreetManyTimesResponse,
    responseDeserialize: deserialize_streaming_GreetManyTimesResponse,
  },
};

exports.GreetServiceClient = grpc.makeGenericClientConstructor(GreetServiceService);
