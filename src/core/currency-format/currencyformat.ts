import { _getbyid } from '../baseclass/baseclass.js';
import { CurrencyFormats } from './currencyformats.js';
import { FormatCurrencyString } from './utilities/FormatCurrencyString.js';

export class CurrencyFormat implements CurrencyFormatItem {
    readonly id: string;
    readonly name: string;
    readonly currencySymbol: string;
    readonly decimalPlaces: number;
    readonly decimalSymbol: string;
    readonly groupingDigits: number;
    readonly groupingSymbol: string;
    readonly isoCurrencyName: string;
    readonly hasCurrencySymbol: boolean;
    readonly hasGroupSeparator: boolean;
    readonly hasLeadingZero: boolean;
    readonly hasMinusSign: boolean;
    readonly hasWhitespace: boolean;
    readonly hasWhitespaceOnNegative: boolean;
    readonly isMinusSignAfter: boolean;
    readonly isSymbolAfter: boolean;
    readonly isSymbolAfterOnNegative: boolean;
    readonly isSymbolInsideNegative: boolean;
    constructor(id: string, name: string, currencySymbol: string, decimalPlaces: number, decimalSymbol: string, groupingDigits: number, groupingSymbol: string, isoCurrencyName: string, hasCurrencySymbol: boolean, hasGroupSeparator: boolean, hasLeadingZero: boolean, hasMinusSign: boolean, hasWhitespace: boolean, hasWhitespaceOnNegative: boolean, isMinusSignAfter: boolean, isSymbolAfter: boolean, isSymbolAfterOnNegative: boolean, isSymbolInsideNegative: boolean) {
        this.id = id; 
        this.name = name;
        this.currencySymbol = currencySymbol;
        this.decimalPlaces = decimalPlaces;
        this.decimalSymbol = decimalSymbol;
        this.groupingDigits = groupingDigits;
        this.groupingSymbol = groupingSymbol;
        this.isoCurrencyName = isoCurrencyName;
        this.hasCurrencySymbol = hasCurrencySymbol;
        this.hasGroupSeparator = hasGroupSeparator;
        this.hasLeadingZero = hasLeadingZero;
        this.hasMinusSign = hasMinusSign;
        this.hasWhitespace = hasWhitespace;
        this.hasWhitespaceOnNegative = hasWhitespaceOnNegative;
        this.isMinusSignAfter = isMinusSignAfter;
        this.isSymbolAfter = isSymbolAfter;
        this.isSymbolAfterOnNegative = isSymbolAfterOnNegative;
        this.isSymbolInsideNegative = isSymbolInsideNegative;
    }
    getformattedString(value: number): string {
        return FormatCurrencyString(this, value);
    }
    static parse(item: CurrencyFormatItem): CurrencyFormat {
        return new CurrencyFormat(item.id, item.name, item.currencySymbol, item.decimalPlaces, item.decimalSymbol, item.groupingDigits, item.groupingSymbol, item.isoCurrencyName, item.hasCurrencySymbol, item.hasGroupSeparator, item.hasLeadingZero, item.hasMinusSign, item.hasWhitespace, item.hasWhitespaceOnNegative, item.isMinusSignAfter, item.isSymbolAfter, item.isSymbolAfterOnNegative, item.isSymbolInsideNegative);
    }
    static async get(id: string | number): Promise<CurrencyFormat> {
        const response = await _getbyid(CurrencyFormats.endpoint, id);
        return CurrencyFormat.parse(response.data as CurrencyFormatItem);
    }
}
export interface CurrencyFormatItem {
    id: string;
    name: string;
    currencySymbol: string;
    decimalPlaces: number;
    decimalSymbol: string;
    groupingDigits: number;
    groupingSymbol: string;
    isoCurrencyName: string;
    hasCurrencySymbol: boolean;
    hasGroupSeparator: boolean;
    hasLeadingZero: boolean;
    hasMinusSign: boolean;
    hasWhitespace: boolean;
    hasWhitespaceOnNegative: boolean;
    isMinusSignAfter: boolean;
    isSymbolAfter: boolean;
    isSymbolAfterOnNegative: boolean;
    isSymbolInsideNegative: boolean;
}
/*
{
    "items": [
        {
            "currencySymbol": "$",
            "decimalPlaces": 2,
            "decimalSymbol": ".",
            "groupingDigits": 3,
            "groupingSymbol": ",",
            "hasCurrencySymbol": true,
            "hasGroupSeparator": true,
            "hasLeadingZero": false,
            "hasMinusSign": false,
            "hasWhitespace": false,
            "hasWhitespaceOnNegative": false,
            "id": "1002",
            "isMinusSignAfter": false,
            "isoCurrencyName": "",
            "isSymbolAfter": false,
            "isSymbolAfterOnNegative": false,
            "isSymbolInsideNegative": true,
            "name": "USD"
        }
    ]
}
*/