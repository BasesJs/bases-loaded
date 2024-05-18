import { documenttypegroup }  from './documenttypegroup.js';
import { group, _get, _getbyid } from '../baseclass/basegroup.js';

export const documenttypegroups:group = {
    endpoint:"/document-type-groups",
    items:[],
    async get(paramName?:string, params?:string){
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((it:any) => {
            let dtg = new documenttypegroup(it);
            this.items.push(dtg);
        });        
        return this.items;
    },
    async getbyid(id:string){        
        const data = await _getbyid(id, this.endpoint);
        let dtg = new documenttypegroup(data);       
        return dtg;
    }
}