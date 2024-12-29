import { _getbyid } from "../baseclass/baseclass.js";
import { DocumentType } from "../document-types/documenttype.js";
import { KeywordCollection, KeywordRecordCollection } from "../keyword-collections/keywordcollections.js";
import { KeywordModifier } from "../keyword-collections/keywordmodifier.js";
import { Revision, getRevisions } from "./revisions/revision.js";
import { getRenditions } from "./renditions/rendition.js";
import { DocumentKeywords } from "./keywords/documentkeywords.js";
import { DocumentContent, RetrievalOptions } from "./content/documentcontent.js";
import { getNotes, Note } from "./notes/notes.js";
import { AxiosResponse } from "axios";
import { DocumentHistory, HistoryItem } from "./history/documenthistory.js";

export class Document implements DocumentItem {
    readonly id: string;
    readonly name: string;
    readonly typeId: string;
    readonly createdByUserId: string;
    readonly storedDate: string;
    readonly documentDate: string;
    readonly status: string;
    readonly captureProperties?: CaptureProperties;
    keywordRecords?: KeywordRecordCollection;
    revisions: Revision[] = [];
    notes: Note[] = [];
    history: HistoryItem[] = [];
    documentType?: DocumentType;
    fileExtension?: string;
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
    static async parse(data: DocumentItem): Promise<Document> {
        const doc = new Document(data.id, data.name, data.typeId, data.createdByUserId, data.storedDate, data.documentDate, data.status, data.captureProperties ? CaptureProperties.parse(data.captureProperties) : undefined);
        doc.documentType = await DocumentType.get(doc.typeId);
        return doc;
    }
    /**
     * @param {string} id - The ID of the document to fetch.
     * @param {boolean} getRevisions - Whether to fetch the document's revisions. Defaults to false.
     * @param {boolean} getKeywordOptions - An object containing two properties: "getKeywords" and "unmask". If "getKeywords" is true, the keywords will be fetched. If "unmask" is true, the keywords will be unmasked.
     * @returns {Promise<Document>} The document object.
     */
    static async get(id: string, retrievalOptions?: {
        getKeywords?: boolean,
        unmaskKeywords?: boolean,
        getRevisions?: boolean,
        getNotes?: boolean,
        getHistory?: boolean
    }): Promise<Document> {
        const response = await _getbyid(this.endpoint, id);
        const doc = await Document.parse(response.data);        
        if(retrievalOptions?.getKeywords){
            await doc.getKeywords(retrievalOptions.unmaskKeywords);
        }
        if(retrievalOptions?.getRevisions){
            await doc.getRevisions();
        }
        if(retrievalOptions?.getNotes){
            await doc.getNotes();
        }
        if(retrievalOptions?.getHistory){
            await doc.getHistory();
        }
        return doc;
    }
    /**
     * @returns This is a multi-step process that will fetch the document's revisions and renditions and will populate the document's revisions and renditions properties.
     */
    async getRevisions(): Promise<void> {
        this.revisions = await getRevisions(this.id);
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
        this.keywordRecords = await KeywordRecordCollection.parse(response.data as KeywordCollection);        
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
        return await DocumentContent(this, retrievalOptions);
    }    
    /**
     * @param {Date} startDate - The start date of the history to fetch.
     * @param {Date} endDate - The end date of the history to fetch.
     * @param {number} userId - The user ID of the user to fetch history for.
     * @returns {Promise<HistoryItem[]>} The history items for the document.
     */
    async getHistory(startDate?: Date, endDate?: Date, userId?: number): Promise<void> {
        this.history = await DocumentHistory(this.id, startDate, endDate, userId);
    }/**
     *  Runs asynchronously in the case that the keywords have not been fetched yet.
     * @returns A KeywordCollectionModifier object that can be used to modify the keywords of the document.
     */
    async createKeywordModifier(): Promise<KeywordModifier>{        
        if(!this.keywordRecords){
            const response = await DocumentKeywords(this.id, true);
            this.keywordRecords = await KeywordRecordCollection.parse(response.data as KeywordCollection);
        }
        return new KeywordModifier(this.keywordRecords, this.id);
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

  