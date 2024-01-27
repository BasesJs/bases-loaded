"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function bestguess(fileExtension) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/default-upload-file-types?extension=${fileExtension}`;
    let data = "";
    let request = {
        method: 'get',
        maxBodyLength: Infinity,
        url: fullUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
        },
        redirect: 'follow',
        data: data
    };
    const response = await global.bases.client.request(request);
    return response.data.id;
}
module.exports = bestguess;
