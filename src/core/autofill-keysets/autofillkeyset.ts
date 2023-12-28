import { base } from '../baseclass/baseclass';
const autofillkeysets = require('./autofillkeysets');

export class autofillkeyset extends base {
    constructor(item: any){
        super(item.id, item.name, item.systemName);
        this.primaryKeywordTypeId = item.primaryKeywordTypeId;
        this.external = item.external;
    }
    primaryKeywordTypeId: string = "";
    external: boolean = false;
    getdata = async (primaryValue: string) => {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${global.bases.core.autofillkeysets.endpoint}/${this.id}/keyword-set-data?primaryValue=${primaryValue}`
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