class keytype {
    constructor(id, name, systemName, dataType, usedForRetrieval, invisible, alphanumericSettings, 
        currencyFormatId, isSecurityMasked, maskSettings){
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.sotrageType = storageType;
        this.dataType = dataType;
        this.usedForRetrieval = usedForRetrieval;
        this.invisible = invisible;
        this.alphanumericSettings = alphanumericSettings;
        this.currencyFormatId = currencyFormatId;
        this.isSecurityMasked = isSecurityMasked;
        this.maskSettings = maskSettings;
    }
    id = "";
    name = "";
    systemName = "";
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
    }
}
module.exports = keytype;