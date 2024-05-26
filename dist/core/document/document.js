import base from '../baseclass/baseclass.js';
import { _getbyid } from '../baseclass/basegroup.js';
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
const endpoint1 = "/documents";
async function get(id, getkeywords = true) {
    const data = await _getbyid(endpoint1, id);
    const doc = new document(data);
    if (getkeywords) {
        const keywords = await _getbyid(id + "/keywords", endpoint1);
    }
}
