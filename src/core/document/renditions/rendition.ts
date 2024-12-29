import { Core } from "../../core.js";
import { Document } from "../document.js";
import { RunRequest} from '../../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';
import { Revision } from "../revisions/revision.js";
import { Bases } from "../../../bases.js";

export class Rendition implements RenditionItem {
    static readonly endpoint: string = "/Renditions";
    readonly comment: string;
    readonly created: string;
    readonly createdByUserId: string;
    readonly fileTypeId: string;
    readonly pageCount: string;

    constructor(comment: string, created: string, createdByUserId: string, fileTypeId: string, pageCount: string) {
        this.comment = comment;
        this.created = created;
        this.createdByUserId = createdByUserId;
        this.fileTypeId = fileTypeId;
        this.pageCount = pageCount;
    }
    static parse(item: RenditionItem): Rendition {
        return new Rendition(item.comment, item.created, item.createdByUserId, item.fileTypeId, item.pageCount);
    }
}

export async function getRenditions(documentId: string, revisionId: string = "latest"): Promise<Rendition[]> {
    const fullUrl = `${Bases.apiURI}${Core.endpoint}${Document.endpoint}/${documentId}${Revision.endpoint}/${revisionId}${Rendition.endpoint}`;
    const options = new RequestOptions({ url: fullUrl, method: HttpMethod.GET });

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