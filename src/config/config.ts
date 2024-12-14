export const Config = {
  environment: {
    name: process.env.ENVIRONMENT,
    idpUri: process.env.IDP_BASE,
    apiUri: process.env.API_BASE,
    grant: process.env.GRANT_TYPE,
    scope: process.env.SCOPE,
    clientid: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    tenant: process.env.TENANT,
  }
}
