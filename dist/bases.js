"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basesloaded = void 0;
const config = require('../config/config.json');
const identity_1 = require("./identity/identity");
const core = require('./core/core');
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;
const jar = new CookieJar();
const axclient = wrapper(axios.create({ jar }));
class basesloaded {
    constructor() {
        this.apiURI = `${config.environment.baseuri}${config.environment.apibase}`;
        this.idpURI = `${config.environment.baseuri}${config.environment.idpbase}`;
    }
    idpURI = "";
    apiURI = "";
    client = axclient;
    identity = new identity_1.identity();
    core = core;
    async connect(username, password) {
        this.identity = identity_1.identity.create(this.client, username, password);
        let success = await this.identity.connect();
        if (success) {
            global.bases = this;
        }
        else {
            console.log("What went wrong");
        }
        return success;
    }
    async disconnect() {
        return await this.identity.disconnect();
    }
}
exports.basesloaded = basesloaded;
module.exports = basesloaded;
