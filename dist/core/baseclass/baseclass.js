import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';
export class base {
    id = "";
    name = "";
    systemName = "";
    constructor(id, name, systenName) {
        this.id = id;
        this.name = name;
        this.systemName = systenName;
    }
}
export async function _getbyid(id, endpoint) {
    let options = new RequestOptions(httpMethod.GET, `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}/${id}`, {
        'Content-Type': 'application/json',
        'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
    }, 'follow', '');
    const response = await RunRequest(options);
    return response.data;
}
