import { RunRequest, RequestOptions, HttpMethod, DefaultHeaders } from '../../http/axios/httprequest.js';
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

export async function _getbyid(endpoint: string, id: string | number): Promise<any> {
    const options = new RequestOptions(
        HttpMethod.GET,
        `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}/${id}`,
        DefaultHeaders('application/json'),
        ''
    );
    const response = await RunRequest(options);
    return response.data;
}