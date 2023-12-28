"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basesloaded = void 0;
const config = require('../config/config.json');
const identity_1 = require("./identity/identity");
const core_1 = require("./core/core");
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;
const jar = new CookieJar();
const axclient = wrapper(axios.create({ jar }));
class basesloaded {
    constructor() {
        this.idpURI = "";
        this.apiURI = "";
        this.client = axclient;
        this.identity = new identity_1.identity();
        this.core = core_1.core;
        this.apiURI = `${config.environment.baseuri}${config.environment.apibase}`;
        this.idpURI = `${config.environment.baseuri}${config.environment.idpbase}`;
    }
    connect(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.identity = identity_1.identity.create(this.client, username, password);
            let success = yield this.identity.connect();
            if (success) {
                global.bases = this;
            }
            else {
                console.log("What went wrong");
            }
            return success;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.identity.disconnect();
        });
    }
}
exports.basesloaded = basesloaded;
module.exports = basesloaded;
