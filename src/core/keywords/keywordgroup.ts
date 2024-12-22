import { Keyword } from './keyword.js';
import { KeywordTypeGroup } from '../keyword-type-groups/keywordtypegroup.js';
import { KeywordCollectionItem} from '../keywordcollection/keywordcollection.js';
import { KeywordItem, RecordGroupItem, MultiRecordGroupItem } from "./keywordinterfaces.js";

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
    static async parse(item: RecordGroupItem) {
        if (item.keywords === undefined) {
            console.log("Item has no keywords");
        }
        let keywords: Keyword[] = await Promise.all(item.keywords.map(async (kw: KeywordItem) => Keyword.parse(kw)));
        let groupcfg = await KeywordTypeGroup.get(item.typeGroupId);
        if (!groupcfg) {
            throw new Error("Group configuration is null");
        }
        return new RecordGroup(item.typeGroupId || '', keywords, item.instanceId ? item.instanceId : undefined, groupcfg.name ? groupcfg.name : undefined);
    }
} 
export class MultiRecordGroupChild implements KeywordCollectionItem {
    constructor(groupId: string, instanceId: string, keywords: Keyword[]) {
        this.groupId = groupId;
        this.instanceId = instanceId;
        this.keywords = keywords;
    }
    groupId: string;
    instanceId: string;
    keywords: Keyword[];
    static async parse(item: MultiRecordGroupItem) {
        let keywords: Keyword[] = await Promise.all(item.keywords.map(async (kw: KeywordItem) => Keyword.parse(kw)));
        return new MultiRecordGroupChild(item.groupId, item.instanceId, keywords);
    }
}
export class MultiRecordGroup {   
    constructor(typeGroupId: string) {
        this.typeGroupId = typeGroupId;
    }
    typeGroupId: string = "";
    name: string = "";
    records: MultiRecordGroupChild[] = [];        
    async add(item: MultiRecordGroupItem) {
        if(item.typeGroupId === undefined){
            throw new Error("typeGroupId is undefined");
        }
        else if(item.typeGroupId !== this.typeGroupId){
            throw new Error("typeGroupId does not match");
        }
        this.records.push(await MultiRecordGroupChild.parse(item));
    }
    static async parse(item: MultiRecordGroupItem) {
        const mrg = new MultiRecordGroup(item.typeGroupId);
        mrg.add(item);
        const mrgType: KeywordTypeGroup = await KeywordTypeGroup.get(item.typeGroupId);
        if (mrgType !== null) {
            mrg.name = mrgType.name;
        }
        return mrg;
    } 
} 



