import { group, _get }  from '../baseclass/basegroup.js';
import { notetype } from './notetype.js';

export const notetypes:group = {
    endpoint:"/note-types",
    items:[],
    async get(searchTerm?:any){        
        const data = await _get(this.endpoint, searchTerm)
        data.items.forEach((item:any) => {
            let nt = new notetype(item);
            this.items.push(nt);
        });        
        return this.items;
    }
}
