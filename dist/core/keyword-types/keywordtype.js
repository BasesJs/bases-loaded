import { base, _getbyid } from '../baseclass/baseclass.js';
import { keywordtypes } from './keywordtypes.js';
export class keywordtype extends base {
    constructor(id, name, systemName, dataType, usedForRetrieval, invisible, isSecurityMasked, alphanumericSettings, currencyFormatId, maskSettings) {
        super(id, name, systemName);
        this.dataType = dataType;
        this.usedForRetrieval = usedForRetrieval;
        this.invisible = invisible;
        this.alphanumericSettings = alphanumericSettings;
        this.currencyFormatId = currencyFormatId;
        this.isSecurityMasked = isSecurityMasked;
        this.maskSettings = maskSettings;
    }
    dataType;
    usedForRetrieval;
    invisible;
    alphanumericSettings;
    currencyFormatId;
    isSecurityMasked;
    maskSettings;
    static parse(item) {
        return new keywordtype(item.id, item.name, item.systemName, item.dataType, item.usedForRetrieval, item.invisible, item.isSecurityMasked, item.alphanumericSettings ? alphanumericSettings.parse(item.alphanumericSettings) : undefined, item.currencyFormatId, item.maskSettings ? maskSettings.parse(item.maskSettings) : undefined);
    }
    static async get(id) {
        let response = await _getbyid(id, keywordtypes.endpoint);
        return keywordtype.parse(response);
    }
}
export class alphanumericSettings {
    constructor(caseOptions, maximumLength, storageOptions) {
        this.caseOptions = caseOptions;
        this.maximumLength = maximumLength;
        this.storageOptions = storageOptions;
    }
    caseOptions;
    maximumLength;
    storageOptions;
    static parse(item) {
        return new alphanumericSettings(item.caseOptions, item.maximumLength, item.storageOptions);
    }
}
export class maskSettings {
    constructor(fullfieldRequired, maskString, staticCharacters, storeMask) {
        this.fullfieldRequired = fullfieldRequired;
        this.maskString = maskString;
        this.staticCharacters = staticCharacters;
        this.storeMask = storeMask;
    }
    fullfieldRequired;
    maskString;
    staticCharacters;
    storeMask;
    static parse(item) {
        return new maskSettings(item.fullfieldRequired, item.maskString, item.staticCharacters, item.storeMask);
    }
}
