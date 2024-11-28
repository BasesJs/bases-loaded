import { base, _getbyid } from '../baseclass/baseclass.js'
import { notetypes } from './notetypes.js'

export class notetype extends base {
    constructor(id: string, name: string, systemName: string, color: color, displayFlags: displayFlags, flavor: string, fontId: string, iconId: string, userPrivileges: userPrivileges) {
        super(id, name, systemName);
        this.color = color;
        this.displayFlags = displayFlags;
        this.flavor = flavor;
        this.fontId = fontId;
        this.iconId = iconId;
        this.userPrivileges = userPrivileges;
    }
    color: color;
    displayFlags: displayFlags;
    flavor: string;
    fontId: string;
    iconId: string;
    userPrivileges: userPrivileges
    static parse(item: any) {
        return new notetype(item.id, item.name, item.systemName, color.parse(item.color), displayFlags.parse(item.displayFlags), item.flavor, item.fontId, item.iconId, userPrivileges.parse(item.userPrivileges));
    }
    async get(id: string) {
        let response = await _getbyid(id, notetypes.endpoint);
        return notetype.parse(response);
    }
}
export class color {
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
        return new color(item.r, item.g, item.b, item.a);
    }
}
export class displayFlags {
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
        return new displayFlags(item.allPages, item.allRevisions, item.createOpenNoteWindow, item.deleteWithPage, item.floatOnWindow, item.hideNoteWindow, item.moveable, item.noPrivacyOptions, item.open, item.privacyNoDelete, item.privacyNoModify, item.privacyNoView, item.stampKeepOriginalSize, item.stampTransparent);
    }
}
export class userPrivileges {
    constructor(create: boolean, view: boolean) {
        this.create = create;
        this.view = view;
    }
    create: boolean;
    view: boolean;
    static parse(item: any) {
        return new userPrivileges(item.create, item.view);
    }
}