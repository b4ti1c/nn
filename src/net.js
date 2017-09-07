const Serie = require('./serie');


class Net {
    constructor({schema}) {
        this.series = schema.map(description => new Serie(description));
    }


    ignite({input}) {
        this.out = this.series.reduce((out, serie) => serie.ignite({input: out}), input);
        return this.out;
    }


    toString() {
        return  'Net with ' + this.series.length + ' series: ' +
                '\n-------------------\n' +
                this.series.join('\n-------------------\n') +
                '\n===================\n';
    }
}


module.exports = Net;




