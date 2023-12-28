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
exports.notetypes = void 0;
const baseclass_1 = require("../baseclass/baseclass");
const notetype_1 = require("./notetype");
class notetypes extends baseclass_1.group {
    constructor() {
        super(...arguments);
        this.endpoint = "/note-types";
        this.items = [];
    }
    get(paramName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._get(this.endpoint, paramName, params);
            data.items.forEach((item) => {
                let nt = new notetype_1.notetype(item);
                this.items.push(nt);
            });
            return this.items;
        });
    }
}
exports.notetypes = notetypes;
