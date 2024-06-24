import { base, _getbyid } from '../baseclass/baseclass.js';
import { notetypes } from './notetypes.js';
export class notetype extends base {
    constructor(id, name, systemName, color, displayFlags, flavor, fontId, iconId, userPrivileges) {
        super(id, name, systemName);
        this.color = color;
        this.displayFlags = displayFlags;
        this.flavor = flavor;
        this.fontId = fontId;
        this.iconId = iconId;
        this.userPrivileges = userPrivileges;
    }
    color;
    displayFlags;
    flavor;
    fontId;
    iconId;
    userPrivileges;
    static parse(item) {
        return new notetype(item.id, item.name, item.systemName, color.parse(item.color), displayFlags.parse(item.displayFlags), item.flavor, item.fontId, item.iconId, userPrivileges.parse(item.userPrivileges));
    }
    async get(id) {
        let response = await _getbyid(id, notetypes.endpoint);
        return notetype.parse(response);
    }
}
export class color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    r;
    g;
    b;
    a;
    static parse(item) {
        return new color(item.r, item.g, item.b, item.a);
    }
}
export class displayFlags {
    constructor(allPages, allRevisions, createOpenNoteWindow, deleteWithPage, floatOnWindow, hideNoteWindow, moveable, noPrivacyOptions, open, privacyNoDelete, privacyNoModify, privacyNoView, stampKeepOriginalSize, stampTransparent) {
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
    allPages;
    allRevisions;
    createOpenNoteWindow;
    deleteWithPage;
    floatOnWindow;
    hideNoteWindow;
    moveable;
    noPrivacyOptions;
    open;
    privacyNoDelete;
    privacyNoModify;
    privacyNoView;
    stampKeepOriginalSize;
    stampTransparent;
    static parse(item) {
        return new displayFlags(item.allPages, item.allRevisions, item.createOpenNoteWindow, item.deleteWithPage, item.floatOnWindow, item.hideNoteWindow, item.moveable, item.noPrivacyOptions, item.open, item.privacyNoDelete, item.privacyNoModify, item.privacyNoView, item.stampKeepOriginalSize, item.stampTransparent);
    }
}
export class userPrivileges {
    constructor(create, view) {
        this.create = create;
        this.view = view;
    }
    create;
    view;
    static parse(item) {
        return new userPrivileges(item.create, item.view);
    }
}
