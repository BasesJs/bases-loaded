import { _getbyid } from "../baseclass/baseclass.js";
import { KeywordValueCollection } from "../keywordcollection/keywordvaluecollection.js";
import { KeywordCollection } from "../keywordcollection/keywordcollection.js";
import { Revision, getRevisions } from "./revisions/revision.js";
import { getRenditions } from "./renditions/rendition.js";
import { DocumentKeywords } from "./keywords/documentkeywords.js";
import { DocumentContent, RetrievalOptions } from "./content/documentcontent.js";
import { getNotes, Note } from "./notes/notes.js";
import { AxiosResponse } from "axios";
import { DocumentHistory, HistoryItem } from "./history/documenthistory.js";

export class Document implements DocumentItem {
    id: string;
    name: string;
    typeId: string;
    createdByUserId: string;
    storedDate: string;
    documentDate: string;
    status: string;
    captureProperties?: CaptureProperties;
    keywordCollection?: KeywordValueCollection;
    revisions: Revision[] = [];
    notes: Note[] = [];
    history: HistoryItem[] = [];
    keywordGuid: string = "";
    constructor(id: string, name: string, typeId: string, createdByUserId: string, storedDate: string,documentDate: string,status: string,captureProperties?: CaptureProperties) {
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
    private static parse(data: DocumentItem): Document {
        return new Document(data.id, data.name, data.typeId, data.createdByUserId, data.storedDate, data.documentDate, data.status, data.captureProperties ? CaptureProperties.parse(data.captureProperties) : undefined);
    }
    /**
     * @param {string} id - The ID of the document to fetch.
     * @param {boolean} getRevisions - Whether to fetch the document's revisions. Defaults to false.
     * @param {boolean} getKeywordOptions - An object containing two properties: "getKeywords" and "unmask". If "getKeywords" is true, the keywords will be fetched. If "unmask" is true, the keywords will be unmasked.
     * @returns {Promise<Document>} The document object.
     */
    static async get(id: string, getRevisions: boolean = false, getKeywordOptions?:{ getKeywords: boolean, unmask: boolean }, getNotes: boolean = false, getHistory: boolean = false): Promise<Document> {
        const response = await _getbyid(this.endpoint, id);
        const doc = Document.parse(response.data);
        if (getRevisions) {
            await doc.getRevisions();
        }
        if (getKeywordOptions) {
            if(getKeywordOptions.getKeywords){
            await doc.getKeywords(getKeywordOptions.unmask);
            }
        }
        if(getNotes){
            await doc.getNotes();
        }
        if(getHistory){
            await doc.getHistory();
        }
        return doc;
    }
    /**
     * @returns This is a multi-step process that will fetch the document's revisions and renditions and will populate the document's revisions and renditions properties.
     */
    async getRevisions(): Promise<void> {
        try {
            this.revisions = await getRevisions(this.id);
            for (const rev of this.revisions) {
                rev.renditions = await getRenditions(this.id, rev.id);
            }
        } catch (error) {
            console.error("Error fetching revisions:", error);
        }
    }
    /**
     * @param {string} revisionId - The revision ID to fetch notes for. Defaults to "latest" providing the most recent revision.
     * @returns This is a multi-step process that will fetch the document's notes and will populate the document's notes properties.
     */
    async getNotes(revisionId: string = "latest"): Promise<void> {
        try {
            this.notes = await getNotes(this.id, revisionId);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }
    /**
     * @param unmask This will provide the unmasked values for any keywords that are masked.
     */
    async getKeywords(unmask: boolean = true): Promise<void> {
        const response = await DocumentKeywords(this.id, unmask);
        this.keywordCollection = await KeywordValueCollection.parse(response.data as KeywordCollection);        
    }
    /**
     * @param {RetrievalOptions} retrievalOptions - An object containing the retrieval options for the document content.
     * @returns {Promise<AxiosResponse>} The response data provides the document content as a binary string.
     */
    async getContent(retrievalOptions: RetrievalOptions =
        { 
            revisionId: "latest", 
            renditionId: "default", 
            contentParams: undefined, 
            accepts: "*/*" 
        }): Promise<AxiosResponse> {
        return await DocumentContent(this.id, retrievalOptions);
    }    
    /**
     * @param {Date} startDate - The start date of the history to fetch.
     * @param {Date} endDate - The end date of the history to fetch.
     * @param {number} userId - The user ID of the user to fetch history for.
     * @returns {Promise<HistoryItem[]>} The history items for the document.
     */
    async getHistory(startDate?: Date, endDate?: Date, userId?: number): Promise<void> {
        this.history = await DocumentHistory(this.id, startDate, endDate, userId);
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

  