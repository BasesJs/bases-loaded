import { group } from '../baseclass/baseclass';
import { customquery } from  './customquery';

export class customqueries extends group {
    endpoint:string = "/custom-queries";
    items: customquery[] = [];
    async get(paramName?:string, params?:string){        
        const data = await this._get(this.endpoint, paramName, params);
        data.items.forEach((it:any) => {
            let cq = new customquery(it);
            this.items.push(cq);
        });        
        return this.items;
    }
}
