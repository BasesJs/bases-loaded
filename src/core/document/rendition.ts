import { document } from "./document.js";
import { RunRequest, RequestOptions, HttpMethod } from '../../helpers/http/httprequest.js';
import { revision } from "./revision.js";

export class rendition {
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
    static endpoint: string = "/renditions";
    static parse(item: any) {
        return new rendition(item.comment, item.created, item.createdByUserId, item.fileTypeId, item.pageCount);
    }
}

export async function getRenditions(documentId: string, revisionId: string = "latest") {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${documentId}${revision.endpoint}/${revisionId}${rendition.endpoint}`;
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
    let renditions: rendition[] = [];
    response.data.items.forEach((item: any) => {
        let rend = rendition.parse(item);
        renditions.push(rend);
    });
    return renditions;
}