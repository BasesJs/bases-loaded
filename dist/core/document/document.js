import base from '../baseclass/baseclass.js';
export class document extends base {
    constructor(item) {
        super(item.id, item.name, item.systemName ? item.systemName : "");
        this.typeId = item.typeId;
        this.createdByUserId = item.createdByUserId;
        this.storeDate = item.storeDate;
        this.documentDate = item.documentDate;
        this.status = item.status;
        this.captureProperties = item.captureProperties ? item.captureProperties : {};
        this.keywords = [];
        this.sikgs = [];
        this.mikgs = [];
        this.keywordGuid = item.keywordGuid ? item.keywordGuid : "";
    }
    typeId;
    createdByUserId;
    storeDate;
    documentDate;
    status;
    captureProperties;
    keywords;
    sikgs;
    mikgs;
    keywordGuid;
}
