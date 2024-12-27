import { Rendition, getRenditions } from '../renditions/rendition.js';
import { Document } from "../document.js";
import { RunRequest } from '../../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';

export class Revision implements RevisionItem {
    readonly id: string;
    readonly revisionNumber: string;
    readonly renditions: Rendition[] = [];

    constructor(id: string, revisionNumber: string, renditions: Rendition[] = []) {
        this.id = id;
        this.revisionNumber = revisionNumber;
        this.renditions = renditions;
    }

    static readonly endpoint: string = "/Revisions";

    static async parse(item: RevisionItem): Promise<Revision> {
        const renditions = await getRenditions(item.id, item.revisionNumber);
        return new Revision(item.id, item.revisionNumber, renditions);
    }
}

export async function getRevisions(documentId: string): Promise<Revision[]> {
    const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${documentId}${Revision.endpoint}`;
    const options = new RequestOptions({ url: fullUrl, method: HttpMethod.GET });
    const response = await RunRequest(options);
    return response.data.items.map((item: RevisionItem) => Revision.parse(item));
}

interface RevisionItem {
    id: string;
    revisionNumber: string;
}