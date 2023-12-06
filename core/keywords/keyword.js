const keytypes = require('../keyword-types/keywordtypes');
const core = require('../core');

class keyword {
    constructor(typeId = null, values =[]){
        if(typeId != null){
            this.typeId = typeId;
        }
        if(values.length > 0){
            this.values = values;
        }
    }
    typeId = "";
    values = [];
    static async create(keywordName, values){
        const kw = new keyword();
        let items = await global.bases.core.keytypes.get('systemName', keywordName);
        kw.typeId = items[0].id;
        if(Array.isArray(values)){
            values.forEach(item => {
                let value = {
                    "value": item
                }
                kw.values.push(value)
            });
        }
        else{
            let value = {
                "value": values
            }
            kw.values.push(value);
        }     
        return kw;   
    }
}
module.exports = keyword;