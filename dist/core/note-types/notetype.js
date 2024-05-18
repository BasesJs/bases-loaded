import base from '../baseclass/baseclass.js';
export class notetype extends base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.color = item.color;
        this.displayFlags = item.displayFlags;
        this.flavor = item.flavor;
        this.fontId = item.fontId;
        this.iconId = item.iconId;
        this.userPrivileges = item.userPrivileges;
    }
    color = {
        r: "",
        g: "",
        b: "",
        a: ""
    };
    displayFlags = {
        allPages: true,
        allRevisions: true,
        createOpenNoteWindow: true,
        deleteWithPage: true,
        floatOnWindow: true,
        hideNoteWindow: true,
        moveable: true,
        noPrivacyOptions: true,
        open: true,
        privacyNoDelete: true,
        privacyNoModify: true,
        privacyNoView: true,
        stampKeepOriginalSize: true,
        stampTransparent: true
    };
    flavor = "";
    fontId = "";
    iconId = "";
    userPrivileges = {
        create: false,
        view: false
    };
}
