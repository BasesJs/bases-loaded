import { _get } from '../baseclass/basegroup.js';
import { customquery } from './customquery.js';
export const customqueries = {
    endpoint: "/custom-queries",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it) => {
            let cq = customquery.parse(it);
            this.items.push(cq);
        });
        return this.items;
    }
};
