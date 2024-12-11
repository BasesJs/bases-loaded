import { RunRequest, RequestOptions, HttpMethod } from '@/http/axios/httprequest.js';
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
        {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        },
        'follow',
        ''
    );
    const response = await RunRequest(options);
    return response.data;
}