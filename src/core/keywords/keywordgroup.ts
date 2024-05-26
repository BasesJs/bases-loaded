import base from '../baseclass/baseclass.js';
import { keyword } from './keyword.js';
import { keywordtypegroups } from '../keyword-type-groups/keywordtypegroups.js';

export class keywordgroup extends base {
    constructor(item: any) {
        super(item.typeGroupId, item.name? item.systemName : "", item.systemName? item.systemName : "");
        this.keywords = item.keywords;
        this.groupId = item.groupId;
        keywordtypegroups.getbyid(item.typeGroupId)
        .then((ktg:any) => {
            this.storageType = ktg.storageType;
            if(ktg.storageType === "MultiInstance"){
                this.groupId = item.groupId;
                this.instanceId = item.instanceId;
            }
        });
    }    
    storageType: string = "";
    instanceId: string = "";
    groupId: string;
    keywords: keyword[];
}