import { DefaultHeaders } from './utilities/defaultheaders.js';
import { Config } from '../config/config.js';
import { AxiosRequestConfig } from 'axios';

export class RequestOptions {
  constructor(
    requestOptions:{
        url: string,
        method: HttpMethod,
        respType?: ResponseType,
        headers?: any,
        data?: string,
        params?: any,
        maxBodyLength?: number,
        maxContentLength?: number,
        validateStatus?: (conditions: any) => boolean,
        paramsSerializer?: (params: any) => string
      }
  ) {
    this.url = requestOptions.url;
    this.method = requestOptions.method.toString();
    this.responseType = requestOptions.respType ?? ResponseType.JSON;
    this.headers = requestOptions.headers ?? DefaultHeaders();
    this.data = requestOptions.data;
    this.params = requestOptions.params;
    this.maxBodyLength = requestOptions.maxBodyLength ?? Number(Config.environment.maxBodyLength);
    this.maxContentLength = requestOptions.maxContentLength ?? Number(Config.environment.maxContentLength);
    this.validateStatus = requestOptions.validateStatus;
    this.paramsSerializer = requestOptions.paramsSerializer;
  }
  url: string;
  method: string;
  responseType?: ResponseType;
  maxBodyLength?: number;;
  maxContentLength?: number;
  headers?: any;
  params?: any;
  maxRedirect: number = 5;
  data?: string;
  readonly signal: AbortSignal = global.bases.abortController.signal;
  validateStatus?: (conditions: any) => boolean;
  paramsSerializer?: (params: any) => string;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export enum ResponseType {
  JSON = 'json',
  ARRAYBUFFER = 'arraybuffer',
  DOCUMENT = 'document',
  TEXT = 'text',
  STREAM = 'stream'
}