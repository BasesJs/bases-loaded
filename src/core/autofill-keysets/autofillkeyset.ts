import { _getbyid } from '../baseclass/baseclass.js';
import { AutofillKeysets } from './autofillkeysets.js';
import { RunRequest } from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { KeywordValueItem } from '../keyword/keywordvalue.js'; 
import { KeywordTypeBase } from '../keyword-types/keywordtype.js';
export class AutofillKeyset implements AutofillKeysetItem {
    readonly id: string;
    readonly name: string;
    readonly systemName: string;
    readonly primaryKeywordTypeId: string;
    readonly external: boolean;
    KeywordTypes?: KeywordTypeBase[];

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

    static async get(id: string | number): Promise<AutofillKeyset> {
        const response = await _getbyid(AutofillKeysets.endpoint, id);
            return AutofillKeyset.parse(response.data as AutofillKeyset);
    }

    async getData(primaryValue: string): Promise<AutofillKeysetDataItem[]> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${AutofillKeysets.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`;
        const options = new RequestOptions({url: fullUrl, method: HttpMethod.GET});
        const response = await RunRequest(options);
        return response.data.items as AutofillKeysetDataItem[];        
    }
    async getKeywordTypes(): Promise<KeywordTypeBase[]> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${AutofillKeysets.endpoint}/${this.id}/keyword-types`;
            const options = new RequestOptions({url: fullUrl, method: HttpMethod.GET});
            const response = await RunRequest(options);
            this.KeywordTypes = response.data.items as KeywordTypeBase[];
            return this.KeywordTypes;
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
