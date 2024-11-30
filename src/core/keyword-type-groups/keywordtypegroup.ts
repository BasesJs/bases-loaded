import { base, _getbyid } from '../baseclass/baseclass.js';
import { keywordtypegroups } from './keywordtypegroups.js';

export class keywordtypegroup extends base {
    constructor(id: string, name: string, systemName: string, storageType: string) {
        super(id, name, systemName)
        this.sotrageType = storageType;
    }
    sotrageType: string;
    static parse(item: any) {
        return new keywordtypegroup(item.id, item.name, item.systemName, item.storageType);
    }
    static async get(id: string) {
        let response = await _getbyid(id, keywordtypegroups.endpoint);
        return keywordtypegroup.parse(response);
    }
}