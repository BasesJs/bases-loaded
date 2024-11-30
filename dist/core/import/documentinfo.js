import { bestguess } from './utilities/bestguessfiletype.js';
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
    static async create(documentTypeName, fileExtension, documentDate) {
        const docInfo = new documentinfo();
        let items = await bases.core.documenttypes.get(documentTypeName);
        let doctype = items[0];
        docInfo.documentTypeId = items[0].id;
        docInfo.fileTypeId = await bestguess(fileExtension);
        docInfo.documentDate = documentDate.toString();
        return docInfo;
    }
}
