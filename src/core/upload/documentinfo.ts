import { keywordcollection } from "../keywords/keywordcollection";

export class documentinfo {
    constructor(documentTypeId?:string, fileTypeId?:string, documentDate?:Date)
    {
        if(documentTypeId != null){
            this.documentTypeId = documentTypeId;
        }
        if(fileTypeId != null){
            this.fileTypeId = fileTypeId;
        }
        if(documentDate != null){
            this.documentDate = documentDate.toString();
        }
    };
    documentTypeId:string = "Waiting for Response";
    fileTypeId:string = "";
    documentDate:string = "";
    uploads:any[] = [];
    keywordCollection = new keywordcollection();
    static async create(documentTypeName:string, fileExtension:string, documentDate:Date){
        const docInfo = new documentinfo();
        let items = await global.bases.core.documenttypes.get('systemName', documentTypeName);
        let doctype = items[0];
        docInfo.documentTypeId = items[0].id;
        docInfo.fileTypeId = await global.bases.core.filetypes.bestguess(fileExtension);   
        docInfo.keywordCollection = await keywordcollection.create(docInfo.documentTypeId);   
        docInfo.documentDate = documentDate.toString();
        return docInfo;
    }
}
