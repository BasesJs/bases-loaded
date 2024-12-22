import { _getbyid } from "../baseclass/baseclass.js";
import { KeywordTypes } from "./keywordtypes.js";
import { NewKeyword, NewKeywordValue } from "../keywords/newkeyword.js";

export class KeywordType implements KeywordTypeItem {
  id: string;
  name: string;
  systemName: string;
  dataType: string;
  usedForRetrieval: boolean;
  invisible: boolean;
  isSecurityMasked: boolean;
  alphanumericSettings?: AlphanumericSettings;
  currencyFormatId?: string;
  maskSettings?: MaskSettings;

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
    this.id = id;
    this.name = name;
    this.systemName = systemName;
    this.dataType = dataType;
    this.usedForRetrieval = usedForRetrieval;
    this.invisible = invisible;
    this.isSecurityMasked = isSecurityMasked;
    this.alphanumericSettings = alphanumericSettings;
    this.currencyFormatId = currencyFormatId;
    this.maskSettings = maskSettings;
  }

  static parse(item: KeywordTypeItem): KeywordType {
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

  static async get(id: string | number): Promise<KeywordType> {
    const response = await _getbyid(KeywordTypes.endpoint, id);
    return KeywordType.parse(response.data);
  }

  create(values: string[]): NewKeyword {
    const newValues = values.map(value => new NewKeywordValue(value));
    return new NewKeyword(this.id, newValues);
  }
}

export class AlphanumericSettings {
  caseOptions?: string;
  maximumLength?: number;
  storageOptions?: string;

  constructor(caseOptions?: string, maximumLength?: number, storageOptions?: string) {
    this.caseOptions = caseOptions;
    this.maximumLength = maximumLength;
    this.storageOptions = storageOptions;
  }

  static parse(item: AlphanumericSettingsItem): AlphanumericSettings {
    return new AlphanumericSettings(
      item.caseOptions,
      item.maximumLength,
      item.storageOptions
    );
  }
}

export class MaskSettings {
  fullfieldRequired?: boolean;
  maskString?: string;
  staticCharacters?: string;
  storeMask?: boolean;

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

  static parse(item: MaskSettingsItem): MaskSettings {
    return new MaskSettings(
      item.fullfieldRequired,
      item.maskString,
      item.staticCharacters,
      item.storeMask
    );
  }
}
export interface KeywordTypeItem extends KeywordTypeBase {
  id: string;
  name: string;
  systemName: string;
  dataType: string;
  usedForRetrieval: boolean;
  invisible: boolean;
  isSecurityMasked: boolean;
  alphanumericSettings?: AlphanumericSettingsItem;
  currencyFormatId?: string;
  maskSettings?: MaskSettingsItem;
}
export interface KeywordTypeBase {
  id: string;
}

export interface AlphanumericSettingsItem {
  caseOptions?: string;
  maximumLength?: number;
  storageOptions?: string;
}

export interface MaskSettingsItem {
  fullfieldRequired?: boolean;
  maskString?: string;
  staticCharacters?: string;
  storeMask?: boolean;
}