import { group, _get } from '../baseclass/basegroup.js';
import { AutofillKeyset, AutofillKeysetItem } from './autofillkeyset.js';

export const AutofillKeysets: group = {
    endpoint: "/autofill-keyword-sets",
    items: [] as AutofillKeyset[],
    
    async get(searchTerm: string | number): Promise<AutofillKeyset[] | AutofillKeyset> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await response.data.items.map((it: AutofillKeysetItem) => AutofillKeyset.parse(it));  
        return returnItems.length > 1 ? returnItems : returnItems[0];
    }     
};