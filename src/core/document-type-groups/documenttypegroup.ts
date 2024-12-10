import { base, _getbyid } from '../baseclass/baseclass.js';
import { DocumentTypeGroups } from './documenttypegroups.js';

export class DocumentTypeGroup extends base {
    constructor(id: string, name: string, systemName: string) {
        super(id, name, systemName);
    }
    static parse(item: any) {
        return new DocumentTypeGroup(item.id, item.name, item.systemName);
    }
    static async get(id: string) {
        let response = await _getbyid(id, DocumentTypeGroups.endpoint);
        return DocumentTypeGroup.parse(response);
    }

}