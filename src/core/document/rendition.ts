import { Document } from "./document.js";
import { RunRequest, RequestOptions, HttpMethod } from '../../http/axios/httprequest.js';
import { Revision } from "./revision.js";

export class Rendition {
    constructor(comment: string, created: string, createdByUserId: string, fileTypeId: string, pageCount: string) {
        this.comment = comment;
        this.created = created;
        this.createdByUserId = createdByUserId;
        this.fileTypeId = fileTypeId;
        this.pageCount = pageCount;
    }
    comment: string;
    created: string;
    createdByUserId: string;
    fileTypeId: string;
    pageCount: string;
    static readonly endpoint: string = "/Renditions";
    static parse(item: any) {
        return new Rendition(item.comment, item.created, item.createdByUserId, item.fileTypeId, item.pageCount);
    }
}

export async function getRenditions(documentId: string, revisionId: string = "latest") {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${documentId}${Revision.endpoint}/${revisionId}${Rendition.endpoint}`;
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
    let Renditions: Rendition[] = [];
    response.data.items.forEach((item: any) => {
        let rend = Rendition.parse(item);
        Renditions.push(rend);
    });
    return Renditions;
}