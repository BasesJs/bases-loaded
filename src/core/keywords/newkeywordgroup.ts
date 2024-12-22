import { NewKeyword, NewKeywordValue } from "./newkeyword.js";
import { NewMultiRecordGroupItem, NewRecordGroupItem, KeywordItem } from "./keywordinterfaces.js";

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
