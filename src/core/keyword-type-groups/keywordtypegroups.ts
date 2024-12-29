import { group, _get } from '../baseclass/basegroup.js';
import { KeywordTypeGroup, KeywordTypeGroupItem } from './keywordtypegroup.js';

export const KeywordTypeGroups: group = {
    endpoint: "/keyword-type-groups",
    items: [] as KeywordTypeGroup[],

    async get(searchTerm?: string | number): Promise<KeywordTypeGroup[]> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await response.data.items.map((item: KeywordTypeGroupItem) => KeywordTypeGroup.parse(item));
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }
};