import { group, _get } from '../baseclass/basegroup.js';
import { CurrencyFormat, CurrencyFormatItem } from './currencyformat.js';

export const CurrencyFormats: group = {
    endpoint: "/currency-formats",
    items: [] as CurrencyFormat[],
    async get(searchTerm?: string | number): Promise<CurrencyFormat[]> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await response.data.items.map((item: CurrencyFormatItem) => CurrencyFormat.parse(item));
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};