"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keywordcollection = require('../keywords/keywordcollection');
const documenttype = require('../document-types/documenttype');
const core = require('../core');
const bestguess = require('./bestguessfiletype');
class documentinfo {
    constructor(documentTypeId, fileTypeId, documentDate) {
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
    documentTypeId = "Waiting for Response";
    fileTypeId = "";
    documentDate = "";
    uploads = [];
    keywordCollection = new keywordcollection();
    static async create(documentTypeName, fileExtension, documentDate) {
        const docInfo = new documentinfo();
        let items = await bases.core.documenttypes.get('systemName', documentTypeName);
        let doctype = items[0];
        docInfo.documentTypeId = items[0].id;
        docInfo.fileTypeId = await bestguess(fileExtension);
        docInfo.keywordCollection = await keywordcollection.create(docInfo.documentTypeId);
        docInfo.documentDate = documentDate.toString();
        return docInfo;
    }
}
exports.default = documentinfo;
module.exports = documentinfo;
