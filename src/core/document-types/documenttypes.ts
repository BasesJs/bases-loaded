import { group, _get } from '../baseclass/basegroup.js';
import { DocumentType, DocumentTypeItem } from './documenttype.js';

export const DocumentTypes: group = {
    endpoint: "/document-types",
    items: [] as DocumentType[],

    async get(searchTerm?: string | number): Promise<DocumentType[]> {
        const response= await _get(this.endpoint, searchTerm);        
        this.items = response.data.items.map((it: DocumentTypeItem) => DocumentType.parse(it));
        console.log(response.status)
        return this.items as DocumentType[];
    }
};