import { group, _get } from '../baseclass/basegroup.js';
import { FileType } from './filetype.js';


export const FileTypes: group = {
    endpoint: "/file-types",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item: any) => {
            let ft = FileType.parse(item);
            this.items.push(ft);
        });
        return this.items;
    }
}

