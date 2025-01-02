import { error } from 'console';
import { Bases } from '../../bases.js';
import { Core } from '../core.js';
import { DocumentImport } from './documentimport.js';
import { deleteupload } from './utilities/deleteupload.js';
import { importBytes } from './utilities/importbytes.js';
import { sendMetadata } from './utilities/sendmetadata.js';

export class Storage {
  static readonly endpoint = `/documents/uploads`;
  static async createDocumentImport(documentTypeId: string, filePaths: string[], documentDate: Date): Promise<DocumentImport> {
    return DocumentImport.create(documentTypeId, filePaths, documentDate);
  }
  /**
   * 
   * @param documentImport A DocumentImport object that contains the document type, file type, document date, and file paths and a keyword collection.
   * @param progressCallback An option function to pass to report back the progress of the import.
   * @returns 
   */
  static async import(documentImport: DocumentImport, progressCallback?: (progressPercent: number) => void): Promise<string> {
    try {
      console.log("Importing bytes...");
      await importBytes(documentImport, progressCallback);
      console.log("Sending metadata...");
      let response = await sendMetadata(documentImport);
      if(response.status === 300){
        throw new Error("A document with the same keyword already exists. If this is meant to be a revision, set 'storeAsNew' to false in the DocumentImport object. Otherwise, atleast one of keyword values should be different.");
      }
      return response.data.id;
    } catch (err) {
      throw error('Import error:', err);
    }
  }
  /**
   * This is a multi-step process that will cancel the import process, calling the abort controller and clearing the staged uploads.
   * @returns void
   */
  static async cancel(documentImport: DocumentImport): Promise<void> {
    setTimeout(() => {
      Bases.instance.abortController.abort();
    }, 5000);
    documentImport.UploadIds?.forEach(async (id, index, array) => {
      try {
        const data = await deleteupload(id);
        array.splice(index, 1);
      } catch (err) {
        console.error(`Error deleting upload ID ${id}:`, err);
      }
    });
  }
}

