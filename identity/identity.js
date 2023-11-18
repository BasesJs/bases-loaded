process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const token = require('./token.js');
const config = require('../config/config.json');
const qs = require('qs');

class identity {
    username = "";
    password = "";
    token = {};
    client = "";
    constructor(client, username, password){
        this.client = client;
        this.username = username;
        this.password = password;
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
            this.token = response.data;
            return true;
        }
        catch(err){
            console.log(err);
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
                'Authorization': `${this.token.token_type} ${this.token.access_token}`             
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
                'Authorization': `${this.token.token_type} ${this.token.access_token}`                
            },
            redirect: 'follow',            
        };
        const response = await this.client.request(request);
        return response.data;
    }
}
module.exports = identity;