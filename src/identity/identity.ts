import { IToken, Token } from './token.js';
import { Config } from '../config/config.js';
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const axios = require('axios');
const qs = require('qs');
export class Identity {
    static readonly endpoint: string = "/connect/token";
    static readonly healthcheck: string = "/health"; 
    static instance: Identity;   
    private readonly username: string;
    private readonly password: string;   
    token: Token = new Token({ access_token: "", expires_in: 0, token_type: "", scope: "" });
    client= axios.create();

    constructor(username: string ='', password: string ='') {
        this.username = username;
        this.password = password;  
        
    }
    static create(username: string, password: string): Identity {
        Identity.instance = new Identity(username, password);
        return Identity.instance;
    }
    async connect(): Promise<void> {
        const data = qs.stringify({
            'grant_type': `${Config.environment.grant}`,
            'username': this.username,
            'password': this.password,
            'scope': `${Config.environment.scope}`,
            'client_id': `${Config.environment.clientid}`,
            'client_secret': `${Config.environment.secret}`,
            'tenant': `${Config.environment.tenant}`
        });
        const options = {
                url: `${Config.environment.idpUri}/connect/token`, 
                method: "POST",
                respType: "application/json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
        }
        const res = await this.client.request(options);
        this.token = Token.create(res.data as IToken);
    }
}
