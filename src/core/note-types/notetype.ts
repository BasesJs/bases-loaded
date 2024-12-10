import { base, _getbyid } from '../baseclass/baseclass.js'
import { NoteTypes } from './notetypes.js'

export class NoteType extends base {
    constructor(id: string, name: string, systemName: string, color: Color, displayFlags: DisplayFlags, flavor: string, fontId: string, iconId: string, userPrivileges: UserPrivileges) {
        super(id, name, systemName);
        this.color = color;
        this.displayFlags = displayFlags;
        this.flavor = flavor;
        this.fontId = fontId;
        this.iconId = iconId;
        this.userPrivileges = userPrivileges;
    }
    color: Color;
    displayFlags: DisplayFlags;
    flavor: string;
    fontId: string;
    iconId: string;
    userPrivileges: UserPrivileges
    static parse(item: any) {
        return new NoteType(item.id, item.name, item.systemName, Color.parse(item.color), DisplayFlags.parse(item.displayFlags), item.flavor, item.fontId, item.iconId, UserPrivileges.parse(item.userPrivileges));
    }
    async get(id: string) {
        let response = await _getbyid(id, NoteTypes.endpoint);
        return NoteType.parse(response);
    }
}
export class Color {
    constructor(r: string, g: string, b: string, a: string) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    r: string;
    g: string;
    b: string;
    a: string;
    static parse(item: any) {
        return new Color(item.r, item.g, item.b, item.a);
    }
}
export class DisplayFlags {
    constructor(allPages: boolean, allRevisions: boolean, createOpenNoteWindow: boolean, deleteWithPage: boolean, floatOnWindow: boolean, hideNoteWindow: boolean, moveable: boolean, noPrivacyOptions: boolean, open: boolean, privacyNoDelete: boolean, privacyNoModify: boolean, privacyNoView: boolean, stampKeepOriginalSize: boolean, stampTransparent: boolean) {
        this.allPages = allPages;
        this.allRevisions = allRevisions;
        this.createOpenNoteWindow = createOpenNoteWindow;
        this.deleteWithPage = deleteWithPage;
        this.floatOnWindow = floatOnWindow;
        this.hideNoteWindow = hideNoteWindow;
        this.moveable = moveable;
        this.noPrivacyOptions = noPrivacyOptions;
        this.open = open;
        this.privacyNoDelete = privacyNoDelete;
        this.privacyNoModify = privacyNoModify;
        this.privacyNoView = privacyNoView;
        this.stampKeepOriginalSize = stampKeepOriginalSize;
        this.stampTransparent = stampTransparent;
    }
    allPages: boolean;
    allRevisions: boolean;
    createOpenNoteWindow: boolean;
    deleteWithPage: boolean;
    floatOnWindow: boolean;
    hideNoteWindow: boolean;
    moveable: boolean;
    noPrivacyOptions: boolean;
    open: boolean;
    privacyNoDelete: boolean;
    privacyNoModify: boolean;
    privacyNoView: boolean;
    stampKeepOriginalSize: boolean;
    stampTransparent: boolean;
    static parse(item: any) {
        return new DisplayFlags(item.allPages, item.allRevisions, item.createOpenNoteWindow, item.deleteWithPage, item.floatOnWindow, item.hideNoteWindow, item.moveable, item.noPrivacyOptions, item.open, item.privacyNoDelete, item.privacyNoModify, item.privacyNoView, item.stampKeepOriginalSize, item.stampTransparent);
    }
}
export class UserPrivileges {
    constructor(create: boolean, view: boolean) {
        this.create = create;
        this.view = view;
    }
    create: boolean;
    view: boolean;
    static parse(item: any) {
        return new UserPrivileges(item.create, item.view);
    }
}