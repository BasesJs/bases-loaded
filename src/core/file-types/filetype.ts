import { base, _getbyid } from '../baseclass/baseclass.js';
import { filetypes } from './filetypes.js';
import mime from 'mime';

export class filetype extends base {
    constructor(id:string, name:string, systemName:string){
        super(id, name, systemName)
    }
    getMimeType(){
        return mime.getType(this.name);
    }
    static parse(item:any){
        return new filetype(item.id, item.name, item.systemName);
    }
    static async get(id:string){
        let response = await _getbyid(id, filetypes.endpoint);
        return filetype.parse(response);    
    }
    static async bestguess(fileExtension:string){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/default-upload-file-types?extension=${fileExtension}`;
        let data = "";
        let request = {
            method: 'get',
            maxBodyLength: Infinity,
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`            
            },      
            redirect: 'follow',
            data : data
        };
        const response = await global.bases.client.request(request);
        return await filetype.get(response.id);
    }
}