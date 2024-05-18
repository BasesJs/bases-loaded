import { _get, _getbyid } from '../baseclass/basegroup.js';
import { notetype } from './notetype.js';
export const notetypes = {
    endpoint: "/note-types",
    items: [],
    async get(paramName, params) {
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let nt = new notetype(item);
            this.items.push(nt);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await _getbyid(id, this.endpoint);
        let dt = new notetype(data);
        return dt;
    }
};
