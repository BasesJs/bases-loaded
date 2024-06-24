import { group, _get }  from '../baseclass/basegroup.js';
import { filetype } from './filetype.js';


export const filetypes:group = {
    endpoint:"/file-types",
    items:[],
    async get(searchTerm?:any){        
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item:any) => {
            let ft = filetype.parse(item);
            this.items.push(ft);
        });   
        return this.items;
    }
}

