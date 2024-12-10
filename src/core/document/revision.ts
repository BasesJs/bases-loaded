import { Rendition, getRenditions } from './rendition.js';
import { Document } from "./document.js";
import { RunRequest, RequestOptions, HttpMethod } from '../../http/axios/httprequest.js';

export class Revision {
    constructor(id: string, RevisionNumber: string) {
        this.id = id;
        this.RevisionNumber = RevisionNumber;
    }
    id: string;
    RevisionNumber: string;
    renditions: Rendition[] = [];
    static readonly endpoint: string = "/Revisions";
    static parse(item: any) {
        return new Revision(item.id, item.RevisionNumber);
    }
}

export async function getRevisions(documentId: string) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${documentId}${Revision.endpoint}`;
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
    let Revisions: Revision[] = [];
    response.data.items.forEach((item: any) => {
        Revisions.push(Revision.parse(item));
    });
    return Revisions;
}

