const config = require('../config/config.json');
import {identity} from './identity/identity';
import {core} from './core/core';
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
            console.log("What went wrong");
        }
        return success;
    }
    async disconnect(){
        return await this.identity.disconnect();
    }
}


module.exports = basesloaded;