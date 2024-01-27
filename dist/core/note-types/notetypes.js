"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basegroup_1 = require("../baseclass/basegroup");
const notetype = require('./notetype');
const notetypes = {
    endpoint: "/note-types",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let nt = new notetype(item);
            this.items.push(nt);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let dt = new notetype(data);
        return dt;
    }
};
module.exports = notetypes;
