import { keywordtype } from '../keyword-types/keywordtype.js';
export class keyword {
    constructor(id, name, values) {
        this.id = id;
        this.name = name;
        this.values = values;
    }
    id = "";
    name = "";
    values = [];
    static parse(item) {
        let values = [];
        item.values.forEach((val) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(item.typeId, item.name ? item.name : undefined, values);
    }
    static async parseAsync(item) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        let keyType = await keywordtype.get(item.typeId);
        let id = keyType.id;
        let name = keyType.name;
        let values = [];
        item.values.forEach((val) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(id, name, values);
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
export class keywords {
    constructor() { }
    items = [];
}
