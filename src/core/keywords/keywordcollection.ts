const documenttype = require('../document-types/documenttype');
const keyword = require('./keyword')

class keywordcollection {
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
        const kwC = new keywordcollection()
        let dt = await global.bases.core.documenttypes.getById(documentTypeId);
        let data = await dt.defaultKeywords();
        kwC.keywordGuid = data.keywordGuid;
        return kwC;
    }
}
module.exports = keywordcollection;