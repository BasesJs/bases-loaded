import { Bases } from '../../../bases.js';
import { Core } from '../../core.js';
import { Document } from "../document.js";
import { RunRequest } from "../../../http/httprequest.js";
import { RequestOptions, HttpMethod } from "../../../http/requestoptions.js";
import { DefaultHeaders } from "../../../http/utilities/defaultheaders.js";
import { UserPrivileges, DisplayFlags } from "../../note-types/notetype.js";

export async function getNotes(documentId: string, revisionId: string = "latest"): Promise<Note[]> {
    const fullUrl = `${Bases.apiURI}${Core.endpoint}${Document.endpoint}/${documentId}/revisions/${revisionId}/notes`;
    const options = new RequestOptions({ url: fullUrl, method: HttpMethod.GET, headers: DefaultHeaders() });

    try {
        const response = await RunRequest(options);
        return response.data.items.map((item: NoteItem) => Note.parse(item));
    } catch (error) {
        console.error('Failed to get notes:', error);
        throw error;
    }
}

export class Note implements NoteItem {
    readonly id: string;
    readonly noteTypeId: string;
    readonly title: string;
    readonly text: string;
    readonly createdUserId: string;
    readonly created: string;
    readonly documentId: string;
    readonly documentRevisionId: string;
    readonly page: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly privileges: UserPrivileges;
    readonly displayFlags: DisplayFlags;
    constructor(id: string, noteTypeId: string, title: string, text: string, createdUserId: string, created: string, documentId: string, documentRevisionId: string, page: number, x: number, y: number, width: number, height: number, privileges: UserPrivileges, displayFlags: DisplayFlags) {
        this.id = id;
        this.noteTypeId = noteTypeId;
        this.title = title;
        this.text = text;
        this.createdUserId = createdUserId;
        this.created = created;
        this.documentId = documentId;
        this.documentRevisionId = documentRevisionId;
        this.page = page;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.privileges = privileges;
        this.displayFlags = displayFlags;
    }
    static parse(item: NoteItem): Note {
        return new Note(item.id, item.noteTypeId, item.title, item.text, item.createdUserId, item.created, item.documentId, item.documentRevisionId, item.page, item.x, item.y, item.width, item.height, UserPrivileges.parse(item.privileges), DisplayFlags.parse(item.displayFlags));
    }
}
export interface NoteItem{
    id: string;
    noteTypeId: string;
    title: string;
    text: string;
    createdUserId: string;
    created: string;
    documentId: string;
    documentRevisionId: string;
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    privileges: UserPrivileges;
    displayFlags: DisplayFlags;
}
export interface NotePrivilegesItem{
    canModify: boolean;
    canDelete: boolean;
    canUpdatePrivacyOptions: boolean;
}
export interface NoteDisplayFlagsItem{
    allowView: boolean;
    allowModify: boolean;
    allowDelete: boolean;
}