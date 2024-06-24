import {base, _getbyid } from '../baseclass/baseclass.js';
import { keywordtypes } from './keywordtypes.js';
import { keyword, keywordvalue } from '../keywords/keyword.js';

export class keywordtype extends base {
    constructor(id:string, name:string, systemName:string, dataType:string, usedForRetrieval:boolean, invisible:boolean, isSecurityMasked:boolean, alphanumericSettings?:alphanumericSettings, currencyFormatId?:string, maskSettings?:maskSettings){
        super(id, name, systemName);
        this.dataType = dataType;
        this.usedForRetrieval = usedForRetrieval;
        this.invisible = invisible;
        this.alphanumericSettings = alphanumericSettings;
        this.currencyFormatId = currencyFormatId;
        this.isSecurityMasked = isSecurityMasked;
        this.maskSettings = maskSettings;
    }
    dataType:string; 
    usedForRetrieval:boolean;
    invisible:boolean;
    alphanumericSettings?:alphanumericSettings;
    currencyFormatId?:string;
    isSecurityMasked:boolean;
    maskSettings?:maskSettings;
    static parse(item:any){
        return new keywordtype(item.id, item.name, item.systemName, item.dataType, item.usedForRetrieval, item.invisible,item.isSecurityMasked, item.alphanumericSettings ? alphanumericSettings.parse(item.alphanumericSettings) : undefined, item.currencyFormatId, item.maskSettings ? maskSettings.parse(item.maskSettings) : undefined);
    }
    static async get(id:string){
        let response = await _getbyid(id, keywordtypes.endpoint);
        return keywordtype.parse(response);    
    }
    /*static async createnew(keywordName:string, values:string[]){
        
        let items = await global.bases.core.keywordtypes.get(keywordName);
        kw.id = items[0].id;
        kw.name = items[0].name;
        values.forEach((item:string) => {
            let value = {
                "value": item
            }
            kw.values.push(new keywordvalue(value));
        }); 
        const kw = new keyword();  
        return kw;   
    }*/
}

export class alphanumericSettings {
    constructor(caseOptions?:string, maximumLength?:number, storageOptions?:string){
        this.caseOptions = caseOptions;
        this.maximumLength = maximumLength;
        this.storageOptions = storageOptions;
    }
    caseOptions?:string;
    maximumLength?:number;
    storageOptions?:string;
    static parse(item:any){
        return new alphanumericSettings(item.caseOptions, item.maximumLength, item.storageOptions);
    }   
}
export class maskSettings {
    constructor(fullfieldRequired?:boolean, maskString?:string, staticCharacters?:string, storeMask?:boolean){
        this.fullfieldRequired = fullfieldRequired;
        this.maskString = maskString;
        this.staticCharacters = staticCharacters;
        this.storeMask = storeMask;
    }
    fullfieldRequired?:boolean;
    maskString?:string;
    staticCharacters?:string;
    storeMask?:boolean;
    static parse(item:any){
        return new maskSettings(item.fullfieldRequired, item.maskString, item.staticCharacters, item.storeMask);
    }
}
