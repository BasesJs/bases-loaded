import { DocumentImport } from '../documentimport.js';
import { RequestOptions, HttpMethod } from '../../../http/requestoptions.js';
import { RunRequest } from '../../../http/httprequest.js';
import { KeywordModifier } from '../../keyword-collections/keywordmodifier.js';
import { Bases } from '../../../bases.js';
import { Core } from '../../core.js';
import { AxiosResponse } from 'axios';

export async function sendMetadata(documentImport: DocumentImport): Promise<AxiosResponse> {
    const fullUrl = `${Bases.apiURI}${Core.endpoint}/documents`;
    let metaData = MetaData.create(documentImport);
    let strData = JSON.stringify(metaData);
    const options = new RequestOptions({ url: fullUrl, method: HttpMethod.POST, data: strData, validateStatus: (status: number) => status === 201 || status === 300});
    const response = await RunRequest(options);
    return response;
}

class MetaData {
    documentTypeId: string;
    fileTypeId: string;
    documentDate: string;
    uploads: any[];
    keywordCollection: KeywordModifier
    constructor(documentTypeId: string, fileTypeId: string, documentDate: string, uploadIds: any[], keywordCollection: KeywordModifier) {
        this.documentTypeId = documentTypeId;
        this.fileTypeId = fileTypeId;
        this.documentDate = documentDate;
        this.uploads = uploadIds;
        this.keywordCollection = keywordCollection;
    }
    static create(documentImport: DocumentImport): MetaData {
        let documentId = documentImport.DocumentType.id;
        let fileTypeId = documentImport.FileType.id;
        let year = documentImport.DocumentDate.getFullYear();
        let month = documentImport.DocumentDate.getMonth() < 10 ? `0${documentImport.DocumentDate.getMonth() + 1}` : documentImport.DocumentDate.getMonth() + 1;
        let day = documentImport.DocumentDate.getDate() < 10 ? `0${documentImport.DocumentDate.getDate()}` : documentImport.DocumentDate.getDate();
        let documentDate = `${year}-${month}-${day}`;
        let uploadIds: any[] = [];
        documentImport.UploadIds?.forEach(id => {
            uploadIds.push({ id: id });
        });
        return new MetaData(documentId, fileTypeId, documentDate, uploadIds, documentImport.KeywordCollection);
    }
}