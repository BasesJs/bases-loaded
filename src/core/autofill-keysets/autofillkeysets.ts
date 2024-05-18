import { group, _get, _getbyid }  from '../baseclass/basegroup.js';
import { autofillkeyset } from './autofillkeyset.js';

export const autofillkeysets:group = {
    endpoint:  "/autofill-keyword-sets",
    items: [],
    async get(paramName?:string, params?:string){
        const data = await _get(this.endpoint, paramName,params);
        data.items.forEach((it:any) => {
            let afks = new autofillkeyset(it);
            this.items.push(afks);
        });        
        return this.items;
    },
    async getbyid(id:string){        
        const data = await _getbyid(id, this.endpoint);
        let dt = new autofillkeyset(data);       
        return dt;
    }
}