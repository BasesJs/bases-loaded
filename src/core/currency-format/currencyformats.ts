import { group, _get } from '../baseclass/basegroup.js';
import { CurrencyFormat, CurrencyFormatItem } from './currencyformat.js';

export const CurrencyFormats: group = {
    endpoint: "/currency-formats",
    items: [] as CurrencyFormat[],
    async get(searchTerm?: string | number): Promise<CurrencyFormat[]> {
        try {
            const data = await _get(this.endpoint, searchTerm);
            this.items = data.items.map((item: CurrencyFormatItem) => CurrencyFormat.parse(item));
            return this.items;
        } catch (error) {
            console.error("Error fetching currency formats:", error);
            throw error;
        }
    }
};