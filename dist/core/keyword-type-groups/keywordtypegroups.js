"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basegroup_1 = require("../baseclass/basegroup");
const keywordtypegroup = require('./keywordtypegroup');
const keywordtypegroups = {
    endpoint: "/keyword-type-groups",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let ktg = new keywordtypegroup(item);
            this.items.push(ktg);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let ktg = new keywordtypegroup(data);
        return ktg;
    }
};
module.exports = keywordtypegroups;
