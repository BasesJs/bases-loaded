"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("../baseclass/baseclass"));
class documenttype extends baseclass_1.default {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.defaultFileTypeId = item.defaultFileTypeId;
        this.documentDateDisplayName = item.documentDateDisplayName;
        this.autofillKeywordSetId = item.autofillKeywordSetId;
        this.documentTypeGroupId = item.documentTypeGroupId;
        this.revisionRenditionProperties = item.revisionRenditionProperties;
    }
    defaultFileTypeId = "";
    documentDateDisplayName = "";
    autofillKeywordSetId = "";
    documentTypeGroupId = "";
    revisionRenditionProperties = {
        "revisable": false,
        "renditionable": false,
        "commentSettings": {
            "allowComments": false,
            "forceComment": false,
            "firstRevisionNoComment": false
        }
    };
    async defaultKeywords() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.documenttypes.endpoint}/${this.id}/default-keywords`;
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
    async keywordTypes() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.documenttypes.endpoint}/${this.id}/keyword-type-groups`;
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
}
module.exports = documenttype;
