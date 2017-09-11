const Layer = require('./layer');


class Net {
    constructor({schema, config}) {
        this.layers = schema.map(description => new Layer(description, config));
    }

    ignite({input}) {
        this.out = this.layers.reduce((out, layer, index) =>
            index > 0 ?
                layer.ignite({input: out}) :
                layer.halfIgnite({input: out}),
        input);

        return this.out;
    }


    toString() {
        return  'Net with ' + this.layers.length + ' series: ' +
                '\n-------------------\n' +
                this.layers.join('\n-------------------\n') +
                '\n===================\n';
    }
}


module.exports = Net;




