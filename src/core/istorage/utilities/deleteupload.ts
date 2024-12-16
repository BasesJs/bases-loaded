import { RequestOptions, RunRequest, HttpMethod, DefaultHeaders } from '../../../http/httprequest.js';
export async function deleteupload(uploadId: string) {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads/${uploadId}`
  let options = new RequestOptions(HttpMethod.GET, fullUrl, DefaultHeaders('application/json'), '');      
  const response = await RunRequest(options);
  return response.data;
}