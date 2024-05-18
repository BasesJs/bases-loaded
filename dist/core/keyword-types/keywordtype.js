import base from '../baseclass/baseclass.js';
export class keywordtype extends base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.dataType = item.dataType;
        this.usedForRetrieval = item.usedForRetrieval;
        this.invisible = item.invisible;
        this.alphanumericSettings = item.alphanumericSettings;
        this.currencyFormatId = item.currencyFormatId;
        this.isSecurityMasked = item.isSecurityMasked;
        this.maskSettings = item.maskSettings;
    }
    sotrageType = "";
    dataType = "";
    usedForRetrieval = true;
    invisible = false;
    alphanumericSettings = {
        "caseOptions": "",
        "maximumLength": 0,
        "storageOptions": "SingleTable"
    };
    currencyFormatId = "";
    isSecurityMasked = false;
    maskSettings = {
        "fullfieldRequired": false,
        "maskString": "",
        "staticCharacters": "",
        "storeMask": false
    };
}
