"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getbyid = exports._get = void 0;
const searchparams_1 = __importDefault(require("../utilities/searchparams"));
const { error } = require('console');
async function _get(endpoint, paramName, params) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
    if (paramName != null && params != null) {
        let search = new searchparams_1.default(paramName, params);
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
    const response = await global.bases.client.request(request);
    return response.data;
}
exports._get = _get;
async function _getbyid(id, endpoint) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}/${id}`;
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
    const response = await global.bases.client.request(request);
    return response.data;
}
exports._getbyid = _getbyid;
