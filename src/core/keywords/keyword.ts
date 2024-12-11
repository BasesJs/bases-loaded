import { KeywordType } from '../keyword-types/keywordtype.js';
import { NewKeywordValue, KeywordValue, KeywordValueItem } from './keywordvalue.js';

export class Keyword implements KeywordItem {
    constructor(id: string, values: KeywordValue[], name: string = "", dataType: string = "") {
        this.typeId = id;
        this.name = name;
        this.dataType = dataType;
        this.values = values;
    }
    typeId: string;
    name: string = "";
    values: KeywordValue[];
    dataType?: string = "";
    static parse(item: KeywordItem) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        let name: string = "";
        let datatype: string = "";
        let values: KeywordValue[] = [];
        KeywordType.get(item.typeId)
            .then((keyType: KeywordType | null) => {
                if (keyType === null) {
                    throw new Error("KeywordType is null");
                }
                name = keyType.name;
                datatype = keyType.dataType;
            })
            .catch((e: any) => { console.log(e); });
        item.values.forEach((val: any) => {
            values.push(KeywordValue.parse(val));
        });
        return new Keyword(item.typeId, values, name, datatype);
    }
    static async parseAsync(item: KeywordItem) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        try {
            const keyType = await KeywordType.get(item.typeId);
            if (!keyType) {
                throw new Error("KeywordType is null");
            }
    
            const values = item.values.map(val => KeywordValue.parse(val));
    
            return new Keyword(keyType.id, values, keyType.name, keyType.dataType);
        } catch (e) {
            console.error(e);
            throw e; // Consider rethrowing or handling appropriately
        }
    }
}
export class NewKeyword implements KeywordItem {
    constructor(id:string, values:NewKeywordValue[]){
        this.typeId = id;
        this.values = values;
    }
    typeId: string;
    values: NewKeywordValue[];
    addValue(value: string) {
        let newValue = {
            value: value
        }
        this.values.push(newValue);
    }
    static parse(item: KeywordItem) : NewKeyword {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }        
        return new NewKeyword(item.typeId, item.values);
    }
  }

  export interface KeywordItem {
    typeId: string;
    values: KeywordValueItem[];
  }
