import { group, _get } from '../baseclass/basegroup.js';
import { DocumentType, DocumentTypeItem } from './documenttype.js';

export const DocumentTypes: group = {
    endpoint: "/document-types",
    items: [] as DocumentType[],

    async get(searchTerm?: string | number): Promise<DocumentType[] | DocumentType> {
        const response= await _get(this.endpoint, searchTerm);        
        let returnItems = await Promise.all(response.data.items.map((it: DocumentTypeItem) => DocumentType.parse(it)));
        if(searchTerm && global.bases.core.isHydrated === false){
            this.items = returnItems;
        }
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};