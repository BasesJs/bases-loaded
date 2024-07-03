import { RunRequest, RequestOptions, HttpMethod } from '../../helpers/http/httprequest.js';

export abstract class base {
    id:string = "";
    name:string ="";
    systemName:string ="";    
    constructor(id: string, name: string, systenName:string ){
        this.id = id;
        this.name = name;
        this.systemName = systenName;
    }
}
export async function _getbyid(id:any, endpoint:string){
    let options = new RequestOptions(
        HttpMethod.GET,
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