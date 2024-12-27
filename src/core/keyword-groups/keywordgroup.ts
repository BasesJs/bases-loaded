import { Keyword, KeywordItem } from '../keyword/keyword.js';
import { KeywordTypeGroup } from '../keyword-type-groups/keywordtypegroup.js';
import { KeywordCollectionItem} from '../keyword-collections/keywordcollections.js';

export class RecordGroup implements RecordGroupItem {
    constructor(typeGroupId: string, keywords: Keyword[], instanceId?: string, name?: string) {
        this.typeGroupId = typeGroupId;
        this.instanceId = instanceId;
        this.keywords = keywords;
        this.name = name;
    }
    readonly typeGroupId: string;
    readonly name?: string;
    keywords: Keyword[];
    instanceId?: string;
    keywordTypeGroup?: KeywordTypeGroup;
    static async parse(item: RecordGroupItem) {
        if (item.keywords === undefined) {
            console.log("Item has no keywords");
        }
        let keywords: Keyword[] = await Promise.all(item.keywords.map(async (kw: KeywordItem) => Keyword.parse(kw)));
        let groupcfg = await KeywordTypeGroup.get(item.typeGroupId);
        if (!groupcfg) {
            throw new Error("Group configuration is null");
        }
        const nrg = new RecordGroup(item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined, groupcfg.name ? groupcfg.name : undefined);
        return nrg;
    }
} 

export class MultiRecordGroup {   
    constructor(typeGroupId: string) {
        this.typeGroupId = typeGroupId;
    }
    typeGroupId: string = "";
    name: string = "";
    records: RecordGroup[] = [];        
    async add(item: RecordGroupItem): Promise<void> {
        if(item.typeGroupId === undefined){
            throw new Error("typeGroupId is undefined");
        }
        else if(item.typeGroupId !== this.typeGroupId){
            throw new Error("typeGroupId does not match");
        }
        this.records.push(await RecordGroup.parse(item));
    }
    static async parse(item: RecordGroupItem) {
        const mrgc = new MultiRecordGroup(item.typeGroupId);
        await mrgc.add(item);
        const mrgType: KeywordTypeGroup = await KeywordTypeGroup.get(item.typeGroupId);
        if (mrgType !== null) {
            mrgc.name = mrgType.name;
        }
        return mrgc;
    } 
} 

export interface RecordGroupItem extends KeywordCollectionItem {
    typeGroupId: string;
    keywords: KeywordItem[];
    groupId?: string;
    instanceId?: string;
}

