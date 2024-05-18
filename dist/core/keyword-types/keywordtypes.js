import { _get, _getbyid } from '../baseclass/basegroup.js';
import { keywordtype } from './keywordtype.js';
export const keywordtypes = {
    endpoint: "/keyword-types",
    items: [],
    async get(paramName, params) {
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let kt = new keywordtype(item);
            this.items.push(kt);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await _getbyid(id, this.endpoint);
        let dt = new keywordtype(data);
        return dt;
    }
};
