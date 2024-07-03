import { document } from "./document.js";
import { RunRequest, RequestOptions, HttpMethod } from '../../helpers/http/httprequest.js';
export class revision {
    constructor(id, revisionNumber) {
        this.id = id;
        this.revisionNumber = revisionNumber;
    }
    id;
    revisionNumber;
    rendtions = [];
    static endpoint = "/revisions";
    static parse(item) {
        return new revision(item.id, item.revisionNumber);
    }
}
export async function getRevisions(documentId) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${documentId}${revision.endpoint}`;
    let options = new RequestOptions(HttpMethod.GET, fullUrl, {
        'Content-Type': 'application/json',
        'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
    }, 'follow', '');
    const response = await RunRequest(options);
    let revisions = [];
    response.data.items.forEach((item) => {
        revisions.push(revision.parse(item));
    });
    return revisions;
}
