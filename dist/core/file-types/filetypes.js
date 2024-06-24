import { _get } from '../baseclass/basegroup.js';
import { filetype } from './filetype.js';
export const filetypes = {
    endpoint: "/file-types",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item) => {
            let ft = filetype.parse(item);
            this.items.push(ft);
        });
        return this.items;
    }
};
