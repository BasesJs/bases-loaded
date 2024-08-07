//import { keywords } from '../keywords/keywords.js';
import { documenttype } from '../document-types/documenttype.js';
import { core } from '../core.js';
import { bestguess } from './bestguessfiletype.js';

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
    //keywordCollection = new keywords();
    static async create(documentTypeName:string, fileExtension:string, documentDate:Date){
        const docInfo = new documentinfo();
        let items = await bases.core.documenttypes.get(documentTypeName);
        let doctype = items[0];
        docInfo.documentTypeId = items[0].id;
        docInfo.fileTypeId = await bestguess(fileExtension);      
        //docInfo.keywordCollection = await keywords.create(docInfo.documentTypeId);   
        docInfo.documentDate = documentDate.toString();
        return docInfo;
    }
}

