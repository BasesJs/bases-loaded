export async function RunRequest(options) {
    let request = {
        method: options.method,
        maxBodyLength: options.maxBodyLength,
        url: options.url,
        headers: options.headers,
        redirect: options.redirect,
        data: options.data
    };
    const response = await global.bases.client.request(request);
    return response;
}
export class RequestOptions {
    constructor(method, url, headers, redirect, data) {
        this.method = method.toString();
        this.url = url;
        this.headers = headers;
        this.redirect = redirect;
        this.data = data;
    }
    method;
    maxBodyLength = Infinity;
    url;
    headers;
    redirect;
    data;
    static create(method, maxBodyLength, url, headers, redirect, data) {
        return new RequestOptions(method, url, headers, redirect, data);
    }
}
export var httpMethod;
(function (httpMethod) {
    httpMethod["GET"] = "get";
    httpMethod["POST"] = "post";
    httpMethod["PUT"] = "put";
    httpMethod["DELETE"] = "delete";
})(httpMethod || (httpMethod = {}));
