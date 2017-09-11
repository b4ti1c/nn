
const Net = require('./net');
const BP = require('./backpropagation');

const config = require('./config');

const net = new Net({schema: [
    {inputCount: 10, outputCount: 4},
    {inputCount: 4, outputCount: 6},
    {inputCount: 6, outputCount: 8},
    {inputCount: 8, outputCount: 4}
]});

const trainingData = {input: [1,1,1,1,1,1,1,1,1,1], output: [1, 0, 0, 1]}

for (let i = 0; i < 100; i++)
    BP.train(net, trainingData.input, trainingData.output, config);


//let input = [1,2,3,4,5,6,7,8,9,10];
let input = [1,1,1,1,1,1,1,1,1,1];
let out = net.ignite({input});

console.log(net.toString());

console.log(out);
