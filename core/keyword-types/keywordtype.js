class keytype {
    constructor(item){
        this.id = item.id;
        this.name = item.name;
        this.systemName = item.systemName;
        this.dataType = item.dataType;
        this.usedForRetrieval = item.usedForRetrieval;
        this.invisible = item.invisible;
        this.alphanumericSettings = item.alphanumericSettings;
        this.currencyFormatId = item.currencyFormatId;
        this.isSecurityMasked = item.isSecurityMasked;
        this.maskSettings = item.maskSettings;
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