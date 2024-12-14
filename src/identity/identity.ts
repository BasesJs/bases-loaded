import { IToken, Token } from './token.js';
import { Config } from '../config/config.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const qs = require('qs');
export class Identity {
    username: string;
    password: string;
    token: Token;
    client: any;

    constructor(client: any = '', username: string ='', password: string ='', token: Token = new Token({ access_token: "", expires_in: 0, token_type: "", scope: "" })) {
        this.client = client;
        this.username = username;
        this.password = password;
        this.token = token;
    }

    static create(client: any, username: string, password: string): Identity {
        return new Identity(client, username, password);
    }

    async connect(): Promise<boolean> {
        const data = qs.stringify({
            'grant_type': `${Config.environment.grant}`,
            'username': this.username,
            'password': this.password,
            'scope': `${Config.environment.scope}`,
            'client_id': `${Config.environment.clientid}`,
            'client_secret': `${Config.environment.secret}`,
            'tenant': `${Config.environment.tenant}`
        });
        const request = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Config.environment.idpUri}/connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        try {            
            const res = await this.client.request(request);
            this.token = Token.create(res.data as IToken);
            return true;
        } catch (err: any) {
            console.error(`Error: Could not get an authentication token. ${err.message}`, err);
            throw err;
        }
    }
}