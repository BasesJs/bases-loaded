import axios, { Method, AxiosRequestConfig } from 'axios'; // Importing axios for better type support

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'    
}

export class RequestOptions {
    constructor(
        public method: HttpMethod,
        public url: string,
        public headers: Record<string, string>,
        public redirect: string,
        public data: string,
        public maxBodyLength: number = Infinity
    ) {}
    
    static create(
        method: HttpMethod, 
        maxBodyLength: number, 
        url: string, 
        headers: Record<string, string>, 
        redirect: string, 
        data: string
    ): RequestOptions {
        return new RequestOptions(method, url, headers, redirect, data, maxBodyLength);        
    }
}

export async function RunRequest(options: RequestOptions): Promise<any> {
    const request: AxiosRequestConfig = {
        method: options.method as Method,
        url: options.url,
        headers: options.headers,
        maxBodyLength: options.maxBodyLength,
        data: options.data,
        maxRedirects: options.redirect === 'follow' ? 5 : 0 // Assuming 'follow' means following redirects
    };

    const response = await axios.request(request);
    return response.data; // Return response data instead of entire response object
}