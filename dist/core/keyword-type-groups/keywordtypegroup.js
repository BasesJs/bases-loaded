"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywordtypegroup = void 0;
const baseclass_1 = require("../baseclass/baseclass");
class keywordtypegroup extends baseclass_1.base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.sotrageType = "";
        this.sotrageType = item.storageType;
    }
}
exports.keywordtypegroup = keywordtypegroup;
