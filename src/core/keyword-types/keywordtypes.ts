import { group, _get } from '../baseclass/basegroup.js';
import { keywordtype } from './keywordtype.js';

export const keywordtypes:group = {
    endpoint:"/keyword-types",
    items:[],
    async get(searchTerm?:any){        
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item:any) => {
            let kt = new keywordtype(item);
            this.items.push(kt);
        });        
        return this.items;
    }
}