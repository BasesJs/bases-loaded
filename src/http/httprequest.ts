import { setCookie } from './utilities/setcookie.js';
import { HttpConfig } from './httpconfig.js';
import { RequestOptions } from './requestoptions.js';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function RunRequest(options: RequestOptions): Promise<AxiosResponse> { 
      const requestOptions = MergeRequest(options, global.bases.httpConfig ?? new HttpConfig());       
      try{
        let response = await global.bases.client.request(requestOptions);        
        const setCookieHeaders = response.headers["set-cookie"];        
        if (setCookieHeaders) {
            const sessionCookie = setCookieHeaders.find((cookie: string) => 
                cookie.includes("Cookie.Session.OnBase.Hyland")
            );
            if (sessionCookie) {
                setCookie(sessionCookie);
            }
        }
        return response;
      }
      catch(error){
        throw error;
      }     
}

function MergeRequest(options: RequestOptions, config: HttpConfig): AxiosRequestConfig {
    return {
        url: options.url,
        method: options.method,
        maxBodyLength: options.maxBodyLength,
        maxContentLength: options.maxContentLength,
        headers: options.headers,
        params: options.params,
        data: options.data,
        responseType: options.responseType,
        signal: options.signal,
        validateStatus: options.validateStatus,
        paramsSerializer: options.paramsSerializer,
        timeout: config.timeout,
        httpAgent: config.httpAgent,
        httpsAgent: config.httpsAgent,
        onUploadProgress: config.onUploadProgress,
        onDownloadProgress: config.onDownloadProgress
    };
}

