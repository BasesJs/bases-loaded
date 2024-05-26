import base  from '../baseclass/baseclass.js';
import { _get, _getbyid } from '../baseclass/basegroup.js';
import { keyword } from '../keywords/keyword.js';
import { keywordgroup } from '../keywords/keywordgroup.js';

export class document extends base {
    constructor(item: any) {
        super(item.id, item.name, item.systemName? item.systemName : "");
        this.typeId = item.typeId;
        this.createdByUserId = item.createdByUserId;
        this.storeDate = item.storeDate;
        this.documentDate = item.documentDate;
        this.status = item.status;
        this.captureProperties = item.captureProperties? item.captureProperties : {};
        this.keywords = [];
        this.sikgs = [];
        this.mikgs = [];
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
    keywords: keyword[];
    sikgs: keywordgroup[];
    mikgs: keywordgroup[];    
    keywordGuid: string;
}

const endpoint1 = "/documents";

async function get(id:string, getkeywords = true ): Promise<any> {
    const data = await _getbyid(endpoint1, id);
    const doc = new document(data);
    if(getkeywords){
        const keywords = await _getbyid(id+"/keywords", endpoint1);
        
    }

}