
class docinfo {
    constructor(documentTypeId, fileTypeId, documentDate, uploads, keywordCollection){
        this.documentTypeId = documentTypeId;
        this.fileTypeId = fileTypeId;
        this.documentDate = documentDate;
        this.uploads = uploads;
        this.keywordCollection = keywordCollection;
    }
    documentTypeId = "";
    fileTypeId = "";
    documentDate = "";
    uploads = [];
    keywordCollection = "";
}
module.exports = docinfo;