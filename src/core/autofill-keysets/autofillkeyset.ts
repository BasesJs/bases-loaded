import { base, _getbyid } from '../baseclass/baseclass.js';
import { AutofillKeysets } from './autofillkeysets.js';
import { RunRequest, RequestOptions, HttpMethod, DefaultHeaders } from '../../http/axios/httprequest.js';


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

    async getData(primaryValue: string): Promise<any[]> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${AutofillKeysets.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`;
        const options = new RequestOptions(HttpMethod.GET, fullUrl, DefaultHeaders(),'');
        try {
            const response = await RunRequest(options);
            return response.data.items;;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }
}

export interface AutofillKeysetItem {
    id: string;
    name: string;
    systemName: string;
    primaryKeywordTypeId: string;
    external: boolean;
}