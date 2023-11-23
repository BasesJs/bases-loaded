const filetypes = require('./file-types/filetypes');
const doctypegroups = require('./document-type-groups/documenttypegroups');
const autofillkeysets = require('./autofill-keysets/autofillkeysets');

const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    filetypes: filetypes,
    doctypegroups: doctypegroups,
    autofillkeysets: autofillkeysets
}
module.exports = core;