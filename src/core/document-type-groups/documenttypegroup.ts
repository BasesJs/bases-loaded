import { base, _getbyid } from '../baseclass/baseclass.js';
import { DocumentTypeGroups} from './documenttypegroups.js';

export class DocumentTypeGroup implements DocumentTypeGroupItem {
    id: string;
    name: string;
    systemName: string;
    constructor(id: string, name: string, systemName: string) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
    }

    static parse(item: DocumentTypeGroupItem): DocumentTypeGroup {
        return new DocumentTypeGroup(item.id, item.name, item.systemName);
    }

    static async get(id: string | number): Promise<DocumentTypeGroup | null> {
        try {
            const response = await _getbyid(DocumentTypeGroups.endpoint, id);
            return DocumentTypeGroup.parse(response);
        } catch (error) {
            console.error(`Failed to get DocumentTypeGroup with id ${id}:`, error);
            return null;
        }
    }
}

export interface DocumentTypeGroupItem {
    id: string;
    name: string;
    systemName: string;
}
