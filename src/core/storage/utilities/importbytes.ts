import { DocumentImport } from '.././documentimport.js';
import * as fs from 'fs/promises';
import { splitfile } from '.././utilities/splitFile.js';
import { uploadpart } from '.././utilities/uploadpart.js';
import { stageupload } from '.././utilities/stageupload.js';

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