import { RequestOptions, RunRequest, HttpMethod, DefaultHeaders } from '../../../http/axios/httprequest.js';
export async function stageupload(fileExtension: string, fileSize: number) {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads`;
  let options = new RequestOptions(HttpMethod.GET, fullUrl, DefaultHeaders('application/json'), '');
  const response = await RunRequest(options);
  return response.data;
}