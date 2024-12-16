import { _getbyid } from '../baseclass/baseclass.js';
import { RunRequest } from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { Keyword } from '../keywords/keyword.js';
import { KeywordCollectionItem } from '../keywordcollection/keywordcollection.js';
import { MultiRecordGroup, MultiRecordGroupItem, RecordGroup, RecordGroupItem } from '../keywords/keywordgroup.js';
import { FileTypes } from '../file-types/filetypes.js';
import { Revision, getRevisions } from './revisions/revision.js';
import { getRenditions } from './renditions/rendition.js';
import * as fs from 'fs/promises';

export class Document implements DocumentItem {
    id: string;
    name: string;
    typeId: string;
    createdByUserId: string;
    storedDate: string;
    documentDate: string;
    status: string;
    captureProperties?: CaptureProperties;
    keywords: Keyword[] = [];
    recordGroups: RecordGroup[] = [];
    multiRecordGroups: MultiRecordGroup[] = [];
    revisions: Revision[] = [];
    keywordGuid: string = "";
    constructor(
        id: string,
        name: string,
        typeId: string,
        createdByUserId: string,
        storedDate: string,
        documentDate: string,
        status: string,
        captureProperties?: CaptureProperties
    ) {
        this.id = id;
        this.name = name;
        this.typeId = typeId;
        this.createdByUserId = createdByUserId;
        this.storedDate = storedDate;
        this.documentDate = documentDate;
        this.status = status;
        this.captureProperties = captureProperties;
    }

    static readonly endpoint: string = "/documents";

    static parse(data: DocumentItem): Document {
        return new Document(
            data.id,
            data.name,
            data.typeId,
            data.createdByUserId,
            data.storedDate,
            data.documentDate,
            data.status,
            data.captureProperties ? CaptureProperties.parse(data.captureProperties) : undefined
        );
    }

    static async get(id: string, getKeywords = false, getRevisions = false): Promise<Document> {
        const data = await _getbyid(this.endpoint, id);
        const doc = Document.parse(data);

        if (getKeywords) {
            await doc.fetchKeywords();
        }

        if (getRevisions) {
            await doc.fetchRevisions();
        }

        return doc;
    }

    async fetchRevisions(): Promise<void> {
        try {
            this.revisions = await getRevisions(this.id);
            for (const rev of this.revisions) {
                rev.renditions = await getRenditions(this.id, rev.id);
            }
        } catch (error) {
            console.error('Error fetching revisions:', error);
        }
    }

    async fetchKeywords(): Promise<void> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${this.id}/keywords`;
        const options = new RequestOptions(fullUrl, HttpMethod.GET);
    
        try {
            const response = await RunRequest(options);
            const data: DocumentKeywordsResponse = response.data;
    
            this.keywordGuid = data.keywordGuid;
            this.keywords = await Promise.all(
                data.items.filter(item => !item.typeGroupId && !item.groupId)
                    .flatMap(item => item.keywords)
                    .map(async keyword => Keyword.parseAsync(keyword))
            );
    
            this.recordGroups = await Promise.all(
                data.items.filter(item => item.typeGroupId && !item.groupId)
                    .map(async item => await RecordGroup.parseAsync(item as RecordGroupItem))
            );
    
            data.items.filter(async (item) => {
                if (item.typeGroupId && item.groupId) {
                    const mikg = await MultiRecordGroup.parseAsync(item as MultiRecordGroupItem);
                    const existingGroup = this.multiRecordGroups.find(grp => grp.typeGroupId === mikg.typeGroupId);
                    if (existingGroup) {
                        existingGroup.recordgroups.push(mikg.recordgroups[0]);
                    } else {
                        this.multiRecordGroups.push(mikg);
                    }
                }
            });            
        } catch (error) {
            console.error('Error fetching keywords:', error);
        }
    }
    //TODO: Finish download function
    async download(revision = "latest", rendition = "default"): Promise<void> {
        try {
            const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
            const data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, Document.endpoint);
            const fileTypeId = data.fileTypeId;
            const filetype = await FileTypes.get(fileTypeId);
            // Implement the rest of the download logic
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    }
}

export class CaptureProperties {
    unidentified?: boolean;
    reviewStatus?: string;

    constructor(unidentified?: boolean, reviewStatus?: string) {
        this.unidentified = unidentified;
        this.reviewStatus = reviewStatus;
    }

    static parse(item: CapturePropertiesItem): CaptureProperties {
        return new CaptureProperties(item.unidentified, item.reviewStatus);
    }
}
interface DocumentItem {
    id: string;
    name: string;
    typeId: string;
    createdByUserId: string;
    storedDate: string;
    documentDate: string;
    status: string;
    captureProperties?: CapturePropertiesItem;
}

interface CapturePropertiesItem {
    unidentified?: boolean;
    reviewStatus?: string;
}

export interface DocumentKeywordsResponse {
    items: KeywordCollectionItem[];
    keywordGuid: string;
}



