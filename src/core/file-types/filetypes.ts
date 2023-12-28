import { group } from '../baseclass/baseclass';
import { filetype } from './filetype';

export class filetypes extends group {
    endpoint:string = "/file-types";
    items:filetype[] = [];
    async get(paramName?:string, params?:string){        
        const data = await this._get(this.endpoint, paramName, params);
        data.items.forEach((item:any) => {
            let ft = new filetype(item);
            this.items.push(ft);
        });        

        return this.items;
    };
    async bestguess(fileExtension:string){
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
        return response.data.id;
    }
}
module.exports = filetypes;
