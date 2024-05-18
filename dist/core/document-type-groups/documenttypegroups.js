import { documenttypegroup } from './documenttypegroup.js';
import { _get, _getbyid } from '../baseclass/basegroup.js';
export const documenttypegroups = {
    endpoint: "/document-type-groups",
    items: [],
    async get(paramName, params) {
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((it) => {
            let dtg = new documenttypegroup(it);
            this.items.push(dtg);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await _getbyid(id, this.endpoint);
        let dtg = new documenttypegroup(data);
        return dtg;
    }
};
