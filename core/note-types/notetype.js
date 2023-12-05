
class notetype {
    constructor(item){
        this.id = item.id;
        this.name = item.name;
        this.systemName = item.systemName;
        this.color = item.color;
        this.displayFlags = item.displayFlags;
        this.flavor = item.flavor;
        this.fontId = item.fontId;
        this.iconId = item.iconId;
        this.userPrivileges = item.userPrivileges;
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