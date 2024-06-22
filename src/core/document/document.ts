import base  from '../baseclass/baseclass.js';
import { _getbyid }  from '../baseclass/basegroup.js';
import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';
import { keyword } from '../keywords/keyword.js';
import { multirecordgroup, recordgroup } from '../keywords/keywordgroup.js';
import { filetypes } from '../file-types/filetypes.js';
import { revision } from './revision.js';

const mime = require('node-mime');

export class document extends base {
    constructor(item: any) {
        super(item.id, item.name, item.systemName? item.systemName : "");
        this.typeId = item.typeId;
        this.createdByUserId = item.createdByUserId;
        this.storeDate = item.storeDate;
        this.documentDate = item.documentDate;
        this.status = item.status;
        this.captureProperties = item.captureProperties? item.captureProperties : {};
        this.keywordGuid = item.keywordGuid? item.keywordGuid : "";
    }
    typeId: string;
    createdByUserId: string;
    storeDate: string;
    documentDate: string;
    status: string;
    captureProperties?: {
        unidentified?: boolean,
        reviewStatus?: string,
    }
    keywords: keyword[] = [];
    recordgroups: recordgroup[] = [];
    multirecordgroups: multirecordgroup[] = [];    
    revisions:revision[] = [];
    keywordGuid: string;
    static endpoint:string = "/documents";
    static async get(id:string, getKeywords:boolean = true): Promise<any> {
        const data = await _getbyid(id, this.endpoint);
        const doc = new document(data);
        if(getKeywords){
            
        }              
        return doc;
    };
    async getKeywords(): Promise<any> {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/keywords`;
        let options = new RequestOptions(
            httpMethod.GET, 
            fullUrl,         
            {
                'Content-Type': 'application/json', 
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',        
            '');
        const response = await RunRequest(options);   
        //return response.data;
        //let keywords = await _getbyid(this.id+"/keywords", document.endpoint);

    };
    async download(revision:string = "latest", rendition:string ="default"): Promise<any> {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
        let data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, document.endpoint);
        let fileTypeId = data.fileTypeId;
        let filetype = await filetypes.get(fileTypeId);
        //filetype.
        //return data;
    }
}

async function get(id:string, endpoint:string): Promise<any>{

}