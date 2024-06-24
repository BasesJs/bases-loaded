import { base, _getbyid } from '../baseclass/baseclass.js';
import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';
import { keyword } from '../keywords/keyword.js';
import { multirecordgroup, recordgroup, multirecordgroups } from '../keywords/keywordgroup.js';
import { filetypes } from '../file-types/filetypes.js';
import { getRevisions } from './revision.js';
import { getRenditions } from './rendition.js';
export class document extends base {
    constructor(id, name, typeId, createdByUserId, storeDate, documentDate, status, captureProperties) {
        super(id, name, name);
        this.typeId = typeId;
        this.createdByUserId = createdByUserId;
        this.storeDate = storeDate;
        this.documentDate = documentDate;
        this.status = status;
        this.captureProperties = captureProperties;
    }
    typeId;
    createdByUserId;
    storeDate;
    documentDate;
    status;
    captureProperties;
    keywords = [];
    recordgroups = [];
    multirecordgroups = new multirecordgroups();
    revisions = [];
    keywordGuid = "";
    static endpoint = "/documents";
    static parse(data) {
        return new document(data.id, data.name, data.typeId, data.createdByUserId, data.storeDate, data.documentDate, data.status, data.captureProperties);
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
        let options = new RequestOptions(httpMethod.GET, fullUrl, {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        }, 'follow', '');
        const response = await RunRequest(options);
        this.keywordGuid = response.data.keywordGuid;
        response.data.items.forEach(async (item) => {
            if (item.typeGroupId === undefined && item.groupId == undefined) {
                item.keywords.forEach(async (k) => {
                    let kw = await keyword.parseAsync(k);
                    this.keywords.push(kw);
                });
            }
            else if (item.typeGroupId != undefined && item.groupId == undefined) {
                let sikg = await recordgroup.parseAsync(item);
                this.recordgroups.push(sikg);
            }
            else if (item.typeGroupId != undefined && item.groupId != undefined) {
                let mikg = await multirecordgroup.parseAsync(item);
                await this.multirecordgroups.add(mikg);
            }
        });
    }
    ;
    async download(revision = "latest", rendition = "default") {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
        let data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, document.endpoint);
        let fileTypeId = data.fileTypeId;
        let filetype = await filetypes.get(fileTypeId);
        let doc = await getDocument(this.id, document.endpoint);
    }
}
async function getDocument(id, endpoint) {
}
