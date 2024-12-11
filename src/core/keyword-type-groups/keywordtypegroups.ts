import { group, _get } from '../baseclass/basegroup.js';
import { KeywordTypeGroup, KeywordTypeGroupItem } from './keywordtypegroup.js';

export const KeywordTypeGroups: group = {
    endpoint: "/keyword-type-groups",
    items: [] as KeywordTypeGroup[],

    async get(searchTerm?: string | number): Promise<KeywordTypeGroup[]> {
        try {
            const data = await _get(this.endpoint, searchTerm);
            this.items = data.items.map((item: KeywordTypeGroupItem) => KeywordTypeGroup.parse(item));
            return this.items;
        } catch (error) {
            console.error('Error fetching keyword type groups:', error);
            return [];
        }
    }
};