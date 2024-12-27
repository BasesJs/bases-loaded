export class KeywordValue implements KeywordValueItem {
    value: string;
    formattedValue?: string;
    constructor(value: string, formattedValue: string | undefined = undefined) {
        this.value = value;
        this.formattedValue = formattedValue;
    }
    static parse(item: KeywordValueItem): KeywordValue {
        return new KeywordValue(item.value, item.formattedValue ?? undefined);
    }
  }

export interface KeywordValueItem {
    formattedValue?: string;
    value: string;
}
