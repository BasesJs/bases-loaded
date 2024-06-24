import { _get } from '../baseclass/basegroup.js';
import { keywordtypegroup } from './keywordtypegroup.js';
export const keywordtypegroups = {
    endpoint: "/keyword-type-groups",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item) => {
            let ktg = keywordtypegroup.parse(item);
            this.items.push(ktg);
        });
        return this.items;
    }
};
