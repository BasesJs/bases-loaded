import { splitfile } from '../utilities/splitFile.js';
import { stageupload } from './stageupload.js';
import { uploadpart } from './uploadpart.js';
import { bestguess } from './bestguessfiletype.js';
import { documentinfo } from "./documentinfo.js";
export class documentupload {
    constructor(uploadId, parts, documentinfo) {
        this.uploadId = uploadId;
        this.parts = parts;
        this.docinfo = documentinfo;
    }
    uploadId;
    parts;
    docinfo;
    async setFileTypeByName(fileTypeName) {
        this.docinfo.fileTypeId = await global.bases.core.filetypes.get(fileTypeName)[0];
    }
    async bestGuessFileType(fileExtension) {
        this.docinfo.fileTypeId = await bestguess(fileExtension);
    }
    async uploadParts() {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents`;
        let data = JSON.stringify(this.docinfo);
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
            data: data
        };
        const response = await global.bases.client.request(request);
        return response;
    }
    async post() {
        console.log('Uploading Parts...');
        let uploaded = 0;
        let x = 100 / this.parts.length;
        for (const part of this.parts) {
            let resp = await uploadpart(this.uploadId, part.partNum, part.bytes);
            uploaded++;
            console.log(`Uploading: ${Math.round(uploaded * x)}%`);
        }
    }
    static async create(file, fileExtension, documentTypeName, documentDate) {
        const docinfo = await documentinfo.create(documentTypeName, fileExtension, documentDate);
        let stageResp = await stageupload(fileExtension, file.byteLength);
        let upload = {
            "id": `${stageResp.id}`
        };
        docinfo.uploads.push(upload);
        let parts = await splitfile(file, stageResp.numberOfParts, stageResp.filePartSize);
        const docupload = new documentupload(stageResp.id, parts, docinfo);
        return docupload;
    }
}
