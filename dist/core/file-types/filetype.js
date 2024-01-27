"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("../baseclass/baseclass"));
class filetype extends baseclass_1.default {
    constructor(item) {
        super(item.id, item.name, item.systemName);
    }
}
module.exports = filetype;
