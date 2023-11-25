const filetypes = require('./file-types/filetypes');
const doctypegroups = require('./document-type-groups/documenttypegroups');
const autofillkeysets = require('./autofill-keysets/autofillkeysets');
const customqueries = require('./custom-queries/customqueries');
const doctypes = require('./document-types/documenttypes');
const keytypegroups = require('./keyword-type-groups/keywordtypegroups');
const keytypes = require('./keyword-types/keywordtypes');
const notetypes = require('./note-types/notetypes');

const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: filetypes,
    doctypegroups: doctypegroups,
    doctypes: doctypes,
    keytypegroups: keytypegroups,
    keytypes: keytypes,
    autofillkeysets: autofillkeysets,
    customqueries: customqueries,
    notetypes: notetypes
}
module.exports = core;