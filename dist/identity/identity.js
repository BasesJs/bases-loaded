import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { token } from './token.js';
import { config } from '../config/config.js';
const qs = require('qs');
export class identity {
    username = "";
    password = "";
    token = new token();
    client = "";
    constructor() {
    }
    static create(client, username, password) {
        const ident = new identity();
        ident.client = client;
        ident.username = username;
        ident.password = password;
        return ident;
    }
    async connect() {
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
            data: data
        };
        try {
            console.log("Succes: Authentication token received");
            let res = await this.client.request(request);
            this.token = token.create(res.data);
            return true;
        }
        catch (err) {
            throw new Error(`Error: Could not get an authentication token. ${err.message}, ${err.stack}`);
        }
    }
    ;
}
