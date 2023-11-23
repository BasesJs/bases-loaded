//Import Keyword Types when we get there.

class customquery {
    constructor(id, name, systemName, instructions, dateOptions){
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.instructions = instructions;
        this.dateOptions = dateOptions;

    }
    id = "";
    name = "";
    systemName = "";
    instructions = "";
    dateOptions = {
        dateSearch: "noDate",
        defaultDateRange: {
            start: "",
            end: "",
        }
    }
    querytype = "DocumentType"
}
module.exports = customquery;

/*
customquery.prototype.create = () => {

}

customquery.prototype.getkeywordtypess = (endpoint) => {
    endpoint = `${endpoint}/${this.id}/keyword-types`
}
*/