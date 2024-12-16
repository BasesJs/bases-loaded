import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';
import { RunRequest } from '../../../http/httprequest.js';
export async function stageupload(fileExtension: string, fileSize: number) {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads`;
  let options = new RequestOptions(fullUrl, HttpMethod.GET);
  const response = await RunRequest(options);
  return response.data;
}