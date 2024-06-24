import { documenttypegroup } from './documenttypegroup.js';
import { _get } from '../baseclass/basegroup.js';
export const documenttypegroups = {
    endpoint: "/document-type-groups",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it) => {
            let dtg = documenttypegroup.parse(it);
            this.items.push(dtg);
        });
        return this.items;
    }
};
