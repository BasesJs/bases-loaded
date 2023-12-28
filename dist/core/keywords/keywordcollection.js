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
exports.keywordcollection = void 0;
const keyword_1 = require("./keyword");
class keywordcollection {
    constructor(keywordGuid, items) {
        this.keywordGuid = "";
        this.items = [];
        if (keywordGuid != null) {
            this.keywordGuid = keywordGuid;
        }
        if (items != null) {
            this.items = items;
        }
    }
    addKeyword(keywordName, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let keywords = [];
            let kw = yield keyword_1.keyword.create(keywordName, values);
            keywords.push(kw);
            let keys = {
                "keywords": keywords
            };
            this.items.push(keys);
        });
    }
    static create(documentTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const kwC = new keywordcollection();
            let dt = yield global.bases.core.documenttypes.getById(documentTypeId);
            let data = yield dt.defaultKeywords();
            kwC.keywordGuid = data.keywordGuid;
            return kwC;
        });
    }
}
exports.keywordcollection = keywordcollection;
module.exports = keywordcollection;
