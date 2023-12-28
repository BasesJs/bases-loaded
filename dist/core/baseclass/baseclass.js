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
exports.group = exports.base = void 0;
class base {
    constructor(id, name, systenName) {
        this.id = "";
        this.name = "";
        this.systemName = "";
        this.id = id;
        this.name = name;
        this.systemName = systenName;
    }
}
exports.base = base;
const searchparams = require('../utilities/searchparams');
const { error } = require('console');
class group {
    _get(endpoint, paramName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
            if (paramName != null && params != null) {
                let search = new searchparams(paramName, params);
                fullUrl = `${fullUrl}${search.stringify()}`;
                console.log(fullUrl);
            }
            else if ((paramName != null && params == null) || (paramName == null && params != null)) {
                throw error("When using search parameters, both variables are required.");
            }
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
            return response.data;
        });
    }
}
exports.group = group;
