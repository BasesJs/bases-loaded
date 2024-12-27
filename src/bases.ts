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
    constructor(identity: Identity, httpConfig?: HttpConfig) {
        this.identity = identity;
        this.httpConfig = httpConfig ?? new HttpConfig();       
        
    }
    apiURI: string = Config.environment.apiUri ?? '';
    client = axios.create();
    abortController = new AbortController();
    identity: Identity;
    cookie?: string;
    core = core;
    httpConfig?: HttpConfig;
    async create(identity: Identity, httpConfig?: HttpConfig, hydratecore: boolean = false) {
        let bases = new BasesLoaded(identity, httpConfig);
        if(hydratecore){
            await bases.core.hydrateCore();
        }
        global.bases = bases;
        return bases;
    }
    async isConnected() : Promise<boolean> {
        return await this.heartbeat();
    }
    async disconnect(waitTime: number = 2000) { 
        let connected = await this.isConnected()  
        if (!connected) {
            return;
        }
        console.warn(`Aborting all requests, will disconnect in ${waitTime} milliseconds.`);
        this.abortController.abort("Disconnecting...");
        await setTimeout(async () => {
            this.abortController = new AbortController();
            let fullUrl = `${Config.environment.apiUri}/onbase/core/session/disconnect`;
            let options = new RequestOptions({ url: fullUrl, method: HttpMethod.POST, headers: DefaultHeaders() });
            let response = await RunRequest(options);
            console.log("Disconnection Response: ", response.status);
        }, waitTime);        
    }
    async heartbeat() {
        if (this.cookie === undefined) {
            return false;
        }
        try {
            let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/session/heartbeat`;
            let options = new RequestOptions({ url: fullUrl, method: HttpMethod.POST, headers: DefaultHeaders() });
            let response = await RunRequest(options);
            if (response.status == 204) {
                return true;
            }
            else {
                return false;
            }
        }
        catch(error: any){
            return false;
        }      
    }
}
