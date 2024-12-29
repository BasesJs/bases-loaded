import { _getbyid } from "../baseclass/baseclass.js";
import { KeywordTypes } from "./keywordtypes.js";
import { KeywordItem} from "../keyword/keyword.js";
import { KeywordValueItem } from "../keyword/keywordvalue.js";
import { convertObjectValueToString } from "./utilities/datatypecheck.js";
import { CurrencyFormat } from "../currency-format/currencyformat.js";

export class KeywordType implements KeywordTypeItem {
  readonly id: string;
  readonly name: string;
  readonly systemName: string;
  readonly dataType: string;
  readonly usedForRetrieval: boolean;
  readonly invisible: boolean;
  readonly isSecurityMasked: boolean;
  readonly alphanumericSettings?: AlphanumericSettings;
  readonly currencyFormatId?: string;
  readonly maskSettings?: MaskSettings;
  currencyFormat?: CurrencyFormat;

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

  static async parse(item: KeywordTypeItem): Promise<KeywordType> {
    const kt = new KeywordType(
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
    if(kt.dataType === "Currency"){
      if(kt.currencyFormatId !== undefined){
        kt.currencyFormat = await CurrencyFormat.get(kt.currencyFormatId); //I believe this is the default currency format
      }      
    }
    return kt;
  }

  static async get(id: string | number): Promise<KeywordType> {
    const response = await _getbyid(KeywordTypes.endpoint, id);
    console.log("Response Data:" ,{...response.data});
    return KeywordType.parse(response.data);
  }

  /**
   * Returns a KeywordItem that can be pass for keyword modifications. Dates will convert to Hyland's required Date Strings, YYYY-MM-DDTHH:MM:SS, and should be passed in calculated to the desired local time.
   * @param values This can inclde a string, number, date or an array of strings, numbers or dates. some soft validation is done to make sure the values are within the correct range for the keyword type.
   * @returns 
   */
  create(values?: string[] | number[] | Date[] | string | number | Date): KeywordItem {  
    let newValues: KeywordValueItem[] = [];
    if(!values){      
      let emptyValue: KeywordValueItem = { value: "" };
      newValues.push(emptyValue);      
    }    
    else{
        newValues = convertObjectValueToString(values, this);
    }
    const keyItem: KeywordItem = { typeId: this.id, values: newValues } as KeywordItem;
    return keyItem;
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