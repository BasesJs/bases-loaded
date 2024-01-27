"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basegroup_1 = require("../baseclass/basegroup");
const documenttype = require('./documenttype');
const documenttypes = {
    endpoint: "/document-types",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((it) => {
            let doctype = new documenttype(it);
            this.items.push(doctype);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let dt = new documenttype(data);
        return dt;
    }
};
module.exports = documenttypes;
