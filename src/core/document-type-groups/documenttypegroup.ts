import { base, _getbyid } from '../baseclass/baseclass.js';
import { documenttypegroups } from './documenttypegroups.js';

export class documenttypegroup extends base{
    constructor(id:string, name:string, systemName:string){
        super(id, name, systemName);
    }
    static parse(item:any){
        return new documenttypegroup(item.id, item.name, item.systemName);
    }
    static async get(id:string){
        let response = await _getbyid(id, documenttypegroups.endpoint);
        return documenttypegroup.parse(response);    
    }
    
}