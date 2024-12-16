import { setCookie } from './utilities/setcookie.js';
import { HttpConfig } from './httpconfig.js';
import { RequestOptions } from './requestoptions.js';


export async function RunRequest(options: RequestOptions): Promise<any> { 
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
          //TODO: Handle the error in each call
          return error;
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

