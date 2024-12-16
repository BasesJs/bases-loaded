import { Keyword, NewKeyword, KeywordItem } from './keyword.js';
import { KeywordTypeGroup } from '../keyword-type-groups/keywordtypegroup.js';
import { KeywordCollectionItem, DefaultKeywordCollectionItem } from '../../core/keywordcollection/keywordcollection.js';

export class RecordGroup implements RecordGroupItem {
    constructor(typeGroupId: string, keywords: Keyword[], instanceId?: string, name?: string) {
        this.typeGroupId = typeGroupId;
        this.instanceId = instanceId;
        this.keywords = keywords;
        this.name = name;
    }
    typeGroupId: string;
    name: string | undefined;
    keywords: Keyword[];
    instanceId?: string;
    static parse(item: RecordGroupItem) {
        if (item.keywords === undefined) {
            console.log("Item has no keywords");
        }
        let keywords: Keyword[] = item.keywords.map((kw: KeywordItem) => Keyword.parse(kw));
        return new RecordGroup(item.typeGroupId || '', keywords, item.instanceId ? item.instanceId : undefined);
    }
    static async parseAsync(item: RecordGroupItem) {
        if (item.keywords === undefined) {
            console.log("Item has no keywords");
        }
        let keywords: Keyword[] = await Promise.all(item.keywords.map(async (kw: KeywordItem) => await Keyword.parseAsync(kw)));
        let groupcfg = await KeywordTypeGroup.get(item.typeGroupId);
        if (!groupcfg) {
            throw new Error("Group configuration is null");
        }
        return new RecordGroup(item.typeGroupId || '', keywords, item.instanceId ? item.instanceId : undefined, groupcfg.name ? groupcfg.name : undefined);
    }
} 
export class MultiRecordGroup  {
    constructor(typeGroupId: string) {
        this.typeGroupId = typeGroupId;
    }
    typeGroupId: string;
    recordgroups: RecordGroup[] = [];
    name: string = "";
    add(item: MultiRecordGroupItem) {
        if(item.typeGroupId === undefined){
            throw new Error("typeGroupId is undefined");
        }
        else if(item.typeGroupId !== this.typeGroupId){
            throw new Error("typeGroupId does not match");
        }
        //let keywords: Keyword[] = item.keywords.map((kw: KeywordItem) => Keyword.parse(kw));
        //let record = new RecordGroup(item.groupId, keywords, item.instanceId);
        this.recordgroups.push(RecordGroup.parse(item));
    }
    static parse(item: MultiRecordGroupItem) {
        let group: MultiRecordGroup = new MultiRecordGroup(item.typeGroupId);
        KeywordTypeGroup.get(item.typeGroupId)
            .then((groupcfg: any) => {
                group.name = groupcfg.name;
            })
            .catch((e: any) => {
                console.log(e);
            });
        return group;
    }
    static async parseAsync(item: MultiRecordGroupItem) {
        if (!item.typeGroupId) {
            throw new Error("typeGroupId is undefined");
        }
        let group = new MultiRecordGroup(item.typeGroupId);
        let groupcfg = await KeywordTypeGroup.get(item.typeGroupId);
        if (groupcfg !== null) {
            group.name = groupcfg.name;
        }
        let keywords: Keyword[] = item.keywords.map((kw: KeywordItem) => Keyword.parse(kw));
        let record = new RecordGroup(item.groupId, keywords, item.instanceId);
        group.recordgroups.push(await RecordGroup.parseAsync(item));
        return group;
    } 
} 
export class NewRecordGroup {
    constructor(typeGroupId: string, keywords: NewKeyword[] = []) {
        this.typeGroupId = typeGroupId;
        this.keywords = keywords;
    }
    typeGroupId: string;
    keywords: NewKeyword[];
    static parse(item: NewRecordGroupItem) {
        if (!item.typeGroupId) {
            throw new Error("typeGroupId is undefined");
        }
        let typeGroupId = item.typeGroupId;
        let keywords: NewKeyword[] = [];
        item.keywords.forEach(async (kw: KeywordItem) => {
            keywords.push(NewKeyword.parse(kw));
        });
        return new NewRecordGroup(typeGroupId, keywords);
    }
}
export class NewMultiRecordGroup {
    constructor(typeGroupId: string, instanceId: string, keywords: NewKeyword[] = []) {
        this.typeGroupId = typeGroupId;
        this.instanceId = instanceId;
        this.keywords = keywords;
    }
    typeGroupId: string;
    instanceId: string;
    keywords: NewKeyword[];
    static parse(item: NewMultiRecordGroupItem) {
        if(item.typeGroupId === undefined){
            throw new Error("typeGroupId is undefined");
        }
        let instanceId = item.instanceId;
        let keywords: NewKeyword[] = [];
        item.keywords.forEach(async (kw: any) => {
            keywords.push(NewKeyword.parse(kw));
        });        
        return new NewMultiRecordGroup(item.typeGroupId, instanceId, keywords);
    }
}
export interface MultiRecordGroupItem extends KeywordCollectionItem {
    typeGroupId: string; 
    keywords: KeywordItem[];    
    groupId: string;
    instanceId: string;
}
export interface RecordGroupItem extends KeywordCollectionItem{
    typeGroupId: string; 
    keywords: KeywordItem[];    
    groupId?: string;
    instanceId?: string;
}
export interface NewRecordGroupItem extends DefaultKeywordCollectionItem {
    typeGroupId?: string;
    keywords: KeywordItem[];
}
export interface NewMultiRecordGroupItem extends DefaultKeywordCollectionItem {
    typeGroupId?: string;
    keywords: KeywordItem[];
    instanceId: string;
}

