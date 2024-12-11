import { group, _get } from '@/core/baseclass/basegroup.js';
import { CustomQuery, CustomQueryItem } from './customquery.js';

export const CustomQueries: group = {
    endpoint: "/custom-queries",
    items: [] as CustomQuery[],

    async get(searchTerm?: string | number): Promise<CustomQuery[]> {
        try {
            const data = await _get(this.endpoint, searchTerm);
            this.items = data.items.map((item: CustomQueryItem) => CustomQuery.parse(item));
            return this.items;
        } catch (error) {
            console.error("Error retrieving custom queries:", error);
            throw error;
        }
    }
};
