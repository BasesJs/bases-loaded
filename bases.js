const config = require('./config/config.json');
const identity = require('./identity/identity');
const apitask = require('./apitasks/apitask');
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;
const jar = new CookieJar();
const axclient = wrapper(axios.create({jar}));
const core = require('./core/core');


class basesloaded {
    constructor(){
        this.apiURI = `${config.environment.baseuri}${config.environment.apibase}`;
        this.idpURI = `${config.environment.baseuri}${config.environment.idpbase}`;
    }
    idpURI = "";
    apiURI = "";
    client = axclient;
    identity = null;
    core = core;
    async connect(username, password){        
        this.identity = new identity(this.client, username, password);
        let success = await this.identity.connect();
        if(success){
            global.bases = this;
        }
        else{
            console.log("What went wrong");
        }
        return success;
    }
}


module.exports = basesloaded;