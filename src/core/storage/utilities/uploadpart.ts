import { Bases } from '../../../bases.js';
import { Core } from '../../core.js';
import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';
import { RunRequest } from '../../../http/httprequest.js';
import { AxiosResponse } from 'axios';
export async function uploadpart(uploadId: string, partNum: string, partBinary: string): Promise<AxiosResponse> {
  console.log(`Uploading part ${partNum} of ${uploadId}`);
  let fullUrl = `${Bases.apiURI}${Core.endpoint}/documents/uploads/${uploadId}?filePart=${partNum}`;
  let options = new RequestOptions({ url: fullUrl, method: HttpMethod.PUT, data: partBinary});
  const response = await RunRequest(options);
  return response;
}