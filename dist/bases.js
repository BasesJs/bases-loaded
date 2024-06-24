import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { config } from './config/config.js';
import { identity } from './identity/identity.js';
import { core } from './core/core.js';
import { RunRequest, RequestOptions, httpMethod } from './helpers/http/httprequest.js';
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;
const jar = new CookieJar();
const axclient = wrapper(axios.create({ jar }));
export class basesloaded {
    constructor() {
        this.apiURI = `${config.environment.baseuri}${config.environment.apibase}`;
        this.idpURI = `${config.environment.baseuri}${config.environment.idpbase}`;
    }
    idpURI = "";
    apiURI = "";
    client = axclient;
    identity = new identity();
    core = core;
    async connect(username, password) {
        this.identity = identity.create(this.client, username, password);
        let success = await this.identity.connect();
        if (success) {
            global.bases = this;
        }
        else {
            console.log("Could not get an authentication token.");
        }
        return success;
    }
    async disconnect() {
        let options = new RequestOptions(httpMethod.POST, `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/disconnect`, {
            'Content-Type': '*/*',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        }, 'follow', '');
        const response = await RunRequest(options);
        return response.data;
    }
    async heartbeat() {
        let options = new RequestOptions(httpMethod.GET, `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/heartbeat`, {
            'Content-Type': '*/*',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        }, 'follow', '');
        const response = await RunRequest(options);
        return response.data;
    }
}
