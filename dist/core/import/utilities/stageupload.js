export async function stageupload(fileExtension, fileSize) {
    let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads`;
    let data = JSON.stringify({
        "fileExtension": `${fileExtension}`,
        "fileSize": `${fileSize}`
    });
    let request = {
        method: 'post',
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
    return response.data;
}
