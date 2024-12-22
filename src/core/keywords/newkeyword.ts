import { KeywordValueItem, KeywordItem } from "./keywordinterfaces.js";

export class NewKeyword implements KeywordItem {
    constructor(id: string, values: NewKeywordValue[]) {
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
    static parse(item: KeywordItem): NewKeyword {
        if (item.typeId) {
            throw new Error("No TypeId found in keyword");
        }
        return new NewKeyword(item.typeId, item.values ?? []);
    }
}

export class NewKeywordValue {
  constructor(value: string) {
      this.value = value;
  }
  value: string;
  static parse(item: KeywordValueItem): NewKeywordValue {
      return new NewKeywordValue(item.value);
  }
}