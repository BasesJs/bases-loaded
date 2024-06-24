import { _get } from '../baseclass/basegroup.js';
import { keywordtype } from './keywordtype.js';
export const keywordtypes = {
    endpoint: "/keyword-types",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item) => {
            let kt = keywordtype.parse(item);
            this.items.push(kt);
        });
        return this.items;
    }
};
