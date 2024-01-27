import { group, _get, _getbyid}  from '../baseclass/basegroup';
const filetype = require('./filetype');

const filetypes:group = {
    endpoint:"/file-types",
    items:[],
    async get(paramName?:string, params?:string){        
        const data = await _get(this.endpoint, paramName, params);
        data.items.forEach((item:any) => {
            let ft = new filetype(item);
            this.items.push(ft);
        });        

        return this.items;
    },
    async getbyid(id:string){        
        const data = await _getbyid(id, this.endpoint);
        let ft = new filetype(data);       
        return ft;
    }    
}
module.exports = filetypes;
