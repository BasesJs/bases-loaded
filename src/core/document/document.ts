import { base, _getbyid }  from '../baseclass/baseclass.js';
import { RunRequest, RequestOptions, httpMethod } from '../../helpers/http/httprequest.js';
import { keyword } from '../keywords/keyword.js';
import { multirecordgroup, recordgroup, multirecordgroups } from '../keywords/keywordgroup.js';
import { filetypes } from '../file-types/filetypes.js';
import { revision, getRevisions } from './revision.js';
import { rendition, getRenditions } from './rendition.js';

export class document extends base {
    constructor(id:string, name:string, typeId:string, createdByUserId:string, storeDate:string, documentDate:string, status:string, captureProperties?:{ unidentified?: boolean, reviewStatus?: string }){
        super(id, name, name);
        this.typeId = typeId;
        this.createdByUserId = createdByUserId;
        this.storeDate = storeDate;
        this.documentDate = documentDate;
        this.status = status;
        this.captureProperties = captureProperties;
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
    keywords:keyword[] = [];
    recordgroups:recordgroup[] = [];
    multirecordgroups:multirecordgroups = new multirecordgroups();    
    revisions:revision[] = [];
    keywordGuid: string = "";
    static endpoint:string = "/documents";
    static parse(data:any): document {
        return new document(data.id, data.name, data.typeId, data.createdByUserId, data.storeDate, data.documentDate, data.status, data.captureProperties);
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
            httpMethod.GET, 
            fullUrl,         
            {
                'Content-Type': 'application/json', 
                'Authorization': `${global.bases.identity.token.token_type} ${global.bases.identity.token.access_token}`
            },
            'follow',        
            '');
        const response = await RunRequest(options);
        this.keywordGuid = response.data.keywordGuid;  
        response.data.items.forEach(async (item:any) => {
            if(item.typeGroupId === undefined && item.groupId == undefined){                  
                item.keywords.forEach(async (k:any) => {
                    let kw = await keyword.parseAsync(k);
                    this.keywords.push(kw);                     
                }); 
            }
            else if(item.typeGroupId != undefined && item.groupId == undefined){
                let sikg = await recordgroup.parseAsync(item);
                this.recordgroups.push(sikg);                
            }
            else if(item.typeGroupId != undefined && item.groupId != undefined){
                let mikg = await multirecordgroup.parseAsync(item);
                await this.multirecordgroups.add(mikg);
            }
        });
    };
    async download(revision:string = "latest", rendition:string ="default"): Promise<any> {
        let fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${document.endpoint}/${this.id}/revisions/${revision}/renditions/${rendition}`;
        let data = await _getbyid(`${this.id}/revisions/${revision}/renditions/${rendition}`, document.endpoint);
        let fileTypeId = data.fileTypeId;
        let filetype = await filetypes.get(fileTypeId);
        let doc = await getDocument(this.id, document.endpoint);
        //return data;
    }
}
async function getDocument(id:string, endpoint:string): Promise<any>{

}