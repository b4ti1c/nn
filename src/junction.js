

class Junction {
    constructor({numOfInputs}) {
        this.weights = (new Array(numOfInputs)).fill(0).map(() => Math.random());
    }

    ignite({input}) {
        this.out = this.weights.reduce((acc, weight, index) => acc + (weight * input[index]), 0);
        return this.out;
    }



    toString() {
        let str = this.weights.map(weight => weight.toFixed(2)).join(', ');
        return `Neuron - ${this.weights.length} inputs : ${str} - last out: ${this.out.toFixed(2)}`;
    }
}


module.exports = Junction;