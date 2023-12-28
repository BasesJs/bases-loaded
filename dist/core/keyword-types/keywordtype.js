"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywordtype = void 0;
const baseclass_1 = require("../baseclass/baseclass");
class keywordtype extends baseclass_1.base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.sotrageType = "";
        this.dataType = "";
        this.usedForRetrieval = true;
        this.invisible = false;
        this.alphanumericSettings = {
            "caseOptions": "",
            "maximumLength": 0,
            "storageOptions": "SingleTable"
        };
        this.currencyFormatId = "";
        this.isSecurityMasked = false;
        this.maskSettings = {
            "fullfieldRequired": false,
            "maskString": "",
            "staticCharacters": "",
            "storeMask": false
        };
        this.dataType = item.dataType;
        this.usedForRetrieval = item.usedForRetrieval;
        this.invisible = item.invisible;
        this.alphanumericSettings = item.alphanumericSettings;
        this.currencyFormatId = item.currencyFormatId;
        this.isSecurityMasked = item.isSecurityMasked;
        this.maskSettings = item.maskSettings;
    }
}
exports.keywordtype = keywordtype;
