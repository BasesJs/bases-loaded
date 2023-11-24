const filetypes = require('./file-types/filetypes');
const doctypegroups = require('./document-type-groups/documenttypegroups');
const autofillkeysets = require('./autofill-keysets/autofillkeysets');
const customqueries = require('./custom-queries/customqueries');
const doctypes = require('./document-types/documenttypes');

const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: filetypes,
    doctypegroups: doctypegroups,
    doctypes: doctypes,
    autofillkeysets: autofillkeysets,
    customqueries: customqueries
}
module.exports = core;