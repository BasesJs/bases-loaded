export async function deleteupload(uploadId: string) {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads/${uploadId}`
  let data = "";
  let request = {
      method: 'del',
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