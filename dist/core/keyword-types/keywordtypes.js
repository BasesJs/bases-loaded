"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basegroup_1 = require("../baseclass/basegroup");
const keywordtype_1 = __importDefault(require("./keywordtype"));
const keywordtypes = {
    endpoint: "/keyword-types",
    items: [],
    async get(paramName, params) {
        const data = await (0, basegroup_1._get)(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let kt = new keywordtype_1.default(item);
            this.items.push(kt);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await (0, basegroup_1._getbyid)(id, this.endpoint);
        let dt = new keywordtype_1.default(data);
        return dt;
    }
};
module.exports = keywordtypes;
