"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchparams = void 0;
class searchparams {
    constructor(paramName, parameters) {
        this.paramname = "";
        this.params = [];
        this.paramname = paramName;
        if (Array.isArray(parameters))
            this.params = parameters;
        else {
            this.params = [parameters];
        }
    }
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
}
exports.searchparams = searchparams;
