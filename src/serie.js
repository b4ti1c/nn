const Junction = require('./junction');
const Activation = require('./activation');

class Serie {
    constructor({type, outputCount, inputCount}) {
        this.type = type;

        if (type == 'activation') {
            this.serie = (new Array(inputCount)).fill(0).map(() => new Activation());
        }

        if (type == 'junction') {
            this.serie = (new Array(outputCount)).fill(0).map(() => new Junction({numOfInputs: inputCount}));
        }
    }

    ignite({input}) {
        if (this.type == 'activation') {
            this.out = this.serie.map((member, index) => member.ignite({input: input[index]}));
        }

        if (this.type == 'junction') {
            this.out = this.serie.map(member => member.ignite({input}));
        }

        return this.out;
    }



    toString() {
        return `Serie with ${this.serie.length} ${this.type}s\n` +
                this.serie.join('\n');
    }
}


module.exports = Serie;