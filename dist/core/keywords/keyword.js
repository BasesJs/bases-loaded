import { keywordtype } from '../keyword-types/keywordtype.js';
export class keyword {
    constructor(id, name, dataType, values) {
        this.id = id;
        this.name = name;
        this.dataType = dataType;
        this.values = values;
    }
    id = "";
    name = "";
    values = [];
    dataType = "";
    static parse(item) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        let name;
        let datatype;
        let values = [];
        keywordtype.get(item.typeId)
            .then((keyType) => {
            name = keyType.name;
            datatype = keyType.dataType;
        })
            .catch((e) => { console.log(e); });
        item.values.forEach((val) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(item.typeId, name, datatype, values);
    }
    static async parseAsync(item) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        let keyType = await keywordtype.get(item.typeId);
        let id = keyType.id;
        let name = keyType.name;
        let datatype = keyType.dataType;
        let values = [];
        item.values.forEach((val) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(id, name, datatype, values);
    }
}
export class keywordvalue {
    constructor(value, formattedValue) {
        this.value = value;
        this.formattedValue = formattedValue;
    }
    value;
    formattedValue;
    static parse(item) {
        return new keywordvalue(item.value, item.formattedValue);
    }
}
