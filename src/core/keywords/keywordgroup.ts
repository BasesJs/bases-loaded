import { Keyword, NewKeyword } from './keyword.js';
import { KeywordTypeGroup } from '../keyword-type-groups/keywordtypegroup.js';

export class RecordGroup {
    constructor(id: string, keywords: Keyword[], instanceId?: string, name?: string) {
        this.id = id;
        this.instanceId = instanceId;
        this.keywords = keywords;
        this.name = name;
    }
    id: string;
    name: string | undefined;
    keywords: Keyword[];
    instanceId?: string;
    static parse(item: any) {
        let keywords: Keyword[] = [];
        item.keywords.forEach((kw: any) => {
            keywords.push(Keyword.parse(kw));
        });
        return new RecordGroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined);
    }
    static async parseAsync(item: any) {
        let keywords: Keyword[] = [];
        let groupcfg = await KeywordTypeGroup.get(item.typeGroupId);
        if (item.keywords === undefined) {
            console.log("Item has no keywords");
        }
        else {
            item.keywords.forEach(async (kw: any) => {
                keywords.push(await Keyword.parseAsync(kw));
            });
        }
        return new RecordGroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined, groupcfg.name ? groupcfg.name : undefined);
    }
}
export class MultiRecordGroup {
    constructor(id: string) {
        this.typeGroupId = id;
    }
    typeGroupId: string;
    recordgroups: RecordGroup[] = [];
    name: string = "";
    add(item: any) {
        let record = new RecordGroup(item.groupId, item.instanceId, item.keywords);
        this.recordgroups.push(record);
    }
    static parse(item: any) {
        let group: MultiRecordGroup = MultiRecordGroup.parse(item.typeGroupId);
        KeywordTypeGroup.get(item.typeGroupId)
        .then((groupcfg: any) => {
            group.name = groupcfg.name;
        })
        .catch((e: any) => {
            console.log(e);
        });
        return group;
    }
    static async parseAsync(item: any) {
        let group = new MultiRecordGroup(item.typeGroupId);
        let groupcfg = await KeywordTypeGroup.get(item.typeGroupId);
        group.name = groupcfg.name;
        group.recordgroups.push(await RecordGroup.parseAsync(item));
        return group;
    }   
}
export class NewRecordGroup{
    constructor(id:string, keywords:NewKeyword[]=[]){
        this.typeGroupId = id;
        this.keywords = keywords;
    }
    typeGroupId: string;
    keywords: NewKeyword[];
    static parse(item: any) {    
        let id = item.typeGroupId ? item.typeGroupId : item.groupId;
        let keywords: NewKeyword[] = [];
        item.keywords.forEach(async (kw: any) => {
            keywords.push(NewKeyword.parse(kw));
        });
        return new NewRecordGroup(id, keywords);
    }
}
export class NewMultiRecordGroup {
    constructor(id: string, instanceId: string, keywords:NewKeyword[]=[]) {
        this.typeGroupId= id;
        this.instanceId = instanceId;
        this.keywords = keywords;
    }
    typeGroupId: string;
    instanceId: string;
    keywords: NewKeyword[];
    static parse(item: any) {
        let id = item.typeGroupId ? item.typeGroupId : item.groupId;
        let instanceId = item.instanceId;
        let keywords: NewKeyword[] = [];
        item.keywords.forEach(async (kw: any) => {
            keywords.push(NewKeyword.parse(kw));
        });
        return new NewMultiRecordGroup(id, instanceId, keywords);
    }
}
