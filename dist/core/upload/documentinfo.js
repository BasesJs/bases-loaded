import { keywords } from '../keywords/keywords.js';
import { bestguess } from './bestguessfiletype.js';
export class documentinfo {
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
    keywordCollection = new keywords();
    static async create(documentTypeName, fileExtension, documentDate) {
        const docInfo = new documentinfo();
        let items = await bases.core.documenttypes.get('systemName', documentTypeName);
        let doctype = items[0];
        docInfo.documentTypeId = items[0].id;
        docInfo.fileTypeId = await bestguess(fileExtension);
        docInfo.keywordCollection = await keywords.create(docInfo.documentTypeId);
        docInfo.documentDate = documentDate.toString();
        return docInfo;
    }
}
