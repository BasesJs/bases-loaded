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
exports.splitFile = void 0;
function splitFile(file, numberOfParts, partSize) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({
            fileSize: file.byteLength,
            partSize: partSize,
            numberOfParts: numberOfParts
        });
        let parts = [];
        let start = 0;
        let remainder = file.byteLength;
        let runSize = partSize;
        for (let i = 0; i < numberOfParts; i++) {
            if (runSize > remainder) {
                runSize = remainder;
            }
            let partEnd = start + runSize;
            let partBytes = file.slice(start, partEnd);
            let partNum = i + 1;
            let part = {
                partNum: partNum,
                partSize: runSize,
                bytes: partBytes
            };
            parts.push(part);
            start = partEnd;
            remainder = remainder - runSize;
        }
        console.log(`Returning ${parts.length} parts`);
        return parts;
    });
}
exports.splitFile = splitFile;
