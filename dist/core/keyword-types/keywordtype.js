"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("../baseclass/baseclass"));
class keywordtype extends baseclass_1.default {
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
exports.default = keywordtype;
