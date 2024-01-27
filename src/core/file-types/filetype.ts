import base from '../baseclass/baseclass';

class filetype extends base {
    constructor(item:any){
        super(item.id, item.name, item.systemName)
    }
}
module.exports = filetype;