const keywordcollection = require('../keywords/keywordcollection');
const doctype = require('../document-types/documenttype');
const core = require('../core');

class documentinfo {
    constructor(documentTypeId = null, fileTypeId = null, documentDate = new Date()){       
        if(fileTypeId != null){
            this.fileTypeId = fileTypeId;
        }        
        if(documentTypeId != null){
            this.documentTypeId = documentTypeId;
        }
        this.documentDate = documentDate
    }
    documentTypeId = "Waiting for Response";
    fileTypeId = "";
    documentDate = "";
    uploads = [];
    keywordCollection = new keywordcollection();
    static async create(documentTypeName, fileExtension){
        const docInfo = new documentinfo();
        let items = await global.bases.core.doctypes.get('systemName', documentTypeName);
        let doctype = items[0];
        docInfo.documentTypeId = items[0].id;
        docInfo.fileTypeId = await global.bases.core.filetypes.bestguess(fileExtension);   
        docInfo.keywordcollection = await keywordcollection.create(docInfo.documentTypeId);   
        return docInfo;
    }
}
module.exports = documentinfo;