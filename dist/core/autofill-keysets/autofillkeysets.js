import { _get } from '../baseclass/basegroup.js';
import { autofillkeyset } from './autofillkeyset.js';
export const autofillkeysets = {
    endpoint: "/autofill-keyword-sets",
    items: [],
    async get(searchTerm) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((it) => {
            let afks = new autofillkeyset(it);
            this.items.push(afks);
        });
        return this.items;
    }
};
