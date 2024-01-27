const filetypes = require('./file-types/filetypes');
const documenttypegroups = require('./document-type-groups/documenttypegroups');
const documenttypes = require('./document-types/documenttypes');
const keywordtypegroups = require('./keyword-type-groups/keywordtypegroups');
const keywordtypes = require('./keyword-types/keywordtypes');
const autofillkeysets = require('./autofill-keysets/autofillkeysets');
const customqueries = require('./custom-queries/customqueries');
const notetypes = require('./note-types/notetypes');

const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: filetypes,
    documenttypegroups: documenttypegroups,
    documenttypes: documenttypes,
    keywordtypegroups: keywordtypegroups,
    keywordtypes: keywordtypes,
    autofillkeysets: autofillkeysets,
    customqueries: customqueries,
    notetypes: notetypes  
}
module.exports = core;

