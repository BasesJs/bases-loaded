import { Document } from "./document.js";
import { RunRequest, RequestOptions, HttpMethod, DefaultHeaders } from '../../http/axios/httprequest.js';
import { Revision } from "./revision.js";

export class Rendition implements RenditionItem {
    comment: string;
    created: string;
    createdByUserId: string;
    fileTypeId: string;
    pageCount: string;

    constructor(comment: string, created: string, createdByUserId: string, fileTypeId: string, pageCount: string) {
        this.comment = comment;
        this.created = created;
        this.createdByUserId = createdByUserId;
        this.fileTypeId = fileTypeId;
        this.pageCount = pageCount;
    }

    static readonly endpoint: string = "/Renditions";

    static parse(item: RenditionItem): Rendition {
        return new Rendition(item.comment, item.created, item.createdByUserId, item.fileTypeId, item.pageCount);
    }
}

export async function getRenditions(documentId: string, revisionId: string = "latest"): Promise<Rendition[]> {
    const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${documentId}${Revision.endpoint}/${revisionId}${Rendition.endpoint}`;
    const options = new RequestOptions(
        HttpMethod.GET,
        fullUrl,
        DefaultHeaders('application/json'),
        ''
    );

    try {
        const response = await RunRequest(options);
        return response.data.items.map((item: RenditionItem) => Rendition.parse(item));
    } catch (error) {
        console.error('Failed to get renditions:', error);
        throw error;
    }
}

interface RenditionItem {
    comment: string;
    created: string;
    createdByUserId: string;
    fileTypeId: string;
    pageCount: string;
}