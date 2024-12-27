import { group, _get } from '../baseclass/basegroup.js';
import { FileType, FileTypeItem } from './filetype.js';

export const FileTypes: group = {
    endpoint: "/file-types",
    items: [] as FileType[],

    async get(searchTerm?: string | number): Promise<FileType[] | FileType> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await Promise.all(response.data.items.map((item: FileTypeItem) => FileType.parse(item)));
        if(!searchTerm && global.bases.core.isHydrated === false){
            this.items = returnItems;
        }
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};