import SearchParams from './utilities/searchparams.js';
import { RunRequest, RequestOptions, HttpMethod, DefaultHeaders } from '../../http/axios/httprequest.js';


export interface group {
    readonly endpoint: string;
    items: any[];
    get(searchTerm: string | number): Promise<any>;
}

export async function _get(endpoint: string, searchTerm?: string | number): Promise<any> {
    try {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
        if (searchTerm) {
            const params = SearchParams.create(searchTerm).stringify();
            fullUrl += params;
        }
        const options = new RequestOptions(HttpMethod.GET, fullUrl, DefaultHeaders(),'');
        const response = await RunRequest(options);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}