import { Config } from '../../config/config.js';
import { Bases } from '../../bases.js';
import { Identity } from '../../identity/identity.js';

export function DefaultHeaders() {   
    let defaultHeaders:any = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${Identity.instance.token.access_token}`
    };
    if (Bases.instance.cookie !== undefined) {
        defaultHeaders['Cookie'] = Bases.instance.cookie;
    }
    if(Config.environment.useQueryMetering === true){
        console.log(Config.environment.useQueryMetering);
        defaultHeaders['Hyland-License-Type'] = "QueryMetering";
    }
    return  defaultHeaders;
}