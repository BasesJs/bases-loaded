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
            if(!isNaN(date.getTime())){
                return true;
            }
        } catch(err){};
        try{
            let date = new Date(value);
        }
        catch(err){
            throw new Error(`The value ${value} is not compatible with the data type of the keyword type: ${keyType.dataType}, could not be arsed a date.`);
        };
    }
    if(keyType.dataType === "Currency" || keyType.dataType === "SpecificCurrency" || keyType.dataType === "FloatingPoint"){
        return !isNaN(Number(value));
    }
    if(keyType.dataType === "Numeric9"){
        if(value.length > 9){
            throw new Error(`The value ${value} is not compatible with the data type of the keyword type: ${keyType.dataType}, there are more than 9 digits.`);
        }
        return !isNaN(Number(value));
    }
    if(keyType.dataType === "Numeric20"){
        if(value.length > 20){
            throw new Error(`The value ${value} is not compatible with the data type of the keyword type: ${keyType.dataType}, there are more than 20 digits.`);
        }
        return !isNaN(Number(value));
    }
    if(keyType.dataType === "Alphanumeric"){
        if(keyType.alphanumericSettings?.maximumLength !== undefined && value.length > keyType.alphanumericSettings.maximumLength){
            throw new Error(`The value ${value} is not compatible with the data type of the keyword type: ${keyType.dataType}, the value is longer than the maximum length allowed (${keyType.alphanumericSettings.maximumLength}).`);
        }       
    }
    return true;
}

export function convertObjectValueToString(object: any, keyType: KeywordType): KeywordValueItem[] {
    let strArray : string[] = [];
    switch (true) {
        case Array.isArray(object):
            if (object.length > 0) {
                object.forEach(value => {
                    if (typeof value === 'string') {
                        DataTypeCheck(keyType, value)
                        strArray.push(value);
                    } else if (typeof value === 'number') {
                        DataTypeCheck(keyType, value.toString())
                        strArray.push(`${value}`);
                    } else if (value instanceof Date) {
                        DataTypeCheck(keyType, value.toString())
                        strArray.push(convertToHylandDateString(value));
                    }
                });                
            } else {
                console.log('Empty array');
            }
            break;
        case typeof object === 'string':
            DataTypeCheck(keyType, object);
            if(keyType.dataType === "DateTime"){
                strArray.push(convertToHylandDateString(new Date(object)));
            }
            else if(keyType.dataType === "Date"){
                strArray.push(convertToHylandDateString(new Date(object)).split("T")[0]);
            }
            else{
                strArray.push(object);
            }            
            break;
        case typeof object === 'number':
            DataTypeCheck(keyType, object.toString())
            strArray.push(object.toString());
            break;
        case object instanceof Date:
            DataTypeCheck(keyType, object.toString())
            console.log("Date String: ",convertToHylandDateString(object));
            strArray.push(convertToHylandDateString(object));
            break;
        default:
            console.log('Undefined or unknown type');
            break;
    }
    let returnValues: KeywordValueItem[] = [];
    strArray.forEach(item => {
        returnValues.push({value: item} as KeywordValueItem);
    });
    return returnValues;
}
export function convertToHylandDateString(date: Date): string {
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