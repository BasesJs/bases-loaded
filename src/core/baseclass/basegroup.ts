import searchparams from '../utilities/searchparams.js';
import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';

export interface group {
    endpoint:string;
    items:any[];
    get(searchterm:any):any;
    //getbyid(id:string):any
}

export async function _get(endpoint:string, searchTerm?:any){   
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${endpoint}`
    if(searchTerm){
        fullUrl = `${fullUrl}${searchparams.create(searchTerm).stringify()}`;
    }
    let options = new RequestOptions(
        httpMethod.GET, 
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
    let options = new RequestOptions(
        httpMethod.GET,
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


