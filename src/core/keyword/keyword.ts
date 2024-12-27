import { KeywordType } from '../keyword-types/keywordtype.js';
import { KeywordValue, KeywordValueItem } from './keywordvalue.js';
import { parseFromHylandDateString } from '../keyword-types/utilities/datatypecheck.js';

export class Keyword implements KeywordItem {
    constructor(id: string, values: KeywordValue[]) {
        this.typeId = id;
        this.values = values;
    }
    readonly typeId: string;
    readonly values?: KeywordValue[];
    keywordType?: KeywordType;
    static parse(item: KeywordItem) {
        if (item.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        let values: KeywordValue[] = [];        
        item.values?.forEach((val: any) => {
            values.push(KeywordValue.parse(val));
        });
        return new Keyword(item.typeId, values);
    }
    async getKeywordType() {
        if (this.typeId === undefined) {
            throw new Error("No TypeId found in keyword");
        }
        this.keywordType = await KeywordType.get(this.typeId);
    }
    /**
     * Attempts to return the formattedValue, then the value as a string.
     * @param index If there are multiple values, this will return the value at the index. The default is 0, or the first value.
     * @returns a string representation of the value.
     */
    getValue(index: number = 0): string | undefined {
        if(this.values !== undefined){
            if(index < this.values.length){
                console.log(this.values[index].value);
                return this.values[index].formattedValue ?? this.values[index].value;
            }
        }
        return undefined;
    }
    /**
     * Attempts to convert the value to an object of it's type, based on the keyword type. If the keyword type hasn't been fetched, it will fetch it first.
     * @param index If there are multiple values, this will return the value at the index. The default is 0, or the first value.
     * @returns returns the value as a string, number, date or undefined.
     */
    async getValueObject(index: number = 0): Promise<string | number | Date | undefined> {
        if(this.keywordType === undefined){
            await this.getKeywordType();
        }
        if(this.values !== undefined){
            if(index < this.values.length){
                let returnValue = this.values[index].value;
                if(this.keywordType?.dataType === "Date" || this.keywordType?.dataType === "DateTime"){
                    return parseFromHylandDateString(returnValue);
                }
                if(this.keywordType?.dataType === "Currency" || this.keywordType?.dataType === "SpecificCurrency" || this.keywordType?.dataType === "FloatingPoint" ||
                    this.keywordType?.dataType === "Numeric9" || this.keywordType?.dataType === "Numeric20"){
                    return Number(returnValue);
                }                
                return returnValue;
            }
        }
        return undefined;
    }
}

export interface KeywordItem {
    typeId: string;
    values?: KeywordValueItem[];
}