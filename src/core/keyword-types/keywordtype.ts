import base from '../baseclass/baseclass';

export default class keywordtype extends base {
    constructor(item:any){
        super(item.id, item.name, item.systemName);
        this.dataType = item.dataType;
        this.usedForRetrieval = item.usedForRetrieval;
        this.invisible = item.invisible;
        this.alphanumericSettings = item.alphanumericSettings;
        this.currencyFormatId = item.currencyFormatId;
        this.isSecurityMasked = item.isSecurityMasked;
        this.maskSettings = item.maskSettings;
    }
    sotrageType:string = "";
    dataType:string = ""; 
    usedForRetrieval:boolean = true;
    invisible:boolean = false;
    alphanumericSettings = {
        "caseOptions": "",
        "maximumLength": 0,
        "storageOptions": "SingleTable"
    }; 
    currencyFormatId:string = "";
    isSecurityMasked:boolean = false;
    maskSettings = {
        "fullfieldRequired": false,
        "maskString": "",
        "staticCharacters": "",
        "storeMask": false
    }
}
