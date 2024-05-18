import searchparams from '../utilities/searchparams.js';
import { error } from 'console';
import { RunRequest, RequestOptions, httpMethod } from '../http/httprequest.js';

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
    let options = new RequestOptions(httpMethod.GET, Infinity, 
        fullUrl, 
        
        {
            'Content-Type': 'application/json', 
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        },
        'follow',        
        '');
    const response = await RunRequest(options);   
    return response.data;
}

export async function _getbyid(id:any, endpoint:string){
    let options = new RequestOptions(httpMethod.GET, Infinity,
        `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}/${id}`, 
        {
            'Content-Type': 'application/json', 
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        },
        'follow',        
        '');
    const response = await RunRequest(options); 
    return response.data;
}