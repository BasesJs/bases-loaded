import { _getbyid } from '../baseclass/baseclass.js'
import { NoteTypes } from './notetypes.js'

export class NoteType implements NoteTypeItem {
    id: string;
    name: string;
    systemName: string;
    color: Color;
    displayFlags: DisplayFlags;
    flavor: string;
    fontId: string;
    iconId: string;
    userPrivileges: UserPrivileges
    constructor(id: string, name: string, systemName: string, color: Color, displayFlags: DisplayFlags, flavor: string, fontId: string, iconId: string, userPrivileges: UserPrivileges) {
        this.id = id;
        this.name = name;
        this.systemName = systemName;
        this.color = color;
        this.displayFlags = displayFlags;
        this.flavor = flavor;
        this.fontId = fontId;
        this.iconId = iconId;
        this.userPrivileges = userPrivileges;
    }
    static parse(item: NoteTypeItem) {
        return new NoteType(item.id, item.name, item.systemName, Color.parse(item.color), DisplayFlags.parse(item.displayFlags), item.flavor, item.fontId, item.iconId, UserPrivileges.parse(item.userPrivileges));
    }
    async get(id: string | number) {
        let response = await _getbyid(NoteTypes.endpoint, id);
        return NoteType.parse(response);
    }
}
export class Color {
    r: string;
    g: string;
    b: string;
    a: string;
    constructor(r: string, g: string, b: string, a: string) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static parse(item: any) {
        return new Color(item.r, item.g, item.b, item.a);
    }
}
export class DisplayFlags {
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
    static parse(item: DisplayFlagsItem) {
        return new DisplayFlags(item.allPages, item.allRevisions, item.createOpenNoteWindow, item.deleteWithPage, item.floatOnWindow, item.hideNoteWindow, item.moveable, item.noPrivacyOptions, item.open, item.privacyNoDelete, item.privacyNoModify, item.privacyNoView, item.stampKeepOriginalSize, item.stampTransparent);
    }
}
export class UserPrivileges {
    create: boolean;
    view: boolean;
    constructor(create: boolean, view: boolean) {
        this.create = create;
        this.view = view;
    }
    static parse(item: UserPrivilegesItem) {
        return new UserPrivileges(item.create, item.view);
    }
}
interface NoteTypeItem {
    id: string;
    name: string;
    systemName: string;
    color: ColorItem;
    displayFlags: DisplayFlagsItem;
    flavor: string;
    fontId: string;
    iconId: string;
    userPrivileges: UserPrivilegesItem;
}
interface ColorItem {
    r: string;
    g: string;
    b: string;
    a: string;
}
interface DisplayFlagsItem {
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
}
interface UserPrivilegesItem {
    create: boolean;
    view: boolean;
}