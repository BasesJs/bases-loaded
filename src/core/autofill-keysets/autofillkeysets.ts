import { group, _get } from '../baseclass/basegroup.js';
import { AutofillKeyset, AutofillKeysetItem } from './autofillkeyset.js';

export const AutofillKeysets: group = {
    endpoint: "/autofill-keyword-sets",
    items: [] as AutofillKeyset[],
    
    async get(searchTerm?: string | number): Promise<AutofillKeyset[]> {
        try {
            const data = await _get(this.endpoint, searchTerm);
            this.items = data.items.map((it: AutofillKeysetItem) => AutofillKeyset.parse(it));
        } catch (error) {
            console.error("Error fetching autofill keysets:", error);
        }
        return this.items;
    }
};