import { group, _get, _getbyid }  from '../baseclass/basegroup';
const notetype = require('./notetype');

const notetypes:group = {
    endpoint:"/note-types",
    items:[],
    async get(paramName?:string, params?:string){        
        const data = await _get(this.endpoint, paramName, params)
        data.items.forEach((item:any) => {
            let nt = new notetype(item);
            this.items.push(nt);
        });        
        return this.items;
    },
    async getbyid(id:string){
        const data = await _getbyid(id, this.endpoint);
        let dt = new notetype(data);       
        return dt;
    }
}
module.exports = notetypes;