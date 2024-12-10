export class NewKeywordValue {
  constructor(value: string) {
      this.value = value;
  }
  value: string;
  static parse(item: any) {
      return new NewKeywordValue(item.value);
  }
}
export class KeywordValue extends NewKeywordValue {
  constructor(value: string, formattedValue: string) {
      super(value);
      this.formattedValue = formattedValue;
  }
  formattedValue: string;
  static parse(item: any) {
      return new KeywordValue(item.value, item.formattedValue);
  }
}

