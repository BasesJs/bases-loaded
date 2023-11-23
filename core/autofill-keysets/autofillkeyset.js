class autofillkeyset {
    constructor(id, name, systemName, primaryKeywordTypeId, external){
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.primaryKeywordTypeId = primaryKeywordTypeId;
        this.external = external;
    }
    id = "";
    name = "";
    systemName = "";
    primaryKeywordTypeId = "";
    external = false;
}
module.exports = autofillkeyset;