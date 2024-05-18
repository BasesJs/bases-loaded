import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { config } from './config/config.js';
import {identity} from './identity/identity.js';
import { core } from './core/core.js'; 
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;
const jar = new CookieJar();
const axclient = wrapper(axios.create({jar}));

export class basesloaded {
    constructor(){        
        this.apiURI = `${config.environment.baseuri}${config.environment.apibase}`;
        this.idpURI = `${config.environment.baseuri}${config.environment.idpbase}`;
    }
    idpURI = "";
    apiURI = "";
    client = axclient;
    identity = new identity();
    core = core;
    async connect(username: string, password: string){        
        this.identity = identity.create(this.client, username, password);
        let success = await this.identity.connect();
        if(success){
            global.bases = this;
        }
        else{
            console.log("Could not get an authentication token.");
        }
        return success;
    }
    async disconnect(){
        return await this.identity.disconnect();
    }
}