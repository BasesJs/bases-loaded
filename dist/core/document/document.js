import { base, _getbyid } from '../baseclass/baseclass.js';
import { RunRequest, RequestOptions, HttpMethod } from '../../helpers/http/httprequest.js';
import { keyword } from '../keywords/keyword.js';
import { multirecordgroup, recordgroup } from '../keywords/keywordgroup.js';
import { filetypes } from '../file-types/filetypes.js';
import { getRevisions } from './revision.js';
import { getRenditions } from './rendition.js';
export class document extends base {
    constructor(id, name, typeId, createdByUserId, storedDate, documentDate, status, captureProperties) {
        super(id, name, name);
        this.typeId = typeId;
        this.createdByUserId = createdByUserId;
        this.storedDate = storedDate;
        this.documentDate = documentDate;
        this.status = status;
        this.captureProperties = captureProperties;
    }
    typeId;
    createdByUserId;
    storedDate;
    documentDate;
    status;
    captureProperties;
    keywords = [];
    recordgroups = [];
    multirecordgroups = [];
    revisions = [];
    keywordGuid = "";
    static endpoint = "/documents";
    static parse(data) {
        return new document(data.id, data.name, data.typeId, data.createdByUserId, data.storedDate, data.documentDate, data.status, data.captureProperties);
    }
    static async get(id, getKeywords, getRevisions) {
        const data = await _getbyid(id, this.endpoint);
        const doc = document.parse(data);
        if (getKeywords) {
            await doc.getKeywords();
        }
        if (getRevisions) {
            await doc.getRevisions();
        }
        return doc;
    }
    ;
    async getRevisions() {
        try {
            this.revisions = await getRevisions(this.id);
            this.revisions.forEach(async (rev) => {
                rev.rendtions = await getRenditions(this.id, rev.id);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async getKeywords() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/keywords`;
        let options = new RequestOptions(HttpMethod.GET, fullUrl, {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        }, 'follow', '');
        const response = await RunRequest(options);
        this.keywordGuid = response.data.keywordGuid;
        let keys = response.data.items.filter((item) => item.typeGroupId === undefined && item.groupId == undefined);
        keys[0].keywords.forEach(async (k) => {
            let kw = await keyword.parseAsync(k);
            this.keywords.push(kw);
        });
        console.log("Keyword Count: ", keys.length);
        let sikgs = response.data.items.filter((item) => item.typeGroupId != undefined && item.groupId == undefined);
        console.log("SIKG Count: ", sikgs.length);
        sikgs.forEach(async (item) => {
            let sikg = await recordgroup.parseAsync(item);
            this.recordgroups.push(sikg);
        });
        let mikgs = response.data.items.filter((item) => item.typeGroupId != undefined && item.groupId != undefined);
        console.log("MIKG Count: ", mikgs.length);
        mikgs.forEach(async (item) => {
            this.multirecordgroups.push(await multirecordgroup.parseAsync(item));
        });
    }
    ;
    async download(revision = "latest", rendition = "default") {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
        let data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, document.endpoint);
        let fileTypeId = data.fileTypeId;
        let filetype = await filetypes.get(fileTypeId);
    }
}
export class captureProperties {
    constructor(unidentified, reviewStatus) {
        this.unidentified = unidentified;
        this.reviewStatus = reviewStatus;
    }
    unidentified;
    reviewStatus;
    static parse(item) {
        return new captureProperties(item.unidentified, item.reviewStatus);
    }
}
