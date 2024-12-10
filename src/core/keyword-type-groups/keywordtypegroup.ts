import { base, _getbyid } from '../baseclass/baseclass.js';
import { KeywordTypeGroups } from './keywordtypegroups.js';

export class KeywordTypeGroup extends base {
    constructor(id: string, name: string, systemName: string, storageType: string) {
        super(id, name, systemName)
        this.sotrageType = storageType;
    }
    sotrageType: string;
    static parse(item: any) {
        return new KeywordTypeGroup(item.id, item.name, item.systemName, item.storageType);
    }
    static async get(id: string) {
        let response = await _getbyid(id, KeywordTypeGroups.endpoint);
        return KeywordTypeGroup.parse(response);
    }
}