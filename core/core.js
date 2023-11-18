const filetypes = require('./file-types/filetypes');
const dtgroups = require('./document-type-groups/documenttypegroups');


const core = {
    name: "Document Management API",
    endpoint: "/onbase/core",
    doctypegroups: dtgroups,
    filetypes: filetypes
    
}
module.exports = core;