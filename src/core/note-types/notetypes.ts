import { group, _get } from "../baseclass/basegroup.js";
import { NoteType } from "./notetype.js";

export const NoteTypes: group = {
    endpoint: "/note-types",
    items: [],
    async get(searchTerm?: any): Promise<NoteType[]> {
        const response = await _get(this.endpoint, searchTerm);
        let returnItems = await response.data.items.map((item: any) => NoteType.parse(item));
        return returnItems.length > 1 ? returnItems : returnItems[0];
    },
};
