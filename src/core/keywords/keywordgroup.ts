import { keyword, keywords } from './keyword.js';
import { keywordtypegroups } from '../keyword-type-groups/keywordtypegroups.js';

export class multirecordgroup {
    constructor(id:string) {
        this.typeGroupId = id;
    }    
    typeGroupId:string;
    recordgroups:recordgroup[] = [];
    name:string = "";
    add(item:any){
        let record = new recordgroup(item.groupId, item.instanceId, item.keywords);
        this.recordgroups.push(record);
    }
    static parse(item:any){
        let group:multirecordgroup = multirecordgroup.parse(item.typeGroupId);
        group.name = keywordtypegroups.get(item.typeGroupId).name;        
        return group;
    }
    static async parseAsync(item:any){
        let group = new multirecordgroup(item.typeGroupId);
        group.name = await keywordtypegroups.get(item.typeGroupId).name;
        group.recordgroups.push(await recordgroup.parseAsync(item));
        return group;
    }
}
export class recordgroup {
    constructor(id:string, keywords:keyword[], instanceId?:string) {
        this.id = id;    
        this.instanceId = instanceId;   
        this.keywords = keywords;
    }    
    id:string;
    name:string = "";
    keywords:keyword[];
    instanceId?:string;
    static parse(item:any){
        let keywords:keyword[] = [];
        item.keywords.forEach((kw:any) => {
            keywords.push(keyword.parse(kw));
        });
        return new recordgroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined);
    }
    static async parseAsync(item:any){        
        let keywords:keyword[] = [];
        if(item.keywords === undefined){
            console.log(item);
            //throw new Error("No keywords found in recordgroup");
        }
        else{
            item.keywords.forEach(async (kw:any) => {
                keywords.push(await keyword.parseAsync(kw));
            });
        }        
        return new recordgroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined);
    }
}
export class multirecordgroups {
    constructor(){}
    mikgs:multirecordgroup[] = [];
    async add(item:multirecordgroup){
        if(item.recordgroups === undefined || item.recordgroups.length === 0){
            console.log(`No recordgroups found for ${item.typeGroupId}`);
            return;
        }
        let existingGroup = this.mikgs.find((group) => group.typeGroupId === item.typeGroupId);
        if(existingGroup === undefined){
            console.log(`No group found for ${item.typeGroupId}`);
        }
        if(existingGroup){
            console.log(`Group found for ${item.typeGroupId}`);
            await existingGroup.add(await multirecordgroup.parseAsync(item));
        }
        else{
            console.log(`Creating new group for ${item.typeGroupId}`);
            let group = await multirecordgroup.parseAsync(item);
            await group.add(item);
            this.mikgs.push(group);
        }
    }
    static async parseAsync(item:any){
        let groups = new multirecordgroups();
        item.forEach(async (group:any) => {
            await groups.add(group);
        });
        return groups;
    }
}
