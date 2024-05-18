export class keyword {
    constructor(typeId = null, values =[]){
        if(typeId != null){
            this.typeId = typeId;
        }
        if(values.length > 0){
            this.values = values;
        }
    }
    typeId:string = "";
    values:any[] = [];
    static async create(keywordName:string, values:string[]){
        const kw = new keyword();
        let items = await global.bases.core.keywordtypes.get('systemName', keywordName);
        kw.typeId = items[0].id;
        if(Array.isArray(values)){
            values.forEach((item:string) => {
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