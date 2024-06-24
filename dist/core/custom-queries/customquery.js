import { base, _getbyid } from '../baseclass/baseclass.js';
import { customqueries } from './customqueries.js';
export class customquery extends base {
    constructor(id, name, systemName, instructions, dateOptions) {
        super(id, name, systemName);
        this.instructions = instructions;
        this.dateOptions = dateOptions;
    }
    instructions = "";
    dateOptions = {
        dateSearch: "noDate",
        defaultDateRange: {
            start: "",
            end: "",
        }
    };
    querytype = "DocumentType";
    static parse(item) {
        return new customquery(item.id, item.name, item.systemName, item.instructions, dateOptions.parse(item.dateOptions));
    }
    static async get(id) {
        let response = await _getbyid(id, customqueries.endpoint);
        return customquery.parse(response);
    }
}
export class dateOptions {
    constructor(dateSearch, defaultDateRange) {
        this.dateSearch = dateSearch;
        this.defaultDateRange = defaultDateRange;
    }
    dateSearch = "noDate";
    defaultDateRange;
    static parse(item) {
        return new dateOptions(item.dateSearch, dateRange.parse(item.defaultDateRange));
    }
}
export class dateRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    start = "";
    end = "";
    static parse(item) {
        return new dateRange(item.start, item.end);
    }
}
