import { keywordtypegroups } from '../keyword-type-groups/keywordtypegroups.js';
export class multirecordgroup {
    constructor(id) {
        this.typeId = id;
    }
    typeId;
    recordgroups = [];
    name = "";
    add(item) {
        let record = new recordgroup(item.groupId, item.instanceId, item.keywords);
        this.recordgroups.push(record);
    }
    static async createbyid(id, item) {
        let group = new multirecordgroup(id);
        group.name = await keywordtypegroups.get(id).name;
        group.add(item);
        return group;
    }
    static async createbyname(name, item) {
        let mrg = await keywordtypegroups.get(name);
        let group = new multirecordgroup(mrg.id);
        group.name = mrg.name;
        group.add(item);
        return group;
    }
}
export class recordgroup {
    constructor(id, instanceId, keywords) {
        this.id = id;
        this.instanceId = instanceId;
        this.keywords = keywords;
    }
    id;
    name = "";
    keywords;
    instanceId;
    static async createbyid(id, instanceId, keywords) {
    }
    static async createbyname(name, item) {
    }
}
