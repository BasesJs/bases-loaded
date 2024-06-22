export default class searchparams {
    constructor(paramName, parameters) {
        this.paramname = paramName;
        if (Array.isArray(parameters))
            this.params = parameters;
        else {
            this.params = [parameters];
        }
    }
    paramname = "";
    params = [];
    stringify() {
        let str = "?";
        for (let i = 0; i < this.params.length; i++) {
            if (i > 0)
                str = `${str}&${this.paramname}=${this.params[i]}`;
            else
                str = `${str}${this.paramname}=${this.params[i]}`;
        }
        return str;
    }
    static create(value) {
        let idSearch = false;
        if (typeof value === 'number' || !isNaN(value)) {
            idSearch = true;
        }
        let paramName = idSearch ? "id" : "systemName";
        return new searchparams(paramName, value);
    }
}
