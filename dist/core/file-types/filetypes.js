import { _get, _getbyid } from '../baseclass/basegroup.js';
import { filetype } from './filetype.js';
export const filetypes = {
    endpoint: "/file-types",
    items: [],
    async get(paramName, params) {
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((item) => {
            let ft = new filetype(item);
            this.items.push(ft);
        });
        return this.items;
    },
    async getbyid(id) {
        const data = await _getbyid(id, this.endpoint);
        let ft = new filetype(data);
        return ft;
    }
};
