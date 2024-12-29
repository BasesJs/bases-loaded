import { Bases } from '../../../bases.js';
import { Core } from '../../core.js';
import { Document } from "../document.js";
import { DefaultHeaders } from "../../../http/utilities/defaultheaders.js";
import { RunRequest } from "../../../http/httprequest.js";
import { RequestOptions, HttpMethod } from "../../../http/requestoptions.js";
import { ParamSerializer } from "../../../http/utilities/paramserializer.js";

export async function DocumentHistory(documentId: string, startDate?: Date, endDate?: Date, userId?: number): Promise<HistoryItem[]> {
    const fullUrl = `${Bases.apiURI}${Core.endpoint}${Document.endpoint}/${documentId}/history`;
    const params = HistoryParams.create(startDate, endDate, userId);
    const options = new RequestOptions({ url: fullUrl, method: HttpMethod.GET, headers: DefaultHeaders(), params: params, paramsSerializer: ParamSerializer });
    const response = await RunRequest(options);
    const history : HistoryItem[] = [];
    response.data.items.forEach((item: { action: any; logDate: any; message: any; userId: any; }) => {
        history.push(HistoryItem.parse(item as DocumentHistoryItem));
    });
    return history;
}

export class HistoryParams {
    startDate?: string;
    endDate?: string;
    userId?: string;
    constructor(startDate?: Date, endDate?: Date, userId?: number) {
        this.startDate = startDate ? startDate.toISOString() : undefined;
        this.endDate = endDate ? endDate.toISOString() : undefined;
        this.userId = userId ? userId.toString() : undefined;
    }
    static create(startDate?: Date, endDate?: Date, userId?: number): HistoryParams {
        return new HistoryParams(startDate, endDate, userId);
    }
}

export class HistoryItem implements DocumentHistoryItem {
    readonly action: string;
    readonly logDate: string;
    readonly message: string;
    readonly userId: string;
    constructor(action: string, logDate: string, message: string, userId: string) {
        this.action = action;
        this.logDate = logDate;
        this.message = message;
        this.userId = userId;
    }
    static parse(item: DocumentHistoryItem): HistoryItem {
        return new HistoryItem(item.action, item.logDate, item.message, item.userId);
    }
}
export interface DocumentHistoryItem {
    action: string;
    logDate: string;
    message: string;
    userId: string;
}