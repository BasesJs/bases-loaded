import { keyword } from './keyword.js';
import { keywordtypegroup } from '../keyword-type-groups/keywordtypegroup.js';
export class recordgroup {
    constructor(id, keywords, instanceId, name) {
        this.id = id;
        this.instanceId = instanceId;
        this.keywords = keywords;
        this.name = name;
    }
    id;
    name;
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
        let groupcfg = await keywordtypegroup.get(item.typeGroupId);
        if (item.keywords === undefined) {
            console.log("Item has no keywords");
        }
        else {
            item.keywords.forEach(async (kw) => {
                keywords.push(await keyword.parseAsync(kw));
            });
        }
        return new recordgroup(item.groupId ? item.groupId : item.typeGroupId, keywords, item.instanceId ? item.instanceId : undefined, groupcfg.name ? groupcfg.name : undefined);
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
        keywordtypegroup.get(item.typeGroupId)
            .then((groupcfg) => {
            group.name = groupcfg.name;
        })
            .catch((e) => {
            console.log(e);
        });
        return group;
    }
    static async parseAsync(item) {
        let group = new multirecordgroup(item.typeGroupId);
        let groupcfg = await keywordtypegroup.get(item.typeGroupId);
        group.name = groupcfg.name;
        group.recordgroups.push(await recordgroup.parseAsync(item));
        return group;
    }
}
