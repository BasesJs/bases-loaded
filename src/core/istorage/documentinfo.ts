import { DocumentType } from '../document-types/documenttype.js';
import { FileType } from '../file-types/filetype.js';
import { KeywordValueCollection } from "../keywordcollection/keywordvaluecollection.js";
import { KeywordCollection } from '../keywordcollection/keywordcollection.js';

export class DocumentInfo {
    DocumentType: DocumentType;
    FileType: FileType;
    DocumentDate: Date;
    FilePaths: string[];
    FileExtension: string;
    UploadIds: string[];
    //KeywordCollection: KeywordValueCollection | KeywordCollection; 

    constructor(documentType: DocumentType, fileType: FileType, documentDate: Date, filePaths: string[], fileExtension: string) {
        this.DocumentType = documentType;
        this.FileType = fileType;
        this.DocumentDate = documentDate;
        this.FilePaths = filePaths;
        this.FileExtension = fileExtension;
        this.UploadIds = [];
        //this.KeyowrdCollection = KeyowrdCollection;
    }

    static async create(documentTypeId: string, filePaths: string[], documentDate: Date): Promise<DocumentInfo> {
        const docType = await DocumentType.get(documentTypeId);
        if(docType === null){
            throw new Error("DocumentType does not exist");
        }
        const fileExtension = getFileExtension(filePaths[0]);

        if (!filePaths.every(path => path.split('.').pop() === fileExtension)) {
            throw new Error("All files in a document must have the same file extension.");
        }

        let fileTypeId = await FileType.bestGuess(fileExtension);
        if (fileTypeId === null) {
            throw new Error("Could not determine FileType.");
        }
        let fileType = await FileType.get(fileTypeId);
        if (fileType === null) {
            throw new Error("FileType does not exist.");
        };       

        return new DocumentInfo(docType, fileType, documentDate, filePaths, fileExtension);
    }
}

function getFileExtension(filePath: string): string {
    const parts = filePath.split('.');
    return parts.length > 1 ? parts.pop()! : '';
}