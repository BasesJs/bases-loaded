import { Bases } from '../../../bases.js';
import { Core } from '../../core.js';
import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';
import { RunRequest } from '../../../http/httprequest.js';
import { AxiosResponse } from 'axios';
export async function uploadpart(uploadId: string, partNum: string, partBinary: string): Promise<AxiosResponse> {
  let fullUrl = `${Bases.apiURI}${Core.endpoint}/documents/uploads/${uploadId}?filePart=${partNum}`;
  let options = new RequestOptions({ url: fullUrl, method: HttpMethod.GET});
  const response = await RunRequest(options);
  return response;
}