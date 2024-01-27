"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basegroup_1 = require("../baseclass/basegroup");
const autofillkeyset = require('./autofillkeyset');
const autofillkeysets = {
    endpoint: "/autofill-keyword-sets",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((it) => {
            let afks = new autofillkeyset(it);
            this.items.push(afks);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let dt = new autofillkeyset(data);
        return dt;
    }
};
module.exports = autofillkeysets;
