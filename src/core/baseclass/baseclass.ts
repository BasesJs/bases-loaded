export class base {
    id:string = "";
    name:string ="";
    systemName:string ="";    
    constructor(id: string, name: string, systenName:string ){
        this.id = id;
        this.name = name;
        this.systemName = systenName;
    }
}

const searchparams = require('../utilities/searchparams');
const { error } = require('console');
export class group {
    async _get(endpoint:string, paramName?:string, params?:string){
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`
        if(paramName != null && params != null){
            let search = new searchparams(paramName, params);
            fullUrl = `${fullUrl}${search.stringify()}`;
            console.log(fullUrl);
        }
        else if((paramName != null && params == null) || (paramName == null && params != null) ){
            throw error("When using search parameters, both variables are required.");
        }

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
        return response.data;
    }
}