import { group, _get, _getbyid } from '../baseclass/basegroup.js';
import { keywordtype } from './keywordtype.js';

export const keywordtypes:group = {
    endpoint:"/keyword-types",
    items:[],
    async get(paramName?:string, params?:string){        
        const data = await _get(this.endpoint,paramName,params);
        data.items.forEach((item:any) => {
            let kt = new keywordtype(item);
            this.items.push(kt);
        });        
        return this.items;
    },
    async getbyid(id:string){        
        const data = await _getbyid(id, this.endpoint);
        let dt = new keywordtype(data);       
        return dt;
    }
}