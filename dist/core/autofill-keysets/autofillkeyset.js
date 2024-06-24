import { base, _getbyid } from '../baseclass/baseclass.js';
import { autofillkeysets } from './autofillkeysets.js';
export class autofillkeyset extends base {
    constructor(id, name, systemName, primaryKeywordTypeId, external) {
        super(id, name, systemName);
        this.primaryKeywordTypeId = primaryKeywordTypeId;
        this.external = external;
    }
    primaryKeywordTypeId;
    external;
    static parse(item) {
        return new autofillkeyset(item.id, item.name, item.systemName, item.primaryKeywordTypeId, item.external);
    }
    static async get(id) {
        let response = await _getbyid(autofillkeysets.endpoint, id);
        return autofillkeyset.parse(response);
    }
    getdata = async (primaryValue) => {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${autofillkeysets.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`;
        let data = "";
        let request = {
            method: 'get',
            maxBodyLength: Infinity,
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            redirect: 'follow',
            data: data
        };
        const response = await global.bases.client.request(request);
        let items = [];
        response.data.items.forEach((i) => {
            let keywords = [];
            items.push(i);
        });
        return items;
    };
}
