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
exports.documentinfo = void 0;
const keywordcollection_1 = require("../keywords/keywordcollection");
class documentinfo {
    constructor(documentTypeId, fileTypeId, documentDate) {
        this.documentTypeId = "Waiting for Response";
        this.fileTypeId = "";
        this.documentDate = "";
        this.uploads = [];
        this.keywordCollection = new keywordcollection_1.keywordcollection();
        if (documentTypeId != null) {
            this.documentTypeId = documentTypeId;
        }
        if (fileTypeId != null) {
            this.fileTypeId = fileTypeId;
        }
        if (documentDate != null) {
            this.documentDate = documentDate.toString();
        }
    }
    ;
    static create(documentTypeName, fileExtension, documentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const docInfo = new documentinfo();
            let items = yield global.bases.core.documenttypes.get('systemName', documentTypeName);
            let doctype = items[0];
            docInfo.documentTypeId = items[0].id;
            docInfo.fileTypeId = yield global.bases.core.filetypes.bestguess(fileExtension);
            docInfo.keywordCollection = yield keywordcollection_1.keywordcollection.create(docInfo.documentTypeId);
            docInfo.documentDate = documentDate.toString();
            return docInfo;
        });
    }
}
exports.documentinfo = documentinfo;
