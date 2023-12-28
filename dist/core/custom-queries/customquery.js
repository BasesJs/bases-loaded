"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customquery = void 0;
const baseclass_1 = require("../baseclass/baseclass");
class customquery extends baseclass_1.base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.instructions = "";
        this.dateOptions = {
            dateSearch: "noDate",
            defaultDateRange: {
                start: "",
                end: "",
            }
        };
        this.querytype = "DocumentType";
        this.instructions = item.instructions;
        this.dateOptions = item.dateOptions;
    }
}
exports.customquery = customquery;
