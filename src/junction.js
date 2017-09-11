

class Junction {
    constructor({numOfInputs}) {
        this.weights = (new Array(numOfInputs + 1)).fill(0).map(() => Math.random() * 2 - 1);
    }

    ignite({input}) {
        const bInput = input.concat(1);
        this.out = this.weights.reduce((acc, weight, index) => acc + (weight * bInput[index]), 0);
        return this.out;
    }



    toString() {
        let str = this.weights.map((weight, index) => weight.toFixed(2) + (index + 1 == this.weights.length ? '(b)' : '')).join(', ');
        return `Neuron - ${this.weights.length - 1}+1 inputs : ${str}${this.out ? ' - last out: ' + this.out.toFixed(2) : ''}`;
    }
}


module.exports = Junction;