import { group, _get } from "../baseclass/basegroup.js";
import { NoteType } from "./notetype.js";

export const NoteTypes: group = {
    endpoint: "/note-types",
    items: [],
    async get(searchTerm?: any): Promise<NoteType[]> {
        const response = await _get(this.endpoint, searchTerm);
        response.data.items.forEach((item: any) => {
            let nt = NoteType.parse(item);
            this.items.push(nt);
        });
        return this.items as NoteType[];
    },
};
