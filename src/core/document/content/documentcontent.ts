import { Document } from "../document.js";
import { Revision } from "../revisions/revision.js";
import { Rendition } from "../renditions/rendition.js";
import { RunRequest } from '../../../http/httprequest.js';
import { RequestOptions, HttpMethod, ResponseType } from '../../../http/requestoptions.js'
import { ParamSerializer } from "../../../http/utilities/paramserializer.js";
import { DefaultHeaders } from '../../../http/utilities/defaultheaders.js';

export async function getContent(documentId: string, revisionId: string = "latest", renditionId: string = "default", contentParams?: ContentParams, accepts: string = "*/*"): Promise<string> {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${documentId}${Revision.endpoint}/${revisionId}${Rendition.endpoint}/${renditionId}/content`;
  console.log(fullUrl);
  if (contentParams !== undefined) {
    fullUrl += `?${ParamSerializer(contentParams)}`;
  }
  const options = new RequestOptions(
    fullUrl,
    HttpMethod.GET, 
    ResponseType.ARRAYBUFFER,
    DefaultHeaders(),
    ParamSerializer(contentParams)
  );
  if(options.headers !== undefined){
    options.headers['Accept'] = accepts;
    options.validateStatus = (status: number) => status >= 200 && status < 300;
  }
  return await RunRequest(options);
}

export class ContentParams {
  constructor(pages?: number, context?: ContentContext, height?: number, width?: number, fit?: ContentFit) {
    this.pages = pages;
    this.context = context;
    this.height = height;
    this.width = width;
    this.fit = fit;
  }
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
