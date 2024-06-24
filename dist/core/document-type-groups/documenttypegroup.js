import { base, _getbyid } from '../baseclass/baseclass.js';
import { documenttypegroups } from './documenttypegroups.js';
export class documenttypegroup extends base {
    constructor(id, name, systemName) {
        super(id, name, systemName);
    }
    static parse(item) {
        return new documenttypegroup(item.id, item.name, item.systemName);
    }
    static async get(id) {
        let response = await _getbyid(id, documenttypegroups.endpoint);
        return documenttypegroup.parse(response);
    }
}
