
const documentinfo = require('./documentinfo');
const stageupload = require('./stageupload');
const uploadpart = require('./uploadpart');
const deleteUpload = require('./deleteupload');
const splitFile = require('../utilities/splitFile');
const core = require('../core');

class documentupload {
    constructor(parts = null, documentinfo = null, uploadId = null){       
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
    uploadId = "";
    parts = [];
    documentinfo = new documentinfo();
    async setFileTypeByName(fileTypeName){
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
    static async create(file, fileExtension, documentTypeName){ 
        const docinfo = await documentinfo.create(documentTypeName, fileExtension);        
        let stageResp = await stageupload(fileExtension, file.byteLength);
        let upload = {
            "id":`${stageResp.id}`
        }
        docinfo.uploads.push(upload);        
        let parts = await splitFile(file, stageResp.numberOfParts, stageResp.filePartSize);
        const docupload = new documentupload(parts, docinfo, stageResp.id);  
        return docupload;
    }
}
module.exports = documentupload;