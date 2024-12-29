import { group, _get } from '../baseclass/basegroup.js';
import { FileType, FileTypeItem } from './filetype.js';

export const FileTypes: group = {
    endpoint: "/file-types",
    items: [] as FileType[],

    async get(searchTerm?: string | number): Promise<FileType[] | FileType> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await response.data.items.map((item: FileTypeItem) => FileType.parse(item));
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};