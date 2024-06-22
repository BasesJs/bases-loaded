export class keyword {
    constructor(typeId = null, values = []) {
        if (typeId != null) {
            this.id = typeId;
        }
        if (values.length > 0) {
            this.values = values;
        }
    }
    id = "";
    name = "";
    values = [];
    static async create(keywordName, values) {
        const kw = new keyword();
        let items = await global.bases.core.keywordtypes.get(keywordName);
        kw.id = items[0].id;
        if (Array.isArray(values)) {
            values.forEach((item) => {
                let value = {
                    "value": item
                };
                kw.values.push(value);
            });
        }
        else {
            let value = {
                "value": values
            };
            kw.values.push(value);
        }
        return kw;
    }
}
