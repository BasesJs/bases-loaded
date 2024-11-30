import { keyword } from './keyword.js';
import { keywordtypegroup } from '../keyword-type-groups/keywordtypegroup.js';
import { keywordtypegroups } from '../keyword-type-groups/keywordtypegroups.js';
import { document } from '../document/document.js';

export class recordgroup {
    constructor(id: string, keywords: keyword[], instanceId?: string, name?: string) {
        this.id = id;
        this.instanceId = instanceId;
        this.keywords = keywords;
        this.name = name;
    }
    id: string;
    name: string | undefined;
    keywords: keyword[];
    instanceId?: string;
    static parse(item: any) {
        let keywords: keyword[] = [];
        item.keywords.forEach((kw: any) => {
            keywords.push(keyword.parse(kw));
        });
        return new recordgroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined);
    }
    static async parseAsync(item: any) {
        let keywords: keyword[] = [];
        let groupcfg = await keywordtypegroup.get(item.typeGroupId);
        if (item.keywords === undefined) {
            console.log("Item has no keywords");
        }
        else {
            item.keywords.forEach(async (kw: any) => {
                keywords.push(await keyword.parseAsync(kw));
            });
        }
        return new recordgroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined, groupcfg.name ? groupcfg.name : undefined);
    }
}
export class multirecordgroup {
    constructor(id: string) {
        this.typeGroupId = id;
    }
    typeGroupId: string;
    recordgroups: recordgroup[] = [];
    name: string = "";
    add(item: any) {
        let record = new recordgroup(item.groupId, item.instanceId, item.keywords);
        this.recordgroups.push(record);
    }
    static parse(item: any) {
        let group: multirecordgroup = multirecordgroup.parse(item.typeGroupId);
        keywordtypegroup.get(item.typeGroupId)
        .then((groupcfg: any) => {
            group.name = groupcfg.name;
        })
        .catch((e: any) => {
            console.log(e);
        });
        return group;
    }
    static async parseAsync(item: any) {
        let group = new multirecordgroup(item.typeGroupId);
        let groupcfg = await keywordtypegroup.get(item.typeGroupId);
        group.name = groupcfg.name;
        group.recordgroups.push(await recordgroup.parseAsync(item));
        return group;
    }   
}
/*export class multirecordgroups extends Map<string, multirecordgroup>{
    constructor(){}
    mikgs:multirecordgroup[] = [];
    async add(item:multirecordgroup){        
        /* GROUPS ARE NOT BEING ADDED CORRECTLY */
/*let existingGroup:multirecordgroup | null = new multirecordgroup("");
this.mikgs.forEach(
    (group) => {                
        if(group.typeGroupId === item.typeGroupId){
            existingGroup = group;
        }
    }
);
 
if(existingGroup !== null){
    //console.log("An existing group was found, adding to it", item)
    await existingGroup.add(await multirecordgroup.parseAsync(item));
}
else{
    let group = await multirecordgroup.parseAsync(item);
    await group.add(item);
    this.mikgs.push(group);
}
}*/
/*static async parseAsync(item:any){
    let groups = new multirecordgroups();
    item.forEach(async (group:any) => {
        await groups.add(group);
    });
    return groups;
}
}*/
