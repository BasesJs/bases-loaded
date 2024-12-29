import { Bases } from '../../bases.js';
import { Core } from '../core.js';
import { RunRequest } from '../../http/httprequest.js';
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
    const options = new RequestOptions({ url: `${Bases.apiURI}${Core.endpoint}${endpoint}/${id}`, method: HttpMethod.GET });
    const response = await RunRequest(options);
    return response;
}