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
exports.filetypes = void 0;
const baseclass_1 = require("../baseclass/baseclass");
const filetype_1 = require("./filetype");
class filetypes extends baseclass_1.group {
    constructor() {
        super(...arguments);
        this.endpoint = "/file-types";
        this.items = [];
    }
    get(paramName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._get(this.endpoint, paramName, params);
            data.items.forEach((item) => {
                let ft = new filetype_1.filetype(item);
                this.items.push(ft);
            });
            return this.items;
        });
    }
    ;
    bestguess(fileExtension) {
        return __awaiter(this, void 0, void 0, function* () {
            let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/default-upload-file-types?extension=${fileExtension}`;
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
            return response.data.id;
        });
    }
}
exports.filetypes = filetypes;
module.exports = filetypes;
