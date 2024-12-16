import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';
import { RunRequest } from '../../../http/httprequest.js';
export async function uploadpart(uploadId: string, partNum: string, partBinary: string) {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads/${uploadId}?filePart=${partNum}`;
  let options = new RequestOptions(fullUrl, HttpMethod.GET);
  const response = await RunRequest(options);
  return response;
}