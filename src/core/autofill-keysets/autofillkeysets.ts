import { group, _get } from '../baseclass/basegroup.js';
import { autofillkeyset } from './autofillkeyset.js';

export const autofillkeysets: group = {
    endpoint: "/autofill-keyword-sets",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it: any) => {
            let afks = autofillkeyset.parse(it);
            this.items.push(afks);
        });
        return this.items;
    }
}