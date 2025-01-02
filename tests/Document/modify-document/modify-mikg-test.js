import {AuthenticationTest } from "./Authentication/Auth-Test.js";
import { GetDocumentTest } from "./Document/get-document/test-get-document.js";
import { ModifyDocumentTest } from "./Document/modify-document/test-modify-document.js";
import { createRequire } from "module";
import { Core } from "../dist/core/core.js";
import { Bases } from "../dist/bases.js";
import { DocumentTypes } from "../dist/core/document-types/documenttypes.js";
import { Keyword } from "../dist/core/keyword/keyword.js";
const require = createRequire(import.meta.url);
require('dotenv').config();

const events = require('events');
events.EventEmitter.defaultMaxListeners = 10;
const bases = await AuthenticationTest("RESTAPI", "P@ssw0rd");
try {    
    const doc = await Core.getDocument("150", {
        getKeywords: true,
        unmaskKeywords: true,
        getRevisions: false,
        getNotes: false,
        getHistory: false
    });    
    
    const keyMod = await doc.createKeywordModifier();
    const keyType = await Core.KeywordTypes.get("289");
    const newKeyword = await keyType.create("Ternary Technology");
    const grpMod = await keyMod.createKeywordGroupModifier("116");    
    const existingKeyword = grpMod.keywords.find(kw => kw.typeId === "289");
    if(existingKeyword){
        console.log("Keyword exists with value: ", existingKeyword.values[0].value);
        await grpMod.updateKeyword(existingKeyword.values[0].value, newKeyword);
    }
    else{
        await grpMod.addKeyword(newKeyword);
    }  
    await keyMod.addKeywordGroup(grpMod);
    await keyMod.apply();

}
catch (error) {
    console.error(error);
}
finally {
    console.log("Disconnecting...");
    await Bases.instance.disconnect();
}
