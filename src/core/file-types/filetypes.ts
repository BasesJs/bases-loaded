import { group, _get } from '../baseclass/basegroup.js';
import { FileType, FileTypeItem } from './filetype.js';

export const FileTypes: group = {
    endpoint: "/file-types",
    items: [] as FileType[],

    async get(searchTerm?: string | number): Promise<FileType[]> {
        try {
            const data = await _get(this.endpoint, searchTerm);
            this.items = data.items.map((item: FileTypeItem) => FileType.parse(item));
            return this.items;
        } catch (error) {
            console.error('Error fetching file types:', error);
            throw error;
        }
    }
};