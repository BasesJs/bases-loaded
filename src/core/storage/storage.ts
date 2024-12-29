import { Bases } from '../../bases.js';
import { Core } from '../core.js';
import { DocumentImport } from './documentimport.js';
import { deleteupload } from './utilities/deleteupload.js';
import { importBytes } from './utilities/importbytes.js';
export class Storage {
  static readonly endpoint = `/documents/uploads`;
  static createDocumentImport(documentTypeId: string, filePaths: string[], documentDate: Date): Promise<DocumentImport> {
    return DocumentImport.create(documentTypeId, filePaths, documentDate);
  }
  static async import(documentImport: DocumentImport): Promise<void> {
    try {
      await importBytes(documentImport);
    } catch (err) {
      console.error('Import error:', err);
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

