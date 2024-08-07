import { base, _getbyid  } from '../baseclass/baseclass.js';
import { autofillkeysets } from './autofillkeysets.js';

export class autofillkeyset extends base {
    constructor(id:string, name:string, systemName:string, primaryKeywordTypeId:string, external:boolean){
        super(id, name, systemName);
        this.primaryKeywordTypeId = primaryKeywordTypeId;
        this.external = external;
    }
    primaryKeywordTypeId:string;
    external: boolean;
    static parse(item:any){
        return new autofillkeyset(item.id, item.name, item.systemName, item.primaryKeywordTypeId, item.external);
    }
    static async get(id:string){
        let response = await _getbyid(autofillkeysets.endpoint, id);
        return autofillkeyset.parse(response);
    }
    getdata = async (primaryValue: string) => {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${autofillkeysets.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`
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
            
            let items:any = [];
            response.data.items.forEach((i: any)  => {
                let keywords = [];
                //Get keyword by id
                //Create Keyword with value
                items.push(i);
            });       
            return items; 
    }
}