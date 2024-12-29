import { Bases } from '../../bases.js';
import { Core } from '../core.js';
import { _getbyid } from '../baseclass/baseclass.js';
import { KeywordTypeGroups } from './keywordtypegroups.js';
import { RunRequest } from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { KeywordType } from '../keyword-types/keywordtype.js';
import { KeywordTypes } from '../keyword-types/keywordtypes.js';

export class KeywordTypeGroup implements KeywordTypeGroupItem {
    readonly id: string;
    readonly name: string;
    readonly systemName: string;
    readonly storageType: string;
    keywordTypes: KeywordType[] = [];

    constructor(id: string, name: string, systemName: string, storageType: string) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.storageType = storageType;
    }

    static parse(item: KeywordTypeGroupItem): KeywordTypeGroup {
        return new KeywordTypeGroup(item.id, item.name, item.systemName, item.storageType);
    }
    async getKeywordTypes(): Promise<KeywordType[]> {
        const fullUrl = `${Bases.apiURI}${Core.endpoint}${KeywordTypeGroups.endpoint}/${this.id}/keyword-types`;
        const options = new RequestOptions({url: fullUrl, method: HttpMethod.GET});
        const response = await RunRequest(options);
        let keywordTypes = await KeywordTypes.get() as unknown as KeywordType[];
        const responseIds = response.data.items.map((item: any) => item.id);
        this.keywordTypes = keywordTypes.filter(item => responseIds.includes(item.id));
        return this.keywordTypes;
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
