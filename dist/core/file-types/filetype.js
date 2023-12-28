"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filetype = void 0;
const baseclass_1 = require("../baseclass/baseclass");
class filetype extends baseclass_1.base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
    }
}
exports.filetype = filetype;
