"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("../baseclass/baseclass"));
class notetype extends baseclass_1.default {
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
module.exports = notetype;
