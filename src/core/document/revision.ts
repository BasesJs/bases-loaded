import { Rendition, getRenditions } from './rendition.js';
import { Document } from "./document.js";
import { RunRequest, RequestOptions, HttpMethod } from '../../http/axios/httprequest.js';

export class Revision implements RevisionItem {
    id: string;
    revisionNumber: string;
    renditions: Rendition[] = [];

    constructor(id: string, revisionNumber: string) {
        this.id = id;
        this.revisionNumber = revisionNumber;
    }

    static readonly endpoint: string = "/Revisions";

    static parse(item: RevisionItem): Revision {
        return new Revision(item.id, item.revisionNumber);
    }
}

export async function getRevisions(documentId: string): Promise<Revision[]> {
    const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${documentId}${Revision.endpoint}`;
    const options = new RequestOptions(
        HttpMethod.GET,
        fullUrl,
        {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        },
        'follow',
        ''
    );

    try {
        const response = await RunRequest(options);
        return response.data.items.map((item: RevisionItem) => Revision.parse(item));
    } catch (error) {
        console.error('Failed to get revisions:', error);
        throw error;
    }
}

interface RevisionItem {
    id: string;
    revisionNumber: string;
}