export interface IToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}
export class Token implements IToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    expiration: Date;

    constructor({ access_token, expires_in, token_type, scope }: IToken) {
        this.access_token = access_token;
        this.expires_in = expires_in;
        this.token_type = token_type;
        this.scope = scope;
        this.expiration = new Date(Date.now() + expires_in * 60000);
    }

    static create(jsonToken: IToken): Token {
        return new Token(jsonToken);
    }

    isExpired(): boolean {
        return this.expiration.valueOf() < Date.now();
    }
}