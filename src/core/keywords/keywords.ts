import { documenttype } from '../document-types/documenttype.js'
import { keyword } from './keyword.js';

export class keywords {
    constructor(keywordGuid?:string, items?:any[]){
        if(keywordGuid != null){
            this.keywordGuid = keywordGuid;
        }
        if(items != null){
            this.items = items;
        }
    }
    keywordGuid = "";
    items:any = [];    
    async addKeyword(keywordName:string, values:string[]){
        //need to look this over
        let keywords =[];        
        let kw = await keyword.create(keywordName, values);
        keywords.push(kw);
        let keys = {
            "keywords": keywords
        }
        this.items.push(keys); 
    }
    static async create(documentTypeId:string){
        const kwC = new keywords()
        let dt = await global.bases.core.documenttypes.get(documentTypeId);
        let data = await dt.defaultKeywords();
        kwC.keywordGuid = data.keywordGuid;
        let keywordTypes = data.items.find((item:any) => item.keywordType == "Document");
        return kwC;
    }
}