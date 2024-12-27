import { DocumentImport } from './documentmodifier.js';
import * as fs from 'fs/promises';
import { splitfile } from './utilities/splitFile.js';
import { uploadpart } from './utilities/uploadpart.js';
import { deleteupload } from './utilities/deleteupload.js';
import { stageupload } from './utilities/stageupload.js';

export interface IStorage {
  endpoint: string;
  documentImport: DocumentImport;
  storeAsNew: boolean;
  import(): Promise<void>;
  cancel(): Promise<void>;
}

export class Storage implements IStorage {
  endpoint = `${global.bases.apiURI}${global.bases.core.endpoint}/documents`;
  documentImport: DocumentImport;
  storeAsNew = true;

  constructor(documentImport: DocumentImport) {
    this.documentImport = documentImport;
  }

  async import(): Promise<void> {
    try {
      await importBytes(this.documentImport);
    } catch (err) {
      console.error('Import error:', err);
    }
  }
  /**
   * This is a multi-step process that will cancel the import process, calling the abort controller and clearing the staged uploads.
   * @returns void
   */
  async cancel(): Promise<void> {
    setTimeout(() => {
      global.bases.abortController.abort();
    }, 5000);
    this.documentImport.UploadIds?.forEach(async (id, index, array) => {
      try {
        const data = await deleteupload(id);
        array.splice(index, 1);
      } catch (err) {
        console.error(`Error deleting upload ID ${id}:`, err);
      }
    });    
  }
}

export async function importBytes(documentImport: DocumentImport, progressCallback?: (progressPercent: number) => void): Promise<void> {
  for (const path of documentImport.FilePaths) {
    const file = await fs.readFile(path);
      const response = await stageupload(documentImport.FileExtension, file.byteLength);

      documentImport.UploadIds?.push(response.data.id);
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
  documentImport: DocumentImport;
  storeAsNew = false;  
}
export class ImportRendition implements IStorage {
  endpoint = `${global.bases.apiURI}${global.bases.core.endpoint}/revisions`
  documentImport: DocumentImport;
  storeAsNew = false;
}
*/
