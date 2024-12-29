import { createRequire } from "module";
const require = createRequire(import.meta.url);
const axios = require('axios');
import { Config } from './config/config.js';
import { Identity } from './identity/identity.js';
import { Core } from './core/core.js';
import { RunRequest } from './http/httprequest.js';
import { RequestOptions, HttpMethod } from './http/requestoptions.js';
import { HttpConfig } from './http/httpconfig.js';
import { DefaultHeaders } from "./http/utilities/defaultheaders.js";

export class Bases {
    constructor(identity: Identity, httpConfig?: HttpConfig) {
        this.identity = identity;
        this.httpConfig = httpConfig ?? new HttpConfig(); 
        this.core = new Core();
    }
    static instance: Bases;
    static readonly apiURI: string = Config.environment.apiUri ?? '';
    cookie?: string;    
    abortController = new AbortController();
    client = axios.create();    
    identity: Identity;    
    core: Core;
    httpConfig?: HttpConfig;
    setCookie(cookieHeader: string, url: string) {
        let cookie = cookieHeader.split(";")[0];
        if (this.cookie === undefined || this.cookie !== cookie) {
            console.log(`Setting cookie set by request to ${url}. New cookie is ${cookie}`);
            this.cookie = cookie;
        }  
    }
    static async create(identity: Identity, httpConfig?: HttpConfig, hydratecore: boolean = false) {
        let bases = new Bases(identity, httpConfig);        
        Bases.instance = bases;
        if(hydratecore === true){
            console.log("Hydrating Core...");
            await Core.hydrateCore((message)=>{console.log(message)}, (error)=>{console.error(error)});
        }
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
            let fullUrl = `${Bases.apiURI}${Core.endpoint}/session/disconnect`;
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
            let fullUrl = `${Bases.apiURI}${Core.endpoint}/session/heartbeat`;
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
