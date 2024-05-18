import { _get, _getbyid } from '../baseclass/basegroup.js';
import { documenttype } from './documenttype.js';
export const documenttypes = {
    endpoint: "/document-types",
    items: [],
    async get(paramName, params) {
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((it) => {
            let doctype = new documenttype(it);
            this.items.push(doctype);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await _getbyid(id, this.endpoint);
        let dt = new documenttype(data);
        return dt;
    }
};
