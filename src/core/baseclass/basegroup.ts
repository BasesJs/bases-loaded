import SearchParams from './utilities/searchparams.js';
import { RunRequest, RequestOptions, HttpMethod } from '@/http/axios/httprequest.js';

export interface group {
    readonly endpoint: string;
    items: any[];
    get(searchTerm: string | number): Promise<any>;
}

const createHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
});

export async function _get(endpoint: string, searchTerm?: string | number): Promise<any> {
    try {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
        if (searchTerm) {
            const params = SearchParams.create(searchTerm).stringify();
            fullUrl += params;
        }
        const options = new RequestOptions(
            HttpMethod.GET,
            fullUrl,
            createHeaders(),
            'follow',
            ''
        );
        const response = await RunRequest(options);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}