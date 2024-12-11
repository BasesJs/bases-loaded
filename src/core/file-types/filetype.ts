import { base, _getbyid } from '../baseclass/baseclass.js';
import { FileTypes } from './filetypes.js';
import mime from 'mime';


export class FileType implements FileTypeItem {
    id: string;
    name: string;
    systemName: string;
    constructor(id: string, name: string, systemName: string) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
    }

    getMimeType(): string | null {
        return mime.getType(this.name);
    }

    static parse(item: FileTypeItem): FileType {
        return new FileType(item.id, item.name, item.systemName);
    }

    static async get(id: string | number): Promise<FileType | null> {
        try {
            const response = await _getbyid(FileTypes.endpoint, id);
            return FileType.parse(response);
        } catch (error) {
            console.error(`Failed to get FileType with id ${id}:`, error);
            return null;
        }
    }

    static async bestguess(fileExtension: string): Promise<FileType | null> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/default-upload-file-types?extension=${fileExtension}`;
        const request = {
            method: 'get',
            maxBodyLength: Infinity,
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            redirect: 'follow',
        };

        try {
            const response = await global.bases.client.request(request);
            return await FileType.get(response.id);
        } catch (error) {
            console.error(`Error in bestguess for extension ${fileExtension}:`, error);
            return null;
        }
    }
}
export interface FileTypeItem {
    id: string;
    name: string;
    systemName: string;
}