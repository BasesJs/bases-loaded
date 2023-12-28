"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const filetypes_1 = require("./file-types/filetypes");
const documenttypegroups_1 = require("./document-type-groups/documenttypegroups");
const documenttypes_1 = require("./document-types/documenttypes");
const keywordtypegroups_1 = require("./keyword-type-groups/keywordtypegroups");
const keywordtypes_1 = require("./keyword-types/keywordtypes");
const autofillkeysets_1 = require("./autofill-keysets/autofillkeysets");
const customqueries_1 = require("./custom-queries/customqueries");
const notetypes_1 = require("./note-types/notetypes");
exports.core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: new filetypes_1.filetypes(),
    documenttypegroups: new documenttypegroups_1.documenttypegroups(),
    documenttypes: new documenttypes_1.documenttypes(),
    keywordtypegroups: new keywordtypegroups_1.keywordtypegroups(),
    keywordtypes: new keywordtypes_1.keywordtypes(),
    autofillkeysets: new autofillkeysets_1.autofillkeysets(),
    customqueries: new customqueries_1.customqueries(),
    notetypes: new notetypes_1.notetypes()
};
