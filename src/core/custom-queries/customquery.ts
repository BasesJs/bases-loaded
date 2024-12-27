import { _getbyid } from '../baseclass/baseclass.js';
import { CustomQueries } from './customqueries.js';
import { RunRequest} from '../../http/httprequest.js';
import { RequestOptions, HttpMethod } from '../../http/requestoptions.js';
import { KeywordType } from '../keyword-types/keywordtype.js';
import { KeywordTypes } from '../keyword-types/keywordtypes.js';
export class CustomQuery implements CustomQueryItem {
    readonly id: string;
    readonly name: string;
    readonly systemName: string;
    readonly instructions: string;
    readonly dateOptions: DateOptions;
    querytype: string = "DocumentType";
    keywordTypes: KeywordType[] = [];

    constructor(id: string, name: string, systemName: string, instructions: string, dateOptions: DateOptions) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.instructions = instructions;
        this.dateOptions = dateOptions;
    }

    static async parse(item: CustomQueryItem): Promise<CustomQuery> {
        const ncq = new CustomQuery(
            item.id,
            item.name,
            item.systemName,
            item.instructions,
            DateOptions.parse(item.dateOptions)
        );
        const fullUrl = `${global.bases.apiURI}${global.bases.core.endpoint}${CustomQueries.endpoint}/${ncq.id}/keyword-Types`;
        const options = new RequestOptions({url: fullUrl, method: HttpMethod.GET});
        const response = await RunRequest(options);
        let keywordTypes = await KeywordTypes.get() as unknown as KeywordType[];
        const responseIds = response.data.items.map((item: any) => item.id);
        ncq.keywordTypes = keywordTypes.filter(item => responseIds.includes(item.id));
        return ncq;
    }

    static async get(id: string | number): Promise<CustomQuery> {
        const response = await _getbyid(CustomQueries.endpoint, id);
        return CustomQuery.parse(response.data);
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

export interface DateOptionsItem {
    dateSearch: string;
    defaultDateRange?: DateRangeItem;
}

export interface DateRangeItem {
    start: string;
    end: string;
}