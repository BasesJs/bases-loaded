import { RequestOptions, RunRequest, HttpMethod, DefaultHeaders } from '../../../http/axios/httprequest.js';
export async function uploadpart(uploadId: string, partNum: string, partBinary: string) {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads/${uploadId}?filePart=${partNum}`;
  let options = new RequestOptions(HttpMethod.GET, fullUrl, DefaultHeaders('application/json'), '');
  const response = await RunRequest(options);
  return response;
}