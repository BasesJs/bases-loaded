import { RunRequest} from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { AxiosResponse } from 'axios';
export abstract class base {
    id: string;
    name: string;
    systemName: string;

    constructor(id: string, name: string, systemName: string) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
    }
}

export async function _getbyid(endpoint: string, id: string | number): Promise<AxiosResponse> {
    try{
        const options = new RequestOptions({url: `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}/${id}`, method: HttpMethod.GET});
        const response = await RunRequest(options);
        if (response.status !== 200) {
            console.error('Failed to fetch data:', response.status, response.statusText);
            throw new Error('Failed to fetch data');
        }
        return response;
    }
    catch(error: any){
        throw error;
    }
}