class token {
    constructor(jsonToken){
        this.access_token = jsonToken.access_token;
        this.expires_in = jsonToken.expires_in;
        this.token_type = jsonToken.token_type;
        this.scope = jsonToken.scope;
        this.expiration = new Date(Date.UTC + this.expires_in * 60000);
    }
    access_token = "";
    expires_in = 0;
    token_type = "";
    scope = "";
    expiration = "";
    isExpired() {
        if(this.expiration <= Date.UTC)
            return true;
        else
            return false;
    }
}
module.exports = token;