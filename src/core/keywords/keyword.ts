import { KeywordType } from '../keyword-types/keywordtype.js';
import { KeywordValueItem, KeywordItem } from "./keywordinterfaces.js";
export class Keyword implements KeywordItem {
    constructor(id: string, values: KeywordValue[], name: string = "", dataType: string = "") {
        this.typeId = id;
        this.values = values;
    }
    typeId: string;
    values?: KeywordValue[];
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
}
export class KeywordValue implements KeywordValueItem {
  value: string;
  formattedValue: string;
  constructor(value: string, formattedValue: string = '') {
      this.value = value;
      this.formattedValue = formattedValue;
  }
  static parse(item: KeywordValueItem): KeywordValue {
      return new KeywordValue(item.value, item.formattedValue ?? '');
  }
}

