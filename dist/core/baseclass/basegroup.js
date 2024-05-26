import searchparams from '../utilities/searchparams.js';
import { error } from 'console';
import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';
export async function _get(endpoint, paramName, params) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
    if (paramName != null && params != null) {
        let search = new searchparams(paramName, params);
        fullUrl = `${fullUrl}${search.stringify()}`;
        console.log(fullUrl);
    }
    else if ((paramName != null && params == null) || (paramName == null && params != null)) {
        throw error("When using search parameters, both variables are required.");
    }
    let options = new RequestOptions(httpMethod.GET, fullUrl, {
        'Content-Type': 'application/json',
        'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
    }, 'follow', '');
    const response = await RunRequest(options);
    return response.data;
}
export async function _getbyid(id, endpoint) {
    let options = new RequestOptions(httpMethod.GET, `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}/${id}`, {
        'Content-Type': 'application/json',
        'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
    }, 'follow', '');
    const response = await RunRequest(options);
    return response.data;
}
