import { group, _get } from '../baseclass/basegroup.js';
import { CustomQuery } from './customquery.js';

export const CustomQueries: group = {
    endpoint: "/custom-queries",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it: any) => {
            let cq = CustomQuery.parse(it);
            this.items.push(cq);
        });
        return this.items;
    }
}