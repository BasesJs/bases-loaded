import { _getbyid } from '../baseclass/baseclass.js';
import { CustomQueries } from './customqueries.js';
import { Keyword, KeywordItem } from '../keywords/keyword.js';
import { RunRequest} from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
export class CustomQuery implements CustomQueryItem {
    id: string;
    name: string;
    systemName: string;
    instructions: string;
    dateOptions: DateOptions;
    querytype: string = "DocumentType";

    constructor(id: string, name: string, systemName: string, instructions: string, dateOptions: DateOptions) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.instructions = instructions;
        this.dateOptions = dateOptions;
    }

    static parse(item: CustomQueryItem): CustomQuery {
        return new CustomQuery(
            item.id,
            item.name,
            item.systemName,
            item.instructions,
            DateOptions.parse(item.dateOptions)
        );
    }
    async getKeywordTypes(): Promise<any[]> {
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${CustomQueries.endpoint}/${this.id}/keyword-Types`;
        const options = new RequestOptions(fullUrl, HttpMethod.GET);
        try {
            const response = await RunRequest(options);
            return response.data.items;
        } catch (error) {
            console.error('Error fetching keywords:', error);
            throw error;
        }
    }

    static async get(id: string | number): Promise<CustomQuery | null> {
        try {
            const response = await _getbyid(CustomQueries.endpoint, id);
            return CustomQuery.parse(response);
        } catch (error) {
            console.error(`Error fetching CustomQuery with ID: ${id}`, error);
            return null;
        }
    }
}

export class DateOptions implements DateOptionsItem {
    dateSearch: string;
    defaultDateRange?: DateRange;

    constructor(dateSearch: string, defaultDateRange?: DateRange) {
        this.dateSearch = dateSearch;
        this.defaultDateRange = defaultDateRange;
    }

    static parse(item: DateOptionsItem): DateOptions {
        return new DateOptions(
            item.dateSearch,
            item.defaultDateRange ? DateRange.parse(item.defaultDateRange) : undefined
        );
    }
}

export class DateRange implements DateRangeItem {
    start: string;
    end: string;

    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }

    static parse(item: DateRangeItem): DateRange {
        return new DateRange(item.start, item.end);
    }
}

export interface CustomQueryItem {
    id: string;
    name: string;
    systemName: string;
    instructions: string;
    dateOptions: DateOptionsItem;
}

interface DateOptionsItem {
    dateSearch: string;
    defaultDateRange?: DateRangeItem;
}

interface DateRangeItem {
    start: string;
    end: string;
}