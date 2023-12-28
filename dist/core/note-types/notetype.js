"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notetype = void 0;
const baseclass_1 = require("../baseclass/baseclass");
class notetype extends baseclass_1.base {
    constructor(item) {
        super(item.id, item.name, item.systemName);
        this.color = {
            r: "",
            g: "",
            b: "",
            a: ""
        };
        this.displayFlags = {
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
        this.flavor = "";
        this.fontId = "";
        this.iconId = "";
        this.userPrivileges = {
            create: false,
            view: false
        };
        this.color = item.color;
        this.displayFlags = item.displayFlags;
        this.flavor = item.flavor;
        this.fontId = item.fontId;
        this.iconId = item.iconId;
        this.userPrivileges = item.userPrivileges;
    }
}
exports.notetype = notetype;
