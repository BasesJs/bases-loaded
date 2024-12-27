import { DocumentTypeGroup, DocumentTypeGroupItem  } from './documenttypegroup.js';
import { group, _get } from '../baseclass/basegroup.js';

export const DocumentTypeGroups: group = {
    endpoint: "/document-type-groups",
    items: [] as DocumentTypeGroup[],
    async get(searchTerm?: string | number): Promise<DocumentTypeGroup[]> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await Promise.all(response.data.items.map((it: DocumentTypeGroupItem) => DocumentTypeGroup.parse(it)));
        if(!searchTerm && global.bases.core.isHydrated === false){
            this.items = returnItems;
        }
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
}