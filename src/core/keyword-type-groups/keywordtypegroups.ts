import { group, _get } from '../baseclass/basegroup.js';
import { KeywordTypeGroup } from './keywordtypegroup.js';

export const KeywordTypeGroups: group = {
    endpoint: "/keyword-type-groups",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm)
        data.items.forEach((item: any) => {
            let ktg = KeywordTypeGroup.parse(item);
            this.items.push(ktg);
        });
        return this.items;
    }
}
