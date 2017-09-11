const Junction = require('./junction');
const Activation = require('./activation');


class Layer {
    constructor({inputCount, outputCount}) {
        //this.activations = new Serie({type: 'activation', inputCount});
        //this.junctions = new Serie({type: 'junction', inputCount, outputCount});


        this.activations = (new Array(inputCount)).fill(0).map(() => new Activation());
        this.junctions = (new Array(outputCount)).fill(0).map(() => new Junction({numOfInputs: inputCount}));
    }

    ignite({input}) {
        //this.midOut = this.activations.ignite({input});
        this.midOut = this.activations.map((activation, index) => activation.ignite({input: input[index]}));

        return this.halfIgnite({input: this.midOut})
    }

    halfIgnite({input}) {
        //this.out = this.junctions.ignite({input});
        this.out = this.junctions.map(junction => junction.ignite({input}));

        return this.out;
    }

    toString() {
        return `Layer --------\n` +
                this.activations.join('\n') + '\n' +
                this.junctions.join('\n');
                //this.activations.toString() + '\n' +
                //this.junctions.toString();
    }
}


module.exports = Layer;