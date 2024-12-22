import { _getbyid } from '../baseclass/baseclass.js';
import { FileTypes } from './filetypes.js';
import mime from 'mime';
import { RunRequest } from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
export class FileType implements FileTypeItem {
    id: string;
    name: string;
    systemName: string;
    constructor(id: string, name: string, systemName: string) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
    }
    static async bestGuess(fileExtension:string): Promise<string | null> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/default-upload-file-types?extension=${fileExtension}`;
        let options = new RequestOptions({url: fullUrl, method: HttpMethod.GET});
        const response = await RunRequest(options);
        return response.data.id;
    }
    getMimeType(): string | null {
        return mime.getType(this.name);
    }

    static parse(item: FileTypeItem): FileType {
        return new FileType(item.id, item.name, item.systemName);
    }

    static async get(id: string | number): Promise<FileType> {
        const response = await _getbyid(FileTypes.endpoint, id);
        return FileType.parse(response.data);
    }
}
export interface FileTypeItem {
    id: string;
    name: string;
    systemName: string;
}