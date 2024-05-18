import { _get, _getbyid } from '../baseclass/basegroup.js';
import { customquery } from './customquery.js';
export const customqueries = {
    endpoint: "/custom-queries",
    items: [],
    async get(paramName, params) {
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((it) => {
            let cq = new customquery(it);
            this.items.push(cq);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await _getbyid(id, this.endpoint);
        let cq = new customquery(data);
        return cq;
    }
};
