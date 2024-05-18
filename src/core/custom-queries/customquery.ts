import base  from '../baseclass/baseclass.js';

export class customquery extends base{
    constructor(item: any){
        super(item.id, item.name, item.systemName);
        this.instructions = item.instructions;
        this.dateOptions = item.dateOptions;
    }
    instructions: string = "";
    dateOptions: any = {
        dateSearch: "noDate",
        defaultDateRange: {
            start: "",
            end: "",
        }
    }
    querytype = "DocumentType"
}
