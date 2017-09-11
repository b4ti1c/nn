

module.exports = {
    activation: {
        fn: v => Math.tanh(v),
        derivative: v => 1 - Math.pow(Math.tanh(v), 2)
        //fn: v => Math.pow(v, 2),
        //derivative: v => 2 * v
    },
    error: {
        fn: (output, target) => output.reduce((acc, out, index) =>
                acc + Math.pow(out - target[index], 2),
            0),
        derivative: (output, target) => output.map((out, index) => 2 * (out - target[index]))
    },
    learningRate: 0.01,
    minGradient: 0.001,
    maxIterations: 100000
}