"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentupload = void 0;
const documentinfo_1 = require("./documentinfo");
const stageupload_1 = require("./stageupload");
const uploadpart_1 = require("./uploadpart");
const splitFile_1 = require("../utilities/splitFile");
class documentupload {
    constructor(parts = [], documentinfo = "", uploadId = "") {
        this.uploadId = "";
        this.parts = [];
        this.documentinfo = "";
        if (documentinfo != null) {
            this.documentinfo = documentinfo;
        }
        if (parts != null) {
            this.parts = parts;
        }
        if (uploadId != null) {
            this.uploadId = uploadId;
        }
    }
    setFileTypeByName(fileTypeName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.documentinfo.fileTypeId = yield global.bases.core.filetypes.get(fileTypeName);
        });
    }
    uploadParts() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Uploading Parts...');
            let uploaded = 0;
            let x = 100 / this.parts.length;
            for (const part of this.parts) {
                let resp = yield (0, uploadpart_1.uploadpart)(this.uploadId, part.partNum, part.bytes);
                uploaded++;
                console.log(`Uploading: ${Math.round(uploaded * x)}%`);
            }
        });
    }
    post() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Posting Metadata");
            let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}/documents`;
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
                data: data
            };
            const response = yield global.bases.client.request(request);
            return response;
        });
    }
    static create(file, fileExtension, documentTypeName, documentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const docinfo = yield documentinfo_1.documentinfo.create(documentTypeName, fileExtension, documentDate);
            let stageResp = yield (0, stageupload_1.stageupload)(fileExtension, file.byteLength);
            let upload = {
                "id": `${stageResp.id}`
            };
            docinfo.uploads.push(upload);
            let parts = yield (0, splitFile_1.splitFile)(file, stageResp.numberOfParts, stageResp.filePartSize);
            const docupload = new documentupload(parts, docinfo, stageResp.id);
            return docupload;
        });
    }
}
exports.documentupload = documentupload;
