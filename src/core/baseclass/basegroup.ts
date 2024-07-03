import searchParams from '../utilities/searchparams.js';
import { RunRequest, RequestOptions, HttpMethod } from '../../helpers/http/httprequest.js';

export interface group {
    endpoint: string;
    items: any[];
    get(searchTerm: any): any;
}

const createHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`,
});

export async function _get(endpoint: string, searchTerm?: Object): Promise<any> {
    try {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
        if (searchTerm) {
            fullUrl = `${fullUrl}${searchParams.create(searchTerm).stringify()}`;
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
        throw error; // or handle more gracefully
    }
}