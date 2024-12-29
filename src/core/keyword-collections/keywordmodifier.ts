import { Bases } from '../../bases.js';
import { Core } from '../core.js';
import { Document } from "../document/document.js";
import { KeywordItem } from '../keyword/keyword.js';
import { KeywordCollection, KeywordCollectionItem, KeywordRecordCollection } from './keywordcollections.js';
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
        const fullUrl = `${Bases.apiURI}${Core.endpoint}${Document.endpoint}/${this.documentId}/keywords`
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
    async addKeyword(keyword: KeywordItem): Promise<void> {
        const existingKeywords = await Promise.all(this.items.filter(async (item) => {
            //IF STANDALONE KEYWORD
            if (item.typeGroupId === undefined && item.instanceId !== undefined) {
                await AddKeyword(item, keyword);
            }
            //IF SINGLE INSTACE KEYWORD GROUP
            if (item.typeGroupId !== undefined && item.instanceId === undefined){
                const existingKeyword = item.keywords.find(it => it.typeId === keyword.typeId);
                 if(existingKeyword && keyword.values){
                    keyword.values.length = 1;
                    existingKeyword.values = keyword.values;
                }  
            }
            //IF MULTI INSTANCE KEYWORD GROUP
            if(item.typeGroupId !== undefined && item.instanceId !== undefined){
                throw new Error("To add a keyword to a multi instance keyword group, use the addKeywordGroup function.");
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
        const existingKeywordGroup = this.items.filter(async (item, index, array) => {
            if((instanceId !== undefined && item.instanceId === instanceId) && (item.typeGroupId === typeGroupId)){
                array.splice(index, 1);
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
    /**
     * Adds the KeywordGroupModifier object to the KeywordRecordCollection. If the instanceId is present in the KeywordGroupModifier, it will update the existing multi instance keyword group. If the instanceId is not present, it will add a new multi instance keyword group item..
     * @param groupMod The KeywordGroupModifier object that contains the new or modified keywords.
     */
    async addKeywordGroup(groupMod: KeywordGroupModifier): Promise<void> {
        //If the groupMod has an instanceId, it's a MIKG and we should splice the old one out and add the new one.
        if(groupMod.instanceId !== undefined){
            const existingKeywordGroup = await Promise.all(this.items.filter(async (item, index, array) => {
                if(item.typeGroupId === groupMod.typeGroupId && item.instanceId === groupMod.instanceId){
                    array.splice(index, 1, groupMod as KeywordCollectionItem);
                }
            }));
            if(!existingKeywordGroup){
                throw new Error("KeywordGroup does not exist in the collection.");
            }
            //this.items.push(groupMod); if the splice and insert doesn't work, this is the only way to add a new MIKG
        }
        if(groupMod.instanceId === undefined){
            const existingKeywordGroup = await Promise.all(this.items.filter(async (item, index, array) => {
                if(item.typeGroupId === groupMod.typeGroupId){
                    array.splice(index, 1, groupMod as KeywordCollectionItem);
                }
            }));
            if(!existingKeywordGroup){
                throw new Error("KeywordGroup does not exist in the collection.");
            }
        }
    }
    /**
     * Creates a KeywordGroupModifier object that can be used to add or update keywords in a KeywordGroup. Primarily used for Multi Instance Keyword Groups, you can also use it for a single instance keyword group, but it will overwrite any existing keyword values.
     * @param typeGroupId Supply a typeGroupId for the group you want to create or modify a record for.
     * @param instanceId Supply an instanceId to modify an existing Multi Instance Keyword Group, the existing keywords will be present in the KeywordGroupModifier object.
     * @returns a KeywordGroupModifier object that can be used to add or update keywords and then be added back to the KeywordRecordCollection.
     */
    createKeywordGroupModifier(typeGroupId: string, instanceId?: string): KeywordGroupModifier | void {
        let keyMod: KeywordGroupModifier | undefined;
        if (instanceId !== undefined) {
            this.items.forEach((item) => {
                if (item.typeGroupId === typeGroupId && item.instanceId === instanceId) {
                    keyMod = new KeywordGroupModifier(typeGroupId, item.keywords, instanceId);
                }
            });
            if (!keyMod) {
                throw new Error(`A KeywordGroup with the typeGroupId of ${typeGroupId} and instanceId ${instanceId} does not exist in the collection.`);
            }
        } else if (instanceId === undefined) {
            this.items.forEach((item) => {
                if (item.typeGroupId === typeGroupId) {
                    keyMod = new KeywordGroupModifier(typeGroupId, item.keywords);
                }
            });
            if (!keyMod) {
                throw new Error(`A KeywordGroup with the typeGroupId of ${typeGroupId} does not exist in the collection.`);
            }
        }    
        return keyMod;
    }
}

export class KeywordGroupModifier implements KeywordCollectionItem {
    constructor(typeGroupId: string, keywords: KeywordItem[], instanceId?: string,) {
        this.typeGroupId = typeGroupId;
        this.instanceId = instanceId;
        this.keywords = keywords;
    }
    typeGroupId: string;
    instanceId?: string;
    keywords: KeywordItem[]; 
    
    /**
     * Add a new KeywordItem to the KeywordGroupModifier. If the KeywordItem is passed with multiple values, only the first value will be used as keyword groups can only have one value per keyword. 
     * @param keyword The KeywordItem that contains the keyword and its values.
     */
    async addKeyword(keyword: KeywordItem): Promise<void> {
        if (this.typeGroupId && !this.instanceId){
            const existingKeyword = this.keywords.find(it => it.typeId === keyword.typeId);
            if(existingKeyword?.values){
                throw new Error(`The keyword you are trying to add already exists and has a value in single instance keyword group ${this.typeGroupId} with the value ${existingKeyword.values[0].value}. Only one value per keyword is allowed in a single instance keyword group.`);
            }
            else if(existingKeyword && keyword.values){
                keyword.values.length = 1;
                existingKeyword.values = keyword.values;
            }  
        }
        //IF MULTI INSTANCE KEYWORD GROUP
        if(this.instanceId !== undefined){
            if(keyword.values){
                keyword.values.length = 1;
            }
            await AddKeyword(this, keyword);
        }
    }
    async updateKeyword(oldKeywordValue: string, newKeyword: KeywordItem): Promise<void> {
        //IF SINGLE INSTACE KEYWORD GROUP
        if (this.typeGroupId && !this.instanceId){
            if(newKeyword.values){
                newKeyword.values.length = 1;
            }
            await UpdateKeyword(this, oldKeywordValue, newKeyword);
        }
        if(this.instanceId !== undefined){
            if(newKeyword.values){
                newKeyword.values.length = 1;
            }
            await UpdateKeyword(this, oldKeywordValue, newKeyword);
        }
    }
    async deleteKeyword(typeId: string, specificValue?: string): Promise<void> {
        //IF SINGLE INSTACE KEYWORD GROUP
        if (this.instanceId === undefined){
            await DeleteKeyword(this, typeId, specificValue);
        }
        //IF MULTI INSTANCE KEYWORD GROUP
        if(this.instanceId !== undefined){
            await DeleteKeyword(this, typeId, specificValue);
        }
    }
}