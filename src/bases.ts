import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { config } from './config/config.js';
import { identity } from './identity/identity.js';
import { core } from './core/core.js';
import { RunRequest, RequestOptions, HttpMethod } from './helpers/http/httprequest.js';
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
    async connect(username: string, password: string) {
        this.identity = identity.create(this.client, username, password);
        global.bases = this;
        return await this.identity.connect();
    }
    isConnected() {
        this.heartbeat()
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        })
        return true;
    }
    async disconnect() {
        if (!this.isConnected()) {
            return;
        }
        let options = new RequestOptions(HttpMethod.POST,
            `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/disconnect`,
            {
                'Content-Type': '*/*',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',
            '');        
        try {
            let res = await RunRequest(options);
        }
        catch (err) {
            //already disconnected
        }


    }
    async heartbeat() {
        let options = new RequestOptions(HttpMethod.GET,
            `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/heartbeat`,
            {
                'Content-Type': '*/*',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',
            '');
        RunRequest(options)
            .then(() => { return true; })
            .catch(() => { return false; })
    }
    connectCallback(result: boolean) {
        if (result) {
            console.log("Connected to OnBase API");

        }
        else {
            console.log("Could not connect to OnBase API");
        }
    }
}
