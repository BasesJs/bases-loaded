import { DocumentTypeGroup } from './documenttypegroup.js';
import { group, _get } from '../baseclass/basegroup.js';

export const DocumentTypeGroups: group = {
    endpoint: "/document-type-groups",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it: any) => {
            let dtg = DocumentTypeGroup.parse(it);
            this.items.push(dtg);
        });
        return this.items;
    }
}