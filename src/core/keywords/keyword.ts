import { KeywordType } from '../keyword-types/keywordtype.js';
import { NewKeywordValue, KeywordValue } from './keywordvalue.js';

export interface IKeyword {
    id: string;
    values: NewKeywordValue[] | KeywordValue[];
}
export class Keyword implements IKeyword {
    constructor(id: string, values: KeywordValue[], name: string = "", dataType: string = "") {
        this.id = id;
        this.name = name;
        this.dataType = dataType;
        this.values = values;
    }
    id: string;
    name: string = "";
    values: KeywordValue[];
    dataType?: string = "";
    static parse(item: any) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        let name: string = "";
        let datatype: string = "";
        let values: KeywordValue[] = [];
        KeywordType.get(item.typeId)
            .then((keyType: KeywordType) => {
                name = keyType.name;
                datatype = keyType.dataType;
            })
            .catch((e: any) => { console.log(e); });
        item.values.forEach((val: any) => {
            values.push(KeywordValue.parse(val));
        });
        return new Keyword(item.typeId, values, name, datatype);
    }
    static async parseAsync(item: any) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        let keyType = await KeywordType.get(item.typeId);
        let id = keyType.id;
        let name = keyType.name;
        let datatype = keyType.dataType;
        let values: KeywordValue[] = [];
        item.values.forEach((val: any) => {
            values.push(KeywordValue.parse(val));
        });
        return new Keyword(id, values, name, datatype);
    }
}
export class NewKeyword implements IKeyword {
    constructor(id:string, values:NewKeywordValue[]){
        this.id = id;
        this.values = values;
    }
    id: string;
    values: NewKeywordValue[];
    addValue(value: string) {
        let newValue = {
            value: value
        }
        this.values.push(newValue);
    }
    static parse(item: any) : NewKeyword {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }        
        return new NewKeyword(item.typeId, item.values);
    }
  }
