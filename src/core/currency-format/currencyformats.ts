import { group, _get } from '../baseclass/basegroup.js';
import { CurrencyFormat, CurrencyFormatItem } from './currencyformat.js';

export const CurrencyFormats: group = {
    endpoint: "/currency-formats",
    items: [] as CurrencyFormat[],
    async get(searchTerm?: string | number): Promise<CurrencyFormat[]> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await Promise.all(response.data.items.map((item: CurrencyFormatItem) => CurrencyFormat.parse(item)));
        if(!searchTerm && global.bases.core.isHydrated === false){
            this.items = returnItems;
        }
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};