//Import Keyword Types when we get there.

class customquery {
    constructor(item){
        this.id = item.id;
        this.name = item.name;
        this.systemName = item.systemName;
        this.instructions = item.instructions;
        this.dateOptions = item.dateOptions;

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