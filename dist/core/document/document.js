import base from '../baseclass/baseclass.js';
import { _getbyid } from '../baseclass/basegroup.js';
import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';
import { filetypes } from '../file-types/filetypes.js';
const mime = require('node-mime');
export class document extends base {
    constructor(item) {
        super(item.id, item.name, item.systemName ? item.systemName : "");
        this.typeId = item.typeId;
        this.createdByUserId = item.createdByUserId;
        this.storeDate = item.storeDate;
        this.documentDate = item.documentDate;
        this.status = item.status;
        this.captureProperties = item.captureProperties ? item.captureProperties : {};
        this.keywordGuid = item.keywordGuid ? item.keywordGuid : "";
    }
    typeId;
    createdByUserId;
    storeDate;
    documentDate;
    status;
    captureProperties;
    keywords = [];
    recordgroups = [];
    multirecordgroups = [];
    revisions = [];
    keywordGuid;
    static endpoint = "/documents";
    static async get(id, getKeywords = true) {
        const data = await _getbyid(id, this.endpoint);
        const doc = new document(data);
        if (getKeywords) {
        }
        return doc;
    }
    ;
    async getRevisions() {
    }
    async getKeywords() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/keywords`;
        let options = new RequestOptions(httpMethod.GET, fullUrl, {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        }, 'follow', '');
        const response = await RunRequest(options);
    }
    ;
    async download(revision = "latest", rendition = "default") {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
        let data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, document.endpoint);
        let fileTypeId = data.fileTypeId;
        let filetype = await filetypes.get(fileTypeId);
    }
}
async function get(id, endpoint) {
}
