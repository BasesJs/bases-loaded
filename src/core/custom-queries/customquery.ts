import { base, _getbyid } from '../baseclass/baseclass.js';
import { customqueries } from './customqueries.js';

export class customquery extends base {
    constructor(id: string, name: string, systemName: string, instructions: string, dateOptions: dateOptions) {
        super(id, name, systemName);
        this.instructions = instructions;
        this.dateOptions = dateOptions;
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
    static parse(item: any) {
        return new customquery(item.id, item.name, item.systemName, item.instructions, dateOptions.parse(item.dateOptions));
    }
    static async get(id: string) {
        let response = await _getbyid(id, customqueries.endpoint);
        return customquery.parse(response);
    }
}

export class dateOptions {
    constructor(dateSearch: string, defaultDateRange: any) {
        this.dateSearch = dateSearch;
        this.defaultDateRange = defaultDateRange;
    }
    dateSearch: string = "noDate";
    defaultDateRange: dateRange;
    static parse(item: any) {
        return new dateOptions(item.dateSearch, dateRange.parse(item.defaultDateRange));
    }
}

export class dateRange {
    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }
    start: string = "";
    end: string = "";
    static parse(item: any) {
        return new dateRange(item.start, item.end);
    }
}