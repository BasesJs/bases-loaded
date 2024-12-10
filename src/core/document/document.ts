import { base, _getbyid } from '../baseclass/baseclass.js';
import { RunRequest, RequestOptions, HttpMethod } from '../../http/axios/httprequest.js';
import { Keyword } from '../keywords/keyword.js';
import { MultiRecordGroup, RecordGroup } from '../keywords/keywordgroup.js';
import { FileTypes } from '../file-types/filetypes.js';
import { Revision, getRevisions } from './revision.js';
import { getRenditions } from './rendition.js';
export class Document extends base {
    constructor(id: string, name: string, typeId: string, createdByUserId: string, storedDate: string, documentDate: string, status: string, captureProperties?: CaptureProperties) {
        super(id, name, name);
        this.typeId = typeId;
        this.createdByUserId = createdByUserId;
        this.storedDate = storedDate;
        this.documentDate = documentDate;
        this.status = status;
        this.captureProperties = captureProperties;
    }
    typeId: string;
    createdByUserId: string;
    storedDate: string;
    documentDate: string;
    status: string;
    captureProperties?: CaptureProperties;
    keywords: Keyword[] = [];
    recordgroups: RecordGroup[] = [];
    multirecordgroups: MultiRecordGroup[] = [];
    revisions: Revision[] = [];
    keywordGuid: string = "";
    static readonly endpoint: string = "/documents";
    static parse(data: any): Document {
        return new Document(data.id, data.name, data.typeId, data.createdByUserId, data.storedDate, data.documentDate, data.status, data.captureProperties);
    }
    static async get(id: string, getKeywords: boolean, getRevisions: boolean): Promise<any> {
        const data = await _getbyid(id, this.endpoint);
        const doc = Document.parse(data);
        if (getKeywords) {
            await doc.getKeywords();
        }
        if (getRevisions) {
            await doc.getRevisions();
        }
        return doc;
    };
    async getRevisions(): Promise<any> {
        try {
            this.revisions = await getRevisions(this.id);
            this.revisions.forEach(async (rev: Revision) => {
                rev.renditions = await getRenditions(this.id, rev.id);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async getKeywords(): Promise<any> {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${this.id}/keywords`;
        let options = new RequestOptions(
            HttpMethod.GET,
            fullUrl,
            {
                'Content-Type': 'application/json',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',
            '');
        const response = await RunRequest(options);
        this.keywordGuid = response.data.keywordGuid;
        let keys = response.data.items.filter((item: any) => item.typeGroupId === undefined && item.groupId == undefined);
        keys[0].keywords.forEach(async (k: any) => {
            let kw = await Keyword.parseAsync(k);
            this.keywords.push(kw);
        });
        let sikgs = response.data.items.filter((item: any) => item.typeGroupId != undefined && item.groupId == undefined);
        sikgs.forEach(async (item: any) => {
            let sikg = await RecordGroup.parseAsync(item);
            this.recordgroups.push(sikg);
        });
        let mikgs = response.data.items.filter((item: any) => item.typeGroupId != undefined && item.groupId != undefined);
        mikgs.forEach(async (item: any) => {
            let mikg = await MultiRecordGroup.parseAsync(item);
            let existingGroup = this.multirecordgroups.find(grp => grp.typeGroupId === mikg.typeGroupId);
            if(existingGroup !== undefined){
                existingGroup.recordgroups.push(mikg.recordgroups[0]);
            }
            else{
                this.multirecordgroups.push(mikg);
            }
        });
        //TODO: Sort multirecordgroups by typeGroupId or 
        // this.multirecordgroups.sort((a: MultiRecordGroup, b: MultiRecordGroup) => {
        //     if (a.typeGroupId < b.typeGroupId) {
        //         return -1;
        //     }
        //     if (a.typeGroupId > b.typeGroupId) {
        //         return 1;
        //     }
        //     return 0;
        // });
        console.log(this.multirecordgroups);
    };
    async download(revision: string = "latest", rendition: string = "default"): Promise<any> {
        //TODO: Finish download function
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
        let data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, Document.endpoint);
        let fileTypeId = data.fileTypeId;
        let filetype = await FileTypes.get(fileTypeId);
    }
}
export class CaptureProperties {
    constructor(unidentified?: boolean, reviewStatus?: string) {
        this.unidentified = unidentified;
        this.reviewStatus = reviewStatus;
    }
    unidentified?: boolean;
    reviewStatus?: string;
    static parse(item: any) {
        return new CaptureProperties(item.unidentified, item.reviewStatus);
    }
}