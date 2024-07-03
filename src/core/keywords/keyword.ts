import {_getbyid } from '../baseclass/baseclass.js';
import { keywordtype } from '../keyword-types/keywordtype.js';

export class keyword {
    constructor(id:string, name?:string, dataType?:string, values?:keywordvalue[]){
        this.id = id;
        this.name = name;
        this.dataType = dataType;
        this.values = values;        
    }
    id:string = "";
    name?:string = "";
    values?:keywordvalue[] = [];
    dataType?:string = "";
    static parse(item:any){
        if(item.typeId === undefined){            
            throw new Error("No TypeId found in keyword");
        }
        let name:string | undefined;
        let datatype:string | undefined;
        let values:keywordvalue[] = [];
        keywordtype.get(item.typeId)
        .then((keyType:keywordtype) => {            
            name = keyType.name;   
            datatype = keyType.dataType;
         })
         .catch((e:any) => { console.log(e); });     
        item.values.forEach((val:any) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(item.typeId, name, datatype, values); 
    }
    static async parseAsync(item:any){
        if(item.typeId === undefined){            
            throw new Error("No TypeId found in keyword");
        }
        let keyType = await keywordtype.get(item.typeId);
        let id = keyType.id;
        let name = keyType.name;   
        let datatype = keyType.dataType;
        let values:keywordvalue[] = [];
        item.values.forEach((val:any) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(id, name, datatype, values); 
    }   
}

export class keywordvalue {
    constructor(value:string, formattedValue:string){
        this.value = value;
        this.formattedValue = formattedValue;
    }
    value:string;
    formattedValue:string;
    static parse(item:any){
        return new keywordvalue(item.value, item.formattedValue);
    }
}