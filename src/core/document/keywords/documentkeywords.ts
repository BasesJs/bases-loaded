import { Document } from "../document.js";
import { RunRequest } from "../../../http/httprequest.js";
import { RequestOptions, HttpMethod} from "../../../http/requestoptions.js";
import { AxiosResponse } from "axios";
import { ParamSerializer } from "../../../http/utilities/paramserializer.js";

export async function DocumentKeywords(
  documentId: string,
  unmask: boolean
): Promise<AxiosResponse> {
  const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${Document.endpoint}/${documentId}/keywords`;
  const options = new RequestOptions(
    {
      url: fullUrl, 
      method: HttpMethod.GET,
      params: unmask ? { 'unmask': `${unmask}` } : undefined,
      paramsSerializer: unmask? ParamSerializer : undefined
    }
  );
  return await RunRequest(options);
}
