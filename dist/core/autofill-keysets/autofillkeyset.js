"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("../baseclass/baseclass"));
class autofillkeyset extends baseclass_1.default {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.primaryKeywordTypeId = item.primaryKeywordTypeId;
        this.external = item.external;
    }
    primaryKeywordTypeId = "";
    external = false;
    getdata = async (primaryValue) => {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.autofillkeysets.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`;
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
        let items = [];
        response.data.items.forEach((i) => {
            let keywords = [];
            items.push(i);
        });
        return items;
    };
}
module.exports = autofillkeyset;
