import { group, _get } from '../baseclass/basegroup.js';
import { AutofillKeyset, AutofillKeysetItem } from './autofillkeyset.js';

export const AutofillKeysets: group = {
    endpoint: "/autofill-keyword-sets",
    items: [] as AutofillKeyset[],
    
    async get(searchTerm: string | number): Promise<AutofillKeyset[]> {
        const response = await _get(this.endpoint, searchTerm);
        this.items = response.data.items.map((it: AutofillKeysetItem) => AutofillKeyset.parse(it));
        return this.items as AutofillKeyset[]; 
    }     
};