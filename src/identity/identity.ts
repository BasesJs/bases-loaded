import { IToken, Token } from './token.js';
import { Config } from '../config/config.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const axios = require('axios');
const qs = require('qs');
export class Identity {
    username: string;
    password: string;
    token: Token;
    client= axios.create();

    constructor(username: string ='', password: string ='', token: Token = new Token({ access_token: "", expires_in: 0, token_type: "", scope: "" })) {
        this.username = username;
        this.password = password;
        this.token = token;
    }

    static create(username: string, password: string): Identity {
        return new Identity(username, password);
    }

    async connect(): Promise<Token> {
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
        return this.token;
    }
}
