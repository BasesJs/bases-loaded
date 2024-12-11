import { group, _get } from '../baseclass/basegroup.js';
import { DocumentType, DocumentTypeItem } from './documenttype.js';

export const DocumentTypes: group = {
    endpoint: "/document-types",
    items: [] as DocumentType[],

    async get(searchTerm?: string | number): Promise<DocumentType[]> {
        try {
            const data = await _get(this.endpoint, searchTerm);
            this.items = data.items.map((it: DocumentTypeItem) => DocumentType.parse(it));
            return this.items;
        } catch (error) {
            console.error('Failed to fetch document types:', error);
            throw error;
        }
    }
};