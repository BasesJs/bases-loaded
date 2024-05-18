import { keyword } from './keyword.js';
export class keywordcollection {
    constructor(keywordGuid, items) {
        if (keywordGuid != null) {
            this.keywordGuid = keywordGuid;
        }
        if (items != null) {
            this.items = items;
        }
    }
    keywordGuid = "";
    items = [];
    async addKeyword(keywordName, values) {
        let keywords = [];
        let kw = await keyword.create(keywordName, values);
        keywords.push(kw);
        let keys = {
            "keywords": keywords
        };
        this.items.push(keys);
    }
    static async create(documentTypeId) {
        const kwC = new keywordcollection();
        let dt = await global.bases.core.documenttypes.getbyid(documentTypeId);
        let data = await dt.defaultKeywords();
        kwC.keywordGuid = data.keywordGuid;
        return kwC;
    }
}
