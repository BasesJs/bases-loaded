import { DocumentInfo } from './documentinfo.js';
import * as fs from 'fs/promises';
import { splitfile } from './utilities/splitFile.js';
import { uploadpart } from './utilities/uploadpart.js';
import { deleteupload } from './utilities/deleteupload.js';
import { stageupload } from './utilities/stageupload.js';

export interface IStorage {
  endpoint: string;
  documentInfo: DocumentInfo;
  storeAsNew: boolean;
  import(): Promise<void>;
  cancel(): Promise<void>;
}

export class ImportDocument implements IStorage {
  endpoint = `${global.bases.apiURI}${global.bases.core.endpoint}/documents`;
  documentInfo: DocumentInfo;
  storeAsNew = true;

  constructor(documentInfo: DocumentInfo) {
    this.documentInfo = documentInfo;
  }

  async import(): Promise<void> {
    try {
      await importBytes(this.documentInfo);
    } catch (err) {
      console.error('Import error:', err);
    }
  }

  async cancel(): Promise<void> {
    for (const id of this.documentInfo.UploadIds) {
      try {
        const data = await deleteupload(id);
        console.log(data);
      } catch (err) {
        console.error(`Error deleting upload ID ${id}:`, err);
      }
    }
  }
}

export async function importBytes(documentInfo: DocumentInfo): Promise<void> {
  for (const path of documentInfo.FilePaths) {
    try {
      const file = await fs.readFile(path);
      const stageData = await stageupload(documentInfo.FileExtension, file.byteLength);

      documentInfo.UploadIds.push(stageData.id);
      const parts = await splitfile(file, stageData.numberOfParts, stageData.filePartSize);

      let uploaded = 0;
      const increment = 100 / parts.length;

      for (const part of parts) {
        try {
          const resp = await uploadpart(stageData.id, part.partNum.toString(), part.bytes);
          if (resp.statusCode === 200) {
            console.log(`Uploaded ${part.bytes} bytes of part #${part.partNum}`);
            uploaded++;
            console.log(`Uploading: ${Math.round(uploaded * increment)}%`);
          }
        } catch (err) {
          console.error('Failed to upload part:', err);
          throw new Error('Failed to upload part');
        }
      }
    } catch (err) {
      console.error(`Error processing file ${path}:`, err);
    }
  }
}

//TODO: ENDPOINTS NEED TO BE UPDATED
/*
export class ImportRevision implements IStorage {
  endpoint = `${global.bases.apiURI}${global.bases.core.endpoint}/documents/{docid}/revisions`
  documentInfo: DocumentInfo;
  storeAsNew = false;  
}
export class ImportRendition implements IStorage {
  endpoint = `${global.bases.apiURI}${global.bases.core.endpoint}/revisions`
  documentInfo: DocumentInfo;
  storeAsNew = false;
}
*/
