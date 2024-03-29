import searchparams from '../utilities/searchparams';
const { error } = require('console');
export interface group {
    endpoint:string;
    items:any[];
    get(paramName?:string, params?:string):any;
    getbyid(id:string):any
}

export async function _get(endpoint:string, paramName?:string, params?:string){
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

export async function _getbyid(id:any, endpoint:string){
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}/${id}`
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
    }
    const response = await global.bases.client.request(request);
    return response.data;
}