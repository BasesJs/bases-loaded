import { _getbyid } from '../baseclass/baseclass.js';
import { DocumentTypeGroups} from './documenttypegroups.js';

export class DocumentTypeGroup implements DocumentTypeGroupItem {
    readonly id: string;
    readonly name: string;
    readonly systemName: string;
    constructor(id: string, name: string, systemName: string) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
    }

    static parse(item: DocumentTypeGroupItem): DocumentTypeGroup {
        return new DocumentTypeGroup(item.id, item.name, item.systemName);
    }
    static async get(id: string | number): Promise<DocumentTypeGroup> {
        const response = await _getbyid(DocumentTypeGroups.endpoint, id);
        return DocumentTypeGroup.parse(response.data) ;
    }
}
export interface DocumentTypeGroupItem {
    id: string;
    name: string;
    systemName: string;
}
