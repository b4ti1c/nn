const Net = require('../src/net');
const BP = require('../src/backpropagation');
const winedata = require('./winedata');
const _ = require('lodash');
const config = {
    activation: {
        fn: v => Math.tanh(v),
        derivative: v => 1 - Math.pow(Math.tanh(v), 2)
    },
    error: {
        fn: (output, target) => output.reduce((acc, out, index) =>
                acc + Math.pow(out - target[index], 2),
            0),
        derivative: (output, target) => output.map((out, index) => 2 * (out - target[index]))
    },
    learningRate: 0.03,
    minGradient: 0.001,
    maxIterations: 100000
}


const net = new Net({schema: [
    {inputCount: 13, outputCount: 4},
    {inputCount: 4, outputCount: 6},
    {inputCount: 6, outputCount: 8},
    {inputCount: 8, outputCount: 3}
], config});


const numOfTest = 30;

const trainData = winedata.slice(0, -numOfTest);
const testData = winedata.slice(-numOfTest);

for (let i = 0; i < config.maxIterations; i++) {
    const data = _.sample(trainData);
    const input = data.slice(0, -3);
    const target = data.slice(-3);

    const maxGrad = BP.train({net, input, target, config});

    if (Math.abs(maxGrad) <= config.minGradient) {
        console.log('stopping at ', i);
        break;
    }
}

let success = fail = 0;
testData.forEach(data => {
    const input = data.slice(0, -3);
    const target = data.slice(-3);

    const out = net.ignite({input});

    const successful = target.reduce((res, t, i) => res && t == Math.abs(Math.round(out[i])), true);

    if (successful)
        success += 1;
    else
        fail += 1;

    //console.log(out.map(o => o.toFixed(2)), target)
    console.log(out.map(o => Math.abs(Math.round(o))), target, successful ? 'success' : 'fail');
})

console.log(`Success Rate ${success}/${success + fail}`);




