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
exports.identity = void 0;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const token_js_1 = require("./token.js");
const config = require('../../config/config.json');
const qs = require('qs');
class identity {
    constructor() {
        this.username = "";
        this.password = "";
        this.token = new token_js_1.token();
        this.client = "";
    }
    static create(client, username, password) {
        const ident = new identity();
        ident.client = client;
        ident.username = username;
        ident.password = password;
        return ident;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = qs.stringify({
                'grant_type': `${config.environment.grant}`,
                'username': this.username,
                'password': this.password,
                'scope': `${config.environment.scope}`,
                'client_id': `${config.environment.clientid}`,
                'client_secret': `${config.environment.secret}`,
                'tenant': `${config.environment.tenant}`
            });
            let request = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${config.environment.baseuri}${config.environment.idpbase}/connect/token`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
            try {
                let response = yield this.client.request(request);
                this.token = token_js_1.token.create(response.data);
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    ;
    heartbeat() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/heartbeat`,
                withCredentials: true,
                headers: {
                    'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
                }
            };
            const response = yield this.client.request(request);
            return response.data;
        });
    }
    ;
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${config.environment.baseuri}${config.environment.apibase}/onbase/core/session/disconnect`,
                headers: {
                    'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
                },
                redirect: 'follow',
            };
            const response = yield this.client.request(request);
            return response.data;
        });
    }
}
exports.identity = identity;
