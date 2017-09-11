const CONFIG = require('./config');


class Activation {
    constructor(conf) {
        this.activationFn = conf ? conf.activation.fn : CONFIG.activation.fn;
    }

    ignite({input}) {
        this.out = this.activationFn(input);
        return this.out;
    }

    toString() {
        return this.out ? `Actv Fn - last out: ${this.out.toFixed(2)}` : 'Input';
    }
}


module.exports = Activation