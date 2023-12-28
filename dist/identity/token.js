"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
class token {
    constructor() {
        this.access_token = "";
        this.expires_in = 0;
        this.token_type = "";
        this.scope = "";
        this.expiration = new Date();
    }
    static create(jsonToken) {
        let tok = new token();
        tok.access_token = jsonToken.access_token;
        tok.expires_in = jsonToken.expires_in;
        tok.token_type = jsonToken.token_type;
        tok.scope = jsonToken.scope;
        tok.expiration = new Date(Date.now() + tok.expires_in * 60000);
        return tok;
    }
    isExpired() {
        if (this.expiration.valueOf() < Date.now())
            return true;
        else
            return false;
    }
}
exports.token = token;
