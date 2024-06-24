import {_getbyid } from '../baseclass/baseclass.js';
import { keywordtype } from '../keyword-types/keywordtype.js';

export class keyword {
    constructor(id:string, name:string, values:keywordvalue[]){
        this.id = id;
        this.name = name;
        this.values = values;        
    }
    id:string = "";
    name:string = "";
    values:keywordvalue[] = [];
    static parse(item:any){
        let values:keywordvalue[] = [];
        item.values.forEach((val:any) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(item.typeId, item.name? item.name : undefined, values);
    }
    static async parseAsync(item:any){
        if(item.typeId === undefined){            
            throw new Error("No TypeId found in keyword");
        }
        let keyType = await keywordtype.get(item.typeId);
        let id = keyType.id;
        let name = keyType.name;   
        let values:keywordvalue[] = [];
        item.values.forEach((val:any) => {
            values.push(keywordvalue.parse(val));
        });
        return new keyword(id, name, values); 
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
export class keywords {
    constructor(){}
    items:keyword[] = [];   
}