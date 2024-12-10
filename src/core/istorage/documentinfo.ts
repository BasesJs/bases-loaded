import { DocumentType } from '../document-types/documenttype.js';
import { bestguessfiletype } from './utilities/bestguessfiletype.js';
import { FileType } from '../file-types/filetype.js';

export class DocumentInfo {
    documentType: DocumentType;
    fileType: FileType;
    documentDate: Date;
    filePaths: string[];
    fileExtension: string;
    uploadIds: string[];

    constructor(documentType: DocumentType, fileType: FileType, documentDate: Date, filePaths: string[], fileExtension: string) {
        this.documentType = documentType;
        this.fileType = fileType;
        this.documentDate = documentDate;
        this.filePaths = filePaths;
        this.fileExtension = fileExtension;
        this.uploadIds = [];
    }

    static async create(documentTypeId: string, filePaths: string[], documentDate: Date): Promise<DocumentInfo> {
        const docType = await DocumentType.get(documentTypeId);
        const fileExtension = getFileExtension(filePaths[0]);
        
        if (!filePaths.every(path => path.split('.').pop() === fileExtension)) {
            throw new Error("All files in a document must have the same file extension.");
        }

        const fileType = await bestguessfiletype(fileExtension);
        return new DocumentInfo(docType, fileType, documentDate, filePaths, fileExtension);
    }
}

function getFileExtension(filePath: string): string {
    const parts = filePath.split('.');
    return parts.length > 1 ? parts.pop()! : '';
}