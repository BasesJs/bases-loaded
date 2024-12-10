import { base, _getbyid } from "../baseclass/baseclass.js";
import { KeywordTypes } from "./keywordtypes.js";
import { NewKeyword } from "../keywords/keyword.js";
import { NewKeywordValue } from "../keywords/keywordvalue.js";
export class KeywordType extends base {
  constructor(
    id: string,
    name: string,
    systemName: string,
    dataType: string,
    usedForRetrieval: boolean,
    invisible: boolean,
    isSecurityMasked: boolean,
    alphanumericSettings?: AlphanumericSettings,
    currencyFormatId?: string,
    maskSettings?: MaskSettings
  ) {
    super(id, name, systemName);
    this.dataType = dataType;
    this.usedForRetrieval = usedForRetrieval;
    this.invisible = invisible;
    this.alphanumericSettings = alphanumericSettings;
    this.currencyFormatId = currencyFormatId;
    this.isSecurityMasked = isSecurityMasked;
    this.maskSettings = maskSettings;
  }
  dataType: string;
  usedForRetrieval: boolean;
  invisible: boolean;
  alphanumericSettings?: AlphanumericSettings;
  currencyFormatId?: string;
  isSecurityMasked: boolean;
  maskSettings?: MaskSettings;
  static parse(item: any) {
    return new KeywordType(
      item.id,
      item.name,
      item.systemName,
      item.dataType,
      item.usedForRetrieval,
      item.invisible,
      item.isSecurityMasked,
      item.alphanumericSettings
        ? AlphanumericSettings.parse(item.alphanumericSettings)
        : undefined,
      item.currencyFormatId,
      item.maskSettings ? MaskSettings.parse(item.maskSettings) : undefined
    );
  }
  static async get(id: string) {
    let response = await _getbyid(id, KeywordTypes.endpoint);
    return KeywordType.parse(response);
  }
  create(values:string[]): NewKeyword{
    let newValues: NewKeywordValue[] = [];
    let newKeyword = new NewKeyword(this.id, newValues);
    values.forEach((value: string) => {
      newKeyword.values.push(new NewKeywordValue(value));
    });
    return newKeyword;
  }
}
export class AlphanumericSettings {
  constructor(
    caseOptions?: string,
    maximumLength?: number,
    storageOptions?: string
  ) {
    this.caseOptions = caseOptions;
    this.maximumLength = maximumLength;
    this.storageOptions = storageOptions;
  }
  caseOptions?: string;
  maximumLength?: number;
  storageOptions?: string;
  static parse(item: any) {
    return new AlphanumericSettings(
      item.caseOptions,
      item.maximumLength,
      item.storageOptions
    );
  }
}
export class MaskSettings {
  constructor(
    fullfieldRequired?: boolean,
    maskString?: string,
    staticCharacters?: string,
    storeMask?: boolean
  ) {
    this.fullfieldRequired = fullfieldRequired;
    this.maskString = maskString;
    this.staticCharacters = staticCharacters;
    this.storeMask = storeMask;
  }
  fullfieldRequired?: boolean;
  maskString?: string;
  staticCharacters?: string;
  storeMask?: boolean;
  static parse(item: any) {
    return new MaskSettings(
      item.fullfieldRequired,
      item.maskString,
      item.staticCharacters,
      item.storeMask
    );
  }
}