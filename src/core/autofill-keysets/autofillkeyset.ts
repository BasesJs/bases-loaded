import { base, _getbyid } from '@/core/baseclass/baseclass.js';
import { AutofillKeysets } from './autofillkeysets.js';

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
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        };

        const requestConfig = {
            method: 'get',
            maxBodyLength: Infinity,
            url: fullUrl,
            headers
        };
        //TODO: replace any's with actual types
        try {
            const response = await global.bases.client.request(requestConfig);
            const items: any[] = response.data.items.map((i: any) => i); // Modify with actual logic for processing items
            return items;
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