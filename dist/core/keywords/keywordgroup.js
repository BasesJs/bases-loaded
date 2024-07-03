import { keyword } from './keyword.js';
import { keywordtypegroups } from '../keyword-type-groups/keywordtypegroups.js';
export class recordgroup {
    constructor(id, keywords, instanceId) {
        this.id = id;
        this.instanceId = instanceId;
        this.keywords = keywords;
    }
    id;
    name = "";
    keywords;
    instanceId;
    static parse(item) {
        let keywords = [];
        item.keywords.forEach((kw) => {
            keywords.push(keyword.parse(kw));
        });
        return new recordgroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined);
    }
    static async parseAsync(item) {
        let keywords = [];
        if (item.keywords === undefined) {
        }
        else {
            item.keywords.forEach(async (kw) => {
                keywords.push(await keyword.parseAsync(kw));
            });
        }
        return new recordgroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined);
    }
}
export class multirecordgroup {
    constructor(id) {
        this.typeGroupId = id;
    }
    typeGroupId;
    recordgroups = [];
    name = "";
    add(item) {
        let record = new recordgroup(item.groupId, item.instanceId, item.keywords);
        this.recordgroups.push(record);
    }
    static parse(item) {
        let group = multirecordgroup.parse(item.typeGroupId);
        group.name = keywordtypegroups.get(item.typeGroupId).name;
        return group;
    }
    static async parseAsync(item) {
        let group = new multirecordgroup(item.typeGroupId);
        group.name = await keywordtypegroups.get(item.typeGroupId).name;
        group.recordgroups.push(await recordgroup.parseAsync(item));
        return group;
    }
}
