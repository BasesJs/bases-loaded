export async function uploadpart(uploadId: string, partNum: string, partBinary: string) {
  let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/uploads/${uploadId}?filePart=${partNum}`;
  let data = partBinary;
  let request = {
      method: 'put',
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
  return response;
}