import { Bases } from '../../bases.js';
import { Core } from '../core.js';
import { SearchParams } from './utilities/searchparams.js';
import { RunRequest } from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { AxiosResponse } from 'axios';
import { DefaultHeaders } from '../../http/utilities/defaultheaders.js';

export interface group {
    readonly endpoint: string;
    items: any[];
    get(searchTerm?: string | number): Promise<any>;
}

//Should Return 200 for all GET's
export async function _get(endpoint: string, searchTerm?: string | number): Promise<AxiosResponse> {
    try{
        let fullUrl = `${Bases.apiURI}${Core.endpoint}${endpoint}`;
        if (searchTerm) {
            const params = SearchParams.create(searchTerm).stringify();
            fullUrl += params;            
        }
        const options = new RequestOptions({url: fullUrl, method: HttpMethod.GET, headers: DefaultHeaders()});
        options.validateStatus = (status: number) => status === 200;
        const response = await RunRequest(options);
        return response;
    }
    catch(error: any){
        throw error;
    }
}
