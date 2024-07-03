import { base, _getbyid }  from '../baseclass/baseclass.js';
import { RunRequest, RequestOptions, HttpMethod } from '../../helpers/http/httprequest.js';
import { keyword } from '../keywords/keyword.js';
import { multirecordgroup, recordgroup } from '../keywords/keywordgroup.js';
import { filetypes } from '../file-types/filetypes.js';
import { revision, getRevisions } from './revision.js';
import { rendition, getRenditions } from './rendition.js';

export class document extends base {
    constructor(id:string, name:string, typeId:string, createdByUserId:string, storedDate:string, documentDate:string, status:string, captureProperties?:captureProperties){
        super(id, name, name);
        this.typeId = typeId;
        this.createdByUserId = createdByUserId;
        this.storedDate = storedDate;
        this.documentDate = documentDate;
        this.status = status;
        this.captureProperties = captureProperties;
    }
    typeId: string;
    createdByUserId: string;
    storedDate: string;
    documentDate: string;
    status: string;
    captureProperties?:captureProperties;
    keywords:keyword[] = [];
    recordgroups:recordgroup[] = [];
    multirecordgroups:Map<string,multirecordgroup[]> = new Map<string,multirecordgroup[]>();   
    revisions:revision[] = [];
    keywordGuid: string = "";
    static endpoint:string = "/documents";
    static parse(data:any): document {
        return new document(data.id, data.name, data.typeId, data.createdByUserId, data.storedDate, data.documentDate, data.status, data.captureProperties);
    }
    static async get(id:string, getKeywords:boolean, getRevisions:boolean): Promise<any> {
        const data = await _getbyid(id, this.endpoint);
        const doc = document.parse(data);
        if(getKeywords){
            await doc.getKeywords();
        }              
        if(getRevisions){
            await doc.getRevisions();
        }
        return doc;
    };    
    async getRevisions(): Promise<any> {
        try{
            this.revisions = await getRevisions(this.id);
            this.revisions.forEach(async (rev:revision) => {
            rev.rendtions = await getRenditions(this.id, rev.id);
            });
        }
        catch(e){
            console.log(e);
        }
        
    }
    async getKeywords(): Promise<any> {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/keywords`;
        let options = new RequestOptions(
            HttpMethod.GET, 
            fullUrl,         
            {
                'Content-Type': 'application/json', 
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',        
            '');
        const response = await RunRequest(options);
        this.keywordGuid = response.data.keywordGuid;  
        let keys = response.data.items.filter((item:any) => item.typeGroupId === undefined && item.groupId == undefined);
        //There's only ever 1 standalone keyword object that contains all of the loose keywords.
        keys[0].keywords.forEach(async (k:any) => {
            let kw = await keyword.parseAsync(k);
            this.keywords.push(kw);                     
        }); 
        console.log("Keyword Count: ", keys.length);
        /*let sikgs = response.data.items.filter((item:any) => item.typeGroupId != undefined && item.groupId == undefined);
        console.log("SIKG Count: ", sikgs.length);
        sikgs.forEach(async (item:any) => {
            let sikg = await recordgroup.parseAsync(item);
            this.recordgroups.push(sikg);
        });
        let mikgs = response.data.items.filter((item:any) => item.typeGroupId != undefined && item.groupId != undefined);
        console.log("MIKG Count: ", mikgs.length);
        mikgs.forEach(async (item:any) => {
            let mikg = await multirecordgroup.parseAsync(item);
            if(this.multirecordgroups.has(mikg.typeGroupId)){
                let existingGroup = this.multirecordgroups.get(mikg.typeGroupId).recordgroups.push(await multirecordgroup.parseAsync(item));
            }
        });*/        
    };
    async download(revision:string = "latest", rendition:string ="default"): Promise<any> {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
        let data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, document.endpoint);
        let fileTypeId = data.fileTypeId;
        let filetype = await filetypes.get(fileTypeId);
        //let doc = await getDocument(this.id, document.endpoint);
        //return data;
    }
}

export class captureProperties {
    constructor(unidentified?: boolean, reviewStatus?: string){
        this.unidentified = unidentified;
        this.reviewStatus = reviewStatus;
    }
    unidentified?: boolean;
    reviewStatus?: string;
    static parse(item:any){
        return new captureProperties(item.unidentified, item.reviewStatus);
    }
}