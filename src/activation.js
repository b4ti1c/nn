const config = require('./config');


class Activation {
    ignite({input}) {
        this.out = config.activation.fn(input);
        return this.out;
    }

    toString() {
        return this.out ? `Actv Fn - last out: ${this.out.toFixed(2)}` : 'Input';
    }
}


module.exports = Activation