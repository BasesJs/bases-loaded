export class token {
    constructor() { }
    access_token = "";
    expires_in = 0;
    token_type = "";
    scope = "";
    expiration = new Date();
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
