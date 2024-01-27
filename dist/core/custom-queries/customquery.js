"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("../baseclass/baseclass"));
class customquery extends baseclass_1.default {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.instructions = item.instructions;
        this.dateOptions = item.dateOptions;
    }
    instructions = "";
    dateOptions = {
        dateSearch: "noDate",
        defaultDateRange: {
            start: "",
            end: "",
        }
    };
    querytype = "DocumentType";
}
module.exports = customquery;
