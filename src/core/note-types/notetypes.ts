import { group, _get } from "../baseclass/basegroup.js";
import { NoteType } from "./notetype.js";

export const NoteTypes: group = {
    endpoint: "/note-types",
    items: [],
    async get(searchTerm?: any) {
        const data = await _get(this.endpoint, searchTerm);
        data.items.forEach((item: any) => {
            let nt = NoteType.parse(item);
            this.items.push(nt);
        });
        return this.items;
    },
};
