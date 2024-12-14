import { Config } from '../../config/config.js';

export async function RunRequest(options: RequestOptions): Promise<any> {
    let getCookie = global.bases.cookie ? false : true;
    let request = {
        method: options.method,
        maxBodyLength: options.maxBodyLength,
        url: options.url,
        headers: options.headers,
        redirect: options.redirect,
        data: options.data
    }
    const response = await global.bases.client.request(request);
    if (getCookie) {
        global.bases.cookie = response.headers["set-cookie"][0];
        if (response.headers["set-cookie"] !== undefined) {
            let cookieParts: string = response.headers["set-cookie"][0];
            if (cookieParts !== undefined) {
                let cookie = cookieParts.split(";")[0];
                if (global.bases.cookie === undefined) {
                    global.bases.cookie = cookie;
                    console.log("Cookie is undefined, setting: " + cookie)
                }
                else if (global.bases.cookie !== cookie) {
                    global.bases.cookie = cookie;
                    console.log("Cookie is different, setting: " + cookie)
                }
                else {
                    console.warn("No cookie is defined");
                }
            }
        }
        else {
            console.log("No cookie found");
        }
    }

    return response;
}

export class RequestOptions {
    constructor(method: HttpMethod, url: string, headers: { 'Content-Type': string; 'Authorization': string; 'Cookie': string; }, data: string, redirect: string = 'follow',) {
        this.method = method.toString();
        this.url = url;
        this.headers = headers;
        this.redirect = redirect;
        this.data = data;
    }
    method: string;
    maxBodyLength: number = Infinity;
    url: string;
    headers: {
        'Content-Type': string;
        'Authorization': string;
        'Cookie': string;
    };
    redirect: string;
    data: string;
    static create(method: HttpMethod, maxBodyLength: number, url: string, headers: { 'Content-Type': string; 'Authorization': string; 'Cookie': string; }, redirect: string, data: string): RequestOptions {
        return new RequestOptions(method, url, headers, data, redirect);
    }
}

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export function DefaultHeaders(ContentType: string = '*/*'){
    return {
        'Content-Type': ContentType,
        'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`,
        'Cookie': global.bases.cookie ?? ''
    }
}

