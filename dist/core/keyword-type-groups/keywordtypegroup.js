import { base, _getbyid } from '../baseclass/baseclass.js';
import { filetypes } from '../file-types/filetypes.js';
export class keywordtypegroup extends base {
    constructor(id, name, systemName, storageType) {
        super(id, name, systemName);
        this.sotrageType = storageType;
    }
    sotrageType;
    static parse(item) {
        return new keywordtypegroup(item.id, item.name, item.systemName, item.storageType);
    }
    static async get(id) {
        let response = await _getbyid(id, filetypes.endpoint);
        return keywordtypegroup.parse(response);
    }
}
