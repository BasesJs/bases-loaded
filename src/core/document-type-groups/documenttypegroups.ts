import { documenttypegroup } from "./documenttypegroup";
import { group } from '../baseclass/baseclass';

export class documenttypegroups extends group{
    endpoint:string = "/document-type-groups";
    items:documenttypegroup[] = [];
    async get(paramName?:string, params?:string){
        const data = await this._get(this.endpoint, paramName, params);
        data.items.forEach((it:any) => {
            let dtg = new documenttypegroup(it);
            this.items.push(dtg);
        });        
        return this.items;
    }
}
