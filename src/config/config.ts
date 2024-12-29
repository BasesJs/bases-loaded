
import { Bases } from "../bases.js";
import { Identity } from "../identity/identity.js";
import { FileTypeMimeMap } from "./FileTypeMimeMap.js";

export const Config = {
  environment: {
    name: process.env.BASES_ENVIRONMENT,
    idpUri: process.env.BASES_IDP_BASE,
    apiUri: process.env.BASES_API_BASE,
    grant: process.env.BASES_GRANT_TYPE,
    scope: process.env.BASES_SCOPE,
    clientid: process.env.BASES_CLIENT_ID,
    secret: process.env.BASES_CLIENT_SECRET,
    tenant: process.env.BASES_TENANT,
    useQueryMetering: process.env.BASES_USE_QUERY_METERING ? process.env.BASES_USE_QUERY_METERING : false, 
  },
  axios: {
    httpTimeout: process.env.BASES_HTTP_TIMEOUT ?? 10000,
    maxContentLength: process.env.BASES_MAX_CONTENT_LENGTH ?? Infinity,
    maxBodyLength: process.env.BASES_MAX_BODY_LENGTH ?? Infinity
  },
  core: {
    fileTypeMimeMap: FileTypeMimeMap,
    imageFileFormatPreference: process.env.BASES_IMAGE_FILE_FORMAT_PREFERENCE ?? "png" //JPG, PNG, TIFFF
  }
}
