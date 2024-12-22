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

export async function importBytes(documentInfo: DocumentInfo, progressCallback?: (progressPercent: number) => void): Promise<void> {
  for (const path of documentInfo.FilePaths) {
    const file = await fs.readFile(path);
      const response = await stageupload(documentInfo.FileExtension, file.byteLength);

      documentInfo.UploadIds.push(response.data.id);
      const parts = splitfile(file, response.data.numberOfParts, response.data.filePartSize);

      let uploaded = 0;
      const increment = 100 / parts.length;
      await Promise.all(parts.map(async (part) => {
        try {
          const resp = await uploadpart(response.data.id, part.partNum.toString(), part.bytes);
          uploaded++;
          if (progressCallback) {
            progressCallback(Math.round(uploaded * increment));
          }
        } catch (error) {
          throw new Error('Failed to upload part');
        }
      }))
      .catch((error) => {
        throw error;
      });
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
