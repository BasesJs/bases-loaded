import { group, _get, _getbyid }  from '../baseclass/basegroup';
const keywordtypegroup = require('./keywordtypegroup');

const keywordtypegroups:group = {
    endpoint: "/keyword-type-groups",
    items: [],
    async get(paramName?:string, params?:string){
        const data = await _get(this.endpoint, paramName, params)
        data.items.forEach((item:any) => {
            let ktg = new keywordtypegroup(item);
            this.items.push(ktg);
        });        
        return this.items;
    },
    async getbyid(id:string){
        const data = await _getbyid(id, this.endpoint);
        let ktg = new keywordtypegroup(data);       
        return ktg;
    }
}
module.exports = keywordtypegroups;
