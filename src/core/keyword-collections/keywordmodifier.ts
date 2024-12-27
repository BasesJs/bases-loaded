import { Document } from "../document/document.js";
import { KeywordItem } from '../keyword/keyword.js';
import { KeywordCollectionItem, KeywordRecordCollection } from './keywordcollections.js';
import { RecordGroupItem } from '../keyword-groups/keywordgroup.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { RunRequest } from '../../http/httprequest.js';
import { AddKeyword, UpdateKeyword, DeleteKeyword } from './utilities/keywordactions.js';

export class KeywordModifier {
    keywordGuid: string;
    items: KeywordCollectionItem[];
    documentId?: string;

    constructor(keywordCollection: KeywordRecordCollection, documentId?: string) {
        this.keywordGuid = keywordCollection.keywordGuid;
        this.items = keywordCollection.items;
        this.documentId = documentId;
    }
    /**
     * Applies any modifications to the keyword collection of the document. 
     * NOTE: This is only valid for modifying existing documents. When using the KeywordModifier object for archiving new documents, it only needs to be ttached to the DocumentImport object.
     * /documents/{documentId}/keywords
     * PUT/POST
     * @param asReindex Performs modification of keyword data during indexing processes like Reindex and Archival, using POST vs PUT.
     * @returns 
     */
    async apply(asReindex: boolean = false): Promise</*AxiosResponse*/any> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${this.documentId}/keywords`
        const body = JSON.stringify({
            keywordGuid: this.keywordGuid,
            items: this.items
        });
        const options = new RequestOptions({
            url: fullUrl,
            method: asReindex ? HttpMethod.POST : HttpMethod.PUT,
            data: body,
            validateStatus: (status: number) => status === 204
        });
        return await RunRequest(options);        
    }
    /**
     * Adds (not updates) a new value to the keyword in the keyword collection for Standalone Keywords and Single Instance Keyword Groups. Standalone Keywords usually can have more than one value, however, Single Instance Keyword Groups can only have one value. 
     * @param keyword represents a keyword Item that passes a value array.
     * @returns void
     */
    async addKeyword(keyword: KeywordItem, instanceId?: string): Promise<void> {
        const existingKeywords = await Promise.all(this.items.filter(async (item) => {
            //IF STANDALONE KEYWORD
            if (instanceId === undefined && !item.typeGroupId && !item.instanceId) {
                await AddKeyword(item, keyword);
            }
            //IF SINGLE INSTACE KEYWORD GROUP
            if (item.typeGroupId && !item.instanceId){
                const existingKeyword = item.keywords.find(it => it.typeId === keyword.typeId);
                if(existingKeyword?.values){
                    throw new Error(`The keyword you are trying to add already exists and has a value in single instance keyword group ${item.typeGroupId} with the value ${existingKeyword.values[0].value}. Only one value per keyword is allowed in a single instance keyword group.`);
                }
                else if(existingKeyword && keyword.values){
                    keyword.values.length = 1;
                    existingKeyword.values = keyword.values;
                }  
            }
            if((instanceId !== undefined && item.instanceId !== undefined) && (item.instanceId === instanceId)){
                if(keyword.values){
                    keyword.values.length = 1;
                }
                await AddKeyword(item, keyword);
            }
            
        }));
        if (!existingKeywords) {
            throw new Error("Keyword Collection does not contain any standalone keywords.");
        }
    }
    /**
     * Updates the keyword in the keyword collection for Standalone Keywords and Single Instance Keyword Groups. Standalone Keywords usually can have more than one value, however, Single Instance Keyword Groups can only have one value. 
     * @param oldKeywordValue The value of the keyword to update.
     * @param newKeyword The new keyword to update the old keyword with.
     */
    async updateKeyword(oldKeywordValue: string, newKeyword: KeywordItem, instanceId?: string): Promise<void> {
        const existingKeywords = await Promise.all(this.items.filter(async (item) => {
            if (instanceId === undefined && !item.typeGroupId && !item.instanceId) {
                await UpdateKeyword(item, oldKeywordValue, newKeyword);
            }
            //IF SINGLE INSTACE KEYWORD GROUP
            if (instanceId === undefined && item.typeGroupId && !item.instanceId){
                if(newKeyword.values){
                    newKeyword.values.length = 1;
                }
                await UpdateKeyword(item, oldKeywordValue, newKeyword);
            }
            if((instanceId !== undefined && item.instanceId !== undefined) && (item.instanceId === instanceId)){
                if(newKeyword.values){
                    newKeyword.values.length = 1;
                }
                await UpdateKeyword(item, oldKeywordValue, newKeyword);
            }
                              
        }));
        if (!existingKeywords) {
            throw new Error("Keyword Collection does not contain any keywords of this type.");
        }
    }
    async deleteKeyword(typeId: string, specificValue?: string, instanceId?: string): Promise<void> {
        const existingKeywords = this.items.filter(async (item) => {
            if (instanceId === undefined && !item.typeGroupId && !item.instanceId) {
                await DeleteKeyword(item, typeId, specificValue);
            }
            //IF SINGLE INSTACE KEYWORD GROUP
            if (instanceId === undefined && item.typeGroupId !== undefined && item.instanceId === undefined){
                await DeleteKeyword(item, typeId, specificValue);
            }
            //IF MULTI INSTANCE KEYWORD GROUP
            if((instanceId !== undefined && item.instanceId !== undefined) && (item.instanceId === instanceId) && (item.typeGroupId === typeId)){
                await DeleteKeyword(item, typeId, specificValue);
            }
        });
        if (!existingKeywords) {
            throw new Error("Keyword Collection does not contain any standalone keywords.");
        }
    }
    /**
     * Remove all keywords from the single instance keyword or multi instance group with the specified identifiers. To remove specific keywords, use the deleteKeyword function..
     * @param typeGroupId The group's identifier.
     * @param instanceId The instance's identifier.
     */
    async deleteKeywordGroup(typeGroupId: string, instanceId?: string): Promise<void> {
        const existingKeywordGroup = this.items.filter(async (item) => {
            if((instanceId !== undefined && item.instanceId === instanceId) && (item.typeGroupId === typeGroupId)){
                item.keywords.forEach(async (keyword) => {
                    await DeleteKeyword(item, keyword.typeId);                    
                });
            }
            else if((instanceId === undefined) && (item.typeGroupId === typeGroupId)){
                item.keywords.forEach(async (keyword) => {
                    await DeleteKeyword(item, keyword.typeId);                    
                });
            }            
        });
        if (!existingKeywordGroup) {
            throw new Error("KeywordGroup does not exist in the collection.");
        }
    }
    async addKeywordGroup(multiKeywordGroup: RecordGroupItem): Promise<void> {
        const existingMultiKeywordGroup = this.items.filter(async (item) => {
            if (item.typeGroupId === multiKeywordGroup.typeGroupId) {
                multiKeywordGroup.keywords.forEach(async (keyword) => {
                    await AddKeyword(item, keyword);                    
                });
            }
        });
        if(!existingMultiKeywordGroup){
            throw new Error("Multi Instance KeywordGroup does not exist in the collection.");
        }
    }
}

export class KeywordRecordModifier {
    constructor(typeGroupId: string, instanceId: string, keywords: KeywordCollectionItem[], documentId?: string) {
        this.typeGroupId = typeGroupId;
        this.instanceId = instanceId;
        this.documentId = documentId;
        this.keywords = keywords;
    }
    typeGroupId: string;
    instanceId: string;
    documentId?: string;
    keywords: KeywordCollectionItem[];
    
}