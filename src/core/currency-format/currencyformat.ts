import { _getbyid } from '../baseclass/baseclass.js';
import { CurrencyFormats } from './currencyformats.js';

export class CurrencyFormat implements CurrencyFormatItem {
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
    static parse(item: CurrencyFormatItem): CurrencyFormat {
        return new CurrencyFormat(item.id, item.name, item.currencySymbol, item.decimalPlaces, item.decimalSymbol, item.groupingDigits, item.groupingSymbol, item.isoCurrencyName, item.hasCurrencySymbol, item.hasGroupSeparator, item.hasLeadingZero, item.hasMinusSign, item.hasWhitespace, item.hasWhitespaceOnNegative, item.isMinusSignAfter, item.isSymbolAfter, item.isSymbolAfterOnNegative, item.isSymbolInsideNegative);
    }
    static async get(id: string | number): Promise<CurrencyFormat | null> {
        try {
            const response = await _getbyid(CurrencyFormats.endpoint, id);
            return CurrencyFormat.parse(response);
        } catch (error) {
            console.error(`Error fetching CurrencyFormat with id ${id}:`, error);
            return null;
        }
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