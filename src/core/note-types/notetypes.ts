import { group, _get } from "../baseclass/basegroup.js";
import { NoteType } from "./notetype.js";

export const NoteTypes: group = {
    endpoint: "/note-types",
    items: [],
    async get(searchTerm?: any): Promise<NoteType[]> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await Promise.all(response.data.items.map((item: any) => NoteType.parse(item)));
        if(!searchTerm && global.bases.core.isHydrated === false){
            this.items = returnItems;
        }
        return returnItems.length > 1 ? returnItems : returnItems[0];
    },
};
