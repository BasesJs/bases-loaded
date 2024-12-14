import { createRequire } from "module";
const require = createRequire(import.meta.url);
const axios = require('axios');

import { Config } from './config/config.js';
import { Identity } from './identity/identity.js';
import { core } from './core/core.js';
import { RunRequest, RequestOptions, HttpMethod, DefaultHeaders } from './http/axios/httprequest.js';
export class BasesLoaded {
    constructor() {
    }
    idpURI: string = Config.environment.idpUri ?? '';
    apiURI: string = Config.environment.apiUri ?? '';
    client = axios.create();
    identity: Identity = new Identity();
    cookie?: string;
    core = core;
    async connect(username: string, password: string) {
        this.identity = Identity.create(this.client, username, password);
        global.bases = this;;
        return await this.identity.connect();
    }
    isConnected() {
        this.heartbeat()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
        return true;
    }
    async disconnect() {
        if (!this.isConnected()) {
            return;
        }
        let fullUrl = `${Config.environment.apiUri}/onbase/core/session/disconnect`;
        let options = new RequestOptions(HttpMethod.POST, fullUrl, DefaultHeaders(), '');            
        let response = await RunRequest(options);
        if (response.status == 204) {
            return true;
        }
        else {
            return false;
        }
    }
    async heartbeat() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/session/heartbeat`;
        let options = new RequestOptions(HttpMethod.GET, fullUrl, DefaultHeaders(), '');
        let response = await RunRequest(options);
        if (response.status == 204) {
            return true;
        }
        else {
            return false;
        }
    }
}
