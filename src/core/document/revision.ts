import { rendition, getRenditions } from './rendition.js';
import { document } from "./document.js";
import { RunRequest, RequestOptions, HttpMethod } from '../../helpers/http/httprequest.js';

export class revision {
    constructor(id:string, revisionNumber:string){
        this.id = id;
        this.revisionNumber = revisionNumber;
    }
    id:string;
    revisionNumber:string;
    rendtions:rendition[] = [];
    static endpoint:string = "/revisions";
    static parse(item:any){
        return new revision(item.id, item.revisionNumber);        
    }
}

export async function getRevisions(documentId:string){ 
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${documentId}${revision.endpoint}`;
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
    let revisions:revision[] = [];
    response.data.items.forEach((item:any) => {
        revisions.push(revision.parse(item));        
    });
    return revisions;
}

