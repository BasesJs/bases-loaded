import { CurrencyFormat } from "../currencyformat.js";
//TODO: Review this function
export function FormatCurrencyString(currencyFormat: CurrencyFormat, value: number): string {
    // Handle negative values
    const isNegative = value < 0;
    if (isNegative) value = -value;

    // Split integer and fractional parts
    const integerPart = Math.floor(value);
    const fractionalPart = (value % 1).toFixed(currencyFormat.decimalPlaces).slice(2);

    // Apply grouping to integer part
    let formattedIntegerPart = integerPart.toString();
    if (currencyFormat.hasGroupSeparator) {
        const regExp = new RegExp(`\\B(?=(\\d{${currencyFormat.groupingDigits}})+(?!\\d))`, 'g');
        formattedIntegerPart = formattedIntegerPart.replace(regExp, currencyFormat.groupingSymbol);
    }

    // Construct the initial formatted string
    let formattedValue = `${formattedIntegerPart}${currencyFormat.decimalSymbol}${fractionalPart}`;

    // Add currency symbol
    if (currencyFormat.hasCurrencySymbol) {
        if (currencyFormat.isSymbolAfter) {
            formattedValue = `${formattedValue} ${currencyFormat.currencySymbol}`;
        } else {
            formattedValue = `${currencyFormat.currencySymbol} ${formattedValue}`;
        }
    }
    // Handle negative sign
    if (isNegative) {
        if (currencyFormat.isMinusSignAfter) {
            formattedValue += '-';
        } else {
            formattedValue = `-${formattedValue}`;
        }
        if (currencyFormat.isSymbolInsideNegative && currencyFormat.hasCurrencySymbol) {
            formattedValue = formattedValue.trim();
        }
    }

    return formattedValue.trim();
}