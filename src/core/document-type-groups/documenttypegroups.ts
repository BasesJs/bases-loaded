import { DocumentTypeGroup, DocumentTypeGroupItem  } from './documenttypegroup.js';
import { group, _get } from '../baseclass/basegroup.js';

export const DocumentTypeGroups: group = {
    endpoint: "/document-type-groups",
    items: [] as DocumentTypeGroup[],

    async get(searchTerm?: string | number): Promise<DocumentTypeGroup[]> {
        try {
            const data = await _get(this.endpoint, searchTerm);
            this.items = data.items.map((it: DocumentTypeGroupItem) => DocumentTypeGroup.parse(it));
            return this.items;
        } catch (error) {
            console.error("Failed to fetch document type groups:", error);
            throw error;
        }
    }
}