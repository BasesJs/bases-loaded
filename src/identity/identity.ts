process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import {token} from './token.js';
const config = require('../../config/config.json');
const qs = require('qs');

export class identity {
    username: string = "";
    password: string = "";
    token: token = new token();
    client: any = "";
    constructor(){     
    }
    static create(client: any, username: string, password: string){
        const ident = new identity();
        ident.client = client;
        ident.username = username;
        ident.password = password;
        return ident;
    }
    async connect(){
        let data = qs.stringify({
        'grant_type': `${config.environment.grant}`,
        'username': this.username,
        'password': this.password,
        'scope': `${config.environment.scope}`,
        'client_id': `${config.environment.clientid}`,
        'client_secret': `${config.environment.secret}`,
        'tenant': `${config.environment.tenant}` 
        });
        let request = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${config.environment.baseuri}${config.environment.idpbase}/connect/token`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };        
        try {
            let response = await this.client.request(request);
            this.token = token.create(response.data);
            return true;
        }
        catch(err){
            //console.log(err);
            return false;
        }
        
    };
    async heartbeat(){
        let request = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/heartbeat`,
            withCredentials: true,
            headers: {
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`             
            }            
        };
        const response = await this.client.request(request);
        return response.data;
    };
    async disconnect(){
        let request = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/disconnect`,
            headers: {
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`               
            },
            redirect: 'follow',            
        };
        const response = await this.client.request(request);
        return response.data;
    }
}
//module.exports = identity;