import { group } from '../baseclass/baseclass';
import { keywordtypegroup } from './keywordtypegroup';

export class keywordtypegroups extends group {
    endpoint:string = "/keyword-type-groups";
    items:keywordtypegroup[] = [];
    async get(paramName?:string, params?:string){
        const data = await this._get(this.endpoint, paramName, params)
        data.items.forEach((item:any) => {
            let ktg = new keywordtypegroup(item);
            this.items.push(ktg);
        });        
        return this.items;
    }
}

