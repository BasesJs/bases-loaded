export class NewKeywordValue {
  constructor(value: string) {
      this.value = value;
  }
  value: string;
  static parse(item: KeywordValueItem): NewKeywordValue {
      return new NewKeywordValue(item.value);
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

export interface KeywordValueItem {
  formattedValue?: string;
  value: string;
}

