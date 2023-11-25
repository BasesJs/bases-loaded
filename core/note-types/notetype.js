
class notetype {
    constructor(id, name, systemName, color, displayFlags, flavor, fontId, iconId, userPrivileges){
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
    color = {
      r: "string",
      g: "string",
      b: "string",
      a: "string"
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
    flavor = "Note";
    fontId = "string";
    iconId = "string";
    id = "string";
    name = "string";
    systemName = "string";
    userPrivileges = {
      create: true,
      view: true
    }
  }
  module.exports = notetype;