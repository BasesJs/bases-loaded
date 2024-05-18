import { _get, _getbyid } from '../baseclass/basegroup.js';
import { keywordtypegroup } from './keywordtypegroup.js';
export const keywordtypegroups = {
    endpoint: "/keyword-type-groups",
    items: [],
    async get(paramName, params) {
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let ktg = new keywordtypegroup(item);
            this.items.push(ktg);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await _getbyid(id, this.endpoint);
        let ktg = new keywordtypegroup(data);
        return ktg;
    }
};
