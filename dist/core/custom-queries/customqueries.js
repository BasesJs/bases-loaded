"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basegroup_1 = require("../baseclass/basegroup");
const customquery = require('./customquery');
const customqueries = {
    endpoint: "/custom-queries",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((it) => {
            let cq = new customquery(it);
            this.items.push(cq);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let cq = new customquery(data);
        return cq;
    }
};
module.exports = customqueries;
