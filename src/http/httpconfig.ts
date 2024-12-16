import * as http from 'http';
import * as https from 'https';
import { Config } from '../config/config.js';

export class HttpConfig {
  httpAgent?: http.Agent;
  httpsAgent?: https.Agent;
  timeout?: number = Number(Config.environment.httpTimeout);
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  constructor(httpAgent?: http.Agent, httpsAgent?: https.Agent, timeout?: number, onUploadProgress?: (progressEvent: any) => void, onDownloadProgress?: (progressEvent: any) => void) {
      this.httpAgent = httpAgent;
      this.httpsAgent = httpsAgent;
      this.timeout = timeout;
      this.onUploadProgress = onUploadProgress;
      this.onDownloadProgress = onDownloadProgress;
  }
}