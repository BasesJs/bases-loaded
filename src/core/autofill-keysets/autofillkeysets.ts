import { group } from '../baseclass/baseclass';
import { autofillkeyset } from './autofillkeyset';

export class autofillkeysets extends group {
    endpoint:string = "/autofill-keyword-sets";
    items:autofillkeyset[] = [];
    async get(paramName?:string, params?:string){
        const data = await this._get(this.endpoint, paramName,params);
        data.items.forEach((it:any) => {
            let afks = new autofillkeyset(it);
            this.items.push(afks);
        });        
        return this.items;
    }
}
