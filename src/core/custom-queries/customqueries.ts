import { group, _get } from '../baseclass/basegroup.js';
import { CustomQuery, CustomQueryItem } from './customquery.js';

export const CustomQueries: group = {
    endpoint: "/custom-queries",
    items: [] as CustomQuery[],

    async get(searchTerm?: string | number): Promise<CustomQuery[] | CustomQuery> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await response.data.items.map((item: CustomQueryItem) => CustomQuery.parse(item));

        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};
