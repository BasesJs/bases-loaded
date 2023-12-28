import { base } from '../baseclass/baseclass';

export class keywordtypegroup extends base {
    constructor(item:any){
        super(item.id, item.name, item.systemName)
        this.sotrageType = item.storageType;
    }
    sotrageType = "";
}