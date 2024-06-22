import { keyword } from './keyword.js';
import { keywordtypegroups } from '../keyword-type-groups/keywordtypegroups.js';

export class multirecordgroup {
    constructor(id:string) {
        this.typeId = id;
    }    
    typeId:string;
    recordgroups:recordgroup[] = [];
    name:string = "";
    add(item:any){
        let record = new recordgroup(item.groupId, item.instanceId, item.keywords);
        this.recordgroups.push(record);
    }
    static async createbyid(id:string, item:any){
        let group = new multirecordgroup(id);
        group.name = await keywordtypegroups.get(id).name;        
        group.add(item);
        return group;
    }
    static async createbyname(name:string, item:any){
        let mrg = await keywordtypegroups.get(name);
        let group = new multirecordgroup(mrg.id);
        group.name = mrg.name;
        group.add(item);
        return group;
    }
}

export class recordgroup {
    constructor(id:string, instanceId:string, keywords:keyword[]) {
        this.id = id;    
        this.instanceId = instanceId;   
        this.keywords =keywords;
    }    
    id:string;
    name:string = "";
    keywords:keyword[];
    instanceId:string;
    static async createbyid(id:string, instanceId:string, keywords:keyword[]){
        
    }
    static async createbyname(name:string, item:any){
        
    }
}
