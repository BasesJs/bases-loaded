import searchparams from '../utilities/searchparams.js';
import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';
export async function _get(endpoint, searchTerm) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`;
    if (searchTerm) {
        fullUrl = `${fullUrl}${searchparams.create(searchTerm).stringify()}`;
    }
    let options = new RequestOptions(httpMethod.GET, fullUrl, {
        'Content-Type': 'application/json',
        'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
    }, 'follow', '');
    const response = await RunRequest(options);
    return response.data;
}
