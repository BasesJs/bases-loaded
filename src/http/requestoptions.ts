import { DefaultHeaders } from './utilities/defaultheaders.js';
import { Config } from '../config/config.js';

export class RequestOptions {
  constructor(
    url: string,
    method: HttpMethod,
    respType?: ResponseType,
    headers?: { [key: string]: string },
    data?: string,
    params?: { [key: string]: string },
    maxBodyLength?: number,
    maxContentLength?: number,
    validateStatus?: (conditions: any) => boolean,
    paramsSerializer?: (params: any) => string
  ) {
    this.url = url;
    this.method = method.toString();
    this.responseType = respType ?? ResponseType.JSON;
    this.headers = headers ?? DefaultHeaders();
    this.data = data;
    this.params = params;
    this.maxBodyLength = maxBodyLength ?? Number(Config.environment.maxBodyLength);
    this.maxContentLength = maxContentLength ?? Number(Config.environment.maxContentLength);
    this.validateStatus = validateStatus;
    this.paramsSerializer = paramsSerializer;
  }
  url: string;
  method: string;
  responseType?: ResponseType;
  maxBodyLength?: number;;
  maxContentLength?: number;
  headers?: { [key: string]: string }
  params?: { [key: string]: string }
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