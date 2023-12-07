const keyword = require('./keyword');
const doctype = require('../document-types/documenttype')
const core = require('../core');

class keywordcollection {
    constructor(keywordGuid = null, items = null){
        if(keywordGuid != null){
            this.keywordGuid = keywordGuid;
        }
        if(items != null){
            this.items = items;
        }
    }
    keywordGuid = "";
    items = [];    
    async addKeyword(keywordName, values){
        //need to look this over
        let keywords =[];        
        let kw = await keyword.create(keywordName, values);
        keywords.push(kw);
        let keys = {
            "keywords": keywords
        }
        this.items.push(keys); 
    }
    static async create(documentTypeId){
        const kwC = new keywordcollection()
        let dt = await global.bases.core.doctypes.getById(documentTypeId); //We should have the doctype ID why get it again?
        let data = await dt.defaultKeywords();
        kwC.keywordGuid = data.keywordGuid;
        //kwC.items = data.items;
        return kwC;
    }
}
module.exports = keywordcollection;