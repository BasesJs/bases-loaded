import { DocumentType } from '../document-types/documenttype.js';
import { FileType } from '../file-types/filetype.js';
import { KeywordModifier } from '../keyword-collections/keywordmodifier.js';
import { KeywordCollection } from '../keyword-collections/keywordcollections.js';

export class DocumentImport {
    DocumentType: DocumentType;
    FileType: FileType;
    DocumentDate: Date;
    FilePaths: string[];
    FileExtension: string;
    UploadIds?: string[];
    KeywordCollection: KeywordModifier;
    storeAsNew: boolean;

    constructor(documentType: DocumentType, FileType: FileType, documentDate: Date, filePaths: string[], fileExtension: string, keywordModifier: KeywordModifier, storeAsNew: boolean = true) {
        this.DocumentType = documentType;
        this.FileType = FileType;
        this.DocumentDate = documentDate;
        this.FilePaths = filePaths;
        this.FileExtension = fileExtension;
        this.UploadIds = [];
        this.KeywordCollection = keywordModifier;
        this.storeAsNew = storeAsNew;
    }

    static async create(documentTypeId: string, filePaths: string[], documentDate: Date, storeAsNew: boolean = true): Promise<DocumentImport> {
        const docType = await DocumentType.get(documentTypeId);
        const kewordcollection: KeywordCollection = await docType.DefutlKeywords();
        const newKeyMod = new KeywordModifier(kewordcollection.keywordGuid, kewordcollection.items);
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

        return new DocumentImport(docType, fileType, documentDate, filePaths, fileExtension, newKeyMod, storeAsNew);
    }
}

function getFileExtension(filePath: string): string {
    const parts = filePath.split('.');
    return parts.length > 1 ? parts.pop()! : '';
}