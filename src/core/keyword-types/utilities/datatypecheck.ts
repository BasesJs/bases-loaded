import { KeywordType } from "../keywordtype.js";
import { KeywordValueItem } from "../../keyword/keywordvalue.js";
/**
 * 
 * @param keytype The KeywordType to check against, should be passed from the KeywordTyp Object
 * @param value  The value to check against the KeywordType, should be passed as a string. This is a simple check to make sure numbers and dates are within the correct range.
 * @returns True or False
 */
export function DataTypeCheck(keyType: KeywordType, value: string): boolean {
    if (keyType.dataType === "Date" || keyType.dataType === "DateTime") {
        try{
            let date = parseFromHylandDateString(value); 
            return true;
        } catch(err){};
        try{
            let date = new Date(value);
        }
        catch(err){
            return false;
        };
    }
    if(keyType.dataType === "Currency" || keyType.dataType === "SpecificCurrency" || keyType.dataType === "FloatingPoint"){
        return !isNaN(Number(value));
    }
    if(keyType.dataType === "Numeric9"){
        if(value.length > 9){
            return false;
        }
        return !isNaN(Number(value));
    }
    if(keyType.dataType === "Numeric20"){
        if(value.length > 20){
            return false;
        }
        return !isNaN(Number(value));
    }
    if(keyType.dataType === "Alphanumeric"){
        if(keyType.alphanumericSettings?.maximumLength === undefined){
            return false;
        }
        if(value.length > keyType.alphanumericSettings.maximumLength){
            return false;
        }       
    }
    return true;
}

export function convertObjectValueToString(object: any, keyType: KeywordType): KeywordValueItem[] {
    let strArray : string[] = [];
    if(Array.isArray(object)){
        object.forEach(item => {
            if(item instanceof Date){
                if(!DataTypeCheck(keyType, item.toString())){
                    throw new Error(`The date ${item} is not compatible with the data type of the keyword type: ${keyType.dataType}`);
                }
                strArray.push(convertToHylandDateString(item));
            }
            else if (item instanceof Number){
                if(!DataTypeCheck(keyType, `${item}`)){
                    throw new Error(`The value ${item} is not compatible with the data type of the keyword type: ${keyType.dataType}`);
                }
                strArray.push(item.toString());
            }
            else if (item instanceof String){
                if(keyType.dataType === "Alphanumeric"){
                    if(!DataTypeCheck(keyType, item.toString())){
                        throw new Error(`The string's length (${item.length}) is greater than the maximum length allowed (${keyType.alphanumericSettings?.maximumLength})`);
                    }
                    strArray.push(item.toString());
                }
                else if(keyType.dataType === "Date"){
                    let date = new Date();
                    try{
                        date = parseFromHylandDateString(`${item}`); 
                    } catch(err){};
                    try{
                        date = new Date(`${item}`);
                    }
                    catch(err){
                        throw new Error(`The string is not a valid date, it is ${item}`);
                    };    
                    const dateString = convertToHylandDateString(new Date(`${item}`));
                    if(!DataTypeCheck(keyType, dateString)){
                        throw new Error(`The string is not a valid date, it is ${item}`);
                    }
                    strArray.push(dateString);
                }
            }
            else{
                throw new Error(`The object is not a Date, Number or String, it is a ${typeof item}`);
            }
        });
    }
    else if(object instanceof Date){
        if(!DataTypeCheck(keyType, object.toString())){
            throw new Error(`The date ${object} is not compatible with the data type of the keyword type: ${keyType.dataType}`);
        }
        strArray.push(convertToHylandDateString(object))
    }
    else if (object instanceof Number){
        if(!DataTypeCheck(keyType, `${object}`)){
            throw new Error(`The value ${object} is not compatible with the data type of the keyword type: ${keyType.dataType}`);
        }
        strArray.push(`${object}`);
    }
    else{
        if(!DataTypeCheck(keyType, object.toString())){
            throw new Error(`The string's length (${object.length}) is greater than the maximum length allowed (${keyType.alphanumericSettings?.maximumLength})`);
        }
        strArray.push(object.toString());
    }
    let returnValues: KeywordValueItem[] = [];
    strArray.forEach(item => {
        returnValues.push({value: item} as KeywordValueItem);
    });
    return returnValues;
}
function convertToHylandDateString(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}
export function parseFromHylandDateString(dateString: string): Date {
    let year = dateString.substring(0, 4);
    let month = dateString.substring(5, 7);
    let day = dateString.substring(8, 10);
    let hour = dateString.substring(11, 13);
    let minute = dateString.substring(14, 16);
    let second = dateString.substring(17, 19);
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
}