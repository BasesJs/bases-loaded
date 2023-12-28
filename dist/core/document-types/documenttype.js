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
exports.documenttype = void 0;
const baseclass_1 = require("../baseclass/baseclass");
class documenttype extends baseclass_1.base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.defaultFileTypeId = "";
        this.documentDateDisplayName = "";
        this.autofillKeywordSetId = "";
        this.documentTypeGroupId = "";
        this.revisionRenditionProperties = {
            "revisable": false,
            "renditionable": false,
            "commentSettings": {
                "allowComments": false,
                "forceComment": false,
                "firstRevisionNoComment": false
            }
        };
        this.defaultFileTypeId = item.defaultFileTypeId;
        this.documentDateDisplayName = item.documentDateDisplayName;
        this.autofillKeywordSetId = item.autofillKeywordSetId;
        this.documentTypeGroupId = item.documentTypeGroupId;
        this.revisionRenditionProperties = item.revisionRenditionProperties;
    }
    defaultKeywords() {
        return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield global.bases.client.request(request);
            return response.data;
        });
    }
    keywordTypes() {
        return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield global.bases.client.request(request);
            return response.data;
        });
    }
}
exports.documenttype = documenttype;
