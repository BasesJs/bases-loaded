import { base, _getbyid } from '../baseclass/baseclass.js';
import { CustomQueries } from './customqueries.js';

export class CustomQuery extends base {
    constructor(id: string, name: string, systemName: string, instructions: string, dateOptions: DateOptions) {
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
        return new CustomQuery(item.id, item.name, item.systemName, item.instructions, DateOptions.parse(item.dateOptions));
    }
    static async get(id: string) {
        let response = await _getbyid(id, CustomQueries.endpoint);
        return CustomQuery.parse(response);
    }
}

export class DateOptions {
    constructor(dateSearch: string, defaultDateRange: any) {
        this.dateSearch = dateSearch;
        this.defaultDateRange = defaultDateRange;
    }
    dateSearch: string = "noDate";
    defaultDateRange: DateRange;
    static parse(item: any) {
        return new DateOptions(item.dateSearch, DateRange.parse(item.defaultDateRange));
    }
}

export class DateRange {
    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }
    start: string = "";
    end: string = "";
    static parse(item: any) {
        return new DateRange(item.start, item.end);
    }
}