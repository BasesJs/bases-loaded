import { Config } from '../../config/config.js';

export function DefaultHeaders() {   
    let defaultHeaders:any = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${global.bases.identity.token.access_token}`
    };
    if (global.bases.cookie !== undefined) {
        defaultHeaders['Cookie'] = global.bases.cookie;
    }
    if(Config.environment.useQueryMetering === true){
        console.log(Config.environment.useQueryMetering);
        defaultHeaders['Hyland-License-Type'] = "QueryMetering";
    }
    return  defaultHeaders;
}