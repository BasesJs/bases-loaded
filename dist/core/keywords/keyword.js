"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyword = void 0;
class keyword {
    constructor(typeId = null, values = []) {
        this.typeId = "";
        this.values = [];
        if (typeId != null) {
            this.typeId = typeId;
        }
        if (values.length > 0) {
            this.values = values;
        }
    }
    static create(keywordName, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const kw = new keyword();
            let items = yield global.bases.core.keywordtypes.get('systemName', keywordName);
            kw.typeId = items[0].id;
            if (Array.isArray(values)) {
                values.forEach((item) => {
                    let value = {
                        "value": item
                    };
                    kw.values.push(value);
                });
            }
            else {
                let value = {
                    "value": values
                };
                kw.values.push(value);
            }
            return kw;
        });
    }
}
exports.keyword = keyword;
