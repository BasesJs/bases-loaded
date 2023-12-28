import { group } from '../baseclass/baseclass'
import { notetype } from './notetype';

export class notetypes extends group {
    endpoint:string = "/note-types";
    items:notetype[] = [];
    async get(paramName?:string, params?:string){        
        const data = await this._get(this.endpoint, paramName, params)
        data.items.forEach((item:any) => {
            let nt = new notetype(item);
            this.items.push(nt);
        });        
        return this.items;
    }
}
