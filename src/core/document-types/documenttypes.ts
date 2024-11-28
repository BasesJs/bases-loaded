import { group, _get } from '../baseclass/basegroup.js';
import { documenttype } from './documenttype.js';

export const documenttypes: group = {
    endpoint: "/document-types",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it: any) => {
            let doctype = documenttype.parse(it);
            this.items.push(doctype);
        });
        return this.items;
    }
}