import { FileType, FileTypeItem } from "@/core/file-types/filetype.js";
export async function bestguessfiletype(fileExtension: string) : Promise<FileType> {
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
  let fileType = FileType.parse(response.data as FileTypeItem);
  return fileType;
}