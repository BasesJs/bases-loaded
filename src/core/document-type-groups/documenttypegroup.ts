import base from '../baseclass/baseclass.js';

export class documenttypegroup extends base{
    constructor(item:any){
        super(item.id, item.name, item.systemName);
    }
}