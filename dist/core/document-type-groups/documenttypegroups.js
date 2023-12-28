"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documenttypegroups = void 0;
const documenttypegroup_1 = require("./documenttypegroup");
const baseclass_1 = require("../baseclass/baseclass");
class documenttypegroups extends baseclass_1.group {
    constructor() {
        super(...arguments);
        this.endpoint = "/document-type-groups";
        this.items = [];
    }
    get(paramName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._get(this.endpoint, paramName, params);
            data.items.forEach((it) => {
                let dtg = new documenttypegroup_1.documenttypegroup(it);
                this.items.push(dtg);
            });
            return this.items;
        });
    }
}
exports.documenttypegroups = documenttypegroups;
