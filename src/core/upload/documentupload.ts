
import { documentinfo } from './documentinfo';
import { stageupload } from './stageupload';
import { uploadpart } from './uploadpart';
import { deleteupload } from './deleteupload';
import { splitFile } from '../utilities/splitFile';

export class documentupload {
    constructor(parts:any[] = [], documentinfo:any = "", uploadId:string = ""){       
        if(documentinfo != null){
            this.documentinfo = documentinfo;
        }
        if(parts != null){
            this.parts = parts
        }
        if(uploadId != null){
            this.uploadId = uploadId;
        }
    }
    uploadId:string = "";
    parts:any[] = [];
    documentinfo:any = "";
    async setFileTypeByName(fileTypeName:string){
        this.documentinfo.fileTypeId = await global.bases.core.filetypes.get(fileTypeName);        
    }
    async uploadParts(){
        console.log('Uploading Parts...');
        let uploaded = 0;
        let x = 100 / this.parts.length;
        for(const part of this.parts){
            let resp = await uploadpart(this.uploadId, part.partNum, part.bytes)
            uploaded++;
            console.log(`Uploading: ${Math.round(uploaded * x)}%`);
        }        
    }
    async post(){
        console.log("Posting Metadata");
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents`
        let data = JSON.stringify(this.documentinfo);
        console.log(data);
        let request = {
            method: 'post',
            maxBodyLength: Infinity,
            url: fullUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`            
            },      
            redirect: 'follow',
            data : data
        };
        const response = await global.bases.client.request(request);             
        return response;
    }
    static async create(file:any, fileExtension:string, documentTypeName:string, documentDate:Date){ 
        const docinfo = await documentinfo.create(documentTypeName, fileExtension, documentDate);        
        let stageResp = await stageupload(fileExtension, file.byteLength);
        let upload = {
            "id":`${stageResp.id}`
        }
        docinfo.uploads.push(upload);        
        let parts:any[] = await splitFile(file, stageResp.numberOfParts, stageResp.filePartSize);
        const docupload = new documentupload(parts, docinfo, stageResp.id);  
        return docupload;
    }
}