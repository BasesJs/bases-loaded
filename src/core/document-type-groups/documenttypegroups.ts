import { documenttypegroup }  from './documenttypegroup.js';
import { group, _get } from '../baseclass/basegroup.js';

export const documenttypegroups:group = {
    endpoint:"/document-type-groups",
    items:[],
    async get(searchTerm?:any){
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it:any) => {
            let dtg = new documenttypegroup(it);
            this.items.push(dtg);
        });        
        return this.items;
    }
}