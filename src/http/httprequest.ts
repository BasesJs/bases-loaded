import { setCookie } from './utilities/setcookie.js';
import { HttpConfig } from './httpconfig.js';
import { RequestOptions } from './requestoptions.js';
import { createRequire } from "module";
import { Axios } from 'axios';

export async function RunRequest(options: RequestOptions): Promise<any> { 
      const requestOptions = MergeRequest(options, global.bases.httpConfig ?? new HttpConfig()); 
      
      try{
        let response = await global.bases.client.request(requestOptions);
        if (response.headers["set-cookie"] !== undefined) {
            setCookie(response.headers["set-cookie"][0]);
          }
        return response;
      }
      catch(error: any){
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
          throw error;
      }     
}

function MergeRequest(options: RequestOptions, config: HttpConfig): any {
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

