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
exports.documenttypes = void 0;
const baseclass_1 = require("../baseclass/baseclass");
const documenttype_1 = require("./documenttype");
class documenttypes extends baseclass_1.group {
    constructor() {
        super(...arguments);
        this.endpoint = "/document-types";
        this.items = [];
    }
    get(paramName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._get(this.endpoint, paramName, params);
            data.items.forEach((it) => {
                let doctype = new documenttype_1.documenttype(it);
                this.items.push(doctype);
            });
            return this.items;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${this.endpoint}/${id}`;
            let data = "";
            let request = {
                method: 'get',
                maxBodyLength: Infinity,
                url: fullUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
                },
                redirect: 'follow',
                data: data
            };
            const response = yield global.bases.client.request(request);
            let dt = new documenttype_1.documenttype(response.data);
            return dt;
        });
    }
}
exports.documenttypes = documenttypes;
