import { group, _get } from '../baseclass/basegroup.js';
import { DocumentType, DocumentTypeItem } from './documenttype.js';

export const DocumentTypes: group = {
    endpoint: "/document-types",
    items: [] as DocumentType[],

    async get(searchTerm?: string | number): Promise<DocumentType[] | DocumentType> {
        const response= await _get(this.endpoint, searchTerm);        
        let returnItems = await response.data.items.map((it: DocumentTypeItem) => DocumentType.parse(it));
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};