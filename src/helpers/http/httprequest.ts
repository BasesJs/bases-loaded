
export async function RunRequest(options: RequestOptions):Promise<any>{
    let request = {
        method: options.method,
        maxBodyLength: options.maxBodyLength,
        url: options.url,
        headers: options.headers,
        redirect: options.redirect,
        data : options.data
    }
    const response = await global.bases.client.request(request); 
    return response;
}

export class RequestOptions {
    constructor(method: HttpMethod, url: string, headers: { 'Content-Type': string; 'Authorization': string; }, redirect: string, data: string) {
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
    };
    redirect: string;
    data: string;
    static create(method: HttpMethod, maxBodyLength: number, url: string, headers: { 'Content-Type': string; 'Authorization': string; }, redirect: string, data: string):RequestOptions {
        return new RequestOptions(method, url, headers, redirect, data);        
    }
}

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'    
}