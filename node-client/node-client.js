const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/addition/addition.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const packageDescriptor = grpc.loadPackageDefinition(packageDefinition);
const addition = packageDescriptor.addition;

const stub = new addition.Addition(
    'localhost:10001',
    grpc.credentials.createInsecure()
);

const addRequest = {
    num1 : process.argv[2] || 0,
    num2 : process.argv[3] || 0,
}

stub.Add(addRequest, function(err, response) {
    if (err) {
        console.error(err)
    } else {
        console.log(`The sum of ${addRequest.num1} and ${addRequest.num2} is ${response.sum}`)
    }
})