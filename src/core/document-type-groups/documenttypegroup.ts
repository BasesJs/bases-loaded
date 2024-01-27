import base from '../baseclass/baseclass';

class documenttypegroup extends base{
    constructor(item:any){
        super(item.id, item.name, item.systemName);
    }
}
module.exports = documenttypegroup;