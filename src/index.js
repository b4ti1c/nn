
const Net = require('./net');


const net = new Net({schema: [
    {type: 'junction', inputCount: 10, outputCount: 4},
    {type: 'activation', inputCount: 4},
    {type: 'junction', inputCount: 4, outputCount: 6},
    {type: 'activation', inputCount: 6},
    {type: 'junction', inputCount: 6, outputCount: 8},
    {type: 'activation', inputCount: 8},
    {type: 'junction', inputCount: 8, outputCount: 4}
]});


let input = [1,2,3,4,5,6,7,8,9,10];
let out = net.ignite({input});

console.log(net.toString());

console.log(out);
