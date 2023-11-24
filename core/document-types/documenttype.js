//const doctypegroup = require('../document-type-groups/documenttypegroup');
class doctype {
    constructor(id, name, systemName, defaultFileTypeId, documentDateDisplayName, autofillKeywordSetId, documentTypeGroupId, revisionRenditionProperties){
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.defaultFileTypeId = defaultFileTypeId;
        this.documentDateDisplayName = documentDateDisplayName;
        this.autofillKeywordSetId = autofillKeywordSetId;
        this.documentTypeGroupId = documentTypeGroupId;
        this.revisionRenditionProperties = revisionRenditionProperties;
    }
    id = "";
    name = "";
    systemName = "";
    defaultFileTypeId = "";
    documentDateDisplayName = "";
    autofillKeywordSetId = "";
    documentTypeGroupId = "";
    revisionRenditionProperties = {
        "revisable": true,
        "renditionable": true,
        "commentSettings": {
        "allowComments": true,
        "forceComment": true,
        "firstRevisionNoComment": true
        }
    }

}
module.exports = doctype;
