"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const splitfile = require('../utilities/splitFile');
const stageupload = require('./stageupload');
const uploadpart = require('./uploadpart');
const deleteupload = require('./deleteupload');
const bestguess = require('./bestguessfiletype');
const core = require('../core');
const documentinfo_1 = __importDefault(require("./documentinfo"));
class documentimport {
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
        const docinfo = await documentinfo_1.default.create(documentTypeName, fileExtension, documentDate);
        let stageResp = await stageupload(fileExtension, file.byteLength);
        let upload = {
            "id": `${stageResp.id}`
        };
        docinfo.uploads.push(upload);
        let parts = await splitfile(file, stageResp.numberOfParts, stageResp.filePartSize);
        const docupload = new documentimport(stageResp.id, parts, docinfo);
        return docupload;
    }
}
module.exports = documentimport;
