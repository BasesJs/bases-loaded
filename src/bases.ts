import { createRequire } from "module";
const require = createRequire(import.meta.url);
const axios = require('axios');
import { Config } from './config/config.js';
import { Identity } from './identity/identity.js';
import { core } from './core/core.js';
import { RunRequest } from './http/httprequest.js';
import { RequestOptions, HttpMethod } from './http/requestoptions.js';
import { HttpConfig } from './http/httpconfig.js';
import { DefaultHeaders } from "./http/utilities/defaultheaders.js";

export class BasesLoaded {
    constructor(httpComfig?: HttpConfig) {
        this.httpConfig = httpComfig ?? new HttpConfig();
    }
    idpURI: string = Config.environment.idpUri ?? '';
    apiURI: string = Config.environment.apiUri ?? '';
    client = axios.create();
    abortController = new AbortController();
    identity: Identity = new Identity();
    cookie?: string;
    core = core;
    httpConfig?: HttpConfig;
    async connect(username: string, password: string) {
        this.identity = Identity.create(this.client, username, password);
        global.bases = this;
        return await this.identity.connect();
    }
    isConnected() {
        this.heartbeat()
            .then(() => {
                return true;
            })
            .catch((error) => {
                return false;
            })
        return true;
    }
    async disconnect() {
        if (!this.isConnected()) {
            return;
        }
        let fullUrl = `${Config.environment.apiUri}/onbase/core/session/disconnect`;
        let options = new RequestOptions(fullUrl, HttpMethod.POST);
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
        let options = new RequestOptions(fullUrl, HttpMethod.POST);
        let response = await RunRequest(options);
        if (response.status == 204) {
            return true;
        }
        else {
            return false;
        }
    }
}
