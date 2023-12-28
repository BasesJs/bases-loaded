import { group } from '../baseclass/baseclass';
import { documenttype } from './documenttype';

export class documenttypes extends group {
    endpoint:string = "/document-types";
    items:documenttype[]=  [];
    async get(paramName?:string, params?:string){        
        const data = await this._get(this.endpoint, paramName, params);
        data.items.forEach((it:any) => {
            let doctype = new documenttype(it);
            this.items.push(doctype);
        });  
        return this.items;
    }
    async getById(id:string){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${this.endpoint}/${id}`
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
        let dt = new documenttype(response.data);       
        return dt;
    }
}
