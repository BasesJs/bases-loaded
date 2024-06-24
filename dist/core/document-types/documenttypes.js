import { _get } from '../baseclass/basegroup.js';
import { documenttype } from './documenttype.js';
export const documenttypes = {
    endpoint: "/document-types",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it) => {
            let doctype = documenttype.parse(it);
            this.items.push(doctype);
        });
        return this.items;
    }
};
