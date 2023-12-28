import { group } from '../baseclass/baseclass';
import { keywordtype } from './keywordtype';

export class keywordtypes extends group {
    endpoint:string = "/keyword-types";
    items:keywordtype[] = [];
    async get(paramName?:string, params?:string){        
        const data = await this._get(this.endpoint,paramName,params);
        data.items.forEach((item:any) => {
            let kt = new keywordtype(item);
            this.items.push(kt);
        });        
        return this.items;
    }
}

