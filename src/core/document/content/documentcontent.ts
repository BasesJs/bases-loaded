import { Bases } from '../../../bases.js';
import { Core } from '../../core.js';
import { Document } from "../document.js";
import { Revision } from "../revisions/revision.js";
import { Rendition } from "../renditions/rendition.js";
import { RunRequest } from '../../../http/httprequest.js';
import { RequestOptions, HttpMethod, ResponseType } from '../../../http/requestoptions.js';
import { determineMimeType } from "./determineMimeType.js";
import { ParamSerializer } from "../../../http/utilities/paramserializer.js";
import { DefaultHeaders } from '../../../http/utilities/defaultheaders.js';
import { AxiosResponse } from "axios";


export async function DocumentContent(document:Document, retrievalOptions: RetrievalOptions = { revisionId: "latest", renditionId: "default", contentParams: undefined, accepts: "*/*" }): Promise<AxiosResponse> {
  retrievalOptions = await determineMimeType(document, retrievalOptions);
  document.fileExtension = retrievalOptions.fileExtension;
  let fullUrl = `${Bases.apiURI}${Core.endpoint}${Document.endpoint}/${document.id}${Revision.endpoint}/${retrievalOptions.revisionId}${Rendition.endpoint}/${retrievalOptions.renditionId}/content`;
  console.log(fullUrl);
  if (retrievalOptions.contentParams !== undefined) {
    fullUrl += `?${ParamSerializer(retrievalOptions.contentParams)}`;
  }
  const options = new RequestOptions({
    url: fullUrl, 
    method: HttpMethod.GET, 
    respType: ResponseType.ARRAYBUFFER,
    headers: DefaultHeaders(),
    params: retrievalOptions.contentParams,
    paramsSerializer: ParamSerializer
  });
  if(options.headers !== undefined){
    options.headers['Accept'] = retrievalOptions.accepts;
    options.validateStatus = (status: number) => status >= 200 && status < 300;
  }
  return await RunRequest(options);
}


export interface RetrievalOptions {
  revisionId?: string;
  renditionId?: string;
  contentParams?: ContentParams;
  accepts?: string;
  fileExtension?: string;
}
export interface ContentParams {
  pages?: number;
  context?: ContentContext;
  height?: number;
  width?: number;
  fit?: ContentFit;
}

export enum ContentFit {
  Both = "Both",
  Height = "Height",
  Stretch = "Stretch",
  Width = "Width"
}

export enum ContentContext {
  Download = "Download",
  EmailAttachment = "EmailAttachment",
  View = "View"
}
