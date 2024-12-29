import { Bases } from '../../../bases.js';
import { Core } from '../../core.js';
import { RunRequest } from '../../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';
export async function deleteupload(uploadId: string) {
  let fullUrl = `${Bases.apiURI}${Core.endpoint}/documents/uploads/${uploadId}`
  let options = new RequestOptions({url: fullUrl, method: HttpMethod.GET});
  return await RunRequest(options);
}