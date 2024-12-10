import { group, _get } from '../baseclass/basegroup.js';
import { DocumentType } from './documenttype.js';

export const DocumentTypes: group = {
    endpoint: "/document-types",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it: any) => {
            let doctype = DocumentType.parse(it);
            this.items.push(doctype);
        });
        return this.items;
    }
}