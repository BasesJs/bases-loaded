"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basegroup_1 = require("../baseclass/basegroup");
const filetype = require('./filetype');
const filetypes = {
    endpoint: "/file-types",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let ft = new filetype(item);
            this.items.push(ft);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let ft = new filetype(data);
        return ft;
    }
};
module.exports = filetypes;
