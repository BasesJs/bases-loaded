import { group, _get, _getbyid } from '../baseclass/basegroup';
const documenttype = require('./documenttype');

const documenttypes:group = {
    endpoint:"/document-types",
    items:[],
    async get(paramName?:string, params?:string){        
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((it:any) => {
            let doctype = new documenttype(it);
            this.items.push(doctype);
        });  
        return this.items;
    },
    async getbyid(id:string){
        const data = await _getbyid(id, this.endpoint);
        let dt = new documenttype(data);       
        return dt;
    }
}
module.exports = documenttypes;