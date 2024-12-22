import { _getbyid } from '../baseclass/baseclass.js';
import { KeywordTypeGroups } from './keywordtypegroups.js';

export class KeywordTypeGroup implements KeywordTypeGroupItem {
    id: string;
    name: string;
    systemName: string;
    storageType: string;

    constructor(id: string, name: string, systemName: string, storageType: string) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.storageType = storageType;
    }

    static parse(item: KeywordTypeGroupItem): KeywordTypeGroup {
        return new KeywordTypeGroup(item.id, item.name, item.systemName, item.storageType);
    }

    static async get(id: string | number): Promise<KeywordTypeGroup> {
        const response = await _getbyid(KeywordTypeGroups.endpoint, id);
        return KeywordTypeGroup.parse(response.data);
    }
}

export interface KeywordTypeGroupItem {
    id: string;
    name: string;
    systemName: string;
    storageType: string;
}
