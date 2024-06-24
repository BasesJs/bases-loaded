import { _get } from '../baseclass/basegroup.js';
import { notetype } from './notetype.js';
export const notetypes = {
    endpoint: "/note-types",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item) => {
            let nt = notetype.parse(item);
            this.items.push(nt);
        });
        return this.items;
    }
};
