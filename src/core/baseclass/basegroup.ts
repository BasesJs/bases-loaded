import SearchParams from './utilities/searchparams.js';
import { RunRequest } from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';


export interface group {
    readonly endpoint: string;
    items: any[];
    get(searchTerm: string | number): Promise<any>;
}

//Should Return 200 for all GET's
export async function _get(endpoint: string, searchTerm?: string | number): Promise<any> {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
    if (searchTerm) {
        const params = SearchParams.create(searchTerm).stringify();
        fullUrl += params;
    }
    const options = new RequestOptions(fullUrl, HttpMethod.GET);
    options.validateStatus = (status: number) => status === 200;
    const response = await RunRequest(options);
    return response.data;
}
