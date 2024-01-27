"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documenttypegroup = require("./documenttypegroup");
const basegroup_1 = require("../baseclass/basegroup");
const documenttypegroups = {
    endpoint: "/document-type-groups",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((it) => {
            let dtg = new documenttypegroup(it);
            this.items.push(dtg);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let dtg = new documenttypegroup(data);
        return dtg;
    }
};
module.exports = documenttypegroups;
