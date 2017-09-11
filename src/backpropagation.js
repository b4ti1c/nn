
module.exports.train = function({net, input, target, config}) {
    const layerCount = net.layers.length;
    const sensitivites = {};

    const out = net.ignite({input});
    sensitivites[layerCount] = config.error.derivative(out, target);

    for (let i = layerCount - 1; i > 0; i--) {
        const ithSens = net.layers[i].activations.map((activation, aIndex) => {
            const dAct = config.activation.derivative(net.layers[i - 1].out[aIndex]);
            const dJunc = net.layers[i].junctions.reduce((acc, junction, jIndex) => {
                return acc + junction.weights[aIndex] * sensitivites[i + 1][jIndex];
            }, 0);

            return dAct * dJunc;
        });

        sensitivites[i] = ithSens;
    }

    let maxGrad = Number.MAX_SAFE_INTEGER;

    net.layers.forEach((layer, lIndex) => {
        layer.junctions.forEach((junction, jIndex) => {
            junction.weights.forEach((weight, wIndex) => {
                const wInput = junction.weights.length == wIndex + 1 ? 1 :
                               lIndex == 0 ? input[wIndex] :
                               layer.activations[wIndex].out;

                const wGrad = wInput * sensitivites[lIndex + 1][jIndex];

                if (wGrad < maxGrad) maxGrad = wGrad;

                junction.weights[wIndex] -= wGrad * config.learningRate;
            });
        });
    });

    return maxGrad;
}
