import { _getbyid } from '../baseclass/baseclass.js';
import { AutofillKeysets } from './autofillkeysets.js';
import { RunRequest } from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { KeywordValueItem } from '../keywords/keywordvalue.js'; 
export class AutofillKeyset implements AutofillKeysetItem {
    id: string;
    name: string;
    systemName: string;
    primaryKeywordTypeId: string;
    external: boolean;

    constructor(id: string, name: string, systemName: string, primaryKeywordTypeId: string, external: boolean) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.primaryKeywordTypeId = primaryKeywordTypeId;
        this.external = external;
    }

    static parse(item: AutofillKeysetItem): AutofillKeyset {
        return new AutofillKeyset(
            item.id,
            item.name,
            item.systemName,
            item.primaryKeywordTypeId,
            item.external
        );
    }

    static async get(id: string | number): Promise<AutofillKeyset | null> {
        try {
            const response = await _getbyid(AutofillKeysets.endpoint, id);
            return AutofillKeyset.parse(response);
        } catch (error) {
            console.error(`Error fetching AutofillKeyset with id ${id}:`, error);
            return null;
        }
    }

    async getData(primaryValue: string): Promise<AutofillKeysetDataItem[]> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${AutofillKeysets.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`;
        const options = new RequestOptions(fullUrl, HttpMethod.GET);
        const response = await RunRequest(options);
        if (response.status !== 200) {
            console.error('Failed to fetch data:', response.status);
            throw new Error('Failed to fetch data');
        }
        return response.data.items as AutofillKeysetDataItem[];
    }
    async getKeywordTypes(): Promise<any> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${AutofillKeysets.endpoint}/${this.id}/keyword-types`;
        const options = new RequestOptions(fullUrl, HttpMethod.GET);
        const response = await RunRequest(options);
        if (response.status !== 200) {
            console.error('Failed to fetch data:', response.status);
            throw new Error('Failed to fetch data');
        }
        return response.data.items;
    }
}
export interface AutofillKeysetItem {
    id: string;
    name: string;
    systemName: string;
    primaryKeywordTypeId: string;
    external: boolean;
}
export interface AutofillKeysetDataItem {
    id: string;
    keywords: KeywordValueItem[];
}