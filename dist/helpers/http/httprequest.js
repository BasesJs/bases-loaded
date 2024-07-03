import axios from 'axios';
export var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
    HttpMethod["DELETE"] = "delete";
})(HttpMethod || (HttpMethod = {}));
export class RequestOptions {
    method;
    url;
    headers;
    redirect;
    data;
    maxBodyLength;
    constructor(method, url, headers, redirect, data, maxBodyLength = Infinity) {
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.redirect = redirect;
        this.data = data;
        this.maxBodyLength = maxBodyLength;
    }
    static create(method, maxBodyLength, url, headers, redirect, data) {
        return new RequestOptions(method, url, headers, redirect, data, maxBodyLength);
    }
}
export async function RunRequest(options) {
    const request = {
        method: options.method,
        url: options.url,
        headers: options.headers,
        maxBodyLength: options.maxBodyLength,
        data: options.data,
        maxRedirects: options.redirect === 'follow' ? 5 : 0
    };
    const response = await axios.request(request);
    return response.data;
}
